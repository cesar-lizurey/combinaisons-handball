/* Lot 7a: systèmes nommés II (Allemagne, Europe centrale): combinaisons de forums et de clubs allemands, playbook Unihandball, handballhaus, matchs observés. */
(() => {
  /* ---------- Outils ---------- */
  // Version miroir d'une suite d'étapes (gauche <-> droite); les textes sont fournis à part.
  const MIROIR_IDS = {
    AiG: 'AiD', AiD: 'AiG', ArG: 'ArD', ArD: 'ArG', G1: 'D1', D1: 'G1', G2: 'D2', D2: 'G2', G3: 'D3', D3: 'G3',
  };
  const mId = id => MIROIR_IDS[id] || id;
  const mPt = ([x, y]) => [-x, y];
  const mCourse = c => (Array.isArray(c) ? mPt(c) : { ...c, vers: mPt(c.vers), ...(c.via ? { via: mPt(c.via) } : {}) });
  const mObj = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [mId(k), mCourse(v)]));
  const miroir = (etapes, textes) => etapes.map((e, i) => {
    const r = { ...e, texte: textes[i] };
    if (e.courses) r.courses = mObj(e.courses);
    if (e.def) r.def = mObj(e.def);
    if (e.passe) r.passe = [mId(e.passe[0]), mId(e.passe[1]), ...e.passe.slice(2)];
    if (e.tir) {
      r.tir = typeof e.tir === 'string' ? mId(e.tir)
        : { ...e.tir, par: mId(e.tir.par), ...(e.tir.cible ? { cible: mPt(e.tir.cible) } : {}) };
    }
    if (e.enLAir) r.enLAir = e.enLAir.map(mId);
    return r;
  });

  /* ---------- Sources communes ---------- */
  const FIL = 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/';
  const UNI = 'https://silo.tips/download/unihandball-auftakt-auslsehandlungen-spielzge';
  const SRC_NOMS = {
    titre: 'Fil "Spielzugnamen" (forum handballecke.de)',
    url: 'https://www.handballecke.de/forum/thread/3320-spielzugnamen/?pageNo=2',
    note: '"Wir hatten in der A-Jugend Spielzugnamen, wie z.B. Jugo, Russe, Däne, usw.": ces noms changent d\'un club à l\'autre.',
  };
  const SRC_UNI = note => ({
    titre: 'Unihandball - Auftakt-, Auslösehandlungen, Spielzüge (playbook universitaire, PDF)',
    url: UNI,
    note,
  });

  /* ---------- Étapes partagées ---------- */

  // Le Danois (TSV Weilheim), côté gauche.
  const DANE = [
    {
      texte: "Le demi-centre donne le ballon à l'arrière gauche, qui lance la combinaison.",
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "Le pivot bloque le 3 gauche vers la droite: il se place sur son flanc gauche. L'arrière gauche prend son élan et attaque balle en main en direction du 3 gauche.",
      courses: { Piv: { vers: [-2.6, 6.3], via: [-1.2, 8.6], ecran: true }, ArG: [-3.6, 8.6] },
      def: { G3: [-1.5, 6.8] },
    },
    {
      texte: "L'arrière gauche fait une passe longue à l'arrière droit, qui attaque à son tour. Il continue sa course jusqu'aux 6 m et forme avec le pivot un double écran sur le 3 gauche. Le demi-centre part en arc par la gauche.",
      courses: { ArG: [-2.9, 7.3], ArD: [3.6, 8.6], DC: { vers: [-4.2, 9.8], via: [-2.6, 11.4] } },
      passe: ['ArG', 'ArD', 0.15],
      def: { D3: [2.4, 7.3], D2: [4.4, 6.2] },
    },
    {
      texte: "En même temps que la percussion de l'arrière droit, le demi-centre entre dans l'intervalle libre, à gauche du double écran. L'arrière droit lui donne le ballon.",
      courses: { DC: [-4.0, 8.0], ArD: [3.2, 8.4] },
      passe: ['ArD', 'DC', 0.45],
      def: { G2: [-4.8, 5.8], D3: [1.9, 7.0] },
    },
    {
      texte: "Le demi-centre tire à gauche du double écran.",
      courses: { DC: [-3.9, 7.4] },
      tir: { par: 'DC', t: 0.4 },
      def: { G2: [-4.5, 6.3] },
    },
  ];

  // Le 2 à gauche: début commun aux trois fins.
  const ZWEIER_BASE = [
    {
      texte: "L'arrière gauche prend son élan, attaque la défense balle en main et passe au demi-centre.",
      courses: { ArG: [-4.6, 8.4], DC: [0.2, 10.0] },
      passe: ['ArG', 'DC', 0.6],
      def: { G2: [-4.8, 6.0] },
    },
    {
      texte: "L'arrière gauche continue sa course jusqu'aux 6 m, entre le 1 et le 2 gauches: il devient second pivot. L'ailier gauche part en arc et remonte par le poste d'arrière gauche.",
      courses: {
        ArG: { vers: [-6.4, 4.6], via: [-6.0, 6.8] },
        AiG: { vers: [-6.0, 9.8], via: [-8.6, 8.6] },
      },
      def: { G2: [-5.0, 5.2], G1: [-7.6, 2.6], G3: [-2.3, 6.7], D3: [0.9, 6.8] },
    },
    {
      texte: "Le demi-centre feinte une passe vers l'arrière droit, puis donne à l'ailier gauche, qui percute dans l'intervalle entre le 1 et le 2 gauches.",
      courses: { AiG: [-6.2, 7.2] },
      passe: ['DC', 'AiG', 0.35],
    },
  ];

  // Augustiner: début commun.
  const AUGUSTINER_BASE = [
    {
      texte: "Le demi-centre prend son élan et part balle en main en diagonale vers l'ailier droit. Il feinte un croisé avec l'arrière droit, qui fait un pas vers le centre, puis feinte une passe vers lui.",
      courses: { DC: [3.2, 9.0], ArD: [4.4, 9.8] },
      def: { D3: [2.4, 7.2] },
    },
    {
      texte: "L'ailier droit rentre le long des 6 m en passant juste à côté du 1 droit. Le demi-centre lui donne le ballon.",
      courses: { AiD: { vers: [6.5, 4.4], via: [8.2, 3.6] }, DC: [4.8, 8.2] },
      passe: ['DC', 'AiD', 0.6],
      def: { D1: [7.6, 2.6], D2: [4.8, 6.0] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'dane-schwede',
      nom: 'Le Danois / le Suédois',
      alias: 'Däne, Schwede (DE, TSV Weilheim)',
      categorie: 'Combinaisons à nom de pays',
      defense: 'non précisée (6 défenseurs)',
      resume: "L'arrière attaque, renverse vers l'arrière opposé puis forme un double écran avec le pivot; le demi-centre arrive en arc et tire à côté de l'écran.",
      description: [
        "Combinaison du TSV Weilheim (Bavière), présentée sur un forum allemand comme une \"combinaison typique pour créer le surnombre\". \"Le Danois\" se joue depuis la gauche; la même chose en miroir depuis la droite s'appelle \"le Suédois\" (choisis la variante au-dessus du schéma). Ces noms sont propres au club: ce n'est pas la combinaison \"Danois\" de Dragør HK.",
        "Le pivot bloque le défenseur central vers la droite. L'arrière gauche attaque balle en main vers ce défenseur, fait une passe longue à l'arrière droit, puis continue jusqu'aux 6 m pour former avec le pivot un double écran. Pendant la percussion de l'arrière droit, le demi-centre arrive en arc dans l'intervalle libéré, reçoit et tire.",
        "Le texte parle du \"défenseur central\" sans préciser lequel des deux: nous plaçons le double écran sur le 3 gauche, celui vers qui l'arrière gauche attaque. L'auteur ajoute que l'on peut jouer ces actions au centre ou de l'autre côté.",
      ],
      objectif: "Libérer un tir du demi-centre à côté d'un double écran, après un renversement.",
      pointsCles: [
        "L'arrière gauche attaque vraiment le défenseur central avant sa passe longue.",
        "Le double écran se forme au moment où l'arrière droit percute.",
        "Le demi-centre part en arc, de derrière, pour arriver lancé dans l'intervalle.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, page 2, message #40, 2005)',
          url: `${FIL}?pageNo=2`,
          note: '"Der Däne ist ein typischer Überzahlspielzug [...]. Entgegengesetzte Seite heisst bei uns Schwede."',
        },
        {
          titre: 'Schéma "Auslösehandlungen 3" joint au message (handballecke.de)',
          url: 'https://www.handballecke.de/file-download/459/',
          note: '"KS (7) sperrt Mitte-Verteidiger nach rechts; RL (4) [...] spielt den Ball ab auf den stoßenden RR (3); RL (4) läuft weiter zum Kreis und bildet eine Doppelsperre [...]; parallel zum stoßenden RR (3) läuft der RM (2) in die Lücke."',
        },
        SRC_NOMS,
      ],
      ballon: 'DC',
      variantes: [
        { nom: 'Le Danois (depuis la gauche)', etapes: DANE },
        {
          nom: 'Le Suédois (miroir, depuis la droite)',
          etapes: miroir(DANE, [
            "Le demi-centre donne le ballon à l'arrière droit, qui lance la combinaison.",
            "Le pivot bloque le 3 droit vers la gauche: il se place sur son flanc droit. L'arrière droit prend son élan et attaque balle en main en direction du 3 droit.",
            "L'arrière droit fait une passe longue à l'arrière gauche, qui attaque à son tour. Il continue sa course jusqu'aux 6 m et forme avec le pivot un double écran sur le 3 droit. Le demi-centre part en arc par la droite.",
            "En même temps que la percussion de l'arrière gauche, le demi-centre entre dans l'intervalle libre, à droite du double écran. L'arrière gauche lui donne le ballon.",
            "Le demi-centre tire à droite du double écran.",
          ]),
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'zweier-links',
      nom: 'Le 2 à gauche',
      alias: '2-er links, Zweier links (DE)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "L'arrière gauche passe et devient second pivot entre le 1 et le 2; l'ailier remonte en arc et percute dans cet intervalle.",
      description: [
        "Combinaison du même entraîneur bavarois que \"le Danois\", décrite par un texte et un schéma. L'arrière gauche attaque, passe au demi-centre et continue jusqu'aux 6 m, entre le 1 et le 2 gauches. L'ailier gauche remonte en arc par le poste d'arrière gauche.",
        "Le demi-centre feinte une passe vers l'arrière droit puis sert l'ailier, qui percute dans l'intervalle 1-2. La suite dépend du 2 gauche (choisis une fin au-dessus du schéma): il reste en arrière et l'ailier tire; il sort et l'ailier sert l'arrière devenu pivot; ou l'ailier renverse vers l'arrière droit.",
      ],
      objectif: "Mettre le 2 gauche devant un choix entre l'ailier qui percute et l'arrière placé au pivot dans son dos.",
      pointsCles: [
        "L'arrière gauche attaque vraiment avant de passer, pour fixer le 2.",
        "L'ailier part en arc pour arriver lancé, face à l'intervalle.",
        "La feinte de passe du demi-centre vers la droite fait glisser la défense.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Schéma "Auslösehandlungen 1" (handballecke.de, message #40 du fil "Sammlung von Spielzügen")',
          url: 'https://www.handballecke.de/file-download/461/',
          note: '"RL (4) [...] spielt den Ball ab zum RM (2), läuft weiter zum Kreis zwischen Außen- und Halbverteidiger; LA (6) läuft im Bogen über die RL-Position ein; RM macht eine Paßtäuschung auf RR (3) und spielt zum stoßenden LA (6)."',
        },
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, page 2)',
          url: `${FIL}?pageNo=2`,
          note: 'Message de présentation des trois schémas (Däne, Augustiner, 2-er links).',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Le 2 reste: tir de l'ailier",
          etapes: [
            ...ZWEIER_BASE,
            {
              texte: "Le 2 gauche reste en arrière. L'ailier gauche tire.",
              courses: { AiG: [-6.2, 6.6] },
              tir: { par: 'AiG', t: 0.5 },
              def: { G2: [-5.2, 5.4] },
            },
          ],
        },
        {
          nom: "2 - Le 2 sort: passe à l'arrière au pivot",
          etapes: [
            ...ZWEIER_BASE,
            {
              texte: "Le 2 gauche sort sur l'ailier. L'ailier donne à l'arrière gauche, placé au pivot dans son dos.",
              passe: ['AiG', 'ArG', 0.3],
              def: { G2: [-5.6, 6.2] },
            },
            {
              texte: "L'arrière gauche tire depuis le poste de pivot.",
              courses: { ArG: [-6.1, 4.4] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: "3 - Passe à l'arrière droit",
          etapes: [
            ...ZWEIER_BASE,
            {
              texte: "La défense se resserre à gauche. L'ailier renverse vers l'arrière droit, qui avance.",
              courses: { ArD: [4.2, 8.8] },
              passe: ['AiG', 'ArD', 0.3],
              def: { G2: [-5.6, 6.2] },
            },
            {
              texte: "L'arrière droit tire (ou le jeu continue).",
              tir: { par: 'ArD', t: 0.3 },
              def: { D2: [4.8, 5.8] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'augustiner',
      nom: 'Augustiner',
      alias: 'Augustiner rechts (DE)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Le demi-centre part balle en main vers l'aile droite; l'ailier rentre à côté du 1 et reçoit, puis le demi-centre prend sa place à l'aile.",
      description: [
        "Combinaison bavaroise (du nom d'une bière munichoise), décrite par un schéma et un texte. Le demi-centre part balle en main en diagonale vers l'aile droite, feinte un croisé et une passe avec l'arrière droit. L'ailier droit rentre en frôlant le 1 droit et reçoit. Le demi-centre continue jusqu'au poste d'ailier.",
        "Le 1 droit doit choisir (choisis une fin au-dessus du schéma): s'il reste, l'ailier tire; s'il suit l'ailier, celui-ci sert le demi-centre à l'aile; l'ailier peut aussi passer puis se décaler aussitôt pour être resservi. Sinon, le jeu continue. Le schéma montre le côté droit; une version à gauche est sous-entendue par le nom \"rechts\".",
      ],
      objectif: "Mettre le 1 droit en 2 contre 1 entre l'ailier qui rentre et le demi-centre qui file à l'aile.",
      pointsCles: [
        "Les feintes de croisé et de passe vers l'arrière droit retiennent le 2 et le 3.",
        "L'ailier rentre au ras du 1, le long des 6 m.",
        "Le demi-centre ne s'arrête pas: il file jusqu'au poste d'ailier.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Schéma "Auslösehandlungen 2" (handballecke.de, message #40 du fil "Sammlung von Spielzügen")',
          url: 'https://www.handballecke.de/file-download/460/',
          note: '"Mitte-Rückraum (2) zieht an und läuft mit Ball Richtung Rechts-Außen (5); Täuschung einer Kreuzbewegung mit RR (3); Paßtäuschung RM (2) auf RR; RA (5) läuft ein knapp am Außenverteidiger vorbei und bekommt den Ball; Mitte-Rückraum läuft weiter auf die Außenposition."',
        },
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, page 2)',
          url: `${FIL}?pageNo=2`,
          note: 'Message #40: présentation des schémas et des fins.',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Le 1 reste: tir de l'ailier",
          etapes: [
            ...AUGUSTINER_BASE,
            {
              texte: "Le demi-centre file vers l'aile. Le 1 droit reste au large: l'ailier droit tire.",
              courses: { DC: { vers: [8.6, 3.4], via: [7.4, 7.6] }, AiD: [6.2, 4.8] },
              tir: { par: 'AiD', t: 0.5 },
              def: { D1: [7.6, 2.4] },
            },
          ],
        },
        {
          nom: "2 - Le 1 suit: passe au demi-centre à l'aile",
          etapes: [
            ...AUGUSTINER_BASE,
            {
              texte: "Le 1 droit suit l'ailier. Le demi-centre arrive au poste d'ailier et reçoit.",
              courses: { DC: { vers: [8.8, 2.6], via: [7.4, 7.6] } },
              passe: ['AiD', 'DC', 0.75],
              def: { D1: [7.0, 3.5] },
            },
            { texte: "Le demi-centre tire depuis l'aile.", tir: 'DC' },
          ],
        },
        {
          nom: "3 - L'ailier se décale et est resservi",
          etapes: [
            ...AUGUSTINER_BASE,
            {
              texte: "Le demi-centre arrive au poste d'ailier. L'ailier droit lui passe le ballon.",
              courses: { DC: { vers: [8.8, 2.6], via: [7.4, 7.6] } },
              passe: ['AiD', 'DC', 0.75],
              def: { D1: [7.2, 3.0] },
            },
            {
              texte: "L'ailier se décale aussitôt pour se démarquer. Le 1 droit sort sur le demi-centre, qui rend le ballon à l'ailier depuis l'aile.",
              courses: { AiD: [6.0, 5.0] },
              passe: ['DC', 'AiD', 0.4],
              def: { D1: [8.0, 3.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'alter-einser',
      nom: 'Le vieux 1',
      alias: 'Der alte 1er, Einser (DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Croisé arrière-ailier, puis deux écrans (pivot et ailier) qui ouvrent l'intervalle 2-3 à l'arrière revenu de l'aile.",
      description: [
        "Combinaison d'un club de Rhénanie-du-Nord-Westphalie, décrite sur un forum. Le pivot commence en demi-gauche. L'arrière gauche croise avec l'ailier gauche sur la position d'aile. Le pivot pose un écran en demi-gauche, orienté vers le centre.",
        "L'ailier, qui a reçu, rentre balle en main, passe au demi-centre puis pose un écran au poste de demi-centre, vers le défenseur 2. Le demi-centre met la pression, feinte une passe vers l'arrière droit et renvoie soudain le ballon à l'arrière gauche. Celui-ci, après un petit arc à l'aile, percute dans l'intervalle entre le 2 et le 3, libéré par les écrans.",
        "Le texte ne précise pas sur quels défenseurs se posent les écrans: nous plaçons le pivot contre le 2 gauche, côté intérieur, et l'ailier contre le 3 gauche, côté extérieur. Selon l'auteur, la combinaison fonctionne des deux côtés.",
      ],
      objectif: "Ouvrir l'intervalle 2-3 par deux écrans pour l'arrière qui revient lancé.",
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, message #5, 2004)',
          url: FIL,
          note: '"RM ... spielt dann plötzlich auf den RL zurück, der einen kleinen Bogen auf der Außenposition gelaufen ist und nun in die freigesperrte Lücke zwischen Halb und Mitte stößt."',
        },
      ],
      depart: { Piv: [-3.4, 6.3] },
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche attaque en diagonale vers l'aile, balle en main. L'ailier gauche remonte.",
          courses: { ArG: [-6.8, 8.0], AiG: [-8.4, 4.2] },
          def: { G2: [-5.6, 6.0] },
        },
        {
          texte: "Croisé arrière-ailier: l'ailier coupe vers l'intérieur derrière l'arrière gauche et reçoit. Le pivot pose un écran en demi-gauche, contre le 2 gauche, orienté vers le centre.",
          courses: {
            AiG: { vers: [-4.8, 8.8], via: [-8.0, 10.2] },
            ArG: [-7.4, 7.0],
            Piv: { vers: [-4.4, 6.2], ecran: true },
          },
          passe: ['ArG', 'AiG', 0.55],
          def: { G1: [-7.6, 3.4], G2: [-5.4, 5.8] },
        },
        {
          texte: "L'ailier rentre balle en main vers le centre et passe au demi-centre.",
          courses: { AiG: [-2.8, 8.8], DC: [0.4, 9.8] },
          passe: ['AiG', 'DC', 0.7],
          def: { G3: [-2.0, 7.2] },
        },
        {
          texte: "L'ailier pose un écran au poste de demi-centre, contre le 3 gauche. Le demi-centre met la pression et feinte une passe vers l'arrière droit. L'arrière gauche fait un petit arc à l'aile.",
          courses: {
            AiG: { vers: [-2.4, 7.6], ecran: true },
            DC: [0.6, 9.0],
            ArG: { vers: [-6.0, 9.2], via: [-7.6, 9.0] },
          },
          def: { G3: [-1.6, 7.1], D3: [1.2, 7.2] },
        },
        {
          texte: "Le demi-centre renvoie soudain le ballon à l'arrière gauche, qui percute dans l'intervalle entre le 2 et le 3, libéré par les écrans.",
          courses: { ArG: [-3.6, 7.6] },
          passe: ['DC', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche tire.",
          courses: { ArG: [-3.5, 7.2] },
          tir: { par: 'ArG', t: 0.4 },
        },
      ],
    },
  );

  /* ================================================================== */
  /* Groupe 2: autres combinaisons du forum handballecke.de             */
  /* ================================================================== */

  // Croisé arrière gauche - ailier gauche, lancé par une passe du demi-centre (Ballaballa, Accélérateur, À vide 2).
  const CROISE_ARG_AIG = [
    {
      texte: "Le demi-centre passe dans la course de l'arrière gauche, qui part en diagonale vers l'aile. L'ailier gauche remonte.",
      courses: { ArG: [-6.6, 8.2], AiG: [-8.4, 4.2], DC: [0, 9.8] },
      passe: ['DC', 'ArG', 0.1],
      def: { G2: [-5.6, 6.0] },
    },
    {
      texte: "Croisé arrière-ailier: l'ailier gauche coupe dans le dos de l'arrière et reçoit. L'arrière continue vers l'aile.",
      courses: { AiG: { vers: [-4.4, 8.8], via: [-8.0, 10.2] }, ArG: [-7.4, 6.6] },
      passe: ['ArG', 'AiG', 0.55],
    },
  ];

  // Ballaballa: l'ailier passe à l'arrière droit puis rentre.
  const BALLABALLA_BASE = [
    {
      ...CROISE_ARG_AIG[0],
      texte: "Le ballon circule avec pression jusqu'à l'arrière gauche, qui attaque en diagonale vers l'aile. L'ailier gauche remonte.",
    },
    CROISE_ARG_AIG[1],
    {
      texte: "L'ailier gauche passe à l'arrière droit, puis rentre au pivot. Le 1 gauche suit l'ailier qui rentre: l'arrière gauche se décale à l'aile, libre.",
      courses: { AiG: [-3.4, 6.3], ArG: [-8.6, 2.8], ArD: [4.6, 8.8] },
      passe: ['AiG', 'ArD', 0.15],
      def: { G1: [-6.3, 3.9], G2: [-4.5, 5.8] },
    },
  ];

  // Manolito (côté gauche): début commun.
  const MANOLITO_BASE = [
    {
      texte: "Le pivot pose un écran entre le 1 et le 2 gauches, contre le flanc extérieur du 2. L'arrière gauche passe au demi-centre. L'ailier gauche met un peu de pression.",
      courses: { Piv: { vers: [-5.9, 4.5], via: [-3.4, 9.4], ecran: true }, AiG: [-8.0, 3.4] },
      passe: ['ArG', 'DC', 0.1],
    },
    {
      texte: "L'ailier retourne aussitôt dans le coin. L'arrière gauche recule un peu.",
      courses: { AiG: [-9.4, 0.6], ArG: [-6.0, 10.6], DC: [0.3, 9.9] },
    },
    {
      texte: "Le demi-centre fait une vraie feinte de passe vers la droite, puis renvoie le ballon à l'arrière gauche, qui arrive à pleine vitesse dans l'intervalle entre le 1 et le 2.",
      courses: { ArG: [-6.9, 6.0] },
      passe: ['DC', 'ArG', 0.4],
      def: { G3: [-1.2, 6.8], G1: [-7.5, 2.6] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'rm-rentre-croise-rr-ra',
      nom: 'Rentrée du demi-centre, croisé arrière-ailier et écran du pivot',
      alias: 'combinaison "coachy" (forum DE, sans nom)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Le demi-centre rentre à gauche, le ballon part à droite pour un croisé arrière-ailier; le demi-centre ressort devant la défense en contournant l'écran du pivot.",
      description: [
        "Combinaison sans nom, publiée avec un schéma sur un forum allemand. Le demi-centre rentre côté gauche et croise avec l'arrière gauche, qui pénètre vers le but puis passe à l'arrière droit.",
        "L'arrière droit feinte un tir et fixe son défenseur; l'ailier droit rentre derrière lui et reçoit (croisé arrière-ailier). Pendant ce croisé, le pivot pose un écran sur le 3 gauche. Le demi-centre, rentré au début, revient devant la défense en contournant l'écran et reçoit une passe courte et appuyée de l'ailier, puis tire.",
        "Le texte ne dit pas comment le ballon passe du demi-centre à l'arrière gauche (nous mettons une passe au départ) ni où se place exactement l'écran. L'auteur précise qu'elle se joue en miroir si le demi-centre est gaucher.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, message #3, 2004)',
          url: FIL,
          note: "\"RM läuft zur linken Seite ein\"; l'ailier droit \"läuft hinter Rückraum rechts ein\"; \"Der Spielzug geht auch andersherum, hierbei sollte Rückraum Mitte aber Linkshänder sein.\"",
        },
        {
          titre: 'Schéma joint au message (handballecke.de)',
          url: 'https://www.handballecke.de/file-download/285/',
          note: 'Trajectoires 1-2-3 et écran du pivot, cohérents avec le texte.',
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière gauche et rentre côté gauche, vers les 6 m. L'arrière gauche croise sa course en passant derrière lui et attaque vers le centre.",
          courses: {
            DC: { vers: [-3.6, 6.8], via: [-1.6, 8.6] },
            ArG: { vers: [-0.6, 8.8], via: [-3.0, 10.4] },
          },
          passe: ['DC', 'ArG', 0.1],
          def: { G3: [-2.2, 6.9], D3: [0.6, 7.4] },
        },
        {
          texte: "L'arrière gauche pénètre vers le but puis passe à l'arrière droit. Celui-ci feinte un tir et fixe le 2 droit.",
          courses: { ArG: [-0.4, 8.0], ArD: [4.6, 8.6] },
          passe: ['ArG', 'ArD', 0.5],
          def: { D2: [4.8, 6.2], D3: [0.6, 7.2] },
        },
        {
          texte: "L'ailier droit rentre derrière l'arrière droit et reçoit (croisé arrière-ailier). Pendant ce croisé, le pivot pose un écran devant le 3 gauche; l'arrière gauche se replace.",
          courses: {
            AiD: { vers: [2.4, 9.0], via: [7.2, 10.4] },
            ArD: [5.2, 8.0],
            Piv: { vers: [-1.9, 7.9], ecran: true },
            ArG: [-2.4, 10.0],
          },
          passe: ['ArD', 'AiD', 0.6],
          def: { D2: [5.4, 6.4], D1: [7.6, 3.4] },
        },
        {
          texte: "Le demi-centre revient devant la défense en contournant l'écran du pivot. L'ailier droit lui fait une passe courte et appuyée.",
          courses: { DC: { vers: [-0.6, 8.6], via: [-3.0, 10.0] } },
          passe: ['AiD', 'DC', 0.6],
          def: { D3: [1.4, 7.6] },
        },
        {
          texte: "Le demi-centre tire; le 3 gauche reste bloqué derrière l'écran.",
          courses: { DC: [-0.5, 8.0] },
          tir: { par: 'DC', t: 0.4 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ballaballa',
      nom: 'Ballaballa',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Croisé arrière-ailier à gauche; l'ailier passe à l'arrière droit puis rentre au pivot, et l'arrière gauche se retrouve seul à l'aile.",
      description: [
        "Combinaison d'un club de Cologne, décrite sur un forum allemand. Le ballon circule avec pression jusqu'à l'arrière gauche, qui croise avec l'ailier gauche. L'ailier passe à l'arrière droit puis rentre au pivot.",
        "L'arrière droit a trois solutions (choisis une fin au-dessus du schéma): le pivot, l'ailier rentré, ou l'arrière gauche décalé à l'aile, souvent libre car le défenseur de l'ailier suit son joueur quand il rentre.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, message #25, 2004)',
          url: FIL,
          note: "Le ballon circule \"mit Druck\" jusqu'à l'arrière gauche; l'arrière à l'aile est libre \"weil der LA-Abwehrmann meist aufrückt, wenn sein Gegenspieler einläuft\".",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Passe au pivot',
          etapes: [
            ...BALLABALLA_BASE,
            {
              texte: "Le 3 droit sort sur l'arrière droit, qui donne au pivot.",
              courses: { Piv: [0.6, 6.3] },
              passe: ['ArD', 'Piv', 0.3],
              def: { D3: [2.6, 7.4], D2: [4.6, 6.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Passe à l'ailier rentré",
          etapes: [
            ...BALLABALLA_BASE,
            {
              texte: "L'arrière droit donne à l'ailier gauche, rentré au pivot.",
              passe: ['ArD', 'AiG', 0.3],
            },
            { texte: "L'ailier tire depuis le poste de pivot.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Passe à l'arrière gauche à l'aile",
          etapes: [
            ...BALLABALLA_BASE,
            {
              texte: "Le 1 gauche a suivi l'ailier: l'arrière droit fait une passe longue à l'arrière gauche, seul à l'aile.",
              passe: ['ArD', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire depuis l'aile.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'pedagogue',
      nom: 'Le pédagogue',
      alias: 'Pädagoge (DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Croisé demi-centre - arrière gauche, le demi-centre s'enfonce dans la défense puis surgit dans l'intervalle ouvert par le bloc du pivot.",
      description: [
        "Combinaison d'un club de Kamen (Westphalie), décrite sur un forum allemand avec un schéma dessiné à la main, peu lisible. Le demi-centre croise avec l'arrière gauche, puis s'enfonce au trot dans la défense.",
        "L'arrière gauche attaque et passe en diagonale à l'arrière droit, qui attaque à son tour. À ce moment, le pivot bloque le défenseur central et l'ancien demi-centre court dans l'intervalle, reçoit et tire.",
        "Le texte ne dit ni quel défenseur central est bloqué, ni de quel côté. Nous plaçons le bloc sur le 3 droit, qui glisse vers l'arrière droit: le demi-centre surgit entre le 3 gauche et le pivot. La fiabilité est faible.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, message #39, 2005)',
          url: FIL,
          note: "Le demi-centre s'enfonce dans la défense \"im Trab\"; le pivot bloque le défenseur central; l'ancien demi-centre court dans l'intervalle et reçoit.",
        },
        {
          titre: 'Schéma joint au message (handballecke.de)',
          url: 'https://www.handballecke.de/file-download/452/',
          note: 'Dessin à main levée: croisé demi-centre - arrière gauche à gauche, puis écran au centre.',
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre attaque en diagonale vers la gauche, balle en main. Le 3 gauche sort sur lui.",
          courses: { DC: [-2.4, 8.6] },
          def: { G3: [-2.1, 7.3] },
        },
        {
          texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit vers le centre.",
          courses: { ArG: { vers: [-0.4, 9.2], via: [-3.6, 10.6] }, DC: [-3.2, 7.8] },
          passe: ['DC', 'ArG', 0.55],
          def: { G3: [-2.3, 7.0] },
        },
        {
          texte: "L'arrière gauche attaque la défense puis passe en diagonale à l'arrière droit, qui attaque à son tour. Le demi-centre s'enfonce au trot dans la défense.",
          courses: { ArG: [0.6, 9.4], ArD: [3.8, 8.6], DC: [-2.6, 7.4] },
          passe: ['ArG', 'ArD', 0.6],
          def: { D3: [1.2, 7.3], D2: [4.6, 6.3], G3: [-2.0, 6.6] },
        },
        {
          texte: "Le pivot bloque le 3 droit, qui glisse vers l'arrière droit. L'ancien demi-centre court dans l'intervalle ouvert entre le 3 gauche et le pivot; l'arrière droit lui donne le ballon.",
          courses: { Piv: { vers: [1.2, 6.5], ecran: true }, DC: [-0.3, 7.4] },
          passe: ['ArD', 'DC', 0.5],
          def: { D3: [2.2, 6.9], G3: [-1.4, 6.8] },
        },
        {
          texte: "Le demi-centre tire.",
          courses: { DC: [-0.2, 7.0] },
          tir: { par: 'DC', t: 0.4 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rostock-rotieren',
      nom: 'Rotation Rostock',
      alias: 'Rostock rotieren 1 à 7 (DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Rotation à trois à gauche (demi-centre, arrière, ailier), puis deux écrans parallèles entre lesquels le nouveau demi-centre passe balle en main.",
      description: [
        "Combinaison d'une équipe de jeunes filles (HSV Haldensleben), décrite sur un forum allemand. Le demi-centre part balle en main vers l'ailier gauche et croise: l'ailier prend la place de l'arrière gauche, l'arrière gauche celle du demi-centre, et le demi-centre file à l'aile.",
        "Le pivot bloque alors le défenseur du poste d'arrière gauche, et le nouvel arrière gauche (l'ailier) descend aux 6 m bloquer le défenseur du pivot: deux écrans parallèles. Le nouveau demi-centre passe balle en main entre les deux écrans et va au but.",
        "Le texte est ambigu sur les rôles; nous suivons la lecture la plus cohérente. L'auteur annonce 5 à 7 variantes (\"Rostock rotieren 1-7\"), aussi avec l'arrière et l'ailier droits, sans les décrire: une seule est montrée ici.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, message #38, 2005)',
          url: FIL,
          note: '"RM hat Ball, läuft mit Ball zum LA, Kreuz, LA wechselt auf RL, RL auf RM, RL spielt zu RM"; puis deux écrans et passage "zwischen den beiden Sperren".',
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre part balle en main vers l'ailier gauche. L'arrière gauche glisse vers le centre en passant dans son dos; l'ailier gauche remonte.",
          courses: {
            DC: [-4.2, 9.2],
            ArG: { vers: [-0.6, 10.2], via: [-3.0, 11.6] },
            AiG: [-7.8, 5.6],
          },
        },
        {
          texte: "Croisé avec l'ailier: l'ailier gauche coupe derrière le demi-centre et reçoit au poste d'arrière gauche. Le demi-centre continue vers l'aile.",
          courses: { AiG: { vers: [-4.8, 9.4], via: [-7.8, 9.4] }, DC: [-7.0, 6.4] },
          passe: ['DC', 'AiG', 0.55],
        },
        {
          texte: "L'ailier, devenu arrière gauche, passe à l'arrière gauche, devenu demi-centre. Le demi-centre prend la place de l'ailier.",
          courses: { DC: [-8.8, 2.4] },
          passe: ['AiG', 'ArG', 0.3],
        },
        {
          texte: "Deux écrans parallèles: le pivot bloque le 2 gauche par l'intérieur; le nouvel arrière gauche (l'ailier) descend aux 6 m et bloque le 3 gauche, le défenseur du pivot, par l'extérieur.",
          courses: {
            Piv: { vers: [-4.2, 5.8], via: [-2.2, 9.0], ecran: true },
            AiG: { vers: [-2.7, 6.4], ecran: true },
          },
        },
        {
          texte: "Le nouveau demi-centre (l'ancien arrière gauche) passe balle en main entre les deux écrans et tire.",
          courses: { ArG: [-3.5, 7.0] },
          tir: { par: 'ArG', t: 0.6 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'manolito',
      nom: "Écran du pivot entre le 1 et le 2, et retour de l'ailier dans le coin",
      alias: 'combinaison "Manolito" (forum DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée (aussi en supériorité)',
      resume: "Le pivot bloque entre le 1 et le 2, l'ailier revient dans le coin; après une vraie feinte de passe, le demi-centre renvoie à l'arrière lancé dans l'intervalle.",
      description: [
        "Combinaison sans nom, venue d'un club de 3e division (Albstadt), décrite sur un forum allemand. Le pivot pose un écran entre le 1 et le 2. L'ailier met un peu de pression puis retourne aussitôt dans le coin. L'arrière recule un peu.",
        "Le demi-centre fait une vraie feinte de passe vers l'autre côté, puis renvoie le ballon à l'arrière, qui arrive à pleine vitesse dans l'intervalle 1-2. Si la défense se resserre, l'ailier est libre (choisis une fin au-dessus du schéma). L'auteur la juge \"aussi bonne en supériorité numérique\".",
        "Le côté n'est pas précisé (nous la montrons à gauche), ni le défenseur visé par l'écran: nous plaçons le pivot contre le flanc extérieur du 2.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, message #66, 2007)',
          url: FIL,
          note: "Écran du pivot entre les défenseurs 1 et 2, ailier qui revient dans le coin, feinte de passe du demi-centre et retour à l'arrière lancé; \"auch gut bei Überzahl\".",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière",
          etapes: [
            ...MANOLITO_BASE,
            {
              texte: "Le 1 gauche reste sur l'ailier: l'arrière gauche tire dans l'intervalle.",
              courses: { ArG: [-7.0, 5.4] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - La défense se resserre: l'ailier",
          etapes: [
            ...MANOLITO_BASE,
            {
              texte: "Le 1 gauche se resserre sur l'arrière, qui donne à l'ailier resté dans le coin.",
              courses: { ArG: [-7.0, 5.6] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G1: [-7.4, 4.2] },
            },
            { texte: "L'ailier gauche tire depuis le coin.", tir: 'AiG' },
          ],
        },
      ],
    },
  );

  /* ================================================================== */
  /* Groupe 3: rotations, "Río", combinaison roumaine, Unihandball    */
  /* ================================================================== */

  // Rotation à trois (Dreier-Wechsel), côté droit: début commun.
  const DREIER_BASE = [
    {
      texte: "Le demi-centre lance la rotation: il attaque en diagonale vers l'arrière droit, balle en main.",
      courses: { DC: [2.4, 8.8] },
      def: { D3: [2.2, 7.3] },
    },
    {
      texte: "Il va chercher l'arrière droit: celui-ci croise dans son dos et reçoit vers le centre.",
      courses: { ArD: { vers: [0.4, 9.2], via: [3.6, 10.6] }, DC: [3.2, 8.2] },
      passe: ['DC', 'ArD', 0.55],
    },
    {
      texte: "Le demi-centre se décale vers le poste d'aile droit, à 9 m. L'ailier droit, remplacé, rentre entre le 1 et le 2 droits. L'arrière droit attaque vers la gauche.",
      courses: {
        DC: [7.6, 7.4],
        AiD: { vers: [6.6, 4.4], via: [8.2, 3.4] },
        ArD: [-1.4, 8.8],
      },
      def: { G3: [-1.8, 7.4], D3: [1.8, 7.0] },
    },
    {
      texte: "Un arrière va chercher l'autre: l'arrière gauche croise dans le dos de l'arrière droit et reçoit.",
      courses: { ArG: { vers: [0.8, 9.0], via: [-3.4, 10.8] }, ArD: [-2.2, 8.0] },
      passe: ['ArD', 'ArG', 0.55],
      def: { G3: [-1.6, 7.0] },
    },
    {
      texte: "L'arrière gauche attaque côté droit, où le demi-centre a créé le surnombre. L'ailier rentré prépare un écran sur le 2 droit.",
      courses: { ArG: [3.0, 8.4], AiD: { vers: [6.2, 5.0], ecran: true } },
      def: { D3: [2.4, 7.2], D2: [4.8, 5.6], D1: [7.4, 3.0] },
    },
  ];

  // Río: début commun.
  const RIO_BASE = [
    {
      texte: "Le pivot sort au poste d'arrière (\"demi\") côté droit. L'arrière droit le sert.",
      courses: { Piv: { vers: [3.4, 8.8], via: [1.2, 8.4] } },
      passe: ['ArD', 'Piv', 0.6],
      def: { D3: [2.4, 7.4] },
    },
    {
      texte: "Au même moment, l'ailier gauche rentre jusqu'à hauteur du premier poteau, vers 7 m. Le pivot rend aussitôt le ballon à l'arrière droit, qui revient en décalé par le centre. Le demi-centre se décale à gauche et l'arrière gauche glisse à la place de l'ailier.",
      courses: {
        AiG: { vers: [-2.0, 7.4], via: [-7.2, 6.2] },
        ArD: { vers: [1.0, 9.6], via: [4.0, 11.0] },
        DC: [-3.4, 10.0],
        ArG: { vers: [-8.4, 3.2], via: [-8.0, 7.2] },
      },
      passe: ['Piv', 'ArD', 0.5],
      def: { G3: [-1.3, 6.6], D3: [1.6, 7.0], G1: [-7.2, 2.6] },
    },
  ];

  // Lang / Magdeburg: fins communes (attaque du demi-centre entre le 1 et le 2 gauches).
  const fins1et2 = textePivot => [
    {
      nom: '1 - Tir du demi-centre',
      etapes: [
        { texte: "Le 2 gauche hésite: le demi-centre tire dans l'intervalle.", tir: { par: 'DC', t: 0.3 } },
      ],
    },
    {
      nom: '2 - Passe au pivot',
      etapes: [
        {
          texte: `Le 2 gauche sort sur le demi-centre. ${textePivot}`,
          courses: { Piv: [-3.7, 6.2] },
          passe: ['DC', 'Piv', 0.5],
          def: { G2: [-5.9, 6.2] },
        },
        { texte: 'Le pivot tire.', tir: 'Piv' },
      ],
    },
    {
      nom: "3 - Passe à l'ailier gauche",
      etapes: [
        {
          texte: "Le 1 gauche vient aider: le demi-centre donne à l'ailier gauche.",
          courses: { AiG: [-9.2, 1.6] },
          passe: ['DC', 'AiG', 0.4],
          def: { G1: [-7.0, 4.4] },
        },
        { texte: "L'ailier gauche tire.", tir: 'AiG' },
      ],
    },
  ];

  const LANG_BASE = [
    {
      texte: "Après le lancement \"accélérateur\" à gauche, le demi-centre a reçu du côté gauche. Il percute brièvement. Le pivot se place dans l'intervalle suivant, entre le 2 et le 3 gauches, sans encore bloquer.",
      courses: { DC: [0.2, 9.0], Piv: { vers: [-3.4, 6.3], via: [-1.6, 8.8] } },
      def: { D3: [1.0, 7.4] },
    },
    {
      texte: "Il retarde sa passe vers l'arrière gauche, qui arrive en le contournant par derrière.",
      courses: { ArG: { vers: [1.6, 9.8], via: [-2.6, 11.4] } },
      passe: ['DC', 'ArG', 0.75],
    },
    {
      texte: "L'arrière gauche croise avec l'arrière droit devant le 3 droit: il attaque vers la droite, l'arrière droit passe dans son dos et reçoit. Le demi-centre se replace au poste d'arrière gauche.",
      courses: {
        ArG: [2.8, 8.4],
        ArD: { vers: [0.4, 9.4], via: [4.6, 10.8] },
        DC: [-5.2, 9.8],
      },
      passe: ['ArG', 'ArD', 0.55],
      def: { D3: [2.2, 7.3] },
    },
    {
      texte: "L'arrière gauche se replace au poste d'arrière droit. L'arrière droit met beaucoup de pression, fixe le 3 gauche et passe au demi-centre. Au moment de la passe, le pivot bloque le 3 gauche.",
      courses: { ArG: [5.2, 9.4], ArD: [-1.0, 8.4], Piv: { vers: [-2.6, 6.6], ecran: true } },
      passe: ['ArD', 'DC', 0.6],
      def: { G3: [-1.6, 7.3], D3: [1.6, 7.0] },
    },
    {
      texte: "Le demi-centre attaque entre le 1 et le 2 gauches.",
      courses: { DC: [-6.4, 7.0] },
      def: { G2: [-5.4, 5.8] },
    },
  ];

  const MAGDEBURG_BASE = [
    {
      texte: "Le ballon arrive de la droite au demi-centre.",
      courses: { DC: [-0.4, 10.0] },
      passe: ['ArD', 'DC', 0.1],
    },
    {
      texte: "Double échange, premier temps: le demi-centre part balle en main vers la gauche; l'arrière gauche passe dans son dos vers le centre et reçoit.",
      courses: { DC: [-3.0, 9.6], ArG: { vers: [-0.4, 10.4], via: [-3.4, 11.8] } },
      passe: ['DC', 'ArG', 0.55],
    },
    {
      texte: "Second temps: le demi-centre continue vers l'aile gauche et l'ailier gauche remonte au poste d'arrière gauche. Le pivot se décale dans l'intervalle suivant, entre le 2 et le 3 gauches.",
      courses: {
        DC: { vers: [-8.6, 3.0], via: [-6.0, 7.4] },
        AiG: { vers: [-5.6, 9.4], via: [-8.8, 7.8] },
        Piv: { vers: [-3.4, 6.3], via: [-1.6, 8.8] },
      },
    },
    {
      texte: "L'arrière gauche, au centre, croise avec l'arrière droit: il attaque vers la droite, l'arrière droit passe dans son dos et reçoit. L'ailier gauche reprend son poste et le demi-centre se replace en arrière gauche.",
      courses: {
        ArG: [2.0, 8.7],
        ArD: { vers: [-0.6, 9.6], via: [3.4, 12.0] },
        AiG: { vers: [-9.0, 1.4], via: [-6.4, 5.2] },
        DC: { vers: [-5.6, 9.6], via: [-8.6, 7.8] },
      },
      passe: ['ArG', 'ArD', 0.55],
    },
    {
      texte: "L'arrière droit passe au demi-centre, qui attaque entre le 1 et le 2 gauches.",
      courses: { DC: [-6.4, 7.0] },
      passe: ['ArD', 'DC', 0.2],
      def: { G2: [-5.4, 5.8] },
    },
  ];

  // Solberg (contre 5-1): trois croisés et écran sur l'avancé.
  const SOLBERG_BASE = [
    {
      texte: "Premier croisé: le demi-centre part balle en main vers la gauche pour aller chercher l'arrière gauche. L'avancé le suit.",
      courses: { DC: [-2.6, 9.6] },
      def: { D3: [-1.6, 9.0] },
    },
    {
      texte: "L'arrière gauche croise dans son dos et reçoit vers le centre.",
      courses: { ArG: { vers: [-0.6, 10.4], via: [-3.8, 11.4] }, DC: [-3.4, 9.0] },
      passe: ['DC', 'ArG', 0.55],
      def: { D3: [-0.6, 9.2] },
    },
    {
      texte: "Deuxième croisé: l'arrière gauche part vers la droite pour aller chercher l'arrière droit. Pendant ce temps, le demi-centre se replace au poste d'arrière gauche.",
      courses: { ArG: [2.2, 9.6], DC: [-5.2, 10.0] },
      def: { D3: [1.4, 9.0] },
    },
    {
      texte: "L'arrière droit croise dans le dos de l'arrière gauche et reçoit. L'arrière gauche continue vers le poste d'arrière droit.",
      courses: { ArD: { vers: [0.4, 10.4], via: [3.6, 11.4] }, ArG: [4.4, 9.2] },
      passe: ['ArG', 'ArD', 0.55],
      def: { D3: [0.0, 9.0] },
    },
    {
      texte: "Troisième croisé: l'arrière droit part vers la gauche pour aller chercher le demi-centre.",
      courses: { ArD: [-1.8, 9.8] },
      def: { D3: [-1.0, 9.0] },
    },
    {
      texte: "Le demi-centre arrive du poste d'arrière gauche, croise dans le dos de l'arrière droit et reçoit. Le pivot pose un écran sur l'avancé.",
      courses: {
        DC: { vers: [0.6, 10.2], via: [-3.0, 11.4] },
        ArD: [-2.4, 9.2],
        Piv: { vers: [0.0, 8.4], ecran: true },
      },
      passe: ['ArD', 'DC', 0.55],
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'dreier-wechsel',
      nom: "Rotation à trois et rentrée d'ailier",
      alias: 'Dreier-Wechsel, 3er Wechsel, combinaison "diamando" (DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Le demi-centre va chercher un arrière puis se décale à l'aile; l'ailier remplacé rentre entre le 1 et le 2 pendant que les deux arrières croisent.",
      description: [
        "Combinaison décrite sur un forum allemand. Le demi-centre lance une rotation à trois avec les deux arrières. Après avoir \"été chercher\" un arrière (croisé), il se décale vers le poste d'aile, à 9 m. Pendant ce temps, un arrière va chercher l'autre par un croisé.",
        "L'ailier remplacé par le demi-centre rentre entre le 1 et le 2 et prépare un écran. L'arrière qui a le ballon choisit (choisis une fin au-dessus du schéma): le demi-centre à l'aile, l'ailier rentré entre le 1 et le 2, ou le tir. Le surnombre naît du côté où le demi-centre s'est décalé, quand la défense centrale se resserre.",
        "Le côté n'est pas précisé: nous la montrons à droite.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Sammlung von Spielzügen" (forum handballecke.de, message #89, 2009)',
          url: FIL,
          note: "Rotation à trois (\"Dreier-Wechsel\"): le demi-centre se décale à l'aile à 9 m, l'ailier remplacé rentre entre 1 et 2; l'arrière sert le demi-centre, le rentrant, ou tire.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Passe au demi-centre à l'aile",
          etapes: [
            ...DREIER_BASE,
            {
              texte: "Le 1 droit reste avec l'ailier rentré: l'arrière gauche sert le demi-centre, seul au poste d'aile.",
              courses: { DC: [7.4, 6.6] },
              passe: ['ArG', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "2 - Passe à l'ailier rentré",
          etapes: [
            ...DREIER_BASE,
            {
              texte: "Le 2 droit sort sur l'arrière gauche: celui-ci donne à l'ailier rentré entre le 1 et le 2.",
              passe: ['ArG', 'AiD', 0.3],
              def: { D2: [4.6, 6.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "3 - Tir de l'arrière gauche",
          etapes: [
            ...DREIER_BASE,
            {
              texte: "La défense s'écarte vers l'aile: l'arrière gauche tire.",
              courses: { ArG: [3.2, 7.8] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D3: [2.4, 7.0] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rio',
      nom: 'Río',
      alias: 'Auftakthandlung "Río" (DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Le pivot sort en demi et rend aussitôt à l'arrière droit, qui revient par le centre pendant que l'ailier gauche rentre jusqu'au premier poteau.",
      description: [
        "Lancement (\"Auftakthandlung\") décrit sur un forum allemand. Le pivot sort au poste d'arrière et l'arrière droit le sert. Au même moment, l'ailier gauche rentre jusqu'à hauteur du premier poteau, vers 7 m. Le pivot rend aussitôt le ballon à l'arrière droit, qui revient en décalé par le centre, pendant que le demi-centre se décale à gauche et que l'arrière gauche glisse à la place de l'ailier.",
        "L'arrière droit a alors plusieurs solutions (choisis une fin au-dessus du schéma): tirer, servir l'ailier rentré, servir le pivot qui redescend, ou servir le demi-centre qui attaque l'intervalle et tire ou sert l'arrière gauche décalé. Si la défense a compris, l'arrière droit saute pour tirer et sert l'ailier droit (fin non montrée).",
        "Le texte ne dit pas de quel côté sort le pivot: nous le faisons sortir côté droit, près du passeur.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "Basic-Spielzüge - womit fängt man an?" (forum handballecke.de, message #4, 2010)',
          url: 'https://www.handballecke.de/forum/thread/24295-basic-spielz%C3%BCge-womit-f%C3%A4ngt-man-an/',
          note: "Le pivot sort en demi; l'ailier gauche rentre \"bis Höhe 1. Pfosten - 7 m\"; le pivot rend aussitôt à l'arrière droit, qui revient en décalé par le centre.",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...RIO_BASE,
            {
              texte: "L'arrière droit attaque au centre et tire.",
              courses: { ArD: [0.6, 8.4] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Passe à l'ailier gauche rentré",
          etapes: [
            ...RIO_BASE,
            {
              texte: "L'arrière droit donne à l'ailier gauche, rentré devant le premier poteau.",
              passe: ['ArD', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Passe au pivot qui redescend',
          etapes: [
            ...RIO_BASE,
            {
              texte: "Le pivot se laisse retomber aux 6 m. L'arrière droit lui donne le ballon.",
              courses: { Piv: [3.2, 6.4] },
              passe: ['ArD', 'Piv', 0.6],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Demi-centre, puis arrière gauche décalé',
          etapes: [
            ...RIO_BASE,
            {
              texte: "L'arrière droit sert le demi-centre, qui attaque l'intervalle entre le 2 et le 3 gauches.",
              courses: { DC: [-3.8, 8.2] },
              passe: ['ArD', 'DC', 0.2],
              def: { G2: [-4.4, 6.4] },
            },
            {
              texte: "Le 1 gauche vient aider: le demi-centre sert l'arrière gauche, décalé à l'aile.",
              courses: { DC: [-4.0, 7.8] },
              passe: ['DC', 'ArG', 0.4],
              def: { G1: [-6.6, 4.0] },
            },
            { texte: "L'arrière gauche tire depuis l'aile.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rumanenzug',
      nom: 'La roumaine',
      alias: 'Rumänenzug (DE), "le classique des années 70"',
      categorie: 'Combinaisons à nom de pays',
      defense: 'non précisée',
      resume: "Deux croisés en chaîne (arrière-ailier, puis ailier-pivot); chaque joueur qui a passé pose un écran frontal, et le pivot fonce entre les deux écrans.",
      description: [
        "Présentée par le site allemand handballhaus.de comme \"le classique des combinaisons des années 70\". Le demi-centre passe à l'arrière gauche, qui va chercher l'ailier gauche (croisé) puis pose un écran frontal sur le 1 gauche.",
        "L'ailier va chercher le pivot, qui sort et croise avec lui, puis l'ailier pose un second écran frontal, sur le 2 gauche. Le pivot profite vite de cette double position d'écran pour aller au but.",
        "La fiche d'origine est une animation (non visionnée) avec un court texte; les positions exactes des croisés sont reconstituées. Le site désigne les défenseurs vus de la défense (\"AR\", \"HR\"): il s'agit du 1 et du 2 du côté gauche de l'attaque. Le lien avec la Roumanie (double championne du monde dans les années 70) n'est pas expliqué par la source.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Rumänenzug (handballhaus.de, rubrique "Sperren", archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/sperren/rumaenenzug.html',
          note: '"RM passt zu RL, RL holt LA und stellt anschließend eine Frontalsperre an AR. LA holt den KS und stellt die zweite Frontalsperre an HR. Der KS versucht zügig die doppelte Sperrstellung zum Torerfolg zu nutzen."',
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière gauche, qui attaque en diagonale vers l'aile. L'ailier gauche remonte.",
          courses: { ArG: [-6.8, 8.0], AiG: [-8.6, 4.4] },
          passe: ['DC', 'ArG', 0.1],
        },
        {
          texte: "L'arrière gauche va chercher l'ailier: l'ailier croise dans son dos et reçoit. L'arrière gauche enchaîne et pose un écran frontal sur le 1 gauche.",
          courses: {
            AiG: { vers: [-4.6, 9.0], via: [-8.2, 10.2] },
            ArG: { vers: [-7.3, 4.0], ecran: true },
          },
          passe: ['ArG', 'AiG', 0.3],
          def: { G1: [-7.4, 2.9] },
        },
        {
          texte: "L'ailier va chercher le pivot: il part balle en main vers le centre; le pivot sort, croise dans son dos et reçoit.",
          courses: { AiG: [-2.0, 8.8], Piv: { vers: [-3.2, 10.0], via: [0.4, 10.2] } },
          passe: ['AiG', 'Piv', 0.6],
          def: { G3: [-2.2, 7.4] },
        },
        {
          texte: "L'ailier pose un second écran frontal, sur le 2 gauche. Le pivot profite aussitôt de la double position d'écran et fonce au but entre les deux écrans.",
          courses: { AiG: { vers: [-4.8, 6.8], ecran: true }, Piv: [-6.2, 5.6] },
          def: { G2: [-5.0, 5.7], G3: [-2.0, 6.8] },
        },
        {
          texte: 'Le pivot tire.',
          courses: { Piv: [-6.4, 5.0] },
          tir: { par: 'Piv', t: 0.4 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'lang-links',
      nom: 'Long (gauche)',
      alias: 'Lang links / rechts (Unihandball, DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "L'arrière gauche contourne le demi-centre et croise avec l'arrière droit; le demi-centre, replacé en arrière gauche, attaque entre le 1 et le 2 avec un écran du pivot sur le 3.",
      description: [
        "Combinaison du playbook d'une équipe universitaire allemande (\"Unihandball\"), jouée après le lancement \"accélérateur\" à gauche. Le demi-centre percute brièvement et retarde sa passe vers l'arrière gauche, qui arrive en le contournant. Le pivot se place dans l'intervalle suivant, sans encore bloquer.",
        "L'arrière gauche croise avec l'arrière droit devant le 3 droit puis se replace en arrière droit. L'arrière droit met beaucoup de pression, fixe le 3 gauche et passe au demi-centre, replacé en arrière gauche. Au moment de la passe, le pivot bloque le 3 gauche et le demi-centre attaque entre le 1 et le 2 gauches.",
        "Fins (choisis au-dessus du schéma): tir, passe au pivot (entre le 2 et le 3), passe à l'ailier gauche. Les schémas du document n'ont pas pu être consultés; la version \"droite\" est le miroir. Voir aussi \"Magdeburg\", du même document, qui finit de la même façon.",
      ],
      fiabilite: 'partielle',
      sources: [
        SRC_UNI('"Lang": percussion retardée du demi-centre, croisé arrière gauche - arrière droit devant le 3 droit, écran du pivot sur le 3 gauche, attaque du demi-centre entre le 1 et le 2; fins: tir, pivot, ailier.'),
      ],
      ballon: 'DC',
      variantes: fins1et2("Le pivot, qui a bloqué le 3, glisse dans l'intervalle entre le 2 et le 3 et reçoit.")
        .map(f => ({ nom: f.nom, etapes: [...LANG_BASE, ...f.etapes] })),
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'solberg',
      nom: 'Solberg',
      alias: 'Solberg (Unihandball, DE)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Trois croisés simples à la suite entre les arrières et le demi-centre, puis un écran du pivot sur l'avancé.",
      description: [
        "Combinaison du playbook \"Unihandball\", pensée contre une défense 5-1: \"trois croisés simples, puis un écran sur l'avancé\". Le demi-centre va chercher l'arrière gauche; l'arrière gauche va chercher l'arrière droit pendant que le demi-centre se replace en demi (arrière gauche); l'arrière droit va chercher le demi-centre, qui arrive du demi-gauche, et le pivot pose un écran sur l'avancé.",
        "Le demi-centre a trois fins (choisis au-dessus du schéma): tir, passe au pivot qui se décale après son écran, ou percée vers l'extérieur. Le nom vient sans doute d'un entraîneur scandinave, mais le document ne l'explique pas.",
      ],
      objectif: "Faire tourner l'avancé d'un côté à l'autre, puis le bloquer pour libérer le demi-centre.",
      fiabilite: 'partielle',
      sources: [
        SRC_UNI("\"Solberg 3x einfaches Kreuzen mit anschließender Sperre am Vorgezogenen\"; fins du demi-centre: tir, pivot qui se décale (\"Sperre-Absetzen\"), percée vers l'extérieur."),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Tir du demi-centre',
          etapes: [
            ...SOLBERG_BASE,
            {
              texte: "L'avancé reste bloqué: le demi-centre tire par-dessus l'écran.",
              courses: { DC: [1.2, 8.9] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot qui se décale',
          etapes: [
            ...SOLBERG_BASE,
            {
              texte: "Le 3 sort sur le demi-centre. Le pivot quitte son écran et se décale vers le but; le demi-centre lui donne le ballon.",
              courses: { DC: [1.2, 8.9], Piv: [2.0, 6.4] },
              passe: ['DC', 'Piv', 0.6],
              def: { G3: [0.6, 7.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Percée vers l'extérieur",
          etapes: [
            ...SOLBERG_BASE,
            {
              texte: "Le demi-centre perce vers l'extérieur, entre le 3 et le 2 droits.",
              courses: { DC: [3.0, 8.0] },
              def: { D2: [4.2, 6.4], G3: [0.4, 6.8] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'magdeburg',
      nom: 'Magdeburg',
      alias: 'Magdeburg links / rechts (Unihandball, DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Double échange du demi-centre avec l'arrière et l'ailier gauches, croisé des deux arrières, puis attaque du demi-centre entre le 1 et le 2.",
      description: [
        "Combinaison du playbook \"Unihandball\". Le ballon arrive de la droite au demi-centre, qui joue un \"double échange\" avec l'ailier et l'arrière gauches. Le pivot se décale dans l'intervalle suivant.",
        "L'arrière gauche croise avec l'arrière droit; l'ailier gauche reprend son poste et le demi-centre se replace en arrière gauche. L'arrière droit passe au demi-centre, qui attaque entre le 1 et le 2 gauches. Fins (choisis au-dessus du schéma): tir, pivot (entre le 2 et le 3), ailier gauche.",
        "Le document ne détaille pas le \"double échange\": nous le montrons comme une rotation à trois (le demi-centre va à l'aile, l'ailier en arrière gauche, l'arrière gauche au centre). À ne pas confondre avec le \"Yago Magdeburg\". La fin est la même que celle de \"Long (gauche)\".",
      ],
      fiabilite: 'partielle',
      sources: [
        SRC_UNI("\"Magdeburg\": \"doppelter Wechsel\" du demi-centre avec l'ailier et l'arrière gauches, croisé des arrières, attaque du demi-centre entre #1 et #2; fins: tir, pivot, ailier."),
      ],
      ballon: 'ArD',
      variantes: fins1et2("Il donne au pivot, placé entre le 2 et le 3.")
        .map(f => ({ nom: f.nom, etapes: [...MAGDEBURG_BASE, ...f.etapes] })),
    },
  );

  /* ================================================================== */
  /* Groupe 4: lancements Unihandball, Mondial 2025, Roßtal             */
  /* ================================================================== */

  // Retour de l'ailier et de l'arrière gauches à leurs postes après le croisé (ailier parti du centre-gauche).
  const RETOUR_AIG_ARG = {
    AiG: { vers: [-9.0, 1.2], via: [-8.4, 8.0] },
    ArG: { vers: [-5.5, 9.5], via: [-7.8, 9.4] },
  };

  // À vide: fin commune (croisé à vide demi-centre / arrière gauche, arrière droit qui sert).
  const FIN_VIDE = [
    {
      texte: "Croisé à vide: le demi-centre part vers la gauche et l'arrière gauche croise dans son dos, sans ballon. L'arrière droit attaque légèrement et feinte une passe vers l'ailier droit.",
      courses: {
        DC: [-3.6, 9.4],
        ArG: { vers: [0.6, 9.6], via: [-2.4, 11.6] },
        ArD: [4.4, 8.6],
      },
      def: { D2: [4.8, 6.2] },
    },
    {
      texte: "L'arrière droit sert l'arrière gauche, qui arrive lancé au centre.",
      courses: { ArG: [1.2, 9.0] },
      passe: ['ArD', 'ArG', 0.3],
      def: { D3: [1.8, 7.4] },
    },
  ];
  const FIN_VIDE_NORMALE = {
    texte: "Suite \"normale\": l'arrière gauche continue dans le sens de sa course, vers la droite, et attaque l'intervalle entre le 3 et le 2 droits.",
    courses: { ArG: [3.2, 7.8] },
    tir: { par: 'ArG', t: 0.6 },
    def: { D3: [2.2, 7.2], D2: [4.6, 6.4] },
  };
  const VIDE_EINS_DEBUT = [
    {
      texte: "L'arrière gauche passe au demi-centre.",
      courses: { DC: [0.2, 10.2] },
      passe: ['ArG', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre passe à l'arrière droit, qui avance légèrement.",
      courses: { ArD: [5.0, 9.0] },
      passe: ['DC', 'ArD', 0.2],
    },
  ];

  // Roßtal H09: début commun.
  const ROSSTAL_BASE = [
    {
      texte: "L'arrière gauche attaque en diagonale vers l'aile, balle en main. L'ailier gauche remonte.",
      courses: { ArG: [-6.6, 8.2], AiG: [-8.4, 4.2] },
      def: { G2: [-5.6, 6.0] },
    },
    {
      texte: "Rotation extérieure (\"Außenkreisel\"): l'ailier coupe dans le dos de l'arrière et reçoit; l'arrière continue vers l'aile.",
      courses: { AiG: { vers: [-4.4, 8.8], via: [-8.0, 10.2] }, ArG: [-7.4, 6.6] },
      passe: ['ArG', 'AiG', 0.55],
    },
    {
      texte: "L'ailier passe au demi-centre. L'ailier et l'arrière gauches regagnent leurs postes.",
      courses: { ...RETOUR_AIG_ARG, ArG: { vers: [-5.6, 9.6], via: [-7.8, 9.4] } },
      passe: ['AiG', 'DC', 0.3],
      def: { G2: [-5.0, 5.2] },
    },
    {
      texte: "Le demi-centre sert l'arrière droit et avance un peu au centre.",
      courses: { DC: [-0.4, 9.6], ArD: [5.0, 9.4] },
      passe: ['DC', 'ArD', 0.3],
    },
    {
      texte: "Croisé long: l'arrière droit part balle en main vers le centre; l'arrière gauche traverse le terrain dans son dos et reçoit.",
      courses: { ArD: [1.6, 9.0], ArG: { vers: [3.4, 10.0], via: [-1.0, 11.6] } },
      passe: ['ArD', 'ArG', 0.65],
      def: { D3: [1.4, 7.6] },
    },
  ];
  const ROSSTAL_CONTRE = {
    texte: "L'arrière gauche arrive vite pour tirer de loin, mais le 3 et le 2 droits montent ensemble pour contrer.",
    courses: { ArG: [2.8, 9.2] },
    def: { D3: [2.2, 8.0], D2: [3.6, 7.6] },
  };

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'beschleuniger',
      nom: "L'accélérateur",
      alias: 'Auftakt 2 "Beschleuniger", Auftakt 1 "Pass nach Außen" (Unihandball, DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Lancements à gauche qui mettent la défense en mouvement avant la combinaison suivante: passe à l'aile, ou croisé arrière-ailier et retour au centre.",
      description: [
        "Deux \"lancements\" (\"Auftakthandlungen\") du playbook \"Unihandball\": ils ne visent pas un tir, mais préparent la combinaison suivante en mettant la défense en mouvement. Le schéma s'arrête donc sans tir, ballon au demi-centre.",
        "Lancement 1 \"passe à l'aile\": le demi-centre passe dans la course de l'ailier gauche, qui donne aussitôt dans la percussion appuyée de l'arrière gauche; le demi-centre enchaîne. Lancement 2 \"accélérateur\": le demi-centre passe dans la course de l'arrière gauche, qui croise avec l'ailier; l'ailier redonne au centre, en mettant plus ou moins de pression.",
        "Pour l'accélérateur, le document donne deux suites (choisis au-dessus du schéma): l'ailier met la pression puis l'ailier et l'arrière reprennent leurs postes; ou l'ailier ne met presque pas de pression et court directement en diagonale au pivot. Une troisième suite est annoncée sans être décrite. La \"Long (gauche)\" part de ce lancement. Le retour du ballon au demi-centre dans le lancement 1 est notre ajout.",
      ],
      fiabilite: 'partielle',
      sources: [
        SRC_UNI('Auftakt 1: "Der RM spielt in die Stoßbewegung des LA. Dieser spielt weiter in die druckvolle Stoßbewegung des RL." Auftakt 2: "Der RM spielt in den Lauf des RL, der mit dem LA kreuzt. Der Linksaußen spielt zur Mitte ..."'),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Passe à l'aile (lancement 1)",
          etapes: [
            {
              texte: "Le demi-centre passe dans la course de l'ailier gauche, qui avance.",
              courses: { AiG: [-7.6, 4.4] },
              passe: ['DC', 'AiG', 0.3],
            },
            {
              texte: "L'ailier gauche donne aussitôt dans la percussion appuyée de l'arrière gauche.",
              courses: { ArG: [-4.4, 8.2] },
              passe: ['AiG', 'ArG', 0.3],
              def: { G2: [-4.7, 6.1] },
            },
            {
              texte: "Le demi-centre enchaîne la combinaison suivante (ici, l'arrière gauche lui rend le ballon).",
              courses: { DC: [-0.4, 9.8] },
              passe: ['ArG', 'DC', 0.4],
            },
          ],
        },
        {
          nom: "2 - Accélérateur, l'ailier met la pression",
          etapes: [
            ...CROISE_ARG_AIG,
            {
              texte: "L'ailier attaque en mettant la pression, puis passe au demi-centre.",
              courses: { AiG: [-3.6, 8.2] },
              passe: ['AiG', 'DC', 0.6],
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "L'ailier et l'arrière gauche reprennent leurs postes. Le demi-centre enchaîne.",
              courses: {
                AiG: { vers: [-9.0, 1.2], via: [-8.4, 8.0] },
                ArG: { vers: [-5.5, 9.5], via: [-7.8, 9.4] },
              },
              def: { G3: [-1.7, 6.6], G2: [-5.0, 5.2] },
            },
          ],
        },
        {
          nom: "3 - Accélérateur, l'ailier passe pivot",
          etapes: [
            ...CROISE_ARG_AIG,
            {
              texte: "L'ailier ne met presque pas de pression: il passe au demi-centre et court directement en diagonale au pivot.",
              courses: { AiG: [-3.2, 6.3] },
              passe: ['AiG', 'DC', 0.2],
            },
            {
              texte: "L'arrière gauche reprend son poste. Le demi-centre enchaîne, avec deux pivots.",
              courses: { ArG: [-5.5, 9.5] },
              def: { G2: [-4.6, 5.6] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'doppel-unihandball',
      nom: 'Double (Unihandball)',
      alias: 'Doppel (DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Le demi-centre croise avec l'ailier gauche devant le 2; l'ailier sert l'arrière gauche glissé au centre, que le pivot libère d'un écran sur le 3.",
      description: [
        "Combinaison du playbook \"Unihandball\". Le demi-centre reçoit de l'arrière droit dans sa course et croise avec l'ailier devant le 2 gauche. Pendant ce temps, l'arrière gauche glisse vers le centre. L'ailier passe à l'arrière gauche; au même moment, le pivot pose pour lui un écran sur le 3 gauche, placé entre les deux 3.",
        "La formulation du document est ambiguë (\"croise avec l'ailier\") et la fin n'est pas décrite: nous terminons par l'attaque de l'arrière gauche le long de l'écran.",
      ],
      fiabilite: 'partielle',
      sources: [
        SRC_UNI("\"Doppel\": le demi-centre reçoit de l'arrière droit dans sa course et croise avec l'ailier devant #2; l'arrière gauche glisse vers le centre; l'ailier passe à l'arrière gauche; le pivot pose un écran pour lui sur #3 (\"#34\")."),
      ],
      ballon: 'ArD',
      etapes: [
        {
          texte: "L'arrière droit passe au demi-centre, lancé vers la gauche. L'arrière gauche glisse vers le centre en passant dans son dos; l'ailier gauche remonte.",
          courses: {
            DC: [-2.6, 9.2],
            ArG: { vers: [-0.6, 10.8], via: [-3.2, 11.4] },
            AiG: [-8.2, 4.6],
          },
          passe: ['ArD', 'DC', 0.2],
        },
        {
          texte: "Le demi-centre croise avec l'ailier gauche devant le 2 gauche: il attaque vers l'aile, l'ailier coupe dans son dos et reçoit.",
          courses: { DC: [-5.0, 7.8], AiG: { vers: [-3.4, 9.2], via: [-7.0, 10.4] } },
          passe: ['DC', 'AiG', 0.55],
          def: { G2: [-5.0, 6.2] },
        },
        {
          texte: "L'ailier passe à l'arrière gauche, au centre. Au même moment, le pivot pose un écran sur le 3 gauche, côté intervalle central.",
          courses: { Piv: { vers: [-0.8, 6.5], ecran: true } },
          passe: ['AiG', 'ArG', 0.2],
          def: { G3: [-1.8, 6.7] },
        },
        {
          texte: "L'arrière gauche attaque l'intervalle entre les deux 3, le long de l'écran, et tire.",
          courses: { ArG: [0.4, 8.0] },
          tir: { par: 'ArG', t: 0.55 },
          def: { D3: [1.4, 7.0] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'leer-eins-zwei',
      nom: 'À vide 1 / À vide 2 (et PLUS)',
      alias: 'Leer links/rechts "Eins", "Zwei", "PLUS" (Unihandball, DE)',
      categorie: 'Croisés',
      defense: 'non précisée',
      resume: "Le ballon part chez l'arrière droit; le demi-centre et l'arrière gauche croisent à vide, et l'arrière droit sert l'arrière gauche lancé au centre.",
      description: [
        "Variantes du croisé à vide tirées du playbook \"Unihandball\" (voir la fiche \"Croisé à vide\"). \"À vide 1\": l'arrière gauche passe au demi-centre, qui passe à l'arrière droit; le demi-centre et l'arrière gauche croisent sans ballon; l'arrière droit attaque légèrement, feinte une passe vers l'ailier droit et sert l'arrière gauche qui arrive au centre.",
        "\"À vide 2\" commence par l'\"accélérateur\" (croisé arrière-ailier), mais l'ailier passe au pivot qui sort; l'ailier et l'arrière regagnent leurs postes, le pivot sert le demi-centre, puis même fin. Suite \"normale\": on continue dans le sens de la course, l'arrière droit gardant une percussion disponible. Autre suite citée, non montrée: un croisé arrière gauche - arrière droit.",
        "\"PLUS\" change seulement le timing: l'arrière gauche sert l'ailier droit qui rentre devant la défense; l'ailier temporise et sert le demi-centre revenu en arc, pendant que les arrières se décalent à droite; le pivot bloque le 3 droit et l'arrière gauche, au poste d'arrière droit, a le choix entre tir, pivot et ailier (nous montrons le tir). Le tir qui termine les deux premières variantes, et le retour du pivot aux 6 m dans \"À vide 2\", sont nos ajouts.",
      ],
      fiabilite: 'partielle',
      sources: [
        SRC_UNI("\"Leer Eins\": \"RM croise avec RL sans ballon\"; \"Leer Zwei\": lancement \"Beschleuniger\" mais l'ailier passe au pivot qui sort; \"PLUS\": l'ailier opposé rentre \"vor der Abwehr einlaufend\"."),
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: 'À vide 1',
          etapes: [...VIDE_EINS_DEBUT, ...FIN_VIDE, FIN_VIDE_NORMALE],
        },
        {
          nom: 'À vide 2 (par le pivot sorti)',
          etapes: [
            {
              texte: "L'arrière gauche donne au demi-centre pour lancer l'\"accélérateur\".",
              passe: ['ArG', 'DC', 0.1],
            },
            ...CROISE_ARG_AIG,
            {
              texte: "Au lieu de jouer au centre, l'ailier passe au pivot, qui sort.",
              courses: { Piv: [-2.4, 8.8] },
              passe: ['AiG', 'Piv', 0.5],
              def: { G3: [-2.0, 7.4] },
            },
            {
              texte: "L'ailier et l'arrière gauche regagnent leurs postes. Le pivot sert le demi-centre.",
              courses: { ...RETOUR_AIG_ARG, DC: [0.2, 10.2] },
              passe: ['Piv', 'DC', 0.3],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, qui avance légèrement. Le pivot redescend aux 6 m.",
              courses: { ArD: [5.0, 9.0], Piv: [0, 6.4] },
              passe: ['DC', 'ArD', 0.2],
              def: { G3: [-1.7, 6.6] },
            },
            ...FIN_VIDE,
            FIN_VIDE_NORMALE,
          ],
        },
        {
          nom: "PLUS (rentrée de l'ailier droit)",
          etapes: [
            ...VIDE_EINS_DEBUT,
            ...FIN_VIDE,
            {
              texte: "L'arrière gauche passe à l'ailier droit, qui rentre devant la défense. L'arrière droit se décale vers la droite.",
              courses: { AiD: { vers: [3.6, 8.0], via: [8.0, 7.0] }, ArD: [6.8, 7.6] },
              passe: ['ArG', 'AiD', 0.6],
              def: { D1: [6.6, 3.8] },
            },
            {
              texte: "L'ailier temporise et sert le demi-centre, qui revient en arc et met la pression au centre. L'arrière gauche se décale au poste d'arrière droit.",
              courses: { DC: { vers: [0.0, 9.4], via: [-2.6, 11.0] }, ArG: [4.8, 9.8] },
              passe: ['AiD', 'DC', 0.6],
              def: { D3: [0.8, 7.6] },
            },
            {
              texte: "Le demi-centre perce au centre et passe à l'arrière gauche. Le pivot bloque le 3 droit, dans l'intervalle entre le 3 et le 2 droits.",
              courses: { DC: [0.2, 8.6], Piv: { vers: [2.4, 6.5], ecran: true } },
              passe: ['DC', 'ArG', 0.5],
              def: { D3: [1.4, 7.2] },
            },
            {
              texte: "L'arrière gauche, au poste d'arrière droit, a le choix entre tir, pivot et ailier: ici, il tire.",
              courses: { ArG: [4.6, 8.8] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D2: [4.8, 6.6] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'pologne-allemagne-2025',
      nom: 'Pologne - Allemagne (Mondial 2025): deux attaques',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Deux attaques allemandes réussies, analysées par handballtraining.de: enchaînements de croisés à vide, passage au pivot de l'arrière droit, percée extérieure avec écran du pivot.",
      description: [
        "Analyse par le site allemand handballtraining.de de deux attaques de l'Allemagne contre la Pologne au championnat du monde 2025 (choisis l'attaque au-dessus du schéma).",
        "Attaque 1: croisé demi-centre - pivot loin de la défense, échange demi-centre / arrière gauche, puis croisé à vide de l'arrière gauche avec le demi-centre. Le pivot passe dans le dos de la défense; l'arrière droit, voyant son défenseur monter sur lui, le contourne et passe pivot; le demi-centre le sert aux 6 m.",
        "Attaque 2: l'ailier droit monte et reçoit, le demi-centre et l'arrière gauche croisent sans ballon, puis croisent à pleine vitesse entre le 3 et le 2 gauches. Le demi-centre fait une passe parallèle à l'arrière droit, qui perce entre le 2 et le 1 droits grâce à l'écran du pivot; le 1 aide et l'ailier droit marque.",
        "L'article désigne les défenseurs vus de la défense; nous les avons convertis. Quelques détails sont reconstitués: le côté où sort le pivot au début de l'attaque 1, la passe de retour de l'arrière gauche au demi-centre, et la position exacte des écrans.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Handball-WM: Deutschland gegen Polen - erfolgreiche Angriffszüge (handballtraining.de)',
          url: 'https://handballtraining.de/zusammenspiel/handball-wm-deutschland-gegen-polen-erfolgreiche-angriffszuege/3750',
          note: "Description pas à pas des deux attaques: \"croisé RM-pivot loin de la défense\"; l'arrière droit \"contourne son défenseur et passe au pivot\"; percée de l'arrière droit \"aidé par l'écran du pivot\" et but de l'ailier droit.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "Attaque 1 - L'arrière droit passe pivot",
          etapes: [
            {
              texte: "Le pivot sort loin de la défense, côté gauche. Le demi-centre part balle en main vers lui.",
              courses: { Piv: { vers: [-2.0, 9.2], via: [-1.0, 8.0] }, DC: [-0.8, 10.4] },
              def: { G3: [-1.9, 7.2] },
            },
            {
              texte: "Croisé demi-centre - pivot: le pivot repart vers la droite devant le demi-centre et reçoit dans sa course. Le demi-centre et l'arrière gauche échangent leurs places.",
              courses: {
                Piv: [1.6, 9.2],
                DC: { vers: [-5.4, 9.6], via: [-3.0, 9.8] },
                ArG: { vers: [-2.0, 11.0], via: [-4.0, 11.6] },
              },
              passe: ['DC', 'Piv', 0.25],
            },
            {
              texte: "Le pivot passe à l'arrière droit, puis va se placer entre le 3 et le 2 droits.",
              courses: { ArD: [5.0, 9.4], Piv: { vers: [3.4, 6.4], via: [2.6, 8.0] } },
              passe: ['Piv', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit sert l'arrière gauche, qui arrive au centre.",
              courses: { ArG: [0.0, 10.0] },
              passe: ['ArD', 'ArG', 0.45],
            },
            {
              texte: "L'arrière gauche lance aussitôt un croisé à vide avec le demi-centre: il attaque vers la gauche, le demi-centre passe dans son dos sans recevoir.",
              courses: { ArG: [-1.6, 9.4], DC: { vers: [0.8, 10.4], via: [-2.6, 11.4] } },
            },
            {
              texte: "L'arrière gauche passe à l'arrière droit, qui fixe le 2 droit. L'arrière gauche et le demi-centre reprennent leurs places.",
              courses: { ArD: [4.4, 8.4], ArG: [-5.0, 9.6], DC: [0.2, 9.8] },
              passe: ['ArG', 'ArD', 0.15],
              def: { D2: [4.6, 6.6] },
            },
            {
              texte: "L'arrière droit sert le demi-centre au centre. Le pivot passe dans le dos de la défense, vers l'intérieur du 3 gauche.",
              courses: { Piv: { vers: [-0.7, 6.3], via: [1.4, 5.9] } },
              passe: ['ArD', 'DC', 0.3],
              def: { D3: [1.4, 7.4], G3: [-1.8, 6.8] },
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche, qui attaque entre le 2 et le 3 gauches.",
              courses: { ArG: [-3.4, 8.0] },
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-4.4, 6.4], G3: [-2.2, 7.0] },
            },
            {
              texte: "L'arrière gauche rend au demi-centre. L'arrière droit voit le 2 droit monter sur lui: il le contourne et passe pivot.",
              courses: { DC: [0.0, 9.4], ArD: { vers: [5.2, 5.6], via: [6.6, 7.8] } },
              passe: ['ArG', 'DC', 0.5],
              def: { D2: [4.6, 7.6] },
            },
            {
              texte: "Le demi-centre sert l'arrière droit aux 6 m.",
              passe: ['DC', 'ArD', 0.3],
              def: { D3: [2.4, 7.0] },
            },
            { texte: "L'arrière droit marque.", tir: 'ArD' },
          ],
        },
        {
          nom: "Attaque 2 - Percée de l'arrière droit, but de l'ailier",
          etapes: [
            {
              texte: "Le demi-centre donne le ballon à l'arrière droit.",
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit passe à l'ailier droit, qui monte.",
              courses: { AiD: [8.0, 5.4] },
              passe: ['ArD', 'AiD', 0.4],
              def: { D1: [7.6, 3.0] },
            },
            {
              texte: "Le demi-centre et l'arrière gauche croisent sans ballon. Le pivot se place entre le 3 et le 2 droits.",
              courses: {
                DC: [-3.6, 9.6],
                ArG: { vers: [0.2, 10.0], via: [-2.6, 11.6] },
                Piv: { vers: [3.4, 6.3], via: [1.8, 8.8] },
              },
            },
            {
              texte: "L'ailier droit sert l'arrière gauche, au centre.",
              courses: { ArG: [-0.4, 9.6] },
              passe: ['AiD', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche croise à pleine vitesse avec le demi-centre entre le 3 et le 2 gauches: il attaque vers la gauche, le demi-centre passe dans son dos et reçoit.",
              courses: { ArG: [-3.0, 8.4], DC: { vers: [-0.8, 9.4], via: [-3.6, 10.8] } },
              passe: ['ArG', 'DC', 0.55],
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "Le demi-centre fait une passe parallèle à l'arrière droit. Le pivot bloque le 2 droit par l'extérieur; l'arrière droit perce entre le 2 et le 1 droits. L'ailier droit redescend dans son coin.",
              courses: {
                ArD: { vers: [6.8, 6.6], via: [5.6, 8.4] },
                Piv: { vers: [5.8, 5.6], via: [5.0, 6.8], ecran: true },
                AiD: [9.2, 1.6],
              },
              passe: ['DC', 'ArD', 0.3],
            },
            {
              texte: "Le 1 droit vient aider sur l'arrière droit, qui donne à l'ailier droit.",
              courses: { ArD: [6.9, 6.2] },
              passe: ['ArD', 'AiD', 0.4],
              def: { D1: [7.0, 4.6] },
            },
            { texte: "L'ailier droit marque.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rosstal',
      nom: 'Roßtal (tir de loin après croisé long)',
      alias: 'Roßtal H09 (DE)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Rotation arrière-ailier à gauche, renversement vers l'arrière droit, puis croisé long: l'arrière gauche traverse le terrain et tire de loin.",
      description: [
        "Combinaison de tir de loin présentée par le site allemand handballhaus.de. L'arrière gauche fait une rotation extérieure (\"Außenkreisel\") avec l'ailier gauche; l'ailier passe au demi-centre, qui sert l'arrière droit. L'arrière droit fait un croisé long avec l'arrière gauche, qui arrive vite et tire de loin.",
        "Si le 3 et le 2 droits forment un contre, l'arrière gauche joue en parallèle vers le demi-centre ou sert le pivot (choisis une fin au-dessus du schéma).",
        "La fiche d'origine est une animation (non visionnée) avec un court texte; les trajets sont reconstitués. Le site désigne les défenseurs vus de la défense (\"IL\", \"HL\"): il s'agit du 3 et du 2 du côté droit de l'attaque.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Roßtal H09 (handballhaus.de, rubrique "Distanzwürfe", archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/distanzwuerfe/rosstal-h09.html',
          note: "Rotation de l'arrière gauche avec l'ailier, passe au centre puis à l'arrière droit, \"croisé long\" avec l'arrière gauche qui tire de loin; contre de IL et HL: jeu parallèle vers le centre ou passe au pivot.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Tir de loin',
          etapes: [
            ...ROSSTAL_BASE,
            {
              texte: "L'arrière gauche arrive lancé et tire de loin.",
              courses: { ArG: [2.8, 9.4], ArD: [0.8, 8.6] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D3: [2.0, 7.4], D2: [4.4, 6.4] },
            },
          ],
        },
        {
          nom: '2 - Contre: jeu parallèle vers le centre',
          etapes: [
            ...ROSSTAL_BASE,
            ROSSTAL_CONTRE,
            {
              texte: "L'arrière gauche joue en parallèle vers le demi-centre, qui attaque le but.",
              courses: { DC: [-0.6, 8.6] },
              passe: ['ArG', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '3 - Contre: passe au pivot',
          etapes: [
            ...ROSSTAL_BASE,
            ROSSTAL_CONTRE,
            {
              texte: "Le pivot se place dans l'espace laissé par le 3 droit. L'arrière gauche lui donne le ballon.",
              courses: { Piv: [1.2, 6.5] },
              passe: ['ArG', 'Piv', 0.5],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },
  );
})();
