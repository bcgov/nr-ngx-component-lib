import { AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, inject, Output } from "@angular/core";
import { Observable } from "rxjs";
import { PageStateService } from "../services/page-state.service";
import { Aborted, ObservableAborter } from "../utils/row-list.util";
import { PaginationBase as PaginationBase, PaginationState } from "./pagination.base";

// export type RowListState<F> = PaginationState<F>

@Directive()
export abstract class RowListBase<F,R,L=any> extends PaginationBase<F> implements AfterViewInit {
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

    private _loadRowListRequest?: ObservableAborter<L> 
    private _inProgress = new InProgress()

    ngAfterViewInit(): void {
        // console.log('RowListBase.ngAfterViewInit')
        super.ngAfterViewInit()
        this.refreshRowList()
    }

    refreshRowList(): Promise<void> {
        // console.warn('RowListBase.refreshRowList')
        this.isLoading = true
        this.changeDetectorRef.detectChanges()

        if ( !this._inProgress.isCompleted ) this._inProgress.cancel()
        let inProgress = this._inProgress = new InProgress()

        return Promise.resolve()
            .then( () => { 
                return this.loadRowList() 
            } )
            .then( ( res ) => { 
                inProgress.progress()
                if ( !res ) return
                // if ( inProgress.isCancelled ) return

                return this.parseRowList( res ) 
            } )
            .then( res => {
                inProgress.progress()
                // if ( inProgress.isCancelled ) return
                
                return this.completedRowListPage()
            } )
            .catch( ( err ) => {
                if ( err instanceof Aborted ) return

                this.loadRowListPageFailed( err )
            } )
            .finally( () => {
                // if ( inProgress.isCancelled ) return
                inProgress.complete()

                this.isLoading = false
                this.changeDetectorRef.detectChanges()
            } )
    }

    loadRowList(): Promise<L> {
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
            } )
    }

    abstract parseRows( res: L ): R[] 
    
    parseTotalRowCount( res: L ): number {
        if ( 'totalRowCount' in (res as any) ) return (res as any)[ 'totalRowCount' ]

        throw 'Missing res.totalRowCount, might need to override RowListBase.parseTotalRowCount'
    }

    completedRowListPage() {}

    loadRowListPageFailed( error: any ) {
        console.warn( error )
        this._rows = []
        this._totalRowCount = 0
    }

    // onPageNumberChange( ev: number ) {
    //     super.onPageNumberChange( ev )

    //     this.refreshRowList()
    //         .then( () => {
    //             this.savePageState()
    //         } )
    // }

    protected refresh(): Promise<void> {
        return this.refreshRowList()
    }
}

class InProgress {
    private _completed = false
    private _cancelled = false

    complete() {
        if ( this.isCancelled ) return
        this._completed = true
    }

    cancel() {
        if ( this.isCompleted ) return
        this._cancelled = true        
    }

    progress() {
        if ( this.isCompleted ) return
        if ( this.isCancelled ) throw new Aborted('InProgress cancelled')
    }

    get isCompleted() {        
        return this._completed
    }

    get isCancelled() {
        return this._cancelled
    }
}
