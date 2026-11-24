import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fruitOptions, RowListArgs, rowListStory } from 'projects/nr-ngx-component-lib/story-util';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { useArgs } from 'storybook/preview-api';
import { ButtonComponent } from '../button/button.component';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from '../device-view/device-view.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';
import { GapComponent } from '../gap/gap.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { RowListDesktopComponent } from '../row-list-desktop/row-list-desktop.component';
import { Primary as RowListDesktopPrimary } from '../row-list-desktop/row-list-desktop.component.stories';
import { RowListMobileComponent } from '../row-list-mobile/row-list-mobile.component';
import { Primary as RowListMobilePrimary } from '../row-list-mobile/row-list-mobile.component.stories';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from '../row-list-sorting/row-list-sorting.component';
import { PageContainerComponent } from './page-container.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

const meta: Meta<PageContainerComponent> = {
    title: 'Navigation and Structure/Page Container',
    component: PageContainerComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FilterContainerComponent,
                FilterSelectComponent,
                FiltersPanelComponent,
                FilterSearchComponent,
                FilterDateComponent,
                GapComponent,
                PageHeaderComponent,
                RowListDesktopComponent,
                RowListMobileComponent,
                RowListPaginationComponent,
                RowListSortingComponent,
                ButtonComponent,
                DeviceViewComponent,
                DesktopViewDirective,
                MobileViewDirective,
                NgxPaginationModule,
                MatTableModule,
                MatCardModule
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
                    <ng-container *rerender="{width, displayMode}">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
                            [useWidth]="useWidth"
                            [width]="width"                        
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                    `
            }
        ),        
    ],
}

export default meta;

export const Sections: StoryObj<PageContainerComponent & DisplayModeWrapperComponent> = {
    ...displayModeWrapperStory,
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-page-container>
                    <section style="border: 1px solid red; padding: 10px;">section 1</section>
                    <section style="border: 1px solid red; padding: 10px;">section 2</section>
                </nrcl-page-container>
            `
        }
    }
}

export const PageHeader: StoryObj<PageContainerComponent & DisplayModeWrapperComponent & { isLoading: boolean, header1: string, header2: string }> = {
    argTypes: displayModeWrapperStory.argTypes,
    args: {
        ...displayModeWrapperStory.args,
        header1: 'Prep Sheets',
        header2: 'Header 2',
        isLoading: false
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-page-container>
                    <nrcl-page-header [isLoading]="isLoading">
                        <h1>{{ header1 }}</h1>
                        @if ( header2 ) { <h2>{{ header2 }}</h2> }

                        <nrcl-button primary>
                            Create Prep Sheet
                        </nrcl-button>
                    </nrcl-page-header>
                </nrcl-page-container>
            `
        }
    }
}

export const RowList: StoryObj<PageContainerComponent & DisplayModeWrapperComponent & RowListArgs> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        ...rowListStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        ...rowListStory.args,
    },
    render: ( args, context ) => {
        const [, setArgs] = useArgs();

        let rowListDesktop = RowListDesktopPrimary.render( args, context )
        let rowListMobile = RowListMobilePrimary.render( args, context )

        return {
            styles: [
                ...rowListDesktop.styles
            ],
            props: {
                ...args,
                ...rowListDesktop.props,
                ...rowListMobile.props,
                options: fruitOptions()
            },
            template: `
                <nrcl-page-container>
                    <nrcl-page-header>
                        <h1>Prep Sheets</h1>

                        <nrcl-button primary>
                            Create Prep Sheet
                        </nrcl-button>
                    </nrcl-page-header>

                    <nrcl-gap vertical/>

                    <nrcl-filters-panel>
                        <nrcl-filter-search></nrcl-filter-search>

                        <nrcl-filter-select
                            label="Fruit"
                            [options]="options"
                        ></nrcl-filter-select>

                        <nrcl-filter-date
                            label="Start"
                        ></nrcl-filter-date>
                    </nrcl-filters-panel>

                    <nrcl-device-view>
                        <ng-template desktop-view>
                            ${ rowListDesktop.template }
                        </ng-template>

                        <ng-template mobile-view>
                            <nrcl-gap vertical/>

                            ${ rowListMobile.template }
                        </ng-template>
                    </nrcl-device-view>
                </nrcl-page-container>
            `
        }
    }
}
