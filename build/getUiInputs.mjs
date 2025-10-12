import { statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import console from 'node:console';

export function getUiInputs(uiDir, uiEntryPointList) {
  const inputs = {};
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
      const sveltePath = join(itemPath, 'index.ts');
      if (statSync(sveltePath).isFile()) {
        inputs[`ui/${dir}/index`] = itemPath;
      } else {
        console.error(`Error: Missing 'index.ts' in '${itemPath}'. Build failed.`);
        process.exit(1);
      }
    } catch (error) {
      console.error(`Error processing ${dir}:`, error.message);
      process.exit(1);
    }
  }
  return inputs;
}
