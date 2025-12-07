"use client";

import { useState } from "react";
import { 
  calculateShipping, 
  ShippingEstimate, 
  ShippingRate, 
  formatCurrency 
} from "@/lib/shipping";

interface ShippingCalculatorProps {
  subtotal: number;
  totalWeight: number;
  onShippingSelect?: (rate: ShippingRate) => void;
  selectedMethod?: 'standard' | 'express';
}

export function ShippingCalculator({ 
  subtotal, 
  totalWeight,
  onShippingSelect,
  selectedMethod = 'standard'
}: ShippingCalculatorProps) {
  const [selectedShipping, setSelectedShipping] = useState<ShippingRate | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate shipping estimates
  const estimate: ShippingEstimate = calculateShipping(subtotal, totalWeight);
  const { rates, freeShippingEligible, freeShippingThreshold } = estimate;
  
  // Select a shipping method
  const handleSelectShipping = (rate: ShippingRate) => {
    setSelectedShipping(rate);
    if (onShippingSelect) {
      onShippingSelect(rate);
    }
  };
  
  // Find the initially selected rate
  const initialSelectedRate = rates.find(rate => rate.method === selectedMethod) || rates[0];
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Shipping Options</h3>
            <p className="text-sm text-gray-600">
              {selectedShipping 
                ? `${selectedShipping.deliveryTime} • ${formatCurrency(selectedShipping.cost)}`
                : 'Select a shipping method'
              }
            </p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <svg 
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          {/* Free Shipping Notice */}
          {freeShippingEligible ? (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-green-800 font-medium">Free Shipping Applied!</p>
                  <p className="text-green-700 text-sm">
                    Your order qualifies for free shipping on orders over {formatCurrency(freeShippingThreshold)}.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 text-sm text-gray-600">
              <p>
                Free shipping on orders over {formatCurrency(freeShippingThreshold)}. 
                <span className="ml-2 text-blue-600">
                  Add {formatCurrency(freeShippingThreshold - subtotal)} more to qualify!
                </span>
              </p>
            </div>
          )}
          
          {/* Shipping Methods */}
          <div className="space-y-3">
            {rates.map((rate) => (
              <div
                key={rate.method}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedShipping?.method === rate.method
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleSelectShipping(rate)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border mr-3 ${
                      selectedShipping?.method === rate.method
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedShipping?.method === rate.method && (
                        <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900 capitalize mr-2">
                          {rate.method} Shipping
                        </span>
                        {rate.method === 'express' && (
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            Fastest
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{rate.deliveryTime}</p>
                      <p className="text-sm text-gray-500">
                        Est. delivery: {rate.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      rate.cost === 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {rate.cost === 0 ? 'FREE' : formatCurrency(rate.cost)}
                    </div>
                    {rate.method === 'express' && rate.cost > 0 && (
                      <p className="text-xs text-gray-500">+50% faster delivery</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Weight Information */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Package Weight:</span>
              <span className="font-medium">{totalWeight.toFixed(2)} kg</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Shipping Calculation:</span>
              <span className="font-medium">
                ₦1,500 base + ₦500 per 0.5kg over 1kg
              </span>
            </div>
          </div>
          
          {/* Help Text */}
          <div className="mt-4 text-xs text-gray-500">
            <p>• Shipping rates are calculated based on total package weight</p>
            <p>• Express shipping is 50% more than standard rates</p>
            <p>• Delivery estimates exclude weekends and holidays</p>
          </div>
        </div>
      )}
      
      {/* Selected Shipping Summary (when collapsed) */}
      {!isExpanded && selectedShipping && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-600">Selected:</span>
              <p className="font-medium capitalize">{selectedShipping.method} Shipping</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">
                {selectedShipping.cost === 0 ? 'FREE' : formatCurrency(selectedShipping.cost)}
              </p>
              <p className="text-sm text-gray-600">{selectedShipping.deliveryTime}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}