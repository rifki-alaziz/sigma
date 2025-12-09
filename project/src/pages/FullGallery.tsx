import React, { useState, useMemo } from "react";
import { ArrowLeft, X, Image as ImageIcon, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Semua", "Kegiatan", "Lomba", "Fasilitas", "Wisuda"];

const DUMMY_IMAGES = Array.from({ length: 24 }).map((_, i) => {
  const categories = ["Kegiatan", "Lomba", "Fasilitas", "Wisuda"];
  const randomCat = categories[Math.floor(Math.random() * categories.length)];

  return {
    id: i,
    url: `https://picsum.photos/600/800?random=${i + 100}`,
    category: randomCat,
  };
});

const FullGallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredImages = useMemo(() => {
    if (activeCategory === "Semua") return DUMMY_IMAGES;
    return DUMMY_IMAGES.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-transparent font-sans">

      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 text-gray-700 hover:text-pink-600 font-medium group"
            >
              <div className="p-2.5 bg-white/40 rounded-full group-hover:bg-pink-100/50 border border-white/30 shadow-sm transition-all">
                <ArrowLeft size={20} />
              </div>
              <span className="hidden sm:inline text-sm font-bold tracking-wide">
                KEMBALI
              </span>
            </button>

            <div className="flex items-center gap-3 px-4 py-2 bg-white/30 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm">
              <div className="bg-gradient-to-tr from-pink-500 to-purple-500 p-2 rounded-xl text-white shadow-md shadow-pink-500/20">
                <ImageIcon size={20} />
              </div>
              <h1 className="text-lg font-extrabold text-gray-800 tracking-tight">
                Semua Koleksi
              </h1>
            </div>

            <div className="w-[100px] hidden sm:block"></div>
          </div>

          {/* CATEGORY */}
          <div className="flex items-center gap-3 overflow-x-auto py-4 px-2 scrollbar-hide w-full">
            <div className="flex-shrink-0 flex items-center gap-2 text-gray-500 mr-2 bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
              <Filter size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Filter
              </span>
            </div>

            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all relative overflow-hidden
                    ${isActive
                      ? "text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30"
                      : "bg-white/30 text-gray-600 hover:bg-white/50 hover:text-gray-900 border border-white/20 backdrop-blur-md"
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <main className="max-w-7xl mx-auto px-4 py-4 min-h-screen">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white/20 backdrop-blur-md rounded-[2rem] border border-white/30">
              <ImageIcon size={48} className="mx-auto text-gray-400 mb-4 opacity-50" />
              <p className="text-gray-500 font-medium">
                Belum ada foto di kategori ini, sayang.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="relative group aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-gray-100/50 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-pink-500/20 duration-300 border border-white/40 backdrop-blur-sm hover:-translate-y-1"
                onClick={() => setSelectedImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.category}
                  loading="lazy"
                  className="w-full h-full object-cover duration-700 group-hover:scale-110 group-hover:rotate-1"
                />

                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 duration-300 border border-white/20">
                  {img.category}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 duration-300" />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 bg-white/10 backdrop-blur-md rounded-full transition-colors z-[101] border border-white/20 hover:bg-pink-500 hover:border-transparent"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>

          <img
            src={selectedImage}
            alt="Preview Full"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default FullGallery;
