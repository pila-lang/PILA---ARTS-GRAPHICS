import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { logout } from '@/lib/actions';
import CartIcon from './CartIcon';

export default function Navbar() {
    const cookieStore = cookies();
    const customerSession = cookieStore.get('pila_customer_session');
    const adminSession = cookieStore.get('pila_session');

    const isLoggedIn = customerSession || adminSession;
    const displayName = customerSession ? customerSession.value.split('@')[0] : (adminSession ? 'Admin' : '');

    return (
        <nav className="container">
            <Link href="/" className="logo">
                PILA ARTS & GRAPHICS
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link href="/">Home</Link>
                <Link href="/gallery">Gallery</Link>
                <Link href="/contact">Contact</Link>
                {adminSession && <Link href="/admin/dashboard" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Dashboard</Link>}
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Link href="/cart" aria-label="Cart">
                    <CartIcon />
                </Link>

                {isLoggedIn ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>
                            Hi, {displayName}
                        </span>
                        <form action={logout}>
                            <button type="submit" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Logout">
                                <LogOut size={22} />
                            </button>
                        </form>
                    </div>
                ) : (
                    <Link href="/login" aria-label="Account">
                        <User size={24} />
                    </Link>
                )}
            </div>
        </nav>
    );
}
