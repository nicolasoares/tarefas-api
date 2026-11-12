import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: { NODE_ENV: 'test' },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/server.js'],
      // Coverage mínimo declarado: se cair abaixo disso, o CI falha.
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
    },
  },
});
