import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { RowListBase } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { InitialState } from "../../directives/pagination.base";
import { MatCardModule } from "@angular/material/card";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { NgxPaginationModule } from "ngx-pagination";
import { ButtonComponent } from "../button/button.component";
import { CellContentComponent } from "../cell-content/cell-content.component";
import { DeviceViewComponent, DesktopViewDirective, MobileViewDirective } from "../device-view/device-view.component";
import { GapComponent } from "../gap/gap.component";
import { RowListDesktopComponent } from "../row-list-desktop/row-list-desktop.component";
import { RowListMobileComponent } from "../row-list-mobile/row-list-mobile.component";
import { RowListPaginationComponent } from "../row-list-pagination/row-list-pagination.component";
import { RowListSortingComponent } from "../row-list-sorting/row-list-sorting.component";

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DeviceViewComponent,
        DesktopViewDirective,
        MobileViewDirective,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListSortingComponent,
        RowListPaginationComponent,
        MatTableModule,
        MatCardModule,
        ButtonComponent,
        GapComponent,
        CellContentComponent,
        NgxPaginationModule,
        MatSortModule
    ]
})
export class ListEventHistoryComponent extends RowListBase<{},EventHistoryTableRow> {
    static _nextInstance = 0

    @Input() rowListProvider?: EventHistoryRowListProvider<EventHistoryTableRow>
    @Input() canDelete = true
    @Input() showPagination = false
    @Input() isSupplier: boolean = false
    @Input() noRowsMessage = "No comments have been added."

    desktopPaginationId = "desktop"
    mobilePaginationId = "mobile"

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

        ListEventHistoryComponent._nextInstance += 1
        let inst = state.instance || ( 'list-event-history-' + ListEventHistoryComponent._nextInstance )
        this.desktopPaginationId = 'desktop-' + inst
        this.mobilePaginationId = 'mobile-' + inst

        return {            
            instance: inst,
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
}
