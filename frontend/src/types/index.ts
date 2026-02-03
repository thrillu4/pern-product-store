export interface IUserData {
	email: string
	name: string
	imageUrl: string
}

export interface IProductData {
	title: string
	description: string
	imageUrl: string
}

export interface IComment {
	content: string
	createdAt: Date
	updatedAt: Date
	productId: string
}

export interface IProduct extends IProductData {
	id: string
	createdAt: Date
	updatedAt: Date
	user: IUserData
	comments: IComment[]
}
