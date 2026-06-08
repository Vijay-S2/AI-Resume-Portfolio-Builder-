const LuxuryPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio...';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js']);
  const experience = data.experience || '';
  const projectsRaw = data.projects || 'Project A: Description...\n\nProject B: Description...';
  const primary = themeColor?.primary || '#0c0c0c';
  const accent = themeColor?.accent || '#c9a55c';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const baseStyle = { 
    fontFamily: '"Cinzel", "Inter", serif', 
    color: '#e5e5e5', 
    background: primary, 
    boxSizing: 'border-box',
    fontWeight: 300
  };

  if (isPreview) {
    return (
      <div style={{ ...baseStyle, width: '800px', height: '1056px', padding: '40px', overflow: 'hidden' }}>
        <div style={{ height: '400px', backgroundImage: `radial-gradient(circle, rgba(12,12,12,0.3) 0%, rgba(12,12,12,1) 100%), url(${coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${accent}` }}>
          <h1 style={{ fontSize: '36px', letterSpacing: '8px', margin: '0 0 15px 0', textTransform: 'uppercase', color: '#fff' }}>{name}</h1>
          <div style={{ width: '40px', height: '1px', background: accent, marginBottom: '15px' }}></div>
          <div style={{ fontSize: '12px', letterSpacing: '4px', color: accent, textTransform: 'uppercase' }}>{role}</div>
        </div>

        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', lineHeight: '1.8', fontStyle: 'italic', maxWidth: '500px', margin: '0 auto 40px', color: '#a3a3a3' }}>{summary.substring(0, 150)}...</p>
          
          <h2 style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', color: accent, marginBottom: '20px' }}>Selected Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
            {projectItems.slice(0, 2).map((p, i) => (
              <div key={i} style={{ borderTop: `1px solid ${accent}40`, paddingTop: '15px', textAlign: 'left' }}>
                <div style={{ color: accent, fontSize: '10px', marginBottom: '5px' }}>0{i + 1}</div>
                <h3 style={{ fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px 0', color: '#fff' }}>{p.title}</h3>
                <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#888', margin: 0 }}>{p.desc.substring(0, 60)}...</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase', color: accent, marginBottom: '20px' }}>Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {skills.slice(0, 6).map((s, i) => (
              <span key={i} style={{ border: `1px solid ${accent}40`, padding: '6px 15px', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#ccc' }}>{s.trim()}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...baseStyle, minHeight: '100vh' }}>
      <div style={{ height: '70vh', minHeight: '500px', backgroundImage: `radial-gradient(circle, rgba(12,12,12,0.4) 0%, rgba(12,12,12,1) 100%), url(${coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {data.profileImage && (
          <img src={data.profileImage} alt={name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '30px', border: `1px solid ${accent}` }} />
        )}
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', letterSpacing: 'clamp(4px, 1vw, 12px)', margin: '0 0 20px 0', textTransform: 'uppercase', color: '#fff', textAlign: 'center' }}>{name}</h1>
        <div style={{ width: '60px', height: '1px', background: accent, marginBottom: '25px' }}></div>
        <div style={{ fontSize: 'clamp(12px, 2vw, 16px)', letterSpacing: 'clamp(3px, 0.5vw, 6px)', color: accent, textTransform: 'uppercase' }}>{role}</div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{ fontSize: '18px', lineHeight: '2', fontStyle: 'italic', color: '#a3a3a3', maxWidth: '650px', margin: '0 auto' }}>"{summary}"</p>
        </div>

        <div style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', letterSpacing: '4px', textTransform: 'uppercase', color: accent, margin: 0, paddingRight: '20px' }}>Selected Works</h2>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accent}40, transparent)` }}></div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {projectItems.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '30px' }}>
                <div style={{ color: accent, fontSize: '14px', letterSpacing: '2px', paddingTop: '5px' }}>0{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '24px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 15px 0', color: '#fff', fontWeight: 400 }}>{p.title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#888', margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', letterSpacing: '4px', textTransform: 'uppercase', color: accent, margin: 0, paddingRight: '20px' }}>Expertise</h2>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accent}40, transparent)` }}></div>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ border: `1px solid ${accent}40`, padding: '12px 25px', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: '#ccc', transition: 'all 0.3s' }}>{s.trim()}</span>
            ))}
          </div>
        </div>

        {experience && (
          <div style={{ marginBottom: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '18px', letterSpacing: '4px', textTransform: 'uppercase', color: accent, margin: 0, paddingRight: '20px' }}>Experience</h2>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accent}40, transparent)` }}></div>
            </div>
            <div style={{ borderLeft: `1px solid ${accent}40`, paddingLeft: '30px' }}>
              <div style={{ whiteSpace: 'pre-line', fontSize: '15px', lineHeight: '2', color: '#a3a3a3' }}>
                {experience}
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', borderTop: `1px solid ${accent}20`, paddingTop: '60px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', color: '#fff', marginBottom: '20px' }}>Inquiries</h2>
          <a href={`mailto:${email}`} style={{ color: accent, textDecoration: 'none', fontSize: '16px', letterSpacing: '2px', borderBottom: `1px solid ${accent}` }}>{email}</a>
        </div>
      </div>
    </div>
  );
};

export default LuxuryPortfolio;
