import React from "react";
import { motion } from "framer-motion";
import { User, Baby, Heart, Percent, Coins, Scale } from "lucide-react"; // Tambah Scale icon
import { HasilWaris } from "../../utils/hitungWaris";

const WarisResult: React.FC<{ hasil: HasilWaris[] }> = ({ hasil }) => {
  if (hasil.length === 0) return null;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getIcon = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes("suami") || lowerRole.includes("ayah"))
      return <User size={20} className="text-blue-600" />;
    if (lowerRole.includes("istri") || lowerRole.includes("ibu"))
      return <User size={20} className="text-pink-600" />;
    if (lowerRole.includes("anak")) return <Baby size={20} className="text-emerald-600" />;
    if (lowerRole.includes("sisa")) return <Scale size={20} className="text-orange-500" />; // Icon untuk sisa/baitul mal
    return <Heart size={20} className="text-purple-600" />;
  };

  // Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const totalDibagikan = hasil.reduce((acc, curr) => acc + curr.nilai, 0);

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          Rincian Pembagian
        </h3>
        {/* Highlight Total */}
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full shadow-sm">
           Total: {formatRupiah(totalDibagikan)}
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {hasil.map((h, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }} // Scale dikit aja biar elegan
            // Styling Card yang clean
            className="bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 relative overflow-hidden"
          >
            {/* Indikator Warna di kiri */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-400 opacity-80" />

            {/* Nama & Bagian */}
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                {getIcon(h.nama)}
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-gray-800 leading-tight text-sm md:text-base">
                  {h.nama}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                       {h.bagian}
                    </span>
                </div>
              </div>
            </div>

            {/* Nominal */}
            <div className="text-right">
              <p className="text-emerald-700 font-extrabold text-sm md:text-lg">
                {formatRupiah(h.nilai)}
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 font-medium mt-0.5">
                <Percent size={10} />
                {/* Tampilkan 2 desimal jika perlu presisi */}
                <span>{(h.persentase * 100).toFixed(2)}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 pt-4 border-t border-dashed border-gray-200 text-center">
        <p className="text-[10px] text-gray-400 italic flex items-center justify-center gap-1.5">
          <Coins size={12} className="text-yellow-500" />
          <span>Perhitungan berdasarkan Kompilasi Hukum Islam (KHI)</span>
        </p>
      </div>
    </div>
  );
};

export default WarisResult;