/* croisés à trois joueurs et plus (triples croisés, doubles croisés, enchaînements de croisés). */
(() => {
  /* Triple croisé des arrières (handballtraining.de): deux croisés RMxRL puis RLxRR, changements d'écran du pivot. */
  const BASE_TRIPLE_ARRIERES = [
    {
      texte: "L'arrière droit donne au demi-centre, qui attaque le 3 gauche pour le fixer, avec l'intention de tirer. Le pivot bloque le 3 droit côté intérieur.",
      courses: { DC: [-2.2, 8.6], Piv: { vers: [0.8, 6.7], ecran: true } },
      passe: ['ArD', 'DC', 0.1],
      def: { G3: [-2.2, 7.4], D3: [1.8, 6.8] },
    },
    {
      texte: "Premier croisé: l'arrière gauche arrive en arc par le centre, derrière le demi-centre, et reçoit. Le demi-centre se replace au poste d'arrière gauche.",
      courses: {
        ArG: { vers: [0.0, 9.2], via: [-3.6, 10.8] },
        DC: { vers: [-5.2, 9.8], via: [-3.6, 9.0] },
      },
      passe: ['DC', 'ArG', 0.35],
      def: { G3: [-1.8, 7.0] },
    },
    {
      texte: "L'arrière gauche, lancé, cherche le 1 contre 1 sur le 3 droit. L'arrière droit prend de l'élan vers l'extérieur.",
      courses: { ArG: [1.9, 8.5], ArD: [6.4, 10.4] },
      def: { D3: [1.9, 7.4] },
    },
    {
      texte: "Second croisé: l'arrière droit arrive en arc par le centre et reçoit. L'arrière gauche se replace au poste d'arrière droit. Le pivot change d'écran: il bloque le 3 gauche côté intérieur.",
      courses: {
        ArD: { vers: [-0.6, 9.2], via: [3.2, 11.0] },
        ArG: { vers: [5.2, 9.6], via: [3.8, 9.0] },
        Piv: { vers: [-0.8, 6.7], ecran: true },
      },
      passe: ['ArG', 'ArD', 0.35],
      def: { G3: [-1.9, 6.8], D3: [1.6, 6.9] },
    },
  ];

  /* Double croisé pour l'arrière opposé (Dragør f382): DCxARD puis ALDxDC, longue passe à ARG. */
  const BASE_DOUBLE_OPPOSE = [
    {
      texte: "Le demi-centre passe à l'arrière droit, qui arrive lancé en diagonale vers le centre. L'ailier droit remonte un peu.",
      courses: { ArD: [2.2, 8.6], AiD: [8.6, 4.6] },
      passe: ['DC', 'ArD', 0.15],
      def: { D3: [2.0, 7.3] },
    },
    {
      texte: "Le demi-centre court vers la droite et croise avec l'arrière droit: il passe derrière lui et reçoit le ballon.",
      courses: { DC: { vers: [3.0, 8.4], via: [1.0, 9.8] }, ArD: [0.8, 7.6] },
      passe: ['ArD', 'DC', 0.5],
      def: { D3: [1.8, 7.0] },
    },
    {
      texte: "Le demi-centre continue vers la droite. L'ailier droit démarre vers l'intérieur et croise avec lui; le demi-centre lui donne le ballon.",
      courses: { DC: [5.6, 7.4], AiD: { vers: [3.4, 7.4], via: [6.0, 5.8] } },
      passe: ['DC', 'AiD', 0.35],
      def: { D2: [4.6, 5.8], D1: [7.2, 3.0] },
    },
    {
      texte: "Trois joueurs sont maintenant à droite et la défense glisse vers eux. L'ailier droit fait une longue passe à l'arrière gauche, qui arrive lancé. Le demi-centre se place en pivot à droite.",
      courses: { ArG: [-4.6, 8.6], DC: [6.0, 5.6] },
      passe: ['AiD', 'ArG', 0.2],
      def: { G1: [-7.0, 3.2], G2: [-4.2, 5.6], G3: [-1.0, 6.8] },
    },
  ];

  /* Double croisé avec double écran (Dragør f106). */
  const BASE_DOUBLE_ECRAN = [
    {
      texte: "Le demi-centre passe à l'arrière gauche, puis entre poser un écran sur le 2 droit, côté intérieur.",
      courses: { DC: { vers: [4.0, 6.5], via: [2.0, 8.6], ecran: true } },
      passe: ['DC', 'ArG', 0.1],
      def: { D2: [4.8, 5.7] },
    },
    {
      texte: "L'arrière gauche passe à l'arrière droit, qui entre en diagonale vers la gauche.",
      courses: { ArD: [1.4, 8.8], ArG: [-5.0, 9.2] },
      passe: ['ArG', 'ArD', 0.3],
      def: { D3: [1.9, 7.4] },
    },
    {
      texte: "Croisé: l'arrière gauche passe derrière l'arrière droit et reçoit. L'arrière droit continue vers l'intérieur et pose un écran sur le 2 gauche. Le pivot bloque le défenseur central (ici le 3 droit).",
      courses: {
        ArG: { vers: [0.6, 8.6], via: [-2.6, 10.4] },
        ArD: { vers: [-4.0, 6.5], ecran: true },
        Piv: { vers: [0.9, 6.7], ecran: true },
      },
      passe: ['ArD', 'ArG', 0.25],
      def: { G2: [-4.8, 5.7], D3: [1.9, 6.8] },
    },
  ];

  /* Double croisé face à une 5-1 (Dragør f1362). */
  const BASE_DOUBLE_5_1 = [
    {
      texte: "Le demi-centre se déplace vers la droite avec le ballon. L'avancé le suit vers l'intérieur.",
      courses: { DC: [2.4, 9.8] },
      def: { D3: [1.4, 8.6] },
    },
    {
      texte: "Il passe à l'arrière gauche, qui vient fixer l'extérieur du 2 gauche.",
      courses: { ArG: [-6.2, 7.6] },
      passe: ['DC', 'ArG', 0.3],
      def: { G2: [-5.4, 5.8], G1: [-6.8, 3.4] },
    },
    {
      texte: "L'ailier gauche croise derrière l'arrière gauche, reçoit et court vers le centre. L'arrière droit se lance vers la gauche; le demi-centre recule pour lui laisser la place.",
      courses: {
        AiG: { vers: [-3.2, 8.8], via: [-8.6, 10.6] },
        ArD: [3.4, 10.0],
        DC: [1.6, 11.4],
      },
      passe: ['ArG', 'AiG', 0.6],
      def: { G3: [-1.2, 6.9] },
    },
    {
      texte: "Second croisé: l'arrière droit traverse vers la gauche, derrière l'ailier gauche, qui lui donne le ballon.",
      courses: {
        AiG: [-0.6, 8.6],
        ArD: { vers: [-3.0, 8.4], via: [0.4, 11.2] },
      },
      passe: ['AiG', 'ArD', 0.55],
      def: { G2: [-4.8, 5.6], D3: [0.9, 8.8] },
    },
  ];

  /* Rentrée d'ailier avec double croisé (Dragør f452). */
  const BASE_RENTREE_DOUBLE = [
    {
      texte: "L'ailier gauche passe à son arrière, lancé, et entame sa rentrée en passant juste derrière lui.",
      courses: { ArG: [-4.6, 8.4], AiG: { vers: [-6.4, 9.8], via: [-8.6, 7.6] } },
      passe: ['AiG', 'ArG', 0.1],
      def: { G2: [-4.8, 5.8] },
    },
    {
      texte: "Le ballon circule vers le demi-centre. L'ailier gauche continue sa course derrière la ligne des arrières.",
      courses: { DC: [0, 9.0], AiG: [-1.6, 11.0] },
      passe: ['ArG', 'DC', 0.3],
    },
    {
      texte: "Le demi-centre donne à l'arrière droit, qui attaque l'intervalle entre le 3 et le 2 droits. L'ailier gauche traverse et va bloquer le 2 droit côté intérieur. Le pivot bloque le 3 droit côté extérieur.",
      courses: {
        ArD: [2.2, 8.0],
        AiG: { vers: [4.3, 6.4], via: [3.6, 9.8], ecran: true },
        Piv: { vers: [2.5, 6.7], ecran: true },
      },
      passe: ['DC', 'ArD', 0.2],
      def: { D2: [5.1, 5.6], D3: [1.6, 6.8] },
    },
  ];

  /* ARD/ARG pour un croisé demi/ailier (Dragør f1479). */
  const BASE_ARRIERES_DC_AILIER = [
    {
      texte: "Le demi-centre passe à l'arrière gauche, qui part en course rentrante vers la droite.",
      courses: { ArG: [-1.6, 9.0] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche croise avec l'arrière droit, qui passe derrière lui et reçoit. Le demi-centre part vers l'intervalle entre le 1 et le 2 gauches.",
      courses: {
        ArG: [2.4, 8.6],
        ArD: { vers: [0.4, 9.4], via: [3.0, 10.4] },
        DC: { vers: [-4.6, 8.0], via: [-2.6, 10.0] },
      },
      passe: ['ArG', 'ArD', 0.6],
    },
    {
      texte: "L'arrière droit fixe le centre de la défense. Le demi-centre attaque l'intervalle 1-2; l'ailier gauche passe derrière lui.",
      courses: {
        ArD: [0.0, 8.0],
        DC: [-6.2, 7.0],
        AiG: { vers: [-3.8, 8.6], via: [-8.0, 10.4] },
      },
      def: { G3: [-0.8, 7.0], D3: [0.9, 7.0], G1: [-7.0, 3.4], G2: [-5.4, 5.4] },
    },
    {
      texte: "L'arrière droit donne à l'ailier gauche, qui attaque le côté intérieur du 2 gauche.",
      courses: { AiG: [-3.4, 7.2] },
      passe: ['ArD', 'AiG', 0.3],
      def: { G2: [-4.6, 5.8] },
    },
  ];

  /* Combinaisons croisés (Dragør f1549): croisé ARG/ALG, puis 8 enchaînements côté droit. */
  const BASE_CROISE_AILIER = [
    {
      texte: "Le demi-centre passe à l'arrière gauche, qui attaque vers l'extérieur.",
      courses: { ArG: [-6.2, 7.8] },
      passe: ['DC', 'ArG', 0.1],
      def: { G2: [-5.6, 5.9] },
    },
    {
      texte: "Croisé arrière/ailier: l'ailier gauche coupe vers l'intérieur et reçoit le ballon. L'arrière gauche continue vers l'aile.",
      courses: { AiG: { vers: [-3.6, 8.2], via: [-7.4, 6.6] }, ArG: [-7.2, 6.6] },
      passe: ['ArG', 'AiG', 0.5],
      def: { G1: [-6.6, 3.6], G2: [-5.0, 5.6], G3: [-2.2, 6.9] },
    },
  ];
  const SUITE_CROISE_AILIER = [
    ...BASE_CROISE_AILIER,
    {
      texte: "L'ailier gauche donne à l'arrière droit, côté opposé.",
      courses: { AiG: [-2.6, 8.6], ArD: [5.2, 8.8] },
      passe: ['AiG', 'ArD', 0.3],
      def: { G3: [-1.7, 6.7] },
    },
  ];
  const SUITE_AILIER_DROIT = [
    ...SUITE_CROISE_AILIER,
    {
      texte: "L'arrière droit attaque l'extérieur du 2 droit. L'ailier droit remonte.",
      courses: { ArD: [6.4, 7.6], AiD: [8.6, 5.6] },
      def: { D2: [5.6, 6.0], D1: [7.6, 3.2] },
    },
  ];

  /* Combinaison sur croisé DC/ARD (Dragør f885). */
  const BASE_CROISE_DC_ARD = [
    {
      texte: "Le demi-centre passe à l'arrière gauche, qui lui rend le ballon.",
      courses: { ArG: [-5.8, 9.4] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "Le demi-centre avance et reçoit.",
      courses: { DC: [0.2, 9.0] },
      passe: ['ArG', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre se lance vers l'intervalle entre le 3 et le 2 droits pour tirer à 9 ou à 6 m. Le pivot bloque le 3 droit côté intérieur.",
      courses: { DC: [3.4, 7.8], Piv: { vers: [1.4, 6.8], ecran: true } },
      def: { D3: [2.3, 7.0], D2: [4.6, 5.9] },
    },
    {
      texte: "Le tir n'est pas possible: l'arrière droit croise derrière le demi-centre et reçoit. L'arrière gauche démarre par une feinte de course.",
      courses: {
        ArD: { vers: [0.6, 8.6], via: [3.8, 10.4] },
        DC: [4.0, 7.4],
        ArG: [-5.4, 8.2],
      },
      passe: ['DC', 'ArD', 0.5],
      def: { G3: [-0.6, 7.2] },
    },
  ];

  /* Combinaison sur croisé DC/ARG (Dragør f887). */
  const BASE_CROISE_DC_ARG = [
    {
      texte: "L'ailier gauche fixe l'extérieur du 1 gauche; il tirerait si le 1 ne réagissait pas. L'arrière gauche et le demi-centre font une feinte de course.",
      courses: { AiG: [-8.4, 2.4], ArG: [-6.4, 8.6], DC: [1.0, 9.4] },
      def: { G1: [-7.4, 2.2] },
    },
    {
      texte: "Le 1 réagit: l'ailier gauche passe à l'arrière gauche, qui part vers l'intervalle entre le 2 et le 3 gauches. Le 2 gauche ferme.",
      courses: { ArG: { vers: [-3.0, 7.6], via: [-5.6, 7.4] } },
      passe: ['AiG', 'ArG', 0.2],
      def: { G2: [-4.0, 6.0], G3: [-2.0, 6.9] },
    },
    {
      texte: "Le demi-centre part vers l'intervalle entre le 1 et le 2 gauches, derrière l'arrière gauche, et reçoit.",
      courses: { DC: { vers: [-5.6, 6.6], via: [-2.4, 10.4] } },
      passe: ['ArG', 'DC', 0.6],
    },
  ];

  /* Wirbel (handballhaus.de): RL va chercher LA, RM croise avec RR, rotation extérieure. */
  const BASE_WIRBEL = [
    {
      texte: "Le ballon circule: l'arrière droit passe au demi-centre.",
      passe: ['ArD', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre passe à l'arrière gauche.",
      courses: { ArG: [-6.2, 8.8] },
      passe: ['DC', 'ArG', 0.2],
    },
    {
      texte: "L'arrière gauche va chercher l'ailier gauche: il attaque vers l'extérieur, l'ailier croise derrière lui et reçoit.",
      courses: { ArG: [-7.4, 6.8], AiG: { vers: [-4.6, 9.2], via: [-9.6, 10.4] } },
      passe: ['ArG', 'AiG', 0.6],
      def: { G2: [-5.8, 5.8], G1: [-7.6, 3.4] },
    },
    {
      texte: "L'ailier gauche passe au demi-centre.",
      courses: { AiG: [-4.0, 9.0], DC: [0.4, 9.6] },
      passe: ['AiG', 'DC', 0.3],
    },
    {
      texte: "Le demi-centre croise avec l'arrière droit, qui passe derrière lui et reçoit. Pendant ce temps, l'ailier gauche et l'arrière gauche reprennent leurs postes de départ (rotation extérieure); l'arrière gauche se place près de la ligne de touche.",
      courses: {
        DC: [2.6, 8.6],
        ArD: { vers: [0.0, 9.4], via: [3.6, 10.6] },
        AiG: [-8.8, 2.0],
        ArG: [-7.2, 9.6],
      },
      passe: ['DC', 'ArD', 0.55],
      def: { D3: [2.4, 7.3], G2: [-5.2, 5.4], G1: [-7.4, 2.2] },
    },
    {
      texte: "L'arrière droit fait une passe parallèle à l'arrière gauche, qui avance vers le but.",
      courses: { ArG: [-6.2, 8.0], ArD: [-1.4, 9.0] },
      passe: ['ArD', 'ArG', 0.3],
      def: { G2: [-4.8, 6.0], G1: [-7.8, 2.4] },
    },
  ];

  /* Croisé arrière/DC pour un tir d'ailier libre (Dragør f846). */
  const BASE_AR_DC_AILIER = [
    {
      texte: "Le demi-centre sert l'arrière droit, qui fixe vers l'intérieur.",
      courses: { ArD: [5.4, 8.0] },
      passe: ['DC', 'ArD', 0.2],
      def: { D2: [5.2, 6.2] },
    },
    {
      texte: "L'arrière droit donne à l'ailier droit, qui descend en profondeur, vers la ligne de fond.",
      courses: { AiD: [9.4, 0.6] },
      passe: ['ArD', 'AiD', 0.3],
      def: { D1: [8.2, 1.6], D2: [5.0, 5.4] },
    },
    {
      texte: "L'ailier droit fait une passe transversale, par-dessus la zone, à l'ailier gauche.",
      courses: { AiG: [-9.4, 0.8] },
      passe: ['AiD', 'AiG', 0.1],
      def: { G1: [-8.0, 1.8] },
    },
    {
      texte: "L'ailier gauche sert l'arrière gauche, qui démarre à l'extérieur du 2 gauche.",
      courses: { ArG: [-6.8, 8.2] },
      passe: ['AiG', 'ArG', 0.3],
    },
    {
      texte: "L'arrière gauche rentre vers l'intérieur pour entraîner le 2 gauche. Le demi-centre croise derrière lui et reçoit.",
      courses: { ArG: [-3.6, 8.0], DC: { vers: [-6.0, 7.6], via: [-3.6, 10.6] } },
      passe: ['ArG', 'DC', 0.6],
      def: { G2: [-4.2, 6.4] },
    },
  ];

  /* Croisé arrière/DC prolongé (Dragør x818). */
  const BASE_AR_DC_PROLONGE = [
    {
      texte: "L'arrière gauche part en traversée vers la droite avec le ballon.",
      courses: { ArG: [-2.6, 9.2] },
      def: { G3: [-2.0, 7.2] },
    },
    {
      texte: "Le demi-centre croise derrière lui et reçoit. L'arrière gauche ralentit.",
      courses: { DC: { vers: [-4.6, 8.2], via: [-1.6, 10.8] }, ArG: [-1.0, 9.4] },
      passe: ['ArG', 'DC', 0.5],
    },
    {
      texte: "Le demi-centre continue vers l'extérieur, vers le 1 gauche. L'ailier gauche croise derrière lui, reçoit et part en traversée.",
      courses: { DC: [-6.6, 6.4], AiG: { vers: [-3.6, 8.8], via: [-8.0, 9.2] } },
      passe: ['DC', 'AiG', 0.55],
      def: { G1: [-7.2, 3.2], G2: [-5.4, 5.4] },
    },
    {
      texte: "L'arrière gauche accélère et reçoit de l'ailier. L'arrière droit fixe vers l'extérieur. Le pivot bloque le 3 droit.",
      courses: {
        AiG: [-1.4, 8.6],
        ArG: [1.8, 8.4],
        ArD: [6.4, 8.0],
        Piv: { vers: [2.5, 6.7], ecran: true },
      },
      passe: ['AiG', 'ArG', 0.6],
      def: { D3: [1.4, 7.0], D2: [5.2, 5.8] },
    },
  ];

  /* Croisé arrière/ailier puis fixation à l'opposé (Dragør x820), contre 5-1. */
  const BASE_FIXATION_OPPOSEE = [
    {
      texte: "Le demi-centre passe à l'arrière gauche, qui court vers l'extérieur.",
      courses: { ArG: [-7.0, 7.4] },
      passe: ['DC', 'ArG', 0.2],
      def: { G2: [-5.4, 5.8] },
    },
    {
      texte: "Croisé: l'ailier gauche passe derrière l'arrière gauche et reçoit. L'arrière gauche continue vers l'aile.",
      courses: { AiG: { vers: [-4.6, 8.4], via: [-8.6, 9.6] }, ArG: [-8.2, 5.4] },
      passe: ['ArG', 'AiG', 0.55],
      def: { G1: [-7.4, 2.8] },
    },
    {
      texte: "L'ailier gauche commence sa traversée et redonne le ballon au demi-centre.",
      courses: { AiG: [-2.6, 8.0], DC: [0.8, 10.2] },
      passe: ['AiG', 'DC', 0.3],
      def: { G2: [-4.8, 5.6] },
    },
    {
      texte: "Le demi-centre fixe vers la droite et donne à l'arrière droit. L'ailier gauche poursuit sa traversée le long de la défense.",
      courses: { DC: [2.0, 9.6], AiG: [2.4, 6.6] },
      passe: ['DC', 'ArD', 0.5],
      def: { D3: [1.2, 8.6] },
    },
  ];

  /* Croisé DC/arrière contre 1-5 avec écran du pivot (Dragør f225). */
  const BASE_DC_AR_1_5 = [
    {
      texte: "L'arrière droit passe au demi-centre, qui s'engage vers la droite et feinte un tir. L'avancé le suit.",
      courses: { DC: [1.8, 8.8] },
      passe: ['ArD', 'DC', 0.2],
      def: { D3: [1.2, 7.9] },
    },
    {
      texte: "Le demi-centre fait une passe dans le dos à l'arrière droit, qui croise derrière lui.",
      courses: { ArD: { vers: [-0.6, 9.4], via: [2.6, 10.8] }, DC: [2.4, 8.4] },
      passe: ['DC', 'ArD', 0.55],
    },
    {
      texte: "L'arrière droit s'engage dans l'intervalle entre le 2 et le 3 gauches. Le pivot pose un écran sur le 3.",
      courses: { ArD: [-2.8, 7.6], Piv: { vers: [-1.4, 7.6], ecran: true }, ArG: [-5.8, 9.0] },
      def: { G3: [-0.8, 6.6], G2: [-4.0, 6.0] },
    },
  ];

  /* Circulation "en 8" contre 5-1 (Antón 2011, fig. 6). */
  const BASE_EN_HUIT = [
    {
      texte: "Premier croisé: le centre attaque vers la gauche; l'arrière gauche passe derrière lui et reçoit.",
      courses: { DC: [-2.4, 9.2], ArG: { vers: [-0.4, 9.8], via: [-3.8, 11.0] } },
      passe: ['DC', 'ArG', 0.55],
      def: { D3: [-1.0, 8.6] },
    },
    {
      texte: "Juste après sa passe, le centre circule vers l'intérieur et vers le côté opposé: il entraîne le défenseur central vers la droite.",
      courses: { DC: { vers: [2.4, 7.4], via: [-0.6, 7.8] } },
      def: { G3: [1.4, 6.8], D3: [-1.4, 9.0] },
    },
    {
      texte: "Second croisé: l'arrière gauche attaque vers la droite, l'arrière droit vient recevoir derrière lui. En même temps, le pivot entraîne le 2 gauche vers l'extérieur; l'ailier gauche reste ouvert.",
      courses: {
        ArG: [1.0, 8.8],
        ArD: { vers: [-1.6, 9.4], via: [2.4, 10.8] },
        Piv: [-6.0, 6.6],
        AiG: [-8.6, 3.2],
      },
      passe: ['ArG', 'ArD', 0.55],
      def: { G2: [-6.2, 5.4], D3: [-0.2, 9.2] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'triple-croise',
      nom: 'Triple croisé (Dragør)',
      alias: 'Tripple croisé 1 à 3, Tripplekryds (DA), Triple cross (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Trois croisés enchaînés, avec des entrées d'ailier: chaque joueur qui reçoit croise aussitôt avec le suivant.",
      description: [
        "Exercice de croisés et d'entrées du site danois Dragør HK (Werner Fog-Hansen), en trois versions. Le ballon passe de croisé en croisé; chaque porteur attaque, puis donne au partenaire qui croise derrière lui.",
        "Version 1: les sept joueurs de champ ont un rôle. Le pivot sort des 6 m, l'ailier gauche entre vers le centre, puis le demi-centre, l'arrière gauche et l'ailier droit croisent à tour de rôle. Version 2: croisé arrière gauche/ailier gauche, puis croisé demi-centre/arrière droit, et l'ailier gauche finit son entrée. Version 3: croisé demi-centre/arrière gauche, le pivot croise derrière l'arrière gauche, puis l'ailier gauche entre et croise avec l'arrière droit.",
        "Dans la version 2, le texte français dit que le demi-centre croise \"avec ARG\": les versions danoise et anglaise de la même fiche disent l'arrière droit (HB, RB), ce que montre aussi le schéma. La fiche ne précise pas la défense: elle est dessinée ici en 0-6, et ses réactions sont une proposition.",
      ],
      objectif: "Déplacer la défense d'un côté à l'autre par des croisés successifs pour libérer un tireur lancé.",
      pointsCles: [
        "Chaque porteur attaque le but avant de donner: sans fixation, le croisé ne déplace personne.",
        "Le joueur qui croise passe derrière le porteur et arrive lancé.",
        "Les courses s'enchaînent sans arrêt: le joueur suivant démarre pendant le croisé précédent.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Tripple croisé 1 (Dragør HK, trad. HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f1111.html',
          note: '"La balle part du ARD qui passe à PVT qui sort des "six" et part vers la gauche [...] ALD croise derrière ARD, reçoit le ballon et tire."',
        },
        {
          titre: 'Tripple croisé 2 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f719.html',
          note: "\"ARG qui croise avec ALG et lui passe la balle. ALG passe le ballon à DC [...] passe à ALG qui continue son entrée d'aile et va tirer.\"",
        },
        {
          titre: 'Triple cross 2 (Dragør HK, version anglaise)',
          url: 'http://www.dragoerhb.dk/english/z719.html',
          note: "\"LW passes the ball to CB, who makes a cross with RB. RB makes a pressure against the center\": c'est l'arrière droit qui croise avec le demi-centre.",
        },
        {
          titre: 'Tripple croisé 3 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f725.html',
          note: "\"ARG effectue une pression permanente sur le centre de la défense. PVT croise derrière ARG. [...] ALG effectue une entrée d'aile et reçoit la balle de PVT, continue sa course et croise avec ARD qui prend le tir.\"",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Sept joueurs, tir de l'ailier droit",
          etapes: [
            {
              texte: "Mise en place: le demi-centre donne à l'arrière droit.",
              passe: ['DC', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit passe au pivot, qui sort des 6 m et part vers la gauche.",
              courses: { Piv: { vers: [-2.6, 8.8], via: [-0.6, 8.4] } },
              passe: ['ArD', 'Piv', 0.35],
              def: { G3: [-2.3, 7.4] },
            },
            {
              texte: "Le pivot continue vers le poste d'ailier gauche. En chemin, il donne à l'ailier gauche, qui court vers le centre.",
              courses: { Piv: [-7.4, 7.6], AiG: { vers: [-3.4, 8.4], via: [-6.0, 5.0] } },
              passe: ['Piv', 'AiG', 0.45],
              def: { G1: [-6.6, 3.2], G2: [-4.6, 5.8], G3: [-2.0, 7.0] },
            },
            {
              texte: "Le demi-centre croise derrière l'ailier gauche et reçoit le ballon.",
              courses: { AiG: [-1.4, 8.2], DC: { vers: [-4.2, 9.0], via: [-1.8, 10.4] } },
              passe: ['AiG', 'DC', 0.5],
              def: { G3: [-1.6, 7.2] },
            },
            {
              texte: "L'arrière gauche croise derrière le demi-centre, reçoit et continue vers la droite. L'ailier gauche reste au contact de la défense.",
              courses: {
                ArG: { vers: [-0.8, 9.4], via: [-4.6, 10.8] },
                DC: [-5.2, 8.2],
                AiG: [-3.2, 6.9],
              },
              passe: ['DC', 'ArG', 0.5],
              def: { G3: [-1.8, 7.1], G2: [-4.6, 5.6] },
            },
            {
              texte: "L'arrière gauche donne à l'arrière droit, qui s'engage vers l'extérieur. L'ailier droit remonte.",
              courses: { ArG: [1.6, 9.0], ArD: [6.4, 8.0], AiD: [8.6, 6.0] },
              passe: ['ArG', 'ArD', 0.55],
              def: { D2: [5.8, 6.3], D1: [7.8, 4.0] },
            },
            {
              texte: "L'ailier droit croise derrière l'arrière droit et reçoit le ballon, lancé vers le centre.",
              courses: { AiD: { vers: [3.6, 8.6], via: [7.6, 10.0] }, ArD: [7.0, 7.0], ArG: [0.4, 10.2] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D3: [2.2, 7.2] },
            },
            {
              texte: "L'ailier droit tire au centre.",
              courses: { AiD: [2.4, 7.8] },
              tir: { par: 'AiD', t: 0.5 },
              def: { D3: [1.3, 7.1] },
            },
          ],
        },
        {
          nom: "2 - Entrée de l'ailier gauche",
          etapes: [
            {
              texte: "Mise en place: le demi-centre donne à l'arrière gauche.",
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche part vers l'extérieur avec le ballon. L'ailier gauche croise derrière lui vers l'intérieur et reçoit.",
              courses: {
                ArG: { vers: [-7.0, 7.0], via: [-5.0, 8.0] },
                AiG: { vers: [-4.0, 9.2], via: [-8.4, 8.6] },
                Piv: [4.0, 6.3],
              },
              passe: ['ArG', 'AiG', 0.55],
              def: { G2: [-5.6, 5.6], G1: [-7.6, 3.2] },
            },
            {
              texte: "L'ailier gauche continue vers le centre et passe au demi-centre, qui part vers la droite.",
              courses: { AiG: [-2.6, 8.8], DC: [2.2, 9.6] },
              passe: ['AiG', 'DC', 0.3],
              def: { G2: [-5.0, 5.2] },
            },
            {
              texte: "Le demi-centre croise avec l'arrière droit, qui passe derrière lui vers le centre et reçoit. L'ailier gauche poursuit son entrée le long de la défense.",
              courses: {
                DC: [3.4, 8.4],
                ArD: { vers: [0.8, 8.8], via: [4.4, 10.2] },
                AiG: [-0.6, 7.0],
              },
              passe: ['DC', 'ArD', 0.55],
              def: { D3: [3.0, 7.0], G3: [-1.6, 7.0] },
            },
            {
              texte: "L'arrière droit fixe le centre de la défense et donne à l'ailier gauche, qui a continué son entrée.",
              courses: { ArD: [0.4, 8.2], AiG: [1.8, 6.9] },
              passe: ['ArD', 'AiG', 0.5],
              def: { D3: [2.9, 7.0], G3: [-0.9, 7.2] },
            },
            {
              texte: "L'ailier gauche tire.",
              tir: 'AiG',
            },
          ],
        },
        {
          nom: "3 - Le pivot croise, tir de l'arrière droit",
          etapes: [
            {
              texte: "Le demi-centre part avec le ballon en diagonale vers la gauche et attaque le 3 gauche.",
              courses: { DC: [-2.6, 8.6] },
              def: { G3: [-2.3, 7.3] },
            },
            {
              texte: "L'arrière gauche croise derrière lui, reçoit et attaque le centre. Le demi-centre continue vers l'aile gauche.",
              courses: { ArG: { vers: [-0.6, 9.2], via: [-3.6, 10.6] }, DC: [-4.2, 7.9] },
              passe: ['DC', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche met une pression permanente sur le centre de la défense. L'ailier gauche commence son entrée.",
              courses: { ArG: [-0.4, 7.7], DC: [-7.0, 5.0], AiG: [-5.0, 7.8] },
              def: { G3: [-1.5, 7.0], D3: [0.7, 7.1], G2: [-4.8, 5.4] },
            },
            {
              texte: "Le pivot sort et croise derrière l'arrière gauche; il reçoit le ballon.",
              courses: { Piv: { vers: [-2.4, 9.0], via: [1.2, 9.6] }, AiG: [-3.6, 9.6] },
              passe: ['ArG', 'Piv', 0.5],
            },
            {
              texte: "L'ailier gauche, toujours en course, reçoit du pivot et continue vers la droite.",
              courses: { AiG: [1.0, 9.2], ArG: [-0.6, 7.2] },
              passe: ['Piv', 'AiG', 0.35],
              def: { G3: [-1.6, 6.9], D3: [1.4, 7.2] },
            },
            {
              texte: "L'ailier gauche attaque le 3 droit et croise avec l'arrière droit, qui passe derrière lui et reçoit.",
              courses: { AiG: [3.4, 8.2], ArD: { vers: [2.0, 9.0], via: [5.0, 10.2] } },
              passe: ['AiG', 'ArD', 0.55],
              def: { D3: [3.0, 7.0] },
            },
            {
              texte: "L'arrière droit tire dans l'intervalle libéré.",
              courses: { ArD: [1.6, 7.6] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
      ],
      depart: { Piv: [2.8, 6.5] },
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'triple-croise-arrieres',
      nom: 'Triple croisé des arrières',
      alias: 'Dreier-Kreuzen, dreifaches Kreuzen, 3er-Kreuzen, Dreier Kreuz "Neun links/rechts" (DE)',
      categorie: 'Croisés',
      defense: '0-6 (et 5-1)',
      resume: "Le demi-centre va chercher l'arrière gauche, qui va chercher l'arrière droit: deux croisés de suite, avec un pivot qui change d'écran.",
      description: [
        "Enclenchement allemand à trois arrières, contre une 0-6. Le demi-centre fixe le 3 gauche et l'arrière gauche croise derrière lui. L'arrière gauche, lancé, attaque le 3 droit et l'arrière droit croise derrière lui à son tour. Après chaque croisé, celui qui a donné le ballon se replace au poste libéré.",
        "Le pivot, placé entre les deux 3, bloque d'abord le 3 droit côté intérieur, puis change d'écran et bloque le 3 gauche. Chaque croisé doit être une vraie menace de tir, pas un simple changement de poste: le but est de provoquer des erreurs de prise en charge.",
        "L'arrière droit, arrivé au centre, a plusieurs fins (choisis une variante au-dessus du schéma): tir dans le bloc central, prolongement vers la gauche et passe parallèle, retour à l'arrière gauche, passe au pivot si le 3 droit sort, ou jeu à deux pivots. Il peut aussi casser sa course et attaquer en sens inverse, entre le 3 et le 2 droits (non dessiné).",
        "La version Unihandball (\"Dreier Kreuz\") le recommande contre une 5-1 quand le pivot bloque l'avancé au moment où l'arrière droit reçoit (variante 6). Ce document ne donne que le principe: le schéma de cette variante est une proposition.",
      ],
      objectif: "Désorganiser le bloc central par deux croisés rapides et finir dans l'intervalle libéré.",
      pointsCles: [
        "Vitesse et précision: les passes arrivent dans la course.",
        "Chaque porteur cherche d'abord sa propre chance (tir, percée, passe au pivot) avant de donner.",
        "Après son croisé, chacun se replace tout de suite au poste libre, prêt pour une nouvelle attaque.",
        "Le pivot lit le défenseur qu'il bloque et se démarque si celui-ci sort.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Kreuzen im Rückraum: dreifaches Kreuzen (handballtraining.de)',
          url: 'https://handballtraining.de/ruckraumspieler/kreuzen-im-rueckraum-in-diesem-artikel-geht-es-nun-um-ein-dreifaches-kreuzen-im-rueckraum/3896',
          note: "\"Der Kreisläufer wechselt seine Sperrstellung und stellt nach dem Abspiel von RL eine neue Sperre an der Innenseite von IR\" (le pivot change d'écran); fins bleue, rouge et verte.",
        },
        {
          titre: 'Trainingseinheit: dreifaches Kreuzen im Rückraum (handballtraining.de)',
          url: 'https://handballtraining.de/ruckraumspieler/trainingseinheit-dreifaches-kreuzen-im-rueckraum/3908',
          note: "Séance d'entraînement sur le même enclenchement.",
        },
        {
          titre: 'Dreier Kreuz "Neun links, rechts" (Unihandball, PDF de systèmes)',
          url: 'https://silo.tips/download/unihandball-auftakt-auslsehandlungen-spielzge',
          note: "\"Gut gegen 5:1-Deckung, wenn Kreisläufer Sperre an Vorgezogenen setzt\" (efficace contre 5-1 si le pivot bloque l'avancé).",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit au centre",
          etapes: [
            ...BASE_TRIPLE_ARRIERES,
            {
              texte: "Le 3 gauche est tenu par l'écran du pivot. L'arrière droit trouve l'intervalle central et tire.",
              courses: { ArD: [0.6, 7.7] },
              tir: { par: 'ArD', t: 0.5 },
              def: { D3: [1.6, 7.1] },
            },
          ],
        },
        {
          nom: '2 - Passe parallèle au demi-centre',
          etapes: [
            ...BASE_TRIPLE_ARRIERES,
            {
              texte: "L'arrière droit prolonge sa course vers la gauche, entre le 3 et le 2 gauches. Le pivot tient le 3 gauche; le 2 gauche vient aider.",
              courses: { ArD: [-3.0, 8.0] },
              def: { G2: [-3.9, 6.6] },
            },
            {
              texte: "Passe parallèle au demi-centre, au poste d'arrière gauche.",
              courses: { DC: [-5.0, 8.6] },
              passe: ['ArD', 'DC', 0.2],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "3 - Retour à l'arrière gauche",
          etapes: [
            ...BASE_TRIPLE_ARRIERES,
            {
              texte: "L'arrière droit rend le ballon à l'arrière gauche, replacé au poste d'arrière droit.",
              courses: { ArD: [-0.2, 8.8], ArG: [4.8, 8.8] },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche attaque à nouveau la défense, entre le 3 et le 2 droits, et tire.",
              courses: { ArG: [3.8, 7.6] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D2: [4.6, 6.2], D3: [2.6, 6.9] },
            },
          ],
        },
        {
          nom: '4 - Le pivot plonge derrière le 3 droit',
          etapes: [
            ...BASE_TRIPLE_ARRIERES,
            {
              texte: "Le 3 droit sort sur l'arrière droit. L'arrière droit rend à l'arrière gauche, au poste d'arrière droit.",
              courses: { ArD: [0.0, 8.8], ArG: [4.6, 9.0] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D3: [0.6, 7.8] },
            },
            {
              texte: "Le pivot plonge dans l'espace laissé derrière le 3 droit. L'arrière gauche le sert.",
              courses: { Piv: [1.8, 6.4] },
              passe: ['ArG', 'Piv', 0.35],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '5 - Jeu à deux pivots',
          etapes: [
            ...BASE_TRIPLE_ARRIERES,
            {
              texte: "L'arrière droit continue avec le ballon vers les 6 m, devant le 2 gauche. Le demi-centre revient en arc par le centre et reçoit.",
              courses: { ArD: [-3.6, 7.2], DC: { vers: [-0.4, 9.4], via: [-4.0, 10.8] } },
              passe: ['ArD', 'DC', 0.5],
              def: { G2: [-4.6, 5.8] },
            },
            {
              texte: "L'arrière droit devient second pivot et bloque le 2 gauche côté intérieur. Le pivot glisse bloquer le 2 droit côté intérieur. Le demi-centre attaque le centre.",
              courses: {
                ArD: { vers: [-4.0, 6.5], ecran: true },
                Piv: { vers: [3.8, 6.1], ecran: true },
                DC: [0.2, 8.2],
              },
              def: { G2: [-5.0, 5.4], D2: [4.7, 5.4], G3: [-1.4, 7.0], D3: [1.4, 7.0] },
            },
            {
              texte: "Le demi-centre tire entre les deux 3 (une fin parmi d'autres: la source s'arrête au jeu à deux pivots).",
              tir: 'DC',
            },
          ],
        },
        {
          nom: "6 - Contre une 5-1 (écran sur l'avancé)",
          etapes: [
            {
              texte: "Version contre une 5-1: un défenseur (ici le 3 droit) joue avancé devant le demi-centre. L'arrière droit donne au demi-centre.",
              courses: { Piv: [1.2, 6.5] },
              passe: ['ArD', 'DC', 0.4],
              def: { D3: [0.2, 9.0], G3: [-0.8, 6.6], G2: [-4.6, 5.3], D2: [4.6, 5.3] },
            },
            {
              texte: "Le demi-centre va chercher l'arrière gauche: il part vers la gauche, l'arrière gauche croise derrière lui et reçoit. L'avancé suit le ballon.",
              courses: { DC: [-2.6, 9.0], ArG: { vers: [-0.4, 9.8], via: [-3.8, 11.0] } },
              passe: ['DC', 'ArG', 0.6],
              def: { D3: [-0.6, 8.6] },
            },
            {
              texte: "L'arrière gauche va chercher l'arrière droit: il attaque vers la droite, l'arrière droit croise derrière lui et reçoit au centre. Le demi-centre se replace à gauche.",
              courses: {
                ArG: [2.4, 9.0],
                ArD: { vers: [0.2, 9.8], via: [3.8, 11.2] },
                DC: [-4.8, 9.6],
              },
              passe: ['ArG', 'ArD', 0.6],
              def: { D3: [1.2, 8.4] },
            },
            {
              texte: "Au moment où l'arrière droit reçoit, le pivot monte bloquer l'avancé. L'arrière droit passe à côté de l'écran.",
              courses: { Piv: { vers: [1.0, 7.8], ecran: true }, ArD: [-0.6, 8.3] },
              def: { D3: [1.3, 8.7], G3: [-0.8, 7.1] },
            },
            { texte: "L'arrière droit tire par-dessus la défense.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'double-croise-double-ecran',
      nom: 'Double croisé avec double écran',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Le demi-centre et l'arrière droit posent chacun un écran sur un 2; le pivot bloque au centre; l'arrière gauche tire dans l'axe.",
      description: [
        "Combinaison de Dragør HK. Le demi-centre donne à l'arrière gauche, puis entre poser un écran sur le 2 droit. L'arrière gauche donne à l'arrière droit, qui entre en diagonale; l'arrière gauche croise derrière lui et récupère le ballon. L'arrière droit continue vers l'intérieur et pose un écran sur le 2 gauche, pendant que le pivot bloque le défenseur central.",
        "Les deux 2 sont bloqués et le défenseur central est occupé: l'arrière gauche tire dans l'axe. Si le défenseur central monte sur lui, le pivot se décale vers le 2 gauche et reçoit.",
        "La fiche (et son schéma) montre trois défenseurs: les deux 2 et un central. Ici, en 0-6, le pivot bloque le 3 droit. La défense n'est pas précisée par la source.",
      ],
      objectif: "Ouvrir l'axe pour un tir de l'arrière gauche grâce à trois écrans.",
      pointsCles: [
        "Les écrans se posent avec le corps, sans les bras.",
        "La passe en retour de l'arrière droit arrive dans la course de l'arrière gauche.",
        "Le pivot lit le défenseur central: s'il monte, le pivot se décale pour recevoir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Double croisé avec double écran (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f106.html',
          note: "\"DC passe la balle à ARG rentre et pose un écran sur le 2G. ARG passe à ARD qui entre et un croisé est réalisé entre les deux joueurs. ARD continue à l'intérieur et pose un écran sur le 2D. PVT fait écran sur DC de défense.\"",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche dans l'axe",
          etapes: [
            ...BASE_DOUBLE_ECRAN,
            {
              texte: "Le 3 gauche reste au centre. L'arrière gauche tire dans l'axe.",
              courses: { ArG: [0.4, 7.8] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G3: [-1.1, 7.0] },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot décalé',
          etapes: [
            ...BASE_DOUBLE_ECRAN,
            {
              texte: "Le 3 droit échappe à l'écran et monte sur l'arrière gauche. Le pivot se décale vers le 2 gauche.",
              courses: { ArG: [0.4, 8.6], Piv: [-2.6, 6.6] },
              def: { D3: [0.6, 7.6], G3: [-1.3, 7.1] },
            },
            {
              texte: "L'arrière gauche sert le pivot.",
              passe: ['ArG', 'Piv', 0.2],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'double-croise-arriere-oppose',
      nom: "Double croisé pour l'arrière opposé",
      alias: 'Dobbeltkryds til modsat back (DA), Double cross to opposite backcourt (EN), Double croisé pour AR opposé',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Deux croisés à droite (demi-centre/arrière droit, puis ailier droit/demi-centre) attirent la défense; une longue passe lance l'arrière gauche.",
      description: [
        "Combinaison de Dragør HK. Le demi-centre donne à l'arrière droit lancé, court vers la droite et croise avec lui. Puis l'ailier droit démarre et croise avec le demi-centre. La défense est attirée du côté droit de l'attaque.",
        "L'ailier droit fait alors une longue passe à l'arrière gauche, qui arrive lancé. L'arrière gauche tire, ou donne à l'ailier gauche ou au pivot s'ils sont mieux placés (choisis une variante au-dessus du schéma).",
        "Le texte parle d'une passe \"au pivot DC\"; le schéma montre une passe au pivot central. Après les croisés, le demi-centre finit près de la ligne, côté droit.",
      ],
      objectif: "Surcharger un côté de la défense pour libérer l'arrière opposé.",
      pointsCles: [
        "Les deux croisés doivent vraiment attirer la défense vers la droite.",
        "La longue passe arrive dans la course de l'arrière gauche, déjà lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Double croisé pour l'arrière opposé (Dragør HK, trad. HBC Cachan)",
          url: 'http://www.dragoerhb.dk/fransk/f382.html',
          note: "\"Il devrait y avoir maintenant assez de pression sur le côté gauche de la défense pour que ALD puisse effectuer une longue passe vers l'arrière gauche ARG qui arrive lancé. ARG tire ou peut passer à l'ailier ALG ou au pivot DC.\"",
        },
        {
          titre: 'Handball Gardéen - 16 combinaisons en fiches animées',
          url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349',
          note: '"Double croisé pour AR opposé": renvoie vers la fiche Dragør.',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...BASE_DOUBLE_OPPOSE,
            {
              texte: "L'arrière gauche entre entre le 2 et le 3 gauches et tire.",
              courses: { ArG: [-2.8, 7.3] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...BASE_DOUBLE_OPPOSE,
            {
              texte: "Le 3 gauche sort sur l'arrière gauche, qui donne au pivot.",
              courses: { ArG: [-3.0, 7.8], Piv: [-0.6, 6.3] },
              passe: ['ArG', 'Piv', 0.45],
              def: { G3: [-2.0, 7.1] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Passe à l'ailier gauche",
          etapes: [
            ...BASE_DOUBLE_OPPOSE,
            {
              texte: "Le 1 gauche rentre aider sur l'arrière gauche, qui donne à l'ailier gauche.",
              courses: { ArG: [-4.0, 7.6], AiG: [-8.4, 3.4] },
              passe: ['ArG', 'AiG', 0.45],
              def: { G1: [-5.6, 4.4], G2: [-3.8, 6.0] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'double-croise-arrieres-ailiers',
      nom: 'Double croisé arrières/ailiers',
      alias: 'Dobbelt back/fløjkryds (DA), Double backcourt/wing cross (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Croisé arrière/ailier à gauche, longue passe, croisé arrière/ailier à droite; l'ailier gauche, qui a continué sa course, finit à 6 m.",
      description: [
        "Combinaison de Dragør HK. L'arrière gauche fixe vers l'extérieur et l'ailier gauche croise derrière lui. L'ailier gauche fait une longue passe à l'arrière droit, qui attaque à son tour l'extérieur; l'ailier droit croise derrière lui.",
        "Pendant ce temps, l'ailier gauche ralentit, puis accélère et se place entre le 3 et le 2 droits. Le demi-centre attaque à gauche pour attirer la défense centrale. L'ailier droit sert l'ailier gauche, qui tire à 6 m.",
        "La défense n'est pas précisée par la source; elle est dessinée en 0-6 et ses réactions sont une proposition.",
      ],
      objectif: "Attirer la défense vers les ailes par deux croisés arrière/ailier pour libérer un tir à 6 m au centre droit.",
      pointsCles: [
        "L'ailier gauche gère son rythme: il temporise pendant le second croisé, puis accélère au bon moment.",
        "Le demi-centre attaque vraiment à gauche pour retenir les défenseurs centraux.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Double croisé arrières/ailiers (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f1518.html',
          note: "\"ALG accélère et vient se positionner entre les défenseurs 3G et 2G. [...] DC attaque au moment sur le côté gauche de manière à attirer l'attention de la défense centrale. ALD passe à ALG qui tire à 6m.\"",
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière gauche, qui fixe vers l'extérieur, sur le 2 gauche.",
          courses: { ArG: [-6.4, 7.6] },
          passe: ['DC', 'ArG', 0.1],
          def: { G2: [-5.6, 5.8] },
        },
        {
          texte: "L'ailier gauche croise derrière l'arrière gauche et reçoit le ballon.",
          courses: { AiG: { vers: [-3.8, 9.2], via: [-8.8, 10.8] } },
          passe: ['ArG', 'AiG', 0.6],
          def: { G3: [-2.2, 7.1] },
        },
        {
          texte: "L'ailier gauche fait une longue passe à l'arrière droit, qui attaque l'extérieur de la défense. L'ailier gauche ralentit.",
          courses: { AiG: [-2.6, 9.6], ArD: [6.6, 7.6] },
          passe: ['AiG', 'ArD', 0.2],
          def: { D2: [5.6, 6.0], D1: [7.6, 3.4], G3: [-1.7, 6.8] },
        },
        {
          texte: "L'ailier droit croise derrière l'arrière droit et reçoit. L'ailier gauche accélère entre le 3 et le 2 droits. Le demi-centre attaque à gauche pour attirer la défense centrale.",
          courses: {
            AiD: { vers: [4.4, 8.6], via: [8.8, 10.8] },
            AiG: [3.2, 6.8],
            DC: [-2.4, 8.4],
          },
          passe: ['ArD', 'AiD', 0.6],
          def: { G3: [-2.0, 7.2], D3: [1.2, 7.0] },
        },
        {
          texte: "L'ailier droit sert l'ailier gauche.",
          passe: ['AiD', 'AiG', 0.2],
        },
        {
          texte: "L'ailier gauche tire à 6 m.",
          tir: 'AiG',
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'double-croise-5-1',
      nom: 'Double croisé face à une 5-1',
      alias: 'Dobbeltkryds mod 5-1 (DA), Double cross against 5-1 (EN), Double croisé contre une défense 1-5',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Le demi-centre entraîne l'avancé à droite, puis l'ailier gauche croise derrière l'arrière gauche et l'arrière droit traverse toute la défense pour un second croisé.",
      description: [
        "Combinaison de Dragør HK contre une 5-1. Le demi-centre se déplace vers la droite avec le ballon pour emmener l'avancé vers l'intérieur, puis passe à l'arrière gauche, qui fixe l'extérieur du 2 gauche.",
        "L'ailier gauche croise derrière l'arrière gauche et court vers le centre. L'arrière droit traverse dans le sens inverse, vers la gauche de l'attaque, et croise avec lui. L'ailier gauche donne à l'arrière droit, qui tire entre le 2 et le 3 gauches.",
        "Le texte dit que l'ailier gauche peut aussi servir directement le pivot; le schéma de l'autre fin montre plutôt l'arrière droit qui sert le pivot (variante 2).",
      ],
      objectif: "Éloigner l'avancé du côté où l'on finit et créer un surnombre à gauche.",
      pointsCles: [
        "Le premier déplacement du demi-centre doit vraiment entraîner l'avancé.",
        "L'arrière gauche fixe l'extérieur du 2 pour ouvrir l'intervalle intérieur.",
        "L'arrière droit part tôt: sa course est longue.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Double croisé face à une défense 5-1 (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f1362.html',
          note: "\"DC a la balle et se déplace vers la droite, de manière à emmener le défenseur avancé à l'intérieur. [...] ALG vient croiser derrière ARG et court en direction du centre. ARD se lance dans une course vers la droite de la défense. ALG peut maintenant passer soit à ARD qui croise, soit au pivot.\"",
        },
        {
          titre: 'Double croisé face à une défense 5-1, alternative 1 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f1362a.html',
          note: 'Schéma de la fin au pivot.',
        },
        {
          titre: 'Playlist "Combinaisons Handball" (YouTube, extraits de Dragør HK)',
          url: 'https://www.youtube.com/playlist?list=PLTwEUYgwcdpoK3ttmLx0AFdzsI3cCtYDD',
          note: '"Double croisé contre une défense 1-5" (vidéo sans texte).',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...BASE_DOUBLE_5_1,
            {
              texte: "L'arrière droit attaque entre le 2 et le 3 gauches et tire.",
              courses: { ArD: [-2.8, 7.2] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...BASE_DOUBLE_5_1,
            {
              texte: "Le 3 gauche sort sur l'arrière droit, qui donne au pivot.",
              courses: { ArD: [-2.4, 7.6], Piv: [-0.4, 6.3] },
              passe: ['ArD', 'Piv', 0.4],
              def: { G3: [-1.6, 7.0] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rentree-ailier-double-croise',
      nom: "Rentrée d'ailier avec double croisé",
      alias: 'Overgang med dobbelt kryds (DA), Running in with double cross (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "L'ailier gauche passe derrière son arrière et traverse jusqu'au 2 droit; l'arrière droit sert l'ailier droit entre les blocs.",
      description: [
        "Combinaison de Dragør HK. L'ailier gauche passe à son arrière et entame une rentrée en passant juste derrière lui. Le ballon circule par le demi-centre jusqu'à l'arrière droit, pendant que l'ailier gauche traverse jusqu'au côté droit et bloque le 2 droit. Le pivot bloque le 3 droit.",
        "Fin A: l'arrière droit attaque l'intervalle entre le 3 et le 2 droits, menace de tirer, puis donne à l'ailier droit, qui tire entre les blocs du pivot et de l'ailier gauche. Fin B: l'arrière droit donne à l'ailier gauche qui arrive; celui-ci bloque le 2 droit et remet à l'ailier droit, qui croise derrière lui et tire.",
        "Le texte de la fin B parle de \"l'ailier droit ARD\" (coquille): le schéma montre bien l'ailier droit. La défense n'est pas précisée; elle est dessinée en 0-6.",
      ],
      objectif: "Surcharger le côté droit avec l'ailier gauche rentré pour libérer l'ailier droit à l'intérieur.",
      pointsCles: [
        "L'ailier gauche rentre sans ballon, derrière la ligne des arrières, et arrive au bon moment sur le 2 droit.",
        "La feinte de tir de l'arrière droit doit fixer le 3 droit.",
        "L'ailier droit entre entre les deux blocs, au plus près.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Rentrée d'ailier avec double croisé (Dragør HK, trad. HBC Cachan)",
          url: 'http://www.dragoerhb.dk/fransk/f452.html',
          note: "\"ARD attaque l'intervalle entre 3G et 2G et menace de tirer (feinte). Au lieu de cela il passe à l'ailier droit ALD qui tire, profitant des blocs réalisés par PVT et ALG.\"",
        },
        {
          titre: "Rentrée d'ailier avec double croisé, alternative 2 (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f452a.html',
          note: "\"ARD passe à ALG qui arrive. Celui-ci réalise un écran sur le défenseur G2 et passe à l'ailier droit [...] qui croise et va tirer.\"",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "A - Tir de l'ailier droit entre les blocs",
          etapes: [
            ...BASE_RENTREE_DOUBLE,
            {
              texte: "L'arrière droit menace de tirer (feinte), puis donne à l'ailier droit, qui rentre entre les blocs du pivot et de l'ailier gauche.",
              courses: { AiD: { vers: [3.4, 7.1], via: [6.6, 7.6] } },
              passe: ['ArD', 'AiD', 0.55],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "B - L'ailier rentré remet à l'ailier droit",
          etapes: [
            ...BASE_RENTREE_DOUBLE,
            {
              texte: "L'arrière droit donne à l'ailier gauche, qui arrive sur le 2 droit et le bloque. L'ailier droit remonte.",
              courses: { AiD: [7.0, 6.0], ArD: [1.4, 8.4] },
              passe: ['ArD', 'AiG', 0.3],
            },
            {
              texte: "L'ailier droit croise derrière l'ailier gauche, qui lui remet le ballon.",
              courses: { AiD: { vers: [3.4, 7.3], via: [5.2, 8.4] } },
              passe: ['AiG', 'AiD', 0.5],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ard-arg-dc',
      nom: 'Croisé ARD/ARG/DC',
      alias: 'Back/Back/Centerkryds (DA), LB/CB/Center cross (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "L'arrière droit traverse vers la gauche, l'arrière gauche croise derrière lui et sert le demi-centre décalé à l'extérieur du 2 droit.",
      description: [
        "Combinaison de Dragør HK lancée par l'ailier droit. Il fixe vers l'extérieur et passe à l'arrière droit, parti en course rentrante vers la gauche. L'arrière gauche croise avec lui, reçoit et attaque l'intervalle entre le 3 et le 2 droits.",
        "Pendant ce temps, le demi-centre s'est décalé à l'extérieur du 2 droit. Il reçoit de l'arrière gauche et tire entre le 2 et le 1 droits.",
        "La défense n'est pas précisée par la source; elle est dessinée en 0-6.",
      ],
      objectif: "Libérer le demi-centre à l'extérieur du 2 droit, attiré à l'intérieur par l'arrière gauche.",
      pointsCles: [
        "L'ailier droit fixe vraiment le 1 droit avant de passer.",
        "L'arrière gauche attaque l'intervalle 3-2 pour attirer le 2 droit.",
        "Le demi-centre se décale sans se faire voir et reçoit lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé ARD/ARG/DC (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f1361.html',
          note: "\"L'arrière gauche ARG vient croiser avec ARD, reçoit la balle et vient attaquer l'intervalle entre 3G et 2G. Le demi-centre DC, qui s'est décalé vers l'extérieur du défenseur 2G, reçoit la balle de ARG et va au tir entre 2G et 1G.\"",
        },
      ],
      ballon: 'AiD',
      etapes: [
        {
          texte: "L'ailier droit fixe vers l'extérieur et passe à l'arrière droit, qui part en course rentrante vers la gauche.",
          courses: { AiD: [8.8, 3.6], ArD: [3.6, 9.0] },
          passe: ['AiD', 'ArD', 0.6],
          def: { D1: [7.9, 2.8] },
        },
        {
          texte: "L'arrière gauche croise derrière l'arrière droit et reçoit le ballon.",
          courses: {
            ArD: [-2.4, 8.8],
            ArG: { vers: [2.4, 8.2], via: [-0.6, 10.6] },
          },
          passe: ['ArD', 'ArG', 0.55],
          def: { G3: [-2.0, 7.2], D3: [1.9, 7.2] },
        },
        {
          texte: "L'arrière gauche attaque l'intervalle entre le 3 et le 2 droits et attire le 2. Le demi-centre se décale à l'extérieur du 2 droit et reçoit.",
          courses: { ArG: [3.0, 7.6], DC: { vers: [6.2, 5.8], via: [5.0, 9.6] } },
          passe: ['ArG', 'DC', 0.65],
          def: { D2: [4.2, 6.2], D3: [2.1, 7.0] },
        },
        {
          texte: "Le demi-centre tire entre le 2 et le 1 droits.",
          courses: { DC: [6.0, 5.0] },
          tir: { par: 'DC', t: 0.45 },
          def: { D1: [7.3, 3.4] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-arrieres-pour-dc-ailier',
      nom: 'ARD/ARG pour un croisé demi/ailier',
      alias: 'Back/Back til center/fløjkryds (DA), LB/RB to center/wing cross (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Un croisé entre les deux arrières au centre sert de leurre pour le vrai croisé, entre le demi-centre et l'ailier gauche.",
      description: [
        "Combinaison de Dragør HK. Le demi-centre passe à l'arrière gauche, qui part en course rentrante vers la droite et croise avec l'arrière droit. Le demi-centre continue sa course vers l'intervalle entre le 1 et le 2 gauches.",
        "Le porteur fixe le centre de la défense et donne à l'ailier gauche, qui vient de passer derrière le demi-centre. L'ailier gauche attaque le côté intérieur du 2 gauche et tire. Si le 3 gauche l'en empêche, il donne au pivot.",
        "Le texte dit que c'est l'arrière gauche qui fixe le centre et sert l'ailier; sur le schéma, c'est l'arrière droit, qui a reçu au croisé. Le schéma est suivi ici. La défense n'est pas précisée par la source.",
      ],
      objectif: "Attirer la défense centrale par le croisé des arrières pour lancer l'ailier gauche à l'intérieur du 2.",
      pointsCles: [
        "Le croisé des arrières doit fixer le centre de la défense.",
        "Le demi-centre attaque l'intervalle 1-2 pour emmener le 2 gauche vers l'extérieur.",
        "L'ailier gauche passe juste derrière le demi-centre et arrive lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'ARD/ARG pour un croisé demi/ailier (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f1479.html',
          note: "\"ARG va fixer le centre de la défense et passe à l'ailier ALG qui vient de passer derrière DC. ALG attaque du côté interne au défenseur 2D et tire. Si le défenseur 3D empêche le tir, la passe peut être réalisée au pivot PVT.\"",
        },
        {
          titre: 'ARD/ARG pour un croisé demi/ailier, alternative 1 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f1479a.html',
          note: 'Schéma de la fin au pivot.',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'ailier gauche",
          etapes: [
            ...BASE_ARRIERES_DC_AILIER,
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...BASE_ARRIERES_DC_AILIER,
            {
              texte: "Le 3 gauche vient fermer: l'ailier gauche donne au pivot.",
              courses: { Piv: [-0.6, 6.3] },
              passe: ['AiG', 'Piv', 0.3],
              def: { G3: [-2.4, 6.9] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'combinaison-croises-ailier',
      nom: 'Combinaisons croisés (croisé arrière gauche/ailier gauche et 8 enchaînements)',
      alias: 'Croisé simple et enchaînements, Krydssammenhæng (DA), Cross combinations (EN), Combinaison simple 8 alternatives',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Un croisé arrière/ailier à gauche, puis huit façons d'enchaîner à droite: tir de l'arrière, entrées de l'ailier gauche, croisés avec l'ailier droit.",
      description: [
        "Série de Dragør HK construite sur un même début: le demi-centre passe à l'arrière gauche, qui croise avec l'ailier gauche. Sur la base, l'ailier gauche tire en suspension ou pénètre dans l'intervalle.",
        "Dans les huit enchaînements, l'ailier gauche donne à l'arrière droit, côté opposé, qui joue alors avec l'ailier gauche (qui poursuit son entrée), l'ailier droit ou le demi-centre (choisis une variante au-dessus du schéma). Chaque fin se termine par un tir en suspension ou une pénétration dans l'intervalle.",
        "Les fiches ne précisent pas la défense; elle est dessinée en 0-6 et ses réactions sont une proposition. Dans l'enchaînement 2, le texte dit \"à l'extérieur du défenseur 2G\", c'est-à-dire, dans la notation du site, le 2 placé face à l'arrière droit.",
      ],
      objectif: "Apprendre à enchaîner après un croisé arrière/ailier en lisant la défense de l'autre côté.",
      pointsCles: [
        "Chaque joueur qui reçoit cherche d'abord son tir ou sa pénétration.",
        "L'ailier gauche ne s'arrête pas après le croisé: il reste une solution (entrée, croisé derrière l'ailier droit).",
        "Les croisés avec l'ailier droit se font derrière le porteur, au plus près.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé simple (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f1549.html',
          note: "\"La balle est passée par le DC à ARG qui croise avec ALG. ALG tire en suspension ou pénètre dans l'intervalle.\"",
        },
        {
          titre: 'Croisé simple, enchaînements 1 à 8 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f1549a.html',
          note: "Pages f1549a à f1549h, ex. (5): \"ALG ralentit, ARD croise avec ALD, qui attaque vers le centre. L'ALG accélère, croise avec l'ALD derrière lui, reçoit la balle de sa part et tire en suspension ou prend l'intervalle.\"",
        },
        {
          titre: 'Playlist "Combinaisons Handball" (YouTube, extraits de Dragør HK)',
          url: 'https://www.youtube.com/playlist?list=PLTwEUYgwcdpoK3ttmLx0AFdzsI3cCtYDD',
          note: '"Combinaison simple 8 alternatives" (vidéo sans texte).',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "Base - Tir de l'ailier gauche",
          etapes: [
            ...BASE_CROISE_AILIER,
            {
              texte: "L'ailier gauche tire en suspension ou pénètre dans l'intervalle.",
              courses: { AiG: [-3.1, 7.3] },
              tir: { par: 'AiG', t: 0.5 },
            },
          ],
        },
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...SUITE_CROISE_AILIER,
            {
              texte: "L'arrière droit tire en suspension, ou prend l'intervalle intérieur ou extérieur.",
              courses: { ArD: [4.4, 7.6] },
              tir: { par: 'ArD', t: 0.5 },
              def: { D2: [4.8, 6.2] },
            },
          ],
        },
        {
          nom: "2 - L'ailier gauche continue son entrée",
          etapes: [
            ...SUITE_CROISE_AILIER,
            {
              texte: "L'arrière droit attaque à l'extérieur du 2 droit. L'ailier gauche continue son entrée vers le centre.",
              courses: { ArD: [6.4, 7.6], AiG: [0.6, 7.4] },
              def: { D2: [5.6, 6.0] },
            },
            {
              texte: "L'arrière droit donne à l'ailier gauche.",
              passe: ['ArD', 'AiG', 0.2],
              def: { D3: [1.8, 7.0] },
            },
            { texte: "L'ailier gauche tire ou prend l'intervalle.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - L'ailier gauche passe derrière l'arrière droit",
          etapes: [
            ...SUITE_CROISE_AILIER,
            {
              texte: "L'arrière droit attaque l'intérieur. L'ailier gauche continue son entrée et arrive vers lui.",
              courses: { ArD: [3.0, 8.0], AiG: [0.4, 8.8] },
              def: { D3: [2.2, 7.0] },
            },
            {
              texte: "L'ailier gauche passe derrière l'arrière droit et reçoit.",
              courses: { AiG: { vers: [5.0, 7.6], via: [3.2, 9.8] }, ArD: [2.6, 7.4] },
              passe: ['ArD', 'AiG', 0.55],
              def: { D3: [1.8, 6.8], D2: [4.8, 6.2] },
            },
            { texte: "L'ailier gauche tire ou prend l'intervalle.", tir: 'AiG' },
          ],
        },
        {
          nom: '4 - Croisé arrière droit/ailier droit',
          etapes: [
            ...SUITE_AILIER_DROIT,
            {
              texte: "L'ailier droit croise derrière l'arrière droit et reçoit.",
              courses: { AiD: { vers: [4.4, 8.4], via: [8.4, 9.8] }, ArD: [6.9, 7.0] },
              passe: ['ArD', 'AiD', 0.5],
            },
            {
              texte: "L'ailier droit tire ou prend l'intervalle.",
              courses: { AiD: [3.6, 7.6] },
              tir: { par: 'AiD', t: 0.5 },
              def: { D3: [2.4, 7.0] },
            },
          ],
        },
        {
          nom: "5 - L'ailier gauche croise derrière l'ailier droit",
          etapes: [
            ...SUITE_CROISE_AILIER,
            {
              texte: "L'ailier gauche ralentit. L'arrière droit attaque l'extérieur du 2 droit; l'ailier droit remonte.",
              courses: { AiG: [-1.0, 9.6], ArD: [6.4, 7.6], AiD: [8.6, 5.6] },
              def: { D2: [5.6, 6.0], D1: [7.6, 3.2] },
            },
            {
              texte: "L'ailier droit croise derrière l'arrière droit, reçoit et attaque vers le centre. L'ailier gauche accélère.",
              courses: { AiD: { vers: [3.6, 8.2], via: [8.4, 9.8] }, ArD: [6.9, 7.0], AiG: [1.4, 9.6] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D3: [2.4, 7.1] },
            },
            {
              texte: "L'ailier gauche croise derrière l'ailier droit et reçoit.",
              courses: { AiG: { vers: [5.4, 7.0], via: [3.8, 9.8] }, AiD: [2.8, 7.8] },
              passe: ['AiD', 'AiG', 0.55],
              def: { D2: [5.0, 5.4] },
            },
            { texte: "L'ailier gauche tire ou prend l'intervalle.", tir: 'AiG' },
          ],
        },
        {
          nom: "6 - L'ailier droit remet à l'ailier gauche",
          etapes: [
            ...SUITE_CROISE_AILIER,
            {
              texte: "L'arrière droit attaque l'extérieur du 2 droit; l'ailier droit remonte. L'ailier gauche poursuit son entrée.",
              courses: { ArD: [6.4, 7.6], AiD: [8.6, 5.6], AiG: [0.4, 8.8] },
              def: { D2: [5.6, 6.0], D1: [7.6, 3.2] },
            },
            {
              texte: "L'ailier droit croise derrière l'arrière droit et reçoit.",
              courses: { AiD: { vers: [4.6, 8.4], via: [8.4, 9.8] }, ArD: [6.9, 7.0] },
              passe: ['ArD', 'AiD', 0.5],
            },
            {
              texte: "Il remet à l'ailier gauche, qui entre.",
              courses: { AiG: [2.4, 7.4] },
              passe: ['AiD', 'AiG', 0.4],
              def: { D3: [1.4, 7.0] },
            },
            { texte: "L'ailier gauche tire ou prend l'intervalle.", tir: 'AiG' },
          ],
        },
        {
          nom: "7 - L'ailier droit s'engage à l'intérieur",
          etapes: [
            ...SUITE_CROISE_AILIER,
            {
              texte: "L'arrière droit attaque l'intérieur pour attirer le 2 droit.",
              courses: { ArD: [3.4, 7.8] },
              def: { D2: [4.2, 6.2], D3: [2.2, 7.0] },
            },
            {
              texte: "L'ailier droit s'engage à l'intérieur, dans l'espace laissé par le 2, et reçoit.",
              courses: { AiD: [5.8, 5.8] },
              passe: ['ArD', 'AiD', 0.4],
              def: { D1: [7.2, 3.0] },
            },
            { texte: "L'ailier droit tire ou prend l'intervalle.", tir: 'AiD' },
          ],
        },
        {
          nom: '8 - Le demi-centre décalé finit',
          etapes: [
            ...SUITE_AILIER_DROIT,
            {
              texte: "L'ailier droit croise derrière l'arrière droit, reçoit et attaque vers le centre. Le demi-centre se décale à gauche; l'ailier gauche s'est placé à droite du centre.",
              courses: {
                AiD: { vers: [3.6, 8.2], via: [8.4, 9.8] },
                ArD: [6.9, 7.0],
                DC: [-2.6, 8.4],
                AiG: [2.6, 7.4],
              },
              passe: ['ArD', 'AiD', 0.5],
              def: { D3: [1.6, 6.8] },
            },
            {
              texte: "L'ailier droit donne au demi-centre.",
              courses: { DC: [-2.6, 7.4] },
              passe: ['AiD', 'DC', 0.35],
              def: { G3: [-1.6, 6.8] },
            },
            { texte: "Le demi-centre tire ou prend l'intervalle.", tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'combinaison-croise-dc-ard',
      nom: 'Combinaison sur croisé DC/ARD (4 fins)',
      alias: 'Centerkryds - højre krydskombination (DA), Center cross - right cross combination (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Le demi-centre attaque à droite, l'arrière droit croise derrière lui; si le 3 gauche vient l'aider, le ballon file à l'arrière gauche, qui finit ou décale l'ailier.",
      description: [
        "Combinaison de Dragør HK. Le demi-centre se lance vers l'intervalle entre le 3 et le 2 droits pour tirer à 9 ou à 6 m. Si le tir n'est pas possible, il donne à l'arrière droit, qui croise derrière lui; au même moment, le pivot bloque le 3 droit côté intérieur.",
        "Si le 3 gauche vient défendre sur l'arrière droit, le ballon va à l'arrière gauche, parti avec une feinte de course à gauche ou à droite du 2 gauche. Selon son choix, il tire, ou finit sur l'ailier gauche, à l'aile ou dans l'intervalle 1-2 (quatre fins, choisis une variante au-dessus du schéma).",
        "Les textes français des fins 1 et 3 disent que c'est l'ailier qui tire; les schémas et la version danoise montrent l'arrière gauche (\"VB afslutter på indersiden af forsvarets HB\"). Les schémas sont suivis ici. Le site conseille, pour un demi-centre droitier, un tir en appui ou à la hanche, et une passe qui permet au receveur de s'élever dès le premier pas.",
      ],
      objectif: "Exploiter l'aide du 3 gauche sur le croisé pour attaquer le côté gauche.",
      pointsCles: [
        "Le demi-centre cherche vraiment le tir avant de donner.",
        "La feinte de course de l'arrière gauche décide de la fin: intérieur ou extérieur du 2.",
        "La passe arrive sur le premier pas du receveur, pour une suspension immédiate.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Combinaison sur croisé demi-centre/arrière droit (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f885.html',
          note: "\"Si 3D vient défendre, la balle est passée à l'arrière gauche ARG qui a démarré avec une feinte de course, soit à gauche, soit à droite de 2D. En fonction du choix de ARG, on peut terminer sur l'ailier ALG soit en position d'ailier, soit dans l'intervalle 1D 2D.\"",
        },
        {
          titre: 'Center cross - right cross combination (Dragør HK, version anglaise)',
          url: 'http://www.dragoerhb.dk/english/z885.html',
          note: '"In the example LB shoots on the inside of defending R2."',
        },
        {
          titre: 'Alternatives 2 à 4 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f885c.html',
          note: "Pages f885a, f885b, f885c; (c): \"ARG joue le décalage après avoir feinté une course interne: il passe la balle à ALG qui peut tirer à l'extérieur.\"",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche à l'intérieur du 2",
          etapes: [
            ...BASE_CROISE_DC_ARD,
            {
              texte: "Le 3 gauche vient défendre sur l'arrière droit, qui donne à l'arrière gauche. L'arrière gauche, après sa feinte vers l'extérieur, revient à l'intérieur du 2 gauche.",
              courses: { ArG: [-3.4, 7.6], AiG: [-6.4, 4.0] },
              passe: ['ArD', 'ArG', 0.35],
              def: { G1: [-7.0, 2.6] },
            },
            { texte: "L'arrière gauche tire à l'intérieur du 2 gauche.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Ailier gauche entre le 1 et le 2',
          etapes: [
            ...BASE_CROISE_DC_ARD,
            {
              texte: "Le 3 gauche vient défendre sur l'arrière droit, qui donne à l'arrière gauche. L'arrière gauche feinte vers l'intérieur et attire le 2 gauche.",
              courses: { ArG: [-4.0, 8.0], AiG: [-8.0, 3.0] },
              passe: ['ArD', 'ArG', 0.35],
              def: { G2: [-4.4, 6.2] },
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche, qui entre entre le 1 et le 2 gauches.",
              courses: { AiG: [-6.2, 4.4] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G1: [-7.6, 2.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Tir de l'arrière gauche à l'extérieur du 2",
          etapes: [
            ...BASE_CROISE_DC_ARD,
            {
              texte: "Le 3 gauche vient défendre sur l'arrière droit, qui donne à l'arrière gauche. L'arrière gauche feinte vers l'intérieur; l'ailier gauche remonte et libère l'aile.",
              courses: { ArG: [-4.4, 8.4], AiG: [-9.2, 4.6] },
              passe: ['ArD', 'ArG', 0.35],
              def: { G2: [-4.4, 6.0] },
            },
            {
              texte: "L'arrière gauche contourne le 2 gauche par l'extérieur et tire.",
              courses: { ArG: [-6.2, 6.6] },
              tir: { par: 'ArG', t: 0.55 },
              def: { G2: [-4.8, 5.8] },
            },
          ],
        },
        {
          nom: "4 - Décalage de l'ailier gauche à l'aile",
          etapes: [
            ...BASE_CROISE_DC_ARD,
            {
              texte: "Le 3 gauche vient défendre sur l'arrière droit, qui donne à l'arrière gauche. L'arrière gauche feinte une course intérieure; le 2 et le 1 gauches se resserrent.",
              courses: { ArG: [-3.8, 8.0] },
              passe: ['ArD', 'ArG', 0.35],
              def: { G2: [-4.2, 6.4], G1: [-6.6, 3.6] },
            },
            {
              texte: "L'arrière gauche joue le décalage: il donne à l'ailier gauche.",
              courses: { AiG: [-8.8, 3.4] },
              passe: ['ArG', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire à l'extérieur.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'combinaison-croise-dc-arg',
      nom: 'Combinaison sur croisé DC/ARG',
      alias: 'Backkryds - venstre krydskombination (DA), Backcourt cross - left cross combination (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "L'ailier gauche fixe le 1, l'arrière gauche attaque l'intervalle 2-3 et le demi-centre croise derrière lui vers l'intervalle 1-2.",
      description: [
        "Combinaison de Dragør HK lancée par l'ailier gauche. Il fixe l'extérieur du 1 gauche et tire si celui-ci ne réagit pas. Sinon, il passe à l'arrière gauche qui, après une feinte de course, attaque l'intervalle entre le 2 et le 3 gauches; il tire si c'est possible.",
        "Le demi-centre a lui aussi fait une feinte de course; il part finalement vers l'intervalle entre le 1 et le 2 gauches, en croisant derrière l'arrière gauche. Il reçoit et tire. Si l'intervalle se referme, il donne à l'ailier gauche (variante 2).",
        "La défense n'est pas précisée par la source; elle est dessinée en 0-6.",
      ],
      objectif: "Libérer l'intervalle 1-2 en attirant le 1 sur l'ailier et le 2 sur l'arrière.",
      pointsCles: [
        "Chaque joueur menace le but: l'ailier, puis l'arrière, tirent si on les laisse faire.",
        "Les feintes de course de l'arrière et du demi-centre cachent la direction du croisé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Combinaison sur croisé demi-centre/arrière gauche (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f887.html',
          note: "\"Le demi-centre DC a également fait une feinte de course et court finalement vers l'intervalle 1D 2D. ARG passe à DC qui tire.\"",
        },
        {
          titre: 'Combinaison sur croisé demi-centre/arrière gauche, alternative 1 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f887a.html',
          note: "\"Si l'intervalle se referme, il passe à ALG qui tire.\"",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: '1 - Tir du demi-centre',
          etapes: [
            ...BASE_CROISE_DC_ARG,
            {
              texte: "Le demi-centre tire entre le 1 et le 2 gauches.",
              courses: { DC: [-5.4, 5.6] },
              tir: { par: 'DC', t: 0.45 },
            },
          ],
        },
        {
          nom: "2 - L'intervalle se referme: passe à l'ailier",
          etapes: [
            ...BASE_CROISE_DC_ARG,
            {
              texte: "Le 1 gauche ferme l'intervalle. Le demi-centre donne à l'ailier gauche.",
              courses: { AiG: [-8.8, 2.8] },
              passe: ['DC', 'AiG', 0.35],
              def: { G1: [-6.4, 4.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-central-a',
      nom: "Croisé central A (contournement de l'avancé)",
      alias: 'Centerkryds A (DA), Center cross A (EN), Croisé central',
      categorie: 'Contre 5-1',
      defense: '5-1 (défense avec un avancé)',
      dispositif: '5-1',
      resume: "Le demi-centre contourne l'avancé, l'arrière droit croise derrière lui et attire le 2 gauche; l'arrière gauche tire à la place du 2.",
      description: [
        "Combinaison de Dragør HK contre une défense avec un avancé. Le demi-centre fait une feinte de course vers l'avancé et reçoit de l'arrière gauche. Il change vite de direction, contourne l'avancé par la droite et donne à l'arrière droit, qui croise derrière lui.",
        "L'arrière droit, lancé vers la gauche, fixe le côté intérieur du 2 gauche pour l'obliger à défendre. Il donne alors à l'arrière gauche, qui tire à la place que le 2 a quittée.",
        "Le texte français dit que l'arrière droit passe \"à son ailier ALD\": les versions danoise et anglaise (\"The ball is now passed to LB, who shoots\") et le schéma montrent l'arrière gauche. La source ne nomme pas la défense; elle parle seulement du \"défenseur avancé\".",
      ],
      objectif: "Éliminer l'avancé du jeu et créer un 2 contre 1 sur le 2 gauche.",
      pointsCles: [
        "La feinte vers l'avancé doit le fixer avant le changement de direction.",
        "L'arrière droit fixe vraiment le 2 gauche par l'intérieur.",
        "L'arrière gauche attend la passe en retrait puis attaque l'espace libéré.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé central A (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f232.html',
          note: "\"DC change rapidement de direction et contourne le défenseur avancé et passe à l'arrière droit ARD qui croise derrière lui. ARD va fixer le côté interne du défenseur 2D.\"",
        },
        {
          titre: 'Centerkryds A (Dragør HK, version danoise)',
          url: 'http://www.dragoerhb.dk/x232.html',
          note: "\"Bolden afleveres nu til VB, som afslutter på forsvarende HB's oprindelige plads\" (l'arrière gauche tire à la place d'origine du 2).",
        },
      ],
      ballon: 'ArG',
      etapes: [
        {
          texte: "Le demi-centre fait une feinte de course vers l'avancé et reçoit de l'arrière gauche.",
          courses: { DC: [-0.6, 9.8] },
          passe: ['ArG', 'DC', 0.4],
          def: { D3: [0.0, 8.7] },
        },
        {
          texte: "Il change vite de direction et contourne l'avancé par la droite.",
          courses: { DC: { vers: [2.0, 8.8], via: [1.4, 10.4] } },
          def: { D3: [0.8, 8.6] },
        },
        {
          texte: "L'arrière droit croise derrière lui et reçoit, lancé vers la gauche. L'avancé reste sur le demi-centre.",
          courses: { ArD: { vers: [-1.6, 8.8], via: [2.4, 10.8] }, DC: [2.6, 8.2] },
          passe: ['DC', 'ArD', 0.45],
          def: { D3: [1.6, 7.9] },
        },
        {
          texte: "L'arrière droit fixe le côté intérieur du 2 gauche, qui sort pour défendre. L'arrière gauche se prépare.",
          courses: { ArD: [-3.2, 7.4], ArG: [-6.0, 8.6] },
          def: { G2: [-3.9, 6.2], G3: [-1.6, 6.8] },
        },
        {
          texte: "L'arrière droit donne à l'arrière gauche, qui attaque la place laissée par le 2.",
          courses: { ArG: [-5.2, 7.0] },
          passe: ['ArD', 'ArG', 0.3],
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croises-successifs-tireur',
      nom: 'Croisés successifs pour libérer un tireur marqué',
      alias: '"Making successive crossings with the other two back players" (Antón 2014, 6e solution)',
      categorie: 'Croisés',
      defense: 'Toutes zones, utile contre 5-1 (tireur pressé)',
      resume: "Le tireur de loin, pressé par son défenseur, croise avec le demi-centre puis aussitôt avec l'arrière opposé, pour finir du côté où la défense ne l'attend pas.",
      description: [
        "Solution proposée par Juan L. Antón García (Espagne) quand le meilleur tireur de loin est marqué en anticipation, son défenseur avancé jusqu'aux 9 m ou plus. On enchaîne deux croisés avec les deux autres arrières: croisé demi-centre/tireur, puis, dès que le tireur reçoit, passe immédiate à l'arrière opposé et nouveau croisé arrière opposé/tireur, dans la zone opposée.",
        "Le pivot est placé au départ dans la zone de finition, du côté opposé au poste du tireur. Au moment du second croisé, il se démarque vers l'axe ou entraîne son défenseur pour libérer l'espace de tir.",
        "La source décrit le principe sans schéma détaillé (graphique non consulté). Le déroulement dessiné ici, avec l'arrière gauche comme tireur pressé, est une mise en forme fidèle à ce principe; les positions et la réaction de la défense sont une proposition.",
      ],
      objectif: "Libérer le tireur marqué en le faisant finir dans une zone dont les défenseurs n'attendent pas cette nouvelle difficulté.",
      pointsCles: [
        "Le tireur passe aussitôt après avoir reçu: c'est l'enchaînement rapide qui surprend.",
        "Le second croisé se joue du côté opposé au poste habituel du tireur.",
        "Le pivot, déjà placé dans cette zone, libère l'espace au bon moment.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Antón García, Tactical and strategical alternatives against anticipation defense to dangerous distance shooters (EHF Web Periodical, 2014)',
          url: 'http://home.eurohandball.com/ehf_files/Publikation/WP_Anton%20J.L._Tactical%20and%20strategical.pdf',
          note: '"when the thrower receives the ball he pass immediately to the opposite back, in form that is chained a new crossing in the opposite zone, whose defenders do not expect that new difficulty"',
        },
      ],
      depart: { Piv: [3.4, 6.4], G2: [-5.0, 8.4] },
      ballon: 'DC',
      etapes: [
        {
          texte: "L'arrière gauche, tireur de loin, est pressé par le 2 gauche jusqu'aux 9 m. Le pivot est placé à droite. Le demi-centre attaque vers la gauche.",
          courses: { DC: [-2.2, 9.0] },
          def: { G3: [-2.0, 7.4] },
        },
        {
          texte: "Premier croisé: l'arrière gauche passe derrière le demi-centre et reçoit au centre. Le demi-centre gêne le 2 gauche.",
          courses: { ArG: { vers: [0.2, 9.4], via: [-3.6, 10.8] }, DC: [-3.4, 8.2] },
          passe: ['DC', 'ArG', 0.55],
          def: { G2: [-4.4, 7.4], G3: [-1.6, 7.2] },
        },
        {
          texte: "L'arrière gauche donne aussitôt à l'arrière droit, qui attaque en diagonale vers le centre.",
          courses: { ArD: [2.6, 8.6], ArG: [0.6, 10.0] },
          passe: ['ArG', 'ArD', 0.15],
          def: { D3: [2.2, 7.4] },
        },
        {
          texte: "Second croisé, dans la zone opposée: l'arrière gauche passe derrière l'arrière droit et reçoit. Le pivot se démarque vers l'axe et entraîne son défenseur.",
          courses: {
            ArG: { vers: [4.2, 8.4], via: [2.6, 10.4] },
            ArD: [1.8, 8.0],
            Piv: [1.0, 6.4],
          },
          passe: ['ArD', 'ArG', 0.55],
          def: { D3: [1.8, 7.0], D2: [4.9, 5.6] },
        },
        {
          texte: "L'arrière gauche tire dans l'espace libéré.",
          courses: { ArG: [4.2, 7.6] },
          tir: { par: 'ArG', t: 0.5 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'wirbel',
      nom: 'Wirbel ("tourbillon")',
      alias: 'Wirbel, Außenkreisel + Kreuzen (DE)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "L'arrière gauche va chercher l'ailier gauche, puis le demi-centre croise avec l'arrière droit pendant que l'ailier et l'arrière gauches reprennent leurs postes; passe parallèle et percée dans l'intervalle 1-2.",
      description: [
        "Combinaison allemande (handballhaus.de). Le ballon circule de l'arrière droit vers l'arrière gauche, qui va chercher l'ailier gauche (croisé arrière/ailier). L'ailier passe au demi-centre, qui croise avec l'arrière droit.",
        "Pendant ce temps, l'ailier gauche et l'arrière gauche reviennent à leurs postes de départ: c'est la rotation extérieure (\"Außenkreisel\"). L'arrière droit fait une passe parallèle dans la course de l'arrière gauche, placé près de la ligne de touche, qui cherche la percée dans l'intervalle entre le 1 et le 2 gauches.",
        "En alternative, l'arrière gauche sert l'ailier gauche (Wirbel 2) ou le pivot (Wirbel 3). La source ne précise pas la défense ni le placement du pivot; ils sont proposés ici.",
      ],
      objectif: "Déplacer la défense par deux croisés puis attaquer l'intervalle 1-2 avec l'arrière gauche lancé.",
      pointsCles: [
        "La rotation extérieure doit être finie quand l'arrière droit reçoit.",
        "La passe parallèle arrive dans la course vers l'avant de l'arrière gauche.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Wirbel (handballhaus.de, archive 2011)',
          url: 'http://web.archive.org/web/20110405100857/http://www.handballhaus.de:80/handball/angriffstaktik/kreuzen/wirbel.html',
          note: '"Passfolge RR-RM-RL, RL holt LA, LA passt zu RM, RM kreuzt mit RR. Derweil wechseln LA und RL wieder zu den Ausgangspositionen zurück (Außenkreisel). [...] RL sucht den Durchbruch in der Lücke 1 - 2. Als Alternative kann RL entweder den KS (Variante 3) oder LA freispielen (Variante 2)."',
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Percée de l'arrière gauche",
          etapes: [
            ...BASE_WIRBEL,
            {
              texte: "L'arrière gauche perce dans l'intervalle entre le 1 et le 2 gauches et tire.",
              courses: { ArG: [-6.6, 5.6] },
              tir: { par: 'ArG', t: 0.55 },
            },
          ],
        },
        {
          nom: "2 - Passe à l'ailier gauche",
          etapes: [
            ...BASE_WIRBEL,
            {
              texte: "Le 1 gauche sort sur l'arrière gauche, qui sert l'ailier gauche.",
              courses: { ArG: [-6.4, 6.4], AiG: [-9.0, 2.4] },
              passe: ['ArG', 'AiG', 0.45],
              def: { G1: [-7.0, 4.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Passe au pivot',
          etapes: [
            ...BASE_WIRBEL,
            {
              texte: "Le 2 gauche sort sur l'arrière gauche, qui sert le pivot, glissé dans son dos.",
              courses: { ArG: [-6.4, 7.2], Piv: [-3.6, 6.4] },
              passe: ['ArG', 'Piv', 0.45],
              def: { G2: [-5.6, 6.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ar-dc-tir-ailier',
      nom: "Croisé arrière/DC pour un tir d'ailier libre",
      alias: 'Croisé AR-DC pour décaler AL, Back/centerkryds til frit fløjskud (DA), Backcourt/Center cross for free wing shot (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Une passe d'ailier à ailier par-dessus la zone renverse le jeu; le demi-centre croise derrière l'arrière gauche et attire le 1 pour libérer l'ailier gauche.",
      description: [
        "Combinaison de Dragør HK. Le demi-centre sert l'arrière droit, qui fixe et donne à l'ailier droit. L'ailier droit descend en profondeur et fait une passe transversale, par-dessus la zone, à l'ailier gauche.",
        "L'ailier gauche sert l'arrière gauche, qui démarre à l'extérieur du 2 gauche puis rentre pour l'entraîner vers l'intérieur. Le demi-centre croise derrière lui, reçoit et fixe entre le 1 et le 2 gauches, surtout pour attirer le 1. Si le 1 ne sort pas, le demi-centre tire; s'il sort, le demi-centre donne à l'ailier gauche, qui tire.",
        "La défense n'est pas précisée par la source; elle est dessinée en 0-6.",
      ],
      objectif: "Renverser vite le jeu par la passe d'ailier à ailier et créer un 2 contre 1 sur le 1 gauche.",
      pointsCles: [
        "La passe transversale d'ailier à ailier doit être tendue et passer au-dessus de la zone, hors de portée du gardien.",
        "L'arrière gauche rentre franchement pour emmener le 2.",
        "Le demi-centre attaque l'intervalle 1-2 avec l'intention de tirer.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Croisé AR/DC pour décaler l'AL (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f846.html',
          note: "\"Le DC croise derrière l'ARG pour recevoir dans l'intervalle 1D - 2D avec comme intention de faire venir le 1D. Si celui-ci ne vient pas il prend le tir. Si celui-ci vient fermer, le DC décale l'ALG qui tire.\"",
        },
        {
          titre: 'Back/centerkryds til frit fløjskud (Dragør HK, version danoise)',
          url: 'http://www.dragoerhb.dk/x846.html',
          note: "\"HF går dybt og spiller tværs over målfeltet til VF\" (l'ailier droit descend et joue en travers par-dessus la zone vers l'ailier gauche).",
        },
        {
          titre: 'Handball Gardéen - 16 combinaisons en fiches animées',
          url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349',
          note: '"Croisé AR-DC pour décaler AL": renvoie vers la fiche Dragør.',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Le 1 ne sort pas: tir du demi-centre',
          etapes: [
            ...BASE_AR_DC_AILIER,
            {
              texte: "Le 1 gauche reste sur l'ailier: le demi-centre attaque entre le 1 et le 2 gauches et tire.",
              courses: { DC: [-5.8, 6.0] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Le 1 sort: passe à l'ailier gauche",
          etapes: [
            ...BASE_AR_DC_AILIER,
            {
              texte: "Le demi-centre fixe entre le 1 et le 2 gauches. Le 1 gauche rentre pour fermer.",
              courses: { DC: [-6.0, 6.6] },
              def: { G1: [-6.4, 4.6] },
            },
            {
              texte: "Le demi-centre décale l'ailier gauche.",
              courses: { AiG: [-8.0, 2.8] },
              passe: ['DC', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ar-dc-prolonge',
      nom: 'Croisé arrière/DC prolongé',
      alias: 'Back/Centerkryds fortsat (DA), Continued Backcourt/Center cross (EN)',
      categorie: 'Croisés',
      defense: '0-6 (non précisée)',
      resume: "Après un croisé arrière gauche/demi-centre, l'ailier gauche croise derrière le demi-centre et relance l'arrière gauche, qui avait temporisé.",
      description: [
        "Combinaison de Dragør HK (fiche danoise et anglaise, sans version française). L'arrière gauche part en traversée vers la droite; le demi-centre croise derrière lui et reçoit, puis continue vers l'extérieur, vers le 1 gauche.",
        "L'ailier gauche croise derrière le demi-centre, reçoit et part en traversée. L'arrière gauche, qui a temporisé après le premier croisé, accélère et reçoit de l'ailier. Le pivot bloque si possible le 3 droit. L'arrière gauche tire; sinon, il donne à l'arrière droit, qui a fixé vers l'extérieur.",
        "Traduction du danois. La défense n'est pas précisée; elle est dessinée en 0-6.",
      ],
      objectif: "Enchaîner deux croisés pour relancer l'arrière gauche à contretemps.",
      pointsCles: [
        "L'arrière gauche temporise après le premier croisé puis accélère au bon moment.",
        "Le demi-centre continue sa course vers l'extérieur pour emmener la défense.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Back/Centerkryds fortsat (Dragør HK, version danoise)',
          url: 'http://www.dragoerhb.dk/x818.html',
          note: '"VB har tøvet lidt efter krydset med PM men sætter nu fart og modtager bolden fra VF. HB presser udaf og kan evt. modtage bolden fra VB, hvis denne ikke kan afslutte. ST sætter om muligt screening på forsvarets V3."',
        },
        {
          titre: 'Continued Backcourt/Center cross (Dragør HK, version anglaise)',
          url: 'http://www.dragoerhb.dk/english/z818.html',
          note: '"LB, who has hesitated a bit after the cross, take speed and receives the ball from LW."',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...BASE_AR_DC_PROLONGE,
            {
              texte: "L'arrière gauche tire entre le 3 et le 2 droits.",
              courses: { ArG: [3.4, 7.8] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Passe à l'arrière droit",
          etapes: [
            ...BASE_AR_DC_PROLONGE,
            {
              texte: "Le 2 droit sort sur l'arrière gauche, qui ne peut pas tirer: il donne à l'arrière droit.",
              courses: { ArG: [3.0, 8.0] },
              passe: ['ArG', 'ArD', 0.4],
              def: { D2: [4.0, 6.8] },
            },
            {
              texte: "L'arrière droit tire.",
              courses: { ArD: [6.2, 7.2] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'circulation-en-huit-5-1',
      nom: 'Circulation "en 8" contre 5-1',
      alias: 'Circulación "en 8", doble cruce central-lateral-lateral (ES, Antón 2011)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Double croisé centre/arrière/arrière; le centre entre et entraîne le central, le pivot sort et entraîne le 2, l'ailier gauche surgit dans l'espace créé.",
      description: [
        "Procédé tactique décrit par Juan L. Antón García contre une 5-1. La première ligne joue une circulation \"en 8\" (double croisé centre, arrière, arrière). Juste après sa passe, le centre circule vers l'intérieur et vers le côté opposé pour entraîner le défenseur central latéralement.",
        "Le jeu continue vers l'arrière droit, qui vient recevoir dans le second croisé. Au même moment, le pivot, placé au départ près du 2 gauche, tire son défenseur vers l'extérieur. L'ailier gauche, parti large, fait un appel explosif dans l'espace créé entre le 2 et le central, pour surprendre le 2 au changement d'adversaire.",
        "Fins décrites: tir de loin (surtout de l'arrière droit), passe à l'ailier gauche en circulation, remise au centre dans son nouveau poste, ou changement de sens vers l'arrière gauche pour un 2 contre 2 (voire 2 contre 1) côté droit si le 2 droit reste avec le centre. Antón précise qu'un procédé n'est jamais une combinaison fermée: on lit la défense.",
        "Le schéma de la source n'a pas été consulté et l'enchaînement exact des passes du double croisé est en partie implicite: le déroulement dessiné ici est une interprétation fidèle au texte.",
      ],
      objectif: "Déplacer latéralement le central et le 2 gauche pour ouvrir un espace intérieur à l'ailier gauche.",
      pointsCles: [
        "Le centre circule tout de suite après sa passe, pour entraîner le central.",
        "Le déplacement du pivot est synchronisé avec la réception de l'arrière droit.",
        "L'ailier gauche part large et attaque l'espace au dernier moment, hors du champ de vision du 2.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Antón García, procédés tactiques contre 5:1 par la "mobilisation du défenseur" (Clinic RFEBM, Elche, 2011)',
          url: 'https://fmbalonmano.federatio.com/upload/descargas/25-juanant%C3%B3ncontradefensa5.1%20(1).pdf',
          note: '"se combina una circulación "en 8" en primera línea (doble cruce central‐lateral‐lateral) [...] el central B, después de pasar el balón a A, inmediatamente circula hacia el interior y al lado contrario tratando de movilizar a 4 por arrastre lateral"',
        },
      ],
      depart: { Piv: [-3.4, 6.4] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de loin de l'arrière droit",
          etapes: [
            ...BASE_EN_HUIT,
            {
              texte: "L'arrière droit tire de loin.",
              courses: { ArD: [-1.8, 8.8] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - Passe à l'ailier gauche en circulation",
          etapes: [
            ...BASE_EN_HUIT,
            {
              texte: "L'ailier gauche surgit dans l'espace entre le 2 et le central; l'arrière droit le sert.",
              courses: { AiG: { vers: [-3.0, 6.9], via: [-6.4, 3.4] } },
              passe: ['ArD', 'AiG', 0.45],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Remise au centre',
          etapes: [
            ...BASE_EN_HUIT,
            {
              texte: "L'arrière droit remet au centre, dans son nouveau poste à droite.",
              passe: ['ArD', 'DC', 0.3],
            },
            {
              texte: 'Le centre tire.',
              courses: { DC: [2.8, 7.2] },
              tir: { par: 'DC', t: 0.4 },
            },
          ],
        },
        {
          nom: "4 - Changement de sens vers l'arrière gauche",
          etapes: [
            ...BASE_EN_HUIT,
            {
              texte: "Changement de sens: l'arrière droit rend à l'arrière gauche, qui attaque à droite avec le centre. Le 2 droit reste avec le centre.",
              courses: { ArG: [3.2, 8.4] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D2: [3.2, 6.6] },
            },
            {
              texte: "2 contre 1: l'arrière gauche pénètre et tire.",
              courses: { ArG: [4.4, 7.4] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-dc-ar-contre-1-5',
      nom: 'Croisé DC/arrière contre 1-5 avec écran du pivot',
      alias: 'Croisé Demi Centre / Arrières (Dragør HK)',
      categorie: 'Contre 5-1',
      defense: '1-5 (5-1)',
      dispositif: '5-1',
      resume: "Le demi-centre attire l'avancé à droite et donne dans le dos à l'arrière droit, qui croise et attaque entre le 2 et le 3 gauches derrière l'écran du pivot.",
      description: [
        "Combinaison de Dragør HK \"applicable contre une défense 1-5\" (ici dessinée comme une 5-1: cinq défenseurs sur la ligne et un avancé). L'arrière droit passe au demi-centre, qui s'engage vers la droite et feinte un tir, puis fait une passe dans le dos à l'arrière droit qui croise avec lui.",
        "L'arrière droit s'engage dans l'intervalle entre le 2 et le 3 gauches; le pivot pose un écran sur le 3. L'arrière droit tire ou, s'il est bloqué par le 2, passe à l'arrière gauche.",
        "Sur la fiche, l'exercice se joue dans un couloir délimité par deux plots, avec trois défenseurs et un avancé.",
      ],
      objectif: "Éloigner l'avancé et ouvrir l'intervalle 2-3 gauche pour l'arrière droit.",
      pointsCles: [
        "La feinte de tir du demi-centre doit attirer l'avancé.",
        "La passe dans le dos arrive dans la course de l'arrière droit.",
        "Le pivot tient son écran sur le 3 jusqu'au tir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé Demi Centre / Arrières (Dragør HK, trad. HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f225.html',
          note: "\"ARD passe à DC, qui s'engage vers la droite et feinte un tir, puis fait une passe dans le dos à ARD qui effectue un croisé avec lui. ARD s'engage dans l'intervalle 2D et 3P, PVT effectue un écran sur 3C et maintenant ARD peut soit tirer, soit, s'il est bloqué par 2D, faire une passe à ARG.\"",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...BASE_DC_AR_1_5,
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "2 - Bloqué par le 2: passe à l'arrière gauche",
          etapes: [
            ...BASE_DC_AR_1_5,
            {
              texte: "Le 2 gauche bloque l'arrière droit, qui donne à l'arrière gauche.",
              courses: { ArG: [-5.8, 7.0] },
              passe: ['ArD', 'ArG', 0.35],
              def: { G2: [-3.4, 6.6] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ar-al-fixation-opposee',
      nom: "Croisé arrière/ailier puis fixation à l'opposé",
      alias: 'Back/fløjkryds til modsat pres (DA), Backcourt/Wing cross to opposite pressure (EN)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Croisé arrière/ailier à gauche; l'ailier gauche traverse toute la défense pendant que le ballon revient à droite, où l'arrière droit attaque entre le 2 et le 1.",
      description: [
        "Combinaison de Dragør HK, \"adaptée contre une 5-1\" (fiche danoise et anglaise). Le demi-centre passe à l'arrière gauche, qui court vers l'extérieur et croise avec l'ailier gauche. L'ailier reçoit et part en traversée le long de la défense.",
        "Le ballon revient au demi-centre, qui fixe vers la droite et donne à l'arrière droit. L'arrière droit fixe vers l'extérieur et attaque entre le 2 et le 1 droits pour mettre le 2 sous pression. Lecture: si le 2 prend l'arrière, on sert l'ailier gauche rentré; si le 2 couvre l'ailier rentrant, l'arrière tire; si le 1 rentre sur l'arrière, on sert l'ailier droit, placé en profondeur.",
        "Traduction du danois; les côtés sont ceux des schémas de la fiche.",
      ],
      objectif: "Mettre le 2 droit devant un choix impossible entre l'arrière droit et l'ailier gauche rentré.",
      pointsCles: [
        "L'ailier gauche traverse sans ballon et arrive dans le dos du 2 droit au moment de l'attaque de l'arrière.",
        "L'arrière droit attaque l'intervalle 1-2 pour obliger le 2 à choisir.",
        "L'ailier droit reste en profondeur, près de la ligne de fond.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Back/fløjkryds til modsat pres (Dragør HK, version danoise)',
          url: 'http://www.dragoerhb.dk/x820.html',
          note: '"Dækker V2 backen, kan VF spilles. Dækker V2 for den indløbende VF skyder HB selv. Går V1 ind og dækker HB, afleveres til HF, som står dybt og kan afslutte."',
        },
        {
          titre: 'Backcourt/Wing cross to opposite pressure (Dragør HK, version anglaise)',
          url: 'http://www.dragoerhb.dk/english/z820.html',
          note: '"Suitable against 5-1"; mêmes trois lectures.',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Le 2 prend l'arrière: passe à l'ailier gauche",
          etapes: [
            ...BASE_FIXATION_OPPOSEE,
            {
              texte: "L'arrière droit attaque entre le 2 et le 1 droits. Le 2 sort sur lui.",
              courses: { ArD: [6.4, 7.0] },
              def: { D2: [5.6, 6.0] },
            },
            {
              texte: "L'arrière droit sert l'ailier gauche, rentré dans le dos du 2.",
              courses: { AiG: [3.0, 6.4] },
              passe: ['ArD', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Le 2 couvre l'ailier: tir de l'arrière droit",
          etapes: [
            ...BASE_FIXATION_OPPOSEE,
            {
              texte: "L'arrière droit attaque entre le 2 et le 1 droits. Le 2 reste sur l'ailier gauche qui rentre.",
              courses: { ArD: [6.4, 7.0] },
              def: { D2: [3.6, 6.0] },
            },
            {
              texte: "L'arrière droit tire.",
              courses: { ArD: [5.8, 6.4] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: "3 - Le 1 rentre: passe à l'ailier droit",
          etapes: [
            ...BASE_FIXATION_OPPOSEE,
            {
              texte: "L'arrière droit attaque entre le 2 et le 1 droits. Le 1 rentre sur lui; l'ailier droit descend en profondeur.",
              courses: { ArD: [6.2, 6.8], AiD: [9.2, 0.7] },
              def: { D1: [6.8, 5.2] },
            },
            {
              texte: "L'arrière droit sert l'ailier droit.",
              passe: ['ArD', 'AiD', 0.3],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-dc-ar-arriere-oppose',
      nom: "Croisé DC/arrière, l'ailier sert l'arrière opposé",
      alias: 'Center/Backkryds - fløj til modsatte back (DA), Center/Backcourt cross - wing to opposite backcourt (EN)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "L'arrière droit attaque le centre et fait reculer l'avancé; le demi-centre croise derrière lui, sert l'ailier droit rentré, qui renvoie aussitôt sur l'arrière gauche lancé au centre.",
      description: [
        "Combinaison de Dragør HK, \"adaptée contre une 5-1\" (fiche danoise et anglaise). L'ailier droit sert l'arrière droit, qui attaque vers le centre: l'avancé (\"CF\" dans la fiche) est entraîné vers le bas.",
        "Le demi-centre croise derrière l'arrière droit, reçoit et court vers l'ailier droit. L'ailier droit, qui s'est rapproché du centre, reçoit du demi-centre et passe aussitôt à l'arrière gauche, qui attaque à pleine vitesse l'ouverture créée au centre et tire.",
        "Traduction du danois. Le placement exact du pivot n'est pas décrit; il reste à son poste.",
      ],
      objectif: "Faire reculer l'avancé puis attaquer le centre dégarni avec l'arrière opposé lancé.",
      pointsCles: [
        "L'arrière droit attaque vraiment le centre pour entraîner l'avancé.",
        "L'ailier droit joue en une touche: la vitesse du renversement fait la différence.",
        "L'arrière gauche arrive lancé, à pleine vitesse.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Center/Backkryds - fløj til modsatte back (Dragør HK, version danoise)',
          url: 'http://www.dragoerhb.dk/x1042.html',
          note: '"HF er løbet mod midten og modtager bolden fra PM og afleverer den straks videre til VB, som angriber med fuld fart mod åbningen i midten."',
        },
        {
          titre: 'Center/Backcourt cross - wing to opposite backcourt (Dragør HK, version anglaise)',
          url: 'http://www.dragoerhb.dk/english/z1042.html',
          note: '"RB attacks against the center. By doing this the defending CF is pulled down."',
        },
      ],
      ballon: 'AiD',
      etapes: [
        {
          texte: "L'ailier droit sert l'arrière droit, qui attaque vers le centre. L'avancé recule sur lui.",
          courses: { AiD: [8.8, 2.4], ArD: [1.8, 8.2] },
          passe: ['AiD', 'ArD', 0.2],
          def: { D3: [0.8, 7.6] },
        },
        {
          texte: "Le demi-centre croise derrière l'arrière droit, reçoit et court vers l'ailier droit. L'ailier droit se rapproche du centre.",
          courses: { DC: { vers: [4.8, 8.0], via: [2.6, 10.6] }, AiD: [6.8, 6.4] },
          passe: ['ArD', 'DC', 0.5],
          def: { D2: [4.8, 5.8] },
        },
        {
          texte: "Le demi-centre donne à l'ailier droit.",
          courses: { AiD: [6.2, 7.2] },
          passe: ['DC', 'AiD', 0.3],
          def: { D1: [7.2, 3.2] },
        },
        {
          texte: "L'ailier droit passe aussitôt à l'arrière gauche, qui attaque à pleine vitesse l'ouverture au centre.",
          courses: { ArG: [-2.4, 7.6] },
          passe: ['AiD', 'ArG', 0.15],
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },
  );
})();
