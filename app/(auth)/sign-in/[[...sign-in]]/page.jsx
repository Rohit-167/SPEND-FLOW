import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex flex-col justify-end overflow-hidden p-8 lg:col-span-6 lg:p-12 xl:col-span-7">
          <Image
            src="/dashboard-preview.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-10" />
          <div className="relative z-20 text-white max-w-lg">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Welcome to Expense Tracker 💰
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">
              Manage your budget, track expenses, and stay on top of your financial goals easily.
            </p>
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