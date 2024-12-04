import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MonthNavigationProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({
  currentDate,
  onNavigate
}) => {
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('prev')}
        className="text-gray-500 hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <h2 className="text-2xl font-bold text-gray-800">
        {month} {year}
      </h2>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('next')}
        className="text-gray-500 hover:text-gray-700"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};