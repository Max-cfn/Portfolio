import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

const ProfileSchema = z.object({
  network: z.string(),
  username: z.string().optional(),
  url: z.string().optional()
});

const WorkSchema = z.object({
  name: z.string(),
  position: z.string(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  summary: z.string(),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([])
});

const EducationSchema = z.object({
  institution: z.string(),
  area: z.string(),
  studyType: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  score: z.string().optional()
});

const CertificateSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
  url: z.string().optional(),
  score: z.string().optional()
});

const SkillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  category: z.string().optional()
});

const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string()
});

const ReferenceSchema = z.object({
  name: z.string(),
  reference: z.string(),
  contact: z.string().optional()
});

const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  url: z.string().optional(),
  roles: z.array(z.string()).optional(),
  entity: z.string().optional(),
  type: z.string().optional()
});

export const ResumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string(),
    summary: z.string(),
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    website: z.string().optional(),
    image: z.string().optional(),
    profiles: z.array(ProfileSchema).default([])
  }),
  work: z.array(WorkSchema).default([]),
  education: z.array(EducationSchema).default([]),
  certificates: z.array(CertificateSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  languages: z.array(LanguageSchema).default([]),
  references: z.array(ReferenceSchema).default([]),
  projects: z.array(ProjectSchema).default([])
});

export type Resume = z.infer<typeof ResumeSchema>;

const resumePath = path.join(process.cwd(), 'content', 'resume.json');

let cachedResume: Resume | null = null;

export async function getResume(): Promise<Resume> {
  if (cachedResume) {
    return cachedResume;
  }

  try {
    const file = await fs.readFile(resumePath, 'utf-8');
    const data = JSON.parse(file);
    const parsed = ResumeSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Le fichier resume.json est invalide. Lancez \"npm run validate:resume\" pour plus d'informations.\n${parsed.error}`
      );
    }
    cachedResume = parsed.data;
    return parsed.data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(
        'Le fichier content/resume.json est introuvable. Importez-le via "npm run import:cv -- ./cv.pdf" ou placez le JSON existant dans content/resume.json.'
      );
    }
    throw error;
  }
}

export async function getAllKeywords(locale: string = 'fr') {
  const resume = await getResume();
  const keywordSets = [
    ...resume.work.flatMap((job) => job.keywords),
    ...resume.projects.flatMap((project) => project.keywords ?? []),
    ...resume.skills.flatMap((skill) => skill.keywords)
  ];

  return Array.from(new Set(keywordSets.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, locale)
  );
}

export async function getSkillsByCategory() {
  const resume = await getResume();
  return resume.skills.reduce<Record<string, typeof resume.skills>>((acc, skill) => {
    const key = skill.category ?? skill.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(skill);
    return acc;
  }, {});
}


