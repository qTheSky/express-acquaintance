import {usersCollection} from './db'
import {ObjectId} from 'mongodb'


interface EmailConfirmation {
		confirmationCode: string
		expirationDate: Date
		isConfirmed: boolean
		sentEmails: SentEmail[]
}

interface SentEmail {
		sentDate: Date
}

interface UserAccount {
		userName: string
		email: string
		passwordHash: string
		createdAt: string
}

export interface UserDB {
		_id: ObjectId
		accountData: UserAccount
		emailConfirmation: EmailConfirmation
}

interface RegistrationData {
		ip: string
}


export const usersRepository = {
		async getAllUsers() {
				return usersCollection
						.find()
						.sort('createdAt', -1)
						.toArray()
		},
		async createUser(user: UserDB): Promise<UserDB> {
				const result = await usersCollection.insertOne(user)
				return user
		},
		async findUserById(id: ObjectId): Promise<UserDB | null> {
				const user = await usersCollection.findOne({_id: id})
				return user ? user : null
		},
		async findByLoginOrEmail(loginOrEmail: string) {
				const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
				return user
		},
		async findUserByConfirmationCode(emailConfirmationCode: string) {
				const user = await usersCollection.findOne({'emailConfirmation.email': emailConfirmationCode})
				return user
		},
		async updateConfirmation(_id: ObjectId):Promise<boolean> {
				const result = await usersCollection.updateOne({_id},
						{$set: {'emailConfirmation.isConfirmed': true}})
				return result.acknowledged
		},
}