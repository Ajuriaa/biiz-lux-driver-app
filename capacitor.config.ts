import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlantisdev.biizdriver',
  appName: 'BIIZ Driver',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    CapacitorCookies: {
      enabled: true
    }
  }
};

export default config;
