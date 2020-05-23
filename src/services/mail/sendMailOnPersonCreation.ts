import mail from '.'
import { IUser } from '../../models/User'
import log from '../../utils/log'

/**
 * Envia o e-mail de boas-vindas com o endereço para alterar a senha.
 * @param person O usuário no qual vai receber o e-mail.
 */
export function sendMailOnPersonCreation (person: IUser) {
  return mail.sendMail({
    to: person.emailAddress,
    subject: 'Sua conta Taskle foi criada',
    html: `Olá, ${person.firstName}.
      <p>A sua conta foi criada.</p>
      <p>Clique no endereço abaixo para resetar a sua senha.</p>
      <p><a href="https://google.com">https://google.com</a></p>`
  }).then(() => log.debug(`Welcome mail sent to '${person.emailAddress}'`))
}
