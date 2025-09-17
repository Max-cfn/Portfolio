# Portfolio (Maxence Cerfontaine)

Single repository for my bilingual (FR/EN) resume and portfolio powered by Next.js 14 (App Router).

## Stack & Features

- Next.js 14 + TypeScript strict mode + Tailwind CSS + shadcn/ui
- Internationalisation handled by `next-intl` (FR default, EN optional)
- Dark mode via `next-themes`
- Content centralised in `content/resume.json` (JSON Resume inspired, validated with Zod)
- App routes for experience, education, projects, skills, contact, blog placeholder
- Reusable UI primitives (timeline, cards, tags, filters)
- SEO ready (dynamic metadata, sitemap, robots.txt, resume download endpoint)
- CI workflow (`lint`, `typecheck`, `build`) and Vercel-ready configuration

## Requirements

- Node.js 18+ (recommended 20)
- npm 9+

## Getting Started

```bash
npm install
npm run dev
```

Local production build:

```bash
npm run build
npm run start
```

## Resume Data

`content/resume.json` drives the entire site. Populate it with your details (name, contact, experience, education, skills, certifications, languages, references, projects).

> Tip: a placeholder file is committed so the build succeeds out of the box. Replace it with your own data before deploying.

### Validation

```bash
npm run validate:resume
```

### Import helper (from PDF)

```bash
npm run import:cv -- ./cv.pdf
```

This extracts text with `pdf-parse`, merges it with the template `content/resume.example.yaml`, and writes `content/resume.json` for manual review.

## Useful Commands

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the production bundle (outputs to `.next/`) |
| `npm run start` | Launch the Next.js production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript diagnostics |
| `npm run format` | Format with Prettier |
| `npm run validate:resume` | Validate `content/resume.json` |
| `npm run import:cv -- ./cv.pdf` | Bootstrap resume JSON from a PDF |
| `npm run generate:sitemap` | Regenerate `public/sitemap.xml` |
| `npm run og:generate` | Regenerate `public/og-image.png` |

## Deployment (Vercel)

1. Create a project on Vercel and connect this repository.
2. Set the environment variable `NEXT_PUBLIC_SITE_URL` (e.g. `https://portfolio-maxence.vercel.app`).
3. Vercel will run `npm run build` automatically.

## CI/CD

`/.github/workflows/ci.yml` installs dependencies with `npm ci`, runs linting, type checking, and ensures the app builds on every push/PR.

## Project Structure

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
content/
  resume.json (your data)
  resume.example.yaml
lib/
  i18n/index.ts, i18n/request.ts, resume.ts, seo.ts, date.ts
scripts/
  import-cv.ts, validate-resume.ts, generate-sitemap.ts, generate-og-image.ts
```

## Build Output

`npm run build` creates the production artefacts inside `.next/`. Run `npm run start` or deploy to Vercel to serve the optimised site.

## Accessibility & SEO

- Skip link, keyboard navigation, strong contrast defaults
- Dynamic Open Graph/Twitter metadata derived from `resume.json`
- Sitemap and robots maintained via scripts

---

Questions or issues: open an issue or ping me directly.
