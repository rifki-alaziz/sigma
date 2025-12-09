import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faWhatsapp,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
const Footer: React.FC = () => {
  // Data sosial media untuk memudahkan mapping dan styling
  const socials = [
    { 
      icon: faInstagram, 
      href: "https://instagram.com/rifki_alaziz", 
      color: "hover:bg-pink-500 hover:text-white", 
      bg: "bg-pink-50 text-pink-600" 
    },
    { 
      icon: faWhatsapp, 
      href: "https://wa.me/62859269692", 
      color: "hover:bg-green-500 hover:text-white", 
      bg: "bg-green-50 text-green-600" 
    },
    { 
      icon: faXTwitter, 
      href: "https://x.com/rifki_alaziz", 
      color: "hover:bg-black hover:text-white", 
      bg: "bg-gray-100 text-gray-700" 
    },
    { 
      icon: faYoutube, 
      href: "https://youtube.com/rumahanime", 
      color: "hover:bg-red-500 hover:text-white", 
      bg: "bg-red-50 text-red-600" 
    },
  ];

  return (
    <footer className="w-full py-8 px-4 flex justify-center mt-12">
      <div className="w-full max-w-3xl">
        {/* --- CONTAINER UTAMA (Gaya Kartu Melayang) --- */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100/50 border border-gray-100 p-8 text-center relative overflow-hidden">
          
          {/* Dekorasi Latar Belakang Halus */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>

          {/* --- SOCIAL MEDIA ICONS --- */}
          <div className="flex justify-center gap-4 mb-8">
            {socials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  w-12 h-12 flex items-center justify-center rounded-full text-xl transition-all duration-300 
                  ${item.bg} ${item.color} hover:scale-110 hover:shadow-lg
                `}
              >
                <FontAwesomeIcon icon={item.icon} />
              </a>
            ))}
          </div>

          {/* --- INFO & CONTACT --- */}
          <div className="flex flex-col items-center space-y-3">
            
            {/* Contact Badge (Pill Shape) */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 border border-pink-100 rounded-full mb-2">
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
              <p className="text-xs font-medium text-pink-700">
                Ada data yang salah? Hubungi Admin segera.
              </p>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500 font-medium">
              © {new Date().getFullYear()} <span className="text-gray-800 font-bold">Rifki-Alaziz</span>. All rights reserved.
            </p>
            
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Developer FullStack
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;