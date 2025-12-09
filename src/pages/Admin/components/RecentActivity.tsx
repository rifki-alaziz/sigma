import React from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Settings,
  Clock
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'create' | 'edit' | 'delete' | 'view' | 'download' | 'upload' | 'settings';
  title: string;
  description: string;
  user: string;
  timestamp: string;
}

const RecentActivity: React.FC = () => {
  // Mock data - in real app, fetch from API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'create',
      title: 'Mahasantri Baru Ditambahkan',
      description: 'Ahmad Fulan bin Abdullah telah didaftarkan',
      user: 'Admin',
      timestamp: '2 menit yang lalu'
    },
    {
      id: '2',
      type: 'edit',
      title: 'Data Mustahiq Diperbarui',
      description: 'Ust. Ahmad Zaki - informasi kontak diperbarui',
      user: 'Admin',
      timestamp: '15 menit yang lalu'
    },
    {
      id: '3',
      type: 'download',
      title: 'Laporan Diunduh',
      description: 'Laporan data santri bulan ini',
      user: 'Admin',
      timestamp: '1 jam yang lalu'
    },
    {
      id: '4',
      type: 'delete',
      title: 'Data Dihapus',
      description: 'Santri tidak aktif dihapus dari sistem',
      user: 'Admin',
      timestamp: '2 jam yang lalu'
    },
    {
      id: '5',
      type: 'settings',
      title: 'Pengaturan Diubah',
      description: 'Konfigurasi sistem diperbarui',
      user: 'Super Admin',
      timestamp: '3 jam yang lalu'
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'create': return UserPlus;
      case 'edit': return Edit;
      case 'delete': return Trash2;
      case 'view': return Eye;
      case 'download': return Download;
      case 'upload': return Upload;
      case 'settings': return Settings;
      default: return Clock;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'create': return 'bg-green-100 text-green-600';
      case 'edit': return 'bg-blue-100 text-blue-600';
      case 'delete': return 'bg-red-100 text-red-600';
      case 'view': return 'bg-gray-100 text-gray-600';
      case 'download': return 'bg-purple-100 text-purple-600';
      case 'upload': return 'bg-orange-100 text-orange-600';
      case 'settings': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                <Icon size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">{activity.user}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;