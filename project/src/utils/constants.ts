import { StudentCategory } from '../types';

export const STUDENT_CATEGORIES: Record<StudentCategory, { label: string; color: string; description: string }> = {
  'luar-negeri': {
    label: 'Luar Negeri',
    color: 'bg-purple-500',
    description: 'Siswa dari berbagai negara'
  },
  'luar-jawa': {
    label: 'Luar Jawa',
    color: 'bg-green-500',
    description: 'Siswa dari luar Pulau Jawa'
  },
  'banten': {
    label: 'Banten',
    color: 'bg-blue-500',
    description: 'Siswa dari Provinsi Banten'
  },
  'jabodetabek': {
    label: 'DKI Jakarta',
    color: 'bg-red-500',
    description: 'Jakarta, Bogor, Depok, Tangerang, Bekasi'
  },
  'jawa-barat': {
    label: 'Jawa Barat',
    color: 'bg-indigo-500',
    description: 'Siswa dari Provinsi Jawa Barat'
  },
  'jawa-tengah': {
    label: 'Jawa Tengah',
    color: 'bg-yellow-500',
    description: 'Siswa dari Provinsi Jawa Tengah'
  },
  'yogyakarta': {
    label: 'Yogyakarta',
    color: 'bg-orange-500',
    description: 'Siswa dari Daerah Istimewa Yogyakarta'
  },
  'jawa-timur': {
    label: 'Jawa Timur',
    color: 'bg-teal-500',
    description: 'Siswa dari Provinsi Jawa Timur'
  }
};

