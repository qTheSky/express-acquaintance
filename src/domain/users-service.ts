import bcrypt from 'bcrypt'
import {ObjectId} from 'mongodb'
import {UserDB, usersRepository} from '../repositories/users-repository'


export const usersService = {
		async createUser(login: string, email: string, password: string) {
				const passwordSalt = await bcrypt.genSalt(10)
				const passwordHash = await this._generateHash(password, passwordSalt)

				const newUser: UserDB = {
						_id: new ObjectId(),
						userName: login,
						email,
						passwordHash,
						passwordSalt,
						createdAt: new Date()
				}
				return usersRepository.createUser(newUser)
		},
		async checkCredentials(loginOrEmail: string, password: string): Promise<UserDB | null> {
				const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
				if (!user) return null
				const passwordHash = await this._generateHash(password, user.passwordSalt)
				if (user.passwordHash === passwordHash) {
						return user
				}
				return null
		},
		async _generateHash(password: string, salt: string): Promise<string> {
				return await bcrypt.hash(password, salt)
		},
		async findUserById(id: ObjectId): Promise<UserDB | null> {
				return await usersRepository.findUserById(id)
		}
}