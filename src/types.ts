export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  streak: number;
  completedDates: string[];
  createdAt: string;
}

export interface HabitLog {
  date: string;
  completed: boolean;
}