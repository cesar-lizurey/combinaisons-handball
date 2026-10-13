/* Lot 9a: jets francs à 9 m, remises en jeu, astuces, supériorité 6 contre 5 et infériorité 5 contre 6. */
(() => {
  /* ---------------------------------------------------------------- */
  /* Placements communs                                               */
  /* ---------------------------------------------------------------- */

  // Jet franc central: mur de trois attaquants sur la ligne des 9 m (ailier droit, pivot, demi-centre
  // qui exécute), tireur derrière le mur. Défenseurs à 3 m au moins du ballon.
  const MUR_CENTRAL = {
    AiG: [-9.5, 4.4], AiD: [-2.5, 9.25], Piv: [-1.25, 9.2], DC: [0, 9.35], ArG: [-1.25, 11.6], ArD: [5.5, 9.6],
    G2: [-3.9, 6.0], G3: [-1.3, 6.4], D3: [1.3, 6.4], D2: [4.6, 5.4], D1: [7.2, 2.6],
  };

  const DRAGOER_JF = {
    titre: 'Jet franc aux 9 mètres (Dragør HK, rubrique "Exercices de jeu", trad. française)',
    url: 'http://www.dragoerhb.dk/fransk/ejjavaovkaf.html',
  };

  // Coup franc exécuté par le pivot au centre, demi-centre à côté de lui sur la ligne des 9 m.
  const PIVOT_CENTRE = {
    AiG: [-9.5, 4.4], AiD: [9.5, 4.4], Piv: [0.6, 9.4], DC: [-0.7, 9.25], ArG: [-4.8, 10.2], ArD: [4.8, 10.2],
    G2: [-4.4, 5.6], G3: [-1.4, 6.5], D3: [1.5, 6.4], D2: [4.4, 5.6],
  };

  const GONZALEZ = {
    titre: 'I. González García, "El uso táctico del golpe franco en el balonmano", e-balonmano.com 11(1), 2015',
    url: 'https://www.redalyc.org/pdf/865/86538703002.pdf',
  };

  const ANTI = {
    titre: "T. Anti, \"L'utilisation du jet franc en jeu placé\", Approches du Handball n°58 (2000)",
    url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb58_adulte_attaque.pdf',
  };

  const NOTE_GONZALEZ = "Les 21 modèles de González sont des coups francs \"indirects\" (l'exécutant passe à un partenaire), contre une défense en barrière à 3 m. Les schémas de l'article n'ont pas été consultés: la position exacte du coup franc et certains placements sont interprétés.";

  /* ---------------------------------------------------------------- */
  /* Étapes partagées                                                 */
  /* ---------------------------------------------------------------- */

  const TIR_DIRECT_BASE = [
    {
      texte: "Le mur se forme sur la ligne des 9 m: l'ailier droit, le pivot et le demi-centre, qui exécute le jet franc. Le demi-centre passe à l'arrière gauche, lancé derrière le mur.",
      courses: { ArG: [-1.25, 11.0] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "Dès la passe, les joueurs du mur reculent ensemble, dos aux défenseurs: ils font écran et gênent leur sortie. L'arrière gauche suit le mouvement du mur.",
      courses: { AiD: [-2.5, 9.85], Piv: [-1.25, 9.8], DC: [0.05, 9.9], ArG: [-1.2, 10.75] },
      def: { G3: [-1.3, 7.3], G2: [-3.2, 7.0], D3: [0.8, 7.2] },
    },
  ];

  const MUR_CASSE_ECRAN_BASE = [
    {
      texte: "Le demi-centre, joueur du mur, passe à l'arrière droit (l'arrière opposé), qui fixe le 2 droit par l'extérieur. L'arrière gauche fait semblant de prendre le tir.",
      courses: { ArD: [5.4, 8.4], ArG: [-1.3, 10.5] },
      passe: ['DC', 'ArD', 0.1],
      def: { D2: [5.0, 6.5] },
    },
  ];

  window.COMBINAISONS.push(
    /* ================================================================ */
    /* JETS FRANCS (Dragør HK)                                          */
    /* ================================================================ */
    {
      id: 'jf-tir-direct-mur',
      nom: 'Jet franc: tir direct derrière le mur qui recule',
      alias: 'Tir direct (Dragør), suspension protégée (A. Behm), pantalla de dos (Román), stěna (CZ)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Le mur d'attaquants recule dès la passe et fait écran: le tireur suit le mur et tire en suspension par-dessus.",
      description: [
        "Jet franc à 9 m. Des attaquants forment un mur sur la ligne des 9 m, face aux défenseurs placés à 3 m du ballon. Dès que le ballon part vers le tireur, les joueurs du mur reculent ensemble: ils gênent la sortie des défenseurs et cachent le départ du tir.",
        "Le nombre de joueurs du mur varie selon les sources: trois chez Dragør HK, deux chez Román Seco et dans la \"suspension protégée\" d'Alain Behm. Şufaru et Iancu décrivent le même geste pour le demi-centre seul, qui recule dos à l'adversaire. La source danoise ne dit pas qui compose le mur; ici, l'ailier droit, le pivot et le demi-centre, qui exécute le jet franc.",
        "Variante tchèque citée par Román: le tireur ne tire pas et passe à un des joueurs de l'écran. Les sources ne détaillent pas la suite; le schéma montre une fin possible (pénétration du demi-centre). Pour la suite \"Fribourg\" (redoublement de passe derrière la suspension protégée), voir la fiche des jets francs \"Fribourg\" et \"Göppingen\".",
      ],
      objectif: "Tirer de loin à l'abri d'un écran mobile, avant que la défense ne sorte.",
      pointsCles: [
        "Le mur recule immédiatement après la passe, pas avant: sinon le jet franc est à refaire.",
        'Attention au "mauvais bloc" en reculant: les joueurs du mur restent sur place au moment du contact.',
        "Beaucoup de défenseurs baissent les bras quand un joueur vient sur eux: c'est le moment du tir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Tir direct (Dragør HK, fiche f107)',
          url: 'http://www.dragoerhb.dk/fransk/f107.html',
          note: '"Un mur de trois joueurs se forme qui, immédiatement après la passe au tireur, reculent et font un écran."',
        },
        {
          titre: 'A. Behm, "Handball: mes coups de cœur", Approches du Handball n°114, p. 49',
          url: 'https://www.calameo.com/ffhandball/read/007275111122817ab0e6a?page=49',
          note: "\"Suspension protégée\": deux joueurs en protection, passe à l'arrière, les deux font écran en reculant, tir de l'arrière.",
        },
        {
          titre: 'J. D. Román Seco, Evolución del juego de balonmano VI. El juego del pivote (UPM), gr. 71 et 73',
          url: 'https://oa.upm.es/48165/1/MONOGRAFICO_JUAN_DE_DIOS_ROMAN_SECO_06.pdf',
          note: "Écran à deux sur coup franc: l'un fait la passe, puis les deux reculent; variante tchèque: le tireur passe à un des bloqueurs.",
        },
        {
          titre: 'Şufaru & Iancu, Gymnasium (Bacău), 2015, action 11',
          url: 'https://gymnasium.ub.ro/journal/article/view/105/99',
          note: "Le demi-centre fait le \"mur\" en reculant dos à l'adversaire; l'arrière tire ou redonne à un autre joueur du mur.",
        },
      ],
      ballon: 'DC',
      depart: { ...MUR_CENTRAL },
      variantes: [
        {
          nom: '1 - Tir par-dessus le mur',
          etapes: [
            ...TIR_DIRECT_BASE,
            {
              texte: "L'arrière gauche tire en suspension par-dessus le mur.",
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
        {
          nom: '2 - Passe à un joueur du mur (variante tchèque)',
          etapes: [
            ...TIR_DIRECT_BASE,
            {
              texte: "Les défenseurs centraux contournent le mur pour sortir sur le tireur. L'arrière gauche feinte le tir et redonne au demi-centre, joueur du mur.",
              passe: ['ArG', 'DC', 0.45],
              def: { G3: [-2.0, 8.5], D3: [0.9, 8.4] },
            },
            {
              texte: "Le demi-centre se retourne et attaque l'espace laissé par le 3 droit, entre le 3 et le 2 droits.",
              courses: { DC: [2.3, 7.4] },
              def: { D2: [3.9, 6.3] },
            },
            {
              texte: "Le demi-centre tire.",
              tir: 'DC',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-mur-casse',
      nom: 'Jet franc: mur cassé',
      alias: 'Gennembrud (DA), Break through (EN), mur cassé à 3 (Handball Gardéen)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Le tir annoncé est un leurre: le ballon va à un joueur du mur, qui pivote et perce, ou à l'arrière opposé.",
      description: [
        "Famille de jets francs de Dragør HK. L'arrière \"censé tirer\" attire la défense par une feinte de tir en suspension, pendant que le ballon va ailleurs.",
        "Mur cassé: le ballon va au joueur de gauche ou de droite du mur, qui pivote et entre tirer aux 6 m; les deux autres joueurs du mur bloquent. Avec écran: le joueur du mur qui passe quitte le mur et bloque le défenseur central, le joueur central du mur entre et reçoit de l'arrière opposé. Avec écran et passe et va: le joueur extérieur du mur bloque de côté, le tireur joue un une-deux avec son ailier et prend l'intervalle entre l'ailier et le bloc.",
        "Un entraîneur espagnol décrit une version proche sur un forum: le porteur passe court à un joueur du mur au moment où le tireur prend son élan; ce joueur pivote et cherche la pénétration. La composition du mur n'est pas précisée par les sources: ici, l'ailier droit, le pivot et le demi-centre, qui exécute le jet franc.",
      ],
      objectif: "Punir la défense qui se concentre sur le tireur annoncé.",
      pointsCles: [
        "La feinte de tir de l'arrière doit être crédible pour fixer les défenseurs centraux.",
        "Le joueur du mur pivote dès la réception, épaule vers le but.",
        "Les blocs des autres joueurs du mur sont posés sans bouger au moment du contact.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Mur cassé (Dragør HK, f108)',
          url: 'http://www.dragoerhb.dk/fransk/f108.html',
          note: '"Le joueur qui vient de recevoir le ballon, tourne sur lui-même et effectue une entrée pour aller tirer aux 6m."',
        },
        {
          titre: 'Mur cassé avec écran (Dragør HK, f109)',
          url: 'http://www.dragoerhb.dk/fransk/f109.html',
          note: "\"Le joueur central du mur rentre dans l'intervalle, réceptionne la passe de l'arrière opposé et tire.\"",
        },
        {
          titre: 'Mur cassé avec écran et passe et va (Dragør HK, f110)',
          url: 'http://www.dragoerhb.dk/fransk/f110.html',
          note: "\"Le tireur passe à l'ailier qui va fixer son vis-à-vis et renvoie rapidement vers le tireur qui prend l'intervalle entre l'ailier et le bloc.\"",
        },
        {
          titre: 'Forum Lo + Balonmano, "Jugadas ensayadas en pasivo" (2008)',
          url: 'https://balonmano.mforos.com/142972/6477188-jugadas-ensayadas-en-pasivo/',
          note: '"el poseedor del balón se lo pasa corto a un compañero de la barrera que gira y busca la penetración".',
        },
      ],
      ballon: 'DC',
      depart: { ...MUR_CENTRAL },
      variantes: [
        {
          nom: '1 - Mur cassé',
          etapes: [
            {
              texte: "Le demi-centre passe au joueur de gauche du mur, l'ailier droit. L'arrière gauche fixe vers le mur et fait semblant de tirer en suspension.",
              courses: { ArG: [-1.6, 10.5] },
              passe: ['DC', 'AiD', 0.1],
            },
            {
              texte: "L'ailier droit pivote sur lui-même et entre vers les 6 m, entre le 2 et le 3 gauches. Le pivot bloque le 3 gauche, le demi-centre bloque le 3 droit.",
              courses: { AiD: [-2.6, 7.2], Piv: [-0.9, 7.4], DC: [1.1, 7.35] },
              def: { G3: [-1.2, 6.5], G2: [-3.6, 6.4] },
            },
            {
              texte: "L'ailier droit tire aux 6 m.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: '2 - Mur cassé avec écran',
          etapes: [
            ...MUR_CASSE_ECRAN_BASE,
            {
              texte: "Le demi-centre quitte le mur et bloque le 3 droit. Le pivot, joueur central du mur, entre dans l'intervalle entre les deux 3 et reçoit de l'arrière droit.",
              courses: { DC: [1.2, 7.45], Piv: [-0.1, 7.3] },
              passe: ['ArD', 'Piv', 0.7],
              def: { D3: [1.2, 6.5], G3: [-1.3, 6.6] },
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: '3 - Mur cassé avec écran et passe et va',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche. Le mur fait écran; l'ailier droit, joueur extérieur du mur, pose en plus un bloc de côté, à l'extérieur du 2 gauche.",
              courses: { ArG: [-2.4, 10.6], AiD: [-4.7, 7.0], Piv: [-1.25, 9.6], DC: [0, 9.7] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-3.9, 6.3] },
            },
            {
              texte: "L'arrière gauche passe à l'ailier gauche, qui fixe le 1 gauche.",
              courses: { AiG: [-7.9, 3.6], ArG: [-4.0, 9.6] },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-7.0, 3.3] },
            },
            {
              texte: "L'ailier gauche renvoie aussitôt à l'arrière gauche (passe et va), qui prend l'intervalle entre l'ailier et le bloc.",
              courses: { ArG: [-5.9, 6.7] },
              passe: ['AiG', 'ArG', 0.15],
              def: { G1: [-6.9, 4.3] },
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '4 - Le joueur du mur pivote (forum espagnol)',
          etapes: [
            {
              texte: "L'arrière gauche prend son élan comme pour tirer. Au même moment, le demi-centre passe court au pivot, dans le mur.",
              courses: { ArG: [-1.3, 10.4] },
              passe: ['DC', 'Piv', 0.3],
            },
            {
              texte: "Le pivot pivote et pénètre entre les deux 3. L'ailier droit et le demi-centre gênent les défenseurs centraux.",
              courses: { Piv: [0, 7.3], AiD: [-2.0, 7.5], DC: [1.6, 7.45] },
              def: { G3: [-0.9, 6.6], D3: [0.95, 6.6] },
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-tir-au-travers',
      nom: 'Jet franc: tir en suspension au travers',
      alias: 'Hopskud tværs (DA), Jump shot across (EN)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Le joueur extérieur du mur s'écarte pour faire écran; le tireur fixe vers lui et le second arrière croise dans son dos pour tirer.",
      description: [
        "Le mur fait écran. Son joueur extérieur s'écarte du reste du mur pour poser un écran plus loin. Le tireur fixe en direction de cet écran; le deuxième arrière croise dans son dos, reçoit et tire en suspension.",
        "Les placements de départ et le côté du croisé viennent du schéma de la fiche, non consulté: ils sont interprétés ici. Le croisé se joue en sens inverse, le tireur allant vers l'écran, le second arrière traversant le terrain derrière lui.",
      ],
      objectif: "Libérer un tir de loin derrière un écran que la défense n'attend pas.",
      pointsCles: [
        "Le second arrière passe tout près, dans le dos du tireur.",
        "Le joueur extérieur du mur s'écarte au moment de la passe, pas avant.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Tir en suspension au travers (Dragør HK, f111)',
          url: 'http://www.dragoerhb.dk/fransk/f111.html',
          note: '"Le deuxième arrière croise dans son dos, réceptionne la passe et effectue un tir en suspension."',
        },
        { ...DRAGOER_JF, note: 'Nom danois "Hopskud tværs" (fiche 111).' },
      ],
      ballon: 'DC',
      depart: { ...MUR_CENTRAL, ArG: [-5.2, 10.4], ArD: [3.0, 11.2] },
      etapes: [
        {
          texte: "Le demi-centre exécute le jet franc et passe à l'arrière gauche, le tireur. Le mur fait écran; l'ailier droit, joueur extérieur du mur, s'écarte vers la gauche devant le 2 gauche.",
          courses: { ArG: [-5.0, 10.7], AiD: [-3.8, 9.4], Piv: [-1.25, 9.5], DC: [0, 9.6] },
          passe: ['DC', 'ArG', 0.1],
        },
        {
          texte: "L'arrière gauche fixe vers l'intérieur, en direction de l'écran. L'arrière droit traverse et croise dans son dos; il reçoit le ballon.",
          courses: { ArG: [-3.1, 10.3], ArD: { vers: [-4.6, 11.0], via: [-1.2, 12.3] } },
          passe: ['ArG', 'ArD', 0.75],
          def: { G2: [-3.7, 6.9], G3: [-2.1, 7.1] },
        },
        {
          texte: "L'arrière droit tire en suspension, au travers, par-dessus l'écran de l'ailier droit.",
          courses: { ArD: [-4.4, 10.6] },
          tir: { par: 'ArD', t: 0.6 },
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-interieur-exterieur',
      nom: 'Jet franc: intérieur / extérieur',
      alias: 'Udvendig/Indvendig (DA), Inside/Outside (EN)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Le passeur du mur prend l'intervalle ouvert par un bloc extérieur; si l'ailier défenseur ferme, l'ailier tire.",
      description: [
        "Jet franc côté droit de l'attaque, avec un mur de trois attaquants collé à trois défenseurs. Le passeur est dans le mur: il donne à l'arrière qui se déplace vers la gauche. Le joueur de droite du mur part vers l'extérieur et bloque l'arrière défenseur extérieur. Le passeur prend l'intervalle ouvert par le bloc, reçoit et tire.",
        "Si l'ailier défenseur ferme l'intervalle, l'ailier attaquant reçoit et tire. Placements d'après le schéma de la fiche; la composition du mur (arrière gauche, demi-centre, pivot) est un choix du schéma.",
      ],
      objectif: "Ouvrir un intervalle entre le défenseur central et l'arrière défenseur par un bloc extérieur.",
      pointsCles: [
        "Le passeur part dans l'intervalle juste après sa passe.",
        "Le bloc se pose à l'intérieur du 2 droit pour le repousser vers l'extérieur.",
        "Lire l'ailier défenseur: s'il ferme, l'ailier est libre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Intérieur/Extérieur (Dragør HK, f1109)',
          url: 'http://www.dragoerhb.dk/fransk/f1109.html',
          note: "\"Le joueur qui vient d'effectuer la passe prend l'intervalle du bloc, reçoit la balle et va au tir.\"",
        },
      ],
      ballon: 'DC',
      depart: {
        AiG: [-9.5, 4.4], AiD: [9.5, 4.4], ArG: [0.6, 9.2], DC: [1.9, 9.5], Piv: [3.2, 9.2], ArD: [4.4, 11.4],
        G2: [-4.6, 5.4], G3: [-1.4, 6.5], D3: [1.3, 6.4], D2: [4.2, 5.8],
      },
      variantes: [
        {
          nom: '1 - Tir du passeur',
          etapes: [
            {
              texte: "Le demi-centre, au milieu du mur, passe à l'arrière droit, qui se déplace vers la gauche. Le pivot, joueur de droite du mur, part vers l'extérieur et bloque le 2 droit.",
              courses: { ArD: [2.8, 10.6], Piv: [4.0, 6.9] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [4.6, 6.1] },
            },
            {
              texte: "Le demi-centre, qui vient de passer, prend l'intervalle ouvert par le bloc, entre le 3 et le 2 droits. L'arrière droit lui donne le ballon.",
              courses: { DC: [2.7, 7.4] },
              passe: ['ArD', 'DC', 0.65],
              def: { D3: [1.6, 6.7] },
            },
            {
              texte: "Le demi-centre tire.",
              tir: 'DC',
            },
          ],
        },
        {
          nom: "2 - Tir de l'ailier",
          etapes: [
            {
              texte: "Le demi-centre, au milieu du mur, passe à l'arrière droit, qui se déplace vers la gauche. Le pivot, joueur de droite du mur, part vers l'extérieur et bloque le 2 droit.",
              courses: { ArD: [2.8, 10.6], Piv: [4.0, 6.9] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [4.6, 6.1] },
            },
            {
              texte: "Le demi-centre prend l'intervalle du bloc et reçoit. Le 1 droit, l'ailier défenseur, rentre pour fermer l'intervalle.",
              courses: { DC: [2.7, 7.4], AiD: [8.7, 2.0] },
              passe: ['ArD', 'DC', 0.6],
              def: { D3: [1.6, 6.7], D1: [5.4, 5.5] },
            },
            {
              texte: "Le demi-centre donne à l'ailier droit, resté libre.",
              passe: ['DC', 'AiD', 0.2],
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-rentree',
      nom: 'Jet franc: rentrée',
      alias: "Fløjindløb, Overgang (DA); Wing running in, Running in (EN); rentrée d'ailier",
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Le tireur annoncé attire la défense; un partenaire qui rentre dans son dos ou le long des 6 m reçoit et tire.",
      description: [
        "Deux jets francs de Dragør HK fondés sur une rentrée. Rentrée d'ailier: le tireur s'engage comme pour tirer; l'ailier gauche entre juste après lui et reçoit le ballon du côté opposé. Rentrée: le tireur se lance vers l'extérieur; juste avant son tir, l'arrière gauche s'engage à toute vitesse dans son dos, à l'opposé du mur, et reçoit.",
        "Les textes sont courts et les schémas n'ont pas été consultés: \"côté opposé\" et \"à l'opposé du mur\" sont interprétés ici (le mur est à gauche du point de jet franc, le tireur est l'arrière droit). Le déroulement suit le principe des sources, les placements sont un choix.",
      ],
      objectif: "Surprendre la défense, concentrée sur le tireur, par un joueur qui arrive lancé.",
      pointsCles: [
        "Le tireur doit vraiment menacer pour attirer les défenseurs centraux.",
        "Le joueur qui rentre part au dernier moment, à pleine vitesse.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Rentrée d'ailier (Dragør HK, f95)",
          url: 'http://www.dragoerhb.dk/fransk/f95.html',
          note: '"Le ballon est passé sur le côté opposé à GX qui a, tout juste après le tireur, effectué une entrée."',
        },
        {
          titre: 'Rentrée (Dragør HK, f97)',
          url: 'http://www.dragoerhb.dk/fransk/f97.html',
          note: "\"ARG va s'engager à toute vitesse dans son dos et à l'opposé du mur, puis reçoit la passe du tireur.\"",
        },
      ],
      ballon: 'DC',
      depart: { ...MUR_CENTRAL, ArG: [-4.8, 10.6], ArD: [-1.25, 11.6] },
      variantes: [
        {
          nom: "1 - Rentrée d'ailier",
          etapes: [
            {
              texte: "Le demi-centre passe au tireur, l'arrière droit, placé derrière le mur. L'arrière droit s'engage pour faire croire qu'il va tirer.",
              courses: { ArD: [-1.0, 10.6] },
              passe: ['DC', 'ArD', 0.1],
              def: { G3: [-1.3, 7.0], D3: [0.9, 6.9] },
            },
            {
              texte: "Juste après, l'ailier gauche entre: il court le long des 6 m, devant la défense, vers le côté opposé.",
              courses: { AiG: { vers: [2.9, 7.3], via: [-3.6, 8.4] } },
              def: { D2: [4.2, 6.0] },
            },
            {
              texte: "L'arrière droit envoie le ballon de ce côté opposé, à l'ailier gauche.",
              passe: ['ArD', 'AiG', 0.15],
            },
            {
              texte: "L'ailier gauche tire.",
              tir: 'AiG',
            },
          ],
        },
        {
          nom: "2 - Rentrée de l'arrière gauche dans le dos du tireur",
          etapes: [
            {
              texte: "Le demi-centre passe au tireur, l'arrière droit, qui se lance vers l'extérieur, à gauche du mur, comme pour tirer.",
              courses: { ArD: [-3.3, 10.5], ArG: [-5.2, 11.3] },
              passe: ['DC', 'ArD', 0.1],
              def: { G2: [-3.7, 6.8], G3: [-2.0, 7.0] },
            },
            {
              texte: "Juste avant le tir, l'arrière gauche s'engage à toute vitesse dans son dos, vers le côté opposé au mur. L'arrière droit lui passe le ballon.",
              courses: { ArG: { vers: [1.7, 9.9], via: [-2.6, 12.2] } },
              passe: ['ArD', 'ArG', 0.7],
            },
            {
              texte: "L'arrière gauche tire.",
              courses: { ArG: [2.0, 9.4] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D3: [1.6, 6.9] },
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-hongrois',
      nom: 'Jet de 9 m hongrois',
      alias: 'Ungarsk 3-meter (DA), Hungarian 9-meter throw (EN), jet de 9 m hongrois',
      categorie: 'Combinaisons à nom de pays',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Mur à deux (pivot et demi-centre): fixations extérieures de l'arrière et de l'ailier, bloc extérieur du pivot, le demi-centre perce à côté du bloc.",
      description: [
        "Jet franc côté gauche de l'attaque. Le mur est formé du pivot et du demi-centre, joueur intérieur du mur, qui exécute le jet franc. Le demi-centre passe à l'arrière gauche, qui fixe le 2 gauche par l'extérieur pour le déplacer; l'ailier gauche fixe à son tour par l'extérieur.",
        "Le pivot s'engage et pose un bloc à l'extérieur du 3 gauche. L'arrière gauche rend au demi-centre, qui s'engage dans l'intervalle à l'extérieur du bloc et tire. Fiche envoyée à Dragør HK par Kim Ludvig; l'origine hongroise du nom n'est pas expliquée.",
      ],
      objectif: "Écarter les défenseurs latéraux pour ouvrir l'intervalle 2-3 au demi-centre.",
      pointsCles: [
        "Les deux fixations extérieures doivent vraiment déplacer le 2 et le 1.",
        "Le bloc du pivot se pose sur l'extérieur du 3, pour l'empêcher de glisser.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Jet de 9m Hongrois (Dragør HK, f131)',
          url: 'http://www.dragoerhb.dk/fransk/f131.html',
          note: "\"PVT s'engage et fait un bloc externe sur 3C. ARG passe la balle à DC qui s'engage dans l'intervalle extérieur au bloc.\"",
        },
        {
          titre: '16 combinaisons animées (Handball Gardéen)',
          url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349',
          note: '"Sur un jet de 9 m Hongrois" (renvoie à la fiche Dragør).',
        },
      ],
      ballon: 'DC',
      depart: {
        AiG: [-9.5, 4.4], AiD: [9.5, 4.4], DC: [-2.4, 9.45], Piv: [-3.7, 9.25], ArG: [-5.8, 10.4], ArD: [3.0, 10.4],
        G2: [-4.3, 5.9], G3: [-1.4, 6.5], D3: [1.6, 6.6],
      },
      etapes: [
        {
          texte: "Le demi-centre, joueur intérieur du mur, exécute le jet franc: il passe à l'arrière gauche.",
          courses: { ArG: [-5.6, 9.9] },
          passe: ['DC', 'ArG', 0.1],
        },
        {
          texte: "L'arrière gauche fixe le 2 gauche par l'extérieur pour le déplacer. L'ailier gauche fixe à son tour le 1 gauche par l'extérieur.",
          courses: { ArG: [-5.6, 8.4], AiG: [-8.4, 3.4] },
          def: { G2: [-4.9, 6.6], G1: [-7.4, 3.0] },
        },
        {
          texte: "Le pivot s'engage et pose un bloc à l'extérieur du 3 gauche.",
          courses: { Piv: [-2.5, 7.4] },
          def: { G3: [-1.7, 6.8] },
        },
        {
          texte: "L'arrière gauche passe au demi-centre, qui s'engage dans l'intervalle à l'extérieur du bloc.",
          courses: { DC: [-3.5, 7.5] },
          passe: ['ArG', 'DC', 0.5],
        },
        {
          texte: "Le demi-centre tire.",
          tir: 'DC',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-croise-d-aile',
      nom: "Jet franc: croisé d'aile",
      alias: 'Fløjkryds (DA), Wing cross (EN)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "L'ailier gauche entre vers le centre, reçoit du tireur et croise avec le joueur intérieur du mur, qui tire.",
      description: [
        "Jet franc avec le mur côté droit de l'attaque. Le signal: l'ailier gauche s'engage vers le centre. Le passeur, au milieu du mur, donne au tireur, sur qui sort le défenseur latéral; le tireur passe aussitôt à l'ailier gauche.",
        "Le joueur intérieur du mur quitte le mur et court vers l'extérieur, en sens inverse de l'ailier, et croise avec lui. L'ailier prend l'intervalle et donne au joueur qui le croise, qui tire. La source ajoute que le tir peut aussi venir quand le tireur annoncé a repris sa place.",
        "Le côté de chaque course dépend du schéma de la fiche, non consulté; la composition du mur (pivot, demi-centre, ailier droit) est un choix.",
      ],
      objectif: "Créer un croisé inattendu entre un ailier et un joueur du mur.",
      pointsCles: [
        "L'engagement de l'ailier gauche sert de signal à tous.",
        "Le tireur passe immédiatement à l'ailier, sans temporiser.",
        "Le joueur du mur croise dans le dos de l'ailier.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Croisé d'aile (Dragør HK, f319)",
          url: 'http://www.dragoerhb.dk/fransk/f319.html',
          note: '"Le joueur interne du mur quitte le mur et court extérieur dans le sens opposé de la course de ALG et fait un croisé avec lui."',
        },
      ],
      ballon: 'DC',
      depart: {
        AiG: [-9.5, 4.4], Piv: [0.9, 9.2], DC: [2.2, 9.45], AiD: [3.5, 9.15], ArG: [-4.0, 10.4], ArD: [5.8, 10.2],
        G2: [-4.5, 5.6], G3: [-1.5, 6.5], D3: [1.0, 6.4], D2: [3.8, 6.1],
      },
      etapes: [
        {
          texte: "Signal: l'ailier gauche s'engage vers le centre. Le demi-centre, au milieu du mur, passe au tireur, l'arrière gauche; le 2 gauche sort pour l'arrêter.",
          courses: { AiG: { vers: [-5.4, 7.4], via: [-8.0, 5.2] }, ArG: [-3.4, 9.8] },
          passe: ['DC', 'ArG', 0.3],
          def: { G2: [-3.9, 7.5] },
        },
        {
          texte: "L'arrière gauche passe aussitôt à l'ailier gauche, qui continue vers le centre. Le pivot, joueur intérieur du mur, quitte le mur et part vers la gauche.",
          courses: { AiG: [-2.2, 8.0], Piv: [-0.4, 9.7] },
          passe: ['ArG', 'AiG', 0.1],
        },
        {
          texte: "L'ailier gauche prend l'intervalle entre les deux 3. Le pivot croise dans son dos et reçoit.",
          courses: { AiG: [0, 7.5], Piv: { vers: [-2.7, 8.8], via: [-1.0, 10.1] } },
          passe: ['AiG', 'Piv', 0.7],
          def: { G3: [-0.9, 6.8], D3: [0.9, 6.8] },
        },
        {
          texte: "Le pivot tire.",
          tir: 'Piv',
        },
      ],
    },

    /* ================================================================ */
    /* JETS FRANCS EN JEU PLACÉ (Thierry Anti)                          */
    /* ================================================================ */
    {
      id: 'jf-anti',
      nom: 'Jets francs en jeu placé (Thierry Anti): secteur central',
      alias: "L'utilisation du jet franc en jeu placé (Approches du Handball n°58)",
      categorie: 'Jets francs et remises en jeu',
      defense: '0-6',
      resume: "Le pivot remet en jeu au centre; jeu à deux pivots avec le demi-centre, ou relation demi-centre - pivot.",
      description: [
        "Séance de Thierry Anti (US Créteil) sur l'utilisation du jet franc en jeu placé contre une 0-6: le pivot exécute le jet franc, puis l'équipe enchaîne une intention tactique précise. Cette fiche montre les deux situations jouées depuis le secteur central; la situation du secteur latéral fait l'objet d'une fiche à part (le jet franc n'est pas au même endroit).",
        "Situation 1 (deux pivots): le pivot remet en jeu vers un arrière pendant que le demi-centre rentre en 2e pivot; le pivot se replace dedans en croisant le demi-centre. Les pivots jouent à l'intérieur (bloc ou écran pour les arrières, ou aide au débordement); les arrières choisissent le jeu intérieur ou le décalage; les ailiers écartent.",
        "Situation 3 (relation demi-centre - pivot): le demi-centre s'engage pour tirer dans le secteur extérieur; s'il ne peut pas, il se réengage à l'intérieur, près du pivot, qui est redescendu dans le secteur opposé. Sinon, continuité vers les ailes.",
        "Situation 4: à 6 contre 5, le pivot se replace au centre après la remise en jeu; à 5 contre 6, tirer en deux passes au plus. Les schémas de l'article n'ont pas été consultés: la fin montrée pour chaque situation est une des options du texte.",
      ],
      objectif: "Profiter de la défense qui se replace après le jet franc pour jouer une intention tactique préparée.",
      pointsCles: [
        "Le pivot exécute vite, puis se replace aussitôt dedans.",
        "Écartement maximal des ailiers.",
        "Les arrières lisent la défense: jeu intérieur ou décalage.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...ANTI, note: '"La séance présentée ci-dessous propose 3 combinaisons avec des intentions tactiques différentes."' },
      ],
      ballon: 'Piv',
      depart: { AiG: [-9.5, 4.4], AiD: [9.5, 4.4], Piv: [0, 9.4], DC: [0, 11.6], ArG: [-4.8, 10.0], ArD: [4.8, 10.0] },
      variantes: [
        {
          nom: '1 - Deux pivots (secteur central)',
          etapes: [
            {
              texte: "Le pivot exécute le jet franc: il passe à l'arrière gauche. Le demi-centre rentre en 2e pivot; le pivot retourne aux 6 m en croisant sa course.",
              courses: {
                DC: { vers: [-3.0, 7.2], via: [-0.6, 9.4] },
                Piv: { vers: [2.9, 7.0], via: [0.8, 8.4] },
                ArG: [-4.6, 9.4],
              },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "Les pivots jouent à l'intérieur: le demi-centre bloque le 3 gauche par l'extérieur. L'arrière gauche attaque l'intervalle entre le 2 et le 3 gauches; les ailiers restent écartés.",
              courses: { DC: [-2.6, 7.4], ArG: [-3.7, 8.4] },
              def: { G3: [-1.8, 6.9], G2: [-4.5, 6.2] },
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '2 - Relation demi-centre - pivot',
          etapes: [
            {
              texte: "Le pivot exécute le jet franc vers le demi-centre.",
              courses: { DC: [0, 11.0] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre s'engage pour tirer dans le secteur extérieur gauche, entre le 2 et le 3. Le pivot redescend aux 6 m dans le secteur opposé, à droite.",
              courses: { DC: [-2.8, 9.0], Piv: { vers: [2.9, 7.0], via: [1.8, 8.6] } },
              def: { G3: [-2.2, 7.2], G2: [-4.0, 6.6] },
            },
            {
              texte: "Les défenseurs ferment: le demi-centre se réengage vers l'intérieur, près du pivot. Le 3 droit sort sur lui.",
              courses: { DC: [1.2, 8.7] },
              def: { D3: [1.4, 7.6], D2: [4.3, 5.8] },
            },
            {
              texte: "Le demi-centre passe au pivot, libre dans le dos du 3 droit.",
              passe: ['DC', 'Piv', 0.2],
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-anti-secteur-lateral',
      nom: 'Jet franc en jeu placé (Thierry Anti): secteur latéral',
      alias: "L'utilisation du jet franc en jeu placé, situation 2",
      categorie: 'Jets francs et remises en jeu',
      defense: '0-6',
      resume: "Le pivot remet en jeu dans le secteur latéral puis bloque à l'extérieur: l'arrière prend le bloc, sert le pivot ou décale.",
      description: [
        "Situation 2 de la séance de Thierry Anti (voir aussi la fiche \"secteur central\"). Le pivot remet en jeu par une passe au demi-centre, qui transmet à l'arrière du côté où le pivot rentre; le pivot se replace à l'extérieur du défenseur pour un bloc extérieur.",
        "L'arrière porteur prend le bloc et tire, ou passe au pivot, ou au demi-centre, qui s'est replacé très vite à l'opposé pour enchaîner le décalage. Le schéma montre le tir de l'arrière; le côté de la prise de bloc est interprété (schémas non consultés).",
      ],
      objectif: "Créer un 2 contre 2 arrière - pivot sur le côté du jet franc.",
      pointsCles: [
        "Le pivot remet en jeu puis rentre tout de suite se placer à l'extérieur du 2.",
        "Le demi-centre se replace très vite à l'opposé pour offrir la continuité.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...ANTI, note: "Situation 2: le PV remet en jeu au DC, qui transmet à l'arrière du côté de la rentrée du PV; le PV se replace externe (bloc externe)." },
      ],
      ballon: 'Piv',
      depart: { AiG: [-9.5, 4.4], AiD: [9.5, 4.4], Piv: [-4.0, 9.3], DC: [-1.0, 10.6], ArG: [-6.6, 10.0], ArD: [4.4, 10.2] },
      etapes: [
        {
          texte: "Le pivot exécute le jet franc dans le secteur latéral gauche: il passe au demi-centre, puis rentre se placer à l'extérieur du 2 gauche.",
          courses: { Piv: [-5.7, 6.3] },
          passe: ['Piv', 'DC', 0.1],
          def: { G2: [-4.9, 5.5] },
        },
        {
          texte: "Le demi-centre transmet à l'arrière gauche, du côté de la rentrée du pivot. Le pivot bloque le 2 gauche par l'extérieur.",
          courses: { ArG: [-6.2, 9.2] },
          passe: ['DC', 'ArG', 0.3],
        },
        {
          texte: "L'arrière gauche prend le bloc et attaque à l'extérieur du pivot. Le demi-centre se replace très vite à l'opposé pour la suite.",
          courses: { ArG: [-6.9, 7.4], DC: [2.6, 10.2] },
          def: { G1: [-7.7, 4.0] },
        },
        {
          texte: "L'arrière gauche tire.",
          tir: 'ArG',
        },
      ],
    },

    /* ================================================================ */
    /* COUPS FRANCS DE GONZÁLEZ (2015)                                   */
    /* ================================================================ */
    {
      id: 'jf-ecran-central',
      nom: 'Coups francs avec écran central et tir lancé',
      alias: 'Golpe franco n°1, 2, 3 et 16 (González 2015, ES), pantalla',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (coup franc)',
      resume: "Le pivot exécute au centre; le pivot et le demi-centre font écran devant les défenseurs centraux pour un tir lancé de loin.",
      description: [
        "Modèles de coup franc d'Iván González García (université de Vigo) avec un écran au centre. Le pivot exécute; le demi-centre se \"dédouble\" à côté de lui (il descend vers les défenseurs) pour bloquer les deux défenseurs centraux; un arrière ou un ailier arrive lancé et tire derrière cet écran.",
        "n°1: le demi-centre passe à l'arrière droit puis bloque avec le pivot; l'arrière droit fixe et donne à l'arrière gauche lancé. n°2: pivot et demi-centre forment l'écran dès le départ; l'arrière gauche fixe et sert l'arrière droit lancé vers le centre. n°3: même idée, mais l'arrière gauche permute avec l'ailier gauche, qui devient le tireur. n°16: passe à l'autre joueur de l'écran, qui attaque le but; le passeur croise dans son dos pour pénétrer.",
        NOTE_GONZALEZ + " Ici, tous les modèles partent d'un coup franc au centre, avec le demi-centre à côté du pivot (le modèle n°1 le place en retrait, le n°3 décrit un coup franc côté gauche).",
      ],
      objectif: "Libérer un tir de loin derrière un écran de deux joueurs sur les défenseurs centraux.",
      pointsCles: [
        "Les \"moyens tactiques les plus utilisés sur coup franc\": blocs frontaux pour un tireur et écrans de deux ou trois joueurs (González, d'après Antón).",
        "Le tireur arrive en course, dans l'axe de l'écran.",
        "L'arrière qui fixe sa zone attire le 2 avant de passer.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...GONZALEZ, note: 'n°1: "desdobla junto al pivote para bloquear a los dos centrales [...] pasa a lateral izquierdo en desplazamiento con trayectoria a la zona central para lanzar aprovechando la pantalla".' },
        { ...GONZALEZ, titre: GONZALEZ.titre + ', fig. 2, 3 et 16', note: 'n°2: "lanzamiento en 9 metros aprovechando la pantalla del pivote y central"; n°3: "el lateral izquierdo realiza permuta con extremo izquierdo".' },
      ],
      ballon: 'Piv',
      depart: { ...PIVOT_CENTRE },
      variantes: [
        {
          nom: "n°1 - Dédoublement du centre, tir de l'arrière gauche",
          etapes: [
            {
              texte: "Le pivot exécute le coup franc au centre: il sert le demi-centre.",
              courses: { DC: [-0.8, 10.0] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis se dédouble à côté du pivot: tous deux bloquent les deux défenseurs centraux.",
              courses: { DC: [-1.3, 7.5], Piv: [1.4, 7.4], ArD: [4.5, 9.5] },
              passe: ['DC', 'ArD', 0.15],
            },
            {
              texte: "L'arrière droit fixe sa zone, puis passe à l'arrière gauche, qui arrive en course vers le centre.",
              courses: { ArD: [4.2, 8.5], ArG: [-0.2, 9.7] },
              passe: ['ArD', 'ArG', 0.6],
              def: { D2: [4.4, 6.6] },
            },
            {
              texte: "L'arrière gauche tire derrière l'écran.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: "n°2 - Écran pivot + centre, tir de l'arrière droit",
          etapes: [
            {
              texte: "Le pivot et le demi-centre forment l'écran au centre. Le pivot passe à l'arrière gauche, qui fixe sa zone; les deux joueurs de l'écran avancent sur les défenseurs centraux.",
              courses: { ArG: [-4.4, 8.9], DC: [-0.9, 7.6], Piv: [0.9, 7.6] },
              passe: ['Piv', 'ArG', 0.1],
              def: { G2: [-4.5, 6.6] },
            },
            {
              texte: "L'arrière droit arrive vers le centre et reçoit de l'arrière gauche.",
              courses: { ArD: [0.3, 9.9] },
              passe: ['ArG', 'ArD', 0.6],
            },
            {
              texte: "L'arrière droit tire à 9 m, derrière l'écran du pivot et du demi-centre.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: "n°3 - Permutation arrière / ailier, tir de l'ailier",
          etapes: [
            {
              texte: "Le pivot sert l'arrière gauche.",
              courses: { ArG: [-4.4, 9.6] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe au demi-centre, puis permute avec l'ailier gauche: il descend à l'aile, l'ailier monte à l'arrière.",
              courses: {
                DC: [-0.8, 10.0],
                ArG: { vers: [-9.0, 2.6], via: [-6.4, 6.8] },
                AiG: { vers: [-5.6, 10.6], via: [-9.0, 9.4] },
              },
              passe: ['ArG', 'DC', 0.15],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit et se dédouble à côté du pivot: écran sur les centraux.",
              courses: { DC: [-1.3, 7.5], Piv: [1.4, 7.4], ArD: [4.5, 9.5] },
              passe: ['DC', 'ArD', 0.15],
            },
            {
              texte: "L'arrière droit fixe sa zone et passe à l'ailier gauche, lancé en trajectoire centrale.",
              courses: { ArD: [4.2, 8.5], AiG: [-0.3, 9.7] },
              passe: ['ArD', 'AiG', 0.65],
              def: { D2: [4.4, 6.6] },
            },
            {
              texte: "L'ailier gauche tire derrière l'écran du pivot et du demi-centre.",
              tir: 'AiG',
            },
          ],
        },
        {
          nom: "n°16 - Passe à l'écran et croisé du passeur",
          etapes: [
            {
              texte: "Le pivot passe à l'autre joueur de l'écran, le demi-centre, qui attaque le but et fixe le 3 gauche.",
              courses: { DC: [-1.0, 7.6] },
              passe: ['Piv', 'DC', 0.1],
              def: { G3: [-1.2, 6.6] },
            },
            {
              texte: "Le pivot, le passeur, croise dans le dos du demi-centre et reçoit.",
              courses: { Piv: { vers: [-2.9, 8.3], via: [-1.2, 9.4] } },
              passe: ['DC', 'Piv', 0.65],
              def: { G2: [-3.7, 6.6] },
            },
            {
              texte: "Le pivot pénètre entre le 2 et le 3 gauches et tire. Sinon, il fixe son défenseur libre et la continuité se joue en pénétrations successives vers l'arrière droit.",
              courses: { Piv: [-2.7, 7.3] },
              tir: { par: 'Piv', t: 0.6 },
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-coup-franc-droite',
      nom: "Coup franc à droite: dédoublement du centre pour l'écran",
      alias: 'Golpe franco n°8 (González 2015, ES)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (coup franc)',
      resume: "L'arrière droit exécute; l'arrière gauche vient tirer au centre derrière l'écran du pivot et du demi-centre.",
      description: [
        "Modèle n°8 de González: le coup franc est sifflé côté droit. L'arrière droit met en jeu vers l'arrière gauche, qui vient vers le centre pour tirer; le demi-centre se dédouble pour faire écran avec le pivot, et l'arrière gauche tire derrière cet écran.",
        NOTE_GONZALEZ + ' Voir aussi "Coups francs avec écran central et tir lancé", même mécanisme avec le pivot comme exécutant.',
      ],
      objectif: "Libérer un tir de loin au centre quand le coup franc est sifflé sur un côté.",
      pointsCles: [
        "L'arrière gauche part vers le centre dès la mise en jeu.",
        "Le demi-centre arrive à côté du pivot au moment du tir.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...GONZALEZ, note: 'n°8: "El central desdobla para realizar una pantalla junto al pivote que es aprovechada por el lanzador".' },
      ],
      ballon: 'ArD',
      depart: {
        AiG: [-9.5, 4.4], AiD: [9.5, 4.4], ArD: [3.6, 9.4], Piv: [0.4, 9.2], DC: [-0.6, 10.8], ArG: [-4.8, 10.2],
        G2: [-4.4, 5.6], G3: [-1.4, 6.5], D3: [1.5, 6.4], D2: [4.4, 5.6],
      },
      etapes: [
        {
          texte: "L'arrière droit exécute le coup franc: il passe à l'arrière gauche, qui part vers le centre pour tirer.",
          courses: { ArG: [-2.6, 10.2] },
          passe: ['ArD', 'ArG', 0.2],
        },
        {
          texte: "Le demi-centre se dédouble: il descend faire écran à côté du pivot, devant les défenseurs centraux. L'arrière gauche continue sa course.",
          courses: { DC: [-1.4, 7.6], Piv: [0.3, 7.5], ArG: [-0.9, 9.9] },
        },
        {
          texte: "L'arrière gauche tire derrière l'écran.",
          tir: 'ArG',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-coup-franc-demi-centre',
      nom: 'Coups francs exécutés par le demi-centre (ailier en circulation, pivot qui revient)',
      alias: 'Golpe franco n°9 et 17 (González 2015, ES)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (coup franc)',
      resume: "Le demi-centre, à côté du pivot, exécute: l'ailier droit circule et attaque les centraux, ou l'arrière gauche joue avec le bloc du demi-centre et sert le pivot.",
      description: [
        "Deux modèles de González où le demi-centre, placé à côté du pivot, exécute le coup franc.",
        "n°9: le demi-centre sert l'ailier droit, qui arrive en circulation et attaque les deux défenseurs centraux; l'arrière droit prend le poste d'ailier laissé libre; l'arrière gauche reçoit de l'ailier, côté opposé, et tire derrière le double écran. n°17: le demi-centre met en jeu vers l'arrière gauche, qui attaque grâce au bloc de ce même demi-centre; le pivot part vers le lieu de la passe initiale, change de direction, reçoit de l'arrière et pénètre du côté opposé.",
        NOTE_GONZALEZ,
      ],
      objectif: "Surprendre la barrière par un exécutant qui devient bloqueur et un pivot qui change de direction.",
      pointsCles: [
        "n°9: l'ailier droit arrive lancé, au moment de la mise en jeu.",
        "n°17: le changement de direction du pivot doit être net pour perdre son défenseur.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...GONZALEZ, note: 'n°9: "realiza el saque al extremo derecho que viene a recibir en circulación y ataca a los defensores centrales [...] aprovechando la doble pantalla".' },
        { ...GONZALEZ, titre: GONZALEZ.titre + ', fig. 17', note: "n°17: le joueur dédoublé met en jeu vers l'arrière gauche; le pivot part vers le lieu de la passe puis change de direction pour recevoir et pénétrer côté opposé." },
      ],
      ballon: 'DC',
      depart: { ...PIVOT_CENTRE, DC: [0.6, 9.4], Piv: [-0.7, 9.25] },
      variantes: [
        {
          nom: 'n°9 - Ailier droit en circulation, double écran',
          etapes: [
            {
              texte: "Le demi-centre, à côté du pivot, met en jeu vers l'ailier droit, qui arrive en circulation.",
              courses: { AiD: { vers: [3.0, 9.8], via: [6.8, 9.6] } },
              passe: ['DC', 'AiD', 0.55],
            },
            {
              texte: "L'ailier droit attaque les deux défenseurs centraux. L'arrière droit prend le poste d'ailier laissé libre. Le pivot et le demi-centre forment un double écran.",
              courses: { AiD: [1.6, 8.6], ArD: [8.8, 4.0], DC: [0.3, 7.5], Piv: [-1.3, 7.6] },
              def: { D3: [1.3, 6.7] },
            },
            {
              texte: "L'ailier passe à l'arrière gauche, du côté opposé.",
              courses: { ArG: [-2.4, 9.8] },
              passe: ['AiD', 'ArG', 0.45],
            },
            {
              texte: "L'arrière gauche tire derrière le double écran.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: "n°17 - Bloc de l'exécutant, le pivot change de direction",
          etapes: [
            {
              texte: "Le demi-centre met en jeu vers l'arrière gauche.",
              courses: { ArG: [-4.2, 9.8] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "Le demi-centre va bloquer le 3 gauche par l'extérieur; l'arrière gauche attaque grâce à ce bloc. Le pivot part vers le lieu de la passe initiale.",
              courses: { DC: [-2.5, 7.3], ArG: [-3.6, 8.3], Piv: [0.6, 8.7] },
              def: { G3: [-1.6, 6.8], G2: [-4.3, 6.5] },
            },
            {
              texte: "Le pivot change de direction et va recevoir du côté opposé, entre le 3 et le 2 droits. L'arrière gauche lui passe.",
              courses: { Piv: [2.8, 7.2] },
              passe: ['ArG', 'Piv', 0.6],
              def: { D3: [1.9, 6.7], D2: [4.1, 6.1] },
            },
            {
              texte: "Le pivot pénètre et tire.",
              tir: 'Piv',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-croises-ecran',
      nom: "Coups francs avec croisés derrière l'écran",
      alias: 'Golpe franco n°5, 6, 7, 10, 11 (González 2015, ES); "faux tireur / vrai tireur" (Antón 2014)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (coup franc)',
      resume: "Le pivot exécute côté gauche; un croisé entre arrières ou avec le demi-centre libère un tireur derrière l'écran.",
      description: [
        "Modèles de González où un croisé s'ajoute à l'écran. n°5: l'arrière gauche attire la défense, l'arrière droit reçoit en course vers son point fort et le demi-centre croise avec lui (tir, pénétration ou continuité vers l'ailier). n°6: croisé entre arrières derrière l'écran du demi-centre et du pivot. n°7: contre une défense avec un avancé, le demi-centre pose un bloc latéral sur l'avancé avant le croisé entre arrières. n°10: l'arrière gauche ne peut pas tirer; il passe à l'arrière opposé, puis croise derrière lui et retire de loin. n°11 (pénétration): le demi-centre bloque le 4e défenseur, le pivot circule pour bloquer l'autre central, l'arrière droit reçoit après le croisé.",
        "Antón García (2014) décrit le croisé \"faux tireur / vrai tireur\" pour libérer un tireur marqué de près: l'arrière non marqué vient recevoir de l'exécutant, mais c'est le tireur dangereux qui passe derrière lui et reçoit.",
        NOTE_GONZALEZ + " Ici, le coup franc est sifflé un peu à gauche du centre, avec le pivot (exécutant) et le demi-centre sur la ligne. Pour le n°7, le 3 droit joue le rôle de l'avancé et sort au moment de la mise en jeu.",
      ],
      objectif: "Enchaîner un croisé à l'écran pour que la défense ne sache pas qui va tirer.",
      pointsCles: [
        "Le croisé se fait derrière le porteur, près de l'écran.",
        "Le premier receveur doit menacer pour fixer.",
        'Contre un tireur marqué en anticipation, le croisé "faux tireur" lui donne le ballon en course.',
      ],
      fiabilite: 'partielle',
      sources: [
        { ...GONZALEZ, note: 'n°5: "Central cruza con este último y busca el lanzamiento, la penetración o la continuidad hacia el extremo"; n°6: "Recibe lateral derecho tras el cruce para aprovechar la pantalla del central y el pivote".' },
        { ...GONZALEZ, titre: GONZALEZ.titre + ', fig. 7, 10, 11', note: 'n°7: "Bloqueo lateral del jugador central sobre el avanzado y cruce lateral-lateral"; n°11: "El pivote circula para bloquear al otro defensor central".' },
        {
          titre: 'J. L. Antón García, Tactical and strategical alternatives against anticipation defense to dangerous distance shooters (EHF Web Periodical, 2014)',
          url: 'http://home.eurohandball.com/ehf_files/Publikation/WP_Anton%20J.L._Tactical%20and%20strategical.pdf',
          note: '"the back player who is not under pressure goes to receive the ball from the executer but finally he does not receive the ball"',
        },
      ],
      ballon: 'Piv',
      depart: {
        AiG: [-9.5, 4.4], AiD: [9.5, 4.4], Piv: [-1.9, 9.45], DC: [-3.2, 9.3], ArG: [-4.6, 11.0], ArD: [3.6, 10.4],
        G2: [-4.3, 5.6], G3: [-1.5, 6.4], D3: [1.4, 6.5], D2: [4.4, 5.6],
      },
      variantes: [
        {
          nom: 'n°5 - Arrière droit vers son point fort, croisé du centre',
          etapes: [
            {
              texte: "Le pivot sert l'arrière gauche, qui attire la défense.",
              courses: { ArG: [-4.2, 9.4] },
              passe: ['Piv', 'ArG', 0.1],
              def: { G2: [-4.4, 6.6] },
            },
            {
              texte: "L'arrière droit reçoit en course vers son point fort, vers le centre, prêt à tirer.",
              courses: { ArD: [1.4, 9.5] },
              passe: ['ArG', 'ArD', 0.55],
              def: { D3: [1.3, 7.0] },
            },
            {
              texte: "Le demi-centre croise avec lui en passant dans son dos et reçoit.",
              courses: { ArD: [0.6, 9.2], DC: { vers: [3.0, 9.6], via: [0.4, 11.4] } },
              passe: ['ArD', 'DC', 0.65],
            },
            {
              texte: "Le demi-centre attaque l'intervalle entre le 3 et le 2 droits et tire (ou continue vers l'ailier droit).",
              courses: { DC: [2.8, 8.0] },
              tir: { par: 'DC', t: 0.6 },
              def: { D2: [4.0, 6.4] },
            },
          ],
        },
        {
          nom: "n°6 - Croisé arrière - arrière derrière l'écran",
          etapes: [
            {
              texte: "Le pivot sert l'arrière gauche. Le pivot et le demi-centre forment l'écran devant le 3 et le 2 gauches.",
              courses: { ArG: [-4.0, 10.6], Piv: [-1.8, 7.5], DC: [-3.3, 7.6] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche part vers le centre; l'arrière droit croise dans son dos et reçoit.",
              courses: { ArG: [-1.4, 10.0], ArD: { vers: [-2.8, 10.9], via: [0.2, 11.8] } },
              passe: ['ArG', 'ArD', 0.65],
            },
            {
              texte: "L'arrière droit tire derrière l'écran du demi-centre et du pivot.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: "n°7 - Bloc latéral du centre sur l'avancé",
          etapes: [
            {
              texte: "Le pivot sert l'arrière gauche, qui vient vers le centre pour fixer l'avancé (ici le 3 droit, qui sort à la mise en jeu).",
              courses: { ArG: [-1.8, 10.6] },
              passe: ['Piv', 'ArG', 0.1],
              def: { D3: [-0.5, 8.7] },
            },
            {
              texte: "Le demi-centre pose un bloc latéral sur l'avancé. Le pivot descend faire écran devant le 3 gauche.",
              courses: { DC: [0.45, 9.1], Piv: [-1.5, 7.4] },
            },
            {
              texte: "Croisé entre arrières: l'arrière gauche continue vers la droite, l'arrière droit passe dans son dos et reçoit.",
              courses: { ArG: [1.2, 10.6], ArD: { vers: [-1.4, 10.8], via: [1.0, 11.9] } },
              passe: ['ArG', 'ArD', 0.6],
            },
            {
              texte: "L'arrière droit tire derrière l'écran du pivot.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: 'n°10 - Écran à deux, renversement et croisé par derrière',
          etapes: [
            {
              texte: "Le pivot sert l'arrière gauche, qui prépare le tir derrière l'écran du pivot et du demi-centre.",
              courses: { ArG: [-2.6, 10.8] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "Le 3 et le 2 gauches contournent l'écran et pressent. L'arrière gauche passe à l'arrière droit, qui vient vers le centre.",
              courses: { ArD: [0.2, 10.2] },
              passe: ['ArG', 'ArD', 0.45],
              def: { G3: [-1.0, 8.1], G2: [-4.4, 8.0] },
            },
            {
              texte: "L'arrière gauche croise derrière l'arrière droit et récupère le ballon.",
              courses: { ArD: [-0.6, 10.0], ArG: { vers: [1.9, 10.6], via: [-0.4, 11.8] } },
              passe: ['ArD', 'ArG', 0.65],
            },
            {
              texte: "L'arrière gauche tire de loin.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: 'n°11 - Pénétration entre deux blocs',
          etapes: [
            {
              texte: "Le pivot sert l'arrière gauche, qui vient vers le centre.",
              courses: { ArG: [-3.0, 10.4] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe au demi-centre, qui part vers le 3 droit (le 4e défenseur).",
              courses: { DC: [0.2, 8.7] },
              passe: ['ArG', 'DC', 0.5],
            },
            {
              texte: "Le demi-centre reste au bloc sur le 3 droit; le pivot circule pour bloquer l'autre central, le 3 gauche. L'arrière droit croise dans le dos du demi-centre et reçoit.",
              courses: { DC: [1.1, 7.5], Piv: [-1.1, 7.4], ArD: { vers: [0, 9.2], via: [1.8, 10.4] } },
              passe: ['DC', 'ArD', 0.6],
            },
            {
              texte: "L'arrière droit pénètre entre les deux blocs et tire.",
              courses: { ArD: [0, 8.0] },
              tir: { par: 'ArD', t: 0.6 },
            },
          ],
        },
        {
          nom: 'Antón - Faux tireur, vrai tireur',
          etapes: [
            {
              texte: "L'arrière gauche, le \"faux tireur\", vient recevoir du pivot, qui exécute. Le pivot feinte la passe.",
              courses: { ArG: [-1.8, 10.7] },
              def: { D2: [3.4, 8.6] },
            },
            {
              texte: "L'arrière droit, le vrai tireur, marqué de près, passe derrière lui (croisé) et reçoit du pivot.",
              courses: { ArD: { vers: [-3.4, 11.3], via: [-0.6, 12.2] } },
              passe: ['Piv', 'ArD', 0.7],
              def: { D2: [0.4, 9.0] },
            },
            {
              texte: "L'arrière droit tire derrière l'écran du pivot et du demi-centre.",
              tir: 'ArD',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-blocs-pivot',
      nom: 'Coups francs avec blocs du pivot',
      alias: 'Golpe franco n°4, 12, 13, 14, 15 (González 2015, ES); "changement de bloc du pivot" (forum Lo + Balonmano)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (coup franc)',
      resume: "Le pivot exécute puis bloque: bloc frontal, bloc latéral, bloc sur l'extérieur ou changement de bloc.",
      description: [
        "Modèles de González où le pivot, après la mise en jeu, devient bloqueur. n°4: permutation entre le demi-centre et l'arrière droit, qui tire grâce au bloc frontal du pivot. n°12: l'ailier gauche circule vers le côté opposé à la mise en jeu et passe grâce au bloc latéral du pivot sur le 3e défenseur; il reçoit du demi-centre après un croisé (sinon passe à l'ailier droit). n°13: le demi-centre, dans l'écran, croise devant le pivot qui bloque de face (pénétration ou passe à l'ailier gauche). n°14: le pivot bloque le défenseur extérieur; le tireur joue avec son ailier et reçoit à nouveau en trajectoire centrale, pendant que l'autre joueur de l'écran bloque son vis-à-vis. n°15: faux tir après un croisé, puis pénétration centrale du second joueur de l'écran grâce au bloc du pivot.",
        "Un entraîneur espagnol décrit sur un forum un \"changement de bloc\": le pivot met en jeu vers le centre et se place entre le 2 et le 3; le demi-centre croise avec l'arrière du côté du pivot; cet arrière feinte le tir et donne à l'autre arrière pendant que le pivot change de bloc pour bloquer le 2 entre le 1 et le 2; l'arrière entre, et si l'ailier défenseur aide, l'ailier est libre.",
        NOTE_GONZALEZ + " Pour le n°4, la phrase source peut se lire \"le demi-centre permute avec l'arrière droit\" (choix retenu) ou \"l'arrière gauche permute\". Pour le n°12, le 3e défenseur est compté depuis la gauche de l'attaque.",
      ],
      objectif: "Utiliser le pivot, exécutant du coup franc, comme bloqueur dans le jeu qui suit.",
      pointsCles: [
        "Le pivot exécute vite et va aussitôt poser son bloc.",
        "Le bloc frontal se pose face au défenseur, le bloc latéral à côté, du côté où il voudrait aller.",
        "Lire l'aide de l'ailier défenseur: s'il rentre, l'ailier attaquant est libre.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...GONZALEZ, note: 'n°4: "El lateral derecho en desplazamiento recibe del lateral izquierdo y aprovecha el bloqueo frontal del pivote para lanzar"; n°12: "El pivote realiza un bloqueo lateral al tercer defensor en beneficio del extremo".' },
        { ...GONZALEZ, titre: GONZALEZ.titre + ', fig. 13 à 15', note: 'n°13: "pasarle el balón al jugador central situado en la pantalla, que se cruza por delante del pivote que realiza el bloqueo frontal".' },
        {
          titre: 'Forum Lo + Balonmano, "La Pizarra" (rincondemontemar, 2007, fil 5440533)',
          url: 'https://balonmano.mforos.com/142972-la-pizarra/',
          note: 'Coup franc avec changement de bloc du pivot (bloc du 2 entre le 1 et le 2); si l\'extérieur défend, passe à l\'ailier "très ouvert".',
        },
      ],
      ballon: 'Piv',
      depart: { ...PIVOT_CENTRE },
      variantes: [
        {
          nom: 'n°4 - Permutation et bloc frontal du pivot',
          etapes: [
            {
              texte: "Le pivot exécute le coup franc et sert le demi-centre.",
              courses: { DC: [-0.8, 10.2] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche, puis permute avec l'arrière droit: le demi-centre part à droite, l'arrière droit vient au centre en mouvement. Le pivot va poser un bloc frontal sur le 3 gauche.",
              courses: {
                Piv: [-1.3, 7.5],
                ArG: [-4.2, 9.8],
                DC: { vers: [4.4, 10.6], via: [1.6, 11.8] },
                ArD: { vers: [0.4, 9.9], via: [2.6, 9.4] },
              },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière droit, en mouvement, reçoit de l'arrière gauche, face au bloc du pivot.",
              courses: { ArD: [-0.4, 9.5] },
              passe: ['ArG', 'ArD', 0.55],
            },
            {
              texte: "L'arrière droit tire grâce au bloc du pivot.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: 'n°12 - Ailier gauche en circulation, bloc latéral du pivot',
          etapes: [
            {
              texte: "Le pivot sert l'arrière droit, qui va vers le centre. Au même moment, l'ailier gauche commence à circuler vers le côté opposé, devant la défense.",
              courses: { ArD: [2.4, 9.8], AiG: { vers: [-3.4, 7.9], via: [-7.0, 7.4] } },
              passe: ['Piv', 'ArD', 0.1],
            },
            {
              texte: "Le pivot pose un bloc latéral sur le 3 gauche, à sa droite. L'ailier passe au ras du bloc. Croisé arrière - centre: l'arrière droit vient vers la gauche, le demi-centre passe dans son dos et reçoit.",
              courses: {
                Piv: [-0.6, 7.1],
                AiG: [0.9, 7.6],
                ArD: [0.6, 9.8],
                DC: { vers: [2.2, 10.4], via: [0.6, 11.2] },
              },
              passe: ['ArD', 'DC', 0.6],
              def: { G3: [-1.4, 6.6], D3: [1.8, 6.7] },
            },
            {
              texte: "Le demi-centre sert l'ailier gauche, libéré du 3 gauche par le bloc (sinon, il donne à l'ailier droit).",
              passe: ['DC', 'AiG', 0.2],
            },
            {
              texte: "L'ailier gauche tire.",
              tir: 'AiG',
            },
          ],
        },
        {
          nom: 'n°13 - Le centre croise devant le bloc frontal',
          etapes: [
            {
              texte: "Le pivot exécute vers l'arrière gauche, qui vient vers le centre, puis va poser un bloc frontal sur le 3 gauche. Le demi-centre recule pour recevoir.",
              courses: { ArG: [-2.4, 10.2], Piv: [-1.3, 7.5], DC: [0.3, 10.0] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe au demi-centre.",
              courses: { ArG: [-2.2, 10.0] },
              passe: ['ArG', 'DC', 0.4],
            },
            {
              texte: "Le demi-centre croise devant le pivot, au ras du bloc, et pénètre entre le 2 et le 3 gauches (ou sert l'ailier gauche si le 2 ferme).",
              courses: { DC: [-2.6, 7.6] },
              def: { G2: [-3.9, 6.4] },
            },
            {
              texte: "Le demi-centre tire.",
              tir: 'DC',
            },
          ],
        },
        {
          nom: "n°14 - Bloc sur l'extérieur, jeu tireur - ailier",
          etapes: [
            {
              texte: "Le pivot sert le tireur, l'arrière gauche, puis part bloquer le défenseur extérieur.",
              courses: { ArG: [-4.2, 10.0], Piv: [-3.4, 7.8] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe à son ailier, qui fixe en largeur. Le pivot bloque le 1 gauche par l'intérieur.",
              courses: { AiG: [-8.9, 5.4], Piv: [-6.9, 3.7] },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-7.6, 3.0] },
            },
            {
              texte: "L'ailier rend à l'arrière gauche, qui revient en trajectoire centrale. Le demi-centre, l'autre joueur de l'écran, bloque de face le 3 gauche.",
              courses: { ArG: [-3.0, 8.4], DC: [-1.6, 7.5] },
              passe: ['AiG', 'ArG', 0.4],
              def: { G2: [-4.0, 6.5] },
            },
            {
              texte: "L'arrière gauche tire entre le 2 et le 3 (sinon, il rejoue avec l'ailier ou enchaîne des pénétrations vers le côté opposé).",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: 'n°15 - Faux tir après croisé, pénétration du centre',
          etapes: [
            {
              texte: "Le pivot met en jeu vers l'arrière gauche, puis bloque son défenseur central, le 3 droit.",
              courses: { ArG: [-3.2, 10.2], Piv: [1.4, 7.4] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche croise avec l'arrière droit sans lui donner le ballon: il feinte le tir. Le 3 gauche sort sur lui.",
              courses: { ArG: [-0.6, 10.2], ArD: { vers: [-2.4, 11.0], via: [0.4, 11.8] } },
              def: { G3: [-1.4, 8.1] },
            },
            {
              texte: "L'arrière gauche trouve le demi-centre, l'autre joueur de l'écran, qui pénètre au centre grâce au bloc du pivot.",
              courses: { DC: [0, 7.3] },
              passe: ['ArG', 'DC', 0.5],
            },
            {
              texte: "Le demi-centre tire.",
              tir: 'DC',
            },
          ],
        },
        {
          nom: 'Forum - Changement de bloc du pivot',
          etapes: [
            {
              texte: "Le pivot met en jeu vers le centre, au demi-centre, puis se place entre le 3 et le 2 droits.",
              courses: { DC: [-0.6, 10.2], Piv: [3.0, 6.9] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre croise avec l'arrière du côté du pivot: il part à droite, l'arrière droit passe dans son dos et reçoit.",
              courses: { DC: [2.6, 9.6], ArD: { vers: [0.6, 10.4], via: [3.0, 11.6] } },
              passe: ['DC', 'ArD', 0.6],
            },
            {
              texte: "L'arrière droit feinte le tir et donne au demi-centre, devenu arrière de ce côté. Le pivot change de bloc: il bloque le 2 droit, entre le 1 et le 2.",
              courses: { ArD: [0.4, 9.7], DC: [4.2, 9.4], Piv: [5.2, 5.5] },
              passe: ['ArD', 'DC', 0.5],
              def: { D2: [4.4, 6.0] },
            },
            {
              texte: "Le demi-centre entre. Le 1 droit rentre pour l'aider.",
              courses: { DC: [3.9, 7.5] },
              def: { D1: [6.5, 4.4], D3: [2.4, 6.8] },
            },
            {
              texte: "Le demi-centre donne à l'ailier droit, très ouvert.",
              courses: { AiD: [9.0, 2.4] },
              passe: ['DC', 'AiD', 0.4],
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-ecran-mobile',
      nom: 'Coups francs avec écran à trois et démarquage',
      alias: 'Golpe franco n°19 et 20 (González 2015, ES)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (coup franc)',
      resume: "Écran à trois au centre: le pivot fait reculer la défense, ou un joueur de l'écran se démarque dans l'espace créé par l'arrière.",
      description: [
        "Modèles de González avec trois joueurs dans l'écran (pivot, demi-centre, arrière droit). n°19: après la mise en jeu vers l'arrière gauche, le pivot fait un déplacement profond pour faire reculer la défense; l'arrière gauche passe à l'arrière opposé, qui feinte le tir et lui redonne: l'arrière gauche croise derrière lui pour pénétrer ou jouer avec l'ailier. n°20: l'arrière gauche va vers l'écran puis change de direction vers son point faible; l'arrière droit, placé dans l'écran, se démarque dans l'espace créé (choix: passe au démarqué, tir ou jeu avec l'ailier).",
        "Les autres modèles \"mobiles\" de la série sont rangés selon leur départ: n°16 dans \"Coups francs avec écran central\", n°17 dans \"Coups francs exécutés par le demi-centre\", n°18 et n°21 dans \"Coups francs avec l'ailier droit dans l'écran\".",
        NOTE_GONZALEZ,
      ],
      objectif: "Faire bouger l'écran pour créer un espace imprévu.",
      pointsCles: [
        'Le déplacement profond du pivot "aplanit" la défense: les défenseurs reculent.',
        "Le changement de direction de l'arrière doit entraîner les défenseurs.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...GONZALEZ, note: "n°19 et n°20: pivot qui \"aplanit\" la défense puis croisé de retour; arrière qui feinte vers l'écran et part sur son point faible pendant que l'arrière droit se démarque." },
      ],
      ballon: 'Piv',
      depart: { ...PIVOT_CENTRE, ArD: [1.9, 9.25], ArG: [-4.6, 10.4] },
      variantes: [
        {
          nom: 'n°19 - Le pivot fait reculer la défense, croisé de retour',
          etapes: [
            {
              texte: "Le pivot met en jeu vers l'arrière gauche, puis fait un déplacement profond vers les 6 m pour faire reculer les défenseurs centraux.",
              courses: { ArG: [-4.0, 10.0], Piv: [0, 6.9] },
              passe: ['Piv', 'ArG', 0.1],
              def: { G3: [-1.3, 6.3], D3: [1.4, 6.3] },
            },
            {
              texte: "L'arrière gauche passe à l'arrière droit, qui sort de l'écran pour recevoir et feinte le tir.",
              courses: { ArD: [1.8, 10.2] },
              passe: ['ArG', 'ArD', 0.4],
            },
            {
              texte: "L'arrière droit redonne à l'arrière gauche, qui croise derrière lui.",
              courses: { ArD: [1.0, 10.0], ArG: { vers: [2.8, 10.4], via: [0.0, 11.8] } },
              passe: ['ArD', 'ArG', 0.65],
            },
            {
              texte: "L'arrière gauche pénètre entre le 3 et le 2 droits (ou joue avec l'ailier droit) et tire.",
              courses: { ArG: [3.0, 7.9] },
              tir: { par: 'ArG', t: 0.6 },
              def: { D2: [4.0, 6.6], D3: [1.9, 6.6] },
            },
          ],
        },
        {
          nom: "n°20 - Fausse direction de l'arrière, démarquage dans l'écran",
          etapes: [
            {
              texte: "Le pivot met en jeu vers l'arrière gauche, qui part vers l'écran.",
              courses: { ArG: [-2.6, 10.4] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche change de direction vers son point faible, l'extérieur. Les défenseurs le suivent; l'arrière droit, placé dans l'écran, se démarque dans l'espace créé au centre.",
              courses: { ArG: [-4.4, 9.6], ArD: [-0.2, 8.0] },
              passe: ['ArG', 'ArD', 0.75],
              def: { G3: [-2.2, 7.0], G2: [-4.4, 6.5] },
            },
            {
              texte: "L'arrière droit tire (autres choix: tir de l'arrière gauche ou jeu avec l'ailier).",
              tir: 'ArD',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-ecran-ailier',
      nom: "Coups francs avec l'ailier droit dans l'écran",
      alias: 'Golpe franco n°18 et 21 (González 2015, ES), passe "colgada"',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (coup franc)',
      resume: "Écran à trois avec l'ailier droit: fausse course et attaque de l'espace du bloc, ou bloc du centre et passe en profondeur ou lobée à l'arrière gauche.",
      description: [
        "Deux modèles de González où l'écran compte trois joueurs, dont l'ailier droit. n°18: le pivot sert un joueur de l'écran, qui fixe les centraux; jeu avec l'arrière gauche, qui croise avec l'autre arrière; le troisième joueur de l'écran fait une fausse course vers l'extérieur, change de direction, reçoit de l'arrière opposé et attaque l'espace créé par le bloc latéral du pivot.",
        "n°21 (coup franc côté droit): le pivot sert le demi-centre, dans l'écran, qui fixe un central, passe à l'arrière droit, puis va bloquer le défenseur de l'autre arrière; le pivot et l'ailier droit font écran; l'arrière droit choisit une passe en profondeur vers l'arrière gauche ou une \"colgada\", passe lobée reçue en l'air au-dessus de la zone.",
        NOTE_GONZALEZ + " Le troisième joueur de l'écran du n°18 n'est pas nommé: ici, l'ailier droit, comme dans le n°21.",
      ],
      objectif: "Faire sortir de l'écran un joueur que la défense ne surveille pas.",
      pointsCles: [
        "La fausse course de l'ailier doit emmener son défenseur.",
        'La "colgada" se joue quand la défense ferme la passe en profondeur.',
      ],
      fiabilite: 'partielle',
      sources: [
        { ...GONZALEZ, note: 'n°21: "lateral derecho decide el pase hacia el otro lateral en profundidad o mediante una colgada".' },
        { ...GONZALEZ, titre: GONZALEZ.titre + ', fig. 18', note: "n°18: trajectoire fausse vers l'extérieur du 3e joueur de l'écran, qui reçoit de l'arrière opposé et attaque l'espace du bloc latéral du pivot." },
      ],
      ballon: 'Piv',
      depart: {
        AiG: [-9.5, 4.4], Piv: [1.6, 9.45], DC: [0.3, 9.25], AiD: [2.9, 9.25], ArD: [4.8, 10.6], ArG: [-3.6, 10.4],
        G2: [-4.4, 5.6], G3: [-1.5, 6.5], D3: [1.4, 6.4], D2: [4.4, 5.8], D1: [7.1, 3.0],
      },
      variantes: [
        {
          nom: "n°18 - Fausse course de l'ailier, bloc latéral du pivot",
          etapes: [
            {
              texte: "Le pivot met en jeu vers le demi-centre, dans l'écran, qui avance et fixe les deux centraux.",
              courses: { DC: [0.1, 7.7] },
              passe: ['Piv', 'DC', 0.1],
              def: { G3: [-0.9, 6.7], D3: [1.0, 6.7] },
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-2.4, 9.9] },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche part vers la droite et croise avec l'arrière droit, qui passe dans son dos et reçoit. L'ailier droit fait une fausse course vers l'extérieur; le pivot pose un bloc latéral à droite du 3 droit.",
              courses: {
                ArG: [0.2, 10.2],
                ArD: { vers: [-1.4, 10.8], via: [1.8, 11.9] },
                AiD: [4.6, 8.6],
                Piv: [2.0, 7.2],
              },
              passe: ['ArG', 'ArD', 0.6],
            },
            {
              texte: "L'ailier droit change de direction, reçoit de l'arrière droit et attaque l'espace ouvert à côté du bloc.",
              courses: { AiD: [3.3, 7.6] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D2: [4.3, 6.5] },
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: 'n°21 - Bloc du centre, passe en profondeur',
          etapes: [
            {
              texte: "Le pivot met en jeu vers le demi-centre, dans l'écran, qui fixe le 3 droit.",
              courses: { DC: [0.6, 8.0] },
              passe: ['Piv', 'DC', 0.1],
              def: { D3: [1.1, 6.8] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis va bloquer le défenseur de l'autre arrière, le 2 gauche. Le pivot et l'ailier droit font écran.",
              courses: { ArD: [3.6, 9.9], DC: [-3.3, 7.4], Piv: [1.6, 8.3], AiD: [2.9, 8.4] },
              passe: ['DC', 'ArD', 0.15],
              def: { G2: [-4.0, 6.7] },
            },
            {
              texte: "L'arrière droit envoie une passe en profondeur à l'arrière gauche, qui attaque l'espace libéré à côté du bloc.",
              courses: { ArG: [-2.2, 7.7] },
              passe: ['ArD', 'ArG', 0.6],
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: 'n°21 - Bloc du centre, passe "colgada"',
          etapes: [
            {
              texte: "Le pivot met en jeu vers le demi-centre, dans l'écran, qui fixe le 3 droit.",
              courses: { DC: [0.6, 8.0] },
              passe: ['Piv', 'DC', 0.1],
              def: { D3: [1.1, 6.8] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis va bloquer le défenseur de l'autre arrière, le 2 gauche. Le pivot et l'ailier droit font écran.",
              courses: { ArD: [3.6, 9.9], DC: [-3.3, 7.4], Piv: [1.6, 8.3], AiD: [2.9, 8.4] },
              passe: ['DC', 'ArD', 0.15],
              def: { G2: [-4.0, 6.7] },
            },
            {
              texte: "La passe en profondeur est fermée: l'arrière gauche saute au-dessus de la zone et l'arrière droit lui lobe le ballon (\"colgada\").",
              courses: { ArG: [-2.2, 5.4] },
              passe: ['ArD', 'ArG', 0.2],
              def: { G3: [-1.2, 6.9] },
              enLAir: ['ArG'],
            },
            {
              texte: "L'arrière gauche tire en l'air, avant de retomber dans la zone.",
              tir: { par: 'ArG', t: 0 },
              enLAir: ['ArG'],
            },
          ],
        },
      ],
    },

    /* ================================================================ */
    /* COUPS FRANCS PARTICULIERS, REMISES EN JEU, ASTUCES               */
    /* ================================================================ */
    {
      id: 'coup-franc-jeu-passif',
      nom: 'Coup franc sous alerte de jeu passif',
      alias: '"Pantalla" (PANT, sélection espagnole); jugada "camiseta" (ES)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Barrière à 3 m (alerte de jeu passif)',
      resume: "Quand l'arbitre lève le bras pour le jeu passif, un coup franc doit déboucher vite sur un tir: écran du pivot, passe aérienne vers l'ailier opposé ou tireur lancé.",
      description: [
        "Sous alerte de jeu passif, il reste peu de passes: le coup franc devient une action préparée. L'équipe d'Espagne (Euro 2012 et 2014) jouait la \"Pantalla\": le pivot met en jeu, passe à un joueur de première ligne et se place devant les défenseurs pour l'écran du tir de loin (situation observée en infériorité numérique).",
        "La jugada \"camiseta\", attribuée à la sélection espagnole sur un forum d'entraîneurs, existe en deux versions contradictoires: le demi-centre fixe à gauche et lance un \"fly\" (passe aérienne reçue en l'air) à l'ailier droit, dans l'espace laissé par la défense qui a basculé côté ballon; ou le demi-centre passe au pivot qui sort recevoir, et c'est le pivot qui feinte vers l'arrière et lance le fly.",
        "Version attribuée à l'Allemagne sur le même forum: un tireur arrive avec une bonne course pendant qu'un partenaire passe derrière lui. Le forum ne dit pas qui exécute le coup franc: ici, le pivot.",
      ],
      objectif: "Obtenir un tir rapide et préparé avant le coup de sifflet pour jeu passif.",
      pointsCles: [
        "Peu de passes: l'action doit être connue de tous avant la mise en jeu.",
        'Le "fly" se lance quand la défense a basculé côté ballon.',
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Sierra-Guzmán et al., Análisis de las situaciones tácticas ofensivas de la selección española... en desigualdad numérica (e-balonmano.com, 2015)',
          url: 'https://www.redalyc.org/pdf/865/86538703003.pdf',
          note: '"Pantalla" (PANT): sur coup franc avec alerte de jeu passif, le pivot met en jeu, passe à un joueur de 1re ligne et se place devant les défenseurs.',
        },
        {
          titre: 'Forum Lo + Balonmano, "Jugadas ensayadas en pasivo" (2008)',
          url: 'https://balonmano.mforos.com/142972/6477188-jugadas-ensayadas-en-pasivo/',
          note: "\"jugada camiseta\" (fly vers l'ailier opposé); \"Alemania tiene una bastante simple que es poner un lanzador que entre con buena carrera, mientras un compañero pasa por detrás\".",
        },
      ],
      ballon: 'Piv',
      depart: { ...PIVOT_CENTRE },
      variantes: [
        {
          nom: 'Pantalla - écran du pivot pour le tir de loin',
          etapes: [
            {
              texte: "Le pivot met en jeu et passe à l'arrière gauche.",
              courses: { ArG: [-3.2, 10.2] },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "Le pivot se place devant les défenseurs, entre le 2 et le 3 gauches, pour faire écran.",
              courses: { Piv: [-2.4, 7.5], ArG: [-2.8, 9.8] },
            },
            {
              texte: "L'arrière gauche tire de loin derrière l'écran.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: 'Camiseta (a) - "fly" du demi-centre vers l\'ailier droit',
          etapes: [
            {
              texte: "Le pivot met en jeu vers le demi-centre.",
              courses: { DC: [-0.8, 10.2] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre fixe à gauche. La défense bascule côté ballon et laisse un grand espace à droite.",
              courses: { DC: [-2.6, 8.8] },
              def: { G3: [-2.3, 7.1], G2: [-4.1, 6.4], D3: [0, 6.6], D2: [3.0, 6.0], D1: [6.2, 4.4] },
            },
            {
              texte: "Le demi-centre lance un \"fly\": une passe aérienne vers l'ailier droit, qui saute au-dessus de la zone.",
              courses: { AiD: [5.6, 3.0] },
              passe: ['DC', 'AiD', 0.2],
              enLAir: ['AiD'],
            },
            {
              texte: "L'ailier droit tire en l'air, avant de retomber dans la zone.",
              tir: { par: 'AiD', t: 0 },
              enLAir: ['AiD'],
            },
          ],
        },
        {
          nom: 'Camiseta (b) - le pivot sort et lance le "fly"',
          etapes: [
            {
              texte: "Le pivot met en jeu vers le demi-centre, puis rentre aux 6 m.",
              courses: { DC: [-0.8, 10.2], Piv: [0.6, 7.0] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le pivot sort recevoir vers la gauche; le demi-centre lui passe. La défense bascule vers le ballon.",
              courses: { Piv: [-1.6, 8.6] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [-1.7, 7.4], G2: [-4.1, 6.4], D3: [0, 6.7], D2: [3.0, 6.0], D1: [6.2, 4.4] },
            },
            {
              texte: "Le pivot feinte la passe à l'arrière gauche, puis lance le \"fly\" vers l'ailier droit, qui saute au-dessus de la zone.",
              courses: { AiD: [5.6, 3.0] },
              passe: ['Piv', 'AiD', 0.35],
              enLAir: ['AiD'],
            },
            {
              texte: "L'ailier droit tire en l'air.",
              tir: { par: 'AiD', t: 0 },
              enLAir: ['AiD'],
            },
          ],
        },
        {
          nom: 'Forum (Allemagne) - tireur lancé, partenaire qui passe derrière',
          etapes: [
            {
              texte: "Le pivot met en jeu vers l'arrière gauche, qui arrive avec une bonne course vers le centre. L'arrière droit passe derrière lui.",
              courses: { ArG: [-1.6, 9.9], ArD: { vers: [-3.4, 11.0], via: [0.6, 11.9] } },
              passe: ['Piv', 'ArG', 0.15],
            },
            {
              texte: "L'arrière gauche tire (ou donne à l'arrière droit, qui est passé dans son dos).",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'freiwurf-bloc-a-trois',
      nom: "Coup franc depuis le bloc à trois, passe à l'ailier droit",
      alias: 'Freiwurf-2 (handballhaus.de, DE), Dreierblock',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Le tir de l'arrière est une feinte: le ballon va directement à l'ailier droit, qui perce entre le 1 et le 2.",
      description: [
        "Depuis un mur de trois attaquants (\"Dreierblock\"), l'équipe feinte un tir de l'arrière. Le ballon va directement à l'ailier droit, qui accélère et utilise la brève brèche entre le 1 et le 2 droits.",
        "La fiche allemande ne donne que ce texte (le détail est dans une animation non consultée). Composition du mur et exécutant choisis ici: ailier gauche, pivot et demi-centre, qui exécute.",
      ],
      objectif: "Attaquer l'aile pendant que la défense se resserre contre le tir.",
      pointsCles: [
        "La feinte de tir de l'arrière doit attirer le 2 droit vers l'intérieur.",
        "L'ailier accélère au moment de la passe, pas avant.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Freiwurf-2 (handballhaus.de, rubrique Freiwurf, archive web)',
          url: 'http://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/freiwurf/freiwurf-2.html',
          note: "Depuis le bloc à trois, on feinte un tir de l'arrière mais le ballon va directement à l'ailier droit, qui utilise la brève brèche entre 1 et 2.",
        },
      ],
      ballon: 'DC',
      depart: {
        AiG: [-1.3, 9.2], Piv: [0, 9.2], DC: [1.3, 9.5], ArG: [0, 11.4], ArD: [5.5, 9.6], AiD: [9.5, 4.4],
        G2: [-3.9, 6.0], G3: [-1.3, 6.4], D3: [1.3, 6.4], D2: [4.6, 5.4],
      },
      etapes: [
        {
          texte: "L'arrière gauche prend son élan derrière le mur et feinte le tir. Les défenseurs se resserrent. Le demi-centre envoie le ballon directement à l'ailier droit, qui accélère.",
          courses: { ArG: [0, 10.5], AiD: [8.6, 5.4] },
          passe: ['DC', 'AiD', 0.5],
          def: { G3: [-0.8, 6.9], D3: [0.7, 7.0], D2: [3.6, 6.2] },
        },
        {
          texte: "L'ailier droit perce dans la brèche entre le 1 et le 2 droits.",
          courses: { AiD: [6.0, 6.1] },
          def: { D1: [7.2, 3.6] },
        },
        {
          texte: "L'ailier droit tire.",
          tir: 'AiD',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jet-de-coin',
      nom: 'Jet de coin 1 et 2',
      alias: 'Hjørnekast 1/2 (DA), Corner 1/2 (EN)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense haute sur jet de coin (1); placée (2)',
      resume: "Remise en jeu de l'ailier au coin: le demi-centre ou l'arrière gauche coupe dans l'espace central libéré, ou une passe à rebond renvoie le ballon à l'ailier.",
      description: [
        "Jet de coin 1: sur une remise en jeu au coin, la défense monte haut sur les joueurs de champ pour intercepter et laisse un grand espace au centre. Le demi-centre s'y engage, reçoit de l'ailier et tire. Variante: l'arrière gauche entre après un bloc du demi-centre sur la défense centrale et reçoit de l'ailier droit, \"encore mieux\" s'il s'engage d'abord dans l'intervalle 1-2 pour attirer la défense.",
        "Jet de coin 2: l'ailier passe à son arrière, qui attaque aussitôt l'intervalle 1-2 en insistant sur le 2. Si le 1 suit l'arrière pour aider, l'arrière fait une passe arrière à rebond à l'ailier, qui saute juste derrière le 1 et tire. La source décrit ce jet de coin à gauche; il est montré ici à droite, comme le jet de coin 1, pour garder un seul placement de départ.",
      ],
      objectif: "Punir une défense qui sort intercepter, ou l'aide du défenseur extérieur.",
      pointsCles: [
        "Lire la défense avant la remise en jeu: haute ou placée.",
        "La passe arrière vers l'ailier se fait à rebond.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Jet de coin 1 (Dragør HK, f1279)',
          url: 'http://www.dragoerhb.dk/fransk/f1279.html',
          note: "\"Ceci peut être exploité simplement par le DC en s'engageant dans l'espace laissé libre, de recevoir la balle de l'ailier et d'aller au tir.\"",
        },
        {
          titre: 'Jet de coin 2 (Dragør HK, f1135)',
          url: 'http://www.dragoerhb.dk/fransk/f1135.html',
          note: '"Si 1D suit ARG pour aider 2D, ARG effectue une passe arrière vers ALG (à rebond)"',
        },
      ],
      ballon: 'AiD',
      depart: { AiD: [9.7, 0.3], D1: [7.1, 2.8] },
      variantes: [
        {
          nom: "1 - Le demi-centre dans l'espace libre",
          etapes: [
            {
              texte: "L'ailier droit va remettre en jeu au coin. La défense monte haut sur chaque joueur pour intercepter et laisse un grand espace au centre.",
              def: { G2: [-5.3, 8.6], G3: [-0.5, 9.6], D3: [0.8, 7.0], D2: [5.0, 8.6], G1: [-8.0, 2.6] },
            },
            {
              texte: "Le demi-centre démarre dans l'espace libre, au centre, et reçoit de l'ailier droit.",
              courses: { DC: [-1.8, 7.4] },
              passe: ['AiD', 'DC', 0.5],
              def: { G3: [-1.0, 8.6] },
            },
            {
              texte: "Le demi-centre tire.",
              tir: 'DC',
            },
          ],
        },
        {
          nom: "1 variante - Entrée de l'arrière gauche après le bloc du centre",
          etapes: [
            {
              texte: "La défense monte haut sur chaque joueur pour intercepter la remise en jeu de l'ailier droit.",
              def: { G2: [-5.3, 8.6], G3: [-0.5, 9.6], D3: [0.8, 7.0], D2: [5.0, 8.6], G1: [-8.0, 2.6] },
            },
            {
              texte: "L'arrière gauche s'engage d'abord dans l'intervalle 1-2 gauche pour attirer la défense. Le demi-centre bloque le défenseur central qui le marque.",
              courses: { ArG: [-6.0, 7.6], DC: [-0.9, 8.7] },
              def: { G2: [-5.4, 6.8] },
            },
            {
              texte: "L'arrière gauche coupe vers le centre, dans le dos du bloc, et reçoit la passe de l'ailier droit.",
              courses: { ArG: [-2.4, 7.4] },
              passe: ['AiD', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: "2 - Passe arrière à rebond vers l'ailier",
          etapes: [
            {
              texte: "Défense placée. L'ailier droit remet en jeu vers l'arrière droit.",
              courses: { ArD: [5.2, 9.0] },
              passe: ['AiD', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit attaque aussitôt l'intervalle entre le 1 et le 2 droits, en insistant sur le 2. Le 1 droit le suit pour aider. L'ailier attend au coin.",
              courses: { ArD: [5.6, 7.4], AiD: [9.3, 1.4] },
              def: { D2: [4.9, 6.2], D1: [6.6, 5.2] },
            },
            {
              texte: "L'arrière droit fait une passe arrière à rebond à l'ailier droit.",
              passe: ['ArD', 'AiD', 0.2],
            },
            {
              texte: "L'ailier droit saute juste derrière le 1 et tire.",
              courses: { AiD: [7.9, 2.6] },
              tir: { par: 'AiD', t: 0.6 },
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'joueur-cache-ligne-de-touche',
      nom: "S'engager en venant de la ligne de touche",
      alias: 'Indløb fra sidelinien (DA), joueur "caché" près du banc',
      categorie: 'Jets francs et remises en jeu',
      defense: "Toutes (aussi en fin d'exclusion)",
      resume: "Un joueur reste près du banc; la défense est attirée de l'autre côté, puis une passe longue le trouve lancé dans un grand espace.",
      description: [
        "Astuce de Dragør HK. L'entraîneur appelle un joueur près du banc pour lui \"donner des instructions\". Les autres attaquants pressent pour décaler la défense vers le côté opposé; le demi-centre se décale aussi. L'ailier droit reste disponible sans recevoir; quand la défense est bien décalée, il reçoit et redonne à l'arrière le plus proche: c'est le signal.",
        "Le demi-centre bloque le défenseur le plus proche de la ligne de touche, et l'arrière fait une passe longue au joueur qui arrive de la ligne de touche, qui doit avoir beaucoup d'espace pour tirer. Même idée en fin d'exclusion: le joueur exclu entre dans l'espace dès que son temps est écoulé.",
        "La zone de changement est près de la ligne médiane, hors de l'image: le joueur est montré en haut à gauche. La source ne dit pas qui est appelé; ici, l'arrière gauche. La régularité de l'astuce (joueur de champ qui s'écarte du jeu) reste à l'appréciation des arbitres.",
      ],
      objectif: "Faire oublier un joueur à la défense, puis le servir lancé dans un espace vide.",
      pointsCles: [
        "Les autres attaquants doivent vraiment décaler la défense vers le côté opposé.",
        "Le retour du ballon de l'ailier vers l'arrière sert de signal.",
        "La passe longue part au moment où le joueur démarre.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "S'engager en venant de la ligne de touche (Dragør HK, f66)",
          url: 'http://www.dragoerhb.dk/fransk/f66.html',
          note: "\"L'arrière fait une passe longue au joueur venant de la ligne de touche, qui devrait avoir un espace conséquent pour aller tirer.\"",
        },
      ],
      ballon: 'DC',
      depart: { ArG: [-9.7, 12.3] },
      variantes: [
        {
          nom: "1 - Joueur appelé par l'entraîneur",
          etapes: [
            {
              texte: "L'entraîneur a appelé l'arrière gauche près du banc, le long de la ligne de touche. Les autres attaquants pressent vers la droite pour décaler la défense; le demi-centre se décale aussi et donne à l'arrière droit.",
              courses: { DC: [2.4, 9.6], ArD: [5.0, 9.0], Piv: [0.9, 6.9] },
              passe: ['DC', 'ArD', 0.5],
              def: { G1: [-7.0, 2.8], G2: [-3.6, 6.0], G3: [-0.6, 6.6], D3: [2.4, 6.8], D2: [5.0, 6.0], D1: [7.4, 2.2] },
            },
            {
              texte: "L'ailier droit reste disponible; quand la défense est bien décalée, il reçoit.",
              courses: { AiD: [8.8, 2.4] },
              passe: ['ArD', 'AiD', 0.2],
            },
            {
              texte: "L'ailier redonne à l'arrière droit: c'est le signal. Le demi-centre revient bloquer le 2 gauche, le défenseur le plus proche de la ligne de touche. L'arrière gauche démarre.",
              courses: { DC: [-3.0, 7.1], ArG: [-7.2, 10.8] },
              passe: ['AiD', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit fait une passe longue à l'arrière gauche, qui arrive lancé dans un grand espace.",
              courses: { ArG: [-4.9, 8.2] },
              passe: ['ArD', 'ArG', 0.4],
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: "2 - Fin d'exclusion",
          etapes: [
            {
              texte: "L'arrière gauche termine son exclusion de 2 minutes près de la zone de changement. À cinq, les autres attaquants pressent vers la droite pour décaler la défense; le demi-centre donne à l'arrière droit.",
              courses: { DC: [2.4, 9.6], ArD: [5.0, 9.0], Piv: [0.9, 6.9] },
              passe: ['DC', 'ArD', 0.5],
              def: { G1: [-7.0, 2.8], G2: [-3.6, 6.0], G3: [-0.6, 6.6], D3: [2.4, 6.8], D2: [5.0, 6.0], D1: [7.4, 2.2] },
            },
            {
              texte: "L'ailier droit reste disponible et reçoit quand la défense est bien décalée.",
              courses: { AiD: [8.8, 2.4] },
              passe: ['ArD', 'AiD', 0.2],
            },
            {
              texte: "Le temps d'exclusion est écoulé: l'arrière gauche entre en jeu, lancé. L'ailier redonne à l'arrière droit; le demi-centre bloque le 2 gauche.",
              courses: { DC: [-3.0, 7.1], ArG: [-7.2, 10.8] },
              passe: ['AiD', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit fait une passe longue à l'arrière gauche, qui arrive dans l'espace vide.",
              courses: { ArG: [-4.9, 8.2] },
              passe: ['ArD', 'ArG', 0.4],
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'fausse-passe-vers-le-banc',
      nom: 'Fausse passe perdue vers le banc',
      alias: 'Wöhler, "Scheiße", "Irrer Ivan", "Post", Sprudel (DE); Leurre avec le remplacement / Snyd med udskiftning (DA)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Toutes (une fois par match)',
      resume: "Une passe semble perdue vers le banc; un joueur caché près de la touche récupère le ballon et sert un partenaire libre.",
      description: [
        "Astuce, plus qu'une combinaison: elle \"ne marche qu'une fois par match\". Un joueur se tient discrètement près du banc; un partenaire envoie le ballon \"par erreur\" vers le banc. La défense se rue vers le ballon ou part en contre-attaque; le joueur près du banc récupère et sert un partenaire libre.",
        "Version du forum allemand (attribuée à Vladimir Maximov par un modérateur de handball-world): la défense se jette sur le ballon et se désorganise. Version de Dragør HK: les adversaires partent en contre, et le joueur appelé par l'entraîneur lance un coéquipier resté en attaque. Le joueur près du banc est ici l'arrière gauche; le receveur final est un choix du schéma.",
      ],
      objectif: "Désorganiser la défense par une perte de balle simulée.",
      pointsCles: [
        "Le joueur près du banc reste sur le terrain pour pouvoir jouer le ballon.",
        'La passe "ratée" doit être crédible.',
        "À garder pour un moment clé: la défense ne s'y laisse prendre qu'une fois.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Forum handballecke.de, "Sammlung von Spielzügen" (posts #21 à #96)',
          url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
          note: "\"'Irrer Ivan'! Der 'Spielzug' entsprang tatsächlich dem Hirn von Maximov\"; \"klappt nur einmal im Spiel\".",
        },
        {
          titre: 'Leurre avec le remplacement (Dragør HK, f1280)',
          url: 'http://www.dragoerhb.dk/fransk/f1280.html',
          note: 'Fausse mauvaise passe vers la zone de changement; un joueur récupère et lance un coéquipier resté en attaque pendant que les adversaires partent en contre.',
        },
      ],
      ballon: 'DC',
      depart: { ArG: [-9.6, 12.2] },
      variantes: [
        {
          nom: '1 - La défense se rue sur le ballon (forum allemand)',
          etapes: [
            {
              texte: "L'arrière gauche se tient discrètement près du banc, le long de la touche. Le demi-centre envoie le ballon \"par erreur\" vers le banc.",
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "Les défenseurs proches se ruent vers le ballon. L'arrière gauche le récupère et sert le pivot, laissé seul au centre.",
              courses: { Piv: [0.4, 6.9] },
              passe: ['ArG', 'Piv', 0.35],
              def: { G1: [-7.6, 5.0], G2: [-6.4, 8.6], G3: [-3.4, 8.8] },
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: '2 - Les adversaires partent en contre (Dragør)',
          etapes: [
            {
              texte: "Le demi-centre fait une fausse mauvaise passe vers la zone de changement, où l'arrière gauche a été appelé par l'entraîneur.",
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "Croyant le ballon perdu, les défenseurs partent en contre-attaque, vers l'autre but. L'arrière gauche récupère le ballon.",
              def: {
                G1: [-6.6, 8.8], G2: [-4.0, 11.6], G3: [-1.2, 12.0], D3: [1.8, 12.0], D2: [4.6, 11.4], D1: [7.4, 8.4],
              },
            },
            {
              texte: "L'arrière gauche lance l'ailier droit, resté près du but.",
              courses: { AiD: [6.4, 4.8] },
              passe: ['ArG', 'AiD', 0.3],
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
      ],
    },

    /* ================================================================ */
    /* SUPÉRIORITÉ NUMÉRIQUE (6 CONTRE 5)                               */
    /* ================================================================ */
    {
      id: 'jeu-autour-pivot-superiorite',
      nom: 'Jeu autour du pivot en supériorité contre 0-6 (Tactique de match 04)',
      alias: "L'attaque en supériorité numérique d'une défense 0-6",
      categorie: 'Supériorité numérique',
      defense: '0-6 à 5 défenseurs (6 contre 5)',
      resume: "Le demi-centre change d'intervalle pendant que le pivot bloque l'intérieur des centraux: 2 contre 1 à l'extérieur, ou passe au pivot.",
      description: [
        "Attaque à 6 contre 5. Le pivot est entre les deux défenseurs centraux, au point de penalty. L'ailier gauche fixe par l'extérieur pour attirer le 1; l'arrière gauche et le demi-centre jouent en miroir vers l'extérieur.",
        "Quand le demi-centre fixe le central face à lui, le pivot bloque le côté intérieur du 2e central. Le demi-centre change d'intervalle pour fixer ce 2e central, pendant que le pivot se décale pour bloquer l'intérieur de l'autre central: 2 contre 1 à l'extérieur. Trois fins: l'arrière droit, placé face à l'intervalle entre les deux derniers défenseurs, se lance et tire; si le dernier défenseur ferme, il décale l'ailier; si le défenseur devant le demi-centre se décale, passe au pivot.",
        "Le défenseur exclu est ici le 1 droit (non affiché): à droite, le 2 droit est le dernier défenseur.",
      ],
      objectif: "Créer un 2 contre 1 à l'extérieur grâce au changement d'intervalle du demi-centre.",
      pointsCles: [
        "Un demi-centre rapide, qui attaque en profondeur.",
        "Ne pas aller trop latéral: garder la menace vers le but.",
        "Le pivot se décale en même temps que le demi-centre change d'intervalle.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Tactique de match 04: l'attaque en supériorité numérique d'une défense 0-6 (entrainement-handball.fr)",
          url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-04-lattaque-en-superiorite-numerique-dune-defense-0-6/',
          note: "Le DC change d'intervalle pendant que le PV se décale pour bloquer l'intérieur de l'autre central vers 2 contre 1 à l'extérieur.",
        },
      ],
      ballon: 'AiG',
      absents: ['D1'],
      depart: { Piv: [0, 7.0], ArD: [3.4, 9.8], G2: [-4.4, 5.6], G3: [-1.4, 6.5], D3: [1.4, 6.5], D2: [5.3, 5.0] },
      variantes: (() => {
        const base = [
          {
            texte: "L'ailier gauche fixe par l'extérieur et attire le 1 gauche, puis donne à l'arrière gauche.",
            courses: { AiG: [-8.0, 3.6] },
            passe: ['AiG', 'ArG', 0.6],
            def: { G1: [-7.2, 2.9] },
          },
          {
            texte: "L'arrière gauche joue vers l'extérieur, sur le 2 gauche, et donne au demi-centre, qui fixe le 3 gauche.",
            courses: { ArG: [-5.6, 8.4], DC: [-1.6, 8.4] },
            passe: ['ArG', 'DC', 0.5],
            def: { G2: [-4.8, 6.4], G3: [-1.5, 7.2] },
          },
          {
            texte: "Le pivot bloque le côté intérieur du 2e central, le 3 droit.",
            courses: { Piv: { vers: [0.5, 7.1], ecran: true } },
            def: { D3: [1.4, 6.5] },
          },
          {
            texte: "Le demi-centre change d'intervalle et fixe le 3 droit; le pivot se décale pour bloquer l'intérieur du 3 gauche. À droite, 2 contre 1: l'arrière droit et l'ailier droit contre le 2 droit.",
            courses: { DC: [1.6, 8.2], Piv: { vers: [-0.5, 7.1], ecran: true } },
            def: { G3: [-1.4, 6.8], D3: [1.6, 7.2] },
          },
        ];
        return [
          {
            nom: "1 - Tir de l'arrière droit",
            etapes: [
              ...base,
              {
                texte: "L'arrière droit, face à l'intervalle entre les deux derniers défenseurs, se lance et reçoit du demi-centre.",
                courses: { ArD: [3.4, 8.2] },
                passe: ['DC', 'ArD', 0.35],
              },
              { texte: "L'arrière droit tire.", tir: 'ArD' },
            ],
          },
          {
            nom: "2 - Décalage de l'ailier",
            etapes: [
              ...base,
              {
                texte: "Le dernier défenseur, le 2 droit, ferme sur l'arrière droit, qui reçoit du demi-centre.",
                courses: { ArD: [3.6, 8.2] },
                passe: ['DC', 'ArD', 0.3],
                def: { D2: [4.2, 6.6] },
              },
              {
                texte: "L'arrière droit décale l'ailier droit.",
                courses: { AiD: [8.6, 2.0] },
                passe: ['ArD', 'AiD', 0.3],
              },
              { texte: "L'ailier droit tire.", tir: 'AiD' },
            ],
          },
          {
            nom: '3 - Passe au pivot',
            etapes: [
              ...base,
              {
                texte: "Le défenseur devant le demi-centre, le 3 droit, se décale vers l'arrière droit: le demi-centre sert le pivot, qui roule vers le but.",
                courses: { Piv: [0.6, 6.7] },
                passe: ['DC', 'Piv', 0.3],
                def: { D3: [2.6, 7.0] },
              },
              { texte: "Le pivot tire.", tir: 'Piv' },
            ],
          },
        ];
      })(),
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'superiorite-espagne',
      nom: "Supériorité numérique de l'équipe d'Espagne (Euro 2012-2014)",
      alias: 'DDB LAT, PIV 1-2, PIV 2-3, APERT, BLOQ DC, 6x4 (codes de la sélection espagnole); Kreis links (DE)',
      categorie: 'Supériorité numérique',
      defense: '5 défenseurs (6 contre 5)',
      resume: "Les situations codées de la sélection espagnole à 6 contre 5: dédoublement de l'arrière, pivot entre 1-2 ou 2-3, ouverture, bloc sur le central.",
      description: [
        "Sierra-Guzmán et al. ont classé les attaques en supériorité de l'Espagne aux Euros 2012 et 2014 (classification validée par un membre du staff de 2014). Les défenseurs sont numérotés 1 (extérieur), 2 (latéral), 3 (central). Le défenseur exclu n'est pas affiché: la défense à cinq est ici 1-2-3-2-1 avec un seul central.",
        "DDB LAT: l'arrière gauche passe au demi-centre et se dédouble (descend au pivot) entre le 1 et le 2 de sa zone; le demi-centre s'ouvre à gauche et attaque entre le 2 et le 3. PIV 1-2: pivot entre le 1 et le 2; l'arrière attaque entre le 2 et le 3 puis choisit (proche de la combinaison allemande \"Kreis links\": l'arrière fixe le 2 et sert le pivot libre). PIV 2-3: pivot entre le 2 et le 3 d'un côté, le demi-centre attaque entre le 2 et le 3 de l'autre. APERT (ouverture): pivot entre le 1 et le 2; les partenaires arrivent du côté opposé avec des trajectoires vers l'extérieur jusqu'à ce qu'un joueur soit en position de tir confortable. BLOQ DC: le pivot bloque le central d'un côté et le demi-centre attaque de ce côté: 3 contre 2.",
        "6x4 (double supériorité, 2014): pivot entre les deux centraux, qui suit leur bascule; le demi-centre attaque sur le pivot et les deux centraux et cherche un ailier; l'arrière droit attaque entre le 1 et le 2 droits. Cette situation n'est pas dessinée (il faudrait deux défenseurs absents). Pour chaque situation, le schéma montre une des fins citées; la première passe de chaque variante sert seulement à la mise en place.",
      ],
      objectif: "Exploiter le joueur en plus par une organisation codée simple à lancer.",
      pointsCles: [
        "Le placement du pivot (entre 1 et 2, ou entre 2 et 3) donne le côté de l'action.",
        "Attaquer les intervalles en profondeur pour obliger deux défenseurs à se décider.",
        "En surnombre, s'écarter vers l'extérieur déplace la défense (handballhaus: \"raumverlagernd nach Außen stoßen\").",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Sierra-Guzmán et al., Análisis de las situaciones tácticas ofensivas de la selección española... en desigualdad numérica (e-balonmano.com 11(1), 2015)',
          url: 'https://www.redalyc.org/pdf/865/86538703003.pdf',
          note: 'BLOQ DC: "A partir del lado por el que bloquee el pivote, el central atacará hacia esa dirección consiguiendo un 3x2"; DDB LAT, PIV 1-2, PIV 2-3, APERT, 6x4 (p. 64-66).',
        },
        {
          titre: 'Kreis links (handballhaus.de, rubrique Überzahlspiel, archive web)',
          url: 'https://web.archive.org/web/20101225232630/http://www.handballhaus.de/handball/angriffstaktik/ueberzahlspiel/kreis-links.html',
          note: "Pivot à gauche entre 1 et 2; après la passe de l'ailier gauche, l'arrière gauche fixe le 2 et sert le pivot libre.",
        },
      ],
      ballon: 'DC',
      absents: ['D3'],
      depart: { Piv: [2.0, 6.9], G1: [-7.3, 2.7], G2: [-4.0, 5.9], G3: [0, 6.6], D2: [4.0, 5.9], D1: [7.3, 2.7] },
      variantes: [
        {
          nom: "DDB LAT - Dédoublement de l'arrière gauche",
          etapes: [
            {
              texte: "Mise en place: le pivot est entre le 3 et le 2 droits. Le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-5.0, 9.2] },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche rend au demi-centre et se dédouble: il descend aux 6 m entre le 1 et le 2 gauches.",
              courses: { ArG: [-6.0, 5.4] },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre s'ouvre à gauche et attaque l'intervalle entre le 2 et le 3.",
              courses: { DC: [-2.0, 8.0] },
              def: { G3: [-0.8, 7.0], G2: [-3.6, 6.4] },
            },
            {
              texte: "Le demi-centre tire (ou continue vers l'arrière dédoublé, le pivot ou l'ailier).",
              tir: 'DC',
            },
          ],
        },
        {
          nom: 'PIV 1-2 - Pivot entre le 1 et le 2 (Kreis links)',
          etapes: [
            {
              texte: "Le pivot se place à gauche, entre le 1 et le 2. Le demi-centre donne à l'arrière gauche.",
              courses: { Piv: [-5.9, 4.7], ArG: [-5.0, 9.2] },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 2 et le 3 gauches. Le 2 gauche ferme vers l'intérieur.",
              courses: { ArG: [-2.8, 8.2] },
              def: { G2: [-3.0, 6.8], G3: [-0.6, 7.0] },
            },
            {
              texte: "L'arrière gauche sert le pivot, laissé libre entre le 1 et le 2.",
              courses: { Piv: [-5.4, 5.2] },
              passe: ['ArG', 'Piv', 0.3],
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: "PIV 2-3 - Pivot entre le 2 et le 3, attaque de l'autre côté",
          etapes: [
            {
              texte: "Le pivot se place entre le 2 et le 3 gauches.",
              courses: { Piv: [-2.0, 6.9] },
            },
            {
              texte: "Le demi-centre attaque l'intervalle entre le 3 et le 2 droits. Le central se décale sur lui.",
              courses: { DC: [1.8, 8.2] },
              def: { G3: [0.8, 7.0], D2: [3.2, 6.6] },
            },
            {
              texte: "Le demi-centre sert le pivot, libre dans le dos du central.",
              courses: { Piv: [-1.3, 6.8] },
              passe: ['DC', 'Piv', 0.3],
            },
            {
              texte: "Le pivot tire (autres choix: tir, arrière droit, ailiers).",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: "APERT - Ouverture vers l'extérieur",
          etapes: [
            {
              texte: "Le pivot se place à droite, entre le 1 et le 2. Le demi-centre donne à l'arrière gauche.",
              courses: { Piv: [6.0, 4.6], ArG: [-5.0, 9.2] },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche attaque vers l'extérieur et fixe le 2 gauche, puis donne au demi-centre.",
              courses: { ArG: [-5.4, 8.0], DC: [0.6, 9.4] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-4.6, 6.6] },
            },
            {
              texte: "Le demi-centre attaque à son tour vers l'extérieur droit et fixe le central, puis donne à l'arrière droit.",
              courses: { DC: [2.4, 8.4], ArD: [5.0, 9.0] },
              passe: ['DC', 'ArD', 0.6],
              def: { G3: [1.4, 7.0] },
            },
            {
              texte: "L'arrière droit attaque vers l'extérieur et fixe le 2 droit. Le 1 droit doit choisir entre le pivot et l'ailier: l'arrière droit sert l'ailier droit.",
              courses: { ArD: [5.2, 8.0], AiD: [8.8, 2.4] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [4.6, 6.6], D1: [6.9, 3.6] },
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: 'BLOQ DC - Bloc du pivot sur le central',
          etapes: [
            {
              texte: "Le pivot bloque le défenseur central sur son côté droit.",
              courses: { Piv: { vers: [0.9, 7.1], ecran: true } },
            },
            {
              texte: "Le demi-centre attaque du côté du bloc, entre le central et le 2 droit: 3 contre 2 à droite avec l'arrière droit et l'ailier droit.",
              courses: { DC: [2.4, 8.2] },
              def: { D2: [3.2, 6.8] },
            },
            {
              texte: "Le 2 droit sort sur lui: le demi-centre donne à l'arrière droit.",
              courses: { ArD: [4.8, 8.6] },
              passe: ['DC', 'ArD', 0.3],
              def: { D1: [6.6, 4.6] },
            },
            {
              texte: "L'arrière droit tire.",
              tir: 'ArD',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'finale-mondial-2025',
      nom: 'Finale du Mondial 2025 (Danemark - Croatie): supériorité à 6 contre 5',
      alias: 'WM-Finale 2025 (handballtraining.de)',
      categorie: 'Supériorité numérique',
      defense: '5 défenseurs (6 contre 5)',
      resume: "Deux actions en supériorité de la finale 2025: la Croatie trouve l'arrière droit par une passe parallèle, le Danemark sert son gaucher par une passe courte.",
      description: [
        "Actions relevées par handballtraining.de lors de la finale du championnat du monde 2025, Danemark - Croatie. Le défenseur exclu n'est pas affiché; la défense à cinq a un seul central.",
        "Croatie à 6 contre 5: le pivot occupe le 2 droit. L'arrière gauche percute modérément sur le 2 gauche et rend au demi-centre lancé; il reste aux 6 m pour fixer le 2 un instant. Le demi-centre accélère sur le central et fait la passe parallèle à l'arrière droit, qui perce entre le 2 et le 1 droits. Options: l'ailier droit si le 1 aide, retour au demi-centre si le 2 ferme, puis le pivot.",
        "Danemark à 6 contre 5: échange lent entre le demi-centre et l'arrière droit (le gaucher passe au centre); pivot côté opposé, sur le 2 gauche. Le gaucher attaque entre le central et le 2 droit, le central sort; il sert l'arrière gauche qui arrive en arc par le centre, le central aide sur lui; le gaucher, resté près de la défense, reçoit une passe courte et perce. L'action croate à 7 contre 6 fait l'objet d'une fiche à part.",
      ],
      objectif: "Libérer un arrière lancé dans l'intervalle que le surnombre a ouvert.",
      pointsCles: [
        "L'arrière qui a rendu le ballon reste près des 6 m pour fixer.",
        "Le gaucher danois ne recule pas après sa passe: il reste disponible pour la passe courte.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Handball-WM-Finale Dänemark gegen Kroatien: erfolgreiche Angriffsaktionen (handballtraining.de)',
          url: 'https://handballtraining.de/tempospiel/handball-wm-finale-daenemark-gegen-kroatien-erfolgreiche-angriffsaktionen/3763',
          note: "Croatie: RL reste à 6 m, RM accélère sur HM et fait la passe parallèle à RR, qui perce entre HL et AL; Danemark: RR reste dans la zone proche et reçoit une passe courte de RL.",
        },
      ],
      ballon: 'DC',
      absents: ['D3'],
      depart: { G1: [-7.3, 2.7], G2: [-4.0, 5.9], G3: [0, 6.6], D2: [4.0, 5.9], D1: [7.3, 2.7] },
      variantes: [
        {
          nom: "Croatie - passe parallèle à l'arrière droit",
          etapes: [
            {
              texte: "Le pivot occupe le 2 droit. Le demi-centre passe à l'arrière gauche.",
              courses: { Piv: [3.2, 7.0], ArG: [-4.8, 9.2] },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche percute modérément sur le 2 gauche et rend au demi-centre, lancé. Il reste près des 6 m pour fixer le 2 un instant.",
              courses: { ArG: [-4.2, 7.6], DC: [-0.6, 9.4] },
              passe: ['ArG', 'DC', 0.5],
              def: { G2: [-3.8, 6.4] },
            },
            {
              texte: "Le demi-centre accélère sur le défenseur central et fait la passe parallèle à l'arrière droit, lancé.",
              courses: { DC: [0.4, 8.0], ArD: [4.8, 9.2] },
              passe: ['DC', 'ArD', 0.55],
              def: { G3: [0.2, 7.0] },
            },
            {
              texte: "L'arrière droit perce entre le 2 droit, occupé par le pivot, et le 1 droit.",
              courses: { ArD: [5.4, 7.2] },
              def: { D1: [6.8, 4.4] },
            },
            {
              texte: "L'arrière droit tire (sinon: l'ailier droit si le 1 aide, ou retour au demi-centre).",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: 'Danemark - le gaucher au centre, passe courte',
          etapes: [
            {
              texte: "Échange lent entre le demi-centre et l'arrière droit, gaucher, qui vient au centre et reçoit. Le pivot se place côté opposé, sur le 2 gauche.",
              courses: {
                ArD: { vers: [0.4, 10.2], via: [2.6, 9.4] },
                DC: { vers: [5.0, 10.0], via: [2.6, 11.4] },
                Piv: [-3.0, 7.0],
              },
              passe: ['DC', 'ArD', 0.5],
            },
            {
              texte: "Le gaucher attaque entre le central et le 2 droit. Le central sort sur lui.",
              courses: { ArD: [1.6, 8.0] },
              def: { G3: [0.6, 7.2] },
            },
            {
              texte: "Il sert l'arrière gauche, qui arrive en arc par le centre; le central aide sur lui. Le gaucher reste près de la défense, sans reculer.",
              courses: { ArG: { vers: [-0.4, 9.0], via: [-2.6, 10.6] } },
              passe: ['ArD', 'ArG', 0.6],
              def: { G3: [-0.2, 7.8] },
            },
            {
              texte: "Passe courte de l'arrière gauche au gaucher, qui perce entre le central et le 2 droit.",
              courses: { ArD: [2.0, 7.1] },
              passe: ['ArG', 'ArD', 0.15],
              def: { D2: [3.2, 6.4] },
            },
            {
              texte: "L'arrière droit tire.",
              tir: 'ArD',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'finale-mondial-2025-7c6',
      nom: 'Finale du Mondial 2025: la Croatie à 7 contre 6, deux pivots qui sortent bloquer',
      alias: 'WM-Finale 2025, 7. Feldspieler (handballtraining.de)',
      categorie: 'Supériorité numérique',
      defense: '0-6 (7 contre 6)',
      resume: "Deux pivots placés à l'intérieur des 2 sortent tour à tour bloquer les centraux pour le demi-centre, qui finit par une passe parallèle à l'arrière droit.",
      description: [
        "Action de la Croatie à sept joueurs de champ (gardien remplacé) en finale du Mondial 2025 contre le Danemark. Deux pivots sont placés à l'intérieur des deux défenseurs 2.",
        "L'arrière droit donne au demi-centre, qui part en arc vers la gauche sur le 3 gauche, qui joue haut. Le pivot de ce côté sort et bloque ce 3; le demi-centre passe l'écran et sert l'arrière gauche; le pivot revient aux 6 m, suivi par le 3. L'arrière gauche percute, le demi-centre revient vers le centre et reçoit. Le 3 droit sort sur le demi-centre: l'autre pivot sort et le bloque. Le demi-centre utilise l'écran du côté de son bras armé, vers le 2 droit; le 2 sort, et la passe parallèle trouve l'arrière droit, qui perce entre le 2 et le 1.",
        "Variante citée: si le premier pivot reste haut, l'arrière gauche joue un 1 contre 1 contre le 2 gauche, puis une passe parallèle vers le demi-centre dans le dos du 3 crée un 4 contre 3 à droite. Le second pivot est ici le 7e joueur de champ (J7). Voir aussi la fiche \"Finale du Mondial 2025: supériorité à 6 contre 5\".",
      ],
      objectif: "Enchaîner deux blocs extérieurs des pivots pour finir en surnombre à droite.",
      pointsCles: [
        "Chaque pivot sort bloquer au moment où son central monte sur le demi-centre.",
        "Après son bloc, le pivot revient aux 6 m: son défenseur le suit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Handball-WM-Finale Dänemark gegen Kroatien: erfolgreiche Angriffsaktionen (handballtraining.de)',
          url: 'https://handballtraining.de/tempospiel/handball-wm-finale-daenemark-gegen-kroatien-erfolgreiche-angriffsaktionen/3763',
          note: "Croatie à 7: le pivot sort et bloque IR, RM passe l'écran et sert RL; IL sort sur RM vers le second pivot sort et bloque IL; passe parallèle à RR qui perce entre HL et AL.",
        },
      ],
      ballon: 'ArD',
      depart: { Piv: [-3.3, 6.9], J7: [3.3, 6.9] },
      etapes: [
        {
          texte: "Deux pivots sont à l'intérieur des 2. L'arrière droit passe au demi-centre, qui part en arc vers la gauche, sur le 3 gauche; le 3 monte sur lui.",
          courses: { DC: { vers: [-1.4, 9.8], via: [-0.2, 10.8] } },
          passe: ['ArD', 'DC', 0.1],
          def: { G3: [-1.8, 7.8] },
        },
        {
          texte: "Le pivot gauche sort et bloque le 3 gauche. Le demi-centre passe l'écran et sert l'arrière gauche.",
          courses: { Piv: { vers: [-2.0, 8.7], ecran: true }, DC: [-3.2, 9.9], ArG: [-5.0, 9.6] },
          passe: ['DC', 'ArG', 0.6],
        },
        {
          texte: "Le pivot revient aux 6 m, suivi par le 3 gauche. L'arrière gauche percute; le demi-centre revient vers le centre et reçoit.",
          courses: { Piv: [-2.8, 7.0], ArG: [-4.6, 8.0], DC: [0.2, 9.6] },
          passe: ['ArG', 'DC', 0.6],
          def: { G3: [-1.9, 6.8], G2: [-4.6, 6.4] },
        },
        {
          texte: "Le 3 droit sort sur le demi-centre: le second pivot sort et le bloque. Le demi-centre utilise l'écran côté bras armé, vers le 2 droit, qui sort sur lui.",
          courses: { J7: { vers: [1.4, 8.8], ecran: true }, DC: [2.4, 9.6] },
          def: { D3: [1.0, 8.0], D2: [4.0, 7.2] },
        },
        {
          texte: "Passe parallèle à l'arrière droit, qui perce entre le 2 et le 1 droits.",
          courses: { ArD: [5.6, 7.2] },
          passe: ['DC', 'ArD', 0.2],
          def: { D1: [7.0, 3.6] },
        },
        {
          texte: "L'arrière droit tire.",
          tir: 'ArD',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'superiorite-tcheque',
      nom: 'Supériorité: étirer la défense et rentrée du demi-centre (équipes tchèques)',
      alias: '"stažení obranné formace na jednu stranu", "zaběhnutí střední spojky" (CZ)',
      categorie: 'Supériorité numérique',
      defense: '5 défenseurs (6 contre 5)',
      resume: "Étirer la défense d'un côté par des attaques successives jusqu'à l'ailier opposé, ou faire rentrer le demi-centre entre le 2 et le 3.",
      description: [
        "Deux solutions observées dans le championnat tchèque 2019-2020 (mémoire de K. Kubišová). Le défenseur exclu n'est pas affiché.",
        "Étirer la défense (Nové Veselí, Most, Hodonín): le pivot est entre le 3 et le 2 du côté où l'action finit. L'ailier, après sa passe, étire le jeu jusqu'au coin; l'arrière attaque directement entre le 1 et le 2, sans glisser; le demi-centre attaque à nouveau vers le côté d'où vient le ballon; l'autre arrière saute entre le 1 et le 2 ou sert son ailier, qui conclut. Mauvais changements de prise de la défense: passe au pivot.",
        "Rentrée du demi-centre (Plzeň): le pivot est du côté de la passe, entre le 1 et le 2. Après sa passe à un arrière, le demi-centre rentre dans la défense entre le 2 et le 3; l'arrière qui reçoit fixe aussitôt et choisit: pivot, demi-centre rentré, autre arrière, ailier opposé ou tir. La première passe de chaque variante sert à la mise en place.",
      ],
      objectif: "Faire glisser la défense à cinq jusqu'à ce qu'un intervalle ou un ailier se libère.",
      pointsCles: [
        "Chaque attaquant attaque vraiment son intervalle, sans glisser latéralement.",
        "L'ailier qui a passé s'écarte jusqu'au coin pour étirer la défense.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál v mužské a ženské házené (Univ. Charles, Prague, 2020)',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: 'Supériorité: "stažení obranné formace na jednu stranu" (p. 35, 40, 45); "zaběhnutí střední spojky" à Plzeň (p. 32).',
        },
      ],
      ballon: 'ArG',
      absents: ['D3'],
      depart: { Piv: [2.0, 6.9], G1: [-7.3, 2.7], G2: [-4.0, 5.9], G3: [0, 6.6], D2: [4.0, 5.9], D1: [7.3, 2.7] },
      variantes: [
        {
          nom: "1 - Étirer la défense jusqu'à l'ailier opposé",
          etapes: [
            {
              texte: "Mise en place: l'arrière gauche donne à l'ailier gauche. Le pivot est entre le 3 et le 2 droits.",
              courses: { AiG: [-8.6, 2.6] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier rend à l'arrière gauche, puis étire le jeu jusqu'au coin.",
              courses: { AiG: [-9.7, 0.4] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G1: [-8.0, 1.6] },
            },
            {
              texte: "L'arrière gauche attaque directement entre le 1 et le 2 gauches, sans glisser, puis passe au demi-centre.",
              courses: { ArG: [-5.6, 7.6] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-4.6, 6.6] },
            },
            {
              texte: "Le demi-centre attaque à nouveau vers le côté d'où vient le ballon, puis passe à l'arrière droit.",
              courses: { DC: [-1.6, 8.4], ArD: [4.8, 9.0] },
              passe: ['DC', 'ArD', 0.6],
              def: { G3: [-1.0, 7.2] },
            },
            {
              texte: "L'arrière droit saute entre le 1 et le 2 droits. Le 1 droit sort sur lui: l'arrière droit sert son ailier.",
              courses: { ArD: [5.4, 7.6], AiD: [8.8, 2.0] },
              passe: ['ArD', 'AiD', 0.6],
              def: { D1: [6.4, 5.4] },
            },
            {
              texte: "L'ailier droit conclut.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: '2 - Rentrée du demi-centre (Plzeň)',
          etapes: [
            {
              texte: "Mise en place: l'arrière gauche donne au demi-centre. Le pivot se place à droite, entre le 1 et le 2, du côté de la passe suivante.",
              courses: { Piv: [6.0, 4.6] },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis rentre dans la défense entre le 3 et le 2 droits.",
              courses: { ArD: [5.0, 9.0], DC: [2.2, 7.0] },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit fixe aussitôt. Le 2 droit sort sur lui; le demi-centre rentré est libre.",
              courses: { ArD: [4.6, 7.9] },
              passe: ['ArD', 'DC', 0.6],
              def: { D2: [4.2, 6.7] },
            },
            {
              texte: "Le demi-centre tire (autres choix: pivot, autre arrière, ailier opposé, tir de l'arrière).",
              tir: 'DC',
            },
          ],
        },
      ],
    },

    /* ================================================================ */
    /* INFÉRIORITÉ NUMÉRIQUE (5 CONTRE 6)                               */
    /* ================================================================ */
    {
      id: 'sequences-espagnoles-inferiorite',
      nom: 'Infériorité: séquences espagnoles (Román 2008)',
      alias: 'Juego de ataque en desigualdad numérica (ES)',
      categorie: 'Infériorité numérique',
      defense: '6 défenseurs (5 contre 6)',
      resume: "À cinq sans un ailier: bloc du centre côté latéral, 2 contre 1 au centre ou sur le côté avec le pivot, invasion et rideau de l'arrière.",
      description: [
        "Juan de Dios Román Seco (ancien sélectionneur espagnol) propose des séquences pour attaquer à cinq contre six, en 3:2 sans un ailier et toujours avec au moins un pivot. Ici, l'ailier gauche est exclu (non affiché).",
        "1. Bloc du centre côté latéral: le demi-centre va bloquer dans une zone latérale et occupe un poste de pivot; on joue un 2 contre 2 d'un côté pour exploiter un 3 contre 2 de l'autre, où l'arrière multiplie ses options. 2. 2 contre 1 central: un arrière fixe vers l'extérieur, le pivot est entre les deux centraux; première option, la passe immédiate du demi-centre au pivot; sinon passe à l'arrière et pénétrations, ou croisé demi-centre - arrière et pivot.",
        "3. 2 contre 1 latéral: le demi-centre fixe du côté opposé à la passe suivante; l'arrière gauche reçoit vers le centre, attaque le 3 gauche et libère le pivot. 4. Invasion et rideau de l'arrière droit, coordonnés avec l'arrière gauche: tir ou pénétration de l'arrière gauche, puis demi-centre et pivot, ou passe à l'ailier droit; l'arrière droit peut ensuite rester pivot. Les graphiques de l'article n'ont pas été consultés: les placements sont interprétés.",
      ],
      objectif: "Créer un 2 contre 1 local malgré le joueur en moins.",
      pointsCles: [
        "Toujours garder au moins un pivot pour fixer la défense en profondeur.",
        "Fixer d'un côté pour jouer de l'autre.",
        "Peu de passes, mais des fixations réelles.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'J. D. Román Seco, Táctica colectiva grupal en ataque: los modelos en el balonmano español (e-balonmano.com 4(2), 2008), p. 48-50',
          url: 'https://www.fmbalonmano.com/uploads/noticias/eleccionprocedimientostacticos.pdf',
          note: '"Iniciación por el central, B, en bloqueo a una zona lateral y ocupación de espacios de pivote"; "Iniciando con invasión y cortina del lateral derecho, C, coordinando con el lateral contrario, A".',
        },
      ],
      ballon: 'DC',
      absents: ['AiG'],
      variantes: [
        {
          nom: '1 - Bloc du centre côté latéral',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche, puis va bloquer le 2 gauche: il occupe un poste de pivot. Le pivot se place à droite, entre le 3 et le 2.",
              courses: { DC: { vers: [-4.0, 6.8], ecran: true }, Piv: [3.0, 6.8] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-4.6, 5.8] },
            },
            {
              texte: "2 contre 2 à gauche: l'arrière gauche attaque à côté du bloc. Le 3 gauche et le 3 droit glissent pour aider.",
              courses: { ArG: [-3.0, 8.4] },
              def: { G3: [-2.2, 7.2], D3: [0.6, 6.8] },
            },
            {
              texte: "La défense s'est resserrée à gauche: le ballon part à l'arrière droit, qui a plusieurs options à 3 contre 2 avec le pivot et l'ailier droit.",
              courses: { ArD: [3.6, 8.4] },
              passe: ['ArG', 'ArD', 0.5],
              def: { D2: [4.4, 6.3] },
            },
            {
              texte: "L'arrière droit tire (ou sert le pivot ou l'ailier droit).",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: '2 - 2 contre 1 central',
          etapes: [
            {
              texte: "Le pivot est entre les deux centraux. Le demi-centre donne à l'arrière droit, qui fixe vers l'extérieur et attire le 2 droit.",
              courses: { ArD: [5.6, 8.2] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [5.2, 6.4] },
            },
            {
              texte: "L'arrière droit rend au demi-centre, qui attaque entre les deux 3; le 3 droit a glissé vers l'extérieur.",
              courses: { DC: [0.4, 8.2] },
              passe: ['ArD', 'DC', 0.2],
              def: { D3: [2.8, 6.6], G3: [-0.6, 7.1] },
            },
            {
              texte: "Le 3 gauche sort sur le demi-centre: passe immédiate au pivot.",
              courses: { Piv: [0.6, 6.5] },
              passe: ['DC', 'Piv', 0.25],
              def: { G3: [-0.4, 7.4] },
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: '3 - 2 contre 1 latéral arrière gauche - pivot',
          etapes: [
            {
              texte: "Le pivot se place entre le 2 et le 3 gauches. Le demi-centre fixe vers la droite, du côté opposé à la passe suivante.",
              courses: { Piv: [-3.3, 6.9], DC: [1.8, 8.4] },
              def: { D3: [1.6, 7.3] },
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche, qui reçoit en allant vers le centre et attaque le 3 gauche.",
              courses: { ArG: [-2.0, 8.6] },
              passe: ['DC', 'ArG', 0.2],
              def: { G3: [-1.9, 7.5] },
            },
            {
              texte: "Le 3 gauche sort sur lui: l'arrière gauche libère le pivot.",
              passe: ['ArG', 'Piv', 0.3],
              def: { G2: [-4.6, 5.6] },
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: "4 - Invasion et rideau de l'arrière droit",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche.",
              courses: { ArG: [-4.8, 9.6] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière droit envahit la défense: il court devant les défenseurs centraux, vers la gauche, et fait rideau.",
              courses: { ArD: { vers: [-1.6, 7.6], via: [2.0, 7.8] } },
              def: { G3: [-1.7, 6.6], D3: [1.4, 6.8] },
            },
            {
              texte: "L'arrière gauche, lancé, profite du rideau et attaque l'intervalle entre le 2 et le 3 gauches.",
              courses: { ArG: [-3.0, 8.0] },
              def: { G2: [-4.0, 6.4] },
            },
            {
              texte: "L'arrière gauche tire (ou pénètre, puis demi-centre et pivot, ou passe à l'ailier droit; l'arrière droit peut rester pivot).",
              tir: 'ArG',
            },
          ],
        },
      ],
    },
  );
})();
