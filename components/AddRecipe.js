import { useState } from 'react';
import DirectionText from './Text/DirectionText';
import IngredientText from './Text/IngredientText';
import { FiMenu, FiList } from 'react-icons/fi';
import { BiListUI } from 'react-icons/bi';

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
      <h1 className="flex justify-center text-4xl mt-4 text-lakersPurple">
        Add A New Recipe
      </h1>
      <div className="p-4">
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <div className="items-center py-2">
              <select
                name="course"
                id="course"
                onChange={handleInputChange}
                defaultValue={'DEFAULT'}
                className="px-4 text-lakersGold bg-lakersPurple py-2"
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
            <div className="flex flex-col ">
              <label
                htmlFor="title"
                className="uppercase text-md  text-lakersPurple"
              >
                Title
              </label>
              <div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleInputChange}
                  className="w-[80%] border mt-1 py-1 border-lakersPurple"
                />
              </div>
            </div>
            <div className="w-[80%] py-1 mt-8">
              <label className="uppercase text-md py-1 text-lakersPurple">
                Ingredients
              </label>
              <IngredientText updateText={updateTextState} />
            </div>
            <div className="w-[80%] py-1 mt-8">
              <label className="uppercase text-md py-1 text-lakersPurple">
                Directions
              </label>
              <DirectionText updateText={updateTextState} />
            </div>
            <div className="w-[80%] py-1 mt-8">
              <label className="uppercase text-md py-1 text-lakersPurple">
                Notes{' '}
              </label>
              <textarea
                type="text"
                name="notes"
                id="notes"
                value={values.notes}
                onChange={handleInputChange}
                placeholder="Enter any Notes or Recipe Link here"
                className="my-2 w-full border mt-1 p-1 border-lakersPurple"
              />
            </div>
            <button
              type="submit"
              className="block bg-lakersPurple text-lakersGold hover:bg-purple-800 font-bold py-2 px-4 border border-lakersGold rounded"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
