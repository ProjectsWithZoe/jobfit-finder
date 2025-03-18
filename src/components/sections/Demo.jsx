import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Demo() {
  const images = [
    "/public/demo1.png",
    "/public/demo2.png",
    "/public/demo3.png",
  ];
  return (
    <>
      {/*<section className="pt-32 flex flex-row pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-radial from-primary/20 to-transparent opacity-60 blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 w-full max-w-lg animate-fade-in">
              <div className="flex flex-col glass-card p-8 rounded-2xl relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <label
                        id="jobDesc"
                        className=" text-sm font-medium block"
                      >
                        Job Description
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium block">
                        Your CV
                      </label>
                    </div>
                  </div>
                </div>
                <Button
                  size="xxl"
                  className="flex-col px-16 mt-4 bg-gradient-to-r to-blue-500 from-purple-700 text-3xl"
                >
                  MatchMe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 w-full max-w-lg animate-fade-in">
              <div className="flex flex-col glass-card p-8 rounded-2xl relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <label
                        id="jobDesc"
                        className=" text-sm font-medium block"
                      >
                        Job Description
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium block">
                        Your CV
                      </label>
                    </div>
                  </div>
                </div>
                <Button
                  size="xxl"
                  className="flex-col px-16 mt-4 bg-gradient-to-r to-blue-500 from-purple-700 text-3xl"
                >
                  MatchMe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>*/}
      <div className=" m-2 mb-4 p-2">
        <h1 className="text-3xl py-4 font-pricing justify-center flex">
          Results Demo
        </h1>
        <h2 className="font-pricing py-2">
          These are examples of how the results look for different pricing
          plans.
        </h2>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt="Placeholder"
            className="mb-8 border shadow-lg rounded w-full h-full"
          />
        ))}
      </div>
    </>
  );
}
