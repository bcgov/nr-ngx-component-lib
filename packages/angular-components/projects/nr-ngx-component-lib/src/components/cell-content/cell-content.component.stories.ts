import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CellContentComponent } from './cell-content.component';

const meta: Meta<CellContentComponent & { width: number }> = {
    title: 'Inputs and Controls/Cell Content',
    component: CellContentComponent,
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
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{width, tooltip}">
                        ${ story }
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
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
        tooltip: {
            control: { type: 'inline-radio' },
            options: [ '(missing)', 'False', "(no value)", 'True', 'This is a tooltip' ],
            mapping: {
                '(missing)': undefined,
                'False': false,
                '(no value)': '',
                'True': true,
            }
        }
    },
    args: {
        width: 158,
        tooltip: null
    },
}

export default meta;

export const ContentProperty: StoryObj<CellContentComponent & { width: number }> = {
    argTypes: {
        content: { type: 'string' },
    },
    args: {
        content: 'Property Content'
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-cell-content ${ argsToTemplate(args,{exclude:['width']}) } 
                    [style.width.px]="width"                    
                ></nrcl-cell-content> 
            `
        }
    }
}

export const ContentProjection: StoryObj<CellContentComponent & { width: number, inserted: string }> = {
    argTypes: {
        inserted: { type: 'string' },
    },
    args: {
        inserted: 'Inserted Content'
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-cell-content ${ argsToTemplate(args,{exclude:['width','inserted']}) } 
                    [style.width.px]="width"
                >
                    {{ inserted }}
                </nrcl-cell-content> 
            `
        }
    }
}
