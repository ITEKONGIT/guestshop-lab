export type ShippingMethod = 'standard' | 'express';

export type ShippingRate = {
  method: ShippingMethod;
  cost: number;
  deliveryTime: string;
  estimatedDelivery: string;
};

export type ShippingEstimate = {
  subtotal: number;
  totalWeight: number;
  rates: ShippingRate[];
  freeShippingEligible: boolean;
  freeShippingThreshold: number;
};

// Calculate estimated delivery date (business days)
function calculateDeliveryDate(method: ShippingMethod): string {
  const today = new Date();
  let businessDaysToAdd = method === 'express' ? 2 : 4;
  
  const result = new Date(today);
  let addedDays = 0;
  
  while (addedDays < businessDaysToAdd) {
    result.setDate(result.getDate() + 1);
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return result.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Calculate shipping cost based on weight
function calculateShippingCost(weight: number, method: ShippingMethod): number {
  const baseRate = 1500; // ₦1,500 for first 1kg
  const additionalRate = 500; // ₦500 per additional 0.5kg
  
  if (weight <= 1) {
    return method === 'express' ? baseRate * 1.5 : baseRate;
  }
  
  const additionalWeight = weight - 1;
  const additionalUnits = Math.ceil(additionalWeight / 0.5);
  const additionalCost = additionalUnits * additionalRate;
  const totalCost = baseRate + additionalCost;
  
  return method === 'express' ? totalCost * 1.5 : totalCost;
}

// Main function to get shipping estimates
export function calculateShipping(
  subtotal: number,
  totalWeight: number
): ShippingEstimate {
  const FREE_SHIPPING_THRESHOLD = 50000; // ₦50,000
  
  const freeShippingEligible = subtotal >= FREE_SHIPPING_THRESHOLD;
  
  // Calculate rates for both methods
  const standardCost = freeShippingEligible ? 0 : calculateShippingCost(totalWeight, 'standard');
  const expressCost = freeShippingEligible ? 0 : calculateShippingCost(totalWeight, 'express');
  
  const rates: ShippingRate[] = [
    {
      method: 'standard',
      cost: standardCost,
      deliveryTime: '3-5 business days',
      estimatedDelivery: calculateDeliveryDate('standard'),
    },
    {
      method: 'express',
      cost: expressCost,
      deliveryTime: '1-2 business days',
      estimatedDelivery: calculateDeliveryDate('express'),
    },
  ];
  
  return {
    subtotal,
    totalWeight,
    rates,
    freeShippingEligible,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  };
}

// Utility function to format currency
export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

// Get shipping summary for display
export function getShippingSummary(estimate: ShippingEstimate) {
  const cheapestRate = estimate.rates.reduce((prev, current) => 
    prev.cost < current.cost ? prev : current
  );
  
  return {
    cheapestRate,
    freeShippingEligible: estimate.freeShippingEligible,
    freeShippingThreshold: estimate.freeShippingThreshold,
    totalWeight: estimate.totalWeight,
  };
}