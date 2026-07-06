import React from "react";

const cards = Array.from({ length: 6 });

export default function Loading() {
  return (
    <div className="min-h-screen bg-warm-bg pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Skeleton Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-warm-border pb-8 mb-12">
        <div className="space-y-3 w-full max-w-md">
          <div className="h-9 w-2/3 rounded-lg bg-stone-200/70 animate-pulse" />
          <div className="h-4 w-5/6 rounded-lg bg-stone-200/50 animate-pulse" />
        </div>
        <div className="h-5 w-28 rounded-lg bg-stone-200/70 animate-pulse hidden md:block" />
      </div>

      {/* Skeleton Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((_, index) => (
          <div
            key={index}
            className="bg-warm-card border border-warm-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-full"
          >
            {/* Image Placeholder */}
            <div className="aspect-[16/10] w-full bg-stone-200/60 animate-pulse" />

            {/* Content Body Placeholder */}
            <div className="p-6 flex flex-col flex-1 justify-between gap-6">
              <div className="space-y-3">
                <div className="h-6 w-11/12 rounded-lg bg-stone-200/70 animate-pulse" />
                <div className="h-6 w-3/4 rounded-lg bg-stone-200/70 animate-pulse" />
              </div>

              <div className="pt-4 border-t border-warm-border/60 flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-stone-200/60 animate-pulse" />
                <div className="h-4 w-16 rounded bg-stone-200/50 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}