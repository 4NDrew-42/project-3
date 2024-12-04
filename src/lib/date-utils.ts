import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay as _isSameDay, isPast as _isPast, addDays } from 'date-fns';

export const getDateKey = (date: Date): string => 
  new Date(date).toISOString().split('T')[0];

export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return _isSameDay(date1, new Date(date2));
};

export const formatDate = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${days[date.getDay()]} ${date.getDate()}`;
};

export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return _isPast(date) && !isSameDay(date, today);
};

export const getWeeks = (date: Date): Date[][] => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  
  const days = eachDayOfInterval({ start, end });
  const weeks: Date[][] = [];
  
  let currentWeek: Date[] = [];
  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  // If we have a partial last week, pad it
  if (currentWeek.length > 0) {
    const lastDay = currentWeek[currentWeek.length - 1];
    while (currentWeek.length < 7) {
      lastDay.setDate(lastDay.getDate() + 1);
      currentWeek.push(new Date(lastDay));
    }
    weeks.push(currentWeek);
  }
  
  // Ensure we always have 6 weeks for consistent height
  while (weeks.length < 6) {
    const lastWeek = weeks[weeks.length - 1];
    const nextWeek = lastWeek.map((day) => addDays(day, 7));
    weeks.push(nextWeek);
  }
  
  return weeks;
};