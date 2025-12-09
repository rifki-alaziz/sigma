import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, GraduationCap, MapPin } from 'lucide-react';
import { Teacher } from '../types';
import { useAuth } from '../context/AuthContext';
import { getData } from '../api/api';

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    getData<Teacher[]>("/api/teachers").then((data) => {
      if (data) setTeachers(data);
    });
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const name = teacher.name || "";
    const fatherName = teacher.fatherName || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fatherName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 pb-24 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Data Mustahiq</h1>
          <p className="text-xs text-gray-500">Kelola data guru / mustahiq</p>
        </div>

        {/* Tambah */}
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/teachers/add')}
            className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
            title="Tambah Mustahiq"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari guru..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-[24px] shadow-sm text-sm text-[#1e1e1e] focus:ring-2 focus:ring-green-200 focus:outline-none placeholder:text-gray-400 transition-all"
        />
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            onClick={() => navigate(`/teachers/${teacher.id}`)}
            className="bg-white p-3 rounded-[28px] shadow-sm hover:shadow-md transition-all cursor-pointer border border-white/40 relative overflow-hidden group"
          >
            <div className="relative h-32 w-full rounded-[20px] overflow-hidden mb-3">
              <img
                src={teacher.photo || 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={teacher.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400?text=Error'; }}
              />
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-[9px] font-bold bg-green-600 text-white shadow-sm">
                Guru
              </div>
            </div>

            <div className="px-1 mb-1">
              <h3 className="text-sm font-bold text-[#1e1e1e] truncate mb-1">{teacher.name}</h3>
              <div className="flex items-center text-[10px] text-gray-500 mb-1">
                <span className="opacity-70 mr-1">Ayah:</span>
                <span className="font-medium truncate">{teacher.fatherName}</span>
              </div>
              <div className="flex items-center text-[10px] text-gray-400 mb-2">
                <MapPin size={10} className="mr-1 flex-shrink-0" />
                <span className="truncate">{teacher.address}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <GraduationCap size={12} className="text-gray-400" />
                  <span>{new Date(teacher.birthDate).toLocaleDateString('id-ID')}</span>
                </div>
                <span className="text-green-600 font-bold text-xs">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12 bg-white/50 rounded-[32px] border border-dashed border-gray-300">
          <GraduationCap size={32} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-gray-600 mb-1">Tidak ada guru ditemukan</h3>
          <p className="text-xs text-gray-400">Coba ubah kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
};

export default Teachers;
