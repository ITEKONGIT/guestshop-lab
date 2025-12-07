"use server";

import { getCart, saveCart } from "@/lib/cart";
import { getAllProducts } from "@/lib/products";
import { revalidatePath } from "next/cache";

// ORIGINAL: Keep this for AddToCartButton.tsx (returns structured response)
export async function addToCart(formData: FormData): Promise<{
  success: boolean;
  message: string;
  cartSize?: number;
}> {
  try {
    const productId = formData.get("productId");
    
    if (!productId) {
      return {
        success: false,
        message: "Product ID is required",
      };
    }

    const parsedId = Number(productId);
    if (Number.isNaN(parsedId) || parsedId <= 0) {
      return {
        success: false,
        message: "Invalid product ID",
      };
    }

    const products = getAllProducts();
    const product = products.find(p => p.id === parsedId);
    
    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    if (product.stock <= 0) {
      return {
        success: false,
        message: "This product is out of stock",
      };
    }

    const cart = await getCart();
    const existingItem = cart.find(item => item.productId === parsedId);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        return {
          success: false,
          message: `Only ${product.stock} available in stock`,
        };
      }
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: parsedId,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }

    await saveCart(cart);

    revalidatePath("/cart");
    revalidatePath(`/product/${productId}`);

    return {
      success: true,
      message: "Added to cart successfully",
      cartSize: cart.reduce((sum, item) => sum + item.quantity, 0),
    };

  } catch (error) {
    console.error("Add to cart error:", error);
    return {
      success: false,
      message: "Failed to add item to cart. Please try again.",
    };
  }
}

// FIXED: Returns void for Next.js 16 form actions
export async function removeFromCart(formData: FormData): Promise<void> {
  try {
    const productId = formData.get("productId");
    
    if (!productId) {
      throw new Error("Product ID is required");
    }

    const parsedId = Number(productId);
    const cart = await getCart();
    const newCart = cart.filter(item => item.productId !== parsedId);
    
    await saveCart(newCart);
    revalidatePath("/cart");
    
    // No return value - void
  } catch (error) {
    console.error("Remove from cart error:", error);
    
    // Convert to Error object if needed
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to remove item. Please try again.");
  }
}

// FIXED: Returns void for Next.js 16 form actions
export async function updateCartQuantity(formData: FormData): Promise<void> {
  try {
    const productId = formData.get("productId");
    const quantity = formData.get("quantity");
    
    if (!productId || !quantity) {
      throw new Error("Product ID and quantity are required");
    }

    const parsedId = Number(productId);
    const parsedQuantity = Number(quantity);

    if (Number.isNaN(parsedId) || Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
      throw new Error("Invalid input");
    }

    const products = getAllProducts();
    const product = products.find(p => p.id === parsedId);
    
    if (!product) {
      throw new Error("Product not found");
    }

    if (parsedQuantity > product.stock) {
      throw new Error(`Only ${product.stock} available in stock`);
    }

    const cart = await getCart();
    const existingItem = cart.find(item => item.productId === parsedId);

    if (existingItem) {
      existingItem.quantity = parsedQuantity;
    } else {
      cart.push({
        productId: parsedId,
        quantity: parsedQuantity,
        addedAt: new Date().toISOString(),
      });
    }

    await saveCart(cart);
    revalidatePath("/cart");
    
    // No return value - void
  } catch (error) {
    console.error("Update cart error:", error);
    
    // Convert to Error object if needed
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update cart. Please try again.");
  }
}