import { AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, inject, Output } from "@angular/core";
import { SortDirection } from "@angular/material/sort";
import { Observable } from "rxjs";
import { PageStateService } from "../services/page-state.service";
import { ObservableAborter, Aborted } from "../utils/row-list.util";
import { CodeDescription } from "../public-api";

export type RowListState<F> = {
    filter: F
    pageSize: number
    pageNumber: number
    sortActive: string 
    sortDirection: SortDirection
}

export type LoadRowListResult<R> = { 
    rows: R[], 
    totalRowCount: number 
}

@Directive()
export class RowListBase<F,R,L=any> implements RowListState<F>, AfterViewInit {
    @Output() isLoadingChange = new EventEmitter<boolean>()
    
    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading( v: boolean ) { 
        if ( v == this._isLoading ) return        
        this._isLoading = v 
        this.isLoadingChange.emit( v )
    }  

    rows: R[] = []
    totalRowCount: number

    filter: F
    pageSize: number
    pageNumber: number
    sortActive: string 
    sortDirection: SortDirection

    sortColumns: CodeDescription[]
    summaryMobile: string
    showPagingMobile: boolean
    
    pageStateService = inject( PageStateService )
    changeDetectorRef = inject( ChangeDetectorRef )

    private _loadRowListRequest: ObservableAborter<L>

    constructor() {
        this.initializeRowList()
    }

    initializeRowList() {
        this.loadPageState()        
    }

    ngAfterViewInit(): void {
        this.refreshRowList()
    }

    refreshRowList(): Promise<void> {
        this.isLoading = true

        return Promise.resolve()
            .then( () => {
                return this.loadRowList()
            } )
            .then( ( { rows, totalRowCount } ) => {
                this.rows = rows
                this.totalRowCount = totalRowCount
                this.isLoading = false
            } )
            .catch( ( e ) => {
                if ( e instanceof Aborted ) return

                this.loadRowListPageFailed( e )
                this.isLoading = false
            } )
            .finally( () => {
                this.updateSummaryMobile()
                this.changeDetectorRef.detectChanges()
            } )
    }

    loadRowList(): Promise<LoadRowListResult<R>> {
        if ( this._loadRowListRequest )
            this._loadRowListRequest.abort()

        this._loadRowListRequest = new ObservableAborter<L>( () => {        
            return this.fetchRowListPage()
        } )

        return this._loadRowListRequest.promise
            .then( res => {
                return this.displayRowListPage( res )
            } )
    }

    fetchRowListPage(): Observable<L> {
        throw 'unimplemented'
    }
    
    displayRowListPage( res: L ): LoadRowListResult<R> {
        throw 'unimplemented'
    }

    loadRowListPageFailed( error ) {
        console.warn( error )
        this.rows = []
        this.totalRowCount = 0
    }

    onFilterChange( ev ) {
        this.filter = ev
        this.pageNumber = 1

        this.refreshRowList()
            .then( () => {
                this.savePageState()
                this.updateSummaryMobile()
            } )
    }

    onSortChange( ev ) {
        this.sortActive = ev.active
        this.sortDirection = ev.direction
        this.pageNumber = 1

        this.refreshRowList()
            .then( () => {
                this.savePageState()
                this.updateSummaryMobile()
            } )
    }

    onPageNumberChange( ev ) {
        this.pageNumber = ev

        this.refreshRowList()
            .then( () => {
                this.savePageState()
                this.updateSummaryMobile()
            } )
    }

    onPageSizeChange( ev ) {
        this.pageSize = ev 
        this.pageNumber = 1

        this.refreshRowList()
            .then( () => {
                this.savePageState()
                this.updateSummaryMobile()
            } )
    }

    updateSummaryMobile() {
        [ this.summaryMobile, this.showPagingMobile ] = makeSummary( this.totalRowCount, this.pageNumber, this.pageSize )
    }

    get initialPageState(): RowListState<F> {
        throw 'unimplemented'
    }

    loadPageState() {
        let state = this.pageStateService.getPageState<RowListState<F>>( this.constructor, this.initialPageState )

        this.filter = state.filter
        this.pageSize = state.pageSize
        this.pageNumber = state.pageNumber
        this.sortActive = state.sortActive
        this.sortDirection = state.sortDirection
    }

    savePageState() {
        let state: RowListState<F> = JSON.parse( JSON.stringify( {
            filter: this.filter,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
            sortActive: this.sortActive,
            sortDirection: this.sortDirection,
        } ) )
        
        this.pageStateService.setPageState<RowListState<F>>( this.constructor, state )
    }
}

export function makeSummary( rowCount, pageNumber, pageSize ): [ string, boolean ] {
    if ( rowCount && pageSize ) {
        let pageCount = Math.ceil( rowCount / pageSize )

        let first = ( Math.min( pageCount, pageNumber ) - 1 ) * pageSize + 1
        let last = Math.min( first + pageSize - 1, rowCount )

        return [ `Showing ${ first } to ${ last } of ${ rowCount }`, true ]
    }
    else {
        return [ "No records to display.", false ]
    }
}
