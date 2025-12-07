"use client";

import { useState } from "react";
import { addToCart } from "@/app/actions/cart";
import { PlusIcon } from "@heroicons/react/24/outline";

export function AddToCartButton({ productId }: { productId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("productId", productId.toString());

      const result = await addToCart(formData);

      if (result.success) {
        setMessage({ text: result.message, type: "success" });
      } else {
        setMessage({ text: result.message, type: "error" });
      }
    } catch (error) {
      setMessage({ 
        text: "Failed to add to cart. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex-1">
        <input type="hidden" name="productId" value={productId} />
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-xl font-semibold transition-all ${
            isLoading 
              ? "opacity-70 cursor-not-allowed" 
              : "hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Adding...
            </>
          ) : (
            <>
              <PlusIcon className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
      </form>

      {message && (
        <div className={`p-3 rounded-lg text-sm font-medium ${
          message.type === "success" 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}