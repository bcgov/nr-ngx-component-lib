import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { RowListArgs, rowListItems, rowListStory } from 'projects/nr-ngx-component-lib/story-util';
import { useArgs } from 'storybook/preview-api';
import { ButtonComponent } from '../button/button.component';
import { CellContentComponent } from '../cell-content/cell-content.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { GapComponent } from '../gap/gap.component';
import { IconComponent } from '../icon/icon.component';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from '../row-list-sorting/row-list-sorting.component';
import { RowListMobileComponent } from './row-list-mobile.component';

const meta: Meta<RowListMobileComponent> = {
    title: 'Content/Row List/Row List (Mobile)',
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
                MatRadioModule,
                CellContentComponent,
                FilterSelectComponent,
                FilterContainerComponent,
                GapComponent,
                RowListSortingComponent,
                RowListPaginationComponent,
                IconComponent,
                ButtonComponent
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
                    <display-mode-wrapper displayMode="mobile">
                        ${ story }
                    </display-mode-wrapper>
                `
            },
            ( context ) => {
                // return { displayMode: context.parameters.displayMode }
            }
        ),        
    ],
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
                                    <h2>{{ item.make }}</h2>
                                    <h3>{{ item.model }}</h3>
                                </section>

                                <section actions>
                                    <nrcl-button compact
                                        label="Edit"
                                        icon="edit"
                                    ></nrcl-button>

                                    <nrcl-button compact
                                        label="Delete"
                                        icon="delete"
                                    ></nrcl-button>
                                </section>
                            </mat-card-title>

                            <mat-card-content>
                                <section>
                                    <mat-label>Category</mat-label>
                                    <div class="value">{{ item.category }}</div>
                                </section>

                                <section>
                                    <mat-label>Classification</mat-label>
                                    <div class="value">{{ item.classification }}</div>
                                </section>

                                <section>
                                    <mat-label>Crew #</mat-label>
                                    <div class="value">{{ item.crewNumber }}</div>
                                </section>                                            

                                <section>
                                    <mat-label>Empty</mat-label>
                                    <div class="value"></div>
                                </section>                                            
                                <section>
                                    <mat-label>Empty</mat-label>
                                    <div class="value"></div>
                                </section>                                            
                                <section>
                                    <mat-label>Empty</mat-label>
                                    <div class="value"></div>
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
