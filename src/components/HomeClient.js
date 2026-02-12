"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

export default function HomeClient({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts || []);
    const [scrollSection, setScrollSection] = useState(0);

    const bgImages = [
        "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1474511320723-9a5cf79ad132?auto=format&fit=crop&q=80&w=2000",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const windowHeight = window.innerHeight;
            const index = Math.min(Math.floor(scrollPos / (windowHeight * 0.7)), bgImages.length - 1);
            setScrollSection(index);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* Fail-safe Image Backgrounds */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -10,
                backgroundColor: '#000'
            }}>
                {bgImages.map((src, idx) => (
                    <img
                        key={src}
                        src={src}
                        alt="Theme Background"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 1s ease-in-out',
                            opacity: scrollSection === idx ? 1 : 0,
                            zIndex: scrollSection === idx ? 1 : 0
                        }}
                    />
                ))}

                {/* Constant Dark Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 2
                }}></div>
            </div>

            {/* Content Layers */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Hero Section */}
                <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                    <div style={{ maxWidth: '900px' }}>
                        <h1 style={{ fontSize: 'min(5rem, 12vw)', marginBottom: '20px', textShadow: '0 0 40px rgba(0,255,187,0.7)', color: 'white' }}>
                            PILA ARTS <br /><span style={{ color: 'var(--primary)', fontSize: '0.5em' }}>& GRAPHICS</span>
                        </h1>
                        <p style={{ fontSize: '1.6rem', marginBottom: '40px', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,1)' }}>
                            Exclusive Digital Collections.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/gallery" className="btn btn-primary" style={{ padding: '16px 45px' }}>Explore Art</Link>
                            <Link href="/about" className="btn btn-secondary" style={{ padding: '16px 45px' }}>Our Story</Link>
                        </div>
                    </div>
                </section>

                <div style={{ height: '20vh' }}></div>

                {/* Nature Section */}
                <section className="container" style={{ padding: '80px 30px', background: 'rgba(0,0,0,0.75)', borderRadius: '40px', margin: '40px auto', border: '1px solid rgba(0,255,187,0.3)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary)' }}>Nature's Breath</h2>
                    <div className="grid-gallery">
                        {products.filter(p => p.category === 'Nature').slice(0, 4).map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                        {products.filter(p => p.category === 'Nature').length === 0 && <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>More art coming soon...</p>}
                    </div>
                </section>

                <div style={{ height: '50vh' }}></div>

                {/* Animal Section */}
                <section className="container" style={{ padding: '80px 30px', background: 'rgba(0,0,0,0.75)', borderRadius: '40px', margin: '40px auto', border: '1px solid rgba(189,0,255,0.3)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center', fontWeight: 'bold', color: 'var(--secondary)' }}>Animal Soul</h2>
                    <div className="grid-gallery">
                        {products.filter(p => p.category === 'Animal').slice(0, 4).map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>

                <div style={{ height: '50vh' }}></div>

                {/* Locations Section */}
                <section className="container" style={{ padding: '80px 30px', background: 'rgba(0,0,0,0.75)', borderRadius: '40px', margin: '40px auto', border: '1px solid rgba(255,0,85,0.3)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '60px', textAlign: 'center', fontWeight: 'bold', color: 'var(--accent)' }}>Unique Locations</h2>
                    <div className="grid-gallery">
                        {products.filter(p => p.category === 'Locations').slice(0, 4).map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>

                <div style={{ height: '30vh' }}></div>
            </div>
        </div>
    );
}
