'use client'
import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

const currencyFormat = (v) => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(v) || 0)
  } catch {
    return `₹${Number(v) || 0}`
  }
}

const DEFAULT_COLORS = {
  budget: '#6366f1',
  spent: '#10b981',
  palette: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444']
}

export default function BarChartDashboard({ data = [], loading = false, maxItems = 8 }) {
  const chartData = Array.isArray(data) ? data : []
  const trimmed = chartData.slice(0, maxItems)

  if (loading) {
    return (
      <div className='p-5 bg-white border rounded-2xl'>
        <Skeleton className='mb-4 h-4 w-40' />
        <Skeleton className='h-[260px] w-full' />
      </div>
    )
  }

  if (trimmed.length === 0) {
    return (
      <div className='p-5 bg-white border rounded-2xl min-h-[220px] flex flex-col items-center justify-center text-center'>
      <div className='text-4xl mb-3'>📊</div>
      <h3 className='font-semibold text-gray-700'>No data yet</h3>
      <p className='text-sm text-gray-500 mt-1 max-w-sm'>
        Create some budgets and add expenses to see your spending chart here.
      </p>
    </div>
    )
  }

  return (
    <div className='p-5 bg-white border rounded-2xl'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h2 className='font-bold text-lg text-gray-800'>Budget vs. Spending</h2>
          <p className='text-xs text-slate-500 mt-0.5'>
            {chartData.length > maxItems
              ? `Showing top ${maxItems} of ${chartData.length} budgets`
              : `All ${chartData.length} budget categories`}
          </p>
        </div>
      </div>

      <div className='w-full h-[280px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={trimmed}
            margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' vertical={false} />
            <XAxis
              dataKey='name'
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-10}
              textAnchor='end'
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : v}`}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                fontSize: 13
              }}
              formatter={(v) => currencyFormat(v)}
            />
            <Legend
              verticalAlign='top'
              height={36}
              iconType='rect'
              wrapperStyle={{ fontSize: 13 }}
            />
            <Bar
              dataKey='budget'
              name='Allocated Budget'
              fill={DEFAULT_COLORS.budget}
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey='spent'
              name='Total Spent'
              fill={DEFAULT_COLORS.spent}
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
