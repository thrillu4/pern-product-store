import { useAuth, useUser } from '@clerk/clerk-react'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { syncUser } from '../lib/api'

export const useUserSync = () => {
	const { isSignedIn } = useAuth()
	const { user } = useUser()

	const { mutate, isPending, isSuccess } = useMutation({ mutationFn: syncUser })

	useEffect(() => {
		if (
			user &&
			user.primaryEmailAddress &&
			(user.fullName || user.firstName) &&
			!isPending &&
			isSignedIn &&
			!isSuccess
		) {
			mutate({
				email: user.primaryEmailAddress?.emailAddress,
				name: user.fullName || user.firstName || 'Missing Name',
				imageUrl: user.imageUrl,
			})
		}
	}, [isPending, isSuccess, user, mutate, isSignedIn])

	return { isSynced: isSuccess }
}
