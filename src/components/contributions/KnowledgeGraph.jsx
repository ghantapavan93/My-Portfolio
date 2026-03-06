import { useState, useMemo } from 'react';
import { User, BookOpen, PlayCircle, Image as ImageIcon, Search, RotateCcw } from 'lucide-react';

const getIconForCategory = (category) => {
    switch (category) {
        case 'Mentorship': return <User className="w-5 h-5" />;
        case 'Research': return <BookOpen className="w-5 h-5" />;
        case 'Publications': return <BookOpen className="w-5 h-5" />;
        case 'Workshops': return <PlayCircle className="w-5 h-5" />;
        default: return <ImageIcon className="w-5 h-5" />;
    }
};

const getColorForCategory = (category) => {
    switch (category) {
        case 'Mentorship': return '#10b981'; // Emerald
        case 'Research': return '#8b5cf6';   // Violet
        case 'Publications': return '#6366f1'; // Indigo
        case 'Workshops': return '#f59e0b';   // Amber
        default: return '#3b82f6';            // Blue
    }
};

export const KnowledgeGraph = ({ items, onSelect }) => {
    const [hoveredNode, setHoveredNode] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Strictly controlled, clustered geometric layout (No chaotic physics D3 simulation)
    const { nodes, links } = useMemo(() => {
        // 1. Center Hub Node
        const hubNode = { id: 'hub', label: 'Impact', x: 50, y: 50, isHub: true, color: '#ffffff' };

        // 2. Group items by category to cluster them
        const groups = {};
        items.forEach(item => {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category].push(item);
        });

        const categoryKeys = Object.keys(groups);
        const radius = 35; // % distance from center
        const resultNodes = [hubNode];
        const resultLinks = [];

        categoryKeys.forEach((cat, catIndex) => {
            // Base angle for this category cluster (evenly spaced)
            const baseAngle = (catIndex / categoryKeys.length) * 2 * Math.PI;
            const catColor = getColorForCategory(cat);

            groups[cat].forEach((item, itemIndex) => {
                // Slight offset for items within the same cluster to create a tight group
                const maxOffset = 0.5; // radians spread limit
                const numItems = groups[cat].length;
                const angleOffset = numItems > 1
                    ? (itemIndex / (numItems - 1) - 0.5) * maxOffset
                    : 0;

                const finalAngle = baseAngle + angleOffset;

                // Randomize radius slightly for organic feel
                const rOffset = Math.sin(itemIndex * 45) * 8;
                const finalRadius = radius + rOffset;

                const x = 50 + Math.cos(finalAngle) * finalRadius;
                const y = 50 + Math.sin(finalAngle) * finalRadius;

                resultNodes.push({
                    ...item,
                    x,
                    y,
                    color: catColor
                });

                // Link back to hub
                resultLinks.push({
                    source: hubNode,
                    target: { id: item.id, x, y }, // Note: SVG lines use coordinates
                    color: catColor
                });
            });
        });

        return { nodes: resultNodes, links: resultLinks };
    }, [items]);

    // Handle Search Filtering
    const filteredNodes = useMemo(() => {
        if (!searchTerm) return nodes;
        return nodes.filter(n => n.isHub || n.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [nodes, searchTerm]);

    if (!items || items.length === 0) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center border border-border/50 rounded-3xl bg-secondary/10">
                <p className="text-muted-foreground font-medium">No nodes available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Premium Knowledge Graph Header Copy */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 px-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-black tracking-tight text-foreground">Explore as a knowledge map</h3>
                    <p className="text-sm text-foreground/80 font-medium max-w-xl leading-relaxed">
                        Clusters show how my work connects across mentorship, research, publications, and workshops.<br />
                        <span className="text-muted-foreground italic">Click any node to open the same detailed receipts drawer.</span>
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-secondary/30 border border-border/50 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-bold text-foreground transition-all shrink-0"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset view
                    </button>
                </div>
            </div>

            {/* The Graph Layout Area */}
            <div className="relative w-full h-[600px] md:h-[800px] rounded-3xl border border-border/50 bg-background overflow-hidden cursor-crosshair">
                {/* Dynamic Background Mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

                {/* SVG Canvas for Links */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    {links.map((link, i) => {
                        // Dim non-hovered and filtered out paths
                        const isSearchFaded = searchTerm && !filteredNodes.find(n => n.id === link.target.id);
                        const isHoverFaded = hoveredNode && hoveredNode !== 'hub' && hoveredNode !== link.target.id;
                        const isFaded = isHoverFaded || isSearchFaded;
                        const isHighlighted = hoveredNode === link.target.id;

                        return (
                            <line
                                key={i}
                                x1={`\${link.source.x}%`}
                                y1={`\${link.source.y}%`}
                                x2={`\${link.target.x}%`}
                                y2={`\${link.target.y}%`}
                                stroke={link.color}
                                strokeWidth={isHighlighted ? 2 : 1}
                                strokeOpacity={isFaded ? 0.05 : (isHighlighted ? 0.8 : 0.3)}
                                className="transition-all duration-700"
                                filter={isHighlighted ? "url(#glow-effect)" : ""}
                            />
                        );
                    })}
                </svg>

                {/* HTML DOM for Nodes */}
                {filteredNodes.map(node => {
                    const isHovered = hoveredNode === node.id;
                    const isFaded = hoveredNode && hoveredNode !== node.id && !node.isHub;

                    if (node.isHub) {
                        return (
                            <div
                                key={node.id}
                                className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full bg-card border-4 border-border flex flex-col items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.1)] z-10 transition-transform duration-700 hover:scale-110"
                                style={{ left: `\${node.x}%`, top: `\${node.y}%` }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                <span className="text-secondary-foreground font-black tracking-widest uppercase text-[10px]">Impact</span>
                                <div className="absolute inset-[-10px] border border-border/50 rounded-full animate-ping opacity-20" />
                            </div>
                        );
                    }

                    return (
                        <div
                            key={node.id}
                            className={`absolute z-20 transition-all duration-500 will-change-transform ease-out \${isFaded ? 'opacity-20 scale-90' : 'opacity-100 scale-100'}`}
                            style={{
                                left: `\${node.x}%`,
                                top: `\${node.y}%`,
                                transform: `translate(-50%, -50%) \${isHovered ? 'scale(1.2)' : 'scale(1)'}`
                            }}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            onClick={() => onSelect(node)}
                        >
                            {/* The Node Circle */}
                            <div
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border-2 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                                style={{
                                    borderColor: node.color,
                                    boxShadow: isHovered ? `0 0 30px \${node.color}60` : 'none'
                                }}
                            >
                                <div style={{ color: node.color }} className="transition-transform group-hover:scale-110">
                                    {getIconForCategory(node.category)}
                                </div>

                                {/* Pulsing halo */}
                                {isHovered && (
                                    <div
                                        className="absolute inset-[-6px] rounded-full border-2 animate-ping opacity-30 pointer-events-none"
                                        style={{ borderColor: node.color }}
                                    />
                                )}

                                {/* Tooltip Label */}
                                <div
                                    className={`absolute top-full mt-4 bg-background/90 backdrop-blur-md px-4 py-2 border rounded-xl shadow-xl pointer-events-none transition-all duration-300 w-max max-w-[200px] text-center \${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                                    style={{ borderColor: `\${node.color}50` }}
                                >
                                    <div className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: node.color }}>{node.category}</div>
                                    <div className="text-xs font-bold text-foreground leading-tight">{node.title}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
