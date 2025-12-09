// ===================== USER & AUTH =====================

export interface User {
  id: number;                    // id user dari database
  username: string;              // nama pengguna
  email: string;                 // email user
  password?: string;             // password opsional (tidak dikirim ke frontend)
  role: 'admin' | 'user';        // peran user
  createdAt?: string;            // waktu pembuatan akun
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// ===================== STUDENT =====================

export interface Student {
  id: number;
  name: string;
  fatherName: string;
  birthDate: string;
  address: string;
  category: StudentCategory;
  instagram?: string;
  whatsapp?: string;
  quotes?: string;
  photo?: string;
  mapsUrl?: string;
  createdAt: string;
}

export type StudentCategory = 
  | 'luar-negeri'
  | 'luar-jawa'
  | 'banten'
  | 'jabodetabek'
  | 'jawa-barat'
  | 'jawa-tengah'
  | 'yogyakarta'
  | 'jawa-timur';

// ===================== TEACHER =====================

export interface Teacher {
  id: number;
  name: string;
  fatherName: string;
  birthDate: string;
  address: string;
  subject: string;
  instagram?: string;
  whatsapp?: string;
  quotes?: string;
  photo?: string;
  notes?: string;   // <<< tambahan di sini
  createdAt: string;
}


// ===================== SLIDER / FEATURED =====================

export interface FeaturedSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}
