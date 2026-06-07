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

const coverImages = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80'
];

const demoData = {
  name: 'Alexander J. Wright',
  email: 'alexander.wright@example.com',
  phone: '+1 (555) 019-8472',
  location: 'San Francisco, CA',
  role: 'Senior Full-Stack Engineer',
  summary: 'A highly motivated and results-driven Senior Full-Stack Engineer with over 8 years of professional experience architecting scalable web applications, designing RESTful APIs, and leading cross-functional agile teams. Proven track record of improving system performance, mentoring junior developers, and delivering mission-critical software solutions on time and under budget. Deeply passionate about cloud infrastructure, modern React ecosystems, and elegant UX/UI design. Known for a collaborative approach and a commitment to writing clean, maintainable, and highly tested code.',
  skills: 'React, Node.js, TypeScript, Next.js, GraphQL, AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD, Agile Methodology, System Design, MongoDB, PostgreSQL, TailwindCSS, Redis, Microservices',
  experience: 'TechNova Solutions - Lead Software Engineer\nJan 2021 - Present\n• Architected a highly scalable microservices-based platform using Node.js and Docker, successfully handling a 200% increase in user traffic during peak holiday seasons with zero downtime.\n• Led a team of 6 engineers through a complex legacy migration from Angular to React, reducing technical debt and improving page load speeds by 1.2 seconds, which increased conversion rates by 15%.\n• Established robust CI/CD pipelines using GitHub Actions, cutting deployment time by 40% and ensuring 99.9% uptime across all production environments.\n• Mentored 4 junior developers, resulting in two internal promotions within the first year.\n\nGlobal Web Inc - Frontend Developer\nMar 2017 - Dec 2020\n• Developed a highly interactive e-commerce dashboard using React and Redux, increasing overall user engagement metrics by 45%.\n• Optimized frontend asset delivery and implemented code-splitting, achieving a perfect 100/100 Google Lighthouse performance score.\n• Collaborated closely with the UI/UX design team to establish a unified component library, speeding up new feature development by 30% and ensuring consistent brand identity.\n\nStartUp Alpha - Junior Developer\nJun 2015 - Feb 2017\n• Assisted in the development of the core REST API using Express and MongoDB.\n• Wrote comprehensive unit tests using Jest, achieving 85% code coverage across the backend codebase.\n• Designed and implemented a responsive landing page using HTML5, CSS3, and JavaScript.',
  education: 'Master of Science in Computer Science\nStanford University | Sep 2013 - May 2015\n• Specialization in Artificial Intelligence and Distributed Systems.\n• Graduated with Honors (GPA: 3.9/4.0).\n\nBachelor of Science in Software Engineering\nUniversity of California, Berkeley | Sep 2009 - May 2013\n• Dean\'s List for 4 consecutive years.\n• Led the competitive programming team to regional finals.',
  projects: 'NextGen E-Commerce Dashboard : A comprehensive, real-time analytics dashboard built with React, Redux, and Chart.js. The platform processes and visualizes over 1M data points daily, allowing merchants to track sales metrics, inventory levels, and customer demographics with millisecond latency.\n\nAI-Powered Content Generator : A full-stack Next.js application utilizing OpenAI APIs to generate SEO-optimized blog posts. Implemented a custom rich-text editor, automated social media sharing, and Stripe payment integration for premium subscriptions.\n\nOpenSource Component Library : Created and maintained an open-source React UI library downloaded over 50k times on NPM. Features fully accessible, deeply customizable, and lightweight components built with Tailwind CSS.',
  profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
};

const templatesList = [
  { id: 'modern', type: 'resume', name: 'Modern Pro', Component: ModernPro },
  { id: 'ats', type: 'resume', name: 'Minimal ATS', Component: MinimalATS },
  { id: 'exec', type: 'resume', name: 'Executive ATS', Component: ExecutiveATS },
  { id: 'creative', type: 'portfolio', name: 'Creative Portfolio', Component: CreativePortfolio },
  { id: 'portfolio-dark', type: 'portfolio', name: 'Dark Mode Portfolio', Component: CreativePortfolio, theme: { primary: '#0f172a', accent: '#3b82f6', bg: '#1e293b', text: '#f8fafc' } },
  { id: 'portfolio-vibrant', type: 'portfolio', name: 'Vibrant Portfolio', Component: CreativePortfolio, theme: { primary: '#4f46e5', accent: '#ec4899', bg: '#fef2f2', text: '#1e1b4b' } },
  { id: 'timeline', type: 'resume', name: 'Timeline Flow', Component: TimelineResume },
  { id: 'compact', type: 'resume', name: 'Compact Grid', Component: CompactGrid },
  { id: 'sidebar', type: 'resume', name: 'Creative Sidebar', Component: CreativeSidebar },
  { id: 'minimal', type: 'resume', name: 'Minimal Elegant', Component: MinimalistElegant },
  { id: 'tech', type: 'resume', name: 'Tech Focused', Component: TechFocused },
  { id: 'bold', type: 'resume', name: 'Bold Header', Component: BoldHeader },
  { id: 'classic', type: 'resume', name: 'Classic Two Col', Component: ClassicTwoColumn }
];

const Landing = () => {
  return (
    <div className="container mt-8 mb-8">
      {/* Hero Section */}
      <section className="text-center animate-slide-up" style={{ 
        padding: '6rem 2rem', 
        borderRadius: '24px',
        marginBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        {/* Dynamic Slideshow Backgrounds */}
        <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80")` }}></div>
        <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80")` }}></div>
        <div className="slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80")` }}></div>
        
        {/* Overlay to ensure text readability */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.4)', zIndex: 1 }}></div>

        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '16px', display: 'inline-block', border: '1px solid rgba(255, 255, 255, 0.8)' }}>
          <div className="animate-fade-in delay-100" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '20px', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            ✨ The Future of Career Building
          </div>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
            Stand Out With An <br/>
            <span className="text-gradient">AI-Powered Portfolio</span> 🚀
          </h1>
          <p className="animate-slide-up delay-200" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', color: '#475569' }}>
            Stop using generic templates. Let our generative AI tailor a unique resume, stunning portfolio, and compelling cover letter based on your unique strengths.
          </p>
          
          <div className="flex justify-center gap-4 animate-slide-up delay-300">
            <Link to="/build?type=resume" className="btn btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.125rem' }}>
              <FileSignature size={20} /> Create Resume
            </Link>
            <Link to="/build?type=portfolio" className="btn btn-outline hover-float" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.125rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
              <Layout size={20} /> Create Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="gallery" className="animate-slide-up delay-300" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', marginTop: '2rem' }}>
        <div className="text-center mb-8">
          <h2>11 Professional Templates</h2>
          <p>Click any live preview to start building your career instantly.</p>
        </div>
        
        <div className="grid grid-cols-3 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {templatesList.map((template, index) => (
            <Link 
              key={template.id} 
              to={`/build?type=${template.type}&theme=${template.id}`} 
              className="glass-card" 
              style={{ textDecoration: 'none', color: 'inherit', padding: 0, overflow: 'hidden', position: 'relative', display: 'block', borderRadius: '12px' }}
            >
              {/* Fixed-size clipping container */}
              <div style={{ width: '100%', height: '320px', overflow: 'hidden', position: 'relative', background: '#f8fafc' }}>
                {/* Absolute-positioned scaled template — cannot bleed */}
                <div style={{ 
                  width: '800px', height: '1056px', 
                  transform: 'scale(0.38)', transformOrigin: 'top left', 
                  position: 'absolute', top: 0, left: 0, 
                  overflow: 'hidden', pointerEvents: 'none' 
                }}>
                  <template.Component 
                    data={{ ...demoData, coverImage: coverImages[index % coverImages.length] }} 
                    themeColor={template.theme || { primary: '#1e293b', accent: '#3b82f6', bg: '#fff' }} 
                    isPreview={true}
                  />
                </div>
              </div>
              
              {/* Label overlay */}
              <div style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0, 
                background: 'linear-gradient(transparent, rgba(2,6,23,0.95))', 
                padding: '2.5rem 1.25rem 1.25rem', textAlign: 'center', color: '#fff' 
              }}>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: '700' }}>{template.name}</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#93c5fd', fontWeight: '500' }}>
                  {template.type === 'portfolio' ? '🎨 Portfolio Layout' : '📄 Resume Layout'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="animate-slide-up delay-300" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="text-center mb-8">
          <h2>Everything You Need to Succeed</h2>
          <p>Powerful tools designed specifically for students and new grads.</p>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="glass-card hover-float flex flex-col items-center text-center">
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <FileSignature size={32} color="var(--accent-secondary)" />
            </div>
            <h3>🧠 Smart Resumes</h3>
            <p className="mt-2">Generate ATS-friendly resumes tailored to the specific internships and jobs you are applying for.</p>
          </div>
          
          <div className="glass-card hover-float flex flex-col items-center text-center" style={{ borderColor: 'var(--accent-primary)', boxShadow: 'var(--shadow-glow)' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Wand2 size={32} color="white" />
            </div>
            <h3>⚡ AI Tailoring</h3>
            <p className="mt-2">Our AI analyzes your projects and skills to highlight your most relevant strengths automatically.</p>
          </div>
          
          <div className="glass-card hover-float flex flex-col items-center text-center">
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Layout size={32} color="var(--accent-primary)" />
            </div>
            <h3>🌐 Dynamic Portfolios</h3>
            <p className="mt-2">Deploy beautiful, interactive web portfolios with one click. No coding required.</p>
          </div>
        </div>
      </section>

      {/* Professional Inspiration Gallery */}
      <section id="inspiration" className="animate-slide-up delay-400" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="text-center mb-8">
          <h2>Professional Portfolio Inspiration</h2>
          <p>Beautiful, industry-standard layouts designed to catch any recruiter's eye.</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          gridAutoRows: '200px'
        }}>
          {coverImages.slice(0, 4).map((imgUrl, i) => (
            <div key={i} style={{
              borderRadius: '12px',
              overflow: 'hidden',
              gridColumn: i === 0 ? 'span 2' : 'span 1',
              gridRow: i === 3 ? 'span 2' : 'span 1',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: `url(${imgUrl}) center/cover`,
                transition: 'transform 0.5s ease',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
          {coverImages.slice(4, 7).map((imgUrl, i) => (
            <div key={i+4} style={{
              borderRadius: '12px',
              overflow: 'hidden',
              gridColumn: i === 1 ? 'span 2' : 'span 1',
              gridRow: 'span 1',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: `url(${imgUrl}) center/cover`,
                transition: 'transform 0.5s ease',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
