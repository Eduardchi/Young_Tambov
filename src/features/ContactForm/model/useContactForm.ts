// src/features/ContactForm/model/useContactForm.ts
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { ContactFormData } from '@shared/types';
import { contactsApi } from '@shared/api/contacts.api';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const INITIAL: ContactFormData = { name: '', phone: '', message: '' };

export function useContactForm() {
  const [values, setValues] = useState<ContactFormData>(INITIAL);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleConsent(e: ChangeEvent<HTMLInputElement>) {
    setConsent(e.target.checked);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setStatus('loading');
    try {
      await contactsApi.send(values);
      setStatus('success');
      setValues(INITIAL);
      setConsent(false);
    } catch {
      setStatus('error');
    }
  }

  return { values, consent, status, handleChange, handleConsent, handleSubmit };
}