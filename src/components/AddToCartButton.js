"use client";

import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className="btn btn-primary"
            disabled={added}
            style={{ minWidth: '200px' }}
        >
            {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
    );
}
