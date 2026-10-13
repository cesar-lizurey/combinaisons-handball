/* Lot 3b: ailiers - entrées derrière la ligne arrière, rentrées, circulations surprises, enclenchements français autour du pivot (Dragør HK, Approches du Handball, sources allemandes, espagnoles et tchèques). */
(() => {
  /* ---------------- "3 - entrée derrière" (Dragør f52-f54) ---------------- */
  // L'ailier droit passe à l'arrière droit puis court derrière toute la ligne arrière.
  const DERRIERE_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit, puis part en longue course derrière toute la ligne arrière, vers le côté gauche.",
      courses: { AiD: { vers: [7.2, 11.2], via: [9.4, 7.0] } },
      passe: ['AiD', 'ArD', 0],
    },
    {
      texte: "L'arrière droit donne au demi-centre. L'ailier poursuit sa course dans le dos des arrières.",
      courses: { AiD: { vers: [1.6, 12.0], via: [4.8, 12.2] }, ArD: [5.2, 9.2] },
      passe: ['ArD', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre donne à l'arrière gauche, qui reçoit en avançant. L'ailier droit arrive derrière la ligne arrière, côté gauche.",
      courses: { AiD: { vers: [-3.4, 11.0], via: [-1.4, 12.4] }, ArG: [-5.2, 8.8] },
      passe: ['DC', 'ArG', 0.2],
    },
  ];

  /* ---------------- Croisé et rentrée (rubrique "La polyvalence") ---------------- */
  const POLY_504_DEBUT = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche, qui fixe le 2 gauche.",
      courses: { ArG: [-5.0, 8.6] },
      passe: ['AiG', 'ArG', 0],
      def: { G2: [-5.0, 5.8] },
    },
    {
      texte: "L'arrière gauche donne au demi-centre, qui attaque en diagonale vers la droite. Le 3 droit sort sur lui.",
      courses: { ArG: [-5.4, 9.4], DC: [2.6, 8.8] },
      passe: ['ArG', 'DC', 0.1],
      def: { G2: [-5.0, 5.2], D3: [2.3, 7.4] },
    },
  ];

  /* ---------------- Circulation surprise de l'ailier opposé ---------------- */
  const SURPRISE_CROISE_GAUCHE = [
    {
      texte: "Le demi-centre attaque en diagonale vers la gauche, comme pour un croisé. Le 3 gauche sort sur lui.",
      courses: { DC: [-2.6, 8.6] },
      def: { G3: [-2.3, 7.4] },
    },
    {
      texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit vers le centre. Au même moment, l'ailier droit, du côté opposé au ballon, part le long des 6 m, dans le dos des défenseurs qui regardent le ballon.",
      courses: {
        ArG: { vers: [0.2, 9.0], via: [-3.2, 10.4] },
        DC: [-3.6, 7.9],
        AiD: { vers: [4.4, 6.3], via: [7.6, 5.2] },
      },
      passe: ['DC', 'ArG', 0.55],
      def: { D3: [1.0, 7.4] },
    },
  ];

  /* ---------------- "Quel choix?" (Dragør f734-f738) ---------------- */
  const QC_BASE = [
    {
      texte: "Attaque placée: l'arrière gauche s'engage vers l'intérieur, sans ballon. L'ailier gauche court entre le 1 et le 2 gauches. Le 2 hésite entre les deux.",
      courses: { ArG: [-3.6, 8.4], AiG: { vers: [-6.2, 5.2], via: [-8.2, 4.4] }, DC: [-0.6, 9.8] },
      def: { G2: [-4.8, 5.8] },
    },
  ];
  const QC_PASSE_AILIER = {
    texte: "Le 2 gauche revient sur l'arrière: passe rapide du demi-centre à l'ailier gauche. L'arrière gauche fait comme si la passe était pour lui.",
    courses: { AiG: [-6.0, 5.4] },
    passe: ['DC', 'AiG', 0.2],
    def: { G2: [-4.0, 6.8] },
  };
  const QC_DC_AILE = {
    texte: "Le 1 gauche suit l'ailier à l'intérieur. Le demi-centre s'engage vite vers l'aile gauche; l'ailier lui donne le ballon.",
    courses: { DC: { vers: [-8.4, 4.4], via: [-6.0, 9.8] } },
    passe: ['AiG', 'DC', 0.65],
    def: { G1: [-6.8, 4.4] },
  };

  /* ---------------- Passage au pivot de l'ailier (handballhaus) ---------------- */
  const SCHWARZ_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit.",
      passe: ['AiD', 'ArD', 0.1],
    },
    {
      texte: "L'arrière droit donne au demi-centre. Le pivot sort vite au-dessus de la défense, côté gauche.",
      courses: { Piv: { vers: [-1.8, 8.6], via: [-1.4, 7.2] } },
      passe: ['ArD', 'DC', 0.2],
      def: { G3: [-2.0, 7.4] },
    },
    {
      texte: "Le demi-centre sert le pivot sorti.",
      courses: { DC: [0.4, 10.2] },
      passe: ['DC', 'Piv', 0.2],
    },
    {
      texte: "Le pivot remet aussitôt le ballon à l'arrière gauche, qui arrive dans son dos (\"dans l'écran\"). Le demi-centre et l'arrière droit glissent vers la droite. L'ailier droit passe pivot et pose un écran de face sur le 2 droit.",
      courses: {
        ArG: { vers: [-1.2, 9.8], via: [-4.4, 10.4] },
        DC: [3.2, 10.0],
        ArD: [8.2, 6.6],
        AiD: { vers: [4.6, 6.4], via: [8.4, 5.0], ecran: true },
      },
      passe: ['Piv', 'ArG', 0.6],
      def: { D2: [5.0, 5.6], D1: [7.6, 4.2] },
    },
  ];

  /* ---------------- Passe-et-va induit (école yougoslave) ---------------- */
  const INDUCTION_BASE = [
    {
      texte: "L'arrière gauche part vers l'extérieur et feinte une passe à son ailier, qui se déplace dans la même direction, comme pour recevoir.",
      courses: { ArG: [-6.6, 9.0], AiG: [-8.6, 3.6] },
      def: { G2: [-5.6, 5.6], G1: [-7.8, 2.8] },
    },
    {
      texte: "L'arrière change de direction: il s'éloigne de l'ailier vers l'intérieur et fixe le 2 vers l'intérieur. L'intervalle entre le 1 et le 2 s'agrandit. L'ailier change lui aussi de direction et reprend de la largeur.",
      courses: { ArG: { vers: [-4.0, 8.4], via: [-5.6, 9.4] }, AiG: [-9.4, 2.6] },
      def: { G2: [-4.4, 6.2], G1: [-8.2, 2.2] },
    },
  ];

  /* ---------------- Rentrée de l'ailier côté pivot contre 1-5 (Tactique de match 03) ---------------- */
  const RENTREE_15_BASE = [
    {
      texte: "L'ailier droit s'engage sans ballon vers l'intérieur. L'arrière droit lui donne le ballon dans sa course et glisse à l'aile pour équilibrer.",
      courses: {
        AiD: { vers: [5.8, 7.8], via: [8.6, 5.6] },
        ArD: { vers: [8.8, 3.4], via: [8.2, 8.4] },
      },
      passe: ['ArD', 'AiD', 0.3],
      def: { D2: [5.0, 5.8] },
    },
    {
      texte: "L'ailier passe au demi-centre, qui a anticipé: il se décale à droite et devient arrière droit. L'ailier continue sa course devant le 3 bas.",
      courses: { AiD: [0.6, 7.6], DC: [3.6, 9.8] },
      passe: ['AiD', 'DC', 0.2],
    },
    {
      texte: "L'ailier poursuit jusqu'au côté opposé et pose un bloc sur le 2 gauche. Le 3 bas l'a suivi.",
      courses: { AiD: { vers: [-3.8, 6.6], via: [-1.8, 8.4], ecran: true } },
      def: { G2: [-4.6, 5.8], G3: [-2.2, 6.8] },
    },
    {
      texte: "Le demi-centre, devenu arrière droit, fixe dans l'intervalle et donne à l'arrière gauche.",
      courses: { DC: [3.0, 8.6], ArG: [-4.4, 9.2] },
      passe: ['DC', 'ArG', 0.5],
      def: { D2: [4.4, 6.2], D3: [1.2, 8.6] },
    },
    {
      texte: "L'arrière gauche fixe vers l'intérieur, entre le 2 et le 3 haut (l'avancé).",
      courses: { ArG: [-2.8, 8.6] },
      def: { D3: [-1.0, 9.2] },
    },
  ];

  /* ---------------- Entrée d'ailier masquée (contre 3-2-1) ---------------- */
  const MASQUEE_BASE = [
    {
      texte: "L'arrière droit passe au demi-centre. Le pivot monte en poste, à côté du 2 gauche.",
      courses: { Piv: { vers: [-3.0, 9.0], via: [-1.6, 7.4] } },
      passe: ['ArD', 'DC', 0.1],
    },
    {
      texte: "Le demi-centre sert le pivot, qui attire l'avancé.",
      passe: ['DC', 'Piv', 0.2],
      def: { D3: [-1.6, 9.4] },
    },
    {
      texte: "Le pivot passe à l'arrière gauche et reste en bloc sur le 2 gauche, côté intérieur.",
      courses: { Piv: { vers: [-3.7, 7.7], ecran: true } },
      passe: ['Piv', 'ArG', 0.2],
      def: { G2: [-4.6, 7.8], D3: [-1.0, 9.2] },
    },
  ];

  /* ---------------- Écran de l'ailier sur son défenseur (jojo7) ---------------- */
  const JOJO_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche.",
      passe: ['AiG', 'ArG', 0],
    },
    {
      texte: "L'arrière gauche donne au demi-centre. L'ailier gauche va bloquer son propre défenseur, le 1.",
      courses: { AiG: { vers: [-6.6, 3.8], ecran: true } },
      passe: ['ArG', 'DC', 0.2],
      def: { G1: [-7.4, 2.9] },
    },
    {
      texte: "Le demi-centre feinte une passe vers l'arrière droit. Pendant ce temps, l'arrière gauche court vers l'aile gauche, à l'extérieur du bloc.",
      courses: { DC: [0.6, 10.0], ArG: { vers: [-8.4, 5.6], via: [-7.6, 8.6] } },
    },
  ];

  /* ---------------- Ciudad (Approches n°126, É. Quintin) ---------------- */
  const CIUDAD_DROITE = [
    {
      texte: "L'arrière droit donne au demi-centre et rentre en 2e pivot, à l'opposé du pivot: il longe la zone vers la gauche.",
      courses: { ArD: { vers: [0.6, 7.6], via: [3.4, 7.6] } },
      passe: ['ArD', 'DC', 0.1],
    },
    {
      texte: "L'arrière droit s'installe entre le 3 et le 2 gauches. Le demi-centre temporise et \"renifle\" la nouvelle organisation de la défense, pendant que l'ailier droit remonte du corner vers les 9 m pour recevoir.",
      courses: { ArD: { vers: [-3.4, 6.6], via: [-1.2, 8.0] }, DC: [0.4, 9.6], AiD: [8.0, 6.8] },
      def: { G3: [-2.0, 7.0], D1: [7.6, 4.6] },
    },
    {
      texte: "Moment clé: le demi-centre transmet à l'ailier droit.",
      passe: ['DC', 'AiD', 0.2],
    },
    {
      texte: "L'ailier droit attaque \"avec rythme, originalité et virtuosité\" autour du pivot, vers l'intérieur du terrain.",
      courses: { AiD: { vers: [4.0, 7.2], via: [6.6, 6.2] } },
      def: { D2: [4.8, 6.0] },
    },
    { texte: "L'ailier droit tire.", tir: 'AiD' },
  ];
  const CIUDAD_GAUCHE = [
    {
      texte: "L'arrière gauche donne au demi-centre et rentre en 2e pivot, à l'opposé du pivot: il longe la zone vers la droite.",
      courses: { ArG: { vers: [-0.6, 7.6], via: [-3.4, 7.6] } },
      passe: ['ArG', 'DC', 0.1],
    },
    {
      texte: "L'arrière gauche s'installe entre le 3 et le 2 droits. Le demi-centre temporise et observe la nouvelle organisation de la défense, pendant que l'ailier gauche remonte du corner vers les 9 m pour recevoir.",
      courses: { ArG: { vers: [3.4, 6.6], via: [1.2, 8.0] }, DC: [-0.4, 9.6], AiG: [-8.0, 6.8] },
      def: { D3: [2.0, 7.0], G1: [-7.6, 4.6] },
    },
    {
      texte: "Moment clé: le demi-centre transmet à l'ailier gauche.",
      passe: ['DC', 'AiG', 0.2],
    },
    {
      texte: "L'ailier gauche attaque avec rythme autour du pivot, vers l'intérieur du terrain.",
      courses: { AiG: { vers: [-4.0, 7.2], via: [-6.6, 6.2] } },
      def: { G2: [-4.8, 6.0] },
    },
    { texte: "L'ailier gauche tire.", tir: 'AiG' },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'entree-derriere-ecrans',
      nom: '"3 - entrée derrière" avec écrans',
      alias: '3 - entrée derrière avec double écran, avec écran, et croisé direct sur écran (Dragør HK, f52-f54)',
      categorie: 'Ailiers',
      defense: '0-6',
      resume: "L'ailier droit passe à son arrière, court derrière toute la ligne arrière et vient poser un écran côté gauche, pour un tir de l'ailier gauche ou de l'arrière gauche.",
      description: [
        "Trois exercices de Dragør HK avec trois arrières et un ailier \"entrant\". L'ailier droit donne à l'arrière droit puis fait une longue course derrière toute la ligne arrière, vers la gauche, pendant que le ballon va de l'arrière droit au demi-centre puis à l'arrière gauche. Dragør précise que, dans les exercices à trois arrières, l'entrée est surtout montrée \"derrière\".",
        "Variante 1 (double écran, f52): l'ailier entrant et le demi-centre font écran sur les deux défenseurs gauches; l'ailier gauche coupe vers l'intérieur et tire. L'arrière gauche a trois façons de le servir: passe latérale, passe cuillère ou passe arrière.",
        "Variante 2 (écran, f53): l'arrière gauche attaque vers l'extérieur et emmène son défenseur avant que l'écran ne soit posé, puis repart à l'intérieur en dribble et tire grâce à l'autre écran, celui du demi-centre. Il doit veiller à \"ne pas refermer la défense\".",
        "Variante 3 (croisé direct sur écran, f54): c'est le joueur qui devait faire l'écran (le demi-centre) qui croise avec l'arrière gauche. L'arrière gauche anticipe ce croisé. Ici, l'ailier entrant fait écran sur le 3 gauche.",
        "Les textes sont courts et une partie des rôles (qui fait écran sur qui) vient des schémas: les placements sont déduits. Dragør juge ces combinaisons de tir avec écran \"plus adaptées pour une défense 6-0\". Le pivot n'intervient pas: il reste côté droit.",
      ],
      objectif: "Créer un surnombre côté gauche avec un ailier venu de l'autre aile, pour un tir derrière écran.",
      pointsCles: [
        "L'ailier droit court derrière les arrières, loin de la défense, pour ne pas être vu.",
        "Les écrans sont posés sans bousculer, bras le long du corps.",
        "L'arrière gauche ne referme pas la défense quand il revient à l'intérieur.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: '3 - entrée derrière avec double écran (Dragør HK, f52)',
          url: 'http://www.dragoerhb.dk/fransk/f52.html',
          note: "\"Le double écran est mis en place pour ALG qui sera le tireur. ARG en recevant vers l'avant a trois bonnes possibilités pour ALG.\"",
        },
        {
          titre: '3 - entrée derrière avec écran (Dragør HK, f53)',
          url: 'http://www.dragoerhb.dk/fransk/f53.html',
          note: "\"ARG attaque et emmène le défenseur externe avant la mise en place de l'écran. Ensuite elle repart interne, profite de l'écran par un dribble.\"",
        },
        {
          titre: '3 - entrée derrière et croisé direct sur écran (Dragør HK, f54)',
          url: 'http://www.dragoerhb.dk/fransk/f54.html',
          note: "\"C'est le joueur responsable de l'écran qui croise pour donner une solution de tir à ARG.\"",
        },
        {
          titre: 'Au sujet des exercices avec écran (Dragør HK, f51)',
          url: 'http://www.dragoerhb.dk/fransk/f51.html',
          note: "Les combinaisons de tir avec écran \"sont plus adaptées pour une défense 6 - 0\"; avec trois arrières, l'entrée est surtout montrée \"derrière\".",
        },
      ],
      depart: { Piv: [3.4, 6.3] },
      ballon: 'AiD',
      variantes: [
        {
          nom: "1 - Double écran, tir de l'ailier gauche (f52)",
          etapes: [
            ...DERRIERE_BASE,
            {
              texte: "Double écran: l'ailier droit vient bloquer le 2 gauche, le demi-centre bloque le 3 gauche.",
              courses: {
                AiD: { vers: [-4.2, 6.6], via: [-3.6, 8.6], ecran: true },
                DC: { vers: [-1.9, 7.7], ecran: true },
              },
              def: { G2: [-4.9, 5.6], G3: [-1.8, 6.7] },
            },
            {
              texte: "L'ailier gauche quitte son aile et coupe vers l'intérieur, dans le dos des deux écrans. L'arrière gauche lui donne le ballon (passe latérale, cuillère ou arrière).",
              courses: { AiG: { vers: [-3.0, 8.9], via: [-6.8, 7.0] }, ArG: [-5.6, 9.4] },
              passe: ['ArG', 'AiG', 0.7],
              def: { G1: [-6.6, 3.8] },
            },
            { texte: "L'ailier gauche tire au-dessus des écrans.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Écran, tir de l'arrière gauche (f53)",
          etapes: [
            ...DERRIERE_BASE,
            {
              texte: "L'arrière gauche attaque vers l'extérieur et emmène le 2 gauche avec lui. Le demi-centre vient bloquer le 3 gauche.",
              courses: { ArG: [-6.4, 7.8], DC: { vers: [-1.9, 7.7], ecran: true }, AiD: [-4.0, 9.8] },
              def: { G2: [-6.0, 5.8], G3: [-1.8, 6.7] },
            },
            {
              texte: "L'ailier droit pose alors son écran sur le 2 gauche, côté intérieur.",
              courses: { AiD: { vers: [-5.4, 6.8], ecran: true } },
            },
            {
              texte: "L'arrière gauche repart vers l'intérieur en dribble, au ras de l'écran, et arrive dans le dos de l'écran du demi-centre.",
              courses: { ArG: { vers: [-3.4, 8.6], via: [-5.4, 8.8] } },
            },
            { texte: "L'arrière gauche tire au-dessus de l'écran du demi-centre.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Croisé direct sur écran (f54)',
          etapes: [
            DERRIERE_BASE[0],
            DERRIERE_BASE[1],
            {
              texte: "Le demi-centre garde le ballon et attaque en diagonale vers le 2 gauche: c'est lui, le poseur d'écran, qui va croiser. L'ailier droit arrive dans le dos de la ligne arrière et vient bloquer le 3 gauche.",
              courses: { DC: [-3.8, 8.4], AiD: { vers: [-2.3, 7.6], via: [-1.0, 10.6], ecran: true } },
              def: { G2: [-4.6, 6.0], G3: [-1.9, 6.8] },
            },
            {
              texte: "L'arrière gauche, qui a anticipé, croise dans le dos du demi-centre et reçoit le ballon au croisement.",
              courses: { ArG: { vers: [-2.0, 9.4], via: [-4.6, 10.6] }, DC: [-4.6, 7.6] },
              passe: ['DC', 'ArG', 0.55],
              def: { G2: [-4.9, 6.2] },
            },
            { texte: "L'arrière gauche tire au-dessus de l'écran de l'ailier droit.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-et-rentree-polyvalence',
      nom: 'Croisé et rentrée ("La polyvalence")',
      alias: "Croisé et rentrée; Relation DC-arrières avec tir à l'opposé; Jeu pour une solution de tir à l'aile 1 et 2 (Dragør HK)",
      categorie: 'Ailiers',
      defense: 'Non précisé (dessinée contre 0-6)',
      resume: "Un croisé entre le demi-centre et un arrière, suivi d'une rentrée (de l'ailier ou de l'arrière) qui attire la défense et libère l'arrière opposé ou l'ailier.",
      description: [
        'Quatre formes courtes de la rubrique "La polyvalence" de Dragør HK. Toutes enchaînent un croisé avec le demi-centre et une rentrée vers les 6 m.',
        "Variante 1 (\"Croisé et rentrée\", f508): l'ailier gauche passe au demi-centre en faisant sa rentrée; le demi-centre croise avec l'arrière gauche, qui part vers le centre et donne à l'arrière droit; celui-ci fixe et passe à l'ailier gauche. Dragør précise que l'exercice \"peut être exécuté comme une combinaison d'attaque avec un seul joueur par position d'arrière\". Le texte s'arrête à la passe: le tir de l'ailier est ajouté.",
        "Variante 2 (\"Relation DC-arrières avec tir à l'opposé\", f511): le demi-centre croise avec l'arrière droit, qui rentre puis donne à l'arrière gauche, qui tire.",
        "Variantes 3 et 4 (\"Jeu pour une solution de tir à l'aile 1 et 2\", f504 et f504a): ailier gauche vers arrière gauche vers demi-centre; le demi-centre croise avec l'arrière droit, qui rentre; l'ailier gauche tire. En 1, le ballon lui vient de l'arrière droit rentré. En 2, c'est le demi-centre qui lui passe: le croisé est dessiné ici à vide (l'arrière droit passe sans ballon), ce que le texte ne dit pas.",
        "Les textes sont très brefs: les placements et la direction des rentrées sont déduits. Le pivot n'intervient pas; il reste écarté à droite.",
      ],
      objectif: "Faire rentrer un joueur après un croisé pour attirer la défense vers le centre et libérer un tir à l'opposé ou à l'aile.",
      pointsCles: [
        "Le croisé doit fixer le 3 avant la passe.",
        "La rentrée se fait sans ballon, au ras de la zone.",
        "L'ailier qui doit tirer reste écarté jusqu'à la passe.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Croisé et rentrée (Dragør HK, f508)',
          url: 'http://www.dragoerhb.dk/fransk/f508.html',
          note: "\"ALG passe à DC tout en faisant une rentrée d'aile. DC croise avec ARG et lui passe. ARG part vers le centre et passe à ARD qui fixe et passe à ALG.\"",
        },
        {
          titre: "Relation DC-arrières avec tir à l'opposé (Dragør HK, f511)",
          url: 'http://www.dragoerhb.dk/fransk/f511.html',
          note: '"DC effectue un croisé avec ARD qui fait une rentrée et qui fait ensuite la passe à ARG. Celui-ci prend le tir."',
        },
        {
          titre: "Jeu pour une solution de tir à l'aile 1 (Dragør HK, f504)",
          url: 'http://www.dragoerhb.dk/fransk/f504.html',
          note: "ALG vers ARG (fixe) vers DC; DC croise avec ARD qui effectue une rentrée; le ballon est passé à ALG qui tire.",
        },
        {
          titre: "Jeu pour une solution de tir à l'aile 2 (Dragør HK, f504a)",
          url: 'http://www.dragoerhb.dk/fransk/f504a.html',
          note: '"DC croise avec ARD puis passe à ALG qui tire."',
        },
      ],
      depart: { Piv: [6.4, 4.6] },
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Rentrée de l'ailier gauche (f508)",
          etapes: [
            {
              texte: "L'ailier gauche passe au demi-centre et commence aussitôt sa rentrée le long des 6 m.",
              courses: { AiG: { vers: [-4.0, 6.9], via: [-7.0, 5.6] }, DC: [-0.6, 10.0] },
              passe: ['AiG', 'DC', 0],
            },
            {
              texte: "Le demi-centre attaque en diagonale vers la gauche pour croiser avec l'arrière gauche. Le 3 gauche sort sur lui.",
              courses: { DC: [-2.8, 8.6] },
              def: { G3: [-2.4, 7.3] },
            },
            {
              texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit vers le centre. L'ailier gauche poursuit sa rentrée dans le dos du 3 gauche.",
              courses: {
                ArG: { vers: [-0.4, 9.0], via: [-3.4, 10.4] },
                DC: [-3.8, 8.0],
                AiG: { vers: [-0.8, 7.4], via: [-2.4, 6.2] },
              },
              passe: ['DC', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche continue vers le centre et donne à l'arrière droit. L'ailier gauche poursuit sa course vers la droite.",
              courses: { ArG: [0.8, 9.2], ArD: [4.8, 8.6], AiG: { vers: [3.0, 7.2], via: [1.0, 6.6] } },
              passe: ['ArG', 'ArD', 0.5],
              def: { D3: [1.4, 7.6], D2: [4.9, 6.0] },
            },
            {
              texte: "L'arrière droit fixe le 2 droit et donne à l'ailier gauche rentré.",
              courses: { AiG: [3.2, 7.0] },
              passe: ['ArD', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire depuis le poste de pivot.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Rentrée de l'arrière droit, tir à l'opposé (f511)",
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre attaque en diagonale vers la droite. Le 3 droit sort sur lui.",
              courses: { DC: [2.8, 8.6] },
              def: { D3: [2.4, 7.3] },
            },
            {
              texte: "Croisé: l'arrière droit passe dans le dos du demi-centre et reçoit vers le centre.",
              courses: { ArD: { vers: [0.4, 9.0], via: [3.4, 10.4] }, DC: [3.8, 8.0] },
              passe: ['DC', 'ArD', 0.55],
            },
            {
              texte: "L'arrière droit poursuit vers les 6 m entre les deux 3 (rentrée) et attire le 3 gauche. Il donne à l'arrière gauche.",
              courses: { ArD: [-0.6, 7.4], ArG: [-4.2, 9.0] },
              passe: ['ArD', 'ArG', 0.6],
              def: { G3: [-1.6, 6.9] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "3 - Tir à l'aile après la rentrée de l'arrière droit (f504)",
          etapes: [
            ...POLY_504_DEBUT,
            {
              texte: "Croisé: l'arrière droit passe dans le dos du demi-centre et reçoit vers le centre.",
              courses: { ArD: { vers: [0.2, 9.2], via: [3.4, 10.4] }, DC: [3.6, 8.2] },
              passe: ['DC', 'ArD', 0.55],
            },
            {
              texte: "L'arrière droit enchaîne une rentrée vers la gauche, entre le 3 et le 2 gauches. Le 2 se resserre sur lui et le 1 glisse vers l'intérieur.",
              courses: { ArD: { vers: [-3.2, 7.2], via: [-1.4, 8.2] } },
              def: { G2: [-4.2, 6.2], G3: [-2.0, 6.8], G1: [-6.6, 3.8] },
            },
            {
              texte: "L'arrière droit donne à l'ailier gauche, resté écarté.",
              courses: { AiG: [-8.8, 2.0] },
              passe: ['ArD', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "4 - Le demi-centre sert l'ailier (f504a)",
          etapes: [
            ...POLY_504_DEBUT,
            {
              texte: "Croisé: l'arrière droit passe dans le dos du demi-centre, qui garde le ballon.",
              courses: { ArD: { vers: [0.2, 9.2], via: [3.4, 10.4] }, DC: [3.6, 8.2] },
              def: { D3: [1.6, 7.4] },
            },
            {
              texte: "L'arrière droit poursuit sa rentrée vers la gauche et attire le 2 et le 1 gauches. Le demi-centre fait une passe longue à l'ailier gauche.",
              courses: { ArD: { vers: [-3.2, 7.2], via: [-1.4, 8.2] }, AiG: [-8.8, 2.0] },
              passe: ['DC', 'AiG', 0.6],
              def: { G2: [-4.2, 6.2], G3: [-2.0, 6.8], G1: [-6.6, 3.8] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-combinaison-croises',
      nom: 'Entrée avec combinaison de croisés',
      alias: 'Overgang/Krydskombination (DA); Dragør HK, f1113',
      categorie: 'Ailiers',
      defense: 'Non précisé (dessinée contre 0-6)',
      resume: "L'ailier gauche rentre, reçoit en course, croise avec l'arrière droit puis bloque le 2 droit: l'ailier droit rentre grâce au bloc et tire.",
      description: [
        "L'ailier gauche passe à l'arrière gauche et court vers l'intérieur. Le ballon passe au demi-centre, qui le rend à l'ailier en course. L'ailier donne à l'arrière droit, qui court vers la gauche, puis bloque le 2; l'ailier droit rentre vers l'intérieur grâce au bloc, reçoit de l'arrière droit et tire.",
        "Dragør note le défenseur \"2G\". Comme l'ailier droit profite du bloc, la fiche le place sur le 2 du côté droit de l'attaque (la notation des défenseurs varie selon les traducteurs du site). Le croisé entre l'ailier gauche et l'arrière droit est déduit de leurs courses opposées.",
      ],
      objectif: "Amener l'ailier gauche jusqu'au côté opposé pour qu'il y bloque et libère l'ailier droit.",
      pointsCles: [
        "L'ailier gauche reste en course quand il reçoit, pour enchaîner sans arrêt.",
        "Le bloc se pose sur le 2 droit avant que l'ailier droit ne démarre.",
        "L'ailier droit attend le bloc pour rentrer à l'intérieur.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Entrée avec combinaison de croisés (Dragør HK, f1113)',
          url: 'http://www.dragoerhb.dk/fransk/f1113.html',
          note: "ALG vers ARG puis court vers le 2; ARG vers DC qui remet à ALG; ALG donne à ARD (qui court vers la gauche) puis bloque; \"ALD court à l'intérieur grâce au bloc, reçoit de ARD et tire\".",
        },
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche et part aussitôt vers l'intérieur.",
          courses: { AiG: { vers: [-4.6, 6.8], via: [-8.0, 5.6] } },
          passe: ['AiG', 'ArG', 0],
        },
        {
          texte: "L'arrière gauche donne au demi-centre. L'ailier continue sa course le long de la défense.",
          courses: { AiG: { vers: [-1.2, 7.8], via: [-3.0, 7.2] }, DC: [-1.2, 10.0] },
          passe: ['ArG', 'DC', 0.1],
        },
        {
          texte: "Le demi-centre rend le ballon à l'ailier, en course.",
          courses: { AiG: [0.6, 7.8] },
          passe: ['DC', 'AiG', 0.2],
        },
        {
          texte: "L'arrière droit court vers la gauche. L'ailier gauche, qui continue vers la droite, lui donne le ballon au croisement.",
          courses: { ArD: { vers: [1.0, 9.2], via: [3.4, 9.6] }, AiG: [3.0, 7.2] },
          passe: ['AiG', 'ArD', 0.5],
          def: { D3: [1.4, 7.6] },
        },
        {
          texte: "L'ailier gauche pose un bloc sur le 2 droit. L'ailier droit rentre vers l'intérieur, à l'extérieur du bloc.",
          courses: {
            AiG: { vers: [4.0, 6.4], ecran: true },
            AiD: { vers: [5.4, 7.4], via: [8.4, 5.6] },
            ArD: [1.4, 9.0],
          },
          def: { D2: [4.8, 5.6], D1: [7.6, 3.4] },
        },
        {
          texte: "L'arrière droit lui donne le ballon.",
          passe: ['ArD', 'AiD', 0.2],
        },
        { texte: "L'ailier droit tire.", tir: 'AiD' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'circulation-surprise-ailier',
      nom: "Circulation surprise de l'ailier opposé",
      alias: 'Circulaciones sorpresivas de los extremos por detrás de la defensa (ES); "cruce en un lado con circulación por el interior del extremo contrario" (Sánchez, 1992)',
      categorie: 'Ailiers',
      defense: 'Défenses en deux lignes; 0-6',
      resume: "Pendant un croisé d'un côté, l'ailier opposé au ballon court dans le dos de la défense, à contre-sens du ballon, et surgit pour recevoir.",
      description: [
        "J. L. Antón García (2010) décrit ces \"circulations surprises\" des années 1970-80: un croisé se joue d'un côté pendant que l'ailier situé à l'opposé du ballon court dans le dos de la défense, \"généralement à contre-sens de la circulation du ballon\", hors du champ de vision des défenseurs. S'il n'y a rien, il revient à son poste et l'autre ailier fait la même chose. Le procédé est attribué à Sánchez (1992). À l'origine, l'attaque joue en 3:2 sans pivot (Antón traite l'attaque à 5 contre 6): dans la variante 1, le pivot reste donc écarté et ne joue pas.",
        "Román (1990) décrit aussi une circulation de l'ailier par l'extérieur (par la zone des 9 m), mêlée à des croisés de la première ligne, contre les défenses en deux lignes. Le texte ne donne pas de déroulement: elle n'est pas dessinée.",
        "Les variantes 2 à 4 viennent d'un forum espagnol (balonmano.mforos.com, 2005). En 2, le pivot sort recevoir et rend à l'arrière gauche en simulant un écran: le 3 sort aider et l'ailier droit arrive vers le point de penalty. En 3, croisé demi-centre / arrière droit, puis l'arrière gauche va vers le centre pendant que le pivot glisse vers l'extérieur: l'ailier droit entre dans le trou laissé par le 3. En 4 (\"retour de circulation\"), l'ailier fait une longue circulation, puis revient quand le ballon revient de son côté et surgit au bloc du pivot. Ce sont des messages de forum sans schéma: les placements sont déduits.",
      ],
      objectif: "Surprendre la défense, attirée par le ballon, avec un ailier qui arrive dans son dos du côté opposé.",
      pointsCles: [
        "L'ailier part quand les défenseurs regardent le ballon, et court à contre-sens du ballon.",
        "Il reste hors de la zone et au ras des défenseurs.",
        "S'il n'est pas servi, il revient vite à son poste.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'J. L. Antón García, Uso del "portero falso" en inferioridad numérica atacante (e-balonmano.com, 2010), p. 7',
          url: 'https://dialnet.unirioja.es/descarga/articulo/3253764.pdf',
          note: '"uno de los dos extremos -generalmente el situado en el lado contrario al balón- circulaba por detrás de la defensa tratando de sorprender a ésta [...] en sentido contrario a la circulación del balón".',
        },
        {
          titre: 'Circulación de los extremos (forum balonmano.mforos.com, 2005)',
          url: 'https://balonmano.mforos.com/142972/2903096-circulacion-de-los-extremos/',
          note: 'Messages "Handbol" (ailier droit servi vers le point de penalty; entrée dans le trou du 3) et "wax79" (retour de circulation au bloc du pivot).',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Croisé d'un côté, ailier opposé (Sánchez)",
          depart: { Piv: [-6.6, 4.4] },
          etapes: [
            ...SURPRISE_CROISE_GAUCHE,
            {
              texte: "L'arrière gauche attaque entre les deux 3 et attire le 3 droit. L'ailier droit continue sa course à contre-sens du ballon, dans le dos du 3 droit.",
              courses: { ArG: [0.6, 8.4], AiD: { vers: [-0.8, 6.6], via: [1.6, 6.0] } },
            },
            {
              texte: "L'arrière gauche donne à l'ailier droit, arrivé dans le dos de la défense.",
              passe: ['ArG', 'AiD', 0.3],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '2 - Pivot sorti, ailier au point de penalty (forum)',
          ballon: 'ArG',
          depart: { Piv: [-3.2, 6.3] },
          etapes: [
            {
              texte: "Le pivot sort à la rencontre de l'arrière gauche, qui lui donne le ballon.",
              courses: { Piv: { vers: [-3.6, 8.2], via: [-3.0, 7.4] } },
              passe: ['ArG', 'Piv', 0.5],
              def: { G2: [-4.4, 6.4] },
            },
            {
              texte: "Le pivot rend aussitôt à l'arrière gauche en simulant un écran. Le 3 gauche sort pour aider. À cet instant, l'ailier droit part sans ballon le long des 6 m.",
              courses: { ArG: [-5.0, 8.8], Piv: [-4.0, 7.6], AiD: { vers: [4.4, 6.3], via: [7.6, 5.2] } },
              passe: ['Piv', 'ArG', 0.2],
              def: { G3: [-2.6, 7.6], D3: [0.6, 7.6] },
            },
            {
              texte: "L'ailier droit arrive vers le point de penalty, dans l'espace laissé par le 3 gauche. L'arrière gauche le sert.",
              courses: { AiD: { vers: [-0.4, 7.0], via: [1.8, 6.0] } },
              passe: ['ArG', 'AiD', 0.6],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '3 - Pivot qui glisse, ailier dans le trou (forum)',
          depart: { Piv: [-3.2, 6.3] },
          etapes: [
            {
              texte: "Le demi-centre attaque en diagonale vers la droite. Le 3 droit sort sur lui.",
              courses: { DC: [2.6, 8.6] },
              def: { D3: [2.3, 7.4] },
            },
            {
              texte: "Croisé: l'arrière droit passe dans le dos du demi-centre et reçoit vers le centre.",
              courses: { ArD: { vers: [-0.2, 9.0], via: [3.2, 10.4] }, DC: [3.6, 7.9] },
              passe: ['DC', 'ArD', 0.55],
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, qui va vers le centre. Le pivot glisse vers l'extérieur; le 3 gauche sort au contact de l'arrière gauche. L'ailier droit part dans le dos de la défense.",
              courses: {
                ArG: [-2.2, 9.0],
                Piv: { vers: [-6.4, 4.6], via: [-5.0, 6.4] },
                AiD: { vers: [4.2, 6.3], via: [7.8, 5.0] },
              },
              passe: ['ArD', 'ArG', 0.3],
              def: { G3: [-2.2, 7.7] },
            },
            {
              texte: "L'ailier droit entre par surprise dans le trou laissé par le 3 gauche et reçoit de l'arrière gauche.",
              courses: { AiD: { vers: [-1.4, 6.8], via: [1.6, 6.1] } },
              passe: ['ArG', 'AiD', 0.6],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '4 - Retour de circulation au bloc du pivot (forum)',
          ballon: 'AiG',
          depart: { Piv: [-3.2, 6.3] },
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche et part en longue circulation le long de la défense, vers l'autre côté.",
              courses: { AiG: { vers: [-1.6, 7.8], via: [-6.0, 7.4] } },
              passe: ['AiG', 'ArG', 0],
            },
            {
              texte: "L'arrière gauche donne au demi-centre. L'ailier continue vers la droite.",
              courses: { AiG: { vers: [3.4, 7.0], via: [1.0, 7.8] } },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              courses: { ArD: [5.0, 9.0] },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "Le ballon revient: l'arrière droit rend au demi-centre. L'ailier repart vers son côté, le long de la défense.",
              courses: { AiG: { vers: [-1.0, 7.6], via: [1.0, 7.6] } },
              passe: ['ArD', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche. Le pivot bloque le 3 gauche par l'extérieur.",
              courses: { Piv: { vers: [-2.6, 6.5], ecran: true } },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche attaque vers l'extérieur et entraîne le 2 gauche. L'ailier surgit au ras du bloc du pivot et reçoit.",
              courses: { ArG: [-6.6, 8.4], AiG: { vers: [-4.0, 7.2], via: [-2.6, 7.8] } },
              passe: ['ArG', 'AiG', 0.65],
              def: { G2: [-6.2, 7.0] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'quel-choix-aile',
      nom: '"Quel choix?" à l\'aile gauche',
      alias: "Quel choix? f734-f738 (Dragør HK): attaque placée, passe, entrée DC, remise à l'ailier, remise à ARG",
      categorie: 'Ailiers',
      defense: 'Non précisé (dessinée contre 0-6)',
      resume: "L'arrière gauche s'engage, l'ailier gauche court entre le 1 et le 2: selon les réactions du 2 et du 1, le ballon va à l'arrière, à l'ailier, au demi-centre parti à l'aile, ou revient à l'ailier ou à l'arrière.",
      description: [
        "Cinq fiches courtes de Dragør HK forment un arbre de lecture côté gauche. Au départ, attaque placée habituelle: l'arrière gauche s'engage vers l'intérieur et l'ailier gauche court entre le 1 et le 2.",
        "Si le 2 peut revenir défendre sur l'arrière, passe rapide à l'ailier, l'arrière faisant comme si la passe était pour lui (variante 2). Si le 1 suit l'ailier à l'intérieur, le demi-centre s'engage vite à l'aile, reçoit et tire (variante 3). Si le 1 peut alors défendre sur le demi-centre, remise à l'ailier, entré et en bloc sur le 2 (variante 4). Si le 2 peut se replacer, le ballon va à l'arrière gauche \"en bloc\", par l'ailier ou par le demi-centre (variante 5).",
        "Les textes sont très brefs (le détail est dans les schémas): placements, porteur de départ (le demi-centre) et tirs sont déduits. Dragør note les défenseurs \"1D, 2D\": la fiche les lit comme le 1 et le 2 du côté gauche de l'attaque. La variante 1 montre simplement le tir de l'arrière engagé.",
        "Voir aussi \"Entrée d'ailier 1 à 6 - Quel choix?\" dans la fiche \"Rentrée d'ailier\".",
      ],
      objectif: "Apprendre à lire le 2 et le 1 pour choisir le bon receveur côté gauche.",
      pointsCles: [
        "L'arrière qui ne reçoit pas fait quand même comme si la passe était pour lui.",
        "Le demi-centre part à l'aile dès que le 1 suit l'ailier à l'intérieur.",
        "L'ailier entré bloque le 2 pour garder une solution de remise.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Quel choix? - attaque placée (Dragør HK, f734)',
          url: 'http://www.dragoerhb.dk/fransk/f734.html',
          note: "Attaque placée habituelle: ARG s'engage interne et ALG court entre les défenseurs 1 et 2.",
        },
        {
          titre: 'Quel choix? - passe (Dragør HK, f736)',
          url: 'http://www.dragoerhb.dk/fransk/f736.html',
          note: "Si le 2 peut revenir défendre: passe rapide à ALG, ARG faisant comme si la passe était pour lui. \"Mais si le défenseur de l'ailier le suit? Voyez l'alternative 3.\"",
        },
        {
          titre: 'Quel choix? - entrée DC (Dragør HK, f737)',
          url: 'http://www.dragoerhb.dk/fransk/f737.html',
          note: "Si l'ailier défensif suit ALG à l'intérieur: DC s'engage vite à l'aile, reçoit et tire.",
        },
        {
          titre: "Quel choix? - remise à l'ailier (Dragør HK, f738)",
          url: 'http://www.dragoerhb.dk/fransk/f738.html',
          note: 'Si le 1 peut défendre sur DC: remise à ALG entré et en bloc sur le 2.',
        },
        {
          titre: 'Quel choix? - remise à ARG (Dragør HK, f735)',
          url: 'http://www.dragoerhb.dk/fransk/f735.html',
          note: 'Si le 2 peut se replacer: balle à ARG "en bloc", par ALG ou DC.',
        },
      ],
      depart: { Piv: [3.4, 6.3] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Attaque placée: tir de l'arrière gauche",
          etapes: [
            ...QC_BASE,
            {
              texte: "Le 2 reste vers l'ailier: le demi-centre donne à l'arrière gauche, engagé entre le 2 et le 3.",
              courses: { ArG: [-3.4, 8.2] },
              passe: ['DC', 'ArG', 0.2],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Passe rapide à l'ailier",
          etapes: [
            ...QC_BASE,
            QC_PASSE_AILIER,
            { texte: "L'ailier gauche tire entre le 1 et le 2.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Le demi-centre à l'aile",
          etapes: [
            ...QC_BASE,
            QC_PASSE_AILIER,
            QC_DC_AILE,
            { texte: "Le demi-centre tire depuis l'aile.", tir: 'DC' },
          ],
        },
        {
          nom: "4 - Remise à l'ailier en bloc",
          etapes: [
            ...QC_BASE,
            QC_PASSE_AILIER,
            QC_DC_AILE,
            {
              texte: "Le 1 ressort sur le demi-centre. L'ailier, entré, pose un bloc sur le 2; le demi-centre lui remet le ballon.",
              courses: { AiG: { vers: [-5.0, 6.2], ecran: true } },
              passe: ['DC', 'AiG', 0.5],
              def: { G1: [-7.6, 3.8] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "5 - Remise à l'arrière gauche en bloc",
          etapes: [
            ...QC_BASE,
            QC_PASSE_AILIER,
            {
              texte: "Le 2 se replace sur l'ailier. L'arrière gauche, au contact du 3, est libre: l'ailier lui donne le ballon.",
              courses: { ArG: { vers: [-3.0, 7.6], ecran: true } },
              passe: ['AiG', 'ArG', 0.4],
              def: { G2: [-5.2, 5.8], G3: [-2.2, 6.9] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ailier-contourne-arriere',
      nom: "L'ailier contourne l'arrière au 9 m",
      alias: '"Kombinace č. 4" (Plzeň, CZ, sans nom)',
      categorie: 'Ailiers',
      defense: 'Non précisé (dessinée contre 0-6)',
      resume: "Pendant la passe du demi-centre à l'arrière, l'ailier contourne son arrière au niveau des 9 m et reçoit lancé face à l'intervalle entre le 2 et le 3.",
      description: [
        "Combinaison de l'équipe de Plzeň relevée par K. Kubišová (Prague, 2020). Pendant la passe du demi-centre à l'arrière latéral, l'ailier quitte son poste et contourne l'arrière au niveau des 9 m. Il continue vers le centre et reçoit quand sa course devient perpendiculaire à la défense, face à l'intervalle entre le 2 et le 3. La passe se fait à bonne distance de la défense.",
        "Fins: tir à mi-distance (variante 1) ou passe au pivot (variante 2). L'action est parfois enchaînée par un croisé de l'ailier avec l'arrière latéral opposé.",
        "Le côté (ici à gauche) et le placement du pivot (au centre) ne sont pas précisés par la source.",
      ],
      objectif: "Faire arriver l'ailier lancé, de loin, dans un intervalle central.",
      pointsCles: [
        "L'ailier part pendant la passe du demi-centre à l'arrière.",
        "Il contourne l'arrière au niveau des 9 m, loin de la défense.",
        "La passe arrive quand sa course est perpendiculaire à la défense.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál (Univ. Charles, Prague, 2020), p. 30',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: "Plzeň, combinaison n° 4: l'ailier contourne l'arrière latéral au niveau des 9 m, reçoit face à l'intervalle 2-3; tir à mi-distance ou passe au pivot.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Tir à mi-distance',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche. Pendant la passe, l'ailier gauche quitte son poste et contourne l'arrière par l'extérieur, au niveau des 9 m.",
              courses: { ArG: [-5.2, 9.2], AiG: { vers: [-6.8, 10.8], via: [-9.2, 8.0] } },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'ailier continue vers le centre dans le dos de l'arrière, puis s'oriente face à l'intervalle entre le 2 et le 3 gauches. L'arrière lui donne le ballon quand sa course devient perpendiculaire à la défense.",
              courses: { AiG: { vers: [-3.4, 9.0], via: [-3.8, 11.2] } },
              passe: ['ArG', 'AiG', 0.7],
            },
            {
              texte: "L'ailier attaque l'intervalle et tire à mi-distance.",
              courses: { AiG: [-3.2, 8.4] },
              tir: { par: 'AiG', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche. Pendant la passe, l'ailier gauche quitte son poste et contourne l'arrière par l'extérieur, au niveau des 9 m.",
              courses: { ArG: [-5.2, 9.2], AiG: { vers: [-6.8, 10.8], via: [-9.2, 8.0] } },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'ailier continue vers le centre puis s'oriente face à l'intervalle entre le 2 et le 3 gauches. L'arrière lui donne le ballon.",
              courses: { AiG: { vers: [-3.4, 9.0], via: [-3.8, 11.2] } },
              passe: ['ArG', 'AiG', 0.7],
            },
            {
              texte: "Le 3 gauche sort sur l'ailier, qui donne au pivot.",
              courses: { AiG: [-3.0, 8.4], Piv: [-1.0, 6.4] },
              passe: ['AiG', 'Piv', 0.5],
              def: { G3: [-2.6, 7.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ubergang-ailier',
      nom: "Passage au pivot de l'ailier (Übergang)",
      alias: 'Übergang von Außen 1/2/3, Schwarz 1/2, "RM kreuzt mit RL - RM setzt sich auf LA ab" (DE)',
      categorie: 'Ailiers',
      defense: 'Non précisé (Schwarz 2: défense offensive)',
      resume: "Un ailier quitte son aile pour devenir second pivot (ou laisse son aile à un arrière): quatre enchaînements allemands.",
      description: [
        "Le site handballhaus.de classe ces actions parmi les \"Übergänge\" (passages au pivot). Variante 1 (\"Übergang von Außen\"): juste après sa passe à l'arrière gauche, l'ailier gauche devient pivot droit. Le ballon fait le tour jusqu'à l'ailier droit, qui sert l'arrière droit lancé; celui-ci joue \"Sperre-Absetzen\" (bloc puis décalage) avec l'ailier devenu pivot. Autres fins citées: l'ailier droit sert le demi-centre, qui perce entre le 1 et le 2 grâce à un écran indirect, ou l'arrière gauche, venu compenser à l'aile.",
        "Variante 2 (\"Schwarz\"): passes ailier droit vers arrière droit vers demi-centre; le demi-centre sert le pivot qui sort vite; le pivot remet le ballon \"dans l'écran\" à l'arrière gauche qui arrive; demi-centre et arrière droit glissent; l'ailier droit passe pivot et pose un écran de face sur le demi défensif; l'arrière gauche donne au demi-centre, qui perce entre le 1 et le 2. Variante 3 (\"Schwarz 2\", contre une défense offensive): l'arrière gauche sert directement l'ailier droit qui rentre.",
        "Variante 4 (\"RM kreuzt mit RL - RM setzt sich auf LA ab\"): le demi-centre croise avec l'arrière gauche; l'arrière gauche s'élève à distance et lui rend; le demi-centre se glisse par le poste d'arrière jusqu'à l'aile pendant que l'ailier gauche rentre au bon moment; si le 1 ne prend pas le demi-centre, tir de l'aile.",
        "La Fédération de Bade (BHV) range aussi le passage de l'ailier au pivot parmi les réponses à une défense offensive: l'ailier qui passe pivot avec le ballon crée un \"Miss-Match\". Textes courts et animations non vues: les placements sont déduits.",
      ],
      objectif: "Passer de trois à quatre joueurs près de la défense pour la déséquilibrer et ouvrir un intervalle.",
      pointsCles: [
        "L'ailier part juste après sa passe, sans attendre.",
        "Les arrières compensent l'aile laissée libre.",
        "Le bloc de l'ailier devenu pivot doit être posé avant l'attaque de l'arrière.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Übergang (handballhaus.de, rubrique Angriffstaktik)',
          url: 'http://www.handballhaus.de/handball/angriffstaktik/uebergang/',
          note: 'Fiches "Übergang von Außen", "Schwarz 1/2" et "RM kreuzt mit RL - RM setzt sich auf LA ab" (textes courts et animations).',
        },
        {
          titre: 'P. Streicher, Angriff gegen offensive Abwehr (Badischer Handball-Verband, formation licence B), p. 33-38',
          url: 'https://www.badischer-hv.de/fileadmin/bhv/Bilder_und_Dokumente/Bildung/B_Ausbildung_21/Angriff_gegen_offensive_Abwehr_PDF.pdf',
          note: "\"Übergang LA - Weiterspielen mit RL(LA)-RM(RL)-RR-RA-KL-KR\"; \"LA/RA mit Ball in KR/KL ... 'Miss-Match'-Situation\".",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Übergang von Außen: l'ailier gauche devient pivot droit",
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche et part aussitôt le long de la défense.",
              courses: { AiG: { vers: [-3.0, 7.4], via: [-6.8, 6.8] } },
              passe: ['AiG', 'ArG', 0],
            },
            {
              texte: "L'arrière gauche donne au demi-centre. L'ailier traverse et s'installe en pivot droit, entre le 3 et le 2 droits.",
              courses: { AiG: { vers: [3.6, 6.4], via: [0.4, 7.8] } },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit donne à l'ailier droit et recule pour reprendre de l'élan.",
              courses: { ArD: [5.8, 10.0] },
              passe: ['ArD', 'AiD', 0.2],
            },
            {
              texte: "L'ailier droit rend à l'arrière droit, lancé. Le 2 droit sort sur lui; l'ailier gauche, devenu pivot, le bloque.",
              courses: { ArD: [4.4, 8.4], AiG: { vers: [3.7, 6.5], ecran: true } },
              passe: ['AiD', 'ArD', 0.2],
              def: { D2: [4.6, 6.6] },
            },
            {
              texte: "Le 3 droit vient aider sur l'arrière droit: l'ailier se décale du bloc vers l'intervalle libéré et reçoit.",
              courses: { AiG: [2.2, 6.3] },
              passe: ['ArD', 'AiG', 0.5],
              def: { D3: [3.4, 7.8] },
            },
            { texte: "L'ailier gauche tire depuis le poste de pivot.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Schwarz: le demi-centre perce entre le 1 et le 2',
          ballon: 'AiD',
          etapes: [
            ...SCHWARZ_BASE,
            {
              texte: "L'arrière gauche donne au demi-centre, qui perce entre le 2 et le 1 droits, à côté de l'écran de l'ailier. Le pivot redescend.",
              courses: { DC: { vers: [6.0, 7.2], via: [4.6, 9.2] }, Piv: [-1.0, 6.4] },
              passe: ['ArG', 'DC', 0.2],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "3 - Schwarz 2: passe directe à l'ailier rentré",
          ballon: 'AiD',
          etapes: [
            ...SCHWARZ_BASE,
            {
              texte: "Contre une défense offensive, le 2 droit sort haut. L'ailier droit rentre dans son dos et l'arrière gauche le sert directement.",
              courses: { AiD: [4.0, 6.3], Piv: [-1.0, 6.4] },
              passe: ['ArG', 'AiD', 0.4],
              def: { D2: [5.4, 7.0] },
            },
            { texte: "L'ailier droit tire depuis le poste de pivot.", tir: 'AiD' },
          ],
        },
        {
          nom: "4 - Le demi-centre se glisse à l'aile gauche",
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre attaque en diagonale vers la gauche. Le 3 gauche sort sur lui.",
              courses: { DC: [-2.6, 8.6] },
              def: { G3: [-2.3, 7.4] },
            },
            {
              texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit vers le centre.",
              courses: { ArG: { vers: [-0.4, 9.2], via: [-3.4, 10.4] }, DC: [-3.8, 8.2] },
              passe: ['DC', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche s'élève à distance et rend au demi-centre, qui se glisse par le poste d'arrière gauche vers l'aile. Au même moment, l'ailier gauche rentre; le 1 le suit.",
              courses: {
                DC: { vers: [-6.4, 6.2], via: [-5.4, 8.4] },
                AiG: { vers: [-4.0, 6.4], via: [-7.6, 5.6] },
              },
              passe: ['ArG', 'DC', 0.4],
              def: { G1: [-6.0, 4.6] },
            },
            {
              texte: "Le 1 n'a pas repris le demi-centre: celui-ci s'avance à l'aile et tire.",
              courses: { DC: [-7.8, 4.4] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'nachlaufer',
      nom: 'Nachläufer ("le suiveur")',
      alias: 'Nachläufer 1 / 2; Nachläufer 11 / 22, "Nachläufer 1 umgekehrt" (DE)',
      categorie: 'Ailiers',
      defense: 'Non précisé (dessinée contre 0-6)',
      resume: "Le demi-centre fait une passe longue à l'ailier puis bloque le 2; l'ailier rentre et reçoit au poste d'arrière (1/2). En version inversée, c'est l'ailier qui bloque et le demi-centre qui part vers l'extérieur (11/22).",
      description: [
        "Combinaisons d'un club allemand, jouées \"dès les moins de 13 ans\", décrites sur le forum handballecke.de (2005). Le pivot doit rester de l'autre côté pour ne pas gêner.",
        "Nachläufer 1 (variante 1): le demi-centre fait une passe longue à l'ailier gauche, puis bloque le demi défensif de ce côté; l'ailier donne à l'arrière gauche, qui attaque vers le poste de demi-centre et attire le 3; l'ailier rentre et reçoit en position d'arrière gauche, \"là où son défenseur est bloqué\", pour un tir libre. Nachläufer 2 = même chose à droite. Le texte dit que le demi-centre bloque \"en direction du milieu\": l'orientation exacte du bloc est incertaine.",
        "Nachläufer 11 (variante 2, \"Nachläufer 1 à l'envers\"): l'ailier gauche fait une passe longue au demi-centre, puis pose depuis l'aile un écran sur le demi défensif; le demi-centre donne à l'arrière gauche, qui attire le défenseur extérieur vers l'extérieur; l'arrière rend au demi-centre, qui a couru vers l'extérieur, au-delà de l'écran: il est libre devant le but. Nachläufer 22 = à droite.",
        "Messages de forum sans schéma: placements déduits. Le site handballhaus.de décrit sous le même nom une autre action (contre 3-2-1 ou 5-1: l'ailier gauche court devant la défense jusqu'au poste de pivot droit et le pivot \"suit\" dans un intervalle).",
      ],
      objectif: "Libérer un tir au poste d'arrière pour un joueur qui arrive de l'aile (ou du centre) derrière un bloc.",
      pointsCles: [
        "Le pivot reste de l'autre côté.",
        "Le bloc est posé avant que le tireur n'arrive.",
        "L'arrière qui attaque doit vraiment attirer son défenseur.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Sammlung von Spielzügen (forum handballecke.de, post #35, m4ggus, 2005)',
          url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/?pageNo=2',
          note: '"Der LA läuft ein und bekommt den Ball auf halb-links, wo sein Gegenspieler gesperrt ist und er somit frei werfen kann."; Nachläufer 11: "LA ... stellt von außen die Sperre auf den halb-rechten der Abwehr".',
        },
        {
          titre: 'Übergang: Nachläufer (handballhaus.de)',
          url: 'http://www.handballhaus.de/handball/angriffstaktik/uebergang/',
          note: "Action homonyme différente (contre 3-2-1 / 5-1), citée pour éviter la confusion.",
        },
      ],
      depart: { Piv: [3.4, 6.3] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Nachläufer 1: l'ailier rentre au poste d'arrière",
          etapes: [
            {
              texte: "Le demi-centre fait une passe longue à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.0] },
              passe: ['DC', 'AiG', 0.1],
            },
            {
              texte: "Le demi-centre court bloquer le 2 gauche, côté intérieur. L'ailier gauche donne à l'arrière gauche.",
              courses: { DC: { vers: [-4.0, 6.4], via: [-2.6, 8.8], ecran: true } },
              passe: ['AiG', 'ArG', 0.3],
              def: { G2: [-4.8, 5.6] },
            },
            {
              texte: "L'arrière gauche attaque vers le poste du demi-centre et attire le 3 gauche.",
              courses: { ArG: [-1.8, 9.0] },
              def: { G3: [-1.8, 7.6] },
            },
            {
              texte: "L'ailier gauche rentre et reçoit au poste d'arrière gauche, là où son défenseur est bloqué.",
              courses: { AiG: { vers: [-5.0, 7.8], via: [-8.0, 6.4] } },
              passe: ['ArG', 'AiG', 0.6],
              def: { G1: [-7.4, 3.2] },
            },
            { texte: "L'ailier gauche tire, libre.", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Nachläufer 11: écran de l'ailier, le demi-centre part à l'extérieur",
          ballon: 'AiG',
          etapes: [
            {
              texte: "L'ailier gauche fait une passe longue au demi-centre, puis pose, depuis l'aile, un écran sur le 2 gauche.",
              courses: { AiG: { vers: [-5.8, 5.6], via: [-8.2, 4.6], ecran: true } },
              passe: ['AiG', 'DC', 0],
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche, qui attaque vers l'extérieur et entraîne le 1 gauche.",
              courses: { ArG: [-8.2, 8.0] },
              passe: ['DC', 'ArG', 0.2],
              def: { G1: [-8.0, 5.4] },
            },
            {
              texte: "Le demi-centre court vers l'extérieur, au-delà de l'écran; l'arrière gauche lui donne le ballon.",
              courses: { DC: { vers: [-6.2, 6.8], via: [-4.8, 8.4] } },
              passe: ['ArG', 'DC', 0.7],
            },
            { texte: 'Le demi-centre tire, libre devant le but.', tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'induction-arriere-ailier',
      nom: 'Passe-et-va induit arrière-ailier (école yougoslave)',
      alias: 'Juego por inducción (ES); "induction du passe et va entre arrière et ailier du même côté" (J.-M. Germain)',
      categorie: 'Combinaisons à nom de pays',
      defense: "Défense qui empêche l'ailier de recevoir",
      resume: "L'arrière feinte la passe à l'ailier, change de direction vers l'intérieur pour agrandir l'intervalle 1-2, puis sert l'ailier qui pénètre.",
      description: [
        "J. L. Antón García (2010) attribue ce jeu \"par induction\" à la Yougoslavie des années 1980, en particulier au Metaloplastika Šabac (entraîneur Zirkovic; joueurs Vujović, Isaković). Il sert contre les défenses qui empêchent l'ailier de recevoir.",
        "L'arrière feinte la passe à l'ailier, qui se déplace dans la même direction. Puis l'arrière change de direction, s'éloigne en largeur et fixe son vis-à-vis vers l'intérieur, ce qui agrandit l'intervalle; il passe enfin à l'ailier, qui a lui aussi changé de direction après avoir gagné de la largeur, et qui pénètre. Si le défenseur extérieur (\"l'impair\") ferme, l'ailier rend à l'arrière: double passe et tir de loin.",
        'Le terme "inducción del pase y va" vient du Français Jean-Michel Germain. Le texte est précis mais sans schéma: les directions exactes des courses sont déduites.',
      ],
      objectif: "Ouvrir l'intervalle entre le 1 et le 2 pour l'ailier en trompant le défenseur qui le surveille.",
      pointsCles: [
        "La feinte de passe doit être crédible.",
        "Les deux joueurs changent de direction en même temps.",
        "Si le 1 ferme, l'arrière se rend disponible pour le tir de loin.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'J. L. Antón García, Uso del "portero falso" en inferioridad numérica atacante (e-balonmano.com, 2010), p. 13',
          url: 'https://dialnet.unirioja.es/descarga/articulo/3253764.pdf',
          note: '"el lateral atacante [...] finta el pase al extremo, favorecido por el desplazamiento de este último en la misma dirección; posteriormente cambia de dirección alejándose en anchura y fijando a su oponente hacia el interior [...] y pasa finalmente al extremo".',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Pénétration de l'ailier",
          etapes: [
            ...INDUCTION_BASE,
            {
              texte: "L'arrière gauche donne à l'ailier, qui pénètre entre le 1 et le 2.",
              courses: { AiG: { vers: [-6.6, 5.0], via: [-8.6, 4.4] } },
              passe: ['ArG', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Le 1 ferme: double passe et tir de loin',
          etapes: [
            ...INDUCTION_BASE,
            {
              texte: "L'arrière gauche donne à l'ailier, mais le 1 ferme l'intervalle.",
              courses: { AiG: [-8.2, 4.2] },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-7.4, 3.4] },
            },
            {
              texte: "L'ailier rend aussitôt à l'arrière gauche, qui a reculé pour le tir de loin.",
              courses: { ArG: [-4.4, 9.6] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G2: [-4.4, 5.6] },
            },
            { texte: "L'arrière gauche tire de loin.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rentree-ailier-cote-pivot-1-5',
      nom: "Rentrée de l'ailier côté pivot contre 1-5",
      alias: "\"L'attaque d'une défense 1-5 par la rentrée de l'ailier côté ballon\" (Tactique de match 03)",
      categorie: 'Contre 5-1',
      defense: '1-5',
      dispositif: '5-1',
      resume: "L'ailier droit rentre côté pivot, reçoit lancé, donne au demi-centre et traverse jusqu'au 2 opposé pour le bloquer; l'arrière gauche attaque, avec quatre fins selon la défense.",
      description: [
        "Fiche \"Tactique de match 03\" d'entrainement-handball.fr. Le pivot est placé du côté intérieur du 2, du côté de l'ailier droit. L'ailier droit s'engage sans ballon et reçoit lancé de l'arrière droit, qui glisse à l'aile pour équilibrer. L'ailier passe au demi-centre et continue sa course pour bloquer le 2 opposé. Le demi-centre, qui a anticipé le replacement (il devient arrière droit), fixe dans l'intervalle et donne à l'arrière gauche, qui fixe vers l'intérieur entre le 2 et le 3 haut (l'avancé).",
        "Quatre fins: (1) l'arrière gauche tire; (2) le 3 bas a suivi l'ailier qui passe devant lui: passe en diagonale au pivot; (3) l'avancé gêne l'arrière gauche: passe au demi-centre devenu arrière droit, qui tire entre le 2 et le 1; (4) si le 1 ferme, le demi-centre décale l'arrière droit devenu ailier.",
        "Conseil de la source: accélérer dès la première passe de l'ailier. Voir aussi la fiche \"Rentrée d'ailier\".",
      ],
      objectif: "Déplacer le 3 bas et bloquer le 2 opposé pour créer un surnombre contre une 1-5.",
      pointsCles: [
        "Accélérer dès la première passe de l'ailier.",
        "Le demi-centre anticipe son replacement en arrière droit.",
        "L'ailier passe devant le 3 bas pour l'attirer, puis bloque le 2 opposé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Tactique de match 03: l'attaque d'une défense 1-5 par la rentrée de l'ailier côté ballon (entrainement-handball.fr)",
          url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-03-lattaque-dune-defense-1-5-par-la-rentree-de-lailier-cote-ballon/',
          note: "L'ALD reçoit lancé, passe au DC et continue pour bloquer le n°2 opposé; l'ARG fixe entre le n°2 et le n°3 haut; quatre fins (tir ARG, pivot, DC devenu ARD, ARD devenu ailier).",
        },
      ],
      depart: { Piv: [3.4, 6.4] },
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...RENTREE_15_BASE,
            { texte: "Le 2 gauche, bloqué par l'ailier, ne peut pas sortir: l'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Passe en diagonale au pivot',
          etapes: [
            ...RENTREE_15_BASE,
            {
              texte: "Le 3 bas a suivi l'ailier: l'espace est libre à côté du pivot. L'arrière gauche lui donne en diagonale.",
              courses: { Piv: [2.6, 6.4] },
              passe: ['ArG', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Le demi-centre tire entre le 2 et le 1',
          etapes: [
            ...RENTREE_15_BASE,
            {
              texte: "L'avancé gêne l'arrière gauche: passe au demi-centre (devenu arrière droit), qui attaque entre le 2 et le 1.",
              courses: { DC: [5.8, 7.2] },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [-2.0, 9.2] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "4 - Décalage de l'arrière droit devenu ailier",
          etapes: [
            ...RENTREE_15_BASE,
            {
              texte: "L'avancé gêne l'arrière gauche: passe au demi-centre, qui attaque entre le 2 et le 1.",
              courses: { DC: [5.8, 7.2] },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [-2.0, 9.2] },
            },
            {
              texte: "Le 1 ferme sur le demi-centre, qui décale l'arrière droit, devenu ailier.",
              courses: { ArD: [8.9, 2.6] },
              passe: ['DC', 'ArD', 0.4],
              def: { D1: [6.4, 5.6] },
            },
            { texte: "L'arrière droit tire depuis l'aile.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-ailier-masquee',
      nom: "Entrée d'ailier masquée",
      alias: 'Maskeret fløjindløb (DA), Masked running in (EN); Dragør HK, f700',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Contre une 3-2-1, le pivot monte en poste, reçoit et bloque le 2 gauche pour l'arrière gauche; pendant ce temps l'ailier droit peut entrer, masqué.",
      description: [
        "Dragør HK, \"à faire sur une défense 3-2-1\". L'arrière droit passe au demi-centre; le pivot monte en poste à côté du 2 gauche, reçoit du demi-centre et attire le central. Le pivot passe à l'arrière gauche et tient son bloc sur le 2; l'arrière gauche attaque entre le bloc et le central et tire si le bloc réussit (variante 1).",
        "Autres fins: sinon, le demi-centre prend l'intervalle entre le central et le 2 et tire (variante 2); l'ailier droit fait une entrée s'il n'est pas marqué par son défenseur et tire (variante 3); si le 1 et le 2 aident sur le demi-centre, celui-ci passe à l'arrière droit qui tire (non dessiné).",
        "Le texte mélange \"bloc du DC\" et \"bloc du PVT\", et la notation des défenseurs (1G, 2D, 2G) varie: la fiche suit la logique du déroulement (bloc du pivot sur le 2 gauche, le \"central\" étant l'avancé). Les placements sont déduits.",
      ],
      objectif: "Occuper le 2 et l'avancé d'un côté pour libérer l'arrière gauche, le demi-centre ou l'ailier opposé.",
      pointsCles: [
        "Le pivot monte en poste pour attirer l'avancé.",
        "Il garde son bloc sur le 2 après sa passe.",
        "L'ailier droit n'entre que si son défenseur ne le suit pas.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Entrée d'ailier masquée (Dragør HK, f700)",
          url: 'http://www.dragoerhb.dk/fransk/f700.html',
          note: "\"A faire sur une défense 3-2-1\": le PVT monte en poste, reçoit de DC, passe à ARG et tient le bloc sur le 2; ARG attaque entre le bloc et le central; sinon DC, ou ALD qui fait une entrée s'il n'est pas marqué.",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - L'arrière gauche entre le bloc et le central",
          etapes: [
            ...MASQUEE_BASE,
            {
              texte: "L'arrière gauche attaque entre le bloc du pivot et l'avancé.",
              courses: { ArG: { vers: [-2.4, 8.6], via: [-4.4, 9.8] } },
            },
            { texte: "Le bloc tient: l'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Le demi-centre prend l'intervalle",
          etapes: [
            ...MASQUEE_BASE,
            {
              texte: "L'avancé et le 3 ferment sur l'arrière gauche, qui donne au demi-centre.",
              courses: { ArG: [-2.8, 8.8], DC: [0.6, 10.0] },
              passe: ['ArG', 'DC', 0.5],
              def: { D3: [-1.8, 9.4], G3: [-1.6, 7.4] },
            },
            {
              texte: "Le demi-centre prend l'intervalle entre le central et le 2 droit.",
              courses: { DC: [1.6, 8.6] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "3 - Entrée masquée de l'ailier droit",
          etapes: [
            ...MASQUEE_BASE,
            {
              texte: "Le 1 droit ne suit pas l'ailier droit, qui fait son entrée le long de la défense. L'arrière gauche attaque et donne au demi-centre.",
              courses: { AiD: { vers: [3.0, 6.6], via: [8.4, 5.4] }, ArG: [-3.6, 9.2] },
              passe: ['ArG', 'DC', 0.4],
            },
            {
              texte: "Le demi-centre sert l'ailier droit entré.",
              passe: ['DC', 'AiD', 0.2],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'skaev-til-venstre',
      nom: 'Décalée à gauche avec entrée',
      alias: 'Skæv til venstre med overgang fra højre back (DA), Slanted left with backcourt running in (EN), "Espagnol à gauche avec entrée d\'arrière" (FR, Dragør HK, f721)',
      categorie: 'Ailiers',
      defense: '0-6',
      resume: "Le jeu est décalé à gauche: le demi-centre sert l'ailier gauche très écarté, l'arrière gauche fixe au centre, le pivot bloque le 2 gauche et l'ailier droit, parti du corner, entre et tire.",
      description: [
        "Combinaison envoyée à Dragør HK par Goran Vuk (Team Helsinge), contre une 6-0. Les deux ailiers partent des points de corner; le pivot est entre le 3 et le 2 gauches.",
        "L'ailier droit passe à l'arrière droit, qui fixe légèrement et donne au demi-centre engagé. Le demi-centre \"croise\" pour l'ailier gauche, très écarté. Quand l'ailier gauche a le ballon, l'arrière gauche part vers le centre et reçoit aussitôt. Il fixe plein centre, entre les deux 3, pendant que le pivot bloque le 2 gauche. L'ailier droit, parti du corner, fait son entrée, reçoit de l'arrière gauche et tire.",
        "Attention aux noms: la traduction française du site l'appelle \"Espagnol à gauche\", mais ce n'est pas l'Espagnole (\"skæv\" veut dire \"de travers, décalé\"). Le titre danois parle d'une entrée de l'arrière droit, alors que le texte fait entrer l'ailier droit: la fiche suit le texte. La forme exacte du \"croisé\" demi-centre / ailier gauche n'est pas décrite.",
      ],
      objectif: "Tirer toute la défense vers la gauche puis faire surgir l'ailier droit dans son dos.",
      pointsCles: [
        "Les ailiers partent des corners pour être loin de leurs défenseurs.",
        "L'arrière gauche fixe vraiment les deux 3 au centre.",
        "L'ailier droit part au moment où l'arrière gauche reçoit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Espagnol à gauche avec entrée d'arrière (Dragør HK, f721)",
          url: 'http://www.dragoerhb.dk/fransk/f721.html',
          note: '"ALD (qui a démarré du point de corner) fait son entrée, reçoit la balle de arg et tire."',
        },
        {
          titre: 'Skæv til venstre med overgang fra højre back (Dragør HK, version danoise, x721)',
          url: 'http://www.dragoerhb.dk/x721.html',
          note: '"Skæv" = de travers, décalé; titre anglais "Slanted left with backcourt running in".',
        },
      ],
      depart: { AiG: [-9.6, 0.5], AiD: [9.6, 0.5], Piv: [-3.3, 6.3] },
      ballon: 'AiD',
      etapes: [
        {
          texte: "L'ailier droit passe à l'arrière droit, qui fixe légèrement.",
          courses: { ArD: [5.0, 8.8] },
          passe: ['AiD', 'ArD', 0.1],
          def: { D2: [5.0, 5.8] },
        },
        {
          texte: "L'arrière droit donne au demi-centre, qui s'engage vers la gauche.",
          courses: { DC: [-1.6, 9.4], ArD: [5.4, 9.4] },
          passe: ['ArD', 'DC', 0.2],
          def: { D2: [5.0, 5.0] },
        },
        {
          texte: "Le demi-centre attaque vers le 2 gauche et donne à l'ailier gauche, remonté très écarté le long de la touche.",
          courses: { DC: [-4.6, 7.6], AiG: { vers: [-7.8, 8.4], via: [-9.8, 4.4] } },
          passe: ['DC', 'AiG', 0.6],
          def: { G2: [-4.8, 6.6] },
        },
        {
          texte: "Dès que l'ailier gauche a le ballon, l'arrière gauche part vers le centre; l'ailier le lui transmet aussitôt.",
          courses: { ArG: { vers: [-1.0, 9.0], via: [-3.6, 9.8] } },
          passe: ['AiG', 'ArG', 0.5],
        },
        {
          texte: "L'arrière gauche fixe plein centre, entre les deux 3. Le pivot bloque le 2 gauche. L'ailier droit, parti du corner, fait son entrée le long des 6 m.",
          courses: {
            ArG: [0, 8.6],
            Piv: { vers: [-4.0, 6.2], ecran: true },
            AiD: { vers: [2.6, 6.4], via: [7.2, 4.4] },
          },
          def: { G3: [-1.0, 7.8], D3: [1.0, 7.8] },
        },
        {
          texte: "L'ailier droit passe dans le dos des deux 3 et reçoit de l'arrière gauche.",
          courses: { AiD: { vers: [-2.4, 6.8], via: [0, 6.2] } },
          passe: ['ArG', 'AiD', 0.6],
        },
        { texte: "L'ailier droit tire.", tir: 'AiD' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'angreb-mod-hoj-back',
      nom: 'Contre un arrière défensif haut',
      alias: 'Angreb mod høj back (DA, x367), Attack against a high defensive back (EN)',
      categorie: 'Ailiers',
      defense: 'Défense dont le 2 sort pour couper la passe ailier vers arrière',
      resume: "Le 2 sort haut pour empêcher l'ailier de servir son arrière: l'arrière court derrière le demi-centre, puis coupe dans le dos du 2 et reçoit de l'ailier.",
      description: [
        "Fiche danoise de Dragør HK, pour une défense dont l'arrière défensif (le 2) sort pour couper la passe de l'ailier vers l'arrière. L'ailier fixe vers l'intérieur avec le ballon, le demi-centre fixe aussi. L'arrière court derrière le demi-centre; le pivot fait écran sur le 3. L'ailier sert l'arrière \"derrière l'arrière défensif avancé\".",
        "Le texte est très court: la coupe de l'arrière dans le dos du 2 (après sa course derrière le demi-centre) et le tir final sont déduits du but annoncé.",
      ],
      objectif: "Punir le 2 qui sort trop haut en servant l'arrière dans son dos.",
      pointsCles: [
        "L'ailier fixe d'abord vers l'intérieur pour attirer le 1.",
        "L'arrière emmène le 2 haut avant de couper dans son dos.",
        "L'écran du pivot empêche le 3 de fermer.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Angreb mod høj back (Dragør HK, version danoise, x367)',
          url: 'http://www.dragoerhb.dk/x367.html',
          note: "\"Fløjen spiller backen bag den fremskudte forsvarsback\" (l'ailier sert l'arrière derrière l'arrière défensif avancé).",
        },
      ],
      depart: { G2: [-5.4, 8.2] },
      ballon: 'AiG',
      etapes: [
        {
          texte: "Le 2 gauche est sorti haut sur l'arrière gauche. L'ailier gauche fixe vers l'intérieur avec le ballon; le demi-centre fixe aussi.",
          courses: { AiG: [-7.4, 4.6], DC: [0.4, 8.6] },
          def: { G1: [-7.0, 3.6], D3: [0.8, 7.5] },
        },
        {
          texte: "L'arrière gauche court derrière le demi-centre, vers le centre; le 2 le suit en restant haut. Le pivot fait écran sur le 3 gauche.",
          courses: { ArG: { vers: [-2.0, 10.2], via: [-3.8, 10.6] }, Piv: { vers: [-1.1, 6.5], ecran: true } },
          def: { G2: [-3.4, 9.0], G3: [-1.9, 7.0] },
        },
        {
          texte: "L'arrière gauche coupe brusquement dans le dos du 2 sorti. L'ailier le sert.",
          courses: { ArG: { vers: [-3.2, 7.4], via: [-2.0, 8.4] } },
          passe: ['AiG', 'ArG', 0.6],
          def: { G2: [-3.6, 8.6] },
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'jojo7-ecran-ailier',
      nom: "Écran de l'ailier sur son défenseur, l'arrière à l'aile",
      alias: 'Combinaison "jojo7" (forum handballecke.de, sans nom)',
      categorie: 'Ailiers',
      defense: 'Non précisé (dessinée contre 0-6)',
      resume: "L'ailier gauche bloque son propre défenseur pendant que le demi-centre feinte à droite; l'arrière gauche file à l'aile et reçoit une passe longue (ou en Kempa).",
      description: [
        "Combinaison postée sur le forum handballecke.de (2009). Ailier gauche vers arrière gauche vers demi-centre; le demi-centre feinte une passe vers l'arrière droit; pendant ce temps, l'ailier gauche bloque son défenseur extérieur; l'arrière gauche court vers l'aile gauche, reçoit et tire. Variante: en Kempa.",
        "D'autres membres du forum jugent qu'elle ne marche qu'une ou deux fois par match; ils préfèrent une variante où l'ailier gauche rentre et reçoit du demi-centre. Placements déduits (pas de schéma).",
      ],
      objectif: "Surprendre le 1 en lui retirant son ailier et en envoyant l'arrière à l'aile.",
      pointsCles: [
        "La feinte de passe du demi-centre doit attirer les regards à droite.",
        "Le bloc de l'ailier est posé sur le côté intérieur du 1.",
        "À jouer rarement: l'effet de surprise s'use vite.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Sammlung von Spielzügen (forum handballecke.de, post #83, jojo7, 2009)',
          url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
          note: "LA vers RL vers RM; RM feinte vers RR; LA bloque son défenseur extérieur; RL court vers l'aile gauche, reçoit et tire; variante en Kempa. Réponses (#84-85): ne marche qu'une ou deux fois.",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Passe longue à l'arrière parti à l'aile",
          etapes: [
            ...JOJO_BASE,
            {
              texte: "Le demi-centre fait une passe longue à l'arrière gauche, seul à l'aile.",
              passe: ['DC', 'ArG', 0.2],
            },
            { texte: "L'arrière gauche tire depuis l'aile.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - En Kempa',
          etapes: [
            ...JOJO_BASE,
            {
              texte: "L'arrière gauche contourne le 1 bloqué et saute au-dessus de la zone, près du coin; le demi-centre lui envoie le ballon en l'air et il tire avant de retomber.",
              courses: { ArG: { vers: [-7.0, 1.0], via: [-9.4, 3.0] } },
              passe: ['DC', 'ArG', 0.1],
              tir: { par: 'ArG', t: 0.85 },
              enLAir: ['ArG'],
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'kolding',
      nom: 'Kolding',
      alias: 'Enclenchement "Kolding"',
      categorie: 'Ailiers',
      defense: '0-6 (zone ou individuelle)',
      resume: "L'ailier gauche passe et rentre en 2e pivot à l'opposé; quand le ballon revient, l'arrière gauche tourne autour du pivot placé entre le 1 et le 2.",
      description: [
        "Enclenchement relevé par D. Chastel (Approches du Handball n°178, 2020) dans les sélections régionales féminines; la Bourgogne-Franche-Comté l'a joué 7 fois. Le pivot est placé entre le 1 et le 2 gauches.",
        "L'ailier gauche donne à l'arrière gauche et rentre en 2e pivot entre le 2 et le 3 droits. Le ballon circule jusqu'au demi-centre, qui renverse le jeu sur l'arrière gauche. L'arrière gauche tourne autour du pivot (course côté bras); le pivot, qui a gagné sa position sur le 1, profite d'un rapport de force favorable. La rentrée de l'ailier a écarté les défenseurs: l'arrière exploite les espaces ou continue en supériorité.",
        "La source ne fixe pas de fin: la fiche se termine par un tir de l'arrière gauche (la passe au pivot est l'autre option). Utilisable aussi sur défense étagée. L'origine du nom (Kolding, club et ville danois) n'est pas expliquée.",
      ],
      objectif: "Vider un côté par la rentrée de l'ailier pour jouer à deux (arrière et pivot) contre le 1 et le 2.",
      pointsCles: [
        "L'ailier rentre loin, jusqu'à l'opposé, pour écarter la défense.",
        "L'arrière tourne autour du pivot du côté de son bras de tir.",
        "Le pivot garde sa position sur le 1.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'D. Chastel, Le jeu des pivots en relation avec les arrières (Approches du Handball n°178, 2020), p. 26',
          url: 'https://www.calameo.com/ffhandball/read/00727511165bc273357a9?page=26',
          note: '"ENCLENCHEMENT "Kolding" sur 0-6 (zone ou fille à fille). Utilisé par la Bourgogne Franche Comté: 7 fois".',
        },
      ],
      depart: { Piv: [-6.4, 4.6] },
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche donne à l'arrière gauche et rentre en 2e pivot, le long de la défense.",
          courses: { AiG: { vers: [-3.0, 7.4], via: [-8.0, 6.8] } },
          passe: ['AiG', 'ArG', 0],
        },
        {
          texte: "Le ballon circule jusqu'au demi-centre. L'ailier poursuit jusqu'entre le 2 et le 3 droits et écarte la défense.",
          courses: { AiG: { vers: [3.4, 6.4], via: [0.2, 7.8] }, ArG: [-5.8, 9.8] },
          passe: ['ArG', 'DC', 0.2],
          def: { D2: [5.0, 5.4] },
        },
        {
          texte: "Le demi-centre renverse le jeu sur l'arrière gauche.",
          passe: ['DC', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche tourne autour du pivot, côté bras, et attaque vers l'intérieur. Le pivot a gagné sa position sur le 1; le 2 doit choisir.",
          courses: { ArG: { vers: [-4.8, 6.8], via: [-7.0, 7.4] } },
          def: { G2: [-4.1, 5.8], G1: [-7.6, 2.6] },
        },
        { texte: "L'arrière gauche tire dans l'espace ouvert (ou sert le pivot si le 2 sort sur lui).", tir: 'ArG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ailiere-autour-du-pivot',
      nom: "Rentrée à l'opposé et ailier qui tourne autour du pivot",
      alias: "Enclenchement de La Réunion; entrée de l'arrière à l'opposé du pivot (Bretagne, PACA-Corse); \"alternance temps fort / temps faible\" (Anim'hand)",
      categorie: 'Ailiers',
      defense: '0-6; 1-5',
      resume: "Un joueur (demi-centre ou arrière) rentre en 2e pivot du côté opposé; l'ailier, resté avec le pivot placé entre le 1 et le 2, tourne autour de lui et attaque vers l'intérieur.",
      description: [
        "D. Chastel (Approches du Handball n°180, 2020) décrit deux enclenchements de sélections régionales féminines où le pivot, placé entre le 1 et le 2 gauches, étire la défense, et où l'ailier \"tourne autour du pivot\".",
        "Variante 1 (La Réunion, contre 0-6 de zone, 12 fois pour 6 situations favorables de tir): le demi-centre donne à l'arrière gauche et rentre; l'arrière gauche donne à l'ailier; le demi-centre part se placer en 2e pivot sur le 1 droit. Quand l'ailier reçoit, le demi-centre n'est pas encore placé: ailier, arrière et pivot gardent l'écartement. Quand le demi-centre arrive entre le 1 et le 2 droits, l'ailier tourne autour du pivot; l'arrière prépare son replacement intérieur pour la suite.",
        "Variante 2 (Bretagne, PACA-Corse, contre 1-5 ou 0-6): l'arrière gauche fait la passe à l'ailier et rentre en 2e pivot entre le 2 et le 3 droits; l'ailier tourne autour du pivot, vers l'intervalle 2-3 gauche. But: attirer le 3 pour agrandir l'espace du 2 contre 2.",
        "Variante 3 (séance Anim'hand, Approches n°115, contre 1-5): à l'engagement, l'arrière porteur change de demi-terrain par un croisé arrière-arrière; le pivot se place à l'opposé; temps faible de l'ailier côté pivot, puis temps fort: l'ailier joue autour du pivot (entre le 1 et le 2) pendant que le demi-centre entre à l'opposé, entre le 2 et le 3. Évolution citée: c'est l'arrière qui rentre à l'opposé.",
        "Les sources décrivent l'enclenchement, pas la fin: les tirs de l'ailier sont ajoutés. Dans la variante 3, le placement de départ du demi-centre (en retrait, pour laisser passer le croisé) est déduit. Fiches voisines: Kolding, Ciudad, Rentrée d'ailier.",
      ],
      objectif: "Vider le centre par une rentrée à l'opposé pour jouer à deux (ailier et pivot) contre le 1 et le 2.",
      pointsCles: [
        "Le pivot se place entre le 1 et le 2 pour étirer la défense.",
        "L'ailier attend que la rentrée soit arrivée avant son temps fort.",
        "L'arrière du côté de l'ailier se replace à l'intérieur pour la suite.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'D. Chastel, Le jeu des pivots en relation avec les arrières, partie 3 (Approches du Handball n°180, 2020), p. 32-33',
          url: 'https://www.calameo.com/ffhandball/read/007275111d4146e734217?page=26',
          note: "\"Entrée de la demi-centre avec l'enclenchement de La Réunion face à une 0-6 zone\"; \"L'arrière gauche fait la passe à l'ailière et rentre en 2ème pivot entre les défenseures n°2 et n°3 à droite. L'ailière tourne autour du pivot\".",
        },
        {
          titre: "L'alternance temps fort / temps faible en attaque (Approches du Handball n°115, séance Anim'hand), p. 39-43",
          url: 'https://www.calameo.com/ffhandball/read/00727511185d66033d609?page=39',
          note: "\"Le temps fort est donné par le jeu de l'ailier autour du pivot associé à une entrée du demi-centre à l'opposé dans l'intervalle entre le n°2 et le n°3\".",
        },
      ],
      depart: { Piv: [-6.4, 4.6] },
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - La Réunion: le demi-centre entre sur le 1 opposé',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche et rentre vers la droite.",
              courses: { DC: [1.8, 8.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche donne à l'ailier. Le demi-centre n'est pas encore placé: ailier, arrière et pivot gardent l'écartement.",
              courses: { DC: { vers: [4.2, 7.4], via: [3.4, 8.2] }, AiG: [-8.6, 2.4] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "Le demi-centre arrive en 2e pivot entre le 1 et le 2 droits. À ce moment, l'ailier tourne autour du pivot et attaque vers l'intérieur; l'arrière gauche se replace vers l'intérieur.",
              courses: {
                DC: { vers: [6.6, 4.6], via: [5.8, 6.6] },
                AiG: { vers: [-4.2, 6.8], via: [-7.8, 6.4] },
                ArG: [-4.4, 9.4],
              },
              def: { D2: [5.2, 5.4], G2: [-5.0, 5.6] },
            },
            { texte: "L'ailier tire (ou joue avec le pivot, en gain de position sur le 1).", tir: 'AiG' },
          ],
        },
        {
          nom: "2 - Bretagne: l'arrière gauche rentre à l'opposé",
          ballon: 'ArG',
          etapes: [
            {
              texte: "L'arrière gauche fait la passe à l'ailier et rentre en 2e pivot vers la droite.",
              courses: { ArG: { vers: [0.4, 7.8], via: [-3.0, 8.0] }, AiG: [-8.8, 2.0] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'arrière s'installe entre le 2 et le 3 droits et attire le 3 gauche. L'ailier tourne autour du pivot, vers l'intervalle entre le 2 et le 3 gauches.",
              courses: { ArG: { vers: [3.4, 6.5], via: [2.0, 8.4] }, AiG: { vers: [-3.8, 7.0], via: [-7.8, 6.6] } },
              def: { G3: [-0.6, 6.9] },
            },
            { texte: "L'ailier tire dans l'espace agrandi (ou joue à deux avec le pivot).", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Anim'hand: croisé à l'engagement, entrée du demi-centre (1-5)",
          ballon: 'ArD',
          dispositif: '5-1',
          depart: { DC: [0, 12.0], Piv: [0.6, 6.4] },
          etapes: [
            {
              texte: "À l'engagement, l'arrière droit, porteur, change de demi-terrain: il traverse vers la gauche pendant que l'arrière gauche croise dans son dos vers la droite. Le pivot se place à l'opposé, entre le 1 et le 2 droits.",
              courses: {
                ArD: { vers: [-4.4, 9.2], via: [0.4, 9.8] },
                ArG: { vers: [4.6, 10.0], via: [0, 11.0] },
                Piv: { vers: [6.6, 4.4], via: [3.6, 6.6] },
              },
              def: { D3: [-2.6, 8.4] },
            },
            {
              texte: "L'arrière droit, passé à gauche, donne au demi-centre qui monte.",
              courses: { DC: [0, 10.2] },
              passe: ['ArD', 'DC', 0.3],
              def: { D3: [-0.6, 8.8] },
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche, passé à droite.",
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "Temps faible: l'arrière donne à l'ailier droit, qui reçoit sans se presser pour laisser chacun se replacer.",
              courses: { AiD: [8.8, 2.6] },
              passe: ['ArG', 'AiD', 0.3],
            },
            {
              texte: "Temps fort: l'ailier droit joue autour du pivot et attaque vers l'intérieur. En même temps, le demi-centre entre à l'opposé, entre le 2 et le 3 gauches.",
              courses: {
                AiD: { vers: [5.0, 7.0], via: [8.0, 6.2] },
                DC: { vers: [-2.6, 6.8], via: [-2.4, 9.4] },
              },
              def: { D2: [4.8, 6.0] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ecran-arriere-rentree-ailiere',
      nom: "Écran pour l'arrière par la rentrée de l'ailier",
      alias: "Enclenchement \"Écran pour l'arrière\" (Centre-Val de Loire)",
      categorie: 'Ailiers',
      defense: '0-6 (zone ou individuelle)',
      resume: "L'ailier gauche rentre sur le 2 gauche, de l'autre côté du pivot: pris entre deux pivots, le 2 ne peut plus sortir et l'arrière gauche tire au-dessus.",
      description: [
        "Enclenchement relevé par D. Chastel (Approches du Handball n°178, 2020): la sélection Centre-Val de Loire l'a joué 9 fois pour 6 tirs favorables. Le pivot est placé entre le 1 et le 2 gauches.",
        "Quand le demi-centre passe à l'arrière droit, l'ailier gauche entre en 2e pivot sur le 2 gauche. Le ballon revient jusqu'à l'arrière gauche, qui tire au-dessus: les deux pivots, dans le secteur du 2, l'empêchent de sortir. L'enclenchement peut aussi servir à empêcher un défenseur de se déplacer dans la profondeur.",
      ],
      objectif: "Bloquer le 2 entre deux pivots pour libérer le tir de loin de l'arrière.",
      pointsCles: [
        "L'ailier part sur la passe du demi-centre à l'arrière droit.",
        "Les deux pivots encadrent le 2, sans le pousser.",
        "L'arrière gauche tire dès qu'il reçoit, au-dessus des pivots.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'D. Chastel, Le jeu des pivots en relation avec les arrières (Approches du Handball n°178, 2020), p. 27',
          url: 'https://www.calameo.com/ffhandball/read/00727511165bc273357a9?page=27',
          note: "\"ENCLENCHEMENT Ecran pour l'arrière sur une 0-6\" (Centre-Val de Loire, 9 fois / 6 tirs favorables).",
        },
      ],
      depart: { Piv: [-6.4, 4.6] },
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière droit. À ce moment, l'ailier gauche entre en 2e pivot sur le 2 gauche, côté intérieur.",
          courses: { AiG: { vers: [-4.0, 6.4], via: [-8.0, 7.0] } },
          passe: ['DC', 'ArD', 0.2],
          def: { G2: [-5.0, 5.4] },
        },
        {
          texte: "L'arrière droit rend au demi-centre.",
          passe: ['ArD', 'DC', 0.2],
        },
        {
          texte: "Le demi-centre donne à l'arrière gauche.",
          courses: { ArG: [-5.0, 9.4] },
          passe: ['DC', 'ArG', 0.2],
        },
        {
          texte: "Le 2, pris entre les deux pivots, ne peut pas sortir: l'arrière gauche tire au-dessus.",
          courses: { ArG: [-4.8, 9.0] },
          tir: { par: 'ArG', t: 0.5 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ailier-hors-secteur-2015',
      nom: "L'ailier hors secteur (Mondial 2015)",
      alias: 'Ailier entrant, ailier dynamiseur, ailier hors secteur',
      categorie: 'Ailiers',
      defense: '0-6; 1-5',
      resume: "Quatre façons de faire jouer l'ailier loin de son aile, observées au carré final du Mondial 2015: leurre en 2e pivot, glissement dans le dos, ailier placé dans la défense après un Yago, ailier qui bloque l'avancé.",
      description: [
        "F. Valliame et A. Kada (Approches du Handball n°147, 2015) analysent le rôle de l'ailier au Mondial 2015.",
        "Variante 1 (Qatar contre la Pologne, 0-6): le pivot est entre les deux 3; l'ailier gauche part vers l'intérieur quand l'arrière droit a le ballon, en même temps qu'un croisé arrière gauche / demi-centre et un engagement fort de l'arrière gauche vers le but et le centre. L'ailier entré sert de leurre (2 joueurs dedans): le surnombre est cherché à l'opposé de lui.",
        "Variante 2 (Pologne contre le Qatar, 0-6 dont les 2 et 3 montent): temps 1, le demi-centre croise avec l'arrière du côté du pivot pour isoler le 3 vers l'avant; temps 2, l'arrière droit croise avec l'arrière gauche, et l'ailier gauche glisse dans le dos des défenseurs pour offrir une passe dans l'espace profond.",
        "Variante 3 (Espagne contre la France, \"ailier dynamiseur\"): un Yago est amorcé jusqu'à l'arrière opposé; au moment où le pivot transmet à cet arrière, l'ailier se place dans la défense. Fin: tir de l'arrière (Maqueda, Cañellas) ou jeu avec l'ailier devenu pivot, selon le 2.",
        "Variante 4 (France contre l'Espagne, 1-5): l'ailier gauche entre jusqu'au niveau de l'avancé et le bloque; le demi-centre exploite le couloir; course synchronisée avec un croisé arrière gauche / demi-centre et un engagement fort de l'arrière gauche, puis renversement pour un 2 contre 1. Un second cas (l'ailier droit entre en relation avec l'ailier opposé, rotation des joueurs) n'est pas dessiné.",
        "Le texte décrit les temps de jeu sans schéma consulté: placements, ordre exact des passes et tirs finaux sont déduits.",
      ],
      objectif: "Utiliser l'ailier comme joueur intérieur (leurre, bloqueur, receveur dans le dos) pour déséquilibrer la défense.",
      pointsCles: [
        "La course de l'ailier est synchronisée avec un croisé de la base arrière.",
        "L'ailier entré sert souvent de leurre: le surnombre est ailleurs.",
        "Contre 1-5, l'ailier peut neutraliser l'avancé par un bloc.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "F. Valliame et A. Kada, Le rôle de l'ailier au championnat du Monde 2015 (Approches du Handball n°147, 2015), p. 48-52",
          url: 'https://www.calameo.com/ffhandball/read/00727511117a5fff28271?page=48',
          note: "\"Un enclenchement en Yago est amorcé du côté d'un ailier et jusqu'à l'arrière à l'opposé [...] l'ailier se positionne dans la défense au moment où le pivot transmet à l'arrière à l'opposé\".",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Qatar: l'ailier leurre, surnombre à l'opposé",
          etapes: [
            {
              texte: "L'arrière droit a le ballon: l'ailier gauche part vers l'intérieur. L'arrière droit donne au demi-centre.",
              courses: { AiG: { vers: [-4.6, 6.8], via: [-8.0, 6.2] } },
              passe: ['ArD', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre attaque en diagonale vers la gauche pour croiser avec l'arrière gauche. L'ailier entré se place entre le 2 et le 3: deux joueurs sont dedans.",
              courses: { DC: [-2.4, 8.6], AiG: [-3.4, 6.6] },
              def: { G3: [-2.2, 7.4] },
            },
            {
              texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre, reçoit et s'engage fort vers le but et le centre. La défense se resserre.",
              courses: { ArG: { vers: [0.2, 8.4], via: [-3.6, 10.2] }, DC: [-3.6, 8.0] },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.9, 7.4] },
            },
            {
              texte: "Le surnombre est à l'opposé de l'ailier entré: l'arrière gauche donne à l'arrière droit, lancé entre le 3 et le 2 droits.",
              courses: { ArD: [3.6, 8.2] },
              passe: ['ArG', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "2 - Pologne: l'ailier glisse dans le dos",
          ballon: 'DC',
          depart: { Piv: [3.0, 6.4] },
          etapes: [
            {
              texte: "Temps 1: le demi-centre attaque vers la droite, du côté du pivot, pour croiser avec l'arrière droit. Le 3 droit monte sur lui.",
              courses: { DC: [2.6, 8.8] },
              def: { D3: [2.2, 7.8] },
            },
            {
              texte: "Croisé: l'arrière droit passe dans le dos du demi-centre et reçoit vers le centre; le 3 droit est isolé vers l'avant.",
              courses: { ArD: { vers: [0, 9.2], via: [3.4, 10.6] }, DC: [3.8, 8.2] },
              passe: ['DC', 'ArD', 0.55],
            },
            {
              texte: "Temps 2: l'arrière droit enchaîne vers la gauche pour croiser avec l'arrière gauche. Le 2 et le 3 gauches montent. L'ailier gauche glisse dans le dos des défenseurs.",
              courses: { ArD: [-2.4, 8.6], AiG: { vers: [-4.6, 6.0], via: [-8.2, 5.0] } },
              def: { G3: [-2.2, 7.6], G2: [-5.2, 7.2] },
            },
            {
              texte: "Croisé: l'arrière gauche passe dans le dos de l'arrière droit et reçoit. L'ailier continue dans le dos du 3.",
              courses: { ArG: { vers: [-0.6, 9.2], via: [-3.6, 10.4] }, ArD: [-3.6, 8.0], AiG: [-3.0, 6.5] },
              passe: ['ArD', 'ArG', 0.55],
            },
            {
              texte: "Passe dans l'espace profond: l'arrière gauche sert l'ailier, arrivé dans le dos de la défense.",
              passe: ['ArG', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Espagne: Yago, l'ailier se place dans la défense",
          ballon: 'DC',
          depart: { Piv: [-3.2, 6.3] },
          etapes: [
            {
              texte: "Yago: le pivot sort vers les 9 m, côté gauche; le demi-centre lui donne le ballon.",
              courses: { Piv: { vers: [-2.4, 8.8], via: [-3.6, 7.9] } },
              passe: ['DC', 'Piv', 0.6],
              def: { G3: [-2.2, 7.5] },
            },
            {
              texte: "L'arrière droit, l'arrière opposé, traverse et passe au ras du pivot, qui lui donne le ballon; le demi-centre se décale à droite. Au même moment, l'ailier gauche se place dans la défense, entre le 2 et le 3.",
              courses: {
                ArD: { vers: [-1.0, 9.6], via: [2.0, 9.6] },
                DC: { vers: [4.0, 10.0], via: [2.0, 11.2] },
                AiG: { vers: [-3.6, 6.8], via: [-7.4, 6.0] },
              },
              passe: ['Piv', 'ArD', 0.55],
            },
            { texte: "L'arrière droit tire (si le 2 sort sur lui, il peut servir l'ailier devenu pivot).", tir: 'ArD' },
          ],
        },
        {
          nom: "4 - France contre 1-5: l'ailier bloque l'avancé",
          ballon: 'DC',
          dispositif: '5-1',
          etapes: [
            {
              texte: "L'ailier gauche quitte son aile et entre vers l'avancé.",
              courses: { AiG: { vers: [-2.6, 8.2], via: [-5.6, 7.4] } },
            },
            {
              texte: "L'ailier bloque l'avancé. Le demi-centre attaque en diagonale vers la gauche pour croiser avec l'arrière gauche.",
              courses: { AiG: { vers: [-0.7, 8.4], ecran: true }, DC: [-2.6, 9.4] },
              def: { D3: [0.1, 9.1], G2: [-4.2, 6.0] },
            },
            {
              texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit.",
              courses: { ArG: { vers: [-1.4, 10.0], via: [-3.4, 10.8] }, DC: [-3.6, 8.6] },
              passe: ['DC', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche s'engage fort vers le but, dans le couloir que l'avancé, bloqué, ne peut plus fermer. Le 3 et le 2 se resserrent sur lui.",
              courses: { ArG: [-2.4, 8.4] },
              def: { G3: [-1.9, 7.4], G2: [-3.4, 7.0] },
            },
            {
              texte: "Il renverse le jeu vers l'arrière droit: 2 contre 1 avec l'ailier droit.",
              courses: { ArD: [4.4, 8.6] },
              passe: ['ArG', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire (ou décale l'ailier droit si le 1 sort).", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'petit-train',
      nom: 'Le petit train (de Kempa)',
      alias: '"Petit train de Kempa"',
      categorie: 'Ailiers',
      defense: 'Non précisé (dessinée contre 0-6)',
      resume: "L'arrière fixe et passe à son ailier qui démarre vers l'intérieur et donne au demi-centre; le pivot du même côté démarre à son tour derrière l'ailier.",
      description: [
        "A. Behm (Approches du Handball n°114, 2009) rapporte cette combinaison attribuée à Bernhard Kempa, entraîneur de Göppingen, en vogue dans les années 1960: fixation de l'arrière, passe à l'ailier qui démarre et passe au demi-centre; le pivot, du même côté que l'ailier, démarre à son tour derrière l'ailier. \"La France le joue encore au championnat du monde en 1995.\"",
        "La combinaison offre \"de multiples solutions (17 selon Jean-Pierre Lacoux)\", que la source ne détaille pas: la fiche s'arrête donc à la mise en place, sans tir. Kempa est aussi l'inventeur du geste qui porte son nom (voir la fiche \"Kempa\").",
      ],
      objectif: "Faire partir l'un derrière l'autre l'ailier puis le pivot, comme les wagons d'un train, pour multiplier les solutions du demi-centre.",
      pointsCles: [
        "Le pivot part du même côté que l'ailier.",
        "L'ailier démarre sur la passe de l'arrière, le pivot juste après lui.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'A. Behm, Handball: mes coups de cœur, épisode 17 (Approches du Handball n°114, 2009), p. 49',
          url: 'https://www.calameo.com/ffhandball/read/007275111122817ab0e6a?page=49',
          note: "\"Inventé par Kempa, entraîneur de Göppingen. En vogue dans les années 60. Fixation de l'arrière, passe à l'ailier qui démarre et passe au demi-centre. Le pivot (du même côté que l'ailier) démarre à son tour derrière l'ailier...\"",
        },
      ],
      depart: { Piv: [-6.4, 4.6] },
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche fixe le 2 et passe à son ailier, qui démarre vers l'intérieur.",
          courses: { ArG: [-5.0, 8.6], AiG: { vers: [-6.4, 7.0], via: [-8.6, 4.8] } },
          passe: ['ArG', 'AiG', 0.3],
          def: { G2: [-5.0, 5.8], G1: [-7.6, 3.2] },
        },
        {
          texte: "L'ailier, lancé vers l'intérieur, passe au demi-centre. Le pivot démarre à son tour, derrière l'ailier.",
          courses: { AiG: [-3.4, 8.0], ArG: [-5.6, 9.6], Piv: { vers: [-5.4, 6.8], via: [-6.8, 6.0] } },
          passe: ['AiG', 'DC', 0.4],
          def: { G2: [-4.4, 6.4] },
        },
        {
          texte: "Le demi-centre a devant lui l'ailier et le pivot lancés l'un derrière l'autre: la source cite \"de multiples solutions\" sans les détailler.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ciudad',
      nom: 'Ciudad',
      alias: '"Ciudad" (Ciudad Real); "petit jeu (Ciudad à droite)"; "Ciudad à gauche"',
      categorie: 'Ailiers',
      defense: 'Défense basse (0-6); 1-5',
      resume: "L'arrière droit donne au demi-centre et rentre en 2e pivot à l'opposé; le demi-centre temporise puis sert l'ailier droit, qui attaque autour du pivot placé entre le 1 et le 2.",
      description: [
        "É. Quintin (Approches du Handball n°126, 2011) décrit ce \"Ciudad\", repris de l'observation vidéo du \"patrimoine France A\" avec Sylvain Nouet; le nom vient du club espagnol de Ciudad Real. Le pivot est placé entre le 1 et le 2, côté ailier droit.",
        "L'arrière droit donne au demi-centre et rentre à l'opposé du pivot. Le demi-centre \"temporise\" et \"renifle\" la nouvelle organisation de la défense pendant que l'ailier droit sort des 9 m pour recevoir. Moment clé: le demi-centre transmet à l'ailier droit, qui attaque \"avec rythme, originalité et virtuosité\" autour du pivot et vers l'intérieur. Il est surtout joué à droite pour mettre en valeur les qualités d'un ailier droit comme Luc Abalo.",
        "Les projets de l'équipe de France U19-U21 le citent contre la 1-5 (\"petit jeu (Ciudad à droite)\") et la revue cite un \"Ciudad à gauche\", joué pour garder le gaucher sur la base arrière: la variante 2 en est le miroir, son déroulement n'étant pas décrit. La source ne fixe pas de fin: le tir de l'ailier est ajouté. Fiches voisines: Kolding, ailier autour du pivot, Rentrée d'ailier.",
      ],
      objectif: "Libérer un 2 contre 2 (ailier et pivot contre le 1 et le 2) en vidant le côté par la rentrée de l'arrière.",
      pointsCles: [
        "Le demi-centre temporise pour lire la défense après la rentrée.",
        "L'ailier remonte vers les 9 m pour recevoir lancé.",
        "Le pivot reste entre le 1 et le 2 pour que l'ailier tourne autour de lui.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "É. Quintin, Des repères et des savoir-faire pour s'adapter (Approches du Handball n°126, 2011), p. 26-31",
          url: 'https://www.calameo.com/ffhandball/read/0072751118dcaa10e6817?page=26',
          note: "\"L'arrière droit donne le ballon au demi-centre et rentre à l'opposé du pivot placé entre le n°1 et le n°2 côté ailier droit [...] Le demi-centre transmet à l'ailier droit qui attaque avec rythme, originalité et virtuosité autour du pivot\".",
        },
        {
          titre: 'Y. Delattre et J. Bertholet, Quelques regrets malgré le bronze (Approches du Handball n°156, 2016), p. 27',
          url: 'https://www.calameo.com/ffhandball/read/007275111df5ab573582b?page=27',
          note: "\"Sur l'attaque d'une 1-5: entrée d'ailier (Hep et London à gauche), petit jeu (Ciudad à droite) [...]\".",
        },
        {
          titre: "Le poste d'ailière (Approches du Handball n°209, 2025)",
          url: 'https://www.centre-handball.com/wp-content/uploads/2025/09/Approches_n209_AOUT-2025.pdf',
          note: "\"Notre jeu en continuité \"Ciudad\" - Utilisation de l'ailière sur une défense 1/5\" (vidéo uniquement).",
        },
      ],
      depart: { Piv: [6.4, 4.6] },
      ballon: 'ArD',
      variantes: [
        {
          nom: '1 - Ciudad à droite',
          etapes: CIUDAD_DROITE,
        },
        {
          nom: '2 - Ciudad à gauche',
          ballon: 'ArG',
          depart: { Piv: [-6.4, 4.6] },
          etapes: CIUDAD_GAUCHE,
        },
      ],
    },
  );
})();
