import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlantisdev.biizdriver',
  appName: 'BIIZ Driver',
  webDir: 'dist/biiz-lux-driver-app',
  server: {
    androidScheme: 'http',
    url: 'http://192.168.1.13:4500/'
  },
  plugins: {
    CapacitorCookies: {
      "enabled": true
    }
  }
};

export default config;
