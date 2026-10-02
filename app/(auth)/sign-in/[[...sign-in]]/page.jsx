import { SignIn } from "@clerk/nextjs";
import { BarChart3, ShieldCheck, Wallet } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="flex flex-col justify-between bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 p-8 sm:p-12 lg:p-16">
        <div className="flex items-center gap-2 text-2xl font-bold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <Wallet size={19} strokeWidth={2.5} aria-hidden="true" />
          </div>
          SpendFlow
        </div>

        <div className="my-16 max-w-xl lg:my-0">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            A clearer view of your finances
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-white lg:text-5xl">
            Master your money.
            <br />
            <span className="text-blue-400">Secure your future.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
            SpendFlow makes it easy to build healthier financial habits with simple budgets,
            clear insights, and effortless expense tracking.
          </p>
        </div>

        <ul className="grid gap-4 text-sm text-slate-300 sm:grid-cols-3 lg:grid-cols-1">
          <li className="flex items-center gap-3">
            <ShieldCheck className="text-blue-400" size={19} aria-hidden="true" />
            Bank-grade security
          </li>
          <li className="flex items-center gap-3">
            <BarChart3 className="text-blue-400" size={19} aria-hidden="true" />
            Real-time analytics
          </li>
          <li className="flex items-center gap-3">
            <Wallet className="text-blue-400" size={19} aria-hidden="true" />
            Smart budgeting
          </li>
        </ul>
      </section>

      <section className="flex min-h-[80vh] items-center justify-center bg-white p-8 lg:min-h-screen">
        <div className="w-full max-w-md">
            <SignIn />
        </div>
      </section>
    </main>
  );
}