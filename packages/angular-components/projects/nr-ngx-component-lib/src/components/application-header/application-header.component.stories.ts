import {
    componentWrapperDecorator,
    Meta,
    moduleMetadata,
    StoryObj
} from "@storybook/angular";
import {
    DisplayModeWrapperComponent,
    displayModeWrapperStory
} from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import {
    DesktopViewDirective,
    DeviceViewComponent,
    MobileViewDirective
} from '../device-view/device-view.component';
import { IconComponent } from '../icon/icon.component';
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { loremIpsum } from "projects/nr-ngx-component-lib/story-util";
import { ButtonComponent } from "../button/button.component";
import { ApplicationHeaderComponent } from "./application-header.component";
import { ApplicationMenuComponent } from "../application-menu/application-menu.component";

const meta: Meta<ApplicationHeaderComponent> = {
    title: "Application Header",
    component: ApplicationHeaderComponent,

    decorators: [
        moduleMetadata({
            imports: [
                MatButtonModule,
                MatIconModule,
                MatRippleModule,
                MatTooltipModule
            ],
            declarations: [
                ButtonComponent,
                ApplicationMenuComponent,
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

    tags: ["autodocs"],

    parameters: {
        docs: {
            description: {
                component: `
BC Wildfire Service application header based on the BC Government Design System.

## Features

- BC Wildfire Service logo
- Site title
- Responsive layout
- Accessible skip link
- Keyboard accessible logo
- Content projection for actions
- Non-sticky header

## Usage

\`\`\`html
<nrcl-application-header
    title="Wildfire DataMart"
>
    
     
</nrcl-application-header>
\`\`\`
`
            }
        }
    },
};

export default meta;

type Story = StoryObj<ApplicationHeaderComponent>;

export const Primary: Story = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        clickLogo: { action: 'clickLogo' },
        clickSkip: { action: 'clickSkip' }
    },
    args: {
        ...displayModeWrapperStory.args,
        title: 'Wildfire DataMart',
        // homeUrl: '/',
        // skipLinksEnabled: true,
        // skipLinkTarget: 'main-content',
        skipLabel: 'Skip to main content',
        logoAriaLabel: 'BC Wildfire Service logo',
        // showMenu: true,
        // menuTrigger: {
            // label: 'Menu',
            // icon: 'menu'
        // },

        // menuItems: [
        //     {
        //         label: 'Home',
        //         icon: 'home-outline'
        //     },
        //     {
        //         label: 'Download Data',
        //         icon: 'get_app'
        //     },
        //     {
        //         label: 'Weather Station List',
        //         icon: 'format_list_bulleted'
        //     },
        //     {
        //         label: 'Graph QL and API',
        //         icon: 'control_camera'
        //     },
        //     {
        //         label: 'MCP Server',
        //         icon: 'mcp-server'
        //     },
        //     {
        //         label: 'Data Information',
        //         icon: 'info'
        //     },
        //     {
        //         label: 'Disclaimer'
        //     },
        //     {
        //         label: 'Privacy'
        //     },
        //     {
        //         label: 'Copyright'
        //     }
        // ]
    },
    render: args => ({
        props: args,
        template: `
            <nrcl-application-header
                [title]="title"
                [skipLabel]="skipLabel"
                [logoAriaLabel]="logoAriaLabel"
                (clickLogo)="clickLogo()"
                (clickSkip)="clickSkip()"
            >
                <nrcl-application-menu>

                </nrcl-application-menu>
            </nrcl-application-header>

            <main id="main-content">
                <p>${ loremIpsum }</p>
                <p>${ loremIpsum }</p>
                <p>${ loremIpsum }</p>
            </main>
        `
    })
};

