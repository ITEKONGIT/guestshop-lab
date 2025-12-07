import { getAllProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";

// Using async/await for Next.js 15+ dynamic routes
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // params is now a Promise in Next.js 15
}) {
  // Await the params Promise
  const { id } = await params;
  
  const productId = Number(id);
  
  // 1️⃣ Guard against NaN
  if (Number.isNaN(productId)) return notFound();
  
  // 🔹 1. Avoid Double File Reads - Single disk read
  const allProducts = getAllProducts();
  const product = allProducts.find(p => p.id === productId);

  if (!product) return notFound();

  // 🔹 2. Filter Related Categories to Exclude Current One
  const relatedCategories = Array.from(
    new Set(allProducts.map(p => p.category))
  ).filter(category => category !== product.category);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-gray-700"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link 
              href="/products" 
              className="text-gray-500 hover:text-gray-700"
            >
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Image & Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 flex items-center justify-center h-96">
                <div className="text-9xl opacity-80">
                  {product.category === "Audio" && "🎧"}
                  {product.category === "Accessories" && "🖱️"}
                  {product.category === "Storage" && "💾"}
                  {product.category === "Adapters" && "🔌"}
                  {product.category === "Gaming" && "🎮"}
                  {product.category === "Wireless" && "📡"}
                </div>
                
                {/* Stock Status Badge */}
                <div className={`absolute top-4 left-4 px-4 py-2 rounded-full font-semibold text-sm ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : product.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-black/90 text-white rounded-full font-medium text-sm">
                  {product.category}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-gray-500 text-sm mb-1">Weight</div>
                  <div className="font-semibold">{product.weight} kg</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-gray-500 text-sm mb-1">Available</div>
                  <div className={`font-semibold ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock} units
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-gray-500 text-sm mb-1">Category</div>
                  <div className="font-semibold">{product.category}</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    ₦{product.price.toLocaleString()}
                  </div>
                  {product.price > 50000 && (
                    <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Free Shipping Eligible
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Features */}
              <div className="border-t border-b border-gray-200 py-6">
                <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.category === "Audio" && (
                    <>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>High-quality audio drivers</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>Long battery life (up to 30 hours)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>Bluetooth 5.2 connectivity</span>
                      </li>
                    </>
                  )}
                  {product.category === "Accessories" && (
                    <>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Ergonomic design for comfort</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Plug-and-play setup</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>Compatible with all major systems</span>
                      </li>
                    </>
                  )}
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span>1-year manufacturer warranty</span>
                  </li>
                </ul>
              </div>

              {/* Add to Cart Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Add to Cart</h3>
                  <div className="text-sm text-gray-600">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      product.stock > 10 ? 'bg-green-500' : 
                      product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Stock and Price Summary */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-gray-600 text-sm">Price per unit:</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ₦{product.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600 text-sm block">Available:</span>
                        <span className={`font-semibold ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                          {product.stock} units
                        </span>
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <div className="space-y-3">
                      {product.stock > 0 ? (
                        <AddToCartButton productId={product.id} />
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      )}
                      
                      <div className="flex items-center justify-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Guest checkout • No account needed
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/products"
                      className="flex items-center justify-center border-2 border-black text-black px-4 py-3 rounded-xl font-semibold text-center hover:bg-black hover:text-white transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Continue Shopping
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center justify-center bg-gray-800 text-white px-4 py-3 rounded-xl font-semibold text-center hover:bg-gray-900 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      View Cart
                    </Link>
                  </div>
                  
                  {/* Shipping Info */}
                  {product.price > 50000 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-800 text-sm font-medium">
                          Eligible for free shipping! Orders over ₦50,000 ship free.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Back to Products */}
              <div className="pt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All Products
                </Link>
              </div>
            </div>
          </div>

          {/* Related Categories */}
          {relatedCategories.length > 0 && (
            <div className="border-t border-gray-200 p-8 bg-gray-50">
              <h3 className="text-xl font-bold mb-6">Explore More Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {relatedCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${category}`}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-black hover:shadow-md transition-all text-center"
                  >
                    <div className="text-2xl mb-2">
                      {category === "Audio" && "🎧"}
                      {category === "Accessories" && "🖱️"}
                      {category === "Storage" && "💾"}
                      {category === "Adapters" && "🔌"}
                      {category === "Gaming" && "🎮"}
                      {category === "Wireless" && "📡"}
                    </div>
                    <div className="font-medium text-sm">{category}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}