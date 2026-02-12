import Link from 'next/link';

export default function ProductCard({ product }) {
    // Use a fallback image if no image provided or placeholder
    const imageSrc = product.imageUrl || '/images/hero-art.jpg';

    return (
        <div className="glass-panel" style={{ overflow: 'hidden', padding: '0' }}>
            <div style={{
                width: '100%',
                height: '300px',
                backgroundImage: `url('${imageSrc}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                }}>
                    <h3>{product.title}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Rs. {product.price.toLocaleString()}</p>
                </div>
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Link href={`/product/${product.id}`} className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
}
