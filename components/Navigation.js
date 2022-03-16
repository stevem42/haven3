import Link from 'next/link';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut({ callbackUrl: 'http://localhost:3000' });
  }
  return (
    <header className="bg-purple-400 py-4 mb-2">
      <nav className="flex justify-between mx-2 ">
        <div>
          <Link href="/">
            <a>Recipe Haven</a>
          </Link>
        </div>
        <div>
          <ul className="flex list-[none] space-x-2">
            <li>
              <Link href="/recipes">
                <a>All Recipes</a>
              </Link>
            </li>
            {!session ? (
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            ) : (
              <li>
                <button onClick={handleSignOut}>Logout</button>
                {/* <Link href="/logout">
                  <a onClick={handleSignOut}>Logout</a>
                </Link> */}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
