import { useState, useMemo, useEffect } from 'react';
import { Filter, LayoutGrid, Network, X, PlayCircle } from 'lucide-react';
import { contributionsData } from '../data/contributions';
import { BentoGrid } from './contributions/BentoGrid';
import { KnowledgeGraph } from './contributions/KnowledgeGraph';
import { DetailsDrawer } from './contributions/DetailsDrawer';

export function ContributionsSection() {
  const [activeMode, setActiveMode] = useState('bento'); // 'bento' | 'graph'
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filters = ['All', 'Mentorship', 'Research', 'Publications', 'Workshops'];

  // --- Hash Routing Logic ---
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#contributions/')) {
        const slug = hash.replace('#contributions/', '');
        const item = contributionsData.find(c => c.slug === slug);
        if (item) {
          setSelectedItem(item);
        }
      } else {
        setSelectedItem(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    window.history.pushState(null, null, `#contributions/\${item.slug}`);
  };

  const handleCloseDrawer = () => {
    setSelectedItem(null);
    window.history.pushState(null, null, '#contributions');
  };
  // --------------------------

  // Filter & Sort Logic
  const filteredData = useMemo(() => {
    let data = contributionsData;
    if (activeFilter !== 'All') data = data.filter(item => item.category === activeFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item => item.title.toLowerCase().includes(q) || item.impactHeadline.toLowerCase().includes(q));
    }

    // Preserve the curated array order from contributions.js
    return data;
  }, [activeFilter, searchQuery]);

  // Featured Items for the Top Strip
  const featuredStripItems = useMemo(() => {
    return contributionsData.filter(c => c.featured).slice(0, 3);
  }, []);

  return (
    <section id="contributions" className="py-32 relative bg-background overflow-hidden">
      {/* Background Noise effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header & Recruiter Lens */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 animate-fade-in">
          <div className="space-y-4 max-w-2xl">
            <span className="text-primary text-sm font-black uppercase tracking-[0.5em] block">Contributions OS</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              Contributions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">Achievements.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-snug">
              Proof of how I show up: ship end-to-end, communicate clearly, and leave teams stronger than I found them.
            </p>
          </div>

          {/* Recruiter Lens Block */}
          <div className="bg-secondary/20 border border-border/50 rounded-3xl p-6 md:p-8 shrink-0 w-full lg:w-[480px] shadow-lg backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-indigo-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-[10px] shadow-sm">
                  🎯
                </span>
                What this section proves
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex gap-3 items-start p-3 rounded-xl bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-border/30 hover:border-blue-500/30 transition-all duration-300">
                <span className="text-blue-500 mt-0.5 text-lg leading-none">▸</span>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">I ship end-to-end:</span> from messy requirements → implemented system → measurable outcomes → production-grade reliability.
                </p>
              </li>
              <li className="flex gap-3 items-start p-3 rounded-xl bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-border/30 hover:border-purple-500/30 transition-all duration-300">
                <span className="text-purple-500 mt-0.5 text-lg leading-none">▸</span>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">I communicate at every level:</span> clear technical writing, workshops, demos, and stakeholder translation without losing rigor.
                </p>
              </li>
              <li className="flex gap-3 items-start p-3 rounded-xl bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-border/30 hover:border-emerald-500/30 transition-all duration-300">
                <span className="text-emerald-500 mt-0.5 text-lg leading-none">▸</span>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-500">I build repeatable playbooks:</span> templates, checklists, training materials, and “how we do it” workflows that scale beyond me.
                </p>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-border/30">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">
                Everything here includes evidence: links, media, or artifacts.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Proof Strip */}
        <div className="mb-16">
          <div className="mb-6">
            <h3 className="text-lg font-black tracking-tight text-foreground">Featured PROOF</h3>
            <p className="text-sm text-muted-foreground font-medium">A fast look at the work I’m most proud of — click to see the receipts.</p>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-4 px-1 min-w-full scrollbar-hide snap-x">
            {featuredStripItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectItem(item)}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-border/50 bg-secondary/10 hover:bg-secondary/30 transition-all hover:border-primary/50 group text-left w-[300px] sm:w-[400px] shrink-0 snap-start shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {/* Media Thumbnail */}
                <div className="w-full sm:w-20 h-40 sm:h-20 rounded-xl overflow-hidden relative shrink-0">
                  {item.media && item.media[0] ? (
                    <>
                      {item.media[0].type === 'video' ? (
                        <img src={item.media[0].thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <img src={item.media[0].url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-primary/20" />
                  )}
                  {item.media && item.media[0] && item.media[0].type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
                {/* Fast Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                  <h4 className="text-sm font-bold text-foreground truncate">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1 mb-2 font-medium">{item.impactHeadline}</p>
                  <div className="flex items-center justify-between mt-auto">
                    {item.proofTags && item.proofTags.length > 0 && (
                      <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-background border border-border/50 text-foreground/70">
                        {item.proofTags[0]}
                      </span>
                    )}
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 ml-auto">
                      Open →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Controls Engine */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 py-6 border-b border-border/50 mb-12 relative z-20">

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Filter</span>
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
              <Filter className="w-3 h-3 text-muted-foreground shrink-0 hidden sm:block" />
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${activeFilter === f ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-card border-border text-foreground hover:border-primary hover:bg-primary/10'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between w-full md:w-auto gap-4">

            <div className="flex flex-col items-end sm:items-start gap-2 hidden lg:flex mr-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-0">Helper</span>
              <span className="text-[10px] font-medium text-muted-foreground italic h-7 flex items-center">
                Click any tile to open the full story + receipts.
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">View</span>
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-secondary/20 rounded-xl border border-border/50 shrink-0">
                <button
                  onClick={() => setActiveMode('bento')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none \${activeMode === 'bento' ? 'bg-background text-primary shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground border border-transparent'}`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Bento <span className="text-[8px] font-medium lowercase italic text-muted-foreground hidden lg:inline ml-1">(recommended)</span></span>
                </button>
                <button
                  onClick={() => setActiveMode('graph')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none \${activeMode === 'graph' ? 'bg-background text-primary shadow-sm border border-border/50' : 'text-muted-foreground hover:text-foreground border border-transparent'}`}
                >
                  <Network className="w-3 h-3" />
                  <span>Graph <span className="text-[8px] font-medium lowercase italic text-muted-foreground hidden lg:inline ml-1">(Explore)</span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Renderer */}
        <div className="min-h-[600px] relative z-10 w-full">
          {activeMode === 'bento' ? (
            <BentoGrid items={filteredData} onSelect={handleSelectItem} />
          ) : (
            <KnowledgeGraph items={filteredData} onSelect={handleSelectItem} />
          )}
        </div>

      </div>

      {/* Shared Details Drawer */}
      <DetailsDrawer
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={handleCloseDrawer}
      />

    </section>
  );
}
