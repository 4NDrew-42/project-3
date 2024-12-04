import React from 'react';
import { Task } from './Task';
import type { Task as TaskType } from '@/types/calendar';
import type { Brick } from '@/types/calendar';

interface TimeBlockProps {
  brick: Brick;
  tasks: TaskType[];
  isSelected: boolean;
  onSelect: () => void;
  onAddTask: (taskId?: string) => void;
}

export const TimeBlock: React.FC<TimeBlockProps> = ({
  brick,
  tasks,
  isSelected,
  onSelect,
  onAddTask,
}) => (
  <div 
    onClick={(e) => {
      e.stopPropagation();
      onSelect();
    }}
    className={`mb-2 p-2 border-t cursor-pointer transition-colors
      ${isSelected ? 'bg-gray-100 ring-2 ring-gray-300' : 'hover:bg-gray-50'}`}
  >
    <div className="text-[10px] text-gray-400">{brick.time}</div>
    <div className="min-h-[2.5rem] space-y-1">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onToggle={() => onAddTask(task.id)}
        />
      ))}
    </div>
  </div>
);