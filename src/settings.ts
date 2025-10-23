export const EXTENSION_NAME = import.meta?.env?.VITE_EXTENSION_NAME || 'MxExtensionTemplateSvelte';

export enum UIEntryPoints {
    Dialog = 'dialog'
}

export const uiEntryPointList = Object.values(UIEntryPoints);

export default UIEntryPoints;
