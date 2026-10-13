/*
 * Prototype de vue 3D (3d.html).
 *
 * Réutilise les données des combinaisons et le même calcul de timeline que js/app.js.
 * Repère 3D: X = x du schéma, Z = y du schéma (distance à la ligne de but), Y = hauteur, en mètres.
 */
(async () => {
  'use strict';

  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

  const { ATTAQUANTS, SUPPLEMENTAIRES, DEFENSEURS, LIBELLES } = window.HB;
  const TOUS_ATTAQUANTS = [...ATTAQUANTS, ...SUPPLEMENTAIRES];

  const DUREE_ETAPE = 1700; // ms à vitesse 1
  const PAUSE_ETAPE = 650;  // ms de pause entre deux étapes en lecture

  const COULEURS = {
    sol: 0xe9eef4, solExt: 0xd5dde6, zone: 0xcfdcea, ligne: 0x3c5a7a,
    attaque: 0xe8590c, defense: 0x2f3e52, gardien: 0x2b8a3e, short: 0x1d232b, peau: 0xe8e2da,
    ballon: 0xf5c518, passe: 0x1c7ed6, tir: 0xc92a2a, courseDef: 0x6c7a8c,
  };

  let prefs = { libelles: 'postes' };
  try { prefs = { ...prefs, ...JSON.parse(localStorage.getItem('hb-prefs') || '{}') }; } catch (e) { /* stockage indisponible */ }

  /* ---------------- Timeline (identique à js/app.js) ---------------- */

  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const bez = (a, c, b, t) => {
    const u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
  };
  const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function normCourse(v) {
    if (Array.isArray(v)) return { vers: v };
    return { vers: v.vers, via: v.via, ecran: !!v.ecran };
  }

  function compiler(combo, etapes) {
    const pos0 = window.HB.depart(combo);
    const etats = [{ pos: pos0, porteur: combo.ballon, balle: null }];
    const pas = etapes.map((e, i) => {
      const prec = etats[i];
      const moves = {};
      const tout = { ...(e.courses || {}), ...(e.def || {}) };
      for (const id of Object.keys(tout)) {
        const c = normCourse(tout[id]);
        moves[id] = { de: prec.pos[id], vers: c.vers, via: c.via, ecran: c.ecran };
      }
      const pos = { ...prec.pos };
      for (const id of Object.keys(moves)) pos[id] = moves[id].vers;

      let passe = null;
      let tir = null;
      let porteur = prec.porteur;
      let balle = prec.balle;
      if (e.passe) {
        const [de, a, t] = e.passe;
        passe = { de, a, t: t ?? (Object.keys(moves).length ? 0.5 : 0) };
        porteur = a;
      }
      if (e.tir) {
        const t = typeof e.tir === 'string' ? { par: e.tir } : e.tir;
        const tireur = pos[t.par];
        const cible = t.cible || [tireur[0] > 0.3 ? -0.95 : 0.95, -0.35];
        tir = { par: t.par, t: t.t ?? 0.25, cible };
        porteur = null;
        balle = cible;
      }
      etats.push({ pos, porteur, balle });
      return { texte: e.texte, moves, passe, tir };
    });
    return { etats, pas };
  }

  function posA(timeline, k, t, id) {
    const m = timeline.pas[k].moves[id];
    if (!m) return timeline.etats[k].pos[id];
    const u = ease(t);
    return m.via ? bez(m.de, m.via, m.vers, u) : lerp(m.de, m.vers, u);
  }

  // Ballon: porté par un joueur, en vol (passe ou tir) ou posé.
  function etatBalle(timeline, k, t) {
    const p = timeline.pas[k];
    const avant = timeline.etats[k];
    if (p.passe) {
      const { de, a, t: t0 } = p.passe;
      if (t < t0) return { type: 'porte', id: de, vers: posA(timeline, k, 1, a) };
      const u = t0 >= 1 ? 1 : (t - t0) / (1 - t0);
      const d = posA(timeline, k, t0, de);
      const f = posA(timeline, k, 1, a);
      const dist = Math.hypot(f[0] - d[0], f[1] - d[1]) || 1;
      const dx = (f[0] - d[0]) / dist, dy = (f[1] - d[1]) / dist;
      return {
        type: 'vol',
        a: [d[0] + dx * 0.35, d[1] + dy * 0.35, 1.35],
        b: [f[0] - dx * 0.35, f[1] - dy * 0.35, 1.25],
        fleche: 0.06 * dist,
        u,
        receveur: a,
      };
    }
    if (p.tir) {
      const { par, t: t0, cible } = p.tir;
      if (t < t0) return { type: 'porte', id: par, levee: clamp((t - (t0 - 0.3)) / 0.3, 0, 1), vers: [0, 0] };
      const u = (t - t0) / (1 - t0);
      const d = posA(timeline, k, t0, par);
      return { type: 'vol', a: [d[0], d[1] + 0.2, 2.35], b: [cible[0], cible[1], 0.35], fleche: 0.3, u: ease(u) };
    }
    if (avant.porteur) return { type: 'porte', id: avant.porteur };
    return { type: 'pose', xy: avant.balle };
  }

  /* ---------------- Scène ---------------- */

  const conteneur = document.getElementById('scene');
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  conteneur.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xc9d3de);
  scene.fog = new THREE.Fog(0xc9d3de, 45, 90);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2 - 0.03;
  controls.minDistance = 2;
  controls.maxDistance = 60;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 1.6));
  const soleil = new THREE.DirectionalLight(0xffffff, 1.8);
  soleil.position.set(-8, 20, 14);
  soleil.target.position.set(0, 0, 8);
  soleil.castShadow = true;
  soleil.shadow.mapSize.set(2048, 2048);
  Object.assign(soleil.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 });
  soleil.shadow.bias = -0.0005;
  scene.add(soleil, soleil.target);

  // Ruban plat posé au sol, le long d'une ligne brisée de points [x, y].
  function ruban(points, largeur, hauteur = 0.004) {
    const pos = [], nor = [], idx = [];
    for (let i = 0; i < points.length - 1; i++) {
      const [ax, ay] = points[i], [bx, by] = points[i + 1];
      const L = Math.hypot(bx - ax, by - ay) || 1;
      const nx = -(by - ay) / L * largeur / 2, ny = (bx - ax) / L * largeur / 2;
      const b = pos.length / 3;
      pos.push(ax + nx, hauteur, ay + ny, ax - nx, hauteur, ay - ny, bx + nx, hauteur, by + ny, bx - nx, hauteur, by - ny);
      nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
      idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    g.setIndex(idx);
    return g;
  }

  const arc = (cx, cy, r, a0, a1, n = 48) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const a = a0 + (a1 - a0) * i / n;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });
  // Contour de la zone (r = 6) ou de la ligne des 9 m (r = 9).
  const contourZone = r => [...arc(-1.5, 0, r, Math.PI, Math.PI / 2), ...arc(1.5, 0, r, Math.PI / 2, 0)];

  function construireTerrain() {
    const t = new THREE.Group();
    const mat = c => new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide });

    const ext = new THREE.Mesh(new THREE.PlaneGeometry(60, 50), mat(COULEURS.solExt));
    ext.rotation.x = -Math.PI / 2;
    ext.position.set(0, -0.01, 9);
    const sol = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), mat(COULEURS.sol));
    sol.rotation.x = -Math.PI / 2;
    sol.position.set(0, -0.005, 10);

    const forme = new THREE.Shape(contourZone(6).map(([x, y]) => new THREE.Vector2(x, -y)));
    const zone = new THREE.Mesh(new THREE.ShapeGeometry(forme, 24), mat(COULEURS.zone));
    zone.rotation.x = -Math.PI / 2;
    for (const m of [ext, sol, zone]) { m.receiveShadow = true; t.add(m); }

    const matLigne = new THREE.MeshLambertMaterial({ color: COULEURS.ligne, side: THREE.DoubleSide });
    const lignes = [
      [[-10, 0], [10, 0]], [[-10, 0], [-10, 20]], [[10, 0], [10, 20]], [[-10, 20], [10, 20]],
      contourZone(6), [[-0.5, 7], [0.5, 7]], [[-0.075, 4], [0.075, 4]],
    ];
    for (const l of lignes) t.add(new THREE.Mesh(ruban(l, 0.06), matLigne));
    // Ligne des 9 m en pointillés, coupée par les lignes de touche.
    const neuf = contourZone(9).filter(([x]) => Math.abs(x) <= 10);
    for (let i = 0; i < neuf.length - 1; i += 2) t.add(new THREE.Mesh(ruban([neuf[i], neuf[i + 1]], 0.06), matLigne));
    for (const m of t.children) m.receiveShadow = true;

    t.add(construireBut());
    return t;
  }

  function construireBut() {
    const g = new THREE.Group();
    const rouge = new THREE.MeshLambertMaterial({ color: 0xd9302c });
    const blanc = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const e = 0.08;
    // Barres rayées rouge et blanc (bandes de 20 cm).
    const barre = (longueur, axe, origine) => {
      const n = Math.round(longueur / 0.2);
      for (let i = 0; i < n; i++) {
        const dims = axe === 'y' ? [e, longueur / n, e] : [longueur / n, e, e];
        const m = new THREE.Mesh(new THREE.BoxGeometry(...dims), i % 2 ? blanc : rouge);
        const d = (i + 0.5) * longueur / n;
        m.position.set(origine[0] + (axe === 'x' ? d : 0), origine[1] + (axe === 'y' ? d : 0), origine[2]);
        m.castShadow = true;
        g.add(m);
      }
    };
    barre(2 + e, 'y', [-1.5 - e / 2, 0, -e / 2]);
    barre(2 + e, 'y', [1.5 + e / 2, 0, -e / 2]);
    barre(3, 'x', [-1.5, 2 + e / 2, -e / 2]);

    // Filet: texture de mailles répétée.
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const ctx = c.getContext('2d');
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    const filet = (l, h) => {
      const tx = tex.clone();
      tx.repeat.set(l / 0.12, h / 0.12);
      tx.needsUpdate = true;
      return new THREE.Mesh(new THREE.PlaneGeometry(l, h),
        new THREE.MeshBasicMaterial({ map: tx, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    };
    const fond = filet(3, 2);
    fond.position.set(0, 1, -0.9);
    const dessus = filet(3, 0.9);
    dessus.rotation.x = Math.PI / 2;
    dessus.position.set(0, 2, -0.45);
    g.add(fond, dessus);
    for (const s of [-1, 1]) {
      const cote = filet(0.9, 2);
      cote.rotation.y = Math.PI / 2;
      cote.position.set(1.5 * s, 1, -0.45);
      g.add(cote);
    }
    return g;
  }

  scene.add(construireTerrain());

  /* ---------------- Joueurs ---------------- */

  function etiquette(texte, fond) {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = fond;
    ctx.beginPath();
    ctx.roundRect(4, 4, 120, 56, 28);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 34px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texte, 64, 34);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  function creerJoueur(couleur, couleurTexte) {
    const g = new THREE.Group();
    const corps = new THREE.Group();
    g.add(corps);
    const maillot = new THREE.MeshLambertMaterial({ color: couleur });
    const short = new THREE.MeshLambertMaterial({ color: COULEURS.short });
    const peau = new THREE.MeshLambertMaterial({ color: COULEURS.peau });
    const maille = (geo, mat, x, y, z, parent = corps) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      parent.add(m);
      return m;
    };

    const membre = (x, y, rayon, longueur, mat, parent) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, y, 0);
      parent.add(pivot);
      maille(new THREE.CapsuleGeometry(rayon, longueur, 4, 8), mat, 0, -longueur / 2 - rayon * 0.3, 0, pivot);
      return pivot;
    };
    const jambes = [membre(0.11, 0.92, 0.085, 0.72, short, corps), membre(-0.11, 0.92, 0.085, 0.72, short, corps)];
    const tronc = maille(new THREE.CapsuleGeometry(0.19, 0.42, 4, 12), maillot, 0, 1.28, 0);
    tronc.scale.set(1.18, 1, 0.75);
    maille(new THREE.SphereGeometry(0.12, 16, 12), peau, 0, 1.8, 0);
    // Bras: index 0 = gauche (+X), 1 = droit (-X) pour un joueur tourné vers +Z.
    const bras = [membre(0.29, 1.56, 0.06, 0.52, peau, corps), membre(-0.29, 1.56, 0.06, 0.52, peau, corps)];

    const anneau = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.42, 32),
      new THREE.MeshBasicMaterial({ color: couleur, side: THREE.DoubleSide }));
    anneau.rotation.x = -Math.PI / 2;
    anneau.position.y = 0.012;
    g.add(anneau);

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ depthTest: false, transparent: true }));
    sprite.scale.set(0.7, 0.35, 1);
    sprite.position.y = 2.3;
    sprite.renderOrder = 10;
    g.add(sprite);

    const fondEtiquette = '#' + new THREE.Color(couleurTexte ?? couleur).getHexString();
    const libeller = texte => {
      if (sprite.material.map) sprite.material.map.dispose();
      sprite.material.map = etiquette(texte, fondEtiquette);
      sprite.material.needsUpdate = true;
    };

    scene.add(g);
    return {
      g, corps, jambes, bras, sprite, libeller,
      etat: { xy: null, vit: [0, 0], cap: 0, phase: 0, amp: 0, saut: 0 },
    };
  }

  const joueurs = {};
  for (const id of TOUS_ATTAQUANTS) joueurs[id] = creerJoueur(COULEURS.attaque);
  for (const id of DEFENSEURS) joueurs[id] = creerJoueur(id === 'GB' ? COULEURS.gardien : COULEURS.defense);

  const ballon = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), new THREE.MeshLambertMaterial({ color: COULEURS.ballon }));
  ballon.castShadow = true;
  scene.add(ballon);

  const angleVers = (de, vers) => Math.atan2(vers[0] - de[0], vers[1] - de[1]);
  const ecartAngle = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

  function animerJoueur(j, xy, regard, dt, saut, levee) {
    const e = j.etat;
    const saute = !e.xy || Math.hypot(xy[0] - e.xy[0], xy[1] - e.xy[1]) > 1.5; // curseur déplacé d'un coup
    if (saute) {
      e.vit = [0, 0];
      e.cap = regard(null);
    } else if (dt > 0) {
      const a = Math.min(1, dt * 10);
      e.vit[0] += ((xy[0] - e.xy[0]) / dt - e.vit[0]) * a;
      e.vit[1] += ((xy[1] - e.xy[1]) / dt - e.vit[1]) * a;
      e.phase += Math.hypot(xy[0] - e.xy[0], xy[1] - e.xy[1]) / 1.7 * Math.PI * 2;
    }
    const vitesse = Math.hypot(e.vit[0], e.vit[1]);
    const cap = regard(vitesse > 1.2 ? e.vit : null);
    e.cap += ecartAngle(e.cap, cap) * Math.min(1, dt * 8);
    e.amp += (clamp(vitesse / 4, 0, 1) - e.amp) * Math.min(1, dt * 8);
    e.saut += (saut - e.saut) * Math.min(1, dt * 10);
    e.xy = xy;

    j.g.position.set(xy[0], 0, xy[1]);
    j.g.rotation.y = e.cap;
    j.corps.position.y = e.saut;
    const s = Math.sin(e.phase) * e.amp * 0.9;
    j.jambes[0].rotation.x = s;
    j.jambes[1].rotation.x = -s;
    j.bras[0].rotation.x = -s * 0.8;
    j.bras[1].rotation.x = s * 0.8 - levee * 2.7;
    j.corps.rotation.x = e.amp * 0.12;
  }

  /* ---------------- Tracés ---------------- */

  const traces = new THREE.Group();
  scene.add(traces);

  function cheminCourse(m, n = 24) {
    return Array.from({ length: n + 1 }, (_, i) => {
      const u = i / n;
      return m.via ? bez(m.de, m.via, m.vers, u) : lerp(m.de, m.vers, u);
    });
  }

  function pointe(points, couleur, opacite) {
    const [a, b] = [points[points.length - 2], points[points.length - 1]];
    const ang = Math.atan2(b[0] - a[0], b[1] - a[1]);
    const forme = new THREE.Shape([new THREE.Vector2(-0.18, 0), new THREE.Vector2(0.18, 0), new THREE.Vector2(0, 0.35)]);
    const m = new THREE.Mesh(new THREE.ShapeGeometry(forme),
      new THREE.MeshBasicMaterial({ color: couleur, transparent: true, opacity: opacite, side: THREE.DoubleSide }));
    m.rotation.set(Math.PI / 2, 0, -ang);
    m.position.set(b[0], 0.016, b[1]);
    return m;
  }

  function courbeVol(v, n = 30) {
    return Array.from({ length: n + 1 }, (_, i) => {
      const u = i / n;
      return new THREE.Vector3(
        v.a[0] + (v.b[0] - v.a[0]) * u,
        v.a[2] + (v.b[2] - v.a[2]) * u + v.fleche * 4 * u * (1 - u),
        v.a[1] + (v.b[1] - v.a[1]) * u);
    });
  }

  function dessinerEtape(timeline, k, opacite, defense) {
    const p = timeline.pas[k];
    for (const [id, m] of Object.entries(p.moves)) {
      const estDef = DEFENSEURS.includes(id);
      if (estDef && !defense) continue;
      if (!m.de) continue;
      const couleur = estDef ? COULEURS.courseDef : COULEURS.attaque;
      const pts = cheminCourse(m);
      traces.add(new THREE.Mesh(ruban(pts, estDef ? 0.05 : 0.08, 0.014),
        new THREE.MeshBasicMaterial({ color: couleur, transparent: true, opacity: opacite, side: THREE.DoubleSide })));
      if (m.ecran) {
        const [a, b] = pts.slice(-2);
        const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const n = [-(b[1] - a[1]) / L * 0.4, (b[0] - a[0]) / L * 0.4];
        traces.add(new THREE.Mesh(ruban([[b[0] - n[0], b[1] - n[1]], [b[0] + n[0], b[1] + n[1]]], 0.1, 0.016),
          new THREE.MeshBasicMaterial({ color: couleur, transparent: true, opacity: opacite, side: THREE.DoubleSide })));
      } else {
        traces.add(pointe(pts, couleur, opacite));
      }
    }
    const v = p.passe || p.tir ? etatBalle(timeline, k, 1) : null;
    if (v && v.type === 'vol') {
      const geo = new THREE.BufferGeometry().setFromPoints(courbeVol(v));
      const ligne = new THREE.Line(geo, new THREE.LineDashedMaterial({
        color: p.tir ? COULEURS.tir : COULEURS.passe, dashSize: 0.25, gapSize: 0.15, transparent: true, opacity: opacite,
      }));
      ligne.computeLineDistances();
      traces.add(ligne);
    }
  }

  /* ---------------- Caméra ---------------- */

  const VUES = {
    attaque: { pos: [0, 8.5, 22], cible: [0, 0.5, 6] },
    dessus: { pos: [0, 27, 7.6], cible: [0, 0, 7.5] },
    gardien: { pos: [0, 1.9, -0.4], cible: [0, 1, 9] },
    cote: { pos: [19, 7, 7], cible: [0, 0.5, 6.5] },
  };
  let transition = null;

  // Sur un écran en portrait, on recule la caméra pour garder toute la largeur du terrain.
  function placement(v) {
    const cible = new THREE.Vector3(...v.cible);
    const recul = camera.aspect < 1.2 ? Math.pow(1.2 / camera.aspect, 0.7) : 1;
    const pos = new THREE.Vector3(...v.pos).sub(cible).multiplyScalar(recul).add(cible);
    return { pos, cible };
  }

  function allerVers(nom, instantane = false) {
    const v = placement(VUES[nom]);
    document.querySelectorAll('[data-camera]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.camera === nom)));
    if (instantane) {
      camera.position.copy(v.pos);
      controls.target.copy(v.cible);
      controls.update();
      return;
    }
    transition = {
      t: 0,
      dePos: camera.position.clone(), deCible: controls.target.clone(),
      versPos: v.pos, versCible: v.cible,
    };
  }
  controls.addEventListener('start', () => {
    transition = null;
    document.querySelectorAll('[data-camera]').forEach(b => b.setAttribute('aria-pressed', 'false'));
  });

  /* ---------------- Application ---------------- */

  const $ = s => document.querySelector(s);
  const ui = {
    combo: $('#combo'), variante: $('#variante'), texte: $('#texte'), compteur: $('#compteur'),
    curseur: $('#curseur'), lecture: $('#lecture'), vitesse: $('#vitesse'),
    defense: $('#opt-defense'), traces: $('#opt-traces'), etiquettes: $('#opt-etiquettes'), suivre: $('#suivre'),
  };

  let combo = null;
  let comboVariante = null;
  let timeline = null;
  let T = 0;
  let cible = null;
  let enLecture = false;
  let pauseJusqua = 0;
  let kTraces = -1;

  const parCategorie = new Map();
  for (const c of window.COMBINAISONS) {
    if (!parCategorie.has(c.categorie)) parCategorie.set(c.categorie, []);
    parCategorie.get(c.categorie).push(c);
  }
  for (const [cat, liste] of parCategorie) {
    const og = Object.assign(document.createElement('optgroup'), { label: cat });
    og.append(...liste.map(c => Object.assign(document.createElement('option'), { value: c.id, textContent: c.nom })));
    ui.combo.appendChild(og);
  }

  function choisirVariante(i) {
    const v = combo.variantes ? combo.variantes[i] : null;
    comboVariante = window.HB.pourVariante(combo, v);
    timeline = compiler(comboVariante, v ? v.etapes : combo.etapes);
    const libDef = window.HB.dispositif(comboVariante).libelles;
    const libAtt = LIBELLES[prefs.libelles] || LIBELLES.postes;
    for (const id of TOUS_ATTAQUANTS) joueurs[id].libeller(libAtt[id]);
    for (const id of DEFENSEURS) joueurs[id].libeller(libDef[id] || id);
    for (const j of Object.values(joueurs)) j.etat.xy = null;
    ui.curseur.max = String(timeline.pas.length);
    cible = null;
    enLecture = false;
    T = 0;
    kTraces = -1;
    const params = new URLSearchParams({ c: combo.id });
    if (combo.variantes) params.set('v', String(i));
    history.replaceState(null, '', `?${params}`);
  }

  function afficher(id, variante = 0) {
    combo = window.COMBINAISONS.find(c => c.id === id) || window.COMBINAISONS[0];
    ui.combo.value = combo.id;
    document.title = `${combo.nom} en 3D - Combinaisons de handball`;
    ui.variante.hidden = !combo.variantes;
    ui.variante.replaceChildren(...(combo.variantes || []).map((v, i) =>
      Object.assign(document.createElement('option'), { value: String(i), textContent: v.nom })));
    const i = clamp(variante, 0, (combo.variantes || [null]).length - 1);
    ui.variante.value = String(i);
    choisirVariante(i);
  }

  function animerVers(c, lecture = false) {
    cible = clamp(c, 0, timeline.pas.length);
    enLecture = lecture;
    pauseJusqua = 0;
  }
  function arreter() { cible = null; enLecture = false; }

  const commandes = {
    lecture() {
      if (enLecture) return arreter();
      if (T >= timeline.pas.length) T = 0;
      animerVers(timeline.pas.length, true);
    },
    suivant() { animerVers(Math.floor(T + 1e-6) + 1); },
    precedent() { animerVers(Math.ceil(T - 1e-6) - 1); },
    debut() { arreter(); T = 0; },
    fin() { arreter(); T = timeline.pas.length; },
  };
  for (const [nom, f] of Object.entries(commandes)) $(`#${nom}`).addEventListener('click', f);
  ui.curseur.addEventListener('input', () => { arreter(); T = Number(ui.curseur.value); });
  ui.combo.addEventListener('change', () => afficher(ui.combo.value));
  ui.variante.addEventListener('change', () => choisirVariante(Number(ui.variante.value)));
  ui.defense.addEventListener('change', () => { kTraces = -1; });
  ui.traces.addEventListener('change', () => { kTraces = -1; });
  document.querySelectorAll('[data-camera]').forEach(b => b.addEventListener('click', () => allerVers(b.dataset.camera)));
  document.addEventListener('keydown', e => {
    if (e.target.closest('select, input[type="range"]')) return;
    const touches = { ' ': 'lecture', ArrowRight: 'suivant', ArrowLeft: 'precedent', Home: 'debut', End: 'fin' };
    if (touches[e.key]) { e.preventDefault(); commandes[touches[e.key]](); }
  });

  function avancer(now, dt) {
    if (cible === null || now < pauseJusqua) return;
    const sens = Math.sign(cible - T);
    const facteur = enLecture ? 1 : 1.6;
    let suivant = T + sens * dt * 1000 * Number(ui.vitesse.value) * facteur / DUREE_ETAPE;
    if (enLecture && sens > 0 && Math.floor(suivant) > Math.floor(T) && Math.floor(suivant) < cible) {
      suivant = Math.floor(suivant);
      pauseJusqua = now + PAUSE_ETAPE / Number(ui.vitesse.value);
    }
    if ((sens > 0 && suivant >= cible) || (sens < 0 && suivant <= cible) || sens === 0) {
      T = cible;
      cible = null;
      enLecture = false;
    } else {
      T = suivant;
    }
  }

  const positionBalle = new THREE.Vector3();

  function rendre(dt) {
    const n = timeline.pas.length;
    const k = Math.min(Math.floor(T), n - 1);
    const t = T - k;
    const defense = ui.defense.checked;
    const b = etatBalle(timeline, k, t);
    const tir = timeline.pas[k].tir;

    // Position du ballon au sol, pour l'orientation des joueurs.
    let balle2D;
    if (b.type === 'porte') balle2D = posA(timeline, k, t, b.id);
    else if (b.type === 'vol') balle2D = lerp(b.a, b.b, b.u);
    else balle2D = b.xy;

    for (const id of [...TOUS_ATTAQUANTS, ...DEFENSEURS]) {
      const j = joueurs[id];
      const xy = posA(timeline, k, t, id);
      const estDef = DEFENSEURS.includes(id);
      j.g.visible = !!xy && (!estDef || defense);
      // Vue depuis le but: on masque le gardien quand la caméra est dans sa tête.
      if (xy && id === 'GB' && Math.hypot(camera.position.x - xy[0], camera.position.z - xy[1]) < 2.5) j.g.visible = false;
      if (!xy) continue;
      j.sprite.visible = ui.etiquettes.checked;

      const porteur = b.type === 'porte' && b.id === id;
      let saut = 0;
      let levee = 0;
      if (!estDef && window.HB.dansLaZone(xy)) saut = 0.55; // au-dessus de la zone: le joueur est en l'air
      if (tir && tir.par === id) {
        const u = clamp((t - (tir.t - 0.3)) / 0.6, 0, 1);
        saut = Math.max(saut, 0.45 * Math.sin(Math.PI * u));
        levee = porteur ? b.levee : clamp(1 - (t - tir.t) / 0.3, 0, 1);
      }
      const regard = vit => {
        if (!estDef && vit) return Math.atan2(vit[0], vit[1]);
        if (porteur) return angleVers(xy, b.vers || [0, 0]);
        if (Math.hypot(balle2D[0] - xy[0], balle2D[1] - xy[1]) < 0.3) return estDef ? 0 : Math.PI;
        return angleVers(xy, balle2D);
      };
      animerJoueur(j, xy, regard, dt, saut, levee);
    }

    if (b.type === 'porte') {
      const j = joueurs[b.id];
      j.g.updateMatrixWorld(true);
      const levee = b.levee || 0;
      positionBalle.set(-0.3, 1.1 + levee * 1.05, 0.25 - levee * 0.25);
      j.g.localToWorld(positionBalle);
      positionBalle.y += j.etat.saut;
    } else if (b.type === 'vol') {
      const u = b.u;
      positionBalle.set(
        b.a[0] + (b.b[0] - b.a[0]) * u,
        b.a[2] + (b.b[2] - b.a[2]) * u + b.fleche * 4 * u * (1 - u),
        b.a[1] + (b.b[1] - b.a[1]) * u);
    } else if (b.xy) {
      positionBalle.set(b.xy[0], 0.11, b.xy[1]);
    }
    ballon.position.copy(positionBalle);

    if (kTraces !== k) {
      kTraces = k;
      for (const o of traces.children) { o.geometry.dispose(); o.material.dispose(); }
      traces.clear();
      if (ui.traces.checked) {
        for (let i = 0; i < k; i++) dessinerEtape(timeline, i, 0.25, defense);
      }
      dessinerEtape(timeline, k, 0.85, defense);
      ui.texte.textContent = timeline.pas[k].texte;
      ui.compteur.textContent = `Étape ${k + 1} / ${n}`;
    }
    ui.curseur.value = String(T);
    ui.lecture.textContent = enLecture ? '⏸' : '▶';
    ui.lecture.setAttribute('aria-label', enLecture ? 'Pause' : 'Lecture');
  }

  function redimensionner() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.fov = w < h ? 60 : 45;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', redimensionner);
  redimensionner();

  const suiviPrec = new THREE.Vector3();
  let dernier = 0;
  function boucle(now) {
    const dt = dernier ? Math.min(0.064, (now - dernier) / 1000) : 0;
    dernier = now;
    avancer(now, dt);
    rendre(dt);

    if (transition) {
      transition.t = Math.min(1, transition.t + dt / 0.8);
      const u = ease(transition.t);
      camera.position.lerpVectors(transition.dePos, transition.versPos, u);
      controls.target.lerpVectors(transition.deCible, transition.versCible, u);
      if (transition.t >= 1) transition = null;
    } else if (ui.suivre.checked) {
      // La caméra garde son angle et suit le ballon.
      const viser = new THREE.Vector3(ballon.position.x, 0.8, ballon.position.z);
      suiviPrec.copy(controls.target);
      controls.target.lerp(viser, Math.min(1, dt * 3));
      camera.position.add(controls.target.clone().sub(suiviPrec));
    }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(boucle);
  }

  const params = new URLSearchParams(location.search);
  afficher(params.get('c') || 'croise-francais', Number(params.get('v')) || 0);
  allerVers('attaque', true);
  requestAnimationFrame(boucle);
})();
