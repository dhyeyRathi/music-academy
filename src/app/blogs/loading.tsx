import React from "react";

const cards = Array.from({ length: 6 });

export default function Loading() {
  return (
    <div className="min-h-screen min-w-screen bg-flare-gradient pt-35 animate-clock-it">
      <div className="px-25 flex justify-end w-full">
        <div className="h-8 w-56 rounded-full bg-white/10 animate-pulse" />
      </div>

      <div className="w-full pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-15 gap-y-10 pb-20">
        {cards.map((_, index) => (
          <div
            key={index}
            className="bg-blue-900 rounded-lg overflow-hidden relative mx-4 shadow-neon-blue/40"
          >
            <div className="w-full h-80 bg-white/10 animate-pulse" />

            <div className="mx-4 my-4 flex flex-col gap-4">
              <div className="h-6 w-3/4 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-1/3 rounded-full bg-white/10 animate-pulse" />
              <div className="flex justify-between pt-4">
                <div className="h-4 w-20 rounded-full bg-white/10 animate-pulse" />
                <div className="h-4 w-24 rounded-full bg-white/10 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}