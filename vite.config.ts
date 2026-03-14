import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.VITE_WHATSAPP_API_KEY || "";

  return {
  server: {
    host: "::",
    port: 5175,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/whatsapp": {
        target: "https://soboapi.cpass.co.in",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/whatsapp/, "/v3/336425076224393"),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq: { setHeader: (k: string, v: string) => void }) => {
            proxyReq.setHeader("apikey", apiKey);
          });
        },
      },
    } as Record<string, import("vite").ProxyOptions>,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
