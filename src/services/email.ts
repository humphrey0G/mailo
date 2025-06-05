import nodemailer from 'nodemailer';
import Imap from 'imap';
import { simpleParser } from 'mailparser';

export interface EmailConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  tls: boolean;
}

export class EmailService {
  private imap: Imap;
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    // Initialize IMAP client
    this.imap = new Imap({
      user: config.user,
      password: config.password,
      host: config.host,
      port: config.port,
      tls: config.tls,
    });

    // Initialize SMTP transporter
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.tls,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });

    // Handle IMAP errors
    this.imap.on('error', (err) => {
      console.error('IMAP Error:', err);
    });
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        resolve();
      });

      this.imap.once('error', (err) => {
        reject(err);
      });

      this.imap.connect();
    });
  }

  async getEmails(folder: string = 'INBOX', limit: number = 50): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.imap.openBox(folder, false, (err, box) => {
        if (err) {
          reject(err);
          return;
        }

        const fetch = this.imap.seq.fetch(`${Math.max(1, box.messages.total - limit + 1)}:*`, {
          bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
          struct: true,
        });

        const emails: any[] = [];

        fetch.on('message', (msg) => {
          const email: any = {};

          msg.on('body', (stream, info) => {
            simpleParser(stream, (err, parsed) => {
              if (err) {
                console.error('Parsing error:', err);
                return;
              }

              if (info.which === 'TEXT') {
                email.body = parsed.text;
              } else {
                email.headers = parsed.headers;
              }
            });
          });

          msg.once('attributes', (attrs) => {
            email.attributes = attrs;
          });

          msg.once('end', () => {
            emails.push(email);
          });
        });

        fetch.once('error', (err) => {
          reject(err);
        });

        fetch.once('end', () => {
          resolve(emails);
        });
      });
    });
  }

  async sendEmail(options: nodemailer.SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(options);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  disconnect(): void {
    this.imap.end();
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
    // Note: These need to be configured based on the specific cPanel server
    host: 'mail.example.com',
    port: 993,
    tls: true,
  },
};