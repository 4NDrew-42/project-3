import React from 'react';
import { CATEGORIES } from '@/constants/categories';

interface CategorySelectorProps {
  selectedCategory: keyof typeof CATEGORIES | null;
  onSelectCategory: (category: keyof typeof CATEGORIES) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => (
  <div className="flex gap-2 flex-wrap">
    {Object.entries(CATEGORIES).map(([key, { name, color }]) => (
      <button
        key={key}
        onClick={() => onSelectCategory(key as keyof typeof CATEGORIES)}
        className={`px-3 py-1 rounded border text-gray-700 transition-all ${
          key === selectedCategory ? 
          `${color} border-gray-400 ring-2 ring-gray-200` : 
          `bg-white ${color.replace('bg-', 'hover:bg-')} border-gray-200`
        }`}
      >
        {name}
      </button>
    ))}
  </div>
);