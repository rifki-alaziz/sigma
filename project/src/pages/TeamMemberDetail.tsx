import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { 
  ArrowLeft, 
  Phone, 
  Instagram, 
  User, 
  Award, 
  Briefcase,
  Star
} from "lucide-react";

// --- DUMMY DATA (Sesuaikan dengan data di TeamPage) ---
const TEAM_MEMBERS = [
  { id: '1', name: 'Gus Nabil', role: 'Ketua Umum', division: 'pusat', photo: 'https://img.freepik.com/free-photo/portrait-young-arab-man_23-2148439366.jpg', bio: "Beliau adalah sosok visioner yang telah memimpin organisasi ini menuju era digitalisasi. Dengan pengalaman lebih dari 10 tahun dalam manajemen pesantren, beliau selalu mengedepankan inovasi tanpa meninggalkan tradisi salaf." },
  { id: '2', name: 'Ust. Ahmad Zaki', role: 'Koordinator', division: 'fk_ilmiyah', photo: 'https://img.freepik.com/free-photo/muslim-man-posing-gracefully_23-2148766624.jpg', bio: "Dikenal sebagai pakar dalam kajian kitab kuning dan literatur klasik. Dedikasinya dalam menghidupkan kembali diskusi ilmiyah di kalangan santri telah melahirkan banyak karya tulis yang bermanfaat." },
  // ... Tambahkan data member lain sesuai ID-nya
];

/* ----------------------------------------------
   VARIANTS ANIMASI
------------------------------------------------ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TeamMemberDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const member = TEAM_MEMBERS.find((m) => m.id === id) || {
    id: '0',
    name: 'Anggota Tim',
    role: 'Pengurus',
    division: 'Umum',
    photo: 'https://via.placeholder.com/600x800',
    bio: 'Seorang pengabdi yang berdedikasi tinggi untuk kemajuan bersama.'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // 👇 PERUBAHAN 1: Hapus bg-[#1e1e1e] agar transparan mengikuti layout
    <div className="min-h-screen relative font-sans text-gray-800 pb-20">
      
      {/* --- HERO IMAGE --- */}
      <div className="fixed top-0 left-0 w-full h-[65vh] z-0">
         <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${member.photo})` }}
         />
         {/* 👇 PERUBAHAN 2: Gradient disesuaikan agar tidak hitam pekat di bawah, tapi transparan */}
         {/* Overlay gelap dari atas agar teks putih terbaca, lalu memudar ke transparan di bawah */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-8">
        
        {/* --- TOMBOL KEMBALI --- */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/team')}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-white font-bold hover:bg-white/20 transition-all mb-32 border border-white/20 shadow-lg cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke Tim</span>
        </motion.button>

        {/* --- CONTENT CONTAINER --- */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="enter"
          className="relative"
        >
           {/* HEADER TITLE */}
           <motion.div variants={itemVariants} className="mb-6 text-white drop-shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-rose-500 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-rose-500/40">
                        {member.division}
                    </span>
                    <span className="flex items-center gap-1 text-white/80 text-xs font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        Top Performance
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    {member.name}
                </h1>
                <p className="text-xl text-white/80 font-medium mt-2 flex items-center gap-2">
                    <Briefcase size={18} />
                    {member.role}
                </p>
           </motion.div>

           {/* --- GLASS CARD CONTENT --- */}
           {/* Karena background utama sekarang terang (mengikuti layout), 
               kita buat kartunya sedikit lebih buram/putih agar konten tetap jelas */}
           <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/20 relative overflow-hidden min-h-[400px] border border-white/50">
               
               {/* Decorative Gradient Bar */}
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-500" />

               {/* Section: Biography */}
               <motion.div variants={itemVariants} className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                   <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                       <User className="text-rose-500" />
                       Tentang Beliau
                   </h3>
                   <p className="mb-6">
                       {member.bio}
                   </p>
                   <p>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                   </p>
               </motion.div>

               {/* Section: Details */}
               <motion.div variants={itemVariants} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100">
                       <h4 className="font-bold text-rose-700 mb-2 flex items-center gap-2">
                           <Award size={18} /> Spesialisasi
                       </h4>
                       <p className="text-sm text-rose-900/70">
                           Manajemen Organisasi, Public Speaking, Kajian Fiqih Kontemporer.
                       </p>
                   </div>
                   <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                        <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                           <Star size={18} /> Masa Khidmah
                       </h4>
                       <p className="text-sm text-blue-900/70">
                           Bergabung sejak tahun 2018 (5 Tahun Pengabdian).
                       </p>
                   </div>
               </motion.div>

               {/* Section: Contact Action */}
               <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-100">
                   <h4 className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">
                       Hubungi & Terhubung
                   </h4>
                   <div className="flex justify-center gap-4">
                       <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                           <Phone size={18} />
                           WhatsApp
                       </button>
                       <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-bold shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                           <Instagram size={18} />
                           Instagram
                       </button>
                   </div>
               </motion.div>

           </div>
        </motion.main>
      </div>
    </div>
  );
};

export default TeamMemberDetail;