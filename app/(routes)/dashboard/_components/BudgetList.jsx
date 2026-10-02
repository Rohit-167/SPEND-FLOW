'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Wallet, RefreshCw } from 'lucide-react'
import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'
import { getBudgetList } from '@/utils/userQueries'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

function BudgetList({ showCreateCard = true, showTitle = false, externalRefreshKey }) {
  const { user, isLoaded, isSignedIn } = useUser()
  const [budgetList, setBudgetList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const getBudgetListData = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return
    setLoading(true)
    setError('')
    try {
      const result = await getBudgetList(user.primaryEmailAddress.emailAddress)
      setBudgetList(Array.isArray(result) ? result : [])
    } catch (err) {
      console.error('Error loading budget list:', err)
      setError(err?.message || 'Unable to load budgets. Please try again.')
      setBudgetList([])
    } finally {
      setLoading(false)
    }
  }, [user])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return
    getBudgetListData()
  }, [isLoaded, isSignedIn, reloadKey, externalRefreshKey, getBudgetListData])
  /* eslint-enable react-hooks/set-state-in-effect */

  const refreshData = () => setReloadKey((k) => k + 1)

  const totalBudget = budgetList.reduce(
    (sum, b) => sum + (Number(b?.amount) || 0),
    0
  )
  const totalSpent = budgetList.reduce(
    (sum, b) => sum + (Number(b?.totalSpend) || 0),
    0
  )
  const totalItems = budgetList.reduce(
    (sum, b) => sum + (Number(b?.totalItem) || 0),
    0
  )

  return (
    <div className='mt-7'>
      {showTitle && (
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5'>
          <div>
            <h2 className='font-bold text-2xl text-gray-800 flex items-center gap-2'>
              <Wallet className='text-primary' size={24} />
              My Budgets
            </h2>
            {budgetList.length > 0 && (
              <p className='text-sm text-gray-500 mt-1'>
                {budgetList.length} {budgetList.length === 1 ? 'budget' : 'budgets'} ·{' '}
                {totalItems} {totalItems === 1 ? 'expense' : 'expenses'} · ₹
                {totalSpent.toLocaleString('en-IN')} / ₹
                {totalBudget.toLocaleString('en-IN')} spent
              </p>
            )}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={refreshData}
            disabled={loading}
            className='self-start sm:self-end'
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </Button>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {showCreateCard && <CreateBudget refreshData={refreshData} />}

        {loading &&
          [1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              aria-hidden='true'
              className='w-full rounded-2xl h-[170px]'
            />
          ))}

        {!loading &&
          budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={budget?.id ?? `budget-${index}`} />
          ))}
      </div>

      {!loading && error && (
        <div
          role='alert'
          className='mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700'
        >
          <p className='font-medium'>Budgets couldn’t be loaded</p>
          <p className='mt-1'>{error}</p>
          <Button
            variant='outline'
            size='sm'
            onClick={refreshData}
            className='mt-3 border-red-200 bg-white text-red-700 hover:bg-red-100'
          >
            Try again
          </Button>
        </div>
      )}

      {!loading && !error && budgetList.length === 0 && (
        <div className='mt-10 border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50'>
          <Wallet size={36} className='mx-auto text-slate-400 mb-3' />
          <h3 className='font-semibold text-gray-700'>No budgets yet</h3>
          <p className='text-sm text-gray-500 mt-1'>
            {showCreateCard
              ? 'Click "Create New Budget" above to set up your first budget.'
              : 'Head to the Budgets page to create your first budget.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default BudgetList
