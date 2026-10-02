'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { PlusCircle, Receipt, ChevronDown } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getBudgetList, addExpense } from '@/utils/userQueries'

export default function AddExpense({
  preselectedBudgetId,
  refreshData,
  label = 'Add New Expense',
  compact = false
}) {
  const { user, isLoaded, isSignedIn } = useUser()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [budgetId, setBudgetId] = useState(
    preselectedBudgetId ? String(preselectedBudgetId) : ''
  )
  const [budgets, setBudgets] = useState([])

  // The selected budget is derived from the dialog state and the optional preselection;
  // keeping it in sync here is a UI flow requirement rather than a render-time state bug.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (preselectedBudgetId != null) {
      setBudgetId(String(preselectedBudgetId))
    } else if (!open) {
      setBudgetId('')
    }
  }, [preselectedBudgetId, open])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !open) return
    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) return

    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const result = await getBudgetList(email)
        if (!cancelled) setBudgets(Array.isArray(result) ? result : [])
      } catch (err) {
        console.error('Error loading budgets for expense form:', err)
        if (!cancelled) setBudgets([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [isLoaded, isSignedIn, user, open])

  const selectedBudget = useMemo(
    () => budgets.find((b) => String(b?.id) === budgetId),
    [budgets, budgetId]
  )

  const resetForm = () => {
    setName('')
    setAmount('')
    setError('')
    if (preselectedBudgetId == null) setBudgetId('')
  }

  const handleOpenChange = (next) => {
    setOpen(next)
    if (!next) resetForm()
  }

  const onAddExpense = async (e) => {
    e?.preventDefault()
    const trimmedName = name.trim()
    const numericAmount = Number(amount)
    const numericBudgetId = Number(budgetId)

    if (!trimmedName) {
      setError('Please enter an expense name.')
      return
    }
    if (!numericAmount || numericAmount <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }
    if (!numericBudgetId) {
      setError('Please select a budget to assign this expense to.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await addExpense({
        name: trimmedName,
        amount: numericAmount,
        budgetId: numericBudgetId
      })
      resetForm()
      setOpen(false)
      refreshData && refreshData()
    } catch (err) {
      console.error('Error adding expense:', err)
      setError(err?.message || 'Unable to add expense. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const isValid = name.trim().length > 0 && Number(amount) > 0 && Boolean(Number(budgetId))

  const triggerContent = compact ? (
    <button type='button' className='flex items-center gap-1.5'>
      <PlusCircle size={16} />
      {label}
    </button>
  ) : (
    <button type='button' className='flex flex-col items-center justify-center gap-2 min-h-[170px] w-full p-10 rounded-2xl border-2 border-dashed border-slate-300 bg-white hover:border-primary hover:bg-blue-50/50 transition-colors cursor-pointer text-slate-500 hover:text-primary group'>
      <PlusCircle size={36} />
      <h2 className='font-semibold'>{label}</h2>
    </button>
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Receipt size={18} />
            {label}
          </DialogTitle>
          <DialogDescription>
            Record a new expense and assign it to one of your budgets.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onAddExpense} className='mt-2 space-y-5'>
          <div className='space-y-1.5'>
            <Label htmlFor='expense-budget'>Budget</Label>
            <div className='relative'>
              <select
                id='expense-budget'
                value={budgetId}
                onChange={(e) => {
                  setBudgetId(e.target.value)
                  if (error) setError('')
                }}
                disabled={submitting || loading || preselectedBudgetId != null}
                className='w-full h-9 rounded-md border bg-transparent px-3 pr-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 disabled:cursor-not-allowed appearance-none'
              >
                <option value='' disabled>
                  {loading ? 'Loading budgets…' : 'Select a budget…'}
                </option>
                {budgets.map((b) => {
                  const amt = Number(b?.amount) || 0
                  const spent = Number(b?.totalSpend) || 0
                  const remaining = Math.max(amt - spent, 0)
                  return (
                    <option key={b?.id} value={b?.id}>
                      {b?.icon} {b?.name} (₹{remaining.toLocaleString('en-IN')} remaining)
                    </option>
                  )
                })}
              </select>
              <ChevronDown
                size={16}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none'
              />
            </div>
            {selectedBudget && selectedBudget?.amount != null && (
              <p className='text-xs text-slate-500'>
                {selectedBudget.icon} <span className='font-medium'>{selectedBudget.name}</span> · ₹
                {(Number(selectedBudget.totalSpend) || 0).toLocaleString('en-IN')} / ₹
                {(Number(selectedBudget.amount) || 0).toLocaleString('en-IN')} used
              </p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='expense-name'>Expense Name</Label>
            <Input
              id='expense-name'
              placeholder='e.g. Weekly groceries, Uber ride'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              autoFocus
              disabled={submitting}
            />
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='expense-amount'>Amount</Label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none'>
                ₹
              </span>
              <Input
                id='expense-amount'
                type='number'
                min={1}
                step='any'
                placeholder='e.g. 1500'
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (error) setError('')
                }}
                className='pl-7'
                disabled={submitting}
              />
            </div>
          </div>

          {error && (
            <div className='rounded-md bg-destructive/10 text-destructive text-sm p-3'>
              {error}
            </div>
          )}

          <DialogFooter className='pt-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline' disabled={submitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={!isValid || submitting || loading}>
              {submitting ? 'Saving…' : 'Add Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
