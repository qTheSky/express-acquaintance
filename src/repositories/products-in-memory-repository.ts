const products: Product[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

interface Product {
		id: number
		title: string
}

export const productsRepository = {
		async findProducts(title: string | null | undefined) {
				if (title) {
						return products.filter(p => p.title.indexOf(title) > -1)
				} else {
						return products
				}
		},
		async findProductById(id: number) {
				const product = products.find(p => p.id === id)
				if (product) {
						return product
				} else {
						return null
				}
		},
		async createProduct(title: string) {
				const newProduct = {id: +new Date(), title}
				products.push(newProduct)
				return newProduct
		},
		async updateProduct(id: number, title: string) {
				const product = products.find(p => p.id === id)
				if (product) {
						product.title = title
						return true
				} else {
						return false
				}
		},
		async deleteProduct(id: number) {
				for (let i = 0; i < products.length; i++) {
						if (products[i].id === id) {
								products.splice(i, 1)
								return true
						}
				}
				return false
		},
}