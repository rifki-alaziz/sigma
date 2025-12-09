import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Plus,
  Search,
  Users,
  MapPin,
  ArrowLeft,
  Image as ImageIcon,
  ChevronRight,
  ArrowUp // Icon panah ke atas
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTS ASLI ---
import { STUDENT_CATEGORIES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

// Define Student type
interface Student {
  id: string;
  name: string;
  fatherName?: string;
  address?: string;
  photo?: string;
  category: string;
}

// 🔥 FUNGSI HELPER: PEMANGKAS UKURAN GAMBAR (MANTRA AJAIB)
// Taruh di luar komponen biar gak dibikin ulang terus
const getOptimizedUrl = (url: string, width = 400) => {
  if (!url) return "";
  // Kalau bukan Cloudinary, balikin aslinya
  if (!url.includes("cloudinary.com")) return url;

  // Cek kalau url sudah ada parameter upload, kita selipin manipulasi
  // w_400: lebar 400px (cukup buat thumbnail)
  // q_auto: kualitas otomatis (tetap tajam tapi size kecil)
  // f_auto: format otomatis (webp/avif)
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
};

// ✨ KOMPONEN GAMBAR PINTAR (Lazy, Smooth & AUTO COMPRESS)
const OptimizedImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // 👇 Kita proses URL-nya di sini sebelum dirender
  const optimizedSrc = getOptimizedUrl(src, 400); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Aku gedein dikit marginnya biar makin smooth
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <ImageIcon size={20} className="animate-pulse opacity-50" />
        </div>
      )}
      {isInView && (
        <img
          src={optimizedSrc} // Pake URL yang udah "diet"
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-110'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image';
            setIsLoaded(true);
          }}
        />
      )}
    </div>
  );
};

const Students = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    location.state?.category || null
  );
  const [searchTerm, setSearchTerm] = useState('');

  // 👇 State untuk tombol scroll
  const [showScrollTop, setShowScrollTop] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const TOKEN = import.meta.env.VITE_API_TOKEN;

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/students`, {
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      }
    };

    fetchData();
  }, []);

  // --- SCROLL TO TOP LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // --- LOGIC FILTERING ---
  const isSearching = searchTerm.length > 0;
  let displayStudents = students;

  if (isSearching) {
    displayStudents = students.filter((student) => {
      const name = student.name || "";
      const fatherName = student.fatherName || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fatherName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  } else if (selectedCategory) {
    displayStudents = students.filter((s) => s.category === selectedCategory);
  } else {
    displayStudents = [];
  }

  const getCategoryCount = (catKey: string) => {
    return students.filter((s) => s.category === catKey).length;
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    window.history.replaceState({}, document.title);
  };

  return (
    <div className="p-6 pb-24 min-h-screen relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">
            {isSearching ? 'Hasil Pencarian' : selectedCategory ? 'Daftar Santri' : 'Data Mahasantri'}
          </h1>
          <p className="text-xs text-gray-500">
            {isSearching ? `Menemukan ${displayStudents.length} data` : selectedCategory ? STUDENT_CATEGORIES[selectedCategory as keyof typeof STUDENT_CATEGORIES]?.label : 'Pilih kategori untuk melihat data'}
          </p>
        </div>

        {/* Tombol Add (Admin Only) */}
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/students/add')}
            className="bg-[#1e1e1e] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-transform active:scale-95"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <div className="space-y-6">

        {/* --- SEARCH BAR --- */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari santri di semua kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-[24px] shadow-sm text-sm text-[#1e1e1e] focus:ring-2 focus:ring-purple-200 focus:outline-none placeholder:text-gray-400 transition-all"
            />
            {(isSearching || selectedCategory) && (
              <button
                onClick={handleBackToCategories}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-red-500"
              >
                {isSearching ? 'Hapus' : 'Kembali'}
              </button>
            )}
          </div>
        </div>

        {/* --- KONDISI 1: TAMPILAN AWAL (GRID KATEGORI) --- */}
        {!isSearching && !selectedCategory && (
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(STUDENT_CATEGORIES).map(([key, config]) => {
              const count = getCategoryCount(key);
              return (
                <motion.div
                  key={key}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(key)}
                  className="bg-white p-5 rounded-[28px] shadow-sm border border-white/40 cursor-pointer relative overflow-hidden group hover:shadow-md transition-all"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${config.color.split(' ')[0]}`} />

                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm ${config.color.split(' ')[0].replace('text', 'bg') || 'bg-gray-800'}`}>
                        <Users size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1e1e1e]">{config.label}</h3>
                        <p className="text-xs text-gray-500">{count} Santri Aktif</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1e1e1e] group-hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* --- KONDISI 2 & 3: TAMPILAN LIST SANTRI --- */}
        {(isSearching || selectedCategory) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Back Button Kecil di atas list */}
            {!isSearching && selectedCategory && (
              <div className="col-span-2 mb-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1e1e1e] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <ArrowLeft size={14} />
                  </div>
                  <span>Pilih Kategori Lain</span>
                </button>
              </div>
            )}

            {displayStudents.map((student) => {
              const catConfig = STUDENT_CATEGORIES[student.category as keyof typeof STUDENT_CATEGORIES] || { label: student.category, color: 'bg-gray-500 text-white' };
              return (
                <div
                  key={student.id}
                  onClick={() => navigate(`/students/${student.id}`, {
                    state: { category: selectedCategory }
                  })}
                  className="bg-white p-3 rounded-[28px] shadow-sm hover:shadow-md transition-all cursor-pointer border border-white/40 relative overflow-hidden group"
                >
                  {/* 👇 DISINI PAKE OPTIMIZED IMAGE YANG UDAH KITA SUNTIK LOGIKA BARU */}
                  <OptimizedImage
                    src={student.photo || ''}
                    alt={student.name}
                    className="relative h-32 w-full rounded-[20px] mb-3"
                  />

                  <div className={`absolute top-5 right-5 z-10 px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm ${catConfig.color}`}>
                    {catConfig.label}
                  </div>

                  <div className="px-1 mb-1">
                    <h3 className="text-sm font-bold text-[#1e1e1e] truncate leading-tight mb-1">{student.name}</h3>
                    <div className="flex items-center text-[10px] text-gray-500 mb-1">
                      <span className="opacity-70 mr-1">Bin:</span>
                      <span className="font-medium truncate">{student.fatherName}</span>
                    </div>
                    <div className="flex items-center text-[10px] text-gray-400">
                      <MapPin size={10} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{student.address}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {displayStudents.length === 0 && (
              <div className="col-span-2 text-center py-12 bg-white/50 rounded-[32px] border border-dashed border-gray-300">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-600 mb-1">Data Tidak Ditemukan</h3>
                <p className="text-xs text-gray-400">Coba cari dengan kata kunci lain.</p>
              </div>
            )}
          </motion.div>
        )}

      </div>

      {/* 👇 TOMBOL SCROLL TO TOP (Mengambang) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 bg-[#1e1e1e] text-white p-3.5 rounded-full shadow-xl shadow-gray-400/50 z-50 hover:bg-black transition-colors"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Students;