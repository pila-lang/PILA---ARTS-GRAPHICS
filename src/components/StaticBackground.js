"use client";

import { useEffect, useState } from "react";

export default function StaticBackground({ imageUrl, overlayOpacity = 0.6 }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -10, // Far back but in front of HTML/Body
            overflow: 'hidden',
            backgroundColor: '#0a0a0a',
            pointerEvents: 'none'
        }}>
            {/* Background Image Wrapper */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                    src={imageUrl}
                    alt="Background"
                    loading="eager"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                    onLoad={(e) => {
                        e.target.style.opacity = 1;
                    }}
                    onError={(e) => {
                        console.error("BG Load Error:", imageUrl);
                        e.target.style.display = 'none';
                    }}
                />

                {/* Dark Readable Overlay */}
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
        </div>
    );
}
