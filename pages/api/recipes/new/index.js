import prisma from '../../../../lib/prisma';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, ingredients, directions, notes, user_id, course } = req.body;

    const date = new Date();

    const recipe = await prisma.recipe.create({
      data: {
        course,
        title: title,
        date_posted: date,
        ingredients,
        directions,
        notes,
        user_id,
      },
    });
    console.log(recipe);

    res.status(201).json({ message: 'messaggge', id: recipe.id });
  }
}

export default handler;

// model recipe {
//   id           Int      @id @default(autoincrement())
//   course       String   @db.VarChar(9)
//   title        String   @db.VarChar(100)
//   date_posted  DateTime @db.Timestamp(6)
//   ingredients  String
//   directions   String
//   notes        String?
//   recipe_image String?  @db.VarChar(60)
//   user_id      Int
//   user         user     @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
// }
