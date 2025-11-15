import { recipe } from '@prisma/client';
import Link from 'next/link';
import { MouseEventHandler, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Create a serialized version of recipe where Date objects are strings
type SerializedRecipe = Omit<recipe, 'date_posted'> & {
  date_posted: string;
};

interface SeachProps {
  recipes: SerializedRecipe[];
}

export const Search = ({ recipes }: SeachProps) => {
  const [filtered, setFiltered] = useState<SerializedRecipe[]>(recipes);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('term', searchTerm);
    console.log('course', selectedCourse);
  }, [filtered, searchTerm]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value.toLowerCase();

    if (term !== '') {
      // let results = recipes.filter((recipe) => {
      //   return (
      //     recipe.course == selectedCourse &&
      //     recipe.title.toLowerCase().includes(searchTerm)
      //   );
      // });
      // } else if (selectedCourse !== '') {
      //   let filteredCourses = recipes.filter((recipe) => {
      //     return recipe.course == selectedCourse;
      //   });
      //   console.log(selectedCourse);
      //   setFiltered(filteredCourses);
      //   console.log(filteredCourses);
      // } else {
      //   setFiltered(recipes);
    }
    setSearchTerm(term);
    handleFilter();
  }

  function handleFilter() {
    let filteredHandle: SerializedRecipe[] = [];
    if (selectedCourse && searchTerm) {
      filteredHandle = recipes.filter((recipe) => {
        return (
          recipe.course === selectedCourse &&
          recipe.title.toLowerCase().includes(searchTerm)
        );
      });
    } else if (selectedCourse) {
      filteredHandle = recipes.filter(
        (recipe) => recipe.course === selectedCourse
      );
    } else if (searchTerm) {
      filteredHandle = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm)
      );
    } else filteredHandle = recipes;
    setFiltered(filteredHandle);
  }

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.course === selectedCourse;
  });

  // const filteredData = recipes.filter((recipe) => {
  //   return searchTerm
  //     ? recipe.title.toLowerCase().includes(searchTerm)
  //     : true && selectedCourse
  //     ? recipe.course == selectedCourse
  //     : true;
  // });

  // function handleCourseSelect(e: React.MouseEvent<HTMLButtonElement>) {
  //   const courses = recipes.filter(
  //     (recipe) => recipe.course === e.currentTarget.innerText
  //   );
  //   setFiltered(courses);
  // }

  function handleCourseSelect(e: React.MouseEvent<HTMLButtonElement>) {
    if (selectedCourse !== '') {
      setSelectedCourse('');
    } else {
      setSelectedCourse(e.currentTarget.innerText);
    }
    console.log('B4', filtered);
    handleFilter();
    console.log(selectedCourse);
    console.log('After', filtered);
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
      <div>
        {/* 
        // temporarily removing this to push the ts changes to prod
        <button
          onClick={handleCourseSelect}
          className="inline-block bg-lakersPurple text-2xl border-2 border-lakersGold text-lakersGold px-10 my-2 py-2 cursor-pointer"
        >
          dinner
        </button> */}
      </div>
      {filtered && filtered.length > 0 ? (
        <div>
          {filtered.map((recipe) => (
            <div className="flex text-center" key={recipe.id}>
              <Link
                href={`/recipes/${recipe.id.toString()}`}
                prefetch={false}
                className="grow bg-white text-3xl block border-2 border-lakersPurple text-lakersPurple flex-col px-10 my-2 py-2 cursor-pointer"
              >
                {recipe.title}
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
