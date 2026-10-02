'use client'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { PlusCircle, Wallet } from 'lucide-react'
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
import { createBudget } from '@/utils/userQueries'

const EMOJI_OPTIONS = ['💰', '🏠', '🚗', '🍔', '🎬', '🛒', '✈️', '📚', '💊', '🎁', '💡', '👕', '🏋️', '🎮', '🎨', '🧾']

function CreateBudget({ refreshData }) {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [emojiIcon, setEmojiIcon] = useState('💰')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const resetForm = () => {
    setName('')
    setAmount('')
    setEmojiIcon('💰')
    setError('')
  }

  const handleOpenChange = (next) => {
    setOpen(next)
    if (!next) resetForm()
  }

  const onCreateBudget = async (e) => {
    e?.preventDefault()
    const trimmedName = name.trim()
    const numericAmount = Number(amount)

    if (!trimmedName) {
      setError('Please enter a budget name.')
      return
    }
    if (!numericAmount || numericAmount <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }
    if (!user?.primaryEmailAddress?.emailAddress) {
      setError('You must be signed in to create a budget.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await createBudget({
        name: trimmedName,
        amount: numericAmount,
        icon: emojiIcon,
        createdBy: user.primaryEmailAddress.emailAddress
      })

      resetForm()
      setOpen(false)
      refreshData && refreshData()
    } catch (err) {
      console.error('Error creating budget:', err)
      setError(err?.message || 'Unable to create budget. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isValid = name.trim().length > 0 && Number(amount) > 0

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="bg-white p-10 rounded-2xl items-center flex flex-col justify-center border-2 border-dashed cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <PlusCircle size={36} />
            <h2 className="font-semibold">Create New Budget</h2>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Wallet size={18} />
            Create New Budget
          </DialogTitle>
          <DialogDescription>
            Give your budget a name, a spending limit, and pick an icon. You can always edit these later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onCreateBudget} className='mt-2 space-y-5'>
          <div className='space-y-2'>
            <Label>Choose an icon</Label>
            <div className='flex flex-wrap gap-2 p-2 border rounded-lg bg-slate-50 max-h-[140px] overflow-y-auto'>
              {EMOJI_OPTIONS.map((emoji) => {
                const selected = emojiIcon === emoji
                return (
                  <button
                    type='button'
                    key={emoji}
                    onClick={() => setEmojiIcon(emoji)}
                    aria-pressed={selected}
                    className={[
                      'text-2xl p-2 rounded-md transition-all border-2 outline-none focus:ring-2 focus:ring-primary/50',
                      selected
                        ? 'border-primary bg-primary/10 scale-105'
                        : 'border-transparent hover:bg-white hover:border-slate-200'
                    ].join(' ')}
                  >
                    {emoji}
                  </button>
                )
              })}
            </div>
            <p className='text-xs text-muted-foreground'>
              Selected: <span className='text-lg align-middle'>{emojiIcon}</span>
            </p>
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='budget-name'>Budget Name</Label>
            <Input
              id='budget-name'
              placeholder='e.g. Groceries, Rent, Entertainment'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
              autoFocus
              disabled={loading}
            />
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='budget-amount'>Budget Amount</Label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none'>
                ₹
              </span>
              <Input
                id='budget-amount'
                type='number'
                min={1}
                step='any'
                placeholder='e.g. 5000'
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (error) setError('')
                }}
                className='pl-7'
                disabled={loading}
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
  <button 
    type="button" 
    className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-slate-100 disabled:opacity-50"
    disabled={loading}
  >
    Cancel
  </button>
</DialogClose>
            <Button type='submit' disabled={!isValid || loading}>
              {loading ? 'Creating…' : 'Create Budget'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBudget
