import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test/setup.js",
    coverage: {
      provider: "istanbul",
      reporter: ["html"],
      reportsDirectory: "./coverage",
    },
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.js"),
      name: "MenuSelect",
      fileName: "menu-select",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "React-dom",
        },
      },
    },
  },
});
