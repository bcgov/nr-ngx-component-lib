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
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ApplicationMenuComponent } from './application-menu.component';
import { MatMenuModule } from '@angular/material/menu';

const meta: Meta<ApplicationMenuComponent> = {
    title: 'Application Menu',
    component: ApplicationMenuComponent,

    decorators: [

        moduleMetadata({
            imports: [
                MatIconModule,
                MatTooltipModule,
                MatRippleModule,
                MatMenuModule
            ],
            declarations: [
                ButtonComponent,
                IconComponent,
                // DisplayModeWrapperComponent,
                // DeviceViewComponent,
                // DesktopViewDirective,
                // MobileViewDirective
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
        ...displayModeWrapperStory.argTypes
    },
    args: {
        ...displayModeWrapperStory.args,
        items: [
            {
                label: 'Home',
                icon: 'home-outline'
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
    },
    render: args => ({
        props: args,
        template: `
            <nrcl-application-menu 
                label="Menu"
                [items]="items"
            ></nrcl-application-menu>
        `
    }),
};