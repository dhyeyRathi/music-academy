import React from 'react'

const cards = Array.from({ length: 6 });

const Loading = () => {
  return (
     <div className='w-full bg-flare-gradient min-h-screen animate-clock-it p-20 pt-40 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-20 gap-20'>

      </div>
    </div>
  )
}

export default Loading
