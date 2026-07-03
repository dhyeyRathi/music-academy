'use client'

import { useEffect } from 'react'

export default function Error({
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
    <div className='w-full bg-flare-gradient min-h-screen flex items-center justify-center p-20'>
      <div className='bg-black/50 rounded-lg p-10 text-center max-w-md'>
        <h2 className='text-3xl font-bold text-red-500 mb-4'>Something went wrong!</h2>
        <p className='text-gray-300 mb-6'>{error.message || 'An unexpected error occurred'}</p>
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
