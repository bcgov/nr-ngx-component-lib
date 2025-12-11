import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { DisplayModeWrapperComponent, displayModeWrapperStory, displayModeWrapperStoryArgs } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DesktopViewComponent, MobileViewComponent } from '../device-view/device-view.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { RowListPaginationComponent } from './row-list-pagination.component';

type CollectionParametersDesktopComponentExtended = RowListPaginationComponent & { width?: number }

const meta: Meta<CollectionParametersDesktopComponentExtended> = {
    title: 'Row List Pagination',
    component: RowListPaginationComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatIconModule,
                BrowserAnimationsModule,
                FormsModule,
                MatButtonModule,
                NgxPaginationModule,
                MatCheckboxModule,
                MatFormFieldModule,                
                MatInputModule,
                MatListModule,  
                MatTooltipModule,
                ReactiveFormsModule,
                NgxPaginationModule,
            ],
            // declare components that are used in the template
            declarations: [
                FilterSelectComponent,
                FilterContainerComponent,
                RerenderDirective,
                DisplayModeWrapperComponent,
                FilterDateComponent,
                FilterSearchComponent,
                FilterSelectComponent,
                MobileViewComponent,
                DesktopViewComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
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
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
A pagination control component that provides navigation and page size selection for paginated lists.
Works with ngx-pagination to display current page information, navigation controls, and page size options.

## Purpose

The row list pagination component provides a complete pagination interface for list views.
It displays the current range of items being shown, total item count, page navigation buttons, and page size selection.
The component adapts its layout and available page sizes based on display mode (desktop vs mobile).

## Features

- **Item Range Display**: Shows "X - Y of Z items" to indicate current view position
- **Page Navigation**: Previous/Next buttons with disabled state at boundaries
- **Page Size Selection**: Dropdown to change items per page
- **Responsive Behavior**: Adjusts page size options based on display mode
- **Integration with ngx-pagination**: Works seamlessly with the pagination pipe
- **Event Emissions**: Emits events for page changes and page size changes

## Usage

### Basic Pagination
\`\`\`typescript
import { RowListPaginationComponent } from '@wf-design-system/row-list-pagination';

@Component({
  template: \`
    <nrcl-row-list-pagination
      paginationId="my-list"
      [pageSize]="pageSize"
      [pageNumber]="pageNumber"
      [rowCount]="totalItems"
      (pageNumberChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)">
    </nrcl-row-list-pagination>
  \`
})
export class MyListComponent {
  pageSize = 25;
  pageNumber = 1;
  totalItems = 100;
  
  onPageChange(newPage: number) {
    this.pageNumber = newPage;
    // Load new page data
  }
  
  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.pageNumber = 1; // Reset to first page
    // Reload data with new page size
  }
}
\`\`\`

### With ngx-pagination Pipe
\`\`\`typescript
@Component({
  template: \`
    <!-- Desktop table example -->
    <mat-table [dataSource]="items | paginate: {
      id: 'my-list',
      itemsPerPage: pageSize,
      currentPage: pageNumber,
      totalItems: totalItems
    }">
      <!-- Table columns -->
    </mat-table>
    
    <nrcl-gap vertical/>
    
    <nrcl-row-list-pagination
      paginationId="my-list"
      [pageSize]="pageSize"
      [pageNumber]="pageNumber"
      [rowCount]="totalItems"
      (pageNumberChange)="pageNumber = $event"
      (pageSizeChange)="handlePageSizeChange($event)">
    </nrcl-row-list-pagination>
  \`
})
export class MyComponent {
  items = [...];
  pageSize = 25;
  pageNumber = 1;
  totalItems = 150;
  
  handlePageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.pageNumber = 1; // Important: reset to page 1
  }
}
\`\`\`

### In Complete List Layout
\`\`\`typescript
<nrcl-row-list-desktop>
  <mat-table [dataSource]="items | paginate: {
    id: 'equipment-list',
    itemsPerPage: pageSize,
    currentPage: pageNumber,
    totalItems: totalItems
  }">
    <!-- Table columns -->
  </mat-table>
</nrcl-row-list-desktop>

<nrcl-gap vertical/>

<nrcl-row-list-pagination
  paginationId="equipment-list"
  [pageSize]="pageSize"
  [pageNumber]="pageNumber"
  [rowCount]="totalItems"
  (pageNumberChange)="pageNumber = $event"
  (pageSizeChange)="onPageSizeChange($event)">
</nrcl-row-list-pagination>
\`\`\`

## Inputs

- **paginationId** (string): Unique identifier matching the ngx-pagination pipe id
- **pageSize** (number): Current items per page (e.g., 10, 25, 50, 100)
- **pageNumber** (number): Current page number (1-indexed)
- **rowCount** (number): Total number of items across all pages

## Outputs

- **pageNumberChange** (number): Emits when user navigates to different page
- **pageSizeChange** (number): Emits when user changes page size

## Display Mode Behavior

The component adjusts available page sizes based on display mode:
- **Desktop**: Typically offers more options (e.g., 10, 25, 50, 100)
- **Mobile**: May offer fewer, smaller options (e.g., 5, 10, 20)

## Common Use Cases

- Paginated table navigation
- Card list pagination on mobile
- Search results pagination
- Any list requiring page-by-page navigation
- Lists with user-selectable page sizes

## Best Practices

- Always reset to page 1 when changing page size
- Match the \`paginationId\` between the component and pagination pipe
- Use \`nrcl-gap vertical\` before the pagination component for proper spacing
- Handle both \`pageNumberChange\` and \`pageSizeChange\` events
- Consider different page sizes for desktop vs mobile
- Update URL query params to make pagination shareable/bookmarkable

## Integration Points

- **ngx-pagination**: Pagination pipe for data slicing
- **nrcl-row-list-desktop**: Desktop table container
- **nrcl-row-list-mobile**: Mobile card list container
- **nrcl-gap**: Spacing component for vertical gaps

## Interactive Demo

Adjust row count to see how pagination calculates pages.
Change page number to navigate between pages.
Modify page size to see how the range display updates.
Toggle display mode to see responsive behavior.
Note how navigation buttons disable at first/last pages.
                `
            }
        }
    }
}

export default meta;

export const Primary: StoryObj<RowListPaginationComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        pageSize: {
            control: {
                type: 'inline-radio'
            },
            options: [ 5, 10, 20, 50, 100 ]
        },
        pageNumber: {
            control: {
                type: 'range',
                min: 1,
                max: 200
            }
        },
        rowCount: {
            control: {
                type: 'range',
                min: 0,
                max: 2000
            }
        },
        pageSizeChange: { action: 'pageSizeChange' },
        pageNumberChange: { action: 'pageNumberChange' }
    },
    args: {
        ...displayModeWrapperStory.args,
        pageSize: 20,
        pageNumber: 1,
        rowCount: 100
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-row-list-pagination ${ argsToTemplate(args,{exclude:displayModeWrapperStoryArgs}) }></nrcl-row-list-pagination> 
            `
        }
    }
}
