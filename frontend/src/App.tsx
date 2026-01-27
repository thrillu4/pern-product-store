import { Navigate, Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import { useAuthReq } from './hooks/useAuthReq'
import { useUserSync } from './hooks/useUserSync'
import CreateNewProduct from './pages/CreateNewProduct'
import EditProduct from './pages/EditProduct'
import Home from './pages/Home'
import Product from './pages/Product'
import Profile from './pages/Profile'
import { ROUTES } from './utils/routes'

function App() {
	const { isClerkLoaded, isSignedIn } = useAuthReq()
	useUserSync()
	if (!isClerkLoaded) return null
	return (
		<div className='min-h-screen bg-[#202020]'>
			<NavBar />
			<main className='max-w-360 mx-auto'>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route
						path={ROUTES.EDIT}
						element={
							isSignedIn ? <EditProduct /> : <Navigate to={ROUTES.HOME} />
						}
					/>
					<Route
						path={ROUTES.CREATE}
						element={
							isSignedIn ? <CreateNewProduct /> : <Navigate to={ROUTES.HOME} />
						}
					/>
					<Route
						path={ROUTES.PROFILE}
						element={isSignedIn ? <Profile /> : <Navigate to={ROUTES.HOME} />}
					/>
					<Route path={ROUTES.PRODUCT} element={<Product />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
