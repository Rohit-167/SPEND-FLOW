import React from 'react'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Upgrade() {
  const tiers = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started with personal budgeting.',
      highlighted: false,
      features: [
        'Up to 5 budgets',
        'Up to 100 expenses / month',
        'Basic progress tracking',
        'Email & password sign-in'
      ],
      cta: 'Current plan'
    },
    {
      name: 'Pro',
      price: '₹299',
      period: '/ month',
      description: 'Full-featured finance tracking for power users.',
      highlighted: true,
      features: [
        'Unlimited budgets & expenses',
        'Detailed charts & analytics',
        'CSV export & imports',
        'Priority support',
        'Early access to new features'
      ],
      cta: 'Upgrade to Pro'
    }
  ]

  return (
    <div className='max-w-5xl mx-auto py-4'>
      <div className='text-center mb-10'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
          <ShieldCheck size={16} />
          Unlock all features
        </div>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
          Upgrade your plan
        </h1>
        <p className='text-gray-500 mt-2 max-w-xl mx-auto'>
          Upgrade to Pro for unlimited budgets, deeper insights, and everything you need to stay on top of your money.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={[
              'rounded-2xl border p-7 flex flex-col',
              tier.highlighted
                ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                : 'border-slate-200 bg-white'
            ].join(' ')}
          >
            <div className='flex items-start justify-between mb-2'>
              <div>
                <h2 className='text-xl font-bold text-gray-800'>{tier.name}</h2>
                <p className='text-sm text-gray-500 mt-1'>{tier.description}</p>
              </div>
              {tier.highlighted && (
                <span className='text-xs font-medium bg-primary text-white px-2.5 py-1 rounded-full'>
                  Popular
                </span>
              )}
            </div>

            <div className='my-6'>
              <span className='text-4xl font-bold text-gray-800'>
                {tier.price}
              </span>
              {tier.period && (
                <span className='text-gray-500 text-sm ml-1'>{tier.period}</span>
              )}
            </div>

            <ul className='space-y-2.5 mb-8 flex-1'>
              {tier.features.map((f) => (
                <li key={f} className='flex items-start gap-2 text-sm text-gray-700'>
                  <CheckCircle2
                    size={18}
                    className={tier.highlighted ? 'text-primary mt-0.5' : 'text-emerald-500 mt-0.5'}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={tier.highlighted ? 'default' : 'outline'}
              size='lg'
              disabled={!tier.highlighted}
              className='w-full'
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Upgrade
