import Image from "next/image";
import heroImg from "../../assets/hero_img.jpg";

export default function Home() {
  return (
    <section className="relative isolate">
      {/* Background illustration placeholder */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_top_right,rgba(16,185,129,0.08),transparent_60%),radial-gradient(40rem_30rem_at_bottom_left,rgba(0,0,0,0.06),transparent_60%)]"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-neutral-100">
              Art Gallery of Sri Lanka
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-300">
              Discover timeless masterpieces and contemporary works from Sri
              Lankan artists. Curated collections with a modern yet vintage
              sensibility.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#collections"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 active:scale-95"
              >
                Explore Collections
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            {/* Hero image (imported for Next.js optimization) */}
            <Image
              src={heroImg}
              alt="Hero image"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}
