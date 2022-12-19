import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from './routes/products-router'
import {runDb} from './repositories/db'
import {usersRouter} from './routes/users-router'
import {authRouter} from './routes/auth-router'
import {emailRouter} from './routes/email-router'

const app = express()
const port = process.env.PORT || 5000


const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)


app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/email', emailRouter)


const startApp = async () => {
		await runDb()
		app.listen(port, () => {
				console.log(`Example app listening on port ${port}`)
		})
}

startApp()
