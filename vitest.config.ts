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
                'src/main.tsx', // we don't need to test the entrypoint
                'src/routes.ts', // we can't test the routes directly
                'src/**/*.d.ts', // we can't test .d.ts files, which are generated
            ]
        }
    },
}));
