import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        {/* Brand Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            GuestShop
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Shop as a guest. No account required.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-blue-600 text-2xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Checkout</h3>
            <p className="text-gray-600 text-sm">Complete purchases in seconds without creating an account</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-green-600 text-2xl mb-3">🛒</div>
            <h3 className="font-semibold text-gray-900 mb-2">No Sign-Up</h3>
            <p className="text-gray-600 text-sm">Browse and buy instantly—no passwords to remember</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-purple-600 text-2xl mb-3">📦</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Estimates</h3>
            <p className="text-gray-600 text-sm">See delivery times and costs before you commit</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-orange-600 text-2xl mb-3">📈</div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Stock</h3>
            <p className="text-gray-600 text-sm">Real-time inventory updates so you know what's available</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Start Shopping Instantly
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Experience hassle-free shopping. Browse our curated collection and 
            checkout as a guest—your privacy and convenience come first.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
          >
            Enter Store
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-gray-200 pt-12">
          <p className="text-gray-500 text-sm mb-2">SIMPLIFIED SHOPPING EXPERIENCE</p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Secure guest checkout
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              No commitment required
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Privacy-first approach
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}