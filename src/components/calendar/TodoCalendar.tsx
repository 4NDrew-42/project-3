import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeekRow } from './WeekRow';
import { CategorySelector } from './CategorySelector';
import { TaskInput } from './TaskInput';
import { MonthNavigation } from './MonthNavigation';
import { DayView } from './DayView/DayView';
import { ClientSection } from '../clients/ClientSection';
import { getWeeks, getDateKey, isSameDay, isPastDate } from '@/lib/date-utils';
import { CATEGORIES, DEFAULT_BRICKS } from '@/constants/categories';
import type { Task, TimeBlockSelection, ExtraBricks } from '@/types/calendar';
import type { Client, TimeEntry } from '@/types/client';

export const TodoCalendar: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ongoingTasks, setOngoingTasks] = useState<Task[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<TimeBlockSelection | null>(null);
  const [extraBricks, setExtraBricks] = useState<ExtraBricks>({});
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());

  const currentDate = new Date();
  const allWeeks = useMemo(() => getWeeks(selectedDate), [selectedDate]);

  const currentWeekIndex = useMemo(() => {
    return allWeeks.findIndex(week => 
      week.some(day => isSameDay(day, currentDate))
    );
  }, [allWeeks, currentDate]);

  useEffect(() => {
    setExpandedWeeks(new Set([currentWeekIndex]));
  }, [currentWeekIndex]);

  const addClient = (name: string) => {
    const newClient: Client = {
      id: Date.now().toString(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setClients(prev => [...prev, newClient]);
  };

  const addOngoingTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      date: new Date(),
      category: 'work',
      brick: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      timeSpent: 0,
      clientId: selectedClientId
    };
    setOngoingTasks(prev => [...prev, newTask]);
  };

  const toggleOngoingTask = (taskId: string) => {
    setOngoingTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  };

  const addTask = () => {
    if (!newTask.trim() || !selectedCategory || !selectedBlock) return;
    
    setTasks(prev => [...prev, {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      date: selectedBlock.date,
      category: selectedCategory,
      brick: selectedBlock.brickId,
      createdAt: new Date(),
      updatedAt: new Date(),
      timeSpent: 0,
      notes: '',
      startTime: '',
      endTime: '',
      clientId: selectedClientId || undefined,
    }]);
    
    setNewTask('');
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  };

  const updateTaskTime = (taskId: string, timeSpent: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.clientId) return;

    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? { ...t, timeSpent, updatedAt: new Date() }
        : t
    ));

    // Update time entries
    const existingEntry = timeEntries.find(entry => 
      entry.taskId === taskId && 
      entry.clientId === task.clientId
    );

    if (existingEntry) {
      setTimeEntries(prev => prev.map(entry =>
        entry.id === existingEntry.id
          ? { ...entry, duration: timeSpent, updatedAt: new Date() }
          : entry
      ));
    } else {
      setTimeEntries(prev => [...prev, {
        id: Date.now().toString(),
        clientId: task.clientId!,
        taskId,
        date: task.date,
        duration: timeSpent,
        notes: task.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    }
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, ...updates }
        : task
    ));
  };

  const handleClientSelect = (taskId: string, clientId: string) => {
    updateTask(taskId, { clientId });
  };

  const addBrick = (date: Date) => {
    const dateKey = getDateKey(date);
    setExtraBricks(prev => ({
      ...prev,
      [dateKey]: Math.min(2, (prev[dateKey] || 0) + 1)
    }));
  };

  const handleMonthNavigation = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
    setExpandedWeeks(new Set());
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      <div className="flex gap-6">
        <ClientSection
          clients={clients}
          timeEntries={timeEntries}
          ongoingTasks={ongoingTasks}
          onAddClient={addClient}
          onSelectClient={setSelectedClientId}
          selectedClientId={selectedClientId}
          onAddOngoingTask={addOngoingTask}
          onToggleOngoingTask={toggleOngoingTask}
        />

        <div className="flex-1">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <MonthNavigation 
                  currentDate={selectedDate}
                  onNavigate={handleMonthNavigation}
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (selectedBlock) {
                      const dateKey = getDateKey(selectedBlock.date);
                      setTasks(prev => prev.filter(task => 
                        !task.completed || 
                        !isSameDay(new Date(task.date), selectedBlock.date) || 
                        task.brick !== selectedBlock.brickId
                      ));
                      
                      if (selectedBlock.brickId > DEFAULT_BRICKS.length) {
                        setExtraBricks(prev => {
                          const currentCount = prev[dateKey] || 0;
                          if (currentCount <= 0) return prev;
                          
                          if (currentCount <= 1) {
                            const { [dateKey]: _, ...rest } = prev;
                            return rest;
                          }
                          
                          return {
                            ...prev,
                            [dateKey]: currentCount - 1
                          };
                        });
                        setSelectedBlock(null);
                      }
                    }
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  disabled={!selectedBlock}
                >
                  Clear Completed
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <TaskInput
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onSubmit={addTask}
                  disabled={!selectedBlock}
                  placeholder={selectedBlock ? "Add new task..." : "Select a time block first..."}
                />
                
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>

              <div className="space-y-4 relative">
                {allWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="overflow-hidden pl-8">
                    <div className={`transition-all duration-300 ease-in-out
                      ${expandedWeeks.has(weekIndex) ? 'max-h-[800px]' : 'max-h-14'}`}>
                      <WeekRow
                        days={week}
                        isExpanded={expandedWeeks.has(weekIndex)}
                        isCurrentWeek={weekIndex === currentWeekIndex}
                        isPastWeek={week.every(day => isPastDate(day))}
                        currentDate={currentDate}
                        onToggle={() => {
                          setExpandedWeeks(prev => {
                            const next = new Set(prev);
                            if (next.has(weekIndex)) {
                              next.delete(weekIndex);
                            } else {
                              next.add(weekIndex);
                            }
                            return next;
                          });
                        }}
                        selectedBlock={selectedBlock}
                        tasks={tasks}
                        extraBricks={extraBricks}
                        onSelectBlock={(date, brickId) => setSelectedBlock({ date, brickId })}
                        onToggleTask={toggleTask}
                        onAddBrick={addBrick}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DayView
          selectedDate={selectedBlock?.date || null}
          tasks={tasks}
          clients={clients}
          onToggleTask={toggleTask}
          onTimeUpdate={updateTaskTime}
          onTaskUpdate={updateTask}
          onClientSelect={handleClientSelect}
        />
      </div>
    </div>
  );
};