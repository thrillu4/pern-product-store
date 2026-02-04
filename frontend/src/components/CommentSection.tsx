import { useAuth } from '@clerk/clerk-react'
import { MessageSquare } from 'lucide-react'
import { useCreateComment, useDeleteComment } from '../hooks/useComments'
import type { IComment } from '../types'

interface Props {
	productId: string | undefined
	comments: IComment[]
}

const CommentSection = ({ comments, productId }: Props) => {
	const { isSignedIn, userId } = useAuth()
	const deleteComment = useDeleteComment()
	const createComment = useCreateComment()
	return (
		<div className='bg-[#131212] p-10 rounded-4xl'>
			<div className='flex items-center gap-3'>
				<MessageSquare />
				<h3>Comments</h3>
				<div className='rounded-full bg-purple-900 px-3 text-lg py-1'>
					{comments.length}
				</div>
			</div>
		</div>
	)
}

export default CommentSection
