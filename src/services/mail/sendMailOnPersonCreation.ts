import mail from '.'
import { IUser } from '../../models/User'
import log from '../../utils/log'
import { IPasswordReset } from '../../models/PasswordReset'
import passwordReset from '../../routes/auth/passwordReset'

/**
 * Envia o e-mail de boas-vindas com o endereço para alterar a senha.
 * @param person O usuário no qual vai receber o e-mail.
 */
export function sendMailOnPersonCreation (person: IUser, passwordResetInfo: IPasswordReset) {
  const baseUrl: string = process.env.FRONTEND_HTTP_BASE_URL ?? 'http://TASKLE_URL'
  const passwordResetUrl = `${baseUrl}/auth/passwordreset/${passwordResetInfo.user.toString()}/${passwordResetInfo.key1}/${passwordResetInfo.key2}`

  return mail.sendMail({
    to: person.emailAddress,
    subject: 'Sua conta Taskle foi criada',
    html: `Olá, ${person.firstName}.
      <p>A sua conta foi criada.</p>
      <p>Clique no endereço abaixo para resetar a sua senha.</p>
      <p><a href="${passwordResetUrl}">${passwordResetUrl}</a></p>`
  }).then(() => log.debug(`Welcome mail sent to '${person.emailAddress}'`))
}

export function sendMailRecoverPassword (person: IUser, passwordResetInfo: IPasswordReset) {
  const baseUrl: string = process.env.FRONTEND_HTTP_BASE_URL ?? 'http://TASKLE_URL'
  const passwordResetUrl = `${baseUrl}/auth/passwordreset/${passwordResetInfo.user.toString()}/${passwordResetInfo.key1}/${passwordResetInfo.key2}`

  return mail.sendMail({
    to: person.emailAddress,
    subject: 'Recuperação de senha do Taskle',
    html: `Olá, ${person.firstName}.
      <p>Clique no endereço abaixo para resetar a sua senha.</p>
      <p><a href="${passwordResetUrl}">${passwordResetUrl}</a></p>`
  }).then(() => log.debug(`Password recovery mail sent to '${person.emailAddress}'`))
}
