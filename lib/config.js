const dev = process.env.NODE_ENV !== 'production';

export const API_URL = dev
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_VERCEL_URL;
