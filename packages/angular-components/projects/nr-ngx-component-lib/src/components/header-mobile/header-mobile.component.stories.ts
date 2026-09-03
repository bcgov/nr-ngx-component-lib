import {
    componentWrapperDecorator,
    moduleMetadata,
    Meta,
    StoryObj
} from "@storybook/angular";

import { MatButtonModule } from "@angular/material/button";

import { HeaderMobileComponent } from "./header-mobile.component";
import { ButtonComponent } from "../button/button.component";

const meta: Meta<HeaderMobileComponent> = {
    title: "Header (Mobile)",
    component: HeaderMobileComponent,

    decorators: [
        moduleMetadata({
            imports: [
                MatButtonModule
            ],
            declarations: [
                ButtonComponent
            ]
        }),

        componentWrapperDecorator(
            story => `
                <div style="max-width: 430px; ">
                    ${story}
                </div>
            `
        )
    ],

    tags: ["autodocs"],

    args: {
        siteTitle: "Wildfire DataMart",
        homeUrl: "/",
        skipLinksEnabled: true,
        skipLinkTarget: "main-content"
    }
};

export default meta;

type Story = StoryObj<HeaderMobileComponent>;

export const Primary: Story = {
    render: args => ({
        props: args,
        template: `
            <nrcl-header-mobile
                [siteTitle]="siteTitle"
                [homeUrl]="homeUrl"
                [skipLinksEnabled]="skipLinksEnabled"
                [skipLinkTarget]="skipLinkTarget"
            >
            </nrcl-header-mobile>

            <main id="main-content">
                <p>
                    Mobile header example with scrollable content.
                </p>
            </main>
        `
    })
};

export const WithMenu: Story = {
    render: args => ({
        props: args,
        template: `
            <nrcl-header-mobile
                [siteTitle]="siteTitle"
                [homeUrl]="homeUrl"
                [skipLinksEnabled]="skipLinksEnabled"
                [skipLinkTarget]="skipLinkTarget"
            >
                <nrcl-button action>
                    ☰
                </nrcl-button>
            </nrcl-header-mobile>

            <main id="main-content">
                <p>
                    Placeholder menu button for future
                    navigation-menu component implementation.
                </p>
            </main>
        `
    })
};