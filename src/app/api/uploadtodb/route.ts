import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const generateSlug = (title: string, blogId: number | string) => {
  return `${title.trim().toLowerCase().replace(/\s+/g, "-")}-${blogId}`;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const formData = await request.json();

    const { title, excerpt, body, author, image, category, read_time } =
      formData;

    if (
      !title ||
      !body ||
      !excerpt ||
      !author ||
      !image ||
      !category ||
      !read_time
    )
      return NextResponse.json(
        { error: "required fields missing" },
        { status: 400 },
      );

    const temporarySlug = generateSlug(title, crypto.randomUUID());

    const { data:blog, error:blogError } = await supabase
      .from("blogs")
      .insert([
        {
          title: title,
          slug: temporarySlug,
          excerpt: excerpt,
          author: author,
          published_at: new Date().toISOString().split("T")[0],
          category: category,
          read_time: read_time,
          thumbnail: image,
          year: new Date().getFullYear().toString()
        },
      ])
      .select().single();

       if (blogError) {
      return NextResponse.json({ error: blogError.message }, { status: 500 })
    }

    const finalSlug = generateSlug(title, blog.id);

    const { error: slugError } = await supabase
      .from("blogs")
      .update({ slug: finalSlug })
      .eq("id", blog.id);

    if (slugError) {
      await supabase.from("blogs").delete().eq("id", blog.id);
      return NextResponse.json({ error: slugError.message }, { status: 500 });
    }

    const {  error: bodyError } = await supabase
      .from("blog_bodies")
      .insert([
        {
         blog_id: blog.id,
         body: body
        },
      ])
      .select();

       if (bodyError) {
        await supabase.from("blogs").delete().eq("id", blog.id);
      return NextResponse.json(
        { error: bodyError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      blog
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
