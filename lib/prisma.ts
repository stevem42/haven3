import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  var prisma:
    | PrismaClient<
        Prisma.PrismaClientOptions,
        'info' | 'warn' | 'error' | 'query'
      >
    | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

prisma.$on('query', (e) => {
  console.log('Duration: ' + e.duration + 'ms');
});
