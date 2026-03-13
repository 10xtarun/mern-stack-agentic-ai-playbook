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
      color: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: "data-science",
      name: "Data Science",
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
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-background">
      {/* Header / Navbar */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 border-b border-foreground/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-gradient">Intern</span>Age
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="#tracks" className="text-sm font-medium hover:text-primary transition-colors">Tracks</Link>
          <Link href="#support" className="text-sm font-medium hover:text-primary transition-colors">Support</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold border border-foreground/10 hover:bg-foreground/5 transition-colors">
            Log In
          </button>
          <button className="h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            Join Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-medium text-primary mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Select Your Learning Path
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up text-balance">
            Your Career in <br className="hidden md:block" />
            <span className="text-gradient">Professional Engineering.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 mb-10 animate-fade-in leading-relaxed text-balance">
            Choose a specialized track designed for high-impact internship preparation. Pure hands-on, no fluff.
          </p>
        </div>
      </section>

      {/* Track Selection Grid */}
      <section id="tracks" className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {tracks.map((track, idx) => (
          <Link 
            key={track.id}
            href={`/${track.id}`}
            className={`group relative flex flex-col p-8 rounded-3xl border ${track.border} bg-background hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
          >
            {/* Hover Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
            
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

      {/* Footer */}
      <footer className="w-full border-t border-foreground/5 bg-foreground/[0.02] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight mb-6 block">
              <span className="text-gradient">Intern</span>Age
            </Link>
            <p className="max-w-md text-foreground/60 leading-relaxed">
              Empowering the next generation of engineers through rigorous, hands-on internship programs and expert-led tracks.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="#tracks" className="hover:text-primary">Tracks</Link></li>
              <li><Link href="#" className="hover:text-primary">Internship Diary</Link></li>
              <li><Link href="#" className="hover:text-primary">Capstone Projects</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">Getting Started</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Community</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-foreground/5 text-center text-sm text-foreground/40">
          &copy; {new Date().getFullYear()} InternAge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
