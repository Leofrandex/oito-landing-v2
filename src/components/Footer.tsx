'use client';

import { Mail, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.col}>
                        <h2 className={styles.logo}>oito</h2>
                        <p className={styles.tagline}>
                            Transformamos negocios a través de la automatización inteligente.
                            Eficiencia y escalabilidad para tu futuro.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Explorar</h3>
                        <ul className={styles.list}>
                            <li><a href="#hero" className={styles.link}>Inicio</a></li>
                            <li><a href="#services" className={styles.link}>Servicios</a></li>
                            <li><a href="#portfolio" className={styles.link}>Portafolio</a></li>
                            <li><a href="#pricing" className={styles.link}>Planes</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Contacto</h3>
                        <ul className={styles.list}>
                            <li>
                                <a href="mailto:hola@oito.agency" className={styles.link}>
                                    hola@oito.agency
                                </a>
                            </li>
                            <li className={styles.contactItem}>Agendemos una llamada</li>
                            <li>
                                <a href="#contact" style={{ textDecoration: 'none' }}>
                                    <button className={styles.ctaButton}>
                                        Hablemos <ArrowRight size={16} />
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Síguenos</h3>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink} aria-label="Email"><Mail size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} <span className={styles.brandName}>oito</span>. Todos los derechos reservados.
                    </div>
                    {/* Optional: Legal links if needed in the future */}
                    {/* <div className={styles.legal}>
                        <a href="#" className={styles.legalLink}>Privacidad</a>
                        <a href="#" className={styles.legalLink}>Términos</a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
