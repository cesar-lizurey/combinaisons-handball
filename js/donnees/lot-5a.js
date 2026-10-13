/* pivot, écrans et blocs (1re partie) - famille Kreisel, Oběh, bloc russe, démarquages du pivot (Dragør), jeu à deux pivots, portes et doubles écrans. */
(() => {
  /* ------------------------------------------------------------------ */
  /* Kreisel: début commun (pivot entre le 1 et le 2 gauches, lancement par l'ailier droit). */
  const KREISEL_DEBUT = [
    {
      texte: "L'ailier droit lance l'action: il passe à l'arrière droit, qui percute pour mettre la pression. Le pivot est placé entre le 1 et le 2 gauches, du côté opposé.",
      courses: { AiD: [8.6, 2.2], ArD: [5.0, 8.6] },
      passe: ['AiD', 'ArD', 0.1],
      def: { D2: [4.9, 5.9], D1: [7.6, 2.8] },
    },
    {
      texte: "L'arrière droit donne au demi-centre, qui attaque l'intervalle entre le 3 et le 2 gauches. L'arrière gauche s'écarte pour préparer sa course.",
      courses: { ArD: [5.6, 9.6], DC: [-2.4, 8.6], ArG: [-6.6, 10.2] },
      passe: ['ArD', 'DC', 0.15],
      def: { G3: [-2.4, 7.4], G2: [-4.6, 5.8], D2: [5.0, 5.2] },
    },
    {
      texte: "Le pivot sort en grand arc et croise derrière le demi-centre, qui lui donne le ballon.",
      courses: { Piv: { vers: [-0.6, 9.0], via: [-4.8, 10.6] }, DC: [-3.0, 7.9] },
      passe: ['DC', 'Piv', 0.6],
      def: { G3: [-2.8, 7.0], G2: [-4.4, 6.0] },
    },
  ];

  /* Suite fréquente: le pivot donne à l'arrière droit, le demi-centre se replace en arrière gauche, l'arrière gauche glisse au centre. */
  const KREISEL_ROTATION = {
    texte: "Le pivot rentre vers l'intérieur et donne à l'arrière droit. Le demi-centre se replace au poste d'arrière gauche; l'arrière gauche glisse vers le centre.",
    courses: {
      Piv: [1.4, 8.8],
      ArD: [4.6, 9.0],
      DC: [-5.2, 9.4],
      ArG: { vers: [-1.8, 10.2], via: [-4.4, 11.4] },
    },
    passe: ['Piv', 'ArD', 0.5],
    def: { G3: [-1.8, 7.0], G2: [-4.8, 5.6], D3: [1.6, 7.6] },
  };

  /* Kreisel inversé: début commun contre 0-6 (le demi-centre est au pivot, le pivot joue demi-centre). */
  const KINV_BASE = [
    {
      texte: "Les rôles sont inversés: le demi-centre est au pivot, le pivot joue demi-centre avec le ballon. Le demi-centre sort des 6 m et se place à 9 m, à droite du pivot.",
      courses: { DC: { vers: [1.8, 9.4], via: [1.6, 7.6] }, Piv: [-0.6, 10.2] },
      def: { D3: [1.8, 7.0] },
    },
    {
      texte: "Le pivot donne au demi-centre, qui attaque vers la droite. Le pivot croise derrière lui en arc, pour se retrouver face à la défense: s'il reçoit, il tire.",
      courses: { DC: [2.8, 8.4], Piv: { vers: [-2.6, 9.4], via: [-0.4, 11.2] } },
      passe: ['Piv', 'DC', 0.1],
      def: { D3: [2.4, 7.5], G3: [-1.9, 7.0] },
    },
  ];

  /* Kreisel inversé contre 5-1: mise en place de l'avancé. */
  const KINV_51 = [
    {
      texte: "Contre une 5-1: le 3 droit joue avancé devant la défense, les autres se placent en ligne. Les rôles sont inversés: le demi-centre est au pivot, le pivot joue demi-centre avec le ballon.",
      courses: { Piv: [-0.4, 10.6] },
      def: { D3: [0.6, 9.0], G3: [-0.8, 6.6], G2: [-4.6, 5.3], D2: [4.6, 5.3] },
    },
    {
      texte: "Le demi-centre sort des 6 m jusqu'à la hauteur de l'avancé. Le pivot lui donne le ballon et croise derrière lui en arc.",
      courses: { DC: { vers: [1.8, 9.6], via: [1.6, 7.6] }, Piv: { vers: [-2.4, 10.2], via: [0.6, 11.6] } },
      passe: ['Piv', 'DC', 0.35],
      def: { D3: [1.4, 8.8] },
    },
  ];

  /* Oběh: début commun (pivot près du 2 gauche). */
  const OBEH_DEBUT = [
    {
      texte: "Le pivot, placé près du 2 gauche, sort devant la défense. L'arrière gauche donne au demi-centre, qui attaque.",
      courses: { Piv: [-3.6, 8.2], DC: [-0.8, 9.2] },
      passe: ['ArG', 'DC', 0.1],
      def: { G2: [-4.4, 6.0], G3: [-2.0, 7.0] },
    },
    {
      texte: "Le pivot repart en s'éloignant de la défense, vers le centre. Le demi-centre et lui se croisent: au croisement, le demi-centre lui donne le ballon.",
      courses: { Piv: { vers: [0.6, 10.2], via: [-1.4, 10.2] }, DC: [-2.6, 8.6] },
      passe: ['DC', 'Piv', 0.55],
      def: { G3: [-2.4, 7.5] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'kreisel',
      nom: 'Kreisel',
      alias: 'RM holt KM, Herauskreuzen des Kreisläufers, Kreiseln, Übergang Kreis/Mitte (DE), "toupie"',
      categorie: 'Jeu avec le pivot',
      defense: '0-6',
      resume: "Le pivot sort, croise derrière le demi-centre et reçoit; le demi-centre prend sa place: l'équipe passe à deux pivots.",
      description: [
        "\"Kreisel\" (\"toupie\") est le nom familier allemand d'un croisé entre le demi-centre et le pivot. Le pivot sort de la zone en grand arc, croise derrière le demi-centre et reçoit le ballon face à la défense; le demi-centre prend sa place au pivot. Selon un entraîneur, cette action \"fait partie du répertoire courant de la plupart des clubs de Bundesliga\".",
        "La variante 1 suit l'article de R. Nowacki (handballtraining.de): le pivot part entre le 1 et le 2, du côté opposé à l'ailier qui lance. Après le croisé, le pivot attaque l'intervalle opposé, puis l'arrière droit percute en parallèle; l'arrière gauche arrive en grand arc au centre, pendant que les deux pivots bloquent les 2 vers l'extérieur.",
        "Les variantes 2 à 5 suivent un message de forum (handballecke.de, 2009) qui décrit en quelques phrases les suites jouées en Bundesliga: le pivot sert l'arrière droit, le demi-centre glisse en arrière gauche et l'arrière gauche rentre. Les courses sont reconstituées à partir de ce texte, sans schéma. La variante 3 cite un avancé: elle vise aussi les défenses étagées.",
        'Voir aussi "Suites du Kreisel" et "Kreisel avec rôles inversés". Le "contournement du pivot" tchèque (Oběh) est très proche.',
      ],
      objectif: "Passer à deux pivots en gardant le ballon en mouvement, et attaquer un intervalle avec un pivot lancé face au but.",
      pointsCles: [
        "Le pivot fait l'arc le plus grand possible pour recevoir face au but et menacer en profondeur.",
        "Le demi-centre attaque vraiment son intervalle avant de donner.",
        "Après le croisé, les deux pivots bloquent les 2 vers l'extérieur pour ouvrir le centre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Übergang auf zwei Kreisläufer, Teil 2: Kreisel (R. Nowacki, handballtraining.de)',
          url: 'https://handballtraining.de/kreisspieler/uebergang-auf-zwei-kreislaeufer-teil-2-kreisel/1341',
          note: '"le Spielzug familièrement appelé "Kreisel", avec un échange entre le pivot et le demi-centre"; étapes détaillées (variante 1).',
        },
        {
          titre: 'Fil "Sammlung von Spielzügen", messages de 2009 (forum handballecke.de)',
          url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
          note: 'Relevé Flensburg-Göppingen: "RM holt KM". Suites de Limettensaft: ailier qui passe derrière la défense, RM pivot entre 2 et 3, RL "steil", piège du pivot (variantes 2 à 5).',
        },
        {
          titre: 'Fil "4:2 Angriff (mit 2 Kreisläufern)" (forum handballecke.de, 2010)',
          url: 'https://www.handballecke.de/forum/thread/24683-4-2-angriff-mit-2-kreisl%C3%A4ufern/',
          note: '"Mittelmann holt den KL (läuft bogenförmig) ... Zu finden ist das ganze auch unter dem Namen "Kreisel"".',
        },
        {
          titre: 'Catalogue de séances handball-uebungen.de (J. Madinger)',
          url: 'https://handball-uebungen.de/trainingseinheiten/angriff/angriff-gegen-6-0',
          note: 'Séance 666 "RM holt Kreisläufer" (résumé seulement).',
        },
      ],
      depart: { Piv: [-6.3, 4.4] },
      ballon: 'AiD',
      variantes: [
        {
          nom: '1 - Passage à deux pivots, tir de loin (Nowacki)',
          etapes: [
            ...KREISEL_DEBUT,
            {
              texte: "Le pivot, lancé, attaque l'intervalle entre le 3 et le 2 droits. Le demi-centre redescend au poste de pivot, à l'intérieur du 2 gauche.",
              courses: { Piv: [2.6, 8.0], DC: [-3.4, 6.5] },
              def: { D3: [2.2, 7.1], D2: [4.4, 6.0], G3: [-1.6, 7.0], G2: [-4.6, 5.6] },
            },
            {
              texte: "Le 3 droit ferme l'intervalle: le pivot donne à l'arrière droit, qui percute en parallèle entre le 2 et le 1. L'arrière gauche part en grand arc, avec beaucoup d'élan, vers le centre.",
              courses: { ArD: [6.2, 8.0], ArG: { vers: [-0.8, 10.0], via: [-4.2, 11.6] } },
              passe: ['Piv', 'ArD', 0.2],
              def: { D2: [5.4, 6.2], D1: [7.6, 3.2] },
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, lancé entre les deux 3. Le pivot redescend et bloque le 2 droit vers l'extérieur; le demi-centre bloque le 2 gauche vers l'extérieur.",
              courses: {
                ArG: [-0.4, 9.0],
                Piv: { vers: [4.1, 6.3], ecran: true },
                DC: { vers: [-3.9, 6.2], ecran: true },
              },
              passe: ['ArD', 'ArG', 0.3],
              def: { D2: [5.1, 5.6], G2: [-5.0, 5.4], G3: [-1.6, 7.1], D3: [1.6, 7.1] },
            },
            {
              texte: "Les deux 3 restent bas: l'arrière gauche tire de loin. (Si un 3 sort, l'espace s'ouvre derrière lui pour un pivot; si un 2 contourne l'écran, l'arrière droit est libre.)",
              courses: { ArG: [-0.3, 8.8] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - Contre défense offensive: l'ailier passe dans le dos",
          etapes: [
            ...KREISEL_DEBUT,
            KREISEL_ROTATION,
            {
              texte: "La défense, offensive, sort haut sur l'arrière droit et sur le pivot. L'ailier droit passe dans son dos, le long des 6 m; l'arrière droit lui donne le ballon. Le pivot redescend côté ballon.",
              courses: { AiD: { vers: [3.2, 6.5], via: [6.6, 5.2] }, Piv: [0.2, 6.6] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D3: [1.6, 8.0], D2: [4.6, 8.0], D1: [6.4, 3.8] },
            },
            { texte: "L'ailier droit tire, seul face au gardien.", tir: 'AiD' },
          ],
        },
        {
          nom: '3 - Le demi-centre devient pivot entre le 2 et le 3',
          etapes: [
            ...KREISEL_DEBUT,
            {
              texte: "Le demi-centre se fond au poste de pivot, entre le 2 et le 3 gauches. Le 3 gauche suit côté ballon et reprend le pivot sorti. Le pivot rentre vers le centre et donne à l'arrière droit.",
              courses: { DC: [-3.3, 6.6], Piv: [0.6, 9.2], ArD: [3.2, 9.4] },
              passe: ['Piv', 'ArD', 0.55],
              def: { G3: [-0.6, 8.1], D3: [1.8, 7.4], G2: [-4.6, 5.6] },
            },
            {
              texte: "L'arrière droit rentre vers l'intérieur et fixe le centre de la défense (dans la source, l'avancé).",
              courses: { ArD: [2.2, 8.6] },
              def: { D3: [2.0, 7.6], G3: [-0.4, 7.6] },
            },
            {
              texte: "Il sert le second pivot, le demi-centre, dans l'espace laissé par le 3 gauche. (Autre choix: passe parallèle à l'arrière gauche, qui attaque l'intervalle entre le 1 et le 2.)",
              courses: { DC: [-2.6, 6.6] },
              passe: ['ArD', 'DC', 0.3],
              def: { G2: [-4.3, 5.9] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "4 - L'arrière gauche percute droit au centre",
          etapes: [
            ...KREISEL_DEBUT,
            KREISEL_ROTATION,
            {
              texte: "La défense est bien en place et le demi-centre a eu le temps de revenir en arrière gauche. C'est le signal: l'arrière gauche ne court pas en parallèle mais percute droit vers le but, au centre. L'arrière droit lui donne.",
              courses: { ArG: [-0.6, 8.3], Piv: [2.4, 6.6] },
              passe: ['ArD', 'ArG', 0.25],
              def: { D3: [1.5, 7.2], G3: [-1.6, 7.0] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "5 - Piège: le pivot sort, l'arrière gauche est servi",
          etapes: [
            KREISEL_DEBUT[0],
            {
              texte: "L'arrière droit donne au demi-centre. Le pivot, placé entre le 1 et le 2 gauches, sort brusquement de la zone: le 2, qui veut bien faire, le suit. L'arrière gauche prend son élan.",
              courses: { DC: [-1.4, 9.4], Piv: [-3.6, 8.8], ArG: [-6.2, 10.4] },
              passe: ['ArD', 'DC', 0.15],
              def: { G2: [-4.0, 7.8], G3: [-2.0, 7.0] },
            },
            {
              texte: "Au lieu de servir le pivot, le demi-centre donne directement à l'arrière gauche, lancé à pleine vitesse dans l'espace laissé par le 2.",
              courses: { ArG: [-6.0, 7.2] },
              passe: ['DC', 'ArG', 0.3],
              def: { G1: [-7.4, 3.4] },
            },
            {
              texte: "L'arrière gauche tire.",
              courses: { ArG: [-5.8, 6.8] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'kreisel-suites',
      nom: 'Suites du Kreisel',
      alias: 'Kreisel 2/3, Kreisel mit Nachkreuzen, Kreisel mit Einläufer, Kreisel angetäuscht, Rolle links/rechts, Kreuzen RM x KM (DE)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Six façons d'enchaîner après le Kreisel: pivot qui revient, croisé du pivot, rentrée d'ailier, feinte, jeu à deux pivots.",
      description: [
        "Le Kreisel est le croisé entre le demi-centre et le pivot qui sort (voir la fiche \"Kreisel\"). Le site allemand handballhaus.de en donnait plusieurs suites animées, chacune résumée en deux ou trois phrases; un document d'équipe universitaire (Unihandball) décrit la \"Rolle\" (rouleau), même croisé avec deux suites.",
        "Le début est ici celui de la fiche Kreisel (pivot sorti de la gauche, ballon venant de la droite). La position de départ du pivot n'est pas précisée par ces sources: seules les suites suivent les textes, que les courses détaillées complètent. Choisis une variante au-dessus du schéma.",
        "Dans la \"Rolle normale\", la source ne fixe pas de fin: l'équipe joue à deux pivots \"jusqu'à l'erreur défensive\". Le tir montré n'est qu'un exemple.",
      ],
      objectif: "Exploiter le déséquilibre créé par le Kreisel avec une seconde action préparée.",
      pointsCles: [
        "Toutes les suites partent du même début: la défense ne sait pas laquelle va suivre.",
        "La feinte de Kreisel n'a de sens que si le vrai Kreisel a déjà été joué.",
        'Dans la "Rolle RAUS", le retour vers la droite reste la règle, sauf occasion nette.',
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Handballtaktik: Kreiseln, Kreisel 2/3, Kreisel mit Nachkreuzen, Kreisel mit Einlauf, Kreisel angetäuscht (handballhaus.de, archive)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen/kreiseln.html',
          note: '"RM kreuzt mit dem Kreisspieler und setzt sich auf RL ab"; suites: pivot qui repasse pivot à droite, croisé "steil" du pivot, écran de tir et rentrée de LA, feinte du Kreisel.',
        },
        {
          titre: 'Unihandball - Auftakt-, Auslösehandlungen, Spielzüge (silo.tips)',
          url: 'https://silo.tips/download/unihandball-auftakt-auslsehandlungen-spielzge',
          note: '"Rolle": RM croise avec KM, KM passe à RR et retombe au pivot; "normal" (2 pivots) ou "RAUS" (RM glisse en arrière gauche).',
        },
        {
          titre: 'Angriff gegen offensive Abwehr (P. Streicher, Badischer Handball-Verband)',
          url: 'https://www.badischer-hv.de/fileadmin/bhv/Bilder_und_Dokumente/Bildung/B_Ausbildung_21/Angriff_gegen_offensive_Abwehr_PDF.pdf',
          note: '"Kreuzen: RM x KM + KM x RR/RL" parmi les formes de croisé contre défense offensive.',
        },
      ],
      depart: { Piv: [-6.3, 4.4] },
      ballon: 'AiD',
      variantes: [
        {
          nom: '1 - Kreisel 2/3: le pivot revient à droite',
          etapes: [
            ...KREISEL_DEBUT,
            {
              texte: "Le pivot donne à l'arrière droit puis repasse au poste de pivot, côté droit. Le demi-centre se place en pivot gauche, à l'intérieur du 2, pour un écran indirect.",
              courses: { Piv: [3.0, 6.5], DC: [-3.4, 6.6], ArD: [5.0, 9.0] },
              passe: ['Piv', 'ArD', 0.15],
              def: { G3: [-1.8, 7.0], D3: [1.8, 7.2], G2: [-4.7, 5.7] },
            },
            {
              texte: "L'arrière droit sert l'arrière gauche, lancé, qui utilise l'écran du demi-centre pour percer. (Autre choix: passe au pivot gauche.)",
              courses: { ArG: { vers: [-2.6, 8.4], via: [-5.0, 9.6] } },
              passe: ['ArD', 'ArG', 0.4],
              def: { G3: [-1.9, 7.5] },
            },
            {
              texte: "L'arrière gauche perce et tire.",
              courses: { ArG: [-2.8, 7.8] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: '2 - Kreisel avec croisé du pivot (Nachkreuzen)',
          etapes: [
            ...KREISEL_DEBUT,
            {
              texte: "Le pivot donne à l'arrière droit et le suit en arc. L'arrière droit rentre vers l'intérieur.",
              courses: { Piv: [1.8, 10.2], ArD: [3.8, 8.6] },
              passe: ['Piv', 'ArD', 0.1],
              def: { D2: [4.4, 6.4], D3: [2.2, 7.2] },
            },
            {
              texte: "L'arrière droit fixe le 2 droit et rend le ballon au pivot, qui croise droit vers le but, derrière lui.",
              courses: { ArD: [3.4, 7.9], Piv: { vers: [5.6, 8.0], via: [4.6, 9.8] } },
              passe: ['ArD', 'Piv', 0.55],
              def: { D2: [3.9, 7.0] },
            },
            {
              texte: "Le pivot perce entre le 2 et le 1 droits et tire. (Si le 1 sort sur lui, il sert l'ailier droit.)",
              courses: { Piv: [6.0, 7.0] },
              tir: { par: 'Piv', t: 0.5 },
              def: { D1: [7.2, 4.4] },
            },
          ],
        },
        {
          nom: "3 - Kreisel avec rentrée de l'ailier gauche (Einläufer)",
          etapes: [
            ...KREISEL_DEBUT,
            {
              texte: "Le pivot donne à l'arrière droit puis pose devant lui un écran de tir. L'ailier gauche commence sa rentrée le long des 6 m.",
              courses: { Piv: { vers: [3.4, 7.5], ecran: true }, ArD: [4.4, 9.0], AiG: [-5.4, 5.0], DC: [-4.4, 9.4] },
              passe: ['Piv', 'ArD', 0.15],
              def: { D3: [2.6, 7.0], D2: [4.6, 6.4], G1: [-7.2, 2.8], G2: [-4.4, 6.2], G3: [-2.6, 7.0] },
            },
            {
              texte: "L'arrière droit saute comme pour tirer derrière l'écran, et sert l'ailier gauche qui a continué sa rentrée jusqu'au centre.",
              courses: { AiG: { vers: [0.0, 6.6], via: [-2.8, 6.6] } },
              passe: ['ArD', 'AiG', 0.6],
              def: { G3: [-2.2, 7.6], D3: [2.4, 7.2] },
            },
            { texte: "L'ailier gauche tire, face au but.", tir: 'AiG' },
          ],
        },
        {
          nom: '4 - Kreisel feinté (angetäuscht)',
          etapes: [
            KREISEL_DEBUT[0],
            KREISEL_DEBUT[1],
            {
              texte: "Le pivot sort en arc comme pour le Kreisel. Le demi-centre feinte la passe au pivot et garde le ballon. L'arrière gauche prend son élan pour percuter en parallèle, à l'extérieur.",
              courses: { Piv: { vers: [-0.6, 9.0], via: [-4.8, 10.6] }, DC: [-3.0, 7.9], ArG: [-6.2, 9.2] },
              def: { G3: [-2.4, 7.2], D3: [0.2, 7.6], G2: [-4.4, 6.0] },
            },
            {
              texte: "Le demi-centre donne en parallèle à l'arrière gauche lancé. Le pivot continue sa course comme s'il avait reçu, pour emmener la défense.",
              courses: { ArG: [-6.0, 7.6], Piv: [1.6, 8.4] },
              passe: ['DC', 'ArG', 0.25],
              def: { D3: [1.6, 7.4], G2: [-4.8, 6.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '5 - Rolle "normale": deux pivots',
          etapes: [
            ...KREISEL_DEBUT,
            {
              texte: "Le pivot donne à l'arrière droit et retombe au poste de pivot, à droite. Le demi-centre reste au pivot, à gauche: l'équipe joue avec deux pivots. L'arrière droit percute légèrement; l'arrière gauche se rapproche.",
              courses: { Piv: [3.0, 6.5], DC: [-3.4, 6.6], ArD: [5.0, 8.8], ArG: [-4.4, 9.8] },
              passe: ['Piv', 'ArD', 0.15],
              def: { G3: [-1.8, 7.0], D3: [1.8, 7.2], G2: [-4.7, 5.7] },
            },
            {
              texte: "Les deux arrières se passent le ballon en gardant la pression, jusqu'à l'erreur de la défense.",
              courses: { ArG: [-3.0, 8.6] },
              passe: ['ArD', 'ArG', 0.3],
              def: { G3: [-2.2, 7.6] },
            },
            {
              texte: "Exemple de fin: le 3 gauche sort trop tard, l'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '6 - Rolle "RAUS": le demi-centre ressort',
          etapes: [
            ...KREISEL_DEBUT,
            {
              texte: "Le pivot donne à l'arrière droit et retombe au poste de pivot, à droite. Annonce \"RAUS\": le demi-centre glisse en arrière gauche, l'arrière gauche arrive par le centre.",
              courses: { Piv: [3.0, 6.5], ArD: [5.0, 8.8], DC: [-5.2, 9.4], ArG: { vers: [-0.8, 9.8], via: [-4.4, 11.4] } },
              passe: ['Piv', 'ArD', 0.15],
              def: { G3: [-1.8, 7.0], D3: [1.8, 7.2], G2: [-4.7, 5.7] },
            },
            {
              texte: "L'arrière gauche reçoit de l'arrière droit, au centre.",
              courses: { ArG: [-0.6, 9.2] },
              passe: ['ArD', 'ArG', 0.2],
            },
            {
              texte: "Il donne au demi-centre, en arrière gauche, qui attaque.",
              courses: { DC: [-4.4, 8.4] },
              passe: ['ArG', 'DC', 0.2],
              def: { G2: [-4.6, 6.8] },
            },
            {
              texte: 'Occasion nette: le demi-centre tire. (Sinon, il renvoie le ballon vers la droite: "Rückstoß".)',
              tir: 'DC',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'kreisel-inverse',
      nom: 'Kreisel avec rôles inversés',
      alias: '"Eine Auftakthandlung - verschiedene Spielsituationen" II et III (DE), Kreuzen von Rückraum Mitte mit dem Kreisspieler',
      categorie: 'Jeu avec le pivot',
      defense: '0-6 et 5-1',
      resume: "Le demi-centre et le pivot ont échangé leurs postes: le demi-centre sort du pivot et croise avec le pivot, puis trois suites contre 0-6 et deux contre 5-1.",
      description: [
        "Une même action de départ, plusieurs situations de jeu (série d'articles de \"Jens R.\", handballtraining.de, 2025). Avant l'action, le demi-centre et le pivot ont échangé leurs postes. Le demi-centre sort des 6 m jusqu'à 9 m et croise avec le pivot, qui court en arc pour être face à la défense: s'il reçoit, il tire.",
        "Contre 0-6: le demi-centre garde le ballon et sert l'arrière gauche qui arrive au centre (1), recroise aussitôt avec l'ailier droit (2), ou sert l'arrière droit pendant que l'ailier gauche rentre (3). Contre 5-1, le croisé se fait à hauteur de l'avancé: le demi-centre l'évite ou l'attaque, puis les deux passent au pivot (4); ou le demi-centre s'arrête à 8 m (5).",
        "Les schémas des articles n'ont pas été vus: l'ordre des passes et les placements sont reconstitués à partir des textes, et les fins simplifiées. Les variantes 4 et 5 montrent une 5-1 obtenue en faisant monter le 3 droit (repère \"3\" sur le schéma = l'avancé).",
      ],
      objectif: "Créer, à partir d'un même début, des situations de 2 contre 2 ou de surnombre adaptées à la défense.",
      pointsCles: [
        "Le pivot court en arc pour recevoir face à la défense, d'abord pour tirer.",
        "Le demi-centre lit la défense avant de choisir la suite.",
        "Contre 5-1, si l'avancé suit au pivot, l'attaque à deux pivots fait redevenir la défense une 6-0.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Eine Auftakthandlung - verschiedene Spielsituationen II (Jens R., handballtraining.de)',
          url: 'https://handballtraining.de/zusammenspiel/eine-auftakthandlung-verschiedene-spielsituationen-ii/3789',
          note: 'Croisé RM-pivot avec rôles échangés, trois suites contre 6-0 (variantes 1 à 3).',
        },
        {
          titre: 'Eine Auftakthandlung - verschiedene Spielsituationen III (Jens R., handballtraining.de)',
          url: 'https://handballtraining.de/zusammenspiel/eine-auftakthandlung-verschiedene-spielsituationen-iii/3802',
          note: "Même action contre 5-1: croisé à hauteur de l'avancé, passage à deux pivots, arrêt à 8 m (variantes 4 et 5).",
        },
      ],
      depart: { DC: [0, 6.4], Piv: [0, 10.5] },
      ballon: 'Piv',
      variantes: [
        {
          nom: "1 - 0-6: l'arrière gauche arrive au centre",
          etapes: [
            ...KINV_BASE,
            {
              texte: "Le demi-centre garde le ballon et continue d'attaquer. Le pivot finit son arc et retourne aux 6 m, à l'intérieur du 2 gauche. L'arrière gauche arrive par le centre.",
              courses: { Piv: { vers: [-3.6, 6.4], ecran: true }, ArG: { vers: [-0.6, 9.6], via: [-3.6, 10.8] }, DC: [3.0, 8.2] },
              def: { G2: [-4.6, 5.6], G3: [-1.8, 7.0] },
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche, puis bloque le 3 droit par l'intérieur.",
              courses: { DC: { vers: [1.0, 7.2], ecran: true }, ArG: [-0.4, 9.0] },
              passe: ['DC', 'ArG', 0.15],
              def: { D3: [1.8, 6.8] },
            },
            {
              texte: "L'arrière gauche tire entre les deux écrans. (Autres choix: un des pivots, ou une passe parallèle à l'arrière droit qui attaque entre le 3 et le 2 droits.)",
              courses: { ArG: [-0.3, 8.4] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: "2 - 0-6: nouveau croisé avec l'ailier droit",
          etapes: [
            ...KINV_BASE,
            {
              texte: "Le demi-centre garde le ballon et croise aussitôt avec l'ailier droit, qui remonte et passe derrière lui. L'arrière droit vient vers le centre.",
              courses: { DC: [4.0, 7.6], AiD: { vers: [3.0, 9.2], via: [6.8, 8.8] }, ArD: [1.4, 10.0] },
              passe: ['DC', 'AiD', 0.6],
              def: { D2: [4.8, 6.6], D1: [7.2, 3.0] },
            },
            {
              texte: "L'ailier droit attaque l'intervalle entre le 2 et le 3 droits et sert l'arrière droit, arrivé au centre. Le demi-centre se place au pivot, en écran à l'extérieur du 2 droit.",
              courses: { AiD: [3.4, 8.4], DC: { vers: [5.6, 5.4], ecran: true } },
              passe: ['AiD', 'ArD', 0.4],
              def: { D3: [2.6, 7.6], D2: [4.7, 5.9] },
            },
            {
              texte: "L'arrière droit change de direction vers la droite et rend à l'ailier, désormais au poste d'arrière droit: 2 contre 2 avec le demi-centre au pivot.",
              courses: { AiD: [5.6, 8.6], ArD: [1.8, 9.4] },
              passe: ['ArD', 'AiD', 0.3],
            },
            {
              texte: "L'ailier attaque et tire. (Si le 2 sort sur lui, il sert le demi-centre au pivot.)",
              courses: { AiD: [5.8, 7.8] },
              tir: { par: 'AiD', t: 0.45 },
            },
          ],
        },
        {
          nom: "3 - 0-6: l'ailier gauche rentre",
          etapes: [
            ...KINV_BASE,
            {
              texte: "Pendant le croisé, l'ailier gauche rentre le long des 6 m et se place à l'intérieur du 2 droit. Le demi-centre donne à l'arrière droit; le pivot redescend et bloque le 3 gauche par l'intérieur.",
              courses: { AiG: { vers: [3.6, 6.4], via: [-2.0, 8.0] }, Piv: { vers: [-0.9, 7.2], ecran: true }, DC: [2.0, 9.2] },
              passe: ['DC', 'ArD', 0.2],
              def: { G3: [-1.7, 6.7], D3: [2.0, 7.0], D2: [4.8, 5.5] },
            },
            {
              texte: "Le demi-centre et l'arrière gauche croisent sans ballon: l'arrière gauche vient au centre, le demi-centre glisse à sa place.",
              courses: { ArG: { vers: [0.2, 9.4], via: [-2.6, 10.8] }, DC: { vers: [-4.8, 9.6], via: [-1.6, 9.0] } },
            },
            {
              texte: "L'arrière droit sert l'arrière gauche lancé au centre.",
              courses: { ArG: [0.6, 8.6] },
              passe: ['ArD', 'ArG', 0.2],
              def: { D3: [1.6, 7.4] },
            },
            {
              texte: "L'arrière gauche tire. (Autres choix: un pivot, ou le renversement vers le demi-centre qui revient par le centre.)",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: "4 - 5-1: croisé à hauteur de l'avancé, deux pivots",
          etapes: [
            ...KINV_51,
            {
              texte: "Le demi-centre attaque l'avancé en 1 contre 1 (ou l'évite). Le pivot finit son arc côté gauche et reçoit.",
              courses: { DC: [1.6, 8.6], Piv: [-2.2, 9.2] },
              passe: ['DC', 'Piv', 0.5],
              def: { D3: [1.2, 7.8] },
            },
            {
              texte: "Le pivot donne à l'arrière gauche. Le demi-centre et le pivot passent tous les deux au poste de pivot. L'avancé suit le demi-centre: la défense redevient une 6-0 face à deux pivots.",
              courses: { DC: [2.4, 6.6], Piv: [-2.2, 6.6], ArG: [-4.6, 9.0] },
              passe: ['Piv', 'ArG', 0.1],
              def: { D3: [1.6, 7.5], G3: [-1.1, 7.0], G2: [-4.4, 6.1] },
            },
            {
              texte: "Les deux arrières et les deux pivots jouent le 4 contre 4 au centre (la source ne fixe pas de fin).",
              courses: { ArG: [-3.6, 8.6], ArD: [4.8, 9.0] },
              passe: ['ArG', 'ArD', 0.4],
            },
          ],
        },
        {
          nom: "5 - 5-1: le demi-centre s'arrête à 8 m",
          etapes: [
            ...KINV_51,
            {
              texte: "Le demi-centre ne passe pas au pivot: il s'arrête à 8 m, près de l'avancé, et donne à l'arrière gauche. Le pivot descend aux 6 m, côté gauche.",
              courses: { DC: [1.6, 8.2], Piv: [-2.8, 6.5], ArG: [-4.6, 9.2] },
              passe: ['DC', 'ArG', 0.2],
              def: { D3: [1.2, 9.0], G3: [-1.6, 7.0], G2: [-4.6, 6.0] },
            },
            {
              texte: "L'arrière gauche sert le pivot, qui le lui rend aussitôt pendant qu'il passe en grand arc par le centre.",
              courses: { ArG: { vers: [-0.6, 9.2], via: [-3.8, 10.8] } },
              passe: ['ArG', 'Piv', 0],
              def: { G2: [-4.2, 6.6] },
            },
            {
              texte: "Le pivot rend le ballon à l'arrière gauche, lancé au centre.",
              courses: { ArG: [-0.4, 8.6] },
              passe: ['Piv', 'ArG', 0.15],
              def: { G3: [-0.9, 7.6] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'obeh-pivota',
      nom: 'Contournement du pivot (Oběh)',
      alias: 'Oběh, Oběh pivota (CZ)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6 (variante contre 5-1)',
      resume: "Le pivot sort, échange le ballon avec le demi-centre en se croisant, sert l'arrière opposé et revient au pivot de l'autre côté; les arrières permutent.",
      description: [
        "Combinaison \"sur signal\" observée en 1re division tchèque (mémoire de K. Kubišová, Université Charles de Prague, 2020). Le nom vient de l'usage des joueurs. Le pivot, placé près du 2, sort devant la défense. Le demi-centre reçoit de l'arrière latéral, attaque, et donne au pivot qui s'éloigne de la défense: \"en se croisant, ils échangent le ballon\".",
        "Le pivot sert l'arrière latéral le plus éloigné, puis reprend place dans la défense du côté opposé à sa sortie. Les arrières permutent: le demi-centre prend le poste de l'arrière qui a lancé, et cet arrière glisse au centre, où il reçoit. Contre 0-6, le pivot pose un écran entre le 2 et le 3 pour un tir d'arrière.",
        "La source décrit aussi trois versions d'équipes: contre 5-1, le demi-centre rentre en second pivot (Plzeň, Most); une rentrée d'ailier au moment de l'échange (Nové Veselí); un double écran du demi-centre et du pivot (Písek). Sans schéma: placements reconstitués, fin des variantes 3 et 4 non précisée par la source au-delà du principe.",
        "C'est presque le Kreisel allemand (croisé demi-centre / pivot qui sort): voir la fiche \"Kreisel\".",
      ],
      objectif: "Déplacer la défense par la sortie du pivot et la permutation des arrières, puis tirer près d'un écran.",
      pointsCles: [
        "Le pivot est déjà lancé, en s'éloignant de la défense, quand il reçoit.",
        "La permutation des arrières se fait pendant que le pivot redescend de l'autre côté.",
        "Contre 0-6, l'écran du pivot entre le 2 et le 3 prépare le tir.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál v mužské a ženské házené (Univ. Charles, 2020)',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: '"Když se míjí, vymění si míč" ("en se croisant, ils échangent le ballon"); versions de Plzeň, Most, Nové Veselí et Písek (p. 29-30, 34, 39, 42).',
        },
      ],
      depart: { Piv: [-3.6, 6.4] },
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Contre 0-6: permutation et écran',
          etapes: [
            ...OBEH_DEBUT,
            {
              texte: "Le pivot sert l'arrière droit, le plus éloigné, puis redescend au pivot du côté droit. Le demi-centre part vers le poste d'arrière gauche; l'arrière gauche glisse au centre.",
              courses: {
                Piv: { vers: [3.2, 6.5], via: [2.4, 8.6] },
                DC: [-5.4, 9.4],
                ArG: { vers: [-0.6, 10.0], via: [-3.6, 10.8] },
                ArD: [4.8, 9.0],
              },
              passe: ['Piv', 'ArD', 0.15],
              def: { G3: [-1.8, 6.9], D3: [1.8, 7.0], G2: [-4.8, 5.4] },
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, arrivé au centre. Le pivot pose un écran entre le 3 et le 2 droits.",
              courses: { Piv: { vers: [2.6, 6.8], ecran: true }, ArG: [0.4, 9.2] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D3: [1.7, 6.6], D2: [4.4, 5.8] },
            },
            {
              texte: "L'arrière gauche attaque à côté de l'écran et tire.",
              courses: { ArG: [1.0, 8.4] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: '2 - Contre 5-1: le demi-centre rentre en second pivot',
          etapes: [
            {
              texte: "Contre une 5-1: le 3 droit joue avancé. Le pivot, placé près du 2 gauche, sort devant la défense; l'arrière gauche donne au demi-centre, qui attaque.",
              courses: { Piv: [-3.6, 8.2], DC: [-0.8, 9.2] },
              passe: ['ArG', 'DC', 0.1],
              def: { D3: [0.8, 8.9], G3: [-1.0, 6.8], G2: [-4.4, 6.0], D2: [4.6, 5.3] },
            },
            {
              texte: "Le pivot repart vers le centre; en se croisant, le demi-centre lui donne le ballon.",
              courses: { Piv: { vers: [0.6, 10.2], via: [-1.4, 10.2] }, DC: [-2.6, 8.6] },
              passe: ['DC', 'Piv', 0.55],
              def: { D3: [0.6, 9.2], G3: [-1.6, 7.3] },
            },
            {
              texte: "Le pivot sert l'arrière droit et redescend au pivot côté droit. Au lieu de ressortir, le demi-centre rentre dans la défense en second pivot, près du 3 gauche.",
              courses: { Piv: { vers: [3.2, 6.5], via: [2.4, 8.6] }, DC: [-2.6, 6.4], ArD: [4.8, 9.0] },
              passe: ['Piv', 'ArD', 0.15],
              def: { G3: [-1.4, 7.0], D3: [2.6, 8.6], D2: [4.6, 6.0] },
            },
            {
              texte: "Comme presque toujours dans cette version, l'arrière latéral tire de loin.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: "3 - Avec rentrée de l'ailier gauche (Nové Veselí)",
          etapes: [
            OBEH_DEBUT[0],
            {
              texte: "Le pivot repart vers le centre; au croisement, le demi-centre lui donne le ballon. Au même moment, l'ailier gauche rentre le long des 6 m.",
              courses: { Piv: { vers: [0.6, 10.2], via: [-1.4, 10.2] }, DC: [-2.6, 8.6], AiG: [-4.4, 5.6] },
              passe: ['DC', 'Piv', 0.55],
              def: { G3: [-2.4, 7.5], G1: [-6.8, 3.2], G2: [-4.6, 6.6] },
            },
            {
              texte: "Le pivot sert l'arrière droit et redescend côté droit. L'ailier rentré devient un second pivot entre le 2 et le 3 gauches. Le demi-centre part vers le poste d'arrière gauche, l'arrière gauche glisse au centre.",
              courses: {
                Piv: { vers: [3.2, 6.5], via: [2.4, 8.6] },
                AiG: [-2.8, 6.5],
                DC: [-5.4, 9.4],
                ArG: { vers: [-0.6, 10.0], via: [-3.6, 10.8] },
                ArD: [4.8, 9.0],
              },
              passe: ['Piv', 'ArD', 0.15],
              def: { G3: [-1.6, 7.0], D3: [1.8, 7.0], G2: [-4.4, 6.0], G1: [-7.0, 2.6] },
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, au centre, entre l'ailier rentré et l'écran du pivot.",
              courses: { Piv: { vers: [2.6, 6.8], ecran: true }, ArG: [0.4, 9.2] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D3: [1.7, 6.6] },
            },
            {
              texte: "Fin non précisée par la source: ici, l'arrière gauche tire au centre.",
              courses: { ArG: [0.2, 8.4] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: '4 - Double écran du demi-centre et du pivot (Písek)',
          etapes: [
            OBEH_DEBUT[0],
            {
              texte: "Même début, mais le demi-centre ne donne pas au pivot: il rend le ballon à l'arrière gauche. Le pivot pose un écran sur le 2 gauche, le demi-centre sur le 3 gauche.",
              courses: { Piv: { vers: [-4.0, 6.8], ecran: true }, DC: { vers: [-1.9, 7.6], ecran: true }, ArG: [-4.8, 9.4] },
              passe: ['DC', 'ArG', 0.15],
              def: { G2: [-4.7, 6.1], G3: [-1.7, 6.7] },
            },
            {
              texte: "L'arrière gauche attaque le double écran, dans l'intervalle entre le 2 et le 3.",
              courses: { ArG: [-3.0, 8.4] },
              def: { D3: [0.4, 7.0] },
            },
            { texte: "L'arrière gauche tire au-dessus des écrans.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'bloc-russe',
      nom: 'Bloc russe',
      alias: 'Russerscreening (DA), Russian screen(ing) (EN), écran russe, ½ russe, "bloc - remise au bloc"',
      categorie: 'Écrans et blocs',
      defense: '0-6 (défense active)',
      resume: "Le pivot pose un bloc de biais sur le 2 sorti sur l'arrière; l'arrière attaque le 3 et remet au pivot, qui utilise l'espace derrière le 2.",
      description: [
        "Le bloc russe est un \"écran de biais, pour bloquer de biais sur le côté en étant de face\" (W. Fog-Hansen, Dragør HK). Il vise une défense active, dont le 2 sort pour stopper l'arrière. Le pivot sort et pose son bloc sur ce 2. L'arrière attaque alors le défenseur du pivot (le 3), puis remet le ballon au pivot, qui s'engouffre dans l'espace laissé derrière le 2: c'est le \"bloc - remise au bloc\". L'origine du nom \"russe\" n'est expliquée par aucune source.",
        "À ne pas confondre avec le \"Bloc-roule\": là, le pivot bloque le flanc d'un 2 resté en place et roule si les défenseurs changent; ici, le bloc se pose en biais sur le 2 déjà sorti, et la passe va au bloqueur dans le dos de ce 2.",
        "Variantes: la fiche de base (1) et sa version où le demi-centre attire les centraux (2); les exercices \"écran russe 1 et 2\" et \"½ russe\" (3 à 5); la mise en place danoise et anglaise par une circulation de fixations (6); la lecture de J. Madinger quand le 2 ne sort pas (7). L'\"écran russe 2\" est décrit côté droit avec l'ailier comme bloqueur; il est montré ici côté gauche.",
      ],
      objectif: "Punir la sortie du 2 en servant le pivot dans l'espace qu'il laisse derrière lui.",
      pointsCles: [
        "Le bloc se pose de biais par rapport au but, sur le défenseur qui vient de sortir.",
        "L'arrière attaque vraiment le 3 pour l'empêcher de couvrir le pivot.",
        "La remise se fait en suspension ou à rebond, au-dessus ou sous les bras des défenseurs.",
        "Si le 3 ne couvre pas le passage de l'arrière, l'arrière tire lui-même.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Bloc russe (Dragør HK, trad. française, fiches f1542 et f1542a)',
          url: 'http://www.dragoerhb.dk/fransk/f1542.html',
          note: "\"ARG attaque sur 3D et remise la balle à PVT, qui peut utiliser l'espace derrière le 2D (bloc - remise au bloc)\".",
        },
        {
          titre: 'Russian screening (Dragør HK, version anglaise)',
          url: 'http://www.dragoerhb.dk/english/z1542.html',
          note: '"CR moves out and puts a screening on the defending R2, who normally will move out in order to try to stop the attacking LB."',
        },
        {
          titre: 'Building up to Russian screening (Dragør HK, z210)',
          url: 'http://www.dragoerhb.dk/english/z210.html',
          note: 'Circulation de fixations, puis "The ball is then passed to the screening pivot by using a jump shot pass or a bouncing pass" (variante 6).',
        },
        {
          titre: 'Écran russe 1, Écran russe 2, ½ russe; À propos des écrans (Dragør HK, f98, f101, f102, f82)',
          url: 'http://www.dragoerhb.dk/fransk/f98.html',
          note: "\"Le but de l'écran russe est pour PVT d'empêcher le défenseur de suivre l'attaquant. [...] Le bloc de PVT est posé de biais par rapport au GB.\"",
        },
        {
          titre: 'J. Madinger, Opening playing variants against various defense systems (DV Concept), chap. A2',
          url: 'https://www.litres.ru/book/jorg-madinger/opening-playing-variants-against-various-defense-systems-56996647/chitat-onlayn/',
          note: "Russian Screen à 2 contre 2: si le défenseur reste en arrière, tir de l'arrière; s'il sort, le pivot quitte l'écran, recule, reçoit et tire.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Bloc russe (fiche de base)',
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche et suit un peu sa passe.",
              courses: { ArG: [-6.4, 9.0], AiG: [-8.6, 2.4] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier lui rend le ballon. L'arrière change de direction et s'engage en oblique vers le centre; le 2 gauche sort pour le stopper.",
              courses: { ArG: [-4.8, 8.6] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "Le pivot sort et pose un bloc de biais sur le 2, monté sur l'arrière.",
              courses: { Piv: { vers: [-4.0, 7.1], via: [-2.0, 8.4], ecran: true } },
            },
            {
              texte: "L'arrière gauche attaque le 3 gauche, qui doit sortir, et remet au pivot. Celui-ci s'engouffre dans l'espace laissé derrière le 2.",
              courses: { ArG: [-2.8, 8.4], Piv: [-4.2, 6.3] },
              passe: ['ArG', 'Piv', 0.5],
              def: { G3: [-2.4, 7.5] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '2 - Le demi-centre attire les centraux (f1542a)',
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche et suit un peu sa passe.",
              courses: { ArG: [-6.4, 9.0], AiG: [-8.6, 2.4] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier lui rend le ballon. L'arrière s'engage en oblique vers le centre; le 2 gauche sort sur lui.",
              courses: { ArG: [-4.8, 8.6] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "Le pivot sort et pose un bloc de biais sur le 2.",
              courses: { Piv: { vers: [-4.0, 7.1], via: [-2.0, 8.4], ecran: true } },
            },
            {
              texte: "Cette fois, l'arrière donne au demi-centre, qui repart vers l'intérieur et attire les centraux.",
              courses: { DC: [-1.4, 8.8] },
              passe: ['ArG', 'DC', 0.15],
              def: { G3: [-1.6, 7.8], D3: [0.8, 7.4] },
            },
            {
              texte: "Le demi-centre remet au pivot, dans l'espace derrière le 2.",
              courses: { Piv: [-4.2, 6.3] },
              passe: ['DC', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Écran russe 1 (après une-deux avec le demi-centre)',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre.",
              courses: { DC: [-0.8, 9.8] },
              passe: ['ArG', 'DC', 0.05],
            },
            {
              texte: "Le demi-centre lui redonne aussitôt. L'arrière attaque le but; son défenseur, le 2, monte sur lui.",
              courses: { ArG: [-4.8, 8.6] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "Le pivot monte rapidement en diagonale et pose son bloc de biais sur ce défenseur.",
              courses: { Piv: { vers: [-4.0, 7.1], via: [-2.0, 8.4], ecran: true } },
            },
            {
              texte: "L'arrière fait un 1 contre 1 et un dribble court vers le centre, puis remet au pivot.",
              courses: { ArG: [-2.8, 8.4], Piv: [-4.2, 6.3] },
              passe: ['ArG', 'Piv', 0.5],
              def: { G3: [-2.4, 7.5] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "4 - Écran russe 2 (l'ailier bloque)",
          etapes: [
            {
              texte: "Montré côté gauche (la fiche le décrit côté droit). Le ballon va à l'ailier gauche.",
              courses: { AiG: [-8.8, 1.8] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier passe à l'arrière gauche, qui s'engage. Le 2 gauche sort sur lui.",
              courses: { ArG: [-4.8, 8.6] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "L'ailier enchaîne et pose un bloc sur le 2, en mouvement.",
              courses: { AiG: { vers: [-5.8, 7.0], ecran: true } },
              def: { G1: [-7.4, 2.6] },
            },
            {
              texte: "L'arrière fait un 1 contre 1 à l'extérieur du 2, que le bloc empêche de suivre. Le 1 sort sur lui.",
              courses: { ArG: { vers: [-7.0, 8.0], via: [-6.4, 9.2] } },
              def: { G1: [-7.4, 6.6] },
            },
            {
              texte: "L'arrière remet à l'ailier, qui pivote vers le but.",
              courses: { AiG: [-6.2, 5.6] },
              passe: ['ArG', 'AiG', 0.3],
              def: { G2: [-5.0, 6.9] },
            },
            { texte: "L'ailier tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '5 - ½ russe',
          etapes: [
            {
              texte: "Le ballon est à l'arrière gauche. Le pivot court poser son bloc sur le 2 gauche.",
              courses: { Piv: { vers: [-4.0, 6.0], via: [-1.8, 8.8], ecran: true } },
              def: { G2: [-4.9, 5.6] },
            },
            {
              texte: "L'arrière part en 1 contre 1 vers l'intérieur, en dribble. Le 3 gauche sort sur lui.",
              courses: { ArG: { vers: [-2.8, 8.2], via: [-4.6, 8.4] } },
              def: { G3: [-2.4, 7.3] },
            },
            {
              texte: "L'arrière passe au pivot, qui se libère dans le dos du 3.",
              courses: { Piv: [-3.2, 6.3] },
              passe: ['ArG', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '6 - Mise en place par une circulation (z210)',
          etapes: [
            {
              texte: "Après une circulation de fixations de droite à gauche (ailier droit, arrière droit, demi-centre), le ballon arrive à l'arrière gauche. Il fixe et passe à l'ailier gauche. Le pivot suit le ballon.",
              courses: { ArG: [-5.6, 8.8], AiG: [-8.4, 2.8], Piv: [-0.6, 6.4] },
              passe: ['ArG', 'AiG', 0.3],
              def: { G2: [-5.0, 5.8], G1: [-7.5, 2.6] },
            },
            {
              texte: "L'ailier fixe à son tour et redonne à l'arrière gauche, qui menace de tirer face au 2. Le 2 sort.",
              courses: { ArG: [-4.8, 8.6] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "Le pivot sort et pose un écran sur le 2.",
              courses: { Piv: { vers: [-4.0, 7.1], via: [-2.2, 8.4], ecran: true } },
            },
            {
              texte: "L'arrière prend un dribble et attaque le défenseur du pivot, le 3 gauche. Il remet au pivot, qui roule derrière le 2 (passe en suspension ou à rebond).",
              courses: { ArG: [-2.8, 8.4], Piv: [-4.2, 6.3] },
              passe: ['ArG', 'Piv', 0.5],
              def: { G3: [-2.4, 7.5] },
            },
            {
              texte: "Le pivot tire. (Si le 3 ne couvre pas le passage de l'arrière, l'arrière tire lui-même.)",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: "7 - Le 2 reste en arrière: tir de l'arrière (Madinger)",
          etapes: [
            {
              texte: "Le pivot part du point des 7 m, fait un pas chassé et pose l'écran à l'intérieur du 2 gauche.",
              courses: { Piv: { vers: [-4.0, 6.0], via: [-1.8, 8.8], ecran: true } },
              def: { G2: [-4.9, 5.6] },
            },
            {
              texte: "L'arrière gauche passe l'écran et rentre vers l'intérieur. Le 2 reste en arrière, gêné par l'écran.",
              courses: { ArG: { vers: [-3.0, 8.6], via: [-4.8, 8.8] } },
              def: { G3: [-2.0, 7.0] },
            },
            {
              texte: "L'arrière tire en suspension. (Si le 2 sort, le pivot quitte l'écran, recule, reçoit et tire: c'est la variante 1.)",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'pivot-dans-le-dos',
      nom: 'Démarquage du pivot dans le dos du défenseur sorti',
      alias: 'Streg bagom ryg (f1277), Indspil til streg (f427), Stregryk bag back (f776), Stregovergang (f420) (DA); CR behind the back (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière fait sortir son défenseur, le 2; le pivot glisse dans son dos et reçoit une passe derrière lui.",
      description: [
        "Famille de fiches de Dragør HK (W. Fog-Hansen) autour d'une même idée: l'arrière s'engage pour faire monter le 2, puis attaque vers l'intérieur. Le pivot glisse dans l'espace que le 2 laisse derrière lui et reçoit.",
        "Les fiches varient sur la préparation: 1 contre 1 vers l'intérieur (f437), double fixation extérieur-intérieur (f1277), croisé leurre du demi-centre et dribble vers la droite (f427), passe à l'ailier puis retour (f776), bloc de l'ailier et pivot qui arrive en course (f420).",
        'Pour la fiche f1277, le titre ("PVT derrière arrière") et les noms danois et anglais désignent le pivot, mais le texte français fait courir le demi-centre: la fiche suit le titre. La variante 6 reprend deux exercices (f774/f775) dont les joueurs sont notés A, B, C sans poste: les rôles sont déduits.',
      ],
      objectif: "Servir le pivot dans l'espace créé par la sortie du 2.",
      pointsCles: [
        "L'arrière doit vraiment faire sortir le 2 avant d'attaquer vers l'intérieur.",
        "Le pivot part au moment où le 2 monte, pas avant.",
        'La passe va dans le dos du 2, souvent derrière le passeur ("passe dans le dos").',
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Démarquage du pivot dans le dos (Dragør HK, f437)',
          url: 'http://www.dragoerhb.dk/fransk/f437.html',
          note: '"Le pivot glisse rapidement derrière D2 et reçoit la balle de ARG qui lui fait une passe derrière."',
        },
        {
          titre: 'PVT derrière Arrière (Dragør HK, f1277)',
          url: 'http://www.dragoerhb.dk/fransk/f1277.html',
          note: '"au même moment DC passe derrière 2D et réceptionne la passe de ARG (passe dans le dos)" (titre danois: Streg bagom ryg).',
        },
        {
          titre: 'Passe au PVT (Dragør HK, f427)',
          url: 'http://www.dragoerhb.dk/fransk/f427.html',
          note: 'Croisé leurre DC/ARD; le pivot se dégage dans la direction opposée, dans le dos du 2.',
        },
        {
          titre: 'Démarquage du pivot dans le dos / en course (Dragør HK, f776 et f420)',
          url: 'http://www.dragoerhb.dk/fransk/f776.html',
          note: "f776: le pivot se démarque dans l'espace vide; f420 (http://www.dragoerhb.dk/fransk/f420.html): bloc de l'ailier, pivot qui arrive du centre.",
        },
        {
          titre: 'Démarquage du pivot derrière un arrière / derrière les arrières (Dragør HK, f775 et f774)',
          url: 'http://www.dragoerhb.dk/fransk/f775.html',
          note: "\"A s'engage sur E qui monte le bloquer; balle à B qui induit une course externe sur l'ailier de défense et passe à C arrivant en course.\"",
        },
      ],
      depart: { Piv: [-3.0, 6.3] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - 1 contre 1 vers l'intérieur (f437)",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche, en course vers le but. Le 2 gauche monte pour le neutraliser.",
              courses: { ArG: [-4.8, 8.6] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "L'arrière joue un 1 contre 1 vers l'intérieur; le 3 gauche vient l'aider. Le pivot glisse vite derrière le 2.",
              courses: { ArG: [-3.0, 8.4], Piv: { vers: [-4.6, 6.3], via: [-3.6, 5.9] } },
              def: { G3: [-2.4, 7.5], G2: [-4.4, 7.4] },
            },
            {
              texte: "L'arrière lui fait une passe derrière lui, dans le dos du 2.",
              passe: ['ArG', 'Piv', 0.2],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '2 - Fixation extérieur puis intérieur (f1277)',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche, qui s'engage vers le 2 pour le faire monter.",
              courses: { ArG: [-4.8, 8.8] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "L'arrière fixe le 2 à l'extérieur, puis à l'intérieur, et pique vers le centre. Au même moment, le pivot passe derrière le 2.",
              courses: { ArG: { vers: [-3.0, 8.4], via: [-5.6, 8.4] }, Piv: { vers: [-5.4, 6.4], via: [-4.0, 5.8] } },
              def: { G2: [-4.3, 7.4], G3: [-2.4, 7.5] },
            },
            {
              texte: "L'arrière lui donne le ballon par une passe dans le dos.",
              passe: ['ArG', 'Piv', 0.15],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Après un croisé leurre (f427)',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche, puis croise sans ballon avec l'arrière droit: c'est un croisé leurre.",
              courses: { DC: [2.6, 9.0], ArD: { vers: [0.6, 10.2], via: [4.0, 10.8] } },
              passe: ['DC', 'ArG', 0.05],
            },
            {
              texte: "L'arrière gauche s'engage et feinte un tir. Le 2 sort.",
              courses: { ArG: [-4.8, 8.6] },
              def: { G2: [-4.9, 7.4] },
            },
            {
              texte: "Il dribble vers la droite de la défense, qui glisse avec lui. Le pivot part dans la direction opposée, dans le dos du 2.",
              courses: { ArG: [-1.8, 8.6], Piv: [-5.2, 6.2] },
              def: { G2: [-3.8, 7.0], G3: [-1.6, 7.6], D3: [1.4, 7.0] },
            },
            {
              texte: "L'arrière gauche lui donne le ballon.",
              passe: ['ArG', 'Piv', 0.15],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "4 - Après une passe à l'ailier (f776)",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-5.4, 9.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche, qui s'engage vers l'extérieur.",
              courses: { AiG: [-8.6, 3.0] },
              passe: ['ArG', 'AiG', 0.1],
              def: { G1: [-7.6, 2.6] },
            },
            {
              texte: "L'ailier rend le ballon à l'arrière, qui s'engage vers l'intérieur. Son défenseur, le 2, monte sur lui.",
              courses: { ArG: [-3.8, 8.4] },
              passe: ['AiG', 'ArG', 0.15],
              def: { G2: [-4.2, 7.5] },
            },
            {
              texte: "Le pivot se démarque dans l'espace vide laissé par le 2 et reçoit.",
              courses: { Piv: [-4.8, 6.2] },
              passe: ['ArG', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "5 - Pivot en course, avec bloc de l'ailier (f420)",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-5.2, 9.0] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche. Le demi-centre part s'engager derrière l'arrière.",
              courses: { AiG: [-8.4, 2.8], DC: [-3.8, 10.8] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier rend à l'arrière, qui attire le 2 vers l'intérieur. L'ailier vient bloquer le 2 par l'extérieur; le demi-centre continue sa course derrière l'arrière.",
              courses: { ArG: [-3.6, 8.4], AiG: { vers: [-4.9, 6.7], ecran: true }, DC: [-6.0, 9.6] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.0, 7.3] },
            },
            {
              texte: "L'arrière donne au demi-centre en course, qui emmène son défenseur, le 1, vers l'extérieur. Le pivot arrive du centre, entre le bloc de l'ailier et le 1.",
              courses: { DC: [-6.6, 8.0], Piv: { vers: [-6.0, 5.4], via: [-4.6, 5.4] } },
              passe: ['ArG', 'DC', 0.2],
              def: { G1: [-7.4, 6.6] },
            },
            {
              texte: "Le demi-centre passe au pivot.",
              passe: ['DC', 'Piv', 0.1],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '6 - Pivot en course derrière les arrières (f775, rôles déduits)',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-5.2, 9.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche s'engage sur le 2, qui monte pour le bloquer.",
              courses: { ArG: [-4.8, 8.6] },
              def: { G2: [-4.9, 7.6] },
            },
            {
              texte: "Il donne à l'ailier gauche, qui fait une course vers l'extérieur pour attirer le 1.",
              courses: { AiG: [-8.4, 3.8] },
              passe: ['ArG', 'AiG', 0.15],
              def: { G1: [-7.6, 3.2] },
            },
            {
              texte: "Le pivot arrive en course dans le dos du 2 et reçoit de l'ailier.",
              courses: { Piv: { vers: [-5.2, 5.6], via: [-3.8, 5.8] } },
              passe: ['AiG', 'Piv', 0.5],
              def: { G2: [-5.0, 6.9] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-arriere-pivot',
      nom: 'Croisé arrière/pivot',
      alias: 'Back/Stregkryds (DA), Backcourt/CR cross (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière droit fixe fort le 3; le pivot sort, passe derrière lui, reçoit et tire entre le 2 et le 1 avant que le 2 se replace.",
      description: [
        "Fiche de Dragør HK (trad. N. Dennefeld), présentée comme une \"illustration de la théorie\" du croisé avec le pivot. L'arrière droit feinte d'abord sur le 2, puis fixe très dynamiquement le 3.",
        "Le pivot sort rapidement, passe derrière l'arrière, reçoit le ballon et tire dans l'intervalle entre le 2 et le 1, avant que le 2 n'ait le temps de se replacer.",
      ],
      objectif: "Profiter du recentrage du 2 pour lancer le pivot dans l'intervalle extérieur.",
      pointsCles: [
        "La fixation sur le 3 doit être très dynamique pour attirer le 2 vers le centre.",
        "Le pivot part vite et passe derrière l'arrière, comme dans un croisé.",
        "Le tir part avant que le 2 se replace.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé arrière/pivot (Dragør HK, trad. N. Dennefeld, f446)',
          url: 'http://www.dragoerhb.dk/fransk/f446.html',
          note: "\"Le Pivot sort rapidement, passe derrière ARD, reçoit la balle et tire dans l'intervalle 2G 1G\"",
        },
      ],
      depart: { Piv: [0.6, 6.4] },
      ballon: 'ArD',
      etapes: [
        {
          texte: "L'arrière droit feinte d'abord vers le 2 droit, qui sort.",
          courses: { ArD: [5.4, 8.6] },
          def: { D2: [5.2, 7.0] },
        },
        {
          texte: "Puis il fixe très fort le 3 droit, vers l'intérieur. Le 2 se recentre.",
          courses: { ArD: [2.4, 8.2] },
          def: { D3: [2.2, 7.3], D2: [4.4, 6.4] },
        },
        {
          texte: "Le pivot sort vite et passe derrière l'arrière droit, qui lui donne le ballon.",
          courses: { Piv: { vers: [4.4, 8.4], via: [1.0, 10.8] } },
          passe: ['ArD', 'Piv', 0.6],
        },
        {
          texte: "Le pivot tire dans l'intervalle entre le 2 et le 1 droits, avant que le 2 se replace.",
          courses: { Piv: [5.0, 7.4] },
          tir: { par: 'Piv', t: 0.5 },
          def: { D2: [4.2, 6.6], D1: [7.0, 3.2] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rentree-de-pivot',
      nom: 'Rentrée de pivot',
      alias: 'Stregovergang / Stregovergang 2 (DA), CR running in (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le pivot contourne la défense pour attaquer un intervalle extérieur (1), ou va bloquer le 2 opposé et sert l'arrière (2).",
      description: [
        "Deux fiches de Dragør HK. Rentrée de pivot 1 (f425): l'ailier droit fixe le 2 et redonne à l'arrière, qui attaque l'extérieur du 1; l'ailier se prépare à bloquer le 2 et le pivot, qui a contourné la défense, attaque l'intervalle entre le 2 et le 1.",
        "Rentrée de pivot 2 (f112): le demi-centre va écranter le 2 droit et reçoit pendant sa course; l'arrière droit feinte un croisé avec lui. Le demi-centre passe au pivot, qui se lance vers le 2 gauche, le bloque et sert l'arrière gauche. Si les 3 défendent sur l'arrière gauche, l'arrière droit ou le demi-centre sont servis.",
        "Le texte de la fiche 2 est bref: l'enchaînement des courses est reconstitué.",
      ],
      objectif: "Faire arriver le pivot lancé dans un intervalle extérieur, ou l'utiliser comme bloqueur mobile.",
      pointsCles: [
        "Le pivot contourne la défense en restant hors de la zone, puis attaque l'intervalle au bon moment.",
        "Dans la version 1, l'arrière fixe vraiment le 1 à l'extérieur pour ouvrir l'intervalle.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Rentrée de pivot (Dragør HK, f425)',
          url: 'http://www.dragoerhb.dk/fransk/f425.html',
          note: "Le PVT contourne la défense, attaque l'intervalle 2G-1G, reçoit de ARD et tire.",
        },
        {
          titre: 'Rentrée de pivot 2 (Dragør HK, f112)',
          url: 'http://www.dragoerhb.dk/fransk/f112.html',
          note: "DC écrante 2G; ARD feinte un croisé; le PVT se lance vers 2D, le bloque et passe à ARG qui tire.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Le pivot attaque l'intervalle 2-1 (f425)",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              courses: { ArD: [5.2, 9.0] },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit passe à l'ailier droit, qui attaque vers le 2 droit pour le fixer.",
              courses: { AiD: [7.0, 5.2] },
              passe: ['ArD', 'AiD', 0.2],
              def: { D2: [5.6, 5.8], D1: [7.8, 3.8] },
            },
            {
              texte: "L'ailier fixe le 2 et redonne à l'arrière droit, qui se lance derrière lui.",
              courses: { AiD: [6.6, 5.6], ArD: { vers: [7.6, 7.4], via: [6.8, 8.8] } },
              passe: ['AiD', 'ArD', 0.5],
              def: { D2: [5.7, 6.1] },
            },
            {
              texte: "L'arrière attaque l'extérieur du 1 droit. L'ailier se prépare à bloquer le 2. Le pivot contourne la défense.",
              courses: { ArD: [9.2, 5.6], AiD: { vers: [6.0, 5.2], ecran: true }, Piv: { vers: [5.6, 7.8], via: [2.6, 8.6] } },
              def: { D1: [8.8, 4.6], D2: [5.2, 5.8] },
            },
            {
              texte: "Le pivot attaque l'intervalle entre le 2 et le 1. L'arrière droit lui donne le ballon.",
              courses: { Piv: [7.3, 4.6] },
              passe: ['ArD', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '2 - Le pivot bloque le 2 opposé (f112)',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-5.2, 9.2] },
              passe: ['DC', 'ArG', 0.05],
            },
            {
              texte: "Le demi-centre part écranter le 2 droit; l'arrière gauche lui rend le ballon pendant sa course. L'arrière droit feinte un croisé avec lui.",
              courses: { DC: [3.4, 8.6], ArD: { vers: [2.0, 10.2], via: [4.6, 10.8] } },
              passe: ['ArG', 'DC', 0.3],
            },
            {
              texte: "Le demi-centre pose son écran sur le 2 droit et passe au pivot.",
              courses: { DC: { vers: [4.4, 7.0], ecran: true }, Piv: [-0.6, 6.8] },
              passe: ['DC', 'Piv', 0.3],
              def: { D2: [5.0, 6.2], D3: [1.8, 7.0] },
            },
            {
              texte: "Le pivot se lance vers le 2 gauche, le bloque et donne à l'arrière gauche.",
              courses: { Piv: { vers: [-3.9, 6.6], via: [-2.2, 8.2], ecran: true }, ArG: [-5.4, 8.4] },
              passe: ['Piv', 'ArG', 0.6],
              def: { G2: [-4.7, 6.0] },
            },
            {
              texte: "L'arrière gauche tire. (Si les 3 sortent sur lui, il sert l'arrière droit ou le demi-centre.)",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-pivot-chinoise',
      nom: 'Croisé avec le pivot "à la chinoise"',
      alias: 'Kinesisk stregkryds (DA), Chinese CR cross (EN)',
      categorie: 'Combinaisons à nom de pays',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le demi-centre donne au pivot sorti derrière lui et prend sa place au pivot; le pivot, devenu arrière, croise avec l'arrière droit.",
      description: [
        "Fiche de Dragør HK. Le pivot part à l'extérieur du 3 gauche. Le demi-centre donne à l'arrière droit, qui lui rend le ballon; le demi-centre se lance droit sur le centre. Le pivot passe rapidement derrière lui et reçoit, et le demi-centre \"se place lui-même en position de pivot, effectuant un bloc sur 3D\" (le 3 gauche).",
        "Le pivot, devenu arrière, attaque la droite de la défense. L'arrière droit croise derrière lui, reçoit et attaque l'intervalle entre le bloc du demi-centre et le 2 gauche. Le nom (\"chinoise\") n'est pas expliqué par la source.",
      ],
      objectif: "Échanger les rôles du demi-centre et du pivot pour ouvrir l'intervalle entre le 3 et le 2.",
      pointsCles: [
        "Le demi-centre attaque vraiment le centre avant de donner.",
        "Le demi-centre bloque le 3 dès qu'il a passé.",
        "L'arrière droit arrive lancé derrière le pivot devenu arrière.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé avec le pivot à la chinoise (Dragør HK, f1110)',
          url: 'http://www.dragoerhb.dk/fransk/f1110.html',
          note: '"DC passe au pivot et se place lui-même en position de pivot, effectuant un bloc sur 3D."',
        },
      ],
      depart: { Piv: [-3.2, 6.4] },
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre donne à l'arrière droit. Le pivot est à l'extérieur du 3 gauche.",
          courses: { ArD: [5.0, 9.0] },
          passe: ['DC', 'ArD', 0.1],
        },
        {
          texte: "L'arrière droit rend au demi-centre, qui se lance droit sur le centre. Les deux 3 se resserrent.",
          courses: { DC: [0, 8.8] },
          passe: ['ArD', 'DC', 0.1],
          def: { G3: [-1.2, 7.2], D3: [1.2, 7.2] },
        },
        {
          texte: "Le pivot passe rapidement derrière le demi-centre et reçoit. Le demi-centre prend la place du pivot et bloque le 3 gauche. L'arrière droit se lance vers la gauche.",
          courses: {
            Piv: { vers: [-0.6, 10.0], via: [-2.6, 9.8] },
            DC: { vers: [-2.1, 7.3], ecran: true },
            ArD: [3.6, 10.2],
          },
          passe: ['DC', 'Piv', 0.25],
        },
        {
          texte: "Le pivot, devenu arrière, attaque la droite de la défense. L'arrière droit croise derrière lui et reçoit.",
          courses: { Piv: [1.6, 8.8], ArD: { vers: [-1.4, 9.4], via: [2.0, 10.6] } },
          passe: ['Piv', 'ArD', 0.55],
          def: { D3: [1.8, 7.8] },
        },
        {
          texte: "L'arrière droit attaque l'intervalle entre le bloc du demi-centre et le 2 gauche, et tire.",
          courses: { ArD: [-3.4, 8.0] },
          tir: { par: 'ArD', t: 0.5 },
          def: { G2: [-4.4, 6.6] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'renversement-pivot-arriere',
      nom: "Renversement du pivot sur l'arrière",
      alias: 'Streg overgang med back (DA), CR running over with backcourt (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le pivot sort, reçoit en allant vers la droite, saute comme pour tirer et renvoie en arrière à l'arrière gauche, libéré par le bloc de l'ailier droit rentré.",
      description: [
        "Fiche de Dragør HK. L'ailier droit commence une rentrée qui le mène jusqu'au 2 gauche, du côté opposé, pour le bloquer. Le jeu part vers la droite: le demi-centre se lance, le pivot sort et se lance aussi vers la droite.",
        "Le demi-centre donne au pivot, qui continue vers le 2 droit et saute comme pour tirer. En l'air, il se retourne et passe en arrière à l'arrière gauche, lancé, qui tire grâce au bloc de l'ailier.",
      ],
      objectif: "Attirer la défense d'un côté, puis renverser vers un arrière lancé derrière un bloc préparé.",
      pointsCles: [
        "La rentrée de l'ailier droit commence tôt: il doit être en place quand le ballon revient.",
        "Le saut du pivot doit menacer vraiment le but pour fixer la défense.",
        "L'arrière gauche prend son élan pour arriver lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Renversement du pivot sur l'arrière (Dragør HK, f156)",
          url: 'http://www.dragoerhb.dk/fransk/f156.html',
          note: "Le PVT continue vers 2G et saute comme pour tirer, se retourne en l'air et passe en arrière à ARG lancé, qui tire grâce au bloc de ALD.",
        },
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche. L'ailier droit commence sa rentrée vers le côté opposé.",
          courses: { AiD: [6.6, 4.8] },
          passe: ['AiG', 'ArG', 0.1],
          def: { D1: [7.6, 2.6] },
        },
        {
          texte: "L'arrière gauche donne au demi-centre, qui se lance vers la droite. Le pivot sort et se lance aussi vers la droite. L'ailier droit continue sa rentrée le long des 6 m.",
          courses: { DC: [2.0, 9.0], Piv: [2.6, 7.8], AiD: { vers: [0.3, 6.4], via: [3.4, 7.0] } },
          passe: ['ArG', 'DC', 0.15],
          def: { D2: [4.8, 5.8] },
        },
        {
          texte: "Le demi-centre donne au pivot, qui continue vers le 2 droit et saute comme pour tirer. L'ailier droit arrive et bloque le 2 gauche. L'arrière gauche recule pour prendre son élan.",
          courses: { Piv: [4.0, 8.0], AiD: { vers: [-4.0, 5.9], via: [-1.8, 6.1], ecran: true }, ArG: [-5.8, 10.0] },
          passe: ['DC', 'Piv', 0.1],
          def: { D2: [4.4, 6.9], D3: [2.6, 7.2], G3: [-1.0, 7.2], G2: [-4.9, 5.5] },
        },
        {
          texte: "En l'air, le pivot se retourne et passe en arrière à l'arrière gauche, lancé.",
          courses: { ArG: [-3.4, 8.4] },
          passe: ['Piv', 'ArG', 0.2],
        },
        {
          texte: "Le 2 gauche est bloqué par l'ailier droit: l'arrière gauche tire.",
          tir: 'ArG',
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'deux-pivots-dragor',
      nom: 'Jeu à deux pivots (Dragør)',
      alias: "Spil med 2 strege, Tværsvariation - dobbeltstreg, Stregovergang - dobbeltstreg, Rundgang dobbelt streg (DA); Entrée d'ailier sur du jeu à 2 pivots à l'opposé",
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Quatre fiches danoises de jeu à deux pivots: second pivot dans le dos du 2, jeu à l'opposé, pivot en course, pivot qui contourne son partenaire.",
      description: [
        "Fiches de Dragør HK (W. Fog-Hansen) sur le jeu avec deux pivots. Dans la première (f211), le demi-centre joue second pivot au centre et se démarque dans le dos du 2 quand celui-ci sort sur l'arrière; autre fin: il bloque le 1 pour un tir de l'ailier.",
        "Jeu à l'opposé (f205, f204): l'ailier gauche entre et devient second pivot, puis le jeu part à l'opposé, vers l'arrière droit qui attaque à l'extérieur, avec un bloc oblique du pivot. Si le 2 sort, l'arrière droit peut servir le pivot (f204). Pivot en course (f208): l'arrière gauche reçoit en se déplaçant vers l'extérieur et sert directement le pivot qui arrive à l'extérieur.",
        "Démarquage d'un pivot (f1509): après un croisé arrière droit / ailier droit qui attire le 2, le pivot le plus éloigné contourne le 3 et l'autre pivot. Les textes des fiches f204 à f209 sont allusifs (schémas nécessaires): les variantes 2 et 3 sont reconstituées, notamment le choix du joueur qui finit en variante 3.",
      ],
      objectif: "Utiliser deux joueurs au contact de la défense pour créer des espaces dans le dos des défenseurs qui sortent.",
      pointsCles: [
        "Le second pivot part quand son défenseur sort, pas avant.",
        "Le bloc du pivot côté ballon est oblique.",
        "Une passe longue à l'opposé fait glisser la défense et attire le 2.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Jeu à deux PVT (Dragør HK, f211)',
          url: 'http://www.dragoerhb.dk/fransk/f211.html',
          note: "ARG feinte un tir sur le 2; si ça marche, balle à ALG qui donne tout de suite au second pivot démarqué derrière le 2.",
        },
        {
          titre: "Jeu à l'opposé - deux PVT 1 et 2; Pivot en course - deux pivots 1 et 2 (Dragør HK, f205, f204, f208, f209)",
          url: 'http://www.dragoerhb.dk/fransk/f205.html',
          note: "Le bloc du PVT côté droit doit être oblique; la passe à l'opposé d'ARG attire mieux le 2. Textes allusifs.",
        },
        {
          titre: "Démarquage d'un pivot - jeu à deux pivots (Dragør HK, f1509)",
          url: 'http://www.dragoerhb.dk/fransk/f1509.html',
          note: "Le pivot le plus éloigné contourne 3G et l'autre pivot, reçoit de ALD et tire.",
        },
        {
          titre: '16 combinaisons en fiches animées (Handball Gardéen)',
          url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349',
          note: "Liste \"Entrée d'ailier sur du jeu à 2 pivots à l'opposé\" vers fiche f205.",
        },
      ],
      depart: { Piv: [2.9, 6.4] },
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Le demi-centre en second pivot (f211)',
          etapes: [
            {
              texte: "Le demi-centre joue en second pivot, au centre. Après une circulation de droite à gauche, le ballon est à l'arrière gauche.",
              courses: { DC: [-0.4, 6.4] },
            },
            {
              texte: "L'arrière gauche feinte un tir sur le 2 gauche pour le faire sortir. Le 3 gauche vient aider.",
              courses: { ArG: [-4.8, 8.6] },
              def: { G2: [-4.9, 7.6], G3: [-2.2, 7.2] },
            },
            {
              texte: "Le 2 est sorti: l'arrière donne à l'ailier gauche. Le demi-centre se démarque dans le dos du 2.",
              courses: { AiG: [-8.6, 2.4], DC: { vers: [-4.2, 6.1], via: [-2.6, 6.2] } },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier donne tout de suite au demi-centre. (Autre fin: le demi-centre bloque le 1 pour un tir de l'ailier.)",
              passe: ['AiG', 'DC', 0.05],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "2 - Entrée d'ailier et jeu à l'opposé (f205)",
          etapes: [
            {
              texte: "L'arrière gauche donne à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.4] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier rend le ballon et démarre son entrée: il devient le second pivot, côté gauche.",
              courses: { AiG: { vers: [-3.4, 6.4], via: [-6.0, 5.6] } },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.9, 5.8] },
            },
            {
              texte: "L'arrière gauche fait une passe à l'opposé, directement à l'arrière droit: la défense doit glisser.",
              courses: { ArD: [5.4, 9.0] },
              passe: ['ArG', 'ArD', 0.15],
              def: { D2: [5.0, 6.2], D3: [2.2, 7.2] },
            },
            {
              texte: "L'arrière droit attaque à l'extérieur du 2 pour tirer. Le pivot pose un bloc oblique sur le 2.",
              courses: { ArD: [6.8, 8.2], Piv: { vers: [5.8, 7.0], ecran: true } },
              def: { D2: [5.0, 6.4], D1: [7.6, 4.0] },
            },
            {
              texte: "L'arrière droit tire. (Si le 2 sort sur lui, il sert le pivot; l'ailier rentré peut aussi être servi si son défenseur aide.)",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: "3 - Pivot en course à l'extérieur (f208)",
          etapes: [
            {
              texte: "L'arrière gauche donne à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.4] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier rend le ballon et entre: il devient le second pivot, côté gauche.",
              courses: { AiG: { vers: [-3.4, 6.4], via: [-6.0, 5.6] } },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.9, 5.8] },
            },
            {
              texte: "L'arrière gauche donne à l'arrière droit, qui fixe.",
              courses: { ArD: [5.0, 8.8] },
              passe: ['ArG', 'ArD', 0.15],
              def: { D2: [4.9, 6.6] },
            },
            {
              texte: "L'arrière droit renverse sur l'arrière gauche, qui reçoit en se déplaçant vers l'extérieur. Le 2 gauche sort sur lui; le pivot rentré repart en course vers l'extérieur.",
              courses: { ArG: [-6.6, 8.8], AiG: [-5.6, 5.6] },
              passe: ['ArD', 'ArG', 0.2],
              def: { G2: [-5.4, 7.2], G1: [-7.4, 3.0] },
            },
            {
              texte: "L'arrière gauche passe directement au pivot en course.",
              passe: ['ArG', 'AiG', 0.05],
            },
            { texte: 'Le pivot tire.', tir: 'AiG' },
          ],
        },
        {
          nom: '4 - Le pivot éloigné contourne son partenaire (f1509)',
          etapes: [
            {
              texte: "Le demi-centre joue en second pivot, au centre. L'arrière gauche donne à l'arrière droit, qui s'engage.",
              courses: { DC: [-0.4, 6.4], ArD: [4.6, 8.6] },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit poursuit vers l'extérieur et croise avec l'ailier droit, qu'il sert. Le 2 droit est attiré vers l'extérieur.",
              courses: { ArD: [7.2, 7.6], AiD: { vers: [5.6, 9.0], via: [8.4, 8.8] } },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [6.0, 6.4], D1: [7.6, 4.0] },
            },
            {
              texte: "Le pivot le plus éloigné, le demi-centre, contourne le 3 droit et l'autre pivot. L'ailier lui donne le ballon. (Autre fin: passe directe au pivot dès l'engagement de l'arrière droit.)",
              courses: { DC: { vers: [4.6, 6.0], via: [2.0, 9.0] } },
              passe: ['AiD', 'DC', 0.6],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'deux-pivots-entre-1-et-2',
      nom: 'Deux pivots entre les défenseurs 1 et 2',
      alias: 'Tactique de match 05; Missmatch (R. Brack)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6',
      resume: "Un pivot de chaque côté, entre le 1 et le 2: les arrières attirent les 2 vers le centre pour jouer un 3 contre 2 avec le pivot et l'ailier.",
      description: [
        "Tactique de match 05 (entrainement-handball.fr) contre une 0-6: deux pivots se placent entre le 1 et le 2, un de chaque côté, pour \"créer un surnombre dans la zone des pivots et jouer un 3 contre 2\". Les arrières se font des passes en attaquant en profondeur entre le 2 et le 3, pour attirer les 2 vers le centre. Si un 2 monte sur l'arrière, passe au pivot; si le 1 et le 2 couvrent l'arrière et le pivot, décalage de l'ailier; si la défense ne monte pas, tir à 7-8 m. Ici, le demi-centre joue le second pivot.",
        "Missmatch (Rolf Brack, cité sur un forum allemand): un pivot se place en permanence entre le 1 et le 2, car \"c'est là que jouent traditionnellement les joueurs un peu plus petits\"; il bloque l'ailier défensif et le jeu cherche le duel pivot / 1. Brack conseille aussi, à deux pivots, de jouer des une-deux avec le pivot qui sort, pour que l'autre pivot ait la place de passer dans le dos. Variante 2 reconstituée à partir de ce principe.",
      ],
      objectif: "Créer un 3 contre 2 (arrière, pivot, ailier) face au 2 et au 1.",
      pointsCles: [
        "Les arrières attaquent en profondeur entre le 2 et le 3, pour aspirer les 2 vers le centre.",
        "Le pivot reste entre le 1 et le 2, prêt à recevoir dans le dos du 2 qui monte.",
        "Contre une défense qui ne sort pas, tirer à 7-8 m.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Tactique de match 05: l'attaque d'une 0-6 avec 2 pivots (entrainement-handball.fr)",
          url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-lattaque-dune-0-6-avec-2-pivots/',
          note: '"Créer un surnombre dans la zone des Pivots pour jouer un 3 contre 2"',
        },
        {
          titre: 'Fil "4:2 Angriff" (forum handballecke.de, message d\'Alphatier)',
          url: 'https://www.handballecke.de/forum/thread/23373-4-2-angriff/',
          note: "Missmatch (R. Brack): pivot entre l'extérieur et le demi, \"dort ja traditionsgemäß die etwas kleineren Spieler stehen\".",
        },
      ],
      depart: { Piv: [-6.3, 4.4], DC: [6.3, 4.4] },
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Le 2 monte: passe au pivot (Tactique 05)',
          etapes: [
            {
              texte: "Les deux pivots sont entre le 1 et le 2 (le demi-centre joue le second). L'arrière gauche attaque en profondeur entre le 2 et le 3 gauches, pour attirer le 2 vers le centre.",
              courses: { ArG: [-3.4, 8.4] },
              def: { G2: [-4.0, 6.6], G3: [-2.4, 7.2] },
            },
            {
              texte: "Il donne à l'arrière droit, qui attaque à son tour entre le 3 et le 2 droits. Le 2 droit monte sur lui.",
              courses: { ArD: [3.4, 8.4], ArG: [-4.4, 9.4] },
              passe: ['ArG', 'ArD', 0.2],
              def: { D2: [4.0, 7.4], D3: [2.4, 7.2], G2: [-4.6, 5.6], G3: [-1.8, 6.8] },
            },
            {
              texte: "L'arrière droit passe au pivot de son côté, libéré dans le dos du 2. (Si le 1 et le 2 couvrent l'arrière et le pivot, il décale l'ailier.)",
              courses: { DC: [5.6, 5.2] },
              passe: ['ArD', 'DC', 0.3],
              def: { D1: [7.4, 3.2] },
            },
            { texte: 'Le pivot tire.', tir: 'DC' },
          ],
        },
        {
          nom: '2 - Missmatch: duel du pivot contre le 1',
          etapes: [
            {
              texte: "Le pivot gauche bloque le 1, souvent plus petit. L'arrière gauche attaque entre le 2 et le 3 et attire le 2.",
              courses: { Piv: { vers: [-6.7, 3.9], ecran: true }, ArG: [-3.4, 8.4] },
              def: { G1: [-7.6, 3.2], G2: [-4.2, 6.8], G3: [-2.4, 7.3] },
            },
            {
              texte: "Le 2 aide au centre: l'arrière donne au pivot, en duel avec le 1.",
              passe: ['ArG', 'Piv', 0.3],
            },
            { texte: 'Le pivot se retourne et tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'umlaufen-der-sperre',
      nom: "Contournement de l'écran à deux pivots",
      alias: 'Umlaufen der Sperre im 2:4; 2:4 "enge Stellung" (DE)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6',
      resume: "À deux pivots: l'un bloque le 3, l'autre contourne l'écran de son partenaire et se place dans le dos du 2 attiré à l'extérieur.",
      description: [
        "Un \"classique\" de l'attaque à deux pivots, selon un message de forum allemand: les arrières attaquent très large pour attirer les 2 vers l'extérieur. Un pivot pose un écran sur le défenseur intérieur (le 3); l'autre pivot contourne l'écran de son partenaire et se place \"dans l'ombre\" du 2. On peut lancer l'action par un croisé entre un arrière et un ailier. Ici, le demi-centre joue le second pivot.",
        "Variante \"enge Stellung\" (position serrée, handballtraining.de): les deux pivots se placent du même côté et bloquent le 3 et le 2 pour libérer l'espace derrière le 3 qui sort; l'arrière qui fixe choisit entre six passes possibles, et si les écrans sont défaits, l'arrière opposé et les ailiers ont de l'espace. La fin montrée (passe au pivot qui roule derrière le 3) n'est qu'une de ces solutions.",
        "Les deux sources décrivent un principe en quelques lignes: les courses sont reconstituées.",
      ],
      objectif: "Libérer un pivot dans le dos d'un défenseur grâce à l'écran de l'autre pivot.",
      pointsCles: [
        "Les arrières attaquent large pour écarter les 2.",
        "Le pivot qui contourne passe au ras de l'écran de son partenaire.",
        "L'arrière garde plusieurs solutions de passe et lit la défense.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "4:2 Angriff (mit 2 Kreisläufern)", message d\'immerweiter (forum handballecke.de)',
          url: 'https://www.handballecke.de/forum/thread/24683-4-2-angriff-mit-2-kreisl%C3%A4ufern/',
          note: '"Ein Klassiker ist aber das Umlaufen der Sperre gegen IR bzw. IL."',
        },
        {
          titre: '24 Angriffsvarianten gegen 6:0-Abwehrreihen (handballtraining.de)',
          url: 'https://handballtraining.de/ruckraumspieler/24-angriff-varianten-gegen-60-abwehrreihen/1194',
          note: '2:4 "enge Stellung": les deux pivots du même côté, six passes possibles pour l\'arrière qui fixe.',
        },
      ],
      depart: { DC: [-0.6, 6.4], Piv: [0.6, 6.4] },
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Le second pivot contourne l'écran",
          etapes: [
            {
              texte: "Le demi-centre joue en second pivot. Les deux arrières attaquent très large, à l'extérieur des 2, pour les attirer vers l'extérieur.",
              courses: { ArG: [-6.4, 8.4], ArD: [6.4, 8.4] },
              def: { G2: [-5.8, 6.8], D2: [5.8, 6.8] },
            },
            {
              texte: "Le pivot pose un écran sur le 3 gauche. Le demi-centre contourne l'écran de son partenaire et se place dans le dos du 2.",
              courses: { Piv: { vers: [-1.0, 7.3], ecran: true }, DC: { vers: [-3.8, 6.2], via: [-2.4, 9.4] } },
              def: { G3: [-1.7, 6.6] },
            },
            {
              texte: "L'arrière gauche donne au demi-centre.",
              passe: ['ArG', 'DC', 0.2],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '2 - Deux pivots du même côté (enge Stellung)',
          etapes: [
            {
              texte: "Les deux pivots se placent côté gauche: le demi-centre bloque le 2 gauche, le pivot se colle au 3 gauche, côté intérieur.",
              courses: { DC: { vers: [-4.0, 6.0], via: [-2.2, 8.8], ecran: true }, Piv: [-0.9, 7.2] },
              def: { G2: [-4.9, 5.6] },
            },
            {
              texte: "L'arrière gauche attaque le centre; le 3 gauche sort sur lui.",
              courses: { ArG: [-2.8, 8.6] },
              def: { G3: [-2.4, 7.6] },
            },
            {
              texte: "L'arrière donne au pivot, qui roule dans l'espace laissé derrière le 3. (C'est une des six passes possibles.)",
              courses: { Piv: [-2.0, 6.4] },
              passe: ['ArG', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-dc-bloc-passe-pivot',
      nom: 'Entrée du DC pour faire un bloc - passe au pivot',
      alias: 'Midtovergang til screening - stregindspilning (DA), Center running in to screening - CR pass (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le demi-centre entre bloquer le 1; l'ailier gauche arrive en demi-cercle derrière l'arrière et sert le pivot, placé derrière le 2.",
      description: [
        "Fiche de Dragør HK. Le demi-centre donne à l'arrière gauche, qui s'engage sur le défenseur du pivot. Le demi-centre fonce devant l'arrière pour bloquer le défenseur de l'ailier (le 1). L'ailier gauche court en demi-cercle derrière l'arrière, reçoit et attaque à son tour le défenseur du pivot.",
        "Le pivot se place derrière le défenseur de l'arrière (le 2), reçoit et tire. Autre fin: l'ailier prend l'intervalle ouvert par le déplacement du pivot. Le placement de départ du pivot (près du 3 gauche) est déduit du texte.",
      ],
      objectif: "Libérer le pivot derrière le 2 grâce à l'entrée du demi-centre et à la course de l'ailier.",
      pointsCles: [
        "Le demi-centre passe devant l'arrière, entre lui et la défense.",
        "L'ailier arrive lancé, derrière l'arrière.",
        "Le pivot attend que le 2 soit fixé pour se placer dans son dos.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Entrée du DC pour faire un bloc - passe au pivot (Dragør HK, f872)',
          url: 'http://www.dragoerhb.dk/fransk/f872.html',
          note: "ALG court en demi-cercle derrière ARG, reçoit et attaque le défenseur du PVT; le PVT se place derrière le défenseur de ARG, reçoit et tire.",
        },
      ],
      depart: { Piv: [-3.0, 6.3] },
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Passe au pivot',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche, qui s'engage sur le défenseur du pivot, le 3 gauche.",
              courses: { ArG: [-3.4, 8.8] },
              passe: ['DC', 'ArG', 0.1],
              def: { G3: [-2.8, 7.8], G2: [-4.6, 6.4] },
            },
            {
              texte: "Le demi-centre fonce devant l'arrière et va bloquer le défenseur de l'ailier, le 1. L'ailier gauche court en demi-cercle derrière l'arrière.",
              courses: {
                DC: { vers: [-6.8, 4.0], via: [-6.0, 8.6], ecran: true },
                AiG: { vers: [-2.4, 9.8], via: [-8.0, 11.0] },
              },
              def: { G1: [-7.6, 3.4] },
            },
            {
              texte: "L'arrière donne à l'ailier, qui attaque le 3. Le pivot se place derrière le 2.",
              courses: { AiG: [-2.2, 8.6], Piv: { vers: [-5.2, 5.6], via: [-4.2, 5.6] } },
              passe: ['ArG', 'AiG', 0.1],
              def: { G3: [-2.2, 7.6], G2: [-4.4, 6.8] },
            },
            {
              texte: "L'ailier passe au pivot.",
              passe: ['AiG', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - L'ailier prend l'intervalle",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche, qui s'engage sur le défenseur du pivot, le 3 gauche.",
              courses: { ArG: [-3.4, 8.8] },
              passe: ['DC', 'ArG', 0.1],
              def: { G3: [-2.8, 7.8], G2: [-4.6, 6.4] },
            },
            {
              texte: "Le demi-centre fonce devant l'arrière et va bloquer le 1. L'ailier gauche court en demi-cercle derrière l'arrière.",
              courses: {
                DC: { vers: [-6.8, 4.0], via: [-6.0, 8.6], ecran: true },
                AiG: { vers: [-2.4, 9.8], via: [-8.0, 11.0] },
              },
              def: { G1: [-7.6, 3.4] },
            },
            {
              texte: "L'arrière donne à l'ailier. Le pivot se déplace derrière le 2; le 3 le suit.",
              courses: { AiG: [-2.2, 8.6], Piv: { vers: [-5.2, 5.6], via: [-4.2, 5.6] } },
              passe: ['ArG', 'AiG', 0.1],
              def: { G3: [-3.0, 7.2], G2: [-4.4, 6.8] },
            },
            {
              texte: "L'ailier prend l'intervalle ouvert par le déplacement du pivot et tire.",
              courses: { AiG: [-1.6, 7.6] },
              tir: { par: 'AiG', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'bloc-pivot-entree-ailier',
      nom: "Bloc du pivot et entrée d'ailier (ARD/ARG)",
      alias: 'Back/Back med stregscreening og fløjindløb (DA), LB/RB with CR screening and wing running in (EN)',
      categorie: 'Écrans et blocs',
      defense: 'Arrières défensifs agressifs (schéma en 0-6)',
      resume: "Le ballon passe d'un arrière à l'autre; le 2 monte sur l'arrière gauche, le pivot bloque le 1 et l'ailier gauche contourne le bloc pour tirer.",
      description: [
        "Fiche de Dragør HK. Le demi-centre donne à l'arrière droit engagé, puis entre fixer la défense centrale. L'arrière droit donne à l'arrière gauche en course; le 2 gauche monte sur lui. Le pivot se démarque et bloque le 1; l'ailier gauche contourne le bloc, reçoit de l'arrière gauche et tire.",
        "Si les arrières défensifs montent tôt, l'arrière gauche passe à l'ailier en volée, et l'ailier s'engage plus tôt (variante 2).",
      ],
      objectif: "Punir la montée du 2 en libérant l'ailier derrière le bloc du pivot sur le 1.",
      pointsCles: [
        "L'entrée du demi-centre fixe les centraux, qui ne peuvent pas aider.",
        "Le pivot bloque le 1 au moment où le 2 monte sur l'arrière.",
        "L'ailier contourne le bloc au plus près.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "ARD/ARG avec bloc du PVT et entrée d'ailier (Dragør HK, f1541)",
          url: 'http://www.dragoerhb.dk/fransk/f1541.html',
          note: "2D monte sur ARG; le PVT se démarque et bloque 1D; ALG contourne le bloc, reçoit de ARG et tire. Si les arrières défensifs montent tôt: passe en volée.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Bloc sur le 1, tir de l'ailier",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière droit, qui s'engage.",
              courses: { ArD: [4.6, 8.6] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [4.8, 6.4] },
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, en course. Le demi-centre entre fixer la défense centrale.",
              courses: { ArG: [-4.6, 8.6], DC: [-0.6, 7.6] },
              passe: ['ArD', 'ArG', 0.2],
              def: { G3: [-1.6, 7.0], D2: [5.0, 5.4] },
            },
            {
              texte: "Le 2 gauche monte sur l'arrière. Le pivot se démarque et va bloquer le 1.",
              courses: { Piv: { vers: [-6.4, 4.2], via: [-3.4, 6.4], ecran: true } },
              def: { G2: [-4.8, 7.6], G1: [-7.2, 3.4] },
            },
            {
              texte: "L'ailier gauche contourne le bloc; l'arrière lui donne le ballon.",
              courses: { AiG: { vers: [-5.4, 6.4], via: [-8.4, 6.2] } },
              passe: ['ArG', 'AiG', 0.6],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Le 2 monte tôt: passe en volée',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière droit, qui s'engage.",
              courses: { ArD: [4.6, 8.6] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [4.8, 6.4] },
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche. Le 2 gauche monte tôt sur lui: le pivot file bloquer le 1 et l'ailier s'engage plus tôt. Le demi-centre entre au centre.",
              courses: {
                ArG: [-4.6, 8.6],
                DC: [-0.6, 7.6],
                Piv: { vers: [-6.4, 4.2], via: [-3.4, 6.4], ecran: true },
                AiG: [-8.0, 5.0],
              },
              passe: ['ArD', 'ArG', 0.2],
              def: { G2: [-4.8, 7.6], G3: [-1.6, 7.0], G1: [-7.2, 3.4] },
            },
            {
              texte: "L'arrière gauche passe aussitôt à l'ailier, en volée, pendant qu'il contourne le bloc.",
              courses: { AiG: [-5.4, 6.4] },
              passe: ['ArG', 'AiG', 0.05],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'demarquage-pivot-bloc-ailier',
      nom: "Démarquage du pivot sur bloc de l'ailier",
      alias: 'Stregoverløb (DA), CR running over (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière droit part vers l'aile, l'ailier droit entre bloquer le 2 et le pivot contourne ce bloc pour recevoir.",
      description: [
        "Fiche de Dragør HK. Le demi-centre donne à l'arrière droit, en course vers l'aile. L'ailier droit entre et bloque le 2 droit. Le pivot contourne le bloc de l'ailier, reçoit de l'arrière droit et tire.",
        "Le côté du bloc (extérieur du 2) et le placement du 1, attiré par l'arrière, sont déduits du déroulement.",
      ],
      objectif: "Libérer le pivot entre le 2 bloqué et le 1 attiré par l'arrière.",
      pointsCles: [
        "L'arrière part franchement vers l'aile pour attirer le 1.",
        "Le pivot part quand le bloc est posé, et le contourne au plus près.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Démarquage du PVT (Dragør HK, f1540)',
          url: 'http://www.dragoerhb.dk/fransk/f1540.html',
          note: "DC vers ARD en course vers l'aile; ALD entre et bloque 2G; le PVT contourne le bloc de ALD, reçoit de ARD et tire.",
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre donne à l'arrière droit, en course vers l'aile. L'ailier droit entre et bloque le 2 droit par l'extérieur; le 1 sort sur l'arrière.",
          courses: { ArD: [7.2, 7.8], AiD: { vers: [6.0, 5.4], ecran: true } },
          passe: ['DC', 'ArD', 0.1],
          def: { D2: [5.2, 5.8], D1: [7.6, 6.8] },
        },
        {
          texte: "Le pivot contourne le bloc de l'ailier; l'arrière droit lui donne le ballon.",
          courses: { Piv: { vers: [6.8, 4.6], via: [5.0, 7.6] } },
          passe: ['ArD', 'Piv', 0.6],
        },
        { texte: 'Le pivot tire.', tir: 'Piv' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'double-demarquage-pivot',
      nom: 'Double démarquage du pivot',
      alias: 'Dobbelt stregryk (DA), Double CR rush (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le pivot se démarque une première fois à l'extérieur, puis une seconde fois devant la défense, où il reçoit après un faux croisé.",
      description: [
        "Fiche de Dragør HK. Le pivot se démarque à l'extérieur et reçoit de l'arrière gauche; il peut contourner pour tirer, ou passer à l'ailier gauche. L'ailier donne au demi-centre, engagé vers l'arrière droit.",
        "L'arrière droit fait mine de croiser derrière le demi-centre, mais le ballon va au pivot, qui s'est démarqué une seconde fois (\"a redoublé\") devant la défense, et qui tire. Le texte est bref: les placements sont reconstitués.",
      ],
      objectif: "Surprendre la défense par un second démarquage du pivot, masqué par une feinte de croisé.",
      pointsCles: [
        "Le premier démarquage doit être une vraie menace (tir possible).",
        "Le faux croisé de l'arrière droit attire les centraux.",
        "Le pivot se replace devant la défense pendant la circulation.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Double démarquage du pivot (Dragør HK, f1115)',
          url: 'http://www.dragoerhb.dk/fransk/f1115.html',
          note: 'ARD fait mine de croiser mais la balle va au PVT qui a "redoublé" devant la défense; PVT tire.',
        },
      ],
      depart: { Piv: [-3.0, 6.3] },
      ballon: 'ArG',
      etapes: [
        {
          texte: "Le pivot se démarque à l'extérieur et reçoit de l'arrière gauche. Le 2 gauche le suit.",
          courses: { Piv: [-5.0, 7.4] },
          passe: ['ArG', 'Piv', 0.5],
          def: { G2: [-5.1, 6.4] },
        },
        {
          texte: "Il pourrait contourner pour tirer; ici, il passe à l'ailier gauche.",
          courses: { AiG: [-8.6, 2.6] },
          passe: ['Piv', 'AiG', 0.1],
        },
        {
          texte: "L'ailier donne au demi-centre, engagé vers l'arrière droit. Le pivot se démarque une seconde fois, devant la défense, vers le centre.",
          courses: { DC: [1.8, 9.0], Piv: { vers: [-0.2, 7.8], via: [-3.0, 8.2] } },
          passe: ['AiG', 'DC', 0.3],
          def: { G2: [-4.9, 5.6] },
        },
        {
          texte: "L'arrière droit fait mine de croiser derrière le demi-centre, mais celui-ci donne au pivot.",
          courses: { ArD: { vers: [0.6, 10.0], via: [3.6, 10.6] }, DC: [2.4, 8.6] },
          passe: ['DC', 'Piv', 0.5],
          def: { D3: [1.6, 7.0] },
        },
        { texte: 'Le pivot tire.', tir: 'Piv' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'demarquage-pivot-oppose',
      nom: "Démarquage du pivot à l'opposé du sens de jeu",
      alias: 'Stregrundgang modsat spilleretningen 1 / 2 (DA), CR rounding opposite playing direction (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le ballon part à droite et revient aussitôt à l'arrière gauche; le pivot, parti à l'opposé, contourne le 2 et bloque pour l'ailier gauche.",
      description: [
        "Fiches de Dragør HK. L'arrière gauche donne au demi-centre, qui court vers la droite et passe à l'arrière droit. Celui-ci rend aussitôt à l'arrière gauche, engagé à l'intérieur du 2. Le pivot se démarque à l'extérieur, contourne le 2 et pose un bloc; l'arrière gauche passe à l'ailier gauche.",
        "Version 1: l'ailier tire à droite ou à gauche du 1, ou s'engage à l'extérieur et sert le pivot bloqueur. Version 2: en plus, l'arrière droit s'engage en diagonale vers l'intervalle entre le 1 et le 2 gauches après sa passe; l'ailier peut le servir. Le défenseur bloqué (le 1) est déduit du texte.",
      ],
      objectif: "Jouer à l'opposé du sens de circulation pendant que la défense glisse vers la droite.",
      pointsCles: [
        "La passe de l'arrière droit revient tout de suite: la défense n'a pas fini de glisser.",
        "Le pivot part dans le sens opposé au ballon.",
        "L'ailier lit le 1: tir d'un côté ou de l'autre, ou passe au pivot.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Démarquage du PVT à l'opposé du sens de jeu 1 et 2 (Dragør HK, f166 et f166a)",
          url: 'http://www.dragoerhb.dk/fransk/f166.html',
          note: "ARD rend aussitôt à ARG engagé à l'intérieur de 2D; le PVT se démarque à l'extérieur, contourne 2D et pose un bloc; ARG passe à ALG. f166a: ARD s'engage en diagonale dans 1D-2D.",
        },
      ],
      depart: { Piv: [-3.0, 6.3] },
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'ailier gauche",
          etapes: [
            {
              texte: "L'arrière gauche donne au demi-centre, qui court vers la droite.",
              courses: { DC: [2.4, 9.4] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit. L'arrière gauche s'engage à l'intérieur du 2; la défense glisse vers la droite.",
              courses: { ArD: [5.0, 9.0], ArG: [-4.0, 8.4] },
              passe: ['DC', 'ArD', 0.3],
              def: { G2: [-4.6, 7.2], G3: [-1.2, 6.9], D3: [2.2, 6.9] },
            },
            {
              texte: "L'arrière droit rend aussitôt à l'arrière gauche. Le pivot se démarque à l'extérieur, contourne le 2 et pose un bloc sur le 1.",
              courses: { Piv: { vers: [-6.4, 4.0], via: [-5.0, 5.6], ecran: true } },
              passe: ['ArD', 'ArG', 0.05],
              def: { G1: [-7.2, 3.0] },
            },
            {
              texte: "L'arrière gauche passe à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.6] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier tire à droite ou à gauche du 1. (Ou il s'engage à l'extérieur et sert le pivot bloqueur.)",
              tir: 'AiG',
            },
          ],
        },
        {
          nom: "2 - L'arrière droit arrive en diagonale",
          etapes: [
            {
              texte: "L'arrière gauche donne au demi-centre, qui court vers la droite.",
              courses: { DC: [2.4, 9.4] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit. L'arrière gauche s'engage à l'intérieur du 2; la défense glisse vers la droite.",
              courses: { ArD: [5.0, 9.0], ArG: [-4.0, 8.4] },
              passe: ['DC', 'ArD', 0.3],
              def: { G2: [-4.6, 7.2], G3: [-1.2, 6.9], D3: [2.2, 6.9] },
            },
            {
              texte: "L'arrière droit rend aussitôt à l'arrière gauche et part en diagonale vers la gauche. Le pivot contourne le 2 et bloque le 1.",
              courses: { Piv: { vers: [-6.4, 4.0], via: [-5.0, 5.6], ecran: true }, ArD: [0.4, 9.0] },
              passe: ['ArD', 'ArG', 0.05],
              def: { G1: [-7.2, 3.0] },
            },
            {
              texte: "L'arrière gauche passe à l'ailier gauche et recule. L'arrière droit poursuit sa diagonale.",
              courses: { AiG: [-8.6, 2.6], ArG: [-4.8, 9.6], ArD: [-2.6, 8.8] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'arrière droit s'engage dans l'intervalle entre le 1 et le 2 gauches; l'ailier le sert.",
              courses: { ArD: [-5.6, 6.8] },
              passe: ['AiG', 'ArD', 0.5],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'bloc-pour-une-entree',
      nom: 'Bloc pour une entrée',
      alias: 'Blokade for overgang (DA), Blocking for running in (EN)',
      categorie: 'Écrans et blocs',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière gauche bloque le 2 et passe au demi-centre; l'ailier gauche entre derrière ce bloc et reçoit du demi-centre, pendant que le pivot bloque le 3.",
      description: [
        "Fiche de Dragør HK. L'ailier gauche passe à l'arrière gauche, qui s'engage vite, bloque le 2 gauche et passe au demi-centre. L'ailier fait son entrée derrière l'écran de l'arrière. Le demi-centre s'engage vers la droite et passe à l'ailier en course, pendant que le pivot bloque le 3 gauche.",
        "La fiche ne précise pas la fin: l'ailier, lancé entre les deux blocs, va au tir.",
      ],
      objectif: "Ouvrir un couloir à l'ailier entre deux blocs, sur le 2 et sur le 3.",
      pointsCles: [
        "L'arrière s'engage vite pour bloquer le 2 avant qu'il ne sorte.",
        "L'ailier entre derrière l'écran, pas devant.",
        "Le demi-centre attire la défense vers la droite avant de passer.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Bloc pour une entrée (Dragør HK, f113)',
          url: 'http://www.dragoerhb.dk/fransk/f113.html',
          note: "ARG s'engage vite, bloque 2D et passe au DC; ALG fait son entrée derrière l'écran de ARG; DC passe à ALG en course; PVT bloque 3D.",
        },
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche.",
          courses: { ArG: [-5.2, 9.0] },
          passe: ['AiG', 'ArG', 0.1],
        },
        {
          texte: "L'arrière gauche s'engage vite, bloque le 2 gauche et passe au demi-centre. L'ailier commence son entrée.",
          courses: { ArG: { vers: [-4.4, 6.8], ecran: true }, AiG: [-7.4, 5.2] },
          passe: ['ArG', 'DC', 0.2],
          def: { G2: [-5.0, 6.0] },
        },
        {
          texte: "L'ailier entre derrière l'écran de l'arrière. Le demi-centre s'engage vers la droite et lui donne le ballon en course. Le pivot bloque le 3 gauche.",
          courses: {
            AiG: { vers: [-2.8, 8.2], via: [-5.6, 8.8] },
            DC: [1.6, 9.2],
            Piv: { vers: [-0.9, 7.1], ecran: true },
          },
          passe: ['DC', 'AiG', 0.6],
          def: { D3: [2.0, 7.4] },
        },
        {
          texte: "L'ailier attaque entre le 2 et le 3, tous deux bloqués, et tire.",
          courses: { AiG: [-2.9, 7.4] },
          tir: { par: 'AiG', t: 0.5 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'porte',
      nom: 'Porte',
      alias: "Blocs au centre pour une entrée d'arrière; Midt screener for backindløb (f117), Dobbeltscreening (f202) (DA)",
      categorie: 'Écrans et blocs',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le demi-centre et le pivot bloquent les deux 3 vers l'extérieur; après un croisé avec l'arrière droit, l'arrière gauche tire entre les deux blocs, dans la \"porte\".",
      description: [
        "Fiche \"Blocs au centre pour une entrée d'arrière\" de Dragør HK (f117). L'ailier gauche fixe entre le 1 et le 2; le ballon circule ailier - arrière gauche - demi-centre - arrière gauche. L'arrière droit s'engage en diagonale et reçoit de l'arrière gauche, qui croise avec lui. Le demi-centre est entré bloquer le 3 droit et le pivot bloque le 3 gauche: l'arrière gauche \"tire entre les deux blocs (porte)\".",
        "Une autre fiche française s'intitule \"Porte\" (f202; en danois \"Dobbeltscreening\", double écran). Son texte se limite à: 1 contre 1 et tir en suspension, l'arrière gauche devant accélérer avant de recevoir de l'arrière droit. La variante 2 l'interprète avec le double écran de la variante 1.",
      ],
      objectif: "Ouvrir le centre de la défense par deux blocs simultanés sur les 3.",
      pointsCles: [
        "Les deux blocs se posent en même temps, chacun sur un 3, vers l'extérieur.",
        "L'arrière gauche arrive lancé dans la porte grâce au croisé.",
        "L'arrière droit doit aussi empêcher le 2 de revenir aider.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Blocs au centre pour une entrée d'arrière (Dragør HK, f117)",
          url: 'http://www.dragoerhb.dk/fransk/f117.html',
          note: '"ARG tire entre les deux blocs (porte)"',
        },
        {
          titre: 'Porte (Dragør HK, f202)',
          url: 'http://www.dragoerhb.dk/fransk/f202.html',
          note: "1 contre 1 et tir en suspension; ARG doit accélérer avant de recevoir de ARD (détail sur le schéma).",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: '1 - Croisé et tir dans la porte (f117)',
          etapes: [
            {
              texte: "L'ailier gauche fixe entre le 1 et le 2, puis passe à l'arrière gauche.",
              courses: { AiG: [-7.0, 4.6] },
              passe: ['AiG', 'ArG', 0.6],
              def: { G1: [-7.2, 3.4], G2: [-5.4, 5.4] },
            },
            {
              texte: "L'arrière gauche donne au demi-centre.",
              courses: { DC: [0, 9.8] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre rend à l'arrière gauche, puis entre bloquer le 3 droit. Le pivot bloque le 3 gauche.",
              courses: { DC: { vers: [0.9, 7.2], ecran: true }, Piv: { vers: [-0.9, 7.2], ecran: true } },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière droit s'engage en diagonale et reçoit de l'arrière gauche.",
              courses: { ArD: [2.0, 9.2] },
              passe: ['ArG', 'ArD', 0.2],
            },
            {
              texte: "L'arrière gauche croise avec lui: il passe derrière et reçoit.",
              courses: { ArD: [-1.4, 8.8], ArG: { vers: [0.4, 9.4], via: [-2.0, 10.6] } },
              passe: ['ArD', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche tire entre les deux blocs: c'est la porte.",
              courses: { ArG: [0.0, 8.2] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Double écran, l'arrière gauche accélère (f202)",
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche. Le demi-centre entre bloquer le 3 droit et le pivot bloque le 3 gauche.",
              courses: { DC: { vers: [0.9, 7.2], ecran: true }, Piv: { vers: [-0.9, 7.2], ecran: true } },
              passe: ['AiG', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche donne à l'arrière droit et recule pour prendre son élan.",
              courses: { ArG: [-3.6, 10.6] },
              passe: ['ArG', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit joue un 1 contre 1 vers le centre. L'arrière gauche accélère avant de recevoir.",
              courses: { ArD: [2.6, 8.4], ArG: [-0.4, 9.2] },
              passe: ['ArD', 'ArG', 0.6],
              def: { D2: [4.2, 6.6] },
            },
            {
              texte: "L'arrière gauche tire en suspension, au-dessus du double écran.",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-arriere-double-ecran',
      nom: "Entrée d'arrière après un double écran",
      alias: 'Backindløb efter dobbeltscreening (DA), Backcourt running in after double screening (EN)',
      categorie: 'Écrans et blocs',
      defense: '5-1 (central avancé)',
      dispositif: '5-1',
      resume: "Le demi-centre fixe le 2, le pivot bloque l'avancé; l'arrière gauche passe le bloc vers le centre, échange avec l'arrière droit et choisit la fin.",
      description: [
        "Fiche de Dragør HK, prévue contre une défense dont un central est avancé. L'ailier gauche passe à l'arrière gauche (ou le demi-centre renverse sur lui), puis le demi-centre fixe le 2 gauche. L'avancé monte; le pivot le bloque. L'arrière gauche dépasse le bloc et passe à l'arrière droit, qui lui remet le ballon.",
        "Trois fins: l'arrière gauche tire ou prend l'intervalle (1); le demi-centre, démarqué à la zone, est servi (2); l'arrière droit attaque l'intervalle à l'extérieur du 2 droit (3). Les courses sont reconstituées à partir d'un texte court (confiance moyenne).",
      ],
      objectif: "Neutraliser l'avancé par un bloc et faire entrer l'arrière lancé au centre.",
      pointsCles: [
        "Le bloc du pivot se pose quand l'avancé monte sur l'arrière.",
        "L'arrière passe au ras du bloc pour ne pas laisser l'avancé revenir.",
        "La remise de l'arrière droit est immédiate: l'arrière gauche reçoit lancé.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Entrée d'arrière après un double écran (Dragør HK, f118, f118a, f118b)",
          url: 'http://www.dragoerhb.dk/fransk/f118.html',
          note: "3D monte; le PVT bloque le défenseur avancé; ARG dépasse le bloc et passe à ARD qui lui remet. Fins: tir ou intervalle; DC démarqué à la zone; ARD à l'extérieur de 2G.",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche. Le demi-centre part fixer le 2 gauche.",
              courses: { ArG: [-5.2, 9.2], DC: [-3.8, 7.0] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.4, 6.2] },
            },
            {
              texte: "L'avancé monte sur l'arrière. Le pivot sort et le bloque.",
              courses: { Piv: { vers: [-2.0, 8.2], ecran: true } },
              def: { D3: [-2.6, 9.0] },
            },
            {
              texte: "L'arrière gauche dépasse le bloc vers le centre et donne à l'arrière droit.",
              courses: { ArG: { vers: [-0.6, 9.6], via: [-3.0, 10.6] }, ArD: [4.6, 9.0] },
              passe: ['ArG', 'ArD', 0.7],
            },
            {
              texte: "L'arrière droit lui remet aussitôt le ballon.",
              courses: { ArG: [0.2, 8.8] },
              passe: ['ArD', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche prend l'intervalle et tire.",
              courses: { ArG: [0.4, 7.8] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G3: [-0.6, 7.0] },
            },
          ],
        },
        {
          nom: '2 - Le demi-centre démarqué à la zone',
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche. Le demi-centre part fixer le 2 gauche.",
              courses: { ArG: [-5.2, 9.2], DC: [-3.8, 7.0] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.4, 6.2] },
            },
            {
              texte: "L'avancé monte sur l'arrière. Le pivot sort et le bloque.",
              courses: { Piv: { vers: [-2.0, 8.2], ecran: true } },
              def: { D3: [-2.6, 9.0] },
            },
            {
              texte: "L'arrière gauche dépasse le bloc vers le centre et donne à l'arrière droit.",
              courses: { ArG: { vers: [-0.6, 9.6], via: [-3.0, 10.6] }, ArD: [4.6, 9.0] },
              passe: ['ArG', 'ArD', 0.7],
            },
            {
              texte: "L'arrière droit lui remet aussitôt le ballon. Le 3 sort sur l'arrière gauche; le demi-centre se démarque à la zone.",
              courses: { ArG: [0.2, 8.8], DC: [-2.4, 6.4] },
              passe: ['ArD', 'ArG', 0.1],
              def: { G3: [-0.2, 7.6] },
            },
            {
              texte: "L'arrière gauche sert le demi-centre.",
              passe: ['ArG', 'DC', 0.2],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "3 - L'arrière droit attaque à l'extérieur du 2",
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche. Le demi-centre part fixer le 2 gauche.",
              courses: { ArG: [-5.2, 9.2], DC: [-3.8, 7.0] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.4, 6.2] },
            },
            {
              texte: "L'avancé monte sur l'arrière. Le pivot sort et le bloque.",
              courses: { Piv: { vers: [-2.0, 8.2], ecran: true } },
              def: { D3: [-2.6, 9.0] },
            },
            {
              texte: "L'arrière gauche dépasse le bloc vers le centre et donne à l'arrière droit.",
              courses: { ArG: { vers: [-0.6, 9.6], via: [-3.0, 10.6] }, ArD: [4.6, 9.0] },
              passe: ['ArG', 'ArD', 0.7],
            },
            {
              texte: "L'arrière droit lui remet le ballon. La défense se resserre sur l'arrière gauche.",
              courses: { ArG: [0.2, 8.8] },
              passe: ['ArD', 'ArG', 0.1],
              def: { G3: [-0.2, 7.6], D2: [3.8, 6.4] },
            },
            {
              texte: "L'arrière gauche rend à l'arrière droit, qui attaque l'intervalle à l'extérieur du 2 droit.",
              courses: { ArD: [6.2, 7.6] },
              passe: ['ArG', 'ArD', 0.2],
              def: { D2: [5.0, 6.6], D1: [7.6, 4.2] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },
  );
})();
