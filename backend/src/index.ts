import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import express from 'express'
import path from 'path'
import { ENV } from './config/env'
import commentRoutes from './routes/commentRoutes'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }))
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/healthcheck', (req, res) => {
	res.json({
		message: 'Hello there and welcome to our Shop API 🥇!',
		endpoints: {
			users: '/api/users',
			products: '/api/products',
			comments: '/api/comments',
		},
	})
})

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/comments', commentRoutes)

if (ENV.NODE_ENV === 'production') {
	const __dirname = path.resolve()
	app.use(express.static(path.join(__dirname, '../frontend/dist')))
	app.get('/{*any}', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
	})
}
app.listen(ENV.PORT, () => {
	console.log(`Server is up ✅ and running 🏃 on Port: ${ENV.PORT}`)
})
