import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.biodatasiswa.app',
  appName: 'com.biodatasiswa.app',
  webDir: 'dist',
  server: {
    // 👇 INI YANG BIKIN "MIXED CONTENT" ILANG
    // Kita paksa aplikasi jalan pake HTTP biar sama kayak backend
    androidScheme: 'http',
    cleartext: true
  }
};

export default config;