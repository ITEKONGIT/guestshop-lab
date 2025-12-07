import { getCartWithProducts, getCartSummary } from "@/lib/cart";
import Link from "next/link";
import { updateCartQuantity, removeFromCart } from "@/app/actions/cart";

export default async function CartPage() {
  const items = await getCartWithProducts();
  const { totalItems, totalValue } = await getCartSummary();

  // Filter out items with null products
  const validItems = items.filter(item => item.product !== null);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Continue Shopping
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-black rounded-lg">
                <span className="text-white text-lg">🛒</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
                <p className="text-gray-600">{totalItems} items in your cart</p>
              </div>
            </div>
            
            {totalItems > 0 && (
              <div className="text-right">
                <p className="text-gray-600 text-sm">Estimated Total</p>
                <p className="text-3xl font-bold text-gray-900">₦{totalValue.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {validItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to see items here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Browse Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {validItems.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Product Image/Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">
                          {item.product!.category === "Audio" && "🎧"}
                          {item.product!.category === "Accessories" && "🖱️"}
                          {item.product!.category === "Storage" && "💾"}
                          {item.product!.category === "Adapters" && "🔌"}
                          {item.product!.category === "Gaming" && "🎮"}
                          {item.product!.category === "Wireless" && "📡"}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            href={`/product/${item.productId}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                          >
                            {item.product!.name}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1">
                            {item.product!.category} • In stock
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ₦{(item.product!.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-gray-500 text-sm">
                            ₦{item.product!.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls - SIMPLIFIED VERSION */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <form action={updateCartQuantity}>
                            <input type="hidden" name="productId" value={item.productId} />
                            <input type="hidden" name="quantity" value={Math.max(1, item.quantity - 1)} />
                            <button 
                              type="submit"
                              disabled={item.quantity <= 1}
                              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                              −
                            </button>
                          </form>
                          
                          <div className="text-center min-w-[60px]">
                            <span className="font-semibold">{item.quantity}</span>
                            <span className="text-gray-500 text-sm block">in cart</span>
                          </div>
                          
                          <form action={updateCartQuantity}>
                            <input type="hidden" name="productId" value={item.productId} />
                            <input type="hidden" name="quantity" value={Math.min(item.product!.stock, item.quantity + 1)} />
                            <button 
                              type="submit"
                              disabled={item.quantity >= item.product!.stock}
                              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                              +
                            </button>
                          </form>
                        </div>
                        
                        <form action={removeFromCart}>
                          <input type="hidden" name="productId" value={item.productId} />
                          <button
                            type="submit"
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({totalItems})</span>
                    <span>₦{totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Estimated Total</span>
                      <span>₦{totalValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
  href="/checkout"
  className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-center block"
>
  Proceed to Checkout
</Link>
                  
                  <Link
                    href="/products"
                    className="w-full border-2 border-black text-black py-4 rounded-xl font-semibold text-center hover:bg-gray-50 transition-colors block"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 text-sm mb-3">Guest checkout includes:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      No account required
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Secure payment processing
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Instant order confirmation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}