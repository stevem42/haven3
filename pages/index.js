import Head from 'next/head';
import AuthForm from '../components/auth/AuthForm';
import { getSession, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Recipe Haven 3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl text-blue-600">Recipe Haven 3 Home</h1>

        <AuthForm />
        {session ? `Signed is as ${session.user.email}` : 'nope'}
      </main>

      <footer></footer>
    </div>
  );
}
