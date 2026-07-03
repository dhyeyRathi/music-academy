import React from 'react'
import Link from 'next/link'


const page =  () => {

    const years = ["2020", "2021", "2022", "2023", "2024", "2025","2026"]

   
    
  return (
    <div className='w-full bg-flare-gradient min-h-screen animate-clock-it p-20 pt-40 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-20 gap-20'>
        {years.map((year, index) =>(
        <Link href={`/blogs/archive/${year}`} className='relative flex gap-10 hover:bg-pink-800 w-full h-50 hover:border-b-[40px] rounded-lg border-pink-900' key={index}> 
        <img className='' src="/icons/folder.svg"/>
        <p className='self-center text-3xl '>{year}</p>
        </Link>
           ) )}
      </div>
    </div>
  )
}

export default page
