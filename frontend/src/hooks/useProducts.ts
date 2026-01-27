import { useMutation, useQuery } from '@tanstack/react-query'
import { createProduct, getAllProducts } from '../lib/api'

export const useAllProducts = () => {
	return useQuery({ queryKey: ['products'], queryFn: getAllProducts })
}

export const useCreateProduct = () => {
	return useMutation({ mutationFn: createProduct })
}
