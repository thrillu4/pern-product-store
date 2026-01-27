import { SignInButton, useAuth } from '@clerk/clerk-react'
import { PackageIcon, SparklesIcon } from 'lucide-react'
import { Link } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'
import ProductCard from '../components/ProductCard'
import { useAllProducts } from '../hooks/useProducts'
import type { IProduct } from '../types'
import { ROUTES } from '../utils/routes'

const Home = () => {
	const { isSignedIn } = useAuth()
	const { data: products, isError, isLoading } = useAllProducts()

	if (isLoading) return <LoadingSpinner />

	if (isError) {
		return (
			<div
				role='alert'
				className='flex items-center text-3xl  text-white justify-center h-100'
			>
				<div className='bg-red-700 px-10 rounded-4xl py-5'>
					Something went wrong. Please refresh the page or try later.
				</div>
			</div>
		)
	}
	return (
		<div className='mt-10 space-y-10 '>
			<div className=' bg-linear-to-br from-slate-800 via-cyan-950 to-violet-700 rounded-4xl overflow-hidden'>
				<div className='flex items-center text-white justify-evenly py-20 px-10'>
					<div className='text-center lg:text-left'>
						<h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
							Share Your <span className='text-primary'>Products</span>
						</h1>
						<p className='py-4 text-xl opacity-65	'>
							Upload, discover, and connect with creators.
						</p>
						{isSignedIn ? (
							<Link
								to={ROUTES.CREATE}
								className='inline-flex mt-6 items-center gap-2 cursor-pointer font-semibold text-lg bg-purple-900 px-5 rounded-4xl py-3'
							>
								<SparklesIcon />
								Start Selling
							</Link>
						) : (
							<SignInButton mode='modal'>
								<button className='flex mt-6 items-center gap-2 cursor-pointer font-semibold text-lg bg-purple-900 px-5 rounded-4xl py-3'>
									<SparklesIcon />
									Start Selling
								</button>
							</SignInButton>
						)}
					</div>
					<div className='relative'>
						<div className='absolute inset-0 bg-violet-600/20 blur-3xl rounded-full scale-110' />
						<img
							src='/image.png'
							alt='Creator'
							className='relative h-64 lg:h-72 rounded-2xl shadow-2xl'
						/>
					</div>
				</div>
			</div>

			<div>
				<h2 className='text-xl font-bold text-white flex items-center gap-2 mb-4'>
					<PackageIcon className='size-5 ' />
					All Products
				</h2>

				{products.length === 0 ? (
					<div className='bg-linear-to-bl from-zinc-100-700  via-cyan-950 to-violet-300-800 rounded-4xl'>
						<div className='flex flex-col gap-3 text-white items-center text-center py-16'>
							<PackageIcon className='size-16' />
							<h3 className='text-2xl font-bold'>No products yet</h3>
							<p className=' text-xl'>Be the first to share something!</p>
							<Link
								to='/create'
								className=' mt-2  font-semibold text-lg bg-purple-900 px-5 rounded-4xl py-2'
							>
								Create Product
							</Link>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{products.map((product: IProduct) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
