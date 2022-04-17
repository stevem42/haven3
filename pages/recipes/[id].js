import SingleRecipe from '../../components/SingleRecipe';
import { getAllRecipes, getRecipeById } from '../../lib/dbUtil';
import { useRouter } from 'next/router';

export default function IndividualRecipe({ recipe }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  router.reload();

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
