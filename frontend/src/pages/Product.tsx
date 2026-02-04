import { useAuth } from '@clerk/clerk-react'
import {
	ArrowLeftIcon,
	Calendar,
	Edit,
	Home,
	LoaderCircle,
	SquareX,
	Trash2,
	User,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import CommentSection from '../components/CommentSection'
import Divider from '../components/Divider'
import LoadingSpinner from '../components/LoadingSpinner'
import { useDeleteProduct, useProduct } from '../hooks/useProducts'
import { ROUTES } from '../utils/routes'

const Product = () => {
	const { id } = useParams()
	const { userId } = useAuth()
	const { data: product, isLoading, error } = useProduct(id as string)
	console.log(product)
	const deleteProduct = useDeleteProduct()
	const navigate = useNavigate()
	const handleDelete = () => {
		if (confirm('Delete this product permanently?')) {
			deleteProduct.mutate(id as string, {
				onSuccess: () => navigate(ROUTES.HOME),
			})
		}
	}

	if (isLoading) return <LoadingSpinner />

	if (error || !product) {
		return (
			<div className='text-white h-full mx-auto text-center space-y-10 mt-50'>
				<h2 className='text-5xl flex justify-center text-red-500 items-center gap-3'>
					Product not found <SquareX size={50} />
				</h2>
				<Link
					to={ROUTES.HOME}
					className='underline text-2xl flex justify-center items-center gap-3'
				>
					<Home /> Go Home
				</Link>
			</div>
		)
	}

	const isOwner = userId === product.userId

	return (
		<div className='py-15'>
			<div className='flex justify-between items-center font-semibold'>
				<Link
					to={ROUTES.HOME}
					className='flex items-center gap-2 text-lg hover:underline px-6 py-3 hover:bg-black/30 transition-all duration-200 rounded-4xl'
				>
					<ArrowLeftIcon size={20} /> Back
				</Link>
				{isOwner && (
					<div className='flex items-center gap-2'>
						<Link
							to={`${ROUTES.EDIT}/${id}`}
							className='flex hover:underline px-6 py-3 hover:bg-black/30 transition-all duration-200 rounded-4xl text-lg items-center gap-2'
						>
							<Edit size={20} /> Edit
						</Link>
						<button
							disabled={deleteProduct.isPending}
							onClick={handleDelete}
							className='bg-red-600 cursor-pointer border border-transparent hover:border-white transition-all duration-200 hover:bg-transparent hover:text-white rounded-4xl px-4 py-2 flex items-center gap-2 text-black text-lg'
						>
							{deleteProduct.isPending ? (
								<LoaderCircle className='animate-spin' />
							) : (
								<Trash2 />
							)}{' '}
							Delete
						</button>
					</div>
				)}
			</div>
			<div className='grid grid-cols-4 gap-12 mt-10'>
				<div className='bg-[#131212] col-start-1 col-end-3 rounded-4xl p-6 max-h-114 w-full'>
					<img
						src={product.imageUrl}
						className='object-cover w-full h-full rounded-4xl'
						alt='product image'
					/>
				</div>
				<div className='bg-[#131212] col-start-3 space-y-6 col-end-5 rounded-4xl p-10 w-full'>
					<h2 className='text-4xl font-bold'>{product.title}</h2>
					<div className='flex items-center gap-6 text-stone-400'>
						<div className='flex items-center gap-2'>
							<Calendar />
							{new Date(product.createdAt).toLocaleDateString()}
						</div>
						<div className='flex items-center gap-2'>
							<User />
							{product.user.name}
						</div>
					</div>
					<Divider />
					<p className='font-semibold text-lg min-h-30 break-all'>
						{product.description}
					</p>
					<Divider />
					<div className='flex items-center gap-3'>
						<img
							src={product.user.imageUrl}
							className='w-16 rounded-full'
							alt='Author Image'
						/>
						<div>
							<div className='font-bold text-lg'>{product.user.name}</div>
							<div className='text-stone-400 '>Creator</div>
						</div>
					</div>
				</div>
				<div className='col-span-4'>
					<CommentSection comments={product.comments} productId={id} />
				</div>
			</div>
		</div>
	)
}

export default Product
