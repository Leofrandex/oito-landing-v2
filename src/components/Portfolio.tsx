'use client';

import { Fragment, useRef } from 'react';
import { ParticleCard, GlobalSpotlight } from './MagicBento';
import {
    ChevronRight, TrendingUp, Clock, Target, ShieldCheck, Zap,
    Search, Brain, CalendarCheck, MessageCircleQuestion, Database, MessageCircleHeart,
    Upload, Sparkles, Share2, CreditCard, FileText, Bell, Users, Bot, UserCheck,
    ShoppingCart, BrainCircuit, Truck, UserPlus, FileSignature, Video,
    Layout, Eye, Mail, FileInput, CloudUpload, Star, PenTool, ThumbsUp
} from 'lucide-react';
import styles from './Portfolio.module.css';

// Type definition for a Case
interface Case {
    id: number;
    title: string;
    description: string;
    kpis: { label: string; value: string; icon: any }[];
    workflow: any[]; // Array of 3 icons
}

// Data for 9 Automation Cases
const cases: Case[] = [
    {
        id: 2,
        title: 'Calificador de Leads',
        description: 'Un bot califica prospectos por presupuesto y urgencia. Solo contactos ideales llegan a tu CRM.',
        kpis: [
            { label: 'Productividad ventas', value: '+50%', icon: Target },
            { label: 'Velocidad contacto', value: '3x', icon: Zap }
        ],
        workflow: [Users, Bot, UserCheck]
    },
    {
        id: 3,
        title: 'Soporte al Cliente',
        description: 'Agente inteligente que responde dudas humanamente y transfiere casos críticos a tu equipo con un resumen listo.',
        kpis: [
            { label: 'Tiempo de respuesta', value: '-60%', icon: Clock },
            { label: 'Casos resueltos', value: '45%', icon: Bot }
        ],
        workflow: [MessageCircleQuestion, Database, MessageCircleHeart]
    },
    {
        id: 4,
        title: 'Cobranza y Facturación',
        description: 'Genera y envía facturas al instante y envía recordatorios amigables de pago por WhatsApp automáticamente.',
        kpis: [
            { label: 'Errores facturación', value: '-95%', icon: ShieldCheck },
            { label: 'Mejora ciclo caja', value: '10 días', icon: TrendingUp }
        ],
        workflow: [CreditCard, FileText, Bell]
    },
    {
        id: 5,
        title: 'Inventario Inteligente',
        description: 'Monitorea tus ventas y envía un borrador de compra al proveedor antes de que el stock se agote.',
        kpis: [
            { label: 'Ventas perdidas', value: '-25%', icon: TrendingUp },
            { label: 'Revisión manual', value: '-80%', icon: Eye }
        ],
        workflow: [ShoppingCart, BrainCircuit, Truck]
    },
    {
        id: 6,
        title: 'Generación de Contenido',
        description: 'A partir de un video genéralo todo: subtítulos, hilos, resúmenes y programas en redes sociales en 1 clic.',
        kpis: [
            { label: 'Volumen', value: '+400%', icon: TrendingUp },
            { label: 'Ahorro mensual', value: '12 hrs', icon: PenTool }
        ],
        workflow: [Upload, Sparkles, Share2]
    },
    {
        id: 7,
        title: 'Documentos en Tiempo Récord',
        description: 'Genera documentos, envíalos para firma digital y archívalos automáticamente. Cero errores garantizados.',
        kpis: [
            { label: 'Tiempo de cierre', value: '-70%', icon: Zap },
            { label: 'Errores manuales', value: '0', icon: ShieldCheck }
        ],
        workflow: [FileInput, FileText, CloudUpload]
    },
    {
        id: 8,
        title: 'Radar de Proyectos',
        description: 'Analiza el progreso en tu gestor y envía resúmenes detectando cuellos de botella proactivamente.',
        kpis: [
            { label: 'Ahorro reportes', value: '5 hrs', icon: Clock },
            { label: 'Satisfacción', value: '+30%', icon: Star }
        ],
        workflow: [Layout, Eye, Mail]
    },
    {
        id: 9,
        title: 'Onboarding Empleados',
        description: 'Crea el correo, canales de comunicación y genera contratos para el nuevo talento en segundos.',
        kpis: [
            { label: 'Tiempo admin', value: '-90%', icon: Clock },
            { label: 'Cumplimiento', value: '100%', icon: ShieldCheck }
        ],
        workflow: [UserPlus, FileSignature, Video]
    },
    {
        id: 10,
        title: 'Gestión de Reseñas',
        description: 'Redacta respuestas personalizadas a reseñas y alerta si alguna es negativa para salvar al cliente.',
        kpis: [
            { label: 'Reseñas respondidas', value: '100%', icon: Clock },
            { label: 'Calificación', value: '+15%', icon: Star }
        ],
        workflow: [Star, PenTool, ThumbsUp]
    }
];

export default function Portfolio() {
    const gridRef = useRef<HTMLDivElement>(null);

    return (
        <section id="portfolio" className={`${styles.portfolio} bento-section`} ref={gridRef}>
            <GlobalSpotlight gridRef={gridRef} glowColor="9, 188, 138" />
            <div className={styles.contentContainer}>
                <div className={styles.bentoGrid}>
                    <ParticleCard
                        className={`${styles.bentoCard} ${styles.bentoCard0} magic-bento-card magic-bento-card--border-glow`}
                        glowColor="9, 188, 138"
                        particleCount={0}
                        style={{ '--glow-color': '9, 188, 138' } as any}
                    >
                        <div className={styles.introCard}>
                            <h2 className={styles.introTitle}>
                                Lo que <span className={styles.oitoBrand}>oito</span> puede hacer por ti
                            </h2>
                            <p className={styles.introDesc}>
                                Descubre cómo la IA transforma la eficiencia operativa de tu negocio. Desde <strong>agentes de soporte y calificador de leads</strong>, hasta <strong>generación de documentos y cobranza</strong>. Implementamos sistemas inteligentes a medida que se integran en tus herramientas actuales.
                            </p>
                            <div className={styles.introTags}>
                                <span className={styles.introTag}><Bot size={18} /> Agentes de Soporte</span>
                                <span className={styles.introTag}><Target size={18} /> Calificador de Leads</span>
                                <span className={styles.introTag}><FileInput size={18} /> Documentos en Tiempo Récord</span>
                                <span className={styles.introTag}><CreditCard size={18} /> Cobranza y Facturación</span>
                            </div>
                        </div>
                    </ParticleCard>

                    {cases.map((_case, i) => {
                        const index = i + 1;
                        const isSmallBox = [1, 2, 4, 6, 8, 9].includes(index);
                        const displayKpis = isSmallBox ? _case.kpis.slice(0, 1) : _case.kpis;

                        return (
                            <ParticleCard
                                key={_case.id}
                                className={`${styles.bentoCard} ${styles[`bentoCard${index}`]} magic-bento-card magic-bento-card--border-glow`}
                                glowColor="9, 188, 138"
                                particleCount={0}
                                style={{ '--glow-color': '9, 188, 138' } as any}
                            >
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.cardTitle}>{_case.title}</h3>
                                    <p className={styles.cardDescription}>{_case.description}</p>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.kpiColumn}>
                                        {displayKpis.map((kpi, idx) => (
                                            <div key={idx} className={styles.kpiItem}>
                                                <div className={styles.kpiIconWrapper}>
                                                    <kpi.icon size={20} className={styles.kpiIcon} />
                                                </div>
                                                <div className={styles.kpiContent}>
                                                    <span className={styles.kpiValue}>{kpi.value}</span>
                                                    <span className={styles.kpiLabel}>{kpi.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {!isSmallBox && (
                                        <div className={styles.workflowColumn}>
                                            {_case.workflow.map((Icon, idx) => (
                                                <Fragment key={idx}>
                                                    <div className={styles.workflowStep}>
                                                        <div className={styles.workflowIconBox}>
                                                            <Icon className={styles.workflowStepIcon} size={20} />
                                                        </div>
                                                    </div>
                                                    {idx < _case.workflow.length - 1 && (
                                                        <div className={styles.arrowWrapper}>
                                                            <ChevronRight size={16} className={styles.workflowArrow} />
                                                        </div>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ParticleCard>
                        );
                    })}
                </div>

                <div className={styles.footerText}>
                    Y muchos más...
                </div>
            </div>
        </section>
    );
}
