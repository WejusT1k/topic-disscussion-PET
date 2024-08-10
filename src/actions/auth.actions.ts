'use server';

import * as auth from '@/auth';

export const signIn = async () => {
	return auth.signIn('github')
}

export const singOut = async () => {
	return auth.signOut()
}

