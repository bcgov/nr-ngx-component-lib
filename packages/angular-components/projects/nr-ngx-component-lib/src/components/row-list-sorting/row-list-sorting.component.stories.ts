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
import { RowListSortingComponent } from './row-list-sorting.component';
import { MatRadioModule } from '@angular/material/radio';

const meta: Meta<RowListSortingComponent> = {
    title: 'Row List Sorting',
    component: RowListSortingComponent,
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
                MatRadioModule
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
A mobile-optimized sorting control component that provides dropdown-based sort column selection and direction toggle.
Designed specifically for mobile list views where traditional table header sorting isn't available.

## Purpose

The row list sorting component provides a mobile-friendly alternative to desktop table header sorting.
Instead of clickable column headers, it uses a dropdown to select the sort field and buttons to toggle between ascending and descending order.
This component is typically used above mobile card lists to give users control over how items are ordered.

## Features

- **Sort Column Selection**: Dropdown menu to choose which field to sort by
- **Direction Toggle**: Buttons to switch between ascending and descending order
- **Visual Indicators**: Icons showing current sort direction
- **Radio Group Interface**: Clear selection state for sort column
- **Responsive Layout**: Adapts layout based on display mode
- **Event Emission**: Emits sort change events compatible with Angular Material's MatSort format

## Usage

### Basic Sorting Control
\`\`\`typescript
import { RowListSortingComponent } from '@wf-design-system/row-list-sorting';

@Component({
  template: \`
    <nrcl-row-list-sorting
      [sortColumn]="sortColumn"
      [sortColumnOptions]="sortOptions"
      [sortDirection]="sortDirection"
      (sortChange)="onSortChange($event)">
    </nrcl-row-list-sorting>
  \`
})
export class MyMobileListComponent {
  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortOptions = [
    { description: 'Name', code: 'name' },
    { description: 'Date Created', code: 'dateCreated' },
    { description: 'Status', code: 'status' }
  ];
  
  onSortChange(event: { active: string, direction: 'asc' | 'desc' }) {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    // Apply sorting to your data
    this.loadData();
  }
}
\`\`\`

### With Mobile Card List
\`\`\`typescript
<nrcl-mobile-view>
  <nrcl-row-list-sorting
    [sortColumn]="sortColumn"
    [sortColumnOptions]="sortOptions"
    [sortDirection]="sortDirection"
    (sortChange)="onSortChange($event)">
  </nrcl-row-list-sorting>
  
  <nrcl-gap vertical/>
  
  <nrcl-row-list-mobile>
    @for (item of sortedItems; track item.id) {
      <mat-card>
        <!-- Card content -->
      </mat-card>
    }
  </nrcl-row-list-mobile>
</nrcl-mobile-view>
\`\`\`

### Sort Column Options Format
\`\`\`typescript
interface SortColumnOption {
  description: string;  // Display text shown to user
  code: string;        // Field name used for sorting
}

const sortOptions: SortColumnOption[] = [
  { description: 'Equipment Name', code: 'name' },
  { description: 'Model Number', code: 'modelNumber' },
  { description: 'Last Updated', code: 'updatedAt' }
];
\`\`\`

### Complete Mobile List with Sorting and Pagination
\`\`\`typescript
<nrcl-mobile-view>
  <nrcl-row-list-sorting
    [sortColumn]="sortColumn"
    [sortColumnOptions]="sortOptions"
    [sortDirection]="sortDirection"
    (sortChange)="onSortChange($event)">
  </nrcl-row-list-sorting>
  
  <nrcl-gap vertical/>
  
  <nrcl-row-list-mobile>
    @for (item of items | paginate: {
      itemsPerPage: pageSize,
      currentPage: pageNumber
    }; track item.id) {
      <mat-card>
        <mat-card-title>
          <h2>{{ item.name }}</h2>
        </mat-card-title>
        <mat-card-content>
          <section>
            <mat-label>Status</mat-label>
            <span>{{ item.status }}</span>
          </section>
        </mat-card-content>
      </mat-card>
    }
  </nrcl-row-list-mobile>
  
  <nrcl-gap vertical/>
  
  <nrcl-row-list-pagination
    [pageSize]="pageSize"
    [pageNumber]="pageNumber"
    [rowCount]="totalItems"
    (pageNumberChange)="pageNumber = $event"
    (pageSizeChange)="onPageSizeChange($event)">
  </nrcl-row-list-pagination>
</nrcl-mobile-view>
\`\`\`

## Inputs

- **sortColumn** (string): Currently selected sort field (matches a \`code\` in sortColumnOptions)
- **sortColumnOptions** (SortColumnOption[]): Array of available sort fields with display names
- **sortDirection** ('asc' | 'desc'): Current sort direction (ascending or descending)

## Outputs

- **sortChange** ({ active: string, direction: 'asc' | 'desc' }): Emits when user changes sort field or direction

## Event Format

The \`sortChange\` event uses the same format as Angular Material's \`MatSort\`:
\`\`\`typescript
{
  active: 'fieldName',      // The selected sort column code
  direction: 'asc' | 'desc' // The selected sort direction
}
\`\`\`

This allows easy integration with existing sort logic that may also handle desktop table sorting.

## Common Use Cases

- Mobile card list sorting
- Alternative to clickable table headers on mobile
- Any mobile list requiring user-controlled sort order
- Lists that need both field and direction selection

## Best Practices

- Place the sorting component above the list it controls
- Use \`nrcl-gap vertical\` to separate from the list content
- Provide clear, user-friendly descriptions in sortColumnOptions
- Keep the number of sort options reasonable (3-6 options ideal)
- Ensure sort field codes match your data model property names
- Use with \`nrcl-mobile-view\` to separate mobile and desktop experiences
- Consider providing a sensible default sort (e.g., by name or date)

## Desktop vs Mobile Pattern

For responsive lists, use table header sorting on desktop and this component on mobile:

\`\`\`typescript
<nrcl-desktop-view>
  <mat-table matSort (matSortChange)="onSortChange($event)">
    <ng-container matColumnDef="name">
      <mat-header-cell *matHeaderCellDef mat-sort-header>
        Name
      </mat-header-cell>
      <!-- cells -->
    </ng-container>
  </mat-table>
</nrcl-desktop-view>

<nrcl-mobile-view>
  <nrcl-row-list-sorting
    [sortColumn]="sortColumn"
    [sortColumnOptions]="sortOptions"
    [sortDirection]="sortDirection"
    (sortChange)="onSortChange($event)">
  </nrcl-row-list-sorting>
  
  <nrcl-row-list-mobile>
    <!-- cards -->
  </nrcl-row-list-mobile>
</nrcl-mobile-view>
\`\`\`

## Integration Points

- **nrcl-row-list-mobile**: Mobile card list container
- **nrcl-mobile-view**: Display mode wrapper for mobile-only display
- **nrcl-gap**: Spacing component for vertical gaps
- **Angular Material MatSort**: Compatible event format for shared sort logic

## Interactive Demo

Select different sort columns from the dropdown to change the sort field.
Click the ascending/descending buttons to toggle sort direction.
Toggle display mode to see how the component adapts its layout.
Watch the Actions panel to see when \`sortChange\` events fire with their values.
                `
            }
        }
    }
}

export default meta;

export const Primary: StoryObj<RowListSortingComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        sortColumnOptions: [
            { description: 'Make',                    code: 'make' },
            { description: 'Model',                   code: 'model' },
            { description: 'Aircraft Classification', code: 'classification' },
        ],
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-row-list-sorting ${ argsToTemplate(args,{exclude:displayModeWrapperStoryArgs}) }></nrcl-row-list-sorting> 
            `
        }
    }
}
