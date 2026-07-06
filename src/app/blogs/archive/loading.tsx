import React from 'react'

const cards = Array.from({ length: 6 });

const Loading = () => {
  return (
    <div className="min-h-screen bg-warm-bg pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Skeleton */}
      <div className="border-b border-warm-border pb-8 mb-12">
        <div className="h-9 w-48 rounded bg-stone-200/70 animate-pulse" />
        <div className="h-4 w-72 rounded bg-stone-200/50 animate-pulse mt-2" />
      </div>

      {/* Grid List Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-6 bg-warm-card border border-warm-border rounded-2xl animate-pulse"
          >
            <div className="w-12 h-12 rounded-xl bg-stone-200/60" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-16 rounded bg-stone-200/70" />
              <div className="h-3 w-24 rounded bg-stone-200/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading
