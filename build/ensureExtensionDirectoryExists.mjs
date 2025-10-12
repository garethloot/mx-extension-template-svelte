import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';

export async function ensureExtensionDirectoryExists(appDir, extensionDirectoryName) {
  if (appDir.trim() !== '' && existsSync(appDir)) {
    const extDir = `${appDir}/${extensionDirectoryName}`;

    if (!existsSync(extDir)) {
      await fs.mkdir(extDir);
    }

    return extDir;
  }
}