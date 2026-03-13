import Link from "next/link";

export default function LandingPage() {
  const tracks = [
    {
      id: "mern",
      name: "MERN Stack",
      description: "Full-stack development with MongoDB, Express, React, and Node.js.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: "from-primary to-accent-2",
      bgLight: "bg-primary/10",
      border: "border-primary/20"
    },
    {
      id: "data-science",
      name: "Data Science & AI",
      description: "Explore data analysis, machine learning, and statistical modeling.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      id: "cloud-devops",
      name: "Cloud & DevOps",
      description: "Master AWS, Azure, Docker, Kubernetes, and CI/CD pipelines.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "from-orange-500 to-red-500",
      bgLight: "bg-orange-500/10",
      border: "border-orange-500/20"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-transparent">
      {/* Header / Navbar */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 bg-glass border-b border-white/5 sticky top-0 z-50">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-gradient">Course</span>Playbook
        </Link>
        <div className="flex items-center gap-4">
          <Link href="#tracks" className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-widest px-2 py-1">Tracks</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-medium text-primary mb-8 animate-fade-in backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Select Your Learning Path
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up text-balance">
            Your Ultimate <br className="hidden md:block" />
            <span className="text-gradient">Engineering Playbook.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 mb-10 animate-fade-in leading-relaxed text-balance [animation-delay:200ms]">
            Choose a specialized track designed for high-impact professional preparation. Pure hands-on, no fluff.
          </p>
        </div>
      </section>

      {/* Track Selection Grid */}
      <section id="tracks" className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {tracks.map((track, idx) => (
          <Link 
            key={track.id}
            href={`/${track.id}`}
            className={`group relative flex flex-col p-8 rounded-3xl border ${track.border} bg-bg-card hover:bg-bg-card-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-slide-up`}
            style={{ animationDelay: `${300 + idx * 100}ms` }}
          >
            {/* Hover Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
            
            <div className={`h-16 w-16 rounded-2xl ${track.bgLight} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              <div className={`text-transparent bg-clip-text bg-gradient-to-br ${track.color}`}>
                {track.icon}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{track.name}</h3>
            <p className="text-foreground/60 leading-relaxed mb-auto">{track.description}</p>
            
            <div className="mt-8 flex items-center font-bold text-sm tracking-wide uppercase">
              Explore Track 
              <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        ))}
      </section>

    </div>
  );
}
