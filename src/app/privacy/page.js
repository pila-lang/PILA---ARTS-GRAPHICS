
export default function PrivacyPage() {
    return (
        <div className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
            <h1>Privacy Policy</h1>
            <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
                At PILA ARTS & GRAPHICS, we value your privacy. This policy outlines how we collect, use, and protect your personal information.
            </p>
            <h3 style={{ marginTop: '30px' }}>Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.</p>

            <h3 style={{ marginTop: '30px' }}>How We Use Information</h3>
            <p>We use your information to process transactions, provide customer support, and improve our services.</p>

            <p style={{ marginTop: '40px', color: '#888' }}>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
    );
}
