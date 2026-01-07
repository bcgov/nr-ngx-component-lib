import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { LoadRowListResult, RowListBase, RowListState } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";

export type EventHistoryTableRow = {
    eventTimestamp: string
    createdByUserId: string
    eventHistoryTypeDescription: string
    sourceObjectNameDescription: string
    comment: string
}

export type FetchEventHistoryParameters = { 
    isSupplier: boolean 
    pageNumber: number 
    pageRowCount: number 
    sortColumn: string 
    sortDirection: string
}

export interface EventHistoryRowListProvider<R,L=any> {
    fetchEventHistory( x: FetchEventHistoryParameters ): Observable<L>    
    displayRowListPage( res: L ): LoadRowListResult<R>
}

@Component({
    selector: "nrcl-list-event-history",
    templateUrl: "./list-event-history.component.html",
    styleUrl: "./list-event-history.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListEventHistoryComponent extends RowListBase<{},EventHistoryTableRow> {
    @Input() rowListProvider: EventHistoryRowListProvider<EventHistoryTableRow>
    @Input() canDelete = true
    @Input() showPagination = false
    @Input() isSupplier: boolean = false

    DATE_FORMATS = DATE_FORMATS
    columns = [ 'dateTime', 'changedBy', 'type', 'section', 'comment' ]

    fetchRowListPage(): Observable<any> {
        if ( !this.rowListProvider?.fetchEventHistory ) throw Error( 'no provider' )

        return this.rowListProvider.fetchEventHistory( {
            isSupplier: this.isSupplier,
            pageNumber: this.pageNumber,
            pageRowCount: this.pageSize,
            sortColumn: this.sortActive,
            sortDirection: this.sortDirection,
        } )
    }

    displayRowListPage( res: any ): LoadRowListResult<EventHistoryTableRow> {
        if ( !this.rowListProvider?.displayRowListPage ) throw Error( 'no provider' )

        return this.rowListProvider.displayRowListPage( res )
    }   

    get initialPageState(): RowListState<{}> {
        return {
            filter: {},
            pageSize: 20,
            pageNumber: 1,
            sortActive: 'dateTime',
            sortDirection: 'desc',
        }
    }


}
