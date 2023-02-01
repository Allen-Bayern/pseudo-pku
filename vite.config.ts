import { resolve } from 'path';
import { defineConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command } : ConfigEnv) => ({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        }
    },
    plugins: [
        react(),
        viteMockServe({
            mockPath: 'mock',
            supportTs: true,
            localEnabled: command === 'serve',
        }),
    ],
    server: {
        port: 4899,
    }
}));
