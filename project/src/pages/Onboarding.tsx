import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, BookOpen, Users, Loader2 } from "lucide-react";

// Data Slide (Tetap sama)
const SLIDES = [
  {
    id: 1,
    title: "Selamat Datang di SIGMA",
    desc: "Sistem Informasi Digital Terpadu untuk Pesantren. Kelola data santri, guru, dan administrasi dengan mudah dan modern.",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/islamic-school-5392538-4510687.png",
    bg: "bg-teal-50",
    icon: <Sparkles className="w-12 h-12 text-teal-500" />,
  },
  {
    id: 2,
    title: "Fitur Islami Lengkap",
    desc: "Dilengkapi dengan Kalkulator Waris, Zakat, Digital Falak, hingga Tanya Jawab Fiqih untuk kebutuhan umat sehari-hari.",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/muslim-man-reading-quran-4550345-3775472.png",
    bg: "bg-blue-50",
    icon: <BookOpen className="w-12 h-12 text-blue-500" />,
  },
  {
    id: 3,
    title: "Komunitas & Edukasi",
    desc: "Terhubung dengan asatidz, akses materi pembelajaran, dan pantau perkembangan pendidikan santri dalam satu genggaman.",
    image: "https://cdni.iconscout.com/illustration/premium/thumb/group-of-muslim-people-4926122-4106485.png",
    bg: "bg-purple-50",
    icon: <Users className="w-12 h-12 text-purple-500" />,
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);
  
  // ✨ Tambahan: State Loading biar tombol responsif
  const [isLoading, setIsLoading] = useState(false);

  // ✨ TEKNIK RAHASIA: Preload Halaman Login
  // Ini akan download chunk Login page di background saat user baca onboarding
  useEffect(() => {
    const preloadLogin = async () => {
      try {
        // Ganti path ini sesuai lokasi file Login page kamu
        await import("../pages/Login"); 
        console.log("Login page preloaded");
      } catch (error) {
        console.error("Failed to preload login", error);
      }
    };
    preloadLogin();
  }, []);

  const handleFinish = () => {
    setIsLoading(true); // Kasih visual loading
    localStorage.setItem("hasSeenOnboarding", "true");
    
    // Kasih sedikit delay visual (opsional) atau langsung gas
    setTimeout(() => {
        navigate("/login");
    }, 300);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  // Variants animasi tetap sama
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-white font-sans">
      
      {/* Background Decor */}
      <div className={`absolute inset-0 transition-colors duration-700 ${SLIDES[currentIndex].bg}`}>
         <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/40 rounded-full blur-3xl" />
         <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-white/40 rounded-full blur-3xl" />
      </div>

      {/* Tombol Skip */}
      <div className="relative z-10 flex justify-end p-6">
        {currentIndex < SLIDES.length - 1 && (
          <button
            onClick={handleFinish}
            disabled={isLoading}
            className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors px-4 py-2 rounded-full hover:bg-black/5 disabled:opacity-50"
          >
            {isLoading ? "Memuat..." : "Lewati"}
          </button>
        )}
      </div>

      {/* Konten Slide */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-md relative h-[500px] flex flex-col items-center">
          
          {/* Gambar */}
          <div className="relative w-full h-64 mb-8 flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="w-64 h-64 bg-white rounded-full shadow-2xl shadow-gray-200/50 flex items-center justify-center relative overflow-hidden mb-6 border-4 border-white">
                    <img 
                        src={SLIDES[currentIndex].image} 
                        alt="Illustration"
                        className="w-48 h-48 object-contain relative z-10"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x200/png?text=SIGMA')}
                    />
                    <div className="absolute bottom-4 right-8 bg-white p-3 rounded-full shadow-lg">
                        {SLIDES[currentIndex].icon}
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Teks */}
          <div className="text-center h-40">
             <AnimatePresence mode="wait">
                <motion.div
                   key={currentIndex}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.3 }}
                >
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-3 leading-tight">
                      {SLIDES[currentIndex].title}
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed px-4">
                      {SLIDES[currentIndex].desc}
                    </p>
                </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Kontrol Bawah */}
      <div className="relative z-10 p-8 flex flex-col items-center gap-8">
        {/* Indikator */}
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <motion.div
              key={idx}
              animate={{
                width: idx === currentIndex ? 24 : 8,
                backgroundColor: idx === currentIndex ? "#111827" : "#D1D5DB",
              }}
              className="h-2 rounded-full transition-all duration-300 cursor-pointer"
              onClick={() => {
                 if (!isLoading) {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                 }
              }}
            />
          ))}
        </div>

        {/* Tombol Navigasi dengan Loading State */}
        <motion.button
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          onClick={handleNext}
          disabled={isLoading}
          className={`
            w-full max-w-xs py-4 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-2 text-white transition-all duration-300
            ${currentIndex === SLIDES.length - 1 ? "bg-gray-900 hover:bg-black shadow-gray-400/50" : "bg-blue-600 hover:bg-blue-700 shadow-blue-300/50"}
            ${isLoading ? "opacity-80 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? (
             <>Processing <Loader2 className="animate-spin" size={20} /></>
          ) : (
             currentIndex === SLIDES.length - 1 ? (
               <>Mulai Sekarang <Check size={20} /></>
             ) : (
               <>Lanjut <ArrowRight size={20} /></>
             )
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding;