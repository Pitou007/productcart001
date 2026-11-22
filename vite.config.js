import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repository = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : ''
const isUserSite = repository.endsWith('.github.io')
const base =
  process.env.GITHUB_ACTIONS && repository && !isUserSite
    ? `/${repository}/`
    : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
