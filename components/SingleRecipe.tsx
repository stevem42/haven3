import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from './Modal';
import { API_URL } from '../lib/config';
import Link from 'next/link';

import { CreatedRecipeSchema } from './auth/types';

export default function SingleRecipe({
  title,
  ingredients,
  directions,
  notes,
  user_id,
  id,
}: CreatedRecipeSchema) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/recipes/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId: id, userId: user_id }),
    });
    const data = await res.json();
    router.push('/recipes');
  };

  const { data: session } = useSession();

  return (
    <div className="mx-auto text-lakersPurple">
      <h1 className="flex justify-center text-center font-bold text-4xl my-10 text-lakersPurple">
        {title}
      </h1>
      <div className="m-auto grid grid-cols-3 gap-6 auto-rows-auto">
        <div className="col-span-3 lg:col-span-1 bg-white inline-block px-0 border border-lakersPurple">
          <h2 className="text-3xl text-center bg-lakersPurple text-lakersGold py-4">
            Ingredients
          </h2>
          <div className="my-4 leading-9 text-xl ml-10">
            {parse(ingredients)}
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <div className="bg-white border border-black mx-0 p-0">
            <h2 className="text-3xl text-center bg-lakersPurple text-lakersGold py-4">
              Directions
            </h2>
            <div className="m-4 leading-8 ml-10 text-xl">
              {parse(directions)}
            </div>
          </div>
        </div>
      </div>
      {notes && (
        <div className="my-4 bg-white p-5 border border-lakersPurple">
          <h1 className="text-2xl">Notes:</h1>
          <p className="my-4 break-words">{parse(notes)}</p>
        </div>
      )}

      {session && session.user.id === user_id && (
        <div className="mx-8 my-4">
          <Link href={`/recipes/edit/${id?.toString()}`}>
            <a className="px-4 bg-lakersGold text-lakersPurple hover:bg-yellow-300 mr-4 font-bold py-2.5 border border-lakersPurple rounded">
              Edit
            </a>
          </Link>
          <button
            className="bg-lakersPurple text-lakersGold hover:bg-purple-600 font-bold py-2 px-4 border border-lakersGold rounded"
            onClick={openModal}
          >
            Delete
          </button>
          <Modal
            showModal={showModal}
            setShowModal={openModal}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
