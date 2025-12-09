import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Maximize2, X, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

interface GalleryProps {
  images: string[];
  nextUrl: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, nextUrl }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Tinggi acak untuk efek Masonry
  const sizes = ["h-48", "h-60", "h-72"];
  const getRandomSize = () => sizes[Math.floor(Math.random() * sizes.length)];

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent pb-24 pt-8 font-sans">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-1/3 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl mix-blend-multiply" />
         <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white border border-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm"
          >
            <Camera size={14} />
            <span>Galeri Kegiatan</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Momen <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Berharga</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Kumpulan dokumentasi kegiatan santri yang penuh makna dan kenangan indah.
          </p>
        </div>

        {/* --- MASONRY GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="break-inside-avoid"
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                // PERUBAHAN DI SINI AY:
                // 1. Aku hapus 'p-2' (padding) dan 'bg-white'
                // 2. Aku tambah 'overflow-hidden' biar gambarnya ngikutin rounded
                // 3. Border aku tipisin atau ilangin biar makin clean
                className={`
                  group relative rounded-[1.5rem] shadow-md hover:shadow-2xl hover:shadow-pink-100/50 
                  transition-all duration-500 cursor-pointer overflow-hidden bg-gray-100
                `}
                onClick={() => setSelectedImage(image)}
              >
                {/* Wrapper gambar langsung full size */}
                <div className={`relative w-full ${getRandomSize()}`}>
                   <img
                    src={image}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay efek */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/30 backdrop-blur-md p-3 rounded-full text-white border border-white/40">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- NEXT BUTTON (Floating) --- */}
        <div className="flex justify-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05, paddingRight: "2.5rem" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(nextUrl)}
            className="
              relative group flex items-center gap-3 
              bg-white text-gray-800 px-8 py-4 rounded-full 
              shadow-xl shadow-gray-200 font-bold text-sm md:text-base border border-gray-100
              hover:border-pink-200 transition-all duration-300
            "
          >
            <span>Lihat Koleksi Lengkap</span>
            <div className="absolute right-2 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all duration-300">
              <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </motion.button>
        </div>

      </div>

      {/* --- MODAL PREVIEW --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // Di modal juga aku ilangin paddingnya biar makin immersive
              className="relative max-w-5xl w-full rounded-[1.5rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full bg-black relative flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              </div>
              
              <button
                onClick={() => setSelectedImage(null)}
                className="
                  absolute top-4 right-4
                  bg-black/50 hover:bg-black/80 backdrop-blur-md text-white
                  w-10 h-10 rounded-full 
                  flex items-center justify-center 
                  transition-all hover:rotate-90 z-50 border border-white/20
                "
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;