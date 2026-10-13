/* Lot 9b: infériorité numérique (5 contre 6, 6 sans gardien), 7 contre 6, supériorité 6 contre 5 et jets francs (Approches du Handball). */
(() => {
  /* ---------------------------------------------------------------- */
  /* Sources communes                                                 */
  /* ---------------------------------------------------------------- */

  const ANTON_2010 = {
    titre: 'J. L. Antón García, "Uso del "portero falso" en inferioridad numérica atacante: ¿nueva aportación táctico-estratégica?", e-balonmano.com 6(1), 2010',
    url: 'https://dialnet.unirioja.es/descarga/articulo/3253764.pdf',
  };

  const SIERRA = {
    titre: 'R. Sierra-Guzmán et al., "Análisis de las situaciones tácticas ofensivas de la selección española masculina de balonmano en desigualdad numérica" (Euro 2012 et 2014), e-balonmano.com 11(1), 2015',
    url: 'https://www.redalyc.org/pdf/865/86538703003.pdf',
  };

  const KOVACS_154 = {
    titre: 'P. Kovacs, "Analyse de l\'Euro masculin 2016", Approches du Handball n°154 (juillet 2016)',
    url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=39',
  };

  const BEHM_114 = {
    titre: 'A. Behm, "Handball: mes coups de cœur", Approches du Handball n°114, p. 49',
    url: 'https://www.calameo.com/ffhandball/read/007275111122817ab0e6a?page=49',
  };

  // Défense à 5 en ligne (0-5): un seul central, le 3 (D3 exclu, G3 au centre).
  const DEF_05 = { G1: [-7.4, 1.9], G2: [-4.2, 5.7], G3: [0, 6.6], D2: [4.2, 5.7], D1: [7.4, 1.9] };

  const HANDBALLHAUS_UNTERZAHL = {
    titre: 'Unterzahlspiel (handballhaus.de, rubrique "Angriffstaktik", archive 2010)',
    url: 'https://web.archive.org/web/20100413101750/http://www.handballhaus.de/handball/angriffstaktik/unterzahlspiel.html',
  };

  /* ---------------------------------------------------------------- */
  /* Étapes partagées                                                 */
  /* ---------------------------------------------------------------- */

  // Antón 2010, fig. 4 à 9: bloc extérieur de l'ailier droit sur le 2 droit.
  const BLOC_EXT_AILIER = {
    texte: "L'ailier droit remonte et pose un bloc sur le 2 droit, par l'extérieur (côté touche).",
    courses: { AiD: { vers: [6.0, 5.9], via: [8.6, 4.6], ecran: true } },
    def: { D2: [5.0, 5.3], D1: [7.2, 3.0] },
  };

  // Sierra-Guzmán 2015, CRC L-EX (joué ici à gauche): croisé arrière / ailier puis dédoublement de l'arrière.
  const CRC_LEX_BASE = [
    {
      texte: "L'arrière gauche attaque en diagonale vers l'extérieur, entre le 2 et le 1 gauches. L'ailier gauche remonte.",
      courses: { ArG: [-6.4, 7.6], AiG: [-8.6, 4.0] },
      def: { G2: [-5.7, 6.0] },
    },
    {
      texte: "Croisé: l'ailier coupe vers l'intérieur et passe dans le dos de l'arrière, qui lui donne le ballon au croisement.",
      courses: { AiG: { vers: [-4.0, 8.6], via: [-7.6, 9.2] }, ArG: [-6.9, 7.0] },
      passe: ['ArG', 'AiG', 0.55],
      def: { G1: [-7.6, 3.0], G3: [-2.4, 7.2] },
    },
    {
      texte: "L'arrière gauche se dédouble: il entre dans la défense entre le 1 et le 2 gauches. L'ailier, ballon en main, poursuit une longue trajectoire vers le centre.",
      courses: { ArG: [-6.6, 4.4], AiG: [-2.6, 8.8] },
      def: { G3: [-2.2, 7.4] },
    },
  ];

  // Sierra-Guzmán 2015, CRC EXT: croisé des deux ailiers (attaque à 5 sans pivot).
  const CRC_EXT = [
    {
      texte: "L'ailier gauche part vers le centre, devant la défense. Le demi-centre lui donne le ballon.",
      courses: { AiG: { vers: [-2.8, 8.4], via: [-8.0, 7.6] } },
      passe: ['DC', 'AiG', 0.55],
      def: { G3: [-2.3, 7.3] },
    },
    {
      texte: "Le demi-centre échange sa place avec l'arrière gauche: il part au poste d'arrière gauche, l'arrière gauche vient au centre. L'ailier avance en dribble vers le centre.",
      courses: {
        DC: { vers: [-5.6, 10.2], via: [-3.0, 11.6] },
        ArG: { vers: [0.2, 10.2], via: [-2.6, 9.8] },
        AiG: [-1.2, 8.2],
      },
      def: { G3: [-1.8, 7.1] },
    },
    {
      texte: "Aussitôt, l'ailier droit fait la même course vers le centre, devant la défense. L'ailier gauche lui donne le ballon et les deux ailiers se croisent.",
      courses: { AiD: { vers: [-1.2, 8.8], via: [7.8, 7.6] }, AiG: [1.8, 7.6] },
      passe: ['AiG', 'AiD', 0.6],
      def: { D3: [1.7, 6.6] },
    },
    {
      texte: "L'ailier gauche se dédouble: il descend au poste de pivot, entre les deux 3. L'ailier droit donne à l'arrière gauche, venu au centre.",
      courses: { AiG: [-0.6, 6.3] },
      passe: ['AiD', 'ArG', 0.3],
      def: { G3: [-1.8, 6.8] },
    },
    {
      texte: "L'ailier droit se dédouble à son tour, entre le 3 et le 2 droits. L'ailier gauche regagne son poste en longeant les 6 m; l'ailier droit reste au pivot.",
      courses: {
        AiD: { vers: [3.2, 6.5], via: [1.8, 8.4] },
        AiG: { vers: [-8.4, 2.6], via: [-5.0, 6.0] },
      },
      def: { G2: [-3.9, 6.9] },
    },
    {
      texte: "Croisé entre l'arrière gauche, au centre, et l'arrière droit: l'arrière gauche attaque vers la droite, l'arrière droit passe dans son dos et reçoit le ballon.",
      courses: { ArG: [2.0, 8.8], ArD: { vers: [-0.4, 9.2], via: [2.8, 10.8] } },
      passe: ['ArG', 'ArD', 0.55],
      def: { D3: [1.9, 7.3], G2: [-4.4, 6.2] },
    },
    {
      texte: "L'arrière droit attaque la zone du pivot, entre les deux 3. Le 3 droit sort sur lui: 2 contre 2 avec l'ailier droit resté au pivot, qui reçoit dans le dos du 3.",
      courses: { ArD: [0.6, 8.2] },
      passe: ['ArD', 'AiD', 0.55],
      def: { D3: [1.3, 7.4], G3: [-0.8, 7.2] },
    },
    {
      texte: "L'ailier droit tire.",
      tir: 'AiD',
    },
  ];

  window.COMBINAISONS.push(
    /* ================================================================ */
    /* INFÉRIORITÉ NUMÉRIQUE (5 contre 6)                               */
    /* ================================================================ */
    {
      id: 'deux-contre-deux-exterieur',
      nom: 'Infériorité: jeu à 2 contre 2 sur les côtés (Antón 2010)',
      alias: 'Juego 2x2 en zonas exteriores (ES)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "À 5 contre 6, le défenseur en plus se tient près de l'axe: l'arrière et l'ailier d'un même côté jouent à 2 contre 2 contre le 2 et le 1.",
      description: [
        "Juan Luis Antón part d'un constat: \"si le défenseur en plus est près de l'axe, ne cherchons pas les solutions au centre, mais sur les côtés\". Selon López (2008), cité par Antón, la Pologne, le Danemark et la France jouaient ainsi. L'arrière et l'ailier d'un même côté jouent à 2 contre 2 contre le défenseur latéral (le 2) et le défenseur extérieur (le 1).",
        "Antón décrit six moyens (fig. 4 à 9 de l'article, non consultées): croisé ailier-arrière; fixation de l'ailier vers l'extérieur puis passe et va avec l'arrière; le même moyen lancé par l'arrière; disposition \"fausse\" (l'ailier joue arrière, l'arrière joue ailier); bloc intérieur du pivot pour l'arrière; bloc extérieur de l'ailier sur le 2, direct ou indirect.",
        "Les schémas suivent ces descriptions d'une phrase. Ils sont joués à droite, sans ailier gauche: l'équipe est à 5. Le placement exact et le sens de certaines courses (fausse sortie, côté du bloc) sont interprétés.",
      ],
      objectif: "Jouer loin du défenseur en plus, à 2 contre 2 sur un côté, là où le 1 défend mal les changements d'adversaire.",
      pointsCles: [
        "Croisé ailier-arrière: l'ailier entraîne son vis-à-vis vers le centre et libère l'espace extérieur. Le 1 n'a pas l'habitude de changer d'adversaire.",
        "Passe et va: celui qui passe agrandit l'espace en partant dans l'autre sens, puis redemande le ballon dans l'intervalle 1-2.",
        "Bloc extérieur de l'ailier: direct quand l'arrière a le ballon, indirect quand le ballon est encore au centre.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...ANTON_2010, note: 'p. 10: "cruces extremos-laterales en los que el extremo arrastra a su par hacia el centro dejando espacio de penetración por la zona exterior [...] bloqueos exteriores del extremo al defensor lateral y en beneficio del lateral atacante, tanto directos [...] como indirectos".' },
      ],
      absents: ['AiG'],
      ballon: 'ArD',
      variantes: [
        {
          nom: '1 - Croisé ailier-arrière',
          ballon: 'AiD',
          etapes: [
            {
              texte: "L'ailier droit, ballon en main, part vers le centre devant la défense. Son vis-à-vis, le 1 droit, le suit.",
              courses: { AiD: { vers: [6.2, 7.6], via: [8.6, 6.2] } },
              def: { D1: [6.4, 5.2], D2: [4.6, 5.6] },
            },
            {
              texte: "Croisé: l'ailier continue vers l'intérieur et l'arrière droit passe dans son dos, vers l'extérieur. L'ailier lui donne le ballon au croisement. Le 1 droit a suivi l'ailier vers le centre.",
              courses: { AiD: [3.8, 8.4], ArD: { vers: [7.4, 8.2], via: [6.4, 10.2] } },
              passe: ['AiD', 'ArD', 0.5],
              def: { D1: [5.6, 6.0], D2: [4.0, 5.9], D3: [2.4, 7.0] },
            },
            {
              texte: "L'arrière droit pénètre dans l'espace extérieur laissé libre. Le 1 droit change d'adversaire en retard. L'arrière tire.",
              courses: { ArD: [8.0, 5.8] },
              tir: { par: 'ArD', t: 0.7 },
              def: { D1: [7.0, 5.0] },
            },
          ],
        },
        {
          nom: "2 - Fixation de l'ailier et passe et va",
          ballon: 'AiD',
          depart: { AiD: [7.8, 4.4] },
          etapes: [
            {
              texte: "L'ailier droit, ballon en main, part vers la touche. Le 1 droit le suit vers l'extérieur.",
              courses: { AiD: [9.3, 5.0] },
              def: { D1: [8.4, 3.6] },
            },
            {
              texte: "L'ailier passe à l'arrière droit, qui part vers l'intérieur et attire le 2 droit: l'intervalle entre le 1 et le 2 s'agrandit.",
              courses: { ArD: [3.8, 8.6] },
              passe: ['AiD', 'ArD', 0.2],
              def: { D2: [3.8, 6.4], D3: [1.6, 6.8] },
            },
            {
              texte: "Passe et va: l'ailier change de direction et attaque l'intervalle entre le 1 et le 2. L'arrière lui rend le ballon.",
              courses: { AiD: [6.4, 6.6] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D1: [7.6, 4.6] },
            },
            {
              texte: "L'ailier pénètre et tire.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: "3 - Même moyen lancé par l'arrière",
          etapes: [
            {
              texte: "L'arrière droit, ballon en main, part vers l'intérieur et fixe le 2 droit. L'ailier droit remonte.",
              courses: { ArD: [4.0, 8.4], AiD: [8.8, 3.0] },
              def: { D2: [4.2, 6.2] },
            },
            {
              texte: "L'arrière passe à l'ailier, qui s'écarte vers la touche. Le 1 droit sort sur lui.",
              courses: { AiD: [9.3, 4.6] },
              passe: ['ArD', 'AiD', 0.2],
              def: { D1: [8.4, 3.4] },
            },
            {
              texte: "Passe et va: l'arrière repart vers l'extérieur, entre le 2 et le 1. L'ailier lui rend le ballon.",
              courses: { ArD: [6.4, 7.4] },
              passe: ['AiD', 'ArD', 0.5],
              def: { D2: [5.0, 5.8] },
            },
            {
              texte: "L'arrière droit pénètre et tire.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: "4 - Disposition fausse: ailier à l'arrière, arrière à l'aile",
          ballon: 'AiD',
          depart: { AiD: [5.5, 9.5], ArD: [9.0, 1.2] },
          etapes: [
            {
              texte: "L'ailier, placé au poste d'arrière, attaque vers l'extérieur, entre le 2 et le 1. Le vrai arrière, placé à l'aile, remonte et fait une fausse sortie vers la touche.",
              courses: { AiD: [6.6, 8.0], ArD: [9.3, 4.4] },
              def: { D2: [5.6, 6.0], D1: [8.2, 3.0] },
            },
            {
              texte: "Il change de direction, coupe vers l'intérieur et passe dans le dos du faux arrière, qui lui donne le ballon au croisement.",
              courses: { ArD: { vers: [4.6, 8.6], via: [8.4, 9.4] }, AiD: [7.4, 7.0] },
              passe: ['AiD', 'ArD', 0.55],
              def: { D3: [2.4, 7.0], D1: [7.8, 4.2] },
            },
            {
              texte: "Le vrai arrière, le tireur, attaque l'intervalle entre le 2 et le 3 droits et tire. S'il est fermé, le faux arrière, resté à l'extérieur, joue la supériorité à l'aile.",
              courses: { ArD: [3.4, 7.8] },
              tir: { par: 'ArD', t: 0.7 },
              def: { D2: [4.4, 6.2], D3: [2.5, 7.1] },
            },
          ],
        },
        {
          nom: '5 - Bloc intérieur du pivot',
          etapes: [
            {
              texte: "Le pivot se place contre le 2 droit, sur son côté intérieur.",
              courses: { Piv: { vers: [4.2, 6.3], ecran: true } },
              def: { D2: [5.0, 5.4] },
            },
            {
              texte: "Fausse sortie: l'arrière droit part d'abord vers l'intérieur, comme pour utiliser le bloc. Le 3 droit sort sur lui.",
              courses: { ArD: [3.4, 8.8] },
              def: { D3: [2.4, 7.6], D2: [4.9, 5.6] },
            },
            {
              texte: "Changement de direction: l'arrière repart vers l'extérieur, entre le 2 et le 1. Le 1 droit doit choisir entre lui et l'ailier.",
              courses: { ArD: { vers: [6.4, 7.6], via: [5.0, 9.2] } },
              def: { D1: [7.0, 5.6] },
            },
            {
              texte: "Le 1 sort sur l'arrière: celui-ci donne à l'ailier droit, seul à l'aile.",
              courses: { AiD: [9.0, 2.0] },
              passe: ['ArD', 'AiD', 0.3],
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: "6 - Bloc extérieur de l'ailier (direct)",
          etapes: [
            BLOC_EXT_AILIER,
            {
              texte: "L'arrière droit, ballon en main, attaque vers l'extérieur en frôlant le bloc. Le 2 droit reste coincé; le 1 droit sort sur lui en retard.",
              courses: { ArD: { vers: [7.0, 7.4], via: [6.4, 9.2] } },
              def: { D1: [7.6, 5.2] },
            },
            {
              texte: "L'arrière droit tire.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: "7 - Bloc extérieur de l'ailier (indirect)",
          ballon: 'DC',
          etapes: [
            { ...BLOC_EXT_AILIER, texte: "Le ballon est encore au demi-centre. L'ailier droit remonte et pose un bloc sur le 2 droit, par l'extérieur (côté touche)." },
            {
              texte: "L'arrière droit s'élance vers l'extérieur en frôlant le bloc. Le demi-centre lui donne le ballon dans sa course. Le 1 droit sort en retard.",
              courses: { ArD: { vers: [7.0, 7.4], via: [6.4, 9.2] } },
              passe: ['DC', 'ArD', 0.4],
              def: { D1: [7.6, 5.2] },
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
      id: 'inferiorite-ecoles',
      nom: "Infériorité: solutions d'écoles nationales",
      alias: 'Disposición "falsa" 3:2 sin extremos, circulación "en ocho", circulaciones falsas de los extremos (ES)',
      categorie: 'Infériorité numérique',
      defense: '6 défenseurs (variante 1: 3-2-1 ou 5-1)',
      resume: "Trois réponses historiques à 5 contre 6: deux pivots sans ailiers, circulation \"en huit\" des ailiers, fausses circulations avec retour à l'aile.",
      description: [
        "Antón (2010) retrace l'histoire des solutions pour attaquer à 5 contre 6. Trois d'entre elles sont des dispositifs complets, sans pivot de métier. Les deux ailiers y jouent un rôle particulier.",
        "1. Disposition \"fausse\" 3:2 sans ailiers: les arrières se placent très ouverts, entre le poste d'arrière et celui d'ailier; les ailiers jouent pivots, chacun entre l'arrière et le centre, entre les lignes. Elle vise les défenses profondes (5-1 avec sorties, 3-2-1). Le moyen central est le passe et va entre la première ligne et les pivots.",
        "2. Circulation complexe \"en huit\" à cinq joueurs, d'origine roumaine, formalisée par l'équipe de France de Daniel Costantini au Mondial 1995, puis reprise par l'Allemagne. Un ailier circule devant la défense et croise l'autre ailier, qui circule dans la défense, le long des 6 m. En même temps, les joueurs de première ligne échangent leurs postes par des croisés ou des rideaux. Sans solution, on recommence de l'autre côté. Antón note qu'elle perd son efficacité si les trajectoires sont trop parallèles ou trop préparées à l'avance.",
        "3. Fausses circulations des ailiers \"avec allers et retours\", Allemagne championne du monde 2007. L'ailier commence la circulation devant la défense mais, sans dépasser l'axe, entre dans la défense comme faux pivot. Son vis-à-vis, qui se croit sans adversaire, sort sur l'arrière. L'ailier revient alors à son poste par l'intérieur, dans le grand espace libre à l'aile.",
        "Les figures de l'article n'ont pas été consultées: les placements et les fins (tirs) sont interprétés.",
      ],
      objectif: "Désorganiser les responsabilités d'une défense à 6 avec seulement 5 attaquants.",
      pointsCles: [
        "Disposition fausse: les extérieurs défensifs doivent choisir entre l'arrière très ouvert et le pivot qui sort vers l'extérieur.",
        "Circulation en huit: varier les trajectoires et le rythme pour créer de l'\"indéfinition de responsabilités\".",
        "Fausse circulation: l'ailier revient le long des 6 m au moment où son défenseur sort sur l'arrière.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...ANTON_2010, note: 'p. 12-13: "los laterales se sitúan muy abiertos [...] mientras que los dos pivotes se sitúan uno a cada lado en zonas intermedias entre laterales y central".' },
        { ...ANTON_2010, note: 'p. 14-15: "Normalmente empieza con la circulación de un extremo por fuera que se cruza con el extremo contrario, y posteriormente se siguen enlazando cruces o cortinas entre los jugadores de primera línea".' },
        { ...ANTON_2010, note: 'p. 15: "sin llegar a sobrepasar el eje del terreno se introducen en el dispositivo defensivo como falsos pivotes [...] el extremo que inicialmente circuló recupere su puesto específico por el interior de la defensa".' },
      ],
      absents: ['Piv'],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Disposition fausse 3:2 sans ailiers (contre 3-2-1)',
          dispositif: '3-2-1',
          depart: { AiG: [-2.6, 7.4], AiD: [2.6, 7.4], ArG: [-7.8, 7.6], ArD: [7.8, 7.6] },
          etapes: [
            {
              texte: "Placement: les deux arrières très ouverts, les deux ailiers en pivots entre les lignes, de part et d'autre du centre. Le demi-centre donne à l'arrière gauche. Le 1 gauche sort sur lui.",
              passe: ['DC', 'ArG', 0.2],
              def: { G1: [-7.6, 6.4] },
            },
            {
              texte: "Passe et va: l'arrière gauche donne au pivot gauche, venu à sa rencontre, et s'engage aussitôt dans le dos du 1, vers le but.",
              courses: { AiG: [-4.8, 9.0], ArG: { vers: [-5.8, 4.8], via: [-7.2, 6.2] } },
              passe: ['ArG', 'AiG', 0.1],
              def: { G2: [-4.5, 8.0] },
            },
            {
              texte: "Le pivot lui rend le ballon dans l'espace libre.",
              passe: ['AiG', 'ArG', 0.2],
              def: { G1: [-7.2, 5.0] },
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '2 - Circulation "en huit" (France 1995)',
          etapes: [
            {
              texte: "L'ailier gauche part en circulation devant la défense, vers la droite. Le demi-centre donne à l'arrière gauche.",
              courses: { AiG: { vers: [-3.6, 8.0], via: [-8.0, 7.4] } },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'ailier droit circule dans la défense, le long des 6 m, vers la gauche. Les deux ailiers se croisent: l'un devant la défense, l'autre derrière.",
              courses: {
                AiG: { vers: [3.2, 8.2], via: [0, 8.4] },
                AiD: { vers: [-2.8, 6.5], via: [4.4, 7.6] },
              },
              def: { G3: [-1.4, 6.9], D3: [1.4, 7.0] },
            },
            {
              texte: "Les arrières échangent leurs postes par un croisé: l'arrière gauche attaque vers le centre, le demi-centre passe dans son dos et reçoit. Les ailiers poursuivent vers l'aile opposée.",
              courses: {
                ArG: [-1.8, 8.8],
                DC: { vers: [-4.4, 9.4], via: [-1.4, 11.8] },
                AiG: { vers: [8.4, 3.0], via: [6.4, 8.4] },
                AiD: { vers: [-8.4, 3.0], via: [-6.0, 6.6] },
              },
              passe: ['ArG', 'DC', 0.55],
              def: { G3: [-1.9, 7.4], G2: [-4.4, 6.0] },
            },
            {
              texte: "Si un intervalle s'ouvre, le demi-centre tire. Sinon, le ballon repart vers la droite et la circulation recommence de l'autre côté.",
              tir: 'DC',
            },
          ],
        },
        {
          nom: "3 - Fausse circulation avec retour à l'aile (Allemagne 2007)",
          etapes: [
            {
              texte: "L'ailier gauche commence une circulation devant la défense, comme dans le \"huit\". Le demi-centre donne à l'arrière gauche.",
              courses: { AiG: { vers: [-4.2, 8.0], via: [-8.2, 7.0] } },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "Sans dépasser l'axe, l'ailier entre dans la défense comme un faux pivot, entre le 2 et le 3 gauches. Le 1 gauche, qui se croit sans adversaire, sort sur l'arrière gauche.",
              courses: { AiG: { vers: [-3.2, 6.5], via: [-2.6, 7.8] }, ArG: [-5.6, 8.6] },
              def: { G1: [-6.2, 6.8] },
            },
            {
              texte: "L'ailier revient à son poste par l'intérieur, le long des 6 m, dans le grand espace libre à l'aile. L'arrière gauche lui donne le ballon.",
              courses: { AiG: { vers: [-7.6, 3.6], via: [-5.6, 5.4] } },
              passe: ['ArG', 'AiG', 0.6],
              def: { G2: [-4.4, 6.4] },
            },
            {
              texte: "L'ailier gauche tire.",
              tir: 'AiG',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'croise-des-ailiers',
      nom: 'Croisé des deux ailiers (infériorité)',
      alias: 'Cruce de extremos, CRC EXT (ES); DHB-Unterzahlkreuzen (DE)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "À 5 sans pivot, les deux ailiers viennent se croiser au centre devant la défense, puis descendent l'un après l'autre au poste de pivot.",
      description: [
        "Action de l'équipe d'Espagne à l'Euro 2012, rejouée à l'identique en 2014 (Sierra-Guzmán et al., 2015). L'Espagne attaque à 5, sans pivot. L'ailier gauche part vers le centre devant la défense et reçoit du demi-centre, qui échange sa place avec l'arrière gauche. L'ailier droit fait la même course; les deux ailiers se croisent.",
        "L'ailier gauche se dédouble (il descend au poste de pivot), puis l'ailier droit après lui. Ensuite, les ailiers regagnent leur poste, l'ailier droit restant un peu plus longtemps au pivot. L'action se combine avec un croisé entre l'arrière gauche, venu au centre, et l'arrière droit; on attaque la zone du pivot en 1 contre 1 ou en 2 contre 2. En 2014, la version qui finit à droite a été la plus efficace.",
        "Le site allemand handballhaus cite le même principe sous le nom de \"DHB-Unterzahlkreuzen\" (croisé d'infériorité de la fédération allemande): un croisé inhabituel, celui des deux ailiers au centre, qui complique la répartition de la défense. Le côté du dédoublement de l'ailier droit et la fin (passe au pivot) sont interprétés.",
      ],
      objectif: "Brouiller les repères d'une défense à 6 avec des croisés inattendus, puis recréer un pivot pour jouer à 2 contre 2.",
      pointsCles: [
        "Les ailiers courent devant la défense pour recevoir, puis se dédoublent l'un après l'autre.",
        "Le demi-centre et l'arrière gauche échangent leurs postes pendant la course du premier ailier.",
        "Le dernier croisé des arrières lance le 2 contre 2 avec l'ailier resté au pivot.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SIERRA, note: 'p. 60: "el extremo izquierdo (F) inicia una trayectoria hacia el centro por delante de la defensa, recibe balón del central (B) que cambia de posición con el lateral izquierdo (A). Justo después, el extremo derecho (D) hace lo mismo [...] y se cruzan".' },
        { ...HANDBALLHAUS_UNTERZAHL, note: '"das Kreuzen der beiden Außenspieler im Spielzentrum (DHB-Unterzahlkreuzen)" complique la répartition de la défense.' },
      ],
      absents: ['Piv'],
      ballon: 'DC',
      etapes: CRC_EXT,
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'inferiorite-espagne',
      nom: "Infériorité de l'équipe d'Espagne (Euro 2012-2014)",
      alias: 'DDB EXT, CRC L-EX, CRC C-EX, FIJ 1L+P (codes de la sélection espagnole)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "Quatre situations codées de la sélection espagnole à 5 contre 6: dédoublement de l'ailier, croisés arrière-ailier et centre-ailier, fixations et pivot.",
      description: [
        "Sierra-Guzmán et al. (2015) classent les actions de l'Espagne en infériorité aux Euros 2012 et 2014. Un membre du staff de 2014 a validé la classification. Se dédoubler, c'est descendre au poste de pivot quand on n'est pas pivot.",
        "DDB EXT (dédoublement de l'ailier): l'ailier fixe, rend le ballon, se dédouble vers le côté opposé devant la défense, s'installe très ouvert entre le 1 et le 2 adverses, puis revient vers son poste par derrière la défense en recevant d'un joueur de première ligne. S'il est pressé, il se dédouble sans ballon. Le placement du pivot n'est pas précisé.",
        "CRC L-EX (croisé arrière-ailier puis dédoublement de l'arrière, 2014): décrit à droite dans la source, avec le pivot entre les deux centraux et sans ailier gauche; il est joué ici en miroir, à gauche, l'équipe jouant sans ailier droit. CRC C-EX (croisé centre-ailier gauche, 2014): le pivot est entre le 2 et le 3 droits. FIJ 1L+P: les trois joueurs de première ligne fixent (1 contre 1, croisés, permutations) et le pivot se démarque derrière la défense; c'est la situation la plus jouée en 2014 (45 %, efficacité 91 %). Pour cette dernière, la source ne donne que le principe.",
      ],
      objectif: "Garder le ballon et créer des 2 contre 2 malgré le joueur en moins.",
      pointsCles: [
        "L'ailier qui se dédouble revient à son poste par derrière la défense: c'est là qu'il reçoit.",
        "Après le croisé avec l'ailier, l'arrière se dédouble entre le 1 et le 2; l'ailier cherche l'arrière ou va jusqu'au centre pour servir le pivot.",
        "Pivot: se démarquer dans le dos des défenseurs attirés par les fixations.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SIERRA, note: 'p. 60-62 (DDB EXT): "fija al defensa, devuelve el balón al lateral (A) o al central (B) y se desdobla a parte contraria por delante de la defensa"; "intenta volver al puesto desplazándose por detrás de la defensa".' },
        { ...SIERRA, note: 'p. 62 (CRC L-EX): "El lateral derecho (C) cruza con el extremo derecho (D) y se desdobla entre los defensores exterior (1) y lateral (2) de ese lado. El extremo derecho (D) con trayectoria larga busca pase al lateral desdoblado (C) o sigue hasta el centro y busca pase al pivote (E)".' },
        { ...SIERRA, note: 'p. 62 (CRC C-EX): "El central (B) cruza con el extremo izquierdo (F) y le pasa el balón [...] El extremo izquierdo (F) pasa al lateral izquierdo (A) y se desdobla"; FIJ 1L+P: fixations de la première ligne et démarquages du pivot.' },
      ],
      absents: ['AiD'],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Dédoublement de l'ailier (DDB EXT)",
          depart: { Piv: [-3.4, 6.6] },
          etapes: [
            {
              texte: "L'arrière gauche donne à l'ailier gauche, qui remonte et fixe le 1 gauche.",
              courses: { AiG: [-8.0, 3.6] },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-7.0, 2.8] },
            },
            {
              texte: "L'ailier rend à l'arrière gauche et se dédouble vers le côté opposé, en passant devant la défense.",
              courses: { AiG: { vers: [2.6, 8.0], via: [-6.4, 8.0] } },
              passe: ['AiG', 'ArG', 0.1],
            },
            {
              texte: "Il s'installe très ouvert entre le 1 et le 2 droits, là où l'ailier droit manque. L'arrière gauche donne au demi-centre.",
              courses: { AiG: { vers: [7.2, 4.8], via: [6.0, 7.8] } },
              passe: ['ArG', 'DC', 0.3],
              def: { D1: [7.6, 2.6], D2: [5.2, 5.4] },
            },
            {
              texte: "L'ailier revient vers son poste par derrière la défense, le long des 6 m. Le demi-centre lui donne le ballon dans sa course, entre les deux 3.",
              courses: { AiG: { vers: [0, 6.3], via: [3.0, 6.6] }, DC: [0.4, 9.6] },
              passe: ['DC', 'AiG', 0.65],
              def: { D3: [2.0, 7.0], G3: [-1.6, 7.0] },
            },
            {
              texte: "L'ailier tire.",
              tir: 'AiG',
            },
          ],
        },
        {
          nom: "2 - Croisé arrière-ailier, l'arrière dédoublé reçoit (CRC L-EX)",
          etapes: [
            ...CRC_LEX_BASE,
            {
              texte: "L'ailier trouve l'arrière gauche dédoublé, qui tire.",
              passe: ['AiG', 'ArG', 0.2],
              tir: { par: 'ArG', t: 0.8 },
              def: { G2: [-5.6, 5.6] },
            },
          ],
        },
        {
          nom: "3 - Croisé arrière-ailier, l'ailier sert le pivot (CRC L-EX)",
          etapes: [
            ...CRC_LEX_BASE,
            {
              texte: "L'ailier continue jusqu'au centre et attire le 3 gauche. Il sert le pivot, placé entre les deux 3.",
              courses: { AiG: [-0.6, 8.8] },
              passe: ['AiG', 'Piv', 0.55],
              def: { G3: [-1.2, 7.6] },
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: '4 - Croisé centre-ailier gauche (CRC C-EX)',
          ballon: 'DC',
          depart: { Piv: [3.3, 6.5] },
          etapes: [
            {
              texte: "Le demi-centre part vers la gauche. L'ailier gauche coupe vers le centre et passe dans son dos: croisé, le demi-centre lui donne le ballon.",
              courses: { DC: [-2.4, 8.2], AiG: { vers: [-0.8, 9.2], via: [-6.4, 8.6] } },
              passe: ['DC', 'AiG', 0.6],
              def: { G3: [-2.2, 7.2] },
            },
            {
              texte: "L'ailier donne à l'arrière gauche et se dédouble: il descend entre les deux 3. Le demi-centre se replace à gauche.",
              courses: { AiG: [-0.6, 6.3], DC: [-6.2, 9.8], ArG: [-4.8, 9.4] },
              passe: ['AiG', 'ArG', 0.15],
              def: { G3: [-1.8, 6.8] },
            },
            {
              texte: "L'arrière gauche attaque vers le centre. L'ailier regagne son poste en passant derrière la défense.",
              courses: { ArG: [-1.0, 8.6], AiG: { vers: [-8.2, 3.0], via: [-4.6, 6.2] } },
              def: { G3: [-1.2, 7.4], G2: [-4.0, 6.8] },
            },
            {
              texte: "Le 3 droit vient aider au centre: l'arrière gauche sert le pivot, placé entre le 3 et le 2 droits.",
              passe: ['ArG', 'Piv', 0.3],
              def: { D3: [0.6, 7.4] },
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
        {
          nom: '5 - Fixations de la première ligne et pivot (FIJ 1L+P)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre fixe entre les deux 3, puis donne à l'arrière droit.",
              courses: { DC: [0.2, 8.8] },
              passe: ['DC', 'ArD', 0.6],
              def: { G3: [-1.2, 7.4], D3: [1.3, 7.4] },
            },
            {
              texte: "L'arrière droit fixe le 2 droit; le 3 droit sort pour aider. Le pivot se démarque derrière la défense, dans le dos du 3 sorti.",
              courses: { ArD: [4.6, 8.4], Piv: [2.8, 6.4] },
              def: { D2: [4.6, 6.4], D3: [2.0, 7.7] },
            },
            {
              texte: "L'arrière droit sert le pivot, qui tire.",
              passe: ['ArD', 'Piv', 0.2],
              tir: { par: 'Piv', t: 0.8 },
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'aussen-ab',
      nom: "L'arrière glisse à l'aile quand l'ailier rentre",
      alias: 'Außen ab 1 et 2 (handballhaus, DE)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "L'ailier gauche rentre le long des 6 m; l'arrière gauche glisse à sa place et reçoit à l'aile, face à un 1 gauche attiré vers l'intérieur.",
      description: [
        "Deux fiches de la rubrique \"infériorité\" du site allemand handballhaus.de (2009-2011). \"Außen ab\": l'ailier s'en va. Dans la 1re, l'ailier gauche rentre; en même temps, l'arrière gauche glisse au poste d'ailier et reçoit du demi-centre, avec l'avantage face au défenseur extérieur.",
        "Dans la 2e, le ballon va du demi-centre à l'arrière gauche puis à l'ailier, qui reçoit en pleine course et fixe le 1. L'ailier rend au demi-centre; celui-ci rejoue vite vers l'arrière gauche, qui a pris la place de l'ailier: il tire avec un bon angle.",
        "Seul un court texte est conservé (les animations ne sont plus lisibles). Le texte ne dit pas quel joueur manque: ici, l'équipe joue sans pivot et l'ailier qui rentre en tient lieu. La course de l'ailier après sa passe (variante 2) est interprétée.",
      ],
      objectif: "Libérer l'arrière à l'aile, en face d'un défenseur extérieur attiré par l'ailier qui rentre.",
      pointsCles: [
        "La rentrée de l'ailier et le glissement de l'arrière sont simultanés.",
        "Variante 2: l'ailier reçoit lancé et fixe vraiment le 1 avant de rendre au demi-centre.",
        "Le demi-centre rejoue vite: le 1 n'a pas le temps de revenir.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...HANDBALLHAUS_UNTERZAHL, note: "Außen ab 1: l'ailier gauche rentre, l'arrière gauche glisse en même temps à l'aile et reçoit du demi-centre. Außen ab 2: passes demi-centre, arrière, ailier; l'ailier fixe le 1 et rend au demi-centre, qui rejoue vite vers l'arrière passé à l'aile." },
      ],
      absents: ['Piv'],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Rentrée de l'ailier et glissement de l'arrière",
          etapes: [
            {
              texte: "L'ailier gauche rentre: il longe les 6 m vers l'intérieur. En même temps, l'arrière gauche glisse vers le poste d'ailier. Le 1 gauche suit l'ailier vers l'intérieur.",
              courses: {
                AiG: { vers: [-3.6, 6.3], via: [-6.8, 4.6] },
                ArG: { vers: [-8.4, 4.0], via: [-8.0, 8.0] },
              },
              def: { G1: [-6.4, 4.0] },
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche, à l'aile. Le 1 gauche revient sur lui, en retard.",
              passe: ['DC', 'ArG', 0.2],
              def: { G1: [-7.2, 3.4] },
            },
            {
              texte: "L'arrière gauche tire depuis l'aile.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: "2 - L'ailier fixe, le demi-centre rejoue vers l'arrière",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche, qui reçoit en pleine course et fixe le 1 gauche.",
              courses: { AiG: [-7.8, 4.2] },
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-6.8, 3.4] },
            },
            {
              texte: "L'ailier passe au demi-centre et rentre le long des 6 m. L'arrière gauche glisse à sa place, à l'aile.",
              courses: {
                AiG: { vers: [-4.0, 6.2], via: [-6.2, 5.2] },
                ArG: { vers: [-8.4, 4.4], via: [-8.4, 8.0] },
              },
              passe: ['AiG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre rejoue vite vers l'arrière gauche. Le 1 gauche, qui a suivi l'ailier, revient trop tard.",
              passe: ['DC', 'ArG', 0.2],
              def: { G1: [-7.4, 3.0] },
            },
            {
              texte: "L'arrière gauche tire, avec un bon angle.",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'austria-d09',
      nom: "Austria (croisé long demi-centre / ailier gauche, ailier droit qui rentre)",
      alias: 'Austria D09 (handballhaus, DE)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "Croisé long du demi-centre avec l'ailier gauche; l'arrière gauche, venu au centre, sert l'ailier droit qui rentre dans le dos des centraux.",
      description: [
        "Fiche \"Austria D09\" de la rubrique \"infériorité\" de handballhaus.de. Le demi-centre fait un croisé long avec l'ailier gauche. L'ailier passe à l'arrière gauche, dangereux au poste central. Celui-ci cherche l'ailier droit, qui rentre contre le bloc central sorti.",
        "Sinon, il passe à l'arrière droit, qui attaque le 2 droit et déborde le 1 droit. L'arrière gauche, au centre, peut aussi récupérer le ballon et jouer le pivot ou écarter le jeu à gauche.",
        "Notation de la source: les côtés de la défense sont vus depuis la défense (\"HL\" y est donc le 2 droit du site). Seul le texte est conservé; l'équipe joue ici sans pivot (l'ailier droit qui rentre en tient lieu); le déplacement de l'arrière gauche vers le centre et les fins sont interprétés.",
      ],
      objectif: "Attirer les défenseurs centraux vers le porteur, puis servir l'ailier qui rentre dans leur dos.",
      pointsCles: [
        "Le croisé long entre joueurs éloignés (centre et ailier) brouille les changements d'adversaire.",
        "L'arrière gauche au centre doit être une vraie menace de tir pour faire sortir les centraux.",
        "L'ailier droit rentre au moment où les centraux avancent.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...HANDBALLHAUS_UNTERZAHL, note: 'Austria D09: croisé long RM-LA; LA passe à RL, dangereux au poste central, qui cherche RA qui rentre contre le bloc central offensif; sinon passe à RR qui attaque HL et "passe" AL.' },
      ],
      absents: ['Piv'],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Passe à l'ailier droit rentré",
          etapes: [
            {
              texte: "Le demi-centre attaque en diagonale vers la gauche. L'arrière gauche glisse vers le centre en passant dans son dos.",
              courses: { DC: [-3.6, 8.6], ArG: { vers: [-0.6, 10.6], via: [-2.6, 11.6] } },
              def: { G3: [-2.6, 7.4] },
            },
            {
              texte: "Croisé long: l'ailier gauche coupe vers le centre et passe dans le dos du demi-centre, qui lui donne le ballon. Le demi-centre continue vers l'aile gauche.",
              courses: { AiG: { vers: [-2.4, 9.2], via: [-7.4, 9.0] }, DC: [-5.8, 7.4] },
              passe: ['DC', 'AiG', 0.5],
            },
            {
              texte: "L'ailier donne à l'arrière gauche, dangereux au centre: les deux 3 avancent sur lui. L'ailier droit rentre le long des 6 m.",
              courses: { AiD: { vers: [2.6, 6.4], via: [6.0, 5.2] }, ArG: [-0.4, 9.8] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G3: [-0.9, 7.9], D3: [0.8, 7.9] },
            },
            {
              texte: "L'arrière gauche sert l'ailier droit, dans le dos du bloc central sorti.",
              passe: ['ArG', 'AiD', 0.3],
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: "2 - L'arrière droit attaque le 2 et déborde le 1",
          etapes: [
            {
              texte: "Le demi-centre attaque en diagonale vers la gauche. L'arrière gauche glisse vers le centre en passant dans son dos.",
              courses: { DC: [-3.6, 8.6], ArG: { vers: [-0.6, 10.6], via: [-2.6, 11.6] } },
              def: { G3: [-2.6, 7.4] },
            },
            {
              texte: "Croisé long: l'ailier gauche coupe vers le centre et passe dans le dos du demi-centre, qui lui donne le ballon.",
              courses: { AiG: { vers: [-2.4, 9.2], via: [-7.4, 9.0] }, DC: [-5.8, 7.4] },
              passe: ['DC', 'AiG', 0.5],
            },
            {
              texte: "L'ailier donne à l'arrière gauche, au centre. L'ailier droit rentre le long des 6 m; le 2 droit glisse vers lui.",
              courses: { AiD: { vers: [2.6, 6.4], via: [6.0, 5.2] }, ArG: [-0.4, 9.8] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G3: [-0.9, 7.9], D3: [0.8, 7.9], D2: [3.8, 6.0] },
            },
            {
              texte: "La passe vers l'ailier rentré est fermée: l'arrière gauche donne à l'arrière droit.",
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit attaque le 2 droit, le déborde et passe le 1 droit, seul à l'extérieur. Il tire.",
              courses: { ArD: [7.0, 6.8] },
              tir: { par: 'ArD', t: 0.75 },
              def: { D1: [7.6, 4.6], D2: [4.4, 6.2] },
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'kreuzen-rm-la-uberlaufen',
      nom: "Croisé demi-centre / ailier gauche et débordement par l'extérieur",
      alias: 'Kreuzen RM-LA, Übergang von RM - Überlaufen von Außen (handballhaus, DE)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "Le demi-centre croise avec l'ailier gauche puis passe pivot pour bloquer le 2 gauche; le 1 gauche est débordé.",
      description: [
        "Fiche de la rubrique \"infériorité\" de handballhaus.de. Le demi-centre croise avec l'ailier gauche et, au même moment, passe pivot pour bloquer le 2 gauche. Le défenseur extérieur est débordé: 2 contre 2 sur ce côté.",
        "La source parle d'un 2 contre 2 \"à droite\"; ses côtés sont vus depuis la défense, c'est donc le côté gauche de l'attaque, celui du croisé. Seul le texte est conservé: le rôle de l'arrière gauche (qui déborde par l'extérieur) et la fin sont interprétés. L'équipe joue ici sans pivot, le demi-centre en tient lieu.",
      ],
      objectif: "Créer un 2 contre 2 sur le côté gauche, avec le 2 bloqué et le 1 débordé.",
      pointsCles: [
        "Le demi-centre ne s'arrête pas après le croisé: il file au pivot et bloque le 2 gauche.",
        "L'arrière gauche part au moment du bloc, par l'extérieur.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...HANDBALLHAUS_UNTERZAHL, note: 'Kreuzen RM-LA / Überlaufen von Außen: RM croise avec LA et passe au même moment pivot pour bloquer HR; AR est "débordé" vers 2 contre 2.' },
      ],
      absents: ['Piv'],
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre attaque en diagonale vers la gauche, vers le 3 gauche. L'ailier gauche remonte; l'arrière gauche s'écarte vers la touche.",
          courses: { DC: [-3.0, 8.6], AiG: [-8.4, 4.4], ArG: [-7.4, 9.8] },
          def: { G3: [-2.4, 7.4] },
        },
        {
          texte: "Croisé: l'ailier gauche coupe vers le centre et passe dans le dos du demi-centre, qui lui donne le ballon.",
          courses: { AiG: { vers: [-1.4, 9.4], via: [-5.2, 9.6] }, DC: [-3.6, 8.2] },
          passe: ['DC', 'AiG', 0.5],
        },
        {
          texte: "Au même moment, le demi-centre passe pivot et bloque le 2 gauche par l'intérieur. L'arrière gauche s'élance vers l'extérieur.",
          courses: { DC: { vers: [-4.2, 6.0], ecran: true }, ArG: [-6.6, 8.0], AiG: [-1.6, 9.0] },
          def: { G2: [-5.0, 5.4], G3: [-1.8, 7.6] },
        },
        {
          texte: "L'ailier donne à l'arrière gauche lancé. Le 2 gauche est bloqué, le 1 gauche est débordé.",
          courses: { ArG: [-6.8, 6.4] },
          passe: ['AiG', 'ArG', 0.2],
          def: { G1: [-7.6, 4.4] },
        },
        {
          texte: "L'arrière gauche tire.",
          tir: 'ArG',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'ailiers-passent-pivot',
      nom: 'Infériorité: les deux ailiers passent pivot',
      alias: '"Standard-Auslösehandlung" en Unterzahl (forum handballecke, DE)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "À 5 contre 6, les deux ailiers rentrent au pivot; selon le niveau, les arrières ajoutent un croisé.",
      description: [
        'Lancement courant en infériorité selon un entraîneur du forum allemand handballecke: les deux ailiers "se dissolvent" au pivot, et selon le niveau de jeu on ajoute un croisé en première ligne. "On peut le voir dans presque tous les matchs de Bundesliga."',
        "Une autre discussion du même forum propose d'utiliser le pivot comme \"Einläufer von Außen\" (joueur qui rentre depuis l'aile): le pivot se place à l'aile puis rentre, comme l'ailier gauche ici.",
        "Seul le principe est décrit: les placements, les passes et les fins sont interprétés. L'équipe joue sans pivot de départ.",
      ],
      objectif: "Recréer deux pivots pour fixer la défense et jouer à 2 contre 2 avec la première ligne.",
      pointsCles: [
        "Les ailiers rentrent entre le 2 et le 3, de chaque côté.",
        "Le croisé de la première ligne fait sortir un défenseur central: le pivot le plus proche se libère dans son dos.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Spielzüge in Unterzahl wanted (forum handballecke.de, post n°3)',
          url: 'https://www.handballecke.de/forum/thread/26356-spielz%C3%BCge-in-unterzahl-wanted/',
          note: '"Beliebt ist ja die Standard-Auslösehandlung, in der beide Außen an den Kreis auflösen und je nach Leistungsklasse im Rückraum noch ein Kreuzen eingebaut wird."',
        },
      ],
      absents: ['Piv'],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Sans croisé',
          etapes: [
            {
              texte: "Les deux ailiers quittent leur poste et rentrent au pivot: l'ailier gauche entre le 2 et le 3 gauches, l'ailier droit entre le 3 et le 2 droits.",
              courses: {
                AiG: { vers: [-3.4, 6.5], via: [-6.6, 4.8] },
                AiD: { vers: [3.4, 6.5], via: [6.6, 4.8] },
              },
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche, qui fixe le 2 gauche.",
              courses: { ArG: [-4.8, 8.4] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-4.6, 6.6] },
            },
            {
              texte: "Le 2 gauche est sorti: l'arrière gauche sert l'ailier gauche, devenu pivot, qui tire.",
              passe: ['ArG', 'AiG', 0.2],
              tir: { par: 'AiG', t: 0.8 },
            },
          ],
        },
        {
          nom: '2 - Avec croisé demi-centre / arrière gauche',
          etapes: [
            {
              texte: "Les deux ailiers quittent leur poste et rentrent au pivot: l'ailier gauche entre le 2 et le 3 gauches, l'ailier droit entre le 3 et le 2 droits.",
              courses: {
                AiG: { vers: [-3.4, 6.5], via: [-6.6, 4.8] },
                AiD: { vers: [3.4, 6.5], via: [6.6, 4.8] },
              },
            },
            {
              texte: "Croisé: le demi-centre attaque entre le 3 et le 2 gauches; l'arrière gauche passe dans son dos, vers le centre, et reçoit.",
              courses: { DC: [-2.6, 8.4], ArG: { vers: [-0.6, 8.9], via: [-3.0, 10.2] } },
              passe: ['DC', 'ArG', 0.55],
              def: { G3: [-2.2, 7.4] },
            },
            {
              texte: "L'arrière gauche attaque entre les deux 3. Le 3 droit sort sur lui: il sert l'ailier droit, au pivot dans le dos du 3.",
              courses: { ArG: [0.4, 8.2] },
              passe: ['ArG', 'AiD', 0.55],
              def: { D3: [1.2, 7.4] },
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
    /* 7 CONTRE 6 ET JEU À 6 SANS GARDIEN                               */
    /* ================================================================ */
    {
      id: 'gardien-joueur-supplementaire',
      nom: 'Le gardien joueur supplémentaire (passe longue)',
      alias: 'Ekstra spiller (DA), Extra player (EN), joueur supplémentaire (Dragør HK)',
      categorie: 'Supériorité numérique',
      defense: 'Toutes (7 contre 6 par surprise)',
      resume: "Le gardien fait mine de sortir à la zone des changements, puis continue vers le but adverse et reçoit une passe longue, loin de la défense.",
      description: [
        "Astuce de Dragør HK. L'attaque presse d'un côté et déplace la défense loin de la zone des changements. Le gardien est \"appelé\" à la zone des changements, comme pour être remplacé, mais il continue sa course vers le but adverse.",
        "L'attaquant le plus proche du centre bloque le défenseur le plus proche. Le gardien reçoit une passe longue et a beaucoup de place pour tirer; il doit ensuite revenir au plus vite dans son but.",
        'Ici, le gardien est le "7e joueur de champ" (J7). La zone des changements est à gauche, le pressing à droite; le défenseur bloqué (le 2 gauche) est un choix du schéma.',
      ],
      objectif: "Surprendre la défense avec un tireur supplémentaire qu'elle n'a pas vu arriver.",
      pointsCles: [
        "Presser d'abord du côté opposé aux changements, pour vider l'autre côté.",
        "Le bloc du joueur central empêche le défenseur le plus proche de sortir sur le gardien.",
        "Après le tir, le gardien revient immédiatement dans son but.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Joueur supplémentaire (Dragør HK, fiche f1281)',
          url: 'http://www.dragoerhb.dk/fransk/f1281.html',
          note: '"le gardien réceptionne une passe longue et aura beaucoup de place pour aller tirer"',
        },
      ],
      ballon: 'ArD',
      depart: { J7: [-9.6, 12.2] },
      etapes: [
        {
          texte: "L'arrière droit presse à droite et les arrières se décalent vers le ballon: la défense coulisse de ce côté, loin de la zone des changements. Le gardien court vers la zone des changements, comme pour sortir, puis continue vers le but adverse.",
          courses: { ArD: [4.6, 8.6], ArG: [-2.4, 10.2], J7: [-8.4, 11.0] },
          def: { G1: [-7.0, 3.4], G2: [-4.2, 5.8], G3: [-1.0, 6.7], D3: [2.2, 6.8], D2: [4.8, 6.0], D1: [7.4, 2.6] },
        },
        {
          texte: "Le gardien file vers les 9 m, côté gauche. Le demi-centre, l'attaquant le plus proche du centre, bloque le 2 gauche. L'arrière droit fait une passe longue au gardien.",
          courses: { J7: [-5.6, 9.2], DC: { vers: [-3.6, 7.0], ecran: true } },
          passe: ['ArD', 'J7', 0.6],
          def: { G2: [-4.4, 6.2] },
        },
        {
          texte: "Le gardien tire, puis revient au plus vite dans son but.",
          tir: 'J7',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'sept-contre-six-principe',
      nom: '7 contre 6: principe et faux gardien',
      alias: 'Angreb mod 3-3 forsvar (DA, Dragør f240); portero falso (ES, Antón)',
      categorie: 'Supériorité numérique',
      defense: '3-3 individuelle (7 contre 6)',
      resume: "Face à une défense individuelle, un 7e joueur de champ, entré à la place du gardien, reste toujours libre; il repart dès qu'un tir est possible.",
      description: [
        "Dragør HK: contre une défense 3-3, assimilée à un marquage individuel, il y a toujours un attaquant non marqué. Cet attaquant libre peut être le gardien, remplacé par un joueur de champ. Celui-ci doit être du côté du banc au déclenchement et, dès qu'un tir est possible, déjà repartir pour laisser entrer le vrai gardien. Si la défense repasse en 0-6 ou en 5-1, il faut choisir de garder ou non le 7 contre 6: le risque est un tir dans le but vide, mais \"peu atteignent leur but\".",
        "Antón (2010) décrit le \"faux gardien\" en infériorité (Juan Carlos Pastor à Valladolid et avec l'Espagne, la Croatie avec Balić, la Norvège féminine). Il recommande que le faux gardien soit l'arrière le plus proche du banc, qu'il reste 15 secondes (25 au plus), et qu'on joue les procédés habituels.",
        "Aucune des deux sources ne décrit de combinaison: le schéma illustre seulement le principe du joueur libre. Les placements et les passes sont interprétés.",
      ],
      objectif: "Exploiter le joueur en plus sans s'exposer longtemps au tir dans le but vide.",
      pointsCles: [
        "Le 7e joueur entre et sort côté banc.",
        "Contre une défense individuelle, le joueur en plus attaque un intervalle pour obliger un défenseur à lâcher son adversaire.",
        "Rester peu de temps sans gardien: 15 secondes, 25 au plus (Antón).",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Attaque contre une défense 3-3 (Dragør HK, fiche f240)',
          url: 'http://www.dragoerhb.dk/fransk/f240.html',
          note: '"Cet attaquant libre peut être le gardien de but qui est dans ce cas remplacé par un joueur de champ."',
        },
        { ...ANTON_2010, note: "p. 17-22: faux gardien = arrière le plus proche du banc; 15 s (25 s au plus); procédés habituels, sans combinaison propre." },
      ],
      ballon: 'DC',
      depart: {
        J7: [-9.6, 12.2],
        G1: [-8.2, 2.6], G2: [-5.0, 8.4], G3: [-1.0, 6.8], D3: [0, 9.4], D2: [5.0, 8.4], D1: [8.2, 2.6],
      },
      etapes: [
        {
          texte: "Défense individuelle: chaque défenseur marque un attaquant. Le 7e joueur de champ, entré à la place du gardien, arrive côté banc (à gauche). Personne ne le marque; le demi-centre lui donne le ballon.",
          courses: { J7: [-2.8, 10.6] },
          passe: ['DC', 'J7', 0.6],
        },
        {
          texte: "Le 7e attaque l'intervalle entre le 2 gauche et l'avancé. Le 2 gauche lâche l'arrière gauche pour sortir sur lui: le 7e donne à l'arrière gauche, libre.",
          courses: { J7: [-2.8, 8.8], ArG: [-5.6, 8.8] },
          passe: ['J7', 'ArG', 0.6],
          def: { G2: [-3.4, 7.6] },
        },
        {
          texte: "L'arrière gauche tire. Dès que le tir part, le 7e repart vers le banc pour laisser entrer le gardien.",
          courses: { J7: [-9.4, 12.2] },
          tir: { par: 'ArG', t: 0.3 },
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'sept-contre-six-croate',
      nom: '7 contre 6 croate contre 1-5 (JO 2016)',
      alias: 'Le jeu à 7 contre 6 face à une défense étagée (Approches du Handball n°156)',
      categorie: 'Supériorité numérique',
      defense: '1-5 (7 contre 6)',
      dispositif: '5-1',
      resume: "Avec deux pivots extérieurs, le demi-centre attaque côté bras l'avancé qui monte, profite du bloc extérieur du pivot droit et crée un 2 contre 1 à l'aile droite.",
      description: [
        "Action de la Croatie contre la défense 1-5 de la Pologne aux JO 2016, analysée dans Approches du Handball n°156. Tous les postes sont occupés et deux pivots se placent à l'extérieur, un de chaque côté (le 7e joueur de champ joue pivot droit).",
        "L'arrière gauche attaque en dribble le 3 bas pour le fixer et l'écarter. Le demi-centre garde de la profondeur pour le soutenir, dans le couloir entre le 3 haut (l'avancé) et le 3 bas. Quand l'avancé monte agressivement, le demi-centre engage le duel du côté où l'attaque est à 4 contre 3. L'arrière droit freine sa course face à l'espace extérieur.",
        "Le demi-centre gagne l'avantage côté bras, le pivot pose un bloc extérieur. Le demi-centre sort le ballon vers l'arrière droit (2 contre 1) et l'ailier droit, resté écarté, conclut.",
      ],
      objectif: "Transformer la montée de l'avancé en surnombre du côté opposé.",
      pointsCles: [
        "L'arrière gauche fixe et écarte le 3 bas pour isoler l'avancé.",
        "Le demi-centre attend en profondeur, puis attaque côté bras quand l'avancé monte.",
        "L'arrière droit freine pour garder l'espace extérieur; l'ailier droit reste écarté.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: '"Le jeu à 7 contre 6 face à une défense étagée", Approches du Handball n°156 (décembre 2016)',
          url: 'https://www.calameo.com/ffhandball/read/007275111df5ab573582b?page=34',
          note: "L'ARG \"attaque-fixe-écarte\" le n°3 bas; le DC engage le duel côté surnombre sur la montée du n°3 avancé; bloc externe du pivot; 2 contre 1 et tir de l'ailier droit écarté.",
        },
      ],
      ballon: 'ArG',
      depart: { J7: [6.4, 4.6], Piv: [-6.4, 4.6] },
      etapes: [
        {
          texte: "Deux pivots extérieurs, un de chaque côté. L'arrière gauche attaque en dribble le 3 bas, le fixe et l'écarte vers la gauche. Le demi-centre reste en profondeur.",
          courses: { ArG: [-2.6, 8.4], DC: [-0.6, 11.2] },
          def: { G3: [-1.8, 7.2], D3: [-0.6, 9.6] },
        },
        {
          texte: "L'arrière gauche donne au demi-centre, placé dans le couloir entre l'avancé et le 3 bas. L'avancé monte agressivement sur lui.",
          courses: { DC: [0.2, 10.8] },
          passe: ['ArG', 'DC', 0.2],
          def: { D3: [0.4, 9.8] },
        },
        {
          texte: "Le demi-centre engage le duel côté bras, vers la droite, où l'attaque est à 4 contre 3. L'arrière droit freine face à l'espace extérieur. Le pivot droit pose un bloc extérieur sur le 2 droit.",
          courses: { DC: { vers: [2.4, 8.8], via: [1.8, 10.4] }, ArD: [6.6, 8.2], J7: { vers: [5.6, 6.0], ecran: true } },
          def: { D3: [1.4, 9.2], D2: [4.6, 5.6] },
        },
        {
          texte: "Le demi-centre gagne l'avantage et sort le ballon vers l'arrière droit: 2 contre 1 avec l'ailier droit, face au 1 droit.",
          passe: ['DC', 'ArD', 0.3],
          def: { D1: [7.4, 5.6] },
        },
        {
          texte: "Le 1 droit sort sur l'arrière droit, qui donne à l'ailier droit, resté écarté.",
          courses: { AiD: [9.4, 1.0] },
          passe: ['ArD', 'AiD', 0.3],
        },
        {
          texte: "L'ailier droit tire.",
          tir: 'AiD',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'sept-contre-six-base',
      nom: '7 contre 6: schéma de base (côté banc, deux pivots)',
      alias: '7. Feldspieler (forum handballecke, DE)',
      categorie: 'Supériorité numérique',
      defense: '0-6 (7 contre 6)',
      resume: "On commence côté banc: l'arrière gauche puis le demi-centre percutent vers la gauche, et la droite joue à 3 contre 2.",
      description: [
        "Proposition d'un entraîneur de jeunes sur le forum allemand handballecke. Placement: deux ailiers, deux pivots, trois arrières. On commence du côté du banc (ici à gauche) pour pouvoir faire sortir vite le joueur supplémentaire.",
        "L'ailier gauche reste dans le coin et fixe le défenseur extérieur. Le pivot gauche se place entre le 1 et le 2 et crée un mauvais duel pour le défenseur. L'arrière gauche percute d'abord vers l'extérieur, puis attaque en dribble l'intervalle entre le 2 et le 3, éventuellement après un une-deux avec l'ailier; il fixe le 3. Le demi-centre percute à nouveau vers la gauche, entre les deux 3.",
        "L'arrière droit, le pivot droit et l'ailier droit ont alors la moitié du terrain pour un 3 contre 2. L'ailier gauche peut sortir tôt pour l'échange avec le gardien. Chiffres cités: à Balingen (Rolf Brack), 53,1 % d'efficacité à 7 contre 6 en 2013-14, contre 41,7 % à 6 contre 6. La place du pivot droit et la fin du 3 contre 2 sont interprétées.",
      ],
      objectif: "Attirer la défense côté banc, puis finir à 3 contre 2 de l'autre côté.",
      pointsCles: [
        "Commencer du côté du banc.",
        "Chaque percussion vers la gauche fixe un défenseur de plus.",
        "À droite, l'arrière lit le 2: s'il sort, le pivot est libre; s'il reste, l'arrière tire ou sert l'ailier.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Variante 7 Feldspieler (forum handballecke.de, posts n°2, 5 et 8)',
          url: 'https://www.handballecke.de/forum/thread/35492-variante-7-feldspieler/',
          note: "LA fixe AR dans le coin, pivot gauche entre AR et HR, RL percute puis attaque HR/IR, RM percute entre IR et IL; RR, KR et RA jouent à 3 contre 2.",
        },
      ],
      ballon: 'ArG',
      depart: { J7: [-6.4, 4.2], Piv: [3.2, 6.5] },
      etapes: [
        {
          texte: "Le 7e joueur de champ est pivot gauche, entre le 1 et le 2. L'ailier gauche reste dans le coin et fixe le 1. L'arrière gauche percute d'abord vers l'extérieur.",
          courses: { AiG: [-9.4, 0.6], ArG: [-6.6, 8.4] },
          def: { G2: [-5.6, 6.0] },
        },
        {
          texte: "Il attaque ensuite en dribble l'intervalle entre le 2 et le 3 gauches et fixe le 3. Il donne au demi-centre.",
          courses: { ArG: { vers: [-3.4, 8.0], via: [-5.4, 8.8] } },
          passe: ['ArG', 'DC', 0.7],
          def: { G3: [-2.6, 7.2] },
        },
        {
          texte: "Le demi-centre percute à son tour vers la gauche, entre les deux 3. Le 3 droit sort sur lui; il donne à l'arrière droit.",
          courses: { DC: [-0.8, 8.8] },
          passe: ['DC', 'ArD', 0.7],
          def: { D3: [-0.2, 7.6] },
        },
        {
          texte: "À droite, 3 contre 2: l'arrière droit, le pivot droit et l'ailier droit contre le 2 et le 1. L'arrière droit attaque le 2, qui sort: le pivot est libre.",
          courses: { ArD: [4.6, 8.2] },
          passe: ['ArD', 'Piv', 0.6],
          def: { D2: [4.6, 6.6] },
        },
        {
          texte: "Le pivot tire.",
          tir: 'Piv',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'sept-contre-six-tcheque',
      nom: 'Infériorité à 6 sans gardien: enchaînements tchèques',
      alias: 'Plzeň, Nové Veselí, Maloměřice (1re division tchèque, 2019-20); Oběh, Dlouhý kříž (CZ)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (6 joueurs de champ sans gardien)',
      resume: "En infériorité, le gardien est remplacé par un joueur de champ: les équipes tchèques enchaînent croisés aux ailes, contournements et permutations.",
      description: [
        "Kristýna Kubišová (2020) a observé les équipes masculines de 1re division tchèque. En infériorité, elles remplacent le gardien par un joueur de champ et jouent à 6 contre 6. À Plzeň, l'action doit toujours commencer du côté éloigné de la zone des changements, pour que le joueur qui sort pour le gardien soit le plus proche du banc (ici, banc à gauche: on commence à droite).",
        "Plzeň: l'ailier part en arc vers le centre et contourne le demi-centre, qui lui passe; demi-centre et arrière permutent; l'ailier donne à l'arrière éloigné, rentre dans la défense et la traverse en croisant le pivot, qui passe du côté opposé. De l'autre côté: croisé arrière-ailier; l'ailier passe au centre et repart en arc derrière lui; enchaînement de passes et croisé avec l'autre arrière.",
        "Nové Veselí: d'abord, les deux arrières croisent chacun avec leur ailier, qui rend au demi-centre puis retourne à son poste. Ensuite, \"Oběh\" (contournement du pivot: le pivot sort, croise avec le demi-centre, sert l'arrière éloigné et redescend de l'autre côté, pendant que le demi-centre et l'arrière permutent) ou \"Dlouhý kříž\" (croisé long des deux arrières au centre). Maloměřice enchaîne aussi croisé arrière-ailier d'un côté puis de l'autre, puis \"Oběh\" et permutation demi-centre / arrière: c'est la variante 2.",
        "La source décrit des enchaînements, sans schéma: les placements, le joueur qui reçoit à chaque étape et les fins sont interprétés.",
      ],
      objectif: "Garder le ballon longtemps à 6 contre 6 et créer un tir sans perdre la balle.",
      pointsCles: [
        "Commencer loin de la zone des changements.",
        "Oběh: le pivot sort devant la défense, échange le ballon avec le demi-centre en le croisant et redescend du côté opposé.",
        "Croisé long: le timing est essentiel pour que le croisé n'ait pas lieu trop près de la défense.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál v mužské a ženské házené, mémoire, Université Charles de Prague, 2020, p. 32-37',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: "Plzeň: l'action \"doit toujours commencer du côté éloigné de la zone de changement\"; Nové Veselí: croisés arrière-ailier puis \"Oběh\" ou \"Dlouhý kříž\"; Maloměřice: croisés aux ailes, \"Oběh\", permutation DC / arrière.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Plzeň',
          etapes: [
            {
              texte: "L'action commence à droite, loin de la zone des changements. L'ailier droit remonte vers les 9 m, entre l'arrière droit et le demi-centre.",
              courses: { AiD: { vers: [3.0, 9.0], via: [7.6, 6.6] } },
            },
            {
              texte: "Il contourne le demi-centre par derrière, en arc; le demi-centre lui donne le ballon.",
              courses: { AiD: { vers: [-1.8, 10.6], via: [1.2, 12.4] } },
              passe: ['DC', 'AiD', 0.5],
            },
            {
              texte: "Le demi-centre et l'arrière droit permutent: le demi-centre part au poste d'arrière droit, l'arrière droit vient au centre. L'ailier avance avec le ballon vers la gauche.",
              courses: {
                DC: { vers: [5.4, 10.0], via: [3.0, 11.4] },
                ArD: { vers: [0.6, 10.0], via: [3.0, 9.2] },
                AiD: [-2.6, 9.8],
              },
            },
            {
              texte: "L'ailier donne à l'arrière gauche, l'arrière éloigné, puis rentre dans la défense entre le 3 et le 2 gauches.",
              courses: { AiD: [-3.2, 6.6], ArG: [-5.2, 9.0] },
              passe: ['AiD', 'ArG', 0.1],
            },
            {
              texte: "Il traverse la défense le long des 6 m vers la droite et croise le pivot, qui passe du côté opposé, à gauche.",
              courses: {
                AiD: { vers: [3.4, 6.5], via: [0.2, 6.0] },
                Piv: { vers: [-3.4, 6.7], via: [-1.4, 7.8] },
              },
              def: { G3: [-1.9, 7.1], D3: [1.9, 7.0] },
            },
            {
              texte: "À gauche, croisé arrière-ailier: l'arrière gauche attaque vers l'extérieur, l'ailier gauche coupe vers l'intérieur dans son dos et reçoit.",
              courses: { ArG: [-6.4, 7.4], AiG: { vers: [-3.6, 8.8], via: [-8.4, 10.6] } },
              passe: ['ArG', 'AiG', 0.55],
              def: { G2: [-5.6, 6.2] },
            },
            {
              texte: "L'ailier gauche donne au joueur du centre (l'arrière droit) et repart en arc derrière lui.",
              courses: { AiG: { vers: [2.4, 11.6], via: [-1.0, 12.4] } },
              passe: ['AiG', 'ArD', 0.1],
            },
            {
              texte: "Croisé entre le joueur du centre et l'autre arrière (le demi-centre, au poste d'arrière droit): l'arrière droit attaque vers la droite, le demi-centre passe dans son dos et reçoit.",
              courses: { ArD: [2.6, 8.8], DC: { vers: [0.6, 9.0], via: [3.6, 10.4] } },
              passe: ['ArD', 'DC', 0.55],
              def: { D3: [2.2, 7.6] },
            },
            {
              texte: "Le demi-centre tire.",
              tir: 'DC',
            },
          ],
        },
        {
          nom: '2 - Nové Veselí / Maloměřice: croisés aux ailes puis Oběh',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière droit, qui attaque vers l'extérieur; l'ailier droit coupe vers l'intérieur dans son dos et reçoit.",
              courses: { ArD: [6.4, 7.6], AiD: { vers: [3.8, 8.8], via: [8.6, 10.2] } },
              passe: ['DC', 'ArD', 0],
              def: { D2: [5.6, 6.2] },
            },
            {
              texte: "Fin du croisé: l'arrière droit donne à l'ailier dans son dos.",
              passe: ['ArD', 'AiD', 0.2],
            },
            {
              texte: "L'ailier rend au demi-centre et retourne à son poste. L'arrière droit se replace.",
              courses: { AiD: { vers: [9.0, 1.4], via: [7.6, 6.6] }, ArD: [5.6, 9.6] },
              passe: ['AiD', 'DC', 0.15],
              def: { D2: [5.0, 5.0] },
            },
            {
              texte: "Même chose à gauche: le demi-centre donne à l'arrière gauche, qui attaque vers l'extérieur; l'ailier gauche coupe dans son dos et reçoit.",
              courses: { ArG: [-6.4, 7.6], AiG: { vers: [-3.8, 8.8], via: [-8.6, 10.2] } },
              passe: ['DC', 'ArG', 0],
              def: { G2: [-5.6, 6.2] },
            },
            {
              texte: "Fin du croisé: l'arrière gauche donne à l'ailier dans son dos.",
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier rend au demi-centre et retourne à son poste. L'arrière gauche se replace.",
              courses: { AiG: { vers: [-9.0, 1.4], via: [-7.6, 6.6] }, ArG: [-5.6, 9.6] },
              passe: ['AiG', 'DC', 0.15],
              def: { G2: [-5.0, 5.0] },
            },
            {
              texte: "Oběh: le pivot sort devant la défense, au niveau du 2 gauche. Le demi-centre attaque vers lui.",
              courses: { Piv: { vers: [-3.6, 8.4], via: [-2.6, 7.2] }, DC: [-0.8, 9.4] },
              def: { G3: [-2.0, 7.2] },
            },
            {
              texte: "Le pivot s'éloigne de la défense et croise le demi-centre, qui lui donne le ballon au croisement.",
              courses: { Piv: { vers: [0.6, 10.4], via: [-2.2, 10.6] }, DC: [-3.2, 8.4] },
              passe: ['DC', 'Piv', 0.5],
            },
            {
              texte: "Le pivot donne à l'arrière droit, le plus éloigné, puis redescend dans la défense du côté opposé, entre le 3 et le 2 droits. Le demi-centre prend la place de l'arrière gauche, qui glisse au poste de demi-centre.",
              courses: {
                Piv: { vers: [3.0, 6.6], via: [2.6, 8.8] },
                DC: [-5.6, 9.8],
                ArG: { vers: [-1.0, 10.2], via: [-3.6, 11.0] },
              },
              passe: ['Piv', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, arrivé au centre. Le pivot pose un écran sur le 3 droit.",
              courses: { Piv: { vers: [1.4, 7.4], ecran: true }, ArG: [-0.4, 9.6] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D3: [2.2, 6.9] },
            },
            {
              texte: "L'arrière gauche tire à côté de l'écran.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '3 - Nové Veselí: croisés aux ailes puis croisé long',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière droit, qui attaque vers l'extérieur; l'ailier droit coupe vers l'intérieur dans son dos et reçoit.",
              courses: { ArD: [6.4, 7.6], AiD: { vers: [3.8, 8.8], via: [8.6, 10.2] } },
              passe: ['DC', 'ArD', 0],
              def: { D2: [5.6, 6.2] },
            },
            {
              texte: "Fin du croisé: l'arrière droit donne à l'ailier dans son dos.",
              passe: ['ArD', 'AiD', 0.2],
            },
            {
              texte: "L'ailier rend au demi-centre et retourne à son poste. L'arrière droit se replace.",
              courses: { AiD: { vers: [9.0, 1.4], via: [7.6, 6.6] }, ArD: [5.6, 9.6] },
              passe: ['AiD', 'DC', 0.15],
              def: { D2: [5.0, 5.0] },
            },
            {
              texte: "Croisé long: le demi-centre donne à l'arrière gauche, déjà lancé vers le centre de la défense.",
              courses: { ArG: [-2.0, 9.0] },
              passe: ['DC', 'ArG', 0.5],
              def: { G3: [-1.8, 7.3] },
            },
            {
              texte: "Sans tir possible, l'arrière gauche donne à l'arrière droit, lancé avec un léger retard vers le centre: les deux arrières se croisent au centre. Le demi-centre prend la place de l'arrière gauche.",
              courses: {
                ArG: [1.4, 8.8],
                ArD: { vers: [-1.2, 9.6], via: [1.8, 10.4] },
                DC: { vers: [-5.4, 9.8], via: [-2.6, 11.4] },
              },
              passe: ['ArG', 'ArD', 0.55],
              def: { D3: [1.6, 7.4] },
            },
            {
              texte: "L'arrière droit tire à mi-distance.",
              tir: 'ArD',
            },
          ],
        },
      ],
    },
    /* ================================================================ */
    /* SUPÉRIORITÉ NUMÉRIQUE (6 contre 5)                               */
    /* ================================================================ */
    {
      id: 'bresil',
      nom: 'Brésil (supériorité contre 0-5)',
      alias: 'Enclenchement "Brésil"',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-5 (6 contre 5)',
      resume: "Le pivot, placé entre le 1 et le 2 droits, sort en poste; la demi-centre lui donne, le contourne et attaque entre le 2 et le 3 droits pendant que le pivot redescend à l'opposé.",
      description: [
        "Enclenchement relevé par Damien Chastel aux interligues féminins (sélection Grand Est: 10 fois, pour 4 situations de tir favorables), contre une défense 0-5 de zone, quand l'adversaire est en infériorité.",
        "Le pivot est placé entre la n°1 et la n°2 à droite. La demi-centre va chercher le ballon du côté de l'arrière gauche. Le pivot vient en poste, la demi-centre lui fait la passe, puis il lui redonne: elle attaque, côté bras, l'intervalle entre la n°2 et la n°3 à droite, en contournant le pivot. Le pivot se replace entre la n°2 et la n°3 à gauche.",
        "La n°3 (seule centrale de la 0-5) a un problème de répartition: la demi-centre ou le pivot. L'attaque joue à 4 contre 3. La source ne détaille pas les fins: le schéma se termine par le tir de la demi-centre.",
      ],
      objectif: "Poser un problème de répartition à la seule défenseure centrale d'une 0-5.",
      pointsCles: [
        "Le pivot part de l'extérieur (entre 1 et 2) pour sortir en poste au centre droit.",
        "La demi-centre contourne le pivot et attaque côté bras.",
        "Le pivot redescend de l'autre côté de la n°3.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 1)", Approches du Handball n°178 (2020), p. 25',
          url: 'https://www.calameo.com/ffhandball/read/00727511165bc273357a9?page=25',
          note: '"ENCLENCHEMENT "Brésil" / sur 0-5 zone (infériorité). Utilisé par Grand Est: 10 fois (pour 4 situations favorables de tir)"',
        },
      ],
      absents: ['D3'],
      ballon: 'ArG',
      depart: { ...DEF_05, Piv: [6.4, 4.4] },
      etapes: [
        {
          texte: "La demi-centre va chercher le ballon du côté de l'arrière gauche, qui le lui donne.",
          courses: { DC: [-2.8, 9.8] },
          passe: ['ArG', 'DC', 0.5],
        },
        {
          texte: "Le pivot quitte l'intervalle 1-2 droit et sort en poste, vers les 9 m au centre droit. La demi-centre lui fait la passe.",
          courses: { Piv: { vers: [1.6, 9.2], via: [5.8, 7.4] } },
          passe: ['DC', 'Piv', 0.6],
          def: { G3: [0.6, 7.4] },
        },
        {
          texte: "Le pivot redonne à la demi-centre, qui le contourne et attaque côté bras l'intervalle entre la 2 et la 3 droites.",
          courses: { DC: { vers: [2.6, 8.0], via: [2.4, 12.2] }, Piv: [-0.4, 9.4] },
          passe: ['Piv', 'DC', 0.45],
          def: { D2: [3.6, 6.6] },
        },
        {
          texte: "Le pivot se replace entre la 2 et la 3 gauches. La 3 doit choisir entre la demi-centre et le pivot: 4 contre 3.",
          courses: { Piv: { vers: [-2.2, 6.6], via: [-0.8, 8.0] } },
          def: { G3: [1.2, 7.2] },
        },
        {
          texte: "La demi-centre tire.",
          tir: 'DC',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'bundeslig',
      nom: 'Bundeslig (supériorité: le demi-centre prend le bloc du pivot)',
      alias: '"Bundeslig"',
      categorie: 'Supériorité numérique',
      defense: '0-5 (6 contre 5)',
      resume: "En supériorité, le demi-centre utilise le bloc du pivot pour jouer à 3 contre 2; variantes avec le demi-centre qui rentre en deuxième pivot.",
      description: [
        "Peter Kovacs (analyse de l'Euro 2016): \"Après une fixation de l'arrière gauche, il passe au demi-centre qui prend le bloc du pivot et joue un 3 contre 2.\" L'arrière gauche, après sa passe, s'écarte à l'extérieur pour faire flotter le n°2. C'est le \"Bundeslig\", joué par beaucoup d'équipes du championnat allemand.",
        "Deux autres schémas du même article, toujours en supériorité. 1: le demi-centre rentre en deuxième pivot; l'ailier passe à l'arrière gauche lancé vers l'intérieur, qui lit la défense (tir ou passe à l'un des pivots, \"souvent 6 situations possibles\"). 2: le demi-centre fixe en dribble, donne à l'arrière gauche lancé vers l'intérieur, puis rentre en deuxième pivot.",
        "Kovacs note aussi que la France joue souvent avec deux pivots extérieurs et Nikola Karabatic qui joue autour, tire ou donne. La défense est ici une 0-5 en ligne; le joueur exclu, la place du pivot et les fins sont des choix du schéma.",
      ],
      objectif: "Créer un 3 contre 2 au centre grâce au bloc du pivot.",
      pointsCles: [
        "L'arrière gauche fixe avant de passer, puis s'écarte pour faire flotter le 2.",
        "Le demi-centre passe au ras du bloc du pivot.",
        "Variantes: le demi-centre devient deuxième pivot; l'arrière gauche lit la défense en course intérieure.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...KOVACS_154, url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=41', note: "p. 41: \"Après une fixation de l'arrière gauche, il passe au demi-centre qui prend le bloc du pivot et joue un 3 contre 2 [...] C'est le \"Bundeslig\"\"." },
      ],
      absents: ['D3'],
      ballon: 'ArG',
      depart: { ...DEF_05, Piv: [1.6, 6.5] },
      variantes: [
        {
          nom: '1 - Bloc du pivot, 3 contre 2',
          etapes: [
            {
              texte: "L'arrière gauche fixe le 2 gauche, puis donne au demi-centre.",
              courses: { ArG: [-4.6, 8.4] },
              passe: ['ArG', 'DC', 0.7],
              def: { G2: [-4.4, 6.6] },
            },
            {
              texte: "Le pivot pose un bloc sur le 3, côté gauche. Après sa passe, l'arrière gauche s'écarte vers l'extérieur pour faire flotter le 2.",
              courses: { Piv: { vers: [-0.9, 7.0], via: [0.6, 7.6], ecran: true }, ArG: [-7.2, 8.4] },
              def: { G2: [-4.8, 6.6] },
            },
            {
              texte: "Le demi-centre prend le bloc: il passe au ras du pivot, côté gauche. 3 contre 2: le demi-centre, le pivot et l'arrière gauche contre le 3 et le 2.",
              courses: { DC: { vers: [-2.4, 8.2], via: [-0.6, 9.8] } },
              def: { G2: [-3.6, 7.2] },
            },
            {
              texte: "Le 2 sort sur le demi-centre, qui donne à l'arrière gauche, écarté. L'arrière gauche tire.",
              passe: ['DC', 'ArG', 0.2],
              tir: { par: 'ArG', t: 0.8 },
            },
          ],
        },
        {
          nom: '2 - Le demi-centre rentre en deuxième pivot (schéma 1)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche et rentre en deuxième pivot, entre le 3 et le 2 gauches.",
              courses: { DC: [-2.2, 6.6] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche et s'écarte.",
              courses: { AiG: [-8.6, 3.0], ArG: [-6.4, 10.0] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier gauche rend à l'arrière gauche, lancé en course intérieure. Il lit la défense: tir, ou passe à l'un des deux pivots.",
              courses: { ArG: { vers: [-3.6, 8.6], via: [-5.6, 8.6] } },
              passe: ['AiG', 'ArG', 0.4],
              def: { G2: [-3.8, 7.0], G3: [-0.6, 7.0] },
            },
            {
              texte: "Le 2 sort sur lui: il sert le demi-centre, deuxième pivot, dans son dos. Le demi-centre tire.",
              passe: ['ArG', 'DC', 0.2],
              tir: { par: 'DC', t: 0.8 },
            },
          ],
        },
        {
          nom: '3 - Fixation du demi-centre en dribble (schéma 2)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre crée un point de fixation en dribble, face au 3.",
              courses: { DC: [-0.6, 8.6] },
              def: { G3: [-0.4, 7.4] },
            },
            {
              texte: "Il donne à l'arrière gauche, lancé en course intérieure, puis rentre en deuxième pivot.",
              courses: { ArG: { vers: [-3.0, 9.0], via: [-5.0, 8.4] }, DC: [-2.0, 6.6] },
              passe: ['DC', 'ArG', 0.35],
            },
            {
              texte: "L'arrière gauche attaque le 2. Le 3 glisse vers le demi-centre: le pivot de départ est libre, l'arrière gauche le sert.",
              courses: { ArG: [-3.4, 8.2] },
              passe: ['ArG', 'Piv', 0.5],
              def: { G3: [-1.1, 7.3], G2: [-4.0, 6.6] },
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
      id: 'superiorite-mahb',
      nom: 'Supériorité: deux enclenchements de Montpellier',
      alias: 'Le jeu en supériorité numérique (Montpellier AHB)',
      categorie: 'Supériorité numérique',
      defense: '0-5 (6 contre 5)',
      resume: "Contre une défense à 5: deux pivots qui écartent la défense et redoublements des arrières, ou entrée de l'arrière opposé au signal de l'ailier.",
      description: [
        "Jérôme Diaz et Maurice Portes (formation du Montpellier AHB) décrivent deux enclenchements à 6 contre 5. 1: deux pivots entre les n°1 et n°2, en appui sur les n°1, écartent la défense; les ailiers sont au point de corner, les deux arrières face aux intervalles entre les n°2 et n°3. Les arrières redoublent les passes (fixation à 8,50 m, replacement à 9,50 m) jusqu'à une solution: tir à mi-distance d'un défenseur en retard, passe au pivot côté ballon ou décalage d'un ailier. Dans ce placement, le demi-centre joue ici le deuxième pivot.",
        "2: cinq joueurs autour et un pivot entre le n°1 et le n°2 côté ballon. Signal: la passe de l'ailier à son arrière, qui fixe fort le n°2. L'arrière opposé entre alors entre le n°2 et le n°3, du côté opposé au ballon, et prend position sur le n°3. L'arrière latéral peut donner au joueur entré (duel avec le gardien) ou au demi-centre, qui a légèrement glissé pour changer d'intervalle et qui fixe fort entre le n°2 et le n°3 puis tire.",
        "Selon les auteurs, la solution vient en 2 ou 3 passes, avec un tir au centre; il faut des tireurs à mi-distance et un bon timing d'entrée. Mladen Bojinovic, demi-centre du MAHB: \"Je place mon pivot au centre avec une fixation forte du demi-centre pour décaler d'un côté ou de l'autre.\" Les schémas de l'article n'ont pas été consultés.",
      ],
      objectif: "Trouver une solution de tir en 2 ou 3 passes contre une défense à 5.",
      pointsCles: [
        "Fixer à 8,50 m, se replacer à 9,50 m.",
        "Les pivots en appui sur les n°1 écartent la défense.",
        "Entrée de l'arrière opposé: au signal de la passe de l'ailier, du côté opposé au ballon.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'J. Diaz et M. Portes, "Le jeu en supériorité numérique", Approches du Handball n°124 (juillet 2011), p. 39-42',
          url: 'https://www.calameo.com/ffhandball/read/007275111c43255fadacb?page=39',
          note: "\"Signal: passe de l'ailier pour son arrière (fixation forte sur la n°2 de défense): entrée de l'arrière opposé entre le n°2 et le n°3 (côté opposé au ballon) et gain de position sur le n°3\"",
        },
      ],
      absents: ['D3'],
      ballon: 'AiG',
      depart: { ...DEF_05 },
      variantes: [
        {
          nom: '1 - Deux pivots écarteurs et redoublements',
          ballon: 'ArG',
          depart: { Piv: [-6.8, 3.6], DC: [6.8, 3.6], AiG: [-9.6, 0.4], AiD: [9.6, 0.4], ArG: [-2.2, 9.6], ArD: [2.2, 9.6] },
          etapes: [
            {
              texte: "Deux pivots entre les 1 et les 2, en appui sur les 1; ailiers au corner; arrières face aux intervalles 2-3. L'arrière gauche fixe à 8,50 m, puis donne à l'arrière droit.",
              courses: { ArG: [-2.0, 8.6] },
              passe: ['ArG', 'ArD', 0.7],
              def: { G3: [-0.8, 7.4], G2: [-3.6, 6.6] },
            },
            {
              texte: "L'arrière gauche se replace à 9,50 m. L'arrière droit fixe à son tour à 8,50 m et lui rend le ballon. Le 3 glisse vers la droite.",
              courses: { ArG: [-2.2, 9.6], ArD: [2.0, 8.6] },
              passe: ['ArD', 'ArG', 0.7],
              def: { G3: [0.8, 7.4], D2: [3.6, 6.6], G2: [-4.0, 6.0] },
            },
            {
              texte: "L'arrière gauche refixe; le 3 revient en retard. L'arrière gauche tire à mi-distance (sinon: pivot côté ballon ou décalage de l'ailier).",
              courses: { ArG: [-2.0, 8.6], ArD: [2.2, 9.6] },
              tir: { par: 'ArG', t: 0.7 },
              def: { G3: [-0.6, 7.3], D2: [4.0, 6.0] },
            },
          ],
        },
        {
          nom: "2 - Entrée de l'arrière opposé, passe au joueur entré",
          depart: { Piv: [-6.8, 3.6] },
          etapes: [
            {
              texte: "Signal: l'ailier gauche passe à son arrière, qui fixe fort le 2 gauche. Le pivot est entre le 1 et le 2 gauches, en appui sur le 1.",
              courses: { ArG: [-4.6, 8.2] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.4, 6.6] },
            },
            {
              texte: "L'arrière droit, côté opposé au ballon, entre entre le 2 et le 3 et prend position sur le 3. Le demi-centre glisse légèrement pour changer d'intervalle.",
              courses: { ArD: { vers: [1.2, 6.9], via: [3.6, 8.4] }, DC: [-1.0, 10.0] },
              def: { G3: [-0.2, 6.7] },
            },
            {
              texte: "L'arrière gauche sert l'arrière droit, entré devant le 3.",
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit tire en duel avec le gardien.",
              tir: 'ArD',
            },
          ],
        },
        {
          nom: "3 - Entrée de l'arrière opposé, tir du demi-centre",
          depart: { Piv: [-6.8, 3.6] },
          etapes: [
            {
              texte: "Signal: l'ailier gauche passe à son arrière, qui fixe fort le 2 gauche. Le pivot est entre le 1 et le 2 gauches, en appui sur le 1.",
              courses: { ArG: [-4.6, 8.2] },
              passe: ['AiG', 'ArG', 0.1],
              def: { G2: [-4.4, 6.6] },
            },
            {
              texte: "L'arrière droit, côté opposé au ballon, entre entre le 2 et le 3 et prend position sur le 3. Le demi-centre glisse légèrement pour changer d'intervalle.",
              courses: { ArD: { vers: [1.2, 6.9], via: [3.6, 8.4] }, DC: [-1.0, 10.0] },
              def: { G3: [-0.2, 6.7] },
            },
            {
              texte: "L'arrière gauche donne au demi-centre, qui fixe fort entre le 2 et le 3 gauches. Le 3 est retenu par l'arrière droit: le demi-centre tire.",
              courses: { DC: [-1.8, 8.8] },
              passe: ['ArG', 'DC', 0.2],
              tir: { par: 'DC', t: 0.85 },
              def: { G2: [-3.6, 7.0] },
            },
          ],
        },
      ],
    },

    /* ================================================================ */
    /* JETS FRANCS (Approches du Handball)                              */
    /* ================================================================ */
    {
      id: 'jf-gardien-remplace',
      nom: 'Jet franc à 9 m avec un joueur de champ à la place du gardien',
      alias: 'Changement gardien / joueur de champ sur jet franc (Allemagne, Euro 2016)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m, 7 contre 6)',
      resume: "Sur un jet franc bien placé, un joueur de champ remplace le gardien: quatre attaquants forment le mur, ce qui permet de tirer derrière l'écran ou de servir l'ailier ou le pivot.",
      description: [
        "Peter Kovacs (Euro 2016): quand la position est bonne pour tirer, l'Allemagne joue le jet franc à 9 m en faisant entrer un joueur de champ à la place du gardien. Elle profite de ce surnombre (3 ou 4 joueurs dans le mur) pour tirer à l'aide d'un écran, ou pour passer à l'ailier ou au pivot. L'effet de surprise compte.",
        "Le même passage cite l'Espagne et la Croatie: l'ailier droit joue l'engagement rapide au milieu du terrain, puis l'équipe attaque côté gauche en supériorité. C'est une remise en jeu au centre, pas un jet franc, et la source n'en dit pas plus: elle n'est pas schématisée.",
        'Le placement du mur (quatre joueurs, dont le joueur supplémentaire) et les trois fins sont interprétés. Le tir derrière le mur qui recule est détaillé dans la fiche "Jet franc: tir direct derrière le mur qui recule".',
      ],
      objectif: "Profiter d'un joueur de plus dans le mur pour protéger le tireur et multiplier les solutions.",
      pointsCles: [
        "Ne le jouer que sur un jet franc bien placé pour tirer.",
        "Le mur à quatre recule dès la passe et fait écran.",
        "Si les défenseurs contournent le mur, servir l'ailier ou le pivot.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...KOVACS_154, note: "p. 39: \"L'Allemagne joue le jet franc à 9 mètres quand il y a une bonne position pour un tir en faisant un changement d'un joueur avec le gardien\"; écran à 3 ou 4 joueurs, ou passe à l'ailier ou au pivot." },
      ],
      ballon: 'DC',
      depart: {
        J7: [-1.25, 9.2], AiD: [-2.5, 9.25], DC: [0, 9.35], ArD: [1.25, 9.25], ArG: [-1.25, 11.6], Piv: [3.3, 6.5], AiG: [-9.5, 4.4],
        G1: [-7.2, 2.6], G2: [-3.9, 6.0], G3: [-1.3, 6.4], D3: [1.3, 6.4], D2: [4.8, 5.4], D1: [7.6, 2.6],
      },
      variantes: [
        {
          nom: '1 - Tir derrière le mur à quatre',
          etapes: [
            {
              texte: "Un joueur de champ remplace le gardien: le mur compte quatre attaquants sur la ligne des 9 m. Le demi-centre passe à l'arrière gauche, lancé derrière le mur; le mur recule et fait écran.",
              courses: { AiD: [-2.5, 9.85], J7: [-1.25, 9.8], DC: [0, 9.95], ArD: [1.25, 9.85], ArG: [-0.6, 10.9] },
              passe: ['DC', 'ArG', 0.1],
              def: { G3: [-1.3, 7.3], D3: [0.8, 7.2], G2: [-3.2, 7.0] },
            },
            {
              texte: "L'arrière gauche tire en suspension par-dessus le mur.",
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
        {
          nom: "2 - Passe à l'ailier",
          etapes: [
            {
              texte: "Un joueur de champ remplace le gardien: le mur compte quatre attaquants sur la ligne des 9 m. Le demi-centre passe à l'arrière gauche, lancé derrière le mur; le mur recule et fait écran.",
              courses: { AiD: [-2.5, 9.85], J7: [-1.25, 9.8], DC: [0, 9.95], ArD: [1.25, 9.85], ArG: [-0.6, 10.9] },
              passe: ['DC', 'ArG', 0.1],
              def: { G3: [-1.3, 7.3], D3: [0.8, 7.2], G2: [-3.2, 7.0] },
            },
            {
              texte: "Les défenseurs du côté gauche resserrent vers le tireur: l'arrière gauche donne à l'ailier gauche, seul à l'aile.",
              courses: { AiG: [-8.8, 3.6] },
              passe: ['ArG', 'AiG', 0.3],
              def: { G2: [-3.0, 7.6], G1: [-6.0, 4.4] },
            },
            {
              texte: "L'ailier gauche tire.",
              tir: 'AiG',
            },
          ],
        },
        {
          nom: '3 - Passe au pivot',
          etapes: [
            {
              texte: "Un joueur de champ remplace le gardien: le mur compte quatre attaquants sur la ligne des 9 m. Le demi-centre passe à l'arrière gauche, lancé derrière le mur; le mur recule et fait écran.",
              courses: { AiD: [-2.5, 9.85], J7: [-1.25, 9.8], DC: [0, 9.95], ArD: [1.25, 9.85], ArG: [-0.6, 10.9] },
              passe: ['DC', 'ArG', 0.1],
              def: { G3: [-1.3, 7.3], D3: [0.8, 7.2], G2: [-3.2, 7.0] },
            },
            {
              texte: "Le 3 droit contourne le mur pour sortir sur le tireur: l'arrière gauche sert le pivot, libre derrière lui.",
              courses: { Piv: [2.4, 6.5] },
              passe: ['ArG', 'Piv', 0.4],
              def: { D3: [1.9, 8.2] },
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
      id: 'jf-fribourg-goppingen',
      nom: 'Jets francs "Fribourg" et "Göppingen"',
      alias: 'Fribourg, Göppingen (A. Behm); à partir de la "suspension protégée"',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Mur défensif (jet franc à 9 m)',
      resume: "Deux suites de la suspension protégée: redoublement de passe avec l'autre arrière (Fribourg), ou feinte de tir et passe à un joueur écarté aux 6 m (Göppingen).",
      description: [
        "Alain Behm présente trois jets francs. La \"suspension protégée\": deux joueurs en protection, passe à l'arrière, les deux joueurs font écran en reculant devant la défense, tir de l'arrière (voir la fiche \"Jet franc: tir direct derrière le mur qui recule\").",
        "\"Fribourg\": à partir d'une suspension protégée, l'arrière redouble la passe avec l'autre arrière, qui remet au tireur, toujours protégé par le blocage des deux joueurs de la protection.",
        "\"Göppingen\", pratiqué par ce club allemand: deux joueurs en protection, passe à l'arrière, feinte de tir, puis passe à l'un des deux joueurs écartés aux 6 m, en contournant le mur des défenseurs. Les placements sont interprétés (ici, les deux ailiers sont les joueurs écartés).",
      ],
      objectif: "Varier la suite de la suspension protégée quand la défense la connaît.",
      pointsCles: [
        "Les deux joueurs de la protection reculent dès la passe et gardent leur blocage.",
        "Fribourg: la remise de l'autre arrière doit être rapide, avant que les défenseurs contournent l'écran.",
        "Göppingen: la feinte de tir attire les défenseurs vers le centre; la passe contourne le mur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...BEHM_114, note: "\"Göppingen\": \"Jet franc pratiqué par ce club allemand. Deux joueurs en protection, passe à l'arrière, feinte de tir, passe à un des deux joueurs écartés aux 6 mètres, contournant le mur des défenseurs\"; \"Fribourg\": redoublement de passe avec l'autre arrière à partir d'une suspension protégée." },
      ],
      ballon: 'DC',
      depart: {
        Piv: [-0.7, 9.2], DC: [0.7, 9.2], ArG: [-0.6, 11.8], ArD: [3.6, 11.0], AiG: [-6.8, 3.4], AiD: [6.8, 3.4],
        G1: [-5.8, 4.8], G2: [-3.6, 6.4], G3: [-1.2, 6.3], D3: [1.2, 6.3], D2: [3.6, 6.4], D1: [5.8, 4.8],
      },
      variantes: [
        {
          nom: '1 - Fribourg (redoublement de passe)',
          etapes: [
            {
              texte: "Suspension protégée: le demi-centre, un des deux joueurs de la protection, passe à l'arrière gauche, lancé derrière eux. Les deux joueurs reculent ensemble et font écran.",
              courses: { Piv: [-0.7, 9.8], DC: [0.7, 9.8], ArG: [-0.1, 11.0] },
              passe: ['DC', 'ArG', 0.1],
              def: { G3: [-1.2, 7.2], D3: [1.2, 7.2] },
            },
            {
              texte: "Les défenseurs centraux contournent l'écran. L'arrière gauche redouble la passe avec l'arrière droit.",
              courses: { ArD: [3.0, 10.4] },
              passe: ['ArG', 'ArD', 0.3],
              def: { G3: [-1.8, 8.2], D3: [2.0, 8.0] },
            },
            {
              texte: "L'arrière droit remet aussitôt au tireur. Les deux joueurs de la protection bloquent les défenseurs qui reviennent.",
              courses: { Piv: { vers: [-1.2, 9.1], ecran: true }, DC: { vers: [1.4, 9.0], ecran: true } },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche tire en suspension, protégé par le blocage.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '2 - Göppingen (passe à un joueur écarté aux 6 m)',
          etapes: [
            {
              texte: "Suspension protégée: le demi-centre passe à l'arrière gauche, lancé derrière les deux joueurs de la protection, qui reculent et font écran. Les deux ailiers sont écartés aux 6 m.",
              courses: { Piv: [-0.7, 9.8], DC: [0.7, 9.8], ArG: [-0.1, 11.0] },
              passe: ['DC', 'ArG', 0.1],
              def: { G3: [-1.2, 7.2], D3: [1.2, 7.2] },
            },
            {
              texte: "L'arrière gauche feinte le tir: les défenseurs se resserrent vers lui. Il passe à l'ailier gauche, écarté aux 6 m, en contournant le mur des défenseurs.",
              courses: { AiG: [-6.6, 4.6] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G3: [-1.6, 7.8], G2: [-3.0, 7.4], G1: [-4.8, 6.2] },
            },
            {
              texte: "L'ailier gauche tire.",
              tir: 'AiG',
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'jf-rapide-pivot',
      nom: 'Jet franc joué vite autour du pivot',
      alias: '"Le jet franc" (D. Chastel)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Toutes (défenseurs à 3 m)',
      resume: "Le pivot prend le ballon après la faute et le donne à un arrière lancé: profondeur derrière son écran, ou jeu autour de lui si la défense est mal replacée.",
      description: [
        "Damien Chastel: le pivot peut être le dépositaire d'un jeu rapide sur jet franc. Après la faute, un arrière prend le ballon en course, près du pivot, et vite.",
        "Deux usages: 1. exploiter la profondeur, en courant sur le pivot qui fait écran et empêche des défenseurs de sortir (ils ont déjà 3 m de retard); 2. exploiter une défense mal replacée par un jeu autour du pivot.",
        "La source ne donne que le principe: les placements et les fins sont interprétés.",
      ],
      objectif: "Profiter des 3 m de retard des défenseurs sur un jet franc joué tout de suite.",
      pointsCles: [
        "Jouer vite, avant que la défense se replace.",
        "Le pivot remet le ballon à un arrière lancé, puis fait écran ou retourne au poste.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 3)", Approches du Handball n°180 (2020), p. 33',
          url: 'https://www.calameo.com/ffhandball/read/007275111d4146e734217?page=26',
          note: "\"le pivot peut être dépositaire d'un jeu rapide sur jet franc: Pour exploiter la profondeur (écran)\"; ou une organisation défensive mal replacée, par un jeu autour du pivot.",
        },
      ],
      ballon: 'Piv',
      depart: { Piv: [-1.0, 9.2], ArG: [-3.6, 11.0], DC: [1.6, 11.0], G2: [-4.2, 6.4], G3: [-1.4, 6.2], D3: [1.6, 6.4] },
      variantes: [
        {
          nom: "1 - Profondeur derrière l'écran du pivot",
          etapes: [
            {
              texte: "Faute sifflée: le pivot prend le ballon et le joue tout de suite. L'arrière gauche arrive en course tout près de lui; le pivot lui donne le ballon.",
              courses: { ArG: [-1.6, 10.4] },
              passe: ['Piv', 'ArG', 0.6],
            },
            {
              texte: "Le pivot fait écran sur le 3 gauche, déjà à 3 m: il ne peut pas sortir. L'arrière gauche file en profondeur à côté de l'écran.",
              courses: { Piv: { vers: [-1.2, 7.3], ecran: true }, ArG: { vers: [-2.6, 7.4], via: [-2.8, 9.6] } },
              def: { G2: [-3.9, 6.6] },
            },
            {
              texte: "L'arrière gauche tire.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '2 - Jeu autour du pivot, défense mal replacée',
          depart: { D3: [2.8, 8.6] },
          etapes: [
            {
              texte: "Faute sifflée: la défense n'est pas replacée (le 3 droit est encore loin). Le pivot donne tout de suite au demi-centre.",
              courses: { DC: [1.4, 10.0] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le pivot redescend aux 6 m, dans le trou laissé par le 3 droit. Le demi-centre attaque l'intervalle; le 3 gauche sort sur lui.",
              courses: { Piv: { vers: [0.8, 6.4], via: [-0.4, 7.8] }, DC: [0.6, 8.6] },
              def: { D3: [2.0, 7.4], G3: [-0.6, 7.4] },
            },
            {
              texte: "Le demi-centre sert le pivot.",
              passe: ['DC', 'Piv', 0.3],
            },
            {
              texte: "Le pivot tire.",
              tir: 'Piv',
            },
          ],
        },
      ],
    },

    /* ================================================================ */
    /* 7 CONTRE 6: ORGANISATIONS                                       */
    /* ================================================================ */
    {
      id: 'sept-contre-six-organisations',
      nom: '7 contre 6: organisations (chacun son intervalle, Danemark, trois binômes, Belgique)',
      alias: '"Jeu 7 x 6" (Centre-Val de Loire); 3 binômes arrière / pivot (Allemagne U21)',
      categorie: 'Supériorité numérique',
      defense: '0-6 (7 contre 6)',
      resume: "Quatre façons d'organiser le 7 contre 6 contre une 0-6: deux pivots et un intervalle par joueur, 2 contre 2 enchaînés, trois binômes arrière-pivot, centre libéré pour le demi-centre.",
      description: [
        "\"Chacune son intervalle\" (Centre-Val de Loire, interligues féminins, Approches n°178): une pivot entre la n°1 et la n°2 à gauche, en appui sur la n°1; l'autre entre la n°2 et la n°3 à droite, en appui sur la n°2. Chaque attaquante respecte son intervalle et le traverse; les pivots empêchent le flottement. Antilles-Guyane et Nouvelle-Aquitaine l'ont aussi utilisé.",
        "Gilles Malfondet (Approches n°175) analyse trois organisations. Danemark, finale des JO 2016: deux pivots, l'un entre les n°1 et n°2, l'autre entre les n°2 et n°3 à l'opposé; jouer des 2 contre 2 ou 3 contre 3 en aspirant un défenseur, libérer la balle sur un autre 2 contre 2 qui crée un 1 contre 0, donner au joueur non pris en charge (par exemple le pivot), renverser si le défenseur a passé le milieu. Exemple: un 2 contre 2 à gauche avec Hansen.",
        "Allemagne, Mondial juniors 2016: trois joueurs de base arrière et trois pivots, en trois binômes arrière-pivot (extérieur gauche, centre, extérieur droit), plus un joueur isolé. On fixe des 2 contre 2 et on libère la balle sur le joueur resté seul; la passe au pivot doit rester une vraie menace. Belgique contre France (novembre 2016): deux pivots à l'intérieur des n°2; trois attaquants de chaque côté occupent trois défenseurs et libèrent le centre pour le demi-centre ou les pivots; quand les centraux ferment le centre, le demi-centre, qui joue \"horizontal\" près de la défense, sert directement l'ailier ou renverse.",
        "Les sources donnent placements et principes, pas de déroulement pas à pas: les schémas en montrent une application, interprétée. Dans chaque variante, le 7e joueur de champ (J7) joue pivot.",
      ],
      objectif: "Utiliser le joueur en plus pour créer un joueur libre, sans perdre le ballon.",
      pointsCles: [
        "Deux pivots placés pour empêcher le flottement des défenseurs.",
        "Fixer un 2 contre 2, puis libérer la balle vers le joueur resté seul.",
        "Belgique: le demi-centre joue près de la défense, à l'horizontale, et sert l'extérieur en surnombre.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 1)", Approches du Handball n°178 (2020), p. 27',
          url: 'https://www.calameo.com/ffhandball/read/00727511165bc273357a9?page=27',
          note: '"ENCLENCHEMENT Jeu 7 x 6 sur une 0-6": chaque attaquante respecte son intervalle; les pivots empêchent le flottement (Centre-Val de Loire, 33 fois pour 19 tirs favorables).',
        },
        {
          titre: 'G. Malfondet, "Le jeu à 7 joueurs de champ contre 6 défenseurs, en attaque et en défense", Approches du Handball n°175 (novembre 2019), p. 48-62',
          url: 'https://www.calameo.com/ffhandball/read/007275111bdb91e2c432d?page=48',
          note: "\"Jeu à 3 joueurs sur la base arrière et 3 pivots avec un joueur isolé. Pratiquée lors du Mondial Juniors de 2016 par l'Allemagne\"; Danemark (JO 2016) et Belgique (2016).",
        },
      ],
      ballon: 'DC',
      depart: { J7: [3.6, 6.3] },
      variantes: [
        {
          nom: '1 - Chacun son intervalle (Centre-Val de Loire)',
          depart: { Piv: [-6.8, 3.6], J7: [3.6, 6.3] },
          etapes: [
            {
              texte: "Un pivot entre le 1 et le 2 gauches, en appui sur le 1; le 7e joueur, pivot droit, entre le 3 et le 2 droits, en appui sur le 2. Chacun fait face à son intervalle. Le demi-centre attaque l'intervalle entre les deux 3.",
              courses: { DC: [0, 9.0] },
              def: { G3: [-0.8, 7.6], D3: [0.8, 7.6] },
            },
            {
              texte: "Il donne à l'arrière droit, qui attaque son intervalle, entre le 3 et le 2 droits. Le pivot droit tient le 2: il ne peut pas aider.",
              courses: { ArD: [3.0, 8.4], J7: { vers: [4.2, 6.0], ecran: true } },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [5.0, 5.3], D3: [1.6, 7.6] },
            },
            {
              texte: "L'arrière droit traverse l'intervalle et tire.",
              courses: { ArD: [2.8, 7.2] },
              tir: { par: 'ArD', t: 0.7 },
            },
          ],
        },
        {
          nom: '2 - 2 contre 2 enchaînés (Danemark, JO 2016)',
          depart: { Piv: [-6.8, 3.6], J7: [3.6, 6.3] },
          etapes: [
            {
              texte: "Même placement des deux pivots. Le demi-centre donne à l'arrière gauche, qui joue un 2 contre 2 avec le pivot gauche: il attaque le 2 gauche et aspire le 3 gauche.",
              courses: { ArG: [-4.8, 8.2] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-4.6, 6.6], G3: [-2.8, 7.2] },
            },
            {
              texte: "Il libère la balle vers le demi-centre, qui attaque l'espace laissé par le 3 gauche. Le 3 droit glisse sur lui.",
              courses: { DC: [-1.0, 8.6] },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [0.2, 7.4] },
            },
            {
              texte: "Le pivot droit n'est plus pris en charge: le demi-centre le sert.",
              passe: ['DC', 'J7', 0.3],
            },
            {
              texte: "Le pivot droit tire.",
              tir: 'J7',
            },
          ],
        },
        {
          nom: '3 - Trois binômes arrière-pivot (Allemagne U21)',
          depart: { AiG: [-6.6, 4.0], Piv: [0, 6.4], J7: [6.4, 4.2], AiD: [9.6, 0.4] },
          etapes: [
            {
              texte: "Trois binômes: arrière gauche et ailier gauche passé pivot, demi-centre et pivot, arrière droit et 7e joueur en pivot droit. L'ailier droit reste isolé à l'aile. Le demi-centre fixe les deux 3 avec son pivot.",
              courses: { DC: [0, 9.0] },
              def: { G3: [-0.9, 7.5], D3: [0.9, 7.5] },
            },
            {
              texte: "Le ballon passe au binôme droit: l'arrière droit et son pivot fixent le 2 et le 1 droits.",
              courses: { ArD: [5.0, 8.2] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [4.8, 6.6], D1: [7.4, 3.2] },
            },
            {
              texte: "Le 1 droit reste sur le pivot: l'arrière droit libère la balle vers l'ailier droit, resté seul.",
              passe: ['ArD', 'AiD', 0.3],
            },
            {
              texte: "L'ailier droit tire.",
              tir: 'AiD',
            },
          ],
        },
        {
          nom: '4 - Centre libéré pour le demi-centre (Belgique 2016)',
          depart: { Piv: [-3.6, 6.3], J7: [3.6, 6.3] },
          etapes: [
            {
              texte: "Deux pivots à l'intérieur des 2. De chaque côté, trois attaquants occupent trois défenseurs: le centre est libre. Le demi-centre attaque le centre.",
              courses: { DC: [0, 8.8] },
              def: { G3: [-0.8, 7.4], D3: [0.8, 7.4] },
            },
            {
              texte: "Les centraux ferment le centre. Le demi-centre glisse à l'horizontale vers la droite, près de la défense. Le 1 droit monte sur l'arrière droit.",
              courses: { DC: [2.2, 8.6], ArD: [5.8, 9.0] },
              def: { D3: [2.0, 7.6], D2: [4.6, 6.0], D1: [6.6, 5.4] },
            },
            {
              texte: "L'extérieur est en surnombre: passe directe du demi-centre à l'ailier droit.",
              passe: ['DC', 'AiD', 0.3],
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
    /* INFÉRIORITÉ NUMÉRIQUE (FFHB)                                     */
    /* ================================================================ */
    {
      id: 'inferiorite-ffhb',
      nom: "Infériorité: croisé d'arrières et entrée du pivot placé à l'aile",
      alias: '"Croisé arrière - arrière associé à une rentrée d\'ailière quand l\'attaque est à 5 joueuses" (Pays de la Loire)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (5 contre 6)',
      resume: "À 5, le pivot part de l'aile; il entre entre le 2 et le 3 au moment du croisé des arrières, puis glisse dans le dos des défenseurs sortis.",
      description: [
        "Enclenchement de la sélection féminine des Pays de la Loire aux interligues (4 fois, pour 2 situations favorables), relevé par Damien Chastel quand l'attaque est à 5 joueuses. La pivot est placée au départ à l'aile.",
        "Sur la passe de la demi-centre, l'arrière droite croise avec l'arrière gauche; la demi-centre se replace arrière droite. Au moment du croisé, la pivot entre entre la n°2 et la n°3. Les défenseures sortent sur le danger du croisé (côté bras, secteur central): la pivot glisse dans l'espace libre, dans leur dos.",
        "L'aile d'où part la pivot n'est pas précisée: ici l'aile gauche, l'ailière gauche étant absente. Pour la rentrée en 2e pivot d'une arrière portant la chasuble (jeu à 6 sans gardienne), voir la fiche voisine \"Infériorité: rentrée en 2e pivot de l'arrière à chasuble\".",
      ],
      objectif: "Recréer un pivot à 5 contre 6 et le libérer dans le dos des défenseurs attirés par le croisé.",
      pointsCles: [
        "L'entrée de la pivot se fait au moment du croisé, pas avant.",
        "Le croisé doit être menaçant au centre, côté bras, pour faire sortir les défenseurs.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'D. Chastel, "Le jeu des pivots en relation avec les arrières (partie 2)", Approches du Handball n°179 (2020), p. 24',
          url: 'https://www.calameo.com/ffhandball/read/007275111bfe7378958a5?page=24',
          note: "\"ENCLENCHEMENT Croisé arrière - arrière associé à une rentrée d'ailière quand l'attaque est à 5 joueuses\" (Pays de la Loire, 4 fois / 2).",
        },
      ],
      absents: ['AiG'],
      ballon: 'DC',
      depart: { Piv: [-9.0, 1.2] },
      etapes: [
        {
          texte: "La pivot attend à l'aile gauche. La demi-centre passe à l'arrière droite, qui attaque en diagonale vers le centre.",
          courses: { ArD: [1.0, 9.0] },
          passe: ['DC', 'ArD', 0.1],
        },
        {
          texte: "Croisé: l'arrière droite continue vers la gauche, l'arrière gauche passe dans son dos et reçoit. La demi-centre se replace arrière droite. Au même moment, la pivot entre entre la 2 et la 3 gauches.",
          courses: {
            ArD: [-1.8, 8.6],
            ArG: { vers: [1.8, 9.0], via: [-1.0, 10.8] },
            DC: [5.4, 9.8],
            Piv: { vers: [-3.4, 6.4], via: [-7.0, 5.0] },
          },
          passe: ['ArD', 'ArG', 0.55],
        },
        {
          texte: "Les défenseures sortent sur le danger du croisé, au centre. La pivot glisse dans l'espace libre, dans leur dos; l'arrière gauche la sert.",
          courses: { Piv: [0, 6.3] },
          passe: ['ArG', 'Piv', 0.6],
          def: { G3: [-1.4, 7.6], D3: [1.8, 7.6] },
        },
        {
          texte: "La pivot tire.",
          tir: 'Piv',
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 'inferiorite-ffhb-chasuble',
      nom: "Infériorité: rentrée en 2e pivot de l'arrière à chasuble",
      alias: '"Le jeu en infériorité numérique" (Approches du Handball n°123)',
      categorie: 'Infériorité numérique',
      defense: '0-6 (6 joueurs de champ sans gardien)',
      resume: "En infériorité, un joueur de champ à chasuble remplace le gardien: l'arrière gauche à chasuble rentre en 2e pivot pendant que le pivot glisse entre les deux 3.",
      description: [
        "Séance \"Le jeu en infériorité numérique\" (Approches du Handball n°123, 2011). L'équipe en infériorité joue à 5 joueurs de champ plus un joueur de champ à chasuble à la place du gardien, contre une 0-6 de zone.",
        "Sur sa passe à la demi-centre, l'arrière gauche (qui porte la chasuble) rentre en 2e pivot entre le n°1 et le n°2. Pendant ce temps, le pivot glisse entre les deux n°3. Puis le jeu continue. Objectif: conserver le ballon le plus longtemps possible sans le perdre.",
        "La source ne décrit pas de fin: le schéma s'arrête sur la continuité du jeu, sans tir. La position de départ du pivot est interprétée. Voir aussi la fiche voisine \"Infériorité: croisé d'arrières et entrée du pivot placé à l'aile\" (même rubrique FFHB, attaque à 5).",
      ],
      objectif: "Garder le ballon longtemps en infériorité, avec deux pivots qui occupent la défense.",
      pointsCles: [
        "La rentrée de l'arrière à chasuble et le glissement du pivot sont simultanés.",
        "Priorité à la conservation du ballon.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: '"Le jeu en infériorité numérique", Approches du Handball n°123 (mai 2011), p. 35-36',
          url: 'https://www.calameo.com/ffhandball/read/007275111f24bda918911?page=35',
          note: "\"sur la passe de l'arrière gauche (chasuble) à la demi-centre, l'arrière gauche rentre en 2e pivot entre les n°1 et n°2. Pendant ce temps le pivot glisse entre les deux n°3\"",
        },
      ],
      ballon: 'ArG',
      depart: { Piv: [3.2, 6.5] },
      etapes: [
        {
          texte: "L'arrière gauche, qui porte la chasuble, passe à la demi-centre et rentre en 2e pivot entre le 1 et le 2 gauches. En même temps, le pivot glisse entre les deux 3.",
          courses: { ArG: { vers: [-6.6, 4.2], via: [-6.4, 7.6] }, Piv: { vers: [0, 6.3], via: [1.8, 7.0] } },
          passe: ['ArG', 'DC', 0.1],
        },
        {
          texte: "Continuité du jeu: la demi-centre fixe entre les deux 3 et passe à l'arrière droite. Le but est de garder le ballon le plus longtemps possible sans le perdre.",
          courses: { DC: [0.2, 9.0] },
          passe: ['DC', 'ArD', 0.7],
          def: { G3: [-1.1, 7.4], D3: [1.1, 7.4] },
        },
      ],
    },
  );
})();
