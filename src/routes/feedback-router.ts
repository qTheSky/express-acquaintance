import {Request, Response, Router} from 'express'
import {authMiddleware} from '../midlewares/auth-middleware'
import {feedbacksService} from '../domain/feedbacks-service'

export const feedbackRouter = Router({})

feedbackRouter
		.post('/', authMiddleware,
				async (req: Request, res: Response) => {
						const newProduct = await feedbacksService.sendFeedback(req.body.comment, req.user!._id)
						res.status(201).send(newProduct)
				})
		.get('/',
				async (req, res) => {
						const users = await feedbacksService.allFeedbacks()
						res.send(users)
				})

