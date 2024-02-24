/// <reference types="vitest" /> 
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(viteConfig, defineConfig({
    test: {
        environment: 'happy-dom',
        coverage: {
            include: [
                'src/**/*.{ts,tsx}',
            ],
            exclude: [
                'src/data/repository/**/*', // repository di uji di integration test
                'src/domain/entities/**/*', // entities selalu dicover oleh test lain
                'src/domain/repository/**/*', // hanya ada interface
                'src/main.tsx', // tidak perlu di cover, karena hanya bootstrap
                'src/routes.ts', // tidak perlu di cover, karena hanya bootstrap
                'src/**/types.ts', // tidak perlu di cover, karena hanya tipe
                'src/**/*.d.ts', // tidak perlu menguji file .d.ts, karena hanya tipe yang di generate
            ]
        }
    },
}));
