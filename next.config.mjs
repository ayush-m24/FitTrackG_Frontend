/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,  //PWA is enabled in all environments (production/development)
  workboxOptions: {
    disableDevLogs: true,
  }

});



const nextConfig = {};

export default withPWA(nextConfig);
