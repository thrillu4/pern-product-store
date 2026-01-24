import { getAuth } from '@clerk/express'
import { Request, Response } from 'express'
import * as queries from '../db/queries'

export const syncUser = async (req: Request, res: Response) => {
	try {
		const { userId } = getAuth(req)
		if (!userId) return res.status(401).json({ error: 'Unauthorized!' })

		const { email, name, imageUrl } = req.body

		if (!email || !name || !imageUrl) {
			return res.status(400).json({
				error: 'Please fill the fields - Email, Name, ImageUrl are required.',
			})
		}

		const user = await queries.upsertUser({
			id: userId,
			email,
			name,
			imageUrl,
		})

		return res.status(200).json(user)
	} catch (error) {
		console.log('Error syncing user', error)
		res.status(500).json({ error: 'Failed to sync user' })
	}
}
