import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  loading = false
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 ${color} opacity-10 rounded-bl-full`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
            <Icon size={24} className="text-white" />
          </div>
          {trend && (
            <span className={`text-sm font-medium ${
              trend.includes('+') ? 'text-green-600' : 'text-blue-600'
            }`}>
              {trend}
            </span>
          )}
        </div>
        
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        
        {loading ? (
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        ) : (
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;