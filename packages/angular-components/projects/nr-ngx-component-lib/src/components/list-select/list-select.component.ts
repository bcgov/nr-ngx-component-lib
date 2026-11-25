import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild } from "@angular/core";
import { MatSortModule } from "@angular/material/sort";
import { MatColumnDef, MatTable, MatTableModule } from "@angular/material/table";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable, of } from "rxjs";
import { InitialState } from "../../directives/pagination.base";
import { RowListBase } from "../../directives/row-list.base";
import { CodeDescription } from "../../utils/code-table.util";
import { CellContentComponent } from "../cell-content/cell-content.component";
import { FilterSearchComponent } from "../filter-search/filter-search.component";
import { FiltersPanelComponent } from "../filters-panel/filters-panel.component";
import { IndicatorSelectComponent } from "../indicator-select/indicator-select.component";
import { RowListDesktopComponent } from "../row-list-desktop/row-list-desktop.component";
import { RowListPaginationComponent } from "../row-list-pagination/row-list-pagination.component";
import { RowListSortingComponent } from "../row-list-sorting/row-list-sorting.component";

@Component({
    selector: "nrcl-list-select",
    templateUrl: "./list-select.component.html",
    styleUrl: "./list-select.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RowListDesktopComponent,
        RowListSortingComponent,
        RowListPaginationComponent,
        MatTableModule,
        CellContentComponent,
        NgxPaginationModule,
        MatSortModule,
        IndicatorSelectComponent,
        FiltersPanelComponent,
        FilterSearchComponent,
    ]
})
export class ListSelectComponent<T> extends RowListBase<{},CodeDescription> implements OnChanges, AfterContentInit {
    @Input() options: CodeDescription[]
    @Input() value: string[]
    @Input() descriptionLabel = 'Description'
    @Input( { transform: booleanAttribute } ) single 
    @Input() noRowsMessage = "No items have been added."
    @Input() displayColumnsProvider: ( cols: string[] ) => string[] = ( cols ) => cols
    @Input() filterProvider: ( option: CodeDescription ) => boolean = () => true
   
    @Output() valueChange = new EventEmitter<string[]>();
    @Output() filterClear = new EventEmitter<void>();
    
    @ViewChild( MatTable, {static: true} ) table!: MatTable<T>;
    
    @ContentChildren( MatColumnDef ) columnDefs!: QueryList<MatColumnDef>;
    
    searchText
    searchRegexp: RegExp
    defaultDisplayColumns = [ 'description', 'addRemove' ]
    displayColumns = []

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.options ) {
            this.refreshRowList()
        }
    }

    ngAfterContentInit(): void {
        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));

        setTimeout( () => {
            this.displayColumns = this.displayColumnsProvider( [ ...this.defaultDisplayColumns ] )
        } )
    }

    getInitialPageState(): InitialState<{}> {
        return {
            instance: '', // state not saved
            filter: {},
            pageConfig: {
                pageSize: 0,
                pageNumber: 1,
                sortActive: '',
                sortDirection: 'desc',
            }
        }
    }

    fetchRowListPage(): Observable<CodeDescription[]> {
        return of( this.options.filter( o => this.filterOption( o ) ) )
    }
    
    parseRows( res: any ): CodeDescription[] {
        return res
    }

    parseTotalRowCount( res: any ): number {
        return res.length
    }

    isSelected( item: CodeDescription ) {
        return this.value?.includes( item.code )
    }

    onRowClick( item: CodeDescription ) {       
        if ( this.single ) {
            if ( this.isSelected( item ) ) {
                this.value = []
            }
            else {
                this.value = [ item.code ]
            }
        }
        else {
            let val = this.value || []

            if ( this.isSelected( item ) ) {
                this.value = val.filter( c => c != item.code )
            }
            else {
                this.value = val.concat( item.code )
            }
        }

        this.valueChange.emit( this.value )
    }    

    onClearFilters() {
        this.searchText = null
        this.searchRegexp = null
        this.filterClear.emit()
        this.refreshRowList()
    }

    onSearchTextChange( ev ) {
        this.searchText = ev

        let t = this.searchText?.trim()
        if ( t ) {
            t = t.toLowerCase().replace( /\s+/g, '.*' )
            this.searchRegexp = new RegExp( t, 'i' ) 
        }
        else {
            this.searchRegexp = null
        }

        this.refreshRowList()
    }

    filterOption( option: CodeDescription ): boolean {
        if ( this.searchRegexp && !this.searchRegexp.test( option.description ) ) return false

        return this.filterProvider( option )
    }
}
