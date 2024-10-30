import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BarChart3, Calendar as CalendarIcon, Settings as SettingsIcon } from 'lucide-react';
import { HabitCard } from './components/HabitCard';
import { AddHabitModal } from './components/AddHabitModal';
import { Calendar } from './components/Calendar';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import type { Habit } from './types';

type View = 'today' | 'analytics' | 'settings';

function App() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Morning Meditation',
      description: '10 minutes of mindfulness to start the day',
      color: '#4F46E5',
      streak: 5,
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<View>('today');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark' | 'system') || 'system';
  });
  
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const lastChecked = localStorage.getItem('lastChecked');
    if (lastChecked !== today) {
      setCompletedHabits([]);
      localStorage.setItem('lastChecked', today);
    }
  }, [today]);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = theme === 'system' ? systemTheme : theme;
    
    if (activeTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleAddHabit = ({ name, description, color }: { name: string; description: string; color: string }) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      description,
      color,
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    setHabits([...habits, newHabit]);
  };

  const handleEditHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(h => h.id === updatedHabit.id ? updatedHabit : h));
    setEditingHabit(null);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
    
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              streak: completedHabits.includes(id)
                ? habit.streak - 1
                : habit.streak + 1,
            }
          : habit
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              DailyDash
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Habit
            </motion.button>
          </div>
          <nav className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            <button 
              onClick={() => setCurrentView('today')}
              className={`flex items-center gap-2 ${
                currentView === 'today' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
              Today
            </button>
            <button 
              onClick={() => setCurrentView('analytics')}
              className={`flex items-center gap-2 ${
                currentView === 'analytics' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </button>
            <button 
              onClick={() => setCurrentView('settings')}
              className={`flex items-center gap-2 ${
                currentView === 'settings' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              Settings
            </button>
          </nav>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {currentView === 'today' && (
              <motion.div
                key="today"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Calendar />
                <div className="space-y-4">
                  {habits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onToggle={toggleHabit}
                      onEdit={() => setEditingHabit(habit)}
                      onDelete={handleDeleteHabit}
                      isCompleted={completedHabits.includes(habit.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {currentView === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Analytics habits={habits} />
              </motion.div>
            )}

            {currentView === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Settings theme={theme} onThemeChange={setTheme} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <AddHabitModal
        isOpen={isModalOpen || !!editingHabit}
        onClose={() => {
          setIsModalOpen(false);
          setEditingHabit(null);
        }}
        onAdd={handleAddHabit}
        onEdit={handleEditHabit}
        habit={editingHabit}
      />
    </div>
  );
}

export default App;