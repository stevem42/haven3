import Link from 'next/link';
import React from 'react';
import { Session } from 'next-auth';

interface MobileProps {
  session: Session | null;
  handleSignOut: () => void;
  handleNav: () => void;
}

const Mobile = ({ session, handleSignOut, handleNav }: MobileProps) => {
  return (
    <div>
      <ul className="list-[none] ml-4 py-2">
        <li className="block py-1 px-4 text-sm" onClick={handleNav}>
          <Link href="/">Home</Link>
        </li>
        <li className="block py-1 px-4 text-sm" onClick={handleNav}>
          <Link href="/recipes">All Recipes</Link>
        </li>
        {session && (
          <li className="block py-1 px-4 text-sm" onClick={handleNav}>
            <Link href="/recipes/add">New Recipe</Link>
          </li>
        )}

        {!session ? (
          <div>
            <li className="block py-1 px-4 text-sm" onClick={handleNav}>
              <Link href="/login">Login</Link>
            </li>
            <li className="block py-1 px-4 text-sm" onClick={handleNav}>
              <Link href="/register">Register</Link>
            </li>
          </div>
        ) : (
          <li className="block py-1 px-4 text-sm" onClick={handleNav}>
            <button onClick={handleSignOut}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Mobile;
