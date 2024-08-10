'use client';

import { useSession } from 'next-auth/react';

export default function Profile(){
	const session = useSession();
	return <div>
		From client:
		{session.data ? JSON.stringify(session.data.user) : 'user not signed in'}
	</div>
}