import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, numberAttribute, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Observable, of } from "rxjs";
import { LoadRowListResult, RowListBase, RowListState } from "../../directives/row-list.base";
import { CodeDescription } from "../../utils/code-table.util";

@Component({
    selector: "nrcl-list-select",
    templateUrl: "./list-select.component.html",
    styleUrl: "./list-select.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSelectComponent extends RowListBase<{},CodeDescription> implements OnChanges {
    @Input() options: CodeDescription[]
    @Input() value: string[]
    @Input() descriptionLabel = 'Description'
    @Input( { transform: booleanAttribute } ) single 
    @Input() noRowsMessage = "No items have been added."
   
    @Output() valueChange = new EventEmitter<string[]>();
    
    searchText
    searchRegexp: RegExp
    displayColumns = [ 'description', 'addRemove' ]

    ngOnChanges( changes: SimpleChanges ): void {
        console.log(changes)

        if ( changes.options ) {
            this.refreshRowList()
        }
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
        console.log(res)
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
        this.refreshRowList()
    }

    onSearchTextChange( ev ) {
        this.searchText = ev

        let t = this.searchText?.trim()
        if ( t ) {
            t = t.toLowerCase().replace( /\s+/g, '.*' )
            this.searchRegexp = new RegExp( t, 'gi' ) 
        }
        else {
            this.searchRegexp = null
        }

        this.refreshRowList()
    }

    filterOption( option: CodeDescription ): boolean {
        if ( this.searchRegexp?.test( option.description ) ) return true

        return this._optionsFilter( option )
    }

    private _optionsFilter: ( option: CodeDescription ) => boolean = () => true

    setOptionsFilter( filter: ( option: CodeDescription ) => boolean ) {
        this._optionsFilter = filter
    }
}
