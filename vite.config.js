import { defineConfig } from 'vite'
import react from '@vitejs/react-swc' // or '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AI-Resume-Portfolio-Builder-/', // 👈 ADD THIS LINE WITH YOUR REPO NAME
})
