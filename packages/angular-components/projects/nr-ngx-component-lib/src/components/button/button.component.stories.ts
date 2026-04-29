import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory, displayModeWrapperStoryArgs } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
    title: 'Button',
    component: ButtonComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
                MatIconModule,
                MatRippleModule
            ],
            // declare components that are used in the template
            declarations: [
                IconComponent,
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{displayMode, primary, secondary, tertiary, anchor, small, disabled, icon, iconRight, compact}">
                        <display-mode-wrapper style="--registration-display: inline-block;"
                            [displayMode]="displayMode"
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                `
            }
        ),        
    ],
    // tags: ['autodocs'],
//     parameters: {
//         docs: {
//             description: {
//                 component: `
// The Button component provides a flexible, Material Design-inspired button with multiple style variants and configurations.

// ## Features

// - **Style Variants**: Default, Primary, Secondary, Tertiary
// - **Size Options**: Default, Small, and Compact sizes
// - **Icon Support**: Icons on left, right, or compact icon-only mode

// ## Usage

// \`\`\`html
// <!-- Basic button with default style -->
// <nrcl-button 
//     label="Click Me"
// ></nrcl-button>

// <!-- Primary button with icon -->
// <nrcl-button primary 
//     label="Add" icon="add"
// ></nrcl-button>

// <!-- Small secondary button -->
// <nrcl-button secondary small 
//     label="Cancel"
// ></nrcl-button>

// <!-- Compact icon-only button -->
// <nrcl-button compact 
//     iconCompact="clear-filters" 
//     tooltip="Clear"
// ></nrcl-button>

// <!-- Normal button on desktop, and compact with icon on mobile -->
// <nrcl-button compact="mobile" 
//     label="Clear"
//     iconCompact="clear-filters" 
//     tooltip="Clear"
// ></nrcl-button>
// \`\`\`

// ## Style Variants

// - **Default**: Button style depends on size option
// - **Primary**: Emphasized button for primary actions
// - **Secondary**: De-emphasized button for secondary actions
// - **Tertiary**: Minimal button for tertiary actions

// ## Size Modifiers

// - **Default**: Standard size for most use cases
// - **Small**: Reduced size for compact layouts
// - **Compact**: Icon-only mode for toolbars and tight spaces
//                 `
//             },
//             source: {
//                 excludeDecorators: true
//             }
//         }
//     },
}

export default meta;

export const Primary: StoryObj<ButtonComponent> = {
//     parameters: {
//         docs: {
//             description: {
//                 story: `
// This story showcases all button style and size variations.

// ## What This Shows

// The grid displays 12 button variations combining:
// - **Style variants**: Default, Primary, Secondary, Tertiary
// - **Size modifiers**: Default, Small, Compact

// ## Interactive Controls

// Adjust the controls to see how different properties affect all button variants simultaneously:

// - **label**: Change the button text
// - **icon**: Add an icon on the left side
// - **iconRight**: Add an icon on the right side
// - **iconCompact**: Set the icon for compact mode
// - **tooltip**: Add tooltip text
// - **disabled**: Toggle the disabled state
//                 `
//             }
//         }
//     },    
    argTypes: {
        label: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'Ok', 'Add Resources', 'Clear' ],
            mapping: { 'none': undefined }
        },
        icon: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'clear-filters', 'launch' ],
            mapping: { 'none': undefined }
        },
        iconRight: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'clear-filters', 'launch' ],
            mapping: { 'none': undefined }
        },
        iconCompact: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'clear-filters', 'launch' ],
            mapping: { 'none': undefined }
        },
        tooltip: { type: 'string' },
        disabled: { type: 'boolean' },
    },
    args: {
        label: 'Add Resources',
        tooltip: null,
        icon: null,
        iconRight: null,
        disabled: false,        
    },
    render: ( args ) => {
        var buttonArgs = argsToTemplate( args )
        return {
            props: args,
            styles: [`
                ::ng-deep registration-wrapper {
                    --registration-display: block;
                    
                    .registration {
                        display: none;
                    }
                }

                .grid {
                    display:grid; 
                    grid-template-columns: repeat( 5, 1fr );
                    gap: 20px;
                }

                article {
                    display: flex;
                    flex-direction: column;
                    border: 1px dashed gray;
                    padding: 10px;

                    h6 {
                        font-size: 14px;
                        font-family: sans-serif;
                        padding: 0;
                        margin: 0;
                        font-weight: normal;
                        padding-bottom: 10px;
                    }
                }
            `],
            template: `
                <div class="grid">
                    <article>
                        <h6>(default)</h6>
                        <nrcl-button ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>primary</h6>
                        <nrcl-button primary ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>secondary</h6>
                        <nrcl-button secondary ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>tertiary</h6>
                        <nrcl-button tertiary ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>anchor</h6>
                        <nrcl-button anchor ${ buttonArgs }></nrcl-button> 
                    </article>

                    <!-- -------------------------------- -->

                    <article>
                        <h6>small</h6>
                        <nrcl-button small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>primary small</h6>
                        <nrcl-button primary small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>secondary small</h6>
                        <nrcl-button secondary small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>tertiary small</h6>
                        <nrcl-button tertiary small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>anchor small</h6>
                        <nrcl-button anchor small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <!-- -------------------------------- -->

                    <article>
                        <h6>compact</h6>
                        <nrcl-button compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>primary compact</h6>
                        <nrcl-button primary compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>secondary compact</h6>
                        <nrcl-button secondary compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>tertiary compact</h6>
                        <nrcl-button tertiary compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article>
                        <h6>anchor compact</h6>
                        <nrcl-button anchor compact ${ buttonArgs }></nrcl-button> 
                    </article>
                </div>
            `
        }
    }
}

export const AllOptions: StoryObj<ButtonComponent & DisplayModeWrapperComponent> = {
//     parameters: {
//         docs: {
//             description: {
//                 story: `
// This story provides a single interactive button with full control over all properties and responsive testing capabilities.

// ## Interactive Playground

// Use the controls panel to experiment with all button configurations:

// - **Style variants**: Toggle primary, secondary, or tertiary
// - **Size modifiers**: Adjust small and compact settings
// - **Icons**: Configure left icon, right icon, or compact icon
// - **States**: Test disabled and tooltip states
// - **Responsive**: Use displayMode to test compact options

// ## Display Mode Options

// The display mode wrapper allows you to test how the button appears across different screen sizes:
// - **Desktop**: Full desktop view
// - **Mobile**: Mobile breakpoint

// ## Compact Mode Behavior

// The \`compact\` property has special responsive options:
// - **"no"**: Never compact
// - **"yes"**: Always compact (icon-only)
// - **"desktop"**: Compact on only desktop
// - **"mobile"**: Compact on only mobile
//                 `
//             }
//         }
//     },    
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        label: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'Ok', 'Add Resources' ],
            mapping: { 'none': undefined }
        },
        icon: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'launch' ],
            mapping: { 'none': undefined }
        },
        iconRight: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'launch' ],
            mapping: { 'none': undefined }
        },
        iconCompact: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'launch' ],
            mapping: { 'none': undefined }
        },
        tooltip: { type: 'string' },
        compact: {
            control: { type: 'inline-radio' },
            options: [ 'no', 'yes', 'desktop', 'mobile' ],
            mapping: {
                'no': undefined,
                'yes': '',
            }
        },
        small: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'no', 'yes',  ],
            mapping: {
                'null': undefined,
                'yes': '',
                'no': false,
            }
        },
        anchor: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'no', 'yes', 'foo', 'object' ],
            mapping: {
                'null': undefined,
                'yes': true,
                'no': false,
                'object': {href:"foo",target:"_foo"}
            }
        },
        click: { action: 'click' }
    },
    args: {
        ...displayModeWrapperStory.args,
        label: 'Add Resources',
        tooltip: null,
        primary: false,
        secondary: false,
        tertiary: false,
        anchor: null,
        small: null,
        disabled: false,
    },
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            template: `
                <nrcl-button ${ argsToTemplate(args,{exclude:displayModeWrapperStoryArgs}) }></nrcl-button> 
            `
        }
    }
}

export const ProjectedContent: StoryObj<ButtonComponent & DisplayModeWrapperComponent> = {
//     parameters: {
//         docs: {
//             description: {
//                 story: `
// This story demonstrates using Angular's content projection to compose button content with flexible icon and text positioning.

// ## Content Projection vs. Input Properties

// While the component supports \`icon\`, \`iconRight\`, and \`label\` input properties, content projection offers greater flexibility:

// ### Using Input Properties

// \`\`\`html
// <nrcl-button label="Add" icon="add"></nrcl-button>
// \`\`\`

// ### Using Content Projection

// \`\`\`html
// <nrcl-button>
//     <nrcl-icon>add</nrcl-icon>
//     Add
// </nrcl-button>
// \`\`\`

// ## Side-by-Side Comparison

// This story displays two buttons:
// 1. **Icon-Left Button**: Icon projected before the label
// 2. **Icon-Right Button**: Label projected before the icon

// Use the controls to see how the same configuration affects both icon positions.

// ## Advanced Use Cases

// Content projection enables:
// - **Custom element ordering**: Place icons and text in any sequence
// - **Complex content**: Include multiple icons, badges, or custom elements
// - **Conditional rendering**: Use Angular's \`@if\` to dynamically show/hide content
// - **Custom components**: Project entire custom components inside buttons

// ## Example: Multiple Icons
// \`\`\`html
// <nrcl-button primary>
//     <nrcl-icon>cloud_upload</nrcl-icon>
//     Upload File
//     <nrcl-icon>arrow_forward</nrcl-icon>
// </nrcl-button>
// \`\`\`

// ## When to Use Projection

// Choose content projection when:
// - You need non-standard icon positioning
// - You want to include custom HTML or components
// - You're building complex, conditional button content
// - You prefer template-driven composition over property binding
//                 `
//             }
//         }
//     },    
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        label: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'Ok', 'Add Resources' ],
            mapping: { 'none': undefined }
        },
        icon: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app' ],
            mapping: { 'none': undefined }
        },
        compact: {
            control: { type: 'inline-radio' },
            options: [ 'no', 'yes', 'desktop', 'mobile' ],
            mapping: {
                'no': undefined,
                'yes': '',
            }
        },
        click: { action: 'click' }
    },
    args: {
        ...displayModeWrapperStory.args,
        label: 'Add Resources',
        tooltip: null,
        primary: false,
        secondary: false,
        tertiary: false,
        small: false,
        disabled: false,
    },
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            template: `
                <div style="display: flex; gap: 20px">
                    <nrcl-button
                        [primary]="primary"
                        [secondary]="secondary"
                        [tertiary]="tertiary"
                        [disabled]="disabled"
                        [small]="small"
                        [compact]="compact"
                        (click)="click( $event )"
                    >
                        @if ( icon ) { <nrcl-icon>{{ icon }}</nrcl-icon> }
                        @if ( label ) { {{ label }} }
                    </nrcl-button> 

                    <nrcl-button
                        [primary]="primary"
                        [secondary]="secondary"
                        [tertiary]="tertiary"
                        [disabled]="disabled"
                        [small]="small"
                        [compact]="compact"
                        (click)="click( $event )"
                    >
                        @if ( label ) { {{ label }} }
                        @if ( icon ) { <nrcl-icon>{{ icon }}</nrcl-icon> }
                    </nrcl-button> 
                </div>
            `
        }
    }
}

export const Inline: StoryObj<ButtonComponent & DisplayModeWrapperComponent> = {
    parameters: {
        docs: {
            description: {
                story: `
                `
            }
        }
    },    
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        label: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'Ok', 'Add Resources' ],
            mapping: { 'none': undefined }
        },
        icon: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'launch' ],
            mapping: { 'none': undefined }
        },
        iconRight: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'launch' ],
            mapping: { 'none': undefined }
        },
        iconCompact: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app', 'launch' ],
            mapping: { 'none': undefined }
        },
        tooltip: { type: 'string' },
        compact: {
            control: { type: 'inline-radio' },
            options: [ 'no', 'yes', 'desktop', 'mobile' ],
            mapping: {
                'no': undefined,
                'yes': '',
            }
        },
        small: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'no', 'yes',  ],
            mapping: {
                'null': undefined,
                'yes': '',
                'no': false,
            }
        },
        anchor: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'no', 'yes', 'foo', 'object' ],
            mapping: {
                'null': undefined,
                'yes': true,
                'no': false,
                'object': {href:"foo",target:"_foo"}
            }
        },
        click: { action: 'click' }
    },
    args: {
        ...displayModeWrapperStory.args,
        label: 'Add Resources',
        tooltip: null,
        primary: false,
        secondary: false,
        tertiary: false,
        anchor: null,
        small: null,
        disabled: false,
    },
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            template: `
                The text before <nrcl-button ${ argsToTemplate(args,{exclude:displayModeWrapperStoryArgs}) }></nrcl-button> and the text after.
            `
        }
    }
}
