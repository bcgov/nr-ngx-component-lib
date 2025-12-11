import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { useArgs } from '@storybook/preview-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { CellContentComponent } from '../cell-content/cell-content.component';
import { DesktopViewComponent, MobileViewComponent } from '../device-view/device-view.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { GapComponent } from '../gap/gap.component';
import { MatListModule } from '@angular/material/list';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RowListMobileComponent } from './row-list-mobile.component';
import { RowListSortingComponent } from '../row-list-sorting/row-list-sorting.component';
import { MatRadioModule } from '@angular/material/radio';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListArgs, rowListItems, rowListStory, seedRandom } from 'projects/nr-ngx-component-lib/story-util';

const meta: Meta<RowListMobileComponent> = {
    title: 'Row List (Mobile)',
    component: RowListMobileComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatButtonModule,
                MatFormFieldModule,                
                MatIconModule,
                MatInputModule,
                MatTooltipModule,
                ReactiveFormsModule,
                MatTableModule,
                MatSortModule,
                NgxPaginationModule,
                MatCardModule,
                MatListModule,  
                MatRadioModule
            ],
            // declare components that are used in the template
            declarations: [
                CellContentComponent,
                FilterSelectComponent,
                FilterContainerComponent,
                GapComponent,
                DesktopViewComponent,
                MobileViewComponent,
                DisplayModeWrapperComponent,
                RowListSortingComponent,
                RowListPaginationComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),      
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <display-mode-wrapper displayMode="mobile">
                        <nrcl-mobile-view>
                            ${ story }
                        </nrcl-mobile-view>
                    </display-mode-wrapper>
                `
            },
            ( context ) => {
                // return { displayMode: context.parameters.displayMode }
            }
        ),        
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
A container component for mobile card-based list layouts that provides consistent styling and structure for displaying data items.
This component wraps Material card components to create mobile-optimized list views with proper spacing and touch-friendly layouts.

## Purpose

The row list mobile component serves as a standardized wrapper for card-based data displays in mobile mode.
It handles card layout, spacing, and integrates with sorting and pagination components to create complete mobile list experiences.
Unlike the desktop table view, mobile lists use cards to present information in a more touch-friendly, vertically-stacked format.

## Features

- **Card Container**: Provides proper spacing and layout for mat-card elements
- **Touch-Friendly**: Optimized for mobile interaction with adequate spacing
- **Sorting Integration**: Works with the row list sorting component for mobile-friendly sort controls
- **Pagination Ready**: Designed to work with the row list pagination component
- **Flexible Layout**: Supports custom card structures with titles, content sections, and actions
- **Cell Content**: Integrates with cell-content component for consistent text handling

## Usage

### Basic Card List with Sorting and Pagination
\`\`\`typescript
import { RowListMobileComponent } from '@wf-design-system/row-list-mobile';
import { RowListSortingComponent } from '@wf-design-system/row-list-sorting';
import { RowListPaginationComponent } from '@wf-design-system/row-list-pagination';

@Component({
  template: \`
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
            <section title>
              <h2>{{ item.name }}</h2>
              <h3>{{ item.subtitle }}</h3>
            </section>
            
            <section actions>
              <button icon (click)="onEdit(item)">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
              </button>
            </section>
          </mat-card-title>
          
          <mat-card-content>
            <section>
              <mat-label>Status</mat-label>
              <nrcl-cell-content>{{ item.status }}</nrcl-cell-content>
            </section>
            
            <section>
              <mat-label>Date</mat-label>
              <nrcl-cell-content>{{ item.date }}</nrcl-cell-content>
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
  \`
})
export class MyMobileListComponent {
  items = [...];
  sortColumn = 'name';
  sortDirection = 'asc';
  sortOptions = [
    { description: 'Name', code: 'name' },
    { description: 'Date', code: 'date' }
  ];
  pageSize = 10;
  pageNumber = 1;
  totalItems = 50;
  
  onSortChange(event) {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
  }
  
  onPageSizeChange(newSize) {
    this.pageSize = newSize;
    this.pageNumber = 1;
  }
}
\`\`\`

### Card Structure Pattern
\`\`\`typescript
<nrcl-row-list-mobile>
  @for (item of items; track item.id) {
    <mat-card>
      <!-- Card Title: Primary info and actions -->
      <mat-card-title>
        <section title>
          <h2>Primary heading</h2>
          <h3>Secondary heading</h3>
        </section>
        
        <section actions>
          <button icon>
            <mat-icon>action_icon</mat-icon>
            <span>Action</span>
          </button>
        </section>
      </mat-card-title>
      
      <!-- Card Content: Detail fields -->
      <mat-card-content>
        <section>
          <mat-label>Field Label</mat-label>
          <nrcl-cell-content>{{ item.value }}</nrcl-cell-content>
        </section>
      </mat-card-content>
    </mat-card>
  }
</nrcl-row-list-mobile>
\`\`\`

### With Device View for Responsive Layouts
\`\`\`typescript
<nrcl-desktop-view>
  <nrcl-row-list-desktop>
    <mat-table [dataSource]="items">
      <!-- Desktop table columns -->
    </mat-table>
  </nrcl-row-list-desktop>
</nrcl-desktop-view>

<nrcl-mobile-view>
  <nrcl-row-list-sorting
    [sortColumn]="sortColumn"
    [sortColumnOptions]="sortOptions"
    [sortDirection]="sortDirection"
    (sortChange)="onSortChange($event)">
  </nrcl-row-list-sorting>
  
  <nrcl-gap vertical/>
  
  <nrcl-row-list-mobile>
    @for (item of items; track item.id) {
      <mat-card>
        <!-- Card content -->
      </mat-card>
    }
  </nrcl-row-list-mobile>
  
  <nrcl-row-list-pagination
    [pageSize]="pageSize"
    [pageNumber]="pageNumber">
  </nrcl-row-list-pagination>
</nrcl-mobile-view>
\`\`\`

## Integration Points

- **mat-card**: Angular Material card component for individual items
- **nrcl-row-list-sorting**: Mobile-friendly sorting controls
- **ngx-pagination**: Pagination pipe for data slicing
- **nrcl-cell-content**: Cell content component for text handling
- **nrcl-row-list-pagination**: Pagination controls component

## Card Layout Sections

### mat-card-title
Contains the primary information and action buttons.
Use \`<section title>\` for headings and \`<section actions>\` for buttons.

### mat-card-content
Contains detail fields in label-value pairs.
Each field should be wrapped in a \`<section>\` with \`<mat-label>\` and content.

## Common Use Cases

- User lists on mobile devices
- Equipment or inventory lists
- Report data displays
- Any list data requiring mobile card layout
- Lists that need sorting and pagination on mobile

## Best Practices

- Always pair with \`nrcl-row-list-sorting\` at the top for mobile sort controls
- Use \`nrcl-cell-content\` for card content to handle text overflow
- Combine with \`nrcl-row-list-pagination\` for paginated lists
- Use \`nrcl-gap vertical\` between sorting, list, and pagination components
- Use with \`nrcl-mobile-view\` to create responsive desktop/mobile layouts
- Keep action buttons in the card title for easy thumb access
- Limit the number of fields shown to avoid overly tall cards

## Interactive Demo

Adjust row count to test pagination behavior.
Change page size to see how the card list adapts.
Use the sorting controls to change sort order.
Use the pagination controls to navigate through pages.                
                `
            }
        }
    },  
}

export default meta;
// type Story = StoryObj<RowListMobileComponent>;

export const Primary: StoryObj<RowListMobileComponent & RowListArgs> = {
    ...rowListStory,
    render: ( args, context ) => {
        const [, setArgs] = useArgs();
        return {
            props: {
                ...args,
                rows: rowListItems( args.rowCount ),
                sortColumnOptions: [
                    { description: 'Make',                    code: 'make' },
                    { description: 'Model',                   code: 'model' },
                    { description: 'Aircraft Classification', code: 'classification' },
                ],
                onPageNumberChange: ( ev ) => { 
                    setArgs( { 
                        pageNumber: ev 
                    } )
                },
                onPageSizeChange: ( ev ) => {
                    setArgs( { 
                        pageSize: ev, 
                        pageNumber: 1 
                    } )
                },
                onSortChange: ( ev ) => {
                    setArgs( { 
                        sortColumn: ev.active || null,
                        sortDirection: ev.direction,
                    } )
                }
            },
            template: `
                <nrcl-row-list-sorting
                    [sortColumn]="sortColumn"
                    [sortColumnOptions]="sortColumnOptions"
                    [sortDirection]="sortDirection"
                    (sortChange)="onSortChange( $event )"
                ></nrcl-row-list-sorting>

                <nrcl-gap vertical/>

                <nrcl-row-list-mobile>
                    @for ( item of rows | paginate: { 
                        id: 'mobile-story', 
                        itemsPerPage: pageSize, 
                        currentPage: pageNumber, 
                        totalItems: totalRowCount 
                    }; track item.id ) {
                        <mat-card>
                            <mat-card-title>
                                <section title>
                                    <h2><nrcl-cell-content>{{ item.make }}</nrcl-cell-content></h2>
                                    <h3><nrcl-cell-content>{{ item.model }}</nrcl-cell-content></h3>
                                </section>

                                <section actions>
                                    <button icon>
                                        <mat-icon>edit</mat-icon>
                                        <span>Edit</span>
                                    </button>

                                    <button icon>
                                        <mat-icon>delete</mat-icon>
                                        <span>Delete</span>
                                    </button>
                                </section>
                            </mat-card-title>

                            <mat-card-content>
                                <section>
                                    <mat-label>Category</mat-label>
                                    <nrcl-cell-content>{{ item.category }}</nrcl-cell-content>
                                </section>

                                <section>
                                    <mat-label>Classification</mat-label>
                                    <nrcl-cell-content>{{ item.classification }}</nrcl-cell-content>
                                </section>

                                <section>
                                    <mat-label>Crew #</mat-label>
                                    <nrcl-cell-content>{{ item.crewNumber }}</nrcl-cell-content>
                                </section>                                            
                            </mat-card-content>
                        </mat-card>
                    }
                </nrcl-row-list-mobile>

                <nrcl-gap vertical/>

                <nrcl-row-list-pagination
                    paginationId="mobile-story"
                    [pageSize]="pageSize"
                    [pageNumber]="pageNumber"
                    [rowCount]="rowCount"
                    (pageNumberChange)="onPageNumberChange( $event )"
                    (pageSizeChange)="onPageSizeChange( $event )"
                ></nrcl-row-list-pagination>
            `
        }
    }
}
