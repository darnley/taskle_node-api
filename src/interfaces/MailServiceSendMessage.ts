import { MailDataRequired } from '@sendgrid/mail'

type IMailServiceSendMessage = {
  to: string;
  subject: string;
  html: string;
}

export default IMailServiceSendMessage
