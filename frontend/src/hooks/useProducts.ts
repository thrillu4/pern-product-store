import {
	useMutation,
	useQuery,
	useQueryClient,
	type UseQueryResult,
} from '@tanstack/react-query'
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getMyProducts,
	getProductById,
} from '../lib/api'
import type { IProduct } from '../types'

export const useAllProducts = () => {
	return useQuery({ queryKey: ['products'], queryFn: getAllProducts })
}

export const useCreateProduct = () => {
	return useMutation({ mutationFn: createProduct })
}

export const useMyProducts = (): UseQueryResult<IProduct[]> => {
	return useQuery({ queryKey: ['myProducts'], queryFn: getMyProducts })
}

export const useProduct = (
	id: string,
): UseQueryResult<IProduct & { userId: string }> => {
	return useQuery({
		queryKey: ['product', id],
		queryFn: () => getProductById(id),
		enabled: !!id,
	})
}

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['myProducts'] }),
	})
}

// export const useUpdateProduct = ({
// 	id,
// 	data,
// }: {
// 	id: string
// 	data: IProductData
// }) => {
// 	return useMutation({ mutationFn: () => updateProduct({ id, data }) })
// }
