import {
    Meta,
    StoryObj,
    moduleMetadata
} from '@storybook/angular';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MenuComponent } from './menu.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

const meta: Meta<MenuComponent> = {
    title: 'Menu',
    component: MenuComponent,

    decorators: [

        moduleMetadata({
            imports: [
                MatIconModule
            ],
            declarations: [
                ButtonComponent,
                IconComponent
            ]
        })
    ],

    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<MenuComponent>;

export const Primary: Story = {
    render: args => ({
        props: args,
        template: `
            <nrcl-menu [items]="items">

                <nrcl-button secondary>
                    Menu
                </nrcl-button>

            </nrcl-menu>
        `
    }),
    args: {
        items: [
            {
                label: 'Home',
                icon: 'home'
            },
            {
                label: 'Download Data',
                icon: 'get_app'
            },
            {
                label: 'Weather Station List',
                icon: 'format_list_bulleted'
            },
            {
                label: 'Graph QL and API',
                icon: 'control_camera'
            },
            {
                label: 'MCP Server',
                icon: 'mcp-server'
            },
            {
                label: 'Data Information',
                icon: 'info'
            },
            {
                label: 'Disclaimer'
            },
            {
                label: 'Privacy'
            },
            {
                label: 'Copyright'
            }
        ]
    }
};