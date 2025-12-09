import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap } from "lucide-react";

// Components
import MenuIcons from "../components/UI/MenuIcons";
import ArticleSlider from "../components/UI/ArticleSlider";
import VideoSlider from "../components/UI/VideoSlide";
import Gallery from "../components/Gallery";
import galleryData from "../data/galleryData.json";

const Home: React.FC = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAd(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const closeAd = () => setShowAd(false);

  return (
    <div className="min-h-screen bg-transparent font-sans overflow-x-hidden pb-28">
      
      {/* Dekorasi Background Abstrak */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl" />
          <div className="absolute top-40 -right-20 w-80 h-80 bg-purple-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-0 space-y-0">

        {/* 1. MENU ICONS */}
        {/* Kasih z-20 biar menu tetap di atas banner kalau overlapping */}
        <section className="relative z-20">
           <MenuIcons />
        </section>

        {/* 2. PROMO BANNER */}
        {/* PERUBAHAN UTAMA:
            -mt-24 (Margin Top -96px)
            Ini akan menarik banner SANGAT KUAT ke atas, melawan padding dari MenuIcons.
            Sekarang harusnya "hampir rapat".
        */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative -mt-24 z-0 mb-6" 
        >
           <div className="group relative w-full h-36 md:h-48 rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-900/10 border border-white/30">
              {/* Image */}
              <img
                src="https://www.gramedia.com/blog/content/images/2021/05/Hari-Buku-Nasional_Twitter-min.png"
                alt="Promosi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

              {/* Content Text */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <Zap size={10} fill="currentColor" /> Promo
                     </span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold leading-tight">
                    Hari Buku Nasional
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 line-clamp-1">
                    Diskon spesial untuk kitab dan buku pelajaran.
                  </p>
              </div>
           </div>
        </motion.section>

        {/* 3. ARTICLES SLIDER */}
        <section className="mt-4"> 
           <ArticleSlider />
        </section>

        {/* 4. VIDEO SLIDER */}
        <section className="mt-4">
           <VideoSlider />
        </section>
           
        {/* 5. GALLERY */}
        <section className="mt-4">
           <Gallery
             images={galleryData.galleryImages}
             nextUrl="/koleksi-lengkap" 
           />
        </section>

      </div>

      {/* --- POPUP IKLAN --- */}
      <AnimatePresence>
        {showAd && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative w-full max-w-sm border border-white/50"
            >
              <button
                onClick={closeAd}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md text-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-all shadow-lg"
              >
                <X size={20} />
              </button>

              <div className="relative h-56">
                <img
                  src="https://pbs.twimg.com/media/Ft4SIzNakAQjtRl.jpg"
                  alt="Iklan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              <div className="p-6 text-center -mt-6 relative z-10">
                <h2 className="text-xl font-extrabold text-gray-800 mb-2">
                  Iklan Spesial! 🎉
                </h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Dapatkan penawaran eksklusif dan promo menarik khusus untuk hari ini.
                </p>
                
                <button
                  onClick={() => window.open("https://example.com/promo", "_blank")}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <span>Lihat Detail Promo</span>
                  <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;