'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="hero" className={styles.hero}>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className={styles.headline}>
                    <span className={styles.oitoText}>oito</span>
                    <span className={styles.mainText}>LO HACE POR TI</span>
                </h1>
                <p className={styles.description}>
                    Diseñamos sistemas inteligentes de automatización para elevar la productividad de tu negocio
                </p>
                <button
                    type="button"
                    className={styles.ctaButton}
                    onClick={scrollToContact}
                >
                    oitomatiza ahora
                </button>
            </motion.div>
        </section>
    );
}
