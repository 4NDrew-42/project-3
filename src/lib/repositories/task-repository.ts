import db from '../db';
import type { Task } from '@/types/calendar';

export const TaskRepository = {
  create(task: Task) {
    const stmt = db.prepare(`
      INSERT INTO tasks (
        id, title, completed, date, category, brick, client_id,
        time_spent, notes, start_time, end_time, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      task.id,
      task.title,
      task.completed ? 1 : 0,
      task.date.getTime(),
      task.category,
      task.brick,
      task.clientId || null,
      task.timeSpent || 0,
      task.notes || null,
      task.startTime || null,
      task.endTime || null,
      task.createdAt.getTime(),
      task.updatedAt.getTime()
    );
  },

  findAll(): Task[] {
    const stmt = db.prepare('SELECT * FROM tasks ORDER BY date DESC');
    const rows = stmt.all();
    
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      completed: Boolean(row.completed),
      date: new Date(row.date),
      category: row.category,
      brick: row.brick,
      clientId: row.client_id,
      timeSpent: row.time_spent,
      notes: row.notes,
      startTime: row.start_time,
      endTime: row.end_time,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  },

  findByDateRange(startDate: Date, endDate: Date): Task[] {
    const stmt = db.prepare(`
      SELECT * FROM tasks 
      WHERE date >= ? AND date <= ?
      ORDER BY date ASC
    `);
    
    const rows = stmt.all(startDate.getTime(), endDate.getTime());
    
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      completed: Boolean(row.completed),
      date: new Date(row.date),
      category: row.category,
      brick: row.brick,
      clientId: row.client_id,
      timeSpent: row.time_spent,
      notes: row.notes,
      startTime: row.start_time,
      endTime: row.end_time,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  },

  update(task: Task) {
    const stmt = db.prepare(`
      UPDATE tasks 
      SET title = ?, completed = ?, category = ?, brick = ?, 
          client_id = ?, time_spent = ?, notes = ?, start_time = ?,
          end_time = ?, updated_at = ?
      WHERE id = ?
    `);

    stmt.run(
      task.title,
      task.completed ? 1 : 0,
      task.category,
      task.brick,
      task.clientId || null,
      task.timeSpent || 0,
      task.notes || null,
      task.startTime || null,
      task.endTime || null,
      task.updatedAt.getTime(),
      task.id
    );
  },

  delete(id: string) {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    stmt.run(id);
  }
};