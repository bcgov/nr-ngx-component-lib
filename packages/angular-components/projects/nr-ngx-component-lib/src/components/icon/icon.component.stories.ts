import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
    title: 'Icon',
    component: IconComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
            ],
            // declare components that are used in the template
            declarations: [
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
                `
            },
            source: {
                excludeDecorators: true
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<IconComponent & { color: string }> = {
    argTypes: {
        color: { control: { type: 'color' } },
    },
    args: {
        color: 'black',
        fill: true
    },
    render: ( args ) => {
        console.log(args.color)
        return {
            props: { 
                ...args,
                materialIcons: [
                    'add_box', 
                    'add', 
                    'arrow_forward', 
                    'cancel', 
                    'check_circle', 
                    'cloud_upload', 
                    'error', 
                    'expand_less', 
                    'expand_more', 
                    'info', 
                    'remove', 
                    'warning', 
                    'indeterminate_check_box', 
                ],
                icons: [
                    '__missing__',
                    'clear-filters',
                    'user-clock',
                    'roster',
                    'home-outline',
                    'mcp-server',
                ]
            },
            styles: [`
                :host {
                    font-family: var( --nrcl-font-family );
                    font-size: var( --nrcl-font-size );

                    section {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        margin-top: 30px;
                        width: 100%;

                        .item {
                            display: flex;
                            gap: 10px;
                            align-items: flex-start;
                            position: relative;
                            padding-bottom: 20px;

                            label {
                                position: absolute;
                                top: -20px;
                            }

                            .nrcl-icon {
                                color: ${ args.color };
                                border: 1px dashed black;
                                padding: 2px;
                            }
                        }
                    }
                }
            `],
            template: `
                <h3>NRCL Icons</h3>
                
                <section>
                    @for ( icon of icons; track icon ) {
                        <div class="item">
                            <label>{{ icon }}</label>
                            <nrcl-icon [fill]="fill" small>{{ icon }}</nrcl-icon> 
                            <nrcl-icon [fill]="fill">{{ icon }}</nrcl-icon> 
                            <nrcl-icon [fill]="fill" large>{{ icon }}</nrcl-icon> 
                        </div>
                    }
                </section>

                <h3>Material Icons</h3>

                <section>
                    @for ( icon of materialIcons; track icon ) {
                        <div class="item">
                            <label>{{ icon }}</label>
                            <nrcl-icon [fill]="fill" small>{{ icon }}</nrcl-icon> 
                            <nrcl-icon [fill]="fill">{{ icon }}</nrcl-icon> 
                            <nrcl-icon [fill]="fill" large>{{ icon }}</nrcl-icon> 
                        </div>
                    }
                </section>
            `
        }
    }
}

export const Icon: StoryObj<IconComponent & { icon: string }> = {
    args: {
        icon: 'info'
    },
    render: ( args ) => {
        return {
            props: { ...args },
            template: `
                <nrcl-icon *rerender="icon">{{ icon }}</nrcl-icon> 
            `
        }
    }
}

