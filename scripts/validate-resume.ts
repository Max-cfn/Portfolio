import { promises as fs } from 'fs';
import path from 'path';
import { ResumeSchema } from '../lib/resume';

async function main() {
  const resumePath = path.join(process.cwd(), 'content', 'resume.json');
  const raw = await fs.readFile(resumePath, 'utf-8').catch(() => {
    throw new Error('Le fichier content/resume.json est introuvable.');
  });

  const data = JSON.parse(raw);
  const parsed = ResumeSchema.safeParse(data);
  if (!parsed.success) {
    console.error('Le CV JSON ne respecte pas le schéma attendu.');
    console.error(parsed.error.format());
    process.exit(1);
  }

  console.info('content/resume.json est valide ✅');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
