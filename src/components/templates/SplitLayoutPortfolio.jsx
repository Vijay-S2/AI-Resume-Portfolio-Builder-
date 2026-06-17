import { useState } from 'react';

const SplitLayoutPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio...';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js']);
  const experience = data.experience || '';
  const projectsRaw = data.projects || 'Project A: Description...\n\nProject B: Description...';
  const primary = themeColor?.primary || '#2d3436';
  const accent = themeColor?.accent || '#6c5ce7';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const baseStyle = { fontFamily: '"Inter", sans-serif', color: '#333', background: '#fff', boxSizing: 'border-box' };

  if (isPreview) {
    return (
      <div style={{ ...baseStyle, width: '800px', height: '1056px', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: '40%', backgroundImage: `url(${coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ width: '60%', background: primary, color: '#fff', padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '36px', margin: '0 0 10px 0', color: '#fff' }}>{name}</h1>
          <div style={{ color: accent, fontSize: '16px', fontWeight: 'bold', marginBottom: '30px' }}>{role}</div>
          <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '40px' }}>{summary.substring(0, 200)}...</p>
          
          <h2 style={{ fontSize: '16px', color: accent, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px', marginBottom: '15px' }}>Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
            {skills.slice(0, 8).map((s, i) => (
              <span key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 10px', fontSize: '11px', borderRadius: '4px' }}>{s.trim()}</span>
            ))}
          </div>

          <h2 style={{ fontSize: '16px', color: accent, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px', marginBottom: '15px' }}>Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {projectItems.slice(0, 3).map((p, i) => (
              <div key={i}>
                <h3 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>{p.title}</h3>
                <p style={{ fontSize: '11px', margin: 0, opacity: 0.8 }}>{p.desc.substring(0, 60)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...baseStyle, margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* Sticky Navigation Bar */}
      <nav className="nav-bar" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(226,232,240,0.8)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        <a href="#home" className="nav-brand" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: primary }}>
          {name.split(' ').map(n => n[0]).join('') || 'PORTFOLIO'}
        </a>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu" style={{ display: 'flex', gap: '20px' }}>
          <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Home</a>
          <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Skills</a>
          <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Projects</a>
          {experience && <a href="#experience" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Experience</a>}
          <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Contact</a>
        </div>
        <button id="mobile-menu-toggle" className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', flexDirection: 'column', justifyContent: 'space-between', width: '24px', height: '18px', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: primary, transition: 'all 0.3s' }}></span>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: primary, transition: 'all 0.3s' }}></span>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: primary, transition: 'all 0.3s' }}></span>
        </button>
      </nav>

      <div id="home" className="split-layout-header" style={{ display: 'flex', flexDirection: 'row', minHeight: '500px' }}>
        <div className="split-layout-col-40" style={{ width: '40%', backgroundImage: `url(${coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {data.profileImage && (
            <div style={{ padding: '40px' }}>
              <img src={data.profileImage} alt={name} style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #fff' }} />
            </div>
          )}
        </div>
        <div className="split-layout-col-60" style={{ width: '60%', background: primary, color: '#fff', padding: 'clamp(30px,5vw,60px) clamp(20px,4vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', margin: '0 0 10px 0', lineHeight: '1.1' }}>{name}</h1>
          <div style={{ color: accent, fontSize: 'clamp(16px,2vw,20px)', fontWeight: 'bold', marginBottom: '20px' }}>{role}</div>
          <p style={{ fontSize: 'clamp(13px,1.5vw,16px)', lineHeight: '1.8', opacity: 0.9 }}>{summary}</p>
          <div id="contact" style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '14px' }}>
            <a href={`mailto:${email}`} style={{ color: '#fff', opacity: 0.85 }}>{email}</a>
            <span style={{ opacity: 0.85 }}>{phone}</span>
          </div>
        </div>
      </div>
      
      <div id="skills" className="split-layout-body" style={{ display: 'flex', padding: 'clamp(30px,5vw,60px) clamp(20px,4vw,40px)', gap: '40px', background: '#f8fafc' }}>
        <div className="split-layout-col-30" style={{ width: '30%' }}>
          <h2 style={{ fontSize: '24px', color: primary, marginBottom: '20px', borderBottom: `3px solid ${accent}`, paddingBottom: '10px', display: 'inline-block' }}>Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: '#fff', padding: '10px 15px', borderRadius: '4px', fontSize: '14px', borderLeft: `3px solid ${accent}`, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>{s.trim()}</span>
            ))}
          </div>
        </div>
        
        <div id="projects" className="split-layout-col-70" style={{ width: '70%' }}>
          <h2 style={{ fontSize: '24px', color: primary, marginBottom: '20px', borderBottom: `3px solid ${accent}`, paddingBottom: '10px', display: 'inline-block' }}>Featured Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projectItems.map((p, i) => (
              <div key={i} style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '18px', color: primary, margin: '0 0 10px 0' }}>{p.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: '#555' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {experience && (
        <div id="experience" style={{ padding: 'clamp(30px,5vw,60px) clamp(20px,4vw,40px)', background: '#fff' }}>
          <h2 style={{ fontSize: '24px', color: primary, marginBottom: '30px', borderBottom: `3px solid ${accent}`, paddingBottom: '10px', display: 'inline-block' }}>Experience</h2>
          <div style={{ whiteSpace: 'pre-line', fontSize: '15px', lineHeight: '1.8', color: '#444' }}>
            {experience}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitLayoutPortfolio;
