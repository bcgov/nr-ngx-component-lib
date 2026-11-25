import {
    componentWrapperDecorator,
    Meta,
    moduleMetadata,
    StoryObj
} from "@storybook/angular";
import { loremIpsum } from "projects/nr-ngx-component-lib/story-util";
import {
    displayModeWrapperStory
} from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { ApplicationHeaderComponent } from "../application-header/application-header.component";
import { ApplicationMenuComponent } from "../application-menu/application-menu.component";
import { ApplicationComponent } from "./application.component";

const meta: Meta<ApplicationComponent> = {
    title: 'Navigation and Structure/Application',
    component: ApplicationComponent,

    decorators: [
        moduleMetadata({
            imports: [
                ApplicationHeaderComponent,
                ApplicationMenuComponent,
            ],
        }),

        componentWrapperDecorator(
            story => `
                <ng-container *rerender="displayMode">
                    <display-mode-wrapper 
                        bodyPadding="0"
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

};

export default meta;

type Story = StoryObj<ApplicationComponent>;

export const Primary: Story = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
    },
    render: args => ({
        // nrcl-application fills the viewport; on the docs page that's the whole docs frame,
        // so give the inline example a fixed height instead.
        styles: [ `
            :host-context( .docs-story ) nrcl-application {
                height: 480px;
            }
        ` ],
        props: {
            ...args,
            menuItems: [
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

        },
        template: `
            <nrcl-application>
                <nrcl-application-header
                    title="Wildfire DataMart"
                    skipLabel="Skip to main content"
                    logoAriaLabel="BC Wildfire Service logo"
                >
                    <nrcl-application-menu
                        label="Menu"
                        [items]="menuItems"
                    ></nrcl-application-menu>
                </nrcl-application-header>

                <p>${ loremIpsum }</p>
                <p>${ loremIpsum }</p>
                <p>${ loremIpsum }</p>
            </nrcl-application>
        `
    })
};

