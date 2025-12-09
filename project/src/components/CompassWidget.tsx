// src/components/CompassWidget.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowUp } from 'lucide-react';
// 👇 Ini dia otak utamanya, tetap kita pakai
import { getQiblaAngle } from '../utils/prayerMath';

interface CompassWidgetProps {
  heading: number;
  qiblaStr: string;
}

const CompassWidget: React.FC<CompassWidgetProps> = ({ heading, qiblaStr }) => {
  // 👇 Kita ambil sudutnya murni dari utils kamu
  const qiblaDegree = getQiblaAngle(qiblaStr);

  // Logic biar 'Ayang' tau kalau udah lurus
  // Menghitung selisih sudut heading HP vs sudut Kiblat
  const diff = Math.abs(heading - qiblaDegree);
  // Toleransi 5 derajat (kiri/kanan) dianggap lurus
  const isAligned = diff < 5 || diff > 355; 

  return (
    <div className={`transition-all duration-500 rounded-[32px] p-6 shadow-xl border flex flex-col items-center justify-center relative overflow-hidden ${
      isAligned 
        ? 'bg-green-50 border-green-200 shadow-green-100' 
        : 'bg-white border-white/60 shadow-gray-200'
    }`}>
       
       {/* Header Judul */}
       <div className="flex flex-col items-center z-10">
         <h3 className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${isAligned ? 'text-green-600' : 'text-gray-400'}`}>
           <Compass size={14} /> Arah Kiblat
         </h3>
         {isAligned && (
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1"
            >
              LURUS!
            </motion.span>
         )}
       </div>
       
       {/* CONTAINER KOMPAS UTAMA */}
       <div className="relative w-56 h-56 mt-6 mb-2 flex items-center justify-center">
         
         {/* 1. Static Marker (Jarum HP Kamu/Device Heading) - Selalu di Atas (Jam 12) */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <div className="w-1.5 h-4 bg-red-500 rounded-full shadow-md mb-1" />
            <ArrowUp size={12} className="text-red-500 animate-bounce" />
         </div>

         {/* 2. Piringan Kompas Berputar (Utara Sebenarnya Berputar Sesuai Heading) */}
         <motion.div 
           className="relative w-full h-full rounded-full border-4 border-gray-100 bg-gradient-to-tr from-white to-gray-50 shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] flex items-center justify-center"
           // Kalau HP muter ke kanan (heading nambah), piringan muter ke kiri (-heading)
           animate={{ rotate: -heading }} 
           transition={{ type: "spring", stiffness: 45, damping: 15, mass: 1 }} // Sedikit aku tuning biar lebih responsif
         >
           
           {/* Hiasan Garis-Garis Derajat (Ticks) */}
           {Array.from({ length: 36 }).map((_, i) => {
             const deg = i * 10;
             const isCardinal = deg % 90 === 0; // N, E, S, W
             return (
               <div
                 key={i}
                 className={`absolute top-0 left-1/2 -translate-x-1/2 origin-bottom h-full pointer-events-none`}
                 style={{ transform: `rotate(${deg}deg)` }}
               >
                 <div className={`w-[1px] ${isCardinal ? 'h-3 bg-gray-400' : 'h-1.5 bg-gray-200'}`} />
               </div>
             );
           })}

           {/* Arah Mata Angin */}
           <div className="absolute inset-2">
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-black text-red-500">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">S</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">E</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">W</span>
           </div>

           {/* 3. JARUM KIBLAT (KA'BAH POINTER) */}
           {/* Ini fix di piringan pada derajat Kiblat yang dihitung prayerMath */}
           <div 
             className="absolute top-0 left-1/2 h-1/2 w-0.5 origin-bottom z-20 flex flex-col items-center justify-start pt-3"
             style={{ transform: `rotate(${qiblaDegree}deg)` }}
           >
              {/* Garis Penunjuk */}
              <div className={`w-0.5 h-full absolute top-0 ${isAligned ? 'bg-green-500' : 'bg-green-200'} transition-colors`} />
              
              {/* Ikon Ka'bah (SVG Custom) */}
              <div className="relative z-10 -mt-1 bg-white p-1 rounded-full shadow-sm border border-green-100">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 9V20H22V9L12 4L2 9ZM12 2L24 8V22H0V8L12 2Z" fillOpacity="0.1"/>
                    <rect x="4" y="9" width="16" height="11" rx="1" fill="#1e1e1e" />
                    <rect x="4" y="11" width="16" height="2" fill="#FBBF24" />
                </svg>
              </div>
           </div>

           {/* Titik Pusat */}
           <div className="absolute w-8 h-8 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center z-40">
              <div className={`w-2 h-2 rounded-full transition-colors ${isAligned ? 'bg-green-500' : 'bg-gray-300'}`} />
           </div>

         </motion.div>
       </div>

       {/* Footer Info */}
       <div className="text-center mt-2">
         <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl font-bold text-[#1e1e1e] font-mono tracking-tight">{Math.round(heading)}°</span>
            <span className="text-xs text-gray-400">/ {qiblaStr}</span>
         </div>
         <p className="text-[10px] text-gray-400 mt-1">
            {isAligned ? "Arah kiblat sudah sesuai." : "Putar perangkat sampai ikon Ka'bah lurus ke atas."}
         </p>
       </div>
    </div>
  );
};

export default CompassWidget;