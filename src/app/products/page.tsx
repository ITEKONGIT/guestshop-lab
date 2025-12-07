import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getAllProducts();
  
  // Group products by category for better organization
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse Our Collection
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Discover high-quality tech accessories. Shop as a guest with instant checkout.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              All Products
            </button>
            {categories.map(category => (
              <button
                key={category}
                className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 border border-gray-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-4xl">
                    {product.category === 'Audio' && '🎧'}
                    {product.category === 'Accessories' && '🖱️'}
                    {product.category === 'Storage' && '💾'}
                    {product.category === 'Adapters' && '🔌'}
                    {product.category === 'Gaming' && '🎮'}
                    {product.category === 'Wireless' && '📡'}
                  </span>
                </div>
                
                {/* Stock Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 text-white rounded-full text-xs">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h2 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {product.name}
                </h2>
                
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Price and Weight */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₦{product.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {product.weight} kg • {product.stock} units available
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow hover:shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/product/${product.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium group/link"
                  >
                    See full specifications
                    <svg 
                      className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Check back soon for new arrivals!
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>All prices in Nigerian Naira (₦). Free shipping on orders over ₦50,000.</p>
          <p className="mt-1">Guest checkout available • No account required</p>
        </div>
      </div>
    </main>
  );
}