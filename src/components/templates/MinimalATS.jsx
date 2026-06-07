const MinimalATS = ({ data, aiData, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Desired Position';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Your professional summary will appear here.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Skill 1', 'Skill 2']);
  const experience = data.experience || 'Your experience details here.';
  const education = data.education || 'Your education details here.';

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif', color: '#000', lineHeight: '1.5',
      width: '800px', background: '#fff', padding: '40px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '12px' }}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px' }}>{name}</h1>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'normal', color: '#555' }}>{role}</h2>
        <div style={{ fontSize: '13px', color: '#333' }}>{email} | {phone} | {location}</div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '4px', margin: '0 0 8px 0', letterSpacing: '1px' }}>Professional Summary</h2>
        <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6' }}>{summary}</p>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '4px', margin: '0 0 8px 0', letterSpacing: '1px' }}>Core Competencies</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.map((skill, index) => (
            <span key={index} style={{ fontSize: '12px', background: '#f3f4f6', border: '1px solid #d1d5db', padding: '3px 10px', borderRadius: '12px' }}>{skill.trim()}</span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '4px', margin: '0 0 8px 0', letterSpacing: '1px' }}>Professional Experience</h2>
        <p style={{ margin: 0, fontSize: '13px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{experience}</p>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '18px' }}>
        <h2 style={{ fontSize: '14px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '4px', margin: '0 0 8px 0', letterSpacing: '1px' }}>Education</h2>
        <p style={{ margin: 0, fontSize: '13px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{education}</p>
      </div>
    </div>
  );
};

export default MinimalATS;
