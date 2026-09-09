import {
    componentWrapperDecorator,
    moduleMetadata,
    Meta,
    StoryObj
} from '@storybook/angular';

import {
    DisplayModeWrapperComponent,
    displayModeWrapperStory
} from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';

import {
    DeviceViewComponent,
    DesktopViewDirective,
    MobileViewDirective
} from '../device-view/device-view.component';

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
                MatIconModule,
                MatTooltipModule,
                MatRippleModule,

            ],
            declarations: [
                ButtonComponent,
                IconComponent,
                DisplayModeWrapperComponent,
                DeviceViewComponent,
                DesktopViewDirective,
                MobileViewDirective
            ]
        }),
        componentWrapperDecorator(
            story => `
                <ng-container *rerender="displayMode">
                    <display-mode-wrapper
                        [displayMode]="displayMode"
                        [useWidth]="useWidth"
                        [width]="width"
                    >
                        ${story}
                    </display-mode-wrapper>
                </ng-container>
            `
        )
    ],

    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<MenuComponent>;

export const Primary: Story = {
    argTypes: {

    ...displayModeWrapperStory.argTypes

    },
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
        ...displayModeWrapperStory.args,
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