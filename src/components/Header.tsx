'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
        e.preventDefault();
        closeMenu();
        const element = document.getElementById(id);
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
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>oito</Link>
                </div>

                <button
                    className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>

                <div className={`${styles.navWrapper} ${isOpen ? styles.open : ''}`}>
                    <nav className={styles.nav}>
                        <Link href="#about" className={styles.navLink} onClick={(e) => scrollToSection(e, 'about')}>Acerca de</Link>
                        <Link href="#portfolio" className={styles.navLink} onClick={(e) => scrollToSection(e, 'portfolio')}>Trabajos</Link>
                        <Link href="#how-we-work" className={styles.navLink} onClick={(e) => scrollToSection(e, 'how-we-work')}>¿Cómo trabajamos?</Link>
                        <Link href="#pricing" className={styles.navLink} onClick={(e) => scrollToSection(e, 'pricing')}>Cotizaciones</Link>

                        <button
                            type="button"
                            className={styles.mobileCta}
                            onClick={(e) => scrollToSection(e, 'contact')}
                        >
                            oitomatiza
                        </button>
                    </nav>
                </div>

                <button
                    type="button"
                    className={styles.desktopCta}
                    onClick={(e) => scrollToSection(e, 'contact')}
                >
                    oitomatiza
                </button>
            </div>
        </header>
    );
}
