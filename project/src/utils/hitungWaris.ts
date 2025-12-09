export interface HasilWaris {
  nama: string;
  bagian: string;
  persentase: number;
  nilai: number;
}

interface InputWaris {
  harta: number;
  suami: boolean;
  istri: boolean;
  ayah: boolean;
  ibu: boolean;
  anakLaki: number;
  anakPerempuan: number;
}

export const hitungWaris = ({
  harta,
  suami,
  istri,
  ayah,
  ibu,
  anakLaki,
  anakPerempuan,
}: InputWaris): HasilWaris[] => {
  const hasil: HasilWaris[] = [];
  let totalBagianTerpakai = 0; // Untuk melacak total persentase (0.0 - 1.0)

  // Cek Kondisi
  const adaAnak = anakLaki > 0 || anakPerempuan > 0;
  const adaAnakLaki = anakLaki > 0;

  // --- 1. ASHABUL FURUDH (Penerima Bagian Pasti) ---

  // Suami (1/4 jika ada anak, 1/2 jika tidak)
  if (suami) {
    const bagian = adaAnak ? 1 / 4 : 1 / 2;
    hasil.push({
      nama: "Suami",
      bagian: adaAnak ? "1/4" : "1/2",
      persentase: bagian,
      nilai: harta * bagian,
    });
    totalBagianTerpakai += bagian;
  }

  // Istri (1/8 jika ada anak, 1/4 jika tidak)
  if (istri) {
    const bagian = adaAnak ? 1 / 8 : 1 / 4;
    hasil.push({
      nama: "Istri",
      bagian: adaAnak ? "1/8" : "1/4",
      persentase: bagian,
      nilai: harta * bagian,
    });
    totalBagianTerpakai += bagian;
  }

  // Ibu (1/6 jika ada anak, 1/3 jika tidak)
  if (ibu) {
    const bagian = adaAnak ? 1 / 6 : 1 / 3;
    hasil.push({
      nama: "Ibu",
      bagian: adaAnak ? "1/6" : "1/3",
      persentase: bagian,
      nilai: harta * bagian,
    });
    totalBagianTerpakai += bagian;
  }

  // Ayah (Dapat 1/6 PASTI jika ada anak)
  // Jika tidak ada anak, Ayah jadi Ashabah (ambil sisa nanti)
  if (ayah && adaAnak) {
    const bagian = 1 / 6;
    hasil.push({
      nama: "Ayah (Fardh)",
      bagian: "1/6",
      persentase: bagian,
      nilai: harta * bagian,
    });
    totalBagianTerpakai += bagian;
  }

  // Anak Perempuan (Jika TIDAK ada anak laki-laki)
  // Sendiri = 1/2, Lebih dari satu = 2/3
  if (anakPerempuan > 0 && !adaAnakLaki) {
    const bagian = anakPerempuan === 1 ? 1 / 2 : 2 / 3;
    hasil.push({
      nama: `Anak Perempuan (${anakPerempuan})`,
      bagian: anakPerempuan === 1 ? "1/2" : "2/3",
      persentase: bagian,
      nilai: harta * bagian,
    });
    totalBagianTerpakai += bagian;
  }

  // --- 2. ASHABAH (Pembagian Sisa) ---
  
  let sisaHarta = harta * (1 - totalBagianTerpakai);
  // Koreksi floating point (biar gak muncul -0.0000001)
  if (sisaHarta < 0) sisaHarta = 0; 

  // Skenario A: Ada Anak Laki-laki (Anak Laki & Pr jadi Ashabah bil Ghair 2:1)
  if (adaAnakLaki && sisaHarta > 0) {
    const totalPoin = (anakLaki * 2) + anakPerempuan;
    const nilaiSatuPoin = sisaHarta / totalPoin;

    hasil.push({
      nama: `Anak Laki-laki (${anakLaki})`,
      bagian: "Ashabah (2:1)",
      persentase: (nilaiSatuPoin * 2 * anakLaki) / harta,
      nilai: nilaiSatuPoin * 2 * anakLaki,
    });

    if (anakPerempuan > 0) {
      hasil.push({
        nama: `Anak Perempuan (${anakPerempuan})`,
        bagian: "Ashabah (2:1)",
        persentase: (nilaiSatuPoin * anakPerempuan) / harta,
        nilai: nilaiSatuPoin * anakPerempuan,
      });
    }
  } 
  // Skenario B: Tidak ada anak sama sekali -> Ayah ambil SEMUA sisa
  else if (ayah && !adaAnak && sisaHarta > 0) {
    hasil.push({
      nama: "Ayah (Ashabah)",
      bagian: "Sisa Harta",
      persentase: sisaHarta / harta,
      nilai: sisaHarta,
    });
  }
  // Skenario C: Cuma ada anak perempuan -> Ayah ambil sisa (selain 1/6 tadi)
  else if (ayah && !adaAnakLaki && anakPerempuan > 0 && sisaHarta > 0) {
    hasil.push({
      nama: "Ayah (Sisa)",
      bagian: "Sisa Harta",
      persentase: sisaHarta / harta,
      nilai: sisaHarta,
    });
  }
  // Skenario D: Sisa Harta Tak Bertuan (Misal cuma ada Suami) -> Radd / Baitul Mal
  else if (sisaHarta > 0) {
     hasil.push({
       nama: "Sisa (Baitul Mal)",
       bagian: "Sisa",
       persentase: sisaHarta / harta,
       nilai: sisaHarta
     });
  }

  return hasil;
};