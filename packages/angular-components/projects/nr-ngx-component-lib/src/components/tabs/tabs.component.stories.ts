import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {MatTabsModule} from '@angular/material/tabs';
import { TabComponent, TabLabelDirective } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
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
                TabGroupComponent,
                TabLabelDirective
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{width, tooltip}">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
                        >
                            ${ story }
                        </display-mode-wrapper>
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

export const Primary: StoryObj<{ width: number } & DisplayModeWrapperComponent> = {
    argTypes: displayModeWrapperStory.argTypes,
    args: {
        ...displayModeWrapperStory.args,
    },
    render: ( args ) => {
        return {
            styles: [ `
                .box {
                    display: flex;
                    border: 1px solid red;
                    //width: 100%;
                }
            ` ],
            props: args,
            template: `
                <nrcl-tab-group classic
                    [style.width.px]="width"                    
                >
                    <nrcl-tab>
                        <ng-template nrclTabLabel>label 1</ng-template>
                        tab 1
                    </nrcl-tab>

                    <nrcl-tab label="label 2">
                        <section label>label 2</section>
                        tab 2
                    </nrcl-tab>

                    <nrcl-tab disabled label="label 3">
                        <section label>label 3</section>
                        tab 3
                    </nrcl-tab>

                    <nrcl-tab>
                        <ng-template nrclTabLabel>
                            <div class="box">label 4</div>
                        </ng-template>
                        <div class="box">tab 4</div>
                    </nrcl-tab>
                </nrcl-tab-group> 
            `
        }
    }
}
