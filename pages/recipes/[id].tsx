import SingleRecipe from '../../components/SingleRecipe';
import { getAllRecipes, getRecipeById } from '../../lib/dbUtil';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { GetStaticProps } from 'next';
import { CreatedRecipeSchema } from '../../components/auth/types';

interface IndividualRecipeProps {
  recipe: CreatedRecipeSchema;
}

export default function IndividualRecipe({ recipe }: IndividualRecipeProps) {
  const router = useRouter();
  const { data: session } = useSession();

  if (!recipe) {
    return <p>Recipe Not Found</p>;
  }

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SingleRecipe
        title={recipe.title}
        ingredients={recipe.ingredients}
        directions={recipe.directions}
        notes={recipe.notes}
        user_id={recipe.user_id}
        id={recipe.id}
        course={recipe.course}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const recipeId = context?.params?.id as string;
  const recipe = await getRecipeById(parseInt(recipeId.replace(/"/g, ''), 10));

  return {
    props: {
      recipe,
      recipeId,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const recipes = await getAllRecipes();

  const paths = recipes?.map((recipe) => ({
    params: { id: recipe.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
