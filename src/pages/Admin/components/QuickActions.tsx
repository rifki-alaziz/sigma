import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  GraduationCap,
  Users,
  FileText,
  Download,
  Upload,
  Settings,
  Database
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Tambah Mahasantri',
      description: 'Daftarkan santri baru',
      icon: GraduationCap,
      color: 'bg-blue-500',
      onClick: () => navigate('/students/add')
    },
    {
      title: 'Tambah Mustahiq',
      description: 'Daftarkan guru baru',
      icon: Users,
      color: 'bg-green-500',
      onClick: () => navigate('/teachers/add')
    },
    {
      title: 'Kelola User',
      description: 'Atur akses pengguna',
      icon: UserPlus,
      color: 'bg-purple-500',
      onClick: () => console.log('User management')
    },
    {
      title: 'Export Data',
      description: 'Download laporan',
      icon: Download,
      color: 'bg-orange-500',
      onClick: () => console.log('Export data')
    },
    {
      title: 'Import Data',
      description: 'Upload data bulk',
      icon: Upload,
      color: 'bg-cyan-500',
      onClick: () => console.log('Import data')
    },
    {
      title: 'Backup System',
      description: 'Cadangkan database',
      icon: Database,
      color: 'bg-red-500',
      onClick: () => console.log('Backup system')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.button
              key={index}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;