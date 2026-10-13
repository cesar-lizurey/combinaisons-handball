/*
 * Constantes partagées par le site (js/app.js) et le vérificateur (tools/verifier.js).
 *
 * Repère en mètres: x de -10 (touche gauche) à +10 (touche droite), y = distance à la ligne de but.
 * Gauche/droite du point de vue des attaquants qui font face au but.
 */
window.HB = (() => {
  const ATTAQUANTS = ['AiG', 'ArG', 'DC', 'ArD', 'AiD', 'Piv'];
  // J7: 7e joueur de champ (jeu à 7 contre 6), présent seulement si la combinaison le place dans `depart`.
  const SUPPLEMENTAIRES = ['J7'];
  const DEFENSEURS = ['G1', 'G2', 'G3', 'D3', 'D2', 'D1', 'GB'];

  const DEPART_ATTAQUE = {
    AiG: [-9.0, 1.2], ArG: [-5.5, 9.5], DC: [0, 10.5], ArD: [5.5, 9.5], AiD: [9.0, 1.2], Piv: [0, 6.4],
  };

  /*
   * Dispositifs défensifs. Les identifiants restent G1, G2, G3, D3, D2, D1 (de la gauche vers la droite
   * vue par l'attaque); seuls les placements et les libellés changent.
   *   5-1: D3 est l'avancé ("A"), G3 le central sur la ligne.
   *   3-2-1: G1/D1 extérieurs, G3 central sur la ligne, G2/D2 demi-avancés, D3 avancé.
   *   4-2: G3/D3 sont les deux avancés.
   */
  const DISPOSITIFS = {
    '0-6': {
      nom: 'Défense 0-6',
      pos: {
        G1: [-7.4, 1.9], G2: [-5.0, 5.0], G3: [-1.7, 6.6], D3: [1.7, 6.6], D2: [5.0, 5.0], D1: [7.4, 1.9], GB: [0, 0.6],
      },
      libelles: { G1: '1', G2: '2', G3: '3', D3: '3', D2: '2', D1: '1', GB: 'GB' },
    },
    '5-1': {
      nom: 'Défense 5-1',
      pos: {
        G1: [-7.4, 1.9], G2: [-4.6, 5.3], G3: [-0.8, 6.6], D3: [0, 9.0], D2: [4.6, 5.3], D1: [7.4, 1.9], GB: [0, 0.6],
      },
      libelles: { G1: '1', G2: '2', G3: '3', D3: 'A', D2: '2', D1: '1', GB: 'GB' },
      attaque: { Piv: [0.6, 6.4] },
    },
    '3-2-1': {
      nom: 'Défense 3-2-1',
      pos: {
        G1: [-7.0, 2.6], G2: [-4.4, 7.6], G3: [-0.8, 6.6], D3: [0, 9.4], D2: [4.4, 7.6], D1: [7.0, 2.6], GB: [0, 0.6],
      },
      libelles: { G1: '1', G2: '2', G3: '3', D3: 'A', D2: '2', D1: '1', GB: 'GB' },
      attaque: { Piv: [0.6, 6.4] },
    },
    '4-2': {
      nom: 'Défense 4-2',
      pos: {
        G1: [-7.4, 1.9], G2: [-4.0, 5.6], G3: [-2.4, 9.0], D3: [2.4, 9.0], D2: [4.0, 5.6], D1: [7.4, 1.9], GB: [0, 0.6],
      },
      libelles: { G1: '1', G2: '2', G3: 'A', D3: 'A', D2: '2', D1: '1', GB: 'GB' },
    },
  };

  const NOMS = {
    AiG: 'Ailier gauche', ArG: 'Arrière gauche', DC: 'Demi-centre',
    ArD: 'Arrière droit', AiD: 'Ailier droit', Piv: 'Pivot', J7: '7e joueur de champ',
  };
  const LIBELLES = {
    postes: { AiG: 'AiG', ArG: 'ArG', DC: 'DC', ArD: 'ArD', AiD: 'AiD', Piv: 'Piv', J7: 'J7' },
    numeros: { AiG: '1', ArG: '2', DC: '3', ArD: '4', AiD: '5', Piv: '6', J7: '7' },
  };

  const dispositif = combo => DISPOSITIFS[combo.dispositif || '0-6'] || DISPOSITIFS['0-6'];

  // Positions de départ complètes d'une combinaison.
  // `absents`: joueurs exclus (supériorité / infériorité numérique), non affichés.
  const depart = combo => {
    const d = dispositif(combo);
    const pos = { ...DEPART_ATTAQUE, ...d.pos, ...(d.attaque || {}), ...(combo.depart || {}) };
    for (const id of combo.absents || []) delete pos[id];
    return pos;
  };

  // Joueurs d'attaque présents dans une combinaison.
  const attaquants = combo =>
    [...ATTAQUANTS, ...SUPPLEMENTAIRES.filter(id => combo.depart && combo.depart[id])]
      .filter(id => !(combo.absents || []).includes(id));

  // Une variante peut changer le porteur du ballon (`ballon`), le dispositif défensif (`dispositif`)
  // et des positions de départ (`depart`).
  const pourVariante = (combo, v) => (v && (v.ballon || v.depart || v.dispositif)
    ? {
      ...combo,
      ballon: v.ballon || combo.ballon,
      dispositif: v.dispositif || combo.dispositif,
      depart: { ...(combo.depart || {}), ...(v.depart || {}) },
    }
    : combo);

  // Défenseurs présents dans une combinaison.
  const defenseurs = combo => DEFENSEURS.filter(id => !(combo.absents || []).includes(id));

  // Vrai si le point est dans la zone des 6 m.
  const dansLaZone = ([x, y]) =>
    Math.abs(x) <= 1.5 ? y < 6 : Math.hypot(Math.abs(x) - 1.5, y) < 6;

  return {
    ATTAQUANTS, SUPPLEMENTAIRES, DEFENSEURS, DEPART_ATTAQUE, DISPOSITIFS, NOMS, LIBELLES,
    dispositif, depart, attaquants, defenseurs, dansLaZone, pourVariante,
  };
})();
