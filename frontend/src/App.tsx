import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import CreateNewProduct from './pages/CreateNewProduct'
import EditProduct from './pages/EditProduct'
import Home from './pages/Home'
import Product from './pages/Product'
import Profile from './pages/Profile'
import { ROUTES } from './utils/routes'

function App() {
	return (
		<div className='min-h-screen bg-[#202020]'>
			<NavBar />
			<main className='max-w-5xl'>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.EDIT} element={<EditProduct />} />
					<Route path={ROUTES.CREATE} element={<CreateNewProduct />} />
					<Route path={ROUTES.PROFILE} element={<Profile />} />
					<Route path={ROUTES.PRODUCT} element={<Product />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
