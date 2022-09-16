import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from './Modal';
import { API_URL } from '../lib/config';
import Link from 'next/link';

export default function SingleRecipe({
  title,
  course,
  ingredients,
  directions,
  notes,
  user_id,
  recipeId,
}) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`${API_URL}/api//recipes/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId: recipeId, userId: user_id }),
    });
    const data = await res.json();
    console.log(data);
    router.push('/recipes');
  };

  const { data: session } = useSession();

  return (
    <div className="mx-auto text-lakersPurple">
      <h1 className="flex justify-center font-bold text-4xl my-10 text-lakersPurple">
        {title}
      </h1>
      <div className="m-auto grid lg:grid grid-cols-3 gap-8">
        <div className="col-span-3 lg:col-span-2 bg-white inline-block mx-8 px-5 py-5 border border-lakersPurple">
          <h1 className="text-2xl">Ingredients</h1>
          <div className="my-4 leading-7">{parse(ingredients)}</div>
        </div>
        <div className="px-2 col-span-3">
          <div className="bg-white border border-black mx-8 p-5">
            <h1 className="text-2xl">Directions</h1>
            <div className="m-4 leading-7">{parse(directions)}</div>
          </div>
        </div>
      </div>
      {notes && (
        <div className="mt-4 bg-white ml-8 p-5 border border-lakersPurple">
          <h1 className="text-2xl">Notes:</h1>
          <div className="my-4">{parse(notes)}</div>
        </div>
      )}

      {session && session.user.userId === user_id && (
        <div className="mx-8 mt-4">
          <Link href={`/recipes/edit/${recipeId.toString()}`}>
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
