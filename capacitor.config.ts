import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlantisdev.biizdriver',
  appName: 'BIIZ Driver',
  webDir: 'dist/biiz-lux-driver-app',
  server: {
    androidScheme: 'http'
  }
};

export default config;
