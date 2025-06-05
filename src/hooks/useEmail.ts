import { useState, useEffect } from 'react';
import { EmailService, EmailConfig, EMAIL_PROVIDERS } from '../services/email';

export function useEmail(provider: keyof typeof EMAIL_PROVIDERS, credentials: { user: string; password: string }) {
  const [emailService, setEmailService] = useState<EmailService | null>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const config: EmailConfig = {
      ...EMAIL_PROVIDERS[provider],
      user: credentials.user,
      password: credentials.password,
    };

    const service = new EmailService(config);
    setEmailService(service);

    return () => {
      if (service) {
        service.disconnect();
      }
    };
  }, [provider, credentials]);

  const fetchEmails = async (folder: string = 'INBOX', limit: number = 50) => {
    if (!emailService) return;

    setLoading(true);
    setError(null);

    try {
      await emailService.connect();
      const fetchedEmails = await emailService.getEmails(folder, limit);
      setEmails(fetchedEmails);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (options: { to: string; subject: string; text: string }) => {
    if (!emailService) return;

    setLoading(true);
    setError(null);

    try {
      await emailService.sendEmail(options);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    emails,
    loading,
    error,
    fetchEmails,
    sendEmail,
  };
}