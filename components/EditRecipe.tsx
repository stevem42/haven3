import { useRouter } from 'next/router';
import IngredientText from './Text/IngredientText';
import DirectionText from './Text/DirectionText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreatedRecipeSchema, RecipeSchema } from './auth/types';
import sanitizeHtml from 'sanitize-html';

interface EditRecipeProps {
  recipe: CreatedRecipeSchema;
}

export default function EditRecipe({ recipe }: EditRecipeProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: recipe.title,
      course: recipe.course,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      notes: recipe.notes ?? '',
      user_id: recipe.user_id,
    },
  });

  const onFormSubmit: SubmitHandler<RecipeSchema> = async (data) => {
    const body = {
      recipeId: recipe.id,
      data: sanitizeHtml(JSON.stringify(data)),
    };
    const res = await fetch(`/api/recipes/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      revalidate(recipe.id.toString());
      const result = await res.json();
      router.push(`/recipes/${result.id.toString()}`);
    } else {
      console.log('something went wrong edit recipe');
    }
  };

  const revalidate = async (id: string) => {
    const token = process.env.REVALIDATE_TOKEN;
    await fetch(`/api/revalidate?secret=${token}`, {
      method: 'POST',
      body: JSON.stringify(id),
    });
  };

  return (
    <>
      <h1 className="flex justify-center text-4xl mt-4 text-lakersPurple">
        Edit Your Recipe
      </h1>
      <div className="p-4">
        <form className="w-full" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="items-center py-2">
            <select
              {...register('course')}
              name="course"
              id="course"
              defaultValue={recipe.course}
              className="px-4 text-lakersGold bg-lakersPurple py-2"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="cocktails">Cocktails</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="uppercase text-md">
              Title
            </label>
            <div>
              <input
                className="w-[80%] border mt-1 py-1 border-lakersPurple"
                type="text"
                id="title"
                {...register('title')}
              />
            </div>
          </div>
          <div className="w-[80%] py-1 mt-8">
            <label className="uppercase text-md py-1 text-lakersPurple">
              Ingredients
            </label>

            <IngredientText
              updateText={setValue}
              content={recipe.ingredients}
            />
          </div>
          <div className="w-[80%] py-1 mt-8">
            <label className="uppercase text-md py-1 text-lakersPurple">
              Directions
            </label>
            <DirectionText updateText={setValue} content={recipe.directions} />
          </div>
          <div className="w-[80%] py-1 mt-8">
            <label className="uppercase text-md py-1 text-lakersPurple">
              Notes{' '}
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              className="my-2 w-full border mt-1 p-1 border-lakersPurple px-2"
            />
          </div>
          <button
            type="submit"
            className="block bg-lakersPurple text-lakersGold hover:bg-purple-800 font-bold py-2 px-4 border border-lakersGold rounded"
          >
            Edit Recipe
          </button>
        </form>
      </div>
    </>
  );
}
