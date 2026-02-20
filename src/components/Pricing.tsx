'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Pricing.module.css';
import WorkflowAnimation from './WorkflowAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const thermoRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const plusRef = useRef<HTMLSpanElement>(null);

    // Using a ref for price object so GSAP can Tween it
    const priceObj = useRef({ val: 100 });
    const [displayPrice, setDisplayPrice] = useState(100);
    const [scrollProgress, setScrollProgress] = useState(0);

    const isDragging = useRef(false);

    const handleMobileInteraction = (clientX: number) => {
        if (!trackRef.current || window.innerWidth >= 1024) return;

        const rect = trackRef.current.getBoundingClientRect();
        let progress = (clientX - rect.left) / rect.width;
        progress = Math.max(0, Math.min(1, progress));

        setScrollProgress(progress);

        // Update visuals
        // 1. Price (Power2.in approximation: t * t)
        const price = 100 + (1900 * progress * progress);
        setDisplayPrice(Math.round(price));

        // 2. Thermometer Bar
        if (thermoRef.current) {
            thermoRef.current.style.width = `${progress * 100}%`;
        }

        // 3. Plus Sign
        if (plusRef.current) {
            const opacity = progress > 0.8 ? (progress - 0.8) / 0.2 : 0;
            plusRef.current.style.opacity = opacity.toString();
        }
    };

    const onPointerDown = (e: React.PointerEvent) => {
        if (window.innerWidth >= 1024) return;
        isDragging.current = true;
        (e.target as Element).setPointerCapture(e.pointerId);
        handleMobileInteraction(e.clientX);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;
        handleMobileInteraction(e.clientX);
    };

    const onPointerUp = (e: React.PointerEvent) => {
        isDragging.current = false;
        (e.target as Element).releasePointerCapture(e.pointerId);
    };


    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Initial state for plus sign
        gsap.set(plusRef.current, { opacity: 0 });

        // Desktop
        mm.add("(min-width: 1024px)", () => {
            // Reset to vertical
            gsap.set(thermoRef.current, { height: "0%", width: "100%" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2250",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                    onUpdate: (self) => {
                        setScrollProgress(self.progress);
                    }
                }
            });

            // Animate Price
            tl.to(priceObj.current, {
                val: 2000,
                duration: 1,
                ease: "power2.in",
                onUpdate: () => {
                    setDisplayPrice(Math.round(priceObj.current.val));
                }
            });

            // Animate Thermometer along same timeline
            tl.to(thermoRef.current, {
                height: "100%",
                duration: 1,
                ease: "none"
            }, "<");

            // Animate Plus Sign appearing near the end
            tl.to(plusRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out"
            }, 0.8); // Starts at 80% of the timeline
        });

        // Mobile fallback
        mm.add("(max-width: 1023px)", () => {
            // Reset to horizontal & initial state because no ScrollTrigger controls it by default now
            gsap.set(thermoRef.current, { width: "0%", height: "100%" });
            // Ensure section is NOT pinned, so no ScrollTrigger config here for pinning
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="pricing" className={styles.pricingSection}>
            <div ref={contentRef} className={styles.stickyContainer}>

                <div className={styles.header}>
                    <h2 className={styles.title}>Nos ajustamos a las necesidades de <span className={styles.highlight}>tu proyecto</span></h2>
                    <p className={styles.subtitle}>
                        Desarrollamos una amplia variedad de sistemas, y la inversión de tu proyecto depende de su complejidad.
                        Con <span className={styles.brandHighlight}>oito</span> puedes aprovechar al máximo tu presupuesto.
                    </p>
                </div>

                <div className={styles.contentGrid}>
                    {/* Left Column: Animated Workflow Graph */}
                    <div className={styles.imageContainer}>
                        <WorkflowAnimation progress={scrollProgress} />
                    </div>

                    {/* Right Column: Price and Thermometer */}
                    <div className={styles.pricingControls}>
                        <div className={styles.priceDisplay}>
                            <div className={styles.currencyWrapper}>
                                <span ref={plusRef} className={styles.plusSign}>+</span>
                                <span className={styles.currency}>$</span>
                            </div>
                            {displayPrice}
                        </div>

                        <div className={styles.thermometerContainer}>
                            <div
                                ref={trackRef}
                                className={styles.thermometerWrapper}
                                onPointerDown={onPointerDown}
                                onPointerMove={onPointerMove}
                                onPointerUp={onPointerUp}
                                onPointerLeave={onPointerUp} // Good practice
                                style={{ touchAction: 'none' }} // Prevent scrolling while dragging
                            >
                                <div
                                    ref={thermoRef}
                                    className={styles.thermometerFill}
                                >
                                    <div className={styles.dragIndicator} />
                                </div>
                            </div>
                            <span className={styles.thermometerLabel}>Complejidad del proyecto</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
