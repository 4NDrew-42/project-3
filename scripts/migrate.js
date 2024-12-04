import { initializeDatabase } from '../src/lib/db.js';

console.log('Running database migrations...');
initializeDatabase();
console.log('Database migrations completed successfully.');