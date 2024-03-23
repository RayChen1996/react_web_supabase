import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

// 載入 .env 檔案中的變數
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
