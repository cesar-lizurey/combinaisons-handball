/* Lot 7b: systèmes nommés II (suite): enclenchements français (Approches du Handball), combinaisons tchèques (Kubišová 2020), jargon espagnol ("la rusa", "la sueca"...), écoles nationales (paravan, rideau). */
(() => {
  /* ---------- Outils ---------- */
  // Version miroir d'une suite d'étapes (gauche <-> droite); les textes sont fournis à part.
  const MIROIR_IDS = {
    AiG: 'AiD', AiD: 'AiG', ArG: 'ArD', ArD: 'ArG', G1: 'D1', D1: 'G1', G2: 'D2', D2: 'G2', G3: 'D3', D3: 'G3',
  };
  const mId = id => MIROIR_IDS[id] || id;
  const mPt = ([x, y]) => [-x, y];
  const mCourse = c => (Array.isArray(c) ? mPt(c) : { ...c, vers: mPt(c.vers), ...(c.via ? { via: mPt(c.via) } : {}) });
  const mObj = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [mId(k), mCourse(v)]));
  const miroir = (etapes, textes) => etapes.map((e, i) => {
    const r = { ...e, texte: textes[i] };
    if (e.courses) r.courses = mObj(e.courses);
    if (e.def) r.def = mObj(e.def);
    if (e.passe) r.passe = [mId(e.passe[0]), mId(e.passe[1]), ...e.passe.slice(2)];
    if (e.tir) {
      r.tir = typeof e.tir === 'string' ? mId(e.tir)
        : { ...e.tir, par: mId(e.tir.par), ...(e.tir.cible ? { cible: mPt(e.tir.cible) } : {}) };
    }
    if (e.enLAir) r.enLAir = e.enLAir.map(mId);
    return r;
  });
  const mDepart = d => mObj(d);

  /* ---------- Sources communes ---------- */
  const KUBISOVA = note => ({
    titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál v mužské a ženské házené (mémoire, Université Charles de Prague, 2020)',
    url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
    note,
  });
  const PORTES_147 = note => ({
    titre: 'A. Portes, "Portes cible les défenses adverses" (Approches du Handball n°147, mai 2015)',
    url: 'https://www.calameo.com/ffhandball/read/00727511117a5fff28271?page=4',
    note,
  });
  const FORUM_JUGADAS = note => ({
    titre: 'Fil "jugadas" (forum Lo + Balonmano, "La Pizarra", Luckistar, 2006)',
    url: 'https://balonmano.mforos.com/142972/4655680-jugadas/',
    note,
  });
  const FORUM_RUSA = note => ({
    titre: 'Fil "la rusa" (forum Lo + Balonmano, "La Pizarra", 2003)',
    url: 'https://balonmano.mforos.com/142972/889635-la-rusa/',
    note,
  });
  const ROMAN_2015 = note => ({
    titre: 'J. D. Román Seco, Actualización histórica de la evolución del juego en balonmano en el siglo XX (e-balonmano.com 11(1), 2015)',
    url: 'http://ojs.e-balonmano.com/index.php/revista/article/viewFile/182/172',
    note,
  });

  /* ---------- Étapes partagées ---------- */

  // Moulinette (L. Bezeau): passe de la DC et croisé arrière / ailière, côté gauche.
  const MOUL_DEBUT = {
    texte: "La demi-centre passe à l'arrière gauche, qui s'engage vers l'intervalle entre la 1 et la 2 gauches. L'ailière gauche sort de son coin.",
    courses: { ArG: [-6.0, 8.0], AiG: [-8.6, 3.6] },
    passe: ['DC', 'ArG', 0.1],
    def: { G2: [-5.6, 6.2], G1: [-7.6, 2.6] },
  };
  const MOUL_CROISE = [
    MOUL_DEBUT,
    {
      texte: "Croisé arrière / ailière: l'ailière passe dans le dos de l'arrière, vers l'intérieur, et reçoit le ballon. L'arrière continue vers l'aile. La 3 droite glisse vers le centre.",
      courses: { AiG: { vers: [-3.6, 9.0], via: [-7.8, 10.6] }, ArG: [-7.2, 6.6] },
      passe: ['ArG', 'AiG', 0.55],
      def: { G2: [-6.2, 5.4], G3: [-2.6, 7.4], D3: [0.6, 7.2] },
    },
  ];
  const MOUL_DC = {
    texte: "L'ailière, sortie du croisé, joue avec la demi-centre: elle attaque la 3 gauche et lui passe. L'arrière gauche se replace vite à son poste.",
    courses: { AiG: [-2.6, 8.2], DC: [0.4, 9.6], ArG: [-5.6, 9.4] },
    passe: ['AiG', 'DC', 0.5],
    def: { G3: [-2.4, 7.2], G2: [-5.2, 5.6] },
  };

  // Norsko: base commune (côté gauche).
  const NORSKO_DEBUT = [
    {
      texte: "L'arrière gauche passe à son ailier. Au même moment, le demi-centre s'élance vers le poste d'arrière gauche.",
      courses: { AiG: [-8.6, 2.6], ArG: [-5.4, 9.0], DC: { vers: [-4.0, 10.6], via: [-2.0, 11.2] } },
      passe: ['ArG', 'AiG', 0.1],
    },
    {
      texte: "Le demi-centre passe dans le dos de l'arrière gauche et reçoit la passe de l'ailier. L'arrière gauche, après sa passe, glisse au poste de demi-centre.",
      courses: {
        DC: { vers: [-6.2, 9.2], via: [-5.6, 10.8] },
        ArG: { vers: [-0.6, 9.8], via: [-3.0, 9.0] },
      },
      passe: ['AiG', 'DC', 0.6],
    },
  ];
  const NORSKO_FIXE = (ArG = [-0.6, 9.6]) => ({
    texte: "Sur le poste d'arrière gauche, le demi-centre fixe: il attaque l'intervalle entre le 2 et le 3 gauches pour attirer un second défenseur, puis passe à l'arrière gauche, devenu demi-centre.",
    courses: { DC: [-4.4, 8.2], ArG },
    passe: ['DC', 'ArG', 0.65],
    def: { G2: [-4.8, 6.6], G3: [-3.0, 7.2] },
  });

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'moulinette',
      nom: 'Moulinette',
      alias: 'mouvement programmé "moulinette" (L. Bezeau, Brest Bretagne Handball)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Croisé arrière / ailière sur la passe de la demi-centre, puis jeu de l'ailière avec la demi-centre, qui renverse; la pivot, placée à l'opposé, peut glisser dans le dos de la défense.",
      description: [
        "Mouvement programmé présenté par Laurent Bezeau (Brest Bretagne Handball, équipe féminine) dans un article sur le jeu rapide en attaque placée. La pivot se place entre la 2 et la 3, du côté opposé au croisé. Sur la passe de la demi-centre, l'arrière et l'ailière de ce côté jouent un croisé.",
        "L'arrière peut exploiter tout de suite l'espace extérieur avec son ailière si la défenseuse n°1 flotte (variante 1). Sinon, l'ailière sortie du croisé joue avec la demi-centre, qui renverse vers l'arrière opposée (variante 2) ou vers l'arrière du même côté, replacée rapidement (variante 3). À la sortie du premier croisé, la pivot peut glisser dans le dos des défenseuses (variante 4).",
        "Le texte est clair mais les schémas n'ont pas été vus: le sens exact des courses du croisé (l'arrière vers l'extérieur, l'ailière vers l'intérieur dans son dos) est déduit. Le jeu est montré côté gauche. Voir aussi le croisé avec renversement (fiche \"Renversé\").",
      ],
      objectif: "Enchaîner vite un croisé extérieur et un renversement pour attaquer une défense qui n'a pas eu le temps de se réorganiser.",
      pointsCles: [
        "Le croisé se déclenche sur la passe de la demi-centre, sans temps mort.",
        "L'arrière lit la n°1: si elle flotte, le 2 contre 1 extérieur avec l'ailière est immédiat.",
        "Après le croisé, l'arrière se replace vite pour redevenir une solution.",
        "La pivot, à l'opposé, attend la sortie du croisé pour glisser.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'L. Bezeau, "Le jeu rapide en attaque placée" (Approches des Handballs n°203, août 2024)',
          url: 'https://www.centre-handball.com/wp-content/uploads/2024/09/Approches_n203_AOUT-2024.pdf',
          note: "\"Sur la passe de la demi-centre, croisé arrière / ailière\"; pivot entre la poste 2 et la poste 3 du côté opposé; la DC joue ensuite avec l'arrière opposée ou l'arrière replacée; la pivot peut glisser dans le dos des défenseurs.",
        },
      ],
      ballon: 'DC',
      depart: { Piv: [3.3, 6.5] },
      variantes: [
        {
          nom: '1 - La 1 flotte: 2 contre 1 extérieur',
          etapes: [
            MOUL_DEBUT,
            {
              texte: "La 1 gauche flotte et monte vers l'arrière. L'arrière gauche donne aussitôt à l'ailière, restée large.",
              courses: { AiG: [-9.0, 2.0], ArG: [-6.2, 7.6] },
              passe: ['ArG', 'AiG', 0.4],
              def: { G1: [-7.0, 4.8] },
            },
            {
              texte: "L'ailière gauche tire depuis l'aile.",
              courses: { AiG: [-8.6, 2.4] },
              tir: { par: 'AiG', t: 0.4 },
            },
          ],
        },
        {
          nom: "2 - Renversement vers l'arrière opposée",
          etapes: [
            ...MOUL_CROISE,
            MOUL_DC,
            {
              texte: "La demi-centre renverse vers l'arrière droite, qui s'engage entre la 3 et la 2 droites.",
              courses: { ArD: [4.0, 8.6], DC: [0.8, 9.6] },
              passe: ['DC', 'ArD', 0.3],
              def: { D3: [2.2, 7.2], D2: [4.8, 6.1] },
            },
            {
              texte: "L'arrière droite tire.",
              courses: { ArD: [3.8, 8.2] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: "3 - Renversement vers l'arrière replacée",
          etapes: [
            ...MOUL_CROISE,
            MOUL_DC,
            {
              texte: "La demi-centre rend à l'arrière gauche, replacée, qui attaque l'intervalle entre la 2 et la 3 gauches. L'ailière regagne son aile.",
              courses: { ArG: [-4.2, 8.4], AiG: { vers: [-8.8, 1.6], via: [-6.6, 7.0] } },
              passe: ['DC', 'ArG', 0.3],
              def: { G2: [-4.8, 6.4], G3: [-2.6, 7.0] },
            },
            {
              texte: "L'arrière gauche tire.",
              courses: { ArG: [-4.0, 8.0] },
              tir: { par: 'ArG', t: 0.4 },
            },
          ],
        },
        {
          nom: '4 - La pivot glisse dans le dos',
          etapes: [
            ...MOUL_CROISE,
            {
              texte: "À la sortie du croisé, la pivot glisse dans le dos des défenseuses, vers l'intervalle entre la 3 et la 2 gauches. L'ailière attire la 3 gauche puis lui passe.",
              courses: { Piv: { vers: [-3.6, 6.3], via: [0, 6.0] }, AiG: [-3.0, 8.6] },
              passe: ['AiG', 'Piv', 0.65],
              def: { G3: [-2.4, 7.6] },
            },
            {
              texte: "La pivot tire.",
              tir: { par: 'Piv', t: 0.3 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'ciseaux-a-droite',
      nom: 'Le Ciseaux à droite',
      alias: 'Ciseaux (entrainement-handball.fr)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "L'ailier droit vient chercher le ballon au centre et croise avec l'arrière gauche; renversement sur la demi-centre décalée à gauche, bloc du pivot sur le 3 et l'ailier plonge seul à 6 m.",
      description: [
        "Fiche du site entrainement-handball.fr (\"8 combinaisons pour un tir facile à 6 m\"), pour soulager les tireurs de loin et faire entrer les ailiers dans le jeu. Le pivot est appuyé sur le 2 gauche. La demi-centre s'engage sans forcer, donne à l'ailier droit venu au centre, puis s'écarte vers la gauche, près de la défense.",
        "L'ailier droit donne à l'arrière gauche, qui arrive fort au centre, et continue sa course dans son dos (les \"ciseaux\"). L'arrière gauche s'arrête et renverse sur l'ancienne demi-centre. Le pivot vient bloquer le 3 gauche. La nouvelle arrière gauche fixe vers l'extérieur et sert l'ailier, qui plonge seul dans l'intervalle 2-3.",
        "Le texte a été lu sur une image de petite taille: le sens général est sûr, quelques mots sont incertains. La vidéo de la fiche n'a pas été vue.",
      ],
      objectif: "Amener l'ailier opposé, hors de son secteur, seul face au but entre le 2 et le 3.",
      pointsCles: [
        "La course de l'ailier est protégée derrière l'arrière gauche: il est moins emporté vers l'extérieur au moment du tir.",
        "L'ancienne demi-centre doit fixer vers l'extérieur avant de glisser le ballon.",
        "Le bloc du pivot sur le 3 arrive au bon moment, sans faute d'attaque, pour l'empêcher de fermer.",
        "Attention à l'interception sur le renversement.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'Le Ciseaux à droite (entrainement-handball.fr, fiche "8 combis pour un tir facile à 6 m")',
          url: 'https://www.entrainement-handball.fr/wp-content/uploads/2018/04/8-combis-pour-un-tir-facile-a-6m4_450px.png',
          note: "\"Le nouvel arrière gauche (l'ancien DC) fixe extérieur et passe à l'ALD qui plonge dans l'intervalle et se retrouve seul à 6 m.\"",
        },
        {
          titre: 'Vidéo de la combinaison (entrainement-handball.fr)',
          url: 'https://www.entrainement-handball.fr/wp-content/uploads/2018/04/combi_2_ciseaux_droite.mp4',
          note: 'Vidéo jointe à la fiche (non visionnée).',
        },
      ],
      ballon: 'DC',
      depart: { Piv: [-3.7, 6.2] },
      etapes: [
        {
          texte: "La demi-centre s'engage sans forcer dans le secteur central. L'ailier droit vient chercher le ballon au centre; elle lui passe.",
          courses: { DC: [-0.4, 9.2], AiD: { vers: [1.8, 9.8], via: [7.8, 8.4] }, ArD: [6.2, 9.6] },
          passe: ['DC', 'AiD', 0.7],
          def: { D3: [1.4, 7.2] },
        },
        {
          texte: "La demi-centre s'écarte vers la gauche, près de la défense. L'arrière gauche arrive fort dans le secteur central; l'ailier droit lui donne le ballon et continue sa course en passant dans son dos.",
          courses: {
            DC: [-5.0, 7.8],
            ArG: { vers: [-0.6, 9.0], via: [-3.0, 10.4] },
            AiD: { vers: [-2.4, 10.2], via: [0.4, 10.8] },
          },
          passe: ['AiD', 'ArG', 0.45],
          def: { G3: [-1.4, 7.4], D3: [1.2, 7.0] },
        },
        {
          texte: "L'arrière gauche stoppe sa course et renverse sur l'ancienne demi-centre, restée près de la défense. En même temps, le pivot quitte le 2 et vient bloquer le 3 gauche; l'ailier droit continue sa course.",
          courses: { Piv: { vers: [-2.7, 6.4], ecran: true }, AiD: [-3.8, 8.8], ArG: [-0.4, 9.2] },
          passe: ['ArG', 'DC', 0.2],
          def: { G3: [-1.8, 6.9] },
        },
        {
          texte: "La nouvelle arrière gauche fixe vers l'extérieur: le 2 gauche sort sur elle. Elle glisse le ballon à l'ailier droit, qui plonge dans l'intervalle entre le 2 et le 3.",
          courses: { DC: [-5.6, 7.6], AiD: [-3.9, 6.9] },
          passe: ['DC', 'AiD', 0.5],
          def: { G2: [-5.4, 6.2] },
        },
        {
          texte: "Seul à 6 m, l'ailier droit tire.",
          courses: { AiD: [-3.7, 6.5] },
          tir: { par: 'AiD', t: 0.3 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'isoler-defenseur-central',
      nom: 'Isoler un défenseur central',
      alias: 'enclenchement "isoler" de l\'équipe de France féminine (P. Carrara, 2015); "Isoler un défenseur" (A. Portes)',
      categorie: 'Jeu avec le pivot',
      defense: '0-6',
      resume: "Deux pivots écartés dans les intervalles 1-2, l'arrière gauche éloigne la 3 gauche: la meilleure joueuse de duel attaque la 3 droite isolée, puis passe à rebond à l'arrière droite.",
      description: [
        "Enclenchement de l'équipe de France féminine (France - Slovénie 2015), analysé par Philippe Carrara: il \"vise à isoler une des moins bonnes défenseurs et d'y opposer en face une de nos meilleures joueuses de duel\". La pivot se place entre la 1 et la 2 d'un côté; l'ailière opposée entre en temps faible pour devenir seconde pivot entre la 1 et la 2 de l'autre côté.",
        "L'ailière gauche manœuvre autour de la seconde pivot (feinte de bloc-débloc). La défense se scinde: quatre défenseuses d'un côté, deux de l'autre (une sur la pivot, l'ailière défensive en stricte sur l'arrière droite). L'arrière gauche fixe la 3 gauche le plus loin possible de l'autre 3; la demi-centre attaque la 3 droite isolée côté bras; l'arrière droite, qui a joué intérieur-extérieur, reçoit une passe à rebond dans le dos de sa défenseuse et lobe la gardienne.",
        "Alain Portes décrit le même principe (\"2 pivots externes en commençant par une entrée d'ailière; [...] la n°3 devient isolée\"). Les côtés sont déduits des photos. Remarque de l'analyse: la pivot aurait dû rester à 6 m pour attirer la n°2 vers l'extérieur; l'arrière gauche doit garder son orientation vers le but pour empêcher le flottement.",
      ],
      objectif: "Créer un 1 contre 1 entre la meilleure joueuse de duel et une défenseuse centrale isolée.",
      pointsCles: [
        "Les deux pivots restent à 6 m, écartés dans les intervalles 1-2.",
        "L'entrée de l'ailière se fait en temps faible.",
        "L'ailière gauche manœuvre en mangeant le moins d'espace possible.",
        "L'arrière gauche fixe la 3 gauche loin de l'autre 3, orientée vers le but.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'P. Carrara, "Comment isoler un défenseur" (Approches du Handball n°148, juillet 2015)',
          url: 'https://www.calameo.com/ffhandball/read/007275111bdb8008833ee?page=22',
          note: "\"Un enclenchement qui vise à isoler une des moins bonnes défenseurs et d'y opposer en face une de nos meilleures joueuses de duel.\"",
        },
        PORTES_147("\"Isoler un défenseur\": 2 pivots externes en commençant par une entrée d'ailière; la libération de balle de l'ailière donne une situation favorable à la DC car la n°3 devient isolée."),
      ],
      ballon: 'DC',
      depart: { Piv: [6.6, 4.4] },
      etapes: [
        {
          texte: "La pivot est entre la 1 et la 2 droites. L'ailière droite quitte son aile en temps faible et traverse devant la défense. L'arrière droite s'écarte; la 1 droite, sans ailière à garder, la suit en stricte. La demi-centre donne à l'arrière gauche.",
          courses: { AiD: { vers: [0.6, 8.2], via: [6.6, 8.6] }, ArD: [7.4, 8.6] },
          passe: ['DC', 'ArG', 0.3],
          def: { D1: [7.2, 7.0], D2: [5.6, 5.4] },
        },
        {
          texte: "L'ailière droite continue jusqu'entre la 1 et la 2 gauches: elle devient seconde pivot. L'arrière gauche passe à l'ailière gauche.",
          courses: { AiD: { vers: [-6.6, 4.4], via: [-4.0, 8.4] }, AiG: [-8.8, 2.2] },
          passe: ['ArG', 'AiG', 0.3],
        },
        {
          texte: "L'ailière gauche manœuvre autour de la seconde pivot en feintant un bloc-débloc. La défense se scinde: quatre défenseuses à gauche et au centre, deux à droite (la 2 sur la pivot, la 1 en stricte sur l'arrière droite).",
          courses: { AiG: [-8.4, 4.2] },
          def: { G1: [-7.6, 2.8], G2: [-5.2, 5.6], G3: [-2.4, 6.8], D3: [0.6, 6.9] },
        },
        {
          texte: "L'ailière gauche rend à l'arrière gauche, qui attaque et fixe la 3 gauche le plus loin possible de l'autre 3. La 3 droite se retrouve isolée au centre.",
          courses: { ArG: [-3.6, 8.0] },
          passe: ['AiG', 'ArG', 0.2],
          def: { G3: [-3.0, 7.1], G2: [-4.8, 5.8] },
        },
        {
          texte: "L'arrière gauche passe à la demi-centre, joueuse de duel, qui attaque la 3 droite côté bras. Pendant ce temps, l'arrière droite fait un appel vers l'intérieur pour tromper sa défenseuse.",
          courses: { DC: [1.0, 8.4], ArD: [5.8, 9.0] },
          passe: ['ArG', 'DC', 0.2],
          def: { D3: [1.2, 7.3], D1: [5.6, 7.6] },
        },
        {
          texte: "L'arrière droite repart vers l'extérieur. La demi-centre lui fait une passe à rebond dans le dos de sa défenseuse.",
          courses: { ArD: [7.2, 6.6], DC: [1.2, 8.2] },
          passe: ['DC', 'ArD', 0.5],
          def: { D1: [6.2, 7.6] },
        },
        {
          texte: "L'arrière droite ouvre l'angle et lobe la gardienne.",
          courses: { ArD: [6.8, 6.0] },
          tir: { par: 'ArD', t: 0.4, cible: [0.6, -0.35] },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'norsko',
      nom: 'Norvège',
      alias: 'Norsko (CZ)',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-6',
      resume: "Sur la passe de l'arrière à son ailier, le demi-centre passe dans son dos et reçoit au poste d'arrière; l'arrière glisse au centre et conclut.",
      description: [
        "Combinaison \"sur signal\" relevée dans le championnat tchèque (mémoire de K. Kubišová, 2020); \"Norsko\" est un nom de vestiaire (\"Norvège\"). Contre 0-6, le pivot est entre les deux défenseurs centraux. L'arrière gauche passe à son ailier; à ce moment, le demi-centre court vers le poste d'arrière, passe dans son dos et reçoit de l'ailier. L'arrière glisse au poste de demi-centre.",
        "Le demi-centre fixe et cherche à attirer un second défenseur, puis passe; l'arrière devenu demi-centre \"résout la situation\": tir, 1 contre 1, passe au pivot ou à l'autre arrière (variante 1: tir).",
        "Variantes observées: à Most, l'arrière reste moins centrée et attaque le défenseur central le plus proche; elle tire s'il ne sort pas, sinon elle passe (variante 2, passe au pivot: notre choix). À Písek, avec le pivot entre le 2 et le 3, on joue vers le pivot (variante 3); contre une défense individuelle, la joueuse marquée se place d'abord au poste de demi-centre et se libère en passant dans le dos de l'arrière (variante 4, défenseuse individuelle figurée par le 3 droit).",
      ],
      objectif: "Changer les rôles de l'arrière et du demi-centre pour que la défense perde ses repères.",
      pointsCles: [
        "Le demi-centre démarre au moment où l'arrière passe à l'ailier.",
        "Il passe au ras, dans le dos de l'arrière.",
        "Sur le poste d'arrière, il fixe vraiment pour attirer un second défenseur.",
      ],
      fiabilite: 'sourcee',
      sources: [
        KUBISOVA('"Ve chvíli, kdy spojka přihrává křídlu, rozebíhá se střední spojka na místo levé spojky, podběhne ji, a v tu chvíli dostává míč od křídla. Krajní spojka se po odhození míče posouvá na pozici střední spojky." (p. 30; variantes de Most et Písek).'),
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Base: tir du nouveau demi-centre',
          etapes: [
            ...NORSKO_DEBUT,
            NORSKO_FIXE(),
            {
              texte: "L'arrière gauche, devenue demi-centre, résout la situation: ici, tir à mi-distance.",
              courses: { ArG: [-0.4, 9.0] },
              tir: { par: 'ArG', t: 0.5 },
              def: { D3: [0.8, 7.4] },
            },
          ],
        },
        {
          nom: '2 - Most: attaque du défenseur central',
          etapes: [
            ...NORSKO_DEBUT,
            NORSKO_FIXE([-2.0, 9.6]),
            {
              texte: "Restée moins centrée, l'arrière gauche attaque tout de suite le défenseur central le plus proche, le 3 gauche. S'il ne sort pas, elle tire; ici, il sort sur elle.",
              courses: { ArG: [-1.8, 8.4] },
              def: { G3: [-1.8, 7.4] },
            },
            {
              texte: "Elle passe au pivot, libre dans le dos du 3.",
              courses: { Piv: [-0.6, 6.4] },
              passe: ['ArG', 'Piv', 0.3],
            },
            {
              texte: "Le pivot tire.",
              tir: { par: 'Piv', t: 0.3 },
            },
          ],
        },
        {
          nom: '3 - Písek: pivot entre le 2 et le 3',
          depart: { Piv: [-3.4, 6.4] },
          etapes: [
            ...NORSKO_DEBUT,
            NORSKO_FIXE(),
            {
              texte: "L'arrière gauche, devenue demi-centre, attaque le 3 gauche, qui sort sur elle.",
              courses: { ArG: [-1.4, 8.6] },
              def: { G3: [-1.8, 7.6] },
            },
            {
              texte: "Elle joue vers le pivot, qui prend l'espace laissé par le 3.",
              courses: { Piv: [-2.6, 6.4] },
              passe: ['ArG', 'Piv', 0.3],
            },
            {
              texte: "Le pivot tire.",
              tir: { par: 'Piv', t: 0.3 },
            },
          ],
        },
        {
          nom: '4 - Písek contre défense individuelle',
          depart: { D3: [0.5, 9.6] },
          etapes: [
            {
              texte: "La joueuse marquée en individuelle (ici la demi-centre, suivie par le 3 droit) se place d'abord au poste de demi-centre. L'arrière gauche passe à son ailier; la demi-centre s'élance vers le poste d'arrière gauche.",
              courses: { AiG: [-8.6, 2.6], ArG: [-5.4, 9.0], DC: { vers: [-4.0, 10.6], via: [-2.0, 11.2] } },
              passe: ['ArG', 'AiG', 0.1],
              def: { D3: [-2.8, 10.0] },
            },
            {
              texte: "La demi-centre passe au ras, dans le dos de l'arrière gauche, qui fait écran avec son corps: la défenseuse individuelle reste bloquée. L'ailier sert la demi-centre, libre.",
              courses: { DC: { vers: [-6.2, 9.2], via: [-5.6, 10.8] }, ArG: { vers: [-4.3, 9.6], ecran: true } },
              passe: ['AiG', 'DC', 0.6],
              def: { D3: [-3.4, 10.0] },
            },
            {
              texte: "Libre, la demi-centre attaque et tire. L'arrière gauche glisse au centre.",
              courses: { DC: [-5.6, 8.4], ArG: [-1.0, 9.8] },
              tir: { par: 'DC', t: 0.6 },
              def: { D3: [-4.4, 9.4], G2: [-5.2, 6.6] },
            },
          ],
        },
      ],
    },
  );

  /* ================================================================== */
  /* Combinaisons tchèques (suite)                                       */
  /* ================================================================== */

  // Rozehrávka: croisé DC / ailière gauche puis arrière gauche / ailière droite.
  const ROZE_BASE = [
    {
      texte: "L'arrière gauche passe au demi-centre, qui part en arc vers la zone du 2 gauche. L'ailière gauche sort de son coin vers la même zone. L'arrière gauche glisse vers le centre.",
      courses: {
        DC: { vers: [-3.4, 8.8], via: [-1.6, 9.8] },
        AiG: [-7.8, 5.4],
        ArG: { vers: [-0.6, 10.6], via: [-3.6, 11.2] },
      },
      passe: ['ArG', 'DC', 0.1],
    },
    {
      texte: "Croisé demi-centre / ailière: l'ailière passe dans le dos du demi-centre, vers l'intérieur, et reçoit le ballon. Le demi-centre continue vers l'aile.",
      courses: { AiG: { vers: [-3.0, 9.6], via: [-6.6, 10.6] }, DC: [-5.8, 7.6] },
      passe: ['DC', 'AiG', 0.55],
      def: { G2: [-5.6, 6.2], G3: [-2.6, 7.2] },
    },
    {
      texte: "L'ailière passe à l'arrière gauche, arrivée au centre. Le demi-centre remonte au poste d'arrière gauche.",
      courses: { ArG: [-0.2, 10.2], DC: [-5.6, 9.6] },
      passe: ['AiG', 'ArG', 0.2],
      def: { G2: [-5.0, 5.4], G3: [-1.7, 6.8] },
    },
    {
      texte: "L'arrière gauche fait la même course, en arc vers la zone du 2 droit. L'ailière droite sort de son coin. L'arrière droite glisse vers le centre. L'ailière gauche regagne son coin.",
      courses: {
        ArG: { vers: [3.4, 8.8], via: [1.6, 9.8] },
        AiD: [7.8, 5.4],
        ArD: { vers: [0.6, 10.6], via: [3.6, 11.2] },
        AiG: { vers: [-8.8, 1.6], via: [-7.2, 8.4] },
      },
    },
    {
      texte: "Second croisé, avec l'ailière droite: elle passe dans le dos de l'arrière gauche et reçoit le ballon. L'arrière gauche continue vers l'aile droite.",
      courses: { AiD: { vers: [3.0, 9.6], via: [6.6, 10.6] }, ArG: [5.8, 7.6] },
      passe: ['ArG', 'AiD', 0.55],
      def: { D2: [5.6, 6.2], D3: [2.6, 7.2] },
    },
    {
      texte: "L'ailière droite passe à son arrière, arrivée à son tour au centre, puis regagne son coin.",
      courses: { ArD: [0.2, 10.0], AiD: { vers: [8.8, 1.6], via: [7.4, 8.4] } },
      passe: ['AiD', 'ArD', 0.15],
      def: { D2: [5.0, 5.4], D3: [1.7, 6.8] },
    },
  ];

  // Most "Kombinace č.5": début commun.
  const MOST_BASE = [
    {
      texte: "L'ailière gauche sort et court le long de la défense, sur la ligne des 9 m. Devant la 2 gauche, elle reçoit de la demi-centre.",
      courses: { AiG: { vers: [-4.4, 8.8], via: [-8.6, 7.6] } },
      passe: ['DC', 'AiG', 0.7],
      def: { G2: [-4.8, 6.2] },
    },
    {
      texte: "La pivot sort à sa rencontre: croisé ailière / pivot avec échange du ballon. En même temps, la demi-centre glisse vers le poste d'arrière gauche, et l'arrière gauche presque jusqu'au poste d'ailière.",
      courses: {
        AiG: [-1.6, 7.8],
        Piv: { vers: [-3.2, 9.4], via: [0.6, 9.8] },
        DC: [-5.4, 10.2],
        ArG: [-8.0, 4.6],
      },
      passe: ['AiG', 'Piv', 0.6],
      def: { G3: [-2.0, 6.9] },
    },
    {
      texte: "Avant de rentrer, la pivot passe à la demi-centre. Puis les deux joueuses se placent dans la défense, près des défenseuses n°2: la pivot à gauche, l'ailière à droite. L'équipe joue avec deux pivots.",
      courses: { Piv: [-3.6, 6.4], AiG: { vers: [3.8, 6.3], via: [1.2, 8.2] } },
      passe: ['Piv', 'DC', 0.15],
      def: { G2: [-5.0, 5.4] },
    },
    {
      texte: "La demi-centre attaque légèrement vers le centre et croise avec l'arrière droite, qui passe dans son dos et reçoit.",
      courses: { DC: [-1.4, 9.0], ArD: { vers: [-3.0, 9.6], via: [0.4, 11.0] } },
      passe: ['DC', 'ArD', 0.7],
      def: { G3: [-1.6, 7.6] },
    },
    {
      texte: "L'arrière droite enchaîne un second croisé avec l'arrière gauche, qui ressort du poste d'ailière et passe dans son dos vers le centre. La demi-centre continue vers le poste d'arrière droite.",
      courses: {
        ArD: [-4.8, 8.2],
        ArG: { vers: [-2.2, 9.2], via: [-6.6, 10.8] },
        DC: { vers: [4.8, 9.6], via: [1.6, 10.8] },
      },
      passe: ['ArD', 'ArG', 0.7],
      def: { G3: [-2.0, 7.2], G2: [-4.8, 6.0] },
    },
  ];

  // Linz: croisé ailier / arrière (début commun).
  const LINZ_DEBUT = [
    {
      texte: "Le demi-centre passe à l'arrière gauche. L'ailier gauche sort de son coin et vient contourner l'arrière.",
      courses: { ArG: [-5.2, 8.8], AiG: [-8.2, 6.0] },
      passe: ['DC', 'ArG', 0.1],
    },
    {
      texte: "Croisé ailier / arrière: l'ailier passe dans le dos de l'arrière et reçoit en se croisant avec lui. L'arrière poursuit vers l'extérieur.",
      courses: { AiG: { vers: [-3.2, 9.4], via: [-6.8, 10.8] }, ArG: [-7.0, 7.4] },
      passe: ['ArG', 'AiG', 0.55],
      def: { G2: [-5.4, 5.8], G3: [-2.4, 7.2] },
    },
  ];
  const LINZ_BASE = [
    ...LINZ_DEBUT,
    {
      texte: "L'ailier passe au demi-centre et poursuit sa course dans la défense jusqu'au niveau de l'autre arrière: il devient second pivot, entre le 3 et le 2 droits.",
      courses: { AiG: { vers: [3.6, 6.4], via: [0.4, 7.8] }, DC: [-0.6, 10.0] },
      passe: ['AiG', 'DC', 0.15],
      def: { G3: [-1.7, 6.8], D2: [5.0, 5.4] },
    },
    {
      texte: "Le demi-centre attend que l'ailier soit placé, puis s'élance en dribble vers le 2 gauche. Devant lui, il croise avec l'arrière gauche, qui passe dans son dos et reçoit.",
      courses: { DC: [-4.2, 8.4], ArG: { vers: [-2.4, 9.6], via: [-6.2, 10.6] } },
      passe: ['DC', 'ArG', 0.75],
      def: { G2: [-4.8, 6.4], G3: [-2.8, 7.2] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'parize',
      nom: 'Paris',
      alias: 'Paříž (CZ)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Le demi-centre passe à l'arrière opposé et file au poste d'arrière gauche; l'arrière gauche arrive en arc au centre et reçoit.",
      description: [
        "Combinaison \"sur signal\" du championnat tchèque (mémoire de K. Kubišová, 2020), jouée contre 0-6 avec le pivot entre les deux défenseurs centraux. Le demi-centre passe à l'arrière du côté opposé à celui pour qui la combinaison est jouée, puis va occuper le poste de l'autre arrière. En même temps, cet arrière arrive en arc (\"obloukem\") au poste de demi-centre, où il reçoit.",
        "Le nouveau joueur central choisit: tir direct à mi-distance (variante 1), 1 contre 1, passe au pivot, ou continuité vers l'autre arrière qui attaque à son tour. À Písek, contre une défense individuelle sur l'arrière gauche, le demi-centre fait écran avec son corps sur la défenseuse individuelle après sa passe (variante 2; défenseuse individuelle figurée par le 2 gauche).",
      ],
      objectif: "Amener l'arrière lancé au centre, face aux deux défenseurs centraux.",
      pointsCles: [
        "Le demi-centre part dès sa passe vers le poste libéré.",
        "L'arrière arrive en arc pour recevoir lancé, face au but.",
        "Contre une individuelle, l'écran du demi-centre se pose juste après la passe.",
      ],
      fiabilite: 'sourcee',
      sources: [
        KUBISOVA('"Ve stejnou chvíli nabíhá krajní spojka obloukem na pozici střední spojky, kde dostává míč." (p. 31; variante de Písek contre défense individuelle, p. 41).'),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Base: tir du nouveau central',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, puis file vers le poste d'arrière gauche. En même temps, l'arrière gauche part en arc vers le poste de demi-centre.",
              courses: { DC: [-4.6, 9.2], ArG: { vers: [-0.8, 10.2], via: [-4.6, 11.8] } },
              passe: ['DC', 'ArD', 0.1],
            },
            {
              texte: "Arrivé lancé au poste de demi-centre, l'arrière gauche reçoit de l'arrière droit.",
              courses: { ArG: [-0.4, 9.6], DC: [-5.2, 9.4] },
              passe: ['ArD', 'ArG', 0.3],
            },
            {
              texte: "Le nouveau joueur central tire à mi-distance. Il peut aussi jouer le 1 contre 1, servir le pivot ou continuer vers l'autre arrière.",
              courses: { ArG: [-0.2, 9.0] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G3: [-1.2, 7.4], D3: [1.2, 7.4] },
            },
          ],
        },
        {
          nom: '2 - Písek contre défense individuelle',
          depart: { G2: [-5.0, 8.4] },
          etapes: [
            {
              texte: "L'arrière gauche est marquée en individuelle (ici par la 2 gauche). La demi-centre passe à l'arrière droite, puis vient faire écran avec son corps sur la défenseuse individuelle. L'arrière gauche part en arc vers le centre.",
              courses: { DC: { vers: [-4.2, 9.0], ecran: true }, ArG: { vers: [-0.8, 10.2], via: [-4.6, 11.8] } },
              passe: ['DC', 'ArD', 0.1],
              def: { G2: [-4.9, 8.4] },
            },
            {
              texte: "La défenseuse individuelle reste bloquée par l'écran. L'arrière gauche, libre, reçoit au poste de demi-centre.",
              courses: { ArG: [-0.4, 9.6] },
              passe: ['ArD', 'ArG', 0.3],
              def: { G2: [-4.4, 8.0] },
            },
            {
              texte: "L'arrière gauche tire à mi-distance.",
              courses: { ArG: [-0.2, 9.0] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G3: [-1.2, 7.4], D3: [1.2, 7.4] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rozehravka',
      nom: 'Rozehrávka',
      alias: 'Rozehrávka (CZ, "mise en jeu, construction")',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "Croisé du demi-centre avec l'ailière gauche, puis de l'arrière gauche avec l'ailière droite: les arrières arrivent l'un après l'autre lancés au centre.",
      description: [
        "Combinaison des équipes féminines tchèques (Most, Písek, Hodonín), décrite dans le mémoire de K. Kubišová (2020). Le pivot est entre le 3 et le 2, du côté du premier croisé. Le demi-centre part en arc vers la zone du 2 et, vers les 9 m, croise avec l'ailière sortie de son coin. L'ailière passe à son arrière, qui a glissé au centre.",
        "Cet arrière refait la même course et le même croisé avec l'ailière de l'autre côté; celle-ci passe à son propre arrière, arrivé à son tour au centre, qui résout la situation (variante 1: tir).",
        "Suite de Písek (variante 2): le joueur central reçoit en course; sans menace directe, il croise avec l'autre arrière, puis le jeu va vers le demi-centre, désormais au poste d'arrière: surnombre, rentrée entre les défenseurs, passe à l'ailière revenue dans son coin (notre fin) ou retour au centre.",
      ],
      objectif: "Faire arriver chaque arrière lancé au centre, après un croisé qui a déplacé la défense.",
      pointsCles: [
        "Les croisés se font vers les 9 m, dans la zone du défenseur 2.",
        "Chaque arrière glisse au centre pendant le croisé précédent.",
        "Les ailières regagnent leur coin après leur passe.",
      ],
      fiabilite: 'sourcee',
      sources: [
        KUBISOVA("Rozehrávka: croisé DC / ailier vers la zone du défenseur 2, passe à l'arrière glissé au centre, même croisé de l'autre côté; suite de Písek (p. 38, 42-43)."),
      ],
      ballon: 'ArG',
      depart: { Piv: [-3.4, 6.4] },
      variantes: [
        {
          nom: "1 - Base: tir de l'arrière droite au centre",
          etapes: [
            ...ROZE_BASE,
            {
              texte: "L'arrière droite, arrivée lancée au centre, résout la situation: ici, tir.",
              courses: { ArD: [0.0, 9.0] },
              tir: { par: 'ArD', t: 0.5 },
            },
          ],
        },
        {
          nom: '2 - Suite de Písek: croisé puis jeu vers le demi-centre',
          etapes: [
            ...ROZE_BASE,
            {
              texte: "Sans menace directe, l'arrière droite croise avec l'arrière gauche, qui passe dans son dos vers le centre et reçoit.",
              courses: { ArD: [2.6, 8.8], ArG: { vers: [-0.6, 9.6], via: [4.4, 10.8] } },
              passe: ['ArD', 'ArG', 0.6],
              def: { D3: [2.2, 7.4] },
            },
            {
              texte: "Le jeu va vers le demi-centre, désormais au poste d'arrière gauche. Il attaque en surnombre l'intervalle entre le 1 et le 2 gauches.",
              courses: { DC: [-6.0, 7.8] },
              passe: ['ArG', 'DC', 0.3],
              def: { G2: [-5.2, 6.2], G1: [-7.0, 4.2] },
            },
            {
              texte: "Le 1 gauche sort: le demi-centre passe à l'ailière gauche, revenue dans son coin.",
              courses: { AiG: [-8.8, 2.2] },
              passe: ['DC', 'AiG', 0.3],
            },
            {
              texte: "L'ailière gauche tire.",
              courses: { AiG: [-8.4, 2.6] },
              tir: { par: 'AiG', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'most-croise-ailier-pivot',
      nom: "Croisé ailière / pivot puis deux croisés d'arrières (Most)",
      alias: '"Kombinace č.5" (CZ, sans nom, DHK Baník Most)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "L'ailière court sur les 9 m et échange le ballon avec la pivot sortie; les deux rentrent en double pivot, puis la demi-centre lance deux croisés d'arrières.",
      description: [
        "Combinaison sans nom de l'équipe féminine de Most (championnat tchèque), décrite dans le mémoire de K. Kubišová (2020). La pivot est près de la défenseuse n°2 du côté opposé à l'ailière. L'ailière sort et court sur la ligne des 9 m; devant sa n°2, elle reçoit de la demi-centre, puis croise avec la pivot qui sort, en échangeant le ballon. Ensuite, les deux rentrent dans la défense, près des deux n°2.",
        "Avant de rentrer, la pivot passe à la demi-centre, qui a glissé au poste d'arrière; l'arrière a glissé presque au poste de l'ailière rentrée. La demi-centre attaque légèrement vers le centre et croise avec l'autre arrière, qui croise à son tour avec la première arrière sortant du poste d'ailière. Fins: tir (variante 1) ou passe à la demi-centre, désormais à l'arrière opposé, qui saute à côté de l'ailière rentrée ou joue l'ailière (variante 2).",
        "Le texte source est complexe: les côtés où chaque joueuse rentre sont déduits (la pivot à gauche, l'ailière à droite, ce qui place l'ailière près de la demi-centre en fin d'action, comme le dit la source).",
      ],
      objectif: "Désorganiser la défense par un double pivot surprise, puis enchaîner des croisés d'arrières.",
      pointsCles: [
        "L'ailière reçoit devant sa n°2, sur la ligne des 9 m.",
        "Le ballon s'échange au moment du croisé ailière / pivot.",
        "La demi-centre et l'arrière glissent pendant le croisé pour occuper les postes laissés libres.",
      ],
      fiabilite: 'sourcee',
      sources: [
        KUBISOVA('Kombinace č.5 (Most): croisé ailier / pivot avec échange du ballon, deux pivots près des défenseurs 2, puis croisés DC / arrière et arrière / arrière (p. 39).'),
      ],
      ballon: 'DC',
      depart: { Piv: [4.0, 6.2] },
      variantes: [
        {
          nom: '1 - Tir après les deux croisés',
          etapes: [
            ...MOST_BASE,
            {
              texte: "L'arrière gauche, lancée vers le centre, tire.",
              courses: { ArG: [-1.6, 8.6] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: "2 - Passe à la demi-centre près de l'ailière rentrée",
          etapes: [
            ...MOST_BASE,
            {
              texte: "L'arrière gauche passe à la demi-centre, désormais au poste d'arrière droite.",
              courses: { DC: [4.6, 8.8] },
              passe: ['ArG', 'DC', 0.3],
              def: { D2: [5.2, 6.2], D3: [2.4, 7.2] },
            },
            {
              texte: "La demi-centre saute à côté de l'ailière rentrée en pivot et tire (ou lui passe).",
              courses: { DC: [4.6, 8.2] },
              tir: { par: 'DC', t: 0.4 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'linz',
      nom: 'Linz',
      alias: 'Linz, "kříž křídlo - krajní spojka - Linz" (CZ)',
      categorie: 'Systèmes complets',
      defense: 'non précisée (aussi en infériorité, gardien remplacé)',
      resume: "Croisé ailier / arrière, l'ailier traverse la défense jusqu'au côté opposé, puis le demi-centre croise avec l'arrière devant le 2.",
      description: [
        "Combinaison \"sur signal\" du championnat tchèque (mémoire de K. Kubišová, 2020). Après la passe du demi-centre à l'arrière, l'ailier sort de son coin, contourne l'arrière et reçoit en se croisant avec lui. Il passe au demi-centre et poursuit sa course dans la défense jusqu'au niveau de l'autre arrière (second pivot du côté opposé).",
        "Le demi-centre attend que l'ailier soit placé, puis s'élance en dribble vers le défenseur 2 et, devant lui, croise avec l'arrière du côté où la combinaison a commencé. Si le demi-centre a bien gêné les défenseurs, l'arrière tire à mi-distance (variante 1); sinon, renversement de l'autre côté (variante 2). Hodonín la joue avec au moins deux croisés, un de chaque côté.",
        "En infériorité numérique, jouée sans gardien (variante 3): après le croisé ailier / arrière, l'ailier rentre près du défenseur 2; le demi-centre ne croise pas mais rend le ballon, et la circulation va jusqu'à l'autre arrière, qui conclut. Le trajet exact de cette circulation n'est pas détaillé: celui du schéma est un choix.",
      ],
      objectif: "Libérer un tir à mi-distance de l'arrière derrière le croisé du demi-centre, après avoir déplacé la défense avec le second pivot.",
      pointsCles: [
        "L'ailier reçoit en se croisant avec l'arrière, puis traverse jusqu'au côté opposé.",
        "Le demi-centre attend que l'ailier soit en place avant de partir en dribble.",
        "Le croisé du demi-centre se fait devant le défenseur 2.",
      ],
      fiabilite: 'sourcee',
      sources: [
        KUBISOVA("Linz: croisé ailier / arrière, l'ailier passe au DC et continue dans la défense jusqu'au niveau de l'autre arrière; le DC croise avec l'arrière devant le défenseur 2; version en infériorité (p. 42-45)."),
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Tir à mi-distance de l'arrière",
          etapes: [
            ...LINZ_BASE,
            {
              texte: "Le demi-centre a bien gêné les défenseurs: l'arrière gauche tire à mi-distance.",
              courses: { ArG: [-2.0, 9.2] },
              tir: { par: 'ArG', t: 0.45 },
            },
          ],
        },
        {
          nom: "2 - Renversement de l'autre côté",
          etapes: [
            ...LINZ_BASE,
            {
              texte: "La défense a fermé: l'arrière gauche renverse vers l'arrière droit.",
              courses: { ArD: [4.4, 8.8], ArG: [-1.8, 9.4] },
              passe: ['ArG', 'ArD', 0.3],
              def: { D2: [5.0, 6.4], D3: [2.4, 7.2] },
            },
            {
              texte: "L'arrière droit tire (il peut aussi servir l'ailier placé en second pivot).",
              courses: { ArD: [4.2, 8.4] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
        {
          nom: '3 - En infériorité, sans gardien',
          etapes: [
            ...LINZ_DEBUT,
            {
              texte: "L'ailier passe au demi-centre et rentre près du 2 gauche.",
              courses: { AiG: [-3.8, 6.4], DC: [-0.6, 10.0] },
              passe: ['AiG', 'DC', 0.15],
              def: { G3: [-2.2, 7.0], G2: [-5.2, 5.4] },
            },
            {
              texte: "Le demi-centre ne croise pas: il rend le ballon à l'arrière gauche, revenue à son poste.",
              courses: { ArG: [-5.4, 9.4] },
              passe: ['DC', 'ArG', 0.4],
            },
            {
              texte: "L'arrière gauche fixe puis rend au demi-centre, qui fait suivre le ballon vers l'arrière droit.",
              courses: { ArG: [-4.6, 8.6], DC: [0.2, 9.8] },
              passe: ['ArG', 'DC', 0.5],
              def: { G2: [-4.8, 6.4] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, lancé.",
              courses: { ArD: [4.2, 8.8] },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [4.8, 6.4] },
            },
            {
              texte: "L'arrière droit conclut.",
              courses: { ArD: [4.0, 8.4] },
              tir: { par: 'ArD', t: 0.4 },
            },
          ],
        },
      ],
    },
  );

  /* ================================================================== */
  /* Jargon espagnol: la rusa, la sueca, turrón, carrusel, Yomba        */
  /* ================================================================== */

  // Carrousel: rotation complète des ailiers et du pivot.
  const CARRUSEL_SUITE = [
    {
      texte: "Croisé: le pivot file vers l'aile gauche abandonnée, l'ailier gauche continue jusqu'au poste de pivot. Le ballon circule vers le demi-centre.",
      courses: { Piv: { vers: [-8.8, 1.8], via: [-6.6, 8.4] }, AiG: [0, 6.5] },
      passe: ['ArG', 'DC', 0.4],
    },
    {
      texte: "Le demi-centre fait suivre vers l'arrière droit. Les arrières ne changent pas de poste.",
      passe: ['DC', 'ArD', 0.3],
    },
    {
      texte: "L'arrière droit passe à son ailier, qui sort un peu de son coin.",
      courses: { AiD: [8.4, 2.6] },
      passe: ['ArD', 'AiD', 0.2],
    },
    {
      texte: "L'ailier droit rend le ballon et part à son tour en circulation le long de la défense. L'ancien ailier gauche, au poste de pivot, s'avance pour croiser avec lui.",
      courses: { AiD: { vers: [4.0, 6.6], via: [6.6, 7.6] }, AiG: [2.4, 8.4] },
      passe: ['AiD', 'ArD', 0.1],
    },
    {
      texte: "Croisé: l'ancien ailier gauche file vers l'aile droite abandonnée, l'ailier droit prend le poste de pivot. Le ballon revient vers le demi-centre.",
      courses: { AiG: { vers: [8.8, 1.8], via: [6.6, 8.4] }, AiD: [0, 6.5] },
      passe: ['ArD', 'DC', 0.4],
    },
    {
      texte: "Le demi-centre fait suivre vers l'arrière gauche.",
      passe: ['DC', 'ArG', 0.3],
    },
    {
      texte: "L'arrière gauche passe au pivot d'origine, qui occupe maintenant l'aile gauche.",
      courses: { Piv: [-8.4, 2.6] },
      passe: ['ArG', 'Piv', 0.2],
    },
    {
      texte: "Le pivot rend le ballon et circule à son tour pour revenir sur sa ligne. L'ailier droit, au poste de pivot, s'avance pour croiser avec lui.",
      courses: { Piv: { vers: [-4.0, 6.6], via: [-6.6, 7.6] }, AiD: [-2.4, 8.4] },
      passe: ['Piv', 'ArG', 0.1],
    },
    {
      texte: "Le pivot d'origine est revenu sur sa ligne et l'ailier droit file vers l'aile gauche: l'attaque peut se déclencher. Ici, l'arrière gauche voit un couloir et tire de loin.",
      courses: { Piv: [0, 6.5], AiD: { vers: [-8.8, 1.8], via: [-6.6, 8.4] }, ArG: [-4.8, 9.4] },
      tir: { par: 'ArG', t: 0.8 },
    },
  ];

  // Yomba n°4: double croisé avec deux pivots.
  const YOMBA4_BASE = [
    {
      texte: "Le demi-centre s'engage vers la gauche. L'arrière gauche croise dans son dos avec une trajectoire longue vers l'autre côté et reçoit.",
      courses: { DC: [-2.0, 8.8], ArG: { vers: [1.4, 9.4], via: [-2.8, 10.8] } },
      passe: ['DC', 'ArG', 0.55],
      def: { G3: [-2.0, 7.4] },
    },
    {
      texte: "Le demi-centre descend aux 6 m entre le 3 et le 2 gauches: il devient second pivot. L'arrière gauche continue vers la droite.",
      courses: { DC: [-3.4, 6.4], ArG: [2.6, 9.0] },
      def: { G3: [-1.8, 7.0], G2: [-4.6, 5.6] },
    },
    {
      texte: "Second croisé: l'arrière gauche attaque vers le 3 droit, qui sort sur lui; l'arrière droit passe dans son dos, vers la gauche, et reçoit.",
      courses: { ArG: [3.4, 8.4], ArD: { vers: [0.2, 9.2], via: [4.6, 10.8] } },
      passe: ['ArG', 'ArD', 0.65],
      def: { D3: [2.6, 7.4] },
    },
  ];

  // Yomba n°5: ailier qui attaque l'intervalle, centre qui feint de descendre.
  const YOMBA5_BASE = [
    {
      texte: "L'ailier gauche, balle en main, attaque l'intervalle entre le dernier et l'avant-dernier défenseur (le 1 et le 2 gauches).",
      courses: { AiG: { vers: [-7.0, 5.4], via: [-8.6, 4.6] } },
      def: { G1: [-7.6, 3.6], G2: [-5.6, 5.6] },
    },
    {
      texte: "Il passe à l'arrière gauche, qui fixe.",
      courses: { ArG: [-4.6, 8.6], AiG: [-8.4, 3.0] },
      passe: ['AiG', 'ArG', 0.2],
      def: { G2: [-4.8, 6.4], G1: [-7.4, 2.4] },
    },
    {
      texte: "L'arrière gauche saute le demi-centre et passe directement à l'arrière droit. Au même moment, le demi-centre fait mine de descendre aux 6 m en masquant son défenseur.",
      courses: { DC: [0.6, 8.0], ArD: [5.4, 9.2] },
      passe: ['ArG', 'ArD', 0.3],
      def: { D3: [1.4, 7.0] },
    },
    {
      texte: "Le demi-centre se démarque en ressortant. L'arrière droit joue en largeur pour fixer, puis lui passe.",
      courses: { DC: [0.8, 9.2], ArD: [6.2, 8.6] },
      passe: ['ArD', 'DC', 0.5],
      def: { D2: [5.8, 6.4] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'la-rusa',
      nom: 'La russe',
      alias: 'la rusa, la simple (ES); "modèle de l\'école russe" (Román); Yomba n°6; "la clásica rusa" contre 3-2-1; "la Russe" (EdF jeunes)',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-6, 5-1, 3-2-1',
      resume: "Un ailier part en circulation pendant que le centre permute avec un arrière; l'ailier pénètre sans ballon en frôlant le bloc du pivot.",
      description: [
        "\"La rusa\" est un nom du jargon des entraîneurs espagnols: un forum la dit jouée par toutes les équipes de première division (\"LA RUSA ES UNA COMBINACIÓN QUE REALIZAN TODOS LOS EQUIPOS DE ASOBAL\"); son origine est attribuée au CSKA Moscou, puis au Caja Madrid du demi-centre russe Karlov. Les témoignages concordent sur le noyau: un ailier en circulation, une ou deux permutations du centre, puis la pénétration de l'ailier par le bloc du pivot. \"La rusa es una forma de iniciar, no de acabar\": c'est une façon de commencer, la suite dépend de la défense.",
        "Variantes: la version de Román Seco (\"concept très connu dérivé de l'école russe\", variante 2; Román ne l'appelle pas \"la rusa\"), celles de deux entraîneurs du forum (variantes 3 et 4), le jeu n°6 du site de Yomba, désigné sur le forum comme \"la rusa\" (variante 5), et \"la clásica rusa\" contre 3-2-1 (variante 6, texte très elliptique: notre lecture). Un autre message décrit un ailier qui passe devant le bloc du pivot après une passe à l'arrière, très proche du jeu n°6. Le \"Mod. 2 bis\" de Román (jeu continué par l'ancien demi-centre) n'est pas décrit.",
        "En France, \"la Russe\" des équipes de France jeunes (É. Quintin) est une mécanique différente: temps fort de l'ailier, glissement du pivot vers l'autre côté et entrée du demi-centre à la place initiale du pivot (variante 1, fin non précisée). Les noms changent d'un club à l'autre; voir aussi \"Modèles contre 6-0 profond (Román 2005)\".",
      ],
      objectif: "Jouer sur la confusion des changements de prise: l'ailier arrive dans le dos de la défense, protégé par le bloc du pivot.",
      pointsCles: [
        "L'ailier circule devant la défense, assez loin pour ne pas être gêné.",
        "Le joueur qui sert l'ailier fixe d'abord en largeur.",
        "L'ailier passe au ras du pivot pour que son défenseur bute sur le bloc.",
        "Tout le monde connaît cette combinaison: varier les suites est indispensable.",
      ],
      fiabilite: 'partielle',
      sources: [
        FORUM_JUGADAS('"Permuta del extremo con el lateral. Pase central extremo en circulación por fuera del dispositivo defensivo. Nueva permuta del central con el otro lateral [...] el extremo intentaba penetrar sin balón por el bloqueo del pivote" (variante 3).'),
        FORUM_RUSA('"el central tiene la pelota busca al extremo izquierdo q entra en circulación, el central hace una permuta con el lateral derecho a la vez q el extremo le devuelve la bola" (macrozoid, variante 4); "la rusa es una forma de iniciar, no de acabar".'),
        {
          titre: 'Fil "jugadas" (forum Lo + Balonmano, "La Pizarra", cervar / fontoria, 2004)',
          url: 'https://balonmano.mforos.com/142972/2551889-b-jugadas-b/',
          note: '"El extremo circula en bote finta un cruce con el lateral del otro lado, el central permuta con el lateral pase y va con el con bloque del pivot sobre el Central atrás" ("la clásica rusa" contre 3-2-1, variante 6).',
        },
        {
          titre: 'J. D. Román Seco, Conceptos de ataque frente a variantes defensivas 6:0 y 5:1 (e-balonmano.com n°1, 2005)',
          url: 'https://dialnet.unirioja.es/descarga/articulo/1371312.pdf',
          note: '"Este modelo se basa en un concepto muy conocido derivado de la escuela rusa [...] cruce inicial lateral derecho - extremo derecho [...] permuta de puestos entre el central y el lateral contrario [...] a partir del bloqueo del pivote al jugador central derecho" (variante 2).',
        },
        {
          titre: 'Yomba, "Pizarra", jeu n°6 (site personnel, archive)',
          url: 'http://www.oocities.org/colosseum/field/3190/j0006.htm',
          note: '"El Lateral Drch. pasa al Extremo Izqd. que circula y aprovechando el bloqueo del pivot penetra" (variante 5).',
        },
        {
          titre: 'É. Quintin, "Favoriser le jeu en lecture" (Approches du Handball n°157, janvier 2017)',
          url: 'https://www.calameo.com/ffhandball/read/007275111ece7fcff65f0?page=25',
          note: "\"Sur la \"Russe\", on joue sur un temps fort de l'ailier, associé à un glissement du pivot et à l'entrée du demi-centre qui prend la place initiale du pivot\" (variante 1).",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - "La Russe" des équipes de France jeunes',
          ballon: 'AiG',
          depart: { Piv: [-3.4, 6.4] },
          etapes: [
            {
              texte: "L'ailier gauche fait un temps fort: il feinte vers l'extérieur puis attaque balle en main l'intervalle entre le 1 et le 2.",
              courses: { AiG: { vers: [-6.8, 6.0], via: [-9.0, 4.6] } },
              def: { G1: [-7.6, 4.2], G2: [-5.6, 5.6] },
            },
            {
              texte: "Le pivot glisse le long de la zone vers l'autre côté. Le demi-centre entre dans la défense et prend la place initiale du pivot.",
              courses: { Piv: { vers: [3.4, 6.4], via: [0, 6.0] }, DC: { vers: [-3.2, 6.6], via: [-3.6, 9.0] } },
              def: { G3: [-2.0, 7.4], D3: [1.4, 7.3] },
            },
            {
              texte: "L'ailier passe au demi-centre, entré à la place du pivot.",
              passe: ['AiG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre tire.",
              tir: { par: 'DC', t: 0.3 },
            },
          ],
        },
        {
          nom: "2 - Modèle de l'école russe (Román)",
          ballon: 'ArD',
          etapes: [
            {
              texte: "L'arrière droit s'engage vers l'intervalle entre le 1 et le 2 droits; l'ailier droit sort de son coin. En même temps, le demi-centre et l'arrière gauche permutent.",
              courses: {
                ArD: [6.0, 8.0], AiD: [8.6, 3.6],
                DC: { vers: [-5.6, 9.8], via: [-2.6, 11.4] },
                ArG: { vers: [-0.4, 10.0], via: [-3.0, 9.2] },
              },
              def: { D2: [5.6, 6.2], D1: [7.6, 2.6] },
            },
            {
              texte: "Croisé arrière droit / ailier droit: l'ailier passe dans le dos de l'arrière et reçoit en partant vers l'intérieur.",
              courses: { AiD: { vers: [3.6, 9.0], via: [7.8, 10.6] }, ArD: [7.2, 6.6] },
              passe: ['ArD', 'AiD', 0.55],
              def: { D2: [6.2, 5.4], D3: [2.6, 7.4] },
            },
            {
              texte: "L'ailier droit continue sa circulation vers l'intérieur et passe au nouveau central, l'ancien arrière gauche. L'ancien demi-centre, à gauche, joue large pour écarter la défense. Le pivot vient bloquer le 3 droit.",
              courses: { AiD: [1.4, 8.4], ArG: [-1.0, 9.6], DC: [-6.4, 9.0], Piv: { vers: [1.2, 6.5], ecran: true } },
              passe: ['AiD', 'ArG', 0.4],
              def: { D3: [2.2, 7.1], G3: [-1.9, 7.4] },
            },
            {
              texte: "L'ailier poursuit sa circulation sans ballon et pénètre en frôlant le bloc du pivot. Le nouveau central lui redonne le ballon.",
              courses: { AiD: { vers: [-0.3, 7.0], via: [0.4, 8.4] } },
              passe: ['ArG', 'AiD', 0.5],
            },
            {
              texte: "L'ailier droit tire.",
              tir: { par: 'AiD', t: 0.3 },
            },
          ],
        },
        {
          nom: '3 - Double permutation (forum, 2006)',
          depart: { Piv: [3.3, 6.5] },
          etapes: [
            {
              texte: "Permutation de l'ailier gauche avec l'arrière gauche: l'ailier monte au poste d'arrière, l'arrière descend à l'aile.",
              courses: { AiG: { vers: [-5.4, 9.6], via: [-6.6, 5.4] }, ArG: { vers: [-8.8, 1.8], via: [-9.0, 7.0] } },
            },
            {
              texte: "Le demi-centre passe à l'ailier, qui part en circulation balle en main, devant la défense, vers le centre.",
              courses: { AiG: [-2.0, 9.0] },
              passe: ['DC', 'AiG', 0.1],
              def: { G3: [-2.0, 7.4] },
            },
            {
              texte: "Nouvelle permutation: le demi-centre part au poste d'arrière droit, l'arrière droit vient vers le centre. L'ailier continue sa circulation.",
              courses: {
                DC: { vers: [5.6, 9.6], via: [3.0, 11.4] },
                ArD: { vers: [0.8, 10.0], via: [3.0, 8.8] },
                AiG: [-0.4, 8.6],
              },
              def: { G3: [-1.7, 6.8], D3: [1.2, 7.2] },
            },
            {
              texte: "L'ailier choisit de jouer avec le demi-centre, dans sa nouvelle position, et lui passe. (Il pourrait aussi jouer avec l'arrière droit venu au centre.)",
              courses: { AiG: [0.2, 8.4] },
              passe: ['AiG', 'DC', 0.2],
            },
            {
              texte: "Le demi-centre fixe en largeur. L'ailier pénètre sans ballon en frôlant le bloc du pivot sur le 3 droit et reçoit.",
              passe: ['DC', 'AiG', 0.6],
              courses: {
                Piv: { vers: [2.7, 6.5], ecran: true },
                AiG: { vers: [3.8, 7.0], via: [1.6, 8.6] },
                DC: [6.0, 8.2],
              },
              def: { D3: [1.8, 6.9], D2: [5.6, 6.2] },
            },
            {
              texte: "L'ailier gauche tire. Si la défense résout le problème, le centre rejoue vers le milieu et le jeu continue à deux pivots.",
              tir: { par: 'AiG', t: 0.3 },
            },
          ],
        },
        {
          nom: '4 - Permutation et ballon rendu (forum, 2003)',
          depart: { Piv: [3.3, 6.5] },
          etapes: [
            {
              texte: "L'ailier gauche entre en circulation vers l'intérieur; le demi-centre, qui a le ballon, lui passe.",
              courses: { AiG: { vers: [-3.6, 8.8], via: [-8.0, 8.4] } },
              passe: ['DC', 'AiG', 0.65],
            },
            {
              texte: "Le demi-centre permute avec l'arrière droit; pendant ce temps, l'ailier, qui continue sa course, lui rend le ballon.",
              courses: {
                DC: { vers: [5.4, 9.6], via: [2.8, 11.2] },
                ArD: { vers: [0.8, 10.0], via: [3.0, 8.8] },
                AiG: [-1.6, 8.4],
              },
              passe: ['AiG', 'DC', 0.7],
              def: { G3: [-1.9, 7.2] },
            },
            {
              texte: "Finition la plus fréquente: l'ailier cherche le bloc du pivot. Il pénètre en frôlant le bloc sur le 3 droit et reçoit du demi-centre, qui a fixé le 2.",
              courses: {
                Piv: { vers: [2.7, 6.5], ecran: true },
                AiG: { vers: [3.8, 7.0], via: [1.4, 8.6] },
                DC: [5.6, 8.6],
              },
              passe: ['DC', 'AiG', 0.6],
              def: { D3: [1.8, 6.9], D2: [5.4, 6.6] },
            },
            {
              texte: "L'ailier gauche tire.",
              tir: { par: 'AiG', t: 0.3 },
            },
          ],
        },
        {
          nom: '5 - Jeu n°6 de Yomba',
          ballon: 'AiG',
          depart: { Piv: [3.3, 6.5] },
          etapes: [
            {
              texte: "L'ailier gauche, balle en main, fixe son vis-à-vis.",
              courses: { AiG: [-8.0, 4.0] },
              def: { G1: [-7.4, 2.8] },
            },
            {
              texte: "Il passe à l'arrière gauche, qui fixe, puis part en circulation devant la défense.",
              courses: { ArG: [-5.0, 8.6], AiG: [-6.4, 6.6] },
              passe: ['AiG', 'ArG', 0.2],
              def: { G2: [-5.2, 6.0], G1: [-7.4, 2.2] },
            },
            {
              texte: "L'arrière gauche passe au demi-centre, qui fixe à son tour. L'ailier poursuit sa circulation.",
              courses: { DC: [0.4, 9.0], AiG: [-2.6, 7.8], ArG: [-5.4, 9.4] },
              passe: ['ArG', 'DC', 0.3],
              def: { G3: [-1.9, 6.9], G2: [-5.0, 5.4] },
            },
            {
              texte: "Le demi-centre passe à l'arrière droit, qui joue en largeur pour fixer et créer des espaces. L'ailier arrive au centre.",
              courses: { ArD: [6.2, 8.6], AiG: [0.8, 7.8] },
              passe: ['DC', 'ArD', 0.3],
              def: { D2: [5.8, 6.4] },
            },
            {
              texte: "L'arrière droit passe à l'ailier, qui pénètre en frôlant le bloc du pivot sur le 3 droit.",
              courses: { Piv: { vers: [2.7, 6.5], ecran: true }, AiG: { vers: [3.8, 7.0], via: [2.4, 8.4] } },
              passe: ['ArD', 'AiG', 0.6],
              def: { D3: [1.8, 6.9] },
            },
            {
              texte: "L'ailier gauche tire. (6.1: si la défense empêche le bloc, l'ailier se place en second pivot; 6.2: si le 2 droit ferme, on renvoie vers la gauche.)",
              tir: { par: 'AiG', t: 0.3 },
            },
          ],
        },
        {
          nom: '6 - "La clásica rusa" contre 3-2-1',
          ballon: 'AiG',
          dispositif: '3-2-1',
          etapes: [
            {
              texte: "L'ailier gauche part en circulation, en dribble, devant la défense.",
              courses: { AiG: { vers: [-3.4, 9.0], via: [-7.6, 7.8] } },
              def: { G2: [-4.2, 7.4] },
            },
            {
              texte: "Il feinte un croisé avec l'arrière droit, qui vient vers lui. Le demi-centre permute avec l'arrière droit et part à son poste.",
              courses: {
                AiG: [-0.6, 9.2],
                ArD: { vers: [1.0, 10.2], via: [3.2, 9.0] },
                DC: { vers: [5.4, 9.8], via: [2.6, 11.4] },
              },
              def: { D3: [-1.6, 8.2], G2: [-3.6, 7.6] },
            },
            {
              texte: "Au lieu de croiser, l'ailier passe à l'arrière droit, arrivé au centre, et part aussitôt vers le but (passe-et-va). Le pivot bloque le défenseur central de 6 m.",
              courses: { AiG: [1.4, 7.2], Piv: { vers: [0.2, 6.4], ecran: true } },
              passe: ['AiG', 'ArD', 0.2],
              def: { G3: [-0.9, 6.7] },
            },
            {
              texte: "L'arrière droit lui redonne le ballon; l'ailier tire.",
              courses: { AiG: [1.6, 6.9] },
              passe: ['ArD', 'AiG', 0.2],
              tir: { par: 'AiG', t: 0.7 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'la-sueca',
      nom: 'La suédoise',
      alias: 'la sueca (ES)',
      categorie: 'Combinaisons à nom de pays',
      defense: '0-6',
      resume: "Le pivot est entre les deux centraux; si le central le plus proche sort sur l'arrière, passe à rebond au pivot, qui a pris position sur l'autre central.",
      description: [
        "Nom du jargon des entraîneurs espagnols, attribué à la Suède (Lövgren et Stefansson avec le pivot Wislander) et évoqué par Juan Carlos Pastor. Contre 0-6, le pivot se place entre les deux défenseurs centraux. Un arrière attaque balle en main; si c'est le central le plus proche qui sort sur lui, il fait une passe à rebond dans la zone au pivot, qui a gagné sa position sur l'autre central.",
        "Fiabilité faible: un autre entraîneur du même forum définit \"la sueca\" autrement (\"un changement de direction d'un joueur de première ligne + bloc du pivot\"), et un troisième dit qu'on appelle parfois \"la sueca\" ce qui est en fait \"la rusa\".",
      ],
      objectif: "Punir la sortie d'un défenseur central par une passe directe au pivot.",
      pointsCles: [
        "Le pivot garde sa position sur le central qui ne sort pas.",
        "L'arrière lit quel central sort avant de passer.",
        "La passe à rebond passe sous les bras des défenseurs.",
      ],
      fiabilite: 'partielle',
      sources: [
        FORUM_JUGADAS('"Contra defensa 6:0 y con el pivote entre los 2 centrales. Con balón un lateral si el central que responde para defender al central es el más próximo pase picado dentro del área al pivote que tiene ganada la posición al otro central defensivo".'),
        FORUM_RUSA('Autre définition (Mr_Jones): "no es más que un cambio de dirección de un jugador de 1ª línea + bloqueo del pivote".'),
      ],
      ballon: 'ArG',
      etapes: [
        {
          texte: "Le pivot est entre les deux centraux. L'arrière gauche attaque balle en main vers l'intervalle entre le 2 et le 3 gauches.",
          courses: { ArG: [-3.0, 8.4] },
        },
        {
          texte: "Le central le plus proche, le 3 gauche, sort sur lui. Le pivot prend position sur l'autre central, le 3 droit.",
          courses: { Piv: [0.6, 6.3] },
          def: { G3: [-2.6, 7.4], D3: [1.6, 6.6] },
        },
        {
          texte: "L'arrière gauche fait une passe à rebond dans la zone au pivot.",
          passe: ['ArG', 'Piv', 0.2],
        },
        {
          texte: "Le pivot tire.",
          courses: { Piv: [0.3, 6.2] },
          tir: { par: 'Piv', t: 0.3 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'turron',
      nom: 'Turrón',
      alias: '"la típica turrón" (ES)',
      categorie: 'Systèmes complets',
      defense: 'non précisée',
      resume: "L'ailier circule derrière l'arrière et donne au centre, puis pose un écran avec le pivot sur le 2; l'arrière, ouvert vers l'aile, arrive lancé et tire par-dessus l'écran.",
      description: [
        "Nom du jargon des entraîneurs espagnols (\"la típica turrón\"), donné sur un forum en une seule phrase sans ponctuation: l'ailier circule derrière l'arrière et donne le ballon au centre; écran avec le pivot sur le deuxième défenseur; l'arrière, qui s'est ouvert vers l'aile, entre en course, reçoit du centre et tire par-dessus l'écran.",
        "Fiabilité faible: le sujet de \"fait écran\" est ambigu. Nous le lisons comme l'ailier qui, après sa passe, forme l'écran avec le pivot devant le 2 gauche; la position de départ du pivot (côté gauche) est un choix.",
      ],
      objectif: "Libérer un tir de loin de l'arrière derrière un double écran.",
      pointsCles: [
        "L'ailier passe derrière l'arrière, côté ballon, pour recevoir loin de la défense.",
        "L'arrière s'ouvre vers l'aile pour pouvoir arriver lancé.",
        "L'écran se pose devant le 2, là où il sortirait sur le tireur.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "jugadas pactadas o jugadas ensayadas" (forum Lo + Balonmano, "La Pizarra", 2007)',
          url: 'https://balonmano.mforos.com/142972/6333265-jugadas-pactadas-o-jugadas-ensayadas/',
          note: '"la ke el extremo circula por detras del lateral se la da al central hace pantalla con pivote al segundo defensor y el lateral ke se abierto al extremo entra en carrera recibe de central y lanza por encima de la pantalla".',
        },
      ],
      ballon: 'AiG',
      depart: { Piv: [-3.3, 6.4] },
      etapes: [
        {
          texte: "L'ailier gauche, balle en main, circule derrière l'arrière gauche, vers le centre.",
          courses: { AiG: { vers: [-3.0, 10.6], via: [-8.6, 12.0] } },
        },
        {
          texte: "L'ailier donne le ballon au demi-centre, puis vient poser un écran avec le pivot devant le 2 gauche. L'arrière gauche s'ouvre vers l'aile.",
          courses: {
            AiG: { vers: [-5.4, 6.6], ecran: true },
            Piv: { vers: [-4.3, 6.6], ecran: true },
            ArG: [-7.4, 8.2],
          },
          passe: ['AiG', 'DC', 0.15],
          def: { G2: [-5.0, 5.4] },
        },
        {
          texte: "L'arrière gauche entre en course vers le but et reçoit du demi-centre.",
          courses: { ArG: { vers: [-4.6, 9.2], via: [-6.4, 9.6] } },
          passe: ['DC', 'ArG', 0.5],
          def: { G3: [-2.4, 7.0] },
        },
        {
          texte: "L'arrière gauche tire par-dessus l'écran.",
          tir: { par: 'ArG', t: 0.3 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'carrusel',
      nom: 'Carrousel',
      alias: "Carrusel (ES, d'après J. L. Antón)",
      categorie: 'Ailiers',
      defense: 'toutes',
      resume: "Les ailiers circulent l'un après l'autre jusqu'au poste de pivot pendant que le pivot, puis chaque ailier, va occuper l'aile laissée libre.",
      description: [
        "Forme de jeu décrite sur un forum espagnol par un entraîneur qui la tient d'un livre de Juan Luis Antón (\"El lo llamaba \"Carrusel\"\"), utilisée en deuxième division nationale. Le pivot part au centre. Un ailier touche le ballon et circule le long de la défense; le pivot croise avec lui et va occuper l'aile abandonnée. La première ligne fait circuler le ballon jusqu'à l'autre ailier, qui reçoit, rend et circule à son tour; l'ailier qui avait circulé avant, sur les 6 m, va occuper l'aile ainsi libérée. On recommence de l'autre côté.",
        "Les arrières ne changent pas de poste: ils guettent les appels, les couloirs et les tirs de loin. Consigne: n'attaquer qu'une fois le pivot d'origine revenu sur sa ligne (fin du schéma: tir de loin, notre choix). L'auteur la rapproche de l'attaque sans pivot de la France de Costantini en infériorité. Variante 2: les ailiers sortent de leur coin par un croisé avec l'arrière (le reste est identique; déroulement exact de ce croisé non décrit).",
      ],
      objectif: "Rendre les prises en charge difficiles par une rotation continue des ailiers et du pivot.",
      pointsCles: [
        "L'ailier rend le ballon avant de circuler.",
        "Le pivot et l'ailier se croisent sans se gêner: l'un devant, l'autre le long de la défense.",
        "La première ligne fait circuler vite le ballon d'une aile à l'autre.",
        "Attaquer seulement quand le pivot d'origine est revenu sur sa ligne.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Fil "circulación de los extremos" (forum Lo + Balonmano, "La Pizarra", Luckistar, 2005)',
          url: 'https://balonmano.mforos.com/142972/2903096-circulacion-de-los-extremos/',
          note: '"Se trataba de conectar la circulación continuada de los extremos mientras que el pivote ocupaba el extremo [...] El lo llamaba "Carrusel"".',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: "1 - Base: l'ailier touche le ballon et circule",
          etapes: [
            {
              texte: "Le pivot est au centre. L'arrière gauche passe à son ailier, qui sort un peu de son coin.",
              courses: { AiG: [-8.4, 2.6] },
              passe: ['ArG', 'AiG', 0.1],
            },
            {
              texte: "L'ailier gauche rend le ballon et part en circulation le long de la défense, vers le centre. Le pivot s'avance pour croiser avec lui.",
              courses: { AiG: { vers: [-4.0, 6.6], via: [-6.6, 7.6] }, Piv: [-2.4, 8.4] },
              passe: ['AiG', 'ArG', 0.1],
            },
            ...CARRUSEL_SUITE,
          ],
        },
        {
          nom: "2 - Sortie de l'ailier par un croisé avec l'arrière",
          etapes: [
            {
              texte: "Le pivot est au centre. L'arrière gauche s'engage vers l'intervalle entre le 1 et le 2; l'ailier sort de son coin.",
              courses: { ArG: [-6.0, 8.0], AiG: [-8.6, 3.6] },
              def: { G2: [-5.6, 6.2] },
            },
            {
              texte: "Croisé arrière / ailier: l'ailier passe dans le dos de l'arrière et reçoit.",
              courses: { AiG: { vers: [-4.2, 9.0], via: [-7.8, 10.6] }, ArG: [-7.0, 7.0] },
              passe: ['ArG', 'AiG', 0.55],
              def: { G2: [-5.4, 5.6] },
            },
            {
              texte: "L'ailier rend le ballon à l'arrière, revenu à son poste, et circule jusqu'aux 6 m. Le pivot s'avance pour croiser avec lui.",
              courses: { AiG: [-4.0, 6.6], ArG: [-5.5, 9.5], Piv: [-2.4, 8.4] },
              passe: ['AiG', 'ArG', 0.6],
              def: { G2: [-5.0, 5.0] },
            },
            ...CARRUSEL_SUITE,
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'yomba-6-0',
      nom: 'Yomba contre 6-0 (jeux n°4 et n°5)',
      alias: '"Pizarra" de Yomba (ES)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Deux jeux d'un tableau d'entraîneur espagnol: double croisé avec deux pivots (n°4); ailier qui attaque l'intervalle puis centre qui pénètre par le bloc du pivot (n°5).",
      description: [
        "Jeux n°4 et n°5 du \"tableau\" (\"Pizarra\") publié par un entraîneur amateur sous le pseudonyme Yomba (site personnel des années 2000, archivé). Les textes sont précis mais les schémas n'ont pas été récupérés. Le jeu n°6 du même site, désigné sur un forum comme \"la rusa\", est dans la fiche \"La russe\"; les jeux contre 5-1 et 3-2-1 ont leurs propres fiches.",
        "Jeu n°4: pivot à droite, le demi-centre croise avec l'arrière gauche, qui part sur une trajectoire longue vers l'autre côté, puis descend en second pivot entre le 3 et le 2 gauches. L'arrière gauche croise ensuite avec l'arrière droit. Selon le défenseur qui sort sur ce croisé, on passe au pivot du même côté que lui (variante 1); si le central droit ferme, on passe à l'autre pivot, qui a la position (variante 2, \"4.1\"). Clés: un arrière droit bon passeur au pivot, un croisé arrière-arrière de qualité.",
        "Jeu n°5: l'ailier gauche attaque balle en main l'intervalle 1-2 et passe à l'arrière gauche, qui fixe et passe directement à l'arrière droit. Le demi-centre fait mine de descendre au pivot en masquant son défenseur, se démarque, reçoit de l'arrière droit qui a joué en largeur, puis pénètre en circulation par le bloc du pivot (variante 3). Si le latéral droit de la défense bascule pour fermer, on renvoie le ballon à l'arrière gauche et on joue la supériorité de ce côté (variante 4, \"5.1\"). Le défenseur bloqué par le pivot n'est pas précisé (ici le 3 droit).",
      ],
      objectif: "Exploiter l'espace libéré dans le dos du défenseur qui sort, avec deux pivots (n°4) ou un bloc du pivot (n°5).",
      pointsCles: [
        "N°4: l'arrière gauche part loin, sur une trajectoire longue, pour étirer la défense.",
        "N°4: on sert le pivot situé du côté du défenseur sorti.",
        "N°5: la passe directe de l'arrière gauche à l'arrière droit saute le demi-centre.",
        "N°5: la fausse descente du demi-centre masque son défenseur avant le démarquage.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'Yomba, "Pizarra", jeu n°4 (site personnel, archive Wayback 2002)',
          url: 'http://web.archive.org/web/2003id_/http://www.geocities.com/Colosseum/Field/3190/j0004.htm',
          note: "Double croisé (centre-arrière gauche long, puis arrière gauche-arrière droit) avec deux pivots; passe au pivot du côté du défenseur sorti; 4.1: passe à l'autre pivot.",
        },
        {
          titre: 'Yomba, "Pizarra", jeu n°5 (site personnel, archive Wayback)',
          url: 'http://web.archive.org/web/2003id_/http://www.geocities.com/Colosseum/Field/3190/j0005.htm',
          note: "Ailier gauche qui attaque l'intervalle, passe directe arrière gauche vers arrière droit, centre qui feint de descendre puis circule par le bloc du pivot; 5.1: retour vers l'arrière gauche.",
        },
      ],
      ballon: 'DC',
      depart: { Piv: [3.3, 6.5] },
      variantes: [
        {
          nom: '1 - N°4: passe au pivot du côté du défenseur sorti',
          etapes: [
            ...YOMBA4_BASE,
            {
              texte: "L'arrière droit attaque vers la gauche; le 3 gauche sort sur lui. L'arrière droit passe au pivot du même côté, le demi-centre, qui a l'espace dans le dos du 3.",
              courses: { ArD: [-0.8, 8.6], DC: [-2.8, 6.4] },
              passe: ['ArD', 'DC', 0.55],
              def: { G3: [-1.4, 7.6] },
            },
            {
              texte: "Le demi-centre tire.",
              tir: { par: 'DC', t: 0.3 },
            },
          ],
        },
        {
          nom: "2 - N°4.1: le central droit ferme, passe à l'autre pivot",
          etapes: [
            ...YOMBA4_BASE,
            {
              texte: "L'arrière droit attaque vers la gauche. Le 3 gauche sort et le 3 droit revient fermer l'espace du demi-centre. L'arrière droit passe à l'autre pivot, à droite, qui a la position.",
              courses: { ArD: [-0.8, 8.6], Piv: [2.4, 6.4] },
              passe: ['ArD', 'Piv', 0.55],
              def: { G3: [-1.4, 7.6], D3: [-0.2, 6.9] },
            },
            {
              texte: "Le pivot tire.",
              tir: { par: 'Piv', t: 0.3 },
            },
          ],
        },
        {
          nom: '3 - N°5: le centre pénètre par le bloc du pivot',
          ballon: 'AiG',
          etapes: [
            ...YOMBA5_BASE,
            {
              texte: "En circulation, le demi-centre pénètre en frôlant le bloc du pivot sur le 3 droit.",
              courses: { Piv: { vers: [2.7, 6.5], ecran: true }, DC: { vers: [3.8, 7.0], via: [2.2, 8.6] } },
              def: { D3: [1.8, 6.9] },
            },
            {
              texte: "Le demi-centre tire.",
              tir: { par: 'DC', t: 0.3 },
            },
          ],
        },
        {
          nom: '4 - N°5.1: le 2 droit ferme, retour à gauche',
          ballon: 'AiG',
          etapes: [
            ...YOMBA5_BASE,
            {
              texte: "Le demi-centre part en circulation vers le bloc du pivot, mais le 2 droit bascule pour fermer. Le demi-centre renvoie le ballon vers l'arrière gauche.",
              courses: { Piv: { vers: [2.7, 6.5], ecran: true }, DC: [2.0, 8.6], ArG: [-4.4, 9.0] },
              passe: ['DC', 'ArG', 0.6],
              def: { D3: [1.8, 6.9], D2: [3.8, 7.0] },
            },
            {
              texte: "L'arrière gauche joue la supériorité de son côté: il attaque l'intervalle 2-3 et tire.",
              courses: { ArG: [-3.8, 8.2] },
              tir: { par: 'ArG', t: 0.5 },
              def: { G2: [-4.8, 6.4] },
            },
          ],
        },
      ],
    },
  );

  /* ================================================================== */
  /* Écoles nationales, Norvège, enclenchements de l'EdF féminine         */
  /* ================================================================== */

  // Jugge: permutation des trois arrières (A = arrière gauche, B = demi-centre, C = arrière droit).
  const JUGGE_BASE = [
    {
      texte: "A (l'arrière gauche) passe à B (le demi-centre).",
      passe: ['ArG', 'DC', 0.1],
    },
    {
      texte: "B passe à C (l'arrière droit). A et B échangent leur position: A part vers le milieu, B vers le poste d'arrière gauche.",
      courses: { ArG: { vers: [0.2, 10.2], via: [-2.8, 9.4] }, DC: { vers: [-5.4, 9.8], via: [-2.6, 11.2] } },
      passe: ['DC', 'ArD', 0.1],
    },
    {
      texte: "A, arrivé au milieu, reçoit de C.",
      courses: { ArG: [0.0, 9.6] },
      passe: ['ArD', 'ArG', 0.2],
    },
  ];

  // Coup franc avec écran fixe (paravan): placement commun.
  const FRANC_DEPART = {
    DC: [1.6, 10.6], ArD: [3.6, 11.4], Piv: [1.2, 9.3], AiD: [3.8, 9.0],
    G3: [-0.4, 7.4], D3: [1.0, 7.4], D2: [2.4, 7.4], G2: [-3.6, 6.4], D1: [6.4, 4.2],
  };
  const FRANC_DEBUT = {
    texte: "Coup franc: le pivot et l'ailier droit forment un écran fixe sur la ligne des 9 m, devant le mur. Le demi-centre fait une passe courte à l'arrière droit, gaucher, qui arrive lancé.",
    courses: { ArD: [2.6, 10.2] },
    passe: ['DC', 'ArD', 0.1],
  };

  // Sousse 2 (A. Portes): version ailière gauche.
  const SOUSSE_G = [
    {
      texte: "L'ailière gauche rentre sans ballon, au-delà des 9 m, vers le centre. L'arrière gauche s'avance.",
      courses: { AiG: { vers: [-2.6, 10.6], via: [-8.4, 11.4] }, ArG: [-5.9, 8.8] },
      def: { G2: [-5.4, 6.0] },
    },
    {
      texte: "La demi-centre lui donne le ballon et enchaîne un changement de poste avec l'arrière droite: la demi-centre part vers le poste d'arrière droite, l'arrière droite vient vers le centre. La pivot change de secteur.",
      courses: {
        DC: { vers: [5.6, 9.8], via: [2.8, 11.4] },
        ArD: { vers: [0.8, 9.8], via: [3.0, 8.8] },
        Piv: { vers: [3.0, 6.4], via: [1.4, 5.8] },
      },
      passe: ['DC', 'AiG', 0.1],
      def: { D3: [1.4, 7.4] },
    },
    {
      texte: "Plusieurs situations sont possibles (tir de l'arrière, nouveau croisé avec la seconde arrière, passe à la pivot). Ici, l'ailière passe à l'arrière droite, arrivée lancée au centre, qui attaque.",
      courses: { ArD: [0.4, 8.8] },
      passe: ['AiG', 'ArD', 0.2],
      def: { G3: [-0.6, 7.4] },
    },
    {
      texte: "L'arrière droite tire.",
      tir: { par: 'ArD', t: 0.3 },
    },
  ];

  // Attaque de la Russie (Mondial 2013, P. Landuré): début commun.
  const RUSSIE_BASE = [
    {
      texte: "Après l'engagement, les arrières enchaînent les croisés. Le pivot se place au centre, entre les deux défenseurs centraux, pour les mobiliser. Le demi-centre donne à l'arrière gauche, qui s'engage; l'ailier gauche sort de son coin.",
      courses: { ArG: [-6.0, 8.0], AiG: [-8.6, 3.6] },
      passe: ['DC', 'ArG', 0.1],
      def: { G2: [-5.6, 6.2], G1: [-7.6, 2.6] },
    },
    {
      texte: "Croisé arrière gauche / ailier gauche: l'ailier passe dans le dos de l'arrière et reçoit. Le pivot tient sa position entre les deux centraux.",
      courses: { AiG: { vers: [-3.6, 9.0], via: [-7.8, 10.6] }, ArG: [-7.2, 6.6] },
      passe: ['ArG', 'AiG', 0.55],
      def: { G2: [-6.2, 5.4], G3: [-2.6, 7.4] },
    },
    {
      texte: "L'ailier passe au demi-centre puis retrouve sa position d'ailier. L'arrière gauche se replace.",
      courses: { AiG: { vers: [-8.8, 1.6], via: [-6.6, 7.0] }, ArG: [-5.6, 9.4], DC: [0.2, 9.8] },
      passe: ['AiG', 'DC', 0.2],
      def: { G2: [-5.0, 5.2], G3: [-1.8, 6.8], G1: [-7.4, 2.0] },
    },
    {
      texte: "L'arrière droit se déplace vers l'intérieur et croise avec le demi-centre: il passe dans son dos et reçoit. Au même moment, l'arrière gauche se place en second pivot entre le 1 et le 2 gauches.",
      courses: {
        DC: [1.8, 8.8],
        ArD: { vers: [-0.8, 9.6], via: [3.4, 10.8] },
        ArG: { vers: [-6.6, 4.4], via: [-6.6, 7.0] },
      },
      passe: ['DC', 'ArD', 0.6],
      def: { D3: [1.4, 7.2] },
    },
    {
      texte: "Le demi-centre rééquilibre au poste d'arrière gauche en passant derrière. L'arrière droit, qui attaque vers la gauche, lui passe le ballon. Les deux pivots tiennent leur bloc et ouvrent l'espace de duel.",
      courses: { DC: { vers: [-4.8, 9.6], via: [-1.6, 11.6] }, ArD: [-1.4, 9.0] },
      passe: ['ArD', 'DC', 0.7],
      def: { D3: [1.2, 6.9] },
    },
    {
      texte: "Le demi-centre, au poste d'arrière gauche, se déplace vers le 2 gauche, désormais isolé, et engage le duel. L'arrière droit se replace au centre.",
      courses: { DC: [-4.4, 7.8], ArD: [0.0, 9.8] },
      def: { G2: [-4.8, 6.4] },
    },
  ];

  window.COMBINAISONS.push(
    /* ------------------------------------------------------------------ */
    {
      id: 'jugge',
      nom: 'Jugge',
      alias: 'Jugge, Jugge med kryss, Jugge med dobbelt kryss (NO)',
      categorie: 'Croisés',
      defense: 'toutes (exercice)',
      resume: "Les trois arrières se passent le ballon pendant que deux d'entre eux échangent leur place; dans la version \"avec croisé\", l'arrière opposé vient croiser au centre.",
      description: [
        "Forme de jeu de la fédération norvégienne (séance \"fixation, jeu enchaîné et croisés\" des 15 ans). Trois arrières A, B et C: passes A vers B vers C; A et B échangent leur position; A, arrivé au milieu, reçoit de C, joue vers un des arrières latéraux, et on continue de l'autre côté (variante 1).",
        "\"Jugge med kryss\" (variante 2): même départ; quand A arrive au milieu, C vient en croisé vers l'intérieur et reçoit de A par une passe cachée, puis joue vers un arrière latéral. Il existe aussi une version avec double croisé (vidéo non vue) et un exercice où, à l'entrée de A, s'enchaînent fixations et écrans du pivot.",
        "C'est une forme de base plus qu'une combinaison; les schémas n'ont pas pu être lus. Les fins (tir de l'arrière qui reçoit) sont ajoutées pour terminer le schéma.",
      ],
      objectif: "Faire tourner la base arrière pour que les défenseurs changent sans cesse de vis-à-vis.",
      pointsCles: [
        "Les échanges de position se font pendant que le ballon voyage.",
        "Dans le croisé, la passe cachée se fait avec la main la plus proche du partenaire.",
        "A arrive au milieu lancé, prêt à jouer.",
      ],
      fiabilite: 'partielle',
      sources: [
        {
          titre: 'NHF, Økt 8 (15 ans) "Pådrag - viderespill og kryssninger" (fédération norvégienne)',
          url: 'https://www.handball.no/globalassets/nhf-sentralt/utvikling/handballtrening/spillerutvikling/trinn-15/okt-8-padrag---viderespill-og-krysningspill-15-ar.pdf',
          note: 'Formes "Jugge bevegelse", "Jugge med kryss", "Jugge med dobbelt kryss"; "Det skjulte kastet (i krysningen) utføres med den hånden som er nærmest mot den man krysser med".',
        },
      ],
      ballon: 'ArG',
      variantes: [
        {
          nom: '1 - Jugge: permutation simple',
          etapes: [
            ...JUGGE_BASE,
            {
              texte: "A joue vers un des arrières latéraux, ici B, passé à gauche, qui attaque. (À l'entraînement, on continue de l'autre côté.)",
              courses: { DC: [-4.6, 8.6] },
              passe: ['ArG', 'DC', 0.3],
              def: { G2: [-4.8, 6.2] },
            },
            {
              texte: "B tire.",
              tir: { par: 'DC', t: 0.3 },
            },
          ],
        },
        {
          nom: '2 - Jugge med kryss: avec croisé',
          etapes: [
            ...JUGGE_BASE,
            {
              texte: "A attaque vers la droite. C vient en croisé vers l'intérieur, passe dans son dos et reçoit par une passe cachée.",
              courses: { ArG: [1.6, 9.0], ArD: { vers: [-0.6, 9.6], via: [3.0, 10.8] } },
              passe: ['ArG', 'ArD', 0.6],
              def: { D3: [1.6, 7.4] },
            },
            {
              texte: "C joue vers un arrière latéral, ici B, à gauche, qui attaque.",
              courses: { DC: [-4.6, 8.6] },
              passe: ['ArD', 'DC', 0.3],
              def: { G2: [-4.8, 6.2] },
            },
            {
              texte: "B tire.",
              tir: { par: 'DC', t: 0.3 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'paravan',
      nom: 'Paravan',
      alias: 'Paravan (RO), pantalla (ES), écran; bloc frontal',
      categorie: 'Combinaisons à nom de pays',
      defense: 'fermée (0-6 basse)',
      resume: "Le demi-centre pose un bloc frontal sur le défenseur qui devrait sortir sur le tireur; sur coup franc, plusieurs joueurs forment un écran fixe.",
      description: [
        "\"Paravan\" est le terme roumain pour les écrans (\"pantallas\" en espagnol). Le Dinamo Bucarest des années 1960 en faisait un usage permanent: les centraux (Otelea, Gatu) posaient des blocs frontaux pour libérer les tirs en suspension du gaucher Gheorghe Gruia, arrière droit, contre des défenses fermées et peu profondes (variante 1). Sur coup franc, l'écran est fixe et formé de plusieurs joueurs (variante 2).",
        "Les Tchèques, puis les Hongrois, y ont ajouté la continuité: les joueurs de l'écran deviennent mobiles, cherchent des solutions dans les espaces courts ou renversent en une passe vers une zone moins chargée (variante 3). Antón décrit aussi, en infériorité numérique (attaque sans pivot), le centre qui descend par surprise au pivot après un paravan au profit d'un arrière (non schématisé ici, la fiche se jouant à six).",
        "Les positions exactes ne sont pas décrites: le placement du schéma (bloc sur le 2 droit, écran du pivot et de l'ailier sur le coup franc) est un choix.",
      ],
      objectif: "Permettre au meilleur tireur de loin de tirer sans que son défenseur puisse sortir.",
      pointsCles: [
        "Le bloc frontal se pose face au défenseur qui devrait sortir, entre lui et le tireur.",
        "Le tireur arrive lancé et tire par-dessus ou à côté du bloc.",
        "Sur coup franc, l'écran reste sur la ligne des 9 m au moment de l'exécution.",
      ],
      fiabilite: 'partielle',
      sources: [
        ROMAN_2015('"los rumanos con el uso permanente de bloqueos frontales a través de sus famosas pantallas (Paravan en terminología rumana) para habilitar las suspensiones del zurdo Gruia"; "la escuela checa incorporó soluciones con continuidad".'),
        {
          titre: 'J. L. Antón García, Uso del "portero falso" en inferioridad numérica atacante (e-balonmano.com 6(1), 2010)',
          url: 'https://dialnet.unirioja.es/descarga/articulo/3253764.pdf',
          note: '"bloqueos frontales o cortinas del central en beneficio de laterales -el llamado paravan de la escuela rumana-" (dédoublement du centre en infériorité).',
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: "1 - Bloc frontal du centre pour l'arrière gaucher",
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, tireur gaucher, puis va vers le 2 droit, le défenseur qui devrait sortir sur le tireur.",
              courses: { DC: [4.0, 7.6] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [4.8, 5.8] },
            },
            {
              texte: "Le demi-centre pose un bloc frontal sur le 2 droit, qui ne peut pas sortir. L'arrière droit tire en suspension par-dessus ou à côté du bloc.",
              courses: { DC: { vers: [4.4, 7.1], ecran: true }, ArD: [4.6, 9.2] },
              tir: { par: 'ArD', t: 0.6 },
              def: { D2: [4.7, 6.1] },
            },
          ],
        },
        {
          nom: '2 - Coup franc: écran fixe',
          depart: FRANC_DEPART,
          etapes: [
            FRANC_DEBUT,
            {
              texte: "L'arrière droit tire par-dessus l'écran.",
              tir: { par: 'ArD', t: 0.3 },
            },
          ],
        },
        {
          nom: '3 - Variante tchèque: écran mobile et renversement',
          depart: FRANC_DEPART,
          etapes: [
            FRANC_DEBUT,
            {
              texte: "L'arrière droit arme. Le mur se resserre devant lui; les joueurs de l'écran deviennent mobiles: le pivot s'enfonce entre les deux 3.",
              courses: { Piv: [0.3, 6.6], ArG: [-4.6, 9.4] },
              def: { G3: [-0.8, 7.4], D3: [1.4, 7.6], D2: [2.8, 7.8] },
            },
            {
              texte: "Renversement en une passe vers la zone moins chargée: l'arrière droit sert l'arrière gauche, qui attaque.",
              courses: { ArG: [-4.2, 8.6] },
              passe: ['ArD', 'ArG', 0.2],
              def: { G2: [-4.4, 6.4] },
            },
            {
              texte: "L'arrière gauche tire.",
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'rideau',
      nom: 'Rideau',
      alias: 'cortina (ES)',
      categorie: 'Écrans et blocs',
      defense: 'fermée',
      resume: "Un attaquant passe devant le défenseur du tireur au moment du tir, pour lui masquer le porteur une fraction de seconde.",
      description: [
        "Le rideau (\"cortina\") est défini par Román Seco comme \"le déplacement d'un attaquant devant un défenseur, qu'il gêne un instant dans son attention au porteur du ballon qui peut tirer\". Exemple historique (variante 1): en finale du Mondial 1970, la RDA marque ses quatre derniers buts ainsi: passe de l'ailier droit Zimmermann à l'arrière droit gaucher Ganschow, rideau de l'ailier devant le défenseur de l'arrière, tir de loin de Ganschow.",
        "Román (2008) note que le rideau est habituellement suivi, de façon mécanique, de doubles croisés et d'un tir de loin, ce que la défense finit par anticiper. Il propose de fausser cette suite (variante 2): l'arrière droit reçoit pour tirer, l'arrière gauche feinte un déplacement vers le croisé avec lui, puis repart vers l'extérieur, avec le bloc du pivot comme alternative, pour des pénétrations successives. Qui fait le rideau dans cette version n'est pas précisé (ici le demi-centre), ni le défenseur bloqué par le pivot (ici le 2 gauche).",
      ],
      objectif: "Libérer un tir de loin en privant le défenseur du tireur de sa vue un court instant.",
      pointsCles: [
        "Le rideau passe devant le défenseur au moment où le tireur arme.",
        "Sans réussite immédiate, le jeu doit continuer.",
        "Une suite trop mécanique (doubles croisés) est vite lue par la défense: la varier.",
      ],
      fiabilite: 'partielle',
      sources: [
        ROMAN_2015('"se trata de una Cortina del extremo derecho, después de pase, para habilitar al lateral derecho [...] "Pase de Zimermman, extremo, cortina a favor de Ganschow, lateral derecho, y lanzamiento de éste último"".'),
        {
          titre: 'J. D. Román Seco, Táctica colectiva grupal en ataque: los modelos en el balonmano español (e-balonmano.com 4(2), 2008)',
          url: 'https://www.fmbalonmano.com/uploads/noticias/eleccionprocedimientostacticos.pdf',
          note: '"Acción propia del juego de 1ª línea que suele continuarse mecánicamente con dobles cruces y el lanzamiento a distancia [...] C recibe para el lanzamiento y A finta un desplazamiento hacia el cruce con C"; "El lateral A, hacia el exterior y el bloqueo de E como alternativa".',
        },
      ],
      ballon: 'AiD',
      variantes: [
        {
          nom: "1 - RDA 1970: rideau de l'ailier pour l'arrière gaucher",
          etapes: [
            {
              texte: "L'ailier droit passe à l'arrière droit, gaucher.",
              courses: { AiD: [8.6, 2.4] },
              passe: ['AiD', 'ArD', 0.1],
            },
            {
              texte: "Après sa passe, l'ailier passe devant le 2 droit, le défenseur de l'arrière: c'est le rideau. Le 2 perd de vue le tireur au moment où il arme.",
              courses: { AiD: { vers: [3.8, 7.4], via: [6.8, 6.8] }, ArD: [5.2, 9.4] },
              def: { D2: [5.2, 6.0] },
            },
            {
              texte: "L'arrière droit tire de loin.",
              courses: { ArD: [5.0, 9.2] },
              tir: { par: 'ArD', t: 0.3 },
            },
          ],
        },
        {
          nom: '2 - Rideau avec fausse suite de double croisé (Román 2008)',
          ballon: 'DC',
          etapes: [
            {
              texte: "Le demi-centre passe à l'arrière droit, qui reçoit pour tirer, et passe devant son défenseur, le 2 droit (rideau).",
              courses: { DC: { vers: [6.4, 7.6], via: [3.6, 7.4] }, ArD: [5.2, 9.2] },
              passe: ['DC', 'ArD', 0.1],
              def: { D2: [5.0, 6.0] },
            },
            {
              texte: "La défense attend la suite habituelle, un double croisé. L'arrière droit attaque vers le centre et l'arrière gauche feinte un déplacement vers le croisé avec lui. Les centraux glissent.",
              courses: { ArD: [3.8, 8.8], ArG: [-2.6, 9.8] },
              def: { G3: [-0.8, 7.2], D3: [2.4, 7.4] },
            },
            {
              texte: "Au lieu de croiser, l'arrière gauche repart vers l'extérieur. Le pivot pose un bloc sur le 2 gauche. L'arrière droit lui passe le ballon.",
              courses: { ArG: { vers: [-5.4, 9.0], via: [-3.8, 10.2] }, Piv: { vers: [-3.9, 6.1], ecran: true } },
              passe: ['ArD', 'ArG', 0.6],
              def: { G2: [-4.8, 5.4] },
            },
            {
              texte: "L'arrière gauche pénètre dans l'intervalle entre le 2 et le 3 gauches, protégé par le bloc, et tire.",
              courses: { ArG: [-3.0, 7.8] },
              tir: { par: 'ArG', t: 0.6 },
              def: { G3: [-1.6, 7.2] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'algerien',
      nom: "L'Algérien",
      alias: '"L\'algérien" (équipe de France féminine, A. Portes)',
      categorie: 'Combinaisons à nom de pays',
      defense: '3-3 fille à fille',
      resume: "Contre une 3-3 fille à fille: croisé demi-centre / arrière gauche, la pivot sort en poste côté arrière droite, puis la demi-centre rentre à 6 m.",
      description: [
        "Mouvement de l'équipe de France féminine présenté par Alain Portes contre la 3-3 fille à fille de la Corée, avec des mouvements \"inhabituels\" et un principe: ne pas porter la balle. Après un croisé entre la demi-centre et l'arrière gauche, la pivot sort en poste du côté de l'arrière droite, puis la demi-centre enchaîne par une rentrée à 6 m. Toute l'équipe participe, les ailières bien écartées.",
        "Lecture: cette défense change de joueuse quand les mouvements se font devant elle et glisse quand ils se font derrière. Le schéma de l'article montre deux passes (le croisé, puis la passe vers la rentrée); la fin (passe de la pivot à la demi-centre et tir) et l'origine du nom ne sont pas précisées. Défense 3-3 figurée par des défenseuses placées chacune sur une attaquante.",
      ],
      objectif: "Désorganiser une défense individuelle étagée par des changements de rôle sans porter la balle.",
      pointsCles: [
        "Les ailières restent bien écartées pour vider l'espace.",
        "La balle circule vite: pas de dribble.",
        "La rentrée de la demi-centre se fait dans l'espace laissé par la pivot sortie.",
      ],
      fiabilite: 'partielle',
      sources: [
        PORTES_147("\"Après un croisé entre la demi-centre et l'arrière gauche, le pivot sort en poste du côté de l'arrière droite. Puis la demi-centre enchaîne par une rentrée à 6 mètres\"."),
      ],
      ballon: 'DC',
      depart: {
        G1: [-7.6, 2.6], G2: [-4.9, 8.4], G3: [-0.8, 6.8], D3: [0.2, 9.4], D2: [4.9, 8.4], D1: [7.6, 2.6],
      },
      etapes: [
        {
          texte: "Chaque défenseuse est sur une attaquante. Croisé entre la demi-centre et l'arrière gauche: la demi-centre s'engage vers la gauche, l'arrière gauche passe dans son dos et reçoit. Le croisé se fait devant la défense: les défenseuses changent de joueuse.",
          courses: { DC: [-2.6, 8.8], ArG: { vers: [0.0, 9.6], via: [-3.4, 10.8] } },
          passe: ['DC', 'ArG', 0.55],
          def: { D3: [0.2, 8.6], G2: [-3.0, 7.8] },
        },
        {
          texte: "La pivot sort en poste du côté de l'arrière droite et reçoit.",
          courses: { Piv: { vers: [2.8, 8.8], via: [1.8, 7.0] } },
          passe: ['ArG', 'Piv', 0.6],
          def: { G3: [2.4, 7.8] },
        },
        {
          texte: "La demi-centre enchaîne par une rentrée à 6 m, dans l'espace laissé par la pivot. La pivot lui passe.",
          courses: { DC: [-0.4, 6.3] },
          passe: ['Piv', 'DC', 0.6],
          def: { G2: [-1.4, 7.0] },
        },
        {
          texte: "La demi-centre tire.",
          tir: { par: 'DC', t: 0.3 },
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'sousse',
      nom: 'Sousse 2',
      alias: '"Sousse", "Sousse 2" (équipe de France féminine, A. Portes)',
      categorie: 'Systèmes complets',
      defense: 'basse; 0-6 agressive',
      resume: "L'ailière rentre sans ballon au-delà des 9 m et reçoit de la demi-centre, qui change de poste avec l'arrière opposée; ensuite, jeu en lecture.",
      description: [
        "Enclenchement de l'équipe de France féminine (A. Portes), utilisé contre une défense \"un peu plus basse\" et contre la 0-6 agressive des Pays-Bas; il a été repris par les sélections jeunes (É. Baradat et C. Depuiset, Approches n°150: \"un 4ème enclenchement issu de France A, le Sousse\"). L'ailière gauche rentre sans ballon au-delà des 9 m; la demi-centre lui donne la balle et enchaîne un changement de poste avec l'arrière droite. Il se joue à droite ou à gauche, \"de 4 façons\" (variante 2: avec l'ailière droite et l'arrière gauche).",
        "Ensuite, plusieurs situations: tir de l'arrière, nouveau croisé avec la seconde arrière, passe à la pivot; les pivots permutent dans la défense pour créer des problèmes de répartition. La fin du schéma (tir de l'arrière arrivée au centre) en est une parmi d'autres. L'origine du nom (Sousse, ville tunisienne) n'est pas expliquée.",
      ],
      objectif: "Changer les rôles de trois joueuses pour que la défense perde ses repères avant le jeu en lecture.",
      pointsCles: [
        "L'ailière rentre sans ballon, loin de la défense, au-delà des 9 m.",
        "Le changement de poste démarre dès la passe de la demi-centre.",
        "La pivot change de secteur pendant le changement de poste.",
      ],
      fiabilite: 'sourcee',
      sources: [
        PORTES_147("\"avec l'ailière gauche qui rentre sans balle au-delà des 9 mètres, la demi-centre lui donne la balle et enchaîne un changement de poste avec l'arrière droite\"."),
      ],
      ballon: 'DC',
      variantes: [
        { nom: "1 - Avec l'ailière gauche", etapes: SOUSSE_G },
        {
          nom: "2 - Avec l'ailière droite",
          etapes: miroir(SOUSSE_G, [
            "L'ailière droite rentre sans ballon, au-delà des 9 m, vers le centre. L'arrière droite s'avance.",
            "La demi-centre lui donne le ballon et enchaîne un changement de poste avec l'arrière gauche: la demi-centre part vers le poste d'arrière gauche, l'arrière gauche vient vers le centre. La pivot change de secteur.",
            "Plusieurs situations sont possibles (tir de l'arrière, nouveau croisé avec la seconde arrière, passe à la pivot). Ici, l'ailière passe à l'arrière gauche, arrivée lancée au centre, qui attaque.",
            "L'arrière gauche tire.",
          ]),
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'le-un',
      nom: '"Le 1"',
      alias: '"Le 1"; "Entrée d\'ailière" contre 3-3 (équipe de France féminine, A. Portes)',
      categorie: 'Systèmes complets',
      defense: '0-6 agressive; 3-3',
      resume: "Entrée de l'ailière à l'opposé de la pivot, puis les deux pivots permutent dans la défense pour créer des problèmes de répartition.",
      description: [
        "Réponse d'Alain Portes à la 0-6 agressive des Pays-Bas: \"Le 1. C'est une entrée d'ailière à l'opposé du pivot. Ensuite, les 2 pivots permutent de poste dans la défense\" (variante 1). Contre la 3-3 de la Corée, l'entrée d'ailière fait redescendre la défense; les deux pivots changent de secteur en se croisant dans les 9 m: la défense, tassée, a des problèmes de répartition et une situation de tir apparaît (variante 2).",
        "Les fins ne sont pas décrites: passe à la pivot (variante 1) et tir de l'arrière gauche (variante 2) sont des choix. Défense 3-3 figurée par trois défenseuses sur la ligne et trois avancées. Voir aussi \"Isoler un défenseur central\" (deux pivots externes après une entrée d'ailière).",
      ],
      objectif: "Brouiller les prises en charge avec deux pivots qui permutent.",
      pointsCles: [
        "L'ailière entre à l'opposé de la pivot.",
        "La permutation des pivots se fait au moment où la défense vient de s'organiser.",
        "Contre la 3-3, l'entrée de l'ailière fait reculer la défense.",
      ],
      fiabilite: 'partielle',
      sources: [
        PORTES_147("\"Le 1. C'est une entrée d'ailière à l'opposé du pivot. Ensuite, les 2 pivots permutent de poste dans la défense\"; contre la 3-3, \"les pivots changent de secteur en se croisant dans les 9 m\"."),
      ],
      ballon: 'DC',
      depart: { Piv: [3.3, 6.5] },
      variantes: [
        {
          nom: '1 - Contre 0-6 agressive',
          etapes: [
            {
              texte: "La pivot est à droite. La demi-centre donne à l'arrière gauche; l'ailière gauche, à l'opposé de la pivot, entre dans la défense entre le 2 et le 3 gauches.",
              courses: { AiG: { vers: [-3.4, 6.4], via: [-7.0, 7.0] } },
              passe: ['DC', 'ArG', 0.1],
            },
            {
              texte: "Les deux pivots commencent à permuter: l'ailière remonte devant le 3 gauche, la pivot glisse vers le centre dans le dos des défenseuses, qui sont hautes.",
              courses: { AiG: [-2.4, 8.4], Piv: [0, 6.1] },
              def: { G3: [-1.8, 7.3], D3: [1.8, 7.2] },
            },
            {
              texte: "La permutation s'achève: la pivot prend la place de l'ailière à gauche, l'ailière file à droite. Les défenseuses doivent changer de prise.",
              courses: { AiG: { vers: [3.3, 6.5], via: [1.8, 8.8] }, Piv: [-3.4, 6.4] },
              def: { D3: [1.0, 6.8] },
            },
            {
              texte: "L'arrière gauche attaque l'intervalle entre le 2 et le 3 gauches. Le 3 sort sur elle: elle passe à la pivot.",
              courses: { ArG: [-3.0, 8.4] },
              passe: ['ArG', 'Piv', 0.6],
              def: { G3: [-2.4, 7.5] },
            },
            {
              texte: "La pivot tire.",
              courses: { Piv: [-3.6, 6.3] },
              tir: { par: 'Piv', t: 0.3 },
            },
          ],
        },
        {
          nom: '2 - "Entrée d\'ailière" contre 3-3',
          depart: {
            G1: [-4.6, 5.4], G2: [-4.8, 8.6], G3: [0, 6.6], D3: [0, 9.4], D2: [4.8, 8.6], D1: [4.6, 5.4],
          },
          etapes: [
            {
              texte: "Défense 3-3. L'ailière gauche entre dans la défense, à l'opposé de la pivot. La 3-3 redescend: les défenseuses avancées reculent.",
              courses: { AiG: { vers: [-2.6, 6.4], via: [-6.8, 7.0] } },
              def: { G2: [-4.2, 7.4], D3: [0, 8.2], D2: [4.2, 7.4] },
            },
            {
              texte: "Les deux pivots montent dans les 9 m pour se croiser.",
              courses: { AiG: [-1.6, 8.0], Piv: [1.6, 7.6] },
              def: { D3: [0, 8.8] },
            },
            {
              texte: "Elles se croisent et changent de secteur: la pivot passe à gauche...",
              courses: { Piv: { vers: [-3.0, 6.4], via: [-0.6, 7.2] } },
              def: { G3: [0.4, 6.6] },
            },
            {
              texte: "... et l'ailière à droite. La défense, tassée, a des problèmes de répartition.",
              courses: { AiG: { vers: [3.2, 6.5], via: [1.0, 8.4] } },
            },
            {
              texte: "La demi-centre donne à l'arrière gauche, qui attaque.",
              courses: { ArG: [-4.0, 9.0] },
              passe: ['DC', 'ArG', 0.3],
            },
            {
              texte: "L'arrière gauche tire.",
              tir: { par: 'ArG', t: 0.3 },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'attaque-russie-2013',
      nom: 'Attaque de la Russie (Mondial 2013)',
      alias: '"Situation de jeu: attaque de la Russie"; "Surnombrer pour ouvrir des espaces de tir" (P. Landuré)',
      categorie: 'Systèmes complets',
      defense: '0-6',
      resume: "Croisés successifs, pivot bloqué entre les deux centraux et second pivot entre le 1 et le 2: le défenseur n°2 se retrouve isolé face à un duel.",
      description: [
        "Attaque de la Russie contre la défense alignée du Danemark au Mondial 2013, après un engagement rapide, analysée par Paul Landuré à partir de photos commentées. Les arrières enchaînent les croisés; le pivot se place au centre pour mobiliser les deux défenseurs centraux. Croisé arrière gauche / ailier gauche, l'ailier retrouve ensuite sa place. L'arrière droit vient vers l'intérieur et croise avec le demi-centre; au même moment, un second pivot se place à gauche, entre le 1 et le 2.",
        "L'arrière droit passe au poste d'arrière gauche; les deux pivots tiennent leur bloc pour ouvrir l'espace. Le joueur de ce poste attaque le 2, isolé, et engage le duel (variante 1); l'arrière droit se replace au centre. Si le central contourne le pivot pour aider, on joue avec le centre ou le 4 contre 3 à gauche; dans la version de l'article n°145, renversement sur l'arrière droit gaucher, placé dans un espace ouvert (variante 2). Autres fins: passe à l'ailier, à l'un des pivots.",
        "L'identité du second pivot diffère entre les deux articles: le schéma suit la version n°145, où l'arrière gauche devient second pivot et où le demi-centre rééquilibre au poste d'arrière gauche.",
      ],
      objectif: "Surcharger un côté pour isoler le défenseur n°2 et lui imposer un duel.",
      pointsCles: [
        'Le pivot central fixe les deux défenseurs centraux et les met "hors jeu".',
        "Le second pivot entre le 1 et le 2 empêche le 1 d'aider.",
        "Le joueur du duel attaque le 2 dès qu'il est isolé.",
      ],
      fiabilite: 'sourcee',
      sources: [
        {
          titre: 'P. Landuré, "Situation de jeu: attaque de la Russie" (Approches du Handball n°136, 2013)',
          url: 'https://www.calameo.com/ffhandball/read/007275111c98bc93d3f4c?page=25',
          note: "\"L'arrière droit, positionné sur le côté droit de l'attaque, se déplace vers l'intérieur du terrain et croise avec le demi-centre. Au même moment, le deuxième pivot se positionne sur le côté gauche de l'attaque (entre les défenseurs n°1 et n°2)\". Reprise dans \"Surnombrer pour ouvrir des espaces de tir\" (n°145, janvier 2015, pp. 28-32): l'arrière gauche devient second pivot, renversement sur l'arrière droit gaucher.",
        },
      ],
      ballon: 'DC',
      variantes: [
        {
          nom: '1 - Duel sur le 2 isolé (n°136)',
          etapes: [
            ...RUSSIE_BASE,
            {
              texte: "Le 2, seul, ne peut pas être aidé: le demi-centre le déborde et tire.",
              courses: { DC: [-3.8, 7.4] },
              tir: { par: 'DC', t: 0.5 },
            },
          ],
        },
        {
          nom: "2 - Le central aide: renversement sur l'arrière droit (n°145)",
          etapes: [
            ...RUSSIE_BASE,
            {
              texte: "Le 3 gauche contourne le pivot pour aider sur le duel. Le demi-centre renverse sur l'arrière droit, gaucher, placé dans l'espace ouvert au centre.",
              courses: { ArD: [0.4, 9.0] },
              passe: ['DC', 'ArD', 0.3],
              def: { G3: [-3.0, 7.2] },
            },
            {
              texte: "L'arrière droit tire.",
              tir: { par: 'ArD', t: 0.3 },
            },
          ],
        },
      ],
    },
  );
})();
