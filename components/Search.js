import Link from 'next/link';
import { useState, useEffect } from 'react';

export const Search = ({ recipes }) => {
  const [term, setTerm] = useState('');

  const [filtered, setFiltered] = useState(recipes);

  const isResults = term.length > 2;

  function handleChange(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log(searchTerm);
    if (searchTerm !== '') {
      let results = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchTerm);
      });
      setFiltered(results);
      console.log(filtered);
    } else {
      setFiltered(recipes);
    }
    setTerm(searchTerm);
  }

  // const filtered = recipes.filter((recipe) => {
  //   return recipe.title.includes(term);
  // });

  // return (
  //   <div>
  //     <input type="text" onChange={handleChange} />
  //     {filtered.map((search) => (
  //       <p key={search}>{search}</p>
  //     ))}
  //   </div>
  // );

  return (
    <div className="flex flex-col justify-center items-center">
      <input className="max-w-[50%]" type="search" onChange={handleChange} />
      {filtered && filtered.length > 0 ? (
        <div>
          {filtered.map((recipe) => (
            <div key={recipe.id}>
              <Link href={`/recipes/${recipe.id.toString()}`} prefetch={false}>
                <a className="bg-white block border-2 border-black flex-col inline-block px-10 my-2">
                  {recipe.title}
                </a>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>naghh</div>
      )}
    </div>
  );

  // return (
  //   <div className="flex flex-col justify-center items-center">
  //     <input className="max-w-[50%]" type="text" onChange={handleChange} />

  //     {filteredRecipes != 0 && isResults && console.log('is results')}
  //     <div className={`${isResults ? 'border border-black bg-white p-4' : ''}`}>
  //       {isResults &&
  //         recipes
  //           .filter((recipe) => recipe.title.toLowerCase().includes(term))
  //           .map((recipe) => (
  //             <div key={recipe.id}>
  //               <Link href={`/recipes/${recipe.id.toString()}`}>
  //                 <a>{recipe.title}</a>
  //               </Link>
  //             </div>
  //           ))}
  //     </div>
  //   </div>
  // );
  // return (
  //   <div className="flex flex-col justify-center items-center">
  //     <input className="max-w-[50%]" type="text" onChange={handleChange} />
  //     <div className={`${isResults ? 'border border-black bg-white p-4' : ''}`}>
  //       {isResults &&
  //         recipes
  //           .filter((recipe) => recipe.title.toLowerCase().includes(term))
  //           .map((recipe) => (
  //             <div key={recipe.id}>
  //               <Link href={`/recipes/${recipe.id.toString()}`}>
  //                 <a>{recipe.title}</a>
  //               </Link>
  //             </div>
  //           ))}
  //     </div>
  //   </div>
  // );
};
