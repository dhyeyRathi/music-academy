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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [upload, setUpload] = useState<BlogDraft>({
    title: "",
    description: "",
    body: "",
    author: "",
    thumbnail: "",
    category: "",
    read_time: "",
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    if (!image) {
      setStatusMessage({ type: "error", text: "Please select a thumbnail image before submitting." });
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message ?? "Image upload failed");
      }

      const result = await response.json();

      const payload = {
        ...upload,
        excerpt: upload.description,
        image: result.url,
        thumbnail: result.url,
      };

      setUpload((prev) => ({ ...prev, thumbnail: result.url }));
      await handledb(payload);
      
      setStatusMessage({ type: "success", text: "Blog posted successfully!" });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: "error", text: err.message || "Failed to post blog." });
    } finally {
      setIsSubmitting(false);
    }
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
      throw new Error(error?.message ?? "Failed to save blog details to database");
    }

    const saved = await db.json();
    console.log("Blog saved", saved);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white border border-[#E8E2D5] rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-[#1C1917] tracking-tight">
            Publish an Article
          </h1>
          <p className="text-[#57534E] mt-2">
            Share your expertise, stories, or announcements with the community.
          </p>
        </div>

        {statusMessage && (
          <div
            className={`p-4 mb-8 rounded-xl text-sm font-medium ${
              statusMessage.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
          {/* Main Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 block" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="The art of writing..."
                  id="title"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E2D5] focus:border-[#B89A6C] focus:ring-1 focus:ring-[#B89A6C] text-[#1C1917] placeholder:text-stone-400 focus:outline-none transition-all"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 block" htmlFor="excerpt">
                  Excerpt / Subtitle
                </label>
                <textarea
                  placeholder="A short summary of your article..."
                  maxLength={200}
                  id="excerpt"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E2D5] focus:border-[#B89A6C] focus:ring-1 focus:ring-[#B89A6C] text-[#1C1917] placeholder:text-stone-400 focus:outline-none transition-all h-24 resize-none"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 block" htmlFor="body">
                  Content Body
                </label>
                <textarea
                  placeholder="Write your thoughts here..."
                  maxLength={3000}
                  id="body"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E2D5] focus:border-[#B89A6C] focus:ring-1 focus:ring-[#B89A6C] text-[#1C1917] placeholder:text-stone-400 focus:outline-none transition-all h-60 sm:h-72 resize-y"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, body: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 block" htmlFor="author">
                  Author Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  id="author"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E2D5] focus:border-[#B89A6C] focus:ring-1 focus:ring-[#B89A6C] text-[#1C1917] placeholder:text-stone-400 focus:outline-none transition-all"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, author: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 block" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Life, Tutorials, Tech"
                  id="category"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E2D5] focus:border-[#B89A6C] focus:ring-1 focus:ring-[#B89A6C] text-[#1C1917] placeholder:text-stone-400 focus:outline-none transition-all"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({ ...prev, category: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 block" htmlFor="read_time">
                  Approximate Read Time (in minutes)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  id="read_time"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E2D5] focus:border-[#B89A6C] focus:ring-1 focus:ring-[#B89A6C] text-[#1C1917] placeholder:text-stone-400 focus:outline-none transition-all"
                  required
                  onChange={(e) =>
                    setUpload((prev) => ({
                      ...prev,
                      read_time: `${e.target.value} mins`,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 block">
                  Thumbnail Image
                </label>
                <div className="relative group border-2 border-dashed border-[#E8E2D5] hover:border-[#B89A6C] rounded-2xl p-6 transition-all bg-stone-50/50 flex flex-col items-center justify-center text-center cursor-pointer">
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp"
                    id="thumbnail"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                    onChange={handleImageChange}
                  />
                  <div className="text-[#B89A6C] mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#1C1917] block">
                    {image ? "Change Thumbnail" : "Upload Thumbnail Image"}
                  </span>
                  <span className="text-xs text-[#57534E] mt-1 block">
                    Supports PNG, JPG, JPEG or WEBP
                  </span>
                </div>
                {image && (
                  <p className="text-xs font-medium text-[#B89A6C] mt-2 block text-center">
                    Selected: {image.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#E8E2D5]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#B89A6C] text-white font-semibold rounded-xl hover:bg-[#9E8155] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Uploading & Posting...
                </>
              ) : (
                "Publish Article"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
