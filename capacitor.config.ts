import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.140bf5d25bdb4168b8110b9770276099',
  appName: 'toon-time-trio',
  webDir: 'dist',
  server: {
    url: 'https://140bf5d2-5bdb-4168-b811-0b9770276099.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#280C65',
      showSpinner: false
    }
  }
};

export default config;