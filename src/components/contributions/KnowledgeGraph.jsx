import { useState, useMemo } from 'react';
import {
    BookOpen,
    Image as ImageIcon,
    MousePointerClick,
    Network,
    PlayCircle,
    RotateCcw,
    Search,
    Sparkles,
    User,
} from 'lucide-react';

const categoryMeta = {
    Mentorship: {
        color: '#10b981',
        soft: 'rgba(16, 185, 129, 0.12)',
        label: 'Mentorship',
        insight: 'Teaching, playbooks, and community leverage',
    },
    Research: {
        color: '#8b5cf6',
        soft: 'rgba(139, 92, 246, 0.12)',
        label: 'Research',
        insight: 'Applied AI, experiments, and technical depth',
    },
    Publications: {
        color: '#2563eb',
        soft: 'rgba(37, 99, 235, 0.12)',
        label: 'Publications',
        insight: 'Writing, proof, and public artifacts',
    },
    Workshops: {
        color: '#f59e0b',
        soft: 'rgba(245, 158, 11, 0.14)',
        label: 'Workshops',
        insight: 'Live delivery, curriculum, and enablement',
    },
    Default: {
        color: '#06b6d4',
        soft: 'rgba(6, 182, 212, 0.12)',
        label: 'Impact',
        insight: 'Evidence-backed work',
    },
};

const getMetaForCategory = (category) => categoryMeta[category] || categoryMeta.Default;

const getIconForCategory = (category, className = 'w-5 h-5') => {
    switch (category) {
        case 'Mentorship': return <User className={className} />;
        case 'Research': return <BookOpen className={className} />;
        case 'Publications': return <BookOpen className={className} />;
        case 'Workshops': return <PlayCircle className={className} />;
        default: return <ImageIcon className={className} />;
    }
};

const getNodeSummary = (node) => {
    if (node.impactHeadline) return node.impactHeadline;
    if (node.details?.whatIDid) return node.details.whatIDid;
    if (node.highlights?.[0]) return node.highlights[0];
    return 'Evidence-backed contribution with receipts and artifacts.';
};

const makePath = (source, target) => {
    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const curve = 7;
    const controlX = midX - dy * 0.08;
    const controlY = midY + dx * 0.08 + (target.y > source.y ? curve : -curve);

    return `M ${source.x} ${source.y} Q ${controlX} ${controlY} ${target.x} ${target.y}`;
};

export const KnowledgeGraph = ({ items, onSelect }) => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { nodes, links, clusters, categoryCounts, featuredCount, proofCount } = useMemo(() => {
        const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
        const hubNode = {
            id: 'hub',
            label: 'Impact',
            x: 50,
            y: 50,
            isHub: true,
            color: '#0f172a',
        };

        const groups = {};
        items.forEach((item) => {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category].push(item);
        });

        const categoryKeys = Object.keys(groups);
        const radius = categoryKeys.length <= 2 ? 27 : 34;
        const resultNodes = [hubNode];
        const resultLinks = [];
        const resultClusters = [];
        const counts = {};
        const proofs = new Set();

        items.forEach((item) => {
            counts[item.category] = (counts[item.category] || 0) + 1;
            item.proofTags?.forEach((tag) => proofs.add(tag));
        });

        categoryKeys.forEach((cat, catIndex) => {
            const baseAngle = (catIndex / categoryKeys.length) * 2 * Math.PI - Math.PI / 12;
            const meta = getMetaForCategory(cat);
            const labelRadius = 43;

            resultClusters.push({
                category: cat,
                x: clamp(50 + Math.cos(baseAngle) * labelRadius, 14, 86),
                y: clamp(50 + Math.sin(baseAngle) * labelRadius, 12, 88),
                color: meta.color,
                insight: meta.insight,
                count: groups[cat].length,
            });

            groups[cat].forEach((item, itemIndex) => {
                const numItems = groups[cat].length;
                const maxOffset = Math.min(1.55, Math.max(0.55, (numItems - 1) * 0.32));
                const angleOffset = numItems > 1
                    ? (itemIndex / (numItems - 1) - 0.5) * maxOffset
                    : 0;
                const finalAngle = baseAngle + angleOffset;
                const rOffset = ((itemIndex % 3) - 1) * 9;
                const finalRadius = radius + rOffset;
                const x = clamp(50 + Math.cos(finalAngle) * finalRadius, 13, 87);
                const y = clamp(50 + Math.sin(finalAngle) * finalRadius, 14, 86);

                resultNodes.push({
                    ...item,
                    x,
                    y,
                    color: meta.color,
                    soft: meta.soft,
                });

                resultLinks.push({
                    source: hubNode,
                    target: { id: item.id, x, y },
                    color: meta.color,
                    category: cat,
                });
            });
        });

        return {
            nodes: resultNodes,
            links: resultLinks,
            clusters: resultClusters,
            categoryCounts: counts,
            featuredCount: items.filter((item) => item.featured).length,
            proofCount: proofs.size,
        };
    }, [items]);

    const filteredNodes = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return nodes;

        return nodes.filter((node) => {
            if (node.isHub) return true;

            return [
                node.title,
                node.category,
                node.impactHeadline,
                node.details?.role,
                ...(node.skills || []),
                ...(node.proofTags || []),
            ].some((value) => value?.toLowerCase().includes(term));
        });
    }, [nodes, searchTerm]);

    const visibleIds = useMemo(() => new Set(filteredNodes.map((node) => node.id)), [filteredNodes]);
    const activeNode = nodes.find((node) => node.id === hoveredNode);

    if (!items || items.length === 0) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center border border-border/50 rounded-3xl bg-secondary/10">
                <p className="text-muted-foreground font-medium">No nodes available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 px-4">
                <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Impact constellation
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                            Explore the proof behind the portfolio
                        </h3>
                        <p className="mt-2 text-sm md:text-base text-foreground/80 font-medium max-w-2xl leading-relaxed">
                            Every node is clickable. The map connects workshops, research, publications, and mentorship into one evidence-backed story.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-lg">
                        <div className="rounded-2xl border border-border/50 bg-card/70 px-3 py-2 shadow-sm">
                            <div className="text-lg font-black text-foreground">{items.length}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Proof nodes</div>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card/70 px-3 py-2 shadow-sm">
                            <div className="text-lg font-black text-foreground">{featuredCount}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Featured</div>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-card/70 px-3 py-2 shadow-sm">
                            <div className="text-lg font-black text-foreground">{proofCount}</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Proof tags</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 w-full xl:w-auto">
                    <div className="flex flex-wrap gap-2 xl:justify-end">
                        {Object.entries(categoryCounts).map(([category, count]) => {
                            const meta = getMetaForCategory(category);
                            return (
                                <div
                                    key={category}
                                    className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm"
                                    style={{ borderColor: `${meta.color}45`, color: meta.color }}
                                >
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />
                                    {category}
                                    <span className="text-foreground/50">{count}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3 shrink-0 w-full xl:w-auto">
                        <div className="relative flex-1 xl:w-72">
                            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search proof, skill, category..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full bg-card/80 border border-border/60 rounded-2xl pl-9 pr-4 py-3 text-xs font-bold text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-colors shadow-sm"
                            />
                        </div>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-card/80 hover:bg-secondary border border-border/60 text-xs font-bold text-foreground transition-all shrink-0 shadow-sm"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-[720px] md:h-[860px] rounded-[2rem] border border-border/50 bg-background overflow-hidden shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
                <div
                    className="absolute inset-0 opacity-70 pointer-events-none"
                    style={{
                        backgroundImage: [
                            'linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px)',
                            'linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)',
                            'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12), transparent 36%)',
                        ].join(', '),
                        backgroundSize: '42px 42px, 42px 42px, 100% 100%',
                    }}
                />
                <div className="absolute left-6 top-6 z-30 hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur">
                    <MousePointerClick className="h-3.5 w-3.5 text-primary" />
                    Click a node to open receipts
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <filter id="graph-glow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="0.75" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="0.25" strokeDasharray="1.5 1.5" />
                    <circle cx="50" cy="50" r="23" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="0.25" strokeDasharray="1 1.6" />
                    {links.map((link, index) => {
                        const isSearchFaded = searchTerm && !visibleIds.has(link.target.id);
                        const isHoverFaded = hoveredNode && hoveredNode !== 'hub' && hoveredNode !== link.target.id;
                        const isFaded = isHoverFaded || isSearchFaded;
                        const isHighlighted = hoveredNode === link.target.id || hoveredNode === 'hub';

                        return (
                            <path
                                key={index}
                                d={makePath(link.source, link.target)}
                                fill="none"
                                stroke={link.color}
                                strokeWidth={isHighlighted ? 0.46 : 0.22}
                                strokeOpacity={isFaded ? 0.04 : (isHighlighted ? 0.85 : 0.28)}
                                className="transition-all duration-700"
                                filter={isHighlighted ? 'url(#graph-glow)' : undefined}
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>

                {clusters.map((cluster) => (
                    <div
                        key={cluster.category}
                        className="absolute z-10 hidden md:block -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-background/70 px-3 py-2 shadow-sm backdrop-blur"
                        style={{
                            left: `${cluster.x}%`,
                            top: `${cluster.y}%`,
                            borderColor: `${cluster.color}35`,
                            color: cluster.color,
                        }}
                    >
                        <div className="text-[10px] font-black uppercase tracking-[0.22em]">
                            {cluster.category}
                        </div>
                        <div className="mt-0.5 text-[10px] font-semibold normal-case tracking-normal text-foreground/60">
                            {cluster.count} nodes
                        </div>
                    </div>
                ))}

                {filteredNodes.map((node) => {
                    const isHovered = hoveredNode === node.id;
                    const isFaded = hoveredNode && hoveredNode !== node.id && !node.isHub;

                    if (node.isHub) {
                        return (
                            <button
                                key={node.id}
                                type="button"
                                className="absolute z-20 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-background/90 shadow-[0_0_60px_rgba(37,99,235,0.18)] backdrop-blur transition-transform duration-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                aria-label="Impact hub"
                            >
                                <span className="absolute inset-[-18px] rounded-full border border-primary/15" />
                                <span className="absolute inset-[-34px] rounded-full border border-primary/10" />
                                <span className="flex h-full flex-col items-center justify-center">
                                    <Network className="mb-2 h-6 w-6 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Impact</span>
                                    <span className="mt-1 text-xl font-black text-foreground">{items.length}</span>
                                </span>
                            </button>
                        );
                    }

                    const meta = getMetaForCategory(node.category);
                    const summary = getNodeSummary(node);

                    return (
                        <button
                            key={node.id}
                            type="button"
                            className={`absolute z-30 h-[142px] w-[156px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border bg-background/95 p-2.5 text-left shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:w-[164px] ${isFaded ? 'opacity-25' : 'opacity-100'} ${isHovered ? 'scale-110' : 'scale-100 hover:scale-105'}`}
                            style={{
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                borderColor: `${node.color}${isHovered ? 'aa' : '45'}`,
                                boxShadow: isHovered ? `0 22px 70px ${node.color}35` : undefined,
                            }}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            onClick={() => onSelect(node)}
                            aria-label={`Open ${node.title}`}
                        >
                            <span
                                className="absolute inset-x-4 -top-px h-px"
                                style={{ background: `linear-gradient(90deg, transparent, ${node.color}, transparent)` }}
                            />
                            <span className="flex items-start gap-3">
                                <span
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                                    style={{
                                        color: node.color,
                                        backgroundColor: meta.soft,
                                        borderColor: `${node.color}45`,
                                    }}
                                >
                                    {getIconForCategory(node.category, 'w-4 h-4')}
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: node.color }}>
                                        {node.category}
                                    </span>
                                    <span className="mt-1 block max-h-8 overflow-hidden text-[11px] font-black leading-tight text-foreground">
                                        {node.title}
                                    </span>
                                </span>
                            </span>
                            <span className="mt-2 block max-h-9 overflow-hidden text-[9px] font-medium leading-relaxed text-muted-foreground">
                                {summary}
                            </span>
                            {node.proofTags?.length > 0 && (
                                <span className="mt-2 flex flex-wrap gap-1">
                                    {node.proofTags.slice(0, 1).map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-foreground/70"
                                            style={{ borderColor: `${node.color}35`, backgroundColor: `${node.color}10` }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </span>
                            )}
                        </button>
                    );
                })}

                <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-3 md:grid-cols-[1fr_auto]">
                    <div className="rounded-2xl border border-border/60 bg-background/85 p-4 shadow-sm backdrop-blur">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                            {activeNode && !activeNode.isHub ? 'Focused proof node' : 'Portfolio narrative'}
                        </div>
                        <div className="mt-1 text-sm font-bold text-foreground">
                            {activeNode && !activeNode.isHub ? activeNode.title : 'Mentorship, research, writing, and workshops reinforce the same signal: I build and explain real systems.'}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-background/85 p-4 shadow-sm backdrop-blur md:w-64">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                            Search scope
                        </div>
                        <div className="mt-1 text-sm font-bold text-foreground">
                            {searchTerm ? `${Math.max(filteredNodes.length - 1, 0)} matching nodes` : 'All evidence visible'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
