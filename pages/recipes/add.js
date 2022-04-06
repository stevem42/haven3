import { useSession, getSession } from 'next-auth/react';
import AddRecipe from '../../components/AddRecipe';

export default function AddRecipePage() {
  const { data: session } = useSession();
  console.log(session);
  const { user } = session;
  return <AddRecipe user={user} />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
