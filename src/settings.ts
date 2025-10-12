export const EXTENSION_NAME = process.env.EXTENSION_NAME || 'MxExtensionTemplateSvelte';

export enum UIEntryPoints {
    Dialog = 'dialog'
}

export const uiEntryPointList = Object.values(UIEntryPoints);

export default UIEntryPoints;
