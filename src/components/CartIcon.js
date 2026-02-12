"use client";

import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartIcon() {
    const { cart } = useCart();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={24} />
            {mounted && count > 0 && (
                <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--accent)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
                }}>
                    {count}
                </span>
            )}
        </div>
    );
}
