/* attaques contre 5-1 (1-5) et 3-2-1 (modèles espagnols, Dragør, entrainement-handball.fr, handballtraining.de, sources tchèques). */
(() => {
  const SRC_ROMAN_2005 = {
    titre: 'Román Seco, Conceptos de ataque frente a variantes defensivas 6:0 y 5:1 (e-balonmano.com, 2005)',
    url: 'https://dialnet.unirioja.es/descarga/articulo/1371312.pdf',
  };
  const SRC_ROMAN_2008 = {
    titre: 'Román Seco, Táctica colectiva grupal en ataque: los modelos en el balonmano español (e-balonmano.com, 2008)',
    url: 'https://www.fmbalonmano.com/uploads/noticias/eleccionprocedimientostacticos.pdf',
  };
  const SRC_ANTON_2011 = {
    titre: 'Antón García, "Movilización del defensor" contra sistema defensivo 5:1 (Clinic de Elche, 2011)',
    url: 'https://fmbalonmano.federatio.com/upload/descargas/25-juanant%C3%B3ncontradefensa5.1%20(1).pdf',
  };
  const SRC_ROMAN_V = {
    titre: 'Román Seco, Evolución del juego de balonmano V: formas de juego contra diferentes sistemas defensivos (UPM)',
    url: 'https://oa.upm.es/48162/1/MONOGRAFICO_JUAN_DE_DIOS_ROMAN_SECO_05.pdf',
  };
  const SRC_KUBISOVA = {
    titre: 'Kubišová, Porovnání útočných herních kombinací na signál (Université Charles, Prague, 2020)',
    url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
  };

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'modeles-roman-5-1',
      nom: 'Modèles espagnols contre 5-1 (Román 2005)',
      alias: '"Mod. 1 à 4" contre 5:1 (ES), ataque por triángulos',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Quatre modèles de Juan de Dios Román Seco pour attaquer une 5-1: triangles et croisé, passe et va, invasion du demi-centre, passage à deux pivots.",
      description: [
        "Román Seco, ancien sélectionneur espagnol, ne propose pas de \"recettes\" mais des modèles: des enchaînements de moyens tactiques simples (passe et va, croisé, invasion, bloc) adaptés aux points faibles de la 5-1. Ces points faibles sont les zones extérieures et l'espace dans le dos de l'avancé.",
        "Mod. 1: deux groupes de trois. À gauche, l'ailier, l'arrière et le pivot jouent ensemble vers l'espace entre le 2 et le 1. À droite, l'arrière droit et le demi-centre croisent pour déséquilibrer l'avancé et gagner le côté extérieur. Mod. 2: passe et va arrière gauche-pivot, puis pénétrations successives vers la droite. Mod. 3 et 3 bis: le demi-centre \"envahit\" la zone gauche pour sortir l'avancé de l'axe. Mod. 4 (variante 3:3 vers 2:4): l'ailier gauche devient 2e pivot, l'arrière prend l'aile, le demi-centre glisse et emmène l'avancé.",
        "Les schémas suivent les graphiques 27 à 31 de l'article; l'ordre exact des passes n'est pas toujours donné (Román le dit pour le modèle à deux pivots), les fins montrées sont des exemples. Le \"Mod. 4\" numéroté de l'article (dédoublement du demi-centre avec bloc statique du pivot) est traité dans la fiche \"Dédoublement du demi-centre contre 5-1\".",
      ],
      objectif: "Exploiter les espaces extérieurs et l'axe vidé par l'avancé.",
      pointsCles: [
        "Les options s'inversent selon le côté où se trouve le pivot.",
        'La synchronisation des courses (le "time de acción") est plus difficile que les moyens eux-mêmes.',
        "Sortir l'avancé de l'axe, puis jouer vite du côté opposé.",
      ],
      fiabilite: 'partielle',
      sources: [
        { ...SRC_ROMAN_2005, note: 'Gr. 27: "un juego táctico en 2 grupos de 3 [...] cruce entre lateral derecho y central para [...] inestabilizar al avanzado"; Gr. 28-31: passe et va A-E, invasion du central, variante 3:3 vers 2:4.' },
      ],
      ballon: 'ArG',
      depart: { Piv: [-3.0, 6.5] },
      variantes: [
        {
          nom: '1 - Triangle à gauche',
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche. Le pivot glisse dans l'espace entre le 2 et le 1 gauches: l'ailier, l'arrière et le pivot forment un triangle.",
              courses: { AiG: [-8.8, 2.6], Piv: { vers: [-6.0, 4.4], via: [-4.8, 7.2] } },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              texte: "L'ailier rend à l'arrière gauche, qui attaque le 2 gauche. Le 2 sort sur lui; l'ailier file au coin.",
              courses: { ArG: [-4.4, 8.4], AiG: [-9.2, 1.4] },
              passe: ['AiG', 'ArG', 0.15],
              def: { G2: [-4.6, 7.0], G1: [-7.2, 3.0] },
            },
            {
              texte: "L'arrière gauche passe au pivot, seul dans le dos du 2.",
              passe: ['ArG', 'Piv', 0.3],
              def: { G1: [-6.9, 3.6] },
            },
            { texte: "Le pivot tire. Si le 1 ferme sur lui, l'ailier est libre au coin.", tir: 'Piv' },
          ],
        },
        {
          nom: '1 - Croisé arrière droit-demi-centre',
          etapes: [
            {
              texte: "Côté droit, l'arrière droit et le demi-centre jouent à deux. L'arrière gauche donne au demi-centre.",
              passe: ['ArG', 'DC', 0.3],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, qui s'engage vers l'intérieur, sur l'avancé.",
              courses: { ArD: [3.0, 8.8] },
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [1.6, 8.9] },
            },
            {
              texte: "Le demi-centre croise dans son dos vers la droite et reçoit. L'avancé est pris entre les deux.",
              courses: { DC: { vers: [5.2, 8.8], via: [2.6, 11.0] }, ArD: [2.6, 8.4] },
              passe: ['ArD', 'DC', 0.55],
              def: { D3: [1.6, 8.8], D2: [4.8, 6.2] },
            },
            {
              texte: "Le demi-centre attaque l'espace entre le 2 et le 1 droits: supériorité à l'extérieur. Il tire, ou sert l'ailier si le 1 sort.",
              courses: { DC: [6.0, 7.6] },
              tir: { par: 'DC', t: 0.7 },
              def: { D2: [5.2, 6.6], D1: [7.6, 3.0] },
            },
          ],
        },
        {
          nom: '2 - Passe et va avec le pivot',
          etapes: [
            {
              texte: "Le pivot sort vers les 9 m, côté gauche. L'arrière gauche lui passe (passe et va).",
              courses: { Piv: [-4.0, 8.2] },
              passe: ['ArG', 'Piv', 0.55],
              def: { G3: [-1.6, 6.8] },
            },
            {
              texte: "L'arrière gauche part aussitôt dans le dos du pivot et reçoit en retour. Il pénètre vers l'intervalle entre le central et l'avancé: il fixe les deux (1 contre 2).",
              courses: { ArG: { vers: [-1.8, 9.0], via: [-4.4, 10.6] } },
              passe: ['Piv', 'ArG', 0.55],
              def: { D3: [-0.6, 8.6], G3: [-1.6, 7.4] },
            },
            {
              texte: "Il passe au demi-centre, qui attaque à son tour l'espace entre l'avancé et le 2 droit (pénétrations successives).",
              courses: { DC: [1.8, 9.0] },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [0.6, 8.8], D2: [3.6, 6.6] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, qui attaque entre le 2 et le 1 droits.",
              courses: { ArD: [5.4, 8.2] },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [4.6, 7.0], D1: [7.0, 3.6] },
            },
            {
              texte: "Le 1 droit sort sur l'arrière droit: l'ailier droit est seul. C'est la supériorité numérique recherchée.",
              courses: { AiD: [8.6, 2.2] },
              passe: ['ArD', 'AiD', 0.3],
              def: { D1: [6.2, 6.8] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '3 - Invasion du demi-centre',
          etapes: [
            {
              texte: "Le demi-centre se déplace vers la gauche, dans l'espace de l'arrière gauche (invasion), et reçoit. L'avancé le suit.",
              courses: { DC: [-3.0, 9.4], ArG: [-5.8, 9.8] },
              passe: ['ArG', 'DC', 0.5],
              def: { D3: [-2.2, 8.6] },
            },
            {
              texte: "Il rend aussitôt à l'arrière gauche, qui file vers le centre dans son dos. Le pivot bloque l'avancé par derrière, en diagonale.",
              courses: {
                ArG: { vers: [0.4, 9.6], via: [-3.4, 11.4] },
                DC: [-5.4, 9.2],
                Piv: { vers: [-1.6, 7.8], ecran: true },
              },
              passe: ['DC', 'ArG', 0.2],
              def: { D3: [-2.3, 8.7] },
            },
            {
              texte: "L'avancé est sorti de l'axe: l'arrière gauche attaque l'espace entre le central et le 2 droit. Supériorité côté droit.",
              courses: { ArG: [1.4, 8.0], ArD: [5.2, 8.6] },
              def: { G3: [0.0, 7.0], D2: [3.0, 6.6] },
            },
            { texte: "L'arrière gauche tire, ou continue vers l'arrière droit.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 bis - Le demi-centre porte le ballon',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre et s'écarte.",
              courses: { ArG: [-6.0, 10.0] },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre, porteur du ballon, part vers la gauche et fixe l'avancé, qui le suit.",
              courses: { DC: [-2.8, 9.6] },
              def: { D3: [-2.0, 8.8] },
            },
            {
              texte: "Il transfère le ballon vers la droite, à l'arrière droit. Le pivot bloque l'avancé par derrière. L'arrière gauche part vers le poste de demi-centre, laissé vide.",
              courses: {
                DC: [-5.0, 9.0],
                ArD: [4.6, 9.2],
                ArG: { vers: [0.6, 10.4], via: [-3.0, 12.0] },
                Piv: { vers: [-1.6, 7.8], ecran: true },
              },
              passe: ['DC', 'ArD', 0.25],
              def: { D3: [-2.1, 8.9] },
            },
            {
              texte: "L'arrière droit rend à l'arrière gauche, arrivé au poste de demi-centre. Celui-ci attaque l'intervalle entre le central et le 2 droit.",
              courses: { ArG: [1.2, 8.4] },
              passe: ['ArD', 'ArG', 0.15],
              def: { G3: [0.0, 7.0], D2: [3.2, 6.6] },
            },
            { texte: "L'arrière gauche tire (ou enchaîne des pénétrations successives).", tir: 'ArG' },
          ],
        },
        {
          nom: '4 - Passage à deux pivots (3:3 vers 2:4)',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre. L'ailier gauche quitte son poste et circule le long de la défense vers le centre, où il devient 2e pivot.",
              courses: { AiG: { vers: [1.4, 6.7], via: [-6.6, 9.0] } },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "L'arrière gauche occupe le poste d'ailier laissé libre (largeur). Le demi-centre glisse au poste d'arrière gauche avec le ballon: l'avancé le suit et quitte l'axe.",
              courses: { ArG: [-8.4, 3.2], DC: [-4.4, 9.4] },
              def: { D3: [-3.4, 8.6] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, qui attaque l'axe libéré face à deux pivots.",
              courses: { ArD: [2.4, 8.8] },
              passe: ['DC', 'ArD', 0.2],
              def: { G3: [0.2, 7.2], D2: [3.6, 6.4] },
            },
            {
              texte: "Exemple de fin (Román ne fixe pas l'ordre des passes): le central sort sur l'arrière droit, qui sert le 2e pivot.",
              courses: { AiG: [0.4, 6.4] },
              passe: ['ArD', 'AiG', 0.4],
              def: { G3: [1.6, 8.0] },
            },
            { texte: "L'ailier devenu pivot tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'modeles-roman-2008-5-1',
      nom: 'Modèles espagnols contre 5-1 (Román 2008)',
      alias: '"El juego a los intervalos entre las dos líneas", "las acciones exteriores", "los desdoblamientos de la 1ª línea" (ES)',
      categorie: 'Contre 5-1',
      defense: '5-1 (le bloc extérieur vaut aussi contre 6-0)',
      dispositif: '5-1',
      resume: "Quatre enchaînements de Román Seco contre la 5-1: attaque de l'intervalle entre les deux lignes, bloc extérieur du pivot, entrée trompeuse, dédoublement de l'arrière gauche.",
      description: [
        "Román Seco présente ces modèles comme ceux du handball espagnol (conférence IHF 2007). Ils partent tous d'un jeu à deux ou à trois et se poursuivent selon la réaction de la défense.",
        "Intervalle entre les deux lignes: l'arrière gauche attaque l'espace entre l'avancé et le 2 gauche, le demi-centre croise dans son dos; le pivot, placé au départ du côté opposé, vient occuper l'espace laissé par le 2. Actions extérieures: le demi-centre fixe l'avancé et change le sens de la passe; le pivot bloque par l'extérieur le 2 gauche, qui avait basculé vers le centre. Entrée trompeuse: la même action précédée d'un croisé de feinte et d'une double passe, puis d'une accélération (Román la montre contre la 6-0). Dédoublements: l'arrière gauche descend au pivot, le demi-centre prend sa place et entraîne l'avancé; l'arrière droit joue alors à deux avec lui.",
        "Les schémas suivent les graphiques 18 à 25 de l'article (la numérotation des défenseurs est convertie: 5 = 2 gauche, 4 = central, 3 = 2 droit, 7 = avancé). Si l'avancé reste dans l'axe malgré le dédoublement, Román prévoit une continuité entre l'arrière droit et le demi-centre sur le côté (gr. 21).",
      ],
      objectif: "Faire sortir l'avancé ou le 2 de leur zone et jouer dans l'espace ainsi créé.",
      pointsCles: [
        "Le pivot part du côté opposé pour l'attaque de l'intervalle: c'est lui qui occupe l'espace libéré.",
        "Pour le bloc extérieur, le changement de sens de la passe et l'accélération de l'arrière gauche à la réception sont essentiels.",
        "Dans le dédoublement, la priorité est le jeu à deux arrière droit-arrière gauche devenu pivot.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_ROMAN_2008, note: 'p. 41: "ataque decisivo de A al intervalo entre 5 y 7 [...] cruce por detrás del central B"; p. 43: "el cambio de sentido del pase [...] la acción de E para realizar el bloqueo al defensor 5"; p. 41-42: dédoublement de A, "C-A//3-4".' },
      ],
      ballon: 'ArG',
      depart: { Piv: [-2.6, 6.5] },
      variantes: [
        {
          nom: '1 - Intervalle entre les deux lignes',
          etapes: [
            {
              texte: "Le pivot se place d'abord du côté opposé, à droite: c'est essentiel pour libérer la zone gauche.",
              courses: { Piv: { vers: [2.8, 6.5], via: [0.0, 8.2] } },
            },
            {
              texte: "L'arrière gauche attaque fort l'intervalle entre l'avancé et le 2 gauche, pour fixer les deux.",
              courses: { ArG: [-3.0, 8.4] },
              def: { D3: [-1.6, 8.7], G2: [-3.8, 7.2] },
            },
            {
              texte: "Le demi-centre croise par derrière l'arrière gauche, vers la gauche, et reçoit.",
              courses: { DC: { vers: [-4.8, 8.6], via: [-2.6, 10.6] }, ArG: [-2.2, 8.0] },
              passe: ['ArG', 'DC', 0.55],
              def: { G2: [-4.4, 7.0] },
            },
            {
              texte: "Le 2 gauche sort sur le demi-centre. Le pivot traverse le long des 6 m et occupe l'espace qu'il laisse; le demi-centre lui passe.",
              courses: { Piv: { vers: [-3.0, 6.3], via: [0.0, 6.1] } },
              passe: ['DC', 'Piv', 0.6],
              def: { G2: [-4.6, 7.6], G3: [-1.4, 7.3] },
            },
            { texte: "Le pivot tire. Autres fins: pénétration du demi-centre, ou surnombre pour l'ailier gauche.", tir: 'Piv' },
          ],
        },
        {
          nom: '2 - Bloc extérieur du pivot',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre. Le pivot se place à l'extérieur du 2 gauche, entre le 2 et le 1.",
              courses: { Piv: { vers: [-6.0, 4.4], via: [-5.0, 7.4] } },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre fixe l'avancé avec ballon. Le 2 gauche bascule vers le centre.",
              courses: { DC: [-0.4, 9.8] },
              def: { D3: [0.2, 8.8], G2: [-3.8, 6.2], G3: [-0.6, 6.7] },
            },
            {
              texte: "Il change le sens de la passe vers l'arrière gauche, qui part en vitesse dès la réception. Le pivot pose un bloc extérieur sur le 2 gauche, qui ne peut plus ressortir.",
              courses: { ArG: [-5.0, 8.8], Piv: { vers: [-4.9, 5.7], ecran: true } },
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-4.0, 6.4] },
            },
            {
              texte: "L'arrière gauche pénètre à l'extérieur du bloc. Le 1 gauche sort sur lui: 2 contre 1 avec l'ailier gauche.",
              courses: { ArG: [-6.2, 7.4], AiG: [-8.8, 2.8] },
              passe: ['ArG', 'AiG', 0.6],
              def: { G1: [-6.8, 6.0] },
            },
            { texte: "L'ailier gauche tire. Si le 1 reste sur l'aile, l'arrière gauche tire lui-même.", tir: 'AiG' },
          ],
        },
        {
          nom: '3 - Entrée trompeuse (croisé et double passe)',
          etapes: [
            {
              texte: "Le pivot se place à l'extérieur du 2 gauche. L'arrière gauche s'engage vers le centre avec le ballon.",
              courses: { Piv: { vers: [-6.0, 4.4], via: [-5.0, 7.4] }, ArG: [-2.6, 9.4] },
            },
            {
              texte: "Croisé de feinte: le demi-centre passe dans son dos, vers la gauche, et reçoit.",
              courses: { DC: { vers: [-4.6, 9.8], via: [-1.8, 11.4] }, ArG: [-1.4, 9.6] },
              passe: ['ArG', 'DC', 0.5],
            },
            {
              texte: "Double passe: le demi-centre rend aussitôt à l'arrière gauche, au poste de centre, et s'écarte. La défense se recentre: le 2 gauche bascule vers l'intérieur.",
              courses: { ArG: [-0.8, 9.8], DC: [-6.0, 10.2] },
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-3.8, 6.2], D3: [-0.2, 8.8] },
            },
            {
              texte: "L'arrière gauche accélère en dribble vers la gauche (changement de rythme). Le pivot bloque le 2 gauche par l'extérieur.",
              courses: { ArG: [-4.8, 8.6], Piv: { vers: [-4.9, 5.7], ecran: true } },
              def: { G2: [-4.0, 6.4] },
            },
            {
              texte: "Il pénètre à l'extérieur du bloc et tire.",
              courses: { ArG: [-6.0, 7.4] },
              tir: { par: 'ArG', t: 0.7 },
              def: { G1: [-6.9, 4.4] },
            },
          ],
        },
        {
          nom: "4 - Dédoublement de l'arrière gauche",
          etapes: [
            {
              texte: "L'arrière gauche attaque le 2 gauche et joue à deux avec le pivot contre le 2 et le central.",
              courses: { ArG: [-3.8, 8.4] },
              def: { G2: [-4.0, 7.0], G3: [-1.6, 7.0] },
            },
            {
              texte: "Il passe au demi-centre et descend au pivot, à droite du central (dédoublement).",
              courses: { ArG: { vers: [1.8, 6.6], via: [-1.4, 8.4] } },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre glisse au poste d'arrière gauche avec le ballon; l'avancé le suit. L'arrière droit se rapproche de l'axe.",
              courses: { DC: [-4.4, 9.6], ArD: [3.0, 9.8] },
              def: { D3: [-3.4, 8.8] },
            },
            {
              texte: "Il passe à l'arrière droit, qui a l'axe libre: le tir de loin est possible.",
              courses: { ArD: [2.4, 9.0] },
              passe: ['DC', 'ArD', 0.2],
              def: { G3: [0.2, 7.0], D2: [3.6, 6.4] },
            },
            {
              texte: "Priorité au jeu à deux de l'arrière droit avec l'arrière gauche devenu pivot, contre le 2 droit et le central: le 2 droit sort, passe au pivot.",
              courses: { ArD: [3.0, 8.2], ArG: [2.6, 6.4] },
              passe: ['ArD', 'ArG', 0.4],
              def: { D2: [3.6, 7.2] },
            },
            { texte: "L'arrière gauche, au pivot, tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'dedoublement-du-centre-5-1',
      nom: 'Dédoublement du demi-centre contre 5-1',
      alias: 'Desdoblamiento del central (ES), "filosofía del desdoblamiento", DDB CNT (sélection espagnole)',
      categorie: 'Contre 5-1',
      defense: '5-1 (avancé sur le demi-centre)',
      dispositif: '5-1',
      resume: "Pendant le jeu à deux arrière gauche-pivot, le demi-centre se colle à l'avancé puis descend aux 6 m: 3 contre 2 au centre.",
      description: [
        "Román Seco la présente comme \"une option très utilisée dans le handball espagnol contre la 5-1, et assez universalisée\". Elle part d'un jeu à deux entre l'arrière gauche et le pivot contre le central et le 2 gauche.",
        "Pendant ce temps, le demi-centre se place tout près de l'avancé, son adversaire direct. Au bon moment, il se dédouble: il descend vers les 6 m et devient 2e pivot. L'avancé, collé à lui et attentif au ballon, ne suit pas. On obtient un 3 contre 2: arrière gauche, pivot et demi-centre contre le central et le 2 gauche.",
        "Si le 2 droit vient aider sur le demi-centre, le ballon file à l'arrière droit, qui joue 2 contre 1 avec l'ailier droit contre le 1 droit. La sélection espagnole utilise aussi ce dédoublement en supériorité numérique (code DDB CNT: dédoublement entre le 2 et le 3, ou entre le 1 et le 2 droits). Román en donne une version voisine en 2005, avec un bloc statique du pivot sur le central (\"Mod. 4\" contre 5:1).",
      ],
      objectif: "Créer un 3 contre 2 au cœur de la défense en profitant de l'avancé qui ne suit pas.",
      pointsCles: [
        "Le demi-centre se colle à l'avancé avant de partir: il l'empêche de suivre.",
        'Le moment du départ ("time de acción") décide de tout.',
        "Lire l'aide du 2 droit et jouer alors vite à droite.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_ROMAN_2008, note: 'Gr. 22: "el central B [...] se sitúa muy próximo a él. En el momento adecuado [...] se desplaza hacia los espacios próximos a la línea de 6 m [...] provocar un 3:2, A-E-B frente a 4-5".' },
        { titre: 'Román Seco, Evolución del juego de balonmano IX: los modelos en el balonmano español (UPM, 2014)', url: 'https://oa.upm.es/48180/1/MONOGRAFICO_JUAN_DE_DIOS_ROMAN_SECO_09.pdf', note: '"Un ejemplo muy utilizado en el Balonmano español contra la defensa 5:1 y bastante universalizado".' },
        { titre: 'Sierra-Guzmán et al., la sélection espagnole en inégalité numérique, Euro 2012 et 2014 (e-balonmano.com, 2015)', url: 'https://www.redalyc.org/pdf/865/86538703003.pdf', note: 'Variante en supériorité: "desdoblamiento entre los defensores lateral (2) y central (3) de la derecha".' },
        { ...SRC_ROMAN_2005, note: 'Mod. 4 (gr. 31): "desdoblamiento del central a los espacios del pivote", "bloqueo estático del pivote al central".' },
      ],
      ballon: 'ArG',
      depart: { Piv: [-1.9, 6.8], G3: [-0.4, 6.5], DC: [0.4, 10.0] },
      variantes: [
        {
          nom: '1 - 3 contre 2 au centre',
          etapes: [
            {
              texte: "L'arrière gauche et le pivot jouent à deux contre le central et le 2 gauche. Le demi-centre se colle à l'avancé.",
              courses: { ArG: [-3.6, 8.6] },
              def: { G2: [-4.0, 7.0], G3: [-0.8, 6.7], D3: [-0.3, 8.9] },
            },
            {
              texte: "Au bon moment, le demi-centre se dédouble: il descend vers les 6 m, à droite du central. L'avancé, collé à lui, ne suit pas.",
              courses: { DC: { vers: [1.0, 6.6], via: [1.2, 8.4] } },
              def: { D3: [-0.4, 8.9] },
            },
            {
              texte: "3 contre 2: l'arrière gauche, le pivot et le demi-centre contre le central et le 2. Le central reste sur le pivot: l'arrière gauche sert le demi-centre.",
              passe: ['ArG', 'DC', 0.3],
              def: { G3: [-0.9, 6.9] },
            },
            { texte: "Le demi-centre, devenu pivot, tire. Si le central sort sur lui, c'est le pivot qui est libre.", tir: 'DC' },
          ],
        },
        {
          nom: '2 - Aide du 2 droit: jeu à droite',
          etapes: [
            {
              texte: "L'arrière gauche et le pivot jouent à deux contre le central et le 2 gauche. Le demi-centre se colle à l'avancé.",
              courses: { ArG: [-3.6, 8.6] },
              def: { G2: [-4.0, 7.0], G3: [-0.8, 6.7], D3: [-0.3, 8.9] },
            },
            {
              texte: "Au bon moment, le demi-centre se dédouble: il descend vers les 6 m, à droite du central. L'avancé, collé à lui, ne suit pas.",
              courses: { DC: { vers: [1.0, 6.6], via: [1.2, 8.4] } },
              def: { D3: [-0.4, 8.9] },
            },
            {
              texte: "Le 2 droit vient aider sur le demi-centre. L'arrière gauche joue vite vers l'arrière droit.",
              courses: { ArD: [4.0, 9.4] },
              passe: ['ArG', 'ArD', 0.35],
              def: { D2: [2.4, 6.4] },
            },
            {
              texte: "2 contre 1 de l'arrière droit et de l'ailier droit contre le 1 droit: l'arrière droit fixe le 1 et passe.",
              courses: { ArD: [5.8, 7.6], AiD: [8.8, 2.4] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D1: [6.4, 6.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'anton-circulations-5-1',
      nom: 'Mobilisation du défenseur par circulations (Antón 2011)',
      alias: 'Circulación doble sucesiva convergente; "recarga y liberación" (ES)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Deux procédures de Juan Antón contre la 5-1: un croisé qui s'éloigne de l'axe pendant que pivot puis ailier opposé circulent, et la \"recharge\" d'un côté pour libérer l'autre.",
      description: [
        "Juan L. Antón García (directeur de l'École nationale des entraîneurs espagnols) décrit des \"procédures\" ouvertes, pas des combinaisons fermées: chacune enchaîne plusieurs solutions selon la défense. L'idée commune est de \"mobiliser\" un défenseur, c'est-à-dire de l'attirer hors de sa zone.",
        "Figure 5: croisé arrière gauche-demi-centre qui s'éloigne de l'axe. Le pivot, placé au départ du côté opposé, se démarque vers l'extérieur; s'il est suivi, il entraîne le central et vide l'axe. L'ailier opposé circule aussitôt dans cet espace, hors du champ visuel des défenseurs. Fins: pivot démarqué, ailier en circulation, tir de loin de l'arrière après un faux croisé.",
        "Figure 8: recharge et libération. Le pivot démarre à l'aile gauche et l'ailier gauche au pivot (échange de postes). Le faux ailier puis l'arrière gauche circulent vers la droite et y attirent la défense. L'arrière droit, bon tireur, tire derrière leur écran, ou renverse vers le demi-centre qui a rééquilibré à gauche; à ce moment l'ailier sort vers l'extérieur et entraîne le 1. Schémas d'après les figures du document.",
      ],
      objectif: "Surcharger une zone pour en libérer une autre, ou vider l'axe pour un joueur venu de loin.",
      pointsCles: [
        "Le pivot part du côté opposé au croisé (figure 5).",
        "L'ailier qui circule vient de loin, hors de la vue des défenseurs.",
        "Figure 8: l'ailier placé au pivot reste immobile jusqu'à la passe de renversement, sinon le 1 intercepte.",
        "Il faut un bon tireur de loin à droite et un pénétrateur rapide.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_ANTON_2011, note: 'Fig. 5: "Movilización por arrastre lateral por parte de E sobre 4, lo que permite crear espacio interior [...] para el posible desmarque de D"; fig. 8: "Circulación sucesiva de F y A tratando de movilizar a los defensores hacia el lado derecho del ataque, recargando esta zona y liberando la zona izquierda".' },
      ],
      ballon: 'ArG',
      depart: { G3: [0.2, 6.7], Piv: [1.6, 6.5] },
      variantes: [
        {
          nom: "Fig. 5 - L'ailier droit circule dans l'axe",
          etapes: [
            {
              texte: "L'arrière gauche s'engage vers le centre, entre le 2 gauche et l'avancé. Le demi-centre part vers la gauche pour croiser dans son dos.",
              courses: { ArG: [-3.0, 8.9], DC: [-1.2, 11.0] },
              def: { D3: [-1.6, 8.8], G2: [-3.8, 6.8] },
            },
            {
              texte: "Croisé qui s'éloigne de l'axe: le demi-centre passe dans le dos de l'arrière, vers la gauche, et reçoit.",
              courses: { DC: { vers: [-5.6, 9.0], via: [-3.6, 10.8] }, ArG: [-2.4, 8.6] },
              passe: ['ArG', 'DC', 0.5],
              def: { D3: [-1.4, 8.4] },
            },
            {
              texte: "Le pivot, parti du côté opposé, se démarque vers la gauche, dans le dos du 2 sorti sur le demi-centre. Le central le suit: l'axe se vide. L'ailier droit quitte son aile.",
              courses: { Piv: { vers: [-3.6, 6.3], via: [-0.4, 8.6] }, AiD: [7.6, 4.6] },
              def: { G3: [-2.2, 6.9], G2: [-4.8, 7.6] },
            },
            {
              texte: "L'ailier droit, loin du ballon, circule le long des 6 m jusque dans l'axe vide. L'arrière droit part vers l'extérieur et lui ouvre l'espace. Le demi-centre lui passe.",
              courses: { AiD: { vers: [0.2, 6.6], via: [4.6, 7.8] }, ArD: [7.0, 7.6] },
              passe: ['DC', 'AiD', 0.5],
              def: { D2: [5.2, 6.4], D1: [7.8, 3.6] },
            },
            { texte: "L'ailier droit tire au centre.", tir: 'AiD' },
          ],
        },
        {
          nom: 'Fig. 5 - Le pivot démarqué',
          etapes: [
            {
              texte: "L'arrière gauche s'engage vers le centre, entre le 2 gauche et l'avancé. Le demi-centre part vers la gauche pour croiser dans son dos.",
              courses: { ArG: [-3.0, 8.9], DC: [-1.2, 11.0] },
              def: { D3: [-1.6, 8.8], G2: [-3.8, 6.8] },
            },
            {
              texte: "Croisé qui s'éloigne de l'axe: le demi-centre passe dans le dos de l'arrière, vers la gauche, et reçoit.",
              courses: { DC: { vers: [-5.6, 9.0], via: [-3.6, 10.8] }, ArG: [-2.4, 8.6] },
              passe: ['ArG', 'DC', 0.5],
              def: { D3: [-1.4, 8.4] },
            },
            {
              texte: "Le pivot traverse vers la gauche. Le central ne le suit pas et le 2 est sorti sur le demi-centre: le pivot est libre dans le dos du 2. Le demi-centre le sert.",
              courses: { Piv: { vers: [-3.6, 6.3], via: [-0.4, 8.6] } },
              passe: ['DC', 'Piv', 0.65],
              def: { G2: [-4.8, 7.6], G3: [-0.4, 6.9] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "Fig. 8 - Tir de loin de l'arrière droit",
          etapes: [
            {
              texte: "Mise en place: le pivot va se placer à l'aile gauche.",
              courses: { Piv: { vers: [-9.0, 3.2], via: [-3.0, 9.2] } },
            },
            {
              texte: "Mise en place (suite): l'ailier gauche prend la place du pivot, entre le 1 et le 2 gauches.",
              courses: { AiG: [-5.9, 4.8] },
            },
            {
              texte: "L'arrière gauche passe au faux ailier.",
              courses: { Piv: [-8.4, 4.0], ArG: [-5.2, 9.2] },
              passe: ['ArG', 'Piv', 0.2],
            },
            {
              texte: "Le faux ailier rend aussitôt et commence sa circulation vers le côté opposé, devant la défense.",
              courses: { Piv: { vers: [2.6, 9.6], via: [-5.2, 10.4] } },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe au demi-centre, puis circule à son tour derrière l'avancé, vers la droite: il le fait reculer et entraîne le central. Le faux ailier finit sa course devant le 2 droit.",
              courses: { ArG: { vers: [1.0, 7.4], via: [-2.6, 7.6] }, Piv: [4.2, 6.6] },
              passe: ['ArG', 'DC', 0.15],
              def: { D3: [0.8, 8.6], G2: [-3.4, 6.2] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis fait une circulation d'équilibre vers le poste d'arrière gauche, laissé libre.",
              courses: { ArD: [3.8, 9.6], DC: { vers: [-5.4, 10.0], via: [-3.0, 11.4] } },
              passe: ['DC', 'ArD', 0.15],
              def: { D3: [1.8, 8.8], D2: [4.8, 5.4] },
            },
            { texte: "L'arrière droit tire de loin derrière l'écran: le faux ailier fixe le 2 droit, l'arrière gauche fixe le central.", tir: 'ArD' },
          ],
        },
        {
          nom: 'Fig. 8 - Renversement et pénétration du demi-centre',
          etapes: [
            {
              texte: "Mise en place: le pivot va se placer à l'aile gauche.",
              courses: { Piv: { vers: [-9.0, 3.2], via: [-3.0, 9.2] } },
            },
            {
              texte: "Mise en place (suite): l'ailier gauche prend la place du pivot, entre le 1 et le 2 gauches.",
              courses: { AiG: [-5.9, 4.8] },
            },
            {
              texte: "L'arrière gauche passe au faux ailier.",
              courses: { Piv: [-8.4, 4.0], ArG: [-5.2, 9.2] },
              passe: ['ArG', 'Piv', 0.2],
            },
            {
              texte: "Le faux ailier rend aussitôt et commence sa circulation vers le côté opposé, devant la défense.",
              courses: { Piv: { vers: [2.6, 9.6], via: [-5.2, 10.4] } },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe au demi-centre, puis circule derrière l'avancé vers la droite. Le faux ailier finit sa course devant le 2 droit. La défense bascule à droite.",
              courses: { ArG: { vers: [1.0, 7.4], via: [-2.6, 7.6] }, Piv: [4.2, 6.6] },
              passe: ['ArG', 'DC', 0.15],
              def: { D3: [0.8, 8.6], G2: [-3.4, 6.2] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis rééquilibre vers le poste d'arrière gauche.",
              courses: { ArD: [3.8, 9.6], DC: { vers: [-5.4, 10.0], via: [-3.0, 11.4] } },
              passe: ['DC', 'ArD', 0.15],
              def: { D3: [1.8, 8.8], D2: [4.8, 5.4] },
            },
            {
              texte: "L'arrière droit renverse vers le demi-centre. Au même moment, l'ailier placé au pivot sort vers l'extérieur, derrière le 1 gauche, et l'entraîne.",
              courses: { AiG: [-8.4, 3.6] },
              passe: ['ArD', 'DC', 0.3],
              def: { G1: [-7.6, 3.0] },
            },
            {
              texte: "Le demi-centre pénètre dans la zone libérée, entre le 1 et le 2 gauches, et tire.",
              courses: { DC: [-5.6, 7.6] },
              tir: { par: 'DC', t: 0.7 },
              def: { G2: [-4.4, 6.6] },
            },
          ],
        },
        {
          nom: "Fig. 8 - 2 contre 1 avec l'ailier",
          etapes: [
            {
              texte: "Mise en place: le pivot va se placer à l'aile gauche.",
              courses: { Piv: { vers: [-9.0, 3.2], via: [-3.0, 9.2] } },
            },
            {
              texte: "Mise en place (suite): l'ailier gauche prend la place du pivot, entre le 1 et le 2 gauches.",
              courses: { AiG: [-5.9, 4.8] },
            },
            {
              texte: "L'arrière gauche passe au faux ailier.",
              courses: { Piv: [-8.4, 4.0], ArG: [-5.2, 9.2] },
              passe: ['ArG', 'Piv', 0.2],
            },
            {
              texte: "Le faux ailier rend aussitôt et commence sa circulation vers le côté opposé, devant la défense.",
              courses: { Piv: { vers: [2.6, 9.6], via: [-5.2, 10.4] } },
              passe: ['Piv', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe au demi-centre, puis circule derrière l'avancé vers la droite. Le faux ailier finit sa course devant le 2 droit.",
              courses: { ArG: { vers: [1.0, 7.4], via: [-2.6, 7.6] }, Piv: [4.2, 6.6] },
              passe: ['ArG', 'DC', 0.15],
              def: { D3: [0.8, 8.6], G2: [-3.4, 6.2] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis rééquilibre vers le poste d'arrière gauche.",
              courses: { ArD: [3.8, 9.6], DC: { vers: [-5.4, 10.0], via: [-3.0, 11.4] } },
              passe: ['DC', 'ArD', 0.15],
              def: { D3: [1.8, 8.8], D2: [4.8, 5.4] },
            },
            {
              texte: "L'arrière droit renverse vers le demi-centre; l'ailier sort vers l'extérieur, derrière le 1 gauche.",
              courses: { AiG: [-8.4, 3.6] },
              passe: ['ArD', 'DC', 0.3],
              def: { G1: [-7.6, 3.0] },
            },
            {
              texte: "Le demi-centre attaque; le 1 gauche ferme sur lui. 2 contre 1: il passe à l'ailier.",
              courses: { DC: [-5.8, 7.8] },
              passe: ['DC', 'AiG', 0.5],
              def: { G1: [-6.4, 6.8], G2: [-4.4, 6.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'anton-dedoublements-5-1',
      nom: 'Isolation et dédoublements contre 5-1 (Antón 2011)',
      alias: 'Aplane, arrastre lateral, ataque 2:4 (ES)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Trois procédures de Juan Antón: isoler l'arrière droit en vidant sa zone, attaquer à 2:4 avec deux pivots groupés, ou transformer le 3:3 en 2:4 par le dédoublement de l'arrière gauche.",
      description: [
        "Antón décrit plusieurs façons de \"mobiliser\" les défenseurs d'une 5-1: les faire reculer (\"aplane\"), les entraîner sur le côté (\"arrastre lateral\"), les attirer vers l'extérieur (\"atracción externa\") ou les fixer sur place.",
        "Figure 7: à la réception de l'arrière droit, le demi-centre et le pivot partent ensemble vers la gauche. Le demi-centre fait reculer l'avancé et l'emmène, le pivot entraîne le central, l'ailier droit file au coin avec le 1 droit: l'arrière droit se retrouve seul face au 2 dans un grand espace. Figure 9: attaque 2:4, les deux pivots groupés à droite (l'ailier droit joue 2e pivot, l'arrière droit tient l'aile); le jeu attire la défense à gauche, puis le demi-centre revient attaquer à droite. Figure 10: l'arrière gauche se dédouble au pivot, le demi-centre rééquilibre et entraîne l'avancé, et le pivot, parti de loin, surgit entre le 2 droit et le central.",
        "Schémas d'après les figures du document. Pour la figure 7, Antón écrit que l'action part d'une passe de l'ailier (le texte hésite entre les deux ailiers) ou d'une passe du demi-centre à l'arrière droit: c'est ce second départ qui est montré. Les fins restent ouvertes (\"soluciones finales muy variadas\").",
      ],
      objectif: "Vider la zone d'un joueur fort en 1 contre 1, ou créer le surnombre d'un côté en chargeant l'autre.",
      pointsCles: [
        "Le demi-centre doit d'abord \"se faire voir\" de l'avancé pour qu'il le suive.",
        "Les pivots chargent un côté en apparence, pour libérer l'autre.",
        "Figure 10: le pivot arrive de loin, hors du champ visuel des défenseurs.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_ANTON_2011, note: 'Fig. 7: "Movilización por aplane de B sobre 7 coordinada con la movilización por arrastre lateral de E sobre 4 y la de D sobre 2 para facilitar el juego 1x1 de C"; fig. 9: "ataque 2:4 con los pivotes en la misma zona"; fig. 10: "transformación del sistema por desdoblamiento de A".' },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "Fig. 7 - Isolation de l'arrière droit",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, qui se déplace d'abord vers sa droite pour fixer le 2 droit de ce côté.",
              courses: { ArD: [6.4, 9.0] },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [5.4, 6.4] },
            },
            {
              texte: "À la réception, le demi-centre et le pivot partent ensemble vers la gauche. Le demi-centre se montre d'abord à droite pour que l'avancé le suive, puis l'emmène en le faisant reculer. Le pivot feint un appel à droite puis part à gauche: le central le suit. L'ailier droit file au coin et attire le 1.",
              courses: {
                DC: { vers: [-2.6, 8.6], via: [1.8, 10.2] },
                Piv: { vers: [-2.6, 6.4], via: [1.8, 7.4] },
                AiD: [9.4, 0.6],
              },
              def: { D3: [-1.8, 7.9], G3: [-1.6, 6.9], D1: [8.4, 1.4] },
            },
            {
              texte: "L'arrière droit feinte, puis change de direction vers l'axe, dans l'espace vidé: 1 contre 1 face au 2 droit.",
              courses: { ArD: { vers: [2.0, 8.0], via: [5.4, 9.6] } },
              def: { D2: [2.8, 7.0] },
            },
            { texte: "L'arrière droit pénètre ou tire de loin.", tir: 'ArD' },
          ],
        },
        {
          nom: 'Fig. 9 - Attaque 2:4, pivots groupés à droite',
          etapes: [
            {
              texte: "Mise en place 2:4: l'ailier droit vient jouer 2e pivot à droite, l'arrière droit prend l'aile, le pivot se place à droite du central. L'avancé reste plus bas.",
              courses: {
                AiD: { vers: [5.4, 6.0], via: [8.6, 5.2] },
                ArD: { vers: [9.2, 3.0], via: [9.0, 8.0] },
                Piv: [2.2, 6.6],
                DC: [2.8, 10.2],
                ArG: [-4.4, 10.0],
              },
              def: { D3: [1.0, 8.6] },
            },
            {
              texte: "Le demi-centre attaque vers l'axe pour fixer l'avancé, puis passe à l'arrière gauche.",
              courses: { DC: [1.6, 9.8], ArG: [-4.6, 9.4] },
              passe: ['DC', 'ArG', 0.7],
              def: { D3: [0.8, 8.9] },
            },
            {
              texte: "L'arrière gauche attaque en largeur vers sa gauche. Le pivot entraîne le central vers la gauche, le long des 6 m (passe possible s'il le surprend).",
              courses: { ArG: [-6.4, 8.6], Piv: { vers: [-5.4, 6.6], via: [-1.0, 8.4] } },
              def: { G3: [-3.4, 6.5], G2: [-5.8, 7.6], D3: [-1.6, 8.8] },
            },
            {
              texte: "Le 2e pivot (l'ailier droit) fait une course courbe en avant, en arrière puis en avant: il attire le 2 droit vers l'extérieur.",
              courses: { AiD: { vers: [3.6, 8.2], via: [6.2, 8.8] } },
              def: { D2: [4.0, 7.2] },
            },
            {
              texte: "Le demi-centre change de direction et attaque vers l'extérieur droit, dans l'espace libéré, en 3e appui de l'arrière gauche, qui le sert.",
              courses: { DC: { vers: [5.6, 7.4], via: [3.6, 10.4] } },
              passe: ['ArG', 'DC', 0.3],
            },
            {
              texte: "Le 1 droit sort sur lui: 2 contre 1 avec l'arrière droit, placé à l'aile.",
              courses: { ArD: [8.8, 3.2] },
              passe: ['DC', 'ArD', 0.4],
              def: { D1: [6.4, 6.4] },
            },
            { texte: "L'arrière droit tire depuis l'aile.", tir: 'ArD' },
          ],
        },
        {
          nom: "Fig. 10 - Dédoublement de l'arrière gauche",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche. Le pivot se place loin du ballon, entre le 2 et le 1 gauches.",
              courses: { Piv: { vers: [-6.4, 4.4], via: [-2.0, 9.6] } },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche passe à l'ailier gauche, puis descend aussitôt au pivot, entre le central et le 2 gauche: il fixe le central sur place.",
              courses: { AiG: [-8.4, 3.0], ArG: { vers: [-2.6, 6.5], via: [-3.6, 8.8] } },
              passe: ['ArG', 'AiG', 0.15],
              def: { G3: [-1.2, 6.7] },
            },
            {
              texte: "L'ailier attaque et passe au demi-centre, qui a fait une circulation d'équilibre vers le poste d'arrière gauche. L'avancé le suit.",
              courses: { AiG: [-8.0, 4.6], DC: { vers: [-5.2, 9.6], via: [-2.4, 10.8] } },
              passe: ['AiG', 'DC', 0.6],
              def: { G1: [-7.2, 3.4], D3: [-3.8, 8.6] },
            },
            {
              texte: "Le demi-centre fixe l'avancé avec ballon et passe à l'arrière droit, qui reçoit en allant vers l'axe abandonné par l'avancé. Le 2 droit doit sortir.",
              courses: { DC: [-4.4, 8.8], ArD: [1.8, 9.0] },
              passe: ['DC', 'ArD', 0.35],
              def: { D3: [-3.6, 8.2], D2: [2.6, 7.4] },
            },
            {
              texte: "Le pivot surgit par une course courbe, hors de la vue des défenseurs, et se démarque entre le 2 droit et le central. L'arrière droit lui passe.",
              courses: { Piv: { vers: [1.0, 6.4], via: [-3.0, 10.0] } },
              passe: ['ArD', 'Piv', 0.6],
            },
            { texte: "Le pivot tire. Autre suite: passe et va entre le pivot et l'arrière droit.", tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ouvrir-une-porte',
      nom: 'Ouvrir une porte (agrandissement surprise de l\'espace)',
      alias: '"Abrir una puerta", "ampliaciones sorpresivas de espacio" (ES, M. Laguna)',
      categorie: 'Contre 5-1',
      defense: '5-1 (exemple), toutes défenses',
      dispositif: '5-1',
      resume: "Un joueur fixe son défenseur en l'emmenant hors de sa zone; un partenaire surgit par surprise dans la \"porte\" ainsi ouverte.",
      description: [
        "Manuel Laguna (Fédération espagnole) appelle ainsi les \"agrandissements surprise de l'espace\": on ne cherche pas forcément le surnombre, mais un 1 contre 1 ou un 2 contre 2 dans un grand espace qui apparaît d'un coup.",
        "Exemple classique contre la 5-1: le demi-centre fixe l'avancé en l'emmenant vers une zone latérale; l'arrière du côté opposé surgit au centre, par surprise, avec \"peu de pas, peu de gestes\". Dans les exercices de Laguna, la porte peut aussi s'ouvrir quand l'ailier force l'entrée: l'arrière exploite alors l'espace entre le 1 et le 2.",
        "La source décrit le principe et des exercices avec plots, sans combinaison fixe: les schémas sont une mise en situation fidèle au principe. Laguna propose aussi d'ouvrir la porte avec un croisé, ou de finir en 2 contre 1.",
      ],
      objectif: "Créer un espace de jeu soudain pour un 1 contre 1 avantageux.",
      pointsCles: [
        "Fixer en agrandissant l'espace du partenaire.",
        "Exploiter vite: peu de pas, peu de gestes.",
        "Sans surprise, l'avantage disparaît.",
      ],
      fiabilite: 'partielle',
      sources: [
        { titre: "Laguna, El ataque posicional en las etapas de formación: hacer bien lo fácil (RFEBM, Comunicación Técnica n°264)", url: 'https://fmbalonmano.federatio.com/upload/descargas/ct264-270917.pdf', note: '"si se está atacando una defensa 5:1, el hecho de fijar al avanzado sacándole hacia una zona lateral puede ser aprovechado por el lateral contrario siempre que irrumpa en el centro de una forma sorpresiva".' },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - L'arrière opposé surgit au centre",
          etapes: [
            { texte: "L'arrière gauche passe au demi-centre.", passe: ['ArG', 'DC', 0.2] },
            {
              texte: "Le demi-centre fixe l'avancé en l'emmenant vers la zone de l'arrière gauche. L'arrière droit se tient prêt, un peu en retrait.",
              courses: { DC: [-3.0, 9.2], ArG: [-6.2, 9.6], ArD: [4.6, 10.2] },
              def: { D3: [-2.2, 8.4] },
            },
            {
              texte: "L'arrière droit fait irruption au centre, par surprise, avec peu de pas; le demi-centre lui passe.",
              courses: { ArD: [1.0, 9.0] },
              passe: ['DC', 'ArD', 0.5],
              def: { G3: [-0.5, 6.9] },
            },
            {
              texte: "Il attaque l'axe vide (1 contre 1, ou 2 contre 2 avec le pivot) et tire.",
              courses: { ArD: [0.8, 8.0] },
              tir: { par: 'ArD', t: 0.7 },
            },
          ],
        },
        {
          nom: "2 - L'ailier force l'entrée",
          etapes: [
            {
              texte: "Le ballon circule entre les joueurs de 1re ligne et arrive à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.8] },
              passe: ['ArG', 'AiG', 0.3],
            },
            {
              texte: "L'ailier force l'entrée vers l'intérieur, entre le 1 et le 2 gauches: le 2 glisse vers lui pour fermer. L'arrière gauche se prépare.",
              courses: { AiG: [-6.4, 5.2], ArG: [-6.4, 9.6] },
              def: { G2: [-5.4, 6.0], G1: [-7.2, 4.0] },
            },
            {
              texte: "La porte s'ouvre: l'arrière gauche surgit dans l'espace entre le 1 et le 2, l'ailier lui redonne.",
              courses: { ArG: [-6.6, 7.4] },
              passe: ['AiG', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'yomba-5-1',
      nom: 'Yomba contre 5-1 (jeux n°1 et n°2)',
      alias: '"Pizarra" de Yomba, jugadas 1 y 2 contra defensa 5-1 (ES)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Deux jeux d'un entraîneur espagnol: le demi-centre descend aux 6 m et bloque l'avancé (n°1) ou le 2 gauche (n°2), avec leurs fins selon la défense.",
      description: [
        "Ces jeux viennent de la \"Pizarra\" (tableau noir) d'un entraîneur espagnol signant Yomba, publiée sur un site personnel vers 2000. Chaque jeu a une version de base et des \"versions\" selon la réaction de la défense.",
        "Jeu n°1: le demi-centre passe à l'arrière droit et descend aux 6 m; en descendant, il bloque l'avancé. Le ballon passe à l'arrière gauche, qui fixe en ouvrant vers l'aile et sert le pivot, venu par une circulation extérieure; le pivot pénètre le long du bloc. Version 1.1: si le 2 gauche ferme, le pivot rend à l'arrière gauche, en surnombre. Version 1.2: si le central ferme, passe au demi-centre devenu pivot.",
        "Jeu n°2: le demi-centre descend dans le dos de l'arrière gauche; l'arrière droit joue un bloc dynamique avec le pivot puis renverse vers l'arrière gauche, qui pénètre grâce au bloc du demi-centre devenu 2e pivot. Version 2.1: si le 1 ferme, passe à l'ailier. Version 2.2: si le central a suivi le demi-centre, celui-ci coupe vers le milieu pour gagner la position. Le schéma d'origine du jeu n°1 montre l'action du côté droit; le texte, suivi ici, la place à gauche.",
      ],
      objectif: "Neutraliser l'avancé (n°1) ou un 2 (n°2) par le bloc du demi-centre devenu pivot.",
      pointsCles: [
        "Bloc du demi-centre sur l'avancé (n°1) ou sur le 2 gauche (n°2).",
        "Passes rapides et précises en 1re ligne.",
        "Bonnes fixations du vis-à-vis direct.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Yomba, "Pizarra": Jugada 1 contra defensa 5-1 (archive web, vers 2002)', url: 'http://web.archive.org/web/2003id_/http://www.geocities.com/Colosseum/Field/3190/j0001.htm', note: '"El Central bloquea al avanzado al entrar a raya [...] Pivot recibe del Lateral Izqd. penetra y lanza si no cierra la defensa aprovechando el bloqueo del central".' },
        { titre: 'Yomba, "Pizarra": Jugada 2 contra defensa 5-1 (archive web, vers 2002)', url: 'http://web.archive.org/web/2003id_/http://www.geocities.com/Colosseum/Field/3190/j0002.htm', note: '"Lateral Drch. pasa al Lat. Izqd. que penetra aprovechando el bloqueo del central convertido en el segundo pivot por el exterior".' },
      ],
      ballon: 'DC',
      depart: { Piv: [2.6, 6.5] },
      variantes: [
        {
          nom: "1 - Bloc sur l'avancé, tir du pivot",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit et commence à descendre vers les 6 m.",
              courses: { DC: [-0.4, 9.9] },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit renverse vers l'arrière gauche. En descendant, le demi-centre bloque l'avancé. Le pivot sort et circule par l'extérieur, derrière la ligne des 9 m.",
              courses: { DC: { vers: [-0.9, 8.5], ecran: true }, Piv: { vers: [1.6, 10.8], via: [3.6, 9.4] } },
              passe: ['ArD', 'ArG', 0.35],
              def: { D3: [-0.1, 8.9] },
            },
            {
              texte: "L'arrière gauche fixe son vis-à-vis en s'ouvrant vers l'aile. Le pivot poursuit sa course derrière le bloc.",
              courses: { ArG: [-6.2, 8.4], Piv: { vers: [-2.6, 9.6], via: [-0.6, 11.6] } },
              def: { G2: [-5.6, 7.0] },
            },
            {
              texte: "Il passe au pivot, qui pénètre le long du bloc du demi-centre.",
              courses: { Piv: [-2.0, 7.6] },
              passe: ['ArG', 'Piv', 0.15],
            },
            { texte: "Le pivot tire si la défense ne ferme pas.", tir: 'Piv' },
          ],
        },
        {
          nom: '1.1 - Le 2 gauche ferme',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit et commence à descendre vers les 6 m.",
              courses: { DC: [-0.4, 9.9] },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit renverse vers l'arrière gauche. En descendant, le demi-centre bloque l'avancé. Le pivot sort et circule par l'extérieur, derrière la ligne des 9 m.",
              courses: { DC: { vers: [-0.9, 8.5], ecran: true }, Piv: { vers: [1.6, 10.8], via: [3.6, 9.4] } },
              passe: ['ArD', 'ArG', 0.35],
              def: { D3: [-0.1, 8.9] },
            },
            {
              texte: "L'arrière gauche fixe son vis-à-vis en s'ouvrant vers l'aile. Le pivot poursuit sa course derrière le bloc.",
              courses: { ArG: [-6.2, 8.4], Piv: { vers: [-2.6, 9.6], via: [-0.6, 11.6] } },
              def: { G2: [-5.6, 7.0] },
            },
            {
              texte: "Il passe au pivot, qui pénètre le long du bloc.",
              courses: { Piv: [-2.0, 7.6] },
              passe: ['ArG', 'Piv', 0.15],
            },
            {
              texte: "Le 2 gauche ferme sur le pivot: le pivot rend à l'arrière gauche, qui a le surnombre à gauche.",
              courses: { ArG: [-5.6, 7.8] },
              passe: ['Piv', 'ArG', 0.3],
              def: { G2: [-3.0, 7.4] },
            },
            { texte: "L'arrière gauche pénètre et tire (ou sert l'ailier qui entre).", tir: 'ArG' },
          ],
        },
        {
          nom: '1.2 - Le central ferme',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit et commence à descendre vers les 6 m.",
              courses: { DC: [-0.4, 9.9] },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit renverse vers l'arrière gauche. En descendant, le demi-centre bloque l'avancé. Le pivot sort et circule par l'extérieur, derrière la ligne des 9 m.",
              courses: { DC: { vers: [-0.9, 8.5], ecran: true }, Piv: { vers: [1.6, 10.8], via: [3.6, 9.4] } },
              passe: ['ArD', 'ArG', 0.35],
              def: { D3: [-0.1, 8.9] },
            },
            {
              texte: "L'arrière gauche fixe son vis-à-vis en s'ouvrant vers l'aile. Le pivot poursuit sa course derrière le bloc.",
              courses: { ArG: [-6.2, 8.4], Piv: { vers: [-2.6, 9.6], via: [-0.6, 11.6] } },
              def: { G2: [-5.6, 7.0] },
            },
            {
              texte: "Il passe au pivot, qui pénètre le long du bloc.",
              courses: { Piv: [-2.0, 7.6] },
              passe: ['ArG', 'Piv', 0.15],
            },
            {
              texte: "Le central ferme sur le pivot: passe au demi-centre, qui a quitté son bloc et joue maintenant pivot.",
              courses: { DC: [0.4, 6.6] },
              passe: ['Piv', 'DC', 0.4],
              def: { G3: [-1.4, 6.6] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: '2 - Bloc sur le 2 gauche',
          etapes: [
            { texte: "Mise en jeu: le demi-centre donne à l'arrière gauche.", passe: ['DC', 'ArG', 0.2] },
            {
              texte: "L'arrière gauche fixe son vis-à-vis et rend au demi-centre.",
              courses: { ArG: [-4.8, 8.8] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-4.4, 7.0] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit et descend vers les 6 m dans le dos de l'arrière gauche, à l'extérieur du 2 gauche.",
              courses: { DC: { vers: [-5.4, 6.2], via: [-3.4, 10.4] }, ArG: [-5.8, 9.8] },
              passe: ['DC', 'ArD', 0.15],
            },
            {
              texte: "L'arrière droit fixe en ouvrant le jeu et joue un bloc dynamique avec le pivot (il le sert si c'est possible).",
              courses: { ArD: [5.6, 8.4], Piv: { vers: [3.6, 6.6], ecran: true } },
              def: { D2: [4.4, 6.2] },
            },
            {
              texte: "Il renverse vers l'arrière gauche, qui revient lancé.",
              courses: { ArG: [-5.8, 8.8] },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche pénètre à l'extérieur, grâce au bloc du demi-centre devenu 2e pivot sur le 2 gauche, et tire.",
              courses: { DC: { vers: [-5.2, 6.4], ecran: true }, ArG: [-6.8, 7.2] },
              tir: { par: 'ArG', t: 0.7 },
              def: { G1: [-7.6, 3.4] },
            },
          ],
        },
        {
          nom: '2.1 - Le 1 gauche ferme',
          etapes: [
            { texte: "Mise en jeu: le demi-centre donne à l'arrière gauche.", passe: ['DC', 'ArG', 0.2] },
            {
              texte: "L'arrière gauche fixe son vis-à-vis et rend au demi-centre.",
              courses: { ArG: [-4.8, 8.8] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-4.4, 7.0] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit et descend vers les 6 m dans le dos de l'arrière gauche, à l'extérieur du 2 gauche.",
              courses: { DC: { vers: [-5.4, 6.2], via: [-3.4, 10.4] }, ArG: [-5.8, 9.8] },
              passe: ['DC', 'ArD', 0.15],
            },
            {
              texte: "L'arrière droit fixe en ouvrant le jeu et joue un bloc dynamique avec le pivot.",
              courses: { ArD: [5.6, 8.4], Piv: { vers: [3.6, 6.6], ecran: true } },
              def: { D2: [4.4, 6.2] },
            },
            {
              texte: "Il renverse vers l'arrière gauche, qui revient lancé.",
              courses: { ArG: [-5.8, 8.8] },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche attaque à l'extérieur du bloc; le 1 gauche ferme sur lui: il sert l'ailier, qui pénètre.",
              courses: { DC: { vers: [-5.2, 6.4], ecran: true }, ArG: [-6.6, 7.4], AiG: [-8.6, 3.0] },
              passe: ['ArG', 'AiG', 0.5],
              def: { G1: [-7.2, 6.2] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2.2 - Le central suit le demi-centre',
          etapes: [
            { texte: "Mise en jeu: le demi-centre donne à l'arrière gauche.", passe: ['DC', 'ArG', 0.2] },
            {
              texte: "L'arrière gauche fixe son vis-à-vis et rend au demi-centre.",
              courses: { ArG: [-4.8, 8.8] },
              passe: ['ArG', 'DC', 0.6],
              def: { G2: [-4.4, 7.0] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit et descend vers les 6 m dans le dos de l'arrière gauche, à l'extérieur du 2 gauche.",
              courses: { DC: { vers: [-5.4, 6.2], via: [-3.4, 10.4] }, ArG: [-5.8, 9.8] },
              passe: ['DC', 'ArD', 0.15],
            },
            {
              texte: "L'arrière droit fixe en ouvrant le jeu et joue un bloc dynamique avec le pivot.",
              courses: { ArD: [5.6, 8.4], Piv: { vers: [3.6, 6.6], ecran: true } },
              def: { D2: [4.4, 6.2] },
            },
            {
              texte: "Il renverse vers l'arrière gauche, qui revient lancé.",
              courses: { ArG: [-5.8, 8.8] },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "Le central est venu défendre sur la descente du demi-centre. Celui-ci coupe vers le milieu, devant lui, pour gagner la position, et reçoit de l'arrière gauche.",
              courses: { DC: { vers: [-1.8, 7.4], via: [-3.6, 8.0] } },
              passe: ['ArG', 'DC', 0.55],
              def: { G3: [-3.2, 6.4] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'position-tir-contre-1-5',
      nom: "Position de tir contre une 1-5 (le demi-centre dans le dos de l'avancé)",
      alias: 'Afslutning mod 5-1 (DA), Shooting position against 5-1 (EN)',
      categorie: 'Contre 5-1',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Le jeu part vers la gauche; le demi-centre emmène l'avancé vers l'extérieur, revient dans son dos et tire grâce au bloc du pivot.",
      description: [
        "Fiche de Dragør HK. L'attaque démarre par du jeu placé vers la gauche, éventuellement sans relais sur le demi-centre. Quand le ballon arrive à l'arrière gauche, il s'engage à l'extérieur du 2 gauche.",
        "Pendant ce temps, le demi-centre emmène l'avancé vers l'extérieur, puis reprend à l'intérieur, dans le dos de l'avancé. Il profite du bloc du pivot sur le central, reçoit de l'arrière gauche et tire. Le schéma suit celui de la fiche (ballon parti de l'ailier droit, passe directe de l'arrière droit à l'arrière gauche).",
      ],
      objectif: "Donner au demi-centre un tir de près dans le dos de l'avancé.",
      pointsCles: [
        "Le demi-centre emmène d'abord l'avancé à l'extérieur, puis change de direction.",
        "L'arrière gauche s'engage à l'extérieur du 2 pour attirer la défense.",
        "Le pivot bloque le central du côté où arrive le demi-centre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Position de tir contre une 1-5 (Dragør HK, trad. C. Meier)', url: 'http://www.dragoerhb.dk/fransk/f119.html', note: '"Le DC emmène externe pour reprendre interne derrière le défenseur avancé, profite du bloc du PVT pour recevoir la balle de ARG et tire."' },
      ],
      ballon: 'AiD',
      depart: { G3: [0.7, 6.7], Piv: [-0.5, 6.4], AiD: [9.0, 4.0], G1: [-7.4, 2.6], D1: [7.6, 3.0] },
      etapes: [
        {
          texte: "Le jeu part vers la gauche: l'ailier droit passe à l'arrière droit.",
          courses: { ArD: [6.0, 9.2] },
          passe: ['AiD', 'ArD', 0.2],
        },
        {
          texte: "L'arrière droit passe directement à l'arrière gauche, sans relais sur le demi-centre. Le demi-centre part vers la droite et emmène l'avancé.",
          courses: { DC: [1.8, 8.6], ArG: [-5.8, 8.8] },
          passe: ['ArD', 'ArG', 0.3],
          def: { D3: [0.8, 9.2] },
        },
        {
          texte: "L'arrière gauche s'engage à l'extérieur du 2 gauche. Le demi-centre revient à l'intérieur, dans le dos de l'avancé, le long du bloc du pivot sur le central, et reçoit.",
          courses: { ArG: [-5.8, 7.2], DC: { vers: [-1.6, 7.0], via: [0.4, 8.0] }, Piv: { vers: [-0.3, 6.5], ecran: true } },
          passe: ['ArG', 'DC', 0.6],
          def: { G2: [-5.0, 6.2], G3: [0.5, 6.9], D3: [0.6, 9.0] },
        },
        { texte: "Le demi-centre tire.", tir: 'DC' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-dc-contre-1-5',
      nom: 'Entrée du demi-centre contre 1-5 (autour du bloc du pivot)',
      alias: 'Midt/Backovergang (DA)',
      categorie: 'Contre 5-1',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Le demi-centre entre bloquer le 2 gauche, l'arrière gauche traverse dans le dos de l'avancé, puis le demi-centre contourne le bloc du pivot et tire.",
      description: [
        "Fiche de Dragør HK. L'arrière gauche passe à l'arrière droit. Au même moment, le demi-centre entre et pose un bloc sur le 2 gauche; l'avancé, attentif à l'arrière droit, ne le suit pas.",
        "L'arrière gauche reçoit en s'engageant dans le dos de l'avancé et attire le 2 droit. Le demi-centre quitte son bloc, tourne en demi-cercle autour du bloc du pivot, reçoit de l'arrière gauche et tire. Le schéma suit celui de la fiche.",
      ],
      objectif: "Libérer le demi-centre au centre, dans le dos de l'avancé.",
      pointsCles: [
        "L'avancé doit être occupé par l'arrière droit au moment où le demi-centre entre.",
        "L'arrière gauche traverse avec le ballon pour attirer le 2 droit.",
        "Le demi-centre arrive lancé autour du bloc du pivot.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Entrée du DC (Dragør HK)', url: 'http://www.dragoerhb.dk/fransk/f1481.html', note: '"Le DC, en bloc sur 2D, se déplace en demi cercle autour du bloc de PVT, reçoit la balle de ARG et tire."' },
      ],
      ballon: 'ArG',
      depart: { G1: [-7.4, 3.0], G2: [-4.4, 5.8], G3: [-0.2, 6.7], D3: [0, 9.2], D2: [5.0, 5.6], D1: [7.6, 3.0], Piv: [1.0, 6.6] },
      etapes: [
        {
          texte: "L'arrière gauche passe à l'arrière droit. Au même moment, le demi-centre entre et pose un bloc sur le 2 gauche. L'avancé, attentif à l'arrière droit, ne le suit pas.",
          courses: { DC: { vers: [-3.6, 6.4], ecran: true }, ArD: [3.6, 9.6] },
          passe: ['ArG', 'ArD', 0.25],
          def: { D3: [0.8, 9.2] },
        },
        {
          texte: "L'arrière droit rend à l'arrière gauche.",
          courses: { ArG: [-3.6, 9.2] },
          passe: ['ArD', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche s'engage avec le ballon dans le dos de l'avancé, vers la droite, et attire le 2 droit. Le demi-centre quitte son bloc.",
          courses: { ArG: { vers: [3.8, 7.4], via: [0.0, 8.0] }, DC: [-1.4, 7.4] },
          def: { D2: [4.6, 6.6] },
        },
        {
          texte: "Le demi-centre tourne en demi-cercle autour du bloc du pivot sur le central et reçoit de l'arrière gauche.",
          courses: { DC: { vers: [2.2, 7.2], via: [0.6, 8.0] }, Piv: { vers: [0.6, 6.5], ecran: true } },
          passe: ['ArG', 'DC', 0.5],
          def: { G3: [-0.4, 6.7] },
        },
        { texte: "Le demi-centre tire.", tir: 'DC' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-pivot-1-5',
      nom: 'Croisé pivot contre 1-5 (deux blocs)',
      alias: 'Stregkryds (DA)',
      categorie: 'Contre 5-1',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Après un retour de passe de l'ailier, l'ailier bloque le central et le pivot bloque le 2: l'arrière gauche tire entre les deux blocs.",
      description: [
        "Fiche de Dragør HK. Le ballon circule de l'arrière droit au demi-centre puis à l'arrière gauche, qui passe à l'ailier gauche et se lance vers le 2 gauche (si le 2 sort pour défendre, la combinaison continue).",
        "L'ailier rend aussitôt au demi-centre, qui se décale vers la droite. L'ailier passe dans le dos du 2 et va bloquer le central; le pivot sort et bloque le 2. L'arrière gauche se lance vers le centre, reçoit du demi-centre et tire entre les deux blocs. La fiche précise que la combinaison \"demande un excellent timing\". Schéma d'après celui de la fiche.",
      ],
      objectif: "Ouvrir un couloir de tir au centre-gauche par deux blocs simultanés.",
      pointsCles: [
        "Le 2 gauche doit sortir sur l'arrière: c'est le signal.",
        "L'ailier et le pivot posent leurs blocs au même moment.",
        "Excellent timing nécessaire.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Croisé pivot (Dragør HK)', url: 'http://www.dragoerhb.dk/fransk/f194.html', note: '"ALG passe derrière 2D et va poser un bloc sur le défenseur 3G. Le pivot sort et vient bloquer 2D. ARG se lance vers le centre, reçoit la balle de DC et prend le shoot entre les deux blocs."' },
      ],
      ballon: 'ArD',
      depart: { Piv: [0.4, 6.3], G3: [-0.4, 7.3], D3: [0, 9.4] },
      etapes: [
        { texte: "L'arrière droit passe au demi-centre.", passe: ['ArD', 'DC', 0.2] },
        {
          texte: "Le demi-centre passe à l'arrière gauche.",
          courses: { ArG: [-5.8, 9.6] },
          passe: ['DC', 'ArG', 0.2],
        },
        {
          texte: "L'arrière gauche passe à l'ailier gauche et se lance vers le 2 gauche, qui sort pour défendre. Le pivot sort à son tour et vient bloquer le 2.",
          courses: { AiG: [-8.8, 3.4], ArG: [-5.2, 8.2], Piv: { vers: [-3.8, 7.6], via: [0.0, 6.0], ecran: true } },
          passe: ['ArG', 'AiG', 0.15],
          def: { G2: [-4.8, 7.0] },
        },
        {
          texte: "L'ailier rend aussitôt au demi-centre, qui se décale vers la droite. L'ailier passe dans le dos du 2 et va bloquer le central.",
          courses: {
            DC: [1.4, 9.8],
            AiG: { vers: [-1.4, 7.4], via: [-5.6, 5.8], ecran: true },
          },
          passe: ['AiG', 'DC', 0.15],
          def: { D3: [0.4, 9.0] },
        },
        {
          texte: "L'arrière gauche se lance vers le centre et reçoit du demi-centre entre les deux blocs.",
          courses: { ArG: [-2.6, 8.4] },
          passe: ['DC', 'ArG', 0.5],
        },
        { texte: "L'arrière gauche tire entre les deux blocs.", tir: 'ArG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'stregryk-bag-5-1',
      nom: 'Démarquage du pivot derrière une 5-1',
      alias: 'Stregryk bag 5-1 (DA), Pivot move behind 5-1 (EN)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Le demi-centre emmène l'avancé à gauche pour libérer la passe longue vers l'arrière droit, qui sert aussitôt le pivot démarqué.",
      description: [
        "Fiche danoise de Dragør HK (non traduite en français). Le demi-centre part avec le ballon à gauche de l'avancé et passe à l'arrière gauche: ce déplacement libère la trajectoire de passe entre l'arrière gauche et l'arrière droit.",
        "L'arrière gauche passe aussitôt à l'arrière droit, qui attaque à l'extérieur de son 2. Le pivot se démarque, par derrière ou devant son défenseur. La fiche insiste: le démarquage doit être rapide et la passe de l'arrière droit au pivot doit partir dès la réception. Schéma d'après celui de la fiche.",
      ],
      objectif: "Servir le pivot démarqué grâce à une passe longue que l'avancé ne peut plus couper.",
      pointsCles: [
        "Le demi-centre emmène l'avancé hors de la trajectoire de passe.",
        "Démarquage rapide du pivot.",
        "Passe au pivot immédiate, dès la réception.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Stregryk bag 5-1 (Dragør HK, danois)', url: 'http://www.dragoerhb.dk/x1041.html', note: '"PM rykker med bolden til venstre for den fremskudte [...] Rykket skal være hurtigt og afleveringen til stregen fra HB skal ske straks efter boldmodtagelsen." (le démarquage doit être rapide et la passe partir aussitôt)' },
      ],
      ballon: 'DC',
      depart: { G3: [-1.4, 6.9], Piv: [-2.8, 6.4], D3: [0, 9.4] },
      etapes: [
        {
          texte: "Le demi-centre part avec le ballon à gauche de l'avancé, qui le suit, et passe à l'arrière gauche. La trajectoire de passe entre les arrières se libère.",
          courses: { DC: [-2.8, 9.6] },
          passe: ['DC', 'ArG', 0.7],
          def: { D3: [-2.0, 8.8] },
        },
        {
          texte: "L'arrière gauche passe aussitôt à l'arrière droit (passe longue).",
          courses: { ArD: [5.6, 8.8] },
          passe: ['ArG', 'ArD', 0.2],
        },
        {
          texte: "L'arrière droit attaque à l'extérieur du 2 droit. Le pivot se démarque vite, dans le dos du central, vers la droite.",
          courses: { ArD: [5.6, 7.4], Piv: { vers: [1.0, 6.3], via: [-1.0, 6.0] } },
          def: { D2: [4.8, 6.6], G3: [-0.6, 7.2] },
        },
        {
          texte: "Passe immédiate au pivot.",
          passe: ['ArD', 'Piv', 0.15],
          def: { G3: [0.0, 7.1] },
        },
        { texte: "Le pivot tire.", tir: 'Piv' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-dc-1-5-croise',
      nom: 'Entrée du demi-centre 01: croisé puis entrée en 2e pivot',
      alias: 'Tactique de match 06 (entrainement-handball.fr)',
      categorie: 'Contre 5-1',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Le demi-centre croise avec l'arrière gauche, puis entre en 2e pivot dans le dos du 3 haut: 3 contre 2 à droite.",
      description: [
        "Fiche d'entrainement-handball.fr. Le pivot se place à gauche, entre le 1 et le 2 (côté extérieur du 2). Le demi-centre croise avec l'arrière gauche, qui fixe le 3 haut (l'avancé) le plus haut possible.",
        "Sur la passe de l'arrière gauche à l'arrière droit, le demi-centre entre en 2e pivot dans le dos du 3 haut. On joue alors le 3 contre 2 à droite: arrière droit, demi-centre devenu pivot et ailier droit contre le 2 et le 1. Trois fins selon le 2 droit: passe au pivot, tir de l'arrière droit, ou décalage de l'ailier.",
        "Sur les schémas de la fiche, le central (\"3 bas\") est décalé du côté du pivot, ce qui laisse de l'espace à droite.",
      ],
      objectif: "Jouer dans le dos de l'avancé avec un 3 contre 2 côté droit.",
      pointsCles: [
        "Au moment du croisé, le demi-centre fixe bien le 3 haut et le 2.",
        "L'arrière gauche fixe le 3 haut le plus haut possible.",
        "Le demi-centre entre au moment de la passe vers l'arrière droit.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "Tactique de match 06: l'attaque d'une 1-5 par l'entrée du demi-centre 01 (entrainement-handball.fr)", url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-lattaque-dune-1-5-par-lentree-du-demi-centre-01/', note: 'Principe: "Enchaîner un croisé puis une entrée du demi-centre pour jouer dans le dos de la défense"; dès la passe ARG-ARD, le DC entre en second pivot derrière le n°3 haut.' },
      ],
      ballon: 'DC',
      depart: { G1: [-7.4, 2.6], G2: [-5.0, 5.6], G3: [-2.2, 6.6], D2: [5.0, 5.4], D1: [7.4, 2.4], Piv: [-6.6, 4.6] },
      variantes: [
        {
          nom: '1 - Passe au pivot',
          etapes: [
            {
              texte: "Le demi-centre s'engage vers la gauche. L'arrière gauche croise dans son dos vers le centre et reçoit.",
              courses: { DC: [-2.2, 9.2], ArG: { vers: [0.8, 9.6], via: [-2.6, 11.4] } },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.6, 8.6] },
            },
            {
              texte: "L'arrière gauche fixe le 3 haut le plus haut possible et passe à l'arrière droit. Sur cette passe, le demi-centre entre en 2e pivot dans le dos du 3 haut.",
              courses: { ArD: [5.0, 8.8], DC: { vers: [1.4, 6.6], via: [-1.2, 7.6] } },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "3 contre 2 à droite. Le 2 droit monte sur l'arrière droit: passe au demi-centre, devenu pivot.",
              courses: { ArD: [5.0, 8.0], DC: [2.4, 6.4] },
              passe: ['ArD', 'DC', 0.4],
              def: { D2: [4.6, 7.0] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "2 - Tir de l'arrière droit",
          etapes: [
            {
              texte: "Le demi-centre s'engage vers la gauche. L'arrière gauche croise dans son dos vers le centre et reçoit.",
              courses: { DC: [-2.2, 9.2], ArG: { vers: [0.8, 9.6], via: [-2.6, 11.4] } },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.6, 8.6] },
            },
            {
              texte: "L'arrière gauche fixe le 3 haut le plus haut possible et passe à l'arrière droit. Sur cette passe, le demi-centre entre en 2e pivot dans le dos du 3 haut.",
              courses: { ArD: [5.0, 8.8], DC: { vers: [1.4, 6.6], via: [-1.2, 7.6] } },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "Le 2 droit ne monte pas et reste sur le demi-centre: l'arrière droit tire.",
              courses: { ArD: [4.6, 8.0] },
              tir: { par: 'ArD', t: 0.7 },
              def: { D2: [2.8, 6.4] },
            },
          ],
        },
        {
          nom: "3 - Décalage de l'ailier",
          etapes: [
            {
              texte: "Le demi-centre s'engage vers la gauche. L'arrière gauche croise dans son dos vers le centre et reçoit.",
              courses: { DC: [-2.2, 9.2], ArG: { vers: [0.8, 9.6], via: [-2.6, 11.4] } },
              passe: ['DC', 'ArG', 0.55],
              def: { D3: [0.6, 8.6] },
            },
            {
              texte: "L'arrière gauche fixe le 3 haut le plus haut possible et passe à l'arrière droit. Sur cette passe, le demi-centre entre en 2e pivot dans le dos du 3 haut.",
              courses: { ArD: [5.0, 8.8], DC: { vers: [1.4, 6.6], via: [-1.2, 7.6] } },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "Le 2 droit monte: l'arrière droit fixe entre le 1 et le 2 droits. Le 1 ferme sur lui.",
              courses: { ArD: [6.0, 7.6], AiD: [8.8, 2.4] },
              def: { D2: [4.8, 7.2], D1: [6.8, 6.2] },
            },
            { texte: "L'arrière droit décale l'ailier droit.", passe: ['ArD', 'AiD', 0.3] },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'entree-dc-1-5-sens-opposes',
      nom: 'Entrée du demi-centre 02: deux joueurs entrent en sens opposés',
      alias: 'Tactique de match 10 (entrainement-handball.fr)',
      categorie: 'Contre 5-1',
      defense: '1-5',
      dispositif: '5-1',
      resume: "Le pivot sort face au demi-centre et reçoit; le demi-centre entre à gauche avec l'avancé, le pivot entre à droite avec le ballon.",
      description: [
        "Fiche d'entrainement-handball.fr. Objectif: perturber le déplacement défensif en faisant jouer deux joueurs dans la défense, dans des sens opposés.",
        "Le pivot part de l'extérieur, entre le 1 et le 2 gauches. Le demi-centre fixe le 3 haut (l'avancé) et passe au pivot, venu de l'extérieur fixer la défense. Le demi-centre rentre alors à l'opposé de la rentrée du pivot, pour \"amener\" le 3 haut avec lui.",
        "Trois fins: si le 2 ne défend pas sur le pivot et que le 1 ne ferme pas, le pivot tire; si le 2 défend sur le pivot, celui-ci croise avec l'arrière droit, qui tire; si le 3 bas ferme l'intervalle intérieur de l'arrière droit, celui-ci attaque à l'extérieur et décale l'ailier. Schéma d'après celui de la fiche.",
      ],
      objectif: "Désorganiser la 1-5 avec deux entrées simultanées en sens contraires.",
      pointsCles: [
        "Le pivot vient de l'extérieur et fixe la défense avant de recevoir.",
        "Le demi-centre entre à l'opposé du pivot et emmène le 3 haut.",
        "L'arrière droit lit le 2 et le 3 bas pour choisir la fin.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "Tactique de match 10: l'attaque d'une 1-5 par l'entrée du demi-centre 02 (entrainement-handball.fr)", url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-lattaque-dune-1-5-par-lentree-du-demi-centre-02/', note: "\"Le Demi-Centre rentre alors à l'opposé de la rentrée pour \"amener\" le n°3 haut avec lui\"; fins: tir du pivot, croisé pivot-ARD, décalage de l'ailier." },
      ],
      ballon: 'DC',
      depart: { G1: [-7.4, 3.4], G2: [-4.8, 6.4], G3: [0, 6.8], D2: [4.8, 6.4], D1: [7.4, 3.4], Piv: [-6.0, 5.4], ArG: [-7.2, 9.6] },
      variantes: [
        {
          nom: '1 - Tir du pivot',
          etapes: [
            {
              texte: "Le pivot sort de l'extérieur, entre le 1 et le 2 gauches, et vient se placer face à la défense, près de l'avancé. Le demi-centre fixe l'avancé.",
              courses: { Piv: { vers: [1.0, 9.9], via: [-6.0, 9.4] }, DC: [-0.6, 10.2] },
            },
            {
              texte: "Le demi-centre passe au pivot puis rentre vers la gauche, dans la défense, et amène l'avancé avec lui. L'arrière droit s'écarte.",
              courses: { DC: { vers: [-3.4, 7.0], via: [-2.4, 9.8] }, ArD: [6.8, 9.8] },
              passe: ['DC', 'Piv', 0.15],
              def: { D3: [-2.2, 8.2] },
            },
            {
              texte: "Le pivot, balle en main, entre à son tour vers la droite: les deux joueurs entrent en sens opposés.",
              courses: { Piv: { vers: [4.8, 8.4], via: [3.0, 9.8] } },
            },
            {
              texte: "Le 2 droit ne défend pas sur lui et le 1 ne ferme pas: le pivot va au tir.",
              courses: { Piv: [6.0, 5.6] },
              tir: { par: 'Piv', t: 0.75 },
              def: { D2: [4.2, 6.8] },
            },
          ],
        },
        {
          nom: "2 - Croisé avec l'arrière droit",
          etapes: [
            {
              texte: "Le pivot sort de l'extérieur, entre le 1 et le 2 gauches, et vient se placer face à la défense, près de l'avancé. Le demi-centre fixe l'avancé.",
              courses: { Piv: { vers: [1.0, 9.9], via: [-6.0, 9.4] }, DC: [-0.6, 10.2] },
            },
            {
              texte: "Le demi-centre passe au pivot puis rentre vers la gauche, dans la défense, et amène l'avancé avec lui. L'arrière droit s'écarte.",
              courses: { DC: { vers: [-3.4, 7.0], via: [-2.4, 9.8] }, ArD: [6.8, 9.8] },
              passe: ['DC', 'Piv', 0.15],
              def: { D3: [-2.2, 8.2] },
            },
            {
              texte: "Le pivot, balle en main, entre à son tour vers la droite: les deux joueurs entrent en sens opposés.",
              courses: { Piv: { vers: [4.8, 8.4], via: [3.0, 9.8] } },
            },
            {
              texte: "Le 2 droit sort sur le pivot. Le pivot croise avec l'arrière droit, qui passe dans son dos et reçoit.",
              courses: { ArD: { vers: [3.0, 7.6], via: [5.4, 10.4] } },
              passe: ['Piv', 'ArD', 0.55],
              def: { D2: [5.2, 7.4] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
        {
          nom: "3 - Décalage de l'ailier",
          etapes: [
            {
              texte: "Le pivot sort de l'extérieur, entre le 1 et le 2 gauches, et vient se placer face à la défense, près de l'avancé. Le demi-centre fixe l'avancé.",
              courses: { Piv: { vers: [1.0, 9.9], via: [-6.0, 9.4] }, DC: [-0.6, 10.2] },
            },
            {
              texte: "Le demi-centre passe au pivot puis rentre vers la gauche, dans la défense, et amène l'avancé avec lui. L'arrière droit s'écarte.",
              courses: { DC: { vers: [-3.4, 7.0], via: [-2.4, 9.8] }, ArD: [6.8, 9.8] },
              passe: ['DC', 'Piv', 0.15],
              def: { D3: [-2.2, 8.2] },
            },
            {
              texte: "Le pivot, balle en main, entre à son tour vers la droite: les deux joueurs entrent en sens opposés.",
              courses: { Piv: { vers: [4.8, 8.4], via: [3.0, 9.8] } },
            },
            {
              texte: "Le 2 droit sort sur le pivot. Le pivot croise avec l'arrière droit, qui passe dans son dos et reçoit.",
              courses: { ArD: { vers: [3.0, 7.6], via: [5.4, 10.4] } },
              passe: ['Piv', 'ArD', 0.55],
              def: { D2: [5.2, 7.4] },
            },
            {
              texte: "Le 3 bas ferme l'intervalle intérieur de l'arrière droit: celui-ci attaque vers l'extérieur et décale l'ailier droit.",
              courses: { ArD: [4.0, 7.0], AiD: [8.6, 2.6] },
              passe: ['ArD', 'AiD', 0.5],
              def: { G3: [1.8, 7.0], D1: [5.8, 5.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'sperre-am-vorgezogenen',
      nom: "Écran du pivot sur l'avancé et débordement du demi-centre",
      alias: 'Sperre am Vorgezogenen + Überlaufen (DE)',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Le pivot quitte les 6 m et bloque l'avancé; le demi-centre le déborde, attire le central, et le pivot se replace libre au centre.",
      description: [
        "Fiche de handballtraining.de. Le pivot se tient devant le central. Le ballon arrive au demi-centre; pendant la passe, le pivot sort et bloque l'avancé, si bien que le demi-centre le déborde de l'autre côté et se retrouve en 1 contre 1 face au central.",
        "Dès que l'avancé est dépassé, le pivot se replace aux 6 m, dans l'espace laissé par le central qui glisse vers le demi-centre. Celui-ci choisit: percer si le central revient vers le pivot, passer en parallèle à l'arrière droit si la défense resserre, ou servir le pivot libre au centre.",
        "Un second article du même site montre l'action dans l'autre sens: ballon joué avec pression de la droite vers la gauche, le demi-centre passe à gauche de l'avancé, le central doit glisser et le pivot est complètement libre au centre.",
      ],
      objectif: "Neutraliser l'avancé pour créer un surnombre au centre.",
      pointsCles: [
        "Le pivot sort pendant la passe vers le demi-centre, pas avant.",
        "Le demi-centre déborde l'avancé en frôlant le bloc du pivot.",
        "Le pivot se replace aussitôt l'avancé dépassé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Angriffstaktik gegen 5:1-Abwehr: Sperren von VM (handballtraining.de)', url: 'https://handballtraining.de/taktik/angriffstaktik-gegen-51-abwehr-sperren-von-vm/1410', note: '"löst sich KM vom Kreis und sperrt den vorgezogenen Verteidiger nach links, sodass RM diesen auf der rechten Seite überlaufen kann".' },
        { titre: 'Angriffstaktik gegen die 5:1 Abwehr (handballtraining.de)', url: 'https://handballtraining.de/zusammenspiel/angriffstaktik-gegen-die-51-abwehr/785', note: 'Ballon de droite à gauche: "Somit entsteht viel Raum in der Abwehrmitte, in welchen sich der KL jetzt wieder absetzen kann und nach dem Pass von RM völlig frei ist".' },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Percée du demi-centre',
          etapes: [
            {
              texte: "Le ballon circule sans pression depuis la gauche: l'arrière gauche passe au demi-centre. Pendant la passe, le pivot quitte les 6 m et bloque l'avancé du côté droit.",
              courses: { Piv: { vers: [0.9, 9.0], ecran: true } },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-0.2, 9.1] },
            },
            {
              texte: "Le demi-centre déborde l'avancé par la droite, en frôlant le bloc: 1 contre 1 face au central, qui glisse vers lui.",
              courses: { DC: { vers: [2.0, 8.2], via: [2.4, 10.6] } },
              def: { G3: [0.9, 6.9] },
            },
            {
              texte: "Dès que l'avancé est dépassé, le pivot se replace aux 6 m, dans l'espace laissé par le central.",
              courses: { Piv: [-0.6, 6.4] },
              def: { D3: [-0.4, 8.6] },
            },
            {
              texte: "Le central revient vers le pivot: le demi-centre perce et tire.",
              courses: { DC: [2.0, 7.2] },
              tir: { par: 'DC', t: 0.7 },
              def: { G3: [0.3, 6.8] },
            },
          ],
        },
        {
          nom: "2 - Passe parallèle à l'arrière droit",
          etapes: [
            {
              texte: "Le ballon circule sans pression depuis la gauche: l'arrière gauche passe au demi-centre. Pendant la passe, le pivot quitte les 6 m et bloque l'avancé du côté droit.",
              courses: { Piv: { vers: [0.9, 9.0], ecran: true } },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-0.2, 9.1] },
            },
            {
              texte: "Le demi-centre déborde l'avancé par la droite, en frôlant le bloc: 1 contre 1 face au central, qui glisse vers lui.",
              courses: { DC: { vers: [2.0, 8.2], via: [2.4, 10.6] } },
              def: { G3: [0.9, 6.9] },
            },
            {
              texte: "Dès que l'avancé est dépassé, le pivot se replace aux 6 m, dans l'espace laissé par le central.",
              courses: { Piv: [-0.6, 6.4] },
              def: { D3: [-0.4, 8.6] },
            },
            {
              texte: "Le 2 droit resserre sur le demi-centre: passe parallèle à l'arrière droit.",
              courses: { ArD: [5.0, 8.6] },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [2.6, 7.4] },
            },
            { texte: "L'arrière droit tire (ou continue s'il est attaqué).", tir: 'ArD' },
          ],
        },
        {
          nom: '3 - Passe au pivot',
          etapes: [
            {
              texte: "Le ballon circule sans pression depuis la gauche: l'arrière gauche passe au demi-centre. Pendant la passe, le pivot quitte les 6 m et bloque l'avancé du côté droit.",
              courses: { Piv: { vers: [0.9, 9.0], ecran: true } },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [-0.2, 9.1] },
            },
            {
              texte: "Le demi-centre déborde l'avancé par la droite, en frôlant le bloc: 1 contre 1 face au central, qui glisse vers lui.",
              courses: { DC: { vers: [2.0, 8.2], via: [2.4, 10.6] } },
              def: { G3: [0.9, 6.9] },
            },
            {
              texte: "Dès que l'avancé est dépassé, le pivot se replace aux 6 m, dans l'espace laissé par le central.",
              courses: { Piv: [-0.6, 6.4] },
              def: { D3: [-0.4, 8.6] },
            },
            {
              texte: "Le central reste sur le demi-centre et le côté droit ne resserre pas: passe au pivot, libre au centre.",
              passe: ['DC', 'Piv', 0.3],
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Ballon de droite à gauche',
          etapes: [
            { texte: "Mise en place: le ballon passe à l'arrière droit, d'où il va repartir avec pression vers la gauche.", passe: ['ArG', 'ArD', 0.3] },
            {
              texte: "Juste avant la passe de l'arrière droit au demi-centre, le pivot sort et bloque l'avancé du côté gauche.",
              courses: { Piv: { vers: [-0.9, 9.0], ecran: true } },
              passe: ['ArD', 'DC', 0.6],
              def: { D3: [0.2, 9.1] },
            },
            {
              texte: "Le demi-centre perce à gauche de l'avancé, autour du bloc. Le central doit glisser vers lui pour éviter le surnombre côté gauche.",
              courses: { DC: { vers: [-2.0, 8.2], via: [-2.4, 10.6] } },
              def: { G3: [-1.8, 7.0] },
            },
            {
              texte: "L'espace s'ouvre au centre: le pivot s'y replace, seul.",
              courses: { Piv: [0.6, 6.5] },
            },
            { texte: "Le demi-centre passe au pivot.", passe: ['DC', 'Piv', 0.3] },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-rl-la-double-ecran-5-1',
      nom: 'Croisé arrière gauche-ailier gauche et double écran du pivot contre 5-1',
      alias: 'Kreuzen RL-LA mit doppelter Sperre (forum handballecke.de)',
      categorie: 'Contre 5-1',
      defense: '5-1 ouverte',
      dispositif: '5-1',
      resume: "L'arrière gauche croise avec son ailier; le pivot bloque d'abord le central puis le 2, et l'ailier file en arc dans le dos de l'avancé.",
      description: [
        "Idée donnée par un entraîneur sur le forum allemand handballecke.de, contre une 5-1 dont l'avancé est très offensif. Le pivot se place entre le 2 et le 3 gauches.",
        "L'arrière gauche croise avec l'ailier gauche. Le pivot bloque d'abord le central; quand l'ailier arrive en arc, vite, dans le dos de l'avancé en direction du centre, le pivot change de bloc et bloque le 2. L'ailier peut alors percer lui-même, remettre au pivot, ou passer derrière l'avancé à l'arrière droit. L'auteur insiste sur la vitesse d'exécution: le bloc entre le 2 et le 3 crée le surnombre.",
        "Source de forum, sans schéma détaillé: le déroulement suit le texte, les positions sont une mise en place plausible.",
      ],
      objectif: "Créer un surnombre entre le 2 et le 3 grâce à un double bloc du pivot.",
      pointsCles: [
        "Jouer vite et dynamiquement.",
        "Le pivot change de bloc au moment où l'ailier arrive.",
        "L'ailier lit: percée, remise au pivot ou passe à l'arrière droit.",
      ],
      fiabilite: 'partielle',
      sources: [
        { titre: 'Wie gegen 5:1-Verteidigung agieren? (forum handballecke.de, message de Janosch99)', url: 'https://www.handballecke.de/forum/thread/24804-wie-gegen-5-1-verteidigung-agieren/', note: '"rl mit La kreuzen lässt. Km steht zwischen 2 und 3, sperrt erst 3, wenn La dann im Bogen dynamisch hinter der vorgezogenen Richtung Mitte zieht, stellt der Kreis die Sperre auf 2".' },
      ],
      ballon: 'ArG',
      depart: { Piv: [-2.8, 6.4] },
      variantes: [
        {
          nom: "1 - Percée de l'ailier",
          etapes: [
            {
              texte: "L'arrière gauche attaque vers l'extérieur; l'ailier gauche remonte pour croiser avec lui. Le pivot, entre le 2 et le 3, bloque d'abord le central.",
              courses: { ArG: [-6.4, 8.2], AiG: [-8.2, 5.4], Piv: { vers: [-1.8, 6.5], ecran: true } },
              def: { G2: [-5.4, 6.4] },
            },
            {
              texte: "Croisé: l'ailier passe dans le dos de l'arrière et reçoit.",
              courses: { AiG: { vers: [-5.2, 9.4], via: [-8.0, 10.2] }, ArG: [-7.2, 7.6] },
              passe: ['ArG', 'AiG', 0.55],
              def: { D3: [-2.2, 9.4] },
            },
            {
              texte: "L'ailier enchaîne en arc, vite, dans le dos de l'avancé vers le centre. Le pivot change de bloc et bloque le 2 gauche.",
              courses: { AiG: { vers: [-0.8, 7.8], via: [-3.2, 8.0] }, Piv: { vers: [-3.4, 6.6], ecran: true } },
              def: { G2: [-4.4, 6.4], G3: [0.2, 6.8] },
            },
            { texte: "Le central ne peut pas couvrir seul: l'ailier perce et tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Remise au pivot',
          etapes: [
            {
              texte: "L'arrière gauche attaque vers l'extérieur; l'ailier gauche remonte pour croiser avec lui. Le pivot, entre le 2 et le 3, bloque d'abord le central.",
              courses: { ArG: [-6.4, 8.2], AiG: [-8.2, 5.4], Piv: { vers: [-1.8, 6.5], ecran: true } },
              def: { G2: [-5.4, 6.4] },
            },
            {
              texte: "Croisé: l'ailier passe dans le dos de l'arrière et reçoit.",
              courses: { AiG: { vers: [-5.2, 9.4], via: [-8.0, 10.2] }, ArG: [-7.2, 7.6] },
              passe: ['ArG', 'AiG', 0.55],
              def: { D3: [-2.2, 9.4] },
            },
            {
              texte: "L'ailier enchaîne en arc, vite, dans le dos de l'avancé vers le centre. Le pivot change de bloc et bloque le 2 gauche.",
              courses: { AiG: { vers: [-0.8, 7.8], via: [-3.2, 8.0] }, Piv: { vers: [-3.4, 6.6], ecran: true } },
              def: { G2: [-4.4, 6.4], G3: [0.2, 6.8] },
            },
            {
              texte: "Le central ferme sur l'ailier: il remet au pivot, qui se retourne vers le but.",
              courses: { Piv: [-2.6, 6.3] },
              passe: ['AiG', 'Piv', 0.3],
              def: { G3: [-0.6, 6.8] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Passe à l'arrière droit",
          etapes: [
            {
              texte: "L'arrière gauche attaque vers l'extérieur; l'ailier gauche remonte pour croiser avec lui. Le pivot, entre le 2 et le 3, bloque d'abord le central.",
              courses: { ArG: [-6.4, 8.2], AiG: [-8.2, 5.4], Piv: { vers: [-1.8, 6.5], ecran: true } },
              def: { G2: [-5.4, 6.4] },
            },
            {
              texte: "Croisé: l'ailier passe dans le dos de l'arrière et reçoit.",
              courses: { AiG: { vers: [-5.2, 9.4], via: [-8.0, 10.2] }, ArG: [-7.2, 7.6] },
              passe: ['ArG', 'AiG', 0.55],
              def: { D3: [-2.2, 9.4] },
            },
            {
              texte: "L'ailier enchaîne en arc, vite, dans le dos de l'avancé vers le centre. Le pivot change de bloc et bloque le 2 gauche.",
              courses: { AiG: { vers: [-0.8, 7.8], via: [-3.2, 8.0] }, Piv: { vers: [-3.4, 6.6], ecran: true } },
              def: { G2: [-4.4, 6.4], G3: [0.2, 6.8] },
            },
            {
              texte: "L'avancé revient sur l'ailier: celui-ci passe, dans le dos de l'avancé, à l'arrière droit.",
              courses: { ArD: [3.0, 8.8] },
              passe: ['AiG', 'ArD', 0.3],
              def: { D3: [-0.6, 8.8] },
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'slavie',
      nom: 'Slavia (remise entre arrières)',
      alias: 'Slavie, "zpětná přihrávka mezi spojkami" (CZ)',
      categorie: 'Contre 5-1',
      defense: '5-1 (aussi en supériorité numérique)',
      dispositif: '5-1',
      resume: "Le demi-centre reçoit, repousse l'avancé, rend aussitôt à l'arrière lancé vers le centre et rentre dans la défense en emmenant l'avancé.",
      description: [
        "Combinaison \"sur signal\" observée en 1re division tchèque (mémoire de Kristýna Kubišová, 2020). Son nom tchèque signifie \"passe en retour entre arrières\"; l'origine de \"Slavie\" n'est pas expliquée. Elle sert surtout contre la 5-1, et aussi en supériorité numérique. Le pivot se tient près du central.",
        "L'arrière gauche passe au demi-centre, dont la course repousse l'avancé un peu plus loin de lui. Le demi-centre s'arrête et rend le ballon à l'arrière, lancé vers le centre; puis il continue dans la défense et emmène l'avancé, qui se retrouve \"hors jeu\". Le porteur tire ou passe à l'autre arrière (la passe à l'ailier est possible mais risquée), au pivot ou au demi-centre rentré.",
        "Variante de Nové Veselí: au moment de la remise, c'est l'autre arrière qui rentre dans la défense, entre le 2 et le 3; le demi-centre glisse à sa place, et l'arrière qui a reçu attaque le centre: tir, pivot (du côté opposé à l'arrière rentré), arrière rentré...",
      ],
      objectif: "Mettre l'avancé hors jeu pour attaquer le centre.",
      pointsCles: [
        "La course du demi-centre éloigne l'avancé de l'arrière qui a passé.",
        "La remise est immédiate, l'arrière arrive lancé.",
        "Le joueur qui rentre emmène l'avancé avec lui.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_KUBISOVA, note: "p. 31, 35: \"Po odhození střední spojka pokračuje do obrany soupeře, čímž odlákává vysunutého obránce, ten je v tu chvíli mimo hru\" (après sa passe, le demi-centre continue dans la défense et emmène l'avancé, alors hors jeu)." },
      ],
      ballon: 'ArG',
      depart: { Piv: [-2.2, 6.4] },
      variantes: [
        {
          nom: "Base - Le demi-centre emmène l'avancé",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre, dont la course repousse l'avancé vers la droite, loin de l'arrière.",
              courses: { DC: [1.4, 9.8] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [1.0, 8.6] },
            },
            {
              texte: "Le demi-centre s'arrête et rend le ballon à l'arrière gauche, lancé vers le centre.",
              courses: { ArG: [-1.8, 9.2] },
              passe: ['DC', 'ArG', 0.5],
            },
            {
              texte: "Après sa passe, le demi-centre continue dans la défense et emmène l'avancé, mis hors jeu.",
              courses: { DC: { vers: [2.2, 6.8], via: [2.4, 8.6] }, ArG: [-1.0, 8.6] },
              def: { D3: [1.6, 7.9], D2: [3.6, 6.2] },
            },
            { texte: "L'arrière gauche tire au centre (ou passe à l'autre arrière, au pivot, au demi-centre rentré).", tir: 'ArG' },
          ],
        },
        {
          nom: "Nové Veselí - L'autre arrière rentre",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre, dont la course repousse l'avancé vers la droite, loin de l'arrière.",
              courses: { DC: [1.4, 9.8] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [1.0, 8.6] },
            },
            {
              texte: "Le demi-centre s'arrête et rend le ballon à l'arrière gauche, lancé vers le centre.",
              courses: { ArG: [-1.8, 9.2] },
              passe: ['DC', 'ArG', 0.5],
            },
            {
              texte: "Au moment de la remise, c'est l'arrière droit qui rentre dans la défense, entre le 2 droit et le central; le demi-centre glisse à sa place. L'arrière gauche attaque le centre.",
              courses: { ArD: [3.0, 6.8], DC: [4.4, 9.6], ArG: [-0.6, 8.6] },
              def: { D2: [4.0, 6.0], D3: [0.4, 8.6] },
            },
            {
              texte: "Le central sort sur l'arrière gauche: passe au pivot, du côté opposé à l'arrière rentré.",
              passe: ['ArG', 'Piv', 0.3],
              def: { G3: [-0.8, 7.6] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'poky',
      nom: 'Poky (passe par le pivot sorti et tir par-dessus son écran)',
      alias: 'Poky (CZ), "kombinace s přihrávkou přes vyběhnutého pivota"',
      categorie: 'Contre 5-1',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Le pivot sort aux 9 m, reçoit du demi-centre, remet à l'arrière lancé sur lui, puis recule et fait écran pour son tir.",
      description: [
        "Combinaison observée en 1re division tchèque (mémoire de Kristýna Kubišová, 2020); le sens du nom n'est pas expliqué. Avant de recevoir, le pivot sort jusqu'à la ligne des 9 m. Le demi-centre lui passe; le pivot remet aussitôt à l'arrière, lancé droit sur lui, puis recule dans la défense et fait écran. L'arrière tire à mi-distance par-dessus l'écran, ou passe.",
        "Variante de Nové Veselí (pivot près du 2): après sa passe au pivot, le demi-centre rentre dans la défense et emmène l'avancé, ce qui ouvre le centre ou permet de renverser; le demi-centre peut aussi feinter la passe au pivot et attaquer lui-même. Variante de Písek (pivot entre le 2 et le 3): au moment de la passe du pivot, l'ailier du côté opposé rentre le long de la zone et s'arrête entre le 3 et le 2.",
      ],
      objectif: "Tir de loin protégé par l'écran du pivot, avec des solutions de continuité.",
      pointsCles: [
        "Le pivot sort avant de recevoir.",
        "L'arrière arrive droit sur le pivot pour recevoir la remise lancé.",
        "Le pivot recule aussitôt pour faire écran.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_KUBISOVA, note: 'p. 34, 43: "...a ta situací řeší buď střelou ze střední vzdálenosti přes clonícího pivota" (qui résout la situation par un tir à mi-distance par-dessus le pivot qui fait écran).' },
      ],
      ballon: 'DC',
      depart: { Piv: [-3.6, 6.4] },
      variantes: [
        {
          nom: "Base - Tir par-dessus l'écran",
          etapes: [
            {
              texte: "Avant de recevoir, le pivot sort jusqu'aux 9 m. Le demi-centre lui passe.",
              courses: { Piv: [-3.2, 9.0] },
              passe: ['DC', 'Piv', 0.6],
            },
            {
              texte: "Le pivot remet aussitôt à l'arrière gauche, lancé droit sur lui.",
              courses: { ArG: [-3.6, 10.4] },
              passe: ['Piv', 'ArG', 0.4],
            },
            {
              texte: "Le pivot recule dans la défense et fait écran sur le 2 et le central.",
              courses: { Piv: { vers: [-3.2, 7.4], ecran: true }, ArG: [-3.4, 9.0] },
              def: { G2: [-3.6, 6.4], G3: [-2.0, 6.9] },
            },
            { texte: "L'arrière gauche tire à mi-distance par-dessus l'écran.", tir: 'ArG' },
          ],
        },
        {
          nom: "Nové Veselí - Le demi-centre emmène l'avancé",
          etapes: [
            {
              texte: "Avant de recevoir, le pivot sort jusqu'aux 9 m. Le demi-centre lui passe.",
              courses: { Piv: [-3.2, 9.0] },
              passe: ['DC', 'Piv', 0.6],
            },
            {
              texte: "Après sa passe, le demi-centre rentre dans la défense et emmène l'avancé. Le pivot remet à l'arrière gauche, lancé vers lui.",
              courses: { DC: { vers: [1.4, 6.9], via: [1.6, 9.6] }, ArG: [-3.6, 10.4] },
              passe: ['Piv', 'ArG', 0.5],
              def: { D3: [1.0, 7.9] },
            },
            {
              texte: "L'espace s'ouvre au centre: l'arrière gauche y entre, pendant que le pivot recule.",
              courses: { ArG: [-1.2, 8.6], Piv: [-3.4, 7.4] },
            },
            { texte: "L'arrière gauche tire (ou renverse vers la droite).", tir: 'ArG' },
          ],
        },
        {
          nom: "Písek - L'ailier opposé rentre",
          etapes: [
            {
              texte: "Avant de recevoir, le pivot sort jusqu'aux 9 m. Le demi-centre lui passe.",
              courses: { Piv: [-3.2, 9.0] },
              passe: ['DC', 'Piv', 0.6],
            },
            {
              texte: "Le pivot remet à l'arrière gauche. Au même moment, l'ailier droit rentre le long de la zone et s'arrête entre le central et le 2 gauche.",
              courses: { ArG: [-3.6, 10.4], AiD: { vers: [-2.2, 6.3], via: [3.0, 8.2] } },
              passe: ['Piv', 'ArG', 0.4],
            },
            {
              texte: "Le pivot recule et fait écran. Le central sort sur l'arrière gauche: l'ailier rentré est libre et reçoit.",
              courses: { Piv: { vers: [-3.2, 7.6], ecran: true }, ArG: [-3.0, 9.2] },
              passe: ['ArG', 'AiD', 0.4],
              def: { G3: [-1.8, 7.9], G2: [-3.6, 6.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'roman-3-2-1-pivot',
      nom: 'Le pivot dans le dos du demi-avancé (Román, contre 3-2-1)',
      alias: '"Concepto yugoslavo" contre 3:2:1 (ES)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Le pivot occupe l'espace dans le dos du 2 (demi-avancé): servi par l'ailier, il tire, fixe puis relance, ou bloque par l'extérieur après un changement de sens.",
      description: [
        "Román Seco rappelle que les espaces faibles de la 3-2-1 sont ceux qui apparaissent dans le dos des défenseurs latéraux (les 2, demi-avancés), surtout quand ils sortent loin sur les arrières.",
        "Gr. 42: au bon moment, le pivot occupe cet espace et reçoit de l'ailier, pour tirer ou continuer; \"action en apparence simple et basique, mais très peu utilisée dans le handball espagnol\". Gr. 43: point de départ du \"concept collectif le plus habituel du jeu yougoslave\" contre cette défense (née en Yougoslavie): le pivot reçoit de l'ailier, fixe le 2, enchaîne avec l'arrière gauche, et les pénétrations successives donnent la supériorité du côté faible.",
        "Gr. 44: le central bascule avec le ballon; le pivot ne doit pas \"accompagner\" le ballon avant que le central se soit déplacé. Exemple donné: changement de sens de la passe du demi-centre vers l'arrière gauche et bloc extérieur du pivot, pour pénétrer et exploiter la supériorité à l'extérieur avec l'ailier. Schémas d'après les graphiques 42 à 44 (numérotation convertie).",
      ],
      objectif: "Exploiter l'espace dans le dos du demi-avancé de la 3-2-1.",
      pointsCles: [
        'Bon timing du pivot ("time de acción").',
        "Le pivot n'accompagne pas le ballon tant que le central n'a pas bougé.",
        "Changer le sens de circulation du ballon pour jouer loin de la défense.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_ROMAN_V, note: 'Gr. 43: "Al recibir del extremo, F, el pivote jugará con el objetivo de fijar al defensor lateral, 6, enlazando posteriormente con el lateral atacante, A"; gr. 44: le pivot doit "no acompañar" le ballon.' },
      ],
      ballon: 'ArG',
      depart: { Piv: [-2.4, 6.4] },
      variantes: [
        {
          nom: "1 - Le pivot servi par l'ailier",
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.6] },
              passe: ['ArG', 'AiG', 0.3],
            },
            {
              texte: "Au bon moment, le pivot occupe l'espace dans le dos du 2 gauche (le demi-avancé). L'ailier lui passe.",
              courses: { Piv: [-4.6, 6.0] },
              passe: ['AiG', 'Piv', 0.55],
              def: { G1: [-6.6, 3.6] },
            },
            { texte: "Le pivot tire (ou continue le jeu).", tir: 'Piv' },
          ],
        },
        {
          nom: '2 - Le pivot fixe et relance (concept yougoslave)',
          etapes: [
            {
              texte: "L'arrière gauche passe à l'ailier gauche.",
              courses: { AiG: [-8.6, 2.6] },
              passe: ['ArG', 'AiG', 0.3],
            },
            {
              texte: "L'ailier passe au pivot, qui occupe l'espace dans le dos du 2 gauche.",
              courses: { Piv: [-4.6, 6.0], ArG: [-5.0, 10.2] },
              passe: ['AiG', 'Piv', 0.55],
            },
            {
              texte: "Le pivot fixe le 2 gauche, qui recule sur lui, et donne à l'arrière gauche, qui avance.",
              courses: { ArG: [-3.2, 9.2] },
              passe: ['Piv', 'ArG', 0.4],
              def: { G2: [-4.6, 7.2], D3: [-1.8, 9.2] },
            },
            {
              texte: "L'arrière gauche attaque et passe au demi-centre: pénétrations successives vers la droite.",
              courses: { DC: [1.2, 9.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { D3: [0.2, 9.0] },
            },
            {
              texte: "Le demi-centre attaque et passe à l'arrière droit.",
              courses: { ArD: [4.8, 8.8] },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [4.6, 7.8] },
            },
            {
              texte: "L'arrière droit fixe le 2 droit; le 1 droit sort à son tour: l'ailier droit est seul du côté faible.",
              courses: { ArD: [5.6, 8.0], AiD: [8.6, 2.2] },
              passe: ['ArD', 'AiD', 0.5],
              def: { D1: [6.4, 6.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: '3 - Changement de sens et bloc extérieur',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre. La défense bascule vers le ballon; le pivot attend, sans accompagner le ballon.",
              courses: { DC: [0.6, 9.8] },
              passe: ['ArG', 'DC', 0.2],
              def: { D3: [0.4, 8.6], G3: [0.2, 6.7], G2: [-3.4, 7.6] },
            },
            {
              texte: "Le central s'est déplacé: le demi-centre change le sens de la passe vers l'arrière gauche. Le pivot pose un bloc extérieur sur le 2 gauche.",
              courses: { ArG: [-5.6, 9.4], Piv: { vers: [-4.4, 7.0], via: [-3.6, 6.0], ecran: true } },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche pénètre à l'extérieur du bloc; le 1 gauche sort sur lui: supériorité avec l'ailier gauche.",
              courses: { ArG: [-6.0, 7.8], AiG: [-8.6, 2.8] },
              passe: ['ArG', 'AiG', 0.5],
              def: { G1: [-6.8, 6.6] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'roman-3-2-1-dedoublements',
      nom: 'Trajectoires et dédoublements contre 3-2-1 (Román)',
      alias: 'Invasión por detrás, desdoblamiento del lateral / del central (ES)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Attaquer l'intervalle entre le demi-avancé et l'avancé puis jouer loin, ou occuper l'espace dans le dos du demi-avancé par le dédoublement d'un arrière ou du demi-centre.",
      description: [
        "Idée maîtresse de Román Seco contre la 3-2-1: changer le sens de circulation du ballon et jouer dans les espaces les plus éloignés du ballon. Les trajectoires dépendent de la provenance de la passe: reçue du centre, l'arrière attaque vers l'extérieur; reçue de l'aile, il attaque vers le centre, dans l'intervalle entre le 2 et l'avancé.",
        "Gr. 41: l'arrière gauche attaque l'intervalle entre le 2 gauche et l'avancé, avec une invasion par derrière du demi-centre; le plus important est le transfert immédiat du ballon vers la zone éloignée (passe directe à l'arrière droit). Gr. 45-46: au moment de la passe du demi-centre à l'arrière droit, l'arrière gauche va occuper l'espace dans le dos du 2 gauche (le pivot est du côté opposé); l'arrière droit change de trajectoire et attaque l'intervalle entre le 2 droit et l'avancé; le demi-centre glisse à la place de l'arrière gauche. L'arrière droit choisit: pivot, arrière gauche dédoublé ou demi-centre. Gr. 47: même idée avec le dédoublement du demi-centre, déclenché par la passe de l'ailier droit à l'arrière droit.",
        "Schémas d'après les graphiques de la monographie (numérotation des défenseurs convertie). Les fins montrées sont une des options décrites.",
      ],
      objectif: "Passer de 3:3 à 2:4 dans le dos d'un demi-avancé et jouer loin du ballon.",
      pointsCles: [
        "Transférer le ballon tout de suite vers la zone éloignée.",
        "Le dédoublement part au moment précis de la passe vers l'arrière droit.",
        "Le porteur fixe le 2 et l'avancé avant de choisir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { ...SRC_ROMAN_V, note: 'Gr. 41: "el lateral, A, ataca al intervalo entre los defensores 6 y 7, coordinándose con una invasión por detrás del central, B"; gr. 45: "en el momento del pase B-C, el jugador A ocupa los citados espacios"; gr. 47: dédoublement de B.' },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Intervalle 2-avancé et jeu loin',
          etapes: [
            { texte: "Le demi-centre passe à l'arrière gauche.", passe: ['DC', 'ArG', 0.2] },
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 2 gauche et l'avancé (1 contre 2). Le demi-centre envahit son espace par derrière.",
              courses: { ArG: [-2.8, 8.8], DC: { vers: [-4.4, 10.6], via: [-1.6, 11.4] } },
              def: { G2: [-3.6, 8.0], D3: [-1.6, 9.2] },
            },
            {
              texte: "Il transfère aussitôt le ballon vers la zone la plus éloignée: passe directe à l'arrière droit.",
              courses: { ArD: [5.2, 8.8] },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit attaque face à une défense déséquilibrée et tire.",
              courses: { ArD: [5.8, 7.6] },
              tir: { par: 'ArD', t: 0.7 },
              def: { D2: [4.8, 7.0] },
            },
          ],
        },
        {
          nom: "2 - Dédoublement de l'arrière gauche",
          etapes: [
            {
              texte: "L'arrière droit attaque d'abord vers l'extérieur. Le pivot se tient du côté opposé à l'action prévue.",
              courses: { ArD: [6.4, 9.0] },
              def: { D2: [5.0, 7.6] },
            },
            {
              texte: "Au moment de la passe du demi-centre à l'arrière droit, l'arrière gauche va occuper l'espace dans le dos du 2 gauche.",
              courses: { ArG: { vers: [-3.8, 6.2], via: [-6.2, 7.2] } },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit change de trajectoire et attaque l'intervalle entre le 2 droit et l'avancé. Le demi-centre glisse vers l'espace laissé par l'arrière gauche.",
              courses: { ArD: { vers: [2.4, 8.4], via: [5.4, 9.6] }, DC: [-4.8, 9.8] },
              def: { D2: [3.4, 7.8], D3: [1.4, 9.2] },
            },
            {
              texte: "Il fixe le 2 et l'avancé, puis choisit: pivot, arrière gauche dédoublé ou demi-centre. Ici, passe à l'arrière gauche, libre dans le dos du 2 gauche.",
              passe: ['ArD', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '3 - Dédoublement du demi-centre',
          etapes: [
            { texte: "Le demi-centre passe à l'arrière droit.", passe: ['DC', 'ArD', 0.2] },
            {
              texte: "L'arrière droit passe à l'ailier droit.",
              courses: { AiD: [8.6, 2.6] },
              passe: ['ArD', 'AiD', 0.2],
            },
            {
              texte: "Au moment de la passe de l'ailier droit à l'arrière droit, le demi-centre va occuper l'espace dans le dos du 2 gauche. Le pivot se tient près du ballon.",
              courses: { DC: { vers: [-3.8, 6.2], via: [-2.4, 9.8] }, Piv: [2.4, 6.6] },
              passe: ['AiD', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit attaque vers l'intérieur, dans l'intervalle entre le 2 droit et l'avancé, qu'il fixe tous les deux.",
              courses: { ArD: [2.6, 8.6] },
              def: { D2: [3.6, 8.0], D3: [1.4, 9.2] },
            },
            {
              texte: "Il sert le demi-centre, libre dans le dos du 2 gauche (ou l'arrière gauche, loin du ballon).",
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'yomba-3-2-1',
      nom: 'Yomba contre 3-2-1 (jeu n°7)',
      alias: '"Pizarra" de Yomba, jugada 7 contra defensa 3-2-1 (ES)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "L'arrière droit passe au demi-centre et entre aux 6 m; le pivot se démarque du côté opposé, dans le dos du central.",
      description: [
        "Jeu n°7 de la \"Pizarra\" de l'entraîneur espagnol Yomba (site personnel, vers 2003). L'arrière droit passe au demi-centre et entre aux 6 m. Le demi-centre sert le pivot, qui se démarque du côté opposé à l'entrée de l'arrière, dans le dos du central de la défense.",
        "Version 7.1: si le 1 gauche de la défense ferme, le pivot passe à l'ailier gauche, qui pénètre côté gauche. Version 7.2: si le central coupe la passe vers le pivot, passe rapide (\"tuya-mía\") à l'arrière entré au pivot, qui pénètre grâce au bloc du pivot sur le central. Clé du jeu: le moment et le choix de la passe du demi-centre selon la défense.",
      ],
      objectif: "Libérer le pivot dans le dos du central grâce à l'entrée de l'arrière droit.",
      pointsCles: [
        "Le pivot se démarque du côté opposé à l'entrée de l'arrière.",
        "Le demi-centre choisit sa passe selon le central.",
        "Passes rapides et précises.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Yomba, "Pizarra": Jugada 7 contra defensa 3-2-1 (archive web, vers 2003)', url: 'http://web.archive.org/web/2003id_/http://www.geocities.com/Colosseum/Field/3190/j0007.htm', note: '"El Central pasara al Pivot que se desmarca al lado contrario de donde entra a la raya el Lateral por detras del defensor central de 6m."' },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: '7 - Passe au pivot',
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre et entre vers les 6 m, à droite du central.",
              courses: { ArD: { vers: [1.8, 7.0], via: [3.4, 9.2] } },
              passe: ['ArD', 'DC', 0.15],
            },
            {
              texte: "Le central suit l'entrée de l'arrière. Le pivot se démarque du côté opposé, dans son dos.",
              courses: { Piv: { vers: [-2.4, 6.5], via: [-0.9, 6.1] } },
              def: { G3: [0.6, 7.4] },
            },
            { texte: "Le demi-centre sert le pivot.", passe: ['DC', 'Piv', 0.3] },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "7.1 - Le 1 gauche ferme: l'ailier gauche",
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre et entre vers les 6 m, à droite du central.",
              courses: { ArD: { vers: [1.8, 7.0], via: [3.4, 9.2] } },
              passe: ['ArD', 'DC', 0.15],
            },
            {
              texte: "Le central suit l'entrée de l'arrière. Le pivot se démarque du côté opposé, dans son dos.",
              courses: { Piv: { vers: [-2.4, 6.5], via: [-0.9, 6.1] } },
              def: { G3: [0.6, 7.4] },
            },
            { texte: "Le demi-centre sert le pivot.", passe: ['DC', 'Piv', 0.3] },
            {
              texte: "Le 1 gauche de la défense ferme sur le pivot: le pivot passe à l'ailier gauche.",
              courses: { AiG: [-7.8, 3.4] },
              passe: ['Piv', 'AiG', 0.3],
              def: { G1: [-3.6, 5.8] },
            },
            { texte: "L'ailier gauche pénètre côté gauche et tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "7.2 - Le central coupe: l'arrière entré au pivot",
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre et entre vers les 6 m, à droite du central.",
              courses: { ArD: { vers: [1.8, 7.0], via: [3.4, 9.2] } },
              passe: ['ArD', 'DC', 0.15],
            },
            {
              texte: "Le central suit l'entrée de l'arrière. Le pivot se démarque du côté opposé, dans son dos.",
              courses: { Piv: { vers: [-2.4, 6.5], via: [-0.9, 6.1] } },
              def: { G3: [0.6, 7.4] },
            },
            {
              texte: "Le central revient couper la passe vers le pivot: passe rapide en une-deux à l'arrière, entré au pivot.",
              passe: ['DC', 'ArD', 0.2],
              def: { G3: [-1.0, 7.4] },
            },
            {
              texte: "Le pivot bloque le central; l'arrière pénètre et tire.",
              courses: { Piv: { vers: [-1.8, 6.6], ecran: true }, ArD: [0.8, 6.6] },
              tir: { par: 'ArD', t: 0.7 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'sortie-pivot-poste-3-2-1',
      nom: 'Sortie du pivot au poste contre 3-2-1',
      alias: 'Tactique de match 11 (entrainement-handball.fr)',
      categorie: 'Contre 3-2-1',
      defense: '3-2-1',
      dispositif: '3-2-1',
      resume: "Le pivot, placé à l'opposé du ballon, sort entre 7 et 8 m dans le dos du 3 haut; le demi-centre le sert ou saute la passe vers l'arrière gauche.",
      description: [
        "Fiche d'entrainement-handball.fr. Objectif: créer une incertitude dans le dos du 3 haut (l'avancé) et trouver des intervalles à l'opposé. Le pivot se place au milieu de l'intervalle entre le 2 et le 3 bas, à l'opposé du ballon; les ailiers sont au point de corner.",
        "L'arrière droit, en dribblant, fixe à l'extérieur entre le 1 et le 2, puis passe au demi-centre, qui reçoit au milieu de l'intervalle entre le 2 et le 3 haut. Le pivot sort entre 7 et 8 m et se propose; l'arrière gauche se place, sans ballon, face à l'intervalle entre le 1 et le 2 opposés.",
        "Fins: si le 2 opposé empêche la passe au pivot, le demi-centre saute la passe vers l'arrière gauche, qui tire entre le 1 et le 2 (ou décale l'ailier si le 1 ferme); si le pivot reçoit et que le 2 et le 3 ne réagissent pas, il pivote vers l'extérieur et tire; si le 2 opposé ferme sur lui, l'arrière gauche prend l'intervalle (le texte fait passer le demi-centre, le schéma le pivot); si le 2 côté ballon ferme sur le demi-centre, celui-ci renverse vers l'arrière droit.",
      ],
      objectif: "Jouer dans le dos du 3 haut et à l'opposé du ballon.",
      pointsCles: [
        "Le pivot part à l'opposé du ballon et sort entre 7 et 8 m.",
        "L'arrière gauche attend sans ballon, face à l'intervalle 1-2.",
        "Le demi-centre lit le 2 opposé et le 2 côté ballon.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: "Tactique de match 11: l'attaque d'une 3-2-1 par la sortie du pivot au poste (entrainement-handball.fr)", url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-lattaque-dune-3-2-1-par-la-sortie-du-pivot-au-poste/', note: '"Le pivot sort entre 7 m et 8 m et donne une solution de réception de la passe du demi-centre."' },
      ],
      ballon: 'ArD',
      depart: { Piv: [-2.6, 6.8], ArG: [-6.4, 9.2], AiG: [-9.4, 0.6], AiD: [9.4, 0.6] },
      variantes: [
        {
          nom: "1 - Passe sautée à l'arrière gauche",
          etapes: [
            {
              texte: "L'arrière droit, en dribblant, fixe à l'extérieur, entre le 1 et le 2 droits.",
              courses: { ArD: [6.4, 7.4] },
              def: { D2: [5.4, 7.0], D1: [7.4, 5.0] },
            },
            {
              texte: "Il passe au demi-centre, qui reçoit au milieu de l'intervalle entre le 2 droit et le 3 haut. La défense glisse vers le ballon.",
              courses: { DC: [2.6, 9.4] },
              passe: ['ArD', 'DC', 0.4],
              def: { D3: [1.2, 9.4], G3: [0.2, 6.6], G2: [-3.8, 7.6] },
            },
            {
              texte: "Le pivot sort entre 7 et 8 m, dans le dos du 3 haut, et se propose.",
              courses: { Piv: [-1.8, 7.6] },
            },
            {
              texte: "Le 2 gauche empêche la passe au pivot: le demi-centre saute la passe vers l'arrière gauche.",
              courses: { ArG: [-6.0, 8.4] },
              passe: ['DC', 'ArG', 0.3],
              def: { G2: [-2.8, 8.2] },
            },
            {
              texte: "L'arrière gauche prend l'intervalle entre le 1 et le 2 et tire.",
              courses: { ArG: [-5.4, 7.2] },
              tir: { par: 'ArG', t: 0.7 },
            },
          ],
        },
        {
          nom: '2 - Tir du pivot',
          etapes: [
            {
              texte: "L'arrière droit, en dribblant, fixe à l'extérieur, entre le 1 et le 2 droits.",
              courses: { ArD: [6.4, 7.4] },
              def: { D2: [5.4, 7.0], D1: [7.4, 5.0] },
            },
            {
              texte: "Il passe au demi-centre, qui reçoit au milieu de l'intervalle entre le 2 droit et le 3 haut. La défense glisse vers le ballon.",
              courses: { DC: [2.6, 9.4] },
              passe: ['ArD', 'DC', 0.4],
              def: { D3: [1.2, 9.4], G3: [0.2, 6.6], G2: [-3.8, 7.6] },
            },
            {
              texte: "Le pivot sort entre 7 et 8 m, dans le dos du 3 haut, et se propose.",
              courses: { Piv: [-1.8, 7.6] },
            },
            { texte: "Le demi-centre lui passe.", passe: ['DC', 'Piv', 0.2] },
            {
              texte: "Le 2 et le 3 ne réagissent pas: le pivot pivote vers l'extérieur et tire.",
              courses: { Piv: [-2.4, 6.6] },
              tir: { par: 'Piv', t: 0.6 },
            },
          ],
        },
        {
          nom: '3 - Le 2 gauche ferme: arrière gauche puis ailier',
          etapes: [
            {
              texte: "L'arrière droit, en dribblant, fixe à l'extérieur, entre le 1 et le 2 droits.",
              courses: { ArD: [6.4, 7.4] },
              def: { D2: [5.4, 7.0], D1: [7.4, 5.0] },
            },
            {
              texte: "Il passe au demi-centre, qui reçoit au milieu de l'intervalle entre le 2 droit et le 3 haut. La défense glisse vers le ballon.",
              courses: { DC: [2.6, 9.4] },
              passe: ['ArD', 'DC', 0.4],
              def: { D3: [1.2, 9.4], G3: [0.2, 6.6], G2: [-3.8, 7.6] },
            },
            {
              texte: "Le pivot sort entre 7 et 8 m, dans le dos du 3 haut, et se propose.",
              courses: { Piv: [-1.8, 7.6] },
            },
            { texte: "Le demi-centre lui passe.", passe: ['DC', 'Piv', 0.2] },
            {
              texte: "Le 2 gauche vient fermer sur le pivot: le ballon va à l'arrière gauche.",
              courses: { ArG: [-5.8, 8.4] },
              passe: ['Piv', 'ArG', 0.3],
              def: { G2: [-2.8, 8.0] },
            },
            {
              texte: "L'arrière gauche prend l'intervalle entre le 1 et le 2; le 1 vient fermer: il décale l'ailier gauche.",
              courses: { ArG: [-5.6, 7.2], AiG: [-8.8, 2.0] },
              passe: ['ArG', 'AiG', 0.5],
              def: { G1: [-6.4, 6.4] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "4 - Renversement vers l'arrière droit",
          etapes: [
            {
              texte: "L'arrière droit, en dribblant, fixe à l'extérieur, entre le 1 et le 2 droits.",
              courses: { ArD: [6.4, 7.4] },
              def: { D2: [5.4, 7.0], D1: [7.4, 5.0] },
            },
            {
              texte: "Il passe au demi-centre, qui reçoit au milieu de l'intervalle entre le 2 droit et le 3 haut. La défense glisse vers le ballon.",
              courses: { DC: [2.6, 9.4] },
              passe: ['ArD', 'DC', 0.4],
              def: { D3: [1.2, 9.4], G3: [0.2, 6.6], G2: [-3.8, 7.6] },
            },
            {
              texte: "Le pivot sort entre 7 et 8 m, dans le dos du 3 haut, et se propose.",
              courses: { Piv: [-1.8, 7.6] },
            },
            {
              texte: "Le 2 droit, côté ballon, ferme sur le demi-centre au moment de sa passe: le demi-centre renverse vers l'arrière droit.",
              courses: { ArD: [5.8, 8.4] },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [3.4, 8.6] },
            },
            { texte: "L'arrière droit tire (ou décale son ailier).", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'demarquage-long-pivot',
      nom: 'Démarquage long du pivot',
      alias: 'Stort stregryk (DA), Long CR move (EN)',
      categorie: 'Contre 3-2-1',
      defense: '1-5 ou 3-2-1',
      dispositif: '3-2-1',
      resume: "Le 2 droit et le central suivent l'arrière droit engagé à l'intérieur; le pivot se décale et bloque, l'arrière gauche attaque plein centre.",
      description: [
        "Fiche de Dragør HK, \"appropriée contre une défense 1-5 ou 3-2-1\". L'attaque repose sur l'habitude de la 3-2-1: le 2 droit suit pour couvrir. Le demi-centre passe à l'arrière droit, engagé à l'intérieur. Si le 2 a suivi, une passe devant ou derrière le central (avec rebond) va à l'arrière gauche, qui attaque plein centre.",
        "Pendant ce temps, le pivot s'est déplacé vers l'extérieur et pose un bloc. Si le central a suivi, un intervalle s'est ouvert et l'arrière gauche tire. Le demi-centre court à gauche et attaque le 2 gauche pour qu'il ne suive pas l'arrière gauche; si le 2 gauche suit quand même, le demi-centre est servi.",
        "Le texte dit que le pivot bloque \"le défenseur de l'ARG\"; sur le schéma de la fiche (dessiné contre une 1-5), il se décale vers la droite avec le central: le schéma est suivi ici.",
      ],
      objectif: "Vider le centre en faisant suivre l'arrière droit, puis l'attaquer avec l'arrière gauche.",
      pointsCles: [
        "Le 2 droit et le central doivent suivre l'arrière droit: c'est l'hypothèse de départ.",
        "Le demi-centre fixe le 2 gauche pour qu'il ne suive pas l'arrière gauche.",
        "Passe devant ou derrière le central, au besoin avec rebond.",
      ],
      fiabilite: 'sourcee',
      sources: [
        { titre: 'Démarquage long du pivot (Dragør HK)', url: 'http://www.dragoerhb.dk/fransk/f1638.html', note: "\"Si le défenseur central a suivi, un intervalle s'est ouvert et ARG peut tirer. Le DC court sur la gauche et attaque sur le défenseur 2D, pour qu'il ne suive pas ARG.\"" },
      ],
      ballon: 'DC',
      depart: { G3: [0.6, 6.9], Piv: [-0.6, 6.4] },
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, qui s'engage à l'intérieur. Le 2 droit le suit pour couvrir, selon l'usage de la 3-2-1. Le demi-centre part vers la gauche.",
              courses: { ArD: [2.4, 8.0], DC: [-2.0, 10.4] },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [3.2, 7.2], D3: [0.8, 9.2] },
            },
            {
              texte: "Le pivot se décale vers l'extérieur droit et pose un bloc; le central suit l'arrière droit. L'arrière gauche attaque vers le centre; le demi-centre court attaquer le 2 gauche.",
              courses: {
                Piv: { vers: [4.2, 6.4], via: [1.8, 5.8], ecran: true },
                ArG: [-3.0, 8.4],
                DC: { vers: [-4.8, 9.0], via: [-3.4, 11.0] },
              },
              def: { G3: [1.8, 7.0], D3: [-1.8, 9.6] },
            },
            {
              texte: "Le central a suivi: l'intervalle s'ouvre au centre. L'arrière droit passe à l'arrière gauche, devant ou derrière le central.",
              courses: { ArG: [-1.0, 7.8] },
              passe: ['ArD', 'ArG', 0.3],
            },
            { texte: "L'arrière gauche tire dans l'intervalle.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Le 2 gauche suit: tir du demi-centre',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, qui s'engage à l'intérieur. Le 2 droit le suit pour couvrir, selon l'usage de la 3-2-1. Le demi-centre part vers la gauche.",
              courses: { ArD: [2.4, 8.0], DC: [-2.0, 10.4] },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [3.2, 7.2], D3: [0.8, 9.2] },
            },
            {
              texte: "Le pivot se décale vers l'extérieur droit et pose un bloc; le central suit l'arrière droit. L'arrière gauche attaque vers le centre; le demi-centre court attaquer le 2 gauche.",
              courses: {
                Piv: { vers: [4.2, 6.4], via: [1.8, 5.8], ecran: true },
                ArG: [-3.0, 8.4],
                DC: { vers: [-4.8, 9.0], via: [-3.4, 11.0] },
              },
              def: { G3: [1.8, 7.0], D3: [-1.8, 9.6] },
            },
            {
              texte: "L'arrière droit passe à l'arrière gauche, qui attaque plein centre. Le 2 gauche le suit malgré tout.",
              courses: { ArG: [-1.0, 7.8] },
              passe: ['ArD', 'ArG', 0.3],
              def: { G2: [-2.2, 7.4] },
            },
            {
              texte: "L'arrière gauche sert le demi-centre, laissé seul.",
              courses: { DC: [-4.6, 7.8] },
              passe: ['ArG', 'DC', 0.3],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
      ],
    },
  );
})();
