import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
    "stories": [
        "../projects/**/*.mdx",
        "../projects/nr-ngx-component-lib/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],    
    "addons": [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
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