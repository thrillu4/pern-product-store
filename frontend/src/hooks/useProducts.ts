import { useMutation, useQuery } from '@tanstack/react-query'
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
} from '../lib/api'

export const useAllProducts = () => {
	return useQuery({ queryKey: ['products'], queryFn: getAllProducts })
}

export const useCreateProduct = () => {
	return useMutation({ mutationFn: createProduct })
}

export const useProduct = (id: string) => {
	return useQuery({
		queryKey: ['product', id],
		queryFn: () => getProductById(id),
		enabled: !!id,
	})
}

export const useDeleteProduct = () => {
	return useMutation({ mutationFn: deleteProduct })
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
