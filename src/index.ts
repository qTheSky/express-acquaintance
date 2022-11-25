import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from './routes/products-router'
import {addressesRouter} from './routes/adresses-router'

const app = express()
const port = 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)


app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
})