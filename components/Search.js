import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

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

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      <div className="flex justify-center items-center w-full">
        <input
          className="placeholder:text-center max-w-[75%] border focus:outline-none focus:border-lakersPurple rounded-md my-4 py-1 px-4"
          type="search"
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search for a recipe"
        />
        <i className="-ml-6">
          <FaSearch />
        </i>
      </div>
      {filtered && filtered.length > 0 ? (
        <div>
          {filtered.map((recipe) => (
            <div className="flex text-center" key={recipe.id}>
              <Link href={`/recipes/${recipe.id.toString()}`} prefetch={false}>
                <a className="grow bg-white text-3xl block border-2 border-lakersPurple text-lakersPurple flex-col inline-block px-10 my-2 py-2 cursor-pointer">
                  {recipe.title}
                </a>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 text-3xl text-lakersPurple">
          Sorry - No Recipes Found For That Term
        </div>
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
