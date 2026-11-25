import type { StorybookConfig } from '@storybook/angular';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
    "stories": [
        "../projects/nr-ngx-component-lib/src/**/*.mdx",
        "../projects/nr-ngx-component-lib/src/**/*.stories.ts",
    ],    
    "addons": [
        {
            name: "@storybook/addon-docs",
            options: {
                // GitHub-flavoured markdown, so tables in .mdx files render
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [ remarkGfm ],
                    },
                },
            },
        },
    ],
    "framework": {
        "name": "@storybook/angular",
        "options": {}
    },
    "staticDirs": [
        { 
            from: "../projects/nr-ngx-component-lib/src/styles", 
            to: "/styles" 
        },
        {
            from: "../projects/nr-ngx-component-lib/src/assets",
            to: "/assets"
        }
    ],
    core: {
        enableCrashReports: false
    },
    webpackFinal: async ( config ) => {
        // @storybook/angular 10 imports ɵgetComponentDef, which only exists in Angular 19+.
        // On Angular 18 the call is wrapped in try/catch and storybook falls back to the
        // @Input/@Output decorator metadata, so the missing export is harmless here.
        config.ignoreWarnings = [
            ...( config.ignoreWarnings ?? [] ),
            { module: /@storybook[\\/]angular/, message: /ɵgetComponentDef/ },
        ]
        return config
    }
};
export default config;