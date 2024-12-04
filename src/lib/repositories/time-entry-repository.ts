import db from '../db';
import type { TimeEntry } from '@/types/client';

export const TimeEntryRepository = {
  create(entry: TimeEntry) {
    const stmt = db.prepare(`
      INSERT INTO time_entries (
        id, client_id, task_id, date, duration,
        notes, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      entry.id,
      entry.clientId,
      entry.taskId,
      entry.date.getTime(),
      entry.duration,
      entry.notes || null,
      entry.createdAt.getTime(),
      entry.updatedAt.getTime()
    );
  },

  findByClientId(clientId: string): TimeEntry[] {
    const stmt = db.prepare(`
      SELECT * FROM time_entries 
      WHERE client_id = ?
      ORDER BY date DESC
    `);
    
    const rows = stmt.all(clientId);
    
    return rows.map(row => ({
      id: row.id,
      clientId: row.client_id,
      taskId: row.task_id,
      date: new Date(row.date),
      duration: row.duration,
      notes: row.notes,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  },

  update(entry: TimeEntry) {
    const stmt = db.prepare(`
      UPDATE time_entries 
      SET duration = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `);

    stmt.run(
      entry.duration,
      entry.notes || null,
      entry.updatedAt.getTime(),
      entry.id
    );
  },

  delete(id: string) {
    const stmt = db.prepare('DELETE FROM time_entries WHERE id = ?');
    stmt.run(id);
  }
};