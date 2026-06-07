const CreativePortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my digital portfolio.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['UI/UX', 'React', 'Design']);
  const projectsRaw = data.projects || 'E-commerce Platform: Built a fully functional store using React.\n\nAI Dashboard: Created a beautiful data visualization dashboard.\n\nMobile App: React Native cross-platform app.';
  const primary = themeColor?.primary || '#4c1d95';
  const accent = themeColor?.accent || '#8b5cf6';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).slice(0, 4).map(p => {
    const split = p.split(':');
    return { title: split[0]?.trim() || 'Project', desc: split[1]?.trim() || p.trim() };
  });

  return (
    <div style={{
      fontFamily: '"Inter", sans-serif', color: '#1e293b', background: '#f8fafc',
      width: '800px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box', position: 'relative'
    }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 100%), url("${coverImg}")`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: isPreview ? '40px' : '72px 48px',
        color: 'white', textAlign: 'center'
      }}>
        <div style={{ width: isPreview ? '64px' : '100px', height: isPreview ? '64px' : '100px', borderRadius: '50%', border: `3px solid ${accent}`, background: `${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: isPreview ? '22px' : '36px', fontWeight: '800' }}>
          {name.charAt(0)}
        </div>
        <h1 style={{ margin: '0 0 6px 0', fontSize: isPreview ? '26px' : '40px', fontWeight: '800', letterSpacing: '-0.02em' }}>{name}</h1>
        <div style={{ color: accent, fontSize: isPreview ? '13px' : '18px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>{role}</div>
        <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: isPreview ? '11px' : '14px', lineHeight: '1.6', color: '#cbd5e1' }}>{summary.substring(0, 180)}{summary.length > 180 ? '...' : ''}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px', fontSize: '11px', opacity: 0.75 }}>
          <span>{data.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{data.phone || '(555) 123-4567'}</span>
        </div>
      </div>

      <div style={{ padding: isPreview ? '20px' : '36px' }}>
        {/* Skills */}
        <div style={{ marginBottom: isPreview ? '16px' : '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: isPreview ? '14px' : '20px', color: primary, marginBottom: '12px', fontWeight: '700' }}>Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {skills.slice(0, 10).map((skill, index) => (
              <div key={index} style={{ background: '#fff', border: `1px solid ${accent}`, color: primary, padding: isPreview ? '3px 8px' : '6px 14px', borderRadius: '20px', fontSize: isPreview ? '10px' : '13px', fontWeight: '600' }}>
                {skill.trim()}
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 style={{ fontSize: isPreview ? '14px' : '20px', color: primary, marginBottom: '12px', fontWeight: '700', textAlign: 'center' }}>Featured Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isPreview ? '10px' : '16px' }}>
            {projectItems.map((proj, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', padding: isPreview ? '10px' : '20px', borderTop: `3px solid ${accent}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: isPreview ? '11px' : '15px', color: primary, fontWeight: '700' }}>{proj.title}</h3>
                <p style={{ margin: 0, fontSize: isPreview ? '10px' : '13px', color: '#475569', lineHeight: '1.5' }}>{proj.desc.substring(0, 80)}{proj.desc.length > 80 ? '...' : ''}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: primary, padding: '14px', textAlign: 'center', color: '#fff', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <p style={{ margin: 0, fontSize: '12px' }}>Let's work together · <strong>{data.email || 'email@example.com'}</strong></p>
      </div>
    </div>
  );
};

export default CreativePortfolio;
