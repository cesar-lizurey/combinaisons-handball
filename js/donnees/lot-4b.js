/* Lot 4b: percussions, passes en retour, traversées d'arrières, rentrées en 2e pivot. */
(() => {
  const DRAGOR = n => `http://www.dragoerhb.dk/fransk/f${n}.html`;
  const DRAGOR_DA = n => `http://www.dragoerhb.dk/x${n}.html`;
  const DRAGOR_EN = n => `http://www.dragoerhb.dk/english/z${n}.html`;
  const HHAUS = p => `http://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/${p}.html`;
  const BHV = {
    titre: 'P. Streicher, "Angriff gegen offensive Abwehr" (Badischer Handball-Verband, formation licence B)',
    url: 'https://www.badischer-hv.de/fileadmin/bhv/Bilder_und_Dokumente/Bildung/B_Ausbildung_21/Angriff_gegen_offensive_Abwehr_PDF.pdf',
  };

  /* ---------- Doppelstoßen (handballhaus) ---------- */
  const DOPPEL_BASE = [
    {
      texte: "L'arrière droit passe au demi-centre.",
      courses: { DC: [0.4, 10.0] },
      passe: ['ArD', 'DC', 0.1],
    },
    {
      texte: "Le demi-centre enchaîne vers l'arrière gauche. Toute la défense glisse vers la gauche.",
      courses: { ArG: [-5.2, 9.2], DC: [0.2, 10.2] },
      passe: ['DC', 'ArG', 0.2],
      def: { G1: [-7.6, 2.2], G2: [-5.2, 5.4], G3: [-2.1, 6.7], D3: [1.2, 6.7], D2: [4.4, 5.4] },
    },
  ];

  /* ---------- Rückpass-Konzeption (BHV) ---------- */
  const RUCKPASS_G = [
    {
      texte: "L'arrière gauche attaque balle en main vers le centre, puis passe au demi-centre. Le 2 gauche (demi-avancé) le suit.",
      courses: { ArG: [-3.4, 9.0], DC: [0.3, 10.6] },
      passe: ['ArG', 'DC', 0.7],
      def: { G2: [-3.8, 8.0] },
    },
    {
      texte: "Le demi-centre attaque vers la droite et feinte une passe vers l'arrière droit, qui percute avec lui. La défense glisse vers la droite. L'arrière gauche fait une boucle pour revenir face à l'intervalle extérieur.",
      courses: { DC: [1.6, 9.4], ArD: [4.6, 9.0], ArG: { vers: [-5.6, 9.6], via: [-4.2, 10.6] } },
      def: { D3: [1.4, 8.4], D2: [4.6, 7.8], G2: [-2.8, 7.8], G3: [-0.4, 6.9], G1: [-6.8, 3.6] },
    },
    {
      texte: "Passe en retour: le demi-centre rend aussitôt le ballon à l'arrière gauche, à contre-sens du déplacement de la défense. Le pivot pose un écran à l'extérieur du 2 gauche pour l'empêcher de revenir.",
      courses: { ArG: [-5.4, 8.8], Piv: { vers: [-3.7, 7.4], via: [-3.4, 6.2], ecran: true } },
      passe: ['DC', 'ArG', 0.15],
    },
  ];
  const RUCKPASS_D = [
    {
      texte: "L'arrière droit attaque balle en main vers le centre, puis passe au demi-centre. Le 2 droit (demi-avancé) le suit.",
      courses: { ArD: [3.4, 9.0], DC: [-0.3, 10.6] },
      passe: ['ArD', 'DC', 0.7],
      def: { D2: [3.8, 8.0] },
    },
    {
      texte: "Le demi-centre attaque vers la gauche et feinte une passe vers l'arrière gauche, qui percute avec lui. La défense glisse vers la gauche. L'arrière droit fait une boucle pour revenir face à l'intervalle extérieur.",
      courses: { DC: [-1.6, 9.4], ArG: [-4.6, 9.0], ArD: { vers: [5.6, 9.6], via: [4.2, 10.6] } },
      def: { D3: [-1.4, 8.4], G2: [-4.6, 7.8], D2: [2.8, 7.8], G3: [-1.6, 6.6], D1: [6.8, 3.6] },
    },
    {
      texte: "Passe en retour: le demi-centre rend aussitôt le ballon à l'arrière droit. Le pivot pose un écran à l'extérieur du 2 droit.",
      courses: { ArD: [5.4, 8.8], Piv: { vers: [3.7, 7.4], via: [3.4, 6.2], ecran: true } },
      passe: ['DC', 'ArD', 0.15],
    },
  ];

  /* ---------- ARG/ARD, passe sautée de la gauche (f884) ---------- */
  const SAUTEE_BASE = [
    {
      texte: "L'ailier gauche attaque à l'extérieur du 1 gauche et passe en retrait à l'arrière gauche.",
      courses: { AiG: [-8.6, 2.2], ArG: [-6.8, 8.8] },
      passe: ['AiG', 'ArG', 0.6],
      def: { G1: [-7.8, 3.0] },
    },
    {
      texte: "L'arrière gauche attaque à l'extérieur du 2 gauche, qui sort sur lui, et fait une passe sautée, par-dessus le demi-centre, à l'arrière droit. Le demi-centre part vers la gauche; le 3 gauche le suit.",
      courses: { ArG: [-7.0, 7.0], DC: [-2.6, 8.6], ArD: [5.0, 9.0] },
      passe: ['ArG', 'ArD', 0.5],
      def: { G2: [-6.0, 5.8], G3: [-2.2, 7.0] },
    },
    {
      texte: "L'arrière droit s'engage et feinte un tir en suspension entre le 3 et le 2 droits, qui se resserrent sur lui.",
      courses: { ArD: [3.4, 7.8] },
      def: { D3: [2.4, 6.9], D2: [4.0, 6.6] },
    },
  ];

  /* ---------- Attaque placée pour la supériorité à l'aile (f1680) ---------- */
  const FIXATION_1680 = [
    {
      texte: "Jeu placé de gauche à droite: l'arrière gauche passe au demi-centre, qui reçoit en courant vers l'avant, en direction de l'intervalle entre le 2 et le 1 droits.",
      courses: { DC: [2.2, 9.6] },
      passe: ['ArG', 'DC', 0.4],
    },
    {
      texte: "Le demi-centre s'engage dans l'intervalle 2-1 droit. Le 2 et le 1 droits se referment sur lui; le pivot, placé à l'intérieur du 1 droit, les gêne.",
      courses: { DC: [6.0, 6.2] },
      def: { D2: [5.0, 5.6], D1: [7.0, 5.0] },
    },
  ];

  /* ---------- Traversée d'arrière par derrière (x305) ---------- */
  const BAGOM_BASE = [
    {
      texte: "L'arrière droit passe au demi-centre, qui attaque vers la droite et attire l'avancé.",
      courses: { DC: [3.4, 8.0] },
      passe: ['ArD', 'DC', 0.1],
      def: { D3: [2.4, 7.8] },
    },
    {
      texte: "Après sa passe, l'arrière droit court derrière le demi-centre, vers la gauche. Le demi-centre passe à l'arrière gauche, qui avance vers le centre et attire le 2 gauche vers l'intérieur. Le demi-centre continue sa course.",
      courses: {
        ArD: { vers: [-4.6, 10.0], via: [1.0, 11.6] },
        ArG: [-0.6, 8.2],
        DC: [4.8, 7.0],
      },
      passe: ['DC', 'ArG', 0.3],
      def: { G2: [-2.0, 6.9] },
    },
    {
      texte: "L'arrière gauche donne à l'arrière droit, arrivé à gauche, qui attaque l'intervalle entre le 1 et le 2 gauches.",
      courses: { ArD: { vers: [-5.6, 6.6], via: [-5.6, 8.8] } },
      passe: ['ArG', 'ArD', 0.2],
      def: { G2: [-3.4, 6.4], G1: [-6.8, 3.8] },
    },
  ];

  /* ---------- Traversée d'arrière, double passe (x724) ---------- */
  const DOBBELT_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche, puis part en profondeur vers la ligne de fond.",
      courses: { AiG: [-9.6, 0.8] },
      passe: ['AiG', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche fixe le 2 gauche et passe au demi-centre.",
      courses: { ArG: [-5.4, 7.8], DC: [-0.4, 10.4] },
      passe: ['ArG', 'DC', 0.6],
      def: { G2: [-5.0, 6.6] },
    },
    {
      texte: "Aussitôt, l'arrière gauche traverse vers la droite; le demi-centre lui rend le ballon dans sa course. Le demi-centre et l'arrière droit partent ensemble vers la gauche, comme dans le Randonneur (\"Bivogn\").",
      courses: { ArG: { vers: [-1.6, 8.8], via: [-4.0, 8.6] }, DC: [-2.0, 10.8], ArD: [3.6, 10.0] },
      passe: ['DC', 'ArG', 0.6],
      def: { G2: [-4.9, 5.6] },
    },
    {
      texte: "L'arrière gauche continue vers la droite et passe à l'arrière droit, qui croise derrière lui. Le demi-centre poursuit vers la gauche.",
      courses: { ArG: [2.4, 8.0], ArD: { vers: [-0.2, 9.4], via: [2.0, 10.4] }, DC: [-4.2, 9.6] },
      passe: ['ArG', 'ArD', 0.5],
    },
    {
      texte: "L'arrière droit attaque entre le 2 et le 3 gauches et attire le 2 vers l'intérieur. L'arrière gauche s'écarte à droite.",
      courses: { ArD: [-1.8, 7.6], ArG: [5.4, 7.0], DC: [-5.0, 8.6] },
      def: { G2: [-2.8, 6.6], G3: [-0.7, 6.8] },
    },
  ];
  const DOBBELT_DC = {
    texte: "Le 2 et le 3 gauches se resserrent sur lui: l'arrière droit donne au demi-centre, qui attaque à l'extérieur du 2 gauche.",
    courses: { DC: [-4.6, 6.8] },
    passe: ['ArD', 'DC', 0.3],
  };

  /* ---------- Traversée d'arrière contre 3-2-1 (x877) ---------- */
  const BACK321_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit, lancé en diagonale vers la gauche.",
      courses: { ArD: [3.8, 9.6] },
      passe: ['AiD', 'ArD', 0.3],
    },
    {
      texte: "L'arrière droit court en diagonale vers la gauche: l'avancé et le 2 gauche veulent se resserrer sur lui. Avant, il passe à l'arrière gauche. Le demi-centre se décale vers le poste de l'arrière droit.",
      courses: { ArD: [1.6, 8.4], ArG: [-5.4, 9.4], DC: [2.6, 10.4] },
      passe: ['ArD', 'ArG', 0.4],
      def: { D3: [0.4, 9.0], G2: [-3.6, 7.8], D2: [3.0, 7.8] },
    },
    {
      texte: "L'arrière gauche attaque droit devant; l'avancé suit le ballon et vient l'aider. L'arrière droit continue sa course vers l'intérieur, le long de la défense.",
      courses: { ArG: [-5.0, 8.2], ArD: { vers: [-1.6, 7.4], via: [0.2, 7.8] }, DC: [4.0, 9.4] },
      def: { G2: [-4.6, 7.2], D3: [-3.2, 8.6], D2: [3.2, 7.8] },
    },
  ];

  /* ---------- Záběh spojky (Kubišová 2020) ---------- */
  const ZABEH_BASE = [
    {
      texte: "L'arrière gauche passe à son ailier, qui s'écarte de la défense pour pouvoir recevoir.",
      courses: { AiG: [-9.2, 4.0] },
      passe: ['ArG', 'AiG', 0.4],
    },
    {
      texte: "L'arrière gauche rentre dans la défense et la traverse jusqu'au côté opposé, où il se place à côté du 2 droit. Le demi-centre glisse vers le poste qu'il a libéré.",
      courses: { ArG: { vers: [3.6, 6.2], via: [-1.6, 8.0] }, DC: [-4.6, 10.0] },
    },
    {
      texte: "L'ailier donne au demi-centre, qui arrive lancé vers la défense.",
      courses: { DC: [-4.0, 8.6] },
      passe: ['AiG', 'DC', 0.4],
      def: { G2: [-4.4, 6.4], D3: [-2.2, 7.8] },
    },
  ];

  /* ---------- Rentrée d'arrière côté balle, côté pivot (É. Quintin) ---------- */
  const QUINTIN_BASE = [
    {
      texte: "L'arrière droit, côté pivot, fixe son défenseur (le 2 droit) avant de libérer le ballon vers le demi-centre.",
      courses: { ArD: [4.8, 8.0], DC: [0.6, 10.0] },
      passe: ['ArD', 'DC', 0.7],
      def: { D2: [4.6, 6.8] },
    },
    {
      texte: "Il rentre en second pivot vers le secteur intérieur opposé. Le demi-centre reçoit en mouvement et fixe l'avancé (le \"3 haut\").",
      courses: { ArD: { vers: [-3.0, 6.4], via: [1.6, 7.6] }, DC: [0.4, 9.8] },
      def: { G3: [-1.6, 6.7], D3: [0.4, 8.8] },
    },
    {
      texte: "Le demi-centre donne à l'arrière gauche, qui a d'abord orienté sa course vers l'extérieur avant de revenir vers l'intérieur: il détient le temps fort. Le demi-centre se replace à toute vitesse dans le couloir de l'arrière entré.",
      courses: { ArG: { vers: [-2.4, 8.8], via: [-6.4, 9.6] }, DC: { vers: [4.2, 9.4], via: [2.4, 10.4] } },
      passe: ['DC', 'ArG', 0.2],
    },
  ];
  /* ---------- "La bis" (É. Quintin) ---------- */
  const BIS_BASE = [
    {
      texte: "L'arrière droit fixe et provoque son défenseur, puis donne à l'ailier droit.",
      courses: { ArD: [4.6, 8.0], AiD: [8.4, 4.6] },
      passe: ['ArD', 'AiD', 0.6],
      def: { D2: [4.4, 6.8], D1: [7.4, 3.6] },
    },
    {
      texte: "L'arrière droit rentre en second pivot, le long de la zone, vers le centre-gauche. Le demi-centre se décale à droite.",
      courses: { ArD: { vers: [-2.6, 6.6], via: [1.6, 7.8] }, DC: { vers: [4.6, 9.6], via: [2.6, 10.6] } },
      def: { D2: [4.4, 5.6] },
    },
  ];

  /* ---------- Organisation "3 à gauche, 3 à droite" (Bertholet / Ripert) ---------- */
  const TROIS_BLOC_BASE = [
    {
      texte: "Le demi-centre regarde s'il peut tirer, puis transmet à l'arrière droit, côté pivot.",
      courses: { ArD: [5.4, 9.4], DC: [-1.0, 9.8] },
      passe: ['DC', 'ArD', 0.3],
    },
    {
      texte: "Le pivot pose un bloc sur le côté intérieur du 2 droit; l'arrière droit vient le prendre.",
      courses: { Piv: { vers: [3.9, 6.3], ecran: true }, ArD: [4.8, 8.4] },
      def: { D2: [4.8, 5.9] },
    },
  ];
  const TROIS_PRISE_BLOC = {
    texte: "L'arrière droit passe à l'intérieur du bloc et se présente au tir.",
    courses: { ArD: { vers: [2.8, 7.6], via: [4.4, 8.4] } },
  };

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'doppelstossen-nachstossen',
      nom: 'Double percussion et percussion retardée',
      alias: 'Doppelstoßen 1/2, Nachstoßen 1/2 (DE)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Deux percussions successives dans le même secteur pour fixer deux défenseurs (Doppelstoßen), ou percussion retardée de l'ailier sur une passe en retour (Nachstoßen).",
      description: [
        "Deux fiches du site allemand handballhaus.de (2009-2011, lu via l'archive web). Chaque fiche n'a qu'un court texte et une animation Flash qui n'a pas pu être vue: les courses sont reconstituées d'après le texte. Fiche voisine: percussion / contre-percussion (\"Stoßen-Rückstoßen\").",
        "Doppelstoßen (\"double percussion avec déplacement d'espace\"): le ballon va de l'arrière droit au demi-centre puis à l'arrière gauche, et la défense glisse. L'arrière gauche marque un temps (\"Stufe\") ou percute de nouveau vers l'intérieur pour fixer aussi le défenseur central. Le pivot bloque ce central et le sépare de l'autre central. Le demi-centre, qui a compensé, reçoit et perce. Une passe au pivot est aussi possible.",
        "Le texte allemand nomme les défenseurs vus de la défense (IR, IL, HL). La conversion retenue ici (IR = 3 gauche, IL = 3 droit, HL = 2 droit) suit la convention des autres sources allemandes; elle place la percée du demi-centre entre le 3 et le 2 droits. C'est une interprétation.",
        "Nachstoßen (\"percussion retardée\"): l'ailier gauche avance tranquillement dans l'intervalle 1-2 et passe à l'arrière gauche. Il attend un instant puis, sur la passe en retour, accélère et perce entre le 1 et le 2, en profitant de l'inattention de son défenseur. Variante 2: l'ailier percute d'abord vers l'extérieur, puis reçoit le retour à pleine vitesse.",
      ],
      objectif: "Fixer deux défenseurs par deux attaques successives, ou surprendre un défenseur qui se relâche après la première passe.",
      pointsCles: [
        "Doppelstoßen: la seconde percussion de l'arrière doit fixer deux défenseurs, pas un seul.",
        "Le pivot sépare les deux centraux au moment de la seconde percussion.",
        "Nachstoßen: la première attaque de l'ailier est volontairement lente; l'accélération vient sur la passe en retour.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Doppelstoßen (handballhaus.de, archive web)',
          url: HHAUS('stossen/doppelstossen'),
          note: 'Passes RR-RM-RL, "Stufe" ou nouvelle percussion de RL pour fixer IR; le pivot bloque IR et sépare IR et IL; RM perce entre IL et HL.',
        },
        {
          titre: 'Nachstoßen (handballhaus.de, archive web)',
          url: HHAUS('stossen/nachstossen'),
          note: "LA avance tranquillement dans l'intervalle 1-2, passe à RL, attend puis accélère sur la passe en retour; variante: LA percute d'abord vers l'extérieur.",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: '1 - Doppelstoßen: double percussion',
          etapes: [
            ...DOPPEL_BASE,
            {
              texte: "L'arrière gauche marque un temps, puis percute de nouveau vers l'intérieur et fixe le 2 et le 3 gauches. Le pivot bloque le 3 gauche et le sépare du 3 droit. Le demi-centre compense derrière lui.",
              courses: { ArG: { vers: [-3.4, 8.0], via: [-4.6, 8.8] }, Piv: { vers: [-1.6, 6.6], ecran: true }, DC: [-0.2, 10.4] },
              def: { G2: [-4.3, 6.5], G3: [-2.6, 7.0] },
            },
            {
              texte: "L'arrière gauche redonne au demi-centre, qui arrive lancé et perce entre le 3 et le 2 droits: le 3 droit est seul, son partenaire est retenu par le bloc.",
              courses: { DC: { vers: [2.8, 7.8], via: [1.2, 9.6] } },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [1.6, 7.0], D2: [4.2, 6.0] },
            },
            { texte: 'Le demi-centre tire. Il peut aussi servir le pivot.', tir: 'DC' },
          ],
        },
        {
          nom: "2 - Nachstoßen: l'ailier repart sur la passe en retour",
          ballon: 'AiG',
          etapes: [
            {
              texte: "L'ailier gauche avance tranquillement dans l'intervalle entre le 1 et le 2 gauches et passe à l'arrière gauche.",
              courses: { AiG: [-7.2, 4.6] },
              passe: ['AiG', 'ArG', 0.6],
              def: { G1: [-7.6, 3.4], G2: [-5.2, 5.4] },
            },
            {
              texte: "L'ailier attend un instant. L'arrière gauche menace et fixe le 2 gauche; le 1 gauche, croyant l'action finie, se relâche vers son coin.",
              courses: { AiG: [-7.4, 4.2], ArG: [-5.0, 8.6] },
              def: { G2: [-5.0, 6.2], G1: [-8.0, 2.6] },
            },
            {
              texte: "Sur la passe en retour de l'arrière, l'ailier accélère et perce entre le 1 et le 2.",
              courses: { AiG: [-5.9, 5.2] },
              passe: ['ArG', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Nachstoßen, variante: percussion d'abord vers l'extérieur",
          ballon: 'AiG',
          etapes: [
            {
              texte: "L'ailier gauche percute d'abord vers l'extérieur, sur le 1 gauche, et passe à l'arrière gauche.",
              courses: { AiG: [-8.4, 3.4], ArG: [-5.2, 9.0] },
              passe: ['AiG', 'ArG', 0.6],
              def: { G1: [-8.0, 2.3] },
            },
            {
              texte: "Il repart aussitôt vers l'intérieur et reçoit le retour à pleine vitesse, dans l'intervalle entre le 1 et le 2.",
              courses: { AiG: { vers: [-6.0, 5.3], via: [-7.2, 4.8] } },
              passe: ['ArG', 'AiG', 0.5],
              def: { G2: [-5.0, 6.3] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ruckpass',
      nom: 'Passe en retour contre le déplacement défensif',
      alias: 'Rückpass-Konzeption (DE)',
      categorie: 'Circulation',
      defense: 'Défense offensive (3-2-1, 5-1...)',
      dispositif: '3-2-1',
      resume: "Le demi-centre attaque d'un côté avec une feinte de passe, puis rend aussitôt le ballon à l'arrière qui l'a servi: le ballon repart contre le sens de glissement de la défense.",
      description: [
        "Premier des cinq \"concepts d'attaque\" contre défense offensive d'un support de formation du Badischer Handball-Verband (Dr Pavol Streicher). Le \"Rückpass\" est une variante du une-deux: le receveur rend directement le ballon au passeur. Règle: \"les passes en retour se jouent contre le sens de déplacement de la défense\".",
        "Schéma \"RM - RL - LA\" (variante 1): l'arrière gauche attaque vers le centre et passe au demi-centre; le demi-centre attaque vers la droite avec une feinte de passe, la défense glisse; il rend aussitôt le ballon à l'arrière gauche, qui a fait une boucle et revient face à l'intervalle extérieur. L'arrière gauche attaque l'intervalle entre le 1 et le 2 et/ou sert l'ailier. Le document donne la même chose en miroir, \"RL - RM - RR - RA\" (variante 2).",
        "Le détail des courses est lu sur les schémas du document. L'arrière opposé \"percute avec\" le demi-centre et le pivot pose un écran: leur placement exact est reconstitué. Fiche voisine: percussion / contre-percussion (\"Stoßen-Rückstoßen\").",
      ],
      objectif: "Faire glisser une défense offensive d'un côté, puis la prendre à contre-pied par une passe en retour.",
      pointsCles: [
        "Direction d'attaque et feinte de passe du demi-centre: elles doivent faire glisser la défense.",
        "Technique de la passe en retour: immédiate, sans temps d'arrêt.",
        "L'arrière opposé percute en même temps que le demi-centre (\"Mitstoßen\").",
        "Le pivot pose un écran pour empêcher le défenseur de revenir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          ...BHV,
          note: '"Rückpässe werden gegen die Lauf- oder Bewegungsrichtung der Abwehr gespielt!"; schémas p. 16 (RM - RL - LA) et p. 17 (RL - RM - RR - RA).',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - RM - RL - LA: arrière gauche puis ailier',
          etapes: [
            ...RUCKPASS_G,
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 1 et le 2 gauches. Le 1 sort sur lui: il donne à l'ailier gauche.",
              courses: { ArG: [-5.4, 7.4], AiG: [-8.8, 2.0] },
              passe: ['ArG', 'AiG', 0.5],
              def: { G1: [-5.8, 6.3] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Miroir RL - RM - RR - RA',
          ballon: 'ArD',
          etapes: [
            ...RUCKPASS_D,
            {
              texte: "L'arrière droit attaque l'intervalle entre le 2 et le 1 droits. Le 1 reste sur l'ailier droit: l'arrière droit perce et tire (sinon il sert son ailier).",
              courses: { ArD: [5.4, 7.2], AiD: [8.8, 2.0] },
              tir: { par: 'ArD', t: 0.7 },
              def: { D1: [7.2, 3.0] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'expresspass',
      nom: 'Passe express (passe sautée)',
      alias: 'Expresspass; Kreuzen + Expresspass (DE)',
      categorie: 'Circulation',
      defense: 'Défense offensive ou qui glisse vers le ballon',
      dispositif: '3-2-1',
      resume: "Une passe très appuyée saute un poste: le ballon arrive à l'arrière opposé avant que la défense ait pu glisser.",
      description: [
        "Deuxième concept d'attaque contre défense offensive du Badischer Handball-Verband. L'\"Expresspass\" est une passe qui saute un poste (par exemple de l'arrière gauche à l'arrière droit, par-dessus le demi-centre). Règle: \"le ballon doit aller plus vite que la défense ne peut glisser\". Le document conseille de jouer d'abord des passes et des percussions \"normales\", puis une passe express par surprise.",
        "Variante 1 (schéma du BHV): l'ailier gauche passe à l'arrière gauche, qui prend sa course d'appel comme pour servir le demi-centre. Le demi-centre attaque le centre sans ballon. L'arrière gauche saute et joue une passe express à l'arrière droit lancé, qui attaque l'intervalle droit; le schéma montre ensuite l'ailier droit qui reçoit et va au but.",
        "Variante 2 (handballtraining.tv, défense non précisée): le demi-centre croise avec l'arrière droit; après une percussion appuyée, l'arrière droit joue une passe express par-dessus le poste central à l'arrière gauche, qui reçoit large et rentre. Le pivot pose un écran pour créer un 2 contre 1 côté gauche, joué en écran et roulé (\"Sperre-Absetzen\") ou en une-deux.",
        "Schéma du BHV lu en image, texte de handballtraining.tv court: placements reconstitués.",
      ],
      objectif: "Renverser le jeu plus vite que la défense ne glisse.",
      pointsCles: [
        "La course d'appel, la direction du saut et le haut du corps du passeur annoncent une passe \"normale\".",
        "Timing entre le demi-centre (qui fixe sans ballon) et l'arrière opposé (lancé).",
        "Passes express possibles aussi: arrière gauche vers ailier droit, arrière droit vers arrière gauche ou ailier gauche, demi-centre vers un ailier.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          ...BHV,
          note: '"DIE BALLGESCHWINDIGKEIT MUSS GRÖSSER SEIN ALS DAS VERSCHIEBUNGSMÖGLICHKEIT DER ABWEHR!"; schéma p. 21 (LA, RL, RM, RR, RA).',
        },
        {
          titre: 'Kleingruppenspiel mit Kreuzen + Expresspass (handballtraining.tv)',
          url: 'https://www.handballtraining.tv/handball%C3%BCbung/kleingruppenspiel-mit-kreuzen-expresspass',
          note: "RM croise avec RR; RR joue une passe express à RL, qui reçoit large et rentre; écran du pivot pour un 2 contre 1 côté gauche.",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: '1 - Arrière gauche vers arrière droit par-dessus le demi-centre (BHV)',
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche, qui prend sa course d'appel comme pour une passe normale au demi-centre.",
              courses: { AiG: [-8.6, 2.0], ArG: [-4.6, 9.2] },
              passe: ['AiG', 'ArG', 0.2],
            },
            {
              texte: "Le demi-centre attaque le centre sans ballon et fixe l'avancé. Le 2 droit glisse vers le centre. L'arrière droit se prépare.",
              courses: { DC: [0.4, 10.4], ArD: [5.8, 10.0] },
              def: { G2: [-4.4, 8.2], D2: [3.4, 8.0] },
            },
            {
              texte: "L'arrière gauche saute et joue une passe express, par-dessus le demi-centre, directement à l'arrière droit lancé.",
              courses: { ArD: [4.8, 8.6] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D2: [4.0, 7.6] },
            },
            {
              texte: "L'arrière droit attaque l'intervalle droit; le 1 droit sort l'aider: il donne à l'ailier droit.",
              courses: { ArD: [5.8, 7.4], AiD: [8.6, 2.0] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D1: [6.6, 5.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "2 - Croisé, puis passe express à l'arrière gauche",
          ballon: 'DC',
          dispositif: '0-6',
          etapes: [
            {
              texte: "Le demi-centre s'engage entre le 3 et le 2 droits. Le 3 droit sort sur lui.",
              courses: { DC: [2.4, 8.6] },
              def: { D3: [2.2, 7.4] },
            },
            {
              texte: "Croisé: l'arrière droit passe derrière le demi-centre et reçoit le ballon vers le centre.",
              courses: { ArD: { vers: [0.6, 9.0], via: [3.6, 10.3] }, DC: [3.2, 7.9] },
              passe: ['DC', 'ArD', 0.55],
            },
            {
              texte: "L'arrière droit percute vers le centre, puis joue une passe express par-dessus le poste central à l'arrière gauche, qui reçoit large.",
              courses: { ArD: [-0.6, 8.4], ArG: [-6.0, 9.6] },
              passe: ['ArD', 'ArG', 0.6],
              def: { G3: [-1.2, 7.2] },
            },
            {
              texte: "L'arrière gauche rentre vers l'intérieur. Le pivot pose un écran à l'intérieur du 2 gauche: 2 contre 1 côté gauche contre le 3 gauche.",
              courses: { ArG: [-3.2, 8.4], Piv: { vers: [-3.9, 6.5], ecran: true } },
              def: { G2: [-4.8, 6.0], G3: [-2.4, 7.4] },
            },
            {
              texte: "Le 3 gauche sort sur l'arrière: le pivot se détache de son écran vers le but et reçoit.",
              courses: { Piv: [-3.4, 6.2] },
              passe: ['ArG', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'passe-sautee-arg-ard',
      nom: "Passe sautée de l'arrière gauche à l'arrière droit",
      alias: 'ARG/ARD - passe sautée de la gauche; Back/Back - venstre overspringskombination (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Après une attaque extérieure de l'ailier puis de l'arrière gauche, une passe sautée par-dessus le demi-centre lance l'arrière droit, qui feinte le tir entre le 3 et le 2 droits. Quatre fins.",
      description: [
        "Fiche du club danois Dragør HK (f884), traduite en français. L'ailier gauche attaque à l'extérieur du 1 et passe en retrait à l'arrière gauche. L'arrière gauche attaque à l'extérieur du 2 et fait une passe sautée, par-dessus le demi-centre, à l'arrière droit, qui feinte un tir en suspension entre le 3 et le 2 droits.",
        "Quatre schémas (f884, f884a à f884c): tir de l'arrière droit; passe à l'ailier droit après la feinte; passe au pivot; passe au demi-centre, qui revient vers le centre après une course vers la gauche. Le détail de chaque fin est lu sur les schémas.",
      ],
      objectif: "Attirer la défense à gauche, puis la prendre de vitesse à droite par une passe qui saute le demi-centre.",
      pointsCles: [
        "L'ailier puis l'arrière gauche attaquent vraiment à l'extérieur pour faire sortir le 1 et le 2.",
        "La passe sautée passe par-dessus le demi-centre, qui part vers la gauche et emmène le 3 gauche.",
        "La feinte de tir de l'arrière droit doit resserrer le 3 et le 2 droits.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'ARG/ARD - passe sautée de la gauche (Dragør HK, trad. française)',
          url: DRAGOR(884),
          note: '"ARG attaque externe de 2D et passe à ARD qui fait une feinte de tir en suspension entre les défenseurs 3G et 2G." Fins sur les schémas f884a à f884c.',
        },
      ],
      depart: { AiG: [-9.4, 4.4] },
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...SAUTEE_BASE,
            {
              texte: "Le 3 et le 2 droits se sont resserrés: l'arrière droit se décale à l'extérieur du 2 droit et tire.",
              courses: { ArD: { vers: [5.2, 6.9], via: [4.8, 8.2] } },
              tir: { par: 'ArD', t: 0.7 },
            },
          ],
        },
        {
          nom: "2 - Passe à l'ailier droit",
          etapes: [
            ...SAUTEE_BASE,
            {
              texte: "Le 1 droit monte aider sur l'arrière droit. L'ailier droit se démarque dans son dos, à l'intérieur; l'arrière droit le sert après sa feinte.",
              courses: { AiD: { vers: [6.2, 4.6], via: [8.8, 3.8] } },
              passe: ['ArD', 'AiD', 0.5],
              def: { D1: [5.6, 6.2] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '3 - Passe au pivot',
          etapes: [
            ...SAUTEE_BASE,
            {
              texte: "Le 3 droit a quitté le pivot pour monter sur l'arrière droit: le pivot se démarque et reçoit.",
              courses: { Piv: [0.4, 6.3] },
              passe: ['ArD', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Passe au demi-centre',
          etapes: [
            ...SAUTEE_BASE,
            {
              texte: "Le demi-centre, parti vers la gauche, revient vers l'intérieur, entre le 3 gauche et le pivot. L'arrière droit le sert après sa feinte.",
              courses: { DC: { vers: [-0.9, 7.0], via: [-2.2, 7.8] } },
              passe: ['ArD', 'DC', 0.5],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'attaque-eclair-centre',
      nom: 'Attaque éclair au centre',
      alias: 'Centerryk (DA), Center rush (EN)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Après sa passe à l'arrière droit, le demi-centre part à fond vers la droite; l'arrière droit attaque à l'extérieur et lui remet le ballon entre le bloc du pivot et le 2 droit.",
      description: [
        "Fiche de Dragør HK (f30). Le ballon circule de l'ailier gauche à l'arrière droit. Après sa passe, le demi-centre part à fond vers la droite; le pivot, placé du côté opposé au départ de l'attaque (ici à droite, contre le 3 droit), bloque ce défenseur.",
        "L'arrière droit attaque à l'extérieur et remet le ballon au demi-centre, qui tire entre le bloc du pivot et le 2 droit.",
      ],
      objectif: "Surprendre la défense centrale par une course très rapide du demi-centre derrière le bloc du pivot.",
      pointsCles: [
        "Le pivot se place du côté opposé au départ de l'attaque.",
        "Le demi-centre part à pleine vitesse juste après sa passe.",
        "L'arrière droit attaque vraiment à l'extérieur pour retenir le 2 droit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Attaque éclair au centre (Dragør HK, trad. française)',
          url: DRAGOR(30),
          note: '"ARD attaque externe et remet la balle au DC, qui tire entre le bloc du PVT et le défenseur 2G."',
        },
      ],
      depart: { Piv: [2.7, 6.4] },
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche attaque vers le 1 gauche et passe à l'arrière gauche.",
          courses: { AiG: [-8.2, 2.6] },
          passe: ['AiG', 'ArG', 0.5],
        },
        {
          texte: "L'arrière gauche avance et passe au demi-centre.",
          courses: { ArG: [-4.8, 8.0], DC: [0, 9.6] },
          passe: ['ArG', 'DC', 0.5],
          def: { G2: [-4.9, 6.2] },
        },
        {
          texte: "Le demi-centre passe à l'arrière droit et part aussitôt vers la droite.",
          courses: { DC: [-0.2, 8.4], ArD: [5.2, 8.8] },
          passe: ['DC', 'ArD', 0.2],
        },
        {
          texte: "L'arrière droit attaque à l'extérieur et retient le 2 droit. Le pivot bloque le 3 droit. Le demi-centre fonce derrière le bloc; l'arrière droit lui remet le ballon.",
          courses: {
            ArD: [5.2, 7.8],
            Piv: { vers: [1.9, 7.1], ecran: true },
            DC: { vers: [2.9, 6.4], via: [1.0, 8.4] },
          },
          passe: ['ArD', 'DC', 0.75],
          def: { D2: [5.0, 6.6], D3: [1.0, 6.9] },
        },
        { texte: 'Le demi-centre tire entre le bloc du pivot et le 2 droit.', tir: 'DC' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'feinte-d-entree',
      nom: "Feinte d'entrée (ballon laissé passer)",
      alias: 'Snydeindløb (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière droit s'engage dans la défense et laisse passer le ballon que lui envoie le demi-centre: l'ailier droit le récupère et attaque entre le 2 et le 1.",
      description: [
        "Fiche de Dragør HK (f1513). L'arrière droit s'engage dans la défense. Le demi-centre passe \"à l'arrière droit\", qui continue sa course sans attraper le ballon. L'ailier droit le réceptionne et attaque rapidement entre le 2 et le 1 droits.",
        "Le schéma de la fiche fait partir le ballon de l'arrière gauche, qui sert d'abord le demi-centre.",
      ],
      objectif: "Attirer le 2 droit vers l'intérieur par une fausse entrée, puis attaquer l'espace qu'il libère.",
      pointsCles: [
        "La course de l'arrière droit doit être crédible: il fait mine de recevoir.",
        "Le ballon passe devant l'arrière droit, qui ne le touche pas.",
        "L'ailier droit remonte puis revient vers l'intérieur pour recevoir lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Feinte d'entrée (Dragør HK, trad. française)",
          url: DRAGOR(1513),
          note: '"La balle est passée par le DC à ARD, qui continue sa course sans attraper la balle."',
        },
      ],
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche passe au demi-centre.",
          courses: { ArG: [-4.8, 9.0], DC: [0, 9.6] },
          passe: ['ArG', 'DC', 0.2],
        },
        {
          texte: "L'arrière droit s'engage dans la défense, en diagonale vers l'intérieur, entre le 3 et le 2 droits. L'ailier droit remonte.",
          courses: { ArD: [2.6, 7.4], AiD: [9.4, 3.6] },
          def: { D2: [3.6, 6.4] },
        },
        {
          texte: "Le demi-centre passe vers l'arrière droit, qui continue sa course sans attraper le ballon. Le ballon file vers l'ailier droit, qui revient vers l'intérieur.",
          courses: { ArD: [0.8, 7.6], AiD: { vers: [6.9, 5.3], via: [8.6, 4.6] } },
          passe: ['DC', 'AiD', 0.3],
          def: { D3: [1.4, 6.7], D2: [3.4, 6.4] },
        },
        {
          texte: "L'ailier droit attaque rapidement entre le 2 et le 1 droits et tire.",
          courses: { AiD: [5.6, 5.4] },
          tir: { par: 'AiD', t: 0.6 },
          def: { D1: [7.0, 3.2] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'attaque-placee-fixations',
      nom: 'Attaque placée par fixations',
      alias: 'Presspil; Oppres til overtal (f1680), Pres med back/back aflevering (f1681) (DA)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "Une fixation forte sur un côté met deux défenseurs hors jeu; le ballon file ensuite à l'opposé, jusqu'à l'ailier (f1680) ou à l'arrière par une passe longue (f1681).",
      description: [
        'Deux fiches de la rubrique "Jeu en attaque placée" de Dragør HK.',
        "Variante 1 (f1680, \"Attaque placée pour avoir une supériorité numérique\"): le pivot est placé à l'intérieur du 1 droit. Après un jeu placé de gauche à droite, le demi-centre reçoit en courant vers l'avant et s'engage dans l'intervalle 2-1 droit; l'ailier droit et l'arrière droit croisent derrière lui. L'attaque placée continue: \"à lui seul il a mis les défenseurs 1G et 2G hors jeu\", d'où une supériorité numérique quand le ballon finit à l'ailier gauche. La circulation de retour (ailier droit, arrière droit, arrière gauche, ailier gauche) est lue sur le schéma.",
        "Variante 2 (f1681, \"Attaque placée avec passe entre ARD et ARG\"): l'ailier gauche s'engage sur le 1 gauche et passe à l'arrière gauche, qui s'engage à l'intérieur et passe au demi-centre; celui-ci attaque le côté droit. L'arrière droit reçoit et court sur le 1 droit; l'ailier droit croise derrière lui, reçoit et fait une passe longue à l'arrière gauche, replacé à son poste, qui tire à gauche du 2 gauche. La fiche dit que le pivot \"bloque 3G\": dans la notation de ce site, c'est le 3 droit, ce qui est montré ici (il l'empêche de revenir vers la gauche). Le lien entre ce bloc et le tir à gauche reste incertain.",
      ],
      objectif: "Fixer fortement un côté pour obtenir le surnombre de l'autre.",
      pointsCles: [
        "Le joueur qui fixe doit attirer deux défenseurs à lui seul.",
        "Les croisés derrière lui relancent la circulation sans perte de temps.",
        "Variante 2: l'arrière gauche revient à son poste après sa première passe pour recevoir la passe longue lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Attaque placée pour avoir une supériorité numérique (Dragør HK, trad. française)',
          url: DRAGOR(1680),
          note: "\"DC reçoit en courant vers l'avant et s'engage dans l'intervalle 2G-1G [...] à lui seul il a mis les défenseurs 1G et 2G hors jeu défensivement.\"",
        },
        {
          titre: 'Attaque placée avec passe entre ARD et ARG (Dragør HK, trad. française)',
          url: DRAGOR(1681),
          note: '"ALD croise derrière ARD, reçoit la balle et fait une passe longue à ARG."',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Supériorité numérique à l'aile gauche (f1680)",
          depart: { Piv: [6.8, 3.6] },
          etapes: [
            ...FIXATION_1680,
            {
              texte: "L'ailier droit croise derrière le demi-centre, vers l'intérieur, et reçoit. L'arrière droit part lui aussi vers le centre.",
              courses: { AiD: { vers: [5.0, 8.0], via: [8.4, 7.8] }, ArD: [2.6, 9.0] },
              passe: ['DC', 'AiD', 0.5],
            },
            {
              texte: "L'ailier droit donne aussitôt à l'arrière droit, qui croise derrière lui. La défense restante glisse vers la droite.",
              courses: { ArD: [0.6, 8.8], ArG: [-4.6, 8.6] },
              passe: ['AiD', 'ArD', 0.2],
              def: { G3: [-0.6, 6.7], D3: [2.4, 6.6], G2: [-3.8, 6.0], G1: [-6.4, 3.6] },
            },
            {
              texte: "L'arrière droit passe à l'arrière gauche, qui fixe le 2 gauche.",
              courses: { ArG: [-4.6, 8.4] },
              passe: ['ArD', 'ArG', 0.2],
              def: { G2: [-4.4, 6.6], G1: [-6.0, 4.6] },
            },
            {
              texte: "Le 1 gauche doit aider: l'ailier gauche, libre, reçoit.",
              courses: { AiG: [-8.0, 4.2] },
              passe: ['ArG', 'AiG', 0.4],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Passe longue de l'ailier droit à l'arrière gauche (f1681)",
          ballon: 'AiG',
          depart: { AiG: [-9.4, 4.4], AiD: [9.6, 4.6] },
          etapes: [
            {
              texte: "L'ailier gauche s'engage sur le 1 gauche et passe à l'arrière gauche.",
              courses: { AiG: [-8.2, 3.6] },
              passe: ['AiG', 'ArG', 0.6],
              def: { G1: [-7.6, 2.8] },
            },
            {
              texte: "L'arrière gauche s'engage vers l'intérieur et passe au demi-centre.",
              courses: { ArG: [-3.0, 8.0], DC: [0.6, 9.8] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-3.6, 6.6], G3: [-1.9, 6.9] },
            },
            {
              texte: "Le demi-centre attaque le côté droit et passe à l'arrière droit, qui court vers le 1 droit. L'arrière gauche revient à son poste.",
              courses: { DC: [2.4, 8.2], ArD: [6.8, 8.2], ArG: [-5.4, 9.4] },
              passe: ['DC', 'ArD', 0.5],
              def: { D3: [2.2, 7.2] },
            },
            {
              texte: "L'arrière droit continue sur le 1 droit. L'ailier droit croise derrière lui, vers l'intérieur, et reçoit.",
              courses: { ArD: [8.2, 4.6], AiD: { vers: [4.6, 7.6], via: [8.6, 8.0] } },
              passe: ['ArD', 'AiD', 0.5],
              def: { D1: [7.6, 3.2], D2: [5.4, 5.8] },
            },
            {
              texte: "Passe longue de l'ailier droit à l'arrière gauche, qui s'engage. Le pivot bloque le 3 droit; le 2 gauche a glissé vers l'intérieur.",
              courses: { ArG: [-5.0, 8.2], Piv: { vers: [1.2, 7.0], ecran: true } },
              passe: ['AiD', 'ArG', 0.3],
              def: { G2: [-3.4, 6.4] },
            },
            {
              texte: "L'arrière gauche tire à gauche du 2 gauche.",
              courses: { ArG: [-5.2, 6.6] },
              tir: { par: 'ArG', t: 0.6 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'backovergang-bagom',
      nom: "Traversée d'arrière par derrière",
      alias: 'Backovergang bagom (DA, x305), Backcourt running behind (EN)',
      categorie: 'Contre 5-1',
      defense: '5-1 (avec un avancé)',
      dispositif: '5-1',
      resume: "Le demi-centre attire l'avancé à droite; l'arrière droit traverse dans son dos jusqu'à gauche et attaque entre le 1 et le 2 gauches.",
      description: [
        "Fiche danoise de Dragør HK (x305, sans traduction française), pour une défense avec un \"1 avancé\". L'arrière droit passe au demi-centre, qui attaque vers la droite et attire l'avancé. Après sa passe, l'arrière droit court derrière le demi-centre. Le demi-centre passe à l'arrière gauche, qui avance vers le centre et attire un défenseur vers l'intérieur. L'arrière gauche sert l'arrière droit, qui attaque l'intervalle entre le 1 et le 2; s'il ne peut pas tirer, il donne à l'ailier gauche, qui tire à l'extérieur du 1.",
        "Le texte danois et anglais mélange les côtés de la défense; le schéma de la fiche montre clairement la traversée de l'arrière droit jusqu'à l'intervalle 1-2 gauche, c'est lui qui est suivi ici.",
      ],
      objectif: "Emmener l'avancé d'un côté et faire arriver un arrière lancé de l'autre côté, là où la défense s'est vidée.",
      pointsCles: [
        "Le demi-centre attaque franchement vers la droite pour emmener l'avancé.",
        "L'arrière droit part dès sa passe et passe derrière le demi-centre.",
        "L'arrière gauche avance vers le centre pour attirer le 2 gauche à l'intérieur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Backovergang bagom (Dragør HK, version danoise, x305)',
          url: DRAGOR_DA(305),
          note: '"Efter afleveringen løber HB bagom PM"; "VB spiller HB, som nu skulle være i position til at modtage bolden og kan angribe mellem forsvarets H1 og H2".',
        },
        {
          titre: 'Backcourt running behind (Dragør HK, version anglaise, z305)',
          url: DRAGOR_EN(305),
          note: '"If a shot cannot be made, (RB) can pass the ball to LW, who can shoot on the outside of the defending R1."',
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...BAGOM_BASE,
            { texte: "L'arrière droit tire entre le 1 et le 2 gauches.", tir: 'ArD' },
          ],
        },
        {
          nom: "2 - Passe à l'ailier gauche",
          etapes: [
            ...BAGOM_BASE,
            {
              texte: "Le 1 gauche sort sur l'arrière droit: celui-ci donne à l'ailier gauche.",
              courses: { AiG: { vers: [-8.0, 3.4], via: [-9.4, 2.6] } },
              passe: ['ArD', 'AiG', 0.4],
              def: { G1: [-6.4, 5.4] },
            },
            { texte: "L'ailier gauche tire à l'extérieur du 1 gauche.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'centerundergang',
      nom: "Passage du demi-centre derrière l'avancé",
      alias: 'Centerundergang (DA, x1044), Center running under (EN)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Après un croisé avec l'arrière droit, le demi-centre plonge derrière l'avancé, au centre; le pivot bloque le défenseur central et l'arrière droit le sert.",
      description: [
        "Fiche danoise de Dragør HK (x1044). L'arrière gauche passe au demi-centre, qui court vers la droite. L'arrière droit croise derrière lui et reçoit. L'arrière droit continue vers le 2 gauche; pendant ce temps, le demi-centre file derrière l'avancé. Le pivot fait écran sur le défenseur central. L'arrière droit passe au demi-centre, qui tire.",
        "Placements lus sur le schéma: le défenseur central est un peu décalé à droite et le pivot est à sa gauche; l'arrière gauche s'écarte vers l'aile pour laisser la place.",
      ],
      objectif: "Exploiter l'espace dans le dos de l'avancé, quand il suit le ballon.",
      pointsCles: [
        "L'avancé doit être attiré par le croisé, puis par la course de l'arrière droit vers la gauche.",
        "Le demi-centre passe derrière l'avancé, hors de son champ de vision.",
        "Le pivot bloque le central pour qu'il ne ferme pas sur le demi-centre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Centerundergang (Dragør HK, version danoise, x1044)',
          url: DRAGOR_DA(1044),
          note: "\"PM rykker ind bag forsvarets fremskudte 'etter' / ST screener forsvarets H3 / HB spiller PM, som kan afslutte\".",
        },
        {
          titre: 'Center running under (Dragør HK, version anglaise, z1044)',
          url: DRAGOR_EN(1044),
          note: '"PM moves in behind the defending Center Forward (No. 1). CR puts a screening on the defending R3."',
        },
      ],
      depart: { Piv: [0.6, 6.5], G3: [1.8, 6.6] },
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche passe au demi-centre, qui court vers la droite et reçoit. L'avancé le suit.",
          courses: { DC: [2.6, 9.0] },
          passe: ['ArG', 'DC', 0.4],
          def: { D3: [1.6, 8.6] },
        },
        {
          texte: "L'arrière droit croise derrière le demi-centre et reçoit.",
          courses: { DC: [3.4, 8.4], ArD: { vers: [1.4, 10.0], via: [3.0, 10.8] } },
          passe: ['DC', 'ArD', 0.55],
        },
        {
          texte: "L'arrière droit continue vers le 2 gauche et emmène l'avancé. Le demi-centre plonge derrière l'avancé, vers le centre des 6 m. Le pivot bloque le défenseur central. L'arrière gauche s'écarte.",
          courses: {
            ArD: { vers: [-3.6, 7.6], via: [-1.2, 9.4] },
            DC: { vers: [-0.1, 6.4], via: [1.4, 8.0] },
            Piv: { vers: [1.1, 6.8], ecran: true },
            ArG: [-7.0, 7.4],
          },
          def: { D3: [-1.8, 8.6], G2: [-4.2, 6.2], G3: [2.0, 6.8] },
        },
        {
          texte: "L'arrière droit passe au demi-centre.",
          passe: ['ArD', 'DC', 0.3],
        },
        { texte: 'Le demi-centre tire.', tir: 'DC' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'backovergang-dobbelt',
      nom: "Traversée d'arrière, double passe",
      alias: 'Backovergang - dobbelt aflevering (DA, x724), Back running over - double pass (EN)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'arrière gauche traverse vers la droite pendant que le demi-centre et l'arrière droit partent vers la gauche; l'arrière droit croise derrière lui et attaque entre le 2 et le 3 gauches. Trois fins.",
      description: [
        "Fiche danoise de Dragør HK (x724). L'ailier gauche passe à l'arrière gauche et part en profondeur. L'arrière gauche fixe, passe au demi-centre et traverse aussitôt vers la droite; suit un jeu de passes très rapide. Le demi-centre lui rend le ballon et part, avec l'arrière droit, vers la gauche, en \"Bivogn-overgang\" (la traversée du Randonneur). L'arrière gauche passe à l'arrière droit, qui croise derrière lui et peut tirer entre le 2 et le 3.",
        "Sinon, l'arrière droit sert le demi-centre, qui attaque à l'extérieur du 2; si le 1 rentre sur lui, le ballon va à l'ailier gauche, qui vient au-devant de la passe et tire. Le texte danois mélange les côtés; le schéma de la fiche place toute la fin du côté gauche de l'attaque, ce qui est montré ici.",
        "Fiche voisine: le Randonneur (variante de l'Espagnole).",
      ],
      objectif: "Croiser les courses de trois arrières pour désorganiser le côté gauche de la défense.",
      pointsCles: [
        "Les passes s'enchaînent très vite, sans arrêt.",
        "L'arrière droit doit fixer et tenir le 2 gauche par son attaque.",
        "L'ailier gauche, parti en profondeur, revient au-devant de la passe.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Backovergang - dobbelt aflevering (Dragør HK, version danoise, x724)',
          url: DRAGOR_DA(724),
          note: '"PM kaster til VB og løber sammen med HB en Bivognsovergang til venstre".',
        },
        {
          titre: 'Back running over - double pass (Dragør HK, version anglaise, z724)',
          url: DRAGOR_EN(724),
          note: '"RB might take the shot between the defending R2 and R3. If not the ball is passed to PM, who attacks on the outside of the defending R2."',
        },
      ],
      depart: { AiG: [-9.4, 4.4], Piv: [2.9, 6.5] },
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...DOBBELT_BASE,
            { texte: "L'arrière droit tire entre le 2 et le 3 gauches.", tir: 'ArD' },
          ],
        },
        {
          nom: "2 - Le demi-centre à l'extérieur du 2",
          etapes: [
            ...DOBBELT_BASE,
            DOBBELT_DC,
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "3 - Ballon basculé à l'ailier gauche",
          etapes: [
            ...DOBBELT_BASE,
            DOBBELT_DC,
            {
              texte: "Le 1 gauche rentre sur le demi-centre: l'ailier gauche vient au-devant de la passe et reçoit.",
              courses: { AiG: { vers: [-7.4, 3.2], via: [-9.0, 2.2] } },
              passe: ['DC', 'AiG', 0.4],
              def: { G1: [-5.6, 5.4] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'backovergang-3-2-1',
      nom: "Traversée d'arrière contre 3-2-1",
      alias: 'Backovergang mod 3-2-1 (DA, x877), Backcourt running in against 3-2-1 (EN)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "L'arrière droit traverse en diagonale vers la gauche et sert l'arrière gauche, qui attaque; selon la défense, le ballon revient à l'arrière droit rentrant, va au pivot, ou au demi-centre passé au poste d'arrière droit.",
      description: [
        "Fiche danoise de Dragør HK (x877) contre 3-2-1. L'ailier droit passe à l'arrière droit, lancé en course de traversée. L'arrière droit court en diagonale vers la gauche; l'avancé et le demi-avancé gauche veulent se resserrer sur lui. Avant, il passe à l'arrière gauche, qui attaque droit devant: l'avancé suit le ballon.",
        "Fins: 1. retour du ballon à l'arrière droit, qui continue sa course vers l'intérieur; 2. passe au pivot, libre si le défenseur central prend l'arrière droit rentrant; 3. si l'avancé redescend sur le pivot et que le central prend l'arrière droit, passe au demi-centre, passé au poste d'arrière droit, qui peut tirer si le 2 droit n'est pas en place.",
      ],
      objectif: "Faire bouger les défenseurs avancés de la 3-2-1 par une traversée, puis exploiter le défenseur qui manque.",
      pointsCles: [
        "L'arrière droit lâche le ballon avant que l'avancé et le demi-avancé se referment.",
        "L'arrière gauche attaque droit devant pour attirer l'avancé.",
        "Le demi-centre occupe le poste laissé libre par l'arrière droit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Backovergang mod 3-2-1 (Dragør HK, version danoise, x877)',
          url: DRAGOR_DA(877),
          note: '"Bolden kan spilles retur til den fortsat indløbende HB" / "Bolden spilles stregen, som kan blive fri".',
        },
        {
          titre: 'Backcourt running in against 3-2-1 (Dragør HK, version anglaise, z877)',
          url: DRAGOR_EN(877),
          note: '"the ball can be passed to PM, who has moved to the position of RB and may have the opportunity to shoot, if the defending LB is not ready."',
        },
      ],
      depart: { AiD: [9.4, 4.4] },
      ballon: 'AiD',
      variantes: [
        {
          nom: "1 - Retour à l'arrière droit rentrant",
          etapes: [
            ...BACK321_BASE,
            {
              texte: "L'arrière gauche rend le ballon à l'arrière droit, qui continue vers l'intérieur.",
              courses: { ArD: [-2.8, 7.0] },
              passe: ['ArG', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...BACK321_BASE,
            {
              texte: "Le défenseur central sort sur l'arrière droit rentrant: le pivot est libre. L'arrière gauche le sert.",
              courses: { Piv: [0.8, 6.4] },
              passe: ['ArG', 'Piv', 0.3],
              def: { G3: [-1.2, 6.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Demi-centre au poste d'arrière droit",
          etapes: [
            ...BACK321_BASE,
            {
              texte: "L'avancé redescend sur le pivot et le central prend l'arrière droit. L'arrière gauche sert le demi-centre, passé au poste d'arrière droit.",
              courses: { DC: [4.2, 9.0] },
              passe: ['ArG', 'DC', 0.4],
              def: { D3: [0.8, 7.6], G3: [-1.2, 6.6] },
            },
            {
              texte: "Le 2 droit n'est pas en place: le demi-centre tire.",
              courses: { DC: [4.6, 8.4] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'flojovergang-modsat-back',
      nom: "Traversée d'ailier avec traversée de l'arrière opposé",
      alias: 'Fløjovergang med modsat backovergang (DA, x1034), Wing running in with opposite backcourt running in (EN)',
      categorie: 'Circulation',
      defense: 'Toutes',
      resume: "L'ailier droit traverse tout le terrain balle en main; l'arrière gauche fixe derrière lui, puis traverse à son tour dans le dos du demi-centre pour conclure à droite.",
      description: [
        "Fiche danoise de Dragør HK (x1034). Le ballon part de l'ailier droit, qui passe à l'arrière droit et commence aussitôt une course de traversée; l'arrière droit lui rend le ballon. L'ailier donne à l'arrière gauche, qui fixe juste derrière lui, entre le 2 et le 3 gauches. Le demi-centre s'engage à l'opposé, entre le 3 et le 2 droits, et reçoit de l'arrière gauche.",
        "L'arrière droit s'écarte vers l'extérieur; l'arrière gauche traverse dans le dos du demi-centre, qui avance. Le demi-centre donne à l'arrière droit, qui sert aussitôt l'arrière gauche lancé.",
        "Le texte danois fait conclure l'arrière gauche \"entre V1 et V2\" (côté gauche), mais le schéma le montre tirer à droite, entre le 2 et le 1 droits, au bout de sa traversée: c'est le schéma qui est suivi ici. Sur le schéma, l'ailier droit poursuit sa course jusqu'à l'aile gauche.",
      ],
      objectif: "Enchaîner deux traversées en sens opposés pour que la défense perde ses repères.",
      pointsCles: [
        "Le timing des courses est primordial: aucun arrêt pendant l'action.",
        "L'arrière gauche fixe juste derrière la course de l'ailier.",
        "L'arrière droit s'écarte pour ouvrir l'espace où arrive l'arrière gauche.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Fløjovergang med modsat backovergang (Dragør HK, version danoise, x1034)',
          url: DRAGOR_DA(1034),
          note: '"PM afleverer bolden til HB, som straks afleverer bolden til den overgangsløbende VB, som afslutter mellem forsvarets V1 og V2."',
        },
        {
          titre: 'Wing running in with opposite backcourt running in (Dragør HK, version anglaise, z1034)',
          url: DRAGOR_EN(1034),
          note: '"The timing is very important in order to avoid any hesitation while running and passing."',
        },
      ],
      depart: { AiD: [9.4, 4.6] },
      ballon: 'AiD',
      etapes: [
        {
          texte: "L'ailier droit passe à l'arrière droit et commence aussitôt une course de traversée vers la gauche.",
          courses: { AiD: { vers: [6.6, 8.6], via: [8.4, 7.4] }, ArD: [7.0, 9.8] },
          passe: ['AiD', 'ArD', 0.1],
        },
        {
          texte: "L'arrière droit lui rend le ballon.",
          courses: { AiD: [4.4, 8.6] },
          passe: ['ArD', 'AiD', 0.2],
        },
        {
          texte: "Toujours en course, l'ailier droit donne à l'arrière gauche, qui vient fixer juste derrière lui.",
          courses: { AiD: [-1.4, 9.0], ArG: [-4.4, 8.6] },
          passe: ['AiD', 'ArG', 0.3],
        },
        {
          texte: "L'arrière gauche attaque entre le 2 et le 3 gauches. Le demi-centre s'engage à l'opposé, entre le 3 et le 2 droits, et reçoit. L'ailier droit poursuit sa course jusqu'à l'aile gauche.",
          courses: {
            ArG: [-3.4, 7.6],
            DC: { vers: [3.0, 7.6], via: [1.0, 9.4] },
            AiD: { vers: [-7.2, 6.8], via: [-5.6, 9.6] },
          },
          passe: ['ArG', 'DC', 0.6],
          def: { G2: [-4.2, 6.4], G3: [-2.2, 7.0], D3: [2.0, 7.0], D2: [4.2, 6.0] },
        },
        {
          texte: "L'arrière droit s'écarte vers l'extérieur. L'arrière gauche traverse dans le dos du demi-centre, qui avance et donne à l'arrière droit.",
          courses: {
            ArD: { vers: [8.6, 5.8], via: [8.2, 8.6] },
            ArG: { vers: [3.2, 9.2], via: [0.0, 10.4] },
            DC: [3.0, 7.0],
          },
          passe: ['DC', 'ArD', 0.5],
          def: { D3: [1.9, 6.8], D2: [4.0, 6.0], D1: [7.6, 3.6] },
        },
        {
          texte: "L'arrière droit sert aussitôt l'arrière gauche, qui arrive lancé entre le 2 et le 1 droits.",
          courses: { ArG: { vers: [5.6, 5.8], via: [4.8, 8.2] } },
          passe: ['ArD', 'ArG', 0.2],
          def: { D2: [4.4, 6.2] },
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'floj-dobbeltscreening',
      nom: "Traversée de l'ailier à travers un double écran",
      alias: 'Fløjovergang gennem dobbeltscreening (DA, x1054), Wing running in through double screening (EN)',
      categorie: 'Écrans et blocs',
      defense: 'Toutes',
      resume: "Après un croisé avec le demi-centre, l'ailier gauche traverse et s'engage dans la \"porte\" ouverte entre l'écran du pivot et celui de l'arrière gauche.",
      description: [
        "Fiche danoise de Dragør HK (x1054). Le demi-centre lance une course vers l'aile gauche et reçoit de l'arrière gauche. Il croise avec l'ailier gauche, qui reçoit et fixe le 2 gauche. Juste avant le contact, l'ailier passe à l'arrière gauche, qui court vers le 3 gauche et sert en course l'arrière droit, engagé entre le 3 et le 2 droits.",
        "L'arrière gauche continue et pose un écran à l'intérieur du 3 droit; le pivot pose un écran sur le 3 gauche. L'ailier gauche s'engage entre les deux écrans, reçoit de l'arrière droit et conclut. Le texte mélange les côtés; les placements suivent le schéma de la fiche.",
      ],
      objectif: "Ouvrir une porte au centre par deux écrans et y lancer l'ailier, qui arrive de l'autre côté.",
      pointsCles: [
        "Le timing est très important: l'ailier arrive au moment où les deux écrans sont posés.",
        "L'ailier passe juste avant d'être contré par le 2.",
        "L'arrière droit s'engage pour fixer le 2 droit avant de servir l'ailier.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Fløjovergang gennem dobbeltscreening (Dragør HK, version danoise, x1054)',
          url: DRAGOR_DA(1054),
          note: '"VF løber ind mellem den screenende ST og screenende VB, modtager bolden fra HB og afslutter".',
        },
        {
          titre: 'Wing running in through double screening (Dragør HK, version anglaise, z1054)',
          url: DRAGOR_EN(1054),
          note: '"LW moves in between the screening CR and the screening LB, receives the ball from RB and shoots. Timing is very important in this attack."',
        },
      ],
      ballon: 'ArG',
      etapes: [
        {
          texte: "Le demi-centre lance une course vers l'aile gauche; l'arrière gauche lui passe. L'ailier gauche remonte.",
          courses: { DC: { vers: [-4.0, 8.4], via: [-2.0, 10.4] }, ArG: [-6.0, 9.8], AiG: [-9.4, 3.4] },
          passe: ['ArG', 'DC', 0.5],
        },
        {
          texte: "Le demi-centre croise avec l'ailier gauche, qui coupe vers l'intérieur et reçoit.",
          courses: { DC: { vers: [-7.6, 6.0], via: [-6.0, 7.6] }, AiG: { vers: [-6.0, 7.4], via: [-9.0, 8.2] } },
          passe: ['DC', 'AiG', 0.55],
          def: { G1: [-7.6, 3.6] },
        },
        {
          texte: "L'ailier fixe le 2 gauche. Juste avant le contact, il donne à l'arrière gauche, qui court vers le 3 gauche.",
          courses: { AiG: [-5.2, 7.0], ArG: [-2.6, 8.4] },
          passe: ['AiG', 'ArG', 0.5],
          def: { G2: [-4.8, 6.0], G3: [-2.2, 7.2] },
        },
        {
          texte: "En course, l'arrière gauche passe à l'arrière droit, qui s'engage entre le 3 et le 2 droits.",
          courses: { ArG: [-0.2, 7.8], ArD: [3.6, 7.6] },
          passe: ['ArG', 'ArD', 0.3],
          def: { D2: [4.2, 6.2], D3: [2.2, 6.8], G3: [-1.9, 6.8] },
        },
        {
          texte: "L'arrière gauche pose un écran à l'intérieur du 3 droit, le pivot un écran sur le 3 gauche: une \"porte\" s'ouvre entre eux. L'ailier gauche arrive.",
          courses: {
            ArG: { vers: [1.0, 6.9], ecran: true },
            Piv: { vers: [-1.0, 6.7], ecran: true },
            AiG: { vers: [-1.4, 8.4], via: [-3.4, 7.8] },
          },
          def: { D3: [2.0, 6.7], G3: [-2.0, 6.6] },
        },
        {
          texte: "L'arrière droit sert l'ailier gauche, face à la porte.",
          courses: { AiG: [0, 7.6], ArD: [3.6, 8.0] },
          passe: ['ArD', 'AiG', 0.3],
        },
        {
          texte: "L'ailier passe entre les deux écrans et tire.",
          courses: { AiG: [0, 6.4] },
          tir: { par: 'AiG', t: 0.6 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'zabeh-spojky',
      nom: "Rentrée de l'arrière latéral jusqu'au côté opposé",
      alias: 'Záběh spojky (CZ)',
      categorie: 'Jeu avec le pivot',
      defense: 'Surtout 5-1',
      dispositif: '5-1',
      resume: "L'arrière gauche donne à son ailier puis traverse toute la défense jusqu'au 2 droit; le demi-centre prend sa place et reçoit de l'ailier: tir, pivot ou renversement.",
      description: [
        "Combinaison \"sur signal\" de l'équipe tchèque de TJ Sokol Nové Veselí, décrite dans un mémoire de l'Université Charles de Prague (K. Kubišová, 2020), \"surtout adaptée contre une 1-5\" (5-1).",
        "L'arrière latéral passe à son ailier, qui doit s'écarter de la défense pour pouvoir recevoir, puis rentre dans la défense et la traverse jusqu'au côté opposé, où il se place à côté du défenseur 2. Le pivot est placé entre le 2 et le 3 (ici à gauche; le côté n'est pas précisé). Le demi-centre glisse au poste libéré et reçoit de l'ailier, en course vers la défense.",
        "Fins: le demi-centre tire lui-même (souvent un tir rapide en appui, plusieurs fois à Nové Veselí), sert le pivot, ou renverse le jeu vers l'autre arrière latéral, qui termine l'action.",
      ],
      objectif: "Passer à deux pivots en surchargeant le côté opposé, et libérer le demi-centre dans le couloir de l'arrière.",
      pointsCles: [
        "L'ailier s'écarte de la défense pour recevoir sans risque.",
        "L'arrière rentre juste après sa passe et va jusqu'au 2 du côté opposé.",
        "Le demi-centre reçoit lancé vers la défense.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál (Univ. Charles, Prague, 2020), p. 34-35',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: '"Krajní spojka po odhození míče na své křídlo [...] zabíhá do obrany soupeře. Dobíhá až na protější stranu, kde se staví k druhému krajnímu obránci."',
        },
      ],
      depart: { Piv: [-2.8, 6.4] },
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Tir du demi-centre',
          etapes: [
            ...ZABEH_BASE,
            { texte: "Le demi-centre tire tout de suite, en appui.", tir: 'DC' },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...ZABEH_BASE,
            {
              texte: "Le 2 gauche sort sur le demi-centre: celui-ci sert le pivot, dans son dos.",
              courses: { Piv: [-3.0, 6.2] },
              passe: ['DC', 'Piv', 0.4],
              def: { G2: [-4.0, 7.2] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Renversement vers l'arrière droit",
          etapes: [
            ...ZABEH_BASE,
            {
              texte: "La défense se resserre à gauche: le demi-centre renverse vers l'arrière droit.",
              courses: { ArD: [4.8, 8.8] },
              passe: ['DC', 'ArD', 0.2],
              def: { D3: [0.8, 7.9] },
            },
            {
              texte: "L'arrière droit attaque le 2 droit, gêné par l'arrière gauche placé à côté de lui, et tire.",
              courses: { ArD: [5.0, 7.6] },
              tir: { par: 'ArD', t: 0.6 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rentree-arriere-2e-pivot',
      nom: "Rentrée d'arrière en 2e pivot (enclenchements FFHB)",
      alias: '"Rentrée en 2e pivot de l\'arrière", "la bis", "rentrée d\'arrière côté balle, côté pivot" (FR)',
      categorie: 'Jeu avec le pivot',
      defense: 'Tous dispositifs; 1-5 / défense haute selon la variante',
      resume: "Un arrière donne son ballon puis rentre aux 6 m comme second pivot; le jeu se poursuit à deux pivots, dans le secteur que sa rentrée a déséquilibré.",
      description: [
        "Enclenchement très utilisé dans les sélections françaises. Fiches voisines: entrée du demi-centre en 2e pivot (le demi-centre rentre au lieu d'un arrière), passage au pivot d'un arrière latéral (version allemande, \"Übergang Halb\").",
        "Variante 1 (D. Chastel, interligues féminins, Approches n°179): l'arrière droite passe à la demi-centre et rentre en 2e pivot entre les n°2 et n°3 à gauche; le pivot est entre les n°2 et n°3 à droite. La demi-centre \"équilibre le trapèze\" et passe à l'arrière gauche. Buts cités: compenser l'absence d'une arrière droite gauchère, écraser la défense, ouvrir un espace central à l'arrière, poser un problème de répartition aux centrales. La rentrée peut aussi se faire sur le 1er pivot, qui glisse. La fin n'est pas décrite: le tir de l'arrière gauche est un exemple.",
        "Variantes 2 à 4 (É. Quintin, défense plutôt haute, Approches n°126, 154 et 157): l'arrière \"entrant\", côté pivot, fixe avant de libérer son ballon puis rentre vers l'opposé. Le demi-centre fixe l'avancé (dilemme: le suivre ou rester côté ballon), sert l'arrière opposé et se replace vite dans le couloir de l'arrière entré. L'arrière opposé oriente sa course vers l'extérieur avant de revenir à l'intérieur: il détient le \"temps fort\". Le pivot reste écarté: diagonale si le n°2 oublie de passer devant lui, bloc si le n°2 passe devant et que le demi-centre est libre, sortie en poste si le demi-centre est suivi en stricte par le 3 haut (fin non détaillée, non montrée). Tir de l'arrière si le 3 bas est en retard.",
        "Variantes 5 et 6 (\"la bis\", n°157): l'arrière droit fixe et provoque, donne à l'ailier droit, puis rentre en 2e pivot le long de la zone vers le centre-gauche; le demi-centre se décale à droite. Si le 3 haut ne le suit pas: 3 contre 2 à droite; s'il le suit: l'ailier droit sert l'arrière gauche dans le secteur central, en 1 contre 1 sur le 3 bas. Variante 7 (Norvège, Mondial féminin 2013, Approches n°140): pivot dans l'intervalle 1-2; l'arrière droite fixe à l'extérieur, passe à la demi-centre et rentre en emmenant la n°3, qui flotte vers l'intérieur et ouvre l'intervalle 2-3; la demi-centre renverse vers l'ailière droite, qui attaque fort cet intervalle en relation avec le pivot (duel du pivot sur la n°1).",
        "Placements reconstitués d'après les textes (schémas consultés pour le n°157 seulement).",
      ],
      objectif: "Passer à deux pivots pour écraser la défense et ouvrir un espace à un arrière ou à l'ailier.",
      pointsCles: [
        "L'arrière qui rentre fixe et provoque avant de lâcher le ballon.",
        "Le demi-centre rééquilibre aussitôt: il occupe le couloir laissé par l'arrière entré.",
        "L'arrière opposé part d'abord vers l'extérieur, puis revient à l'intérieur au bon moment.",
        "Le pivot lit le n°2: diagonale, bloc ou sortie en poste.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 2)", Approches du Handball n°179 (2020)',
          url: 'https://www.calameo.com/ffhandball/read/007275111bfe7378958a5?page=23',
          note: "\"L'arrière droite fait la passe à la demi-centre et rentre en 2ème pivot entre les défenseures n°2 et n°3 à gauche.\"",
        },
        {
          titre: 'É. Quintin, "Des repères et des savoir-faire pour s\'adapter", Approches du Handball n°126 (2011), annexe',
          url: 'https://www.calameo.com/ffhandball/read/0072751118dcaa10e6817?page=32',
          note: "La rentrée d'arrière côté ballon, côté pivot: l'arrière entrant fixe, transmet au DC et entre vers le secteur intérieur opposé; le DC fixe l'avancé, transmet à l'arrière opposé et se replace.",
        },
        {
          titre: 'É. Quintin et A. Kavcic, Approches du Handball n°154 (2016)',
          url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=22',
          note: 'Rôles des quatre joueurs; lectures du pivot (diagonale, bloc, poste).',
        },
        {
          titre: 'É. Quintin, "Favoriser le jeu en lecture", Approches du Handball n°157 (2017)',
          url: 'https://www.calameo.com/ffhandball/read/007275111ece7fcff65f0?page=24',
          note: "\"Jeu sur rentrée d'arrière, \"la bis\". L'arrière doit fixer et provoquer avant de donner à l'aile et de rentrer en 2ème pivot.\"",
        },
        {
          titre: "L'utilisation de l'intervalle 1-2 par le pivot (groupe LFH), Approches du Handball n°140 (2014)",
          url: 'https://www.calameo.com/ffhandball/read/0072751117ab39c5a79db?page=43',
          note: "Norvège: l'ARD fixe extérieur, passe à la DC et rentre en emmenant le n°3; la DC renverse à l'ALD qui attaque fort entre 2-3 en relation avec le pivot 1-2.",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Rentrée de l'arrière droit à l'opposé (Chastel)",
          depart: { Piv: [3.2, 6.5] },
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre et rentre en second pivot, le long de la défense, entre le 3 et le 2 gauches.",
              courses: { ArD: { vers: [-3.2, 6.6], via: [0.2, 8.2] }, DC: [0.4, 9.8] },
              passe: ['ArD', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre se décale à droite pour équilibrer le trapèze et passe à l'arrière gauche. Les centraux sont occupés par les deux pivots.",
              courses: { DC: [2.0, 10.0], ArG: [-4.0, 9.4] },
              passe: ['DC', 'ArG', 0.5],
              def: { G3: [-2.2, 7.0], G2: [-4.4, 5.8] },
            },
            {
              texte: "L'arrière gauche attaque l'espace central ouvert et tire.",
              courses: { ArG: [-1.0, 8.4] },
              tir: { par: 'ArG', t: 0.6 },
              def: { D3: [1.2, 7.0] },
            },
          ],
        },
        {
          nom: "2 - Côté balle, côté pivot: tir de l'arrière opposé (Quintin)",
          dispositif: '5-1',
          depart: { Piv: [6.0, 4.6] },
          etapes: [
            ...QUINTIN_BASE,
            {
              texte: "L'avancé a suivi le demi-centre et le 3 bas reste près du second pivot, en retard: l'arrière gauche attaque l'intervalle et tire.",
              courses: { ArG: [-0.6, 7.8] },
              tir: { par: 'ArG', t: 0.6 },
              def: { D3: [1.8, 9.0], G3: [-2.0, 6.8] },
            },
          ],
        },
        {
          nom: '3 - Côté balle, côté pivot: diagonale au pivot',
          dispositif: '5-1',
          depart: { Piv: [6.0, 4.6] },
          etapes: [
            ...QUINTIN_BASE,
            {
              texte: "Le 2 droit a oublié de passer devant le pivot: passe en diagonale de l'arrière gauche au pivot.",
              courses: { Piv: [5.8, 5.0] },
              passe: ['ArG', 'Piv', 0.3],
              def: { D2: [5.2, 6.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Côté balle, côté pivot: bloc pour le demi-centre',
          dispositif: '5-1',
          depart: { Piv: [6.0, 4.6] },
          etapes: [
            ...QUINTIN_BASE,
            {
              texte: "Le 2 droit passe devant le pivot et le demi-centre est libre: le pivot bloque le 2 droit, l'arrière gauche sert le demi-centre.",
              courses: { Piv: { vers: [5.0, 5.6], ecran: true }, DC: [3.8, 8.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { D2: [5.6, 6.4] },
            },
            {
              texte: 'Le demi-centre tire.',
              courses: { DC: [3.6, 7.8] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: '5 - "La bis": 3 contre 2 à droite',
          dispositif: '5-1',
          depart: { Piv: [6.0, 4.6] },
          etapes: [
            ...BIS_BASE,
            {
              texte: "L'avancé ne suit pas le demi-centre décalé: l'ailier droit lui donne. Il reste 3 attaquants (ailier, demi-centre, pivot) contre le 2 et le 1 droits.",
              courses: { DC: [4.2, 8.8] },
              passe: ['AiD', 'DC', 0.3],
              def: { D3: [0.2, 8.8], D2: [4.6, 7.2] },
            },
            {
              texte: "Le 2 droit sort sur le demi-centre et le 1 reste entre l'ailier et le pivot: le demi-centre sert le pivot.",
              courses: { Piv: [5.4, 5.4] },
              passe: ['DC', 'Piv', 0.4],
              def: { D2: [4.4, 7.6], D1: [7.0, 4.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '6 - "La bis": 1 contre 1 au centre',
          dispositif: '5-1',
          depart: { Piv: [6.0, 4.6] },
          etapes: [
            ...BIS_BASE,
            {
              texte: "L'avancé suit le demi-centre décalé: l'ailier droit sert l'arrière gauche, qui arrive dans le secteur central.",
              courses: { ArG: { vers: [-1.0, 9.0], via: [-3.6, 9.2] } },
              passe: ['AiD', 'ArG', 0.3],
              def: { D3: [3.4, 8.8] },
            },
            {
              texte: "L'arrière gauche joue son 1 contre 1 sur le 3 bas et tire.",
              courses: { ArG: [0.4, 7.8] },
              tir: { par: 'ArG', t: 0.6 },
              def: { G3: [-0.4, 7.0] },
            },
          ],
        },
        {
          nom: "7 - Norvège 2013: l'arrière emmène le n°3",
          depart: { Piv: [6.6, 4.2] },
          etapes: [
            {
              texte: "Pivot dans l'intervalle 1-2 droit. L'arrière droit fixe à l'extérieur.",
              courses: { ArD: [6.0, 8.0] },
              def: { D2: [5.6, 6.6] },
            },
            {
              texte: "Il passe au demi-centre et rentre vers l'intérieur en emmenant le 3 droit, qui flotte vers l'intérieur: l'intervalle 2-3 droit s'ouvre. L'ailier droit remonte à la place de l'arrière.",
              courses: { ArD: { vers: [-0.6, 7.2], via: [3.4, 7.6] }, AiD: { vers: [7.2, 7.6], via: [9.4, 4.4] } },
              passe: ['ArD', 'DC', 0.1],
              def: { D3: [0.6, 6.8], G3: [-1.8, 6.6] },
            },
            {
              texte: "Le demi-centre renverse vers l'ailier droit, qui attaque fort l'intervalle entre le 2 et le 3 droits.",
              courses: { AiD: [4.0, 7.6] },
              passe: ['DC', 'AiD', 0.2],
            },
            {
              texte: "Le 3 droit revient fermer: l'ailier sert le pivot, en duel avec le 1 droit.",
              courses: { Piv: [6.2, 4.8] },
              passe: ['AiD', 'Piv', 0.4],
              def: { D3: [2.8, 7.0], D1: [7.0, 3.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rotation-dc-arriere',
      nom: 'Rotation demi-centre / arrière sans ballon',
      alias: '"Rotation entre la demi-centre et l\'arrière", permutation ARG/DC (FR)',
      categorie: 'Circulation',
      defense: '0-6',
      resume: "Le demi-centre et un arrière échangent leurs postes sans ballon; celui qui arrive au centre est servi lancé, face à des centraux qui hésitent entre lui et le pivot.",
      description: [
        "Variante 1 (sélection Île-de-France, interligues féminins, Approches n°179): sur 0-6 de zone ou fille à fille, avec le pivot entre les deux n°3 basses. La demi-centre passe à l'arrière gauche et se replace arrière droite en passant près de la défense; l'arrière droite prépare une course vers le secteur central et reçoit de l'arrière gauche. La présence du pivot fait hésiter les centrales entre sortir sur le danger et le couvrir; le danger est \"côté bras\" dans le secteur central (15 utilisations, 8 tirs favorables).",
        "Variante 2 (Norvège féminine, JO 2008, analyse d'É. Baradat, Approches n°110): contre défense alignée, appui sur l'ailière et rotation sans ballon arrière latérale / demi-centre; la demi-centre, en position d'arrière latérale, manœuvre le n°2; le pivot enchaîne dans le secteur central, dans le dos des défenseures désalignées face à l'arrière lancée au centre. Une autre forme prend appui sur l'arrière latérale, le pivot étant entre les deux 3 (non montrée). Texte sans schéma: courses reconstituées.",
        "Variante 3 (B. Blois et S. Gardillou, Approches n°74, exercice): sur le temps de la passe à l'ailier gauche, l'arrière gauche permute avec le demi-centre; quand le nouvel arrière gauche reçoit, un pivot entre dans le secteur central; il sert le joueur arrivé au poste de demi-centre. Variante: ce joueur s'engage dans un espace libre, le pivot vient bloquer son adversaire direct (bloc et remise au bloc). Fiches voisines: Yougo (croisé sans ballon), Yago.",
      ],
      objectif: "Changer les vis-à-vis de la défense et faire arriver un arrière lancé au centre.",
      pointsCles: [
        "Le joueur qui se replace passe près de la défense pour gêner sa lecture.",
        "L'arrière qui arrive au centre prépare sa course pour recevoir lancé.",
        "Le pivot entre les deux 3 crée le dilemme: sortir ou couvrir.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 2)", Approches du Handball n°179 (2020)',
          url: 'https://www.calameo.com/ffhandball/read/007275111bfe7378958a5?page=24',
          note: "\"ENCLENCHEMENT Rotation entre la demi-centre et l'arrière sur 0-6 zone ou fille à fille. Utilisé par l'Ile de France 1: 15 fois pour 8 situations favorables de tir.\"",
        },
        {
          titre: 'É. Baradat, "Réflexion sur le haut niveau féminin à partir de l\'analyse du jeu norvégien", Approches du Handball n°110 (2009)',
          url: 'https://www.calameo.com/ffhandball/read/007275111cbb20bbb2f52?page=9',
          note: "\"appui sur l'ailière et rotation sans ballon arrière latérale / demi-centre avec un temps fort de manœuvre de la demi-centre en position d'arrière latérale sur le poste 2 adverse\".",
        },
        {
          titre: 'B. Blois et S. Gardillou, "Accéder au but rapidement tout en s\'adaptant aux contraintes", Approches du Handball n°74 (2003)',
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb74_attaque4.pdf',
          note: "\"sur le temps de la passe à l'ALG, l'ARG permute avec le DC, quand l'ARG reçoit la balle, entrée d'un pivot et d'un défenseur dans le secteur central\".",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Île-de-France: l'arrière droit arrive au centre",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche et se replace arrière droit en passant près de la défense. L'arrière droit recule pour préparer sa course.",
              courses: { DC: { vers: [5.0, 9.6], via: [2.0, 7.6] }, ArD: [4.2, 11.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière droit s'élance vers le secteur central et reçoit de l'arrière gauche.",
              courses: { ArD: { vers: [0.6, 9.0], via: [3.0, 10.4] }, ArG: [-5.0, 9.2] },
              passe: ['ArG', 'ArD', 0.5],
              def: { D3: [1.4, 7.2], G3: [-1.4, 7.0] },
            },
            {
              texte: "Les deux 3 hésitent entre sortir et couvrir le pivot: l'arrière droit tire au centre, côté bras.",
              courses: { ArD: [0.2, 8.2] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Norvège 2008: appui sur l'ailière",
          ballon: 'ArG',
          etapes: [
            {
              texte: "L'arrière gauche prend appui sur l'ailière gauche.",
              courses: { AiG: [-8.6, 2.6], ArG: [-5.0, 9.0] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "Rotation sans ballon: l'arrière gauche part vers le centre, la demi-centre vient au poste d'arrière gauche en passant derrière elle.",
              courses: { ArG: { vers: [-1.2, 9.6], via: [-3.4, 8.4] }, DC: { vers: [-5.2, 9.2], via: [-2.6, 11.0] } },
            },
            {
              texte: "L'ailière donne à la demi-centre, qui manœuvre le 2 gauche. L'arrière gauche, lancée au centre, menace.",
              courses: { DC: [-4.4, 8.0], ArG: [-0.6, 9.2] },
              passe: ['AiG', 'DC', 0.2],
              def: { G2: [-4.6, 6.8], G3: [-1.8, 7.4], D3: [1.0, 7.4] },
            },
            {
              texte: "Les deux 3 montent face au danger de l'arrière au centre: le pivot enchaîne dans leur dos et reçoit.",
              courses: { DC: [-3.8, 7.6], ArG: [-0.4, 9.0], Piv: [-0.4, 6.3] },
              passe: ['DC', 'Piv', 0.4],
              def: { G3: [-1.6, 7.8], D3: [0.8, 7.8] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Permutation arrière gauche / demi-centre + entrée du pivot (Blois / Gardillou)',
          ballon: 'ArG',
          etapes: [
            {
              texte: "Sur le temps de la passe à l'ailier gauche, l'arrière gauche permute avec le demi-centre.",
              courses: {
                AiG: [-8.6, 2.6],
                ArG: { vers: [-1.0, 9.8], via: [-3.4, 8.8] },
                DC: { vers: [-5.2, 9.6], via: [-2.6, 11.2] },
              },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier sert le demi-centre, arrivé au poste d'arrière gauche. Le pivot entre dans le secteur central, côté ballon.",
              courses: { DC: [-5.0, 9.0], Piv: [-0.8, 6.4] },
              passe: ['AiG', 'DC', 0.3],
              def: { G3: [-2.0, 6.8] },
            },
            {
              texte: "Le demi-centre transmet au joueur arrivé au poste de demi-centre (l'arrière gauche).",
              courses: { ArG: [-0.6, 9.0] },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche s'engage dans l'espace libre; le pivot vient bloquer le 3 droit, son adversaire direct.",
              courses: { ArG: [0.2, 8.0], Piv: { vers: [0.9, 7.0], ecran: true } },
              def: { D3: [1.8, 7.1], G3: [-1.0, 7.2] },
            },
            {
              texte: "Le 3 gauche ferme: remise au bloc, le pivot roule vers le but et reçoit.",
              courses: { Piv: [0.4, 6.3] },
              passe: ['ArG', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'sortie-poste-rentree-dc',
      nom: "Sortie en poste du pivot et rentrée en 2e pivot à l'opposé",
      alias: '"Enclenchement de la Nouvelle-Calédonie", "poste du pivot associé à la rentrée de la demi-centre" (FR)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6; 1-5 selon la variante',
      resume: "Le pivot sort au poste et reçoit; le passeur rentre en second pivot à l'opposé, ce qui retient un défenseur et ouvre un espace à l'arrière.",
      description: [
        "Variante 1 (Nouvelle-Calédonie, interligues féminins 2019, analyse de D. Chastel, Approches n°178): contre 0-6, le pivot, entre les n°2 et n°3 à gauche, sort en poste quand la demi-centre reçoit de l'arrière droite. La demi-centre lui passe puis rentre en 2e pivot entre les n°2 et n°3 à droite. Le pivot regagne sa place; la rentrée de la demi-centre retient la n°2, qui ne peut plus sortir sur l'arrière droite. L'arrière droite exploite l'intervalle extérieur: 3 contre 2, et passe à l'ailière droite si la n°1 vient. Le passage du ballon du pivot à l'arrière droite est reconstitué.",
        "Variante 2 (Pays de la Loire, contre 1-5 fille à fille, schémas vus): la demi-centre passe au pivot sorti en poste, qui s'oriente pour relayer avec l'arrière gauche; la rentrée de la demi-centre excentre la n°3 haute; l'arrière gauche change de secteur autour du pivot et exploite le secteur central côté bras. La n°3 haute perd aussi l'information sur l'arrière droite, qui peut courir dans l'intervalle 1-2.",
        "Variante 3 (Slovénie juniors contre France, Approches n°151): tous les joueurs écartent; le pivot ressort et reçoit de l'arrière en provoquant l'alignement haut de la défense; il redonne à l'arrière de son côté pendant que l'arrière gauche rentre dans le dos de la défense, dans l'espace 1-2 à droite; l'avancé, isolé sur un trop grand espace, perd son duel. Variante 4 (Norvège féminine 2008 contre 1-5, É. Baradat): sortie en poste du pivot sur passe de la demi-centre pour jouer avec l'arrière latérale du côté de la sortie, avec un départ de l'ailière opposée à l'intérieur du dispositif. Courses des variantes 3 et 4 reconstituées.",
        "Fiche voisine: Yago (sortie du pivot et course de l'arrière opposé).",
      ],
      objectif: "Associer la sortie du pivot à une rentrée en second pivot pour retenir un défenseur et libérer un arrière.",
      pointsCles: [
        "Le pivot sort au moment où le passeur reçoit.",
        "La rentrée en second pivot se fait aussitôt après la passe au pivot.",
        "La rentrée retient un défenseur: c'est son vis-à-vis qui est attaqué.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 1)", Approches du Handball n°178 (2020)',
          url: 'https://www.calameo.com/ffhandball/read/00727511165bc273357a9?page=20',
          note: '"poste du pivot associé à la rentrée de la demi-centre. Cet enclenchement a été utilisé principalement par 3 sélections" (N.-Calédonie 14 fois / 8 tirs favorables).',
        },
        {
          titre: 'D. Fleurance, "Le réseau d\'échange sur la base arrière", Approches du Handball n°151 (2016), p. 46',
          url: 'https://www.calameo.com/ffhandball/read/007275111735cfdd874e5?page=46',
          note: "Slovénie juniors: le pivot ressort et redonne à l'arrière; l'ARG rentre dans le dos de la défense dans l'espace 1-2 à droite; l'avancé, isolé, perd son duel.",
        },
        {
          titre: 'É. Baradat, "Réflexion sur le haut niveau féminin à partir de l\'analyse du jeu norvégien", Approches du Handball n°110 (2009)',
          url: 'https://www.calameo.com/ffhandball/read/007275111cbb20bbb2f52?page=9',
          note: "\"la sortie en poste du pivot sur passe de la demi-centre pour entrer en relation avec l'arrière latérale côté sortie, conjuguée à un départ à l'intérieur du dispositif de l'ailière opposée\".",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: '1 - Nouvelle-Calédonie (0-6)',
          depart: { Piv: [-3.2, 6.5] },
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre. Le pivot, entre le 2 et le 3 gauches, s'apprête à sortir.",
              courses: { DC: [0, 9.8] },
              passe: ['ArD', 'DC', 0.1],
            },
            {
              texte: "Le pivot sort en poste; le demi-centre lui passe.",
              courses: { Piv: { vers: [-2.2, 8.8], via: [-3.4, 7.8] } },
              passe: ['DC', 'Piv', 0.6],
              def: { G3: [-2.2, 7.6] },
            },
            {
              texte: "Le demi-centre rentre en second pivot entre le 3 et le 2 droits et retient le 2 droit. Le pivot donne à l'arrière droit.",
              courses: { DC: { vers: [3.4, 6.5], via: [1.6, 8.4] }, ArD: [5.0, 9.0] },
              passe: ['Piv', 'ArD', 0.3],
              def: { D2: [4.4, 5.6] },
            },
            {
              texte: "Le pivot regagne sa place. L'arrière droit attaque l'intervalle extérieur, entre le 2 et le 1 droits: 3 contre 2. Le 1 droit sort sur lui.",
              courses: { Piv: [-3.2, 6.6], ArD: [6.4, 7.4] },
              def: { D1: [7.0, 5.4] },
            },
            {
              texte: "L'arrière droit décale l'ailier droit.",
              courses: { AiD: [8.8, 2.0] },
              passe: ['ArD', 'AiD', 0.4],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '2 - Pays de la Loire (1-5)',
          dispositif: '5-1',
          depart: { Piv: [-2.8, 6.5] },
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre.",
              courses: { DC: [0.6, 10.0] },
              passe: ['ArD', 'DC', 0.1],
            },
            {
              texte: "Le pivot, entre le 2 et le 3 gauches, sort en poste; le demi-centre lui passe.",
              courses: { Piv: { vers: [-2.0, 8.8], via: [-3.0, 7.8] } },
              passe: ['DC', 'Piv', 0.6],
              def: { G3: [-1.4, 7.4] },
            },
            {
              texte: "Le demi-centre rentre en second pivot à droite; l'avancé (le 3 haut) le suit et s'excentre. L'arrière gauche prépare sa course intérieure.",
              courses: { DC: { vers: [2.8, 6.6], via: [1.2, 8.8] }, ArG: [-5.6, 9.6] },
              def: { D3: [2.4, 7.8] },
            },
            {
              texte: "L'arrière gauche change de secteur en tournant autour du pivot, qui lui remet le ballon au centre.",
              courses: { ArG: { vers: [-0.6, 8.8], via: [-3.2, 10.4] } },
              passe: ['Piv', 'ArG', 0.5],
            },
            {
              texte: "L'arrière gauche exploite le secteur central, côté bras, et tire.",
              courses: { ArG: [0, 8.0] },
              tir: { par: 'ArG', t: 0.6 },
            },
          ],
        },
        {
          nom: "3 - Slovénie: rentrée de l'arrière opposé dans le dos",
          dispositif: '5-1',
          depart: { Piv: [2.8, 6.5] },
          etapes: [
            {
              texte: "Tous les joueurs écartent. Le pivot ressort du dispositif, côté droit, et reçoit de l'arrière droit: la défense s'aligne haut.",
              courses: { Piv: { vers: [3.0, 8.8], via: [3.4, 7.6] }, ArD: [6.0, 9.6], DC: [-1.0, 10.6], ArG: [-6.4, 9.6] },
              passe: ['ArD', 'Piv', 0.5],
              def: { D2: [4.6, 7.0], D3: [1.6, 9.2], G3: [-0.6, 7.2], G2: [-4.4, 6.4], D1: [7.2, 3.0] },
            },
            {
              texte: "Le pivot redonne à l'arrière droit (point de fixation). En même temps, l'arrière gauche rentre le long de la zone, dans le dos de la défense, jusqu'à l'intervalle 1-2 droit.",
              courses: { Piv: [1.8, 7.4], ArD: [5.4, 8.8], ArG: { vers: [6.2, 4.6], via: [0, 7.2] } },
              passe: ['Piv', 'ArD', 0.3],
              def: { G3: [-1.2, 7.0] },
            },
            {
              texte: "L'avancé, seul sur un trop grand espace, ne peut pas contenir l'arrière droit, qui perce et tire. Il pouvait aussi servir l'arrière gauche rentré.",
              courses: { ArD: [3.8, 7.4] },
              tir: { par: 'ArD', t: 0.6 },
              def: { D3: [3.0, 8.4], D2: [5.4, 6.0] },
            },
          ],
        },
        {
          nom: "4 - Norvège 2008 (1-5): avec l'ailière opposée",
          dispositif: '5-1',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le pivot sort en poste côté gauche; la demi-centre lui passe.",
              courses: { Piv: { vers: [-2.4, 8.4], via: [-0.6, 8.2] } },
              passe: ['DC', 'Piv', 0.6],
              def: { G3: [-1.4, 7.2] },
            },
            {
              texte: "L'ailière droite part à l'intérieur du dispositif, le long de la zone. L'arrière gauche se rapproche du pivot.",
              courses: { AiD: { vers: [1.8, 6.4], via: [6.0, 6.2] }, ArG: [-4.6, 9.0] },
              def: { D2: [4.4, 5.6] },
            },
            {
              texte: "L'arrière gauche tourne autour du pivot, qui lui remet le ballon.",
              courses: { ArG: { vers: [-1.2, 9.2], via: [-3.4, 9.8] } },
              passe: ['Piv', 'ArG', 0.5],
              def: { D3: [0.6, 9.4] },
            },
            {
              texte: "L'arrière gauche attaque au centre; le 3 se resserre sur elle: elle sert l'ailière rentrée.",
              courses: { ArG: [-0.4, 8.4] },
              passe: ['ArG', 'AiD', 0.5],
              def: { G3: [-0.8, 7.2] },
            },
            { texte: "L'ailière droite tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'deux-pivots-ffhb',
      nom: 'Jeu à deux pivots (séances et analyses FFHB)',
      alias: 'Jeu à 2 pivots (FR)',
      categorie: 'Jeu avec le pivot',
      defense: 'Défense alignée (0-6)',
      resume: "Formes de jeu avec deux pivots: passe au pivot sorti au poste, arrière opposé passé en 2e pivot, duel isolé d'un arrière, pivots externes.",
      description: [
        "Variante 1 (séance d'Olivier Krumbholz, équipe de France féminine, Approches n°76, 2003): un arrière fixe vers l'intérieur et passe au pivot sorti au poste; le 2e arrière, en course intérieure ou extérieure, reçoit du pivot et tire. Le second pivot vient soit d'un jeu directement à deux pivots, soit d'une joueuse de la base arrière (notamment la demi-centre) qui \"passe dedans\": c'est ce qui est montré. Réponse citée: \"pivot bloc sur le défenseur loin\" (non montrée).",
        "Variante 2 (Euro 2016, analyse de P. Kovacs, Approches n°154): l'arrière opposé à la position initiale du pivot donne son ballon, puis se place en 2e pivot dans l'espace 1-2 de son côté; le jeu se termine souvent à l'opposé, par une course de l'arrière dans son espace extérieur. Autre forme citée: rentrée d'ailier suivie d'un jeu en lecture (non montrée).",
        "Variante 3 (Normandie, interligues féminins, Approches n°179): contre 0-6 fille à fille, deux pivots, l'un entre les n°1 et n°2 à gauche, l'autre entre les n°2 et n°3 à droite; le ballon va de l'arrière droite à l'arrière gauche, qui manœuvre son vis-à-vis, la n°3 isolée. Principe d'isolement plutôt que combinaison. Le second pivot est ici la demi-centre.",
        "Variantes 4 et 5 (France, Mondial féminin 2013, Approches n°140): pivot en 1-2 et ailière qui rentre dans le 1-2 opposé (deux pivots externes); l'arrière droite reste près de la ligne de touche pour écarter. Trois exploitations: ailière gauche / pivot, demi-centre sur la n°3 isolée, arrière droite qui attaque entre la 2 et la 3 avec le 2e pivot. Les deux dernières sont montrées. Fiches voisines: entrée du demi-centre en 2e pivot, rentrée d'arrière en 2e pivot.",
      ],
      objectif: "Étirer ou écraser la défense avec deux pivots pour isoler un défenseur.",
      pointsCles: [
        "Les deux pivots occupent des intervalles différents.",
        "Le pivot qui sort au poste doit voir l'arrière qui arrive.",
        "Contre une défense qui dissuade, utiliser l'espace dans le dos du défenseur qui dissuade.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: '"Le jeu à deux pivots", séance d\'O. Krumbholz, Approches du Handball n°76 (2003)',
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb76_attaque.pdf',
          note: 'AR fixation interne, passe au pivot sorti au poste; 2e AR course interne ou externe, reçoit et tire; "pivot bloc sur le défenseur loin".',
        },
        {
          titre: "P. Kovacs, analyse de l'Euro 2016, Approches du Handball n°154 (2016)",
          url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=39',
          note: "L'arrière opposé au pivot donne sa balle puis se place en 2e pivot dans l'espace 1-2; fin à l'opposé dans l'espace externe de l'arrière.",
        },
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 2)", Approches du Handball n°179 (2020)',
          url: 'https://www.calameo.com/ffhandball/read/007275111bfe7378958a5?page=26',
          note: "\"ENCLENCHEMENT Duel de l'arrière gauche sur la défenseure n°3 à gauche sur une défense 0-6 fille à fille. Utilisé par la Normandie\".",
        },
        {
          titre: "L'utilisation de l'intervalle 1-2 par le pivot (groupe LFH), Approches du Handball n°140 (2014)",
          url: 'https://www.calameo.com/ffhandball/read/0072751117ab39c5a79db?page=43',
          note: "France: pivot en 1-2 et ailière qui rentre dans le 1-2 opposé; l'ARD reste sur la ligne de touche; 3 exploitations.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Passe au pivot sorti au poste (Krumbholz)',
          depart: { DC: [-2.8, 6.5], Piv: [2.8, 6.5] },
          etapes: [
            {
              texte: "Deux pivots: le demi-centre est passé pivot à gauche. L'arrière gauche fixe vers l'intérieur. Le pivot droit sort au poste.",
              courses: { ArG: [-3.6, 8.6], Piv: { vers: [1.6, 8.8], via: [2.8, 7.8] } },
              def: { G3: [-2.2, 7.4], G2: [-4.4, 6.2], D3: [1.4, 7.6] },
            },
            {
              texte: "L'arrière gauche passe au pivot sorti au poste.",
              passe: ['ArG', 'Piv', 0.3],
            },
            {
              texte: "L'arrière droit, en course intérieure, reçoit du pivot.",
              courses: { ArD: { vers: [2.6, 8.2], via: [5.0, 8.4] } },
              passe: ['Piv', 'ArD', 0.5],
              def: { D2: [4.4, 6.6] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "2 - L'arrière opposé passe en 2e pivot (Euro 2016)",
          depart: { Piv: [2.8, 6.5] },
          etapes: [
            {
              texte: "Le pivot est à droite. L'arrière gauche, opposé au pivot, donne son ballon au demi-centre.",
              courses: { DC: [-0.4, 9.8] },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "L'arrière gauche se place en second pivot dans l'intervalle 1-2 de son côté.",
              courses: { ArG: { vers: [-6.2, 4.4], via: [-5.2, 6.8] } },
              def: { G2: [-4.6, 5.8], G1: [-7.4, 2.6] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              courses: { ArD: [5.0, 9.0] },
              passe: ['DC', 'ArD', 0.3],
              def: { G3: [-2.2, 6.8] },
            },
            {
              texte: "L'arrière droit court dans son espace extérieur, entre le 2 et le 1 droits, et tire.",
              courses: { ArD: [6.2, 7.0] },
              tir: { par: 'ArD', t: 0.6 },
              def: { D2: [5.4, 5.8], D1: [7.6, 3.2] },
            },
          ],
        },
        {
          nom: "3 - Duel isolé de l'arrière gauche (Normandie)",
          ballon: 'ArD',
          depart: { Piv: [-6.2, 4.4], DC: [2.8, 6.5] },
          etapes: [
            {
              texte: "Deux pivots étirent la défense: l'un entre le 1 et le 2 gauches, l'autre (le demi-centre) entre le 3 et le 2 droits. L'arrière droit donne à l'arrière gauche.",
              courses: { ArG: [-4.4, 9.2] },
              passe: ['ArD', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche manœuvre son vis-à-vis, le 3 gauche, isolé: le 2 est retenu par le pivot.",
              courses: { ArG: [-2.6, 8.2] },
              def: { G3: [-2.4, 7.2], G2: [-5.2, 5.6] },
            },
            {
              texte: "Il change de direction, déborde le 3 gauche par l'intérieur et tire.",
              courses: { ArG: { vers: [-1.0, 7.6], via: [-2.2, 8.6] } },
              tir: { par: 'ArG', t: 0.7 },
            },
          ],
        },
        {
          nom: '4 - France 2013: deux pivots externes, demi-centre sur le 3 isolé',
          ballon: 'DC',
          depart: { Piv: [-6.2, 4.4] },
          etapes: [
            {
              texte: "Le pivot est dans l'intervalle 1-2 gauche. L'ailier droit rentre dans l'intervalle 1-2 droit: deux pivots externes. L'arrière droit s'écarte vers la ligne de touche.",
              courses: { AiD: { vers: [6.2, 4.4], via: [8.4, 3.6] }, ArD: [8.4, 8.0] },
              def: { D2: [5.2, 5.6], G2: [-5.2, 5.6] },
            },
            {
              texte: "La défense est étirée: le demi-centre attaque le 3 gauche, isolé.",
              courses: { DC: [-1.2, 8.4] },
              def: { G3: [-1.6, 7.4] },
            },
            {
              texte: "Il change de direction, le déborde et tire.",
              courses: { DC: { vers: [0.6, 7.4], via: [-0.2, 8.4] } },
              tir: { par: 'DC', t: 0.7 },
              def: { D3: [1.6, 6.8] },
            },
          ],
        },
        {
          nom: "5 - France 2013: l'arrière droit entre le 2 et le 3",
          ballon: 'DC',
          depart: { Piv: [-6.2, 4.4] },
          etapes: [
            {
              texte: "Le pivot est dans l'intervalle 1-2 gauche. L'ailier droit rentre dans l'intervalle 1-2 droit: deux pivots externes. L'arrière droit s'écarte vers la ligne de touche.",
              courses: { AiD: { vers: [6.2, 4.4], via: [8.4, 3.6] }, ArD: [8.4, 8.0] },
              def: { D2: [5.2, 5.6], G2: [-5.2, 5.6] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit attaque entre le 2 et le 3 droits; le 2 est retenu par le second pivot (l'ailier).",
              courses: { ArD: { vers: [3.6, 7.6], via: [6.4, 8.4] } },
              def: { D3: [2.6, 7.0] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rentrees-pivot-exterieur',
      nom: "Rentrées en 2e pivot avec le pivot placé à l'extérieur",
      alias: 'Mondial 2011: Danemark, Suède (FR)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6 / 1-5 flexible',
      resume: "Le pivot se place à l'extérieur, entre le 1 et le 2 gauches; un ailier ou un arrière rentre en second pivot pour jouer à deux pivots au centre, ou à deux pivots externes.",
      description: [
        "Situations observées chez les adversaires de l'équipe de France au Mondial 2011, du point de vue de la défense française (Approches n°127). Toutes partent d'un pivot placé à l'extérieur à gauche.",
        "Variante 1 (Danemark, finale): rentrée de l'ailier gauche en 2e pivot et tir de l'arrière droit droitier; objectif: jouer à deux pivots dans le secteur central pour déséquilibrer la défense centrale. Variante 2 (Suède, demi-finale): rentrée de l'arrière gauche en 2e pivot et jeu à deux pivots. Variante 3 (Suède): rentrée de l'arrière gauche en 2e pivot jusqu'à l'extérieur droit, d'où deux pivots externes entre les n°1 et n°2.",
        "Réponses défensives françaises: contrôler la rentrée de l'arrière, presser les deux arrières, gagner les duels, dissuader le jeu avec les pivots externes. L'article (texte dégradé, schémas non vus) ne décrit pas les fins des variantes 2 et 3: elles sont reconstituées.",
      ],
      objectif: "Déséquilibrer la défense centrale en changeant brusquement le nombre et la place des pivots.",
      pointsCles: [
        "Le pivot de départ, à l'extérieur, retient le 2 gauche.",
        "La rentrée se fait juste après la passe, pour arriver au centre avant que la défense se réorganise.",
        "Avec deux pivots externes, les deux 3 se retrouvent seuls contre la base arrière.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: '"Mondial 2011, le jeu en défense de l\'équipe de France", Approches du Handball n°127 (2011)',
          url: 'https://www.calameo.com/ffhandball/read/007275111edd3364d249b?page=19',
          note: "\"le pivot est placé à l'extérieur à gauche. Rentrée de l'ailier gauche en deuxième pivot et tir de l'arrière droit droitier\".",
        },
      ],
      depart: { Piv: [-6.2, 4.4] },
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Danemark: rentrée de l'ailier gauche, tir de l'arrière droit",
          ballon: 'AiG',
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche et rentre en second pivot vers le secteur central.",
              courses: { AiG: { vers: [-0.9, 6.4], via: [-4.8, 8.4] }, ArG: [-5.0, 9.2] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G3: [-2.2, 6.8] },
            },
            {
              texte: "L'arrière gauche passe au demi-centre. Les deux 3 sont occupés par le second pivot.",
              courses: { DC: [0, 9.8] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [1.2, 6.8] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              courses: { ArD: [4.6, 9.0] },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [4.6, 6.0] },
            },
            {
              texte: "L'arrière droit, droitier, tire de loin.",
              courses: { ArD: [4.0, 8.6] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Suède: rentrée de l'arrière gauche au centre",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre et rentre en second pivot au centre.",
              courses: { ArG: { vers: [-0.4, 6.6], via: [-3.4, 8.0] }, DC: [0, 9.8] },
              passe: ['ArG', 'DC', 0.1],
              def: { G3: [-2.0, 6.8] },
            },
            {
              texte: "Le demi-centre attaque le 3 droit, qui sort sur lui.",
              courses: { DC: [0.8, 9.0] },
              def: { D3: [1.2, 7.8] },
            },
            {
              texte: "Le second pivot se démarque dans le dos du 3 droit et reçoit.",
              courses: { ArG: [0.4, 6.4] },
              passe: ['DC', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche, au pivot, tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Suède: deux pivots externes',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre et rentre en second pivot jusqu'à l'extérieur droit, entre le 2 et le 1 droits.",
              courses: { ArG: { vers: [6.2, 4.4], via: [0.4, 7.4] }, DC: [0, 9.8] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Les deux 2 sont retenus par les pivots externes. Le demi-centre attaque le 3 droit et passe à l'arrière droit, qui arrive vers l'intérieur.",
              courses: { DC: [1.0, 8.8], ArD: { vers: [3.0, 8.4], via: [5.0, 8.8] } },
              passe: ['DC', 'ArD', 0.5],
              def: { D3: [1.4, 7.6], D2: [5.2, 5.6] },
            },
            {
              texte: "L'arrière droit, face à un seul défenseur central, perce et tire.",
              courses: { ArD: [3.2, 7.6] },
              tir: { par: 'ArD', t: 0.6 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'trois-a-gauche-trois-a-droite',
      nom: '"3 à gauche, 3 à droite" (organisation 13-15 ans)',
      alias: 'Organisation collective pour les 13-15 ans (J. Bertholet / A. Ripert)',
      categorie: 'Circulation',
      defense: 'Défenses étagées et alignées',
      resume: "Diagonale pivot / demi-centre, trois joueurs de chaque côté: l'arrière opposé au pivot prend l'initiative, l'arrière côté pivot joue avec le bloc, le demi-centre relance.",
      description: [
        "Organisation collective proposée pour les 13-15 ans par Jacky Bertholet et Alain Ripert (CTS Dauphiné-Savoie, Approches du Handball n°74, 2003). Placement: diagonale pivot / demi-centre (ici le pivot à droite et le demi-centre décalé à gauche), trois joueurs à gauche et trois à droite. L'arrière opposé au pivot joue près des 9 m pour se \"jeter\" dans l'intervalle extérieur à la réception; l'arrière côté pivot recule pour protéger le ballon et attaquer ses deux intervalles.",
        "Trois organisations s'enchaînent (schémas 3 à 5 de l'article): 1. l'arrière opposé au pivot prend l'initiative et vient au centre pour tirer, passer au demi-centre qui le protège, ou servir le pivot (variantes 1 et 2); 2. le demi-centre transmet à l'arrière côté pivot, qui peut prendre le bloc du pivot pour tirer, remettre au bloc, rendre au demi-centre, ou faire une fausse prise de bloc et décaler l'ailier (variantes 3 à 5); une \"petite rentrée\" de l'ailier opposé est aussi possible (non montrée); 3. le ballon revient au demi-centre, qui tire, joue avec le pivot qui traverse, ou rend à l'arrière opposé au pivot, et l'on revient au point 1 (variante 6).",
        "Repère: si l'ailier sort du secteur de son arrière, l'arrière compense à l'aile pour conserver le trapèze.",
      ],
      objectif: "Donner aux jeunes joueurs une organisation simple, avec des repères de jeu pour chaque poste.",
      pointsCles: [
        "Diagonale pivot / demi-centre pour équilibrer la répartition des joueurs.",
        "L'arrière opposé au pivot reste près des 9 m; l'arrière côté pivot recule.",
        "Chaque joueur perçoit la cage, ses partenaires, le ballon et son adversaire.",
        "La passe arrive toujours devant le receveur, pour qu'il reçoive en mouvement.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'J. Bertholet et A. Ripert, "Le jeu en attaque chez les 13/15 ans", Approches du Handball n°74 (2003)',
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb74_attaque1.pdf',
          note: "\"transmet à l'arrière côté pivot (1) qui peut prendre le bloc pour tirer (2), peut remettre au bloc (3) ou au demi-centre (4), petite rentrée de l'ailier à l'opposé (5), fausse prise de bloc et décalage sur l'ailier (6)\".",
        },
      ],
      depart: { Piv: [3.2, 6.5], DC: [-1.2, 10.0], ArG: [-5.2, 9.0], ArD: [5.8, 10.4] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Initiative de l'arrière opposé au pivot: tir",
          ballon: 'ArG',
          etapes: [
            {
              texte: "L'arrière gauche, opposé au pivot, vient au centre balle en main. Le demi-centre se décale pour le protéger.",
              courses: { ArG: { vers: [-1.6, 8.6], via: [-3.8, 8.2] }, DC: [0.6, 10.0] },
              def: { G3: [-1.8, 7.5] },
            },
            { texte: "Le 3 gauche ne ferme pas: l'arrière gauche tire au centre.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Initiative de l'arrière opposé au pivot: passe au pivot",
          ballon: 'ArG',
          etapes: [
            {
              texte: "L'arrière gauche, opposé au pivot, vient au centre balle en main. Le demi-centre se décale pour le protéger.",
              courses: { ArG: { vers: [-1.6, 8.6], via: [-3.8, 8.2] }, DC: [0.6, 10.0] },
              def: { G3: [-1.8, 7.5] },
            },
            {
              texte: "Le 3 droit vient aider: l'arrière gauche sert directement le pivot.",
              courses: { Piv: [2.8, 6.4] },
              passe: ['ArG', 'Piv', 0.4],
              def: { D3: [1.0, 7.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Arrière côté pivot: prise de bloc et tir',
          etapes: [
            ...TROIS_BLOC_BASE,
            { ...TROIS_PRISE_BLOC, tir: { par: 'ArD', t: 0.8 } },
          ],
        },
        {
          nom: '4 - Arrière côté pivot: remise au bloc',
          etapes: [
            ...TROIS_BLOC_BASE,
            { ...TROIS_PRISE_BLOC, def: { D3: [2.0, 7.0] } },
            {
              texte: "Le 3 droit sort sur lui: remise au bloc, le pivot roule vers le but et reçoit.",
              courses: { Piv: [3.3, 6.1] },
              passe: ['ArD', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "5 - Fausse prise de bloc et décalage sur l'ailier",
          etapes: [
            ...TROIS_BLOC_BASE,
            {
              texte: "Fausse prise de bloc: l'arrière droit fait mine de passer à l'intérieur, puis repart à l'extérieur du 2 droit. Le 1 droit sort sur lui.",
              courses: { ArD: { vers: [6.2, 7.2], via: [4.4, 7.8] } },
              def: { D1: [7.0, 5.4] },
            },
            {
              texte: "L'arrière droit décale l'ailier droit.",
              courses: { AiD: [8.8, 2.2] },
              passe: ['ArD', 'AiD', 0.4],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '6 - Retour au demi-centre, le pivot traverse',
          etapes: [
            ...TROIS_BLOC_BASE,
            {
              texte: "L'arrière droit rend le ballon au demi-centre.",
              courses: { DC: [-0.6, 9.4], ArD: [5.0, 8.8] },
              passe: ['ArD', 'DC', 0.3],
            },
            {
              texte: "Le pivot traverse vers le centre: le demi-centre entre en relation avec lui. (Il pouvait aussi tirer, ou rendre à l'arrière gauche pour revenir au point 1.)",
              courses: { Piv: { vers: [0.4, 6.4], via: [2.6, 6.9] } },
              passe: ['DC', 'Piv', 0.6],
              def: { D3: [1.6, 7.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },
  );
})();
