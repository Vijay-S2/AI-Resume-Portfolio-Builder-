const ClassicTwoColumn = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Desired Position';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Your professional summary will appear here.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Skill 1', 'Skill 2']);
  const experience = data.experience || 'Your experience details here.';
  const education = data.education || 'Your education details here.';
  const primary = themeColor?.primary || '#0f172a';
  const accent = themeColor?.accent || '#64748b';

  return (
    <div style={{
      fontFamily: '"Times New Roman", Times, serif', color: '#000', lineHeight: '1.5',
      width: '800px', background: '#fff',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '36px 40px', borderBottom: `3px solid ${primary}`, background: '#fafafa' }}>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '34px', color: primary, textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 'bold' }}>{name}</h1>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '16px', color: accent, fontStyle: 'italic', fontWeight: 'normal' }}>{role}</h2>
        <div style={{ fontSize: '13px', color: '#555' }}>{email} | {phone} | {location}</div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Left - Main content */}
        <div style={{ width: '60%', padding: '28px 28px 28px 36px', borderRight: `1px solid #e5e7eb` }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', color: primary, borderBottom: `1px solid ${accent}40`, paddingBottom: '5px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'Arial, sans-serif' }}>Professional Experience</h3>
            <p style={{ margin: 0, fontSize: '13px', whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#222' }}>{experience}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '14px', color: primary, borderBottom: `1px solid ${accent}40`, paddingBottom: '5px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'Arial, sans-serif' }}>Education</h3>
            <p style={{ margin: 0, fontSize: '13px', whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#222' }}>{education}</p>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: '40%', padding: '28px 28px 28px 24px', background: '#fafafa' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', color: primary, borderBottom: `1px solid ${accent}40`, paddingBottom: '5px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'Arial, sans-serif' }}>Summary</h3>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.7', color: '#333' }}>{summary}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '14px', color: primary, borderBottom: `1px solid ${accent}40`, paddingBottom: '5px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'Arial, sans-serif' }}>Core Skills</h3>
            <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '13px', lineHeight: '1.9', color: '#333' }}>
              {skills.slice(0, 10).map((s, i) => <li key={i}>{s.trim()}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicTwoColumn;
