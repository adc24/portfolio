import path from "path";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
// Change this line:
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};

  for (const [key, value] of Object.entries(env)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    define: envDefine,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      TanStackRouterVite(),
      viteReact(),
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});