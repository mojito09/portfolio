import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, ExternalLink, Sparkles, Zap, Users, TrendingUp, ChevronDown } from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-serif text-xl font-bold tracking-tight" data-testid="logo">
          MJ
        </a>
        <div className="flex items-center gap-8">
          <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-work">
            Work
          </a>
          <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-experience">
            Experience
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-contact">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-20 pb-16 relative">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-primary font-medium mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Available for opportunities
          </motion.p>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-balance"
          >
            I turn ambiguous problems into{" "}
            <span className="highlight-underline">shipped products</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground prose-editorial max-w-2xl mb-8"
          >
            Operator across product, growth, and user experience with hands-on experience 
            building AI- and product-led systems. Comfortable owning ambiguous problems 
            end-to-end with minimal structure and high accountability.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <a 
              href="#work" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-md"
              data-testid="cta-view-work"
            >
              View my work
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors"
              data-testid="cta-contact"
            >
              Let's chat
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
}

function QuickStats() {
  const stats = [
    { value: "6×", label: "Community growth at CHOMP", icon: Users },
    { value: "80K+", label: "Impressions from campaigns", icon: TrendingUp },
    { value: "30+", label: "Partnerships built at Tezos", icon: Zap },
  ];

  return (
    <section className="py-16 border-y border-border bg-card/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-serif font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProofOfWorkItem {
  title: string;
  description: string;
  tags: string[];
  impact?: string;
}

function ProofOfWork() {
  const work: ProofOfWorkItem[] = [
    {
      title: "AI Product Support & Experience OS",
      description: "Designed a complete support operating system including triage rubric, escalation templates, response macros, help-center improvements, and a feedback → product-insights pipeline.",
      tags: ["Support Ops", "Product Insights", "UX"],
      impact: "Systematized user feedback into actionable product improvements"
    },
    {
      title: "AI Product Growth OS (Activation → Retention)",
      description: "Built onboarding flows, activation metrics, retention loops, experiment roadmap, and instrumentation for an AI context/memory-driven product.",
      tags: ["Growth", "Activation", "Retention"],
      impact: "Full-funnel growth system from scratch"
    },
    {
      title: "Gamified Engagement System",
      description: "Collaborated with engineering to introduce gamified product features — daily streaks, mystery boxes, XP systems, and raffle rewards — improving user retention and average session time.",
      tags: ["Product", "Gamification", "Retention"],
      impact: "6× community growth (1K → 6K users)"
    },
    {
      title: "Campaign Microsite with Real-time Leaderboard",
      description: "Designed and coded a campaign microsite with real-time database sync, enabling automated leaderboard tracking and seamless prize distribution.",
      tags: ["Engineering", "Campaigns", "Automation"],
      impact: "~$4K in prizes distributed seamlessly"
    },
    {
      title: "Internal Dashboards & Systems",
      description: "Built SQL-driven and Retool dashboards to track growth, engagement, campaign performance, and operational KPIs.",
      tags: ["Data", "Dashboards", "Operations"],
    },
  ];

  return (
    <section id="work" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-primary font-medium mb-2">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proof of Execution</h2>
          <p className="text-muted-foreground max-w-2xl">
            Here's what I've actually built and shipped. Not just strategy decks — 
            real systems, real impact, real results.
          </p>
        </motion.div>

        <div className="space-y-6">
          {work.map((item, index) => (
            <WorkCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item, index }: { item: ProofOfWorkItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left bg-card border border-card-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        data-testid={`work-card-${index}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className={`text-muted-foreground prose-editorial ${isExpanded ? '' : 'line-clamp-2'}`}>
              {item.description}
            </p>
            
            {isExpanded && item.impact && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-primary font-medium flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {item.impact}
              </motion.p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </div>
      </button>
    </motion.div>
  );
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: "CHOMP",
      role: "Product & Growth (Founder's Office)",
      period: "Sept 2024 — May 2025",
      location: "Remote",
      highlights: [
        "Early operator owning activation, engagement loops, community growth, and frontline user experience",
        "Ran campaigns generating 80K+ impressions, 4K+ sign-ups, and platform revenue of 12 SOL",
        "Scaled community 6× (1K → 6K) via gamified engagement programs",
        "Supported fundraising from angel round to Series A progression"
      ]
    },
    {
      company: "Tezos India",
      role: "Growth & Ecosystem Partnerships",
      period: "Feb 2022 — Aug 2024",
      location: "Remote",
      highlights: [
        "Built partner pipeline from 4 → 30+ active partners (Huddle01, Web3Auth, GuardianLink)",
        "Led 25+ city-level programs and meetups across India",
        "Evaluated and deployed grants as part of the Indian Grants Committee"
      ]
    },
    {
      company: "Etherspot (Pillar Project)",
      role: "BD / GTM Lead",
      period: "May 2022 — Apr 2023",
      location: "Remote (Part-time)",
      highlights: [
        "Closed 5+ integration partnerships for Account Abstraction SDK",
        "Defined KPIs and operating cadence for BD pipelines"
      ]
    },
    {
      company: "Ernst & Young (EY)",
      role: "Assurance Associate",
      period: "Aug 2020 — Mar 2021",
      location: "Remote",
      highlights: [
        "Supported audit teams for major Canadian banking clients (TD, BMO)",
        "Developed rigor in stakeholder communication and risk assessment"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-card/30 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-primary font-medium mb-2">Background</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-border"
            >
              <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
              
              <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif text-xl font-bold">{exp.company}</h3>
                <span className="text-muted-foreground text-sm">{exp.period}</span>
              </div>
              
              <p className="text-primary font-medium mb-3">{exp.role}</p>
              
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skillCategories = [
    {
      title: "Product",
      skills: ["Onboarding flows", "Activation & retention loops", "Experimentation", "User psychology"]
    },
    {
      title: "Growth",
      skills: ["Lifecycle funnels", "GTM partnerships", "Community-led growth", "Positioning"]
    },
    {
      title: "Operations",
      skills: ["User issue triage", "Escalation hygiene", "Feedback → insights", "Help-center design"]
    },
    {
      title: "Tools",
      skills: ["Notion", "SQL", "Retool", "Mixpanel", "Figma"]
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-primary font-medium mb-2">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Bring</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-card-border rounded-xl p-6"
            >
              <h3 className="font-serif font-bold text-lg mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map(skill => (
                  <li key={skill} className="text-muted-foreground text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const education = [
    {
      institution: "Manipal University",
      degree: "Bachelor of Commerce with ACCA",
      detail: "GPA: 7.96/10",
      year: "2020"
    },
    {
      institution: "Stoa School (Alt-MBA)",
      degree: "General Management Program",
      detail: "Economics, Marketing, Branding, Finance, VC",
      year: "2021"
    },
    {
      institution: "Kernel Fellow",
      degree: "Web3 Fellowship",
      detail: "Run by Team Gitcoin",
      year: "2022"
    }
  ];

  return (
    <section className="py-16 border-y border-border bg-card/30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-serif font-bold">Education</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-sm text-muted-foreground mb-1">{edu.year}</p>
              <h3 className="font-serif font-bold">{edu.institution}</h3>
              <p className="text-primary text-sm font-medium">{edu.degree}</p>
              <p className="text-muted-foreground text-sm">{edu.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-primary font-medium mb-2">Get in Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Together</h2>
          <p className="text-muted-foreground mb-8">
            Looking for an operator who ships? I'm excited about early-stage AI startups 
            where I can own product, growth, or GTM end-to-end.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:mohitjain09@yahoo.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-md"
              data-testid="contact-email"
            >
              <Mail className="w-4 h-4" />
              mohitjain09@yahoo.com
            </a>
            <a
              href="tel:+919495882407"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors"
              data-testid="contact-phone"
            >
              <Phone className="w-4 h-4" />
              +91-9495882407
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <a
              href="https://lake-purple-d2e.notion.site/Mohit-Jain-dbca96ed987647d69c0e60702ef09c83"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 text-sm"
              data-testid="link-portfolio"
            >
              <ExternalLink className="w-4 h-4" />
              Full Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2025 Mohit Jain. Bengaluru, India.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with care ✦
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative grain">
      <Header />
      <main>
        <Hero />
        <QuickStats />
        <ProofOfWork />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
