import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Show, UserButton } from '@clerk/nextjs';

function Header() {
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Link href="/" aria-label="Expense Tracker home">
        <Image
          src={'/logo.svg'}
          alt='Expense Tracker'
          width={160}
          height={100}
          className='h-10 w-auto'
        />
      </Link>
      <Show when="signed-out">
        <nav className="flex items-center gap-3" aria-label="Account">
          <Link
            href="/sign-in"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </nav>
      </Show>
      <Show when="signed-in">
        <nav className="flex items-center gap-4" aria-label="Account">
          <Link href="/dashboard" className="text-sm font-medium hover:text-indigo-600">
            Dashboard
          </Link>
          <UserButton />
        </nav>
      </Show>
    </div>
  );
}

export default Header;