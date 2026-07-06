import React from 'react'
import Link from 'next/link'

const page = () => {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"]

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#E8E2D5] pb-8 mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
          Historical Archives
        </h1>
        <p className="text-[#57534E] mt-2">
          Browse through our publication history year by year.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {years.map((year, index) => (
          <Link
            href={`/blogs/archive/${year}`}
            key={index}
            className="group flex items-center gap-5 p-6 bg-white border border-[#E8E2D5] rounded-2xl hover:border-[#B89A6C]/50 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300"
          >
            {/* SVG Folder Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#F3ECE0] flex items-center justify-center text-[#B89A6C] group-hover:bg-[#B89A6C] group-hover:text-white transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"></path>
              </svg>
            </div>
            
            <div>
              <p className="text-xl font-bold text-[#1C1917] group-hover:text-[#B89A6C] transition-colors duration-300">
                {year}
              </p>
              <p className="text-xs text-[#57534E] mt-0.5">
                Browse publication
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default page
