const MinimalistCardPortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio. I craft thoughtful, human-centered digital experiences with precision and care.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js', 'TypeScript']);
  const experience = data.experience || '';
  const education = data.education || '';
  const projectsRaw = data.projects || 'Project A: A beautifully crafted web application with meticulous attention to detail.\n\nProject B: An elegant mobile experience designed for simplicity and speed.\n\nProject C: A clean, modern platform built with cutting-edge technology.';
  const primary = themeColor?.primary || '#111827';
  const accent = themeColor?.accent || '#f59e0b';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const expBlocks = experience ? experience.split('\n\n').filter(e => e.trim()) : [];

  // Helpers
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  // ─── PREVIEW MODE ───────────────────────────────────────────────
  if (isPreview) {
    return (
      <div style={{
        fontFamily: '"Inter", sans-serif',
        color: primary,
        background: '#fafafa',
        width: '800px',
        height: '1056px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative'
      }}>

        {/* Hero — centered, minimal */}
        <div style={{
          padding: '60px 60px 40px',
          textAlign: 'center',
          background: '#ffffff'
        }}>
          <h1 style={{
            margin: '0 0 6px',
            fontSize: '32px',
            fontWeight: '300',
            letterSpacing: '-0.5px',
            color: primary
          }}>
            {name}
          </h1>
          <div style={{
            width: '40px',
            height: '2px',
            background: accent,
            margin: '12px auto',
            borderRadius: '1px'
          }} />
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: accent,
            marginBottom: '16px'
          }}>
            {role}
          </div>
          <p style={{
            maxWidth: '440px',
            margin: '0 auto',
            fontSize: '11px',
            lineHeight: '1.8',
            color: '#6b7280',
            fontWeight: '400'
          }}>
            {summary.substring(0, 180)}
          </p>
        </div>

        {/* Thin divider */}
        <div style={{ height: '1px', background: '#f0f0f0', margin: '0 60px' }} />

        {/* Skills as simple inline list */}
        <div style={{ padding: '24px 60px', background: '#ffffff' }}>
          <h2 style={{
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            color: accent,
            marginBottom: '12px'
          }}>
            Expertise
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.slice(0, 8).map((s, i) => (
              <span key={i} style={{
                padding: '4px 12px',
                fontSize: '10px',
                fontWeight: '500',
                color: primary,
                border: `1px solid ${hexToRgba(primary, 0.12)}`,
                borderRadius: '4px',
                background: '#fafafa'
              }}>
                {s.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Projects as elegant cards */}
        <div style={{ padding: '12px 60px 24px', background: '#fafafa' }}>
          <h2 style={{
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            color: accent,
            marginBottom: '14px'
          }}>
            Selected Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {projectItems.slice(0, 4).map((proj, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: `1px solid ${hexToRgba(primary, 0.08)}`,
                borderRadius: '8px',
                padding: '16px',
                position: 'relative'
              }}>
                <div style={{
                  width: '20px',
                  height: '2px',
                  background: accent,
                  marginBottom: '10px',
                  borderRadius: '1px'
                }} />
                <h3 style={{
                  margin: '0 0 6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: primary
                }}>
                  {proj.title}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '10px',
                  color: '#9ca3af',
                  lineHeight: '1.6'
                }}>
                  {proj.desc.substring(0, 75)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience snippet */}
        {expBlocks.length > 0 && (
          <div style={{ padding: '12px 60px', background: '#ffffff' }}>
            <h2 style={{
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '2.5px',
              color: accent,
              marginBottom: '10px'
            }}>
              Experience
            </h2>
            {expBlocks.slice(0, 2).map((block, i) => (
              <div key={i} style={{
                fontSize: '10px',
                lineHeight: '1.6',
                color: '#6b7280',
                marginBottom: '8px',
                paddingLeft: '12px',
                borderLeft: `2px solid ${hexToRgba(accent, 0.3)}`
              }}>
                {block.substring(0, 100)}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 60px',
          background: '#ffffff',
          borderTop: `1px solid ${hexToRgba(primary, 0.06)}`,
          display: 'flex',
          justifyContent: 'center',
          gap: '24px'
        }}>
          {[email, phone, location].map((item, i) => (
            <span key={i} style={{
              fontSize: '10px',
              color: '#9ca3af',
              fontWeight: '400'
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ─── FULL RESPONSIVE MODE ──────────────────────────────────────
  return (
    <div style={{
      fontFamily: '"Inter", sans-serif',
      color: primary,
      background: '#fafafa',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto'
    }}>

      {/* Hero Section — Apple-inspired minimal */}
      <div style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(24px, 6vw, 80px)',
        textAlign: 'center',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle cover image overlay — very faint */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("${coverImg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.03
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Profile image or monogram */}
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt={name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 24px',
                display: 'block',
                border: `2px solid ${hexToRgba(primary, 0.08)}`
              }}
            />
          ) : (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: `2px solid ${hexToRgba(primary, 0.08)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '28px',
              fontWeight: '300',
              color: accent,
              background: hexToRgba(accent, 0.06)
            }}>
              {name.charAt(0)}
            </div>
          )}

          <h1 style={{
            margin: '0 0 8px',
            fontSize: 'clamp(32px, 7vw, 48px)',
            fontWeight: '300',
            letterSpacing: '-1px',
            color: primary
          }}>
            {name}
          </h1>

          {/* Accent line */}
          <div style={{
            width: '48px',
            height: '2px',
            background: accent,
            margin: '16px auto',
            borderRadius: '1px'
          }} />

          <div style={{
            fontSize: 'clamp(12px, 2vw, 14px)',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            color: accent,
            marginBottom: '24px'
          }}>
            {role}
          </div>

          <p style={{
            maxWidth: '480px',
            margin: '0 auto',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            lineHeight: '1.9',
            color: '#6b7280',
            fontWeight: '400'
          }}>
            {summary}
          </p>
        </div>
      </div>

      {/* Contact Bar — very subtle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(16px, 4vw, 40px)',
        padding: '20px 24px',
        background: '#ffffff',
        borderTop: `1px solid ${hexToRgba(primary, 0.05)}`,
        borderBottom: `1px solid ${hexToRgba(primary, 0.05)}`,
        flexWrap: 'wrap'
      }}>
        {[
          { label: email, icon: '✉' },
          { label: phone, icon: '☎' },
          { label: location, icon: '◎' }
        ].map((item, i) => (
          <span key={i} style={{
            fontSize: '13px',
            color: '#9ca3af',
            fontWeight: '400',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ color: accent, fontSize: '12px' }}>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>

      {/* Skills / Expertise */}
      <div style={{
        padding: 'clamp(40px, 8vw, 72px) clamp(24px, 6vw, 80px)',
        background: '#ffffff'
      }}>
        <h2 style={{
          fontSize: '11px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: accent,
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Expertise
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center'
        }}>
          {skills.map((skill, i) => (
            <span key={i} style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: '500',
              color: primary,
              border: `1px solid ${hexToRgba(primary, 0.12)}`,
              borderRadius: '6px',
              background: '#fafafa',
              letterSpacing: '0.2px'
            }}>
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div style={{
        padding: 'clamp(40px, 8vw, 72px) clamp(24px, 6vw, 80px)',
        background: '#fafafa'
      }}>
        <h2 style={{
          fontSize: '11px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: accent,
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Selected Work
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '20px'
        }}>
          {projectItems.map((proj, i) => (
            <div key={i} style={{
              background: '#ffffff',
              border: `1px solid ${hexToRgba(primary, 0.07)}`,
              borderRadius: '12px',
              padding: 'clamp(20px, 4vw, 32px)',
              transition: 'box-shadow 0.3s ease'
            }}>
              {/* Small accent bar */}
              <div style={{
                width: '24px',
                height: '2px',
                background: accent,
                marginBottom: '16px',
                borderRadius: '1px'
              }} />
              <div style={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#d1d5db',
                marginBottom: '8px',
                letterSpacing: '1px'
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                margin: '0 0 12px',
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                fontWeight: '600',
                color: primary,
                letterSpacing: '-0.3px'
              }}>
                {proj.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: '1.8'
              }}>
                {proj.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      {expBlocks.length > 0 && (
        <div style={{
          padding: 'clamp(40px, 8vw, 72px) clamp(24px, 6vw, 80px)',
          background: '#ffffff'
        }}>
          <h2 style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: accent,
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {expBlocks.map((block, i) => (
              <div key={i} style={{
                paddingLeft: '20px',
                borderLeft: `2px solid ${hexToRgba(accent, 0.25)}`,
                position: 'relative'
              }}>
                {/* Dot on the line */}
                <div style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '4px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: accent
                }} />
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-wrap',
                  color: '#6b7280'
                }}>
                  {block}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education && (
        <div style={{
          padding: 'clamp(40px, 8vw, 72px) clamp(24px, 6vw, 80px)',
          background: '#fafafa',
          borderTop: `1px solid ${hexToRgba(primary, 0.05)}`
        }}>
          <h2 style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: accent,
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Education
          </h2>
          <div style={{
            background: '#ffffff',
            border: `1px solid ${hexToRgba(primary, 0.07)}`,
            borderRadius: '12px',
            padding: 'clamp(20px, 4vw, 32px)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap',
              color: '#6b7280'
            }}>
              {education}
            </div>
          </div>
        </div>
      )}

      {/* Footer — minimal */}
      <div style={{
        padding: 'clamp(40px, 8vw, 64px) clamp(24px, 6vw, 80px)',
        background: '#ffffff',
        borderTop: `1px solid ${hexToRgba(primary, 0.05)}`,
        textAlign: 'center'
      }}>
        <div style={{
          width: '32px',
          height: '2px',
          background: accent,
          margin: '0 auto 20px',
          borderRadius: '1px'
        }} />
        <h2 style={{
          margin: '0 0 8px',
          fontSize: 'clamp(20px, 4vw, 28px)',
          fontWeight: '300',
          color: primary,
          letterSpacing: '-0.5px'
        }}>
          Let's connect
        </h2>
        <p style={{
          margin: '0 0 28px',
          fontSize: '14px',
          color: '#9ca3af'
        }}>
          Open to new opportunities and collaborations.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <a href={`mailto:${email}`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 28px',
            fontSize: '13px',
            fontWeight: '500',
            color: '#ffffff',
            background: primary,
            borderRadius: '6px',
            textDecoration: 'none',
            letterSpacing: '0.3px'
          }}>
            ✉ {email}
          </a>
          {phone && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 28px',
              fontSize: '13px',
              fontWeight: '500',
              color: primary,
              background: 'transparent',
              border: `1px solid ${hexToRgba(primary, 0.15)}`,
              borderRadius: '6px',
              letterSpacing: '0.3px'
            }}>
              ☎ {phone}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        height: '3px',
        background: `linear-gradient(90deg, ${accent}, ${hexToRgba(accent, 0.2)})`,
        borderRadius: '0 0 2px 2px'
      }} />
    </div>
  );
};

export default MinimalistCardPortfolio;
