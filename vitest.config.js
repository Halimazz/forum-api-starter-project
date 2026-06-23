import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    fileParallelism: false,
    maxConcurrency: 1,
    setupFiles: ['dotenv/config'],
  },
});