import { useAuth } from '@clerk/clerk-react'
import {
	ArrowLeftIcon,
	FileTextIcon,
	Home,
	ImageIcon,
	Loader,
	Save,
	SquareX,
	TypeIcon,
} from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'
import { useProduct, useUpdateProduct } from '../hooks/useProducts'
import { ROUTES } from '../utils/routes'

const EditProduct = () => {
	const { userId } = useAuth()
	const { id } = useParams()
	const { data: product, isLoading } = useProduct(id as string)
	const [productData, setProductData] = useState({
		title: '',
		description: '',
		imageUrl: '',
	})

	useEffect(() => {
		if (product) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setProductData({
				title: product.title,
				description: product.description,
				imageUrl: product.imageUrl,
			})
		}
	}, [product])

	const updateProduct = useUpdateProduct()
	const navigate = useNavigate()
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!id) return
		updateProduct.mutate(
			{ id, ...productData },
			{
				onSuccess: () => navigate(`${ROUTES.PRODUCT}/${id}`),
			},
		)
	}
	if (isLoading) return <LoadingSpinner />

	if (!product || product.userId !== userId) {
		return (
			<div className='text-white h-full mx-auto text-center space-y-10 mt-50'>
				<h2 className='text-5xl flex justify-center text-red-500 items-center gap-3'>
					{!product ? 'Product not found' : 'Access denied'}{' '}
					<SquareX size={50} />
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

	return (
		<div className='max-w-2xl mt-20 mx-auto text-white'>
			<Link
				to='/'
				className='mb-4 flex  text-lg items-center gap-1 hover:underline'
			>
				<ArrowLeftIcon /> Back
			</Link>

			<div className=' bg-linear-to-bl  via-cyan-900 px-10 py-15 rounded-4xl'>
				<div className=''>
					<h1 className='flex items-center gap-2'>
						<Save className='size-6' />
						Edit Product
					</h1>

					<form onSubmit={handleSubmit} className='space-y-4 mt-4'>
						<label className='flex items-center gap-2 border-2 rounded-4xl px-5 py-2 '>
							<TypeIcon />
							<input
								maxLength={100}
								type='text'
								placeholder='Product title'
								className='text-lg grow focus:outline-none'
								value={productData.title}
								onChange={(e) =>
									setProductData({ ...productData, title: e.target.value })
								}
								required
							/>
						</label>

						<label className='flex items-center gap-2 border-2 rounded-4xl px-5 py-2'>
							<ImageIcon className='size-4 ' />
							<input
								type='url'
								placeholder='Image URL'
								className='text-lg grow focus:outline-none'
								value={productData.imageUrl}
								onChange={(e) =>
									setProductData({ ...productData, imageUrl: e.target.value })
								}
								required
							/>
						</label>

						{productData.imageUrl && (
							<div className=' relative inline-block'>
								<div
									onClick={() =>
										setProductData({ ...productData, imageUrl: '' })
									}
									className='absolute cursor-pointer top-0 right-0 z-10 bg-transparent'
								>
									✖️
								</div>
								<img
									src={productData.imageUrl}
									alt='Preview'
									className='h-40 object-contain'
								/>
							</div>
						)}

						<div>
							<div className='flex items-start gap-2 p-3 border'>
								<FileTextIcon className='size-4  mt-1' />
								<textarea
									maxLength={200}
									placeholder='Description'
									className='grow bg-transparent resize-none focus:outline-none min-h-24'
									value={productData.description}
									onChange={(e) =>
										setProductData({
											...productData,
											description: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>

						{updateProduct.isError && (
							<div role='alert' className=''>
								<span>Failed to edit product. Try again.</span>
							</div>
						)}

						<button
							type='submit'
							className='w-full cursor-pointer bg-purple-900 py-3 font-semibold rounded-3xl'
							disabled={updateProduct.isPending}
						>
							{updateProduct.isPending ? (
								<Loader className='animate-spin inline' />
							) : (
								'Save Changes'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default EditProduct
