import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, LocateFixed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 👇 IMPORT INI PENTING SAYANG
import { Geolocation } from '@capacitor/geolocation';

import { CITIES, City, ScheduleData } from "../data/falakData";
import { 
  calculatePrayerTimes, 
  calculateQiblaDirection, 
  getIndonesianTimezone,
  getIstiwaTime 
} from "../utils/prayerMath";
import CompassWidget from "../components/CompassWidget";
import PrayerSchedule from "../components/PrayerSchedule";
import ClockCard from "../components/ClockCard";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

const FalakPage = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [time, setTime] = useState(new Date());
  const [istiwaStr, setIstiwaStr] = useState("00:00:00");
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[8]); // Default Jakarta
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [compassHeading, setCompassHeading] = useState(0);
  
  // --- STATE GPS ---
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [isGpsMode, setIsGpsMode] = useState(false);
  const [addressName, setAddressName] = useState("");
  
  // 👇 Capacitor watchId itu string, bukan number biasa
  const watchIdRef = useRef<string | null>(null);

  // 1. CLOCK & ISTIWA (Update Setiap Detik)
  useEffect(() => {
    const updateTime = () => {
        const now = new Date();
        setTime(now);
        if (selectedCity) {
            const wis = getIstiwaTime(now, selectedCity);
            setIstiwaStr(wis);
        }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]); 

  // 2. JADWAL SHOLAT
  useEffect(() => {
    const result = calculatePrayerTimes(selectedCity, new Date());
    setSchedule(result);
  }, [selectedCity]);

  // 3. SENSOR KOMPAS
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const iosEvent = e as DeviceOrientationEventiOS;
      if (iosEvent.webkitCompassHeading !== undefined && iosEvent.webkitCompassHeading !== null) {
        setCompassHeading(iosEvent.webkitCompassHeading);
      } else if (e.alpha !== null) {
        setCompassHeading(Math.abs(360 - e.alpha));
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }
    
    const mockInterval = setInterval(() => {
        if (!('ontouchstart' in window) && !window.DeviceOrientationEvent) {
             setCompassHeading(prev => (prev + 0.2) % 360); 
        }
    }, 50);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
      clearInterval(mockInterval);
    };
  }, []);

  // Cleanup GPS saat unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        // 👇 Cara clear watch di Capacitor beda dikit
        Geolocation.clearWatch({ id: watchIdRef.current });
      }
    };
  }, []);

  // --- API NAMA LOKASI ---
  const fetchLocationName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.address) {
        const area = data.address.city || data.address.town || data.address.county || data.address.village || "Lokasi Terdeteksi";
        return `${area}`;
      }
      return "Lokasi GPS";
    } catch (error) {
      return "Lokasi GPS (Offline)";
    }
  };

  // --- HANDLE GPS (REFACTORED WITH CAPACITOR) ---
  const handleUseMyLocation = async () => {
    // Kalau mau matikan GPS
    if (isGpsMode) {
      if (watchIdRef.current !== null) {
        await Geolocation.clearWatch({ id: watchIdRef.current });
        watchIdRef.current = null;
      }
      setIsGpsMode(false);
      setAddressName("");
      return;
    }

    setLoadingLoc(true);

    try {
        // 1. Cek Permission dulu, Sayang. Jangan main nyelonong.
        const permissionStatus = await Geolocation.checkPermissions();
        
        if (permissionStatus.location !== 'granted') {
            const request = await Geolocation.requestPermissions();
            if (request.location !== 'granted') {
                alert("Izin lokasi diperlukan agar fitur ini bisa memuaskanmu.");
                setLoadingLoc(false);
                return;
            }
        }

        setIsGpsMode(true);

        // 2. Mulai Watch Position pakai Capacitor
        const id = await Geolocation.watchPosition(
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
            async (position, err) => {
                if (err) {
                    console.error(err);
                    // Jangan langsung alert di sini biar ga spam kalau sinyal ilang dikit
                    return; 
                }

                if (position) {
                    const { latitude, longitude } = position.coords;
                    const tz = getIndonesianTimezone(longitude);
                    const qibla = calculateQiblaDirection(latitude, longitude);
                    
                    // Kita fetch nama lokasi sesekali aja atau pas awal dapat
                    // (Optional: bisa tambahin debounce logic biar ga request terus)
                    const detectedName = await fetchLocationName(latitude, longitude);
                    setAddressName(detectedName);

                    const dynamicCity: City = {
                        name: detectedName,
                        lat: latitude,
                        lon: longitude,
                        tz: tz,
                        qibla: qibla
                    };

                    setSelectedCity(dynamicCity);
                    setLoadingLoc(false);
                }
            }
        );

        // Simpan ID watch-nya (ini return string kalau di Capacitor plugin)
        watchIdRef.current = id;

    } catch (error) {
        console.error("GPS Error:", error);
        alert("Gagal mengaktifkan GPS. Pastikan Location Services di HP nyala ya.");
        setLoadingLoc(false);
        setIsGpsMode(false);
    }
  };

  const handleManualSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Matikan watch kalau pindah ke manual
    if (watchIdRef.current !== null) {
        await Geolocation.clearWatch({ id: watchIdRef.current });
        watchIdRef.current = null;
    }
    
    const city = CITIES.find(c => c.name === e.target.value);
    if(city) {
        setSelectedCity(city);
        setIsGpsMode(false);
        setAddressName("");
    }
  };

  return (
    // ... (SISA KODE RENDER KAMU SAMA PERSIS, GAK PERLU DIUBAH) ...
    // Pastikan cuma copy bagian return render kamu yang tadi
    <div className="min-h-screen pb-32 font-sans text-gray-800">
         {/* ... Render JSX kamu aman ... */}
         {/* Langsung ke bagian return yang kamu punya sebelumnya */}
         <div className="sticky top-0 z-20 bg-white/10 backdrop-blur-md px-6 py-4 flex items-center gap-4 border-b border-white/20 shadow-sm">
            <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-sm hover:bg-white/30 text-white"
            >
            <ArrowLeft size={20} />
            </motion.button>
            <div>
                <h1 className="text-xl font-bold text-white drop-shadow-md">Falak & Kompas</h1>
                <p className="text-xs text-white/80 line-clamp-1 w-48">
                    {isGpsMode ? "Mode GPS: Live Tracking" : `Manual: ${selectedCity.name}`}
                </p>
            </div>
        </div>

        <div className="px-6 space-y-6 mt-6">
             <ClockCard time={time} istiwaTime={istiwaStr} />

             <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                            <MapPin size={18} />
                        </div>
                        <select 
                            value={isGpsMode ? "GPS_ACTIVE" : selectedCity.name}
                            onChange={handleManualSelect}
                            className={`w-full appearance-none pl-12 pr-4 py-4 rounded-[24px] shadow-lg outline-none border border-white/50 cursor-pointer transition-all
                                ${isGpsMode 
                                    ? "bg-green-100/90 text-green-800 font-bold backdrop-blur-sm" 
                                    : "bg-white/90 text-gray-800 backdrop-blur-sm"}`}
                        >
                            {isGpsMode && <option value="GPS_ACTIVE">📍 {addressName || "Melacak..."}</option>}
                            {CITIES.map((city) => (
                            <option key={city.name} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-gray-600">▼</div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleUseMyLocation}
                        className={`h-14 w-14 rounded-[24px] flex items-center justify-center shadow-lg border transition-all backdrop-blur-sm
                        ${isGpsMode 
                            ? "bg-green-500 text-white border-green-400 ring-2 ring-green-300 ring-offset-2 ring-offset-transparent" 
                            : "bg-white/90 text-gray-600 border-white/50 hover:bg-white"}`}
                    >
                        {loadingLoc ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                        <Navigation size={20} className={isGpsMode ? "fill-current animate-pulse" : ""} />
                        )}
                    </motion.button>
                </div>

                <AnimatePresence>
                    <motion.div 
                        key={selectedCity.lat + selectedCity.lon} 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center justify-between text-xs text-white/90 shadow-inner"
                    >
                        <div className="flex items-center gap-2">
                        <LocateFixed size={14} className={`text-white ${isGpsMode ? 'animate-pulse' : ''}`} />
                        <span>
                            <span className="font-bold">LS:</span> {selectedCity.lat.toFixed(5)}
                        </span>
                        <span className="w-[1px] h-3 bg-white/40 mx-1"></span>
                        <span>
                            <span className="font-bold">BT:</span> {selectedCity.lon.toFixed(5)}
                        </span>
                        </div>
                        <div className="bg-white/20 px-2 py-0.5 rounded-full font-bold text-[10px] border border-white/20">
                        UTC+{selectedCity.tz}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <CompassWidget heading={compassHeading} qiblaStr={selectedCity.qibla} />
            <PrayerSchedule schedule={schedule} />

        </div>
    </div>
  );
};

export default FalakPage;