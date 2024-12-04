export interface Client {
  id: string;
  name: string;
  email?: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  clientId: string;
  taskId: string;
  date: Date;
  duration: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientTimesheet {
  clientId: string;
  entries: TimeEntry[];
  totalDuration: number;
}