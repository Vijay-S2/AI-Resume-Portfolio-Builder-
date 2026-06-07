const CompactGrid = ({ data, aiData, themeColor, isPreview }) => {
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
      width: '800px', padding: '40px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box'
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `3px solid ${primary}`, paddingBottom: '14px', marginBottom: '22px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '30px', color: primary, fontWeight: '800' }}>{name}</h1>
          <div style={{ fontSize: '16px', fontWeight: '500', color: accent, marginTop: '4px' }}>{role}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '13px', color: '#64748b' }}>
          <div>{data.email || 'email@example.com'}</div>
          <div>{data.phone || '(555) 123-4567'}</div>
          <div>{data.location || 'City, State'}</div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', borderTop: `3px solid ${accent}` }}>
          <h2 style={{ fontSize: '13px', color: primary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Summary</h2>
          <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.6', color: '#475569' }}>{summary}</p>
        </div>

        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', borderTop: `3px solid ${accent}` }}>
          <h2 style={{ fontSize: '13px', color: primary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {skills.slice(0, 12).map((s, i) => (
              <span key={i} style={{ fontSize: '11px', background: primary, color: '#fff', padding: '3px 8px', borderRadius: '12px' }}>{s.trim()}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '13px', color: primary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', borderBottom: `1px solid #cbd5e1`, paddingBottom: '5px' }}>Experience</h2>
        <div style={{ fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap', color: '#334155' }}>{experience}</div>
      </div>

      <div>
        <h2 style={{ fontSize: '13px', color: primary, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', borderBottom: `1px solid #cbd5e1`, paddingBottom: '5px' }}>Education</h2>
        <div style={{ fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap', color: '#334155' }}>{education}</div>
      </div>
    </div>
  );
};

export default CompactGrid;
