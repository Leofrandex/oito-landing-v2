'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
    };

    return (
        <section id="contact" className={styles.contact}>
            <motion.div
                className={styles.headlineContainer}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className={styles.headline}>
                    <span className={styles.brandWord}>oitomatiza</span>
                    <br />
                    con nosotros
                </h2>
            </motion.div>

            <motion.div
                className={styles.formContainer}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Nombre completo</label>
                        <input type="text" id="name" className={styles.input} required placeholder="Tu nombre" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                        <input type="email" id="email" className={styles.input} required placeholder="nombre@empresa.com" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="phone" className={styles.label}>Teléfono</label>
                        <input type="tel" id="phone" className={styles.input} placeholder="+1 234 567 890" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="message" className={styles.label}>¿Qué tienes en mente?</label>
                        <textarea id="message" className={styles.textarea} required placeholder="Cuéntanos brevemente sobre tu proyecto o necesidades..."></textarea>
                    </div>

                    <button type="submit" className={styles.submitButton}>Enviar Solicitud</button>
                </form>
            </motion.div>
        </section>
    );
}
