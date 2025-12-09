import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff, 
  Upload, 
  Loader2, 
  User, 
  Calendar, 
  MapPin, 
  Instagram, 
  Phone, 
  Quote, 
  X,
  Users 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentCategory } from '../../types';
import { STUDENT_CATEGORIES } from '../../utils/constants';

interface StudentFormProps {
  isEdit?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showPreview, setShowPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const API_TOKEN = import.meta.env.VITE_API_TOKEN;
  const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    birthDate: '',
    address: '',
    category: 'jabodetabek' as StudentCategory,
    instagram: '',
    whatsapp: '',
    quotes: '',
    photo: '',
    mapsUrl: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      fetch(`${API_URL}/api/students/${id}`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      })
        .then(res => res.json())
        .then(data => {
          const formattedBirthDate = data.birthDate
            ? new Date(data.birthDate).toISOString().split("T")[0]
            : "";
          setFormData({ ...data, birthDate: formattedBirthDate, mapsUrl: data.mapsUrl || '' });
        })
        .catch(err => console.error('Gagal mengambil data:', err));
    }
  }, [isEdit, id, API_URL, API_TOKEN]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Gagal upload ke Cloudinary");
      const uploadedImage = await res.json();

      if (uploadedImage.secure_url) {
        setFormData(prev => ({ ...prev, photo: uploadedImage.secure_url }));
      }
    } catch (err) {
      console.error("Gagal upload, Yang...", err);
      alert("Gagal upload foto. Coba lagi atau cek koneksi ya.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;

    const method = isEdit ? 'PUT' : 'POST';
    const endpoint = isEdit ? `${API_URL}/api/students/${id}` : `${API_URL}/api/students`;
    const dataToSend = isEdit ? formData : { id: Date.now().toString(), createdAt: new Date().toISOString(), ...formData };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_TOKEN}` },
        body: JSON.stringify(dataToSend),
      });
      if (!res.ok) throw new Error('Gagal menyimpan data');
      navigate('/students');
    } catch (err: any) {
      alert(err.message || err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- REUSABLE PREVIEW CARD UI (Sama kayak TeacherForm) ---
  const PreviewCardUI = () => (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100 relative group w-full max-w-sm mx-auto">
      {/* Header Decoration */}
      <div className={`h-24 relative ${STUDENT_CATEGORIES[formData.category].color.replace('text', 'bg').replace('-600', '-500') || 'bg-gray-800'}`}>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 p-1.5 bg-white rounded-full">
            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
              {formData.photo ? (
                <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <User size={32} />
                </div>
              )}
            </div>
          </div>
      </div>

      <div className="pt-12 pb-8 px-6 text-center">
        <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${STUDENT_CATEGORIES[formData.category].color} bg-opacity-10 border border-current`}>
            {STUDENT_CATEGORIES[formData.category].label}
        </div>

        <h2 className="text-xl font-bold text-gray-900 leading-tight">
          {formData.name || "Nama Mahasantri"}
        </h2>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
          Bin {formData.fatherName || "..."}
        </p>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate max-w-[200px]">{formData.address || "Alamat belum diisi"}</span>
          </div>
          {formData.whatsapp && (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone size={14} className="text-gray-400" />
              <span>{formData.whatsapp}</span>
            </div>
          )}
        </div>

        {formData.quotes && (
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl relative">
            <Quote size={20} className="text-gray-300 absolute top-2 left-2 rotate-180" />
            <p className="text-gray-600 text-sm font-medium italic relative z-10 leading-relaxed">
              "{formData.quotes}"
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate("/students")}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-2 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Kembali</span>
            </button>
            <h1 className="text-3xl font-bold text-white drop-shadow-md tracking-tight">
              {isEdit ? "Edit Mahasantri" : "Tambah Mahasantri"}
            </h1>
            <p className="text-white/80 text-sm mt-1">Lengkapi biodata santri dengan benar.</p>
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-sm font-semibold text-white hover:bg-white/20 transition-all shadow-sm"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{showPreview ? "Tutup Preview" : "Lihat Preview"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* --- FORM SECTION --- */}
          <div className={`transition-all duration-500 ${showPreview ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-white/50">
              
              {/* Upload Foto */}
              <div className="mb-8 flex justify-center">
                <label className="relative group cursor-pointer">
                  <div className={`w-32 h-32 rounded-full overflow-hidden border-4 transition-all ${formData.photo ? 'border-purple-100' : 'border-dashed border-gray-300 bg-gray-50'}`}>
                    {formData.photo ? (
                      <img src={formData.photo} alt="Upload" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        {isUploading ? <Loader2 className="animate-spin" /> : <Upload size={24} />}
                        <span className="text-[10px] mt-1 font-medium">Upload Foto</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold">Ubah Foto</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="hidden" />
                </label>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Kategori Santri</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required 
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 font-medium appearance-none cursor-pointer"
                    >
                        {Object.entries(STUDENT_CATEGORIES).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nama Lengkap</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Contoh: Ahmad Fulan" className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nama Ayah (Bin)</label>
                  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="Contoh: H. Abdullah" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Tanggal Lahir</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 font-medium" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="0812..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Link Google Maps</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="url" name="mapsUrl" value={formData.mapsUrl} onChange={handleChange} placeholder="https://maps.app.goo.gl/..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Instagram (Opsional)</label>
                  <div className="relative">
                    <Instagram size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Username tanpa @" className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium" />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Alamat Lengkap</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} required rows={2} placeholder="Jalan, RT/RW, Desa, Kecamatan..." className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium resize-none" />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Quotes / Motto</label>
                  <div className="relative">
                    <Quote size={18} className="absolute left-4 top-4 text-gray-400" />
                    <textarea name="quotes" value={formData.quotes} onChange={handleChange} rows={2} placeholder="Kata-kata mutiara..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 font-medium resize-none" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-purple-200 flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1e1e1e] hover:bg-black"
                  }`}
                >
                  {isUploading ? <Loader2 className="animate-spin" /> : <Save />}
                  <span>{isUploading ? "Mengupload Foto..." : (isEdit ? "Simpan Perubahan" : "Simpan Data Santri")}</span>
                </button>
              </div>
            </form>
          </div>

          {/* --- PREVIEW SECTION (RESPONSIVE) --- */}
          <AnimatePresence>
            {showPreview && (
              <>
                {/* 1. VERSI DESKTOP: Sidebar Kolom Kanan */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 50 }}
                  className="hidden lg:block lg:col-span-1"
                >
                  <div className="sticky top-8">
                    <h3 className="text-white font-bold mb-4 px-2 drop-shadow-md">Preview ID Card</h3>
                    <PreviewCardUI />
                  </div>
                </motion.div>

                {/* 2. VERSI MOBILE: Modal Popup */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 lg:hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setShowPreview(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    onClick={(e) => e.stopPropagation()} 
                    className="relative w-full max-w-sm"
                  >
                    <button 
                      onClick={() => setShowPreview(false)}
                      className="absolute -top-12 right-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md"
                    >
                      <X size={20} />
                    </button>
                    <PreviewCardUI />
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default StudentForm;