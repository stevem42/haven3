import { useState } from 'react';
import DirectionText from './Text/DirectionText';
import IngredientText from './Text/IngredientText';

import parse from 'html-react-parser';
import { useRouter } from 'next/router';

export default function AddRecipe({ user }) {
  const router = useRouter();
  console.log(user);
  const [values, setValues] = useState({
    title: '',
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

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/recipes/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (res.status === 201) {
      const data = await res.json();
      router.push(`/recipes/${data.id.toString()}`);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl">Add A New Recipe</h1>
        <div className="w-80">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
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
          />
          <input
            type="submit"
            value="Add Recipe"
            className="bg-green-500 px-2"
          />
        </div>
      </form>
      <hr />
      <section>Ingredients: {parse(values.ingredients)}</section>
      <section>Directions:{parse(values.directions)}</section>
    </>
  );
}
