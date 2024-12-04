export const CATEGORIES = {
  personal: { name: 'Personal', color: 'bg-purple-100 border-purple-300 hover:bg-purple-200' },
  family: { name: 'Family', color: 'bg-green-100 border-green-300 hover:bg-green-200' },
  work: { name: 'Work', color: 'bg-blue-100 border-blue-300 hover:bg-blue-200' },
  fit: { name: 'Fitness', color: 'bg-orange-100 border-orange-300 hover:bg-orange-200' },
  learn: { name: 'Learning', color: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200' },
  outreach: { name: 'Outreach', color: 'bg-pink-100 border-pink-300 hover:bg-pink-200' },
  art: { name: 'Art', color: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200' }
} as const;

export const DEFAULT_BRICKS = [
  { id: 1, name: 'Morning', time: 'AM' },
  { id: 2, name: 'Afternoon', time: 'PM' }
] as const;