import Link from 'next/link';
import React from 'react';

export default function Navigation() {
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
                <a>Recipes</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
