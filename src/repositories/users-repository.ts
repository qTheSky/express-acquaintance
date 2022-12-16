import {usersCollection} from './db'
import {ObjectId} from 'mongodb'


export interface UserDB {
		_id: ObjectId
		userName: string
		email: string
		passwordHash: string
		passwordSalt: string
		createdAt: Date
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
		}
}