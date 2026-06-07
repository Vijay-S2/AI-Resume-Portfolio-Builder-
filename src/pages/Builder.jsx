import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Download, Eye, LayoutTemplate, Palette, ArrowLeft, Wand2, FileText, Upload, Loader2 } from 'lucide-react';
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
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Builder = () => {
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get('type');
  const urlTheme = searchParams.get('theme');
  const urlColor = searchParams.get('color');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
    projects: '',
    profileImage: '',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
  });

  const loadDemoData = () => {
    setFormData({
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
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80'
    });
  };

  const coverImages = [
    { id: 'tech', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', name: 'Deep Space' },
    { id: 'office', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80', name: 'Modern Office' },
    { id: 'desk', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', name: 'Minimal Desk' },
    { id: 'code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', name: 'Hacker Code' },
    { id: 'nature', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80', name: 'Serene Nature' },
    { id: 'city', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80', name: 'City Skyline' },
    { id: 'abstract', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', name: 'Abstract Art' },
    { id: 'architecture', url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80', name: 'Architecture' }
  ];

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [buildType, setBuildType] = useState(urlType === 'portfolio' ? 'portfolio' : 'resume');
  const [activeTemplate, setActiveTemplate] = useState(
    urlTheme ? urlTheme : (buildType === 'portfolio' ? 'creative' : 'modern')
  );
  const [activeColor, setActiveColor] = useState(urlColor || 'blue');
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [showTemplateBrowser, setShowTemplateBrowser] = useState(false);
  const [rawResumeText, setRawResumeText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  const colors = {
    blue: { primary: '#1e293b', accent: '#3b82f6', bg: '#f8fafc' },
    purple: { primary: '#4c1d95', accent: '#8b5cf6', bg: '#f5f3ff' },
    dark: { primary: '#0f172a', accent: '#334155', bg: '#ffffff' },
    emerald: { primary: '#064e3b', accent: '#10b981', bg: '#ecfdf5' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, profileImage: url }));
    }
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await tailorResumeContent(formData);
      setAiData(generated);
      setShowTemplateBrowser(true);
    } catch (error) {
      alert("Failed to generate AI content. Please try again.");
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
    } catch (error) {
      alert("Failed to parse resume. Please try again.");
    } finally {
      setIsParsing(false);
    }
  };

  const exportPDF = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.name || 'document'}_${buildType}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Export failed.");
    }
    setIsExporting(false);
  };

  const exportJPG = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const link = document.createElement('a');
      link.download = `${formData.name || 'document'}_${buildType}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.click();
    } catch (e) {
      console.error(e);
      alert("Export failed.");
    }
    setIsExporting(false);
  };

  const exportDOC = () => {
    setShowExportMenu(false);
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + previewRef.current.innerHTML + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${formData.name || 'document'}_${buildType}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const exportZIP = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      const zip = new JSZip();
      const rawHtml = previewRef.current.innerHTML;
      
      const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name || 'Portfolio'}</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  ${rawHtml}
</body>
</html>
      `;

      const styleCss = `
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
      `;

      zip.file("index.html", indexHtml.trim());
      zip.file("style.css", styleCss.trim());
      
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${formData.name || 'portfolio'}_source.zip`);

    } catch (error) {
      console.error(error);
      alert("ZIP Export failed.");
    }
    setIsExporting(false);
  };

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 65px)', display: 'flex', overflow: 'hidden', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
      <div className="glass-card" style={{ width: '400px', minWidth: '360px', overflowY: 'auto', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', padding: '2rem', flexShrink: 0 }}>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
          <button 
            className={`btn ${buildType === 'resume' ? 'btn-primary' : 'btn-outline'} flex-1`} 
            style={{ padding: '0.5rem', fontSize: '0.875rem' }} 
            onClick={() => { setBuildType('resume'); setActiveTemplate('modern'); }}
          >
            Resume Builder
          </button>
          <button 
            className={`btn ${buildType === 'portfolio' ? 'btn-primary' : 'btn-outline'} flex-1`} 
            style={{ padding: '0.5rem', fontSize: '0.875rem' }} 
            onClick={() => { setBuildType('portfolio'); setActiveTemplate('creative'); }}
          >
            Portfolio Builder
          </button>
        </div>

        <div className="mb-6 p-4 rounded" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Palette size={18} /> Theme Engine
          </h3>
          
          <label className="form-label" style={{ fontSize: '0.875rem' }}>Layout Style</label>
          <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
            {buildType === 'portfolio' ? (
              <button className={`btn ${activeTemplate === 'creative' ? 'btn-primary' : 'btn-outline'} flex-1`} style={{ padding: '0.5rem', fontSize: '0.875rem' }} onClick={() => setActiveTemplate('creative')}>Creative Portfolio</button>
            ) : (
              <button className="btn btn-outline w-full" onClick={() => setShowTemplateBrowser(true)} style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                <LayoutTemplate size={16} style={{ marginRight: '0.5rem', display: 'inline-block' }}/> Browse 10 Layouts
              </button>
            )}
          </div>

          <label className="form-label" style={{ fontSize: '0.875rem' }}>Color Palette</label>
          <div className="flex gap-2">
            {Object.keys(colors).map(color => (
              <button 
                key={color}
                onClick={() => setActiveColor(color)}
                style={{ 
                  width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer',
                  background: colors[color].primary, border: activeColor === color ? `2px solid white` : '2px solid transparent',
                  boxShadow: activeColor === color ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                }}
                title={color}
              />
            ))}
          </div>

          {buildType === 'portfolio' && (
            <div style={{ marginTop: '1.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.875rem' }}>Cover Image</label>
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                {coverImages.map(img => (
                  <div 
                    key={img.id}
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: img.url }))}
                    style={{
                      width: '60px', height: '40px', borderRadius: '4px', cursor: 'pointer',
                      background: `url(${img.url}) center/cover`,
                      border: formData.coverImage === img.url ? '2px solid var(--accent-primary)' : '2px solid transparent',
                      boxShadow: formData.coverImage === img.url ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                    }}
                    title={img.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <button 
            className={`btn ${activeTab === 'content' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('content')}
            style={{ flex: 1 }}
          >
            <FileText size={16} /> Edit Content
          </button>
          <button 
            className={`btn ${activeTab === 'import' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('import')}
            style={{ flex: 1 }}
          >
            <Upload size={16} /> Import Resume
          </button>
        </div>

        {activeTab === 'import' && (
          <div className="animate-fade-in">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--accent-primary)" /> AI Resume Importer
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Paste your raw, messy resume text below. Our AI will instantly organize it and fill out all your details.
            </p>
            <div className="form-group">
              <textarea 
                className="form-textarea" 
                rows="15" 
                placeholder="Paste your raw resume text here (from PDF, Word, LinkedIn...)"
                value={rawResumeText}
                onChange={e => setRawResumeText(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>
            <button 
              className="btn btn-primary w-full hover-float" 
              onClick={handleParseResume}
              disabled={isParsing || !rawResumeText.trim()}
              style={{ justifyContent: 'center' }}
            >
              {isParsing ? <div className="animate-spin">⏳</div> : <Wand2 size={18} />}
              {isParsing ? 'Analyzing Resume...' : 'Analyze & Auto-Fill'}
            </button>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Your Details</h2>
              <button className="btn btn-outline" onClick={loadDemoData} style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                Fill Demo Data
              </button>
            </div>

            <div className="form-group animate-slide-up delay-100">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-input" placeholder="e.g. Jane Doe" value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="form-group animate-slide-up delay-100">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-input" placeholder="jane@example.com" value={formData.email} onChange={handleChange} />
            </div>

            <div className="flex gap-4">
              <div className="form-group animate-slide-up delay-100 flex-1">
                <label className="form-label">Phone</label>
                <input type="text" name="phone" className="form-input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group animate-slide-up delay-100 flex-1">
                <label className="form-label">Location</label>
                <input type="text" name="location" className="form-input" placeholder="City, State" value={formData.location} onChange={handleChange} />
              </div>
            </div>

            {activeTemplate === 'modern' && (
              <div className="form-group animate-fade-in">
                <label className="form-label">Profile Image</label>
                <div 
                  style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.2)' }}
                  onClick={() => fileInputRef.current.click()}
                >
                  {formData.profileImage ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                      <img src={formData.profileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span>Image Uploaded (Click to change)</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                      <Upload size={18} /> Click to upload photo
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
              </div>
            )}

            <div className="form-group animate-slide-up delay-200">
              <label className="form-label">Desired Role</label>
              <input type="text" name="role" className="form-input" placeholder="e.g. Frontend Developer" value={formData.role} onChange={handleChange} />
            </div>

            <div className="form-group animate-slide-up delay-200">
              <label className="form-label">Professional Summary</label>
              <textarea name="summary" className="form-textarea" rows="4" placeholder="Briefly describe your background..." value={formData.summary} onChange={handleChange}></textarea>
            </div>

            <div className="form-group animate-slide-up delay-300">
              <label className="form-label">Key Skills (comma separated)</label>
              <input type="text" name="skills" className="form-input" placeholder="React, Node.js, Python..." value={formData.skills} onChange={handleChange} />
            </div>

            <div className="form-group animate-slide-up delay-300">
              <label className="form-label">Experience</label>
              <textarea name="experience" className="form-textarea" rows="4" placeholder="Company Name - Role&#10;• Did something great..." value={formData.experience} onChange={handleChange}></textarea>
            </div>

            <div className="form-group animate-slide-up delay-300">
              <label className="form-label">Education</label>
              <textarea name="education" className="form-textarea" rows="3" placeholder="University Name - Degree&#10;• Details..." value={formData.education} onChange={handleChange}></textarea>
            </div>

            {buildType === 'portfolio' && (
              <div className="form-group animate-slide-up delay-300">
                <label className="form-label">Projects</label>
                <textarea name="projects" className="form-textarea" rows="4" placeholder="Project Title : Describe what you built...&#10;&#10;Second Project : Built with React..." value={formData.projects} onChange={handleChange}></textarea>
              </div>
            )}

            <button 
              className="btn btn-primary w-full mt-4 transition-all" 
              onClick={handleAIGenerate}
              disabled={isGenerating}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {isGenerating ? (
                <><Loader2 size={18} className="animate-spin" /> Tailoring with AI...</>
              ) : aiData ? (
                <><Sparkles size={18} /> Re-Tailor Content</>
              ) : (
                <><Sparkles size={18} /> Auto-Tailor Content</>
              )}
            </button>
          </div>
        )}
      </div>

      <div style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          <button className="btn btn-outline" onClick={() => setIsFullscreenPreview(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: 'var(--glass-bg)', backdropFilter: 'blur(4px)' }}>
            <Eye size={16} /> Preview
          </button>
          
          <div style={{ position: 'relative' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} 
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
            
            {showExportMenu && (
              <div style={{ position: 'absolute', top: '110%', right: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px', boxShadow: 'var(--shadow-card)' }}>
                {buildType === 'portfolio' ? (
                  <>
                    <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start' }} onClick={exportZIP}>Download Source (.ZIP)</button>
                    <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start', opacity: 0.5 }} onClick={exportPDF}>Export as PDF</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start' }} onClick={exportPDF}>Export as PDF</button>
                    <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start' }} onClick={exportJPG}>Export as JPG</button>
                    <button className="btn btn-outline" style={{ border: 'none', justifyContent: 'flex-start' }} onClick={exportDOC}>Export as DOC</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="animate-fade-in delay-200" style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
          
          <div 
            ref={previewRef}
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              position: 'relative',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isGenerating ? 'scale(0.98)' : 'scale(1)',
              opacity: isGenerating ? 0.7 : 1,
              ...(aiData && !isGenerating ? { filter: 'drop-shadow(var(--shadow-glow))' } : {})
            }}
          >
            {activeTemplate === 'modern' && <ModernPro data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'ats' && <MinimalATS data={formData} aiData={aiData} />}
            {activeTemplate === 'exec' && <ExecutiveATS data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'creative' && <CreativePortfolio data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'timeline' && <TimelineResume data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'compact' && <CompactGrid data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'sidebar' && <CreativeSidebar data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'minimal' && <MinimalistElegant data={formData} aiData={aiData} />}
            {activeTemplate === 'tech' && <TechFocused data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'bold' && <BoldHeader data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'classic' && <ClassicTwoColumn data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
          </div>

        </div>
      </div>

      {isFullscreenPreview && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(241,245,249,0.98)', zIndex: 9999, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}
          onClick={() => setIsFullscreenPreview(false)}
        >
          {/* Fixed close button - always visible */}
          <button 
            className="btn btn-primary" 
            style={{ 
              position: 'fixed', top: '1rem', right: '1.5rem', zIndex: 10000, 
              borderRadius: '50px', padding: '0.7rem 1.5rem', fontSize: '0.9rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)', 
              background: '#dc2626',
              border: 'none', cursor: 'pointer'
            }}
            onClick={(e) => { e.stopPropagation(); setIsFullscreenPreview(false); }}
          >
            ✕ Close Preview
          </button>

          {/* Resume content - click stops propagation */}
          <div 
            style={{ width: '100%', maxWidth: '800px', marginTop: '3rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {activeTemplate === 'modern' && <ModernPro data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'ats' && <MinimalATS data={formData} aiData={aiData} />}
            {activeTemplate === 'exec' && <ExecutiveATS data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'creative' && <CreativePortfolio data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'timeline' && <TimelineResume data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'compact' && <CompactGrid data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'sidebar' && <CreativeSidebar data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'minimal' && <MinimalistElegant data={formData} aiData={aiData} />}
            {activeTemplate === 'tech' && <TechFocused data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'bold' && <BoldHeader data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
            {activeTemplate === 'classic' && <ClassicTwoColumn data={formData} aiData={aiData} themeColor={colors[activeColor]} />}
          </div>
        </div>
      )}

      {/* Template Browser Modal */}
      {showTemplateBrowser && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          onClick={() => setShowTemplateBrowser(false)}
        >
          {/* Floating Sticky Close Button */}
          <button 
            className="btn btn-primary" 
            style={{ position: 'fixed', top: '1rem', right: '1.5rem', zIndex: 10000, borderRadius: '50px', padding: '0.7rem 1.5rem', fontSize: '0.9rem', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', background: '#dc2626' }}
            onClick={(e) => { e.stopPropagation(); setShowTemplateBrowser(false); }}
          >
            ✕ Close Previews
          </button>

          <div 
            style={{ background: '#f1f5f9', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '1400px', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0', color: '#0f172a' }}>🎨 Select Your Perfect Layout</h2>
              <p style={{ color: '#475569', fontSize: '1rem', marginTop: '0', marginBottom: '1rem' }}>Click any template to apply it. All previews use your real data.</p>
              {!aiData && (
                <button
                  className="btn btn-primary hover-float"
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  style={{ margin: '0 auto', display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
                >
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  {isGenerating ? 'AI Analyzing Content...' : '✨ Enhance with AI First'}
                </button>
              )}
              {aiData && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#166534', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                  ✅ AI Enhanced — previews show optimized content
                </div>
              )}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
              {[
                { id: 'modern', name: 'Modern Pro', Component: ModernPro },
                { id: 'ats', name: 'Minimal ATS', Component: MinimalATS },
                { id: 'exec', name: 'Executive ATS', Component: ExecutiveATS },
                { id: 'timeline', name: 'Timeline Flow', Component: TimelineResume },
                { id: 'compact', name: 'Compact Grid', Component: CompactGrid },
                { id: 'sidebar', name: 'Creative Sidebar', Component: CreativeSidebar },
                { id: 'minimal', name: 'Minimal Elegant', Component: MinimalistElegant },
                { id: 'tech', name: 'Tech Focused', Component: TechFocused },
                { id: 'bold', name: 'Bold Header', Component: BoldHeader },
                { id: 'classic', name: 'Classic Two Column', Component: ClassicTwoColumn }
              ].map(t => (
                <div 
                  key={t.id} 
                  onClick={() => { setActiveTemplate(t.id); setShowTemplateBrowser(false); }}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.children[0].style.borderColor = 'var(--accent-primary)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.children[0].style.borderColor = activeTemplate === t.id ? 'var(--accent-primary)' : 'var(--border-color)';
                  }}
                >
                  {/* Clip outer container */}
                  <div style={{ 
                    width: '224px',
                    height: '297px',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '6px',
                    background: '#f8fafc',
                    border: activeTemplate === t.id ? '3px solid var(--accent-primary)' : '2px solid #e2e8f0',
                    boxShadow: activeTemplate === t.id ? '0 0 0 3px rgba(37,99,235,0.2), 0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.25s ease'
                  }}>
                    {/* Scaler: position:absolute so it doesn't affect layout. overflow:hidden clips before scaling */}
                    <div style={{ 
                      width: '800px',
                      height: '1056px',
                      transform: 'scale(0.28)', 
                      transformOrigin: 'top left',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      overflow: 'hidden',
                      pointerEvents: 'none',
                      background: '#fff'
                    }}>
                      <t.Component data={formData} aiData={aiData} themeColor={colors[activeColor]} isPreview={true} />
                    </div>
                    {/* Selected overlay badge */}
                    {activeTemplate === t.id && (
                      <div style={{ position: 'absolute', top: '6px', right: '6px', background: 'var(--accent-primary)', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>✓</div>
                    )}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>{t.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
