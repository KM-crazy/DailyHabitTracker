import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar() {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentMonth} {currentYear}
        </h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map(day => (
          <div key={day} className="text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => {
          const isToday = i + 1 === today.getDate();
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className={`aspect-square flex items-center justify-center rounded-full text-sm
                ${isToday ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
            >
              {i + 1}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}