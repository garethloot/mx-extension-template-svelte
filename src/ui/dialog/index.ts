import Dialog from './Dialog.svelte';
import { createUIEntryPointComponentFromSvelte } from '$lib/ui-helpers/createUIEntryPointComponentFromSvelte';

export const component = createUIEntryPointComponentFromSvelte(Dialog, async (searchParams) => {
    const message = searchParams.get('message') || 'No message provided';
    return { message };
});
