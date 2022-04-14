import SingleRecipe from '../../components/SingleRecipe';
import { getAllRecipes, getRecipeById } from '../../lib/dbUtil';

export default function individualRecipe({ recipe }) {
  console.log('RECIPE', recipe);
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
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const recipes = await getAllRecipes();

  const paths = recipes.map((recipe) => ({
    params: { id: recipe.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
