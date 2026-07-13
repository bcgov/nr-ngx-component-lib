import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { RowListBase } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { InitialState } from "../../directives/pagination.base";

export type EventHistoryTableRow = {
    eventTimestamp: string
    createdByUserId: string
    eventHistoryTypeDescription: string
    sourceObjectNameDescription: string
    comment: string
    eventHistoryGuid: string
}

export type FetchEventHistoryParameters = { 
    isSupplier: boolean 
    pageNumber: number 
    pageRowCount: number 
    sortColumn: string 
    sortDirection: string
}

export type InitialEventHistoryState = Omit<InitialState<{}>,'filter'|'pageConfig'> & Partial<Pick<InitialState<{}>,'filter'|'pageConfig'>>

export interface EventHistoryRowListProvider<R,L=any> {
    fetchEventHistory( x: FetchEventHistoryParameters ): Observable<L>    
    displayRowListPage( res: L ): EventHistoryTableRow[]
    getInitialPageState(): InitialEventHistoryState
}

@Component({
    selector: "nrcl-list-event-history",
    templateUrl: "./list-event-history.component.html",
    styleUrl: "./list-event-history.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListEventHistoryComponent extends RowListBase<{},EventHistoryTableRow> {
    @Input() rowListProvider?: EventHistoryRowListProvider<EventHistoryTableRow>
    @Input() canDelete = true
    @Input() showPagination = false
    @Input() isSupplier: boolean = false
    @Input() noRowsMessage = "No comments have been added."

    DATE_FORMATS = DATE_FORMATS
    columns = [ 'dateTime', 'changedBy', 'type', 'section', 'comment' ]
    sortColumns = [
        { code: 'dateTime', description: 'Date and Time' },
        { code: 'changedBy', description: 'Changed By' },
        { code: 'type', description: 'Type' },
        { code: 'section', description: 'Section' },
    ]

    fetchRowListPage(): Observable<any> {
        if ( !this.rowListProvider?.fetchEventHistory ) throw Error( 'no provider for ListEventHistoryComponent.rowListProvider.fetchRowListPage' )

        return this.rowListProvider.fetchEventHistory( {
            isSupplier: this.isSupplier,
            pageNumber: this.pageNumber,
            pageRowCount: this.pageSize,
            sortColumn: this.sortActive,
            sortDirection: this.sortDirection,
        } )
    }

    parseRows( res: any ): EventHistoryTableRow[] {
        if ( !this.rowListProvider?.displayRowListPage ) throw Error( 'no provider for ListEventHistoryComponent.rowListProvider.displayRowListPage' )

        return this.rowListProvider.displayRowListPage( res )
    }

    getInitialPageState(): InitialState<{}> {
        if ( !this.rowListProvider?.getInitialPageState ) throw Error( 'no provider for ListEventHistoryComponent.rowListProvider.getInitialPageState' )

        let state = this.rowListProvider.getInitialPageState()

        return {            
            instance: state.instance,
            filter: {},
            pageConfig: {
                pageSize: 20,
                pageNumber: 1,
                sortActive: 'dateTime',
                sortDirection: 'desc',
                ...state.pageConfig
            },
        }
    }

    savePageState(): void {
        // state not saved
    }
}
