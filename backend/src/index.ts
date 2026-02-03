import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import express from 'express'
import { ENV } from './config/env'
import commentRoutes from './routes/commentRoutes'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }))
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.json({
		message: 'Hello there!',
	})
})

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/comments', commentRoutes)

app.listen(ENV.PORT, () => {
	console.log(`Server is up ✅ and running 🏃 on Port: ${ENV.PORT}`)
})
