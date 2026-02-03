import {
	ArrowLeftIcon,
	FileTextIcon,
	ImageIcon,
	Loader,
	SparklesIcon,
	TypeIcon,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCreateProduct } from '../hooks/useProducts'
import { ROUTES } from '../utils/routes'

const CreateNewProduct = () => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		imageUrl: '',
	})
	const createProduct = useCreateProduct()
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		createProduct.mutate(formData, {
			onSuccess: () => navigate(ROUTES.HOME),
		})
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
						<SparklesIcon className='size-5' />
						New Product
					</h1>

					<form onSubmit={handleSubmit} className='space-y-4 mt-4'>
						<label className='flex items-center gap-2 border-2 rounded-4xl px-5 py-2 '>
							<TypeIcon />
							<input
								maxLength={100}
								type='text'
								placeholder='Product title'
								className='text-lg grow focus:outline-none'
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
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
								value={formData.imageUrl}
								onChange={(e) =>
									setFormData({ ...formData, imageUrl: e.target.value })
								}
								required
							/>
						</label>

						{formData.imageUrl && (
							<div className=' relative inline-block'>
								<div
									onClick={() => setFormData({ ...formData, imageUrl: '' })}
									className='absolute cursor-pointer top-0 right-0 z-10 bg-transparent'
								>
									✖️
								</div>
								<img
									src={formData.imageUrl}
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
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									required
								/>
							</div>
						</div>

						{createProduct.isError && (
							<div role='alert' className=''>
								<span>Failed to create. Try again.</span>
							</div>
						)}

						<button
							type='submit'
							className='w-full cursor-pointer bg-purple-900 py-3 rounded-3xl'
							disabled={createProduct.isPending}
						>
							{createProduct.isPending ? (
								<Loader className='animate-spin inline' />
							) : (
								'Create Product'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateNewProduct
