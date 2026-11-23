import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory, displayModeWrapperStoryArgs } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
    title: 'Button',
    component: ButtonComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            // imports: [
            // ],
            // // declare components that are used in the template
            // declarations: [
            // ],
            // List of providers that should be available to the root component and all its children.
            // providers: [
            // ],
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
    parameters: {
        docs: {
            source: {
                excludeDecorators: true
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<ButtonComponent & { tooltipMode: any, containerWidthMode: any, containerWidth: number, widthMode: any, width: number } > = {
    argTypes: {
        label: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'Ok', 'Add Resources', 'Clear', 'This label is too long and just goes on and on' ],
            mapping: { 'none': undefined }
        },
        ariaLabel: {
            control: { type: 'text' }
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
        tooltipMode: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'false', 'true', '""', '(text)' ],
            mapping: { 'null': undefined, 'false': false, 'true': true, '""': '' }
        },
        tooltip: { 
            type: 'string',
            if: { arg: 'tooltipMode', eq: '(text)' }
        },
        disabled: { type: 'boolean' },
        containerWidthMode: {
            control: { type: 'inline-radio' },
            options: [ 'auto', 'set' ],
        },
        containerWidth: {
            if: { arg: 'containerWidthMode', eq: 'set' },
            control: { type: 'range', min: 0, max: 500 }
        },
        widthMode: {
            control: { type: 'inline-radio' },
            options: [ 'auto', 'set', '100%' ],
        },
        width: {
            if: { arg: 'widthMode', eq: 'set' },
            control: { type: 'range', min: 0, max: 500 }
        },
    },
    args: {
        label: 'Add Resources',
        ariaLabel: 'Add Resources Button',
        tooltipMode: 'null',
        tooltip: undefined,
        icon: undefined,
        iconRight: undefined,
        disabled: false,        
        containerWidthMode: 'auto',
        containerWidth: 200,
        widthMode: 'auto',
        width: 200,
    },
    render: ( args ) => {
        if ( args.tooltipMode != '(text)' ) {
            args.tooltip = args.tooltipMode
        }

        let buttonArgs = argsToTemplate( args, { exclude: [ 'tooltipMode', 'containerWidthMode', 'containerWidth', 'widthMode', 'width' ] } )

        let containerWidth
        if ( args.containerWidthMode == 'auto' ) {
            containerWidth = 'unset'
        }
        else {
            containerWidth = args.containerWidth + 'px'
        }
        let containerWidthArg = '[style.width]="containerWidth"'

        let width
        if ( args.widthMode == 'auto' ) {
            width = 'unset'
        }
        if ( args.widthMode == '100%' ) {
            width = '100%'
            buttonArgs += ' [style.--nrcl-button-width]="width"'
        }
        else {
            width = args.width + 'px'
            buttonArgs += ' [style.--nrcl-button-width]="width"'
        }
        
        return {
            props: { ...args, width, containerWidth },
            styles: [`
                ::ng-deep registration-wrapper {
                    --registration-display: block;
                    
                    .registration {
                        display: none;
                    }
                }

                .grid {
                    display:grid; 
                    grid-template-columns: repeat( 5, min-content );
                    gap: 20px;
                    min-width: 0;
                    
                }

                article {
                    display: flex;
                    flex-direction: column;
                    border: 1px dashed gray;
                    padding: 10px;
                    box-sizing: content-box;

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
                    <article ${ containerWidthArg }>
                        <h6>(default)</h6>
                        <nrcl-button ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>primary</h6>
                        <nrcl-button primary ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>secondary</h6>
                        <nrcl-button secondary ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>tertiary</h6>
                        <nrcl-button tertiary ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>anchor</h6>
                        <nrcl-button anchor ${ buttonArgs }></nrcl-button> 
                    </article>

                    <!-- -------------------------------- -->

                    <article ${ containerWidthArg }>
                        <h6>small</h6>
                        <nrcl-button small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>primary small</h6>
                        <nrcl-button primary small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>secondary small</h6>
                        <nrcl-button secondary small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>tertiary small</h6>
                        <nrcl-button tertiary small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>anchor small</h6>
                        <nrcl-button anchor small ${ buttonArgs }></nrcl-button> 
                    </article>

                    <!-- -------------------------------- -->

                    <article ${ containerWidthArg }>
                        <h6>compact</h6>
                        <nrcl-button compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>primary compact</h6>
                        <nrcl-button primary compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>secondary compact</h6>
                        <nrcl-button secondary compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>tertiary compact</h6>
                        <nrcl-button tertiary compact ${ buttonArgs }></nrcl-button> 
                    </article>

                    <article ${ containerWidthArg }>
                        <h6>anchor compact</h6>
                        <nrcl-button anchor compact ${ buttonArgs }></nrcl-button> 
                    </article>
                </div>
            `
        }
    }
}

export const AllOptions: StoryObj<ButtonComponent & DisplayModeWrapperComponent> = {
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
        tooltip: undefined,
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
        tooltip: undefined,
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
        tooltip: undefined,
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
