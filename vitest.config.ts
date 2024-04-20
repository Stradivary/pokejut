/// <reference types="vitest" /> 
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(viteConfig, defineConfig({
    test: {
        environment: 'happy-dom',
        setupFiles: "./tests/setupTest.ts",
        coverage: {

            reporter: ['text', 'clover', 'json', 'html-spa', 'html', 'lcov'],
            include: [
                'src/**/*.{ts,tsx}',
            ],
            exclude: [
                'src/domain/use-cases/simulator/presistor.ts', // presistor merupakan wrapper dari idb keyval, tidak perlu di test
                // 'src/presentation/**/*', // presentation layer di uji melalui e2e test  
                'src/data/entities/**/*', // entities tidak perlu di cover, hanya berisi tipe data 
                'src/main.tsx', // tidak perlu di cover, karena hanya bootstrap untuk react
                'src/routes.tsx', // tidak perlu di cover, karena hanya berisi definisi route
                'src/**/types.ts', // tidak perlu di cover, karena hanya tipe
                'src/**/*.d.ts', // tidak perlu menguji file .d.ts, karena hanya tipe yang di generate
            ]
        },
    },
}));
