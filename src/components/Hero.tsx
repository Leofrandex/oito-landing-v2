'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const oitoTextRef = useRef<HTMLSpanElement>(null);
    const mainTextRef = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaButtonRef = useRef<HTMLButtonElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

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

    useGSAP(() => {
        // Initial animation for Headline (Load only, not scroll-driven)
        const headlineTl = gsap.timeline();
        headlineTl.fromTo([oitoTextRef.current, mainTextRef.current],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
        );

        // Scroll-driven animation for Description, CTA, and Progress
        // Paused initially, controlled by ScrollTrigger
        const tl = gsap.timeline({ paused: true });

        const mm = gsap.matchMedia();

        // Desktop Pinning (Longer duration)
        mm.add("(min-width: 1024px)", () => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=250%",
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    if (self.progress > tl.progress()) {
                        gsap.to(tl, {
                            progress: self.progress,
                            duration: 0.5,
                            ease: "power1.out",
                            overwrite: true
                        });
                    }
                }
            });
        });

        // Mobile Pinning (Shorter duration)
        mm.add("(max-width: 1023px)", () => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=120%", // Reduced scroll distance for mobile
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    if (self.progress > tl.progress()) {
                        gsap.to(tl, {
                            progress: self.progress,
                            duration: 0.5,
                            ease: "power1.out",
                            overwrite: true
                        });
                    }
                }
            });
        });

        // Set initial states for scroll elements
        gsap.set([descriptionRef.current, ctaButtonRef.current], {
            opacity: 0,
            y: 50
        });

        gsap.set(scrollIndicatorRef.current, { opacity: 1 });
        gsap.set(progressBarRef.current, { height: '0%' });

        // Animation sequence (Only Description and CTA now)
        tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 1 })
            .to(ctaButtonRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
            // Fill progress bar
            .to(progressBarRef.current, { height: '100%', duration: 2.5, ease: "none" }, 0)
            // Fade out indicator
            .to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 }, 1.9)
            // Pause
            .to({}, { duration: 0.5 });

    }, { scope: sectionRef });

    return (
        <section id="hero" className={styles.hero} ref={sectionRef}>
            <div className={styles.content} ref={contentRef}>
                <h1 className={styles.headline}>
                    <span className={styles.oitoText} ref={oitoTextRef}>oito</span>
                    <span className={styles.mainText} ref={mainTextRef}>LO HACE POR TI</span>
                </h1>
                <p className={styles.description} ref={descriptionRef}>
                    Diseñamos sistemas inteligentes de automatización para elevar la productividad de tu negocio
                </p>
                <button
                    type="button"
                    className={styles.ctaButton}
                    onClick={scrollToContact}
                    ref={ctaButtonRef}
                >
                    oitomatiza
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator} ref={scrollIndicatorRef}>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} ref={progressBarRef}></div>
                </div>
                <span className={styles.scrollText}>scroll</span>
                <ChevronDown className={styles.scrollArrow} size={18} strokeWidth={1.5} />
            </div>
        </section>
    );
}
