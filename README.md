# Maxence Cerfontaine · Portfolio

Portfolio Next.js 14 (App Router) conçu pour présenter le profil de Maxence Cerfontaine en français et en anglais.

## Caractéristiques

- Next.js 14 + TypeScript strict + Tailwind CSS + shadcn/ui
- Gestion i18n via `next-intl` (FR par défaut, EN optionnel)
- Dark mode piloté par `next-themes`
- Données centralisées dans `content/resume.json` (schéma inspiré de JSON Resume et validé par Zod)
- Pages dédiées : accueil, expérience, formation, projets, compétences, contact, blog (placeholder)
- Composants réutilisables (timeline, cards, tags, filtres par technologies)
- SEO : metadata dynamiques, sitemap, robots.txt, API de téléchargement du CV
- CI GitHub Actions (lint, typecheck, build) et configuration Vercel prête à l'emploi

## Pré-requis

- Node.js 18+ (recommandé : 20)
- npm 9+

## Installation

```bash
npm install
```

Lancez le serveur de développement :

```bash
npm run dev
```

Build et serveur de production local :

```bash
npm run build
npm start
```

## Données CV

### Données attendues

Le fichier `content/resume.json` doit au minimum reprendre les informations suivantes :

- **Identité** : `basics.name="Maxence CERFONTAINE"`, `basics.label="Ingénieur Cloud / Cloud Architect"`, `basics.email="maxence.cerfontaine@outlook.fr"`, `basics.phone="+33 6 95 84 45 54"`, `basics.location="Paris, France"`.
- **Expérience** : missions Galeries Lafayette (Hardis), Hardis Group – Cloud Ops, Fitness Park, Dimotrans, Finaré avec résumés, `highlights` et `keywords` pertinents.
- **Formation** : EFREI (Licence + Master), Concordia University (semestre), avec dates et localisation.
- **Compétences** : AWS (avancé), Azure/GCP (fondamentaux), Terraform/CloudFormation, Python, Linux, PowerShell, Git, Kubernetes, Jenkins, FinOps et autres outils associés.
- **Certifications** : AWS SAA, AWS Cloud Practitioner, AZ-104, AZ-900, MS-900, Projet Voltaire (815/1000), TOEIC (930/990).
- **Langues & Références** : Français (natif), Anglais (avancé) et contact de référence `Sylvain Chabi`.

Ces données servent d'exemple pour structurer le JSON ; adapte les dates, résumés et `highlights` selon les besoins.



Le site consomme exclusivement `content/resume.json`. Dépose ton fichier (respectant le schéma JSON Resume-like) à cet emplacement.

### Valider le schéma

```bash
npm run validate:resume
```

### Importer depuis un PDF (optionnel)

Un script de secours est fourni si tu dois générer un JSON initial depuis un PDF :

```bash
npm run import:cv -- ./cv.pdf
```

Le script extrait le texte du PDF (via `pdf-parse`), charge le modèle `content/resume.example.yaml` puis écrit `content/resume.json`. Ouvre ensuite le JSON et complète les rubriques (expérience, projets, etc.) avant de relancer `npm run validate:resume`.

## Commandes utiles

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Démarre Next.js en mode développement |
| `npm run build` | Build production |
| `npm start` | Lance le serveur Next.js en mode production |
| `npm run lint` | Vérifie ESLint |
| `npm run typecheck` | Vérifie TypeScript |
| `npm run format` | Formate le code via Prettier |
| `npm run validate:resume` | Valide `content/resume.json` avec Zod |
| `npm run import:cv -- ./cv.pdf` | Génère un JSON à partir d'un PDF (fallback) |
| `npm run generate:sitemap` | Écrit `public/sitemap.xml` |
| `npm run og:generate` | Regénère `public/og-image.png` |

## Déploiement Vercel

1. Crée un projet sur Vercel et connecte ton dépôt GitHub.
2. Définis la variable d'environnement `NEXT_PUBLIC_SITE_URL` (ex. `https://portfolio-maxence.vercel.app`).
3. Vercel détecte Next.js automatiquement (`npm run build`).

## CI/CD

`.github/workflows/ci.yml` déclenche lint + typecheck + build sur les PR et sur `main`. Les jobs utilisent Node 20 et installent les dépendances via `npm ci`.

## Accessibilité & SEO

- Liens d’évitement, navigation clavier, contraste renforcé.
- Métadonnées dynamiques (Open Graph, Twitter) basées sur le CV.
- Sitemap et robots.txt maintenus avec les scripts fournis.

## Structure principale

```
app/
  layout.tsx
  page.tsx
  [locale]/...
  (pages)/experience
  (pages)/education
  ...
components/
  nav-bar.tsx, footer.tsx, section.tsx, timeline.tsx, ...
lib/
  resume.ts, seo.ts, i18n.ts, date.ts
scripts/
  import-cv.ts, validate-resume.ts, generate-sitemap.ts, generate-og-image.ts
content/
  resume.example.yaml
```

Complète `content/resume.json`, lance le dev server et ton portfolio sera prêt pour Vercel.



# Portfolio