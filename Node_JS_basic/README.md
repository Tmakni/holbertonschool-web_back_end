readme
# Node HTTP — Comprendre `require('http')`, `createServer`, `req` & `res`

Objectif : t’expliquer précisément ce que **fait** chaque morceau de code, **comment** Node gère une requête HTTP, et **à quoi servent** `req` et `res`. À garder comme mémo Notion.

---

## 1) `const http = require('http')`

- **`require('http')`** charge le **module cœur** de Node qui sait parler le protocole HTTP (sans framework).
- Le résultat de `require('http')` est un **objet** qui expose des fonctions et classes utiles (ex. `createServer`, `Server`, `IncomingMessage`, `ServerResponse`).
- **`const http`** : tu crées une **variable** liée à cet objet. Le `const` signifie que **la référence** ne changera pas (tu ne réassignes pas `http = ...`), mais tu peux bien sûr appeler ses méthodes.
- ⚙️ **Module cache** : au premier `require`, Node charge le module et le met en cache. Les `require('http')` suivants renvoient la **même instance** (pas de rechargement).

---

## 2) `const app = http.createServer((req, res) => { ... })`

- **`http.createServer(handler)`** crée un **serveur HTTP**. Il te renvoie une instance de `http.Server` qu’on stocke dans `app`.
- **`handler`** est une **fonction callback** que Node appelle **à chaque requête entrante**. Signature : `(req, res) => { ... }`.
- `req` et `res` sont **deux objets différents** :
    - **`req`** : instance de `http.IncomingMessage`. Représente **la requête** du client (méthode, URL, en-têtes, corps éventuel). C’est un **Readable Stream** (tu peux lire le corps par événements `data`/`end`).
    - **`res`** : instance de `http.ServerResponse`. Représente **ta réponse** au client (code statut, en‑têtes, corps). C’est un **Writable Stream** (tu écris dedans avec `write`, puis `end`).

### À quoi sert `req` ?

- `req.method` → méthode HTTP (`GET`, `POST`, `PUT`, ...)
- `req.url` → chemin demandé (`/`, `/students`, ...)
- `req.headers` → objet des en‑têtes reçus
- **Corps** (pour `POST`, etc.) :
    
    ```jsx
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => { /* body complet */ });
    
    ```
    

### À quoi sert `res` ?

- `res.statusCode = 200` → code HTTP (200 OK, 404 Not Found, 500, ...)
- `res.setHeader('Content-Type', 'text/plain')` → en‑tête de réponse
- `res.write(chunk)` → écrit une partie du corps (optionnel)
- `res.end([body])` → **termine** la réponse (et peut envoyer le corps en une fois)
- `res.writeHead(statusCode, headers)` → alternative compacte pour poser statut + en‑têtes

### Exemple minimal (task)

```jsx
const http = require('http');

const app = http.createServer((req, res) => {
  res.statusCode = 200; // OK
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!');
});

app.listen(1245);
module.exports = app;

```

- **Peu importe l’URL**, on renvoie toujours le même texte (tu n’utilises pas `req.url` ici).

---

## 3) `app.listen(1245)` — écouter un port

- **Ouvre** la **porte réseau** n°1245 sur ta machine et met le serveur en écoute.
- Tant que le process tourne, il **attend** des connexions et exécutera ton handler pour chaque requête.
- Erreur fréquente : `EADDRINUSE` → le port 1245 est **déjà pris** (un autre process écoute dessus).
- Tu peux passer un host explicite : `app.listen(1245, '127.0.0.1')` (loopback IPv4) ou `app.listen(1245, '0.0.0.0')` (toutes interfaces).

---

## 4) Cycle complet d’une requête (mental model)

1. Un client (ex. `curl`) fait **`GET /`** vers `localhost:1245`.
2. Le noyau de l’OS accepte la connexion TCP et la remet à Node.
3. Node appelle ton **handler** `(req, res)`.
4. Tu **configures** la réponse (code + en‑têtes) puis tu **envoies** le corps avec `res.end(...)`.
5. Node **flush** la réponse au client et **réutilise** la connexion (keep‑alive) ou la ferme.

---

## 5) Aller plus loin (router simple)

Même si la task ne le demande pas, voici comment varier selon l’URL :

```jsx
const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('Home');
  } else if (req.method === 'GET' && req.url === '/ping') {
    res.statusCode = 200;
    res.end('pong');
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

```

---

## 6) Détails utiles / bonnes pratiques

- **Toujours terminer** la réponse (`res.end`) sinon le client reste en attente.
- **Content-Type** correct pour le type renvoyé (texte, JSON, HTML…).
- **Streaming** possible : envoyer la réponse par morceaux (`res.write`) ; utile pour gros fichiers.
- **Ne pas bloquer** l’event loop avec des opérations lourdes sync (utiliser async I/O).
- **Arrêter le serveur** : `Ctrl + C` dans le terminal, ou `app.close()` en tests.

---

## 7) Mini‑exos

1. Modifie l’exemple pour renvoyer **`Content-Type: text/html`** et un petit `<h1>Hello</h1>`.
2. Ajoute une route `/json` qui renvoie `{ ok: true }` avec `Content-Type: application/json`.
3. Loggue `req.method` et `req.url` à chaque requête pour voir le flux.

---

## 8) Résumé express

- `require('http')` → charge le module HTTP de Node.
- `http.createServer((req, res) => { ... })` → crée un serveur et te donne **`req`** (requête entrante) et **`res`** (ta réponse).
- `res.statusCode`, `res.setHeader`, `res.end` → construisent et terminent la réponse.
- `app.listen(1245)` → ouvre le port 1245 et attend les requêtes.



Pour mon fichier 5 : 


1) À quoi sert fs ?

fs = File System (module natif de Node.js).
Il permet de lire/écrire des fichiers, créer des dossiers, lister des répertoires, etc.

Sync (bloquant) : fs.readFileSync, fs.writeFileSync
→ simple pour des scripts courts, à éviter sur un serveur.

Async callback : fs.readFile(path, 'utf8', (err, data) => { ... })
→ non bloquant, le code continue pendant l’I/O.

Async Promises : fs.promises.readFile(path, 'utf8')
→ non bloquant, s’utilise avec async/await.

Dans ta task 5, on utilise fs.readFile (asynchrone) pour lire database.csv sans bloquer le serveur.

2) Ça sert à quoi DB_PATH et process.argv[2] ?

Quand tu lances:

node 5-http.js database.csv


Node te donne un tableau process.argv :

process.argv[0] → chemin de l’exécutable node

process.argv[1] → chemin du script (5-http.js)

process.argv[2] → premier argument utilisateur → ici database.csv

Donc :

const DB_PATH = process.argv[2];


DB_PATH est juste une variable qui contient le chemin de ton CSV, passé en argument quand tu démarres le serveur.

3) Dans new Promise((resolve, reject) => { ... }) : resolve et reject, c’est quoi exactement ?

Ce sont deux fonctions que le moteur JS te donne en paramètres de l’exécuteur de la Promise.

resolve(value) : marque la Promesse comme tenue (fulfilled) avec la valeur value.

reject(error) : marque la Promesse comme rejetée (rejected) avec une erreur (souvent new Error('...')).

Ce ne sont ni des “méthodes de la Promise” que tu appellerais plus tard, ni de simples variables ; ce sont des fonctions-callback fournies par JS pour régler la promesse une seule fois.

4) Que veut dire ! dans un if ?

! = négation logique. Il transforme une valeur en booléen (truthy/falsy), puis l’inverse.

if (!filePath) veut dire : si filePath est falsy.

En JS, sont falsy : undefined, null, '' (chaîne vide), 0, NaN, false.

Donc if (!filePath) passe si aucun chemin n’a été donné (ou une chaîne vide).

Ce n’est pas “différent de”, c’est “n’est pas vrai”.

5) reject = return ?

Non.

reject(new Error('...')) → rejette la Promise.

return → arrête l’exécution de la fonction en cours.

Dans la pratique, on fait souvent :

if (err) {
  reject(new Error('Cannot load the database'));
  return; // on S'ARRÊTE après avoir rejeté, pour ne pas continuer le traitement
}


ou

return reject(new Error('...')); // raccourci : on rejette ET on retourne tout de suite


Mais reject n’est pas équivalent à return. Ils n’ont pas le même rôle.

Important : dans un callback asynchrone (fs.readFile(..., (err, data)=>{ ... })), jeter (throw) ne sera pas capturé par la Promise automatiquement. Il faut appeler reject(...).

6) Le pipeline .split / .map / .filter / trim (et slice)

Appliqué à database.csv :

a) Lire le fichier en chaîne de caractères
fs.readFile(DB_PATH, 'utf8', (err, data) => { ... })


Ici, data est une string.

b) Découper en lignes
const lines = data.split('\n');


.split('\n') découpe à chaque saut de ligne → tableau de lignes.

Sous Windows, les lignes finissent souvent par \r\n. On nettoie ensuite.

c) Nettoyer et enlever les lignes vides
const cleanLines = lines
  .map((l) => l.trim())    // enlève espaces, '\r', etc. au début/fin
  .filter((l) => l !== ''); // supprime les lignes vides

d) Enlever le header
const rows = cleanLines.slice(1);
// slice(1) : prend du 2e élément jusqu’à la fin (ignore l’en-tête)

e) Découper chaque ligne CSV en colonnes
const colsRows = rows
  .map((line) => line.split(',').map((c) => c.trim()))
  .filter((cols) => cols.length >= 4); // on veut au moins firstname, lastname, age, field


.map(line => line.split(',')) → transforme chaque ligne en tableau de colonnes.

.map(c => c.trim()) → enlève espaces et \r (Windows) sur chaque colonne.

.filter(cols => cols.length >= 4) → ignore les lignes invalides/incomplètes.

f) Compter et grouper par field

Version “simple objet” :

const groups = {}; // { CS: ['Johann', ...], SWE: [...] }
let total = 0;

for (const cols of colsRows) {
  const firstName = cols[0];
  const field = cols[3];
  if (!groups[field]) groups[field] = [];
  groups[field].push(firstName);
  total += 1;
}


Version “Map” (préserve l’ordre d’apparition) :

const groups = new Map(); // field -> [firstnames]
let total = 0;

for (const cols of colsRows) {
  const firstName = cols[0];
  const field = cols[3];
  if (!groups.has(field)) groups.set(field, []);
  groups.get(field).push(firstName);
  total += 1;
}

g) Affichage

Tri alphabétique (souvent ce que veut le checker) :

for (const field of Object.keys(groups).sort()) {
  const list = groups[field].join(', ');
  console.log(`Number of students in ${field}: ${groups[field].length}. List: ${list}`);
}


Ou ordre d’apparition (si Map) :

for (const [field, list] of groups) {
  console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
}

7) Bonus rapides (à connaître dans ce contexte)

try { ... } catch { ... }
Utile pour protéger ton parsing. Mais attention : un throw dans le callback asynchrone fs.readFile ne sera pas attrapé par le try/catch entourant le readFile en dehors. D’où l’utilisation correcte de reject(new Error(...)) dans le callback.

Pourquoi text/plain dans la réponse HTTP ?
Le checker attend du texte brut, pas du JSON/HTML.

res.setHeader('Content-Type', 'text/plain');


Pourquoi module.exports = app ?
Pour que les tests puissent importer ton serveur (require('./5-http')), le fermer (app.close()), etc.

8) Micro-exos (2 minutes chacun)

Écris une fonction isEmpty(v) qui renvoie true si v est falsy : return !v;
Teste-la avec undefined, '', 'a', 0, 1.

Transforme un tableau de chaînes en nombres sans NaN :
['1','2','a','3'] -> [1,2,3] (hint: map(Number), puis filter(Number.isFinite)).

Recode le groupement par field en une ligne avec reduce.
