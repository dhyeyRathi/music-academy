import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

async function page() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const supabase = await createClient();
  const { data }: any | null = await supabase.from("blogs").select("*");

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#E8E2D5] pb-8 mb-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
            The Blog Journal
          </h1>
          <p className="text-[#57534E] mt-2">
            Latest stories, tutorials, and inspiration from our blog app.
          </p>
        </div>
        <Link
          href="/blogs/archive"
          className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#B89A6C] hover:text-[#9E8155] transition-colors"
        >
          View Archive
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform transition-transform group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((blog: any) => (
          <article
            className="bg-white border border-[#E8E2D5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#B89A6C]/30 transition-all duration-300 flex flex-col group h-full"
            key={blog.id}
          >
            <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
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
  );
}

export default page;
