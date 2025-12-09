import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpen,
  Store,
  Calculator,
  Briefcase,
  LucideIcon,
  ArrowRight,
  ChevronRight, // Tambah icon ini
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- INTERFACES ---
interface CalendarDay {
  dayName: string;
  dateNum: number;
  fullDate: Date;
}

interface CardItem {
  title: string;
  icon: LucideIcon;
  bgColor: string;
  path: string;
  isTall?: boolean;
  isWide?: boolean;
  decoration: string;
}

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const MenuIcons: React.FC = () => {
  const navigate = useNavigate();
  
  const [showPopup] = useState<boolean>(false);
  const [activeDateIndex, setActiveDateIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // 📅 Generate 7 Hari Kedepan
  const calendarDays: CalendarDay[] = useMemo(() => {
    const days: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      days.push({
        dayName: date.toLocaleDateString('id-ID', { weekday: 'short' }), 
        dateNum: date.getDate(),
        fullDate: date
      });
    }
    return days;
  }, []);

  // --- MENU CONFIGURATION ---
  const cards: CardItem[] = [
    {
      title: "Mahasantri",
      icon: Users,
      bgColor: "bg-[#ffcd73]",
      path: "/students",
      isTall: true,
      decoration: "sphere-orange"
    },
    {
      title: "Mustahiq",
      icon: GraduationCap,
      bgColor: "bg-[#cce0ff]",
      path: "/teachers",
      decoration: "cube-blue"
    },
    {
      title: "Ijazahan",
      icon: BookOpen,
      bgColor: "bg-[#fdbaff]",
      path: "/istigosah",
      decoration: "donat-pink"
    },
    {
      title: "Toko",
      icon: Store,
      bgColor: "bg-[#bfaaff]",
      path: "/store",
      decoration: "tube-purple"
    },
    {
      title: "Kalkulator", // Sudah diganti jadi Kalkulator
      icon: Calculator,
      bgColor: "bg-[#b8e994]",
      path: "/tools", 
      decoration: "sphere-green"
    },
    {
      title: "Tim",
      icon: Briefcase,
      bgColor: "bg-[#ffabab]", 
      path: "/team", 
      isWide: true,
      decoration: "cone-red"
    },
  ];

  return (
    <div className="px-4 md:px-6 pt-6 pb-4" ref={containerRef}>

      {/* === CALENDAR STRIP === */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
             {/* Judul Jadwal jadi Putih/Terang biar kebaca di bg gelap */}
             <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider drop-shadow-sm">
               Jadwal
             </h3>
             
             {/* 👇 TOMBOL LIHAT SEMUA (BUBBLE STYLE) */}
             <button 
               onClick={() => navigate("/calendar")} 
               className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm hover:bg-white/30 transition-all active:scale-95"
             >
               <span>Lihat Semua</span>
               <ChevronRight size={12} />
             </button>
        </div>
        
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 md:-mx-6 md:px-6 py-2 pb-4 snap-x">
            {calendarDays.map((item, index) => {
            const isActive = index === activeDateIndex;
            return (
                <motion.button
                key={index}
                onClick={() => setActiveDateIndex(index)}
                whileTap={{ scale: 0.95 }}
                className={`
                    snap-center flex-shrink-0 flex flex-col items-center justify-center
                    min-w-[52px] h-[76px] md:min-w-[56px] md:h-[80px] rounded-[20px] md:rounded-[24px]
                    transition-all duration-300 border backdrop-blur-sm
                    ${isActive
                    ? "bg-[#1e1e1e] text-white border-[#1e1e1e] shadow-lg shadow-black/20 scale-105"
                    : "bg-white/80 text-gray-600 border-white/40 hover:bg-white shadow-sm"}
                `}
                >
                <span className={`text-[10px] md:text-[11px] font-medium mb-1 ${isActive ? "opacity-80" : ""}`}>
                    {item.dayName}
                </span>
                <span className="text-[16px] md:text-[18px] font-bold">
                    {item.dateNum}
                </span>
                {isActive && (
                    <motion.div
                    layoutId="activeDot"
                    className="w-1 md:w-1.5 h-1 md:h-1.5 bg-green-400 rounded-full mt-1.5 md:mt-2"
                    />
                )}
                </motion.button>
            );
            })}
        </div>
      </div>

      {/* === MENU GRID (BENTO STYLE) === */}
      <h3 className="text-xl font-bold text-white mb-4 px-1 drop-shadow-md">Menu Utama</h3>

      <motion.div
        className="grid grid-cols-2 gap-3 md:gap-4 auto-rows-[minmax(130px,auto)] grid-flow-dense pb-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isTall = card.isTall;
          const isWide = card.isWide;
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`
                 menu-card relative cursor-pointer group 
                 ${isTall ? "row-span-2 h-full" : ""} 
                 ${isWide ? "col-span-2 w-full" : "h-auto"} 
              `}
              onClick={() => navigate(card.path)}
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`
                ${card.bgColor} 
                ${isTall ? "h-full" : "min-h-[140px] md:h-[150px]"} 
                p-4 md:p-5 rounded-[24px] md:rounded-[30px] flex flex-col justify-between items-start 
                relative shadow-lg shadow-black/5 overflow-hidden border border-white/40 
                transition-shadow hover:shadow-xl
              `}>
                
                {/* Header Card */}
                <div className="w-full flex justify-between items-start z-10">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center text-[#1e1e1e] shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={2} />
                  </div>
                  {(isTall || isWide) && (
                      <div className="bg-white/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <span className="text-[9px] md:text-[10px] font-bold text-gray-700">
                             {isTall ? "UTAMA" : "BARU"}
                          </span>
                      </div>
                  )}
                </div>

                {/* --- 3D DECORATIONS --- */}
                {card.decoration === "sphere-orange" && (
                    <div className="absolute top-[40%] right-[-30px] w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-orange-300/80 to-yellow-200/80 blur-[2px] shadow-inner" />
                )}
                {card.decoration === "cube-blue" && (
                    <div className="absolute bottom-[-10px] right-[-10px] w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-300 to-blue-500 rounded-3xl opacity-60 rotate-12" />
                )}
                {card.decoration === "donat-pink" && (
                    <div className="absolute top-[-20px] right-[-20px] w-20 h-20 md:w-24 md:h-24 rounded-full border-[12px] md:border-[16px] border-pink-400/40 opacity-80" />
                )}
                {card.decoration === "tube-purple" && (
                    <div className="absolute bottom-[-20px] right-2 w-12 h-24 md:w-14 md:h-28 bg-gradient-to-t from-purple-400/70 to-purple-200/50 rounded-full rotate-[30deg]" />
                )}
                {card.decoration === "sphere-green" && (
                      <div className="absolute bottom-[-10px] right-[-10px] w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-300 to-green-500 opacity-60 shadow-lg" />
                )}
                {card.decoration === "cone-red" && (
                      <div className="absolute bottom-[-20px] right-[-10px] w-0 h-0 border-l-[30px] md:border-l-[40px] border-l-transparent border-b-[60px] md:border-b-[80px] border-b-red-400/50 border-r-[30px] md:border-r-[40px] border-r-transparent rotate-[-15deg] opacity-70 mix-blend-multiply" />
                )}

                {/* Text Content */}
                <div className="z-10 mt-3 md:mt-4 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                        <h3 className="font-bold text-base md:text-lg text-[#1e1e1e] leading-tight mb-1">{card.title}</h3>
                        {isWide && (
                            <p className="text-[10px] md:text-[11px] text-[#1e1e1e]/70 font-medium max-w-[150px] md:max-w-[200px] leading-snug">
                                Kenalan sama tim hebat & struktur organisasi.
                            </p>
                        )}
                    </div>

                    {!isTall && !isWide && (
                        <p className="text-[9px] md:text-[10px] text-[#1e1e1e]/60 font-medium group-hover:translate-x-1 transition-transform">Buka →</p>
                    )}
                    
                    {isWide && (
                         <div className="bg-black/10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[#1e1e1e] group-hover:bg-black/20 transition-colors">
                            <ArrowRight size={14} />
                         </div>
                    )}
                  </div>

                  {isTall && (
                    <div className="space-y-0.5 md:space-y-1 opacity-80 mt-2">
                      <p className="text-[10px] md:text-[11px] font-medium text-[#1e1e1e]">Data Santri</p>
                      <p className="text-[10px] md:text-[11px] font-medium text-[#1e1e1e]">Laporan & Nilai</p>
                      <div className="mt-2 md:mt-3 inline-flex items-center gap-1 bg-black/5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full hover:bg-black/10 transition-colors">
                          <span className="text-[9px] md:text-[10px] font-bold">Buka Data</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Placeholder Popup */}
      <AnimatePresence>
        {showPopup && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
           >
               <div className="bg-white p-6 rounded-2xl">
                   <p>Popup Content</p>
               </div>
           </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MenuIcons;