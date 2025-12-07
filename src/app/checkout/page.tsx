import { getCart } from '@/lib/cart';
import { getAllProducts } from '@/lib/products';
import { calculateShipping } from '@/lib/shipping';
import { CheckoutUI } from './CheckoutUI';

export default async function CheckoutPage() {
  // Get cart and products (SERVER-SIDE)
  const cart = await getCart();
  const products = getAllProducts();
  
  // Process cart items with weight
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: product ? product.price * item.quantity : 0,
      weight: product ? product.weight * item.quantity : 0
    };
  }).filter(item => item.product);

  // Calculate subtotal and total weight
  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalWeight = cartItems.reduce((sum, item) => sum + item.weight, 0);
  
  // Use your shipping calculator
  const shippingEstimate = calculateShipping(subtotal, totalWeight);
  
  // Get initial shipping cost (use standard by default)
  const initialShipping = shippingEstimate.freeShippingEligible 
    ? 0 
    : shippingEstimate.rates.find(rate => rate.method === 'standard')?.cost || 0;
  
  const tax = subtotal * 0.08;
  const initialTotal = subtotal + initialShipping + tax;

  // Pass all data to Client Component
  return (
    <CheckoutUI 
      cartItems={cartItems}
      subtotal={subtotal}
      totalWeight={totalWeight}
      shippingEstimate={shippingEstimate}
      initialShipping={initialShipping}
      initialTotal={initialTotal}
      tax={tax}
    />
  );
}