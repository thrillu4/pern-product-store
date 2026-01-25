import {
	SignInButton,
	SignUpButton,
	useAuth,
	UserButton,
} from '@clerk/clerk-react'
import { PlusIcon, ShoppingBag, User } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '../utils/routes'

const NavBar = () => {
	const { isSignedIn } = useAuth()
	return (
		<nav className='bg-[#23282E] flex text-white items-center justify-between py-5 px-5 sm:px-10 lg:px-30'>
			<Link
				to={ROUTES.HOME}
				className='flex text-2xl cursor-pointer font-bold tracking-widest items-center gap-2'
			>
				<ShoppingBag />
				<div className='hidden sm:block'>Product Store</div>
			</Link>
			{isSignedIn ? (
				<div className='flex items-center gap-5 sm:gap-6 md:gap-10'>
					<Link
						to={ROUTES.CREATE}
						className='bg-[#1C1C1C] rounded-4xl flex items-center gap-3 cursor-pointer p-4 hover:bg-stone-600 transition-all duration-100'
					>
						<PlusIcon />
						New Product
					</Link>
					<Link
						to={ROUTES.PROFILE}
						className='flex items-center gap-1 hover:underline'
					>
						<User />
						Profile
					</Link>
					<UserButton />
				</div>
			) : (
				<div className='flex items-center gap-5 sm:gap-10'>
					<SignInButton mode='modal'>
						<button className='cursor-pointer hover:underline'>Sign In</button>
					</SignInButton>
					<SignUpButton mode='modal'>
						<button className='bg-[#1C1C1C] rounded-4xl cursor-pointer px-6 py-4 hover:bg-stone-600 transition-all duration-100'>
							Get Started
						</button>
					</SignUpButton>
				</div>
			)}
		</nav>
	)
}

export default NavBar
