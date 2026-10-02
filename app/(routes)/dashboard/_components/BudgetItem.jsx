'use client'
import React from 'react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

const currencyFormat = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
})

function BudgetItem({ budget }) {
  const amount = Number(budget?.amount) || 0
  const totalSpend = Number(budget?.totalSpend) || 0
  const totalItem = Number(budget?.totalItem) || 0
  const remaining = Math.max(amount - totalSpend, 0)
  const perc = amount > 0 ? Math.min((totalSpend / amount) * 100, 100) : 0
  const isOverBudget = totalSpend > amount && amount > 0
  const progressColor = isOverBudget
    ? 'bg-red-500'
    : perc >= 80
      ? 'bg-amber-500'
      : undefined

  const budgetId = budget?.id

  const card = (
    <div className='p-5 border rounded-2xl hover:shadow-md h-[170px] bg-white flex flex-col justify-between'>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
            {budget?.icon || '💰'}
          </h2>
          <div>
            <h2 className='font-bold text-gray-800 truncate max-w-[180px]'>
              {budget?.name || 'Untitled'}
            </h2>
            <h2 className='text-sm text-gray-500'>
              {totalItem} {totalItem === 1 ? 'Item' : 'Items'}
            </h2>
          </div>
        </div>
        <h2
          className={[
            'font-bold text-lg',
            isOverBudget ? 'text-red-600' : 'text-primary'
          ].join(' ')}
        >
          {currencyFormat.format(amount)}
        </h2>
      </div>

      <div className='mt-5'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-xs text-slate-500'>
            <span className='font-medium text-slate-700'>
              {currencyFormat.format(totalSpend)}
            </span>{' '}
            Spent
          </h2>
          <h2
            className={[
              'text-xs text-slate-500',
              isOverBudget ? 'text-red-600 font-medium' : ''
            ].join(' ')}
          >
            {isOverBudget
              ? `Over by ${currencyFormat.format(totalSpend - amount)}`
              : `${currencyFormat.format(remaining)} Remaining`}
          </h2>
        </div>
        <Progress
          value={perc}
          indicatorClassName={progressColor}
          aria-label={`${budget?.name} budget usage`}
        />
      </div>
    </div>
  )

  if (budgetId) {
    return (
      <Link
        href={`/dashboard/expenses/${budgetId}`}
        aria-label={`View ${budget?.name || 'budget'} details`}
        className='block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
      >
        {card}
      </Link>
    )
  }

  return card
}

export default BudgetItem
