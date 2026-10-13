# combinaisons-handball

Répertoire des combinaisons de handball, avec pour chacune une description et un schéma animé étape par étape.

Site: https://cesar-lizurey.github.io/combinaisons-handball/

Le répertoire compte 370 combinaisons et plus de 1 000 variantes, issues de sources françaises (FFHandball, revue "Approches du Handball", clubs), danoises (Dragør HK), allemandes, espagnoles, tchèques et scandinaves. Chaque fiche cite ses sources et indique sa fiabilité.

## Fonctionnalités

- Liste des combinaisons à gauche, regroupées par catégorie repliable, avec une recherche et des filtres par défense (0-6, 5-1, 3-2-1, 4-2) et par fiabilité.
- Description, objectif et points clés de chaque combinaison.
- Schéma animé sur un demi-terrain: lecture, pause, étape suivante ou précédente, début, fin, curseur pour rembobiner, choix de la vitesse.
- Raccourcis clavier: `Espace` (lecture/pause), flèches gauche et droite (étape précédente/suivante), `Origine` / `Fin`.
- Libellés des joueurs au choix: postes (`AiG ArG DC ArD AiD Piv`) ou numéros (`1 2 3 4 5 6`).
- Défense affichable ou masquable (0-6, 5-1, 3-2-1, 4-2, individuelle), tracés des étapes précédentes.
- Situations de supériorité ou d'infériorité numérique (joueurs exclus) et de jeu à 7 contre 6.
- Variantes pour certaines combinaisons (par exemple les quatre fins de l'Espagnole).
- Une page par combinaison, avec sa propre adresse: `.../c/yago/`, `.../c/espagnole/`, etc. (les anciens liens en `#yago` restent valables).

## Lancer en local

Le site est statique, sans dépendance ni compilation: ouvrez `index.html` dans un navigateur.

## Déploiement sur GitHub Pages

Le workflow [.github/workflows/pages.yml](.github/workflows/pages.yml) publie le site à chaque push sur `main`. Il vérifie les données, puis [tools/generer.js](tools/generer.js) produit une page HTML par combinaison (contenu lisible par les moteurs de recherche), la page "À propos" et `sitemap.xml`. Pour tester le résultat en local: `node tools/generer.js _site`, puis servir le dossier `_site` avec un petit serveur web.

À faire une seule fois: dans le dépôt GitHub, ouvrez **Settings vers Pages**, puis choisissez **GitHub Actions** dans **Build and deployment vers Source**.

## Référencement (Google, Bing)

Le sitemap est publié à l'adresse `https://cesar-lizurey.github.io/combinaisons-handball/sitemap.xml`. Il faut le déclarer une fois dans [Google Search Console](https://search.google.com/search-console) et [Bing Webmaster Tools](https://www.bing.com/webmasters). Pour prouver la propriété du site, déposer à la racine du dépôt le fichier de validation fourni (`googleXXXX.html` ou `BingSiteAuth.xml`): le générateur le publie automatiquement.

## Ajouter ou modifier une combinaison

Les combinaisons sont dans [js/combinaisons.js](js/combinaisons.js) et dans les lots de [js/donnees/](js/donnees/) (chaque lot fait `window.COMBINAISONS.push(...)` et doit être déclaré dans `index.html`). Les dispositifs défensifs et les positions de départ sont dans [js/config.js](js/config.js). Le format est décrit en tête de js/combinaisons.js:

- Repère en mètres: `x` va de -10 (touche gauche) à +10 (touche droite), `y` est la distance à la ligne de but (zone à 6 m, ligne des 9 m).
- Attaquants: `AiG`, `ArG`, `DC`, `ArD`, `AiD`, `Piv`. Défenseurs: `G1`, `G2`, `G3`, `D3`, `D2`, `D1` (numérotés de l'extérieur vers le centre) et `GB`.
- Chaque étape contient un `texte`, puis au choix des `courses`, une `passe`, un `tir` et des déplacements de défenseurs (`def`).
- `fiabilite` vaut `'sourcee'`, `'partielle'` ou `'a-verifier'` (valeur par défaut). Elle est affichée sous forme de badge, et d'une pastille dans la liste quand la combinaison n'est pas entièrement sourcée.
- `sources` est une liste de `{ titre, url, note }`, affichée dans la section "Sources".
- Champs facultatifs: `dispositif` ('0-6', '5-1', '3-2-1', '4-2'), `depart` (positions de départ, `J7` pour un 7e joueur de champ), `absents` (joueurs exclus). Une variante peut avoir ses propres `ballon`, `dispositif` et `depart`.

Après une modification, lancez le vérificateur: `node tools/verifier.js`. Il contrôle les champs, les joueurs, les passes et tirs (faits par le porteur du ballon) et les positions (hors de la zone, dans le terrain).

Exemple:

```js
{
  id: 'ma-combi',
  nom: 'Ma combinaison',
  categorie: 'Croisés',
  defense: '0-6',
  resume: 'Une phrase de résumé.',
  description: ['Premier paragraphe.', 'Deuxième paragraphe.'],
  objectif: 'Ce que cherche la combinaison.',
  pointsCles: ['Point 1', 'Point 2'],
  fiabilite: 'sourcee',
  sources: [{ titre: 'Nom de la fiche', url: 'https://...', note: 'Ce que dit la source.' }],
  ballon: 'DC',
  etapes: [
    { texte: 'Le DC attaque à gauche.', courses: { DC: [-2.8, 8.4] }, def: { G3: [-2.4, 7.2] } },
    { texte: "L'ArG croise et reçoit.", courses: { ArG: { vers: [-0.5, 8.5], via: [-3, 10] } }, passe: ['DC', 'ArG', 0.55] },
    { texte: "L'ArG tire.", tir: 'ArG' },
  ],
}
```
