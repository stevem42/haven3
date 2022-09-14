import Head from 'next/head';
import AuthForm from '../components/auth/AuthForm';
import { getSession, useSession } from 'next-auth/react';
import Modal from 'react-modal';
import { useState } from 'react';
import { getSomeRecipes } from '../lib/dbUtil';
import Link from 'next/link';
Modal.setAppElement('#__next');

export default function Home({ recipes }) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'purple',
      borderRadius: '2',
    },
  };

  function openModal() {
    setModalOpen(true);
  }

  const openModal2 = () => {
    setModalOpen((prev) => !prev);
  };

  function closeModal() {
    setModalOpen(false);
  }

  function afterOpenModal() {}

  return (
    <div>
      <Head>
        <title>Recipe Haven 3</title>
        <meta name="description" content="Recipe Haven 3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="flex justify-center text-3xl text-lakersPurple">
          Welcome to Recipe Haven 3
        </h1>

        {!session && (
          <div className="h3 text-center mt-4">
            Login or Register To Create, Update and Delete Your Own Recipes
          </div>
        )}
        <div className="flex flex-col justify-center itmes-center w-full max-w-lg mx-auto">
          <h3 className="text-3xl text-center mt-8">Latest Recipes</h3>
          <div className="">
            {recipes.map((recipe) => (
              <div className="flex text-center" key={recipe.id}>
                <Link
                  href={`/recipes/${recipe.id.toString()}`}
                  prefetch={false}
                >
                  <a className="grow bg-white text-3xl block border-2 border-lakersPurple text-lakersPurple flex-col inline-block px-10 my-2 py-2 cursor-pointer">
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
