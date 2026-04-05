import path from "path";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ❌ REMOVED: cloudflare import

function devClientErrorLogger() {
  const VIRTUAL_ID = "virtual:dev-client-error-handler";
  const RESOLVED_ID = "\0" + VIRTUAL_ID;

  return {
    name: "dev-client-error-logger",
    apply: "serve" as const,
    enforce: "pre" as const,

    resolveId(id: string) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id: string) {
      if (id !== RESOLVED_ID) return;
      return [
        "if (typeof window !== 'undefined' && import.meta.hot) {",
        "  const send = (d) => { try { import.meta.hot.send('client-runtime-error', d) } catch {} };",
        "  window.addEventListener('error', (e) => {",
        "    send({ type: 'runtime-error', message: e.message, stack: e.error?.stack, filename: e.filename, lineno: e.lineno, colno: e.colno });",
        "  });",
        "  window.addEventListener('unhandledrejection', (e) => {",
        "    const err = e.reason;",
        "    send({ type: 'unhandled-rejection', message: err?.message || String(err), stack: err?.stack });",
        "  });",
        "}",
      ].join("\n");
    },

    configureServer(server: import("vite").ViteDevServer) {
      const origConsoleError = console.error;
      let forwarding = false;
      console.error = (...args: unknown[]) => {
        origConsoleError.apply(console, args);
        if (forwarding) return;
        forwarding = true;
        try {
          const error = args[0];
          if (error instanceof Error) {
            server.ws.send({
              type: "custom",
              event: "client-runtime-error",
              data: {
                source: "ssr",
                type: "ssr-render-error",
                name: error.name,
                message: error.message,
                stack: error.stack,
              },
            });
          }
        } finally {
          forwarding = false;
        }
      };

      server.ws.on("client-runtime-error", (data: Record<string, string>) => {
        const { type, message, stack, filename, lineno, colno } = data;

        let loc = "";
        if (filename) {
          loc = ` at ${filename}`;
          if (lineno != null) loc += `:${lineno}`;
          if (colno != null) loc += `:${colno}`;
        }

        server.config.logger.error(
          `\n[client] ${message}${loc}`,
        );

        if (stack) {
          server.config.logger.error(stack);
        }

        server.ws.send({
          type: "custom",
          event: "client-runtime-error",
          data,
        });
      });
    },

    transform(code: string, id: string) {
      const normalizedId = id.replace(/\\/g, "/");

      if (normalizedId.includes("routes/__root")) {
        return `import "${VIRTUAL_ID}";\n${code}`;
      }
    },
  };
}

function devServerFnErrorLogger() {
  return {
    name: "dev-server-fn-error-logger",
    apply: "serve" as const,
    enforce: "pre" as const,
  };
}

export default defineConfig(({ mode }) => {
  // ❌ REMOVED: Cloudflare logic

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
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },

    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      devClientErrorLogger(),
      devServerFnErrorLogger(),

      // ✅ ONLY THIS (no cloudflare)
      tanstackStart(),
      viteReact(),
    ],
  };
});