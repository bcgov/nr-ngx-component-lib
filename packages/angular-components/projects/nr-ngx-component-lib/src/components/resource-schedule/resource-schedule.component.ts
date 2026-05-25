import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, numberAttribute, TemplateRef } from "@angular/core";
import { Observable, of } from "rxjs";
import { RowListBase, RowListState } from "../../directives/row-list.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { Schedule, ScheduleRow, ScheduleRowItem } from "../schedule/schedule.component";

@Directive( {
    selector: '[nrclResourceScheduleRowHeading]'
} )
export class ResourceScheduleRowHeadingDirective {
    constructor(
        public template: TemplateRef<any>
    ){}
}

// ================================================================================

export type ResourceScheduleItemTypes = 
    'out-of-service' |
    'available-duty-day' |
    'available-standby-day' |
    'available-off-day' |
    'available-regular-day' |
    'assigned-duty-day' |
    'assigned-standby-day' |
    'assigned-off-day' |
    'assigned-regular-day' 

export type ResourceScheduleRowItem = ScheduleRowItem & {
    // id?: string,
    // date: string,
    name: ResourceScheduleItemTypes,
    data?: {
        availabilityType?: string,
        shiftType?: string,
        assignmentName?: string,
    }
    // template?: TemplateRef<any>
}

export type ResourceScheduleRow = ScheduleRow & {
    // id?: string,
    // heading: any,
    // items: ( ResourceScheduleItemTypes | ResourceScheduleRowItem )[]
    items: ( Promise<ResourceScheduleRowItem[]> )
}

export type ResourceSchedule = ResourceScheduleRow[]

export type FetchResourceScheduleParameters = { 
    pageNumber: number 
    pageRowCount: number 
    sortColumn: string 
    sortDirection: string
}

export type FetchResourceScheduleRowParameters = { 
    resourceId: string 
}

export interface ResourceScheduleProvider {
    fetchResourceSchedule( x: FetchResourceScheduleParameters ): Observable<any>
    displayResourceSchedule( res: any ): ResourceSchedule
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

    @ContentChild(ResourceScheduleRowHeadingDirective) headerTemplate!: ResourceScheduleRowHeadingDirective
    
    // DATE_FORMATS = DATE_FORMATS

    // schedule?: Schedule
    
    fetchRowListPage(): Observable<any> {
        if ( !this.provider?.fetchResourceSchedule ) throw Error( 'ResourceScheduleComponent.provider.fetchResourceSchedule not set' )

        return this.provider.fetchResourceSchedule( {
            pageNumber: this.pageNumber,
            pageRowCount: this.pageSize,
            sortColumn: this.sortActive,
            sortDirection: this.sortDirection,
        } )
    }

    parseRows( res: any ): ResourceSchedule {
        if ( !this.provider?.displayResourceSchedule ) throw Error( 'ResourceScheduleComponent.provider.displayResourceSchedule not set' )

        let x = this.provider.displayResourceSchedule( res )        
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
