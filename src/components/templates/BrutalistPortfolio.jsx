const BrutalistPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio. I build raw, impactful digital experiences with no compromises.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js', 'TypeScript']);
  const experience = data.experience || '';
  const education = data.education || '';
  const projectsRaw = data.projects || 'Project A: A bold redesign of an e-commerce experience.\n\nProject B: Real-time dashboard with brutalist UI.\n\nProject C: Cross-platform mobile app with raw aesthetic.';
  const primary = themeColor?.primary || '#000000';
  const accent = themeColor?.accent || '#ff3e00';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const expBlocks = experience ? experience.split('\n\n').filter(e => e.trim()) : [];

  // Shared style fragments
  const borderThick = `3px solid ${primary}`;
  const borderAccent = `3px solid ${accent}`;
  const hardShadow = `6px 6px 0 ${primary}`;
  const hardShadowAccent = `6px 6px 0 ${accent}`;
  const sectionHeading = (isCompact) => ({
    fontFamily: '"Inter", sans-serif',
    fontSize: isCompact ? '11px' : 'clamp(12px, 2vw, 14px)',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: isCompact ? '4px' : '6px',
    color: primary,
    marginBottom: isCompact ? '10px' : '20px',
    paddingBottom: isCompact ? '6px' : '10px',
    borderBottom: `3px solid ${primary}`,
    display: 'inline-block',
  });

  // ─── PREVIEW MODE ────────────────────────────────────────
  if (isPreview) {
    return (
      <div style={{
        fontFamily: '"Inter", sans-serif',
        color: primary,
        background: '#f5f0eb',
        width: '800px',
        height: '1056px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        {/* Hero with overlapping name */}
        <div style={{ padding: '28px 32px 0', position: 'relative' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            {/* Cover image box */}
            <div style={{
              width: '280px',
              height: '180px',
              border: borderThick,
              boxShadow: hardShadow,
              flexShrink: 0,
              overflow: 'hidden',
            }}>
              <img
                src={coverImg}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(40%) contrast(1.1)' }}
              />
            </div>

            {/* Name & role overlapping */}
            <div style={{ paddingTop: '12px', flex: 1 }}>
              <h1 style={{
                margin: '0 0 4px',
                fontSize: '32px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                lineHeight: '1.05',
                color: primary,
              }}>
                {name.substring(0, 24)}
              </h1>
              <div style={{
                fontSize: '12px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                color: accent,
                marginBottom: '10px',
                borderBottom: borderAccent,
                paddingBottom: '6px',
                display: 'inline-block',
              }}>
                {role.substring(0, 30)}
              </div>
              <p style={{
                margin: '0',
                fontSize: '10px',
                lineHeight: '1.6',
                color: '#333',
                maxWidth: '380px',
              }}>
                {summary.substring(0, 180)}
              </p>

              {/* Contact row */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
                {[email, phone, location].map((item, i) => (
                  <span key={i} style={{
                    fontSize: '9px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: i === 0 ? accent : 'transparent',
                    color: i === 0 ? '#fff' : primary,
                    border: i === 0 ? 'none' : borderThick,
                    padding: '3px 8px',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills bar */}
        <div style={{ padding: '18px 32px 0' }}>
          <div style={sectionHeading(true)}>Skills</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {skills.slice(0, 12).map((s, i) => (
              <span key={i} style={{
                border: borderThick,
                padding: '3px 10px',
                fontSize: '9px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                background: i % 3 === 0 ? accent : '#fff',
                color: i % 3 === 0 ? '#fff' : primary,
                boxShadow: i % 3 === 0 ? hardShadowAccent : '3px 3px 0 ' + primary,
              }}>
                {s.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ padding: '18px 32px 0' }}>
          <div style={sectionHeading(true)}>Projects</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
            {projectItems.slice(0, 4).map((proj, i) => (
              <div key={i} style={{
                border: borderThick,
                padding: '10px 12px',
                background: i === 0 ? accent : '#fff',
                color: i === 0 ? '#fff' : primary,
                boxShadow: hardShadow,
              }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '4px',
                  borderBottom: i === 0 ? '2px solid #fff' : `2px solid ${primary}`,
                  paddingBottom: '4px',
                }}>
                  {proj.title.substring(0, 22)}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '9px',
                  lineHeight: '1.5',
                  color: i === 0 ? 'rgba(255,255,255,0.9)' : '#444',
                }}>
                  {proj.desc.substring(0, 80)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience preview */}
        {expBlocks.length > 0 && (
          <div style={{ padding: '18px 32px 0' }}>
            <div style={sectionHeading(true)}>Experience</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
              {expBlocks.slice(0, 2).map((block, i) => (
                <div key={i} style={{
                  borderLeft: `4px solid ${accent}`,
                  paddingLeft: '10px',
                  fontSize: '9px',
                  lineHeight: '1.5',
                  color: '#333',
                }}>
                  {block.substring(0, 120)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: primary,
          padding: '10px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px' }}>
            Portfolio
          </span>
          <span style={{ color: accent, fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {email}
          </span>
        </div>
      </div>
    );
  }

  // ─── FULL VIEW ───────────────────────────────────────────
  return (
    <div style={{
      fontFamily: '"Inter", sans-serif',
      color: primary,
      background: '#f5f0eb',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      {/* ── HERO ── */}
      <div style={{
        padding: 'clamp(32px, 6vw, 60px) clamp(24px, 5vw, 48px)',
        borderBottom: borderThick,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 4vw, 36px)', alignItems: 'flex-start' }}>
          {/* Cover image bordered box */}
          <div style={{
            width: 'clamp(200px, 40%, 320px)',
            aspectRatio: '4/3',
            border: `4px solid ${primary}`,
            boxShadow: `8px 8px 0 ${primary}`,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <img
              src={coverImg}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'grayscale(30%) contrast(1.1)',
              }}
            />
          </div>

          {/* Name block overlapping conceptually */}
          <div style={{ flex: '1 1 260px', paddingTop: '8px' }}>
            <h1 style={{
              margin: '0 0 8px',
              fontSize: 'clamp(32px, 7vw, 52px)',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: 'clamp(2px, 0.5vw, 5px)',
              lineHeight: '1.0',
              color: primary,
            }}>
              {name}
            </h1>

            <div style={{
              fontSize: 'clamp(12px, 2.5vw, 16px)',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: 'clamp(3px, 0.8vw, 6px)',
              color: accent,
              marginBottom: '16px',
              borderBottom: `3px solid ${accent}`,
              paddingBottom: '8px',
              display: 'inline-block',
            }}>
              {role}
            </div>

            <p style={{
              margin: '0 0 16px',
              fontSize: 'clamp(13px, 2vw, 15px)',
              lineHeight: '1.7',
              color: '#333',
              maxWidth: '450px',
            }}>
              {summary}
            </p>

            {/* Contact blocks */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`mailto:${email}`} style={{
                fontSize: 'clamp(10px, 1.5vw, 12px)',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                background: accent,
                color: '#fff',
                padding: '6px 14px',
                textDecoration: 'none',
                border: `3px solid ${primary}`,
                boxShadow: `4px 4px 0 ${primary}`,
              }}>
                ✉ {email}
              </a>
              <span style={{
                fontSize: 'clamp(10px, 1.5vw, 12px)',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                background: '#fff',
                color: primary,
                padding: '6px 14px',
                border: borderThick,
                boxShadow: `4px 4px 0 ${primary}`,
              }}>
                ☎ {phone}
              </span>
              <span style={{
                fontSize: 'clamp(10px, 1.5vw, 12px)',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                background: '#fff',
                color: primary,
                padding: '6px 14px',
                border: borderThick,
                boxShadow: `4px 4px 0 ${primary}`,
              }}>
                ◉ {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SKILLS ── */}
      <div style={{
        padding: 'clamp(28px, 5vw, 48px) clamp(24px, 5vw, 48px)',
        borderBottom: borderThick,
        background: '#fff',
      }}>
        <div style={sectionHeading(false)}>Capabilities</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
          {skills.map((skill, i) => (
            <span key={i} style={{
              border: `3px solid ${primary}`,
              padding: '8px 18px',
              fontSize: 'clamp(10px, 1.5vw, 13px)',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              background: i % 4 === 0 ? accent : i % 4 === 2 ? primary : '#fff',
              color: (i % 4 === 0 || i % 4 === 2) ? '#fff' : primary,
              boxShadow: i % 4 === 0 ? `5px 5px 0 ${primary}` : i % 4 === 2 ? `5px 5px 0 ${accent}` : `4px 4px 0 ${primary}`,
              transition: 'transform 0.15s',
            }}>
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <div style={{
        padding: 'clamp(28px, 5vw, 48px) clamp(24px, 5vw, 48px)',
        borderBottom: borderThick,
      }}>
        <div style={sectionHeading(false)}>Selected Work</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '20px',
          marginTop: '8px',
        }}>
          {projectItems.map((proj, i) => {
            const isAccented = i === 0 || i === 3;
            return (
              <div key={i} style={{
                border: `4px solid ${primary}`,
                padding: 'clamp(16px, 3vw, 24px)',
                background: isAccented ? accent : '#fff',
                color: isAccented ? '#fff' : primary,
                boxShadow: `6px 6px 0 ${primary}`,
                position: 'relative',
              }}>
                {/* Project number */}
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: isAccented ? '#fff' : accent,
                  color: isAccented ? primary : '#fff',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '900',
                  borderLeft: `3px solid ${primary}`,
                  borderBottom: `3px solid ${primary}`,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h3 style={{
                  margin: '0 0 8px',
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderBottom: isAccented ? '2px solid rgba(255,255,255,0.5)' : `2px solid ${primary}`,
                  paddingBottom: '8px',
                }}>
                  {proj.title}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: 'clamp(12px, 1.8vw, 14px)',
                  lineHeight: '1.7',
                  color: isAccented ? 'rgba(255,255,255,0.9)' : '#444',
                }}>
                  {proj.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      {expBlocks.length > 0 && (
        <div style={{
          padding: 'clamp(28px, 5vw, 48px) clamp(24px, 5vw, 48px)',
          borderBottom: borderThick,
          background: '#fff',
        }}>
          <div style={sectionHeading(false)}>Experience</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            {expBlocks.map((block, i) => (
              <div key={i} style={{
                borderLeft: `6px solid ${i % 2 === 0 ? accent : primary}`,
                padding: '16px 20px',
                background: '#f5f0eb',
                border: borderThick,
                borderLeft: `6px solid ${i % 2 === 0 ? accent : primary}`,
                boxShadow: `4px 4px 0 ${primary}`,
              }}>
                <div style={{
                  fontSize: 'clamp(12px, 1.8vw, 14px)',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-wrap',
                  color: '#333',
                  fontWeight: '500',
                }}>
                  {block}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EDUCATION ── */}
      {education && (
        <div style={{
          padding: 'clamp(28px, 5vw, 48px) clamp(24px, 5vw, 48px)',
          borderBottom: borderThick,
        }}>
          <div style={sectionHeading(false)}>Education</div>
          <div style={{
            border: `4px solid ${primary}`,
            padding: '20px 24px',
            background: '#fff',
            boxShadow: `6px 6px 0 ${accent}`,
            marginTop: '8px',
          }}>
            <div style={{
              fontSize: 'clamp(12px, 1.8vw, 14px)',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              color: '#333',
              fontWeight: '500',
            }}>
              {education}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div style={{
        background: primary,
        padding: 'clamp(28px, 5vw, 48px) clamp(24px, 5vw, 48px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div>
          <div style={{
            fontSize: 'clamp(18px, 4vw, 28px)',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(3px, 1vw, 8px)',
            color: '#fff',
            marginBottom: '4px',
          }}>
            Let's Talk
          </div>
          <div style={{
            fontSize: 'clamp(10px, 1.5vw, 13px)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: accent,
          }}>
            Available for projects
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href={`mailto:${email}`} style={{
            background: accent,
            color: '#fff',
            padding: '10px 20px',
            fontSize: 'clamp(11px, 1.5vw, 13px)',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textDecoration: 'none',
            border: '3px solid #fff',
            boxShadow: `4px 4px 0 ${accent}`,
          }}>
            ✉ Email Me
          </a>
          {phone && (
            <span style={{
              background: 'transparent',
              color: '#fff',
              padding: '10px 20px',
              fontSize: 'clamp(11px, 1.5vw, 13px)',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '3px solid #fff',
            }}>
              ☎ {phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrutalistPortfolio;
