'use client';

import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import {
    Mail, FileText, Database, CalendarCheck, Share2, MessageCircleHeart,
    Users, Bot, Sparkles, Bell, CreditCard, Upload, Eye, BrainCircuit
} from 'lucide-react';
import styles from './WorkflowAnimation.module.css';

interface WorkflowNode {
    id: string;
    icon: React.ComponentType<any>;
    x: number;
    y: number;
    threshold: number; // progress (0-1) at which this node appears
}

interface WorkflowEdge {
    from: string;
    to: string;
    threshold: number;
}

// Node size
const NODE_SIZE = 60;
const ICON_SIZE = 28;

// Define all nodes with their positions (in SVG viewBox coordinates 900x440)
// The graph flows left to right, branching as it goes
const nodes: WorkflowNode[] = [
    // === Tier 1: Starting nodes (progress 0–0.10) ===
    { id: 'mail', icon: Mail, x: 70, y: 220, threshold: 0.0 },
    { id: 'file', icon: FileText, x: 185, y: 220, threshold: 0.08 },

    // === Tier 2: Linear growth (progress 0.15–0.30) ===
    { id: 'database', icon: Database, x: 300, y: 220, threshold: 0.18 },
    { id: 'calendar', icon: CalendarCheck, x: 415, y: 220, threshold: 0.28 },

    // === Tier 3: First branch (progress 0.35–0.50) ===
    { id: 'share', icon: Share2, x: 540, y: 120, threshold: 0.38 },
    { id: 'bot', icon: Bot, x: 540, y: 220, threshold: 0.42 },
    { id: 'users', icon: Users, x: 540, y: 320, threshold: 0.46 },

    // === Tier 4: Branches grow (progress 0.55–0.70) ===
    { id: 'sparkles', icon: Sparkles, x: 660, y: 70, threshold: 0.55 },
    { id: 'message', icon: MessageCircleHeart, x: 660, y: 170, threshold: 0.60 },
    { id: 'credit', icon: CreditCard, x: 660, y: 270, threshold: 0.65 },
    { id: 'bell', icon: Bell, x: 660, y: 370, threshold: 0.70 },

    // === Tier 5: Full complexity (progress 0.75–0.95) ===
    { id: 'upload', icon: Upload, x: 790, y: 70, threshold: 0.78 },
    { id: 'eye', icon: Eye, x: 790, y: 170, threshold: 0.84 },
    { id: 'brain', icon: BrainCircuit, x: 790, y: 370, threshold: 0.92 },
];

// Define edges (connections between nodes)
// Each edge draws from the 'from' node threshold to the 'to' node threshold
const edges: WorkflowEdge[] = [
    // Linear chain
    { from: 'mail', to: 'file', threshold: 0.08 },
    { from: 'file', to: 'database', threshold: 0.18 },
    { from: 'database', to: 'calendar', threshold: 0.28 },

    // First branch split from calendar
    { from: 'calendar', to: 'share', threshold: 0.38 },
    { from: 'calendar', to: 'bot', threshold: 0.42 },
    { from: 'calendar', to: 'users', threshold: 0.46 },

    // Upper branch
    { from: 'share', to: 'sparkles', threshold: 0.55 },
    { from: 'share', to: 'message', threshold: 0.60 },

    // Middle branch
    { from: 'bot', to: 'credit', threshold: 0.65 },

    // Lower branch
    { from: 'users', to: 'bell', threshold: 0.70 },

    // Final tier connections
    { from: 'sparkles', to: 'upload', threshold: 0.78 },
    { from: 'message', to: 'eye', threshold: 0.84 },
    { from: 'bell', to: 'brain', threshold: 0.92 },
];

// Build a lookup map for quick node access
const nodeMap = new Map(nodes.map(n => [n.id, n]));

// Helper: compute the SVG path 'd' for an edge
function getEdgePath(edge: WorkflowEdge): string {
    const fromNode = nodeMap.get(edge.from)!;
    const toNode = nodeMap.get(edge.to)!;
    const x1 = fromNode.x + NODE_SIZE / 2;
    const y1 = fromNode.y;
    const x2 = toNode.x - NODE_SIZE / 2;
    const y2 = toNode.y;
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

// Helper: get the draw progress of an edge (0 = hidden, 1 = fully drawn)
function getEdgeDrawProgress(edge: WorkflowEdge, progress: number): number {
    const fromNode = nodeMap.get(edge.from)!;
    const toNode = nodeMap.get(edge.to)!;
    const drawStart = fromNode.threshold; // line starts drawing when source node appears
    const drawEnd = toNode.threshold;     // line finishes when target node appears
    if (progress <= drawStart) return 0;
    if (progress >= drawEnd) return 1;
    return (progress - drawStart) / (drawEnd - drawStart);
}

interface Props {
    progress: number; // 0 to 1
}

export default function WorkflowAnimation({ progress }: Props) {
    const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());

    // Store ref for each edge path element
    const setPathRef = useCallback((key: string, el: SVGPathElement | null) => {
        if (el) {
            pathRefs.current.set(key, el);
        }
    }, []);

    // Update stroke-dashoffset on every progress change for fluid drawing
    useEffect(() => {
        edges.forEach((edge) => {
            const key = `${edge.from}-${edge.to}`;
            const pathEl = pathRefs.current.get(key);
            if (!pathEl) return;

            const totalLength = pathEl.getTotalLength();
            const drawProgress = getEdgeDrawProgress(edge, progress);

            pathEl.style.strokeDasharray = `${totalLength}`;
            pathEl.style.strokeDashoffset = `${totalLength * (1 - drawProgress)}`;
            pathEl.style.opacity = drawProgress > 0 ? '1' : '0';
        });
    }, [progress]);

    return (
        <div className={styles.container}>
            <svg
                className={styles.canvas}
                viewBox="0 0 900 440"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Render all edges with fluid draw effect */}
                {edges.map((edge) => {
                    const key = `${edge.from}-${edge.to}`;
                    const d = getEdgePath(edge);

                    return (
                        <path
                            key={key}
                            ref={(el) => setPathRef(key, el)}
                            d={d}
                            className={styles.connectionLine}
                        />
                    );
                })}

                {/* Render all nodes */}
                {nodes.map((node) => {
                    const isVisible = progress >= node.threshold;
                    const Icon = node.icon;
                    const halfSize = NODE_SIZE / 2;

                    return (
                        <g
                            key={node.id}
                            className={`${styles.nodeGroup} ${styles.nodeEnter} ${isVisible ? styles.nodeVisible : ''}`}
                            style={{
                                transformOrigin: `${node.x}px ${node.y}px`,
                                transitionDelay: `${(node.threshold * 100) % 200}ms`
                            }}
                        >
                            {/* Glow ring */}
                            <rect
                                className={styles.glowRing}
                                x={node.x - halfSize - 4}
                                y={node.y - halfSize - 4}
                                width={NODE_SIZE + 8}
                                height={NODE_SIZE + 8}
                                rx={22}
                                ry={22}
                            />

                            {/* Node box */}
                            <rect
                                className={styles.nodeBox}
                                x={node.x - halfSize}
                                y={node.y - halfSize}
                                width={NODE_SIZE}
                                height={NODE_SIZE}
                                rx={18}
                                ry={18}
                            />

                            {/* Icon via foreignObject */}
                            <foreignObject
                                x={node.x - halfSize}
                                y={node.y - halfSize}
                                width={NODE_SIZE}
                                height={NODE_SIZE}
                            >
                                <div className={styles.iconWrapper}>
                                    <Icon size={ICON_SIZE} color="#fff" />
                                </div>
                            </foreignObject>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
