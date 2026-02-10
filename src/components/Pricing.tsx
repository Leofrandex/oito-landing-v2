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

    // Using a ref for price object so GSAP can Tween it
    const priceObj = useRef({ val: 200 });
    const [displayPrice, setDisplayPrice] = useState(200);
    const [scrollProgress, setScrollProgress] = useState(0);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
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
        });

        // Mobile fallback
        mm.add("(max-width: 1023px)", () => {
            gsap.to(priceObj.current, {
                val: 2000,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                    onUpdate: (self) => {
                        setScrollProgress(self.progress);
                    }
                },
                onUpdate: () => setDisplayPrice(Math.round(priceObj.current.val))
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="pricing" className={styles.pricingSection}>
            <div ref={contentRef} className={styles.stickyContainer}>

                <div className={styles.header}>
                    <h2 className={styles.title}>Cotización: nos ajustamos a <span className={styles.highlight}>tus necesidades</span></h2>
                    <p className={styles.subtitle}>La inversión del proyecto depende de su complejidad</p>
                </div>

                <div className={styles.contentGrid}>
                    {/* Left Column: Animated Workflow Graph */}
                    <div className={styles.imageContainer}>
                        <WorkflowAnimation progress={scrollProgress} />
                    </div>

                    {/* Right Column: Price and Thermometer */}
                    <div className={styles.pricingControls}>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>$</span>
                            {displayPrice}
                        </div>

                        <div className={styles.thermometerContainer}>
                            <div className={styles.thermometerWrapper}>
                                <div
                                    ref={thermoRef}
                                    className={styles.thermometerFill}
                                    style={{ height: '0%' }}
                                />
                            </div>
                            <span className={styles.thermometerLabel}>Complejidad del proyecto</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
