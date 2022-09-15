import Link from 'next/link';
import React, { useRef } from 'react';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something Weeeent Wrong');
  }

  return data;
}

export default function AuthForm(email, password) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex items-center justify-center mt-24">
      <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg rounded-xl">
        <h2 className="pt-2 text-center text-xl text-lakersPurple">
          Register For an Account
        </h2>

        <form onSubmit={submitHandler} className="py-5">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email:{' '}
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter An Email"
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
                placeholder="Enter A Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex">
              <button
                onClick={submitHandler}
                className="w-full bg-lakersPurple text-lakersGold hover:bg-purple-800 font-bold mt-4 py-2 px-4 border border-lakersGold border-2 rounded"
              >
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
