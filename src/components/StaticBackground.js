"use client";

import { useEffect, useState } from "react";

export default function StaticBackground({ imageUrl, overlayOpacity = 0.7 }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // We use a simplified styling approach to maximize browser compatibility
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            backgroundColor: '#0a0a0a',
            pointerEvents: 'none'
        }}>
            {/* The Image - Using <img> tag for maximum compatibility */}
            <img
                src={imageUrl}
                alt="Background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            />

            {/* Solid Dark Overlay for Readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
                zIndex: 1
            }}></div>
        </div>
    );
}
