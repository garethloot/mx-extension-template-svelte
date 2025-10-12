import { IComponent, getStudioProApi } from '@mendix/extensions-api';
import { EXTENSION_NAME, UIEntryPoints } from '../settings';

const menuId = `${EXTENSION_NAME}.showModalDialog`;
const componentName = `extension/${EXTENSION_NAME}`;

export const component: IComponent = {
    async loaded(componentContext) {
        const studioPro = await getStudioProApi(componentContext);

        // Add a menu item to the Extensions menu
        await studioPro.ui.extensionsMenu.add({
            menuId: menuId,
            caption: 'Show modal dialog'
        });

        // Open a modal dialog when the menu item is clicked
        studioPro.ui.extensionsMenu.addEventListener('menuItemActivated', async (args) => {
            if (args.menuId === menuId) {
                const result = await studioPro.ui.dialogs.showModal(
                    {
                        title: 'Modal Dialog',
                        contentSize: { height: 170, width: 400 }
                    },
                    {
                        componentName: componentName,
                        uiEntrypoint: UIEntryPoints.Dialog,
                        queryParams: { message: 'Hello from main/index.ts!' }
                    }
                );

                if (result !== null)
                    await studioPro.ui.messageBoxes.show('info', JSON.stringify(result));
            }
        });
    }
};
