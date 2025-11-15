import { Search } from '../../components/Search';
import { getAllRecipes } from '../../lib/dbUtil';
import { GetStaticProps, NextPage } from 'next';
import { recipe } from '@prisma/client';
import { Course } from '../../components/Course';

interface CourseProps {
  recipes: recipe[] | undefined;
  course: string;
}

const course: NextPage<CourseProps> = ({ recipes, course }) => {
  return (
    <section>
      <h1 className="flex justify-center text-4xl mt-4 text-lakersPurple">
        {course}
      </h1>

      {recipes ? (
        <div className="flex-col justify-center">
          <Course recipes={recipes} course={course} />
        </div>
      ) : (
        <div>No {course} Recipes Fetched From The Server</div>
      )}
    </section>
  );
};

export default course;
