import { Link } from 'react-router-dom';
import { Wand2, Layout, FileSignature } from 'lucide-react';
import MinimalATS from '../components/templates/MinimalATS';
import ModernPro from '../components/templates/ModernPro';
import ExecutiveATS from '../components/templates/ExecutiveATS';
import CreativePortfolio from '../components/templates/CreativePortfolio';
import TimelineResume from '../components/templates/TimelineResume';
import CompactGrid from '../components/templates/CompactGrid';
import CreativeSidebar from '../components/templates/CreativeSidebar';
import MinimalistElegant from '../components/templates/MinimalistElegant';
import TechFocused from '../components/templates/TechFocused';
import BoldHeader from '../components/templates/BoldHeader';
import ClassicTwoColumn from '../components/templates/ClassicTwoColumn';
import GlassmorphismPortfolio from '../components/templates/GlassmorphismPortfolio';
import NeonDarkPortfolio from '../components/templates/NeonDarkPortfolio';
import SplitLayoutPortfolio from '../components/templates/SplitLayoutPortfolio';
import MinimalistCardPortfolio from '../components/templates/MinimalistCardPortfolio';
import MagazinePortfolio from '../components/templates/MagazinePortfolio';
import GradientWavePortfolio from '../components/templates/GradientWavePortfolio';
import TerminalPortfolio from '../components/templates/TerminalPortfolio';
import BentoGridPortfolio from '../components/templates/BentoGridPortfolio';
import BrutalistPortfolio from '../components/templates/BrutalistPortfolio';
import LuxuryPortfolio from '../components/templates/LuxuryPortfolio';

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
];

const DEMO_DATA = {
  name: 'Alexander J. Wright',
  email: 'alexander.wright@example.com',
  phone: '+1 (555) 019-8472',
  location: 'San Francisco, CA',
  role: 'Senior Full-Stack Engineer',
  summary: 'A highly motivated Senior Full-Stack Engineer with 8+ years of experience architecting scalable web applications and leading cross-functional agile teams. Passionate about cloud infrastructure and modern React ecosystems.',
  skills: 'React, Node.js, TypeScript, Next.js, GraphQL, AWS, Docker, Kubernetes, CI/CD, MongoDB, PostgreSQL',
  experience: 'TechNova Solutions - Lead Software Engineer\nJan 2021 - Present\n• Architected microservices platform handling 200% traffic spikes with zero downtime.\n• Led migration from Angular to React, improving page load by 1.2s (+15% conversions).\n\nGlobal Web Inc - Frontend Developer\nMar 2017 - Dec 2020\n• Built e-commerce dashboard with React/Redux, boosting engagement by 45%.',
  education: 'Master of Science in Computer Science\nStanford University | 2013–2015\n\nBachelor of Science in Software Engineering\nUC Berkeley | 2009–2013',
  projects: 'NextGen E-Commerce Dashboard : Real-time analytics built with React and Chart.js.\n\nAI-Powered Content Generator : Next.js app using OpenAI APIs for SEO content.\n\nOpenSource UI Library : React component library with 50k+ NPM downloads.',
  profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
};

const TEMPLATES_LIST = [
  { id: 'modern',           type: 'resume',    name: 'Modern Pro',          Component: ModernPro },
  { id: 'ats',              type: 'resume',    name: 'Minimal ATS',         Component: MinimalATS },
  { id: 'exec',             type: 'resume',    name: 'Executive ATS',       Component: ExecutiveATS },
  { id: 'creative',         type: 'portfolio', name: 'Creative Portfolio',  Component: CreativePortfolio },
  { id: 'portfolio-dark',   type: 'portfolio', name: 'Dark Portfolio',      Component: CreativePortfolio, theme: { primary: '#0f172a', accent: '#3b82f6', bg: '#1e293b' } },
  { id: 'portfolio-vibrant',type: 'portfolio', name: 'Vibrant Portfolio',   Component: CreativePortfolio, theme: { primary: '#4f46e5', accent: '#ec4899', bg: '#fef2f2' } },
  { id: 'timeline',         type: 'resume',    name: 'Timeline Flow',       Component: TimelineResume },
  { id: 'compact',          type: 'resume',    name: 'Compact Grid',        Component: CompactGrid },
  { id: 'sidebar',          type: 'resume',    name: 'Creative Sidebar',    Component: CreativeSidebar },
  { id: 'minimal',          type: 'resume',    name: 'Minimal Elegant',     Component: MinimalistElegant },
  { id: 'tech',             type: 'resume',    name: 'Tech Focused',        Component: TechFocused },
  { id: 'bold',             type: 'resume',    name: 'Bold Header',         Component: BoldHeader },
  { id: 'classic',          type: 'resume',    name: 'Classic Two Column',  Component: ClassicTwoColumn },
  { id: 'glassmorphism',    type: 'portfolio', name: 'Glassmorphism',       Component: GlassmorphismPortfolio },
  { id: 'neondark',         type: 'portfolio', name: 'Neon Dark',           Component: NeonDarkPortfolio },
  { id: 'splitlayout',      type: 'portfolio', name: 'Split Layout',        Component: SplitLayoutPortfolio },
  { id: 'minimalistcard',   type: 'portfolio', name: 'Minimalist Card',     Component: MinimalistCardPortfolio },
  { id: 'magazine',         type: 'portfolio', name: 'Magazine Layout',     Component: MagazinePortfolio },
  { id: 'gradientwave',     type: 'portfolio', name: 'Gradient Wave',       Component: GradientWavePortfolio },
  { id: 'terminal',         type: 'portfolio', name: 'Terminal Hacker',     Component: TerminalPortfolio },
  { id: 'bentogrid',        type: 'portfolio', name: 'Bento Grid',          Component: BentoGridPortfolio },
  { id: 'brutalist',        type: 'portfolio', name: 'Brutalist',           Component: BrutalistPortfolio },
  { id: 'luxury',           type: 'portfolio', name: 'Luxury Premium',      Component: LuxuryPortfolio },
];

const DEFAULT_THEME = { primary: '#1e293b', accent: '#3b82f6', bg: '#fff' };

const Landing = () => (
  <div className="container mt-8 mb-8">

    {/* ── HERO SECTION ── */}
    <section
      className="text-center animate-slide-up"
      style={{
        padding: '5rem 2rem',
        borderRadius: '24px',
        marginBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.05)',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Slideshow backgrounds */}
      <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80")` }} />
      <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80")` }} />
      <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80")` }} />

      {/* Semi-transparent overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(248,250,252,0.35)', zIndex: 1 }} />

      {/* Hero content glass card */}
      <div
        className="hero-inner"
        style={{
          position: 'relative', zIndex: 2,
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '3rem 3.5rem',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          maxWidth: '680px',
          width: '100%',
        }}
      >
        <div
          className="animate-fade-in delay-100"
          style={{
            display: 'inline-block', padding: '0.4rem 1rem',
            background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)',
            borderRadius: '20px', color: 'var(--accent-primary)',
            fontWeight: '600', marginBottom: '1.25rem', fontSize: '0.85rem',
          }}
        >
          ✨ The Future of Career Building
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem', letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.15 }}>
          Stand Out With An{' '}
          <br />
          <span className="text-gradient">AI-Powered Portfolio</span> 🚀
        </h1>

        <p
          className="animate-slide-up delay-200"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', maxWidth: '520px', margin: '0 auto 2rem', color: '#475569' }}
        >
          Let our generative AI tailor a unique resume and stunning portfolio based on your strengths — no generic templates.
        </p>

        <div
          className="flex justify-center gap-4 animate-slide-up delay-300 hero-cta"
          style={{ flexWrap: 'wrap' }}
        >
          <Link
            to="/build?type=resume"
            className="btn btn-primary hover-float"
            style={{ textDecoration: 'none', padding: '0.9rem 2rem', fontSize: '1.05rem' }}
          >
            <FileSignature size={20} /> Create Resume
          </Link>
          <Link
            to="/build?type=portfolio"
            className="btn btn-outline hover-float"
            style={{
              textDecoration: 'none', padding: '0.9rem 2rem', fontSize: '1.05rem',
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
            }}
          >
            <Layout size={20} /> Create Portfolio
          </Link>
        </div>
      </div>
    </section>

    {/* ── TEMPLATE GALLERY ── */}
    <section
      id="gallery"
      className="animate-slide-up delay-300"
      style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="text-center mb-8">
        <h2>13 Professional Templates</h2>
        <p>Click any live preview to start building your career instantly.</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {TEMPLATES_LIST.map((template, index) => (
          <Link
            key={template.id}
            to={`/build?type=${template.type}&theme=${template.id}`}
            className="glass-card"
            style={{
              textDecoration: 'none', color: 'inherit',
              padding: 0, overflow: 'hidden',
              position: 'relative', display: 'block', borderRadius: '12px',
            }}
          >
            {/* Fixed-height clipping container */}
            <div style={{ width: '100%', height: '300px', overflow: 'hidden', position: 'relative', background: '#f8fafc' }}>
              {/* Scaled template — absolute so it can't bleed the card */}
              <div style={{
                width: '800px', height: '1056px',
                transform: 'scale(0.375)', transformOrigin: 'top left',
                position: 'absolute', top: 0, left: 0,
                overflow: 'hidden', pointerEvents: 'none',
              }}>
                <template.Component
                  data={{ ...DEMO_DATA, coverImage: COVER_IMAGES[index % COVER_IMAGES.length] }}
                  themeColor={template.theme || DEFAULT_THEME}
                  isPreview={true}
                />
              </div>
            </div>

            {/* Label overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(2,6,23,0.92))',
              padding: '2rem 1.25rem 1.25rem', textAlign: 'center', color: '#fff',
            }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: '700' }}>{template.name}</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#93c5fd', fontWeight: '500' }}>
                {template.type === 'portfolio' ? '🎨 Portfolio Layout' : '📄 Resume Layout'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* ── FEATURES GRID ── */}
    <section
      id="features"
      className="animate-slide-up delay-300"
      style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="text-center mb-8">
        <h2>Everything You Need to Succeed</h2>
        <p>Powerful tools designed specifically for students and modern professionals.</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
        }}
      >
        <div className="glass-card hover-float flex flex-col items-center text-center">
          <div style={{ background: 'rgba(59,130,246,0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.25rem' }}>
            <FileSignature size={32} color="var(--accent-secondary)" />
          </div>
          <h3>🧠 Smart Resumes</h3>
          <p className="mt-2">Generate ATS-friendly resumes tailored to the specific internships and jobs you are applying for.</p>
        </div>

        <div className="glass-card hover-float flex flex-col items-center text-center" style={{ borderColor: 'var(--accent-primary)', boxShadow: 'var(--shadow-glow)' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', padding: '1rem', borderRadius: '50%', marginBottom: '1.25rem' }}>
            <Wand2 size={32} color="white" />
          </div>
          <h3>⚡ AI Tailoring</h3>
          <p className="mt-2">Our AI analyses your projects and skills to highlight your most relevant strengths automatically.</p>
        </div>

        <div className="glass-card hover-float flex flex-col items-center text-center">
          <div style={{ background: 'rgba(139,92,246,0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.25rem' }}>
            <Layout size={32} color="var(--accent-primary)" />
          </div>
          <h3>🌐 Dynamic Portfolios</h3>
          <p className="mt-2">Deploy beautiful, interactive web portfolios in seconds. No coding required whatsoever.</p>
        </div>
      </div>
    </section>

    {/* ── INSPIRATION GALLERY ── */}
    <section
      id="inspiration"
      className="animate-slide-up delay-400"
      style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="text-center mb-8">
        <h2>Portfolio Inspiration Gallery</h2>
        <p>Beautiful, industry-standard layouts designed to catch any recruiter's eye.</p>
      </div>

      {/* Masonry-style grid — collapses responsively via CSS class */}
      <div
        className="inspiration-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          gridAutoRows: '200px',
        }}
      >
        {COVER_IMAGES.slice(0, 4).map((imgUrl, i) => (
          <div
            key={i}
            style={{
              borderRadius: '12px', overflow: 'hidden',
              gridColumn: i === 0 ? 'span 2' : 'span 1',
              gridRow:    i === 3 ? 'span 2' : 'span 1',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{ width: '100%', height: '100%', background: `url(${imgUrl}) center/cover`, transition: 'transform 0.5s ease' }}
              onMouseOver={e  => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e   => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}

        {COVER_IMAGES.slice(4, 7).map((imgUrl, i) => (
          <div
            key={i + 4}
            style={{
              borderRadius: '12px', overflow: 'hidden',
              gridColumn: i === 1 ? 'span 2' : 'span 1',
              gridRow: 'span 1',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{ width: '100%', height: '100%', background: `url(${imgUrl}) center/cover`, transition: 'transform 0.5s ease' }}
              onMouseOver={e  => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e   => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Landing;
