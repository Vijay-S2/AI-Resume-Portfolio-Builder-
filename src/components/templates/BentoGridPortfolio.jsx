import { useState } from 'react';

const BentoGridPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio...';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js']);
  const projectsRaw = data.projects || 'Project A: Description...\n\nProject B: Description...';
  const primary = themeColor?.primary || '#18181b';
  const accent = themeColor?.accent || '#a78bfa';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const baseStyle = { fontFamily: '"Inter", sans-serif', color: '#18181b', background: '#f4f4f5', boxSizing: 'border-box' };

  if (isPreview) {
    return (
      <div style={{ ...baseStyle, width: '800px', height: '1056px', padding: '30px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', gridAutoRows: 'minmax(120px, auto)' }}>
          {/* Hero Bento */}
          <div style={{ gridColumn: 'span 4', gridRow: 'span 2', background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${coverImg})`, backgroundSize: 'cover', borderRadius: '16px', padding: '30px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h1 style={{ fontSize: '32px', margin: '0 0 5px 0' }}>{name}</h1>
            <div style={{ color: accent, fontSize: '14px', fontWeight: 'bold' }}>{role}</div>
          </div>

          {/* Summary Bento */}
          <div style={{ gridColumn: 'span 2', gridRow: 'span 1', background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '11px', margin: 0, lineHeight: '1.5', color: '#52525b' }}>{summary.substring(0, 150)}...</p>
          </div>

          {/* Skills Bento */}
          <div style={{ gridColumn: 'span 2', gridRow: 'span 1', background: primary, color: '#fff', borderRadius: '16px', padding: '20px' }}>
            <h2 style={{ fontSize: '14px', color: accent, margin: '0 0 10px 0' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.slice(0, 6).map((s, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '6px', fontSize: '10px' }}>{s.trim()}</span>
              ))}
            </div>
          </div>

          {/* Projects Bento */}
          {projectItems.slice(0, 4).map((p, i) => (
            <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'span 2', gridRow: 'span 1', background: '#fff', borderRadius: '16px', padding: '20px', border: i === 0 ? `2px solid ${accent}` : 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '14px', margin: '0 0 5px 0', color: primary }}>{p.title}</h3>
              <p style={{ fontSize: '10px', margin: 0, color: '#71717a' }}>{p.desc.substring(0, 60)}...</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...baseStyle, minHeight: '100vh', padding: '0' }}>

      {/* Sticky Navigation Bar */}
      <nav className="nav-bar" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        <a href="#home" className="nav-brand" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: primary }}>
          {name.split(' ').map(n => n[0]).join('') || 'PORTFOLIO'}
        </a>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu" style={{ display: 'flex', gap: '20px' }}>
          <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Home</a>
          <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Skills</a>
          <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Projects</a>
          <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Contact</a>
        </div>
        <button id="mobile-menu-toggle" className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', flexDirection: 'column', justifyContent: 'space-between', width: '24px', height: '18px', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: primary, transition: 'all 0.3s' }}></span>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: primary, transition: 'all 0.3s' }}></span>
          <span style={{ display: 'block', width: '100%', height: '2px', backgroundColor: primary, transition: 'all 0.3s' }}></span>
        </button>
      </nav>

      <div style={{ padding: '40px 20px' }}>
        <div id="home" className="bento-grid-container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', gridAutoRows: 'minmax(150px, auto)' }}>
          
          {/* Hero Bento */}
          <div style={{ gridColumn: 'span 8', gridRow: 'span 3', background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '24px', padding: '50px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            {data.profileImage && (
              <img src={data.profileImage} alt={name} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #fff', marginBottom: '20px' }} />
            )}
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '0 0 10px 0', fontWeight: '800', letterSpacing: '-1px' }}>{name}</h1>
            <div style={{ color: accent, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: '600' }}>{role}</div>
          </div>

          {/* Contact Bento */}
          <div id="contact" style={{ gridColumn: 'span 4', gridRow: 'span 1', background: primary, color: '#fff', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 15px 0', color: accent }}>Get in Touch</h2>
            <a href={`mailto:${email}`} style={{ color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', width: '100%', textAlign: 'center', wordBreak: 'break-all' }}>{email}</a>
          </div>

          {/* Summary Bento */}
          <div style={{ gridColumn: 'span 4', gridRow: 'span 2', background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: '16px', margin: 0, lineHeight: '1.7', color: '#52525b' }}>{summary}</p>
          </div>

          {/* Skills Bento */}
          <div id="skills" style={{ gridColumn: 'span 12', gridRow: 'span 1', background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '20px', color: primary, margin: '0 0 20px 0' }}>Core Expertise</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map((s, i) => (
                <span key={i} style={{ background: '#f4f4f5', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: '500', color: '#3f3f46' }}>{s.trim()}</span>
              ))}
            </div>
          </div>

          {/* Projects Bento Grid */}
          {projectItems.map((p, i) => (
            <div id={i === 0 ? 'projects' : undefined} key={i} style={{ 
              gridColumn: i === 0 ? 'span 8' : 'span 4', 
              gridRow: i === 0 ? 'span 2' : 'span 2', 
              background: i === 0 ? primary : '#fff', 
              color: i === 0 ? '#fff' : primary,
              borderRadius: '24px', padding: '40px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column'
            }}>
              <h3 style={{ fontSize: i === 0 ? 'clamp(20px, 3vw, 28px)' : 'clamp(16px, 2vw, 22px)', margin: '0 0 15px 0', color: i === 0 ? accent : primary }}>{p.title}</h3>
              <p style={{ fontSize: '15px', margin: 0, lineHeight: '1.6', color: i === 0 ? '#d4d4d8' : '#71717a' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoGridPortfolio;
