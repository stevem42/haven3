import Link from 'next/link';
import { getAllRecipes } from '../../lib/dbUtil';

export default function allRecipes({ recipes }) {
  return (
    <div>
      <h1 className="flex justify-center text-3xl">All Recipes Page</h1>

      {/* <ul className="list-[none]">
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className="bg-white inline-block border-2 border-black"
          >
            <Link href={`/recipes/${recipe.id.toString()}`}>
              <a>{recipe.title}</a>
            </Link>
          </li>
        ))}
      </ul> */}

      <div className="flex-col">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <Link href={`/recipes/${recipe.id.toString()}`} prefetch={false}>
              <a className="bg-white block border-2 border-black flex-col inline-block px-10 my-2">
                {recipe.title}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await getAllRecipes();

  return {
    props: {
      recipes: recipes,
    },
    revalidate: 1,
  };
}
