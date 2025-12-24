
import React, { useState, useEffect } from 'react';
import { Theme, User, Product } from './types';
import { ThemeToggle } from './components/ThemeToggle';
import { ProductCard } from './components/ProductCard';
import { SellForm } from './components/SellForm';
import { Auth } from './components/Auth';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Sony WH-1000XM4 Headphones',
    description: 'Barely used headphones. Excellent noise cancellation. Comes with case and original cables.',
    price: 15000,
    category: 'Audio',
    condition: 'Like New',
    image: 'https://picsum.photos/seed/sony/600/400',
    sellerId: 's1',
    sellerName: 'Alex Smith',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'iPad Air 4th Gen 64GB',
    description: 'Good condition, small scratch on the back. Screen is perfect. Includes Apple Pencil 2.',
    price: 38000,
    category: 'Tablets',
    condition: 'Good',
    image: 'https://picsum.photos/seed/ipad/600/400',
    sellerId: 's2',
    sellerName: 'Jordan Lee',
    createdAt: Date.now()
  },
  {
    id: '3',
    title: 'Mechanical Keyboard RGB',
    description: 'Custom build mechanical keyboard with brown switches. Amazing typing experience for coding.',
    price: 6500,
    category: 'Peripherals',
    condition: 'Like New',
    image: 'https://picsum.photos/seed/kb/600/400',
    sellerId: 's3',
    sellerName: 'Riley Chen',
    createdAt: Date.now()
  }
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showSellForm, setShowSellForm] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setShowAuth(false);
  };

  const handleAddProduct = (newProduct: Partial<Product>) => {
    const fullProduct: Product = {
      ...newProduct as Product,
      id: Math.random().toString(36).substr(2, 9),
      sellerId: user?.id || 'anonymous',
      sellerName: user?.name || 'Student',
      createdAt: Date.now()
    };
    setProducts([fullProduct, ...products]);
    setShowSellForm(false);
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full glass-morphism border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                CampusElectronics
              </span>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input 
                  type="text"
                  placeholder="Search for gadgets..."
                  className="w-full bg-gray-100 dark:bg-gray-800 px-4 py-2 pl-10 rounded-full border-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowSellForm(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 text-sm"
                  >
                    Sell Items
                  </button>
                  <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-800 pl-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium dark:text-gray-300 hidden lg:block">{user.name}</span>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuth(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md"
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Upgrade your tech, <br />
              <span className="text-indigo-600">sell your old gear.</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The exclusive marketplace for college students. Fast, safe, and powered by AI to get you the best deals on your campus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => user ? setShowSellForm(true) : setShowAuth(true)}
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:scale-105 transition-transform"
              >
                Start Selling
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border border-gray-200 dark:border-gray-800 dark:text-white font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
                Browse Deals
              </button>
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -z-10"></div>
          <div className="absolute top-1/3 right-0 -translate-y-1/2 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -z-10"></div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Listings</h2>
            <p className="text-gray-500 dark:text-gray-400">Discover what's trending on campus</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Filter by:</span>
            <select className="bg-transparent border-none focus:ring-0 font-semibold text-indigo-600 dark:text-indigo-400">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold dark:text-white">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try searching for something else or be the first to sell!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t dark:border-gray-800 py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold dark:text-white">CampusElectronics</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Built with ❤️ for college students everywhere.</p>
          </div>
          <div className="flex space-x-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-indigo-600">About</a>
            <a href="#" className="hover:text-indigo-600">Security</a>
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showSellForm && (
        <SellForm 
          onAddProduct={handleAddProduct} 
          onCancel={() => setShowSellForm(false)} 
        />
      )}
      {showAuth && (
        <Auth 
          onLogin={handleLogin} 
          onCancel={() => setShowAuth(false)} 
        />
      )}
    </div>
  );
};

export default App;
