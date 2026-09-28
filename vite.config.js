import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { pathToFileURL } from "url"
import tailwindcss from '@tailwindcss/vite'

// Dev-only: serve the Vercel function at /api/chat from `npm run dev`, so the AI
// agent works locally (e.g. against Ollama) without the Vercel CLI. Production
// still runs api/chat.js as a Vercel serverless function.
function localApi(env) {
  return {
    name: 'local-api-chat',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, env)
      server.middlewares.use('/api/chat', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        req.body = raw
        res.status = (code) => { res.statusCode = code; return res }
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
          return res
        }
        const mod = await import(pathToFileURL(path.resolve(__dirname, 'api/chat.js')).href)
        await mod.default(req, res)
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), localApi(loadEnv(mode, process.cwd(), ''))],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // Vendor code changes rarely — separate chunks stay cached across deploys.
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap', '@gsap/react'],
          icons: ['lucide-react'],
        },
      },
    },
  },
}))
