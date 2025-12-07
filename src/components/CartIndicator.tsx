"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export function CartIndicator() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Get cart count from cookies (simplified - in production you'd use a real API)
    const getCartCount = () => {
      try {
        const cartCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('guest_cart='));
        
        if (cartCookie) {
          const cartData = JSON.parse(decodeURIComponent(cartCookie.split('=')[1]));
          const count = Array.isArray(cartData) 
            ? cartData.reduce((sum: number, item: any) => sum + item.quantity, 0)
            : 0;
          setItemCount(count);
        }
      } catch {
        setItemCount(0);
      }
    };

    getCartCount();
    
    // Poll for cart changes (simplified - in production use better state management)
    const interval = setInterval(getCartCount, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link 
      href="/cart" 
      className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}