import React from "react";
import InputForm from "@/components/InputForm";
import Image from "next/image";
import xIcon from "../../public/x.svg";
import { Header } from "@/components/Header";
import ExploreTopics from "@/components/ExploreTopics";
import { Content } from "@/components/Content";

export default async function Home() {
  // const hostname = await headers().get("host");
  // const apiUrl = `https://${hostname}/api/books`;
  // const res = await fetch(apiUrl);
  // const data = await res.json();
  // const topicsFromOpenAi = data.error ? [] : data;

  // const topics = [...topicsFromOpenAi, ...defaultTopics];

  return (
    <Content>
      <div className="min-h-screen flex flex-col">
        <div className="">
          <div className="flex flex-col h-dvh">
            {/* <Header /> */}
            <div className="flex-grow flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4 md:text-6xl text-center bg-gradient-to-r from-orange-400 via-pink-300 to-purple-400 bg-clip-text box-decoration-clone text-transparent">
                Heal from doomscrolling
              </h1>
              <p className="mt-2 md:mt-4 text-xl md:text-2xl font-semibold text-gray-300">
                ... with microlearning
              </p>
            </div>

            <div className="mb-8">
              <InputForm />
            </div>
          </div>

          {/* Explore Topics */}
          <div className="my-32">
            <ExploreTopics />
          </div>

          <div className="w-full flex justify-center my-24 md:my-8">
            <span className="text-xs text-gray-400">
              <a target="_blank" href="https://x.com/amiitshiinde">
                DM feedback via{" "}
                <Image
                  src={xIcon}
                  alt="X Logo"
                  className="inline-block w-4 h-4 ml-1 invert"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    </Content>
  );
}
