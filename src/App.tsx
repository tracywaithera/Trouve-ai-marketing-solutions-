/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  ArrowRight, 
  Zap, 
  Layout, 
  PenTool, 
  Globe, 
  Users, 
  BookOpen, 
  Search, 
  X, 
  ChevronRight,
  Bot,
  TrendingUp,
  Award,
  Sparkles,
  Phone,
  Send,
  Loader2,
  Star,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  Play,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---

interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  excerpt: string;
  content: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  icon: ReactNode;
  color: string;
}

// --- Data ---

const ARTICLES: Article[] = [
  {
    id: 'ai-2026',
    title: 'The AI Transition: Why African Brands Must Adapt or Fade',
    category: 'AI STRATEGY',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    readTime: '8 MIN READ',
    excerpt: 'How localized AI models are outperforming generic global solutions in the Kenyan market.',
    content: 'In 2026, the gap between brands using AI and those ignoring it has become a chasm. At Trouve, we’ve seen that localized data—understanding Sheng, local nuances, and mobile-first behaviors—is the key to winning. Generic AI might give you a template; Trouve AI gives you a connection.'
  },
  {
    id: 'brand-trust',
    title: 'The Architecture of Trust in Digital Advertising',
    category: 'BRANDING',
    image: 'https://i.ibb.co/ccqnf29v/pexels-eva-bronzini-6956301.jpg',
    readTime: '6 MIN READ',
    excerpt: 'Moving beyond clicks to building long-term equity in a skeptical digital age.',
    content: 'Trust is the only currency that matters. We explore how visual consistency, authentic storytelling, and radical transparency are the three pillars of modern brand identity. If your brand doesn’t feel human, it won’t survive the scroll.'
  },
  {
    id: 'personal-branding',
    title: 'Personal Branding: The New Corporate Resume',
    category: 'TRAINING',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    readTime: '10 MIN READ',
    excerpt: 'Why CEOs and team leads are the most powerful marketing assets a company owns.',
    content: 'People buy from people. We break down the strategy behind the most successful personal brands in Africa and how you can leverage your own story to drive company growth.'
  },
  {
    id: 'brand-influencing-article',
    title: 'The Power of Voice: Why Impactful Thought Leaders are the Future of Influencing',
    category: 'INFLUENCING',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800',
    readTime: '7 MIN READ',
    excerpt: 'Moving beyond follower counts to the importance of authentic voices and thought leadership.',
    content: 'In the modern digital landscape, a follower count is just a number. The true value lies in creators whose voices we know and trust—impactful thought leaders who don\'t just post content, but shape conversations. At Trouve, we focus on these authentic voices because they bring a level of credibility and long-term brand building that generic influencers simply cannot match. When a thought leader speaks, their audience listens with intent, creating a deeper, more meaningful connection for your brand.'
  }
];

const SERVICES: Service[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'We craft visual languages that make you unforgettable. From logos to full brand bibles.',
    fullDescription: 'Your brand identity is the heartbeat of your business. We go beyond simple logos to create a comprehensive visual system including typography, color palettes, and brand guidelines. We ensure your brand communicates trust and authority across every touchpoint, from business cards to digital billboards. Our process involves deep market research to ensure you stand out in the African landscape.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
    icon: <PenTool className="w-6 h-6" />,
    color: 'bg-blue-50 text-trouve-blue'
  },
  {
    id: 'website-dev',
    title: 'Web & App Design',
    description: 'Interactive, high-conversion digital homes and mobile applications.',
    fullDescription: 'In today\'s digital-first world, your website and apps are your most important sales tools. We build interactive, responsive, and high-speed platforms tailored for the African mobile-first user. From complex mobile apps to conversion-optimized landing pages, we focus on user experience (UX) and clean design to ensure your visitors take action.',
    image: 'https://i.ibb.co/jPQfks2D/Gemini-Generated-Image-sw770zsw770zsw77.jpg',
    icon: <Globe className="w-6 h-6" />,
    color: 'bg-gold-50 text-trouve-gold'
  },
  {
    id: 'seo-geo',
    title: 'SEO & GEO Strategy',
    description: 'Dominate search results and local maps with advanced optimization.',
    fullDescription: 'Visibility is the first step to growth. We specialize in Search Engine Optimization (SEO) and Generative Engine Optimization (GEO) to ensure your brand appears where your customers are looking. From local map dominance to global search rankings, we use data-driven strategies to keep you at the top of the digital food chain.',
    image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=800',
    icon: <Search className="w-6 h-6" />,
    color: 'bg-blue-50 text-trouve-blue'
  },
  {
    id: 'ai-marketing',
    title: 'AI Marketing & Ads',
    description: 'Automate your sales, personalize your reach, and scale your ads with cutting-edge AI.',
    fullDescription: 'Leverage the power of Artificial Intelligence to scale your marketing and ad campaigns without increasing your workload. We implement AI-driven lead generation, automated email sequences, and smart chatbots that handle customer inquiries 24/7. Our AI solutions are trained on local nuances to ensure your automated communication feels personal and authentic, helping you close more deals while you sleep.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 'team-training',
    title: 'Teaching Tech & AI',
    description: 'We empower your staff with tech skills, AI marketing, and content creation.',
    fullDescription: 'The best investment you can make is in your people. We offer customized training workshops for corporate teams and individuals, focusing on teaching tech and AI integration. Our curriculum covers the latest in Digital Marketing Strategy, AI Tool Implementation, and Content Creation. We don\'t just teach theory; we provide hands-on training that gives your team the practical skills needed to drive results immediately.',
    image: 'https://img.youtube.com/vi/hLnULY3ZEX4/maxresdefault.jpg',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'campaigns',
    title: 'Marketing Campaigns',
    description: 'End-to-end campaign management that fixes visibility and drives measurable ROI.',
    fullDescription: 'Stop throwing money at ads that don\'t work. We design and manage comprehensive marketing campaigns across Social Media, Google, and traditional channels. Our data-driven approach ensures your budget is spent where it matters most. We handle everything from creative direction and copywriting to technical tracking and performance optimization, ensuring your brand stays visible and profitable.',
    image: 'https://i.ibb.co/XZk71zZq/pexels-mikael-blomkvist-6476193.jpg',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    id: 'consultation',
    title: 'Consultation',
    description: 'Strategic sessions to audit your marketing and find hidden growth opportunities.',
    fullDescription: 'Not sure where to start? Our strategic consultation sessions provide a deep dive into your current marketing efforts. We audit your brand presence, analyze your competitors, and identify "growth leaks" where you might be losing potential customers. You\'ll walk away with a clear, actionable roadmap designed to fix your visibility problems and scale your brand effectively.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'bg-slate-50 text-slate-600'
  },
  {
    id: 'brand-influencing',
    title: 'Brand Influencing',
    description: 'Long-term partnerships with micro and macro influencers who understand brand building.',
    fullDescription: 'We connect your business with influencers who don\'t just have followers, but have influence. Our brand influencing service focuses on long-term partnerships with creators who are impactful thought leaders and whose voices are known and trusted. Whether you need micro-influencers for niche engagement or macro-influencers for broad reach, we manage the entire relationship to ensure your brand story is told authentically and effectively across the African market.',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800',
    icon: <Star className="w-6 h-6" />,
    color: 'bg-yellow-50 text-yellow-600'
  }
];

// --- Components ---

const PACKAGES = [
  {
    name: 'Starter',
    price: 'Visibility Fix',
    features: ['Logo Design', 'Basic Brand Identity', 'Social Media Setup', '1 Strategy Session'],
    recommended: false
  },
  {
    name: 'Growth',
    price: 'Scale & Convert',
    features: ['Full Brand Strategy', 'Conversion Website', 'AI Marketing Setup', 'Team Training (1 Day)'],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Market Leader',
    features: ['Full Campaign Management', 'Custom AI Automation', 'Monthly Growth Audit', 'Unlimited Training'],
    recommended: false
  }
];

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <>{displayedText}</>;
};

const HangingBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hey! I'm the Trouve Assistant. Ask me anything about marketing, branding, or AI!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically open the bot after a short delay to show the "writing space"
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are the Trouve Marketing Solutions Assistant. You are wise, professional, and highly functional. You represent Trouve, a brand with 5 years of experience building iconic brands and solving the problem of brand invisibility. Your primary goal is to help users understand our services and guide them to reach us. We specialize in building interactive, high-conversion websites and apps, and dominating search through SEO and GEO. We excel at creating visuals that align with a client's soul, teaching digital marketing, and executing authentic storytelling campaigns. Our services include: Brand Identity, Website & App Design, SEO/GEO, AI Marketing & Ads, Teaching Tech & AI, Marketing Campaigns, Strategic Consultation, and Brand Influencing. When users are interested, provide these contact details: WhatsApp: +254 702 476 038 (wa.me/254702476038), Email: trouvemarketingsolutions@gmail.com. We are based in Nairobi, Kenya, but serve brands globally. Encourage users to 'Book a Campaign' or 'Schedule a Consultation'. Answer every question with the wisdom of a 5-year veteran and the functionality of a top-tier strategist.",
        },
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Please try again or contact us via WhatsApp!";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble connecting. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: -600 }}
      animate={{ 
        y: 0,
        rotate: isOpen ? 0 : [0, -2, 2, 0],
        x: isOpen ? 0 : [0, 5, -5, 0]
      }}
      transition={{ 
        y: { type: "spring", damping: 20, stiffness: 60, delay: 1.5 },
        rotate: isOpen ? { duration: 0.5 } : { repeat: Infinity, duration: 4, ease: "easeInOut" },
        x: isOpen ? { duration: 0.5 } : { repeat: Infinity, duration: 5, ease: "easeInOut" }
      }}
      className="hanging-bot"
    >
      {/* The "String" */}
      <motion.div 
        animate={{ opacity: isOpen ? 0 : 1 }}
        className="w-0.5 h-32 bg-slate-300 mx-auto relative origin-top"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-400 rounded-full" />
      </motion.div>
      
      {/* The Bot Body */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer group"
      >
        <motion.div 
          animate={{ 
            y: isOpen ? 0 : [0, -5, 0],
            scale: isOpen ? 0 : 1,
            opacity: isOpen ? 0 : 1
          }}
          transition={{ 
            y: isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 3, ease: "easeInOut" },
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 }
          }}
          className="w-20 h-20 bg-trouve-blue-dark rounded-[24px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,84,166,0.3)] border-4 border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-trouve-blue to-transparent opacity-50" />
          <motion.div
            animate={{ 
              scale: isOpen ? 1 : [1, 1.1, 1],
              rotate: isOpen ? 0 : [0, 5, -5, 0]
            }}
            transition={isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Bot className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                x: window.innerWidth < 768 ? -280 : -350, 
                scale: 1 
              }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute top-0 w-[280px] sm:w-80 bg-white rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col h-[450px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 bg-trouve-blue-dark text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest uppercase opacity-70">Trouve AI</p>
                    <p className="text-xs font-bold">Marketing Assistant</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-trouve-blue text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                    }`}>
                      {msg.role === 'bot' && i === messages.length - 1 ? (
                        <TypingText text={msg.text} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                      <Loader2 className="w-4 h-4 text-trouve-blue animate-spin" />
                    </div>
                  </div>
                )}
                {!isLoading && messages.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a 
                      href="https://wa.me/254702476038" 
                      target="_blank"
                      className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors uppercase tracking-widest"
                    >
                      WhatsApp Us
                    </a>
                    <a 
                      href="mailto:trouvemarketingsolutions@gmail.com"
                      className="text-[10px] font-black bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors uppercase tracking-widest"
                    >
                      Email Us
                    </a>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Trouve AI..."
                    className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-6 pr-14 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-trouve-blue transition-all"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-trouve-blue text-white rounded-xl flex items-center justify-center hover:bg-trouve-blue-dark transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-widest mt-3">
                  Powered by Trouve Intelligence
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ServiceModal = ({ service, onClose }: { service: Service | null, onClose: () => void }) => {
  if (!service) return null;

  const whatsappLink = `https://wa.me/254702476038?text=${encodeURIComponent(`Hi Trouve! I'm interested in booking the ${service.title} service. Can you help me?`)}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 bg-slate-900/40 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white w-full max-w-5xl h-[90vh] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-all shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="relative h-[50vh] w-full">
            {service.image.includes('canva.com') ? (
              <video 
                src={service.image} 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : service.image.includes('youtube.com') ? (
              <iframe 
                src={`https://www.youtube.com/embed/${service.image.split('/vi/')[1].split('/')[0]}?autoplay=1&mute=1&loop=1&playlist=${service.image.split('/vi/')[1].split('/')[0]}&controls=0&showinfo=0&rel=0`}
                title={service.title}
                className="w-full h-full object-cover pointer-events-none"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent" />
            <div className="absolute bottom-12 left-12 lg:left-20">
              <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-6 shadow-xl`}>
                {service.icon}
              </div>
              <h2 className="text-5xl lg:text-8xl font-black text-trouve-blue-dark tracking-tighter leading-none">
                {service.title}
              </h2>
            </div>
          </div>

          <div className="p-8 lg:p-20 relative z-10">
            <div className="prose prose-xl max-w-none text-slate-600 font-medium leading-relaxed">
              <p className="text-2xl font-bold text-slate-800 mb-12 leading-relaxed">
                {service.fullDescription}
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 mt-12">
                <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100">
                  <h3 className="text-2xl font-black text-trouve-blue-dark mb-6">Why Choose This?</h3>
                  <ul className="space-y-4">
                    {['Tailored African Strategy', 'Data-Driven Results', 'Premium Execution', 'Ongoing Support'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-700 font-bold">
                        <div className="w-2 h-2 bg-trouve-gold rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-10 bg-trouve-blue/5 rounded-[40px] border border-trouve-blue/10">
                  <h3 className="text-2xl font-black text-trouve-blue-dark mb-6">What's Included?</h3>
                  <ul className="space-y-4">
                    {['Initial Audit', 'Strategic Roadmap', 'Implementation', 'Performance Review'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-700 font-bold">
                        <div className="w-2 h-2 bg-trouve-blue rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-20 p-12 bg-trouve-blue-dark rounded-[40px] text-white flex flex-col lg:flex-row items-center justify-between gap-10">
              <div>
                <h3 className="text-4xl font-black mb-4 tracking-tight">Ready to start?</h3>
                <p className="text-slate-300 font-bold text-lg">Book this service today and let's fix your visibility.</p>
              </div>
              <a 
                href={whatsappLink}
                target="_blank"
                className="bg-trouve-gold text-trouve-blue-dark px-12 py-6 rounded-3xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl text-lg"
              >
                Book Service Now
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ArticleModal = ({ article, onClose }: { article: Article | null, onClose: () => void }) => {
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 bg-slate-900/40 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white w-full max-w-5xl h-[90vh] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-all shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="relative h-96 w-full">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent" />
          </div>

          <div className="p-8 lg:p-20 -mt-24 relative z-10">
            <div className="inline-block bg-trouve-gold/10 text-trouve-gold text-[11px] font-black tracking-[0.3em] px-6 py-2 rounded-full mb-8">
              {article.category}
            </div>
            <h2 className="text-4xl lg:text-7xl font-serif font-black text-trouve-blue-dark mb-10 leading-tight tracking-tighter">
              {article.title}
            </h2>
            <div className="prose prose-xl max-w-none text-slate-600 font-medium leading-relaxed">
              <p className="text-2xl font-bold text-slate-800 mb-8 italic border-l-4 border-trouve-blue pl-8">
                {article.excerpt}
              </p>
              <div className="space-y-6">
                {article.content.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p>At Trouve Marketing Solutions, we believe that the best marketing isn't just about being seen—it's about being understood. Our approach combines the "Heart" of creative storytelling with the "Logic" of data-driven AI systems.</p>
              </div>
            </div>

            <div className="mt-20 p-12 bg-trouve-blue-dark rounded-[40px] text-white flex flex-col lg:flex-row items-center justify-between gap-10">
              <div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">Ready to scale your brand?</h3>
                <p className="text-slate-300 font-bold">Let's build a strategy that works for you.</p>
              </div>
              <a 
                href="https://wa.me/254702476038" 
                target="_blank"
                className="bg-trouve-gold text-trouve-blue-dark px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-trouve-blue selection:text-white">
      <HangingBot />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[60] h-24 transition-all duration-500 ${scrolled ? 'glass-nav h-20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-trouve-blue-dark rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-trouve-gold to-transparent opacity-20 group-hover:opacity-40 transition-opacity" />
              <svg viewBox="0 0 100 100" className="w-6 h-6 text-white relative z-10">
                <path d="M20 20 H80 V35 H57.5 V80 H42.5 V35 H20 Z" fill="currentColor" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" className="animate-spin-slow" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-black text-trouve-blue tracking-[0.4em] uppercase leading-none">Trouve</p>
              <p className="text-[7px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1">Creative Intelligence</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {['Home', 'Services', 'Packages', 'Insights', 'Training'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-black text-slate-600 hover:text-trouve-blue transition-colors tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </div>

          <a 
            href="https://wa.me/254702476038" 
            target="_blank"
            className="bg-trouve-blue-dark text-white px-8 py-3.5 rounded-full font-black text-[10px] tracking-[0.2em] hover:bg-trouve-blue transition-all shadow-xl active:scale-95 uppercase"
          >
            Get Started
          </a>
        </div>
      </nav>

      <main>
        <AnimatePresence>
          {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
          {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
        </AnimatePresence>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center px-6 lg:px-12 pt-24 overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 10, 0],
              rotate: [-12, -10, -12]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 right-0 w-1/2 h-full bg-trouve-blue/5 -skew-x-12 translate-x-24 -z-10" 
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              x: [0, -10, 0],
              rotate: [12, 14, 12]
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-trouve-gold/5 skew-x-12 -translate-x-24 -z-10" 
          />
          
          {/* Subtle White/Grey Decorative Elements */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 w-96 h-96 bg-slate-200/30 rounded-full blur-[120px] -z-10"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              y: [0, -40, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-white/40 rounded-full blur-[150px] -z-10"
          />
          
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-trouve-blue/10 text-trouve-blue px-5 py-2 rounded-full text-[10px] font-black tracking-widest mb-8">
                <Sparkles className="w-3 h-3 animate-pulse" />
                BUILDING BRANDS ACROSS AFRICA
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-[110px] font-black text-trouve-blue-dark leading-[0.85] mb-10 tracking-tighter">
                Stop Being Invisible. Get <br />
                <span className="gradient-text">Remembered.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 max-w-xl mb-12 font-semibold leading-relaxed tracking-tight">
                For <span className="text-trouve-blue-dark font-black">5 years</span>, we've solved the problem of brand invisibility by merging human intelligence with AI. We build <span className="text-trouve-blue-dark font-black">interactive, high-conversion websites and apps</span>, while dominating search with <span className="text-trouve-blue-dark font-black">SEO & GEO</span>. From authentic storytelling to high-impact marketing and advertising campaigns, we ensure your business leads.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <a 
                  href="#services" 
                  className="bg-trouve-blue-dark text-white px-10 py-5 rounded-[32px] font-black hover:bg-trouve-blue transition-all shadow-2xl flex items-center gap-3 text-sm tracking-widest uppercase"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/254702476038" 
                  target="_blank"
                  className="bg-white text-trouve-blue-dark px-10 py-5 rounded-[32px] font-black hover:bg-slate-50 transition-all border-2 border-slate-100 text-sm tracking-widest uppercase shadow-sm flex items-center gap-3"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative block mt-20 lg:mt-0 flex justify-center lg:justify-end"
            >
              <div className="relative z-10 ios-card overflow-hidden w-full max-w-[400px] aspect-[9/16] border-8 border-white shadow-2xl">
                <iframe 
                  src="https://www.youtube.com/embed/XbFHgP0FR3c?autoplay=1&mute=1&loop=1&playlist=XbFHgP0FR3c&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&widget_referrer=https://trouve.marketing" 
                  title="Trouve Marketing Solutions"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  allow="autoplay; encrypted-media"
                  loading="eager"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-trouve-blue-dark/10 pointer-events-none" />
                <div className="absolute bottom-12 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-[24px] shadow-2xl border border-white">
                  <p className="text-[10px] font-black text-trouve-gold uppercase tracking-widest mb-1">Our Philosophy</p>
                  <h3 className="text-lg font-black text-trouve-blue-dark leading-tight">Creative Intelligence for the Modern Age.</h3>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-trouve-gold/20 rounded-full blur-[80px] animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-trouve-blue/20 rounded-full blur-[100px] animate-pulse" />
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 px-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-[11px] font-black text-trouve-blue uppercase tracking-[0.5em] mb-6">What We Do</h2>
              <h3 className="text-5xl lg:text-7xl font-black text-trouve-blue-dark tracking-tighter leading-none">
                African Growth <br /> Made Simple.
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, index) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedService(service)}
                  className="ios-card group cursor-pointer overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    {service.image.includes('canva.com') ? (
                      <video 
                        src={service.image} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : service.image.includes('youtube.com') ? (
                      <div className="w-full h-full relative">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-trouve-blue-dark/80 via-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className={`absolute top-6 left-6 w-12 h-12 ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="p-10 flex-grow flex flex-col">
                    <h4 className="text-2xl font-black text-trouve-blue-dark mb-4">{service.title}</h4>
                    <p className="text-slate-600 font-bold leading-relaxed opacity-80 mb-8 flex-grow">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-trouve-blue font-black text-[10px] tracking-widest uppercase">
                      Book Service <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Section */}
        <section id="training" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="ios-card bg-white p-12 lg:p-24 relative overflow-hidden border-slate-100 shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-trouve-blue/5 -skew-x-12 translate-x-24" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-[11px] font-black text-trouve-blue uppercase tracking-[0.5em] mb-8">Training & Classes</h2>
                  <h3 className="text-5xl lg:text-7xl font-black text-trouve-blue-dark tracking-tighter leading-none mb-10">
                    Empower Your <br /> <span className="text-trouve-gold">Team.</span>
                  </h3>
                  <p className="text-xl text-slate-900 font-bold leading-relaxed mb-12">
                    We empower teams and individuals with the skills to dominate digital spaces. From personal branding to AI marketing, we make complex tools easy to understand and use.
                  </p>
                  <ul className="space-y-6 mb-12">
                    {['Personal Branding Mastery', 'Digital Marketing Strategy', 'AI-Driven Growth', 'Social Media Influence'].map((item) => (
                      <li key={item} className="flex items-center gap-4 text-trouve-blue-dark font-black tracking-widest uppercase text-sm">
                        <div className="w-6 h-6 bg-trouve-blue/10 rounded-full flex items-center justify-center">
                          <Zap className="w-3 h-3 text-trouve-blue" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="https://wa.me/254702476038" 
                    target="_blank"
                    className="inline-flex items-center gap-4 bg-trouve-blue-dark text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-trouve-blue transition-all shadow-2xl"
                  >
                    Book a Training Session
                  </a>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-[48px] overflow-hidden shadow-2xl group border-8 border-white">
                    <iframe 
                      src="https://www.youtube.com/embed/UMGQS-CcUbU?autoplay=1&mute=1&loop=1&playlist=UMGQS-CcUbU&controls=0&showinfo=0&rel=0" 
                      title="Empower Your Team"
                      className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-[2000ms]"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                    <div className="absolute inset-0 bg-trouve-blue-dark/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-[11px] font-black text-trouve-blue uppercase tracking-[0.5em] mb-6">Our Packages</h2>
              <h3 className="text-5xl lg:text-7xl font-black text-trouve-blue-dark tracking-tighter leading-none">
                Tailored for <br /> <span className="gradient-text">Impact.</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <div key={pkg.name} className={`ios-card p-12 flex flex-col ${pkg.recommended ? 'border-trouve-blue/20 ring-4 ring-trouve-blue/5' : 'border-slate-100'}`}>
                  {pkg.recommended && (
                    <div className="bg-trouve-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full self-start mb-8">
                      Most Popular
                    </div>
                  )}
                  <h4 className="text-2xl font-black text-trouve-blue-dark mb-2">{pkg.name}</h4>
                  <p className="text-trouve-gold font-black text-sm uppercase tracking-widest mb-8">{pkg.price}</p>
                  <ul className="space-y-5 mb-12 flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                        <div className="w-1.5 h-1.5 bg-trouve-blue rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="https://wa.me/254702476038" 
                    target="_blank"
                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-center transition-all ${pkg.recommended ? 'bg-trouve-blue-dark text-white hover:bg-trouve-blue' : 'bg-slate-50 text-trouve-blue-dark hover:bg-slate-100'}`}
                  >
                    Select Plan
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights Section (Trouve Style) */}
        <section id="insights" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-[11px] font-black text-trouve-gold uppercase tracking-[0.5em] mb-6">Marketing Insights</h2>
                <h3 className="text-5xl lg:text-7xl font-serif font-black text-trouve-blue-dark tracking-tighter leading-none">
                  The Trouve <br /> <span className="italic font-normal">Perspective.</span>
                </h3>
              </div>
              <p className="text-slate-500 font-bold max-w-xs text-right">
                Deep dives into the intersection of African culture, high-end branding, and AI technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {ARTICLES.map((article) => (
                <motion.article 
                  key={article.id}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedArticle(article)}
                  className="trouve-card group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] mb-8 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-trouve-blue-dark/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="px-2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] font-black text-trouve-blue tracking-widest uppercase">{article.category}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{article.readTime}</span>
                    </div>
                    <h4 className="text-3xl font-serif font-black text-trouve-blue-dark mb-6 leading-tight group-hover:text-trouve-blue transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed mb-8 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <button className="flex items-center gap-3 text-[10px] font-black text-trouve-blue-dark uppercase tracking-widest group-hover:gap-5 transition-all">
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-trouve-gold/10 rounded-full flex items-center justify-center mx-auto mb-12">
              <Award className="w-12 h-12 text-trouve-gold" />
            </div>
            <h2 className="text-5xl lg:text-8xl font-black text-trouve-blue-dark tracking-tighter leading-none mb-12">
              Ready to be <br /> <span className="gradient-text">Unforgettable?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 font-bold leading-relaxed mb-16 max-w-2xl mx-auto">
              Whether you're a startup or an established enterprise, we have the packages and expertise to scale your vision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="https://wa.me/254702476038" 
                target="_blank"
                className="bg-trouve-blue-dark text-white px-12 py-6 rounded-[32px] font-black uppercase tracking-widest hover:bg-trouve-blue transition-all shadow-2xl text-base"
              >
                Book a Campaign
              </a>
              <a 
                href="mailto:trouvemarketingsolutions@gmail.com" 
                className="bg-white text-trouve-blue-dark px-12 py-6 rounded-[32px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all border-2 border-slate-100 shadow-sm text-base"
              >
                Email Consultation
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-trouve-blue-dark text-white pt-32 pb-12 px-6 rounded-t-[60px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-24 -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 mb-32">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-trouve-blue-dark font-black text-2xl">T</span>
                </div>
                <span className="text-xl font-black tracking-[0.3em] uppercase">Trouve</span>
              </div>
              <p className="text-2xl text-slate-300 font-bold leading-tight mb-12 max-w-md">
                Creative Intelligence for brands that refuse to be ignored. Building the future of African marketing.
              </p>
              <div className="flex gap-6">
                {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                  <a key={social} href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-trouve-gold transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <h5 className="text-[11px] font-black text-trouve-gold uppercase tracking-[0.5em] mb-10">Quick Links</h5>
              <ul className="space-y-6 font-black text-lg">
                <li><a href="#home" className="hover:text-trouve-gold transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-trouve-gold transition-colors">Services</a></li>
                <li><a href="#insights" className="hover:text-trouve-gold transition-colors">Insights</a></li>
                <li><a href="#training" className="hover:text-trouve-gold transition-colors">Training</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h5 className="text-[11px] font-black text-trouve-gold uppercase tracking-[0.5em] mb-10">Contact</h5>
              <p className="text-xl font-black mb-2">trouvemarketingsolutions@gmail.com</p>
              <p className="text-4xl font-black mb-12">+254 702 476 038</p>
              <div className="h-px w-full bg-white/10 mb-10" />
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Nairobi, Kenya • 2026</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              © 2026 TROUVE MARKETING SOLUTIONS
            </p>
            <div className="flex gap-8 text-[9px] font-black text-slate-600 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
