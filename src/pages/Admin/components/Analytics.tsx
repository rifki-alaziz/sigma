import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Eye,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Analytics: React.FC = () => {
  // Mock analytics data
  const analyticsData = {
    totalViews: 12543,
    uniqueVisitors: 3421,
    downloads: 567,
    activeUsers: 89,
    growthRate: 15.3,
    topPages: [
      { page: 'Dashboard', views: 2341, percentage: 18.7 },
      { page: 'Students', views: 1876, percentage: 15.0 },
      { page: 'Teachers', views: 1543, percentage: 12.3 },
      { page: 'Zakat Calculator', views: 1234, percentage: 9.8 },
      { page: 'Prayer Times', views: 987, percentage: 7.9 }
    ],
    userActivity: [
      { time: '00:00', users: 12 },
      { time: '04:00', users: 8 },
      { time: '08:00', users: 45 },
      { time: '12:00', users: 67 },
      { time: '16:00', users: 89 },
      { time: '20:00', users: 56 },
      { time: '24:00', users: 23 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">Monitor penggunaan dan performa aplikasi</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Eye size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+{analyticsData.growthRate}%</span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Views</h3>
          <p className="text-2xl font-bold text-gray-900">{analyticsData.totalViews.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+8.2%</span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Unique Visitors</h3>
          <p className="text-2xl font-bold text-gray-900">{analyticsData.uniqueVisitors.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Download size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Downloads</h3>
          <p className="text-2xl font-bold text-gray-900">{analyticsData.downloads.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+5.1%</span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Users</h3>
          <p className="text-2xl font-bold text-gray-900">{analyticsData.activeUsers}</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
            <PieChart size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{page.page}</span>
                    <span className="text-sm text-gray-500">{page.views.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Activity (24h)</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {analyticsData.userActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12">{activity.time}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(activity.users / 100) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-8">{activity.users}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Growth Trend</span>
            </div>
            <p className="text-xs text-blue-700">
              User engagement meningkat 15% dalam 30 hari terakhir. Fitur kalkulator zakat paling populer.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-900">User Behavior</span>
            </div>
            <p className="text-xs text-green-700">
              Peak usage terjadi pada jam 16:00-20:00. Pertimbangkan maintenance di luar jam tersebut.
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Content Performance</span>
            </div>
            <p className="text-xs text-orange-700">
              Artikel tentang tahapan santri mendapat engagement tertinggi. Buat konten serupa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;