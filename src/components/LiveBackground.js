"use client";

import { useEffect, useState } from "react";

export default function LiveBackground({ videoSrc, fallbackImage }) {
    const [isMounted, setIsMounted] = useState(false);
    const [videoError, setVideoError] = useState(false);

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
            zIndex: -999, // Absolute lowest layer
            overflow: 'hidden',
            backgroundColor: '#000',
            pointerEvents: 'none' // Ensure it doesn't block clicks
        }}>

            {/* 1. LAYER ONE: Animated CSS Nebula (Constant Fallback) */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0a 100%)',
                animation: 'nebula-move 20s infinite linear'
            }}>
                {/* Floating "Stars" / Particles using CSS */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(white 1px, transparent 0)',
                    backgroundSize: '100px 100px',
                    opacity: 0.1
                }}></div>
            </div>

            {/* 2. LAYER TWO: The Video */}
            {videoSrc && !videoError && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => setVideoError(true)}
                    onCanPlay={() => console.log("Video playing: " + videoSrc)}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'cover',
                        zIndex: 1,
                    }}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}

            {/* 3. LAYER THREE: Dark Overlay Blur */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                backdropFilter: 'blur(5px)'
            }}></div>
        </div>
    );
}
