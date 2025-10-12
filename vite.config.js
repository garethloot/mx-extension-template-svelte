import path from 'node:path';
import process from 'node:process';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { generateManifestJson, copyToAppPlugin, getUiInputs } from './build/index.mjs';
import { uiEntryPointList, EXTENSION_NAME } from './src/settings.ts';

dotenv.config();

const extensionName = EXTENSION_NAME;
const outDir = `dist/${extensionName}`;
const appDir = process.env.APP_DIR;
const uiDir = 'src/ui';

const extensionDirectoryName = 'extensions';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({ emitCss: false }),
    generateManifestJson(outDir, uiEntryPointList),
    copyToAppPlugin(appDir, outDir, extensionDirectoryName)
  ],
  build: {
    outDir,
    target: 'es2023',
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: 'src/main/index.ts',
        ...getUiInputs(uiDir, uiEntryPointList)
      },
      external: ['@mendix/component-framework', '@mendix/model-access-sdk'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        format: 'es',
        exports: 'named',
        assetFileNames: 'assets/[name].[ext]'
      },
      preserveEntrySignatures: 'strict'
    }
  },
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      $ui: path.resolve('./src/ui'),
      $main: path.resolve('./src/main')
    }
  }
});
