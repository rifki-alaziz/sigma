import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Instagram,
  MapPin,
  Calendar,
  User,
  X,
  Quote,
} from "lucide-react";

import { Student, StudentCategory } from "../types";
import { STUDENT_CATEGORIES } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

/* ----------------------------------------------
   🔥 FUNGSI HELPER 1: OPTIMASI GAMBAR
   (Kita set default width 1000px biar tajam buat detail)
------------------------------------------------ */
const getOptimizedUrl = (url: string | undefined, width = 1000) => {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;
  // Mantra ajaib: Resize, Quality Auto, Format Auto
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
};

/* ----------------------------------------------
   🔥 FUNGSI HELPER 2: FORMAT WA (+62)
   Biar pas diklik langsung 'crot' masuk chat 💦
------------------------------------------------ */
const formatWhatsAppNumber = (phone: string | undefined) => {
  if (!phone) return "";
  // Bersihkan karakter aneh, ganti 0 jadi 62
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  }
  return cleanPhone;
};

/* ----------------------------------------------
   VARIANTS ANIMASI
------------------------------------------------ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

/* ----------------------------------------------
   COMPONENT UTAMA: StudentDetail
------------------------------------------------ */
const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [student, setStudent] = useState<Student | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Ambil history kategori biar tombol back pinter
  const previousCategory = location.state?.category || null;

  const handleBack = () => {
    if (previousCategory) {
      navigate("/students", { state: { category: previousCategory } });
    } else {
      navigate("/students");
    }
  };

  useEffect(() => {
    // Scroll ke atas pas load biar hero image kelihatan full
    window.scrollTo(0, 0);

    const API_URL = import.meta.env.VITE_API_URL;
    const TOKEN = import.meta.env.VITE_API_TOKEN;

    fetch(`${API_URL}/api/students/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, [id]);

  const handleDelete = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const TOKEN = import.meta.env.VITE_API_TOKEN;

    if (window.confirm("Yakin ingin menghapus data ini, Sayang?")) {
      try {
        const res = await fetch(`${API_URL}/api/students/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!res.ok) throw new Error("Gagal menghapus");
        navigate("/students", { state: { category: previousCategory } });
      } catch (err) {
        alert(err);
      }
    }
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-gray-500">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          Memuat Data Santri...
        </motion.div>
      </div>
    );
  }

  const category = STUDENT_CATEGORIES[student.category as StudentCategory] || {
    label: "Umum",
    color: "bg-gray-500",
  };

  const isArabicQuote = /[\u0600-\u06FF]/.test(student.quotes || "");
  
  // 👇 GAMBAR UTAMA: Di-optimize pakai fungsi helper kita
  const displayImage = getOptimizedUrl(student.photo) || "https://via.placeholder.com/400x600?text=No+Image";

  return (
    <div className="w-full p-4 md:p-8 font-sans text-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER NAVIGATION --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 font-bold hover:bg-black/5 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Kembali</span>
          </motion.button>

          {/* Admin Controls */}
          {user?.role === "admin" && (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/students/edit/${student.id}`)}
                className="flex items-center gap-2 bg-blue-50/50 text-blue-600 px-5 py-2 rounded-full font-bold hover:bg-blue-100 transition-colors"
              >
                <Edit size={18} />
                <span>Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-50/50 text-red-600 px-5 py-2 rounded-full font-bold hover:bg-red-100 transition-colors"
              >
                <Trash2 size={18} />
                <span>Hapus</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          
          {/* KOLOM KIRI: FOTO UTAMA & SOSMED */}
          <motion.div variants={itemVariants} className="lg:col-span-1 h-full">
            <div className="relative h-full min-h-[450px] rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-gray-200/50 border border-white">
              <img
                src={displayImage}
                alt={student.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 backdrop-blur-md ${category.color} bg-opacity-80`}>
                  {category.label}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                  {student.name}
                </h1>
                <p className="text-white/80 font-medium flex items-center gap-1 text-sm mb-6">
                  @{student.instagram || "santri_lirboyo"}
                </p>
                
                <div className="flex gap-3">
                  {/* TOMBOL IG */}
                  {student.instagram && (
                    <a href={`https://instagram.com/${student.instagram}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-pink-600 transition-all">
                      <Instagram size={20} className="text-white" />
                    </a>
                  )}
                  
                  {/* TOMBOL WA (DENGAN LOGO OFFICIAL & FORMAT +62) */}
                  {student.whatsapp && (
                    <a 
                      href={`https://wa.me/${formatWhatsAppNumber(student.whatsapp)}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#25D366] transition-all group"
                      title="Chat WhatsApp"
                    >
                      {/* SVG Logo WhatsApp Official */}
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: DETAIL INFO */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* CARD: NAMA AYAH */}
              <motion.div variants={itemVariants} className="p-4 rounded-[2rem] border border-gray-200/60 flex items-center gap-5 hover:bg-white/60 hover:shadow-lg transition-all bg-white/30 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Nama Ayah</p>
                  <p className="text-lg font-bold text-gray-800 line-clamp-1">{student.fatherName}</p>
                </div>
              </motion.div>

              {/* CARD: TANGGAL LAHIR */}
              <motion.div variants={itemVariants} className="p-4 rounded-[2rem] border border-gray-200/60 flex items-center gap-5 hover:bg-white/60 hover:shadow-lg transition-all bg-white/30 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Tanggal Lahir</p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(student.birthDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CARD: ALAMAT */}
            <motion.div variants={itemVariants} className="p-6 rounded-[2.5rem] border border-gray-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/60 hover:shadow-lg transition-all bg-white/30 backdrop-blur-sm">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Alamat Domisili</p>
                  <p className="text-gray-700 font-medium leading-relaxed max-w-md">{student.address}</p>
                </div>
              </div>
              <button onClick={() => setShowMap(true)} className="px-6 py-3 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all whitespace-nowrap shadow-lg shadow-gray-300">
                Lihat Peta
              </button>
            </motion.div>

            {/* CARD: QUOTES */}
            {student.quotes && (
              <motion.div variants={itemVariants} className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[2.5rem] text-white overflow-hidden shadow-xl shadow-indigo-200">
                <Quote className="absolute top-4 left-6 text-white/10 transform -scale-x-100" size={80} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <p className={`leading-relaxed ${isArabicQuote ? "text-3xl md:text-4xl" : "text-xl md:text-2xl italic font-medium"}`} style={{ fontFamily: isArabicQuote ? '"Scheherazade New", serif' : undefined }}>
                    "{student.quotes}"
                  </p>
                  <div className="mt-6 w-12 h-1.5 bg-white/30 rounded-full" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* --- MODAL MAP --- */}
      <AnimatePresence>
        {showMap && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMap(false)}>
            <motion.div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative overflow-hidden flex flex-col shadow-2xl" initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-8 pb-4">
                <h3 className="text-2xl font-extrabold text-gray-800">Lokasi Santri</h3>
                <button onClick={() => setShowMap(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="px-8 pb-8">
                <div className="bg-blue-50 p-6 rounded-[1.5rem] mb-6 text-blue-900">
                  <p className="leading-relaxed font-medium">{student.address}</p>
                </div>
                {student.mapsUrl && (
                  <div className="flex justify-end">
                    <button onClick={() => window.open(student.mapsUrl, "_blank")} className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                      <MapPin size={20} />
                      <span>Buka di Google Maps</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDetail;