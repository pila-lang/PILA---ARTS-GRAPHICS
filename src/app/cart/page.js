"use client";

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StaticBackground from '@/components/StaticBackground';

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const hasSession = document.cookie.includes('pila_customer_session') || document.cookie.includes('pila_session');
            setIsLoggedIn(hasSession);
        };
        checkAuth();
    }, []);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!isLoggedIn) {
            router.push('/login?redirect=/cart&msg=Please login to purchase');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const itemsList = cart.map(i => `${i.title} (x${i.quantity})`).join(', ');
            const message = `Hello PILA ARTS, I would like to order: ${itemsList}. Total: Rs. ${total}`;
            const whatsappUrl = `https://wa.me/94788339243?text=${encodeURIComponent(message)}`;

            clearCart();
            window.open(whatsappUrl, '_blank');
            setLoading(false);
            router.push('/gallery');
        }, 1200);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Stable Shopping Background */}
            <StaticBackground imageUrl="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000" />

            <div className="container" style={{ padding: '40px 0', position: 'relative', zIndex: 10 }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '40px', textAlign: 'center', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Your Bag</h1>

                {cart.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', background: 'rgba(0,0,0,0.6)' }}>
                        <h2 style={{ marginBottom: '20px' }}>Your Cart is Empty</h2>
                        <button onClick={() => router.push('/gallery')} className="btn btn-primary">Go to Gallery</button>
                    </div>
                ) : (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {cart.map((item) => (
                            <div key={item.id} className="glass-panel" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '25px',
                                marginBottom: '20px',
                                background: 'rgba(0,0,0,0.6)',
                                border: '1px solid rgba(0,255,187,0.2)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <img src={item.imageUrl || '/images/hero-art.jpg'} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px' }} />
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{item.title}</h3>
                                        <p style={{ color: 'var(--primary)', fontWeight: '600' }}>Rs. {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="glass-panel" style={{ marginTop: '40px', padding: '40px', textAlign: 'center', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--primary)' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Total: Rs. {total.toLocaleString()}</h2>
                            <p style={{ marginBottom: '30px', color: '#aaa' }}>Secure checkout via WhatsApp messaging.</p>

                            {!isLoggedIn && (
                                <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(189,0,255,0.1)', borderRadius: '10px', border: '1px solid var(--secondary)' }}>
                                    <p style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>⚠️ Login required for checkout</p>
                                </div>
                            )}

                            <button
                                onClick={handleCheckout}
                                className="btn btn-primary"
                                disabled={loading}
                                style={{ padding: '18px 60px', fontSize: '1.3rem', width: '100%' }}
                            >
                                {loading ? 'Opening...' : (isLoggedIn ? 'Buy Now via WhatsApp' : 'Login to Purchase')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
