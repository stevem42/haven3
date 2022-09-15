import Head from 'next/head';

import { getSession, useSession } from 'next-auth/react';
import { getSomeRecipes } from '../lib/dbUtil';
import Link from 'next/link';

export default function Home({ recipes }) {
  const { data: session } = useSession();

  return (
    <div>
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
            {recipes.map((recipe) => (
              <div className="flex text-center" key={recipe.id}>
                <Link
                  href={`/recipes/${recipe.id.toString()}`}
                  prefetch={false}
                >
                  <a className="grow bg-white text-3xl border-2 border-lakersPurple text-lakersPurple flex-col inline-block px-10 my-2 py-2 cursor-pointer">
                    {recipe.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await getSomeRecipes();
  return {
    props: {
      recipes: recipes,
    },
    revalidate: 1,
  };
}
