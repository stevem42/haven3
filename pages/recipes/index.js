import Link from 'next/link';
import { Search } from '../../components/Search';
import { getAllRecipes } from '../../lib/dbUtil';

export default function allRecipes({ recipes }) {
  return (
    <div>
      <h1 className="flex justify-center text-4xl text-lakersPurple">
        All Recipes
      </h1>

      <div className="flex-col justify-center">
        <Search recipes={recipes} />
        {/* {recipes.map((recipe) => (
          <div key={recipe.id}>
            <Link href={`/recipes/${recipe.id.toString()}`} prefetch={false}>
              <a className="bg-white block border-2 border-black flex-col inline-block px-10 my-2">
                {recipe.title}
              </a>
            </Link>
          </div>
        ))} */}
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
