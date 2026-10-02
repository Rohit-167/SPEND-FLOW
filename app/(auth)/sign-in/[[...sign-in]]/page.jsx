import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="flex min-h-[620px] flex-col items-center bg-slate-950 px-6 py-8 sm:px-10 lg:col-span-6 lg:min-h-screen lg:px-12 xl:col-span-7">
          <div className="flex w-full flex-1 flex-col text-center">
            <div className="mb-6 pt-4">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Expense Tracker 💰
              </h2>
              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-white/80">
                Manage your budget, track expenses, and stay on top of your financial goals easily.
              </p>
            </div>
            <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <Image
                src="/dashboard-preview.png"
                alt="Preview of the Expense Tracker dashboard"
                fill
                priority
                className="object-cover object-top"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Right Side: Clerk Sign-In Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-5">
          <div className="max-w-xl lg:max-w-3xl">
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}