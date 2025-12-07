import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartIndicator } from "@/components/CartIndicator";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GuestShop - Shop as Guest. No Account Required.",
  description: "Browse products and checkout instantly as a guest. No sign-up, no passwords, just shopping.",
  keywords: ["guest shopping", "no account shopping", "instant checkout", "ecommerce", "tech accessories"],
  authors: [{ name: "GuestShop" }],
  openGraph: {
    title: "GuestShop - Shop Instantly as Guest",
    description: "No account required. Browse and checkout in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo & Brand */}
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GS</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 hidden sm:block">
                    GuestShop
                  </span>
                </Link>
                
                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50"
                  >
                    All Products
                  </Link>
                  <div className="relative group">
                    <button className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-50 flex items-center">
                      Categories
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 py-2 border border-gray-100">
                      <Link href="/products?category=Audio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                        🎧 Audio
                      </Link>
                      <Link href="/products?category=Accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                        🖱️ Accessories
                      </Link>
                      <Link href="/products?category=Storage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                        💾 Storage
                      </Link>
                      <Link href="/products?category=Adapters" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                        🔌 Adapters
                      </Link>
                      <Link href="/products?category=Gaming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">
                        🎮 Gaming
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Cart Indicator */}
                <CartIndicator />
                
                {/* Mobile menu button (hidden on desktop) */}
                <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation (hidden by default) */}
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 hidden">
            <div className="space-y-1">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">
                Home
              </Link>
              <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">
                All Products
              </Link>
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 mb-1">Categories</div>
                <div className="space-y-1 pl-2">
                  <Link href="/products?category=Audio" className="block px-3 py-1 rounded-md text-sm text-gray-700 hover:text-black hover:bg-gray-50">
                    🎧 Audio
                  </Link>
                  <Link href="/products?category=Accessories" className="block px-3 py-1 rounded-md text-sm text-gray-700 hover:text-black hover:bg-gray-50">
                    🖱️ Accessories
                  </Link>
                  <Link href="/products?category=Storage" className="block px-3 py-1 rounded-md text-sm text-gray-700 hover:text-black hover:bg-gray-50">
                    💾 Storage
                  </Link>
                  <Link href="/products?category=Adapters" className="block px-3 py-1 rounded-md text-sm text-gray-700 hover:text-black hover:bg-gray-50">
                    🔌 Adapters
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GS</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">GuestShop</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Shop instantly as a guest. No account required, just shopping.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/products" className="text-gray-600 hover:text-black transition-colors">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="text-gray-600 hover:text-black transition-colors">
                      Your Cart
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      Best Sellers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      Shipping Info
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      Returns & Exchanges
                    </a>
                  </li>
                </ul>
              </div>

              {/* Guest Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Guest Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No account required
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Instant checkout
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Secure payments
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} GuestShop. All prices in Nigerian Naira (₦).
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <p className="text-gray-500 text-sm">
                  Free shipping on orders over ₦50,000
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-gray-500 text-sm">Guest checkout only</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Simple JavaScript for mobile menu toggle */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const menuButton = document.querySelector('button.md-hidden');
              const mobileMenu = document.querySelector('.md-hidden + div');
              
              if (menuButton && mobileMenu) {
                menuButton.addEventListener('click', function() {
                  mobileMenu.classList.toggle('hidden');
                });
              }
              
              // Update cart count from localStorage (simplified version)
              function updateCartBadge() {
                try {
                  const cartData = localStorage.getItem('guest_cart');
                  if (cartData) {
                    const cart = JSON.parse(cartData);
                    const count = Array.isArray(cart) ? 
                      cart.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0;
                    const badge = document.querySelector('.relative span');
                    if (badge) {
                      badge.textContent = count > 99 ? '99+' : count;
                      badge.style.display = count > 0 ? 'flex' : 'none';
                    }
                  }
                } catch (e) {}
              }
              
              // Check cart every 2 seconds
              setInterval(updateCartBadge, 2000);
              updateCartBadge();
            });
          `
        }} />
      </body>
    </html>
  );
}