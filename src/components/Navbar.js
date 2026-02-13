import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { logout } from '../lib/actions';
import { getUser } from '../lib/data';
import CartIcon from './CartIcon';

export default function Navbar() {
    const cookieStore = cookies();
    const customerSession = cookieStore.get('pila_customer_session');
    const adminSession = cookieStore.get('pila_session');

    const isLoggedIn = customerSession || adminSession;

    let user = null;
    if (customerSession) {
        user = getUser(customerSession.value);
    } else if (adminSession) {
        user = getUser('admin@pilaarts.com');
    }

    const displayName = user ? user.name.split(' ')[0] : (adminSession ? 'Admin' : '');
    const profilePic = user ? user.profilePic : null;

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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {profilePic ? (
                                <img src={profilePic} alt={displayName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} />
                            ) : (
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    {displayName[0]}
                                </div>
                            )}
                            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>
                                Hi, {displayName}
                            </span>
                        </div>
                        <form action={logout}>
                            <button type="submit" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '50%', transition: 'background 0.3s' }} title="Logout" className="logout-btn">
                                <LogOut size={20} />
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
