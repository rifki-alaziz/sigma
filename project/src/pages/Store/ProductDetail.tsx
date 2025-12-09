import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, MapPin, User, Phone, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { products } from "../../data/produk";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    nowa: "",
  });

  useEffect(() => {
    const found = products.find((p) => p.id === Number(id));
    setProduct(found ?? null);
  }, [id]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKirimPesanan = () => {
    if (!product) return;

    const phoneNumber = "628123456789";
    const message = `
Halo Admin, saya ingin memesan:

📦 *Produk:* ${product.name}
💰 *Harga:* Rp ${product.price.toLocaleString("id-ID")}

👤 *Data Pemesan*
Nama: ${form.nama}
Alamat: ${form.alamat}
No WA: ${form.nowa}

Mohon diproses ya, terima kasih! 🙏
    `;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p>Produk tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ececec] relative pb-24">
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-20 p-6 pointer-events-none flex justify-center max-w-[480px] mx-auto relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-[#1e1e1e] hover:bg-white pointer-events-auto transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* IMAGE */}
      <div className="relative w-full h-[45vh] bg-gray-200 rounded-b-[40px] overflow-hidden shadow-lg">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* INFO */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-start justify-between mb-2">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            {product.category}
          </span>
          <div className="text-2xl font-extrabold text-[#1e1e1e]">
            Rp {product.price.toLocaleString("id-ID")}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1e1e1e] leading-tight mb-4">{product.name}</h1>

        <div className="bg-white p-5 rounded-[28px] shadow-sm border border-white/40">
          <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Deskripsi</h3>
          <p className="text-[#1e1e1e]/80 leading-relaxed text-sm">{product.description}</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#ececec] to-[#ececec]/0 z-10 max-w-[480px] mx-auto pointer-events-none">
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-full bg-[#25D366] text-white py-4 rounded-[24px] font-bold text-lg shadow-lg shadow-green-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <MessageCircle size={22} />
          Pesan via WhatsApp
        </button>
      </div>

      {/* POPUP FORM */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#fdfdfd] w-full max-w-sm p-6 rounded-[32px] shadow-2xl relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>

              <h2 className="text-xl font-bold text-[#1e1e1e] mb-1">Isi Data Pemesan</h2>
              <p className="text-xs text-gray-400 mb-6">Lengkapi data untuk konfirmasi pesanan</p>

              <div className="space-y-4">
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="nama"
                    placeholder="Nama Lengkap"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-green-400 rounded-[18px] py-3 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="nowa"
                    type="tel"
                    placeholder="Nomor WhatsApp (08xx)"
                    value={form.nowa}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-green-400 rounded-[18px] py-3 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    name="alamat"
                    rows={3}
                    placeholder="Alamat Pengiriman Lengkap"
                    value={form.alamat}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-green-400 rounded-[18px] py-3 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleKirimPesanan}
                disabled={!form.nama || !form.nowa || !form.alamat}
                className="mt-6 w-full bg-[#1e1e1e] text-white py-3 rounded-[20px] font-bold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-all"
              >
                Kirim Pesanan
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
