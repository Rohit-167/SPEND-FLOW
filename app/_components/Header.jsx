import Link from 'next/link'
import { ArrowUpRight, Wallet } from 'lucide-react'

function Header() {
  return (
    <header className='border-b border-slate-200/80 bg-white/90 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
      <Link href='/' aria-label='SpendFlow home' className='flex items-center gap-2.5'>
        <span className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20'>
          <Wallet size={21} strokeWidth={2.3} aria-hidden='true' />
        </span>
        <span className='text-xl font-bold tracking-tight text-slate-900'>
          Spend<span className='text-emerald-600'>Flow</span>
        </span>
      </Link>
        <nav className='flex items-center gap-3' aria-label='Account'>
          <Link
            href='/sign-in'
            className='rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900'
          >
            Sign In
          </Link>
          <Link
            href='/sign-in'
            className='inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          >
            Get Started
            <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header