import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from './types';

export default function Login() {
  const [portfolio, setPortfolio] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  useEffect(() => {
    if (router.query?.ref === 'portfolio') {
      setPortfolio(true);
      reset({
        email: 'demouser@demo.com',
        password: 'Demouser123',
      });
    }
  }, [router.query.ref, portfolio, reset]);

  const onFormSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError('root.random', {
        type: 'serverSide',
        message: result.error,
      });
    } else {
      router.push('/');
    }
  };

  return (
    <section className="flex items-center justify-center mt-24">
      <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg rounded-xl">
        <h2 className="pt-2 text-center text-xl text-lakersPurple">
          Sign In To Your Account
        </h2>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="py-5"
          autoComplete="none"
        >
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email:{' '}
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                {...register('email')}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${}"
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password:{' '}
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="Enter Your Password"
                {...register('password')}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex">
              <button className="w-full bg-lakersPurple text-lakersGold hover:bg-purple-800 font-bold mt-4 py-2 px-4 border-lakersGold border-2 rounded">
                Log In
              </button>
            </div>
            {errors.root?.random && (
              <div className="border-red-600 border-4 text-center font-bold mt-5">{`${errors.root.random.message}`}</div>
            )}
            <div className="mt-6 text-grey-dark">
              Dont have an account?
              <Link href="/register">
                <a className="text-lakersPurple hover:underline ml-4">
                  Register
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
