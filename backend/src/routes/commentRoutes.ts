import { requireAuth } from '@clerk/express'
import express from 'express'
import { createComment, deleteComment } from '../controllers/commentController'

const router = express.Router()

router.post('/:productId', requireAuth(), createComment)
router.delete('/:commentId', requireAuth(), deleteComment)

export default router
