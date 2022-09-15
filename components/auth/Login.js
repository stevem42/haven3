import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function AuthForm(email, password) {
  const router = useRouter();

  useEffect(() => {
    router.query.ref === 'portfolio' && fillFields();
  }, [router.query.ref]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const fillFields = () => {
    emailInputRef.current.value = 'demouser@demo.com';
    passwordInputRef.current.value = 'Demouser123';
  };

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn('credentials', {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    console.log(result);
    if (!result.error) {
      router.replace('/recipes');
    }
  }

  return (
    <section className="flex items-center justify-center mt-24">
      <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg rounded-xl">
        <h2 className="pt-2 text-center text-xl text-lakersPurple">
          Sign In To Your Account
        </h2>

        <form onSubmit={submitHandler} className="py-5" autoComplete="none">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email:{' '}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                required
                ref={emailInputRef}
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
                required
                ref={passwordInputRef}
                autoComplete="new-password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex">
              <button
                onClick={submitHandler}
                className="w-full bg-lakersPurple text-lakersGold hover:bg-purple-800 font-bold mt-4 py-2 px-4 border border-lakersGold border-2 rounded"
              >
                Log In
              </button>
            </div>
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
