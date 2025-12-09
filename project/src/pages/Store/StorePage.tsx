import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, ShoppingCart, Search, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORTS ASLI ---
import { Product, useCart } from "../../context/CartContext";
import { products } from "../../data/produk";

// Data Featured (Bisa dipindahkan ke constants atau API nantinya)
const featured = [
  { id: 11, title: "Flash Sale", subtitle: "Diskon 50%", color: "bg-[#fdbaff]", image: "https://i.pinimg.com/736x/0d/19/88/0d19884d8386f43d2f14e0aa0cdba584.jpg" },
  { id: 12, title: "Terlaris", subtitle: "Minggu Ini", color: "bg-[#cce0ff]", image: "https://i.pinimg.com/736x/8e/de/79/8ede7973d16f05a86b103c459dec96c1.jpg" },
  { id: 13, title: "New Arrival", subtitle: "Cek Sekarang", color: "bg-[#b8e994]", image: "https://i.pinimg.com/736x/a8/25/53/a825539a446c91f08b5ae306124f3c42.jpg" },
];

const StorePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Opsional: Tampilkan notifikasi atau feedback visual
    console.log("Added to cart:", product.name);
  };

  // 🔎 Filter produk
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 pb-24 min-h-screen">
      
      {/* =================== HEADER =================== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Koperasi</h1>
          <p className="text-xs text-gray-500">Jajan & kebutuhan santri</p>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/cart")}
          className="bg-white border border-gray-200 text-[#1e1e1e] w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors relative"
        >
          <ShoppingCart size={20} />
          {/* Dot indikator jika ada item (logika bisa ditambahkan nanti) */}
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
        </motion.button>
      </div>

      {/* =================== SEARCH BAR =================== */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari jajan, kitab, seragam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-[24px] shadow-sm text-sm text-[#1e1e1e] focus:ring-2 focus:ring-purple-200 focus:outline-none placeholder:text-gray-400 transition-all"
        />
      </div>

      {/* =================== FEATURED BANNER =================== */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-[#1e1e1e] mb-4 px-1">Promo Spesial</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
          {featured.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.95 }}
              className={`min-w-[260px] h-[140px] ${item.color} rounded-[28px] relative overflow-hidden shadow-sm cursor-pointer`}
            >
              <div className="absolute top-0 left-0 w-full h-full p-5 flex flex-col justify-center z-10">
                <h3 className="text-xl font-bold text-[#1e1e1e] leading-tight">{item.title}</h3>
                <p className="text-sm text-[#1e1e1e]/70 font-medium mt-1">{item.subtitle}</p>
                <button className="mt-3 w-fit px-3 py-1.5 bg-[#1e1e1e] text-white text-[10px] font-bold rounded-full">
                  Lihat
                </button>
              </div>
              
              {/* Image Decor */}
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute bottom-0 right-0 w-32 h-32 object-cover rounded-tl-[40px] shadow-[-4px_-4px_10px_rgba(0,0,0,0.1)]"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* =================== PRODUCT GRID =================== */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-bold text-[#1e1e1e]">Semua Produk</h2>
          <span className="text-xs text-gray-400">{filteredProducts.length} items</span>
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/50 rounded-[32px] border border-dashed border-gray-300"
          >
            <Store size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Produk tidak ditemukan</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 gap-4"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/store/${product.id}`)}
                  className="bg-white p-3 rounded-[28px] shadow-sm border border-white/40 relative group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-36 w-full rounded-[20px] overflow-hidden mb-3 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Price Tag Badge */}
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1e1e1e] shadow-sm">
                      Rp {product.price.toLocaleString("id-ID")}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-1">
                    <h3 className="text-sm font-bold text-[#1e1e1e] leading-tight mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 line-clamp-1 mb-3">
                      {product.description}
                    </p>
                    
                    {/* Add Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full py-2 bg-[#1e1e1e] text-white rounded-xl flex items-center justify-center text-xs font-medium gap-1 hover:bg-black transition-colors"
                    >
                      <Plus size={14} /> Tambah
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default StorePage;