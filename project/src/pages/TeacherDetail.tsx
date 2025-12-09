import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Instagram,
  MessageCircle,
  Calendar,
  User,
  MapPin,
  X,
  Quote,
  FileText,
} from "lucide-react";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Teacher as TeacherBase } from "../types";
import { useAuth } from "../context/AuthContext";

// Define Type Extension locally if needed, or rely on types file
type Teacher = TeacherBase & {
  mapsUrl?: string;
};

/* ----------------------------------------------
   VARIANTS ANIMASI (Typed Correctly)
---------------------------------------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

/* ----------------------------------------------
   COMPONENT TeacherDetail
---------------------------------------------- */

const TeacherDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Fetch Data
  useEffect(() => {
    if (!id) return;

    const API_URL = import.meta.env.VITE_API_URL;
    const TOKEN = import.meta.env.VITE_API_TOKEN;

    fetch(`${API_URL}/api/teachers/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then((data) => setTeacher(data.data || data))
      .catch((err) => console.error("Gagal mengambil data guru:", err));
  }, [id]);

  // Handle Delete
  const handleDelete = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const TOKEN = import.meta.env.VITE_API_TOKEN;

    if (window.confirm("Apakah Anda yakin ingin menghapus data guru ini?")) {
      try {
        const res = await fetch(`${API_URL}/api/teachers/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!res.ok) throw new Error("Gagal menghapus data guru");

        navigate("/teachers");
      } catch (err: any) {
        alert(err.message || err);
      }
    }
  };

  // Helper Date Formatter
  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Memuat Data Guru...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800 rounded-3xl border border-gray-100">

      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER NAVIGATION (Floating Pills) --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate("/teachers")}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg shadow-gray-100 text-gray-700 font-bold hover:text-teal-600 transition-colors border border-gray-100"
          >
            <ArrowLeft size={20} />
            <span>Kembali</span>
          </motion.button>

          {user?.role === "admin" && (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/teachers/edit/${teacher.id}`)}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors border border-blue-100"
              >
                <Edit size={18} />
                <span>Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-100 transition-colors border border-red-100"
              >
                <Trash2 size={18} />
                <span>Hapus</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          
          {/* KOLOM KIRI: PROFILE CARD */}
          <motion.div variants={itemVariants} className="lg:col-span-1 h-full">
            <div className="relative h-full min-h-[450px] bg-white rounded-[3rem] shadow-xl shadow-gray-100 overflow-hidden group border border-gray-100">
              {/* Foto */}
              <img
                src={
                  teacher.photo ||
                  "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
                alt={teacher.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border border-white/20 backdrop-blur-md bg-teal-600">
                   Pengajar
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                   {teacher.name}
                </h1>
                <p className="text-white/80 font-medium flex items-center gap-1 text-sm mb-6">
                   @{teacher.instagram || "guru_lirboyo"}
                </p>

                {/* Social Media Floating Buttons */}
                <div className="flex gap-3">
                  {teacher.instagram && (
                    <a
                      href={`https://instagram.com/${teacher.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 transition-all"
                    >
                      <Instagram size={22} className="text-white" />
                    </a>
                  )}
                  {teacher.whatsapp && (
                    <a
                      href={`https://wa.me/${teacher.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all"
                    >
                      <MessageCircle size={22} className="text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: BENTO GRID INFO */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Baris 1: Info Personal (Grid Kecil) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Kartu Nama Ayah */}
               <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2rem] shadow-lg shadow-teal-50 border border-gray-100 flex items-center gap-5 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                      <User size={26} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Nama Ayah</p>
                      <p className="text-lg font-bold text-gray-800 line-clamp-1">{teacher.fatherName || "-"}</p>
                  </div>
               </motion.div>

               {/* Kartu Tanggal Lahir */}
               <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2rem] shadow-lg shadow-purple-50 border border-gray-100 flex items-center gap-5 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                      <Calendar size={26} />
                  </div>
                  <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Tanggal Lahir</p>
                      <p className="text-lg font-bold text-gray-800">
                        {formatDate(teacher.birthDate)}
                      </p>
                  </div>
               </motion.div>
            </div>

            {/* Baris 2: Alamat & Map */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] shadow-lg shadow-gray-100 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                        <MapPin size={26} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Alamat Domisili</p>
                        <p className="text-gray-700 font-medium leading-relaxed max-w-md">
                            {teacher.address || "-"}
                        </p>
                    </div>
                </div>
                {teacher.address && (
                  <button 
                      onClick={() => setShowMap(true)}
                      className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-300 hover:shadow-xl hover:-translate-y-1 whitespace-nowrap"
                  >
                      Lihat Peta
                  </button>
                )}
            </motion.div>

            {/* Baris 3: Notes (Khusus Guru) - Style Kuning Lembut */}
            {teacher.notes && (
               <motion.div variants={itemVariants} className="bg-yellow-50 p-6 rounded-[2rem] border border-yellow-100 flex items-start gap-4">
                  <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                     <FileText size={20} />
                  </div>
                  <div>
                     <h3 className="font-bold text-yellow-800 mb-1">Catatan Tambahan</h3>
                     <p className="text-yellow-700 text-sm leading-relaxed">{teacher.notes}</p>
                  </div>
               </motion.div>
            )}

            {/* Baris 4: Quotes */}
            {teacher.quotes && (
                <motion.div variants={itemVariants} className="relative bg-gradient-to-br from-teal-500 to-emerald-600 p-8 md:p-10 rounded-[2.5rem] shadow-xl text-white overflow-hidden">
                   <Quote className="absolute top-4 left-6 text-white/10 transform -scale-x-100" size={80} />
                   <div className="relative z-10 flex flex-col items-center text-center">
                       <p className="text-xl md:text-2xl leading-relaxed italic font-medium">
                          "{teacher.quotes}"
                       </p>
                       <div className="mt-6 w-12 h-1.5 bg-white/30 rounded-full" />
                   </div>
                </motion.div>
            )}

          </div>
        </motion.div>

      </div>

      {/* --- MODAL POPUP MAP --- */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMap(false)}
          >
            <motion.div
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
               {/* Modal Header */}
               <div className="flex justify-between items-center p-8 pb-4">
                  <h3 className="text-2xl font-extrabold text-gray-800">Lokasi Guru</h3>
                  <button onClick={() => setShowMap(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 hover:rotate-90 transition-all">
                      <X size={20} className="text-gray-600" />
                  </button>
              </div>

              <div className="px-8 pb-8">
                  <div className="bg-teal-50 p-6 rounded-[1.5rem] mb-6 border border-teal-100 text-teal-900">
                     <p className="leading-relaxed font-medium">{teacher.address}</p>
                  </div>

                  {teacher.mapsUrl && (
                    <div className="flex justify-end">
                       <button
                        onClick={() => {
                           if (teacher.mapsUrl) {
                             window.open(
                               teacher.mapsUrl.startsWith("http")
                                 ? teacher.mapsUrl
                                 : `https://www.google.com/maps?q=$${teacher.mapsUrl}`,
                               "_blank"
                             );
                           }
                         }}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 hover:-translate-y-1"
                       >
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

export default TeacherDetail;