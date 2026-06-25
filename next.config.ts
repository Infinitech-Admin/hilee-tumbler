import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  
  // Hide readable source maps 
  productionBrowserSourceMaps: false,
  
  swcMinify: true,
  
  // 📦 Increase API body size limit for file uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  
  // 🔐 Add extra security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 🔒 HSTS - Force HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains"
          },
          
          // 🔒 Clickjacking protection
          { 
            key: "X-Frame-Options", 
            value: "SAMEORIGIN" 
          },
          
          // 🔒 Prevent MIME sniffing
          { 
            key: "X-Content-Type-Options", 
            value: "nosniff" 
          },
          
          // 🔒 Referrer policy
          { 
            key: "Referrer-Policy", 
            value: "strict-origin-when-cross-origin"
          },
          
          // 🔒 XSS Protection
          {
            key: "X-XSS-Protection",
            value: "0"
          },
          
          // 🔒 Feature restrictions
          { 
            key: "Permissions-Policy", 
            value: "camera=(), microphone=(), geolocation=()"
          },
          
          // 🔒 Content Security Policy - FIXED FOR VIDEO
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              
              // API connections
              "connect-src 'self' https://infinitech-api16.site http://localhost:8000 https://*.googleapis.com https://*.google.com",
              
              // Scripts
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.google.com https://*.gstatic.com https://cdnjs.cloudflare.com",
              
              // Styles
              "style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com",
              
              // Fonts
              "font-src 'self' data: https://*.gstatic.com",
              
              // Images - Allow all sources
              "img-src * blob: data:",
              
              // 🎥 VIDEO/AUDIO - THIS WAS MISSING!
              "media-src 'self' blob: data: https://infinitech-api16.site http://localhost:8000",
              
              // Frames - For Google Translate and Maps
              "frame-src https://*.google.com https://*.googleapis.com",
              
              // Object/Embed restrictions
              "object-src 'none'",
              
              // Base URI restriction
              "base-uri 'self'",
              
              // Form action restriction
              "form-action 'self'",
              
              // Upgrade insecure requests
              "upgrade-insecure-requests"
            ].join("; ") + ";",
          },
        ],
      },
      // API routes specific headers with larger body size
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Length-Limit",
            value: "10485760" // 10MB in bytes
          }
        ],
      },
    ];
  },
};

export default nextConfig;
