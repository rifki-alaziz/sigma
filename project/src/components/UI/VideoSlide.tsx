import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Youtube, X } from "lucide-react";

const VideoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Daftar video YouTube
  const videos = [
    {
      id: 1,
      videoSrc: "https://www.youtube.com/embed/l8M8GJvabu0?autoplay=1",
      thumbnailSrc: "https://img.youtube.com/vi/l8M8GJvabu0/maxresdefault.jpg",
      title: "Takbiran Idul Adha 1446 H"
    },
    {
      id: 2,
      videoSrc: "https://www.youtube.com/embed/bipM0WUopRU?autoplay=1",
      thumbnailSrc: "https://img.youtube.com/vi/bipM0WUopRU/maxresdefault.jpg",
      title: "Kemeriahan Tahun Baru Hijriah 1446 H"
    },
    {
      id: 3,
      videoSrc: "https://www.youtube.com/embed/zvXSuwxYRq4?autoplay=1",
      thumbnailSrc: "https://img.youtube.com/vi/zvXSuwxYRq4/maxresdefault.jpg",
      title: "Penyambutan Tahun Baru Hijriyah 1445 H"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + videos.length) % videos.length
    );
  };

  return (
    <section className="py-2 px-2 w-full max-w-5xl mx-auto font-sans">
      
      {/* --- HEADER (Rapat & Minimalis) --- */}
      <div className="flex items-center justify-between mb-2 px-2">
         <div className="flex flex-col">
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 w-fit border border-red-100">
               <Youtube size={12} />
               <span>Official Channel</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 leading-tight">
               Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Video</span>
            </h2>
         </div>
         
         {/* Indikator Slide (Dots) */}
         <div className="hidden md:flex gap-1.5">
            {videos.map((_, idx) => (
               <div 
                 key={idx} 
                 className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-6 bg-purple-500" : "w-1.5 bg-gray-200"}`} 
               />
            ))}
         </div>
      </div>

      {/* --- MAIN SLIDER CARD --- */}
      <div className="relative group px-2">
        <motion.div
           key={currentSlide}
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.4 }}
           className="relative w-full aspect-video bg-gray-100 rounded-[2rem] overflow-hidden shadow-lg shadow-purple-100/50 border border-white/50"
        >
           {/* Thumbnail Image */}
           <img
              src={videos[currentSlide].thumbnailSrc}
              alt={videos[currentSlide].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
           
           {/* Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

           {/* Title Text inside Thumbnail */}
           <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
              <motion.h3 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-lg md:text-2xl font-bold leading-tight max-w-2xl line-clamp-2 drop-shadow-md"
              >
                {videos[currentSlide].title}
              </motion.h3>
           </div>

           {/* PLAY BUTTON (Center) */}
           <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                 whileHover={{ scale: 1.15 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={() => setIsVideoVisible(true)}
                 className="
                    w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full 
                    flex items-center justify-center 
                    border border-white/40 shadow-2xl group-hover:bg-red-600/90 group-hover:border-red-500 transition-all duration-300
                 "
              >
                 <Play size={28} className="ml-1 text-white fill-white" />
              </motion.button>
           </div>
        </motion.div>

        {/* NAVIGATION BUTTONS (Floating & Hover Only) */}
        <div className="absolute inset-y-0 left-0 flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button 
             onClick={prevSlide}
             className="bg-white/80 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
           >
              <ChevronLeft size={20} />
           </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button 
             onClick={nextSlide}
             className="bg-white/80 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
           >
              <ChevronRight size={20} />
           </button>
        </div>
      </div>

      {/* --- MODAL VIDEO PLAYER --- */}
      <AnimatePresence>
        {isVideoVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Iframe */}
              <iframe
                width="100%"
                height="100%"
                src={videos[currentSlide].videoSrc}
                title={videos[currentSlide].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />

              {/* Close Button */}
              <button
                onClick={() => setIsVideoVisible(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSlider;