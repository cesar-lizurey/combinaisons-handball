/*
 * Catalogue des combinaisons.
 *
 * Repère (en mètres): x de -10 (touche gauche) à +10 (touche droite),
 * y = distance à la ligne de but (0 = ligne de but, 6 = zone, 9 = ligne des 9 m).
 * La gauche/droite est celle des attaquants qui font face au but.
 *
 * Attaquants: AiG, ArG, DC, ArD, AiD, Piv
 * Défenseurs (0-6, numérotés de l'extérieur vers le centre): G1, G2, G3, D3, D2, D1, GB (gardien)
 *
 * Une étape:
 *   texte: explication affichée
 *   courses: { joueur: [x, y] }  ou  { joueur: { vers: [x, y], via: [x, y], ecran: true } }
 *   passe: [de, a]  ou  [de, a, t]  (t = moment du lâcher dans l'étape, entre 0 et 1)
 *   tir: joueur  ou  { par: joueur, t: 0.4, cible: [x, y] }
 *   def: { defenseur: [x, y] }  (mêmes formats que courses)
 *   enLAir: [joueur]  joueurs autorisés au-dessus de la zone à cette étape (Kempa)
 *
 * Champs facultatifs d'une combinaison: alias, dispositif ('0-6', '5-1', '3-2-1', '4-2': voir js/config.js),
 * depart (positions de départ modifiées; J7 pour un 7e joueur de champ), absents (joueurs exclus, ex. ['D1']
 * pour un 6 contre 5), fiabilite, sources, variantes.
 *
 * Une combinaison a soit `etapes`, soit `variantes: [{ nom, etapes }]`.
 */

// Croisé simple demi-centre / arrière gauche (Dragør f180): début commun.
const CROISE_BASE = [
  {
    texte: "L'arrière gauche passe au demi-centre, qui s'engage en diagonale entre les défenseurs 3 et 2 gauches, orienté vers l'aile. Le 3 sort sur lui.",
    courses: { DC: [-2.8, 8.4] },
    passe: ['ArG', 'DC', 0.05],
    def: { G3: [-2.4, 7.2] },
  },
  {
    texte: "L'arrière gauche croise derrière le demi-centre, vers le centre. Le demi-centre lui transmet le ballon au moment du croisement.",
    courses: { ArG: { vers: [-0.5, 8.5], via: [-3.0, 10.0] }, DC: [-3.6, 7.8] },
    passe: ['DC', 'ArG', 0.55],
    def: { D3: [1.3, 7.3] },
  },
];

// Faux croisé (Román Seco): début commun.
const FAUX_CROISE_BASE = [
  {
    texte: "Le demi-centre attaque en diagonale vers la gauche, comme pour un croisé.",
    courses: { DC: [-2.4, 8.6] },
    def: { G3: [-2.2, 7.3] },
  },
  {
    texte: "L'arrière gauche lance sa course croisée. Le 3 gauche anticipe la passe et glisse vers l'intérieur pour le suivre. Le demi-centre feinte la passe.",
    courses: { ArG: { vers: [-0.6, 9.0], via: [-3.4, 10.2] }, DC: [-2.9, 8.2] },
    def: { G3: [-1.2, 7.3], D3: [1.2, 7.0] },
  },
];

// Double croisé lancé par l'arrière droit (Dragør f1039, joué en miroir): début commun.
const DOUBLE_CROISE_BASE = [
  {
    texte: "L'arrière droit passe au demi-centre, qui s'engage dans l'intervalle 3-2 côté droit. Le 3 droit sort sur lui.",
    courses: { DC: [2.4, 8.6] },
    passe: ['ArD', 'DC', 0.05],
    def: { D3: [2.2, 7.3] },
  },
  {
    texte: "Premier croisé: l'arrière droit passe derrière le demi-centre et reçoit le ballon vers le centre.",
    courses: { ArD: { vers: [0.6, 9.0], via: [3.6, 10.3] }, DC: [3.2, 7.9] },
    passe: ['DC', 'ArD', 0.55],
    def: { G3: [-0.7, 7.3] },
  },
  {
    texte: "L'arrière droit enchaîne en diagonale vers la gauche et attire le 3 gauche.",
    courses: { ArD: [-1.6, 8.6], ArG: [-5.2, 9.8] },
    def: { G3: [-1.4, 7.3] },
  },
  {
    texte: "Second croisé: l'arrière gauche passe derrière l'arrière droit et reçoit le ballon.",
    courses: { ArG: { vers: [0.8, 8.8], via: [-2.8, 10.3] }, ArD: [-2.4, 8.0] },
    passe: ['ArD', 'ArG', 0.55],
  },
];

// Mise en place du bloc russe (Dragør z210): début commun.
const BLOC_RUSSE_BASE = [
  {
    texte: "Après une circulation de droite à gauche, le demi-centre donne à l'arrière gauche.",
    passe: ['DC', 'ArG', 0.1],
  },
  {
    texte: "L'arrière gauche fixe et donne à son ailier.",
    courses: { ArG: [-5.0, 9.0] },
    passe: ['ArG', 'AiG', 0.4],
    def: { G2: [-5.0, 5.6] },
  },
  {
    texte: "L'ailier rend à l'arrière gauche, qui menace de tirer face au 2. Le pivot sort vers lui.",
    courses: { ArG: [-4.6, 8.8], Piv: { vers: [-3.4, 7.6], via: [-1.6, 7.9] } },
    passe: ['AiG', 'ArG', 0.2],
    def: { G2: [-4.8, 6.4] },
  },
  {
    texte: "Le pivot pose un écran sur le 2. L'arrière prend un dribble et attaque le défenseur du pivot, le 3 gauche.",
    courses: { Piv: { vers: [-3.9, 6.9], ecran: true }, ArG: { vers: [-2.6, 8.2], via: [-4.6, 8.4] } },
    def: { G3: [-2.2, 7.4] },
  },
];

// Bloc du pivot sur le défenseur du demi-centre (Román Seco, monographie VI): début commun.
const BLOC_CENTRE_BASE = [
  {
    texte: "Le demi-centre donne à l'arrière gauche.",
    passe: ['DC', 'ArG', 0.2],
  },
  {
    texte: "L'arrière gauche lui rend. Le pivot pose un bloc sur le défenseur qui fait face au demi-centre, le 3 droit.",
    courses: { Piv: { vers: [0.9, 7.2], ecran: true }, DC: [0, 9.4] },
    passe: ['ArG', 'DC', 0.3],
  },
];

// Croisé arrière / ailier droit (Dragør f703): début commun.
const CROISE_AR_AL_BASE = [
  {
    texte: "Le demi-centre passe à l'arrière droit.",
    courses: { ArD: [5.6, 9.0] },
    passe: ['DC', 'ArD', 0],
  },
  {
    texte: "L'arrière droit attaque en diagonale vers l'extérieur, entre le 2 et le 1. L'ailier droit remonte.",
    courses: { ArD: [6.4, 7.6], AiD: [8.6, 4.0] },
    def: { D2: [5.7, 6.0] },
  },
  {
    texte: "L'ailier coupe vers l'intérieur et croise l'arrière, qui lui donne le ballon au croisement.",
    courses: { AiD: { vers: [4.0, 8.6], via: [7.6, 9.2] }, ArD: [6.9, 7.0] },
    passe: ['ArD', 'AiD', 0.55],
    def: { D1: [7.0, 3.8], D3: [2.4, 7.2], G3: [-0.9, 7.0] },
  },
];

const ESPAGNOLE_BASE = [
  {
    texte: "L'ailier gauche lance la combinaison en passant à l'arrière gauche.",
    courses: { AiG: [-8.6, 2.4] },
    passe: ['AiG', 'ArG', 0.2],
  },
  {
    texte: "Le demi-centre part en course vers la gauche, en direction du défenseur 2. L'arrière gauche lui donne le ballon dans sa course.",
    courses: { DC: [-3.0, 8.6], ArG: [-5.9, 9.8] },
    passe: ['ArG', 'DC', 0.3],
    def: { G3: [-2.3, 7.0] },
  },
  {
    texte: "Le demi-centre fixe le 2 et lui pose un écran. L'arrière et l'ailier prennent des courses parallèles vers l'intérieur, dans le dos du demi-centre.",
    courses: {
      DC: [-4.0, 7.6],
      ArG: { vers: [-1.2, 9.4], via: [-4.2, 10.6] },
      AiG: { vers: [-3.4, 9.3], via: [-7.8, 7.6] },
    },
    def: { G2: [-4.7, 6.0], G3: [-2.1, 7.2] },
  },
];

// Le randonneur (Dragør f188, "Bivognen" / "The Trailer"): tronc commun, joué ici côté gauche.
const RANDONNEUR_BASE = [
  ...ESPAGNOLE_BASE,
  {
    texte: "Le demi-centre donne à l'ailier, qui rentre vers le centre et cherche le tir. L'arrière gauche fait la même course, parallèle, un peu devant lui.",
    courses: { AiG: [-1.4, 8.4], ArG: [1.0, 9.6] },
    passe: ['DC', 'AiG', 0.3],
    def: { G3: [-1.4, 7.3], D3: [1.5, 7.0] },
  },
  {
    texte: "Gêné au centre, l'ailier donne à l'arrière droit.",
    courses: { ArD: [5.0, 9.0] },
    passe: ['AiG', 'ArD', 0.2],
    def: { D2: [4.8, 6.2] },
  },
];

const YAGO_BASE = [
  {
    texte: "Le pivot, placé côté gauche, sort vers les 9 m de son côté. Le demi-centre lui donne le ballon.",
    courses: { Piv: { vers: [-2.4, 8.8], via: [-3.6, 7.9] } },
    passe: ['DC', 'Piv', 0.6],
    def: { G3: [-2.2, 7.3] },
  },
  {
    texte: "L'arrière droit, l'arrière opposé, traverse vers la gauche et passe au ras du pivot, qui lui donne le ballon dans sa course. Le demi-centre se décale à droite pour occuper la place laissée libre.",
    courses: {
      ArD: { vers: [-1.3, 9.4], via: [2.0, 9.4] },
      DC: { vers: [4.0, 10.0], via: [2.0, 11.2] },
    },
    passe: ['Piv', 'ArD', 0.55],
  },
  {
    texte: "Le pivot redescend aux 6 m du côté opposé à son départ, entre le 3 et le 2 droits.",
    courses: { Piv: { vers: [3.0, 6.4], via: [0.8, 8.2] }, ArD: [-1.0, 9.0] },
    def: { G3: [-1.8, 7.1], D3: [1.6, 7.0] },
  },
  {
    texte: "L'arrière droit attaque l'intervalle entre les deux 3. Le 3 droit est pris entre l'arrière et le pivot.",
    courses: { ArD: [0.0, 7.7] },
    def: { G3: [-1.3, 7.2], D3: [1.3, 7.2] },
  },
];

// Yago original de Jean-Claude Thomas (Approches du Handball n°118): début commun.
const YAGO_THOMAS_BASE = [
  {
    texte: 'Mise en place: la demi-centre se place en avant de ses deux arrières. La pivot vient "centrale", au milieu, bien dégagée de la défense.',
    courses: {
      Piv: { vers: [0.4, 8.4], via: [-2.2, 7.8] },
      DC: [0, 9.8],
      ArG: [-5.8, 10.6],
      ArD: [5.8, 10.4],
    },
  },
  {
    texte: "La demi-centre vérifie d'un regard que la pivot a compris, puis pénètre balle en main (souvent avec un dribble). L'arrière gauche s'engage en même temps qu'elle.",
    courses: { DC: [-0.9, 8.9], ArG: [-4.4, 9.0] },
    def: { G3: [-1.4, 7.4], G2: [-4.6, 6.0] },
  },
  {
    texte: "Elle a quatre solutions: la pivot, l'arrière gauche et les deux ailières. Le plus souvent, elle donne à la pivot, puis va bloquer le défenseur central droit.",
    courses: { DC: { vers: [1.1, 7.7], via: [-0.4, 8.0], ecran: true }, Piv: [1.6, 9.0] },
    passe: ['DC', 'Piv', 0.1],
    def: { D3: [1.9, 6.9] },
  },
];

// Yago de Montpellier (G. Petitgirard, Approches n°161), même schéma chez D. Fleurance (n°151).
const YAGO_MONTPELLIER = [
  {
    texte: "Mise en place: le pivot se place entre le 1 et le 2 gauches. Les ailiers et l'arrière droit s'écartent au maximum.",
    courses: { Piv: { vers: [-6.0, 4.9], via: [-5.2, 6.8] }, AiG: [-9.4, 0.8], AiD: [9.4, 0.8], ArD: [8.0, 8.4] },
    def: { G2: [-4.6, 5.3] },
  },
  {
    texte: "Le pivot sort aux 9 m, à la périphérie de la défense. Le demi-centre fixe au centre.",
    courses: { Piv: { vers: [-3.4, 9.6], via: [-6.0, 7.8] }, DC: [0, 9.0] },
    def: { G3: [-1.4, 7.2], D3: [1.4, 7.2] },
  },
  {
    texte: "Le demi-centre engage un croisé en passant devant le pivot et lui donne le ballon. Le pivot continue vers la droite, toujours à la périphérie. L'arrière gauche se déplace vers le centre.",
    courses: {
      DC: { vers: [-3.2, 8.4], via: [-1.6, 8.4] },
      Piv: { vers: [0.2, 10.0], via: [-1.8, 10.4] },
      ArG: [-4.6, 10.6],
    },
    passe: ['DC', 'Piv', 0.45],
    def: { G2: [-4.6, 6.0] },
  },
  {
    texte: "Le pivot donne à l'arrière droit. Le demi-centre continue vers le poste d'arrière gauche, laissé libre; l'arrière gauche arrive au centre et devient demi-centre.",
    courses: {
      Piv: [1.6, 9.4],
      ArD: [5.8, 9.6],
      DC: { vers: [-5.8, 9.4], via: [-4.6, 8.6] },
      ArG: { vers: [-1.0, 10.4], via: [-3.0, 11.2] },
    },
    passe: ['Piv', 'ArD', 0.4],
  },
  {
    texte: "Le pivot revient dedans et pose un écran devant le 2 droit. L'arrière droit se lance vers le but.",
    courses: { Piv: { vers: [3.6, 6.9], via: [2.6, 8.0], ecran: true }, ArD: [4.6, 9.0] },
    def: { D2: [4.8, 6.0], D3: [1.8, 7.0] },
  },
];

// Croisé demi-centre / pivot sur une sortie en poste du pivot (Behm n°114, Kovacs n°154).
const YAGO_CROISE_DC_PIVOT = [
  {
    texte: "Le pivot sort en poste vers les 9 m, au centre gauche. Le 3 gauche le suit.",
    courses: { Piv: { vers: [-1.8, 9.2], via: [-3.4, 8.4] } },
    def: { G3: [-1.9, 7.6] },
  },
  {
    texte: "Croisé: le demi-centre part vers la gauche en passant devant le pivot et lui donne le ballon. Le pivot passe dans son dos, vers la droite.",
    courses: {
      DC: { vers: [-2.6, 8.4], via: [-1.0, 8.8] },
      Piv: { vers: [1.4, 9.8], via: [-1.2, 10.8] },
    },
    passe: ['DC', 'Piv', 0.45],
    def: { G3: [-2.0, 7.2] },
  },
  {
    texte: "Le demi-centre rentre au poste de pivot, à la place laissée libre. Le pivot attaque l'intervalle entre le 3 et le 2 droits.",
    courses: { DC: [-3.4, 6.4], Piv: [2.6, 8.6] },
    def: { D3: [2.2, 7.4] },
  },
];

const RENTREE_BASE = [
  {
    texte: "L'ailier gauche passe à son arrière.",
    courses: { AiG: [-8.4, 2.6] },
    passe: ['AiG', 'ArG', 0],
  },
  {
    texte: "L'ailier rentre: course latérale le long des 6 m, au milieu de la défense, vers le défenseur de l'arrière opposé. L'arrière gauche avance et donne au demi-centre.",
    courses: {
      AiG: { vers: [3.4, 6.3], via: [-3.2, 9.0] },
      ArG: [-4.8, 8.8],
      DC: [0, 9.6],
    },
    passe: ['ArG', 'DC', 0.6],
  },
  {
    texte: "Le pivot pose un bloc vers la course de l'ailier. Le demi-centre avance sur la passe.",
    courses: { Piv: { vers: [0.9, 6.9], ecran: true }, DC: [0.2, 8.8] },
    def: { D3: [1.8, 6.9], D2: [4.6, 5.6], G3: [-1.2, 7.2] },
  },
];

const RENVERSE_BASE = [
  {
    texte: "Le ballon circule côté gauche: l'arrière gauche fixe et passe au demi-centre. La défense coulisse vers le ballon, le pivot suit le 3 droit. L'arrière droit se désengage.",
    courses: { ArG: [-5.0, 8.6], Piv: [2.4, 6.4], ArD: [6.0, 10.4] },
    passe: ['ArG', 'DC', 0.5],
    def: { G2: [-5.4, 5.6], G3: [-2.4, 6.9], D3: [0.9, 6.9], D2: [4.2, 5.6] },
  },
  {
    texte: "Le demi-centre renverse le jeu vers la droite. Le pivot inverse ses appuis et bloque le 3 droit. L'arrière droit se réengage entre le 1 et le 2; l'ailier droit se replace au point de corner.",
    courses: { Piv: { vers: [2.2, 6.6], ecran: true }, ArD: [5.6, 8.4], AiD: [9.4, 0.6] },
    passe: ['DC', 'ArD', 0.3],
    def: { D3: [1.3, 7.0], D2: [4.8, 6.0] },
  },
];

window.COMBINAISONS = [
  /* ------------------------------------------------------------------ */
  {
    id: 'croise',
    nom: 'Croisé',
    categorie: 'Croisés',
    defense: '0-6',
    resume: "Le porteur s'engage dans un intervalle et donne au partenaire qui croise derrière lui.",
    description: [
      "Le croisé est la combinaison de base du jeu à deux. L'arrière gauche passe au demi-centre, qui s'engage en diagonale vers l'aile avec l'intention réelle de tirer, pour fixer son défenseur.",
      "L'arrière croise derrière lui, très près, reçoit une passe latérale ou arrière et traverse l'espace laissé par le défenseur. Le croisé se joue dans les deux sens (demi-centre puis arrière, ou l'inverse: variante 5).",
      "Fins sourcées: tir de l'arrière (Dragør f180); feinte de tir et passe à l'arrière opposé (f13, entrainement-handball.fr ex. 110, f702: variantes 2 et 4); passe au pivot placé à l'opposé (ex. 123: variante 3); renversement vers l'ailier avec glissement du pivot à l'opposé (F. Maurice: variante 6).",
      "Repères: en LNH 2017-18, le croisé demi-centre / arrière gauche est joué 570 fois et le croisé demi-centre / arrière droit 532 fois en une demi-saison. Le croisé demi-centre / arrière droit est l'action la plus fréquente des demi-centres juniors roumains (Şufaru). Une typologie portugaise distingue les croisés simples, doubles, longs (entre joueurs éloignés), prémédités, appuyés (par un pivot ou un joueur extérieur) et faux.",
      "Combinaisons voisines (fiches à part): croisé avec lecture, croisé des arrières latéraux, croisé avec remise, croisé côté pivot opposé, AZNA, Yougo.",
    ],
    objectif: "Créer un intervalle entre les deux défenseurs centraux pour un tir de près ou en suspension.",
    pointsCles: [
      "Le joueur qui démarre le croisé s'engage vers le défenseur avec l'intention manifeste d'aller au tir.",
      "Croiser près de la défense: au-delà de 9 m, c'est un simple changement de position.",
      "Le second joueur arrive lancé, très proche derrière le premier.",
      "Croiser en face du défenseur à fixer, le plus serré possible (\"RM holt RL\": le demi-centre va chercher l'arrière).",
      "Selon É. Quintin: le demi-centre joue un 1 contre 1 sur le défenseur central pour l'obliger à sortir, puis sort le ballon à mi-hauteur; l'arrière part à environ 12 m, face à l'intervalle extérieur, au signal de cette sortie de balle; l'arrière opposé garde une course vers l'extérieur et choisit ensuite.",
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: 'A propos du jeu avec des croisés (Dragør HK, trad. française)',
        url: 'http://www.dragoerhb.dk/fransk/f416.html',
        note: 'Règles du croisé: engagement du premier joueur, second joueur lancé derrière lui.',
      },
      {
        titre: 'Croisé simple Demi Centre/Arrières (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f180.html',
        note: "\"ARG fait une passe à DC, qui s'engage, fixe et s'oriente vers l'aile. ARG, qui croise derrière DC, reçoit le ballon et tire.\"",
      },
      {
        titre: "Tactique de match 09: croisé arrière / demi-centre du côté du pivot (entrainement-handball.fr)",
        url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-lattaque-dune-06-par-le-croise-arriere-12-centre-du-cote-du-pivot/',
        note: 'Croisé contre une 0-6 avec bloc du pivot sur le 3 et lecture de la défense.',
      },
      {
        titre: 'Tirer, croisements (mobilesport.ch, OFSPO)',
        url: 'https://assets01.sdd1.ch/assets/lbwp-cdn/mobilesport/files/1681419578/mobilesport-handball--tirer-croisements.pdf',
        note: 'Deux façons de faire la passe au croisement.',
      },
      {
        titre: 'Croisé Demi Centre/Arrière et passe Arrière (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f13.html',
        note: "\"ARG feinte le tir et passe à ARD. ARD s'engage et tire en suspension ou à l'amble\" (variante 2).",
      },
      {
        titre: 'Croisé Arrière/Demi Centre (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f702.html',
        note: '"DC croise avec ARD, qui après réception de la balle, la renvoie sur ARG opposé" (variante 4).',
      },
      {
        titre: "Croisé demi / arrière pour passer au pivot à l'opposé (entrainement-handball.fr)",
        url: 'https://www.entrainement-handball.fr/exercice/croise-demi-arriere-pour-passer-au-pivot-a-loppose/',
        note: "Le DC s'engage en dribblant et croise avec l'ARG; le pivot placé à l'opposé s'engage vers lui et reçoit (variante 3).",
      },
      {
        titre: "Croisé demi / arrière, passer à l'arrière opposé (entrainement-handball.fr)",
        url: 'https://www.entrainement-handball.fr/exercice/croise-demi-arriere-passer-a-larriere-oppose/',
        note: "L'ARG s'engage tout droit vers le but et reçoit la passe de l'ARD (variante 4).",
      },
      {
        titre: 'Croisé simple Arrières/Demi Centre (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f181.html',
        note: "\"DC fait une passe à ARG, qui s'engage, fixe et s'oriente vers le centre. DC, qui croise derrière ARG, reçoit le ballon et tire\" (variante 5).",
      },
      {
        titre: "F. Maurice, Jeu vers l'extérieur et continuité du jeu (Approches des Handballs n°196, 2023)",
        url: 'https://www.centre-handball.com/wp-content/uploads/2023/09/Approches_n196_MAI-2023.pdf',
        note: "\"Le jeu démarre par le croisé DC/AR + renversement. Le pivot est placé entre les deux numéros 3 et glisse dans l'espace extérieur à l'opposé du croisé\" (variante 6).",
      },
      {
        titre: "É. Quintin, Des repères et des savoir-faire pour s'adapter (Approches n°126, 2011)",
        url: 'https://www.calameo.com/ffhandball/read/0072751118dcaa10e6817?page=26',
        note: 'Annexe "croisé demi-centre / arrière": rôles du DC, de l\'arrière et de l\'arrière opposé.',
      },
      {
        titre: 'Unihandball, Auftakt-, Auslösehandlungen, Spielzüge (PDF)',
        url: 'https://silo.tips/download/unihandball-auftakt-auslsehandlungen-spielzge',
        note: '"Neun": "RM holt RL"; "Das Kreuzen sollte [...] möglichst eng gespielt werden".',
      },
      {
        titre: 'Associação de Andebol de Braga, Táctica de Grupo Ofensiva',
        url: 'http://aab.pt/noticias.ver.php?cid=844',
        note: '"Cruzar significa a intercepção de duas trajectórias num determinado ponto, que depois se voltam a afastar"; types de croisés.',
      },
      {
        titre: 'Şufaru & Iancu, Gymnasium XVI(1), 2015',
        url: 'https://gymnasium.ub.ro/journal/article/view/105/99',
        note: 'Action 1: "the right back (RB) goes behind the ball player (CB) - CB passes to RB - releases a shot".',
      },
      {
        titre: 'Komar, Lasvergnas, Belmessoud, Quelle efficacité des mouvements de joueurs en LNH? (Approches n°175, 2019)',
        url: 'https://www.calameo.com/ffhandball/read/007275111bdb91e2c432d?page=28',
        note: 'Croisé DC/ARG 570, croisé DC/ARD 532 (demi-saison 2017-18).',
      },
    ],
    ballon: 'ArG',
    variantes: [
      {
        nom: "1 - Croisé simple: tir de l'arrière",
        etapes: [
          ...CROISE_BASE,
          {
            texte: "L'arrière gauche, lancé, prend l'intervalle entre les deux 3 et tire.",
            courses: { ArG: [0.1, 7.6] },
            tir: { par: 'ArG', t: 0.45 },
            def: { D3: [0.9, 7.0] },
          },
        ],
      },
      {
        nom: "2 - Fin: passe à l'arrière opposé",
        etapes: [
          ...CROISE_BASE,
          {
            texte: "L'arrière gauche feinte le tir: le 3 droit sort sur lui. Il donne à l'arrière droit, qui s'engage.",
            courses: { ArG: [0.0, 8.2], ArD: [3.6, 8.4] },
            passe: ['ArG', 'ArD', 0.5],
            def: { D3: [0.9, 7.2], D2: [4.4, 6.3] },
          },
          {
            texte: "L'arrière droit tire en suspension ou en appui.",
            tir: { par: 'ArD', t: 0.2 },
          },
        ],
      },
      {
        nom: "3 - Fin: pivot à l'opposé",
        etapes: [
          {
            texte: "Le pivot est placé à l'opposé, côté droit. L'arrière gauche passe au demi-centre, qui s'engage en dribblant entre le 3 et le 2 gauches.",
            courses: { DC: [-2.8, 8.4], Piv: [3.2, 6.4] },
            passe: ['ArG', 'DC', 0.05],
            def: { G3: [-2.4, 7.2] },
          },
          CROISE_BASE[1],
          {
            texte: "Le 3 droit sort sur l'arrière. Le pivot s'engage vers lui, dans le dos du 3, et reçoit.",
            courses: { Piv: [1.6, 6.3], ArG: [-0.2, 8.2] },
            passe: ['ArG', 'Piv', 0.55],
            def: { D3: [0.4, 7.6] },
          },
          { texte: 'Le pivot tire.', tir: 'Piv' },
        ],
      },
      {
        nom: "4 - Croisé avec l'arrière droit, renvoi à l'opposé",
        etapes: [
          {
            texte: "L'arrière gauche passe au demi-centre, qui s'engage vers la droite, entre le 3 et le 2 droits. Le 3 droit sort sur lui.",
            courses: { DC: [2.6, 8.4] },
            passe: ['ArG', 'DC', 0.05],
            def: { D3: [2.3, 7.2] },
          },
          {
            texte: "L'arrière droit croise derrière le demi-centre et reçoit. La défense glisse vers le ballon.",
            courses: { ArD: { vers: [0.6, 8.6], via: [3.4, 10.2] }, DC: [3.4, 7.8] },
            passe: ['DC', 'ArD', 0.55],
            def: { G3: [-0.8, 7.3] },
          },
          {
            texte: "Au même moment, l'arrière gauche s'engage tout droit vers le but. L'arrière droit lui renvoie aussitôt le ballon.",
            courses: { ArG: [-4.2, 8.2] },
            passe: ['ArD', 'ArG', 0.3],
            def: { G2: [-4.6, 6.2] },
          },
          { texte: "L'arrière gauche tire en appui ou en suspension.", tir: 'ArG' },
        ],
      },
      {
        nom: "5 - Croisé inverse: l'arrière s'engage, le demi-centre croise",
        etapes: [
          {
            texte: "L'arrière gauche, servi par le demi-centre, s'engage, fixe le 2 et s'oriente vers le centre.",
            courses: { ArG: [-3.2, 8.4] },
            def: { G2: [-3.9, 6.5], G3: [-2.2, 7.2] },
          },
          {
            texte: "Le demi-centre croise derrière lui, vers l'extérieur, et reçoit au croisement.",
            courses: { DC: { vers: [-4.8, 8.8], via: [-2.0, 10.4] }, ArG: [-2.4, 8.1] },
            passe: ['ArG', 'DC', 0.55],
          },
          {
            texte: "Le demi-centre, lancé, tire à l'extérieur du 2.",
            courses: { DC: [-5.4, 7.8] },
            tir: { par: 'DC', t: 0.45 },
            def: { G2: [-4.6, 6.2] },
          },
        ],
      },
      {
        nom: "6 - Croisé, renversement vers l'ailier et glissement du pivot",
        etapes: [
          ...CROISE_BASE,
          {
            texte: "L'arrière gauche renverse vers l'ailier gauche, qui attaque. Au même moment, le pivot, placé entre les deux 3, glisse dans l'espace extérieur à l'opposé du croisé.",
            courses: { AiG: [-8.0, 3.2], Piv: [4.0, 6.0] },
            passe: ['ArG', 'AiG', 0.3],
            def: { G1: [-7.0, 4.6], D2: [5.2, 5.0] },
          },
          {
            texte: "L'ailier gauche tire de l'extérieur.",
            tir: { par: 'AiG', t: 0.3 },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'faux-croise',
    nom: 'Faux croisé',
    categorie: 'Croisés',
    defense: '0-6',
    resume: "Le début d'un croisé, mais le porteur garde le ballon et perce dans l'intervalle que la défense ouvre en anticipant.",
    description: [
      "Quand la défense connaît le croisé, le défenseur central anticipe et suit le joueur qui croise. Le porteur fait alors semblant de passer et garde le ballon.",
      "Le faux croisé punit cette anticipation. On l'enchaîne souvent après un ou deux vrais croisés.",
      "Le terme varie selon les sources: une fiche danoise appelle \"faux croisé français\" une combinaison sans ballon où le croisé attendu n'a pas lieu et où l'arrière coupe au centre, et le \"Faux croisé\" de Dragør (f386) est un croisé sans ballon suivi d'un renversement (voir la fiche \"Croisé à vide\"). La variante 1, feinte de passe puis 1 contre 1, est celle décrite par Juan de Dios Román Seco; la typologie portugaise appelle aussi \"falso cruzamento\" le porteur qui part seul quand les défenseurs changent trop tôt.",
      "Autres fins: le demi-centre feinte la passe à l'arrière et perce dans le couloir créé par le pivot (Şufaru, action 9: variante 2); l'arrière qui lance le croisé feinte la passe et tire de loin (Antón 2011, contre 5-1: variante 3); on simule le croisé arrière / demi-centre et on renvoie à l'arrière opposé, du côté du pivot (\"Le Chambéry\", A. Portes: variante 4); sur coup franc, le demi-centre attaque comme pour croiser et passe à l'autre arrière lancé au centre (forum espagnol: variante 5). Ces fins sont décrites en une ou deux phrases: les schémas en suivent le principe.",
      "Voir aussi les fiches \"Faux croisé français\", \"Feinte de croisé\", \"Chambéry\" et \"Faux croisé aspirant l'avancé\".",
    ],
    objectif: "Exploiter l'anticipation de la défense pour un tir du porteur initial.",
    pointsCles: [
      "La feinte de passe doit être crédible: les épaules et le ballon s'orientent vers le partenaire.",
      "Le partenaire fait sa course à fond pour emmener son défenseur.",
    ],
    fiabilite: 'partielle',
    sources: [
      {
        titre: 'Román Seco, Táctica colectiva grupal en ataque (e-balonmano.com, 2008)',
        url: 'https://www.fmbalonmano.com/uploads/noticias/eleccionprocedimientostacticos.pdf',
        note: '"Falsear las intenciones": le demi-centre semble amorcer un croisé, puis change de direction.',
      },
      {
        titre: 'Croisé français - direct (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f61e.html',
        note: "Le DC donne l'impression d'une passe puis joue un 1 contre 1 sur le défenseur 2.",
      },
      {
        titre: 'Faux croisé français (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f769.html',
        note: 'Même nom, mais une autre combinaison (sans feinte de passe).',
      },
      {
        titre: 'Faux croisé (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f386.html',
        note: '"DC passe le ballon à ARD et effectue un croisé avec ARG sans ballon": un croisé à vide, autre sens du mot.',
      },
      {
        titre: 'Şufaru & Iancu, Gymnasium XVI(1), 2015',
        url: 'https://gymnasium.ub.ro/journal/article/view/105/99',
        note: "Action 9: le DC appelle un arrière pour un croisé, feinte la passe et perce dans le couloir créé par le pivot (variante 2).",
      },
      {
        titre: 'J. L. Antón García, Procédés tactiques contre 5:1 par "movilización del defensor" (Elche, 2011, fig. 5)',
        url: 'https://fmbalonmano.federatio.com/upload/descargas/25-juanant%C3%B3ncontradefensa5.1%20(1).pdf',
        note: "Fin possible: \"tir de loin de l'arrière initial après feinte de passe et \"cruce falso\"\" (variante 3).",
      },
      {
        titre: 'A. Portes, Portes cible les défenses adverses (Approches n°147, 2015)',
        url: 'https://www.calameo.com/ffhandball/read/00727511117a5fff28271?page=6',
        note: "\"Nous simulons un croisé entre l'arrière et la demi-centre et, au lieu de le jouer, nous renvoyons la balle à l'arrière opposée\" (variante 4).",
      },
      {
        titre: 'Lo + Balonmano, La Pizarra: "Jugadas ensayadas en pasivo" (forum, 2007)',
        url: 'https://balonmano.mforos.com/142972/6477188-jugadas-ensayadas-en-pasivo/',
        note: '"el central ataca hacia un lateral como si fuese a darle cruce a ese lateral pero en realidad le pasa al otro lateral que recibe en carrera en el central en 9m para lanzar" (variante 5).',
      },
    ],
    ballon: 'DC',
    variantes: [
      {
        nom: '1 - Feinte de passe et percée du demi-centre',
        etapes: [
          ...FAUX_CROISE_BASE,
          {
            texte: "Le demi-centre garde le ballon, s'engouffre dans l'intervalle 2-3 et tire.",
            courses: { DC: [-3.3, 7.0] },
            tir: { par: 'DC', t: 0.45 },
            def: { G2: [-4.4, 5.8] },
          },
        ],
      },
      {
        nom: '2 - Percée dans le couloir du pivot (Şufaru)',
        etapes: [
          {
            ...FAUX_CROISE_BASE[0],
            texte: "Le demi-centre attaque en diagonale vers la gauche et appelle l'arrière gauche pour un croisé. Le pivot vient bloquer le 2 gauche.",
            courses: { ...FAUX_CROISE_BASE[0].courses, Piv: { vers: [-4.0, 6.4], ecran: true } },
            def: { ...FAUX_CROISE_BASE[0].def, G2: [-4.6, 5.6] },
          },
          FAUX_CROISE_BASE[1],
          {
            texte: "Le demi-centre perce dans le couloir ouvert entre le bloc du pivot et le 3, et tire en suspension.",
            courses: { DC: [-2.7, 7.2] },
            tir: { par: 'DC', t: 0.5 },
          },
        ],
      },
      {
        nom: "3 - Tir de loin de l'arrière après feinte (Antón)",
        etapes: [
          {
            texte: "Le demi-centre donne à l'arrière droit.",
            passe: ['DC', 'ArD', 0.1],
          },
          {
            texte: "L'arrière droit s'éloigne de l'axe vers l'extérieur; le demi-centre lance le croisé derrière lui. Le 3 et le 2 droits anticipent le croisé.",
            courses: { ArD: [5.4, 9.2], DC: { vers: [3.0, 10.0], via: [4.4, 11.2] } },
            def: { D2: [4.2, 6.4], D3: [1.9, 7.2] },
          },
          {
            texte: "L'arrière feinte la passe au demi-centre et tire de loin, au-dessus de la défense.",
            tir: { par: 'ArD', t: 0.35 },
          },
        ],
      },
      {
        nom: "4 - Croisé simulé, renvoi à l'arrière opposé (Chambéry)",
        etapes: [
          {
            texte: "Le pivot se place entre le 2 et le 3 droits. Le demi-centre donne à l'arrière gauche.",
            courses: { Piv: [3.8, 6.2] },
            passe: ['DC', 'ArG', 0.2],
          },
          {
            texte: "L'arrière gauche s'engage vers le centre et le demi-centre amorce le croisé dans son dos. La défense se prépare à changer.",
            courses: { ArG: [-3.0, 8.6], DC: { vers: [-3.6, 10.4], via: [-1.6, 11.0] } },
            def: { G3: [-2.4, 7.3], G2: [-4.4, 6.2] },
          },
          {
            texte: "Au lieu de jouer le croisé, l'arrière gauche renvoie le ballon à l'arrière droit, lancé.",
            courses: { ArD: [3.8, 8.6] },
            passe: ['ArG', 'ArD', 0.2],
            def: { D3: [1.6, 7.0] },
          },
          {
            texte: "Avec le pivot dans son secteur, le 2 droit ne peut pas monter: l'arrière droit tire.",
            tir: { par: 'ArD', t: 0.3 },
          },
        ],
      },
      {
        nom: "5 - Faux croisé central, passe à l'autre arrière",
        etapes: [
          {
            texte: "Le pivot se place à gauche, du côté du faux croisé. Le demi-centre attaque vers l'arrière gauche, comme s'il allait lui donner un croisé.",
            courses: { DC: [-2.4, 9.2], ArG: [-4.0, 9.8], Piv: [-3.6, 6.3] },
            def: { G3: [-2.2, 7.4] },
          },
          {
            texte: "L'arrière droit part en course vers le centre. Le demi-centre lui passe au lieu de croiser.",
            courses: { ArD: [0.6, 9.4] },
            passe: ['DC', 'ArD', 0.6],
            def: { D3: [1.2, 7.2] },
          },
          {
            texte: "L'arrière droit, lancé, tire au centre depuis les 9 m.",
            tir: { par: 'ArD', t: 0.2 },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'double-croise',
    nom: 'Double croisé',
    categorie: 'Croisés',
    defense: '0-6',
    resume: "Deux croisés enchaînés entre les trois joueurs de base arrière.",
    description: [
      "Le demi-centre fait un premier croisé avec un de ses arrières. Le joueur qui reçoit continue sa course et fait un second croisé avec l'arrière opposé, qui passe derrière lui et tire.",
      "Règle: démarrer le croisé du côté d'où le demi-centre reçoit le ballon. Ici, il reçoit de l'arrière droit.",
      "Les fiches varient sur le joueur qui finit (arrière opposé, demi-centre, ou arrière servi par l'ailier). Variantes: arrière opposé qui croise en premier (Dragør f516), tir du demi-centre replacé arrière (f371), renversement vers l'arrière gauche (f149), demi-centre en écran sur le 3 (f203; si le défenseur du pivot monte, l'arrière sert le pivot), double croisé suivi d'un \"enroulement\" du demi-centre (Şufaru, action 7).",
      "Autres formes: en forme continue, le demi-centre s'arrête et laisse un aller-retour de ballon avant de relancer, et le 3e joueur peut tirer dès la 3e passe (f15); Double croisé 3 (f1037) enchaîne des passes renversées d'un arrière à l'autre; le double croisé \"externe\" (f73) fait remonter les ailiers aux postes d'arrière pour un nouveau croisé. En République tchèque (\"Dvojitý kříž\"), le pivot est entre les centraux et le tir vient souvent dès le 1er croisé. Le double croisé peut aussi finir par une rentrée en 2e pivot (blog EPS). En Norvège, \"Jugge med dobbelt kryss\" est la forme d'entraînement de la permutation des trois arrières avec double croisé.",
      "Fiches voisines: double croisé et double écran, double croisé avec l'arrière opposé, double croisé arrières-ailiers, double croisé contre 5-1, circulation en huit, double croisé extérieur.",
    ],
    objectif: "Déséquilibrer une défense centrale solide par des changements de direction successifs.",
    pointsCles: [
      "Chaque porteur doit attaquer le but avant de donner, sinon la défense glisse sans être fixée.",
      "Chaque croisé se fait en passant derrière le porteur.",
      'Ne pas en faire un "8" continu: le second croisé doit déboucher sur un tir.',
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: 'Double croisé 2 (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f516.html',
        note: '"ARD croise derrière DC et reçoit le ballon. Il continue sa course [...] et passe à ARG, qui croise derrière lui. ARG va au tir."',
      },
      {
        titre: 'Double croisé 4 (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f1039.html',
        note: 'Même principe, lancé de l\'autre côté.',
      },
      {
        titre: 'Double croisé 1 (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f15.html',
        note: 'Règle du côté de départ; ne pas en faire un "8" continu.',
      },
      {
        titre: 'Şufaru & Iancu, Gymnasium XVI(1), 2015',
        url: 'https://gymnasium.ub.ro/journal/article/view/105/99',
        note: '"Double criss-cross started by CB with LB, the latter criss-crossing RB, and RB calls CB for an encircling" (variante 6).',
      },
      {
        titre: 'Double croisé avec tir demi centre (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f371.html',
        note: "ARG reçoit et passe à DC \"qui s'est positionné en ARD et temporise un peu avant de s'engager très rapidement vers la défense. DC tire\" (variante 3).",
      },
      {
        titre: 'Double croisé avec tir (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f149.html',
        note: "ARD \"renverse et fixe la défense à l'opposé pour passer la balle à ARG, qui effectue un tir au travers ou un tir en suspension\" (variante 4).",
      },
      {
        titre: 'Double croisé, DC écran (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f203.html',
        note: "\"L'arrière droit ARD croise à son tour derrière ARG, reçoit la balle et tir\" (variante 5).",
      },
      {
        titre: 'Double croisé 3 et "externe" (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f1037.html',
        note: "Passes renversées d'un arrière à l'autre; f73: les ailiers prennent les postes d'arrière.",
      },
      {
        titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál (Univ. Charles, Prague, 2020)',
        url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
        note: '"Dvojitý kříž": pivot entre les centraux; à Maloměřice, tir souvent dès le 1er croisé.',
      },
      {
        titre: 'NHF, Økt 8 (15 ans): Pådrag - viderespill og krysningspill',
        url: 'https://www.handball.no/globalassets/nhf-sentralt/utvikling/handballtrening/spillerutvikling/trinn-15/okt-8-padrag---viderespill-og-krysningspill-15-ar.pdf',
        note: '"Jugge med dobbelt kryss": permutation des trois arrières avec double croisé.',
      },
    ],
    ballon: 'ArD',
    variantes: [
      {
        nom: "1 - Tir de l'arrière gauche",
        etapes: [
          ...DOUBLE_CROISE_BASE,
          {
            texte: "L'arrière gauche trouve l'intervalle central libéré et tire.",
            courses: { ArG: [1.0, 7.9] },
            tir: { par: 'ArG', t: 0.45 },
            def: { D3: [1.9, 7.0] },
          },
        ],
      },
      {
        nom: "2 - L'arrière opposé croise d'abord (Double croisé 2)",
        etapes: [
          {
            texte: "L'arrière droit passe au demi-centre, qui s'engage vers la gauche, entre le 3 et le 2 gauches.",
            courses: { DC: [-2.4, 8.6] },
            passe: ['ArD', 'DC', 0.05],
            def: { G3: [-2.2, 7.3] },
          },
          {
            texte: "Premier croisé: l'arrière gauche passe derrière le demi-centre et reçoit.",
            courses: { ArG: { vers: [-0.4, 9.0], via: [-3.6, 10.3] }, DC: [-3.2, 7.9] },
            passe: ['DC', 'ArG', 0.55],
            def: { D3: [0.7, 7.3] },
          },
          {
            texte: "L'arrière gauche continue sa course vers la droite et attire le 3 droit.",
            courses: { ArG: [1.6, 8.6], ArD: [5.2, 9.8] },
            def: { D3: [1.4, 7.3] },
          },
          {
            texte: "Second croisé: l'arrière droit passe derrière l'arrière gauche et reçoit.",
            courses: { ArD: { vers: [-0.8, 8.8], via: [2.8, 10.3] }, ArG: [2.4, 8.0] },
            passe: ['ArG', 'ArD', 0.55],
          },
          {
            texte: "L'arrière droit tire au centre.",
            courses: { ArD: [-1.0, 7.9] },
            tir: { par: 'ArD', t: 0.45 },
          },
        ],
      },
      {
        nom: '3 - Avec tir du demi-centre',
        etapes: [
          DOUBLE_CROISE_BASE[0],
          DOUBLE_CROISE_BASE[1],
          {
            texte: "L'arrière droit s'oriente vers la gauche. L'arrière gauche s'engage derrière lui et reçoit. Le demi-centre se replace au poste d'arrière droit.",
            courses: {
              ArD: [-1.2, 8.6],
              ArG: { vers: [1.0, 9.2], via: [-2.6, 10.4] },
              DC: { vers: [5.4, 10.0], via: [4.2, 8.8] },
            },
            passe: ['ArD', 'ArG', 0.6],
            def: { G3: [-1.6, 7.3] },
          },
          {
            texte: "Le demi-centre temporise un peu, puis s'engage très vite vers la défense. L'arrière gauche lui donne.",
            courses: { DC: [4.2, 8.2], ArG: [1.6, 8.8] },
            passe: ['ArG', 'DC', 0.4],
            def: { D3: [1.6, 7.2], D2: [4.6, 6.2] },
          },
          { texte: 'Le demi-centre tire.', tir: 'DC' },
        ],
      },
      {
        nom: "4 - Renversement et tir de l'arrière gauche",
        etapes: [
          DOUBLE_CROISE_BASE[0],
          DOUBLE_CROISE_BASE[1],
          {
            texte: "L'arrière droit renverse vers la gauche et fixe la défense de ce côté. L'arrière gauche s'engage.",
            courses: { ArD: [-1.2, 8.4], ArG: [-4.0, 8.8] },
            def: { G3: [-1.6, 7.2], G2: [-4.4, 6.4] },
          },
          {
            texte: "L'arrière droit donne à l'arrière gauche.",
            passe: ['ArD', 'ArG', 0.2],
          },
          { texte: "L'arrière gauche tire au travers ou en suspension.", tir: 'ArG' },
        ],
      },
      {
        nom: '5 - Demi-centre en écran (f203)',
        etapes: [
          {
            texte: "L'arrière droit donne au demi-centre, qui entre dans la défense et pose un écran sur le 3 droit. L'arrière gauche croise derrière lui.",
            courses: {
              DC: { vers: [1.1, 7.6], ecran: true },
              ArG: { vers: [1.6, 9.4], via: [-2.0, 9.8] },
            },
            passe: ['ArD', 'DC', 0],
          },
          {
            texte: "Le demi-centre donne à l'arrière gauche dans sa course.",
            courses: { ArG: [2.4, 8.8] },
            passe: ['DC', 'ArG', 0.2],
            def: { D2: [4.4, 6.2] },
          },
          {
            texte: "L'arrière droit croise à son tour derrière l'arrière gauche et reçoit.",
            courses: { ArD: { vers: [-0.6, 8.8], via: [3.4, 10.4] }, ArG: [3.0, 8.4] },
            passe: ['ArG', 'ArD', 0.55],
            def: { G3: [-1.4, 7.2] },
          },
          { texte: "L'arrière droit tire.", tir: 'ArD' },
        ],
      },
      {
        nom: '6 - Double croisé et enroulement du demi-centre',
        etapes: [
          ...DOUBLE_CROISE_BASE,
          {
            texte: "L'arrière gauche appelle le demi-centre, qui fait le tour dans son dos (enroulement) et reçoit.",
            courses: { DC: { vers: [-0.6, 8.6], via: [2.4, 10.8] }, ArG: [1.4, 8.2] },
            passe: ['ArG', 'DC', 0.65],
            def: { D3: [1.8, 7.1] },
          },
          {
            texte: "Le demi-centre tire en suspension.",
            tir: { par: 'DC', t: 0.3 },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'espagnole',
    nom: 'Espagnole',
    alias: 'Croisé central, Est-Allemande, Espagnol, Le randonneur, Bivogn / Bivognen (DA), The Trailer (EN), Spanier (DE), Spanish',
    categorie: 'Croisés',
    defense: '0-6 ou 5-1',
    resume: "Croisé central entre l'ailier, l'arrière et le demi-centre, lancé depuis une aile, avec plusieurs fins possibles.",
    description: [
      "L'Espagnole part d'une aile. L'ailier passe à l'arrière, qui donne au demi-centre lancé vers lui. Le demi-centre fixe le défenseur 2 et lui pose un écran.",
      "Règle de base: l'arrière et l'ailier prennent des courses parallèles à chaque fois que le demi-centre propose un croisé; l'ailier croise derrière lui en premier. Le demi-centre choisit la fin selon la réaction de la défense (choisis une variante au-dessus du schéma).",
      "Les sources divergent sur l'action du demi-centre: écran sur le 2 (Dragør, Bogny) ou fixation dans l'intervalle 2-3 (SportEasy). Le pivot peut aussi poser un bloc au centre. Pour deux blogs EPS, l'Espagnole est simplement \"un croisé entre le demi-centre et un ailier\" pour créer un décalage à l'opposé.",
      "Noms: sur le site de Dragør, la même famille s'appelle \"Bivogn / Bivognen\" en danois (\"side-car\"), \"The Trailer\" en anglais et \"Croisé central / Espagnole\" ou \"Le randonneur\" en français. Les variantes 5 à 8 suivent \"Le randonneur 1 à 4\" (jouées ici côté gauche, en miroir de la fiche); la variante 9 suit \"Espagnole A\". En Allemagne, le \"Spanier\" se joue avec l'ailier collé dans le coin et le demi-centre qui passe dans le dos de l'arrière (variantes 11 et 12).",
      "Autres formes: version norvégienne analysée par S. Gardillou (variante 10). Définition historique d'A. Behm: \"Le demi-centre va chercher l'ailier balle en main, passe et bloque la défense. L'ailier démarre, passe à son arrière...\". Équipe de France 2008: croisé demi-centre / ailier (pivot au centre), l'ailier se repositionne, attaque centrale de l'arrière, avec comme point clé l'ouverture du 2e défenseur 3 (proche de la variante 1). Roumanie juniors: croisé demi-centre / ailière puis grande course de l'arrière au-dessus du pivot. J. Langlois la joue à l'opposé du pivot, qui pose un bloc extérieur (défense basse) ou glisse (défense haute).",
      'À ne pas confondre avec le "Spansk pres" ni le "Skæv til venstre" de Dragør (fiches à part).',
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: 'Croisé central / Espagnole (Dragør HK, trad. HBC Cachan)',
        url: 'http://www.dragoerhb.dk/fransk/f196.html',
        note: '"DC reçoit la balle et court en direction du défenseur D2 sur lequel il réalise un écran. Durant sa course, DC passe à ALG qui croise derrière lui."',
      },
      {
        titre: "C'est quoi... une espagnole? (Bogny Handball)",
        url: 'https://bhb08.fr/cest-quoi-une-espagnole-8/',
        note: 'Les 4 fins. Texte repris en grande partie de la fiche Dragør.',
      },
      {
        titre: 'Combinaison "l\'Espagnole" (SportEasy)',
        url: 'https://www.sporteasy.net/fr/blog/fiches-seances-entrainement/exercices-handball/fiche-handball-espagnole-combinaison/',
        note: "Même schéma et mêmes 4 fins; le demi fixe dans l'intervalle 2-3.",
      },
      {
        titre: 'Le randonneur 1 à 4 (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f188.html',
        note: '"DC passe à ALD et va fixer 2D puis le bloquer"; options f188a-c: "ALD passe à ARG, qui fixe externe 2D et fait une passe dans la course de ARD" (variantes 5 à 8).',
      },
      {
        titre: 'Noms des combinaisons de Dragør HK (index danois / anglais / français)',
        url: 'http://www.dragoerhb.dk/',
        note: '"Bivognen" = "The Trailer" = "Le randonneur"; "Centerkryds/Bivogn" = "Center cross/Trailer" = "Croisé central / Espagnole".',
      },
      {
        titre: 'Croisé central / Espagnole A (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f197.html',
        note: "Le DC fait écran sur le 2, l'ARG rentre bloquer le 3, l'ARD reçoit de l'ailier et tire en prenant les blocs (variante 9).",
      },
      {
        titre: "S. Gardillou, L'espagnol version norvégienne (Approches du Handball n°160, 2017)",
        url: 'https://www.calameo.com/ffhandball/read/00727511165c94abdd2fa?page=32',
        note: "Course en convergence de l'ailière, écran de la DC sur la n°2, l'ARD défie la n°3 \"désalignée et isolée\" (variante 10, jouée ici en miroir).",
      },
      {
        titre: 'handballecke.de, fil "Sammlung von Spielzügen!" (posts #63-64, 2005)',
        url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
        note: '"Spanier": "Außen ist Eckaußen"; le RM "kommt hinten rum" et percute entre le 1 et le 2 (variantes 11 et 12).',
      },
      {
        titre: 'A. Behm, Handball: mes coups de cœur (Approches n°114)',
        url: 'https://www.calameo.com/ffhandball/read/007275111122817ab0e6a?page=49',
        note: "\"Le demi-centre va chercher l'ailier balle en main, passe et bloque la défense. L'ailier démarre, passe à son arrière...\".",
      },
      {
        titre: "S. Nouet et C. Onesta, D'Athènes à Pékin (Approches n°108, 2008)",
        url: 'https://www.calameo.com/ffhandball/read/007275111af0070b68419?page=8',
        note: "\"Espagnol | 0-6 | Croisé DC / AL (pivot en position centrale) et l'ailier se repositionne | Attaque centrale de l'arrière | Jouer sur l'ouverture du 2e n°3\".",
      },
      {
        titre: 'J. Langlois, Prise en compte de la position du pivot (Approches n°156)',
        url: 'https://www.calameo.com/ffhandball/read/007275111df5ab573582b?page=22',
        note: "\"Jeu enclenché à partir d'un croisé entre la demi-centre et l'arrière latérale sur une \"espagnol\" à l'opposé du pivot\".",
      },
      {
        titre: 'L. Roudière, Les exploitations du pivot dans la charnière 3-3 (Approches n°146, 2015)',
        url: 'https://www.calameo.com/ffhandball/read/00727511110f1a931ec88?page=35',
        note: "Roumanie: \"L'espagnol, croisé demi-centre / ailière + enchaînement d'une grande course secteur central au-dessus du pivot\".",
      },
    ],
    objectif: "Offrir au demi-centre plusieurs solutions de passe autour de son écran.",
    pointsCles: [
      "L'ailier ne doit pas courir trop à plat: il doit rester menaçant.",
      "Les deux courses parallèles doivent être décalées dans le temps pour laisser deux solutions distinctes.",
      "Le demi-centre lit la défense et choisit la fin, ce n'est pas une suite figée.",
    ],
    ballon: 'AiG',
    variantes: [
      {
        nom: "1 - Tir de l'arrière via l'ailier",
        etapes: [
          ...ESPAGNOLE_BASE,
          {
            texte: "Le demi-centre donne à l'ailier qui croise dans son dos. Le 3 gauche sort sur l'ailier.",
            courses: { AiG: [-2.4, 8.7], DC: [-4.2, 7.3] },
            passe: ['DC', 'AiG', 0.3],
            def: { G3: [-2.0, 7.4] },
          },
          {
            texte: "L'ailier redonne à l'arrière gauche, lancé dans l'intervalle central.",
            courses: { ArG: [-0.2, 8.2] },
            passe: ['AiG', 'ArG', 0.2],
            def: { D3: [1.0, 7.1] },
          },
          {
            texte: "L'arrière gauche tire.",
            tir: 'ArG',
          },
        ],
      },
      {
        nom: "2 - Tir direct de l'arrière",
        etapes: [
          ...ESPAGNOLE_BASE,
          {
            texte: "Le demi-centre passe directement à l'arrière gauche, qui croise derrière lui.",
            courses: { ArG: [-0.4, 8.3], AiG: [-3.0, 9.0] },
            passe: ['DC', 'ArG', 0.2],
            def: { D3: [1.1, 7.2] },
          },
          {
            texte: "L'arrière gauche tire au centre.",
            tir: 'ArG',
          },
        ],
      },
      {
        nom: "3 - Tir de l'ailier",
        etapes: [
          ...ESPAGNOLE_BASE,
          {
            texte: "Le 3 gauche anticipe la course de l'arrière. Le demi-centre donne à l'ailier qui croise dans son dos.",
            courses: { AiG: [-2.6, 8.0], DC: [-4.2, 7.3] },
            passe: ['DC', 'AiG', 0.3],
            def: { G3: [-1.0, 7.2] },
          },
          {
            texte: "L'ailier tire en suspension derrière l'écran du demi-centre.",
            tir: 'AiG',
          },
        ],
      },
      {
        nom: '4 - Tir du demi-centre',
        etapes: [
          ...ESPAGNOLE_BASE,
          {
            texte: "La défense suit les deux courses. L'intervalle 2-3 s'ouvre: le demi-centre le prend.",
            courses: { DC: [-2.9, 7.0] },
            def: { G3: [-1.2, 7.4], G2: [-5.2, 6.0] },
          },
          {
            texte: "Le demi-centre tire.",
            tir: 'DC',
          },
        ],
      },
      {
        nom: "5 - Randonneur 1: passe à l'arrière opposé",
        etapes: [
          ...RANDONNEUR_BASE,
          {
            texte: "L'arrière droit attaque l'intervalle entre le 2 et le 3 et tire.",
            courses: { ArD: [3.8, 8.2] },
            tir: { par: 'ArD', t: 0.5 },
          },
        ],
      },
      {
        nom: "6 - Randonneur 2: l'arrière gauche dans l'intervalle 2-3",
        etapes: [
          ...RANDONNEUR_BASE,
          {
            texte: "L'arrière droit fixe à l'extérieur du 2 droit et donne dans la course de l'arrière gauche, qui a pris l'intervalle entre le 2 et le 3 droits.",
            courses: { ArD: [5.8, 8.0], ArG: { vers: [3.2, 8.0], via: [2.4, 9.4] } },
            passe: ['ArD', 'ArG', 0.6],
            def: { D2: [5.4, 6.4], D3: [2.0, 7.0] },
          },
          { texte: "L'arrière gauche tire.", tir: 'ArG' },
        ],
      },
      {
        nom: '7 - Randonneur 3: feinte de passe et tir entre le 1 et le 2',
        etapes: [
          ...RANDONNEUR_BASE,
          {
            texte: "L'arrière droit feinte la passe à l'arrière gauche, qui arrive dans l'intervalle 2-3: le 2 droit glisse vers l'intérieur.",
            courses: { ArD: [6.0, 7.6], ArG: { vers: [3.2, 8.0], via: [2.4, 9.4] } },
            def: { D2: [3.9, 6.6], D3: [2.0, 7.0] },
          },
          {
            texte: "L'arrière droit tire dans l'intervalle entre le 1 et le 2.",
            tir: { par: 'ArD', t: 0.2 },
          },
        ],
      },
      {
        nom: "8 - Randonneur 4: décalage sur l'ailier droit",
        etapes: [
          ...RANDONNEUR_BASE,
          {
            texte: "L'arrière droit fixe l'intervalle entre le 1 et le 2; le 1 sort sur lui.",
            courses: { ArD: [6.2, 7.6] },
            def: { D1: [7.2, 4.8], D2: [5.2, 6.2] },
          },
          {
            texte: "Il décale sur l'ailier droit, seul à l'aile.",
            courses: { AiD: [9.0, 1.8] },
            passe: ['ArD', 'AiD', 0.2],
          },
          { texte: "L'ailier droit tire.", tir: 'AiD' },
        ],
      },
      {
        nom: "9 - Espagnole A: blocs de l'arrière et du pivot",
        etapes: [
          ESPAGNOLE_BASE[0],
          ESPAGNOLE_BASE[1],
          {
            texte: "Le demi-centre fait une course rentrante et pose un écran sur le 2 gauche; dans sa course, il donne à l'ailier, qui s'engage vers le centre. L'arrière gauche rentre poser un bloc sur le 3 gauche.",
            courses: {
              DC: { vers: [-4.0, 7.6], ecran: true },
              ArG: { vers: [-1.6, 7.7], ecran: true },
              AiG: { vers: [-3.0, 9.2], via: [-7.8, 7.6] },
            },
            passe: ['DC', 'AiG', 0.6],
            def: { G2: [-4.7, 6.0] },
          },
          {
            texte: "L'arrière droit se lance vers le centre et reçoit de l'ailier. Le pivot bloque le 3 droit.",
            courses: {
              ArD: { vers: [0.6, 8.6], via: [3.0, 9.6] },
              AiG: [-2.6, 8.9],
              Piv: { vers: [0.8, 6.5], ecran: true },
            },
            passe: ['AiG', 'ArD', 0.5],
            def: { D3: [1.9, 6.8] },
          },
          {
            texte: "L'arrière droit tire en profitant des blocs de l'arrière gauche et du pivot.",
            courses: { ArD: [0.4, 8.0] },
            tir: { par: 'ArD', t: 0.45 },
          },
        ],
      },
      {
        nom: '10 - Version norvégienne (Gardillou)',
        etapes: [
          ESPAGNOLE_BASE[0],
          ESPAGNOLE_BASE[1],
          {
            texte: "La pivot se place entre la 2 et la 3 droites, à l'opposé. La demi-centre attaque balle en main vers la gauche; l'ailière gauche converge sans ballon vers l'espace entre la demi-centre et la 2; l'arrière gauche part déjà vers le milieu. À droite, l'arrière reste écartée et l'ailière à l'extrême de son aile.",
            courses: {
              Piv: [3.4, 6.3],
              DC: [-3.8, 7.9],
              AiG: { vers: [-5.0, 7.6], via: [-7.8, 5.8] },
              ArG: [-3.4, 10.2],
              ArD: [7.6, 8.6],
              AiD: [9.6, 0.6],
            },
            def: { G2: [-4.8, 5.9] },
          },
          {
            texte: "La demi-centre donne à l'ailière dans sa course et pose un écran sur la 2. L'ailière accélère vers le centre et met la 1 en retard.",
            courses: { DC: { vers: [-4.4, 6.9], ecran: true }, AiG: [-2.6, 8.4] },
            passe: ['DC', 'AiG', 0.3],
            def: { G3: [-1.9, 7.3], G1: [-6.8, 3.2] },
          },
          {
            texte: "Le ballon arrive à l'arrière gauche, lancée au centre, qui défie la 3 droite, désalignée et isolée.",
            courses: { ArG: [0.2, 8.8] },
            passe: ['AiG', 'ArG', 0.3],
            def: { D3: [1.2, 7.4] },
          },
          {
            texte: "Elle donne à l'arrière droite, qui reçoit en mouvement dans son couloir extérieur, sans opposition: la 1 et la 2 sont occupées par l'ailière et la pivot.",
            courses: { ArD: [5.8, 8.2] },
            passe: ['ArG', 'ArD', 0.3],
            def: { D2: [4.6, 5.8], D1: [7.6, 2.4] },
          },
          {
            texte: "L'arrière droite change de direction vers l'espace central et tire.",
            courses: { ArD: [4.2, 7.8] },
            tir: { par: 'ArD', t: 0.55 },
            def: { D2: [4.4, 6.4] },
          },
        ],
      },
      {
        nom: '11 - Spanier: tir du demi-centre',
        etapes: [
          {
            texte: "L'ailier, collé dans le coin, passe à l'arrière gauche.",
            courses: { AiG: [-9.6, 0.5] },
            passe: ['AiG', 'ArG', 0.4],
          },
          {
            texte: "L'arrière gauche fixe le 2. Le demi-centre arrive par derrière, dans son dos.",
            courses: { ArG: [-4.4, 8.4], DC: { vers: [-6.2, 9.8], via: [-3.2, 11.2] } },
            def: { G2: [-4.6, 6.4] },
          },
          {
            texte: "L'arrière donne au demi-centre, qui percute dans l'intervalle entre le 1 et le 2.",
            courses: { DC: [-6.6, 7.4] },
            passe: ['ArG', 'DC', 0.15],
            def: { G1: [-7.4, 3.2] },
          },
          { texte: "Le 1 reste sur l'ailier: le demi-centre tire.", tir: 'DC' },
        ],
      },
      {
        nom: "12 - Spanier: passe à l'ailier",
        etapes: [
          {
            texte: "L'ailier, collé dans le coin, passe à l'arrière gauche.",
            courses: { AiG: [-9.6, 0.5] },
            passe: ['AiG', 'ArG', 0.4],
          },
          {
            texte: "L'arrière gauche fixe le 2. Le demi-centre arrive par derrière, dans son dos.",
            courses: { ArG: [-4.4, 8.4], DC: { vers: [-6.2, 9.8], via: [-3.2, 11.2] } },
            def: { G2: [-4.6, 6.4] },
          },
          {
            texte: "L'arrière donne au demi-centre, qui percute dans l'intervalle entre le 1 et le 2.",
            courses: { DC: [-6.6, 7.4] },
            passe: ['ArG', 'DC', 0.15],
          },
          {
            texte: "Le 1 sort fermer l'intervalle: le demi-centre donne à l'ailier.",
            courses: { AiG: [-9.4, 1.2] },
            passe: ['DC', 'AiG', 0.4],
            def: { G1: [-7.0, 5.4] },
          },
          { texte: "L'ailier tire.", tir: 'AiG' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'yago',
    nom: 'Yago',
    categorie: 'Jeu avec le pivot',
    defense: '0-6',
    resume: "Le pivot sort aux 9 m et croise avec le demi-centre ou l'arrière opposé pour isoler le défenseur 3.",
    description: [
      "Origine du nom: deux versions qui s'accordent sur la joueuse mais pas sur l'auteur. Pour la revue fédérale Approches du Handball (n°118, 2010), le Yago est une création de Jean-Claude Thomas, entraîneur de l'équipe de France féminine de 1970 à 1977, \"du nom d'une des demi-centres de l'équipe de France des années soixante-dix, Yago Folliot\". Pour Yvelines Infos (2018), il a été inventé par la demi-centre elle-même, Jadwiga Nowak-Folliot (\"Jagou\"), à ses premières sélections; ses coéquipières l'ont baptisé \"Yago\".",
      "Au sens actuel, le Yago est un \"croisé demi-centre - pivot\": le pivot sort en poste aux 9 m et joue avec le demi-centre (A. Behm, qui le dit joué par les Français au Mondial 2001; A. Portes). En LNH 2017-18, c'est le mouvement le plus fréquent (Yago à gauche 807 fois et à droite 289 fois en une demi-saison).",
      "Variantes 1 et 2: description d'un entraîneur (l'utilisateur du site), conservée telle quelle. Le pivot reçoit du demi-centre, donne à l'arrière opposé qui passe au ras de lui, puis redescend aux 6 m du côté opposé. Le passeur et le replacement du pivot ne sont pas confirmés par les sources.",
      "Variante 3: déroulement en cinq temps donné par Yvelines Infos. Variantes 4 et 5: version originale de J.-C. Thomas, décrite poste par poste (la pivot \"centrale\" dégagée devant la défense, la demi-centre qui pénètre balle en main, donne et bloque). Variantes 6 à 8: Yago de Montpellier analysé par G. Petitgirard; D. Fleurance décrit le même schéma en équipe de France juniors. Variantes 9 et 10: croisé demi-centre / pivot (P. Kovacs, Euro 2016). Variante 11: Yago-entrée d'ailière (A. Portes). Variante 12: \"Yago joué par le pivot\" avec glissement (interligues 2019). Variante 13: \"Yago Magdeburg\", principe seulement.",
      "Autres formes citées: contre une 3-2-1, sortie en poste du pivot sur l'avancé et rentrée du demi-centre pour jouer à deux pivots (J.-L. Le Gall); Pologne 2013, Yago avec rentrée d'ailière à l'opposé et rotation d'arrière; Yago avec la gardienne demi-centre à 7 contre 6 (F. Sauval); Espagne 2015, Yago puis l'ailier se place dans la défense (voir \"L'ailier hors secteur\"). Le \"faux Yago\" sert d'appât avant un second mouvement (45 % d'issues favorables en LNH). Après un Yago sans résultat, on enchaîne à un ou deux pivots (É. Baradat). L'équipe de France U20 nomme trois intentions de Yago: \"Isoler\", \"Essen\", \"Centrale\" (non décrites).",
    ],
    objectif: "Isoler le défenseur 3 et jouer en débordement sur lui.",
    pointsCles: [
      "Le pivot sort franchement vers les 9 m pour emmener son défenseur et offrir une solution de passe sûre.",
      "L'arrière opposé part au moment où le pivot reçoit et passe au ras de lui pour recevoir lancé.",
      "La sortie du pivot vide le centre: les 3 n'ont plus de pivot à surveiller.",
    ],
    fiabilite: 'partielle',
    sources: [
      {
        titre: "Handball: la Yago de Jagou à l'honneur (Yvelines Infos, 2018, archive)",
        url: 'https://web.archive.org/web/20190704231205/https://www.yvelines-infos.fr/handball-yago-de-jagou-a-lhonneur/',
        note: 'Origine du nom et déroulement en cinq temps (variante 3).',
      },
      {
        titre: 'Le Yago (Handball Coach 56)',
        url: 'https://handballcoach.over-blog.com/2019/10/yago.html',
        note: '"isoler le numéro 3 et jouer en débordement dessus"; liste de variantes.',
      },
      {
        titre: 'Stratégies 2025/2026 de Martigua (Coach, oui Coach!)',
        url: 'https://www.coachouicoach.com/strategies-2025-de-martigua',
        note: 'Combinaisons Yago/Yugo: le pivot écrase un défenseur en écran ou écarte le jeu.',
      },
      {
        titre: '"Yago" par Jean-Claude Thomas (Approches du Handball n°118, 2010, pp. 22-36)',
        url: 'https://www.calameo.com/ffhandball/read/007275111bed3a9d4490b?page=22',
        note: "\"Pour déclencher le \"Yago\", je dois: être en avant de mes deux arrières, m'assurer que le pivot [...] est \"centrale\", bien dégagée de la défense [...] Je pénètre \"balle en main\"\"; nom tiré de \"Yago Folliot\" (variantes 4 et 5).",
      },
      {
        titre: 'G. Petitgirard, Le "Yago": mode? chorégraphie? ou déstabilisation des défenses? (Approches n°161, 2017)',
        url: 'https://www.calameo.com/ffhandball/read/00727511197437d892795?page=24',
        note: "Yago de Montpellier en 6 photos: le DC croise en passant devant le pivot, qui donne à l'ARD; le DC prend le poste d'ARG (variantes 6 à 8).",
      },
      {
        titre: "D. Fleurance, Le réseau d'échange sur la base arrière (Approches n°151, 2016)",
        url: 'https://www.calameo.com/ffhandball/read/007275111735cfdd874e5?page=46',
        note: "\"Le demi-centre croise avec le pivot qui donne à l'arrière droit pour se replacer entre le n°2 et le n°3 de défense\" (pivot placé à l'extérieur).",
      },
      {
        titre: 'A. Behm, Handball: mes coups de cœur (Approches n°114)',
        url: 'https://www.calameo.com/ffhandball/read/007275111122817ab0e6a?page=49',
        note: '"Croisé demi-centre - pivot. Joué par les français au championnat du monde en 2001".',
      },
      {
        titre: 'P. Kovacs, Euro 2016 (Approches n°154, p. 40)',
        url: 'https://www.calameo.com/ffhandball/read/007275111d355a4ee3ad9?page=40',
        note: "\"Le croisé demi-centre / pivot sur une sortie en poste du pivot\": tir du pivot, ou passe à l'ARD qui s'engage à l'extérieur (variantes 9 et 10).",
      },
      {
        titre: 'A. Portes, Portes cible les défenses adverses (Approches n°147, 2015)',
        url: 'https://www.calameo.com/ffhandball/read/00727511117a5fff28271?page=7',
        note: "\"C'est un croisé de la demi-centre avec le pivot qui sort en poste\"; Yago-entrée d'ailière: \"le timing est important\" (variante 11).",
      },
      {
        titre: 'D. Chastel, Le jeu des pivots en relation avec les arrières, partie 2 (Approches n°179, 2020)',
        url: 'https://www.calameo.com/ffhandball/read/007275111bfe7378958a5?page=20',
        note: "\"Le pivot sort en \"yago\" quand la demi-centre a la balle [...] et se dirige dans le secteur de l'arrière gauche\"; glissement du pivot (variante 12, jouée ici en miroir).",
      },
      {
        titre: 'G. Cojean, Analyse des stratégies de préparation au duel 1vs1, partie 2/2 (Approches n°201, 2024)',
        url: 'https://www.centre-handball.com/wp-content/uploads/2024/04/Approches_n201_MARS-2024.pdf',
        note: "\"Yago Magdeburg\": \"pendant que le yago se joue, l'ailier se place comme pivot puis se replace à l'aile ou pas au moment du 1x1\" (variante 13).",
      },
      {
        titre: 'Komar, Lasvergnas, Belmessoud, Quelle efficacité des mouvements de joueurs en LNH? (Approches n°175, 2019)',
        url: 'https://www.calameo.com/ffhandball/read/007275111bdb91e2c432d?page=28',
        note: 'Fréquences 2017-18 (Yago G 807, Yago D 289) et "faux Yago" (45 % d\'issues favorables).',
      },
      {
        titre: "L'utilisation de l'intervalle 1-2 par le pivot (Approches n°140, 2014)",
        url: 'https://www.calameo.com/ffhandball/read/0072751117ab39c5a79db?page=43',
        note: "Pologne 2013: \"mouvement de type \"Yago\" couplé avec une rentrée d'ailière à l'opposé et une rotation d'arrière\".",
      },
      {
        titre: "J.-L. Le Gall, Le jeu vers l'extérieur (Approches n°149, 2015)",
        url: 'https://www.calameo.com/ffhandball/read/007275111fb416399e59b?page=45',
        note: 'Contre 3-2-1: "sortie en poste du pivot sur le n°3 avancé et rentrée du demi-centre (jeu à deux pivots) - Yago".',
      },
    ],
    depart: { Piv: [-3.4, 6.3] },
    ballon: 'DC',
    variantes: [
      {
        nom: "1 - Version entraîneur: tir de l'arrière",
        etapes: [
          ...YAGO_BASE,
          {
            texte: "Le 3 droit reste avec le pivot. L'arrière droit prend l'intervalle et tire.",
            courses: { ArD: [0.1, 7.3] },
            tir: { par: 'ArD', t: 0.5 },
            def: { D3: [2.1, 7.1] },
          },
        ],
      },
      {
        nom: '2 - Version entraîneur: passe au pivot',
        etapes: [
          ...YAGO_BASE,
          {
            texte: "Le 3 droit sort sur l'arrière. L'arrière donne au pivot, replacé dans son dos.",
            courses: { Piv: [3.0, 6.2] },
            passe: ['ArD', 'Piv', 0.4],
            def: { D3: [0.9, 7.3] },
          },
          {
            texte: "Le pivot tire.",
            tir: 'Piv',
          },
        ],
      },
      {
        nom: "3 - Version Yvelines Infos (fin à l'aile)",
        etapes: [
          {
            texte: "Départ du pivot: course en courbe jusqu'aux 9 m.",
            courses: { Piv: { vers: [-1.6, 9.4], via: [-3.6, 9.2] } },
            passe: ['DC', 'ArG', 0.1],
          },
          {
            texte: "Le pivot reçoit le ballon de l'arrière latéral (ici l'arrière gauche).",
            passe: ['ArG', 'Piv', 0],
          },
          {
            texte: "Croisé avec l'arrière opposé: le pivot attaque vers la droite, l'arrière droit croise derrière lui et reçoit.",
            courses: { Piv: [1.6, 8.6], ArD: { vers: [0.2, 9.4], via: [3.4, 10.6] } },
            passe: ['Piv', 'ArD', 0.55],
            def: { D3: [2.0, 7.3] },
          },
          {
            texte: "Décalage du demi-centre et départ simultané de l'ailier: l'arrière droit donne au demi-centre, décalé à droite, pendant que l'ailier droit démarre. Le pivot redescend.",
            courses: {
              ArD: [-0.6, 8.8],
              DC: { vers: [3.0, 9.8], via: [1.4, 11.2] },
              AiD: [8.0, 2.6],
              Piv: [4.2, 6.6],
            },
            passe: ['ArD', 'DC', 0.6],
            def: { G3: [-0.9, 7.3], D3: [1.6, 7.2], D2: [4.9, 5.5] },
          },
          {
            texte: "Le demi-centre attaque le 3 isolé. Le 1 droit vient aider: décalage vers l'aile.",
            courses: { DC: { vers: [3.2, 7.6], via: [3.6, 8.8] } },
            passe: ['DC', 'AiD', 0.65],
            def: { D3: [2.3, 6.9], D1: [6.4, 3.6] },
          },
          {
            texte: "L'ailier droit tire.",
            courses: { AiD: [7.6, 2.6] },
            tir: { par: 'AiD', t: 0.35 },
          },
        ],
      },
      {
        nom: "4 - Original J.-C. Thomas: passe à l'arrière droite",
        etapes: [
          ...YAGO_THOMAS_BASE,
          {
            texte: "L'arrière droite s'engage vers le but, plutôt vers l'intérieur pour profiter du bloc. La pivot lui donne (si l'ailière s'engage aussi, elle sert plutôt l'arrière).",
            courses: { ArD: [3.4, 8.4] },
            passe: ['Piv', 'ArD', 0.45],
            def: { D2: [4.2, 6.5] },
          },
          {
            texte: "L'arrière droite tire. La pivot reste aux 6 m en second pivot ou ressort vite en soutien.",
            courses: { ArD: [3.0, 7.8] },
            tir: { par: 'ArD', t: 0.5 },
          },
        ],
      },
      {
        nom: "5 - Original J.-C. Thomas: ailière et croisé de l'arrière",
        etapes: [
          ...YAGO_THOMAS_BASE,
          {
            texte: "L'arrière droite ne s'engage pas. L'ailière droite va au-devant de la pivot, vers l'intérieur, et reçoit.",
            courses: { AiD: { vers: [5.8, 6.4], via: [8.2, 4.6] } },
            passe: ['Piv', 'AiD', 0.5],
            def: { D1: [6.6, 4.4], D2: [4.6, 6.0] },
          },
          {
            texte: "L'ailière déborde vers l'intérieur; l'arrière droite croise derrière elle et reçoit.",
            courses: { AiD: [4.4, 7.2], ArD: { vers: [6.6, 7.8], via: [5.2, 9.4] } },
            passe: ['AiD', 'ArD', 0.55],
            def: { D2: [3.9, 6.3], D1: [7.2, 4.6] },
          },
          {
            texte: "L'arrière droite tire entre le 2 et le 1.",
            courses: { ArD: [6.4, 7.2] },
            tir: { par: 'ArD', t: 0.5 },
          },
        ],
      },
      {
        nom: "6 - Montpellier: tir sur l'écran du pivot",
        etapes: [
          ...YAGO_MONTPELLIER,
          {
            texte: "L'arrière droit tire à mi-distance, par-dessus l'écran du pivot.",
            courses: { ArD: [4.4, 8.6] },
            tir: { par: 'ArD', t: 0.4 },
          },
        ],
      },
      {
        nom: '7 - Montpellier: passe au pivot',
        etapes: [
          ...YAGO_MONTPELLIER,
          {
            texte: "Le 3 droit sort sur l'arrière. L'arrière donne au pivot, derrière le 3: le pivot a gagné sa position sur le 2.",
            courses: { Piv: [3.2, 6.4] },
            passe: ['ArD', 'Piv', 0.4],
            def: { D3: [3.0, 7.9], D2: [5.0, 5.6] },
          },
          { texte: 'Le pivot tire.', tir: 'Piv' },
        ],
      },
      {
        nom: '8 - Montpellier: duel du nouveau demi-centre',
        etapes: [
          ...YAGO_MONTPELLIER,
          {
            texte: "Le 3 gauche reste seul au centre. L'arrière droit rend au nouveau demi-centre (l'ancien arrière gauche), lancé.",
            courses: { ArG: [-0.6, 8.8] },
            passe: ['ArD', 'ArG', 0.3],
            def: { G3: [-1.0, 7.4] },
          },
          {
            texte: "Il joue le duel sur le 3 isolé, le déborde et tire.",
            courses: { ArG: [0.4, 7.7] },
            tir: { par: 'ArG', t: 0.55 },
          },
        ],
      },
      {
        nom: '9 - Croisé DC/pivot: tir du pivot',
        etapes: [
          ...YAGO_CROISE_DC_PIVOT,
          {
            texte: "Le 3 droit hésite entre le pivot et l'arrière droit. Le pivot prend l'intervalle et tire.",
            courses: { Piv: [2.0, 7.9] },
            tir: { par: 'Piv', t: 0.5 },
            def: { D3: [2.8, 7.2] },
          },
        ],
      },
      {
        nom: "10 - Croisé DC/pivot: l'arrière à l'extérieur",
        etapes: [
          ...YAGO_CROISE_DC_PIVOT,
          {
            texte: "Le 2 droit ferme l'intervalle. Le pivot donne à l'arrière droit, qui s'engage à l'extérieur, entre le 2 et le 1.",
            courses: { ArD: [6.0, 7.8] },
            passe: ['Piv', 'ArD', 0.45],
            def: { D2: [3.6, 6.8] },
          },
          { texte: "L'arrière droit tire.", tir: 'ArD' },
        ],
      },
      {
        nom: "11 - Yago-entrée d'ailière (Portes)",
        etapes: [
          {
            texte: "La pivot sort en poste; la 3 gauche, en défense basse, sort avec elle. L'ailière gauche démarre son entrée le long des 6 m.",
            courses: {
              Piv: { vers: [-1.8, 9.2], via: [-3.4, 8.4] },
              AiG: { vers: [-4.8, 6.2], via: [-7.6, 4.4] },
            },
            def: { G3: [-1.9, 7.8] },
          },
          {
            texte: "Croisé: la demi-centre passe devant la pivot et lui donne le ballon. Au même moment, l'ailière file dans l'espace laissé par la 3, dans son dos.",
            courses: {
              DC: { vers: [-2.8, 8.8], via: [-1.0, 9.0] },
              Piv: { vers: [1.2, 9.8], via: [-1.2, 10.8] },
              AiG: [-1.6, 6.3],
            },
            passe: ['DC', 'Piv', 0.45],
            def: { G2: [-4.0, 5.8] },
          },
          {
            texte: "La pivot donne à l'ailière, seule dans le dos de la 3.",
            courses: { AiG: [-1.2, 6.2] },
            passe: ['Piv', 'AiG', 0.2],
            def: { D3: [0.8, 6.8] },
          },
          { texte: "L'ailière tire.", tir: 'AiG' },
        ],
      },
      {
        nom: '12 - Yago par le pivot et glissement',
        etapes: [
          {
            texte: "Mise en place (jeu en miroir de la source): le pivot se place entre le 1 et le 2 gauches.",
            courses: { Piv: { vers: [-6.0, 4.9], via: [-5.2, 6.8] } },
            def: { G2: [-4.6, 5.3] },
          },
          {
            texte: 'Le pivot sort "en yago" vers la base arrière et reçoit du demi-centre.',
            courses: { Piv: { vers: [-3.0, 9.4], via: [-5.6, 8.0] } },
            passe: ['DC', 'Piv', 0.6],
          },
          {
            texte: "Le pivot se dirige balle en main vers le secteur de l'arrière droit et lui donne le ballon. Le demi-centre part se replacer en arrière gauche; l'arrière gauche prépare sa course vers le centre.",
            courses: {
              Piv: { vers: [1.8, 9.0], via: [-0.6, 9.6] },
              DC: { vers: [-2.8, 11.6], via: [-1.4, 11.6] },
              ArG: [-5.4, 10.6],
              ArD: [5.2, 9.4],
            },
            passe: ['Piv', 'ArD', 0.75],
          },
          {
            texte: "Le pivot se replace entre les deux 3. L'arrière droit avance sans dépasser l'axe du pivot, pour garder les défenseurs de son côté, puis donne à l'arrière gauche lancé au centre. Le demi-centre, replacé arrière gauche, écarte le jeu.",
            courses: {
              Piv: { vers: [0, 6.5], via: [1.2, 7.8] },
              ArD: [2.6, 8.8],
              ArG: { vers: [-1.0, 9.6], via: [-3.8, 9.4] },
              DC: { vers: [-6.0, 10.6], via: [-4.0, 11.6] },
            },
            passe: ['ArD', 'ArG', 0.75],
            def: { D3: [1.9, 7.2], D2: [4.2, 6.2] },
          },
          {
            texte: "Sur la passe, le pivot glisse dans l'intervalle entre le 3 et le 2 gauches. Les deux 3 hésitent entre sortir et couvrir le pivot: l'arrière gauche tire au centre.",
            courses: { Piv: [-3.0, 6.4], ArG: [-0.4, 8.6] },
            tir: { par: 'ArG', t: 0.55 },
            def: { G3: [-2.0, 7.0], G2: [-4.6, 5.8], D3: [1.2, 7.2] },
          },
        ],
      },
      {
        nom: '13 - Yago Magdeburg (ailier en faux pivot)',
        etapes: [
          {
            texte: "Le pivot sort en poste vers les 9 m. L'ailier gauche quitte son aile et se place comme un pivot, entre le 2 et le 3 gauches.",
            courses: {
              Piv: { vers: [-1.8, 9.2], via: [-3.4, 8.4] },
              AiG: { vers: [-3.6, 6.4], via: [-7.0, 5.8] },
            },
            def: { G3: [-1.9, 7.4] },
          },
          {
            texte: "Le demi-centre donne au pivot et se décale à droite. L'arrière droit traverse vers le pivot.",
            courses: {
              DC: { vers: [3.6, 10.2], via: [1.6, 11.2] },
              ArD: { vers: [-0.2, 9.6], via: [2.2, 9.6] },
            },
            passe: ['DC', 'Piv', 0.2],
          },
          {
            texte: "Le pivot donne à l'arrière droit lancé, qui joue le 1 contre 1 au centre. Au moment du duel, l'ailier ressort vers son aile (il peut aussi rester dedans).",
            courses: { ArD: [-0.8, 8.2], AiG: { vers: [-8.4, 2.4], via: [-6.0, 6.0] } },
            passe: ['Piv', 'ArD', 0.1],
            def: { G3: [-1.7, 7.2], D3: [1.0, 7.2] },
          },
          {
            texte: "L'arrière droit tire.",
            courses: { ArD: [-0.4, 7.7] },
            tir: { par: 'ArD', t: 0.4 },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'renverse',
    nom: 'Renversé',
    alias: 'Renversement',
    categorie: 'Circulation',
    defense: '0-6',
    resume: "Le ballon circule d'un côté, le demi-centre renverse le jeu et le pivot bloque le 3 pour créer le surnombre de l'autre côté.",
    description: [
      "Aucune source trouvée ne décrit une combinaison appelée \"le renversé\". Le terme officiel (lexique FFHB) est le renversement: \"action offensive du porteur de balle qui inverse le sens de la circulation de balle\". Certains clubs l'emploient aussi pour une passe rendue à celui qui vient de passer.",
      "Les variantes 1 à 3 suivent l'attaque d'une 0-6 par le renversement et le bloc du pivot sur le 3 (entrainement-handball.fr, Tactique de match 01). Le ballon circule à gauche et la défense coulisse. Le demi-centre renverse vers la droite; au même moment, le pivot inverse ses appuis et bloque le 3 droit. L'arrière droit se réengage entre le 1 et le 2 et lit la défense: 1 devant l'ailier et 2 sur le pivot, il tire; le 2 sort, passe en diagonale au pivot; le 1 sort, passe à l'ailier (choisis une fin au-dessus du schéma).",
      "La variante 4 suit la définition du \"renversement\" par fixation de Dragør (f1356): l'arrière suggère la passe à son ailier, se retourne vite et envoie à l'arrière opposé, qui tire ou sert son ailier.",
      "Autres usages: un croisé demi-centre / arrière suivi d'un renversement vers l'ailier, avec glissement du pivot à l'opposé (F. Maurice; voir la fiche \"Croisé\", variante 6). Contre une 3-2-1, Román Seco demande au centre qui reçoit d'un côté de pénétrer vers le côté opposé puis de changer le sens de la passe, pour porter vite le ballon vers les espaces les plus éloignés. Fiches voisines: bloc extérieur danois, modèles de Román contre 5-1, moulinette.",
      "Si \"Renversé\" désigne autre chose dans ton club, dis-le pour qu'on corrige la fiche.",
    ],
    objectif: "Bloquer le n°3 du côté du renversement pour créer un surnombre.",
    pointsCles: [
      "Le pivot se place entre le 2 et le 3, à côté du 2, et suit le 3 pendant que la défense coulisse.",
      "Le bloc du pivot se pose au moment exact du renversement.",
      "L'arrière se désengage puis se réengage entre le 1 et le 2; l'ailier se replace au point de corner.",
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: "Tactique de match 01: attaque d'une 0-6 par le renversement et le bloc du pivot sur le n°3 (entrainement-handball.fr)",
        url: 'https://www.entrainement-handball.fr/coacher/tactique-de-match/tactique-de-match-01-lattaque-dune-defense-0-6-par-le-renversement-et-le-bloc-du-pivot-sur-le-n3/',
        note: "\"Pendant que le Demi-Centre renverse le jeu, le Pivot inverse ses appuis et pose un bloc sur le défenseur n°3.\" Fins: tir de l'arrière entre 1 et 2, passe au pivot, passe à l'ailier (variantes 1 à 3).",
      },
      {
        titre: 'Lexique FFHB, Approches du Handball (DTN, 2005)',
        url: 'https://www.handball75.fr/ressources/fichiers/09329621f89c.pdf',
        note: 'Définitions de "renverser" et de "passe de renversement".',
      },
      {
        titre: "Tactiques-techniques d'attaques au handball (blog Wendyam-Hermann)",
        url: 'https://correspondanceshandball.over-blog.com/pages/Tactiquestechniques_dattaques_au_handball-314600.html',
        note: '"renvoyer la balle au joueur qui nous l\'a envoyé": l\'autre sens du mot.',
      },
      {
        titre: 'A propos des fixations (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f1356.html',
        note: "Renversement: l'arrière suggère la passe à son ailier, se retourne vite et envoie à l'arrière opposé (variante 4).",
      },
      {
        titre: 'J. D. Román Seco, Evolución del deporte de balonmano V (UPM)',
        url: 'https://oa.upm.es/48162/1/MONOGRAFICO_JUAN_DE_DIOS_ROMAN_SECO_05.pdf',
        note: 'Contre 3-2-1: "Lo verdaderamente importante es el traslado inmediato del balón a los espacios más alejados".',
      },
      {
        titre: "F. Maurice, Jeu vers l'extérieur et continuité du jeu (Approches des Handballs n°196, 2023)",
        url: 'https://www.centre-handball.com/wp-content/uploads/2023/09/Approches_n196_MAI-2023.pdf',
        note: "\"Le jeu démarre par le croisé DC/AR + renversement\"; le pivot glisse à l'opposé.",
      },
    ],
    depart: { Piv: [3.4, 6.4] },
    ballon: 'ArG',
    variantes: [
      {
        nom: "1 - Pénétration de l'arrière",
        etapes: [
          ...RENVERSE_BASE,
          {
            texte: "Le 1 reste sur l'ailier et le 2 sur le pivot: l'arrière droit pénètre entre le 1 et le 2 et tire.",
            courses: { ArD: [5.2, 6.9] },
            tir: { par: 'ArD', t: 0.55 },
            def: { D2: [3.6, 6.0], D1: [8.2, 1.8] },
          },
        ],
      },
      {
        nom: '2 - Passe au pivot',
        etapes: [
          ...RENVERSE_BASE,
          {
            texte: "Le 2 sort sur l'arrière: l'arrière droit passe en diagonale au pivot.",
            courses: { Piv: [2.6, 6.1] },
            passe: ['ArD', 'Piv', 0.3],
            def: { D2: [5.0, 6.8] },
          },
          { texte: 'Le pivot tire.', tir: 'Piv' },
        ],
      },
      {
        nom: "3 - Passe à l'ailier",
        etapes: [
          ...RENVERSE_BASE,
          {
            texte: "Le 1 sort sur l'arrière: l'arrière droit passe à l'ailier droit.",
            courses: { AiD: [9.0, 1.4] },
            passe: ['ArD', 'AiD', 0.3],
            def: { D1: [6.8, 5.0] },
          },
          { texte: "L'ailier droit tire.", tir: 'AiD' },
        ],
      },
      {
        nom: '4 - Renversement par fixation',
        etapes: [
          {
            texte: "L'arrière gauche fixe et fait mine de passer à son ailier. La défense glisse vers l'aile gauche.",
            courses: { ArG: [-5.2, 8.4] },
            def: { G1: [-7.8, 2.6], G2: [-5.6, 5.8], G3: [-2.6, 6.9], D3: [0.8, 6.9], D2: [4.2, 5.6] },
          },
          {
            texte: "Il se retourne vite et envoie le ballon à l'arrière droit, qui s'engage.",
            courses: { ArD: [5.0, 8.4] },
            passe: ['ArG', 'ArD', 0.3],
          },
          {
            texte: "L'arrière droit tire avant que la défense ne revienne (ou sert son ailier).",
            tir: { par: 'ArD', t: 0.3 },
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'bloc-roule',
    nom: 'Bloc-roule',
    alias: 'Écran-roule, pick and roll, blocage et dégagement (blokade z odvajanjem, SI)',
    categorie: 'Jeu avec le pivot',
    defense: '0-6',
    resume: "Le pivot pose un écran pour l'arrière, puis pivote vers le but pour recevoir dans le dos de la défense.",
    description: [
      "Le pivot sort poser un écran (\"bloc\") sur le flanc du défenseur 2. L'arrière passe de l'autre côté de l'écran et attaque l'intervalle.",
      "Si un défenseur change pour prendre l'arrière, le pivot \"roule\": il pivote vers le but dans son dos et reçoit.",
      "Les sources décrivent le bloc du pivot sur le 2, l'arrière qui attaque le 3 par l'intérieur et la passe au pivot qui a bloqué le retour du 2 (variante 1). Dragør décrit la même action, en anglais \"Building up to Russian screening\": après une circulation, l'arrière menace de tirer, le pivot sort poser un écran sur son défenseur, l'arrière attaque le défenseur du pivot et donne au pivot qui a fait l'écran, par une passe en suspension ou à rebond (variantes 2 et 3). Le nom \"bloc-roule\" lui-même n'apparaît pas dans les sources.",
      "Román Seco décrit aussi le bloc du pivot sur le défenseur du demi-centre: si le défenseur du pivot sort, passe au pivot qui roule vers l'intérieur; sinon, tir du demi-centre (variantes 4 et 5). Il cite encore le bloc diagonal par derrière, où le pivot \"casse\" son bloc pour occuper les 6 m. En Allemagne, l'écran intérieur (\"Innensperre\") peut n'être que feinté: le pivot recule dans l'espace libre quand le défenseur sort (variante 6, décrite contre une 3-2-1).",
      "Une source portugaise distingue le bloc \"vrai\", le bloc \"faux\" (le défenseur anticipe) et le bloc \"inefficace\"; dans la phase d'exploitation, le bloqueur roule. Le vocabulaire slovène parle de \"blokade z odvajanjem\" (bloc puis dégagement). Ne pas confondre avec le \"bloc russe\", qui a sa propre fiche.",
    ],
    objectif: "Créer un 2 contre 1 entre l'arrière et le pivot.",
    pointsCles: [
      "Le bloc se fait avec le corps, sans les bras.",
      "L'arrière frôle le bloc pour ne pas laisser passer le défenseur.",
      "La passe va dans l'espace libre devant le pivot, pas directement sur lui.",
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: 'Le bloc du Pivot pour un jeu à 2 contre 2 avec l\'Arrière (entrainement-handball.fr)',
        url: 'https://www.entrainement-handball.fr/exercice/le-bloc-du-pivot-pour-un-jeu-a-2-contre-2-avec-larriere/',
        note: "Le pivot va \"bloquer le défenseur n°2\", l'arrière attaque \"du côté intérieur le défenseur n°3\" puis donne au pivot.",
      },
      {
        titre: 'Le poste de pivot au handball (Decathlon)',
        url: 'https://conseilsport.decathlon.fr/le-poste-de-pivot-au-handball',
        note: "Si le défenseur se rabat, le pivot s'insère dans l'espace créé pour tirer.",
      },
      {
        titre: 'Lexique: Bloc (entrainement-handball.fr)',
        url: 'https://www.entrainement-handball.fr/lexique/bloc/',
        note: 'Définition du bloc.',
      },
      {
        titre: 'Building up to Russian screening (Dragør HK, anglais)',
        url: 'http://www.dragoerhb.dk/english/z210.html',
        note: '"The pivot moves out and puts a screening on the back and left back takes a dribble and attack the defender of the pivot. The ball is then passed to the screening pivot by using a jump shot pass or a bouncing pass" (variantes 2 et 3).',
      },
      {
        titre: 'J. D. Román Seco, Evolución del juego de balonmano VI: el juego del pivote (UPM)',
        url: 'https://oa.upm.es/48165/1/MONOGRAFICO_JUAN_DE_DIOS_ROMAN_SECO_06.pdf',
        note: 'Bloc du pivot sur le défenseur du centre: passe au pivot qui roule, ou tir du centre (variantes 4 et 5); bloc diagonal par derrière.',
      },
      {
        titre: 'handballecke.de, "Wie knackt man eine 3-2-1-Deckung?" (post 7)',
        url: 'https://www.handballecke.de/forum/thread/20846-wie-knackt-man-eine-3-2-1-deckung/',
        note: '"KM täuscht die Sperre nur an, HM tritt heraus und KM sinkt in den freien Raum anspielbereit zurück" (variante 6).',
      },
      {
        titre: 'Associação de Andebol de Braga, Táctica de Grupo Ofensiva',
        url: 'http://aab.pt/noticias.ver.php?cid=844',
        note: '"Bloquear significa interromper ou impedir a passagem de um adversário em benefício de um companheiro de equipa"; bloc vrai, faux, inefficace.',
      },
      {
        titre: 'G. Ilc, Metodika učenja skupinskih napadalnih aktivnosti (Fakulteta za šport, Ljubljana, 2007)',
        url: 'https://www.fsp.uni-lj.si/COBISS/Diplome/Diploma22044810IlcGregor.pdf',
        note: '"blokade z odvajanjem": bloc puis dégagement.',
      },
    ],
    depart: { Piv: [-0.3, 6.4] },
    ballon: 'DC',
    variantes: [
      {
        nom: '1 - Bloc sur le 2 et roulade',
        etapes: [
          {
            texte: "Le demi-centre passe à l'arrière gauche. Le pivot sort poser un écran sur le flanc intérieur du défenseur 2 gauche.",
            courses: { Piv: { vers: [-4.3, 6.5], ecran: true } },
            passe: ['DC', 'ArG', 0.1],
          },
          {
            texte: "L'arrière gauche attaque en frôlant l'écran. Le 3 gauche change pour le prendre.",
            courses: { ArG: { vers: [-3.0, 8.0], via: [-5.0, 8.6] } },
            def: { G3: [-2.6, 7.2], G2: [-5.1, 5.6] },
          },
          {
            texte: "Le pivot roule vers le but dans le dos du 3 gauche. L'arrière lui donne le ballon.",
            courses: { Piv: { vers: [-3.3, 6.1], via: [-3.9, 5.9] } },
            passe: ['ArG', 'Piv', 0.5],
          },
          {
            texte: "Le pivot tire en pivotant face au but.",
            tir: 'Piv',
          },
        ],
      },
      {
        nom: '2 - Mise en place du bloc russe (Dragør): passe au pivot',
        etapes: [
          ...BLOC_RUSSE_BASE,
          {
            texte: "Le pivot roule dans le dos du 3. L'arrière lui donne par une passe en suspension ou à rebond.",
            courses: { Piv: { vers: [-3.2, 6.2], via: [-3.9, 6.0] } },
            passe: ['ArG', 'Piv', 0.5],
          },
          { texte: 'Le pivot tire.', tir: 'Piv' },
        ],
      },
      {
        nom: "3 - Mise en place du bloc russe (Dragør): tir de l'arrière",
        etapes: [
          ...BLOC_RUSSE_BASE,
          {
            texte: "Le 3 reste avec le pivot et ne couvre pas le passage de l'arrière: l'arrière tire lui-même.",
            courses: { ArG: [-1.4, 8.0] },
            tir: { par: 'ArG', t: 0.5 },
            def: { G3: [-3.1, 6.4] },
          },
        ],
      },
      {
        nom: '4 - Bloc sur le défenseur du centre: passe au pivot (Román)',
        etapes: [
          ...BLOC_CENTRE_BASE,
          {
            texte: "Le défenseur du pivot (le 3 gauche) sort sur le demi-centre. Le pivot roule vers l'intérieur et reçoit.",
            courses: { DC: [-0.4, 8.3], Piv: { vers: [0.2, 6.3], via: [0.8, 6.3] } },
            passe: ['DC', 'Piv', 0.55],
            def: { G3: [-0.9, 7.5], D3: [2.0, 6.8] },
          },
          { texte: 'Le pivot tire.', tir: 'Piv' },
        ],
      },
      {
        nom: '5 - Bloc sur le défenseur du centre: tir du demi-centre (Román)',
        etapes: [
          ...BLOC_CENTRE_BASE,
          {
            texte: "Le 3 gauche reste avec le pivot: le demi-centre passe le long du bloc et tire.",
            courses: { DC: [-0.3, 8.2] },
            tir: { par: 'DC', t: 0.5, cible: [-0.9, -0.35] },
            def: { G3: [-1.4, 6.9] },
          },
        ],
      },
      {
        nom: '6 - Faux écran intérieur (Innensperre)',
        etapes: [
          {
            texte: "Le demi-centre donne à l'arrière gauche. Le pivot vient se placer à l'intérieur du 2 gauche, comme pour un écran.",
            courses: { Piv: { vers: [-3.6, 6.6], via: [-2.0, 7.4] } },
            passe: ['DC', 'ArG', 0.2],
            def: { G2: [-4.6, 5.8] },
          },
          {
            texte: "L'arrière gauche percute vers l'extérieur, avec une feinte. Le 3 sort pour aider.",
            courses: { ArG: [-4.4, 8.6] },
            def: { G3: [-3.0, 7.6], G2: [-5.0, 6.4] },
          },
          {
            texte: "Le pivot ne fait que feinter l'écran: il se laisse couler dans l'espace libre laissé par le 3 et reçoit.",
            courses: { Piv: [-2.2, 6.3] },
            passe: ['ArG', 'Piv', 0.5],
          },
          { texte: 'Le pivot tire.', tir: 'Piv' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'rentree-ailier',
    nom: "Rentrée d'ailier",
    alias: 'Passage à deux pivots',
    categorie: 'Ailiers',
    defense: '0-6',
    resume: "L'ailier passe à son arrière puis traverse le long des 6 m, au milieu de la défense, pour jouer second pivot.",
    description: [
      "L'ailier gauche passe à son arrière, puis fait une course latérale le long des 6 m, au milieu de la défense, vers le défenseur de l'arrière opposé. L'équipe joue un court moment à deux pivots.",
      "L'arrière gauche avance et donne au demi-centre. Le pivot pose un bloc vers la course de l'ailier. Le demi-centre choisit la fin: rendre à l'ailier rentré, servir l'arrière opposé entre les deux blocs, ou donner au pivot (choisis une fin au-dessus du schéma).",
      "Une étude sur l'Euro 2022 montre qu'en haut niveau, l'ailier rentré reste plus souvent près du défenseur 2 pour bloquer, et que ce sont surtout le demi-centre et les arrières qui tirent. Les ailiers y rentrent surtout par l'extérieur de la défense (72,5 %) et sans ballon (81 %), puis reviennent à leur poste.",
      "Les variantes 4 et 5 suivent pas à pas deux des quatre alternatives de Bogny: la \"rentrée avec bloc\" (l'ailier rentré bloque à son tour le défenseur de l'arrière opposé, qui tire entre les deux blocs) et la \"rentrée et tir côté opposé\" (l'arrière opposé attaque vers l'extérieur et rend à l'ailier rentré). L'alternative \"rentrée côté pivot\" correspond à la variante 3. La 4e alternative se joue contre une 1-5: l'ailier part seulement quand le demi-centre a le ballon, le pivot sort pour attirer son défenseur, l'arrière opposé rend tout de suite à l'ailier qui arrive dans le dos du pivot et de l'avancé.",
      "La variante 6 suit la version tchèque (\"Záběh křídla\"): l'ailier finit sa course du côté opposé, entre le 2 et le 3, et les arrières enchaînent les attaques d'intervalles; \"souvent, cette combinaison prépare une position de tir pour l'ailier opposé\".",
      "Autres formes: Dragør décrit des entrées \"devant\" ou \"derrière\" la ligne arrière (formes de circulation), l'\"entrée d'ailier 1 à 6 - Quel choix?\" (six fins après l'entrée de l'ailier gauche, le bloc du pivot et l'engagement extérieur de l'arrière droit) et l'entrée d'ailier avec écran de l'arrière sur le 2. En équipe de France juniors, l'ailier côté pivot rentre sur la passe arrière droit vers demi-centre et se place entre le 1 et le 2 opposés; en Norvège (Mondial 2013), l'ailière droite rentre sur la passe demi-centre vers arrière droit, qui attaque au moment où elle passe devant le 2. É. Baradat parle de \"porté d'ailière\": une course arrondie avec changement de rythme pour semer le doute chez la défenseure 3. En LNH, l'entrée d'ailier se fait presque toujours du côté du pivot.",
      "Fiches voisines: entrée de l'ailier opposé au ballon, traversée de l'ailier et bloc, Kolding, Ciudad, ailière autour du pivot, rentrée côté pivot contre 1-5.",
    ],
    objectif: "Désorganiser la défense avec un second pivot pour libérer un tir au centre.",
    pointsCles: [
      "L'ailier rentre sans ballon, en restant hors de la zone.",
      "Le pivot oriente son bloc vers la course de l'ailier.",
      "Pendant ce temps, l'autre ailier reste écarté pour fixer son défenseur.",
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: "C'est quoi... une rentrée d'ailier? (Bogny Handball)",
        url: 'https://bhb08.fr/cest-quoi-une-rentree-dailier-9/',
        note: 'Déroulement et quatre alternatives, dont les fins reprises ici.',
      },
      {
        titre: 'Hatzimanouil et al., Wingers as Second-Line Players (J. of Human Kinetics, 2024)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11079937/',
        note: "Analyse de 491 attaques de l'Euro masculin 2022: rentrées sans ballon, rôle de bloc, tireurs.",
      },
      {
        titre: 'K. Kubišová, Porovnání útočných herních kombinací na signál (Univ. Charles, Prague, 2020)',
        url: 'https://dspace.cuni.cz/bitstream/handle/20.500.11956/117745/130279435.pdf',
        note: '"Záběh křídla": "Křídlo po odhodu míče na krajní spojku běží podél obrany. Svůj pohyb dokončuje v prostoru brankoviště na opačné straně" (variante 6).',
      },
      {
        titre: "Entrée d'ailier 1 à 6 - Quel choix? (Dragør HK)",
        url: 'http://www.dragoerhb.dk/fransk/f213.html',
        note: "L'ailier gauche entre et reçoit, le demi-centre s'engage à l'opposé pour laisser bloquer le pivot, l'arrière droit s'engage à l'extérieur; six fins.",
      },
      {
        titre: "Entrée d'ailier avec écran d'arrière (Dragør HK)",
        url: 'http://www.dragoerhb.dk/fransk/f1116.html',
        note: "L'ARG s'engage et fait écran sur le 2; l'ALG prend une position de tir après avoir reçu de l'ARD.",
      },
      {
        titre: "D. Fleurance, Le réseau d'échange sur la base arrière (Approches n°151, 2016)",
        url: 'https://www.calameo.com/ffhandball/read/007275111735cfdd874e5?page=46',
        note: "Hongrie juniors: l'ailier côté pivot rentre sur la passe ARD vers DC et se place entre les n°1 et n°2.",
      },
      {
        titre: "L'utilisation de l'intervalle 1-2 par le pivot (Approches n°140, 2014)",
        url: 'https://www.calameo.com/ffhandball/read/0072751117ab39c5a79db?page=43',
        note: "Norvège 2013: rentrée de l'ailière droite sur la passe DC vers ARD; temps fort de l'ARD quand l'ailière passe devant le n°2.",
      },
      {
        titre: 'É. Baradat, Déstabiliser la défense (Approches n°130, 2012)',
        url: 'https://www.calameo.com/ffhandball/read/007275111a6b69f9263d0?page=41',
        note: '"Porté d\'ailière": course arrondie et changement de rythme pour mettre de l\'incertitude sur la n°3.',
      },
      {
        titre: 'Le jeu du Pivot en attaque (entrainement-handball.fr)',
        url: 'https://www.entrainement-handball.fr/les-fondamentaux/en-attaque/le-jeu-du-pivot-en-attaque/',
        note: "\"L'Ailier est le cas le plus classique\" de rentrée.",
      },
    ],
    depart: { Piv: [-0.4, 6.4] },
    ballon: 'AiG',
    variantes: [
      {
        nom: "1 - Tir de l'ailier rentré",
        etapes: [
          ...RENTREE_BASE,
          {
            texte: "Le demi-centre rend le ballon à l'ailier rentré, qui tire.",
            passe: ['DC', 'AiG', 0.1],
          },
          { texte: "L'ailier tire depuis le poste de pivot.", tir: 'AiG' },
        ],
      },
      {
        nom: "2 - Tir de l'arrière opposé",
        etapes: [
          ...RENTREE_BASE,
          {
            texte: "Le demi-centre donne à l'arrière droit, lancé entre le bloc du pivot et celui de l'ailier.",
            courses: { ArD: { vers: [2.2, 8.4], via: [4.2, 9.6] } },
            passe: ['DC', 'ArD', 0.35],
          },
          { texte: "L'arrière droit tire.", tir: 'ArD' },
        ],
      },
      {
        nom: '3 - Passe au pivot',
        etapes: [
          ...RENTREE_BASE,
          {
            texte: "Le demi-centre donne au pivot.",
            passe: ['DC', 'Piv', 0.1],
          },
          { texte: 'Le pivot tire.', tir: 'Piv' },
        ],
      },
      {
        nom: '4 - Rentrée avec bloc (Bogny, alternative 1)',
        etapes: [
          {
            texte: "L'ailier gauche passe à son arrière et part en course latérale vers le défenseur de l'arrière opposé.",
            courses: { AiG: { vers: [-5.4, 7.0], via: [-7.6, 5.0] } },
            passe: ['AiG', 'ArG', 0],
          },
          {
            texte: "L'arrière gauche avance et rend le ballon à l'ailier, en course.",
            courses: { ArG: [-4.8, 8.8], AiG: [-3.6, 7.6] },
            passe: ['ArG', 'AiG', 0.4],
          },
          {
            texte: "L'ailier donne aussitôt au demi-centre et poursuit sa course. L'arrière droit démarre dès cette passe.",
            courses: { AiG: [-1.4, 7.6], DC: [0, 9.6], ArD: [5.2, 9.0] },
            passe: ['AiG', 'DC', 0.15],
            def: { G3: [-1.9, 6.5] },
          },
          {
            texte: "Le demi-centre avance et redonne à l'ailier. Le pivot pose un bloc au centre, vers la course de l'ailier.",
            courses: { DC: [0.2, 8.8], AiG: [2.2, 7.6], Piv: { vers: [0.9, 6.9], ecran: true } },
            passe: ['DC', 'AiG', 0.5],
            def: { D3: [1.7, 6.5] },
          },
          {
            texte: "L'ailier donne à l'arrière droit et pose un bloc sur son défenseur, le 2 droit.",
            courses: { AiG: { vers: [3.8, 6.6], ecran: true }, ArD: [2.6, 8.4] },
            passe: ['AiG', 'ArD', 0.2],
            def: { D2: [4.6, 5.8] },
          },
          {
            texte: "L'arrière droit, lancé, tire entre le bloc du pivot et celui de l'ailier.",
            courses: { ArD: [2.4, 8.0] },
            tir: { par: 'ArD', t: 0.4 },
          },
        ],
      },
      {
        nom: '5 - Rentrée et tir côté opposé (Bogny, alternative 3)',
        etapes: [
          ...RENTREE_BASE,
          {
            texte: "Le demi-centre donne à l'arrière droit. L'ailier droit s'écarte et s'enfonce dans le coin pour attirer son défenseur.",
            courses: { ArD: [5.2, 9.0], AiD: [9.6, 0.5] },
            passe: ['DC', 'ArD', 0.3],
            def: { D1: [8.0, 1.6] },
          },
          {
            texte: "L'arrière droit attaque vers l'extérieur pour ouvrir un intervalle plus central, et rend à l'ailier gauche qui arrive en course.",
            courses: { ArD: [6.0, 8.0], AiG: [3.0, 7.1] },
            passe: ['ArD', 'AiG', 0.5],
            def: { D2: [5.4, 6.2] },
          },
          {
            texte: "L'ailier gauche tire dans l'intervalle ouvert entre le bloc du pivot et la course de l'arrière.",
            tir: { par: 'AiG', t: 0.3 },
          },
        ],
      },
      {
        nom: "6 - Rentrée jusqu'au côté opposé (Záběh křídla)",
        etapes: [
          RENTREE_BASE[0],
          RENTREE_BASE[1],
          {
            texte: "L'ailier s'installe entre le 3 et le 2 droits. Le demi-centre attaque l'intervalle central et donne à l'arrière droit.",
            courses: { DC: [0.4, 8.6], ArD: [5.0, 9.0] },
            passe: ['DC', 'ArD', 0.5],
            def: { D3: [1.6, 7.0], D2: [4.6, 5.4] },
          },
          {
            texte: "L'arrière droit attaque à son tour et fixe le 2. Le 1 vient aider: l'arrière droit donne à l'ailier droit, resté à l'aile.",
            courses: { ArD: [5.6, 8.0], AiD: [8.8, 1.8] },
            passe: ['ArD', 'AiD', 0.5],
            def: { D2: [5.4, 6.4], D1: [7.2, 4.0] },
          },
          { texte: "L'ailier droit tire.", tir: 'AiD' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'kempa',
    nom: 'Kempa',
    alias: 'Kempa-trick, Kung-fu, Fly, Flieger (CH), Flyver (NO), catapulte, colgada (ES), chauf-chauf',
    categorie: 'Ailiers',
    defense: 'Toutes',
    resume: "Un joueur s'envole au-dessus de la zone et reçoit une passe lobée qu'il tire avant de retomber.",
    description: [
      "Geste inventé par l'Allemand Bernhard Kempa (Frisch Auf Göppingen). Première réussite le 24 mars 1954 à Karlsruhe, lors d'un match Allemagne-Suède: Kempa passe, Horst Singer reprend en l'air.",
      "Un joueur lobe le ballon par-dessus la défense. Un partenaire saute de l'extérieur de la zone, attrape le ballon en l'air et tire. Le but n'est valable que si le ballon a quitté sa main avant qu'il ne touche le sol dans la zone.",
      "Le sauteur est souvent l'ailier (variante 1) ou le pivot, servi par un arrière ou le demi-centre; ce choix de rôles est courant mais n'est pas précisé par les sources.",
      "Variantes sourcées: l'ailier qui perce avec un angle fermé, saute, feinte et sert en l'air l'arrière opposé (handballtraining.de); le \"Kempa de deuxième ligne\", où l'arrière reçoit pendant son impulsion et tire avant de retomber (Wikipedia); la \"colgada\" de l'ailier pour l'arrière du même côté, école croate de Zagreb (Antón); l'ailier qui sert le demi-centre (Şufaru, action 10); le \"chauf-chauf\" du Bataillon de Joinville, où l'ailier déboule au centre et reçoit du demi-centre qui croise en sens inverse (A. Behm); le double kung-fu de Dragør, où le premier sauteur sert un second sauteur.",
      "Autres usages: Kempa du pivot sorti contre une 5-1 très avancée, pour l'ailier (forum allemand); colgada pour l'arrière opposé après un croisé ailier-pivot (Russie 2007); \"fly\" vers l'ailier opposé sur coup franc en fin de jeu passif (jeu \"camiseta\" de l'équipe d'Espagne, forum); fin \"kung-fu\" du Tip coréen de Dragør. En 2022, l'EHF note des tirs en l'air surtout entre arrière et ailier, mais aussi entre les deux ailiers. Voir aussi la fiche \"Petit train\".",
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: 'Kempa-Trick (Wikipedia, allemand)',
        url: 'https://de.wikipedia.org/wiki/Kempa-Trick',
        note: 'Origine (24/03/1954, Karlsruhe, Kempa et Singer), règle du tir avant de toucher le sol, variantes.',
      },
      {
        titre: 'Handball History: The Alley-oop (California Heat)',
        url: 'https://www.calheat.com/index.php/handball-history-the-alley-oop-from-a-practice-element-to-a-main-goal-scoring-technique',
        note: 'Même origine, témoignage de Kempa sur le premier essai.',
      },
      {
        titre: 'Kempatrick über Halb nach Pass von der Außenposition (handballtraining.de)',
        url: 'https://handballtraining.de/taktik/kempatrick-ueber-halb-nach-pass-von-der-aussenposition/2135',
        note: '"der gegenüberliegende Halbspieler stets zum Kempa anlaufen, wenn ein Außenspieler zum Torwurf aus schwierigem Winkel kommt" (variante 2).',
      },
      {
        titre: 'J. L. Antón García, Uso del "portero falso" en inferioridad numérica atacante (e-balonmano.com, 2010)',
        url: 'https://dialnet.unirioja.es/descarga/articulo/3253764.pdf',
        note: "Zagreb: l'arrière \"cambia sorpresivamente de trayectoria dirigiéndose entre último y penúltimo defensor [...] y recibe el pase en colgada\" (variante 4).",
      },
      {
        titre: 'Şufaru & Iancu, Gymnasium XVI(1), 2015',
        url: 'https://gymnasium.ub.ro/journal/article/view/105/99',
        note: "Action 10: l'ailier feinte le tir et passe au DC \"who jumps above the semicircle, followed by a in-flight shot\" (variante 5).",
      },
      {
        titre: 'A. Behm, Handball: mes coups de cœur (Approches n°114)',
        url: 'https://www.calameo.com/ffhandball/read/007275111122817ab0e6a?page=47',
        note: "\"l'ailier Paolini déboulait au centre, le demi-centre Otternaud, croisant en sens inverse, passait à Pao qui recevait dans l'impulsion\" (variante 6).",
      },
      {
        titre: 'Fixation - supériorité à droite (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f888.html',
        note: '"DC peut également passer la balle au dessus de la zone pour un kung-fu de ARD qui peut également passer au dessus de la zone pour un kung-fu de ALG" (variante 7).',
      },
      {
        titre: 'handballecke.de, "Sammlung von Spielzügen!" (post 33, 2004)',
        url: 'https://www.handballecke.de/forum/thread/8453-sammlung-von-spielz%C3%BCgen-bitte-mitmachen/',
        note: "Contre une 5-1 très avancée: le pivot sort, reçoit à 9 m et joue un Kempa pour l'ailier droit.",
      },
      {
        titre: 'NHF, Håndballterminologi (2022-23)',
        url: 'https://www.handball.no/globalassets/region-ost/kampaktivitet/ungdomshandball-13-18-ar/temaserien/2022-23/handballterminologi.pdf',
        note: '"Flyver": passe à un joueur en l\'air au-dessus de la zone, qui tire avant d\'atterrir.',
      },
    ],
    objectif: "Surprendre la défense et le gardien par un tir aérien rapproché.",
    pointsCles: [
      "Le timing passe-saut est primordial: le ballon arrive au point le plus haut du saut.",
      "La passe est lobée au-dessus des bras des défenseurs.",
      "L'arrière fixe son défenseur avant de passer pour ne pas annoncer la combinaison.",
    ],
    ballon: 'ArD',
    variantes: [
      {
        nom: "1 - L'arrière pour l'ailier",
        etapes: [
          {
            texte: "L'arrière droit fixe le 2 droit. L'ailier droit prend son élan vers l'intérieur.",
            courses: { ArD: [4.6, 8.4], AiD: [7.4, 3.6] },
            def: { D2: [4.9, 6.3] },
          },
          {
            texte: "L'ailier saute au-dessus de la zone. L'arrière lui lobe le ballon.",
            courses: { AiD: [4.6, 3.4] },
            passe: ['ArD', 'AiD', 0.15],
            enLAir: ['AiD'],
          },
          {
            texte: "L'ailier tire en l'air, avant de retomber dans la zone.",
            tir: { par: 'AiD', t: 0 },
            enLAir: ['AiD'],
          },
        ],
      },
      {
        nom: "2 - L'ailier pour l'arrière opposé",
        etapes: [
          {
            texte: "L'arrière droit donne à l'ailier droit, qui perce vers le but avec un angle fermé. L'arrière gauche s'élance vers la zone.",
            courses: { AiD: [7.8, 2.8], ArG: [-3.6, 8.0] },
            passe: ['ArD', 'AiD', 0.1],
            def: { D1: [8.2, 2.0] },
          },
          {
            texte: "L'ailier saute et feinte le tir: le gardien se décale vers lui. En l'air, il passe par-dessus la zone à l'arrière gauche, qui saute à 4-5 m du but.",
            courses: { AiD: [7.0, 2.2], ArG: [-2.2, 4.8] },
            passe: ['AiD', 'ArG', 0.35],
            def: { GB: [0.9, 0.6] },
            enLAir: ['AiD', 'ArG'],
          },
          {
            texte: "L'arrière gauche tire (ou frappe en volée) avant de retomber.",
            tir: { par: 'ArG', t: 0 },
            enLAir: ['AiD', 'ArG'],
          },
        ],
      },
      {
        nom: '3 - Kempa de deuxième ligne',
        etapes: [
          {
            texte: "L'arrière droit donne au demi-centre et prend son élan.",
            courses: { ArD: [5.8, 10.0] },
            passe: ['ArD', 'DC', 0.1],
          },
          {
            texte: "L'arrière droit s'élance; le demi-centre lui renvoie le ballon pendant son impulsion. Il reçoit en l'air.",
            courses: { ArD: [4.2, 8.8] },
            passe: ['DC', 'ArD', 0.5],
            def: { D2: [4.6, 6.4] },
          },
          {
            texte: "Il tire avant de retomber, plus vite que les contreurs.",
            tir: { par: 'ArD', t: 0 },
          },
        ],
      },
      {
        nom: "4 - Colgada de l'ailier pour l'arrière (école de Zagreb)",
        etapes: [
          {
            texte: "L'arrière droit donne à l'ailier droit, puis part vers le centre.",
            courses: { ArD: [3.4, 8.8], AiD: [8.8, 1.6] },
            passe: ['ArD', 'AiD', 0.1],
          },
          {
            texte: "L'ailier file vers l'extérieur, presque jusqu'à la ligne de but, et saute dans la zone. L'arrière change brusquement de direction, passe entre le 1 et le 2 et saute à son tour. L'ailier lui passe en l'air.",
            courses: {
              AiD: { vers: [7.2, 0.8], via: [9.2, 0.7] },
              ArD: { vers: [5.2, 4.2], via: [5.0, 7.4] },
            },
            passe: ['AiD', 'ArD', 0.6],
            def: { D2: [4.0, 5.8], D1: [7.8, 2.4] },
            enLAir: ['AiD', 'ArD'],
          },
          {
            texte: "L'arrière tire avant de retomber.",
            tir: { par: 'ArD', t: 0 },
            enLAir: ['AiD', 'ArD'],
          },
        ],
      },
      {
        nom: "5 - L'ailier pour le demi-centre (Şufaru)",
        etapes: [
          {
            texte: "L'arrière droit donne à l'ailier droit, qui passe devant son défenseur, vers l'intérieur.",
            courses: { AiD: { vers: [7.4, 4.0], via: [8.8, 3.4] } },
            passe: ['ArD', 'AiD', 0.1],
            def: { D1: [7.6, 2.8] },
          },
          {
            texte: "L'ailier feinte le tir et attire le 2. Le demi-centre s'élance vers la zone.",
            courses: { DC: [1.1, 7.8] },
            def: { D2: [6.0, 4.4], D3: [2.4, 6.6] },
          },
          {
            texte: "L'ailier lobe le ballon; le demi-centre saute au-dessus de la zone et l'attrape.",
            courses: { DC: [1.1, 4.8] },
            passe: ['AiD', 'DC', 0.2],
            enLAir: ['DC'],
          },
          {
            texte: "Le demi-centre tire en l'air.",
            tir: { par: 'DC', t: 0 },
            enLAir: ['DC'],
          },
        ],
      },
      {
        nom: '6 - Chauf-chauf (ailier sur croisé du demi-centre)',
        etapes: [
          {
            texte: "L'arrière droit donne au demi-centre. L'ailier droit démarre vers l'intérieur.",
            courses: { AiD: { vers: [6.4, 5.4], via: [8.6, 3.6] } },
            passe: ['ArD', 'DC', 0.1],
            def: { D1: [7.2, 3.0] },
          },
          {
            texte: "L'ailier déboule vers le centre; le demi-centre croise en sens inverse, vers la droite, et attire le 3 droit.",
            courses: { AiD: [1.6, 7.6], DC: [2.8, 9.2] },
            def: { D3: [2.6, 7.0] },
          },
          {
            texte: "Le demi-centre passe à l'ailier, qui reçoit dans son impulsion, au-dessus de la zone.",
            courses: { AiD: [0.9, 4.8] },
            passe: ['DC', 'AiD', 0.2],
            enLAir: ['AiD'],
          },
          {
            texte: "L'ailier tire avant de retomber.",
            tir: { par: 'AiD', t: 0 },
            enLAir: ['AiD'],
          },
        ],
      },
      {
        nom: '7 - Double kung-fu (Dragør f888)',
        etapes: [
          {
            texte: "L'arrière droit donne au demi-centre. L'ailier gauche se place au point de corner.",
            courses: { ArD: [3.4, 8.6], AiG: [-9.6, 0.4] },
            passe: ['ArD', 'DC', 0.1],
          },
          {
            texte: "L'arrière droit s'élance et saute au-dessus de la zone; le demi-centre lui lobe le ballon.",
            courses: { ArD: [2.2, 4.8] },
            passe: ['DC', 'ArD', 0.3],
            enLAir: ['ArD'],
          },
          {
            texte: "En l'air, l'arrière droit passe à son tour par-dessus la zone à l'ailier gauche, parti du corner, qui a sauté.",
            courses: { AiG: { vers: [-3.4, 2.8], via: [-7.2, 0.4] } },
            passe: ['ArD', 'AiG', 0.4],
            enLAir: ['ArD', 'AiG'],
          },
          {
            texte: "L'ailier gauche tire avant de retomber.",
            tir: { par: 'AiG', t: 0 },
            enLAir: ['ArD', 'AiG'],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'passe-et-va',
    nom: 'Passe et va',
    alias: 'Une-deux',
    categorie: 'Circulation',
    defense: '0-6',
    resume: "Le porteur passe à un partenaire placé devant lui (en appui) et enchaîne un déplacement en profondeur pour recevoir en retour.",
    description: [
      'Définition FFHB: "le porteur de balle fait une passe au joueur en appui et enchaîne un déplacement en profondeur". Le joueur en appui est placé en avant du porteur, ici le pivot.',
      "L'arrière passe au pivot puis contourne son défenseur, qui a suivi le ballon des yeux, pour attaquer dans son dos. Le pivot lui remet le ballon: c'est l'une-deux.",
      'À ne pas confondre avec le "passe et suit": le porteur passe à un partenaire en soutien (derrière lui) et court vers lui.',
      "Variantes de Dragør: avec le pivot sorti en poste, l'arrière contourne son défenseur sorti et reçoit à nouveau (variante 2); l'ailier engagé vers l'intérieur joue l'une-deux avec le pivot sorti, qui attire les deux défenseurs (variante 3); contre un arrière défensif qui sort sur l'arrière, l'ailier passe sous lui et reçoit en retour (\"Fløjangreb mod stødende back\", variante 4).",
      "Contre 5-1, Román Seco part d'un passe et va arrière gauche-pivot pour attaquer l'intervalle entre la ligne et l'avancé, puis enchaîne des pénétrations successives (centre, arrière droit, ailier). Antón (2014) l'utilise pour libérer un tireur marqué: passe et va avec le pivot dès la réception, puis le centre plonge vers les 6 m dans l'espace laissé par l'avancé. Fiches voisines: induction arrière-ailier, Rückpass, double percussion.",
    ],
    objectif: "Gagner un temps de passe sur la défense et prendre l'intervalle lancé.",
    pointsCles: [
      "L'arrière part en même temps que sa passe.",
      "Respecter la distance d'échange avec le joueur en appui, son orientation et sa disponibilité.",
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: 'Lexique FFHB, Approches du Handball (DTN, 2005)',
        url: 'https://www.handball75.fr/ressources/fichiers/09329621f89c.pdf',
        note: 'Définitions de "passe et va", "passe et suit" et "appui".',
      },
      {
        titre: 'Passe et va entre PVT et ARG (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f379.html',
        note: 'ARG donne au pivot "sorti en poste", contourne son défenseur sans ballon, reçoit à nouveau et tire (variante 2).',
      },
      {
        titre: 'Passe et va pivot et ailier (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f1127.html',
        note: "Les deux défenseurs suivent le pivot; petite feinte vers l'avant du pivot et l'ailier récupère le ballon (variante 3).",
      },
      {
        titre: 'Fløjangreb mod stødende back (Dragør HK, danois)',
        url: 'http://www.dragoerhb.dk/x1048.html',
        note: "L'arrière rentre vers le centre; l'ailier passe sous l'arrière défensif sorti et reçoit (variante 4).",
      },
      {
        titre: 'J. D. Román Seco, Conceptos de ataque frente a variantes defensivas 6:0 y 5:1 (2005)',
        url: 'https://dialnet.unirioja.es/descarga/articulo/1371312.pdf',
        note: '"Utilizando como medio táctico inicial una relación de Pase y Va entre el lateral izquierdo y el pivote...".',
      },
      {
        titre: 'J. L. Antón García, Tactical and strategical alternatives against anticipation defense (EHF, 2014)',
        url: 'http://home.eurohandball.com/ehf_files/Publikation/WP_Anton%20J.L._Tactical%20and%20strategical.pdf',
        note: '"Give and go" arrière-pivot, puis le CB "can circulate towards 6 meters line behind the conflict´s zone".',
      },
    ],
    depart: { Piv: [-3.4, 6.3] },
    ballon: 'ArG',
    variantes: [
      {
        nom: '1 - Arrière et pivot (une-deux)',
        etapes: [
          {
            texte: "L'arrière gauche passe au pivot, en appui devant lui, et enchaîne aussitôt un déplacement en profondeur pour contourner le 2.",
            courses: { ArG: { vers: [-2.8, 7.8], via: [-4.6, 8.2] } },
            passe: ['ArG', 'Piv', 0],
            def: { G2: [-4.6, 5.6] },
          },
          {
            texte: "Le pivot remet le ballon à l'arrière lancé (une-deux).",
            courses: { ArG: [-2.4, 7.2] },
            passe: ['Piv', 'ArG', 0.1],
            def: { G3: [-1.4, 7.0] },
          },
          {
            texte: "L'arrière gauche tire.",
            tir: 'ArG',
          },
        ],
      },
      {
        nom: '2 - Avec le pivot sorti en poste (Dragør f379)',
        etapes: [
          {
            texte: "Le pivot sort en poste devant l'arrière gauche. Le 2 gauche sort sur l'arrière.",
            courses: { Piv: { vers: [-3.0, 8.8], via: [-3.6, 7.6] } },
            def: { G2: [-5.0, 7.0], G3: [-2.4, 7.2] },
          },
          {
            texte: "L'arrière gauche donne au pivot et contourne son défenseur sans ballon.",
            courses: { ArG: { vers: [-4.0, 6.8], via: [-6.4, 7.8] } },
            passe: ['ArG', 'Piv', 0],
            def: { G2: [-4.8, 7.6] },
          },
          {
            texte: "Le pivot lui rend le ballon dans le dos du 2.",
            courses: { ArG: [-3.6, 6.6] },
            passe: ['Piv', 'ArG', 0.2],
          },
          { texte: "L'arrière gauche tire.", tir: 'ArG' },
        ],
      },
      {
        nom: '3 - Ailier et pivot sorti (Dragør f1127)',
        etapes: [
          {
            texte: "Le pivot sort en poste à gauche. L'ailier gauche s'engage vers l'intérieur et reçoit de l'arrière.",
            courses: { Piv: { vers: [-5.0, 8.0], via: [-4.6, 6.8] }, AiG: [-6.6, 4.6] },
            passe: ['ArG', 'AiG', 0.4],
            def: { G1: [-7.4, 3.0] },
          },
          {
            texte: "L'ailier passe au pivot sorti. Les deux défenseurs de ce côté sont attirés par le pivot.",
            courses: { AiG: [-6.2, 4.6] },
            passe: ['AiG', 'Piv', 0.1],
            def: { G2: [-5.0, 6.6], G1: [-6.6, 5.6] },
          },
          {
            texte: "Le pivot feinte vers l'avant, puis rend à l'ailier, qui a filé vers le but (passe et va).",
            courses: { AiG: [-6.4, 3.6] },
            passe: ['Piv', 'AiG', 0.4],
          },
          { texte: "L'ailier gauche tire.", tir: 'AiG' },
        ],
      },
      {
        nom: "4 - Ailier sous l'arrière défensif sorti (Dragør x1048)",
        etapes: [
          {
            texte: "L'arrière gauche donne à son ailier et s'écarte vers la touche.",
            courses: { ArG: [-6.6, 9.0] },
            passe: ['ArG', 'AiG', 0.1],
          },
          {
            texte: "L'ailier rend à l'arrière. Le 2 gauche sort sur lui.",
            courses: { ArG: [-6.4, 8.8] },
            passe: ['AiG', 'ArG', 0.2],
            def: { G2: [-6.0, 7.0] },
          },
          {
            texte: "L'arrière rentre aussitôt vers le centre. L'ailier passe sous le 2 sorti, dans son dos, et reçoit.",
            courses: { ArG: [-4.8, 8.8], AiG: { vers: [-5.0, 5.9], via: [-6.6, 5.0] } },
            passe: ['ArG', 'AiG', 0.6],
            def: { G2: [-5.8, 7.6] },
          },
          { texte: "L'ailier tire.", tir: 'AiG' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'decalage',
    nom: 'Décalage',
    alias: 'Fixation-passe, pénétrations successives, opprulling (NO), penetración sucesiva (ES), Abräumen (DE)',
    categorie: 'Circulation',
    defense: '0-6',
    resume: "Chaque porteur fixe son défenseur puis donne au suivant, jusqu'à libérer l'ailier.",
    description: [
      "Combinaison d'école qui crée un surnombre par une succession de fixations et de passes. Chaque porteur attaque l'intervalle pour obliger son défenseur à sortir, puis donne au partenaire suivant.",
      "Le dernier joueur, souvent l'ailier, se retrouve seul face au gardien. Pour la FFHB, le décalage est l'\"exploitation du surnombre dans le sens du débordement\", directe sur la première passe ou différée.",
      "Variantes de Dragør: l'arrière écarté le long de la touche oblige le 1 à aider et l'ailier, parti du corner, s'engage dans son dos (f321, variante 2); l'arrière fixe vers l'intérieur puis vers l'extérieur pour faire monter le 2 puis le 1 (f249, variante 3). Dragør distingue aussi la fixation ordinaire, la fixation \"sautée\" (on attaque le côté intérieur de l'arrière défensif pour sauter un poste), l'induction et le fait d'\"attirer\" un défenseur sans chercher à tirer.",
      "Ailleurs: en Norvège, \"opprulling\" désigne la vague de fixations successives jusqu'à libérer un attaquant; en Espagne, la \"penetración sucesiva\" est un des moyens tactiques de base; en Allemagne, \"Abräumen\" est l'élargissement jusqu'à l'ailier en fin d'action. Chez les juniors roumains (Şufaru, action 6), la vague part de l'ailier et le demi-centre la \"retourne\" vers l'arrière qui lui a passé, pendant que le pivot bloque le défenseur central.",
    ],
    objectif: "Créer un surnombre sur l'aile par la circulation du ballon.",
    pointsCles: [
      "Fixer, c'est attaquer le but pour obliger le défenseur à s'occuper de soi.",
      "Chaque porteur attaque son intervalle intérieur et passe juste avant le contact.",
      "Recevoir lancé, en mouvement vers le but.",
    ],
    fiabilite: 'sourcee',
    sources: [
      {
        titre: 'Lexique FFHB, Approches du Handball (DTN, 2005)',
        url: 'https://www.handball75.fr/ressources/fichiers/09329621f89c.pdf',
        note: 'Définitions de "décalage", "créer le surnombre" et "fixer".',
      },
      {
        titre: "Tactiques-techniques d'attaques au handball (blog Wendyam-Hermann)",
        url: 'https://correspondanceshandball.over-blog.com/pages/Tactiquestechniques_dattaques_au_handball-314600.html',
        note: '"l\'ailier opposé devrait avoir toute la zone pour lui".',
      },
      {
        titre: "Décalage pour un tir d'ailier (Dragør HK)",
        url: 'http://www.dragoerhb.dk/fransk/f321.html',
        note: "\"ALG, positionné au point de corner s'engage dans le dos du défenseur 1D, reçoit la balle de ARG (rebond ou dans le dos) et tire\" (variante 2).",
      },
      {
        titre: "Fixation des défenseurs 1 et 2 pour le tir de l'ailier (Dragør HK, f249)",
        url: 'http://www.dragoerhb.dk/fransk/f249.html',
        note: "L'arrière force les défenseurs n°1 et 2 à monter sur lui pour ouvrir le tir de l'ailier (variante 3).",
      },
      {
        titre: 'A propos des fixations (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f1356.html',
        note: "\"La fixation \"sauté\" consiste à chercher le côté interne de l'arrière et non l'intervalle entre l'ailier et l'arrière et donc saute un poste.\"",
      },
      {
        titre: 'NHF, Håndballterminologi (2022-23)',
        url: 'https://www.handball.no/globalassets/region-ost/kampaktivitet/ungdomshandball-13-18-ar/temaserien/2022-23/handballterminologi.pdf',
        note: '"Opprulling": chaque attaquant engage deux défenseurs et passe au suivant "til en angrepsspiller er fri".',
      },
      {
        titre: 'Şufaru & Iancu, Gymnasium XVI(1), 2015',
        url: 'https://gymnasium.ub.ro/journal/article/view/105/99',
        note: 'Action 6: "Passing in successive breakthrough", conclusion par l\'ailier en surnombre.',
      },
    ],
    ballon: 'DC',
    variantes: [
      {
        nom: '1 - Demi-centre, arrière, ailier',
        etapes: [
          {
            texte: "Le demi-centre attaque l'intervalle central et fixe le 3 droit.",
            courses: { DC: [0.6, 8.4] },
            def: { D3: [1.2, 7.4] },
          },
          {
            texte: "Il donne à l'arrière droit, lancé, qui fixe à son tour le 2 droit.",
            courses: { ArD: [4.0, 8.2] },
            passe: ['DC', 'ArD', 0.2],
            def: { D2: [4.5, 6.4] },
          },
          {
            texte: "L'arrière droit donne à l'ailier droit, qui s'est décalé. Le 1 droit est pris entre deux joueurs.",
            courses: { AiD: [8.2, 3.2] },
            passe: ['ArD', 'AiD', 0.4],
            def: { D1: [6.8, 3.0] },
          },
          {
            texte: "L'ailier droit tire.",
            tir: 'AiD',
          },
        ],
      },
      {
        nom: "2 - Aides successives jusqu'à l'ailier (Dragør f321)",
        etapes: [
          {
            texte: "Mise en place: l'arrière gauche s'écarte le long de la touche, l'ailier gauche se place au point de corner.",
            courses: { ArG: [-7.6, 8.6], AiG: [-9.6, 0.4] },
          },
          {
            texte: "Le demi-centre s'engage entre le 3 et le 2 gauches pour obliger le 2 à aider.",
            courses: { DC: [-3.0, 8.2] },
            def: { G3: [-2.2, 7.2], G2: [-3.9, 6.6] },
          },
          {
            texte: "Il donne à l'arrière gauche, qui s'engage entre le 1 et le 2 pour obliger le 1 à aider.",
            courses: { ArG: [-6.2, 7.2] },
            passe: ['DC', 'ArG', 0.2],
            def: { G1: [-6.8, 5.0] },
          },
          {
            texte: "L'ailier, parti du corner, s'engage dans le dos du 1 et reçoit une passe à rebond ou dans le dos.",
            courses: { AiG: { vers: [-8.2, 2.8], via: [-9.4, 1.6] } },
            passe: ['ArG', 'AiG', 0.4],
          },
          { texte: "L'ailier gauche tire.", tir: 'AiG' },
        ],
      },
      {
        nom: "3 - L'arrière fait monter le 2 puis le 1 (Dragør f249)",
        etapes: [
          {
            texte: "Le demi-centre donne à l'arrière droit.",
            passe: ['DC', 'ArD', 0.1],
          },
          {
            texte: "L'arrière droit fixe d'abord vers l'intérieur: le 2 droit monte sur lui.",
            courses: { ArD: [3.8, 8.4] },
            def: { D2: [4.0, 6.6] },
          },
          {
            texte: "Il repart vers l'extérieur et fixe entre le 2 et le 1: le 1 monte à son tour.",
            courses: { ArD: [6.0, 7.8] },
            def: { D2: [5.0, 6.6], D1: [7.0, 4.8] },
          },
          {
            texte: "L'arrière droit donne à l'ailier droit, libéré.",
            courses: { AiD: [8.8, 1.8] },
            passe: ['ArD', 'AiD', 0.3],
          },
          { texte: "L'ailier droit tire.", tir: 'AiD' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'croise-arriere-ailier',
    nom: 'Croisé arrière-ailier',
    categorie: 'Croisés',
    defense: '0-6',
    alias: 'Croisé AR-AL, Fenyo (HU), RL holt LA (DE)',
    resume: "L'arrière attaque vers l'aile, l'ailier croise vers l'intérieur et renverse le jeu sur l'arrière opposé.",
    description: [
      "Le demi-centre passe à l'arrière droit, qui attaque en diagonale vers l'extérieur. L'ailier droit quitte son aile et coupe vers l'intérieur: il croise l'arrière et reçoit le ballon au croisement.",
      "Lancé vers le centre, l'ailier fait une longue passe à l'arrière gauche, qui monte et tire de loin. La défense, attirée côté droit, n'a pas le temps de se replacer (variante 1).",
      "Le croisé se joue dans les deux sens. L'arrière peut croiser derrière l'ailier, qui entraîne son défenseur vers le centre, et prendre sa place à l'aile: c'est le \"Fenyo\", du nom d'un international hongrois gaucher des années 60 (A. Behm; Dragør f14, variante 2). L'ailier peut croiser derrière l'arrière et tirer lui-même (f16, variante 3) ou feinter et servir le demi-centre (f21, variante 4). Il peut aussi s'engager dans le dos de l'arrière, qui lui passe et bloque le 2 (f136, variante 5). L'équipe d'Espagne (code CRC L-EX) fait se dédoubler l'arrière entre le 1 et le 2 après le croisé, l'ailier cherchant l'arrière ou le pivot au centre (variante 6).",
      "Autres formes: quatre fins de Dragør après un croisé où l'ailier tire entre les défenseurs de l'arrière et du demi-centre (f246); formes d'entraînement des deux côtés avec deux demi-centres (f247, f248). En infériorité, Antón note que le défenseur extérieur n'a pas l'habitude de changer d'adversaire. En Allemagne, un arrière croise aussi avec l'ailier du côté opposé (\"Kreuzen Halbspieler mit dem Diagonal-Außen\"). Fiches voisines: Halb holt Außen, combinaison de croisés avec l'ailier, croisé arrière-ailier avec entrée, moulinette.",
    ],
    objectif: "Attirer la défense d'un côté pour libérer un tir de l'arrière opposé.",
    pointsCles: [
      "L'ailier ne doit pas évoluer trop près de la défense, sinon elle intercepte le ballon.",
      "S'il y a un risque d'interception par les 3, utiliser une passe à rebond.",
    ],
    fiabilite: 'partielle',
    sources: [
      {
        titre: 'Croisé Arrière/Ailier (W. Fog-Hansen, trad. HBC Vendenheim)',
        url: 'http://www.dragoerhb.dk/fransk/f703.html',
        note: "\"ARD croise avec ALD. ALD passe sur l'opposé ARG, qui va au tir.\" Le sens exact des courses est déduit du schéma.",
      },
      {
        titre: 'Handball Gardéen - 16 combinaisons en fiches animées',
        url: 'https://www.handball-gardeen.com/details-16+combinaisons+de+handball+sous+forme+de+fiches+animees-349',
        note: 'Liste le "Croisé AR-AL sur une 0-6" et renvoie vers la fiche ci-dessus.',
      },
      {
        titre: 'Croise simple Ailier/Arrière (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f14.html',
        note: "ALG \"fixe externe/interne et part vers le centre\"; ARG croise derrière, réceptionne et \"prends le tir d'ailier\" (variante 2).",
      },
      {
        titre: 'A. Behm, Handball: mes coups de cœur (Approches n°114)',
        url: 'https://www.calameo.com/ffhandball/read/007275111122817ab0e6a?page=49',
        note: "Fenyo: \"Croisé ailier-arrière. L'ailier entraîne la défense vers l'intérieur, l'arrière vient prendre la place de l'ailier\".",
      },
      {
        titre: 'Croise simple Arrière/Ailier et Croisé Arrière/Ailier pour Demi Centre (Dragør HK)',
        url: 'http://www.dragoerhb.dk/fransk/f16.html',
        note: "L'ailier croise derrière l'arrière, réceptionne et tire; f21: il \"fait une feinte de tir et passe au DC qui s'engage et tir\" (variantes 3 et 4).",
      },
      {
        titre: "Croisé Ailier/Arrière avec rentrée d'aile (Dragør HK)",
        url: 'http://www.dragoerhb.dk/fransk/f136.html',
        note: "L'ARG fait \"une passe dans le dos ou à mi-hauteur\" et \"essaye de faire un bloc sur 2D afin de permettre à ALG de prendre un tir sans opposition\" (variante 5).",
      },
      {
        titre: "Sierra-Guzmán et al., Situations tactiques de l'Espagne en inégalité numérique (e-balonmano.com, 2015)",
        url: 'https://www.redalyc.org/pdf/865/86538703003.pdf',
        note: 'CRC L-EX: "El lateral derecho (C) cruza con el extremo derecho (D) y se desdobla entre los defensores exterior (1) y lateral (2)" (variante 6).',
      },
      {
        titre: "Croisé arrière/ailier et tir de l'ailier, 4 fins (Dragør HK)",
        url: 'http://www.dragoerhb.dk/fransk/f246.html',
        note: "Après le croisé, l'arrière part à l'ancien poste de l'ailier ou au corner; quatre fins.",
      },
    ],
    ballon: 'DC',
    variantes: [
      {
        nom: "1 - Renversement sur l'arrière opposé",
        etapes: [
          ...CROISE_AR_AL_BASE,
          {
            texte: "Lancé vers le centre, l'ailier fait une longue passe à l'arrière gauche, qui monte vers le but.",
            courses: { AiD: [3.2, 8.4], ArG: [-4.6, 8.8] },
            passe: ['AiD', 'ArG', 0.2],
            def: { G2: [-4.7, 5.6] },
          },
          {
            texte: "L'arrière gauche tire de loin.",
            tir: 'ArG',
          },
        ],
      },
      {
        nom: "2 - L'arrière croise derrière l'ailier (Fenyo)",
        etapes: [
          {
            texte: "Le demi-centre passe à l'arrière droit, qui donne à son ailier.",
            courses: { ArD: [5.8, 9.2] },
            passe: ['DC', 'ArD', 0],
          },
          {
            texte: "L'ailier droit reçoit, fixe vers l'extérieur puis part vers le centre: il entraîne son défenseur vers l'intérieur.",
            courses: { AiD: { vers: [6.4, 5.6], via: [8.6, 3.8] } },
            passe: ['ArD', 'AiD', 0.1],
            def: { D1: [7.0, 3.8], D2: [5.0, 6.2] },
          },
          {
            texte: "L'arrière droit croise derrière lui, vers l'extérieur, et reçoit au croisement: il prend la place de l'ailier.",
            courses: { AiD: [5.8, 6.4], ArD: { vers: [8.4, 4.4], via: [8.2, 7.6] } },
            passe: ['AiD', 'ArD', 0.55],
            def: { D1: [6.8, 4.6], D2: [4.8, 6.8] },
          },
          { texte: "L'arrière droit prend le tir de l'ailier.", tir: 'ArD' },
        ],
      },
      {
        nom: "3 - L'ailier croise derrière l'arrière et tire",
        etapes: [
          ...CROISE_AR_AL_BASE,
          {
            texte: "L'ailier, lancé vers l'intérieur, prend l'intervalle entre le 3 et le 2 et tire.",
            courses: { AiD: [3.6, 7.8] },
            tir: { par: 'AiD', t: 0.5 },
          },
        ],
      },
      {
        nom: "4 - L'ailier feinte et sert le demi-centre",
        etapes: [
          ...CROISE_AR_AL_BASE,
          {
            texte: "L'ailier feinte le tir et passe au demi-centre, qui s'engage.",
            courses: { AiD: [3.6, 8.2], DC: [1.0, 8.6] },
            passe: ['AiD', 'DC', 0.5],
            def: { D3: [2.2, 7.2], G3: [-0.6, 7.2] },
          },
          { texte: 'Le demi-centre tire.', tir: 'DC' },
        ],
      },
      {
        nom: "5 - Rentrée de l'ailier et bloc de l'arrière (Dragør f136)",
        etapes: [
          {
            texte: "Le demi-centre passe à l'arrière droit.",
            courses: { ArD: [5.6, 9.0] },
            passe: ['DC', 'ArD', 0],
          },
          {
            texte: "L'arrière droit fixe le 2. L'ailier droit s'engage dans son dos.",
            courses: { ArD: [5.0, 8.0], AiD: { vers: [6.8, 8.6], via: [8.8, 5.0] } },
            def: { D2: [4.8, 6.3] },
          },
          {
            texte: "Arrivé à sa hauteur, l'arrière lui fait une passe dans le dos et pose un bloc sur le 2.",
            courses: { ArD: { vers: [5.4, 7.3], ecran: true }, AiD: [6.4, 7.8] },
            passe: ['ArD', 'AiD', 0.3],
          },
          { texte: "L'ailier tire sans opposition.", tir: 'AiD' },
        ],
      },
      {
        nom: "6 - Dédoublement de l'arrière entre le 1 et le 2 (CRC L-EX)",
        etapes: [
          ...CROISE_AR_AL_BASE,
          {
            texte: "L'arrière droit se dédouble entre le 1 et le 2. L'ailier poursuit sa longue course vers le centre.",
            courses: { ArD: [6.4, 5.0], AiD: [2.6, 8.6] },
            def: { D3: [2.2, 7.3] },
          },
          {
            texte: "L'ailier lui donne le ballon.",
            passe: ['AiD', 'ArD', 0.1],
          },
          { texte: "L'arrière droit tire de près.", tir: 'ArD' },
        ],
      },
    ],
  },
];
