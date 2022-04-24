import { useState } from 'react';
import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from './Modal';
import { API_URL } from '../lib/config';
import IngredientText from './Text/IngredientText';
import DirectionText from './Text/DirectionText';

export default function EditRecipe({ recipe }) {
  const router = useRouter();

  const revalidate = async (id) => {
    await fetch(`${API_URL}/revalidate?secret=revalidate`, {
      method: 'POST',
      body: JSON.stringify(id),
    });
  };

  const [values, setValues] = useState({
    title: recipe.title,
    course: recipe.course,
    ingredients: recipe.ingredients,
    directions: recipe.directions,
    notes: recipe.notes,
    user_id: recipe.user_id,
    recipeId: recipe.id,
  });

  function updateTextState(name, text) {
    setValues((prevState) => ({ ...prevState, [name]: text }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault(); //

    try {
      const res = await fetch(`${API_URL}/recipes/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        revalidate(values.recipeId);
        const data = await res.json();
        setTimeout(() => {
          router.push(`/recipes/${data.id.toString()}?updated=true`);
        }, 2000);
      } else {
        console.log('something went wrong edit recipe');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl">Edit Your Recipe</h1>
        <div className="w-80 flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
          <select
            name="course"
            id="course"
            onChange={handleInputChange}
            defaultValue={recipe.course}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="drinks">Drinks</option>
            <option value="snacks">Snacks</option>
          </select>
          <h2 className="text-xl">Ingredients</h2>
          <IngredientText
            updateText={updateTextState}
            content={recipe.ingredients}
          />
          <h2 className="text-xl">Directions</h2>
          <DirectionText
            updateText={updateTextState}
            content={recipe.directions}
          />
          <textarea
            type="text"
            name="notes"
            id="notes"
            value={values.notes}
            onChange={handleInputChange}
            className="my-5"
          />
          <button
            type="submit"
            className="bg-purple-400 hover:bg-purple-600 font-bold py-2 px-4 border border-purple-600 rounded"
          >
            Edit Recipe
          </button>
        </div>
      </form>
      <hr />
      <section>Ingredients: {parse(values.ingredients)}</section>
      <section>Directions:{parse(values.directions)}</section>
    </>
  );
}
