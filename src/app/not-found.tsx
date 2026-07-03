import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-flare-gradient animate-clock-it flex items-center justify-center px-6 pt-32 text-white">
      <section className="w-full max-w-3xl rounded-3xl border border-neon-blue/40 bg-night/80 shadow-[0_0_30px] shadow-neon-blue/30 backdrop-blur-md p-8 sm:p-12 text-center">
        <p className="text-sm sm:text-base uppercase tracking-[0.4em] text-gray-300">
          Page not found
        </p>

        <h1 className="mt-6 text-5xl sm:text-7xl font-bold text-neon-pink">
          404
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          The page you are looking for does not exist, was moved, or may have
          been removed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-border-gradient p-[2px] text-white hover:scale-105 transition-transform duration-300"
          >
            <span className="block rounded-full bg-night px-6 py-3 font-semibold tracking-wide">
              Go Home
            </span>
          </Link>

          <Link
            href="/blogs"
            className="rounded-full border border-neon-blue/50 px-6 py-3 font-semibold tracking-wide text-white hover:bg-white/10 transition-colors duration-300"
          >
            Browse Blogs
          </Link>
        </div>
      </section>
    </main>
  );
}