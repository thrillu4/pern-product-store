import { getAuth } from '@clerk/express'
import { Request, Response } from 'express'
import * as queries from '../db/queries'

export const createComment = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req)
		if (!userId) return res.status(401).json({ error: 'Unauthorized' })
		const { productId } = req.params
		const { content } = req.body
		if (!content)
			return res.status(400).json({ error: 'Comment content is required' })
		const product = await queries.getProductById(productId as string)
		if (!product) {
			return res.status(404).json({ error: 'Product now found' })
		}
		const comment = await queries.createComment({
			content,
			userId,
			productId: productId as string,
		})
		res.status(201).json(comment)
	} catch (error) {
		console.log('Error with creating comment', error)
		res.status(500).json({ error: 'Failed to create new comment' })
	}
}

export const deleteComment = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req)
		if (!userId) return res.status(401).json({ error: 'Unauthorized' })
		const { commentId } = req.params
		const comment = await queries.getCommentById(commentId as string)
		if (!comment) {
			return res.status(404).json({ error: 'Comment now found' })
		}
		if (comment.userId !== userId) {
			return res
				.status(403)
				.json({ error: 'You can only delete your own comments ' })
		}
		await queries.deleteComment(commentId as string)
		res.status(201).json({ message: 'Comment deleted successfully' })
	} catch (error) {
		console.log('Error with deleting comment', error)
		res.status(500).json({ error: 'Failed to delete comment' })
	}
}
