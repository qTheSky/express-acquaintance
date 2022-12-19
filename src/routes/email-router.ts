import {Request, Response, Router} from 'express'
import {businessService} from '../domain/business-service'

export const emailRouter = Router({})

emailRouter
		.post('/send', async (req: Request, res: Response) => {
				await businessService.doOperation()
				res.send(200)
		})