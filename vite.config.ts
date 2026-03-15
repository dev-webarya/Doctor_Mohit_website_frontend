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
  plugins: [
    react(),
    {
      name: "upload-prescription",
      configureServer(server) {
        server.middlewares.use("/api/upload-prescription", (req, res) => {
          if (req.method !== "POST") {
            res.writeHead(405);
            res.end();
            return;
          }
          const chunks: Buffer[] = [];
          req.on("data", (chunk: Buffer) => chunks.push(chunk));
          req.on("end", () => {
            const body = Buffer.concat(chunks).toString("utf8");
            let json: { pdfBase64?: string; filename?: string };
            try {
              json = JSON.parse(body) as { pdfBase64?: string; filename?: string };
            } catch {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ ok: false, error: "Invalid JSON" }));
              return;
            }
            const { pdfBase64, filename } = json;
            if (!pdfBase64) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ ok: false, error: "Missing pdfBase64" }));
              return;
            }
            const buffer = Buffer.from(pdfBase64, "base64");
            const formData = new FormData();
            formData.append("file", new Blob([buffer], { type: "application/pdf" }), filename || "prescription.pdf");
            fetch("https://file.io", { method: "POST", body: formData })
              .then((r) => r.json())
              .then((data: { success?: boolean; link?: string }) => {
                if (data.success && data.link) {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ ok: true, url: data.link }));
                } else {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ ok: false, error: "Upload failed" }));
                }
              })
              .catch((e) => {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ ok: false, error: (e as Error).message }));
              });
          });
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
