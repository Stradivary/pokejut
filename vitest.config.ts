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
                'src/domain/entities/**/*', // we don't need to test entities
                'src/domain/repository/**/*', // we don't need to test repositories
                'src/main.tsx', // we don't need to test the entrypoint, as it's just a composition root
                'src/routes.ts', // we can't test the routes directly
                'src/**/*.d.ts', // we can't test .d.ts files, which are generated
            ]
        }
    },
}));
