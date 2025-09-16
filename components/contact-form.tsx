'use client';

import { useTranslations } from 'next-intl';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const tContact = useTranslations('contact');
  const tActions = useTranslations('actions');
  const [formState, setFormState] = useState<ContactFormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" method="post" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            {tContact('name')}
          </label>
          <Input
            id="name"
            name="name"
            value={formState.name}
            onChange={onChange}
            placeholder="Jane Doe"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {tContact('email')}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {tContact('message')}
        </label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={formState.message}
          onChange={onChange}
          placeholder="Bonjour Maxence, ..."
          required
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? '...' : tActions('send')}
        </Button>
        {status === 'success' && <p className="text-sm text-green-600">{tContact('success')}</p>}
        {status === 'error' && <p className="text-sm text-red-600">{tContact('error')}</p>}
      </div>
    </form>
  );
}
