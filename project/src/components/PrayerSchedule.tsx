// src/components/PrayerSchedule.tsx
import { useState, useEffect } from 'react';
import { Clock, Info, MapPin, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

// 👇 Import Otak Pintarnya
import useGeoLocation from '../hooks/useGeoLocation';
import { getPrayerTimes, PrayerTimes } from '../utils/prayerMath';

// Komponen Item Kecil (Reusable)
const ScheduleItem = ({ label, time, isHighlight = false }: { label: string, time: string, isHighlight?: boolean }) => (
  <motion.div 
    layout
    className={`backdrop-blur-sm rounded-[20px] p-3 flex flex-col items-center justify-center transition-all duration-500
    ${isHighlight 
      ? 'bg-white/90 border-2 border-orange-200 shadow-md scale-105 z-10' 
      : 'bg-white/40 border border-transparent'}`}
  >
    <span className={`text-xs font-semibold uppercase tracking-wide opacity-70 ${isHighlight ? 'text-orange-900' : 'text-[#1e1e1e]'}`}>{label}</span>
    <span className={`font-mono font-bold ${isHighlight ? 'text-3xl text-orange-900' : 'text-xl text-[#1e1e1e]'}`}>{time}</span>
  </motion.div>
);

const PrayerSchedule = () => {
  // 1. Panggil Hook Lokasi
  const location = useGeoLocation();
  const [prayers, setPrayers] = useState<PrayerTimes | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string>('dzuhur'); // Default highlight
  const [currentTime, setCurrentTime] = useState(new Date());

  // 2. Timer Jam Digital (Biar kita tau kapan ganti highlight)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Hitung Jadwal saat Lokasi Ditemukan
  useEffect(() => {
    if (location.loaded && !location.error) {
      const times = getPrayerTimes(new Date(), {
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        height: location.coordinates.height,
      });
      setPrayers(times);
      determineNextPrayer(times);
    }
  }, [location.loaded, location.coordinates]);

  // Logic buat nentuin sholat mana yang harus di-Highlight
  const determineNextPrayer = (times: PrayerTimes) => {
    const now = new Date();
    const curTime = now.getHours() * 60 + now.getMinutes();

    const timeToMin = (str: string) => {
      const [h, m] = str.split(':').map(Number);
      return h * 60 + m;
    };

    if (curTime < timeToMin(times.subuh)) return setNextPrayer('subuh');
    if (curTime < timeToMin(times.dzuhur)) return setNextPrayer('dzuhur');
    if (curTime < timeToMin(times.ashar)) return setNextPrayer('ashar');
    if (curTime < timeToMin(times.maghrib)) return setNextPrayer('maghrib');
    if (curTime < timeToMin(times.isya)) return setNextPrayer('isya');
    return setNextPrayer('subuh'); // Lewat Isya berarti besok Subuh
  };

  // --- KONDISI LOADING (Lagi nyari GPS) ---
  if (!location.loaded) {
    return (
      <div className="bg-[#ffcd73] rounded-[32px] p-8 shadow-lg min-h-[300px] flex flex-col items-center justify-center text-[#1e1e1e] animate-pulse">
        <RefreshCw className="animate-spin mb-4 opacity-50" size={32} />
        <p className="font-bold">Sedang melacak lokasi...</p>
        <p className="text-xs opacity-60">Mohon tunggu sebentar ya, Sayang.</p>
      </div>
    );
  }

  // --- KONDISI ERROR (GPS Mati/Ditolak) ---
  if (location.error) {
    return (
      <div className="bg-red-50 rounded-[32px] p-8 shadow-lg border border-red-200 text-center">
        <p className="text-red-600 font-bold mb-2">Gagal Mendeteksi Lokasi 😢</p>
        <p className="text-sm text-red-400">Pastikan GPS aktif dan izinkan akses lokasi di browser.</p>
      </div>
    );
  }

  // --- KONDISI SUKSES (TAMPILAN UTAMA) ---
  return (
    <div className="bg-[#ffcd73] rounded-[32px] p-6 shadow-xl text-[#1e1e1e] relative overflow-hidden border border-orange-200/50">
       
       {/* Dekorasi Background */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-bl-[100px] pointer-events-none" />
       <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-orange-400/20 rounded-full blur-xl pointer-events-none" />

       {/* Header: Judul & Lokasi */}
       <div className="flex justify-between items-start mb-6 relative z-10">
         <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Clock size={20} /> Jadwal Sholat
            </h3>
            <div className="flex items-center gap-1 text-xs opacity-70 mt-1">
               <MapPin size={12} />
               <span>{location.coordinates.latitude.toFixed(2)}, {location.coordinates.longitude.toFixed(2)}</span>
            </div>
         </div>
         {/* Jam Digital Kecil */}
         <div className="text-right">
            <span className="text-2xl font-mono font-bold tracking-tighter">
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
         </div>
       </div>
       
       {prayers && (
         <div className="grid grid-cols-2 gap-3 relative z-10">
           {/* Baris 1: Imsak & Subuh */}
           {/* Kalau Subuh next, dia jadi highlight */}
           <div className={nextPrayer === 'subuh' ? 'col-span-2' : ''}>
              <ScheduleItem label="Subuh" time={prayers.subuh} isHighlight={nextPrayer === 'subuh'} />
           </div>
           {nextPrayer !== 'subuh' && (
              <ScheduleItem label="Imsak" time={prayers.imsak} />
           )}
           
           {/* Baris 2: Terbit (Info baris) */}
           <div className="col-span-2 bg-white/20 backdrop-blur-sm rounded-[16px] py-1.5 flex items-center justify-center gap-2 opacity-80 border border-white/10">
              <span className="text-[10px] font-semibold uppercase tracking-wider">Terbit</span>
              <span className="text-xs font-bold font-mono">{prayers.terbit}</span>
              <span className="text-[10px] opacity-50">|</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">Dhuha</span>
              <span className="text-xs font-bold font-mono">{prayers.dluha}</span>
           </div>

           {/* Baris 3: Dzuhur */}
           <div className={nextPrayer === 'dzuhur' ? 'col-span-2' : ''}>
              <ScheduleItem label="Dzuhur" time={prayers.dzuhur} isHighlight={nextPrayer === 'dzuhur'} />
           </div>
           
           {/* Baris 4: Ashar */}
           <div className={nextPrayer === 'ashar' ? 'col-span-2' : ''}>
              <ScheduleItem label="Ashar" time={prayers.ashar} isHighlight={nextPrayer === 'ashar'} />
           </div>

           {/* Baris 5: Maghrib */}
           <div className={nextPrayer === 'maghrib' ? 'col-span-2' : ''}>
              <ScheduleItem label="Maghrib" time={prayers.maghrib} isHighlight={nextPrayer === 'maghrib'} />
           </div>
           
           {/* Baris 6: Isya */}
           <div className={nextPrayer === 'isya' ? 'col-span-2' : ''}>
              <ScheduleItem label="Isya" time={prayers.isya} isHighlight={nextPrayer === 'isya'} />
           </div>
         </div>
       )}
       
       <div className="mt-6 flex items-center gap-2 text-[10px] opacity-60 justify-center text-center leading-tight bg-black/5 p-2 rounded-lg">
          <Info size={12} className="shrink-0" />
          <span>
            Waktu dihitung berdasarkan lokasi GPS Anda.<br/>
            (Ketinggian: {Math.round(location.coordinates.height)} mdpl)
          </span>
       </div>
    </div>
  );
};

export default PrayerSchedule;