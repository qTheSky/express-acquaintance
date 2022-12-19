import bcrypt from 'bcrypt'
import {ObjectId} from 'mongodb'
import {UserDB, usersRepository} from '../repositories/users-repository'
import {emailsManager} from '../managers/emails-manager'
import {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'


export const authService = {
		async createUser(login: string, email: string, password: string): Promise<UserDB | null> {
				const passwordHash = await this._generateHash(password)

				const newUser: UserDB = {
						_id: new ObjectId(),
						accountData: {
								userName: login,
								email,
								passwordHash,
								createdAt: new Date().toISOString(),
						},
						emailConfirmation: {
								confirmationCode: uuidv4(),
								expirationDate: add(new Date(), {
										hours: 1,
										minutes: 3,
								}),
								sentEmails: [],
								isConfirmed: false
						},
				}
				const createResult = usersRepository.createUser(newUser)

				try {
						await emailsManager.sendEmailConfirmationMessage(newUser)
				} catch (e) {
						console.error(e)
						// await usersRepository.deleteUser(newUser._id)
						return null
				}
				return createResult
		},
		async checkCredentials(loginOrEmail: string, password: string): Promise<UserDB | null> {
				const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
				if (!user) return null
				if (!user.emailConfirmation.isConfirmed) {
						return null
				}
				const isHashesEquals = await this._isPasswordCorrect(password, user.accountData.passwordHash)
				if (isHashesEquals) {
						return user
				} else {
						return null
				}
		},
		async _generateHash(password: string): Promise<string> {
				return await bcrypt.hash(password, 10)
		},
		async _isPasswordCorrect(password: string, hash: string): Promise<boolean> {
				const isEqual = await bcrypt.compare(password, hash)
				return isEqual
		},
		async findUserById(id: ObjectId): Promise<UserDB | null> {
				return await usersRepository.findUserById(id)
		},
		async confirmEmail(code: string) {
				const user = await usersRepository.findUserByConfirmationCode(code)
				if (!user) return false
				if (user.emailConfirmation.isConfirmed) return false
				if (user.emailConfirmation.confirmationCode !== code) return false
				if (user.emailConfirmation.expirationDate < new Date()) return false
				const result = await usersRepository.updateConfirmation(user._id)
				return result
		},
}