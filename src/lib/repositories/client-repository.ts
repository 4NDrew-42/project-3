import db from '../db';
import type { Client } from '@/types/client';

export const ClientRepository = {
  create(client: Client) {
    const stmt = db.prepare(`
      INSERT INTO clients (id, name, email, company, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      client.id,
      client.name,
      client.email || null,
      client.company || null,
      client.createdAt.getTime(),
      client.updatedAt.getTime()
    );
  },

  findAll(): Client[] {
    const stmt = db.prepare('SELECT * FROM clients ORDER BY created_at DESC');
    const rows = stmt.all();
    
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      company: row.company,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    }));
  },

  findById(id: string): Client | null {
    const stmt = db.prepare('SELECT * FROM clients WHERE id = ?');
    const row = stmt.get(id);
    
    if (!row) return null;
    
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      company: row.company,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  },

  update(client: Client) {
    const stmt = db.prepare(`
      UPDATE clients 
      SET name = ?, email = ?, company = ?, updated_at = ?
      WHERE id = ?
    `);

    stmt.run(
      client.name,
      client.email || null,
      client.company || null,
      client.updatedAt.getTime(),
      client.id
    );
  },

  delete(id: string) {
    const stmt = db.prepare('DELETE FROM clients WHERE id = ?');
    stmt.run(id);
  }
};