/*
 * Vue 3D d'une combinaison (3d.html).
 *
 * Utilise les mêmes données et le même déroulement que le schéma (js/timeline.js).
 * Repère 3D: X = x du schéma, Z = y du schéma (distance à la ligne de but), Y = hauteur, en mètres.
 * Les gestes des joueurs (course, passe, réception, tir, écran, posture défensive) sont calculés
 * à partir du déroulement: les données ne décrivent que les déplacements et le ballon.
 */
(async () => {
  'use strict';

  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

  const { ATTAQUANTS, SUPPLEMENTAIRES, DEFENSEURS, LIBELLES, NOMS } = window.HB;
  const { lerp, bez, ease, clamp, compiler, posA } = window.HB.timeline;
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

  const lisse = (a, b, t) => { const u = clamp((t - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); };

  /* ---------------- Ballon ---------------- */

  // Ballon: porté par un joueur, en vol (passe ou tir) ou posé.
  function etatBalle(timeline, k, t) {
    const p = timeline.pas[k];
    const avant = timeline.etats[k];
    if (p.passe) {
      const { de, a, t: t0 } = p.passe;
      if (t < t0) return { type: 'porte', id: de, vers: posA(timeline, k, 1, a), receveur: a };
      const u = t0 >= 1 ? 1 : (t - t0) / (1 - t0);
      const d = posA(timeline, k, t0, de);
      const f = posA(timeline, k, 1, a);
      const dist = Math.hypot(f[0] - d[0], f[1] - d[1]) || 1;
      const dx = (f[0] - d[0]) / dist, dy = (f[1] - d[1]) / dist;
      return {
        type: 'vol',
        a: [d[0] + dx * 0.3, d[1] + dy * 0.3, 1.75],
        b: [f[0] - dx * 0.4, f[1] - dy * 0.4, 1.4],
        fleche: 0.04 * dist,
        u,
        de,
        receveur: a,
      };
    }
    if (p.tir) {
      const { par, t: t0, cible } = p.tir;
      if (t < t0) return { type: 'porte', id: par, vers: [0, 0] };
      const u = (t - t0) / (1 - t0);
      const d = posA(timeline, k, t0, par);
      return { type: 'vol', a: [d[0], d[1] - 0.3, 2.4], b: [cible[0], cible[1], 0.35], fleche: 0.2, u: ease(u), de: par };
    }
    if (avant.porteur) return { type: 'porte', id: avant.porteur };
    return { type: 'pose', xy: avant.balle };
  }

  const pointVol = (v, u, cible = new THREE.Vector3()) => cible.set(
    v.a[0] + (v.b[0] - v.a[0]) * u,
    v.a[2] + (v.b[2] - v.a[2]) * u + v.fleche * 4 * u * (1 - u),
    v.a[1] + (v.b[1] - v.a[1]) * u);

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
  controls.minDistance = 1.5;
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
    t.add(ext, sol, zone);

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

  /*
   * Squelette simple. Le joueur regarde vers +Z; côté s = +1 à sa gauche (+X), s = -1 à sa droite.
   * Angles: hanche/épaule rotation.x < 0 vers l'avant, rotation.z * s > 0 écarte le membre;
   * genou rotation.x > 0 plie la jambe, coude rotation.x < 0 plie le bras.
   */
  const CUISSE = 0.44;
  function creerJoueur(id, couleur) {
    const g = new THREE.Group();
    g.userData.id = id;
    const corps = new THREE.Group();   // monte et descend (saut, flexion)
    g.add(corps);
    const maillot = new THREE.MeshLambertMaterial({ color: couleur });
    const short = new THREE.MeshLambertMaterial({ color: COULEURS.short });
    const peau = new THREE.MeshLambertMaterial({ color: COULEURS.peau });
    const maille = (geo, mat, parent, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      parent.add(m);
      return m;
    };
    const pivot = (parent, x, y) => {
      const p = new THREE.Group();
      p.position.set(x, y, 0);
      parent.add(p);
      return p;
    };
    const segment = (parent, rayon, longueur, mat) =>
      maille(new THREE.CapsuleGeometry(rayon, longueur - 2 * rayon, 4, 8), mat, parent, 0, -longueur / 2);

    const jambes = [1, -1].map(s => {
      const hanche = pivot(corps, 0.11 * s, 0.92);
      segment(hanche, 0.085, CUISSE, short);
      const genou = pivot(hanche, 0, -CUISSE);
      segment(genou, 0.07, CUISSE, peau);
      maille(new THREE.BoxGeometry(0.1, 0.07, 0.24), short, genou, 0, -CUISSE - 0.02, 0.05);
      return { hanche, genou };
    });

    const buste = pivot(corps, 0, 0.92);  // s'incline vers l'avant depuis le bassin
    const tronc = maille(new THREE.CapsuleGeometry(0.19, 0.42, 4, 12), maillot, buste, 0, 0.36);
    tronc.scale.set(1.18, 1, 0.75);
    maille(new THREE.SphereGeometry(0.12, 16, 12), peau, buste, 0, 0.88);
    const bras = [1, -1].map(s => {
      const epaule = pivot(buste, 0.29 * s, 0.64);
      segment(epaule, 0.06, 0.3, maillot);
      const coude = pivot(epaule, 0, -0.3);
      segment(coude, 0.05, 0.28, peau);
      const main = pivot(coude, 0, -0.3);
      return { epaule, coude, main };
    });

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

    const fondEtiquette = '#' + new THREE.Color(couleur).getHexString();
    const libeller = texte => {
      if (sprite.material.map) sprite.material.map.dispose();
      sprite.material.map = etiquette(texte, fondEtiquette);
      sprite.material.needsUpdate = true;
    };

    scene.add(g);
    return {
      id, g, corps, buste, jambes, bras, sprite, libeller,
      etat: { xy: null, vit: [0, 0], cap: 0, phase: 0, amp: 0, pose: null },
    };
  }

  const joueurs = {};
  for (const id of TOUS_ATTAQUANTS) joueurs[id] = creerJoueur(id, COULEURS.attaque);
  for (const id of DEFENSEURS) joueurs[id] = creerJoueur(id, id === 'GB' ? COULEURS.gardien : COULEURS.defense);

  const ballon = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), new THREE.MeshLambertMaterial({ color: COULEURS.ballon }));
  ballon.castShadow = true;
  scene.add(ballon);

  /* ---------------- Postures et gestes ---------------- */

  // Bras: x (avant < 0), z (écart), c (coude). Jambes: flexion (accroupi), ecart.
  const BRAS = {
    repos: { x: 0.05, z: 0.1, c: -0.25 },
    course: { x: 0, z: 0.1, c: -1.3 },
    tenir: { x: -0.45, z: 0.12, c: -1.25 },     // ballon tenu devant soi
    arme: { x: -1.9, z: 1.45, c: -1.9 },        // bras armé, main au-dessus et en arrière de la tête
    lacher: { x: -2.4, z: 0.3, c: -0.15 },      // bras tendu vers l'avant et le haut
    suite: { x: -0.9, z: 0.1, c: -0.3 },        // fin du geste
    recevoir: { x: -1.45, z: 0.22, c: -0.45 },  // bras tendus vers le ballon
    defense: { x: -2.55, z: 0.35, c: -0.4 },    // bras hauts
    gardien: { x: -1.45, z: 1.6, c: -1.2 },     // bras écartés, mains hautes
    ecran: { x: -0.45, z: -0.12, c: -2.1 },     // bras repliés contre la poitrine
  };
  const melangeBras = (a, b, u) => ({ x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u, c: a.c + (b.c - a.c) * u });

  // Bras lanceur pendant une passe ou un tir: armé, lâcher au temps t0, accompagnement.
  function geste(t, t0, armer) {
    const w = Math.min(armer, t0);
    if (t < t0 - w || t > t0 + 0.3) return null;
    if (t < t0 - w * 0.25) return melangeBras(BRAS.tenir, BRAS.arme, lisse(t0 - w, t0 - w * 0.4, t));
    if (t < t0) return melangeBras(BRAS.arme, BRAS.lacher, lisse(t0 - w * 0.25, t0, t));
    return melangeBras(BRAS.lacher, BRAS.suite, lisse(t0, t0 + 0.2, t));
  }

  // Posture voulue d'un joueur à l'instant (k, t), avant le cycle de course.
  function posture(id, k, t, b) {
    const p = timeline.pas[k];
    const estDef = DEFENSEURS.includes(id);
    const r = { flexion: 0.08, ecart: 0.03, bras: [BRAS.repos, BRAS.repos], vif: false, regard: null };
    if (id === 'GB') return { ...r, flexion: 0.32, ecart: 0.2, bras: [BRAS.gardien, BRAS.gardien] };
    if (estDef) return { ...r, flexion: 0.3, ecart: 0.12, bras: [BRAS.defense, BRAS.defense] };

    const m = p.moves[id];
    const mPrec = k > 0 ? timeline.pas[k - 1].moves[id] : null;
    if ((m && m.ecran && t > 0.55) || (!m && mPrec && mPrec.ecran)) {
      return { ...r, flexion: 0.28, ecart: 0.2, bras: [BRAS.ecran, BRAS.ecran] };
    }

    if (b.type === 'porte' && b.id === id) {
      r.bras = [BRAS.repos, BRAS.tenir];
      const lancer = p.passe && p.passe.de === id ? geste(t, p.passe.t, 0.22)
        : p.tir && p.tir.par === id ? geste(t, p.tir.t, 0.35) : null;
      if (lancer) {
        r.bras = [BRAS.recevoir, lancer];
        r.vif = true;
        r.regard = b.vers;
      }
    } else if (b.type === 'vol' && b.de === id) {
      const suite = p.passe ? geste(t, p.passe.t, 0.22) : geste(t, p.tir.t, 0.35);
      if (suite) { r.bras = [BRAS.repos, suite]; r.vif = true; }
    }
    // Réception: bras tendus vers le ballon qui arrive.
    const arrive = (b.type === 'vol' && b.receveur === id && b.u > 0.2)
      || (b.type === 'porte' && b.receveur === id && p.passe && t > p.passe.t - 0.12);
    if (arrive) { r.bras = [BRAS.recevoir, BRAS.recevoir]; r.vif = true; }
    return r;
  }

  const angleVers = (de, vers) => Math.atan2(vers[0] - de[0], vers[1] - de[1]);
  const ecartAngle = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

  function animerJoueur(j, xy, cible, dt, saut, balle2D, estDef) {
    const e = j.etat;
    const saute = !e.xy || Math.hypot(xy[0] - e.xy[0], xy[1] - e.xy[1]) > 1.5; // curseur déplacé d'un coup
    if (saute) {
      e.vit = [0, 0];
    } else if (dt > 0) {
      const a = Math.min(1, dt * 10);
      e.vit[0] += ((xy[0] - e.xy[0]) / dt - e.vit[0]) * a;
      e.vit[1] += ((xy[1] - e.xy[1]) / dt - e.vit[1]) * a;
      // Foulée plus courte quand le joueur marche.
      e.phase += Math.hypot(xy[0] - e.xy[0], xy[1] - e.xy[1]) / (0.9 + 1.4 * e.amp) * Math.PI * 2;
    }
    e.xy = xy;
    const vitesse = Math.hypot(e.vit[0], e.vit[1]);

    // Orientation: vers la course pour un attaquant lancé (sauf s'il recule), sinon vers le ballon.
    let cap;
    if (cible.regard) cap = angleVers(xy, cible.regard);
    else if (!estDef && vitesse > 1.2 && e.vit[1] < 0.6 * vitesse) cap = Math.atan2(e.vit[0], e.vit[1]);
    else if (Math.hypot(balle2D[0] - xy[0], balle2D[1] - xy[1]) > 0.3) cap = angleVers(xy, balle2D);
    else cap = estDef ? 0 : Math.PI;
    if (saute) e.cap = cap;
    e.cap += ecartAngle(e.cap, cap) * Math.min(1, dt * 8);
    e.amp += (clamp(vitesse / 2.2, 0, 1) - e.amp) * Math.min(1, dt * 8);

    // Posture lissée.
    if (!e.pose || saute) e.pose = { flexion: cible.flexion, ecart: cible.ecart, saut, bras: cible.bras.map(b => ({ ...b })) };
    const q = e.pose;
    const v = Math.min(1, dt * (cible.vif ? 22 : 9));
    q.flexion += (cible.flexion - q.flexion) * v;
    q.ecart += (cible.ecart - q.ecart) * v;
    q.saut += (saut - q.saut) * Math.min(1, dt * 12);
    for (let i = 0; i < 2; i++) for (const c of ['x', 'z', 'c']) q.bras[i][c] += (cible.bras[i][c] - q.bras[i][c]) * v;

    const A = e.amp * (estDef ? 0.6 : 1);
    const course = estDef ? 0 : e.amp; // les défenseurs gardent leurs bras levés en se déplaçant
    j.g.position.set(xy[0], 0, xy[1]);
    j.g.rotation.y = e.cap;

    const enLAir = clamp(q.saut / 0.4, 0, 1);
    const f = q.flexion * (1 - enLAir);
    j.corps.position.y = q.saut - 2 * CUISSE * (1 - Math.cos(f)) + 0.04 * A * Math.abs(Math.sin(e.phase));
    j.buste.rotation.x = f * 0.7 + 0.15 * A;

    [0, 1].forEach(i => {
      const s = i === 0 ? 1 : -1;
      const ph = e.phase + (i === 0 ? 0 : Math.PI);
      const jb = j.jambes[i];
      jb.hanche.rotation.x = -f - 0.75 * A * Math.sin(ph) - 0.5 * enLAir * (i === 0 ? 1 : 0.3);
      jb.hanche.rotation.z = s * q.ecart;
      jb.genou.rotation.x = 2 * f + A * (0.2 + 1.2 * Math.max(0, Math.cos(ph))) + 0.9 * enLAir * (i === 0 ? 1 : 0.4);

      const br = j.bras[i];
      const libre = cible.bras[i] === BRAS.repos; // bras qui balance en courant
      const base = libre ? melangeBras(q.bras[i], BRAS.course, course) : q.bras[i];
      br.epaule.rotation.x = base.x + (libre ? 0.7 * course * Math.sin(ph) : 0);
      br.epaule.rotation.z = s * base.z;
      br.coude.rotation.x = base.c;
    });
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

  function dessinerEtape(k, opacite, defense) {
    const p = timeline.pas[k];
    const matiere = couleur => new THREE.MeshBasicMaterial({ color: couleur, transparent: true, opacity: opacite, side: THREE.DoubleSide });
    for (const [id, m] of Object.entries(p.moves)) {
      const estDef = DEFENSEURS.includes(id);
      if ((estDef && !defense) || !m.de) continue;
      const couleur = estDef ? COULEURS.courseDef : COULEURS.attaque;
      const pts = cheminCourse(m);
      traces.add(new THREE.Mesh(ruban(pts, estDef ? 0.05 : 0.08, 0.014), matiere(couleur)));
      if (m.ecran) {
        const [a, b] = pts.slice(-2);
        const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const n = [-(b[1] - a[1]) / L * 0.4, (b[0] - a[0]) / L * 0.4];
        traces.add(new THREE.Mesh(ruban([[b[0] - n[0], b[1] - n[1]], [b[0] + n[0], b[1] + n[1]]], 0.1, 0.016), matiere(couleur)));
      } else {
        traces.add(pointe(pts, couleur, opacite));
      }
    }
    const v = p.passe || p.tir ? etatBalle(timeline, k, 1) : null;
    if (v && v.type === 'vol') {
      const pts = Array.from({ length: 31 }, (_, i) => pointVol(v, i / 30));
      const ligne = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({
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
    if (ui.suivre.value !== 'ballon') ui.suivre.value = '';
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

  // Point suivi par la caméra: le ballon ou un joueur.
  function pointSuivi() {
    const v = ui.suivre.value;
    if (v === 'ballon') return new THREE.Vector3(ballon.position.x, 0.8, ballon.position.z);
    const j = joueurs[v];
    if (j && j.g.visible) return new THREE.Vector3(j.g.position.x, 1.1, j.g.position.z);
    return null;
  }

  // Un clic (sans glisser) sur un joueur le fait suivre par la caméra.
  const raycaster = new THREE.Raycaster();
  let appui = null;
  renderer.domElement.addEventListener('pointerdown', e => { appui = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!appui || Math.hypot(e.clientX - appui[0], e.clientY - appui[1]) > 6) return;
    const r = renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1), camera);
    const visibles = Object.values(joueurs).filter(j => j.g.visible).map(j => j.g);
    const touche = raycaster.intersectObjects(visibles, true)[0];
    let o = touche && touche.object;
    while (o && !o.userData.id) o = o.parent;
    if (o && [...ui.suivre.options].some(op => op.value === o.userData.id)) {
      ui.suivre.value = o.userData.id;
      transition = null;
    }
  });

  /* ---------------- Application ---------------- */

  const $ = s => document.querySelector(s);
  const ui = {
    retour: $('#retour'), combo: $('#combo'), variante: $('#variante'), texte: $('#texte'), compteur: $('#compteur'),
    curseur: $('#curseur'), lecture: $('#lecture'), vitesse: $('#vitesse'),
    defense: $('#opt-defense'), traces: $('#opt-traces'), etiquettes: $('#opt-etiquettes'), suivre: $('#suivre'),
  };
  try { ui.vitesse.value = String(prefs.vitesse || 1); } catch (e) { /* valeur inconnue */ }
  if (!ui.vitesse.value) ui.vitesse.value = '1';

  let combo = null;
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
    og.append(...liste.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
      .map(c => Object.assign(document.createElement('option'), { value: c.id, textContent: c.nom })));
    ui.combo.appendChild(og);
  }

  function choisirVariante(i) {
    const v = combo.variantes ? combo.variantes[i] : null;
    const cv = window.HB.pourVariante(combo, v);
    timeline = compiler(cv, v ? v.etapes : combo.etapes);
    const libDef = window.HB.dispositif(cv).libelles;
    const libAtt = LIBELLES[prefs.libelles] || LIBELLES.postes;
    for (const id of TOUS_ATTAQUANTS) joueurs[id].libeller(libAtt[id]);
    for (const id of DEFENSEURS) joueurs[id].libeller(libDef[id] || id);
    for (const j of Object.values(joueurs)) j.etat.xy = null;

    // Liste "Suivre": le ballon et les joueurs présents.
    const suivi = ui.suivre.value;
    const presents = [...window.HB.attaquants(cv), ...window.HB.defenseurs(cv)];
    const nom = id => (DEFENSEURS.includes(id) ? (id === 'GB' ? 'Gardien' : `Défenseur ${libDef[id] || id}`) : NOMS[id]);
    ui.suivre.replaceChildren(
      new Option('Caméra libre', ''),
      new Option('Le ballon', 'ballon'),
      ...presents.map(id => new Option(nom(id), id)));
    ui.suivre.value = [...ui.suivre.options].some(o => o.value === suivi) ? suivi : '';

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
    // En ligne, chaque fiche a sa page; en local (fichier ouvert directement), on passe par #id.
    ui.retour.href = /^https?:$/.test(location.protocol) ? `c/${encodeURIComponent(combo.id)}/` : `index.html#${combo.id}`;
    ui.variante.hidden = !combo.variantes;
    ui.variante.replaceChildren(...(combo.variantes || []).map((v, i) => new Option(v.nom, String(i))));
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
  ui.suivre.addEventListener('change', () => { transition = null; });
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

  const main = new THREE.Vector3();
  const mainDe = id => {
    const j = joueurs[id];
    j.g.updateMatrixWorld(true);
    return j.bras[1].main.localToWorld(main.set(0, -0.06, 0.08)).clone();
  };
  const mainsDe = id => {
    const j = joueurs[id];
    j.g.updateMatrixWorld(true);
    const a = j.bras[0].main.localToWorld(new THREE.Vector3(0, -0.05, 0.06));
    const b = j.bras[1].main.localToWorld(new THREE.Vector3(0, -0.05, 0.06));
    return a.add(b).multiplyScalar(0.5);
  };

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
    else balle2D = b.xy || [0, 0];

    for (const id of [...TOUS_ATTAQUANTS, ...DEFENSEURS]) {
      const j = joueurs[id];
      const xy = posA(timeline, k, t, id);
      const estDef = DEFENSEURS.includes(id);
      j.g.visible = !!xy && (!estDef || defense);
      // Vue depuis le but: on masque le gardien quand la caméra est dans sa tête.
      if (xy && id === 'GB' && Math.hypot(camera.position.x - xy[0], camera.position.z - xy[1]) < 1.2 && camera.position.y < 2.6) j.g.visible = false;
      if (!xy) continue;
      j.sprite.visible = ui.etiquettes.checked && camera.position.distanceTo(j.g.position) > 4;

      let saut = 0;
      if (!estDef && window.HB.dansLaZone(xy)) saut = 0.5; // au-dessus de la zone: le joueur est en l'air
      if (tir && tir.par === id) saut = Math.max(saut, 0.45 * Math.sin(Math.PI * lisse(tir.t - 0.3, tir.t + 0.3, t)));
      animerJoueur(j, xy, posture(id, k, t, b), dt, saut, balle2D, estDef);
    }

    // Ballon: dans la main du porteur, ou en vol entre la main du passeur et celle du receveur.
    if (b.type === 'porte') {
      ballon.position.copy(mainDe(b.id));
    } else if (b.type === 'vol') {
      pointVol(b, b.u, ballon.position);
      if (b.de && joueurs[b.de].g.visible) ballon.position.lerp(mainDe(b.de), 1 - lisse(0, 0.2, b.u));
      if (b.receveur && joueurs[b.receveur].g.visible) ballon.position.lerp(mainsDe(b.receveur), lisse(0.8, 1, b.u));
    } else if (b.xy) {
      ballon.position.set(b.xy[0], 0.11, b.xy[1]);
    }

    if (kTraces !== k) {
      kTraces = k;
      for (const o of traces.children) { o.geometry.dispose(); o.material.dispose(); }
      traces.clear();
      if (ui.traces.checked) for (let i = 0; i < k; i++) dessinerEtape(i, 0.25, defense);
      dessinerEtape(k, 0.85, defense);
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

  let dernier = 0;
  function boucle(now) {
    const dt = dernier ? Math.min(0.064, (now - dernier) / 1000) : 0;
    dernier = now;
    avancer(now, dt);
    rendre(dt);

    const suivi = transition ? null : pointSuivi();
    if (transition) {
      transition.t = Math.min(1, transition.t + dt / 0.8);
      const u = ease(transition.t);
      camera.position.lerpVectors(transition.dePos, transition.versPos, u);
      controls.target.lerpVectors(transition.deCible, transition.versCible, u);
      if (transition.t >= 1) transition = null;
    } else if (suivi) {
      // La caméra garde son angle et suit le ballon ou le joueur choisi.
      const avant = controls.target.clone();
      controls.target.lerp(suivi, Math.min(1, dt * 3));
      camera.position.add(controls.target.clone().sub(avant));
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
