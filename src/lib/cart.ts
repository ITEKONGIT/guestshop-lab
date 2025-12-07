import { cookies } from "next/headers";
import { getAllProducts } from "@/lib/products";

export type CartItem = {
  productId: number;
  quantity: number;
  addedAt: string;
};

export type CartWithProducts = (CartItem & {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
  } | null;
})[];

const CART_COOKIE = "guest_cart";
const MAX_CART_ITEMS = 20;
const MAX_QUANTITY_PER_ITEM = 10;

export async function getCart(): Promise<CartItem[]> {
  try {
    const cookieStore = await cookies(); // Add await here
    const raw = cookieStore.get(CART_COOKIE)?.value;

    if (!raw) return [];

    const parsed = JSON.parse(raw);
    
    if (!Array.isArray(parsed)) {
      console.warn("Invalid cart structure, resetting");
      return [];
    }

    const validCart = parsed
      .filter((item): item is CartItem => 
        item &&
        typeof item === 'object' &&
        typeof item.productId === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        item.quantity <= MAX_QUANTITY_PER_ITEM
      )
      .slice(0, MAX_CART_ITEMS);

    return validCart;
  } catch (error) {
    console.error("Failed to parse cart cookie:", error);
    return [];
  }
}

export async function saveCart(cart: CartItem[]): Promise<void> {
  try {
    const cookieStore = await cookies(); // Add await here
    
    const validCart = cart.slice(0, MAX_CART_ITEMS).map(item => ({
      ...item,
      addedAt: item.addedAt || new Date().toISOString(),
    }));

    cookieStore.set(CART_COOKIE, JSON.stringify(validCart), {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    console.error("Failed to save cart:", error);
    throw new Error("Failed to save cart");
  }
}

export async function getCartWithProducts(): Promise<CartWithProducts> {
  const cart = await getCart(); // Add await here
  const products = getAllProducts();

  return cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    
    if (!product) {
      return {
        ...item,
        product: null,
      };
    }

    const safeQuantity = Math.min(item.quantity, product.stock);
    
    return {
      ...item,
      quantity: safeQuantity,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
      },
    };
  });
}

export async function getCartSummary() {
  const cart = await getCart(); // Add await here
  const cartWithProducts = await getCartWithProducts(); // Add await here
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cartWithProducts.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  return {
    totalItems,
    totalValue,
    uniqueItems: cart.length,
  };
}

export async function clearCart(): Promise<void> {
  const cookieStore = await cookies(); // Add await here
  cookieStore.delete(CART_COOKIE);
}