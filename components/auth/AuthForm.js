import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { signIn, signOut } from 'next-auth/react';

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

  const [isLogin, setisLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setisLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log(result);
      // if (!result.error) {
      //   router.replace('/recipes');
      // }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className="flex flex-col items-center">
      <h1 className="pt-5">Log in or create an account</h1>
      <form onSubmit={submitHandler} className="py-5">
        <div className="py-3">
          <label htmlFor="email">Your Email: </label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Your Password: </label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="flex py-5">
          <span className="px-10">
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          </span>
          <span>
            <button type="button" onClick={switchAuthModeHandler}>
              {isLogin ? 'Create New Account' : 'Log in With Existing Account'}
            </button>
          </span>
        </div>
      </form>
    </section>
  );
}
