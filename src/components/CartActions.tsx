"use client";

import { updateCartQuantity } from "@/app/actions/cart";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface CartActionsProps {
  productId: number;
  currentQuantity: number;
  maxQuantity: number;
}

export function CartActions({ productId, currentQuantity, maxQuantity }: CartActionsProps) {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return;
    
    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("productId", productId.toString());
      formData.append("quantity", newQuantity.toString());

      // CHANGE: Just await, no result to check
      await updateCartQuantity(formData);
      
      // If no error thrown, update was successful
      setQuantity(newQuantity);
      
    } catch (error) {
      // CHANGE: Use error message if available
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to update quantity";
      setMessage(errorMessage);
      
      // Revert quantity on error
      setQuantity(currentQuantity);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={isLoading || quantity <= 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        
        <div className="text-center min-w-[60px]">
          <span className="font-semibold">{quantity}</span>
          <span className="text-gray-500 text-sm block">in cart</span>
        </div>
        
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={isLoading || quantity >= maxQuantity}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {message && (
        <p className="text-sm text-red-600">{message}</p>
      )}

      {maxQuantity <= 5 && quantity > 0 && (
        <p className="text-sm text-yellow-600">
          Only {maxQuantity} left in stock
        </p>
      )}
    </div>
  );
}