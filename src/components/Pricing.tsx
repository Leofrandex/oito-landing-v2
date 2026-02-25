'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Pricing.module.css';
import { ChevronRight, Hourglass, TrendingUp, DollarSign } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Pricing() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const calculatorRef = useRef<HTMLDivElement>(null);

    const [teamSize, setTeamSize] = useState(5);
    const [hoursPerPerson, setHoursPerPerson] = useState(8);

    const totalHours = teamSize * hoursPerPerson;
    const moneyLostYear = totalHours * 52 * 8;
    // Asumimos un costo de implementación base de referência para calcular ROI real
    const estimatedOitoCost = 2500 + (teamSize * 100);
    const roi = Math.max(0, Math.round(((moneyLostYear - estimatedOitoCost) / estimatedOitoCost) * 100));

    useGSAP(() => {
        // Entrance animation for the glass panel
        gsap.from(calculatorRef.current, {
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 70%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, { scope: wrapperRef });

    return (
        <div ref={wrapperRef} className={styles.pricingWrapper}>
            <section id="pricing-calculator" className={styles.calculatorSection}>
                <div className={styles.stickyContainer}>

                    <div className={styles.header}>
                        <h2 className={styles.title}>Calcula el costo real de <span className={styles.highlight}>no automatizar</span></h2>
                        <p className={styles.subtitle}>
                            El tiempo no perdona. Analiza cuánto pierde tu equipo en tareas repetitivas
                            y el impacto económico real de implementar <span className={styles.brandHighlight}>oito</span>.
                        </p>
                    </div>

                    <div className={styles.calculatorCenter}>
                        <div ref={calculatorRef} className={styles.calculatorGlass}>
                            <div className={styles.slidersContainer}>
                                <div className={styles.sliderGroup}>
                                    <div className={styles.sliderHeader}>
                                        <label>Tamaño de tu equipo</label>
                                        <span className={styles.sliderValue}>{teamSize} {teamSize === 1 ? 'persona' : 'personas'}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={teamSize}
                                        onChange={(e) => setTeamSize(Number(e.target.value))}
                                        className={styles.slider}
                                        style={{ background: `linear-gradient(to right, var(--color-accent) ${((teamSize - 1) / 49) * 100}%, rgba(255,255,255,0.1) ${((teamSize - 1) / 49) * 100}%)` }}
                                    />
                                </div>
                                <div className={styles.sliderGroup}>
                                    <div className={styles.sliderHeader}>
                                        <label>Horas de labores manuales a la semana p/p</label>
                                        <span className={styles.sliderValue}>{hoursPerPerson} hrs</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="40"
                                        value={hoursPerPerson}
                                        onChange={(e) => setHoursPerPerson(Number(e.target.value))}
                                        className={styles.slider}
                                        style={{ background: `linear-gradient(to right, var(--color-accent) ${((hoursPerPerson - 1) / 39) * 100}%, rgba(255,255,255,0.1) ${((hoursPerPerson - 1) / 39) * 100}%)` }}
                                    />
                                </div>
                            </div>

                            <div className={styles.resultsContainer}>
                                <div className={styles.statBox}>
                                    <div className={styles.statIconWrapper}>
                                        <Hourglass size={24} className={styles.iconBad} />
                                    </div>
                                    <span className={styles.statLabel}>Horas/semana perdidas</span>
                                    <div className={styles.statValueBad}>{totalHours}h</div>
                                    <span className={styles.statSub}>Antes de <span className={styles.brandHighlight}>oito</span></span>
                                </div>

                                <div className={styles.statBox}>
                                    <div className={styles.statIconWrapper}>
                                        <DollarSign size={24} className={styles.iconBad} />
                                    </div>
                                    <span className={styles.statLabel}>Costo invisible anual</span>
                                    <div className={styles.statValueBad}>${moneyLostYear.toLocaleString('en-US')}</div>
                                    <span className={styles.statSub}>*Calculado a $8/hr</span>
                                </div>

                                <div className={styles.statBoxGood}>
                                    <div className={styles.statIconWrapperGood}>
                                        <TrendingUp size={28} className={styles.iconGood} />
                                    </div>
                                    <span className={styles.statLabel}>ROI estimado con <span className={styles.brandHighlight}>oito</span></span>
                                    <div className={styles.statValueGood}>+{roi}%</div>
                                    <span className={styles.statSubGood}>
                                        Retorno de inversión el 1er año
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.ctaContainer}>
                            <p className={styles.ctaText}>
                                La inversión de tu proyecto depende de su complejidad. Con <span className={styles.brandHighlight}>oito</span> puedes aprovechar al máximo tu presupuesto.
                            </p>
                            <a href="#contact" className={styles.ctaButton}>
                                Cotiza tu proyecto con nosotros
                                <ChevronRight size={20} className={styles.ctaIcon} />
                            </a>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
