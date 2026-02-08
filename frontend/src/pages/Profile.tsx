import { Edit, Eye, PackageIcon, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'
import { useDeleteProduct, useMyProducts } from '../hooks/useProducts'
import { ROUTES } from '../utils/routes'

const Profile = () => {
	const { data: products, isLoading } = useMyProducts()
	const totalComments = products?.reduce(
		(acc, curr) => acc + curr.comments.length || 0,
		0,
	)
	const deleteProduct = useDeleteProduct()

	if (isLoading) return <LoadingSpinner />

	return (
		<div className='py-15 space-y-10'>
			<div className='flex items-center justify-between'>
				<div className='space-y-2'>
					<h1 className='text-4xl font-bold'>My Products</h1>
					<h2 className='text-2xl text-stone-500 font-semibold'>
						Manage your listings
					</h2>
				</div>
				<Link
					to={ROUTES.CREATE}
					className='flex items-center gap-2 rounded-4xl text-2xl font-semibold bg-purple-900 px-5 py-3 hover:bg-purple-700 transition duration-200'
				>
					<Plus size={30} />
					New
				</Link>
			</div>
			<div className='bg-[#131212] rounded-4xl p-10 text-xl font-bold flex items-center justify-between'>
				<div className='space-y-3 text-center'>
					<div>Total Products</div>
					<div className='text-4xl text-purple-500'>
						{products?.length || 0}
					</div>
				</div>
				<div className='space-y-3 text-center'>
					<div>Total Comments</div>
					<div className='text-4xl text-purple-500'>{totalComments || 0}</div>
				</div>
				<div className='space-y-3 text-center'>
					<div>Last Update</div>
					<div className='text-4xl text-purple-500'>
						{new Date().toLocaleTimeString()}
					</div>
				</div>
			</div>
			{products?.length === 0 ? (
				<div className='flex flex-col items-center text-3xl font-bold text-center py-16'>
					<PackageIcon className='size-20 text-purple-600 animate-spin [animation-duration:15s]' />
					<div className='space-y-2 mt-5'>
						<h3>No products yet</h3>
						<p className='text-xl font-semibold'>
							Start by creating your first product
						</p>
						<Link
							to={ROUTES.CREATE}
							className='underline mt-5 block hover:text-purple-600 transition duration-200'
						>
							Create Product
						</Link>
					</div>
				</div>
			) : (
				products?.map((product) => (
					<div
						key={product.id}
						className='flex gap-6 rounded-4xl bg-[#131212] min-h-60 h-full pr-15'
					>
						<div className='h-60 w-110'>
							<img
								src={product.imageUrl}
								alt={product.title}
								className='w-full h-full object-cover rounded-l-4xl'
							/>
						</div>
						<div className='flex flex-col w-full justify-between min-h-full py-10'>
							<div className='font-extrabold text-3xl'>{product.title}</div>
							<div className='text-stone-500 text-lg font-bold break-all'>
								{product.description}
							</div>
							<div className='flex justify-end'>
								<div className='flex items-center gap-10 '>
									<Link
										to={`${ROUTES.PRODUCT}/${product.id}`}
										className='flex items-center gap-2 cursor-pointer transition duration-200 hover:text-purple-700 hover:scale-105 font-bold'
									>
										<Eye />
										View
									</Link>
									<Link
										to={`${ROUTES.EDIT}/${product.id}`}
										className='flex items-center gap-2 cursor-pointer transition duration-200 hover:text-purple-700 hover:scale-105 font-bold'
									>
										<Edit />
										Edit
									</Link>
									<div
										onClick={() => {
											deleteProduct.mutate(product.id)
										}}
										className='flex items-center gap-2 text-red-800 cursor-pointer transition duration-200 hover:text-red-500 hover:scale-105 font-bold'
									>
										<Trash2 />
										Delete
									</div>
								</div>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	)
}

export default Profile
