import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

// --- TIPE DATA ---
interface EventItem {
  date: number;
  month: number; // 0-11
  title: string;
  time: string;
  type: "kajian" | "libur" | "ujian";
}

// --- DUMMY DATA KEGIATAN (Nanti bisa dari API) ---
const events: EventItem[] = [
  { date: 5, month: new Date().getMonth(), title: "Kajian Kitab Kuning", time: "08:00 WIB", type: "kajian" },
  { date: 13, month: new Date().getMonth(), title: "Puasa Ayyamul Bidh", time: "Shubuh", type: "kajian" },
  { date: 20, month: new Date().getMonth(), title: "Ujian Semester", time: "07:30 WIB", type: "ujian" },
];

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

  const daysOfWeek = ["Ahd", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // --- LOGIKA KALENDER ---
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const hasEvent = (day: number) => {
    return events.find(e => e.date === day && e.month === currentDate.getMonth());
  };

  // --- RENDER GRID ---
  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(currentDate);
    const startDay = getFirstDayOfMonth(currentDate);
    const daysArray = [];

    // Empty slots sebelum tanggal 1
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Tanggal 1 sampai akhir bulan
    for (let i = 1; i <= totalDays; i++) {
      const event = hasEvent(i);
      const isSelected = selectedDate === i;
      const today = isToday(i);

      daysArray.push(
        <motion.button
          key={i}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedDate(i)}
          className={`
            relative h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
            ${isSelected 
              ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40" 
              : today 
                ? "bg-white/20 text-pink-200 border border-pink-300/30" 
                : "text-white hover:bg-white/10"
            }
          `}
        >
          {i}
          {/* Dot Indikator Event */}
          {event && !isSelected && (
            <div className="absolute bottom-1 w-1 h-1 bg-yellow-400 rounded-full shadow-sm"></div>
          )}
        </motion.button>
      );
    }
    return daysArray;
  };

  // Filter event buat list di bawah
  const activeEvents = events.filter(
    (e) => e.date === selectedDate && e.month === currentDate.getMonth()
  );

  return (
    <div className="pb-24 pt-4 px-4">
      {/* HEADER: Bulan & Tahun */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">
          {months[currentDate.getMonth()]} <span className="text-pink-200 font-light">{currentDate.getFullYear()}</span>
        </h2>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextMonth} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* KALENDER CARD */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-[30px] p-6 border border-white/20 shadow-xl"
      >
        {/* Nama Hari */}
        <div className="grid grid-cols-7 mb-4 text-center">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-xs font-bold text-white/60 uppercase tracking-wider">
              {day}
            </span>
          ))}
        </div>

        {/* Grid Tanggal */}
        <div className="grid grid-cols-7 gap-y-2 justify-items-center">
          <AnimatePresence mode="wait">
            {renderCalendarDays()}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* EVENT LIST SECTION */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-lg font-bold text-white">Kegiatan ({selectedDate} {months[currentDate.getMonth()]})</h3>
          <span className="text-xs text-pink-200 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30">
            {activeEvents.length} Acara
          </span>
        </div>

        <div className="space-y-3">
          {activeEvents.length > 0 ? (
            activeEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-pink-100"
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md
                  ${event.type === 'kajian' ? 'bg-gradient-to-br from-purple-400 to-indigo-500' : 'bg-gradient-to-br from-orange-400 to-red-500'}
                `}>
                  {event.date}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-800 font-bold text-sm">{event.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> Aula Utama</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 opacity-60">
              <CalendarIcon size={40} className="mx-auto text-white mb-2 opacity-50" />
              <p className="text-white text-sm font-medium">Tidak ada kegiatan di tanggal ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;