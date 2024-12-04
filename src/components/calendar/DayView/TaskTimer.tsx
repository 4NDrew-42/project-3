import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Timer } from 'lucide-react';
import type { Task } from '@/types/calendar';

interface TaskTimerProps {
  task: Task;
  onTimeUpdate: (taskId: string, timeSpent: number) => void;
}

export const TaskTimer: React.FC<TaskTimerProps> = ({ task, onTimeUpdate }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [localTimeSpent, setLocalTimeSpent] = useState(task.timeSpent || 0);

  const updateTime = useCallback(() => {
    const newTime = localTimeSpent + 1;
    setLocalTimeSpent(newTime);
    onTimeUpdate(task.id, newTime);
  }, [localTimeSpent, task.id, onTimeUpdate]);

  useEffect(() => {
    setLocalTimeSpent(task.timeSpent || 0);
  }, [task.timeSpent]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(updateTime, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, updateTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  return (
    <div className="flex items-center gap-2">
      <Timer className="h-4 w-4 text-gray-400" />
      <span className="font-mono text-sm">{formatTime(localTimeSpent)}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTimer}
        className="h-6 w-6 p-0"
      >
        {isRunning ? (
          <Pause className="h-4 w-4 text-red-500" />
        ) : (
          <Play className="h-4 w-4 text-green-500" />
        )}
      </Button>
    </div>
  );
};