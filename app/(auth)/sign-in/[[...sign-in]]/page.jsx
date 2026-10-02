import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="flex min-h-[420px] items-center justify-center bg-slate-950 px-6 py-12 sm:px-10 lg:col-span-5 lg:min-h-screen lg:px-12 xl:col-span-6">
          <div className="w-full max-w-xl text-center">
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl">
              <Image
                src="/live-dashboard-preview.png"
                alt="Preview of the Expense Tracker dashboard"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Expense Tracker 💰
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-white/80">
              Manage your budget, track expenses, and stay on top of your financial goals easily.
            </p>
          </div>
        </section>

        {/* Right Side: Clerk Sign-In Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}