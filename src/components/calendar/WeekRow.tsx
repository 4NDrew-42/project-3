import React from 'react';
import { DayCell } from './DayCell';
import { isSameDay, isPastDate } from '@/lib/date-utils';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { Task, TimeBlockSelection, ExtraBricks } from '@/types/calendar';

interface WeekRowProps {
  days: Date[];
  isExpanded: boolean;
  isCurrentWeek: boolean;
  isPastWeek: boolean;
  currentDate: Date;
  onToggle: () => void;
  selectedBlock: TimeBlockSelection | null;
  tasks: Task[];
  extraBricks: ExtraBricks;
  onSelectBlock: (date: Date, brickId: number) => void;
  onToggleTask: (taskId?: string) => void;
  onAddBrick: (date: Date) => void;
}

export const WeekRow: React.FC<WeekRowProps> = ({
  days,
  isExpanded,
  isCurrentWeek,
  isPastWeek,
  currentDate,
  onToggle,
  selectedBlock,
  tasks,
  extraBricks,
  onSelectBlock,
  onToggleTask,
  onAddBrick
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="absolute -left-6 top-2.5 text-gray-400 hover:text-gray-600 
        transition-transform duration-200 transform"
    >
      {isExpanded ? 
        <ChevronDown className="h-3 w-3" /> : 
        <ChevronRight className="h-3 w-3" />
      }
    </button>
    <div 
      className={`grid grid-cols-7 gap-2 auto-rows-min rounded-lg
        ${isPastWeek ? 'opacity-60' : ''} 
        ${isCurrentWeek ? 'bg-blue-50/20' : ''}`}
    >
      {days.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          isExpanded={isExpanded}
          isCurrentDay={isSameDay(day, currentDate)}
          isPast={isPastDate(day)}
          tasks={tasks.filter(task => isSameDay(new Date(task.date), day))}
          selectedBlock={selectedBlock}
          onSelectBlock={onSelectBlock}
          onToggleTask={onToggleTask}
          extraBricks={extraBricks}
          onAddBrick={onAddBrick}
        />
      ))}
    </div>
  </div>
);