import Link from 'next/link';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FiMenu } from 'react-icons/fi';
import Mobile from './Mobile';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  function handleSignOut() {
    signOut({ callbackUrl: '/' });
  }

  const handleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#552583] py-4 mb-2 text-[#FDB927]">
      <div className="flex  justify-between items-center md:max-w-[80%] mx-auto">
        <div className="ml-4">
          <Link href="/">Recipe Haven</Link>
        </div>
        <div className="hidden md:flex">
          <ul className="flex list-[none] space-x-2">
            <li>
              <Link href="/recipes">All Recipes</Link>
            </li>
            {session && (
              <li>
                <Link href="/recipes/add">New Recipe</Link>
              </li>
            )}

            {!session ? (
              <div className="flex justify-between">
                <li className="ml-5">
                  <Link href="/login">Login</Link>
                </li>
                <li className="ml-5">
                  <Link href="/register">Register</Link>
                </li>
              </div>
            ) : (
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            )}
          </ul>
        </div>
        {/* Mobile open button */}
        <div className="md:hidden flex items-center pr-8">
          <button onClick={handleNav}>
            <FiMenu />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <Mobile
          session={session}
          handleSignOut={handleSignOut}
          handleNav={handleNav}
        />
      )}
    </nav>
  );
}
