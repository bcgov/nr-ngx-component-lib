import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TabGroupComponent } from './tab-group.component';

const meta: Meta<TabGroupComponent & { width: number }> = {
    title: 'Tab Group',
    component: TabGroupComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
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
                        <registration-wrapper style="--registration-display: inline-block;">
                            ${ story }
                        </registration-wrapper>
                    </ng-container>
                `
            }
        ),        
    ],
    tags: ['autodocs'],
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

export const Primary: StoryObj<TabGroupComponent & { width: number }> = {
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
                <nrcl-tab-group
                    [style.width.px]="width"                    
                >
                    <nrcl-tab
                    ></nrcl-tab>

                    <nrcl-tab
                    ></nrcl-tab>
                </nrcl-tab-group> 
            `
        }
    }
}
