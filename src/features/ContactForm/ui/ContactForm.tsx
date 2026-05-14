// src/features/ContactForm/ui/ContactForm.tsx
import { useContactForm } from '../model/useContactForm';
import { Button } from '@shared/ui/Button/Button';
import styles from './ContactForm.module.scss';

export function ContactForm() {
  const { values, status, handleChange, handleSubmit } = useContactForm();
  const isLoading = status === 'loading';

  if (status === 'success') {
    return (
      <div className={styles.success} role="alert">
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <p className={styles.successText}>Запрос отправлен. Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.row}>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Ваше имя"
          required
          autoComplete="name"
          disabled={isLoading}
          aria-label="Ваше имя"
        />
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="Электронная почта"
          required
          autoComplete="email"
          disabled={isLoading}
          aria-label="Электронная почта"
        />
      </div>
      <textarea
        id="message"
        name="message"
        value={values.message}
        onChange={handleChange}
        className={styles.textarea}
        placeholder="Ваше сообщение"
        required
        rows={4}
        disabled={isLoading}
        aria-label="Ваше сообщение"
      />
      <Button type="submit" variant="primary" size="lg" disabled={isLoading} fullWidth>
        {isLoading ? 'Отправка...' : 'Отправить запрос'}
      </Button>
    </form>
  );
}