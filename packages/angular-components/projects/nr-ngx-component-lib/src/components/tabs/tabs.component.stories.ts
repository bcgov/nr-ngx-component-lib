import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {MatTabsModule} from '@angular/material/tabs';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
const meta: Meta<{ width: number }> = {
    title: 'Tabs',
    // component: TabGroupComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
                MatTabsModule
            ],
            // declare components that are used in the template
            declarations: [
                TabComponent,
                TabGroupComponent
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
    },
    args: {
        width: 158,
    },
}

export default meta;

export const Primary: StoryObj<{ width: number }> = {
    argTypes: {
    },
    args: {
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-tab-group
                    [style.width.px]="width"                    
                >
                    <nrcl-tab>
                        <section label>label 1</section>
                        tab 1
                    </nrcl-tab>

                    <nrcl-tab>
                        <section label>label 2</section>
                        tab 2
                    </nrcl-tab>
                </nrcl-tab-group> 
            `
        }
    }
}
