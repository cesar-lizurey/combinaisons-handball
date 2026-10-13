#!/usr/bin/env node
/*
 * Génère le site statique publié: node tools/generer.js [dossier] (par défaut _site)
 *
 * - une page par combinaison (c/<id>/index.html) et une page "À propos" (a-propos/index.html),
 *   dont le contenu est déjà écrit dans le HTML pour les moteurs de recherche;
 * - sitemap.xml (à déclarer dans Google Search Console et Bing Webmaster Tools: sur un site
 *   publié dans un sous-dossier, un robots.txt ne serait pas lu par les moteurs).
 * L'application (js/app.js) prend ensuite le relais dans le navigateur.
 *
 * Adresse publique du site: variable d'environnement SITE_URL (avec / final).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = (process.env.SITE_URL || 'https://cesar-lizurey.github.io/combinaisons-handball/').replace(/\/?$/, '/');
const racine = path.join(__dirname, '..');
const sortie = path.resolve(process.argv[2] || path.join(racine, '_site'));
const modele = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');

// Données
const ctx = { window: {} };
vm.createContext(ctx);
for (const m of modele.matchAll(/<script src="([^"]+)"/g)) {
  if (!m[1].endsWith('app.js')) vm.runInContext(fs.readFileSync(path.join(racine, m[1]), 'utf8'), ctx);
}
const { COMBINAISONS: C, HB } = ctx.window;

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const court = (s, n) => (s.length <= n ? s : `${s.slice(0, n - 3).replace(/\s+\S*$/, '')}...`);

// Remplace le contenu d'un élément repéré par son id (balise simple, sans élément imbriqué du même nom).
function remplir(html, id, contenu) {
  const re = new RegExp(`(<([a-z0-9]+)[^>]*\\sid="${id}"[^>]*>)([\\s\\S]*?)(</\\2>)`);
  if (!re.test(html)) throw new Error(`élément #${id} introuvable dans index.html`);
  return html.replace(re, (m, ouv, tag, ancien, ferm) => ouv + contenu + ferm);
}

function listeStatique(prefixe) {
  const groupes = new Map();
  for (const c of C) {
    if (!groupes.has(c.categorie)) groupes.set(c.categorie, []);
    groupes.get(c.categorie).push(c);
  }
  return [...groupes].map(([cat, items]) => `<details><summary><span>${esc(cat)}</span><span class="nb">${items.length}</span></summary><ul>${
    items.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
      .map(c => `<li><a href="${prefixe}c/${c.id}/" data-id="${c.id}">${esc(c.nom)}</a></li>`).join('')
  }</ul></details>`).join('');
}

function page({ prefixe, titre, description, url, type = 'website', corps = h => h }) {
  let h = modele;
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(titre)}</title>`);
  h = h.replace(/<meta name="description" content="[^"]*">/, [
    `<meta name="description" content="${esc(description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:title" content="${esc(titre)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${url}">`,
    '<meta property="og:locale" content="fr_FR">',
    '<meta property="og:site_name" content="Combinaisons de handball">',
  ].join('\n  '));
  h = h.replace(/(href|src)="(css|js)\//g, `$1="${prefixe}$2/`);
  h = h.replace('<body>', `<body data-racine="${prefixe || './'}">`);
  h = h.replace(/href="\.\/" data-route=""/, `href="${prefixe || './'}" data-route=""`);
  h = h.replace(/href="#a-propos" data-route="a-propos"/g, `href="${prefixe}a-propos/" data-route="a-propos"`);
  h = remplir(h, 'liste', listeStatique(prefixe));
  return corps(h);
}

function ecrire(rel, contenu) {
  const f = path.join(sortie, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, contenu);
}

function preremplirFiche(h, c) {
  const v = c.variantes ? c.variantes[0] : null;
  const etapes = v ? v.etapes : c.etapes;
  h = remplir(h, 'titre', esc(c.nom));
  h = remplir(h, 'alias', c.alias ? `Aussi appelée: ${esc(c.alias)}` : '');
  h = remplir(h, 'resume', esc(c.resume));
  h = remplir(h, 'variantes', (c.variantes || []).map(x => `<button type="button">${esc(x.nom)}</button>`).join(''));
  h = remplir(h, 'texte-etape', etapes.length ? esc(etapes[0].texte) : '');
  h = remplir(h, 'description', c.description.map(p => `<p>${esc(p)}</p>`).join(''));
  h = remplir(h, 'objectif', esc(c.objectif || ''));
  h = remplir(h, 'points', (c.pointsCles || []).map(p => `<li>${esc(p)}</li>`).join(''));
  h = remplir(h, 'etapes', etapes.map(e => `<li><button type="button">${esc(e.texte)}</button></li>`).join(''));
  h = remplir(h, 'sources', (c.sources || []).map(s =>
    `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.titre)}</a>${s.note ? `: ${esc(s.note)}` : ''}</li>`).join(''));
  return h;
}

// Préparation du dossier de sortie
fs.rmSync(sortie, { recursive: true, force: true });
fs.mkdirSync(sortie, { recursive: true });
for (const d of ['css', 'js']) fs.cpSync(path.join(racine, d), path.join(sortie, d), { recursive: true });

const urls = [];
const description = `Répertoire de ${C.length} combinaisons d'attaque en handball (croisés, Espagnole, Yago, Kempa, jeu avec le pivot, jets francs...), avec schémas animés étape par étape et sources.`;

// Accueil: affiche la première fiche, comme l'application.
ecrire('index.html', page({
  prefixe: '',
  titre: 'Combinaisons de handball - schémas animés',
  description,
  url: SITE,
  corps: h => preremplirFiche(h, C[0]),
}));
urls.push(SITE);

// À propos
const nbVariantes = C.reduce((n, c) => n + (c.variantes ? c.variantes.length : 1), 0);
const stats = {
  fiches: C.length, variantes: nbVariantes,
  sourcees: C.filter(c => c.fiabilite === 'sourcee').length,
  liens: new Set(C.flatMap(c => (c.sources || []).map(s => s.url))).size,
  categories: new Set(C.map(c => c.categorie)).size,
};
ecrire('a-propos/index.html', page({
  prefixe: '../',
  titre: 'À propos - Combinaisons de handball',
  description: `Contenu, sources et fiabilité du répertoire de ${C.length} combinaisons de handball.`,
  url: `${SITE}a-propos/`,
  corps: h => h
    .replace('<div id="vue-fiche">', '<div id="vue-fiche" hidden>')
    .replace('<article id="vue-a-propos" class="a-propos" hidden>', '<article id="vue-a-propos" class="a-propos">')
    .replace(/<b data-stat="(\w+)"><\/b>|<span data-stat="(\w+)"><\/span>/g, (m, a, b) =>
      m.replace('></', `>${stats[a || b]}</`)),
}));
urls.push(`${SITE}a-propos/`);

// Une page par combinaison
for (const c of C) {
  const url = `${SITE}c/${c.id}/`;
  ecrire(`c/${c.id}/index.html`, page({
    prefixe: '../../',
    titre: `${c.nom} - Combinaisons de handball`,
    description: court(`${c.nom}: ${c.resume}`, 160),
    url,
    type: 'article',
    corps: h => preremplirFiche(h, c),
  }));
  urls.push(url);
}

// sitemap.xml
const jour = new Date().toISOString().slice(0, 10);
ecrire('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${jour}</lastmod></url>`).join('\n')}
</urlset>
`);

// Fichiers de validation des moteurs de recherche (google*.html, BingSiteAuth.xml) placés à la racine du dépôt.
for (const f of fs.readdirSync(racine)) {
  if (/^google[0-9a-f]+\.html$/.test(f) || f === 'BingSiteAuth.xml') fs.copyFileSync(path.join(racine, f), path.join(sortie, f));
}

console.log(`${urls.length} pages générées dans ${sortie} (adresse: ${SITE})`);
