'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Header from './_components/Header'

const revealOnScroll = {
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: 'easeOut' }
}

const features = [
  {
    eyebrow: 'Your financial command center',
    title: 'See your whole financial picture.',
    description:
      'A clear dashboard brings your budgets, spending, and activity together so you can make confident decisions at a glance.',
    image: '/dashboard-preview.png',
    alt: 'SpendFlow dashboard overview showing budget and spending analytics',
    imageSide: 'right'
  },
  {
    eyebrow: 'Budgets that work for you',
    title: 'Make every goal feel achievable.',
    description:
      'Create budgets around the things that matter to you, keep an eye on your progress, and know what you have left to spend.',
    image: '/live-dashboard-preview.png',
    alt: 'SpendFlow budget cards showing category progress and remaining amounts',
    imageSide: 'left'
  },
  {
    eyebrow: 'Everyday spending, made clear',
    title: 'Stay in control, one expense at a time.',
    description:
      'Log expenses as they happen and see where your money goes with simple, useful visual insights.',
    image: '/dashboard-preview.png',
    alt: 'SpendFlow expense and analytics dashboard',
    imageSide: 'right'
  }
]

export default function Home() {
  return (
    <main className='overflow-hidden bg-white text-slate-900'>
      <Header />

      <section className='relative flex min-h-[calc(100vh-73px)] items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6 py-20 sm:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mx-auto max-w-4xl text-center'
        >
          <p className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700'>
            <span aria-hidden='true'>✨</span>
            Smart Financial Management
          </p>
          <h1 className='mt-8 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl'>
            Take control of your money and{' '}
            <span className='text-blue-600'>build financial freedom.</span>
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600'>
            Effortlessly track daily expenses, visualize spending habits, and set achievable
            budget goals—all in one intuitive dashboard.
          </p>
          <div className='mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link
              href='/sign-in'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              Start Tracking Free
              <ArrowRight size={17} />
            </Link>
            <a
              href='#dashboard'
              className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            >
              Explore SpendFlow
              <ArrowDown size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      {features.map((feature, index) => {
        const imageFirst = feature.imageSide === 'left'

        return (
          <section
            id={index === 0 ? 'dashboard' : undefined}
            key={feature.title}
            className={[
              'min-h-screen flex items-center justify-center p-8 lg:p-24',
              index === 1 ? 'bg-slate-50' : 'bg-white'
            ].join(' ')}
          >
            <div
              className={[
                'mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20',
                imageFirst ? 'lg:[&>*:first-child]:order-2' : ''
              ].join(' ')}
            >
              <motion.div {...revealOnScroll}>
                <p className='text-sm font-semibold uppercase tracking-[0.18em] text-blue-600'>
                  {feature.eyebrow}
                </p>
                <h2 className='mb-4 mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl'>
                  {feature.title}
                </h2>
                <p className='max-w-xl text-lg leading-8 text-slate-600'>
                  {feature.description}
                </p>
              </motion.div>

              <motion.div {...revealOnScroll}>
                <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10'>
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={1429}
                    height={765}
                    unoptimized
                    className='w-full rounded-xl border border-slate-100 object-cover'
                  />
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}
    </main>
  )
}
