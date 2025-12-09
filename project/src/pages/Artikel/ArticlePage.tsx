import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react"; 
import { articles } from "../../data/articles"; 

/* ----------------------------------------------
   VARIANTS ANIMASI
------------------------------------------------ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ArticlePage: React.FC = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  
  const article = articleId ? articles[articleId] : null;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-white/70">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          Artikel tidak ditemukan...
        </motion.div>
      </div>
    );
  }

  const readTime = "5 Menit Baca";
  const postDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    // Wrapper Utama: overflow-x-hidden biar gak ada scroll samping yang ganggu
    <div className="min-h-screen relative font-sans text-gray-800 overflow-x-hidden">
      
      {/* --- HERO IMAGE (Background Header) --- */}
      <div className="fixed top-0 left-0 w-full h-[60vh] z-0">
         <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.image})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#2d1b4e]" />
      </div>

      {/* Container Scrollable */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        
        {/* --- HEADER SECTION --- */}
        {/* Padding cuma di header biar tombol & judul gak nempel layar */}
        <div className="px-5 md:px-12 pt-6 mb-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-white font-bold hover:bg-white/20 transition-all mb-8 border border-white/20 cursor-pointer"
            >
              <ArrowLeft size={18} />
              <span>Kembali</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-center md:text-left"
            >
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4 opacity-90">
                    <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-md rounded-full text-xs font-bold border border-blue-400/50 flex items-center gap-1">
                       <BookOpen size={12} /> Artikel
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/20 flex items-center gap-1">
                       <Clock size={12} /> {readTime}
                    </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg px-2">
                  {article.title}
                </h1>

                <div className="flex items-center justify-center md:justify-start gap-2 text-white/70 text-sm font-medium">
                    <Calendar size={16} />
                    <span>Diposting pada {postDate}</span>
                </div>
            </motion.div>
        </div>

        {/* --- ARTICLE CONTENT (The White Area) --- */}
        {/* Logic: flex-grow buat ngedorong ke bawah, w-full MUTLAK */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="enter"
          className="flex-grow w-full relative z-20" 
        >
           {/* Card Putihnya */}
           <div className="bg-white min-h-[50vh] w-full rounded-t-[2rem] md:rounded-t-[3.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] overflow-hidden relative">
              
               {/* Top Gradient Bar */}
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />

               {/* Isi Konten */}
               {/* Padding di dalam SINI, bukan di luar. Jadi putihnya tetep full */}
               <div className="px-5 md:px-16 lg:px-24 py-10 md:py-16">
                   <div className="prose prose-lg max-w-none w-full text-gray-700 leading-loose">
                    {article.content
                      .trim()
                      .split("\n")
                      .map((p: string, idx: number) => (
                        <motion.p
                          key={idx}
                          variants={itemVariants}
                          className={`w-full text-justify ${
                            idx === 0
                              ? "text-xl md:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-purple-600 first-letter:mr-2 first-letter:float-left"
                              : "text-base md:text-lg mb-6 text-gray-600"
                          }`}
                        >
                          {p.trim()}
                        </motion.p>
                      ))}
                  </div>

                  {/* Footer Marker */}
                  <motion.div 
                    variants={itemVariants}
                    className="mt-16 pt-8 border-t border-gray-200 flex flex-col items-center justify-center text-center"
                  >
                     <div className="w-2 h-2 bg-purple-500 rounded-full mb-4" />
                     <p className="text-gray-400 text-sm font-medium italic">
                       Terima kasih sudah membaca.
                     </p>
                  </motion.div>
               </div>
           </div>
        </motion.main>

      </div>
    </div>
  );
};

export default ArticlePage;