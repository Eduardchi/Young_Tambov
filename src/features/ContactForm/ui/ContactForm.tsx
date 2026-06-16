// src/features/ContactForm/ui/ContactForm.tsx
import { useContactForm } from '../model/useContactForm';
import { Button } from '@shared/ui/Button/Button';
import styles from './ContactForm.module.scss';

export function ContactForm() {
  const { values, consent, status, handleChange, handleConsent, handleSubmit } = useContactForm();
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

      <textarea
        id="message"
        name="message"
        value={values.message}
        onChange={handleChange}
        className={styles.textarea}
        placeholder="Вопрос"
        required
        rows={4}
        disabled={isLoading}
        aria-label="Вопрос"
      />

      <input
        id="phone"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        className={styles.input}
        placeholder="Телефон для связи"
        required
        autoComplete="tel"
        disabled={isLoading}
        aria-label="Телефон для связи"
      />

      <label className={styles.consentLabel}>
        <input
          type="checkbox"
          className={styles.consentCheckbox}
          checked={consent}
          onChange={handleConsent}
          disabled={isLoading}
          required
          aria-label="Согласие на обработку персональных данных"
        />
        <span className={styles.consentText}>
          Я согласен(а) на{' '}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.consentLink}
            tabIndex={isLoading ? -1 : undefined}
          >
            обработку персональных данных
          </a>
        </span>
      </label>

      {status === 'error' && (
        <p className={styles.error} role="alert">
          Не удалось отправить запрос. Попробуйте ещё раз позже.
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading || !consent}
        fullWidth
      >
        {isLoading ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  );
}