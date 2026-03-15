import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code } from 'lucide-react';

export default function RealPortfolio() {
  return (
    <div className="real-portfolio relative z-20 w-full min-h-screen bg-[#fcfcfc] text-[#1a1a1a] pt-24 pb-32 px-6 sm:px-12 md:px-24">
      <div className="max-w-4xl mx-auto">

        {/* Header / Bio */}
        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 rotate-[-1deg]"
          >
            hi, i'm [Name].
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl"
          >
            <p className="mb-4">
              I don't actually call myself an "Architect of the Future" in real life.
              I'm actually just a software engineer who loves figuring out how things work
              and making them look nice on the screen.
            </p>
            <p>
              I build web apps, tweak performance, and occasionally completely over-engineer
              my own portfolio just to make a point.
            </p>
          </motion.div>

          {/* Doodle style line */}
          <svg className="w-64 h-8 mt-8 text-gray-300 pointer-events-none" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 10C35.5 -2.5 78.5 21.5 125 15C160.5 10 185.5 15 197.5 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </section>

        {/* Projects Section */}
        <section className="mb-32">
          <h3 className="text-3xl font-bold border-b-2 border-dashed border-gray-300 pb-2 mb-10 w-max rotate-[1deg]">
            stuff I built
          </h3>

          <div className="block space-y-16">
            {[
              {
                title: "Real Project One",
                desc: "A genuine application I built to solve a real problem. No quantum reactivity, just solid React and good UX.",
                tech: ["React", "TypeScript", "Tailwind"],
                link: "#",
                github: "#",
                color: "bg-amber-100"
              },
              {
                title: "Another Cool Thing",
                desc: "Something I made over a weekend. It was mostly an excuse to learn Framer Motion to be honest. But it turned out pretty neat.",
                tech: ["Next.js", "Framer Motion", "Supabase"],
                link: "#",
                github: "#",
                color: "bg-blue-100"
              },
              {
                title: "Open Source Tool",
                desc: "A small utility I published on npm that somehow got 500 stars. Still trying to figure out why people use it, but I'm proud of it.",
                tech: ["Node.js", "CLI", "Jest"],
                link: "#",
                github: "#",
                color: "bg-rose-100"
              }
            ].map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative p-8 md:p-10 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-black ${p.color}`}
              >
                <div className="absolute top-4 right-4 text-black/20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4" /><path d="M13 7 8.7 11.3a2.1 2.1 0 0 0 0 3l1.4 1.4a2.1 2.1 0 0 0 3 0L17 11" /><path d="m19 5-3-3-9 9-4.2 8.5a1 1 0 0 0 1.2 1.2L12 16.5l3.5-3.5 1-1Z" /></svg>
                </div>

                <h4 className="text-2xl font-bold mb-3">{p.title}</h4>
                <p className="text-gray-800 text-lg mb-6 leading-relaxed max-w-xl">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/60 border border-black/10 rounded-md text-sm font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 font-semibold text-lg">
                  <a href={p.link} className="inline-flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                    <ExternalLink size={20} /> Live Demo
                  </a>
                  <a href={p.github} className="inline-flex items-center gap-2 hover:underline decoration-2 underline-offset-4">
                    <Code size={20} /> Source Code
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Small honest note */}
        <section className="mb-32 text-center text-gray-500 italic text-xl">
          "I like making things more than talking about myself."
        </section>

        {/* Contact */}
        <section>
          <h3 className="text-3xl font-bold border-b-2 border-dashed border-gray-300 pb-2 mb-8 w-max">
            let's talk
          </h3>
          <p className="text-xl mb-8">
            If you want to build something real, or just say hi, feel free to reach out. I promise I won't use AI buzzwords in my email replies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="mailto:hello@example.com" className="inline-flex justify-center items-center gap-3 px-6 py-4 bg-black text-white hover:bg-gray-800 rounded-xl font-bold text-xl transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              <Mail /> Get in touch
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-3 px-6 py-4 bg-white border-2 border-black hover:bg-gray-50 rounded-xl font-bold text-xl transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <Github /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-3 px-6 py-4 bg-white border-2 border-black hover:bg-white rounded-xl font-bold text-xl transition-colors shadow-[4px_4px_0px_rgba(0,119,181,1)] hover:shadow-[2px_2px_0px_rgba(0,119,181,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
              <Linkedin className="text-[#0077b5]" /> LinkedIn
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
