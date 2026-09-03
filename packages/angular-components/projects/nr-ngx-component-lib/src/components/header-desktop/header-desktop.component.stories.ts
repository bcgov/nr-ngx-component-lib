import {
    componentWrapperDecorator,
    moduleMetadata,
    Meta,
    StoryObj
} from "@storybook/angular";

import { MatButtonModule } from "@angular/material/button";

import { HeaderComponent } from "./header-desktop.component";
import { ButtonComponent } from "../button/button.component";

const meta: Meta<HeaderComponent> = {
    title: "Header (Desktop)",
    component: HeaderComponent,

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
                <div style="width:100%">
                    ${story}
                </div>
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
<nrcl-header-desktop
    siteTitle="Wildfire DataMart"
>
    
        Menu
    </nrcl-button>
</nrcl-header-desktop>
\`\`\`
`
            }
        }
    },

    args: {
        siteTitle: "Wildfire DataMart",
        homeUrl: "/"
    }
};

export default meta;

type Story = StoryObj<HeaderComponent>;

export const Primary: Story = {
    render: args => ({
        props: args,
        template: `
            <nrcl-header-desktop
                [siteTitle]="siteTitle"
                [homeUrl]="homeUrl"
                [skipLinksEnabled]="skipLinksEnabled"
                [skipLinkTarget]="skipLinkTarget"
            >
            </nrcl-header-desktop>

            <main id="main-content">
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor enim, lobortis quis sapien nec, gravida consectetur odio. Vestibulum condimentum rhoncus vehicula. Quisque efficitur tristique quam, a porttitor nunc tempor in. Curabitur dolor tortor, fermentum sit amet finibus eget, dapibus iaculis tortor. Ut eget sapien rutrum nisl tempor varius ut sit amet orci. Donec viverra mauris at turpis suscipit iaculis. Maecenas faucibus eros nec elit mollis faucibus.

                    Donec eleifend consequat urna, vel convallis erat dignissim quis. Maecenas eu aliquam lectus, vel fringilla diam. Aenean efficitur varius elementum. Maecenas nec sapien sapien. Fusce pharetra sem neque, quis imperdiet velit pharetra at. Aliquam molestie porta dui a volutpat. Ut dui dolor, malesuada at turpis ut, efficitur hendrerit erat. Morbi tincidunt sollicitudin nisi, ut egestas metus sollicitudin at. Sed pretium, felis eget vulputate cursus, neque neque laoreet nisl, ut lobortis mi erat vitae sem. Ut eleifend ligula in neque feugiat, ac bibendum velit sagittis. Donec non elit sodales, congue diam ut, elementum velit. Cras eget nisl quam. Integer massa magna, vehicula posuere eros sit amet, efficitur tempor libero. Nulla euismod magna libero, a dapibus lacus bibendum nec. Ut augue nisi, sollicitudin sed mollis sed, ornare imperdiet lacus.

                    Aliquam sit amet lacus vel erat posuere convallis. Duis mattis congue diam, ut mattis tellus condimentum in. Sed accumsan turpis in facilisis commodo. Aliquam odio mauris, eleifend ac luctus vel, pulvinar eu mauris. Aenean in elit dolor. Vivamus sodales diam quam, ut ornare augue vulputate sed. Vestibulum id mauris feugiat, maximus dolor vitae, molestie magna. Nunc interdum dapibus velit, eu tincidunt est sollicitudin vitae. In commodo sapien quam, at congue lectus lacinia sed. Aenean eget ante elementum, sodales ante vitae, iaculis ligula. Maecenas fringilla, ex eu ultrices tincidunt, mauris ipsum mollis tortor, sed porta velit justo et neque. Aenean viverra tincidunt tristique. Quisque non rutrum tortor, vel consectetur sem. Nam hendrerit mauris vel leo porta imperdiet. In hac habitasse platea dictumst.

                    Sed scelerisque enim eu nibh luctus, facilisis bibendum risus dictum. Cras a nunc sit amet dui porta tristique id a magna. Vestibulum sodales ligula et magna dapibus imperdiet. Duis ullamcorper elit et nisl molestie pellentesque. Ut ullamcorper, sapien ut feugiat gravida, purus purus sagittis sapien, sed varius metus lectus a tortor. Maecenas quis arcu eu sem ornare aliquam. Nulla facilisi. Etiam tempus ex a nunc ultricies, a bibendum risus pretium. Vivamus tincidunt erat diam, vitae ultricies nunc fringilla at. Cras orci justo, sagittis id dignissim tempus, elementum ut libero. Aenean eget diam eu ligula efficitur lacinia.

                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nibh nisl, molestie id neque vitae, molestie sollicitudin ipsum. Aliquam pretium enim vitae scelerisque tempus. Aliquam vel urna id tellus elementum vestibulum. Donec in posuere arcu. Maecenas egestas quam ipsum, ut vestibulum nulla accumsan eget. Nam id turpis feugiat, egestas mi et, varius arcu. Integer metus sem, ultrices ac sagittis sed, aliquet placerat elit. Pellentesque vulputate nec dolor in euismod. Suspendisse iaculis purus quam, vel suscipit nisi mollis sit amet. 
                </p>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor enim, lobortis quis sapien nec, gravida consectetur odio. Vestibulum condimentum rhoncus vehicula. Quisque efficitur tristique quam, a porttitor nunc tempor in. Curabitur dolor tortor, fermentum sit amet finibus eget, dapibus iaculis tortor. Ut eget sapien rutrum nisl tempor varius ut sit amet orci. Donec viverra mauris at turpis suscipit iaculis. Maecenas faucibus eros nec elit mollis faucibus.

                    Donec eleifend consequat urna, vel convallis erat dignissim quis. Maecenas eu aliquam lectus, vel fringilla diam. Aenean efficitur varius elementum. Maecenas nec sapien sapien. Fusce pharetra sem neque, quis imperdiet velit pharetra at. Aliquam molestie porta dui a volutpat. Ut dui dolor, malesuada at turpis ut, efficitur hendrerit erat. Morbi tincidunt sollicitudin nisi, ut egestas metus sollicitudin at. Sed pretium, felis eget vulputate cursus, neque neque laoreet nisl, ut lobortis mi erat vitae sem. Ut eleifend ligula in neque feugiat, ac bibendum velit sagittis. Donec non elit sodales, congue diam ut, elementum velit. Cras eget nisl quam. Integer massa magna, vehicula posuere eros sit amet, efficitur tempor libero. Nulla euismod magna libero, a dapibus lacus bibendum nec. Ut augue nisi, sollicitudin sed mollis sed, ornare imperdiet lacus.

                    Aliquam sit amet lacus vel erat posuere convallis. Duis mattis congue diam, ut mattis tellus condimentum in. Sed accumsan turpis in facilisis commodo. Aliquam odio mauris, eleifend ac luctus vel, pulvinar eu mauris. Aenean in elit dolor. Vivamus sodales diam quam, ut ornare augue vulputate sed. Vestibulum id mauris feugiat, maximus dolor vitae, molestie magna. Nunc interdum dapibus velit, eu tincidunt est sollicitudin vitae. In commodo sapien quam, at congue lectus lacinia sed. Aenean eget ante elementum, sodales ante vitae, iaculis ligula. Maecenas fringilla, ex eu ultrices tincidunt, mauris ipsum mollis tortor, sed porta velit justo et neque. Aenean viverra tincidunt tristique. Quisque non rutrum tortor, vel consectetur sem. Nam hendrerit mauris vel leo porta imperdiet. In hac habitasse platea dictumst.

                    Sed scelerisque enim eu nibh luctus, facilisis bibendum risus dictum. Cras a nunc sit amet dui porta tristique id a magna. Vestibulum sodales ligula et magna dapibus imperdiet. Duis ullamcorper elit et nisl molestie pellentesque. Ut ullamcorper, sapien ut feugiat gravida, purus purus sagittis sapien, sed varius metus lectus a tortor. Maecenas quis arcu eu sem ornare aliquam. Nulla facilisi. Etiam tempus ex a nunc ultricies, a bibendum risus pretium. Vivamus tincidunt erat diam, vitae ultricies nunc fringilla at. Cras orci justo, sagittis id dignissim tempus, elementum ut libero. Aenean eget diam eu ligula efficitur lacinia.

                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nibh nisl, molestie id neque vitae, molestie sollicitudin ipsum. Aliquam pretium enim vitae scelerisque tempus. Aliquam vel urna id tellus elementum vestibulum. Donec in posuere arcu. Maecenas egestas quam ipsum, ut vestibulum nulla accumsan eget. Nam id turpis feugiat, egestas mi et, varius arcu. Integer metus sem, ultrices ac sagittis sed, aliquet placerat elit. Pellentesque vulputate nec dolor in euismod. Suspendisse iaculis purus quam, vel suscipit nisi mollis sit amet. 
                </p>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor enim, lobortis quis sapien nec, gravida consectetur odio. Vestibulum condimentum rhoncus vehicula. Quisque efficitur tristique quam, a porttitor nunc tempor in. Curabitur dolor tortor, fermentum sit amet finibus eget, dapibus iaculis tortor. Ut eget sapien rutrum nisl tempor varius ut sit amet orci. Donec viverra mauris at turpis suscipit iaculis. Maecenas faucibus eros nec elit mollis faucibus.

                    Donec eleifend consequat urna, vel convallis erat dignissim quis. Maecenas eu aliquam lectus, vel fringilla diam. Aenean efficitur varius elementum. Maecenas nec sapien sapien. Fusce pharetra sem neque, quis imperdiet velit pharetra at. Aliquam molestie porta dui a volutpat. Ut dui dolor, malesuada at turpis ut, efficitur hendrerit erat. Morbi tincidunt sollicitudin nisi, ut egestas metus sollicitudin at. Sed pretium, felis eget vulputate cursus, neque neque laoreet nisl, ut lobortis mi erat vitae sem. Ut eleifend ligula in neque feugiat, ac bibendum velit sagittis. Donec non elit sodales, congue diam ut, elementum velit. Cras eget nisl quam. Integer massa magna, vehicula posuere eros sit amet, efficitur tempor libero. Nulla euismod magna libero, a dapibus lacus bibendum nec. Ut augue nisi, sollicitudin sed mollis sed, ornare imperdiet lacus.

                    Aliquam sit amet lacus vel erat posuere convallis. Duis mattis congue diam, ut mattis tellus condimentum in. Sed accumsan turpis in facilisis commodo. Aliquam odio mauris, eleifend ac luctus vel, pulvinar eu mauris. Aenean in elit dolor. Vivamus sodales diam quam, ut ornare augue vulputate sed. Vestibulum id mauris feugiat, maximus dolor vitae, molestie magna. Nunc interdum dapibus velit, eu tincidunt est sollicitudin vitae. In commodo sapien quam, at congue lectus lacinia sed. Aenean eget ante elementum, sodales ante vitae, iaculis ligula. Maecenas fringilla, ex eu ultrices tincidunt, mauris ipsum mollis tortor, sed porta velit justo et neque. Aenean viverra tincidunt tristique. Quisque non rutrum tortor, vel consectetur sem. Nam hendrerit mauris vel leo porta imperdiet. In hac habitasse platea dictumst.

                    Sed scelerisque enim eu nibh luctus, facilisis bibendum risus dictum. Cras a nunc sit amet dui porta tristique id a magna. Vestibulum sodales ligula et magna dapibus imperdiet. Duis ullamcorper elit et nisl molestie pellentesque. Ut ullamcorper, sapien ut feugiat gravida, purus purus sagittis sapien, sed varius metus lectus a tortor. Maecenas quis arcu eu sem ornare aliquam. Nulla facilisi. Etiam tempus ex a nunc ultricies, a bibendum risus pretium. Vivamus tincidunt erat diam, vitae ultricies nunc fringilla at. Cras orci justo, sagittis id dignissim tempus, elementum ut libero. Aenean eget diam eu ligula efficitur lacinia.

                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nibh nisl, molestie id neque vitae, molestie sollicitudin ipsum. Aliquam pretium enim vitae scelerisque tempus. Aliquam vel urna id tellus elementum vestibulum. Donec in posuere arcu. Maecenas egestas quam ipsum, ut vestibulum nulla accumsan eget. Nam id turpis feugiat, egestas mi et, varius arcu. Integer metus sem, ultrices ac sagittis sed, aliquet placerat elit. Pellentesque vulputate nec dolor in euismod. Suspendisse iaculis purus quam, vel suscipit nisi mollis sit amet. 
                </p>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor enim, lobortis quis sapien nec, gravida consectetur odio. Vestibulum condimentum rhoncus vehicula. Quisque efficitur tristique quam, a porttitor nunc tempor in. Curabitur dolor tortor, fermentum sit amet finibus eget, dapibus iaculis tortor. Ut eget sapien rutrum nisl tempor varius ut sit amet orci. Donec viverra mauris at turpis suscipit iaculis. Maecenas faucibus eros nec elit mollis faucibus.

                    Donec eleifend consequat urna, vel convallis erat dignissim quis. Maecenas eu aliquam lectus, vel fringilla diam. Aenean efficitur varius elementum. Maecenas nec sapien sapien. Fusce pharetra sem neque, quis imperdiet velit pharetra at. Aliquam molestie porta dui a volutpat. Ut dui dolor, malesuada at turpis ut, efficitur hendrerit erat. Morbi tincidunt sollicitudin nisi, ut egestas metus sollicitudin at. Sed pretium, felis eget vulputate cursus, neque neque laoreet nisl, ut lobortis mi erat vitae sem. Ut eleifend ligula in neque feugiat, ac bibendum velit sagittis. Donec non elit sodales, congue diam ut, elementum velit. Cras eget nisl quam. Integer massa magna, vehicula posuere eros sit amet, efficitur tempor libero. Nulla euismod magna libero, a dapibus lacus bibendum nec. Ut augue nisi, sollicitudin sed mollis sed, ornare imperdiet lacus.

                    Aliquam sit amet lacus vel erat posuere convallis. Duis mattis congue diam, ut mattis tellus condimentum in. Sed accumsan turpis in facilisis commodo. Aliquam odio mauris, eleifend ac luctus vel, pulvinar eu mauris. Aenean in elit dolor. Vivamus sodales diam quam, ut ornare augue vulputate sed. Vestibulum id mauris feugiat, maximus dolor vitae, molestie magna. Nunc interdum dapibus velit, eu tincidunt est sollicitudin vitae. In commodo sapien quam, at congue lectus lacinia sed. Aenean eget ante elementum, sodales ante vitae, iaculis ligula. Maecenas fringilla, ex eu ultrices tincidunt, mauris ipsum mollis tortor, sed porta velit justo et neque. Aenean viverra tincidunt tristique. Quisque non rutrum tortor, vel consectetur sem. Nam hendrerit mauris vel leo porta imperdiet. In hac habitasse platea dictumst.

                    Sed scelerisque enim eu nibh luctus, facilisis bibendum risus dictum. Cras a nunc sit amet dui porta tristique id a magna. Vestibulum sodales ligula et magna dapibus imperdiet. Duis ullamcorper elit et nisl molestie pellentesque. Ut ullamcorper, sapien ut feugiat gravida, purus purus sagittis sapien, sed varius metus lectus a tortor. Maecenas quis arcu eu sem ornare aliquam. Nulla facilisi. Etiam tempus ex a nunc ultricies, a bibendum risus pretium. Vivamus tincidunt erat diam, vitae ultricies nunc fringilla at. Cras orci justo, sagittis id dignissim tempus, elementum ut libero. Aenean eget diam eu ligula efficitur lacinia.

                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nibh nisl, molestie id neque vitae, molestie sollicitudin ipsum. Aliquam pretium enim vitae scelerisque tempus. Aliquam vel urna id tellus elementum vestibulum. Donec in posuere arcu. Maecenas egestas quam ipsum, ut vestibulum nulla accumsan eget. Nam id turpis feugiat, egestas mi et, varius arcu. Integer metus sem, ultrices ac sagittis sed, aliquet placerat elit. Pellentesque vulputate nec dolor in euismod. Suspendisse iaculis purus quam, vel suscipit nisi mollis sit amet. 
                </p>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor enim, lobortis quis sapien nec, gravida consectetur odio. Vestibulum condimentum rhoncus vehicula. Quisque efficitur tristique quam, a porttitor nunc tempor in. Curabitur dolor tortor, fermentum sit amet finibus eget, dapibus iaculis tortor. Ut eget sapien rutrum nisl tempor varius ut sit amet orci. Donec viverra mauris at turpis suscipit iaculis. Maecenas faucibus eros nec elit mollis faucibus.

                    Donec eleifend consequat urna, vel convallis erat dignissim quis. Maecenas eu aliquam lectus, vel fringilla diam. Aenean efficitur varius elementum. Maecenas nec sapien sapien. Fusce pharetra sem neque, quis imperdiet velit pharetra at. Aliquam molestie porta dui a volutpat. Ut dui dolor, malesuada at turpis ut, efficitur hendrerit erat. Morbi tincidunt sollicitudin nisi, ut egestas metus sollicitudin at. Sed pretium, felis eget vulputate cursus, neque neque laoreet nisl, ut lobortis mi erat vitae sem. Ut eleifend ligula in neque feugiat, ac bibendum velit sagittis. Donec non elit sodales, congue diam ut, elementum velit. Cras eget nisl quam. Integer massa magna, vehicula posuere eros sit amet, efficitur tempor libero. Nulla euismod magna libero, a dapibus lacus bibendum nec. Ut augue nisi, sollicitudin sed mollis sed, ornare imperdiet lacus.

                    Aliquam sit amet lacus vel erat posuere convallis. Duis mattis congue diam, ut mattis tellus condimentum in. Sed accumsan turpis in facilisis commodo. Aliquam odio mauris, eleifend ac luctus vel, pulvinar eu mauris. Aenean in elit dolor. Vivamus sodales diam quam, ut ornare augue vulputate sed. Vestibulum id mauris feugiat, maximus dolor vitae, molestie magna. Nunc interdum dapibus velit, eu tincidunt est sollicitudin vitae. In commodo sapien quam, at congue lectus lacinia sed. Aenean eget ante elementum, sodales ante vitae, iaculis ligula. Maecenas fringilla, ex eu ultrices tincidunt, mauris ipsum mollis tortor, sed porta velit justo et neque. Aenean viverra tincidunt tristique. Quisque non rutrum tortor, vel consectetur sem. Nam hendrerit mauris vel leo porta imperdiet. In hac habitasse platea dictumst.

                    Sed scelerisque enim eu nibh luctus, facilisis bibendum risus dictum. Cras a nunc sit amet dui porta tristique id a magna. Vestibulum sodales ligula et magna dapibus imperdiet. Duis ullamcorper elit et nisl molestie pellentesque. Ut ullamcorper, sapien ut feugiat gravida, purus purus sagittis sapien, sed varius metus lectus a tortor. Maecenas quis arcu eu sem ornare aliquam. Nulla facilisi. Etiam tempus ex a nunc ultricies, a bibendum risus pretium. Vivamus tincidunt erat diam, vitae ultricies nunc fringilla at. Cras orci justo, sagittis id dignissim tempus, elementum ut libero. Aenean eget diam eu ligula efficitur lacinia.

                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nibh nisl, molestie id neque vitae, molestie sollicitudin ipsum. Aliquam pretium enim vitae scelerisque tempus. Aliquam vel urna id tellus elementum vestibulum. Donec in posuere arcu. Maecenas egestas quam ipsum, ut vestibulum nulla accumsan eget. Nam id turpis feugiat, egestas mi et, varius arcu. Integer metus sem, ultrices ac sagittis sed, aliquet placerat elit. Pellentesque vulputate nec dolor in euismod. Suspendisse iaculis purus quam, vel suscipit nisi mollis sit amet. 
                </p>
                                    
            </main>
        `
    }),
    args: {
        siteTitle: 'Wildfire DataMart',
        homeUrl: '/',
        skipLinksEnabled: true,
        skipLinkTarget: 'main-content'
    }
};

export const WithMenu: Story = {
    render: args => ({
        props: args,
        template: `
            <nrcl-header-desktop
                [siteTitle]="siteTitle"
                [homeUrl]="homeUrl"
                [skipLinksEnabled]="skipLinksEnabled"
                [skipLinkTarget]="skipLinkTarget"
            >
                <nrcl-button action>
                    Menu
                </nrcl-button>
            </nrcl-header-desktop>

            <main id="main-content">
                <p>
                    Placeholder menu story. The Menu button demonstrates
                    where the future navigation menu component will be
                    projected into the header.
                </p>
            </main>
        `
    }),
    args: {
        siteTitle: 'Wildfire DataMart',
        homeUrl: '/',
        skipLinksEnabled: true,
        skipLinkTarget: 'main-content'
    }
};