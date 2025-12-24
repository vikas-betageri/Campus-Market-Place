
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
          ₹{product.price.toLocaleString('en-IN')}
        </div>
        <div className="absolute bottom-3 left-3 bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-uppercase tracking-wider">
          {product.condition}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 h-10">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
              {product.sellerName.charAt(0)}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{product.sellerName}</span>
          </div>
          <button className="text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
