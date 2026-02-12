"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import StaticBackground from '../../components/StaticBackground';

function GalleryContent() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const searchParams = useSearchParams();
    const initialCat = searchParams.get('cat') || 'All';

    useEffect(() => {
        async function load() {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
            filterProducts(initialCat, data);
        }
        load();
    }, []);

    const filterProducts = (cat, allProducts = products) => {
        setActiveTab(cat);
        if (cat === 'All') {
            setFiltered(allProducts);
        } else {
            setFiltered(allProducts.filter(p => p.category === cat));
        }
    };

    const categories = ['All', 'Nature', 'Animal', 'Locations', 'Graphics'];

    return (
        <div style={{ position: 'relative', minHeight: '100vh', padding: '60px 0' }}>
            <StaticBackground imageUrl="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=2000" />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '4.5rem', textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>Art Collection</h1>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '60px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => filterProducts(cat)}
                            className={`btn ${activeTab === cat ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '12px 30px', fontSize: '1rem', backdropFilter: 'blur(10px)' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid-gallery">
                    {filtered.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function GalleryPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '100px', textAlign: 'center', color: 'white' }}>Loading Gallery...</div>}>
            <GalleryContent />
        </Suspense>
    );
}
