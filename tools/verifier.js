#!/usr/bin/env node
/*
 * Vérifie les données des combinaisons: node tools/verifier.js
 *
 * Charge les scripts de données listés dans index.html (tout sauf js/app.js), puis contrôle chaque
 * combinaison: champs obligatoires, joueurs connus, passes et tirs faits par le porteur du ballon,
 * joueurs hors de la zone des 6 m et dans le terrain. Les joueurs trop proches sont signalés en
 * avertissement. Code de sortie 1 s'il y a des erreurs.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const racine = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(racine, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.endsWith('app.js'));
// Fichiers de données supplémentaires passés en argument (pas encore déclarés dans index.html).
for (const f of process.argv.slice(2)) {
  const rel = path.relative(racine, path.resolve(f)).split(path.sep).join('/');
  if (!scripts.includes(rel)) scripts.push(rel);
}

const ctx = { window: {} };
ctx.window.COMBINAISONS = undefined;
vm.createContext(ctx);
const erreurs = [];
const avertissements = [];
// Un fichier de données illisible (en cours d'écriture, par exemple) est signalé sans bloquer les autres.
for (const s of scripts) {
  try {
    vm.runInContext(fs.readFileSync(path.join(racine, s), 'utf8'), ctx, { filename: s });
  } catch (e) {
    erreurs.push(`[${s}] fichier illisible: ${e.message}`);
  }
}

const { HB, COMBINAISONS } = ctx.window;
const FIABILITES = ['sourcee', 'partielle', 'a-verifier'];

const ids = new Set();
for (const c of COMBINAISONS) {
  const ou = `[${c.id || c.nom || '?'}]`;
  const err = m => erreurs.push(`${ou} ${m}`);
  const avert = m => avertissements.push(`${ou} ${m}`);

  for (const champ of ['id', 'nom', 'categorie', 'resume', 'description', 'ballon']) {
    if (!c[champ]) err(`champ "${champ}" manquant`);
  }
  if (ids.has(c.id)) err('identifiant en double');
  ids.add(c.id);
  if (!Array.isArray(c.description)) err('"description" doit être une liste de paragraphes');
  if (c.fiabilite && !FIABILITES.includes(c.fiabilite)) err(`fiabilité inconnue: ${c.fiabilite}`);
  if (c.dispositif && !HB.DISPOSITIFS[c.dispositif]) err(`dispositif inconnu: ${c.dispositif}`);
  for (const s of c.sources || []) {
    if (!s.titre || !/^https?:\/\//.test(s.url || '')) err(`source incomplète: ${JSON.stringify(s)}`);
  }
  if (!c.etapes && !c.variantes) err('ni "etapes" ni "variantes"');

  const attaque = HB.attaquants(c);
  const connus = new Set([...attaque, ...HB.defenseurs(c)]);

  for (const v of c.variantes || [{ nom: '', etapes: c.etapes || [] }]) {
    const ouV = v.nom ? ` "${v.nom}"` : '';
    const cv = HB.pourVariante(c, v);
    let pos = HB.depart(cv);
    let porteur = cv.ballon;
    if (!attaque.includes(porteur)) err(`${ouV} ballon de départ à un joueur inconnu: ${porteur}`);

    (v.etapes || []).forEach((e, i) => {
      const ici = `${ouV} étape ${i + 1}`;
      if (!e.texte) err(`${ici}: texte manquant`);
      const enLAir = new Set(e.enLAir || []);
      const tout = { ...(e.courses || {}), ...(e.def || {}) };
      for (const [id, m] of Object.entries(tout)) {
        if (!connus.has(id)) { err(`${ici}: joueur inconnu ${id}`); continue; }
        const vers = Array.isArray(m) ? m : m && m.vers;
        if (!Array.isArray(vers) || vers.length !== 2 || vers.some(n => typeof n !== 'number')) {
          err(`${ici}: position invalide pour ${id}`);
          continue;
        }
        pos[id] = vers;
      }
      if (e.passe) {
        const [de, a, t] = e.passe;
        if (de !== porteur) err(`${ici}: passe de ${de} alors que le ballon est à ${porteur}`);
        if (!attaque.includes(a)) err(`${ici}: passe à un joueur inconnu ${a}`);
        if (t !== undefined && (t < 0 || t > 1)) err(`${ici}: moment de passe hors de [0, 1]`);
        porteur = a;
      }
      if (e.tir) {
        const par = typeof e.tir === 'string' ? e.tir : e.tir.par;
        if (par !== porteur) err(`${ici}: tir de ${par} alors que le ballon est à ${porteur}`);
        porteur = null;
      }
      for (const [id, p] of Object.entries(pos)) {
        if (!connus.has(id) || id === 'GB') continue;
        if (HB.dansLaZone(p) && !enLAir.has(id)) err(`${ici}: ${id} dans la zone des 6 m (${p})`);
        if (Math.abs(p[0]) > 10 || p[1] < 0 || p[1] > 12.6) err(`${ici}: ${id} hors du terrain (${p})`);
      }
      const liste = Object.entries(pos).filter(([id]) => connus.has(id));
      for (let a = 0; a < liste.length; a++) {
        for (let b = a + 1; b < liste.length; b++) {
          const d = Math.hypot(liste[a][1][0] - liste[b][1][0], liste[a][1][1] - liste[b][1][1]);
          if (d < 0.8) avert(`${ici}: ${liste[a][0]} et ${liste[b][0]} se chevauchent (${d.toFixed(2)} m)`);
        }
      }
    });
    if (porteur !== null) avert(`${ouV}: se termine sans tir`);
  }
}

for (const a of avertissements) console.log(`avertissement ${a}`);
for (const e of erreurs) console.log(`ERREUR ${e}`);
console.log(`${COMBINAISONS.length} combinaisons, ${erreurs.length} erreur(s), ${avertissements.length} avertissement(s).`);
process.exit(erreurs.length ? 1 : 0);
