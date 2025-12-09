import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  GraduationCap,
  LogOut,
  Compass,
  Calculator,
  Scale,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const [visible, setVisible] = useState(true);
  const [memberOpen, setMemberOpen] = useState(false);
  const [hisabOpen, setHisabOpen] = useState(false);

  const memberRef = useRef<HTMLDivElement>(null);
  const hisabRef = useRef<HTMLDivElement>(null);

  /* Click outside dropdown logic */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (memberRef.current && !memberRef.current.contains(e.target as Node)) {
        setMemberOpen(false);
      }
      if (hisabRef.current && !hisabRef.current.contains(e.target as Node)) {
        setHisabOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Hide on scroll logic */
  useEffect(() => {
    let last = window.scrollY;
    const handleScroll = () => {
      const now = window.scrollY;
      setVisible(now < last || now < 10);
      last = now;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logic active state
  const memberActive =
    location.pathname === "/students" || location.pathname === "/teachers";

  const hisabActive =
    location.pathname === "/falak" ||
    location.pathname === "/zakat" ||
    location.pathname === "/waris";

  // --- 3. FUNGSI LOGOUT ---
  const handleLogout = async () => {
    try {
      if (logout) await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Gagal logout", error);
    }
  };

  /**
   * STYLE HELPER
   */
  const getNavItemStyle = (isActive: boolean) => {
    if (isActive) {
      return "bg-white text-[#202659] w-[45px] h-[45px] rounded-full flex items-center justify-center shadow-md transition-all duration-300";
    }
    return "text-gray-400 hover:text-white w-[45px] h-[45px] flex items-center justify-center transition-colors duration-300";
  };

  // Style untuk Dropdown Menu (Aku sesuaikan warnanya biar matching sama Navbar)
  const dropdownMenuStyle = `
    absolute bottom-[70px] left-1/2 -translate-x-1/2
    bg-[#202659] border border-white/20
    rounded-xl shadow-2xl py-2 w-40 z-20
    text-gray-200 backdrop-blur-sm
  `;

  const dropdownItemStyle = `
    flex items-center px-4 py-3 w-full text-left text-sm
    hover:bg-white/10 transition-all duration-200
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 30,
      }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4"
    >
      <motion.div
        className="
          bg-[#202659] 
          w-fit px-6 h-[70px]
          rounded-[40px] 
          flex items-center justify-center
          gap-4
          shadow-2xl shadow-blue-900/20
          border border-white/10
        "
      >
        {/* --- HOME --- */}
        <button
          onClick={() => navigate("/")}
          className={getNavItemStyle(location.pathname === "/")}
        >
          <Home size={22} strokeWidth={2.5} />
        </button>

        {/* --- MEMBER DROPDOWN --- */}
        <div className="relative" ref={memberRef}>
          <button
            onClick={() => setMemberOpen((v) => !v)}
            className={getNavItemStyle(memberActive)}
          >
            <Users size={22} strokeWidth={2.5} />
            {!memberActive && memberOpen && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-pink-400 rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {memberOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                className={dropdownMenuStyle}
              >
                <button
                  onClick={() => {
                    navigate("/students");
                    setMemberOpen(false);
                  }}
                  className={`${dropdownItemStyle} ${location.pathname === "/students" ? "text-pink-300 font-bold" : ""
                    }`}
                >
                  <Users size={16} className="mr-3" /> Mahasantri
                </button>

                <button
                  onClick={() => {
                    navigate("/teachers");
                    setMemberOpen(false);
                  }}
                  className={`${dropdownItemStyle} ${location.pathname === "/teachers" ? "text-purple-300 font-bold" : ""
                    }`}
                >
                  <GraduationCap size={16} className="mr-3" /> Mustahiq
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- HISAB DROPDOWN --- */}
        <div className="relative" ref={hisabRef}>
          <button
            onClick={() => setHisabOpen((v) => !v)}
            className={getNavItemStyle(hisabActive)}
          >
            <Calculator size={22} strokeWidth={2.5} />
            {!hisabActive && hisabOpen && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-400 rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {hisabOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                className={dropdownMenuStyle}
              >
                <button
                  onClick={() => {
                    navigate("/falak");
                    setHisabOpen(false);
                  }}
                  className={`${dropdownItemStyle} ${location.pathname === "/falak" ? "text-purple-300 font-bold" : ""
                    }`}
                >
                  <Compass size={16} className="mr-3" /> Falak
                </button>

                <button
                  onClick={() => {
                    navigate("/zakat");
                    setHisabOpen(false);
                  }}
                  className={`${dropdownItemStyle} ${location.pathname === "/zakat" ? "text-cyan-300 font-bold" : ""
                    }`}
                >
                  <Calculator size={16} className="mr-3" /> Zakat
                </button>

                <button
                  onClick={() => {
                    navigate("/waris");
                    setHisabOpen(false);
                  }}
                  className={`${dropdownItemStyle} ${location.pathname === "/waris" ? "text-amber-300 font-bold" : ""
                    }`}
                >
                  <Scale size={16} className="mr-3" /> Waris
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- LOGOUT BUTTON --- */}
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-400 w-[45px] h-[45px] flex items-center justify-center transition-colors duration-300"
        >
          <LogOut size={22} strokeWidth={2.5} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BottomNavigation;