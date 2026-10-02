import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side: Image / Banner (Like HyperUI) */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full bg-cover bg-center opacity-80"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1617195737496-bc30197e35ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')"
            }}
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Expense Tracker 💰
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
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