import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const resumeLink =
    'https://drive.google.com/file/d/1ZzsEtDdGER8rRoCCX9zFI3qQSAgfj50z/view?usp=sharing';

  // ✅ Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Disable scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'visible';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 md:py-4 bg-background/95 backdrop-blur-sm shadow-sm'
          : 'py-4 md:py-6 bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a
            href="#"
            className="group relative z-50"
            aria-label="Pavan Kalyan Ghanta - Back to top"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              Pavan Kalyan Ghanta
              <span className="block h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </h1>
          </a>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav aria-label="Main Navigation">
              <ul className="flex space-x-6 lg:space-x-8">
                <li>
                  <NavLink href="#projects">Projects</NavLink>
                </li>
                <li>
                  <NavLink href={resumeLink} isExternal={true}>
                    Resume
                  </NavLink>
                </li>
                <li>
                  <NavLink href="#experience">Experience</NavLink>
                </li>
                <li>
                  <NavLink href="#contributions">Contributions</NavLink>
                </li>
                <li>
                  <NavLink href="#contact" highlight={true}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>

          {/* ✅ Mobile Toggle */}
          <div className="flex items-center md:hidden gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="p-2.5 rounded-md text-foreground hover:bg-secondary/80 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col justify-center items-center z-40 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <nav>
          <ul className="flex flex-col space-y-6 text-center">
            <li>
              <MobileNavLink href="#projects" onClick={() => setMobileMenuOpen(false)}>
                Projects
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href={resumeLink} isExternal={true}>
                Resume
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="#experience" onClick={() => setMobileMenuOpen(false)}>
                Experience
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink href="#contributions" onClick={() => setMobileMenuOpen(false)}>
                Contributions
              </MobileNavLink>
            </li>
            <li>
              <MobileNavLink
                href="#contact"
                highlight={true}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children, highlight = false, isExternal = false }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isExternal) return;
    const section = document.querySelector(href);
    const checkIfActive = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setIsActive(rect.top <= 100 && rect.bottom >= 100);
    };
    window.addEventListener('scroll', checkIfActive);
    checkIfActive();
    return () => window.removeEventListener('scroll', checkIfActive);
  }, [href, isExternal]);

  const handleClick = (e) => {
    if (isExternal) return;
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={!isExternal ? handleClick : undefined}
      className={`text-sm font-medium relative transition-colors ${
        highlight
          ? 'text-primary hover:text-primary/90'
          : isActive
          ? 'text-primary'
          : 'hover:text-primary'
      }`}
    >
      {children}
      {isActive && !isExternal && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
      )}
    </a>
  );
}

function MobileNavLink({ href, children, highlight = false, isExternal = false, onClick }) {
  const handleClick = (e) => {
    if (isExternal) return;
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      if (onClick) onClick();
    }
  };

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={!isExternal ? handleClick : undefined}
      className={`text-lg font-medium py-2 px-4 block transition-colors ${
        highlight ? 'text-primary hover:text-primary/90' : 'hover:text-primary'
      }`}
    >
      {children}
    </a>
  );
}
