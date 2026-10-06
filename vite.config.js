import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/team-directory/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
