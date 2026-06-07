const MinimalistElegant = ({ data, aiData, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Desired Position';
  const summary = aiData?.enhancedSummary || data.summary || 'Summary.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Skill 1', 'Skill 2']);
  const experience = data.experience || 'Experience details.';
  const education = data.education || 'Education details.';

  return (
    <div style={{
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#111', background: '#fff',
      width: '800px', padding: '56px 64px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '300', letterSpacing: '5px', textTransform: 'uppercase' }}>{name}</h1>
        <div style={{ fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888' }}>{role}</div>
        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center', gap: '18px', fontSize: '12px', color: '#777' }}>
          <span>{data.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{data.phone || '(555) 123-4567'}</span>
          <span>•</span>
          <span>{data.location || 'City, State'}</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '20px 30px', textAlign: 'center', marginBottom: '32px' }}>
        <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.9', color: '#555' }}>{summary}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '14px', color: '#aaa', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Experience</h2>
          <div style={{ fontSize: '12px', lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap' }}>{experience}</div>
        </div>
        <div>
          <h2 style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '14px', color: '#aaa', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Education</h2>
          <div style={{ fontSize: '12px', lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap' }}>{education}</div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '14px', color: '#aaa', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Expertise</h2>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#555', lineHeight: '2' }}>
          {skills.slice(0, 12).join('   ·   ')}
        </div>
      </div>
    </div>
  );
};

export default MinimalistElegant;
