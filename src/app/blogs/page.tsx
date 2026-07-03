import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

async function page() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const supabase = await createClient();
  const archive = "Archive > > >";

  const { data }: any | null = await supabase.from("blogs").select("*");

  return (
    <div className="min-h-screen bg-flare-gradient pt-35 animate-clock-it">
      <div className="px-25 flex justify-end text-2xl tracking-[0.09em]  w-full ">
        <Link
          href="/blogs/archive"
          className="font-bold hover:text-glow cursor-pointer"
        >
          {archive}
        </Link>
      </div>

      <div className="w-full pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-15 gap-y-10 pb-20">
        {data?.map((blog: any) => (
          <div
            className="bg-blue-900 rounded-lg overflow-hidden relative group hover:shadow-[0_0_10px] shadow-neon-blue transition-all mx-4  duration-600"
            key={blog.id}
          >
            <Link href={`/blogs/${blog.slug}`}>
              <div className="w-full h-60 overflow-hidden relative h-80">
                <img
                  src={blog.thumbnail}
                  className="object-cover w-full h-full group-hover:scale-105 transition-all duration-600 ease-in-out"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right-icon absolute hidden group-hover:block z-10 top-2 right-2 lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>

              <div className=" mx-4 my-4 flex flex-col h-30 justify-between">
                <h1 className="text-xl lg:text-2xl font-bold flex flex-col">
                  <em>{blog.title}</em>
                  <em className="text-sm text-gray-400">{blog.category}</em>
                </h1>
                <p className="flex justify-between">
                  <em className="">{blog.author}</em>
                  <em className="text-gray-400">{blog.published_at}</em>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
