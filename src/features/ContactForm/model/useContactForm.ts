// src/features/ContactForm/model/useContactForm.ts
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { ContactFormData } from '@shared/types';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const INITIAL: ContactFormData = { name: '', email: '', message: '' };

export function useContactForm() {
  const [values, setValues] = useState<ContactFormData>(INITIAL);
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    await new Promise((res) => setTimeout(res, 800));
    setStatus('success');
  }

  return { values, status, handleChange, handleSubmit };
}