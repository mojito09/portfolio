import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, ExternalLink, Zap, Users, TrendingUp, ChevronDown, ChevronUp, Linkedin, Trophy, Calendar, Handshake, AlertCircle, Twitter, Sparkles, X, MessageCircle, Send } from "lucide-react";
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
import leaderboardVideo from "@assets/Ultimate_CHOMP_1768395846132.mp4";
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

// Magnetic Button Component
function MagneticButton({ children, className, href, onClick, ...props }: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

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

// Video popup modal that shows once per session
function VideoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenVideoPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenVideoPopup', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-card-border rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl font-bold">See Me In Action</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              data-testid="popup-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground mb-4">
            A vibe-coded website I built end-to-end, with a production-ready backend API and frontend that showed 6,000+ users their real-time leaderboard position — saving the engineering team significant build time.
          </p>
          <div className="rounded-lg overflow-hidden border border-card-border">
            <video 
              controls 
              autoPlay
              muted
              className="w-full h-auto"
              playsInline
              preload="metadata"
            >
              <source src={leaderboardVideo} type="video/mp4" />
              Your browser does not support this video format.
            </video>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floating Chat Widget
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const isOnline = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);
    const hour = istTime.getHours();
    return hour >= 11 && hour < 23;
  };

  const [online, setOnline] = useState(isOnline());

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(isOnline());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const whatsappMessage = encodeURIComponent("Hey Mohit, we found your profile interesting. Let's have a chat sometime");
  const whatsappLink = `https://wa.me/919495882407?text=${whatsappMessage}`;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:mohitjain09@yahoo.com?subject=Message from Portfolio&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setShowEmailForm(false);
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="mb-4 bg-card border border-card-border rounded-2xl shadow-2xl w-80 overflow-hidden"
        >
          <div className="p-4 border-b border-border bg-accent/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  MJ
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>
              <div>
                <p className="font-semibold text-sm">Mohit Jain</p>
                <p className="text-xs text-muted-foreground">
                  {online ? 'Online now' : 'Away (11am-11pm IST)'}
                </p>
              </div>
            </div>
          </div>

          {!showEmailForm ? (
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Hey! How would you like to connect?
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-colors group"
                data-testid="chat-whatsapp"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Chat instantly</p>
                </div>
              </a>
              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors group"
                data-testid="chat-email-option"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-xs text-muted-foreground">Send a message</p>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="p-4 space-y-3">
              {sent ? (
                <div className="text-center py-4">
                  <p className="text-green-500 font-medium">Opening your email app...</p>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    ← Back
                  </button>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    data-testid="chat-email-input"
                  />
                  <textarea
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    data-testid="chat-message-input"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    data-testid="chat-send"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </>
              )}
            </form>
          )}
        </motion.div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 ${isOpen ? 'bg-secondary' : 'bg-primary'}`}
        data-testid="chat-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-secondary-foreground" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
            <div className={`absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
          </>
        )}
      </button>
    </div>
  );
}

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
  const companies = [
    { name: "CHOMP", logo: chompLogo },
    { name: "Tezos India", logo: tezosLogo },
    { name: "Etherspot", logo: etherspotLogo },
    { name: "Ernst & Young", logo: eyLogo },
  ];

  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-20 pb-16 relative">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-balance"
          >
            I like being close to the action{" "}
            <span className="highlight-underline">and making things work</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground prose-editorial max-w-2xl mb-4"
          >
            I'm an operator across product, growth, and user support.
          </motion.p>

          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground prose-editorial max-w-2xl mb-4"
          >
            I work best in fast-moving teams where problems are unclear, users are vocal, and shipping something now matters more than perfect plans.
          </motion.p>

          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground prose-editorial max-w-2xl mb-8"
          >
            I enjoy challenges, variety, and solving new problems. I'm quick to experiment, iterate, and figure things out under constraints.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <MagneticButton 
              href="#work" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity shadow-md"
              data-testid="cta-view-work"
            >
              View my work
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors"
              data-testid="cta-contact"
            >
              Let's chat
            </MagneticButton>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-8 flex items-center gap-3 flex-wrap"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/50 px-3 py-1.5 rounded-full">
              <Trophy className="w-4 h-4 text-primary" />
              <span>$1K Solana Scribes Hackathon Winner</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/50 px-3 py-1.5 rounded-full">
              <span>Kernel Fellow (Gitcoin)</span>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-10 pt-8 border-t border-border/50"
          >
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Companies I've worked with</p>
            <div className="flex items-center gap-6 flex-wrap">
              {companies.map((company) => (
                <div key={company.name} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-sm text-muted-foreground">{company.name}</span>
                </div>
              ))}
            </div>
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
    { value: "6×", label: "community growth - via tournaments, rewards, and hands-on support at CHOMP", icon: Users },
    { value: "80K+", label: "impressions / 4K sign-ups - from collabs, quests, and community campaigns", icon: TrendingUp },
    { value: "30+", label: "partner integrations - ecosystem & product integrations at Tezos", icon: Handshake },
    { value: "25+", label: "events - city-level programs across India", icon: Calendar },
  ];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-medium mb-8 text-center"
        >
          Quick Highlights
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
    <section id="work" className="py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-primary font-medium mb-2">What I've Delivered</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proof of Execution</h2>
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
      <ParallaxCard className="w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left bg-card border border-card-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
          data-testid={`work-card-${index}`}
        >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                {item.outcome && (
                  <p className="text-primary font-medium flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span><strong>Outcome:</strong> {item.outcome}</span>
                  </p>
                )}
                {item.whatBroke && (
                  <p className="text-muted-foreground flex items-start gap-2 bg-accent/50 p-3 rounded-lg text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span><strong>What broke:</strong> {item.whatBroke}</span>
                  </p>
                )}
                {item.video && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-card-border shadow-sm">
                    <video 
                      controls 
                      className="w-full h-auto"
                      playsInline
                      preload="metadata"
                    >
                      <source src={item.video} type="video/quicktime" />
                      <source src={item.video} type="video/mp4" />
                      Your browser does not support this video format. Try viewing in Safari.
                    </video>
                  </div>
                )}
                {item.images && item.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    {item.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="rounded-lg overflow-hidden border border-card-border shadow-sm">
                        <ClickableImage src={img} alt={`${item.title} screenshot ${imgIndex + 1}`} className="w-full h-auto" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
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
          <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </div>
        </button>
      </ParallaxCard>
    </motion.div>
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
              
              <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                {exp.logo && (
                  <img src={exp.logo} alt={`${exp.company} logo`} className="w-8 h-8 rounded-lg object-cover" />
                )}
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
              
              {exp.images && exp.images.length > 0 && (
                <ExperiencePhotoCarousel images={exp.images} company={exp.company} />
              )}
            </motion.div>
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
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-primary font-medium mb-2">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How I Work</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="bg-card border border-card-border rounded-xl p-6"
            >
              <h3 className="font-serif font-bold text-lg mb-4">{category.title}</h3>
              <motion.ul 
                className="space-y-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.li 
                    key={skill} 
                    variants={staggerItem}
                    className="text-muted-foreground text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
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
    <section className="py-16 bg-card/30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-primary font-medium mb-2">Operator-level</p>
          <h2 className="text-2xl font-serif font-bold">Technical Toolkit</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {tools.map((tool, index) => (
            <div key={tool.category}>
              <p className="text-sm font-medium text-foreground mb-2">{tool.category}</p>
              <ul className="space-y-1">
                {tool.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GPTStatsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-card border border-card-border rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            My Year with ChatGPT
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
            data-testid="close-gpt-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground mb-6 text-center prose-editorial">
          I'm in the <span className="text-primary font-bold text-lg">top 0.1%</span> of ChatGPT users.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-center text-muted-foreground">My Stats</p>
            <div className="rounded-xl overflow-hidden border border-card-border shadow-lg">
              <img 
                src={chatStatsImage} 
                alt="My ChatGPT stats - Top 0.1% of users" 
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-center text-muted-foreground">Sam's Reaction</p>
            <div className="rounded-xl overflow-hidden border border-card-border shadow-lg">
              <img 
                src={samTweetImage} 
                alt="Sam Altman tweet about not being in top 1%" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 italic">
          When you use AI more than its creator... you might have a problem (or not).
        </p>
      </motion.div>
    </motion.div>
  );
}

function WhyAI() {
  const [showGPTStats, setShowGPTStats] = useState(false);

  return (
    <section className="py-16 border-y border-border bg-card/30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl font-serif font-bold mb-4">Why AI</h2>
          <p className="text-muted-foreground prose-editorial mb-4">
            I'm not an AI engineer. I'm close to users and workflows.
          </p>
          <p className="text-muted-foreground prose-editorial mb-4">
            <strong className="text-foreground">AI is my first brain:</strong> I use it daily for research, analysis, 
            planning, and prioritization. I build simple AI-powered automations (like daily email digests via n8n + LLMs). 
            I use AI to move faster, not to sound impressive.
          </p>
          <p className="text-muted-foreground prose-editorial mb-4">
            <strong className="text-foreground">I'm most excited about AI products that:</strong> preserve context 
            (voice, memory, workflows), help people act - not just chat, and solve real problems for teams and individuals.
          </p>

          <button
            onClick={() => setShowGPTStats(true)}
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group cursor-pointer"
            data-testid="gpt-stats-trigger"
          >
            <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
            <span className="underline decoration-dotted underline-offset-4">
              Fun fact: I'm in the top 0.1% of GPT users
            </span>
            <span className="text-muted-foreground">(yes, higher than Sam Altman)</span>
          </button>
        </motion.div>
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
    <section className="py-16">
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
    <section id="contact" className="py-24 scroll-mt-20 border-t border-border">
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
            Looking for an operator who ships? Let's chat.
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
              href="https://www.linkedin.com/in/mohitjain1999/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors"
              data-testid="contact-linkedin"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            <a
              href="https://x.com/mojito_09_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 text-sm"
              data-testid="link-twitter"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
            <span className="text-border">•</span>
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
          Built with AI, Guided by Intent
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative grain">
      <VideoPopup />
      <ChatWidget />
      <Header />
      <main>
        <Hero />
        <QuickStats />
        <Experience />
        <ProofOfWork />
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
