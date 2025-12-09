import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, PlusCircle } from "lucide-react";

const KitabList: React.FC = () => {
  const navigate = useNavigate();
  const [kitabs, setKitabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchKitabs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/kitabs", {
          headers: { Authorization: "Bearer secret-token" },
        });
        const data = await res.json();
        setKitabs(data);
        if (data.length === 0) setShowPopup(true);
      } catch (err) {
        console.error("Gagal mengambil data kitab:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchKitabs();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <BookOpen /> Daftar Kitab
        </h2>
        <button
          onClick={() => navigate("/kitabs/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Tambah Kitab
        </button>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : kitabs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {kitabs.map((kitab) => (
            <div
              key={kitab.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{kitab.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Penulis: {kitab.author}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{kitab.description}</p>
              <a
                href={kitab.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm mt-3 inline-block"
              >
                Lihat File
              </a>
            </div>
          ))}
        </div>
      ) : (
        showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Belum Ada Data Kitab 📚
              </h3>
              <p className="text-gray-600 mb-4">
                Silakan tambahkan kitab terlebih dahulu.
              </p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/kitabs/add");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Tambah Sekarang
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default KitabList;
