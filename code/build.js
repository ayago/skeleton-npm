import { build } from 'esbuild';
import { clean } from 'esbuild-plugin-clean';

await build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  format: 'cjs',
  outfile: './dist/index.cjs',
  plugins: [
    clean({
      patterns: ['./dist/*'],
      cleanOnStartPatterns: ['./prepare'],
      cleanOnEndPatterns: ['./post'],
    }),
  ],
});