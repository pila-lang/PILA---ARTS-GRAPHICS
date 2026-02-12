"use client";

import { customerSignup } from '@/lib/actions';
import Link from 'next/link';
import LiveBackground from '@/components/LiveBackground';

export default function SignupPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LiveBackground videoSrc="https://cdn.pixabay.com/video/2019/12/10/30132-379685165_large.mp4" />

            <div className="glass-panel" style={{ padding: '50px', maxWidth: '450px', width: '100%', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)', border: '1px solid var(--secondary)', position: 'relative', zIndex: 10 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '2.5rem' }}>Join Us</h2>
                <p style={{ textAlign: 'center', marginBottom: '30px', color: '#888' }}>Start your art collection journey today</p>

                <form action={customerSignup}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Full Name</label>
                        <input type="text" name="name" required style={{ padding: '15px' }} placeholder="John Doe" />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email Address</label>
                        <input type="email" name="email" required style={{ padding: '15px' }} placeholder="john@example.com" />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Password</label>
                        <input type="password" name="password" required style={{ padding: '15px' }} placeholder="Create a strong password" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>Create Account</button>
                </form>

                <p style={{ marginTop: '30px', textAlign: 'center', color: '#ccc' }}>
                    Already a member? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Login Here</Link>
                </p>
            </div>
        </div>
    );
}
