/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Prevent clickjacking — stops the site being embedded in iframes on other domains
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stop browsers guessing content types (prevents MIME-type attacks)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Don't send the full URL as referrer to third-party sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable access to sensitive device APIs
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Force HTTPS for 1 year
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Basic XSS protection for older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
