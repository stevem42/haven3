import DirectionText from './Text/DirectionText';
import IngredientText from './Text/IngredientText';
import { RecipeSchema } from './auth/types';
import sanitizeHtml from 'sanitize-html';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddRecipeProps {
  user: {
    id: string;
  };
}

export default function AddRecipe({ user }: AddRecipeProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, dirtyFields, errors },
  } = useForm({
    defaultValues: {
      title: '',
      course: '',
      ingredients: '',
      directions: '',
      notes: '',
      user_id: user.id,
    },
  });

  const onFormSubmit: SubmitHandler<RecipeSchema> = async (data) => {
    const res = await fetch(`/api/recipes/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: sanitizeHtml(JSON.stringify(data)),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/recipes/${data.id.toString()}`);
    } else {
      console.log('something went wrong add rec');
    }
  };

  return (
    <>
      <h1 className="flex justify-center text-4xl mt-4 text-lakersPurple">
        Add A New Recipe
      </h1>
      <div className="p-4">
        <form className="w-full" onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <div className="items-center py-2">
              <select
                {...register('course')}
                name="course"
                id="course"
                className="px-4 text-lakersGold bg-lakersPurple py-2"
              >
                <option value="" disabled>
                  Choose a Course
                </option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="cocktails">Cocktails</option>
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
                  {...register('title')}
                  className="w-[80%] border mt-1 py-1 border-lakersPurple"
                />
              </div>
            </div>
            <div className="w-[80%] py-1 mt-8">
              <label className="uppercase text-md py-1 text-lakersPurple">
                Ingredients
              </label>
              <IngredientText updateText={setValue} content="" />
            </div>
            <div className="w-[80%] py-1 mt-8">
              <label className="uppercase text-md py-1 text-lakersPurple">
                Directions
              </label>
              <DirectionText updateText={setValue} content="" />
            </div>
            <div className="w-[80%] py-1 mt-8">
              <label className="uppercase text-md py-1 text-lakersPurple">
                Notes{' '}
              </label>
              <textarea
                id="notes"
                {...register('notes')}
                placeholder="Enter any Notes or Recipe Link here"
                className="my-2 w-full border mt-1 p-1 border-lakersPurple px-2"
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
