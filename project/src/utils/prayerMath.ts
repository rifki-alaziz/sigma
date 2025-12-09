// src/utils/prayerMath.ts
import { City, ScheduleData } from "../data/falakData"; // Pastikan path ini benar ya Sayang

// --- DEFINISI TIPE ---
// Kita definisikan ulang di sini kalau di falakData belum lengkap/beda
export interface PrayerTimes {
  imsak: string;
  subuh: string;
  terbit: string;
  dluha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  height: number;
}

// --- Helper Internal ---
const floatToTime = (val: number | null): string => {
  if (val === null || isNaN(val)) return "--:--";
  let h = Math.floor(val);
  let m = Math.floor((val - h) * 60);
  if (m >= 60) { h++; m -= 60; }
  
  // Handle hari mundur (negatif) atau maju (lebih 24)
  while (h >= 24) h -= 24;
  while (h < 0) h += 24;
  
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// --- SUN PARAMS (UTC Based) ---
const calculateSunParams = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
    
    const D = JD - 2451545.0;
    let q = (280.459 + 0.98564736 * D) % 360;
    if (q < 0) q += 360; 

    const g = (357.529 + 0.98560028 * D) % 360;
    const L = (q + 1.915 * Math.sin(g * Math.PI / 180) + 0.020 * Math.sin(2 * g * Math.PI / 180)) % 360;
    const e = 23.439 - 0.00000036 * D;
    
    const raRad = Math.atan2(
        Math.cos(e * Math.PI / 180) * Math.sin(L * Math.PI / 180), 
        Math.cos(L * Math.PI / 180)
    );
    let raDeg = (raRad * 180 / Math.PI); 
    if (raDeg < 0) raDeg += 360; 

    const decl = Math.asin(Math.sin(e * Math.PI / 180) * Math.sin(L * Math.PI / 180)) * 180 / Math.PI;
    
    let delta = q - raDeg;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const eqt = delta / 15; 

    return { decl, eqt };
};

// 1. KIBLAT DINAMIS
export const calculateQiblaDirection = (lat: number, lon: number): string => {
  const KAABA_LAT = 21.422487;
  const KAABA_LON = 39.826206;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const dLon = toRad(KAABA_LON - lon);
  const lat1 = toRad(lat);
  const lat2 = toRad(KAABA_LAT);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let qibla = toDeg(Math.atan2(y, x));
  qibla = (qibla + 360) % 360;
  const d = Math.floor(qibla);
  const m = Math.floor((qibla - d) * 60);
  const s = Math.round(((qibla - d) * 60 - m) * 60);
  return `${d}°${m}'${s}"`;
};

// 2. TIMEZONE INDONESIA
export const getIndonesianTimezone = (lon: number): number => {
  if (lon < 114.5) return 7; // WIB
  if (lon >= 114.5 && lon < 120) return 8; // WITA
  if (lon >= 120 && lon < 135) return 8; // WITA
  return 9; // WIT
};

// 3. PARSING KIBLAT (Dipake CompassWidget)
export const getQiblaAngle = (qiblaStr: string | GeoCoordinates): number => {
  // Kalau inputnya objek GeoCoordinates (dari CompassWidget lama), hitung ulang stringnya
  if (typeof qiblaStr === 'object') {
     const str = calculateQiblaDirection(qiblaStr.latitude, qiblaStr.longitude);
     return getQiblaAngle(str); // Rekursif panggil diri sendiri dengan string
  }

  const parts = qiblaStr.match(/(\d+)°(\d+)'(\d+)"/);
  if (parts) {
    return parseFloat(parts[1]) + parseFloat(parts[2]) / 60 + parseFloat(parts[3]) / 3600;
  }
  return 294; // Fallback umum indo
};

// 4. HITUNG JADWAL SHOLAT (Logika Inti Kamu)
export const calculatePrayerTimes = (city: City, date: Date): ScheduleData => {
  const { lat, lon, tz } = city;
  const { decl, eqt } = calculateSunParams(date);

  const midday = 12 + tz - (lon / 15) - eqt;

  const getHourAngle = (angle: number) => {
    const cosHA = (Math.sin(angle * Math.PI / 180) - Math.sin(lat * Math.PI / 180) * Math.sin(decl * Math.PI / 180)) /
                  (Math.cos(lat * Math.PI / 180) * Math.cos(decl * Math.PI / 180));
    if (cosHA > 1 || cosHA < -1) return null;
    return Math.acos(cosHA) * 180 / Math.PI / 15;
  };

  const zm = Math.abs(lat - decl);
  const asharAltRad = Math.atan(1 / (1 + Math.tan(zm * Math.PI / 180)));
  const asharAltDegree = asharAltRad * 180 / Math.PI;

  const haAshar = getHourAngle(90 - asharAltDegree);
  const haSubuh = getHourAngle(-20.0);
  const haTerbit = getHourAngle(-0.8333); // Dluha ~Terbit + dikit
  const haDluha = getHourAngle(3.5); // Dluha 3.5 derajat
  const haIsya = getHourAngle(-18.0);

  // Hitung Subuh dalam Desimal
  const subuhDecimal = haSubuh !== null ? midday - haSubuh + (2 / 60) : null;

  // Imsak = Subuh - 10 menit (10/60 jam)
  const imsakDecimal = subuhDecimal !== null ? subuhDecimal - (10 / 60) : null;

  return {
    imsak: floatToTime(imsakDecimal),
    subuh: floatToTime(subuhDecimal),
    terbit: floatToTime(haTerbit !== null ? midday - haTerbit - (2 / 60) : null),
    dluha: floatToTime(haDluha !== null ? midday - haDluha - (2 / 60) : null), // Tambahin Dluha
    dzuhur: floatToTime(midday + (2 / 60)),
    ashar: floatToTime(haAshar !== null ? midday + haAshar + (2 / 60) : null),
    maghrib: floatToTime(haTerbit !== null ? midday + haTerbit + (2 / 60) : null),
    isya: floatToTime(haIsya !== null ? midday + haIsya + (2 / 60) : null),
  };
};

// 🔥 5. FUNGSI WRAPPER (PENTING!)
// Ini jembatan biar PrayerSchedule.tsx nggak error
export const getPrayerTimes = (date: Date, coords: GeoCoordinates): PrayerTimes => {
  // Kita convert koordinat user jadi objek 'City'
  const city: City = {
    id: "auto",
    name: "Lokasi Saya",
    lat: coords.latitude,
    lon: coords.longitude,
    tz: getIndonesianTimezone(coords.longitude) // Otomatis detect WIB/WITA/WIT
    ,
    qibla: ""
  };

  // Panggil rumus sakti kamu
  const schedule = calculatePrayerTimes(city, date);

  // Balikin sesuai format PrayerTimes yang diminta komponen
  return {
    imsak: schedule.imsak,
    subuh: schedule.subuh,
    terbit: schedule.terbit,
    dluha: schedule.dluha || "--:--", // Handle kalau dluha null
    dzuhur: schedule.dzuhur,
    ashar: schedule.ashar,
    maghrib: schedule.maghrib,
    isya: schedule.isya
  };
};

// 6. HITUNG WIS
export const getIstiwaTime = (date: Date, city: City): string => {
  const { lon } = city; 
  const { eqt } = calculateSunParams(date);
  
  const currentUTCHours = date.getUTCHours() + (date.getUTCMinutes()/60) + (date.getUTCSeconds()/3600);
  let istiwaDecimal = currentUTCHours + (lon / 15) + eqt;
  
  while (istiwaDecimal >= 24) istiwaDecimal -= 24;
  while (istiwaDecimal < 0) istiwaDecimal += 24;
  
  let h = Math.floor(istiwaDecimal);
  let m = Math.floor((istiwaDecimal - h) * 60);
  let s = Math.floor(((istiwaDecimal - h) * 60 - m) * 60);
  
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};