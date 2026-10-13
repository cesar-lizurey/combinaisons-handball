/* contre 3-2-1 (forums et fiches allemands), contre 4-2, tireur pressé, modèles espagnols contre 6-0, défense individuelle, Wallau. */
(() => {
  const SRC_FORUM_321 = {
    titre: 'Wie knackt man eine 3:2:1-Deckung? (forum handballecke.de)',
    url: 'https://www.handballecke.de/forum/thread/20846-wie-knackt-man-eine-3-2-1-deckung/',
  };
  const SRC_HANDBALLHAUS_UEBERGANG = {
    titre: 'handballhaus.de, rubrique "Übergang" (archive)',
    url: 'https://web.archive.org/web/20100411222737/http://www.handballhaus.de/handball/angriffstaktik/uebergang.html',
  };

  const SRC_ROMAN_2005 = {
    titre: 'J. D. Román Seco, Conceptos de ataque frente a variantes defensivas 6:0 y 5:1 (e-balonmano.com, 2005)',
    url: 'https://dialnet.unirioja.es/descarga/articulo/1371312.pdf',
  };
  const SRC_ROMAN_2008 = {
    titre: 'J. D. Román Seco, Táctica colectiva grupal en ataque: los modelos en el balonmano español (e-balonmano.com, 2008)',
    url: 'https://www.fmbalonmano.com/uploads/noticias/eleccionprocedimientostacticos.pdf',
  };

  const BASE_2_4 = [
    {
      texte: "L'arrière gauche fixe près de la touche, sans se faire attraper. L'avancé gauche le suit et s'excentre.",
      courses: { ArG: [-7.2, 8.8] },
      def: { G3: [-5.6, 8.6] },
    },
    {
      texte: "Il passe au demi-centre, qui joue entre les deux avancés en gardant de la profondeur. L'avancé droit se resserre sur lui.",
      courses: { DC: [0.4, 10.0] },
      passe: ['ArG', 'DC', 0.2],
      def: { D3: [1.4, 9.2], G3: [-3.4, 9.0] },
    },
    {
      texte: "L'arrière droit fixe entre le 2 et le 1 droits, à l'opposé, et reçoit du demi-centre.",
      courses: { ArD: [6.0, 8.2] },
      passe: ['DC', 'ArD', 0.3],
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'francaise-3-2-1',
      nom: '"Action française" contre 3-2-1',
      alias: 'französische Angriffshandlung (DE)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Ballon à l'ailier gauche: le demi-centre et l'arrière gauche croisent sans ballon pendant que l'arrière droit rentre en diagonale vers les 6 m.",
      description: [
        "Action décrite sur un forum allemand par un entraîneur qui l'a vue dans la revue handballtraining, sous le nom d'\"action d'attaque française\". Elle vise une défense 3-2-1.",
        "Le ballon est à l'ailier gauche. Le demi-centre et l'arrière gauche croisent sans ballon. Au même moment, l'arrière droit rentre en diagonale vers les 6 m et devient un second pivot. L'ailier sert le demi-centre, arrivé au poste d'arrière gauche; l'ancien arrière gauche glisse jusqu'au poste d'arrière droit.",
        "La source s'arrête à cette mise en place: la fin montrée (tir du demi-centre entre le 2 et le 1) n'est qu'un exemple. Le placement exact des courses n'est pas précisé.",
      ],
      objectif: "Changer les vis-à-vis des demi-avancés et passer en deux pivots sans perdre le ballon.",
      pointsCles: [
        "Le croisé sans ballon et la rentrée de l'arrière droit partent ensemble.",
        "L'ailier ne passe qu'une fois le demi-centre arrivé au poste d'arrière gauche.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Angriff gegen eine 3-2-1 Abwehr (forum handballecke.de, post #3, 2009)',
          url: 'https://www.handballecke.de/forum/thread/23134-angriff-gegen-eine-3-2-1-abwehr/',
          note: '"Ball LA. RM und RL kreuzen ohne Ball und zu diesem Zeitpunkt läuft RR diagonal ein. RM (jetzt RL) wird von LA angespielt und RL verschiebt auf die RR Position."',
        },
      ],
      ballon: 'AiG',
      etapes: [
        {
          texte: "Le ballon est à l'ailier gauche. Le demi-centre et l'arrière gauche croisent sans ballon: le demi-centre part vers le poste d'arrière gauche, l'arrière gauche passe derrière lui vers le centre. Au même moment, l'arrière droit rentre en diagonale vers les 6 m.",
          courses: {
            DC: { vers: [-5.0, 9.4], via: [-2.6, 9.0] },
            ArG: { vers: [-0.6, 10.4], via: [-3.0, 10.8] },
            ArD: { vers: [2.6, 7.0], via: [4.6, 8.4] },
          },
          def: { D2: [3.6, 6.8], D3: [-0.4, 9.3] },
        },
        {
          texte: "L'ailier gauche sert le demi-centre, devenu arrière gauche. L'ancien arrière gauche continue et glisse vers le poste d'arrière droit.",
          courses: { ArG: [4.6, 9.8] },
          passe: ['AiG', 'DC', 0.2],
          def: { G2: [-4.8, 8.2], D3: [0.6, 9.2] },
        },
        {
          texte: "Exemple de fin (non décrite par la source): le demi-centre attaque l'intervalle entre le 2 et le 1 gauches et tire.",
          courses: { DC: [-6.0, 8.0] },
          def: { G2: [-5.2, 7.6], G1: [-7.0, 4.0] },
          tir: { par: 'DC', t: 0.6 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rakete',
      nom: 'Fusée',
      alias: 'Rakete (DE)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Un arrière rentre au pivot et emmène un défenseur vers l'arrière; juste avant, le demi-centre et l'autre arrière lancent un croisé.",
      description: [
        "\"Rakete\" (fusée) est proposée sur un forum allemand contre la 3-2-1. Un des deux arrières rentre au pivot et entraîne, au moins un instant, un défenseur vers l'arrière. Juste avant, le demi-centre et l'autre arrière lancent un croisé. L'arrière qui croise arrive par le centre, vers l'autre demi-côté: il tire en suspension ou sert l'un des deux pivots.",
        "Un autre intervenant prévient qu'elle ne marche que contre une 3-2-1 mal réglée: le demi-avancé doit accompagner l'entrant et le central doit glisser vers le nouveau pivot.",
        "Variante 2: enclenchement voisin proposé par un entraîneur (Coach-DM, même type de fil): le demi-centre va chercher l'arrière droit en croisé; l'arrière droit feinte la passe vers l'arrière gauche qui arrive, puis rend au demi-centre; l'arrière gauche rentre vite au pivot; le demi-centre et l'arrière droit percutent en parallèle. La fin n'est pas précisée: celle montrée est un exemple.",
        "Le côté de l'entrant et la position des courses ne sont pas fixés par les sources.",
      ],
      objectif: "Créer un 2e pivot et attaquer la 3-2-1 au moment où elle doit se réorganiser.",
      pointsCles: [
        "Le croisé part juste avant la rentrée de l'arrière.",
        "L'arrière qui croise arrive lancé par le centre.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_FORUM_321, note: "Posts #18 et #19: un arrière \"läuft ein\" et emmène un défenseur; juste avant, RM et l'autre arrière croisent; l'arrière qui croise tire en suspension ou sert un des deux pivots." },
        {
          titre: 'Angriff gegen eine 3-2-1 Abwehr (forum handballecke.de, post #11, Coach-DM)',
          url: 'https://www.handballecke.de/forum/thread/23134-angriff-gegen-eine-3-2-1-abwehr/',
          note: '"RM holt RR, RR macht Passtäuschung zum anlaufenden RL, bricht ab und passt zum RM (jetzt auf RR) während RL zügig an den Kreis einläuft. RM stößt nach innen, RR parallel mit." (variante 2).',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Fusée',
          etapes: [
            {
              texte: "L'arrière droit rentre au pivot entre le 2 et l'avancé droits et emmène le 2 droit vers l'arrière. Juste avant, le demi-centre attaque vers la gauche avec le ballon pour lancer le croisé.",
              courses: { ArD: { vers: [3.0, 6.8], via: [4.6, 8.0] }, DC: [-2.4, 9.0] },
              def: { D2: [4.0, 6.3], G2: [-3.4, 7.8], D3: [-1.2, 9.4] },
            },
            {
              texte: "L'arrière gauche croise derrière le demi-centre et reçoit le ballon. Il arrive lancé par le centre, vers le demi-côté droit.",
              courses: { ArG: { vers: [1.2, 8.8], via: [-2.8, 10.4] }, DC: [-3.0, 8.4] },
              passe: ['DC', 'ArG', 0.5],
              def: { D3: [-0.6, 9.0], G2: [-3.6, 7.4] },
            },
            {
              texte: "L'arrière gauche tire en suspension. Si le 3 ou le 2 sort sur lui, il sert l'un des deux pivots (le pivot ou l'arrière droit rentré).",
              def: { G3: [0.0, 7.4] },
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '2 - Croisé demi-centre-arrière droit (Coach-DM)',
          etapes: [
            {
              texte: "Le demi-centre va chercher l'arrière droit: il attaque vers la droite avec le ballon. L'arrière droit croise derrière lui et reçoit au centre.",
              courses: { DC: [2.6, 9.0], ArD: { vers: [-0.4, 9.8], via: [3.4, 10.6] } },
              passe: ['DC', 'ArD', 0.55],
              def: { D3: [1.6, 9.6], D2: [3.6, 7.8] },
            },
            {
              texte: "L'arrière droit feinte une passe vers l'arrière gauche qui arrive, s'arrête et rend au demi-centre, maintenant au poste d'arrière droit. L'arrière gauche rentre vite au pivot.",
              courses: { ArG: { vers: [-2.8, 6.8], via: [-2.0, 8.8] }, DC: [4.6, 9.4], ArD: [-0.2, 9.4] },
              passe: ['ArD', 'DC', 0.6],
              def: { G2: [-3.6, 7.2] },
            },
            {
              texte: "Le demi-centre percute vers l'intérieur; l'arrière droit percute en parallèle.",
              courses: { DC: [3.0, 8.4], ArD: [0.8, 8.6] },
              def: { D2: [3.4, 7.2], D3: [1.8, 8.0] },
            },
            {
              texte: "Exemple de fin: le demi-centre attire le 2 et l'avancé, puis donne à l'arrière droit.",
              passe: ['DC', 'ArD', 0.2],
              def: { D3: [2.2, 8.2] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'innensperre-halb',
      nom: 'Écran intérieur sur le demi-avancé',
      alias: 'Innensperre gegen Halbverteidiger (DE)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Le pivot pose un écran à l'intérieur du demi-avancé: l'arrière se décale le long de l'écran et tire de loin, ou le pivot feinte l'écran et se laisse retomber.",
      description: [
        'Moyen proposé sur un forum allemand pour attaquer la 3-2-1: un écran du pivot sur la face intérieure du demi-avancé (le "2" de la 3-2-1).',
        "Version simple: le ballon vient de l'ailier; le pivot pose l'écran intérieur; l'arrière tire de loin ou passe. Version avancée: passe du demi-centre; l'arrière percute d'abord vers l'extérieur (feinte), le pivot s'installe à l'intérieur du demi, puis l'arrière change de direction vers le centre et tire ou passe. Si le central et le demi coopèrent pour fermer l'intérieur, l'arrière perce vers l'extérieur.",
        "Faux écran: le pivot fait seulement mine de poser l'écran; le central sort, et le pivot se laisse retomber dans l'espace libre, prêt à recevoir.",
      ],
      objectif: "Empêcher le demi-avancé de glisser vers l'intérieur pour libérer le tir de loin.",
      pointsCles: [
        "L'écran se pose sur la face intérieure du demi.",
        "La feinte vers l'extérieur attire le demi avant le changement de direction.",
        "Si le central sort pour couvrir, le pivot devient libre.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_FORUM_321, note: "Post #7: \"KM täuscht die Sperre nur an, HM tritt heraus und KM sinkt in den freien Raum anspielbereit zurück\" (faux écran); versions simple et avancée de l'écran intérieur." },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Simple, ballon venu de l'ailier",
          ballon: 'AiG',
          etapes: [
            {
              texte: "L'ailier gauche passe à l'arrière gauche. Le pivot vient poser un écran à l'intérieur du 2 gauche, le demi-avancé.",
              courses: { Piv: { vers: [-3.4, 7.4], via: [-1.6, 7.0], ecran: true } },
              passe: ['AiG', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche se décale vers l'intérieur, le long de l'écran. Le 2 est bloqué et ne peut pas glisser.",
              courses: { ArG: [-3.2, 9.4] },
              def: { G2: [-4.6, 8.0], D3: [-1.4, 9.2] },
            },
            {
              texte: "L'arrière gauche tire de loin. S'il est gêné, il passe.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: "2 - Avancée: feinte vers l'extérieur",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche, qui percute vers l'extérieur en feintant de déborder. Le 2 gauche le suit. Le pivot vient se placer à l'intérieur du 2.",
              courses: { ArG: [-6.2, 8.8], Piv: { vers: [-4.5, 7.1], via: [-2.0, 6.8], ecran: true } },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-5.4, 7.6] },
            },
            {
              texte: "L'arrière gauche change de direction vers le centre et passe à l'intérieur de l'écran. Le 2 reste bloqué; l'avancé et le central viennent tard.",
              courses: { ArG: { vers: [-3.0, 9.0], via: [-5.0, 9.6] } },
              def: { D3: [-1.6, 9.2], G3: [-1.6, 7.0] },
            },
            {
              texte: "L'arrière gauche tire. Si l'avancé ou le central ferme, il passe.",
              tir: 'ArG',
            },
          ],
        },
        {
          nom: '3 - Faux écran',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche. Le pivot part comme pour poser l'écran intérieur sur le 2 gauche.",
              courses: { Piv: { vers: [-3.4, 7.2], via: [-1.6, 6.8] }, ArG: [-5.0, 9.0] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "Le central sort pour couvrir. Le pivot ne pose pas l'écran: il se laisse retomber dans l'espace libéré par le central.",
              courses: { Piv: [-1.6, 6.5] },
              def: { G3: [-2.4, 7.8] },
            },
            {
              texte: "L'arrière gauche sert le pivot.",
              passe: ['ArG', 'Piv', 0.2],
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ruckfuhren',
      nom: 'Retour du 2:4 au 3:3 dans le dos de la défense',
      alias: 'Umgekehrtes Auflösen, Rückführen (DE)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1 (qui reste en 3-2-1 contre deux pivots)',
      dispositif: '3-2-1',
      resume: "En 2:4, le pivot droit se glisse dans le dos de la défense jusqu'au poste d'arrière droit, pendant que l'arrière droit glisse au centre.",
      description: [
        "Idée attribuée à Peter Feddern (revue handballtraining), citée sur un forum allemand: contre une 3-2-1 qui ne change pas de système face à deux pivots, l'attaque revient en 3:3, mais par le dos de la défense.",
        "Déclencheur: le ballon est à gauche et l'arrière gauche joue la passe, d'habitude non jouée, à l'ailier gauche, qui lui rend. L'arrière gauche ne menace que le côté gauche. Pendant ce temps, le pivot droit se glisse dans le dos de la défense jusqu'au poste d'arrière droit. L'ancien arrière droit glisse sans ballon au centre, se rend dangereux et passe au nouvel arrière droit, qui n'a devant lui qu'un défenseur sorti de son poste habituel.",
        "Fins: tir de loin, élargissement vers l'ailier droit ou 2 contre 2 côté droit. Ici le second pivot est le demi-centre, passé pivot plus tôt (choix d'exemple).",
      ],
      objectif: "Recréer un arrière là où la défense ne l'attend pas.",
      pointsCles: [
        '"Das Rückführen sollte deswegen so erfolgversprechend sein, weil es im Rücken der Abwehr passiert."',
        "L'arrière gauche fixe à gauche sans chercher le centre.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_FORUM_321, note: "Posts #14 et #16: le pivot droit \"schleicht\" dans le dos de la défense jusqu'au poste RR; l'ancien RR glisse sans ballon en RM et sert le nouveau RR." },
      ],
      ballon: 'ArG',
      depart: { DC: [2.8, 6.6], Piv: [-2.4, 6.6], ArG: [-3.6, 9.8], ArD: [3.6, 9.8] },
      etapes: [
        {
          texte: "Départ en 2:4 (le demi-centre est pivot droit). Le ballon est joué à gauche: l'arrière gauche passe à l'ailier gauche, une passe qu'on ne joue d'habitude pas.",
          passe: ['ArG', 'AiG', 0.2],
          def: { G1: [-7.8, 2.4] },
        },
        {
          texte: "L'ailier rend à l'arrière gauche, qui ne menace que le côté gauche. Pendant ce temps, le pivot droit se glisse dans le dos de la défense jusqu'au poste d'arrière droit.",
          courses: { ArG: [-4.8, 9.0], DC: { vers: [6.2, 9.0], via: [6.4, 5.8] } },
          passe: ['AiG', 'ArG', 0.1],
          def: { G2: [-4.8, 8.0] },
        },
        {
          texte: "L'ancien arrière droit glisse sans ballon au centre. L'arrière gauche lui passe; il se rend dangereux au centre.",
          courses: { ArD: [0.6, 10.2] },
          passe: ['ArG', 'ArD', 0.5],
          def: { D3: [0.6, 9.2], D2: [4.2, 7.2] },
        },
        {
          texte: "Il donne au nouvel arrière droit. Devant lui, le 2 droit est hors de son poste habituel.",
          passe: ['ArD', 'DC', 0.2],
          def: { D2: [5.2, 7.8] },
        },
        {
          texte: "Le nouvel arrière droit tire de loin. Autres fins: élargir vers l'ailier droit, ou jouer à deux contre deux côté droit.",
          tir: 'DC',
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mitte-lost-ohne-ball',
      nom: "Le demi-centre passe pivot hors de la vue de l'avancé",
      alias: 'Mitte löst ohne Ball (DE, handballhaus)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Pendant que le ballon circule vers la droite, le demi-centre passe pivot à gauche sans être vu; une passe éclair lance l'arrière gauche, qui ouvre l'espace dans le dos du demi-avancé.",
      description: [
        "Fiche du site allemand handballhaus (rubrique \"Übergang\", passages au pivot). Le ballon circule de l'arrière gauche à l'ailier droit. Le demi-centre passe pivot à gauche, hors du champ de vision de l'avancé, qui regarde le ballon.",
        "Le ballon revient vite: l'ailier droit rend à l'arrière droit, qui envoie une passe éclair à l'arrière gauche. Celui-ci percute vers l'intérieur pour ouvrir l'espace derrière le demi-avancé gauche. Il sert le demi-centre au pivot, ou l'ailier gauche si le 1 gauche gêne.",
        "Texte court (l'animation d'origine n'a pas été vue): le placement exact du demi-centre est une interprétation.",
      ],
      objectif: "Créer un pivot que l'avancé n'a pas vu partir.",
      pointsCles: [
        "Le demi-centre part quand l'avancé regarde le ballon.",
        "La circulation retour doit être rapide (passe éclair qui saute le centre).",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_HANDBALLHAUS_UEBERGANG, note: "\"Mitte löst ohne Ball\": passes RL-RM-RR-RA; RM passe pivot gauche hors de la vue de VM; accélération RA-RR-RL; \"Blitzpass\" à RL qui ouvre l'espace derrière HR; passe à RM au pivot ou à LA." },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Passe au demi-centre pivot',
          etapes: [
            { texte: "L'arrière gauche passe au demi-centre.", passe: ['ArG', 'DC', 0.1] },
            {
              texte: "Le demi-centre passe à l'arrière droit. L'avancé suit le ballon des yeux.",
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [1.4, 9.4] },
            },
            {
              texte: "L'arrière droit donne à l'ailier droit. Hors du champ de vision de l'avancé, le demi-centre passe pivot à gauche, entre le central et le 2 gauche.",
              courses: { DC: { vers: [-3.0, 6.8], via: [-1.6, 9.0] } },
              passe: ['ArD', 'AiD', 0.1],
              def: { D3: [2.4, 9.2], D1: [7.8, 2.2] },
            },
            { texte: "Accélération: l'ailier droit rend à l'arrière droit.", passe: ['AiD', 'ArD', 0.1] },
            {
              texte: "L'arrière droit envoie une passe éclair directement à l'arrière gauche, qui percute vers l'intérieur. Le 2 gauche le suit et ouvre l'espace dans son dos.",
              courses: { ArG: [-3.4, 9.0] },
              passe: ['ArD', 'ArG', 0.1],
              def: { G2: [-3.6, 8.0], D3: [0.6, 9.4] },
            },
            {
              texte: "Le demi-centre glisse dans le dos du 2; l'arrière gauche le sert.",
              courses: { DC: [-4.6, 6.4] },
              passe: ['ArG', 'DC', 0.4],
              def: { G1: [-6.2, 4.2] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "2 - Le 1 ferme: passe à l'ailier gauche",
          etapes: [
            { texte: "L'arrière gauche passe au demi-centre.", passe: ['ArG', 'DC', 0.1] },
            {
              texte: "Le demi-centre passe à l'arrière droit. L'avancé suit le ballon des yeux.",
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [1.4, 9.4] },
            },
            {
              texte: "L'arrière droit donne à l'ailier droit. Le demi-centre passe pivot à gauche sans être vu.",
              courses: { DC: { vers: [-3.0, 6.8], via: [-1.6, 9.0] } },
              passe: ['ArD', 'AiD', 0.1],
              def: { D3: [2.4, 9.2], D1: [7.8, 2.2] },
            },
            { texte: "L'ailier droit rend à l'arrière droit.", passe: ['AiD', 'ArD', 0.1] },
            {
              texte: "Passe éclair vers l'arrière gauche, qui percute vers l'intérieur et attire le 2.",
              courses: { ArG: [-3.4, 9.0] },
              passe: ['ArD', 'ArG', 0.1],
              def: { G2: [-3.6, 8.0], D3: [0.6, 9.4] },
            },
            {
              texte: "Le demi-centre glisse dans le dos du 2, mais le 1 gauche ferme sur lui. L'arrière gauche donne à l'ailier gauche.",
              courses: { DC: [-4.6, 6.4] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G1: [-5.6, 5.4] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'nachlaufer-pivot-3-2-1',
      nom: "Rentrée de l'ailier devant la défense et pivot suiveur",
      alias: 'Nachläufer (DE, handballhaus)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1 (aussi 5-1)',
      dispositif: '3-2-1',
      resume: "L'ailier gauche traverse devant la défense jusqu'au poste de pivot droit et pose un écran; le pivot le \"suit\" et file dans l'intervalle laissé libre.",
      description: [
        "Fiche \"Nachläufer\" (le suiveur) du site allemand handballhaus, contre 3-2-1 ou 5-1. Passes demi-centre, arrière gauche, ailier gauche. L'ailier rend à l'arrière gauche et court devant la défense jusqu'au poste de pivot droit. Le pivot, placé au départ entre le 1 et le 2 gauches, \"suit\" l'ailier.",
        "Le ballon va jusqu'à l'arrière droit. L'ailier et l'arrière droit jouent un écran et décalage. Au bon moment, le pivot file dans l'intervalle entre le central et le demi-avancé gauche, et l'arrière droit le sert.",
        "Texte court (animation non vue): les placements sont une interprétation. Voir aussi les rentrées d'ailier \"Einläufer/Nachläufer\" citées sur les forums contre 3-2-1.",
      ],
      objectif: "Surcharger le côté droit puis servir le pivot dans l'espace que la défense a quitté.",
      pointsCles: [
        "L'ailier traverse devant la défense, pas derrière.",
        "Le pivot part au moment où la défense regarde l'écran côté droit.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_HANDBALLHAUS_UEBERGANG, note: "\"Nachläufer\": passes RM-RL-LA; LA rend à RL et court devant la défense jusqu'au poste de pivot droit; LA et RR jouent Sperre-Absetzen; le pivot suit LA et file dans l'intervalle HM/HR." },
      ],
      ballon: 'DC',
      depart: { Piv: [-6.0, 5.0] },
      etapes: [
        { texte: "Le pivot est placé entre le 1 et le 2 gauches. Le demi-centre passe à l'arrière gauche.", passe: ['DC', 'ArG', 0.1] },
        {
          texte: "L'arrière gauche passe à l'ailier gauche.",
          courses: { AiG: [-8.8, 2.4] },
          passe: ['ArG', 'AiG', 0.1],
          def: { G1: [-7.6, 2.8] },
        },
        { texte: "L'ailier rend à l'arrière gauche.", passe: ['AiG', 'ArG', 0.1] },
        {
          texte: "L'ailier court devant la défense jusqu'au poste de pivot droit. Le ballon part vers la droite: l'arrière gauche donne au demi-centre.",
          courses: { AiG: { vers: [3.2, 7.0], via: [-3.0, 8.6] } },
          passe: ['ArG', 'DC', 0.3],
          def: { G3: [0.8, 6.6] },
        },
        {
          texte: "Le demi-centre passe à l'arrière droit. L'ailier pose un écran sur le 2 droit pour l'arrière droit. Le pivot suit l'ailier le long de la défense.",
          courses: { AiG: { vers: [4.0, 7.4], ecran: true }, Piv: { vers: [-4.2, 6.6], via: [-5.4, 6.2] } },
          passe: ['DC', 'ArD', 0.2],
          def: { D2: [4.8, 8.2] },
        },
        {
          texte: "Au bon moment, le pivot file dans l'intervalle entre le central et le 2 gauche. L'arrière droit le sert.",
          courses: { Piv: [-2.4, 6.6] },
          passe: ['ArD', 'Piv', 0.5],
          def: { D3: [2.4, 9.0] },
        },
        { texte: "Le pivot tire.", tir: 'Piv' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ubergang-rm-croise-3-2-1',
      nom: 'Passage au pivot du demi-centre après un croisé contre 3-2-1',
      alias: 'Übergang RM (DE, Jens R. sur handballtraining.de)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Le demi-centre croise avec l'arrière gauche devant la défense, puis passe pivot; l'arrière droit le sert. Si l'avancé le suit, une-deux à droite et écran du pivot pour l'arrière gauche.",
      description: [
        "Concept d'attaque publié sur handballtraining.de contre une défense offensive (3-2-1). Le demi-centre lance un échange avec l'arrière gauche devant la défense, puis passe pivot: d'abord vers le point des 7 m, puis vers l'extérieur. L'arrière gauche passe à l'arrière droit, qui sert le demi-centre au pivot.",
        "Si l'avancé suit le demi-centre: l'arrière droit joue un une-deux avec l'ailier droit; le pivot, placé au centre, sort poser un écran sur un demi-avancé dans la course de l'arrière gauche; l'arrière gauche passe en arc par le centre et reçoit de l'arrière droit. Il tire, joue écran et décalage avec le pivot, donne à l'arrière droit si le demi-avancé opposé aide, ou au demi-centre pivot si le central aide.",
        "Le défenseur écranté (noté \"VR\") est ici le demi-avancé gauche, d'après la convention allemande (défenseurs nommés de leur point de vue); c'est une interprétation. Feldmann et Meyer citent un enchaînement voisin contre la 3-2-1 \"yougoslave\": croisé avec remise entre arrières puis passage au pivot du troisième arrière.",
      ],
      objectif: "Passer en deux pivots au cœur de la 3-2-1 et punir l'avancé selon son choix.",
      pointsCles: [
        "Le demi-centre passe d'abord vers les 7 m, puis s'écarte.",
        "Lire l'avancé: s'il ne suit pas, le demi-centre est libre; s'il suit, le centre se vide pour l'arrière gauche.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Angriffskonzept: Übergang aus dem Rückraum gegen offensive Abwehr (handballtraining.de)',
          url: 'https://handballtraining.de/ruckraumspieler/angriffskonzept-uebergang-aus-dem-rueckraum-gegen-offensive-abwehr/2926',
          note: "RM échange avec RL puis passe pivot \"vers le point de 7 m puis vers l'extérieur\"; RL passe à RR, qui sert RM. Exercice 3: si VM suit, une-deux RR-RA, écran du KM sur VR, RL en arc par le centre.",
        },
        {
          titre: 'Feldmann & Meyer, "Wenn die Lösung zum Problem wird" (handballcoaching.de, 2013, archive)',
          url: 'https://web.archive.org/web/2016/http://www.handballcoaching.de/2013/03/wenn-die-losung-zum-problem-wird-42_29.html',
          note: 'Contre la 3-2-1 "jugoslawisch": "Kreuzen mit Rücklegen im Rückraum + Übergang vom dritten Rückraumspieler".',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Le demi-centre servi au pivot',
          etapes: [
            {
              texte: "Le demi-centre lance un croisé avec l'arrière gauche, devant la défense: il attaque vers la gauche avec le ballon.",
              courses: { DC: [-2.6, 9.2] },
              def: { D3: [-1.2, 9.6], G2: [-3.8, 8.0] },
            },
            {
              texte: "L'arrière gauche passe derrière lui et reçoit au centre.",
              courses: { ArG: { vers: [0.4, 9.8], via: [-3.2, 10.8] }, DC: [-2.2, 8.6] },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.0, 8.9] },
            },
            {
              texte: "Le demi-centre passe pivot: d'abord vers le point des 7 m, puis vers l'extérieur droit. L'avancé ne le suit pas. L'arrière gauche donne à l'arrière droit.",
              courses: { DC: { vers: [3.0, 6.7], via: [-0.6, 7.8] } },
              passe: ['ArG', 'ArD', 0.3],
              def: { D2: [4.8, 8.0] },
            },
            { texte: "L'arrière droit sert le demi-centre au pivot.", passe: ['ArD', 'DC', 0.2] },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "2 - L'avancé suit: écran pour l'arrière gauche",
          etapes: [
            {
              texte: "Même début: le demi-centre attaque vers la gauche avec le ballon.",
              courses: { DC: [-2.6, 9.2] },
              def: { D3: [-1.2, 9.6], G2: [-3.8, 8.0] },
            },
            {
              texte: "L'arrière gauche croise derrière lui et reçoit au centre.",
              courses: { ArG: { vers: [0.4, 9.8], via: [-3.2, 10.8] }, DC: [-2.2, 8.6] },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.0, 8.9] },
            },
            {
              texte: "Le demi-centre passe pivot, mais l'avancé le suit. L'arrière gauche donne à l'arrière droit et se replace à gauche.",
              courses: { DC: { vers: [1.8, 7.4], via: [-0.8, 8.0] }, ArG: [-3.4, 10.2] },
              passe: ['ArG', 'ArD', 0.2],
              def: { D3: [1.6, 8.4], G2: [-4.2, 7.8] },
            },
            {
              texte: "L'arrière droit joue un une-deux avec l'ailier droit: il lui passe...",
              courses: { ArD: [6.4, 8.4] },
              passe: ['ArD', 'AiD', 0.1],
              def: { D2: [5.4, 7.2], D1: [7.8, 2.4] },
            },
            {
              texte: "... et reçoit en retour. Le pivot sort du centre et pose un écran sur le 2 gauche, dans la course de l'arrière gauche, qui passe en arc par le centre.",
              courses: { Piv: { vers: [-2.8, 8.0], via: [-1.2, 7.2], ecran: true }, ArG: { vers: [-0.4, 8.8], via: [-2.4, 10.6] } },
              passe: ['AiD', 'ArD', 0.1],
              def: { G2: [-3.8, 8.2] },
            },
            { texte: "L'arrière droit sert l'arrière gauche lancé.", passe: ['ArD', 'ArG', 0.2] },
            {
              texte: "L'arrière gauche tire. Autres choix: écran et décalage avec le pivot, l'arrière droit si le 2 droit aide, le demi-centre au pivot si le central aide.",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'jeu-exterieur-2-4',
      nom: "Jeu sur l'extérieur contre 2-4",
      alias: 'Tactique de match 02 (entrainement-handball.fr)',
      categorie: 'Contre 4-2 et défenses étagées',
      defense: '2-4 (deux avancés)',
      dispositif: '4-2',
      resume: "L'arrière gauche excentre un avancé, le demi-centre joue entre les deux avancés, puis l'arrière droit attaque l'intervalle 1-2 opposé: tir, pivot ou ailier selon la défense.",
      description: [
        "Fiche \"Tactique de match 02\" d'entrainement-handball.fr: contre une défense à deux avancés, on les excentre pour créer un surnombre à l'opposé.",
        "L'arrière gauche fixe près de la touche, sans se faire attraper. Le demi-centre joue entre les deux avancés en gardant de la profondeur. L'arrière droit fixe entre le 2 et le 1, à l'opposé, et reçoit du demi-centre. Le pivot est placé près du défenseur bas intérieur, côté droit.",
        "Trois fins selon la défense: le 1 reste devant l'ailier et le 2 sur le pivot, l'arrière s'engage entre 1 et 2; le 2 sort sur l'arrière, passe en diagonale au pivot; le 1 sort sur l'arrière, passe à l'ailier.",
      ],
      objectif: "\"Excentrer les 2 défenseurs avancés pour créer une situation de surnombre à l'opposé.\"",
      pointsCles: [
        "L'arrière gauche fixe sans se faire attraper.",
        "Le demi-centre garde de la profondeur entre les avancés.",
        "L'arrière droit lit le 1 et le 2 avant de choisir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Tactique de match 02: l'attaque d'une défense 2-4 par le jeu sur l'extérieur (entrainement-handball.fr)",
          url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-02-lattaque-dune-defense-2-4-par-le-jeu-sur-lexterieur/',
          note: "\"excentrer les 2 défenseurs avancés pour créer une situation de surnombre à l'opposé\"; fins: AR entre 1 et 2, diagonale au PV, passe à l'AL.",
        },
      ],
      ballon: 'ArG',
      depart: { Piv: [2.0, 6.4] },
      variantes: [
        {
          nom: "1 - L'arrière droit entre le 1 et le 2",
          etapes: [
            ...BASE_2_4,
            {
              texte: "Le 1 reste devant l'ailier et le 2 sur le pivot: l'arrière droit s'engage entre le 1 et le 2.",
              courses: { ArD: [6.0, 7.2] },
              def: { D2: [3.2, 6.0], D1: [7.8, 2.2] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: '2 - Le 2 sort: passe au pivot',
          etapes: [
            ...BASE_2_4,
            {
              texte: "Le 2 sort sur l'arrière droit: passe en diagonale au pivot.",
              courses: { ArD: [6.0, 8.0] },
              passe: ['ArD', 'Piv', 0.4],
              def: { D2: [5.0, 7.0] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Le 1 sort: passe à l'ailier",
          etapes: [
            ...BASE_2_4,
            {
              texte: "Le 1 sort sur l'arrière droit: passe à l'ailier droit.",
              courses: { ArD: [6.2, 7.6] },
              passe: ['ArD', 'AiD', 0.4],
              def: { D1: [6.6, 6.0], D2: [3.4, 6.0] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ad-ac-4-2',
      nom: 'Croisé arrière droit / demi-centre contre 4-2 (Brésil)',
      alias: '"Ataque X defesa 4:2" (PT-BR), cruzamento armador direito / armador central',
      categorie: 'Contre 4-2 et défenses étagées',
      defense: '4-2',
      dispositif: '4-2',
      resume: "Croisé arrière droit-demi-centre, puis le ballon file à gauche jusqu'à l'ailier gauche, qui tire ou sert le pivot placé entre le 1 et le 2.",
      description: [
        "Schéma d'un diaporama brésilien (\"Handebol jogadas\"). Principe: un croisé entre l'arrière droit et le demi-centre, pour libérer l'ailier gauche ou le pivot. Le pivot est à gauche, entre les défenseurs 1 et 2.",
        "Enchaînement 01: arrière droit, demi-centre, arrière droit, arrière gauche, ailier gauche, qui tire. Enchaînement 02: même chose, puis l'ailier gauche sert le pivot.",
        "La source ne donne que l'ordre des passes: les courses dessinées (croisé classique, le receveur passant derrière le porteur) sont une interprétation. Le diaporama joue avec quatre arrières; on le montre ici en 3:3 classique.",
      ],
      objectif: '"Liberar ponta esquerda ou pivô para o arremesso final."',
      pointsCles: [
        "Le croisé attire les avancés côté droit.",
        "La circulation vers la gauche doit être rapide.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Handebol jogadas (diaporama, slideshare)',
          url: 'https://www.slideshare.net/slideshow/handebol-jogadas/13974930',
          note: '"Princípio básico = cruzamento, entre armador direito e armador central"; "Finalidades = liberar ponta esquerda ou pivô para o arremesso final".',
        },
      ],
      ballon: 'ArD',
      depart: { Piv: [-6.2, 4.6] },
      variantes: [
        {
          nom: "01 - Tir de l'ailier gauche",
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre, qui attaque en diagonale vers la droite.",
              courses: { DC: [1.6, 10.4] },
              passe: ['ArD', 'DC', 0.1],
              def: { D3: [2.2, 9.2] },
            },
            {
              texte: "L'arrière droit croise derrière le demi-centre et reçoit en retour.",
              courses: { ArD: { vers: [-0.6, 10.4], via: [3.4, 11.2] }, DC: [2.4, 10.0] },
              passe: ['DC', 'ArD', 0.55],
              def: { G3: [-2.0, 9.2] },
            },
            {
              texte: "L'arrière droit passe à l'arrière gauche.",
              passe: ['ArD', 'ArG', 0.2],
              def: { G3: [-4.2, 9.0], G2: [-4.4, 6.0] },
            },
            {
              texte: "L'arrière gauche passe à l'ailier gauche.",
              passe: ['ArG', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '02 - Passe au pivot',
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre, qui attaque en diagonale vers la droite.",
              courses: { DC: [1.6, 10.4] },
              passe: ['ArD', 'DC', 0.1],
              def: { D3: [2.2, 9.2] },
            },
            {
              texte: "L'arrière droit croise derrière le demi-centre et reçoit en retour.",
              courses: { ArD: { vers: [-0.6, 10.4], via: [3.4, 11.2] }, DC: [2.4, 10.0] },
              passe: ['DC', 'ArD', 0.55],
              def: { G3: [-2.0, 9.2] },
            },
            {
              texte: "L'arrière droit passe à l'arrière gauche.",
              passe: ['ArD', 'ArG', 0.2],
              def: { G3: [-4.2, 9.0], G2: [-4.4, 6.0] },
            },
            {
              texte: "L'arrière gauche passe à l'ailier gauche. Le 1 gauche sort sur l'ailier.",
              passe: ['ArG', 'AiG', 0.2],
              def: { G1: [-8.0, 2.8] },
            },
            {
              texte: "L'ailier gauche sert le pivot, libre entre le 1 et le 2.",
              passe: ['AiG', 'Piv', 0.2],
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'tireur-marque-anticipation',
      nom: 'Libérer un tireur marqué en anticipation (Antón 2014)',
      alias: '"Marcajes presionantes a lanzadores a distancia" (ES), "anticipation defense to dangerous distance shooters" (EN)',
      categorie: 'Contre 4-2 et défenses étagées',
      defense: '6-0 ou 5-1 avec le meilleur tireur pressé',
      resume: "Sept solutions de Juan L. Antón García quand le meilleur tireur de loin est pressé par un défenseur avancé: blocs, permutation, plongées du demi-centre, circulations de l'ailier.",
      description: [
        "Juan L. Antón García (directeur de l'école nationale des entraîneurs espagnols) étudie le cas où le meilleur tireur de loin est marqué en anticipation: son défenseur avance jusqu'à 10-11 m pour l'empêcher de recevoir. Il propose des solutions tactiques et stratégiques; ses graphiques n'ont pas été vus, les schémas suivent le texte.",
        "Ici le tireur est l'arrière gauche, pressé par le 2 gauche (sauf variante 2). Variantes: 1 bloc diagonal du demi-centre et fausse sortie du tireur, puis 2 contre 1 avec l'ailier; 2 permutation tireur/demi-centre puis croisé avec l'arrière opposé; 3 passe et va arrière-pivot puis plongée du demi-centre; 4 circulation de l'ailier en 2e pivot et 2 contre 2 arrière-pivot; 5 contre 5-1, le demi-centre plonge dans le dos du défenseur sorti; 6 le demi-centre attaque l'intervalle 2-3 et sert l'ailier qui rentre dans le dos du défenseur sorti; 7 échange sans ballon ailier-pivot au moment de la réception.",
        "Les fins non décrites par la source (tireur final, choix de passe) sont des exemples. Les 3e, 6e et 8e solutions de l'article sont dans d'autres fiches: \"Croisé avec remise immédiate\", \"Croisés successifs pour libérer un tireur marqué\" et \"Croisé long demi-centre / ailier\".",
      ],
      objectif: "Rendre le ballon au tireur pressé, ou punir la défense qui s'est déséquilibrée pour le presser.",
      pointsCles: [
        "Utiliser l'espace laissé dans le dos du défenseur avancé.",
        "Changer de direction après une fausse sortie; passe à rebond conseillée.",
        "Le pivot se place du côté qui libère l'espace de finition.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'J. L. Antón García, Tactical and strategical alternatives against anticipation defense to dangerous distance shooters (EHF Web Periodical, 2014)',
          url: 'http://home.eurohandball.com/ehf_files/Publikation/WP_Anton%20J.L._Tactical%20and%20strategical.pdf',
          note: '"the thrower must make trajectories with false exits, that is to say, by the opposite side of the blockade"; "deployment of CB behind the forward defender after passing the ball (defensive system 5:1)"; "he passes the ball to the wing that at that moment has unmarked to the inside space with a curvilinear trajectory between 1st and 2nd defenders".',
        },
      ],
      ballon: 'DC',
      depart: { G2: [-4.8, 8.6] },
      variantes: [
        {
          nom: '1 - Bloc diagonal et fausse sortie',
          etapes: [
            {
              texte: "Le demi-centre, ballon en main, vient poser un bloc diagonal sur le défenseur qui presse l'arrière gauche.",
              courses: { DC: { vers: [-3.8, 8.8], ecran: true } },
            },
            {
              texte: "Le défenseur anticipe et veut couper la course de l'arrière. L'arrière gauche fait une fausse sortie, du côté opposé au bloc, vers l'extérieur. Le défenseur le suit; le demi-centre garde le contact.",
              courses: { ArG: [-6.6, 9.4], DC: { vers: [-4.9, 8.9], ecran: true } },
              def: { G2: [-5.8, 8.4] },
            },
            {
              texte: "L'arrière change de direction et repart vers l'intérieur, au ras du bloc. Il reçoit une passe à rebond.",
              courses: { ArG: { vers: [-4.0, 9.8], via: [-5.8, 10.4] } },
              passe: ['DC', 'ArG', 0.6],
              def: { G2: [-5.8, 8.5] },
            },
            {
              texte: "L'arrière gauche pénètre entre le 3 et le 1. Le 1 sort sur lui: 2 contre 1 avec l'ailier gauche.",
              courses: { ArG: [-4.6, 7.8], AiG: [-8.8, 2.2] },
              passe: ['ArG', 'AiG', 0.6],
              def: { G1: [-5.4, 6.4], G3: [-3.0, 6.8] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Permutation tireur/demi-centre puis croisé',
          ballon: 'ArG',
          depart: { G2: [-5.0, 5.0], D2: [4.8, 8.6] },
          etapes: [
            {
              texte: "Ici le tireur est l'arrière droit, pressé par le 2 droit. Il permute avec le demi-centre: il vient au centre, le demi-centre part à droite. Son défenseur le suit.",
              courses: { ArD: { vers: [0.6, 10.2], via: [3.0, 11.2] }, DC: { vers: [5.2, 9.6], via: [2.6, 9.6] } },
              def: { D2: [1.4, 9.4] },
            },
            {
              texte: "Croisé avec l'arrière opposé: l'arrière gauche attaque vers l'intérieur avec le ballon; l'arrière droit passe derrière lui vers la gauche et reçoit.",
              courses: { ArG: [-2.0, 8.8], ArD: { vers: [-4.6, 9.6], via: [-1.0, 10.8] } },
              passe: ['ArG', 'ArD', 0.6],
              def: { D2: [-0.4, 9.8], G3: [-2.4, 7.4] },
            },
            {
              texte: "Le tireur tire depuis la zone gauche, loin de la pression habituelle.",
              def: { G2: [-4.8, 6.6] },
              tir: 'ArD',
            },
          ],
        },
        {
          nom: '3 - Passe et va avec le pivot, le demi-centre plonge',
          etapes: [
            {
              texte: "Le pivot se démarque entre le 3 et le 2 gauches. L'arrière gauche se libère un instant; le demi-centre lui passe.",
              courses: { Piv: [-3.4, 6.8], ArG: [-6.0, 9.6] },
              passe: ['DC', 'ArG', 0.4],
              def: { G2: [-5.4, 8.8] },
            },
            {
              texte: "Dès la réception, l'arrière gauche donne au pivot et va vers le but (passe et va). Le 2 le suit, le 3 ferme sur le pivot.",
              courses: { ArG: [-4.2, 8.4] },
              passe: ['ArG', 'Piv', 0.1],
              def: { G2: [-4.8, 7.6], G3: [-2.4, 6.6] },
            },
            {
              texte: "Le demi-centre plonge vers les 6 m, dans le dos de la zone de conflit, là où le 2 a quitté sa place. Le pivot le sert.",
              courses: { DC: { vers: [-5.6, 5.8], via: [-2.6, 8.6] } },
              passe: ['Piv', 'DC', 0.6],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "4 - Circulation de l'ailier en 2e pivot",
          etapes: [
            {
              texte: "L'ailier gauche quitte son poste et circule pour devenir second pivot. Le pivot se place entre le 1 et le 2 gauches.",
              courses: { AiG: { vers: [-3.2, 6.8], via: [-6.6, 4.4] }, Piv: { vers: [-6.2, 4.6], via: [-3.6, 6.4] } },
              def: { G1: [-6.8, 3.0] },
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche, toujours pressé.",
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-5.2, 8.6] },
            },
            {
              texte: "Deux contre deux arrière-pivot: l'arrière gauche attaque, le pivot se retrouve face au 1, le défenseur extérieur, plus léger. L'arrière lui passe.",
              courses: { ArG: [-4.4, 8.6] },
              passe: ['ArG', 'Piv', 0.5],
              def: { G2: [-5.1, 7.9], G1: [-7.0, 3.6] },
            },
            { texte: "Le pivot tire. Si la défense recule, c'est le tireur qui a sa distance; sinon, renverser.", tir: 'Piv' },
          ],
        },
        {
          nom: '5 - Contre 5-1: le demi-centre plonge dans le dos du défenseur sorti',
          dispositif: '5-1',
          depart: { Piv: [-6.2, 4.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 1 et le 2 gauches. Le demi-centre passe à l'arrière gauche, pressé par le 2 gauche sorti haut.",
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "Après sa passe, le demi-centre change de trajectoire et plonge à l'intérieur, dans le dos du défenseur sorti: deux pivots dans la zone.",
              courses: { DC: { vers: [-3.6, 6.8], via: [-1.2, 8.4] } },
              def: { G3: [-1.8, 6.8] },
            },
            {
              texte: "L'arrière gauche tire ou sert l'un des deux pivots; ici le demi-centre. Si la zone est surchargée, il renverse.",
              passe: ['ArG', 'DC', 0.3],
              def: { G1: [-6.6, 3.4] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "6 - Le demi-centre sert l'ailier qui rentre",
          depart: { ArG: [-6.2, 11.0], G2: [-5.6, 10.2], Piv: [3.2, 6.6], AiG: [-9.6, 0.8] },
          etapes: [
            {
              texte: "Le 2 gauche presse le tireur très haut, vers 11 m. L'ailier gauche est au maximum de la largeur, le pivot côté opposé. Le demi-centre agrandit d'abord l'espace en partant vers la droite.",
              courses: { DC: [1.4, 10.2] },
            },
            {
              texte: "Puis il attaque l'intervalle entre le 2 et le 3 gauches. Le 3 sort sur lui.",
              courses: { DC: [-3.0, 8.8] },
              def: { G3: [-2.6, 7.6] },
            },
            {
              texte: "Sans chercher à progresser, il passe directement à l'ailier, qui rentre à l'intérieur entre le 1 et le 2 par une course courbe, dans le dos du 2 sorti.",
              courses: { AiG: { vers: [-5.0, 6.6], via: [-8.2, 4.8] } },
              passe: ['DC', 'AiG', 0.55],
              def: { G1: [-6.6, 3.8] },
            },
            { texte: "L'ailier tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '7 - Échange sans ballon ailier-pivot',
          etapes: [
            {
              texte: "Le pivot, centré, sort devant les défenseurs vers l'extérieur gauche. L'ailier gauche part aussitôt en sens inverse, vers l'intérieur. Au même moment, le demi-centre sert le tireur.",
              courses: { Piv: { vers: [-6.4, 6.6], via: [-3.4, 8.0] }, AiG: { vers: [-2.9, 6.6], via: [-6.4, 4.0] } },
              passe: ['DC', 'ArG', 0.6],
              def: { G1: [-7.0, 4.2] },
            },
            {
              texte: "La défense hésite sur ses responsabilités. L'arrière gauche tire (fin non précisée par la source).",
              tir: 'ArG',
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'roman-6-0-bloc',
      nom: 'Modèles contre une 6-0 qui bascule (Román 2005)',
      alias: '"Mod. 1 à 4" contre 6:0 "bloque defensivo" (ES)',
      categorie: 'Systèmes complets',
      defense: '6-0 qui bascule vers le ballon',
      resume: "Quatre modèles de Román Seco contre une 6-0 qui glisse vers le ballon: croisé arrière-ailier et bloc extérieur, changement de sens et bloc diagonal, invasion, dédoublement et écran pour le tir de loin.",
      description: [
        "Juan de Dios Román Seco, ancien sélectionneur espagnol, distingue trois variantes de la 6-0. Contre le \"bloque defensivo\", une 6-0 qui bascule en bloc vers le ballon, il propose quatre modèles, c'est-à-dire des enchaînements de moyens simples, pas des recettes figées.",
        "Mod. 1: croisé arrière droit-ailier droit pour attirer le 3 droit, pénétrations successives vers la gauche, bloc extérieur du pivot sur le 2 gauche qui a basculé; fin pour l'arrière ou l'ailier gauche. Mod. 2: changement de sens vers l'arrière gauche, bloc diagonal du pivot par derrière, passe au demi-centre qui joue avec le pivot qui roule. Mod. 3: invasion (le demi-centre et l'arrière gauche permutent) pendant que l'arrière droit attaque l'intervalle 1-2, puis pénétrations vers la gauche appuyées par le bloc du pivot. Mod. 4: l'arrière droit passe à l'ailier et descend au pivot, le demi-centre prend sa place, puis passe décisive à l'arrière gauche qui tire de loin derrière l'écran (\"pantalla\") du pivot.",
        "Les schémas de l'article n'ont pas été vus: l'ordre des passes et la position des blocs suivent le texte, les fins sont des exemples. Pour le Mod. 2, la \"trajectoire du centre vers le côté opposé à la passe\" est interprétée comme une réception en course contre le sens de la passe.",
      ],
      objectif: "Profiter de la bascule de la 6-0 en jouant vite du côté qu'elle vient de quitter.",
      pointsCles: [
        "Le bloc empêche le défenseur basculé de revenir.",
        "Le changement de sens de passe doit être rapide.",
        "Le pivot raccourcit les déplacements latéraux de la défense.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_ROMAN_2005, note: 'Mod. 1: "bloqueo exterior del pivote al penúltimo defensor"; Mod. 2: "bloqueo diagonal por detrás"; Mod. 3: "la tradicional invasión"; Mod. 4: "el lateral derecho, después de pasar al extremo derecho, se desplaza hacia las posiciones de pivote [...] la pantalla que facilita el lanzamiento".' },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: 'Mod. 1 - Croisé arrière-ailier et bloc extérieur',
          etapes: [
            {
              texte: "L'arrière droit attaque vers l'extérieur, entre le 2 et le 1 droits. L'ailier droit remonte.",
              courses: { ArD: [6.4, 7.8], AiD: [8.6, 4.2] },
              def: { D2: [5.6, 6.2] },
            },
            {
              texte: "L'ailier croise derrière l'arrière, reçoit et part vers le centre: il attire le 3 droit.",
              courses: { AiD: { vers: [3.2, 8.8], via: [7.6, 9.4] }, ArD: [6.8, 7.2] },
              passe: ['ArD', 'AiD', 0.55],
              def: { D3: [2.6, 7.6] },
            },
            {
              texte: "Pénétrations successives vers la gauche: l'ailier donne au demi-centre, qui attaque à son tour. La défense bascule vers le ballon.",
              courses: { DC: [-0.4, 8.8] },
              passe: ['AiD', 'DC', 0.3],
              def: { G3: [-0.9, 7.4], G2: [-3.6, 6.2] },
            },
            {
              texte: "Le pivot pose un bloc extérieur sur le 2 gauche, qui avait basculé, pour l'empêcher de revenir. Le demi-centre donne à l'arrière gauche.",
              courses: { Piv: { vers: [-4.5, 6.4], via: [-2.4, 6.2], ecran: true }, ArG: [-5.4, 8.6] },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche attaque l'espace entre le 2 et le 1 et tire. Si le 1 sort sur lui, l'ailier gauche est libre.",
              courses: { ArG: [-5.8, 7.8] },
              def: { G1: [-6.8, 3.6] },
              tir: { par: 'ArG', t: 0.6 },
            },
          ],
        },
        {
          nom: 'Mod. 2 - Changement de sens et bloc diagonal',
          etapes: [
            {
              texte: "Le ballon est à droite et la défense a basculé. L'arrière droit passe au demi-centre.",
              passe: ['ArD', 'DC', 0.1],
              def: { D2: [5.4, 5.8], D3: [2.0, 7.0] },
            },
            {
              texte: "Changement de sens: le demi-centre passe à l'arrière gauche. Le pivot vient, en diagonale par derrière, bloquer le 2 gauche.",
              courses: { Piv: { vers: [-4.2, 5.9], via: [-1.8, 6.2], ecran: true } },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche attaque à l'intérieur du 2. Le 3 gauche sort sur lui.",
              courses: { ArG: [-3.4, 8.4] },
              def: { G3: [-2.6, 7.4] },
            },
            {
              texte: "Il passe au demi-centre, qui reçoit en course vers la gauche, contre le sens de la passe. Le pivot roule vers le centre.",
              courses: { DC: [-1.0, 9.0], Piv: [-1.8, 6.6] },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [0.2, 7.4] },
            },
            { texte: "Le demi-centre sert le pivot en mouvement.", passe: ['DC', 'Piv', 0.2] },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: 'Mod. 3 - Invasion du centre',
          etapes: [
            {
              texte: "Le ballon est à droite. Le demi-centre envahit l'espace de l'arrière gauche, qui prend la place du centre. L'arrière droit attaque l'espace entre le 2 et le 1 droits.",
              courses: {
                DC: { vers: [-5.4, 9.6], via: [-2.6, 9.2] },
                ArG: { vers: [-0.4, 10.2], via: [-3.0, 10.8] },
                ArD: [6.4, 7.8],
              },
              def: { D2: [5.6, 6.2], D1: [7.6, 3.2] },
            },
            {
              texte: "La défense glisse vers le ballon. L'arrière droit enchaîne avec l'arrière gauche, au poste de centre, qui attaque à son tour.",
              courses: { ArG: [-0.8, 8.8] },
              passe: ['ArD', 'ArG', 0.2],
              def: { D3: [1.0, 7.2], G3: [-1.0, 7.4] },
            },
            {
              texte: "Pénétrations successives vers la gauche: il donne au demi-centre, au poste d'arrière gauche. Le pivot bloque le 2 gauche à l'extérieur; le demi-centre attaque l'intervalle 2-3.",
              courses: { Piv: { vers: [-5.3, 5.6], via: [-3.0, 6.2], ecran: true }, DC: [-3.4, 8.4] },
              passe: ['ArG', 'DC', 0.3],
              def: { G2: [-4.4, 6.0] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: 'Mod. 4 - Dédoublement et écran pour le tir de loin',
          etapes: [
            {
              texte: "L'arrière droit passe à l'ailier droit, puis descend au pivot, entre le 3 et le 2 droits.",
              courses: { ArD: { vers: [3.4, 6.6], via: [5.0, 8.6] } },
              passe: ['ArD', 'AiD', 0.1],
            },
            {
              texte: "Le demi-centre occupe le poste laissé libre et reçoit de l'ailier droit. La défense se charge à droite.",
              courses: { DC: [5.2, 9.4] },
              passe: ['AiD', 'DC', 0.3],
              def: { D2: [5.0, 6.6], D3: [2.4, 7.2], G3: [-1.0, 6.8], G2: [-4.0, 5.6] },
            },
            {
              texte: "Le demi-centre attaque l'espace extérieur, entre le 2 et le 1.",
              courses: { DC: [6.4, 8.0] },
              def: { D2: [5.8, 7.0], D1: [7.6, 3.4] },
            },
            {
              texte: "Il fait la passe décisive à l'arrière gauche, du côté opposé. Le pivot se place en écran devant le 3 et le 2 gauches.",
              courses: { Piv: { vers: [-2.8, 7.4], ecran: true }, ArG: [-3.8, 9.6] },
              passe: ['DC', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire de loin, derrière l'écran.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'roman-6-0-ligne-de-tir',
      nom: 'Modèles contre une 6-0 "ligne de tir" (Román 2005)',
      alias: '"Mod. 1 à 4" contre 6:0 "línea de tiro" (ES)',
      categorie: 'Systèmes complets',
      defense: '6-0 "ligne de tir" (chacun sur son vis-à-vis)',
      resume: "Contre une 6-0 où chacun reste sur son vis-à-vis: fixer à droite puis 2 contre 2 arrière gauche-pivot, croisé arrière-ailier avec bloc intérieur, permutation puis croisé pour le tir central.",
      description: [
        'Deuxième variante de 6-0 étudiée par Román Seco: la "ligne de tir", où chaque défenseur reste sur son vis-à-vis et bascule peu. Principe: gagner le 1 contre 1, puis jouer à 2 contre 2 et enchaîner.',
        "Mod. 1: l'arrière droit et le demi-centre attaquent les espaces extérieurs pour fixer leurs vis-à-vis à droite; à gauche, 2 contre 2 arrière gauche-pivot, puis pénétrations ou tir de loin. Mod. 2: si ce 2 contre 2 échoue, nouveau croisé demi-centre-arrière droit; le pivot se rapproche du ballon, l'arrière gauche se replace large pour réattaquer l'intervalle 1-2. Mod. 3: croisé arrière-ailier en zone extérieure, coordonné avec un bloc intérieur du pivot. Mod. 3 bis: au même moment, le demi-centre se dédouble vers l'espace du défenseur de l'arrière droit; on combine finition au pivot et tir de loin de l'arrière opposé. Mod. 4: permutation demi-centre/arrière droit, réception en course de l'arrière droit, puis croisé avec l'arrière gauche pour un tir dans l'axe.",
        "Schémas non vus: les côtés et les fins suivent le texte quand il les donne, sinon ce sont des exemples.",
      ],
      objectif: "Créer des duels favorables contre une défense qui ne bascule pas.",
      pointsCles: [
        "\"1 contre 1 d'abord, puis 2 contre 2 et continuité.\"",
        "Fixer d'un côté pour agrandir les espaces de l'autre.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_ROMAN_2005, note: '"ante el no posible éxito del juego lateral izquierdo - pivote la acción se continua con un nuevo cruce central - lateral derecho"; "cruce en la zona exterior (lateral y extremo) coordinado con bloqueo interior del pivote"; "permuta entre el central y el lateral derecho, recepción de éste en carrera y posterior cruce con el lateral izquierdo".' },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: 'Mod. 1 - Fixer à droite, 2 contre 2 à gauche',
          depart: { Piv: [-3.0, 6.6] },
          etapes: [
            {
              texte: "L'arrière droit attaque l'espace extérieur, entre le 2 et le 1 droits, et fixe son vis-à-vis.",
              courses: { ArD: [6.2, 8.0] },
              def: { D2: [5.6, 6.4] },
            },
            {
              texte: "Il donne au demi-centre, qui attaque à son tour vers la droite et fixe le 3 droit. Les espaces s'agrandissent à gauche.",
              courses: { DC: [2.4, 8.8] },
              passe: ['ArD', 'DC', 0.2],
              def: { D3: [2.2, 7.6] },
            },
            {
              texte: "Le demi-centre donne à l'arrière gauche: 2 contre 2 arrière gauche-pivot contre le 2 et le 3 gauches.",
              courses: { ArG: [-4.4, 9.0] },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 2 et le 3. Le 3 sort sur lui; le pivot se libère dans son dos et reçoit.",
              courses: { ArG: [-3.4, 8.4], Piv: [-1.4, 6.4] },
              passe: ['ArG', 'Piv', 0.5],
              def: { G3: [-2.4, 7.6], G2: [-4.6, 6.4] },
            },
            { texte: "Le pivot tire. Autres suites: pénétrations successives ou tir de loin.", tir: 'Piv' },
          ],
        },
        {
          nom: 'Mod. 2 - Échec à gauche: nouveau croisé à droite',
          depart: { Piv: [-3.0, 6.6] },
          etapes: [
            {
              texte: "L'arrière droit attaque l'espace extérieur et fixe son vis-à-vis.",
              courses: { ArD: [6.2, 8.0] },
              def: { D2: [5.6, 6.4] },
            },
            {
              texte: "Le demi-centre reçoit et fixe le 3 droit.",
              courses: { DC: [2.4, 8.8] },
              passe: ['ArD', 'DC', 0.2],
              def: { D3: [2.2, 7.6] },
            },
            {
              texte: "2 contre 2 arrière gauche-pivot.",
              courses: { ArG: [-4.4, 9.0] },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "Le 2 et le 3 gauches contrôlent l'arrière et le pivot. L'arrière gauche redonne au demi-centre.",
              courses: { ArG: [-3.8, 8.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { G2: [-4.2, 7.0], G3: [-2.6, 7.4] },
            },
            {
              texte: "Nouveau croisé demi-centre-arrière droit: le demi-centre attaque vers la droite, l'arrière droit passe derrière lui et reçoit. Le pivot se rapproche du ballon; l'arrière gauche se replace large.",
              courses: {
                DC: [3.6, 8.6],
                ArD: { vers: [1.4, 9.4], via: [4.6, 10.4] },
                Piv: [0.4, 6.4],
                ArG: [-6.2, 9.2],
              },
              passe: ['DC', 'ArD', 0.55],
              def: { D3: [3.0, 7.6] },
            },
            { texte: "L'arrière droit tire dans l'axe. Sinon, l'arrière gauche réattaque l'intervalle entre le 2 et le 1.", tir: 'ArD' },
          ],
        },
        {
          nom: 'Mod. 3 - Croisé arrière-ailier et bloc intérieur',
          ballon: 'ArG',
          etapes: [
            {
              texte: "L'arrière gauche attaque vers l'extérieur, entre le 2 et le 1. Le 2 sort sur lui. L'ailier gauche remonte. Le pivot vient poser un bloc à l'intérieur du 2.",
              courses: { ArG: [-6.4, 8.0], AiG: [-8.6, 4.2], Piv: { vers: [-4.9, 6.9], via: [-2.6, 6.6], ecran: true } },
              def: { G2: [-5.8, 6.6] },
            },
            {
              texte: "L'ailier coupe vers l'intérieur et croise derrière l'arrière, qui lui donne le ballon. Le 2 est bloqué; le 3 doit sortir.",
              courses: { AiG: { vers: [-3.4, 8.8], via: [-7.6, 9.4] }, ArG: [-6.8, 7.2] },
              passe: ['ArG', 'AiG', 0.55],
              def: { G3: [-2.6, 7.6] },
            },
            { texte: "Le pivot, entre le 2 bloqué et le 3 sorti, est libre. L'ailier le sert.", passe: ['AiG', 'Piv', 0.3] },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: 'Mod. 3 bis - Avec dédoublement du demi-centre',
          ballon: 'ArG',
          etapes: [
            {
              texte: "Même début: l'arrière gauche attaque vers l'extérieur, l'ailier remonte, le pivot bloque l'intérieur du 2.",
              courses: { ArG: [-6.4, 8.0], AiG: [-8.6, 4.2], Piv: { vers: [-4.9, 6.9], via: [-2.6, 6.6], ecran: true } },
              def: { G2: [-5.8, 6.6] },
            },
            {
              texte: "Croisé arrière-ailier. Au même moment, le demi-centre se dédouble vers l'espace du défenseur de l'arrière droit.",
              courses: { AiG: { vers: [-3.4, 8.8], via: [-7.6, 9.4] }, ArG: [-6.8, 7.2], DC: { vers: [3.4, 6.6], via: [1.6, 8.4] } },
              passe: ['ArG', 'AiG', 0.55],
              def: { G3: [-2.6, 7.6], D3: [2.4, 7.0] },
            },
            {
              texte: "L'ailier donne à l'arrière droit, côté opposé: le 2 droit doit surveiller le demi-centre devenu pivot.",
              passe: ['AiG', 'ArD', 0.3],
              def: { D2: [4.4, 6.0] },
            },
            { texte: "L'arrière droit tire de loin. Si le 2 sort, le demi-centre est libre au pivot.", tir: 'ArD' },
          ],
        },
        {
          nom: 'Mod. 4 - Permutation puis croisé',
          ballon: 'ArG',
          etapes: [
            {
              texte: "Le demi-centre et l'arrière droit permutent: le demi-centre part à droite, l'arrière droit arrive au centre en course. L'arrière gauche le sert.",
              courses: { DC: { vers: [5.2, 9.8], via: [2.6, 9.6] }, ArD: { vers: [0.4, 9.4], via: [3.4, 10.8] } },
              passe: ['ArG', 'ArD', 0.6],
            },
            {
              texte: "Croisé avec l'arrière gauche: l'arrière droit attaque vers la gauche, l'arrière gauche passe derrière lui vers le centre et reçoit.",
              courses: { ArD: [-2.0, 8.8], ArG: { vers: [0.2, 9.4], via: [-3.6, 10.6] } },
              passe: ['ArD', 'ArG', 0.55],
              def: { G3: [-2.0, 7.6], D3: [1.4, 7.4] },
            },
            { texte: "L'arrière gauche tire dans l'axe. Sinon: pénétrations successives à droite avec l'ancien demi-centre et le pivot.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'roman-6-0-profond',
      nom: 'Modèles contre une 6-0 profonde (Román 2005)',
      alias: '"Mod. 1" et "Mod. 3" contre 6:0 "profundidad" (ES)',
      categorie: 'Systèmes complets',
      defense: '6-0 profonde (dissuasive)',
      resume: "Contre une 6-0 haute et dissuasive: permutation puis dédoublement en deux pivots, ou croisé centre-arrière gauche avec bloc diagonal du pivot et dédoublement de l'arrière droit.",
      description: [
        "Troisième variante de 6-0 étudiée par Román Seco: la 6-0 \"profonde\", dont les défenseurs sortent loin pour dissuader. On cherche à provoquer des erreurs de changement d'adversaire.",
        "Mod. 1 et 1 bis: pendant les passes arrière droit-ailier droit-arrière droit, le demi-centre et l'arrière gauche permutent; l'arrière gauche reçoit au centre et passe au demi-centre; aussitôt, un joueur de première ligne se dédouble au pivot (la source ne dit pas lequel: ici l'arrière gauche, qui vient de passer). Puis jeu à deux pivots. Mod. 3: croisé demi-centre-arrière gauche et, en même temps, bloc diagonal par derrière du pivot, qui roule; solutions: pivot, fixation de l'arrière gauche, pénétrations de l'arrière droit. Mod. 3 bis: si l'arrière droit échoue, il passe à l'ailier droit et se dédouble au pivot; le demi-centre prend son poste; attaque à deux pivots.",
        "Le Mod. 2 du même article, \"dérivé de l'école russe\", est traité dans la fiche \"La russe\". Schémas non vus: placements et fins sont des exemples fidèles au texte.",
      ],
      objectif: "Faire changer d'adversaire une défense haute, puis l'attaquer à deux pivots.",
      pointsCles: [
        "La permutation se fait pendant que le ballon est à droite.",
        "Le dédoublement suit immédiatement la passe.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_ROMAN_2005, note: 'Mod. 1: "inmediatamente después se produce el desdoblamiento al espacio del pivote"; Mod. 3: "A partir de un cruce central - lateral izquierdo [...] un bloqueo diagonal por detrás del pivote"; 3 bis: "después de pasar al extremo derecho se desdobla a los espacios del pivote al tiempo que su espacio lo ocupa el central".' },
      ],
      ballon: 'DC',
      depart: { G2: [-5.2, 7.0], G3: [-1.9, 7.8], D3: [1.9, 7.8], D2: [5.2, 7.0] },
      variantes: [
        {
          nom: 'Mod. 1 - Permutation puis dédoublement',
          ballon: 'ArD',
          etapes: [
            {
              texte: "L'arrière droit passe à l'ailier droit. Pendant ce temps, le demi-centre et l'arrière gauche permutent.",
              courses: { DC: { vers: [-5.4, 9.8], via: [-2.6, 9.2] }, ArG: { vers: [-0.4, 10.2], via: [-3.0, 10.8] } },
              passe: ['ArD', 'AiD', 0.1],
            },
            { texte: "L'ailier droit rend à l'arrière droit.", passe: ['AiD', 'ArD', 0.1] },
            {
              texte: "L'arrière droit donne à l'arrière gauche, au poste de centre.",
              courses: { ArG: [-0.6, 9.6] },
              passe: ['ArD', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche passe au demi-centre, au poste d'arrière gauche, et se dédouble aussitôt vers l'espace du pivot.",
              courses: { ArG: { vers: [-3.4, 6.6], via: [-1.6, 8.6] } },
              passe: ['ArG', 'DC', 0.1],
              def: { G3: [-2.4, 7.4] },
            },
            {
              texte: "Jeu à deux pivots: le demi-centre attaque, la défense doit changer d'adversaire. Il sert le second pivot.",
              courses: { DC: [-4.6, 8.8] },
              passe: ['DC', 'ArG', 0.5],
              def: { G2: [-4.8, 7.6] },
            },
            { texte: "Le second pivot tire.", tir: 'ArG' },
          ],
        },
        {
          nom: 'Mod. 3 - Croisé centre-arrière gauche et bloc diagonal',
          etapes: [
            {
              texte: "Croisé demi-centre-arrière gauche: le demi-centre attaque vers la gauche avec le ballon.",
              courses: { DC: [-2.6, 9.2] },
              def: { G3: [-2.4, 8.2] },
            },
            {
              texte: "L'arrière gauche passe derrière lui et reçoit. En même temps, le pivot vient en diagonale par derrière bloquer le 3 gauche, qui voulait changer d'adversaire.",
              courses: { ArG: { vers: [-0.2, 9.4], via: [-3.4, 10.6] }, DC: [-3.2, 8.8], Piv: { vers: [-1.4, 7.4], via: [0.6, 6.6], ecran: true } },
              passe: ['DC', 'ArG', 0.55],
              def: { G3: [-2.0, 8.2], G2: [-4.4, 7.6] },
            },
            {
              texte: "Le pivot roule vers le but après son bloc; l'arrière gauche le sert.",
              courses: { Piv: [-0.8, 6.4] },
              passe: ['ArG', 'Piv', 0.4],
              def: { D3: [1.0, 7.6] },
            },
            { texte: "Le pivot tire. Autres solutions: fixation de l'arrière gauche, pénétrations de l'arrière droit.", tir: 'Piv' },
          ],
        },
        {
          nom: "Mod. 3 bis - Dédoublement de l'arrière droit",
          etapes: [
            {
              texte: "Même début: croisé demi-centre-arrière gauche.",
              courses: { DC: [-2.6, 9.2] },
              def: { G3: [-2.4, 8.2] },
            },
            {
              texte: "L'arrière gauche reçoit au centre; le pivot bloque le 3 gauche.",
              courses: { ArG: { vers: [-0.2, 9.4], via: [-3.4, 10.6] }, DC: [-3.2, 8.8], Piv: { vers: [-1.4, 7.4], via: [0.6, 6.6], ecran: true } },
              passe: ['DC', 'ArG', 0.55],
              def: { G3: [-2.0, 8.2], G2: [-4.4, 7.6] },
            },
            {
              texte: "Le pivot est couvert. L'arrière gauche donne à l'arrière droit, qui pénètre.",
              courses: { ArD: [4.6, 8.6] },
              passe: ['ArG', 'ArD', 0.2],
              def: { D2: [4.8, 7.6] },
            },
            {
              texte: "L'arrière droit est arrêté: il passe à l'ailier droit et se dédouble dans l'espace du pivot. Le demi-centre traverse pour prendre son poste.",
              courses: { ArD: { vers: [3.4, 6.6], via: [4.4, 7.4] }, DC: { vers: [5.2, 9.8], via: [1.0, 10.8] } },
              passe: ['ArD', 'AiD', 0.1],
            },
            {
              texte: "Attaque à deux pivots: l'ailier droit donne au demi-centre.",
              passe: ['AiD', 'DC', 0.1],
              def: { D2: [5.2, 8.4] },
            },
            { texte: "Le demi-centre sert l'arrière droit devenu pivot.", passe: ['DC', 'ArD', 0.2] },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'modeles-roman-2008-6-0',
      nom: 'Modèles espagnols contre 6-0 (Román 2008)',
      alias: '"El juego 2:2 en zonas laterales simultáneamente", "el lanzamiento a distancia y la continuidad", "transformación del sistema 3:3" (ES)',
      categorie: 'Systèmes complets',
      defense: '6-0',
      resume: "Trois modèles de Román Seco (2008) contre la 6-0: l'ailier gauche circule pour créer deux 2 contre 2 latéraux, croisé centre-arrière gauche avec bloc pour le tir de loin puis 2 contre 2, passage en deux pivots par l'ailier droit.",
      description: [
        "Conférence de Román Seco au symposium des entraîneurs de l'IHF (2007), publiée en 2008: les \"modèles\" du handball espagnol, enchaînements de moyens tactiques simples.",
        "Circulation de l'ailier: l'ailier gauche quitte son poste et devient pivot de l'autre côté; on obtient deux 2 contre 2 simultanés, arrière gauche-pivot contre le 2 et le 1 gauches, arrière droit-ailier contre le 3 et le 2 droits; le demi-centre relie les deux. Tir de loin et continuité: croisé demi-centre-arrière gauche et bloc sur le défenseur de l'arrière gauche pour le tir de loin; si le tir n'est pas possible, nouveau 2 contre 2 arrière gauche-pivot contre les deux 3. Variante (gr. 30): même début, mais le pivot se place à droite pour un 2 contre 2 arrière droit-pivot et des pénétrations vers l'ailier droit. Transformation 3:3: l'ailier droit devient 2e pivot et l'arrière droit s'écarte vers l'aile.",
        "Les défenseurs de Román (numérotés de 2 à 7) sont convertis en numérotation du site. Schémas non vus: les fins sont des exemples conformes au texte.",
      ],
      objectif: "Créer des 2 contre 2 sur les côtés et enchaîner sans temps mort.",
      pointsCles: [
        "Le demi-centre relie les deux zones de 2 contre 2.",
        "Si le tir de loin n'est pas possible, enchaîner aussitôt avec le pivot.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_ROMAN_2008, note: '"Un extremo abandona su puesto específico [...] explotar todas las posibilidades en el juego 2:2 entre A-E//6-7 y entre C-F//3-4"; "el cruce de B/A y posterior bloqueo al defensor 6 puede no ser suficiente para el lanzamiento a distancia"; "el lateral derecho, C, ocupe espacios próximos al extremo abandonado".' },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Circulation de l'ailier gauche: deux 2 contre 2",
          depart: { Piv: [-6.2, 4.6] },
          etapes: [
            {
              texte: "Le pivot est entre le 2 et le 1 gauches. L'ailier gauche quitte son poste et circule le long de la défense jusqu'à l'intervalle entre le 3 et le 2 droits: il devient second pivot.",
              courses: { AiG: { vers: [3.4, 6.6], via: [-4.0, 9.6] } },
              def: { G1: [-7.0, 3.0] },
            },
            {
              texte: "Deux 2 contre 2 sont prêts: arrière gauche-pivot à gauche, arrière droit-ailier gauche à droite. Le demi-centre relie les deux côtés; il donne à droite.",
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit attaque l'intervalle entre le 3 et le 2 droits. Le 3 sort sur lui.",
              courses: { ArD: [3.6, 8.6] },
              def: { D3: [2.6, 7.6], D2: [4.8, 6.0] },
            },
            { texte: "Le second pivot, libéré par la sortie du 3, reçoit.", passe: ['ArD', 'AiG', 0.3] },
            { texte: "L'ailier, devenu pivot, tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Croisé centre-arrière gauche et tir de loin',
          etapes: [
            {
              texte: "Croisé: le demi-centre envahit l'espace de l'arrière gauche avec le ballon.",
              courses: { DC: [-3.2, 9.0] },
              def: { G3: [-2.6, 7.6] },
            },
            {
              texte: "L'arrière gauche passe derrière lui et reçoit. Le pivot vient bloquer le 2 gauche, le défenseur de l'arrière gauche.",
              courses: { ArG: { vers: [-1.6, 9.6], via: [-4.6, 10.8] }, DC: [-3.8, 8.4], Piv: { vers: [-4.0, 6.6], via: [-2.0, 6.2], ecran: true } },
              passe: ['DC', 'ArG', 0.55],
              def: { G2: [-4.6, 5.8] },
            },
            { texte: "L'arrière gauche tire de loin.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Suite: 2 contre 2 avec le pivot',
          etapes: [
            {
              texte: "Croisé: le demi-centre envahit l'espace de l'arrière gauche avec le ballon.",
              courses: { DC: [-3.2, 9.0] },
              def: { G3: [-2.6, 7.6] },
            },
            {
              texte: "L'arrière gauche reçoit derrière lui; le pivot bloque le 2 gauche.",
              courses: { ArG: { vers: [-1.6, 9.6], via: [-4.6, 10.8] }, DC: [-3.8, 8.4], Piv: { vers: [-4.0, 6.6], via: [-2.0, 6.2], ecran: true } },
              passe: ['DC', 'ArG', 0.55],
              def: { G2: [-4.6, 5.8] },
            },
            {
              texte: "Le 3 gauche sort pour contrer: pas de tir. Nouveau 2 contre 2 arrière gauche-pivot contre les deux 3; le pivot roule vers l'axe.",
              courses: { ArG: [-1.0, 8.6], Piv: [-1.0, 6.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-1.8, 7.8] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: '2 - Variante: 2 contre 2 côté droit (gr. 30)',
          depart: { Piv: [3.0, 6.6] },
          etapes: [
            {
              texte: "Même croisé, mais le pivot est placé à droite, entre le 3 et le 2 droits. Le demi-centre envahit l'espace de l'arrière gauche.",
              courses: { DC: [-3.2, 9.0] },
              def: { G3: [-2.6, 7.6] },
            },
            {
              texte: "L'arrière gauche passe derrière lui et reçoit au centre.",
              courses: { ArG: { vers: [-1.0, 9.6], via: [-4.6, 10.8] }, DC: [-3.8, 8.4] },
              passe: ['DC', 'ArG', 0.55],
            },
            {
              texte: "Il donne à l'arrière droit: 2 contre 2 arrière droit-pivot contre le 3 et le 2 droits. L'arrière droit attaque, le 2 sort.",
              courses: { ArD: [5.0, 8.4] },
              passe: ['ArG', 'ArD', 0.2],
              def: { D2: [5.0, 6.8], D3: [2.6, 7.4] },
            },
            {
              texte: "Pénétrations successives vers l'aile: l'arrière droit donne à l'ailier droit.",
              passe: ['ArD', 'AiD', 0.3],
              def: { D1: [7.8, 2.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "3 - Passage en deux pivots par l'ailier droit",
          etapes: [
            {
              texte: "L'ailier droit abandonne son poste et devient second pivot, entre le 3 et le 2 droits. L'arrière droit s'écarte vers la zone de l'ailier.",
              courses: { AiD: { vers: [3.4, 6.6], via: [6.8, 4.6] }, ArD: [7.8, 7.4] },
              def: { D1: [7.6, 3.2] },
            },
            { texte: "Le demi-centre passe à l'arrière droit, au large.", passe: ['DC', 'ArD', 0.2] },
            {
              texte: "Depuis sa position d'ailier, l'arrière droit attaque vers l'intérieur, entre le 1 et le 2. Le 2 sort sur lui.",
              courses: { ArD: [6.4, 7.6] },
              def: { D2: [5.6, 6.8] },
            },
            { texte: "Il sert le second pivot, libéré par la sortie du 2.", passe: ['ArD', 'AiD', 0.3] },
            { texte: "L'ailier, devenu pivot, tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'deblocage-par-le-dc',
      nom: "Déblocage de l'arrière marqué par le demi-centre",
      alias: 'Midtscreening mod mandsopdækning (DA, Dragør f567), "déblocage de l\'arrière pris en stricte" (entrainement-handball.fr, ex. 59), DDB MIX (sélection espagnole)',
      categorie: 'Contre défense individuelle',
      defense: "Individuelle sur l'arrière gauche (5+1)",
      resume: "Le demi-centre passe à droite puis vient bloquer le marqueur de l'arrière gauche; l'arrière gauche se démarque vers la droite et reçoit en course.",
      description: [
        "Contre une défense qui prend l'arrière gauche \"en stricte\" (un défenseur le suit partout, les cinq autres défendent en zone), le demi-centre libère son partenaire par un écran.",
        "Version Dragør (f567): le demi-centre passe à l'arrière droit, court à gauche et bloque le marqueur; l'arrière gauche part vers le poste d'arrière droit; l'arrière droit fixe vers l'intérieur pour faire fermer le 2 droit, donne à l'ailier droit, qui remet aussitôt à l'arrière gauche en course. Version entrainement-handball.fr (exercice 59): même début; l'arrière droit fixe, donne à l'ailier puis bloque le 2 droit en second pivot; l'arrière gauche s'engage dans l'intervalle 2-3 droit et reçoit de l'ailier, qui s'est engagé entre le 1 et le 2; si le 3 monte, passe à l'un des deux pivots.",
        "Version espagnole (DDB MIX, sélection masculine): le demi-centre tente un croisé avec l'arrière marqué; si la passe est impossible, l'arrière se dédouble directement au pivot. La suite n'est pas décrite: la fin montrée est un exemple.",
        "Le marqueur porte ici l'identifiant du 2 gauche; il quitte la zone pour suivre l'arrière.",
      ],
      objectif: "Donner le ballon en course à l'arrière marqué, du côté où son marqueur ne peut pas le suivre.",
      pointsCles: [
        "L'écran se pose au moment où l'arrière démarre.",
        "L'arrière droit fixe vers l'intérieur pour ouvrir l'espace.",
        "Si le marqueur colle, l'arrière devient pivot et emmène son défenseur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Déblocage par le DC (Dragør HK, f567)',
          url: 'http://www.dragoerhb.dk/fransk/f567.html',
          note: '"DC passe la balle à ARD, court à gauche et pose un bloc sur le 2D en stricte."',
        },
        {
          titre: 'Marquage individuel: déblocage par le demi-centre (entrainement-handball.fr, exercice 59)',
          url: 'https://www.entrainement-handball.fr/exercice/marquage-individuel-deblocage-par-le-demi-centre/',
          note: "\"le Demi-Centre passe la balle à l'Arrière droit puis court à gauche poser un bloc sur le défenseur en charge de la prise en stricte\".",
        },
        {
          titre: 'Sierra-Guzmán et al., Análisis de las situaciones tácticas ofensivas de la selección española [...] en desigualdad numérica (e-balonmano.com, 2015)',
          url: 'https://www.redalyc.org/pdf/865/86538703003.pdf',
          note: '"Cuando se produce defensa mixta sobre algún lateral, el central trata de jugar cruce con éste y, si no es posible pasarle, el lateral se desdobla directamente a pivote."',
        },
      ],
      ballon: 'DC',
      depart: { G2: [-5.0, 8.6] },
      variantes: [
        {
          nom: '1 - Dragør f567',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, court à gauche et pose un écran sur le marqueur de l'arrière gauche.",
              courses: { DC: { vers: [-4.1, 9.2], ecran: true } },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière gauche profite de l'écran et part vers le poste d'arrière droit. L'arrière droit fixe vers l'intérieur: le 2 droit ferme l'intervalle.",
              courses: { ArG: { vers: [0.8, 10.2], via: [-3.6, 10.6] }, ArD: [3.6, 8.6] },
              def: { D2: [3.8, 6.8], G2: [-4.9, 8.5] },
            },
            {
              texte: "L'arrière droit donne à l'ailier droit. L'arrière gauche continue vers l'espace ouvert; son marqueur est en retard.",
              courses: { ArG: [4.6, 9.4], AiD: [8.6, 2.4] },
              passe: ['ArD', 'AiD', 0.2],
              def: { G2: [-2.0, 9.2] },
            },
            {
              texte: "L'ailier remet aussitôt à l'arrière gauche en course.",
              courses: { ArG: [5.4, 8.6] },
              passe: ['AiD', 'ArG', 0.1],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Exercice 59: tir de l'arrière gauche",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit puis court à gauche poser un bloc sur le marqueur de l'arrière gauche.",
              courses: { DC: { vers: [-4.1, 9.2], ecran: true } },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit s'engage vers l'intérieur pour fixer le 2 droit, puis donne à l'ailier droit. L'arrière gauche profite du bloc et part sans ballon vers l'intervalle 2-3, à l'opposé.",
              courses: { ArD: [3.4, 8.2], ArG: { vers: [1.6, 9.6], via: [-3.6, 10.6] } },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [4.0, 6.6], G2: [-4.9, 8.5] },
            },
            {
              texte: "L'arrière droit vient bloquer le 2 droit, côté intérieur, en second pivot. L'ailier droit s'engage vers l'intérieur entre le 1 et le 2.",
              courses: { ArD: { vers: [3.6, 6.8], ecran: true }, AiD: [6.8, 6.0] },
              def: { D2: [4.6, 6.2], D1: [7.4, 4.4] },
            },
            {
              texte: "L'ailier passe à l'arrière gauche, qui s'engage dans l'intervalle 2-3 droit.",
              courses: { ArG: [2.6, 8.4] },
              passe: ['AiD', 'ArG', 0.2],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Exercice 59: le 3 monte, passe au pivot',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit puis court bloquer le marqueur.",
              courses: { DC: { vers: [-4.1, 9.2], ecran: true } },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit fixe et donne à l'ailier droit. L'arrière gauche part sans ballon vers l'intervalle 2-3 droit.",
              courses: { ArD: [3.4, 8.2], ArG: { vers: [1.6, 9.6], via: [-3.6, 10.6] } },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [4.0, 6.6], G2: [-4.9, 8.5] },
            },
            {
              texte: "L'arrière droit bloque le 2 droit en second pivot; l'ailier s'engage entre le 1 et le 2.",
              courses: { ArD: { vers: [3.6, 6.8], ecran: true }, AiD: [6.8, 6.0] },
              def: { D2: [4.6, 6.2], D1: [7.4, 4.4] },
            },
            {
              texte: "L'ailier passe à l'arrière gauche. Le 3 droit monte sur lui à la réception.",
              courses: { ArG: [2.6, 8.4] },
              passe: ['AiD', 'ArG', 0.2],
              def: { D3: [2.2, 7.5] },
            },
            { texte: "L'arrière gauche sert le pivot, libre dans le dos du 3.", passe: ['ArG', 'Piv', 0.2] },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "4 - DDB MIX: l'arrière marqué se dédouble au pivot",
          etapes: [
            {
              texte: "Le demi-centre attaque vers l'arrière gauche marqué pour jouer un croisé.",
              courses: { DC: [-2.8, 9.2] },
              def: { G3: [-2.4, 7.4] },
            },
            {
              texte: "L'arrière gauche croise derrière lui, mais son marqueur le colle: la passe est impossible.",
              courses: { ArG: { vers: [-1.2, 10.0], via: [-4.2, 10.8] }, DC: [-3.4, 8.8] },
              def: { G2: [-1.0, 9.1] },
            },
            {
              texte: "L'arrière gauche se dédouble directement au pivot; son marqueur doit le suivre jusqu'aux 6 m.",
              courses: { ArG: [-1.2, 6.5] },
              def: { G2: [-1.0, 7.4] },
            },
            {
              texte: "Exemple de suite (non décrite): le demi-centre attaque l'espace libéré à gauche et tire.",
              courses: { DC: [-4.4, 8.0] },
              def: { G1: [-6.2, 4.4] },
              tir: { par: 'DC', t: 0.6 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'deblocage-par-l-ailier',
      nom: "Déblocage par l'ailier",
      alias: 'Fløjscreening mod mandsopdækning (DA, Dragør f568), Außensperre durch den Außen (DE, handballhaus)',
      categorie: 'Contre défense individuelle',
      defense: "Individuelle sur l'arrière gauche (5+1)",
      resume: "L'ailier gauche rentre et bloque le marqueur de l'arrière gauche; l'arrière court derrière le bloc vers l'extérieur. Selon le marqueur, le demi-centre tire ou sert l'arrière.",
      description: [
        "Version Dragør (f568): l'arrière droit fixe dans l'intervalle 2-3 droit; au même moment, l'ailier gauche part vers l'intérieur et bloque le marqueur de l'arrière gauche. Le demi-centre fixe vers l'extérieur et reçoit; le pivot bloque le 3 gauche à l'extérieur. L'arrière gauche court derrière le bloc de l'ailier et attaque vers le 1 gauche. Si le marqueur suit l'arrière autour du bloc, le demi-centre tire; s'il recule, le demi-centre passe à l'arrière gauche, qui tire.",
        "Version handballhaus (\"Außensperre durch den Außen\"): l'ailier pose un écran extérieur pour le joueur marqué, qui se démarque vers l'extérieur et reçoit du demi-centre.",
        "Le marqueur porte ici l'identifiant du 2 gauche.",
      ],
      objectif: "Utiliser l'ailier, souvent oublié par la défense, pour libérer l'arrière marqué.",
      pointsCles: [
        "Le bloc de l'ailier et la fixation de l'arrière droit partent ensemble.",
        "Le demi-centre lit le marqueur: il suit, je tire; il recule, je passe.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Déblocage par l'ailier (Dragør HK, f568)",
          url: 'http://www.dragoerhb.dk/fransk/f568.html',
          note: '"DC peut alors tirer, si le défenseur 2D choisit de suivre ARG autour du bloc."',
        },
        {
          titre: 'Außensperre durch den Außen (handballhaus.de, archive)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/manndeckung/aussensperre-durch-den-aussen.html',
          note: "L'ailier pose un écran extérieur pour le joueur marqué; RL se démarque vers l'extérieur et reçoit de RM.",
        },
      ],
      ballon: 'ArD',
      depart: { ArG: [-4.6, 9.8], G2: [-4.4, 8.9] },
      variantes: [
        {
          nom: '1 - Le marqueur suit: le demi-centre tire',
          etapes: [
            {
              texte: "L'arrière droit fixe dans l'intervalle entre le 2 et le 3 droits. Au même moment, l'ailier gauche part vers l'intérieur et vient bloquer le marqueur de l'arrière gauche.",
              courses: { ArD: [3.4, 8.4], AiG: { vers: [-5.4, 8.6], via: [-8.4, 6.4], ecran: true } },
              def: { D3: [2.4, 7.2], D2: [4.2, 6.8] },
            },
            {
              texte: "Le demi-centre fixe vers l'extérieur et reçoit de l'arrière droit. Le pivot bloque le 3 gauche à l'extérieur.",
              courses: { DC: [-1.6, 9.2], Piv: { vers: [-2.6, 6.8], ecran: true } },
              passe: ['ArD', 'DC', 0.2],
            },
            {
              texte: "L'arrière gauche court derrière le bloc de l'ailier et attaque vers le 1 gauche.",
              courses: { ArG: { vers: [-6.8, 8.0], via: [-5.8, 10.6] } },
              def: { G1: [-7.2, 4.6] },
            },
            {
              texte: "Le marqueur choisit de suivre l'arrière gauche autour du bloc: le demi-centre est libre et tire.",
              def: { G2: [-5.6, 9.6] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Le marqueur recule: passe à l'arrière gauche",
          etapes: [
            {
              texte: "L'arrière droit fixe dans l'intervalle 2-3 droit. L'ailier gauche rentre et bloque le marqueur.",
              courses: { ArD: [3.4, 8.4], AiG: { vers: [-5.4, 8.6], via: [-8.4, 6.4], ecran: true } },
              def: { D3: [2.4, 7.2], D2: [4.2, 6.8] },
            },
            {
              texte: "Le demi-centre fixe vers l'extérieur et reçoit. Le pivot bloque le 3 gauche à l'extérieur.",
              courses: { DC: [-1.6, 9.2], Piv: { vers: [-2.6, 6.8], ecran: true } },
              passe: ['ArD', 'DC', 0.2],
            },
            {
              texte: "L'arrière gauche court derrière le bloc et attaque vers le 1 gauche.",
              courses: { ArG: { vers: [-6.8, 8.0], via: [-5.8, 10.6] } },
              def: { G1: [-7.2, 4.6] },
            },
            {
              texte: "Le marqueur recule pour contourner le bloc par l'intérieur. Le demi-centre passe à l'arrière gauche.",
              passe: ['DC', 'ArG', 0.3],
              def: { G2: [-4.6, 7.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "3 - Écran extérieur de l'ailier (handballhaus)",
          ballon: 'DC',
          etapes: [
            {
              texte: "L'ailier gauche remonte et pose un écran sur la face extérieure du marqueur de l'arrière gauche.",
              courses: { AiG: { vers: [-5.4, 8.6], via: [-8.4, 6.4], ecran: true } },
            },
            {
              texte: "L'arrière gauche se démarque vers l'extérieur, autour de l'écran, et reçoit du demi-centre.",
              courses: { ArG: { vers: [-6.8, 8.6], via: [-5.8, 10.6] } },
              passe: ['DC', 'ArG', 0.6],
              def: { G1: [-7.0, 4.6] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'echange-avec-l-ailier',
      nom: "Échange de poste avec l'ailier",
      alias: 'Skifte til fløj (DA, Dragør f380), Wechsel auf die Außenposition (DE, handballhaus)',
      categorie: 'Contre défense individuelle',
      defense: "Individuelle sur l'arrière gauche (5+1)",
      resume: "L'arrière marqué part à l'aile et l'ailier prend son poste: le marqueur suit et gêne ses partenaires, ou l'ancien ailier retrouve l'aile avec un avantage.",
      description: [
        "L'arrière gauche, pris en individuelle, échange sa place avec l'ailier gauche. Son marqueur le suit jusqu'à l'aile.",
        "Version Dragør (f380): le marqueur devient de fait le défenseur 1; le demi-centre reçoit et attaque le 2; quand l'ancien arrière rentre de l'aile vers l'intérieur, son marqueur le suit et bute sur son propre partenaire; l'arrière reçoit du demi-centre et tire. Le texte de la fiche mélange les rôles (\"ALG désormais marqué\"): le schéma suit la lecture la plus cohérente, où c'est l'ancien arrière, marqué, qui rentre.",
        "Version handballhaus: au bon moment, le nouvel ailier (l'arrière marqué) rentre et attire son marqueur; l'ancien ailier, en revenant à l'aile, obtient un avantage de position.",
        "Le marqueur porte ici l'identifiant du 2 gauche; le 1 gauche remonte au poste de 2 après l'échange (interprétation).",
      ],
      objectif: "Se servir de la volonté du marqueur de suivre son joueur pour gêner sa propre défense.",
      pointsCles: [
        "L'échange se fait loin du ballon.",
        "La rentrée de l'arrière marqué doit passer près d'un défenseur de zone.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "Changement de position avec l'ailier (Dragør HK, f380)",
          url: 'http://www.dragoerhb.dk/fransk/f380.html',
          note: '"En faisant cela le défenseur 2D est bloqué par son propre partenaire 1D."',
        },
        {
          titre: 'Wechsel auf die Außenposition (handballhaus.de, archive)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/manndeckung/wechsel-auf-die-aussenposition.html',
          note: "Le joueur marqué va à l'aile, l'ailier prend le poste RL; le \"nouvel ailier\" rentre et attire son marqueur; en compensant à LA, l'ancien LA obtient un avantage de position.",
        },
      ],
      ballon: 'ArD',
      depart: { G2: [-5.0, 8.6] },
      variantes: [
        {
          nom: '1 - Dragør f380: le marqueur bute sur son partenaire',
          etapes: [
            {
              texte: "L'arrière gauche, marqué, échange sa place avec l'ailier gauche. Son marqueur le suit jusqu'à l'aile; le 1 gauche remonte face au nouvel arrière.",
              courses: { ArG: { vers: [-8.8, 2.0], via: [-7.0, 6.8] }, AiG: { vers: [-5.4, 9.4], via: [-8.6, 7.4] } },
              def: { G2: [-7.8, 3.4], G1: [-5.0, 5.2] },
            },
            {
              texte: "Le demi-centre reçoit de l'arrière droit et attaque le nouveau 2, l'ancien 1.",
              courses: { DC: [-3.2, 8.6] },
              passe: ['ArD', 'DC', 0.1],
              def: { G1: [-3.9, 7.0] },
            },
            {
              texte: "L'ancien arrière rentre de l'aile vers l'intérieur, dans le dos de l'ailier qui s'écarte. Son marqueur le suit et bute sur son propre partenaire.",
              courses: { ArG: { vers: [-5.0, 8.4], via: [-7.4, 6.6] }, AiG: [-6.6, 10.0] },
              def: { G2: [-5.0, 6.4] },
            },
            { texte: "Le demi-centre lui passe.", passe: ['DC', 'ArG', 0.2] },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - handballhaus: l'ancien ailier revient à l'aile",
          ballon: 'DC',
          etapes: [
            {
              texte: "L'arrière gauche, marqué, va à l'aile; l'ailier prend le poste d'arrière gauche. Le marqueur suit.",
              courses: { ArG: { vers: [-8.8, 2.0], via: [-7.0, 6.8] }, AiG: { vers: [-5.4, 9.4], via: [-8.6, 7.4] } },
              def: { G2: [-7.8, 3.4], G1: [-5.0, 5.2] },
            },
            {
              texte: "Au bon moment, le nouvel ailier, l'arrière marqué, rentre vers l'intérieur et attire son marqueur.",
              courses: { ArG: { vers: [-4.8, 6.6], via: [-7.0, 4.2] } },
              def: { G2: [-6.0, 5.4], G1: [-3.8, 6.4] },
            },
            {
              texte: "L'ancien ailier compense en revenant à l'aile: il a un avantage de position. Le demi-centre lui passe.",
              courses: { AiG: { vers: [-8.4, 3.6], via: [-7.6, 7.6] } },
              passe: ['DC', 'AiG', 0.5],
            },
            { texte: "L'ailier tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-sortie',
      nom: 'Entrée / sortie',
      alias: 'Indløb/Udløb (DA, Dragør f24)',
      categorie: 'Contre défense individuelle',
      defense: "Individuelle sur l'arrière gauche (5+1)",
      resume: "Le demi-centre entre au pivot à droite, ressort pour bloquer le marqueur de l'arrière gauche, puis plonge dans l'intervalle laissé libre.",
      description: [
        "Fiche du club danois de Dragør (f24). Le demi-centre passe à l'arrière droit et entre entre le 3 et le 2 droits. L'arrière droit donne à l'ailier droit pour lui laisser le temps; le demi-centre ressort vers le marqueur de l'arrière gauche et lui pose un écran.",
        "L'ailier rend à l'arrière droit, qui fixe. L'arrière gauche court vers le centre; son marqueur est arrêté par l'écran. L'arrière droit passe à l'arrière gauche; après son écran, le demi-centre plonge dans l'intervalle ouvert par le marqueur, reçoit et tire.",
        "Le marqueur porte ici l'identifiant du 2 gauche.",
      ],
      objectif: "Libérer l'arrière marqué, puis profiter du trou que son marqueur laisse dans la zone.",
      pointsCles: [
        "La passe à l'ailier sert à gagner du temps pour le demi-centre.",
        "Le demi-centre enchaîne écran et plongée sans s'arrêter.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Entrée / sortie (Dragør HK, f24)',
          url: 'http://www.dragoerhb.dk/fransk/f24.html',
          note: "\"Le marqueur 2D veut suivre mais se trouve bloqué par l'écran du DC.\"",
        },
      ],
      ballon: 'DC',
      depart: { G2: [-5.0, 8.6] },
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière droit, puis entre entre le 3 et le 2 droits.",
          courses: { DC: [3.2, 6.9] },
          passe: ['DC', 'ArD', 0.1],
        },
        {
          texte: "L'arrière droit donne à l'ailier droit pour laisser le temps au demi-centre, qui ressort et vient poser un écran sur le marqueur de l'arrière gauche.",
          courses: { DC: { vers: [-4.1, 9.0], via: [0.0, 8.4], ecran: true } },
          passe: ['ArD', 'AiD', 0.1],
        },
        {
          texte: "L'ailier rend à l'arrière droit, qui fixe. L'arrière gauche court vers le centre; son marqueur est arrêté par l'écran.",
          courses: { ArD: [4.2, 8.6], ArG: { vers: [-1.6, 9.8], via: [-4.4, 10.6] } },
          passe: ['AiD', 'ArD', 0.1],
          def: { D2: [4.4, 6.6], G2: [-4.8, 8.4] },
        },
        {
          texte: "L'arrière droit passe à l'arrière gauche. Après son écran, le demi-centre plonge dans l'intervalle laissé par le marqueur.",
          courses: { DC: [-4.2, 7.0] },
          passe: ['ArD', 'ArG', 0.2],
        },
        { texte: "L'arrière gauche sert le demi-centre.", passe: ['ArG', 'DC', 0.2] },
        { texte: "Le demi-centre tire.", tir: 'DC' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'sortie-sur-le-marqueur',
      nom: 'Sortie sur le marqueur (double bloc)',
      alias: 'Undergang (DA, Dragør f33)',
      categorie: 'Contre défense individuelle',
      defense: "Individuelle sur l'arrière gauche (5+1)",
      resume: "Le pivot sort bloquer le marqueur, l'ailier gauche bloque le 3 gauche: l'arrière gauche croise avec le demi-centre en contournant les deux blocs.",
      description: [
        "Système envoyé à Dragør par Kim Ludwig (f33). Le pivot sort et bloque le marqueur de l'arrière gauche. L'ailier gauche court sur le 3 gauche et le bloque. Le demi-centre croise avec l'arrière gauche, qui contourne les deux blocs, puis tire ou passe à droite.",
        "Le marqueur porte ici l'identifiant du 2 gauche.",
      ],
      objectif: "Libérer l'arrière marqué au centre, là où la défense est privée de son 3.",
      pointsCles: [
        "Les deux blocs sont posés avant le croisé.",
        "L'arrière gauche passe au ras des deux blocs.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Sortie sur le marqueur (Dragør HK, f33)',
          url: 'http://www.dragoerhb.dk/fransk/f33.html',
          note: '"DC croise avec ARG, qui contourne les deux blocs, tire ou passe la balle à droite."',
        },
      ],
      ballon: 'DC',
      depart: { G2: [-5.0, 8.6] },
      variantes: [
        {
          nom: "1 - L'arrière gauche tire",
          etapes: [
            {
              texte: "Le pivot sort et bloque le marqueur de l'arrière gauche, côté intérieur. L'ailier gauche court sur le 3 gauche et le bloque.",
              courses: { Piv: { vers: [-4.1, 8.2], via: [-2.4, 7.4], ecran: true }, AiG: { vers: [-2.6, 7.2], via: [-6.4, 5.6], ecran: true } },
            },
            {
              texte: "Le demi-centre croise avec l'arrière gauche: il attaque vers la gauche; l'arrière gauche contourne les deux blocs, passe derrière lui et reçoit.",
              courses: { DC: [-2.4, 9.6], ArG: { vers: [-0.4, 8.6], via: [-3.6, 10.8] } },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.6, 7.4] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Passe à droite',
          etapes: [
            {
              texte: "Le pivot sort et bloque le marqueur; l'ailier gauche bloque le 3 gauche.",
              courses: { Piv: { vers: [-4.1, 8.2], via: [-2.4, 7.4], ecran: true }, AiG: { vers: [-2.6, 7.2], via: [-6.4, 5.6], ecran: true } },
            },
            {
              texte: "Croisé: l'arrière gauche contourne les deux blocs et reçoit du demi-centre.",
              courses: { DC: [-2.4, 9.6], ArG: { vers: [-0.4, 8.6], via: [-3.6, 10.8] } },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.6, 7.4] },
            },
            {
              texte: "Le 3 droit sort sur lui: il passe à droite, à l'arrière droit.",
              passe: ['ArG', 'ArD', 0.3],
              def: { D3: [0.2, 7.8], D2: [4.8, 6.0] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'contre-individuelle-dragor',
      nom: 'Contre un arrière marqué: sortie du pivot, faux écran, double écran',
      alias: 'Pres og stregudryk, Snydescreening, Dobbeltscreening (DA, Dragør x843, x849, x856)',
      categorie: 'Contre défense individuelle',
      defense: "5+1 (individuelle sur l'arrière gauche)",
      resume: "Trois fiches danoises de Dragør contre un arrière gauche marqué: écran du pivot sorti, faux écran du demi-centre qui tire lui-même, double écran demi-centre-pivot.",
      description: [
        "Fiches danoises du club de Dragør (non traduites en français). Le défenseur individuel, noté \"H2\" sur le site, porte ici l'identifiant du 2 gauche.",
        "Sortie du pivot (x843): l'ailier droit sert l'arrière droit, qui fixe à l'extérieur du 2 droit; le demi-centre reçoit et fixe entre le 3 et le 2 droits; le pivot sort et pose un écran sur le défenseur individuel. Si le défenseur du pivot le suit vers l'extérieur, l'arrière gauche feinte vers l'extérieur, contourne le pivot par l'intérieur, reçoit et tire. Si le défenseur du pivot couvre, on joue un bloc russe avec le pivot (voir la fiche \"Bloc russe\").",
        "Faux écran (x849): le pivot sort et reçoit; le demi-centre part vers le défenseur individuel et reçoit en retour; il pose un écran volontairement mauvais, facile à passer; l'arrière gauche passe derrière lui comme pour un croisé, le demi-centre feinte la passe; le pivot revient bloquer le 3 gauche si possible; le demi-centre attaque le but et tire.",
        "Double écran (x856): le demi-centre passe à l'arrière droit; l'arrière marqué avance et s'écarte pour amener son défenseur vers les 9 m; le demi-centre et le pivot sortent et posent ensemble un écran sur lui; l'arrière droit attaque entre le 3 et le 2 droits; si le central sort, l'arrière gauche contourne le demi-centre, entre dans le trou et reçoit; le demi-centre et le pivot suivent pour être libres si l'arrière est pris.",
      ],
      objectif: "Libérer l'arrière marqué, ou punir la défense qui se concentre sur lui.",
      pointsCles: [
        "Lire le défenseur du pivot avant de choisir le côté.",
        "Le faux écran doit avoir l'air raté pour que le marqueur suive l'arrière.",
        "Le double écran se pose près des 9 m, loin de la zone.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Pres og stregudryk (Dragør HK, x843)',
          url: 'http://www.dragoerhb.dk/x843.html',
          note: "Le pivot sort et fait écran sur le défenseur individuel; l'arrière marqué feinte vers l'extérieur et contourne le pivot par l'intérieur; sinon \"Russerscreening\".",
        },
        {
          titre: 'Snydescreening (Dragør HK, x849)',
          url: 'http://www.dragoerhb.dk/x849.html',
          note: '"PM sætter en screening på forsvarets H2, men på en sådan måde, at H2 har nemt ved at følge VB. (dårlig screening)"',
        },
        {
          titre: 'Dobbeltscreening (Dragør HK, x856)',
          url: 'http://www.dragoerhb.dk/x856.html',
          note: "Le demi-centre et le pivot font écran ensemble sur le défenseur individuel; l'arrière droit attaque; l'arrière marqué contourne le demi-centre et entre dans le trou.",
        },
      ],
      ballon: 'DC',
      depart: { G2: [-5.0, 8.6] },
      variantes: [
        {
          nom: '1 - Sortie du pivot (x843)',
          ballon: 'AiD',
          etapes: [
            {
              texte: "L'ailier droit fixe et sert l'arrière droit, qui fixe à l'extérieur du 2 droit.",
              courses: { AiD: [8.6, 2.6], ArD: [6.2, 8.4] },
              passe: ['AiD', 'ArD', 0.4],
              def: { D1: [7.8, 3.0], D2: [5.4, 6.4] },
            },
            {
              texte: "L'arrière droit donne au demi-centre, qui fixe entre le 3 et le 2 droits.",
              courses: { DC: [3.2, 8.6] },
              passe: ['ArD', 'DC', 0.1],
              def: { D3: [2.6, 7.4] },
            },
            {
              texte: "Le pivot sort et pose un écran sur le défenseur individuel. Son défenseur, le 3 gauche, le suit vers l'extérieur. L'arrière gauche feinte vers l'extérieur.",
              courses: { Piv: { vers: [-4.6, 8.4], via: [-2.0, 7.4], ecran: true }, ArG: [-6.2, 9.4] },
              def: { G2: [-5.6, 8.8], G3: [-3.4, 7.2] },
            },
            {
              texte: "L'arrière gauche contourne le pivot par l'intérieur; son marqueur bute sur l'écran. Le demi-centre le sert.",
              courses: { ArG: { vers: [-2.8, 9.2], via: [-5.0, 10.4] } },
              passe: ['DC', 'ArG', 0.5],
            },
            { texte: "L'arrière gauche tire. Si le 3 gauche avait couvert au lieu de suivre le pivot: bloc russe avec le pivot.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Faux écran (x849)',
          etapes: [
            {
              texte: "Le pivot sort et reçoit du demi-centre.",
              courses: { Piv: [-0.6, 9.0] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [-1.2, 7.6] },
            },
            {
              texte: "Le demi-centre part vite vers le défenseur individuel et reçoit en retour du pivot.",
              courses: { DC: [-3.8, 9.4] },
              passe: ['Piv', 'DC', 0.5],
            },
            {
              texte: "Le demi-centre pose volontairement un mauvais écran sur le défenseur individuel. L'arrière gauche passe derrière lui comme pour recevoir en croisé; le demi-centre feinte la passe. Le marqueur suit l'arrière, le 3 gauche anticipe le croisé.",
              courses: { DC: { vers: [-4.2, 8.8], ecran: true }, ArG: { vers: [-2.0, 9.8], via: [-4.6, 10.6] } },
              def: { G2: [-2.8, 9.0], G3: [-2.4, 7.6] },
            },
            {
              texte: "Le pivot revient et, si possible, bloque le 3 gauche. Le demi-centre attaque directement le but.",
              courses: { Piv: { vers: [-2.0, 7.0], ecran: true }, DC: [-4.0, 7.6] },
              def: { G3: [-2.6, 7.8] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: '3 - Double écran (x856)',
          etapes: [
            { texte: "Le demi-centre passe à l'arrière droit.", passe: ['DC', 'ArD', 0.1] },
            {
              texte: "L'arrière gauche marqué avance puis s'écarte, pour amener son défenseur près de la ligne des 9 m.",
              courses: { ArG: [-6.2, 10.2] },
              def: { G2: [-5.8, 9.2] },
            },
            {
              texte: "Le demi-centre et le pivot sortent et posent ensemble un écran sur le défenseur individuel.",
              courses: { DC: { vers: [-4.9, 9.4], via: [-2.6, 9.8], ecran: true }, Piv: { vers: [-5.0, 8.3], via: [-3.0, 7.0], ecran: true } },
            },
            {
              texte: "L'arrière droit attaque entre le 3 et le 2 droits. Le central gauche glisse pour aider.",
              courses: { ArD: [3.0, 8.4] },
              def: { D3: [2.4, 7.4], G3: [0.8, 7.2] },
            },
            {
              texte: "L'arrière gauche contourne le demi-centre et entre dans le trou laissé entre les défenseurs. L'arrière droit le sert.",
              courses: { ArG: { vers: [-2.8, 8.4], via: [-4.4, 10.6] } },
              passe: ['ArD', 'ArG', 0.5],
            },
            { texte: "L'arrière gauche tire. Le demi-centre et le pivot suivent pour être libres s'il est pris.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'wallau',
      nom: 'Wallau',
      alias: 'Valau, enclenchement Wallau (FR)',
      categorie: 'Contre 5-1',
      defense: 'Défenses étagées de type 1-5',
      dispositif: '5-1',
      resume: "Contre une 1-5: le pivot sort en poste dans le dos de l'avancé, le demi-centre rentre aux 6 m et change de côté; l'avancé, sorti du centre, ne peut pas le suivre.",
      description: [
        "Enclenchement utilisé par les équipes de France jeunes contre les défenses étagées de type 1-5 (il figure dans la liste des enclenchements des U20 en 2016). Le nom vient sans doute du club allemand de Wallau-Massenheim (non sourcé).",
        "Version détaillée de Patrick Passemard (Approches du Handball n°174): ailiers écartés, arrière gauche dans l'intervalle 2-3, demi-centre à l'extérieur de l'avancé et en profondeur, pivot à l'opposé entre 2 et 3, arrière droit dans l'intervalle 1-2. Relance de l'ailier gauche; le pivot sort en poste dans le dos de l'avancé et reçoit; l'arrière gauche s'engage dans l'intervalle 2-3 et reçoit du pivot, qui change de secteur; le demi-centre rentre aux 6 m et change de côté. Le 2 et le 3 bas sont mobilisés par l'arrière gauche, l'avancé est \"sorti\" du secteur central: le demi-centre est seul dans l'espace 1-2. Si l'espace se referme: relance vers l'aile gauche, diagonale vers l'ailier opposé ou l'arrière droit, ou appel du pivot dans le dos du 2 s'il sort.",
        "Version d'Éric Quintin (n°157, \"la Valau\"): sortie en poste du pivot et entrée du demi-centre qui glisse dans le dos du 3 bas; le 3 bas doit suivre le pivot pendant qu'un joueur glisse dans son dos. Quintin la place \"aux limites de l'esprit enclenchement\".",
      ],
      objectif: '"Poser un problème de changement à la charnière 3 haut - 3 bas."',
      pointsCles: [
        "Le pivot sort dans le dos de l'avancé, pas devant lui.",
        "La rentrée du demi-centre emmène l'avancé loin du centre.",
        "L'arrière gauche doit fixer le 2 et le 3 bas avant de passer.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'P. Passemard, "Vers un jeu d\'attaque visant continuité, spontanéité, initiative" (Approches du Handball n°174, 2019)',
          url: 'https://www.calameo.com/ffhandball/read/0072751114a24bacdba9b?page=55',
          note: "\"Dispositifs étagés de type 1-5. Un exemple. Enclenchement Wallau suite au temps 1\"; \"Le défenseur 3 haut est \"sorti\" du secteur central par la rentrée du demi-centre à l'opposé du poste\".",
        },
        {
          titre: 'É. Quintin, "Favoriser le jeu en lecture" (Approches du Handball n°157)',
          url: 'https://www.calameo.com/ffhandball/read/007275111ece7fcff65f0?page=22',
          note: "\"Sur la \"Valau\" (schéma 5), on joue une sortie en poste du pivot (1) associée à l'entrée du demi-centre qui glisse dans le dos du poste 3 bas (2)\" (p. 25).",
        },
        {
          titre: 'Y. Delattre et J. Bertholet, "Quelques regrets malgré le bronze" (Approches du Handball n°156, 2016)',
          url: 'https://www.calameo.com/ffhandball/read/007275111df5ab573582b?page=27',
          note: "\"Sur l'attaque d'une 1-5: entrée d'ailier (Hep et London à gauche), petit jeu (Ciudad à droite), \"Ecarté croisé\", \"Wallau\" et \"Kiel\"\".",
        },
      ],
      ballon: 'AiG',
      variantes: [
        {
          nom: '1 - Version Passemard',
          depart: { ArG: [-3.0, 9.6], DC: [-2.2, 11.0], Piv: [2.6, 6.6], ArD: [6.4, 9.0], AiD: [9.4, 0.8], AiG: [-9.4, 0.8] },
          etapes: [
            {
              texte: "Placement: arrière gauche dans l'intervalle 2-3, demi-centre à l'extérieur de l'avancé et en profondeur, pivot à l'opposé entre 2 et 3. Relance de l'ailier gauche: il s'engage vers l'intérieur puis passe au demi-centre. L'arrière gauche se replace dans l'intervalle 1-2.",
              courses: { AiG: [-8.4, 3.4], ArG: [-6.2, 8.8] },
              passe: ['AiG', 'DC', 0.6],
              def: { G1: [-7.4, 2.6] },
            },
            {
              texte: "Le pivot sort en poste dans le dos de l'avancé et reçoit du demi-centre. L'arrière droit se replace.",
              courses: { Piv: { vers: [0.4, 7.7], via: [1.8, 7.6] }, ArD: [5.6, 9.6] },
              passe: ['DC', 'Piv', 0.5],
            },
            {
              texte: "L'arrière gauche s'engage dans l'intervalle 2-3; le pivot lui passe et change de secteur. Le demi-centre rentre aux 6 m et change de côté. L'arrière droit se replace à l'extérieur.",
              courses: {
                ArG: [-3.0, 8.4],
                Piv: [2.8, 6.6],
                DC: { vers: [6.2, 4.6], via: [2.4, 8.4] },
                ArD: [7.4, 9.2],
              },
              passe: ['Piv', 'ArG', 0.2],
              def: { G2: [-3.8, 6.6], G3: [-1.8, 7.0], D3: [2.2, 8.6] },
            },
            {
              texte: "Le 2 et le 3 bas sont pris par l'arrière gauche; l'avancé a été sorti du centre par la rentrée du demi-centre. Le demi-centre est seul à 6 m dans l'espace 1-2: l'arrière gauche le trouve.",
              passe: ['ArG', 'DC', 0.2],
            },
            { texte: "Le demi-centre tire face au gardien.", tir: 'DC' },
          ],
        },
        {
          nom: '2 - "La Valau" (Quintin)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le pivot sort en poste, devant le 3 bas, et reçoit du demi-centre. Le 3 bas le suit.",
              courses: { Piv: [1.2, 8.0] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [0.4, 7.0] },
            },
            {
              texte: "Le demi-centre entre et glisse dans le dos du 3 bas.",
              courses: { DC: { vers: [-0.8, 6.3], via: [-2.0, 8.6] } },
            },
            {
              texte: "Le 3 bas doit suivre le pivot alors qu'un joueur glisse dans son dos: le pivot sert le demi-centre.",
              passe: ['Piv', 'DC', 0.2],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'glissement-pivot-0-6-hah',
      nom: 'Contre une 0-6 homme à homme: glissement du pivot et croisé entre arrières',
      alias: "L'attaque de la 0-6 homme à homme (Approches du Handball n°144)",
      categorie: 'Contre défense individuelle',
      defense: '0-6 homme à homme (alignée)',
      resume: "Contre une défense alignée où chacun suit son joueur: le pivot extérieur glisse à l'opposé pour isoler un 3, le demi-centre attaque son duel; ou glissement du pivot et croisé entre arrières; ou rentrée du demi-centre.",
      description: [
        "Séance de l'équipe technique d'Auvergne (Approches du Handball n°144, 2014). Placement: pivot extérieur entre les défenseurs 1 et 2, orienté face au ballon; ailiers au point de corner; arrières le long des lignes de touche; demi-centre en équilibre par rapport au pivot. But: excentrer les deux 3 pour un 4 contre 3 côté pivot.",
        "Option 1: quand le demi-centre reçoit, le pivot glisse dans l'espace 2-3 opposé pour isoler un 3; le demi-centre s'engage fort pour gagner son duel. Si le 3 suit son débordement, croisé avec l'arrière qui exploite l'espace central; si le 2 côté ballon flotte vers le 3, décalage. Choix 2: le pivot glisse entre les deux 3 (écran ou gain de position); le demi-centre s'engage entre le 2 et le 3, le 2 vient fermer, l'arrière droit choisit le décalage dans l'espace 1-2 ou le croisé derrière le 3.",
        "Option 2: glissement du pivot entre le 2 et le 3 à l'opposé du ballon, croisé arrière/arrière et jeu en renversement; temps clé: la course de l'arrière, après le croisé, entre les deux 3; si le 3 côté bras sort, petite diagonale au pivot; si le 2 recouvre le pivot, passe au demi-centre dans l'espace 1-2. Option 3: rentrée du demi-centre pendant la relation entre arrières; sans solution, croisé demi-centre/ailier pour étirer la défense.",
        "Schémas non vus: l'affectation des défenseurs (ici les deux 3 marquent le pivot et le demi-centre) et le choix des joueurs dans le croisé sont des interprétations; les fins de l'option 3 sont un exemple.",
      ],
      objectif: '"Désorganiser la répartition défensive" et excentrer les deux 3 pour un 4 contre 3 côté pivot.',
      pointsCles: [
        "Le pivot glisse au moment où le demi-centre reçoit.",
        "Le demi-centre s'engage fort: c'est un duel à gagner.",
        "Lire le 3 et le 2 du côté du ballon pour choisir croisé ou décalage.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: "\"L'attaque de la 0-6 homme à homme\" (Approches du Handball n°144, 2014, ETR Auvergne)",
          url: 'https://www.calameo.com/ffhandball/read/007275111d7933a0506fa?page=19',
          note: "\"Glissement du pivot entre les n°2 et n°3 à l'opposé de la balle + croisé arrière / arrière et jeu en renversement\"; option 1: \"le pivot glisse dans l'espace 2-3 opposé pour isoler un des n°3\".",
        },
      ],
      ballon: 'ArD',
      depart: {
        AiG: [-9.4, 0.8], ArG: [-8.4, 8.6], DC: [1.0, 10.2], ArD: [8.4, 8.6], AiD: [9.4, 0.8], Piv: [-6.6, 4.0],
        G1: [-8.4, 2.4], G2: [-7.2, 6.0], G3: [-5.6, 4.8], D3: [1.0, 7.0], D2: [7.2, 6.0], D1: [8.4, 2.4],
      },
      variantes: [
        {
          nom: 'Option 1 - Le demi-centre gagne son duel',
          etapes: [
            {
              texte: "Le demi-centre reçoit de l'arrière droit. Au même moment, le pivot glisse dans l'espace 2-3 opposé; son défenseur, le 3 gauche, le suit. Le 3 droit est isolé face au demi-centre.",
              courses: { Piv: { vers: [4.4, 6.6], via: [-1.4, 8.4] } },
              passe: ['ArD', 'DC', 0.1],
              def: { G3: { vers: [3.8, 6.0], via: [-1.0, 8.0] } },
            },
            {
              texte: "Temps clé: le demi-centre s'engage fort autour du 3 droit pour gagner son duel.",
              courses: { DC: [-0.6, 7.8] },
              def: { D3: [0.6, 7.2] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "Option 1 - Le 3 suit: croisé avec l'arrière",
          etapes: [
            {
              texte: "Le demi-centre reçoit; le pivot glisse dans l'espace 2-3 opposé avec son défenseur.",
              courses: { Piv: { vers: [4.4, 6.6], via: [-1.4, 8.4] } },
              passe: ['ArD', 'DC', 0.1],
              def: { G3: { vers: [3.8, 6.0], via: [-1.0, 8.0] } },
            },
            {
              texte: "Le demi-centre déborde vers la gauche; le 3 droit le suit. L'arrière gauche arrive en croisé derrière lui, dans l'espace central libéré, et reçoit.",
              courses: { DC: [-1.8, 8.2], ArG: { vers: [0.4, 9.0], via: [-3.8, 10.4] } },
              passe: ['DC', 'ArG', 0.6],
              def: { D3: [-1.2, 7.4], G2: [-3.4, 8.0] },
            },
            { texte: "L'arrière gauche tire dans l'axe.", tir: 'ArG' },
          ],
        },
        {
          nom: 'Option 1, choix 2 - Pivot entre les deux 3, décalage',
          etapes: [
            {
              texte: "Le demi-centre reçoit. Le pivot glisse entre les deux 3 et gagne sa position; son défenseur le suit.",
              courses: { Piv: { vers: [-0.4, 6.4], via: [-3.4, 7.0], ecran: true } },
              passe: ['ArD', 'DC', 0.1],
              def: { G3: [-1.4, 6.4] },
            },
            {
              texte: "Le 3 droit est isolé: le demi-centre s'engage entre le 2 et le 3 droits. Le 2 droit vient fermer.",
              courses: { DC: [3.0, 8.0] },
              def: { D3: [2.0, 7.2], D2: [4.2, 7.0] },
            },
            {
              texte: "L'arrière droit, libéré par son défenseur, se décale dans l'espace 1-2; le demi-centre lui passe.",
              courses: { ArD: [6.6, 8.0] },
              passe: ['DC', 'ArD', 0.4],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: 'Option 2 - Croisé arrière/arrière, tir entre les deux 3',
          ballon: 'ArG',
          depart: { Piv: [-4.4, 6.0], G3: [-3.2, 6.4] },
          etapes: [
            {
              texte: "Le pivot est entre le 2 et le 3 gauches, le ballon à gauche. Il glisse entre le 3 et le 2 droits, à l'opposé du ballon; son défenseur le suit.",
              courses: { Piv: { vers: [4.6, 6.6], via: [0.6, 7.2] } },
              def: { G3: { vers: [3.8, 6.2], via: [0.4, 7.6] } },
            },
            {
              texte: "Croisé arrière/arrière: l'arrière gauche attaque vers le centre avec le ballon; le demi-centre passe derrière lui vers la gauche et reçoit.",
              courses: { ArG: [-2.4, 8.8], DC: { vers: [-4.6, 9.6], via: [-0.6, 10.6] } },
              passe: ['ArG', 'DC', 0.55],
              def: { G2: [-2.4, 7.6], D3: [-3.8, 8.0] },
            },
            {
              texte: "Renversement: l'arrière gauche poursuit sa course entre les deux 3 et reçoit en retour.",
              courses: { ArG: [0.4, 8.2] },
              passe: ['DC', 'ArG', 0.3],
              def: { G2: [-1.2, 7.6] },
            },
            { texte: "L'espace est ouvert: l'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: 'Option 2 - Le 3 sort: petite diagonale au pivot',
          ballon: 'ArG',
          depart: { Piv: [-4.4, 6.0], G3: [-3.2, 6.4] },
          etapes: [
            {
              texte: "Le pivot glisse entre le 3 et le 2 droits, à l'opposé du ballon; son défenseur le suit.",
              courses: { Piv: { vers: [4.6, 6.6], via: [0.6, 7.2] } },
              def: { G3: { vers: [3.8, 6.2], via: [0.4, 7.6] } },
            },
            {
              texte: "Croisé arrière/arrière: l'arrière gauche attaque vers le centre, le demi-centre passe derrière lui et reçoit.",
              courses: { ArG: [-2.4, 8.8], DC: { vers: [-4.6, 9.6], via: [-0.6, 10.6] } },
              passe: ['ArG', 'DC', 0.55],
              def: { G2: [-2.4, 7.6], D3: [-3.8, 8.0] },
            },
            {
              texte: "L'arrière gauche poursuit entre les deux 3 et reçoit en retour.",
              courses: { ArG: [1.2, 8.4] },
              passe: ['DC', 'ArG', 0.3],
              def: { G2: [-0.6, 7.8] },
            },
            {
              texte: "Le défenseur du pivot sort sur l'arrière: petite diagonale au pivot.",
              passe: ['ArG', 'Piv', 0.3],
              def: { G3: [2.4, 7.4] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: 'Option 3 - Rentrée du demi-centre',
          ballon: 'ArG',
          etapes: [
            {
              texte: "Relation entre arrières: l'arrière gauche passe à l'arrière droit. Au même moment, le demi-centre rentre aux 6 m; son défenseur le suit.",
              courses: { DC: [0.6, 6.6] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D3: [1.4, 6.4] },
            },
            {
              texte: "Exemple de suite: l'arrière droit attaque l'espace central laissé libre. Sans solution, on enchaînerait un croisé demi-centre/ailier pour étirer la défense.",
              courses: { ArD: [3.6, 8.6] },
              def: { D2: [4.4, 7.4] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },
  );
})();
