import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Data Interface
interface Tahap {
  id: number;
  tingkat: string;
  year: string;
  image: string;
  description: string;
  articleId: string;
}

const perkembanganAngkatan: Tahap[] = [
  {
    id: 1,
    tingkat: 'Tingkat I: Adaptasi',
    year: 'Tahun Ke-1',
    image: 'https://static.republika.co.id/uploads/images/inpicture_slide/ratusan-santri-berdoa-meminta-hujan-di-halaman-pondok-pesantren-_181026202134-254.jpg',
    description: 'Fokus pada pengenalan lingkungan pesantren, penguasaan dasar nahwu shorof.',
    articleId: '1',
  },
  {
    id: 2,
    tingkat: 'Tingkat II: Konsolidasi',
    year: 'Tahun Ke-2',
    image: 'https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/radarkediri/2023/03/IMG_6169.jpg',
    description: 'Mendalami kitab dasar, aktif organisasi, dan mengembangkan minat.',
    articleId: '2',
  },
  {
    id: 3,
    tingkat: 'Tingkat III: Spesialisasi',
    year: 'Tahun Ke-3',
    image: 'https://img.merahputih.com/media/5c/d8/98/5cd89897787e21141322d189b47282bf.jpg',
    description: 'Mulai memilih spesialisasi ilmu (Fikih, Tafsir, atau Hadits).',
    articleId: '3',
  },
  {
    id: 4,
    tingkat: 'Tingkat IV: Kepemimpinan',
    year: 'Tahun Ke-4',
    image: 'https://images.unsplash.com/photo-1627448834789-f53835f8e56c',
    description: 'Menjadi asisten guru dan pengurus organisasi, melatih kepemimpinan.',
    articleId: '4',
  },
  {
    id: 5,
    tingkat: 'Tingkat V: Pengabdian',
    year: 'Tahun Ke-5',
    image: 'https://images.unsplash.com/photo-1627448834789-f53835f8e56c',
    description: 'Siap terjun ke masyarakat sebagai agen perubahan.',
    articleId: '5',
  },
];

const PerkembanganSlider: React.FC = () => {
  return (
    // UBAH: py-8 menjadi py-2 agar jarak atas/bawah sangat rapat
    <section className="py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Ringkas */}
        {/* UBAH: mb-6 menjadi mb-2 agar judul dekat dengan kartu */}
        <div className="mb-2 px-2">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">
               Jejak <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Langkah</span>
            </h2>
        </div>

        {/* Container Scroll */}
        {/* UBAH: pb-8 menjadi pb-4 (cukup untuk bayangan, tidak terlalu jauh) */}
        <div className="
            flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 px-2
            scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent
          "
        >
          {perkembanganAngkatan.map((tahap) => (
            <motion.div
              key={tahap.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 snap-center"
            >
               {/* UKURAN KARTU DIPERKECIL (w-52 = 208px) 
                 BACKGROUND TRANSPARAN (Glassmorphism)
               */}
              <Link to={`/article/${tahap.articleId}`} className="block w-48 md:w-52">
                <div className="
                    h-full rounded-[1.5rem] p-3
                    bg-white/40 backdrop-blur-md 
                    border border-white/60 shadow-lg shadow-gray-100/20
                    hover:bg-white/60 transition-all duration-300
                    flex flex-col
                  "
                >
                  
                  {/* IMAGE (Lebih Kecil) */}
                  <div className="relative h-28 w-full rounded-[1rem] overflow-hidden mb-2 shadow-sm">
                    <img 
                      src={tahap.image} 
                      alt={tahap.tingkat} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Badge Tahun Mini */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                       <span className="text-[9px] font-bold text-white">{tahap.year}</span>
                    </div>
                  </div>

                  {/* CONTENT (Font Lebih Kecil) */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-1 leading-tight line-clamp-1">
                        {tahap.tingkat}
                    </h3>
                    
                    <p className="text-[10px] text-gray-600 leading-snug line-clamp-2 mb-2 opacity-90">
                      {tahap.description}
                    </p>

                    {/* Button Mini */}
                    <div className="mt-auto flex items-center justify-end">
                       <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-gray-800 shadow-sm hover:bg-blue-500 hover:text-white transition-colors">
                          <ArrowRight size={10} />
                       </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerkembanganSlider;