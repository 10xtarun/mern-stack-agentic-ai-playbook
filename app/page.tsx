import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">

        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000 pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center animate-slide-up">

          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Comprehensive 12-Week MERN Course is Ready
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in [animation-delay:200ms] text-balance">
            Master the MERN Stack. <br className="hidden md:block" />
            <span className="text-gradient">Build Your Real Future.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/70 mb-10 animate-fade-in [animation-delay:400ms] leading-relaxed text-balance">
            A purely hands-on, 12-week comprehensive program featuring an integrated Daily Internship Diary. From zero to capstone deployments with expert portfolio building.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:600ms] w-full justify-center">
            <Link
              href="/dashboard"
              className="flex h-12 md:h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-white transition-all hover:bg-primary-hover shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1"
            >
              Start Course Now
            </Link>

            <Link
              href="/syllabus"
              className="flex h-12 md:h-14 items-center justify-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm px-8 text-base font-semibold transition-all hover:bg-foreground/5 hover:border-foreground/30"
            >
              View Full Syllabus
            </Link>
          </div>

        </div>
      </section>

      {/* Features highlight */}
      <section className="w-full py-20 px-6 border-t border-foreground/5 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "No AI Foundation", desc: "Build pure HTML/CSS without AI crutches before touching advanced toolchains." },
            { title: "Daily Internship Diary", desc: "Prove your work. Generate daily tracking logs that serve as concrete portfolio evidence." },
            { title: "Production Capstones", desc: "Build end-to-end applications mimicking real-world startup technical requirements." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-foreground/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/70 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
