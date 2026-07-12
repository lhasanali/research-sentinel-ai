import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    return ({
        base: mode === 'production' ? '/research-sentinel-ai/' : '/',
        plugins: [
            react(),
            VitePWA({
                registerType: 'autoUpdate',
                injectRegister: 'auto',
                includeAssets: ['favicon.svg', 'icon.svg', 'robots.txt'],
                manifest: {
                    name: 'مختبر الذكاء – Hasan Al-Yasiri Technology Lab',
                    short_name: 'مختبر الذكاء',
                    description: 'Vocational learning platform for networking, cybersecurity, hardware, and operating systems.',
                    theme_color: '#0f172a',
                    background_color: '#020617',
                    display: 'standalone',
                    scope: '/research-sentinel-ai/',
                    start_url: '/research-sentinel-ai/',
                    icons: [
                        {
                            src: './icon.svg',
                            sizes: 'any',
                            type: 'image/svg+xml',
                            purpose: 'any',
                        },
                        {
                            src: './icon.svg',
                            sizes: '192x192',
                            type: 'image/svg+xml',
                            purpose: 'maskable',
                        },
                    ],
                },
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            host: '0.0.0.0',
            port: 5173,
        },
        preview: {
            host: '0.0.0.0',
            port: 4173,
        },
    });
});
