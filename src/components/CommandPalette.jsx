import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Command, ArrowRight, Sparkles, FileText, Linkedin, Github, X } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// ⌘K — the portfolio behaves like a product. Jump anywhere, ask GPK anything,
// grab the resume. A floating hint teaches the shortcut once.
// ─────────────────────────────────────────────────────────────────────────────

const RESUME_URL = 'https://drive.google.com/file/d/1ZzsEtDdGER8rRoCCX9zFI3qQSAgfj50z/view?usp=sharing';

const GPK_QUESTIONS = [
  'Introduce yourself',
  'What are you working on right now?',
  "What's your strongest project?",
  'Why should we hire you?',
  'Do you need visa sponsorship?',
  'Tell me about a production incident',
  'Tell me about your education',
];

function jump(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [hintSeen, setHintSeen] = useState(false);
  const inputRef = useRef(null);

  const commands = useMemo(
    () => [
      ...GPK_QUESTIONS.map((q) => ({
        group: 'Ask GPK',
        label: q,
        icon: Sparkles,
        run: () => window.dispatchEvent(new CustomEvent('ask-gpk', { detail: q })),
      })),
      { group: 'Go to', label: 'Projects', icon: ArrowRight, run: () => jump('projects') },
      { group: 'Go to', label: 'Experience', icon: ArrowRight, run: () => jump('experience') },
      { group: 'Go to', label: 'Skills', icon: ArrowRight, run: () => jump('skills') },
      { group: 'Go to', label: 'Contributions', icon: ArrowRight, run: () => jump('contributions') },
      { group: 'Go to', label: 'Contact', icon: ArrowRight, run: () => jump('contact') },
      { group: 'Links', label: 'Download resume', icon: FileText, run: () => window.open(RESUME_URL, '_blank', 'noopener') },
      { group: 'Links', label: 'LinkedIn', icon: Linkedin, run: () => window.open('https://www.linkedin.com/in/pavankalyan-ghanta-b20115200/', '_blank', 'noopener') },
      { group: 'Links', label: 'GitHub', icon: Github, run: () => window.open('https://github.com/ghantapavan93', '_blank', 'noopener') },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setHintSeen(true);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const run = (cmd) => {
    setOpen(false);
    // let the palette close before the action (scroll/agent) takes the stage
    setTimeout(() => cmd.run(), 120);
  };

  const onKeyNav = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) { e.preventDefault(); run(filtered[selected]); }
  };

  return (
    <>
      {/* Teach-the-shortcut hint */}
      {!hintSeen && !open && (
        <button
          onClick={() => { setOpen(true); setHintSeen(true); }}
          className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-2 px-3.5 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-white/15 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 shadow-lg transition-all"
          aria-label="Open command palette"
        >
          <Command className="w-3.5 h-3.5 text-primary" />
          <span><kbd className="font-semibold text-foreground">⌘K</kbd> — command your way around</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[14vh] px-4" onClick={() => setOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] rounded-2xl bg-background/95 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-primary/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                onKeyDown={onKeyNav}
                placeholder="Jump somewhere, ask GPK, grab the resume…"
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 rounded hover:bg-white/10">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="max-h-[340px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm text-muted-foreground">
                  Nothing matches — but GPK probably knows. Press <kbd className="font-semibold">Esc</kbd> and ask the chat.
                </p>
              )}
              {filtered.map((c, i) => {
                const Icon = c.icon;
                return (
                  <button
                    key={`${c.group}-${c.label}`}
                    onClick={() => run(c)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      i === selected ? 'bg-primary/15 text-foreground' : 'text-muted-foreground hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${c.group === 'Ask GPK' ? 'text-primary' : ''}`} />
                    <span className="flex-1">{c.label}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-50">{c.group}</span>
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-2 border-t border-white/10 text-[10px] text-muted-foreground flex gap-4">
              <span>↑↓ navigate</span><span>↵ run</span><span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
