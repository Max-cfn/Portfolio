import { NextResponse } from 'next/server';
import { getResume } from '@/lib/resume';

export async function GET() {
  const resume = await getResume();
  return NextResponse.json(resume, {
    headers: {
      'Content-Disposition': 'attachment; filename="resume.json"'
    }
  });
}
