/* Lot 4a: entrées d'arrières et du demi-centre, passages au pivot, percussions. */
(() => {
  const DRAGOR = n => `http://www.dragoerhb.dk/fransk/f${n}.html`;
  const PLAYLIST = {
    titre: 'Playlist YouTube "Combinaisons Handball" (animations extraites de dragoerhb.dk)',
    url: 'https://www.youtube.com/playlist?list=PLTwEUYgwcdpoK3ttmLx0AFdzsI3cCtYDD',
  };

  /* ---------- Fixation arrière puis rentrée (f711) ---------- */
  const FIXATION_RENTREE_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche.",
      courses: { AiG: [-8.6, 2.2] },
      passe: ['AiG', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche fixe son défenseur, le 2 gauche, qui sort sur lui.",
      courses: { ArG: [-4.8, 8.0] },
      def: { G2: [-4.9, 6.2] },
    },
    {
      texte: "L'arrière gauche part à l'opposé, en diagonale vers le centre. Le demi-centre croise derrière lui et reçoit le ballon au croisement. Le 3 gauche suit l'arrière.",
      courses: {
        ArG: [-0.8, 8.4],
        DC: { vers: [-3.4, 8.6], via: [-1.2, 10.2] },
      },
      passe: ['ArG', 'DC', 0.55],
      def: { G3: [-1.6, 7.2], D3: [1.6, 6.9] },
    },
  ];

  /* ---------- Changement de direction et retour (f707) ---------- */
  const CHANGEMENT_DIRECTION_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche.",
      courses: { AiG: [-8.6, 2.0] },
      passe: ['AiG', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche passe au demi-centre et s'engage vers l'intérieur.",
      courses: { ArG: [-4.2, 8.6], DC: [-0.6, 10.0] },
      passe: ['ArG', 'DC', 0.1],
    },
    {
      texte: "Le demi-centre lui rend le ballon. L'arrière gauche fixe à l'intérieur du 2 gauche.",
      courses: { ArG: [-3.8, 7.8] },
      passe: ['DC', 'ArG', 0.2],
      def: { G2: [-4.1, 6.3], G3: [-2.3, 7.0] },
    },
    {
      texte: "L'arrière gauche repique vers l'extérieur et attaque l'intervalle entre le 1 et le 2 gauches. Le 2 gauche glisse avec lui.",
      courses: { ArG: { vers: [-5.9, 7.2], via: [-4.6, 8.0] } },
      def: { G2: [-4.9, 6.0], G3: [-1.9, 6.8] },
    },
  ];

  /* ---------- Entrée avec feinte de passe (f1166) ---------- */
  const FEINTE_PASSE_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre, qui fixe directement le 3 droit.",
      courses: { DC: [1.0, 8.6] },
      passe: ['ArG', 'DC', 0.1],
      def: { D3: [1.4, 7.4] },
    },
    {
      texte: "Le demi-centre donne à l'arrière droit. L'arrière gauche fait son entrée: il traverse dans le dos du demi-centre, vers le 2 droit.",
      courses: {
        ArG: { vers: [3.4, 7.6], via: [0.2, 10.9] },
        ArD: [4.8, 9.0],
      },
      passe: ['DC', 'ArD', 0.2],
      def: { D2: [4.6, 5.8] },
    },
  ];

  /* ---------- Entrée du DC à l'aile (f701) ---------- */
  const DC_AILE_BASE = [
    {
      texte: "Le demi-centre donne à l'arrière droit, qui attaque l'intervalle dans son couloir. Le demi-centre part vers la droite.",
      courses: { ArD: [4.6, 8.2], DC: [2.8, 9.9] },
      passe: ['DC', 'ArD', 0.1],
      def: { D2: [4.8, 6.3] },
    },
    {
      texte: "L'ailier droit s'engage vers l'intérieur et fait mine de demander le ballon. Le demi-centre court jusqu'à l'aile droite.",
      courses: {
        AiD: [7.0, 4.6],
        DC: { vers: [8.9, 2.6], via: [7.6, 9.6] },
      },
      def: { D1: [6.6, 3.4] },
    },
  ];

  /* ---------- Croisé / entrée / entrée du pivot (f269) ---------- */
  const CROISE_ENTREE_BASE = [
    {
      texte: "Le demi-centre entre vers la gauche, entre le 1 et le 2 gauches. L'ailier gauche lui donne le ballon.",
      courses: { DC: { vers: [-6.4, 6.8], via: [-3.6, 9.4] } },
      passe: ['AiG', 'DC', 0.6],
      def: { G2: [-5.4, 5.8], G1: [-7.2, 3.2] },
    },
    {
      texte: "Croisé: l'arrière gauche coupe vers l'intérieur dans le dos du demi-centre et reçoit. Le pivot bloque le 3 gauche.",
      courses: {
        ArG: { vers: [-3.8, 8.0], via: [-5.2, 9.0] },
        DC: [-6.8, 6.4],
        Piv: { vers: [-2.5, 6.6], ecran: true },
      },
      passe: ['DC', 'ArG', 0.4],
      def: { G3: [-1.6, 6.9] },
    },
  ];
  const CROISE_ENTREE_SUITE = [
    ...CROISE_ENTREE_BASE,
    {
      texte: "Le 2 gauche ferme l'intervalle: l'arrière gauche donne à l'arrière droit, qui arrive vers l'intérieur.",
      courses: { ArD: { vers: [1.4, 8.6], via: [3.8, 9.6] } },
      passe: ['ArG', 'ArD', 0.5],
      def: { G2: [-4.4, 6.6], G3: [-1.5, 7.3] },
    },
  ];

  /* ---------- Croisés arrière-arrière avec entrée en 2e pivot (handloisir) ---------- */
  const CROISES_AR_AR_BASE = [
    {
      texte: "Le demi-centre donne à l'arrière gauche, qui prend le ballon en course vers le 2 droit. L'arrière droit part en même temps vers le 2 gauche. Le demi-centre recule pour laisser passer.",
      courses: { ArG: [-0.6, 8.6], ArD: [1.2, 9.6], DC: [-0.8, 11.4] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "Au croisement, l'arrière gauche passe à l'arrière droit, qui croise dans son dos.",
      courses: { ArG: [2.2, 7.8], ArD: { vers: [-2.4, 9.4], via: [-0.2, 9.9] } },
      passe: ['ArG', 'ArD', 0.45],
      def: { D3: [1.9, 6.9], G3: [-1.9, 7.0] },
    },
  ];

  /* ---------- Stoßen-Rückstoßen (handballtraining.de) ---------- */
  const STOSSEN_BASE = [
    {
      texte: "L'ailier gauche passe sans pression à l'arrière gauche et se replace aussitôt dans le coin. Le pivot est au contact du 3 gauche.",
      courses: { AiG: [-9.4, 0.6] },
      passe: ['AiG', 'ArG', 0],
    },
    {
      texte: "L'arrière gauche attaque vers le centre et entraîne le 2 gauche vers le milieu. Le pivot bloque le 3 gauche pour qu'il ne puisse pas aider.",
      courses: { ArG: [-3.4, 8.4], Piv: { vers: [-2.5, 6.6], ecran: true } },
      def: { G2: [-3.8, 6.4] },
    },
    {
      texte: "L'arrière gauche passe au demi-centre. Le pivot pose un bref écran côté ballon sur le 2 gauche.",
      courses: { ArG: [-4.4, 9.0], Piv: { vers: [-3.0, 7.2], ecran: true } },
      passe: ['ArG', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre feinte une passe vers la droite, l'arrière droit simule par sa course: toute la défense glisse. Le 2 gauche veut contourner l'écran côté ballon; le pivot pose alors un nouvel écran sur lui, du côté opposé.",
      courses: { DC: [0.6, 9.8], ArD: [3.6, 8.8], Piv: { vers: [-4.2, 6.3], via: [-4.0, 7.4], ecran: true } },
      def: { G2: [-3.2, 6.6], G3: [-1.2, 6.8], D3: [2.2, 6.8], D2: [5.2, 5.6], G1: [-7.0, 2.6] },
    },
    {
      texte: "Contre-percussion: l'arrière gauche revient latéralement pour attaquer l'intervalle 1-2; le demi-centre lui renvoie le ballon.",
      courses: { ArG: [-5.6, 8.0] },
      passe: ['DC', 'ArG', 0.3],
    },
  ];

  /* ---------- Übergang RM: Einsinken (handballhaus) ---------- */
  const EINSINKEN_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière gauche et se laisse \"couler\" au pivot, au centre. Le pivot de départ se décale vers le 2 gauche.",
      courses: { DC: [0.4, 6.8], Piv: { vers: [-3.4, 6.4], via: [-1.7, 7.6] } },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche rentre vers le centre; le 3 gauche sort sur lui. Le pivot prend l'avantage de position sur le 2 gauche.",
      courses: { ArG: [-2.0, 8.6], Piv: [-3.8, 6.2] },
      def: { G3: [-1.6, 7.4], G2: [-4.6, 5.6] },
    },
  ];

  /* ---------- Feinte de départ SKI (f1506) ---------- */
  const SKI_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre, qui s'engage entre le 3 et le 2 droits et embarque le 3 droit.",
      courses: { DC: [2.6, 8.4] },
      passe: ['ArG', 'DC', 0.1],
      def: { D3: [2.2, 7.3], G3: [-1.4, 7.0] },
    },
    {
      texte: "Le demi-centre repart à gauche jusque devant le 2 gauche, où il pose un bloc; juste avant, il passe à l'arrière gauche. Le pivot bloque le 3 gauche: la \"porte\" est ouverte entre les deux blocs.",
      courses: {
        DC: { vers: [-4.1, 6.6], via: [-1.0, 9.6], ecran: true },
        ArG: [-4.8, 9.0],
        Piv: { vers: [-2.5, 6.6], ecran: true },
      },
      passe: ['DC', 'ArG', 0.5],
      def: { G2: [-4.8, 5.8], G3: [-1.6, 7.0], D3: [1.6, 6.8] },
    },
  ];

  /* ---------- Tip coréen (f1512) ---------- */
  const TIP_COREEN_BASE = [
    {
      texte: "L'ailier gauche, dans le coin, a le ballon. L'arrière gauche attaque entre le 2 et le 3 gauches, comme s'il voulait recevoir de l'ailier. Le 2 gauche le suit.",
      courses: { ArG: [-3.0, 7.4] },
      def: { G2: [-3.9, 6.3], G3: [-1.9, 7.0], G1: [-7.0, 3.2] },
    },
  ];


  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'fixation-arriere-puis-rentree',
      nom: 'Fixation arrière puis rentrée',
      alias: 'Back forfinte og overgangsløb (DA), Backcourt initial feint and running in (EN)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière fixe son défenseur puis repart en diagonale vers le centre; le demi-centre croise derrière lui. Cinq fins possibles.",
      description: [
        "Fiche du club danois Dragør HK (Werner Fog-Hansen), traduite en français. L'ailier gauche passe à l'arrière gauche, qui fixe son défenseur puis \"part à l'opposé en diagonale\". Le demi-centre croise derrière lui et reçoit le ballon.",
        "La fiche danoise compte cinq schémas (A à E): tir du demi-centre, tir de l'arrière gauche sur sa rentrée, tir de l'arrière droit à l'opposé, tir du pivot, et ballon rendu à l'arrière gauche \"qui vient d'être aspiré dans la défense\". Le texte est commun aux cinq schémas: l'ordre des lettres et le détail de chaque fin (placements, réactions des défenseurs) sont déduits ici.",
        "La source précise que l'ailier gauche peut rentrer à la place de l'arrière gauche.",
      ],
      objectif: "Faire bouger toute la défense centrale par une diagonale de l'arrière, puis exploiter le côté qu'elle délaisse.",
      pointsCles: [
        "L'arrière fixe vraiment son défenseur avant de partir en diagonale.",
        "Le demi-centre croise derrière l'arrière, lancé, et reçoit en passe latérale.",
        "Le demi-centre lit la défense: tir, retour à l'arrière, renversement ou pivot.",
        "Alternance possible: l'ailier gauche fait la rentrée à la place de l'arrière.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Fixation Arrière puis rentrée A à E (Dragør HK, trad. française)',
          url: DRAGOR(711),
          note: "\"ALG passe à ARG qui fixe son arrière puis part à l'opposé en diagonal. DC croise derrière ARG. Plusieurs situations peuvent être exploitées.\" Fins A à E sur les pages f711a à f711d.",
        },
        {
          ...PLAYLIST,
          note: 'Vidéo "Fixation arrière puis entrée 5 alternatives".',
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: 'A - Tir du demi-centre',
          etapes: [
            ...FIXATION_RENTREE_BASE,
            {
              texte: "Le 3 gauche est parti avec l'arrière: le demi-centre attaque l'intervalle entre le 2 et le 3 gauches et tire.",
              courses: { DC: [-3.0, 7.3] },
              tir: { par: 'DC', t: 0.5 },
              def: { G2: [-4.4, 6.0] },
            },
          ],
        },
        {
          nom: "B - Tir de l'arrière sur sa rentrée",
          etapes: [
            ...FIXATION_RENTREE_BASE,
            {
              texte: "Le 3 gauche revient sur le demi-centre. L'arrière gauche poursuit sa rentrée entre les deux 3 et reçoit en retour.",
              courses: { ArG: [0.2, 7.2] },
              passe: ['DC', 'ArG', 0.35],
              def: { G3: [-2.4, 7.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "C - Tir de l'arrière droit",
          etapes: [
            ...FIXATION_RENTREE_BASE,
            {
              texte: "La défense se resserre au centre. Le demi-centre renverse le jeu sur l'arrière droit, à l'opposé.",
              courses: { ArD: [4.2, 8.8] },
              passe: ['DC', 'ArD', 0.2],
              def: { D3: [0.9, 7.0], D2: [4.4, 5.8] },
            },
            { texte: "L'arrière droit tire de loin.", tir: 'ArD' },
          ],
        },
        {
          nom: 'D - Passe au pivot',
          etapes: [
            ...FIXATION_RENTREE_BASE,
            {
              texte: "Le pivot se démarque dans l'espace laissé entre le 2 et le 3 gauches. Le demi-centre le sert.",
              courses: { Piv: [-2.8, 6.4], DC: [-3.6, 8.2] },
              passe: ['DC', 'Piv', 0.45],
              def: { G2: [-4.5, 6.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "E - Retour à l'arrière aspiré",
          etapes: [
            ...FIXATION_RENTREE_BASE,
            {
              texte: "L'arrière gauche s'est enfoncé dans la défense, entre les deux 3. Le pivot s'écarte entre le 3 et le 2 droits. Le demi-centre redonne le ballon à l'arrière.",
              courses: { ArG: [-0.4, 6.8], Piv: [2.7, 6.4] },
              passe: ['DC', 'ArG', 0.45],
            },
            {
              texte: "Le 3 droit monte sur l'arrière gauche: celui-ci sert le pivot dans son dos. Il peut aussi tirer, ou renverser sur l'arrière droit.",
              passe: ['ArG', 'Piv', 0.5],
              def: { D3: [0.4, 7.7] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'induction-dc-et-rentree',
      nom: 'Induction du demi-centre et rentrée',
      alias: 'Midt forfinte og overgangsløb (DA), Center initial feint and running in (EN)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Le demi-centre fait croire au jeu à droite, repart à gauche et croise avec l'arrière gauche, qui passe entre lui et le bloc du pivot.",
      description: [
        "Fiche de Dragør HK. Le ballon va de l'ailier droit à l'arrière droit puis au demi-centre, qui part en \"induction\" sur la droite de la défense: il fait croire que le jeu va se dérouler de ce côté.",
        "À la réception, le demi-centre repart en sens inverse et fixe sur la gauche de la défense pour engager le 2 et le 3 gauches. L'arrière gauche croise avec lui. Le pivot se déplace et bloque un défenseur central; l'arrière gauche prend l'intervalle entre le demi-centre et le pivot, et tire.",
        "La fiche dit que le pivot bloque \"3G\". Dans la notation des traductions françaises de Dragør, c'est le central qui fait face à la droite de l'attaque: le 3 droit. C'est ce qui est montré ici; la notation des défenseurs n'est pas toujours cohérente sur ce site.",
      ],
      objectif: "Déplacer la défense vers la droite pour mieux l'attaquer à gauche, puis libérer l'arrière gauche au centre.",
      pointsCles: [
        "L'induction doit être crédible: le demi-centre attaque vraiment la droite de la défense.",
        "Au changement de sens, le demi-centre fixe le 2 et le 3 gauches en même temps.",
        "Le bloc du pivot se pose au moment du croisement.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Induction DC et rentrée (Dragør HK, trad. française)',
          url: DRAGOR(709),
          note: "\"ARG croise avec DC. PVT se déplace et fait un bloc sur 3G. ARG prend l'intervalle entre DC et PVT et va tirer.\"",
        },
        {
          ...PLAYLIST,
          note: 'Vidéo "Induction et entrée du Demi Centre".',
        },
      ],
      ballon: 'AiD',
      etapes: [
        {
          texte: "L'ailier droit passe à l'arrière droit.",
          courses: { AiD: [8.6, 2.2] },
          passe: ['AiD', 'ArD', 0.1],
        },
        {
          texte: "Le demi-centre part en induction vers la droite de la défense. L'arrière droit lui donne le ballon dans sa course.",
          courses: { DC: [2.4, 9.4] },
          passe: ['ArD', 'DC', 0.5],
          def: { D3: [2.0, 7.2] },
        },
        {
          texte: "À la réception, le demi-centre repart en sens inverse et fixe à gauche, entre le 2 et le 3 gauches, qui sortent tous les deux.",
          courses: { DC: [-3.2, 8.2] },
          def: { G3: [-2.5, 7.3], G2: [-4.4, 6.2], D3: [1.6, 6.8] },
        },
        {
          texte: "L'arrière gauche croise derrière le demi-centre et reçoit. Le pivot vient bloquer le 3 droit sur son côté intérieur.",
          courses: {
            ArG: { vers: [-1.0, 8.6], via: [-3.4, 9.9] },
            DC: [-3.6, 7.8],
            Piv: { vers: [0.7, 6.5], ecran: true },
          },
          passe: ['DC', 'ArG', 0.55],
        },
        {
          texte: "L'arrière gauche prend l'intervalle entre le demi-centre et le pivot, et tire.",
          courses: { ArG: [-1.0, 7.5] },
          tir: { par: 'ArG', t: 0.45 },
          def: { G3: [-2.1, 7.2] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'changement-direction-et-retour',
      nom: 'Changement de direction et retour',
      alias: 'Retningsskifte og retur (DA), Change of direction and return (EN)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière gauche fixe à l'intérieur du 2, puis repique vers l'extérieur dans l'intervalle 1-2; si le 1 sort, l'ailier est libre.",
      description: [
        "Fiche de Dragør HK. Après la passe de l'ailier gauche, l'arrière gauche joue un échange avec le demi-centre: il passe, s'engage et reçoit à nouveau. Il fixe alors à l'intérieur du 2 gauche.",
        "Puis il repique vers l'extérieur et essaie de prendre l'intervalle entre le 1 et le 2 gauches. Si le 1 gauche le bloque, l'arrière passe à l'ailier gauche, qui passe à l'extérieur du 1 et tire (choisis une fin au-dessus du schéma).",
      ],
      objectif: "Attirer le 2 vers l'intérieur pour attaquer l'intervalle 1-2, et lire le défenseur 1.",
      pointsCles: [
        "La fixation intérieure doit être menaçante pour que le 2 s'engage.",
        "Le changement de direction est brusque.",
        "L'ailier reste écarté et prêt: c'est le 1 gauche qui décide de la fin.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Changement de direction et retour (Dragør HK, trad. française)',
          url: DRAGOR(707),
          note: "\"Puis ARG repique vers l'extérieur et essaye de prendre l'intervalle entre 1D et 2D.\" Si 1D le bloque, passe à ALG qui passe à l'extérieur et tire.",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière dans l'intervalle 1-2",
          etapes: [
            ...CHANGEMENT_DIRECTION_BASE,
            {
              texte: "Le 1 gauche reste sur l'ailier: l'arrière gauche passe entre le 1 et le 2 et tire.",
              courses: { ArG: [-6.2, 6.4] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G1: [-7.6, 2.8] },
            },
          ],
        },
        {
          nom: "2 - Passe à l'ailier",
          etapes: [
            ...CHANGEMENT_DIRECTION_BASE,
            {
              texte: "Le 1 gauche sort bloquer l'arrière: celui-ci donne à l'ailier gauche.",
              passe: ['ArG', 'AiG', 0.6],
              def: { G1: [-5.6, 5.6], G2: [-4.4, 6.2] },
            },
            {
              texte: "L'ailier passe à l'extérieur du 1 et tire.",
              courses: { AiG: [-8.6, 3.0] },
              tir: { par: 'AiG', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-feinte-de-passe',
      nom: 'Entrée avec feinte de passe',
      alias: 'Overgang forom med snydeaflevering (DA)',
      categorie: 'Circulation',
      defense: '0-6',
      resume: "L'arrière gauche traverse vers le 2 droit; l'arrière droit feinte une passe au demi-centre pour emmener le 3, puis sert l'arrière gauche dans l'intervalle.",
      description: [
        "Fiche de Dragør HK, prévue contre une défense 0-6. L'arrière gauche passe au demi-centre, qui fixe directement le 3 droit. L'arrière gauche fait alors son entrée de l'autre côté, vers le 2 droit.",
        "L'arrière droit feinte une passe au demi-centre, qui recule en appelant le ballon et emmène le 3 droit. L'arrière gauche pénètre entre le 3 et le 2 droits, reçoit de l'arrière droit et tire.",
        "Alternative (deuxième schéma): si la défense ne mord pas à la feinte, l'arrière droit dribble et tire au centre, ou passe au demi-centre, ou à l'arrière gauche posté en bloc. La fiche ne dit pas si l'entrée passe devant ou derrière le demi-centre; elle est montrée ici dans son dos.",
      ],
      objectif: "Vider l'intervalle 3-2 par une feinte de passe pour y servir l'arrière entré.",
      pointsCles: [
        "Le demi-centre recule en appelant vraiment le ballon: c'est lui qui emmène le 3.",
        "La feinte de passe de l'arrière droit doit être crédible.",
        "Si le 3 ne suit pas, l'arrière droit joue lui-même: dribble et tir, ou passe au demi-centre ou à l'arrière gauche en bloc.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée avec feinte de passe (Dragør HK, trad. française)',
          url: DRAGOR(1166),
          note: "ARD feinte une passe au DC, qui recule en appelant la balle; ARG pénètre entre 3G et 2G, reçoit de ARD et tire. Contre 0-6.",
        },
        {
          titre: 'Entrée avec feinte de passe, alternative (Dragør HK)',
          url: DRAGOR('1166a'),
          note: 'Si la défense ne réagit pas: dribble et tir de ARD au centre, passe au DC ou à ARG posté en bloc.',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche entré",
          etapes: [
            ...FEINTE_PASSE_BASE,
            {
              texte: "L'arrière droit feinte une passe au demi-centre, qui recule en appelant le ballon. Le 3 droit le suit.",
              courses: { DC: [0.6, 9.8] },
              def: { D3: [1.1, 8.4] },
            },
            {
              texte: "L'arrière gauche pénètre entre le 3 et le 2 droits et reçoit de l'arrière droit.",
              courses: { ArG: [2.8, 6.6] },
              passe: ['ArD', 'ArG', 0.4],
              def: { D2: [4.4, 5.8] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - La défense ne mord pas: dribble de l'arrière droit",
          etapes: [
            ...FEINTE_PASSE_BASE,
            {
              texte: "L'arrière droit feinte la passe, mais le 3 droit ne suit pas le demi-centre. L'arrière gauche reste posté en bloc contre le 2 droit.",
              courses: { DC: [0.4, 9.8], ArG: [3.8, 6.6] },
              def: { D2: [4.6, 5.7] },
            },
            {
              texte: "L'arrière droit part en dribble vers le centre, le long du bloc, et tire. Il pouvait aussi servir le demi-centre ou l'arrière gauche.",
              courses: { ArD: [2.8, 8.4] },
              tir: { par: 'ArD', t: 0.6 },
              def: { D3: [1.8, 7.3] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'double-entree',
      nom: 'Double entrée',
      alias: 'Dobbelt overgang (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière gauche entre bloquer le 3 droit, puis l'ailier gauche traverse toute la défense et reçoit de l'arrière droit.",
      description: [
        "Fiche de Dragør HK. Le ballon va de l'arrière gauche à l'ailier gauche, puis au demi-centre. L'arrière gauche fait son entrée et bloque le 3 droit.",
        "Le demi-centre attaque le 2 droit pendant que l'ailier gauche \"s'échappe\" à son tour vers l'autre côté de la défense: c'est la seconde entrée. Le demi-centre donne à l'arrière droit, qui fixe à l'extérieur et remet à l'ailier gauche lancé.",
        "Le pivot ne joue pas de rôle dans la fiche; il est placé ici entre le 2 et le 3 gauches pour laisser la place aux entrées.",
      ],
      objectif: "Surcharger le côté droit de la défense par deux entrées successives venues de la gauche.",
      pointsCles: [
        "L'arrière gauche entre juste après sa passe et pose son bloc sur le 3 droit.",
        "L'ailier part au moment où le demi-centre attaque le 2 droit.",
        "L'arrière droit fixe à l'extérieur avant de remettre à l'ailier.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Double entrée (Dragør HK, trad. française)',
          url: DRAGOR(970),
          note: "ARG vers ALG vers DC; ARG fait son entrée et bloque 3G; DC attaque 2G; ALG s'échappe; DC vers ARD qui fixe à l'extérieur et remet à ALG en course.",
        },
        {
          ...PLAYLIST,
          note: "Vidéos \"Double entrée avec bloc pour tir à l'opposé\" et \"Double entrée puis retour en position Pivot pour tir\".",
        },
      ],
      depart: { Piv: [-2.6, 6.4] },
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche passe à l'ailier gauche.",
          courses: { AiG: [-8.4, 2.6] },
          passe: ['ArG', 'AiG', 0.1],
        },
        {
          texte: "L'ailier gauche donne au demi-centre. L'arrière gauche fait son entrée et va bloquer le 3 droit.",
          courses: { ArG: { vers: [0.8, 6.9], via: [-2.5, 8.8], ecran: true } },
          passe: ['AiG', 'DC', 0.2],
        },
        {
          texte: "Le demi-centre attaque le 2 droit. L'ailier gauche s'échappe et traverse vers la droite de la défense.",
          courses: {
            DC: [3.4, 8.6],
            AiG: { vers: [0.6, 8.8], via: [-5.0, 8.6] },
          },
          def: { D2: [4.4, 6.4] },
        },
        {
          texte: "Le demi-centre donne à l'arrière droit, qui fixe à l'extérieur du 2 droit. L'ailier gauche continue sa course.",
          courses: { DC: [2.4, 10.0], ArD: [6.4, 7.6], AiG: [3.0, 7.6] },
          passe: ['DC', 'ArD', 0.2],
          def: { D2: [5.6, 5.9], D1: [7.6, 2.8] },
        },
        {
          texte: "L'arrière droit remet à l'ailier gauche, lancé dans l'intervalle entre le 3 bloqué et le 2.",
          courses: { AiG: [3.4, 6.6] },
          passe: ['ArD', 'AiG', 0.3],
        },
        { texte: "L'ailier gauche tire.", tir: 'AiG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entrees-du-dc',
      nom: 'Entrées du demi-centre',
      alias: "Centerovergang (DA): après passe arrière-arrière (f859), à l'aile (f701), Back/Centerovergang (f42)",
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Le demi-centre passe puis entre dans la défense: à gauche pour recevoir de l'arrière gauche, ou jusqu'à l'aile droite.",
      description: [
        "Trois fiches de Dragør HK où le demi-centre fait une \"entrée\": après sa passe, il quitte son poste et va jouer dans la défense ou à l'aile (choisis une variante au-dessus du schéma).",
        "Variante 1 (après passe entre arrières): le demi-centre s'engage vers la droite, passe à l'arrière droit et va entre le 2 et le 3 gauches. L'arrière droit donne à l'arrière gauche, qui s'engage à l'extérieur et remet au demi-centre sur son retour vers l'intérieur.",
        "Variantes 2 et 3 (entrée à l'aile): l'arrière droit prend l'intervalle de son couloir, l'ailier droit s'engage et fait mine de demander le ballon, et le demi-centre, qui a couru jusqu'à l'aile droite, reçoit et tire. Si le 1 droit sort sur le demi-centre, l'ailier droit est démarqué.",
        "Variante 4 (texte court, déroulement interprété): l'arrière gauche et le demi-centre s'engagent, changent de direction; l'arrière passe au demi-centre qui attaque l'extérieur avec le bloc du pivot, puis renverse sur l'arrière gauche qui pénètre et tire.",
      ],
      objectif: "Faire disparaître le demi-centre de la base arrière pour le retrouver là où la défense ne l'attend pas.",
      pointsCles: [
        "Le demi-centre part juste après sa passe, sans ralentir.",
        "Sur l'entrée à l'aile, l'ailier droit doit vraiment appeler le ballon pour fixer le 1 droit.",
        "Le joueur qui donne au demi-centre l'a d'abord fixé: il attaque son intervalle avant de passer.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée du DC après un jeu de passe entre ARD et ARG (Dragør HK)',
          url: DRAGOR(859),
          note: "DC s'engage vers la droite, passe à ARD et va entre 2D et 3D; ARD vers ARG qui s'engage à l'extérieur et remet à DC sur son retour à l'intérieur.",
        },
        {
          titre: "Entrée du DC à l'aile (Dragør HK)",
          url: DRAGOR(701),
          note: "\"DC, qui a couru jusqu'à l'aile droite, reçoit de ARD et tire.\" Si le défenseur 1 bloque DC, ALD est démarqué.",
        },
        {
          titre: 'Entrée du demi-centre (Dragør HK)',
          url: DRAGOR(42),
          note: "ARG et DC s'engagent, changent de direction; ARG vers DC qui attaque l'extérieur; PVT bloque; DC renverse sur ARG qui pénètre et tire.",
        },
        {
          ...PLAYLIST,
          note: "Vidéos \"Entrée du DC à l'Aile\" et \"Entrée du DC après un jeu de passe entre ARD et ARG\".",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Après passe entre arrières',
          etapes: [
            {
              texte: "Le demi-centre s'engage vers la droite et donne à l'arrière droit.",
              courses: { DC: [1.8, 9.2] },
              passe: ['DC', 'ArD', 0.6],
              def: { D3: [1.9, 7.3] },
            },
            {
              texte: "Après sa passe, le demi-centre file vers la gauche, entre le 3 et le 2 gauches. L'arrière droit transmet à l'arrière gauche.",
              courses: { DC: { vers: [-3.2, 7.0], via: [-0.6, 8.8] } },
              passe: ['ArD', 'ArG', 0.3],
              def: { G3: [-1.9, 6.9], D3: [1.6, 6.8] },
            },
            {
              texte: "L'arrière gauche s'engage à l'extérieur, vers l'intervalle 1-2, et attire le 2 gauche.",
              courses: { ArG: [-6.0, 7.6] },
              def: { G2: [-5.6, 6.0] },
            },
            {
              texte: "Il remet au demi-centre, qui revient vers l'intérieur.",
              courses: { DC: [-2.6, 7.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { G3: [-1.4, 6.8] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "2 - À l'aile: tir du demi-centre",
          etapes: [
            ...DC_AILE_BASE,
            {
              texte: "Le 1 droit suit l'ailier: l'arrière droit donne au demi-centre, seul à l'aile.",
              passe: ['ArD', 'DC', 0.2],
            },
            { texte: "Le demi-centre tire depuis l'aile.", tir: 'DC' },
          ],
        },
        {
          nom: "3 - À l'aile: l'ailier démarqué",
          etapes: [
            ...DC_AILE_BASE,
            {
              texte: "Le 1 droit sort sur le demi-centre: l'ailier droit est démarqué. L'arrière droit le sert.",
              courses: { AiD: [6.4, 4.8] },
              passe: ['ArD', 'AiD', 0.4],
              def: { D1: [8.0, 3.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '4 - Changement de direction et renversement',
          etapes: [
            {
              texte: "Le ballon part à l'ailier gauche, qui monte pour le recevoir (la fiche ne décrit pas cette mise en place).",
              courses: { AiG: [-8.0, 3.4] },
              passe: ['DC', 'AiG', 0.2],
            },
            {
              texte: "L'ailier gauche passe à l'arrière gauche, qui s'engage vers l'intérieur. Le demi-centre s'engage aussi.",
              courses: { ArG: [-3.9, 8.4], DC: [-1.0, 9.0] },
              passe: ['AiG', 'ArG', 0.05],
              def: { G2: [-4.4, 6.0], G3: [-1.9, 7.0] },
            },
            {
              texte: "Les deux changent de direction: l'arrière gauche ressort vers l'extérieur, le demi-centre repart vers la droite. L'arrière gauche lui passe.",
              courses: { ArG: [-5.4, 8.8], DC: [1.6, 9.2] },
              passe: ['ArG', 'DC', 0.5],
            },
            {
              texte: "Le demi-centre attaque à l'extérieur du 3 droit, que le pivot bloque. La défense glisse vers lui.",
              courses: { DC: [2.8, 8.0], Piv: { vers: [1.0, 6.5], ecran: true } },
              def: { D3: [1.9, 7.0], D2: [4.2, 6.2], G3: [-1.0, 6.9], G2: [-4.0, 6.2] },
            },
            {
              texte: "Le demi-centre renverse sur l'arrière gauche, qui pénètre entre le 2 et le 3 gauches.",
              courses: { ArG: [-3.0, 7.2] },
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-4.4, 6.2] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'feinte-de-depart-ski',
      nom: 'Feinte de départ du demi-centre ("SKI-feinte")',
      alias: 'Midt forfinte, SKI-forfinten (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Le demi-centre embarque le 3 droit, repart à gauche et pose un bloc sur le 2 gauche; l'arrière gauche passe par la \"porte\" entre ce bloc et celui du pivot.",
      description: [
        "Combinaison envoyée à Dragør HK par Ole Helgedalsrud, du club norvégien de Ski (d'où le nom). Le demi-centre reçoit et s'engage entre le 3 et le 2 droits en embarquant le 3 droit.",
        "Il repart ensuite vers la gauche, devant le 2 gauche, où il pose un bloc; avant de bloquer, il passe à l'arrière gauche. L'arrière gauche prend la \"porte\" ouverte par les blocs du demi-centre et du pivot, et tire.",
        "Lecture du 2 gauche: s'il contourne le bloc, l'arrière gauche tire en suspension à l'extérieur; s'il monte sur l'arrière, celui-ci sert le demi-centre ou le pivot (choisis une fin au-dessus du schéma). La fiche ne dit pas qui donne le premier ballon au demi-centre, ni où se place le pivot: ici, l'arrière gauche et un pivot placé entre le 2 et le 3 gauches.",
      ],
      objectif: "Ouvrir une \"porte\" entre deux blocs pour l'arrière gauche, en déplaçant d'abord la défense vers la droite.",
      pointsCles: [
        "Le demi-centre engage vraiment l'intervalle 3-2 droit pour embarquer le 3.",
        "La passe à l'arrière part juste avant que le bloc soit posé.",
        "L'arrière lit le 2 gauche: porte, tir extérieur, ou passe au bloqueur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Feinte de départ DC (SKI-feinte de départ) (Dragør HK, trad. française)',
          url: DRAGOR(1506),
          note: "DC s'engage entre 3G et 2G, repart à gauche et pose un bloc devant 2D; ARG prend la \"porte\" ouverte par les blocs du DC et du PVT. Si 2D contourne le bloc: tir extérieur; s'il monte: DC ou PVT.",
        },
      ],
      depart: { Piv: [-2.6, 6.5] },
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - L'arrière passe par la porte",
          etapes: [
            ...SKI_BASE,
            {
              texte: "L'arrière gauche prend la porte entre le bloc du demi-centre et celui du pivot, et tire.",
              courses: { ArG: [-3.3, 7.8] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G3: [-2.0, 7.3] },
            },
          ],
        },
        {
          nom: '2 - Le 2 contourne: tir extérieur',
          etapes: [
            ...SKI_BASE,
            {
              texte: "Le 2 gauche contourne le bloc par l'avant pour fermer la porte. L'arrière gauche part vers l'extérieur.",
              courses: { ArG: [-6.3, 7.2] },
              def: { G2: { vers: [-3.6, 7.7], via: [-4.9, 7.4] } },
            },
            { texte: "L'arrière gauche tire en suspension à l'extérieur.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Le 2 monte: passe au demi-centre',
          etapes: [
            ...SKI_BASE,
            {
              texte: "Le 2 gauche quitte le bloc et monte sur l'arrière gauche. Le demi-centre, libéré, se retourne vers le but et reçoit. L'arrière pouvait aussi servir le pivot.",
              courses: { DC: [-3.9, 6.1] },
              passe: ['ArG', 'DC', 0.5],
              def: { G2: { vers: [-5.0, 7.9], via: [-5.6, 6.8] } },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-arriere-continuite',
      nom: "Entrée d'arrière dans la continuité",
      alias: 'Backovergang fortsat (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière gauche attaque l'extérieur, rompt vers l'intérieur, passe au demi-centre et continue son entrée pour recevoir en retour.",
      description: [
        "Fiche de Dragør HK. L'arrière gauche attaque l'intervalle extérieur, rompt vers l'intérieur et passe au demi-centre, qui s'engage vers la droite.",
        "Quand le demi-centre reçoit et s'engage à l'extérieur, le pivot bloque un défenseur central. Le demi-centre rend aussitôt le ballon à l'arrière gauche, qui a continué son entrée.",
        "La fiche donne le premier ballon à l'ailier droit, sans doute une coquille: c'est l'ailier gauche qui lance ici. Le pivot bloque \"3G\", c'est-à-dire le 3 droit dans la notation de ces traductions.",
      ],
      objectif: "Enchaîner fixation extérieure, passe et entrée pour servir l'arrière lancé au centre.",
      pointsCles: [
        "L'arrière ne s'arrête pas après sa passe: il continue son entrée.",
        "Le bloc du pivot se pose quand le demi-centre reçoit.",
        "Le demi-centre rend le ballon tout de suite, sans dribble.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'arrière dans la continuité (Dragør HK, trad. française)",
          url: DRAGOR(429),
          note: "ARG attaque l'intervalle externe, rompt à l'intérieur et passe à DC; PVT bloque 3G quand DC reçoit et s'engage à l'extérieur; DC rend aussitôt à ARG qui a continué son entrée.",
        },
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche, qui attaque l'intervalle extérieur, entre le 1 et le 2 gauches.",
          courses: { AiG: [-8.6, 2.2], ArG: [-6.2, 7.8] },
          passe: ['AiG', 'ArG', 0.05],
          def: { G2: [-5.8, 6.0], G1: [-7.4, 2.8] },
        },
        {
          texte: "L'arrière gauche rompt vers l'intérieur et passe au demi-centre, qui s'engage vers la droite.",
          courses: { ArG: [-4.2, 8.2], DC: [2.2, 9.0] },
          passe: ['ArG', 'DC', 0.5],
          def: { G2: [-5.0, 5.6] },
        },
        {
          texte: "Le demi-centre s'engage à l'extérieur du 3 droit. Le pivot bloque le 3 droit. L'arrière gauche poursuit son entrée vers le centre.",
          courses: {
            DC: [3.0, 8.2],
            Piv: { vers: [1.0, 6.6], ecran: true },
            ArG: [-1.2, 8.4],
          },
          def: { D3: [2.0, 7.0], D2: [4.6, 6.0] },
        },
        {
          texte: "Le demi-centre rend aussitôt le ballon à l'arrière gauche, qui attaque l'intervalle central.",
          courses: { ArG: [-0.4, 7.4] },
          passe: ['DC', 'ArG', 0.15],
          def: { G3: [-1.3, 6.9] },
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'tip-coreen',
      nom: 'Tip coréen',
      alias: 'Koreansk vip (DA), Korean tip (EN)',
      categorie: 'Combinaisons à nom de pays',
      defense: 'Toutes',
      resume: "L'arrière gauche fait croire qu'il veut recevoir de l'ailier et emmène le 2; le demi-centre passe dans son dos et reçoit de l'ailier, au sol ou en l'air.",
      description: [
        "Fiche de Dragør HK. L'ailier gauche va vers le coin. L'arrière gauche attaque entre le 3 et le 2 gauches en faisant comme s'il voulait recevoir de l'ailier: il attire le 2 gauche. Le demi-centre court derrière lui et reçoit de l'ailier.",
        "Fin: tir en suspension près de la zone, ou passe au-dessus de la zone (\"kung-fu\"). La fiche ne dit pas qui s'envole sur le kung-fu; il est montré ici sur le demi-centre. Si le 2 gauche ne tombe pas dans le piège, l'ailier peut servir l'arrière gauche (choisis une variante au-dessus du schéma).",
        "Une autre fiche de Dragør, \"Mix Allemagne / Corée\", appelle \"partie coréenne\" le moment où le demi-centre, après une passe, s'arrête et repart dans l'autre sens pour contourner la défense.",
      ],
      objectif: "Libérer le demi-centre près de la zone, côté aile, grâce au leurre de l'arrière.",
      pointsCles: [
        "L'ailier se place bien dans le coin pour ouvrir l'angle de passe.",
        "L'arrière doit vraiment demander le ballon pour emmener le 2.",
        "Le demi-centre arrive lancé, juste dans le dos de l'arrière.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Tip coréen (Dragør HK, trad. française)',
          url: DRAGOR(1512),
          note: "ARG attaque entre 3D et 2D en faisant comme s'il voulait recevoir de l'ailier; DC court derrière ARG et reçoit de ALG; tir en suspension ou passe au-dessus de la zone (kung-fu).",
        },
        {
          titre: 'Mix Allemagne / Corée (Dragør HK)',
          url: DRAGOR(1132),
          note: "\"La partie de la combinaison \"coréenne\" est faite par DC, qui - après avoir fait la passe à ALG - s'arrête et repart vers la droite.\"",
        },
      ],
      depart: { AiG: [-9.4, 0.6] },
      ballon: 'AiG',
      variantes: [
        {
          nom: '1 - Tir en suspension du demi-centre',
          etapes: [
            ...TIP_COREEN_BASE,
            {
              texte: "Le demi-centre court dans le dos de l'arrière gauche et reçoit de l'ailier.",
              courses: { DC: { vers: [-4.9, 7.6], via: [-2.6, 9.8] } },
              passe: ['AiG', 'DC', 0.6],
            },
            {
              texte: "Le 2 gauche est pris par l'arrière: le demi-centre s'élève près de la zone et tire en suspension.",
              courses: { DC: [-5.1, 7.0] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Kung-fu au-dessus de la zone',
          etapes: [
            ...TIP_COREEN_BASE,
            {
              texte: "Le demi-centre court dans le dos de l'arrière gauche et s'envole au-dessus de la zone. L'ailier lui lobe le ballon.",
              courses: { DC: { vers: [-5.0, 4.6], via: [-5.6, 9.4] } },
              passe: ['AiG', 'DC', 0.55],
              enLAir: ['DC'],
            },
            {
              texte: "Le demi-centre tire en l'air, avant de retomber dans la zone.",
              tir: { par: 'DC', t: 0 },
              enLAir: ['DC'],
            },
          ],
        },
        {
          nom: "3 - Le 2 ne mord pas: passe à l'arrière",
          etapes: [
            ...TIP_COREEN_BASE,
            {
              texte: "Le demi-centre court dans le dos de l'arrière gauche, mais le 2 gauche le suit au lieu de rester sur l'arrière. L'ailier sert l'arrière gauche, qui s'est rapproché de la zone.",
              courses: { DC: { vers: [-4.9, 7.6], via: [-2.6, 9.8] }, ArG: [-2.8, 6.6] },
              passe: ['AiG', 'ArG', 0.6],
              def: { G2: [-4.6, 6.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'passe-et-croise-arrieres',
      nom: 'Passe et croisé entre arrières latéraux',
      alias: 'Dobbelt backovergang (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Après un une-deux avec son ailier, l'arrière droit traverse toute la largeur vers la gauche et croise avec l'arrière gauche, qui tire au centre.",
      description: [
        "Fiche de Dragør HK. L'arrière gauche attaque, passe à l'arrière droit et se replace. L'arrière droit joue un \"passe et va\" avec l'ailier droit, puis fixe à l'extérieur du 2 droit.",
        "Il fait ensuite une grande course vers l'intérieur, en direction du 2 gauche. L'arrière gauche s'engage vers l'intérieur et croise avec lui, reçoit et tire. Pendant ce temps, le demi-centre compense à droite pour fixer le 3 droit.",
      ],
      objectif: "Déplacer la défense d'un côté à l'autre, puis la prendre à contre-pied par un croisé entre les deux arrières.",
      pointsCles: [
        "Le demi-centre compense tôt à droite pour occuper le 3 droit.",
        "La grande course de l'arrière droit doit menacer le but pour attirer les centraux.",
        "L'arrière gauche arrive lancé et croise dans le dos de l'arrière droit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Passe et croisé entre arrières latéraux (Dragør HK, trad. française)',
          url: DRAGOR(742),
          note: "ARD-ALD passe et va; ARD fixe externe sur \"le 2 droit\" puis fait une grande course interne vers \"le 2 gauche\"; ARG s'engage interne et croise avec ARD, reçoit et tire; DC compense à droite.",
        },
      ],
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche attaque, puis passe à l'arrière droit par-dessus le demi-centre.",
          courses: { ArG: [-4.6, 8.6] },
          passe: ['ArG', 'ArD', 0.6],
          def: { G2: [-4.8, 6.2] },
        },
        {
          texte: "L'arrière gauche se replace. L'arrière droit avance et donne à l'ailier droit.",
          courses: { ArG: [-5.8, 9.8], ArD: [5.4, 8.8], AiD: [8.6, 2.4] },
          passe: ['ArD', 'AiD', 0.3],
          def: { G2: [-5.0, 5.2] },
        },
        {
          texte: "L'ailier droit rend le ballon (passe et va). L'arrière droit fixe à l'extérieur du 2 droit. Le demi-centre se décale à droite.",
          courses: { ArD: [6.2, 7.6], DC: [2.4, 10.2] },
          passe: ['AiD', 'ArD', 0.3],
          def: { D2: [5.6, 6.0], D1: [7.6, 2.8] },
        },
        {
          texte: "L'arrière droit fait une grande course vers l'intérieur, vers le 2 gauche. Le demi-centre fixe le 3 droit.",
          courses: {
            ArD: { vers: [-2.6, 8.4], via: [2.0, 8.4] },
            DC: [2.6, 8.6],
          },
          def: { D3: [2.0, 7.2], D2: [5.0, 5.4], G3: [-2.2, 7.2], G2: [-4.4, 6.0] },
        },
        {
          texte: "L'arrière gauche s'engage vers l'intérieur et croise dans le dos de l'arrière droit, qui lui donne le ballon.",
          courses: {
            ArG: { vers: [-0.6, 8.6], via: [-3.4, 10.2] },
            ArD: [-3.4, 7.8],
          },
          passe: ['ArD', 'ArG', 0.55],
        },
        {
          texte: "L'arrière gauche prend l'intervalle entre les deux 3 et tire.",
          courses: { ArG: [-0.2, 7.6] },
          tir: { par: 'ArG', t: 0.45 },
          def: { D3: [1.5, 7.0] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-entree-entree-pivot',
      nom: 'Croisé, entrée et entrée du pivot',
      alias: 'Kryds/Overgang/Stregovergang (DA)',
      categorie: 'Circulation',
      defense: '0-6',
      resume: "Le demi-centre entre à gauche, croise avec l'arrière gauche qui tire près du bloc du pivot; sinon l'arrière droit arrive au centre avec quatre solutions.",
      description: [
        "Fiche de Dragør HK, prévue contre une 0-6. L'ailier gauche donne au demi-centre, qui entre entre le 1 et le 2 gauches. Le demi-centre donne à l'arrière gauche en croisé; l'arrière tire entre le 2 gauche et le bloc du pivot.",
        "Sinon, l'arrière gauche passe à l'arrière droit, qui arrive vers l'intérieur. L'arrière droit a alors quatre solutions, une par schéma: passe au pivot en course, tir, passe à l'ailier droit, ou croisé avec l'ailier droit (choisis une variante au-dessus du schéma).",
        "Le texte est court: les placements de chaque fin sont déduits des solutions citées. Le pivot part ici entre le 2 et le 3 gauches.",
      ],
      objectif: "Charger le côté gauche par l'entrée du demi-centre, puis finir au centre ou à droite selon la défense.",
      pointsCles: [
        "Le demi-centre entre franchement entre le 1 et le 2 pour les fixer tous les deux.",
        "L'arrière gauche croise lancé, près du demi-centre.",
        "L'arrière droit arrive vers l'intérieur au moment où l'arrière gauche est bloqué.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé/entrée/entrée du pivot (Dragør HK, trad. française)',
          url: DRAGOR(269),
          note: "ALG vers DC entrant entre 1D et 2D; DC vers ARG en croisé, qui tire entre 2D et le bloc du PVT; sinon passe à ARD qui arrive à l'intérieur. Schémas a à d: PVT en course, tir, ALD, croisé avec ALD.",
        },
      ],
      depart: { Piv: [-3.2, 6.4] },
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...CROISE_ENTREE_BASE,
            {
              texte: "L'arrière gauche tire entre le 2 gauche et le bloc du pivot.",
              courses: { ArG: [-3.7, 7.2] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G2: [-4.8, 6.0] },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot en course',
          etapes: [
            ...CROISE_ENTREE_SUITE,
            {
              texte: "Le pivot quitte son bloc et file entre les deux 3. Le 3 droit sort sur l'arrière droit, qui sert le pivot en course.",
              courses: { Piv: { vers: [0.4, 6.3], via: [-1.4, 6.1] } },
              passe: ['ArD', 'Piv', 0.6],
              def: { D3: [1.6, 7.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Tir de l'arrière droit",
          etapes: [
            ...CROISE_ENTREE_SUITE,
            {
              texte: "Le 3 droit hésite: l'arrière droit prend l'intervalle central et tire.",
              courses: { ArD: [0.6, 7.8] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "4 - Passe à l'ailier droit",
          etapes: [
            ...CROISE_ENTREE_SUITE,
            {
              texte: "L'arrière droit attaque entre le 3 et le 2 droits. Le 2 puis le 1 droits viennent fermer: il donne à l'ailier droit.",
              courses: { ArD: [3.2, 7.8], AiD: [8.8, 1.8] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D3: [2.2, 7.0], D2: [4.0, 6.4], D1: [6.0, 4.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "5 - Croisé avec l'ailier droit",
          etapes: [
            ...CROISE_ENTREE_SUITE,
            {
              texte: "L'arrière droit attaque vers l'extérieur. L'ailier droit coupe vers l'intérieur, croise dans son dos et reçoit.",
              courses: {
                ArD: [4.6, 7.8],
                AiD: { vers: [2.6, 8.8], via: [7.6, 9.4] },
              },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [4.8, 6.2] },
            },
            {
              texte: "L'ailier droit attaque l'intervalle entre le 3 et le 2 droits et tire.",
              courses: { AiD: [2.4, 7.8] },
              tir: { par: 'AiD', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-arriere-et-dc',
      nom: 'Entrée arrière et demi-centre',
      alias: 'Backindløb/Centerovergang (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière droit fixe le 2 droit vers l'intérieur et donne à l'ailier; le demi-centre court dans son dos et reçoit de l'ailier.",
      description: [
        "Fiche de Dragør HK. L'arrière droit s'engage vers l'intérieur avec le ballon pour fixer le 2 droit, puis passe à l'ailier droit.",
        "Le demi-centre court derrière l'arrière droit, reçoit de l'ailier droit et tire.",
      ],
      objectif: "Libérer le demi-centre dans l'intervalle 1-2 droit, ouvert par la fixation de l'arrière.",
      pointsCles: [
        "L'arrière fixe vraiment le 2 vers l'intérieur avant de passer.",
        "Le demi-centre part dans le dos de l'arrière au moment de la passe à l'ailier.",
        "L'ailier rend le ballon tout de suite, sans attendre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée arrière et demi-centre (Dragør HK, trad. française)',
          url: DRAGOR(327),
          note: "ARD s'engage à l'intérieur avec la balle pour fixer 2G et passe à ALD; DC court derrière ARD, reçoit de ALD et tire.",
        },
      ],
      ballon: 'ArD',
      etapes: [
        {
          texte: "L'arrière droit s'engage vers l'intérieur avec le ballon et fixe le 2 droit.",
          courses: { ArD: [3.8, 8.0] },
          def: { D2: [4.2, 6.3], D3: [2.2, 7.0] },
        },
        {
          texte: "Il passe à l'ailier droit. Le demi-centre court dans son dos, vers l'extérieur.",
          courses: {
            AiD: [8.4, 2.8],
            DC: { vers: [5.4, 7.8], via: [3.4, 9.8] },
          },
          passe: ['ArD', 'AiD', 0.3],
          def: { D1: [7.2, 3.2] },
        },
        {
          texte: "L'ailier droit donne au demi-centre, lancé dans l'intervalle entre le 2 et le 1 droits.",
          courses: { DC: [5.6, 7.0] },
          passe: ['AiD', 'DC', 0.2],
          def: { D2: [4.6, 6.0] },
        },
        { texte: 'Le demi-centre tire.', tir: 'DC' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'combinaison-sur-croise',
      nom: "Combinaison sur croisé (rentrée de l'arrière)",
      alias: 'Krydskombination (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière droit attaque, rend au demi-centre puis traverse jusqu'à gauche, entre le 2 gauche et le bloc du pivot; l'arrière gauche le sert.",
      description: [
        "Fiche de Dragør HK. Le demi-centre donne à l'arrière droit, qui attaque l'intervalle entre le 2 et le 3 droits, puis lui rend le ballon.",
        "Le demi-centre donne à l'arrière gauche, qui fixe entre le 2 et le 1 gauches. Pendant ce temps, l'arrière droit fait une rentrée: il traverse jusqu'à l'espace entre le 2 gauche et le pivot, qui bloque le 3 gauche. Il reçoit de l'arrière gauche et tire.",
        "La fiche écrit \"ALG\" pour le joueur qui reçoit du demi-centre; c'est très probablement l'arrière gauche. Le croisé du titre est ici celui de l'arrière droit, qui passe devant le demi-centre en se décalant. Le pivot part ici entre le 2 et le 3 gauches et bloque le 3 par l'extérieur.",
      ],
      objectif: "Faire traverser l'arrière opposé pour l'amener dans un intervalle libéré par une fixation et un bloc.",
      pointsCles: [
        "L'arrière droit attaque vraiment avant de rendre, pour fixer la droite de la défense.",
        "L'arrière gauche fixe entre le 2 et le 1 pour écarter le 2.",
        "Le bloc du pivot sur le 3 gauche se pose quand l'arrière droit arrive.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Combinaison sur croisé (Dragør HK, trad. française)',
          url: DRAGOR(878),
          note: "DC vers ARD qui attaque l'intervalle 2G-3G puis rend à DC; DC vers \"ALG\" qui fixe entre 2D et 1D; ARD fait une rentrée entre 2D et le PVT qui bloque 3D, reçoit et tire.",
        },
      ],
      depart: { Piv: [-3.0, 6.4] },
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre donne à l'arrière droit, qui attaque l'intervalle entre le 3 et le 2 droits.",
          courses: { ArD: [3.4, 8.0] },
          passe: ['DC', 'ArD', 0.1],
          def: { D3: [2.4, 7.0], D2: [4.4, 6.2] },
        },
        {
          texte: "L'arrière droit rend le ballon au demi-centre.",
          courses: { DC: [0.4, 9.8] },
          passe: ['ArD', 'DC', 0.3],
          def: { D3: [1.7, 6.7], D2: [5.0, 5.2] },
        },
        {
          texte: "Le demi-centre donne à l'arrière gauche, qui fixe entre le 2 et le 1 gauches, puis se décale à droite. L'arrière droit part en rentrée vers la gauche. Le pivot bloque le 3 gauche.",
          courses: {
            ArG: [-6.2, 7.6],
            DC: [2.6, 10.2],
            ArD: { vers: [-1.6, 8.0], via: [1.0, 8.6] },
            Piv: { vers: [-2.6, 6.6], ecran: true },
          },
          passe: ['DC', 'ArG', 0.2],
          def: { G2: [-5.4, 5.9], G1: [-7.4, 2.6], G3: [-1.7, 7.0] },
        },
        {
          texte: "L'arrière droit poursuit sa rentrée entre le 2 gauche et le bloc du pivot, et reçoit de l'arrière gauche.",
          courses: { ArD: [-3.9, 7.4] },
          passe: ['ArG', 'ArD', 0.3],
        },
        { texte: "L'arrière droit tire.", tir: 'ArD' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-dc-croise-pivot',
      nom: 'Entrée du demi-centre et croisé du pivot sorti',
      alias: 'Entrée et croisé (f1114)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Le demi-centre entre à droite, l'arrière droit croise à plat, le pivot sort croiser avec lui; le ballon revient à l'arrière gauche, qui sert l'ailier droit arrivé dans son dos.",
      description: [
        "Fiche de Dragør HK (\"Entrée et croisé\"). L'arrière gauche donne au demi-centre, qui entre vers la droite en direction du 2 droit. L'arrière droit \"croise à plat\" derrière lui et reçoit.",
        "Le pivot sort et croise avec l'arrière droit, reçoit et passe à l'arrière gauche, lancé vers le centre. L'ailier droit, qui a traversé dans le dos de l'arrière gauche, reçoit juste avant le croisement et tire de l'axe.",
        "Le texte ne dit pas ce que font le demi-centre et l'arrière droit après leurs passes: ici, l'arrière droit s'enfonce vers les 6 m et le pivot se replace à droite, pour dégager l'axe.",
      ],
      objectif: "Enchaîner trois croisements pour amener l'ailier opposé, lancé, au tir dans l'axe.",
      pointsCles: [
        "Le croisé de l'arrière droit se fait à plat, sans monter vers le but.",
        "Le pivot sort franchement aux 9 m pour croiser.",
        "L'ailier droit arrive lancé dans le dos de l'arrière gauche et reçoit avant le croisement.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée et croisé (Dragør HK, trad. française)',
          url: DRAGOR(1114),
          note: "\"ARG passe à DC entrant vers la droite en direction de l'arrière de défense\"; ARD \"croise à plat\"; PVT sort et croise avec ARD; ALD court derrière ARG: \"Juste avant le croisé il reçoit la balle et tire.\"",
        },
      ],
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche passe au demi-centre, qui entre vers la droite, en direction du 2 droit.",
          courses: { DC: [3.6, 8.4] },
          passe: ['ArG', 'DC', 0.1],
          def: { D2: [4.4, 6.4], D3: [2.4, 7.2] },
        },
        {
          texte: "L'arrière droit croise à plat derrière le demi-centre et reçoit.",
          courses: {
            ArD: { vers: [1.4, 9.4], via: [4.2, 10.2] },
            DC: [4.2, 7.6],
          },
          passe: ['DC', 'ArD', 0.5],
          def: { D2: [4.6, 6.3], D3: [1.8, 7.2] },
        },
        {
          texte: "Le pivot sort et croise avec l'arrière droit, qui lui donne le ballon. L'ailier droit commence sa course vers l'intérieur.",
          courses: {
            ArD: [-1.0, 8.6],
            Piv: { vers: [1.0, 9.8], via: [1.6, 8.0] },
            AiD: [7.6, 4.6],
          },
          passe: ['ArD', 'Piv', 0.6],
        },
        {
          texte: "Le pivot donne à l'arrière gauche, lancé vers le centre, puis se replace à droite. L'arrière droit s'enfonce vers les 6 m, côté gauche. L'ailier droit traverse vers l'axe.",
          courses: {
            ArG: [-2.0, 8.6],
            ArD: [-2.6, 7.0],
            Piv: [3.4, 10.4],
            AiD: { vers: [2.6, 9.8], via: [6.0, 9.8] },
          },
          passe: ['Piv', 'ArG', 0.4],
        },
        {
          texte: "Juste avant le croisement, l'arrière gauche donne à l'ailier droit, qui arrive dans son dos.",
          courses: { ArG: [-1.0, 8.4], AiD: [0.6, 9.2] },
          passe: ['ArG', 'AiD', 0.5],
        },
        {
          texte: "L'ailier droit tire dans l'axe.",
          courses: { AiD: [0.6, 8.3] },
          tir: { par: 'AiD', t: 0.5 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entrees-arrieres-deux-tirs',
      nom: "Entrées d'arrières avec deux tirs",
      alias: 'Entrée et double tir',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Formes d'exercice à deux ballons: les joueurs entrent après leur passe et tirent chacun à leur tour.",
      description: [
        "Deux formes d'exercice de Dragør HK, jouées avec deux ballons: chaque forme donne deux tirs. Le schéma ne peut suivre qu'un ballon; l'autre tir est décrit dans le texte de l'étape.",
        "Variante 1 (\"Entrées d'arrières avec deux tirs\"): l'arrière gauche passe au demi-centre et rentre; devant le demi-centre, il reçoit le second ballon de l'arrière droit et tire. L'arrière droit a commencé son entrée avant de passer; après sa passe, il reçoit le premier ballon du demi-centre et tire. Le schéma suit ce premier ballon.",
        "Variante 2 (\"Entrée et double tir\"): l'ailier passe au pivot et part en course; juste avant le centre, il reçoit de l'arrière et tire. Après sa passe, l'arrière s'engage, reçoit du pivot et tire. Le schéma suit le ballon de l'arrière; le côté (ici la gauche) n'est pas précisé.",
      ],
      objectif: "Automatiser l'entrée juste après la passe et la réception lancée près de la défense.",
      pointsCles: [
        "Entrer tout de suite après sa passe, dans le rythme.",
        "Recevoir lancé, en mouvement vers le but.",
        "Les deux tirs s'enchaînent: le second joueur part avant le premier tir.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Entrées d'arrières avec deux tirs (Dragør HK, trad. française)",
          url: DRAGOR(388),
          note: '"ARG passe au joueur central et rentre. Devant ce joueur central, il reçoit de ARD et tire. ARD a commencé son entrée avant de passer; après sa passe à ARG il reçoit du joueur central et tire."',
        },
        {
          titre: 'Entrée et double tir (Dragør HK, trad. française)',
          url: DRAGOR(387),
          note: "\"L'ailier passe à PVT et part en course. Juste avant le centre il reçoit de l'arrière et tire. Après sa passe l'arrière s'engage et reçoit de PVT pour tirer.\"",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Entrées des deux arrières',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre et rentre vers l'intérieur. L'arrière droit, avec le second ballon, commence son entrée.",
              courses: { ArG: [-2.4, 8.2], ArD: [3.6, 9.0] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Devant le demi-centre, l'arrière gauche reçoit le second ballon de l'arrière droit et tire. L'arrière droit continue son entrée.",
              courses: { ArG: [-1.2, 7.6], ArD: [2.0, 8.4] },
              def: { G3: [-1.6, 6.9] },
            },
            {
              texte: "Après sa passe, l'arrière droit reçoit le premier ballon du demi-centre.",
              courses: { ArD: [1.4, 8.0] },
              passe: ['DC', 'ArD', 0.2],
              def: { D3: [1.6, 7.0] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "2 - Entrée de l'ailier et de l'arrière",
          etapes: [
            {
              texte: "L'ailier gauche passe le premier ballon au pivot et part en course vers le centre.",
              courses: { AiG: { vers: [-4.6, 8.0], via: [-8.0, 6.6] } },
            },
            {
              texte: "Juste avant le centre, l'ailier reçoit le second ballon de l'arrière gauche.",
              courses: { AiG: [-2.2, 8.4] },
              passe: ['ArG', 'AiG', 0.3],
            },
            {
              texte: "L'ailier tire. Après sa passe, l'arrière s'engage à son tour et reçoit le premier ballon du pivot pour tirer.",
              courses: { AiG: [-2.0, 7.7], ArG: [-3.8, 8.2] },
              tir: { par: 'AiG', t: 0.4 },
              def: { G3: [-1.4, 6.9] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-dc-deuxieme-pivot',
      nom: 'Entrée du demi-centre en 2e pivot',
      alias: 'Rentrée du DC en 2e pivot, "mouvement programmé" (FFHB)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6, 1-5 ou étagée selon la variante',
      resume: "Le demi-centre donne à un arrière puis rentre aux 6 m comme second pivot; l'équipe joue un temps à deux pivots.",
      description: [
        "Enclenchement très courant: après sa passe à un arrière latéral, le demi-centre (ou la demi-centre) rentre aux 6 m et devient 2e pivot. Les sources françaises (FFHB) et danoises en donnent plusieurs formes (choisis une variante au-dessus du schéma). Le pivot de départ est placé ici entre le 2 et le 3 gauches; une variante le déplace.",
        "Variante 1 (É. Baradat, équipe de France féminine, contre 1-5): la demi-centre fait une course intérieure pour excentrer la n°3 haute, joue \"en superposition\" avec l'arrière latérale (\"différent d'un croisé afin de ne pas prendre de risque sur la passe\") et rentre en pivot. Il reste un 2 contre 1 sur petit espace autour de la n°3 basse et du pivot. Le texte source est en partie illisible: les courses sont un schéma de principe.",
        "Variantes 2 et 3 (séance de Raphaëlle Tervel, FFHB 2018): la demi-centre donne à une arrière latérale et entre en 2e pivot à l'opposé. Pivot de départ en 2-3: l'arrière latérale prend l'initiative d'un jeu autour du pivot. Pivot en 1-2: c'est l'ailière. La suite de ce jeu n'est pas détaillée.",
        "Variante 4 (SportEasy): le demi-centre passe au pivot, puis se replace en 2e pivot du côté opposé; le pivot sert l'arrière. Les cinq fins de la fiche sont listées dans les points clés; le schéma montre le tir direct.",
        "Variante 5 (P. Carrara, France-RD Congo 2015, contre défense étagée): la demi-centre attire l'avancée, passe à l'arrière latérale et rentre sur le pivot, qui glisse. L'avancée ne suit pas, les deux pivots occupent les 3: il reste un 2 contre 1 à droite. Variante 6 (Dragør HK, forme d'exercice): le demi-centre entre et passe en même temps, puis attend que le ballon arrive à l'ailier pour poser un écran ou jouer librement; la fiche ne décrit pas de tir.",
      ],
      objectif: "Passer d'une attaque à un pivot (3 arrières) à une attaque à deux pivots pour occuper les défenseurs centraux.",
      pointsCles: [
        "Le demi-centre rentre juste après sa passe, sans attendre.",
        "Les deux pivots se placent dans des intervalles différents pour fixer les deux 3.",
        "Fins de la fiche SportEasy: tir direct de l'arrière; tir à l'extérieur, entre le 1 et le 2, s'il y a décalage; passe au 1er pivot démarqué; tir à l'intérieur si le pivot fait écran sur le 3; passe au 2e pivot pour renverser.",
        "Contre défense étagée (Carrara): la passe vers l'arrière opposé ne doit pas partir trop tôt (risque d'interception).",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'É. Baradat, "Déstabiliser la défense", Approches du Handball n°130 (2012)',
          url: 'https://www.calameo.com/ffhandball/read/007275111a6b69f9263d0?page=41',
          note: "\"Elle joue en \"superposition\" (différent d'un croisé afin de ne pas prendre de risque sur la passe) avec l'arrière latérale et rentre en pivot.\"",
        },
        {
          titre: 'R. Tervel, "Le jeu à deux pivots", Approches du Handball n°204 (2024)',
          url: 'https://www.centre-handball.com/wp-content/uploads/2024/11/Approches_n204_OCTOBRE-2024.pdf',
          note: "\"la demi-centre donne le ballon à une arrière latérale et propose une entrée en deuxième pivot à l'opposé\"; jeu autour du pivot par l'arrière (pivot en 2-3) ou l'ailière (pivot en 1-2).",
        },
        {
          titre: "Fiche d'entraînement: rentrée d'un 2e pivot (SportEasy)",
          url: 'https://www.sporteasy.net/fr/blog/fiches-seances-entrainement/exercices-handball/fiche-dentrainement-handball-rentree-2eme-pivot/',
          note: 'Le DC passe au pivot puis se replace en 2e pivot du côté opposé; cinq fins.',
        },
        {
          titre: 'P. Carrara, "Attaquer une défense étagée", Approches du Handball n°151 (2016)',
          url: 'https://www.calameo.com/ffhandball/read/007275111735cfdd874e5?page=21',
          note: "\"mettre en mouvement la base arrière tout en y intégrant une rentrée de la demi-centre et un appel du pivot\"; \"Cet enclenchement est utilisé par bon nombre d'équipes\".",
        },
        {
          titre: 'Entrée du DC (Dragør HK, exercice f77)',
          url: DRAGOR(77),
          note: "\"Le DC doit entrer et faire sa passe dans le même temps. Le joueur entré doit attendre que la balle arrive dans les mains de l'ailier pour ensuite poser un écran ou jouer librement derrière les arrières.\"",
        },
      ],
      depart: { Piv: [-3.2, 6.4] },
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Superposition contre 1-5 (Baradat)',
          etapes: [
            {
              texte: "Défense 1-5: le 3 droit joue haut. La demi-centre part en course intérieure vers la droite et excentre la n°3 haute.",
              courses: { DC: [2.4, 9.6] },
              def: { D3: [2.0, 8.6], G3: [-0.8, 6.6], D2: [4.2, 5.6] },
            },
            {
              texte: "Superposition: l'arrière droit vient dans le dos de la demi-centre, qui lui remet le ballon sans croiser.",
              courses: { ArD: [3.2, 10.6] },
              passe: ['DC', 'ArD', 0.5],
            },
            {
              texte: "La demi-centre rentre en 2e pivot, entre le 3 et le 2 droits. L'arrière droit joue avec l'arrière opposé: il lui passe.",
              courses: { DC: [3.0, 6.5], ArG: [-3.6, 9.0] },
              passe: ['ArD', 'ArG', 0.5],
            },
            {
              texte: "L'arrière gauche attaque la n°3 basse: 2 contre 1 sur petit espace avec le pivot. La n°3 sort sur lui; il sert le pivot.",
              courses: { ArG: [-2.2, 8.2] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-1.3, 7.3], G2: [-4.6, 5.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Pivot en 2-3: jeu de l'arrière (Tervel)",
          etapes: [
            {
              texte: "La demi-centre donne le ballon à l'arrière gauche et entre en 2e pivot à l'opposé, entre le 3 et le 2 droits.",
              courses: { DC: { vers: [3.0, 6.5], via: [1.8, 8.8] } },
              passe: ['DC', 'ArG', 0.15],
              def: { D3: [1.9, 7.0], D2: [4.6, 5.6] },
            },
            {
              texte: "Le pivot de départ est entre le 2 et le 3 gauches: l'arrière gauche prend l'initiative d'un jeu autour de lui. Elle attaque l'intervalle 2-3 et le 3 gauche sort.",
              courses: { ArG: [-3.6, 8.2] },
              def: { G3: [-2.4, 7.4], G2: [-4.6, 5.8] },
            },
            {
              texte: "L'arrière gauche sert le pivot, dans le dos du 3 sorti.",
              passe: ['ArG', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Pivot en 1-2: jeu de l'ailière (Tervel)",
          etapes: [
            {
              texte: "Le pivot de départ se place entre le 1 et le 2 gauches. La demi-centre donne à l'arrière gauche et entre en 2e pivot à l'opposé.",
              courses: {
                Piv: { vers: [-6.4, 4.6], via: [-5.0, 6.6] },
                DC: { vers: [3.0, 6.5], via: [1.8, 8.8] },
              },
              passe: ['DC', 'ArG', 0.15],
              def: { D3: [1.9, 7.0], D2: [4.6, 5.6] },
            },
            {
              texte: "Avec le pivot en 1-2, c'est l'ailière gauche qui joue autour de lui. L'arrière gauche lui donne le ballon.",
              courses: { AiG: [-8.4, 3.0] },
              passe: ['ArG', 'AiG', 0.3],
            },
            {
              texte: "L'ailière attaque l'intervalle entre le 1 et le pivot. Le 1 gauche sort sur elle: elle sert le pivot.",
              courses: { AiG: [-8.0, 4.2] },
              passe: ['AiG', 'Piv', 0.55],
              def: { G1: [-7.6, 3.0] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Après passe au pivot (SportEasy)',
          etapes: [
            {
              texte: "Le demi-centre passe au pivot, qui fait un appel vers le ballon.",
              courses: { Piv: [-2.6, 7.8] },
              passe: ['DC', 'Piv', 0.5],
            },
            {
              texte: "Après sa passe, le demi-centre se replace en 2e pivot, du côté opposé. L'arrière gauche fait un appel; le pivot lui passe et se replace.",
              courses: {
                DC: { vers: [3.0, 6.5], via: [1.4, 8.8] },
                ArG: [-4.4, 8.8],
                Piv: [-3.2, 6.4],
              },
              passe: ['Piv', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche tire directement (première fin de la fiche).",
              courses: { ArG: [-4.0, 8.2] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: '5 - Contre défense étagée (Carrara)',
          etapes: [
            {
              texte: "Défense étagée: le 3 droit joue en avancé. La demi-centre se décale un peu vers le pivot pour attirer l'avancée et ouvrir l'espace central.",
              courses: { DC: [-1.6, 10.0] },
              def: { D3: [-1.2, 8.8], G3: [-0.4, 6.6], D2: [4.2, 5.6] },
            },
            {
              texte: "Elle donne à l'arrière gauche puis rentre en 2e pivot, sur le pivot. Le pivot glisse pour attirer son défenseur.",
              courses: {
                DC: { vers: [-2.0, 6.6], via: [-2.8, 8.6] },
                Piv: [-4.0, 6.0],
              },
              passe: ['DC', 'ArG', 0.15],
            },
            {
              texte: "L'arrière gauche gagne son duel et occupe l'espace créé. L'avancée n'a pas suivi la rentrée; les deux pivots occupent la défense.",
              courses: { ArG: [-2.4, 8.4] },
              def: { D3: [-1.8, 9.6], G3: [-0.8, 7.0] },
            },
            {
              texte: "Il reste un 2 contre 1 à droite: l'arrière gauche donne à l'arrière droit.",
              courses: { ArD: [4.0, 8.2] },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit profite du retour du 2 droit pour arriver en position de tir et tire. Il pouvait aussi jouer avec son ailier.",
              courses: { ArD: [4.2, 7.0] },
              tir: { par: 'ArD', t: 0.6 },
              def: { D2: [5.2, 5.6] },
            },
          ],
        },
        {
          nom: '6 - Le demi-centre entre en passant (Dragør, exercice)',
          etapes: [
            {
              texte: "Le demi-centre entre vers la gauche et passe à l'arrière gauche dans le même temps.",
              courses: { DC: [-1.8, 8.0] },
              passe: ['DC', 'ArG', 0.4],
              def: { G3: [-1.6, 7.0] },
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche. Le demi-centre, entré, attend que le ballon arrive à l'ailier.",
              courses: { AiG: [-8.4, 2.8] },
              passe: ['ArG', 'AiG', 0.3],
            },
            {
              texte: "Ensuite, le demi-centre pose un écran sur le 2 gauche, ou joue librement derrière les arrières. L'arrière droit vient prendre la place de demi-centre. La fiche ne décrit pas de tir.",
              courses: { DC: { vers: [-4.3, 6.7], ecran: true }, ArD: [0.8, 10.2] },
              def: { G2: [-4.8, 5.6] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croises-ar-ar-2e-pivot',
      nom: 'Croisés arrière-arrière avec entrée en 2e pivot',
      alias: '"Croisés Arrière-Arrière" (handloisir, d\'après Dragør)',
      categorie: 'Jeu avec le pivot',
      defense: 'Toutes',
      resume: "Les deux arrières croisent au centre; le premier continue jusqu'en 2e pivot, le jeu passe par l'ailier et le demi-centre, et un ailier finit lancé.",
      description: [
        "Traduction française, sur un blog de club, d'une fiche de Dragør HK. Le demi-centre donne au premier arrière, qui prend le ballon en course vers le n°2 opposé; le second arrière démarre en même temps vers le n°2 de l'autre côté. Au croisement, le premier arrière passe au second et continue jusqu'en 2e pivot du côté opposé.",
        "Le second arrière passe à l'ailier sorti aux 9 m, qui renvoie tout de suite au demi-centre. Alternative 1: l'ailier part vers le pivot, le second arrière prend sa place à l'aile; le demi-centre donne au pivot, qui fait un bloc et donne à l'ailier lancé. Alternative 2: l'arrière entré bloque un défenseur; l'ailier opposé profite du bloc pour couper vers le centre et reçoit du demi-centre.",
        "Le blog ne précise ni le côté, ni le défenseur bloqué: ici, l'arrière gauche part le premier et bloque le 3 droit dans l'alternative 2.",
      ],
      objectif: "Charger un côté par l'entrée en 2e pivot d'un arrière, puis servir un ailier lancé.",
      pointsCles: [
        "Le second arrière démarre au moment où le premier part.",
        "L'ailier qui sort aux 9 m rend le ballon tout de suite au demi-centre.",
        "Le demi-centre s'engage légèrement du côté opposé à l'ailier qui arrive (alternative 1) ou du côté de l'ailier qui lui a passé (alternative 2).",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisés Arrière-Arrière (handloisir.blogspot.com, source dragoerhb.dk)',
          url: 'https://handloisir.blogspot.com/',
          note: "\"Au croisement, l'AR1 passe à l'AR2 et poursuit pour entrer en 2e pivot côté opposé\"; deux alternatives de fin (page \"Croisés Arrière-Arrière\", rubrique Techniques).",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Bloc du pivot, ailier gauche lancé',
          etapes: [
            ...CROISES_AR_AR_BASE,
            {
              texte: "L'arrière gauche continue et entre en 2e pivot, entre le 3 et le 2 droits. L'ailier gauche sort aux 9 m; l'arrière droit lui passe.",
              courses: { ArG: [3.2, 6.5], AiG: [-6.6, 7.8] },
              passe: ['ArD', 'AiG', 0.4],
              def: { G1: [-7.0, 4.4], G2: [-4.6, 5.8], D3: [1.8, 6.7] },
            },
            {
              texte: "L'ailier rend aussitôt au demi-centre, qui s'engage au centre, un peu vers la droite. L'ailier part vers le pivot; l'arrière droit prend sa place à l'aile.",
              courses: {
                DC: [0.8, 9.0],
                AiG: { vers: [-3.4, 7.8], via: [-5.6, 8.6] },
                ArD: { vers: [-8.8, 2.6], via: [-7.6, 8.4] },
              },
              passe: ['AiG', 'DC', 0.15],
            },
            {
              texte: "Le demi-centre donne au pivot, qui pose un bloc sur le 3 gauche. L'ailier gauche arrive en course.",
              courses: { Piv: { vers: [-0.8, 6.6], ecran: true }, AiG: [-2.8, 7.4] },
              passe: ['DC', 'Piv', 0.2],
            },
            {
              texte: "Le pivot donne à l'ailier gauche, lancé dans l'intervalle.",
              courses: { AiG: [-2.8, 7.0] },
              passe: ['Piv', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Bloc de l'arrière entré, ailier droit lancé",
          etapes: [
            ...CROISES_AR_AR_BASE,
            {
              texte: "L'arrière gauche entre en 2e pivot et bloque le 3 droit. L'ailier gauche sort aux 9 m; l'arrière droit lui passe.",
              courses: { ArG: { vers: [2.6, 6.6], ecran: true }, AiG: [-6.6, 7.8] },
              passe: ['ArD', 'AiG', 0.4],
              def: { G1: [-7.0, 4.4], D3: [1.7, 6.6] },
            },
            {
              texte: "L'ailier gauche rend au demi-centre, qui s'engage légèrement vers la gauche, du côté de l'ailier.",
              courses: { DC: [-0.8, 9.0] },
              passe: ['AiG', 'DC', 0.15],
            },
            {
              texte: "L'ailier droit coupe vers le centre en profitant du bloc de l'arrière gauche. Le demi-centre lui donne le ballon.",
              courses: { AiD: { vers: [3.6, 7.6], via: [7.0, 7.4] } },
              passe: ['DC', 'AiD', 0.6],
              def: { D1: [6.4, 4.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ubergang-rm',
      nom: 'Passage au pivot du demi-centre',
      alias: 'Übergang RM, Übergang Mitte, Übergang Mitte mit Nachlaufen, Einsinken, Doppelter Übergang (DE)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6, 5-1 ou défense offensive selon la variante',
      resume: "Le demi-centre passe le ballon puis devient 2e pivot: l'attaque passe de 3 arrières et 1 pivot à 2 arrières et 2 pivots.",
      description: [
        "En allemand, \"Übergang\" désigne le passage d'un arrière au poste de pivot: l'attaque passe d'un 3:3 à un 2:4. Pour le Badischer Handball-Verband, ces passages \"posent un problème à une défense offensive\". Un entraîneur les relève aussi en Bundesliga (Flensburg-Göppingen 2009), y compris sur engagement rapide. Les sources donnent plusieurs formes (choisis une variante au-dessus du schéma).",
        "Variante 1 (BHV): le demi-centre passe et devient 2e pivot; l'attaque ralentit, observe, puis réaccélère pour finir à 3 contre 3 d'un côté (ailier, arrière, pivot). Variante 2 (Unihandball, \"Übergang Mitte\"): le pivot bloque le central et le demi-centre, devenu pivot, traverse devant la défense pour recevoir de l'arrière droit. Variante 3 (\"mit Nachlaufen\", contre 5-1): le demi-centre entre en travers de la défense, aidé par l'écran frontal du pivot.",
        "Variante 4 (forum handballecke, \"Max88\"): le demi-centre part au pivot balle en main, sert l'arrière gauche puis \"suit\" et reçoit de l'arrière droit; son auteur note que la passe longue est souvent interceptée une fois le schéma connu. Variantes 5 et 6 (\"Einsinken\"): le demi-centre \"coule\" au pivot; le pivot de départ prend l'avantage de position sur le 2, ou le demi-centre reste libre si le 3 sort du bloc.",
        "Variante 7 (\"Doppelter Übergang\", contre une défense offensive qui ne recule pas): après un échange avec le demi-centre, l'arrière gauche passe à son tour au pivot et joue écran puis roulé avec l'arrière droit. Variante 8 (\"Nachstoßen von Außen\"): le demi-centre bloque le 2 gauche de face en passant pivot, et l'ailier gauche perce grâce à cet écran indirect. Les textes sont courts et les animations n'ont pas pu être vues: les placements sont reconstitués.",
      ],
      objectif: "Mettre un second pivot dans la défense pour créer des 3 contre 3 ou des 2 contre 1 sur un côté.",
      pointsCles: [
        "Le demi-centre part au pivot juste après sa passe.",
        "Après le passage, ralentir la circulation, observer la défense, puis réaccélérer (BHV).",
        "Un double passage se neutralise facilement si la défense recule en 0-6 (handballhaus).",
        "Le joueur qui passe pivot hors du champ de vision de l'avancé est plus difficile à suivre.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'P. Streicher, "Angriff gegen offensive Abwehr" (Badischer Handball-Verband, formation licence B)',
          url: 'https://www.badischer-hv.de/fileadmin/bhv/Bilder_und_Dokumente/Bildung/B_Ausbildung_21/Angriff_gegen_offensive_Abwehr_PDF.pdf',
          note: '"Übergänge von einem 3:3- in einem 2:4-Angriff stellen für eine offensive Abwehr eine Problemsituation dar"; "Übergang RM" (p. 33-38).',
        },
        {
          titre: 'Unihandball, Auftakt- und Auslösehandlungen (PDF)',
          url: 'https://silo.tips/download/unihandball-auftakt-auslsehandlungen-spielzge',
          note: "\"Übergang Mitte\": RM passe à RL et va au pivot; RR attaque l'intervalle #5/#6; le pivot bloque le central et RM traverse \"vor der Abwehr entlang\".",
        },
        {
          titre: 'handballhaus.de, rubrique "Übergang" (archive web 2010)',
          url: 'http://web.archive.org/web/2010*/http://www.handballhaus.de/handball/angriffstaktik/uebergang/*',
          note: 'Fiches "Übergang Mitte mit Nachlaufen", "Einsinken 1/2", "Doppelter Übergang" ("leicht durch Einsinken in die 6:0 zu egalisieren"), "Nachstoßen von Außen nach Übergang RM".',
        },
        {
          titre: 'Forum handballecke.de, fil "Sammlung von Spielzügen" (post #70, Max88; posts #86-88, Coach-DM)',
          url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
          note: 'RM "löst mit Ball als KL auf", sert RL, puis "läuft nach"; relevé "Übergang RM zum Kreis" en Bundesliga.',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - 3 contre 3 d'un côté (BHV)",
          etapes: [
            {
              texte: "Le demi-centre, qui vient de recevoir de l'arrière droit, passe à l'arrière gauche et devient 2e pivot à droite, entre le 3 et le 2 droits.",
              courses: { DC: { vers: [3.2, 6.5], via: [1.8, 8.8] } },
              passe: ['DC', 'ArG', 0.15],
              def: { D3: [1.9, 7.0], D2: [4.6, 5.6] },
            },
            {
              texte: "L'attaque ralentit, observe la défense, puis réaccélère: l'arrière gauche renverse sur l'arrière droit.",
              courses: { ArG: [-4.6, 9.2], ArD: [5.0, 9.0] },
              passe: ['ArG', 'ArD', 0.5],
            },
            {
              texte: "3 contre 3 à droite: l'arrière droit attaque entre le 3 et le 2 droits. Le 2 sort sur lui; il sert le demi-centre, pivot droit.",
              courses: { ArD: [4.4, 8.0] },
              passe: ['ArD', 'DC', 0.6],
              def: { D2: [4.8, 6.6] },
            },
            { texte: 'Le demi-centre tire du poste de pivot.', tir: 'DC' },
          ],
        },
        {
          nom: '2 - Le pivot bloque, le demi-centre traverse (Unihandball)',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche et va au pivot côté gauche, où il attend.",
              courses: { DC: { vers: [-3.2, 6.5], via: [-1.8, 8.8] } },
              passe: ['DC', 'ArG', 0.15],
            },
            {
              texte: "L'arrière gauche court vers le centre et passe à l'arrière droit.",
              courses: { ArG: [-1.2, 9.2] },
              passe: ['ArG', 'ArD', 0.6],
            },
            {
              texte: "L'arrière droit attaque l'intervalle entre le 2 et le 1 droits. Le pivot bloque le 3 droit; le demi-centre traverse de gauche à droite devant la défense.",
              courses: {
                ArD: [6.6, 7.2],
                Piv: { vers: [0.8, 6.5], ecran: true },
                DC: { vers: [3.4, 7.4], via: [0.0, 8.0] },
              },
              def: { D2: [5.6, 5.9], D1: [7.6, 3.0] },
            },
            {
              texte: "L'arrière droit donne au demi-centre qui arrive.",
              courses: { DC: [3.4, 6.9] },
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '3 - Entrée en travers contre 5-1 ("mit Nachlaufen")',
          etapes: [
            {
              texte: "Défense 5-1: le 3 droit joue en avancé. Après la circulation venue de la droite, le demi-centre passe à l'arrière gauche et devient 2e pivot.",
              courses: { DC: { vers: [-2.4, 6.6], via: [-1.4, 8.4] } },
              passe: ['DC', 'ArG', 0.15],
              def: { D3: [0.2, 9.0], G3: [-1.0, 6.8], G2: [-4.6, 5.3], D2: [4.6, 5.3] },
            },
            {
              texte: "L'arrière gauche fixe l'avancé et sert l'arrière droit.",
              courses: { ArG: [-2.6, 9.2], ArD: [4.8, 9.8] },
              passe: ['ArG', 'ArD', 0.6],
              def: { D3: [-1.8, 8.4] },
            },
            {
              texte: "L'arrière droit fait sortir le 2 droit.",
              courses: { ArD: [4.6, 8.2] },
              def: { D2: [4.8, 6.6] },
            },
            {
              texte: "Il donne au demi-centre, qui entre en travers de la défense, dans l'espace laissé par l'avancé. Le pivot pose un écran frontal sur le 3 gauche.",
              courses: {
                Piv: { vers: [-0.1, 6.5], ecran: true },
                DC: { vers: [2.0, 6.8], via: [-0.4, 8.0] },
              },
              passe: ['ArD', 'DC', 0.6],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '4 - Pivot balle en main puis suiveur ("Max88")',
          etapes: [
            {
              texte: "Le demi-centre part vers les 6 m balle en main, comme pour devenir pivot, puis sert l'arrière gauche.",
              courses: { DC: [-0.8, 8.0] },
              passe: ['DC', 'ArG', 0.7],
              def: { G3: [-1.4, 7.2] },
            },
            {
              texte: "L'arrière gauche passe à l'arrière droit. Le pivot pose un écran sur le 3 droit pour qu'il ne puisse pas sortir. Le demi-centre s'installe au pivot.",
              courses: { Piv: { vers: [1.0, 6.5], ecran: true }, DC: [-0.6, 6.8] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D3: [1.9, 6.7], G3: [-1.7, 6.7] },
            },
            {
              texte: "Le demi-centre \"suit\": il ressort vers la droite et reçoit de l'arrière droit.",
              courses: { DC: [1.2, 8.0] },
              passe: ['ArD', 'DC', 0.5],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '5 - Einsinken 1: passe au pivot de départ',
          etapes: [
            ...EINSINKEN_BASE,
            {
              texte: "L'arrière gauche sert le pivot, placé devant le 2 gauche.",
              passe: ['ArG', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '6 - Einsinken 2: le demi-centre libre',
          etapes: [
            ...EINSINKEN_BASE,
            {
              texte: "Le 3 gauche a quitté le bloc pour sortir sur l'arrière: le demi-centre, au centre, n'est plus pris. L'arrière lui donne.",
              passe: ['ArG', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '7 - Double passage ("Doppelter Übergang")',
          etapes: [
            {
              texte: "Le demi-centre sert l'arrière gauche en diagonale et glisse vers la droite.",
              courses: { ArG: [-3.6, 8.8], DC: [1.6, 10.0] },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche rend au demi-centre et passe pivot en diagonale, vers la droite.",
              courses: { ArG: { vers: [3.6, 6.6], via: [1.0, 8.4] } },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre sert l'arrière droit. L'arrière gauche, devenu pivot, pose un écran sur le 2 droit.",
              courses: { ArD: [5.0, 9.0], ArG: { vers: [4.2, 6.2], ecran: true } },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [4.9, 5.4] },
            },
            {
              texte: "L'arrière droit rentre en frôlant l'écran; le 3 droit change pour le prendre. L'arrière gauche se retourne vers le but et reçoit. L'arrière droit pouvait aussi servir l'ailier gauche qui rentre.",
              courses: { ArD: [3.0, 8.0], ArG: [3.4, 6.4] },
              passe: ['ArD', 'ArG', 0.6],
              def: { D3: [2.4, 7.2] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '8 - Percée retardée de l\'ailier ("Nachstoßen von Außen")',
          etapes: [
            {
              texte: "Le demi-centre passe à l'ailier gauche et, dans le même temps, passe pivot pour bloquer de face le 2 gauche.",
              courses: { AiG: [-8.2, 3.0], DC: { vers: [-4.4, 6.0], ecran: true } },
              passe: ['DC', 'AiG', 0.2],
            },
            {
              texte: "L'ailier passe à l'arrière gauche, qui glisse vers l'intérieur et fixe le 3 gauche. Le pivot fixe le 3 droit.",
              courses: { ArG: [-2.8, 8.6], Piv: [0.8, 6.5] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G3: [-2.2, 7.4] },
            },
            {
              texte: "L'arrière gauche rend à l'ailier, qui attaque à nouveau et perce entre le 1 et le 2, grâce à l'écran indirect du demi-centre.",
              courses: { AiG: [-6.0, 6.4] },
              passe: ['ArG', 'AiG', 0.3],
              def: { G1: [-7.0, 3.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ubergang-arriere',
      nom: "Passage au pivot d'un arrière latéral",
      alias: 'Übergang Halb, Übergang mit Ball aus der Halbposition, Scheinübergang (faux passage) (DE)',
      categorie: 'Jeu avec le pivot',
      defense: '5-1, 3-2-1 ou défense offensive',
      dispositif: '5-1',
      resume: "Un arrière latéral passe et file au pivot; avec le pivot de départ, il bloque pour libérer l'arrière opposé. Le faux passage exploite la défense qui l'a suivi.",
      description: [
        'Forme du passage au pivot ("Übergang") jouée par un arrière latéral, surtout contre les défenses avec avancé (choisis une variante au-dessus du schéma).',
        "Variante 1 (Unihandball, \"Übergang Halb\"): l'arrière gauche passe au demi-centre et court en diagonale au pivot. Le demi-centre passe à l'arrière droit et glisse au poste d'arrière gauche en entraînant l'avancé. L'arrière droit attaque l'intervalle \"libéré par les écrans\". Le texte est ambigu sur les bloqueurs: ici, l'arrière entré et le pivot.",
        "Variante 2 (handballtraining.de, contre 5-1 ou 3-2-1): l'arrière passe au demi-centre et court en travers de la défense; les deux pivots bloquent les 2 loin du centre et l'arrière opposé rentre vers le centre. La source part de la droite; elle est montrée ici en miroir, depuis la gauche. Fins: servir un pivot, tirer ou percer.",
        "Variante 3 (\"Scheinübergang\", faux passage, handballhaus): l'arrière gauche fait semblant de passer pivot à droite, mais c'est le pivot droit qui remonte au poste d'arrière droit; l'avantage pris à droite est exploité par des percussions. Schéma de principe.",
      ],
      objectif: "Passer à deux pivots pour bloquer les défenseurs loin du centre, ou feinter ce passage.",
      pointsCles: [
        "Le demi-centre ralentit si besoin avant de passer, le temps que l'arrière arrive au pivot.",
        "Les deux pivots bloquent les 2 vers l'extérieur pour ouvrir le centre.",
        "Après sa passe, le demi-centre compense au poste laissé libre pour pouvoir renverser.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Unihandball, Auftakt- und Auslösehandlungen (PDF)',
          url: 'https://silo.tips/download/unihandball-auftakt-auslsehandlungen-spielzge',
          note: "\"Übergang Halb\": RL passe à RM et court en diagonale au pivot; RM passe à RR et glisse en arrière gauche; RR attaque l'intervalle \"die vom RM und KM freigeblockt wird\".",
        },
        {
          titre: 'Übergang auf zwei Kreisläufer (handballtraining.de)',
          url: 'https://handballtraining.de/kreisspieler/uebergang-auf-zwei-kreislaeufer/1333',
          note: "RR passe à RM et court en travers de la défense; les deux pivots bloquent les demis loin du centre; RL rentre vers le centre; RM compense en RR.",
        },
        {
          titre: 'handballhaus.de, fiche "Scheinübergang" (archive web 2010)',
          url: 'http://web.archive.org/web/2010*/http://www.handballhaus.de/handball/angriffstaktik/uebergang/*',
          note: 'RL fait semblant de passer pivot droit; le pivot droit se replace en RR; avantage exploité par percussions.',
        },
        {
          titre: 'P. Streicher, "Angriff gegen offensive Abwehr" (Badischer Handball-Verband)',
          url: 'https://www.badischer-hv.de/fileadmin/bhv/Bilder_und_Dokumente/Bildung/B_Ausbildung_21/Angriff_gegen_offensive_Abwehr_PDF.pdf',
          note: '"Übergänge, Scheinübergänge": 5e concept contre défense offensive.',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Übergang Halb (Unihandball)',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre et court en diagonale au pivot, dans l'espace laissé par l'avancé.",
              courses: { ArG: { vers: [2.4, 6.5], via: [-1.6, 7.8] } },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit et glisse au poste d'arrière gauche. Il entraîne l'avancé.",
              courses: { DC: [-4.6, 9.4] },
              passe: ['DC', 'ArD', 0.2],
              def: { D3: [-3.2, 8.6] },
            },
            {
              texte: "L'arrière entré bloque le 2 droit, le pivot bloque le 3. L'arrière droit attaque l'intervalle libéré entre les deux écrans.",
              courses: {
                ArG: { vers: [3.8, 6.4], ecran: true },
                Piv: { vers: [0.1, 6.4], ecran: true },
                ArD: [2.0, 7.6],
              },
              def: { D2: [4.4, 5.6] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: '2 - Deux pivots qui bloquent les 2 (handballtraining)',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre et court en travers de la défense, vers l'intervalle entre le 2 droit et le central.",
              courses: { ArG: { vers: [3.6, 6.4], via: [-1.0, 7.8] } },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre ralentit, puis passe à l'arrière droit, qui attaque. Il compense ensuite au poste d'arrière gauche.",
              courses: { DC: [-4.6, 9.6], ArD: [4.6, 8.6] },
              passe: ['DC', 'ArD', 0.4],
            },
            {
              texte: "Les deux pivots bloquent les 2 loin du centre: l'arrière gauche sur le 2 droit, le pivot sur le 2 gauche. L'arrière droit rentre vers le centre et l'avancé sort sur lui.",
              courses: {
                ArG: { vers: [3.8, 6.2], ecran: true },
                Piv: { vers: [-3.6, 6.0], via: [-1.8, 7.6], ecran: true },
                ArD: [2.0, 8.0],
              },
              def: { D2: [4.6, 5.6], G2: [-4.6, 5.4], D3: [1.0, 8.8] },
            },
            {
              texte: "L'arrière droit sert l'arrière gauche, nouveau pivot, qui se retourne vers le but. Il pouvait aussi tirer, percer ou servir l'autre pivot.",
              courses: { ArG: [3.0, 6.3] },
              passe: ['ArD', 'ArG', 0.4],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Faux passage ("Scheinübergang")',
          etapes: [
            {
              texte: "Départ à deux pivots: l'arrière droit est passé pivot à droite. L'arrière gauche passe au demi-centre.",
              courses: { ArD: [3.0, 6.5] },
              passe: ['ArG', 'DC', 0.3],
            },
            {
              texte: "L'arrière gauche fait semblant de passer pivot à droite: il part en diagonale vers les 6 m et la défense le suit.",
              courses: { ArG: [-1.2, 7.6] },
              def: { D3: [0.6, 8.6] },
            },
            {
              texte: "Mais c'est le pivot droit qui remonte au poste d'arrière droit. Le demi-centre le sert.",
              courses: { ArD: [4.6, 9.0] },
              passe: ['DC', 'ArD', 0.5],
            },
            {
              texte: "L'arrière droit, lancé, percute dans l'intervalle entre l'avancé et le 2 droit, où la défense est en retard, et tire.",
              courses: { ArD: [3.2, 7.6] },
              tir: { par: 'ArD', t: 0.6 },
              def: { D2: [4.0, 6.2] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'stossen-ruckstossen',
      nom: 'Percussion / contre-percussion',
      alias: 'Stoßen-Rückstoßen, Rückstoßen; "Stoßen und Rückstoßen in die gleiche Nahtstelle" (Kugler) (DE)',
      categorie: 'Circulation',
      defense: '0-6 (aussi 5-1, offensive)',
      resume: "L'arrière gauche attaque vers le centre et passe; le jeu fait glisser la défense à droite, puis le ballon revient brusquement sur lui, qui attaque l'intervalle 1-2 protégé par l'écran du pivot.",
      description: [
        "Le \"Rückstoßen\" (contre-percussion) est, selon handballtraining.de, \"un retour soudain du jeu vers le côté d'où la pression a été mise avec le ballon\". La forme décrite se joue contre une 0-6 (aussi contre 5-1), avec le pivot au contact du central côté ballon.",
        "L'arrière gauche attaque vers le centre pour entraîner son 2; le pivot bloque le 3. Quand l'arrière passe au demi-centre, le pivot pose un bref écran côté ballon sur le 2. Le demi-centre feinte une passe vers la droite: la défense glisse. Le 2 veut contourner l'écran; le pivot le bloque alors du côté opposé. L'arrière gauche revient latéralement et reçoit pour attaquer l'intervalle 1-2.",
        "Fins (variantes 1 à 3): le 1 resserre vers passe à l'ailier; il reste et l'écran tient vers percée; le 2 contourne l'écran vers passe au pivot, ou nouvelle attaque avec écran et roulé. Variante 4: idée d'Andreas Kugler (handball-uebungen.de, résumé seulement), contre défense offensive: deux arrières attaquent l'un après l'autre le même intervalle, puis un changement de direction rapide amène la percée. Sans changement de direction, on continue jusqu'à l'aile avec le pivot ou l'ailier. Schéma de principe.",
      ],
      objectif: "Faire glisser la défense d'un côté, puis revenir brusquement sur le côté d'où la pression est partie.",
      pointsCles: [
        "La première passe de l'ailier se fait sans pression; l'ailier se replace aussitôt dans le coin.",
        "La feinte de passe du demi-centre et la course de l'arrière droit doivent faire glisser toute la défense.",
        "Le pivot change de côté d'écran au moment où le 2 veut le contourner.",
        "L'arrière gauche revient latéralement pour recevoir lancé face à l'intervalle 1-2.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Stoßen-Rückstoßen über die Halbposition mit Kreisläufersperre gegen 6:0-Abwehr (handballtraining.de)',
          url: 'https://handballtraining.de/taktik/stossen-rueckstossen-ueber-die-halbposition-mit-kreislaeufersperre-gegen-60-abwehr/1505',
          note: "Déroulement en cinq temps et trois fins: passe à l'ailier, percée, passe au pivot.",
        },
        {
          titre: 'Erlernen der Regelbewegung beim Stoßen-Rückstoßen über die Halbposition (handballtraining.de)',
          url: 'https://handballtraining.de/taktik/erlernen-der-regelbewegung-beim-stossen-rueckstossen-ueber-die-halbposition/1498',
          note: '"Das Rückstoßen bezeichnet eine plötzliche Rückverlagerung des Spiels auf die Seite, von welcher mit dem Ball Druck auf die Abwehr ausgeübt wurde."',
        },
        {
          titre: "handball-uebungen.de, séances TE 522 et TE 538 (idée d'Andreas Kugler, résumés)",
          url: 'https://handball-uebungen.de/trainingseinheiten/angriff/',
          note: 'Deux arrières "nacheinander in dieselbe Nahtstelle" puis "mit einem schnellen Richtungswechsel ... der Durchbruch"; contre défense offensive.',
        },
      ],
      depart: { Piv: [-2.6, 6.5] },
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Le 1 resserre: passe à l'ailier",
          etapes: [
            ...STOSSEN_BASE,
            {
              texte: "Le 1 gauche resserre sur l'arrière: celui-ci donne à l'ailier gauche.",
              courses: { ArG: [-5.8, 7.2], AiG: [-9.0, 1.6] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G1: [-6.2, 5.0] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - L'écran tient: percée",
          etapes: [
            ...STOSSEN_BASE,
            {
              texte: "Le 1 gauche reste sur l'ailier et l'écran tient: l'arrière gauche perce dans l'intervalle 1-2 et tire.",
              courses: { ArG: [-5.4, 6.4] },
              tir: { par: 'ArG', t: 0.55 },
              def: { G1: [-7.4, 2.4] },
            },
          ],
        },
        {
          nom: '3 - Le 2 contourne: passe au pivot',
          etapes: [
            ...STOSSEN_BASE,
            {
              texte: "Le 2 gauche contourne l'écran par l'avant pour revenir sur l'arrière. Le 3 ne suit pas: le pivot se retourne, libre, et reçoit.",
              courses: { Piv: [-3.6, 6.2] },
              passe: ['ArG', 'Piv', 0.5],
              def: { G2: { vers: [-5.0, 7.0], via: [-3.8, 7.6] } },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Deux percussions dans le même intervalle (Kugler)',
          etapes: [
            STOSSEN_BASE[0],
            {
              texte: "L'arrière gauche percute dans l'intervalle entre le 2 et le 3 gauches, puis passe au demi-centre.",
              courses: { ArG: [-3.4, 8.2] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-4.0, 6.4], G3: [-1.8, 7.2] },
            },
            {
              texte: "Le demi-centre percute à son tour dans le même intervalle. Le 2 et le 3 gauches se resserrent.",
              courses: { DC: [-2.4, 8.4], ArG: [-5.0, 9.4] },
              def: { G3: [-2.0, 7.4], G2: [-3.6, 6.6] },
            },
            {
              texte: "Changement de direction rapide: le demi-centre repart vers la droite, perce entre les deux 3 et tire.",
              courses: { DC: { vers: [0.2, 7.6], via: [-1.0, 8.6] } },
              tir: { par: 'DC', t: 0.6 },
              def: { D3: [1.4, 7.0] },
            },
          ],
        },
      ],
    },
  );
})();
