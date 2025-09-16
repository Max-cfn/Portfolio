import { getResume } from '@/lib/resume';
import NavBarClient from './nav-bar-client';

export default async function NavBar() {
  const resume = await getResume();
  return <NavBarClient basics={resume.basics} />;
}
