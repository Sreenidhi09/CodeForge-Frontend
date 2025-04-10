import React from 'react';
import { motion } from 'framer-motion';

const BadgeWithProgress = ({ xp }) => {
  let badge = {
    label: '🥉 Bronze',
    pillBg: 'bg-yellow-100',
    text: 'text-yellow-700',
    range: [0, 49],
  };
  
  if (xp >= 80) {
    badge = {
      label: '🥇 Gold',
      pillBg: 'bg-yellow-200',
      text: 'text-yellow-800',
      range: [80, 100],
    };
  } else if (xp >= 50) {
    badge = {
      label: '🥈 Silver',
      pillBg: 'bg-gray-200',
      text: 'text-gray-800',
      range: [50, 79],
    };
  }
  
  const [lower, upper] = badge.range;
  const progress = Math.min(((xp - lower) / (upper - lower)) * 100, 100).toFixed(0);
  
  return (
    <div className="space-y-2">
      <div
        className={`inline-block px-4 py-2 rounded-full font-medium text-sm border ${badge.text} ${badge.pillBg} border-opacity-60 border-gray-400`}
      >
        <span className="font-semibold">Badge:</span> {badge.label} ({xp} XP)
      </div>
      <div>
        <div className="text-sm text-gray-600 mb-1">Progress to next badge</div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-green-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="text-sm mt-1 text-gray-700 font-medium">{progress}% Complete</div>
      </div>
    </div>
  );
};

export default BadgeWithProgress;