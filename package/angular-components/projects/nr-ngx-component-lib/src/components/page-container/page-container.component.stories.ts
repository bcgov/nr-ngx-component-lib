import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlMomentDateTimeModule } from '@busacca/ng-pick-datetime';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { useArgs } from '@storybook/preview-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { fruitOptions, RowListArgs, rowListStory } from 'projects/nr-ngx-component-lib/story-util';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DATE_FORMATS } from '../../utils/date.util';
import { ConfigurationService } from '../../services/configuration.service';
import { CellContentComponent } from '../cell-content/cell-content.component';
import { DesktopViewComponent, MobileViewComponent } from '../device-view/device-view.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { GapComponent } from '../gap/gap.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { RowListDesktopComponent } from '../row-list-desktop/row-list-desktop.component';
import { Primary as RowListDesktopPrimary } from '../row-list-desktop/row-list-desktop.component.stories';
import { RowListMobileComponent } from '../row-list-mobile/row-list-mobile.component';
import { Primary as RowListMobilePrimary } from '../row-list-mobile/row-list-mobile.component.stories';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from '../row-list-sorting/row-list-sorting.component';
import { PageContainerComponent } from './page-container.component';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<PageContainerComponent> = {
    title: 'Page Container',
    component: PageContainerComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatRadioModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatTooltipModule,
                ReactiveFormsModule,
                MatListModule,
                OwlDateTimeModule,
                OwlMomentDateTimeModule,
                MatProgressSpinner,
                NgxPaginationModule,
                MatTableModule,
                MatSortModule,
                MatCardModule
            ],
            // declare components that are used in the template
            declarations: [
                CellContentComponent,
                DesktopViewComponent,
                DisplayModeWrapperComponent,
                FilterContainerComponent,
                FilterSelectComponent,
                FiltersPanelComponent,
                FilterSearchComponent,
                FilterDateComponent,
                GapComponent,
                MobileViewComponent,
                PageContainerComponent,
                PageHeaderComponent,
                RerenderDirective,
                RowListDesktopComponent,
                RowListMobileComponent,
                RowListPaginationComponent,
                RowListSortingComponent,
                ButtonComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService,
                { provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS },
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="width + displayMode">
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
    tags: [ 'autodocs' ],
    parameters: {
        docs: {
            description: {
                component: `
A layout container component that provides consistent spacing and structure for page content.
This component serves as the main wrapper for page layouts, automatically handling gaps between sections and providing a standardized page structure.

## Purpose

The page container establishes the foundational layout structure for application pages.
It ensures consistent spacing between page sections and works seamlessly with responsive components to adapt layouts between desktop and mobile views.

## Features

- **Automatic Section Spacing**: Adds consistent vertical gaps between child sections
- **Responsive Layout**: Works with device-view components for adaptive layouts
- **Page Structure**: Provides standardized container for headers, filters, and content
- **Integration Ready**: Designed to work with other layout components (PageHeader, FiltersPanel, RowList)

## Usage

### Basic Layout with Sections
\`\`\`typescript
import { PageContainerComponent } from '@wf-design-system/page-container';

@Component({
  template: \`
    <nrcl-page-container>
      <section>First section content</section>
      <section>Second section content</section>
      <section>Third section content</section>
    </nrcl-page-container>
  \`
})
export class MyPageComponent {}
\`\`\`

### Responsive Layout with Device Views
\`\`\`typescript
<nrcl-page-container>
  <nrcl-desktop-view>
    <section>Desktop-specific layout</section>
  </nrcl-desktop-view>
  
  <nrcl-mobile-view>
    <section>Mobile-optimized layout</section>
  </nrcl-mobile-view>
</nrcl-page-container>
\`\`\`

### Complete Page Layout
\`\`\`typescript
<nrcl-page-container>
  <nrcl-page-header>
    <h1>Page Title</h1>
    <button mat-raised-button>Action</button>
  </nrcl-page-header>
  
  <nrcl-gap vertical/>
  
  <nrcl-filters-panel>
    <nrcl-filter-search></nrcl-filter-search>
    <nrcl-filter-select></nrcl-filter-select>
  </nrcl-filters-panel>
  
  <section>
    <!-- Main content here -->
  </section>
</nrcl-page-container>
\`\`\`

## Common Use Cases

- List pages with headers and filters
- Dashboard layouts with multiple sections
- Form pages with consistent spacing
- Any page requiring standardized layout structure

## Interactive Demo

Toggle display mode and adjust width to see how the page container adapts to different screen sizes and device types.
                `
            }
        }
    },
}

export default meta;

export const Sections: StoryObj<PageContainerComponent & DisplayModeWrapperComponent> = {
    ...displayModeWrapperStory,
    parameters: {
        docs: {
            description: {
                story: `
Demonstrates the basic page container with multiple sections.
The container automatically adds consistent vertical spacing between each section element.
This is the foundational layout pattern for organizing page content.
                `
            }
        }
    },    
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

export const DeviceView: StoryObj<PageContainerComponent & DisplayModeWrapperComponent> = {
    ...displayModeWrapperStory,
    parameters: {
        docs: {
            description: {
                story: `
Shows how the page container works with device-view components for responsive layouts.
Desktop sections (red borders) display only in desktop mode, while mobile sections (green borders) appear only in mobile mode.
Toggle the display mode to see the conditional rendering in action.                
                `
            }
        }
    },    
    render: ( { ...args } ) => {
        return {
            props: args,
            template: `
                <nrcl-page-container>
                    <nrcl-desktop-view>
                        <section style="border: 1px solid red; padding: 10px;">section 1 desktop</section>
                        <section style="border: 1px solid red; padding: 10px;">section 2 desktop</section>
                    </nrcl-desktop-view>
                    <nrcl-mobile-view>
                        <section style="border: 1px solid green; padding: 10px;">section 1 mobile</section>
                        <section style="border: 1px solid green; padding: 10px;">section 2 mobile</section>
                    </nrcl-mobile-view>
                </nrcl-page-container>
            `
        }
    }
}

export const PageHeader: StoryObj<PageContainerComponent & DisplayModeWrapperComponent & { isLoading: boolean, header1: string, header2: string }> = {
    argTypes: displayModeWrapperStory.argTypes,
    parameters: {
        docs: {
            description: {
                story: `
Demonstrates a page container with a page header component.
The page header includes a title, optional subtitle, and action button.
Toggle the loading state to see the loading indicator behavior.
Adjust header text to see how dynamic content is displayed.                
                `
            }
        }
    },    
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
    parameters: {
        docs: {
            description: {
                story: `
A complete page layout example showing a typical list page implementation.
Includes page header with title and action button, filters panel with search and select filters, and responsive row list that switches between desktop table and mobile card views.
This demonstrates the full integration of multiple layout components within the page container.
Toggle display mode to see how the layout adapts between desktop and mobile experiences.
                `
            }
        }
    },    
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

                    <nrcl-desktop-view>
                        ${ rowListDesktop.template }
                    </nrcl-desktop-view>

                    <nrcl-mobile-view>
                        <nrcl-gap vertical/>

                        ${ rowListMobile.template }
                    </nrcl-mobile-view>
                </nrcl-page-container>
            `
        }
    }
}
