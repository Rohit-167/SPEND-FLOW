'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import AddExpense from '../_components/AddExpense'
import ExpenseListTable from '../_components/ExpenseListTable'
import CardInfo from '../_components/CardInfo'
import { getAllExpensesList, getBudgetList } from '@/utils/userQueries'
import { Button } from '@/components/ui/button'

export default function AllExpenses() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [expenses, setExpenses] = useState([])
  const [overview, setOverview] = useState({ totalBudget: 0, totalSpent: 0, budgetCount: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const refreshData = () => setReloadKey((k) => k + 1)

  const loadData = useCallback(async (email) => {
    setLoading(true)
    setError('')
    try {
      const [expenseList, budgetList] = await Promise.all([
        getAllExpensesList(email),
        getBudgetList(email)
      ])
      const arrExp = Array.isArray(expenseList) ? expenseList : []
      const arrBud = Array.isArray(budgetList) ? budgetList : []
      const totalBudget = arrBud.reduce((s, b) => s + (Number(b?.amount) || 0), 0)
      const totalSpent = arrExp.reduce((s, e) => s + (Number(e?.amount) || 0), 0)

      setExpenses(arrExp)
      setOverview({
        totalBudget,
        totalSpent,
        budgetCount: arrBud.length,
        expenseCount: arrExp.length
      })
    } catch (err) {
      console.error('Error loading expenses:', err)
      setError(err?.message || 'Unable to load expenses. Please try again.')
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }, [])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return
    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) return
    loadData(email)
  }, [isLoaded, isSignedIn, user, reloadKey, loadData])
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>My Expenses</h1>
          <p className='text-sm text-gray-500 mt-1'>
            View and manage every expense across all your budgets.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant='outline' size='sm' onClick={refreshData} disabled={loading}>
            Refresh
          </Button>
          <AddExpense
            refreshData={refreshData}
            label='Add Expense'
            compact
          />
        </div>
      </div>

      <div className='mt-6'>
        <CardInfo
          totalBudget={overview.totalBudget}
          totalSpent={overview.totalSpent}
          budgetCount={overview.budgetCount}
          expenseCount={expenses.length}
          loading={loading}
        />
      </div>

      <div className='mt-8'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-semibold text-lg text-gray-800'>All Expenses</h2>
          <span className='text-xs text-gray-500'>
            {loading ? 'Loading…' : `${expenses.length} entries`}
          </span>
        </div>

        {!loading && error && (
          <div role='alert' className='mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700'>
            <p className='font-medium'>Expenses couldn’t be loaded</p>
            <p className='mt-1'>{error}</p>
            <Button variant='outline' size='sm' onClick={refreshData} className='mt-3 border-red-200 bg-white text-red-700 hover:bg-red-100'>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && expenses.length === 0 && (
          <div className='mb-6 p-10 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col md:flex-row gap-5 items-center justify-between'>
            <div className='text-center md:text-left'>
              <h3 className='font-semibold text-gray-700'>No expenses yet</h3>
              <p className='text-sm text-gray-500 mt-1 max-w-md'>
                Track where every rupee goes. Add your first expense and assign it to one of your budgets.
              </p>
            </div>
            <AddExpense refreshData={refreshData} label='Add Your First Expense' />
          </div>
        )}

        {!error && (
          <ExpenseListTable
            expenses={expenses}
            loading={loading}
            refreshData={refreshData}
          />
        )}
      </div>
    </div>
  )
}
