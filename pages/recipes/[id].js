import SingleRecipe from '../../components/SingleRecipe';
import { useEffect } from 'react';
import { getAllRecipes, getRecipeById } from '../../lib/dbUtil';
import { useRouter } from 'next/router';

export default function IndividualRecipe({ recipe }) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.updated === 'true') {
      let timer1 = setTimeout(() => window.location.reload(true), 4000);
      console.log('timout run');
      return clearTimeout(timer1);
    }
  }, []);

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <SingleRecipe
      title={recipe.title}
      ingredients={recipe.ingredients}
      directions={recipe.directions}
      notes={recipe.notes}
      user_id={recipe.user_id}
      recipeId={recipe.id}
    />
  );
}

export async function getStaticProps(context) {
  const recipeId = context.params.id;
  const recipe = await getRecipeById(recipeId);

  return {
    props: {
      recipe,
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
