import React from 'react'
import { createClient } from '@/lib/supabase/server'
import BackButton from '@/components/ui/BackButton';
import Link from 'next/link';

type PageProps = {
  params: Promise<{
    year: string;
  }>;
};

const page = async ({params} : PageProps) => {
  const supabase = await createClient();
  const {year} = await params;

  const { data: blogs }: any | null = await supabase
    .from('blogs')
    .select("*").eq("year", year);

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <BackButton>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E2D5] bg-white text-sm font-medium hover:bg-stone-50 text-[#57534E] transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </div>
          </BackButton>
        </div>
        <h1 className="text-3xl font-bold text-[#1C1917]">No archives found</h1>
        <p className="text-[#57534E] mt-2">There are no publications recorded for the year {year}.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with back button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#E8E2D5] pb-8 mb-12">
        <div>
          <div className="mb-4">
            <BackButton>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E2D5] bg-white text-sm font-medium hover:bg-stone-50 text-[#57534E] transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Archives
              </div>
            </BackButton>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
            Archive: {year}
          </h1>
          <p className="text-[#57534E] mt-2">
            Browse all articles published during the year {year}.
          </p>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog: any) => (
          <article
            className="bg-white border border-[#E8E2D5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#B89A6C]/30 transition-all duration-300 flex flex-col group h-full"
            key={blog.id}
          >
            <Link href={`/blogs/archive/${year}/${blog.slug}`} className="flex flex-col h-full">
              {/* Thumbnail Container */}
              <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#F3ECE0]">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#B89A6C] tracking-wide uppercase border border-[#E8E2D5]">
                  {blog.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1C1917] group-hover:text-[#B89A6C] transition-colors duration-300 leading-snug">
                    {blog.title}
                  </h2>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E2D5]/60 flex items-center justify-between text-xs text-[#57534E]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#1C1917]">{blog.author}</span>
                  </div>
                  <span>{blog.published_at}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default page
