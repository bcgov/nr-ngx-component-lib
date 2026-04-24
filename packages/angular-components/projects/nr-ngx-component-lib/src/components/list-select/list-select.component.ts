import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, numberAttribute, OnChanges, Output, QueryList, SimpleChanges, ViewChild } from "@angular/core";
import { Observable, of } from "rxjs";
import { LoadRowListResult, RowListBase, RowListState } from "../../directives/row-list.base";
import { CodeDescription } from "../../utils/code-table.util";
import { MatColumnDef, MatTable } from "@angular/material/table";

@Component({
    selector: "nrcl-list-select",
    templateUrl: "./list-select.component.html",
    styleUrl: "./list-select.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
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
        // console.log(changes)

        if ( changes.options ) {
            this.refreshRowList()
        }
    }

    ngAfterContentInit(): void {
        // console.log('ngAfterContentInit')
        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));

        setTimeout( () => {
            this.displayColumns = this.displayColumnsProvider( [ ...this.defaultDisplayColumns ] )
            // console.log( this.displayColumns )
            // this.changeDetectorRef.detectChanges()            
        } )
    }

    get initialPageState(): RowListState<{}> {
        return {
            filter: {},
            pageSize: undefined,
            pageNumber: 1,
            sortActive: null,
            sortDirection: 'desc',
        }
    }

    fetchRowListPage(): Observable<CodeDescription[]> {
        return of( this.options.filter( o => this.filterOption( o ) ) )
    }
    
    displayRowListPage( res: CodeDescription[] ): LoadRowListResult<CodeDescription> {
        return {
            totalRowCount: res.length,
            rows: res
        }
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

    // private _optionsFilter: ( option: CodeDescription ) => boolean = () => true

    // setOptionsFilter( filter: ( option: CodeDescription ) => boolean ) {
    //     this._optionsFilter = filter
    // }
}
