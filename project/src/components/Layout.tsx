import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import BottomNavigation from "./BottomNavigation";
import { motion } from "framer-motion";
import { User } from "lucide-react"; // Jangan lupa import icon User
import { useAuth } from "../context/AuthContext"; // Pastiin ini path-nya bener ya

import bgPattern from "../assets/logo.png";

type LayoutProps = {
  isPopup?: boolean;
  children?: React.ReactNode;
};

// --- KOMPONEN LANDSCAPE SVG ---
const VectorLandscape = () => (
  <div className="absolute inset-x-0 bottom-0 z-0 w-full h-[60vh] pointer-events-none select-none">
    <svg
      className="w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Layer 1: Gunung Belakang */}
      <path
        fill="#48dbfb"
        fillOpacity="0.3"
        d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
      {/* Layer 2: Gunung Tengah */}
      <path
        fill="#1dd1a1"
        fillOpacity="0.5"
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
      {/* Layer 3: Depan (Hijau Gelap ke Emas) */}
      <path
        fill="#0c6b58"
        fillOpacity="1"
        d="M0,256L40,245.3C80,235,160,213,240,218.7C320,224,400,256,480,261.3C560,267,640,245,720,229.3C800,213,880,203,960,213.3C1040,224,1120,256,1200,266.7C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      ></path>
    </svg>
  </div>
);

// --- BUBBLE 3D ---
const Bubble3D = ({ className, size, delay = 0, duration = 5 }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute rounded-full backdrop-blur-[2px] pointer-events-none ${className}`}
    style={{
      width: size,
      height: size,
      background:
        "radial-gradient(circle at 30% 30%, rgba(255, 255, 230, 0.8) 0%, rgba(100, 255, 218, 0.2) 40%, rgba(218, 165, 32, 0.1) 100%)",
      boxShadow: `inset 2px 2px 10px rgba(255, 255, 255, 0.8), inset -2px -2px 10px rgba(218, 165, 32, 0.1), 0 0 15px rgba(100, 255, 218, 0.3)`,
      border: "1px solid rgba(255, 255, 255, 0.3)",
    }}
  />
);

const Layout = ({ isPopup = false, children }: LayoutProps) => {
  const navigate = useNavigate();
  // Ambil data user dari context buat ditampilin namanya
  const { user } = useAuth(); 

  return (
    <div className="relative min-h-screen flex flex-col pb-16 text-white bg-gradient-to-b from-[#4facfe] via-[#1dd1a1] to-[#b8860b] transition-all duration-500 overflow-hidden font-sans">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Logo Watermark */}
        <div
          className="
            absolute 
            top-[-40px] right-[-30px] 
            w-[250px] h-[250px] 
            opacity-[0.15] 
            bg-no-repeat bg-contain bg-center
            filter invert
          "
          style={{
            backgroundImage: `url(${bgPattern})`,
            transform: "rotate(15deg)",
          }}
        />

        <VectorLandscape />

        <Bubble3D
          size={140}
          className="bottom-[10%] right-[5%] opacity-40"
          delay={0.5}
          duration={12}
        />
        <Bubble3D
          size={120}
          className="top-[5%] left-[-20px] opacity-60"
          duration={8}
        />
        <Bubble3D
          size={60}
          className="top-[30%] right-[10%] opacity-50"
          delay={1}
          duration={10}
        />
        <Bubble3D
          size={40}
          className="bottom-[25%] left-[20%] opacity-30 mix-blend-overlay"
          delay={2}
          duration={6}
        />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-500/20 to-transparent pointer-events-none" />

        <div
          className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 10px 10px, white, transparent 20%)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* --- HERO / HEADER SECTION --- */}
      <div className="relative z-10 px-6 pt-10 pb-4 flex-shrink-0">
        <div className="flex justify-between items-start">
          
          {/* Kiri: Salam & Nama */}
          <div className="flex flex-col max-w-[75%]">
            <span className="text-yellow-200 text-xs font-semibold tracking-wider uppercase mb-1">
              Assalamualaikum
            </span>
            <h1 className="text-3xl font-bold text-white drop-shadow-md leading-tight">
              Ahlan Wasahlan
            </h1>
            <p className="text-white/90 text-sm font-medium mt-1 truncate">
              {/* Kalau user ada, tampilin namanya, kalau belum login/loading tampilin default */}
              {user?.username ? user.username : "Mutakhorijin ....."}
            </p>
          </div>

          {/* Kanan: Profile Avatar Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/profile")}
            className="
              w-12 h-12 
              rounded-full 
              bg-white/20 backdrop-blur-md 
              border border-white/40
              flex items-center justify-center
              shadow-lg shadow-black/10
              hover:bg-white/30 transition-all duration-300
            "
          >
            <User size={24} className="text-white drop-shadow-sm" />
          </motion.button>

        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 flex-grow">
        {children ?? <Outlet />}
      </main>

      {!isPopup && (
        <div className="relative z-10 mt-2 flex-shrink-0">
          <BottomNavigation />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;