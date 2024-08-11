'use server';

import { signIn as authSignIn } from '@/auth';

export const signIn = async () => {
	return authSignIn('github')
}

