import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart3, Check, PiggyBank, Zap } from 'lucide-react'

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

      <section className='px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='mx-auto max-w-2xl text-center'>
            <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
              How it works
            </p>
            <h2 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
              Simple steps to financial freedom
            </h2>
          </div>
          <div className='mt-12 grid grid-cols-1 gap-5 md:grid-cols-3'>
            <StepCard
              number='01'
              title='1. Sign Up Securely'
              description='Get started in moments with secure Clerk authentication and a quick account setup.'
            />
            <StepCard
              number='02'
              title='2. Set Your Budgets'
              description='Define spending limits for the categories that matter in your everyday life.'
            />
            <StepCard
              number='03'
              title='3. Track & Analyze'
              description='Log expenses and watch your charts update in real time as you spend.'
            />
          </div>
        </div>
      </section>

      <section className='bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
        <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wider text-blue-600'>
              Why SpendFlow?
            </p>
            <h2 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
              Designed for everyday people, not accountants.
            </h2>
          </div>
          <ul className='grid gap-5 sm:grid-cols-2'>
            {['Secure Data', 'Instant Sync', 'Mobile-Friendly', '100% Free'].map((item) => (
              <li key={item} className='flex items-center gap-3 text-base font-medium text-slate-700'>
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700'>
                  <Check size={17} strokeWidth={2.5} aria-hidden='true' />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 rounded-3xl bg-blue-900 px-6 py-16 text-center text-white shadow-xl shadow-blue-950/10 sm:px-12 md:flex-row md:text-left lg:px-16'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Ready to start saving? Join SpendFlow today.
            </h2>
            <p className='mt-3 max-w-2xl text-blue-100'>
              Take the first step toward a clearer picture of your finances.
            </p>
          </div>
          <Link
            href='/sign-in'
            className='inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900'
          >
            Get Started for Free
            <ArrowRight size={17} />
          </Link>
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

function StepCard({ number, title, description }) {
  return (
    <article className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <span className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700'>
        {number}
      </span>
      <h3 className='mt-5 text-lg font-semibold text-slate-900'>{title}</h3>
      <p className='mt-2 text-sm leading-6 text-slate-600'>{description}</p>
    </article>
  )
}