export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    highlightedWords: string;
    accentWords: string;
    copy: string;
    quote: string;
    quoteBy: string;
    pillars: Array<{
      icon: "lightbulb" | "mic" | "brain" | "network";
      title: string;
      copy: string;
      accent?: boolean;
    }>;
  };
  events: Array<{
    tag: string;
    title: string;
    description: string;
    icon: "mic" | "brain" | "lightbulb";
    badge: string;
    featured?: boolean;
    dateLabel: string;
  }>;
  journeyTracks: Array<{
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    icon: "mic" | "graduation" | "sparkles" | "brain" | "users";
  }>;
  gallery: Array<{
    image: "gallery-1" | "gallery-2" | "gallery-3" | "gallery-4";
    alt: string;
    caption: string;
    span?: string;
  }>;
  awards: {
    title: string;
    awardName: string;
    program: string;
    description: string;
    label: string;
  };
  partners: string[];
  connected: {
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  contact: {
    email: string;
    whatsappLabel: string;
    organization: string;
    copy: string;
  };
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
};

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "IEEE Young Professionals Sri Lanka",
    title: "Where Future Professionals Meet",
    highlightedTitle: "Industry Leaders",
    description:
      "From inspiring leadership talks to hands-on workshops, IEEE LETs talk brings students and industry together to learn, collaborate, and create what's next. Experience real stories, real leaders, and real opportunities that shape the next generation of professionals with us.",
    stats: [
      { value: "50+", label: "Events" },
      { value: "4000+", label: "Participants" },
      { value: "30+", label: "Industry Leaders" },
    ],
  },
  about: {
    eyebrow: "About LETs talk",
    title: "Empowering Careers Through",
    highlightedWords: "Conversations, Learning",
    accentWords: "Leadership",
    copy: "IEEE LETs Talk is the flagship professional development initiative of IEEE Young Professionals Sri Lanka. Since 2017, it has connected students, graduates, and young professionals with industry experts through leadership talks, technical workshops, networking experiences, and career-focused learning opportunities that bridge the gap between academia and industry.",
    quote:
      "Bridging the gap between academia and industry by turning passion and curiosity into career-defining professional opportunities.",
    quoteBy: "IEEE Young Professionals Sri Lanka",
    pillars: [
      {
        icon: "lightbulb",
        title: "Industry Insights",
        copy: "Learn directly from founders, CEOs, technology leaders, and experienced professionals who share real-world knowledge and practical career advice.",
        accent: true,
      },
      {
        icon: "mic",
        title: "Leadership Talks",
        copy: "Gain valuable perspectives through Road to Ignite sessions featuring inspiring conversations on leadership, entrepreneurship, innovation, and personal growth.",
      },
      {
        icon: "brain",
        title: "Hands-on Workshops",
        copy: "Build practical skills through interactive workshops designed with industry experts across software engineering, project management, business analysis, data science, cybersecurity, and more.",
      },
      {
        icon: "network",
        title: "Professional Network",
        copy: "Connect with students, graduates, industry professionals, ecosystem partners, and the wider IEEE community while building meaningful professional relationships.",
      },
    ],
  },
  events: [
    {
      tag: "Leadership Talk",
      title: "Road to Ignite - Session 12",
      description:
        "Inspiring conversations featuring experienced leaders exploring leadership, innovation, and career trajectories.",
      icon: "mic",
      badge: "Session 12",
      featured: true,
      dateLabel: "Coming Soon",
    },
    {
      tag: "Hands-on Workshop",
      title: "Data Science Workshop",
      description:
        "Interactive, practical session on data analysis, machine learning pipelines, and industry applications.",
      icon: "brain",
      badge: "Technical Series",
      dateLabel: "Coming Soon",
    },
    {
      tag: "Special Edition",
      title: "InsightX - Beyond the Model",
      description:
        "Deep dive into advanced predictive concepts, architecture design, and translating models into business value.",
      icon: "lightbulb",
      badge: "Industry Insights",
      dateLabel: "Coming Soon",
    },
  ],
  journeyTracks: [
    {
      title: "Road to Ignite",
      subtitle: "Leadership talk series",
      description:
        "Inspiring conversations on leadership, entrepreneurship, innovation, and personal growth with prominent leaders.",
      badge: "Flagship Talk Series",
      icon: "mic",
    },
    {
      title: "Upskill",
      subtitle: "Career & skills accelerator",
      description:
        "Dedicated tracks focusing on high-demand technical capabilities, interview mastery, and professional development.",
      badge: "Skill Acceleration",
      icon: "graduation",
    },
    {
      title: "Creative Sri Lanka",
      subtitle: "Innovation & creative tech",
      description:
        "Spotlighting creativity, design thinking, product innovation, and multi-disciplinary leadership.",
      badge: "Creative Series",
      icon: "sparkles",
    },
    {
      title: "Workshop Series",
      subtitle: "Hands-on engineering tracks",
      description:
        "Interactive masterclasses covering software engineering, PM, business analysis, data science, cybersecurity, and beyond.",
      badge: "Interactive Labs",
      icon: "brain",
    },
    {
      title: "YPSL Summit",
      subtitle: "IEEE Young Professionals Sri Lanka",
      description:
        "Annual premier convention gathering young engineers, researchers, mentors, and industry pioneers under one roof.",
      badge: "National Summit",
      icon: "users",
    },
  ],
  gallery: [
    {
      image: "gallery-1",
      alt: "Keynote speaker addressing an audience at an IEEE LETs Talk session",
      caption: "Inspiring conversations with industry leaders",
      span: "sm:col-span-2 sm:row-span-2",
    },
    {
      image: "gallery-2",
      alt: "Mentor guiding students during a hands-on engineering workshop",
      caption: "Hands-on interactive workshops",
    },
    {
      image: "gallery-3",
      alt: "Young professionals networking during a conference break",
      caption: "Empowering network & collaboration",
    },
    {
      image: "gallery-4",
      alt: "Panel of speakers on stage during an IEEE LETs Talk discussion",
      caption: "Cross-disciplinary knowledge exchange",
      span: "sm:col-span-2",
    },
  ],
  awards: {
    title: "Recognized for Creating Real Industry Impact.",
    awardName: "Best Industry Collaborative Project Award",
    program:
      "IEEE Sri Lanka Section Awards - Vision to Value - The Business Analysis Experience Program",
    description:
      "The recognition celebrates our success in bridging the gap between academia and industry through practical, experience-driven learning, meaningful industry collaboration, and career-focused skill development.",
    label: "Award Winner",
  },
  partners: [
    "IEEE Sri Lanka Section",
    "IEEE Young Professionals",
    "IEEE Computer Society",
    "IEEE Power & Energy",
    "IEEE WIE Affinity",
    "Industry Tech Partners",
  ],
  connected: {
    title: "Stay Connected with LETs Talk.",
    copy: "Be the first to hear about upcoming leadership talks, workshops, networking events, and exclusive opportunities. Join our WhatsApp Channel and stay connected with the LETs Talk community.",
    primaryCta: "Join Our WhatsApp Channel",
    secondaryCta: "Explore Events",
  },
  contact: {
    email: "contact@ieeeyp.lk",
    whatsappLabel: "Official WhatsApp Channel",
    organization: "IEEE Young Professionals Sri Lanka",
    copy: "Reach out to propose a session topic, collaborate as an industry partner, or connect with the IEEE Young Professionals Sri Lanka team.",
  },
};
