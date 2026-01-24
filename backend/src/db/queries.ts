import { eq } from 'drizzle-orm'
import { db } from '.'
import { NewProduct, NewUser, products, users } from './schema'

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
	const [product] = await db
		.update(products)
		.set(data)
		.where(eq(products.id, productId))
		.returning()
	return product
}

export const deleteProduct = async (productId: string) => {
	const [product] = await db
		.delete(products)
		.where(eq(products.id, productId))
		.returning()
	return product
}
