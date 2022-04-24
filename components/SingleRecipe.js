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
    const res = await fetch(`${API_URL}/recipes/delete`, {
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
    <div>
      <h1 className="flex justify-center font-bold text-4xl my-10">{title}</h1>
      <h3>Course: {course}</h3>
      <div className="flex">
        <div className="bg-white inline-block mx-8 p-5 border border-black">
          <h1 className="text-2xl">Ingredients</h1>
          <div className="my-4">{parse(ingredients)}</div>
        </div>
        <div className="px-2 block">
          <div className="bg-white border border-black p-5">
            <h1 className="text-2xl">Directions</h1>
            <div className="my-4">{parse(directions)}</div>
          </div>
        </div>
      </div>
      <div className="my-4 bg-white ml-8 p-5 border border-black">
        <h1 className="text-2xl">Notes:</h1>
        <div className="my-4">{parse(notes)}</div>
      </div>

      {session && session.user.userId === user_id && (
        <div className="mx-8">
          <Link href={`/recipes/edit/${recipeId.toString()}`}>
            <a className="px-4 bg-blue-600 hover:bg-blue-800 mr-4 font-bold py-2 border border-blue 800 rounded">
              Edit
            </a>
          </Link>
          <button
            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 border border-red-700 rounded"
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
