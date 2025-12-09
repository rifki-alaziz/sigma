// src/data/falakData.ts

export interface City {
  id?: string; // 👈 Kita kasih tanda tanya (?) biar optional. Jadi list kota di bawah gak error walau gak punya ID.
  name: string;
  lat: number;
  lon: number;
  tz: number;
  qibla: string;
}

export interface ScheduleData {
  imsak: string;
  subuh: string;
  terbit: string;
  dluha: string; // 👈 Nah, ini dia si Dluha yang bikin error tadi. Sekarang udah resmi ada!
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export const CITIES: City[] = [
  { name: "Sabang", lat: 5.90, lon: 95.35, tz: 7, qibla: "291°56'08\"" },
  { name: "Banda Aceh", lat: 5.58, lon: 95.33, tz: 7, qibla: "292°08'13\"" },
  { name: "Medan", lat: 3.63, lon: 98.63, tz: 7, qibla: "292°44'46\"" },
  { name: "Pekanbaru", lat: 0.60, lon: 101.23, tz: 7, qibla: "293°46'18\"" },
  { name: "Padang", lat: -0.95, lon: 100.35, tz: 7, qibla: "294°41'51\"" },
  { name: "Jambi", lat: -1.60, lon: 103.63, tz: 7, qibla: "294°15'42\"" },
  { name: "Palembang", lat: -2.98, lon: 104.78, tz: 7, qibla: "295°36'33\"" },
  { name: "Bandar Lampung", lat: -5.42, lon: 105.28, tz: 7, qibla: "295°17'11\"" },
  { name: "Jakarta", lat: -6.17, lon: 106.82, tz: 7, qibla: "295°08'31\"" },
  { name: "Bandung", lat: -6.95, lon: 107.57, tz: 7, qibla: "295°11'10\"" },
  { name: "Semarang", lat: -7.00, lon: 110.40, tz: 7, qibla: "294°30'17\"" },
  { name: "Yogyakarta", lat: -7.80, lon: 110.35, tz: 7, qibla: "294°42'46\"" },
  { name: "Surabaya", lat: -7.25, lon: 112.75, tz: 7, qibla: "294°01'45\"" },
  { name: "Pontianak", lat: 0.00, lon: 109.37, tz: 7, qibla: "292°44'37\"" },
  { name: "Banjarmasin", lat: -3.37, lon: 114.67, tz: 8, qibla: "292°51'38\"" },
  { name: "Samarinda", lat: -0.47, lon: 117.18, tz: 8, qibla: "291°59'21\"" },
  { name: "Denpasar", lat: -8.62, lon: 115.22, tz: 8, qibla: "293°44'32\"" },
  { name: "Mataram", lat: -8.60, lon: 116.13, tz: 8, qibla: "293°32'22\"" },
  { name: "Makassar", lat: -5.13, lon: 119.45, tz: 8, qibla: "292°28'04\"" },
  { name: "Kendari", lat: -3.95, lon: 122.58, tz: 8, qibla: "291°57'36\"" },
  { name: "Gorontalo", lat: 0.57, lon: 123.08, tz: 8, qibla: "291°29'37\"" },
  { name: "Manado", lat: 1.55, lon: 124.88, tz: 8, qibla: "291°21'58\"" },
  { name: "Ambon", lat: -3.70, lon: 128.23, tz: 9, qibla: "291°28'23\"" },
  { name: "Jayapura", lat: -2.47, lon: 140.63, tz: 9, qibla: "292°09'12\"" },
  { name: "Merauke", lat: -8.50, lon: 140.45, tz: 9, qibla: "290°09'06\"" },
];