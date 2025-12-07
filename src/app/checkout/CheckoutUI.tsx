"use client";

import Link from 'next/link';
import { useState } from 'react';
import type { ShippingEstimate, ShippingMethod } from '@/lib/shipping';

interface CheckoutUIProps {
  cartItems: Array<{
    productId: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      weight: number;
      stock: number;
      category: string;
      image: string;
    };
    subtotal: number;
    weight: number;
  }>;
  subtotal: number;
  totalWeight: number;
  shippingEstimate: ShippingEstimate;
  initialShipping: number;
  initialTotal: number;
  tax: number;
}

export function CheckoutUI({ 
  cartItems, 
  subtotal, 
  totalWeight,
  shippingEstimate,
  initialShipping,
  initialTotal,
  tax 
}: CheckoutUIProps) {
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [selectedShippingMethod, setSelectedShippingMethod] = 
    useState<ShippingMethod>('standard');
  
  // Calculate current shipping based on selected method
  const getCurrentShipping = () => {
    if (shippingEstimate.freeShippingEligible) return 0;
    
    const selectedRate = shippingEstimate.rates.find(
      rate => rate.method === selectedShippingMethod
    );
    return selectedRate?.cost || 0;
  };
  
  // Calculate current total
  const getCurrentTotal = () => {
    const currentShipping = getCurrentShipping();
    return subtotal + currentShipping + tax;
  };
  
  // Handle shipping method change
  const handleShippingChange = (method: ShippingMethod) => {
    setSelectedShippingMethod(method);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phone) {
      alert('Please fill in all contact information fields');
      return;
    }
    
    const currentTotal = getCurrentTotal();
    const currentShipping = getCurrentShipping();
    const selectedRate = shippingEstimate.rates.find(
      rate => rate.method === selectedShippingMethod
    );
    
    alert(`Thank you for your order, ${contactInfo.firstName}!
Total: ₦${currentTotal.toLocaleString()}
Shipping: ${shippingEstimate.freeShippingEligible ? 'FREE' : `₦${currentShipping.toLocaleString()} (${selectedRate?.deliveryTime})`}
Delivery Estimate: ${selectedRate?.estimatedDelivery}`);
    
    window.location.href = '/';
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to your cart to checkout</p>
            <Link
              href="/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentShipping = getCurrentShipping();
  const currentTotal = getCurrentTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center text-gray-600 hover:text-black"
          >
            ← Back to Cart
          </Link>
          <h1 className="text-3xl font-bold mt-4">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center border-b pb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">
                        {item.product?.category === "Audio" && "🎧"}
                        {item.product?.category === "Accessories" && "🖱️"}
                        {item.product?.category === "Storage" && "💾"}
                        {item.product?.category === "Adapters" && "🔌"}
                        {item.product?.category === "Gaming" && "🎮"}
                        {item.product?.category === "Wireless" && "📡"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product?.name}</h3>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-gray-500 text-xs">Weight: {item.weight} kg</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₦{item.subtotal.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">₦{item.product?.price.toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Weight:</span>
                    <span>{totalWeight.toFixed(1)} kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={contactInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Total & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Order Total</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                
                {/* Shipping Method Selection */}
                <div className="border-t pt-3">
                  <h3 className="font-semibold mb-3">Shipping Method</h3>
                  {shippingEstimate.freeShippingEligible ? (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-xl mb-3">
                      <p className="text-green-800 font-medium">
                        🎉 Free Shipping Applied! (Order over ₦50,000)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 mb-3">
                      {shippingEstimate.rates.map((rate) => (
                        <label 
                          key={rate.method} 
                          className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                            selectedShippingMethod === rate.method 
                              ? 'border-black bg-gray-50' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="shipping" 
                              className="mr-3" 
                              value={rate.method}
                              checked={selectedShippingMethod === rate.method}
                              onChange={() => handleShippingChange(rate.method)}
                            />
                            <div>
                              <span className="font-medium">
                                {rate.method === 'express' ? 'Express Shipping' : 'Standard Shipping'}
                              </span>
                              <p className="text-sm text-gray-600">{rate.deliveryTime}</p>
                              <p className="text-xs text-gray-500">Est: {rate.estimatedDelivery}</p>
                            </div>
                          </div>
                          <span className="font-semibold">
                            ₦{rate.cost.toLocaleString()}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shippingEstimate.freeShippingEligible ? 'text-green-600 font-semibold' : ''}>
                      {shippingEstimate.freeShippingEligible 
                        ? 'FREE' 
                        : `₦${currentShipping.toLocaleString()}`}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>₦{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₦{currentTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-xl cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="mr-3" 
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-xl cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="mr-3" 
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <span>PayPal</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-xl cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="mr-3" 
                      value="apple-pay"
                      checked={paymentMethod === 'apple-pay'}
                      onChange={() => setPaymentMethod('apple-pay')}
                    />
                    <span>Apple Pay</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
                onClick={handlePlaceOrder}
              >
                Place Order - ₦{currentTotal.toLocaleString()}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}