/*
 * Calcul du déroulement d'une combinaison (positions des joueurs et du ballon à chaque instant),
 * partagé par le schéma (js/app.js) et la vue 3D (js/vue3d.js).
 *
 * Temps: l'étape k (0-based) occupe [k, k+1]; t est la position dans l'étape, entre 0 et 1.
 */
window.HB.timeline = (() => {
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

  // Ballon sur le schéma vu de dessus: position et hauteur relative (vol, entre 0 et 1).
  function balleA(timeline, k, t) {
    const p = timeline.pas[k];
    const avant = timeline.etats[k];
    const porte = id => {
      const q = posA(timeline, k, t, id);
      return [q[0] + 0.42, q[1] - 0.42];
    };
    if (p.passe) {
      const { de, a, t: t0 } = p.passe;
      if (t < t0) return { xy: porte(de), vol: 0 };
      const u = t0 >= 1 ? 1 : (t - t0) / (1 - t0);
      const dep = posA(timeline, k, t0, de);
      const arr = posA(timeline, k, 1, a);
      const d = [dep[0] + 0.42, dep[1] - 0.42];
      const f = [arr[0] + 0.42, arr[1] - 0.42];
      return { xy: lerp(d, f, u), vol: Math.sin(Math.PI * u) };
    }
    if (p.tir) {
      if (t < p.tir.t) return { xy: porte(p.tir.par), vol: 0 };
      const u = (t - p.tir.t) / (1 - p.tir.t);
      const dep = posA(timeline, k, p.tir.t, p.tir.par);
      return { xy: lerp([dep[0] + 0.42, dep[1] - 0.42], p.tir.cible, ease(u)), vol: 0.4 * Math.sin(Math.PI * u) };
    }
    if (avant.porteur) return { xy: porte(avant.porteur), vol: 0 };
    return { xy: avant.balle, vol: 0 };
  }

  return { lerp, bez, ease, clamp, compiler, posA, balleA };
})();
