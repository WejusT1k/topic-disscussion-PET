import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Github from 'next-auth/providers/github';
import { db } from './db';


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if(!GITHUB_CLIENT_ID){
	throw new Error('GITHUB_CLIENT_ID env variable is missing')
}

if(!GITHUB_CLIENT_SECRET){
	throw new Error('GITHUB_CLIENT_SECRET env variable is missing')
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Github({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		})
	],
	callbacks: {
		session: async ({session, user} : any) => {
			if(session && user){
				session.user.id = user.id
			}
			return session;
		}
	}
})