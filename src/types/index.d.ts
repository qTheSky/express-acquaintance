import {UserDB} from '../repositories/users-repository'


declare global {
		declare namespace Express {
				export interface Request {
						user: UserDB | null
				}
		}
}