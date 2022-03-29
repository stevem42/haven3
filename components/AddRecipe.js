import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DirectionText from './Text/DirectionText';
import IngredientText from './Text/IngredientText';
import TipTap from './TipTap';
import TipTap2 from './TipTap2';
import parse from 'html-react-parser';

export default function AddRecipe() {
  const [ingredientText, setIngredientText] = useState('');
  const [directionText, setDirectionText] = useState('');
  const [values, setValues] = useState({
    title: '',
    ingredients: '',
    directions: '',
    notes: '',
  });

  function getValues() {
    return values;
  }

  function updateTextState(name, text) {
    setValues((prevState) => ({ ...prevState, [name]: text }));
    console.log('UPDATE-TEXT: ', values);
    console.log('NAME: ', name);
  }

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(typeof name);
    setValues({ ...values, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    //setValues({ ...values, ingredients: ingredientText });
    //setValues({ ...values, directions: directionText });

    const res = await fetch('http://localhost:3000/api/recipes/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    // const recipe = await res.json();
    // router.push(`/recipes/${recipe.id.toString()}`);
  }

  // useEffect(() => {
  //   console.log(ingredientText);
  //   console.log(directionText);
  //   console.log(values);
  // }, [ingredientText, directionText, values]);

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
          {/* <TipTap setDescription={setDescription} /> */}
          {/* <TipTap2 setText={setIngredientText} /> */}
          <IngredientText
            //setText={setIngredientText}
            updateText={updateTextState}
          />
          <h2 className="text-xl">Directions</h2>
          <DirectionText
            //setText={setDirectionText}
            updateText={updateTextState}
          />
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
      {console.log(values)}
      <section>Ingredients: {parse(values.ingredients)}</section>
      <section>Directions:{parse(values.directions)}</section>
    </>
  );
}
