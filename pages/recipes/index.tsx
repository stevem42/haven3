import Link from 'next/link';
import { Search } from '../../components/Search';
import { getAllRecipes } from '../../lib/dbUtil';
import { RecipeArray, isRecipeArray } from '../../lib/types';
import { FC } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { recipe } from '@prisma/client';

interface AllRecipesProps {
  recipes: recipe[] | undefined;
}

const allRecipes: NextPage<AllRecipesProps> = ({ recipes }) => {
  return (
    <section>
      <h1 className="flex justify-center text-4xl mt-4 text-lakersPurple">
        All Recipes
      </h1>

      {recipes ? (
        <div className="flex-col justify-center">
          <Search recipes={recipes} />
        </div>
      ) : (
        <div>No Recipes Fetched From The Server</div>
      )}
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getAllRecipes();

  return {
    props: {
      recipes: recipes,
    },
    revalidate: 1,
  };
};

export default allRecipes;
