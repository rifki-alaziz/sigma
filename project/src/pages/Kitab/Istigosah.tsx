import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Star } from "lucide-react"; 
import BookCard from "../../components/Istigosah/BookCard";
import booksData from "../../data/books.json";

interface Book {
  id: number;
  title: string;
  description: string;
  cover: string;
  link: string;
}

const Istigosah: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setBooks(booksData);
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // HAPUS: bg-gray-50. GANTI: w-full (Transparent)
    <div className="w-full pb-24 font-sans flex justify-center items-start pt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl px-4"
      >
        
        {/* --- HEADER SECTION (Glass Card Style) --- */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-xl shadow-blue-900/10 mb-8 border border-white/60">
            {/* Elemen Dekoratif Abstrak */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-bl-[100px] opacity-50" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-100 rounded-tr-[50px] opacity-60" />

            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-300">
                        <BookOpen className="text-white" size={24} />
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-100">
                        Digital Library
                    </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-tight">
                    Kumpulan <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Istigosah & Doa</span>
                </h1>
                <p className="text-gray-600 font-medium text-sm md:text-base max-w-md leading-relaxed">
                   Temukan ketenangan hati melalui lantunan doa, munajat, dan kitab pilihan untuk amalan sehari-hari.
                </p>
            </div>
        </div>

        {/* --- SEARCH BAR (Floating) --- */}
        <div className="sticky top-4 z-30 mb-8">
            <div className="bg-white/95 backdrop-blur-xl rounded-full shadow-lg shadow-gray-200/50 p-1.5 flex items-center border border-gray-100 max-w-lg mx-auto transition-all focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-300">
                <div className="p-2.5 bg-gray-100 rounded-full text-gray-500 ml-1">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Cari kitab, doa, atau wirid..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 bg-transparent text-gray-700 font-medium placeholder-gray-400 focus:outline-none text-sm"
                />
            </div>
        </div>

        {/* --- GRID BUKU --- */}
        <div className="mb-6">
             <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" size={18} />
                    <h2 className="text-lg font-bold text-white drop-shadow-md">Koleksi Kitab</h2>
                </div>
                <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-bold">
                    {filteredBooks.length} Buku
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                    // Pastikan komponen BookCard di dalamnya pakai bg-white rounded-xl biar kontras
                    <BookCard key={book.id} book={book} />
                ))
            ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-[2rem] border border-white/40 text-center p-6 shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">🔍</div>
                    <h3 className="text-gray-800 font-bold mb-1">Tidak Ditemukan</h3>
                    <p className="text-gray-500 text-sm">
                        Coba kata kunci lain, mungkin ada typo?
                    </p>
                </div>
            )}
            </div>
        </div>

        {/* --- FOOTER NOTE --- */}
        <div className="mt-8 text-center pb-6">
            <p className="text-white/80 text-xs font-medium bg-black/20 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
               📚 Ingin menambahkan kitab baru? <span className="text-yellow-300 cursor-pointer font-bold hover:underline">Hubungi Admin</span>
            </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Istigosah;