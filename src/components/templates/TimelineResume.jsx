const TimelineResume = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Desired Position';
  const summary = aiData?.enhancedSummary || data.summary || 'Your professional summary.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Skill 1', 'Skill 2', 'Skill 3']);
  const experienceRaw = data.experience || 'Company A - Role\nJan 2020 - Present\nDid something great.\n\nCompany B - Role\nJan 2017 - Dec 2019\nDid something else.';
  const education = data.education || 'University - Degree\n2013 - 2017';
  const primary = themeColor?.primary || '#1e293b';
  const accent = themeColor?.accent || '#3b82f6';

  const expBlocks = experienceRaw.split('\n\n').filter(e => e.trim()).slice(0, 4);

  return (
    <div style={{
      fontFamily: '"Inter", sans-serif', color: '#334155', background: '#fff',
      width: '800px', padding: '44px',
      height: isPreview ? '1056px' : 'auto', minHeight: isPreview ? 'unset' : '1056px',
      overflow: 'hidden', boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ borderBottom: `4px solid ${accent}`, paddingBottom: '18px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '34px', color: primary, fontWeight: '800' }}>{name}</h1>
        <div style={{ fontSize: '18px', color: accent, fontWeight: '600', marginBottom: '6px' }}>{role}</div>
        <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span>{data.email || 'email@example.com'}</span>
          <span>{data.phone || '(555) 123-4567'}</span>
          <span>{data.location || 'City, State'}</span>
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', color: primary, marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Profile</h2>
        <p style={{ lineHeight: '1.6', fontSize: '13px', margin: 0, color: '#475569' }}>{summary}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Timeline Experience */}
        <div>
          <h2 style={{ fontSize: '15px', color: primary, marginBottom: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Experience</h2>
          <div style={{ position: 'relative', borderLeft: `2px solid ${accent}`, marginLeft: '8px', paddingLeft: '18px' }}>
            {expBlocks.map((block, i) => (
              <div key={i} style={{ marginBottom: '18px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-24px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: accent, border: '2px solid #fff', boxShadow: `0 0 0 2px ${accent}` }}></div>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '13px', lineHeight: '1.6', color: '#334155' }}>{block}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <h2 style={{ fontSize: '15px', color: primary, marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {skills.slice(0, 8).map((s, i) => (
              <div key={i} style={{ padding: '6px 10px', background: '#f1f5f9', borderLeft: `3px solid ${accent}`, borderRadius: '0 4px 4px 0', fontSize: '13px', fontWeight: '500' }}>{s.trim()}</div>
            ))}
          </div>
          <h2 style={{ fontSize: '15px', color: primary, marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</h2>
          <div style={{ fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap', color: '#475569' }}>{education}</div>
        </div>
      </div>
    </div>
  );
};

export default TimelineResume;
