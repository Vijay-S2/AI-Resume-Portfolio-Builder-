const TerminalPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio...';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js']);
  const experience = data.experience || '';
  const projectsRaw = data.projects || 'Project A: Description...\n\nProject B: Description...';
  const primary = themeColor?.primary || '#0d1117';
  const accent = themeColor?.accent || '#58a6ff';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const baseStyle = { 
    fontFamily: '"Courier New", Courier, monospace', 
    color: '#c9d1d9', 
    background: primary, 
    boxSizing: 'border-box' 
  };

  const titleBarStyle = {
    background: '#161b22',
    padding: '8px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderBottom: '1px solid #30363d'
  };

  const dotStyle = (color) => ({
    width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color
  });

  if (isPreview) {
    return (
      <div style={{ ...baseStyle, width: '800px', height: '1056px', padding: '20px', overflow: 'hidden' }}>
        <div style={{ border: '1px solid #30363d', borderRadius: '6px', overflow: 'hidden', height: '100%' }}>
          <div style={titleBarStyle}>
            <div style={dotStyle('#ff5f56')}></div>
            <div style={dotStyle('#ffbd2e')}></div>
            <div style={dotStyle('#27c93f')}></div>
            <div style={{ color: '#8b949e', fontSize: '12px', marginLeft: '10px' }}>guest@{name.toLowerCase().replace(/\s+/g, '')}: ~</div>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ color: accent, marginBottom: '10px' }}>$ whoami</div>
            <h1 style={{ fontFamily: '"Inter", sans-serif', fontSize: '28px', color: '#fff', margin: '0 0 5px 0' }}>{name}</h1>
            <div style={{ color: '#7ee787', marginBottom: '20px' }}>&gt; {role}</div>
            
            <div style={{ color: accent, marginBottom: '10px' }}>$ cat summary.txt</div>
            <p style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '30px' }}>{summary.substring(0, 150)}...</p>

            <div style={{ color: accent, marginBottom: '10px' }}>$ ls projects/</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
              {projectItems.slice(0, 2).map((p, i) => (
                <div key={i} style={{ border: '1px solid #30363d', padding: '15px', borderRadius: '6px' }}>
                  <div style={{ color: accent, fontWeight: 'bold', marginBottom: '5px' }}>📁 {p.title}</div>
                  <div style={{ fontSize: '11px', color: '#8b949e' }}>{p.desc.substring(0, 60)}...</div>
                </div>
              ))}
            </div>

            <div style={{ color: accent, marginBottom: '10px' }}>$ npm list --depth=0</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.slice(0, 8).map((s, i) => (
                <span key={i} style={{ color: '#79c0ff', fontSize: '12px' }}>├── {s.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...baseStyle, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #30363d', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <div style={titleBarStyle}>
          <div style={dotStyle('#ff5f56')}></div>
          <div style={dotStyle('#ffbd2e')}></div>
          <div style={dotStyle('#27c93f')}></div>
          <div style={{ color: '#8b949e', fontSize: '14px', marginLeft: '15px', fontFamily: '"Inter", sans-serif' }}>bash - {name.toLowerCase().replace(/\s+/g, '')} - 80x24</div>
        </div>
        
        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ color: accent, fontSize: '16px', marginBottom: '10px' }}><span style={{ color: '#7ee787' }}>➜</span> <span style={{ color: '#79c0ff' }}>~</span> whoami</div>
            {data.profileImage && (
              <img src={data.profileImage} alt={name} style={{ width: '80px', height: '80px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #30363d' }} />
            )}
            <h1 style={{ fontFamily: '"Inter", sans-serif', fontSize: '42px', color: '#c9d1d9', margin: '0 0 10px 0' }}>{name}</h1>
            <div style={{ color: '#7ee787', fontSize: '18px', marginBottom: '20px' }}>&gt; {role}</div>
            
            <div style={{ color: accent, fontSize: '16px', marginBottom: '10px' }}><span style={{ color: '#7ee787' }}>➜</span> <span style={{ color: '#79c0ff' }}>~</span> cat profile.txt</div>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#8b949e', maxWidth: '650px' }}>{summary}</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <div style={{ color: accent, fontSize: '16px', marginBottom: '15px' }}><span style={{ color: '#7ee787' }}>➜</span> <span style={{ color: '#79c0ff' }}>~</span> ls -la skills/</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
              {skills.map((s, i) => (
                <div key={i} style={{ color: '#d2a8ff', fontSize: '15px' }}>
                  -rw-r--r-- 1 {s.trim()}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <div style={{ color: accent, fontSize: '16px', marginBottom: '20px' }}><span style={{ color: '#7ee787' }}>➜</span> <span style={{ color: '#79c0ff' }}>~</span> tree projects/</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {projectItems.map((p, i) => (
                <div key={i} style={{ border: '1px solid #30363d', padding: '25px', borderRadius: '6px', background: '#0d1117' }}>
                  <h3 style={{ color: accent, fontSize: '20px', margin: '0 0 15px 0' }}>📦 {p.title}</h3>
                  <p style={{ margin: 0, fontSize: '15px', color: '#8b949e', lineHeight: '1.6' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {experience && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ color: accent, fontSize: '16px', marginBottom: '15px' }}><span style={{ color: '#7ee787' }}>➜</span> <span style={{ color: '#79c0ff' }}>~</span> tail -f experience.log</div>
              <div style={{ color: '#8b949e', fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-line', padding: '20px', background: '#161b22', borderRadius: '6px', border: '1px solid #30363d' }}>
                {experience}
              </div>
            </div>
          )}

          <div>
            <div style={{ color: accent, fontSize: '16px', marginBottom: '10px' }}><span style={{ color: '#7ee787' }}>➜</span> <span style={{ color: '#79c0ff' }}>~</span> contact</div>
            <div style={{ color: '#c9d1d9', fontSize: '16px' }}>Email: <a href={`mailto:${email}`} style={{ color: accent, textDecoration: 'none' }}>{email}</a></div>
            <div style={{ marginTop: '20px', color: '#8b949e' }}><span style={{ color: '#7ee787' }}>➜</span> <span style={{ color: '#79c0ff' }}>~</span> <span style={{ display: 'inline-block', width: '8px', height: '16px', background: '#c9d1d9', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }}></span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;
