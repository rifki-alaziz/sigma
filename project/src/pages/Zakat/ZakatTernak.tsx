import React, { useState } from "react";
import { Calculator, Beef, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

const ZakatTernak = () => {
  const [jenis, setJenis] = useState("kambing");
  // State input sebagai string agar fleksibel
  const [jumlah, setJumlah] = useState("");
  const [hasil, setHasil] = useState("");
  const [showResult, setShowResult] = useState(false);

  const hitungZakat = () => {
    const qty = parseInt(jumlah);

    if (isNaN(qty) || qty < 0) {
      // Reset jika invalid
      return; 
    }

    let zakat = "";

    if (jenis === "kambing") {
      if (qty < 40) zakat = "Belum wajib zakat (kurang dari 40 ekor).";
      else if (qty <= 120) zakat = "1 ekor kambing/domba";
      else if (qty <= 200) zakat = "2 ekor kambing/domba";
      else if (qty <= 300) zakat = "3 ekor kambing/domba";
      else {
        const tambahan = Math.floor(qty / 100);
        zakat = `${tambahan} ekor kambing/domba`;
      }
    }

    if (jenis === "sapi") {
      if (qty < 30) zakat = "Belum wajib zakat (kurang dari 30 ekor).";
      else if (qty < 40)
        zakat = "1 ekor sapi jantan/betina (tabi’ - umur 1 tahun)";
      else if (qty < 60)
        zakat = "1 ekor sapi betina (musinnah - umur 2 tahun)";
      else if (qty < 70)
        zakat = "2 ekor sapi (tabi’)";
      else if (qty < 80)
        zakat = "1 ekor musinnah + 1 ekor tabi’";
      else {
        // Logika sederhana untuk > 80 (Perhitungan kompleks biasanya butuh algoritma optimasi)
        const tabi = Math.floor(qty / 30);
        const musinnah = Math.floor(qty / 40);
        zakat = `Kombinasi: Setiap 30 ekor = 1 tabi’, setiap 40 ekor = 1 musinnah. (Est: ${tabi} tabi' / ${musinnah} musinnah)`;
      }
    }

    setHasil(zakat);
    setShowResult(true);
  };

  // Reset hasil saat input/jenis berubah
  const handleChange = (setter: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }, val: string) => {
    setter(val);
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
        <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
          {jenis === "kambing" ? <PawPrint size={24} /> : <Beef size={24} />}
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1e1e1e]">
            Zakat Ternak
          </h2>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Hitung zakat untuk hewan ternak (Kambing/Domba atau Sapi/Kerbau) yang digembalakan.
          </p>
        </div>
      </div>

      {/* --- Jenis Ternak Switcher --- */}
      <div className="bg-gray-100 p-1 rounded-[24px] flex relative">
        {/* Background Slider Animation (Optional simple implementation) */}
        <button
          onClick={() => handleChange(setJenis, "kambing")}
          className={`flex-1 py-3 rounded-[20px] text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            jenis === "kambing"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <PawPrint size={16} />
          Kambing
        </button>
        <button
          onClick={() => handleChange(setJenis, "sapi")}
          className={`flex-1 py-3 rounded-[20px] text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            jenis === "sapi"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Beef size={16} />
          Sapi / Kerbau
        </button>
      </div>

      {/* --- Input Section --- */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Jumlah Hewan (Ekor)
          </label>
          <div className="relative">
            <input
              type="number"
              value={jumlah}
              onChange={(e) => handleChange(setJumlah, e.target.value)}
              placeholder="0"
              className="w-full bg-gray-50 border-none rounded-[20px] px-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-orange-200 transition-all placeholder:text-gray-300"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">Ekor</span>
          </div>
        </div>
      </div>

      {/* --- Action Button --- */}
      <button
        onClick={hitungZakat}
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
            hasil.includes("Belum")
              ? "bg-gray-50 border-gray-100"
              : "bg-orange-50 border-orange-100"
          }`}
        >
          {hasil.includes("Belum") ? (
             <div className="text-gray-500 py-2">
                <p className="font-bold mb-1">Belum Wajib Zakat</p>
                <p className="text-xs">Jumlah hewan belum mencapai nisab.</p>
             </div>
          ) : (
             <>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                 Zakat yang harus dikeluarkan
               </p>
               <p className="text-lg font-bold text-[#1e1e1e] leading-tight">
                 {hasil}
               </p>
             </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZakatTernak;