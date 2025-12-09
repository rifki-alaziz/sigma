import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Calculator,
  Scale,
  ArrowLeft,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { motion, Variants } from "framer-motion";

interface MenuItemProps {
  id: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  path: string;
  color: string;
  iconBg: string;
  gradient: string;
}

const HitungPage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems: MenuItemProps[] = [
    {
      id: 1,
      title: "Ilmu Falak",
      desc: "Arah Kiblat, Waktu Sholat & Gerhana",
      icon: Compass,
      path: "/falak",
      color: "text-purple-600",
      iconBg: "bg-purple-100",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      id: 2,
      title: "Kalkulator Zakat",
      desc: "Hitung Zakat Maal, Fitrah & Profesi",
      icon: Calculator,
      path: "/zakat",
      color: "text-cyan-600",
      iconBg: "bg-cyan-100",
      gradient: "from-cyan-400 to-teal-500"
    },
    {
      id: 3,
      title: "Hitung Waris",
      desc: "Pembagian Harta Sesuai Syariat",
      icon: Scale,
      path: "/waris",
      color: "text-amber-600",
      iconBg: "bg-amber-100",
      gradient: "from-amber-400 to-orange-500"
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    // HAPUS: bg-[#f8f9fa], HAPUS: decorative blobs
    // GANTI: w-full min-h-screen (Transparent)
    <div className="w-full min-h-screen pb-32">
      
      {/* === HEADER (Glassmorphism) === */}
      <div className="sticky top-0 z-20 px-6 py-6 flex items-center gap-4 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white drop-shadow-md">Alat Hitung</h1>
          <p className="text-xs text-white/80">Kalkulator syariah digital</p>
        </div>
      </div>

      {/* === LIST MENU === */}
      <motion.div 
        className="px-6 py-6 flex flex-col gap-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              // GANTI: Kartu jadi semi-transparan putih (Glass)
              className={`
                relative w-full p-5 rounded-[24px] 
                bg-white/95 backdrop-blur-sm 
                border border-white/50 shadow-lg shadow-black/5
                flex items-center gap-4 cursor-pointer overflow-hidden group
                hover:bg-white transition-colors
              `}
            >
              {/* Icon Box */}
              <div className={`
                w-14 h-14 rounded-2xl ${item.iconBg} ${item.color}
                flex items-center justify-center flex-shrink-0 shadow-sm
              `}>
                <Icon size={26} strokeWidth={2} />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-black transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Arrow Indicator */}
              <div className="text-gray-300 group-hover:text-gray-600 transition-colors">
                <ChevronRight size={20} />
              </div>

              {/* Decorative Gradient Line at Bottom */}
              <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HitungPage;