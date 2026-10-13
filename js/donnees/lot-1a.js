/* croisés à deux (croisé français, croisés à vide, croisés longs, croisés arrière/ailier, feintes de croisé). */
(() => {
  /* ------------------------------------------------------------------ */
  /* Croisé français (Dragør HK, f61 / f409)                             */
  /* ------------------------------------------------------------------ */
  const CF_DEBUT = [
    {
      texte: "L'arrière droit passe au demi-centre, qui reçoit en courant vers le 2 gauche.",
      courses: { DC: [-3.0, 8.7] },
      passe: ['ArD', 'DC', 0.1],
      def: { G2: [-4.7, 6.0], G3: [-2.2, 6.9] },
    },
  ];
  const CF_BASE = [
    ...CF_DEBUT,
    {
      texte: "Juste avant le 2 gauche, le demi-centre se retourne et rend le ballon à l'arrière droit, qui démarre au moment de la passe. L'arrière gauche part en même temps vers l'intérieur.",
      courses: { DC: [-3.6, 8.3], ArD: [3.8, 8.7], ArG: { vers: [-2.6, 10.8], via: [-4.6, 10.9] } },
      passe: ['DC', 'ArD', 0.3],
    },
    {
      texte: "L'arrière droit attaque l'intervalle entre le 3 et le 2 droits, qui se resserrent sur lui. Le pivot bloque le 3 gauche. Le demi-centre se replace vers le poste d'arrière gauche.",
      courses: {
        ArD: [2.9, 7.7],
        Piv: { vers: [-0.9, 6.8], ecran: true },
        ArG: { vers: [-0.4, 9.6], via: [-1.4, 10.6] },
        DC: { vers: [-5.4, 9.9], via: [-4.6, 9.0] },
      },
      def: { D3: [2.2, 7.0], D2: [3.8, 6.0], G3: [-1.8, 6.8] },
    },
  ];
  const CF_ENTREE = [
    ...CF_DEBUT,
    {
      texte: "Juste en face du 2 gauche, le demi-centre se retourne et rend le ballon à l'arrière droit, qui démarre au moment de la passe et court vers l'intérieur, en direction du 2 gauche. L'arrière gauche part au même moment derrière toute l'attaque, vers la droite.",
      courses: {
        DC: [-3.6, 8.3],
        ArD: { vers: [1.4, 8.6], via: [3.4, 8.6] },
        ArG: { vers: [-2.5, 11.2], via: [-5.0, 11.2] },
      },
      passe: ['DC', 'ArD', 0.3],
    },
    {
      texte: "L'arrière droit continue vers la gauche et ouvre un intervalle pour le pivot: les deux 3 se décalent vers lui. Le pivot n'est pas libre. L'arrière gauche poursuit sa longue course dans le dos de l'attaque.",
      courses: {
        ArD: [-1.0, 8.2],
        ArG: { vers: [2.0, 11.0], via: [0, 11.6] },
        DC: [-5.4, 9.6],
      },
      def: { G3: [-1.6, 7.2], D3: [0.7, 7.2] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Croisé à vide (handballtraining.de 1402 / 3886)                     */
  /* ------------------------------------------------------------------ */
  const VIDE_DEBUT = [
    {
      texte: "Le demi-centre attaque en arc vers le 3 gauche, regard vers le but, prêt à tirer. Au dernier moment, il passe à l'arrière droit.",
      courses: { DC: { vers: [-1.2, 8.8], via: [0.2, 9.6] }, ArD: [5.2, 9.2] },
      passe: ['DC', 'ArD', 0.75],
      def: { G3: [-1.6, 7.1] },
    },
  ];
  const VIDE_BASE = [
    ...VIDE_DEBUT,
    {
      texte: "Croisé à vide: le demi-centre recule en arc vers le poste d'arrière gauche. L'arrière gauche part en arc, d'abord vers l'arrière, pour arriver lancé par le centre. Le pivot se place à l'intérieur du 3 gauche.",
      courses: {
        DC: { vers: [-5.2, 9.4], via: [-3.4, 8.6] },
        ArG: { vers: [-1.4, 10.6], via: [-5.0, 11.6] },
        Piv: { vers: [-0.8, 6.9], ecran: true },
        ArD: [5.4, 8.8],
      },
      def: { G3: [-1.8, 6.8] },
    },
    {
      texte: "Après un court temps d'arrêt (une feinte de passe vers l'aile), l'arrière droit sert l'arrière gauche, qui reçoit en avançant et attaque le centre de la défense à pleine vitesse.",
      courses: { ArG: [0, 8.6] },
      passe: ['ArD', 'ArG', 0.35],
      def: { D3: [1.4, 7.2] },
    },
  ];
  const VIDE_47 = [
    {
      texte: "Le demi-centre donne à l'arrière gauche.",
      courses: { ArG: [-5.2, 9.0] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche fixe à un mètre du 2 gauche, puis donne à l'ailier gauche.",
      courses: { ArG: [-4.6, 7.4], AiG: [-8.6, 2.6] },
      passe: ['ArG', 'AiG', 0.6],
      def: { G2: [-4.8, 6.2] },
    },
    {
      texte: "Croisé sans ballon: l'arrière gauche se désengage et se replace au centre; le demi-centre croise devant lui et se replace arrière gauche.",
      courses: {
        ArG: { vers: [-0.8, 10.0], via: [-3.0, 11.4] },
        DC: { vers: [-5.4, 9.2], via: [-2.0, 8.4] },
      },
      def: { G2: [-5.0, 5.4] },
    },
    {
      texte: "L'ailier passe au nouvel arrière gauche (le demi-centre), qui enchaîne un 1 contre 1 extérieur-intérieur devant le 2 gauche.",
      courses: { DC: { vers: [-3.6, 7.6], via: [-5.4, 7.8] } },
      passe: ['AiG', 'DC', 0.2],
      def: { G2: [-4.4, 6.2] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Croisé à vide "danois" (handballtraining.de 3778)                  */
  /* ------------------------------------------------------------------ */
  const DANOIS_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière gauche. L'ailier gauche attend à hauteur des 9 m; le pivot est entre le 2 et le 3 gauches.",
      courses: { ArG: [-5.6, 9.2] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche donne à l'ailier gauche.",
      passe: ['ArG', 'AiG', 0.15],
    },
    {
      texte: "Après la passe à l'ailier, l'arrière gauche et le demi-centre croisent sans ballon: le demi-centre devient arrière gauche, l'arrière gauche passe au centre. L'ailier se décale un peu vers le coin.",
      courses: {
        DC: { vers: [-5.4, 9.0], via: [-2.6, 8.8] },
        ArG: { vers: [-0.4, 10.2], via: [-3.4, 11.2] },
        AiG: [-9.2, 4.6],
      },
    },
  ];
  const DANOIS_SUITE = [
    ...DANOIS_BASE,
    {
      texte: "L'ailier rend au demi-centre, nouvel arrière gauche, qui attaque déjà le 3 gauche et lit sa réaction. Le pivot se place à l'intérieur du 2 gauche.",
      courses: { DC: [-3.4, 8.2], Piv: { vers: [-3.8, 6.1], ecran: true } },
      passe: ['AiG', 'DC', 0.2],
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'croise-francais',
      nom: 'Croisé français',
      alias: 'Fransk kryds (DA), French cross (EN), "Le croisé français de base"',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre court vers le 2 gauche puis rend le ballon à l'arrière droit, qui fixe à droite; l'arrière gauche, parti en même temps, reçoit lancé au centre.",
      description: [
        "Nom donné par le site danois de Dragør HK (Werner Fog-Hansen). Le demi-centre reçoit de l'arrière droit en courant vers le 2 gauche. Juste avant ce défenseur, il se retourne et rend le ballon à l'arrière droit, qui s'engage entre le 3 et le 2 droits. L'arrière gauche, parti en même temps vers l'intérieur, reçoit lancé et tire au centre, grâce au bloc du pivot sur le 3 gauche.",
        "Ce n'est pas un croisé au sens strict: personne ne passe derrière le porteur. C'est une passe en retour du demi-centre vers l'arrière droit, puis une course de l'arrière gauche dans le dos de l'action.",
        "La série \"Quel choix?\" de Dragør donne sept fins selon la réaction de la défense (variantes 2 à 8). Deux autres fiches donnent la version à l'aile et, en danois seulement, le croisé français long. La dernière variante vient d'une fiche danoise dont le texte se contredit (il nomme l'ailier gauche là où le schéma montre l'ailier droit): elle suit le schéma. Choisis une fin au-dessus du schéma.",
        'Voir aussi "Faux croisé français" (autre fiche de Dragør, sans ballon pour le demi-centre) et "Faux croisé", qui reprend la fin "direct" (variante 6).',
      ],
      objectif: "Fixer les défenseurs droits par l'engagement de l'arrière droit pour libérer le centre à l'arrière gauche lancé.",
      pointsCles: [
        "Le demi-centre se retourne juste avant le 2 gauche, pas plus tôt.",
        "Ne pas faire la passe en retour trop près de la défense: le 2 droit peut l'intercepter.",
        "L'arrière gauche part en même temps que l'arrière droit et arrive lancé au centre.",
        "Si la défense attend le croisé français, le demi-centre joue directement son 1 contre 1.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Le croisé français de base et ses 7 fins (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f61.html',
          note: "\"Juste avant le défenseur 2D, le DC se retourne et passe la balle à ARD, qui s'engage au moment de la passe.\" Pages f61a à f61g: les fins.",
        },
        {
          titre: 'Croisé français (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f409.html',
          note: "\"L'arrière gauche ARG se lance, reçoit la balle de ARD et passe au milieu, profitant du bloc du pivot sur 3D.\"",
        },
        {
          titre: "Croisé français à l'aile (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f410.html',
          note: "\"Le croisé français peut également être effectué depuis l'aile.\"",
        },
        {
          titre: 'Langt fransk kryds (Dragør HK, danois)',
          url: 'http://www.dragoerhb.dk/x1063.html',
          note: "\"Au lieu de passer à l'ARG comme dans le croisé français, l'ARD rend le ballon au DC, qui rentre et tire.\"",
        },
        {
          titre: 'Fransk kryds med back/fløjkryds (Dragør HK, danois)',
          url: 'http://www.dragoerhb.dk/x772.html',
          note: "Texte contradictoire (VF/HF); \"l'ARG passe à l'ailier qui attaque au centre et fait écran sur le 2; l'ailier passe à l'ailier qui rentre, qui conclut\".",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Base: tir de l'arrière gauche au centre",
          etapes: [
            ...CF_BASE,
            {
              texte: "L'arrière droit donne à l'arrière gauche, lancé au centre.",
              courses: { ArG: [0.1, 8.0] },
              passe: ['ArD', 'ArG', 0.35],
              def: { D3: [2.0, 7.1] },
            },
            {
              texte: "L'arrière gauche tire au centre, entre son pivot et le 3 droit.",
              courses: { ArG: [0.3, 7.4] },
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
        {
          nom: "2 - Pour l'ailier gauche",
          etapes: [
            ...CF_DEBUT,
            {
              texte: "Tout le monde s'engage comme pour le croisé français. Le demi-centre fait mine de rendre à l'arrière droit, qui démarre. L'ailier gauche s'engage entre le 1 et le 2 gauches.",
              courses: {
                DC: [-3.6, 8.3],
                ArD: [3.8, 8.7],
                ArG: { vers: [-2.6, 10.8], via: [-4.6, 10.9] },
                AiG: { vers: [-6.6, 4.6], via: [-8.6, 3.2] },
              },
            },
            {
              texte: "Le demi-centre se tourne et passe tout de suite à l'ailier.",
              courses: { AiG: [-6.0, 5.2] },
              passe: ['DC', 'AiG', 0.15],
              def: { G1: [-6.9, 3.4], G2: [-4.9, 5.7] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "3 - Pour l'ailier droit",
          etapes: [
            ...CF_BASE,
            {
              texte: "L'arrière droit donne à l'arrière gauche, qui menace de tirer au centre. L'ailier droit se prépare.",
              courses: { ArG: [0.1, 8.4], AiD: [8.4, 3.0] },
              passe: ['ArD', 'ArG', 0.35],
            },
            {
              texte: "Le 3 et le 2 droits se referment sur l'arrière gauche. Il donne à l'ailier droit, qui s'engage entre le 1 et le 2 droits.",
              courses: { AiD: { vers: [6.2, 5.0], via: [8.2, 4.4] } },
              passe: ['ArG', 'AiD', 0.4],
              def: { D3: [1.1, 7.3], D2: [3.5, 6.4], D1: [7.6, 3.0] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "4 - Entrée d'arrière",
          etapes: [
            ...CF_ENTREE,
            {
              texte: "L'arrière droit se tourne vers la droite et donne à l'arrière gauche, qui attaque l'intervalle entre le 3 et le 2 droits, supposé ouvert.",
              courses: { ArG: { vers: [2.6, 8.6], via: [2.8, 10.2] } },
              passe: ['ArD', 'ArG', 0.25],
              def: { D2: [4.0, 6.3] },
            },
            {
              texte: "L'arrière gauche tire. Si le 1 droit vient fermer, il donne à l'ailier droit.",
              courses: { ArG: [2.8, 7.8] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: "5 - Feinte d'entrée d'arrière: l'ailier gauche",
          etapes: [
            ...CF_ENTREE,
            {
              texte: "Au lieu de servir l'arrière gauche, l'arrière droit donne à l'ailier gauche, qui s'engage entre le 1 et le 2 gauches. Si le 3 gauche a suivi, le pivot peut aussi être servi.",
              courses: { AiG: { vers: [-6.0, 5.3], via: [-8.4, 3.4] } },
              passe: ['ArD', 'AiG', 0.45],
              def: { G1: [-7.0, 3.0] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '6 - Direct: 1 contre 1 du demi-centre',
          etapes: [
            ...CF_DEBUT,
            {
              texte: "La défense attend le croisé français. Le demi-centre fait mine de rendre à l'arrière droit, mais garde le ballon, dribble et part à l'extérieur du 2 gauche, qui a anticipé vers l'intérieur.",
              courses: {
                DC: { vers: [-5.2, 7.2], via: [-3.8, 7.9] },
                ArD: [3.8, 8.7],
                ArG: { vers: [-2.6, 10.8], via: [-4.6, 10.9] },
              },
              def: { G2: [-4.0, 6.2], G3: [-1.4, 7.0] },
            },
            {
              texte: "Il déborde le 2 gauche par l'extérieur et tire.",
              courses: { DC: [-6.2, 5.2] },
              tir: { par: 'DC', t: 0.5 },
              def: { G1: [-7.0, 3.2] },
            },
          ],
        },
        {
          nom: "7 - Externe pour l'ailier droit",
          etapes: [
            ...CF_DEBUT,
            {
              texte: "Le demi-centre rend le ballon à l'arrière droit, qui démarre au moment de la passe.",
              courses: { DC: [-3.6, 8.3], ArD: [3.8, 8.7] },
              passe: ['DC', 'ArD', 0.3],
            },
            {
              texte: "Au lieu de s'engager à l'intérieur, l'arrière droit s'engage à l'extérieur, sur le 2 droit. L'ailier droit croise derrière lui et reçoit.",
              courses: { ArD: [6.0, 6.9], AiD: { vers: [4.4, 7.4], via: [8.0, 7.6] } },
              passe: ['ArD', 'AiD', 0.6],
              def: { D2: [5.4, 6.0], D1: [7.2, 3.4] },
            },
            {
              texte: "L'ailier droit tire entre le 3 et le 2 droits.",
              courses: { AiD: [3.8, 7.0] },
              tir: { par: 'AiD', t: 0.4 },
            },
          ],
        },
        {
          nom: "8 - Entrée de l'ailier droit",
          etapes: [
            ...CF_BASE,
            {
              texte: "L'arrière droit donne à l'arrière gauche, qui menace de tirer en suspension. L'arrière droit se replace.",
              courses: { ArG: [0.1, 8.4], ArD: [3.6, 8.6] },
              passe: ['ArD', 'ArG', 0.35],
            },
            {
              texte: "Au lieu de tirer, l'arrière gauche donne à l'ailier droit, qui rentre à l'intérieur du 2 droit.",
              courses: { AiD: { vers: [3.0, 6.8], via: [7.4, 4.6] } },
              passe: ['ArG', 'AiD', 0.6],
              def: { D2: [4.6, 5.6] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "9 - Croisé français à l'aile",
          etapes: [
            {
              texte: "L'arrière droit donne au demi-centre.",
              courses: { DC: [0, 10.0] },
              passe: ['ArD', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche, qui part très à l'extérieur fixer le 1 gauche. L'ailier gauche remonte un peu.",
              courses: { ArG: { vers: [-8.4, 3.6], via: [-7.4, 8.0] }, AiG: [-9.4, 4.6] },
              passe: ['DC', 'ArG', 0.2],
              def: { G1: [-7.4, 2.6], G2: [-5.4, 5.6] },
            },
            {
              texte: "L'arrière gauche remet au demi-centre, qui attaque l'intervalle entre le 3 et le 2 droits. L'ailier gauche démarre vers l'intérieur.",
              courses: { DC: [2.4, 8.2], AiG: { vers: [-4.0, 7.6], via: [-7.4, 7.6] }, Piv: { vers: [-0.9, 6.8], ecran: true } },
              passe: ['ArG', 'DC', 0.1],
              def: { D3: [2.2, 7.2], D2: [4.4, 6.0], G3: [-1.9, 6.6] },
            },
            {
              texte: "Le demi-centre donne à l'ailier gauche, lancé entre le 2 et le 3 gauches.",
              courses: { AiG: [-2.9, 7.0] },
              passe: ['DC', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire. Si le 2 gauche est en place, il donne au pivot.", tir: 'AiG' },
          ],
        },
        {
          nom: '10 - Croisé français long',
          etapes: [
            ...CF_DEBUT,
            {
              texte: "Le demi-centre rend le ballon à l'arrière droit, qui avance. L'arrière gauche part vers l'intérieur.",
              courses: { DC: [-3.6, 8.3], ArD: [3.8, 8.7], ArG: { vers: [-2.6, 10.8], via: [-4.6, 10.9] } },
              passe: ['DC', 'ArD', 0.3],
            },
            {
              texte: "L'arrière gauche croise dans le dos du demi-centre et s'engage au centre comme pour recevoir: il sert de leurre. Le demi-centre décroche vers la gauche.",
              courses: { ArG: { vers: [0.2, 8.6], via: [-1.6, 10.6] }, DC: [-5.0, 8.8], ArD: [3.6, 7.8] },
              def: { D3: [1.0, 7.2], G3: [-1.0, 7.1] },
            },
            {
              texte: "Au lieu de servir l'arrière gauche, l'arrière droit renvoie au demi-centre, qui rentre entre le 2 et le 3 gauches.",
              courses: { DC: [-3.4, 7.4] },
              passe: ['ArD', 'DC', 0.3],
              def: { G2: [-4.8, 5.8] },
            },
            {
              texte: "Le demi-centre tire.",
              courses: { DC: [-3.2, 7.0] },
              tir: { par: 'DC', t: 0.3 },
            },
          ],
        },
        {
          nom: '11 - Avec croisé arrière/ailier (fiche danoise)',
          etapes: [
            {
              texte: "L'arrière droit donne au demi-centre.",
              courses: { DC: [0, 10.2] },
              passe: ['ArD', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre rend à l'arrière droit, qui court vers l'extérieur.",
              courses: { ArD: { vers: [7.0, 7.4], via: [6.6, 9.6] } },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [5.8, 5.8] },
            },
            {
              texte: "L'ailier droit croise avec l'arrière droit: il remonte et passe dans son dos, et reçoit.",
              courses: { AiD: { vers: [6.6, 9.2], via: [9.0, 7.4] } },
              passe: ['ArD', 'AiD', 0.6],
            },
            {
              texte: "L'ailier droit donne au demi-centre, qui vient au-devant, puis continue sa course en arc.",
              courses: { DC: [3.2, 8.8], AiD: { vers: [3.4, 11.0], via: [5.8, 11.2] } },
              passe: ['AiD', 'DC', 0.15],
            },
            {
              texte: "Le demi-centre se retourne et passe à l'arrière gauche. L'ailier droit revient vers le centre.",
              courses: { ArG: [-5.4, 8.0], AiD: { vers: [0.4, 9.2], via: [1.6, 11.0] } },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche donne à l'ailier droit, qui attaque au centre, puis pose un écran sur le 2 gauche. L'ailier gauche rentre derrière l'écran.",
              courses: {
                ArG: { vers: [-4.4, 6.6], ecran: true },
                AiD: [0.2, 8.4],
                AiG: { vers: [-2.6, 7.2], via: [-7.4, 10.2] },
              },
              passe: ['ArG', 'AiD', 0.15],
              def: { G2: [-4.9, 5.6] },
            },
            {
              texte: "L'ailier droit donne à l'ailier gauche rentré.",
              passe: ['AiD', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche conclut.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'faux-croise-francais',
      nom: 'Faux croisé français',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre donne à l'arrière droit puis part à l'opposé du ballon; l'arrière gauche prend l'espace central et reçoit de l'arrière droit.",
      description: [
        "Fiche du site danois de Dragør HK. Le ballon va de l'arrière gauche au demi-centre, puis à l'arrière droit. Aussitôt après sa passe, le demi-centre part à l'opposé du ballon, en courbe vers la gauche. L'arrière droit fixe à l'extérieur du 2 droit pendant que l'arrière gauche s'engage dans l'espace central laissé libre.",
        "L'arrière gauche reçoit de l'arrière droit et tire sur le bloc du pivot, ou sert le pivot s'il est bien placé (choisis une fin au-dessus du schéma).",
        "\"Faux\" parce que le demi-centre ne croise pas avec le porteur: c'est une interprétation, la fiche ne l'explique pas. La trajectoire du demi-centre est lue sur le schéma. La fiche \"Faux croisé\" le cite comme un autre sens du mot; voir aussi \"Croisé à vide\" (variante 6, très proche) et \"Croisé français\".",
      ],
      objectif: "Vider le centre par la course du demi-centre pour y lancer l'arrière gauche.",
      pointsCles: [
        "Le demi-centre part dès sa passe, franchement, pour emmener son défenseur.",
        "L'arrière droit fixe vraiment à l'extérieur du 2 droit avant de renverser.",
        "L'arrière gauche arrive lancé dans l'espace central.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Faux croisé français (Dragør HK, trad. HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f769.html',
          note: "\"Après la passe DC part à l'opposé de la balle. ARD fixe externe sur 2G alors que ARG s'engage vers le centre.\"",
        },
      ],
      depart: { Piv: [2.7, 6.5] },
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche sur le bloc du pivot",
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre.",
              courses: { DC: [0, 10.0] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis part à l'opposé du ballon, en courbe vers la gauche.",
              courses: { DC: { vers: [-4.6, 7.6], via: [-2.0, 9.0] } },
              passe: ['DC', 'ArD', 0.05],
            },
            {
              texte: "L'arrière droit fixe à l'extérieur du 2 droit. L'arrière gauche s'engage vers le centre. Le pivot bloque le 3 droit.",
              courses: {
                ArD: [5.6, 7.2],
                ArG: { vers: [-0.6, 8.8], via: [-3.6, 9.6] },
                DC: [-5.2, 7.2],
                Piv: { vers: [2.4, 6.7], ecran: true },
              },
              def: { D2: [5.2, 6.0], G2: [-4.6, 5.8], G3: [-2.0, 6.9], D3: [1.5, 7.1] },
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, lancé au centre.",
              courses: { ArG: [0, 8.0] },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche tire sur le bloc du pivot.",
              courses: { ArG: [0.1, 7.4] },
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            {
              texte: "L'arrière gauche passe au demi-centre.",
              courses: { DC: [0, 10.0] },
              passe: ['ArG', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, puis part à l'opposé du ballon, en courbe vers la gauche.",
              courses: { DC: { vers: [-4.6, 7.6], via: [-2.0, 9.0] } },
              passe: ['DC', 'ArD', 0.05],
            },
            {
              texte: "L'arrière droit fixe à l'extérieur du 2 droit. L'arrière gauche s'engage vers le centre. Le pivot bloque le 3 droit.",
              courses: {
                ArD: [5.6, 7.2],
                ArG: { vers: [-0.6, 8.8], via: [-3.6, 9.6] },
                DC: [-5.2, 7.2],
                Piv: { vers: [2.4, 6.7], ecran: true },
              },
              def: { D2: [5.2, 6.0], G2: [-4.6, 5.8], G3: [-2.0, 6.9], D3: [1.5, 7.1] },
            },
            {
              texte: "L'arrière droit donne à l'arrière gauche, lancé au centre. Le 3 droit sort sur lui.",
              courses: { ArG: [0, 8.2] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D3: [0.9, 7.4] },
            },
            {
              texte: "Le pivot a une position préférentielle dans le dos du 3: l'arrière gauche le sert.",
              courses: { Piv: [2.0, 6.4] },
              passe: ['ArG', 'Piv', 0.3],
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-a-vide',
      nom: 'Croisé à vide',
      alias: 'Croisé sans ballon; Jugokreuz, leeres Kreuzen, Leerkreuzen, Kreuzen ohne Ball (DE); Falsk kryds / Fake cross (DA/EN); contracruce (ES)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre passe à l'arrière droit puis échange sa place sans ballon avec l'arrière gauche, qui arrive lancé par le centre et reçoit.",
      description: [
        "Définition allemande (handballhaus): un échange de postes sans ballon entre le demi-centre et un arrière. Le demi-centre passe par exemple à l'arrière droit, puis il échange sa place avec l'arrière gauche. Pour handballtraining.de, le but est d'envoyer \"un arrière qui tire fort, avec beaucoup d'élan, sur le centre de la défense\". C'est une action de lancement standard au haut niveau.",
        "L'arrière gauche doit recevoir en avançant vers le but, pas en traversant: il part donc tôt, en arc vers l'arrière, pour avoir de la distance. Le pivot se place à l'intérieur du 3 gauche. L'article de handballtraining.de donne ensuite plusieurs suites (variantes 1 à 5). Choisis une fin au-dessus du schéma.",
        "Le même principe existe chez Dragør HK sous le nom \"Faux croisé\" (variante 6) et en France comme \"croisé sans ballon\" (variantes 7 et 8, exercice d'entrainement-handball.fr; voir aussi \"Croisé à vide danois\", qui part de la même idée). En Espagne, les praticiens l'appellent \"contracruce\"; Román Seco juge ce terme incorrect.",
        'En LNH 2017-2018, le "croisé DC/ARG sans ballon" est le 3e mouvement le plus fréquent (645 en une demi-saison). Fiches liées: "Yougo" (même mécanique, version FFHB détaillée), "Suites du croisé à vide", "À vide 1 / À vide 2".',
      ],
      objectif: "Lancer un arrière tireur, avec de l'élan, sur le centre de la défense.",
      pointsCles: [
        "Le demi-centre attaque d'abord vraiment, regard vers le but, et ne passe qu'au dernier moment.",
        "L'arrière qui croise part tôt, en arc vers l'arrière, pour recevoir en avançant et non en traversant.",
        "L'arrière droit retarde un peu sa passe (feinte vers l'aile) pour laisser le croisé se faire.",
        "Le pivot change d'écran selon le sens de l'attaque suivante.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Leeres Kreuzen - Basiswissen (handballtraining.de, R. Nowacki)',
          url: 'https://handballtraining.de/taktik/leeres-kreuzen-basiswissen/1402',
          note: '"Beim Jugokreuz geht es im Grundlegenden darum, durch den Positionswechsel zweier Rückraumspieler ohne Ball einen wurfstarken Halbangreifer mit viel Anlauf auf das Deckungszentrum zu schicken."',
        },
        {
          titre: 'Übung Auftakthandlung: Leeres Kreuzen im Rückraum (handballtraining.de, 2025)',
          url: 'https://handballtraining.de/ruckraumspieler/uebung-auftakthandlung-leeres-kreuzen-im-rueckraum/3886',
          note: 'Lancement et suites: tir, croisé direct avec RR, croisé avec RA, re-croisé avec RM, passe directe à RM (variantes 1 à 5).',
        },
        {
          titre: 'Kreuzen ohne Ball (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen-ohne-ball.html',
          note: 'Définition: "Positionswechselspiel zwischen RM und RL/RR ohne Ball"; autres noms: leeres Kreuzen, Jugokreuzen.',
        },
        {
          titre: 'Faux croisé (Dragør HK, trad. HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f386.html',
          note: '"DC passe le ballon à ARD et effectue un croisé avec ARG sans ballon. ARD va fixer externe sur 2G et passe le ballon sur opposé ARG qui va tirer."',
        },
        {
          titre: 'Croisé sans ballon entre arrière latéral et demi-centre sur 0-6 de zone (entrainement-handball.fr, exercice 47)',
          url: 'https://www.entrainement-handball.fr/exercice/croise-sans-ballon-entre-arriere-lateral-et-demi-centre-sur-0-6-de-zone/',
          note: "Fixation, passe à l'ailier, croisé sans ballon, puis 1 contre 1 devant le 2 ou passe au nouveau demi-centre (variantes 7 et 8).",
        },
        {
          titre: '¿Qué es un contracruce? (forum Lo + Balonmano, 2004)',
          url: 'https://balonmano.mforos.com/142972/2450547-que-es-un-contracruce/',
          note: "\"El contracruce se usa para hacer referencia a un cruce sin balón\": le demi-centre passe à l'arrière droit puis croise avec l'arrière gauche, qui reçoit au centre.",
        },
        {
          titre: 'Komar, Lasvergnas, Belmessoud, "Quelle efficacité des mouvements de joueurs en LNH?", Approches du Handball n°175 (2019)',
          url: 'https://www.calameo.com/ffhandball/read/007275111bdb91e2c432d?page=28',
          note: '"Croisé DC/ARG sans ballon": 645 occurrences en une demi-saison 2017-2018.',
        },
        {
          titre: 'Croisé simple avec passe renversée (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f17.html',
          note: "\"le croisé \"à vide\" du DC à l'opposé de sa passe pour faire un écran\" (exercice).",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...VIDE_BASE,
            {
              texte: "Le pivot tient le 3 gauche: un intervalle s'ouvre au centre. L'arrière gauche tire.",
              courses: { ArG: [0.1, 7.8] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - Croisé direct avec l'arrière droit",
          etapes: [
            ...VIDE_BASE,
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 3 et le 2 droits. L'arrière droit vient par le centre, dans son dos, et reçoit. Le pivot change d'écran: il bloque le 3 droit par l'intérieur.",
              courses: {
                ArG: [2.6, 8.0],
                ArD: { vers: [0.4, 9.2], via: [3.4, 10.4] },
                Piv: { vers: [0.8, 6.8], ecran: true },
              },
              passe: ['ArG', 'ArD', 0.6],
              def: { D3: [2.0, 7.2], D2: [4.0, 6.2] },
            },
            {
              texte: "L'arrière droit attaque le 3 gauche et tire.",
              courses: { ArD: [-0.4, 7.8] },
              tir: { par: 'ArD', t: 0.45 },
              def: { G3: [-1.2, 7.2] },
            },
          ],
        },
        {
          nom: "3 - Croisé avec l'ailier droit",
          etapes: [
            ...VIDE_BASE,
            {
              texte: "L'arrière gauche prend un arc plus large et attaque entre le 2 et le 1 droits. L'ailier droit arrive en grand arc par le centre, passe dans son dos et reçoit. L'arrière droit rééquilibre au centre.",
              courses: {
                ArG: { vers: [5.4, 7.6], via: [3.4, 9.2] },
                AiD: { vers: [3.0, 9.6], via: [8.6, 9.8] },
                ArD: { vers: [0.2, 10.8], via: [3.0, 11.4] },
              },
              passe: ['ArG', 'AiD', 0.65],
              def: { D2: [5.6, 6.0], D1: [7.2, 3.4] },
            },
            {
              texte: "L'ailier droit attaque le 3 droit et tire. Le pivot tient toujours le 3 gauche.",
              courses: { AiD: [2.2, 8.0] },
              tir: { par: 'AiD', t: 0.45 },
              def: { D3: [1.6, 7.1] },
            },
          ],
        },
        {
          nom: '4 - Re-croisé avec le demi-centre',
          etapes: [
            ...VIDE_BASE,
            {
              texte: "L'arrière gauche casse sa course et repart vers l'intervalle entre le 3 et le 2 gauches. Le pivot bloque le 3 droit par l'intérieur. Le demi-centre revient en arc vers le centre, passe dans son dos et reçoit: cette fois, le croisé se fait avec le ballon.",
              courses: {
                ArG: [-2.6, 8.0],
                Piv: { vers: [0.8, 6.8], ecran: true },
                DC: { vers: [-0.6, 9.8], via: [-4.0, 10.8] },
              },
              passe: ['ArG', 'DC', 0.6],
              def: { G3: [-2.0, 7.2], D3: [1.8, 7.0] },
            },
            {
              texte: "Le pivot rebloque le 3 gauche par l'intérieur. Le demi-centre attaque le 3 droit et tire.",
              courses: { Piv: { vers: [-0.9, 6.9], ecran: true }, DC: [0.4, 8.0] },
              tir: { par: 'DC', t: 0.6 },
              def: { D3: [1.4, 7.2] },
            },
          ],
        },
        {
          nom: '5 - Passe directe au demi-centre revenu à gauche',
          etapes: [
            ...VIDE_DEBUT,
            {
              texte: "Croisé à vide: le demi-centre recule très vite vers le poste d'arrière gauche; l'arrière gauche arrive en arc par le centre. Le pivot se place entre le 2 et le 3 gauches.",
              courses: {
                DC: { vers: [-5.2, 9.4], via: [-3.4, 8.6] },
                ArG: { vers: [-1.4, 10.6], via: [-5.0, 11.6] },
                Piv: [-3.3, 6.4],
                ArD: [5.4, 8.8],
              },
            },
            {
              texte: "L'arrière droit ne sert pas l'arrière gauche: il donne directement au demi-centre, qui reçoit en avançant. Le pivot bloque le 3 gauche par l'extérieur.",
              courses: { DC: [-4.4, 8.4], ArG: [-0.6, 9.6], Piv: { vers: [-2.6, 6.6], ecran: true } },
              passe: ['ArD', 'DC', 0.3],
              def: { G3: [-1.6, 6.8] },
            },
            {
              texte: "Le demi-centre tire.",
              courses: { DC: [-3.8, 7.8] },
              tir: { par: 'DC', t: 0.4 },
              def: { G2: [-4.6, 6.0] },
            },
          ],
        },
        {
          nom: '6 - Version Dragør ("Faux croisé")',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, puis croise sans ballon avec l'arrière gauche: il part vers la gauche, l'arrière gauche part vers le centre dans son dos.",
              courses: {
                DC: { vers: [-4.6, 8.0], via: [-2.0, 9.0] },
                ArG: { vers: [-1.2, 10.4], via: [-4.4, 11.4] },
                ArD: [5.4, 8.8],
              },
              passe: ['DC', 'ArD', 0.05],
            },
            {
              texte: "L'arrière droit va fixer à l'extérieur du 2 droit. L'arrière gauche continue vers le centre.",
              courses: { ArD: [6.2, 7.0], ArG: [0.2, 9.2] },
              def: { D2: [5.6, 5.9], D3: [1.9, 6.8] },
            },
            {
              texte: "L'arrière droit renverse sur l'arrière gauche, lancé.",
              courses: { ArG: [0.4, 8.0] },
              passe: ['ArD', 'ArG', 0.2],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '7 - Exercice 47: tir après le duel',
          etapes: [
            ...VIDE_47,
            {
              texte: "Il gagne son duel et le 3 gauche ne ferme pas: il tire.",
              courses: { DC: [-3.0, 7.0] },
              tir: { par: 'DC', t: 0.45 },
              def: { G2: [-4.6, 5.8] },
            },
          ],
        },
        {
          nom: '8 - Exercice 47: passe au nouveau demi-centre',
          etapes: [
            ...VIDE_47,
            {
              texte: "Le 3 gauche ferme: il donne au nouveau demi-centre (l'ancien arrière gauche), qui prend l'intervalle.",
              courses: { ArG: [-0.6, 8.4] },
              passe: ['DC', 'ArG', 0.3],
              def: { G3: [-2.6, 7.0] },
            },
            {
              texte: "Le nouveau demi-centre tire.",
              courses: { ArG: [-0.4, 7.8] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-a-vide-danois',
      nom: 'Croisé à vide "danois"',
      alias: 'Dänisches Kreuzen ohne Ball; leeres Kreuzen RL-RM nach Pass auf Außen (DE)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "L'arrière gauche donne à l'ailier, puis échange sa place sans ballon avec le demi-centre; l'ailier sert le demi-centre devenu arrière gauche, qui lit la défense.",
      description: [
        "Variante du \"Croisé à vide\". Pour handballhaus, le croisé à vide \"danois\" se déroule comme le croisé à vide classique, mais la passe va de l'arrière gauche à l'ailier gauche, et ce sont l'arrière gauche et le demi-centre qui échangent leurs places.",
        "Version détaillée de handballtraining.de (2025): l'ailier gauche attend à hauteur des 9 m, le pivot est entre le 2 et le 3 gauches. Après la passe à l'ailier, le demi-centre devient arrière gauche et reçoit de l'ailier. Il attaque aussitôt le 3 gauche et choisit selon sa réaction (variantes 1 et 2), ou l'équipe enchaîne une suite (variantes 3 à 5). Choisis une fin au-dessus du schéma.",
        "L'article insiste: ce n'est pas un enchaînement figé, mais un lancement suivi de réponses à la défense.",
      ],
      objectif: "Mettre en mouvement le côté gauche de la défense et créer un surnombre à droite ou un duel favorable à gauche.",
      pointsCles: [
        "Le nouvel arrière gauche reçoit déjà lancé et regarde le 3 gauche.",
        "Le pivot tient son écran à l'intérieur du 2 gauche.",
        "Tous les joueurs doivent connaître les premières courses de chaque suite.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Eine Auftakthandlung - verschiedene Spielsituationen (handballtraining.de, 2025)',
          url: 'https://handballtraining.de/zusammenspiel/eine-auftakthandlung-verschiedene-spielsituationen/3778',
          note: '"Nach dem Pass zu LA kreuzen RL und RM ohne Ball. RM wird zu RL und erhält den Ball nach dem leeren Kreuzen von LA." Cinq suites.',
        },
        {
          titre: 'Kreuzen ohne Ball (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen-ohne-ball.html',
          note: '"Das dänische Kreuzen ohne Ball verläuft prinzipiell ähnlich: Hier spielt RL den Ball zu LA und anschließend wechseln RL und RM die Positionen."',
        },
      ],
      depart: { AiG: [-8.8, 5.6], Piv: [-3.3, 6.4] },
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Le 3 reste passif: tir',
          etapes: [
            ...DANOIS_SUITE,
            {
              texte: "Le 3 gauche reste en place: le nouvel arrière gauche tire (ou perce entre les deux 3).",
              courses: { DC: [-2.8, 7.6] },
              tir: { par: 'DC', t: 0.4 },
            },
          ],
        },
        {
          nom: '2 - Le 3 sort: passe au pivot',
          etapes: [
            ...DANOIS_SUITE,
            {
              texte: "Le 3 gauche sort sur lui. Le pivot, qui tient son écran sur le 2, se décale dans le dos du 3 et reçoit.",
              courses: { Piv: [-2.2, 6.3] },
              passe: ['DC', 'Piv', 0.5],
              def: { G3: [-2.6, 7.4], G2: [-4.6, 5.6] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "3 - L'ailier suit et reçoit à nouveau",
          etapes: [
            ...DANOIS_BASE,
            {
              texte: "L'ailier rend au demi-centre, nouvel arrière gauche, qui attaque le 3 gauche à pleine vitesse. Le pivot se place à l'intérieur du 1 gauche.",
              courses: { DC: [-3.4, 8.2], Piv: { vers: [-6.0, 4.6], ecran: true } },
              passe: ['AiG', 'DC', 0.2],
              def: { G1: [-7.0, 3.0], G3: [-2.4, 7.2] },
            },
            {
              texte: "L'ailier suit l'action et reçoit à nouveau du nouvel arrière gauche, qui a attiré le 3.",
              courses: { AiG: { vers: [-5.4, 7.6], via: [-8.6, 7.4] } },
              passe: ['DC', 'AiG', 0.6],
            },
            {
              texte: "L'ailier perce entre le 2 et le 3 gauches et tire.",
              courses: { AiG: [-4.0, 7.0] },
              tir: { par: 'AiG', t: 0.45 },
            },
          ],
        },
        {
          nom: "4 - L'ailier sert directement le joueur du centre",
          etapes: [
            ...DANOIS_BASE,
            {
              texte: "L'ailier ne sert pas le nouvel arrière gauche, mais directement l'ancien arrière gauche, passé au centre, qui court droit vers le but. Le pivot bloque le 2 gauche par l'intérieur.",
              courses: { ArG: [1.4, 8.8], Piv: { vers: [-3.8, 6.1], ecran: true } },
              passe: ['AiG', 'ArG', 0.3],
            },
            {
              texte: "Il perce entre le 3 et le 2 droits et tire.",
              courses: { ArG: [3.2, 7.4] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D3: [2.2, 7.0], D2: [4.4, 5.8] },
            },
          ],
        },
        {
          nom: '5 - Re-croisé avec ballon',
          etapes: [
            ...DANOIS_BASE,
            {
              texte: "L'ailier sert le joueur du centre (l'ancien arrière gauche).",
              courses: { ArG: [-0.6, 9.6] },
              passe: ['AiG', 'ArG', 0.3],
            },
            {
              texte: "Il repart avec le ballon vers la gauche et croise avec le nouvel arrière gauche (le demi-centre), qui passe dans son dos et reçoit. Le pivot bloque le 3 gauche par l'extérieur.",
              courses: {
                ArG: [-3.0, 8.6],
                DC: { vers: [-1.0, 9.4], via: [-3.4, 11.4] },
                Piv: { vers: [-2.7, 6.5], ecran: true },
              },
              passe: ['ArG', 'DC', 0.55],
            },
            {
              texte: "Pas d'avantage à gauche: le demi-centre attaque en sens inverse, entre les deux 3. Le pivot change d'écran et bloque le 2 gauche par l'intérieur.",
              courses: { DC: [0, 8.0], Piv: { vers: [-3.9, 6.0], ecran: true } },
              def: { D3: [1.4, 7.0] },
            },
            {
              texte: "Le demi-centre tire si l'intervalle s'ouvre.",
              tir: 'DC',
            },
          ],
        },
      ],
    },
  );
})();

/* Suite: suites du croisé à vide, croisé long, Halb holt Außen, croisé DC/ailier. */
(() => {
  const SUITES_BASE = [
    {
      texte: "Le demi-centre attaque puis passe à l'arrière droit.",
      courses: { DC: [-0.6, 9.6] },
      passe: ['DC', 'ArD', 0.5],
    },
    {
      texte: "Croisé à vide: le demi-centre part vers le poste d'arrière gauche; l'arrière gauche arrive en arc par le centre.",
      courses: {
        DC: { vers: [-5.2, 9.4], via: [-3.0, 8.8] },
        ArG: { vers: [-1.0, 10.4], via: [-5.0, 11.6] },
      },
    },
  ];
  const ENTGEGEN = [
    ...SUITES_BASE,
    {
      texte: "L'arrière droit sert l'arrière gauche, arrivé au centre, qui fixe le 3 droit.",
      courses: { ArG: [0.8, 8.4] },
      passe: ['ArD', 'ArG', 0.3],
      def: { D3: [1.6, 7.2] },
    },
    {
      texte: "L'arrière gauche croise à contre-sens avec l'arrière droit: il part vers la droite, l'arrière droit passe dans son dos vers le centre et reçoit.",
      courses: { ArG: [2.2, 8.0], ArD: { vers: [0.4, 9.4], via: [3.0, 10.2] } },
      passe: ['ArG', 'ArD', 0.55],
      def: { D3: [1.8, 7.1] },
    },
  ];

  const LONG_RUECKPASS = [
    {
      texte: "Après une circulation venue de la droite, le demi-centre lance un croisé long: il part en diagonale vers l'aile gauche, ballon en main. L'arrière gauche compense vers le centre; l'ailier gauche remonte pour prendre de l'élan.",
      courses: { DC: [-4.6, 8.4], ArG: { vers: [-2.2, 11.0], via: [-4.6, 11.2] }, AiG: [-8.4, 4.2] },
    },
    {
      texte: "L'ailier gauche croise dans le dos du demi-centre et reçoit; le demi-centre continue vers l'aile.",
      courses: { AiG: { vers: [-3.4, 9.4], via: [-7.4, 9.4] }, DC: [-6.4, 6.8] },
      passe: ['DC', 'AiG', 0.55],
      def: { G2: [-5.4, 5.8] },
    },
    {
      texte: "L'ailier donne à l'arrière gauche, qui a compensé au centre.",
      courses: { ArG: [-1.0, 10.0], AiG: [-3.8, 9.0] },
      passe: ['AiG', 'ArG', 0.2],
    },
    {
      texte: "L'arrière gauche feinte une passe vers l'arrière droit, puis rend à l'ailier, bien placé face à l'intervalle entre le 1 et le 2 gauches. Un écran l'aide (la fiche ne dit pas qui; ici le demi-centre, resté à l'aile).",
      courses: { AiG: [-5.0, 7.8], DC: { vers: [-6.6, 4.6], ecran: true } },
      passe: ['ArG', 'AiG', 0.5],
      def: { G1: [-7.3, 3.8], G2: [-4.6, 5.8] },
    },
  ];

  const HHA_BASE = [
    {
      texte: "Après une percussion de l'arrière droit, le demi-centre transmet la pression à l'arrière gauche. Le 1 gauche défend très haut sur l'ailier, qui recule pour prendre de l'élan.",
      courses: { ArG: [-5.6, 9.0], AiG: [-8.8, 8.2] },
      passe: ['DC', 'ArG', 0.4],
    },
    {
      texte: "L'arrière gauche attaque l'intervalle entre le 1 et le 2 gauches, déjà tourné vers le 1. L'ailier croise dans son dos et reçoit.",
      courses: { ArG: [-6.4, 7.4], AiG: { vers: [-4.8, 8.6], via: [-7.6, 9.6] } },
      passe: ['ArG', 'AiG', 0.55],
      def: { G1: [-7.2, 6.6], G2: [-5.2, 6.0] },
    },
    {
      texte: "Juste après sa passe, l'arrière gauche bloque le 1 gauche et l'écarte du centre. L'ailier contourne l'écran à grande vitesse vers l'intervalle entre le 2 et le 3 gauches.",
      courses: { ArG: { vers: [-6.3, 6.4], ecran: true }, AiG: [-3.2, 7.9] },
      def: { G2: [-4.4, 6.4], G3: [-2.2, 7.0] },
    },
  ];

  const DCAL_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre, qui s'engage vers l'aile gauche, entre le 2 et le 1. Le pivot est en bloc diagonal près du 3 gauche.",
      courses: { DC: { vers: [-6.6, 6.2], via: [-3.0, 9.6] }, AiG: [-8.8, 3.0] },
      passe: ['ArG', 'DC', 0.1],
    },
    {
      texte: "L'ailier gauche croise dans son dos, vers l'intérieur, et reçoit. Le demi-centre continue vers l'aile.",
      courses: { AiG: { vers: [-3.6, 8.0], via: [-7.6, 10.0] }, DC: [-7.2, 5.4] },
      passe: ['DC', 'AiG', 0.5],
      def: { G1: [-7.6, 3.4], G2: [-5.4, 5.8], G3: [-2.4, 7.0] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'croise-a-vide-suites',
      nom: 'Suites du croisé à vide',
      alias: 'Kreuzen ohne Ball entgegen / ohne Express / ohne mit Außen / ohne über Kreis (handballhaus, DE)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Ce qu'on enchaîne après un croisé à vide: re-croisé à contre-sens, passe express, jeu avec l'ailier ou le pivot, et deux versions vues à l'Euro 2026.",
      description: [
        'Complète la fiche "Croisé à vide". Le site allemand handballhaus.de (2009-2011) présentait plusieurs suites, chacune avec une animation: seul un court texte nous est parvenu. Les variantes 1 à 5 suivent ces textes; le placement exact des joueurs est une interprétation.',
        "Les variantes 6 et 7 viennent de deux analyses détaillées de handballtraining.de sur le match Allemagne - France de l'Euro 2026: rentrée haute de l'ailier droit côté allemand, glissement du pivot vers l'extérieur côté français (but de l'ailier gauche). Selon l'auteur, la version française a été jouée plusieurs fois, des deux côtés.",
        'Choisis une suite au-dessus du schéma. Voir aussi "Croisé à vide danois" et "Yougo".',
      ],
      objectif: "Exploiter le déséquilibre créé par le croisé à vide quand la défense l'a bien lu.",
      pointsCles: [
        "Pour la passe express, l'arrière droit retarde sa passe pour laisser le demi-centre se replacer.",
        "Le pivot choisit le moment de quitter le centre: trop tôt, il dévoile l'idée; trop tard, l'espace se ferme.",
        "Le joueur au centre lit d'abord la défense avant de choisir.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Kreuzen ohne Ball entgegen (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen-ohne-ball/kreuzen-ohne-ball-entgegen.html',
          note: '"RL bindet IL und kreuzt mit RR, RR spielt einen Parallelpass zu RM (jetzt auf RL) oder nutzt die Kreuzbewegung zu einem Kreisanspiel."',
        },
        {
          titre: 'Kreuzen ohne Express (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen-ohne-ball/kreuzen-ohne-express.html',
          note: '"RR spielt den Ball nicht wie üblich zu RL sondern "express" in die Vorwärtsbewegung von RM, der mit einem schnellen Pass den Kreis anspielen kann."',
        },
        {
          titre: 'Kreuzen ohne mit Außen (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen-ohne-ball/kreuzen-ohne-mit-aussen.html',
          note: '"RM übt Druck auf HL aus und spielt den nachlaufenden LA an. Der Kreisläufer unterstützt die ganze Aktion durch eine Frontalsperre."',
        },
        {
          titre: 'Kreuzen ohne über Kreis (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen-ohne-ball/kreuzen-ohne-ueber-kreis.html',
          note: '"RR spielt den heraustretenden Kreisspieler an. RL kommt durch den langen Anlauf mit einem hohen Tempo und erhält den Ball vom KS."',
        },
        {
          titre: 'Leeres Kreuzen im Rückraum: Profi-Varianten aus dem EM-Spiel Deutschland gegen Frankreich (handballtraining.de, 2026)',
          url: 'https://handballtraining.de/taktik/leeres-kreuzen-im-rueckraum-profi-varianten-aus-dem-em-spiel-deutschland-gegen-frankreich/3950',
          note: "Croisé à vide allemand avec rentrée de l'ailier droit \"hoch über 9m\", puis re-croisé et passe parallèle; tir arrêté.",
        },
        {
          titre: 'Leeres Kreuzen im Rückraum II (handballtraining.de, 2026)',
          url: 'https://handballtraining.de/taktik/leeres-kreuzen-im-rueckraum-ii-profi-varianten-aus-dem-em-spiel-deutschland-gegen-frankreich/3965',
          note: "Le pivot glisse à l'extérieur du 3 puis du 2; \"RL nutzt diese Sperre aus, Außen Rechts muss helfen, RL passt zu Links Außen\".",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Re-croisé à contre-sens, passe parallèle',
          etapes: [
            ...ENTGEGEN,
            {
              texte: "L'arrière droit fait une passe parallèle au demi-centre, désormais arrière gauche.",
              courses: { DC: [-4.4, 8.2] },
              passe: ['ArD', 'DC', 0.2],
              def: { G3: [-1.4, 7.0], G2: [-4.6, 6.0] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: '2 - Re-croisé à contre-sens, passe au pivot',
          etapes: [
            ...ENTGEGEN,
            {
              texte: "Les deux 3 échangent mal leurs adversaires: l'arrière droit sert le pivot.",
              courses: { Piv: [0.3, 6.3] },
              passe: ['ArD', 'Piv', 0.3],
              def: { G3: [-0.9, 7.3] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Passe express au demi-centre',
          etapes: [
            ...SUITES_BASE,
            {
              texte: "L'arrière droit retarde sa passe, puis sert \"express\" le demi-centre, qui avance depuis le poste d'arrière gauche. L'arrière gauche continue sa course comme leurre.",
              courses: { DC: [-3.8, 8.2], ArG: [-0.2, 9.2] },
              passe: ['ArD', 'DC', 0.4],
              def: { G2: [-4.6, 6.0], G3: [-1.4, 7.0] },
            },
            {
              texte: "Le demi-centre sert vite le pivot.",
              courses: { Piv: [-2.8, 6.3] },
              passe: ['DC', 'Piv', 0.15],
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: '4 - Avec l\'ailier gauche ("mit Außen")',
          etapes: [
            {
              texte: "Le demi-centre donne à l'ailier gauche, qui rentre vers le centre.",
              courses: { AiG: { vers: [-2.0, 8.8], via: [-7.4, 6.8] } },
              passe: ['DC', 'AiG', 0.6],
            },
            {
              texte: "Le demi-centre et l'arrière droit échangent leurs places sans ballon. L'ailier s'arrête avec le ballon à hauteur du centre.",
              courses: {
                DC: { vers: [4.8, 9.0], via: [2.6, 8.8] },
                ArD: { vers: [0.6, 10.6], via: [4.0, 11.4] },
                AiG: [-0.8, 9.0],
              },
            },
            {
              texte: "L'ailier feinte une passe vers l'arrière droit, maintenant au centre, puis donne au demi-centre, qui attaque le 2 droit.",
              courses: { DC: [4.4, 8.2] },
              passe: ['AiG', 'DC', 0.3],
              def: { D2: [4.9, 6.4] },
            },
            {
              texte: "L'ailier suit l'action; le demi-centre lui redonne le ballon. Le pivot pose un écran de face sur le 3 droit.",
              courses: { AiG: { vers: [2.8, 8.0], via: [1.0, 9.2] }, Piv: { vers: [1.6, 7.6], ecran: true } },
              passe: ['DC', 'AiG', 0.55],
            },
            {
              texte: "L'ailier tire entre le 3 et le 2 droits.",
              courses: { AiG: [3.2, 7.4] },
              tir: { par: 'AiG', t: 0.4 },
            },
          ],
        },
        {
          nom: '5 - Par le pivot sorti ("über Kreis")',
          etapes: [
            ...SUITES_BASE,
            {
              texte: "Le pivot sort vers les 9 m; l'arrière droit le sert. L'arrière gauche garde son élan.",
              courses: { Piv: { vers: [1.6, 8.8], via: [1.2, 7.4] }, ArG: [-1.6, 10.8] },
              passe: ['ArD', 'Piv', 0.5],
              def: { D3: [1.8, 7.4] },
            },
            {
              texte: "L'arrière gauche, lancé, reçoit du pivot.",
              courses: { ArG: [0.2, 8.2] },
              passe: ['Piv', 'ArG', 0.35],
            },
            { texte: "L'arrière gauche tire (il peut aussi servir le pivot ou jouer en parallèle).", tir: 'ArG' },
          ],
        },
        {
          nom: "6 - Euro 2026, Allemagne: rentrée haute de l'ailier droit",
          etapes: [
            {
              texte: "Le 2 et le 3 gauches défendent haut, presque à 9 m; le pivot est entre le 3 et le 2 droits. Le demi-centre passe à l'arrière gauche.",
              courses: { ArG: [-5.0, 9.0], Piv: [3.3, 6.4] },
              passe: ['DC', 'ArG', 0.2],
              def: { G2: [-4.8, 8.0], G3: [-1.6, 8.4] },
            },
            {
              texte: "L'arrière gauche lui rend le ballon; le demi-centre avance vers les 9 m.",
              courses: { DC: [-0.4, 9.6] },
              passe: ['ArG', 'DC', 0.2],
              def: { G3: [-1.2, 8.6] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit et croise à vide avec l'arrière gauche, sans grande vitesse. L'ailier droit commence sa rentrée au-dessus des 9 m.",
              courses: {
                DC: { vers: [-5.0, 9.6], via: [-3.0, 9.0] },
                ArG: { vers: [-1.2, 10.6], via: [-4.6, 11.4] },
                AiD: { vers: [4.0, 10.8], via: [8.6, 8.6] },
                ArD: [5.4, 9.2],
              },
              passe: ['DC', 'ArD', 0.15],
            },
            {
              texte: "L'arrière droit rend à l'arrière gauche, arrivé au centre. L'ailier droit arrive à l'intérieur du 3 gauche au moment où l'arrière gauche reçoit. Le 3 droit sort à sa rencontre.",
              courses: { ArG: [0.6, 9.4], AiD: { vers: [-0.4, 7.4], via: [1.8, 8.6] } },
              passe: ['ArD', 'ArG', 0.3],
              def: { G3: [-1.6, 7.6], D3: [1.2, 8.0], D2: [4.4, 5.8], D1: [7.0, 5.2] },
            },
            {
              texte: "L'arrière gauche attaque l'intervalle droit à pleine vitesse, mais le 3 et le 2 droits se replient vite et ferment. L'ailier droit continue jusqu'au 2 gauche.",
              courses: { ArG: [2.4, 8.4], AiD: [-3.4, 7.0] },
              def: { D3: [1.6, 7.4], D2: [4.2, 6.0], G3: [-1.4, 7.2] },
            },
            {
              texte: "L'arrière droit croise derrière l'arrière gauche par le centre et reçoit; l'arrière gauche continue vers l'aile haute.",
              courses: { ArD: { vers: [0.6, 9.0], via: [3.6, 10.4] }, ArG: [6.8, 6.8] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D3: [1.2, 7.8] },
            },
            {
              texte: "Le 3 droit sort sur l'arrière droit: passe parallèle au demi-centre, qui arrive en arc côté gauche.",
              courses: { DC: { vers: [-2.6, 8.8], via: [-4.8, 9.4] }, AiD: [-3.6, 6.6] },
              passe: ['ArD', 'DC', 0.4],
              def: { G3: [-2.2, 7.4], G2: [-4.4, 7.4] },
            },
            { texte: "Le demi-centre tire (dans le match, le gardien a arrêté le tir).", tir: 'DC' },
          ],
        },
        {
          nom: "7 - Euro 2026, France: glissement du pivot à l'extérieur",
          etapes: [
            {
              texte: "Après une circulation (demi-centre, arrière droit, demi-centre), le demi-centre donne à l'arrière gauche.",
              courses: { ArG: [-5.4, 9.2] },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "Le demi-centre s'avance un peu vers l'arrière gauche et reçoit en retour.",
              courses: { DC: [-1.8, 9.6] },
              passe: ['ArG', 'DC', 0.4],
            },
            {
              texte: "Le demi-centre passe à l'arrière droit puis croise à vide: il part vers le poste d'arrière gauche, l'arrière gauche passe en large arc par le centre. Le pivot glisse à l'extérieur du 3 gauche.",
              courses: {
                DC: { vers: [-5.6, 9.4], via: [-3.6, 8.8] },
                ArG: { vers: [-0.6, 10.4], via: [-4.4, 11.6] },
                Piv: [-2.6, 6.4],
              },
              passe: ['DC', 'ArD', 0.1],
              def: { G2: [-5.0, 5.6], D2: [5.0, 6.0] },
            },
            {
              texte: "L'arrière droit sert l'arrière gauche, au centre. Le demi-centre s'écarte vers la touche. Le pivot continue jusqu'à l'extérieur du 2 gauche et y pose un écran.",
              courses: { ArG: [-1.2, 9.0], DC: [-7.0, 8.4], Piv: { vers: [-5.9, 5.0], via: [-6.4, 7.4], ecran: true } },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche se sert de l'écran et attaque vers l'extérieur: le 1 gauche doit venir aider.",
              courses: { ArG: { vers: [-4.8, 7.6], via: [-3.2, 8.4] } },
              def: { G1: [-6.8, 4.0] },
            },
            {
              texte: "Il donne à l'ailier gauche.",
              courses: { AiG: [-8.4, 2.4] },
              passe: ['ArG', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire et marque.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-long',
      nom: 'Croisé long demi-centre / ailier',
      alias: 'Mitte holt Außen, langes Kreuzen, langer Wechsel (DE); cruce largo (ES); cruzamento longo (PT)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre part en longue diagonale vers une aile et l'ailier croise dans son dos; l'arrière du même côté compense par le centre.",
      description: [
        "Un croisé long relie deux joueurs éloignés, typiquement le demi-centre et un ailier (typologie portugaise des \"cruzamentos longos\"). En Allemagne, on parle de \"Mitte holt Außen\": le demi-centre \"va chercher\" l'ailier. L'arrière du côté concerné compense en passant par le centre.",
        "Variante 1: exercice de handballtraining.de, où les croisés s'enchaînent d'une aile à l'autre; les joueurs restent au poste d'où ils passent. Le tir final de l'ailier gauche et la compensation de l'arrière gauche sont posés par symétrie. Variantes 2 et 3: fiche handballhaus \"Mitte holt Außen - Rückpass\", avec passe en retour à l'ailier. Variante 4: Antón García (2014), contre un tireur marqué de près, avec le pivot du côté opposé.",
        "Une autre forme (\"Doppelkreuzen\" du BHV, contre défense offensive: croisé long demi-centre / ailier gauche, puis l'arrière gauche prend la place du demi-centre et croise avec l'arrière droit) n'est connue que par un schéma trop incertain pour être animé.",
      ],
      objectif: "Déplacer la défense sur toute la largeur et donner à un ailier ou à un arrière un ballon lancé.",
      pointsCles: [
        "Le demi-centre attaque vraiment en diagonale pour fixer avant de lâcher.",
        "L'ailier part au bon moment pour croiser lancé, dans le dos du porteur.",
        "L'arrière compense par le centre pour garder une solution de passe.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Exemplarische Übungseinheit für Auslösehandlung: Mitte holt Außen (handballtraining.de, R. Nowacki)',
          url: 'https://handballtraining.de/taktik/exemplarische-uebungseinheit-fuer-ausloesehandlung-mitte-holt-aussen/1626',
          note: '"ein langer Wechsel zwischen Rückraum Mitte und Außenspieler mit Ausgleichen des betreffenden Halbangreifers über die Mittelposition".',
        },
        {
          titre: 'Mitte holt Außen - Rückpass (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/sperren/97-mitte-holt-aussen-rueckpass.html',
          note: '"RL spielt eine Passtäuschung zu RR und anschließend einen Rückpass zu LA. [...] Falls AR rechtzeitig aushilft, erfolgt der Pass nach Außen."',
        },
        {
          titre: 'Antón García, Tactical and strategical alternatives against anticipation defense to dangerous distance shooters (EHF, 2014)',
          url: 'http://home.eurohandball.com/ehf_files/Publikation/WP_Anton%20J.L._Tactical%20and%20strategical.pdf',
          note: '"The wing [...] initiates an ample trajectory throughout 9 meters line [...] and makes a long crossing with the CB. Immediately the CB chains a new crossing whose beneficiary is the marked thrower."',
        },
        {
          titre: 'Táctica de Grupo Ofensiva (Associação de Andebol de Braga)',
          url: 'http://aab.pt/noticias.ver.php?cid=844',
          note: 'Croisés "longos": entre joueurs éloignés, par exemple le demi-centre et un ailier.',
        },
        {
          titre: 'Angriff gegen offensive Abwehr (Badischer Handball-Verband, P. Streicher)',
          url: 'https://www.badischer-hv.de/fileadmin/bhv/Bilder_und_Dokumente/Bildung/B_Ausbildung_21/Angriff_gegen_offensive_Abwehr_PDF.pdf',
          note: '"Doppelkreuzen" RM x LA - RL(RM) - RR, schéma seulement.',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Mitte holt Außen: croisés en chaîne',
          etapes: [
            {
              texte: "Après une circulation venue de la gauche, le demi-centre part en longue diagonale vers l'aile droite, ballon en main: il va chercher l'ailier droit. L'arrière droit compense par le centre.",
              courses: { DC: [4.6, 8.4], ArD: { vers: [2.0, 11.0], via: [4.6, 11.2] }, AiD: [8.4, 4.2] },
            },
            {
              texte: "L'ailier droit croise dans son dos et reçoit; le demi-centre continue vers l'aile, où il reste.",
              courses: { AiD: { vers: [3.4, 9.4], via: [7.4, 9.4] }, DC: [6.4, 6.8], ArD: [0.2, 10.4] },
              passe: ['DC', 'AiD', 0.55],
              def: { D2: [5.6, 5.8] },
            },
            {
              texte: "L'ailier droit donne à l'arrière droit, arrivé au centre.",
              courses: { ArD: [0.2, 9.6] },
              passe: ['AiD', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit va à son tour chercher l'ailier gauche: longue diagonale vers l'aile gauche. L'arrière gauche compense vers le centre.",
              courses: { ArD: [-4.6, 8.4], ArG: { vers: [-2.0, 11.0], via: [-4.6, 11.2] }, AiG: [-8.4, 4.2] },
            },
            {
              texte: "L'ailier gauche croise dans son dos et reçoit.",
              courses: { AiG: { vers: [-3.4, 8.8], via: [-7.4, 9.4] }, ArD: [-6.4, 6.8] },
              passe: ['ArD', 'AiG', 0.55],
              def: { G2: [-5.6, 5.8] },
            },
            {
              texte: "L'ailier gauche tire.",
              courses: { AiG: [-3.0, 8.0] },
              tir: { par: 'AiG', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - Rückpass: percée de l'ailier entre 1 et 2",
          etapes: [
            ...LONG_RUECKPASS,
            {
              texte: "L'ailier perce entre le 1 et le 2 gauches et tire.",
              courses: { AiG: [-5.4, 6.6] },
              tir: { par: 'AiG', t: 0.45 },
              def: { G2: [-4.4, 5.8] },
            },
          ],
        },
        {
          nom: "3 - Rückpass: le 1 aide, passe à l'aile",
          etapes: [
            ...LONG_RUECKPASS,
            {
              texte: "Le 1 gauche vient aider sur l'ailier: celui-ci donne à l'aile, au demi-centre.",
              courses: { AiG: [-5.2, 7.0], DC: [-7.8, 3.6] },
              passe: ['AiG', 'DC', 0.4],
              def: { G1: [-6.4, 5.0] },
            },
            { texte: "Le demi-centre tire de l'aile.", tir: 'DC' },
          ],
        },
        {
          nom: '4 - Antón: croisé long puis croisé centre / tireur',
          etapes: [
            {
              texte: "Le meilleur tireur, l'arrière gauche, est marqué de près par le 2 gauche, très haut. Le pivot se tient du côté opposé. L'ailier gauche part sur une large trajectoire le long des 9 m; le demi-centre lui donne le ballon dans sa course. L'arrière gauche s'écarte vers la touche.",
              courses: { AiG: { vers: [-5.6, 8.2], via: [-8.8, 6.0] }, ArG: [-7.6, 10.2], Piv: [3.4, 6.4] },
              passe: ['DC', 'AiG', 0.3],
              def: { G2: [-6.4, 9.4] },
            },
            {
              texte: "L'ailier continue vers le centre; le demi-centre croise dans son dos vers la gauche et reçoit. Le défenseur du tireur recule pour s'intégrer au bloc.",
              courses: { AiG: [-1.8, 9.0], DC: { vers: [-4.6, 9.4], via: [-2.0, 11.8] } },
              passe: ['AiG', 'DC', 0.55],
              def: { G2: [-5.6, 6.0], G3: [-2.2, 7.0] },
            },
            {
              texte: "Le demi-centre enchaîne aussitôt un second croisé: l'arrière gauche arrive de l'extérieur vers l'intérieur, passe dans son dos et reçoit à distance de tir.",
              courses: { DC: [-6.0, 8.2], ArG: { vers: [-3.2, 9.6], via: [-6.2, 11.0] } },
              passe: ['DC', 'ArG', 0.5],
            },
            {
              texte: "L'arrière gauche tire de loin.",
              courses: { ArG: [-3.0, 9.2] },
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'halb-holt-aussen',
      nom: "Halb holt Außen (croisé arrière-ailier puis écran sur l'ailier défensif)",
      alias: 'Kreuzen bei offensiven Außenverteidigern (DE); "l\'arrière va chercher l\'ailier"',
      categorie: 'Croisés',
      defense: '0-6 avec ailiers défensifs hauts',
      resume: "Contre un ailier défensif très haut, l'arrière attaque l'intervalle 1-2, l'ailier croise dans son dos, puis l'arrière bloque l'ailier défensif.",
      description: [
        "Certaines défenses font monter leurs ailiers défensifs jusqu'à 9-10 m pour empêcher les ailiers de recevoir. handballtraining.de propose d'en profiter: après une percussion de l'arrière opposé, le demi-centre donne à l'arrière gauche, qui attaque l'intervalle entre le 1 et le 2. L'ailier gauche, qui a pris de l'élan, croise dans son dos et reçoit. L'arrière bloque aussitôt le 1 et l'écarte du centre; l'ailier contourne l'écran vers l'intervalle 2-3.",
        "Le pivot commence entre le 2 et le 3 du côté où le ballon n'est pas au départ (ici à gauche). Trois suites (variantes 1 à 3), puis la même idée avec le demi-centre qui va chercher l'ailier (variante 4). En 4:2, l'écran de l'arrière sur l'ailier défensif crée un 2 contre 2 ailier + pivot contre le 2 et le 3.",
        "L'option la plus probable selon l'auteur est la troisième: la défense glisse tôt vers le ballon, il faut renverser vite. Voir aussi \"Croisé arrière-ailier\".",
      ],
      objectif: "Isoler le 2 face à l'ailier lancé en sortant l'ailier défensif du jeu par un écran.",
      pointsCles: [
        "L'ailier prend son élan pendant que le demi-centre a encore le ballon.",
        "L'arrière part déjà vers le 1 pour préparer son écran.",
        "L'ailier qui croise doit lire la défense: tirer, servir le pivot ou renverser.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Auslösehandlung gegen offensive Außenverteidiger - Halb holt Außen (handballtraining.de, R. Nowacki)',
          url: 'https://handballtraining.de/taktik/ausloesehandlung-gegen-offensive-aussenverteidiger-halb-holt-aussen/1449',
          note: '"Der Außenverteidiger zieht mit hohem Tempo torgefährlich um die Sperre herum auf die Lücke zwischen 2 und 3." Trois options.',
        },
        {
          titre: 'Kreuzbewegung zwischen Rückraum- und Außenspielern - Anwendungsbeispiele (handballtraining.de)',
          url: 'https://handballtraining.de/taktik/kreuzbewegung-zwischen-rueckraum-und-aussenspielern-anwendungsbeispiele/1155',
          note: '"Der Rückraumhalbe sperrt den Außenverteidiger." Variante avec le demi-centre et application en 4:2.',
        },
        {
          titre: 'Zusammenspiel zwischen Halb- und Außenangreifer, Teil 2 (handballtraining.de)',
          url: 'https://handballtraining.de/taktik/zusammenspiel-zwischen-halb-und-aussenangreifer-auf-das-abwehrverhalten-reagieren-teil-2/1243',
          note: "Contre défense offensive, l'ailier recule à 9 m, croise derrière l'arrière et perce entre 2 et 3.",
        },
      ],
      depart: { AiG: [-8.6, 7.0], G1: [-7.8, 6.4], Piv: [-3.3, 6.4] },
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - L'arrière se décale de son écran",
          etapes: [
            ...HHA_BASE,
            {
              texte: "Le 2 gauche s'occupe de l'ailier. L'arrière gauche, souvent plus grand que l'ailier défensif, se décale de son écran vers le but; l'ailier lui rend le ballon.",
              courses: { ArG: [-5.8, 5.4] },
              passe: ['AiG', 'ArG', 0.35],
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...HHA_BASE,
            {
              texte: "Le 2 gauche sort sur l'ailier et le bloc central ne glisse pas assez: le pivot est libre dans son dos.",
              courses: { Piv: [-3.3, 6.2] },
              passe: ['AiG', 'Piv', 0.3],
              def: { G2: [-4.0, 7.0] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Renversement rapide vers le demi-centre',
          etapes: [
            ...HHA_BASE,
            {
              texte: "La défense a glissé tôt vers le ballon. Le pivot, dépassé, va bloquer de l'autre côté. L'ailier donne tout de suite au demi-centre.",
              courses: { Piv: { vers: [0.4, 6.4], ecran: true }, DC: [0.6, 9.2] },
              passe: ['AiG', 'DC', 0.2],
              def: { G3: [-2.4, 7.4], D3: [1.3, 6.8] },
            },
            {
              texte: "Le demi-centre a de l'espace: il attaque et tire (il peut aussi servir le pivot ou l'arrière droit).",
              courses: { DC: [-0.9, 8.0] },
              tir: { par: 'DC', t: 0.45 },
            },
          ],
        },
        {
          nom: "4 - Le demi-centre va chercher l'ailier",
          etapes: [
            {
              texte: "Le demi-centre attaque lui-même l'intervalle entre le 1 et le 2 gauches. L'arrière gauche glisse vers le centre pour rester une solution de passe. L'ailier prend son élan.",
              courses: {
                DC: { vers: [-6.2, 7.6], via: [-3.6, 9.4] },
                ArG: { vers: [-2.6, 10.6], via: [-4.6, 10.8] },
                AiG: [-8.8, 8.2],
              },
              def: { G1: [-7.2, 6.6], G2: [-5.2, 6.0] },
            },
            {
              texte: "L'ailier croise dans le dos du demi-centre et reçoit.",
              courses: { AiG: { vers: [-4.6, 8.6], via: [-7.8, 9.8] } },
              passe: ['DC', 'AiG', 0.5],
            },
            {
              texte: "Le demi-centre bloque le 1 gauche. L'ailier a beaucoup d'espace face au 2 gauche isolé.",
              courses: { DC: { vers: [-6.3, 6.6], ecran: true }, AiG: [-3.6, 7.9] },
              def: { G2: [-4.4, 6.4] },
            },
            { texte: "L'ailier tire de loin (ou joue son 1 contre 1).", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-dc-ailier',
      nom: 'Croisé demi-centre / ailier (4 fins)',
      alias: 'Croisé DC/ailier - variante ("Quel choix?", Dragør HK)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre s'engage vers l'aile, l'ailier croise dans son dos vers l'intérieur et reçoit; il tire, sert le pivot ou renverse sur l'arrière droit.",
      description: [
        "Fiche de la série \"Quel choix?\" de Dragør HK. L'arrière gauche donne au demi-centre, qui s'engage du côté de l'ailier gauche. L'ailier croise derrière lui vers l'intérieur et reçoit. Le pivot est placé en bloc diagonal.",
        "Les fins: tir de l'ailier ou passe au pivot; renversement sur l'arrière droit; l'arrière droit s'engage à l'extérieur et l'ailier, qui a prolongé sa course, reçoit à nouveau; ou l'arrière droit prolonge vers le centre et redonne à l'ailier qui a croisé derrière lui (choisis une fin au-dessus du schéma). Les trajectoires sont lues sur les schémas.",
        "Note: deux blogs EPS appellent \"Espagnole\" un croisé entre le demi-centre et un ailier; la fiche \"Espagnole\" du site suit une autre définition (croisé DC-arrière avec course parallèle de l'ailier).",
      ],
      objectif: "Faire attaquer l'ailier lancé vers le centre et exploiter la réaction de la défense.",
      pointsCles: [
        "Le demi-centre s'engage franchement vers l'aile pour emmener le 2 et le 1.",
        "L'ailier passe bien dans le dos du demi-centre.",
        "Le pivot en bloc diagonal ouvre le centre pour l'ailier ou l'arrière opposé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé DC/ailier - variante, fins 1 à 4 (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f714.html',
          note: '"ALG croise derrière DC, reçoit et tire, ou passe au PVT (bloc en diagonale)." Pages f714a à f714c: renversement sur ARD, ARD externe, ARD vers le centre.',
        },
        {
          titre: 'Combinaisons simples en attaque (blog taoufikeps)',
          url: 'https://taoufikeps.wordpress.com/2015/06/27/combinaisons-simple-en-attaque/',
          note: "Définit l'Espagnole comme \"un croisé entre le demi-centre et un ailier\" (sans étapes).",
        },
      ],
      depart: { Piv: [-0.6, 6.5] },
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'ailier",
          etapes: [
            ...DCAL_BASE,
            {
              texte: "Le 3 gauche ne sort pas, gêné par le bloc diagonal du pivot: l'ailier tire en suspension.",
              courses: { AiG: [-3.0, 7.6] },
              tir: { par: 'AiG', t: 0.4 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot (bloc diagonal)',
          etapes: [
            ...DCAL_BASE,
            {
              texte: "Le 3 gauche sort sur l'ailier, qui donne au pivot.",
              courses: { Piv: [-1.0, 6.3] },
              passe: ['AiG', 'Piv', 0.3],
              def: { G3: [-2.8, 7.4] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Renversement sur l'arrière droit",
          etapes: [
            ...DCAL_BASE,
            {
              texte: "L'ailier passe à l'opposé, à l'arrière droit, qui monte tout droit. Le pivot bloque en diagonale le 3 droit.",
              courses: { AiG: [-2.6, 8.4], ArD: [3.6, 7.6], Piv: { vers: [0.9, 6.8], ecran: true } },
              passe: ['AiG', 'ArD', 0.3],
              def: { D3: [1.8, 6.9] },
            },
            { texte: "L'arrière droit tire (ou sert le pivot).", tir: 'ArD' },
          ],
        },
        {
          nom: "4 - L'arrière droit s'engage à l'extérieur, l'ailier prolonge",
          etapes: [
            ...DCAL_BASE,
            {
              texte: "L'ailier donne à l'arrière droit, qui s'engage dans l'intervalle extérieur. L'ailier prolonge sa course vers la droite.",
              courses: { ArD: [6.0, 7.4], AiG: { vers: [1.0, 8.6], via: [-1.6, 9.0] } },
              passe: ['AiG', 'ArD', 0.2],
              def: { D2: [5.6, 6.2], D1: [7.6, 3.0] },
            },
            {
              texte: "L'arrière droit redonne à l'ailier, qui arrive entre le 3 et le 2 droits.",
              courses: { AiG: [2.8, 7.8] },
              passe: ['ArD', 'AiG', 0.3],
              def: { D3: [2.0, 7.0] },
            },
            { texte: "L'ailier tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "5 - L'arrière droit prolonge vers le centre",
          etapes: [
            ...DCAL_BASE,
            {
              texte: "L'ailier donne à l'arrière droit, qui prolonge vers le centre. L'ailier continue et croise derrière lui, vers la droite.",
              courses: { ArD: { vers: [1.2, 8.4], via: [3.6, 8.6] }, AiG: { vers: [3.6, 9.2], via: [0.8, 10.4] } },
              passe: ['AiG', 'ArD', 0.15],
            },
            {
              texte: "L'arrière droit redonne à l'ailier, qui attaque à droite (sinon il sert le pivot).",
              courses: { AiG: [4.8, 7.2] },
              passe: ['ArD', 'AiG', 0.2],
              def: { D2: [5.4, 5.8] },
            },
            { texte: "L'ailier tire.", tir: 'AiG' },
          ],
        },
      ],
    },
  );
})();

/* Suite: croisé arrière/arrière, croisé DC/arrière "Quel choix?", croisé et va, croisé avec remise. */
(() => {
  const ARAR_BASE = [
    {
      texte: "Le demi-centre passe à l'arrière droit, qui reçoit en course vers la gauche. Le demi-centre recule pour lui laisser le passage.",
      courses: { ArD: { vers: [2.0, 9.0], via: [4.2, 9.0] }, DC: [0.4, 11.4] },
      passe: ['DC', 'ArD', 0.1],
    },
    {
      texte: "L'arrière gauche fait un croisé \"plat\" derrière l'arrière droit et reçoit.",
      courses: { ArD: [-2.4, 8.8], ArG: { vers: [1.2, 9.4], via: [-1.2, 11.4] } },
      passe: ['ArD', 'ArG', 0.55],
    },
  ];
  const ARAR_AILIER = [
    ...ARAR_BASE,
    {
      texte: "L'arrière gauche donne à l'ailier droit, qui reçoit en course vers l'intérieur.",
      courses: { ArG: [2.0, 8.6], AiD: { vers: [5.8, 7.8], via: [8.6, 5.0] } },
      passe: ['ArG', 'AiD', 0.5],
      def: { D2: [5.4, 6.0] },
    },
  ];

  const DCAR_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre, qui part en course vers l'extérieur et attaque la défense.",
      courses: { DC: [-3.6, 8.6] },
      passe: ['ArG', 'DC', 0.15],
    },
    {
      texte: "Le demi-centre continue vers l'extérieur; l'arrière gauche court droit sur la défense et croise dans son dos. Le demi-centre lui donne le ballon. Le pivot bloque le 3 droit.",
      courses: {
        DC: { vers: [-6.6, 6.6], via: [-4.6, 7.6] },
        ArG: { vers: [-3.4, 7.4], via: [-5.0, 9.0] },
        Piv: { vers: [0.8, 6.7], ecran: true },
      },
      passe: ['DC', 'ArG', 0.55],
      def: { G2: [-5.2, 5.8], G3: [-1.9, 6.9] },
    },
  ];
  const DCAR_ARD = [
    ...DCAR_BASE,
    {
      texte: "L'arrière gauche ne peut ni tirer ni servir le pivot: il donne à l'arrière droit, lancé en course intérieure. Le pivot contourne le 3 droit et le bloque par l'extérieur.",
      courses: { ArD: { vers: [0.8, 8.4], via: [2.8, 8.8] }, Piv: { vers: [2.6, 6.4], via: [1.8, 7.6], ecran: true } },
      passe: ['ArG', 'ArD', 0.5],
      def: { D2: [4.6, 5.8] },
    },
  ];

  const CEV_BASE = [
    {
      texte: "L'arrière droit donne au demi-centre, qui s'engage vers le 2 gauche.",
      courses: { DC: [-2.4, 8.8] },
      passe: ['ArD', 'DC', 0.1],
      def: { G3: [-2.0, 7.0] },
    },
    {
      texte: "L'arrière gauche croise dans son dos; le demi-centre lui donne le ballon.",
      courses: { ArG: { vers: [0.4, 9.0], via: [-2.8, 10.4] }, DC: [-3.6, 7.8] },
      passe: ['DC', 'ArG', 0.5],
    },
  ];
  const CEV_VA = [
    ...CEV_BASE,
    {
      texte: "Après sa passe, le demi-centre continue sur le 2 gauche et fait un demi-tour rapide. L'arrière gauche feinte un tir en suspension.",
      courses: { DC: { vers: [-3.4, 7.0], via: [-4.4, 7.0] }, ArG: [0.6, 8.2] },
      def: { G2: [-4.8, 5.8], G3: [-1.0, 7.2], D3: [1.4, 7.2] },
    },
  ];

  const REMISE_DCARG = [
    {
      texte: "Le demi-centre attaque vers l'arrière gauche, ballon en main: il va le \"chercher\".",
      courses: { DC: [-3.0, 8.8] },
      def: { G3: [-2.0, 7.0] },
    },
    {
      texte: "L'arrière gauche croise dans son dos et reçoit.",
      courses: { ArG: { vers: [-0.8, 9.2], via: [-3.6, 10.4] }, DC: [-4.0, 8.2] },
      passe: ['DC', 'ArG', 0.5],
    },
    {
      texte: "Il rend aussitôt le ballon au demi-centre, en le cachant au 2 et au 3 gauches, et continue sa course comme s'il avait toujours le ballon.",
      courses: { ArG: [0.6, 8.4] },
      passe: ['ArG', 'DC', 0.15],
      def: { G3: [-1.0, 7.2], G2: [-4.4, 6.0], D3: [1.4, 7.2] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'croise-arrieres-lateraux',
      nom: 'Croisé arrière / arrière (croisé plat)',
      alias: 'Croisé ARG/ARD - variante ("Quel choix?", Dragør HK)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "L'arrière droit reçoit en courant vers la gauche; l'arrière gauche croise à plat derrière lui, reçoit, puis tire ou fait jouer le pivot, un ailier ou le demi-centre.",
      description: [
        "Série \"Quel choix?\" de Dragør HK. Le demi-centre (ou l'ailier gauche) donne à l'arrière droit, qui reçoit en courant vers la gauche. L'arrière gauche fait un croisé \"plat\" derrière lui, reçoit et tire. Les fiches suivantes donnent six autres fins: passe au pivot, à l'ailier gauche, ou à l'ailier droit qui relance vers le demi-centre, le pivot, l'ailier gauche, ou tire lui-même derrière l'écran de l'arrière gauche (variantes 1 à 7).",
        'Pour la variante 7, le texte dit "entre 2D et 3D" mais le schéma montre un tir à droite: la fiche suit le schéma.',
        'Deux autres fiches de Dragør, plus courtes, sont ajoutées: la course "en miroir" du demi-centre (variante 8, direction exacte de la course non précisée) et le croisé avec bloc du passeur (variante 9, schéma simplifié à un seul défenseur dans la source). Choisis une fin au-dessus du schéma. Voir aussi "Croisé" et "Croisé arrière-ailier".',
      ],
      objectif: "Déplacer toute la défense par une course latérale de l'arrière droit, puis attaquer à contre-sens.",
      pointsCles: [
        "Le croisé est \"plat\": l'arrière gauche passe juste derrière le porteur, sans reculer.",
        "L'arrière droit reçoit déjà lancé vers la gauche.",
        "Se souvenir de travailler des deux côtés (consigne de la fiche).",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé ARG/ARD - variante, 7 fins (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f212.html',
          note: '"La balle est passée par le DC ou ALG à ARD qui la reçoit en course vers la gauche. ARG fait un croisé plat derrière ARD, reçoit la balle et tire." Pages f212a à f212f: les autres fins.',
        },
        {
          titre: 'Croisé Arrière/Arrière avec tir externe Demi Centre (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f370.html',
          note: '"DC effectue une course "en miroir" par rapport à ARD, il réceptionne la balle et tire."',
        },
        {
          titre: 'Croisé avec bloc (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f147.html',
          note: '"Balle renvoyée à ARG et un bloc est effectué dans la foulée sur le défenseur."',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...ARAR_BASE,
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 3 et le 2 droits et tire.",
              courses: { ArG: [2.8, 7.8] },
              tir: { par: 'ArG', t: 0.45 },
              def: { D3: [2.0, 7.1] },
            },
          ],
        },
        {
          nom: '2 - Pour le pivot',
          etapes: [
            ...ARAR_BASE,
            {
              texte: "Le 3 droit sort sur l'arrière gauche, qui sert le pivot.",
              courses: { ArG: [2.4, 8.2], Piv: [0.7, 6.3] },
              passe: ['ArG', 'Piv', 0.5],
              def: { D3: [1.7, 7.3] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Pour l'ailier gauche",
          etapes: [
            ...ARAR_BASE,
            {
              texte: "L'arrière gauche feinte un tir en suspension, le corps orienté pour passer, et donne à l'ailier gauche, qui s'engage entre le 2 et le 3 gauches.",
              courses: { ArG: [2.0, 8.4], AiG: { vers: [-3.6, 7.0], via: [-7.4, 6.2] } },
              passe: ['ArG', 'AiG', 0.6],
              def: { G3: [-1.4, 7.0] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "4 - Puis l'ailier droit pour le demi-centre",
          etapes: [
            ...ARAR_AILIER,
            {
              texte: "L'ailier droit donne aussitôt au demi-centre, qui monte tout droit et reçoit en course.",
              courses: { DC: [-0.4, 8.4] },
              passe: ['AiD', 'DC', 0.3],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "5 - Puis l'ailier droit pour le pivot",
          etapes: [
            ...ARAR_AILIER,
            {
              texte: "L'ailier droit donne aussitôt au pivot.",
              courses: { Piv: [0.6, 6.3] },
              passe: ['AiD', 'Piv', 0.3],
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "6 - Puis l'ailier droit pour l'ailier gauche",
          etapes: [
            ...ARAR_AILIER,
            {
              texte: "L'ailier droit fait une longue passe à l'ailier gauche, qui reçoit en course entre le 1 et le 2 gauches.",
              courses: { AiG: { vers: [-6.2, 5.0], via: [-8.6, 3.6] } },
              passe: ['AiD', 'AiG', 0.45],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: "7 - Tir de l'ailier droit derrière l'écran",
          etapes: [
            ...ARAR_BASE,
            {
              texte: "L'arrière gauche donne à l'ailier droit, puis pose un écran sur le 2 droit. L'ailier croise derrière l'écran.",
              courses: { ArG: { vers: [4.2, 7.0], ecran: true }, AiD: { vers: [5.4, 8.6], via: [8.6, 6.0] } },
              passe: ['ArG', 'AiD', 0.4],
              def: { D2: [5.0, 6.2] },
            },
            {
              texte: "L'ailier droit tire entre le 3 et le 2 droits.",
              courses: { AiD: [3.2, 7.8] },
              tir: { par: 'AiD', t: 0.45 },
            },
          ],
        },
        {
          nom: '8 - Course "en miroir" du demi-centre',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière gauche, qui va chercher l'arrière droit en dribblant vers la droite. Le demi-centre s'écarte vers la gauche.",
              courses: { ArG: { vers: [2.6, 8.8], via: [-1.6, 8.4] }, DC: [-1.8, 11.0] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche continue vers l'intervalle entre le 2 et le 1 droits. L'arrière droit croise derrière lui, reçoit et attaque plein centre.",
              courses: { ArG: [4.6, 7.8], ArD: { vers: [0.8, 9.0], via: [3.8, 10.6] } },
              passe: ['ArG', 'ArD', 0.5],
              def: { D2: [5.4, 6.2], D3: [1.6, 7.2] },
            },
            {
              texte: "Le demi-centre fait une course en miroir de celle de l'arrière droit, de l'autre côté. L'arrière droit lui donne le ballon.",
              courses: { ArD: [0.4, 8.2], DC: { vers: [-2.6, 8.2], via: [-2.6, 10.2] } },
              passe: ['ArD', 'DC', 0.6],
              def: { G3: [-1.4, 7.2] },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: '9 - Avec bloc du passeur',
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche.",
              courses: { DC: [0.4, 11.2] },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "L'arrière gauche passe à l'arrière droit, qui s'engage vers le centre.",
              courses: { ArD: [1.4, 8.6] },
              passe: ['ArG', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit rend aussitôt le ballon à l'arrière gauche, qui croise dans son dos, et pose dans la foulée un bloc sur le 3 droit.",
              courses: { ArG: { vers: [3.4, 8.6], via: [0.4, 10.4] }, ArD: { vers: [2.0, 7.6], ecran: true } },
              passe: ['ArD', 'ArG', 0.4],
              def: { D3: [1.4, 6.8] },
            },
            {
              texte: "L'arrière gauche tire.",
              courses: { ArG: [3.2, 7.6] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-dc-ar-lecture',
      nom: 'Croisé demi-centre / arrière "Quel choix?"',
      alias: 'Croisé DC/AR - variante (Dragør HK, f713)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre part vers l'extérieur, l'arrière gauche croise et attaque droit; selon la défense, il tire, sert le pivot ou lance l'arrière droit, puis l'ailier droit.",
      description: [
        "Série \"Quel choix?\" de Dragør HK: neuf schémas qui ajoutent chacun une lecture. L'arrière gauche passe au demi-centre, qui part en course vers l'extérieur. L'arrière gauche court droit sur la défense, croise avec lui et reçoit; le pivot bloque le 3 droit. Ensuite: tir, pivot, arrière droit en course intérieure (le pivot contourne et bloque le 3 droit par l'extérieur), ailier droit, etc.",
        "Les notations de la source sont incohérentes (côtés des défenseurs): les trajectoires suivent les schémas. Pour la fin 4, le texte attribue le tir à l'arrière droit, mais le schéma montre une passe en retour et un tir de l'arrière gauche à droite: la fiche suit le schéma. Les fins 7 et 8 ont le même texte (passe au pivot quand le 2 droit couvre): elles sont réunies.",
        "C'est un exercice de lecture: choisis une fin au-dessus du schéma. Voir aussi la fiche \"Croisé\".",
      ],
      objectif: "Apprendre à choisir la bonne passe selon la réaction de la défense après un croisé demi-centre / arrière.",
      pointsCles: [
        "L'arrière gauche court droit sur la défense et tire si c'est possible: c'est la première option.",
        "Le pivot change de bloc selon l'option choisie.",
        "Chaque passe suivante répond à une réaction précise du 2 droit.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Croisé DC/AR 1 à 9 (Dragør HK, trad. Claude Meier)',
          url: 'http://www.dragoerhb.dk/fransk/f713.html',
          note: "\"ARG passe la balle au DC en course externe, qui attaque la défense. ARG court directement sur la défense et tire si c'est possible. Le PVT pose un bloc sur le 3G.\" Pages f713a à f713h: les autres fins.",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...DCAR_BASE,
            {
              texte: "L'arrière gauche tire.",
              courses: { ArG: [-3.0, 7.0] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: '2 - Passe au pivot',
          etapes: [
            ...DCAR_BASE,
            {
              texte: "L'arrière gauche ne peut pas tirer: il sert le pivot.",
              passe: ['ArG', 'Piv', 0.2],
              def: { G3: [-2.4, 7.8] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: '3 - Arrière droit en course intérieure',
          etapes: [
            ...DCAR_ARD,
            {
              texte: "L'arrière droit tire.",
              courses: { ArD: [0.6, 7.6] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: "4 - Le 2 droit couvre: retour à l'arrière gauche à droite",
          etapes: [
            ...DCAR_ARD,
            {
              texte: "Le bloc ne tient pas ou le 2 droit couvre l'intervalle. L'arrière gauche prolonge sa course derrière l'arrière droit vers la droite; l'arrière droit lui redonne le ballon.",
              courses: { ArG: { vers: [4.8, 7.6], via: [0.6, 11.6] }, ArD: [0.8, 7.9] },
              passe: ['ArD', 'ArG', 0.6],
              def: { D2: [3.6, 6.6], D1: [7.2, 3.0] },
            },
            {
              texte: "L'arrière gauche tire entre le 2 et le 1 droits.",
              courses: { ArG: [5.0, 7.0] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: "5 - Le 2 droit prend l'arrière droit: l'ailier droit",
          etapes: [
            ...DCAR_ARD,
            {
              texte: "Le 2 droit prend l'arrière droit. L'ailier droit s'engage dans son dos, reçoit et tire.",
              courses: { AiD: { vers: [3.8, 7.2], via: [7.6, 4.6] } },
              passe: ['ArD', 'AiD', 0.55],
              def: { D2: [2.4, 7.4] },
            },
            { texte: "L'ailier droit tire.", tir: 'AiD' },
          ],
        },
        {
          nom: "6 - Tir de l'arrière droit à l'extérieur du 2",
          etapes: [
            ...DCAR_BASE,
            {
              texte: "L'arrière gauche donne directement à l'arrière droit, qui monte tout droit. Le pivot contourne le 3 droit.",
              courses: { ArD: [5.6, 7.6], Piv: { vers: [2.6, 6.4], via: [1.8, 7.6], ecran: true } },
              passe: ['ArG', 'ArD', 0.4],
              def: { D2: [4.4, 6.2] },
            },
            {
              texte: "L'arrière droit tire à l'extérieur du 2 droit.",
              courses: { ArD: [5.8, 7.0] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: '7-8 - Le 2 droit couvre: passe au pivot',
          etapes: [
            ...DCAR_ARD,
            {
              texte: "Le 2 droit vient couvrir l'arrière droit: le pivot, à l'extérieur du 3, se retrouve libre. L'arrière droit le sert.",
              courses: { Piv: [3.2, 6.2] },
              passe: ['ArD', 'Piv', 0.4],
              def: { D2: [2.6, 7.6] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "9 - Croisé avec l'ailier droit, l'arrière droit contourne",
          etapes: [
            ...DCAR_ARD,
            {
              texte: "L'arrière droit donne à l'ailier droit, qui croise avec lui en venant vers le centre.",
              courses: { AiD: { vers: [3.8, 8.4], via: [7.8, 7.6] }, ArD: { vers: [-0.4, 9.6], via: [0.6, 10.0] } },
              passe: ['ArD', 'AiD', 0.3],
            },
            {
              texte: "L'arrière droit contourne le centre de la défense. L'arrière gauche croise avec l'ailier droit en partant vers la droite.",
              courses: {
                ArD: { vers: [-1.6, 8.0], via: [-1.2, 9.8] },
                ArG: { vers: [5.4, 7.8], via: [1.6, 11.4] },
                AiD: [2.6, 8.0],
              },
            },
            {
              texte: "L'ailier droit donne à l'arrière droit.",
              passe: ['AiD', 'ArD', 0.3],
            },
            { texte: "L'arrière droit tire.", tir: 'ArD' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-et-va',
      nom: 'Croisé et va',
      alias: 'Kryds retur / Cross return (DA/EN); Kryds retur til fløj (sur ailier)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre donne à l'arrière gauche qui croise, puis continue sur le 2 gauche et fait demi-tour pour recevoir en retour.",
      description: [
        "Fiche de Dragør HK. Le demi-centre croise avec l'arrière gauche et lui donne le ballon. Après sa passe, il continue sa course sur le 2 gauche et fait un demi-tour rapide. L'arrière gauche feinte un tir en suspension, puis lui rend le ballon: c'est un passe et va appliqué au croisé.",
        "Si le 3 du côté du pivot a suivi le ballon, le pivot se démarque et reçoit (variante 2). Dans la variante \"sur ailier\", le demi-centre bloque le 2 gauche, l'ailier gauche s'engage vers le centre et reçoit à la place du demi-centre (variante 3); selon la fiche, le pivot peut aussi se libérer, et si l'ailier et le pivot sont pris, l'arrière gauche tente sa chance. Le bloc du demi-centre est lu sur le schéma.",
        'Voir aussi "Passe et va" et "Croisé".',
      ],
      objectif: "Punir le défenseur qui suit le ballon après le croisé.",
      pointsCles: [
        "Le demi-centre ne s'arrête pas après sa passe: il continue sur le 2 puis se retourne vite.",
        "La feinte de tir de l'arrière gauche doit attirer le 3.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé et va (Dragør HK, trad. HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f389.html',
          note: '"DC continue sa course sur 2D et effectue un demi-tour rapide pour recevoir la balle de ARG, qui lui a fait une feinte de tir en suspension avant de faire sa passe."',
        },
        {
          titre: 'Croisé et va sur ailier (Dragør HK, trad. HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f390.html',
          note: "\"Au lieu de passer le ballon à DC, ARG va passer le ballon à ALG. Là, PVT peut se libérer et finir l'action.\"",
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: '1 - Vers le demi-centre',
          etapes: [
            ...CEV_VA,
            {
              texte: "L'arrière gauche rend le ballon au demi-centre.",
              passe: ['ArG', 'DC', 0.2],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: '2 - Le 3 droit suit: passe au pivot',
          etapes: [
            ...CEV_VA,
            {
              texte: "Le 3 droit a suivi le ballon: le pivot se démarque et reçoit.",
              courses: { Piv: [1.6, 6.3] },
              passe: ['ArG', 'Piv', 0.3],
              def: { D3: [1.2, 7.5] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
        {
          nom: "3 - Sur l'ailier gauche",
          etapes: [
            ...CEV_BASE,
            {
              texte: "Le demi-centre bloque le 2 gauche. L'ailier gauche s'engage vers le centre, à l'intérieur du 2.",
              courses: {
                DC: { vers: [-4.2, 6.6], ecran: true },
                AiG: { vers: [-2.8, 7.2], via: [-6.6, 9.6] },
                ArG: [0.6, 8.2],
              },
              def: { G2: [-5.0, 6.0], G3: [-1.0, 7.2] },
            },
            {
              texte: "L'arrière gauche donne à l'ailier gauche.",
              passe: ['ArG', 'AiG', 0.2],
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-avec-remise',
      nom: 'Croisé avec remise immédiate',
      alias: 'Kryds med returaflevering (DA); Kreuzen mit Rückpass (DE)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Après le croisé, le joueur qui reçoit rend tout de suite le ballon au porteur initial, qui attaque l'espace que la défense croyait fermé.",
      description: [
        "Trois sources décrivent la même idée: le receveur du croisé rend aussitôt le ballon. Chez Dragør HK, l'arrière droit rentre vers la gauche, croise avec l'arrière gauche et récupère le ballon devant le 2 gauche (variante 1). Sur handballhaus, le demi-centre croise avec l'arrière gauche, reçoit la passe en retour, cachée au 2 et au 3, et perce entre le 1 et le 2 ou donne à l'aile; l'arrière gauche continue comme s'il avait le ballon (variantes 2 et 3). Une autre version, \"depuis la position d'écran\", n'est connue que par son nom.",
        "Antón García (2014) l'utilise contre un tireur marqué de près: après le croisé, le tireur rend vite au demi-centre, qui joue le 2 contre 2 avec le pivot, placé auparavant dans cette zone (variante 4; la passe finale au pivot est une des issues possibles).",
        'Choisis une variante au-dessus du schéma. Voir aussi la fiche "Croisé".',
      ],
      objectif: "Tromper la défense qui change d'adversaire ou glisse sur le croisé.",
      pointsCles: [
        "La remise est immédiate et cachée aux défenseurs.",
        "Le joueur qui rend le ballon continue sa course comme s'il l'avait gardé.",
        "Le receveur de la remise doit se retourner très vite.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Croisé avec remise (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f408.html',
          note: "\"ARD croise avec l'arrière gauche ARG qui, tout en allant fixer le centre de la défense, remise pour ARD, celui-ci s'étant positionné devant le défenseur 2G.\"",
        },
        {
          titre: 'Kreuzen mit Rückpass (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/taeuschungen/kreuzen-mit-rueckpass.html',
          note: '"Nach Rückpass versucht RM zwischen 1 - 2 durchzubrechen oder den Ball nach Außen abzulegen. RL führt die Aktion so weiter, als wäre er noch im Ballbesitz."',
        },
        {
          titre: 'Antón García, Tactical and strategical alternatives against anticipation defense to dangerous distance shooters (EHF, 2014)',
          url: 'http://home.eurohandball.com/ehf_files/Publikation/WP_Anton%20J.L._Tactical%20and%20strategical.pdf',
          note: '"give back the ball quickly to the CB that searches for solutions in the 2x2 game with the pivot previously located in that zone".',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Dragør: l'arrière droit récupère devant le 2 gauche",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, qui rentre en diagonale vers la gauche, en direction du 2 gauche. Le demi-centre recule.",
              courses: { ArD: { vers: [-0.6, 8.8], via: [2.6, 9.0] }, DC: [0.6, 11.4] },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière gauche part vers le centre et croise dans son dos: l'arrière droit lui donne le ballon et continue jusque devant le 2 gauche.",
              courses: { ArG: { vers: [1.2, 9.2], via: [-3.0, 10.4] }, ArD: [-3.6, 7.6] },
              passe: ['ArD', 'ArG', 0.45],
            },
            {
              texte: "En fixant le centre de la défense, l'arrière gauche remet aussitôt le ballon à l'arrière droit.",
              courses: { ArG: [1.4, 8.4] },
              passe: ['ArG', 'ArD', 0.2],
              def: { G3: [-0.8, 7.2], D3: [1.2, 7.4], G2: [-4.6, 6.2] },
            },
            {
              texte: "L'arrière droit se retourne très vite et tire.",
              courses: { ArD: [-3.4, 7.2] },
              tir: { par: 'ArD', t: 0.35 },
            },
          ],
        },
        {
          nom: '2 - Kreuzen mit Rückpass: percée entre 1 et 2',
          etapes: [
            ...REMISE_DCARG,
            {
              texte: "Le demi-centre perce entre le 1 et le 2 gauches et tire.",
              courses: { DC: [-5.8, 6.8] },
              tir: { par: 'DC', t: 0.5 },
              def: { G1: [-7.2, 3.4] },
            },
          ],
        },
        {
          nom: "3 - Kreuzen mit Rückpass: passe à l'aile",
          etapes: [
            ...REMISE_DCARG,
            {
              texte: "Le 1 gauche vient fermer: le demi-centre donne à l'ailier gauche.",
              courses: { DC: [-5.4, 7.2], AiG: [-8.6, 2.2] },
              passe: ['DC', 'AiG', 0.5],
              def: { G1: [-6.6, 4.8] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '4 - Antón: remise puis 2 contre 2 avec le pivot',
          etapes: [
            {
              texte: "L'arrière gauche, bon tireur, est marqué de près par le 2 gauche. Le pivot est déjà placé côté gauche. Le demi-centre attaque vers l'arrière gauche.",
              courses: { DC: [-2.8, 8.8], Piv: [-3.3, 6.4] },
              def: { G2: [-5.0, 8.0] },
            },
            {
              texte: "Croisé: l'arrière gauche passe dans le dos du demi-centre et reçoit. Le 3 gauche change d'adversaire et le serre de près.",
              courses: { ArG: { vers: [-0.4, 9.0], via: [-3.2, 10.6] }, DC: [-3.8, 8.4] },
              passe: ['DC', 'ArG', 0.5],
              def: { G3: [-0.8, 7.9], G2: [-4.6, 7.2] },
            },
            {
              texte: "Marqué de près, l'arrière gauche rend vite le ballon au demi-centre.",
              passe: ['ArG', 'DC', 0.15],
            },
            {
              texte: "La défense a été attirée au centre: le demi-centre joue le 2 contre 2 avec le pivot. Il attaque le 2 gauche et sert le pivot.",
              courses: { DC: [-4.0, 7.6], Piv: [-3.0, 6.3] },
              passe: ['DC', 'Piv', 0.5],
              def: { G2: [-4.8, 6.6] },
            },
            { texte: "Le pivot tire.", tir: 'Piv' },
          ],
        },
      ],
    },
  );
})();

/* Suite: feintes de croisé, demi croisé, croisés courts et feinte de passe. */
(() => {
  const FEINTE2_BASE = [
    {
      texte: "Le pivot se place du côté droit.",
      courses: { Piv: { vers: [3.4, 6.4], via: [1.7, 8.6] } },
    },
    {
      texte: "L'arrière droit passe au demi-centre puis rentre vers la gauche, juste devant la défense.",
      courses: { ArD: { vers: [-1.0, 7.8], via: [2.6, 7.6] } },
      passe: ['ArD', 'DC', 0.1],
    },
    {
      texte: "Le demi-centre passe à l'arrière gauche et part lui aussi vers la gauche. L'arrière droit continue sa course devant la défense.",
      courses: { DC: [-3.6, 8.8], ArD: [-2.6, 7.6] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "L'arrière gauche donne à l'arrière droit, puis attaque aussitôt l'extérieur du 3 droit en passant dans le dos de tout le monde.",
      courses: { ArG: { vers: [1.8, 8.4], via: [-2.6, 11.0] }, ArD: [-3.4, 7.4], DC: [-5.2, 8.4] },
      passe: ['ArG', 'ArD', 0.1],
      def: { G2: [-4.6, 6.0] },
    },
  ];

  const ANGET_BASE = [
    {
      texte: "Le demi-centre va \"chercher\" l'arrière gauche: il attaque vers la gauche, près de la défense, en position d'écran. L'arrière gauche croise dans son dos. L'ailier gauche prépare sa rentrée.",
      courses: { DC: [-3.4, 8.0], ArG: { vers: [-1.2, 9.4], via: [-4.0, 10.6] }, AiG: [-8.4, 3.6] },
    },
    {
      texte: "Le demi-centre feinte la passe à l'arrière gauche. Le 3 gauche mord sur la feinte.",
      courses: { DC: [-3.8, 7.6], ArG: [-0.4, 8.8] },
      def: { G3: [-1.0, 7.2], G2: [-4.6, 6.2] },
    },
  ];

  const DEMI_BASE = [
    {
      texte: "L'ailier droit passe à l'arrière droit.",
      passe: ['AiD', 'ArD', 0.1],
    },
    {
      texte: "L'arrière droit passe au demi-centre, qui se lance à droite du défenseur central, prêt à tirer. L'avancé glisse vers lui.",
      courses: { DC: { vers: [1.2, 8.0], via: [1.8, 9.8] }, ArD: [4.2, 10.4] },
      passe: ['ArD', 'DC', 0.1],
      def: { D3: [0.6, 9.2] },
    },
    {
      texte: "Le demi-centre feinte le tir. Le pivot pose un bloc extérieur sur le défenseur central. L'arrière gauche démarre; le 2 gauche glisse vers le centre.",
      courses: { Piv: { vers: [-1.6, 7.2], via: [0.2, 8.0], ecran: true }, ArG: [-4.4, 9.0] },
      def: { G2: [-3.8, 6.2] },
    },
    {
      texte: "Le demi-centre passe à l'arrière gauche.",
      courses: { ArG: [-3.8, 8.6] },
      passe: ['DC', 'ArG', 0.2],
    },
  ];

  const RENV_BASE = [
    {
      texte: "Le demi-centre s'engage vers le 2 droit.",
      courses: { DC: [2.8, 8.6] },
      def: { D3: [2.2, 7.2] },
    },
    {
      texte: "L'arrière droit croise derrière lui et reçoit.",
      courses: { ArD: { vers: [0.6, 9.0], via: [3.8, 10.4] }, DC: [3.4, 7.8] },
      passe: ['DC', 'ArD', 0.5],
      def: { D3: [2.6, 7.0] },
    },
  ];

  const PARA_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre et court vers son défenseur, le 2 gauche.",
      courses: { ArG: [-4.4, 8.2] },
      passe: ['ArG', 'DC', 0.1],
    },
    {
      texte: "Il reçoit la remise dans sa course et feinte du côté de son défenseur.",
      courses: { ArG: [-4.4, 7.4], DC: [-0.6, 9.6] },
      passe: ['DC', 'ArG', 0.2],
      def: { G2: [-4.6, 6.0] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'feinte-de-croise',
      nom: 'Feinte de croisé 1 et 2',
      alias: 'Snydekryds 1 / 2 (DA); Fake cross 1 / 2 (EN)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "L'arrière droit fait mine de croiser avec le demi-centre et rentre au centre; l'action se conclut de l'autre côté, avec le pivot sorti (1) ou un croisé arrière / arrière (2).",
      description: [
        "Deux fiches de Dragør HK. Dans la feinte de croisé 1, l'arrière droit passe au demi-centre et rentre au centre après une feinte vers l'extérieur; le pivot sort en poste aux 9 m. Le ballon va à l'arrière gauche, qui joue une une-deux avec le pivot et tire au centre.",
        "Dans la feinte de croisé 2, le pivot est côté droit. L'arrière droit passe au demi-centre et rentre vers la gauche, juste devant la défense; le demi-centre donne à l'arrière gauche et part aussi à gauche. L'arrière gauche donne à l'arrière droit puis attaque l'extérieur du 3 droit: l'arrière droit lui renverse le ballon (2), ou feinte cette passe et sert le demi-centre (2a).",
        "Positions et trajectoires lues sur les schémas. Choisis une variante au-dessus du schéma.",
      ],
      objectif: "Déplacer la défense vers un côté par une fausse entrée, puis conclure à contre-sens.",
      pointsCles: [
        "La rentrée de l'arrière droit doit être crédible pour emmener les défenseurs.",
        "Dans la version 2, l'arrière gauche part dès sa passe et passe dans le dos de ses partenaires.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Feinte de croisé 1 (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f853.html',
          note: "\"Le pivot PVT sort en poste aux 9m. [...] la balle est passée à l'arrière gauche ARG qui se lance vers le centre après avoir passé au pivot en mouvement. PVT redonne à ARG qui tire.\"",
        },
        {
          titre: 'Feinte de croisé 2 (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f445.html',
          note: "\"ARG passe la balle à ARD qui court juste devant la défense. Immédiatement après avoir passé, ARG attaque l'extérieur du défenseur 3G. ARD fixe sur l'extérieur et renverse sur ARG qui arrive.\"",
        },
        {
          titre: 'Feinte de croisé 2a (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f445a.html',
          note: '"ARD feinte la passe à ARG, mais envoie finalement à DC qui tire."',
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: '1 - Feinte de croisé 1: une-deux avec le pivot',
          etapes: [
            {
              texte: "L'arrière droit passe au demi-centre, feinte vers l'extérieur puis rentre vers le centre. Le pivot sort en poste aux 9 m; le 3 gauche le suit.",
              courses: { ArD: { vers: [2.6, 7.4], via: [6.4, 8.2] }, Piv: { vers: [-2.2, 8.4], via: [-1.2, 7.6] } },
              passe: ['ArD', 'DC', 0.1],
              def: { D3: [1.8, 6.7], G3: [-1.8, 7.4] },
            },
            {
              texte: "Le demi-centre passe à l'arrière gauche.",
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche passe au pivot en mouvement, puis se lance vers le centre.",
              courses: { ArG: { vers: [-0.4, 8.2], via: [-2.6, 11.2] } },
              passe: ['ArG', 'Piv', 0.1],
            },
            {
              texte: "Le pivot lui redonne le ballon.",
              courses: { ArG: [-0.4, 7.8] },
              passe: ['Piv', 'ArG', 0.1],
            },
            { texte: "L'arrière gauche tire au centre.", tir: 'ArG' },
          ],
        },
        {
          nom: "2 - Feinte de croisé 2: renversement sur l'arrière gauche",
          etapes: [
            ...FEINTE2_BASE,
            {
              texte: "L'arrière droit fixe vers l'extérieur et renverse sur l'arrière gauche, qui arrive.",
              courses: { ArG: [2.6, 7.6] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D3: [1.6, 7.0] },
            },
            { texte: "L'arrière gauche tire.", tir: 'ArG' },
          ],
        },
        {
          nom: '2a - Feinte de passe, tir du demi-centre',
          etapes: [
            ...FEINTE2_BASE,
            {
              texte: "L'arrière droit feinte la passe à l'arrière gauche, mais donne au demi-centre.",
              courses: { DC: [-5.6, 6.8] },
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-angetaeuscht',
      nom: 'Croisé demi-centre / arrière gauche feinté',
      alias: 'Kreuzen RM-RL angetäuscht 1 / 2 / 3 (DE)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre va chercher l'arrière gauche pour un croisé, feinte la passe et sert l'ailier gauche qui rentre dans l'intervalle 1-2.",
      description: [
        "Trois fiches de handballhaus.de (2009-2011), dont seul un court texte nous est parvenu (les animations sont perdues). Le demi-centre \"va chercher\" l'arrière gauche en position d'écran et feinte la passe; il sert ensuite l'ailier gauche, qui perce dans l'intervalle entre le 1 et le 2 (variante 1).",
        "Si une défense attentive empêche la percée, le demi-centre peut croiser à nouveau, en sens inverse (variante 2). On peut aussi renoncer à servir l'ailier et utiliser l'espace libéré à l'aile par sa rentrée (variante 3): la source ne dit pas qui l'utilise; ici, le demi-centre. Placements interprétés.",
        'Voir aussi "Feinte de croisé 1 et 2" et "Faux croisé".',
      ],
      objectif: "Faire croire au croisé pour attirer le 3, puis jouer côté aile.",
      pointsCles: [
        "La feinte de passe doit être convaincante: le 3 doit mordre.",
        "L'ailier rentre au moment de la feinte, pas avant.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Kreuzen RM - RL angetäuscht (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/taeuschungen/kreuzen-rm-rl-angetaeuscht.html',
          note: '"RM holt RL im Schirm und spielt eine Passtäuschung, anschließend wird LA angespielt, der in die Lücke 1 - 2 durchbricht. Falls der Durchbruch [...] verhindert wird, kann RM nochmals entgegenkreuzen (Variante 2)."',
        },
        {
          titre: 'Kreuzen RM - RL angetäuscht 2 et 3 (handballhaus.de, archive 2010)',
          url: 'https://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/taeuschungen/91-kreuzen-angetaeuscht-2.html',
          note: '"Als Alternative kann auf das Anspiel auf LA verzichtet werden und der Freiraum außen, der durch das Einlaufen von LA entsteht, genutzt werden (Variante 3)."',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Passe à l'ailier gauche qui perce",
          etapes: [
            ...ANGET_BASE,
            {
              texte: "Le demi-centre sert l'ailier gauche, qui perce dans l'intervalle entre le 1 et le 2 gauches.",
              courses: { AiG: [-6.0, 5.0] },
              passe: ['DC', 'AiG', 0.4],
              def: { G1: [-7.0, 3.2] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
        {
          nom: '2 - Re-croisé à contre-sens',
          etapes: [
            ...ANGET_BASE,
            {
              texte: "L'ailier rentre mais la défense ferme l'intervalle. Le demi-centre repart vers le centre et croise à contre-sens avec l'arrière gauche, qui passe dans son dos vers la gauche et reçoit.",
              courses: {
                AiG: [-6.0, 5.0],
                DC: [-1.6, 8.4],
                ArG: { vers: [-4.0, 8.8], via: [-1.2, 10.4] },
              },
              passe: ['DC', 'ArG', 0.55],
              def: { G1: [-6.6, 4.0], G2: [-5.0, 6.0] },
            },
            {
              texte: "L'arrière gauche attaque entre le 2 et le 3 gauches et tire.",
              courses: { ArG: [-3.4, 7.6] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: "3 - L'espace libéré à l'aile",
          etapes: [
            ...ANGET_BASE,
            {
              texte: "L'ailier gauche rentre dans l'intervalle 1-2 sans recevoir; le 1 gauche le suit.",
              courses: { AiG: [-5.8, 5.2] },
              def: { G1: [-6.7, 3.6] },
            },
            {
              texte: "L'aile est libre: le demi-centre s'y engouffre par l'extérieur.",
              courses: { DC: { vers: [-7.6, 4.4], via: [-7.2, 8.6] } },
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'demi-croise',
      nom: 'Demi croisé',
      alias: 'Halvkryds med kontraaflevering (DA); Half cross with contra pass (EN)',
      categorie: 'Croisés',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Le demi-centre se lance à droite du défenseur central, feinte le tir et donne en arrière à l'arrière gauche, aidé par le bloc du pivot.",
      description: [
        "Fiche de Dragør HK. L'ailier droit passe à l'arrière droit, qui donne au demi-centre. Le demi-centre se lance et tire, ou feinte le tir à droite du défenseur central. En cas de feinte, il donne à l'arrière gauche (\"contre-passe\", d'où le nom danois). Au même moment, le pivot pose un bloc extérieur sur le défenseur central.",
        "L'arrière gauche tire dans l'intervalle entre le 2 et le 3 gauches, ou entre le 1 et le 2; si le 1 vient fermer, il donne à l'ailier gauche (choisis une fin au-dessus du schéma). Le texte ne précise pas la défense, mais les schémas montrent un défenseur avancé: la fiche est placée contre une 5-1.",
      ],
      objectif: "Attirer le centre de la défense à droite pour libérer l'arrière gauche.",
      pointsCles: [
        "La menace de tir du demi-centre doit être réelle (il peut tirer).",
        "Le bloc du pivot sur le central se pose au moment de la passe.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Demi croisé (Dragør HK, trad. HBC Cachan)',
          url: 'http://www.dragoerhb.dk/fransk/f187.html',
          note: "\"Dans le même temps, le pivot PVT effectue un bloc externe sur le défenseur central. ARG peut maintenant tirer dans l'intervalle D2 D3 ou dans l'intervalle 1D 2D ou encore passer à l'ailier ALG.\" Alternatives f187a à f187c: schémas.",
        },
      ],
      ballon: 'AiD',
      variantes: [
        {
          nom: '1 - Tir entre le 2 et le 3 gauches',
          etapes: [
            ...DEMI_BASE,
            {
              texte: "L'arrière gauche tire entre le 2 et le 3 gauches.",
              courses: { ArG: [-2.6, 7.6] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: '2 - Tir entre le 1 et le 2 gauches',
          etapes: [
            ...DEMI_BASE,
            {
              texte: "Le 2 gauche a glissé vers le centre: l'arrière gauche attaque entre le 1 et le 2 et tire.",
              courses: { ArG: [-5.6, 6.8] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: "3 - Passe à l'ailier gauche",
          etapes: [
            ...DEMI_BASE,
            {
              texte: "L'arrière gauche attaque entre le 1 et le 2; le 1 vient fermer. Il donne à l'ailier gauche.",
              courses: { ArG: [-5.2, 7.2], AiG: [-8.4, 2.8] },
              passe: ['ArG', 'AiG', 0.6],
              def: { G1: [-6.6, 4.0] },
            },
            { texte: "L'ailier gauche tire.", tir: 'AiG' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-dc-arriere-aile',
      nom: "Croisé demi-centre / arrière et passe à l'aile",
      categorie: 'Croisés',
      defense: '0-6',
      resume: "L'arrière gauche attire le 2 vers le centre, le demi-centre croise vers l'extérieur et oblige le 1 à sortir, puis sert l'ailier placé au coin.",
      description: [
        "Fiche de Dragør HK. L'ailier gauche se place au point de corner. Le demi-centre passe à l'arrière gauche, qui s'engage et oblige le 2 gauche à se déplacer vers le centre. Le demi-centre croise ensuite avec lui et s'engage dans l'intervalle entre le 1 et le 2, ce qui les oblige à fermer.",
        "Le ballon est aussitôt envoyé à l'ailier gauche, qui s'engage et tire. Selon la fiche, le but est d'amener le 1 à défendre sur le demi-centre: l'arrière gauche doit absolument fixer le 2 pour que seul le 1 puisse défendre sur le demi-centre.",
      ],
      objectif: "Faire sortir l'ailier défensif pour libérer l'ailier au coin.",
      pointsCles: [
        "L'arrière gauche fixe vraiment le 2.",
        "La passe à l'ailier part dès que le 1 s'engage sur le demi-centre.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "Croisé Demi Centre / Arrières et passe à l'aile (Dragør HK)",
          url: 'http://www.dragoerhb.dk/fransk/f48.html',
          note: "\"Le but de cet exercice est d'amener le défenseur 1 à défendre sur DC. [...] ARG doit absolument fixer D2 afin que seul D1 puisse défendre sur DC.\"",
        },
      ],
      depart: { AiG: [-9.6, 0.6] },
      ballon: 'DC',
      etapes: [
        {
          texte: "Le demi-centre passe à l'arrière gauche, qui s'engage vers le centre et oblige le 2 gauche à se déplacer.",
          courses: { ArG: { vers: [-3.4, 8.0], via: [-4.6, 8.6] }, DC: [-1.0, 10.4] },
          passe: ['DC', 'ArG', 0.1],
          def: { G2: [-4.0, 6.4] },
        },
        {
          texte: "Le demi-centre croise derrière lui vers l'extérieur, reçoit et s'engage dans l'intervalle entre le 1 et le 2 gauches. L'arrière gauche fixe le 2.",
          courses: { DC: { vers: [-5.8, 7.0], via: [-4.0, 9.8] }, ArG: [-2.8, 7.6] },
          passe: ['ArG', 'DC', 0.5],
        },
        {
          texte: "Le 1 et le 2 ferment l'intervalle; le 1 sort sur le demi-centre. Le ballon part aussitôt à l'ailier gauche, qui s'engage.",
          courses: { AiG: [-8.2, 2.6] },
          passe: ['DC', 'AiG', 0.4],
          def: { G1: [-6.6, 4.6], G2: [-4.6, 6.2] },
        },
        { texte: "L'ailier gauche tire.", tir: 'AiG' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-et-renversement',
      nom: 'Croisé, feinte de tir et renversement',
      alias: 'Exercice de croisé 1 et 2 (Dragør HK)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Après un croisé demi-centre / arrière droit, l'arrière droit feinte le tir et renverse par le pivot ou par l'ailier vers l'arrière gauche, qui relance le demi-centre.",
      description: [
        "Exercice de Dragør HK. Le demi-centre s'engage vers le 2 droit; l'arrière droit croise derrière lui, reçoit, feinte un tir en suspension et passe au pivot (exercice 1) ou à l'ailier (exercice 2). Le ballon va ensuite à l'arrière opposé, qui le donne au demi-centre en train de s'engager. Les deux joueurs du croisé échangent leur poste.",
        "La fiche est un exercice en colonnes: qui conclut n'est pas précisé. Ici, le demi-centre, resté à droite après le croisé, se réengage et tire. Le pivot est placé côté gauche, comme sur le schéma.",
      ],
      objectif: "Enchaîner croisé, feinte et renversement pour déplacer la défense d'un côté à l'autre.",
      pointsCles: [
        "La feinte de tir de l'arrière droit doit fixer la défense avant la passe.",
        "Le demi-centre se réengage au moment où le ballon revient.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Exercice de croisé 1 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f222.html',
          note: "DC s'engage vers 2G; l'arrière croise, feinte un tir et passe au PVT; \"PVT passe à l'arrière opposé, qui passe à DC en train de s'engager\".",
        },
        {
          titre: 'Exercice de croisé 2 (Dragør HK)',
          url: 'http://www.dragoerhb.dk/fransk/f222a.html',
          note: "Même chose, mais la passe après la feinte va à l'ailier.",
        },
      ],
      depart: { Piv: [-3.2, 6.4] },
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Renversement par le pivot',
          etapes: [
            ...RENV_BASE,
            {
              texte: "L'arrière droit feinte un tir en suspension et passe au pivot.",
              courses: { ArD: [0.4, 8.4] },
              passe: ['ArD', 'Piv', 0.3],
              def: { G3: [-1.2, 7.2] },
            },
            {
              texte: "Le pivot passe à l'arrière gauche.",
              courses: { ArG: [-5.0, 9.0] },
              passe: ['Piv', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche donne au demi-centre, qui se réengage à droite.",
              courses: { DC: { vers: [3.8, 8.4], via: [4.6, 9.8] } },
              passe: ['ArG', 'DC', 0.55],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
        {
          nom: "2 - Renversement par l'ailier",
          etapes: [
            ...RENV_BASE,
            {
              texte: "L'arrière droit feinte un tir en suspension et passe à l'ailier gauche.",
              courses: { ArD: [0.4, 8.4], AiG: [-8.6, 2.0] },
              passe: ['ArD', 'AiG', 0.3],
              def: { G3: [-1.2, 7.2] },
            },
            {
              texte: "L'ailier passe à l'arrière gauche.",
              courses: { ArG: [-5.0, 9.0] },
              passe: ['AiG', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche donne au demi-centre, qui se réengage à droite.",
              courses: { DC: { vers: [3.8, 8.4], via: [4.6, 9.8] } },
              passe: ['ArG', 'DC', 0.55],
            },
            { texte: "Le demi-centre tire.", tir: 'DC' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'induction-et-croise-dc',
      nom: 'Induction avec croisé du demi-centre',
      alias: 'Centerkryds med forfinte (DA); Center cross with initial feint (EN)',
      categorie: 'Croisés',
      defense: '5-1',
      dispositif: '5-1',
      resume: "Après une feinte vers le centre, le demi-centre part à droite et fait une passe arrière à l'arrière gauche qui croise, puis monte faire écran sur l'avancé.",
      description: [
        "Fiche de Dragør HK. Le ballon part de l'ailier gauche vers l'arrière gauche, puis vers le demi-centre, qui vient de faire une induction (une feinte d'entrée) vers le centre de la défense. Le demi-centre part ensuite sur la droite et fait une passe arrière à l'arrière gauche, qui croise avec lui et s'engage vers le centre.",
        "Au moment du croisé, le demi-centre monte faire un écran sur le défenseur \"3P\". Sur le schéma, il s'agit d'un défenseur avancé: la fiche est placée contre une 5-1, et l'écran se fait sur l'avancé. L'arrière gauche continue son engagement, éventuellement avec un dribble, et tire.",
      ],
      objectif: "Libérer l'arrière gauche au centre en bloquant le défenseur avancé.",
      pointsCles: [
        "L'induction du demi-centre attire l'attention du centre de la défense.",
        "L'écran se pose au moment du croisé, pas après.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Induction avec croisé demi centre (Dragør HK, trad. HBC Vendenheim)',
          url: 'http://www.dragoerhb.dk/fransk/f710.html',
          note: "\"DC part sur la droite et fait une passe arrière à ARG qui croise avec lui et va s'engager vers le centre de la défense. Au moment du croisé, DC monte faire un écran sur 3P.\"",
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
          texte: "L'arrière gauche passe au demi-centre, qui vient de faire une feinte d'entrée vers le centre de la défense.",
          courses: { DC: [-1.4, 10.0] },
          passe: ['ArG', 'DC', 0.3],
        },
        {
          texte: "Le demi-centre part sur la droite, suivi par l'avancé, et fait une passe arrière à l'arrière gauche, qui croise dans son dos.",
          courses: { DC: [1.6, 10.4], ArG: { vers: [-0.6, 10.6], via: [-2.4, 11.4] } },
          passe: ['DC', 'ArG', 0.6],
          def: { D3: [0.9, 9.4] },
        },
        {
          texte: "Au moment du croisé, le demi-centre monte faire un écran sur l'avancé. L'arrière gauche continue son engagement vers le centre.",
          courses: { DC: { vers: [1.6, 8.8], ecran: true }, ArG: [0.2, 8.2] },
        },
        {
          texte: "L'arrière gauche, éventuellement après un dribble, tire.",
          courses: { ArG: [0.2, 7.6] },
          tir: { par: 'ArG', t: 0.4 },
          def: { G3: [-0.6, 6.9] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ou-parallele',
      nom: 'Croisé ou percussion parallèle (lecture à deux)',
      alias: 'Kreuzen / Parallelstoß, kurzes Kreuzen mit Parallelstoß (DE); Crossing and parallel piston movement (EN)',
      categorie: 'Croisés',
      defense: 'Toutes',
      resume: "Un jeu à deux arrières contre deux défenseurs: percée directe, percée de l'autre côté, passe parallèle ou croisé, selon la réaction de la défense.",
      description: [
        "Jörg Madinger (DV Concept) décrit un 2 contre 2 entre deux arrières. Le porteur passe à son partenaire, court vers son défenseur, reçoit la remise dans sa course et feinte du côté de son défenseur. Si le défenseur reste à l'extérieur, il perce directement; s'il ferme l'intérieur, il perce de l'autre côté.",
        "Le partenaire lit le second défenseur: s'il vient aider sur la percée, le partenaire va tout droit et reçoit dans sa course (passe parallèle); si ce défenseur ferme l'intervalle alors que l'autre reste large, le partenaire prend le croisé. Les fiches allemandes de handball-uebungen.de parlent de \"kurzes Kreuzen mit Parallelstoß\".",
        "La source n'a été lue qu'à travers un aperçu résumé: le schéma pose l'action entre l'arrière gauche et le demi-centre, face au 2 et au 3 gauches. Choisis une option au-dessus du schéma.",
      ],
      objectif: "Apprendre à choisir entre percée, passe parallèle et croisé selon les deux défenseurs.",
      pointsCles: [
        "Le porteur attaque son défenseur pour l'obliger à choisir.",
        "Le partenaire décide selon le second défenseur: il aide ou il reste.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Madinger, Opening playing variants against various defense systems (DV Concept), chap. A1.3 (aperçu)',
          url: 'https://www.litres.ru/book/jorg-madinger/opening-playing-variants-against-various-defense-systems-56996647/chitat-onlayn/',
          note: '"Crossing and parallel piston movement": quatre options selon les deux défenseurs (aperçu résumé, pas lu mot à mot).',
        },
        {
          titre: 'Trainingseinheiten Angriff gegen 6:0 (handball-uebungen.de, résumés)',
          url: 'https://handball-uebungen.de/trainingseinheiten/angriff/angriff-gegen-6-0',
          note: '"Das kurze Kreuzen mit Parallelstoß gegen eine 6:0-Abwehr" (TE 364); détail payant.',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Percée directe',
          etapes: [
            ...PARA_BASE,
            {
              texte: "Le 2 reste à l'extérieur: l'arrière gauche perce directement à l'intérieur.",
              courses: { ArG: [-3.2, 6.8] },
              tir: { par: 'ArG', t: 0.6 },
              def: { G2: [-5.2, 5.8] },
            },
          ],
        },
        {
          nom: "2 - Percée de l'autre côté",
          etapes: [
            ...PARA_BASE,
            {
              texte: "Le 2 ferme l'intérieur: l'arrière gauche perce de l'autre côté, à l'extérieur.",
              courses: { ArG: { vers: [-5.6, 6.6], via: [-5.0, 7.6] } },
              tir: { par: 'ArG', t: 0.6 },
              def: { G2: [-3.8, 6.4] },
            },
          ],
        },
        {
          nom: '3 - Passe parallèle',
          etapes: [
            ...PARA_BASE,
            {
              texte: "Le 3 vient aider sur la percée: le demi-centre va tout droit et reçoit dans sa course.",
              courses: { ArG: [-3.6, 7.2], DC: [-0.6, 8.2] },
              passe: ['ArG', 'DC', 0.5],
              def: { G3: [-2.6, 7.0], G2: [-4.6, 6.2] },
            },
            {
              texte: "Le demi-centre tire.",
              courses: { DC: [-0.4, 7.6] },
              tir: { par: 'DC', t: 0.3 },
            },
          ],
        },
        {
          nom: '4 - Croisé',
          etapes: [
            ...PARA_BASE,
            {
              texte: "Le 3 ferme l'intervalle mais le 2 reste large: l'arrière gauche glisse vers le centre et le demi-centre croise dans son dos.",
              courses: { ArG: [-2.4, 7.8], DC: { vers: [-4.2, 8.0], via: [-1.6, 11.8] } },
              passe: ['ArG', 'DC', 0.55],
              def: { G3: [-1.8, 7.0], G2: [-5.2, 5.8] },
            },
            {
              texte: "Le demi-centre perce à l'intérieur du 2 et tire.",
              courses: { DC: [-3.8, 7.0] },
              tir: { par: 'DC', t: 0.45 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'afleveringsfinte',
      nom: 'Feinte de passe du demi-centre',
      alias: 'Afleveringsfinte (DA); Pass feint (EN)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Le demi-centre s'arrête devant le 3, tend le bras vers l'arrière gauche qui attaque, puis tire quand le 3 part aider.",
      description: [
        "Fiche danoise de Dragør HK (pas de version française). L'arrière gauche passe au demi-centre, qui avance et s'arrête devant le 3 gauche. Au même moment, l'arrière gauche attaque entre le 2 et le 3. Le demi-centre tend le bras vers lui comme pour passer.",
        "Souvent, le 3 se décale pour aider le 2: le demi-centre ramène le bras et tire. C'est plus une action à deux qu'une combinaison. Voir aussi \"Faux croisé\".",
      ],
      objectif: "Libérer le tir du demi-centre en faisant croire à une passe vers l'arrière lancé.",
      pointsCles: [
        "L'arrière gauche attaque vraiment l'intervalle pour attirer le 3.",
        "La feinte se fait bras armé, prêt à tirer dans la foulée.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Afleveringsfinte (Dragør HK, danois)',
          url: 'http://www.dragoerhb.dk/x125.html',
          note: "Le DC s'arrête devant le 3, tend le bras vers l'ARG qui attaque entre le 2 et le 3; le 3 aide souvent le 2 et le DC tire (résumé traduit).",
        },
      ],
      depart: { Piv: [0.8, 6.4] },
      ballon: 'ArG',
      etapes: [
        {
          texte: "L'arrière gauche passe au demi-centre, qui avance et s'arrête devant le 3 gauche.",
          courses: { DC: [-1.4, 8.0] },
          passe: ['ArG', 'DC', 0.1],
        },
        {
          texte: "En même temps, l'arrière gauche attaque entre le 2 et le 3 gauches. Le demi-centre tend le bras vers lui comme pour passer.",
          courses: { ArG: [-3.4, 7.6] },
          def: { G2: [-4.4, 6.0] },
        },
        {
          texte: "Le 3 gauche se décale pour aider le 2. Le demi-centre ramène le bras et tire.",
          courses: { DC: [-1.0, 7.6] },
          tir: { par: 'DC', t: 0.5, cible: [-1.0, -0.35] },
          def: { G3: [-2.6, 6.9] },
        },
      ],
    },
  );
})();
