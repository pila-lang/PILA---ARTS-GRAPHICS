import { getAbout } from "../../lib/data";
import StaticBackground from "../../components/StaticBackground";

export default async function AboutPage() {
    const about = await getAbout();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Stable Artistic Background Image */}
            <StaticBackground imageUrl="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&q=80&w=2000" />

            <div className="container" style={{ padding: '80px 20px', maxWidth: '1000px', zIndex: 10, position: 'relative' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '3.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>About the Artist</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    <div className="glass-panel" style={{ padding: '10px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                        {about.imageUrl ? (
                            <img
                                src={about.imageUrl}
                                alt="Artist Portrait"
                                style={{ width: '100%', height: 'auto', maxHeight: '500px', borderRadius: '12px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '450px',
                                background: 'linear-gradient(45deg, var(--secondary), var(--accent))',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                color: 'rgba(255,255,255,0.5)'
                            }}>
                                [No Image Uploaded]
                            </div>
                        )}
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.7)', padding: '40px', borderRadius: '30px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '2rem' }}>PILA ARTS & GRAPHICS</h2>
                        <div style={{ lineHeight: '1.8', marginBottom: '30px', fontSize: '1.2rem', color: '#eee', whiteSpace: 'pre-wrap' }}>
                            {about.bio || "Welcome to my creative space. I am a passionate artist and graphic designer specializing in digital and traditional mediums."}
                        </div>

                        <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '20px', marginBottom: '30px', background: 'rgba(0,0,0,0.3)', padding: '15px' }}>
                            <h4 style={{ color: '#fff', marginBottom: '5px' }}>Contact Information</h4>
                            <p style={{ color: '#00ffbb', fontWeight: 'bold' }}>Email: asiripathum66@gmail.com</p>
                            <p style={{ color: '#fff' }}>WhatsApp: 0788339243</p>
                        </div>

                        <a href="https://wa.me/94788339243" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', fontSize: '1.1rem', padding: '15px' }}>Let's Collaborate</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
