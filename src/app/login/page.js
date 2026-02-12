"use client";

import { customerLogin } from '@/lib/actions';
import Link from 'next/link';
import LiveBackground from '@/components/LiveBackground';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg');
    const error = searchParams.get('error');

    return (
        <div className="glass-panel" style={{ padding: '50px', maxWidth: '450px', width: '100%', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)', border: '1px solid var(--primary)', position: 'relative', zIndex: 10 }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '2.5rem' }}>Login</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#888' }}>Access your personalized art gallery</p>

            {msg && (
                <div style={{ padding: '10px', backgroundColor: 'rgba(189,0,255,0.2)', color: 'var(--secondary)', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid var(--secondary)', fontWeight: 'bold' }}>
                    {msg}
                </div>
            )}

            {error && (
                <div style={{ padding: '10px', backgroundColor: 'rgba(255,0,0,0.1)', color: '#ff4444', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid #ff4444' }}>
                    Invalid credentials. Please try again.
                </div>
            )}

            <form action={customerLogin}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email Address</label>
                    <input type="email" name="email" required style={{ padding: '15px' }} placeholder="your@email.com" />
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Password</label>
                    <input type="password" name="password" required style={{ padding: '15px' }} placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>Enter Gallery</button>
            </form>

            <p style={{ marginTop: '30px', textAlign: 'center', color: '#ccc' }}>
                New to PILA ARTS? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Create Account</Link>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LiveBackground videoSrc="https://cdn.pixabay.com/video/2019/12/10/30132-379685165_large.mp4" />
            <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
