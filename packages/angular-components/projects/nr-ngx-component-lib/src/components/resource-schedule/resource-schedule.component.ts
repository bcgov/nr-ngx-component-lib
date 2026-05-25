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
    ){
        console.log('ResourceScheduleRowHeadingDirective')

    }
}

// ================================================================================

export type ResourceScheduleItemTypes = 
    'available-regular-day' |
    'available-day-off'

export type ResourceScheduleRowItem = ScheduleRowItem & {
    // id?: string,
    // date: string,
    name: ResourceScheduleItemTypes,
    // data?: any
    // template?: TemplateRef<any>
}

export type ResourceScheduleRow = ScheduleRow & {
    // id?: string,
    // heading: any,
    items: ( ResourceScheduleItemTypes | ResourceScheduleRowItem )[]
}

export type ResourceSchedule = ResourceScheduleRow[]

export type FetchResourceScheduleParameters = { 
    pageNumber: number 
    pageRowCount: number 
    sortColumn: string 
    sortDirection: string
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
        if ( !this.provider?.fetchResourceSchedule ) throw Error( 'no provider for ResourceScheduleComponent.provider.fetchSchedule' )

        return this.provider.fetchResourceSchedule( {
            pageNumber: this.pageNumber,
            pageRowCount: this.pageSize,
            sortColumn: this.sortActive,
            sortDirection: this.sortDirection,
        } )
    }

    parseRows( res: any ): ResourceSchedule {
        if ( !this.provider?.displayResourceSchedule ) throw Error( 'no provider for ResourceScheduleComponent.provider.displaySchedule' )

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
