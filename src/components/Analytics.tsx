import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Calendar as CalendarIcon } from 'lucide-react';
import type { Habit } from '../types';

interface AnalyticsProps {
  habits: Habit[];
}

export function Analytics({ habits }: AnalyticsProps) {
  const totalStreak = habits.reduce((acc, habit) => acc + habit.streak, 0);
  const bestStreak = Math.max(...habits.map(habit => habit.streak));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Total Habits</p>
              <p className="text-2xl font-bold">{habits.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Total Streak</p>
              <p className="text-2xl font-bold">{totalStreak} days</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8" />
            <div>
              <p className="text-sm opacity-90">Best Streak</p>
              <p className="text-2xl font-bold">{bestStreak} days</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Habit Progress</h3>
        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit.id}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{habit.name}</span>
                <span className="text-sm text-gray-600">{habit.streak} days</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(habit.streak / 30) * 100}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: habit.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}