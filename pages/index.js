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
        <title>Create Next App</title>
        <meta name="description" content="Recipe Haven 3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="flex justify-center text-3xl text-lakersPurple">
          Recipe Haven 3
        </h1>

        {!session ? (
          <AuthForm />
        ) : (
          <div className="flex flex-col items-center">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <Link
                  href={`/recipes/${recipe.id.toString()}`}
                  prefetch={false}
                >
                  <a className="bg-white text-xl block border-2 border-lakersPurple text-lakersPurple flex-col inline-block px-10 my-2">
                    {recipe.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
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
