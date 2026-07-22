import { AfterViewInit, ChangeDetectorRef, Directive, inject } from "@angular/core";
import { Sort, SortDirection } from "@angular/material/sort";
import { PageStateService } from "../services/page-state.service";
import { NrclBase } from "./nrcl.base";

export type PaginationConfig = {    
    pageSize: number
    pageNumber: number
    sortActive: string 
    sortDirection: SortDirection
}

export interface PagingInfoRequest {
    query?: string;
    pageNumber: number;
    pageRowCount: number;
    sortColumn?: string;
    sortDirection?: string;
}

export type PaginationState<F> = { 
    pageConfig: PaginationConfig, 
    filter: F, 
}

export type InitialState<F> = PaginationState<F> & { instance?: string }

@Directive()
export abstract class PaginationBase<F> extends NrclBase implements AfterViewInit {
    pageStateService = inject( PageStateService )
    changeDetectorRef = inject( ChangeDetectorRef )

    protected _totalRowCount: number = 0
    get totalRowCount(): number { return this._totalRowCount }

    private _pageConfig: PaginationConfig = {
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
    protected set filter( f: F ) {
        this._filter = this.clone( f )
    }

    protected _instance?: string
    get instance(): string|undefined {
        return this._instance
    }

    ngAfterViewInit(): void {
        // console.log('PaginationBase.ngAfterViewInit')
        this.onInitPageState()
    }

    onInitPageState() {
        let init = this.getInitialPageState()
        this._instance = init.instance

        let saved = this.retrieveState()

        this.setCurrentPageState( saved || init )
        this.onPageStateChanged()
    }

    clone( obj: any ) {
        return JSON.parse( JSON.stringify( obj ) ) 
    }

    onFilterChange( ev: F ) {
        this.filter = ev 
        this._pageConfig.pageNumber = 1

        this.onPageStateChanged()
    }

    onSortChange( ev: Sort ) {
        if ( this._pageConfig.sortActive == ev.active ) 
            if ( this._pageConfig.sortDirection == ev.direction ) 
                return

        this._pageConfig.sortActive = ev.active
        this._pageConfig.sortDirection = ev.direction
        this._pageConfig.pageNumber = 1

        this.onPageStateChanged()
    }

    onPageSizeChange( ev: number ) {
        if ( this._pageConfig.pageSize == ev ) return

        this._pageConfig.pageSize = ev 
        this._pageConfig.pageNumber = 1

        this.onPageStateChanged()
    }

    onPageNumberChange( ev: number ) {
        if ( this._pageConfig.pageNumber == ev ) return

        this._pageConfig.pageNumber = ev

        this.onPageStateChanged()
    }

    onPageStateChanged(): Promise<void> {
        return this.refresh()
            .then( () => {
                let state = this.getCurrentPageState()
                this.persistState( state )
            } )
    }

    protected abstract refresh(): Promise<void> 

    abstract getInitialPageState(): InitialState<F>

    getCurrentPageState(): PaginationState<F> {
        return {
            filter: this.filter,
            pageConfig: {
                pageSize: this._pageConfig.pageSize,
                pageNumber: this._pageConfig.pageNumber,
                sortActive: this._pageConfig.sortActive,
                sortDirection: this._pageConfig.sortDirection,
            }
        }
    }

    setCurrentPageState( state: PaginationState<F> ) {
        this.filter = state.filter
        this._pageConfig.pageSize = state.pageConfig.pageSize
        this._pageConfig.pageNumber = state.pageConfig.pageNumber
        this._pageConfig.sortActive = state.pageConfig.sortActive
        this._pageConfig.sortDirection = state.pageConfig.sortDirection
    }

    persistState( state: PaginationState<F> ) {
        if ( !this._instance ) return

        this.pageStateService.setPageState( this._instance!, JSON.stringify( state ) )
    }

    retrieveState(): PaginationState<F>|undefined {
        if ( !this._instance ) return
        
        let state = this.pageStateService.getPageState( this._instance! )
        if ( !state ) return

        return JSON.parse( state )
    }

    paginateState( id: string ) {
        return {
            id,
            itemsPerPage: this._pageConfig.pageSize,
            currentPage: this._pageConfig.pageNumber,
            totalItems: this._totalRowCount
        }
    }

    getPagingInfoRequest( query?: string ): PagingInfoRequest {
        return {
            query,
            pageNumber: this._pageConfig.pageNumber,
            pageRowCount:  this._pageConfig.pageSize,
            sortColumn: this.sortActive,
            sortDirection: this.sortDirection
        }
    }
}
