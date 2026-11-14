// One way to move around the page. Header links, the mobile menu, ⌘K, the hero
// buttons and any in-page <a href="#…"> all land the same way:
//   - sections keep clear of the fixed header (CSS scroll-margin-top uses --header-h);
//   - after a smooth scroll, the landing is re-checked once and corrected if the
//     layout moved underneath it (lazy images, GSAP pin spacers, header shrinking);
//   - the URL hash is updated, so the address bar can be shared or refreshed.

const USER_INPUT = ['wheel', 'touchstart', 'keydown', 'mousedown'];

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function setHash(hash) {
  const url = `${window.location.pathname}${window.location.search}${hash}`;
  window.history.replaceState(window.history.state, '', url);
}

/** Is the element resting where scrollIntoView puts it (top edge at its scroll margin)? */
function isSettled(el) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.abs(el.getBoundingClientRect().top - margin) <= 4;
}

/** Wait until scrolling stops (scrollend where supported, otherwise a timeout). */
function afterScrollSettles(callback) {
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener('scrollend', finish);
    clearTimeout(fallback);
    callback();
  };
  window.addEventListener('scrollend', finish, { once: true });
  const fallback = setTimeout(finish, 1500);
}

/**
 * Scroll to the section with this id. Returns false if it isn't on the page.
 * Stops correcting as soon as the visitor scrolls or types on their own.
 */
export function scrollToSection(id, { updateHash = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;

  // 'instant', not 'auto': 'auto' defers to the page's CSS scroll-behavior (smooth).
  const behavior = prefersReducedMotion() ? 'instant' : 'smooth';
  el.scrollIntoView({ behavior, block: 'start' });
  if (updateHash) setHash(`#${id}`);

  let interrupted = false;
  const interrupt = () => { interrupted = true; };
  USER_INPUT.forEach((type) => window.addEventListener(type, interrupt, { passive: true, once: true }));

  afterScrollSettles(() => {
    USER_INPUT.forEach((type) => window.removeEventListener(type, interrupt));
    if (!interrupted && !isSettled(el)) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  return true;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  setHash('');
}

/**
 * Document-level click handler: routes plain in-page links (href="#id") through
 * scrollToSection. Leaves alone links with modifiers, "#a/b" sub-routes, and
 * hashes that don't match an element.
 */
export function handleInPageLinkClick(event) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target.closest?.('a[href^="#"]');
  if (!link || link.target === '_blank') return;

  const hash = link.getAttribute('href');
  if (hash === '#') {
    event.preventDefault();
    scrollToTop();
    return;
  }
  const id = decodeURIComponent(hash.slice(1));
  if (id.includes('/')) return;
  if (scrollToSection(id)) event.preventDefault();
}
