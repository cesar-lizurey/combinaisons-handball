/* systèmes nommés de Dragør HK (Malmö à l'infériorité numérique) et supériorité 6 contre 5 (handballhaus, handballtraining.de, forum espagnol). */
(() => {
  const DRAGOR = f => `http://www.dragoerhb.dk/fransk/f${f}.html`;
  const DRAGOR_DA = f => `http://www.dragoerhb.dk/x${f}.html`;
  const TABLE_NOMS = (nom, note) => ({
    titre: `Index des exercices de jeu (Dragør HK, version anglaise): ${nom}`,
    url: 'http://www.dragoerhb.dk/english/ejjavaovkae.html',
    note,
  });
  const HHAUS = (fiche, nom, note) => ({
    titre: `${nom} (handballhaus.de, rubrique Überzahlspiel, archive web)`,
    url: `https://web.archive.org/web/20101225230000/http://www.handballhaus.de/handball/angriffstaktik/ueberzahlspiel/${fiche}.html`,
    note,
  });

  // Défense à 5 sur une ligne (5-0) pour les situations de 6 contre 5: le 3 droit est absent,
  // le 3 gauche joue le rôle du défenseur central.
  const DEF_50 = { G1: [-7.4, 2.4], G2: [-4.6, 5.6], G3: [0, 6.8], D2: [4.6, 5.6], D1: [7.4, 2.4] };

  /* ---------------------------------------------------------------- Malmö */
  const MALMO_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit et part en rentrée: il longe la défense vers l'aile opposée.",
      courses: { AiD: { vers: [4.4, 7.6], via: [8.4, 5.8] } },
      passe: ['AiD', 'ArD', 0.05],
    },
    {
      texte: "L'arrière droit s'engage à l'extérieur, vers le 1 droit, et donne au demi-centre. L'ailier droit poursuit sa course devant la défense et va bloquer le 2 gauche.",
      courses: { ArD: [6.8, 8.0], DC: [0.4, 9.6], AiD: { vers: [-4.2, 6.3], via: [0.2, 8.4], ecran: true } },
      passe: ['ArD', 'DC', 0.45],
      def: { D2: [6.0, 6.6], D1: [7.6, 3.0], G2: [-4.9, 5.4] },
    },
    {
      texte: "Le demi-centre s'engage à l'intérieur, sur le 3 droit. Le pivot bloque le 2 droit.",
      courses: { DC: [1.6, 8.0], Piv: { vers: [4.1, 6.2], ecran: true } },
      def: { D3: [1.4, 7.1], D2: [4.9, 5.5] },
    },
  ];

  /* ---------------------------------------------------------------- Salade de rubans */
  const BANDSALAT_BASE = [
    {
      texte: "Le demi-centre feinte une passe vers la droite, puis donne à l'arrière gauche.",
      courses: { DC: [0.4, 9.8] },
      passe: ['DC', 'ArG', 0.5],
    },
    {
      texte: "L'arrière gauche part vers l'extérieur et attaque à l'extérieur du 1 gauche. L'ailier gauche quitte son aile et va poser un écran à l'extérieur du 2 gauche.",
      courses: {
        ArG: { vers: [-8.4, 6.2], via: [-7.4, 8.8] },
        AiG: { vers: [-6.0, 5.6], via: [-8.2, 4.4], ecran: true },
      },
    },
  ];

  /* ---------------------------------------------------------------- Supériorité à l'aile */
  const SUP_AILE_BASE = [
    {
      texte: "L'arrière droit, ballon en main, avance vers le centre. Le demi-centre se lance vers le 1 gauche.",
      courses: { ArD: [2.6, 8.4], DC: { vers: [-3.6, 8.6], via: [-1.4, 10.4] } },
    },
    {
      texte: "L'arrière gauche reçoit de l'arrière droit et fixe le 2 gauche par l'intérieur. Le demi-centre continue sa course.",
      courses: { ArG: [-3.0, 7.4], DC: { vers: [-6.6, 5.4], via: [-5.6, 7.8] } },
      passe: ['ArD', 'ArG', 0.2],
      def: { G2: [-3.6, 6.5], G3: [0.2, 7.1] },
    },
    {
      texte: "Le demi-centre pose un bloc à l'intérieur du 1 gauche. L'ailier gauche se lance.",
      courses: { DC: { vers: [-7.0, 3.5], ecran: true }, AiG: [-8.4, 4.4] },
      def: { G1: [-7.7, 2.8] },
    },
  ];

  /* ---------------------------------------------------------------- Retour à l'aile */
  const RETOUR_BASE = [
    {
      texte: "Après une circulation de fixations de droite à gauche, le demi-centre donne à l'arrière gauche.",
      courses: { ArG: [-5.4, 9.0] },
      passe: ['DC', 'ArG', 0.3],
    },
    {
      texte: "L'arrière gauche passe à l'ailier gauche et se replace face à l'intervalle entre le 1 et le 2.",
      courses: { AiG: [-8.8, 2.4], ArG: [-6.4, 8.4] },
      passe: ['ArG', 'AiG', 0.2],
      def: { G1: [-7.8, 3.2] },
    },
    {
      texte: "L'ailier gauche donne au demi-centre, qui feinte d'abord vers la droite.",
      courses: { DC: [1.6, 8.8] },
      passe: ['AiG', 'DC', 0.15],
      def: { G3: [0.6, 7.4] },
    },
    {
      texte: "Le demi-centre repart vers la gauche et attaque entre le central et le 2 gauche. Le pivot se déplace pour bloquer le central.",
      courses: {
        DC: { vers: [-2.0, 7.6], via: [-0.2, 8.8] },
        Piv: { vers: [-0.6, 6.4], ecran: true },
        ArG: [-5.8, 7.6],
      },
      def: { G3: [0.3, 6.9], G2: [-3.4, 6.3], G1: [-7.0, 3.8] },
    },
  ];
  const RETOUR_VERS_ARG = {
    texte: "Le 2 gauche ferme sur le demi-centre: celui-ci passe à l'arrière gauche, qui arrive face à l'intervalle entre le 2 et le 1.",
    courses: { ArG: [-5.4, 6.4] },
    passe: ['DC', 'ArG', 0.4],
    def: { G2: [-2.8, 6.8] },
  };

  /* ---------------------------------------------------------------- Fixation - supériorité à droite */
  const FIX_DROITE_BASE = [
    {
      texte: "L'ailier droit fait une fixation à l'extérieur du 1 droit et passe à l'arrière droit.",
      courses: { AiD: [8.6, 3.2], ArD: [5.6, 8.6] },
      passe: ['AiD', 'ArD', 0.6],
      def: { D1: [7.7, 2.9] },
    },
    {
      texte: "L'arrière droit feinte, puis tente le tir entre le 2 droit et le central, qui referment l'intervalle. Toute la défense glisse à droite. Le demi-centre se décale vers la droite.",
      courses: { ArD: { vers: [3.0, 7.6], via: [5.2, 7.4] }, DC: [1.4, 9.4] },
      def: { D2: [3.9, 6.4], G3: [1.8, 7.0], G2: [-3.4, 6.2], G1: [-6.6, 3.8] },
    },
    {
      texte: "L'arrière droit passe au demi-centre, qui feinte vers le même intervalle puis part à gauche, entre le central et le 2 gauche. Le pivot bloque le central. L'arrière gauche se lance.",
      courses: {
        DC: { vers: [-2.2, 7.6], via: [0.4, 8.6] },
        Piv: { vers: [-0.4, 6.6], ecran: true },
        ArG: [-4.6, 8.4],
      },
      passe: ['ArD', 'DC', 0.1],
      def: { G3: [0.6, 7.0], G2: [-3.4, 6.4] },
    },
  ];
  const FIX_DROITE_VERS_ARG = {
    texte: "Le 2 gauche ferme sur le demi-centre: l'arrière gauche arrive lancé entre le 2 et le 1 gauches et reçoit.",
    courses: { ArG: { vers: [-5.2, 6.6], via: [-5.0, 8.0] } },
    passe: ['DC', 'ArG', 0.5],
    def: { G2: [-2.9, 6.7] },
  };

  /* ---------------------------------------------------------------- Rentrée de l'ailier en supériorité */
  const RENTREE_6C5_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche et commence sa rentrée.",
      courses: { AiG: { vers: [-5.0, 7.6], via: [-8.2, 5.2] }, ArG: [-5.8, 9.6] },
      passe: ['AiG', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche feinte un tir à l'extérieur du 2 gauche, puis donne au demi-centre, qui arrive lancé. L'ailier poursuit sa rentrée devant la défense.",
      courses: { ArG: [-6.6, 8.0], DC: [-1.8, 9.4], AiG: { vers: [-2.8, 7.8], via: [-4.0, 8.0] } },
      passe: ['ArG', 'DC', 0.5],
      def: { G2: [-5.8, 6.8], G1: [-7.4, 3.2] },
    },
    {
      texte: "Le demi-centre feinte un tir de loin: le central sort sur lui et le pivot se colle à lui pour le bloquer. Le demi-centre donne à l'arrière droit, qui accélère vers la droite; l'ailier gauche continue vers le centre.",
      courses: { AiG: [0.6, 8.8], Piv: { vers: [0.6, 6.9], ecran: true }, ArD: [5.4, 8.6] },
      passe: ['DC', 'ArD', 0.6],
      def: { G3: [-0.4, 7.6] },
    },
  ];

  /* ---------------------------------------------------------------- Martinello */
  const MARTINELLO_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche. L'arrière droit commence une longue course vers le 2 gauche.",
      courses: { AiG: [-8.2, 4.0], ArD: { vers: [-1.2, 9.6], via: [2.6, 10.8] }, DC: [1.2, 11.0] },
      passe: ['AiG', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche passe à l'arrière droit, qui continue sa course vers le 2 gauche.",
      courses: { ArD: [-4.0, 8.2] },
      passe: ['ArG', 'ArD', 0.4],
      def: { G2: [-4.6, 6.4] },
    },
    {
      texte: "L'arrière droit arrive au contact du 2 gauche et rend le ballon à l'ailier gauche. L'arrière gauche et le demi-centre partent vers la droite.",
      courses: { ArD: [-5.6, 6.8], AiG: [-7.8, 4.8], ArG: [-2.6, 9.6], DC: [2.6, 10.0] },
      passe: ['ArD', 'AiG', 0.5],
    },
    {
      texte: "L'ailier gauche rentre vers le centre, devant la défense, en cherchant à gêner le 2 gauche. L'arrière gauche et le demi-centre arrivent lancés. Le pivot bloque le central.",
      courses: {
        AiG: { vers: [-2.6, 7.0], via: [-5.6, 9.0] },
        ArG: [1.4, 9.2],
        DC: [4.0, 8.6],
        Piv: { vers: [0, 6.3], ecran: true },
      },
      def: { G2: [-3.8, 6.4] },
    },
  ];
  const MARTINELLO_VERS_DC = {
    texte: "L'ailier gauche donne au demi-centre, lancé vers la droite.",
    courses: { DC: [4.6, 7.8] },
    passe: ['AiG', 'DC', 0.4],
    def: { D2: [4.4, 6.2] },
  };
  const MARTINELLO_VERS_ARG = [
    {
      texte: "L'ailier gauche donne à l'arrière gauche, lancé.",
      courses: { ArG: [2.0, 8.2] },
      passe: ['AiG', 'ArG', 0.4],
    },
    {
      texte: "L'arrière gauche fixe le 2 droit et libère le demi-centre, qui reçoit entre le 2 et le 1 droits.",
      courses: { ArG: [3.0, 7.4], DC: [5.8, 6.8] },
      passe: ['ArG', 'DC', 0.5],
      def: { D2: [3.6, 6.6], D1: [7.2, 3.6] },
    },
  ];

  /* ---------------------------------------------------------------- Ailier vers l'arrière opposé */
  const AILIER_OPPOSE_BASE = [
    {
      texte: "Croisé arrière/ailier à gauche: l'arrière gauche s'engage vers l'extérieur; l'ailier gauche croise dans son dos vers l'intérieur et reçoit.",
      courses: { ArG: [-7.4, 6.4], AiG: { vers: [-4.8, 8.2], via: [-8.0, 8.4] } },
      passe: ['ArG', 'AiG', 0.55],
      def: { G1: [-7.6, 4.0] },
    },
    {
      texte: "L'ailier attaque le défenseur central et passe à l'arrière droit.",
      courses: { AiG: [-1.4, 8.0] },
      passe: ['AiG', 'ArD', 0.6],
      def: { G3: [-0.6, 7.3] },
    },
    {
      texte: "Le pivot se déplace et pose un écran sur le central. L'arrière droit attaque l'espace entre le 2 et le 1 droits et fixe le 2.",
      courses: { Piv: { vers: [0.4, 6.7], ecran: true }, ArD: [6.2, 7.2] },
      def: { D2: [5.4, 6.4], D1: [7.4, 3.0] },
    },
  ];

  /* ---------------------------------------------------------------- D'infériorité à supériorité */
  const INF_SUP_BASE = [
    {
      texte: "L'ailier droit, ballon en main, part vers l'intérieur pour bloquer le 2 droit par l'extérieur, et passe au demi-centre. L'arrière droit commence à se décaler vers l'aile.",
      courses: { AiD: { vers: [5.7, 5.6], via: [8.0, 4.4], ecran: true }, DC: [2.8, 8.4], ArD: [7.2, 7.0] },
      passe: ['AiD', 'DC', 0.7],
    },
    {
      texte: "Le demi-centre prend le bloc: il passe à l'extérieur de l'ailier, entre le 2 et le 1 droits. L'arrière droit arrive en position d'ailier.",
      courses: { DC: { vers: [6.9, 6.0], via: [5.4, 8.2] }, ArD: [8.8, 3.0] },
    },
  ];

  /* ---------------------------------------------------------------- Infériorité face à une défense haute */
  const INF_HAUTE_BASE = [
    {
      texte: "L'ailier gauche part balle en main et passe à son arrière.",
      courses: { AiG: [-8.0, 4.4] },
      passe: ['AiG', 'ArG', 0.5],
    },
    {
      texte: "L'arrière gauche passe au demi-centre. L'ailier gauche traverse devant la ligne de défense, vers l'avancé.",
      courses: { AiG: { vers: [-2.8, 8.0], via: [-5.6, 7.0] } },
      passe: ['ArG', 'DC', 0.3],
    },
    {
      texte: "Le demi-centre renverse sur l'arrière gauche, qui fixe. L'ailier gauche pose un bloc sur l'avancé, sur son côté droit. Le demi-centre feinte vers la gauche.",
      courses: {
        ArG: [-4.4, 8.2],
        AiG: { vers: [0.4, 8.8], via: [-0.8, 7.6], ecran: true },
        DC: [-1.4, 10.4],
      },
      passe: ['DC', 'ArG', 0.2],
      def: { G2: [-4.2, 7.0], D3: [-0.6, 9.0] },
    },
    {
      texte: "Le demi-centre reçoit de nouveau, prend le bloc et part à droite de l'avancé.",
      courses: { DC: { vers: [2.6, 7.8], via: [1.4, 10.4] }, ArD: [5.2, 7.8] },
      passe: ['ArG', 'DC', 0.2],
    },
  ];

  /* ---------------------------------------------------------------- Infériorité face à une défense aplatie */
  const INF_APLATIE_BASE = [
    {
      texte: "L'ailier droit passe à son arrière et part en rentrée le long de la défense.",
      courses: { AiD: { vers: [3.4, 7.6], via: [8.0, 5.8] } },
      passe: ['AiD', 'ArD', 0.1],
    },
    {
      texte: "Le ballon circule vers la gauche: l'arrière droit passe au demi-centre. L'ailier droit continue jusqu'au 2 gauche et le bloque par l'intérieur.",
      courses: { AiD: { vers: [-4.2, 5.8], via: [-0.4, 8.4], ecran: true }, DC: [0.8, 9.4] },
      passe: ['ArD', 'DC', 0.3],
    },
    {
      texte: "Le demi-centre donne à l'arrière gauche, qui va fixer au centre du dispositif. L'ailier gauche fait une feinte initiale vers le corner.",
      courses: { ArG: { vers: [-1.8, 8.6], via: [-4.0, 9.8] }, AiG: [-8.4, 3.4] },
      passe: ['DC', 'ArG', 0.2],
      def: { G3: [-1.7, 7.4], D3: [0.6, 7.0], G1: [-7.6, 2.4] },
    },
  ];

  /* ---------------------------------------------------------------- Gold (handballhaus) */
  const GOLD_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre.",
      passe: ['ArG', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre s'enfonce vers les 6 m, en deuxième pivot, et joue le ballon dans la course vers l'avant de l'arrière gauche.",
      courses: { DC: [1.6, 7.2], ArG: [-4.4, 9.0] },
      passe: ['DC', 'ArG', 0.5],
    },
  ];

  /* ---------------------------------------------------------------- Außen weg (handballhaus) */
  const AUSSEN_WEG_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière gauche.",
      passe: ['DC', 'ArG', 0.2],
    },
    {
      texte: "L'arrière gauche passe à l'ailier gauche.",
      passe: ['ArG', 'AiG', 0.2],
    },
    {
      texte: "L'ailier gauche percute vers l'extérieur et rend à l'arrière gauche.",
      courses: { AiG: [-8.4, 3.4] },
      passe: ['AiG', 'ArG', 0.4],
      def: { G1: [-7.6, 2.8] },
    },
    {
      texte: "L'arrière gauche percute à son tour vers l'extérieur, dans l'intervalle entre le 1 et le 2, et donne au demi-centre.",
      courses: { ArG: [-6.0, 7.6], DC: [-1.2, 9.4] },
      passe: ['ArG', 'DC', 0.5],
      def: { G2: [-5.4, 6.6] },
    },
  ];
  const AUSSEN_WEG_PIVOT = {
    texte: "Le demi-centre reçoit décalé et attire le central. Le pivot se place près du 2 gauche pour recevoir.",
    courses: { DC: [-1.4, 8.2], Piv: { vers: [-3.4, 6.4], via: [-1.0, 6.0] } },
    def: { G3: [-1.0, 7.3] },
  };

  /* ---------------------------------------------------------------- Passtäuschung (handballhaus) */
  const PASSTAUSCHUNG_DEBUT = {
    texte: "L'arrière droit passe au demi-centre, placé tout près de la défense.",
    courses: { DC: [0.4, 8.2] },
    passe: ['ArD', 'DC', 0.4],
    def: { G3: [0.2, 7.3] },
  };
  const PASSTAUSCHUNG_SPERRE = [
    PASSTAUSCHUNG_DEBUT,
    {
      texte: "Le demi-centre feinte une passe vers l'arrière gauche, sans trop se décaler à droite. La défense réagit vers la gauche.",
      courses: { DC: [-0.2, 8.2] },
      def: { G3: [-0.4, 7.3], G2: [-4.0, 6.0] },
    },
    {
      texte: "Le pivot pose un bref écran frontal sur le central. Le demi-centre perce sans dribbler entre le central et le 2 droit.",
      courses: { Piv: { vers: [0.6, 7.2], ecran: true }, DC: { vers: [1.8, 7.2], via: [1.2, 8.4] } },
    },
  ];

  /* ---------------------------------------------------------------- Croisés en supériorité (handballhaus) */
  const CROISE_RM_RL = [
    {
      texte: "Le pivot est du côté opposé, dans le dos du 2 droit. Le demi-centre s'engage vers la gauche, entre le central et le 2 gauche.",
      courses: { DC: [-2.2, 8.6] },
      def: { G3: [-1.4, 7.4] },
    },
    {
      texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit vers le centre.",
      courses: { ArG: { vers: [0.4, 9.0], via: [-3.0, 10.4] }, DC: [-3.0, 8.0] },
      passe: ['DC', 'ArG', 0.55],
      def: { G2: [-3.6, 6.6] },
    },
  ];
  const CROISE_RM_RR = [
    {
      texte: "L'arrière droit passe au demi-centre, qui part d'abord un peu vers la gauche.",
      courses: { DC: [-1.0, 9.8] },
      passe: ['ArD', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre attaque à pleine vitesse la jointure entre le central et le 2 droit. Le pivot pose un écran frontal sur le central, fixé.",
      courses: { DC: [2.0, 7.8], Piv: { vers: [-0.2, 7.4], ecran: true }, ArD: [3.8, 9.6] },
      def: { G3: [0.8, 7.3], D2: [3.2, 6.6] },
    },
    {
      texte: "L'arrière droit croise en sens inverse, dans le dos du demi-centre, et reçoit.",
      courses: { ArD: { vers: [0.2, 8.8], via: [2.4, 9.8] }, DC: [2.4, 7.4] },
      passe: ['DC', 'ArD', 0.5],
    },
  ];

  window.COMBINAISONS.push(
    {
      id: 'malmo',
      nom: 'Malmö',
      alias: 'Malmø (DA/EN), Malmoe / Malmo (FR)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "L'ailier droit traverse toute la défense pour bloquer le 2 gauche; le demi-centre s'engage au centre et sert le pivot ou l'arrière gauche qui contourne le bloc.",
      description: [
        "Système envoyé à Dragør HK par Kim Ludwig. L'ailier droit passe à l'arrière droit et part en rentrée: il longe toute la défense pour aller bloquer le 2 gauche, de l'autre côté du terrain.",
        "L'arrière droit s'engage à l'extérieur et donne au demi-centre, qui s'engage à l'intérieur sur le 3 droit. Le pivot bloque le 2 droit. Le demi-centre sert le pivot, ou l'arrière gauche qui passe au ras du bloc de l'ailier droit (choisis une variante au-dessus du schéma).",
        "La fiche française note les défenseurs du point de vue de la défense (\"2D\" = le 2 gauche vu par l'attaque); le schéma de Dragør confirme le côté. Le texte se termine par une phrase tronquée (\"repasser la balle à DC, qui...\"): cette dernière fin n'est pas dessinée. La défense n'est pas précisée; le schéma montre une 0-6.",
      ],
      objectif: "Surcharger la gauche avec le bloc de l'ailier droit, après avoir attiré la défense vers la droite.",
      pointsCles: [
        "L'ailier droit court devant la défense, sans entrer dans la zone, jusqu'au 2 gauche.",
        "L'arrière droit s'engage vraiment à l'extérieur pour écarter le 2 et le 1 droits.",
        "Le demi-centre attaque le 3 droit pour le fixer avant de passer.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Malmo (Dragør HK, envoyé par Kim Ludwig)', url: DRAGOR(132), note: "\"ALD passe à ARD et effectue une entrée d'aile pour faire un bloc sur 2D. ARD s'engage extérieur et passe à DC, qui lui aussi s'engage intérieur sur 3C et a la possibilité de faire une passe à PVT qui bloque 2G. Sinon la balle est passée à ARG, qui peut contourner le bloc de ALD et tirer ou repasser la balle à DC, qui...\"" },
        TABLE_NOMS('Malmø', 'Fiche 132: "Malmø" en danois et en anglais, "Malmoe" dans l\'index français.'),
      ],
      ballon: 'AiD',
      depart: { Piv: [3.3, 6.5] },
      variantes: [
        {
          nom: '1 - Passe au pivot',
          etapes: [
            ...MALMO_BASE,
            {
              texte: "Le demi-centre donne au pivot, qui se retourne vers le but.",
              courses: { Piv: [3.5, 6.3] },
              passe: ['DC', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Tir de l'arrière gauche",
          etapes: [
            ...MALMO_BASE,
            {
              texte: "Le demi-centre donne à l'arrière gauche, qui contourne le bloc de l'ailier droit et arrive entre le bloc et le 3 gauche.",
              courses: { ArG: { vers: [-3.0, 7.6], via: [-5.2, 8.4] } },
              passe: ['DC', 'ArG', 0.5],
              def: { G3: [-1.9, 7.0] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    {
      id: 'polsk',
      nom: 'Le Polonais',
      alias: 'Polsk (DA, fiche danoise x372)',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-6',
      resume: "Fixations et croisé arrière/ailier à droite, l'arrière gauche attire le 2 vers le centre, puis passe longue de l'ailier droit à l'ailier gauche qui rentre.",
      description: [
        "Système de Dragør HK présent seulement dans la version danoise du site. Selon la fiche, \"Polsk\" prépare une conclusion sur un côté: toute l'attaque appuie à droite, puis le ballon traverse le terrain.",
        "Le demi-centre passe à l'arrière droit et fixe vers la droite. L'arrière droit fixe à son tour, puis l'ailier droit croise avec lui et reçoit. Pendant ce temps, l'arrière gauche glisse vers le centre comme s'il allait recevoir, pour entraîner le 2 gauche. L'ailier gauche rentre entre le 1 et le 2 gauches, reçoit une longue passe de l'ailier droit et tire.",
        "Le texte danois nomme les défenseurs du point de vue de la défense (\"H1 et H2\" = le 1 et le 2 gauches vus par l'attaque); le schéma montre bien la rentrée de l'ailier gauche côté gauche. Ne pas confondre avec le \"Pondus polonais\" (fiche Pondus).",
      ],
      objectif: "Attirer toute la défense à droite pour libérer l'ailier gauche à l'opposé.",
      pointsCles: [
        "Les fixations à droite doivent être réelles pour faire glisser la défense.",
        "L'arrière gauche joue le leurre: il doit vraiment avoir l'air d'être le receveur.",
        "La passe longue de l'ailier droit part au moment où l'ailier gauche entre dans l'intervalle.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Polsk (Dragør HK, version danoise)', url: DRAGOR_DA(372), note: "\"HF krydser med HB og modtager bolden. VB rykker mod midten som om hun er boldmodtageren [...] VF ind mellem forsvarets H1 og H2, modtager bolden fra HF og afslutter\" (l'ailier gauche entre entre le 1 et le 2, reçoit de l'ailier droit et conclut)." },
        TABLE_NOMS('Polsk', 'Fiche 372 "Polsk": seulement en danois (absente des versions anglaise et française).'),
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière droit et fixe vers la droite, sur le 3 droit.",
          courses: { DC: [1.6, 8.6], ArD: [5.4, 9.0] },
          passe: ['DC', 'ArD', 0.1],
          def: { D3: [1.9, 7.4] },
        },
        {
          texte: "L'arrière droit fixe à son tour vers la droite, à l'extérieur du 2 droit. L'ailier droit remonte.",
          courses: { ArD: [6.6, 7.8], AiD: [8.8, 3.6] },
          def: { D2: [5.8, 6.4] },
        },
        {
          texte: "Croisé arrière/ailier: l'ailier droit rentre vers l'intérieur et reçoit, l'arrière droit file vers l'aile.",
          courses: { AiD: { vers: [4.8, 8.8], via: [7.8, 8.2] }, ArD: [8.4, 4.6] },
          passe: ['ArD', 'AiD', 0.5],
          def: { D1: [7.8, 3.4] },
        },
        {
          texte: "L'arrière gauche glisse vers le centre comme s'il allait recevoir: le 2 gauche le suit. L'ailier gauche démarre.",
          courses: { ArG: [-2.4, 9.0], AiG: [-8.6, 3.0] },
          def: { G2: [-3.4, 6.6] },
        },
        {
          texte: "L'ailier gauche rentre entre le 1 et le 2 gauches. L'ailier droit lui fait une longue passe à travers le terrain.",
          courses: { AiG: { vers: [-5.6, 6.0], via: [-8.0, 5.2] } },
          passe: ['AiD', 'AiG', 0.55],
          def: { G1: [-7.0, 3.2] },
        },
        { texte: "L'ailier gauche tire.", tir: 'AiG' },
      ],
    },

    {
      id: 'bandsalat',
      nom: 'Salade de rubans',
      alias: 'Båndsalat (DA, fiche danoise x1055)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "L'arrière gauche attaque à l'extérieur du 1, l'ailier gauche fait écran sur le 2 et le demi-centre passe à l'extérieur de cet écran pour recevoir.",
      description: [
        "Système de Dragør HK (reçu de Mads B.), présent seulement dans la version danoise du site. Le demi-centre feinte une passe à droite puis donne à l'arrière gauche, qui part vers la touche et attaque à l'extérieur du 1 gauche.",
        "L'ailier gauche pose un écran sur le 2 gauche. Le demi-centre court vers la gauche, à l'extérieur de cet écran, et reçoit de l'arrière gauche. Si le 1 gauche ne suit pas l'arrière gauche, celui-ci tire lui-même à l'extérieur du 1 (choisis une variante au-dessus du schéma).",
        "Le texte danois ne dit pas sur qui l'ailier pose l'écran; le schéma le montre à l'extérieur du 2 gauche, et le demi-centre finit entre le 1 et le 2. La défense n'est pas précisée; le schéma montre une 0-6.",
      ],
      objectif: "Écarter le 1 gauche vers la touche et faire entrer le demi-centre dans l'intervalle 1-2 protégé par l'écran.",
      pointsCles: [
        "La feinte de passe à droite fait glisser la défense avant le jeu à gauche.",
        "L'arrière gauche attaque vraiment l'extérieur du 1: c'est la lecture du 1 qui décide de la fin.",
        "Le demi-centre passe à l'extérieur de l'écran, pas entre l'écran et le 3.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Båndsalat (Dragør HK, version danoise)', url: DRAGOR_DA(1055), note: "\"PM rykker udvendig på VF's screening og modtager bolden fra VB og der kan afsluttes. Vælger forsvarets H1 ikke at følge VB kan VB afslutte udvendigt på forsvarets H1\"." },
        TABLE_NOMS('Båndsalat', 'Fiche 1055 "Båndsalat": seulement en danois.'),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Le demi-centre à l'extérieur de l'écran",
          etapes: [
            ...BANDSALAT_BASE,
            {
              texte: "Le 1 gauche suit l'arrière gauche. Le demi-centre court vers la gauche, passe à l'extérieur de l'écran de l'ailier et reçoit de l'arrière gauche.",
              courses: { ArG: [-9.2, 4.4], DC: { vers: [-7.4, 5.8], via: [-4.6, 9.6] } },
              passe: ['ArG', 'DC', 0.6],
              def: { G1: [-8.3, 3.6] },
            },
            { texte: "Le demi-centre tire entre le 1 et le 2 gauches.", tir: 'DC' },
          ],
        },
        {
          nom: "2 - Le 1 ne suit pas: tir de l'arrière gauche",
          etapes: [
            ...BANDSALAT_BASE,
            {
              texte: "Le 1 gauche ne suit pas l'arrière gauche et reste à l'intérieur. L'arrière gauche continue à l'extérieur du 1.",
              courses: { ArG: [-8.8, 4.8] },
              def: { G1: [-7.0, 3.4] },
            },
            { texte: "L'arrière gauche tire à l'extérieur du 1 gauche.", tir: 'ArG' },
          ],
        },
      ],
    },

    {
      id: 'spansk-pres',
      nom: "Attaque placée à l'espagnole",
      alias: 'Spansk pres (DA), Spanish pressure (EN), "Attaque placée à l\'Espagnol" (FR)',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-6',
      resume: "L'arrière droit attaque le 3 droit, le demi-centre écarte le 3 gauche, et le pivot, qui bloque le 3 droit, reçoit au centre.",
      description: [
        "Système de Dragør HK (rubrique des croisés). L'arrière droit s'engage sur le 3 droit. Il donne au demi-centre, qui s'engage vers l'extérieur pour éloigner le 3 gauche du pivot. Le pivot bloque le 3 droit, déjà attaqué par l'arrière droit, et reçoit le ballon du demi-centre.",
        "La fiche ne dit pas qui a le ballon au départ; le schéma fait commencer l'action par une passe de l'ailier droit à l'arrière droit. Les défenseurs sont nommés du point de vue de la défense (\"3G\" = le 3 droit vu par l'attaque).",
        "Ne pas confondre avec la combinaison classique \"l'Espagnole\" (fiche à part): ici, c'est un simple jeu à trois avec le pivot entre les deux 3.",
      ],
      objectif: "Vider l'espace central autour du pivot pour lui donner le ballon face au but.",
      pointsCles: [
        "Le pivot est placé entre les deux 3.",
        "Le demi-centre s'écarte vraiment vers la gauche pour emmener le 3 gauche.",
        "Le pivot bloque le 3 droit au moment où l'arrière droit l'a fixé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "Attaque placée à l'Espagnol (Dragør HK)", url: DRAGOR(718), note: "\"ARD s'engage sur le défenseur 3G. La balle est passée au DC qui s'engage à l'extérieur pour attirer le défenseur 3D loin du PVT. PVT fait un bloc sur 3G (attaqué par ARD) et le DC passe la balle au PVT qui tire.\"" },
        TABLE_NOMS('Spansk pres', 'Fiche 718: "Spansk pres" (DA), "Spanish pressure" (EN).'),
      ],
      ballon: 'AiD',
      etapes: [
        {
          texte: "L'ailier droit passe à l'arrière droit, qui s'engage sur le 3 droit.",
          courses: { ArD: [2.0, 8.1] },
          passe: ['AiD', 'ArD', 0.1],
          def: { D3: [1.5, 7.2], D2: [4.2, 6.0] },
        },
        {
          texte: "L'arrière droit donne au demi-centre, qui s'engage vers l'extérieur, à gauche, pour attirer le 3 gauche loin du pivot.",
          courses: { DC: { vers: [-2.6, 8.4], via: [-0.4, 9.8] } },
          passe: ['ArD', 'DC', 0.3],
          def: { G3: [-2.4, 7.3], G2: [-4.6, 5.6] },
        },
        {
          texte: "Le pivot bloque le 3 droit et s'ouvre vers le ballon. Le demi-centre lui donne le ballon.",
          courses: { Piv: { vers: [0.6, 6.4], ecran: true } },
          passe: ['DC', 'Piv', 0.5],
        },
        { texte: 'Le pivot tire.', tir: 'Piv' },
      ],
    },

    /* ---------------------------------------------------------------- Supériorité 6 contre 5 (Dragør) */
    {
      id: 'feinte-initiale-dc-6c5',
      nom: 'Feinte initiale du demi-centre (6 contre 5)',
      alias: 'Midt forfinte (DA), Center initial feint (EN)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "Après une circulation de droite à gauche, les deux arrières fixent à l'extérieur, le pivot bloque le central et le demi-centre, après une feinte à gauche, repart à droite pour tirer à 6 m.",
      description: [
        "Système de Dragør HK pour le jeu à 6 contre 5 face à une défense 5-0 (cinq défenseurs alignés). Le ballon circule de l'ailier droit jusqu'à l'arrière gauche, qui fixe à l'extérieur du 2 gauche.",
        "Le ballon revient à l'arrière droit, qui fixe à l'extérieur du 2 droit, pendant que le demi-centre démarre par une feinte vers la gauche. Le pivot bloque le défenseur central. Le demi-centre repart vers la droite, reçoit de l'arrière droit et profite du bloc pour tirer à 6 m.",
        "Les fixations \"externes\" des arrières écartent les 2 et ouvrent l'espace entre le central et le 2 droit. La passe de l'arrière gauche à l'arrière droit, qui saute le demi-centre, vient du schéma de Dragør.",
      ],
      objectif: "Écarter les deux 2 et isoler le défenseur central, bloqué par le pivot, contre le demi-centre.",
      pointsCles: [
        "Fixations à l'extérieur des 2: les arrières attirent leur défenseur vers la touche.",
        "La feinte du demi-centre vers la gauche emmène le central, que le pivot bloque ensuite.",
        "Le demi-centre reçoit lancé, du côté du bloc.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Feinte initiale du demi-centre (Dragør HK, trad. N. Dennefeld)', url: DRAGOR(654), note: '"Supériorité numérique face à une défense 5-0. [...] DY fait une fixation externe sur son défenseur 2G. Le pivot pose un bloc sur le défenseur 3P. DC repart sur la droite, reçoit la balle de ARD et profite du bloc pour aller tirer à 6m".' },
        TABLE_NOMS('Midt forfinte', 'Fiche 654: "Midt forfinte" (DA), "Center initial feint" (EN), rubrique des systèmes de supériorité.'),
      ],
      ballon: 'AiD',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [1.0, 6.5] },
      etapes: [
        {
          texte: "Circulation de droite à gauche: l'ailier droit passe à l'arrière droit.",
          passe: ['AiD', 'ArD', 0.2],
        },
        {
          texte: "L'arrière droit passe au demi-centre.",
          passe: ['ArD', 'DC', 0.3],
        },
        {
          texte: "Le demi-centre donne à l'arrière gauche, qui fait une fixation à l'extérieur du 2 gauche.",
          courses: { ArG: [-5.8, 7.4] },
          passe: ['DC', 'ArG', 0.2],
          def: { G2: [-5.1, 6.6], G1: [-7.4, 3.4] },
        },
        {
          texte: "L'arrière gauche renvoie à l'arrière droit, qui fixe à l'extérieur du 2 droit. Le demi-centre démarre par une feinte vers la gauche; le pivot bloque le central.",
          courses: { ArD: [6.0, 7.6], DC: [-2.0, 8.6], Piv: { vers: [0.4, 6.6], ecran: true } },
          passe: ['ArG', 'ArD', 0.3],
          def: { D2: [5.3, 6.7], G3: [-0.6, 7.3] },
        },
        {
          texte: "Le demi-centre repart vers la droite, profite du bloc du pivot et reçoit de l'arrière droit.",
          courses: { DC: { vers: [1.8, 7.4], via: [-0.4, 8.8] } },
          passe: ['ArD', 'DC', 0.6],
        },
        {
          texte: "Le demi-centre tire à 6 m.",
          courses: { DC: [2.0, 6.7] },
          tir: { par: 'DC', t: 0.4 },
        },
      ],
    },

    {
      id: 'korsoer',
      nom: 'Korsoer',
      alias: 'Korsør (DA)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "L'arrière droit donne à l'ailier et va bloquer le central, le pivot bloque le 2 droit: le demi-centre lancé passe entre les deux blocs.",
      description: [
        "Système de supériorité numérique de Dragør HK, nommé ainsi par Peter Schmidt (Korsør est une ville danoise), contre une défense 5-0.",
        "Le demi-centre passe à l'arrière droit, qui arrive lancé. L'arrière droit donne à son ailier et continue sa course pour poser un bloc à l'extérieur (côté droit) du défenseur central. Le pivot va bloquer le 2 droit par l'intérieur. L'ailier droit sert le demi-centre, lancé, qui passe entre les deux blocs et tire.",
        "Le placement de départ du pivot (à gauche du central) et sa course vers la droite viennent du schéma de Dragør.",
      ],
      objectif: "Ouvrir un couloir entre le central et le 2 droit avec deux blocs simultanés.",
      pointsCles: [
        "L'arrière droit passe et enchaîne tout de suite sa course vers le central.",
        "Les deux blocs se posent en même temps, avant la passe de l'ailier.",
        "Le demi-centre attend la fin des blocs avant de s'élancer.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Korsoer (Dragør HK, trad. N. Dennefeld)', url: DRAGOR(670), note: '"ARD passe à son ailier ALD et continue sa course pour aller mettre un bloc externe sur le défenseur central. Le pivot se place de manière a bloquer interne le défenseur 2G. ALD passe la balle à DC lancé qui profite des deux blocs pour aller tirer".' },
        TABLE_NOMS('Korsør', 'Fiche 670: "Korsør" (DA), "Korsoer" (EN et FR).'),
      ],
      ballon: 'DC',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [-1.0, 6.5] },
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière droit, qui arrive lancé.",
          courses: { ArD: [4.8, 8.6] },
          passe: ['DC', 'ArD', 0.2],
        },
        {
          texte: "L'arrière droit donne à son ailier et continue sa course: il bloque le central par l'extérieur. Le pivot glisse à droite et bloque le 2 droit par l'intérieur.",
          courses: {
            ArD: { vers: [1.0, 7.1], via: [3.4, 7.4], ecran: true },
            Piv: { vers: [3.7, 6.1], via: [1.4, 6.1], ecran: true },
            DC: [0.4, 10.6],
          },
          passe: ['ArD', 'AiD', 0.15],
          def: { D1: [7.8, 3.2] },
        },
        {
          texte: "L'ailier droit donne au demi-centre, lancé, qui passe entre les deux blocs.",
          courses: { DC: { vers: [2.4, 7.5], via: [1.0, 9.0] } },
          passe: ['AiD', 'DC', 0.5],
        },
        { texte: 'Le demi-centre tire.', tir: 'DC' },
      ],
    },

    {
      id: 'position-tir-contre-5-0',
      nom: 'Position de tir contre une 5-0',
      alias: 'Afslutning mod 5-0 (DA), Shooting position against 6-0 [sic] (EN)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "L'ailier gauche traverse pour bloquer le 2 droit; double croisé arrière gauche / demi-centre puis arrière gauche / arrière droit, et tir de l'arrière droit.",
      description: [
        "Système de supériorité numérique de Dragør HK contre une défense 5-0. L'ailier gauche passe à l'arrière gauche et continue sa course pour poser un bloc à l'intérieur du 2 droit, de l'autre côté du terrain.",
        "L'arrière gauche passe au demi-centre, qui croise avec lui et lui rend le ballon. L'arrière gauche continue sa course et croise avec l'arrière droit, qui tire en profitant du bloc de l'ailier gauche.",
        "La fiche écrit que l'ailier bloque \"G2\": avec la notation de Dragør (côtés vus par la défense), c'est le 2 droit vu par l'attaque, ce que montre le schéma. Le titre anglais dit \"contre 6-0\", le danois et le français disent 5-0. La fiche note les joueurs GX, GY, CZ, DY (ailier gauche, arrière gauche, demi-centre, arrière droit).",
      ],
      objectif: "Amener l'arrière droit lancé au centre-droit, derrière un bloc posé d'avance.",
      pointsCles: [
        "L'ailier gauche part dès sa passe: son bloc doit être en place à la fin du double croisé.",
        "Les deux croisés se jouent près de la défense pour la faire glisser.",
        "L'arrière droit rentre dans le dos de l'arrière gauche.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Position de tir contre une 5-0 (Dragør HK)', url: DRAGOR(115), note: "\"GY passe au demi-centre CZ, qui croise avec lui. Après avoir reçu la balle de CZ, GY continue sa course de manière à aller croiser avec l'arrière droit DY. DY va tirer en profitant du bloc de GX.\"" },
        TABLE_NOMS('Afslutning mod 5-0', 'Fiche 115: "Afslutning mod 5-0" (DA); le titre anglais dit "against 6-0".'),
      ],
      ballon: 'AiG',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [1.0, 6.5] },
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche et part en course à travers la défense.",
          courses: { AiG: { vers: [-3.8, 8.6], via: [-8.6, 6.8] }, ArG: [-5.2, 9.4] },
          passe: ['AiG', 'ArG', 0.1],
        },
        {
          texte: "L'arrière gauche passe au demi-centre, qui s'engage vers la gauche. L'ailier gauche poursuit sa course vers la droite.",
          courses: { DC: [-3.0, 7.8], AiG: { vers: [2.4, 8.0], via: [-0.6, 9.4] } },
          passe: ['ArG', 'DC', 0.15],
          def: { G2: [-4.0, 6.4] },
        },
        {
          texte: "Premier croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit de lui. L'ailier gauche pose un bloc à l'intérieur du 2 droit.",
          courses: {
            ArG: { vers: [0.4, 9.4], via: [-3.4, 10.4] },
            DC: [-3.6, 7.4],
            AiG: { vers: [3.7, 6.1], ecran: true },
          },
          passe: ['DC', 'ArG', 0.55],
          def: { G3: [-0.6, 7.2], G2: [-4.2, 6.2] },
        },
        {
          texte: "Second croisé: l'arrière gauche continue vers la droite; l'arrière droit rentre dans son dos et reçoit.",
          courses: { ArG: [5.8, 7.6], ArD: { vers: [2.4, 7.6], via: [4.2, 9.8] } },
          passe: ['ArG', 'ArD', 0.55],
          def: { D1: [6.8, 4.4] },
        },
        {
          texte: "L'arrière droit tire en profitant du bloc de l'ailier gauche.",
          courses: { ArD: [2.2, 7.0] },
          tir: { par: 'ArD', t: 0.4 },
        },
      ],
    },
    {
      id: 'superiorite-a-l-aile',
      nom: "Supériorité à l'aile",
      alias: 'Fløjovertal (DA), Wing superiority (EN)',
      categorie: 'Supériorité numérique',
      defense: '5-0 ou 4-1 (6 contre 5)',
      resume: "Le demi-centre traverse pour bloquer le 1 gauche, l'arrière gauche fixe le 2 gauche par l'intérieur: 2 contre 1 avec l'ailier gauche, lecture du 2.",
      description: [
        "Système de supériorité numérique de Dragør HK contre une défense 5-0 (éventuellement 4-1). L'arrière droit a le ballon; le pivot est placé à gauche du défenseur central.",
        "Le demi-centre se lance vers le 1 gauche. L'arrière gauche reçoit de l'arrière droit et fixe le 2 gauche par l'intérieur. Le demi-centre pose un bloc à l'intérieur du 1 gauche pendant que l'ailier gauche se lance. Si le 2 gauche part sur l'ailier, l'arrière gauche tire; sinon il donne à l'ailier, qui tire à 6 m.",
        "Si la défense couvre quand même l'ailier et l'arrière gauches, le ballon part à l'arrière droit, qui cherche une solution de tir avec l'ailier droit. La fiche ne détaille pas cette fin: la variante 3 en montre une possibilité (2 contre 1 à droite). Les défenseurs sont nommés du point de vue de la défense dans la fiche (\"2D\", \"1D\" = le 2 et le 1 gauches vus par l'attaque); le schéma confirme le côté.",
      ],
      objectif: "Créer un 2 contre 1 sur le 2 gauche avec l'arrière et l'ailier gauches, grâce au bloc du demi-centre sur le 1.",
      pointsCles: [
        "Le demi-centre part tôt: son bloc sur le 1 doit être posé quand l'ailier démarre.",
        "L'arrière gauche fixe à l'intérieur du 2 pour l'écarter de l'ailier.",
        "Lecture du 2 gauche: il sort sur l'ailier, l'arrière tire; il reste, l'ailier tire.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "Supériorité à l'aile (Dragør HK, trad. N. Dennefeld)", url: DRAGOR(669), note: "\"DC continue sa course et va poser un bloc interne sur 1D tandis que l'ailier gauche ALG se lance. Si le défenseur 2D va défendre sur ALG, ARG prend le tir, sinon il donne à ALG qui tir à 6m. Si la défense est quand même présente sur ALG et ARG, la balle peut être passée à l'arrière droit ARD qui peut trouver une solution de tir avec l'aide de l'ailier droit ALD.\"" },
        TABLE_NOMS('Fløjovertal', 'Fiche 669: "Fløjovertal" (DA), "Wing superiority" (EN).'),
      ],
      ballon: 'ArD',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [-1.0, 6.5] },
      variantes: [
        {
          nom: "1 - Le 2 sort sur l'ailier: tir de l'arrière gauche",
          etapes: [
            ...SUP_AILE_BASE,
            {
              texte: "L'ailier gauche passe devant le bloc et arrive entre le 1 et le 2. Le 2 gauche sort sur lui: l'arrière gauche est libre.",
              courses: { AiG: { vers: [-5.4, 5.2], via: [-7.0, 5.6] }, ArG: [-2.6, 7.0] },
              def: { G2: [-4.6, 5.8] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Le 2 reste: passe à l'ailier gauche",
          etapes: [
            ...SUP_AILE_BASE,
            {
              texte: "Le 2 gauche reste sur l'arrière gauche. L'ailier gauche passe devant le bloc et reçoit entre le 1 et le 2.",
              courses: { AiG: { vers: [-5.4, 5.2], via: [-7.0, 5.6] } },
              passe: ['ArG', 'AiG', 0.6],
              def: { G2: [-3.5, 6.6] },
            },
            { texte: "L'ailier gauche tire à 6 m.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Gauche fermée: renversement à droite',
          etapes: [
            ...SUP_AILE_BASE,
            {
              texte: "Le 2 gauche reste sur l'arrière gauche et le 1 gauche se dégage du bloc pour suivre l'ailier. L'arrière gauche renverse vers l'arrière droit.",
              courses: { AiG: { vers: [-5.4, 5.2], via: [-7.0, 5.6] }, ArD: [3.0, 8.6] },
              passe: ['ArG', 'ArD', 0.5],
              def: { G1: [-6.2, 4.6], G2: [-3.5, 6.6], G3: [-0.2, 7.3], D2: [3.8, 6.4], D1: [6.6, 3.6] },
            },
            {
              texte: "Une solution: l'arrière droit attaque l'intervalle entre le 2 et le 1 droits; le 1 sort sur lui et il donne à l'ailier droit.",
              courses: { ArD: [5.4, 7.4], AiD: [8.6, 2.4] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D1: [5.9, 6.4], D2: [4.4, 6.0] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    {
      id: 'retour-a-l-aile',
      nom: "Retour à l'aile",
      alias: 'Retur mod fløj (DA), Return to wing (EN)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "Le ballon revient de l'ailier gauche au demi-centre, qui attaque entre le central et le 2 gauche pendant que le pivot bloque le central; trois fins.",
      description: [
        "Système de supériorité numérique de Dragør HK contre une défense 5-0. Après une circulation de fixations de droite à gauche, l'arrière gauche passe à l'ailier gauche. Le pivot est placé à l'intérieur du 2 gauche.",
        "L'ailier gauche passe au demi-centre, qui attaque avec une feinte initiale entre le central et le 2 gauche. Le pivot se déplace pour bloquer le central. Trois fins (choisis une variante au-dessus du schéma): le demi-centre tire à 6 m entre le 2 et le bloc, ou sert le pivot; il passe à l'arrière gauche, qui tire entre le 2 et le 1 gauches; l'arrière gauche fixe le 1 et passe à l'ailier gauche, qui tire à 6 m.",
        "Le texte nomme les défenseurs du point de vue de la défense (\"2D\" = le 2 gauche vu par l'attaque). La feinte du demi-centre d'abord vers la droite vient du schéma de Dragør.",
      ],
      objectif: "Attaquer l'intervalle central-2 gauche après un retour du ballon de l'aile, avec trois solutions en chaîne vers l'extérieur.",
      pointsCles: [
        "Le pivot part de l'intérieur du 2 gauche et vient bloquer le central au moment de l'attaque du demi-centre.",
        "La feinte initiale du demi-centre fait bouger le central avant le bloc.",
        "L'arrière gauche se replace face à l'intervalle 1-2 après sa passe à l'ailier.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "Retour à l'aile, alternative 1 (Dragør HK, trad. N. Dennefeld)", url: DRAGOR(668), note: "\"DC attaque avec une feinte initiale entre le défenseur central et D2. Le pivot se déplace de manière à bloquer le défenseur central. [...] 1. DC peut essayer d'aller tirer à 6m entre 2D et le bloc ou bien passer au pivot.\"" },
        { titre: "Retour à l'aile, alternative 2 (Dragør HK)", url: DRAGOR('668a'), note: '"2. DC peut passer à ARG qui va tirer à 6m entre 2D et 1D."' },
        { titre: "Retour à l'aile, alternative 3 (Dragør HK)", url: DRAGOR('668b'), note: "\"3. DC peut passer à ARG, qui fixant 1D passe à l'ailier ALG qui tire à 6m.\"" },
        TABLE_NOMS('Retur mod fløj', 'Fiche 668: "Retur mod fløj" (DA), "Return to wing" (EN).'),
      ],
      ballon: 'DC',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [-3.6, 6.1] },
      variantes: [
        {
          nom: '1 - Tir du demi-centre',
          etapes: [
            ...RETOUR_BASE,
            {
              texte: "Le demi-centre tire à 6 m entre le 2 gauche et le bloc (il peut aussi servir le pivot).",
              courses: { DC: [-1.9, 6.8] },
              tir: { par: 'DC', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - Tir de l'arrière gauche",
          etapes: [
            ...RETOUR_BASE,
            RETOUR_VERS_ARG,
            { texte: "L'arrière gauche tire à 6 m entre le 2 et le 1 gauches.", tir: 'ArG' },
          ],
        },
        {
          nom: "3 - Passe à l'ailier gauche",
          etapes: [
            ...RETOUR_BASE,
            RETOUR_VERS_ARG,
            {
              texte: "Le 1 gauche sort sur l'arrière gauche, qui donne à l'ailier gauche.",
              courses: { AiG: [-7.6, 3.2] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G1: [-6.0, 5.4] },
            },
            { texte: "L'ailier gauche tire à 6 m.", tir: 'AiG' },
          ],
        },
      ],
    },

    {
      id: 'fixation-superiorite-droite',
      nom: 'Fixation - supériorité à droite',
      alias: 'Oppres - højre overtalskombination (DA), Pressure - right superiority combination (EN)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "Fixations de l'ailier et de l'arrière droits, le demi-centre feinte à droite puis attaque à gauche du central bloqué par le pivot; fins demi-centre, arrière gauche, ailier gauche ou double kung-fu.",
      description: [
        "Système de supériorité numérique de Dragør HK. L'ailier droit fixe à l'extérieur et passe à l'arrière droit, qui feinte et tente le tir entre le 2 droit et le central. Si ces deux défenseurs ferment l'intervalle, il passe au demi-centre.",
        "Le demi-centre feinte vers ce même intervalle, puis va finalement dans l'intervalle entre le central et le 2 gauche, pendant que le pivot bloque le central. L'arrière gauche arrive lancé et reçoit du demi-centre: il tire à 6 m ou donne à l'ailier gauche. Autre fin: le demi-centre lobe au-dessus de la zone pour un kung-fu de l'arrière droit, qui peut à son tour passer en l'air pour un kung-fu de l'ailier gauche, parti du point de corner.",
        "Les fiches nomment les défenseurs du point de vue de la défense (\"2G et 3G\" = le 2 droit et le central vus par l'attaque) et contiennent une coquille (\"2R\"). Les trois schémas de Dragør montrent les fins demi-centre, arrière gauche et ailier gauche; la défense n'est pas précisée (cinq défenseurs sur les schémas).",
      ],
      objectif: "Attirer la défense à droite, puis attaquer à gauche du central bloqué, avec le kung-fu en solution spectaculaire.",
      pointsCles: [
        "L'arrière droit cherche vraiment le tir: c'est la fermeture du 2 et du central qui déclenche la passe.",
        "Le demi-centre feinte à droite avant de partir à gauche du bloc du pivot.",
        "Pour le kung-fu, l'ailier gauche part du point de corner.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Fixation - Supériorité à droite, alternative 1 (Dragør HK, trad. N. Dennefeld)', url: DRAGOR(888), note: "\"DC, qui a fait une feinte vers l'intervalle 3G 2G, va finalement dans l'intervalle entre 3G et 2R, tandis que le pivot PVT pose un bloc sur 3G.\" Le schéma montre le tir du demi-centre." },
        { titre: 'Fixation - Supériorité à droite, alternative 2 (Dragør HK)', url: DRAGOR('888a'), note: "\"L'arrière gauche ARG arrive lancé et reçoit la balle de DC. Il va au tir à 6m ou passe la balle à l'ailier ALG qui va au tir.\"" },
        { titre: 'Fixation - Supériorité à droite, alternative 3 (Dragør HK)', url: DRAGOR('888b'), note: '"DC peut également passer la balle au dessus de la zone pour un kung-fu de ARD qui peut également passer au dessus de la zone pour un kung-fu de ALG. Dans ce cas ALG doit démarrer du point de corner."' },
        TABLE_NOMS('Oppres - højre overtalskombination', 'Fiche 888: "Oppres - højre overtalskombination" (DA), "Pressure - right superiority combination" (EN).'),
      ],
      ballon: 'AiD',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [-1.0, 6.5] },
      variantes: [
        {
          nom: '1 - Tir du demi-centre',
          etapes: [
            ...FIX_DROITE_BASE,
            {
              texte: "Le demi-centre tire entre le central bloqué et le 2 gauche.",
              courses: { DC: [-2.1, 6.8] },
              tir: { par: 'DC', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - Tir de l'arrière gauche",
          etapes: [
            ...FIX_DROITE_BASE,
            FIX_DROITE_VERS_ARG,
            { texte: "L'arrière gauche tire à 6 m.", tir: 'ArG' },
          ],
        },
        {
          nom: "3 - Passe à l'ailier gauche",
          etapes: [
            ...FIX_DROITE_BASE,
            FIX_DROITE_VERS_ARG,
            {
              texte: "Le 1 gauche sort sur l'arrière gauche, qui donne à l'ailier gauche.",
              courses: { AiG: { vers: [-7.6, 3.2], via: [-8.8, 2.8] } },
              passe: ['ArG', 'AiG', 0.5],
              def: { G1: [-6.0, 5.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '4 - Double kung-fu',
          depart: { AiG: [-9.6, 0.4] },
          etapes: [
            ...FIX_DROITE_BASE,
            {
              texte: "Le demi-centre lobe le ballon au-dessus de la zone: l'arrière droit s'envole et le capte en l'air. L'ailier gauche part du point de corner.",
              courses: { ArD: [2.2, 5.0], AiG: [-8.6, 2.0] },
              passe: ['DC', 'ArD', 0.35],
              enLAir: ['ArD'],
            },
            {
              texte: "Toujours en l'air, l'arrière droit passe à son tour au-dessus de la zone: l'ailier gauche s'envole pour un second kung-fu.",
              courses: { ArD: [2.0, 4.6], AiG: { vers: [-4.6, 3.6], via: [-7.2, 3.6] } },
              passe: ['ArD', 'AiG', 0.3],
              enLAir: ['ArD', 'AiG'],
            },
            {
              texte: "L'ailier gauche tire avant de retomber. L'arrière droit sort de la zone.",
              courses: { ArD: [2.6, 6.6] },
              tir: { par: 'AiG', t: 0.1 },
              enLAir: ['AiG'],
            },
          ],
        },
      ],
    },

    {
      id: 'rentree-ailier-6c5',
      nom: "Rentrée de l'ailier en supériorité",
      alias: 'Fløjindløb i overtal (DA), Wing running in to superiority (EN), "Rentrée de l\'ailier" (FR, Dragør)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "L'ailier gauche rentre en deuxième pivot, le ballon passe de l'arrière gauche au demi-centre puis à l'arrière droit, qui accélère à droite: passe à l'ailier rentré, tir ou ailier droit.",
      description: [
        "Système de supériorité numérique de Dragør HK. L'ailier gauche passe à l'arrière gauche et fait une rentrée: il traverse devant la défense et devient un deuxième pivot.",
        "L'arrière gauche feinte un tir à l'extérieur du 2 gauche et passe au demi-centre, qui arrive lancé. Le demi-centre feinte un tir de loin pour faire sortir son défenseur, puis passe à l'arrière droit, qui accélère vers la droite. Trois possibilités (choisis une variante au-dessus du schéma): passe à l'ailier gauche, qui arrive entre le 2 droit et le pivot qui bloque le central; tir de l'arrière droit entre le 2 et le 1 droits; passe à l'ailier droit, qui tire à l'aile.",
        "Le texte français contient des coquilles de postes (\"ALG effectue une feinte de tir\", \"passe à l'arrière droit ARG\"): le schéma montre que c'est l'arrière gauche qui feinte et l'arrière droit qui reçoit. La défense n'est pas précisée (cinq défenseurs sur le schéma); \"2G\" et \"1G\" désignent le 2 et le 1 droits vus par l'attaque.",
      ],
      objectif: "Faire glisser la défense par la circulation et surprendre avec un deuxième pivot venu de l'aile opposée.",
      pointsCles: [
        "La rentrée de l'ailier part en même temps que sa passe.",
        "Chaque arrière menace vraiment le tir avant de passer.",
        "L'arrière droit accélère vers la droite pour écarter le 2 droit de l'ailier rentré.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "Rentrée de l'ailier, alternative 1 (Dragør HK, trad. HBC Cachan)", url: DRAGOR(880), note: "\"ARD accélère vers la droite et a maintenant les possibilités suivantes: 1. Passe à ALG, qui arrive entre le défenseur 2G et le pivot d'attaque PVT bloquant le défenseur central. 2. Va au tir entre les défenseurs 2G et 1G. 3. Passe à ALD qui tire en position d'ailier.\"" },
        { titre: "Rentrée de l'ailier, alternative 2 (Dragør HK)", url: DRAGOR('880a'), note: "Même texte; schéma du tir de l'arrière droit." },
        { titre: "Rentrée de l'ailier, alternative 3 (Dragør HK)", url: DRAGOR('880b'), note: "Même texte; schéma de la passe à l'ailier droit." },
        TABLE_NOMS('Fløjindløb i overtal', 'Fiche 880: "Fløjindløb i overtal" (DA), "Wing running in to superiority" (EN).'),
      ],
      ballon: 'AiG',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [1.0, 6.5] },
      variantes: [
        {
          nom: "1 - Passe à l'ailier gauche rentré",
          etapes: [
            ...RENTREE_6C5_BASE,
            {
              texte: "L'arrière droit accélère vers la droite: le 2 droit sort sur lui. L'ailier gauche arrive entre le 2 droit et le pivot, qui bloque le central, et reçoit.",
              courses: { ArD: [6.2, 7.6], AiG: [2.4, 6.6] },
              passe: ['ArD', 'AiG', 0.6],
              def: { D2: [5.4, 6.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Tir de l'arrière droit",
          etapes: [
            ...RENTREE_6C5_BASE,
            {
              texte: "Le 2 droit reste sur l'ailier rentré: l'arrière droit accélère et entre entre le 2 et le 1 droits.",
              courses: { AiG: [2.4, 6.6], ArD: [6.0, 6.8] },
              def: { D2: [3.6, 6.0], D1: [7.6, 3.4] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "3 - Passe à l'ailier droit",
          etapes: [
            ...RENTREE_6C5_BASE,
            {
              texte: "Le 1 droit sort sur l'arrière droit, qui donne à l'ailier droit.",
              courses: { AiG: [2.4, 6.6], ArD: [6.0, 7.0], AiD: [8.8, 2.4] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [3.6, 6.0], D1: [6.2, 6.0] },
            },
            { texte: "L'ailier droit tire en position d'ailier.", tir: 'AiD' },
          ],
        },
      ],
    },
    {
      id: 'martinello',
      nom: 'Martinello (supériorité dans le secteur central)',
      alias: 'Martinello (DA), Center superial number (EN), "Supériorité dans le secteur central" (FR)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "L'arrière droit traverse vers le 2 gauche et rend à l'ailier gauche, qui rentre vers le centre: tir ou passe aux arrières lancés vers la droite, jusqu'à l'ailier droit.",
      description: [
        "Système de supériorité numérique de Dragør HK. L'ailier gauche passe à l'arrière gauche pendant que l'arrière droit commence une longue course vers le 2 gauche. L'arrière gauche passe à l'arrière droit, qui rend le ballon à l'ailier gauche.",
        "L'ailier gauche rentre vers le centre et cherche aussi à gêner le 2 gauche. Il tire, ou passe aux joueurs qui arrivent lancés; ceux-ci rentrent leur course et servent celui qui a le meilleur tir à 6 m. Le pivot bloque le central (il reçoit si le central part à gauche). Cinq exemples (choisis une variante au-dessus du schéma): tir de l'ailier gauche; arrière gauche servi par le demi-centre (l'ailier part alors du point de corner); ailier droit; demi-centre libéré par l'arrière gauche; ailier droit après l'arrière gauche et le demi-centre.",
        "Le texte dit que \"ARD ou DC\" arrivent lancés, mais les schémas montrent l'arrière gauche et le demi-centre partir vers la droite (l'arrière droit est déjà à gauche): la fiche suit les schémas. Pour l'exemple b, le texte dit \"le pivot passe à ALD\" alors que le schéma montre une passe du demi-centre: la fiche suit le schéma. La défense n'est pas précisée (cinq défenseurs sur les schémas); le pivot est placé dans le dos du central.",
      ],
      objectif: "Attaquer le centre à plusieurs joueurs lancés pour trouver le tir à 6 m dans une défense à cinq.",
      pointsCles: [
        "La longue course de l'arrière droit attire le 2 gauche avant le retour du ballon à l'ailier.",
        "L'ailier gauche rentre balle en main, menace le tir et gêne le 2 gauche.",
        'Les joueurs lancés "rentrent leur course": ils attaquent le but, pas la touche.',
        "Le pivot lit le central: bloc s'il reste, appel de balle s'il part à gauche.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Supériorité dans le secteur central (Martinello), alternative 1 (Dragør HK, trad. N. Dennefeld)', url: DRAGOR(1489), note: "\"ARD rend la balle à ALG qui rentre vers le centre et soit va au tir, soit passe à ARD ou au demi-centre DC qui arrivent lancés. [...] Le pivot PVT peut également recevoir la balle si le défenseur central part sur la gauche. Dans le cas contraire c'est le boulot de PVT de bloquer le défenseur central.\"" },
        { titre: 'Martinello, alternative 2 (Dragør HK)', url: DRAGOR('1489a'), note: "\"Dans cette exemple, l'arrière gauche ARG reçoit la balle de DC. Dans ce cas, ALG doit démarrer du point de corner.\"" },
        { titre: 'Martinello, alternative 3 (Dragør HK)', url: DRAGOR('1489b'), note: '"Dans cette exemple, le pivot passe à ALD." (le schéma montre une passe du demi-centre)' },
        { titre: 'Martinello, alternative 4 (Dragør HK)', url: DRAGOR('1489c'), note: "\"Dans cette exemple, ARG effectue une fixation et permet à DC d'être libre.\"" },
        { titre: 'Martinello, alternative 5 (Dragør HK)', url: DRAGOR('1489d'), note: '"Dans cette exemple, la balle est passée à ALD qui tire."' },
        TABLE_NOMS('Martinello', 'Fiche 1489: "Martinello" (DA), "Center superial number" (EN).'),
      ],
      ballon: 'AiG',
      absents: ['D3'],
      depart: { ...DEF_50, G3: [0, 7.4], Piv: [0, 6.3], AiG: [-9.2, 3.4] },
      variantes: [
        {
          nom: "1 - Tir de l'ailier gauche",
          etapes: [...MARTINELLO_BASE, { texte: "L'ailier gauche tire.", tir: 'AiG' }],
        },
        {
          nom: "a - L'arrière gauche servi par le demi-centre",
          depart: { AiG: [-9.6, 0.6] },
          etapes: [
            ...MARTINELLO_BASE,
            MARTINELLO_VERS_DC,
            {
              texte: "Le 2 droit sort sur le demi-centre, qui donne à l'arrière gauche, entre le central et le 2 droit.",
              courses: { ArG: [2.6, 7.0] },
              passe: ['DC', 'ArG', 0.4],
              def: { D2: [4.6, 6.8] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "b - Passe à l'ailier droit",
          etapes: [
            ...MARTINELLO_BASE,
            MARTINELLO_VERS_DC,
            {
              texte: "Le demi-centre attire le 1 droit et donne à l'ailier droit.",
              courses: { DC: [5.4, 7.0], AiD: [7.8, 2.8] },
              passe: ['DC', 'AiD', 0.5],
              def: { D1: [6.2, 5.6], D2: [4.0, 6.2] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "c - L'arrière gauche libère le demi-centre",
          etapes: [
            ...MARTINELLO_BASE,
            ...MARTINELLO_VERS_ARG,
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "d - Jusqu'à l'ailier droit",
          etapes: [
            ...MARTINELLO_BASE,
            ...MARTINELLO_VERS_ARG,
            {
              texte: "Le 1 droit sort sur le demi-centre, qui donne à l'ailier droit.",
              courses: { AiD: [8.0, 2.6] },
              passe: ['DC', 'AiD', 0.5],
              def: { D1: [6.4, 5.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    {
      id: 'ailier-vers-arriere-oppose',
      nom: "Ailier vers l'arrière opposé (supériorité)",
      alias: 'Fløj til modsat back (DA, fiche danoise x873), Wing to opposite back',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "Après un croisé arrière/ailier à gauche, l'ailier fixe le central et sert l'arrière droit; écran du pivot sur le central, et le demi-centre entre entre l'écran et le 2 droit.",
      description: [
        "Système de supériorité numérique de Dragør HK, présent seulement dans la version danoise. Il commence par exemple par un croisé arrière/ailier gauche: l'ailier gauche prend le ballon, attaque le défenseur central et passe à l'arrière droit.",
        "Le pivot se déplace et pose un écran sur le central. L'arrière droit attaque l'espace entre le 2 et le 1 droits. Presque en même temps, le demi-centre s'engage entre l'écran et le 2 droit, reçoit de l'arrière droit et tire. Si le 1 droit rentre pour couvrir, l'arrière droit sert l'ailier droit; si personne ne sort sur l'arrière droit, il tire lui-même (choisis une variante au-dessus du schéma).",
        "Selon la fiche, le système ne marche que si l'écran tient et si le 2 droit est fixé par l'arrière droit. Le texte danois mélange les côtés des défenseurs (\"V2\", \"H2\"); la fiche suit le schéma, qui montre cinq défenseurs.",
      ],
      objectif: "Déplacer le jeu de gauche à droite pour attaquer le côté droit d'une défense à cinq avec trois joueurs.",
      pointsCles: [
        "L'écran du pivot sur le central doit tenir.",
        "L'arrière droit fixe vraiment le 2 droit en attaquant l'intervalle 2-1.",
        "Le demi-centre part presque en même temps que l'arrière droit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Fløj til modsat back (Dragør HK, version danoise)', url: DRAGOR_DA(873), note: '"ST rykker over og sætter screening på centerforsvarsspilleren, og HB angriber pladsen mellem forsvarets V2 og V1. PM rykker næsten samtidig ind mellem screeningen og forsvarets V2, modtager bolden fra HB og afslutter. [...] Rykker forsvarets V1 ind og dækker, spilles HF. Dækker ingen HB, skyder denne selv."' },
        TABLE_NOMS('Fløj til modsat back', 'Fiche 873 "Fløj til modsat back": seulement en danois, rubrique des systèmes de supériorité.'),
      ],
      ballon: 'ArG',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [2.3, 6.4] },
      variantes: [
        {
          nom: "1 - Le demi-centre entre l'écran et le 2",
          etapes: [
            ...AILIER_OPPOSE_BASE,
            {
              texte: "Presque en même temps, le demi-centre s'engage entre l'écran et le 2 droit et reçoit de l'arrière droit.",
              courses: { DC: { vers: [2.4, 7.2], via: [1.4, 9.0] } },
              passe: ['ArD', 'DC', 0.5],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "2 - Le 1 rentre: passe à l'ailier droit",
          etapes: [
            ...AILIER_OPPOSE_BASE,
            {
              texte: "Le demi-centre s'engage, mais le 1 droit rentre pour couvrir: l'arrière droit sert l'ailier droit.",
              courses: { DC: { vers: [2.4, 7.2], via: [1.4, 9.0] }, AiD: [8.6, 2.4] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D1: [6.4, 4.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "3 - Personne ne sort: tir de l'arrière droit",
          etapes: [
            ...AILIER_OPPOSE_BASE,
            {
              texte: "Le 2 droit se resserre sur le demi-centre et personne ne sort sur l'arrière droit, qui continue vers le but.",
              courses: { DC: { vers: [2.4, 7.2], via: [1.4, 9.0] }, ArD: [6.0, 6.2] },
              def: { D2: [4.0, 6.0] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- Infériorité numérique (Dragør) */
    {
      id: 'inferiorite-vers-superiorite',
      nom: "D'infériorité à supériorité numérique",
      alias: 'Undertal til overtal (DA), Minority to superior (EN)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "À cinq contre six, l'ailier droit va bloquer le 2 droit, le demi-centre prend le bloc et l'arrière droit se décale à l'aile: 2 contre 1 sur le 1 droit.",
      description: [
        "Système de Dragør HK pour jouer en infériorité numérique (cinq attaquants, sans pivot). L'ailier droit, ballon en main, part bloquer le 2 droit. Il passe au demi-centre, qui prend le bloc. En même temps, l'arrière droit se décale en position d'ailier.",
        "Le demi-centre tire, ou, si le 1 droit monte sur lui, passe à l'arrière droit, qui tire à l'aile (choisis une variante au-dessus du schéma). Le bloc crée localement un 2 contre 1 sur le 1 droit: d'où le nom.",
        "La fiche note les défenseurs du point de vue de la défense (\"2G\", \"1G\" = le 2 et le 1 droits vus par l'attaque) et l'ailier droit \"DX\". La défense n'est pas précisée; le schéma montre une 0-6.",
      ],
      objectif: "Recréer une supériorité locale à droite malgré le joueur en moins.",
      pointsCles: [
        "L'ailier droit bloque le 2 droit par l'extérieur.",
        "Le demi-centre passe à l'extérieur du bloc, entre le 2 et le 1.",
        "L'arrière droit occupe l'aile laissée libre: il punit la montée du 1.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "D'infériorité numérique à supériorité numérique (Dragør HK)", url: DRAGOR(68), note: "\"Lorsque l'ailier droit DX est en possession de la balle, il effectue un départ de manière à aller bloquer le défenseur 2G. La balle est passée au demi-centre DC qui prend le bloc. Dans le même temps l'arrière droit ARD se décale en position d'ailier. DC peut aller au tir ou - si le défenseur 1G monte sur lui - passer à ARD, qui prend le tir à l'aile.\"" },
        TABLE_NOMS('Undertal til overtal', 'Fiche 68: "Undertal til overtal" (DA), "Minority to superior" (EN).'),
      ],
      ballon: 'AiD',
      absents: ['Piv'],
      variantes: [
        {
          nom: '1 - Tir du demi-centre',
          etapes: [
            ...INF_SUP_BASE,
            { texte: "Le 1 droit reste sur l'arrière droit: le demi-centre tire.", tir: 'DC', def: { D1: [7.8, 2.6] } },
          ],
        },
        {
          nom: "2 - Le 1 monte: tir de l'arrière droit à l'aile",
          etapes: [
            ...INF_SUP_BASE,
            {
              texte: "Le 1 droit monte sur le demi-centre, qui passe à l'arrière droit, seul à l'aile.",
              passe: ['DC', 'ArD', 0.4],
              def: { D1: [7.3, 4.8] },
            },
            { texte: "L'arrière droit tire à l'aile.", tir: 'ArD' },
          ],
        },
      ],
    },

    {
      id: 'inferiorite-dragor',
      nom: 'Infériorité numérique face à une défense haute ou aplatie',
      alias: 'Undertal mod højt forsvar / mod lavt forsvar (DA), Minority against high / low defense (EN)',
      categorie: 'Infériorité numérique',
      defense: '5-1 ou 0-6 (5 contre 6)',
      resume: "À cinq contre six: bloc de l'ailier gauche sur l'avancé (défense haute) ou rentrée de l'ailier droit jusqu'au 2 gauche (défense aplatie).",
      description: [
        "Deux systèmes de Dragør HK pour l'infériorité numérique (cinq attaquants, sans pivot), envoyés par Kim Ludvig.",
        "Face à une défense haute (avec un avancé): l'ailier gauche part balle en main et passe à son arrière, qui joue avec le demi-centre. Le demi-centre renverse sur l'arrière gauche, qui fixe, pendant que l'ailier gauche pose un bloc sur l'avancé. Le demi-centre, après une feinte vers la gauche, reçoit de nouveau, prend le bloc et tire, ou passe à l'arrière droit, \"le décalage étant effectué\".",
        "Face à une défense aplatie (alignée): l'ailier droit passe à son arrière et fait une rentrée jusqu'au 2 gauche, qu'il bloque. Le ballon circule jusqu'à l'arrière gauche, qui fixe au centre du dispositif. Il tire, ou passe à l'ailier gauche qui, après une feinte initiale, prend le bloc de l'ailier droit et tire.",
        "Les fiches nomment le 2 gauche \"2D\" (côté vu par la défense). Le côté du bloc sur l'avancé (à sa droite) et le placement des joueurs viennent des schémas.",
      ],
      objectif: "Compenser le joueur en moins en transformant un ailier en bloqueur.",
      pointsCles: [
        "L'ailier qui bloque traverse devant la défense, sans entrer dans la zone.",
        "Défense haute: le bloc se pose sur l'avancé, du côté où le demi-centre va passer.",
        "Défense aplatie: l'arrière gauche fixe vraiment au centre avant de choisir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Infériorité numérique face à une défense haute (Dragør HK, envoyé par Kim Ludvig)', url: DRAGOR(38), note: "\"ARG effectue une fixation tandis que ALG pose un bloc sur le défenseur avancé 3C. DC reçoit à nouveau la balle après avoir feinté vers la gauche, il prend le bloc et va au tir, ou passe à l'arrière droit ARD, le décalage étant effectué.\"" },
        { titre: 'Infériorité numérique face à une défense aplatie (Dragør HK, envoyé par Kim Ludvig)', url: DRAGOR(121), note: "\"L'ailier droit ALD passe à son arrière ARD et effectue une rentrée jusqu'au défenseur opposé 2D. [...] Il peut alors soit tirer, soit passer à l'ailier gauche qui, après une feinte initiale, prend le bloc de ALD et tire.\"" },
        TABLE_NOMS('Undertal mod højt / lavt forsvar', 'Fiches 38 et 121: "Undertal mod højt forsvar" et "Undertal mod lavt forsvar" (DA).'),
      ],
      ballon: 'AiG',
      absents: ['Piv'],
      variantes: [
        {
          nom: '1 - Défense haute: tir du demi-centre',
          dispositif: '5-1',
          etapes: [...INF_HAUTE_BASE, { texte: 'Le demi-centre tire.', tir: 'DC' }],
        },
        {
          nom: "2 - Défense haute: passe à l'arrière droit",
          dispositif: '5-1',
          etapes: [
            ...INF_HAUTE_BASE,
            {
              texte: "Le 2 droit sort sur le demi-centre: le décalage est fait, il passe à l'arrière droit.",
              passe: ['DC', 'ArD', 0.4],
              def: { D2: [3.6, 6.8] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "3 - Défense aplatie: tir de l'arrière gauche",
          dispositif: '0-6',
          ballon: 'AiD',
          etapes: [...INF_APLATIE_BASE, { texte: "L'arrière gauche tire.", tir: 'ArG' }],
        },
        {
          nom: "4 - Défense aplatie: l'ailier gauche prend le bloc",
          dispositif: '0-6',
          ballon: 'AiD',
          etapes: [
            ...INF_APLATIE_BASE,
            {
              texte: "L'ailier gauche, après sa feinte, prend le bloc de l'ailier droit: il entre à l'intérieur du 2 gauche et reçoit de l'arrière gauche.",
              courses: { AiG: { vers: [-3.0, 6.8], via: [-6.0, 7.4] } },
              passe: ['ArG', 'AiG', 0.55],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },
    /* ---------------------------------------------------------------- Supériorité 6 contre 5 (Allemagne, Espagne) */
    {
      id: 'gold',
      nom: "Gold (le demi-centre s'enfonce au pivot)",
      alias: 'Gold 1 à 5 (handballhaus, DE)',
      categorie: 'Supériorité numérique',
      defense: '5 défenseurs (6 contre 5)',
      resume: "En supériorité, le demi-centre s'enfonce en deuxième pivot après la passe de l'arrière gauche et lui rend le ballon; la course de l'arrière gauche décide de la fin.",
      description: [
        "Système de supériorité numérique du site allemand handballhaus.de (cinq variantes animées, non visibles aujourd'hui). Le demi-centre reçoit de l'arrière gauche (ou de l'arrière droit), s'enfonce vers les 6 m et rejoue le ballon dans la course vers l'avant de l'arrière gauche.",
        "L'arrière gauche varie sa course: s'il attaque l'intervalle entre le 2 et le central, il peut servir le pivot ou le demi-centre au pivot; s'il met la pression sur le central, il peut donner à l'arrière droit ou au demi-centre au pivot; s'il se déporte vers le 2 gauche, il peut servir le pivot ou l'ailier gauche. La fiche montre une fin pour chaque course (choisis une variante au-dessus du schéma).",
        "Le texte ne donne pas la place du pivot: il est placé ici entre le 1 et le 2 gauches, comme dans un concept de supériorité très proche décrit sur un forum allemand (l'arrière gauche part en arc vers le centre, pivot entre le 1 et le 2; options pivot, ailier gauche, tir, percussion parallèle). Fiche de principe: les déplacements sont une interprétation du texte.",
      ],
      objectif: "Donner à l'arrière gauche, lancé, trois lectures différentes face à une défense à cinq.",
      pointsCles: [
        "Le demi-centre s'enfonce juste après sa réception: il devient un deuxième pivot.",
        "La passe du demi-centre arrive dans la course de l'arrière gauche, pas à l'arrêt.",
        "\"En supériorité, percuter vers l'extérieur en déplaçant l'espace\" (règle de base de handballhaus).",
      ],
      fiabilite: 'partielle',
      sources: [
        HHAUS('gold', 'Gold 1', '"RM sinkt nach Pass von RL (oder auch RR) ein und spielt den Ball in die Vorwärtsbewegung von RL. [...] Durch Zug auf Lücke 2 - 3 ergeben sich gute Möglichkeiten den KL oder RM am Kreis anzuspielen. Durch Druck auf HM besteht eine gute Möglichkeit auf RR abzulegen oder RM am Kreis anzuspielen. Durch die Bewegung gen HR kann der KS oder auch LA bedient werden."'),
        {
          titre: 'Verteidigung gegen bekannte Überzahl-Konzeption (forum handballecke.de)',
          url: 'https://www.handballecke.de/forum/thread/28437-verteidigung-gegen-bekannte-%C3%BCberzahl-konzeption/',
          note: "Concept \"bien connu\": l'arrière gauche passe au demi-centre, reçoit en retour et part en arc par le centre; pivot entre le 1 et le 2 gauches.",
        },
      ],
      ballon: 'ArG',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [-6.2, 4.4] },
      variantes: [
        {
          nom: "1 - Attaque de l'intervalle 2-central: pivot",
          etapes: [
            ...GOLD_BASE,
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 2 gauche et le central. Le 2 gauche ferme vers l'intérieur.",
              courses: { ArG: [-2.6, 8.0] },
              def: { G2: [-3.2, 6.8], G3: [-1.2, 7.2] },
            },
            {
              texte: "Le pivot, laissé libre entre le 1 et le 2, reçoit.",
              courses: { Piv: [-5.6, 5.0] },
              passe: ['ArG', 'Piv', 0.3],
              def: { G1: [-7.0, 3.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '2 - Pression sur le central: arrière droit',
          etapes: [
            ...GOLD_BASE,
            {
              texte: "L'arrière gauche attaque droit sur le central, qui sort sur lui. Le 2 droit se resserre sur le demi-centre au pivot.",
              courses: { ArG: [-1.0, 8.4] },
              def: { G3: [-0.6, 7.5], D2: [3.0, 6.4] },
            },
            {
              texte: "L'arrière gauche donne à l'arrière droit, libre (il pouvait aussi servir le demi-centre au pivot).",
              courses: { ArD: [4.6, 8.4] },
              passe: ['ArG', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: '3 - Course vers le 2 gauche: ailier gauche',
          etapes: [
            ...GOLD_BASE,
            {
              texte: "L'arrière gauche se déporte vers le 2 gauche. Le 1 gauche se resserre sur le pivot.",
              courses: { ArG: [-5.6, 8.0] },
              def: { G2: [-5.0, 6.6], G1: [-6.8, 3.6] },
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche, libre (il pouvait aussi servir le pivot).",
              courses: { AiG: [-8.6, 2.6] },
              passe: ['ArG', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    {
      id: 'aussen-weg',
      nom: "Percussions vers l'extérieur en supériorité",
      alias: 'Außen weg 1/2/3, Außen weg mit Sperre (handballhaus, DE)',
      categorie: 'Supériorité numérique',
      defense: '5 défenseurs (6 contre 5)',
      resume: "L'ailier puis l'arrière gauches percutent vers l'extérieur, le demi-centre reçoit décalé: passe au pivot, passe parallèle à l'arrière droit, ou percée avec écran du pivot.",
      description: [
        "Systèmes de supériorité numérique de handballhaus.de, qui appliquent la règle de base du site: \"en supériorité, percuter vers l'extérieur en déplaçant l'espace\". Le ballon va du demi-centre à l'arrière gauche puis à l'ailier gauche. L'ailier percute vers l'extérieur et rend à l'arrière gauche, qui percute à son tour vers l'extérieur, dans l'intervalle entre le 1 et le 2, et donne au demi-centre.",
        "Le demi-centre reçoit décalé et attire le central. Sans écran (\"Außen weg\"): le pivot se place près du 2 gauche; le demi-centre le sert, ou fait une passe parallèle à l'arrière droit, qui perce ou sert le pivot. Avec écran (\"Außen weg mit Sperre\"): le pivot pose un écran sur le central; le demi-centre fait un crochet et perce entre le central et le 2 droit; si le 2 droit vient aider, il donne à l'arrière droit, qui perce.",
        "Les animations des trois variantes ne sont plus visibles: les placements sont une interprétation du texte. Les côtés des défenseurs du site sont vus par la défense (\"HR\" = le 2 gauche vu par l'attaque). La fin \"arrière droit vers le pivot\" (variante 2 du site) n'est pas dessinée.",
      ],
      objectif: "Étirer la défense à cinq vers la gauche pour créer un surnombre au centre et à droite.",
      pointsCles: [
        "Chaque percussion part vers l'extérieur, pour écarter le défenseur de son partenaire.",
        "Le demi-centre reçoit décalé, à distance du central, puis l'attire.",
        "Avec écran: le crochet du demi-centre part du côté de l'écran.",
      ],
      fiabilite: 'partielle',
      sources: [
        HHAUS('aussen-weg', 'Außen weg', '"LA stößt nach Außen weg und passt den Ball zu RL, der wiederum in die Lücke 1 - 2 nach Außen wegstößt und den Ball weiter zu RM spielt. RM nimmt den Ball raumversetzt an, zieht HM auf sich und der KS positioniert sich für ein Anspiel an HR. Nun entscheidet RM situationsbedingt, Kreisanspiel (Variante 1) oder Parallelpass zu RR. RR sucht den Durchbruch (Variante 3) oder Pass an den KS (Variante 2)."'),
        HHAUS('aussen-weg-mit-sperre', 'Außen weg mit Sperre', '"Passfolge RM - RL - LA. [...] der KS stellt eine Sperre gegen HM. RM schlägt einen Haken und sucht den Durchbruch zwischen HM und HL mit Unterstützung der Kreissperre. HL hilft aus und RM spielt den entscheidenden Pass zum durchbrechenden RR."'),
      ],
      ballon: 'DC',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [1.6, 6.4] },
      variantes: [
        {
          nom: '1 - Außen weg: passe au pivot',
          etapes: [
            ...AUSSEN_WEG_BASE,
            AUSSEN_WEG_PIVOT,
            { texte: 'Le demi-centre sert le pivot.', passe: ['DC', 'Piv', 0.3] },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Außen weg: percée de l'arrière droit",
          etapes: [
            ...AUSSEN_WEG_BASE,
            AUSSEN_WEG_PIVOT,
            {
              texte: "Le 2 gauche se resserre sur le pivot: passe parallèle à l'arrière droit.",
              courses: { ArD: [3.4, 8.0] },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [3.8, 6.6] },
            },
            {
              texte: "L'arrière droit perce entre le 2 droit et le central et tire.",
              courses: { ArD: [2.2, 7.0] },
              tir: { par: 'ArD', t: 0.6 },
            },
          ],
        },
        {
          nom: '3 - Außen weg mit Sperre',
          etapes: [
            ...AUSSEN_WEG_BASE,
            {
              texte: "Le demi-centre reçoit décalé et attire le central. Le pivot pose un écran sur le central.",
              courses: { DC: [-1.4, 8.2], Piv: { vers: [-0.1, 7.0], ecran: true } },
              def: { G3: [-1.0, 7.3] },
            },
            {
              texte: "Le demi-centre fait un crochet et perce entre le central et le 2 droit, appuyé par l'écran. Le 2 droit vient aider.",
              courses: { DC: { vers: [1.4, 7.8], via: [0.2, 8.8] } },
              def: { D2: [2.4, 6.8] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit, qui perce.",
              courses: { ArD: [4.0, 7.6] },
              passe: ['DC', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    {
      id: 'passtauschung-superiorite',
      nom: 'Feinte de passe en supériorité',
      alias: 'Passtäuschung - Sperre 1/2, Passtäuschung - Nachlaufen (handballhaus, DE)',
      categorie: 'Supériorité numérique',
      defense: '5 défenseurs (6 contre 5)',
      resume: "Le demi-centre, servi par l'arrière droit tout près de la défense, feinte une passe à gauche puis perce avec un écran frontal du pivot, ou rend à l'arrière droit et le suit.",
      description: [
        "Systèmes de supériorité numérique de handballhaus.de. L'arrière droit passe au demi-centre, placé tout près de la défense. Le demi-centre feinte une passe vers l'arrière gauche, sans trop se décaler à droite.",
        "Avec écran (\"Passtäuschung - Sperre\"): le demi-centre perce entre le 2 et le central, avec un bref écran frontal du pivot; sans dribble, c'est bien plus rapide. Si le défenseur voisin aide à temps, le demi-centre passe à l'arrière droit, qui percute en parallèle. En suiveur (\"Passtäuschung - Nachlaufen\"): après la feinte, le demi-centre rend à l'arrière droit, qui attaque vers l'intérieur et sert le demi-centre qui le suit; un écran frontal du pivot soutient l'action.",
        "Les animations ne sont plus visibles: la fiche interprète \"entre 2 et 3\" comme l'intervalle entre le central et le 2 droit, du côté de l'arrière droit, ce qui rend logique la passe de secours vers lui. Le site nomme ce défenseur voisin \"IL\".",
      ],
      objectif: "Déplacer la défense par une feinte de passe, puis percer au centre avant qu'elle se replace.",
      pointsCles: [
        "Le demi-centre reçoit tout près de la défense.",
        "La feinte de passe ne l'emmène pas trop à droite.",
        "Percer sans dribbler: l'action est plus rapide et plus efficace.",
        "L'écran du pivot est bref et frontal.",
      ],
      fiabilite: 'partielle',
      sources: [
        HHAUS('passtaeuschung-sperre', 'Passtäuschung - Sperre 1', '"RR passt zu RM, der sich sehr nahe an der Abwehr befindet, RM spielt eine Passtäuschung zu RL, ohne (zu weit) auf die rechte Spielfeldhälfte zu gelangen. Nach Passtäuschung wird der Durchbruch zwischen 2 - 3 gesucht, der durch eine kurzfristige Frontalsperre vom KS unterstützt wird. Die Durchführung des Ablaufs ohne Prellen ist deutlich schneller und effektiver. Hilft IL rechtzeitig aus, erfolgt der Pass zum parallel stoßenden RR."'),
        HHAUS('passtaeuschung-nachlaufen', 'Passtäuschung - Nachlaufen', '"RR passt zu RM, RM spielt eine Passtäuschung zu RL, dann einen Rückpass zu RR. RR zieht auf IL und spielt den nachlaufenden RM an. Die Aktion wird durch eine entsprechende Frontalsperre des Kreisläufers unterstützt."'),
      ],
      ballon: 'ArD',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [1.6, 6.4] },
      variantes: [
        {
          nom: '1 - Écran frontal: percée du demi-centre',
          etapes: [...PASSTAUSCHUNG_SPERRE, { texte: 'Le demi-centre tire.', tir: 'DC' }],
        },
        {
          nom: "2 - Écran frontal: le 2 aide, passe à l'arrière droit",
          etapes: [
            ...PASSTAUSCHUNG_SPERRE,
            {
              texte: "Le 2 droit aide à temps: le demi-centre passe à l'arrière droit, qui percute en parallèle.",
              courses: { ArD: [4.4, 7.6] },
              passe: ['DC', 'ArD', 0.4],
              def: { D2: [2.8, 6.6] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "3 - Le demi-centre suit l'arrière droit (Nachlaufen)",
          etapes: [
            PASSTAUSCHUNG_DEBUT,
            {
              texte: "Le demi-centre feinte une passe vers l'arrière gauche, puis rend à l'arrière droit.",
              courses: { DC: [-0.2, 8.2], ArD: [4.4, 8.6] },
              passe: ['DC', 'ArD', 0.5],
              def: { G3: [-0.4, 7.3] },
            },
            {
              texte: "L'arrière droit attaque vers l'intérieur, sur le 2 droit. Le demi-centre le suit dans son dos. Le pivot pose un écran frontal sur le central.",
              courses: { ArD: [3.0, 7.8], DC: { vers: [1.4, 9.0], via: [0.8, 9.4] }, Piv: { vers: [0.6, 7.2], ecran: true } },
              def: { D2: [3.4, 6.6] },
            },
            {
              texte: "L'arrière droit donne au demi-centre qui le suit; celui-ci perce entre le central et le 2 droit.",
              courses: { DC: [1.9, 7.2] },
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    {
      id: 'croise-en-superiorite',
      nom: 'Croisés en supériorité',
      alias: 'Kreuzen RM-RL (in Überzahl), Kreuzen RM-RR mit Sperre (handballhaus, DE)',
      categorie: 'Supériorité numérique',
      defense: '5 défenseurs (6 contre 5)',
      resume: "Croisé demi-centre / arrière gauche avec le pivot caché à l'opposé, ou croisé demi-centre / arrière droit avec écran frontal du pivot sur le central.",
      description: [
        "Deux croisés de supériorité numérique de handballhaus.de. Croisé demi-centre / arrière gauche: le pivot joue du côté opposé au ballon, dans le dos du 2 droit, et s'offre à l'arrière gauche après le croisé. Si le central sort et que le 2 droit ne peut pas couper la passe, l'arrière gauche sert le pivot. Si le 2 droit coupe la passe, l'arrière gauche joue la percussion parallèle à droite. Si le central reste très en retrait, un arrière gauche bon tireur tire de 7 à 8 m.",
        "Croisé demi-centre / arrière droit avec écran: après la passe de l'arrière droit, le demi-centre part un peu à gauche puis attaque à pleine vitesse la jointure entre le central et le 2 droit. L'arrière droit croise en sens inverse; au bon moment, le pivot pose un écran frontal sur le central fixé. L'arrière droit perce, ou joue la percussion parallèle vers la gauche.",
        "Les animations ne sont plus visibles: les placements sont une interprétation du texte. Les côtés des défenseurs du site sont vus par la défense (\"HL\" = le 2 droit vu par l'attaque).",
      ],
      objectif: "Utiliser le croisé pour fixer le central et exploiter le surnombre du côté où le croisé se termine.",
      pointsCles: [
        "Croisé avec l'arrière gauche: le pivot attend dans le dos du 2 droit, du côté opposé au ballon.",
        "Le 2 droit doit choisir entre couper la passe au pivot et défendre sur l'arrière droit.",
        "Croisé avec l'arrière droit: le demi-centre attaque \"dangereux pour le but\", à pleine vitesse.",
        "L'écran frontal du pivot se pose au moment où le central est fixé.",
      ],
      fiabilite: 'partielle',
      sources: [
        HHAUS('kreuzen-rm-rl', 'Kreuzen RM - RL', '"RM kreuzt mit RL, der Kreisspieler agiert auf der ballfernen Seite hinter dem HL [...] Falls HM offensiv agiert [...], dann ist der Pass zum Kreisspieler die erste Option (Variante 1). Verstellt HL räumlich die Passmöglichkeit an den Kreis, dann ergibt sich eine gute Parallelstoßmöglichkeit auf der rechten Seite (Variante 2). Agiert HM generell sehr defensiv, dann ist auch ein Wurf aus der mittleren Fernwurfzone (7 - 8 m) [...] erfolgsversprechend."'),
        HHAUS('kreuzen-rm-rr-mit-sperre', 'Kreuzen RM - RR mit Sperre', '"RM läuft nach Pass von RR ein wenig nach links um dann mit vollem Antritt und torgefährlich auf die Nahtstelle zwischen HM und HL. RR kreuzt entgegen, im passenden Moment stellt der Kreisspieler an den gebundenen HM eine Frontalsperre. RR kann jetzt selber den Durchbruch suchen oder es ergibt sich eine Parallelstoßmöglichkeit nach links."'),
      ],
      ballon: 'DC',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [3.7, 6.0] },
      variantes: [
        {
          nom: "1 - Croisé avec l'arrière gauche: pivot",
          etapes: [
            ...CROISE_RM_RL,
            {
              texte: "Le central est sorti et le 2 droit ne peut pas couper la passe: l'arrière gauche sert le pivot.",
              courses: { ArG: [0.8, 8.4], Piv: [3.2, 6.3] },
              passe: ['ArG', 'Piv', 0.4],
              def: { G3: [0.0, 7.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Croisé avec l'arrière gauche: percussion parallèle à droite",
          etapes: [
            ...CROISE_RM_RL,
            {
              texte: "Le 2 droit se place pour couper la passe au pivot: l'arrière gauche joue la percussion parallèle avec l'arrière droit.",
              courses: { ArG: [1.4, 8.2], ArD: [4.6, 8.0] },
              passe: ['ArG', 'ArD', 0.5],
              def: { D2: [3.0, 6.8] },
            },
            {
              texte: "L'arrière droit perce entre le 2 et le 1 droits et tire.",
              courses: { ArD: [5.4, 6.8] },
              tir: { par: 'ArD', t: 0.6 },
              def: { D1: [6.6, 4.4] },
            },
          ],
        },
        {
          nom: "3 - Croisé avec l'arrière gauche: tir de loin",
          etapes: [
            ...CROISE_RM_RL,
            {
              texte: "Le central reste très en retrait: l'arrière gauche tire de 7 à 8 m.",
              courses: { ArG: [0.6, 8.2] },
              tir: { par: 'ArG', t: 0.6 },
              def: { G3: [0, 7.0] },
            },
          ],
        },
        {
          nom: "4 - Croisé avec l'arrière droit et écran: percée",
          ballon: 'ArD',
          depart: { Piv: [-1.0, 6.5] },
          etapes: [
            ...CROISE_RM_RR,
            {
              texte: "L'arrière droit perce à gauche de l'écran et tire.",
              courses: { ArD: [-1.6, 7.6] },
              tir: { par: 'ArD', t: 0.6 },
              def: { G2: [-2.8, 6.6] },
            },
          ],
        },
        {
          nom: "5 - Croisé avec l'arrière droit et écran: percussion parallèle à gauche",
          ballon: 'ArD',
          depart: { Piv: [-1.0, 6.5] },
          etapes: [
            ...CROISE_RM_RR,
            {
              texte: "Le 2 gauche ferme: l'arrière droit joue la percussion parallèle vers la gauche, avec l'arrière gauche.",
              courses: { ArD: [-1.0, 8.2], ArG: [-4.4, 7.8] },
              passe: ['ArD', 'ArG', 0.4],
              def: { G2: [-2.4, 6.8] },
            },
            {
              texte: "L'arrière gauche perce et tire.",
              courses: { ArG: [-4.6, 6.8] },
              tir: { par: 'ArG', t: 0.6 },
            },
          ],
        },
      ],
    },

    {
      id: 'la-yugoslava',
      nom: 'La yougoslave (le centre circule devant son défenseur)',
      alias: 'La yugoslava (ES)',
      categorie: 'Combinaisons à nom de pays',
      defense: '5 défenseurs (6 contre 5)',
      resume: "En 6 contre 5, après un changement de sens de la passe, le demi-centre passe sans ballon devant son défenseur et entre par le bloc du pivot sur le central.",
      description: [
        "Combinaison de supériorité numérique (6 contre 5) utilisée par les équipes de jeunes de l'Atlético de Madrid à la fin des années 1980 et au début des années 1990, selon un témoignage sur un forum espagnol.",
        "Le ballon circule de l'ailier vers le demi-centre, qui fixe son vis-à-vis en largeur. Puis la passe change de sens: l'arrière fixe entre le dernier et l'avant-dernier défenseur. Le demi-centre profite de ce que les défenseurs regardent le ballon: appuyé par le bloc du pivot sur le défenseur central, il passe devant son défenseur, entre par le bloc sans ballon et reçoit de l'arrière.",
        "Une seule source, qui ne précise pas le côté: la fiche la joue à gauche, et le placement des joueurs est une interprétation du texte.",
      ],
      objectif: "Profiter de l'attention de la défense sur le ballon pour faire entrer le demi-centre sans ballon.",
      pointsCles: [
        "Le demi-centre fixe d'abord en largeur, loin de la future zone d'entrée.",
        "Le changement de sens de la passe attire les regards vers l'arrière.",
        "Le demi-centre coupe devant son défenseur, au ras du bloc du pivot.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Jugadas (forum balonmano.mforos.com, Luckistar, 2006)',
          url: 'https://balonmano.mforos.com/142972/4655680-jugadas/',
          note: '"Jugada de superioridad numérica 6x5 [...] El central aprovecha que los defensores no le miran y apoyado por el bloqueo del pivote sobre el central defensivo circula por delante del defensor y entrando por el bloqueo sin el balón recibe del lateral."',
        },
      ],
      ballon: 'AiG',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [-1.0, 6.5] },
      etapes: [
        {
          texte: "Le ballon circule de l'ailier gauche vers l'arrière gauche.",
          passe: ['AiG', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche donne au demi-centre, qui fixe son vis-à-vis en largeur, vers la droite.",
          courses: { DC: [1.8, 8.6] },
          passe: ['ArG', 'DC', 0.2],
          def: { G3: [1.2, 7.6] },
        },
        {
          texte: "Changement de sens: le demi-centre rend à l'arrière gauche, qui fixe entre le 1 et le 2 gauches.",
          courses: { ArG: [-6.2, 7.6] },
          passe: ['DC', 'ArG', 0.2],
          def: { G2: [-5.4, 6.6], G1: [-7.2, 3.6] },
        },
        {
          texte: "Les défenseurs regardent le ballon. Le pivot bloque le central; le demi-centre passe devant son défenseur, entre par le bloc sans ballon et reçoit de l'arrière gauche.",
          courses: { Piv: { vers: [-0.6, 6.6], ecran: true }, DC: { vers: [-2.4, 7.2], via: [0.4, 8.6] } },
          passe: ['ArG', 'DC', 0.7],
          def: { G3: [0.4, 7.0] },
        },
        { texte: 'Le demi-centre tire.', tir: 'DC' },
      ],
    },

    {
      id: 'uberpass-kiel',
      nom: "Passe par-dessus vers l'ailier opposé (THW Kiel)",
      alias: 'Überpass (DE); "Überzahlspiel - Variante Pass RR auf LA" (handballtraining.de)',
      categorie: 'Supériorité numérique',
      defense: '5-0 (6 contre 5)',
      resume: "En supériorité, le jeu est déplacé vers la droite; la défense à cinq glisse fort côté ballon et le demi-centre saute pour une longue passe par-dessus vers l'ailier gauche.",
      description: [
        "Variante de supériorité numérique du THW Kiel, analysée par handballtraining.de à partir d'une vidéo. Le jeu est d'abord déplacé du demi-centre vers la droite. La défense en infériorité doit glisser fort du côté du ballon, et ses défenseurs extérieurs rentrent loin vers le centre.",
        "Le demi-centre (Domagoj Duvnjak dans la vidéo) saute et fait une longue passe par-dessus la défense (\"Überpass\") vers l'ailier gauche opposé (Rune Dahmke), qui tire avec un bon angle. Au moment du saut, le demi-centre peut servir presque tous ses partenaires: faute d'attribution claire, la défense à cinq ne peut pas défendre toutes les passes en un contre un.",
        "Le titre de l'article parle d'une passe de l'arrière droit, mais le texte et le schéma montrent le demi-centre décalé à droite. L'article propose un exercice pour s'entraîner: dribble vers un côté autour d'un plot à 8 m, puis passe en suspension vers l'aile opposée.",
      ],
      objectif: "Punir le glissement d'une défense à cinq en trouvant l'ailier opposé, laissé seul.",
      pointsCles: [
        "Déplacer vraiment le jeu d'un côté pour faire glisser la défense.",
        "Passe en suspension, longue et haute, par-dessus les défenseurs.",
        "L'ailier opposé reste large pour garder un bon angle de tir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Überzahlspiel - Variante Pass RR auf LA (handballtraining.de, R. Nowacki)',
          url: 'https://handballtraining.de/taktik/ueberzahlspiel-variante-pass-rr-auf-la/1249',
          note: '"Überzahlvariante des THW Kiel, bei welcher das Spiel zunächst von Rückraum Mitte auf die rechte Angriffsseite verlagert wird. Anschließend passt RM den Ball auf die gegenüberliegende Linksaußenposition von der Rune Dahmke aus gutem Winkel zum Torwurf kommt."',
        },
      ],
      ballon: 'DC',
      absents: ['D3'],
      depart: { ...DEF_50, Piv: [2.6, 6.4] },
      etapes: [
        {
          texte: "Le demi-centre déplace le jeu vers la droite en dribblant. La défense à cinq glisse fort vers le ballon; les défenseurs extérieurs rentrent vers le centre.",
          courses: { DC: [3.2, 9.0] },
          def: { G1: [-6.2, 4.6], G2: [-3.2, 6.4], G3: [1.2, 7.4], D2: [4.2, 6.4], D1: [6.8, 3.8] },
        },
        {
          texte: "Le demi-centre saute et fait une longue passe par-dessus la défense vers l'ailier gauche, seul à l'opposé.",
          courses: { AiG: [-8.4, 2.8] },
          passe: ['DC', 'AiG', 0.35],
        },
        { texte: "L'ailier gauche tire avec un bon angle.", tir: 'AiG' },
      ],
    },
  );
})();
