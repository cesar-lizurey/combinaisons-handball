/* systèmes d'attaque nommés de Dragør HK (Pondus à La lorgnette). */
(() => {
  const DRAGOR = f => `http://www.dragoerhb.dk/fransk/f${f}.html`;
  const TABLE_NOMS = (nom, note) => ({
    titre: `Index des exercices de jeu (Dragør HK, version anglaise): ${nom}`,
    url: 'http://www.dragoerhb.dk/english/ejjavaovkae.html',
    note,
  });

  /* ---------------------------------------------------------------- Pondus */
  const PONDUS_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière droit, qui reçoit en s'engageant vers le centre. Le demi-centre recule pour laisser la place.",
      courses: { ArD: [2.6, 9.0], DC: [0.8, 11.4] },
      passe: ['DC', 'ArD', 0.1],
      def: { D3: [1.9, 7.1] },
    },
    {
      texte: "Croisé: l'arrière gauche passe derrière l'arrière droit et reçoit le ballon vers la droite.",
      courses: { ArD: [-2.4, 8.4], ArG: { vers: [2.2, 9.6], via: [-1.0, 10.2] } },
      passe: ['ArD', 'ArG', 0.55],
      def: { G3: [-2.2, 7.0], D3: [1.6, 7.0] },
    },
    {
      texte: "L'arrière gauche passe à l'ailier droit et continue sa course vers l'aile opposée. L'arrière droit file vers la gauche.",
      courses: { ArG: [7.2, 7.4], ArD: [-6.2, 8.8], AiD: [8.7, 2.0] },
      passe: ['ArG', 'AiD', 0.25],
      def: { D2: [5.4, 5.8] },
    },
  ];

  window.COMBINAISONS.push(
    {
      id: 'pondus',
      nom: 'Pondus',
      alias: 'Pondus (DA/EN); Pondus fløj, Pondus over, Pondus polsk, Pondus retur (DA)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Croisé entre les deux arrières, l'arrière gauche part à l'aile droite, puis l'ailier droit rentre dans la défense pendant que le demi-centre fixe.",
      description: [
        "Système du club danois Dragør HK, en cinq versions qui partagent le même début. Le demi-centre passe à l'arrière droit, qui s'engage vers le centre et croise avec l'arrière gauche. L'arrière gauche donne à l'ailier droit et continue sa course jusqu'à l'aile droite.",
        "La suite change selon la version (choisis une variante au-dessus du schéma): rentrée de l'ailier droit pendant que le demi-centre fixe à gauche (version de base), entrée de l'ailier gauche (sur l'aile), long déplacement de l'ailier droit qui va bloquer à gauche (croisé ailier/ailier), passe à rebond vers l'ailier gauche (polonais), ou retour de l'arrière gauche qui revient de l'aile (renversé). La combinaison se joue des deux côtés.",
        "Les fiches nomment les défenseurs de façon parfois incohérente. Pour \"Pondus sur l'aile\", le texte fait tirer l'ailier droit mais le schéma montre l'entrée de l'ailier gauche: la fiche suit le schéma. Le placement exact des joueurs vient des schémas de Dragør. Le \"Pondus polonais\" n'a rien à voir avec la combinaison \"le Polonais\".",
      ],
      objectif: "Déplacer la défense par le croisé et la circulation, puis faire entrer un ailier dans un intervalle bloqué.",
      pointsCles: [
        "L'arrière droit reçoit en s'engageant vers le centre: le croisé doit fixer la défense centrale.",
        "L'ailier droit passe immédiatement au demi-centre, sans temporiser.",
        "Le joueur qui entre arrive lancé dans l'intervalle libéré par le bloc.",
        "Version polonaise: la passe d'aile à aile se fait à rebond, sinon la défense l'intercepte.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Pondus (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(690), note: "\"ALD s'engage dans l'intervalle entre 2G et 3P bloqué par PVT. ALD reçoit la balle de DC et va tirer.\"" },
        { titre: "Pondus sur l'aile (Dragør HK)", url: DRAGOR(691), note: "\"DC va fixer côté droit. ALD s'engage dans l'intervalle entre 2D et 3P; 2D étant bloqué par ARD.\" Le schéma montre l'ailier gauche." },
        { titre: 'Pondus croisé ailier/ailier (Dragør HK)', url: DRAGOR(692), note: '"ALD passe à ALG et va fixer 2D. [...] Si 3P bloque ALG, le ballon est repassé à DC qui peut tirer."' },
        { titre: 'Pondus Polonais (Dragør HK)', url: DRAGOR(693), note: '"La passe entre ALD et ALG doit se faire avec un rebond sinon la défense peut aisément subtiliser la balle."' },
        { titre: 'Pondus renversé (Dragør HK)', url: DRAGOR(694), note: "\"ARG, qui est allé jusqu'à l'aile, a fait demi-tour pour revenir vers le centre et s'infiltrer entre 3C et 2G.\"" },
        TABLE_NOMS('Pondus', 'Noms danois et anglais: Pondus, Pondus fløj / wing, Pondus over, Pondus polsk / Polish, Pondus retur / return.'),
      ],
      depart: { Piv: [0.6, 6.3] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Pondus: rentrée de l'ailier droit",
          etapes: [
            ...PONDUS_BASE,
            {
              texte: "L'ailier droit passe immédiatement au demi-centre, qui va fixer côté gauche. Le pivot se place sur le côté du 3 droit pour le bloquer.",
              courses: { DC: [-1.8, 8.6], ArG: [9.0, 4.6], Piv: { vers: [1.4, 6.3], ecran: true } },
              passe: ['AiD', 'DC', 0.15],
              def: { G3: [-2.2, 7.2], D3: [0.5, 6.9], G2: [-4.6, 5.8] },
            },
            {
              texte: "L'ailier droit s'engage dans l'intervalle entre le 2 droit et le 3 droit, bloqué par le pivot. Le demi-centre lui donne le ballon.",
              courses: { AiD: { vers: [2.9, 6.7], via: [6.4, 6.6] } },
              passe: ['DC', 'AiD', 0.6],
              def: { D2: [4.3, 5.8], D1: [7.8, 3.0] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "2 - Pondus sur l'aile",
          etapes: [
            ...PONDUS_BASE,
            {
              texte: "L'ailier droit passe immédiatement au demi-centre, qui va fixer côté droit. L'arrière droit, passé à gauche, bloque le 2 gauche par l'intérieur.",
              courses: { DC: [2.0, 8.6], ArG: [9.0, 4.6], ArD: { vers: [-4.0, 6.1], ecran: true } },
              passe: ['AiD', 'DC', 0.15],
              def: { D3: [1.9, 7.2], G3: [-1.0, 6.8], G2: [-4.8, 5.4] },
            },
            {
              texte: "L'ailier gauche s'engage entre le 2 gauche, bloqué, et le 3 gauche. Le demi-centre lui donne le ballon.",
              courses: { AiG: { vers: [-2.7, 7.2], via: [-6.6, 8.4] } },
              passe: ['DC', 'AiG', 0.6],
              def: { G1: [-6.8, 3.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Pondus croisé ailier/ailier',
          etapes: [
            ...PONDUS_BASE,
            {
              texte: "L'ailier droit traverse toute la défense vers la gauche et passe à l'ailier gauche, qui démarre.",
              courses: {
                AiD: { vers: [-2.6, 7.4], via: [4.0, 8.6] },
                AiG: [-7.4, 4.4],
                ArG: [9.0, 4.6],
              },
              passe: ['AiD', 'AiG', 0.7],
              def: { G3: [-1.4, 6.7], G1: [-7.6, 3.0] },
            },
            {
              texte: "L'ailier droit va fixer et bloquer le 2 gauche. L'ailier gauche s'engage entre le 2 et le 3 gauches.",
              courses: {
                AiD: { vers: [-4.4, 6.0], ecran: true },
                AiG: { vers: [-2.9, 7.6], via: [-5.8, 8.4] },
              },
              def: { G2: [-5.2, 5.4] },
            },
            { texte: "L'ailier gauche tire. Si le 3 gauche le bloque, il rend au demi-centre, qui tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '4 - Pondus polonais',
          etapes: [
            ...PONDUS_BASE,
            {
              texte: "L'ailier droit arrive sur l'intervalle entre le 1 et le 2 droits et feinte un tir. L'arrière gauche continue jusqu'à l'aile.",
              courses: { AiD: [6.6, 6.2], ArG: [9.2, 3.6] },
              def: { D2: [5.4, 5.9], D1: [7.4, 4.4] },
            },
            {
              texte: "L'ailier droit fait une passe à rebond à l'ailier gauche, qui s'engage entre le 2 et le 3 gauches.",
              courses: { AiG: { vers: [-2.8, 7.0], via: [-6.6, 8.2] } },
              passe: ['AiD', 'AiG', 0.55],
              def: { G3: [-1.6, 6.8], G2: [-4.4, 6.0], G1: [-7.0, 3.2] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '5 - Pondus renversé',
          etapes: [
            ...PONDUS_BASE,
            {
              texte: "L'ailier droit passe au demi-centre et commence une rentrée. Le pivot se place contre le 3 droit. L'arrière gauche arrive à l'aile.",
              courses: {
                AiD: { vers: [3.4, 6.8], via: [6.4, 6.8] },
                DC: [-1.2, 9.4],
                ArG: [9.0, 4.4],
                Piv: { vers: [1.2, 6.3], ecran: true },
              },
              passe: ['AiD', 'DC', 0.1],
              def: { D3: [2.2, 6.6] },
            },
            {
              texte: "Le demi-centre s'engage côté gauche et feinte une passe vers l'ailier droit, qui continue sa rentrée. L'arrière gauche fait demi-tour à l'aile et revient vers le centre.",
              courses: {
                DC: [-2.6, 8.4],
                AiD: { vers: [-3.6, 6.6], via: [0.4, 8.8] },
                ArG: { vers: [4.0, 7.6], via: [6.8, 7.8] },
              },
              def: { G3: [-2.2, 7.2], G2: [-4.6, 5.8], D2: [5.0, 6.0] },
            },
            {
              texte: "L'arrière gauche s'infiltre entre le 3 gauche et le pivot, qui retient le 3 droit. Le demi-centre lui passe le ballon.",
              courses: { ArG: { vers: [0.2, 7.6], via: [2.2, 8.4] } },
              passe: ['DC', 'ArG', 0.45],
              def: { G3: [-1.4, 7.2] },
            },
            { texte: "L'arrière gauche, devenu ailier droit, tire.", tir: 'ArG' },
          ],
        },
      ],
    },
  );


  /* ------------------------------------------------------- Barcelone */
  const BARCELONE_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit.",
      courses: { AiD: [8.6, 2.4], ArD: [5.0, 8.6] },
      passe: ['AiD', 'ArD', 0],
    },
    {
      texte: "L'arrière droit passe au demi-centre et continue sa course entre les deux défenseurs centraux.",
      courses: { ArD: [1.6, 7.6], DC: [1.4, 9.8] },
      passe: ['ArD', 'DC', 0.25],
      def: { D3: [0.8, 8.8] },
    },
    {
      texte: "L'arrière droit traverse jusqu'au 2 gauche et le bloque: il devient second pivot. Le pivot bloque le 2 droit. Le demi-centre continue sa course vers l'extérieur droit.",
      courses: {
        ArD: { vers: [-3.6, 6.3], via: [-0.6, 8.2], ecran: true },
        Piv: { vers: [3.8, 6.0], ecran: true },
        DC: [4.8, 8.4],
      },
      def: { G2: [-4.2, 5.6], D2: [4.6, 5.3] },
    },
    {
      texte: "Le demi-centre renverse le jeu: il passe à l'arrière gauche, qui court vers l'intérieur, vers l'intervalle entre le 2 et le 3 gauches.",
      courses: { DC: [5.8, 7.2], ArG: [-2.4, 7.4] },
      passe: ['DC', 'ArG', 0.3],
      def: { D3: [-0.6, 8.8], G3: [-0.9, 6.8] },
    },
  ];

  /* -------------------------------------------------------- Jointure */
  const JOINTURE_BASE = [
    {
      texte: "Le demi-centre attaque vers la droite et croise avec l'arrière droit, qui passe derrière lui et reçoit au centre. La défense regarde à droite.",
      courses: { DC: [3.6, 8.0], ArD: { vers: [0.0, 9.8], via: [2.6, 10.8] } },
      passe: ['DC', 'ArD', 0.55],
      def: { D3: [2.4, 7.0], D2: [4.4, 5.8] },
    },
    {
      texte: "L'arrière droit passe à l'arrière gauche, qui ramène l'attention au centre. L'arrière droit continue sa course vers la gauche.",
      courses: { ArD: [-2.4, 10.4], ArG: [-4.4, 9.0] },
      passe: ['ArD', 'ArG', 0.3],
    },
    {
      texte: "L'arrière gauche passe à l'ailier gauche, qui fixe le 1 gauche par l'extérieur. L'arrière droit croise derrière l'arrière gauche.",
      courses: { AiG: [-8.8, 3.0], ArD: { vers: [-6.8, 9.2], via: [-4.6, 10.8] } },
      passe: ['ArG', 'AiG', 0.2],
      def: { G1: [-7.9, 2.8] },
    },
    {
      texte: "L'ailier gauche rend à l'arrière gauche, qui attaque plein centre. L'arrière droit se lance dans l'intervalle entre le 1 et le 2 gauches.",
      courses: { ArG: [-1.6, 8.2], ArD: [-6.4, 5.4] },
      passe: ['AiG', 'ArG', 0.15],
      def: { G3: [-1.9, 7.1], D3: [0.9, 7.0], G2: [-4.4, 5.8] },
    },
  ];

  /* ---------------------------------------------------------- Zagreb */
  const ZAGREB_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre, qui se décale un peu vers la droite et attire l'avancé.",
      courses: { DC: [1.2, 10.2] },
      passe: ['ArG', 'DC', 0.05],
      def: { D3: [0.6, 9.0] },
    },
    {
      texte: "Le pivot avance vers les 9 m et reçoit. Le défenseur central sur la ligne avance pour le couvrir.",
      courses: { Piv: { vers: [-1.8, 8.0], via: [0.0, 7.8] } },
      passe: ['DC', 'Piv', 0.5],
      def: { G3: [-1.4, 7.1] },
    },
    {
      texte: "L'arrière gauche se déplace rapidement vers le centre, derrière le pivot, et reçoit sa passe croisée entre le central et l'avancé.",
      courses: { ArG: { vers: [0.8, 7.6], via: [-1.8, 9.8] } },
      passe: ['Piv', 'ArG', 0.55],
      def: { D3: [1.0, 8.8] },
    },
  ];

  window.COMBINAISONS.push(
    {
      id: 'plus-long',
      nom: 'Plus long',
      alias: 'Lang over (DA/EN)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "L'ailier gauche fixe entre le 1 et le 2, et l'arrière gauche part à l'extérieur du 1 qui a resserré vers le centre.",
      description: [
        "Système de Dragør HK joué à trois sur le côté gauche. L'ailier gauche passe à l'arrière gauche, qui lui rend. L'ailier fixe dans l'intervalle entre le 1 et le 2, puis donne au demi-centre au moment de fixer.",
        "Au même moment, l'arrière gauche s'engage à l'extérieur du 1, qui s'est normalement déplacé vers le centre pour aider la défense. Le demi-centre lui donne le ballon et il tire.",
      ],
      objectif: "Punir le défenseur 1 qui resserre vers le centre pour aider.",
      pointsCles: [
        "L'ailier fixe vraiment l'intervalle 1-2 pour attirer le 1.",
        "La passe au demi-centre part juste au moment de la fixation.",
        "L'arrière gauche part au même moment, par l'extérieur du 1.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Plus long (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(795), note: "\"ARG s'engage externe sur 1D qui, normalement s'est déplacé vers le centre pour soutenir la défense. ARG reçoit la balle de DC et tire.\"" },
        TABLE_NOMS('Lang over', 'Nom danois et anglais de la fiche 795.'),
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche.",
          courses: { AiG: [-8.6, 2.6] },
          passe: ['AiG', 'ArG', 0],
        },
        {
          texte: "L'arrière gauche rend à l'ailier gauche, qui fixe dans l'intervalle entre le 1 et le 2 gauches. Le 1 resserre vers lui.",
          courses: { AiG: [-6.9, 4.4] },
          passe: ['ArG', 'AiG', 0.2],
          def: { G1: [-7.0, 3.3], G2: [-5.4, 5.4] },
        },
        {
          texte: "Au moment de fixer, l'ailier passe au demi-centre. Au même moment, l'arrière gauche s'engage à l'extérieur du 1.",
          courses: { DC: [-1.6, 9.6], ArG: { vers: [-8.6, 3.6], via: [-9.4, 7.0] } },
          passe: ['AiG', 'DC', 0.1],
        },
        {
          texte: "Le demi-centre donne à l'arrière gauche, seul à l'extérieur du 1.",
          courses: { ArG: [-8.4, 2.6] },
          passe: ['DC', 'ArG', 0.3],
          def: { G1: [-7.2, 3.4] },
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },

    {
      id: 'barcelone',
      nom: 'Barcelone',
      alias: 'Barcelona, Barcelona variant (DA/EN)',
      categorie: 'Systèmes complets',
      defense: '5-1 ou 1-5',
      dispositif: '5-1',
      resume: "L'arrière droit traverse la défense pour devenir second pivot et bloquer le 2 gauche; le demi-centre renverse le jeu vers l'arrière gauche.",
      description: [
        "Système de Dragør HK contre une défense 5-1 ou 1-5. L'ailier droit passe à l'arrière droit, qui donne au demi-centre et continue sa course entre les deux défenseurs centraux. Il devient second pivot et bloque le 2 gauche. Le pivot bloque le 2 droit.",
        "Le demi-centre continue vers l'extérieur droit, puis renverse le jeu vers l'arrière gauche, qui court vers l'intérieur. La fin dépend de la fiche (choisis une variante au-dessus du schéma): tir de l'arrière gauche dans l'intervalle 2-3 (version contre 5-1), passe au pivot si le tir n'est pas possible (version contre 1-5), ou retour au demi-centre qui attaque entre le 1 et le 2 droits (\"Barcelone - variante\").",
        "La version contre 5-1 vient d'une traduction approximative; elle prévoit aussi une passe au second pivot.",
      ],
      objectif: "Créer deux blocs, un de chaque côté, puis renverser le jeu vers l'arrière gauche lancé.",
      pointsCles: [
        "L'arrière droit enchaîne sa passe et sa course: il arrive vite sur le 2 gauche.",
        "Le demi-centre attire la défense vers la droite avant de renverser.",
        "L'arrière gauche arrive lancé vers l'intérieur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Barcelone, alternative 2 (Dragør HK, trad. Bourges Handball 18)', url: DRAGOR('1637'), note: '"ARD continu sa course entre les deux N°3, pour ce mettre en 2ème pivot et faire un bloc le N°2 Droite."' },
        { titre: 'Barcelone, alternative 1 (Dragør HK)', url: DRAGOR('1637a'), note: "\"Si le tir n'est pas possible ARG passe à PVT qui tire.\"" },
        { titre: 'Barcelone - variante (Dragør HK)', url: DRAGOR('1636'), note: "\"ARG refait une passe à DC qui court vers l'intervalle G1 et G2. DC tire.\"" },
        { titre: 'Handball Gardéen - 16 combinaisons en fiches animées', url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349', note: 'Liste "Barcelone sur une 1-5" et renvoie à la fiche de Dragør.' },
        TABLE_NOMS('Barcelona', 'Noms danois et anglais: Barcelona, Barcelona variant / variation.'),
      ],
      ballon: 'AiD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche (contre 5-1)",
          etapes: [
            ...BARCELONE_BASE,
            {
              texte: "L'arrière gauche tire dans l'intervalle entre le 2 et le 3 gauches. Il peut aussi donner au second pivot.",
              courses: { ArG: [-2.6, 7.0] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot (contre 1-5)',
          etapes: [
            ...BARCELONE_BASE,
            {
              texte: "Le tir n'est pas possible: le central sort sur l'arrière gauche, qui donne au pivot.",
              passe: ['ArG', 'Piv', 0.3],
              def: { G3: [-1.6, 7.2] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Retour au demi-centre (variante)',
          etapes: [
            ...BARCELONE_BASE,
            {
              texte: "L'arrière gauche rend au demi-centre, qui court vers l'intervalle entre le 1 et le 2 droits.",
              courses: { DC: [6.4, 6.2] },
              passe: ['ArG', 'DC', 0.3],
              def: { D1: [7.4, 3.6] },
            },
            { texte: "Le demi-centre tire. S'il est pris, il donne au pivot.", tir: 'DC' },
          ],
        },
      ],
    },

    {
      id: 'jointure',
      nom: 'Jointure',
      alias: 'Medløb (DA), Joining (EN)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Après un croisé à droite, le ballon revient à gauche; l'arrière droit croise derrière l'arrière gauche et se lance entre le 1 et le 2.",
      description: [
        "Système de Dragør HK. Le demi-centre croise avec l'arrière droit pour attirer la défense à droite. L'arrière droit passe à l'arrière gauche, qui ramène l'attention au centre, puis à l'ailier gauche, qui fixe le 1 par l'extérieur.",
        "L'ailier rend à l'arrière gauche, qui attaque plein centre. Pendant ce temps, l'arrière droit a croisé derrière l'arrière gauche et se lance dans l'intervalle entre le 1 et le 2 gauches. Trois fins (choisis une variante au-dessus du schéma): tir de l'arrière droit, passe à l'ailier gauche si le 1 ferme l'intervalle, passe à rebond au demi-centre si le 2 empêche la passe.",
        "La fiche ne dit pas qui donne à l'ailier gauche quand le 1 ferme: ici, c'est l'arrière droit.",
      ],
      objectif: "Déplacer l'attention de la défense d'un côté à l'autre pour lancer l'arrière droit dans l'intervalle 1-2 opposé.",
      pointsCles: [
        "Chaque passe ramène l'attention de la défense ailleurs: droite, centre, aile gauche, centre.",
        "L'arrière droit passe derrière l'arrière gauche et arrive lancé entre le 1 et le 2.",
        "Si le 2 coupe la passe, la passe à rebond vers le demi-centre reste libre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Jointure (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(796), note: "\"ARD a croisé derrière ARG pour se lancer dans l'intervalle 1D et 2D. ARD reçoit la balle et tire. Si 1D ferme l'intervalle, la balle est passée à ALG qui se retrouve démarqué.\"" },
        TABLE_NOMS('Medløb', 'Nom danois de la fiche 796; "Joining" en anglais.'),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...JOINTURE_BASE,
            {
              texte: "L'arrière gauche donne à l'arrière droit, lancé entre le 1 et le 2.",
              courses: { ArD: [-6.2, 4.7] },
              passe: ['ArG', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "2 - Passe à l'ailier gauche",
          etapes: [
            ...JOINTURE_BASE,
            {
              texte: "L'arrière gauche donne à l'arrière droit. Le 1 ferme l'intervalle et lâche l'ailier gauche.",
              courses: { ArD: [-6.4, 5.2], AiG: [-9.2, 2.0] },
              passe: ['ArG', 'ArD', 0.3],
              def: { G1: [-7.4, 4.0] },
            },
            {
              texte: "L'arrière droit passe à l'ailier gauche, démarqué.",
              passe: ['ArD', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Passe à rebond au demi-centre',
          etapes: [
            ...JOINTURE_BASE,
            {
              texte: "Le 2 gauche coupe la passe vers l'arrière droit. L'arrière gauche fait une passe à rebond au demi-centre, resté à droite.",
              courses: { DC: [2.8, 7.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { G2: [-5.2, 6.4], D3: [-0.4, 7.3] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    {
      id: 'fisher',
      nom: 'Fisher',
      alias: 'Fisker, Fisker - variant (DA)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Le demi-centre bloque le 2 gauche pour faire croire à une fin à gauche, puis lâche son bloc et contourne le 3 pour tirer au centre.",
      description: [
        "Système de Dragør HK. Le demi-centre attaque vers le 2 gauche, passe à l'arrière gauche et va bloquer le 2. Cela attire le 3 gauche et donne l'impression que l'attaque va se finir là. Le ballon va à l'ailier gauche, qui fait une passe longue à l'arrière droit, lancé entre le 2 et le 3 droits.",
        "Au même moment, le demi-centre lâche son bloc, contourne le 3 gauche et prend l'intervalle entre les deux 3. Le pivot, qui bloquait le 3 droit, va bloquer le 3 gauche. L'arrière droit donne au demi-centre, qui tire.",
        "Dans la variante, le demi-centre bloque le 3 droit et c'est le pivot, parti de la gauche, qui contourne la défense et tire entre le 3 et le 2 droits. Les fiches disent seulement que le pivot \"se place comme sur le schéma\": le placement est repris des schémas.",
      ],
      objectif: "Faire croire à une fin d'un côté pour libérer l'intervalle central.",
      pointsCles: [
        "Le bloc du demi-centre doit être crédible pour attirer le 3 gauche.",
        "La passe longue de l'ailier gauche renverse le jeu d'un coup.",
        "Le demi-centre lâche son bloc au moment où l'arrière droit reçoit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Fisher (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(874), note: "\"DC lâche son bloc sur 2D, contourne C3 et prend l'intervalle 3C-3P. Entre-temps PVT a lâché P3 pour bloquer 3C. DC reçoit la balle de ARD et tire.\"" },
        { titre: 'Fisher - variante (Dragør HK)', url: DRAGOR(674), note: "\"PVT contourne la défense et s'engage dans l'intervalle 3P (bloqué par DC) et 2G, reçoit la balle de ARD et tire.\"" },
        TABLE_NOMS('Fisker', 'Noms danois: Fisker, Fisker - variant; anglais: Fisher.'),
      ],
      depart: { Piv: [0.8, 6.3] },
      ballon: 'ArD',
      variantes: [
        {
          nom: '1 - Fisher: le demi-centre contourne',
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre. Le pivot est collé au 3 droit.",
              passe: ['ArD', 'DC', 0],
            },
            {
              texte: "Le demi-centre attaque vers le 2 gauche et passe à l'arrière gauche.",
              courses: { DC: [-3.0, 8.2] },
              passe: ['DC', 'ArG', 0.6],
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "Le demi-centre va bloquer le 2 gauche, ce qui attire le 3 gauche. L'arrière gauche passe à l'ailier gauche.",
              courses: { DC: { vers: [-4.2, 6.5], ecran: true }, AiG: [-8.8, 2.2] },
              passe: ['ArG', 'AiG', 0.3],
              def: { G2: [-4.9, 5.7], G3: [-2.6, 7.0] },
            },
            {
              texte: "L'ailier gauche fait une passe longue à l'arrière droit, qui se précipite entre le 2 et le 3 droits. Le demi-centre lâche son bloc et contourne le 3 gauche; le pivot lâche le 3 droit pour bloquer le 3 gauche.",
              courses: {
                ArD: [3.4, 7.2],
                DC: { vers: [-0.2, 7.2], via: [-2.6, 9.2] },
                Piv: { vers: [-1.7, 6.5], ecran: true },
              },
              passe: ['AiG', 'ArD', 0.5],
              def: { D3: [2.3, 6.8] },
            },
            {
              texte: "L'arrière droit donne au demi-centre, dans l'intervalle entre les deux 3.",
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '2 - Variante: le pivot contourne',
          etapes: [
            {
              texte: "Le pivot se place à gauche du 3 gauche. L'arrière droit donne au demi-centre.",
              courses: { Piv: { vers: [-2.8, 6.3], via: [-0.9, 5.8] } },
              passe: ['ArD', 'DC', 0.1],
              def: { G3: [-1.5, 7.0] },
            },
            {
              texte: "Le demi-centre s'engage vers l'intervalle entre le 3 et le 2 droits, puis passe à l'arrière gauche.",
              courses: { DC: [2.2, 8.4] },
              passe: ['DC', 'ArG', 0.6],
              def: { D3: [1.9, 7.1] },
            },
            {
              texte: "Le demi-centre bloque le 3 droit. L'arrière gauche passe à l'arrière droit. Le pivot contourne la défense par l'arrière.",
              courses: {
                DC: { vers: [2.6, 7.2], ecran: true },
                ArD: [5.6, 8.4],
                Piv: { vers: [3.6, 9.0], via: [-0.8, 9.4] },
              },
              passe: ['ArG', 'ArD', 0.3],
              def: { D3: [1.9, 6.6] },
            },
            {
              texte: "L'arrière droit fixe par l'extérieur. Le pivot s'engage entre le 3 droit, bloqué, et le 2 droit, et reçoit.",
              courses: { ArD: [6.2, 7.2], Piv: [3.9, 6.6] },
              passe: ['ArD', 'Piv', 0.55],
              def: { D2: [5.6, 6.0] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    {
      id: 'zagreb',
      nom: 'Zagreb',
      alias: 'Zagreb (DA/EN)',
      categorie: 'Systèmes complets',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Le pivot sort recevoir aux 9 m, l'arrière gauche coupe au centre derrière lui et sert l'ailier droit en pleine course.",
      description: [
        "Système de Dragør HK contre une défense 1-5. L'arrière gauche passe au demi-centre. Le pivot avance et reçoit, ce qui fait avancer le défenseur central qui le couvre.",
        "L'arrière gauche se déplace rapidement vers le centre, entre les défenseurs centraux, et reçoit une passe croisée du pivot. Il passe en pleine course à l'ailier droit, qui tire (variante 1). Il peut aussi croiser avec l'ailier droit avant le tir (variante 2). Au départ, le demi-centre peut se décaler un peu vers la droite pour attirer son adversaire et laisser plus d'espace à l'arrière gauche.",
        "Le schéma de Dragør montre l'ailier droit qui finit près du centre: c'est la version avec croisé.",
      ],
      objectif: "Attirer le central de la ligne vers le pivot haut et traverser la défense avec l'arrière gauche lancé.",
      pointsCles: [
        "Le pivot sort franchement pour faire avancer le central.",
        "L'arrière gauche part vite et reçoit en pleine course.",
        "Le décalage du demi-centre vers la droite attire l'avancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Zagreb (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(671), note: '"PVT avance et reçoit la balle. Ceci fait avancer 3C qui couvre. ARG se déplace rapidement vers le centre entre 3C et 3P, reçoit une passe croisé de PVT et passe en pleine course à ALD, qui tire."' },
        TABLE_NOMS('Zagreb', 'Même nom en danois et en anglais.'),
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Passe à l'ailier droit",
          etapes: [
            ...ZAGREB_BASE,
            {
              texte: "L'arrière gauche continue vers la droite et passe en pleine course à l'ailier droit.",
              courses: { ArG: [2.6, 7.4], AiD: [8.6, 3.4] },
              passe: ['ArG', 'AiD', 0.4],
              def: { D2: [3.6, 6.2] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "2 - Croisé avec l'ailier droit",
          etapes: [
            ...ZAGREB_BASE,
            {
              texte: "L'arrière gauche continue vers la droite. L'ailier droit remonte.",
              courses: { ArG: [3.8, 7.6], AiD: [7.4, 5.0] },
              def: { D1: [7.2, 3.6] },
            },
            {
              texte: "Croisé: l'arrière gauche attaque le 2 droit, l'ailier droit passe derrière lui vers l'intérieur et reçoit.",
              courses: { ArG: [5.4, 7.0], AiD: { vers: [2.6, 7.6], via: [5.6, 9.4] } },
              passe: ['ArG', 'AiD', 0.55],
              def: { D2: [5.0, 6.0] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },
  );


  /* ------------------------------------------------------ Linkoebing */
  const LINKOEBING_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière droit et s'engage côté gauche.",
      courses: { DC: [-1.6, 8.4] },
      passe: ['DC', 'ArD', 0.1],
      def: { G3: [-1.9, 7.2] },
    },
    {
      texte: "L'arrière droit met la pression à l'extérieur, dans l'intervalle entre le 2 et le 1 droits. L'ailier droit remonte.",
      courses: { ArD: [6.4, 7.0], AiD: [8.4, 3.6] },
      def: { D2: [5.4, 5.8], D1: [7.6, 2.8] },
    },
    {
      texte: "L'ailier droit croise avec l'arrière droit et reçoit vers l'intérieur. Le pivot se déplace et bloque le 2 droit. Le demi-centre repique vers le centre pour attirer la défense centrale.",
      courses: {
        ArD: [7.6, 4.8],
        AiD: { vers: [2.8, 7.2], via: [6.0, 8.4] },
        Piv: { vers: [4.2, 6.4], via: [2.4, 5.9], ecran: true },
        DC: [0.2, 8.2],
      },
      passe: ['ArD', 'AiD', 0.55],
      def: { D2: [5.2, 5.8], D3: [1.6, 7.0], G3: [-0.6, 7.4], D1: [7.6, 3.4] },
    },
  ];

  /* ---------------------------------------------------------- Viborg */
  const VIBORG_D676 = [
    {
      texte: "Mise en place (non décrite par la fiche): le ballon part vers l'aile gauche. Le demi-centre passe à l'arrière gauche.",
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche passe à l'ailier gauche.",
      passe: ['ArG', 'AiG', 0.1],
    },
    {
      texte: "La circulation part de l'aile gauche, avec une fixation à chaque poste: l'ailier gauche fixe et passe à l'arrière gauche.",
      courses: { AiG: [-7.6, 3.6], ArG: [-5.0, 8.8] },
      passe: ['AiG', 'ArG', 0.6],
      def: { G1: [-7.6, 2.6] },
    },
    {
      texte: "L'arrière gauche fixe et passe au demi-centre.",
      courses: { ArG: [-4.6, 8.2], AiG: [-8.8, 2.0] },
      passe: ['ArG', 'DC', 0.6],
      def: { G2: [-4.8, 6.6], G1: [-7.4, 1.9] },
    },
    {
      texte: "Le demi-centre fixe et passe à l'arrière droit. Le pivot bloque le défenseur central droit.",
      courses: { DC: [0.6, 9.0], ArD: [5.8, 8.8], Piv: { vers: [2.6, 6.5], ecran: true } },
      passe: ['DC', 'ArD', 0.6],
      def: { D3: [1.7, 6.9], G2: [-5.0, 5.2] },
    },
  ];

  /* ------------------------------------------------------ Helsingoer */
  const HELSINGOER_BASE = [
    {
      texte: "L'arrière droit passe au demi-centre, qui s'engage vers le 2 gauche.",
      courses: { DC: [-2.6, 8.6] },
      passe: ['ArD', 'DC', 0.05],
      def: { G3: [-1.7, 6.9] },
    },
    {
      texte: "Le demi-centre passe à l'arrière gauche et pose un bloc sur le 2 gauche. Le pivot bloque le 3 gauche.",
      courses: {
        DC: { vers: [-4.2, 6.6], ecran: true },
        Piv: { vers: [-2.6, 6.6], ecran: true },
        ArG: [-5.0, 8.8],
      },
      passe: ['DC', 'ArG', 0.2],
      def: { G2: [-4.9, 5.8], G3: [-1.7, 6.8] },
    },
  ];

  window.COMBINAISONS.push(
    {
      id: 'taarnby',
      nom: 'Taarnby',
      alias: 'Tårnby (DA)',
      categorie: 'Systèmes complets',
      defense: '0-6 ou 1-5',
      resume: "L'entrée de l'ailier gauche entraîne le 1 vers le centre; le pivot le bloque par l'extérieur et l'arrière gauche tire derrière ce bloc.",
      description: [
        "Système de Dragør HK (Tårnby est une commune voisine de Dragør). L'ailier gauche passe à l'arrière gauche puis fait une entrée d'aile, qui entraîne le 1 dans son sillage.",
        "Le ballon va au demi-centre, qui le rend à l'arrière gauche. L'arrière gauche s'engage vers l'aile. Le pivot a accéléré et pose un bloc sur le 1, par l'extérieur. L'arrière gauche s'engage derrière ce bloc et tire.",
        "D'après la fiche, la combinaison a peu de chances de réussir si la défense reste collée aux 6 m. Le trajet du pivot, qui longe la défense, est repris du schéma.",
      ],
      objectif: "Vider l'aile gauche par l'entrée de l'ailier, puis y lancer l'arrière gauche derrière un bloc du pivot.",
      pointsCles: [
        "L'entrée de l'ailier doit vraiment entraîner le 1 vers l'intérieur.",
        "Le pivot accélère pour arriver à temps à l'extérieur du 1.",
        "L'arrière gauche reçoit en s'engageant vers l'aile, pas arrêté.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Taarnby (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(672), note: "\"PVT a accéléré et fait un bloc externe sur 1D. ARG s'engage derrière le bloc de PVT et tire. Si la défense se tient trop près des 6m cette combinaison a peu de chance de réussir.\"" },
        { titre: 'Handball Gardéen - 16 combinaisons en fiches animées', url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349', note: 'Liste "Taarnby sur une 0-6 ou 1-5".' },
        TABLE_NOMS('Tårnby', 'Nom danois de la fiche 672; "Taarnby" en anglais.'),
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche passe à l'arrière gauche.",
          courses: { AiG: [-8.6, 2.4] },
          passe: ['AiG', 'ArG', 0],
        },
        {
          texte: "L'ailier gauche fait une entrée d'aile vers le centre et entraîne le 1. L'arrière gauche passe au demi-centre.",
          courses: { AiG: { vers: [-3.0, 8.0], via: [-6.8, 8.4] }, DC: [0, 9.8] },
          passe: ['ArG', 'DC', 0.3],
          def: { G1: [-6.2, 5.4], G2: [-4.4, 7.0], G3: [-1.9, 7.2] },
        },
        {
          texte: "Le demi-centre rend à l'arrière gauche, qui s'engage vers l'aile. Le pivot accélère le long de la défense et pose un bloc sur le 1, par l'extérieur.",
          courses: {
            ArG: [-7.4, 6.8],
            Piv: { vers: [-7.0, 4.5], via: [-4.2, 5.0], ecran: true },
          },
          passe: ['DC', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche s'engage derrière le bloc du pivot.",
          courses: { ArG: [-8.2, 4.0] },
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },

    {
      id: 'linkoebing',
      nom: 'Linkoebing',
      alias: 'Linkøbing (DA), Linköping',
      categorie: 'Systèmes complets',
      defense: '0-6 ou 1-5',
      resume: "Croisé entre l'arrière droit et l'ailier droit pendant que le pivot bloque le 2 droit; l'ailier tire ou sert le pivot.",
      description: [
        "Système de Dragør HK (nom d'une ville suédoise). Le demi-centre passe à l'arrière droit et s'engage côté gauche. L'arrière droit met la pression à l'extérieur, entre le 2 et le 1 droits.",
        "L'ailier droit croise avec l'arrière droit. Au même moment, le pivot se déplace et bloque le 2 droit. L'ailier droit entre dans l'intervalle et tire, ou passe au pivot (choisis une variante au-dessus du schéma). Pendant ce temps, le demi-centre repique vers le centre pour attirer la défense centrale et libérer le pivot.",
      ],
      objectif: "Ouvrir l'intervalle du côté droit par un croisé ailier-arrière et un bloc du pivot.",
      pointsCles: [
        "L'arrière droit attaque vraiment l'extérieur pour emmener le 2 et le 1.",
        "Le bloc du pivot se pose au moment du croisé.",
        "Le retour du demi-centre au centre retient les défenseurs centraux.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Linkoebing (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(1639), note: "\"ALD croise avec ARD. En même temps PVT se déplace et fait un bloc sur 2G. ALD passe dans l'intervalle et peut maintenant tirer ou passer au PVT, qui tire alors.\"" },
        TABLE_NOMS('Linkøbing', 'Nom danois de la fiche 1639; "Linkoebing" en anglais.'),
      ],
      depart: { Piv: [0.8, 6.3] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'ailier droit",
          etapes: [
            ...LINKOEBING_BASE,
            { texte: "L'ailier droit passe dans l'intervalle et tire.", courses: { AiD: [2.9, 6.9] }, tir: { par: 'AiD', t: 0.4 } },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...LINKOEBING_BASE,
            {
              texte: "Le 3 droit sort sur l'ailier droit, qui donne au pivot.",
              courses: { Piv: [3.9, 6.2] },
              passe: ['AiD', 'Piv', 0.3],
              def: { D3: [2.0, 6.7] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    {
      id: 'viborg',
      nom: 'Viborg',
      alias: 'Viborg (DA/EN/DE), Viborg system (sportplan), exercice Viborg, Viborg D10 (handballhaus)',
      categorie: 'Systèmes complets',
      defense: '0-6 ou 1-5; individuelle (variante 4)',
      resume: "Nom danois porté par plusieurs combinaisons différentes selon les sources: une variante par source.",
      description: [
        '"Viborg" est une ville danoise. Le nom désigne des déroulements différents selon la source: chaque variante suit une source (choisis-la au-dessus du schéma).',
        "1 - Système de Dragør HK: circulation depuis l'aile gauche avec une fixation à chaque poste. Le pivot bloque un défenseur central (le 3 droit d'après le schéma), l'arrière droit dribble vers l'extérieur du 1, l'ailier droit rentre entre le 1 et le 2 et bloque le 2. Le demi-centre rentre entre ce bloc et le 1 et tire. Si le 1 le couvre, il rend à l'arrière droit. La fiche ne dit pas comment le ballon arrive à l'aile gauche: la mise en place est ajoutée.",
        "2 - Exercice de Dragør \"croisé ailier/arrière avec pénétration du demi-centre\": l'ailier gauche rentre bloquer le 2 et rend à l'arrière gauche, qui déborde à l'extérieur du 1. Le demi-centre prend l'intervalle entre le 1 et le 2 et reçoit (l'arrière peut aussi tirer à l'aile).",
        "3 - Version allemande (Unihandball, corroborée par sportplan): le demi-centre et l'arrière gauche échangent leurs places, l'ailier gauche sert le demi-centre lancé, qui donne à l'arrière gauche au centre; le pivot bloque le 3. Le texte allemand contient une coquille sur le dernier passeur.",
        "4 - \"Viborg D10\" (handballhaus) contre une défense individuelle: la source ne donne que le principe (Kreisel, écran du demi-centre pour le joueur marqué, l'arrière gauche rentre et reçoit de l'arrière droit). Le schéma de cette variante est une reconstruction.",
      ],
      objectif: "Selon la version: libérer le demi-centre derrière un bloc à droite, l'envoyer dans l'intervalle 1-2 gauche, ou décaler par un échange de postes.",
      pointsCles: [
        "Version Dragør: fixer à chaque poste pendant la circulation pour que la défense ne glisse pas d'avance.",
        "Le bloc de l'ailier sur le 2 ouvre l'intervalle pour le demi-centre.",
        "Version allemande: le demi-centre décrit une grande boucle pour arriver lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Viborg (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(676), note: "\"ALD rentre dans l'intervalle 1G-2G et bloque 2G. DC rentre entre le bloc et 1G, reçoit la balle de ARD et va tirer.\"" },
        { titre: 'Croisé Ailier/Arrière avec pénétration du Demi Centre, exercice Viborg (Dragør HK)', url: DRAGOR(229), note: "ALG bloque 2D, ARG fait \"un débordement extérieur sur 1D\", DC prend l'intervalle entre 1D et 2D." },
        { titre: 'Unihandball - Auftakt-, Auslösehandlungen, Spielzüge (PDF, silo.tips)', url: 'https://silo.tips/download/unihandball-auftakt-auslsehandlungen-spielzge', note: "Viborg links: RM fait une grande boucle et remplace RL, RL passe à LA puis se place au centre, LA sert RM lancé; le pivot bloque le 3." },
        { titre: 'Viborg system (sportplan)', url: 'https://www.sportplan.net/sketches/Handball/openSketch/160026', note: "L'arrière gauche passe à l'ailier, le demi-centre prend sa place et reçoit de l'ailier, l'arrière gauche prend la place du demi-centre." },
        { titre: 'Viborg D10 (handballhaus.de)', url: 'http://www.handballhaus.de/handball/angriffstaktik/manndeckung/viborg-d10.html', note: '"Der Angriff spielt einen Kreisel, RM stellt anschließend eine Sperre für den manngedeckten Spieler. RL zieht nach Innen und erhält den Pass von RR."' },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Dragør: le demi-centre derrière le bloc de l'ailier",
          etapes: [
            ...VIBORG_D676,
            {
              texte: "L'arrière droit dribble vers l'extérieur du 1 droit. L'ailier droit rentre dans l'intervalle entre le 1 et le 2 et bloque le 2. Le demi-centre suit à droite.",
              courses: {
                ArD: [8.4, 4.6],
                AiD: { vers: [5.8, 5.6], via: [8.2, 5.2], ecran: true },
                DC: [4.6, 8.2],
              },
              def: { D1: [7.6, 3.6], D2: [5.0, 4.9] },
            },
            {
              texte: "Le demi-centre rentre entre le bloc de l'ailier et le 1, et reçoit de l'arrière droit. Si le 1 le couvre, il rend à l'arrière droit.",
              courses: { DC: [6.8, 6.2] },
              passe: ['ArD', 'DC', 0.5],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '2 - Exercice Dragør: pénétration du demi-centre',
          etapes: [
            { texte: "Le demi-centre passe à l'arrière gauche.", courses: { ArG: [-5.4, 9.0] }, passe: ['DC', 'ArG', 0.05] },
            {
              texte: "L'arrière gauche passe directement à l'ailier gauche, qui s'engage vers l'intérieur. Le demi-centre part en diagonale, en retrait.",
              courses: { AiG: [-6.8, 4.6], DC: [-3.0, 9.8] },
              passe: ['ArG', 'AiG', 0.1],
              def: { G1: [-7.6, 3.0] },
            },
            {
              texte: "Avant de bloquer le 2, l'ailier rend à l'arrière gauche, qui déborde à l'extérieur du 1. L'ailier bloque le 2.",
              courses: {
                ArG: { vers: [-8.4, 4.6], via: [-8.4, 8.0] },
                AiG: { vers: [-6.0, 5.6], ecran: true },
                DC: [-6.0, 7.8],
              },
              passe: ['AiG', 'ArG', 0.2],
              def: { G1: [-7.8, 3.2], G2: [-5.2, 5.0] },
            },
            {
              texte: "Le demi-centre prend l'intervalle entre le 1 et le 2. L'arrière gauche, devenu ailier, lui donne le ballon (il peut aussi tirer à l'aile).",
              courses: { DC: [-7.0, 5.8] },
              passe: ['ArG', 'DC', 0.3],
              def: { G1: [-7.6, 4.0] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '3 - Version allemande: échange demi-centre / arrière gauche',
          etapes: [
            { texte: "Le demi-centre passe à l'arrière gauche, qui s'avance.", courses: { ArG: [-5.0, 8.8] }, passe: ['DC', 'ArG', 0.1] },
            {
              texte: "L'arrière gauche passe à l'ailier gauche, qui sort vers lui, puis se replace au centre. Le demi-centre fait une grande boucle et prend la place de l'arrière gauche.",
              courses: {
                AiG: [-8.2, 3.6],
                ArG: [-1.2, 9.4],
                DC: { vers: [-5.8, 10.4], via: [-3.4, 11.8] },
              },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier gauche sert le demi-centre, lancé au poste d'arrière gauche (2 contre 1 à gauche).",
              courses: { DC: [-4.8, 8.4] },
              passe: ['AiG', 'DC', 0.2],
              def: { G2: [-4.8, 6.6] },
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche, qui percute au centre. Le pivot bloque le 3 gauche.",
              courses: { ArG: [0.4, 7.6], Piv: { vers: [-0.9, 6.5], ecran: true } },
              passe: ['DC', 'ArG', 0.3],
              def: { G3: [-1.8, 6.9], D3: [1.4, 7.0] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '4 - Viborg D10 contre défense individuelle (principe)',
          etapes: [
            {
              texte: "La défense joue en individuelle: chaque défenseur suit un attaquant.",
              def: {
                G1: [-8.2, 2.4], G2: [-5.0, 8.4], G3: [0.4, 9.4], D3: [0.6, 7.4], D2: [5.0, 8.4], D1: [8.2, 2.4],
              },
            },
            {
              texte: "Kreisel: le pivot sort au centre et reçoit, le demi-centre croise avec lui et part vers l'arrière gauche.",
              courses: { Piv: [0.4, 9.2], DC: { vers: [-2.4, 9.4], via: [-0.8, 10.4] } },
              passe: ['DC', 'Piv', 0.4],
              def: { D3: [0.8, 8.1], G3: [-2.0, 8.4] },
            },
            {
              texte: "Le pivot passe à l'arrière droit. Le demi-centre pose un écran sur le défenseur de l'arrière gauche.",
              courses: { ArD: [5.0, 9.4], DC: { vers: [-4.2, 8.0], ecran: true } },
              passe: ['Piv', 'ArD', 0.2],
              def: { D2: [4.8, 8.2], G3: [-3.4, 7.4] },
            },
            {
              texte: "L'arrière gauche rentre vers l'intérieur en frôlant l'écran et reçoit de l'arrière droit.",
              courses: { ArG: { vers: [-1.8, 8.0], via: [-3.6, 9.6] } },
              passe: ['ArD', 'ArG', 0.5],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    {
      id: 'helsingoer',
      nom: 'Helsingoer',
      alias: 'Helsingør (DA)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Le demi-centre bloque le 2 gauche, le pivot bloque le 3 gauche, et l'arrière gauche tire entre les deux.",
      description: [
        "Système de Dragør HK. L'arrière droit passe au demi-centre, qui s'engage vers le 2 gauche et le bloque. Le pivot bloque le 3 gauche. L'arrière gauche prend l'intervalle entre les deux défenseurs bloqués et tire.",
        "Si le 2 se dégage du bloc du demi-centre, l'arrière gauche donne au demi-centre, qui tire, ou qui passe à l'ailier gauche si le 1 vient le couvrir (choisis une variante au-dessus du schéma). La fiche cite aussi le jeu avec le pivot comme autre solution.",
        "La fiche ne dit pas quand le demi-centre passe à l'arrière gauche; le schéma montre cette passe pendant que le demi-centre va au bloc.",
      ],
      objectif: "Ouvrir l'intervalle 2-3 gauche par deux blocs simultanés.",
      pointsCles: [
        "Les deux blocs se posent en même temps.",
        "L'arrière gauche attaque l'intervalle entre les deux défenseurs bloqués.",
        "Le demi-centre reste disponible après son bloc.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Helsingoer (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(697), note: "\"DC s'engage vers 2D et fait un bloc sur lui. PVT bloque 3C et ARG peut prendre l'intervalle entre les 2 joueurs et tirer. Si 2D arrive à se dégager du bloc de DC, ARG peut passer à DC, qui peut tirer ou passer à ALG, s'il est couvert par 1D.\"" },
        TABLE_NOMS('Helsingør', 'Nom danois de la fiche 697; "Helsingoer" en anglais.'),
      ],
      depart: { Piv: [-2.7, 6.4] },
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...HELSINGOER_BASE,
            {
              texte: "L'arrière gauche prend l'intervalle entre les deux défenseurs bloqués.",
              courses: { ArG: [-3.4, 7.8] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Le demi-centre tire',
          etapes: [
            ...HELSINGOER_BASE,
            {
              texte: "Le 2 gauche se dégage du bloc et sort sur l'arrière gauche. Le demi-centre se retourne vers le but et reçoit.",
              courses: { ArG: [-3.4, 7.9], DC: [-4.8, 5.9] },
              passe: ['ArG', 'DC', 0.55],
              def: { G2: [-3.5, 6.9] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "3 - Passe à l'ailier gauche",
          etapes: [
            ...HELSINGOER_BASE,
            {
              texte: "Le 2 gauche se dégage et sort sur l'arrière gauche, qui donne au demi-centre.",
              courses: { ArG: [-3.4, 7.9], DC: [-4.8, 5.9] },
              passe: ['ArG', 'DC', 0.55],
              def: { G2: [-3.5, 6.9] },
            },
            {
              texte: "Le 1 gauche vient couvrir le demi-centre, qui passe à l'ailier gauche.",
              courses: { AiG: [-8.8, 2.0] },
              passe: ['DC', 'AiG', 0.3],
              def: { G1: [-6.3, 4.4] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },
  );


  /* ------------------------------------------------- Allemagne (Est) */
  const ALLEMAGNE_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière gauche et court vers l'intervalle entre le 2 et le 1 gauches.",
      courses: { DC: [-3.4, 8.8] },
      passe: ['DC', 'ArG', 0.05],
    },
    {
      texte: "L'arrière gauche lui renvoie le ballon.",
      courses: { DC: [-5.6, 7.2], ArG: [-5.8, 9.6] },
      passe: ['ArG', 'DC', 0.2],
      def: { G2: [-5.0, 5.6] },
    },
    {
      texte: "L'ailier gauche croise avec le demi-centre: il passe dans son dos, reçoit et met la pression entre le 2 et le 3 gauches.",
      courses: { DC: [-6.6, 5.2], AiG: { vers: [-3.2, 7.4], via: [-7.8, 8.6] } },
      passe: ['DC', 'AiG', 0.5],
      def: { G1: [-7.4, 2.6], G2: [-5.0, 5.4], G3: [-2.2, 7.0] },
    },
  ];

  /* ---------------------------------------------- Lillebaelt / Storebaelt */
  const BAELT_BASE = [
    { texte: "Le demi-centre passe à l'arrière droit.", passe: ['DC', 'ArD', 0.05] },
    {
      texte: "L'arrière droit passe à l'ailier droit, qui remonte.",
      courses: { AiD: [8.8, 3.4] },
      passe: ['ArD', 'AiD', 0.2],
    },
    {
      texte: "L'ailier droit fixe le 2 droit et croise avec l'arrière droit, qui part à l'aile et reçoit.",
      courses: { AiD: [5.8, 6.4], ArD: { vers: [8.4, 3.0], via: [9.2, 8.0] } },
      passe: ['AiD', 'ArD', 0.6],
      def: { D2: [5.2, 5.4], D1: [7.6, 2.2] },
    },
  ];

  window.COMBINAISONS.push(
    {
      id: 'danois',
      nom: 'Danois',
      alias: 'Dansker (DA), Danish (EN)',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-6 ou 1-5',
      resume: "Après la circulation, le demi-centre court jusqu'à l'aile droite et contourne le bloc extérieur de l'ailier droit sur le 1.",
      description: [
        "Système de Dragør HK. L'action démarre à l'aile gauche, avec une fixation à chaque poste. Le demi-centre s'engage vers la défense, passe à l'arrière droit et court jusqu'à l'aile droite.",
        "L'arrière droit feinte un tir, ce qui attire le 2 droit et parfois le 1. L'ailier droit pose un bloc à l'extérieur du 1. Le demi-centre contourne ce bloc, reçoit et tire.",
        "À ne pas confondre avec \"le Danois / le Suédois\" d'un club allemand (fiche à part).",
      ],
      objectif: "Libérer le demi-centre à l'aile droite, derrière un bloc de l'ailier sur le 1.",
      pointsCles: [
        "Fixer à chaque poste pendant la circulation.",
        "La feinte de tir de l'arrière droit doit attirer le 2.",
        "Le demi-centre court sans ballon jusqu'à l'aile et arrive lancé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Danois (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(675), note: '"ARD fait une feinte de tir ce qui attire 2G vers lui et éventuellement 1G. ALD fait un bloc extérieur 1G et DC contourne le bloc, reçoit la balle et tire."' },
        TABLE_NOMS('Dansker', 'Nom danois de la fiche 675; "Danish" en anglais.'),
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'action démarre à l'aile gauche: l'ailier gauche fixe et passe à l'arrière gauche.",
          courses: { AiG: [-7.6, 2.8] },
          passe: ['AiG', 'ArG', 0.6],
        },
        {
          texte: "L'arrière gauche fixe à son tour et passe au demi-centre.",
          courses: { ArG: [-4.2, 8.0], AiG: [-8.8, 1.6] },
          passe: ['ArG', 'DC', 0.6],
          def: { G2: [-4.6, 6.4] },
        },
        {
          texte: "Le demi-centre s'engage vers la défense et passe à l'arrière droit.",
          courses: { DC: [0, 8.6], ArD: [4.8, 8.4] },
          passe: ['DC', 'ArD', 0.6],
          def: { D3: [0.8, 7.4], G2: [-5.0, 5.0] },
        },
        {
          texte: "Le demi-centre court jusqu'à l'aile droite. L'arrière droit feinte un tir et attire le 2 et le 1. L'ailier droit pose un bloc à l'extérieur du 1.",
          courses: {
            DC: { vers: [8.6, 5.4], via: [5.8, 10.6] },
            ArD: [4.2, 7.4],
            AiD: { vers: [7.4, 3.8], ecran: true },
          },
          def: { D2: [4.4, 6.2], D1: [6.6, 4.2], D3: [1.7, 6.6] },
        },
        {
          texte: "Le demi-centre contourne le bloc et reçoit de l'arrière droit.",
          courses: { DC: { vers: [8.6, 3.6], via: [9.4, 5.0] } },
          passe: ['ArD', 'DC', 0.4],
        },
        { texte: 'Le demi-centre tire.', tir: 'DC' },
      ],
    },

    {
      id: 'allemagne-est',
      nom: 'Allemagne (Est-allemande)',
      alias: 'Østtysker - kort / lang / med backovergang (DA), East German short / long / with backcourt running in (EN), Østtysker-Korea (mix avec la Coréenne)',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-6',
      resume: "Le demi-centre part vers l'aile gauche, l'ailier gauche croise dans son dos et le ballon revient à l'arrière gauche au centre, derrière un bloc du pivot.",
      description: [
        "Famille de systèmes de Dragør HK appelés \"Østtysker\" (est-allemand) en danois et \"Allemagne\" dans la traduction française. Version courte: le demi-centre passe à l'arrière gauche et court vers l'intervalle entre le 2 et le 1 gauches. L'arrière gauche lui rend le ballon. L'ailier gauche croise avec le demi-centre, reçoit et met la pression entre le 2 et le 3. Il passe à l'arrière gauche, qui court vers le centre; le pivot bloque le 3 gauche et l'arrière gauche tire.",
        "Version longue: si le 3 droit s'est déplacé pour aider, le ballon va à l'arrière droit, qui attaque entre le 3 et le 2 droits, s'interrompt et reprend entre le 2 et le 1; s'il est couvert, il donne à l'ailier droit. Version avec entrée d'arrière: l'arrière droit lance l'action, puis traverse tout le terrain par l'arrière et tire entre le 1 et le 2 gauches. Mix avec la Coréenne: après la version courte, le demi-centre repart vers la droite et contourne la défense jusqu'à l'intervalle 2-1 droit. Choisis une variante au-dessus du schéma.",
        "Dans la version avec entrée d'arrière, le ballon part de l'arrière droit: une passe de mise en place, non décrite, lui donne le ballon. Dans le mix, la fiche dit que l'ailier droit reçoit au coin; la passe vers le demi-centre qui suit est déduite du schéma.",
        "Attention: en France, \"Est-Allemande\" désigne parfois aussi l'Espagnole (croisé central), une autre combinaison.",
      ],
      objectif: "Attirer la défense vers l'aile gauche pour libérer l'arrière gauche au centre, ou renverser vers la droite si la défense glisse.",
      pointsCles: [
        "Le demi-centre court vraiment vers l'intervalle 2-1 pour emmener la défense.",
        "L'ailier gauche passe dans le dos du demi-centre et met la pression entre le 2 et le 3.",
        "Le bloc du pivot sur le 3 gauche arrive au moment où l'arrière gauche reçoit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Allemagne - court (Dragør HK)', url: DRAGOR('881a'), note: '"ALG croise avec DC, reçoit la boule et mets la pression entre 2D et 3C. ALG passe à ARG, qui court vers le centre. PVT se déplace et fait un bloc sur 3C."' },
        { titre: 'Allemagne - long (Dragør HK)', url: DRAGOR(881), note: '"Sinon la balle est passée à ARD, qui place son attaque entre 3P et 2G, interrompt et reprend entre 2G et 1G. Si ARD est couvert, la balle est passée à ALD, qui tire."' },
        { titre: "Allemagne avec entrée d'arrière (Dragør HK)", url: DRAGOR(100), note: "\"DC fait une passe croisée arrière à ALG qui s'engage dans l'intervalle 2D - 3D. [...] ARD s'engage sur le côté gauche, reçoit la balle [...] et peut tirer entre 1D-2D.\"" },
        { titre: 'Mix Allemagne Corée (Dragør HK)', url: DRAGOR(1132), note: "\"La partie de la combinaison coréenne est faite par DC, qui - après avoir fait la passe à ALG - s'arrête et repart vers la droite.\"" },
        TABLE_NOMS('Østtysker', 'Noms danois et anglais: Østtysker - kort / lang, East German - short / long, Østtysker med backovergang, Østtysker-Korea.'),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Court: tir de l'arrière gauche",
          etapes: [
            ...ALLEMAGNE_BASE,
            {
              texte: "L'ailier gauche passe à l'arrière gauche, qui court vers le centre. Le pivot se déplace et bloque le 3 gauche.",
              courses: {
                ArG: { vers: [0.4, 7.6], via: [-2.6, 10.0] },
                Piv: { vers: [-1.3, 6.4], ecran: true },
              },
              passe: ['AiG', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire dans l'intervalle.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Long: renversement à droite',
          etapes: [
            ...ALLEMAGNE_BASE,
            {
              texte: "L'ailier gauche passe à l'arrière gauche, qui court vers le centre. Le pivot bloque le 3 gauche, mais le 3 droit s'est déplacé pour aider.",
              courses: {
                ArG: { vers: [0.0, 8.2], via: [-2.6, 10.0] },
                Piv: { vers: [-1.3, 6.4], ecran: true },
              },
              passe: ['AiG', 'ArG', 0.3],
              def: { D3: [0.8, 7.2] },
            },
            {
              texte: "L'arrière gauche donne à l'arrière droit, qui attaque entre le 3 et le 2 droits.",
              courses: { ArD: [3.2, 7.8] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D2: [4.2, 6.4] },
            },
            {
              texte: "L'arrière droit s'interrompt et reprend son attaque entre le 2 et le 1 droits.",
              courses: { ArD: { vers: [6.0, 6.8], via: [4.6, 8.6] } },
              def: { D2: [5.0, 6.0], D1: [7.0, 4.4] },
            },
            {
              texte: "Le 1 droit vient le couvrir: l'arrière droit donne à l'ailier droit.",
              courses: { AiD: [8.8, 2.0] },
              passe: ['ArD', 'AiD', 0.3],
              def: { D1: [6.6, 5.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "3 - Avec entrée d'arrière",
          etapes: [
            { texte: "Mise en place (non décrite): le demi-centre donne à l'arrière droit.", passe: ['DC', 'ArD', 0.1] },
            {
              texte: "L'arrière droit rend au demi-centre, qui court vers l'aile opposée, vers le 1 gauche.",
              courses: { DC: [-4.0, 8.4] },
              passe: ['ArD', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre fait une passe croisée arrière à l'ailier gauche, qui s'engage dans l'intervalle entre le 2 et le 3 gauches. L'arrière gauche se décale vers la droite; l'arrière droit part en courant par l'arrière.",
              courses: {
                DC: [-7.0, 5.4],
                AiG: { vers: [-3.4, 7.4], via: [-7.8, 8.6] },
                ArG: [-1.6, 9.6],
                ArD: [2.0, 10.8],
              },
              passe: ['DC', 'AiG', 0.5],
              def: { G1: [-7.6, 3.2], G2: [-4.6, 6.0], G3: [-2.3, 7.0] },
            },
            {
              texte: "L'ailier gauche passe à l'arrière gauche, qui met la pression au centre. L'arrière droit continue derrière lui vers la gauche. Le demi-centre continue vers l'aile.",
              courses: {
                ArG: [0.2, 8.0],
                ArD: { vers: [-5.6, 9.6], via: [-2.0, 11.6] },
                DC: [-8.4, 3.6],
              },
              passe: ['AiG', 'ArG', 0.2],
              def: { D3: [1.2, 7.1], G3: [-1.0, 7.0] },
            },
            {
              texte: "L'arrière droit s'engage côté gauche, entre le 1 et le 2, et reçoit de l'arrière gauche.",
              courses: { ArD: [-6.0, 6.2] },
              passe: ['ArG', 'ArD', 0.4],
              def: { G2: [-4.6, 5.8] },
            },
            { texte: "L'arrière droit tire entre le 1 et le 2 gauches.", tir: 'ArD' },
          ],
        },
        {
          nom: '4 - Mix Allemagne / Coréenne',
          etapes: [
            ...ALLEMAGNE_BASE,
            {
              texte: "L'ailier gauche passe à l'arrière gauche, qui fixe le 3 gauche. Le demi-centre s'arrête et repart vers la droite.",
              courses: { ArG: { vers: [-0.6, 8.2], via: [-2.6, 10.0] }, DC: [-5.0, 8.6] },
              passe: ['AiG', 'ArG', 0.3],
              def: { G3: [-1.2, 7.2] },
            },
            {
              texte: "Le ballon va à l'arrière droit, qui fixe l'intervalle entre le 3 et le 2 droits. Le demi-centre passe derrière ses partenaires vers la droite.",
              courses: { ArD: [3.4, 8.0], DC: { vers: [1.6, 10.8], via: [-2.0, 10.8] } },
              passe: ['ArG', 'ArD', 0.2],
              def: { D3: [2.2, 7.0], D2: [4.4, 6.4] },
            },
            {
              texte: "L'ailier droit court vers le point de corner et reçoit. L'arrière droit et le pivot appellent le ballon pour tromper la défense. Le demi-centre contourne la défense.",
              courses: { AiD: [9.2, 0.8], DC: { vers: [6.4, 8.6], via: [4.6, 10.6] } },
              passe: ['ArD', 'AiD', 0.3],
              def: { D1: [8.2, 1.6] },
            },
            {
              texte: "Le demi-centre, non couvert, s'engage entre le 2 et le 1 droits et reçoit de l'ailier droit.",
              courses: { DC: [6.2, 5.2] },
              passe: ['AiD', 'DC', 0.5],
              def: { D2: [4.6, 6.0] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    {
      id: 'lillebaelt',
      nom: 'Lillebaelt / Storebaelt',
      alias: 'Lillebælt, Storebælt (DA)',
      categorie: 'Systèmes complets',
      defense: '0-6 ou 1-5',
      resume: "Croisé ailier-arrière à droite, puis passe longue par-dessus la zone vers l'ailier gauche.",
      description: [
        "Deux systèmes de Dragør HK nommés d'après les détroits danois (Petit et Grand Belt). Le demi-centre passe à l'arrière droit, qui donne à l'ailier droit. L'ailier fixe le 2 et croise avec l'arrière droit, qui part à l'aile et reçoit.",
        "Lillebaelt: en même temps, l'arrière gauche s'engage entre le 1 et le 2 gauches pour attirer le 1. L'arrière droit fait une passe longue par-dessus la zone à l'ailier gauche, qui tire. Si l'ailier gauche ne peut pas être servi, l'ailier droit ou l'arrière gauche peuvent tirer.",
        "Storebaelt: l'ailier gauche feinte vers l'aile pour attirer le 1, puis revient dans l'intervalle 1-2. L'arrière gauche fixe le 2 par l'intérieur. La passe longue arrive à l'ailier gauche dans l'intervalle. La fiche Lillebaelt dit que l'ailier droit fixe \"2D\", probablement une erreur: il fixe le 2 de son côté.",
      ],
      objectif: "Attirer la défense à droite par le croisé, puis renverser d'un coup vers l'aile gauche.",
      pointsCles: [
        "La passe longue passe par-dessus la zone, hors de portée de la défense.",
        "L'arrière gauche occupe le 1 (Lillebaelt) ou le 2 (Storebaelt) au bon moment.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Lillebaelt (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(695), note: "\"ARG s'est engagé dans l'intervalle 1D-2D afin d'attirer l'attention de 1D. ARD fait maintenant une passe longue par dessus la zone de but à ALG qui tire.\"" },
        { titre: 'Storebaelt (Dragør HK)', url: DRAGOR(696), note: "\"ALG fait une feinte vers l'aile pour y attirer 1D, puis revient et s'engage dans l'intervalle 1D-2D. ARG fixe interne sur 2D.\"" },
        TABLE_NOMS('Lillebælt / Storebælt', 'Noms danois des fiches 695 et 696.'),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Lillebaelt',
          etapes: [
            ...BAELT_BASE,
            {
              texte: "En même temps, l'arrière gauche s'engage entre le 1 et le 2 gauches et attire le 1. L'ailier gauche se décale vers le coin.",
              courses: { ArG: [-6.2, 5.6], AiG: [-9.4, 0.8] },
              def: { G1: [-6.6, 4.6], G2: [-5.0, 5.2] },
            },
            {
              texte: "L'arrière droit fait une passe longue par-dessus la zone à l'ailier gauche.",
              courses: { AiG: [-8.2, 1.4] },
              passe: ['ArD', 'AiG', 0.3],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Storebaelt',
          etapes: [
            ...BAELT_BASE,
            {
              texte: "L'ailier gauche feinte vers l'aile et attire le 1. L'arrière gauche fixe le 2 par l'intérieur.",
              courses: { AiG: [-9.4, 0.6], ArG: [-3.2, 7.2] },
              def: { G1: [-8.4, 1.2], G2: [-4.0, 6.0] },
            },
            {
              texte: "L'ailier gauche revient dans l'intervalle entre le 1 et le 2. L'arrière droit lui fait une passe longue par-dessus la zone.",
              courses: { AiG: { vers: [-6.4, 4.0], via: [-8.4, 3.4] } },
              passe: ['ArD', 'AiG', 0.5],
              def: { G1: [-8.0, 2.2] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    {
      id: 'serbe',
      nom: 'Serbe',
      alias: 'Serber (DA), Serbian (EN)',
      categorie: 'Combinaisons à nom de pays',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Le pivot sort recevoir et croise avec l'arrière gauche, qui sert l'ailier droit entré entre le 2 et le 3 droits.",
      description: [
        "Système de Dragør HK contre une défense 1-5. Le ballon va de l'ailier gauche à l'arrière gauche, puis au demi-centre. Le pivot se déplace vers l'avant, reçoit du demi-centre et continue vers le 2 gauche.",
        "Le pivot croise avec l'arrière gauche, qui s'infiltre entre les défenseurs centraux. L'ailier droit arrive de la droite et prend l'intervalle entre le 2 et le 3 droits. Il reçoit de l'arrière gauche et tire. Pendant ce temps, le demi-centre et l'arrière droit font pression vers la droite pour attirer la défense.",
      ],
      objectif: "Désorganiser le centre de la défense 1-5 par le croisé pivot-arrière, puis servir l'ailier droit entré.",
      pointsCles: [
        "Le pivot reçoit en mouvement et emmène les défenseurs vers la gauche.",
        "L'arrière gauche passe dans le dos du pivot pour le croisé.",
        "La pression du demi-centre et de l'arrière droit vers la droite ouvre l'intervalle de l'ailier.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Serbe (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(698), note: "\"PVT croise avec ARG qui va s'infiltrer entre 3C et 3P. ALD arrive de la droite et prend l'intervalle 2G-3P, il reçoit la balle de ARG et tire.\"" },
        { titre: 'Handball Gardéen - 16 combinaisons en fiches animées', url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349', note: 'Liste "Serbe sur une 1-5".' },
        TABLE_NOMS('Serber', 'Nom danois de la fiche 698; "Serbian" en anglais.'),
      ],
      ballon: 'AiG',
      etapes: [
        { texte: "L'ailier gauche passe à l'arrière gauche.", courses: { AiG: [-8.6, 2.4] }, passe: ['AiG', 'ArG', 0] },
        { texte: "L'arrière gauche passe au demi-centre.", courses: { ArG: [-5.0, 9.0] }, passe: ['ArG', 'DC', 0.2] },
        {
          texte: "Le pivot se déplace vers l'avant, devant les défenseurs centraux, et reçoit du demi-centre.",
          courses: { Piv: { vers: [-0.4, 7.8], via: [0.8, 7.4] } },
          passe: ['DC', 'Piv', 0.5],
          def: { D3: [0.4, 8.8] },
        },
        {
          texte: "Le pivot continue vers le 2 gauche et croise avec l'arrière gauche, qui passe dans son dos et s'infiltre entre les défenseurs centraux. Le demi-centre et l'arrière droit font pression vers la droite.",
          courses: {
            Piv: [-3.0, 7.6],
            ArG: { vers: [0.2, 7.6], via: [-2.0, 9.6] },
            DC: [2.8, 9.8],
            ArD: [6.0, 8.6],
          },
          passe: ['Piv', 'ArG', 0.55],
          def: { D3: [0.6, 8.8], G2: [-4.4, 6.0], D2: [5.0, 5.8] },
        },
        {
          texte: "L'ailier droit arrive de la droite et prend l'intervalle entre le 2 et le 3 droits. L'arrière gauche lui donne le ballon.",
          courses: { AiD: { vers: [2.4, 6.8], via: [6.6, 7.6] } },
          passe: ['ArG', 'AiD', 0.5],
          def: { D1: [7.4, 2.6] },
        },
        { texte: "L'ailier droit tire.", tir: 'AiD' },
      ],
    },
  );


  /* ----------------------------------------------------------- Pizza */
  const PIZZA_CROISE_BASE = [
    {
      texte: "Le demi-centre fait une passe à l'opposé, à l'arrière droit, et court à gauche prendre la place de l'arrière gauche. Le pivot va bloquer le 3 droit.",
      courses: {
        DC: { vers: [-5.0, 10.2], via: [-2.4, 10.8] },
        ArG: [-2.0, 8.4],
        Piv: { vers: [0.9, 6.3], via: [-1.6, 5.7], ecran: true },
      },
      passe: ['DC', 'ArD', 0.05],
      def: { D3: [1.8, 6.7], G3: [-1.6, 7.0] },
    },
    {
      texte: "L'arrière gauche fait une première feinte vers l'extérieur du 3 droit, retenu par le pivot.",
      courses: { ArG: [1.2, 8.4] },
      def: { D3: [1.8, 7.2] },
    },
  ];

  /* -------------------------------------------------------- Gurkburk */
  const GURKBURK_DEBUT = {
    texte: "Le demi-centre passe à l'ailier droit puis échange son poste avec l'arrière gauche: il passe derrière, l'arrière gauche vient au centre.",
    courses: {
      DC: { vers: [-5.6, 9.6], via: [-2.8, 11.4] },
      ArG: { vers: [0, 10.4], via: [-2.8, 9.2] },
      AiD: [8.6, 2.8],
    },
    passe: ['DC', 'AiD', 0.05],
  };

  window.COMBINAISONS.push(
    {
      id: 'voleur',
      nom: 'Voleur',
      alias: 'Robber (DA/EN); Back-Fløjkryds til Robber (mix croisé avec le voleur)',
      categorie: 'Systèmes complets',
      defense: '0-6 ou 1-5',
      resume: "L'arrière droit s'engouffre entre le 2 et le 3 droits, et le demi-centre, arrivé en arc de cercle derrière lui, lui \"vole\" le ballon pour tirer.",
      description: [
        "Système de Dragør HK. Le ballon circule de l'ailier gauche jusqu'à l'arrière droit. Le pivot fait écran sur le 3 droit et l'arrière droit s'engouffre dans l'intervalle entre le 2 et le 3 droits. Le demi-centre court en arc de cercle derrière lui, reçoit le ballon et tire. L'ailier droit suit l'action et reçoit si le 1 bloque le demi-centre.",
        "Le \"mix croisé avec le voleur\" commence par un croisé arrière gauche / ailier gauche. L'ailier rend au demi-centre, qui se jette dans la défense et passe à l'arrière droit; l'arrière droit fait mine de s'engager entre le 3 et le 2 droits et donne au demi-centre arrivé derrière lui.",
        "Les fiches ne disent pas qui a le ballon au tout début: ici, une passe de mise en place part de l'arrière gauche. Les courses viennent des schémas de Dragør.",
      ],
      objectif: "Fixer l'intervalle 2-3 droit avec l'arrière droit, puis lancer le demi-centre derrière lui.",
      pointsCles: [
        "L'arrière droit attaque vraiment l'intervalle pour attirer le 2 et le 3.",
        "Le demi-centre court en arc de cercle pour arriver lancé dans le dos de l'arrière droit.",
        "L'ailier droit reste disponible si le 1 vient sur le demi-centre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Voleur (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(673), note: "\"PVT fait un écran sur 3P et ARD s'engouffre dans l'intervalle 2G - 3P. DC court en arc de cercle derrière ARD, reçoit la balle et tire.\"" },
        { titre: 'Mix croisé avec le voleur (Dragør HK)', url: DRAGOR(1133), note: "\"ARD fait mine de s'engager dans l'intervalle 3P-2G, et fait une passe à DC qui est arrivé derrière lui.\"" },
        { titre: 'Handball Gardéen - 16 combinaisons en fiches animées', url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349', note: 'Liste "Voleur sur une 0-6 ou 1-5".' },
        TABLE_NOMS('Robber', 'Noms danois: Robber, Back-Fløjkryds til Robber.'),
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Voleur',
          etapes: [
            { texte: "Mise en place: l'arrière gauche donne à l'ailier gauche.", passe: ['ArG', 'AiG', 0.1] },
            {
              texte: "Le ballon circule de l'aile gauche vers la droite: l'ailier gauche fixe et passe à l'arrière gauche.",
              courses: { AiG: [-7.6, 2.8] },
              passe: ['AiG', 'ArG', 0.6],
            },
            {
              texte: "L'arrière gauche fixe et passe au demi-centre.",
              courses: { ArG: [-4.4, 8.2], AiG: [-8.8, 1.6] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-4.6, 6.4] },
            },
            {
              texte: "Le demi-centre fixe et passe à l'arrière droit.",
              courses: { DC: [0, 9.0], ArD: [5.0, 8.6] },
              passe: ['DC', 'ArD', 0.6],
              def: { G2: [-5.0, 5.0], G3: [-1.4, 7.1] },
            },
            {
              texte: "Le pivot fait écran sur le 3 droit. L'arrière droit s'engouffre dans l'intervalle entre le 2 et le 3 droits. Le demi-centre commence son arc de cercle.",
              courses: { Piv: { vers: [2.2, 6.3], ecran: true }, ArD: [3.6, 7.2], DC: [3.0, 10.2] },
              def: { D3: [1.4, 6.8], D2: [4.4, 6.2] },
            },
            {
              texte: "Le demi-centre arrive en arc de cercle derrière l'arrière droit et reçoit le ballon. L'ailier droit suit l'action sur son aile.",
              courses: { DC: { vers: [5.8, 6.0], via: [6.4, 9.6] }, AiD: [9.2, 2.2] },
              passe: ['ArD', 'DC', 0.6],
              def: { D1: [7.4, 3.2] },
            },
            { texte: "Le demi-centre tire. Si le 1 le bloque, il donne à l'ailier droit.", tir: 'DC' },
          ],
        },
        {
          nom: '2 - Mix croisé arrière/ailier + voleur',
          etapes: [
            { texte: "Mise en place: l'arrière gauche donne au demi-centre.", passe: ['ArG', 'DC', 0.1] },
            {
              texte: "Le demi-centre rend à l'arrière gauche, qui attaque vers l'aile.",
              courses: { ArG: [-6.6, 7.6] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-5.4, 5.8] },
            },
            {
              texte: "Croisé arrière/ailier: l'arrière gauche continue vers l'aile, l'ailier gauche coupe vers l'intérieur et reçoit.",
              courses: { ArG: [-8.0, 3.4], AiG: { vers: [-3.0, 7.6], via: [-7.4, 8.8] } },
              passe: ['ArG', 'AiG', 0.5],
              def: { G1: [-7.4, 2.4], G3: [-2.2, 7.0] },
            },
            {
              texte: "L'ailier gauche passe au demi-centre.",
              courses: { DC: [0, 9.4] },
              passe: ['AiG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre se jette dans la défense et passe à l'arrière droit.",
              courses: { DC: [0.6, 8.0], ArD: [5.0, 8.6] },
              passe: ['DC', 'ArD', 0.5],
              def: { D3: [1.4, 7.0] },
            },
            {
              texte: "L'arrière droit fait mine de s'engager entre le 3 et le 2 droits. Le demi-centre court derrière lui.",
              courses: { ArD: [3.4, 7.4], DC: { vers: [5.2, 8.4], via: [3.6, 10.2] } },
              def: { D2: [4.2, 6.2] },
            },
            {
              texte: "L'arrière droit donne au demi-centre, arrivé derrière lui.",
              courses: { DC: [5.6, 6.4] },
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    {
      id: 'pizza',
      nom: 'Pizza',
      alias: 'Lang pizza (DA), Long pizza (EN), Pizza Pan (FR); Pizza - højre krydskombination (Pizza - croisé droite)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Rotation des trois arrières: le demi-centre part à gauche et reçoit au poste d'arrière gauche pour tirer.",
      description: [
        "Famille de systèmes de Dragør HK. Pizza Pan: le demi-centre passe à l'arrière droit et s'engage à gauche du 3 gauche jusqu'aux 6 m. L'arrière droit passe à l'arrière gauche, qui court par le centre vers le 2 droit; l'arrière droit va au centre et reçoit. Le demi-centre se désengage et prend la place de l'arrière gauche. L'arrière droit fixe entre les deux 3 et donne au demi-centre, qui tire derrière le bloc du pivot. L'ailier gauche reçoit si le 1 bloque le demi-centre.",
        "Pizza - croisé droite: le demi-centre passe à l'arrière droit et court prendre la place de l'arrière gauche. L'arrière gauche feinte à l'extérieur du 3 droit, que le pivot bloque, puis le contourne et tire sur le premier appui (croisé droite 1). Si le 3 gauche monte, l'arrière gauche croise avec l'arrière droit, le pivot tient son bloc et l'arrière droit sert le demi-centre, qui s'engage du poste d'arrière gauche (croisé droite 2).",
        'La fiche Pizza Pan dit que le demi-centre tire "derrière le bloc de PVT et 1D": ici, le pivot bloque le 2 gauche, près du 1. Les positions du pivot viennent des schémas.',
      ],
      objectif: "Faire tourner les trois arrières pour que le demi-centre reçoive lancé au poste d'arrière gauche.",
      pointsCles: [
        "Les trois arrières tournent: chacun prend le poste suivant.",
        "La passe à l'arrière gauche doit lui permettre de tirer sur le premier appui; le tir en suspension est souvent plus efficace.",
        "Le pivot tient son bloc pendant toute la rotation.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Pizza Pan (Dragør HK, trad. HBC Vendenheim)', url: DRAGOR(879), note: '"ARD joue en position de demi centre et va fixer entre 3P et 3C avant de faire la passe à DC. DC va au tir en passant derrière le bloc de PVT et 1D."' },
        { titre: 'Pizza - croisé droite 1 (Dragør HK)', url: DRAGOR(882), note: '"ARD passe la balle à ARG, qui a fait une première feinte externe sur 3P, qui est bloqué par PVT, le contourne et tire."' },
        { titre: 'Pizza - croisé droite 2 (Dragør HK)', url: DRAGOR('882a'), note: "\"Si 3C monte, un croisé est fait avec ARD et PVT tiens son bloc. [...] DC s'est déplacé à la position d'arrière gauche et peut maintenant s'engager et recevoir la balle de ARD et tirer.\"" },
        TABLE_NOMS('Lang pizza', 'Noms danois et anglais: Lang pizza / Long pizza; Pizza - højre krydskombination / right cross combination.'),
      ],
      depart: { Piv: [-3.4, 6.4] },
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Pizza Pan',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit et s'engage à gauche du 3 gauche, jusqu'aux 6 m.",
              courses: { DC: [-2.6, 7.2] },
              passe: ['DC', 'ArD', 0.05],
              def: { G3: [-1.6, 6.8] },
            },
            {
              texte: "L'arrière droit passe à l'arrière gauche, qui vient vers le centre.",
              courses: { ArG: [-3.6, 9.4] },
              passe: ['ArD', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche court par le centre vers le 2 droit. L'arrière droit va au centre et reçoit. Le demi-centre se désengage et prend la place de l'arrière gauche.",
              courses: {
                ArG: { vers: [4.4, 7.8], via: [0.4, 8.4] },
                ArD: { vers: [0.8, 10.2], via: [3.4, 11.0] },
                DC: [-5.6, 8.8],
              },
              passe: ['ArG', 'ArD', 0.6],
              def: { D2: [4.6, 6.2] },
            },
            {
              texte: "L'arrière droit, en position de demi-centre, fixe entre les deux 3 et passe au demi-centre. Le pivot bloque le 2 gauche.",
              courses: { ArD: [0, 8.4], Piv: { vers: [-4.8, 6.6], ecran: true } },
              passe: ['ArD', 'DC', 0.6],
              def: { G3: [-1.2, 7.2], D3: [1.2, 7.2], G2: [-4.2, 5.9] },
            },
            {
              texte: "Le demi-centre passe derrière le bloc du pivot, entre le 2 et le 1. Si le 1 le bloque, il donne à l'ailier gauche.",
              courses: { DC: [-6.2, 5.0] },
              def: { G1: [-7.4, 2.8] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '2 - Croisé droite 1',
          etapes: [
            ...PIZZA_CROISE_BASE,
            {
              texte: "L'arrière gauche contourne le 3 droit par l'intérieur et reçoit de l'arrière droit, pour tirer sur le premier appui.",
              courses: { ArG: [-0.4, 7.4] },
              passe: ['ArD', 'ArG', 0.4],
              def: { G3: [-1.6, 6.9] },
            },
            { texte: "L'arrière gauche tire, de préférence en suspension.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Croisé droite 2',
          etapes: [
            ...PIZZA_CROISE_BASE,
            {
              texte: "Le 3 gauche monte. L'arrière gauche croise avec l'arrière droit, qui attaque vers le centre gauche avec le ballon. Le pivot tient son bloc.",
              courses: { ArG: [3.2, 8.0], ArD: { vers: [-1.2, 8.6], via: [2.2, 9.6] } },
              def: { G3: [0.2, 7.6] },
            },
            {
              texte: "L'arrière droit fait pression sur la défense. Le demi-centre s'engage depuis le poste d'arrière gauche et reçoit.",
              courses: { DC: [-3.6, 7.4] },
              passe: ['ArD', 'DC', 0.4],
              def: { G2: [-4.4, 6.0] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    {
      id: 'gurkburk',
      nom: 'Gurkburk',
      alias: 'Gurkburk, Gurkburk TT, Gurkburk avec croisé ("bocal à cornichons" en suédois)',
      categorie: 'Systèmes complets',
      defense: '0-6 (TT: 1-5)',
      resume: "Le demi-centre échange son poste avec l'arrière gauche; l'ailier droit traverse toute la défense et contourne un bloc du pivot à gauche.",
      description: [
        "Système envoyé à Dragør HK par Kim Ludwig. Le demi-centre passe à l'ailier droit, puis échange son poste avec l'arrière gauche. L'ailier droit temporise, repart vers le centre et passe au demi-centre, devenu arrière gauche. Celui-ci fixe le 2 gauche par l'extérieur. Le pivot se place à l'intérieur du 2 pour bloquer, et l'ailier droit, venu de la droite, contourne le bloc, reçoit et tire.",
        "Gurkburk TT (contre 1-5): le demi-centre presse au centre, croise avec l'arrière gauche et continue sa fixation à gauche; le ballon passe à l'arrière droit pendant que le pivot bloque le défenseur central; l'arrière droit donne au demi-centre qui a contourné le bloc. Gurkburk avec croisé: après l'échange, l'arrière droit croise derrière l'arrière gauche, loin du centre, avant que le ballon revienne au demi-centre en arrière gauche.",
        "Les fiches disent que le pivot bloque \"3P\", ce qui ne colle pas avec le côté de l'action: ici, le pivot bloque le 3 gauche, à l'intérieur du 2. La course de l'ailier droit jusqu'au côté gauche est déduite des schémas. Choisis une variante au-dessus du schéma.",
      ],
      objectif: "Amener l'ailier droit lancé du côté gauche, derrière un bloc du pivot.",
      pointsCles: [
        "L'échange de postes entre le demi-centre et l'arrière gauche se fait pendant que l'ailier droit temporise.",
        "Le demi-centre fixe le 2 par l'extérieur pour ouvrir l'intervalle intérieur.",
        "L'ailier droit traverse sans ballon et arrive lancé derrière le bloc.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Gurkburk (Dragør HK, envoyé par Kim Ludwig)', url: DRAGOR(779), note: '"DC passe à ALD puis échange son poste avec ARG. [...] PVT se déplace du côté interne de 2D pour faire un bloc sur 3P. ALD contourne le bloc, reçoit la balle de DC et tire."' },
        { titre: 'Gurkburk TT (Dragør HK)', url: DRAGOR('779a'), note: '"DC a la balle et fait pression sur les 3P, puis il croise avec ARG et continue sa fixation sur 2D. [...] ARD passe maintenant la balle à DC qui vient de contourner le bloc et tire."' },
        { titre: 'Gurkburk avec croisé (Dragør HK)', url: DRAGOR('779b'), note: '"ARD croise derrière ARG loin du centre, reçoit la balle et la passe à DC, qui est maintenant en position de ARG."' },
        TABLE_NOMS('Gurkburk', 'Même nom en danois et en anglais.'),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Gurkburk',
          etapes: [
            GURKBURK_DEBUT,
            {
              texte: "L'ailier droit temporise, repart vers le centre et passe au demi-centre, devenu arrière gauche. L'arrière droit s'écarte un peu vers l'aile.",
              courses: { AiD: [7.0, 5.6], ArD: [6.6, 8.8] },
              passe: ['AiD', 'DC', 0.7],
              def: { D1: [7.6, 3.2] },
            },
            {
              texte: "Le demi-centre fixe le 2 gauche par l'extérieur. Le pivot se place à l'intérieur du 2 pour bloquer. L'ailier droit traverse vers la gauche.",
              courses: {
                DC: [-6.4, 6.6],
                Piv: { vers: [-3.6, 6.2], ecran: true },
                AiD: { vers: [-2.4, 8.4], via: [2.0, 9.6] },
              },
              def: { G2: [-5.6, 5.6], G3: [-2.6, 6.8] },
            },
            {
              texte: "L'ailier droit contourne le bloc et reçoit du demi-centre.",
              courses: { AiD: [-4.6, 6.6] },
              passe: ['DC', 'AiD', 0.5],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '2 - Gurkburk TT (contre 1-5)',
          etapes: [
            {
              texte: "La défense joue en 1-5: le 3 droit est avancé. Le demi-centre presse au centre.",
              courses: { DC: [0.2, 9.9] },
              def: { D3: [0, 8.8], G3: [-1.0, 6.7], G2: [-4.4, 5.6], D2: [4.4, 5.6] },
            },
            {
              texte: "Le demi-centre croise avec l'arrière gauche, qui passe dans son dos et reçoit. Le demi-centre continue sa fixation vers le 2 gauche.",
              courses: { DC: [-3.0, 8.0], ArG: { vers: [-0.8, 8.6], via: [-2.4, 10.4] } },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.2, 8.4], G2: [-3.8, 6.6] },
            },
            {
              texte: "L'arrière gauche fixe au centre et passe à l'arrière droit, qui fixe le 2 droit. Le pivot bloque le défenseur central.",
              courses: { ArG: [-3.0, 9.6], ArD: [4.8, 7.4], Piv: { vers: [0, 6.3], ecran: true } },
              passe: ['ArG', 'ArD', 0.3],
              def: { D2: [4.4, 6.2] },
            },
            {
              texte: "Le demi-centre contourne le bloc et reçoit de l'arrière droit.",
              courses: { DC: { vers: [2.2, 7.0], via: [-0.4, 7.4] } },
              passe: ['ArD', 'DC', 0.6],
              def: { D3: [1.2, 8.0] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: '3 - Gurkburk avec croisé',
          etapes: [
            GURKBURK_DEBUT,
            {
              texte: "L'ailier droit passe à l'arrière gauche, passé au centre, qui va fixer le 2 droit. L'ailier droit commence sa course vers l'autre aile.",
              courses: { ArG: [3.6, 8.2], AiD: [6.0, 6.8] },
              passe: ['AiD', 'ArG', 0.3],
              def: { D2: [4.4, 6.6] },
            },
            {
              texte: "L'arrière droit croise derrière l'arrière gauche, loin du centre, et reçoit. L'ailier droit continue vers la gauche.",
              courses: { ArD: { vers: [0.6, 9.6], via: [4.4, 10.8] }, AiD: { vers: [0.6, 7.6], via: [3.4, 7.2] } },
              passe: ['ArG', 'ArD', 0.55],
              def: { D3: [1.8, 6.8] },
            },
            {
              texte: "L'arrière droit passe au demi-centre, en position d'arrière gauche, qui fixe le 2 gauche par l'extérieur. Le pivot bloque à l'intérieur du 2. L'ailier droit poursuit sa course.",
              courses: {
                DC: [-6.4, 6.6],
                Piv: { vers: [-3.6, 6.2], ecran: true },
                AiD: [-2.4, 8.2],
              },
              passe: ['ArD', 'DC', 0.3],
              def: { G2: [-5.6, 5.6], G3: [-2.6, 6.8] },
            },
            {
              texte: "L'ailier droit contourne le bloc et reçoit du demi-centre.",
              courses: { AiD: [-4.6, 6.6] },
              passe: ['DC', 'AiD', 0.5],
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },
  );


  /* -------------------------------------------------------- Hambourg */
  const HAMBOURG_BASE = [
    {
      texte: "La défense est en 1-5 décalée: le 2 gauche joue avancé. L'arrière droit passe au demi-centre puis échange son poste avec l'ailier droit.",
      courses: { ArD: { vers: [8.6, 3.6], via: [8.0, 7.6] }, AiD: { vers: [6.4, 9.0], via: [8.6, 6.0] } },
      passe: ['ArD', 'DC', 0.1],
      def: { G2: [-5.8, 7.8] },
    },
    {
      texte: "Le demi-centre passe à l'ailier gauche, qui se décale vers le point de corner. Le pivot pose un bloc sur le 3 droit.",
      courses: { AiG: [-9.2, 2.2], Piv: { vers: [0.8, 6.3], ecran: true } },
      passe: ['DC', 'AiG', 0.2],
    },
    {
      texte: "L'ailier gauche rend au demi-centre. L'arrière droit fait une entrée d'aile depuis son nouveau poste et traverse vers le centre.",
      courses: { DC: [-2.6, 8.6], ArD: { vers: [-0.8, 7.4], via: [4.0, 8.4] } },
      passe: ['AiG', 'DC', 0.2],
      def: { D3: [1.8, 6.8], D2: [4.6, 5.6] },
    },
    {
      texte: "Le demi-centre passe à l'arrière droit et va poser un bloc à l'intérieur du 1 gauche, ce qui doit déplacer le 2 avancé vers l'extérieur. L'arrière gauche s'engage vers le centre; l'ailier gauche va au point de corner.",
      courses: {
        DC: { vers: [-6.4, 3.6], ecran: true },
        ArG: { vers: [-2.8, 7.4], via: [-4.6, 8.2] },
        AiG: [-9.4, 0.6],
      },
      passe: ['DC', 'ArD', 0.2],
      def: { G1: [-7.2, 2.8], G2: [-6.8, 7.0], G3: [-1.6, 6.6] },
    },
  ];

  /* -------------------------------------------------------------- HG */
  const HG_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche et part en courant vers l'aile opposée.",
      courses: { AiG: { vers: [-1.6, 7.8], via: [-6.4, 7.8] } },
      passe: ['AiG', 'ArG', 0.05],
      def: { G3: [-1.6, 6.8] },
    },
    {
      texte: "L'arrière gauche s'engage vers l'extérieur et passe en pleine course au demi-centre. Le pivot bloque le 1 gauche. L'ailier gauche va bloquer le 2 droit.",
      courses: {
        ArG: [-7.6, 6.0],
        DC: [-3.6, 8.8],
        Piv: { vers: [-6.8, 3.4], via: [-5.4, 4.6], ecran: true },
        AiG: { vers: [4.2, 6.4], via: [1.4, 8.0], ecran: true },
      },
      passe: ['ArG', 'DC', 0.5],
      def: { G1: [-7.6, 2.6], G2: [-5.2, 6.6], D2: [5.0, 5.8] },
    },
    {
      texte: "Le demi-centre s'engage au poste d'arrière gauche en fixant l'intervalle entre le 2 et le 3 gauches, puis passe à l'arrière droit, qui s'engage au centre.",
      courses: { DC: [-3.4, 8.0], ArD: [1.2, 7.8] },
      passe: ['DC', 'ArD', 0.6],
      def: { G3: [-2.0, 7.0], D3: [1.6, 6.7] },
    },
  ];

  /* ------------------------------------------------------- Lorgnette */
  const LORGNETTE_BASE = [
    {
      texte: "L'ailier gauche passe à l'arrière gauche. En même temps, le demi-centre va poser un bloc à l'intérieur du 2 gauche.",
      courses: { DC: { vers: [-3.9, 6.5], ecran: true }, ArG: [-5.2, 9.2] },
      passe: ['AiG', 'ArG', 0.05],
      def: { G2: [-4.7, 5.8] },
    },
    {
      texte: "L'arrière gauche s'engage en diagonale vers la droite. L'arrière droit croise derrière lui et reçoit.",
      courses: { ArG: [2.6, 8.4], ArD: { vers: [-0.6, 8.6], via: [2.6, 10.4] } },
      passe: ['ArG', 'ArD', 0.55],
      def: { D3: [2.0, 7.2] },
    },
  ];

  window.COMBINAISONS.push(
    {
      id: 'hambourg',
      nom: 'Hambourg sur 1-5 décalé',
      alias: 'Hamburg mod skæv 5-1 (DA), Hambourg against slanted 5-1 (EN)',
      categorie: 'Systèmes complets',
      defense: '1-5 décalée',
      resume: "L'arrière droit échange avec l'ailier droit puis entre depuis l'aile; le demi-centre bloque le 1 gauche pour écarter le 2 avancé.",
      description: [
        "Système envoyé à Dragør HK par Kim Ludwig, contre une défense 1-5 décalée. L'arrière droit passe au demi-centre puis échange son poste avec l'ailier droit. Le demi-centre passe à l'ailier gauche, qui se décale vers le coin. L'arrière droit fait une entrée d'aile depuis son nouveau poste; le pivot pose un bloc sur le 3 droit.",
        "Le demi-centre reçoit de l'ailier gauche, passe à l'arrière droit et va bloquer le 1 gauche par l'intérieur, ce qui doit déplacer le 2 vers l'extérieur. L'arrière droit tire, ou passe à l'arrière gauche qui s'engage vers le centre, ou au demi-centre (choisis une variante au-dessus du schéma).",
        "Confiance faible à moyenne: l'enchaînement des courses est confus dans la fiche. Le placement de la défense (2 gauche avancé) et le trajet de l'arrière droit, de l'aile droite jusqu'au centre, sont repris du schéma. Le côté du bloc du pivot n'est pas clair.",
      ],
      objectif: "Écarter le défenseur avancé par un bloc près de l'aile gauche pour libérer le centre.",
      pointsCles: [
        "L'échange arrière droit / ailier droit se fait dès la première passe.",
        "Le bloc du demi-centre sur le 1 doit attirer le 2 avancé vers l'extérieur.",
        "L'arrière droit lit la défense: tir, arrière gauche ou demi-centre.",
      ],
      fiabilite: 'partielle',
      sources: [
        { titre: 'Hambourg sur 1-5 décalé (Dragør HK, envoyé par Kim Ludwig)', url: DRAGOR(165), note: "\"DC reçoit la balle de ALG et passe à ARD et va faire un bloc interne sur 1D. Ceci devrait déplacer 2D vers l'extérieur. ARD a maintenant la possibilité de tirer ou de faire une passe à ARG, qui s'engage vers le centre, ou de faire une passe à DC.\"" },
        TABLE_NOMS('Hamburg mod skæv 5-1', 'Nom danois de la fiche 165; "Hambourg against slanted 5-1" en anglais.'),
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [...HAMBOURG_BASE, { texte: "L'arrière droit tire.", courses: { ArD: [-0.6, 7.1] }, tir: { par: 'ArD', t: 0.4 } }],
        },
        {
          nom: "2 - Passe à l'arrière gauche",
          etapes: [
            ...HAMBOURG_BASE,
            { texte: "L'arrière droit passe à l'arrière gauche, qui s'engage vers le centre.", passe: ['ArD', 'ArG', 0.2] },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Passe au demi-centre',
          etapes: [
            ...HAMBOURG_BASE,
            {
              texte: "Le 1 gauche reste collé au bloc: l'arrière droit passe au demi-centre, qui se retourne vers le but.",
              courses: { DC: [-5.8, 4.6] },
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
      ],
    },

    {
      id: 'fif',
      nom: 'FIF',
      alias: 'FIF (DA/EN)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "L'arrière gauche échange avec le demi-centre, puis pression rapide à trois et une-deux avec l'arrière droit pour percer au centre.",
      description: [
        "Système envoyé à Dragør HK par Kim Ludwig (sigle sans explication). L'arrière gauche passe à l'ailier gauche et échange son poste avec le demi-centre. Le demi-centre, au poste d'arrière gauche, reçoit de l'ailier gauche, s'engage et passe à l'arrière gauche, qui s'engage au centre.",
        "Le jeu s'est déplacé: pression rapide à trois. Le pivot bloque le 3 gauche. L'arrière gauche passe à l'arrière droit, qui lui rend aussitôt, et l'arrière gauche s'engage entre les deux 3 pour tirer.",
      ],
      objectif: "Gagner un temps sur la défense centrale par une une-deux rapide derrière un bloc du pivot.",
      pointsCles: [
        "L'échange de postes se fait pendant la passe à l'ailier.",
        "La passe de l'arrière droit revient immédiatement.",
        "Le bloc du pivot sur le 3 gauche ouvre l'intervalle central.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'FIF (Dragør HK, envoyé par Kim Ludwig)', url: DRAGOR(39), note: "\"ARG passe la balle à ALG et change de poste avec DC. [...] ARG fait une passe à ARD, qui renvoie de suite et ARG s'engage entre 3C-3P et tire.\"" },
        TABLE_NOMS('FIF', 'Même nom en danois et en anglais.'),
      ],
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche passe à l'ailier gauche et échange son poste avec le demi-centre.",
          courses: {
            ArG: { vers: [-0.4, 10.0], via: [-2.6, 9.0] },
            DC: { vers: [-5.6, 9.8], via: [-2.6, 11.4] },
            AiG: [-8.8, 3.0],
          },
          passe: ['ArG', 'AiG', 0.05],
        },
        { texte: "L'ailier gauche passe au demi-centre, au poste d'arrière gauche.", passe: ['AiG', 'DC', 0.3] },
        {
          texte: "Le demi-centre s'engage et passe à l'arrière gauche, qui s'engage au centre.",
          courses: { DC: [-4.6, 7.8], ArG: [-0.6, 8.6] },
          passe: ['DC', 'ArG', 0.6],
          def: { G2: [-4.8, 6.4] },
        },
        {
          texte: "Pression rapide à trois: l'arrière gauche passe à l'arrière droit, qui avance. Le pivot bloque le 3 gauche.",
          courses: { ArD: [4.8, 7.8], Piv: { vers: [-1.0, 6.4], ecran: true } },
          passe: ['ArG', 'ArD', 0.2],
          def: { G3: [-1.9, 6.8], D2: [4.8, 6.2] },
        },
        {
          texte: "L'arrière droit renvoie aussitôt. L'arrière gauche s'engage entre les deux 3.",
          courses: { ArG: [0.2, 7.4] },
          passe: ['ArD', 'ArG', 0.1],
        },
        { texte: "L'arrière gauche tire.", tir: 'ArG' },
      ],
    },

    {
      id: 'hg',
      nom: 'HG',
      alias: 'HG (DA/EN)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "L'ailier gauche traverse pour bloquer à droite, le pivot bloque le 1 gauche, et l'arrière droit s'engage au centre avec trois solutions.",
      description: [
        "Système envoyé à Dragør HK par Kim Ludwig (sigle sans explication). L'ailier gauche passe à l'arrière gauche et court vers l'aile opposée pour bloquer le 2 droit. L'arrière gauche s'engage vers l'extérieur et passe en pleine course au demi-centre. Le pivot bloque le 1 gauche.",
        "Le demi-centre s'engage au poste d'arrière gauche en fixant l'intervalle entre le 2 et le 3, puis passe à l'arrière droit, qui s'engage au centre. L'arrière droit peut tirer, passer à l'ailier gauche (qui bloque à droite), ou rendre au demi-centre; grâce à sa fixation, le demi-centre peut alors servir l'arrière gauche, qui contourne vite le bloc du pivot et tire (choisis une variante au-dessus du schéma).",
        "La fiche écrit que le demi-centre fixe \"2D-3P\", ce qui mélange les deux côtés: ici, il fixe à gauche, au poste d'arrière gauche. Les courses viennent du schéma.",
      ],
      objectif: "Créer des blocs aux deux extrémités pour ouvrir le centre à l'arrière droit.",
      pointsCles: [
        "L'ailier gauche traverse toute la défense pour bloquer le 2 droit.",
        "L'arrière gauche passe en pleine course, sans s'arrêter.",
        "Le demi-centre reste disponible après sa fixation pour la remise.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'HG (Dragør HK, envoyé par Kim Ludwig)', url: DRAGOR(41), note: "\"ALG passe la balle à ARG et court à l'aile opposée pour bloquer 2G. ARG s'engage vers l'extérieur et passe, en pleine course, à DC. PVT bloque 1D.\"" },
        { titre: 'HG, alternative 1 (Dragør HK)', url: DRAGOR('41a'), note: 'Même texte, second schéma.' },
        TABLE_NOMS('HG', 'Même nom en danois et en anglais.'),
      ],
      depart: { Piv: [-3.4, 6.4] },
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [...HG_BASE, { texte: "L'arrière droit tire.", courses: { ArD: [1.0, 7.4] }, tir: { par: 'ArD', t: 0.4 } }],
        },
        {
          nom: "2 - Passe à l'ailier gauche",
          etapes: [
            ...HG_BASE,
            {
              texte: "Le 2 droit lâche l'ailier gauche pour aider au centre: l'arrière droit lui passe le ballon.",
              courses: { AiG: [3.8, 6.4] },
              passe: ['ArD', 'AiG', 0.3],
              def: { D2: [4.0, 7.4], D3: [1.8, 6.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Remise au demi-centre, tir de l'arrière gauche",
          etapes: [
            ...HG_BASE,
            { texte: "L'arrière droit remet au demi-centre.", passe: ['ArD', 'DC', 0.2], def: { D3: [1.6, 7.0] } },
            {
              texte: "L'arrière gauche contourne vite le bloc du pivot sur le 1 et reçoit du demi-centre.",
              courses: { ArG: { vers: [-6.0, 4.6], via: [-7.2, 5.0] } },
              passe: ['DC', 'ArG', 0.4],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    {
      id: 'lorgnette',
      nom: 'La lorgnette',
      alias: 'Lille Ole (DA), Little Ole (EN)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Le demi-centre bloque le 2 gauche par l'intérieur, l'arrière droit croise derrière l'arrière gauche et choisit: tir, pivot ou ailier gauche.",
      description: [
        "Système envoyé à Dragør HK par Kim Ludwig. L'ailier gauche passe à l'arrière gauche, qui s'engage vers la droite. En même temps, le demi-centre va poser un bloc à l'intérieur du 2 gauche.",
        "L'arrière droit croise avec l'arrière gauche et peut tirer, passer au pivot, ou passer à l'ailier gauche qui a contourné le bloc du demi-centre (choisis une variante au-dessus du schéma).",
        "La fiche dit que l'arrière gauche s'engage \"vers 2G\" (le 2 droit); le schéma confirme une course en diagonale vers la droite. Le nom danois \"Lille Ole\" (petit Ole) n'a rien à voir avec une lorgnette.",
      ],
      objectif: "Libérer l'arrière droit au centre grâce au croisé, avec deux solutions de passe autour du bloc du demi-centre.",
      pointsCles: [
        "Le bloc du demi-centre est posé à l'intérieur du 2 gauche.",
        "L'arrière droit croise derrière l'arrière gauche pour recevoir lancé.",
        "L'ailier gauche contourne le bloc par l'extérieur du demi-centre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'La lorgnette (Dragør HK, envoyé par Kim Ludwig)', url: DRAGOR(72), note: "\"DC s'engage pour faire un bloc interne sur 2D. ARD effectue un croisé avec ARG et peut tirer, passer à PVT ou à ALG, qui a contourner le bloc de DC.\"" },
        TABLE_NOMS('Lille Ole', 'Nom danois de la fiche 72; "Little Ole" en anglais.'),
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [...LORGNETTE_BASE, { texte: "L'arrière droit tire.", courses: { ArD: [-0.8, 7.6] }, tir: { par: 'ArD', t: 0.4 } }],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...LORGNETTE_BASE,
            {
              texte: "Le 3 gauche sort sur l'arrière droit, qui passe au pivot.",
              courses: { Piv: [0.6, 6.2] },
              passe: ['ArD', 'Piv', 0.3],
              def: { G3: [-1.0, 7.4] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Passe à l'ailier gauche",
          etapes: [
            ...LORGNETTE_BASE,
            {
              texte: "L'ailier gauche contourne le bloc du demi-centre et reçoit de l'arrière droit.",
              courses: { AiG: { vers: [-2.8, 7.0], via: [-6.0, 8.6] } },
              passe: ['ArD', 'AiG', 0.5],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },
  );

})();
