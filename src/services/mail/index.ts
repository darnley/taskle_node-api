import { setApiKey, setSubstitutionWrappers, send, MailDataRequired } from '@sendgrid/mail'
import IMailServiceSendMessage from '../../interfaces/MailServiceSendMessage'

class MailService {
  private API_KEY = process.env.SENDGRID_API_KEY!;
  private FROM_MAIL = process.env.SENDGRID_FROM_MAIL!;

  public MailService () {
    this.configure()
  }

  private configure () {
    setApiKey(this.API_KEY)
    setSubstitutionWrappers('{{', '}}')
  }

  public sendMail (data: IMailServiceSendMessage) {
    data.from = this.FROM_MAIL

    return send(data)
  }
}

export default new MailService()
