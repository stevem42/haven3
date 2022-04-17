import SingleRecipe from '../../components/SingleRecipe';
import { useEffect } from 'react';
import { getAllRecipes, getRecipeById } from '../../lib/dbUtil';
import { useRouter } from 'next/router';

export default function IndividualRecipe({ recipe, recipeId }) {
  // const refreshPage = () => {
  //   window.location.reload(true);
  // };

  const router = useRouter();

  // useEffect(() => {
  //   if (router.query.updated === 'true') {
  //     window.onload = () => {
  //       window.location.reload(true);
  //     };
  //   }
  // }, []);

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (router.query.updated === 'true') {
    router.push(`/recipes/${recipeId}`);
  }

  return (
    <>
      <SingleRecipe
        title={recipe.title}
        ingredients={recipe.ingredients}
        directions={recipe.directions}
        notes={recipe.notes}
        user_id={recipe.user_id}
        recipeId={recipe.id}
      />

      {/* <button onClick={refreshPage}>Refresh Data</button> */}
    </>
  );
}

export async function getStaticProps(context) {
  const recipeId = context.params.id;
  const recipe = await getRecipeById(recipeId);

  return {
    props: {
      recipe,
      recipeId,
    },
  };
}

export async function getStaticPaths() {
  const recipes = await getAllRecipes();

  const paths = recipes.map((recipe) => ({
    params: { id: recipe.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
