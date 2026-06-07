const ModernPro = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Desired Position';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Your professional summary will appear here.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Skill 1', 'Skill 2']);
  const experience = data.experience || 'Your experience details here.';
  const education = data.education || 'Your education details here.';
  const primary = themeColor?.primary || '#1e293b';
  const accent = themeColor?.accent || '#3b82f6';
  const bg = themeColor?.bg || '#f8fafc';

  return (
    <div style={{
      fontFamily: '"Inter", sans-serif', color: '#333', lineHeight: '1.6',
      width: '800px', background: '#fff',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'relative'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '36px 40px', borderBottom: `4px solid ${accent}`, background: bg }}>
        {data.profileImage && (
          <img src={data.profileImage} alt="Profile" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, flexShrink: 0 }} />
        )}
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '30px', color: primary, fontWeight: '800' }}>{name}</h1>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '17px', color: accent, fontWeight: '500' }}>{role}</h2>
          <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#64748b', flexWrap: 'wrap' }}>
            <span>✉ {email}</span>
            <span>📞 {phone}</span>
            <span>📍 {location}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
        {/* Sidebar */}
        <div style={{ background: bg, padding: '24px 20px', borderRight: `1px solid #e2e8f0` }}>
          <h2 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accent}`, paddingBottom: '6px', marginBottom: '14px', color: primary }}>Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {skills.slice(0, 10).map((skill, index) => (
              <div key={index} style={{ background: '#fff', border: `1px solid ${accent}20`, padding: '6px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', color: primary }}>
                {skill.trim()}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '16px', color: primary, fontWeight: '700', borderBottom: `1px solid #e2e8f0`, paddingBottom: '6px', marginBottom: '10px' }}>About Me</h2>
            <p style={{ lineHeight: '1.7', color: '#475569', fontSize: '13px', margin: 0 }}>{summary}</p>
          </div>
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '16px', color: primary, fontWeight: '700', borderBottom: `2px solid ${accent}`, paddingBottom: '6px', marginBottom: '10px' }}>Experience</h2>
            <p style={{ margin: 0, fontSize: '13px', whiteSpace: 'pre-wrap', color: '#475569', lineHeight: '1.6' }}>{experience}</p>
          </div>
          <div>
            <h2 style={{ fontSize: '16px', color: primary, fontWeight: '700', borderBottom: `2px solid ${accent}`, paddingBottom: '6px', marginBottom: '10px' }}>Education</h2>
            <p style={{ margin: 0, fontSize: '13px', whiteSpace: 'pre-wrap', color: '#475569', lineHeight: '1.6' }}>{education}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernPro;
