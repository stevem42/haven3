import { useSession } from 'next-auth/react';
import React from 'react';
import EditRecipe from '../../../components/EditRecipe';
import { getRecipeById } from '../../../lib/dbUtil';
import { CreatedRecipeSchema } from '../../../components/auth/types';
import { GetServerSideProps } from 'next';

interface EditRecipeProps {
  recipe: CreatedRecipeSchema;
}

export default function EditRecipePage({ recipe }: EditRecipeProps) {
  const { data: session } = useSession();
  if (!session) {
    return <p>Must be logged in to view this page</p>;
  }
  if (!recipe) {
    return <div>No Recipe Found</div>;
  }
  return <EditRecipe recipe={recipe} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.query?.id as string;

  const recipe = await getRecipeById(parseInt(id));

  return {
    props: {
      recipe,
    },
  };
};
