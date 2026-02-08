export interface IUserData {
	email: string
	name: string
	imageUrl: string
}

export interface IProductData {
	title: string
	description: string
	imageUrl: string
	createdAt?: Date
}

export interface IComment {
	id: string
	user: IUserData
	content: string
	createdAt: Date
	updatedAt: Date
	productId: string
	userId: string
}

export interface IProduct extends IProductData {
	id: string
	createdAt: Date
	updatedAt: Date
	user: IUserData
	comments: IComment[]
}
