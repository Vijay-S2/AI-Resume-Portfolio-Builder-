const ExecutiveATS = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Senior Executive';
  const summary = aiData?.enhancedSummary || data.summary || 'Your professional summary will appear here.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Strategic Planning', 'Leadership', 'Project Management']);
  const experience = data.experience || 'Detailed experience history.';
  const education = data.education || 'Education details here.';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const primary = themeColor?.primary || '#0f172a';
  const accent = themeColor?.accent || '#334155';

  return (
    <div style={{
      fontFamily: '"Times New Roman", Times, serif', color: '#000', background: '#fff',
      width: '800px', padding: '50px 60px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '34px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', color: primary }}>{name}</h1>
        <div style={{ fontSize: '16px', marginBottom: '8px', fontStyle: 'italic', color: '#555' }}>{role}</div>
        <div style={{ fontSize: '13px', color: '#555' }}>{email} | {phone} | {location}</div>
      </div>

      <hr style={{ border: 'none', borderTop: `3px double ${primary}`, marginBottom: '20px' }} />

      {/* Summary */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px', color: primary, letterSpacing: '2px', borderBottom: `1px solid ${primary}`, paddingBottom: '4px' }}>Executive Summary</h2>
        <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{summary}</p>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px', color: primary, letterSpacing: '2px', borderBottom: `1px solid ${primary}`, paddingBottom: '4px' }}>Core Competencies</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 0', fontSize: '14px' }}>
          {skills.slice(0, 12).map((skill, index) => (
            <span key={index} style={{ fontSize: '13px' }}>
              {skill.trim()}{index < Math.min(skills.length, 12) - 1 ? '  ◆  ' : ''}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px', color: primary, letterSpacing: '2px', borderBottom: `1px solid ${primary}`, paddingBottom: '4px' }}>Professional Experience</h2>
        <div style={{ fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{experience}</div>
      </div>

      {/* Education */}
      <div>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px', color: primary, letterSpacing: '2px', borderBottom: `1px solid ${primary}`, paddingBottom: '4px' }}>Education</h2>
        <div style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{education}</div>
      </div>
    </div>
  );
};

export default ExecutiveATS;
