const NeonDarkPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio...';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js']);
  const experience = data.experience || '';
  const projectsRaw = data.projects || 'Project A: Description...\n\nProject B: Description...';
  const primary = themeColor?.primary || '#0a0a0f';
  const accent = themeColor?.accent || '#00f5d4';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });
  const expBlocks = experience ? experience.split('\n\n').filter(e => e.trim()) : [];

  const neonGlow = `0 0 10px ${accent}, 0 0 20px ${accent}`;

  const containerStyle = {
    fontFamily: '"Inter", sans-serif',
    color: '#e2e8f0',
    backgroundColor: primary,
    backgroundImage: `linear-gradient(rgba(10,10,15,0.9), rgba(10,10,15,0.9)), url(${coverImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box'
  };

  if (isPreview) {
    return (
      <div style={{ ...containerStyle, width: '800px', height: '1056px', padding: '40px' }}>
        <div style={{ border: `2px solid ${accent}`, padding: '30px', boxShadow: neonGlow, marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '36px', color: '#fff', textShadow: neonGlow, textTransform: 'uppercase' }}>{name}</h1>
          <div style={{ color: accent, fontSize: '14px', letterSpacing: '4px', marginTop: '10px' }}>{role}</div>
          <p style={{ marginTop: '20px', fontSize: '12px', lineHeight: '1.6' }}>{summary.substring(0, 160)}...</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h2 style={{ color: accent, fontSize: '18px', borderBottom: `1px solid ${accent}`, paddingBottom: '10px' }}>SYS.SKILLS</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
              {skills.slice(0, 10).map((s, i) => (
                <span key={i} style={{ border: `1px solid ${accent}`, padding: '4px 8px', fontSize: '10px', color: accent }}>{s.trim()}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ color: accent, fontSize: '18px', borderBottom: `1px solid ${accent}`, paddingBottom: '10px' }}>SYS.PROJECTS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              {projectItems.slice(0, 3).map((p, i) => (
                <div key={i} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '10px' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#fff' }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: '10px' }}>{p.desc.substring(0, 60)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...containerStyle, minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ border: `2px solid ${accent}`, padding: '50px', boxShadow: neonGlow, textAlign: 'center', marginBottom: '60px', background: 'rgba(0,0,0,0.5)' }}>
          {data.profileImage && (
            <img src={data.profileImage} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px', border: `2px solid ${accent}`, boxShadow: neonGlow }} />
          )}
          <h1 style={{ margin: 0, fontSize: '50px', color: '#fff', textShadow: neonGlow, textTransform: 'uppercase', letterSpacing: '2px' }}>{name}</h1>
          <div style={{ color: accent, fontSize: '20px', letterSpacing: '5px', marginTop: '15px' }}>{role}</div>
          <p style={{ marginTop: '30px', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '30px auto 0' }}>{summary}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            <span style={{ color: accent, fontSize: '14px' }}>[{email}]</span>
            {phone && <span style={{ color: accent, fontSize: '14px' }}>[{phone}]</span>}
          </div>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ color: accent, fontSize: '24px', borderBottom: `2px solid ${accent}`, paddingBottom: '15px', textShadow: neonGlow, display: 'inline-block' }}>SYS.EXPERTISE</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '30px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ border: `1px solid ${accent}`, padding: '8px 16px', fontSize: '14px', color: accent, boxShadow: `inset 0 0 10px ${accent}40`, textTransform: 'uppercase' }}>{s.trim()}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ color: accent, fontSize: '24px', borderBottom: `2px solid ${accent}`, paddingBottom: '15px', textShadow: neonGlow, display: 'inline-block' }}>SYS.PROJECTS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
            {projectItems.map((p, i) => (
              <div key={i} style={{ border: `1px solid rgba(255,255,255,0.1)`, padding: '25px', borderTop: `3px solid ${accent}`, background: 'rgba(0,0,0,0.6)' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', color: '#fff' }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {expBlocks.length > 0 && (
          <div>
            <h2 style={{ color: accent, fontSize: '24px', borderBottom: `2px solid ${accent}`, paddingBottom: '15px', textShadow: neonGlow, display: 'inline-block' }}>SYS.LOGS // EXP</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '30px' }}>
              {expBlocks.map((exp, i) => (
                <div key={i} style={{ borderLeft: `2px dashed ${accent}`, paddingLeft: '20px', whiteSpace: 'pre-line', fontSize: '15px', lineHeight: '1.8' }}>
                  {exp}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeonDarkPortfolio;
