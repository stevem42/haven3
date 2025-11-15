import { Search } from '../../components/Search';
import { getAllRecipes } from '../../lib/dbUtil';
import { GetStaticProps, NextPage } from 'next';
import { recipe } from '@prisma/client';
import Link from 'next/link';

interface AllRecipesProps {
  recipes: recipe[] | undefined;
}

const allRecipes: NextPage<AllRecipesProps> = ({ recipes }) => {
  return (
    <section>
      <Link
        href={'/recipes/course'}
        className="inline-block bg-lakersPurple text-2xl border-2 border-lakersGold text-lakersGold px-10 my-2 py-2 cursor-pointer"
      >
        Cocktails
      </Link>
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
