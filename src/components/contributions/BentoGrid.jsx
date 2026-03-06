import { ExternalLink, PlayCircle, Image as ImageIcon, BookOpen, User, ChevronRight, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const getIconForCategory = (category) => {
    switch (category) {
        case 'Mentorship': return <User className="w-4 h-4" />;
        case 'Research': return <BookOpen className="w-4 h-4" />;
        case 'Publications': return <BookOpen className="w-4 h-4" />;
        case 'Workshops': return <PlayCircle className="w-4 h-4" />;
        default: return <ImageIcon className="w-4 h-4" />;
    }
};

/* ═══════════════════════════════════════════════════════════════
   EXPANDED SECTION — Full-width editorial block with inline media
   Now supports extendedDescription for deep-dives (e.g. Eagle Eye AI)
   ═══════════════════════════════════════════════════════════════ */
const ExpandedSection = ({ item, onClick }) => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mq.matches);
        const h = (e) => setPrefersReducedMotion(e.matches);
        mq.addEventListener('change', h);
        return () => mq.removeEventListener('change', h);
    }, []);

    const videoMedia = item.media?.find(m => m.type === 'video');
    const imageMedia = item.media?.filter(m => m.type === 'image') || [];
    const ext = item.extendedDescription;

    return (
        <div className="w-full rounded-3xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 group">

            {/* Section Header */}
            <div className="px-8 py-8 md:px-10 md:py-10 border-b border-border/30">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-widest text-primary">
                                {getIconForCategory(item.category)}
                                {item.category}
                            </span>
                            {item.proofTags?.map((tag, i) => (
                                <span key={i} className="text-[8px] font-bold text-foreground/60 uppercase tracking-widest px-2 py-0.5 rounded bg-secondary/80 border border-border/50">{tag}</span>
                            ))}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
                            {item.title}
                        </h3>
                        <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
                            {item.impactHeadline}
                        </p>
                    </div>

                    {/* CTA to open Drawer for full details */}
                    <button
                        onClick={() => onClick(item)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all shrink-0 self-start"
                    >
                        Full Story <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* External Links */}
                {item.links?.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-6">
                        {item.links.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-xs font-bold text-foreground hover:bg-secondary hover:border-primary/30 transition-all">
                                <ExternalLink className="w-3.5 h-3.5 text-primary" /> {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Extended Description Deep-Dive (e.g. Eagle Eye AI) */}
            {ext && (
                <div className="px-8 py-8 md:px-10 md:py-10 border-b border-border/30 space-y-8">
                    {/* Problem Statement */}
                    {ext.problemStatement && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-red-500">Problem Statement</h4>
                            </div>
                            <p className="text-sm text-foreground/80 font-medium leading-relaxed pl-11">
                                {ext.problemStatement}
                            </p>
                        </div>
                    )}

                    {/* Proposed Solution */}
                    {ext.proposedSolution && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <Lightbulb className="w-4 h-4 text-emerald-500" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-emerald-500">Proposed Solution</h4>
                            </div>
                            <p className="text-sm text-foreground/80 font-medium leading-relaxed pl-11">
                                {ext.proposedSolution}
                            </p>
                        </div>
                    )}

                    {/* Real-World Scenario */}
                    {ext.realWorldScenario && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <Target className="w-4 h-4 text-amber-500" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-amber-500">Real-World Scenario</h4>
                            </div>
                            <p className="text-sm text-foreground/80 font-medium leading-relaxed pl-11 italic">
                                "{ext.realWorldScenario}"
                            </p>
                        </div>
                    )}

                    {/* Technical Highlights */}
                    {ext.technicalHighlights?.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground pl-11">Technical Highlights</h4>
                            <ul className="space-y-2 pl-11">
                                {ext.technicalHighlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-medium">
                                        <span className="text-primary mt-0.5 shrink-0">▸</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Platforms Grid — for full-stack showcase */}
                    {ext.platforms?.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Platforms Built — Pain Point → Solution</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {ext.platforms.map((p, i) => (
                                    <a
                                        key={i}
                                        href={`https://github.com/ghantapavan93/${p.repo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="group/plat p-4 rounded-xl bg-secondary/5 border border-border/40 hover:border-primary/40 hover:bg-secondary/15 transition-all space-y-2"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h5 className="text-sm font-black text-foreground leading-tight">{p.name}</h5>
                                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">{p.tagline}</p>
                                            </div>
                                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/plat:text-primary transition-colors shrink-0 mt-0.5" />
                                        </div>
                                        <p className="text-[11px] text-red-500/80 font-medium leading-snug">
                                            <span className="font-bold text-red-500">Pain:</span> {p.painPoint}
                                        </p>
                                        <p className="text-[11px] text-emerald-600/80 font-medium leading-snug">
                                            <span className="font-bold text-emerald-600">Fix:</span> {p.solution}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Video (if present) — Full Width */}
            {videoMedia && (
                <div className="relative w-full aspect-video bg-black">
                    <video
                        ref={videoRef}
                        controls
                        poster={videoMedia.thumbnail}
                        preload="none"
                        className="w-full h-full object-contain"
                    >
                        <source src={videoMedia.url} type="video/mp4" />
                    </video>
                    {videoMedia.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
                            <p className="text-xs text-white/80 font-medium">{videoMedia.caption}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Photo Grid — ALL images shown inline */}
            {imageMedia.length > 0 && (
                <div className={`grid gap-3 p-6 md:p-8 ${imageMedia.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
                    imageMedia.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                        imageMedia.length <= 4 ? 'grid-cols-2 md:grid-cols-2' :
                            imageMedia.length <= 6 ? 'grid-cols-2 md:grid-cols-3' :
                                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    }`}>
                    {imageMedia.map((media, i) => (
                        <div
                            key={i}
                            className="relative rounded-2xl overflow-hidden border border-border/30 bg-secondary/10 group/img cursor-pointer shadow-sm hover:shadow-md transition-all"
                            onClick={() => onClick(item)}
                        >
                            <div className={`w-full ${imageMedia.length <= 2 ? 'aspect-[16/10]' : 'aspect-square'} relative`}>
                                <img
                                    src={media.url}
                                    alt={media.caption || `${item.title} photo ${i + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                                />
                                {/* Caption overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex items-end">
                                    <p className="text-[10px] text-white/90 font-bold px-4 py-3 leading-tight">{media.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════
   MEDIUM CARD — For LinkedIn posts (larger images + more explanation)
   ═══════════════════════════════════════════════════════════════ */
const MediumCard = ({ item, onClick }) => {
    return (
        <div
            onClick={() => onClick(item)}
            className="relative group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-[0_0_30px_rgba(66,133,244,0.15)] flex flex-col"
        >
            {/* Image Area — large and prominent */}
            {item.media?.[0] && (
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-secondary/20">
                    <img
                        src={item.media[0].url}
                        alt={item.media[0].caption || item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-foreground border border-white/10">
                        {getIconForCategory(item.category)}
                        {item.category}
                    </div>

                    {/* LinkedIn badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-600 text-[8px] font-black uppercase tracking-widest text-white">
                        LinkedIn
                    </div>
                </div>
            )}

            {/* Content — much more detailed than SmallCard */}
            <div className="flex flex-col flex-1 p-6 space-y-3">
                <h3 className="text-xl font-black tracking-tight text-foreground leading-snug">
                    {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {item.impactHeadline}
                </p>

                {/* Proof tags */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                    {item.proofTags?.map((tag, i) => (
                        <span key={i} className="text-[8px] font-bold text-foreground/60 uppercase tracking-widest px-2 py-0.5 rounded bg-secondary/80 border border-border/50">{tag}</span>
                    ))}
                </div>

                {/* Link + CTA row */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
                    {item.links?.[0] && (
                        <a href={item.links[0].url} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                            <ExternalLink className="w-3.5 h-3.5" /> {item.links[0].label}
                        </a>
                    )}
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Open details →
                    </span>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════
   HERO HACKATHON CARD — Full-width spotlight for Eagle Eye AI
   ═══════════════════════════════════════════════════════════════ */
const HeroHackathonCard = ({ item, onClick }) => {
    return (
        <div
            onClick={() => onClick(item)}
            className="relative group rounded-3xl overflow-hidden bg-card border-2 border-primary/30 hover:border-primary transition-all duration-500 cursor-pointer shadow-md hover:shadow-[0_0_40px_rgba(66,133,244,0.2)]"
        >
            <div className="flex flex-col md:flex-row">
                {/* Image — large left side */}
                {item.media?.[0] && (
                    <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-secondary/20">
                        <img
                            src={item.media[0].url}
                            alt={item.media[0].caption || item.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20 hidden md:block" />

                        {/* Hackathon badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                            🏆 Hackathon Showcase
                        </div>
                    </div>
                )}

                {/* Content — right side */}
                <div className="flex flex-col flex-1 p-8 md:p-10 justify-center space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-widest text-primary">
                            {getIconForCategory(item.category)}
                            {item.category}
                        </span>
                        {item.proofTags?.map((tag, i) => (
                            <span key={i} className="text-[8px] font-bold text-foreground/60 uppercase tracking-widest px-2 py-0.5 rounded bg-secondary/80 border border-border/50">{tag}</span>
                        ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                        {item.impactHeadline}
                    </p>

                    {/* Key skills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {item.skills?.slice(0, 5).map((skill, i) => (
                            <span key={i} className="text-[9px] font-bold text-primary px-2.5 py-1 rounded-md bg-primary/5 border border-primary/15">{skill}</span>
                        ))}
                    </div>

                    {/* Links + CTA */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                        {item.links?.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                                <ExternalLink className="w-3.5 h-3.5" /> {link.label}
                            </a>
                        ))}
                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                            See full hackathon story →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════
   BENTO GRID — Main export
   Renders Expanded sections + Hero hackathon + Medium LinkedIn cards
   ═══════════════════════════════════════════════════════════════ */
export const BentoGrid = ({ items, onSelect }) => {
    if (!items || items.length === 0) {
        return (
            <div className="w-full py-20 flex items-center justify-center border border-dashed border-border/50 rounded-3xl">
                <p className="text-muted-foreground font-medium">No contributions found for this category.</p>
            </div>
        );
    }

    // Find where the mentoring block should be inserted based on the original array order
    const firstMediumIndex = items.findIndex(i => i.bentoSize === 'medium');

    // Group items based on their position relative to the medium items
    const expandedBefore = items.slice(0, firstMediumIndex > -1 ? firstMediumIndex : items.length).filter(i => i.bentoSize === 'expanded');
    const expandedAfter = firstMediumIndex > -1 ? items.slice(firstMediumIndex).filter(i => i.bentoSize === 'expanded') : [];

    const mediumItems = items.filter(i => i.bentoSize === 'medium');

    // Separate: hackathon hero (eagle-eye-ai), platforms showcase, and regular LinkedIn posts
    const heroItem = mediumItems.find(i => i.extendedDescription && !i.extendedDescription?.platforms);
    const platformsItem = mediumItems.find(i => i.extendedDescription?.platforms);
    const regularMedium = mediumItems.filter(i => !i.extendedDescription);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Expanded Editorial Sections (Before Mentoring) */}
            {expandedBefore.map(item => (
                <ExpandedSection key={item.id} item={item} onClick={onSelect} />
            ))}

            {/* LinkedIn Posts & Hackathon Showcase (Mentoring/Platforms) */}
            {mediumItems.length > 0 && (
                <div>
                    <div className="flex items-center gap-4 mb-8 px-2">
                        <h3 className="text-2xl font-black tracking-tight text-foreground">Mentoring, Tutoring & Building Full-Stack Applications</h3>
                        <div className="h-px flex-1 bg-border/50" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{mediumItems.length} posts</span>
                    </div>

                    {/* Hero Hackathon Card — full width at top */}
                    {heroItem && (
                        <div className="mb-6">
                            <HeroHackathonCard item={heroItem} onClick={onSelect} />
                        </div>
                    )}

                    {/* Regular LinkedIn Cards — 2 column */}
                    {regularMedium.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {regularMedium.map(item => (
                                <MediumCard key={item.id} item={item} onClick={onSelect} />
                            ))}
                        </div>
                    )}

                    {/* Full-Stack Platforms showcase — after LinkedIn posts */}
                    {platformsItem && (
                        <div className="mt-8">
                            <HeroHackathonCard item={platformsItem} onClick={onSelect} />
                        </div>
                    )}
                </div>
            )}

            {/* Expanded Editorial Sections (After Mentoring) */}
            {expandedAfter.map(item => (
                <ExpandedSection key={item.id} item={item} onClick={onSelect} />
            ))}
        </div>
    );
};

