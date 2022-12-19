import {emailsManager} from '../managers/emails-manager'

export const businessService = {
		async doOperation() {
				//save to repo
				// get user from repo
				await emailsManager.sendPasswordRecoveryMessage({})
		}
}
