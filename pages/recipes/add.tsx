import { useSession } from 'next-auth/react';
import AddRecipe from '../../components/AddRecipe';

export default function AddRecipePage() {
  const { data: session } = useSession();
  if (!session) {
    return <p>Must be logged in to view this page</p>;
  }
  const user = session?.user;

  return <AddRecipe user={user} />;
}
