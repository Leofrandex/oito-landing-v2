'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    // Use refs to persist progress across React 18 Strict Mode double-mounts
    const progressRef = useRef(0);
    const isCompletedRef = useRef(false);

    useEffect(() => {
        if (isCompletedRef.current) return;

        const duration = 1200; // total loading time ms
        const interval = 20;
        const steps = duration / interval;

        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        const timer = setInterval(() => {
            if (isCompletedRef.current) {
                clearInterval(timer);
                return;
            }

            progressRef.current += (100 / steps);

            if (progressRef.current >= 100) {
                isCompletedRef.current = true;
                setProgress(100);
                clearInterval(timer);

                // start fade out
                setIsFadingOut(true);
                setTimeout(() => {
                    document.body.style.overflow = '';
                    onComplete();
                }, 400); // match css transition duration
            } else {
                setProgress(progressRef.current);
            }
        }, interval);

        return () => {
            clearInterval(timer);
            if (!isCompletedRef.current) {
                document.body.style.overflow = '';
            }
        };
    }, [onComplete]);

    return (
        <div className={`${styles.loadingScreen} ${isFadingOut ? styles.fadeOut : ''}`}>
            <div className={styles.content}>
                <Image src="/oito_logo_2.png" alt="oito" width={180} height={80} className={styles.logo} priority />
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
}
