const TechFocused = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Software Engineer';
  const summary = aiData?.enhancedSummary || data.summary || 'Summary.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['React', 'Node.js']);
  const experience = data.experience || 'Experience details.';
  const education = data.education || 'Education details.';
  const primary = themeColor?.primary || '#0f172a';
  const accent = themeColor?.accent || '#10b981';

  return (
    <div style={{
      fontFamily: '"Fira Code", "Courier New", monospace', color: '#e2e8f0', background: primary,
      width: '800px', padding: '44px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', borderBottom: `1px dashed ${accent}40`, paddingBottom: '20px' }}>
        <div style={{ color: accent, fontSize: '13px', marginBottom: '8px', opacity: 0.8 }}>$ whoami</div>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '30px', fontWeight: 'bold', color: '#f8fafc' }}>{name}</h1>
        <div style={{ fontSize: '15px', color: accent }}>{'>'} {role}</div>
        <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.6, display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <span>✉ {data.email || 'email@example.com'}</span>
          <span>📞 {data.phone || '(555) 123-4567'}</span>
          <span>📍 {data.location || 'City, State'}</span>
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: accent, fontSize: '12px', marginBottom: '8px', opacity: 0.8 }}>$ cat summary.txt</div>
        <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.7', opacity: 0.85 }}>{summary}</p>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: accent, fontSize: '12px', marginBottom: '10px', opacity: 0.8 }}>$ ls ./skills/</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.slice(0, 14).map((s, i) => (
            <span key={i} style={{ fontSize: '12px', background: `${accent}20`, border: `1px solid ${accent}40`, color: accent, padding: '4px 10px', borderRadius: '4px' }}>{s.trim()}</span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ color: accent, fontSize: '12px', marginBottom: '10px', opacity: 0.8 }}>$ tail experience.log</div>
        <div style={{ fontSize: '12px', lineHeight: '1.7', whiteSpace: 'pre-wrap', opacity: 0.85 }}>{experience}</div>
      </div>

      {/* Education */}
      <div>
        <div style={{ color: accent, fontSize: '12px', marginBottom: '10px', opacity: 0.8 }}>$ cat education.txt</div>
        <div style={{ fontSize: '12px', lineHeight: '1.7', whiteSpace: 'pre-wrap', opacity: 0.85 }}>{education}</div>
      </div>
    </div>
  );
};

export default TechFocused;
