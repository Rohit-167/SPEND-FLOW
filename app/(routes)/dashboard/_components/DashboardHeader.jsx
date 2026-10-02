'use client'
import React from 'react'
import { Search, Wallet } from 'lucide-react'

function DashboardHeader({ hasBudgets }) {
  return (
    <header className='sticky top-0 z-10 p-5 shadow-sm border-b flex justify-between items-center bg-white gap-4'>
      <div className='flex items-center gap-2 bg-gray-100 p-2 rounded-md max-w-md w-full'>
        <Search className='text-gray-400 shrink-0' size={20} />
        <input
          type="text"
          placeholder='Search budgets, expenses…'
          className='bg-transparent outline-none w-full text-sm'
        />
      </div>

      <div className='flex items-center gap-3'>
        <div className='hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-medium'>
          <Wallet size={14} />
          {hasBudgets === null
            ? 'Loading…'
            : hasBudgets
              ? 'Budgets active'
              : 'No budgets yet'}
        </div>

      </div>
    </header>
  )
}

export default DashboardHeader
