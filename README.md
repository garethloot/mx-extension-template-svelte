# MX Extension Template - Svelte

A modern template for building Mendix Studio Pro extensions using Svelte, TypeScript, and Vite.

## 🚀 Features

- **Svelte 5** - Modern reactive UI framework with runes
- **TypeScript** - Full type safety throughout the project
- **Vite** - Fast build tool with hot module replacement
- **ESLint & Prettier** - Code quality and formatting
- **Modular Architecture** - Clean separation of concerns
- **Hot Reload** - Fast development workflow
- **Extension API** - Full integration with Mendix Studio Pro

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Mendix Studio Pro (version 11.3.0 or higher)

## 🛠️ Installation

1. Clone this template:
   ```bash
   git clone <repository-url>
   cd mx-extension-template-svelte
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your specific settings
   ```

## 🏗️ Project Structure

```
src/
├── main/              # Extension entry point
│   └── index.ts       # Main extension logic
├── ui/                # UI components
│   └── dialog/        # Example dialog component
│       ├── Dialog.svelte
│       └── index.ts
├── lib/               # Shared utilities
│   └── ui-helpers/    # UI helper functions
└── settings.ts        # Extension configuration

build/                 # Build scripts and utilities
├── index.mjs         # Main build orchestrator
├── generateManifest.mjs
├── copyToAppPlugin.mjs
└── ...               # Other build utilities
```

## 🔧 Configuration

### Extension Settings

Configure your extension in `src/settings.ts`:

```typescript
export const EXTENSION_NAME = process.env.EXTENSION_NAME || 'MxExtensionTemplateSvelte';

export enum UIEntryPoints {
    Dialog = 'dialog'
}
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
EXTENSION_NAME=YourExtensionName
APP_DIR=/path/to/mendix/studio-pro/application
```

## 🚀 Development

### Available Scripts

- `npm run build` - Build the extension for production
- `npm run build:dev` - Build in watch mode for development
- `npm run check` - Run Svelte type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint

### Development Workflow

1. Start development mode:
   ```bash
   npm run build:dev
   ```

2. The extension will be built to `dist/[EXTENSION_NAME]/`

3. If `APP_DIR` is set, the extension will be automatically copied to Studio Pro

### Adding New UI Components

1. Create a new directory under `src/ui/`:
   ```
   src/ui/my-component/
   ├── MyComponent.svelte
   └── index.ts
   ```

2. Add the entry point to `src/settings.ts`:
   ```typescript
   export enum UIEntryPoints {
       Dialog = 'dialog',
       MyComponent = 'my-component'  // Add this
   }
   ```

3. Create the component export in `index.ts`:
   ```typescript
   import MyComponent from './MyComponent.svelte';
   import { createUIEntryPointComponentFromSvelte } from '$lib/ui-helpers/createUIEntryPointComponentFromSvelte';

   export const component = createUIEntryPointComponentFromSvelte(MyComponent, async (searchParams) => {
       // Extract props from URL search params
       return { /* props */ };
   });
   ```

## 🏛️ Architecture

### Main Extension Logic

The main extension logic is in `src/main/index.ts`. This is where you:
- Register menu items
- Handle Studio Pro events
- Open dialogs and UI components

### UI Components

UI components are Svelte components that can be displayed in Studio Pro dialogs. Each component:
- Lives in its own directory under `src/ui/`
- Has a corresponding entry in the `UIEntryPoints` enum
- Exports a `component` that integrates with the Mendix Extensions API

### Build System

The build system uses Vite with custom plugins to:
- Generate the extension manifest
- Bundle TypeScript and Svelte code
- Copy assets to the output directory
- Optionally deploy to Studio Pro

## 📦 Building for Production

1. Build the extension:
   ```bash
   npm run build
   ```

2. The built extension will be in `dist/[EXTENSION_NAME]/`

3. Copy this directory to your Mendix Studio Pro extensions folder

## 🔌 Mendix Studio Pro Integration

### Installing the Extension

1. Build the extension using `npm run build`
2. Copy the `dist/[EXTENSION_NAME]` folder to your Studio Pro extensions directory:
   - Windows: `%USERPROFILE%\.mendix\extensions\`
   - macOS: `~/.mendix/extensions/`
3. Restart Mendix Studio Pro
4. The extension will appear in the Extensions menu

### Extension Manifest

The build process automatically generates a `manifest.json` file with:
- Extension metadata
- Entry points for main logic and UI components
- Required Studio Pro version

## 🧪 Testing

Currently, this template doesn't include automated tests, but you can add:
- Unit tests with Vitest
- Component tests with Testing Library
- E2E tests with Playwright

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting: `npm run lint && npm run format`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Extension not appearing in Studio Pro:**
- Ensure the extension is built successfully
- Check that the manifest.json is generated correctly
- Verify the extension is in the correct directory
- Restart Studio Pro

**Build errors:**
- Check that all dependencies are installed
- Ensure TypeScript compilation passes: `npm run check`
- Verify environment variables are set correctly

**UI components not loading:**
- Check that UI entry points are registered in settings.ts
- Ensure component exports are correct
- Verify the component is built and included in the bundle

### Getting Help

- Check the [Mendix Extensions API documentation](https://docs.mendix.com/apidocs-mxsdk/apidocs/web-extensibility-api-11/)
- Review the TypeScript and Svelte documentation
- Check the project's issue tracker

## 🔄 Changelog

### v0.1.0
- Initial template with Svelte 5 support
- TypeScript configuration
- Vite build system
- Example dialog component
- Studio Pro integration