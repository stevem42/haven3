import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NOVE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
  prisma.$on('query', (e) => {
    console.log('Duration: ' + e.duration + 'ms');
  });
}

export default prisma;
