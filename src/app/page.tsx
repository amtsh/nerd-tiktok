import React from "react";
import Image from "next/image";
import xIcon from "../../public/x.svg";
import { Content } from "@/components/Content";
import { HomeForm } from "@/components/HomeForm";

export default async function Home() {
  return (
    <Content>
      <div className="min-h-screen flex flex-col">
        <div className="">
          <div className="flex flex-col h-dvh">
            <div className="flex-grow flex flex-col items-center justify-center gap-4 px-6 sm:px-8 w-full min-w-0 overflow-visible">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-emerald-400 border border-white/15 bg-white/[0.06] px-2 py-0.5 rounded-full">
                Microlearning
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-center text-balance text-white leading-tight tracking-tight w-full max-w-2xl">
                Read any topic.
                <br />
                <span className="inline-block bg-gradient-to-r from-orange-400 via-pink-300 to-purple-400 bg-clip-text text-transparent px-1">
                  on a scrolling feed.
                </span>
              </h1>
              <p className="text-sm text-gray-500 text-center text-balance max-w-xs">
                Learn something real.
              </p>
            </div>

            <HomeForm />
          </div>

          {/* <div className="w-full flex justify-center my-24 md:my-8">
            <span className="text-xs text-gray-400">
              <a target="_blank" href="https://x.com/amiitshiinde">
                DM feedback via{" "}
                <Image
                  src={xIcon}
                  alt="X Logo"
                  className="inline-block w-4 h-4 ml-1 invert image-outline rounded-sm"
                />
              </a>
            </span>
          </div> */}
        </div>
      </div>
    </Content>
  );
}
