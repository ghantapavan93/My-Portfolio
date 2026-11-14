import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { handleInPageLinkClick } from '../lib/scroll';

// In-page sections, in the order they appear on the page.
const SECTIONS = [
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact', highlight: true },
];

/**
 * The section the visitor is reading: the last one whose top has passed a line
 * a third of the way down the screen. At the very bottom, the last section wins.
 */
function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = null;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (atBottom) current = SECTIONS[SECTIONS.length - 1].id;
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return active;
}


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);
  const activeSection = useActiveSection();

  // Every in-page link (#projects, #experience, …) anywhere on the page goes
  // through one scroll routine, so they all land the same way.
  useEffect(() => {
    document.addEventListener('click', handleInPageLinkClick);
    return () => document.removeEventListener('click', handleInPageLinkClick);
  }, []);

  // Publish the header's real height; sections use it as their scroll margin.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const publish = () =>
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    const observer = new ResizeObserver(publish);
    // border-box: the header shrinks by changing its padding, not its content.
    observer.observe(header, { box: 'border-box' });
    publish();
    return () => observer.disconnect();
  }, []);

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

  // At the very top the header floats over the dark photo hero, so its text
  // must be light in both themes (theme colours take over once scrolled).
  const onHero = !scrolled && !mobileMenuOpen;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? 'py-3 md:py-4 bg-background/95 backdrop-blur-sm shadow-sm text-foreground'
          : `py-4 md:py-6 bg-transparent ${onHero ? 'text-white' : 'text-foreground'}`
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
            <span className="block text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              Pavan Kalyan Ghanta
              <span className="block h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav aria-label="Main Navigation">
              <ul className="flex space-x-6 lg:space-x-8">
                {SECTIONS.map(({ id, label, highlight }) => (
                  <li key={id}>
                    <NavLink href={`#${id}`} highlight={highlight} isActive={activeSection === id}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
          </div>

          {/* ✅ Mobile Toggle */}
          <div className="flex items-center md:hidden gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="p-2.5 rounded-md hover:bg-secondary/80 transition-colors"
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
        inert={!mobileMenuOpen}
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col justify-center items-center z-40 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
      >
        <nav>
          <ul className="flex flex-col space-y-6 text-center">
            {SECTIONS.map(({ id, label, highlight }) => (
              <li key={id}>
                <MobileNavLink
                  href={`#${id}`}
                  highlight={highlight}
                  isActive={activeSection === id}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </MobileNavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// In-page links are plain anchors; Header's document click handler scrolls them.
function NavLink({ href, children, highlight = false, isExternal = false, isActive = false }) {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-current={isActive ? 'location' : undefined}
      className={`text-sm font-medium relative transition-colors ${highlight
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

function MobileNavLink({ href, children, highlight = false, isExternal = false, isActive = false, onClick }) {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      aria-current={isActive ? 'location' : undefined}
      className={`text-lg font-medium py-2 px-4 block transition-colors ${highlight || isActive ? 'text-primary hover:text-primary/90' : 'hover:text-primary'
        }`}
    >
      {children}
    </a>
  );
}
