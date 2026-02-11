'use client';

import React, { useState } from 'react';
import styles from './HowWeWork.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: "Contacto & Auditoría",
        left: {
            description: "Sesión estratégica de 30 minutos para alinear objetivos y recolectar información clave para el éxito del proyecto."
        },
        right: {
            description: "Análisis profundo de procesos actuales para identificar oportunidades de optimización y definir metas claras."
        }
    },
    {
        id: 2,
        title: "Desarrollo & Implementación",
        left: {
            description: "Creación de soluciones a medida utilizando las últimas tecnologías para asegurar escalabilidad y rendimiento."
        },
        right: {
            description: "Despliegue ágil y estructurado del proyecto, asegurando una integración fluida con tus operaciones existentes."
        }
    },
    {
        id: 3,
        title: "Monitoreo & Mejora",
        left: {
            description: "Pruebas exhaustivas en entorno real y evaluación continua de métricas clave de rendimiento."
        },
        right: {
            description: "Iteración constante del sistema basada en análisis de datos para maximizar resultados y eficiencia."
        }
    }
];

const HowWeWork: React.FC = () => {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    return (
        <section id="how-we-work" className={styles.howWeWork}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Metodología <span className={styles.brandHighlight}>oito</span>: el camino para un sistema inteligente exitoso para tu negocio</h2>
                <div className={styles.stepsContainer}>
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={styles.stepRow}
                            onMouseEnter={() => setHoveredStep(step.id)}
                            onMouseLeave={() => setHoveredStep(null)}
                        >
                            <div className={styles.leftCol}>
                                <AnimatePresence>
                                    {hoveredStep === step.id && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <p className={styles.description}>{step.left.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className={styles.centerCol}>
                                <motion.h3
                                    className={styles.stepTitle}
                                    animate={{
                                        fontSize: hoveredStep === step.id ? "1.5rem" : "2.5rem",
                                    }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                >
                                    {step.title}
                                </motion.h3>
                            </div>

                            <div className={styles.rightCol}>
                                <AnimatePresence>
                                    {hoveredStep === step.id && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <p className={styles.description}>{step.right.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowWeWork;
