import React from 'react';
import { format } from 'date-fns';

interface DayViewHeaderProps {
  selectedDate: Date;
}

export const DayViewHeader: React.FC<DayViewHeaderProps> = ({ selectedDate }) => {
  return (
    <div className="border-b pb-4">
      <h2 className="text-2xl font-bold text-gray-800">
        {format(selectedDate, 'EEEE')}
      </h2>
      <p className="text-gray-500">
        {format(selectedDate, 'MMMM d, yyyy')}
      </p>
    </div>
  );
};