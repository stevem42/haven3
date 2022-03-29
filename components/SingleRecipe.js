import React from 'react';
import parse from 'html-react-parser';

export default function SingleRecipe({
  title,
  ingredients,
  directions,
  notes,
}) {
  return (
    <div>
      <h1 className="flex justify-center font-bold text-4xl my-10">{title}</h1>
      <div className="flex">
        <div className="bg-white inline-block mx-8 p-5 border border-black">
          <h1 className="text-2xl">Ingredients</h1>
          <p className="my-4">{parse(ingredients)}</p>
        </div>
        <div className="px-2 block">
          <div className="bg-white border border-black p-5">
            <h1 className="text-2xl">Directions</h1>
            <p className="my-4">{parse(directions)}</p>
          </div>
        </div>
      </div>
      <div className="my-4 bg-white ml-8 p-5 border border-black">
        <h1 className="text-2xl">Notes:</h1>
        <p className="my-4">{parse(notes)}</p>
      </div>
      <div className="mx-8">
        <button className="px-6 bg-blue-600 mr-4">Edit</button>
        <button className="bg-red-600 px-6">Delete</button>
      </div>
    </div>
  );
}
