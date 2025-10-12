import { statSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import console from 'node:console';
import fs from 'node:fs/promises';
import { uiEntryPointList } from '../src/settings.ts';

export function generateManifest() {
  const uiEntries = {};
  const uiDir = 'src/ui';
  const directories = readdirSync(uiDir).filter((item) =>
    statSync(join(uiDir, item)).isDirectory()
  );

  for (const dir of directories) {
    if (!uiEntryPointList.includes(dir)) {
      console.error(
        `Error: Directory '${dir}' in '${uiDir}' does not match any entry in uiEntryPointList. Build failed.`
      );
      process.exit(1);
    }
    const itemPath = join(uiDir, dir);
    try {
      const indexPath = join(itemPath, 'index.ts');
      if (statSync(indexPath).isFile()) {
        uiEntries[dir] = `ui/${dir}/index.js`;
      } else {
        console.error(`Error: Missing 'index.ts' in '${itemPath}'. Build failed.`);
        process.exit(1);
      }
    } catch (error) {
      console.error(`Error processing ${dir}:`, error.message);
      process.exit(1);
    }
  }

  return {
    mendixComponent: {
      entryPoints: {
        main: 'main.js',
        ui: uiEntries
      }
    }
  };
}

export const generateManifestJson = (outDir) => ({
  name: 'copy-manifest',
  writeBundle: async () => {
    const manifest = generateManifest();
    try {
      await fs.mkdir(outDir, { recursive: true });
      writeFileSync(`${outDir}/manifest.json`, JSON.stringify(manifest, null, 2));
    } catch (error) {
      console.error('Error generating manifest', error);
    }
  }
});
