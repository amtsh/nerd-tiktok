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
            <div className="flex-grow flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4 md:text-6xl text-center text-balance bg-gradient-to-r from-orange-400 via-pink-300 to-purple-400 bg-clip-text box-decoration-clone text-transparent">
                Heal from doomscrolling
              </h1>
              <p className="mt-2 md:mt-4 text-xl md:text-2xl font-semibold text-gray-300 text-balance">
                ... with microlearning
              </p>
            </div>

            <HomeForm />
          </div>

          <div className="w-full flex justify-center my-24 md:my-8">
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
          </div>
        </div>
      </div>
    </Content>
  );
}
