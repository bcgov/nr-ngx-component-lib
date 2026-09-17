import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    componentWrapperDecorator,
    Meta,
    moduleMetadata,
    StoryObj
} from '@storybook/angular';
import {
    displayModeWrapperStory
} from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ApplicationMenuComponent } from './application-menu.component';
import { ApplicationComponent } from "../application/application.component";

const meta: Meta<ApplicationMenuComponent> = {
    title: 'Application Menu',
    component: ApplicationMenuComponent,

    decorators: [
        moduleMetadata({
            imports: [
                MatIconModule,
                MatTooltipModule,
                MatRippleModule,
                MatMenuModule,
            ],
            declarations: [
                ButtonComponent,
                IconComponent,
                ApplicationComponent,
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

type Story = StoryObj<ApplicationMenuComponent>;

export const Primary: Story = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        itemClick: { action: 'itemClick' }
    },
    args: {
        ...displayModeWrapperStory.args,
        items: [
            {
                id: 'home',
                label: 'Home',
                icon: 'home-outline'
            },
            {
                id: 'download',
                label: 'Download Data',
                icon: 'get_app'
            },
            {
                id: 'list',
                label: 'Weather Station List',
                icon: 'format_list_bulleted'
            },
            {
                id: 'graph',
                label: 'Graph QL and API',
                icon: 'control_camera'
            },
            {
                id: 'server',
                label: 'MCP Server',
                icon: 'mcp-server'
            },
            {
                id: 'data',
                label: 'Data Information',
                icon: 'info'
            },
            {
                id: 'disclaimer',
                label: 'Disclaimer'
            },
            {
                id: 'privacy',
                label: 'Privacy'
            },
            {
                id: 'copyright',
                label: 'Copyright'
            }
        ],
        label: 'Menu'
    },
    render: args => ({
        props: args,
        template: `
            <nrcl-application>
                <nrcl-application-menu 
                    [label]="label"
                    [items]="items"
                    (itemClick)="itemClick( $event )"
                ></nrcl-application-menu>
            </nrcl-application>
        `
    }),
};