import { mount, type Component } from 'svelte';
import { ComponentContext, IComponent } from '@mendix/extensions-api';
import { injectGlobalStyle } from './injectGlobalStyle';
import '$ui/style.css';

export function createUIEntryPointComponentFromSvelte<TProps extends Record<string, unknown>>(
    Component: Component<TProps>,
    initProps: (
        searchParams: URLSearchParams,
        componentContext: ComponentContext
    ) => Promise<TProps>
): IComponent {
    return {
        loaded: async (componentContext: ComponentContext) => {
            injectGlobalStyle('assets/style.css');
            const searchParams = new URLSearchParams(location.search);
            const target = document.getElementById('root');
            if (target)
                mount(Component, {
                    target,
                    props: await initProps(searchParams, componentContext)
                });
        }
    };
}
