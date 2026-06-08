const GradientWavePortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio...';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js']);
  const experience = data.experience || '';
  const projectsRaw = data.projects || 'Project A: Description...\n\nProject B: Description...';
  const primary = themeColor?.primary || '#667eea';
  const accent = themeColor?.accent || '#764ba2';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const baseStyle = { fontFamily: '"Inter", sans-serif', color: '#1f2937', background: '#fff', boxSizing: 'border-box' };

  if (isPreview) {
    return (
      <div style={{ ...baseStyle, width: '800px', height: '1056px', overflow: 'hidden' }}>
        <div style={{ height: '350px', background: `linear-gradient(135deg, ${primary}cc, ${accent}cc), url(${coverImg})`, backgroundSize: 'cover', backgroundPosition: 'center', clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)', padding: '40px', color: '#fff' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 10px 0' }}>{name}</h1>
          <div style={{ background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '5px 10px', borderRadius: '4px', fontSize: '14px', marginBottom: '20px' }}>{role}</div>
          <p style={{ fontSize: '12px', lineHeight: '1.6', maxWidth: '400px' }}>{summary.substring(0, 150)}...</p>
        </div>

        <div style={{ padding: '20px 40px' }}>
          <h2 style={{ fontSize: '18px', color: accent, marginBottom: '15px' }}>Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '30px' }}>
            {skills.slice(0, 8).map((s, i) => (
              <span key={i} style={{ background: `linear-gradient(90deg, ${primary}, ${accent})`, color: '#fff', padding: '4px 12px', fontSize: '11px', borderRadius: '15px' }}>{s.trim()}</span>
            ))}
          </div>

          <h2 style={{ fontSize: '18px', color: accent, marginBottom: '15px' }}>Selected Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {projectItems.slice(0, 2).map((p, i) => (
              <div key={i} style={{ background: '#f3f4f6', padding: '15px', borderRadius: '8px', borderTop: `3px solid ${primary}` }}>
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
    <div style={{ ...baseStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        padding: '80px 40px 120px', 
        background: `linear-gradient(135deg, ${primary}e6, ${accent}e6), url(${coverImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)', 
        color: '#fff',
        textAlign: 'center'
      }}>
        {data.profileImage && (
          <img src={data.profileImage} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid #fff', margin: '0 auto 20px', objectFit: 'cover' }} />
        )}
        <h1 style={{ fontSize: '50px', margin: '0 0 15px 0', letterSpacing: '1px' }}>{name}</h1>
        <div style={{ background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '8px 16px', borderRadius: '20px', fontSize: '18px', fontWeight: '500', marginBottom: '30px', backdropFilter: 'blur(5px)' }}>{role}</div>
        <p style={{ fontSize: '18px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>{summary}</p>
      </div>

      <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', color: primary, marginBottom: '25px', textAlign: 'center' }}>Skills & Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, color: '#fff', padding: '10px 20px', fontSize: '15px', borderRadius: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>{s.trim()}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', color: primary, marginBottom: '25px', textAlign: 'center' }}>Featured Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {projectItems.map((p, i) => (
              <div key={i} style={{ background: '#fff', padding: '30px', borderRadius: '12px', borderTop: `5px solid ${i % 2 === 0 ? primary : accent}`, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${primary}, ${accent})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '15px' }}>{i + 1}</div>
                <h3 style={{ fontSize: '22px', margin: '0 0 15px 0', color: '#1f2937' }}>{p.title}</h3>
                <p style={{ fontSize: '15px', color: '#4b5563', margin: 0, lineHeight: '1.7' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {experience && (
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '28px', color: primary, marginBottom: '25px', textAlign: 'center' }}>Professional Journey</h2>
            <div style={{ background: '#faf5ff', padding: '40px', borderRadius: '16px', borderLeft: `5px solid ${accent}` }}>
              <div style={{ whiteSpace: 'pre-line', fontSize: '16px', lineHeight: '1.8', color: '#4b5563' }}>
                {experience}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div style={{ 
        padding: '100px 40px 60px', 
        background: `linear-gradient(135deg, ${primary}, ${accent})`, 
        clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0% 100%)', 
        color: '#fff',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <h2 style={{ fontSize: '32px', margin: '0 0 20px 0' }}>Let's Connect</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href={`mailto:${email}`} style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 30px', borderRadius: '30px', color: '#fff', textDecoration: 'none', fontWeight: '600', backdropFilter: 'blur(5px)' }}>{email}</a>
        </div>
      </div>
    </div>
  );
};

export default GradientWavePortfolio;
