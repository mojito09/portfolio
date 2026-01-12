import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import chatStatsImage from "@assets/chat_stats_1768217956308.png";
import samTweetImage from "@assets/Screenshot_2026-01-12_at_5.08.39_PM_1768217966580.png";
import supportImg1 from "@assets/Screenshot_2026-01-12_at_6.38.37_PM_1768223958289.png";
import supportImg2 from "@assets/Screenshot_2026-01-12_at_6.39.23_PM_1768223958293.png";
import supportImg3 from "@assets/Screenshot_2026-01-12_at_6.39.54_PM_1768223958294.png";
import leaderboardImg1 from "@assets/Screenshot_2025-12-19_at_1.07.49_PM_1768224051465.png";
import leaderboardImg2 from "@assets/Screenshot_2025-12-19_at_1.07.58_PM_1768224051468.png";
import leaderboardImg3 from "@assets/Screenshot_2025-12-19_at_1.08.39_PM_1768224051468.png";
import leaderboardImg4 from "@assets/Screenshot_2025-12-19_at_1.08.49_PM_1768224051469.png";
import leaderboardVideo from "@assets/Screen_Recording_2025-12-19_at_1.09.14_PM_1768223995886.mov";
import chompEvent1 from "@assets/7DE85273-FF61-4372-A5C1-0BA2A512D19F_1768224380910.JPG";
import chompEvent2 from "@assets/9B017350-BF27-4B7B-B411-F7D13587CD66_1768224380910.JPG";
import chompEvent3 from "@assets/9E148E12-5F70-441F-8A66-3E4B899D1FC4_1768224380911.JPG";
import chompEvent4 from "@assets/746D8A50-C0B8-4708-A27D-27E886459293_1768224380911.JPG";
import chompEvent5 from "@assets/970F07E3-3B21-455C-94C1-CBD3C3BB17E4_1768224380912.JPG";
import chompEvent6 from "@assets/3113C7FB-C5AF-4B63-9F22-49882F6A2BB2_1768224380912.JPG";
import chompEvent7 from "@assets/4830FC73-0A5C-43C7-AB73-615523CCBAF0_1768224380915.JPG";
import chompEvent8 from "@assets/A0F9908D-3971-4D20-8D82-1ED3CF817D18_1768224380916.JPG";
import chompEvent9 from "@assets/C7A52A2C-5926-4B27-8B39-6E1341688611_1768224380916.JPG";
import tezosEvent1 from "@assets/3AEDCECE-6684-4B89-843D-A79E9A359122_1768224557438.JPG";
import tezosEvent2 from "@assets/BDE63835-9AF4-4A76-AB53-2C4C60426937_1768224586467.JPG";
import tezosEvent3 from "@assets/CBC0A70B-7D07-449C-8A2C-42E945E33A95_1768224586468.JPG";
import tezosEvent4 from "@assets/IMG_2772_1768224714086.jpg";
import tezosEvent5 from "@assets/IMG_4209_1768224714090.jpg";
import tezosEvent6 from "@assets/IMG_4212_1768224714090.jpg";
import tezosEvent7 from "@assets/IMG_4226_1768224714091.jpg";
import chompLogo from "@assets/ChompLogo_1768224754509.png";
import tezosLogo from "@assets/tezos-xtz-icon2984.logowik.com_1768224917326.webp";
import eyLogo from "@assets/ey-logo-black_1768224950832.png";
import etherspotLogo from "@assets/etherspot_logo_1768224994435.jpg";


// Text Scramble Effect
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    setIsScrambling(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
      iteration += 1;
    }, 30);
  }, [text]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          scramble();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [scramble]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}

// Parallax Tilt Card
function ParallaxCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = (e.clientX - rect.left) / rect.width - 0.5;
    const centerY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(centerX);
    y.set(centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered reveal container
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

// Lightbox component for viewing images full-size
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
    </motion.div>
  );
}

// Experience photo carousel - subtle preview that expands on click
function ExperiencePhotoCarousel({ images, company }: { images: string[]; company: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isExpanded) {
    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="mt-4"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">{images.length} photos from events</span>
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <ChevronUp className="w-4 h-4" />
            Collapse
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="rounded-lg overflow-hidden border border-card-border shadow-sm aspect-square cursor-zoom-in hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt={`${company} event ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {selectedImage && (
          <ImageLightbox src={selectedImage} alt={`${company} event`} onClose={() => setSelectedImage(null)} />
        )}
      </motion.div>
    );
  }

  return (
    <button 
      onClick={() => setIsExpanded(true)}
      className="mt-4 flex items-center gap-3 group cursor-pointer"
    >
      <div className="flex -space-x-3">
        {images.slice(0, 3).map((img, idx) => (
          <div 
            key={idx} 
            className="w-10 h-10 rounded-lg overflow-hidden border-2 border-background shadow-sm"
            style={{ zIndex: 3 - idx }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
        View {images.length} photos
        <ChevronDown className="w-4 h-4" />
      </span>
    </button>
  );
}

// Clickable image thumbnail
function ClickableImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className={`${className} cursor-zoom-in hover:opacity-90 transition-opacity`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      />
      {isOpen && <ImageLightbox src={src} alt={alt} onClose={() => setIsOpen(false)} />}
    </>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-sm font-medium tracking-tight" data-testid="logo">
          Mohit Jain
        </a>
        <div className="flex items-center gap-6">
          <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline" data-testid="nav-work">
            Work
          </a>
          <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline" data-testid="nav-experience">
            Experience
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline" data-testid="nav-contact">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const companies = [
    { name: "CHOMP", logo: chompLogo },
    { name: "Tezos India", logo: tezosLogo },
    { name: "Etherspot", logo: etherspotLogo },
    { name: "Ernst & Young", logo: eyLogo },
  ];

  return (
    <section className="pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">
          I ship solutions when users are blocked <span className="highlight-underline">and teams are constrained.</span>
        </h1>
        
        <p className="text-base text-muted-foreground mb-3 leading-relaxed">
          I'm an operator across product, growth, and user support.
        </p>

        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
          I work close to users, move fast under ambiguity, and don't wait on perfect conditions to ship.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <a 
            href="#work" 
            className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            data-testid="cta-view-work"
          >
            View my work →
          </a>
          <a 
            href="#contact" 
            className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            data-testid="cta-contact"
          >
            Get in touch
          </a>
        </div>

        <div className="text-sm text-muted-foreground mb-8">
          <span>$1K Solana Scribes Hackathon Winner</span>
          <span className="mx-2">·</span>
          <span>Kernel Fellow (Gitcoin)</span>
        </div>

        <div className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Previously at</p>
          <div className="flex items-center gap-4 flex-wrap">
            {companies.map((company) => (
              <span key={company.name} className="text-sm text-muted-foreground">
                {company.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatIDo() {
  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-4">What I Actually Do</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          I usually sit at the intersection of users, product, and growth - especially when things are breaking or unclear.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          My strength isn't deep specialization. It's figuring out what matters, shipping something useful fast, and iterating based on real feedback.
        </p>
      </div>
    </section>
  );
}

function QuickStats() {
  const stats = [
    { value: "6×", label: "community growth - via tournaments, rewards, and hands-on support at CHOMP" },
    { value: "80K+", label: "impressions / 4K sign-ups - from collabs, quests, and community campaigns" },
    { value: "30+", label: "partner integrations - ecosystem & product integrations at Tezos" },
    { value: "25+", label: "events - city-level programs across India" },
  ];

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-6">Key Numbers</h2>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="text-xl font-semibold min-w-[60px]">{stat.value}</span>
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProofOfWorkItem {
  title: string;
  context?: string;
  description: string;
  outcome?: string;
  whatBroke?: string;
  tags: string[];
  images?: string[];
  video?: string;
}

function ProofOfWork() {
  const work: ProofOfWorkItem[] = [
    {
      title: "Product and Customer Support",
      context: "Handled ~70 user issues per week across Telegram and Twitter.",
      description: "Designed a simple but effective support system: dedicated bug-reporting channels by issue type, clear escalation context (wallet, OS, recordings, environment), FAQ and announcement channels to reduce noise, and regular user communication during bugs or changes.",
      outcome: "Fewer repeated issues, clearer expectations, and users coming to me directly instead of founders.",
      tags: ["Support Ops", "User Experience", "Systems"],
      images: [supportImg1, supportImg2, supportImg3]
    },
    {
      title: "Gamified Engagement System - CHOMP",
      context: "5,000 users were participating in 'The Ultimate CHOMPer' tournament, but had no way to track progress. Frustration was rising, and engineering bandwidth was limited.",
      description: "Owned the problem end-to-end. Designed, built, and shipped a workaround without waiting on engineering. Built a real-time leaderboard using REST APIs via Retool - showed rank, points, wallet address, tournament status, and timeline. Auto-refresh every 6 hours.",
      outcome: "Increased tournament participation and retention. Reduced angry messages in community channels. Restored user trust mid-tournament.",
      whatBroke: "Retool tokens expired once, showing mock data for ~4 hours. Fixed immediately.",
      tags: ["Product", "Scrappy Solutions", "Retention"],
      images: [leaderboardImg1, leaderboardImg2, leaderboardImg3, leaderboardImg4],
      video: leaderboardVideo
    },
    {
      title: "Campaign Microsite with Real-Time Leaderboard",
      description: "Designed and shipped a campaign microsite with real-time database sync to track leaderboard progress, automate prize distribution, and reduce manual ops during campaigns.",
      outcome: "Shipped end-to-end without waiting on engineering.",
      tags: ["Engineering", "Campaigns", "Automation"]
    },
    {
      title: "Internal Dashboards & Systems",
      description: "Built SQL-driven and Retool dashboards to track growth and engagement, campaign performance, and operational KPIs.",
      outcome: "The goal was simple: help teams make decisions without waiting on someone else.",
      tags: ["Data", "Dashboards", "Operations"]
    },
  ];

  return (
    <section id="work" className="py-12 border-t border-border scroll-mt-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-6">Proof of Execution</h2>

        <div className="space-y-8">
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
    <div className="group">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
        data-testid={`work-card-${index}`}
      >
        <div>
          <h3 className="text-base font-semibold mb-2 group-hover:underline transition-colors">
            {item.title}
          </h3>
            
            {item.context && (
              <p className={`text-muted-foreground prose-editorial italic mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
                {item.context}
              </p>
            )}
            
            <p className={`text-muted-foreground prose-editorial ${isExpanded ? '' : 'line-clamp-2'}`}>
              {item.description}
            </p>
            
            {isExpanded && (
              <div className="mt-4 space-y-3">
                {item.outcome && (
                  <p className="text-sm">
                    <strong>Outcome:</strong> {item.outcome}
                  </p>
                )}
                {item.whatBroke && (
                  <p className="text-sm text-muted-foreground border-l-2 border-border pl-3">
                    <strong>What broke:</strong> {item.whatBroke}
                  </p>
                )}
                {item.video && (
                  <div className="mt-4 border border-border">
                    <video 
                      src={item.video} 
                      controls 
                      className="w-full h-auto"
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {item.images && item.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {item.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="border border-border">
                        <ClickableImage src={img} alt={`${item.title} screenshot ${imgIndex + 1}`} className="w-full h-auto" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>
      </button>
      
      {!isExpanded && (
        <span className="text-xs text-muted-foreground mt-2 inline-block hover:underline cursor-pointer" onClick={() => setIsExpanded(true)}>
          Read more →
        </span>
      )}
    </div>
  );
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  images?: string[];
  logo?: string;
}

function Experience() {
  const experiences: ExperienceItem[] = [
    {
      company: "CHOMP",
      role: "Product & Growth (Founder's Office)",
      period: "Sept 2024 – May 2025",
      highlights: [
        "Owned activation, engagement loops, community growth, and frontline user experience",
        "Ran campaigns generating 80K+ impressions, 4K+ sign-ups, and platform revenue",
        "Scaled community 6× (1K → 6K users) via gamified engagement",
        "Became the primary point of contact for user issues and feedback",
        "Supported fundraising progression from angel round toward Series A"
      ],
      images: [chompEvent1, chompEvent2, chompEvent3, chompEvent4, chompEvent5, chompEvent6, chompEvent7, chompEvent8, chompEvent9],
      logo: chompLogo
    },
    {
      company: "Tezos India",
      role: "Partnerships & Growth Lead",
      period: "Feb 2022 – Aug 2024",
      highlights: [
        "Built partner pipeline from 4 → 30+ active integrations",
        "Launched initiatives like Gaming Launchpad, Web3 Gaming Handbook, Developer Hub",
        "Ran 25+ city-level programs and meetups",
        "Evaluated and deployed grants as part of the Indian Grants Committee",
        "Built partner grant programs and a startup directory for B2B collaborations"
      ],
      images: [tezosEvent1, tezosEvent2, tezosEvent3, tezosEvent4, tezosEvent5, tezosEvent6, tezosEvent7],
      logo: tezosLogo
    },
    {
      company: "Etherspot (Pillar Project)",
      role: "BD / GTM Lead (Part-time)",
      period: "May 2022 – Apr 2023",
      highlights: [
        "Closed 5+ integration partnerships for an Account Abstraction SDK",
        "Defined KPIs and operating cadence for BD pipelines"
      ],
      logo: etherspotLogo
    },
    {
      company: "Ernst & Young (EY)",
      role: "Assurance Associate",
      period: "Aug 2020 – Mar 2021",
      highlights: [
        "Supported audit teams for major Canadian banking clients",
        "Built rigor in stakeholder communication and risk assessment"
      ],
      logo: eyLogo
    }
  ];

  return (
    <section id="experience" className="py-12 border-t border-border scroll-mt-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-6">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.company}>
              <div className="mb-1">
                <h3 className="text-base font-semibold">{exp.company}</h3>
                <p className="text-sm text-muted-foreground">{exp.role} · {exp.period}</p>
              </div>
              
              <ul className="mt-2 space-y-1">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    - {highlight}
                  </li>
                ))}
              </ul>
              
              {exp.images && exp.images.length > 0 && (
                <ExperiencePhotoCarousel images={exp.images} company={exp.company} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIWork() {
  const categories = [
    {
      title: "Product",
      skills: ["Onboarding flows", "Activation & retention loops", "Shipping under constraints", "Explaining and debugging user issues"]
    },
    {
      title: "Growth",
      skills: ["Lifecycle funnels", "Partnerships & collaborations", "Community-led growth", "Clear narratives over hype"]
    },
    {
      title: "Operations",
      skills: ["User issue triage", "Escalation hygiene", "Feedback → product insights", "Simple systems that reduce chaos"]
    }
  ];

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-6">How I Work</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="font-semibold text-sm mb-3">{category.title}</h3>
              <ul className="space-y-1">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-muted-foreground text-sm">
                    - {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnicalToolkit() {
  const tools = [
    { category: "AI", items: ["GPT-5.2 / Claude", "Gemini"] },
    { category: "Automation", items: ["n8n, Clay, Make"] },
    { category: "Data", items: ["SQL"] },
    { category: "Dashboards", items: ["Retool"] },
    { category: "Websites", items: ["Replit, Lovable, Emergent.ai"] },
  ];

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-6">Technical Toolkit</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {tools.map((tool) => (
            <div key={tool.category} className="min-w-[100px]">
              <p className="text-sm font-medium mb-1">{tool.category}</p>
              <p className="text-sm text-muted-foreground">{tool.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GPTStatsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">My Year with ChatGPT</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent transition-colors"
            data-testid="close-gpt-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground mb-6 text-center">
          I'm in the <span className="font-semibold">top 0.1%</span> of ChatGPT users.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">My Stats</p>
            <div className="border border-border">
              <img src={chatStatsImage} alt="My ChatGPT stats" className="w-full h-auto" />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Sam's Reaction</p>
            <div className="border border-border">
              <img src={samTweetImage} alt="Sam Altman tweet" className="w-full h-auto" />
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          When you use AI more than its creator... you might have a problem (or not).
        </p>
      </div>
    </div>
  );
}

function WhyAI() {
  const [showGPTStats, setShowGPTStats] = useState(false);

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-4">Why AI</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          I'm not an AI engineer. I'm close to users and workflows.
        </p>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          <strong className="text-foreground">AI is my first brain:</strong> I use it daily for research, analysis, 
          planning, and prioritization. I build simple AI-powered automations (like daily email digests via n8n + LLMs). 
          I use AI to move faster, not to sound impressive.
        </p>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          <strong className="text-foreground">I'm most excited about AI products that:</strong> preserve context 
          (voice, memory, workflows), help people act - not just chat, and solve real problems for teams and individuals.
        </p>

        <button
          onClick={() => setShowGPTStats(true)}
          className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors cursor-pointer"
          data-testid="gpt-stats-trigger"
        >
          Fun fact: I'm in the top 0.1% of GPT users (yes, higher than Sam Altman) →
        </button>
      </div>

      <GPTStatsModal isOpen={showGPTStats} onClose={() => setShowGPTStats(false)} />
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
    <section className="py-12 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-6">Education</h2>

        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.institution}>
              <p className="text-sm font-medium">{edu.institution} <span className="text-muted-foreground font-normal">({edu.year})</span></p>
              <p className="text-sm text-muted-foreground">{edu.degree} - {edu.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-12 border-t border-border scroll-mt-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Looking for an operator who ships? Let's chat.
        </p>

        <div className="space-y-2 text-sm">
          <div>
            <a
              href="mailto:mohitjain09@yahoo.com"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
              data-testid="contact-email"
            >
              mohitjain09@yahoo.com
            </a>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/mohitjain1999/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              data-testid="contact-linkedin"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/mojito_09_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              data-testid="link-twitter"
            >
              Twitter
            </a>
            <a
              href="https://lake-purple-d2e.notion.site/Mohit-Jain-dbca96ed987647d69c0e60702ef09c83"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              data-testid="link-portfolio"
            >
              Full Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 border-t border-border">
      <div className="max-w-2xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p>© 2025 Mohit Jain. Bengaluru, India.</p>
        <p>Built with AI, Guided by Intent</p>
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
        <WhatIDo />
        <QuickStats />
        <ProofOfWork />
        <Experience />
        <HowIWork />
        <TechnicalToolkit />
        <WhyAI />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
