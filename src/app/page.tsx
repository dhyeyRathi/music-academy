import Link from "next/link";
import { createClient } from '@/lib/supabase/server'

export default function Home() {
  return (
    <div className="min-h-[calc(100svh-80px)] w-full flex items-center justify-center px-6 sm:px-8 py-12 bg-[#FAF7F2]">
      <div className="max-w-4xl text-center flex flex-col items-center">
        {/* Sub-label */}
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#B89A6C] mb-6">
          Welcome to my blog app
        </span>
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1C1917] mb-8 leading-tight">
          Read, write and <br />
          <span className="font-light italic text-[#C27052]">stay inspired</span>
        </h1>
        
        {/* Excerpt */}
        <p className="text-lg sm:text-xl text-[#57534E] max-w-2xl mb-12 leading-relaxed font-light">
          A minimalist space to publish articles, share insights, and connect with creative minds.
        </p>
        
        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/blogs"
            className="w-full sm:w-auto px-8 py-4 bg-[#B89A6C] text-white font-medium rounded-full shadow-lg shadow-[#B89A6C]/10 hover:bg-[#9E8155] transition-all duration-300 hover:scale-[1.02] text-center"
          >
            Read the Blogs
          </Link>
          
          <Link
            href="/post-blog"
            className="w-full sm:w-auto px-8 py-4 border border-[#E8E2D5] text-[#57534E] hover:text-[#1C1917] hover:border-[#1C1917] font-medium rounded-full transition-all duration-300 text-center"
          >
            Post a Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
