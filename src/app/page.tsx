import { Button } from '@nextui-org/react';
import * as authActions from '@/actions/auth.actions';
import { auth } from '@/auth';
import Profile from '@/components/Profile';

export default async function Home() {
  const session = await auth();
  return (
    <>
      <form action={authActions.signIn}>
        <Button type='submit'>
          Sign In
        </Button>
      </form>

      <form action={authActions.singOut}>
        <Button type='submit'>
          Sign Out
        </Button>
      </form>

      <div>
        From Server:
        {session ? JSON.stringify(session.user) : 'not signed in'}
      </div>

      <Profile />
    </>
  );
}
