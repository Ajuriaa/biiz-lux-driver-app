import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlantisdev.biizdriver',
  appName: 'BIIZ Driver',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // url: "http://192.168.0.7:5173/"
  },
  plugins: {
    CapacitorCookies: {
      enabled: true
    }
  }
};

export default config;
