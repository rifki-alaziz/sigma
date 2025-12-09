import React from "react";
import { motion } from "framer-motion";
import { 
  Wallet, 
  UserCheck, 
  Baby, 
  Calculator, 
  CheckCircle2, 
  Circle 
} from "lucide-react";

interface WarisFormProps {
  harta: string;
  setHarta: (value: string) => void;
  suami: boolean;
  setSuami: (value: boolean) => void;
  istri: boolean;
  setIstri: (value: boolean) => void;
  ayah: boolean;
  setAyah: (value: boolean) => void;
  ibu: boolean;
  setIbu: (value: boolean) => void;
  anakLaki: string;
  setAnakLaki: (value: string) => void;
  anakPerempuan: string;
  setAnakPerempuan: (value: string) => void;
  onHitung: () => void;
}

const WarisForm: React.FC<WarisFormProps> = ({
  harta,
  setHarta,
  suami,
  setSuami,
  istri,
  setIstri,
  ayah,
  setAyah,
  ibu,
  setIbu,
  anakLaki,
  setAnakLaki,
  anakPerempuan,
  setAnakPerempuan,
  onHitung,
}) => {

  // Helper format rupiah visual
  const formatRupiah = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="space-y-8 font-sans text-gray-800">
      
      {/* --- INPUT HARTA --- */}
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">
           💰 Total Harta Warisan (Rp)
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Wallet className="text-emerald-500" size={20} />
          </div>
          <input
            type="text"
            value={formatRupiah(harta)}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setHarta(val);
            }}
            className="
              w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 
              rounded-2xl text-lg font-bold text-gray-800 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white
              transition-all outline-none placeholder-gray-300
            "
            placeholder="0"
          />
        </div>
      </div>

      {/* --- AHLI WARIS UTAMA (Toggle Cards) --- */}
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-3 ml-1">
           👥 Ahli Waris Utama (Check jika hidup)
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Suami", state: suami, setState: setSuami, disabled: istri }, 
            { label: "Istri", state: istri, setState: setIstri, disabled: suami },
            { label: "Ayah", state: ayah, setState: setAyah },
            { label: "Ibu", state: ibu, setState: setIbu },
          ].map((item, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => !item.disabled && item.setState(!item.state)}
              disabled={item.disabled}
              className={`
                relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-left
                ${item.state 
                  ? "bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-100" 
                  : "bg-white border-gray-200 hover:border-emerald-300 hover:bg-gray-50"}
                ${item.disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "cursor-pointer"}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center transition-colors
                ${item.state ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}
              `}>
                {item.state ? <CheckCircle2 size={14} /> : <Circle size={14} />}
              </div>
              <span className={`font-bold text-sm ${item.state ? "text-emerald-900" : "text-gray-600"}`}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* --- INPUT ANAK --- */}
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-3 ml-1">
           👶 Jumlah Anak (Kandung)
        </label>
        <div className="grid grid-cols-2 gap-4">
          {/* Anak Laki-laki */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:bg-white transition-all">
             <div className="flex items-center gap-2 mb-2 text-blue-600">
                <UserCheck size={18} />
                <span className="text-xs font-bold uppercase">Laki-laki</span>
             </div>
             <input
               type="number"
               value={anakLaki}
               onChange={(e) => setAnakLaki(e.target.value)}
               className="w-full bg-transparent text-2xl font-bold text-gray-800 outline-none placeholder-gray-300"
               placeholder="0"
               min="0"
             />
          </div>

          {/* Anak Perempuan */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-pink-400 focus-within:bg-white transition-all">
             <div className="flex items-center gap-2 mb-2 text-pink-600">
                <Baby size={18} />
                <span className="text-xs font-bold uppercase">Perempuan</span>
             </div>
             <input
               type="number"
               value={anakPerempuan}
               onChange={(e) => setAnakPerempuan(e.target.value)}
               className="w-full bg-transparent text-2xl font-bold text-gray-800 outline-none placeholder-gray-300"
               placeholder="0"
               min="0"
             />
          </div>
        </div>
      </div>

      {/* --- BUTTON HITUNG --- */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onHitung}
        className="
          w-full bg-gray-900 text-white py-4 px-6 rounded-full 
          font-bold text-lg shadow-xl shadow-gray-300 
          flex items-center justify-center gap-2 
          hover:bg-black transition-all duration-300
        "
      >
        <Calculator size={20} />
        <span>Hitung Pembagian</span>
      </motion.button>

    </div>
  );
};

export default WarisForm;