import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export const runtime = "nodejs";

const sanityToken = process.env.NEXT_SANITY_TOKEN;

if (!sanityToken) {
  throw new Error("Missing environment variable: NEXT_SANITY_TOKEN");
}

const sanityClient = createClient({
  projectId: "pwh4srba",
  dataset: "production",
  apiVersion: "2026-07-02",
  useCdn: false,
  token: sanityToken,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Missing image file" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const asset = await sanityClient.assets.upload("image", buffer, {
      filename: image.name,
    });

    return NextResponse.json({
      url: asset.url,
      id: asset._id,
    });
  } catch (error) {
    console.error("Image upload failed", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}