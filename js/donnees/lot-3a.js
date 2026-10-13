/* Lot 3a: ailiers - entrées et traversées d'ailiers, croisés d'ailier (Dragør HK, FFHB, sources allemandes et tchèques). */
(() => {
  // Placement d'une défense étagée 3-2-1 (pour les variantes jouées contre une défense offensive).
  const DEF_321 = { G1: [-7.0, 2.6], G2: [-4.4, 7.6], G3: [-0.8, 6.6], D3: [0, 9.4], D2: [4.4, 7.6], D1: [7.0, 2.6] };

  /* ---------------- Entrée de l'ailier à l'opposé du ballon ---------------- */
  // Anim'hand (FFHB): jouée ici avec l'ailière droite, le ballon étant côté gauche.
  const ANIM_BASE = [
    {
      texte: "Le ballon est côté gauche. Le pivot se place entre le 1 et le 2 droits, du côté de l'ailière droite; il peut bloquer le 1 pour l'aider à partir.",
      courses: { Piv: { vers: [6.4, 4.6], via: [5.0, 7.6] } },
    },
    {
      texte: "L'ailière droite part dans le dos des défenseurs, qui ont les yeux sur le ballon. L'arrière gauche s'engage sans ballon.",
      courses: { AiD: { vers: [4.3, 5.9], via: [8.2, 4.4] }, ArG: [-4.4, 8.3], AiG: [-8.6, 2.0] },
    },
    {
      texte: "L'ailier gauche donne à l'arrière gauche, lancé. L'ailière continue le long des 6 m; si elle est en avance, elle freine sur le 3 droit.",
      courses: { AiD: [2.4, 7.4], ArG: [-4.2, 8.0] },
      passe: ['AiG', 'ArG', 0.3],
      def: { G2: [-4.9, 6.0], D3: [1.5, 6.7] },
    },
    {
      texte: "L'ailière enchaîne sur le 2 gauche: avec l'arrière, elle joue à 2 contre lui, le 3 bas la prenant en retard. Le pivot passe entre le 2 et le 3 droits; le demi-centre compense à droite et l'arrière droit glisse à l'aile.",
      courses: {
        AiD: { vers: [-3.6, 6.1], via: [-0.4, 7.6] },
        Piv: [3.0, 6.4],
        DC: [4.6, 9.6],
        ArD: { vers: [8.8, 1.8], via: [8.4, 7.0] },
      },
      def: { G2: [-4.7, 6.0], G3: [-2.4, 6.9], D3: [0.9, 6.9], D2: [4.0, 5.8] },
    },
  ];

  const ONESTA_BASE = [
    {
      texte: "Contre une défense étagée et agressive (ici 3-2-1). L'arrière gauche vient de donner à son ailier, qui lui rend le ballon; l'arrière écarte vers l'extérieur pour libérer l'espace intérieur. L'ailier droit rentre dans le temps de cette passe de retour.",
      courses: {
        ArG: [-6.8, 9.0],
        AiD: { vers: [6.6, 4.4], via: [8.6, 3.6] },
        Piv: [-2.4, 6.4],
      },
      passe: ['AiG', 'ArG', 0.3],
      def: { ...DEF_321, G2: [-5.2, 7.8] },
    },
  ];

  /* ---------------- Traversée de l'ailier et bloc ---------------- */
  const TRAV_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche, qui s'engage vers le 2 gauche. L'ailier part aussitôt vers le côté opposé.",
      courses: { ArG: [-4.6, 8.4], AiG: { vers: [-6.8, 4.0], via: [-8.6, 3.4] } },
      passe: ['AiG', 'ArG', 0],
      def: { G2: [-4.9, 5.8] },
    },
  ];
  const TRAV_CENTRE = {
    texte: "L'arrière gauche donne au demi-centre. L'ailier traverse devant la défense.",
    courses: { DC: [0.4, 9.6], AiG: { vers: [0.8, 7.6], via: [-3.4, 8.4] } },
    passe: ['ArG', 'DC', 0.3],
  };
  // "Entrée et bloc" (f886), jouée ici côté gauche (la fiche la montre côté droit).
  const F886_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche, qui attaque à l'extérieur du 2 gauche. L'ailier part vers le côté opposé.",
      courses: { ArG: [-6.2, 8.2], AiG: { vers: [-6.8, 4.0], via: [-8.6, 3.4] } },
      passe: ['AiG', 'ArG', 0],
      def: { G2: [-5.4, 5.8] },
    },
    {
      texte: "L'arrière gauche donne au demi-centre, qui attaque à son tour à l'extérieur du 3 gauche. L'ailier traverse; l'arrière droit emmène le 2 droit vers l'extérieur, sans ballon.",
      courses: { DC: [-2.6, 8.6], AiG: { vers: [0.6, 7.8], via: [-3.6, 8.8] }, ArD: [7.0, 8.6] },
      passe: ['ArG', 'DC', 0.3],
      def: { G3: [-2.2, 7.2], D2: [5.8, 5.6] },
    },
    {
      texte: "L'ailier pose un bloc sur le 2 droit. L'arrière droit revient à l'intérieur et reçoit du demi-centre.",
      courses: {
        AiG: { vers: [4.9, 6.3], via: [2.8, 7.8], ecran: true },
        ArD: { vers: [3.6, 8.2], via: [6.0, 9.4] },
      },
      passe: ['DC', 'ArD', 0.5],
      def: { D2: [5.7, 5.7], D3: [2.0, 7.0] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-oppose-balle',
      nom: "Entrée de l'ailier à l'opposé du ballon",
      alias: "Rentrée de l'ailier opposé; Einläufer / Einlaufen gegen den Ball, Außen gegen (DE); Záběh křídla (CZ)",
      categorie: 'Ailiers',
      defense: 'Toutes (variantes contre 3-2-1 et défense étagée)',
      resume: "L'ailier du côté opposé au ballon rentre le long des 6 m, dans le dos des défenseurs qui regardent le ballon, et crée un surnombre côté ballon.",
      description: [
        "Pendant que le ballon circule d'un côté, l'ailier opposé quitte son aile et court le long des 6 m, dans le dos des défenseurs. Il arrive côté ballon au moment où l'arrière de ce côté s'engage: l'attaque joue alors à deux (arrière et ailier rentré) contre le défenseur 2.",
        "La fiche FFHB Anim'hand (J.-P. Thomas, 2000) en donne le modèle: l'ailière joue selon le 2 (écran s'il reste bas, bloc s'il est étagé, appui s'il est très étagé); le pivot, le demi-centre et l'arrière opposé compensent pour préparer un renversement vers le côté dégarni. Contre une défense étagée 5-1, l'avancé gêne la passe entre l'arrière et le demi-centre.",
        "Les autres variantes viennent d'autres écoles: contre une 3-2-1, l'ailier droit part dès la première passe et se cache derrière le demi opposé (handballtraining.de); en République tchèque, l'ailier rentre jusqu'entre le 2 et le 3 opposés pour libérer l'ailier qui n'est pas rentré; Claude Onesta et Pascal Nouet la font jouer dans le temps du retour de passe ailier vers arrière contre une défense agressive; \"Außen gegen\" vient du livre de Heiner Brand. Les variantes 6 et 7 sont des résumés courts (forum, fiche animée): le détail des placements est déduit.",
        "Voir aussi la fiche \"Rentrée d'ailier\" (rentrée du côté du ballon).",
      ],
      objectif: "Créer un surnombre côté ballon, ou un renversement vers le côté que la défense a dégarni.",
      pointsCles: [
        "Partir quand les défenseurs ont les yeux sur le ballon, et courir vite, au ras de la zone sans y entrer.",
        "Arriver au moment où l'arrière s'engage: en avance, freiner sur le 3.",
        "L'arrière s'engage sans ballon pour recevoir lancé.",
        "Le pivot et l'arrière opposé compensent pour garder un renversement possible.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée de l'ailière à l'opposé de la balle (Anim'hand n°60, FFHB, via Bogny Handball)",
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/connaissance8.pdf',
          note: "\"par le départ de l'ailière dans le dos des défenseurs qui ont les yeux braqués sur la balle\"; lecture du n°2, compensations et renversement.",
        },
        {
          titre: 'Das Einlaufen als angriffstaktisches Mittel (handballtraining.de)',
          url: 'https://handballtraining.de/taktik/das-einlaufen-als-angriffstaktisches-mittel/369',
          note: 'Contre 3-2-1: dès la première passe LA vers RL, RA court "im Rücken der Abwehr mit hohem Tempo am Kreis entlang".',
        },
        {
          titre: 'Kubišová, Porovnání útočných herních kombinací na signál (Univ. Charles, Prague, 2020), p. 29',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: "Záběh křídla: \"l'ailier court le long de la défense et finit sa course du côté opposé\"; prépare souvent le tir de l'ailier opposé.",
        },
        {
          titre: "Recherche d'attaque d'une défense étagée agressive (Approches du Handball n°70, Onesta / Nouet)",
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb70_attaque.pdf',
          note: "\"Rentrée de l'AL opposé dans le temps de retour de passe AL vers AR\"; 3 contre 2 avec prise de bloc sur le n°2 étagé.",
        },
        {
          titre: 'Wie knackt man eine 3:2:1-Deckung? (forum handballecke.de, post #4)',
          url: 'https://www.handballecke.de/forum/thread/20846-wie-knackt-man-eine-3-2-1-deckung/',
          note: "Einläufer/Nachläufer mit Ball: LA passe puis court derrière le demi opposé; le pivot tient le central à distance par un écran.",
        },
        {
          titre: 'Übergang: Außen gegen (handballhaus.de, archive web)',
          url: 'http://www.handballhaus.de/handball/angriffstaktik/uebergang/',
          note: "D'après Heiner Brand: RM passe à RR, le pivot bloque un demi, LA passe dans le dos de la défense et est brièvement servable au centre.",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Anim'hand: tir de l'arrière côté ballon",
          etapes: [
            ...ANIM_BASE,
            {
              texte: "Le 2 gauche est resté bas: l'ailière lui pose un écran et l'arrière gauche tire par-dessus.",
              courses: { AiD: { vers: [-4.3, 6.2], ecran: true }, ArG: [-3.7, 7.9] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G2: [-4.9, 5.5], G3: [-2.6, 7.0] },
            },
          ],
        },
        {
          nom: "2 - Anim'hand: renversement",
          etapes: [
            ...ANIM_BASE,
            {
              texte: "La défense a flotté vers le ballon. L'arrière gauche renverse sur le demi-centre, qui a compensé à droite; le pivot bloque dans son dos le 3 droit, qui revient.",
              courses: { DC: [3.8, 8.4], Piv: { vers: [2.4, 6.6], ecran: true } },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [1.5, 7.1], D2: [4.2, 6.6] },
            },
            {
              texte: "Le demi-centre attaque l'intervalle entre le 2 et le 3 droits et tire.",
              courses: { DC: [3.2, 7.6] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: '3 - Einlaufen gegen den Ball (contre 3-2-1)',
          etapes: [
            {
              texte: "Contre une 3-2-1. L'ailier gauche met la pression sur le 2 gauche (demi avancé), le fait reculer, puis passe à l'arrière gauche. Le pivot pousse le central vers l'intérieur.",
              courses: { AiG: [-7.6, 4.0], ArG: [-5.0, 9.2], Piv: [0.6, 7.2] },
              passe: ['AiG', 'ArG', 0.6],
              def: { ...DEF_321, G2: [-4.8, 6.9], G3: [-0.5, 7.2] },
            },
            {
              texte: "Dès cette première passe, l'ailier droit quitte son aile et court très vite le long des 6 m, dans le dos de la défense.",
              courses: { AiD: { vers: [2.6, 6.3], via: [6.6, 5.8] }, ArG: [-4.4, 8.8] },
            },
            {
              texte: "Il continue derrière le central jusqu'à se trouver dans le dos du 2 gauche. L'arrière gauche attaque l'intervalle entre le 2 et le 3 gauches.",
              courses: { AiD: { vers: [-3.4, 6.3], via: [-0.4, 6.2] }, ArG: [-3.0, 8.2] },
              def: { G2: [-4.3, 7.4], G3: [-1.0, 7.4] },
            },
            {
              texte: "Si le timing est bon, le rentrant a un temps d'avance sur le demi: l'arrière gauche le sert. Autres fins: passe au pivot, ou l'arrière droit élargit seul contre l'ailier défensif.",
              passe: ['ArG', 'AiD', 0.15],
              def: { G2: [-4.0, 6.9] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "4 - Záběh křídla: tir de l'ailier opposé",
          etapes: [
            {
              texte: "L'ailier gauche passe à son arrière.",
              courses: { AiG: [-8.0, 3.6] },
              passe: ['AiG', 'ArG', 0],
            },
            {
              texte: "Il court le long de la défense. L'arrière gauche attaque et donne au demi-centre.",
              courses: { AiG: { vers: [-0.9, 7.6], via: [-5.6, 8.4] }, ArG: [-4.8, 8.6] },
              passe: ['ArG', 'DC', 0.5],
              def: { G2: [-4.9, 5.8] },
            },
            {
              texte: "L'ailier termine sa course du côté opposé, entre le 3 et le 2 droits: la défense perd sa cohésion. Le demi-centre attaque le centre et donne à l'arrière droit.",
              courses: { AiG: { vers: [3.3, 6.4], via: [1.4, 7.9] }, DC: [0.2, 8.4], ArD: [4.8, 8.6] },
              passe: ['DC', 'ArD', 0.6],
              def: { D3: [1.9, 6.7], G3: [-1.0, 7.3], D2: [5.0, 5.4] },
            },
            {
              texte: "L'arrière droit attaque à son tour: le 2 droit doit choisir entre lui et l'ailier rentré, le 1 droit vient aider. L'arrière donne à l'ailier droit, resté écarté.",
              courses: { ArD: [5.6, 7.8], AiD: [8.8, 1.8] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [5.4, 6.4], D1: [6.8, 3.6] },
            },
            { texte: "L'ailier droit, qui n'est pas rentré, tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '5 - Onesta / Nouet: prise de bloc sur le 2 étagé',
          etapes: [
            ...ONESTA_BASE,
            {
              texte: "L'arrière gauche donne au demi-centre. L'ailier droit arrive dans le secteur central au moment où le ballon est au demi-centre.",
              courses: { DC: [-0.4, 10.6], AiD: { vers: [0.4, 6.2], via: [3.4, 6.8] } },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-0.2, 9.6] },
            },
            {
              texte: "Le demi-centre rend à l'arrière gauche: 3 contre 2 avec l'ailier rentré et le pivot. L'ailier rentré pose un bloc sur le 2 gauche, étagé.",
              courses: { AiD: { vers: [-3.6, 7.0], via: [-1.4, 7.8], ecran: true }, ArG: [-5.6, 9.0] },
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-4.4, 7.6] },
            },
            {
              texte: "L'arrière gauche prend le bloc: il passe à l'intérieur, entre le bloc et le central, et tire. Autres choix: passe et va avec l'ailier rentré, passe au pivot qui glisse dans le dos de son défenseur, ou décalage vers le demi-centre.",
              courses: { ArG: [-2.6, 8.2] },
              tir: { par: 'ArG', t: 0.6 },
              def: { G2: [-4.5, 7.7], G3: [-1.4, 7.2] },
            },
          ],
        },
        {
          nom: '6 - Einläufer mit Ball (contre 3-2-1)',
          etapes: [
            {
              texte: "Contre une 3-2-1. Le pivot se place du côté opposé au ballon. L'ailier gauche percute vers l'intérieur, puis passe à l'arrière gauche.",
              courses: { AiG: [-7.4, 4.4], Piv: [1.0, 7.2] },
              passe: ['AiG', 'ArG', 0.6],
              def: { ...DEF_321 },
            },
            {
              texte: "L'ailier enchaîne une course le long des 6 m. Le ballon circule avec pression: l'arrière gauche attaque et donne au demi-centre.",
              courses: { AiG: { vers: [-2.6, 6.3], via: [-5.4, 6.4] }, ArG: [-4.2, 8.6] },
              passe: ['ArG', 'DC', 0.6],
            },
            {
              texte: "L'ailier passe derrière le central, que le pivot tient à distance par un écran, et file derrière le demi droit. Le demi-centre donne à l'arrière droit.",
              courses: {
                AiG: { vers: [4.6, 6.1], via: [0.8, 5.9] },
                Piv: { vers: [-0.1, 7.3], ecran: true },
                ArD: [5.2, 8.8],
              },
              passe: ['DC', 'ArD', 0.5],
              def: { G3: [-1.0, 7.0], D2: [4.8, 7.4], D3: [1.2, 9.2] },
            },
            {
              texte: "L'arrière droit sert le rentrant, libre (sinon il élargit vers l'aile).",
              passe: ['ArD', 'AiG', 0.1],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '7 - Außen gegen (Heiner Brand)',
          etapes: [
            {
              texte: "Contre une défense offensive. Le ballon arrive au demi-centre (ici passé par l'ailier gauche).",
              passe: ['AiG', 'DC', 0.2],
              def: { ...DEF_321 },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit pour ouvrir l'espace. Le pivot bloque le demi droit. L'ailier gauche part dans le dos de la défense, du côté opposé au ballon.",
              courses: {
                Piv: { vers: [3.6, 7.0], ecran: true },
                ArD: [5.0, 9.0],
                AiG: { vers: [-5.4, 5.0], via: [-8.2, 4.0] },
              },
              passe: ['DC', 'ArD', 0.3],
              def: { G3: [-0.2, 7.5] },
            },
            {
              texte: "L'ailier arrive au centre, un court instant libre. L'arrière droit, en préparation de tir, lui passe (sinon il donne au demi-centre, qui compense).",
              courses: { AiG: { vers: [1.2, 6.3], via: [-2.0, 7.0] }, ArD: [4.6, 8.6] },
              passe: ['ArD', 'AiG', 0.75],
              def: { D2: [4.1, 7.7] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'traversee-ailier-et-bloc',
      nom: "Traversée de l'ailier et bloc du côté opposé",
      alias: "Overgang forom til screening / til afslutning (DA); Entrée et pose d'un bloc, Entrée et tir, Entrée avec tir - bloc de l'ailier, Entrée et bloc (Dragør HK); double écran des ailiers (forum DE)",
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'ailier passe, traverse toute la défense et va bloquer un défenseur de l'autre côté pour ouvrir un tir à un arrière, ou reçoit lui-même au centre.",
      description: [
        "Famille de combinaisons du club danois de Dragør (W. Fog-Hansen, traduction française de clubs alsaciens). L'ailier donne le ballon à son arrière, puis traverse le long de la défense pendant que le ballon circule à l'opposé.",
        "Selon la fiche, l'ailier va bloquer le 2 opposé pour l'arrière de ce côté (\"Entrée et pose d'un bloc\"), reçoit lui-même au centre (\"Entrée et tir\"), bloque pour son propre arrière qui a coupé en diagonale (\"Entrée avec tir - bloc de l'ailier\"), ou bloque le 2 pour l'arrière qui revient à l'intérieur (\"Entrée et bloc\", 2 fins).",
        "Une variante d'un forum allemand (\"VCRulez\") pousse la traversée jusqu'à l'ailier défensif opposé: les deux ailiers bloquent le 1 et le 2 et l'arrière passe entre les deux écrans.",
        "Les fiches Dragør ont un texte court et un schéma; les placements suivent les schémas. Voir aussi \"Rentrée d'ailier\" et \"Entrée de l'ailier à l'opposé du ballon\".",
      ],
      objectif: "Ouvrir un intervalle à l'opposé par le bloc de l'ailier qui a traversé.",
      pointsCles: [
        "Le timing est important: l'ailier pose son bloc au moment où l'arrière reçoit en s'engageant vers le but.",
        "L'ailier traverse lancé, sans entrer dans la zone.",
        "Les autres joueurs prennent des intervalles pendant la traversée pour fixer la défense.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée et pose d'un bloc (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f1164.html',
          note: "\"ALG fait son entrée vers le côté opposé et pose un bloc sur 2G [...] ARD prend l'intervalle et tire au but.\"",
        },
        {
          titre: 'Entrée et tir (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f1190.html',
          note: "\"ARD s'engage à l'extérieur du 2G de défense avec l'intention de lui faire ouvrir le centre.\"",
        },
        {
          titre: "Entrée avec tir - bloc de l'ailier (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f1165.html',
          note: '"Si ALG pose son bloc, ARG doit être en mesure de recevoir la balle de ARD et tirer. Le DC bloque au même instant."',
        },
        {
          titre: 'Entrée et bloc (Dragør HK, 2 alternatives)',
          url: 'http://www.dragoerhb.dk/fransk/f886.html',
          note: '"ARG [...] embarque avec une feinte externe sans ballon le défenseur 2D, revient interne, reçoit la balle du DC et tire ou passe à AVC."',
        },
        {
          titre: 'Sammlung von Spielzügen (forum handballecke.de, post #20, 2004)',
          url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
          note: "LA traverse jusqu'à l'ailier défensif opposé et le bloque; RA bloque le demi; RR passe entre les deux écrans.",
        },
        {
          titre: '16 combinaisons animées (Handball Gardéen)',
          url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349',
          note: "Appelle la fiche f1190 \"Entrée d'ailier avec écran pivot pour tir\".",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Bloc sur le 2 opposé, tir de l'arrière droit",
          etapes: [
            ...TRAV_BASE,
            TRAV_CENTRE,
            {
              texte: "Le demi-centre donne à l'arrière droit, qui s'engage vers le but. Au moment où il reçoit, l'ailier pose un bloc sur le 2 droit; le pivot bloque son défenseur, le 3.",
              courses: {
                ArD: [3.6, 8.4],
                AiG: { vers: [4.1, 6.2], via: [2.6, 7.8], ecran: true },
                Piv: { vers: [2.4, 6.9], ecran: true },
              },
              passe: ['DC', 'ArD', 0.5],
              def: { D2: [4.9, 5.5], D3: [1.4, 6.9] },
            },
            {
              texte: "L'arrière droit prend l'intervalle entre le 3 et le 2 droits et tire.",
              courses: { ArD: [3.2, 7.7] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Entrée et tir de l'ailier",
          etapes: [
            ...TRAV_BASE,
            {
              ...TRAV_CENTRE,
              texte: "L'arrière gauche donne au demi-centre. L'arrière droit s'engage à l'extérieur du 2 droit pour lui faire ouvrir le centre; l'ailier traverse.",
              courses: { ...TRAV_CENTRE.courses, ArD: [6.6, 8.2] },
              def: { D2: [5.6, 5.8] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit, engagé à l'extérieur. L'ailier arrive dans le centre ouvert; le pivot bloque le 3 gauche pour l'empêcher de glisser.",
              courses: {
                ArD: [6.6, 7.2],
                AiG: { vers: [3.2, 6.3], via: [2.4, 7.6] },
                Piv: { vers: [-0.8, 6.8], ecran: true },
              },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [5.8, 5.8], D3: [1.5, 6.8], D1: [7.4, 3.4] },
            },
            {
              texte: "L'arrière droit sert l'ailier.",
              passe: ['ArD', 'AiG', 0.15],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Bloc de l'ailier pour son arrière",
          etapes: [
            ...TRAV_BASE,
            {
              ...TRAV_CENTRE,
              texte: "L'arrière gauche attaque et donne au demi-centre; l'ailier traverse vers le 2 droit.",
              passe: ['ArG', 'DC', 0.5],
              courses: { ...TRAV_CENTRE.courses, ArG: [-4.4, 8.0], DC: [0.2, 9.6] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit, qui s'engage vers l'avant, puis va bloquer le 3 droit. L'ailier va bloquer le 2 droit; l'arrière gauche coupe en diagonale vers le centre.",
              courses: {
                ArD: [4.8, 8.6],
                DC: { vers: [2.2, 7.6], ecran: true },
                AiG: { vers: [4.1, 6.2], via: [2.6, 7.8], ecran: true },
                ArG: [-0.4, 9.2],
              },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [4.9, 5.5], D3: [1.5, 6.9] },
            },
            {
              texte: "Les deux blocs sont posés: l'arrière droit donne à l'arrière gauche, lancé.",
              courses: { ArG: { vers: [3.0, 8.4], via: [1.4, 9.8] } },
              passe: ['ArD', 'ArG', 0.4],
            },
            {
              texte: "L'arrière gauche tire entre les deux blocs.",
              courses: { ArG: [3.1, 7.3] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: "4 - Bloc sur le 2, tir de l'arrière qui revient",
          etapes: [
            ...F886_BASE,
            {
              texte: "L'arrière droit tire.",
              courses: { ArD: [3.2, 7.6] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: '5 - Bloc sur le 2, passe au pivot',
          etapes: [
            ...F886_BASE,
            {
              texte: "Le 3 droit sort sur l'arrière: celui-ci donne au pivot.",
              courses: { Piv: [1.2, 6.4] },
              passe: ['ArD', 'Piv', 0.4],
              def: { D3: [2.6, 7.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '6 - Double écran des ailiers (forum DE)',
          etapes: [
            ...TRAV_BASE,
            TRAV_CENTRE,
            {
              texte: "Le demi-centre donne à l'arrière droit. L'ailier gauche traverse tout le terrain jusqu'à l'ailier défensif opposé et le bloque.",
              courses: { ArD: [5.4, 9.4], AiG: { vers: [6.9, 3.6], via: [5.0, 8.2], ecran: true } },
              passe: ['DC', 'ArD', 0.4],
              def: { D1: [7.6, 2.6] },
            },
            {
              texte: "L'arrière droit donne à l'ailier droit.",
              courses: { AiD: [8.8, 3.4] },
              passe: ['ArD', 'AiD', 0.3],
            },
            {
              texte: "L'ailier droit court vers le 2 droit et le bloque à son tour; il rend le ballon à l'arrière droit, qui arrive lancé.",
              courses: { AiD: { vers: [5.8, 5.6], ecran: true }, ArD: [6.8, 7.4] },
              passe: ['AiD', 'ArD', 0.5],
              def: { D2: [4.9, 5.1] },
            },
            {
              texte: "L'arrière droit passe entre les deux écrans et tire.",
              courses: { ArD: [6.8, 5.2] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-apres-croise',
      nom: "Entrée d'ailier après un croisé",
      alias: 'Fløjindløb efter kryds (DA), Wing running in after cross (EN)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "Croisé demi-centre / arrière gauche; le demi-centre bloque ensuite le 2 et l'ailier entre entre ce bloc et le 3.",
      description: [
        "Fiche de Dragør HK. L'attaque commence par un croisé entre le demi-centre et l'arrière gauche. Après sa passe, le demi-centre continue et pose un bloc sur le 2 gauche.",
        "L'arrière gauche attaque le centre de la défense. Au même moment, l'ailier gauche entre dans l'intervalle entre le 3 gauche et le bloc du demi-centre, reçoit et tire. Le schéma fait commencer l'action par une passe de l'arrière droit au demi-centre.",
      ],
      objectif: "Libérer l'ailier entre le bloc du demi-centre et le 3, pendant que l'arrière attire les centraux.",
      pointsCles: [
        "Le demi-centre pose son bloc juste après sa passe, sans s'arrêter.",
        "L'arrière gauche attaque vraiment le centre pour fixer le 3.",
        "L'ailier entre au moment où l'arrière arrive au centre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'ailier après un croisé (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f377.html',
          note: "\"Après la passe à ARG, le DC pose un bloc sur le défenseur 2D [...] ALG fait son entrée et prend l'intervalle entre le défenseur 3D et le bloc du DC.\"",
        },
      ],
      ballon: 'ArD',
      etapes: [
        {
          texte: "L'arrière droit passe au demi-centre, qui s'engage en diagonale vers la gauche.",
          courses: { DC: [-2.4, 8.6] },
          passe: ['ArD', 'DC', 0.1],
          def: { G3: [-2.0, 7.2] },
        },
        {
          texte: "Croisé: l'arrière gauche passe derrière le demi-centre et reçoit le ballon. Le demi-centre continue et pose un bloc sur le 2 gauche.",
          courses: {
            ArG: { vers: [-1.0, 9.0], via: [-3.2, 10.2] },
            DC: { vers: [-4.2, 6.0], ecran: true },
          },
          passe: ['DC', 'ArG', 0.3],
          def: { G2: [-5.0, 5.3], G3: [-1.8, 7.0] },
        },
        {
          texte: "L'arrière gauche attaque le centre. L'ailier gauche entre entre le 3 gauche et le bloc du demi-centre.",
          courses: { ArG: [-0.6, 8.0], AiG: { vers: [-2.7, 6.6], via: [-6.2, 8.8] } },
          def: { G3: [-1.2, 7.1], D3: [1.0, 7.0] },
        },
        {
          texte: "L'arrière gauche donne à l'ailier.",
          passe: ['ArG', 'AiG', 0.1],
        },
        { texte: "L'ailier gauche tire.", tir: 'AiG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-suedoise',
      nom: 'Entrée suédoise',
      alias: "Svensk overgang / Swedish running in (DA/EN); entrée d'ailier à la suédoise (Svensk fløjovergang)",
      categorie: 'Combinaisons à nom de pays',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Contre une 1-5: le pivot fait monter l'avancé et son défenseur, l'ailier gauche entre très vite au centre, derrière les défenseurs.",
      description: [
        "Fiche \"Entrée dite suédoise 1\" de Dragør HK, conseillée contre une 1-5. Le ballon va de l'ailier gauche au demi-centre puis à l'arrière droit, qui attaque à l'extérieur. Le pivot monte sur le défenseur avancé pour faire monter son propre défenseur et libérer la zone centrale.",
        "Au même moment, l'ailier gauche entre très vite au centre, derrière les défenseurs, et reçoit de l'arrière droit.",
        "La fiche voisine \"Entrée d'ailier à la suédoise\" (rubrique entrées et croisés) est différente: l'ailier gauche entre balle en main vers le centre et donne à l'arrière droit, qui court lui aussi vers le centre; l'arrière gauche et le demi-centre se décalent vers la gauche. Son schéma montre une défense 0-6; elle est jouée ici contre la même 1-5.",
      ],
      objectif: "Vider le centre de la défense en faisant monter l'avancé et le central, puis y faire entrer l'ailier.",
      pointsCles: [
        "Le pivot monte vraiment sur l'avancé: son défenseur doit le suivre.",
        "L'ailier entre vite, au moment où l'arrière droit attaque à l'extérieur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée dite suédoise 1 (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f1425.html',
          note: '"AVC est monté sur le défenseur avancé dans le but de faire monter son défenseur et libérer la zone. ALG au même moment fait son entrée rapidement au centre derrière les défenseurs."',
        },
        {
          titre: "Entrée d'ailier à la suédoise (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f1424.html',
          note: '"ALG entre balle en main vers le centre et passe à ARD, qui lui aussi court central. [...] ARD peut passer au DC, qui peut tirer ou décaler ARG."',
        },
        {
          titre: '16 combinaisons animées (Handball Gardéen)',
          url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349',
          note: "\"Entrée d'ailier sur la dite Suédoise\" renvoie à la fiche f1425.",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Entrée suédoise (le pivot monte sur l'avancé)",
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche et se prépare à entrer.",
              courses: { AiG: [-8.4, 2.4], ArG: [-5.2, 9.0] },
              passe: ['AiG', 'ArG', 0],
            },
            {
              texte: "L'arrière gauche donne au demi-centre, qui s'engage vers la droite. Le pivot monte sur l'avancé: son défenseur, le central, le suit et libère la zone.",
              courses: { DC: [1.8, 9.8], Piv: [0.3, 8.2] },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [1.3, 9.0], G3: [-0.6, 7.6] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit, qui attaque à l'extérieur. Au même moment, l'ailier gauche entre très vite au centre, derrière les défenseurs.",
              courses: { ArD: [6.4, 7.6], AiG: { vers: [0.4, 6.3], via: [-5.6, 9.4] } },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [5.4, 5.8], G2: [-4.2, 5.8] },
            },
            {
              texte: "L'arrière droit sert l'ailier, seul au centre.",
              passe: ['ArD', 'AiG', 0.1],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - À la suédoise (l'ailier entre balle en main)",
          etapes: [
            {
              texte: "L'ailier gauche entre balle en main vers le centre. L'arrière droit s'engage lui aussi vers le centre.",
              courses: { AiG: { vers: [-2.6, 7.4], via: [-6.6, 6.0] }, ArD: [3.0, 9.0] },
            },
            {
              texte: "L'ailier passe à l'arrière droit, qui court vers le centre. Au même moment, l'arrière gauche et le demi-centre se décalent vers la gauche.",
              courses: {
                AiG: [-2.4, 6.4],
                ArD: [0.9, 8.2],
                ArG: [-7.6, 4.0],
                DC: { vers: [-4.4, 9.0], via: [-2.4, 10.6] },
              },
              passe: ['AiG', 'ArD', 0.3],
              def: { D3: [0, 9.2], G2: [-4.0, 6.4] },
            },
            {
              texte: "L'arrière droit donne au demi-centre, qui fixe le 2 gauche.",
              courses: { DC: [-4.6, 8.2] },
              passe: ['ArD', 'DC', 0.2],
              def: { G2: [-4.4, 6.6] },
            },
            {
              texte: "Le demi-centre peut tirer; ici, il décale l'arrière gauche, à l'aile.",
              courses: { ArG: [-7.2, 3.8] },
              passe: ['DC', 'ArG', 0.3],
              def: { G1: [-7.6, 2.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },
  );

  /* ---------------- Croisé derrière - Klempel ---------------- */
  const KLEMPEL_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit, qui s'engage vers le 2 droit.",
      courses: { ArD: [4.8, 8.0] },
      passe: ['AiD', 'ArD', 0],
      def: { D2: [5.0, 5.6] },
    },
    {
      texte: "L'arrière droit donne au demi-centre, puis continue et pose un bloc sur le 2 droit. L'ailier droit part derrière lui. Le demi-centre se décale vers la gauche et fixe le 3 gauche; le pivot bloque le 3 droit.",
      courses: {
        ArD: { vers: [4.2, 6.0], ecran: true },
        AiD: { vers: [6.6, 7.6], via: [8.4, 5.6] },
        DC: [-1.6, 8.6],
        Piv: { vers: [0.9, 6.6], ecran: true },
      },
      passe: ['ArD', 'DC', 0.1],
      def: { D2: [5.0, 5.4], G3: [-2.0, 7.4], D3: [1.8, 6.9] },
    },
    {
      texte: "Le demi-centre feinte un tir, puis fait une vraie passe de renversement, forte et rapide, à l'ailier droit lancé derrière l'arrière.",
      courses: { AiD: [2.8, 8.4] },
      passe: ['DC', 'AiD', 0.5],
    },
  ];

  /* ---------------- Entrée d'ailier après feinte de croisé (f435) ---------------- */
  const F435_BASE = [
    {
      texte: "Le demi-centre s'engage vers la gauche; l'arrière gauche croise derrière lui vers le centre. L'ailier gauche se prépare.",
      courses: { DC: [-3.0, 8.6], ArG: { vers: [-0.8, 8.8], via: [-3.4, 10.2] }, AiG: [-8.0, 3.4] },
      def: { G3: [-2.2, 7.1] },
    },
    {
      texte: "Le demi-centre fait semblant de remettre à l'arrière gauche et donne à l'ailier, lancé vers l'intérieur.",
      courses: { DC: [-3.6, 8.0], AiG: [-5.6, 5.0] },
      passe: ['DC', 'AiG', 0.6],
      def: { G2: [-4.6, 5.8], G1: [-6.6, 3.6], G3: [-1.4, 7.2] },
    },
  ];

  /* ---------------- Entrée avec croisé derrière (f201) ---------------- */
  const F201_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit, qui attaque la défense. L'ailier part aussitôt en course derrière lui.",
      courses: { ArD: [4.8, 8.0], AiD: [8.0, 4.6] },
      passe: ['AiD', 'ArD', 0],
      def: { D2: [5.0, 5.6] },
    },
    {
      texte: "L'arrière droit donne au demi-centre, puis continue et pose un bloc sur le 2 droit. L'ailier passe dans son dos.",
      courses: {
        ArD: { vers: [4.1, 6.1], ecran: true },
        DC: [1.0, 9.4],
        AiD: { vers: [5.8, 8.8], via: [7.6, 7.4] },
      },
      passe: ['ArD', 'DC', 0.15],
      def: { D2: [4.9, 5.5] },
    },
    {
      texte: "Le demi-centre attaque le centre de la défense; les deux 3 sortent sur lui. Il passe en retrait à l'ailier droit, arrivé dans son dos.",
      courses: { DC: [-0.6, 8.0], AiD: [1.4, 9.0] },
      passe: ['DC', 'AiD', 0.6],
      def: { G3: [-1.3, 7.2], D3: [0.6, 7.3] },
    },
  ];

  /* ---------------- Entrées D et E ---------------- */
  // Entrée D: contre une 5-1 (le 3 gauche monte en avancé, le 3 droit devient le central).
  const D_BASE = [
    {
      texte: "Contre une 5-1: un 3 monte en avancé, le pivot se place à gauche du central. L'ailier gauche passe à l'arrière gauche.",
      courses: { Piv: [-0.8, 6.4] },
      passe: ['AiG', 'ArG', 0],
      def: { G2: [-4.6, 5.3], G3: [-0.2, 9.2], D3: [0.3, 6.7], D2: [4.6, 5.3] },
    },
    {
      texte: "L'arrière gauche donne au demi-centre et part vers le poste d'ailier gauche. L'ailier gauche traverse le long de la défense.",
      courses: { ArG: [-7.6, 6.0], AiG: { vers: [-2.6, 7.4], via: [-6.4, 6.4] } },
      passe: ['ArG', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre donne à l'arrière droit et se déplace vers la gauche; l'arrière gauche s'installe à l'aile. L'ailier termine sa traversée près du 2 droit. L'arrière droit décide: tir, passe au pivot, à l'ailier entrant, ou renversement rapide sur le demi-centre.",
      courses: {
        DC: [-3.6, 8.6],
        ArG: [-8.8, 2.4],
        ArD: [4.4, 8.6],
        AiG: { vers: [3.6, 6.3], via: [0.4, 8.6] },
      },
      passe: ['DC', 'ArD', 0.2],
      def: { G3: [1.4, 9.0] },
    },
  ];
  // Entrée E: contre une 0-6, "porte" de l'ailier et du pivot sur le 3 et le 2 droits.
  const E_BASE = [
    {
      texte: "Contre une 0-6. L'ailier gauche passe à l'arrière gauche.",
      passe: ['AiG', 'ArG', 0],
    },
    {
      texte: "L'arrière gauche donne au demi-centre et part vers le poste d'ailier gauche. L'ailier gauche traverse le long de la défense.",
      courses: { ArG: [-7.6, 6.0], AiG: { vers: [-2.6, 7.4], via: [-6.4, 6.4] }, Piv: [2.4, 6.6] },
      passe: ['ArG', 'DC', 0.2],
      def: { D3: [1.5, 6.9] },
    },
    {
      texte: "Le demi-centre donne à l'arrière droit et se déplace vers la gauche; l'arrière gauche gagne l'aile. L'ailier et le pivot forment une \"porte\": l'ailier bloque le 2 droit, le pivot le 3 droit.",
      courses: {
        DC: [-3.6, 8.6],
        ArG: [-8.8, 2.4],
        ArD: [4.6, 8.8],
        AiG: { vers: [4.1, 6.3], via: [2.0, 10.0], ecran: true },
        Piv: { vers: [2.4, 6.6], ecran: true },
      },
      passe: ['DC', 'ArD', 0.2],
      def: { D2: [4.9, 5.6], D3: [1.5, 6.9] },
    },
  ];
  const E_RENVERSE = {
    texte: "Renversement: l'arrière droit donne au demi-centre, placé à gauche avec l'arrière gauche.",
    courses: { DC: [-3.4, 8.4] },
    passe: ['ArD', 'DC', 0.2],
    def: { G2: [-4.4, 6.0], G3: [-2.0, 6.9] },
  };

  /* ---------------- Entrée d'ailier avec remise de l'arrière (f739) ---------------- */
  const F739_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche, qui fixe légèrement la défense. L'ailier part aussitôt en course.",
      courses: { ArG: [-4.8, 8.6], AiG: { vers: [-7.4, 4.4], via: [-8.8, 3.4] } },
      passe: ['AiG', 'ArG', 0],
      def: { G2: [-4.9, 5.8] },
    },
    {
      texte: "Le ballon va au demi-centre; l'arrière gauche se replace.",
      courses: { ArG: [-5.8, 9.8], AiG: { vers: [-3.6, 7.8], via: [-6.0, 7.4] } },
      passe: ['ArG', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre redonne à l'ailier, en course.",
      courses: { AiG: [-0.4, 8.2], DC: [0, 10.2] },
      passe: ['DC', 'AiG', 0.4],
      def: { G3: [-1.2, 7.0] },
    },
    {
      texte: "L'ailier envoie aussitôt le ballon à l'arrière droit, engagé, et poursuit sa course vers la droite.",
      courses: { AiG: { vers: [6.6, 5.4], via: [3.8, 7.6] }, ArD: [4.8, 8.0] },
      passe: ['AiG', 'ArD', 0.1],
      def: { D2: [4.6, 5.6] },
    },
  ];

  /* ---------------- Entrée d'ailier pour un tir d'arrière (f184) ---------------- */
  const F184_BASE = [
    {
      texte: "Le pivot est placé à côté du 2 gauche. L'ailier gauche passe au demi-centre, qui attaque à l'extérieur, vers la droite. L'ailier entre; l'arrière gauche court vers l'extérieur.",
      courses: { DC: [3.4, 8.6], AiG: [-6.9, 4.4], ArG: [-6.8, 8.4] },
      passe: ['AiG', 'DC', 0.1],
      def: { D3: [2.0, 6.9] },
    },
    {
      texte: "L'ailier poursuit vers le centre et emmène le 3 gauche. L'arrière gauche reprend soudain vers l'intérieur.",
      courses: { AiG: { vers: [0.8, 7.2], via: [-3.6, 9.0] }, ArG: [-3.4, 8.4] },
      def: { G3: [-0.6, 6.8] },
    },
  ];

  /* ---------------- Entrée longue d'ailier (f318) ---------------- */
  const LONGUE_BASE = [
    {
      texte: "L'ailier droit fait son entrée et reçoit de l'arrière droit.",
      courses: { AiD: [6.6, 5.6] },
      passe: ['ArD', 'AiD', 0.3],
      def: { D1: [7.0, 3.0] },
    },
    {
      texte: "Il traverse vers le centre en dribble, avec la main opposée à la défense. La défense glisse avec lui.",
      courses: { AiD: { vers: [1.4, 7.8], via: [3.6, 7.8] } },
      def: { D2: [4.6, 5.8], D3: [2.1, 7.0], D1: [6.4, 4.0] },
    },
  ];
  const LONGUE_ARG = {
    texte: "Après avoir passé le centre, il donne à l'arrière gauche, qui fixe.",
    courses: { AiD: [-1.8, 8.2], ArG: [-4.4, 8.4], Piv: [-0.4, 6.3] },
    passe: ['AiD', 'ArG', 0.7],
    def: { G2: [-4.6, 6.2], G3: [-2.2, 7.0], D3: [0.7, 7.0], D2: [3.4, 6.4], D1: [6.0, 4.2] },
  };

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'croise-derriere-klempel',
      nom: 'Croisé derrière - Klempel',
      alias: 'Bagomkryds - Klempel (DA), Cross behind - Klempel (EN)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'arrière droit bloque le 2, l'ailier droit passe dans son dos et reçoit un renversement fort du demi-centre, qui a fixé à gauche.",
      description: [
        "Fiche de Dragør HK. Le nom renvoie sans doute à l'arrière polonais Jerzy Klempel (non précisé par la source).",
        "L'arrière droit s'engage puis pose un bloc sur le 2 droit; l'ailier droit passe derrière lui. Le demi-centre fixe à gauche (son défenseur et celui du pivot), feinte un tir et enchaîne une vraie passe de renversement, forte et rapide, vers l'ailier lancé.",
        "\"La passe à ALD peut varier selon que ALD tire entre le 2G ou le 3G\": d'où deux fins, entre les deux 3 ou entre le 3 et le 2 droits. Le texte est bref; la place du pivot et la passe de départ de l'ailier viennent du schéma.",
      ],
      objectif: "Surprendre la défense, attirée à gauche, par un renversement sur l'ailier droit lancé dans le dos de son arrière.",
      pointsCles: [
        "La feinte de tir du demi-centre doit attirer les centraux.",
        "La passe de renversement est forte et rapide.",
        "L'ailier part derrière l'arrière au moment où celui-ci pose son bloc.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Croisé derrière - Klempel (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f200.html',
          note: '"DC feinte un tir et enchaîne une véritable passe de renversement, forte et rapide, à ALD qui est passé derrière ARD qui après son engagement a posé un bloc sur le défenseur 2G."',
        },
      ],
      ballon: 'AiD',
      variantes: [
        {
          nom: '1 - Tir entre les deux 3',
          etapes: [
            ...KLEMPEL_BASE,
            {
              texte: "L'ailier file entre les deux 3, le 3 droit étant retenu par le pivot, et tire.",
              courses: { AiD: { vers: [-0.8, 6.8], via: [0.4, 8.6] } },
              tir: { par: 'AiD', t: 0.7 },
            },
          ],
        },
        {
          nom: '2 - Tir entre le 3 et le 2 droits',
          etapes: [
            ...KLEMPEL_BASE,
            {
              texte: "Le 3 droit reste collé au pivot: l'ailier tire entre lui et le 2 droit, à côté du bloc de l'arrière.",
              courses: { AiD: [3.0, 7.1] },
              tir: { par: 'AiD', t: 0.6 },
              def: { D3: [1.9, 7.0] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-feinte-croise',
      nom: "Entrée d'ailier après feinte de croisé",
      alias: 'Fløjindløb efter snydekryds (DA), Wing running in after fake cross (EN)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "Le demi-centre croise avec l'arrière gauche, feinte de lui remettre et sert l'ailier gauche en course vers l'intérieur.",
      description: [
        "Fiche de Dragør HK. Le demi-centre croise avec l'arrière gauche et fait semblant de lui remettre le ballon. À la place, il donne à l'ailier, lancé vers l'intérieur, qui tire.",
        "Le demi-centre continue sa course et prend la place de l'ailier: si le 1 a suivi l'ailier, le ballon revient au demi-centre, qui tire à l'aile. Le texte mélange ailier gauche et ailier droit; le schéma montre l'ailier gauche.",
      ],
      objectif: "Exploiter l'anticipation de la défense sur le croisé pour servir l'ailier qui rentre.",
      pointsCles: [
        "La feinte de passe à l'arrière doit être crédible.",
        "L'ailier part au moment du croisé, vers l'intérieur.",
        "Le demi-centre ne s'arrête pas après sa passe: il file à l'aile.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'ailier après feinte de croisé (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f435.html',
          note: "\"DC croise avec ARG et fait semblant de lui remettre. A la place il donne à l'ailier qui est en course interne et qui tire. Le DC continue à courir pour prendre la place de ALG.\"",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'ailier entrant",
          etapes: [...F435_BASE, { texte: "L'ailier gauche tire.", tir: 'AiG' }],
        },
        {
          nom: "2 - Le demi-centre tire à l'aile",
          etapes: [
            ...F435_BASE,
            {
              texte: "Le 1 gauche a suivi l'ailier. Le demi-centre continue jusqu'au poste d'ailier; l'ailier lui rend le ballon.",
              courses: { DC: { vers: [-8.0, 3.6], via: [-6.8, 7.6] } },
              passe: ['AiG', 'DC', 0.7],
              def: { G1: [-6.4, 4.4] },
            },
            {
              texte: "Le demi-centre tire à l'aile.",
              courses: { DC: [-7.8, 3.2] },
              tir: { par: 'DC', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-avec-croise-derriere',
      nom: 'Entrée avec croisé derrière',
      alias: 'Overgang med bagomkryds (DA), Running in with cross behind (EN)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'ailier droit passe, court derrière son arrière qui bloque, reçoit en retrait du demi-centre et tire ou sert l'arrière gauche entre deux blocs.",
      description: [
        "Fiche de Dragør HK. L'ailier droit donne à l'arrière droit, qui attaque, passe au demi-centre et va bloquer le 2 droit. Le demi-centre attaque la défense et passe en retrait à l'ailier droit, parti en course derrière après sa passe.",
        "L'ailier peut tirer ou passer à l'arrière gauche, qui s'engage entre les deux blocs. Le texte est ambigu sur le second bloc; les deux schémas le placent à gauche (sur le 2 gauche pour le tir de l'ailier, sur le 3 gauche, avec le pivot sur le 3 droit, pour le tir de l'arrière): l'animation suit les schémas.",
      ],
      objectif: "Faire arriver l'ailier opposé lancé au centre, puis jouer entre deux blocs.",
      pointsCles: [
        "L'ailier part derrière juste après sa passe.",
        "La passe du demi-centre est une passe en retrait, sur l'ailier lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée avec croisé derrière (Dragør HK, trad. Claude Meier, 2 alternatives)',
          url: 'http://www.dragoerhb.dk/fransk/f201.html',
          note: "\"DC attaque le défenseur 3G et passe en retrait à ALD [...] ALD peut maintenant tirer ou passer à ARG qui s'engage entre les deux blocs et tire.\"",
        },
      ],
      ballon: 'AiD',
      variantes: [
        {
          nom: "1 - Tir de l'ailier droit",
          etapes: [
            ...F201_BASE,
            {
              texte: "Le demi-centre enchaîne un bloc sur le 2 gauche. L'ailier droit file entre le 2 et le 3 gauches.",
              courses: {
                DC: { vers: [-4.0, 6.2], ecran: true },
                AiD: { vers: [-2.8, 6.6], via: [-1.4, 8.4] },
              },
              def: { G2: [-4.9, 5.6], G3: [-1.4, 7.0] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "2 - Tir de l'arrière gauche entre les deux blocs",
          etapes: [
            ...F201_BASE,
            {
              texte: "Le demi-centre bloque le 3 gauche et le pivot le 3 droit. L'ailier droit continue vers la gauche.",
              courses: {
                DC: { vers: [-0.9, 7.2], ecran: true },
                Piv: { vers: [0.8, 6.5], ecran: true },
                AiD: [-3.4, 8.0],
              },
              def: { G3: [-1.7, 6.7], D3: [1.7, 7.0] },
            },
            {
              texte: "Il donne à l'arrière gauche, qui s'engage entre les deux blocs.",
              courses: { ArG: { vers: [-0.1, 7.9], via: [-2.6, 9.6] } },
              passe: ['AiD', 'ArG', 0.6],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entrees-d-et-e',
      nom: 'Entrées D et E',
      alias: 'Overgangsspil D / E (DA), Running in play D / E (EN)',
      categorie: 'Ailiers',
      defense: 'D: 5-1; E: 0-6',
      resume: "L'ailier gauche traverse jusqu'au 2 droit, l'arrière gauche glisse à l'aile et le demi-centre à gauche: l'arrière droit choisit entre tir, pivot, ailier entrant ou renversement.",
      description: [
        "Deux fiches de Dragør HK construites de la même façon. L'ailier gauche passe à l'arrière gauche, qui donne au demi-centre puis se décale au poste d'ailier. Le demi-centre donne à l'arrière droit et se déplace vers la gauche. L'ailier gauche traverse jusqu'au 2 droit.",
        "Entrée D (contre 5-1): l'arrière droit décide lui-même s'il tire, passe au pivot, à l'ailier entrant, ou renverse vite sur le demi-centre, qui peut servir le pivot. Entrée E (contre 0-6): priorité au tir de l'arrière droit grâce à une \"porte\" de l'ailier et du pivot sur le 3 et le 2 droits; sinon renversement sur le demi-centre, qui tire ou prolonge sur l'arrière gauche.",
        "Le détail tient surtout dans les schémas (trois par fiche, un par fin): les placements sont reconstitués à partir de ces schémas. La fiche n'a qu'un placement de départ: pour l'entrée D, la défense passe en 5-1 dès la première étape (un 3 monte en avancé).",
      ],
      objectif: "Donner à l'arrière droit plusieurs solutions après la traversée de l'ailier opposé.",
      pointsCles: [
        "L'arrière gauche libère son poste en glissant à l'aile: le demi-centre peut s'y décaler pour le renversement.",
        "Dans l'entrée E, l'ailier et le pivot ouvrent une \"porte\" entre le 3 et le 2 droits.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Entrée D (Dragør HK, trad. Claude Meier, 3 alternatives)',
          url: 'http://www.dragoerhb.dk/fransk/f219.html',
          note: "\"Utilisé par l'ailier contre une 5-1. ARD décide lui-même s'il passera au AVC, à ALG entrant, ou passe rapide de renversement à DC.\"",
        },
        {
          titre: 'Entrée E (Dragør HK, 3 alternatives)',
          url: 'http://www.dragoerhb.dk/fransk/f220.html',
          note: "\"Utilisé par l'ailier contre une 6-0. La combinaison donne en priorité une solution de tir à ARD avec une porte de ALG et AVC sur les défenseurs 3G et 2G.\"",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "D - Tir de l'arrière droit (5-1)",
          etapes: [
            ...D_BASE,
            {
              texte: "Ici, l'arrière droit attaque le centre, entre le central et le 2 droit que l'ailier bloque, et tire.",
              courses: { ArD: [2.0, 7.4], AiG: { vers: [3.6, 6.3], ecran: true } },
              tir: { par: 'ArD', t: 0.6 },
              def: { D3: [1.0, 6.9] },
            },
          ],
        },
        {
          nom: 'D-a - Renversement, passe au pivot (5-1)',
          etapes: [
            ...D_BASE,
            {
              texte: "L'arrière droit renverse rapidement sur le demi-centre, décalé à gauche.",
              courses: { DC: [-4.4, 8.4] },
              passe: ['ArD', 'DC', 0.2],
              def: { G2: [-4.4, 6.4], D3: [0, 6.8] },
            },
            {
              texte: "Le demi-centre donne au pivot, libre entre le 2 et le 3 gauches.",
              courses: { Piv: [-2.2, 6.4] },
              passe: ['DC', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "D-b - Passe à l'ailier entrant (5-1)",
          etapes: [
            ...D_BASE,
            {
              texte: "L'arrière droit attaque à l'extérieur: le 2 droit sort sur lui. L'ailier se libère vers l'intérieur.",
              courses: { ArD: [6.0, 7.0], AiG: [2.4, 6.5] },
              def: { D2: [5.4, 5.9] },
            },
            {
              texte: "L'arrière droit donne à l'ailier entrant.",
              passe: ['ArD', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: 'E - Tir de l\'arrière droit par la "porte" (0-6)',
          etapes: [
            ...E_BASE,
            {
              texte: "L'arrière droit passe par la porte et tire.",
              courses: { ArD: [3.2, 7.4] },
              tir: { par: 'ArD', t: 0.6 },
            },
          ],
        },
        {
          nom: 'E-a - Renversement, tir du demi-centre (0-6)',
          etapes: [
            ...E_BASE,
            E_RENVERSE,
            {
              texte: "Le demi-centre prend l'intervalle entre le 2 et le 3 gauches et tire.",
              courses: { DC: [-3.2, 7.2] },
              tir: { par: 'DC', t: 0.6 },
            },
          ],
        },
        {
          nom: "E-b - Renversement, prolongement sur l'arrière gauche (0-6)",
          etapes: [
            ...E_BASE,
            E_RENVERSE,
            {
              texte: "Le demi-centre attaque l'intervalle entre le 1 et le 2 gauches et prolonge sur l'arrière gauche, à l'aile.",
              courses: { DC: [-5.4, 7.6], ArG: [-8.4, 3.0] },
              passe: ['DC', 'ArG', 0.6],
              def: { G2: [-4.8, 6.2], G1: [-7.0, 3.0] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-et-tir-du-dc',
      nom: 'Entrée avec tir du demi-centre',
      alias: 'Overgang med midtafslutning 1 / 2 (DA), Running in with center shot (EN); "Entrée et tir du DC", "Entrée et tir au centre"',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "Deux entrées d'ailier qui finissent par un tir: le demi-centre tire sur le bloc de l'arrière droit, ou l'ailier gauche reçoit derrière le 2 droit.",
      description: [
        "Deux fiches de Dragør HK. Dans la première, l'ailier droit reçoit en courant et dribble vers l'intérieur; l'arrière droit se place dans le dos du 1 droit et le bloque; l'ailier passe au demi-centre, qui arrive et tire à l'extérieur du bloc.",
        "Dans la seconde, \"une entrée après la passe donne de bonnes possibilités de tir au centre\": l'ailier gauche, après avoir passé, entre et se place derrière le 2 droit; l'arrière droit attaque vers l'extérieur pour lui ouvrir l'espace et le sert. Son schéma montre un défenseur avancé.",
        "Pour garder le même porteur de départ, la première variante commence par une passe du demi-centre à l'arrière droit, absente de la fiche.",
      ],
      objectif: "Finir au centre ou près de l'aile grâce à l'entrée d'un ailier qui attire la défense.",
      pointsCles: [
        "L'ailier reçoit en course et dribble vers l'intérieur pour attirer les défenseurs.",
        "L'arrière qui attaque vers l'extérieur ouvre l'espace pour l'entrant.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée et tir du DC (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f1478.html',
          note: '"ARD se déplace derrière le défenseur 1G et fait un bloc. ALD passe au DC qui arrive et prend un tir externe sur le bloc de ARD."',
        },
        {
          titre: 'Entrée et tir au centre (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f195.html',
          note: '"Si la balle est passée à ARD, cela donne la possibilité à ALG de se déplacer derrière le 2G et de recevoir la balle de ARD."',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir du demi-centre sur le bloc de l'arrière",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              courses: { DC: [-0.6, 10.2] },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit passe à l'ailier droit, qui reçoit en course vers l'intérieur.",
              courses: { AiD: [7.6, 5.0] },
              passe: ['ArD', 'AiD', 0.3],
              def: { D1: [7.3, 3.4] },
            },
            {
              texte: "L'ailier dribble vers l'intérieur et attire le 1 et le 2. L'arrière droit passe dans le dos du 1 et le bloque. Le demi-centre arrive lancé.",
              courses: {
                AiD: [4.4, 7.8],
                ArD: { vers: [7.6, 3.4], via: [8.4, 6.8], ecran: true },
                DC: [3.6, 9.4],
              },
              def: { D2: [5.0, 6.2], D1: [6.6, 3.6] },
            },
            {
              texte: "L'ailier donne au demi-centre, qui passe à l'extérieur du bloc.",
              courses: { DC: { vers: [7.6, 5.0], via: [6.6, 9.8] } },
              passe: ['AiD', 'DC', 0.6],
            },
            { texte: "Le demi-centre tire, le 1 étant retenu par le bloc.", tir: 'DC' },
          ],
        },
        {
          nom: "2 - Tir au centre de l'ailier gauche",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-5.0, 8.8] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.6] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier rend au demi-centre et entre aussitôt le long de la défense.",
              courses: { AiG: { vers: [-4.0, 7.4], via: [-7.2, 6.0] }, DC: [0.2, 9.6] },
              passe: ['AiG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre donne à l'arrière droit, qui attaque vers l'extérieur et ouvre un espace. L'ailier se glisse derrière le 2 droit.",
              courses: { ArD: [6.4, 7.4], AiG: { vers: [3.2, 6.4], via: [0.4, 8.8] } },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [5.6, 6.0] },
            },
            {
              texte: "L'arrière droit sert l'ailier.",
              passe: ['ArD', 'AiG', 0.15],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-remise-arriere',
      nom: "Entrée d'ailier avec remise de l'arrière",
      alias: 'Fløjovergang med back/back aflevering (DA), Wing running in with LB/RB pass (EN)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'ailier gauche traverse et sert de relais en course: demi-centre vers ailier vers arrière droit vers arrière gauche, qui s'engage à pleine vitesse.",
      description: [
        "Fiche de Dragør HK en deux versions. L'ailier gauche passe à l'arrière gauche, qui fixe légèrement; le ballon va au demi-centre, qui le rend à l'ailier en course. L'ailier l'envoie aussitôt à l'arrière droit, engagé, qui le passe immédiatement à l'arrière gauche replacé: celui-ci s'engage à pleine vitesse et tire.",
        "Dans la version 2, le pivot bloque le 3 droit, le demi-centre court dans l'intervalle et reçoit de l'arrière gauche pour tirer.",
      ],
      objectif: "Faire courir la défense d'un côté à l'autre par des passes rapides, puis frapper à gauche ou au centre.",
      pointsCles: [
        "Toutes les passes sont jouées immédiatement, sans arrêt du ballon.",
        "L'arrière gauche se replace après sa passe pour repartir lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'ailier avec remise de l'arrière 1 (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f739.html',
          note: "\"ALG envoie immédiatement la balle à ARD engagé. ARD immédiatement passe à ARG qui s'est replacé et qui maintenant s'engage en pleine vitesse et prend le tir.\"",
        },
        {
          titre: "Entrée d'ailier avec remise de l'arrière 2 (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f739a.html',
          note: "\"AVC pose un bloc sur le défenseur 3G. DC court dans l'intervalle, reçoit la balle de ARG et tire.\"",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...F739_BASE,
            {
              texte: "L'arrière droit passe immédiatement à l'arrière gauche, replacé, qui s'engage à pleine vitesse.",
              courses: { ArG: [-3.6, 8.0] },
              passe: ['ArD', 'ArG', 0.1],
              def: { G2: [-4.4, 5.8], G3: [-1.6, 6.8] },
            },
            {
              texte: "L'arrière gauche tire.",
              courses: { ArG: [-3.2, 7.2] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Bloc du pivot, tir du demi-centre',
          etapes: [
            ...F739_BASE,
            {
              texte: "L'arrière droit passe immédiatement à l'arrière gauche, qui s'engage. Le pivot bloque le 3 droit; le demi-centre part dans l'intervalle.",
              courses: { ArG: [-3.0, 8.0], Piv: { vers: [1.0, 6.6], ecran: true }, DC: [-0.2, 8.4] },
              passe: ['ArD', 'ArG', 0.1],
              def: { G2: [-4.4, 5.8], G3: [-1.4, 7.0], D3: [1.9, 7.0] },
            },
            {
              texte: "L'arrière gauche donne au demi-centre, lancé entre les deux 3.",
              courses: { DC: [0, 7.6] },
              passe: ['ArG', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-tir-arriere',
      nom: "Entrée d'ailier pour un tir d'arrière",
      alias: 'f184 (Dragør HK)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "Le pivot est près du 2 gauche; l'ailier gauche entre et emmène le 3, l'arrière gauche feinte vers l'extérieur et revient tirer par-dessus son pivot.",
      description: [
        "Fiche de Dragør HK. Le pivot est placé à côté du 2 gauche. L'ailier gauche passe au demi-centre, qui attaque à l'extérieur. L'arrière gauche court vers l'extérieur puis reprend soudain vers l'intérieur, reçoit et tire en suspension par-dessus son pivot, ou à côté s'il y a un espace. Le schéma montre l'ailier qui entre vers le centre et emmène le 3.",
        "Dans la version \"tir du pivot\", le pivot se place à l'extérieur et pose un bloc \"russe\" sur le 2 gauche; l'arrière attaque le 3 et sert le pivot (voir aussi la fiche Bloc russe).",
      ],
      objectif: "Créer un tir de loin derrière l'écran du pivot, ou un jeu arrière-pivot.",
      pointsCles: [
        "Le changement de direction de l'arrière (extérieur puis intérieur) doit être soudain.",
        "Le tir se prend en suspension, au-dessus de la tête du pivot.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'ailier pour un tir d'arrière (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f184.html',
          note: '"ARG court externe et soudainement reprend interne, reçoit la balle et tire en suspension au dessus de la tête de son PVC."',
        },
        {
          titre: "Entrée d'ailier pour un tir d'arrière - tir PVT (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f184a.html',
          note: '"PVC se positionne externe et pose un bloc (Russe) sur le défenseur 2D. ARG attaque sur 3D et sert PVC."',
        },
      ],
      depart: { Piv: [-2.9, 6.4] },
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière par-dessus le pivot",
          etapes: [
            ...F184_BASE,
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-3.0, 8.6] },
              passe: ['DC', 'ArG', 0.2],
            },
            { texte: "L'arrière gauche tire en suspension par-dessus le pivot.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Bloc "russe" du pivot, tir du pivot',
          etapes: [
            ...F184_BASE,
            {
              texte: "Le demi-centre donne à l'arrière gauche. Le pivot se place à l'extérieur et pose un bloc \"russe\" sur le 2 gauche.",
              courses: { ArG: [-3.0, 8.6], Piv: { vers: [-4.4, 6.0], ecran: true } },
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-5.0, 5.2] },
            },
            {
              texte: "L'arrière gauche attaque le 3 gauche; le pivot pivote dans son dos et reçoit.",
              courses: { ArG: [-2.4, 7.8], Piv: [-3.2, 6.3] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-1.6, 7.1] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-longue-ailier',
      nom: "Entrée longue d'ailier et passe ARG/ARD",
      alias: 'Lang fløjovergang med back/back aflevering (DA)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'ailier droit traverse en dribble jusqu'à l'autre côté; la défense glisse avec lui et le ballon revient vite à droite, ou part à gauche.",
      description: [
        "Fiche de Dragør HK avec quatre fins. L'ailier droit fait son entrée, reçoit de l'arrière droit et traverse vers le centre en dribble (main opposée à la défense). La défense glisse avec lui.",
        "Fin de base: après le centre, il donne à l'arrière gauche, qui fixe et, juste avant le contact, passe fort à l'arrière droit, qui tire entre le 2 et le 3 droits. Fin a: l'ailier donne plus tôt à l'arrière gauche, qui fixe entre le 2 et le 3 gauches, et l'ailier gauche prend l'intervalle entre le 1 et le 2. Fin b: le ballon va au demi-centre, qui fait une fixation-décalage avec l'arrière droit (il peut aussi tirer ou servir le pivot qui bloque le 3). Fin c: l'arrière droit fixe au centre et le demi-centre croise derrière lui.",
      ],
      objectif: "Déplacer toute la défense par la traversée en dribble, puis jouer à contre-sens.",
      pointsCles: [
        "Dribbler avec la main opposée à la défense.",
        "Passer le ballon juste avant le contact du défenseur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée longue d'ailier et passe ARG/ARD (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f318.html',
          note: '"Juste avant le contact du défenseur la balle est passée à fond à ARD qui tire entre les défenseurs 2G et 3G."',
        },
        {
          titre: "Entrée longue d'ailier et renversement (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f318a.html',
          note: "\"ALG prend l'intervalle entre 1D et 2D pour recevoir la balle de ARG et tirer.\"",
        },
        {
          titre: "Entrée longue d'ailier et décalage renversement (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f318b.html',
          note: '"DC, qui du même élan avec ARD, font maintenant une fixation décalage contre la défense."',
        },
        {
          titre: "Entrée longue d'ailier et croisé à l'opposé (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f318c.html',
          note: '"DC croise derrière ARD, reçoit la balle et tire."',
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Retour fort sur l'arrière droit",
          etapes: [
            ...LONGUE_BASE,
            LONGUE_ARG,
            {
              texte: "Juste avant le contact, l'arrière gauche passe fort à l'arrière droit.",
              courses: { ArG: [-4.2, 7.6], ArD: [2.4, 8.2], AiD: [-2.4, 9.4] },
              passe: ['ArG', 'ArD', 0.5],
            },
            {
              texte: "L'arrière droit tire entre le 2 et le 3 droits.",
              courses: { ArD: [2.2, 7.6] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "a - Renversement sur l'ailier gauche",
          etapes: [
            ...LONGUE_BASE,
            {
              texte: "Juste à l'extérieur du 2 gauche, l'ailier droit donne à l'arrière gauche, qui coupe vers l'intérieur.",
              courses: { AiD: [-4.2, 8.6], ArG: [-2.8, 7.6] },
              passe: ['AiD', 'ArG', 0.75],
              def: { G2: [-3.8, 6.2], G3: [-1.8, 6.9], D3: [0.9, 7.0], D2: [3.4, 6.4], D1: [6.0, 4.2] },
            },
            {
              texte: "L'arrière gauche fixe entre le 2 et le 3 gauches; l'ailier gauche prend l'intervalle entre le 1 et le 2. L'ailier droit continue vers l'aile gauche.",
              courses: { ArG: [-2.6, 7.2], AiG: { vers: [-4.8, 5.6], via: [-7.6, 4.6] }, AiD: [-8.0, 5.8] },
              passe: ['ArG', 'AiG', 0.6],
              def: { G2: [-3.4, 6.2], G3: [-1.7, 6.7], G1: [-6.6, 3.4] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: 'b - Fixation-décalage demi-centre / arrière droit',
          etapes: [
            ...LONGUE_BASE,
            LONGUE_ARG,
            {
              texte: "Juste avant le contact, l'arrière gauche donne au demi-centre, qui arrive lancé.",
              courses: { ArG: [-4.2, 7.6], DC: [2.0, 8.6], ArD: [7.2, 6.6], AiD: [-2.4, 9.4] },
              passe: ['ArG', 'DC', 0.5],
            },
            {
              texte: "Le demi-centre fixe le 2 droit et décale l'arrière droit, qui part à l'extérieur du 1 (il pouvait aussi tirer, ou servir le pivot).",
              courses: { DC: [3.8, 7.4], ArD: [7.4, 4.4] },
              passe: ['DC', 'ArD', 0.6],
              def: { D2: [3.6, 6.2], D1: [6.4, 3.8] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "c - Croisé du demi-centre derrière l'arrière droit",
          etapes: [
            ...LONGUE_BASE,
            LONGUE_ARG,
            {
              texte: "Juste avant le contact, l'arrière gauche passe fort à l'arrière droit, qui fixe au centre, entre le 3 et le 2 droits.",
              courses: { ArG: [-4.2, 7.6], ArD: [2.2, 8.0], AiD: [-2.4, 9.4] },
              passe: ['ArG', 'ArD', 0.5],
              def: { D3: [1.0, 7.2], D2: [2.9, 6.8] },
            },
            {
              texte: "Le demi-centre croise derrière lui et reçoit.",
              courses: { DC: { vers: [5.6, 7.2], via: [3.0, 10.6] } },
              passe: ['ArD', 'DC', 0.55],
            },
            {
              texte: "Le demi-centre tire du côté droit.",
              courses: { DC: [6.0, 6.0] },
              tir: { par: 'DC', t: 0.5 },
              def: { D1: [6.4, 4.6] },
            },
          ],
        },
      ],
    },
  );

  /* ---------------- Croisé arrière/ailier + entrée (f1507) ---------------- */
  const F1507_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière gauche et s'engage vers le centre-gauche.",
      courses: { DC: [-1.4, 7.8], ArG: [-5.6, 8.8] },
      passe: ['DC', 'ArG', 0.1],
      def: { G3: [-1.9, 7.0] },
    },
    {
      texte: "L'arrière gauche croise avec l'ailier gauche: il part vers l'aile et lui donne le ballon au croisement.",
      courses: { ArG: [-7.4, 5.0], AiG: { vers: [-5.0, 7.4], via: [-7.0, 5.6] } },
      passe: ['ArG', 'AiG', 0.6],
    },
    {
      texte: "L'ailier envoie une longue passe à l'arrière droit et poursuit sa course vers la droite.",
      courses: { AiG: [-2.8, 8.8], ArD: [5.0, 8.6] },
      passe: ['AiG', 'ArD', 0.15],
    },
    {
      texte: "L'arrière droit tente sa chance à l'extérieur du 2 droit, qui le suit. L'ailier gauche continue et s'engage entre le 3 et le 2 droits.",
      courses: { ArD: [6.4, 7.0], AiG: { vers: [3.4, 6.5], via: [1.0, 9.2] } },
      def: { D2: [5.8, 5.8], D3: [1.6, 6.9] },
    },
  ];

  /* ---------------- Défense haute sur l'ailier (f322, f56, f56a) ---------------- */
  const HAUTE_PASSE = {
    texte: "Le demi-centre passe à l'arrière gauche. Le 1 gauche défend haut sur l'ailier pour l'empêcher de recevoir.",
    passe: ['DC', 'ArG', 0.1],
  };

  /* ---------------- Entrée avec croisé à l'aile (f79) ---------------- */
  const F79_DEBUT = {
    texte: "L'ailier gauche entre balle en main vers l'intérieur et croise avec l'arrière gauche, qui part vers l'aile.",
    courses: { AiG: [-4.6, 8.0], ArG: { vers: [-8.2, 4.0], via: [-7.8, 8.0] } },
    def: { G2: [-4.8, 5.8] },
  };

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'entree-arriere-ailier-oppose',
      nom: "Entrée d'arrière avec entrée de l'ailier opposé",
      alias: 'Overgang fra back med modsat fløjindløb 1 / 2 (DA)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'arrière gauche traverse vers la droite pendant que l'ailier droit rentre: selon la version, l'arrière ou l'ailier finit entre deux blocs.",
      description: [
        "Deux fiches de Dragør HK. Version 1: l'arrière gauche passe au demi-centre, qui donne à l'arrière droit puis bloque le 3 droit. L'arrière droit croise avec l'ailier droit, qui s'infiltre entre le 2 et le 1 droits. Au même moment, l'arrière gauche arrive au centre, passe entre le bloc du demi-centre et le 2 droit, reçoit de l'ailier et tire.",
        "Version 2: le demi-centre bloque le 3 droit et l'arrière gauche, qui a suivi, pose un écran sur le 2 droit. L'arrière droit, servi avant les blocs, s'engage à l'extérieur du 1; l'ailier droit court derrière lui, reçoit et s'engage entre les deux blocs.",
      ],
      objectif: "Surcharger le côté droit avec l'arrière opposé et l'ailier, puis finir entre les blocs.",
      pointsCles: [
        "Les blocs se posent au moment où le joueur lancé arrive.",
        "L'ailier droit attire le 2 vers l'extérieur en s'infiltrant (version 1).",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'arrière avec entrée de l'ailier opposé 1 (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f1167.html',
          note: "\"ARD croise avec ALD qui s'infiltre entre les défenseurs 2G et 1G. Au même moment ARG arrive au centre et passe entre le bloc du DC et le défenseur 2G, reçoit la balle de ALD et tire.\"",
        },
        {
          titre: "Entrée d'arrière et de l'ailier opposé 2 (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f1482.html',
          note: "\"La balle est passée à ALD qui a couru derrière ARD et s'engage entre les blocs du DC et ARG. ALD tire.\"",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre.",
              courses: { ArG: [-4.6, 9.6] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre donne à l'arrière droit, puis continue et bloque le 3 droit. L'arrière gauche part vers le centre.",
              courses: { DC: { vers: [2.6, 6.9], ecran: true }, ArD: [5.2, 8.8], ArG: [-2.0, 9.6] },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit croise avec l'ailier droit, qui s'infiltre entre le 2 et le 1 droits et reçoit. L'arrière gauche arrive au centre.",
              courses: {
                ArD: { vers: [7.0, 8.0], via: [6.6, 9.6] },
                AiD: { vers: [6.4, 5.6], via: [8.4, 5.0] },
                ArG: [1.2, 8.8],
              },
              passe: ['ArD', 'AiD', 0.5],
              def: { D2: [5.2, 5.0], D1: [7.2, 3.2] },
            },
            {
              texte: "L'arrière gauche passe entre le bloc du demi-centre et le 2 droit; l'ailier droit le sert.",
              courses: { ArG: [3.8, 7.2] },
              passe: ['AiD', 'ArG', 0.5],
              def: { D2: [5.5, 5.2] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Tir de l'ailier droit entre deux blocs",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre, qui s'engage.",
              courses: { ArG: [-4.6, 9.6], DC: [1.0, 9.2] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre donne à l'arrière droit, puis va bloquer le 3 droit. L'arrière gauche enchaîne vers le 2 droit; l'ailier droit remonte.",
              courses: { DC: { vers: [2.6, 6.9], ecran: true }, ArD: [6.8, 7.6], ArG: [1.4, 9.0], AiD: [8.4, 5.6] },
              passe: ['DC', 'ArD', 0.3],
            },
            {
              texte: "L'arrière gauche pose un écran sur le 2 droit. L'arrière droit s'engage à l'extérieur du 1; l'ailier droit court derrière lui et reçoit.",
              courses: {
                ArG: { vers: [4.2, 6.2], via: [3.8, 8.6], ecran: true },
                ArD: [7.8, 5.0],
                AiD: { vers: [5.8, 8.6], via: [8.8, 8.4] },
              },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [4.9, 5.4], D1: [7.6, 3.6] },
            },
            {
              texte: "L'ailier droit s'engage entre les blocs du demi-centre et de l'arrière gauche.",
              courses: { AiD: [3.4, 7.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ar-al-entree',
      nom: 'Croisé arrière/ailier + entrée',
      alias: 'Back/Fløjkryds med overgang (DA)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "Croisé arrière gauche / ailier gauche; l'ailier renverse sur l'arrière droit et continue sa course pour entrer entre le 3 et le 2 droits.",
      description: [
        "Fiche de Dragør HK. Le demi-centre passe à l'arrière gauche, qui croise avec l'ailier gauche. L'ailier passe à l'arrière droit, qui peut tenter un tir à l'extérieur ou à l'intérieur du 2 droit.",
        "L'ailier continue de courir et s'engage entre le 3 et le 2 droits. Si l'arrière droit est parti à l'extérieur, il sert l'ailier entrant. Si un défenseur a pu revenir sur l'ailier (\"2D\" dans le texte, le 2 droit sur le schéma), le ballon est rendu à l'arrière droit.",
        'Voir aussi "Croisé arrière-ailier".',
      ],
      objectif: "Enchaîner un croisé à gauche et une entrée de l'ailier à droite pour créer un 2 contre 1 sur le 2 droit.",
      pointsCles: [
        "L'ailier ne s'arrête pas après sa passe: il continue sa course jusqu'à l'intervalle 3-2 opposé.",
        "L'arrière droit lit le 2 droit: s'il le suit à l'extérieur, passe à l'ailier; s'il revient, retour à l'arrière.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé arrière/ailier + entrée (Dragør HK, trad. Claude Meier, 2 alternatives)',
          url: 'http://www.dragoerhb.dk/fransk/f1507.html',
          note: "\"ALG a continué de courir et s'engage entre les défenseurs 3G et 2G. Si ARD s'engage externe, il peut passer la balle à ALG entrant [...] Si le défenseur 2D a pu défendre sur ALG, la balle est redonnée à ARD.\"",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Passe à l'ailier entrant",
          etapes: [
            ...F1507_BASE,
            {
              texte: "L'arrière droit, parti à l'extérieur, sert l'ailier entrant.",
              passe: ['ArD', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Retour à l'arrière droit",
          etapes: [
            ...F1507_BASE,
            {
              texte: "L'arrière droit sert l'ailier, mais le 2 droit revient sur lui. L'arrière droit continue vers l'extérieur.",
              courses: { ArD: [7.2, 5.6] },
              passe: ['ArD', 'AiG', 0.3],
              def: { D2: [4.4, 6.0], D1: [7.6, 2.8] },
            },
            {
              texte: "L'ailier rend le ballon à l'arrière droit.",
              courses: { ArD: [7.0, 4.6] },
              passe: ['AiG', 'ArD', 0.2],
              def: { D1: [7.6, 3.0] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-et-arriere',
      nom: "Entrée d'ailier et d'arrière",
      alias: 'Fløjovergang og backovergang (DA)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'ailier gauche part derrière son arrière; l'arrière droit traverse, sert l'arrière gauche et le bloque; celui-ci tire entre les blocs du demi-centre et du pivot.",
      description: [
        "Fiche de Dragør HK. L'ailier gauche part en course derrière l'arrière gauche, qui s'engage vers l'intérieur. Le ballon va au demi-centre, qui s'engage et pose un bloc; le pivot bloque de son côté.",
        "En même temps, l'arrière droit court vers l'intérieur, reçoit du demi-centre et donne à l'arrière gauche, qui s'engage vers le centre. L'arrière droit pose alors un bloc sur le 2 gauche. L'arrière gauche tire entre les blocs du demi-centre et du pivot. L'ailier droit se déplace pour aider si les attaquants s'empêtrent dans la défense.",
        "Le texte place le bloc du demi-centre sur \"3G\"; le schéma le montre sur le 3 gauche, avec le pivot sur le 3 droit: l'animation suit le schéma, où l'ailier gauche traverse jusqu'au côté droit.",
      ],
      objectif: "Ouvrir le centre par trois blocs successifs pour un tir de l'arrière gauche.",
      pointsCles: [
        "L'arrière droit pose son bloc sur le 2 gauche en prévision de l'arrivée de l'arrière gauche.",
        "L'arrière gauche tire entre les deux blocs centraux.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'ailier et d'arrière (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f114.html',
          note: '"ARD pose un bloc sur le défenseur 2D en prévision de ARG qui arrive. ARG tire entre les blocs du DC et du PVT."',
        },
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche, qui s'engage vers l'intérieur. L'ailier part en course derrière lui.",
          courses: { ArG: [-4.4, 8.0], AiG: { vers: [-6.8, 8.8], via: [-8.4, 6.0] } },
          passe: ['AiG', 'ArG', 0],
          def: { G2: [-4.8, 5.8] },
        },
        {
          texte: "Le ballon va au demi-centre, qui s'engage et bloque le 3 gauche; le pivot bloque le 3 droit. L'arrière droit court vers l'intérieur; l'ailier gauche passe derrière l'arrière gauche.",
          courses: {
            DC: { vers: [-0.8, 7.0], ecran: true },
            Piv: { vers: [0.8, 6.5], ecran: true },
            ArD: [2.0, 8.8],
            AiG: [-3.0, 9.8],
            ArG: [-4.6, 8.4],
          },
          passe: ['ArG', 'DC', 0.15],
        },
        {
          texte: "Le demi-centre donne à l'arrière droit, qui arrive en course. L'ailier gauche continue vers la droite.",
          courses: { ArD: [-1.6, 8.8], AiG: [2.4, 9.8] },
          passe: ['DC', 'ArD', 0.2],
        },
        {
          texte: "L'arrière droit passe à l'arrière gauche, qui s'engage vers le centre, puis va bloquer le 2 gauche. L'ailier gauche s'écarte à droite; l'ailier droit se place pour aider.",
          courses: {
            ArD: { vers: [-4.0, 6.2], ecran: true },
            ArG: { vers: [-1.8, 8.4], via: [-3.2, 9.6] },
            AiG: [6.8, 7.6],
            AiD: [8.4, 4.8],
          },
          passe: ['ArD', 'ArG', 0.2],
          def: { G2: [-4.8, 5.6] },
        },
        {
          texte: "L'arrière gauche tire entre les blocs du demi-centre et du pivot.",
          courses: { ArG: [0, 7.7] },
          tir: { par: 'ArG', t: 0.6 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-croise-oppose',
      nom: "Entrée d'ailier avec croisé ailier/arrière de l'autre côté",
      alias: 'Fløjovergang med modsat back/fløjkryds (DA)',
      categorie: 'Ailiers',
      defense: 'Avec un défenseur avancé (5-1)',
      dispositif: '5-1',
      resume: "Pendant que l'arrière droit croise avec son ailier, l'ailier gauche entre derrière l'avancé et reçoit de l'ailier droit.",
      description: [
        "Fiche de Dragør HK. Le demi-centre passe à l'arrière droit. En même temps, l'ailier gauche fait son entrée derrière le défenseur avancé. L'arrière droit croise avec l'ailier droit, qui passe ensuite à l'ailier gauche en course; celui-ci tire.",
        "Si le défenseur du pivot se déplace pour couvrir l'ailier, l'ailier passe au pivot. Le texte ne nomme pas la défense; le défenseur avancé et le schéma indiquent une 5-1.",
      ],
      objectif: "Profiter de l'espace derrière l'avancé pendant que la défense regarde le croisé de l'autre côté.",
      pointsCles: [
        "L'ailier gauche passe entre l'avancé et la ligne des défenseurs.",
        "Lire le central: s'il quitte le pivot pour l'ailier, passer au pivot.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'ailier avec croisé ailier/arrière de l'autre côté (Dragør HK, trad. Claude Meier)",
          url: 'http://www.dragoerhb.dk/fransk/f317.html',
          note: '"ALG fait son entrée derrière le défenseur avancé. ARD croise avec ALD et ALD passe ensuite à ALG en course, qui peut tirer. Si le défenseur du PVT se déplace pour le couvrir, ALG peut passer au pivot."',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'ailier gauche",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit. L'ailier gauche entre derrière l'avancé.",
              courses: { AiG: { vers: [-2.2, 7.6], via: [-6.4, 7.4] } },
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [1.2, 9.0] },
            },
            {
              texte: "L'arrière droit croise avec l'ailier droit: l'arrière part vers l'aile, l'ailier vient vers l'intérieur et reçoit au croisement.",
              courses: { ArD: { vers: [8.0, 4.6], via: [7.8, 8.0] }, AiD: { vers: [6.2, 6.0], via: [8.4, 5.6] } },
              passe: ['ArD', 'AiD', 0.55],
              def: { D2: [5.0, 5.6], D1: [7.6, 2.8] },
            },
            {
              texte: "L'ailier droit donne à l'ailier gauche, en course derrière l'avancé.",
              courses: { AiG: { vers: [2.4, 7.0], via: [0.2, 8.2] } },
              passe: ['AiD', 'AiG', 0.4],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Le central couvre l'ailier: passe au pivot",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit. L'ailier gauche entre derrière l'avancé.",
              courses: { AiG: { vers: [-2.2, 7.6], via: [-6.4, 7.4] } },
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [1.2, 9.0] },
            },
            {
              texte: "L'arrière droit croise avec l'ailier droit: l'arrière part vers l'aile, l'ailier vient vers l'intérieur et reçoit au croisement.",
              courses: { ArD: { vers: [8.0, 4.6], via: [7.8, 8.0] }, AiD: { vers: [6.2, 6.0], via: [8.4, 5.6] } },
              passe: ['ArD', 'AiD', 0.55],
              def: { D2: [5.0, 5.6], D1: [7.6, 2.8] },
            },
            {
              texte: "L'ailier droit donne à l'ailier gauche, en course derrière l'avancé.",
              courses: { AiG: { vers: [2.4, 7.0], via: [0.2, 8.2] } },
              passe: ['AiD', 'AiG', 0.4],
            },
            {
              texte: "Le central quitte le pivot pour couvrir l'ailier: celui-ci donne au pivot, libre.",
              courses: { Piv: [-0.6, 6.2] },
              passe: ['AiG', 'Piv', 0.4],
              def: { G3: { vers: [1.4, 7.6], via: [0, 7.8] } },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'fixation-ailier-puis-rentree',
      nom: 'Fixation ailier puis rentrée',
      alias: 'Fløj forfinte og indløb (DA)',
      categorie: 'Ailiers',
      defense: '0-6 (non précisé)',
      resume: "L'ailier fixe à l'extérieur, l'arrière fixe le 2 à l'intérieur sans ballon, puis l'ailier repique entre le 1 et le 2.",
      description: [
        "Fiche de Dragør HK. L'arrière gauche passe à l'ailier gauche, qui fixe à l'extérieur. L'arrière gauche fixe à l'intérieur sur le 2 gauche, sans ballon.",
        "L'ailier repique et essaie de passer entre le 1 et le 2. Si le 2 bloque l'ailier, celui-ci passe à l'arrière gauche, qui tire.",
      ],
      objectif: "Ouvrir l'intervalle 1-2 par une double fixation, ou libérer l'arrière si le 2 ferme.",
      pointsCles: [
        "L'ailier fixe vraiment vers l'extérieur avant de repiquer.",
        "L'arrière fixe le 2 sans ballon, puis reste disponible.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Fixation ailier puis rentrée (Dragør HK, trad. D. Frey et C. Lazarus, HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f708.html',
          note: '"ALG repique et essaye de passer entre 1D et 2D. Si le défenseur 2D bloque ALG alors il passe la balle à ARG qui va tirer."',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - L'ailier passe entre le 1 et le 2",
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche, qui fixe à l'extérieur.",
              courses: { AiG: [-9.2, 2.6] },
              passe: ['ArG', 'AiG', 0.1],
              def: { G1: [-7.9, 2.4] },
            },
            {
              texte: "L'arrière gauche fixe à l'intérieur sur le 2 gauche, sans ballon. L'ailier repique vers l'intérieur.",
              courses: { ArG: [-3.4, 7.6], AiG: [-6.6, 4.6] },
              def: { G2: [-4.4, 6.0], G1: [-7.6, 3.0] },
            },
            {
              texte: "L'ailier passe entre le 1 et le 2 et tire.",
              courses: { AiG: [-5.6, 5.0] },
              tir: { par: 'AiG', t: 0.6 },
              def: { G1: [-7.2, 3.4] },
            },
          ],
        },
        {
          nom: "2 - Le 2 ferme: tir de l'arrière gauche",
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche, qui fixe à l'extérieur.",
              courses: { AiG: [-9.2, 2.6] },
              passe: ['ArG', 'AiG', 0.1],
              def: { G1: [-7.9, 2.4] },
            },
            {
              texte: "L'arrière gauche fixe à l'intérieur sur le 2 gauche, sans ballon. L'ailier repique vers l'intérieur.",
              courses: { ArG: [-3.4, 7.6], AiG: [-6.6, 4.6] },
              def: { G2: [-4.4, 6.0], G1: [-7.6, 3.0] },
            },
            {
              texte: "Le 2 gauche ferme l'intervalle: l'ailier donne à l'arrière gauche.",
              courses: { ArG: [-3.0, 7.4] },
              passe: ['AiG', 'ArG', 0.3],
              def: { G2: [-5.8, 5.4], G3: [-2.0, 6.9] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'defense-haute-aile',
      nom: 'Contre un ailier défensif haut: passer derrière',
      alias: "Høj fløj - undergang (DA); \"Défense haute sur l'aile - passer derrière\", \"Un contre un sans ballon sur un ailier défenseur haut\" (Dragør HK)",
      categorie: 'Ailiers',
      defense: 'Ailier défensif haut',
      resume: "Quand le 1 monte haut pour couper la passe à l'ailier, l'ailier passe dans son dos, ou l'arrière attaque l'espace qu'il laisse.",
      description: [
        "Trois fiches de Dragør HK contre un ailier défensif qui monte haut pour dissuader la passe à l'ailier. Dans la première, l'arrière gauche feinte une passe à l'ailier, qui fait mine de reculer: le 1 monte intercepter, l'ailier passe dans son dos (en pivotant sur lui, ou en fixant à l'intérieur puis à l'extérieur) et reçoit une passe à rebond de l'arrière, qui a fixé le 2.",
        "Dans la deuxième, l'arrière attaque à l'intérieur du 2 et l'ailier enroule par l'extérieur, derrière le 1. Dans la troisième, le pivot sort vite poser un bloc-écran devant le 2, l'ailier court vers la ligne de fond pour emmener le 1, et l'arrière, après une feinte, s'engage en dribble entre le 1 et le 2.",
        "Le ballon part du demi-centre dans les trois versions (seule la première le précise).",
      ],
      objectif: "Punir la montée de l'ailier défensif en jouant dans l'espace qu'il laisse derrière lui.",
      pointsCles: [
        "Il faut un ailier rapide pour passer dans le dos du défenseur.",
        "La passe à rebond évite l'interception du 1 monté haut.",
        "L'arrière fixe le 2 pour l'empêcher d'aider.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Défense haute sur l'aile - passer derrière (Dragør HK, trad. D. Frey et C. Lazarus)",
          url: 'http://www.dragoerhb.dk/fransk/f322.html',
          note: "\"Cela va inciter 1D à essayer d'intercepter la passe. Si cela se produit, ALG va lui passer dans le dos. ARG va fixer interne sur 2D et faire une passe à rebond à ALG.\"",
        },
        {
          titre: 'Un contre un sans ballon sur un ailier défenseur haut (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f56.html',
          note: '"ARG attaque interne sur le D2. ALG enroule externe et passe derrière D1."',
        },
        {
          titre: "Montée de l'ailier pour défendre haut (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f56a.html',
          note: "\"le PVT sort rapidement et se place devant le D2 pour poser un bloc-écran. ALG doit courir vers la ligne de fond pour entraîner D1 et ARG [...] s'engage dans l'intervalle entre les défenseurs D1 et D2.\"",
        },
      ],
      depart: { G1: [-8.4, 4.6], AiG: [-9.4, 3.2] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Feinte de passe, l'ailier passe derrière",
          etapes: [
            HAUTE_PASSE,
            {
              texte: "L'arrière gauche feinte une passe à l'ailier, qui fait mine de reculer pour la recevoir: le 1 monte pour intercepter.",
              courses: { AiG: [-9.5, 4.4] },
              def: { G1: [-8.6, 5.6] },
            },
            {
              texte: "L'ailier passe alors dans le dos du 1. L'arrière gauche fixe à l'intérieur sur le 2 gauche.",
              courses: { AiG: { vers: [-6.0, 4.6], via: [-8.8, 3.4] }, ArG: [-4.0, 8.0] },
              def: { G2: [-4.4, 6.2] },
            },
            {
              texte: "L'arrière gauche fait une passe à rebond à l'ailier.",
              courses: { AiG: [-5.6, 4.8] },
              passe: ['ArG', 'AiG', 0.1],
              def: { G1: [-7.6, 4.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - L'ailier enroule derrière le 1",
          etapes: [
            HAUTE_PASSE,
            {
              texte: "L'arrière gauche attaque à l'intérieur du 2 gauche. L'ailier enroule par l'extérieur et passe derrière le 1.",
              courses: { ArG: [-3.6, 8.0], AiG: { vers: [-6.2, 4.4], via: [-9.8, 2.6] } },
              def: { G2: [-4.0, 6.2] },
            },
            {
              texte: "L'arrière gauche sert l'ailier.",
              passe: ['ArG', 'AiG', 0.1],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Bloc du pivot, l'arrière perce entre le 1 et le 2",
          etapes: [
            HAUTE_PASSE,
            {
              texte: "Le pivot sort vite et se place devant le 2 gauche pour lui poser un bloc-écran. L'ailier court vers la ligne de fond et emmène le 1. L'arrière gauche fait une feinte.",
              courses: { Piv: { vers: [-4.6, 6.2], via: [-1.6, 8.8], ecran: true }, AiG: [-9.4, 1.0], ArG: [-6.0, 8.8] },
              def: { G2: [-5.0, 5.2], G1: [-8.6, 2.2] },
            },
            {
              texte: "L'arrière gauche dribble et s'engage entre le 1 et le 2.",
              courses: { ArG: [-6.0, 4.8] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'defense-haute-ailier-pivot',
      nom: 'Défense haute sur ailier: libération du pivot',
      alias: 'Høj forsvarsfløj (DA)',
      categorie: 'Ailiers',
      defense: 'Ailier défensif haut',
      resume: "Le 1 monte haut sur l'ailier: l'arrière s'engage dans son dos et attire le 2, l'ailier emmène le 1 au corner, et le pivot glisse dans l'espace libéré.",
      description: [
        "Fiche de Dragør HK. Quand l'ailier subit une défense haute au moment de recevoir, l'arrière gauche feinte une passe vers lui et s'engage dans le dos du 1, en attirant le 2. L'ailier s'engage vers le point de corner pour entraîner le 1. Le demi-centre s'engage vers le centre pour attirer les centraux.",
        "Le pivot va dans l'espace libéré, reçoit et tire. Le schéma fait partir le ballon du demi-centre.",
      ],
      objectif: "Vider l'intervalle entre le 2 et le 3 pour le pivot, en exploitant la montée de l'ailier défensif.",
      pointsCles: [
        "Chaque joueur emmène un défenseur: l'ailier le 1, l'arrière le 2, le demi-centre les centraux.",
        "Le pivot attend que l'espace soit libre avant de s'y glisser.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Défense haute sur ailier (Dragør HK, trad. D. Frey et C. Lazarus)',
          url: 'http://www.dragoerhb.dk/fransk/f1278.html',
          note: "\"ARG fait une feinte de passe pour ALG et va s'engager dans le dos de 1D tout en attirant 2D vers lui [...] PVT va dans l'espace libéré, réceptionne la balle et va tirer.\"",
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière gauche. Le 1 gauche monte haut sur l'ailier pour l'empêcher de recevoir.",
          passe: ['DC', 'ArG', 0.1],
          def: { G1: [-8.0, 3.6] },
        },
        {
          texte: "L'arrière gauche feinte une passe à l'ailier et s'engage dans le dos du 1, en attirant le 2. L'ailier part vers le point de corner et emmène le 1. Le demi-centre s'engage au centre pour attirer les centraux.",
          courses: { ArG: [-6.6, 4.6], AiG: [-9.6, 0.6], DC: [0.2, 8.6] },
          def: { G2: [-5.6, 5.4], G1: [-8.8, 1.6], G3: [-1.2, 7.2], D3: [1.4, 7.2] },
        },
        {
          texte: "Le pivot glisse dans l'espace libéré entre le 2 et le 3 gauches; l'arrière gauche lui passe.",
          courses: { Piv: [-3.0, 6.3] },
          passe: ['ArG', 'Piv', 0.6],
        },
        { texte: 'Le pivot tire.', tir: 'Piv' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-d-aile',
      nom: "Croisé d'aile (exercices Dragør)",
      alias: '"Croisé arrière avec passe et va", "Croisé pour ouvrir une position" (Dragør HK)',
      categorie: 'Ailiers',
      defense: '0-6 (exercices)',
      resume: "Trois exercices de croisé entre l'ailier et l'arrière: l'ailier rentre balle en main et l'arrière croise derrière lui, ou l'ailier saute le long des 9 m et remet dans son dos à l'arrière.",
      description: [
        "Trois fiches d'exercices de Dragør HK, jouées en colonnes avec rotation des postes. Dans le \"Croisé d'aile\", l'ailier rentre avec le ballon le long de la zone et entraîne le défenseur de l'aile; l'arrière croise sans ballon derrière lui et reçoit une passe arrière; le ballon part ensuite vers l'autre ailier, qui peut donner au demi-centre. La fiche ne donne pas de tir: l'exercice se poursuit de l'autre côté (dans la fiche, le demi-centre joue arrière et l'ailier prend sa place).",
        "Dans le \"Croisé arrière avec passe et va\", l'ailier suit la ligne des 9 m et saute en allant vers le centre; en l'air, il remet le ballon dans son dos à l'arrière, devenu pivot. Dans le \"Croisé pour ouvrir une position\", l'arrière fixe, feinte un tir et passe à l'ailier; l'ailier saute le long des 9 m en feintant un tir et remet dans son dos à l'arrière, qui s'est démarqué à gauche de la zone.",
        "La passe dans le dos en suspension est un geste difficile, à répéter avant de le jouer en match.",
      ],
      objectif: "Travailler les croisés ailier-arrière et la passe dans le dos qui ouvre une position de tir.",
      pointsCles: [
        "L'ailier qui rentre emmène le défenseur de l'aile avec lui.",
        "L'arrière croise près, sans ballon, et reste disponible pour la passe arrière.",
        "Pratiquer les deux côtés et faire tourner les postes.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Croisé d'aile (Dragør HK, trad. D. Frey et C. Lazarus)",
          url: 'http://www.dragoerhb.dk/fransk/f76.html',
          note: "\"L'ailier rentre avec le ballon sur la zone, couvert par le défenseur à l'aile, qu'il entraîne avec lui. L'arrière croise, sans ballon, derrière l'ailier et sera libre pour une passe arrière de l'ailier.\"",
        },
        {
          titre: 'Croisé arrière avec passe et va (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f151.html',
          note: "\"Pendant qu'il est dans les airs, il remet la balle à l'arrière (devenu pivot) avec une passe dans le dos.\"",
        },
        {
          titre: 'Croisé pour ouvrir une position (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f152.html',
          note: "\"Quand il est dans les airs, il effectue une passe à l'arrière dans le dos. L'arrière se déplace vers la gauche de la zone, là où il se démarquera.\"",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - L'ailier rentre balle en main, l'arrière croise derrière",
          etapes: [
            {
              texte: "L'arrière gauche donne à l'ailier gauche.",
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier rentre balle en main le long de la zone; le 1 gauche, qui le couvre, le suit.",
              courses: { AiG: { vers: [-6.0, 5.0], via: [-8.6, 4.0] } },
              def: { G1: [-6.8, 3.8], G2: [-4.4, 5.6] },
            },
            {
              texte: "L'arrière gauche croise sans ballon derrière lui, vers l'aile; l'ailier lui fait une passe arrière et continue vers le centre.",
              courses: { ArG: { vers: [-8.4, 4.4], via: [-7.4, 8.4] }, AiG: [-3.6, 8.6] },
              passe: ['AiG', 'ArG', 0.5],
            },
            {
              texte: "L'arrière, libre à l'aile, enchaîne: le ballon part vers l'autre ailier.",
              courses: { AiD: [8.6, 2.0] },
              passe: ['ArG', 'AiD', 0.2],
            },
            {
              texte: "L'ailier droit peut donner au demi-centre; l'exercice reprend de l'autre côté (la fiche n'indique pas de tir).",
              passe: ['AiD', 'DC', 0.3],
            },
          ],
        },
        {
          nom: "2 - Passe dans le dos à l'arrière devenu pivot",
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche, qui monte vers la ligne des 9 m.",
              courses: { AiG: [-8.4, 4.4] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier suit la ligne des 9 m vers le centre, balle en main. L'arrière croise sa course et part vers la zone, où il devient pivot.",
              courses: { AiG: { vers: [-2.6, 8.9], via: [-7.6, 8.4] }, ArG: [-3.0, 6.3] },
              def: { G2: [-4.6, 5.6] },
            },
            {
              texte: "L'ailier saute pour tirer en allant vers le centre; le 3 gauche monte sur lui. En l'air, il remet le ballon dans son dos à l'arrière.",
              courses: { AiG: [-1.6, 8.4] },
              passe: ['AiG', 'ArG', 0.6],
              def: { G3: [-1.4, 7.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Croisé pour ouvrir une position',
          etapes: [
            {
              texte: "L'arrière gauche fixe, feinte un tir en suspension et passe à l'ailier, parti de son aile vers les 9 m.",
              courses: { ArG: [-4.6, 8.4], AiG: [-7.6, 7.2] },
              passe: ['ArG', 'AiG', 0.6],
              def: { G2: [-4.8, 6.0] },
            },
            {
              texte: "L'ailier saute le long des 9 m vers le centre en feintant un tir; l'arrière se déplace vers la gauche de la zone pour se démarquer.",
              courses: { AiG: [-3.6, 8.8], ArG: [-5.6, 5.4] },
              def: { G2: [-4.0, 6.6] },
            },
            {
              texte: "En l'air, l'ailier passe dans son dos à l'arrière.",
              passe: ['AiG', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-avec-croise-a-l-aile',
      nom: "Entrée avec croisé à l'aile",
      alias: 'f79 (Dragør HK, alternatives 1 à 4)',
      categorie: 'Ailiers',
      defense: 'Non précisé (exercice sans défense)',
      resume: "L'ailier gauche entre balle en main en croisant avec l'arrière gauche, puis joue avec l'arrière ou avec le demi-centre.",
      description: [
        "Exercice de circulation de Dragør HK, montré sans défenseurs. L'ailier gauche démarre par un croisé en entrant: il rentre balle en main pendant que l'arrière gauche part vers l'aile.",
        "Il a deux possibilités de passe. 1. À l'arrière gauche, qui peut transmettre à l'ailier droit opposé, ou au demi-centre qui attaque l'intervalle et passe à l'ailier droit. 2. Au demi-centre, qui passe rapidement à l'arrière gauche, qui peut lui refaire la passe.",
        "La fiche n'indique ni tir ni réaction défensive; elle est à travailler des deux côtés, avec deux ailiers.",
      ],
      objectif: "Automatiser les relations ailier-arrière-demi-centre après une entrée d'ailier en croisé.",
      pointsCles: ["Faire le travail des deux côtés.", "L'ailier entre avec le ballon pour fixer avant de passer."],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Entrée avec croisé à l'aile (Dragør HK, trad. Claude Meier, 4 alternatives)",
          url: 'http://www.dragoerhb.dk/fransk/f79.html',
          note: "\"ALG démarre par un croisé en entrant, et il aura deux possibilités de passes. 1. A l'ARG qui peut transmettre à ALD opposé [...] 2. Au DC qui passe rapidement à ARG qui peut éventuellement lui refaire la passe.\"",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Passe à l'arrière gauche, puis à l'ailier opposé",
          etapes: [
            F79_DEBUT,
            {
              texte: "Première possibilité: l'ailier passe à l'arrière gauche, parti à l'aile.",
              passe: ['AiG', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche transmet à l'ailier droit, à l'opposé (ou au demi-centre, qui attaque l'intervalle et sert l'ailier droit).",
              passe: ['ArG', 'AiD', 0.2],
            },
          ],
        },
        {
          nom: '2 - Passe au demi-centre',
          etapes: [
            F79_DEBUT,
            {
              texte: "Deuxième possibilité: l'ailier passe au demi-centre.",
              courses: { DC: [-0.4, 9.6] },
              passe: ['AiG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre passe rapidement à l'arrière gauche.",
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche peut lui refaire la passe.",
              courses: { DC: [-1.0, 8.8] },
              passe: ['ArG', 'DC', 0.3],
            },
          ],
        },
      ],
    },
  );
})();
