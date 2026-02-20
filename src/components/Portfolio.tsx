'use client';

import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, TrendingUp, Clock, Target, ShieldCheck, Zap,
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

// Data for 10 Automation Cases
const cases: Case[] = [
    {
        id: 1,
        title: 'Elaboración de documentos en Tiempo Récord',
        description: 'Rellena un formulario simple con los datos del cliente y el sistema genera un documento personalizado a partir de una plantilla, lo envía para firma digital y lo archiva automáticamente en la nube. Olvídate de perseguir firmas y de errores de "copiar y pegar".',
        kpis: [
            { label: 'Tiempo de cierre', value: '-70%', icon: Zap },
            { label: 'Errores manuales', value: '0', icon: ShieldCheck }
        ],
        workflow: [FileInput, FileText, CloudUpload]
    },
    {
        id: 2,
        title: 'Calificador de Leads',
        description: 'Cuando alguien pregunta por tus servicios en Facebook Ads, un bot califica al usuario preguntando su presupuesto y urgencia. Solo los contactos que cumplen con tus requisitos llegan a tu CRM, ahorrándole a tu equipo ventas llamadas innecesarias.',
        kpis: [
            { label: 'Productividad ventas', value: '+50%', icon: Target },
            { label: 'Velocidad contacto', value: '3x', icon: Zap }
        ],
        workflow: [Users, Bot, UserCheck]
    },
    {
        id: 3,
        title: 'Soporte al Cliente con "ADN" de tu Marca',
        description: 'Un agente inteligente recibe las dudas por WhatsApp, consulta tu base de conocimientos y responde de forma humana y precisa. Si el caso es crítico, lo transfiere a un humano con un resumen de la situación ya listo.',
        kpis: [
            { label: 'Tiempo de respuesta', value: '-60%', icon: Clock },
            { label: 'Casos resueltos', value: '45%', icon: Bot }
        ],
        workflow: [MessageCircleQuestion, Database, MessageCircleHeart]
    },
    {
        id: 4,
        title: 'Cobranza Automática y Cero Papaleo',
        description: 'Sincroniza tus pagos recibidos con tu software contable para generar y enviar facturas al instante. Si un pago se atrasa, el sistema envía recordatorios amigables por WhatsApp y solo te avisa si el cliente no responde tras tres intentos.',
        kpis: [
            { label: 'Errores facturación', value: '-95%', icon: ShieldCheck },
            { label: 'mejora en el ciclo de caja', value: '10 días', icon: TrendingUp }
        ],
        workflow: [CreditCard, FileText, Bell]
    },
    {
        id: 5,
        title: 'Inventario Inteligente',
        description: 'Monitorea tus ventas en tiempo real y predice cuándo te quedarás sin stock basándose en el ritmo de compra. Genera automáticamente un borrador de orden de compra para tu proveedor antes de que el producto se agote.',
        kpis: [
            { label: 'Ventas perdidas', value: '-25%', icon: TrendingUp },
            { label: 'Revisión manual', value: '-80%', icon: Eye }
        ],
        workflow: [ShoppingCart, BrainCircuit, Truck]
    },
    {
        id: 6,
        title: 'Generacion de contenido para redes sociales',
        description: 'Al subir un video o audio a una carpeta, la automatización genera subtítulos, extrae las 3 mejores frases para X, crea un resumen para LinkedIn y programa todo en tus redes sociales. Mantén tu marca activa en todos los canales con un solo clic.',
        kpis: [
            { label: 'volumen de contenido', value: '+400%', icon: TrendingUp },
            { label: 'ahorradas en creacion de contenido al mes', value: '12 horas', icon: PenTool }
        ],
        workflow: [Upload, Sparkles, Share2]
    },
    {
        id: 7,
        title: 'Prospección Inteligente 24/7',
        description: 'Captura leads de cualquier fuente, investiga automáticamente el perfil de la empresa con IA y redacta un correo de contacto personalizado. El sistema clasifica el interés del prospecto y agenda la cita en tu calendario sin que muevas un dedo.',
        kpis: [
            { label: 'ahorradas en investigacion al mes', value: '15 horas', icon: Clock },
            { label: 'Tasa de respuesta', value: '+35%', icon: MessageCircleQuestion }
        ],
        workflow: [Search, Brain, CalendarCheck]
    },
    {
        id: 8,
        title: 'Radar de Proyectos',
        description: 'La IA analiza el progreso de las tareas en tu gestor de proyectos y envía un resumen ejecutivo a tus clientes cada viernes por email. Detecta cuellos de botella y te avisa proactivamente si una fecha de entrega está en riesgo.',
        kpis: [
            { label: 'ahorradas en reportes al mes', value: '5 horas', icon: Clock },
            { label: 'satisfaccion al cliente', value: '+30%', icon: Star }
        ],
        workflow: [Layout, Eye, Mail]
    },
    {
        id: 9,
        title: 'Onboarding de Empleados en Segundos',
        description: 'Al contratar nuevo talento, el sistema crea automáticamente su correo, lo añade a los canales de comunicacion, genera su contrato digital para firma y le envía un video de bienvenida. Una experiencia profesional que elimina el caos administrativo del primer día.',
        kpis: [
            { label: 'tiempo administrativo', value: '-90%', icon: Clock },
            { label: 'Cumplimiento día 1', value: '100%', icon: ShieldCheck }
        ],
        workflow: [UserPlus, FileSignature, Video]
    },
    {
        id: 10,
        title: 'Gestión de Reseñas Proactiva',
        description: 'Cada vez que recibes una opinión en Google Maps o redes sociales, la IA redacta una respuesta personalizada agradeciendo o resolviendo dudas. Si la reseña es negativa, alerta inmediatamente al gerente para salvar la relación con el cliente.',
        kpis: [
            { label: 'Reseñas respondidas', value: '100%', icon: Clock },
            { label: 'mejora de la calificacion', value: '+15%', icon: Star }
        ],
        workflow: [Star, PenTool, ThumbsUp]
    }
];

export default function Portfolio() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % cases.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
    };

    // Auto-slide effect handled via CSS animation end event on progress bar to prevent desync

    // Variants for animations
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section id="portfolio" className={styles.portfolio}>
            <div className={styles.contentContainer}>

                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Conoce algunos casos</h2>
                    <p className={styles.sectionDescription}>
                        Descubre cómo la IA puede transformar los procesos operativos de tu negocio.
                    </p>
                </div>

                <div
                    className={styles.carouselWrapper}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Buttons */}
                    <button onClick={handlePrev} className={`${styles.navButton} ${styles.prevBtn}`}>
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={handleNext} className={`${styles.navButton} ${styles.nextBtn}`}>
                        <ChevronRight size={32} />
                    </button>

                    <div className={styles.progressBarContainer}>
                        <div
                            key={currentIndex}
                            className={`${styles.progressBarFill} ${isPaused ? styles.progressBarPaused : ''}`}
                            style={{
                                animationPlayState: isPaused ? 'paused' : 'running'
                            }}
                            onAnimationEnd={handleNext}
                        />
                    </div>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className={styles.slideWrapper}
                        >
                            {/* Main Card Content */}
                            <div className={styles.cardContainer}>
                                {/* Header: Title & Description */}
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.cardTitle}>{cases[currentIndex].title}</h3>
                                    <p className={styles.cardDescription}>{cases[currentIndex].description}</p>
                                </div>

                                {/* Body: KPIs & Workflow */}
                                <div className={styles.cardBody}>
                                    {/* Left: KPIs (1/3) */}
                                    <div className={styles.kpiColumn}>
                                        {cases[currentIndex].kpis.map((kpi, index) => (
                                            <div key={index} className={styles.kpiItem}>
                                                <div className={styles.kpiIconWrapper}>
                                                    <kpi.icon size={28} className={styles.kpiIcon} />
                                                </div>
                                                <div className={styles.kpiContent}>
                                                    <span className={styles.kpiValue}>{kpi.value}</span>
                                                    <span className={styles.kpiLabel}>{kpi.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right: Workflow (2/3) */}
                                    <div className={styles.workflowColumn}>
                                        {cases[currentIndex].workflow.map((Icon, index) => (
                                            <Fragment key={index}>
                                                <div className={styles.workflowStep}>
                                                    <div className={styles.workflowIconBox}>
                                                        <Icon className={styles.workflowStepIcon} />
                                                    </div>
                                                </div>
                                                {/* Add Arrow if not the last item */}
                                                {index < cases[currentIndex].workflow.length - 1 && (
                                                    <div className={styles.arrowWrapper}>
                                                        <ChevronRight size={32} className={styles.workflowArrow} />
                                                    </div>
                                                )}
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Indicators */}
                <div className={styles.indicators}>
                    {cases.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`${styles.orb} ${index === currentIndex ? styles.orbActive : styles.orbInactive}`}
                        />
                    ))}
                </div>

                <div className={styles.footerText}>
                    Y mucho más...
                </div>

            </div>
        </section>
    );
}
