
import { login } from '../../../lib/actions';

export default function AdminLogin() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
                <form action={login}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input type="email" name="email" defaultValue="admin@pilaarts.com" required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input type="password" name="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
            </div>
        </div>
    );
}
