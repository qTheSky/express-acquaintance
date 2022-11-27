import {MongoClient} from 'mongodb'

export interface Product {
		id: number
		title: string
}

const mongoUri =
		process.env.mongoURI || 'mongodb://0.0.0.0:27017'

const client = new MongoClient(mongoUri)
const db = client.db('shop')
export const productsCollection = db.collection<Product>('products')

export const runDb = async () => {
		try {
				await client.connect()
				await client.db('products').command({ping: 1})
				console.log('Connected successfully to mongo server')
		} catch {
				console.log('Cant connect to db')
				await client.close()
		}
}