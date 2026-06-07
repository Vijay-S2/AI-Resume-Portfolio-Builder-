const CreativeSidebar = ({ data, aiData, themeColor, isPreview }) => {
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
      display: 'flex', fontFamily: '"Inter", sans-serif', background: '#fff',
      width: '800px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box'
    }}>
      {/* Dark Sidebar */}
      <div style={{ width: '260px', background: primary, color: '#fff', padding: '40px 24px', flexShrink: 0 }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>
          {name.charAt(0)}
        </div>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '700', lineHeight: '1.3' }}>{name}</h1>
        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '24px', color: accent }}>{role}</div>

        <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '6px', wordBreak: 'break-all' }}>✉ {data.email || 'email@example.com'}</div>
        <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '6px' }}>📞 {data.phone || '(555) 123-4567'}</div>
        <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '28px' }}>📍 {data.location || 'City, State'}</div>

        <h2 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '6px', marginBottom: '12px' }}>Skills</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {skills.slice(0, 10).map((s, i) => (
            <div key={i} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '4px', borderLeft: `3px solid ${accent}` }}>{s.trim()}</div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px 32px', overflow: 'hidden' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', color: primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accent}`, paddingBottom: '6px', marginBottom: '10px' }}>Profile</h2>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.7', color: '#475569' }}>{summary}</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', color: primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accent}`, paddingBottom: '6px', marginBottom: '10px' }}>Experience</h2>
          <div style={{ fontSize: '13px', lineHeight: '1.7', color: '#334155', whiteSpace: 'pre-wrap' }}>{experience}</div>
        </div>

        <div>
          <h2 style={{ fontSize: '15px', color: primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accent}`, paddingBottom: '6px', marginBottom: '10px' }}>Education</h2>
          <div style={{ fontSize: '13px', lineHeight: '1.7', color: '#334155', whiteSpace: 'pre-wrap' }}>{education}</div>
        </div>
      </div>
    </div>
  );
};

export default CreativeSidebar;
