import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA & HOOKS (Agar berjalan lancar di preview) ---
const MOCK_INITIAL_CART = [
  {
    id: 1,
    name: "Kitab Safinatun Najah",
    price: 25000,
    quantity: 2,
    image: "https://down-id.img.susercontent.com/file/sg-11134201-22100-5j5j5j5j5j5j",
  },
  {
    id: 3,
    name: "Sarung Wadimor Motif",
    price: 85000,
    quantity: 1,
    image: "https://down-id.img.susercontent.com/file/sg-11134201-22100-8j5j5j5j5j5j",
  }
];

// Simulasi Context Cart
const useCart = () => {
  // State lokal untuk simulasi
  const [cart, setCart] = useState(MOCK_INITIAL_CART);

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  return { cart, removeFromCart, updateQuantity };
};

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Hitung Total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#ececec] pb-32 font-sans relative">
      
      {/* =================== HEADER =================== */}
      <div className="sticky top-0 z-20 bg-[#ececec]/90 backdrop-blur-md px-6 py-6 mb-4 flex items-center gap-4 border-b border-white/20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/store")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1e1e1e] hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div>
            <h1 className="text-xl font-bold text-[#1e1e1e]">Keranjang</h1>
            <p className="text-xs text-gray-500">{cart.length} Barang</p>
        </div>
      </div>

      {/* =================== CART LIST =================== */}
      <div className="px-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-600">Keranjang Kosong</h3>
              <p className="text-sm text-gray-400 mb-6">Yuk, isi dengan kebutuhanmu!</p>
              <button 
                onClick={() => navigate("/store")}
                className="px-6 py-2 bg-[#1e1e1e] text-white rounded-full text-sm font-medium shadow-lg"
              >
                Mulai Belanja
              </button>
            </motion.div>
          ) : (
            cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white p-3 rounded-[24px] shadow-sm border border-white/50 flex gap-4 items-center"
              >
                {/* Gambar Produk */}
                <div className="w-20 h-20 bg-gray-100 rounded-[18px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Produk */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#1e1e1e] truncate mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-pink-500 font-semibold mb-3">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                  {/* Kontrol Kuantitas */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 gap-3">
                        <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-5 h-5 flex items-center justify-center text-gray-600 disabled:opacity-30"
                        >
                            <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-600"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                  </div>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0 mr-1"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* =================== BOTTOM SUMMARY (Floating) =================== */}
      {cart.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-30 max-w-[480px] mx-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-sm font-medium">Total Pembayaran</span>
            <span className="text-xl font-extrabold text-[#1e1e1e]">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <button 
            className="w-full bg-[#1e1e1e] text-white py-4 rounded-[24px] font-bold text-lg shadow-lg hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Checkout Sekarang
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </motion.div>
      )}

    </div>
  );
};

export default CartPage;