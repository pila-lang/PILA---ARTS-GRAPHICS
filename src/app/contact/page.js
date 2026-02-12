import StaticBackground from "../../components/StaticBackground";

export default function ContactPage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* High Quality Atmospheric Background Image */}
            <StaticBackground imageUrl="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" />

            <div className="container" style={{ padding: '80px 20px', maxWidth: '800px', textAlign: 'center', zIndex: 10, position: 'relative' }}>
                <h1 style={{ marginBottom: '40px', fontSize: '3.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Get In Touch</h1>
                <div className="glass-panel" style={{ padding: '60px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,255,187,0.2)', boxShadow: '0 25px 50px rgba(0,0,0,0.8)' }}>
                    <p style={{ fontSize: '1.4rem', marginBottom: '30px', color: '#eee' }}>
                        I'm always open to new projects, creative ideas, or commissions. Let's make something beautiful together.
                    </p>

                    <h2 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '2.5rem', fontWeight: 'bold' }}>
                        WhatsApp: 0788339243
                    </h2>
                    <p style={{ marginBottom: '40px', color: '#fff', fontSize: '1.2rem' }}>asiripathum66@gmail.com</p>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a
                            href="https://wa.me/94788339243"
                            className="btn btn-primary"
                            target="_blank"
                            style={{ fontSize: '1.2rem', padding: '20px 50px' }}
                        >
                            Chat on WhatsApp
                        </a>
                        <a
                            href="mailto:asiripathum66@gmail.com"
                            className="btn btn-secondary"
                            style={{ fontSize: '1.2rem', padding: '20px 50px' }}
                        >
                            Send an Email
                        </a>
                    </div>

                    <p style={{ marginTop: '50px', color: '#888', fontSize: '1rem' }}>
                        Typically responds within a few hours.
                    </p>
                </div>
            </div>
        </div>
    );
}
