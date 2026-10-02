import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart3, PiggyBank, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <main className='overflow-hidden bg-slate-50/50 text-slate-900'>
      <section className='px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700'>
              <span aria-hidden='true'>✨</span>
              Smart Financial Management
            </div>
            <h1 className='mt-7 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
              Take control of your money and{' '}
              <span className='text-blue-600'>build financial freedom</span>
            </h1>
            <p className='mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8'>
              Effortlessly track daily expenses, visualize spending habits, and set achievable budget goals—all in one intuitive dashboard.
            </p>
            <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Link
                href='/sign-in'
                className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              >
                Start Tracking Free
                <ArrowRight size={17} />
              </Link>
              <a
                href='#live-demo'
                className='inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              >
                View Live Demo
              </a>
            </div>
          </div>

          <div
            id='live-demo'
            className='relative mx-auto mt-14 w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] sm:mt-16'
          >
            <Image
              src='/dashboard.png'
              alt='SpendFlow expense tracking dashboard preview'
              width={1200}
              height={750}
              className='h-auto w-full rounded-2xl object-cover'
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className='px-4 pb-20 sm:px-6 lg:px-8'>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3'>
          <FeatureCard
            icon={PiggyBank}
            title='Smart Budgeting'
            description='Set monthly limits and monitor progress in real time.'
            iconClass='bg-blue-50 text-blue-600'
          />
          <FeatureCard
            icon={BarChart3}
            title='Expense Analytics'
            description='Clear visual bar charts and category breakdowns.'
            iconClass='bg-violet-50 text-violet-600'
          />
          <FeatureCard
            icon={Zap}
            title='Real-time Tracking'
            description='Log daily spending instantly with categorized items.'
            iconClass='bg-emerald-50 text-emerald-600'
          />
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ icon: Icon, title, description, iconClass }) {
  return (
    <article className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md'>
      <div className={`inline-flex rounded-xl p-3 ${iconClass}`}>
        <Icon size={22} aria-hidden='true' />
      </div>
      <h2 className='mt-5 text-lg font-semibold text-slate-900'>{title}</h2>
      <p className='mt-2 text-sm leading-6 text-slate-600'>{description}</p>
    </article>
  )
}