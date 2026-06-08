const CreativePortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my digital portfolio. I build beautiful, high-performance web experiences.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['UI/UX Design', 'React', 'Node.js', 'TypeScript']);
  const experience = data.experience || '';
  const education = data.education || '';
  const projectsRaw = data.projects || 'E-commerce Platform: Built a fully functional store using React and Node.js.\n\nAI Dashboard: Created a beautiful real-time data visualization dashboard.\n\nMobile App: React Native cross-platform app with 50k+ downloads.';
  const primary = themeColor?.primary || '#4c1d95';
  const accent = themeColor?.accent || '#8b5cf6';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) {
      return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    }
    return { title: 'Project', desc: p.trim() };
  });

  const expBlocks = experience ? experience.split('\n\n').filter(e => e.trim()) : [];

  // In preview mode: compact 800x1056 fixed layout
  if (isPreview) {
    return (
      <div style={{
        fontFamily: '"Inter", sans-serif', color: '#1e293b', background: '#f8fafc',
        width: '800px', height: '1056px', overflow: 'hidden', boxSizing: 'border-box', position: 'relative'
      }}>
        {/* Hero */}
        <div style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.55) 100%), url("${coverImg}")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          padding: '36px 40px', color: 'white', textAlign: 'center'
        }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: `3px solid ${accent}`, background: `${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '22px', fontWeight: '800' }}>
            {name.charAt(0)}
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '800' }}>{name}</h1>
          <div style={{ color: accent, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{role}</div>
          <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '11px', lineHeight: '1.5', color: '#cbd5e1' }}>{summary.substring(0, 160)}...</p>
        </div>

        <div style={{ padding: '16px 20px' }}>
          {/* Skills */}
          <div style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: '13px', color: primary, marginBottom: '8px', fontWeight: '700' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.slice(0, 10).map((s, i) => (
                <span key={i} style={{ background: '#fff', border: `1px solid ${accent}`, color: primary, padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '600' }}>{s.trim()}</span>
              ))}
            </div>
          </div>
          {/* Projects */}
          <div>
            <h2 style={{ fontSize: '13px', color: primary, marginBottom: '8px', fontWeight: '700' }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {projectItems.slice(0, 4).map((proj, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '6px', padding: '8px', borderTop: `2px solid ${accent}` }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '11px', color: primary, fontWeight: '700' }}>{proj.title}</h3>
                  <p style={{ margin: 0, fontSize: '10px', color: '#475569', lineHeight: '1.4' }}>{proj.desc.substring(0, 60)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ background: primary, padding: '10px', textAlign: 'center', color: '#fff', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <p style={{ margin: 0, fontSize: '11px' }}>Let's work together · <strong>{email}</strong></p>
        </div>
      </div>
    );
  }

  // FULL VIEW — completely responsive, no fixed width
  return (
    <div style={{ fontFamily: '"Inter", sans-serif', color: '#1e293b', background: '#f8fafc', width: '100%', maxWidth: '800px', margin: '0 auto' }}>

      {/* Hero Section */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 100%), url("${coverImg}")`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px)',
        color: 'white', textAlign: 'center'
      }}>
        {/* Avatar */}
        {data.profileImage ? (
          <img src={data.profileImage} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${accent}`, margin: '0 auto 16px', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }} />
        ) : (
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: `4px solid ${accent}`, background: `linear-gradient(135deg, ${primary}, ${accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '40px', fontWeight: '900', color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            {name.charAt(0)}
          </div>
        )}

        <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: '900', letterSpacing: '-1px' }}>{name}</h1>
        <div style={{ color: accent, fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '16px' }}>{role}</div>
        <p style={{ maxWidth: '560px', margin: '0 auto 20px', fontSize: 'clamp(13px, 2vw, 15px)', lineHeight: '1.7', color: '#cbd5e1' }}>{summary}</p>

        {/* Contact chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '13px' }}>
          {[`✉ ${email}`, `📞 ${phone}`, `📍 ${location}`].map((item, i) => (
            <span key={i} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', padding: '5px 14px', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ background: '#fff', padding: 'clamp(24px, 5vw, 48px)', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: primary, marginBottom: '20px', fontWeight: '800' }}>💡 Expertise</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {skills.map((skill, i) => (
            <span key={i} style={{ background: `${accent}15`, border: `1.5px solid ${accent}`, color: primary, padding: '7px 16px', borderRadius: '25px', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' }}>
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div style={{ padding: 'clamp(24px, 5vw, 48px)', background: '#f8fafc' }}>
        <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: primary, marginBottom: '24px', fontWeight: '800', textAlign: 'center' }}>🚀 Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
          {projectItems.map((proj, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '24px', borderTop: `4px solid ${i % 2 === 0 ? accent : primary}`, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `linear-gradient(135deg, ${primary}, ${accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '16px', flexShrink: 0 }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <h3 style={{ margin: 0, fontSize: '15px', color: primary, fontWeight: '700' }}>{proj.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>{proj.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience (if provided) */}
      {expBlocks.length > 0 && (
        <div style={{ padding: 'clamp(24px, 5vw, 48px)', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: primary, marginBottom: '24px', fontWeight: '800', textAlign: 'center' }}>💼 Work Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {expBlocks.map((block, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', borderLeft: `4px solid ${accent}` }}>
                <div style={{ fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: '#334155' }}>{block}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education (if provided) */}
      {education && (
        <div style={{ padding: 'clamp(24px, 5vw, 48px)', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: primary, marginBottom: '20px', fontWeight: '800', textAlign: 'center' }}>🎓 Education</h2>
          <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', borderLeft: `4px solid ${primary}` }}>
            <div style={{ fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: '#334155' }}>{education}</div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '800', color: '#fff' }}>Let's Work Together! 🤝</h2>
        <p style={{ margin: '0 0 20px', fontSize: '15px', opacity: 0.85 }}>Open to exciting opportunities and collaborations.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a href={`mailto:${email}`} style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: '#fff', padding: '10px 24px', borderRadius: '25px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            ✉ {email}
          </a>
          {phone && (
            <span style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: '#fff', padding: '10px 24px', borderRadius: '25px', fontWeight: '600', fontSize: '14px' }}>
              📞 {phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativePortfolio;
