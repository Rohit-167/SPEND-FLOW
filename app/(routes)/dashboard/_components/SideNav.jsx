'use client'
import React from 'react'
import Image from 'next/image'
import { LayoutGrid, HandCoins, Receipt, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
  const pathname = usePathname()

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: HandCoins,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: Receipt,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ]

  const isActive = (path) =>
    path === '/dashboard'
      ? pathname === '/dashboard'
      : pathname === path || pathname?.startsWith(path + '/')

  return (
    <div className='h-screen p-5 border shadow-sm flex flex-col justify-between bg-white'>
      <div>
        <Link href='/dashboard'>
          <Image src={'/logo.svg'}
            alt='logo'
            width={160}
            height={100}
            priority
          />
        </Link>
        <div className='mt-5'>
          {menuList.map((menu) => {
            const Icon = menu.icon
            const active = isActive(menu.path)
            return (
              <Link href={menu.path} key={menu.id}>
                <h2
                  className={[
                    'flex gap-2 items-center font-medium p-5 cursor-pointer rounded-md mb-2 transition-colors',
                    active
                      ? 'text-primary bg-blue-50'
                      : 'text-gray-500 hover:text-primary hover:bg-blue-50'
                  ].join(' ')}
                >
                  <Icon />
                  {menu.name}
                </h2>
              </Link>
            )
          })}
        </div>
      </div>
      <div className='flex gap-2 items-center p-2 bg-slate-100 rounded-full'>
        <UserButton userProfileMode='modal' />
        <span className="text-sm font-medium text-gray-600">Profile</span>
      </div>
    </div>
  )
}

export default SideNav
