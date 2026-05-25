/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export para hospedar no Cloudflare Pages (sem servidor Node).
  output: "export",
  images: {
    // O otimizador de imagens do Next exige um servidor; no export estático
    // as imagens são servidas como estão.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};
export default nextConfig;
