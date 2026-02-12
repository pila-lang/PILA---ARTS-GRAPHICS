import { getProduct } from '../../../lib/data';
import AddToCartButton from '../../../components/AddToCartButton';
import Link from 'next/link';

export default async function ProductPage({ params }) {
    const product = await getProduct(params.id);

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <h1>Product not found</h1>
                <Link href="/gallery" className="btn btn-secondary">Back to Gallery</Link>
            </div>
        );
    }

    const imageSrc = product.imageUrl || '/images/hero-art.jpg';

    return (
        <div style={{ padding: '80px 0', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 400px' }}>
                    <img src={imageSrc} alt={product.title} style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--card-shadow)' }} />
                </div>
                <div style={{ flex: '1 1 400px', padding: '20px' }}>
                    <h1 style={{ marginBottom: '20px', fontSize: '3rem' }}>{product.title}</h1>
                    <p style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '30px', fontWeight: 'bold' }}>
                        Rs. {product.price.toLocaleString()}
                    </p>
                    <div style={{ marginBottom: '40px', lineHeight: '1.6', fontSize: '1.1rem', color: '#ccc' }}>
                        {product.description}
                    </div>

                    <AddToCartButton product={product} />

                    <div style={{ marginTop: '40px', padding: '20px', background: 'var(--glass)', borderRadius: '12px' }}>
                        <h4>Purchase includes:</h4>
                        <ul style={{ listStyle: 'inside', marginTop: '10px', color: '#aaa' }}>
                            <li>High-resolution digital file (if applicable)</li>
                            <li>Certificate of Authenticity</li>
                            <li>Secure delivery</li>
                        </ul>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <p>Need custom modifications? <a href="https://wa.me/94788339243" target="_blank" style={{ color: 'var(--primary)' }}>Chat on WhatsApp</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
