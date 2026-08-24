import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import letsTalkLogo from "@/assets/lets-talk-logo.png";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Our Journey", href: "#journey" },
  { label: "Gallery", href: "#gallery" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass-panel shadow-soft" : "border border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="grid size-10 place-items-center rounded-xl border border-white/80 bg-white/95 p-1 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src={letsTalkLogo}
              alt="IEEE LETs talk logo"
              className="size-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[0.95rem] leading-tight font-bold tracking-tight text-heading">
              IEEE <span className="text-ieee">LETs</span> talk
            </span>
            <span className="text-[0.62rem] font-medium text-body">YP Sri Lanka</span>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline relative text-sm font-medium text-body transition-colors hover:text-heading"
            >
              {l.label}
              {active === l.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-orange"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#whatsapp"
            className="group hidden items-center gap-2 rounded-full bg-[image:var(--gradient-orange)] px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            <MessageCircle className="size-4" />
            Join WhatsApp
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-border bg-white text-ieee lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-panel mx-auto mt-2 max-w-6xl rounded-3xl p-4 lg:hidden"
          >
            <div className="grid gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-body transition-colors hover:bg-ieee-tint hover:text-ieee"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#whatsapp"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-orange)] px-4 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="size-4" />
                Join WhatsApp Channel
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
