'use client'

import { useEffect } from 'react'

export default function ArchivePostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[calc(100svh-80px)] w-full flex items-center justify-center p-6 bg-warm-bg text-warm-text-primary">
      <div className="bg-warm-card border border-warm-border rounded-3xl p-8 sm:p-12 text-center max-w-md w-full shadow-sm">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-warm-text-primary mb-3">Post Not Found</h2>
        <p className="text-sm text-warm-text-secondary mb-8 leading-relaxed">
          {error.message || 'The blog post you are looking for does not exist.'}
        </p>
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-6 py-3 bg-[#B89A6C] text-white font-medium rounded-xl hover:bg-[#9E8155] transition-colors shadow-sm cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
