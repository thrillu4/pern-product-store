import { eq } from 'drizzle-orm'
import { db } from '.'
import {
	comments,
	NewComment,
	NewProduct,
	NewUser,
	products,
	users,
} from './schema'

export const createUser = async (data: NewUser) => {
	const [user] = await db.insert(users).values(data).returning()
	return user
}

export const getUserById = async (userId: string) => {
	return db.query.users.findFirst({ where: eq(users.id, userId) })
}

export const updateUser = async (userId: string, data: Partial<NewUser>) => {
	const [user] = await db
		.update(users)
		.set(data)
		.where(eq(users.id, userId))
		.returning()
	return user
}

export const upsertUser = async (data: NewUser) => {
	const existingUser = await getUserById(data.id)
	if (existingUser) return updateUser(data.id, data)
	return createUser(data)
}

export const getAllProducts = async () => {
	const products = await db.query.products.findMany({
		with: { user: true },
		orderBy: (products, { desc }) => [desc(products.updatedAt)],
	})
	return products
}

export const getProductById = async (productId: string) => {
	return db.query.products.findFirst({
		where: eq(products.id, productId),
		with: { user: true },
		orderBy: (products, { desc }) => desc(products.updatedAt),
	})
}

export const getProductByUserId = async (userId: string) => {
	return await db.query.products.findMany({
		where: eq(products.userId, userId),
		with: { user: true },
		orderBy: (products, { desc }) => desc(products.updatedAt),
	})
}

export const createProduct = async (data: NewProduct) => {
	const [product] = await db.insert(products).values(data).returning()
	return product
}

export const updateProduct = async (
	productId: string,
	data: Partial<NewProduct>,
) => {
	const existingProduct = await getProductById(productId)
	if (!existingProduct) {
		throw new Error(`Product with id ${productId} not found`)
	}
	const [product] = await db
		.update(products)
		.set(data)
		.where(eq(products.id, productId))
		.returning()
	return product
}

export const deleteProduct = async (productId: string) => {
	const existingProduct = await getProductById(productId)
	if (!existingProduct) {
		throw new Error(`Product with id ${productId} not found`)
	}
	const [product] = await db
		.delete(products)
		.where(eq(products.id, productId))
		.returning()
	return product
}

export const createComment = async (data: NewComment) => {
	const [comment] = await db.insert(comments).values(data).returning()
	return comment
}

export const getCommentById = async (commentId: string) => {
	return await db.query.comments.findFirst({
		where: eq(comments.id, commentId),
		with: { user: true },
	})
}

export const deleteComment = async (commentId: string) => {
	const existingComment = await getCommentById(commentId)
	if (!existingComment) {
		throw new Error(`Comment with id ${commentId} not found`)
	}
	const [comment] = await db
		.delete(comments)
		.where(eq(comments.id, commentId))
		.returning()
	return comment
}
