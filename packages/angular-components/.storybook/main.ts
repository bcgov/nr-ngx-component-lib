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
    }
};
export default config;