(() => {
  'use strict';

  const { ATTAQUANTS, SUPPLEMENTAIRES, DEFENSEURS, DISPOSITIFS, NOMS, LIBELLES } = window.HB;
  const TOUS_ATTAQUANTS = [...ATTAQUANTS, ...SUPPLEMENTAIRES];

  const FIABILITE = {
    sourcee: {
      label: 'Sourcée',
      texte: 'Le déroulement s\'appuie sur les sources ci-dessous. Le placement exact des joueurs sur le schéma reste une illustration.',
    },
    partielle: {
      label: 'Partiellement sourcée',
      texte: 'Les sources confirment le principe, mais une partie du déroulement est une reconstruction: à vérifier avec ton club.',
    },
    'a-verifier': {
      label: 'À vérifier',
      texte: 'Aucune source solide trouvée pour ce déroulement. Il reflète une pratique courante, mais doit être validé par un entraîneur.',
    },
  };

  const DUREE_ETAPE = 1700; // ms à vitesse 1
  const PAUSE_ETAPE = 650;  // ms de pause entre deux étapes en lecture
  const SVG_NS = 'http://www.w3.org/2000/svg';

  /* ---------------- Préférences ---------------- */

  const prefs = { libelles: 'postes', defense: true, traces: true, vitesse: 1 };
  try {
    Object.assign(prefs, JSON.parse(localStorage.getItem('hb-prefs') || '{}'));
  } catch (e) { /* stockage indisponible */ }
  const sauverPrefs = () => {
    try { localStorage.setItem('hb-prefs', JSON.stringify(prefs)); } catch (e) { /* ignoré */ }
  };

  const { lerp, bez, clamp, compiler, posA, balleA } = window.HB.timeline;

  /* ---------------- Terrain SVG ---------------- */

  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (parent) parent.appendChild(n);
    return n;
  };

  function dessinerTerrain(svg) {
    const defs = el('defs', {}, svg);
    for (const [id, cls] of [['fl-course', 'mk-course'], ['fl-passe', 'mk-passe'], ['fl-tir', 'mk-tir']]) {
      const m = el('marker', {
        id, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse',
      }, defs);
      el('path', { d: 'M0,0 L10,5 L0,10 z', class: cls }, m);
    }
    const pat = el('pattern', { id: 'filet', width: 0.3, height: 0.3, patternUnits: 'userSpaceOnUse' }, defs);
    el('path', { d: 'M0,0 L0.3,0.3 M0.3,0 L0,0.3', class: 'filet' }, pat);

    const t = el('g', { class: 'terrain' }, svg);
    el('rect', { x: -10.8, y: -1.8, width: 21.6, height: 14.4, class: 'sol-ext' }, t);
    el('rect', { x: -10, y: 0, width: 20, height: 12.6, class: 'sol' }, t);
    el('path', { d: 'M -7.5 0 A 6 6 0 0 0 -1.5 6 L 1.5 6 A 6 6 0 0 0 7.5 0 Z', class: 'zone' }, t);
    el('path', { d: 'M -10 2.958 A 9 9 0 0 0 -1.5 9 L 1.5 9 A 9 9 0 0 0 10 2.958', class: 'ligne neuf' }, t);
    el('line', { x1: -0.5, y1: 7, x2: 0.5, y2: 7, class: 'ligne' }, t);
    el('line', { x1: -0.08, y1: 4, x2: 0.08, y2: 4, class: 'ligne' }, t);
    el('line', { x1: -10, y1: 0, x2: 10, y2: 0, class: 'ligne' }, t);
    el('line', { x1: -10, y1: 0, x2: -10, y2: 12.6, class: 'ligne' }, t);
    el('line', { x1: 10, y1: 0, x2: 10, y2: 12.6, class: 'ligne' }, t);
    el('rect', { x: -1.5, y: -1, width: 3, height: 1, class: 'but' }, t);
    el('path', { d: 'M -1.5 0 L -1.5 -1 L 1.5 -1 L 1.5 0', class: 'poteaux' }, t);
    const lbl = (x, y, s) => { const n = el('text', { x, y, class: 'cote' }, t); n.textContent = s; };
    lbl(-9.8, 6.4, '6 m');
    lbl(-9.8, 9.9, '9 m');

    return {
      tracesAnciennes: el('g', { class: 'traces anciennes' }, svg),
      traces: el('g', { class: 'traces' }, svg),
      joueurs: el('g', { class: 'joueurs' }, svg),
      balle: el('g', { class: 'balle' }, svg),
    };
  }

  function cheminCourse(m) {
    return m.via
      ? `M ${m.de[0]} ${m.de[1]} Q ${m.via[0]} ${m.via[1]} ${m.vers[0]} ${m.vers[1]}`
      : `M ${m.de[0]} ${m.de[1]} L ${m.vers[0]} ${m.vers[1]}`;
  }

  // Raccourcit un segment pour que la flèche s'arrête au bord du joueur.
  function raccourcir(a, b, da, db) {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const L = Math.hypot(dx, dy) || 1;
    return [[a[0] + dx / L * da, a[1] + dy / L * da], [b[0] - dx / L * db, b[1] - dy / L * db]];
  }

  function dessinerTraces(g, timeline, k, defenseVisible) {
    g.replaceChildren();
    const p = timeline.pas[k];
    for (const [id, m] of Object.entries(p.moves)) {
      const estDef = DEFENSEURS.includes(id);
      if (estDef && !defenseVisible) continue;
      el('path', {
        d: cheminCourse(m),
        class: `course ${estDef ? 'def' : 'att'}`,
        'marker-end': m.ecran ? '' : 'url(#fl-course)',
      }, g);
      if (m.ecran) {
        const avant = m.via ? bez(m.de, m.via, m.vers, 0.92) : lerp(m.de, m.vers, 0.92);
        const dx = m.vers[0] - avant[0], dy = m.vers[1] - avant[1];
        const L = Math.hypot(dx, dy) || 1;
        const nx = -dy / L * 0.5, ny = dx / L * 0.5;
        el('line', {
          x1: m.vers[0] + nx, y1: m.vers[1] + ny, x2: m.vers[0] - nx, y2: m.vers[1] - ny, class: 'ecran',
        }, g);
      }
    }
    if (p.passe) {
      const a = posA(timeline, k, p.passe.t, p.passe.de);
      const b = posA(timeline, k, 1, p.passe.a);
      const [s, e] = raccourcir(a, b, 0.7, 0.75);
      el('line', { x1: s[0], y1: s[1], x2: e[0], y2: e[1], class: 'passe', 'marker-end': 'url(#fl-passe)' }, g);
    }
    if (p.tir) {
      const a = posA(timeline, k, p.tir.t, p.tir.par);
      const [s, e] = raccourcir(a, p.tir.cible, 0.7, 0);
      el('line', { x1: s[0], y1: s[1], x2: e[0], y2: e[1], class: 'tir', 'marker-end': 'url(#fl-tir)' }, g);
    }
  }

  function creerJoueurs(g) {
    g.replaceChildren();
    const noeuds = {};
    for (const id of DEFENSEURS) {
      const n = el('g', { class: id === 'GB' ? 'joueur gardien' : 'joueur defenseur' }, g);
      if (id === 'GB') el('circle', { r: 0.5 }, n);
      else el('path', { d: 'M -0.6 -0.45 L 0.6 -0.45 L 0 0.6 Z', 'stroke-linejoin': 'round' }, n);
      el('text', { y: id === 'GB' ? 0.02 : -0.08 }, n);
      noeuds[id] = n;
    }
    for (const id of TOUS_ATTAQUANTS) {
      const n = el('g', { class: 'joueur attaquant' }, g);
      el('title', {}, n).textContent = NOMS[id];
      el('circle', { r: 0.62 }, n);
      const t = el('text', { y: 0.02 }, n);
      noeuds[id] = { g: n, texte: t };
    }
    return noeuds;
  }

  /* ---------------- Application ---------------- */

  const $ = s => document.querySelector(s);
  const liste = $('#liste');
  const recherche = $('#recherche');
  const filtreDefense = $('#filtre-defense');
  const compteurListe = $('#compteur-liste');
  const filtreFiabilite = $('#filtre-fiabilite');
  filtreDefense.append(...Object.entries(DISPOSITIFS).map(([cle, d]) =>
    Object.assign(document.createElement('option'), { value: cle, textContent: d.nom })));
  const svg = $('#schema');
  const calques = dessinerTerrain(svg);
  const joueurs = creerJoueurs(calques.joueurs);
  const balle = el('circle', { r: 0.3, class: 'ballon' }, calques.balle);

  const ui = {
    titre: $('#titre'), alias: $('#alias'), meta: $('#meta'), resume: $('#resume'),
    variantes: $('#variantes'), description: $('#description'), objectif: $('#objectif'),
    points: $('#points'), etapes: $('#etapes'), texteEtape: $('#texte-etape'),
    compteur: $('#compteur'), curseur: $('#curseur'), lecture: $('#lecture'),
    vitesse: $('#vitesse'), lien3d: $('#lien-3d'), sources: $('#sources'), fiabiliteTexte: $('#fiabilite-texte'),
  };

  let combo = null;
  let timeline = null;
  let T = 0;            // temps global: l'étape k (0-based) occupe [k, k+1]
  let cible = null;     // temps vers lequel on anime
  let enLecture = false;
  let pauseJusqua = 0;
  let dernier = 0;
  let raf = 0;

  function majLibelles() {
    for (const id of TOUS_ATTAQUANTS) joueurs[id].texte.textContent = LIBELLES[prefs.libelles][id];
    svg.classList.toggle('numeros', prefs.libelles === 'numeros');
    document.querySelectorAll('[data-libelles]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.libelles === prefs.libelles)));
    const presents = combo ? window.HB.attaquants(combo) : ATTAQUANTS;
    $('#legende-postes').replaceChildren(...presents.map(id => {
      const li = document.createElement('li');
      li.innerHTML = `<b>${LIBELLES[prefs.libelles][id]}</b> ${NOMS[id]}`;
      return li;
    }));
  }

  function rendre() {
    const n = timeline.pas.length;
    const k = Math.min(Math.floor(T), n - 1);
    const t = T - k;

    for (const id of [...TOUS_ATTAQUANTS, ...DEFENSEURS]) {
      const node = joueurs[id].g || joueurs[id];
      const p = posA(timeline, k, t, id);
      node.style.display = p ? '' : 'none';
      if (p) node.setAttribute('transform', `translate(${p[0].toFixed(3)} ${p[1].toFixed(3)})`);
    }
    calques.joueurs.classList.toggle('sans-defense', !prefs.defense);

    const b = balleA(timeline, k, t);
    balle.setAttribute('cx', b.xy[0].toFixed(3));
    balle.setAttribute('cy', b.xy[1].toFixed(3));
    balle.setAttribute('r', (0.3 + 0.14 * b.vol).toFixed(3));

    if (rendre.k !== k || rendre.defense !== prefs.defense || rendre.tl !== timeline) {
      rendre.k = k; rendre.defense = prefs.defense; rendre.tl = timeline;
      dessinerTraces(calques.traces, timeline, k, prefs.defense);
      calques.tracesAnciennes.replaceChildren();
      for (let i = 0; i < k; i++) {
        const g = el('g', {}, calques.tracesAnciennes);
        dessinerTraces(g, timeline, i, prefs.defense);
      }
      ui.texteEtape.textContent = timeline.pas[k].texte;
      ui.compteur.textContent = `Étape ${k + 1} / ${n}`;
      ui.etapes.querySelectorAll('li').forEach((li, i) => {
        li.classList.toggle('active', i === k);
        li.classList.toggle('faite', i < k || (i === k && T >= n));
      });
    }
    calques.tracesAnciennes.style.display = prefs.traces ? '' : 'none';
    ui.curseur.value = String(T);
    ui.lecture.textContent = enLecture ? '⏸' : '▶';
    ui.lecture.setAttribute('aria-label', enLecture ? 'Pause' : 'Lecture');
  }

  function boucle(now) {
    raf = 0;
    const dt = Math.min(64, now - (dernier || now));
    dernier = now;
    if (cible === null) return;
    if (now < pauseJusqua) { raf = requestAnimationFrame(boucle); return; }

    const sens = Math.sign(cible - T);
    const facteur = enLecture ? 1 : 1.6; // les pas manuels sont un peu plus rapides
    let suivant = T + sens * dt * prefs.vitesse * facteur / DUREE_ETAPE;

    // En lecture continue, on marque une courte pause à chaque fin d'étape.
    if (enLecture && sens > 0 && Math.floor(suivant) > Math.floor(T) && Math.floor(suivant) < cible) {
      suivant = Math.floor(suivant);
      pauseJusqua = now + PAUSE_ETAPE / prefs.vitesse;
    }
    if ((sens > 0 && suivant >= cible) || (sens < 0 && suivant <= cible) || sens === 0) {
      T = cible;
      cible = null;
      enLecture = false;
    } else {
      T = suivant;
    }
    rendre();
    if (cible !== null) raf = requestAnimationFrame(boucle);
  }

  function animerVers(c, lecture = false) {
    cible = clamp(c, 0, timeline.pas.length);
    enLecture = lecture;
    pauseJusqua = 0;
    dernier = 0;
    if (!raf) raf = requestAnimationFrame(boucle);
    rendre();
  }

  function arreter() {
    cible = null;
    enLecture = false;
    rendre();
  }

  const commandes = {
    lecture() {
      if (enLecture) return arreter();
      if (T >= timeline.pas.length) T = 0;
      animerVers(timeline.pas.length, true);
    },
    suivant() { animerVers(Math.floor(T + 1e-6) + 1); },
    precedent() { animerVers(Math.ceil(T - 1e-6) - 1); },
    debut() { arreter(); T = 0; rendre(); },
    fin() { arreter(); T = timeline.pas.length; rendre(); },
  };

  /* ---------------- Affichage d'une combinaison ---------------- */

  function choisirVariante(i) {
    const v = combo.variantes ? combo.variantes[i] : null;
    const cv = window.HB.pourVariante(combo, v);
    timeline = compiler(cv, v ? v.etapes : combo.etapes);
    const libellesDef = window.HB.dispositif(cv).libelles;
    for (const id of DEFENSEURS) joueurs[id].querySelector('text').textContent = libellesDef[id];
    ui.variantes.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
    ui.lien3d.href = `${RACINE}3d.html?c=${encodeURIComponent(combo.id)}${combo.variantes ? `&v=${i}` : ''}`;
    ui.curseur.max = String(timeline.pas.length);
    ui.etapes.replaceChildren(...timeline.pas.map((p, k) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = p.texte;
      b.addEventListener('click', () => { arreter(); T = k; rendre(); animerVers(k + 1); });
      li.appendChild(b);
      return li;
    }));
    arreter();
    T = 0;
    rendre.k = -1;
    rendre();
  }

  function afficher(id) {
    combo = window.COMBINAISONS.find(c => c.id === id) || window.COMBINAISONS[0];
    document.title = `${combo.nom} - Combinaisons de handball`;
    ui.titre.textContent = combo.nom;
    ui.alias.textContent = combo.alias ? `Aussi appelée: ${combo.alias}` : '';
    ui.alias.hidden = !combo.alias;
    const disp = window.HB.dispositif(combo);
    majLibelles();
    const fiab = FIABILITE[combo.fiabilite] || FIABILITE['a-verifier'];
    ui.meta.replaceChildren(
      Object.assign(document.createElement('span'), { className: 'puce', textContent: combo.categorie }),
      Object.assign(document.createElement('span'), { className: 'puce', textContent: combo.defense ? `Défense ${combo.defense}` : disp.nom }),
      Object.assign(document.createElement('button'), {
        type: 'button',
        className: `puce fiabilite ${combo.fiabilite || 'a-verifier'}`,
        textContent: fiab.label,
        onclick: () => ui.sources.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      }),
    );
    ui.fiabiliteTexte.textContent = fiab.texte;
    ui.sources.replaceChildren(...(combo.sources || []).map(s => {
      const li = document.createElement('li');
      const a = Object.assign(document.createElement('a'), { href: s.url, textContent: s.titre, target: '_blank', rel: 'noopener' });
      li.appendChild(a);
      if (s.note) li.append(`: ${s.note}`);
      return li;
    }));
    if (!(combo.sources || []).length) {
      ui.sources.appendChild(Object.assign(document.createElement('li'), { textContent: 'Aucune source pour le moment.' }));
    }
    ui.resume.textContent = combo.resume;
    ui.description.replaceChildren(...combo.description.map(t => Object.assign(document.createElement('p'), { textContent: t })));
    ui.objectif.textContent = combo.objectif;
    ui.points.replaceChildren(...(combo.pointsCles || []).map(t => Object.assign(document.createElement('li'), { textContent: t })));

    ui.variantes.replaceChildren();
    ui.variantes.hidden = !combo.variantes;
    (combo.variantes || []).forEach((v, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = v.nom;
      b.addEventListener('click', () => choisirVariante(i));
      ui.variantes.appendChild(b);
    });

    ouvertes.add(combo.categorie);
    construireListe();
    const actif = liste.querySelector('a[aria-current="true"]');
    if (actif) actif.scrollIntoView({ block: 'nearest' });
    choisirVariante(0);
  }

  const ouvertes = new Set(); // catégories dépliées dans la liste

  function construireListe() {
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const q = norm(recherche.value.trim());
    const fDef = filtreDefense.value;
    const fFiab = filtreFiabilite.value;
    const groupes = new Map();
    for (const c of window.COMBINAISONS) {
      if (q && !norm(`${c.nom} ${c.alias || ''} ${c.categorie} ${c.resume || ''}`).includes(q)) continue;
      if (fDef && (c.dispositif || '0-6') !== fDef && !(c.defense || '').includes(fDef)) continue;
      if (fFiab && (c.fiabilite || 'a-verifier') !== fFiab) continue;
      if (!groupes.has(c.categorie)) groupes.set(c.categorie, []);
      groupes.get(c.categorie).push(c);
    }
    const filtre = Boolean(q || fDef || fFiab);
    liste.replaceChildren();
    for (const [cat, items] of groupes) {
      const details = document.createElement('details');
      details.open = filtre || ouvertes.has(cat);
      details.addEventListener('toggle', () => {
        if (filtre) return;
        if (details.open) ouvertes.add(cat); else ouvertes.delete(cat);
      });
      const resume = document.createElement('summary');
      resume.innerHTML = `<span></span><span class="nb">${items.length}</span>`;
      resume.firstChild.textContent = cat;
      const ul = document.createElement('ul');
      for (const c of items.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = lien(c.id);
        a.dataset.id = c.id;
        a.textContent = c.nom;
        if (c.fiabilite !== 'sourcee') {
          const m = Object.assign(document.createElement('span'), {
            className: `marque ${c.fiabilite || 'a-verifier'}`,
            title: (FIABILITE[c.fiabilite] || FIABILITE['a-verifier']).label,
          });
          a.appendChild(m);
        }
        a.setAttribute('aria-current', String(Boolean(combo && combo.id === c.id)));
        li.appendChild(a);
        ul.appendChild(li);
      }
      details.append(resume, ul);
      liste.append(details);
    }
    if (!groupes.size) liste.innerHTML = '<p class="vide">Aucune combinaison trouvée.</p>';
    const n = [...groupes.values()].reduce((t, g) => t + g.length, 0);
    compteurListe.textContent = `${n} / ${window.COMBINAISONS.length} combinaisons`;
  }

  /* ---------------- Événements ---------------- */

  $('#lecture').addEventListener('click', commandes.lecture);
  $('#suivant').addEventListener('click', commandes.suivant);
  $('#precedent').addEventListener('click', commandes.precedent);
  $('#debut').addEventListener('click', commandes.debut);
  $('#fin').addEventListener('click', commandes.fin);
  ui.curseur.addEventListener('input', () => {
    T = Number(ui.curseur.value);
    arreter();
  });

  ui.vitesse.value = String(prefs.vitesse);
  ui.vitesse.addEventListener('change', () => { prefs.vitesse = Number(ui.vitesse.value); sauverPrefs(); });

  document.querySelectorAll('[data-libelles]').forEach(b => b.addEventListener('click', () => {
    prefs.libelles = b.dataset.libelles; sauverPrefs(); majLibelles();
  }));
  const caseDef = $('#opt-defense');
  const caseTraces = $('#opt-traces');
  caseDef.checked = prefs.defense;
  caseTraces.checked = prefs.traces;
  caseDef.addEventListener('change', () => { prefs.defense = caseDef.checked; sauverPrefs(); rendre(); });
  caseTraces.addEventListener('change', () => { prefs.traces = caseTraces.checked; sauverPrefs(); rendre(); });

  recherche.addEventListener('input', construireListe);
  filtreDefense.addEventListener('change', construireListe);
  filtreFiabilite.addEventListener('change', construireListe);
  /* ---------------- Page "À propos" ---------------- */

  const vueFiche = $('#vue-fiche');
  const vueAPropos = $('#vue-a-propos');

  function remplirAPropos() {
    const C = window.COMBINAISONS;
    const urls = new Set();
    const domaines = new Map();
    for (const c of C) {
      for (const src of c.sources || []) {
        if (urls.has(src.url)) continue;
        urls.add(src.url);
        let hote;
        try {
          // Les pages archivées sont comptées sous le site d'origine.
          const archive = src.url.match(/web\.archive\.org\/web\/[^/]+\/(.+)$/);
          hote = new URL(archive ? (/^https?:/.test(archive[1]) ? archive[1] : `http://${archive[1]}`) : src.url)
            .hostname.replace(/^www\./, '');
        } catch (e) { continue; }
        domaines.set(hote, (domaines.get(hote) || 0) + 1);
      }
    }
    const stats = {
      fiches: C.length,
      variantes: C.reduce((n, c) => n + (c.variantes ? c.variantes.length : 1), 0),
      sourcees: C.filter(c => c.fiabilite === 'sourcee').length,
      liens: urls.size,
      categories: new Set(C.map(c => c.categorie)).size,
    };
    vueAPropos.querySelectorAll('[data-stat]').forEach(n => {
      n.textContent = stats[n.dataset.stat].toLocaleString('fr-FR').replace(/\s/g, ' ');
    });
    const tries = [...domaines].sort((a, b) => b[1] - a[1]);
    const MAX = 20;
    const liste = $('#liste-domaines');
    liste.replaceChildren(...tries.slice(0, MAX).map(([hote, n]) => {
      const li = document.createElement('li');
      li.innerHTML = `<span></span><span class="nb">${n} page${n > 1 ? 's' : ''}</span>`;
      li.firstChild.textContent = hote;
      return li;
    }));
    if (tries.length > MAX) {
      liste.appendChild(Object.assign(document.createElement('li'), {
        className: 'autres', textContent: `et ${tries.length - MAX} autres sites`,
      }));
    }
  }

  /* ---------------- Adresses ---------------- */

  // En ligne, chaque fiche a sa propre page (c/<id>/, générée par tools/generer.js) et l'on
  // navigue sans recharger grâce à l'historique. En local (file://), on navigue par #id.
  const enLigne = /^https?:$/.test(location.protocol);
  const RACINE = new URL(document.body.dataset.racine || './', location.href).href;
  const adresse = id => {
    if (id === 'a-propos') return `${RACINE}a-propos/`;
    return id ? `${RACINE}c/${encodeURIComponent(id)}/` : RACINE;
  };
  const lien = id => (enLigne ? adresse(id) : `#${id}`);

  function routeCourante() {
    if (location.hash.length > 1) return decodeURIComponent(location.hash.slice(1));
    const chemin = location.href.startsWith(RACINE) ? location.href.slice(RACINE.length).split(/[?#]/)[0] : '';
    const m = chemin.match(/^c\/([^/]+)/);
    if (m) return decodeURIComponent(m[1]);
    return /^a-propos/.test(chemin) ? 'a-propos' : '';
  }

  function naviguer(id) {
    if (enLigne) {
      history.pushState(null, '', adresse(id));
      apresNavigation();
    } else {
      location.hash = id;
    }
  }

  function router() {
    const id = routeCourante();
    const aPropos = id === 'a-propos';
    vueFiche.hidden = aPropos;
    vueAPropos.hidden = !aPropos;
    $('.lien-a-propos').setAttribute('aria-current', String(aPropos));
    if (aPropos) {
      if (timeline) arreter();
      document.title = 'À propos - Combinaisons de handball';
      liste.querySelectorAll('a[aria-current="true"]').forEach(a => a.setAttribute('aria-current', 'false'));
      window.scrollTo(0, 0);
      return;
    }
    afficher(id);
  }

  /* ---------------- Liste en plein écran (mobile) ---------------- */

  const boutonMenu = $('#ouvrir-menu');
  const mobile = () => window.matchMedia('(max-width: 900px)').matches;
  function ouvrirMenu() {
    document.body.classList.add('menu-ouvert');
    boutonMenu.setAttribute('aria-expanded', 'true');
    const actif = liste.querySelector('a[aria-current="true"]');
    if (actif) actif.scrollIntoView({ block: 'center' });
  }
  function fermerMenu() {
    document.body.classList.remove('menu-ouvert');
    boutonMenu.setAttribute('aria-expanded', 'false');
  }
  boutonMenu.addEventListener('click', ouvrirMenu);
  $('#fermer-menu').addEventListener('click', fermerMenu);
  // Choisir une fiche (même celle déjà affichée) referme la liste.
  $('#menu').addEventListener('click', e => { if (e.target.closest('a')) fermerMenu(); });

  function apresNavigation() {
    fermerMenu();
    router();
    if (mobile()) window.scrollTo(0, 0);
  }

  // Liens internes: liste des fiches, titre du site, page "À propos".
  document.querySelectorAll('[data-route]').forEach(a => { a.href = lien(a.dataset.route); });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-id], a[data-route]');
    if (!a || !enLigne || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    naviguer(a.dataset.id !== undefined ? a.dataset.id : a.dataset.route);
  });
  window.addEventListener('popstate', apresNavigation);
  window.addEventListener('hashchange', () => {
    // Anciennes adresses en #id: en ligne, on les remplace par l'adresse de la page.
    if (enLigne) history.replaceState(null, '', adresse(routeCourante()));
    apresNavigation();
  });

  document.addEventListener('keydown', e => {
    if (e.target.closest('input, select, textarea') && e.target.type !== 'range') return;
    const actions = { ' ': 'lecture', ArrowRight: 'suivant', ArrowLeft: 'precedent', Home: 'debut', End: 'fin' };
    if (e.key === 'Escape' && document.body.classList.contains('menu-ouvert')) { fermerMenu(); return; }
    const a = actions[e.key];
    if (!a || vueFiche.hidden) return;
    if (e.target.type === 'range' && a !== 'lecture') return;
    e.preventDefault();
    commandes[a]();
  });

  construireListe();
  majLibelles();
  remplirAPropos();
  if (enLigne && location.hash.length > 1) history.replaceState(null, '', adresse(routeCourante()));
  router();
})();
