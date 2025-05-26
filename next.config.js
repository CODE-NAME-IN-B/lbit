/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // السماح بالوصول من الأجهزة الأخرى على الشبكة المحلية
  experimental: {
    // تكوين السماح بالوصول من الأجهزة الأخرى
    allowedDevOrigins: [
      // السماح بالوصول من 192.168.1.4
      "192.168.1.4",
      // يمكنك أيضًا السماح بنطاق كامل من العناوين
      "192.168.1.0/24",
      // السماح بالوصول من 192.168.56.215
      "192.168.56.215"
    ],
  },
  output: 'export',
}

module.exports = nextConfig
