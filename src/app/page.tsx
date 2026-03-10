import React from "react";
import Image from "next/image";
import { Content } from "@/ui/content";
import { HomeForm } from "@/features/home-form";

export default async function Home() {
  return (
    <div className="h-dvh overflow-y-scroll snap-y snap-mandatory">
      {/* Hero */}
      <div className="relative h-dvh flex-shrink-0 snap-start overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(80,40,20,0.35),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 h-full w-full flex flex-col justify-center md:flex-row md:items-center">
          {/* Text */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 md:pr-16 pt-12 md:pt-0">
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400 border border-white/15 bg-white/[0.06] px-3 py-1 rounded-full mb-5">
              Introducing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center md:text-left text-white leading-[1.05] tracking-tight">
              Tiktok but for
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                curiosity.
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-4 max-w-xs text-center md:text-left">
              Read any topic on a scrolling feed.
            </p>
          </div>

          {/* Phone — right col on desktop, below text on mobile */}
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0 md:w-1/2">
            <div className="animate-float">
              <Image
                src="/hero-phone.png"
                alt="App preview"
                width={200}
                height={400}
                className="rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.7)] md:w-[380px] md:h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form fold */}
      <div className="h-dvh flex-shrink-0 snap-start flex flex-col">
        <div className="flex-1 flex flex-col min-h-0 py-8">
          <Content className="flex-1 flex flex-col min-h-0">
            <HomeForm />
          </Content>
        </div>
      </div>
    </div>
  );
}
