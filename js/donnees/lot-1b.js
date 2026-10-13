/* croisés à deux (Bornholm, écrans, engagements rapides en croisé, enclenchements FFHB: Yougo, Azna, Kiel, Chambéry...). */
(() => {
  /* ------------------------------------------------------------------ */
  /* Croisé "Bornholm" (Dragør HK, f449 / f449a)                       */
  /* ------------------------------------------------------------------ */
  const BORN_DEBUT = [
    {
      texte: "L'arrière droit passe au demi-centre, qui se lance en diagonale vers la gauche, entre le 3 et le 2 gauches. Le 3 gauche sort sur lui.",
      courses: { DC: [-2.6, 8.6] },
      passe: ['ArD', 'DC', 0.05],
      def: { G3: [-2.3, 7.3] },
    },
    {
      texte: "L'arrière gauche croise derrière le demi-centre, vers le centre, et reçoit le ballon au croisement.",
      courses: { ArG: { vers: [-0.6, 8.8], via: [-3.4, 10.6] }, DC: [-3.5, 8.0] },
      passe: ['DC', 'ArG', 0.55],
      def: { G3: [-1.9, 7.2], D3: [1.2, 7.0] },
    },
  ];
  const BORN_BASE = [
    ...BORN_DEBUT,
    {
      texte: "L'arrière gauche saute et menace de tirer. L'ailier gauche fait une rentrée le long des 6 m, et le 1 gauche le suit. Le demi-centre file prendre sa place à l'aile.",
      courses: {
        ArG: [-0.4, 8.0],
        AiG: { vers: [-3.2, 6.4], via: [-6.6, 4.4] },
        DC: { vers: [-8.4, 2.6], via: [-6.4, 6.8] },
      },
      def: { G3: [-1.3, 7.0], D3: [0.9, 7.0], G2: [-4.6, 5.6], G1: [-6.4, 4.4] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Kreuzen - Sperren (handballhaus.de)                                  */
  /* ------------------------------------------------------------------ */
  const SPERREN2_BASE = [
    {
      texte: "Le demi-centre attaque en diagonale vers la gauche, entre le 3 et le 2 gauches. Le 3 gauche sort sur lui.",
      courses: { DC: [-2.6, 8.8] },
      def: { G3: [-2.3, 7.4] },
    },
    {
      texte: "L'arrière gauche croise derrière lui et reçoit, lancé vers le centre. Le pivot bloque le 3 gauche par l'intérieur: il sépare les deux défenseurs centraux.",
      courses: {
        ArG: { vers: [-0.6, 9.2], via: [-3.8, 10.8] },
        DC: [-3.4, 8.2],
        Piv: { vers: [-1.4, 6.8], ecran: true },
      },
      passe: ['DC', 'ArG', 0.55],
      def: { D3: [1.4, 7.0] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Schweden (handballhaus.de, d'après Bengt Johansson)                  */
  /* ------------------------------------------------------------------ */
  const SUEDE_BASE = [
    {
      texte: "Après le but encaissé, l'ailier gauche s'est placé discrètement à côté de l'arrière droit: il y a deux arrières droits. Le pivot fait l'engagement vers le demi-centre et file aux 6 m.",
      courses: { Piv: { vers: [0.2, 6.5], via: [1.2, 9.6] }, DC: [-0.4, 10.6] },
      passe: ['Piv', 'DC', 0.05],
    },
    {
      texte: "Le demi-centre donne à l'arrière droit.",
      courses: { ArD: [3.8, 9.8] },
      passe: ['DC', 'ArD', 0.2],
    },
    {
      texte: "L'arrière droit lui rend aussitôt.",
      courses: { DC: [-0.6, 10.0] },
      passe: ['ArD', 'DC', 0.2],
    },
    {
      texte: "Le demi-centre attaque en diagonale vers la gauche. Le 3 gauche sort sur lui.",
      courses: { DC: [-2.6, 8.8] },
      def: { G3: [-2.3, 7.4] },
    },
    {
      texte: "L'arrière gauche croise derrière lui vers le centre et reçoit.",
      courses: { ArG: { vers: [-0.6, 9.4], via: [-3.8, 10.8] }, DC: [-3.4, 8.2] },
      passe: ['DC', 'ArG', 0.55],
      def: { D3: [1.3, 7.2] },
    },
    {
      texte: "L'arrière gauche est dangereux: il prépare un tir en suspension et le 3 droit sort. Il joue en parallèle vers l'arrière droit, qui s'élance.",
      courses: { ArG: [0.4, 8.6], ArD: [4.0, 9.2] },
      passe: ['ArG', 'ArD', 0.55],
      def: { D3: [0.9, 7.7] },
    },
    {
      texte: "L'arrière droit attaque exactement le 2 droit et le fixe. Le second arrière droit (l'ailier gauche) s'élance à l'extérieur.",
      courses: { ArD: [4.4, 7.8], AiG: [6.8, 8.6] },
      def: { D2: [4.8, 6.8], D1: [7.6, 2.4] },
    },
    {
      texte: "Il donne au second arrière droit, en surnombre, qui perce entre le 2 et le 1 droits.",
      courses: { AiG: [6.6, 6.4] },
      passe: ['ArD', 'AiG', 0.2],
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Engagement rapide "Blacky" (forum handballecke.de)                 */
  /* ------------------------------------------------------------------ */
  const RL_HOLT_RR = [
    {
      texte: "Après l'engagement, l'arrière gauche part avec le ballon vers la droite: il \"va chercher\" l'arrière droit.",
      courses: { ArG: [1.2, 9.6] },
      def: { D3: [1.6, 7.2] },
    },
    {
      texte: "L'arrière droit croise derrière lui et reçoit.",
      courses: { ArD: { vers: [-1.0, 9.6], via: [2.4, 11.2] }, ArG: [2.2, 9.0] },
      passe: ['ArG', 'ArD', 0.55],
    },
    {
      texte: "L'arrière droit percute entre le 3 et le 2 gauches.",
      courses: { ArD: [-3.2, 8.0] },
      def: { G3: [-2.4, 7.2], G2: [-4.0, 6.6] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Dlouhý kříž (Kubišová 2020)                                          */
  /* ------------------------------------------------------------------ */
  const DLOUHY_BASE = [
    {
      texte: "Deuxième vague. Le demi-centre, en mouvement, donne à l'arrière gauche, qui s'est élancé avant la passe vers le centre de la défense. L'arrière droit part un peu plus tard.",
      courses: { ArG: { vers: [-2.8, 10.2], via: [-6.2, 11.6] }, DC: [0.4, 11.4], ArD: [6.6, 11.8] },
      passe: ['DC', 'ArG', 0.45],
    },
    {
      texte: "Pas de tir ni de passe au pivot ou à un ailier: l'arrière gauche continue vers le centre. L'arrière droit, lancé lui aussi vers le centre, croise derrière lui et reçoit, assez loin de la défense. Le demi-centre part prendre la place de l'arrière gauche.",
      courses: {
        ArG: [0.4, 9.4],
        ArD: { vers: [-1.0, 9.8], via: [3.4, 11.0] },
        DC: { vers: [-5.2, 10.4], via: [-2.0, 11.8] },
      },
      passe: ['ArG', 'ArD', 0.6],
      def: { D3: [1.4, 7.2] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* "Stevo": surcharge d'un côté à l'engagement                       */
  /* ------------------------------------------------------------------ */
  const STEVO_BASE = [
    {
      texte: "L'ailier droit s'est placé à gauche, entre l'ailier gauche et l'arrière gauche. Sur l'engagement, le ballon va à l'arrière droit, qui n'a plus d'ailier à côté de lui: il attaque l'intervalle entre le 2 et le 3 droits.",
      courses: { ArD: [3.0, 8.4] },
      def: { D2: [4.0, 6.4], D3: [2.4, 7.2] },
    },
    {
      texte: "Il passe au demi-centre, qui percute lui aussi.",
      courses: { DC: [-0.4, 9.0] },
      passe: ['ArD', 'DC', 0.2],
      def: { G3: [-1.4, 7.6], D3: [1.6, 7.0] },
    },
    {
      texte: "Le demi-centre passe à l'arrière gauche. À gauche, l'arrière et les deux ailiers sont à trois contre deux, face au 2 et au 1 gauches.",
      courses: { ArG: [-4.8, 8.6], AiD: [-7.2, 6.0] },
      passe: ['DC', 'ArG', 0.3],
      def: { G2: [-4.8, 6.4] },
    },
    {
      texte: "L'arrière gauche fixe le 2 et donne au second ailier, qui attaque entre le 1 et le 2.",
      courses: { ArG: [-4.4, 7.8], AiD: [-6.6, 5.4] },
      passe: ['ArG', 'AiD', 0.4],
      def: { G2: [-4.6, 6.6], G1: [-7.6, 2.6] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* "La cabra" (forum balonmano.mforos.com)                            */
  /* ------------------------------------------------------------------ */
  const CABRA_BASE = [
    {
      texte: "Engagement rapide: le demi-centre lance l'attaque vers la gauche et donne à l'arrière gauche. L'ailier gauche court derrière ses partenaires, vers l'autre côté.",
      courses: { ArG: [-4.2, 9.8], DC: [0, 11.0], AiG: { vers: [1.6, 12.2], via: [-3.4, 12.6] } },
      passe: ['DC', 'ArG', 0.2],
    },
    {
      texte: "L'arrière gauche pénètre entre le 2 et le 3 gauches; la défense se resserre sur lui. Il redonne au demi-centre.",
      courses: { ArG: [-3.6, 8.2], DC: [0.2, 10.0], AiG: { vers: [6.4, 11.4], via: [4.2, 12.4] } },
      passe: ['ArG', 'DC', 0.6],
      def: { G2: [-4.4, 6.4], G3: [-2.6, 7.2] },
    },
    {
      texte: "Le demi-centre pénètre à son tour: le 3 droit sort. Il donne à l'arrière droit.",
      courses: { DC: [0.6, 8.6], ArD: [4.4, 9.6], AiG: [7.6, 8.6] },
      passe: ['DC', 'ArD', 0.6],
      def: { D3: [1.2, 7.4] },
    },
    {
      texte: "L'arrière droit pénètre: le 2 droit sort. Il donne à l'ailier gauche, arrivé de l'autre côté. Avec l'ailier droit, il est à deux contre un face au 1 droit.",
      courses: { ArD: [3.8, 8.0], AiG: [7.0, 7.0] },
      passe: ['ArD', 'AiG', 0.5],
      def: { D2: [4.4, 6.8], D1: [7.6, 2.6] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Remise en jeu rapide: l'ailier contourne le pivot (Most)            */
  /* ------------------------------------------------------------------ */
  const MOST_BASE = [
    {
      texte: "Le pivot fait l'engagement au centre. Au lieu du demi-centre, il sert l'ailier gauche, qui le contourne.",
      courses: { AiG: { vers: [2.0, 11.4], via: [0.2, 11.2] } },
      passe: ['Piv', 'AiG', 0.5],
    },
    {
      texte: "L'ailier continue en dribble vers le 2 droit, le défenseur 2 éloigné. Le pivot redescend aux 6 m, du côté gauche.",
      courses: { AiG: [4.2, 8.8], Piv: { vers: [-3.4, 6.5], via: [0.2, 9.2] } },
      def: { D2: [4.6, 6.4] },
    },
    {
      texte: "Juste devant le 2, croisé avec l'arrière droit, qui passe derrière l'ailier vers le centre et reçoit.",
      courses: { AiG: [4.8, 7.6], ArD: { vers: [2.2, 9.2], via: [4.6, 10.4] } },
      passe: ['AiG', 'ArD', 0.55],
      def: { D2: [5.0, 6.6] },
    },
    {
      texte: "L'ailier se place contre le 2 droit pour l'écranter. L'arrière droit attaque vers les centraux.",
      courses: { AiG: { vers: [4.2, 7.2], ecran: true }, ArD: [1.4, 8.4] },
      def: { D2: [4.8, 6.4], D3: [1.4, 7.4], G3: [-1.4, 7.0] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Písek: la pivot file sous la défenseuse sortie                      */
  /* ------------------------------------------------------------------ */
  const PISEK_DEBUT = {
    texte: "Deuxième vague: le demi-centre donne à l'arrière gauche. La pivot part du centre et se décale vite du côté de la passe.",
    courses: { ArG: [-5.0, 9.8], Piv: [-1.0, 8.2] },
    passe: ['DC', 'ArG', 0.15],
  };
  const PISEK_SOUS = {
    courses: { ArG: [-3.4, 8.4], Piv: { vers: [-2.2, 6.3], via: [-0.6, 6.6] } },
    def: { G2: [-4.2, 7.0], G3: [-2.6, 7.6] },
  };
  const PISEK_FIN = [
    {
      texte: "L'arrière gauche lui donne.",
      passe: ['ArG', 'Piv', 0.2],
    },
    { texte: 'La pivot tire.', tir: { par: 'Piv', t: 0.3 } },
  ];

  /* ------------------------------------------------------------------ */
  /* Yougo (Approches du Handball: Passemard, Quintin, Kovacs, Delattre) */
  /* ------------------------------------------------------------------ */
  const YOUGO_T2 = [
    {
      texte: "Ailiers écartés, arrières face à l'intervalle 1-2, pivot entre les deux 3. Le demi-centre passe à l'arrière gauche, qui menace l'intervalle entre le 1 et le 2.",
      courses: { ArG: [-6.0, 8.2] },
      passe: ['DC', 'ArG', 0.1],
      def: { G2: [-5.6, 6.2] },
    },
    {
      texte: "L'arrière gauche fixe le 2 face à lui. Pendant ce temps, croisé sans ballon: l'arrière droit passe derrière le demi-centre, qui file vers l'intervalle 1-2 droit. Le pivot, face au ballon, tient sa place entre les deux 3.",
      courses: {
        ArG: [-5.8, 7.8],
        DC: { vers: [5.8, 9.0], via: [3.0, 9.0] },
        ArD: { vers: [0.8, 10.6], via: [3.6, 11.4] },
      },
      def: { G2: [-5.6, 6.6] },
    },
    {
      texte: "L'arrière droit arrive au centre et attaque entre les deux 3. L'arrière gauche lui donne.",
      courses: { ArD: [0.2, 8.6] },
      passe: ['ArG', 'ArD', 0.3],
    },
  ];
  const YOUGO_MONTEE = {
    texte: "Le 3 droit monte sur l'arrière droit. Le pivot glisse dans son dos, orienté face au ballon.",
    courses: { Piv: [1.9, 6.3] },
    def: { D3: [0.9, 7.6] },
  };
  const YOUGO_STD = { ArG: [-5.5, 9.5], ArD: [5.5, 9.5], AiG: [-9.0, 1.2], AiD: [9.0, 1.2] };

  /* ------------------------------------------------------------------ */
  /* Azna (É. Quintin)                                                    */
  /* ------------------------------------------------------------------ */
  const AZNA_DUEL = {
    texte: "L'arrière gauche s'engage dans un vrai duel vers le but, entre le 2 et le 3 gauches.",
    courses: { ArG: [-3.4, 8.2] },
    def: { G2: [-4.2, 6.4], G3: [-2.4, 7.2] },
  };
  const AZNA_DEBUT = [
    AZNA_DUEL,
    {
      texte: "Le demi-centre croise derrière lui vers l'extérieur et reçoit. L'arrière passe avec le bras du côté du croisé.",
      courses: { DC: { vers: [-5.4, 8.6], via: [-2.4, 10.2] }, ArG: [-2.8, 7.9] },
      passe: ['ArG', 'DC', 0.55],
      def: { G3: [-2.0, 7.1] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Croisé écart (É. Quintin) / croisé-écarté (A. Parisy, S. Nouet)      */
  /* ------------------------------------------------------------------ */
  const ECARTE_BASE = [
    {
      texte: "Le pivot est du côté droit. Temps fort du demi-centre: il \"porte\" un peu le ballon vers la gauche pour désaxer le 3 haut (l'avancé).",
      courses: { DC: [-1.6, 10.0] },
      def: { D3: [-1.0, 9.2] },
    },
    {
      texte: "Faux croisé: l'arrière gauche croise derrière lui et reçoit, mais ne garde pas le ballon.",
      courses: { ArG: { vers: [-0.6, 10.8], via: [-3.8, 11.4] }, DC: [-2.2, 9.6] },
      passe: ['DC', 'ArG', 0.55],
      def: { G2: [-4.0, 6.4] },
    },
    {
      texte: "Il lâche vite le ballon à l'arrière droit: le 3 haut et le 2 gauche restent fixés de l'autre côté.",
      courses: { ArD: [4.4, 9.2] },
      passe: ['ArG', 'ArD', 0.2],
    },
    {
      texte: "L'arrière droit attaque autour du 3 bas, isolé, dans l'intervalle entre le 3 et le 2 droits.",
      courses: { ArD: [1.4, 8.0] },
      def: { G3: [0, 7.2], D2: [3.8, 6.4] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Croisé DC/arrière à l'opposé du pivot ("tiroirs", P. Passemard)    */
  /* ------------------------------------------------------------------ */
  const TIROIRS_BASE = [
    {
      texte: "Le pivot est entre le 2 et le 3 gauches, ailiers écartés. Le demi-centre s'engage dans un duel fort sur le 3 droit, pour tirer et déborder côté droit de la défense.",
      courses: { DC: [2.0, 8.6] },
      def: { D3: [1.9, 7.5] },
    },
    {
      texte: "L'espace se ferme: croisé. L'arrière droit passe derrière le demi-centre et arrive dans la profondeur en attaquant droit, pas en travers. Le 3 droit doit choisir.",
      courses: { ArD: { vers: [1.2, 8.4], via: [2.8, 10.6] }, DC: [3.0, 8.0] },
      passe: ['DC', 'ArD', 0.55],
      def: { D3: [1.6, 7.3] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Petit ciseau / grand ciseau (R. Bertsch)                             */
  /* ------------------------------------------------------------------ */
  const CISEAU_BASE = [
    {
      texte: "Fin de montée de balle, le ballon est à droite: l'arrière droit donne au demi-centre.",
      courses: { DC: [0, 11.0], ArD: [5.2, 10.4] },
      passe: ['ArD', 'DC', 0.15],
    },
    {
      texte: "Croisé du côté opposé au ballon: le demi-centre attaque vers la gauche, l'arrière gauche croise derrière lui et reçoit.",
      courses: { DC: [-2.4, 9.4], ArG: { vers: [-0.4, 10.0], via: [-3.6, 11.6] } },
      passe: ['DC', 'ArG', 0.6],
      def: { G3: [-2.2, 7.4] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Faux croisé pour aspirer l'avancé (France juniors, D. Fleurance)     */
  /* ------------------------------------------------------------------ */
  const ASPIRE_DEBUT = [
    {
      texte: "Le pivot est dans l'intervalle 1-2 droit et écarte la défense. Le demi-centre vient croiser avec l'arrière droit sans y mettre beaucoup d'engagement: il veut amener l'avancé avec lui.",
      courses: { DC: [2.6, 9.6] },
      def: { D3: [2.0, 8.8] },
    },
    {
      texte: "L'arrière droit croise derrière lui vers le centre et reçoit. L'avancé a suivi le demi-centre.",
      courses: { ArD: { vers: [0.8, 10.2], via: [4.4, 10.8] }, DC: [3.4, 9.2] },
      passe: ['DC', 'ArD', 0.55],
      def: { D3: [2.4, 8.6] },
    },
  ];
  const ASPIRE_DUEL = [
    ...ASPIRE_DEBUT,
    {
      texte: "L'arrière droit donne à l'arrière gauche, qui arrive lancé et négocie son duel face au 3 bas, isolé sur une grande surface. Le demi-centre enchaîne une rentrée vers l'espace 1-2 gauche.",
      courses: { ArG: [-1.4, 8.6], DC: { vers: [-3.6, 6.8], via: [0.6, 8.0] } },
      passe: ['ArD', 'ArG', 0.3],
      def: { G3: [-0.8, 7.4] },
    },
  ];

  /* ------------------------------------------------------------------ */
  /* Double croisé extérieur (Slovénie juniors, D. Fleurance)             */
  /* ------------------------------------------------------------------ */
  const DCE_BASE = [
    {
      texte: "Après écartement, l'arrière droit s'engage vers le centre. Le 3 droit sort sur lui.",
      courses: { ArD: [2.4, 8.8] },
      def: { D3: [2.0, 7.6] },
    },
    {
      texte: "Premier croisé: le demi-centre passe derrière lui, vers l'extérieur, et reçoit.",
      courses: { DC: { vers: [4.6, 8.8], via: [1.8, 10.4] }, ArD: [1.8, 8.4] },
      passe: ['ArD', 'DC', 0.55],
      def: { D2: [4.6, 6.0] },
    },
    {
      texte: "Second croisé: le demi-centre continue vers l'extérieur; l'ailier droit remonte, croise derrière lui vers l'intérieur et reçoit. La défense est attirée à droite.",
      courses: { DC: [6.4, 7.6], AiD: { vers: [3.8, 9.4], via: [8.4, 9.6] } },
      passe: ['DC', 'AiD', 0.6],
      def: { D2: [5.4, 6.4], D1: [7.6, 3.2], D3: [2.2, 7.4], G3: [-0.6, 7.0] },
    },
  ];
  const DCE_STD = { ArG: [-5.5, 9.5], ArD: [5.5, 9.5], AiG: [-9.0, 1.2], AiD: [9.0, 1.2], Piv: [0, 6.4] };
  const HONGRIE_PERMUT = [
    {
      texte: "Le demi-centre donne à l'arrière droit, puis permute avec l'arrière gauche: ils échangent leurs postes sans ballon.",
      courses: {
        DC: { vers: [-5.2, 9.4], via: [-2.6, 9.2] },
        ArG: { vers: [-0.6, 10.2], via: [-3.4, 11.2] },
      },
      passe: ['DC', 'ArD', 0.1],
    },
    {
      texte: "L'arrière droit donne à l'arrière gauche, arrivé au centre, qui va vers le but.",
      courses: { ArG: [-0.2, 8.8] },
      passe: ['ArD', 'ArG', 0.3],
      def: { G3: [-1.2, 7.4], D3: [1.0, 7.4] },
    },
    {
      texte: "Il croise avec l'arrière droit: il poursuit vers la droite, l'arrière droit passe derrière lui et reçoit.",
      courses: { ArG: [1.4, 8.4], ArD: { vers: [-0.6, 9.4], via: [2.8, 10.4] } },
      passe: ['ArG', 'ArD', 0.55],
      def: { D3: [1.6, 7.4] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'croise-bornholm',
      nom: 'Croisé "Bornholm"',
      alias: 'Bornholmerkryds (DA), Bornholm cross (EN)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Croisé demi-centre / arrière gauche; pendant que l'arrière menace de tirer, l'ailier rentre et le demi-centre file à l'aile pour recevoir le renversement.",
      description: [
        "Combinaison du site danois de Dragør HK (Werner Fog-Hansen), nommée d'après l'île de Bornholm. L'arrière droit sert le demi-centre, qui se lance vers la gauche et croise avec l'arrière gauche.",
        "L'arrière gauche saute et menace de tirer. Pendant ce temps, l'ailier gauche fait une rentrée et le demi-centre prend sa place à l'aile. L'arrière gauche tire (variante 1) ou renverse sur le demi-centre, qui tire de l'aile (variante 2).",
        "Dans la fiche f449a (variante 3), l'ailier ne rentre pas: il bloque le 2 gauche par l'extérieur; le demi-centre, servi à l'aile, lui remet le ballon et l'ailier tire.",
        "La fiche ne précise pas la défense; le schéma la figure en 0-6. Les déplacements de la défense sont une proposition.",
      ],
      objectif: "Vider l'aile par la rentrée de l'ailier pour que le demi-centre y reçoive un renversement après le croisé.",
      pointsCles: [
        "Le demi-centre fixe vraiment avant de donner au croisement.",
        "L'arrière gauche saute et menace de tirer pour attirer les centraux.",
        "La rentrée de l'ailier entraîne son défenseur et libère l'aile.",
        "Le demi-centre arrive à l'aile au moment où l'arrière cherche une passe.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Croisé "Bornholm" (Dragør HK, trad. française)',
          url: 'http://www.dragoerhb.dk/fransk/f449.html',
          note: "\"ARG saute et menace de tirer, l'ailier gauche ALG effectue une rentrée et DC prend sa place à l'aile.\" Variante f449a: l'ailier bloque le 2 par l'extérieur, le DC lui remet le ballon.",
        },
        {
          titre: 'Bornholmerkryds (Dragør HK, version danoise)',
          url: 'http://www.dragoerhb.dk/x449.html',
          note: 'Rubrique "Centerkryds": "Bornholmerkryds" / "Bornholm cross".',
        },
      ],
      ballon: 'ArD',
      variantes: [
        {
          nom: "1 - Tir de l'arrière gauche",
          etapes: [
            ...BORN_BASE,
            {
              texte: "Les centraux ne sortent pas assez: l'arrière gauche tire en suspension au centre.",
              courses: { ArG: [-0.3, 7.7] },
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
        {
          nom: "2 - Renversement sur le demi-centre à l'aile",
          etapes: [
            ...BORN_BASE,
            {
              texte: "Les deux 3 se referment sur l'arrière gauche. Il renverse sur le demi-centre, placé à l'aile.",
              passe: ['ArG', 'DC', 0.3],
              def: { G3: [-1.2, 7.3], D3: [0.5, 7.3], G1: [-7.0, 3.6] },
            },
            { texte: "Le demi-centre tire de l'aile.", tir: { par: 'DC', t: 0.2 } },
          ],
        },
        {
          nom: "3 - L'ailier bloque le 2 (f449a)",
          etapes: [
            ...BORN_DEBUT,
            {
              texte: "L'arrière gauche menace de tirer. L'ailier gauche ne rentre pas: il bloque le 2 gauche par l'extérieur. Le demi-centre file vers l'aile.",
              courses: {
                ArG: [-0.4, 8.0],
                AiG: { vers: [-6.1, 4.7], via: [-8.0, 3.4], ecran: true },
                DC: { vers: [-8.6, 3.2], via: [-6.6, 7.4] },
              },
              def: { G3: [-1.3, 7.0], D3: [0.9, 7.0], G2: [-5.0, 5.4] },
            },
            {
              texte: "L'arrière gauche donne au demi-centre, à l'aile. Le 1 gauche sort sur lui.",
              passe: ['ArG', 'DC', 0.3],
              def: { G1: [-8.0, 4.0] },
            },
            {
              texte: "Le demi-centre remet aussitôt à l'ailier, qui se dégage de son bloc vers le but.",
              courses: { AiG: [-6.3, 4.3] },
              passe: ['DC', 'AiG', 0.25],
            },
            { texte: "L'ailier gauche tire.", tir: { par: 'AiG', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'kreuzen-sperren',
      nom: 'Croisé et écran du pivot',
      alias: 'Kreuzen - Sperren 1 / 2 (DE)',
      categorie: 'Écrans et blocs',
      defense: '0-6',
      resume: "Le demi-centre croise avec l'arrière gauche; le pivot pose un écran au moment du croisé et se libère pour recevoir.",
      description: [
        "Deux fiches du site allemand handballhaus.de (archive 2010). Le demi-centre croise avec l'arrière gauche; au même moment, le pivot pose un écran.",
        "Variante 1 (\"Kreuzen - Sperren 1\"): le pivot est entre le 2 et le 3 gauches. Le demi-centre s'arrête devant le 2 et lui fait un écran de tir, le pivot lui pose un écran dans le dos. L'arrière gauche saute pour tirer et attire le 3: le pivot reçoit dans l'espace laissé derrière lui.",
        "Variantes 2 et 3 (\"Kreuzen - Sperren 2\"): le pivot bloque le 3 gauche et sépare les deux centraux. L'arrière gauche sert le pivot bien placé; sinon, il continue vers la droite et joue avec l'arrière droit (variante 3, une phrase dans la source).",
        'Le site cite aussi des formes contre un demi avancé, contre une défense offensive et contre une individuelle, sans les décrire. Le texte allemand nomme les défenseurs vus de la défense (le "demi droit" de la source est ici le 2 gauche).',
      ],
      objectif: "Libérer le pivot ou l'arrière qui croise grâce à un écran posé pendant le croisé.",
      pointsCles: [
        "L'écran du pivot se pose au moment du croisé, pas avant.",
        "L'arrière gauche saute réellement pour tirer: c'est ce qui attire le 3.",
        "Le pivot se libère dans le dos du défenseur qui sort.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Kreuzen - Sperren (handballhaus.de, archive web)',
          url: 'http://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen/kreuzen-sperren.html',
          note: 'RM croise avec RL et fait un écran de tir sur le demi; le pivot pose au moment du croisé une "Rückensperre"; RL saute et attire le central: passe au pivot derrière lui.',
        },
        {
          titre: 'Kreuzen - Sperren 2 (handballhaus.de, archive web)',
          url: 'http://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/kreuzen/kreuzen-sperren-2.html',
          note: "Le pivot bloque le central et sépare le bloc central; RL sert le pivot, sinon percussion vers la droite.",
        },
      ],
      ballon: 'DC',
      depart: { Piv: [-3.4, 6.5] },
      variantes: [
        {
          nom: '1 - Écran dans le dos du 2, passe au pivot',
          etapes: [
            {
              texte: "Le pivot est entre le 2 et le 3 gauches. Le demi-centre attaque en diagonale vers le 2 gauche.",
              courses: { DC: [-3.0, 8.8] },
              def: { G2: [-4.4, 6.6], G3: [-2.2, 7.0] },
            },
            {
              texte: "L'arrière gauche croise derrière lui et reçoit. Le demi-centre s'arrête devant le 2 et lui fait écran; le pivot pose un écran dans son dos.",
              courses: {
                ArG: { vers: [-1.6, 9.4], via: [-4.2, 10.8] },
                DC: { vers: [-3.8, 8.0], ecran: true },
                Piv: { vers: [-4.6, 5.9], ecran: true },
              },
              passe: ['DC', 'ArG', 0.55],
              def: { G2: [-4.2, 6.9] },
            },
            {
              texte: "L'arrière gauche saute pour tirer: le 3 gauche sort sur lui. Le pivot se libère dans le dos du 3 et reçoit.",
              courses: { ArG: [-1.4, 8.8], Piv: { vers: [-2.6, 6.4], via: [-3.6, 6.0] } },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-1.6, 7.8], D3: [1.2, 7.0] },
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
        {
          nom: '2 - Le pivot sépare les centraux',
          depart: { Piv: [0, 6.4] },
          etapes: [
            ...SPERREN2_BASE,
            {
              texte: "L'arrière gauche attaque l'espace ouvert entre les deux 3. Le 3 droit sort sur lui; le pivot se retourne vers le ballon et reçoit.",
              courses: { ArG: [0.2, 8.4], Piv: [-0.6, 6.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { D3: [0.9, 7.6] },
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
        {
          nom: '3 - Pivot fermé: percussion vers la droite',
          depart: { Piv: [0, 6.4] },
          etapes: [
            ...SPERREN2_BASE,
            {
              texte: "Le pivot n'est pas libre. L'arrière gauche continue vers la droite et donne à l'arrière droit, lancé.",
              courses: { ArG: [0.6, 8.6], ArD: [3.0, 8.4] },
              passe: ['ArG', 'ArD', 0.5],
              def: { D3: [1.2, 7.6], D2: [4.2, 6.4] },
            },
            {
              texte: "L'arrière droit perce entre le 3 et le 2 droits et tire.",
              courses: { ArD: [3.0, 7.4] },
              tir: { par: 'ArD', t: 0.45 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'schweden',
      nom: 'Suède (engagement rapide)',
      alias: 'Schweden, Schnelle Mitte Schweden, "alter Schwede" (DE)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense en replacement',
      resume: "Sur l'engagement, l'ailier gauche se place en second arrière droit; après un croisé à gauche, le jeu revient à droite où ce joueur de plus perce entre le 2 et le 1.",
      description: [
        "Engagement rapide attribué à Bengt Johansson, entraîneur de la Suède, présenté par le site allemand handballhaus.de (jeu de mots \"alter Schwede\"). Après un but, l'ailier gauche prend \"discrètement\" la place d'un second arrière droit.",
        "Le pivot engage vers le demi-centre; une-deux entre le demi-centre et l'arrière droit, puis croisé demi-centre / arrière gauche. L'arrière gauche prépare un tir en suspension mais joue en parallèle vers l'arrière droit, qui attaque exactement le 2 droit. Le second arrière droit perce en surnombre entre le 2 et le 1 droits (variante 1). Si le 1 droit vient aider, il donne à l'ailier droit (variante 2).",
        "Le schéma commence juste après l'engagement, au niveau des 12 m; la défense y est figurée déjà en place.",
      ],
      objectif: "Créer un surnombre à droite grâce à l'ailier gauche replacé en arrière, pendant que la défense se replace.",
      pointsCles: [
        "L'ailier gauche se place sans attirer l'attention, pendant la célébration ou le replacement.",
        "Le croisé à gauche doit attirer la défense de ce côté.",
        "L'arrière droit attaque exactement le 2 droit pour le fixer.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Schweden (handballhaus.de, rubrique Schnelle Mitte, archive 2010)',
          url: 'http://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/schnelle-mitte/schweden.html',
          note: '"Etwas ganz raffiniertes von Bengt Johanson - alter Schwede. Nach Torerfolg nimmt LA "unauffällig" die 2te RR Position ein."',
        },
      ],
      ballon: 'Piv',
      depart: {
        Piv: [0.6, 12.2], DC: [-0.8, 11.0], ArG: [-5.0, 10.4], ArD: [3.4, 10.8], AiG: [6.8, 10.2], AiD: [9.2, 1.4],
      },
      variantes: [
        {
          nom: '1 - Le second arrière droit perce',
          etapes: [
            ...SUEDE_BASE,
            { texte: "L'ailier gauche, en second arrière droit, tire.", tir: { par: 'AiG', t: 0.2 } },
          ],
        },
        {
          nom: "2 - Le 1 aide: passe à l'ailier droit",
          etapes: [
            ...SUEDE_BASE,
            {
              texte: "Le 1 droit vient aider. Le second arrière droit donne de la main droite à l'ailier droit.",
              courses: { AiD: [9.0, 1.6] },
              passe: ['AiG', 'AiD', 0.3],
              def: { D1: [7.0, 5.2] },
            },
            { texte: "L'ailier droit tire.", tir: { par: 'AiD', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'schnelle-mitte-croise',
      nom: 'Engagement rapide avec croisé ("Blacky")',
      alias: 'Schnelle Mitte (DE), "Blacky"',
      categorie: 'Jets francs et remises en jeu',
      defense: '5-1 ou 0-6 en replacement',
      resume: "Après l'engagement, une-deux et croisé entre arrière droit et demi-centre; le demi-centre court en arc jusqu'au poste d'arrière gauche et saute dans l'intervalle bloqué par le pivot.",
      description: [
        "Trois engagements rapides proposés par des entraîneurs amateurs sur le forum allemand handballecke.de. Les autres participants jugent les descriptions confuses: les schémas suivent le principe et sont à prendre comme des propositions.",
        "\"Blacky\" (variante 1, côté gauche de préférence avec un droitier): l'arrière droit fait une une-deux avec le demi-centre à mi-chemin vers la gauche; le demi-centre vient croiser derrière lui; le pivot, côté gauche, bloque le demi-défenseur; le demi-centre court en arc jusqu'au poste d'arrière gauche, reçoit lancé et saute dans l'intervalle. Sinon, il reste l'ailier ou le pivot (3 contre 1). Un autre participant y voit un \"croisé long\".",
        "Variantes 2 et 3: un arrière va chercher l'autre; l'arrière droit percute entre le 3 et le 2 gauches, puis tire ou passe à l'ailier si la défense resserre.",
        "Variante 4: le pivot, qui a fait l'engagement, se place vite aux 9 m tout à l'extérieur, puis contourne les arrières par derrière; après le renversement, l'arrière de son côté attaque entre le demi et le central et attire le demi: 2 contre 1 du pivot et de l'ailier contre l'ailier défensif.",
      ],
      objectif: "Surprendre la défense qui se replace par un croisé et un écran dès l'engagement.",
      pointsCles: [
        "Jouer vite, avant que la défense soit organisée.",
        "Le demi-centre court en arc, assez loin derrière l'échange, pour arriver lancé.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Spielzüge aus schneller Mitte (forum handballecke.de)',
          url: 'https://www.handballecke.de/forum/thread/24410-spielz%C3%BCge-aus-schnellermitte/',
          note: "Posts #1 (\"Blacky\": une-deux RR-RM, croisé, écran du pivot, RM en arc jusqu'en RL), #2 (un arrière va chercher l'autre; le pivot contourne RM et un arrière) et #6 (\"langes Kreuzen RL für RR\").",
        },
      ],
      ballon: 'ArD',
      depart: {
        DC: [-0.2, 11.6], ArD: [3.4, 11.4], ArG: [-7.6, 9.6], Piv: [-3.4, 6.5],
      },
      variantes: [
        {
          nom: '1 - "Blacky": le demi-centre en arc',
          etapes: [
            {
              texte: "Après l'engagement, l'arrière droit passe au demi-centre et part vers la gauche.",
              courses: { ArD: [1.0, 10.2], DC: [0.4, 11.4] },
              passe: ['ArD', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre lui rend le ballon à mi-chemin vers la gauche (une-deux).",
              courses: { ArD: [-1.2, 9.8], DC: [0.8, 11.2] },
              passe: ['DC', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit continue vers le 3 gauche, qui sort. Le demi-centre croise derrière lui. Le pivot bloque le 2 gauche par l'intérieur.",
              courses: {
                ArD: [-3.0, 8.8],
                DC: { vers: [-2.6, 10.8], via: [-0.4, 11.6] },
                Piv: { vers: [-4.2, 6.3], ecran: true },
              },
              def: { G3: [-2.6, 7.4], G2: [-5.0, 5.4] },
            },
            {
              texte: "Le demi-centre poursuit sa course en arc jusqu'au poste d'arrière gauche. L'arrière droit lui donne: il reçoit lancé.",
              courses: { DC: { vers: [-5.2, 8.6], via: [-4.8, 10.8] }, ArD: [-3.0, 8.6] },
              passe: ['ArD', 'DC', 0.6],
            },
            {
              texte: "Le demi-centre saute dans l'intervalle entre le 2, bloqué, et le 3. L'arrière droit dégage vers le centre.",
              courses: { DC: [-3.6, 7.9], ArD: [-1.4, 9.4] },
              tir: { par: 'DC', t: 0.6 },
              def: { G3: [-2.4, 7.4] },
            },
          ],
        },
        {
          nom: "2 - Un arrière va chercher l'autre: tir",
          ballon: 'ArG',
          depart: { ArG: [-5.0, 10.6], ArD: [4.6, 10.6], DC: [0, 11.6], Piv: [0, 6.4] },
          etapes: [
            ...RL_HOLT_RR,
            { texte: "L'arrière droit tire.", tir: { par: 'ArD', t: 0.2 } },
          ],
        },
        {
          nom: "3 - Un arrière va chercher l'autre: ailier",
          ballon: 'ArG',
          depart: { ArG: [-5.0, 10.6], ArD: [4.6, 10.6], DC: [0, 11.6], Piv: [0, 6.4] },
          etapes: [
            ...RL_HOLT_RR,
            {
              texte: "Le 2 et le 1 gauches resserrent: l'ailier gauche est libre. L'arrière droit lui donne.",
              courses: { AiG: [-8.6, 2.4] },
              passe: ['ArD', 'AiG', 0.3],
              def: { G2: [-3.8, 6.8], G1: [-6.2, 4.4] },
            },
            { texte: "L'ailier gauche tire.", tir: { par: 'AiG', t: 0.2 } },
          ],
        },
        {
          nom: '4 - Le pivot contourne les arrières',
          ballon: 'DC',
          depart: { Piv: [-7.4, 8.6], ArG: [-4.8, 10.0], DC: [0, 10.8], ArD: [5.0, 10.0] },
          etapes: [
            {
              texte: "Le pivot, qui a fait l'engagement, s'est placé aux 9 m tout à l'extérieur gauche. Le demi-centre donne à l'arrière gauche; le pivot part derrière lui.",
              courses: { Piv: { vers: [-1.6, 12.0], via: [-6.0, 12.4] } },
              passe: ['DC', 'ArG', 0.2],
            },
            {
              texte: "Renversement: l'arrière gauche rend au demi-centre. Le pivot contourne le demi-centre par derrière.",
              courses: { Piv: { vers: [4.4, 11.6], via: [1.4, 12.4] } },
              passe: ['ArG', 'DC', 0.3],
            },
            {
              texte: "Le demi-centre donne à l'arrière droit. Le pivot arrive aux 9 m, entre l'arrière droit et l'ailier droit.",
              courses: { Piv: [7.2, 8.6] },
              passe: ['DC', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit attaque au centre, entre le 2 et le 3 droits, et attire le 2.",
              courses: { ArD: [3.0, 8.2] },
              def: { D2: [3.8, 6.8], D3: [2.0, 7.2] },
            },
            {
              texte: "Il donne au pivot, qui attaque le 1 droit: 2 contre 1 avec l'ailier droit.",
              courses: { Piv: [6.8, 6.4] },
              passe: ['ArD', 'Piv', 0.3],
              def: { D1: [7.2, 4.4] },
            },
            {
              texte: "Le 1 droit sort sur le pivot, qui donne à l'ailier droit.",
              courses: { AiD: [9.0, 1.6] },
              passe: ['Piv', 'AiD', 0.3],
              def: { D1: [7.0, 5.4] },
            },
            { texte: "L'ailier droit tire.", tir: { par: 'AiD', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'langes-kreuzen-engagement',
      nom: 'Croisé long sur engagement rapide',
      alias: 'Langes Kreuzen (Schnelle Mitte), Langes Kreuzen gegen Außen, Herzogenaurach D09, Saarlouis H09, Schnelle Mitte 1 (DE)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense en replacement',
      resume: "Dès l'engagement, un arrière traverse avec le ballon jusqu'à l'autre arrière (croisé long); le jeu revient ensuite là où un joueur s'est ajouté.",
      description: [
        'Famille de fiches du site allemand handballhaus.de (archive 2010), rubrique "Schnelle Mitte" (engagement rapide). Chaque fiche tient en une ou deux phrases: les schémas en suivent le principe.',
        "Variante 1 (\"Langes Kreuzen\"): le pivot engage vers l'avant et prend le poste d'arrière droit; l'arrière droit fait un croisé long avec l'arrière gauche; celui-ci fixe aussi le 2 droit et sert le pivot, qui attaque entre le 2 et le 1 droits.",
        "Variante 2 (\"gegen Außen\"): l'ailier droit adverse vient de marquer et n'est pas encore replacé au poste de 1 gauche. Croisé long de l'arrière droit, l'arrière gauche croise en sens inverse pour donner une fausse piste, et l'arrière droit sert l'ailier gauche lancé contre ce défenseur en retard.",
        "Variante 3 (\"Herzogenaurach D09\"): le demi-centre fait un croisé long avec l'ailier droit, qui met l'arrière gauche en position de tir. Variante 4 (\"Saarlouis H09\", \"Schnelle Mitte 1\"): le joueur qui engage double le poste d'arrière droit; après un croisé arrière droit / arrière gauche, on élargit à droite et le second arrière droit tire.",
        "Le schéma commence juste après l'engagement, au niveau des 12 m. Voir aussi \"Croisé long demi-centre / ailier\" pour le croisé long en attaque placée.",
      ],
      objectif: "Déplacer la défense qui se replace par une longue course avec ballon, puis jouer là où elle est en retard ou en infériorité.",
      pointsCles: [
        "Engager très vite, avant que la défense soit organisée.",
        "Le croisé long doit être dangereux: le porteur menace vraiment.",
        "Repérer le défenseur en retard (variante 2) ou le côté doublé (variantes 1 et 4).",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Langes Kreuzen (handballhaus.de, Schnelle Mitte, archive web)',
          url: 'http://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/schnelle-mitte/langes-kreuzen.html',
          note: "Le pivot lance par une passe vers l'avant; RR croise long avec RL; RL fixe aussi HL et passe au pivot en RR, qui attaque entre HL et AL.",
        },
        {
          titre: 'Langes Kreuzen gegen Außen (handballhaus.de, archive web)',
          url: 'http://web.archive.org/web/2010/http://www.handballhaus.de/handball/angriffstaktik/schnelle-mitte/langes-kreuzen-gegen-aussen.html',
          note: "Après un but de l'ailier droit adverse: croisé long de RR, RL croise en sens inverse, RR sert LA lancé contre AR.",
        },
        {
          titre: 'Herzogenaurach D09 (handballhaus.de, archive web)',
          url: 'https://web.archive.org/web/20100413134805/http://www.handballhaus.de/handball/angriffstaktik/schnelle-mitte/herzogenaurach-d09.html',
          note: "RM fait un croisé long avec RA; RA met RL en position de tir, ou on élargit à droite.",
        },
        {
          titre: 'Saarlouis H09 / Schnelle Mitte 1 (handballhaus.de, archive web)',
          url: 'https://web.archive.org/web/20110106041358/http://www.handballhaus.de/handball/angriffstaktik/schnelle-mitte/saarlouis-h09.html',
          note: "Le joueur qui engage prend le poste RR; RR croise avec RL, puis on élargit à droite grâce au doublement: le 2e RR tire.",
        },
      ],
      ballon: 'Piv',
      depart: {
        Piv: [0.6, 12.2], DC: [-1.8, 12.2], ArG: [-4.8, 10.8], ArD: [3.6, 11.4],
      },
      variantes: [
        {
          nom: '1 - Le pivot en arrière droit',
          etapes: [
            {
              texte: "Le pivot fait l'engagement vers l'avant, pour l'arrière droit qui part vers la gauche. Le pivot file au poste d'arrière droit.",
              courses: { Piv: { vers: [5.2, 10.6], via: [3.6, 12.4] }, ArD: [1.4, 10.2] },
              passe: ['Piv', 'ArD', 0.1],
            },
            {
              texte: "Croisé long: l'arrière droit traverse avec le ballon jusque devant l'arrière gauche, qui croise derrière lui et reçoit.",
              courses: { ArD: [-2.8, 9.2], ArG: { vers: [-0.6, 10.0], via: [-3.8, 11.2] } },
              passe: ['ArD', 'ArG', 0.6],
              def: { G3: [-2.2, 7.4] },
            },
            {
              texte: "L'arrière gauche attaque vers la droite et fixe aussi le 2 droit.",
              courses: { ArG: [3.2, 8.8] },
              def: { D3: [2.2, 7.2], D2: [4.0, 7.4] },
            },
            {
              texte: "Il donne au pivot, au poste d'arrière droit, qui attaque entre le 2 et le 1 droits.",
              courses: { Piv: [6.4, 7.0] },
              passe: ['ArG', 'Piv', 0.3],
              def: { D1: [7.6, 3.6] },
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
        {
          nom: "2 - Contre l'ailier adverse en retard",
          depart: { G1: [-5.6, 12.2], AiG: [-9.0, 3.0] },
          etapes: [
            {
              texte: "L'ailier droit adverse vient de marquer: il n'est pas encore à son poste de 1 gauche. Le pivot engage vite pour l'arrière droit, qui part vers la gauche.",
              courses: { Piv: { vers: [-0.4, 6.5], via: [0.6, 9.4] }, ArD: [1.4, 10.2] },
              passe: ['Piv', 'ArD', 0.1],
              def: { G1: [-6.2, 10.4] },
            },
            {
              texte: "Croisé long de l'arrière droit vers la gauche. L'arrière gauche croise en sens inverse sans recevoir: c'est une fausse piste.",
              courses: { ArD: [-3.0, 9.4], ArG: { vers: [0.2, 10.4], via: [-3.6, 11.4] }, AiG: [-8.8, 4.0] },
              def: { G1: [-6.4, 8.0], G3: [-2.4, 7.4] },
            },
            {
              texte: "L'arrière droit sert l'ailier gauche, lancé contre le 1 gauche encore en retard.",
              courses: { AiG: [-6.6, 4.6] },
              passe: ['ArD', 'AiG', 0.3],
              def: { G1: [-6.6, 6.6], G2: [-4.8, 5.6] },
            },
            { texte: "L'ailier gauche tire.", tir: { par: 'AiG', t: 0.2 } },
          ],
        },
        {
          nom: "3 - Herzogenaurach: croisé long avec l'ailier droit",
          ballon: 'DC',
          depart: { DC: [0, 11.4], Piv: [0, 6.4], ArG: [-5.0, 10.4], ArD: [5.6, 10.6] },
          etapes: [
            {
              texte: "Après l'engagement, le demi-centre attaque en diagonale vers la droite. Le 3 droit sort.",
              courses: { DC: [3.0, 9.0], ArD: [6.6, 10.2] },
              def: { D3: [2.4, 7.4] },
            },
            {
              texte: "Croisé long: l'ailier droit remonte et croise derrière le demi-centre jusqu'au centre, où il reçoit.",
              courses: { AiD: { vers: [0.4, 9.8], via: [7.8, 10.6] }, DC: [3.8, 8.4] },
              passe: ['DC', 'AiD', 0.65],
            },
            {
              texte: "L'ailier droit met l'arrière gauche en position de tir: il lui donne, lancé.",
              courses: { ArG: [-3.4, 8.8] },
              passe: ['AiD', 'ArG', 0.4],
              def: { G2: [-4.4, 6.2], G3: [-2.2, 7.2] },
            },
            { texte: "L'arrière gauche tire.", tir: { par: 'ArG', t: 0.2 } },
          ],
        },
        {
          nom: '4 - Saarlouis: arrière droit doublé',
          etapes: [
            {
              texte: "Le pivot fait l'engagement vers le demi-centre et file au poste d'arrière droit: ce poste est doublé.",
              courses: { Piv: { vers: [6.6, 10.4], via: [3.6, 12.4] }, DC: [-0.4, 11.2] },
              passe: ['Piv', 'DC', 0.1],
            },
            {
              texte: "Le demi-centre sert l'arrière droit, qui part vers la gauche, puis va lui aussi vers la droite.",
              courses: { ArD: [1.6, 10.2], DC: { vers: [3.8, 11.2], via: [1.6, 11.8] } },
              passe: ['DC', 'ArD', 0.2],
            },
            {
              texte: "L'arrière droit croise dangereusement avec l'arrière gauche: il attaque en diagonale vers la gauche, l'arrière gauche passe derrière lui et reçoit.",
              courses: { ArD: [-2.4, 8.8], ArG: { vers: [0.2, 9.6], via: [-3.6, 11.0] } },
              passe: ['ArD', 'ArG', 0.55],
              def: { G3: [-2.2, 7.4] },
            },
            {
              texte: "On élargit à droite: l'arrière gauche donne au demi-centre.",
              courses: { ArG: [0.8, 9.2], DC: [3.8, 9.6] },
              passe: ['ArG', 'DC', 0.35],
              def: { D3: [1.4, 7.6] },
            },
            {
              texte: "Le demi-centre fixe le 2 droit et donne au second arrière droit, le pivot.",
              courses: { DC: [4.0, 8.4], Piv: [6.6, 8.6] },
              passe: ['DC', 'Piv', 0.5],
              def: { D2: [4.6, 7.0] },
            },
            {
              texte: "Le second arrière droit tire entre le 2 et le 1 droits.",
              courses: { Piv: [6.6, 7.6] },
              tir: { par: 'Piv', t: 0.5 },
              def: { D1: [7.6, 2.8] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'dlouhy-kriz',
      nom: 'Croisé long au centre (2e vague)',
      alias: 'Dlouhý kříž (CZ), long cross (EN)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense non placée',
      resume: "En deuxième vague, les deux arrières latéraux, partis des coins, croisent au centre; le demi-centre prend la place laissée libre.",
      description: [
        "Combinaison tchèque relevée par K. Kubišová (mémoire, université Charles de Prague, 2020) dans des équipes de première division. Elle se joue en deuxième vague ou sur un engagement rapide, contre une défense pas encore placée, et aussi en infériorité numérique.",
        "Les arrières latéraux partent des coins de la ligne médiane. Le demi-centre, en mouvement, sert un arrière déjà lancé vers le centre de la défense. Sans tir ni passe au pivot ou à un ailier libre, celui-ci donne à l'autre arrière, lancé avec un léger retard: les deux arrières croisent au centre.",
        "Ensuite le demi-centre prend la place de l'arrière qui a commencé, cet arrière ressort au poste de l'autre, et l'autre arrière se retrouve demi-centre. Fins: tir à mi-distance (variante 1), 1 contre 1, ou passe au demi-centre replacé (variante 2).",
      ],
      objectif: "Profiter d'une défense pas encore organisée par un croisé au centre lancé de loin.",
      pointsCles: [
        "Le premier arrière s'élance avant de recevoir.",
        "Le timing est très important: le croisé ne doit pas avoir lieu trop près de la défense.",
        "Chacun reprend aussitôt un poste pour la suite de l'attaque.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál v mužské a ženské házené (mémoire, univ. Charles, 2020)',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: "\"Dlouhý kříž\" (p. 33, 37, 40, 44): croisé des deux arrières latéraux au centre; \"le timing est très important pour que le croisé n'ait pas lieu trop près de la défense\".",
        },
      ],
      ballon: 'DC',
      depart: { DC: [0, 12.2], ArG: [-8.6, 12.4], ArD: [8.6, 12.4] },
      variantes: [
        {
          nom: '1 - Tir à mi-distance',
          etapes: [
            ...DLOUHY_BASE,
            {
              texte: "L'arrière gauche ressort au poste d'arrière droit. L'arrière droit, au centre, tire à mi-distance.",
              courses: { ArG: [5.2, 9.8], ArD: [-0.6, 9.0] },
              tir: { par: 'ArD', t: 0.6 },
            },
          ],
        },
        {
          nom: '2 - Passe au demi-centre replacé',
          etapes: [
            ...DLOUHY_BASE,
            {
              texte: "L'arrière gauche ressort au poste d'arrière droit. L'arrière droit attaque au centre: les deux 3 sortent. Il donne au demi-centre, replacé arrière gauche.",
              courses: { ArG: [5.2, 9.8], ArD: [-0.8, 8.4], DC: [-4.6, 9.0] },
              passe: ['ArD', 'DC', 0.55],
              def: { G3: [-1.4, 7.6], D3: [0.4, 7.4], G2: [-4.4, 6.0] },
            },
            {
              texte: "Le demi-centre tire.",
              courses: { DC: [-4.4, 8.6] },
              tir: { par: 'DC', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'stevo-surcharge',
      nom: "Ailier qui change de côté à l'engagement",
      alias: 'Combinaison "Stevo" (forum DE, sans nom)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense en replacement',
      resume: "Un ailier se place du côté opposé; l'arrière resté sans ailier attaque, le ballon traverse et le côté surchargé joue à trois contre deux.",
      description: [
        "Combinaison sans nom proposée en 2004 par un entraîneur (pseudonyme \"Stevo\") sur le forum allemand handballecke.de, pour l'engagement après un but encaissé.",
        "Un des ailiers se place de l'autre côté, entre l'autre ailier et l'arrière. À l'engagement, le ballon va à l'arrière qui n'a plus d'ailier à côté de lui. Il attaque l'intervalle entre le 2 et le 3, passe au demi-centre qui percute aussi, et celui-ci passe à l'autre arrière: de ce côté naît un 3 contre 2.",
        "La source s'arrête au 3 contre 2. Les fins montrées (tir du second ailier, ou passe à l'ailier gauche si le 1 ferme) sont deux issues possibles de ce surnombre.",
      ],
      objectif: "Créer un 3 contre 2 d'un côté en y plaçant les deux ailiers.",
      pointsCles: [
        "Le placement de l'ailier se fait pendant le replacement, sans attirer l'attention.",
        "Les percussions de l'arrière droit puis du demi-centre doivent fixer pour que la défense ne glisse pas.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Sammlung von Spielzügen (forum handballecke.de), post #34',
          url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
          note: "Un ailier se place de l'autre côté; à l'engagement, le ballon va à l'arrière sans ailier, qui attaque l'intervalle 2-3 et passe au RM \"mitstoßend\", qui passe à l'autre arrière: 3 contre 2.",
        },
      ],
      ballon: 'ArD',
      depart: { AiD: [-7.6, 6.2], ArG: [-5.0, 9.6], ArD: [4.6, 10.6], DC: [0, 11.2] },
      variantes: [
        {
          nom: '1 - Tir du second ailier',
          etapes: [
            ...STEVO_BASE,
            { texte: "L'ailier droit, entre le 1 et le 2 gauches, tire.", tir: { par: 'AiD', t: 0.2 } },
          ],
        },
        {
          nom: '2 - Le 1 ferme: ailier gauche',
          etapes: [
            ...STEVO_BASE,
            {
              texte: "Le 1 gauche ferme sur lui: il donne à l'ailier gauche.",
              courses: { AiG: [-9.0, 1.6] },
              passe: ['AiD', 'AiG', 0.3],
              def: { G1: [-6.8, 4.4] },
            },
            { texte: "L'ailier gauche tire.", tir: { par: 'AiG', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'la-cabra',
      nom: 'La cabra',
      alias: '"La cabra" (la chèvre, ES)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense en replacement',
      resume: "Sur engagement rapide, l'ailier gauche court derrière ses partenaires vers l'autre aile; une suite de pénétrations amène le ballon jusqu'à lui pour un 2 contre 1.",
      description: [
        "Combinaison d'engagement rapide citée sur un forum espagnol comme une vieille combinaison (\"plus vieille que la Puerta del Sol\") d'un club de Granollers.",
        "Après l'engagement, un ailier court derrière ses partenaires vers le côté opposé. Les partenaires entraînent l'attaque du côté qu'il a quitté, puis enchaînent des pénétrations successives jusqu'à l'ailier déplacé: 2 contre 1 de l'autre côté.",
        "La source tient en quelques lignes: le schéma en suit le principe (le sens et le nombre des pénétrations sont une proposition).",
      ],
      objectif: "Surcharger une aile pendant que la défense se replace et la fixer par des pénétrations successives.",
      pointsCles: [
        "L'ailier court derrière tous ses partenaires, loin de la défense.",
        "Chaque pénétration doit fixer un défenseur avant la passe.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Jugadas tras un saque rápido (forum balonmano.mforos.com, 2007)',
          url: 'https://balonmano.mforos.com/142972/6296996-jugadas-tras-un-saque-rapido/',
          note: "\"La cabra\": l'ailier court derrière ses partenaires vers l'autre côté; pénétrations successives jusqu'à lui, 2 contre 1 dans la zone opposée.",
        },
      ],
      ballon: 'DC',
      depart: { DC: [0, 12.0], AiG: [-6.8, 11.6], ArG: [-4.6, 10.6], ArD: [4.6, 10.6] },
      variantes: [
        {
          nom: "1 - Le 1 reste: l'ailier gauche tire",
          etapes: [
            ...CABRA_BASE,
            {
              texte: "Le 1 droit reste avec l'ailier droit: l'ailier gauche perce et tire.",
              courses: { AiG: [6.6, 5.8] },
              tir: { par: 'AiG', t: 0.6 },
            },
          ],
        },
        {
          nom: '2 - Le 1 sort: ailier droit',
          etapes: [
            ...CABRA_BASE,
            {
              texte: "Le 1 droit sort sur l'ailier gauche, qui donne à l'ailier droit.",
              courses: { AiG: [6.8, 6.2], AiD: [9.0, 1.6] },
              passe: ['AiG', 'AiD', 0.35],
              def: { D1: [7.2, 5.0] },
            },
            { texte: "L'ailier droit tire.", tir: { par: 'AiD', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'remise-rapide-ailier-pivot',
      nom: "Engagement rapide: l'ailier contourne le pivot",
      alias: 'Sans nom (DHK Baník Most, CZ)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense en replacement',
      resume: "Le pivot engage pour l'ailier, qui le contourne, dribble vers le 2 éloigné et croise avec l'arrière; l'ailier écrante ensuite le 2.",
      description: [
        "Engagement rapide relevé par K. Kubišová (mémoire, 2020) chez les joueuses de DHK Baník Most, après un but encaissé.",
        "Le pivot engage au centre. Au lieu du demi-centre, il passe à l'ailier, qui le contourne et continue en dribble vers le défenseur 2 éloigné. Juste devant, croisé avec l'arrière de ce côté, puis l'ailier se place contre le défenseur pour l'écranter. L'arrière attaque vers les centraux et tire (variante 1) ou passe au demi-centre, qui croise avec l'autre arrière (variante 2). Le pivot se place du côté opposé à l'ailier rentré.",
      ],
      objectif: "Attaquer la défense qui se replace avec un joueur de plus sur la base arrière, puis un écran de l'ailier.",
      pointsCles: [
        "L'ailier part en dribble tout de suite, avant que la défense soit en place.",
        "Le croisé se fait juste devant le 2.",
        "Le pivot va du côté opposé pour ne pas gêner.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál v mužské a ženské házené (mémoire, univ. Charles, 2020)',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: "P. 40 (Most): l'ailier contourne le pivot, dribble vers le défenseur 2 éloigné, croise avec l'arrière puis fait écran; l'arrière tire ou passe au DC qui croise avec l'autre arrière.",
        },
      ],
      ballon: 'Piv',
      depart: { Piv: [0, 12.3], AiG: [-1.4, 12.0], DC: [-1.6, 10.2], ArG: [-5.2, 10.4], ArD: [6.0, 10.4] },
      variantes: [
        {
          nom: "1 - Tir de l'arrière droit",
          etapes: [
            ...MOST_BASE,
            {
              texte: "L'arrière droit tire au centre.",
              courses: { ArD: [0.6, 8.2] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: '2 - Croisé demi-centre / arrière gauche',
          etapes: [
            ...MOST_BASE,
            {
              texte: "Les centraux se referment: l'arrière droit donne au demi-centre.",
              courses: { ArD: [1.2, 8.6], DC: [-0.4, 9.8] },
              passe: ['ArD', 'DC', 0.3],
              def: { G3: [-0.8, 7.4] },
            },
            {
              texte: "Le demi-centre attaque vers la gauche; l'arrière gauche croise derrière lui et reçoit.",
              courses: { DC: [-2.4, 8.8], ArG: { vers: [-0.4, 9.4], via: [-3.6, 10.8] } },
              passe: ['DC', 'ArG', 0.55],
              def: { G3: [-2.0, 7.6] },
            },
            {
              texte: "L'arrière gauche tire au centre.",
              courses: { ArG: [0.2, 8.4] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'deuxieme-vague-pivot-sous',
      nom: '2e vague: la pivot file sous la défenseuse sortie',
      alias: 'Sans nom (TJ Sokol Písek, CZ)',
      categorie: 'Jets francs et remises en jeu',
      defense: 'Défense en replacement',
      resume: "En deuxième vague, la pivot suit la passe; l'arrière attaque entre le 2 et le 3, qui sortent, et la pivot passe sous la défenseuse sortie pour recevoir.",
      description: [
        "Deuxième vague relevée par K. Kubišová (mémoire, 2020) chez les joueuses de TJ Sokol Písek.",
        "La pivot part du centre et se décale vite du côté où le demi-centre passe. L'arrière latérale attaque entre les défenseuses 2 et 3, en dribble (variante 1) ou après une une-deux avec l'ailière (variante 2). Les deux défenseuses sortent pour empêcher le tir: la pivot passe sous la défenseuse sortie et attend la passe.",
      ],
      objectif: "Servir la pivot dans le dos de la défenseuse qui sort sur l'arrière, avant que la défense soit organisée.",
      pointsCles: [
        "La pivot se décale vite, dès la passe du demi-centre.",
        "L'arrière attaque vraiment l'intervalle pour faire sortir les deux défenseuses.",
        "La pivot passe sous la défenseuse au moment où elle sort, pas avant.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál v mužské a ženské házené (mémoire, univ. Charles, 2020)',
          url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
          note: 'P. 44 (Písek): la pivot "podběhne pod vystoupivší bránící hráčkou" (passe sous la défenseuse sortie) et attend la passe.',
        },
      ],
      ballon: 'DC',
      depart: { DC: [0, 12.0], Piv: [0.6, 10.8], ArG: [-5.2, 11.0], ArD: [5.2, 11.0] },
      variantes: [
        {
          nom: "1 - L'arrière attaque en dribble",
          etapes: [
            PISEK_DEBUT,
            {
              ...PISEK_SOUS,
              texte: "L'arrière gauche attaque en dribble entre le 2 et le 3 gauches. Les deux défenseuses sortent pour l'empêcher de tirer: la pivot file sous la défenseuse 3 sortie.",
            },
            ...PISEK_FIN,
          ],
        },
        {
          nom: "2 - Une-deux avec l'ailière",
          etapes: [
            PISEK_DEBUT,
            {
              texte: "L'arrière gauche donne à l'ailière gauche.",
              courses: { AiG: [-8.6, 2.6], ArG: [-4.6, 9.2] },
              passe: ['ArG', 'AiG', 0.2],
            },
            {
              ...PISEK_SOUS,
              texte: "L'ailière lui rend aussitôt. L'arrière attaque entre le 2 et le 3 gauches, qui sortent: la pivot file sous la défenseuse 3 sortie.",
              passe: ['AiG', 'ArG', 0.15],
            },
            ...PISEK_FIN,
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'yougo',
      nom: 'Yougo',
      alias: 'YOUGO, "rotation sans ballon", croisé demi-centre / arrière sans ballon (FR); "rotation-Yougo" (beach)',
      categorie: 'Croisés',
      defense: '0-6 (défenses plutôt basses)',
      resume: "Croisé sans ballon entre le demi-centre et un arrière: l'arrière arrive lancé au centre et attaque entre les deux 3.",
      description: [
        "Nom français d'un enclenchement des équipes de France jeunes: le croisé demi-centre / arrière sans ballon, ex-\"rotation sans ballon\" (É. Quintin). Pour G. Petitgirard, toute équipe doit l'avoir dans son répertoire, avec \"l'Espagnol\" et le \"Yago\". En LNH 2017-18, le croisé DC/ARG sans ballon est joué 645 fois et le croisé DC/ARD sans ballon 221 fois en une demi-saison.",
        "Version détaillée de P. Passemard (équipe de France U18-U19, \"temps 2\" contre 0-6, variantes 1 à 4): le demi-centre passe à l'arrière gauche, qui menace l'intervalle 1-2; le demi-centre croise sans ballon avec l'arrière droit, qui passe derrière lui; l'arrière droit attaque entre les deux 3. Lecture: si aucun 3 ne monte, il tire; si un 3 monte, le pivot glisse dans son dos; si le 2 ferme, il joue sur le demi-centre replacé dans l'intervalle 1-2; si le 3 suit le pivot, il attaque le 3 isolé et décale l'arrière gauche en surnombre.",
        "Variante 5 (P. Kovacs, Euro 2016): le demi-centre passe à l'arrière droit puis croise sans ballon avec l'arrière gauche, qui reçoit au centre en position de tir. Variante 6 (Y. Delattre, U21, d'après quelques lignes): le Yougo est joué sur le poste 2 pour le faire redescendre, le pivot glisse vers l'extérieur et emmène le 3, puis on joue à l'opposé autour de l'autre 2 isolé. Variante 7 (G. Petitgirard, Croatie - Norvège, Euro 2016): entrée de l'ailier gauche, rotation sans ballon arrière gauche / demi-centre loin de la défense, renversement et pivot dans l'intervalle 1-2 (l'article nomme \"arrière gauche\" le joueur qui reçoit à gauche après la rotation, ici le demi-centre).",
        'Même mécanique que le "Croisé à vide" (Jugokreuzen en allemand); une version beach ("rotation-Yougo") amène le spécialiste au centre.',
      ],
      objectif: "Poser un problème de répartition à la charnière des deux 3 avec un arrière lancé au centre.",
      pointsCles: [
        "L'arrière passe derrière le demi-centre, pour garder profondeur, timing et prise d'information.",
        "Le croisé se fait à distance de la défense; l'arrière arrive lancé.",
        "Le pivot reste orienté face au ballon et glisse dans le dos du 3 qui monte.",
        "Lire la réaction des 3: pas de montée, tir; montée, pivot; pivot suivi, duel sur le 3 isolé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "P. Passemard, Vers un jeu d'attaque visant continuité, spontanéité, initiative (Approches du Handball n°174, 2019)",
          url: 'https://www.calameo.com/ffhandball/read/0072751114a24bacdba9b?page=44',
          note: "\"Enclenchement T 2 \"Yougo\" [...] Le demi-centre croise sans ballon avec l'arrière droit qui passe derrière le demi-centre\"; choix 1, 2 et 2 bis.",
        },
        {
          titre: 'P. Passemard, Attaquer une défense alignée mixte 0-6 (Approches n°173, 2019)',
          url: 'https://www.calameo.com/ffhandball/read/007275111ad2f954b8d90?page=16',
          note: "\"Yougo (croisé demi-centre / arrière sans balle) et enchaînement d'un tir secteur central\".",
        },
        {
          titre: 'É. Quintin et Y. Delattre, Approches n°157 (2017)',
          url: 'https://www.calameo.com/ffhandball/read/007275111ece7fcff65f0?page=22',
          note: "\"Le Yougo (ex. rotation sans ballon), un croisé sans balle\"; \"jouer Yougo sur le poste 2 pour le faire redescendre et ensuite jouer à l'opposé autour de l'autre poste 2 isolé\" (variante 6).",
        },
        {
          titre: "P. Kovacs, analyse de l'Euro 2016 (Approches n°154)",
          url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=33',
          note: "\"Le croisé sans balle demi-centre / arrière: Je l'appelle le \"Yougo\" qui positionne l'arrière gauche en situation de tir\" (variante 5).",
        },
        {
          titre: 'G. Petitgirard, Attaquer une défense 0-6 scandinave (Approches n°152, 2016)',
          url: 'https://www.calameo.com/ffhandball/read/0072751113db84b703804?page=32',
          note: "\"L'arrière gauche et le demi-centre effectuent une rotation sans ballon [...] le nouveau demi-centre effectue un renversement\" (variante 7).",
        },
        {
          titre: 'Komar, Lasvergnas, Belmessoud, Quelle efficacité des mouvements de joueurs en LNH? (Approches n°175, 2019)',
          url: 'https://www.calameo.com/ffhandball/read/007275111bdb91e2c432d?page=28',
          note: 'Croisé DC/ARG sans ballon 645, croisé DC/ARD sans ballon 221 (demi-saison 2017-18).',
        },
      ],
      ballon: 'DC',
      depart: { ArG: [-6.4, 9.6], ArD: [6.4, 9.6], AiG: [-9.4, 0.8], AiD: [9.4, 0.8] },
      variantes: [
        {
          nom: '1 - Choix 1: pas de montée des 3, tir',
          etapes: [
            ...YOUGO_T2,
            {
              texte: "Aucun 3 ne monte: l'arrière droit tire entre les deux 3.",
              courses: { ArD: [0.2, 8.2] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: '2 - Choix 2: un 3 monte, passe au pivot',
          etapes: [
            ...YOUGO_T2,
            { ...YOUGO_MONTEE, passe: ['ArD', 'Piv', 0.5] },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
        {
          nom: '3 - Choix 2: le 2 ferme, demi-centre replacé',
          etapes: [
            ...YOUGO_T2,
            { ...YOUGO_MONTEE, def: { D3: [0.9, 7.6], D2: [3.0, 6.2] } },
            {
              texte: "Le 2 droit est venu fermer sur le pivot. L'arrière droit joue sur le demi-centre, replacé dans l'intervalle 1-2 droit.",
              courses: { DC: [5.6, 8.2] },
              passe: ['ArD', 'DC', 0.3],
            },
            { texte: "Le demi-centre tire (ou décale l'ailier droit).", tir: { par: 'DC', t: 0.2 } },
          ],
        },
        {
          nom: '4 - Choix 2 bis: duel sur le 3 isolé',
          etapes: [
            ...YOUGO_T2,
            {
              texte: "Le pivot glisse vers l'intervalle 3-2 droit et le 3 droit le suit: le 3 gauche reste seul au centre.",
              courses: { Piv: [2.6, 6.4] },
              def: { D3: [2.6, 7.4] },
            },
            {
              texte: "L'arrière droit, devenu demi-centre, engage un duel face au 3 gauche isolé. Le 3 et le 2 gauches ferment.",
              courses: { ArD: [-0.8, 8.2] },
              def: { G3: [-1.2, 7.3], G2: [-3.8, 6.8] },
            },
            {
              texte: "Il décale l'arrière gauche, qui joue le 2 contre 1 créé (ou décale à son tour l'ailier écarté).",
              courses: { ArG: [-5.4, 7.4] },
              passe: ['ArD', 'ArG', 0.3],
              def: { G1: [-7.4, 2.8] },
            },
            { texte: "L'arrière gauche tire.", tir: { par: 'ArG', t: 0.2 } },
          ],
        },
        {
          nom: "5 - Version Kovacs: l'arrière gauche au centre",
          depart: YOUGO_STD,
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit.",
              courses: { ArD: [5.4, 9.0] },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "Croisé sans ballon: le demi-centre part vers le poste d'arrière gauche; l'arrière gauche passe derrière lui et arrive au centre.",
              courses: {
                DC: { vers: [-5.2, 9.0], via: [-2.4, 9.0] },
                ArG: { vers: [-0.6, 10.4], via: [-3.2, 11.4] },
              },
            },
            {
              texte: "L'arrière droit sert l'arrière gauche, lancé au centre, en position de tir.",
              courses: { ArG: [0, 8.8] },
              passe: ['ArD', 'ArG', 0.3],
              def: { G3: [-1.4, 7.2] },
            },
            { texte: "L'arrière gauche tire.", tir: { par: 'ArG', t: 0.2 } },
          ],
        },
        {
          nom: "6 - Yougo sur le poste 2, jeu à l'opposé",
          depart: YOUGO_STD,
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit.",
              courses: { ArD: [5.4, 9.0] },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "Yougo joué sur le poste 2: le demi-centre part vers le 2 gauche, l'arrière gauche croise derrière lui sans ballon. Le 2 redescend. Le pivot glisse vers l'extérieur et emmène le 3 gauche avec lui.",
              courses: {
                DC: { vers: [-4.6, 8.6], via: [-2.6, 8.8] },
                ArG: { vers: [-0.6, 10.4], via: [-3.6, 11.4] },
                Piv: [-3.2, 6.4],
              },
              def: { G3: [-2.4, 7.3], G2: [-5.0, 5.4] },
            },
            {
              texte: "Le nouveau demi-centre (l'arrière gauche) arrive au centre et reçoit de l'arrière droit. Il attaque: le 3 droit sort.",
              courses: { ArG: [0.2, 8.6] },
              passe: ['ArD', 'ArG', 0.3],
              def: { D3: [0.8, 7.6] },
            },
            {
              texte: "Il joue à l'opposé: il donne à l'arrière droit, qui attaque autour du 2 droit isolé.",
              courses: { ArD: [4.4, 8.2] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D2: [4.8, 6.6] },
            },
            { texte: "L'arrière droit tire.", tir: { par: 'ArD', t: 0.2 } },
          ],
        },
        {
          nom: "7 - Croatie - Norvège: entrée d'ailier et rotation",
          depart: { ArG: [-8.4, 9.4], ArD: [8.4, 9.4], AiG: [-9.0, 1.2], AiD: [9.6, 0.6], Piv: [-3.4, 6.5] },
          etapes: [
            {
              texte: "Écartement maximal: ailier droit au fond de l'aile, arrières le long des lignes de touche. Ballon au demi-centre, l'ailier gauche part à l'intérieur de la défense. Personne ne le remplace à l'aile.",
              courses: { AiG: { vers: [0, 6.4], via: [-5.0, 8.4] } },
            },
            {
              texte: "Le demi-centre donne à l'arrière droit. L'arrière gauche et le demi-centre font une rotation sans ballon, loin de la défense: l'arrière gauche vient au centre, le demi-centre part à gauche.",
              courses: {
                ArG: { vers: [-0.6, 10.6], via: [-4.4, 11.6] },
                DC: { vers: [-6.8, 9.6], via: [-3.6, 9.8] },
              },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "L'arrière droit rend au nouveau demi-centre (l'arrière gauche). Le pivot, côté gauche, prend place dans l'intervalle 1-2.",
              courses: { ArG: [-0.4, 10.0], Piv: { vers: [-6.4, 4.4], via: [-5.0, 7.0] } },
              passe: ['ArD', 'ArG', 0.2],
              def: { G2: [-5.4, 5.0] },
            },
            {
              texte: "Renversement: il donne au demi-centre, replacé le plus à l'extérieur possible. Le bloc des quatre défenseurs centraux s'étire.",
              courses: { DC: [-7.4, 9.0] },
              passe: ['ArG', 'DC', 0.2],
            },
            {
              texte: "Temps fort: le demi-centre dribble vers l'intérieur; le 2 gauche sort sur lui.",
              courses: { DC: [-5.4, 8.0] },
              def: { G2: [-4.8, 6.8] },
            },
            {
              texte: "Il donne au pivot dans l'intervalle 1-2, qui enroule le 1 vers l'extérieur.",
              courses: { Piv: [-6.0, 4.6] },
              passe: ['DC', 'Piv', 0.3],
              def: { G1: [-7.4, 3.2] },
            },
            { texte: 'Le pivot tire (lob).', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'azna',
      nom: 'Azna',
      alias: 'AZNA, "croisé arrière / demi-centre côté pivot", "AZNA renversé"',
      categorie: 'Croisés',
      defense: '0-6 (défense plutôt basse)',
      resume: "L'arrière s'engage dans un vrai duel et le demi-centre croise derrière lui vers l'extérieur: on joue vers l'aile.",
      description: [
        "Enclenchement des équipes de France jeunes décrit par É. Quintin. C'est l'inverse du croisé demi-centre / arrière: l'arrière, porteur, s'engage et c'est le demi-centre qui croise derrière lui, vers l'extérieur. Mêmes exigences: vrai duel de l'arrière, passe avec le bras du côté du croisé. But: jouer vers l'extérieur.",
        "Azna 1: croisé le plus possible vers l'extérieur, avec un pivot externe. Azna 2: avec un pivot central et un renversement produit par l'ailier qui joue autour. Azna 3 (\"Azna renversé\"): feinte d'Azna pour jouer à l'opposé, où se trouve le pivot; le duel de l'arrière est un leurre.",
        "La source ne donne que ces définitions, sans schéma détaillé: les étapes en suivent le principe (le chemin du renversement de la variante 2 est une proposition). Voir aussi \"Kiel\" (Azna feinté, passe longue à l'arrière opposé) et la fiche \"Croisé\".",
      ],
      objectif: "Fixer le centre par le duel de l'arrière pour attaquer l'extérieur avec le demi-centre lancé.",
      pointsCles: [
        "L'arrière joue un vrai duel vers le but avant de donner.",
        "Passe avec le bras du côté du croisé.",
        "Le demi-centre arrive lancé, orienté vers l'extérieur.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'É. Quintin, Favoriser le jeu en lecture (Approches du Handball n°157, 2017)',
          url: 'https://www.calameo.com/ffhandball/read/007275111ece7fcff65f0?page=22',
          note: "\"Azna 1: croisé le plus possible vers l'extérieur avec un pivot externe. Azna 2: avec un pivot central et un renversement produit par l'ailier qui joue autour. Azna 3: feinte d'Azna pour jouer à l'opposé, où se trouve le pivot\".",
        },
        {
          titre: 'É. Quintin et A. Kavcic (Approches n°154, 2016)',
          url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=18',
          note: "\"Option 2: croisé arrière / demi-centre côté pivot (AZNA). Il vise à jouer vers l'extérieur.\"",
        },
        {
          titre: 'É. Quintin, Fondamentaux collectifs (Approches n°126, 2011)',
          url: 'https://www.calameo.com/ffhandball/read/0072751118dcaa10e6817?page=26',
          note: "AZNA côté pivot ou \"AZNA renversé\" à l'opposé du pivot: \"le 1x1 de l'arrière est un leurre\".",
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Azna 1: pivot externe',
          depart: { Piv: [-6.6, 4.4] },
          etapes: [
            ...AZNA_DEBUT,
            {
              texte: "Le demi-centre continue le plus possible vers l'extérieur, au contact du pivot placé entre le 1 et le 2. Le 2 gauche sort sur lui.",
              courses: { DC: [-6.2, 7.4] },
              def: { G2: [-5.2, 6.6] },
            },
            { texte: "Le demi-centre tire au-dessus du 2 (ou donne au pivot si le 1 vient aider).", tir: { par: 'DC', t: 0.2 } },
          ],
        },
        {
          nom: "2 - Azna 2: pivot central, l'ailier renverse",
          etapes: [
            ...AZNA_DEBUT,
            {
              texte: "Le demi-centre attaque vers l'extérieur et fixe le 2 gauche. L'ailier gauche remonte pour jouer autour de lui. La défense glisse vers la gauche.",
              courses: { DC: [-5.8, 7.8], AiG: [-8.4, 5.6] },
              def: { G2: [-5.2, 6.4], G1: [-7.2, 3.2], G3: [-2.6, 7.0], D3: [0.6, 7.2], D2: [3.6, 6.0] },
            },
            {
              texte: "Il donne à l'ailier. L'arrière gauche se replace au centre.",
              courses: { AiG: [-8.0, 6.4], ArG: [-1.2, 9.6] },
              passe: ['DC', 'AiG', 0.3],
            },
            {
              texte: "L'ailier produit le renversement: il donne à l'arrière gauche.",
              passe: ['AiG', 'ArG', 0.2],
            },
            {
              texte: "L'arrière gauche poursuit le renversement vers l'arrière droit, qui attaque le côté que la défense a quitté.",
              courses: { ArD: [4.6, 8.4] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D2: [4.4, 6.6] },
            },
            { texte: "L'arrière droit tire.", tir: { par: 'ArD', t: 0.2 } },
          ],
        },
        {
          nom: "3 - Azna 3 (renversé): jeu à l'opposé, côté pivot",
          depart: { Piv: [3.4, 6.5] },
          etapes: [
            { ...AZNA_DUEL, texte: "Le pivot est à droite. L'arrière gauche s'engage comme pour l'Azna: son duel est un leurre." },
            {
              texte: "Le demi-centre lance sa course croisée vers l'extérieur. L'arrière gauche feinte la passe: le 2 gauche suit le demi-centre.",
              courses: { DC: { vers: [-5.0, 8.8], via: [-2.4, 10.2] }, ArG: [-2.8, 7.9] },
              def: { G2: [-4.6, 6.6], G3: [-2.0, 7.1] },
            },
            {
              texte: "L'arrière gauche se replace vite et joue à l'opposé: il donne à l'arrière droit.",
              courses: { ArG: [-2.0, 9.2], ArD: [4.4, 9.0] },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "L'arrière droit attaque entre le 3 et le 2 droits, autour du pivot. Les deux défenseurs se referment sur lui.",
              courses: { ArD: [3.0, 8.0] },
              def: { D3: [2.0, 7.4], D2: [4.6, 6.4] },
            },
            {
              texte: "Il donne au pivot, qui se dégage.",
              courses: { Piv: [3.2, 6.3] },
              passe: ['ArD', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'kiel',
      nom: 'Kiel',
      alias: '"Kiel" (EdF jeunes); Azna feinté',
      categorie: 'Croisés',
      defense: 'Zone (0-6, 1-5)',
      resume: "Croisé arrière droit / demi-centre à l'opposé du pivot; au lieu de donner au demi-centre, l'arrière droit fait une passe longue à l'arrière gauche, lancé.",
      description: [
        "Enclenchement des équipes de France jeunes décrit par É. Quintin (France cadets, 2011), repris contre la 1-5 dans les projets de jeu U19-U21. Il est \"plutôt efficace sur l'attaque des défenses utilisant un système de zone\".",
        "Un croisé arrière / demi-centre (\"Azna\") est lancé à l'opposé du pivot: l'arrière droit s'engage vers le centre, le demi-centre part vers l'extérieur derrière lui. Moment clé: au lieu de transmettre au demi-centre sur le croisé, l'arrière droit transmet à l'arrière gauche, qui s'engage vers le but avec rythme et intensité.",
        'La variante 2 montre le même enclenchement contre une 1-5. À ne pas confondre avec le "Kiel replacé" (variante du pivot échappé, Magdeburg / GOG). Mécanisme très proche: "Le Chambéry" (A. Portes). Voir aussi "Azna".',
      ],
      objectif: "Attirer la défense vers le croisé pour servir l'arrière opposé lancé dans une défense qui a glissé.",
      pointsCles: [
        "L'arrière droit s'engage vraiment: la défense doit croire au croisé.",
        "La passe longue part au moment où le demi-centre passe derrière lui.",
        "L'arrière gauche s'engage vers le but avec rythme et intensité.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'É. Quintin, Fondamentaux collectifs (Approches du Handball n°126, 2011)',
          url: 'https://www.calameo.com/ffhandball/read/0072751118dcaa10e6817?page=26',
          note: "\"...Mais, au lieu de transmettre au demi-centre sur le croisé, l'arrière transmet à l'arrière opposé qui s'engage vers le but\" (p. 29).",
        },
        {
          titre: 'Y. Delattre et J. Bertholet, Quelques regrets malgré le bronze (Approches n°156, 2016)',
          url: 'https://www.calameo.com/ffhandball/read/007275111df5ab573582b?page=27',
          note: "\"Sur l'attaque d'une 1-5: entrée d'ailier (Hep et London à gauche), petit jeu (Ciudad à droite), \"Ecarté croisé\", \"Wallau\" et \"Kiel\"\".",
        },
      ],
      ballon: 'ArD',
      depart: { Piv: [-3.4, 6.5] },
      variantes: [
        {
          nom: '1 - Contre 0-6',
          etapes: [
            {
              texte: "Le pivot est à gauche. Croisé arrière / demi-centre à l'opposé: l'arrière droit s'engage vers le centre, entre le 3 et le 2 droits.",
              courses: { ArD: [3.2, 8.4] },
              def: { D3: [2.4, 7.2], D2: [4.2, 6.2] },
            },
            {
              texte: "Le demi-centre part vers l'extérieur, derrière lui. Le 2 droit anticipe la passe et suit le demi-centre.",
              courses: { DC: { vers: [5.2, 8.8], via: [2.2, 10.2] }, ArD: [2.6, 8.0] },
              def: { D2: [4.8, 7.0], D3: [2.2, 7.0] },
            },
            {
              texte: "Au lieu de donner au demi-centre, l'arrière droit fait une passe longue à l'arrière gauche, qui s'engage vers le but avec rythme et intensité.",
              courses: { ArG: [-3.0, 8.4] },
              passe: ['ArD', 'ArG', 0.25],
              def: { G3: [-2.0, 7.2], G2: [-4.6, 6.0] },
            },
            { texte: "L'arrière gauche tire.", tir: { par: 'ArG', t: 0.3 } },
          ],
        },
        {
          nom: '2 - Contre 1-5',
          dispositif: '5-1',
          depart: { Piv: [-3.0, 6.5] },
          etapes: [
            {
              texte: "Le pivot est à gauche. L'arrière droit s'engage vers le centre, entre l'avancé et le 2 droit.",
              courses: { ArD: [2.6, 9.0] },
              def: { D3: [1.4, 9.0], D2: [3.8, 6.4] },
            },
            {
              texte: "Le demi-centre part vers l'extérieur, derrière lui. L'avancé et le 2 droit attendent le croisé.",
              courses: { DC: { vers: [5.0, 9.4], via: [2.0, 10.8] }, ArD: [2.2, 8.6] },
              def: { D3: [1.2, 8.8], D2: [4.6, 7.2] },
            },
            {
              texte: "L'arrière droit fait une passe longue à l'arrière gauche, qui s'engage vers le but.",
              courses: { ArG: [-2.8, 8.4] },
              passe: ['ArD', 'ArG', 0.25],
              def: { G2: [-4.0, 6.4], G3: [-1.6, 7.2] },
            },
            { texte: "L'arrière gauche tire.", tir: { par: 'ArG', t: 0.3 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'chambery',
      nom: 'Le Chambéry',
      alias: '"Le Chambéry"',
      categorie: 'Croisés',
      defense: '3-3 fille à fille; 0-6 agressive',
      resume: "Croisé à l'opposé de la pivot; ou croisé simulé entre l'arrière et la demi-centre, puis renvoi à l'arrière opposée, du côté de la pivot.",
      description: [
        "Enclenchement de l'équipe de France féminine expliqué par A. Portes (Approches n°147). La pivot est entre la n°2 et la n°3 de l'autre côté.",
        "Contre la 3-3 fille à fille de la Corée (variante 1): croisé à l'opposé de la pivot. La source n'en dit pas plus; la 3-3 est figurée avec le placement 3-2-1, l'avancée au centre de la première ligne.",
        "Contre la 0-6 agressive des Pays-Bas, avec des montées inversées (variante 2): \"nous simulons un croisé entre l'arrière et la demi-centre et, au lieu de le jouer, nous renvoyons la balle à l'arrière opposée\". Comme la pivot est dans ce secteur, il n'y a pas de montée inversée: situation de tir.",
        'Mécanisme très proche du "Kiel" (É. Quintin). Voir aussi "Faux croisé".',
      ],
      objectif: "Attirer la défense vers un croisé pour servir l'arrière opposée du côté de la pivot, où la défense ne peut pas monter.",
      pointsCles: [
        "Le croisé simulé doit être crédible.",
        "La pivot, du côté opposé, tasse la défense et empêche la montée inversée.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'A. Portes, Portes cible les défenses adverses (Approches du Handball n°147, 2015)',
          url: 'https://www.calameo.com/ffhandball/read/00727511117a5fff28271?page=6',
          note: "\"Nous simulons un croisé entre l'arrière et la demi-centre et, au lieu de le jouer, nous renvoyons la balle à l'arrière opposée\" (pp. 6 et 8).",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Contre 3-3: croisé à l'opposé de la pivot",
          dispositif: '3-2-1',
          depart: {
            G1: [-6.8, 3.0], G2: [-4.2, 8.4], G3: [-0.4, 6.6], D3: [0, 9.0], D2: [4.2, 8.4], D1: [6.8, 3.0], Piv: [2.8, 6.6],
          },
          etapes: [
            {
              texte: "La pivot est entre la 2 et la 3, côté droit. La demi-centre attaque à gauche, à l'opposé de la pivot, dans un duel sur l'avancée.",
              courses: { DC: [-1.6, 10.0] },
              def: { D3: [-0.8, 9.4], G2: [-3.6, 9.0] },
            },
            {
              texte: "L'arrière gauche croise derrière elle vers le centre et reçoit.",
              courses: { ArG: { vers: [0.4, 10.6], via: [-3.6, 11.6] }, DC: [-2.2, 9.6] },
              passe: ['DC', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche attaque l'espace laissé par l'avancée et tire.",
              courses: { ArG: [0.8, 8.6] },
              tir: { par: 'ArG', t: 0.6 },
              def: { D3: [0, 9.2], G3: [0, 7.0] },
            },
          ],
        },
        {
          nom: '2 - Contre 0-6 agressive: croisé simulé et renvoi',
          depart: { Piv: [3.4, 6.5] },
          etapes: [
            {
              texte: "La pivot est entre la 3 et la 2 droites. La demi-centre attaque à gauche comme pour un croisé avec l'arrière gauche; la 3 gauche sort.",
              courses: { DC: [-2.6, 8.8] },
              def: { G3: [-2.3, 7.4] },
            },
            {
              texte: "L'arrière gauche lance sa course croisée: la défense anticipe le croisé.",
              courses: { ArG: { vers: [-1.2, 9.6], via: [-4.0, 10.8] }, DC: [-3.2, 8.4] },
              def: { G3: [-1.8, 7.6], G2: [-4.4, 6.0], D3: [0.6, 7.2] },
            },
            {
              texte: "Au lieu de jouer le croisé, la demi-centre renvoie le ballon à l'arrière droite. La pivot est dans ce secteur: pas de montée inversée possible.",
              courses: { ArD: [4.6, 8.6] },
              passe: ['DC', 'ArD', 0.2],
              def: { D2: [4.6, 6.2] },
            },
            {
              texte: "L'arrière droite tire.",
              courses: { ArD: [4.2, 8.0] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ecart',
      nom: 'Croisé écart',
      alias: '"Croisé écart", "Ecarté croisé", "croisé/écarté"',
      categorie: 'Croisés',
      defense: '0-6; 1-5 (n°3 haut)',
      resume: "Croisé demi-centre / arrière à l'opposé du pivot, puis passe immédiate à l'arrière opposé, qui attaque en course en \"C\" vers l'intérieur.",
      description: [
        "Enclenchement des équipes de France jeunes. Version d'É. Quintin (France cadets, 2011, variante 1): le pivot est placé entre le 1 et le 2, du côté opposé au croisé. Après le croisé demi-centre / arrière, l'arrière qui vient de croiser passe à l'arrière opposé (côté pivot externe), qui prend une course en \"C\" vers l'intérieur, avec rythme et intensité.",
        "Version d'A. Parisy et S. Nouet (pôle espoir d'Amiens, contre une défense avec un n°3 haut, variantes 2 et 3): temps fort du demi-centre qui \"porte\" pour désaxer le 3 haut, faux croisé avec l'arrière qui lâche vite à l'arrière opposé; celui-ci attaque autour du 3 bas isolé. Lecture: débordement côté pivot, tir ou diagonale au pivot (ou à l'ailier).",
        "Le nom \"Ecarté croisé\" est cité dans les projets de jeu U19-U21 contre la 1-5; l'identité avec le \"Croisé écart\" est supposée (même famille d'enclenchements). Les deux textes ne donnent pas de schéma lisible: les placements sont une proposition.",
      ],
      objectif: "Attirer un côté de la défense par le croisé pour attaquer à l'opposé, sur un plus grand espace.",
      pointsCles: [
        "L'arrière qui reçoit sur le croisé lâche vite le ballon.",
        "L'arrière opposé prend une course en \"C\": d'abord vers l'extérieur, puis vers l'intérieur.",
        "Contre un 3 haut: sa fixation l'empêche de revenir aider le 3 bas isolé.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'É. Quintin, Fondamentaux collectifs (Approches du Handball n°126, 2011)',
          url: 'https://www.calameo.com/ffhandball/read/0072751118dcaa10e6817?page=26',
          note: "\"Passe de l'arrière, qui vient de croiser, à l'arrière opposé (côté pivot externe) qui adopte une course en \"C\" vers l'intérieur\" (p. 30).",
        },
        {
          titre: 'A. Parisy et S. Nouet, Comprendre pour faire, faire pour comprendre (Approches n°128, 2011)',
          url: 'https://www.calameo.com/ffhandball/read/007275111ccfb46ff926c?page=19',
          note: "\"Engager un faux croisé avec l'arrière qui lâche vite à l'arrière opposé afin de fixer le n°3 haut et le n°2 (Attirer dans un secteur pour jouer à l'opposé)\".",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Quintin: course en "C" de l\'arrière opposé',
          depart: { Piv: [6.6, 4.4] },
          etapes: [
            {
              texte: "Le pivot est entre le 1 et le 2 droits. Croisé à l'opposé du pivot: le demi-centre engage un duel sur le 3 gauche.",
              courses: { DC: [-2.4, 8.6] },
              def: { G3: [-2.2, 7.4] },
            },
            {
              texte: "L'arrière gauche croise derrière lui et reçoit. La défense se resserre.",
              courses: { ArG: { vers: [-0.6, 9.0], via: [-3.6, 10.8] }, DC: [-3.2, 8.1] },
              passe: ['DC', 'ArG', 0.55],
              def: { G3: [-1.8, 7.2], D3: [0.6, 7.4] },
            },
            {
              texte: "Moment clé: l'arrière gauche passe aussitôt à l'arrière droit, qui prend une course en \"C\" vers l'intérieur, avec rythme et intensité.",
              courses: { ArD: { vers: [3.2, 8.4], via: [7.2, 8.8] }, ArG: [-0.2, 8.6] },
              passe: ['ArG', 'ArD', 0.5],
              def: { D3: [0.4, 7.6], D2: [4.0, 6.0] },
            },
            {
              texte: "L'arrière droit attaque l'intervalle entre le 3 et le 2 droits et tire.",
              courses: { ArD: [2.8, 7.8] },
              tir: { par: 'ArD', t: 0.5 },
              def: { D2: [3.8, 6.6] },
            },
          ],
        },
        {
          nom: '2 - Croisé-écarté contre 1-5: débordement et tir',
          dispositif: '5-1',
          depart: { Piv: [2.4, 6.5] },
          etapes: [
            ...ECARTE_BASE,
            {
              texte: "Le 3 bas arrive en retard: l'arrière droit déborde et tire.",
              courses: { ArD: [1.2, 7.6] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: '3 - Croisé-écarté contre 1-5: diagonale au pivot',
          dispositif: '5-1',
          depart: { Piv: [2.4, 6.5] },
          etapes: [
            ...ECARTE_BASE,
            {
              texte: "Le 3 bas sort sur lui: il donne au pivot, qui se dégage dans son dos.",
              courses: { Piv: [1.6, 6.3] },
              passe: ['ArD', 'Piv', 0.4],
              def: { G3: [0.6, 7.4] },
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-dc-ar-oppose-pivot',
      nom: "Croisé demi-centre / arrière à l'opposé du pivot",
      alias: '"Option 1" (É. Quintin), "enclenchement croisé DC/AR opposé pivot", "croisé DC / arrière opposée au pivot" (A. Portes)',
      categorie: 'Croisés',
      defense: '0-6 basse; 0-6 agressive "à tiroirs"',
      resume: "Le demi-centre engage obligatoirement un vrai duel, puis croise avec l'arrière du côté opposé au pivot; l'arrière lit la réaction des défenseurs.",
      description: [
        "Enclenchement de base des équipes de France jeunes. Version d'É. Quintin (variante 1, défense plutôt basse): il commence OBLIGATOIREMENT par un vrai duel du demi-centre, qui doit écarter ou \"écraser\" son adversaire direct du côté du croisé pour obliger la défense à se resserrer. Le demi-centre donne avec le bras du côté du croisé; l'arrière, parti haut, attend \"l'invitation\" (signal de l'épaule) et croise derrière lui vers l'intérieur.",
        "Version de P. Passemard (U18-U19, contre une 0-6 agressive \"à tiroirs\", variantes 2 à 4): la pivot est entre le 2 et le 3 à l'opposé; le demi-centre engage un duel fort sur le 3; si l'espace se ferme, l'arrière droit croise et attaque DROIT, pour ne pas fermer l'espace opposé. Lecture: le 2 sort et le 3 ne monte pas, tir; le 2 et le 3 sortent, passe au pivot; le 2 descend, décalage sur le demi-centre replacé dans l'intervalle 1-2 (tir ou ailier). Objectif: séparer, écarter les deux 3.",
        'A. Portes joue aussi ce croisé contre une 0-6 agressive, arrières en pleine course: la position du pivot empêche les montées inversées en tassant la défense (voir aussi "Le Chambéry").',
        "Voir aussi la fiche \"Croisé\" (croisé demi-centre / arrière de base) et \"Azna\", où c'est l'arrière qui s'engage.",
      ],
      objectif: "Séparer les deux 3 par le duel du demi-centre, du côté opposé au pivot, pour lancer l'arrière dans l'espace créé.",
      pointsCles: [
        "Le duel du demi-centre est obligatoire: profondeur du dernier appui, protection du ballon.",
        "Passe avec le bras du côté du croisé, pour garder la course de l'arrière assez extérieure.",
        "L'arrière part haut, attend le signal et arrive lancé; contre une défense agressive, il attaque droit.",
        "Le croisé n'a de sens que si le duel resserre la défense sur le point de fixation.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'É. Quintin et A. Kavcic (Approches du Handball n°154, 2016)',
          url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=18',
          note: "\"Croisé demi-centre / arrière à l'opposé du pivot. L'enclenchement commence OBLIGATOIREMENT par un duel du demi-centre\" (pp. 21-22).",
        },
        {
          titre: "P. Passemard, Vers un jeu d'attaque visant continuité, spontanéité, initiative (Approches n°174, 2019)",
          url: 'https://www.calameo.com/ffhandball/read/0072751114a24bacdba9b?page=54',
          note: "\"Enclenchement croisé DC/AR opposé pivot [...] Objectif et sens recherchés: séparer, écarter les 2 numéros 3\"; l'arrière attaque droit.",
        },
        {
          titre: 'A. Portes, Portes cible les défenses adverses (Approches n°147, 2015)',
          url: 'https://www.calameo.com/ffhandball/read/00727511117a5fff28271?page=6',
          note: "Croisé DC / arrière opposée au pivot contre 0-6 agressive: arrières en pleine course, la position du pivot empêche les montées inversées.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Quintin: duel obligatoire, croisé vers l'intérieur",
          depart: { Piv: [3.4, 6.5], ArG: [-6.2, 11.0] },
          etapes: [
            {
              texte: "Le pivot est à droite. L'arrière gauche est haut, face à l'intervalle extérieur. Le demi-centre engage un vrai duel sur le 3 gauche, qui sort et se resserre sur lui.",
              courses: { DC: [-2.0, 8.6] },
              def: { G3: [-1.9, 7.5], G2: [-4.2, 6.2] },
            },
            {
              texte: "Au signal de l'épaule, l'arrière gauche croise derrière lui vers l'intérieur. Le demi-centre lui donne de la main gauche.",
              courses: { ArG: { vers: [-0.4, 9.0], via: [-3.4, 10.6] }, DC: [-2.8, 8.0] },
              passe: ['DC', 'ArG', 0.55],
              def: { G3: [-2.0, 7.2], D3: [0.8, 7.2] },
            },
            {
              texte: "L'arrière gauche, lancé, attaque l'espace entre les deux 3 et tire.",
              courses: { ArG: [0.2, 7.9] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D3: [1.0, 7.2] },
            },
          ],
        },
        {
          nom: '2 - Tiroirs: le 2 sort, le 3 reste, tir',
          depart: { Piv: [-3.4, 6.5], AiG: [-9.4, 0.8], AiD: [9.4, 0.8] },
          etapes: [
            ...TIROIRS_BASE,
            {
              texte: "Le 2 droit sort sur le demi-centre et le 3 droit ne monte pas: l'arrière droit tire.",
              courses: { ArD: [1.0, 8.0] },
              tir: { par: 'ArD', t: 0.5 },
              def: { D2: [4.0, 7.0], D3: [1.6, 7.0] },
            },
          ],
        },
        {
          nom: '3 - Tiroirs: le 2 et le 3 sortent, pivot',
          depart: { Piv: [-3.4, 6.5], AiG: [-9.4, 0.8], AiD: [9.4, 0.8] },
          etapes: [
            ...TIROIRS_BASE,
            {
              texte: "Le 2 et le 3 droits sortent tous les deux. Le pivot glisse dans l'espace laissé au centre et reçoit.",
              courses: { Piv: { vers: [0.4, 6.3], via: [-1.2, 5.9] } },
              passe: ['ArD', 'Piv', 0.5],
              def: { D3: [1.2, 7.4], D2: [3.8, 7.2] },
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
        {
          nom: '4 - Tiroirs: le 2 descend, décalage',
          depart: { Piv: [-3.4, 6.5], AiG: [-9.4, 0.8], AiD: [9.4, 0.8] },
          etapes: [
            ...TIROIRS_BASE,
            {
              texte: "Le 2 droit descend fermer l'espace. Décalage: l'arrière droit donne au demi-centre, replacé dans l'intervalle 1-2.",
              courses: { DC: [5.6, 8.0] },
              passe: ['ArD', 'DC', 0.4],
              def: { D2: [3.0, 6.4], D3: [1.4, 7.2] },
            },
            { texte: "Le demi-centre tire (ou donne à l'ailier droit si le 1 sort).", tir: { par: 'DC', t: 0.2 } },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'petit-grand-ciseau',
      nom: 'Petit ciseau / grand ciseau',
      alias: 'petit ciseau, grand ciseau (FR)',
      categorie: 'Croisés',
      defense: 'Défense en repli (fin de montée de balle)',
      resume: "En fin de montée de balle, croisé demi-centre / arrière du côté opposé au ballon (petit ciseau), enchaîné avec un croisé des deux arrières (grand ciseau).",
      description: [
        'Deux actions de base arrière décrites par R. Bertsch dans une fiche "Formation du joueur" (Approches du Handball n°61, 2001), pour la fin de la montée de balle.',
        "Petit ciseau: croisé du côté opposé au ballon entre le demi-centre et l'arrière, avec tir de l'arrière dans le secteur central. Grand ciseau: le même croisé demi-centre / arrière gauche, enchaîné avec un croisé arrière droit / arrière gauche, avec tir de l'arrière gauche dans le secteur opposé.",
        "Les schémas de la fiche n'ont pas été vus: les étapes suivent le texte (le ballon part ici de l'arrière droit). J. Caraty cite aussi le \"petit ciseau\" parmi les actions de base arrière, sans le définir.",
      ],
      objectif: "Enchaîner des croisés dès l'arrivée de la base arrière, avant que la défense soit installée.",
      pointsCles: [
        "Croiser du côté opposé à celui d'où vient le ballon.",
        "Garder la vitesse de la montée de balle dans les croisés.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'R. Bertsch, fiche Formation du joueur (Approches du Handball n°61, 2001)',
          url: 'https://bhb08.fr/wp-content/uploads/2013/09/ahb61_12_16_amelior1.pdf',
          note: "\"Croisé opposé ballon DC / AR (\"petit ciseau\") avec tir de l'AR secteur central • Croisé opposé ballon DC / ARG enchaîné avec croisé ARD / ARG avec tir de l'ARG secteur opposé (\"grand ciseau\")\".",
        },
        {
          titre: 'J. Caraty, Le tir de loin (Approches du Handball n°120, 2010)',
          url: 'https://www.calameo.com/ffhandball/read/00727511138d66ea3bb90?page=37',
          note: '"croisés, permutation de poste, criss/cross, renversement, petit ciseau" (noms seuls).',
        },
      ],
      ballon: 'ArD',
      depart: { ArG: [-5.2, 11.0], DC: [0, 11.8], ArD: [5.2, 11.0] },
      variantes: [
        {
          nom: '1 - Petit ciseau: tir au centre',
          etapes: [
            ...CISEAU_BASE,
            {
              texte: "L'arrière gauche tire dans le secteur central.",
              courses: { ArG: [0, 8.6] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D3: [1.2, 7.2] },
            },
          ],
        },
        {
          nom: "2 - Grand ciseau: second croisé avec l'arrière droit",
          etapes: [
            ...CISEAU_BASE,
            {
              texte: "L'arrière gauche donne à l'arrière droit, qui attaque en diagonale vers le centre.",
              courses: { ArG: [0.4, 9.6], ArD: [2.6, 9.2] },
              passe: ['ArG', 'ArD', 0.3],
            },
            {
              texte: "Second croisé: l'arrière droit poursuit vers la gauche, l'arrière gauche croise derrière lui vers la droite et reçoit.",
              courses: { ArD: [0.6, 8.6], ArG: { vers: [3.6, 9.0], via: [0.6, 11.4] } },
              passe: ['ArD', 'ArG', 0.55],
              def: { D3: [1.2, 7.6] },
            },
            {
              texte: "L'arrière gauche attaque dans le secteur opposé à son poste de départ et tire.",
              courses: { ArG: [3.6, 8.0] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D2: [4.4, 6.4] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'faux-croise-aspire-avance',
      nom: "Faux croisé pour aspirer l'avancé",
      alias: '"Premier enclenchement" (France juniors)',
      categorie: 'Contre 5-1',
      defense: 'Défense étagée (avancé)',
      dispositif: '5-1',
      resume: "Le demi-centre fait mine de croiser avec l'arrière droit pour emmener l'avancé; l'arrière gauche attaque le 3 bas isolé et le demi-centre rentre en 2e pivot.",
      description: [
        "Enclenchement de l'équipe de France juniors contre la défense étagée de la Roumanie (tournoi de Dreux 2012), analysé par D. Fleurance. Le pivot est dans l'intervalle 1-2 droit pour écarter la défense.",
        "Le demi-centre vient croiser avec l'arrière droit \"sans toutefois y mettre beaucoup d'engagement\": l'objectif est d'amener l'avancé avec lui. L'arrière droit passe à l'arrière gauche, qui arrive lancé et négocie son duel face au 3 bas, isolé sur une grande surface (variante 1). Le demi-centre enchaîne une rentrée dans l'espace 1-2 gauche; si les partenaires du 3 bas aident, l'arrière gauche lui donne (variante 2).",
        "Autres formes: rentrée du demi-centre côté pivot, puis glissement à l'opposé; l'arrière droit, lancé, tire par-dessus son écran (variante 3). \"Deuxième enclenchement\": croisé arrière / demi-centre pour contourner par l'extérieur; l'avancé est exclu de l'action et le demi-centre exploite l'intervalle 1-2 (variante 4; la source cite aussi une passe au pivot). Une rentrée sur une passe ailier-arrière côté pivot est jugée moins probante.",
        'Voir aussi "Faux croisé".',
      ],
      objectif: "Sortir l'avancé de la zone d'action pour isoler le 3 bas.",
      pointsCles: [
        "Le faux croisé doit attirer l'avancé: peu d'engagement, mais une vraie course vers l'arrière droit.",
        "L'arrière gauche arrive lancé sur le 3 bas.",
        "La rentrée du demi-centre donne une solution si la défense aide.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "D. Fleurance, Le réseau d'échange sur la base arrière (Approches du Handball n°151, 2016)",
          url: 'https://www.calameo.com/ffhandball/read/007275111735cfdd874e5?page=39',
          note: "\"Le demi-centre vient croiser avec l'arrière droit sans toutefois y mettre beaucoup d'engagement. L'objectif est d'amener le joueur avancé avec lui\".",
        },
      ],
      ballon: 'DC',
      depart: { Piv: [6.4, 4.6] },
      variantes: [
        {
          nom: "1 - Duel de l'arrière gauche sur le 3 bas",
          etapes: [
            ...ASPIRE_DUEL,
            {
              texte: "L'arrière gauche gagne son duel: il déborde le 3 bas et tire.",
              courses: { ArG: [-2.0, 7.8] },
              tir: { par: 'ArG', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - La défense aide: passe au demi-centre rentré',
          etapes: [
            ...ASPIRE_DUEL,
            {
              texte: "Le 2 gauche vient aider sur l'arrière gauche. Celui-ci donne au demi-centre, rentré dans l'intervalle 1-2.",
              courses: { DC: [-6.2, 4.8] },
              passe: ['ArG', 'DC', 0.5],
              def: { G2: [-3.0, 7.0] },
            },
            { texte: 'Le demi-centre tire.', tir: { par: 'DC', t: 0.2 } },
          ],
        },
        {
          nom: "3 - Rentrée du demi-centre côté pivot, tir par-dessus l'écran",
          etapes: [
            ...ASPIRE_DEBUT,
            {
              texte: "Le demi-centre rentre en 2e pivot du côté du pivot, entre le 3 bas et le 2 droit. L'arrière droit recule pour reprendre de l'élan.",
              courses: { DC: [2.4, 6.5], ArD: [1.6, 10.8] },
            },
            {
              texte: "Le demi-centre glisse à l'opposé du pivot, devant le 3 bas, et lui fait écran. L'arrière droit arrive lancé.",
              courses: { DC: { vers: [-0.6, 6.3], ecran: true }, ArD: [0, 8.6] },
              def: { G3: [-1.6, 7.0], D3: [1.6, 8.6] },
            },
            {
              texte: "L'arrière droit tire par-dessus l'écran du demi-centre.",
              tir: { par: 'ArD', t: 0.2 },
            },
          ],
        },
        {
          nom: "4 - Deuxième enclenchement: contourner par l'extérieur",
          etapes: [
            {
              texte: "Le demi-centre donne à l'arrière gauche, qui se lance dans son couloir et s'apprête à déborder par l'intérieur. L'avancé est hors de l'action.",
              courses: { ArG: [-3.6, 8.2] },
              passe: ['DC', 'ArG', 0.1],
              def: { G2: [-3.8, 6.4], G3: [-1.8, 7.0] },
            },
            {
              texte: "Le demi-centre croise derrière lui vers l'extérieur et reçoit.",
              courses: { DC: { vers: [-5.4, 8.6], via: [-2.6, 10.4] }, ArG: [-3.0, 7.9] },
              passe: ['ArG', 'DC', 0.55],
              def: { G2: [-4.2, 6.6] },
            },
            {
              texte: "Le demi-centre exploite l'intervalle 1-2 et tire.",
              courses: { DC: [-6.0, 7.0] },
              tir: { par: 'DC', t: 0.5 },
              def: { G2: [-4.8, 6.4] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'croise-ar-ar-rotation-dc',
      nom: 'Croisé arrière-arrière avec rotation de la demi-centre',
      alias: '"Croisé arrière-arrière" (sélection Auvergne-Rhône-Alpes)',
      categorie: 'Croisés',
      defense: '0-6 de zone',
      resume: "Les deux arrières croisent au centre pendant que la demi-centre se replace en arrière gauche; la pivot retient la 3 et la gauche joue à trois contre deux.",
      description: [
        "Enclenchement de la sélection féminine Auvergne-Rhône-Alpes (interligues), relevé par D. Chastel: joué 17 fois pour 8 situations favorables de tir. Il sert aussi en supériorité numérique.",
        "La pivot est entre la 2 et la 3 gauches. La demi-centre passe à l'arrière gauche en lui ouvrant l'espace; l'arrière gauche court vers le centre, côté bras, et croise avec l'arrière droite. Pendant ce temps, la demi-centre se replace en arrière gauche, face à l'intervalle 1-2.",
        "L'arrière droite, dangereuse côté bras dans le secteur central, cherche à jouer puis passe à la demi-centre replacée. La pivot empêche la 3 gauche de revenir: 3 contre 2 dans l'intervalle extérieur, décalage et passe à l'ailière. Si le décalage échoue, les autres joueuses se replacent pour la continuité.",
      ],
      objectif: "Condenser la défense au centre par le croisé des arrières, puis exploiter le surnombre à l'extérieur.",
      pointsCles: [
        "La demi-centre ouvre l'espace devant elle en passant.",
        "Le croisé des arrières doit fixer les centrales.",
        "La pivot gagne sa position pour empêcher la 3 de revenir.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'D. Chastel, Le jeu des pivots en relation avec les arrières, partie 1 (Approches du Handball n°178, 2020)',
          url: 'https://www.calameo.com/ffhandball/read/00727511165bc273357a9?page=25',
          note: '"croisé arrière-arrière, enclenchement utilisé par la sélection Auvergne Rhône-Alpes: 17 fois (pour 8 situations favorables de tir)".',
        },
      ],
      ballon: 'DC',
      depart: { Piv: [-3.4, 6.5] },
      etapes: [
        {
          texte: "La pivot est entre la 2 et la 3 gauches. La demi-centre donne à l'arrière gauche en s'écartant pour lui ouvrir l'espace; l'arrière gauche court vers le centre, côté bras.",
          courses: { ArG: [-2.4, 9.6], DC: [1.2, 11.2] },
          passe: ['DC', 'ArG', 0.1],
        },
        {
          texte: "Croisé arrière-arrière: l'arrière gauche continue vers la droite, l'arrière droite croise derrière elle et reçoit. La demi-centre se replace en arrière gauche, face à l'intervalle 1-2.",
          courses: {
            ArG: [1.6, 9.0],
            ArD: { vers: [-0.4, 9.8], via: [3.2, 10.8] },
            DC: { vers: [-5.8, 9.4], via: [-2.4, 11.8] },
          },
          passe: ['ArG', 'ArD', 0.55],
          def: { D3: [0.6, 7.2] },
        },
        {
          texte: "L'arrière droite, dangereuse côté bras au centre, attaque et fait sortir la 3 gauche. La pivot gagne sa position et l'empêche de revenir.",
          courses: { ArD: [-1.2, 8.4], Piv: { vers: [-2.6, 6.5], ecran: true } },
          def: { G3: [-1.4, 7.4] },
        },
        {
          texte: "Elle donne à la demi-centre, replacée arrière gauche. À gauche, demi-centre, pivot et ailière sont à trois contre deux.",
          courses: { DC: [-5.4, 8.6] },
          passe: ['ArD', 'DC', 0.3],
        },
        {
          texte: "La demi-centre attaque l'intervalle 1-2: la 1 gauche sort sur elle. Décalage: elle donne à l'ailière.",
          courses: { DC: [-5.8, 7.2], AiG: [-8.6, 2.2] },
          passe: ['DC', 'AiG', 0.5],
          def: { G2: [-4.8, 6.2], G1: [-6.8, 4.6] },
        },
        { texte: "L'ailière gauche tire.", tir: { par: 'AiG', t: 0.2 } },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'double-croise-exterieur',
      nom: 'Double croisé extérieur',
      alias: 'Double croisé arrière / demi-centre puis demi-centre / ailier (Slovénie juniors)',
      categorie: 'Croisés',
      defense: '0-6',
      resume: "Croisé arrière droit / demi-centre puis demi-centre / ailier droit: la défense est attirée à droite, et l'arrière gauche attaque à l'opposé sur un grand espace.",
      description: [
        "Enchaînement de la Slovénie juniors contre la France (0-6), analysé par D. Fleurance. Après écartement, l'arrière droit croise avec le demi-centre, puis le demi-centre croise avec l'ailier droit. L'ailier donne à l'arrière opposé; le demi-centre et l'ailier se replacent. L'arrière gauche, lancé, déborde son adversaire par l'intérieur, avec l'arrière droit devenu demi-centre qui s'apprête à croiser (variante 1). Autre possibilité: donner au pivot placé dans l'espace 2-3 à droite (variante 2); ou repartir sur un croisé avec l'ailier gauche.",
        "\"Le double croisé extérieur mobilise la défense d'un côté pour ensuite libérer à l'opposé un joueur sur un plus grand espace.\"",
        "Contre la Hongrie (défense alignée, variantes 3 et 4): permutation demi-centre / arrière gauche, passe de l'arrière droit à l'arrière gauche qui va vers le but; sinon l'arrière gauche croise avec l'arrière droit, qui profite de la désorganisation autour du pivot; ballon au pivot si le 3 bas sort. La Hongrie elle-même (variante 5) joue un croisé arrière-arrière: sur une passe du demi-centre, l'arrière droit s'engage au centre pour profiter de l'écran du pivot, fait sortir un 3, et passe à l'arrière gauche qui croise avec lui et contourne le bloc central grâce au bloc du pivot sur ce 3.",
        'Voir aussi "Double croisé".',
      ],
      objectif: "Attirer la défense d'un côté par deux croisés successifs pour attaquer à l'opposé.",
      pointsCles: [
        "Les deux croisés vont vers l'extérieur et entraînent la défense.",
        "L'ailier donne vite à l'arrière opposé, lancé.",
        "Le demi-centre et l'ailier se replacent tout de suite pour la suite.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: "D. Fleurance, Le réseau d'échange sur la base arrière (Approches du Handball n°151, 2016)",
          url: 'https://www.calameo.com/ffhandball/read/007275111735cfdd874e5?page=45',
          note: "\"Le double croisé extérieur mobilise la défense d'un côté pour ensuite libérer à l'opposé un joueur sur un plus grand espace\" (pp. 45-46); variantes Slovénie - Hongrie.",
        },
      ],
      ballon: 'ArD',
      depart: { AiG: [-9.4, 0.8], AiD: [9.4, 0.8], ArG: [-6.4, 9.6], ArD: [6.0, 9.6], Piv: [3.4, 6.5] },
      variantes: [
        {
          nom: "1 - L'arrière gauche déborde à l'opposé",
          etapes: [
            ...DCE_BASE,
            {
              texte: "L'ailier donne à l'arrière gauche, à l'opposé, lancé. Le demi-centre et l'ailier se replacent; l'arrière droit, au centre, devient demi-centre.",
              courses: {
                ArG: [-4.4, 8.8],
                AiD: { vers: [9.2, 1.4], via: [8.6, 6.0] },
                DC: [5.6, 9.4],
                ArD: [-0.8, 9.6],
              },
              passe: ['AiD', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche déborde son adversaire par l'intérieur, sur un grand espace, et tire. L'arrière droit s'apprête à croiser avec lui.",
              courses: { ArG: [-2.8, 7.9], ArD: [-1.2, 9.4] },
              tir: { par: 'ArG', t: 0.6 },
              def: { G2: [-4.2, 6.4], G3: [-1.2, 7.2] },
            },
          ],
        },
        {
          nom: "2 - Passe au pivot dans l'espace 2-3 droit",
          etapes: [
            ...DCE_BASE,
            {
              texte: "Le 3 et le 2 droits se sont écartés: l'ailier, au centre, donne au pivot placé dans l'espace 2-3 droit.",
              courses: { Piv: [4.0, 6.4] },
              passe: ['AiD', 'Piv', 0.4],
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
        {
          nom: '3 - Contre la Hongrie: permutation puis croisé, tir',
          ballon: 'DC',
          depart: DCE_STD,
          etapes: [
            ...HONGRIE_PERMUT,
            {
              texte: "L'arrière droit profite de la désorganisation autour du pivot: il attaque entre le 3 gauche et le pivot et tire.",
              courses: { ArD: [-1.0, 8.2] },
              tir: { par: 'ArD', t: 0.5 },
              def: { G3: [-1.6, 7.4] },
            },
          ],
        },
        {
          nom: '4 - Contre la Hongrie: le 3 sort, pivot',
          ballon: 'DC',
          depart: DCE_STD,
          etapes: [
            ...HONGRIE_PERMUT,
            {
              texte: "Le 3 gauche sort sur l'arrière droit: il donne au pivot.",
              courses: { ArD: [-1.0, 8.4], Piv: [-0.6, 6.3] },
              passe: ['ArD', 'Piv', 0.4],
              def: { G3: [-1.2, 7.5] },
            },
            { texte: 'Le pivot tire.', tir: { par: 'Piv', t: 0.2 } },
          ],
        },
        {
          nom: '5 - Hongrie: croisé arrière-arrière autour du bloc du pivot',
          ballon: 'DC',
          depart: DCE_STD,
          etapes: [
            {
              texte: "Sur une passe du demi-centre, l'arrière droit s'engage au centre pour profiter de l'écran du pivot. Le 3 droit sort sur lui.",
              courses: { ArD: [1.2, 8.6] },
              passe: ['DC', 'ArD', 0.1],
              def: { D3: [1.0, 7.6] },
            },
            {
              texte: "L'arrière gauche croise derrière lui vers la droite et reçoit. Le pivot bloque le 3 droit sorti.",
              courses: {
                ArD: [0.4, 8.4],
                ArG: { vers: [2.4, 9.2], via: [-1.4, 10.6] },
                Piv: { vers: [2.0, 7.0], ecran: true },
              },
              passe: ['ArD', 'ArG', 0.55],
            },
            {
              texte: "L'arrière gauche contourne le bloc central, à l'extérieur du bloc du pivot, et tire.",
              courses: { ArG: [3.2, 8.0] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D2: [4.2, 6.6] },
            },
          ],
        },
      ],
    },
  );
})();
