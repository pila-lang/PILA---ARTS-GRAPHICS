
export default function TermsPage() {
    return (
        <div className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
            <h1>Terms of Service</h1>
            <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
                Welcome to PILA ARTS & GRAPHICS. These terms govern your use of our website and services.
            </p>
            <h3 style={{ marginTop: '30px' }}>Acceptance of Terms</h3>
            <p>By accessing or using our website, you agree to be bound by these terms.</p>

            <h3 style={{ marginTop: '30px' }}>Intellectual Property</h3>
            <p>All artwork and content on this site are the property of PILA ARTS & GRAPHICS. Unauthorized use is prohibited.</p>

            <p style={{ marginTop: '40px', color: '#888' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
    );
}
