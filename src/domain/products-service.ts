import {productsRepository} from '../repositories/products-db-repository'
import {Product} from '../repositories/db'


export const productsService = {
		async findProducts(title: string | null | undefined): Promise<Product[]> {
				return productsRepository.findProducts(title)
		},
		async findProductById(id: number): Promise<Product | null> {
				return productsRepository.findProductById(id)
		},
		async createProduct(title: string) {
				const newProduct = {id: +new Date(), title}
				const createdProduct = await productsRepository.createProduct(newProduct)
				return createdProduct
		},
		async updateProduct(id: number, title: string) {
				return await productsRepository.updateProduct(id, title)
		},
		async deleteProduct(id: number) {
				return await productsRepository.deleteProduct(id)
		},
}