import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100svh-80px)] w-full flex items-center justify-center px-6 py-12 bg-warm-bg text-warm-text-primary">
      <section className="w-full max-w-2xl bg-warm-card border border-warm-border rounded-3xl p-8 sm:p-16 text-center shadow-sm">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-elegant-gold mb-6">
          Page not found
        </p>

        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-elegant-clay mb-6">
          404
        </h1>

        <p className="text-lg sm:text-xl text-warm-text-secondary max-w-md mx-auto leading-relaxed mb-10 font-light">
          The page you are looking for does not exist, was moved, or may have been removed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-elegant-gold text-white font-medium rounded-xl hover:bg-elegant-gold-hover transition-colors shadow-sm text-center"
          >
            Go Home
          </Link>

          <Link
            href="/blogs"
            className="w-full sm:w-auto px-6 py-3 border border-warm-border text-warm-text-secondary hover:text-warm-text-primary hover:border-warm-text-secondary font-medium rounded-xl transition-all text-center"
          >
            Browse Blogs
          </Link>
        </div>
      </section>
    </main>
  );
}