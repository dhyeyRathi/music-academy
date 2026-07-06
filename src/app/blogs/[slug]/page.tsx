import React from "react";
import { createClient } from "@/lib/supabase/server";
import BackButton from "@/components/ui/BackButton";
import { notFound } from "next/navigation";


type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  const { data: blogBody, error: err }: any | null = await supabase
    .from("blog_bodies")
    .select("body")
    .eq("blog_id", blog.id)
    .single();

  if (err || !blogBody) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* Hero Header */}
      <header className="relative h-[60svh] min-h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        <img
          src={blog?.thumbnail}
          alt={blog?.title}
          className="absolute inset-0 object-cover h-full w-full"
        />
        {/* Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-[#FAF7F2] to-bg-[#FAF7F2]/10"></div>

        {/* Header Content Wrapper */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-24 max-w-7xl mx-auto w-full z-10">
          {/* Top Row: Back Button */}
          <div>
            <BackButton>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/80 hover:bg-black/60 text-white backdrop-blur-md transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </div>
            </BackButton>
          </div>

          {/* Bottom Row: Metadata & Title */}
          <div className="max-w-4xl text-stone-900  ">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#B89A6C] mb-4">
              {blog?.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
              {blog?.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 font-light mb-6 max-w-3xl leading-relaxed">
              {blog?.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-stone-900 font-light">
              <span>By <strong className="font-semibold ">{blog?.author}</strong></span>
              <span className="text-stone-500">•</span>
              <span>{blog?.read_time}</span>
              <span className="text-stone-500">•</span>
              <span>{blog?.published_at}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Body Section */}
      <section
        aria-label="blog body"
        className="max-w-3xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16"
      >
        <div className="border-l-4 border-[#B89A6C] pl-6 py-1 mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#B89A6C]">
            A Note from the Author
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mt-1">
            {blog.author} writes...
          </h2>
        </div>

        <div className="prose prose-stone max-w-none">
          <p className="text-lg sm:text-xl text-[#57534E] leading-relaxed font-light whitespace-pre-line tracking-wide">
            {blogBody.body}
          </p>
        </div>
      </section>
    </article>
  );
}
