import { promises as fs } from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { parse } from 'yaml';
import { ResumeSchema } from '../lib/resume';

async function main() {
  const pdfPath = process.argv[2];
  if (!pdfPath) {
    console.error('Usage: npm run import:cv -- <chemin-vers-cv.pdf>');
    process.exit(1);
  }

  const absolutePdfPath = path.resolve(process.cwd(), pdfPath);
  const contentDir = path.join(process.cwd(), 'content');
  const targetPath = path.join(contentDir, 'resume.json');
  const examplePath = path.join(contentDir, 'resume.example.yaml');

  const pdfBuffer = await fs.readFile(absolutePdfPath);
  const parsedPdf = await pdf(pdfBuffer);
  console.info('Extraction du texte terminée. Aperçu :');
  console.info(parsedPdf.text.slice(0, 500));

  let baseResume: unknown = null;
  if (await fileExists(examplePath)) {
    const exampleRaw = await fs.readFile(examplePath, 'utf-8');
    baseResume = parse(exampleRaw);
  }

  if (!baseResume) {
    baseResume = {
      basics: {
        name: '',
        label: '',
        summary: parsedPdf.text.slice(0, 280),
        email: '',
        phone: '',
        location: '',
        profiles: []
      },
      work: [],
      education: [],
      certificates: [],
      skills: [],
      languages: [],
      references: [],
      projects: []
    };
  }

  const parsed = ResumeSchema.parse(baseResume);
  await fs.writeFile(targetPath, JSON.stringify(parsed, null, 2));
  console.info(`Résumé importé avec succès dans ${targetPath}`);
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error('Impossible de générer le fichier resume.json');
  console.error(error);
  process.exit(1);
});
