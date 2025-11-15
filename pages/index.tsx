import Head from 'next/head';

import { useSession } from 'next-auth/react';
import { getSomeRecipes } from '../lib/dbUtil';
import Link from 'next/link';
import { recipe } from '@prisma/client';

// Create a serialized version of recipe where Date objects are strings
type SerializedRecipe = Omit<recipe, 'date_posted'> & {
  date_posted: string;
};

interface HomePageProps {
  recipes: SerializedRecipe[] | undefined;
}

export default function Home({ recipes }: HomePageProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Recipe Haven v3</title>
        <meta name="description" content="Recipe Haven 3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="flex justify-center text-center text-3xl text-lakersPurple mt-4">
          Welcome to Recipe Haven
        </h1>

        {!session && (
          <div className="text-center">
            <h3 className="inline-block p-2 mt-4 text-lakersPurple border border-lakersPurple">
              Login or Register To Create, Update and Delete Your Own Recipes
            </h3>
          </div>
        )}
        <div className="flex flex-col justify-center itmes-center w-full max-w-lg mx-auto">
          <h3 className="text-3xl text-center mt-8 text-lakersPurple">
            Latest Recipes
          </h3>
          <div className="">
            {recipes?.map((recipe) => (
              <div
                className="flex text-center grow bg-white text-3xl border-2 border-lakersPurple text-lakersPurple flex-col px-10 my-2 py-2 cursor-pointer"
                key={recipe.id}
              >
                <Link
                  href={`/recipes/${recipe.id.toString()}`}
                  prefetch={false}
                >
                  {recipe.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}

export async function getStaticProps() {
  const recipes = await getSomeRecipes();

  // Serialize Date objects in all recipes
  const serializedRecipes: SerializedRecipe[] =
    recipes?.map((recipe: recipe) => ({
      ...recipe,
      date_posted: recipe.date_posted.toISOString(),
    })) ?? [];

  return {
    props: {
      recipes: serializedRecipes,
    },
    revalidate: 1,
  };
}
