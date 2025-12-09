import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  description: string;
  cover: string;
  link: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleReadClick = () => {
    navigate("/pdf-viewer", {
      state: { 
        pdfUrl: book.link, 
        title: book.title
      }
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      // 👇 UPDATE STYLE DI SINI: Lebih soft, rounded, dan modern
      className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-4 shadow-lg shadow-gray-200/50 border border-white/60 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-300 flex flex-col h-full group"
    >
      {/* --- IMAGE CONTAINER --- */}
      <div className="relative h-56 w-full bg-blue-50 rounded-[2rem] overflow-hidden mb-5 flex items-center justify-center shadow-inner">
        
        {/* Badge Dekoratif */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">PDF</span>
        </div>

        {/* Gambar Buku */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay halus saat hover */}
        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300" />
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="flex flex-col flex-grow px-2 pb-2">
        {/* Judul */}
        <h3 className="text-xl font-extrabold text-gray-800 mb-2 leading-tight line-clamp-1" title={book.title}>
          {book.title}
        </h3>

        {/* Deskripsi */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow font-medium">
          {book.description}
        </p>

        {/* --- ACTION BUTTON --- */}
        <button
          onClick={handleReadClick}
          className="mt-auto w-full bg-[#1e1e1e] hover:bg-black text-white py-3.5 px-5 rounded-[1.5rem] flex items-center justify-between group/btn transition-all active:scale-95 cursor-pointer shadow-lg shadow-gray-300/50 hover:shadow-xl"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} className="text-blue-300" />
            <span className="text-sm font-bold tracking-wide">Baca Sekarang</span>
          </div>
          
          {/* Animasi panah kecil */}
          <div className="bg-white/10 rounded-full p-1.5 group-hover/btn:bg-white/20 transition-colors">
            <ArrowRight size={14} className="group-hover/btn:-rotate-45 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default BookCard;