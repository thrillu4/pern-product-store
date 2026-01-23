import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import express from 'express'
import { ENV } from './config/env'

const app = express()

app.use(cors({ origin: ENV.FRONTEND_URL }))
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.json({
		message: 'Hello there!',
	})
})

app.listen(ENV.DATABASE_URL, () => {
	console.log(`Server is up ✅ and running 🏃 on Port: ${ENV.PORT}`)
})
