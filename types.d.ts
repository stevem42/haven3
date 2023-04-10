import { PrismaClient } from '@prisma/client';

declare global {
  var prisma:
    | PrismaClient<
        Prisma.PrismaClientOptions,
        'info' | 'warn' | 'query' | 'error'
      >
    | undefined;
}
