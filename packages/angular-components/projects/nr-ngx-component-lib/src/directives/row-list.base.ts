import { AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, inject, Output } from "@angular/core";
import { Sort, SortDirection } from "@angular/material/sort";
import { Observable } from "rxjs";
import { PageStateService } from "../services/page-state.service";
import { Aborted, ObservableAborter } from "../utils/row-list.util";
import { NrclBase } from "./nrcl.base";

export type RowListPageConfig = {    
    pageSize: number
    pageNumber: number
    sortActive: string 
    sortDirection: SortDirection
}

export type RowListState<F> = { pageConfig: RowListPageConfig, filter: F }

@Directive()
export abstract class RowListBase<F,R,L=any> extends NrclBase implements AfterViewInit {
    pageStateService = inject( PageStateService )
    changeDetectorRef = inject( ChangeDetectorRef )

    @Output() isLoadingChange = new EventEmitter<boolean>()
    
    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading( v: boolean ) { 
        if ( v == this._isLoading ) return        
        this._isLoading = v 
        this.isLoadingChange.emit( v )
    }  

    private _rows: R[] = []
    get rows(): R[] { return this._rows }

    private _totalRowCount: number = 0
    get totalRowCount(): number { return this._totalRowCount }

    private _pageConfig: RowListPageConfig = {
        pageSize:       0,
        pageNumber:     1,
        sortActive:     '',
        sortDirection:  'asc'
    }
    get pageSize(): number              { return this._pageConfig.pageSize }
    get pageNumber(): number            { return this._pageConfig.pageNumber }
    get sortActive(): string            { return this._pageConfig.sortActive }
    get sortDirection(): SortDirection  { return this._pageConfig.sortDirection }

    private _filter?: F
    get filter(): F {
        return this._filter as F
    }

    private _loadRowListRequest?: ObservableAborter<L> 

    constructor() {
        super()
        this.loadPageState()        
    }

    ngAfterViewInit(): void {
        this.refreshRowList()
    }

    refreshRowList(): Promise<void> {
        this.isLoading = true

        if ( this._loadRowListRequest )
            this._loadRowListRequest.abort()

        this._loadRowListRequest = new ObservableAborter<L>( () => {        
            return this.fetchRowListPage()
        } )

        return this._loadRowListRequest.promise
            .then( res => {
                this._totalRowCount = this.parseTotalRowCount( res )
                this._rows = this.parseRows( res )
            } )
            .catch( ( e ) => {
                if ( e instanceof Aborted ) return

                this.loadRowListPageFailed( e )
            } )
            .finally( () => {
                this.isLoading = false
                this.changeDetectorRef.detectChanges()
            } )
    }

    abstract fetchRowListPage(): Observable<L> 
    abstract parseRows( res: L ): R[] 
    
    parseTotalRowCount( res: L ): number {
        if ( 'totalRowCount' in (res as any) ) return (res as any)[ 'totalRowCount' ]

        throw 'Missing res.totalRowCount, might need to override RowListBase.parseTotalRowCount'
    }

    loadRowListPageFailed( error: any ) {
        console.warn( error )
        this._rows = []
        this._totalRowCount = 0
    }

    clone( obj: any ) {
        return JSON.parse( JSON.stringify( obj ) ) 
    }

    onFilterChange( ev: F ) {
        this._filter = this.clone( ev )
        this.onPageNumberChange( 1 )
    }

    onSortChange( ev: Sort ) {
        this._pageConfig.sortActive = ev.active
        this._pageConfig.sortDirection = ev.direction
        this.onPageNumberChange( 1 )
    }

    onPageSizeChange( ev: number ) {
        this._pageConfig.pageSize = ev 
        this.onPageNumberChange( 1 )
    }

    onPageNumberChange( ev: number ) {
        this._pageConfig.pageNumber = ev

        this.refreshRowList()
            .then( () => {
                this.savePageState()
            } )
    }

    abstract get initialPageState(): RowListState<F>

    loadPageState() {
        let state = this.pageStateService.getPageState<RowListState<F>>( this.constructor, () => this.initialPageState )

        this._filter = state.filter
        this._pageConfig.pageSize = state.pageConfig.pageSize
        this._pageConfig.pageNumber = state.pageConfig.pageNumber
        this._pageConfig.sortActive = state.pageConfig.sortActive
        this._pageConfig.sortDirection = state.pageConfig.sortDirection
    }

    savePageState() {
        let state: RowListState<F> = this.clone( {            
            filter: this._filter,
            pageConfig: {
                pageSize: this._pageConfig.pageSize,
                pageNumber: this._pageConfig.pageNumber,
                sortActive: this._pageConfig.sortActive,
                sortDirection: this._pageConfig.sortDirection,
            }
        } ) 
        
        this.pageStateService.setPageState<RowListState<F>>( this.constructor, state )
    }

    paginateState( id: string ) {
        return {
            id,
            itemsPerPage: this._pageConfig.pageSize,
            currentPage: this._pageConfig.pageNumber,
            totalItems: this._totalRowCount
        }
    }
}
