'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

const pillars = [
    {
        id: '01',
        title: 'Productividad',
        description: 'Maximizamos el valor de sus empleados eliminando labores manuales y redundantes, asegurando que su equipo se dedique exclusivamente a funciones de alto impacto.'
    },
    {
        id: '02',
        title: 'Integración',
        description: 'Unificamos tu stack tecnológico para que la información fluya sin interrupciones, centralizando el control de tu negocio y eliminando los cuellos de botella.'
    },
    {
        id: '03',
        title: 'IA Agéntica',
        description: 'Implementamos agentes de inteligencia artificial que razonan y ejecutan flujos de trabajo completos, capaces de tomar acciones autónomas para cumplir tus objetivos.'
    }
];

import Globe from './Globe';

// ... (existing pillars data)

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.introSection}>
                <motion.div
                    className={styles.imagePlaceholder}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Globe />
                </motion.div>

                <div className={styles.textContent}>
                    <motion.div
                        className={styles.introBlock}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className={styles.introTitle}>
                            El tiempo no se recupera, <span className={styles.highlight}>los ingresos sí</span>
                        </h3>
                        <p className={styles.introParagraph}>
                            En el ecosistema empresarial actual, la velocidad es una ventaja competitiva. La mayoría de los negocios están atrapados en tareas manuales, procesos fragmentados y embudos de ventas estancados, lo que impacta directamente en <span className={styles.highlight}>sus ingresos</span>.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.introBlock}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className={styles.introTitle}>
                            De la operatividad manual a la <span className={styles.highlight}>escalabilidad inteligente</span>
                        </h3>
                        <p className={styles.introParagraph}>
                            Nuestra premisa es clara: las empresas no deberian perder tiempo en tareas manuales y repetitivas. Por eso, en <span className={styles.brandHighlight}>oito</span> diseñamos sistemas inteligentes de automatización que actúan como el <span className={styles.highlight}>motor invisible</span> de tu crecimiento.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.introBlock}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className={styles.introTitle}>
                            Transformamos la complejidad técnica en <span className={styles.highlight}>simplicidad operativa</span>
                        </h3>
                        <p className={styles.introParagraph}>
                            Mientras <span className={styles.brandHighlight}>oito</span> trabaja en segundo plano, tú recuperas el recurso más valioso de tu negocio: <span className={styles.highlight}>el tiempo para innovar y escalar.</span>
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className={styles.infoArea}>
                <motion.h3
                    className={styles.infoTitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    ¿Por qué <span className={styles.brandHighlightLarge}>oito</span>?
                </motion.h3>

                <div className={styles.columnsContainer}>
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            className={styles.column}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <h4 className={styles.columnTitle}>{pillar.title}</h4>
                            <p className={styles.columnText}>{pillar.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
