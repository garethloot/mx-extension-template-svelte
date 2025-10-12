import { copyExtensionAssetsToApplication } from './copyExtensionAssestsToApplication.mjs';
import { ensureExtensionDirectoryExists } from './ensureExtensionDirectoryExists.mjs';
import console from 'node:console';

export const copyToAppPlugin = (appDir, outDir, extensionDirectoryName) => ({
  name: 'copy-to-app',
  writeBundle: async () => {
    const appExtensionDirPath = await ensureExtensionDirectoryExists(
      appDir,
      extensionDirectoryName
    );
    if (appExtensionDirPath) {
      await copyExtensionAssetsToApplication(appExtensionDirPath, outDir);
    } else {
      console.error('Could not find Mendix application directory:', appDir);
      console.info('Skipping copying the extension to application directory');
    }
  }
});
