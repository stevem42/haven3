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
      <h1>{title}</h1>
      <p>{parse(ingredients)}</p>
      <p>{parse(directions)}</p>
      <p>{parse(notes)}</p>
    </div>
  );
}
