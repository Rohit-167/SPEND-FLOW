'use client'
import React, { useEffect, useState, useCallback } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { getUserBudgets } from '@/utils/userQueries'

function DashboardLayout({ children }) {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const [budgetsChecked, setBudgetsChecked] = useState(false)
  const [hasBudgets, setHasBudgets] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkUserBudgets = useCallback(async (email) => {
    try {
      const result = await getUserBudgets(email)
      const count = Array.isArray(result) ? result.length : 0
      setHasBudgets(count > 0)
      if (count === 0 && pathname === '/dashboard') {
        router.replace('/dashboard/budgets')
      }
    } catch (error) {
      console.error('Error verifying user budgets:', error)
      setHasBudgets(false)
    } finally {
      setBudgetsChecked(true)
      setLoading(false)
    }
  }, [pathname, router])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
      const current = encodeURIComponent(pathname || '/dashboard')
      router.replace(`/sign-in?redirect_url=${current}`)
      return
    }
    const email = user?.primaryEmailAddress?.emailAddress
    if (email && !budgetsChecked) {
      checkUserBudgets(email)
    } else if (email) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn, user, pathname, router, budgetsChecked, checkUserBudgets])
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!isLoaded || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent' />
          <p className='text-sm text-gray-500'>Loading dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='fixed md:w-64 hidden md:block z-20'>
        <SideNav hasBudgets={hasBudgets} />
      </div>
      <div className='md:ml-64 min-h-screen flex flex-col'>
        <DashboardHeader hasBudgets={hasBudgets} />
        <main className='flex-1 p-5 md:p-8'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
