import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Coins, Store, Sprout, PawPrint } from "lucide-react";

interface Props {
  jenis: string;
  setJenis: (val: string) => void;
}

const tabs = [
  { id: "profesi", label: "Profesi", icon: Briefcase, color: "bg-purple-100 text-purple-600" },
  { id: "emas", label: "Emas", icon: Coins, color: "bg-yellow-100 text-yellow-600" },
  { id: "perdagangan", label: "Perdagangan", icon: Store, color: "bg-blue-100 text-blue-600" },
  { id: "pertanian", label: "Pertanian", icon: Sprout, color: "bg-green-100 text-green-600" },
  { id: "ternak", label: "Ternak", icon: PawPrint, color: "bg-orange-100 text-orange-600" },
];

const ZakatTab: React.FC<Props> = ({ jenis, setJenis }) => {
  return (
    // Container dengan horizontal scroll (overflow-x-auto) agar responsif di mobile
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
      {tabs.map((tab) => {
        const isActive = jenis === tab.id;
        const Icon = tab.icon;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => setJenis(tab.id)}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-[20px] border transition-all whitespace-nowrap
              ${
                isActive
                  ? "bg-[#1e1e1e] border-[#1e1e1e] text-white shadow-md scale-105"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            {/* Icon Circle dengan warna pastel */}
            <div 
              className={`p-1.5 rounded-full flex items-center justify-center ${
                isActive ? "bg-white/20 text-white" : tab.color
              }`}
            >
              <Icon size={16} strokeWidth={2.5} />
            </div>
            
            {/* Label Text */}
            <span className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-600"}`}>
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ZakatTab;