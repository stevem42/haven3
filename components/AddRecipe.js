import { useState } from 'react';
import DirectionText from './Text/DirectionText';
import IngredientText from './Text/IngredientText';

import parse from 'html-react-parser';
import { useRouter } from 'next/router';

import { API_URL } from '../lib/config';

export default function AddRecipe({ user }) {
  const router = useRouter();
  console.log(user);
  const [values, setValues] = useState({
    title: '',
    course: '',
    ingredients: '',
    directions: '',
    notes: '',
    user_id: user.userId,
  });

  function updateTextState(name, text) {
    setValues((prevState) => ({ ...prevState, [name]: text }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCourseChange = (e) => {
    const course = e.target.value;
    setValues({ ...values, course: course });
  };

  async function handleSubmit(e) {
    e.preventDefault(); //

    try {
      const res = await fetch(`${API_URL}/api/recipes/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/recipes/${data.id.toString()}`);
      } else {
        console.log('something went wrong add rec');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-center text-lakersPurple text-2xl">
        Add A New Recipe
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <div>
            <label htmlFor="title">Title: </label>
          </div>
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="items-center">
          <select
            name="course"
            id="course"
            onChange={handleInputChange}
            defaultValue={'DEFAULT'}
          >
            <option value="DEFAULT" disabled>
              Choose a Course
            </option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="drinks">Drinks</option>
            <option value="snacks">Snacks</option>
          </select>
        </div>
        <h2 className="text-xl">Ingredients</h2>
        <IngredientText updateText={updateTextState} />
        <h2 className="text-xl">Directions</h2>
        <DirectionText updateText={updateTextState} />
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
          className="block bg-lakersPurple text-lakersGold hover:bg-purple-800 font-bold py-2 px-4 border border-lakersGold border-2 rounded"
        >
          Add Recipe
        </button>
        <hr />
      </form>
    </>
  );
}
