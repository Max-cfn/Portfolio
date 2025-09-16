import { NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  // Placeholder: replace with an integration (email, webhook, etc.).
  console.info('New contact message received', parsed.data);

  return NextResponse.json({ success: true });
}
