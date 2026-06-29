import { AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, inject, Output } from "@angular/core";
import { Observable } from "rxjs";
import { PageStateService } from "../services/page-state.service";
import { Aborted, ObservableAborter } from "../utils/row-list.util";
import { PaginationBase as PaginationBase, PaginationState } from "./pagination.base";

export type RowListState<F> = PaginationState<F>

@Directive()
export abstract class RowListBase<F,R,L=any> extends PaginationBase<F> implements AfterViewInit {
    pageStateService = inject( PageStateService )
    changeDetectorRef = inject( ChangeDetectorRef )

    @Output() isLoadingChange = new EventEmitter<boolean>()
    
    private _isLoading = false
    get isLoading() { return this._isLoading }
    set isLoading( v: boolean ) { 
        console.log(v,this._isLoading)
        if ( v == this._isLoading ) return        
        this._isLoading = v 
        this.isLoadingChange.emit( v )
    }  

    private _rows: R[] = []
    get rows(): R[] { return this._rows }

    private _loadRowListRequest?: ObservableAborter<L> 

    ngAfterViewInit(): void {
        super.ngAfterViewInit()
        this.refreshRowList()
    }

    refreshRowList(): Promise<void> {
        return this.loadRowList().then( result => this.parseRowList( result ) )
    }

    loadRowList(): Promise<L> {
        this.isLoading = true
        this.changeDetectorRef.detectChanges()

        if ( this._loadRowListRequest )
            this._loadRowListRequest.abort()

        this._loadRowListRequest = new ObservableAborter<L>( () => {        
            return this.fetchRowListPage()
        } )

        return this._loadRowListRequest.promise
    }

    abstract fetchRowListPage(): Observable<L> 

    parseRowList( result: L ): Promise<void> {
        return Promise.resolve( result )
            .then( res => {
                this._totalRowCount = this.parseTotalRowCount( res )
                this._rows = this.parseRows( res )
                return this.completedRowListPage()
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

    abstract parseRows( res: L ): R[] 
    
    parseTotalRowCount( res: L ): number {
        if ( 'totalRowCount' in (res as any) ) return (res as any)[ 'totalRowCount' ]

        throw 'Missing res.totalRowCount, might need to override RowListBase.parseTotalRowCount'
    }

    completedRowListPage() {
        this.isLoading = false
    }

    loadRowListPageFailed( error: any ) {
        console.warn( error )
        this._rows = []
        this._totalRowCount = 0
    }

    onPageNumberChange( ev: number ) {
        super.onPageNumberChange( ev )

        this.refreshRowList()
            .then( () => {
                this.savePageState()
            } )
    }
}
