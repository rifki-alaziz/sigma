import React, { useState } from "react";
import { Calculator, Store } from "lucide-react";
import { motion } from "framer-motion";

const ZakatPerdagangan = () => {
  // State input sebagai string agar fleksibel saat kosong
  const [modal, setModal] = useState("");
  const [keuntungan, setKeuntungan] = useState("");
  const [utang, setUtang] = useState("");
  
  const [hasil, setHasil] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const nisab = 85000000; // Est. setara 85 gram emas

  const hitung = () => {
    const valModal = parseFloat(modal) || 0;
    const valLaba = parseFloat(keuntungan) || 0;
    const valUtang = parseFloat(utang) || 0;

    const totalAset = valModal + valLaba - valUtang;
    const wajib = totalAset >= nisab;
    
    setHasil(wajib ? totalAset * 0.025 : 0);
    setShowResult(true);
  };

  // Helper untuk mereset hasil saat input berubah
  const handleInputChange = (setter: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }, value: string) => {
    setter(value);
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
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <Store size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1e1e1e]">
            Zakat Perdagangan
          </h2>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Nisab zakat perdagangan setara 85 gram emas (± Rp85.000.000). 
            Dihitung dari total aset lancar dikurangi hutang jangka pendek.
          </p>
        </div>
      </div>

      {/* --- Input Section --- */}
      <div className="space-y-4">
        {/* Input Modal */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Modal Diputar / Aset Lancar
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
            <input
              type="number"
              value={modal}
              onChange={(e) => handleInputChange(setModal, e.target.value)}
              placeholder="0"
              className="w-full bg-gray-50 border-none rounded-[20px] pl-12 pr-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-blue-200 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Input Keuntungan */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Keuntungan / Laba
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
            <input
              type="number"
              value={keuntungan}
              onChange={(e) => handleInputChange(setKeuntungan, e.target.value)}
              placeholder="0"
              className="w-full bg-gray-50 border-none rounded-[20px] pl-12 pr-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-blue-200 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Input Utang */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Utang Jatuh Tempo
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
            <input
              type="number"
              value={utang}
              onChange={(e) => handleInputChange(setUtang, e.target.value)}
              placeholder="0"
              className="w-full bg-gray-50 border-none rounded-[20px] pl-12 pr-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-red-200 transition-all placeholder:text-gray-300"
            />
          </div>
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
              ? "bg-blue-50 border-blue-100" 
              : "bg-gray-50 border-gray-100"
          }`}
        >
          {hasil > 0 ? (
            <>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Zakat Perdagangan
              </p>
              <p className="text-3xl font-black text-[#1e1e1e]">
                Rp {hasil.toLocaleString("id-ID")}
              </p>
            </>
          ) : (
            <div className="text-gray-500 py-2">
               <p className="font-bold mb-1">Belum Wajib Zakat</p>
               <p className="text-xs">Total aset bersih belum mencapai nisab.</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZakatPerdagangan;