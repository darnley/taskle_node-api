import sendgrid from '@sendgrid/mail'
import IMailServiceSendMessage from '../../interfaces/MailServiceSendMessage'

class MailService {
  private API_KEY = process.env.SENDGRID_API_KEY!;
  private FROM_MAIL = process.env.SENDGRID_FROM_MAIL!;

  public MailService () {
    this.validate()
  }

  private validate () {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('The SendGrid API key must be provided in environment variables as SENDGRID_API_KEY.')
    }

    if (!process.env.SENDGRID_FROM_MAIL) {
      throw new Error('The SendGrid default from mail address must be provided in environment variables as SENDGRID_FROM_MAIL.')
    }
  }

  public sendMail (data: IMailServiceSendMessage) {
    sendgrid.setApiKey(this.API_KEY)

    const sendgridData: sendgrid.MailDataRequired = {
      from: this.FROM_MAIL,
      to: data.to,
      subject: data.subject,
      html: data.html
    }

    return sendgrid.send(sendgridData)
  }
}

export default new MailService()
