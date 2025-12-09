import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Coins, BookOpen, Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hitungWaris, HasilWaris } from "../utils/hitungWaris";

// Import komponen anak
import WarisForm from "../components/Waris/WarisForm";
import WarisResult from "../components/Waris/WarisResult";

const WarisCalculator: React.FC = () => {
  const navigate = useNavigate();
  
  const [harta, setHarta] = useState("");
  const [suami, setSuami] = useState(false);
  const [istri, setIstri] = useState(false);
  const [ayah, setAyah] = useState(false);
  const [ibu, setIbu] = useState(false);
  const [anakLaki, setAnakLaki] = useState("");
  const [anakPerempuan, setAnakPerempuan] = useState("");
  const [hasil, setHasil] = useState<HasilWaris[]>([]);

  const handleHitung = () => {
    const totalHarta = Number(harta);
    if (!totalHarta) {
      alert("Masukkan total harta dengan benar dulu ya, Sayang. 💰");
      return;
    }
    const result = hitungWaris({
      harta: totalHarta,
      suami,
      istri,
      ayah,
      ibu,
      anakLaki: Number(anakLaki),
      anakPerempuan: Number(anakPerempuan),
    });
    setHasil(result);
  };

  return (
    // HAPUS: bg-gray-50. GANTI: Transparent
    <div className="min-h-screen pb-32 font-sans flex justify-center items-start pt-4">
      <div className="w-full max-w-6xl px-4">
        
        {/* HEADER NAVIGATION */}
        <div className="mb-6">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold hover:bg-white/20 transition-all border border-white/20 w-fit"
            >
                <ArrowLeft size={20} />
                <span>Kembali</span>
            </button>
        </div>

        {/* HEADER CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-emerald-600/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-xl shadow-emerald-900/20 mb-8 border border-emerald-400/30 text-white"
        >
          {/* Dekorasi Abstrak */}
          <motion.div 
             animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 6 }}
             className="absolute -right-10 -top-10 w-64 h-64 bg-emerald-400 rounded-full opacity-40 blur-3xl mix-blend-screen" 
          />
          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
                   <BookOpen size={24} className="text-white" />
                </div>
                <span className="text-emerald-100 font-bold uppercase text-xs tracking-wider border border-emerald-400/50 px-2 py-0.5 rounded-full">
                   Faraid Tool
                </span>
             </div>
             <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-md">
                Kalkulator <br/> <span className="text-emerald-200">Warisan Islam</span>
             </h1>
             <p className="text-emerald-50 text-lg max-w-lg font-medium opacity-90">
                Hitung pembagian harta warisan secara syariat dengan mudah dan transparan.
             </p>
          </div>
        </motion.div>

        {/* LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* FORM INPUT (Kiri) */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="lg:col-span-7"
           >
              {/* Container Putih Bersih untuk Form agar input jelas */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-white/60 relative">
                 <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                       <Calculator size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Input Data Keluarga</h2>
                        <p className="text-xs text-gray-400">Masukkan data ahli waris yang ditinggalkan</p>
                    </div>
                 </div>
                 
                 <WarisForm
                   harta={harta}
                   setHarta={setHarta}
                   suami={suami}
                   setSuami={setSuami}
                   istri={istri}
                   setIstri={setIstri}
                   ayah={ayah}
                   setAyah={setAyah}
                   ibu={ibu}
                   setIbu={setIbu}
                   anakLaki={anakLaki}
                   setAnakLaki={setAnakLaki}
                   anakPerempuan={anakPerempuan}
                   setAnakPerempuan={setAnakPerempuan}
                   onHitung={handleHitung}
                 />
              </div>
           </motion.div>

           {/* HASIL (Kanan) */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="lg:col-span-5 space-y-6"
           >
              {/* Card Hasil Glassy Emerald */}
              <div className="bg-emerald-50/90 backdrop-blur-md rounded-[2.5rem] p-8 border border-emerald-100 shadow-lg shadow-emerald-100/50 min-h-[400px] flex flex-col">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                       <Coins size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-emerald-900">Hasil Perhitungan</h2>
                 </div>

                 {hasil.length > 0 ? (
                    <div className="bg-white rounded-[1.5rem] p-1 shadow-sm border border-emerald-100 flex-grow overflow-hidden">
                       <WarisResult hasil={hasil} />
                    </div>
                 ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-emerald-600/60 p-4 border-2 border-dashed border-emerald-200 rounded-[1.5rem]">
                        <Calculator size={48} strokeWidth={1.5} className="mb-3 opacity-50" />
                        <p className="text-sm font-medium">
                           Silakan lengkapi formulir di samping untuk melihat hasil pembagian.
                        </p>
                    </div>
                 )}
              </div>

              {/* Info Card */}
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white/50 flex items-start gap-4">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
                    <Info size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">Catatan Penting</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                       Perhitungan ini berdasarkan kaidah umum faraid. Untuk kasus yang kompleks atau sengketa, sangat disarankan berkonsultasi langsung dengan ulama atau ahli waris terpercaya.
                    </p>
                 </div>
              </div>
           </motion.div>

        </div>
      </div>
    </div>
  );
};

export default WarisCalculator;