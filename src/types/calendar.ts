export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  category: keyof typeof import('../constants/categories').CATEGORIES;
  brick: number;
  createdAt: Date;
  updatedAt: Date;
  timeSpent?: number;
  notes?: string;
  startTime?: string;
  endTime?: string;
  clientId?: string;
}

export interface TimeBlockSelection {
  date: Date;
  brickId: number;
}

export interface Brick {
  id: number;
  name: string;
  time: string;
}

export interface ExtraBricks {
  [key: string]: number;
}