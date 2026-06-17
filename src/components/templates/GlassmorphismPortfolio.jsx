import { useState } from 'react';

const GlassmorphismPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio...';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js']);
  const experience = data.experience || '';
  const education = data.education || '';
  const projectsRaw = data.projects || 'Project A: Description...\n\nProject B: Description...\n\nProject C: Description...';
  const primary = themeColor?.primary || '#1a1a2e';
  const accent = themeColor?.accent || '#e94560';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });
  const expBlocks = experience ? experience.split('\n\n').filter(e => e.trim()) : [];

  const containerStyle = {
    fontFamily: '"Inter", sans-serif',
    color: '#fff',
    background: `linear-gradient(135deg, ${primary}, #000)`,
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box'
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  };

  if (isPreview) {
    return (
      <div style={{ ...containerStyle, width: '800px', height: '1056px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${coverImg})`, backgroundSize: 'cover', opacity: 0.3, filter: 'blur(8px)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, padding: '40px' }}>
          <div style={{ ...glassStyle, padding: '30px', borderRadius: '16px', textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '32px', color: '#fff' }}>{name}</h1>
            <div style={{ color: accent, fontSize: '14px', letterSpacing: '2px', marginTop: '10px' }}>{role.toUpperCase()}</div>
            <p style={{ marginTop: '15px', fontSize: '12px', lineHeight: '1.6', opacity: 0.9 }}>{summary.substring(0, 150)}...</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ ...glassStyle, padding: '20px', borderRadius: '16px' }}>
              <h2 style={{ color: accent, fontSize: '16px', margin: '0 0 15px 0' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.slice(0, 8).map((s, i) => (
                  <span key={i} style={{ ...glassStyle, padding: '4px 10px', borderRadius: '20px', fontSize: '10px' }}>{s.trim()}</span>
                ))}
              </div>
            </div>
            
            <div style={{ ...glassStyle, padding: '20px', borderRadius: '16px' }}>
              <h2 style={{ color: accent, fontSize: '16px', margin: '0 0 15px 0' }}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {projectItems.slice(0, 3).map((p, i) => (
                  <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '12px' }}>{p.title}</h3>
                    <p style={{ margin: 0, fontSize: '10px', opacity: 0.8 }}>{p.desc.substring(0, 50)}...</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...containerStyle, minHeight: '100vh', padding: '0', overflowX: 'hidden' }}>
      
      {/* Sticky Navigation Bar */}
      <nav className="nav-bar" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <a href="#home" className="nav-brand" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#fff' }}>
          {name.split(' ').map(n => n[0]).join('') || 'PORTFOLIO'}
        </a>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu" style={{ display: 'flex', gap: '20px' }}>
          <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Home</a>
          <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Skills</a>
          <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Projects</a>
          {experience && <a href="#experience" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Experience</a>}
        </div>
        <button id="mobile-menu-toggle" className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', flexDirection: 'column', justifyContent: 'space-between', width: '24px', height: '18px', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: '#fff', transition: 'all 0.3s' }}></span>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: '#fff', transition: 'all 0.3s' }}></span>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: '#fff', transition: 'all 0.3s' }}></span>
        </button>
      </nav>

      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${coverImg})`, backgroundSize: 'cover', opacity: 0.3, filter: 'blur(10px)', zIndex: 0 }}></div>
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '40px 20px' }}>
        <div id="home" style={{ ...glassStyle, padding: '60px 40px', borderRadius: '24px', textAlign: 'center', marginBottom: '40px' }}>
          {data.profileImage && (
            <img src={data.profileImage} alt={name} style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', border: `3px solid ${accent}` }} />
          )}
          <h1 style={{ margin: 0, fontSize: '48px', color: '#fff', fontWeight: 800 }}>{name}</h1>
          <div style={{ color: accent, fontSize: '18px', letterSpacing: '3px', marginTop: '15px', fontWeight: 600 }}>{role.toUpperCase()}</div>
          <p style={{ marginTop: '25px', fontSize: '16px', lineHeight: '1.8', opacity: 0.9, maxWidth: '600px', margin: '25px auto 0' }}>{summary}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            <span style={{ ...glassStyle, padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>{email}</span>
            {phone && <span style={{ ...glassStyle, padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>{phone}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '40px' }}>
          <div id="skills" style={{ ...glassStyle, padding: '40px', borderRadius: '24px' }}>
            <h2 style={{ color: accent, fontSize: '24px', margin: '0 0 25px 0' }}>Expertise</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ ...glassStyle, padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>{s.trim()}</span>
              ))}
            </div>
          </div>

          <div id="projects" style={{ ...glassStyle, padding: '40px', borderRadius: '24px' }}>
            <h2 style={{ color: accent, fontSize: '24px', margin: '0 0 25px 0' }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {projectItems.map((p, i) => (
                <div key={i} style={{ ...glassStyle, padding: '20px', borderRadius: '16px', borderTop: `4px solid ${accent}` }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, lineHeight: '1.6' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {experience && (
            <div id="experience" style={{ ...glassStyle, padding: '40px', borderRadius: '24px' }}>
              <h2 style={{ color: accent, fontSize: '24px', margin: '0 0 25px 0' }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {expBlocks.map((exp, i) => (
                  <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '20px', whiteSpace: 'pre-line' }}>
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismPortfolio;
