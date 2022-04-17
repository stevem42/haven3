import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import EditRecipe from '../../../components/EditRecipe';
import { getRecipeById } from '../../../lib/dbUtil';

export default function EditRecipePage({ recipe }) {
  if (!recipe) {
    return <div>No Recipe</div>;
  }
  return <EditRecipe recipe={recipe} />;
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);
  console.log(session);
  const { userId } = session.user;

  const recipe = await getRecipeById(id);
  console.log(recipe.user_id);
  console.log(userId);

  if (!session || recipe.user_id != +userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipe,
    },
  };
}
