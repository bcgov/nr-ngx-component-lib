import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { useArgs } from '@storybook/preview-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { RowListArgs, rowListItems, rowListStory, seedRandom } from 'projects/nr-ngx-component-lib/story-util';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { CellContentComponent } from '../cell-content/cell-content.component';
import { DesktopViewComponent, MobileViewComponent } from '../device-view/device-view.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { GapComponent } from '../gap/gap.component';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListDesktopComponent } from './row-list-desktop.component';

const meta: Meta<RowListDesktopComponent> = {
    title: 'Row List (Desktop)',
    component: RowListDesktopComponent,
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
                MatListModule,  
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
                RowListPaginationComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <display-mode-wrapper displayMode="desktop">
                        <nrcl-desktop-view>
                            ${ story }
                        </nrcl-desktop-view>
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
A container component for desktop table layouts that provides consistent styling and structure for Angular Material tables.
This component wraps mat-table to ensure proper layout, scrolling behavior, and visual consistency across desktop list views.

## Purpose

The row list desktop component serves as a standardized wrapper for tabular data displays in desktop mode.
It handles table layout, scrolling containers, and integrates with sorting and pagination components to create complete list experiences.

## Features

- **Table Container**: Provides proper scrolling and layout for mat-table
- **Sticky Headers**: Supports sticky header rows that remain visible during scrolling
- **Sorting Integration**: Works seamlessly with Angular Material's matSort directive
- **Pagination Ready**: Designed to work with the row list pagination component
- **Cell Content**: Integrates with cell-content component for consistent text truncation and tooltips
- **Responsive Width**: Table columns can be configured with min/max widths

## Usage

### Basic Table with Sorting and Pagination
\`\`\`typescript
import { RowListDesktopComponent } from '@wf-design-system/row-list-desktop';
import { RowListPaginationComponent } from '@wf-design-system/row-list-pagination';

@Component({
  template: \`
    <nrcl-row-list-desktop>
      <mat-table 
        [dataSource]="items | paginate: { 
          itemsPerPage: pageSize, 
          currentPage: pageNumber 
        }"
        matSort
        (matSortChange)="onSortChange($event)">
        
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef mat-sort-header>
            Name
          </mat-header-cell>
          <mat-cell *matCellDef="let item">
            <nrcl-cell-content tooltip>{{ item.name }}</nrcl-cell-content>
          </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="email">
          <mat-header-cell *matHeaderCellDef mat-sort-header>
            Email
          </mat-header-cell>
          <mat-cell *matCellDef="let item">
            <nrcl-cell-content tooltip>{{ item.email }}</nrcl-cell-content>
          </mat-cell>
        </ng-container>
        
        <mat-header-row *matHeaderRowDef="columns; sticky: true"></mat-header-row>
        <mat-row *matRowDef="let item; columns: columns;" 
                 (click)="onRowClick(item)"></mat-row>
      </mat-table>
    </nrcl-row-list-desktop>
    
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
export class MyListComponent {
  items = [...];
  columns = ['name', 'email'];
  pageSize = 25;
  pageNumber = 1;
  totalItems = 100;
  
  onSortChange(event) {
    // Handle sorting
  }
  
  onPageSizeChange(newSize) {
    this.pageSize = newSize;
    this.pageNumber = 1; // Reset to first page
  }
}
\`\`\`

### Column Width Configuration
\`\`\`typescript
// In component styles
.mat-mdc-table {
  .mat-column-name {
    min-width: 200px;
    max-width: 300px;
  }
  
  .mat-column-email {
    min-width: 250px;
    max-width: 400px;
  }
  
  .mat-column-status {
    min-width: 100px;
    max-width: 150px;
  }
}
\`\`\`

### With Device View for Responsive Layouts
\`\`\`typescript
<nrcl-desktop-view>
  <nrcl-row-list-desktop>
    <mat-table [dataSource]="items">
      <!-- Desktop table columns -->
    </mat-table>
  </nrcl-row-list-desktop>
  
  <nrcl-row-list-pagination 
    [pageSize]="pageSize" 
    [pageNumber]="pageNumber">
  </nrcl-row-list-pagination>
</nrcl-desktop-view>

<nrcl-mobile-view>
  <nrcl-row-list-mobile>
    <!-- Mobile card layout -->
  </nrcl-row-list-mobile>
</nrcl-mobile-view>
\`\`\`

## Integration Points

- **mat-table**: Angular Material table component
- **matSort**: Angular Material sorting directive
- **ngx-pagination**: Pagination pipe for data slicing
- **nrcl-cell-content**: Cell content component for text truncation and tooltips
- **nrcl-row-list-pagination**: Pagination controls component

## Common Use Cases

- User lists with sortable columns
- Equipment or inventory tables
- Report data displays
- Any tabular data requiring desktop table layout
- Lists that need sorting and pagination

## Best Practices

- Always use \`nrcl-cell-content\` for table cells to handle text overflow
- Set explicit column widths using CSS for consistent layouts
- Enable sticky headers with \`sticky: true\` on header row definition
- Combine with \`nrcl-row-list-pagination\` for paginated lists
- Use with \`nrcl-desktop-view\` to create responsive desktop/mobile layouts

## Interactive Demo

Adjust row count to test pagination behavior.
Change page size to see how the table adapts.
Click column headers to test sorting functionality.
Use the pagination controls to navigate through pages
                `
            }
        }
    },  
}

export default meta;

export const Primary: StoryObj<RowListDesktopComponent & RowListArgs> = {
    ...rowListStory,
    render: ( args ) => {
        const [, setArgs] = useArgs();

        return {
            styles: [`
                .mat-mdc-table {
                    .mat-column-make {
                        min-width: 200px;   
                        max-width: 200px;
                    }

                    .mat-column-model {
                        min-width: 200px;
                        max-width: 200px;
                    }

                    .mat-column-classification {
                        min-width: 200px;
                        max-width: 300px;
                    }

                    .mat-column-category {
                        min-width: 200px;
                        max-width: 200px;
                    }

                    .mat-column-crewNumber {
                        min-width: 100px;
                        max-width: 100px;
                    }
                }
            `],
            props: {
                ...args,
                rows: rowListItems( args.rowCount ),
                columns: [
                    'make',
                    'model',
                    'classification',
                    'category',
                    'crewNumber'
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
                <nrcl-row-list-desktop>
                    <mat-table
                        [dataSource]="rows | paginate: { 
                            id: 'desktop-story', 
                            itemsPerPage: pageSize, 
                            currentPage: pageNumber, 
                            totalItems: rowCount 
                        }"
                        matSort
                        [matSortActive]="sortColumn"
                        [matSortDirection]="sortDirection"
                        (matSortChange)="onSortChange( $event )">
                    >
                        <ng-container matColumnDef="make">
                            <mat-header-cell *matHeaderCellDef mat-sort-header>
                                Make
                            </mat-header-cell>
                            <mat-cell *matCellDef="let item">
                                <nrcl-cell-content tooltip>{{ item.make }}</nrcl-cell-content>
                            </mat-cell>
                        </ng-container>

                        <ng-container matColumnDef="model">
                            <mat-header-cell *matHeaderCellDef mat-sort-header>
                                Model
                            </mat-header-cell>
                            <mat-cell *matCellDef="let item">
                                <nrcl-cell-content tooltip>{{ item.model }}</nrcl-cell-content>
                            </mat-cell>
                        </ng-container>

                        <ng-container matColumnDef="classification">
                            <mat-header-cell *matHeaderCellDef mat-sort-header>
                                Classification
                            </mat-header-cell>
                            <mat-cell *matCellDef="let item">
                                <nrcl-cell-content tooltip>{{ item.classification }}</nrcl-cell-content>
                            </mat-cell>
                        </ng-container>

                        <ng-container matColumnDef="category">
                            <mat-header-cell *matHeaderCellDef mat-sort-header>
                                Category
                            </mat-header-cell>
                            <mat-cell *matCellDef="let item">
                                <nrcl-cell-content tooltip>{{ item.category }}</nrcl-cell-content>
                            </mat-cell>
                        </ng-container>

                        <ng-container matColumnDef="crewNumber">
                            <mat-header-cell *matHeaderCellDef mat-sort-header>
                                Crew Count
                            </mat-header-cell>
                            <mat-cell *matCellDef="let item">
                                <nrcl-cell-content tooltip>{{ item.crewNumber }}</nrcl-cell-content>
                            </mat-cell>
                        </ng-container>

                        <ng-container matColumnDef="dummy">
                            <mat-header-cell *matHeaderCellDef></mat-header-cell>
                            <mat-cell *matCellDef="let item"></mat-cell>
                        </ng-container>

                        <mat-header-row
                            *matHeaderRowDef="columns; sticky: true"
                        ></mat-header-row>

                        <mat-row
                            *matRowDef="let item; columns: columns;"
                            (click)="onEditClick( item )"
                        ></mat-row>
                    </mat-table>
                </nrcl-row-list-desktop>

                <nrcl-gap vertical/>

                <nrcl-row-list-pagination
                    paginationId="desktop-story"
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
