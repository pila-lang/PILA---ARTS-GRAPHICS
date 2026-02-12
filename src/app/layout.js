import './globals.css';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
    title: 'PILA ARTS & GRAPHICS - Premium Artworks',
    description: 'Buy unique and exclusive artworks directly from the artist. High quality prints and digital assets.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <CartProvider>
                    <Navbar />
                    <main className="container" style={{ minHeight: '80vh' }}>
                        {children}
                    </main>
                    <footer>
                        <div className="container">
                            <p>© {new Date().getFullYear()} PILA ARTS & GRAPHICS. All rights reserved.</p>
                            <p>Contact: 0788339243 | WhatsApp Available</p>
                            <div style={{ marginTop: '10px' }}>
                                <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
                            </div>
                        </div>
                    </footer>
                </CartProvider>
            </body>
        </html>
    );
}
