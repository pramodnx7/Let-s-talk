import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Mail,
  MessageCircle,
  MessagesSquare,
  Mic,
  Network,
  Quote,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Reveal, RevealGroup, fadeUp } from "./motion-primitives";
import { submitContactMessage } from "@/lib/content-actions";
import type { SiteContent } from "@/lib/site-content";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

function SectionHead({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-3xl leading-[1.14] font-bold tracking-tight sm:text-[2.6rem]">
        {title}
      </h2>
      {copy && <p className="mt-4 text-base leading-relaxed text-body">{copy}</p>}
    </Reveal>
  );
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none -mt-px ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 60" className="block h-10 w-full" preserveAspectRatio="none">
        <path
          d="M0 30 C240 60 480 0 720 22 C960 44 1200 58 1440 26 L1440 60 L0 60 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

const pillarIcons = {
  lightbulb: Lightbulb,
  mic: Mic,
  brain: BrainCircuit,
  network: Network,
};

const eventIcons = {
  mic: Mic,
  brain: BrainCircuit,
  lightbulb: Lightbulb,
};

const journeyIcons = {
  mic: Mic,
  graduation: GraduationCap,
  sparkles: Sparkles,
  brain: BrainCircuit,
  users: Users,
};

const galleryImages = {
  "gallery-1": g1,
  "gallery-2": g2,
  "gallery-3": g3,
  "gallery-4": g4,
};

export function About({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="about" className="relative overflow-hidden bg-ieee-tint py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHead
            eyebrow={content.eyebrow}
            title={
              <>
                {content.title} <span className="text-ieee">{content.highlightedWords}</span> and{" "}
                <span className="text-gradient-orange">{content.accentWords}</span>.
              </>
            }
            copy={content.copy}
          />
          <Reveal delay={0.1} className="lg:pb-2">
            <div className="card-surface flex gap-4 p-6 shadow-soft">
              <Quote className="size-7 shrink-0 text-orange" />
              <div>
                <p className="text-[0.95rem] leading-relaxed text-body italic">"{content.quote}"</p>
                <span className="mt-3 block text-xs font-semibold text-ieee not-italic">
                  {content.quoteBy}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.pillars.map((p) => {
            const Icon = pillarIcons[p.icon];
            return (
              <motion.div key={p.title} variants={fadeUp} className="card-surface group p-7">
                <span
                  className={`grid size-12 place-items-center rounded-2xl ${
                    p.accent ? "bg-orange-tint" : "bg-ieee-tint"
                  }`}
                >
                  <Icon className={`size-5.5 ${p.accent ? "text-orange" : "text-ieee"}`} />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-heading">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-body">{p.copy}</p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
      <div className="absolute inset-x-0 bottom-0 text-background">
        <WaveDivider />
      </div>
    </section>
  );
}

export function Events({ events }: { events: SiteContent["events"] }) {
  return (
    <section id="events" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Events"
            title={
              <>
                Coming up <span className="text-gradient-orange">next...</span>
              </>
            }
            copy="Explore our upcoming leadership talks, industry workshops, and networking experiences designed to inspire, connect, and prepare the next generation of professionals."
          />
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-ieee/30 bg-white px-5 py-3 text-sm font-semibold text-ieee shadow-sm transition-colors hover:bg-ieee-tint"
            >
              Get notified for sessions
              <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
          {events.map((e) => {
            const Icon = eventIcons[e.icon];
            return (
              <motion.article
                key={e.title}
                variants={fadeUp}
                className={`card-surface relative overflow-hidden p-7 transition-all duration-300 hover:shadow-lift ${
                  e.featured ? "border-orange/30" : ""
                }`}
              >
                {e.featured && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1.5 bg-[image:var(--gradient-orange)]"
                  />
                )}
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${
                      e.featured ? "bg-orange-tint" : "bg-ieee-tint"
                    }`}
                  >
                    <Icon className={`size-5.5 ${e.featured ? "text-orange" : "text-ieee"}`} />
                  </span>
                  <span className="rounded-full bg-surface-gray px-3 py-1 text-[0.72rem] font-semibold tracking-wide text-ieee uppercase">
                    {e.badge}
                  </span>
                </div>
                <span className="mt-6 inline-block text-xs font-semibold tracking-wider text-orange uppercase">
                  {e.tag}
                </span>
                <h3 className="mt-2 text-xl leading-snug font-bold text-heading">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{e.description}</p>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-body">
                    <CalendarDays className="size-3.5 text-orange" />
                    {e.dateLabel}
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ieee link-underline"
                  >
                    Register Interest <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export function PastSessions({ tracks }: { tracks: SiteContent["journeyTracks"] }) {
  return (
    <section id="journey" className="relative bg-orange-tint/40 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          eyebrow="Milestones"
          title={
            <>
              Our journey <span className="text-gradient-orange">so far</span>
            </>
          }
          copy="A track record of empowering young professionals, driving technical excellence, and creating lasting industry connections since 2017."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((item, idx) => {
            const Icon = journeyIcons[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className={`card-surface group flex flex-col justify-between p-7 shadow-soft transition-all duration-300 hover:shadow-lift ${
                  idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-orange-tint text-orange">
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full bg-ieee-tint px-2.5 py-0.5 text-[0.7rem] font-semibold text-ieee">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-heading">{item.title}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-orange">{item.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{item.description}</p>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <span className="flex items-center gap-1 text-xs font-medium text-body">
                    <CheckCircle2 className="size-3.5 text-orange" />
                    Delivered with industry leaders
                  </span>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Gallery({ shots }: { shots: SiteContent["gallery"] }) {
  return (
    <section id="gallery" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead
          center
          eyebrow="Visit our gallery"
          title={
            <>
              Moments from the <span className="text-gradient-orange">community</span>
            </>
          }
          copy="Snapshots of passion, collaboration, and learning from IEEE LETs Talk sessions across Sri Lanka."
        />
        <RevealGroup className="mt-14 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-4">
          {shots.map((s) => (
            <motion.figure
              key={s.alt}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-3xl border border-border shadow-soft ${s.span ?? ""}`}
            >
              <img
                src={galleryImages[s.image]}
                alt={s.alt}
                loading="lazy"
                width={1000}
                height={700}
                className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
              />
              <div
                aria-hidden
                className="absolute inset-0 flex items-end bg-[linear-gradient(to_top,color-mix(in_oklab,var(--ieee-deep)_70%,transparent),transparent_60%)] p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <p className="text-xs font-medium text-white/90">{s.caption}</p>
              </div>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Awards({ content }: { content: SiteContent["awards"] }) {
  return (
    <section
      id="awards"
      className="relative overflow-hidden bg-ieee-deep py-24 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-20 size-[480px] rounded-full bg-[color-mix(in_oklab,var(--orange)_20%,transparent)] blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-20 size-[420px] rounded-full bg-[color-mix(in_oklab,var(--ieee)_30%,transparent)] blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/15 px-4 py-1.5 text-xs font-semibold text-orange">
            <Trophy className="size-3.5" />
            Awards &amp; Recognition
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-orange px-3.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  {content.label}
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  {content.awardName}
                </h3>
                <p className="mt-2 text-sm font-medium text-orange">{content.program}</p>
                <p className="mt-5 text-sm leading-relaxed text-white/80">{content.description}</p>
              </div>

              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[image:var(--gradient-orange)] shadow-glow">
                  <Award className="size-8 text-white" />
                </div>
                <h4 className="font-display text-lg font-bold text-white">Vision to Value</h4>
                <p className="text-xs text-white/70">
                  Business Analysis Experience Program recognized for exceptional collaborative
                  impact.
                </p>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-orange">
                  <CheckCircle2 className="size-3.5" /> Verified Section Recognition
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Partners({ partners }: { partners: SiteContent["partners"] }) {
  return (
    <section className="bg-surface-gray py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <span className="section-eyebrow">Ecosystem</span>
          <h2 className="mt-3 text-2xl font-bold text-heading sm:text-3xl">Our partners</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-body">
            Collaborating with leading industry organizations, student branches, and IEEE affinity
            groups.
          </p>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <motion.div
              key={p}
              variants={fadeUp}
              className="flex h-20 items-center justify-center rounded-2xl border border-border bg-white px-3 text-center text-[0.8rem] font-semibold text-ieee shadow-soft transition-all duration-300 hover:border-orange/40 hover:shadow-md"
            >
              {p}
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function StayConnected({ content }: { content: SiteContent["connected"] }) {
  return (
    <section id="whatsapp" className="bg-background px-5 py-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[image:linear-gradient(135deg,#002B5B_0%,#001833_100%)] px-8 py-16 text-center text-white shadow-lift sm:px-16">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 size-80 rounded-full bg-[color-mix(in_oklab,var(--orange)_25%,transparent)] blur-[100px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/15 px-4 py-1.5 text-xs font-semibold text-orange">
              <MessageCircle className="size-3.5" />
              Official Channel
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl leading-tight font-bold text-white sm:text-[2.6rem]">
              {content.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-white/85">
              {content.copy}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[image:var(--gradient-orange)] px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4.5" />
                {content.primaryCta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
              >
                <CalendarDays className="size-4" />
                {content.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Contact({ content }: { content: SiteContent["contact"] }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-ieee-tint py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute -bottom-24 -left-16 size-[360px] rounded-full bg-[color-mix(in_oklab,var(--orange)_16%,transparent)] blur-[110px]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead
            eyebrow="Get in Touch"
            title={
              <>
                Connect, collaborate or <span className="text-gradient-orange">partner</span> with
                us
              </>
            }
            copy={content.copy}
          />
          <Reveal delay={0.1} className="mt-9 space-y-3">
            {[
              {
                icon: Mail,
                label: content.email,
                desc: "Official inquiries & proposals",
              },
              {
                icon: MessageCircle,
                label: content.whatsappLabel,
                desc: "Instant event alerts & community updates",
              },
              {
                icon: MessagesSquare,
                label: content.organization,
                desc: "National professional development platform",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3.5 rounded-2xl border border-border bg-white px-5 py-4 shadow-soft"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-orange-tint text-orange">
                  <c.icon className="size-4.5" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-heading">{c.label}</span>
                  <span className="text-xs text-body">{c.desc}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            className="card-surface p-7 sm:p-9"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);
              submitContactMessage({
                data: {
                  name: String(formData.get("name") ?? ""),
                  email: String(formData.get("email") ?? ""),
                  topic: String(formData.get("topic") ?? ""),
                  message: String(formData.get("message") ?? ""),
                },
              })
                .then(() => {
                  form.reset();
                  alert("Thank you! Your message has been received.");
                })
                .catch(() => alert("Sorry, your message could not be sent. Please try again."));
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold tracking-wide text-body uppercase">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-heading outline-none transition-colors focus:border-ieee"
                  placeholder="Your Name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold tracking-wide text-body uppercase">
                  Email
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-heading outline-none transition-colors focus:border-ieee"
                  placeholder="name@organization.com"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-xs font-semibold tracking-wide text-body uppercase">
                Topic / Inquiry
              </span>
              <input
                name="topic"
                className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-heading outline-none transition-colors focus:border-ieee"
                placeholder="Upcoming sessions, Partnership, Speaking, General inquiry..."
              />
            </label>
            <label className="mt-4 block">
              <span className="text-xs font-semibold tracking-wide text-body uppercase">
                Message
              </span>
              <textarea
                rows={4}
                name="message"
                className="mt-2 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-heading outline-none transition-colors focus:border-ieee"
                placeholder="How would you like to connect with IEEE LETs Talk?"
              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[image:var(--gradient-orange)] px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
