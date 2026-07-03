'use client'

import { useEffect } from 'react'
import  BackButton  from '@/components/ui/BackButton'

export default function ArchiveError({
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
    <div className='w-full bg-flare-gradient min-h-screen flex flex-col items-center justify-center p-20'>
      <BackButton ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" scale-30 sm:scale-50 lg:Scale-70 lucide lucide-arrow-left-icon mb-10 lucide-arrow-left hover:text-neon-pink transition-all duration-400 ease-in-out cursor-pointer"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg></BackButton>
      <div className='bg-black/50 rounded-lg p-10 text-center max-w-md mt-10'>
        <h2 className='text-3xl font-bold text-red-500 mb-4'>Archive Error</h2>
        <p className='text-gray-300 mb-6'>{error.message || 'Failed to load archive'}</p>
        <button
          onClick={() => reset()}
          className='bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition'
        >
          Try again
        </button>
      </div>
    </div>
  )
}
