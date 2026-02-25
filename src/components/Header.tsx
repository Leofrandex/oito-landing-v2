'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header({ isLoaded = true }: { isLoaded?: boolean }) {
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
        <>
            <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" focusable="false">
                <defs>
                    <filter id="glass-distortion">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0" in="noise" result="coloredNoise" />
                        <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
            <header
                className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    pointerEvents: isLoaded ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease'
                }}
            >
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <Link href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>
                            <Image src="/oito_logo_2.png" alt="oito" width={75} height={35} className={styles.logoImage} priority />
                        </Link>
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
                            <Link href="#about" className={styles.navLink} onClick={(e) => scrollToSection(e, 'about')}>Descubre</Link>
                            <Link href="#portfolio" className={styles.navLink} onClick={(e) => scrollToSection(e, 'portfolio')}>Soluciones</Link>
                            <Link href="#how-we-work" className={styles.navLink} onClick={(e) => scrollToSection(e, 'how-we-work')}>Nuestro Proceso</Link>
                            <Link href="#pricing-calculator" className={styles.navLink} onClick={(e) => scrollToSection(e, 'pricing-calculator')}>ROI</Link>

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
        </>
    );
}
