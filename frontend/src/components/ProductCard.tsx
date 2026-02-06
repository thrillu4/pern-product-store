import { MessageCircleIcon } from 'lucide-react'
import { Link } from 'react-router'
import type { IProduct } from '../types'
import { ROUTES } from '../utils/routes'

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

const ProductCard = ({ product }: { product: IProduct }) => {
	const isNew = new Date(product.updatedAt) > oneWeekAgo

	return (
		<Link
			to={`${ROUTES.PRODUCT}/${product.id}`}
			className='bg-[#131212] rounded-4xl '
		>
			<figure className='px-6 pt-4'>
				<img
					src={product.imageUrl}
					alt={product.title}
					className='rounded-4xl h-70 w-full object-cover'
				/>
			</figure>
			<div className='text-white p-6'>
				<h2 className='text-lg flex items-center justify-between'>
					{product.title}
					{isNew && (
						<span className=' bg-cyan-900 py-1 rounded-3xl px-4'>NEW</span>
					)}
				</h2>
				<p className='opacity-75'>
					{product.description.length > 50
						? `${product.description.slice(0, 50)}...`
						: product.description}
				</p>

				<div className='w-full h-0.5 bg-stone-800 mt-5 mb-4'></div>

				<div className='flex items-center justify-between'>
					{product.user && (
						<div className='flex items-center gap-2'>
							<div className=''>
								<div className='w-6 rounded-full'>
									<img src={product.user.imageUrl} alt={product.user.name} />
								</div>
							</div>
							<span className='text-sm '>{product.user.name}</span>
						</div>
					)}
					{product.comments && (
						<div className='flex items-center gap-1 '>
							<MessageCircleIcon className='size-3' />
							<span className='text-sm'>{product.comments.length}</span>
						</div>
					)}
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
