import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
    "stories": [
        "../projects/nr-ngx-component-lib/src/docs/**/*.mdx",
        "../projects/nr-ngx-component-lib/src/**/*.stories.ts",
    ],    
    "addons": ["@storybook/addon-docs"],
    "framework": {
        "name": "@storybook/angular",
        "options": {}
    },
    "staticDirs": [
        { 
            from: "../projects/nr-ngx-component-lib/src/styles", 
            to: "/styles" 
        }
    ],
    core: {
        enableCrashReports: false
    }
};
export default config;