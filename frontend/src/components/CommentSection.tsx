import { SignInButton, useAuth } from '@clerk/clerk-react'
import {
	LoaderCircle,
	LogIn,
	MessageSquare,
	MessagesSquare,
	Send,
	Trash2,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useCreateComment, useDeleteComment } from '../hooks/useComments'
import type { IComment } from '../types'

interface Props {
	productId: string | undefined
	comments: IComment[]
}

const CommentSection = ({ comments, productId }: Props) => {
	const [content, setContent] = useState('')
	const { isSignedIn, userId } = useAuth()
	const deleteComment = useDeleteComment(productId!)
	const createComment = useCreateComment()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!content.trim()) return
		if (productId) {
			createComment.mutate(
				{ content, productId },
				{ onSuccess: () => setContent('') },
			)
		}
	}

	const handleDelete = (commentId: string) => {
		if (confirm('Are you sure you want to delete this comment?'))
			deleteComment.mutate(commentId)
	}

	return (
		<div className='bg-[#131212] p-8 rounded-4xl'>
			<div className='flex items-center gap-3'>
				<MessageSquare />
				<h3 className='text-2xl'>Comments</h3>
				<div className='rounded-full bg-purple-900 px-3 py-1 text-lg '>
					{comments.length}
				</div>
			</div>
			{isSignedIn ? (
				<form onSubmit={handleSubmit} className='flex items-center gap-3 mt-6'>
					<input
						type='text'
						className='w-full border border-stone-600 bg-[#202020] px-8 py-3 rounded-4xl text-lg'
						placeholder='Add a comment...'
						maxLength={500}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<button
						className='bg-[#202020] rounded-full border border-stone-600 p-3 transition duration-200  disabled:text-stone-600 disabled:border-transparent not-disabled:hover:bg-stone-300 not-disabled:hover:text-black not-disabled:hover:border-black cursor-pointer'
						type='submit'
						disabled={createComment.isPending || !content.trim()}
					>
						{createComment.isPending ? (
							<LoaderCircle className='animate-spin' />
						) : (
							<Send />
						)}
					</button>
				</form>
			) : (
				<div className='mt-6 flex items-center gap-6 bg-[#202020] rounded-4xl px-10 py-3'>
					<div className='grow text-lg font-semibold'>
						Sign In to join the conversation...
					</div>
					<SignInButton>
						<button className='flex items-center gap-2 bg-purple-600 rounded-4xl px-4 py-2 text-xl cursor-pointer hover:bg-purple-600/50 transition duration-200 font-semibold'>
							<LogIn /> Sign In
						</button>
					</SignInButton>
				</div>
			)}
			<div className='mt-12 mb-6'>
				{comments.length === 0 ? (
					<div className='flex justify-center flex-col items-center gap-3'>
						<MessagesSquare size={100} />
						<div className='text-xl font-semibold'>
							No Comments yet. Be first!
						</div>
					</div>
				) : (
					<div className='space-y-10'>
						{comments.map((comment) => (
							<div key={comment.id} className='flex items-center gap-5'>
								<div>
									<img
										src={comment.user.imageUrl}
										className='size-15 rounded-full'
										alt='User avatar'
									/>
								</div>
								<div className=' grow flex items-center justify-between'>
									<div className='space-y-2 text-sm'>
										<div className='flex items-center gap-3'>
											{comment.user.name}
											<time className='text-stone-500'>
												{new Date(comment.createdAt).toLocaleDateString()}
											</time>
										</div>
										<div className='text-lg font-semibold '>
											{comment.content}
										</div>
									</div>
									{comment.userId === userId && (
										<Trash2
											onClick={() => handleDelete(comment.id)}
											className='text-red-800 cursor-pointer hover:scale-110 transition duration-200 hover:text-red-500 '
											size={25}
										/>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default CommentSection
