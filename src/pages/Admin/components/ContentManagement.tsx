import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Video, BookOpen, Plus, CreditCard as Edit, Trash2, Eye, Upload, Download, Search, ListFilter as Filter } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'image' | 'video' | 'document';
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  views?: number;
}

const ContentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'article' | 'image' | 'video' | 'document'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');

  // Mock data
  const content: ContentItem[] = [
    {
      id: '1',
      title: 'Tingkat I: Tahap Adaptasi',
      type: 'article',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      views: 156
    },
    {
      id: '2',
      title: 'Galeri Kegiatan Santri',
      type: 'image',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      views: 89
    },
    {
      id: '3',
      title: 'Video Takbiran Idul Adha',
      type: 'video',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13',
      views: 234
    },
    {
      id: '4',
      title: 'Panduan Istigosah',
      type: 'document',
      status: 'draft',
      author: 'Admin',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    }
  ];

  const getContentIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'document': return BookOpen;
      default: return FileText;
    }
  };

  const getContentColor = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-600';
      case 'image': return 'bg-green-100 text-green-600';
      case 'video': return 'bg-red-100 text-red-600';
      case 'document': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
          <p className="text-gray-600">Kelola artikel, media, dan dokumen</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Upload size={18} />
            Upload
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Add Content
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="article">Articles</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
              </select>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item, index) => {
          const Icon = getContentIcon(item.type);
          const colorClass = getContentColor(item.type);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{item.author}</span>
                <span>{item.createdAt}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'published' ? 'bg-green-100 text-green-700' :
                  item.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
                
                {item.views && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye size={12} />
                    {item.views}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;