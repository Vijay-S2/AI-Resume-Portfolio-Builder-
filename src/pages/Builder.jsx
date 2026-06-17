import { useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles, Download, Eye, LayoutTemplate, Palette,
  Wand2, FileText, Upload, Loader2, X
} from 'lucide-react';
import { tailorResumeContent, parseResumeData } from '../utils/aiService';
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
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/* ── resume template registry ────────────────────────────── */
const RESUME_TEMPLATES = [
  { id: 'modern',   name: 'Modern Pro',         Component: ModernPro },
  { id: 'ats',      name: 'Minimal ATS',         Component: MinimalATS },
  { id: 'exec',     name: 'Executive ATS',       Component: ExecutiveATS },
  { id: 'timeline', name: 'Timeline Flow',       Component: TimelineResume },
  { id: 'compact',  name: 'Compact Grid',        Component: CompactGrid },
  { id: 'sidebar',  name: 'Creative Sidebar',    Component: CreativeSidebar },
  { id: 'minimal',  name: 'Minimal Elegant',     Component: MinimalistElegant },
  { id: 'tech',     name: 'Tech Focused',        Component: TechFocused },
  { id: 'bold',     name: 'Bold Header',         Component: BoldHeader },
  { id: 'classic',  name: 'Classic Two Column',  Component: ClassicTwoColumn },
];
const RESUME_TEMPLATE_IDS = RESUME_TEMPLATES.map(t => t.id);

/* ── portfolio template registry ────────────────────────────── */
const PORTFOLIO_TEMPLATES = [
  { id: 'creative',         name: 'Creative Portfolio',  Component: CreativePortfolio },
  { id: 'glassmorphism',    name: 'Glassmorphism',       Component: GlassmorphismPortfolio },
  { id: 'neondark',         name: 'Neon Dark',           Component: NeonDarkPortfolio },
  { id: 'splitlayout',      name: 'Split Layout',        Component: SplitLayoutPortfolio },
  { id: 'minimalistcard',   name: 'Minimalist Card',     Component: MinimalistCardPortfolio },
  { id: 'magazine',         name: 'Magazine Layout',     Component: MagazinePortfolio },
  { id: 'gradientwave',     name: 'Gradient Wave',       Component: GradientWavePortfolio },
  { id: 'terminal',         name: 'Terminal Hacker',     Component: TerminalPortfolio },
  { id: 'bentogrid',        name: 'Bento Grid',          Component: BentoGridPortfolio },
  { id: 'brutalist',        name: 'Brutalist',           Component: BrutalistPortfolio },
  { id: 'luxury',           name: 'Luxury Premium',      Component: LuxuryPortfolio },
];

/* ── demo data ───────────────────────────────────────────── */
const DEMO = {
  name: 'Alexander J. Wright',
  email: 'alexander.wright@example.com',
  phone: '+1 (555) 019-8472',
  location: 'San Francisco, CA',
  role: 'Senior Full-Stack Engineer',
  summary: 'A highly motivated Senior Full-Stack Engineer with 8+ years of experience architecting scalable web applications and leading cross-functional agile teams. Passionate about cloud infrastructure, modern React ecosystems, and elegant UX/UI design.',
  skills: 'React, Node.js, TypeScript, Next.js, GraphQL, AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD, MongoDB, PostgreSQL, Redis, Microservices',
  experience:
    'TechNova Solutions - Lead Software Engineer\nJan 2021 - Present\n• Architected microservices platform with Node.js & Docker handling 200% traffic spike with zero downtime.\n• Led team of 6 engineers migrating Angular → React, improving page load by 1.2s (+15% conversions).\n• Built CI/CD pipelines via GitHub Actions, cutting deploy time 40%, ensuring 99.9% uptime.\n\nGlobal Web Inc - Frontend Developer\nMar 2017 - Dec 2020\n• Built interactive e-commerce dashboard with React/Redux, boosting engagement 45%.\n• Achieved perfect Lighthouse score with code-splitting & asset optimization.\n\nStartUp Alpha - Junior Developer\nJun 2015 - Feb 2017\n• Developed core REST API with Express/MongoDB and achieved 85% unit-test coverage.',
  education:
    'Master of Science in Computer Science\nStanford University | Sep 2013 - May 2015\n• AI & Distributed Systems specialization. GPA 3.9/4.0.\n\nBachelor of Science in Software Engineering\nUniversity of California, Berkeley | Sep 2009 - May 2013\n• Dean\'s List 4 consecutive years.',
  projects:
    'NextGen E-Commerce Dashboard : Real-time analytics dashboard (React, Redux, Chart.js) processing 1M+ data points daily with millisecond latency.\n\nAI-Powered Content Generator : Next.js app using OpenAI APIs for SEO-optimized blog posts with Stripe subscriptions.\n\nOpenSource UI Library : React component library with 50k+ NPM downloads — fully accessible, Tailwind-based.',
  profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  coverImage:   'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
};

/* ── cover image options ─────────────────────────────────── */
const COVER_IMAGES = [
  { id: 'tech',         url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',  name: 'Deep Space' },
  { id: 'office',       url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',  name: 'Modern Office' },
  { id: 'desk',         url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',  name: 'Minimal Desk' },
  { id: 'code',         url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',  name: 'Hacker Code' },
  { id: 'nature',       url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',  name: 'Serene Nature' },
  { id: 'city',         url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',  name: 'City Skyline' },
  { id: 'abstract',     url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',  name: 'Abstract Art' },
  { id: 'architecture', url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',  name: 'Architecture' },
];

/* ── color themes ────────────────────────────────────────── */
const COLORS = {
  blue:    { primary: '#1e293b', accent: '#3b82f6', bg: '#f8fafc' },
  purple:  { primary: '#4c1d95', accent: '#8b5cf6', bg: '#f5f3ff' },
  dark:    { primary: '#0f172a', accent: '#334155', bg: '#ffffff' },
  emerald: { primary: '#064e3b', accent: '#10b981', bg: '#ecfdf5' },
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
const Builder = () => {
  const [searchParams] = useSearchParams();
  const urlType  = searchParams.get('type');
  const urlTheme = searchParams.get('theme');
  const urlColor = searchParams.get('color');

  /* ── state ── */
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', role: '',
    summary: '', skills: '', experience: '', education: '', projects: '',
    profileImage: '',
    coverImage: COVER_IMAGES[0].url,
  });

  const [buildType,            setBuildType]            = useState(urlType === 'portfolio' ? 'portfolio' : 'resume');
  const [activeTemplate,       setActiveTemplate]       = useState(urlTheme || (urlType === 'portfolio' ? 'creative' : 'modern'));
  const [activeColor,          setActiveColor]          = useState(urlColor || 'blue');
  const [isGenerating,         setIsGenerating]         = useState(false);
  const [aiData,               setAiData]               = useState(null);
  const [isExporting,          setIsExporting]          = useState(false);
  const [showExportMenu,       setShowExportMenu]       = useState(false);
  const [isFullscreenPreview,  setIsFullscreenPreview]  = useState(false);
  const [showTemplateBrowser,  setShowTemplateBrowser]  = useState(false);
  const [rawResumeText,        setRawResumeText]        = useState('');
  const [isParsing,            setIsParsing]            = useState(false);
  const [activeTab,            setActiveTab]            = useState('content');

  const previewRef  = useRef(null);
  const fileInputRef = useRef(null);

  /* ── handlers ── */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData(prev => ({ ...prev, profileImage: URL.createObjectURL(file) }));
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await tailorResumeContent(formData);
      setAiData(generated);
      setShowTemplateBrowser(true);
    } catch {
      alert('Failed to generate AI content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleParseResume = async () => {
    if (!rawResumeText.trim()) return;
    setIsParsing(true);
    try {
      const parsed = await parseResumeData(rawResumeText);
      setFormData(prev => ({ ...prev, ...parsed }));
      setActiveTab('content');
      setShowTemplateBrowser(true);
    } catch {
      alert('Failed to parse resume. Please try again.');
    } finally {
      setIsParsing(false);
    }
  };

  /* ── exports ── */
  const exportPDF = async () => {
    setIsExporting(true); setShowExportMenu(false);
    try {
      const canvas  = await html2canvas(previewRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf     = new jsPDF('p', 'mm', 'a4');
      const w       = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, 'JPEG', 0, 0, w, (canvas.height * w) / canvas.width);
      pdf.save(`${formData.name || 'document'}_${buildType}.pdf`);
    } catch { alert('Export failed.'); }
    setIsExporting(false);
  };

  const exportJPG = async () => {
    setIsExporting(true); setShowExportMenu(false);
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const a = document.createElement('a');
      a.download = `${formData.name || 'document'}_${buildType}.jpg`;
      a.href = canvas.toDataURL('image/jpeg', 1.0);
      a.click();
    } catch { alert('Export failed.'); }
    setIsExporting(false);
  };

  const exportDOC = () => {
    setShowExportMenu(false);
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export</title></head><body>";
    const src    = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + previewRef.current.innerHTML + '</body></html>');
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = src;
    a.download = `${formData.name || 'document'}_${buildType}.doc`;
    a.click();
    document.body.removeChild(a);
  };

  const exportZIP = async () => {
    setIsExporting(true); setShowExportMenu(false);
    try {
      const zip  = new JSZip();
      let rawHtml = previewRef.current.innerHTML;
      
      // Package local profile image blob if exists
      if (formData.profileImage && formData.profileImage.startsWith('blob:')) {
        try {
          const imgResponse = await fetch(formData.profileImage);
          const imgBlob = await imgResponse.blob();
          
          // Determine extension
          let ext = 'jpg';
          if (imgBlob.type) {
            const parts = imgBlob.type.split('/');
            if (parts.length > 1) ext = parts[1];
          }
          const filename = `profile_image.${ext}`;
          
          // Add image file to the ZIP folder
          zip.file(filename, imgBlob);
          
          // Replace all occurrences of the blob URL in the HTML with the local file path
          rawHtml = rawHtml.replaceAll(formData.profileImage, `./${filename}`);
        } catch (imgError) {
          console.error("Error packaging profile image blob:", imgError);
        }
      }

      // Construct standard HTML template wrapped inside a portfolio-root container
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name || 'Portfolio'}</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cinzel:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="portfolio-root">
    ${rawHtml}
  </div>
</body>
</html>`;

      const css  = `body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  min-height: 100vh;
}
.portfolio-root {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* =========================================
   PORTFOLIO RESPONSIVE OVERRIDES
   ========================================= */
@media (max-width: 768px) {
  .portfolio-root {
    padding: 0;
  }
  /* Split Layout Portfolio overrides */
  .split-layout-header {
    flex-direction: column !important;
  }
  .split-layout-col-40,
  .split-layout-col-60 {
    width: 100% !important;
  }
  .split-layout-col-40 {
    min-height: 250px !important;
  }
  .split-layout-body {
    flex-direction: column !important;
    padding: 30px 20px !important;
    gap: 30px !important;
  }
  .split-layout-col-30,
  .split-layout-col-70 {
    width: 100% !important;
  }

  /* Bento Grid Portfolio overrides */
  .bento-grid-container {
    grid-template-columns: 1fr !important;
    grid-auto-rows: auto !important;
    padding: 20px 10px !important;
    gap: 15px !important;
  }
  .bento-grid-container > * {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
    padding: 24px !important;
  }

  /* Magazine Portfolio overrides */
  .magazine-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  .magazine-grid > * {
    grid-column: span 1 !important;
  }
}`;

      zip.file('index.html', html.trim());
      zip.file('style.css', css);
      
      const zipContent = await zip.generateAsync({ type: 'blob' });
      saveAs(zipContent, `${formData.name || 'portfolio'}_source.zip`);
    } catch (error) { 
      console.error(error);
      alert('ZIP Export failed.'); 
    }
    setIsExporting(false);
  };

  /* ── helpers ── */
  const ActiveTemplate = () => {
    let found;
    let Comp;
    if (buildType === 'portfolio') {
      found = PORTFOLIO_TEMPLATES.find(t => t.id === activeTemplate);
      Comp = found?.Component || CreativePortfolio;
    } else {
      found = RESUME_TEMPLATES.find(t => t.id === activeTemplate);
      Comp = found?.Component || ModernPro;
    }
    return <Comp data={formData} aiData={aiData} themeColor={COLORS[activeColor]} isPreview={false} />;
  };

  const closeFullscreen = () => setIsFullscreenPreview(false);
  const closeBrowser    = () => setShowTemplateBrowser(false);

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── FULLSCREEN PREVIEW ── */}
      {isFullscreenPreview && (
        <>
          {/* Close button — highest possible z-index */}
          <button className="fullscreen-close-btn" onClick={closeFullscreen}>
            <X size={14} /> Close Preview
          </button>

          {/* Backdrop — click to close */}
          <div className="fullscreen-overlay" onClick={closeFullscreen}>
            {/* Card — stop click propagation */}
            <div
              className="fullscreen-content"
              onClick={e => e.stopPropagation()}
            >
              <ActiveTemplate />
            </div>
          </div>
        </>
      )}

      {/* ── TEMPLATE BROWSER ── */}
      {showTemplateBrowser && (
        <>
          <button className="template-browser-close" onClick={closeBrowser}>
            <X size={14} /> Close
          </button>

          <div className="template-browser-overlay" onClick={closeBrowser}>
            <div
              className="template-browser-panel"
              onClick={e => e.stopPropagation()}
            >
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', margin: '0 0 8px', color: '#0f172a' }}>
                  🎨 Select Your Layout
                </h2>
                <p style={{ color: '#475569', marginBottom: '1rem' }}>
                  Click any template to apply it instantly.
                </p>
                {!aiData && (
                  <button
                    className="btn btn-primary hover-float"
                    onClick={handleAIGenerate}
                    disabled={isGenerating}
                    style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
                  >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    {isGenerating ? 'AI Analyzing…' : '✨ Enhance with AI First'}
                  </button>
                )}
                {aiData && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#166534', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                    ✅ AI Enhanced — showing optimised content
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1.5rem' }}>
                {(buildType === 'portfolio' ? PORTFOLIO_TEMPLATES : RESUME_TEMPLATES).map(t => (
                  <div
                    key={t.id}
                    onClick={() => { setActiveTemplate(t.id); closeBrowser(); }}
                    style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Clipping container */}
                    <div style={{
                      width: '210px', height: '278px', overflow: 'hidden',
                      position: 'relative', borderRadius: '6px',
                      background: '#f8fafc',
                      border: activeTemplate === t.id ? '3px solid var(--accent-primary)' : '2px solid #e2e8f0',
                      boxShadow: activeTemplate === t.id
                        ? '0 0 0 3px rgba(37,99,235,0.2), 0 8px 24px rgba(0,0,0,0.15)'
                        : '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}>
                      {/* Scale-down render */}
                      <div style={{
                        width: '800px', height: '1056px',
                        transform: 'scale(0.2625)', transformOrigin: 'top left',
                        position: 'absolute', top: 0, left: 0,
                        pointerEvents: 'none', background: '#fff',
                      }}>
                        <t.Component data={formData} aiData={aiData} themeColor={COLORS[activeColor]} isPreview={true} />
                      </div>
                      {/* Selected badge */}
                      {activeTemplate === t.id && (
                        <div style={{
                          position: 'absolute', top: 6, right: 6,
                          background: 'var(--accent-primary)', color: '#fff',
                          borderRadius: '50%', width: 20, height: 20,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700,
                        }}>✓</div>
                      )}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                      {t.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── MAIN BUILDER LAYOUT ── */}
      <div className="builder-wrapper">

        {/* ══ SIDEBAR / FORM PANEL ══ */}
        <div className="builder-sidebar">

          {/* Build-type toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.05)', padding: '0.4rem', borderRadius: '8px' }}>
            <button
              className={`btn ${buildType === 'resume' ? 'btn-primary' : 'btn-outline'} flex-1`}
              style={{ padding: '0.45rem 0.5rem', fontSize: '0.8rem' }}
              onClick={() => { setBuildType('resume'); setActiveTemplate('modern'); }}
            >
              📄 Resume Builder
            </button>
            <button
              className={`btn ${buildType === 'portfolio' ? 'btn-primary' : 'btn-outline'} flex-1`}
              style={{ padding: '0.45rem 0.5rem', fontSize: '0.8rem' }}
              onClick={() => { setBuildType('portfolio'); setActiveTemplate('creative'); }}
            >
              🎨 Portfolio Builder
            </button>
          </div>

          {/* Theme engine */}
          <div className="mb-6 p-4 rounded" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Palette size={16} /> Theme Engine
            </h3>

            {/* Layout picker */}
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Layout Style</label>
            <div style={{ marginBottom: '1rem' }}>
              <button
                className="btn btn-outline w-full"
                style={{ padding: '0.6rem', fontSize: '0.8rem' }}
                onClick={() => setShowTemplateBrowser(true)}
              >
                <LayoutTemplate size={15} style={{ marginRight: '0.4rem', display: 'inline' }} />
                Browse {buildType === 'portfolio' ? PORTFOLIO_TEMPLATES.length : RESUME_TEMPLATES.length} Layouts
              </button>
            </div>

            {/* Colour palette */}
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Color Palette</label>
            <div className="flex gap-2" style={{ marginBottom: buildType === 'portfolio' ? '1rem' : 0 }}>
              {Object.entries(COLORS).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setActiveColor(key)}
                  title={key}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
                    background: val.primary,
                    border: activeColor === key ? '2.5px solid white' : '2.5px solid transparent',
                    boxShadow: activeColor === key ? '0 0 0 2px var(--accent-primary)' : 'none',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Cover image (portfolio only) */}
            {buildType === 'portfolio' && (
              <div>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Cover Image</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {COVER_IMAGES.map(img => (
                    <div
                      key={img.id}
                      title={img.name}
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: img.url }))}
                      style={{
                        width: 52, height: 36, borderRadius: 4, cursor: 'pointer',
                        background: `url(${img.url}) center/cover`,
                        border: formData.coverImage === img.url
                          ? '2px solid var(--accent-primary)'
                          : '2px solid transparent',
                        boxShadow: formData.coverImage === img.url
                          ? '0 0 8px rgba(59,130,246,0.5)' : 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content / Import tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <button
              className={`btn ${activeTab === 'content' ? 'btn-primary' : 'btn-outline'} flex-1`}
              onClick={() => setActiveTab('content')}
              style={{ padding: '0.5rem', fontSize: '0.8rem' }}
            >
              <FileText size={14} /> Edit Content
            </button>
            <button
              className={`btn ${activeTab === 'import' ? 'btn-primary' : 'btn-outline'} flex-1`}
              onClick={() => setActiveTab('import')}
              style={{ padding: '0.5rem', fontSize: '0.8rem' }}
            >
              <Upload size={14} /> Import Resume
            </button>
          </div>

          {/* ── IMPORT TAB ── */}
          {activeTab === 'import' && (
            <div className="animate-fade-in">
              <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <Sparkles size={16} color="var(--accent-primary)" /> AI Resume Importer
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Paste your raw resume text. Our AI will instantly organise it and fill out all your details.
              </p>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  rows={10}
                  placeholder="Paste your raw resume text here (from PDF, Word, LinkedIn…)"
                  value={rawResumeText}
                  onChange={e => setRawResumeText(e.target.value)}
                  style={{ resize: 'vertical', fontSize: '0.85rem' }}
                />
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleParseResume}
                disabled={isParsing || !rawResumeText.trim()}
                style={{ justifyContent: 'center' }}
              >
                {isParsing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                {isParsing ? 'Analysing…' : 'Analyse & Auto-Fill'}
              </button>
            </div>
          )}

          {/* ── CONTENT TAB ── */}
          {activeTab === 'content' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Your Details</h2>
                <button
                  className="btn btn-outline"
                  onClick={() => setFormData(DEMO)}
                  style={{ padding: '0.3rem 0.7rem', fontSize: '0.75rem' }}
                >
                  Fill Demo
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-input" placeholder="e.g. Jane Doe" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-input" placeholder="jane@example.com" value={formData.email} onChange={handleChange} />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div className="form-group flex-1">
                  <label className="form-label">Phone</label>
                  <input type="text" name="phone" className="form-input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Location</label>
                  <input type="text" name="location" className="form-input" placeholder="City, State" value={formData.location} onChange={handleChange} />
                </div>
              </div>

              {/* Profile image upload (shown for Modern Pro) */}
              {(activeTemplate === 'modern' || buildType === 'portfolio') && (
                <div className="form-group">
                  <label className="form-label">Profile Photo</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed var(--border-color)',
                      borderRadius: '8px', padding: '0.75rem',
                      textAlign: 'center', cursor: 'pointer',
                      background: 'rgba(0,0,0,0.03)',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    {formData.profileImage ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <img src={formData.profileImage} alt="Profile" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click to change</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <Upload size={16} /> Click to upload photo
                      </div>
                    )}
                  </div>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Desired Role</label>
                <input type="text" name="role" className="form-input" placeholder="e.g. Frontend Developer" value={formData.role} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Professional Summary</label>
                <textarea name="summary" className="form-textarea" rows={3} placeholder="Briefly describe your background…" value={formData.summary} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Key Skills (comma separated)</label>
                <input type="text" name="skills" className="form-input" placeholder="React, Node.js, Python…" value={formData.skills} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Experience</label>
                <textarea name="experience" className="form-textarea" rows={4} placeholder="Company - Role&#10;• Did something great…" value={formData.experience} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Education</label>
                <textarea name="education" className="form-textarea" rows={3} placeholder="University - Degree&#10;• Details…" value={formData.education} onChange={handleChange} />
              </div>

              {buildType === 'portfolio' && (
                <div className="form-group">
                  <label className="form-label">Projects</label>
                  <textarea name="projects" className="form-textarea" rows={4} placeholder="Project Title : Describe what you built…&#10;&#10;Second Project : Built with React…" value={formData.projects} onChange={handleChange} />
                </div>
              )}

              <button
                className="btn btn-primary w-full"
                onClick={handleAIGenerate}
                disabled={isGenerating}
                style={{ justifyContent: 'center', marginTop: '0.5rem' }}
              >
                {isGenerating
                  ? <><Loader2 size={16} className="animate-spin" /> Tailoring with AI…</>
                  : aiData
                    ? <><Sparkles size={16} /> Re-Tailor Content</>
                    : <><Sparkles size={16} /> Auto-Tailor with AI</>
                }
              </button>
            </div>
          )}
        </div>

        {/* ══ PREVIEW PANEL ══ */}
        <div className="builder-preview">

          {/* Toolbar */}
          <div className="builder-preview-toolbar">
            <button
              className="btn btn-outline"
              onClick={() => setIsFullscreenPreview(true)}
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
            >
              <Eye size={15} /> Preview
            </button>

            {/* Export dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-primary"
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                onClick={() => setShowExportMenu(prev => !prev)}
                disabled={isExporting}
              >
                {isExporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                {isExporting ? 'Exporting…' : 'Export'}
              </button>

              {showExportMenu && (
                <div
                  style={{
                    position: 'absolute', top: '110%', right: 0,
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                    borderRadius: '10px', padding: '0.5rem',
                    display: 'flex', flexDirection: 'column', gap: '0.25rem',
                    minWidth: '170px', boxShadow: 'var(--shadow-card)',
                    zIndex: 50,
                  }}
                >
                  {buildType === 'portfolio' ? (
                    <>
                      <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start', fontSize: '0.85rem' }} onClick={exportZIP}>📦 Download ZIP</button>
                      <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start', fontSize: '0.85rem' }} onClick={exportPDF}>📄 Export as PDF</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start', fontSize: '0.85rem' }} onClick={exportPDF}>📄 Export as PDF</button>
                      <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start', fontSize: '0.85rem' }} onClick={exportJPG}>🖼 Export as JPG</button>
                      <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start', fontSize: '0.85rem' }} onClick={exportDOC}>📝 Export as DOC</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Template preview */}
          <div className="builder-preview-content">
            <div className="preview-scale-wrapper">
              <div
                ref={previewRef}
                style={{
                  width: '800px',
                  transformOrigin: 'top left',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform:  isGenerating ? 'scale(0.98)' : 'scale(1)',
                  opacity:    isGenerating ? 0.7 : 1,
                  ...(aiData && !isGenerating ? { filter: 'drop-shadow(var(--shadow-glow))' } : {}),
                }}
              >
                <ActiveTemplate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Builder;
