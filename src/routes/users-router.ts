import {Request, Response, Router} from 'express'
import {authService} from '../domain/auth-service'


export const usersRouter = Router({})

usersRouter.post('/',
		async (req: Request, res: Response) => {
				const newProduct = await authService.createUser(req.body.login, req.body.email, req.body.password)
				res.status(201).send(newProduct)
		})