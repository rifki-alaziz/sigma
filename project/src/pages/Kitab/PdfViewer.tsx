import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Maximize, FileText } from "lucide-react";
import { motion } from "framer-motion";

const PdfViewer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfUrl, title } = location.state || {};
  const [, setIsFullscreen] = useState(false);

  // Jika tidak ada data PDF
  if (!pdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white/80 p-4">
        <p className="mb-4 font-medium">Tidak ada dokumen yang dipilih.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/30 transition-all"
        >
          Kembali
        </button>
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    // HAPUS: bg-gray-100. GANTI: h-screen flex flex-col (Transparent)
    <div className="flex flex-col h-screen font-sans">
      
      {/* --- HEADER (Glassmorphism) --- */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-white"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider flex items-center gap-1">
              <FileText size={10} /> Reading Mode
            </span>
            <h1 className="text-white font-bold text-sm md:text-base line-clamp-1 max-w-[200px] md:max-w-md drop-shadow-md">
              {title || "Dokumen PDF"}
            </h1>
          </div>
        </div>

        <button 
          onClick={toggleFullscreen}
          className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10"
          title="Fullscreen"
        >
          <Maximize size={18} />
        </button>
      </div>

      {/* --- PDF CONTAINER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 w-full h-full p-4 md:p-6 relative"
      >
        {/* Container Putih untuk Iframe */}
        <div className="w-full h-full bg-white rounded-[1.5rem] shadow-2xl shadow-black/20 overflow-hidden border border-white/40 relative">
             <iframe
                src={pdfUrl}
                title="PDF Viewer"
                className="w-full h-full"
                frameBorder="0"
             />
             
             {/* Note kecil (Mobile) */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] px-4 py-2 rounded-full pointer-events-none md:hidden backdrop-blur-md border border-white/10 shadow-lg">
                Gunakan dua jari untuk zoom
             </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PdfViewer;