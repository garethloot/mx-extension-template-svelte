import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';

export async function copyExtensionAssetsToApplication(appExtensionDirPath, outDir) {
  const extensionName = outDir.split('/').pop();
  const deployedExtensionPath = `${appExtensionDirPath}/${extensionName}`;

  if (existsSync(deployedExtensionPath)) {
    await fs.rm(deployedExtensionPath, { recursive: true, force: true });
  }

  await fs.mkdir(deployedExtensionPath);
  await fs.cp(outDir, deployedExtensionPath, { recursive: true });
}
