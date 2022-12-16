import {NextFunction, Request, Response} from 'express'
import {jwtService} from '../application/jwt-service'
import {usersService} from '../domain/users-service'
import {UserDB} from '../repositories/users-repository'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
		if (!req.headers.authorization) {
				res.send(401)
				return
		}
		const token = req.headers.authorization.split(' ')[1] // "bearer hufausudasufuausduu132u.udasudasjdjAKa"

		const userId = await jwtService.getUserIdByToken(token)
		if (userId) {
				req.user = await usersService.findUserById(userId) as UserDB
				next()
				return
		}
		res.send(401)
}