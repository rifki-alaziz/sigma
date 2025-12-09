// src/components/ClockCard.tsx
import React from 'react';
import { Calendar, Sun } from 'lucide-react';

interface ClockCardProps {
  time: Date;
  istiwaTime: string; // Prop baru untuk string waktu istiwa
}

const ClockCard: React.FC<ClockCardProps> = ({ time, istiwaTime }) => {
  return (
    <div className="bg-[#bfaaff] rounded-[32px] p-6 text-[#1e1e1e] shadow-lg relative overflow-hidden group">
      {/* Background Decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/30 rounded-full blur-lg" />

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Jam Utama (WIB/WITA/WIT) */}
        <h2 className="text-5xl font-bold tracking-tight font-mono leading-none mb-1">
          {time.toLocaleTimeString("id-ID", { hour12: false, hour: '2-digit', minute: '2-digit' })}
          <span className="text-2xl ml-1 opacity-60">{time.getSeconds()}</span>
        </h2>

        {/* Jam Istiwa (WIS) */}
        <div className="mt-2 mb-4 flex items-center gap-2 bg-yellow-300/40 border border-yellow-500/30 px-3 py-1 rounded-lg shadow-sm">
           <Sun size={14} className="text-yellow-900 animate-pulse" />
           <span className="text-sm font-bold font-mono text-yellow-900 tracking-widest">
             WIS {istiwaTime}
           </span>
        </div>
        
        {/* Tanggal */}
        <div className="flex items-center justify-center gap-2 opacity-80 text-sm font-medium bg-white/30 py-1 px-3 rounded-full w-fit">
          <Calendar size={14} />
          {time.toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default ClockCard;