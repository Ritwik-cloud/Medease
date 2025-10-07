import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  //  server: {
  //   proxy: {
  //     '/api': 'https://online-appointment-booking-for-doctors.onrender.com'
  //   }
  // }
});

