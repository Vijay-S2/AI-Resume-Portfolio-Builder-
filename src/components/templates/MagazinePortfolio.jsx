const MagazinePortfolio = ({ data, aiData, themeColor, isPreview }) => {
  const name = data.name || 'Your Name';
  const role = data.role || 'Digital Creator';
  const email = data.email || 'email@example.com';
  const phone = data.phone || '(555) 123-4567';
  const location = data.location || 'City, State';
  const summary = aiData?.enhancedSummary || data.summary || 'Welcome to my portfolio. I craft beautiful digital experiences with meticulous attention to detail and a passion for elegant design.';
  const skills = aiData?.enhancedSkills || (data.skills ? data.skills.split(',') : ['Design', 'React', 'Node.js', 'TypeScript']);
  const experience = data.experience || '';
  const education = data.education || '';
  const projectsRaw = data.projects || 'E-commerce Platform: Built a fully functional store using React and Node.js.\n\nAI Dashboard: Created a beautiful real-time data visualization dashboard.\n\nMobile App: React Native cross-platform app with 50k+ downloads.';
  const primary = themeColor?.primary || '#1b1b1b';
  const accent = themeColor?.accent || '#ff6b6b';
  const coverImg = data.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

  const projectItems = projectsRaw.split('\n\n').filter(p => p.trim()).map(p => {
    const colonIdx = p.indexOf(':');
    if (colonIdx > -1) return { title: p.slice(0, colonIdx).trim(), desc: p.slice(colonIdx + 1).trim() };
    return { title: 'Project', desc: p.trim() };
  });

  const expBlocks = experience ? experience.split('\n\n').filter(e => e.trim()) : [];

  // Utility: drop-cap style first letter
  const renderDropCap = (text, fontSize, color) => {
    if (!text || text.length < 2) return text;
    return (
      <span>
        <span style={{
          float: 'left', fontSize: `${(parseFloat(fontSize) || 14) * 3.2}px`, fontWeight: '700',
          lineHeight: '0.85', marginRight: '6px', marginTop: '4px', color: accent,
          fontFamily: '"Georgia", "Times New Roman", serif'
        }}>{text.charAt(0)}</span>
        {text.slice(1)}
      </span>
    );
  };

  // Divider element — editorial rule line
  const Rule = ({ width, my }) => (
    <div style={{
      width: width || '60px', height: '3px', background: accent,
      margin: `${my || 16}px 0`
    }} />
  );

  // ─────────────────────────────────────────────────
  // PREVIEW MODE — 800 × 1056 px, compact
  // ─────────────────────────────────────────────────
  if (isPreview) {
    return (
      <div style={{
        fontFamily: '"Inter", sans-serif', color: primary, background: '#faf9f7',
        width: '800px', height: '1056px', overflow: 'hidden', boxSizing: 'border-box', position: 'relative'
      }}>
        {/* ——— HERO ——— */}
        <div style={{
          position: 'relative', height: '320px', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `url("${coverImg}")`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.35)'
          }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 30%, ${primary}ee 100%)` }} />

          {/* Editorial top bar */}
          <div style={{
            position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '20px 36px', borderBottom: '1px solid rgba(255,255,255,0.15)'
          }}>
            <span style={{ color: '#fff', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', opacity: 0.7 }}>Portfolio</span>
            <span style={{ color: '#fff', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '500', opacity: 0.7 }}>{location}</span>
          </div>

          {/* Name + Role */}
          <div style={{ position: 'relative', zIndex: 2, padding: '60px 40px 0' }}>
            <h1 style={{
              margin: 0, fontSize: '56px', fontWeight: '900', color: '#fff',
              lineHeight: '1', letterSpacing: '-2px',
              fontFamily: '"Georgia", "Times New Roman", serif'
            }}>{name}</h1>
            <div style={{
              marginTop: '10px', display: 'inline-block',
              background: accent, color: '#fff', padding: '4px 14px',
              fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase'
            }}>{role}</div>
          </div>
        </div>

        {/* ——— BODY ——— */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '0', height: 'calc(100% - 320px - 44px)' }}>
          {/* Main Column */}
          <div style={{ padding: '24px 28px 20px 36px', borderRight: `1px solid ${primary}15`, overflow: 'hidden' }}>
            {/* Pull Quote Summary */}
            <div style={{
              borderLeft: `3px solid ${accent}`, paddingLeft: '16px', marginBottom: '20px'
            }}>
              <p style={{
                margin: 0, fontSize: '13px', lineHeight: '1.7', color: '#444',
                fontFamily: '"Georgia", "Times New Roman", serif', fontStyle: 'italic'
              }}>{summary.substring(0, 200)}{summary.length > 200 ? '…' : ''}</p>
            </div>

            {/* Feature Projects */}
            <div style={{
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700',
              color: accent, marginBottom: '10px'
            }}>Featured Work</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto',
              gap: '10px'
            }}>
              {projectItems.slice(0, 3).map((proj, i) => (
                <div key={i} style={{
                  background: '#fff', border: `1px solid ${primary}10`,
                  padding: i === 0 ? '14px' : '12px',
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
                    background: i === 0 ? accent : `${primary}30`
                  }} />
                  <h3 style={{
                    margin: '0 0 4px', fontSize: i === 0 ? '13px' : '11px',
                    fontWeight: '700', color: primary, paddingLeft: '10px',
                    fontFamily: '"Georgia", "Times New Roman", serif'
                  }}>{proj.title}</h3>
                  <p style={{
                    margin: 0, fontSize: '10px', color: '#666', lineHeight: '1.5', paddingLeft: '10px'
                  }}>{proj.desc.substring(0, i === 0 ? 120 : 65)}{proj.desc.length > (i === 0 ? 120 : 65) ? '…' : ''}</p>
                </div>
              ))}
            </div>

            {/* Experience preview */}
            {expBlocks.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{
                  fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700',
                  color: accent, marginBottom: '8px'
                }}>Experience</div>
                {expBlocks.slice(0, 2).map((block, i) => (
                  <div key={i} style={{
                    fontSize: '10px', color: '#555', lineHeight: '1.5', marginBottom: '6px',
                    paddingBottom: '6px', borderBottom: `1px solid ${primary}08`
                  }}>{block.substring(0, 90)}…</div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — Skills & Contact */}
          <div style={{ padding: '24px 24px 20px', background: `${primary}05`, overflow: 'hidden' }}>
            <div style={{
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700',
              color: accent, marginBottom: '12px'
            }}>Expertise</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {skills.slice(0, 8).map((skill, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: primary
                }}>
                  <div style={{ width: '6px', height: '6px', background: accent, flexShrink: 0 }} />
                  <span style={{ fontWeight: '500' }}>{skill.trim()}</span>
                </div>
              ))}
            </div>

            {education && (
              <>
                <div style={{
                  fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700',
                  color: accent, marginBottom: '8px'
                }}>Education</div>
                <p style={{ margin: 0, fontSize: '10px', color: '#555', lineHeight: '1.5' }}>
                  {education.substring(0, 100)}…
                </p>
              </>
            )}

            {/* Contact Block */}
            <div style={{
              marginTop: '20px', paddingTop: '14px', borderTop: `2px solid ${accent}`
            }}>
              <div style={{
                fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700',
                color: accent, marginBottom: '8px'
              }}>Contact</div>
              <div style={{ fontSize: '10px', color: '#555', lineHeight: '2' }}>
                <div>{email}</div>
                <div>{phone}</div>
                <div>{location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom editorial bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '44px',
          background: primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '24px'
        }}>
          <span style={{ color: accent, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700' }}>Portfolio</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '1px' }}>{name}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '1px' }}>{role}</span>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────
  // FULL VIEW — responsive editorial layout
  // ─────────────────────────────────────────────────
  return (
    <div style={{
      fontFamily: '"Inter", sans-serif', color: primary, background: '#faf9f7',
      width: '100%', maxWidth: '800px', margin: '0 auto'
    }}>

      {/* ——— EDITORIAL TOP BAR ——— */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'clamp(12px, 2vw, 18px) clamp(20px, 4vw, 40px)',
        borderBottom: `1px solid ${primary}15`, background: '#fff'
      }}>
        <span style={{
          fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase',
          fontWeight: '700', color: accent
        }}>Portfolio</span>
        <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>
          <span>{email}</span>
          <span>·</span>
          <span>{location}</span>
        </div>
      </div>

      {/* ——— HERO ——— */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'relative', minHeight: 'clamp(320px, 50vw, 480px)', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `url("${coverImg}")`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, transparent 20%, ${primary}ee 100%)`
          }} />

          <div style={{
            position: 'relative', zIndex: 2,
            padding: 'clamp(60px, 10vw, 100px) clamp(24px, 5vw, 48px) clamp(40px, 6vw, 60px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '100%'
          }}>
            {/* Overline */}
            <div style={{
              fontSize: '12px', letterSpacing: '5px', textTransform: 'uppercase',
              color: accent, fontWeight: '700', marginBottom: '12px'
            }}>{role}</div>

            {/* Oversized Name */}
            <h1 style={{
              margin: '0 0 16px', color: '#fff',
              fontSize: 'clamp(42px, 9vw, 72px)', fontWeight: '900',
              lineHeight: '0.95', letterSpacing: '-3px',
              fontFamily: '"Georgia", "Times New Roman", serif'
            }}>{name}</h1>

            {/* Thin rule */}
            <div style={{ width: '80px', height: '3px', background: accent, marginBottom: '16px' }} />

            {/* Contact row */}
            <div style={{
              display: 'flex', gap: '16px', flexWrap: 'wrap',
              fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px'
            }}>
              <span>✉ {email}</span>
              <span>☎ {phone}</span>
              <span>◉ {location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ——— PULL-QUOTE SUMMARY ——— */}
      <div style={{
        padding: 'clamp(32px, 6vw, 56px) clamp(24px, 5vw, 48px)',
        background: '#fff', borderBottom: `1px solid ${primary}10`
      }}>
        <div style={{
          maxWidth: '640px', margin: '0 auto',
          borderLeft: `4px solid ${accent}`, paddingLeft: 'clamp(16px, 3vw, 28px)'
        }}>
          <p style={{
            margin: 0, fontSize: 'clamp(16px, 2.5vw, 21px)',
            lineHeight: '1.75', color: '#333',
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontStyle: 'italic'
          }}>
            {renderDropCap(summary, '18')}
          </p>
        </div>
      </div>

      {/* ——— SKILLS — Editorial Sidebar Style ——— */}
      <div style={{
        padding: 'clamp(28px, 5vw, 44px) clamp(24px, 5vw, 48px)',
        background: `${primary}`,
        color: '#fff'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
              fontWeight: '700', color: accent, whiteSpace: 'nowrap'
            }}>Areas of Expertise</div>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))',
            gap: '0'
          }}>
            {skills.map((skill, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{
                  width: '8px', height: '8px', background: accent,
                  transform: 'rotate(45deg)', flexShrink: 0
                }} />
                <span style={{
                  fontSize: '14px', fontWeight: '500', letterSpacing: '0.3px',
                  color: 'rgba(255,255,255,0.85)'
                }}>{skill.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ——— FEATURED PROJECTS — Magazine Grid ——— */}
      <div style={{
        padding: 'clamp(32px, 6vw, 56px) clamp(24px, 5vw, 48px)',
        background: '#faf9f7'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px'
          }}>
            <div style={{
              fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
              fontWeight: '700', color: accent, whiteSpace: 'nowrap'
            }}>Featured Work</div>
            <div style={{ flex: 1, height: '1px', background: `${primary}20` }} />
          </div>

          {/* Magazine-style varied grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {projectItems.map((proj, i) => {
              const isFeature = i === 0;
              return (
                <div key={i} style={{
                  gridColumn: isFeature ? 'span 2' : 'span 1',
                  background: isFeature ? primary : '#fff',
                  color: isFeature ? '#fff' : primary,
                  padding: isFeature ? 'clamp(28px, 4vw, 40px)' : 'clamp(20px, 3vw, 28px)',
                  position: 'relative', overflow: 'hidden',
                  borderBottom: isFeature ? 'none' : `3px solid ${accent}`
                }}>
                  {/* Feature number */}
                  <div style={{
                    position: 'absolute',
                    top: isFeature ? '-10px' : '-8px',
                    right: isFeature ? '20px' : '12px',
                    fontSize: isFeature ? '100px' : '60px',
                    fontWeight: '900',
                    color: isFeature ? 'rgba(255,255,255,0.06)' : `${primary}08`,
                    lineHeight: '1',
                    fontFamily: '"Georgia", "Times New Roman", serif'
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
                      fontWeight: '700', color: accent, marginBottom: '8px'
                    }}>
                      {isFeature ? 'Lead Project' : `Project ${String(i + 1).padStart(2, '0')}`}
                    </div>

                    <h3 style={{
                      margin: '0 0 10px',
                      fontSize: isFeature ? 'clamp(20px, 3vw, 26px)' : 'clamp(15px, 2vw, 18px)',
                      fontWeight: '800', lineHeight: '1.2',
                      fontFamily: '"Georgia", "Times New Roman", serif'
                    }}>{proj.title}</h3>

                    <p style={{
                      margin: 0,
                      fontSize: isFeature ? '14px' : '13px',
                      lineHeight: '1.7',
                      color: isFeature ? 'rgba(255,255,255,0.7)' : '#666'
                    }}>{proj.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ——— EXPERIENCE ——— */}
      {expBlocks.length > 0 && (
        <div style={{
          padding: 'clamp(32px, 6vw, 56px) clamp(24px, 5vw, 48px)',
          background: '#fff', borderTop: `1px solid ${primary}10`
        }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px'
            }}>
              <div style={{
                fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
                fontWeight: '700', color: accent, whiteSpace: 'nowrap'
              }}>Experience</div>
              <div style={{ flex: 1, height: '1px', background: `${primary}20` }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {expBlocks.map((block, i) => (
                <div key={i} style={{
                  padding: '20px 0 20px 24px',
                  borderLeft: `2px solid ${i === 0 ? accent : `${primary}15`}`,
                  position: 'relative'
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', left: '-5px', top: '22px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: i === 0 ? accent : `${primary}30`,
                    border: '2px solid #fff'
                  }} />
                  <div style={{
                    fontSize: '14px', lineHeight: '1.75', whiteSpace: 'pre-wrap',
                    color: '#444'
                  }}>{block}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ——— EDUCATION ——— */}
      {education && (
        <div style={{
          padding: 'clamp(28px, 5vw, 44px) clamp(24px, 5vw, 48px)',
          background: '#faf9f7', borderTop: `1px solid ${primary}10`
        }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
                fontWeight: '700', color: accent, whiteSpace: 'nowrap'
              }}>Education</div>
              <div style={{ flex: 1, height: '1px', background: `${primary}20` }} />
            </div>

            <div style={{
              padding: '24px', background: '#fff',
              borderLeft: `4px solid ${accent}`
            }}>
              <div style={{
                fontSize: '14px', lineHeight: '1.75', whiteSpace: 'pre-wrap',
                color: '#444', fontFamily: '"Georgia", "Times New Roman", serif'
              }}>{education}</div>
            </div>
          </div>
        </div>
      )}

      {/* ——— FOOTER — Editorial ——— */}
      <div style={{
        background: primary, color: '#fff',
        padding: 'clamp(32px, 6vw, 56px) clamp(24px, 5vw, 48px)'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
            fontWeight: '700', color: accent, marginBottom: '16px'
          }}>Get In Touch</div>

          <h2 style={{
            margin: '0 0 12px', fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: '900', color: '#fff', lineHeight: '1.1',
            fontFamily: '"Georgia", "Times New Roman", serif'
          }}>Let's create something extraordinary.</h2>

          <p style={{
            margin: '0 0 24px', fontSize: '14px',
            color: 'rgba(255,255,255,0.5)', lineHeight: '1.6'
          }}>Open to collaborations, speaking engagements, and exciting opportunities.</p>

          <div style={{
            display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'
          }}>
            <a href={`mailto:${email}`} style={{
              background: accent, color: '#fff', padding: '12px 28px',
              fontSize: '13px', fontWeight: '700', letterSpacing: '1px',
              textTransform: 'uppercase', textDecoration: 'none',
              border: 'none'
            }}>✉ {email}</a>
            {phone && (
              <span style={{
                border: `1.5px solid rgba(255,255,255,0.25)`, color: 'rgba(255,255,255,0.7)',
                padding: '12px 28px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px'
              }}>☎ {phone}</span>
            )}
          </div>

          {/* Bottom rule */}
          <div style={{
            marginTop: '36px', paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', justifyContent: 'center', gap: '24px',
            fontSize: '10px', color: 'rgba(255,255,255,0.3)',
            letterSpacing: '3px', textTransform: 'uppercase'
          }}>
            <span>{name}</span>
            <span>·</span>
            <span>{role}</span>
            <span>·</span>
            <span>Portfolio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazinePortfolio;
