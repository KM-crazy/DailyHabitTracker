import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Palette } from 'lucide-react';

interface SettingsProps {
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export function Settings({ theme, onThemeChange }: SettingsProps) {
  const [notifications, setNotifications] = useState(false);
  const [accentColor, setAccentColor] = useState('#4F46E5');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium dark:text-white">Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get reminded of your habits</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium dark:text-white">Theme</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
              </div>
            </div>
            <select 
              className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as 'light' | 'dark' | 'system')}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium dark:text-white">Accent Color</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose your accent color</p>
              </div>
            </div>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}