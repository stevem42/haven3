import { recipe } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SeachProps {
  recipes: recipe[];
}

export const Search = ({ recipes }: SeachProps) => {
  const [filtered, setFiltered] = useState(recipes);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm !== '') {
      let results = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm)
      );
      setFiltered(results);
    } else {
      setFiltered(recipes);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center w-full">
        <input
          className="placeholder:text-center max-w-[75%] border focus:outline-none focus:border-lakersPurple rounded-md my-4 py-1 px-4"
          type="search"
          autoFocus
          onChange={handleChange}
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
                <a className="grow bg-white text-3xl block border-2 border-lakersPurple text-lakersPurple flex-col px-10 my-2 py-2 cursor-pointer">
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
};
