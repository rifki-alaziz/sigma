import React, { useState } from "react";
import { Calculator, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const ZakatProfesi = () => {
  // State input sebagai string agar fleksibel saat kosong
  const [penghasilan, setPenghasilan] = useState("");
  const [hasil, setHasil] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Nisab Zakat Profesi: Setara 85 gram emas per tahun
  // Asumsi harga emas 1.000.000/gram -> 85.000.000 per tahun
  // Per bulan = 85.000.000 / 12 ≈ 7.083.333
  const nisabTahunan = 85000000;
  const nisabBulanan = nisabTahunan / 12; 

  const hitung = () => {
    const income = parseFloat(penghasilan);

    if (isNaN(income) || income <= 0) return;

    // Cek wajib zakat (penghasilan >= nisab bulanan/tahunan tergantung konteks input)
    // Di sini kita asumsikan input adalah penghasilan per bulan
    const wajib = income >= nisabBulanan;
    
    setHasil(wajib ? income * 0.025 : 0);
    setShowResult(true);
  };

  // Helper reset hasil saat input berubah
  const handleInputChange = (val: React.SetStateAction<string>) => {
    setPenghasilan(val);
    if (showResult) setShowResult(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* --- Header Section --- */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
          <Briefcase size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1e1e1e]">
            Zakat Profesi
          </h2>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Dikenakan pada penghasilan (gaji/honor) jika mencapai nishab (setara 85gr emas/tahun). 
            Kadar zakat <b>2,5%</b>.
          </p>
        </div>
      </div>

      {/* --- Input Section --- */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Total Penghasilan (Per Bulan)
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
            <input
              type="number"
              value={penghasilan}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="0"
              className="w-full bg-gray-50 border-none rounded-[20px] pl-12 pr-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-gray-300"
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1 ml-2">
            Termasuk gaji pokok, tunjangan, bonus, dan pendapatan lain.
          </p>
        </div>
      </div>

      {/* --- Action Button --- */}
      <button
        onClick={hitung}
        className="w-full bg-[#1e1e1e] text-white py-4 rounded-[20px] font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Calculator size={18} />
        Hitung Zakat
      </button>

      {/* --- Result Section --- */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-[28px] mt-2 text-center shadow-sm border ${
            hasil > 0 
              ? "bg-purple-50 border-purple-100" 
              : "bg-gray-50 border-gray-100"
          }`}
        >
          {hasil > 0 ? (
            <>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Zakat yang harus dikeluarkan
              </p>
              <p className="text-3xl font-black text-[#1e1e1e]">
                Rp {hasil.toLocaleString("id-ID")}
              </p>
            </>
          ) : (
            <div className="text-gray-500 py-2">
               <p className="font-bold mb-1">Belum Wajib Zakat</p>
               <p className="text-xs">Penghasilan belum mencapai nisab bulanan (± Rp 7jt).</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZakatProfesi;