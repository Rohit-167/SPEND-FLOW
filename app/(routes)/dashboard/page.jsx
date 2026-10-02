'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import BudgetList from './_components/BudgetList'
import CardInfo from './_components/CardInfo'
import BarChartDashboard from './_components/BarChartDashboard'
import { getBudgetList, getAllExpensesList } from '@/utils/userQueries'

export default function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [overview, setOverview] = useState({
    totalBudget: 0,
    totalSpent: 0,
    budgetCount: 0,
    expenseCount: 0,
    chartData: []
  })
  const [loading, setLoading] = useState(true)
  const [overviewError, setOverviewError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const loadOverview = useCallback(async (email, cancelledRef) => {
    setLoading(true)
    setOverviewError('')
    try {
      const [budgets, expenses] = await Promise.all([
        getBudgetList(email),
        getAllExpensesList(email)
      ])
      if (cancelledRef?.current) return
      const budgetArr = Array.isArray(budgets) ? budgets : []
      const expenseArr = Array.isArray(expenses) ? expenses : []
      const totalBudget = budgetArr.reduce((s, b) => s + (Number(b?.amount) || 0), 0)
      const totalSpent = budgetArr.reduce((s, b) => s + (Number(b?.totalSpend) || 0), 0)
      const chartData = budgetArr
        .slice()
        .sort((a, b) => (Number(b?.totalSpend) || 0) - (Number(a?.totalSpend) || 0))
        .map((b) => ({
          name: b?.name || 'Untitled',
          budget: Number(b?.amount) || 0,
          spent: Number(b?.totalSpend) || 0
        }))
      setOverview({
        totalBudget,
        totalSpent,
        budgetCount: budgetArr.length,
        expenseCount: expenseArr.length,
        chartData
      })
    } catch (err) {
      console.error('Error loading dashboard overview:', err)
      setOverviewError(err?.message || 'Unable to load the dashboard overview.')
    } finally {
      if (!cancelledRef?.current) setLoading(false)
    }
  }, [])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return
    }
    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) {
      return
    }
    const cancelled = { current: false }
    loadOverview(email, cancelled)
    return () => {
      cancelled.current = true
    }
  }, [isLoaded, isSignedIn, user, reloadKey, loadOverview])
  /* eslint-enable react-hooks/set-state-in-effect */

  const name = user?.firstName || user?.fullName || 'there'

  return (
    <div>
      <div className='mb-6'>
        <h1 className='font-bold text-2xl md:text-3xl text-gray-800'>
          Hello, {name} 👋
        </h1>
        <p className='text-sm text-gray-500 mt-1'>
          Here&apos;s a summary of your spending across all budgets.
        </p>
      </div>

      <CardInfo
        totalBudget={overview.totalBudget}
        totalSpent={overview.totalSpent}
        budgetCount={overview.budgetCount}
        expenseCount={overview.expenseCount}
        loading={loading}
      />
      {overviewError && (
        <div role='alert' className='mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {overviewError}
        </div>
      )}

      <div className='mt-8'>
        <BarChartDashboard
          data={overview.chartData}
          loading={loading}
          maxItems={8}
        />
      </div>

      <div className='mt-10'>
        <div className='flex items-end justify-between mb-1'>
          <div>
            <h2 className='font-bold text-xl text-gray-800'>Your Budgets</h2>
            <p className='text-sm text-gray-500'>
              Click any budget card to view or add expenses.
            </p>
          </div>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className='text-xs text-primary hover:underline'
          >
            Refresh overview
          </button>
        </div>
        <BudgetList showCreateCard={false} externalRefreshKey={reloadKey} />
      </div>
    </div>
  )
}
