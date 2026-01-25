import { requireAuth } from '@clerk/express'
import express from 'express'
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getMyProducts,
	getProductById,
	updateProduct,
} from '../controllers/productController'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.get('/my-products', requireAuth(), getMyProducts)
router.post('/', requireAuth(), createProduct)
router.put('/:id', requireAuth(), updateProduct)
router.delete('/:id', requireAuth(), deleteProduct)

export default router
