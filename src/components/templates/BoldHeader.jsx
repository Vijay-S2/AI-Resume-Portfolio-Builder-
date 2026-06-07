const BoldHeader = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Desired Position';
  const summary = aiData?.enhancedSummary || data.summary || 'Summary.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Skill 1', 'Skill 2', 'Skill 3']);
  const experience = data.experience || 'Experience details.';
  const education = data.education || 'Education details.';
  const primary = themeColor?.primary || '#1e293b';
  const accent = themeColor?.accent || '#3b82f6';

  return (
    <div style={{
      fontFamily: '"Inter", sans-serif', color: '#334155', background: '#fff',
      width: '800px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box'
    }}>
      {/* Bold Color Header */}
      <div style={{ background: primary, color: '#fff', padding: '48px 50px', position: 'relative' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '38px', fontWeight: '900', letterSpacing: '-1px' }}>{name}</h1>
        <div style={{ fontSize: '18px', fontWeight: '400', opacity: 0.85, marginBottom: '12px', color: accent === primary ? '#fff' : accent }}>{role}</div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', opacity: 0.75, flexWrap: 'wrap' }}>
          <span>✉ {data.email || 'email@example.com'}</span>
          <span>📞 {data.phone || '(555) 123-4567'}</span>
          <span>📍 {data.location || 'City, State'}</span>
        </div>
      </div>

      <div style={{ padding: '36px 50px' }}>
        {/* Summary */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', color: primary, marginBottom: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Professional Summary</h2>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.7', color: '#475569' }}>{summary}</p>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', color: primary, marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.slice(0, 14).map((s, i) => (
              <span key={i} style={{ fontSize: '12px', fontWeight: '500', border: `1.5px solid ${primary}`, color: primary, padding: '5px 12px', borderRadius: '20px' }}>{s.trim()}</span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', color: primary, marginBottom: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Work Experience</h2>
          <div style={{ fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: '#334155' }}>{experience}</div>
        </div>

        {/* Education */}
        <div>
          <h2 style={{ fontSize: '16px', color: primary, marginBottom: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</h2>
          <div style={{ fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: '#334155' }}>{education}</div>
        </div>
      </div>
    </div>
  );
};

export default BoldHeader;
