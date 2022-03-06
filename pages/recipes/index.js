import Link from 'next/link';
import { getAllRecipes } from '../../lib/dbUtil';

export default function allRecipes({ recipes }) {
  return (
    <div>
      <h1 className=" flex justify-center">All Recipes Page</h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${recipe.id.toString()}`}>
              <a>{recipe.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await getAllRecipes();

  return {
    props: {
      recipes: recipes,
      revalidate: 300,
    },
  };
}
