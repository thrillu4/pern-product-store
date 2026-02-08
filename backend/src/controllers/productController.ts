import { getAuth } from '@clerk/express'
import { Request, Response } from 'express'
import * as queries from '../db/queries'

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await queries.getAllProducts()
		res.status(200).json(products)
	} catch (error) {
		console.log('Error getting products', error)
		res.status(500).json({ error: 'Failed to get products' })
	}
}

export const getProductById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const product = await queries.getProductById(id as string)
		if (!product) res.status(404).json({ error: 'Product not found' })
		res.status(200).json(product)
	} catch (error) {
		console.log('Error getting product by ID', error)
		res.status(500).json({ error: 'Failed to get product' })
	}
}

export const getMyProducts = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req)
		if (!userId) return res.status(401).json({ error: 'Unauthorized' })
		const products = await queries.getProductByUserId(userId)
		res.status(200).json(products)
	} catch (error) {
		console.log('Error with getting my products', error)
		res.status(500).json({ error: 'Failed to get my products' })
	}
}

export const createProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req)
		if (!userId) return res.status(401).json({ error: 'Unauthorized' })
		const { title, imageUrl, description } = req.body
		if (!title || !imageUrl || !description) {
			return res.status(400).json({
				error:
					'Title, Image Url, Description fields are required, please fill it ',
			})
		}
		const newProduct = await queries.createProduct({
			description,
			imageUrl,
			title,
			userId,
		})
		res.status(201).json(newProduct)
	} catch (error) {
		console.log('Error with creating new product', error)
		res
			.status(500)
			.json({ error: 'Failed to create new product, try again later' })
	}
}

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req)
		if (!userId) return res.status(401).json({ error: 'Unauthorized' })
		const { id } = req.params
		const { title, description, imageUrl } = req.body
		if (!title || !imageUrl || !description) {
			return res.status(400).json({
				error:
					'Title, Image Url, Description fields are required, please fill it ',
			})
		}
		const existingProduct = await queries.getProductById(id as string)
		if (!existingProduct) {
			return res.status(404).json({ error: 'Product not found' })
		}
		if (existingProduct.userId !== userId) {
			return res
				.status(403)
				.json({ error: 'You can only update your own products' })
		}
		const product = await queries.updateProduct(id as string, {
			description,
			imageUrl,
			title,
		})
		res.status(200).json(product)
	} catch (error) {
		console.log('Error with updating product', error)
		res.status(500).json({ error: 'Failed to update product' })
	}
}

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req)
		if (!userId) return res.status(401).json({ error: 'Unauthorized' })
		const { id } = req.params
		const existingProduct = await queries.getProductById(id as string)
		if (!existingProduct) {
			return res.status(404).json({ error: 'Product not found' })
		}
		if (existingProduct.userId !== userId) {
			return res
				.status(403)
				.json({ error: 'You can only delete your own products' })
		}
		await queries.deleteProduct(id as string)
		res.status(200).json({ message: 'Product deleted successfully' })
	} catch (error) {
		console.log('Error with deleting product', error)
		res.status(500).json({ error: 'Failed to delete product' })
	}
}
