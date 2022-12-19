import {emailAdapter} from '../adapters/email-adapter'
import {UserDB} from '../repositories/users-repository'

export const emailsManager = {
		async sendPasswordRecoveryMessage(user: any,) {
				//save to repo
				// get user from repo
				await emailAdapter.sendEmail('user.email', 'password recovery', `<div>${user.recoveryCode}message</div>`)
		},
		async sendEmailConfirmationMessage(user: UserDB) {
				await emailAdapter.sendEmail(user.accountData.email, 'email confirmation',
						`<div>${user.emailConfirmation}</div>`)
		},
}
