# Mise en ligne — mode d'emploi

Site statique, aucune dépendance à installer, aucun build.
Hébergement visé : **Cloudflare Pages** (gratuit, bande passante illimitée, HTTPS
automatique, domaine perso inclus).

---

## 1. Mettre le site en ligne (10 minutes)

### Option A — glisser-déposer, sans GitHub *(le plus rapide)*

1. Crée un compte sur <https://dash.cloudflare.com/sign-up> (gratuit, pas de CB).
2. Dans le menu de gauche : **Workers & Pages** → **Create** → onglet **Pages**
   → **Upload assets**.
3. Nom du projet : `maxence-cerfontaine` (il deviendra
   `maxence-cerfontaine.pages.dev`).
4. Glisse le **contenu** du dossier `maxence-site/` — pas le dossier lui-même,
   `index.html` doit se retrouver à la racine.
5. **Deploy**. Le site est en ligne en ~30 secondes.

Pour une mise à jour : même écran → **Create new deployment** → tu reglisses le dossier.

### Option B — via GitHub *(recommandé sur la durée)*

Le dépôt git est déjà initialisé avec un premier commit.

```bash
# 1. crée un dépôt vide sur github.com (sans README ni .gitignore)
# 2. puis, depuis le dossier du site :
git remote add origin https://github.com/TON-COMPTE/maxence-cerfontaine.git
git branch -M main
git push -u origin main
```

Ensuite, dans Cloudflare : **Workers & Pages** → **Create** → **Pages**
→ **Connect to Git** → choisis le dépôt.

Réglages de build à renseigner :

| Champ | Valeur |
|---|---|
| Framework preset | `None` |
| Build command | *(laisser vide)* |
| Build output directory | `/` |

À partir de là, **chaque `git push` redéploie le site automatiquement.**
C'est aussi ce qui te fait un vrai pipeline CI/CD à montrer en entretien.

---

## 2. Brancher un nom de domaine (optionnel, ~10 €/an)

1. Achète le domaine — idéalement directement chez **Cloudflare Registrar**
   (vendu au prix coûtant, sans marge ni hausse au renouvellement) :
   `maxencecerfontaine.com`, `.fr` ou `.dev`.
2. Dans ton projet Pages : **Custom domains** → **Set up a custom domain**.
3. Si le domaine est chez Cloudflare, le DNS se configure tout seul et le
   certificat HTTPS est émis en quelques minutes.

**Après avoir branché le domaine**, remplace `REMPLACER-PAR-TON-DOMAINE`
partout dans ces trois fichiers (sinon la carte de partage LinkedIn ne
s'affichera pas) :

- `index.html` — balises `og:url`, `og:image`, `twitter:image`, `canonical`
- `robots.txt`
- `sitemap.xml`

---

## 3. Modifier le contenu

**Tout le contenu vit dans un seul endroit** : le bloc `const CONFIG = { ... }`
en haut de la balise `<script>`, à la fin de `index.html`. Tu n'as jamais besoin
de toucher au HTML ni au CSS au-dessus.

Ce que tu peux changer sans risque :

| Je veux… | Où |
|---|---|
| Corriger un texte FR ou EN | `CONFIG.ui.fr` / `CONFIG.ui.en` |
| Ajouter une mission | un objet de plus dans `CONFIG.missions` |
| Ajouter un employeur | un objet de plus dans `CONFIG.companies` |
| Activer le lien d'une certification | remplacer `url:null` par `url:"..."` |
| Ajouter une compétence | `CONFIG.skills` |
| Changer les CV | remplacer les PDF dans `cv/` |

Règle d'or : chaque champ existe en `fr` et en `en`. Si tu ajoutes une mission,
duplique un bloc existant et remplace les textes — la structure fait le reste.

Après modification : recharge le fichier dans ton navigateur pour vérifier,
puis `git add . && git commit -m "maj" && git push` (option B), ou reglisse le
dossier dans Cloudflare (option A).

---

## 4. Deux points à traiter avant de diffuser le lien

1. **Confidentialité client.** Le site nomme Galeries Lafayette, Fitness Park,
   Dimotrans et Finaré avec le détail des architectures. Vérifie ce que tes
   clauses de confidentialité Hardis et Devoteam autorisent. Si c'est limite,
   anonymise dans `CONFIG.missions` (« un grand magasin parisien », « une chaîne
   de salles de sport européenne ») — le reste du site est inchangé.
2. **PDF des CV.** Ceux fournis sont générés par LibreOffice ; réexporte-les
   depuis Word pour une pagination strictement identique (voir `cv/LISEZ-MOI.txt`).

---

## 5. Ce que ça coûte

| Poste | Coût |
|---|---|
| Hébergement Cloudflare Pages | 0 € |
| HTTPS + CDN mondial | 0 € |
| Sous-domaine `.pages.dev` | 0 € |
| Domaine perso (optionnel) | ~10 €/an |

**Total : 0 € pour démarrer, ~10 €/an avec ton propre domaine.**
