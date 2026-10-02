'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, Wallet, TrendingUp, RefreshCw, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import AddExpense from '../../_components/AddExpense'
import ExpenseListTable from '../../_components/ExpenseListTable'
import { Progress } from '@/components/ui/progress'
import { getBudgetInfo, getExpensesList, deleteBudget } from '@/utils/userQueries'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'

const currencyFormat = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
})

export default function BudgetExpensesPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()
  const budgetId = params?.budgetId

  const [budgetInfo, setBudgetInfo] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const numericBudgetId = useMemo(() => {
    const n = Number(budgetId)
    return Number.isFinite(n) && n > 0 ? n : null
  }, [budgetId])

  const refreshData = () => setReloadKey((k) => k + 1)

  const handleDeleteBudget = async () => {
    setDeleting(true)
    try {
      await deleteBudget(numericBudgetId)
      toast.success('Budget and its expenses deleted.')
      router.replace('/dashboard/budgets')
    } catch (err) {
      console.error('Error deleting budget:', err)
      toast.error(err?.message || 'Unable to delete this budget. Please try again.')
      setDeleting(false)
    }
  }

  const load = useCallback(async (email) => {
    if (!numericBudgetId) return
    setLoading(true)
    setError('')
    try {
      const [info, list] = await Promise.all([
        getBudgetInfo(numericBudgetId, email),
        getExpensesList(numericBudgetId)
      ])
      setBudgetInfo(info || null)
      setExpenses(Array.isArray(list) ? list : [])
    } catch (err) {
      console.error('Error loading budget expenses:', err)
      setError('Unable to load this budget. Please try again.')
      setBudgetInfo(null)
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }, [numericBudgetId])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return
    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) return
    if (!numericBudgetId) {
      setLoading(false)
      return
    }
    load(email)
  }, [isLoaded, isSignedIn, user, numericBudgetId, reloadKey, load])
  /* eslint-enable react-hooks/set-state-in-effect */

  const amount = Number(budgetInfo?.amount) || 0
  const totalSpend = Number(budgetInfo?.totalSpend) || 0
  const totalItem = Number(budgetInfo?.totalItem) || 0
  const remaining = Math.max(amount - totalSpend, 0)
  const perc = amount > 0 ? Math.min((totalSpend / amount) * 100, 100) : 0
  const isOver = totalSpend > amount && amount > 0

  if (!numericBudgetId) {
    return (
      <div className='p-8 text-center'>
        <h2 className='font-semibold text-gray-700'>Invalid budget</h2>
        <p className='text-sm text-gray-500 mt-1'>
          The budget link looks incorrect.{' '}
          <Link href='/dashboard/expenses' className='text-primary hover:underline'>
            View all expenses
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between flex-wrap gap-3'>
          <Link
            href='/dashboard/expenses'
            className='inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors'
          >
            <ArrowLeft size={16} />
            All Expenses
          </Link>
          <div className='flex items-center gap-2'>
            {budgetInfo && (
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button variant='destructive' size='sm' disabled={deleting} />
                  }
                >
                  <Trash2 size={14} />
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this budget?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently deletes “{budgetInfo.name}” and all expenses assigned to it.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                    <Button
                      variant='destructive'
                      onClick={handleDeleteBudget}
                      disabled={deleting}
                    >
                      {deleting ? 'Deleting…' : 'Delete budget'}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button variant='outline' size='sm' onClick={refreshData} disabled={loading}>
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </Button>
            <AddExpense
              preselectedBudgetId={numericBudgetId}
              refreshData={refreshData}
              label='Add Expense'
              compact
            />
          </div>
        </div>

        <div className='p-6 rounded-2xl bg-white border'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <div className='text-3xl p-4 rounded-2xl bg-slate-100'>
                {budgetInfo?.icon || '💰'}
              </div>
              <div>
                <div className='text-xs uppercase tracking-wide text-slate-500'>
                  Budget details
                </div>
                {loading ? (
                  <Skeleton className='mt-2 h-7 w-48' />
                ) : (
                  <h1 className='text-2xl font-bold text-gray-800 mt-0.5'>
                    {budgetInfo?.name || 'Budget not found'}
                  </h1>
                )}
                {!loading && budgetInfo && (
                  <p className='text-sm text-gray-500 mt-0.5'>
                    {totalItem} {totalItem === 1 ? 'expense' : 'expenses'} recorded
                  </p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-3 gap-4 min-w-[320px]'>
              <div>
                <p className='text-[11px] uppercase tracking-wide text-slate-500'>Budget</p>
                {loading ? (
                  <Skeleton className='mt-2 h-6 w-24' />
                ) : (
                  <p className='text-xl font-bold text-gray-800 mt-0.5'>
                    {currencyFormat.format(amount)}
                  </p>
                )}
              </div>
              <div>
                <p className='text-[11px] uppercase tracking-wide text-slate-500'>Spent</p>
                {loading ? (
                  <Skeleton className='mt-2 h-6 w-24' />
                ) : (
                  <p className={[
                    'text-xl font-bold mt-0.5',
                    isOver ? 'text-red-600' : 'text-emerald-600'
                  ].join(' ')}>
                    {currencyFormat.format(totalSpend)}
                  </p>
                )}
              </div>
              <div>
                <p className='text-[11px] uppercase tracking-wide text-slate-500'>Remaining</p>
                {loading ? (
                  <Skeleton className='mt-2 h-6 w-24' />
                ) : (
                  <p className={[
                    'text-xl font-bold mt-0.5',
                    isOver ? 'text-red-600' : 'text-gray-800'
                  ].join(' ')}>
                    {isOver
                      ? `Over by ${currencyFormat.format(totalSpend - amount)}`
                      : currencyFormat.format(remaining)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className='mt-6 space-y-2'>
              <Skeleton className='h-3 w-full' />
              <Skeleton className='h-2 w-full rounded-full' />
            </div>
          ) : budgetInfo ? (
            <div className='mt-6'>
              <div className='flex items-center justify-between mb-2 text-xs text-slate-500'>
                <span className='inline-flex items-center gap-1.5'>
                  <TrendingUp size={12} />
                  Usage
                </span>
                <span className='font-medium text-gray-700'>
                  {perc.toFixed(perc % 1 === 0 ? 0 : 1)}%
                </span>
              </div>
              <Progress
                value={perc}
                indicatorClassName={isOver ? 'bg-red-500' : perc >= 80 ? 'bg-amber-500' : undefined}
              />
            </div>
          ) : null}

          {error && (
            <div className='mt-4 rounded-md bg-destructive/10 text-destructive text-sm p-3'>
              {error}
            </div>
          )}
        </div>

        {!loading && !budgetInfo && !error && (
          <div className='mt-6 p-8 border rounded-2xl bg-slate-50 text-center'>
            <Wallet size={32} className='mx-auto text-slate-400 mb-3' />
            <h3 className='font-semibold text-gray-700'>Budget not found</h3>
            <p className='text-sm text-gray-500 mt-1'>
              This budget may have been deleted or you don&apos;t have access to it.{' '}
              <Link href='/dashboard/budgets' className='text-primary hover:underline'>
                Go to Budgets
              </Link>
            </p>
          </div>
        )}

        {(budgetInfo || loading) && (
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
