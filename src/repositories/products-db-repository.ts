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
				return await productsCollection.findOne({id: id})
		},
		async createProduct(newProduct: Product) {
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