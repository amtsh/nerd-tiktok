import React from "react";
import { Content } from "@/ui/content";
import { HomeForm } from "@/features/home-form";

export default async function Home() {
  return (
    <Content>
      <div className="min-h-screen flex flex-col">
        <div className="">
          <div className="flex flex-col h-dvh">
            <div className="flex-grow flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400 border border-white/15 bg-white/[0.06] px-3 py-1 rounded-full mb-4">
                Introducing
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-center text-balance text-white leading-tight tracking-tight">
                Tiktok but for
                <br />
                <span className="inline-block bg-gradient-to-r from-orange-400 via-pink-300 to-purple-400 bg-clip-text text-transparent pb-1">
                  curiosity.
                </span>
              </h1>
              <p className="text-sm text-gray-500 text-center text-balance mt-3">
                Read any topic on a scrolling feed.
              </p>
            </div>

            <HomeForm />
          </div>
        </div>
      </div>
    </Content>
  );
}
