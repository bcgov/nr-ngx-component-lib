import { ChangeDetectionStrategy, Component, Input, numberAttribute } from "@angular/core";
import { Observable, of } from "rxjs";
import { RowListBase, RowListState } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { Schedule } from "../schedule/schedule.component";

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

export interface ResourceScheduleProvider<R,L=any> {
    fetchEventHistory( x: FetchEventHistoryParameters ): Observable<L>    
    displayRowListPage( res: L ): EventHistoryTableRow[]
}

@Component({
    selector: "nrcl-resource-schedule",
    templateUrl: "./resource-schedule.component.html",
    styleUrl: "./resource-schedule.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceScheduleComponent extends RowListBase<{},EventHistoryTableRow> {
    @Input() resourceScheduleProvider?: ResourceScheduleProvider<EventHistoryTableRow>
    @Input() startDate?: string
    @Input() weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number

    DATE_FORMATS = DATE_FORMATS

    schedule: Schedule
    
    fetchRowListPage(): Observable<any> {
        if ( !this.resourceScheduleProvider?.fetchEventHistory ) throw Error( 'no provider for ResourceScheduleComponent.rowListProvider.fetchRowListPage' )
        return of()
        // return this.resourceScheduleProvider.fetchEventHistory( {
        //     isSupplier: this.isSupplier,
        //     pageNumber: this.pageNumber,
        //     pageRowCount: this.pageSize,
        //     sortColumn: this.sortActive,
        //     sortDirection: this.sortDirection,
        // } )
    }

    parseRows( res: any ): EventHistoryTableRow[] {
        if ( !this.resourceScheduleProvider?.displayRowListPage ) throw Error( 'no provider for ResourceScheduleComponent.rowListProvider.displayRowListPage' )

        return this.resourceScheduleProvider.displayRowListPage( res )
    }

    get initialPageState(): RowListState<{}> {
        return {
            filter: {},
            pageConfig: {
                pageSize: 20,
                pageNumber: 1,
                sortActive: 'dateTime',
                sortDirection: 'desc',
            }
        }
    }

    savePageState(): void {
        // state not saved
    }
}
