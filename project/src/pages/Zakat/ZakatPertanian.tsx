import React, { useState } from "react";
import { Calculator, Wheat, Droplets } from "lucide-react";
import { motion } from "framer-motion";

const ZakatPertanian = () => {
  // State input string agar fleksibel
  const [hasilPanen, setHasilPanen] = useState("");
  const [jenisAir, setJenisAir] = useState("hujan");
  const [hargaGabah, setHargaGabah] = useState("");
  
  const [hasil, setHasil] = useState({ zakatKg: 0, zakatRp: 0 });
  const [showResult, setShowResult] = useState(false);

  const nisab = 520; // 520 kg gabah (pendapat umum setara 5 wasaq)

  const hitung = () => {
    const panen = parseFloat(hasilPanen);
    const harga = parseFloat(hargaGabah);

    if (isNaN(panen) || panen <= 0) return;

    const wajib = panen >= nisab;
    const persen = jenisAir === "hujan" ? 0.1 : 0.05; // 10% vs 5%
    
    const zakatKg = wajib ? panen * persen : 0;
    const zakatRp = (wajib && !isNaN(harga)) ? zakatKg * harga : 0;

    setHasil({ zakatKg, zakatRp });
    setShowResult(true);
  };

  // Helper reset hasil saat input berubah
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
        <div className="p-3 bg-green-100 text-green-600 rounded-full">
          <Wheat size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1e1e1e]">
            Zakat Pertanian
          </h2>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Nisab zakat pertanian adalah <b>520 kg gabah</b>. 
            Besaran zakat: <b>10%</b> (air hujan/sungai) atau <b>5%</b> (irigasi/pompa).
          </p>
        </div>
      </div>

      {/* --- Input Section --- */}
      <div className="space-y-4">
        
        {/* Input Hasil Panen & Jenis Air */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Total Hasil Panen
            </label>
            <div className="relative">
              <input
                type="number"
                value={hasilPanen}
                onChange={(e) => handleInputChange(setHasilPanen, e.target.value)}
                placeholder="0"
                className="w-full bg-gray-50 border-none rounded-[20px] px-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-gray-300"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">Kg</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Sistem Pengairan
            </label>
            <div className="relative">
              <select
                value={jenisAir}
                onChange={(e) => handleInputChange(setJenisAir, e.target.value)}
                className="w-full bg-gray-50 border-none rounded-[20px] px-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-green-200 transition-all appearance-none cursor-pointer"
              >
                <option value="hujan">Air Hujan / Sungai (10%)</option>
                <option value="irigasi">Irigasi / Pompa (5%)</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-green-600">
                 <Droplets size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Input Harga Gabah (Opsional) */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Harga Gabah per Kg (Opsional)
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
            <input
              type="number"
              value={hargaGabah}
              onChange={(e) => handleInputChange(setHargaGabah, e.target.value)}
              placeholder="0"
              className="w-full bg-gray-50 border-none rounded-[20px] pl-12 pr-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-green-200 transition-all placeholder:text-gray-300"
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1 ml-2">Isi jika ingin menghitung konversi nilai zakat dalam Rupiah.</p>
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
            hasil.zakatKg > 0 
              ? "bg-green-50 border-green-100" 
              : "bg-gray-50 border-gray-100"
          }`}
        >
          {hasil.zakatKg > 0 ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Zakat Beras/Gabah
                </p>
                <p className="text-3xl font-black text-[#1e1e1e]">
                  {hasil.zakatKg.toLocaleString("id-ID", { maximumFractionDigits: 2 })} <span className="text-lg font-bold text-gray-500">Kg</span>
                </p>
              </div>
              
              {hasil.zakatRp > 0 && (
                <div className="pt-3 border-t border-green-200/50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Konversi Rupiah
                  </p>
                  <p className="text-xl font-bold text-green-700">
                    Rp {hasil.zakatRp.toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 py-2">
               <p className="font-bold mb-1">Belum Wajib Zakat</p>
               <p className="text-xs">Hasil panen belum mencapai nisab (520 kg).</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZakatPertanian;