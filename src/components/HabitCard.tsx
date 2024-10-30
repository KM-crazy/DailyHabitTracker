import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
import type { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  isCompleted: boolean;
}

export function HabitCard({ habit, onToggle, onEdit, onDelete, isCompleted }: HabitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-4 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-80"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{habit.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{habit.description}</p>
          <div className="flex items-center mt-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Current streak: {habit.streak} days
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(habit)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Edit2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(habit.id)}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1, rotate: isCompleted ? 360 : 0 }}
            onClick={() => onToggle(habit.id)}
            className={`ml-4 p-2 rounded-full transition-colors transform-gpu ${
              isCompleted ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <Circle className="w-8 h-8" />
            )}
          </motion.button>
        </div>
      </div>
      <div className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(habit.streak / 30) * 100}%` }}
          className="h-full"
          style={{ backgroundColor: habit.color }}
        />
      </div>
    </motion.div>
  );
}