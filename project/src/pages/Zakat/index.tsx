import React, { useState } from "react";
import { motion } from "framer-motion";
import { Coins, ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

// Components
import ZakatTab from "./ZakatTab";
import ZakatProfesi from "./ZakatProfesi";
import ZakatEmas from "./ZakatEmas";
import ZakatPerdagangan from "./ZakatPerdagangan";
import ZakatPertanian from "./ZakatPertanian";
import ZakatTernak from "./ZakatTernak";

const ZakatPage: React.FC = () => {
  const [jenis, setJenis] = useState("profesi");
  const navigate = useNavigate();

  const renderZakat = () => {
    switch (jenis) {
      case "profesi": return <ZakatProfesi />;
      case "emas": return <ZakatEmas />;
      case "perdagangan": return <ZakatPerdagangan />;
      case "pertanian": return <ZakatPertanian />;
      case "ternak": return <ZakatTernak />;
      default: return <ZakatProfesi />;
    }
  };

  return (
    // HAPUS: bg-gray-50. GANTI: Transparent
    <div className="min-h-screen pb-32 font-sans flex justify-center items-start pt-4">
      <motion.div
        className="w-full max-w-5xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        {/* --- HEADER NAVIGATION (Back Button) --- */}
        <div className="mb-6">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold hover:bg-white/20 transition-all border border-white/20 w-fit"
            >
                <ArrowLeft size={20} />
                <span>Kembali</span>
            </button>
        </div>

        {/* --- HEADER CARD (Glass Style) --- */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-xl shadow-purple-900/10 mb-8 border border-white/60">
          {/* Elemen Dekoratif Abstrak */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-10 -top-10 w-48 h-48 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-60 blur-2xl" 
          />
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute right-20 top-20 w-32 h-32 bg-yellow-200 rounded-full opacity-50 blur-xl" 
          />

          {/* Konten Header */}
          <div className="relative z-10 text-gray-800">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2.5 bg-purple-600 rounded-xl shadow-lg shadow-purple-300">
                <Coins className="text-white" size={24} weight="fill" />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                Islamic Finance
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900 mt-4">
              Kalkulator <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Zakat</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-lg mb-6 leading-relaxed">
              Tunaikan kewajibanmu. Bersihkan harta, sucikan jiwa sebelum waktu berlalu.
            </p>
          </div>
        </div>

        {/* --- SECTION LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* BAGIAN KIRI: Navigasi Tab (Glass Effect) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-sm border border-white/50">
              <h2 className="text-lg font-bold text-gray-800 mb-4 ml-1 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  Pilih Jenis Zakat
              </h2>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                 {/* Pastikan komponen ZakatTab di dalamnya punya styling yang fleksibel */}
                 <ZakatTab jenis={jenis} setJenis={setJenis} />
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: Form Utama */}
          <div className="lg:col-span-8">
            <div className="mb-4 ml-2">
               <h2 className="text-lg font-bold text-white drop-shadow-md flex items-center gap-2">
                   <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                   Perhitungan
               </h2>
            </div>
            
            <motion.div
              key={jenis} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              // Container Form tetap putih bersih agar input jelas
              className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-purple-900/5 border border-white/60 relative overflow-hidden"
            >
              {/* Hiasan kecil di pojok */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full pointer-events-none" />

              <div className="relative z-10">
                  {renderZakat()}
              </div>
              
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ZakatPage;