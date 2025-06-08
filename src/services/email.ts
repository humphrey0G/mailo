// Browser-compatible email service using mock data
export interface EmailConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  tls: boolean;
}

export class EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    // Mock connection - in a real app, this would connect to a backend service
    return Promise.resolve();
  }

  async getEmails(folder: string = 'INBOX', limit: number = 50): Promise<any[]> {
    // Mock email data for browser compatibility
    const mockEmails = [
      {
        id: '1',
        sender: 'John Doe',
        subject: 'Project Update',
        preview: 'Here is the latest update on our project progress. We have made significant improvements to the user interface and added several new features that will enhance the overall user experience.',
        date: new Date().toISOString(),
        unread: true,
        tag: 'work'
      },
      {
        id: '2',
        sender: 'Sarah Wilson',
        subject: 'Meeting Tomorrow',
        preview: 'Just a reminder about our meeting scheduled for tomorrow at 2 PM. Please bring the quarterly reports and be prepared to discuss the upcoming product launch timeline.',
        date: new Date(Date.now() - 86400000).toISOString(),
        unread: false,
        tag: 'important'
      },
      {
        id: '3',
        sender: 'Newsletter',
        subject: 'Weekly Tech News',
        preview: 'This week in technology: AI advances, new frameworks, and more exciting developments in the world of software engineering and digital innovation.',
        date: new Date(Date.now() - 172800000).toISOString(),
        unread: false,
        tag: 'newsletter'
      },
      {
        id: '4',
        sender: 'Mom',
        subject: 'Family Dinner',
        preview: 'Hi honey! Just wanted to remind you about family dinner this Sunday. Your dad is making his famous barbecue and we would love to see you there.',
        date: new Date(Date.now() - 259200000).toISOString(),
        unread: true,
        tag: 'personal'
      }
    ];

    return Promise.resolve(mockEmails.slice(0, limit));
  }

  async sendEmail(options: { to: string; subject: string; text: string }): Promise<void> {
    // Mock send - in a real app, this would send via a backend service
    console.log('Mock email sent:', options);
    return Promise.resolve();
  }

  disconnect(): void {
    // Mock disconnect
  }
}

// Email provider configurations
export const EMAIL_PROVIDERS = {
  GMAIL: {
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  },
  YAHOO: {
    host: 'imap.mail.yahoo.com',
    port: 993,
    tls: true,
  },
  OUTLOOK: {
    host: 'outlook.office365.com',
    port: 993,
    tls: true,
  },
  CPANEL: {
    host: 'mail.example.com',
    port: 993,
    tls: true,
  },
};