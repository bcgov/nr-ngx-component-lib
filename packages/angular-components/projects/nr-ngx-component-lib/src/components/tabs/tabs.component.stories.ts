import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule, TooltipComponent } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent, TabLabelDirective } from './tab/tab.component';

const meta: Meta<DisplayModeWrapperComponent & TabGroupComponent> = {
    title: 'Tabs',
    // component: TabGroupComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTabsModule
            ],
            // declare components that are used in the template
            declarations: [
                TabComponent,
                TabGroupComponent,
                TabLabelDirective,
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
        ...displayModeWrapperStory.argTypes,
        selectedTabChange: { action: 'selectedTabChange' }
    },
    args: {
        ...displayModeWrapperStory.args,
        selectedTab: 0,
    },
}

export default meta;

export const Standard: StoryObj<DisplayModeWrapperComponent> = {
    render: ( args ) => {
        return {
            styles: [ `
                .box {
                    display: flex;
                    border: 1px solid red;
                }
            ` ],
            props: args,
            template: `
                <nrcl-tab-group standard
                    [style.width.px]="width"
                    [selectedTab]="selectedTab"
                    (selectedTabChange)="selectedTabChange($event)"
                >
                    ${ tabs }
                </nrcl-tab-group>
            `
        }
    }
}

export const Classic: StoryObj<DisplayModeWrapperComponent> = {
    render: ( args ) => {
        return {
            styles: [ `
                .box {
                    display: flex;
                    border: 1px solid red;
                }
            ` ],
            props: args,
            template: `
                <nrcl-tab-group classic
                    [style.width.px]="width"
                    [selectedTab]="selectedTab"
                    (selectedTabChange)="selectedTabChange($event)"
                >
                    ${ tabs }
                </nrcl-tab-group>
            `
        }
    }
}

const tabs = `
    <nrcl-tab name="tab1">
        <ng-template nrclTabLabel>label 1</ng-template>
        tab 1
    </nrcl-tab>

    <nrcl-tab label="label 2"  name="tab2">
        <section label>label 2</section>
        tab 2
    </nrcl-tab>

    <nrcl-tab disabled label="label 3"  name="tab3">
        <section label>label 3</section>
        tab 3
    </nrcl-tab>

    <nrcl-tab name="tab4">
        <ng-template nrclTabLabel>
            <div class="box">label 4</div>
        </ng-template>
        <div class="box">tab 4</div>
    </nrcl-tab>
`