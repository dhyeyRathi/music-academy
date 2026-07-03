import React from "react";
import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { blob } from "stream/consumers";
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
    <div className="w-full">
      <header className="relative h-[80svh] min-h-[600px] w-full overflow-hidden ">
        <img
          src={blog?.thumbnail}
          className="absolute -z-10 object-cover h-full w-full inset-0"
        />
        <div className="absolute -z-5 w-full h-full bg-gradient-to-t from-night to-transparent "></div>

        <div className="absolute bottom-4 items-center gap-5 justify-center sm:gap-10 md:gap-15 lg:gap-20 px-6 sm:px-10 md:px-30 lg:px-50 ">
          <BackButton>
            <svg
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
            </svg>
          </BackButton>

          <div className="flex flex-col gap-5 w-full px-6 sm:px-10 lg:px-30 ">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl  font-bold tracking-[0.025em]">
              {blog?.title}
            </h1>
            <p className="text-xl italic lg:text-2xl text-gray-100/80 font-semibold tracking-[0.025em]">
              {blog?.excerpt}
            </p>
            <div className="flex justify-bewteen text-xs sm:text-base lg:text-l gap-4 sm:gap-5 text-gray-100/60">
              <p aria-label="category badge">
                {" "}
                {blog?.category}{" "}
               
              </p> <em className="font-bold  ">·</em>
              <p aria-label="estimated time to read">
                {" "}
                {blog?.read_time}{" "}
                
              </p><em className="font-bold ">·</em>
              <p aria-label="published  at">
                {" "}
                {blog?.published_at}{" "}
               
              </p> <em className="font-bold  ">·</em>
              <p aria-label="authors name">
                {" "}
                {blog?.author}{" "}
               
              </p> <em className=" font-bold  "></em>
            </div>
          </div>
        </div>
      </header>

      <section
        aria-label="blog body"
        className="w-full px-12  sm:px-30 md:px-40 lg:px-80 text-sm sm:text-base text-gray-100 py-10 lg:py-20"
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold py-2 sm:py-6 lg:py-8">{blog.author} says . . .</h1>
        <p className="tracking-[0.05em] text-xl">{blogBody.body}</p>
      </section>
    </div>
  );
}
