import type { IProductData, IUserData } from '../types'
import { ENDPOINTS } from '../utils/end-points'
import { api } from './axios'

export const syncUser = async (userData: IUserData) => {
	const { data } = await api.post(ENDPOINTS.SYNC_USER, userData)
	return data
}

export const getAllProducts = async () => {
	const { data } = await api.get(ENDPOINTS.GET_ALL_PRODUCTS)
	return data
}

export const getProductById = async (id: string) => {
	const { data } = await api.get(`${ENDPOINTS.GET_PRODUCT}${id}`)
	return data
}

export const getMyProducts = async () => {
	const { data } = await api.get(ENDPOINTS.GET_MY_PRODUCTS)
	return data
}

export const createProduct = async (productData: IProductData) => {
	const { data } = await api.post(ENDPOINTS.CREATE_PRODUCT, productData)
	return data
}

export const updateProduct = async ({
	id,
	...productData
}: {
	id: string
	productData: IProductData
}) => {
	const { data } = await api.post(
		`${ENDPOINTS.UPDATE_PRODUCT}${id}`,
		productData,
	)
	return data
}

export const deleteProduct = async (id: string) => {
	const { data } = await api.delete(`${ENDPOINTS.DELETE_PRODUCT}${id}`)
	return data
}

export const createComment = async ({
	productId,
	content,
}: {
	productId: string
	content: string
}) => {
	const { data } = await api.post(`${ENDPOINTS.CREATE_COMMENT}${productId}`, {
		content,
	})
	return data
}

export const deleteComment = async (commentId: string) => {
	const { data } = await api.post(`${ENDPOINTS.DELETE_COMMENT}${commentId}`)
	return data
}
