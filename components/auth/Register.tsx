import Link from 'next/link';
import React, { useRef } from 'react';
import { createUser } from '../../lib/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormSchema } from './types';

// email: 'demouser@demo.com',
// password: 'Demouser123',

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onFormSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    const result = await createUser(data.email, data.password);
    console.log(result);
  };

  return (
    <section className="flex items-center justify-center mt-24">
      <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg rounded-xl">
        <h2 className="pt-2 text-center text-xl text-lakersPurple">
          Register For an Account
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="py-5">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email:{' '}
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter An Email"
                {...register('email')}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password:{' '}
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="Enter A Password"
                {...register('password')}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">
                Confirm Password:{' '}
              </label>
              <input
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                {...register('confirmPassword')}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.confirmPassword && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <div className="flex">
              <button className="w-full bg-lakersPurple text-lakersGold hover:bg-purple-800 font-bold mt-4 py-2 px-4 border border-lakersGold border-2 rounded">
                Create Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Already have an account?
              <Link href="/login">
                <a className="text-lakersPurple hover:underline ml-4">Log In</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
