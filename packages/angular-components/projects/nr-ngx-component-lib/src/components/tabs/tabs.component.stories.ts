import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule, TooltipComponent } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent, TabContentDirective, TabLabelDirective } from './tab/tab.component';
import { OnInit, OnDestroy, Input, Component } from '@angular/core';

@Component( {
    selector: 'sentinel',
    template: `
        <div>Sentinel {{ name }}</div>
        <ng-content></ng-content>
    `, 
} )
class SentinalComponent implements OnInit, OnDestroy {
    @Input() name
    
    ngOnInit(): void {
        console.log('init sentinal', this.name)
    }

    ngOnDestroy(): void {
        console.log('destroy sentinal', this.name)
    }
}

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
                TabContentDirective,
                SentinalComponent
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
        selectedTabChange: { action: 'selectedTabChange' },
        activateTab: { action: 'activateTab' }
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
                :host {
                    //--nrcl-tag-group-header-padding: 16px;
                }
            ` ],
            props: { ...args, activateTab: ( a ) => { a.cancel( Promise.resolve(false) ) } },
            template: `
                <nrcl-tab-group standard
                    [style.width.px]="width"
                    [selectedTab]="selectedTab"
                    (selectedTabChange)="selectedTabChange($event)"
                    (activateTab)="activateTab($event)"
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
                :host {
                    //--nrcl-tag-group-content-padding: 0;
                }
            ` ],
            props: { ...args, activateTab: ( a ) => { a.cancel( Promise.resolve(!confirm('ok?')) ) } },
            template: `
                <nrcl-tab-group classic
                    [style.width.px]="width"
                    [selectedTab]="selectedTab"
                    (selectedTabChange)="selectedTabChange($event)"
                    (activateTab)="activateTab($event)"
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
        <ng-template nrclTabContent>
            <sentinel name="tab1">tab1</sentinel>
        </ng-template>
    </nrcl-tab>

    <nrcl-tab label="label 2"  name="tab2">
        <section label>label 2</section>
        <ng-template nrclTabContent>
            <sentinel name="tab2">tab2</sentinel>
        </ng-template>
    </nrcl-tab>

    <nrcl-tab disabled label="label 3"  name="tab3">
        <section label>label 3</section>
        <ng-template nrclTabContent>
            <sentinel name="tab3">tab3</sentinel>
        </ng-template>
    </nrcl-tab>

    <nrcl-tab name="tab4">
        <ng-template nrclTabLabel>
            <div class="box">label 4</div>
        </ng-template>
        <ng-template nrclTabContent>
            <sentinel name="tab4">tab4</sentinel>
        </ng-template>
    </nrcl-tab>

    <nrcl-tab name="tab5">
        <ng-template nrclTabLabel>
            <div class="box">label 5</div>
        </ng-template>
        <sentinel name="tab5">tab5</sentinel>
    </nrcl-tab>

    <nrcl-tab name="tab6" label="tab6">
        <sentinel name="tab6">tab6</sentinel>
    </nrcl-tab>
    `
