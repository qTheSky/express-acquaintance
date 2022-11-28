import {Request, Response, Router} from 'express'
import {body} from 'express-validator'
import {inputValidationMiddleware} from '../midlewares/input-validation-middleware'
import {productsService} from '../domain/products-service'


export const productsRouter = Router({})


const titleValidation = body('title').trim().isLength({
		min: 1,
		max: 15
}).withMessage('Title length should be from 1 to 15 symbols')


productsRouter.post('/',
		titleValidation,
		inputValidationMiddleware,
		async (req: Request, res: Response) => {
				const newProduct = await productsService.createProduct(req.body.title)
				res.status(201).send(newProduct)
		})

productsRouter.put('/:id',
		titleValidation,
		inputValidationMiddleware,
		async (req: Request, res: Response) => {
				const isUpdated = await productsService.updateProduct(+req.params.id, req.body.title)
				if (isUpdated) {
						const product = await productsService.findProductById(+req.params.id)
						res.send(product)
				} else {
						res.send(404)
				}
		})

productsRouter.get('/', async (req: Request, res: Response) => {
		const foundProducts = await productsService.findProducts(req.query.title?.toString())
		res.send(foundProducts)
})


productsRouter.get('/:id', async (req: Request, res: Response) => {
		const product = await productsService.findProductById(+req.params.id)
		if (product) {
				res.send(product)
		} else {
				res.send(404)
		}
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
		const isDeleted = await productsService.deleteProduct(+req.params.id)
		if (isDeleted) {
				res.send(204)
		} else {
				res.send(404)
		}
})