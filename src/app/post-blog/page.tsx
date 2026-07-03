"use client";
import React, { useState } from "react";

type BlogDraft = {
  title: string;
  description: string;
  body: string;
  author: string;
  thumbnail: string;
  category: string;
  read_time: string;
};

const Page = () => {
  const [image, setImage] = useState<File | null>(null);

  const [upload, setUpload] = useState<BlogDraft>({
    title: "",
    description: "",
    body: "",
    author: "",
    thumbnail: "",
    category: "",
    read_time: "",
  });

  // image functions

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      console.error("Please choose an image before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error("Image upload failed", error ?? response.statusText);
      return;
    }

    const result = await response.json();

    const payload = {
      ...upload,
      excerpt: upload.description,
      image: result.url,
      thumbnail: result.url,
    };

    setUpload((prev) => ({ ...prev, thumbnail: result.url }));
    console.log(payload);

    await handledb(payload);
  };

  const handledb = async (payload: BlogDraft & { excerpt: string; image: string }) => {
    const db = await fetch("/api/uploadtodb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!db.ok) {
      const error = await db.json().catch(() => null);
      console.error("Blog save failed", error ?? db.statusText);
      return;
    }

    const saved = await db.json();
    console.log("Blog saved", saved);
  }

  return (
    <div className="w-full flex justify-center mb-20 items-center">
      <div className=" w-3/4  mt-40 p-10 gap-10 rounded-xl bg-white/10 backdrop-md flex shadow-[0_0_20px] shadow-neon-blue">
        <div aria-label="container one" className="w-full h-full text-center">
          <h1 className="text-4xl pb-10 font-semibold uppercase">
            Write Your Blog
          </h1>

          <form
            className="flex flex-col sm:flex-row w-full sm:gap-[5%]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-5 sm:gap-8 md:gap-15 w-full h-full">
              <div className="bg-night px-10 py-2 w-full rounded-lg scale-y-80 sm:scale-y-100 flex items-center justify-between gap-5 focus-within:shadow-[0_0_20px] shadow-neon-blue">
                <label className="text-xl tracking-[0.05em]" htmlFor="title">
                  Title:{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter title.."
                  id="title"
                  className="text-l border-0 h-10 py-2 w-full  focus:outline-none "
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div className="bg-night px-10 py-2 w-full rounded-lg flex items-center scale-y-80 sm:scale-y-100  justify-between gap-5 focus-within:shadow-[0_0_20px] shadow-neon-blue">
                <label className="text-xl tracking-[0.05em]" htmlFor="excerpt">
                  Excerpt:{" "}
                </label>
                <textarea
                  placeholder="Enter description.."
                  maxLength={200}
                  id="excerpt"
                  className="text-l border-0 py-2 w-full h-10 focus:outline-none"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="bg-night px-10 py-2 w-full rounded-lg flex justify-between scale-y-80 sm:scale-y-100  gap-5 focus-within:shadow-[0_0_20px] shadow-neon-blue">
                <label
                  className="text-xl tracking-[0.05em] pt-2"
                  htmlFor="excerpt"
                >
                  Body:{" "}
                </label>
                <textarea
                  placeholder="Write your thoughts here..."
                  maxLength={3000}
                  id="excerpt"
                  className="text-l border-0 py-2 w-full h-40 sm:h-100 focus:outline-none"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, body: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:gap-8 md:gap-15 w-full h-full">
              <div className="bg-night px-10 py-2 w-full rounded-lg flex items-center scale-y-80 sm:scale-y-100  justify-between gap-5 focus-within:shadow-[0_0_20px] shadow-neon-blue">
                <label className="text-xl tracking-[0.05em]" htmlFor="author">
                  Author:{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter author name.."
                  id="author"
                  className="text-l border-0 h-10 py-2 w-full  focus:outline-none"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, author: e.target.value }))
                  }
                />
              </div>

              <div className="bg-night px-10 py-2 w-full rounded-lg flex items-center scale-y-80 sm:scale-y-100  justify-between gap-5 focus-within:shadow-[0_0_20px] shadow-neon-blue">
                <label className="text-xl tracking-[0.05em]" htmlFor="category">
                  Category:{" "}
                </label>
                <input
                  type="text"
                  placeholder="Enter category..."
                  id="category"
                  className="text-l border-0 h-10 py-2 w-full  focus:outline-none"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, category: e.target.value }))
                  }
                />
              </div>

              <div className="bg-night px-10 py-2 w-full rounded-lg flex items-center scale-y-80 sm:scale-y-100  justify-between gap-5 focus-within:shadow-[0_0_20px] shadow-neon-blue">
                <label
                  className="text-xl tracking-[0.05em]"
                  htmlFor="read time"
                >
                  Approx read time (in minutes):{" "}
                </label>
                <input
                  type="number"
                  placeholder="Enter category..."
                  id="read time"
                  className="text-l border-0 h-10 py-2 w-full  focus:outline-none"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({
                      ...prev,
                      read_time: `${e.target.value} mins`,
                    }))
                  }
                />
              </div>

              <div className="relative focus-within:shadow-[0_0_20px] shadow-neon-blue">
                <div className="bg-black px-10  w-full rounded-lg scale-y-80 sm:scale-y-100  flex items-center justify-center p-3  gap-5  relative  hover:shadow-[0_0_20px] shadow-neon-blue">
                  <label
                    className="text-xl tracking-[0.05em] w-full h-full flex items-center justify-center gap-5 "
                    htmlFor="thumbnail"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-image-icon lucide-image"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    Upload Thumbnail{" "}
                  </label>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp"
                    placeholder="Enter author name.."
                    id="thumbnail"
                    className="text-l border-0 opacity-0 absolute z-[-2] inset-0 focus:outline-none"
                    required
                    onChange={handleImageChange}
                  />
                </div>
                {image && (
                  <p className="text-red-500 mt-4 absolute bottom-[-30] left-0 right-0">
                    {image.name}
                  </p>
                )}
              </div>

              <div className="bg-pink-900 border-1 hover:bg-neon-pink border-white px-10 py-2 w-full rounded-lg flex items-center scale-y-80 sm:scale-y-100  justify-between gap-5">
                <input
                  type="submit"
                  value="Post Blog"
                  placeholder="Enter author name.."
                  id="author"
                  className="text-l font-semibold border-0 h-10 py-2 text-xl tracking-[0.05em] w-full focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
