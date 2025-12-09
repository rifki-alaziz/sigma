import { useState } from "react";
import { Calculator, Gem, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ZakatEmas = () => {

  const [emas, setEmas] = useState("");
  const [hargaEmas, setHargaEmas] = useState("1000000");
  const [hasil, setHasil] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const nisab = 85; // Nisab emas dalam gram

  const hitung = () => {
    const berat = parseFloat(emas);
    const harga = parseFloat(hargaEmas);
    if (isNaN(berat) || isNaN(harga)) return;

    const total = berat * harga;
    const wajib = berat >= nisab;

    setHasil(wajib ? total * 0.025 : 0);
    setShowResult(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
          <Gem size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1e1e1e]">
            Kalkulator Zakat Emas
          </h2>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Nisab zakat emas adalah <span className="font-bold text-yellow-600">85 gram</span>.
            Jika emasmu sudah mencapai nisab dan tersimpan selama 1 tahun, wajib zakat 2,5%.
          </p>
        </div>
      </div>

      {/* Card Info */}
      <motion.div
  whileHover={{ scale: 1.02 }}
  onClick={() => window.open("https://www.logammulia.com/id/harga-emas-hari-ini", "_blank")}
  className="bg-[#FDE047]/20 p-6 rounded-[2rem] border border-[#FDE047]/50 relative overflow-hidden cursor-pointer"
>
  <div className="relative z-10">
    <span className="bg-[#FDE047] text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">Info</span>
    <h3 className="text-lg font-bold text-gray-800 mt-3">Nisab Emas</h3>
    <p className="text-gray-600 text-sm mt-1 mb-4">85 Gram Emas Murni</p>
    <div className="flex items-center text-sm font-bold text-gray-800">
      Cek Harga <ArrowRight size={16} className="ml-2" />
    </div>
  </div>
  <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-[#FDE047] rounded-full opacity-40 blur-xl"></div>
</motion.div>

      {/* Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Berat Emas (Gram)
          </label>
          <input
            type="number"
            value={emas}
            onChange={(e) => {
              setEmas(e.target.value);
              if (showResult) setShowResult(false);
            }}
            placeholder="0"
            className="w-full bg-gray-50 border-none rounded-[20px] px-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-yellow-200 transition-all placeholder:text-gray-300"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Harga Emas saat ini /gram
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
            <input
              type="number"
              value={hargaEmas}
              onChange={(e) => {
                setHargaEmas(e.target.value);
                if (showResult) setShowResult(false);
              }}
              placeholder="1.000.000"
              className="w-full bg-gray-50 border-none rounded-[20px] pl-12 pr-5 py-4 text-[#1e1e1e] font-bold outline-none focus:ring-2 focus:ring-yellow-200 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={hitung}
        className="w-full bg-[#1e1e1e] text-white py-4 rounded-[20px] font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Calculator size={18} /> Hitung Zakat
      </button>

      {/* Result */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-[28px] mt-2 text-center shadow-sm border ${hasil > 0
              ? "bg-yellow-50 border-yellow-100"
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
              <p className="text-xs">Total emas belum mencapai nisab (85gr).</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZakatEmas;
