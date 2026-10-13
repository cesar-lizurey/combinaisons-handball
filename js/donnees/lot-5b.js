/* pivot, écrans et blocs (2e partie) - écrans d'ailier et de demi-centre, mur, écran et contournement du pivot, blocs longs et extérieurs, pivot qui s'échappe, sorties et traversées du pivot (Dragør), jeu autour du pivot, glissements, blocs contre 1-5. */
(() => {
  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'ecran-ailier-entree-arriere',
      nom: "Écran de l'ailier sur entrée d'arrière",
      alias: 'Fløjscreening med backovergang (DA), Wing screening with backcourt running in (EN)',
      categorie: 'Écrans et blocs',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'ailier gauche fixe le 2, donne à l'arrière puis se place à l'extérieur du 1; après un aller-retour avec le demi-centre, l'arrière contourne le bloc de l'ailier.",
      description: [
        "Fiche de Dragør HK (f653). L'ailier gauche fixe le 2 (ce qui attire le 1) et passe à l'arrière gauche. Il se tient ensuite prêt à bloquer le 1 par l'extérieur.",
        "L'arrière gauche attaque et passe au demi-centre, qui fixe à gauche et lui remet le ballon. L'arrière contourne alors l'ailier, qui bloque le 1.",
        "La fiche ne dit pas où l'arrière tire: le schéma le fait passer à l'extérieur du bloc et tirer de là (interprétation).",
      ],
      objectif: "Libérer l'arrière à l'extérieur grâce à un bloc de l'ailier sur le 1.",
      pointsCles: [
        "La fixation de l'ailier doit attirer le 1 vers l'intérieur.",
        "Le bloc se pose sur l'extérieur du 1, au moment où l'arrière revient avec le ballon.",
        "L'arrière passe au ras du bloc pour que le 1 ne puisse pas le suivre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Écran de l'ailier sur entrée d'arrière (Dragør HK, f653)",
          url: 'http://www.dragoerhb.dk/fransk/f653.html',
          note: "ALG fixe 2D (attire 1D) et passe à ARG; ALG se tient prêt à bloquer l'extérieur de 1D; ARG passe au DC qui fixe à gauche et lui remet; ARG contourne ALG en bloc sur 1D.",
        },
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "L'ailier gauche attaque vers l'intérieur et fixe le 2; le 1 le suit. Il passe à l'arrière gauche.",
          courses: { AiG: [-6.8, 4.4], ArG: [-5.8, 9.2] },
          passe: ['AiG', 'ArG', 0.7],
          def: { G2: [-5.6, 5.6], G1: [-7.6, 3.6] },
        },
        {
          texte: "L'ailier se replace à l'extérieur du 1, prêt à le bloquer. L'arrière gauche attaque l'intervalle entre le 2 et le 3, puis donne au demi-centre.",
          courses: { AiG: { vers: [-8.6, 4.0], via: [-7.8, 5.4] }, ArG: [-3.8, 8.2], DC: [-1.0, 9.8] },
          passe: ['ArG', 'DC', 0.75],
          def: { G2: [-4.6, 6.6], G3: [-2.2, 7.2] },
        },
        {
          texte: "Le demi-centre fixe à gauche, entre le 3 et le 2. L'arrière gauche recule et s'écarte vers l'aile; le demi-centre lui remet le ballon.",
          courses: { DC: [-2.4, 8.4], ArG: { vers: [-6.8, 8.8], via: [-5.0, 9.8] } },
          passe: ['DC', 'ArG', 0.6],
          def: { G3: [-2.4, 7.4], G2: [-4.0, 6.6] },
        },
        {
          texte: "L'arrière gauche contourne l'ailier, qui bloque le 1 par l'extérieur. Le 1 ne peut pas sortir sur lui: l'arrière tire.",
          courses: { AiG: { vers: [-8.4, 4.0], ecran: true }, ArG: { vers: [-8.4, 6.0], via: [-8.6, 8.0] } },
          tir: { par: 'ArG', t: 0.8 },
          def: { G1: [-7.4, 4.0], G2: [-5.4, 6.0] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'le-mur',
      nom: 'Le mur',
      alias: 'Mur / The Wall (DA/EN)',
      categorie: 'Écrans et blocs',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le demi-centre, le pivot puis l'arrière gauche s'alignent en \"mur\" d'écrans au centre; l'ailier gauche entré passe devant et tire par-dessus.",
      description: [
        "Fiche de Dragør HK (f11): \"construire un mur écran qui donne une possibilité de tir pour ALG entré\". Le demi-centre passe à l'arrière gauche, entre et bloque le défenseur central.",
        "L'arrière gauche donne à son ailier et s'engage vers la droite; l'ailier entre à sa suite. L'ailier passe à l'arrière droit, qui fixe à l'extérieur, pendant que le pivot vient bloquer à côté du demi-centre.",
        "L'arrière gauche rejoint le pivot et fait écran contre les défenseurs qui arrivent par derrière. L'ailier continue sa course, reçoit de l'arrière droit et tire devant le mur.",
      ],
      objectif: "Offrir à l'ailier entré un tir de loin protégé par un mur de trois écrans.",
      pointsCles: [
        "Les trois écrans s'alignent côte à côte, face aux défenseurs du côté gauche.",
        "L'arrière droit fixe à l'extérieur pour retenir la droite de la défense.",
        "L'ailier ne s'arrête pas: il reçoit en course et tire par-dessus le mur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Le mur (Dragør HK, f11)',
          url: 'http://www.dragoerhb.dk/fransk/f11.html',
          note: '"Le but du système est de construire un mur écran qui donne une possibilité de tir pour ALG entré."',
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière gauche, entre et bloque le défenseur central, le 3 gauche.",
          courses: { DC: { vers: [-1.4, 7.7], ecran: true } },
          passe: ['DC', 'ArG', 0.1],
        },
        {
          texte: "L'arrière gauche donne à son ailier, qui remonte, puis s'engage vers la droite.",
          courses: { AiG: [-8.2, 4.6], ArG: [-3.6, 9.0] },
          passe: ['ArG', 'AiG', 0.15],
          def: { G1: [-7.6, 3.2] },
        },
        {
          texte: "L'ailier entre à la suite de l'arrière et du demi-centre; il passe à l'arrière droit, qui fixe à l'extérieur. Le pivot vient bloquer à côté du demi-centre, à l'extérieur.",
          courses: {
            AiG: { vers: [-6.0, 8.6], via: [-7.8, 7.2] },
            ArD: [6.2, 8.0],
            Piv: { vers: [-2.8, 7.2], via: [-1.0, 10.4], ecran: true },
          },
          passe: ['AiG', 'ArD', 0.15],
          def: { D2: [5.6, 6.4] },
        },
        {
          texte: "L'arrière gauche rejoint le pivot et fait écran contre les défenseurs qui arrivent par derrière: le mur est formé. L'ailier continue sa course.",
          courses: { ArG: { vers: [-4.2, 7.4], ecran: true }, AiG: [-3.0, 9.6] },
          def: { G2: [-4.4, 6.4], G1: [-6.6, 4.2] },
        },
        {
          texte: "L'arrière droit sert l'ailier, qui arrive devant le mur.",
          courses: { AiG: [-2.4, 9.3] },
          passe: ['ArD', 'AiG', 0.1],
        },
        { texte: "L'ailier gauche tire par-dessus le mur.", tir: 'AiG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ecran-du-dc',
      nom: "Écran du demi-centre pour l'arrière",
      alias: "Tir d'arrière avec écran du DC (f506), Rentrée d'arrière avec écran demi-centre 1 et 2 (f510, f509), Bloc du DC contre une défense très agressive (f355)",
      categorie: 'Écrans et blocs',
      defense: 'Non précisée (schéma en 0-6); f355: défense très agressive',
      resume: "Après une circulation, un écran (du demi-centre ou de l'arrière opposé qui entre) sur le 2 gauche libère le tir de l'arrière gauche; contre une défense agressive, le demi-centre bloque le 2 avancé.",
      description: [
        "Quatre fiches de Dragør HK. f506: l'arrière gauche fixe et passe vite au demi-centre, qui fixe, passe à l'arrière droit et part écranter le 2; l'arrière droit fixe et sert l'arrière gauche, qui tire grâce à l'écran.",
        "f510 et f509 (\"rentrée d'arrière\"): c'est l'arrière droit qui entre pour faire l'écran. Dans f510, le ballon passe par l'ailier droit et le demi-centre avant d'arriver à l'arrière gauche, qui tire sur l'écran. Dans f509, le ballon part vers l'arrière gauche avant que l'écran soit posé; l'arrière gauche sert le demi-centre, qui fixe à droite et tire.",
        "f355 (trad. J. Mallégol): contre une défense très agressive, le demi-centre passe à l'arrière droit puis pose un bloc sur le 2 avancé; l'arrière gauche part vers l'extérieur, revient à l'intérieur au ras du bloc, reçoit et tire à 6 m.",
        "Les fiches notent les défenseurs du point de vue de la défense (\"2D\" = le 2 qui fait face à l'arrière gauche): les étapes l'interprètent ainsi (confiance moyenne pour f510 et f509).",
      ],
      objectif: "Libérer le tir de l'arrière gauche par un écran sur son défenseur direct.",
      pointsCles: [
        "Les fixations et les passes sont rapides pour que l'écran arrive à temps.",
        "L'écran se pose sur le 2 au moment où l'arrière reçoit.",
        "Contre une défense agressive, l'arrière emmène d'abord le 2 vers l'extérieur avant de revenir au ras du bloc.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Tir d'arrière avec écran du demi-centre (Dragør HK, f506)",
          url: 'http://www.dragoerhb.dk/fransk/f506.html',
          note: "DC fixe, passe vite à ARD \"tout en partant faire un écran sur 2D\"; ARD passe à ARG \"qui profite de l'écran pour aller au tir\".",
        },
        {
          titre: "Rentrée d'arrière avec écran demi-centre 1 et 2 (Dragør HK, f510, f509)",
          url: 'http://www.dragoerhb.dk/fransk/f510.html',
          note: "f510: ARD part faire un écran sur 2D; DC passe à ARG qui fixe et tire sur l'écran. f509: la balle va à ARG qui passe à DC \"qui part fixer vers 2G et prend le tir\".",
        },
        {
          titre: 'Bloc du DC contre une défense très agressive (Dragør HK, f355, trad. J. Mallégol)',
          url: 'http://www.dragoerhb.dk/fransk/f355.html',
          note: "Après sa passe, DC fait un bloc-écran sur le défenseur avancé n°2; ARG attaque vers l'extérieur puis revient rapidement à l'intérieur; il reçoit de ARD et tire à 6 m.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Écran du demi-centre (f506)',
          etapes: [
            {
              texte: "L'arrière gauche fixe le 2 gauche et passe vite au demi-centre.",
              courses: { ArG: [-4.8, 8.4], DC: [-0.6, 9.8] },
              passe: ['ArG', 'DC', 0.7],
              def: { G2: [-4.8, 7.2] },
            },
            {
              texte: "Le demi-centre fixe, passe vite à l'arrière droit et part poser un écran sur le 2 gauche. L'arrière gauche recule.",
              courses: { DC: { vers: [-4.0, 7.0], via: [-1.4, 8.4], ecran: true }, ArG: [-5.8, 9.4], ArD: [5.2, 9.4] },
              passe: ['DC', 'ArD', 0.2],
              def: { G2: [-4.8, 6.2], G3: [-1.6, 7.0] },
            },
            {
              texte: "L'arrière droit fixe à son tour et renvoie à l'arrière gauche.",
              courses: { ArD: [3.6, 8.4], ArG: [-5.2, 9.6] },
              passe: ['ArD', 'ArG', 0.7],
              def: { D3: [2.4, 7.4] },
            },
            {
              texte: "L'arrière gauche prend appui derrière l'écran et tire au-dessus.",
              courses: { ArG: [-4.0, 8.4] },
              tir: { par: 'ArG', t: 0.6 },
            },
          ],
        },
        {
          nom: "2 - Rentrée de l'arrière droit, tir de l'arrière gauche (f510)",
          ballon: 'ArD',
          etapes: [
            {
              texte: "L'arrière droit passe à l'ailier droit, qui fixe le 1.",
              courses: { AiD: [8.2, 3.6] },
              passe: ['ArD', 'AiD', 0.1],
              def: { D1: [7.2, 2.8] },
            },
            {
              texte: "L'arrière droit traverse devant la défense pour aller écranter le 2 gauche. L'ailier passe au demi-centre, qui se décale vers le 2 droit.",
              courses: { ArD: { vers: [-4.0, 7.0], via: [0.8, 9.4], ecran: true }, DC: [2.6, 9.6] },
              passe: ['AiD', 'DC', 0.4],
              def: { G2: [-4.8, 6.2] },
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche, qui fixe.",
              courses: { ArG: [-5.0, 9.0] },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche tire au-dessus de l'écran.",
              courses: { ArG: [-4.4, 8.4] },
              tir: { par: 'ArG', t: 0.6 },
            },
          ],
        },
        {
          nom: "3 - Rentrée de l'arrière droit, tir du demi-centre (f509)",
          ballon: 'AiD',
          etapes: [
            {
              texte: "L'ailier droit passe à l'arrière droit, qui fait une rentrée vers le centre pour aller écranter le 2 gauche.",
              courses: { ArD: [1.6, 8.8] },
              passe: ['AiD', 'ArD', 0.1],
              def: { D3: [1.6, 7.6] },
            },
            {
              texte: "Avant de poser l'écran, l'arrière droit donne à l'arrière gauche, qui fixe.",
              courses: { ArD: [-2.4, 8.0], ArG: [-4.4, 8.6] },
              passe: ['ArD', 'ArG', 0.2],
              def: { G2: [-4.6, 7.0], D3: [1.4, 6.8] },
            },
            {
              texte: "L'arrière gauche sert le demi-centre, qui part fixer vers le 2 droit, dans l'espace laissé par l'arrière droit.",
              courses: { DC: { vers: [3.8, 8.4], via: [1.6, 10.0] } },
              passe: ['ArG', 'DC', 0.3],
              def: { D2: [4.6, 6.8] },
            },
            {
              texte: 'Le demi-centre tire.',
              courses: { DC: [4.0, 7.8] },
              tir: { par: 'DC', t: 0.6 },
            },
          ],
        },
        {
          nom: '4 - Bloc sur le 2 avancé (f355)',
          ballon: 'DC',
          depart: { G2: [-5.2, 7.6], D2: [5.2, 7.6] },
          etapes: [
            {
              texte: "Contre une défense très agressive, aux 2 avancés. Le demi-centre passe à l'arrière droit, qui attaque le 3 droit.",
              courses: { ArD: [2.6, 8.4] },
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [2.2, 7.4], D2: [4.2, 7.6] },
            },
            {
              texte: "Après sa passe, le demi-centre va bloquer le 2 gauche par l'intérieur. L'arrière gauche attaque d'abord vers l'extérieur; le 2 le suit.",
              courses: { DC: { vers: [-4.8, 7.4], ecran: true }, ArG: [-6.8, 8.8] },
              def: { G2: [-5.8, 7.6] },
            },
            {
              texte: "L'arrière gauche revient vite à l'intérieur, au ras du bloc. Le 2, bloqué, reste derrière.",
              courses: { ArG: { vers: [-3.6, 8.2], via: [-5.4, 9.6] } },
              def: { G3: [-2.4, 7.0] },
            },
            {
              texte: "L'arrière droit lui donne le ballon; l'arrière gauche entre jusqu'à 6 m.",
              courses: { ArG: [-3.2, 6.8] },
              passe: ['ArD', 'ArG', 0.2],
              def: { G3: [-2.2, 6.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-arriere-et-bloc',
      nom: "Entrée d'arrière et bloc sur l'ailier défensif",
      alias: "Tir de l'ailier avec feinte préalable (f104)",
      categorie: 'Écrans et blocs',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière gauche passe et entre jusqu'au 1 opposé pour le bloquer; l'arrière droit attaque, feinte le tir et sert l'ailier droit, libéré par le bloc.",
      description: [
        "Fiche de Dragør HK f105: l'arrière gauche passe à l'arrière droit et fait une entrée pour poser un bloc sur l'ailier défensif. L'arrière droit passe à l'ailier, la récupère en s'engageant, attaque le défenseur, feinte un tir et sert l'ailier, qui tire.",
        "Variante f104 (\"tir de l'ailier avec feinte préalable\"): pendant que l'arrière droit joue contre son défenseur, le passeur court poser son bloc sur le défenseur de l'ailier. L'ailier fait un appel extérieur puis intérieur, utilise le bloc et tire.",
        "Les fiches sont des exercices à trois joueurs: la place exacte du bloc est interprétée (côté extérieur du 1 dans f105, côté intérieur dans f104).",
      ],
      objectif: "Empêcher l'ailier défensif de sortir sur le tir de l'ailier.",
      pointsCles: [
        "Le bloqueur court vite pour arriver avant la passe à l'ailier.",
        "La feinte de tir de l'arrière attire le 1 vers l'intérieur.",
        "Dans f104, l'appel extérieur de l'ailier place le 1 à côté du bloc.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Entrée d'arrière et bloc (Dragør HK, f105)",
          url: 'http://www.dragoerhb.dk/fransk/f105.html',
          note: "ARG passe à ARD et fait une entrée pour poser un bloc sur le défenseur 1G; ARD attaque, feinte un tir mais passe à ALD qui tire.",
        },
        {
          titre: "Tir de l'ailier avec feinte préalable (Dragør HK, f104)",
          url: 'http://www.dragoerhb.dk/fransk/f104.html',
          note: "Le passeur \"court rapidement poser son bloc sur le défenseur de l'ailier\"; l'ailier fait externe-interne, utilise le bloc et tire.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Bloc sur le 1, feinte de tir de l'arrière (f105)",
          etapes: [
            {
              texte: "L'arrière gauche passe à l'arrière droit et entre vers la droite pour aller bloquer le 1 droit.",
              courses: { ArG: { vers: [1.8, 8.6], via: [-2.6, 9.4] } },
              passe: ['ArG', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit donne à l'ailier droit. L'arrière gauche continue sa course vers le 1.",
              courses: { ArG: [6.0, 6.4], AiD: [8.8, 2.0] },
              passe: ['ArD', 'AiD', 0.1],
              def: { D2: [5.0, 5.2] },
            },
            {
              texte: "L'ailier rend à l'arrière droit, qui s'engage.",
              courses: { ArD: [5.4, 8.4] },
              passe: ['AiD', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit attaque le 2 et feinte le tir; le 1 vient aider. L'arrière gauche pose son bloc sur le 1, côté extérieur. L'arrière droit sert l'ailier.",
              courses: { ArD: [5.6, 7.6], ArG: { vers: [7.8, 4.8], ecran: true }, AiD: [9.0, 2.4] },
              passe: ['ArD', 'AiD', 0.75],
              def: { D2: [5.0, 6.4], D1: [6.8, 4.4] },
            },
            {
              texte: "L'ailier droit tire; le 1, bloqué, ne peut pas revenir sur lui.",
              tir: 'AiD',
              def: { D1: [7.0, 4.0] },
            },
          ],
        },
        {
          nom: "2 - Bloc intérieur, appel extérieur-intérieur de l'ailier (f104)",
          etapes: [
            {
              texte: "L'arrière gauche passe à l'arrière droit, qui joue contre son défenseur. L'arrière gauche part aussitôt vers la droite.",
              courses: { ArD: [4.8, 8.2], ArG: [1.6, 8.8] },
              passe: ['ArG', 'ArD', 0.1],
              def: { D2: [4.6, 6.8] },
            },
            {
              texte: "L'arrière gauche court poser son bloc sur le 1 droit, côté intérieur. L'ailier droit fait un appel vers l'extérieur; le 1 le suit.",
              courses: { ArG: { vers: [7.4, 3.0], via: [5.6, 5.6], ecran: true }, AiD: [9.4, 2.0] },
              def: { D1: [8.2, 2.2] },
            },
            {
              texte: "L'ailier repart vers l'intérieur, au ras du bloc; l'arrière droit lui donne le ballon.",
              courses: { AiD: { vers: [6.6, 5.4], via: [8.8, 4.6] } },
              passe: ['ArD', 'AiD', 0.6],
              def: { D1: [8.4, 2.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'ecran-pivot-0-6',
      nom: 'Écran du pivot contre 0-6',
      alias: 'Tactique de match 07 (entrainement-handball.fr)',
      categorie: 'Écrans et blocs',
      defense: '0-6 alignée',
      resume: "Le pivot, entre les deux 3, fait écran; l'arrière court vers lui. Selon la réaction du défenseur: tir au-dessus de l'écran, débordement, ou passe au pivot.",
      description: [
        "Fiche \"Tactique de match 07\" du site entrainement-handball.fr. Le pivot se place entre les deux défenseurs centraux. L'arrière court vers lui: des défenseurs alignés ne peuvent pas se croiser, l'écran les gêne.",
        "Lecture: si les défenseurs restent à 6 m, l'arrière tire au-dessus de l'écran; si un défenseur monte, l'arrière le déborde et tire, ou passe au pivot libéré dans son dos.",
        "La source ne précise ni quel arrière ni la mise en place: le schéma la joue avec l'arrière gauche (principe très simple, fiche partielle).",
      ],
      objectif: "Utiliser le pivot comme écran fixe face à une défense alignée.",
      pointsCles: [
        "Le pivot reste bien placé entre les deux 3.",
        "L'arrière vient tout près du pivot pour que l'écran gêne son défenseur.",
        "La décision dépend du défenseur: reste-t-il à 6 m ou monte-t-il?",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Tactique de match 07: l'attaque d'une 0-6 par l'écran du pivot (entrainement-handball.fr)",
          url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-lattaque-dune-0-6-par-lecran-du-pivot/',
          note: "L'arrière court vers le pivot; défenseurs à 6 m vers tir au-dessus de l'écran; un défenseur monte vers débordement et tir, ou passe au pivot.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir au-dessus de l'écran",
          etapes: [
            {
              texte: "L'arrière gauche court en diagonale vers le pivot, qui fait écran devant le 3 gauche.",
              courses: { ArG: [-1.8, 9.0], Piv: { vers: [-0.6, 7.0], ecran: true } },
            },
            {
              texte: "Les défenseurs restent à 6 m: l'arrière gauche tire au-dessus de l'écran.",
              courses: { ArG: [-1.2, 9.2] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Un défenseur monte: débordement',
          etapes: [
            {
              texte: "L'arrière gauche court en diagonale vers le pivot, qui fait écran devant le 3 gauche.",
              courses: { ArG: [-1.8, 9.0], Piv: { vers: [-0.6, 7.0], ecran: true } },
            },
            {
              texte: "Le 3 gauche monte sur l'arrière: l'arrière le déborde par l'extérieur.",
              courses: { ArG: { vers: [-3.2, 7.4], via: [-3.4, 9.0] } },
              def: { G3: [-2.0, 7.8], G2: [-4.4, 6.0] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Un défenseur monte: passe au pivot',
          etapes: [
            {
              texte: "L'arrière gauche court en diagonale vers le pivot, qui fait écran devant le 3 gauche.",
              courses: { ArG: [-1.8, 9.0], Piv: { vers: [-0.6, 7.0], ecran: true } },
            },
            {
              texte: "Le 3 gauche monte sur l'arrière. Le pivot, libéré dans son dos, se présente et reçoit.",
              courses: { Piv: [-1.2, 6.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-1.9, 8.0], D3: [0.4, 6.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'contournement-pivot',
      nom: 'Contournement autour du pivot',
      alias: 'Tactique de match 08 (entrainement-handball.fr), "le contournement autour du pivot" (P. Teyssier)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6 de zone',
      resume: "Le pivot bloque le 3 par l'extérieur (ou le 2 par l'intérieur); l'arrière droit le contourne et lit le 2 et le 1: tir, passe au pivot ou décalage de l'ailier.",
      description: [
        'Fiche "Tactique de match 08" (entrainement-handball.fr) contre une 0-6 de zone: attaquer les bons intervalles, faire circuler le ballon plus vite que la défense, et placer le pivot en bloc externe sur le 3 pour "casser" le flottement.',
        "Fins: si le 2 et le 1 ne ferment pas, l'arrière droit tire; si le 1 ferme, décalage à l'aile; si le 2 ferme, passe au pivot.",
        "P. Teyssier (Approches du Handball n°78) distingue deux contournements: bloc du pivot sur le 3 vers contournement extérieur puis intérieur; bloc intérieur sur le 2 vers contournement intérieur puis extérieur.",
        "Les sources donnent peu de détails sur les courses: elles sont reconstituées à partir de ces principes.",
      ],
      objectif: "Empêcher le flottement de la défense en fixant un défenseur par le bloc du pivot, puis lire la réaction des autres.",
      pointsCles: [
        "Le bloc se pose avant que l'arrière revienne vers lui.",
        "L'arrière part d'abord du côté opposé, puis revient au ras du pivot.",
        "Peu de dribbles: le ballon doit circuler plus vite que la défense.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Tactique de match 08: l'attaque d'une 0-6 de zone, contournement (entrainement-handball.fr)",
          url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-lattaque-dune-0-6-de-zone-contournement/',
          note: "PV en bloc externe sur le n°3 pour casser le flottement; n°2 et n°1 ne ferment pas vers l'ARD tire; n°1 ferme vers décalage; n°2 ferme vers passe au PV.",
        },
        {
          titre: 'P. Teyssier, "Attaque: le contournement autour du pivot", Approches du Handball n°78',
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb78_attaque2.pdf',
          note: 'Bloc interne du PV sur le n°2 vers contournement interne/externe; bloc sur le n°3 vers contournement externe/interne.',
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Bloc externe sur le 3: l'arrière tire",
          etapes: [
            {
              texte: "Le pivot pose un bloc sur le 3 droit, côté extérieur. L'arrière droit part d'abord vers l'extérieur; le 2 sort.",
              courses: { Piv: { vers: [2.8, 6.8], ecran: true }, ArD: [6.4, 8.6] },
              def: { D2: [5.8, 7.0] },
            },
            {
              texte: "L'arrière droit revient vers l'intérieur et contourne le pivot. Le 3, bloqué, ne peut pas flotter.",
              courses: { ArD: { vers: [3.8, 8.2], via: [5.6, 9.6] } },
              def: { D2: [4.8, 6.6] },
            },
            {
              texte: "Le 2 et le 1 ne ferment pas: l'arrière droit tire.",
              courses: { ArD: [3.9, 7.9] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Bloc externe sur le 3: le 2 ferme, passe au pivot',
          etapes: [
            {
              texte: "Le pivot pose un bloc sur le 3 droit, côté extérieur. L'arrière droit part d'abord vers l'extérieur; le 2 sort.",
              courses: { Piv: { vers: [2.8, 6.8], ecran: true }, ArD: [6.4, 8.6] },
              def: { D2: [5.8, 7.0] },
            },
            {
              texte: "L'arrière droit revient vers l'intérieur et contourne le pivot. Le 3, bloqué, ne peut pas flotter.",
              courses: { ArD: { vers: [3.8, 8.2], via: [5.6, 9.6] } },
              def: { D2: [4.8, 6.6] },
            },
            {
              texte: "Le 2 ferme sur l'arrière: le pivot se retourne dans son dos et reçoit.",
              courses: { Piv: [3.4, 6.4] },
              passe: ['ArD', 'Piv', 0.5],
              def: { D2: [4.2, 7.2] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Bloc externe sur le 3: le 1 ferme, décalage',
          etapes: [
            {
              texte: "Le pivot pose un bloc sur le 3 droit, côté extérieur. L'arrière droit part d'abord vers l'extérieur; le 2 sort.",
              courses: { Piv: { vers: [2.8, 6.8], ecran: true }, ArD: [6.4, 8.6] },
              def: { D2: [5.8, 7.0] },
            },
            {
              texte: "L'arrière droit revient vers l'intérieur et contourne le pivot. Le 3, bloqué, ne peut pas flotter.",
              courses: { ArD: { vers: [3.8, 8.2], via: [5.6, 9.6] } },
              def: { D2: [4.8, 6.6] },
            },
            {
              texte: "Le 2 reste sur le pivot et le 1 ferme sur l'arrière: l'arrière droit décale l'ailier droit.",
              courses: { AiD: [8.8, 2.4] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D2: [4.0, 6.0], D1: [5.6, 6.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '4 - Bloc interne sur le 2 (Teyssier)',
          etapes: [
            {
              texte: "Le pivot va bloquer le 2 droit par l'intérieur. L'arrière droit part d'abord vers l'intérieur; le 3 sort.",
              courses: { Piv: { vers: [4.2, 5.9], via: [2.6, 7.0], ecran: true }, ArD: [3.4, 8.6] },
              def: { D3: [2.6, 7.4] },
            },
            {
              texte: "L'arrière droit repart vers l'extérieur et contourne le pivot: il attaque l'intervalle entre le 2 et le 1. Le 2, bloqué, ne peut pas sortir.",
              courses: { ArD: { vers: [6.2, 7.6], via: [5.2, 9.4] } },
              def: { D1: [7.6, 3.6], D3: [2.2, 7.0] },
            },
            {
              texte: "L'arrière droit tire.",
              courses: { ArD: [6.4, 7.2] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'bloc-long',
      nom: 'Bloc long du pivot',
      alias: 'Bloqueo largo (ES), dos bloqueos combinados (ES)',
      categorie: 'Écrans et blocs',
      defense: 'En ligne (0-6), aussi contre 5-1',
      resume: "Le pivot (ou le demi-centre) bloque un central par l'extérieur; le partenaire part d'abord à l'opposé, revient le long du bloc sur une longue trajectoire, dépasse deux défenseurs et joue un 2 contre 1.",
      description: [
        'Manuel Laguna (RFEBM, Comunicación Técnica n°264) définit le "bloqueo largo": un bloc qui permet au partenaire, par une trajectoire longue, de dépasser deux défenseurs et de créer une supériorité numérique.',
        "Exercice principal: le pivot fait un bloc long par l'extérieur d'un des deux centraux; le demi-centre part d'abord du côté opposé au bloc, puis revient le long du bloc et joue un 2 contre 1 du côté choisi. Il ne faut pas annoncer le bloc trop tôt.",
        "Variante: c'est le demi-centre qui bloque au profit d'un arrière, dans la zone opposée au pivot. Laguna décrit aussi deux blocs combinés après le renvoi de l'ailier: le demi-centre bloque de face le central libre, le pivot (placé un poste plus loin) bloque en première ligne, et l'arrière change de direction pour attaquer le but.",
        "Les schémas de la source n'ont pas été vus: côtés et fins sont reconstitués (le double bloc est décrit en style télégraphique).",
      ],
      objectif: "Faire dépasser deux défenseurs à un attaquant grâce à un bloc, pour jouer en surnombre.",
      pointsCles: [
        "Ne pas annoncer le bloc trop tôt.",
        "Le porteur part d'abord du côté opposé au bloc, puis revient au ras du bloqueur.",
        "Après le bloc, jouer vite le 2 contre 1.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'M. Laguna, "El ataque posicional en las etapas de formación: hacer bien lo fácil", Comunicación Técnica n°264 (RFEBM)',
          url: 'https://fmbalonmano.federatio.com/upload/descargas/ct264-270917.pdf',
          note: '"El pivote hace un "bloqueo largo" por la parte exterior de cualquiera de los 2 centrales defensores. El central atacante debe aprovecharlo para jugar 2x1 en el lado correspondiente"',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Bloc long du pivot pour le demi-centre',
          etapes: [
            {
              texte: "Le demi-centre part d'abord vers la gauche, du côté opposé au futur bloc. Les deux 3 se préparent.",
              courses: { DC: [-1.6, 9.6] },
              def: { G3: [-1.8, 7.4], D3: [1.2, 6.8] },
            },
            {
              texte: "Le pivot pose un bloc long par l'extérieur du 3 droit. Le demi-centre revient le long du bloc sur une longue trajectoire et dépasse les deux 3.",
              courses: { Piv: { vers: [2.4, 7.2], ecran: true }, DC: { vers: [3.4, 8.6], via: [0.8, 9.8] } },
              def: { G3: [-1.2, 7.0] },
            },
            {
              texte: "Le 2 droit sort sur lui: 2 contre 1 avec l'arrière droit, que le demi-centre sert.",
              courses: { ArD: [6.0, 8.6] },
              passe: ['DC', 'ArD', 0.5],
              def: { D2: [4.4, 7.2], D1: [7.2, 3.0] },
            },
            {
              texte: "L'arrière droit tire entre le 2 et le 1.",
              courses: { ArD: [6.2, 7.6] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Bloc long du demi-centre pour l'arrière gauche",
          ballon: 'ArG',
          depart: { Piv: [-3.4, 6.6] },
          etapes: [
            {
              texte: "Le pivot est à gauche, entre le 2 et le 3; l'action se joue dans l'autre zone. L'arrière gauche part d'abord vers l'extérieur, à l'opposé du futur bloc.",
              courses: { ArG: [-6.2, 8.8] },
              def: { G2: [-5.4, 6.4] },
            },
            {
              texte: "Le demi-centre pose un bloc long sur son vis-à-vis, le 3 droit, par l'extérieur. L'arrière gauche revient sur une longue trajectoire et dépasse le 3 gauche puis le 3 droit.",
              courses: { DC: { vers: [2.6, 7.6], ecran: true }, ArG: { vers: [3.4, 8.8], via: [-1.0, 10.2] } },
              def: { D3: [1.6, 7.0], G3: [-1.2, 7.2] },
            },
            {
              texte: "Le 2 droit sort sur lui: 2 contre 1 avec l'arrière droit, que l'arrière gauche sert.",
              courses: { ArD: [6.0, 8.6] },
              passe: ['ArG', 'ArD', 0.5],
              def: { D2: [4.4, 7.2], D1: [7.2, 3.0] },
            },
            {
              texte: "L'arrière droit tire entre le 2 et le 1.",
              courses: { ArD: [6.2, 7.6] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: "3 - Deux blocs combinés après le renvoi de l'ailier",
          ballon: 'ArD',
          depart: { Piv: [-3.4, 6.6] },
          etapes: [
            {
              texte: "Passes entre arrières: l'arrière droit donne à l'arrière gauche. Le pivot est placé un poste plus loin que le futur bloc.",
              courses: { ArG: [-5.6, 9.2] },
              passe: ['ArD', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe à son ailier.",
              courses: { AiG: [-8.4, 3.4] },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-7.6, 3.0] },
            },
            {
              texte: "L'ailier rend. Au même moment, deux blocs: le demi-centre attaque le central libre, le 3 gauche, et le bloque de face; le pivot bloque le 2 en première ligne.",
              courses: {
                DC: { vers: [-1.8, 7.7], ecran: true },
                Piv: { vers: [-4.2, 5.9], ecran: true },
                ArG: [-6.0, 9.0],
              },
              passe: ['AiG', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche ne va pas directement dans les blocs: il feinte vers l'extérieur, change de direction et attaque le but entre le 2 et le 3.",
              courses: { ArG: { vers: [-3.2, 8.0], via: [-7.6, 7.6] } },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'bloc-exterieur-danois',
      nom: 'Bloc extérieur du pivot sur le 1 ("solution danoise")',
      alias: 'Bloqueo exterior al defensa exterior (ES), bloqueo interior del pivote al defensor exterior (ES)',
      categorie: 'Écrans et blocs',
      defense: 'Ailiers défensifs qui sortent beaucoup (schéma en 0-6)',
      resume: "Le pivot, placé entre le 1 et le 2, bloque le 1 par l'extérieur quand celui-ci sort vers les 9 m: le 1 ne peut plus revenir sur l'ailier. Variante générale: bloc par l'intérieur.",
      description: [
        "J. L. Antón García (2010) retrace l'histoire des solutions d'attaque en infériorité numérique. Il présente comme \"particulièrement nouveau\" l'usage, par les Danois (vers 1995), du bloc du pivot par l'extérieur sur le défenseur extérieur, qui sortait souvent de façon exagérée vers les 9 m; le bloc par l'intérieur, lui, est devenu général.",
        "Le pivot s'installe dans la zone extérieure, sans que le 2 l'accompagne. Quand le 1 sort, le pivot le bloque côté touche, là où il n'attend personne, et l'ailier exploite l'espace.",
        "Le sens de jeu du bénéficiaire n'est pas détaillé (figures non vues): les étapes sont reconstituées, ici à 6 contre 6. Le nom espagnol \"la danesa\", cité sur un forum sans description, pourrait désigner ce bloc (hypothèse non sourcée).",
      ],
      objectif: "Exploiter la sortie exagérée de l'ailier défensif pour libérer l'ailier.",
      pointsCles: [
        "Le pivot se place dans l'intervalle entre le 1 et le 2.",
        "Le bloc se pose quand le 1 est déjà sorti vers les 9 m.",
        "Le bloc extérieur surprend: le 1 n'attend personne côté touche.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'J. L. Antón García, "Uso del "portero falso" en inferioridad numérica atacante", e-balonmano.com 6(1), 2010',
          url: 'https://dialnet.unirioja.es/descarga/articulo/3253764.pdf',
          note: '"muy especialmente novedoso fue [...] el uso por parte de los daneses del bloqueo exterior al defensa exterior, aprovechando que con frecuencia los exteriores [...] salían hacia 9 metros de forma exagerada"',
        },
        {
          titre: 'Forum Lo + Balonmano, "jugadas" (2003)',
          url: 'https://balonmano.mforos.com/142972/1144722-jugadas/',
          note: '"hay una jugada que se llama "danesa"" (aucune description; rapprochement non sourcé).',
        },
      ],
      ballon: 'ArG',
      depart: { Piv: [-6.2, 4.6] },
      variantes: [
        {
          nom: "1 - Bloc par l'extérieur (solution danoise)",
          etapes: [
            {
              texte: "Le pivot est dans la zone extérieure, entre le 1 et le 2. L'arrière gauche menace; le 1 sort exagérément vers les 9 m.",
              courses: { ArG: [-6.4, 8.8] },
              def: { G1: [-7.6, 6.4], G2: [-5.2, 6.4] },
            },
            {
              texte: "Le pivot bloque le 1 par l'extérieur, côté touche, là où il n'attend personne. L'arrière gauche sert l'ailier.",
              courses: { Piv: { vers: [-8.6, 5.8], ecran: true }, AiG: [-8.8, 2.4] },
              passe: ['ArG', 'AiG', 0.5],
            },
            {
              texte: "Le 1, bloqué, ne peut pas revenir: l'ailier gauche tire.",
              courses: { AiG: [-8.2, 3.0] },
              tir: { par: 'AiG', t: 0.5 },
              def: { G1: [-7.6, 5.8] },
            },
          ],
        },
        {
          nom: "2 - Bloc par l'intérieur",
          etapes: [
            {
              texte: "L'arrière gauche passe à son ailier. Le pivot vient bloquer le 1 par l'intérieur.",
              courses: { AiG: [-9.0, 2.0], Piv: { vers: [-6.8, 3.8], ecran: true } },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-7.6, 3.0] },
            },
            {
              texte: "L'ailier attaque vers l'intérieur; le 1, bloqué, ne peut pas fermer l'angle. L'ailier tire.",
              courses: { AiG: { vers: [-7.8, 4.8], via: [-8.8, 4.0] } },
              tir: { par: 'AiG', t: 0.8 },
            },
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'pivot-echappe',
      nom: "Pivot qui s'échappe",
      alias: 'Pivot échappe, mouvement leurre, "Kiel replacé" (FR)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (défenses 0-6 de haut niveau; schéma en 0-6)',
      resume: "Au moment où le duel s'engage, le pivot change d'intervalle: le défenseur est ralenti ou aspiré, et le porteur gagne son 1 contre 1. Plusieurs mouvements leurres le préparent.",
      description: [
        "Grégory Cojean (HBC Nantes) analyse dans Approches des Handballs n°200 et 201 les stratégies de préparation du duel en Ligue des champions. Le \"pivot échappe\": un joueur à l'intérieur de la défense change d'intervalle juste avant que le 1 contre 1 s'engage. Il l'associe à une passe renversée, une feinte de passe, une circulation de balle ou un mouvement de la base arrière.",
        "Illustrations décrites: rotation de la base arrière (le demi-centre ouvre l'espace pour l'arrière gauche puis permute avec l'arrière droit); rotation demi-centre / arrière gauche pour isoler un 3 (Nantes contre GOG, PSG contre Barcelone); \"Kiel replacé\" (GOG, Magdeburg): l'ailier droit vient jouer hors de son secteur, gêne le défenseur en se replaçant, et le pivot s'échappe pendant le duel du demi-centre; enfin le pivot qui feinte de s'échapper puis glisse sous le défenseur qui a anticipé.",
        "Le \"Kiel replacé\" est différent de l'enclenchement \"Kiel\" (Azna feinté) des sélections jeunes. Les schémas des articles n'ont pas été vus: côtés, intervalles et départs sont reconstitués d'après le texte.",
      ],
      objectif: "Ralentir la sortie du défenseur ciblé pour isoler un duel gagnant.",
      pointsCles: [
        "Le pivot change d'intervalle au moment exact où le porteur reçoit, pas avant.",
        "Le mouvement leurre (rotation, ailier hors secteur) aspire ou retarde le défenseur.",
        "Si la défense se concentre sur le duel, le ballon sort vite vers le joueur resté dans l'intervalle.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'G. Cojean, "Analyse des stratégies de préparation au duel 1vs1" partie 1/2, Approches des Handballs n°200 (janvier 2024)',
          url: 'https://www.centre-handball.com/wp-content/uploads/2024/02/Approches_n200_JANVIER202024.pdf',
          note: "Mouvement leurre combinant un mouvement de base arrière et un pivot qui s'échappe; \"pivot feinte échappe et glisse\".",
        },
        {
          titre: 'G. Cojean, "Analyse des stratégies de préparation au duel 1vs1" partie 2/2, Approches des Handballs n°201 (mars 2024)',
          url: 'https://www.centre-handball.com/wp-content/uploads/2024/04/Approches_n201_MARS-2024.pdf',
          note: "\"GOG utilise un mouvement périphérique associé à un pivot qui s'échappe dit Kiel replacé\"; \"L'équipe du PSG amorce une rotation DC/ARG associer à un pivot échappe pour isoler un numéro 3 barcelonais\".",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Rotation de la base arrière + pivot échappe',
          depart: { Piv: [-3.4, 6.6] },
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche et s'écarte vers la droite: il ouvre l'espace pour que l'arrière gauche joue autour du pivot, placé entre le 2 et le 3.",
              courses: { DC: [2.6, 10.0], ArG: [-4.4, 9.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche attaque autour du pivot puis ressort le ballon. Le demi-centre permute avec l'arrière droit, qui arrive au centre et reçoit.",
              courses: { ArG: [-2.4, 8.6], ArD: { vers: [0.6, 9.6], via: [3.4, 8.8] }, DC: [5.2, 9.6] },
              passe: ['ArG', 'ArD', 0.6],
              def: { G3: [-2.4, 7.6], G2: [-4.4, 6.0] },
            },
            {
              texte: "L'arrière gauche s'est replacé; l'arrière droit lui rend le ballon. Le 2, aspiré vers l'intérieur, sort en retard. Au moment où l'arrière reçoit, le pivot s'échappe dans l'intervalle voisin.",
              courses: { ArG: [-5.2, 9.2], Piv: [-0.4, 6.4] },
              passe: ['ArD', 'ArG', 0.3],
              def: { G3: [-1.8, 6.8], G2: [-4.6, 6.8] },
            },
            {
              texte: "L'arrière gauche engage son duel: intérieur, puis extérieur. Il gagne et marque dans l'intervalle entre le 2 et le 1.",
              courses: { ArG: { vers: [-6.4, 7.0], via: [-4.4, 8.4] } },
              tir: { par: 'ArG', t: 0.85 },
              def: { G2: [-5.0, 6.6], G1: [-7.6, 3.6] },
            },
          ],
        },
        {
          nom: '2 - Rotation DC / arrière gauche (Nantes)',
          ballon: 'ArD',
          etapes: [
            {
              texte: "Rotation: l'arrière gauche vient au centre, le demi-centre glisse à sa place, à gauche.",
              courses: { ArG: { vers: [-0.6, 9.8], via: [-3.0, 8.8] }, DC: { vers: [-5.0, 9.8], via: [-2.4, 11.0] } },
            },
            {
              texte: "L'arrière droit sert le nouveau demi-centre (l'ex-arrière gauche), qui engage son duel sur le 3 gauche. Au même moment, le pivot s'échappe dans l'intervalle voisin.",
              courses: { ArG: [-1.2, 8.2], Piv: [-2.8, 6.6] },
              passe: ['ArD', 'ArG', 0.1],
              def: { G3: [-1.4, 7.2], D3: [0.2, 7.2], G2: [-3.8, 6.0] },
            },
            {
              texte: "Le duel se joue dans une concentration de défenseurs: la solution est à gauche. Le ballon sort vers l'ex-demi-centre, placé dans l'intervalle.",
              courses: { DC: [-5.4, 8.0] },
              passe: ['ArG', 'DC', 0.3],
            },
            {
              texte: "L'ex-demi-centre, devenu arrière gauche, marque.",
              courses: { DC: [-5.6, 7.4] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: '3 - Rotation DC / arrière gauche, duel dissuadé (PSG)',
          ballon: 'ArD',
          etapes: [
            {
              texte: "Rotation: l'arrière gauche vient au centre, le demi-centre glisse à sa place, à gauche.",
              courses: { ArG: { vers: [-0.6, 9.8], via: [-3.0, 8.8] }, DC: { vers: [-5.0, 9.8], via: [-2.4, 11.0] } },
            },
            {
              texte: "Le 3 droit anticipe et monte d'un cran; le pivot tente de s'échapper, mais le 3 gauche lui barre la route. Le 2 droit dissuade la passe vers le centre.",
              courses: { Piv: [-0.9, 6.4] },
              def: { D3: [1.0, 8.2], G3: [-1.6, 7.0], D2: [4.0, 8.2] },
            },
            {
              texte: "L'arrière droit feinte la passe, dribble et joue un duel extérieur puis intérieur sur le 2.",
              courses: { ArD: { vers: [3.8, 8.4], via: [6.6, 8.8] } },
              def: { D2: [4.6, 7.2] },
            },
            {
              texte: "Le 3 étagé vient fermer: l'arrière droit décale le nouveau demi-centre (l'ex-arrière gauche).",
              courses: { ArG: [0.2, 8.8] },
              passe: ['ArD', 'ArG', 0.5],
              def: { D3: [2.8, 8.0] },
            },
            { texte: "L'ex-arrière gauche marque.", tir: 'ArG' },
          ],
        },
        {
          nom: '4 - "Kiel replacé" (GOG, Magdeburg)',
          ballon: 'ArD',
          etapes: [
            {
              texte: "L'ailier droit quitte son poste et vient jouer à l'intérieur, devant le 3 droit, pour perturber la défense.",
              courses: { AiD: { vers: [2.8, 7.8], via: [7.4, 6.8] } },
              def: { D1: [7.0, 3.2] },
            },
            {
              texte: "Il se replace à son poste en passant devant le 3, qu'il ralentit. L'arrière droit donne au demi-centre, qui engage son duel; au même moment, le pivot s'échappe dans l'intervalle entre le 3 et le 2.",
              courses: { AiD: { vers: [8.6, 2.6], via: [5.4, 6.6] }, DC: [1.0, 8.6], Piv: [3.4, 6.4] },
              passe: ['ArD', 'DC', 0.3],
              def: { D3: [1.8, 7.2], D1: [7.4, 2.2] },
            },
            {
              texte: "Le 3, ralenti, sort trop tard et perd le duel: le demi-centre tire (dans l'exemple de Magdeburg, il obtient un jet de 7 m).",
              courses: { DC: { vers: [2.6, 7.6], via: [0.6, 7.8] } },
              tir: { par: 'DC', t: 0.8 },
              def: { D3: [1.2, 7.4] },
            },
          ],
        },
        {
          nom: "5 - Le pivot feinte de s'échapper et glisse",
          ballon: 'ArG',
          etapes: [
            {
              texte: "L'arrière gauche prépare son duel. Le pivot feinte de partir vers l'intervalle entre le 3 et le 2 gauches; le 3 anticipe et monte lui couper la route.",
              courses: { ArG: [-4.2, 9.0], Piv: [-0.9, 6.6] },
              def: { G3: [-2.6, 7.4] },
            },
            {
              texte: "Le pivot glisse sous le 3, côté but, dans l'intervalle visé; l'arrière gauche le sert.",
              courses: { Piv: { vers: [-3.0, 6.3], via: [-1.8, 6.0] } },
              passe: ['ArG', 'Piv', 0.6],
              def: { G2: [-4.6, 5.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'pivot-sort-vers-avance',
      nom: "Pivot qui sort vers l'avancé puis rentre vers l'ailier",
      alias: 'Zusammenspiel Außen und Kreis (DE)',
      categorie: 'Jeu avec le pivot',
      defense: "5-1 (avec un avancé)",
      dispositif: '5-1',
      resume: "Le pivot quitte l'intervalle 2-1, sort jusqu'à l'avancé et sert de relais, puis retourne à sa place; l'arrière gauche percute, donne à l'ailier, qui feinte la remise et sert le pivot qui rentre.",
      description: [
        "Exercice de handballtraining.tv, présenté aussi comme enclenchement \"pour des moments de surprise\". Le pivot part de l'intervalle entre le demi-défenseur et l'ailier défensif (le 2 et le 1).",
        "L'arrière gauche passe au demi-centre. Le pivot sort jusqu'à l'avancé et reçoit du demi-centre, qui récupère le ballon et sert l'arrière gauche lancé. Pendant ce temps, le pivot retourne à sa position. L'arrière gauche passe à l'ailier, qui feinte une passe en retour puis sert le pivot qui rentre.",
        "Variante citée: le pivot sert directement l'arrière droit au lieu du demi-centre (la suite n'est pas détaillée; le schéma montre un tir de l'arrière droit). D'autres options sont citées sans détail: écran sur l'avancé, passes de l'ailier variées (feinte, passe sans regarder).",
      ],
      objectif: "Attirer l'avancé et vider l'intervalle 2-1 pour que le pivot y revienne lancé.",
      pointsCles: [
        "La sortie du pivot vers l'avancé attire l'attention de la défense loin de l'aile.",
        "Le pivot revient à sa place pendant que l'arrière percute.",
        "La feinte de remise de l'ailier fixe le 1 avant la passe au pivot.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Zusammenspiel Außen und Kreis (handballtraining.tv)',
          url: 'https://www.handballtraining.tv/handball%C3%BCbung/zusammenspiel-aussen-und-kreis',
          note: "Le pivot sort de l'intervalle demi-extérieur jusqu'à l'avancé et reçoit de RM; l'ailier \"legt aber auf den hineinlaufenden Kreisläufer ab\".",
        },
      ],
      ballon: 'ArG',
      depart: { Piv: [-6.4, 4.2] },
      variantes: [
        {
          nom: "1 - Passe de l'ailier au pivot qui rentre",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre. Le pivot quitte l'intervalle entre le 2 et le 1 et sort jusqu'à l'avancé.",
              courses: { Piv: { vers: [-1.2, 9.4], via: [-4.4, 8.0] } },
              passe: ['ArG', 'DC', 0.1],
              def: { G2: [-4.4, 5.8] },
            },
            {
              texte: "Le demi-centre sert le pivot. L'avancé se tourne vers lui.",
              passe: ['DC', 'Piv', 0.2],
              def: { D3: [-0.4, 8.4] },
            },
            {
              texte: "Le pivot rend au demi-centre puis retourne à sa position de départ.",
              courses: { Piv: { vers: [-6.4, 4.4], via: [-5.0, 8.2] }, DC: [0.8, 10.0] },
              passe: ['Piv', 'DC', 0.1],
              def: { D3: [0, 9.0] },
            },
            {
              texte: "Le demi-centre sert l'arrière gauche, qui percute.",
              courses: { ArG: [-4.6, 8.0] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-4.4, 6.8] },
            },
            {
              texte: "L'arrière gauche passe à son ailier.",
              courses: { AiG: [-8.6, 2.6] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G1: [-7.8, 3.2] },
            },
            {
              texte: "L'ailier feinte de rendre à l'arrière, puis sert le pivot qui rentre dans l'intervalle.",
              courses: { Piv: [-5.4, 5.2] },
              passe: ['AiG', 'Piv', 0.5],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Le pivot sert directement l'arrière droit",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre. Le pivot quitte l'intervalle entre le 2 et le 1 et sort jusqu'à l'avancé.",
              courses: { Piv: { vers: [-1.2, 9.4], via: [-4.4, 8.0] } },
              passe: ['ArG', 'DC', 0.1],
              def: { G2: [-4.4, 5.8] },
            },
            {
              texte: "Le demi-centre sert le pivot. L'avancé se tourne vers lui.",
              passe: ['DC', 'Piv', 0.2],
              def: { D3: [-0.4, 8.4] },
            },
            {
              texte: "Le pivot sert directement l'arrière droit, qui percute, puis retourne à sa place.",
              courses: { Piv: { vers: [-6.4, 4.4], via: [-5.0, 8.2] }, ArD: [4.4, 8.2] },
              passe: ['Piv', 'ArD', 0.1],
              def: { D2: [4.4, 6.6] },
            },
            {
              texte: "L'avancé, attiré à gauche, ne peut pas aider: l'arrière droit tire.",
              courses: { ArD: [3.6, 7.8] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-pivot-ailier',
      nom: 'Croisé pivot / ailier',
      alias: 'Croisé PVT Ailiers (Dragør f230), cruce extremo-pivote móvil (ES)',
      categorie: 'Jeu avec le pivot',
      defense: '4-2 / 5-1 offensive; non précisée (f230); défense à 6 (Antón)',
      resume: "Le pivot sort de la défense et croise avec l'ailier: il reçoit et tire près de l'aile, ou bien sert l'ailier lancé en lui faisant écran.",
      description: [
        "Dragør HK (f230): \"croisés entre Pivot et ailiers ou arrières, où le pivot sort des six mètres, reçoit la balle et va tirer\". Le texte ne décrit que le schéma (lecture incertaine): l'arrière passe, le pivot sort en contournant son défenseur vers l'aile, deux passes entre ailier et pivot, tir près de l'aile.",
        "Forum handballecke (contre 4-2 ou 5-1 offensive): un arrière passe au pivot, qui fait un ou deux pas vers le ballon; l'ailier arrive lancé et croise avec lui; le pivot pose un écran intérieur sur son propre défenseur ou, à défaut, sur l'ailier défensif qui suit. L'ailier a la voie libre, ou rend au pivot qui tient son écran.",
        "J. L. Antón (2010): \"croisé ailier - pivot mobile\", utilisé par la Russie au Mondial 2007. Le pivot sort par une trajectoire courbe jusqu'aux 9 m, file vers l'ailier et passe derrière lui pour tirer de l'aile; si l'ailier défensif réagit, une \"colgada\" (passe lobée en l'air) sert l'arrière opposé. Antón le décrit dans un contexte d'infériorité numérique, à la limite du jeu passif; le schéma le montre à 6 contre 6.",
      ],
      objectif: "Surprendre l'ailier défensif par un croisé avec un pivot sorti de la défense.",
      pointsCles: [
        "Le pivot sort de la défense avant de croiser, pour arriver lancé.",
        "Au croisement, le joueur qui passe derrière reçoit le ballon.",
        "Contre 4-2, l'écran du pivot se pose sur le défenseur qui suit l'ailier.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Croisé Pivot / Ailiers (Dragør HK, f230)',
          url: 'http://www.dragoerhb.dk/fransk/f230.html',
          note: "\"Le schéma représente l'exercice des deux côtés. Les pivots peuvent changer de côté.\" (déroulement lu sur le schéma, confiance faible).",
        },
        {
          titre: 'Kombination gegen eine 4-2 Abwehr bzw. eine offensive 5-1 (forum handballecke.de, post n°5)',
          url: 'https://www.handballecke.de/forum/thread/32440-kombination-gegen-eine-4-2-abwehr-bzw-eine-offensive-5-1/',
          note: "Passe au pivot qui se propose; croisé pivot-ailier; écran intérieur du pivot sur son défenseur ou sur l'ailier défensif; ailier libre ou passe en retour au pivot.",
        },
        {
          titre: 'J. L. Antón García, "Uso del "portero falso" en inferioridad numérica atacante", e-balonmano.com 6(1), 2010',
          url: 'https://dialnet.unirioja.es/descarga/articulo/3253764.pdf',
          note: '"cruces de los extremos con los pivotes como beneficiarios que, saliendo desde el interior del dispositivo defensivo, y a la altura del tercer defensor, hacían una trayectoria curvilínea hacia afuera -9 metros- para posteriormente dirigirse hacia el extremo y por detrás de éste"',
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Dragør f230: le pivot tire près de l'aile",
          etapes: [
            {
              texte: "Le pivot sort des 6 m en contournant son défenseur vers l'aile; l'arrière droit lui passe.",
              courses: { Piv: { vers: [6.4, 7.6], via: [3.6, 8.0] } },
              passe: ['ArD', 'Piv', 0.6],
              def: { D2: [5.2, 5.8] },
            },
            {
              texte: "Le pivot donne à l'ailier droit, qui remonte.",
              courses: { AiD: [8.8, 3.0] },
              passe: ['Piv', 'AiD', 0.2],
            },
            {
              texte: "L'ailier rentre vers l'intérieur; le pivot croise derrière lui vers l'aile et reçoit.",
              courses: { AiD: [6.0, 6.6], Piv: { vers: [8.6, 4.4], via: [8.4, 7.6] } },
              passe: ['AiD', 'Piv', 0.55],
              def: { D2: [5.4, 5.6], D1: [7.6, 3.0] },
            },
            {
              texte: "Le pivot tire depuis l'aile.",
              courses: { Piv: [8.4, 3.9] },
              tir: { par: 'Piv', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Contre 4-2: écran du pivot, l'ailier tire",
          dispositif: '4-2',
          ballon: 'ArG',
          depart: { Piv: [-2.8, 6.6] },
          etapes: [
            {
              texte: "L'arrière gauche passe au pivot, qui fait un ou deux pas vers le ballon. Son défenseur, le 2, le suit.",
              courses: { Piv: [-3.6, 7.6] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G2: [-4.2, 6.8] },
            },
            {
              texte: "L'ailier gauche arrive lancé et croise avec le pivot, qui lui remet le ballon et pose un écran intérieur sur le 2.",
              courses: { AiG: { vers: [-1.8, 7.2], via: [-7.4, 8.8] }, Piv: { vers: [-3.5, 6.8], ecran: true } },
              passe: ['Piv', 'AiG', 0.6],
              def: { G2: [-4.5, 6.7], G3: [-2.6, 8.6] },
            },
            { texte: "L'ailier a la voie libre et tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Contre 4-2: passe en retour au pivot',
          dispositif: '4-2',
          ballon: 'ArG',
          depart: { Piv: [-2.8, 6.6] },
          etapes: [
            {
              texte: "L'arrière gauche passe au pivot, qui fait un ou deux pas vers le ballon. Son défenseur, le 2, le suit.",
              courses: { Piv: [-3.6, 7.6] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G2: [-4.2, 6.8] },
            },
            {
              texte: "L'ailier gauche arrive lancé et croise avec le pivot, qui lui remet le ballon. Le 1 suit l'ailier: le pivot pose son écran sur lui. Le 2 lâche le pivot pour prendre l'ailier.",
              courses: { AiG: { vers: [-2.4, 8.2], via: [-7.4, 8.8] }, Piv: { vers: [-3.8, 7.4], ecran: true } },
              passe: ['Piv', 'AiG', 0.6],
              def: { G1: [-4.8, 7.8], G2: [-2.8, 7.0] },
            },
            {
              texte: "Passe en retour au pivot, qui tient son écran sur le 1 puis se retourne vers le but.",
              courses: { Piv: [-4.0, 6.6] },
              passe: ['AiG', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Croisé ailier - pivot mobile (Antón, Russie 2007)',
          etapes: [
            {
              texte: "Le pivot, à hauteur des 3, sort de la défense par une trajectoire courbe jusqu'aux 9 m. L'arrière droit donne à l'ailier.",
              courses: { Piv: { vers: [4.0, 9.4], via: [1.4, 9.0] }, AiD: [8.8, 2.2] },
              passe: ['ArD', 'AiD', 0.5],
            },
            {
              texte: "L'ailier attaque vers l'intérieur et emmène le 1. Le pivot file vers l'aile et passe derrière lui; l'ailier lui donne le ballon.",
              courses: { AiD: [7.0, 5.0], Piv: { vers: [8.8, 3.6], via: [8.6, 7.6] } },
              passe: ['AiD', 'Piv', 0.6],
              def: { D1: [6.6, 4.0], D2: [5.2, 5.8] },
            },
            {
              texte: "L'ailier défensif est surpris: le pivot tire depuis l'aile.",
              courses: { Piv: [8.6, 3.4] },
              tir: { par: 'Piv', t: 0.5 },
            },
          ],
        },
        {
          nom: '5 - Suite: "colgada" pour l\'arrière opposé',
          etapes: [
            {
              texte: "Le pivot, à hauteur des 3, sort de la défense par une trajectoire courbe jusqu'aux 9 m. L'arrière droit donne à l'ailier.",
              courses: { Piv: { vers: [4.0, 9.4], via: [1.4, 9.0] }, AiD: [8.8, 2.2] },
              passe: ['ArD', 'AiD', 0.5],
            },
            {
              texte: "L'ailier attaque vers l'intérieur et emmène le 1. Le pivot file vers l'aile et passe derrière lui; l'ailier lui donne le ballon.",
              courses: { AiD: [7.0, 5.0], Piv: { vers: [8.8, 3.6], via: [8.6, 7.6] } },
              passe: ['AiD', 'Piv', 0.6],
              def: { D1: [6.6, 4.0], D2: [5.2, 5.8] },
            },
            {
              texte: "L'ailier défensif revient sur le tir du pivot. Le pivot lobe le ballon en l'air (\"colgada\") pour l'arrière gauche, qui s'envole au-dessus de la zone.",
              courses: { ArG: { vers: [-0.6, 5.4], via: [-3.0, 8.4] } },
              passe: ['Piv', 'ArG', 0.4],
              def: { D1: [7.8, 2.8] },
              enLAir: ['ArG'],
            },
            { texte: "L'arrière gauche tire en l'air.", tir: 'ArG', enLAir: ['ArG'] },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'udryk-fra-streg',
      nom: 'Sortie du pivot (relais puis vague de fixations)',
      alias: 'Udryk fra streg (DA), Pivot moving out (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le pivot sort vers l'ailier gauche et sert de relais à l'arrière gauche; celui-ci fixe au centre, puis une vague de fixations vers la droite amène l'ailier droit, rentré du fond, au tir derrière le 1.",
      description: [
        "Fiche danoise de Dragør HK (x1060). Le pivot part d'entre les deux 3. Le demi-centre passe à l'arrière gauche pendant que le pivot sort vers l'ailier gauche. L'arrière gauche sert le pivot, rentre vers l'intérieur et reçoit en retour.",
        "L'arrière gauche fixe à l'ancienne place du pivot et passe au demi-centre, qui fixe entre le 3 et le 2 droits (tir ou passe); l'arrière droit fixe entre le 2 et le 1 (tir ou passe); l'ailier droit, qui s'est placé tout au fond, rentre et conclut derrière l'ailier défensif.",
        "Chaque fixation peut se terminer par un tir: les étapes montrent la vague complète jusqu'à l'ailier.",
      ],
      objectif: "Vider le centre par la sortie du pivot, puis déplacer la défense par des fixations successives.",
      pointsCles: [
        "Le pivot sert de relais, comme un arrière provisoire.",
        "Chaque joueur fixe vraiment son intervalle avant de passer.",
        "L'ailier droit reste au fond, sur la ligne de but, pour rentrer dans le dos du 1.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Udryk fra streg (Dragør HK, x1060)',
          url: 'http://www.dragoerhb.dk/x1060.html',
          note: "\"HF, som er trukket helt til baglinien, rykker ind og afslutter bag forsvarets HF\" (l'ailier droit, placé sur la ligne de fond, rentre et conclut derrière l'ailier défensif).",
        },
      ],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière gauche. Au même moment, le pivot sort de la défense et se déplace vers l'ailier gauche.",
          courses: { Piv: { vers: [-6.8, 7.4], via: [-3.0, 8.4] } },
          passe: ['DC', 'ArG', 0.1],
        },
        {
          texte: "L'arrière gauche sert le pivot et rentre vers l'intérieur.",
          courses: { ArG: [-2.8, 9.2] },
          passe: ['ArG', 'Piv', 0.1],
        },
        {
          texte: "Le pivot lui redonne le ballon. L'ailier droit recule tout au fond, sur la ligne de but.",
          courses: { ArG: [-1.2, 9.0], AiD: [9.6, 0.4] },
          passe: ['Piv', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche fixe à l'ancienne place du pivot, au centre, puis passe au demi-centre.",
          courses: { ArG: [-0.4, 8.2], DC: [2.4, 9.8] },
          passe: ['ArG', 'DC', 0.7],
          def: { G3: [-1.0, 7.2], D3: [1.0, 7.2] },
        },
        {
          texte: "Le demi-centre fixe entre le 3 et le 2 droits, puis passe à l'arrière droit.",
          courses: { DC: [3.0, 8.4], ArD: [6.0, 9.4] },
          passe: ['DC', 'ArD', 0.7],
          def: { D3: [2.2, 7.4], D2: [4.4, 6.6] },
        },
        {
          texte: "L'arrière droit fixe entre le 2 et le 1, puis passe à l'ailier droit.",
          courses: { ArD: [6.4, 7.8] },
          passe: ['ArD', 'AiD', 0.7],
          def: { D2: [5.6, 6.6], D1: [7.6, 4.4] },
        },
        {
          texte: "L'ailier droit rentre derrière l'ailier défensif et conclut.",
          courses: { AiD: [7.9, 0.8] },
          tir: { par: 'AiD', t: 0.6 },
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'stregovergang-rygscreening',
      nom: 'Traversée du pivot avec écran de dos',
      alias: 'Stregovergang (DA, x405), Pivot running in (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "Le pivot sort, reçoit du demi-centre, traverse vers la droite en donnant à l'arrière gauche et pose un écran de dos; le demi-centre, qui a glissé vers le poste d'arrière droit, attaque à l'extérieur du 2.",
      description: [
        "Fiche danoise de Dragør HK (x405). Le pivot sort et reçoit aussitôt du demi-centre. Il traverse vers l'arrière opposé et pose un écran de dos; en route, il donne le ballon à l'arrière gauche, qui fixe vers l'extérieur sur son défenseur.",
        "Le ballon revient au demi-centre qui, après avoir avancé \"en hésitant\" vers le poste d'arrière droit, accélère sur la passe et attaque à l'extérieur du 2 droit. L'arrière droit se déplace vers le poste du demi-centre (permutation).",
        "Fins citées: l'arrière gauche redonne au pivot si le 3 ne l'a pas suivi; l'arrière gauche tire à l'extérieur de son défenseur; le demi-centre conclut; l'arrière gauche sert l'arrière droit (arrivé au centre), qui tire ou sert le pivot. Une autre fin (\"l'arrière gauche devenu demi-centre tire\") contredit le reste du texte et n'est pas reprise; \"les ailiers peuvent aussi se retrouver libres\".",
        "Le texte mélange les notations des postes et la fiche contient des schémas non analysés: la place de l'écran (sur l'extérieur du 2 droit) est interprétée.",
      ],
      objectif: "Déplacer le pivot pour qu'il serve de relais puis d'écran, et faire attaquer le demi-centre lancé à l'extérieur.",
      pointsCles: [
        "Le pivot reçoit dès sa sortie, puis traverse sans s'arrêter.",
        "Le demi-centre avance lentement puis accélère sur la passe.",
        "L'arrière gauche lit le 3: s'il n'a pas suivi le pivot, il lui rend le ballon.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Stregovergang (Dragør HK, x405)',
          url: 'http://www.dragoerhb.dk/x405.html',
          note: "\"ST løber overgang mod modsatte back og sætter rygscreening til denne\" (le pivot traverse vers l'arrière opposé et lui pose un écran de dos).",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Le 3 ne suit pas: retour au pivot',
          etapes: [
            {
              texte: 'Le pivot sort de la défense et reçoit aussitôt du demi-centre.',
              courses: { Piv: [-0.6, 8.8] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [-1.2, 7.4] },
            },
            {
              texte: "Le pivot traverse vers la droite; en route, il donne le ballon à l'arrière gauche.",
              courses: { Piv: { vers: [2.6, 7.8], via: [1.0, 9.0] }, ArG: [-5.4, 9.2] },
              passe: ['Piv', 'ArG', 0.2],
              def: { G3: [-1.7, 6.6] },
            },
            {
              texte: "Le 3 droit n'a pas suivi le pivot: l'arrière gauche lui redonne le ballon entre le 3 et le 2.",
              courses: { Piv: [3.2, 6.6] },
              passe: ['ArG', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Tir de l'arrière gauche",
          etapes: [
            {
              texte: 'Le pivot sort de la défense et reçoit aussitôt du demi-centre.',
              courses: { Piv: [-0.6, 8.8] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [-1.2, 7.4] },
            },
            {
              texte: "Le pivot traverse vers la droite; en route, il donne le ballon à l'arrière gauche.",
              courses: { Piv: { vers: [2.6, 7.8], via: [1.0, 9.0] }, ArG: [-5.4, 9.2] },
              passe: ['Piv', 'ArG', 0.2],
              def: { G3: [-1.7, 6.6] },
            },
            {
              texte: "Le pivot pose un écran de dos sur le 2 droit, côté extérieur. L'arrière gauche fixe vers l'extérieur sur le 2 gauche. Le demi-centre avance en hésitant vers le poste d'arrière droit; l'arrière droit glisse vers le centre.",
              courses: {
                Piv: { vers: [5.8, 6.8], ecran: true },
                ArG: [-6.2, 8.4],
                DC: [2.8, 9.8],
                ArD: { vers: [0.8, 10.4], via: [4.0, 11.2] },
              },
              def: { D2: [4.8, 6.2], G2: [-5.6, 6.8] },
            },
            {
              texte: "L'arrière gauche tire à l'extérieur de son défenseur.",
              courses: { ArG: [-6.8, 7.6] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: "3 - Le demi-centre attaque à l'extérieur du 2 droit",
          etapes: [
            {
              texte: 'Le pivot sort de la défense et reçoit aussitôt du demi-centre.',
              courses: { Piv: [-0.6, 8.8] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [-1.2, 7.4] },
            },
            {
              texte: "Le pivot traverse vers la droite; en route, il donne le ballon à l'arrière gauche.",
              courses: { Piv: { vers: [2.6, 7.8], via: [1.0, 9.0] }, ArG: [-5.4, 9.2] },
              passe: ['Piv', 'ArG', 0.2],
              def: { G3: [-1.7, 6.6] },
            },
            {
              texte: "Le pivot pose un écran de dos sur le 2 droit, côté extérieur. L'arrière gauche fixe vers l'extérieur sur le 2 gauche. Le demi-centre avance en hésitant vers le poste d'arrière droit; l'arrière droit glisse vers le centre.",
              courses: {
                Piv: { vers: [5.8, 6.8], ecran: true },
                ArG: [-6.2, 8.4],
                DC: [2.8, 9.8],
                ArD: { vers: [0.8, 10.4], via: [4.0, 11.2] },
              },
              def: { D2: [4.8, 6.2], G2: [-5.6, 6.8] },
            },
            {
              texte: "Le ballon revient au demi-centre, qui accélère sur la passe et attaque à l'extérieur du 2 droit, autour de l'écran.",
              courses: { DC: { vers: [6.8, 8.0], via: [5.2, 9.8] } },
              passe: ['ArG', 'DC', 0.2],
              def: { D1: [7.6, 4.6] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "4 - Passe à l'arrière droit, arrivé au centre",
          etapes: [
            {
              texte: 'Le pivot sort de la défense et reçoit aussitôt du demi-centre.',
              courses: { Piv: [-0.6, 8.8] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [-1.2, 7.4] },
            },
            {
              texte: "Le pivot traverse vers la droite; en route, il donne le ballon à l'arrière gauche.",
              courses: { Piv: { vers: [2.6, 7.8], via: [1.0, 9.0] }, ArG: [-5.4, 9.2] },
              passe: ['Piv', 'ArG', 0.2],
              def: { G3: [-1.7, 6.6] },
            },
            {
              texte: "Le pivot pose un écran de dos sur le 2 droit, côté extérieur. L'arrière gauche fixe vers l'extérieur sur le 2 gauche. Le demi-centre avance en hésitant vers le poste d'arrière droit; l'arrière droit glisse vers le centre.",
              courses: {
                Piv: { vers: [5.8, 6.8], ecran: true },
                ArG: [-6.2, 8.4],
                DC: [2.8, 9.8],
                ArD: { vers: [0.8, 10.4], via: [4.0, 11.2] },
              },
              def: { D2: [4.8, 6.2], G2: [-5.6, 6.8] },
            },
            {
              texte: "Au lieu de servir le demi-centre, l'arrière gauche passe à l'arrière droit, arrivé au centre.",
              courses: { ArD: [0.6, 9.2] },
              passe: ['ArG', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire (il peut aussi servir le pivot).", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'stregudryk-overgange',
      nom: "Sortie du pivot, traversée d'arrière, traversée d'ailier",
      alias: 'Stregudryk - backovergang - fløjovergang (DA, x812), Pivot out - backcourt running in - wing running in (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière gauche sert le pivot sorti, croise avec lui et fixe entre le 3 et le 2; le demi-centre et l'arrière droit avancent, l'ailier droit traverse derrière la défense: quatre fins possibles.",
      description: [
        "Fiche danoise de Dragør HK (x812). L'arrière gauche sert le pivot, qui sort vers l'extérieur, puis croise avec lui et reçoit en retour. Au même moment, l'ailier droit lance une traversée.",
        "L'arrière gauche fixe entre le 3 et le 2; le demi-centre et l'arrière droit avancent en courses parallèles vers la défense.",
        "Quatre fins: l'arrière gauche tire; il sert le demi-centre, qui tire; le demi-centre sert l'arrière droit, qui tire; ou l'arrière gauche sert l'ailier droit, qui arrive derrière la défense au bout de sa traversée.",
      ],
      objectif: "Vider le centre par la sortie du pivot et offrir plusieurs relais à l'arrière qui fixe.",
      pointsCles: [
        "Le croisé arrière-pivot se fait avec le pivot sorti, loin de la zone.",
        "Les courses parallèles du demi-centre et de l'arrière droit fixent leurs défenseurs.",
        "La traversée de l'ailier se fait dans le dos des défenseurs attirés par ces courses.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Stregudryk - backovergang - fløjovergang (Dragør HK, x812)',
          url: 'http://www.dragoerhb.dk/x812.html',
          note: "Le pivot sort vers l'extérieur, l'ARG croise avec lui; traversée de l'ailier droit; fins: ARG tire, DC tire, ARD tire, ou l'ailier droit arrivé derrière tire.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            {
              texte: "L'arrière gauche sert le pivot, qui sort de la défense vers l'extérieur, de son côté.",
              courses: { Piv: [-3.6, 8.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-2.4, 7.4] },
            },
            {
              texte: "L'arrière gauche croise avec le pivot: il passe derrière lui vers l'intérieur et reçoit en retour. Au même moment, l'ailier droit lance sa traversée.",
              courses: { ArG: { vers: [-1.8, 9.0], via: [-3.8, 10.2] }, Piv: [-5.0, 8.0], AiD: [6.6, 3.8] },
              passe: ['Piv', 'ArG', 0.55],
              def: { D2: [4.8, 6.4], D1: [7.2, 2.8] },
            },
            {
              texte: "L'arrière gauche fixe entre le 3 et le 2 gauches. Le demi-centre et l'arrière droit avancent en courses parallèles vers la défense; l'ailier droit poursuit sa traversée derrière la défense.",
              courses: { ArG: [-2.8, 8.2], DC: [0.6, 9.0], ArD: [4.0, 8.8], AiD: { vers: [3.0, 6.3], via: [4.8, 5.4] } },
              def: { G3: [-2.2, 7.2], G2: [-4.0, 6.8] },
            },
            {
              texte: "L'arrière gauche tire.",
              courses: { ArG: [-2.6, 7.9] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Tir du demi-centre',
          etapes: [
            {
              texte: "L'arrière gauche sert le pivot, qui sort de la défense vers l'extérieur, de son côté.",
              courses: { Piv: [-3.6, 8.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-2.4, 7.4] },
            },
            {
              texte: "L'arrière gauche croise avec le pivot: il passe derrière lui vers l'intérieur et reçoit en retour. Au même moment, l'ailier droit lance sa traversée.",
              courses: { ArG: { vers: [-1.8, 9.0], via: [-3.8, 10.2] }, Piv: [-5.0, 8.0], AiD: [6.6, 3.8] },
              passe: ['Piv', 'ArG', 0.55],
              def: { D2: [4.8, 6.4], D1: [7.2, 2.8] },
            },
            {
              texte: "L'arrière gauche fixe entre le 3 et le 2 gauches. Le demi-centre et l'arrière droit avancent en courses parallèles vers la défense; l'ailier droit poursuit sa traversée derrière la défense.",
              courses: { ArG: [-2.8, 8.2], DC: [0.6, 9.0], ArD: [4.0, 8.8], AiD: { vers: [3.0, 6.3], via: [4.8, 5.4] } },
              def: { G3: [-2.2, 7.2], G2: [-4.0, 6.8] },
            },
            {
              texte: "L'arrière gauche sert le demi-centre.",
              courses: { DC: [0.6, 8.4] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [1.6, 7.4] },
            },
            { texte: 'Le demi-centre tire.', tir: 'DC' },
          ],
        },
        {
          nom: "3 - Tir de l'arrière droit",
          etapes: [
            {
              texte: "L'arrière gauche sert le pivot, qui sort de la défense vers l'extérieur, de son côté.",
              courses: { Piv: [-3.6, 8.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-2.4, 7.4] },
            },
            {
              texte: "L'arrière gauche croise avec le pivot: il passe derrière lui vers l'intérieur et reçoit en retour. Au même moment, l'ailier droit lance sa traversée.",
              courses: { ArG: { vers: [-1.8, 9.0], via: [-3.8, 10.2] }, Piv: [-5.0, 8.0], AiD: [6.6, 3.8] },
              passe: ['Piv', 'ArG', 0.55],
              def: { D2: [4.8, 6.4], D1: [7.2, 2.8] },
            },
            {
              texte: "L'arrière gauche fixe entre le 3 et le 2 gauches. Le demi-centre et l'arrière droit avancent en courses parallèles vers la défense; l'ailier droit poursuit sa traversée derrière la défense.",
              courses: { ArG: [-2.8, 8.2], DC: [0.6, 9.0], ArD: [4.0, 8.8], AiD: { vers: [3.0, 6.3], via: [4.8, 5.4] } },
              def: { G3: [-2.2, 7.2], G2: [-4.0, 6.8] },
            },
            {
              texte: "L'arrière gauche sert le demi-centre; le 3 droit sort sur lui.",
              courses: { DC: [0.6, 8.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [1.0, 7.6] },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit.",
              courses: { ArD: [4.2, 8.2] },
              passe: ['DC', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "4 - L'ailier droit au bout de sa traversée",
          etapes: [
            {
              texte: "L'arrière gauche sert le pivot, qui sort de la défense vers l'extérieur, de son côté.",
              courses: { Piv: [-3.6, 8.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-2.4, 7.4] },
            },
            {
              texte: "L'arrière gauche croise avec le pivot: il passe derrière lui vers l'intérieur et reçoit en retour. Au même moment, l'ailier droit lance sa traversée.",
              courses: { ArG: { vers: [-1.8, 9.0], via: [-3.8, 10.2] }, Piv: [-5.0, 8.0], AiD: [6.6, 3.8] },
              passe: ['Piv', 'ArG', 0.55],
              def: { D2: [4.8, 6.4], D1: [7.2, 2.8] },
            },
            {
              texte: "L'arrière gauche fixe entre le 3 et le 2 gauches. Le demi-centre et l'arrière droit avancent en courses parallèles vers la défense; l'ailier droit poursuit sa traversée derrière la défense.",
              courses: { ArG: [-2.8, 8.2], DC: [0.6, 9.0], ArD: [4.0, 8.8], AiD: { vers: [3.0, 6.3], via: [4.8, 5.4] } },
              def: { G3: [-2.2, 7.2], G2: [-4.0, 6.8] },
            },
            {
              texte: "Le 3 droit monte sur le demi-centre; l'ailier droit arrive dans son dos, au centre, et l'arrière gauche le sert.",
              courses: { AiD: [-0.2, 6.3] },
              passe: ['ArG', 'AiD', 0.6],
              def: { D3: [1.4, 7.8] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'passe-pivot-apres-fixation',
      nom: "Passe au pivot après fixation de l'arrière",
      alias: 'Stregindspilning efter backpres (DA, x860), Pass to pivot after back pressure (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière gauche fixe à l'extérieur du 2 et rend; le pivot fait écran sur le 3. Le demi-centre fixe entre le 3 et le 2 et redonne à l'arrière gauche, qui sert aussitôt le pivot.",
      description: [
        "Fiche danoise de Dragør HK (x860). Le demi-centre passe à l'arrière gauche, qui fixe à l'extérieur du 2 et lui rend le ballon; en même temps, le pivot fait écran sur le 3.",
        "Le demi-centre fixe entre le 3 et le 2 puis passe à l'arrière gauche, qui sert aussitôt le pivot. Le 3 couvre correctement la passe directe du demi-centre vers le pivot: c'est pourquoi la passe au pivot vient de l'arrière, sous un autre angle.",
      ],
      objectif: "Trouver le pivot sous un angle de passe que le 3 ne peut pas couvrir.",
      pointsCles: [
        "Le pivot maintient son écran sur le 3 pendant les deux fixations.",
        "La fixation du demi-centre attire le 3 et le 2.",
        "L'arrière gauche passe au pivot dès la réception, sans temps mort.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Stregindspilning efter backpres (Dragør HK, x860)',
          url: 'http://www.dragoerhb.dk/x860.html',
          note: "ARG fixe à l'extérieur du 2 et redonne au DC, pendant que le pivot fait écran sur le 3; DC fixe entre 3 et 2 et passe à ARG qui sert aussitôt le pivot.",
        },
      ],
      ballon: 'DC',
      etapes: [
        { texte: "Le demi-centre passe à l'arrière gauche.", passe: ['DC', 'ArG', 0.1] },
        {
          texte: "L'arrière gauche fixe à l'extérieur du 2 et rend au demi-centre. En même temps, le pivot va faire écran sur le 3 gauche.",
          courses: { ArG: [-6.4, 8.4], DC: [-0.6, 9.8], Piv: { vers: [-2.9, 6.6], ecran: true } },
          passe: ['ArG', 'DC', 0.7],
          def: { G2: [-6.0, 7.0] },
        },
        {
          texte: "Le demi-centre fixe entre le 3 et le 2. Le 3 sort sur lui et ferme la passe directe vers le pivot.",
          courses: { DC: [-2.2, 8.6], ArG: [-6.0, 9.0] },
          def: { G3: [-2.0, 7.6], G2: [-4.6, 6.6] },
        },
        {
          texte: "Le demi-centre passe à l'arrière gauche.",
          courses: { ArG: [-5.8, 8.8] },
          passe: ['DC', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche sert aussitôt le pivot, qui se dégage de son écran.",
          courses: { Piv: [-3.2, 6.3] },
          passe: ['ArG', 'Piv', 0.2],
        },
        { texte: 'Le pivot tire.', tir: 'Piv' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ar-al-deux-pivots',
      nom: 'Croisé arrière / ailier avec deux pivots',
      alias: 'Back/Fløjkryds med 2 stregspillere (DA, x883), Backcourt/wing cross with 2 pivots (EN)',
      categorie: 'Jeu avec le pivot',
      defense: 'Non précisée (schéma en 0-6)',
      resume: "L'arrière gauche croise avec son ailier; quand l'ailier attaque, le pivot le plus proche sort faire écran sur le 2. L'ailier sert le pivot qui roule, tire, ou sert le 2e pivot si le 3 glisse.",
      description: [
        "Fiche danoise de Dragør HK (x883), jouée avec deux pivots. L'arrière droit passe à l'arrière gauche, qui croise avec l'ailier gauche. Quand l'ailier attaque, le pivot le plus proche sort et fait écran sur le 2.",
        "Fins: l'ailier sert le pivot qui a fait l'écran et roule; il tire si le démarquage du pivot crée l'espace; ou il sert le 2e pivot si le défenseur de celui-ci glisse pour couvrir l'ailier. Le 2e pivot peut aussi tourner autour de son défenseur.",
        "La fiche ne dit pas qui joue 2e pivot: le schéma place le demi-centre entre les deux 3 (interprétation).",
      ],
      objectif: "Multiplier les solutions intérieures après un croisé arrière-ailier.",
      pointsCles: [
        "L'écran du pivot se pose quand l'ailier attaque, pas avant.",
        "Le pivot roule vers le but après l'écran.",
        "Le 2e pivot reste disponible dans le dos du 3 qui glisse.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Back/Fløjkryds med 2 stregspillere (Dragør HK, x883)',
          url: 'http://www.dragoerhb.dk/x883.html',
          note: "Quand l'AG attaque, le pivot le plus proche sort et fait écran sur le 2; fins: passe au pivot qui roule, tir, ou passe au 2e pivot si son défenseur glisse.",
        },
      ],
      ballon: 'ArD',
      depart: { Piv: [-3.4, 6.5], DC: [0.2, 6.4], ArD: [2.6, 9.8] },
      variantes: [
        {
          nom: "1 - Le pivot roule après l'écran",
          etapes: [
            {
              texte: "Deux pivots: le pivot entre le 2 et le 3 gauches, le demi-centre entre les deux 3. L'arrière droit passe à l'arrière gauche.",
              courses: { ArG: [-5.6, 9.0] },
              passe: ['ArD', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche attaque en diagonale vers l'extérieur; l'ailier gauche remonte pour croiser.",
              courses: { ArG: [-6.6, 7.8], AiG: [-8.4, 6.0] },
              def: { G2: [-5.8, 6.4], G1: [-7.6, 3.6] },
            },
            {
              texte: "Croisé: l'ailier passe derrière l'arrière vers l'intérieur et reçoit.",
              courses: { AiG: { vers: [-4.4, 8.6], via: [-7.6, 9.8] }, ArG: [-7.0, 7.2] },
              passe: ['ArG', 'AiG', 0.55],
            },
            {
              texte: "L'ailier attaque; le pivot le plus proche sort et fait écran sur le 2.",
              courses: { AiG: [-3.6, 8.2], Piv: { vers: [-4.6, 7.0], ecran: true } },
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "Le 3 sort sur l'ailier: le pivot roule vers le but et reçoit.",
              courses: { Piv: [-3.6, 6.4] },
              passe: ['AiG', 'Piv', 0.5],
              def: { G3: [-2.8, 7.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "2 - L'ailier tire",
          etapes: [
            {
              texte: "Deux pivots: le pivot entre le 2 et le 3 gauches, le demi-centre entre les deux 3. L'arrière droit passe à l'arrière gauche.",
              courses: { ArG: [-5.6, 9.0] },
              passe: ['ArD', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche attaque en diagonale vers l'extérieur; l'ailier gauche remonte pour croiser.",
              courses: { ArG: [-6.6, 7.8], AiG: [-8.4, 6.0] },
              def: { G2: [-5.8, 6.4], G1: [-7.6, 3.6] },
            },
            {
              texte: "Croisé: l'ailier passe derrière l'arrière vers l'intérieur et reçoit.",
              courses: { AiG: { vers: [-4.4, 8.6], via: [-7.6, 9.8] }, ArG: [-7.0, 7.2] },
              passe: ['ArG', 'AiG', 0.55],
            },
            {
              texte: "L'ailier attaque; le pivot le plus proche sort et fait écran sur le 2.",
              courses: { AiG: [-3.6, 8.2], Piv: { vers: [-4.6, 7.0], ecran: true } },
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "Le démarquage du pivot a ouvert l'espace: l'ailier tire.",
              courses: { AiG: [-3.2, 7.6] },
              tir: { par: 'AiG', t: 0.5 },
            },
          ],
        },
        {
          nom: '3 - Passe au 2e pivot',
          etapes: [
            {
              texte: "Deux pivots: le pivot entre le 2 et le 3 gauches, le demi-centre entre les deux 3. L'arrière droit passe à l'arrière gauche.",
              courses: { ArG: [-5.6, 9.0] },
              passe: ['ArD', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche attaque en diagonale vers l'extérieur; l'ailier gauche remonte pour croiser.",
              courses: { ArG: [-6.6, 7.8], AiG: [-8.4, 6.0] },
              def: { G2: [-5.8, 6.4], G1: [-7.6, 3.6] },
            },
            {
              texte: "Croisé: l'ailier passe derrière l'arrière vers l'intérieur et reçoit.",
              courses: { AiG: { vers: [-4.4, 8.6], via: [-7.6, 9.8] }, ArG: [-7.0, 7.2] },
              passe: ['ArG', 'AiG', 0.55],
            },
            {
              texte: "L'ailier attaque; le pivot le plus proche sort et fait écran sur le 2.",
              courses: { AiG: [-3.6, 8.2], Piv: { vers: [-4.6, 7.0], ecran: true } },
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "Le 3 gauche glisse pour couvrir l'ailier: l'ailier sert le 2e pivot, libéré dans son dos.",
              courses: { DC: [-0.8, 6.3] },
              passe: ['AiG', 'DC', 0.5],
              def: { G3: [-3.0, 7.4] },
            },
            { texte: 'Le 2e pivot tire.', tir: 'DC' },
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'jeu-autour-du-pivot',
      nom: 'Jeu autour du pivot (repères et lecture)',
      alias: 'Jeu en triangle, pivot qui "fuit", pivot qui "arrive", signal donné par la position du pivot (FR)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6',
      resume: "Repères de l'école française pour jouer autour du pivot: qui tourne autour selon sa place, pivot qui fuit ou qui arrive, jeu en triangle, demi-centre qui tourne autour du pivot ou reste en double écran.",
      description: [
        "É. Baradat (Approches des Handballs n°199): la position du pivot donne le signal. S'il est entre le 2 et le 3, l'arrière tourne autour; s'il est entre le 1 et le 2, c'est l'ailier. Si le ballon part à l'opposé, le pivot traverse pour donner un nouveau repère.",
        "P. Passemard (n°211): le pivot \"fuit\" l'intervalle central pour isoler un défenseur et en bloquer un autre (code \"point levé\" du côté où il doit fuir), et le porteur joue le duel sur le défenseur isolé; ou il \"arrive\" d'un intervalle voisin pour un bloc, en passant devant les défenseurs; s'il arrive tôt, on joue dans l'espace entre les deux 3.",
        "A. Roussel (n°207, \"Battre une 0/6 de zone\"): jeu en triangle. L'arrière gauche joue autour du pivot et rend au demi-centre; si les centraux montent, le pivot glisse dans le dos du central sur ce temps de passe. S'ils restent à 6 m, le demi-centre feinte le renversement et court au ras du pivot qui bloque, pour un 2 contre 1 extérieur avec l'arrière.",
        "Y. Delattre (n°77): le demi-centre vient face à l'intervalle extérieur d'un 3, le pivot gagne de l'espace sur ce 3; sans tir, il se désengage vers l'autre intervalle et le pivot bascule sur l'autre 3 (sinon passe à l'ailier). L. Roudière (n°146): croisé demi-centre / arrière, le demi-centre restant en double écran avec le pivot pour un tir par-dessus.",
        "Ce sont des principes de lecture plus que des combinaisons figées: les schémas les illustrent un par un (côtés et fins choisis).",
      ],
      objectif: "Donner des repères communs pour jouer autour du pivot selon sa place et la réaction des défenseurs.",
      pointsCles: [
        "La place du pivot désigne le joueur qui tourne autour de lui.",
        "Le pivot change de vitesse ou d'intervalle sur le temps de passe.",
        "Si plusieurs défenseurs sont attirés, le ballon ressort vite vers la base arrière.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'É. Baradat, "Prolongement du jeu après l\'enclenchement", Approches des Handballs n°199 (novembre 2023)',
          url: 'https://www.centre-handball.com/wp-content/uploads/2023/11/Approches_n199_NOVEMBRE202023.pdf',
          note: '"Si PVT entre 2 et 3, AR tourne autour [...] Si PVT entre 1 et 2, AL tourne autour".',
        },
        {
          titre: 'P. Passemard (retranscrit par N. Keita), Approches des Handballs n°211 (décembre 2025)',
          url: 'https://www.centre-handball.com/wp-content/uploads/2026/01/Approches_n211_DECEMBRE-2025.pdf',
          note: '"Quand le pivot fuit: Code "point levé" du côté où le pivot doit fuir".',
        },
        {
          titre: 'A. Roussel, "Battre une 0/6 de zone", Approches des Handballs n°207 (2025)',
          url: 'https://www.calameo.com/ffhandball/read/00727511199c357b18c3d',
          note: '"Jeu en triangle avec PVT qui glisse derrière le jalon sur le temps de passe ARL - DC = dans le dos du défenseur central".',
        },
        {
          titre: 'Y. Delattre, "Le jeu autour du joueur dedans", Approches du Handball n°77 (2003)',
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb77_attaque1.pdf',
          note: "Le DC vient face à l'intervalle externe du n°3, pivot en gain d'espace sur le n°3; sinon désengagement vers l'autre intervalle externe, le pivot bascule sur l'autre n°3.",
        },
        {
          titre: 'L. Roudière, "Les exploitations du pivot dans la charnière 3-3", Approches du Handball n°146 (2015)',
          url: 'https://www.calameo.com/ffhandball/read/00727511110f1a931ec88?page=35',
          note: '"Croisé demi-centre / arrière avec ballon avec la demi-centre qui reste en double écran".',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Pivot entre 2 et 3: l'arrière tourne autour (Baradat)",
          depart: { Piv: [-3.4, 6.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 2 et le 3 gauches: c'est le signal pour l'arrière gauche, qui attaque vers lui.",
              courses: { ArG: [-4.2, 8.6] },
              def: { G2: [-4.8, 6.6] },
            },
            {
              texte: "L'arrière tourne autour du pivot: il passe de l'autre côté, entre le pivot et le 3, pendant que le pivot tient le 2.",
              courses: { ArG: { vers: [-2.4, 8.0], via: [-3.6, 9.4] }, Piv: { vers: [-3.6, 6.4], ecran: true } },
              def: { G3: [-2.0, 7.0] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Pivot entre 1 et 2: l'ailier tourne autour (Baradat)",
          depart: { Piv: [-6.2, 4.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 1 et le 2: c'est l'ailier qui tournera autour. L'arrière gauche lui passe.",
              courses: { AiG: [-8.6, 2.8] },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-7.6, 3.2] },
            },
            {
              texte: "L'ailier attaque vers l'intérieur et tourne autour du pivot, qui bloque le 1; il tire entre le 1 et le 2.",
              courses: { AiG: { vers: [-5.4, 6.6], via: [-8.0, 6.4] }, Piv: { vers: [-6.8, 4.2], ecran: true } },
              tir: { par: 'AiG', t: 0.85 },
              def: { G2: [-4.6, 6.0] },
            },
          ],
        },
        {
          nom: '3 - Le pivot "fuit" (Passemard)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Code \"point levé\": le pivot fuit l'intervalle central vers la droite et va bloquer le 2 droit. Le 3 droit se retrouve isolé.",
              courses: { Piv: { vers: [4.0, 5.9], via: [1.6, 9.0], ecran: true } },
            },
            {
              texte: "Le demi-centre attaque le 3 isolé.",
              courses: { DC: [0.8, 8.6] },
              def: { D3: [1.2, 7.6], G3: [-1.2, 7.0] },
            },
            {
              texte: "Il le déborde par l'extérieur, entre le 3 et le bloc du pivot, et tire.",
              courses: { DC: { vers: [2.8, 7.4], via: [2.0, 8.6] } },
              tir: { par: 'DC', t: 0.8 },
            },
          ],
        },
        {
          nom: '4 - Le pivot "arrive" (Passemard)',
          ballon: 'DC',
          depart: { Piv: [3.4, 6.6] },
          etapes: [
            {
              texte: "Le pivot quitte l'intervalle entre le 3 et le 2 droits et \"arrive\" au centre en passant devant le 3, pour un bloc. Les arrières s'écartent.",
              courses: { Piv: { vers: [0.6, 7.4], via: [2.4, 8.4], ecran: true }, ArG: [-6.0, 9.6], ArD: [6.2, 9.4] },
            },
            {
              texte: "Le pivot est arrivé tôt: le demi-centre joue dans l'espace entre les deux 3, au ras du bloc, et tire.",
              courses: { DC: [-0.6, 8.0] },
              tir: { par: 'DC', t: 0.8 },
              def: { G3: [-1.4, 7.2] },
            },
          ],
        },
        {
          nom: '5 - Jeu en triangle: le pivot glisse dans le dos du central (Roussel)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche.",
              courses: { ArG: [-4.8, 9.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche vient jouer autour du pivot par une course intérieure menaçante. Les centraux montent sur elle, vers 8 m.",
              courses: { ArG: [-2.0, 9.0] },
              def: { G3: [-2.0, 8.0], D3: [0.8, 7.8] },
            },
            {
              texte: "L'arrière rend au demi-centre et se replace vite à l'extérieur. Sur ce temps de passe, le pivot glisse dans le dos du 3 gauche.",
              courses: { DC: [0.6, 9.8], Piv: [-1.4, 6.3], ArG: [-4.6, 9.4] },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: 'Le demi-centre sert le pivot dans le dos du défenseur central.',
              passe: ['DC', 'Piv', 0.2],
              def: { D3: [0.6, 7.2] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '6 - Prise de bloc du demi-centre (Roussel)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche.",
              courses: { ArG: [-4.8, 9.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche vient jouer autour du pivot par une course intérieure. Les centraux restent à 6 m.",
              courses: { ArG: [-2.2, 9.0] },
              def: { G3: [-1.8, 7.0] },
            },
            {
              texte: "L'arrière rend au demi-centre et se replace vite à l'extérieur.",
              courses: { DC: [0.6, 9.8], ArG: [-5.2, 9.4] },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre feinte le renversement et court au plus près du pivot, qui bloque le 3 gauche. Le 2 doit sortir sur lui.",
              courses: { DC: { vers: [-3.4, 8.4], via: [-0.8, 8.8] }, Piv: { vers: [-2.4, 7.0], ecran: true } },
              def: { G3: [-1.4, 6.9], G2: [-4.2, 7.0] },
            },
            {
              texte: "2 contre 1 à l'extérieur: le demi-centre sert l'arrière gauche.",
              courses: { ArG: [-5.6, 8.4] },
              passe: ['DC', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '7 - Le demi-centre autour du pivot (Delattre)',
          etapes: [
            {
              texte: "Sur la passe de l'arrière gauche, le demi-centre vient face à l'intervalle extérieur du 3 gauche; le pivot gagne de l'espace sur ce 3.",
              courses: { DC: [-2.8, 9.0], Piv: [-1.0, 6.4] },
              passe: ['ArG', 'DC', 0.2],
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "Pas de tir: le demi-centre se désengage vers l'intervalle extérieur du 3 droit; le pivot bascule sur l'autre 3.",
              courses: { DC: { vers: [2.8, 8.8], via: [0, 9.8] }, Piv: [1.0, 6.4] },
              def: { G3: [-1.7, 6.6], D3: [2.2, 7.2] },
            },
            {
              texte: "Le demi-centre tire dans l'intervalle extérieur du 3 droit.",
              courses: { DC: [3.0, 8.2] },
              tir: { par: 'DC', t: 0.5 },
              def: { D2: [4.4, 6.6] },
            },
          ],
        },
        {
          nom: '8 - Croisé avec double écran du demi-centre (Roudière)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre attaque à gauche de la charnière entre les deux 3; l'arrière gauche se prépare à croiser.",
              courses: { DC: [-1.6, 8.4], ArG: [-4.6, 9.8] },
              def: { G3: [-1.8, 7.4] },
            },
            {
              texte: "Croisé: l'arrière gauche passe derrière le demi-centre et reçoit. Le demi-centre reste devant les 3, à côté du pivot: double écran.",
              courses: {
                ArG: { vers: [0.2, 9.4], via: [-2.4, 10.4] },
                DC: { vers: [-0.9, 7.6], ecran: true },
                Piv: { vers: [0.6, 6.8], ecran: true },
              },
              passe: ['DC', 'ArG', 0.5],
              def: { G3: [-1.8, 7.0] },
            },
            {
              texte: "L'arrière gauche tire par-dessus le double écran.",
              courses: { ArG: [0.2, 9.6] },
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'glissement-pivot',
      nom: "Glissement du pivot vers l'intervalle 1-2",
      alias: 'Glissement de 2-3 vers 1-2, pivot qui glisse (FR)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6; 1-5',
      resume: "Sur le temps fort d'un arrière, le pivot quitte l'intervalle 2-3 et glisse dans le dos du 2, vers l'intervalle 1-2, où il est servi. Variantes: contre 1-5, sur la passe DC vers ARD, et bloc externe sur le 1 (Pologne).",
      description: [
        "Groupe d'entraîneurs LFH (Approches du Handball n°140, Mondial féminin 2013): pivot entre le 2 et le 3, en gain de position sur le 3; temps fort de l'arrière gauche, le 2 monte; le pivot glisse dans le dos du 2 et reçoit pour tirer dans l'intervalle 1-2 (observé 27 fois, très efficace). La Pologne y ajoute un bloc externe du pivot sur le 1 pour libérer son ailier.",
        "Interligues féminins (n°179, Antilles-Guyane, contre 1-5): pivot entre la 2 et la 3 à droite; au moment du temps fort de l'arrière droite, le pivot glisse entre la 1 et la 2. La 3 basse hésite entre suivre le pivot et aider; l'arrière droite a un rapport de force favorable sur la 2.",
        "Évaluation EdF jeunes (n°200, S. Gardillou): sur la passe DC vers ARD, le pivot suit le ballon pour emmener le 3 vers la droite; sur le renversement de l'arrière droit, il appelle le ballon et sort en poste, puis sert l'arrière gauche ou rend au demi-centre.",
        "Les schémas des articles n'ont pas été vus: les positions sont reconstituées d'après les textes.",
      ],
      objectif: "Faire disparaître le pivot de la vue du défenseur qui monte, puis le servir dans son dos.",
      pointsCles: [
        "Le pivot glisse au moment du temps fort, pas avant.",
        "Il passe dans le dos du défenseur qui monte, côté but.",
        "La passe part dès que le 2 s'est engagé sur l'arrière.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "\"L'utilisation de l'intervalle 1-2 par le pivot dans les phases d'attaque placée\", Approches du Handball n°140 (2014)",
          url: 'https://www.calameo.com/ffhandball/read/0072751117ab39c5a79db?page=43',
          note: "Glissement du pivot de 2-3 vers 1-2 sur la montée du n°2 (27 fois); Pologne: bloc externe du pivot sur le n°1, l'ARD renverse à l'ALD qui tire.",
        },
        {
          titre: 'Interligues féminins, Approches du Handball n°179',
          url: 'https://www.centre-handball.com/approches-du-handball/',
          note: "\"Au moment du temps fort, le pivot glisse dans l'espace entre les défenseures n°1 et n°2\" (Antilles-Guyane, 12 fois / 5 tirs favorables).",
        },
        {
          titre: 'S. Gardillou, "La joueuse en formation", Approches des Handballs n°200 (janvier 2024)',
          url: 'https://www.centre-handball.com/wp-content/uploads/2024/02/Approches_n200_JANVIER202024.pdf',
          note: '"le pivot suit la balle pour emmener dans son déplacement le P4".',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Glissement de 2-3 vers 1-2 (Mondial 2013)',
          depart: { Piv: [-3.4, 6.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 2 et le 3, en gain de position sur le 3. L'arrière gauche met un temps fort; le 2 monte sur lui.",
              courses: { ArG: [-4.6, 8.4] },
              def: { G2: [-4.8, 7.2] },
            },
            {
              texte: "Le pivot glisse dans le dos du 2, vers l'intervalle entre le 1 et le 2; l'arrière le sert.",
              courses: { Piv: { vers: [-5.8, 5.0], via: [-4.2, 5.4] } },
              passe: ['ArG', 'Piv', 0.6],
              def: { G1: [-7.6, 3.0] },
            },
            { texte: "Le pivot tire dans l'intervalle 1-2.", tir: 'Piv' },
          ],
        },
        {
          nom: "2 - Contre 1-5, sur le temps fort de l'arrière droit",
          dispositif: '5-1',
          ballon: 'ArD',
          depart: { Piv: [2.2, 6.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 3 bas et le 2 droit. L'arrière droit met un temps fort vers le secteur du pivot; le 2 resserre.",
              courses: { ArD: [3.2, 8.4] },
              def: { D2: [3.8, 6.6] },
            },
            {
              texte: "Au moment du temps fort, le pivot glisse dans l'espace entre le 2 et le 1. Le 3 bas hésite entre le suivre et aider.",
              courses: { Piv: { vers: [6.0, 4.6], via: [4.4, 5.6] } },
              def: { G3: [0.6, 6.6], D1: [7.6, 2.8] },
            },
            {
              texte: "Le 2 reste sur l'arrière: l'arrière droit sert le pivot entre le 2 et le 1 (si le 2 suit le pivot, l'arrière gagne son duel).",
              passe: ['ArD', 'Piv', 0.3],
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Sur la passe DC vers ARD, puis jeu en poste (EdF jeunes)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit; le pivot suit le ballon et emmène le 3 droit vers la droite.",
              courses: { Piv: [3.0, 6.5] },
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [2.4, 7.4] },
            },
            {
              texte: "L'arrière droit fixe vers l'extérieur.",
              courses: { ArD: [6.6, 8.4] },
              def: { D2: [6.0, 6.8], D1: [7.6, 3.0] },
            },
            {
              texte: "Sur le renversement de l'arrière droit, le pivot appelle le ballon et sort en poste; il reçoit.",
              courses: { Piv: [2.0, 8.6] },
              passe: ['ArD', 'Piv', 0.4],
              def: { D3: [2.2, 7.6] },
            },
            {
              texte: "Le pivot distribue à l'arrière gauche, qui joue son duel sur le 2 gauche, isolé.",
              courses: { ArG: [-4.4, 8.6] },
              passe: ['Piv', 'ArG', 0.2],
              def: { G2: [-4.6, 7.0] },
            },
            {
              texte: "L'arrière gauche gagne son duel et tire.",
              courses: { ArG: { vers: [-5.4, 7.6], via: [-3.8, 8.0] } },
              tir: { par: 'ArG', t: 0.8 },
              def: { G2: [-4.4, 6.6] },
            },
          ],
        },
        {
          nom: '4 - Bloc externe du pivot sur le 1 (Pologne)',
          ballon: 'ArD',
          depart: { Piv: [6.2, 4.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 2 et le 1. L'arrière droit passe à l'ailier droit; le 1 monte sur lui et le pivot glisse vers l'extérieur, dans son dos.",
              courses: { AiD: [9.0, 2.6], Piv: [7.4, 2.2] },
              passe: ['ArD', 'AiD', 0.1],
              def: { D1: [8.2, 3.6] },
            },
            {
              texte: "L'ailier rend à l'arrière droit et recule dans le coin. Le pivot pose un bloc externe sur le 1.",
              courses: { ArD: [5.6, 8.6], AiD: [9.4, 1.6], Piv: { vers: [8.8, 3.8], ecran: true } },
              passe: ['AiD', 'ArD', 0.2],
              def: { D1: [7.8, 3.8] },
            },
            {
              texte: "L'arrière droit renverse aussitôt vers l'ailier.",
              passe: ['ArD', 'AiD', 0.3],
              def: { D1: [8.0, 3.2] },
            },
            {
              texte: "Le 1, bloqué, ne peut pas sortir: l'ailier tire.",
              courses: { AiD: [8.8, 2.0] },
              tir: { par: 'AiD', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'sortie-poste-dc-oppose',
      nom: "Sortie au poste du pivot et engagement du demi-centre à l'opposé",
      alias: '"Relation base avant - base arrière", couloir de jeu direct après une sortie en poste (FR)',
      categorie: 'Jeu avec le pivot',
      defense: '3-3 dans la séance (schéma en 0-6)',
      resume: "Le pivot sort en poste hors des 9 m; échange avec le demi-centre, qui court dans l'espace opposé au pivot et tire, ou rend au pivot si son défenseur monte. Évolution: l'arrière donne au pivot, l'arrière opposé finit.",
      description: [
        "Séance -15 ans de R. Berro (CTF Hérault, Approches des Handballs n°197) sur la relation base avant - base arrière, contre un dispositif 3-3. Le pivot sort en poste hors des 9 m; échange de ballon entre le demi-centre et le pivot; le demi-centre court dans l'espace opposé au pivot et tire (1er poteau, de son côté).",
        "Lecture: tir à 9 m si le défenseur reste à 6 m; passe au pivot si le défenseur monte à 9 m; puis, selon le défenseur qui vient fermer, tir, sortie de balle au pivot ou à l'arrière (passe-et-va demi-centre - pivot possible).",
        "Évolution: l'arrière donne au pivot sorti en poste; le demi-centre s'engage sur la passe du pivot dans l'espace libre, et l'arrière s'engage sur la passe du demi-centre pour tirer à l'extérieur. Le schéma fait finir l'arrière du côté du demi-centre (interprétation). C'est une forme d'apprentissage plus qu'une combinaison nommée; le schéma la montre contre une 0-6.",
      ],
      objectif: "Exploiter le couloir direct ouvert par la sortie en poste du pivot.",
      pointsCles: [
        "Le demi-centre attaque l'espace opposé au pivot.",
        "Il lit son défenseur: à 6 m, il tire; s'il monte, il rend au pivot.",
        "Le pivot replonge vers le but dès qu'il a rendu le ballon.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'R. Berro, séance -15 ans, Approches des Handballs n°197 (juillet 2023), p. 26-28',
          url: 'https://www.centre-handball.com/wp-content/uploads/2023/09/Approches_n197_JUILLET-2023.pdf',
          note: "\"À l'issue de la sortie en poste du pivot, échange de balle entre le demi-centre et le pivot. Le demi-centre court dans l'espace opposé au pivot\".",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Le défenseur reste à 6 m: tir du demi-centre',
          etapes: [
            {
              texte: 'Le pivot sort en poste hors des 9 m, côté gauche.',
              courses: { Piv: [-2.6, 9.6] },
              def: { G3: [-2.2, 7.8] },
            },
            { texte: 'Le demi-centre lui passe.', passe: ['DC', 'Piv', 0.1] },
            {
              texte: "Le pivot rend au demi-centre, qui court dans l'espace opposé, à droite.",
              courses: { DC: [2.2, 9.2] },
              passe: ['Piv', 'DC', 0.5],
            },
            {
              texte: "Son défenseur reste à 6 m: le demi-centre tire au premier poteau, de son côté.",
              courses: { DC: [2.4, 9.0] },
              tir: { par: 'DC', t: 0.4, cible: [1.1, -0.35] },
              def: { D3: [1.9, 6.8] },
            },
          ],
        },
        {
          nom: '2 - Le défenseur monte: remise au pivot',
          etapes: [
            {
              texte: 'Le pivot sort en poste hors des 9 m, côté gauche.',
              courses: { Piv: [-2.6, 9.6] },
              def: { G3: [-2.2, 7.8] },
            },
            { texte: 'Le demi-centre lui passe.', passe: ['DC', 'Piv', 0.1] },
            {
              texte: "Le pivot rend au demi-centre, qui court dans l'espace opposé, à droite.",
              courses: { DC: [2.2, 9.2] },
              passe: ['Piv', 'DC', 0.5],
            },
            {
              texte: "Le 3 droit monte sur lui jusqu'aux 9 m. Le pivot, qui a replongé dans son dos, reçoit.",
              courses: { Piv: [1.2, 6.8] },
              passe: ['DC', 'Piv', 0.6],
              def: { D3: [2.0, 8.2] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Évolution: l'arrière donne au pivot",
          ballon: 'ArG',
          etapes: [
            {
              texte: "Le pivot sort en poste hors des 9 m, côté gauche; l'arrière gauche lui passe.",
              courses: { Piv: [-2.8, 9.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-2.4, 7.8] },
            },
            {
              texte: "Le demi-centre s'engage dans l'espace libre, à l'opposé du pivot, et reçoit de lui.",
              courses: { DC: [2.0, 9.0] },
              passe: ['Piv', 'DC', 0.3],
              def: { D3: [1.8, 7.6] },
            },
            {
              texte: "Le 3 ferme sur le demi-centre: l'arrière droit s'engage sur sa passe pour tirer à l'extérieur.",
              courses: { ArD: [6.2, 8.0] },
              passe: ['DC', 'ArD', 0.4],
              def: { D3: [2.0, 8.0], D2: [5.2, 6.4] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'bloc-pivot-contre-1-5',
      nom: 'Bloc du pivot contre 1-5',
      alias: "Bloc sur la n°3 haute (Pays de la Loire), bloc du pivot sur le défenseur de l'arrière latéral (B. Blois)",
      categorie: 'Contre 5-1',
      defense: '1-5 (zone ou individuelle)',
      dispositif: '5-1',
      resume: "Le pivot sort bloquer l'avancé (la 3 haute) pour le demi-centre, ou le 2 qui harcèle l'arrière; le porteur prend le bloc et le demi-centre lit la défense: tir, décalage, passe au pivot ou renversement.",
      description: [
        "D. Chastel (Approches du Handball n°178, interligues féminins, Pays de la Loire): pivot entre la 2 et la 3 à droite; la demi-centre vient chercher le ballon vers l'arrière gauche; sur sa prise de balle, le pivot sort en bloc sur la 3 haute et la demi-centre prend le bloc (course côté bras). Le pivot redescend sur la 2 et gagne sa position: 4 contre 3. Les fins ne sont pas précisées (7 fois, 2 tirs favorables).",
        "B. Blois (n°78, \"séance sollicitant la lecture de jeu du demi-centre\", contre 1-5 de zone): l'ailier gauche passe à l'arrière gauche, que le 2 harcèle; le pivot vient bloquer ce 2 et l'arrière prend le bloc. Le demi-centre se place sans ballon entre l'avancé et le 2 opposé. Quand la prise de bloc a mobilisé l'avancé, il reçoit et lit: couloir libre vers tir; le 2 vient aider l'avancé vers décalage de l'arrière droit; le 3 bas vient fermer vers passe au pivot; le 3 bas ferme et le 2 côté pivot coupe la passe vers renversement sur l'arrière gauche.",
        "Les deux articles numérotent les défenseuses du point de vue de la défense; les étapes les nomment du point de vue de l'attaque (avancé = \"3 haute\").",
      ],
      objectif: "Neutraliser l'avancé ou le 2 agressif par un bloc pour jouer en surnombre derrière.",
      pointsCles: [
        "Le bloc se pose sur la prise de balle du joueur qui en profite.",
        "Après le bloc, le pivot redescend et gagne sa position.",
        "Le demi-centre se place sans ballon pour assurer la continuité, puis lit le défenseur qui ferme.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'D. Chastel, analyse des interligues féminins, Approches du Handball n°178, p. 27',
          url: 'https://www.centre-handball.com/approches-du-handball/',
          note: '"Sur sa prise de balle, le pivot sort en bloc sur la défenseure n°3. La demi-centre prend le bloc".',
        },
        {
          titre: 'B. Blois, "Séance sollicitant la lecture de jeu du demi-centre", Approches du Handball n°78 (2003)',
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb78_attaque1.pdf',
          note: "\"la création d'un point de fixation par le bloc du pivot sur le défenseur direct de l'arrière latéral pour créer des espaces de tir dans les secteurs externes\".",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: "1 - Bloc sur la 3 haute, le demi-centre prend le bloc (Pays de la Loire)",
          ballon: 'ArG',
          depart: { Piv: [2.2, 6.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 3 bas et le 2 droit. Le demi-centre vient chercher le ballon vers l'arrière gauche; l'avancé le suit.",
              courses: { DC: [-2.6, 9.8] },
              passe: ['ArG', 'DC', 0.6],
              def: { D3: [-1.6, 9.0] },
            },
            {
              texte: "Sur sa prise de balle, le pivot sort en bloc sur l'avancé, côté droit.",
              courses: { Piv: { vers: [-0.6, 9.2], via: [1.6, 8.6], ecran: true } },
            },
            {
              texte: "Le demi-centre prend le bloc par une course côté bras, vers la droite. L'avancé est éliminé.",
              courses: { DC: { vers: [1.4, 9.0], via: [-0.6, 11.0] } },
              def: { D3: [-1.4, 9.4] },
            },
            {
              texte: "Le pivot redescend sur le 2 droit et gagne sa position: 4 contre 3.",
              courses: { Piv: [3.4, 6.4], DC: [2.2, 8.4] },
              def: { G3: [0.6, 7.2], D2: [4.4, 6.0] },
            },
            {
              texte: "Le demi-centre exploite le surnombre et tire (il peut aussi servir le pivot ou l'arrière droit).",
              courses: { DC: [2.4, 7.8] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Bloc sur le 2: couloir libre, le demi-centre tire (Blois)',
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche; le 2 gauche le harcèle.",
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-5.2, 7.6] },
            },
            {
              texte: "Le pivot vient bloquer le 2; l'arrière gauche prend le bloc vers l'intérieur. Le demi-centre se place sans ballon entre l'avancé et le 2 droit.",
              courses: {
                Piv: { vers: [-4.2, 7.6], via: [-1.6, 8.4], ecran: true },
                ArG: { vers: [-3.0, 9.0], via: [-4.4, 10.2] },
                DC: [2.4, 9.0],
              },
              def: { D3: [-1.6, 9.0] },
            },
            {
              texte: "La prise de bloc a mobilisé l'avancé: l'arrière gauche sert le demi-centre, qui lit la défense. Le pivot se retourne vers le but.",
              courses: { Piv: [-3.0, 6.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-2.0, 8.4] },
            },
            {
              texte: "Le couloir entre l'avancé et le 2 droit est libre: le demi-centre tire.",
              courses: { DC: [2.2, 8.0] },
              tir: { par: 'DC', t: 0.6 },
            },
          ],
        },
        {
          nom: "3 - Le 2 droit aide: décalage de l'arrière droit (Blois)",
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche; le 2 gauche le harcèle.",
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-5.2, 7.6] },
            },
            {
              texte: "Le pivot vient bloquer le 2; l'arrière gauche prend le bloc vers l'intérieur. Le demi-centre se place sans ballon entre l'avancé et le 2 droit.",
              courses: {
                Piv: { vers: [-4.2, 7.6], via: [-1.6, 8.4], ecran: true },
                ArG: { vers: [-3.0, 9.0], via: [-4.4, 10.2] },
                DC: [2.4, 9.0],
              },
              def: { D3: [-1.6, 9.0] },
            },
            {
              texte: "La prise de bloc a mobilisé l'avancé: l'arrière gauche sert le demi-centre, qui lit la défense. Le pivot se retourne vers le but.",
              courses: { Piv: [-3.0, 6.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-2.0, 8.4] },
            },
            {
              texte: "Le 2 droit vient aider: le demi-centre décale l'arrière droit.",
              courses: { ArD: [5.8, 8.6] },
              passe: ['DC', 'ArD', 0.4],
              def: { D2: [2.8, 7.6] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: '4 - Le 3 bas ferme: passe au pivot (Blois)',
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche; le 2 gauche le harcèle.",
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-5.2, 7.6] },
            },
            {
              texte: "Le pivot vient bloquer le 2; l'arrière gauche prend le bloc vers l'intérieur. Le demi-centre se place sans ballon entre l'avancé et le 2 droit.",
              courses: {
                Piv: { vers: [-4.2, 7.6], via: [-1.6, 8.4], ecran: true },
                ArG: { vers: [-3.0, 9.0], via: [-4.4, 10.2] },
                DC: [2.4, 9.0],
              },
              def: { D3: [-1.6, 9.0] },
            },
            {
              texte: "La prise de bloc a mobilisé l'avancé: l'arrière gauche sert le demi-centre, qui lit la défense. Le pivot se retourne vers le but.",
              courses: { Piv: [-3.0, 6.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-2.0, 8.4] },
            },
            {
              texte: "Le 3 bas vient fermer sur le demi-centre: le pivot glisse dans l'espace libéré et reçoit.",
              courses: { Piv: [-1.6, 6.4] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [1.6, 7.6] },
            },
            { texte: 'Le pivot tire.', tir: 'Piv' },
          ],
        },
        {
          nom: "5 - Passe au pivot coupée: renversement sur l'arrière gauche (Blois)",
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche; le 2 gauche le harcèle.",
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-5.2, 7.6] },
            },
            {
              texte: "Le pivot vient bloquer le 2; l'arrière gauche prend le bloc vers l'intérieur. Le demi-centre se place sans ballon entre l'avancé et le 2 droit.",
              courses: {
                Piv: { vers: [-4.2, 7.6], via: [-1.6, 8.4], ecran: true },
                ArG: { vers: [-3.0, 9.0], via: [-4.4, 10.2] },
                DC: [2.4, 9.0],
              },
              def: { D3: [-1.6, 9.0] },
            },
            {
              texte: "La prise de bloc a mobilisé l'avancé: l'arrière gauche sert le demi-centre, qui lit la défense. Le pivot se retourne vers le but; l'arrière gauche ressort à l'extérieur.",
              courses: { Piv: [-3.0, 6.6], ArG: [-4.6, 9.2] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-2.0, 8.4] },
            },
            {
              texte: "Le 3 bas ferme sur le demi-centre et le 2 gauche lâche l'arrière pour couper la passe vers le pivot: le demi-centre renverse sur l'arrière gauche.",
              passe: ['DC', 'ArG', 0.5],
              def: { G3: [1.6, 7.6], G2: [-3.4, 7.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },
  );
})();
