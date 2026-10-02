import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-white lg:min-h-screen lg:place-content-center dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Take control of your money and
            <strong className="text-indigo-600"> build </strong>
            financial freedom
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Effortlessly track daily expenses, visualize your spending habits, and set achievable budget goals—all in one intuitive dashboard.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              href="/sign-up"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Start Tracking Free
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-2xl mt-8">
          <Image
            src="/dashboard.png"
            alt="Dashboard Preview"
            width={1200}
            height={750}
            className="w-full h-auto object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}