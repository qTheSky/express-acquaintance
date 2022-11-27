import {Product, productsCollection} from './db'



export const productsRepository = {
		async findProducts(title: string | null | undefined): Promise<Product[]> {

				const filter: any = {}
				if (title) {
						filter.title = {$regex: title}
				}
				return productsCollection.find(filter).toArray()
		},
		async findProductById(id: number): Promise<Product | null> {
				const product: Product | null = await productsCollection.findOne({id: id})
				if (product) {
						return product
				} else {
						return null
				}
		},
		async createProduct(title: string) {
				const newProduct = {id: +new Date(), title}
				const result = await productsCollection.insertOne(newProduct)
				return newProduct
		},
		async updateProduct(id: number, title: string) {
				const result = await productsCollection.updateOne({id: id}, {$set: {title: title}})
				return result.matchedCount === 1
		},
		async deleteProduct(id: number) {
				const result = await productsCollection.deleteOne({id: id})
				return result.deletedCount === 1
		},
}