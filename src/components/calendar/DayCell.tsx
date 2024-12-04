import React from 'react';
import { TimeBlock } from './TimeBlock';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { formatDate, isSameDay } from '@/lib/date-utils';
import { DEFAULT_BRICKS } from '@/constants/categories';
import type { Task, TimeBlockSelection, ExtraBricks } from '@/types/calendar';

interface DayCellProps {
  day: Date;
  isExpanded: boolean;
  isCurrentDay: boolean;
  isPast: boolean;
  tasks: Task[];
  selectedBlock: TimeBlockSelection | null;
  onSelectBlock: (date: Date, brickId: number) => void;
  onToggleTask: (taskId?: string) => void;
  extraBricks: ExtraBricks;
  onAddBrick: (date: Date) => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  day,
  isExpanded,
  isCurrentDay,
  isPast,
  tasks,
  selectedBlock,
  onSelectBlock,
  onToggleTask,
  extraBricks,
  onAddBrick
}) => {
  const dateKey = day.toISOString().split('T')[0];
  const extraBricksCount = extraBricks[dateKey] || 0;
  const canAddBrick = extraBricksCount < 2;

  const allBricks = [
    ...DEFAULT_BRICKS,
    ...Array.from({ length: extraBricksCount }, (_, i) => ({
      id: DEFAULT_BRICKS.length + i + 1,
      name: `Block ${i + 1}`,
      time: `Block ${i + 1}`
    }))
  ];

  return (
    <div 
      className={`border rounded-lg transition-all duration-300
        ${isExpanded ? 'p-2' : 'py-1 px-2'}
        ${isPast ? 'bg-gray-100' : ''}
        ${isCurrentDay ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className={`font-semibold ${isExpanded ? 'mb-2' : ''} 
        ${isCurrentDay ? 'text-blue-600' : ''}
        ${isPast ? 'text-gray-500' : ''}`}>
        {formatDate(day)}
      </div>
      
      {isExpanded && (
        <div className="space-y-2">
          {allBricks.map(brick => (
            <TimeBlock
              key={brick.id}
              brick={brick}
              tasks={tasks.filter(task => task.brick === brick.id)}
              isSelected={selectedBlock && 
                isSameDay(selectedBlock.date, day) && 
                selectedBlock.brickId === brick.id}
              onSelect={() => onSelectBlock(day, brick.id)}
              onAddTask={onToggleTask}
            />
          ))}
          {canAddBrick && (
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full h-8 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                onAddBrick(day);
              }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};