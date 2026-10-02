'use client'
import React from 'react'
import { PiggyBank, Receipt, Wallet, TrendingUp } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const currencyFormat = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
})

function StatTile({ icon: Icon, label, value, tone, plain, loading }) {
  return (
    <div className='p-5 rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'>
      <div className='flex items-center justify-between'>
        <div className={`p-2.5 rounded-xl ${tone}`}>
          <Icon size={20} />
        </div>
        {loading && <Skeleton className='h-3 w-12' />}
      </div>
      <div className='mt-3'>
        <p className='text-xs uppercase tracking-wide text-slate-500'>{label}</p>
        <h3 className='font-bold text-xl mt-1 text-gray-800'>
          {loading ? <Skeleton className='mt-2 h-6 w-28' /> : plain ? value : currencyFormat.format(value || 0)}
        </h3>
      </div>
    </div>
  )
}

export default function CardInfo({
  totalBudget = 0,
  totalSpent = 0,
  budgetCount = 0,
  expenseCount = 0,
  loading = false
}) {
  const stats = [
    {
      label: 'Total Budget',
      value: totalBudget,
      icon: PiggyBank,
      tone: 'bg-indigo-50 text-indigo-600'
    },
    {
      label: 'Total Spent',
      value: totalSpent,
      icon: Receipt,
      tone: 'bg-amber-50 text-amber-600'
    },
    {
      label: 'Active Budgets',
      value: budgetCount,
      icon: Wallet,
      tone: 'bg-blue-50 text-blue-600',
      plain: true
    },
    {
      label: 'Total Expenses',
      value: expenseCount,
      icon: TrendingUp,
      tone: 'bg-emerald-50 text-emerald-600',
      plain: true
    }
  ]

  return (
    <section aria-label='Dashboard overview cards'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map((s) => (
          <StatTile key={s.label} {...s} loading={loading} />
        ))}
      </div>
    </section>
  )
}
