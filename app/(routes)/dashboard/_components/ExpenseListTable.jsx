'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { Trash2, ArrowLeft, Receipt } from 'lucide-react'
import { deleteExpense } from '@/utils/userQueries'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const currencyFormat = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
})

function formatDate(value) {
  if (!value) return '—'
  try {
    return moment(value).format('MMM D, YYYY h:mm A')
  } catch {
    return String(value)
  }
}

function ExpenseRow({ expense, onDelete, deletingId }) {
  const deleting = deletingId === expense?.id
  const amount = Number(expense?.amount) || 0
  return (
    <tr className='border-b last:border-0 hover:bg-slate-50 transition-colors'>
      <td className='p-4 align-middle'>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0'>
            <Receipt size={16} />
          </div>
          <div className='min-w-0'>
            <p className='font-medium text-gray-800 truncate'>
              {expense?.name || 'Untitled expense'}
            </p>
            {expense?.budgetId != null && (
              <p className='text-xs text-gray-500'>
                Budget #{expense.budgetId}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className='p-4 align-middle text-right font-semibold text-gray-800 whitespace-nowrap'>
        {currencyFormat.format(amount)}
      </td>
      <td className='p-4 align-middle text-right text-sm text-gray-500 whitespace-nowrap'>
        {formatDate(expense?.createdAt)}
      </td>
      <td className='p-4 align-middle text-right whitespace-nowrap'>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => onDelete(expense)}
          disabled={deleting}
          className='text-red-600 hover:text-red-600 hover:bg-red-50 inline-flex items-center gap-1'
        >
          <Trash2 size={14} className={deleting ? 'animate-pulse' : ''} />
          {deleting ? 'Deleting…' : 'Delete'}
        </Button>
      </td>
    </tr>
  )
}

export default function ExpenseListTable({
  expenses = [],
  loading = false,
  refreshData,
  backLabel,
  backHref
}) {
  const list = Array.isArray(expenses) ? expenses : []
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

  const handleDelete = async (expense) => {
    const id = expense?.id
    if (id == null) return
    const ok = window.confirm(`Delete the expense "${expense?.name || 'this entry'}"? This cannot be undone.`)
    if (!ok) return

    setDeletingId(id)
    setError('')
    try {
      await deleteExpense(id)
      refreshData && refreshData()
    } catch (err) {
      console.error('Error deleting expense:', err)
      setError(err?.message || 'Unable to delete expense. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className='mt-6 bg-white border rounded-2xl overflow-hidden'>
      {(backLabel || backHref) && (
        <div className='px-5 pt-5 flex items-center justify-between gap-3'>
          {backHref && (
            <Link
              href={backHref}
              className='inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors'
            >
              <ArrowLeft size={16} />
              {backLabel || 'Back'}
            </Link>
          )}
          <div className='text-sm text-gray-500'>
            {list.length} {list.length === 1 ? 'expense' : 'expenses'}
          </div>
        </div>
      )}

      {error && (
        <div className='mx-5 mt-3 rounded-md bg-destructive/10 text-destructive text-sm p-3'>
          {error}
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='bg-slate-50 text-slate-500 text-xs uppercase tracking-wide border-b'>
              <th className='p-4 text-left font-medium'>Name</th>
              <th className='p-4 text-right font-medium'>Amount</th>
              <th className='p-4 text-right font-medium'>Date</th>
              <th className='p-4 text-right font-medium'>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className='border-b last:border-0'>
                  {[0, 1, 2, 3].map((j) => (
                    <td key={j} className='p-4'>
                    <Skeleton className='mx-auto h-5 w-3/4' />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && list.length === 0 && (
              <tr>
                <td colSpan={4} className='p-10 text-center'>
                  <div className='inline-flex items-center justify-center p-3 rounded-full bg-slate-100 text-slate-400 mb-3'>
                    <Receipt size={24} />
                  </div>
                  <p className='font-semibold text-gray-700'>No expenses yet</p>
                  <p className='text-sm text-gray-500 mt-1'>
                    Add your first expense using the button above to start tracking.
                  </p>
                </td>
              </tr>
            )}

            {!loading &&
              list.map((e, index) => (
                <ExpenseRow
                  key={e?.id ?? `expense-${index}`}
                  expense={e}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
