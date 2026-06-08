import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sparkles, FileText, Briefcase } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  // Hide footer on the builder page (path starts with /build)
  const isBuilderPage = location.pathname.startsWith('/build');

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      <header
        className="glass-card"
        style={{
          borderRadius: 0,
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          position: 'sticky',
          top: 0,
          zIndex: 200,
        }}
      >
        <div
          className="container flex items-center justify-between"
          style={{ padding: '0.6rem 1.5rem', gap: '1rem' }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary), #8b5cf6)',
                padding: '0.45rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
              ElevateAI
            </h2>
          </Link>

          {/* Nav */}
          <nav className="flex items-center" style={{ gap: '0.75rem', flexShrink: 0 }}>
            <Link
              to="/build?type=resume"
              className="flex items-center gap-2 nav-link"
              style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500' }}
            >
              <FileText size={16} />
              <span className="hidden-mobile">Resume</span>
            </Link>
            <Link
              to="/build?type=portfolio"
              className="flex items-center gap-2 nav-link"
              style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500' }}
            >
              <Briefcase size={16} />
              <span className="hidden-mobile">Portfolio</span>
            </Link>
            <Link
              to="/build"
              className="btn btn-primary"
              style={{ textDecoration: 'none', padding: '0.5rem 1.1rem', fontSize: '0.875rem' }}
            >
              <Sparkles size={14} />
              <span className="hidden-mobile">Start Building</span>
              <span style={{ display: 'none' }} className="show-mobile">Build</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1" style={{ display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      {/* Footer — hidden on builder page */}
      {!isBuilderPage && (
        <footer
          style={{
            textAlign: 'center',
            padding: '2.5rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="container">
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
              © {new Date().getFullYear()} ElevateAI Resume &amp; Portfolio Builder · Built with ❤️ for modern professionals
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
