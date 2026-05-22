import { ChangeDetectionStrategy, Component, Input, numberAttribute } from "@angular/core";
import { Observable, of } from "rxjs";
import { RowListBase, RowListState } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { Schedule, ScheduleRow } from "../schedule/schedule.component";

export type EventHistoryTableRow = {
    eventTimestamp: string
    createdByUserId: string
    eventHistoryTypeDescription: string
    sourceObjectNameDescription: string
    comment: string
    eventHistoryGuid: string
}

export type fetchScheduleParameters = { 
    pageNumber: number 
    pageRowCount: number 
    sortColumn: string 
    sortDirection: string
}

export interface ResourceScheduleProvider {
    fetchSchedule( x: fetchScheduleParameters ): Observable<any>    
    displaySchedule( res: any ): Schedule
}

@Component({
    selector: "nrcl-resource-schedule",
    templateUrl: "./resource-schedule.component.html",
    styleUrl: "./resource-schedule.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceScheduleComponent extends RowListBase<{},ScheduleRow> {
    @Input() provider?: ResourceScheduleProvider
    @Input() startDate?: string
    @Input() weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number

    // DATE_FORMATS = DATE_FORMATS

    // schedule?: Schedule
    
    fetchRowListPage(): Observable<any> {
        if ( !this.provider?.fetchSchedule ) throw Error( 'no provider for ResourceScheduleComponent.provider.fetchSchedule' )

        return this.provider.fetchSchedule( {
            pageNumber: this.pageNumber,
            pageRowCount: this.pageSize,
            sortColumn: this.sortActive,
            sortDirection: this.sortDirection,
        } )
    }

    parseRows( res: any ): Schedule {
        if ( !this.provider?.displaySchedule ) throw Error( 'no provider for ResourceScheduleComponent.provider.displaySchedule' )

        let x = this.provider.displaySchedule( res )
        console.log(x)
        return x 
    }

    parseTotalRowCount( res ): number {
        console.log(res)
        return res.length
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
}
