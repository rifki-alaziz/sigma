import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Lock, AlertCircle, HelpCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import sigmaLogo from "../assets/logo.png";
import backgroundImage from "../assets/logo.png"; 

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Dummy login data
  const dummyUsers = [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      email: "admin@lirboyo.com",
      role: "admin" as const,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      username: "user",
      password: "user123",
      email: "user@lirboyo.com",
      role: "user" as const,
      createdAt: new Date().toISOString()
    }
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check dummy login first
      const dummyUser = dummyUsers.find(
        user => user.username === username && user.password === password
      );

      if (dummyUser) {
        // Simulate API response delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { password: _, ...userWithoutPassword } = dummyUser;
        const token = `dummy-token-${dummyUser.id}-${Date.now()}`;
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        navigate("/");
        return;
      }
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Username atau password salah");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Gagal login");
    } finally {
      setLoading(false);
    }
  };

  // 👇 LOGIC WHATSAPP GENERATOR
  // Kita bikin pesan template yang rapi biar user tinggal isi
  const generateWaLink = () => {
    const phoneNumber = "6283159269692";
    const text = `Halo Admin, saya terkendala saat Login.
Mohon bantuannya untuk pengecekan akun.

Berikut data diri saya:
Nama Lengkap : 
Tanggal Lahir : 

Terima kasih.`;
    
    // encodeURIComponent biar spasi dan enter terbaca di URL
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4facfe] via-[#00f2fe] to-[#0ba360] relative overflow-hidden flex flex-col items-center justify-center p-4 font-sans">
      
      {/* --- PATTERN BACKGROUND --- */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "300px", 
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Dekorasi Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse" />

      {/* --- LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-black/20 border border-white/50">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 p-2 border border-blue-50">
              <img
                src={sigmaLogo}
                alt="Logo"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/64x64/00f2fe/white?text=S')}
              />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Selamat Datang!
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Sistem Informasi Pondok Pesantren
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* USERNAME INPUT */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Username</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={20} />
               </div>
               <input
                 type="text"
                 className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all font-medium"
                 placeholder="Masukkan username"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
               />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Password</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={20} />
               </div>
               <input
                 type="password"
                 className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all font-medium"
                 placeholder="Masukkan password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
            </div>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm py-3 px-4 rounded-xl flex items-center gap-2 animate-pulse">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-4 rounded-full font-bold text-white text-lg
              bg-[#1e1e1e] hover:bg-black shadow-xl shadow-blue-200 
              transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
              flex justify-center items-center gap-2
            "
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <LogIn size={20} />
              </>
            )}
          </button>

        </form>
        {/* Dummy Login Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <h4 className="text-sm font-bold text-blue-800 mb-2">Demo Login</h4>
          <div className="space-y-2 text-xs text-blue-700">
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="font-medium">Admin:</span>
              <div className="text-right">
                <div>Username: <span className="font-bold">admin</span></div>
                <div>Password: <span className="font-bold">admin123</span></div>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <span className="font-medium">User:</span>
              <div className="text-right">
                <div>Username: <span className="font-bold">user</span></div>
                <div>Password: <span className="font-bold">user123</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 👇 NOTIFIKASI BANTUAN LOGIN (Update Baru) */}
        <div className="mt-8 pt-6 border-t border-gray-100">
           <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                  <HelpCircle size={20} />
              </div>
              <div>
                  <h4 className="text-sm font-bold text-gray-800">Belum punya akun / Lupa?</h4>
                  <p className="text-xs text-gray-500 mt-1 mb-2">
                    Hubungi Admin untuk mendapatkan akses dengan mengirimkan data diri.
                  </p>
                  <a 
                    href={generateWaLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg transition-colors shadow-sm"
                  >
                     {/* Icon WA Simple */}
                     <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                     Chat Admin WhatsApp
                  </a>
              </div>
           </div>
        </div>

      </div>

      <p className="mt-8 text-xs text-white/80 font-medium">
        © {new Date().getFullYear()} Pondok Pesantren Lirboyo
      </p>

    </div>
  );
};

export default Login;