import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, BookOpen, Settings, ChartBar as BarChart3, Shield, Database, Activity, TrendingUp, UserCheck, FileText, Calendar, Bell, Download, Upload, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Components
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import UserManagement from './components/UserManagement';
import ContentManagement from './components/ContentManagement';
import SystemSettings from './components/SystemSettings';
import Analytics from './components/Analytics';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  systemHealth: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalContent: 0,
    systemHealth: 98
  });
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL;
        const TOKEN = import.meta.env.VITE_API_TOKEN;

        // Fetch all data in parallel
        const [studentsRes, teachersRes] = await Promise.all([
          fetch(`${API_URL}/api/students`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
          }),
          fetch(`${API_URL}/api/teachers`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
          })
        ]);

        const students = await studentsRes.json();
        const teachers = await teachersRes.json();

        setStats({
          totalStudents: Array.isArray(students) ? students.length : 0,
          totalTeachers: Array.isArray(teachers) ? teachers.length : 0,
          totalUsers: 156, // Mock data
          activeUsers: 89, // Mock data
          totalContent: 45, // Mock data
          systemHealth: 98
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Mahasantri"
                value={stats.totalStudents}
                icon={GraduationCap}
                color="bg-blue-500"
                trend="+12%"
                loading={loading}
              />
              <StatsCard
                title="Total Mustahiq"
                value={stats.totalTeachers}
                icon={Users}
                color="bg-green-500"
                trend="+5%"
                loading={loading}
              />
              <StatsCard
                title="Active Users"
                value={stats.activeUsers}
                icon={UserCheck}
                color="bg-purple-500"
                trend="+8%"
                loading={loading}
              />
              <StatsCard
                title="System Health"
                value={`${stats.systemHealth}%`}
                icon={Activity}
                color="bg-emerald-500"
                trend="Excellent"
                loading={loading}
              />
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return null;
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Kelola sistem dan monitor aktivitas</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <RefreshCw size={20} />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;