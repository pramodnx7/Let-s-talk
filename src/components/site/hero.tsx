import { motion } from "motion/react";
import { ArrowRight, Sparkles, Play, Award } from "lucide-react";
import { PhotoBackdrop } from "./photo-backdrop";
import letsTalkLogo from "@/assets/lets-talk-logo.png";
import type { SiteContent } from "@/lib/site-content";

export function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-background pt-32 pb-20 lg:pt-44 lg:pb-32"
    >
      <PhotoBackdrop />

      {/* mesh + grid background */}
      <div aria-hidden className="absolute inset-0 bg-mesh opacity-70" />
      <div
        aria-hidden
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -top-24 -left-24 size-[420px] rounded-full bg-[color-mix(in_oklab,var(--orange)_18%,transparent)] blur-[110px]"
      />
      <div
        aria-hidden
        className="absolute top-40 -right-20 size-[460px] rounded-full bg-[color-mix(in_oklab,var(--ieee)_15%,transparent)] blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        {/* Main Logo Brand Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-3 rounded-2xl border border-white/90 bg-white/85 px-4 py-2 shadow-soft backdrop-blur-md transition-all duration-300 hover:shadow-lift hover:scale-[1.02]"
        >
          <img src={letsTalkLogo} alt="IEEE LETs Talk Logo" className="h-9 w-auto object-contain" />
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ieee uppercase tracking-wider">
            <Sparkles className="size-3.5 text-orange" />
            <span>{content.eyebrow}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-[2.7rem] leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-[4.2rem]"
        >
          {content.title} <span className="text-gradient-orange">{content.highlightedTitle}</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-body"
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <a
            href="#events"
            className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-orange)] px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
          >
            Upcoming events
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#journey"
            className="inline-flex items-center gap-2 rounded-full border border-ieee/30 bg-white px-7 py-3.5 text-sm font-semibold text-ieee shadow-sm transition-colors duration-300 hover:bg-ieee-tint"
          >
            <Play className="size-4" />
            Past events
          </a>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-6 rounded-3xl border border-border bg-white/70 p-6 shadow-soft backdrop-blur-md"
        >
          {content.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-display text-2xl font-bold text-heading sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs font-medium text-body uppercase tracking-wider">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
