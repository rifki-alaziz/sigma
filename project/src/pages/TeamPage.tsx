import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Phone, 
  Instagram, 
  Crown,       
  BookOpen,    
  FileCode,    
  Book,        
  Scroll,      
  History,     
  Sparkles,    
  MapPin,      
  Layout,      
  Users,       
  ChevronRight,
  User,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TIPE DATA ---
type DivisionType = 
  | 'pusat' 
  | 'fk_ilmiyah' 
  | 'kodifikasi' 
  | 'pembukuan' 
  | 'izajahan' 
  | 'memori' 
  | 'roan' 
  | 'jiaroh' 
  | 'mading' 
  | 'm3hm';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: DivisionType;
  photo?: string;
  whatsapp?: string;
  instagram?: string;
}

// --- CONFIG DIVISI ---
const DIVISION_CONFIG: Record<DivisionType, { label: string; icon: React.ReactNode; color: string }> = {
  pusat:       { label: 'Pusat', icon: <Crown size={24} />, color: 'bg-yellow-500' },
  fk_ilmiyah:  { label: 'F. Kajian Ilmiyah', icon: <BookOpen size={24} />, color: 'bg-blue-500' },
  kodifikasi:  { label: 'Lembaga Itihadul Mubalighin', icon: <FileCode size={24} />, color: 'bg-cyan-500' },
  pembukuan:   { label: 'Kurasan', icon: <Book size={24} />, color: 'bg-emerald-500' },
  izajahan:    { label: 'Izajahan', icon: <Scroll size={24} />, color: 'bg-amber-600' },
  memori:      { label: 'Sigma', icon: <History size={24} />, color: 'bg-purple-500' },
  roan:        { label: 'Ababil', icon: <Sparkles size={24} />, color: 'bg-pink-500' },
  jiaroh:      { label: 'Bahjah', icon: <MapPin size={24} />, color: 'bg-red-500' },
  mading:      { label: 'Nafahat', icon: <Layout size={24} />, color: 'bg-orange-500' },
  m3hm:        { label: 'M3HM', icon: <Users size={24} />, color: 'bg-indigo-500' },
};

// --- DUMMY DATA ---
const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Gus Nabil', role: 'Ketua Umum', division: 'pusat', photo: 'https://img.freepik.com/free-photo/portrait-young-arab-man_23-2148439366.jpg' },
  { id: '2', name: 'Ust. Ahmad Zaki', role: 'Koordinator', division: 'fk_ilmiyah', photo: 'https://img.freepik.com/free-photo/muslim-man-posing-gracefully_23-2148766624.jpg' },
  { id: '3', name: 'Kang Santri IT', role: 'Tim Digital', division: 'kodifikasi', photo: 'https://img.freepik.com/free-photo/young-muslim-man_23-2148766632.jpg' },
  { id: '4', name: 'Mbak Admin', role: 'Sekretaris', division: 'pembukuan', photo: 'https://img.freepik.com/free-photo/beautiful-muslim-woman-wearing-hijab_23-2148439383.jpg' },
  { id: '5', name: 'Kang Ijazah', role: 'Sanad Dept', division: 'izajahan', photo: 'https://img.freepik.com/free-photo/senior-man-wearing-traditional-clothes_23-2148439401.jpg' },
  { id: '6', name: 'Sie Dokumentasi', role: 'Arsiparis', division: 'memori', photo: 'https://img.freepik.com/free-photo/man-with-camera_23-2148439390.jpg' },
  { id: '7', name: 'Koord. Kebersihan', role: 'Kepala Roan', division: 'roan', photo: 'https://img.freepik.com/free-photo/happy-young-man_23-2148439370.jpg' },
  { id: '8', name: 'Tim Ziarah', role: 'Pemandu', division: 'jiaroh', photo: 'https://img.freepik.com/free-photo/serious-man_23-2148439380.jpg' },
  { id: '9', name: 'Editor Mading', role: 'Jurnalis', division: 'mading', photo: 'https://img.freepik.com/free-photo/woman-writing_23-2148439395.jpg' },
  { id: '10', name: 'Ketua M3HM', role: 'Koordinator', division: 'm3hm', photo: 'https://img.freepik.com/free-photo/man-traditional-clothes_23-2148439410.jpg' },
];

const TeamPage = () => {
  const navigate = useNavigate();
  const [selectedDivision, setSelectedDivision] = useState<DivisionType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // --- LOGIC FILTER ---
  const isSearching = searchTerm.length > 0;
  
  let displayedMembers = TEAM_MEMBERS;

  if (isSearching) {
    displayedMembers = TEAM_MEMBERS.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (selectedDivision) {
    displayedMembers = TEAM_MEMBERS.filter(m => m.division === selectedDivision);
  } else {
    displayedMembers = [];
  }

  const getCount = (div: DivisionType) => TEAM_MEMBERS.filter(m => m.division === div).length;

  return (
    <div className="p-6 pb-24 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
            <button 
                onClick={() => navigate('/')} 
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-sm text-white hover:bg-white/20 transition-colors border border-white/20"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-md">
                  {isSearching ? 'Pencarian' : selectedDivision ? DIVISION_CONFIG[selectedDivision].label : 'Tim & Pengurus'}
                </h1>
                <p className="text-xs text-white/80">
                  {isSearching ? `Ditemukan ${displayedMembers.length} orang` : selectedDivision ? 'Daftar Anggota Divisi' : 'Struktur organisasi & divisi'}
                </p>
            </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nama atau jabatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-[20px] shadow-sm text-sm text-[#1e1e1e] focus:ring-2 focus:ring-rose-200 focus:outline-none placeholder:text-gray-400 transition-all"
            />
            
            {(isSearching || selectedDivision) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDivision(null);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
        </div>
      </div>

      {/* --- GRID KARTU DIVISI (Menu Awal) --- */}
      {!isSearching && !selectedDivision && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          {(Object.keys(DIVISION_CONFIG) as DivisionType[]).map((key) => {
            const config = DIVISION_CONFIG[key];
            const count = getCount(key);
            
            return (
              <motion.div
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDivision(key)}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-[24px] shadow-sm border border-white/60 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
              >
                <div className={`absolute -top-2 -right-2 w-16 h-16 rounded-full opacity-10 ${config.color}`} />
                
                <div className="relative z-10 flex flex-col items-start gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${config.color}`}>
                      {config.icon}
                   </div>
                   
                   <div>
                      <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1">{config.label}</h3>
                      <p className="text-[10px] text-gray-500 font-medium">{count} Anggota</p>
                   </div>
                </div>

                <div className="absolute bottom-3 right-3 text-gray-300 group-hover:text-gray-800 group-hover:translate-x-1 transition-all">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* --- LIST MEMBER (Detail) --- */}
      {(isSearching || selectedDivision) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4"
        >
          {!isSearching && selectedDivision && (
            <button 
              onClick={() => setSelectedDivision(null)}
              className="self-start flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors mb-2 pl-1 font-medium shadow-black/5"
            >
              <div className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <ArrowLeft size={14} />
              </div>
              Pilih Divisi Lain
            </button>
          )}

          <AnimatePresence mode='popLayout'>
              {displayedMembers.map((member) => (
                  <motion.div
                      key={member.id}
                      onClick={() => navigate(`/team/${member.id}`)} // 👈 Added navigation click
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-4 rounded-[24px] shadow-sm border border-white/40 flex items-center gap-4 group relative overflow-hidden cursor-pointer" // 👈 Added cursor-pointer
                  >
                      <div className="relative flex-shrink-0">
                          <div className={`w-14 h-14 rounded-full p-1 bg-gradient-to-br from-gray-100 to-gray-50`}>
                              <img 
                                  src={member.photo} 
                                  alt={member.name} 
                                  className="w-full h-full rounded-full object-cover"
                                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=IMG'; }}
                              />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white border-2 border-white ${DIVISION_CONFIG[member.division].color}`}>
                             {React.cloneElement(DIVISION_CONFIG[member.division].icon as React.ReactElement, { size: 10 })}
                          </div>
                      </div>

                      <div className="flex-1 min-w-0 z-10">
                          <div className="flex items-start justify-between">
                              <div>
                                  <h3 className="font-bold text-[#1e1e1e] text-sm truncate pr-2">{member.name}</h3>
                                  <p className="text-[11px] text-gray-500 font-medium mb-1">
                                      {member.role}
                                  </p>
                              </div>
                          </div>
                          
                          <div className="flex gap-2 mt-1">
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation(); // Prevent card navigation
                                   // Add WhatsApp logic here
                                 }}
                                 className="px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold flex items-center gap-1 hover:bg-green-100 transition-colors"
                               >
                                  <Phone size={10} /> WhatsApp
                               </button>
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation(); // Prevent card navigation
                                   // Add Instagram logic here
                                 }}
                                 className="w-7 h-7 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors"
                               >
                                  <Instagram size={12} />
                               </button>
                          </div>
                      </div>
                  </motion.div>
              ))}
          </AnimatePresence>

          {/* EMPTY STATE */}
          {displayedMembers.length === 0 && (
            <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-[24px] border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <User size={32} />
                </div>
                <p className="text-white/80 text-sm">Tidak ada data ditemukan.</p>
            </div>
          )}
        </motion.div>
      )}

    </div>
  );
};

export default TeamPage;