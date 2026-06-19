import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Directive, Input, numberAttribute, TemplateRef, ViewChild } from "@angular/core";
import { Observable, of } from "rxjs";
import { RowListBase, RowListState } from "../../directives/row-list.base";
import { ScheduleComponent, ScheduleProvider, ScheduleRow, ScheduleRowItem } from "../schedule/schedule.component";
import { MatMenu, MatMenuPanel } from "@angular/material/menu";

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
    'rostered' |
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
    // data?: {
        allocationType?: string,
        shiftType?: string,
        assignmentName?: string,
    // }
    // template?: TemplateRef<any>
}

export type ResourceScheduleRow = ScheduleRow & {
    // id?: string,
    // heading: any,
    // items: ( ResourceScheduleItemTypes | ResourceScheduleRowItem )[]
    items: ( Promise<ResourceScheduleRowItem[]> )
}

export type ResourceSchedule = ResourceScheduleRow[]

// export type FetchResourceScheduleParameters = { 
//     pageNumber: number 
//     pageRowCount: number 
//     sortColumn: string 
//     sortDirection: string
// }

// export type FetchResourceScheduleRowParameters = { 
//     resourceId: string 
// }

// export interface ResourceScheduleProvider {
//     fetchResourceSchedule( x: FetchResourceScheduleParameters ): Observable<any>
//     displayResourceSchedule( res: any ): ResourceSchedule
// }

@Component({
    selector: "nrcl-resource-schedule",
    templateUrl: "./resource-schedule.component.html",
    styleUrl: "./resource-schedule.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceScheduleComponent implements AfterViewInit { //extends RowListBase<{},ScheduleRow> {
    @Input() provider?: ScheduleProvider
    @Input() startDate?: string
    @Input() weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number
    @Input() menu?: MatMenuPanel

    @ViewChild( ScheduleComponent ) scheduleComponent?: ScheduleComponent

    @ContentChild(ResourceScheduleRowHeadingDirective) headerTemplate!: ResourceScheduleRowHeadingDirective
           
    ngAfterViewInit(): void {
        console.log('ResourceScheduleComponent.ngAfterViewInit')
        // if ( !this.scheduleComponent ) return

        // this.scheduleComponent.fetchRowListPage = () => {
        //     if ( !this.provider?.fetchResourceSchedule ) throw Error( 'ResourceScheduleComponent.provider.fetchResourceSchedule not set' )
                
        //     return this.provider.fetchResourceSchedule( {
        //         pageNumber: this.scheduleComponent!.pageNumber,
        //         pageRowCount: this.scheduleComponent!.pageSize,
        //         sortColumn: this.scheduleComponent!.sortActive,
        //         sortDirection: this.scheduleComponent!.sortDirection,
        //     } )
        // }

        // this.scheduleComponent.displayResourceSchedule = ( res: any ): ResourceSchedule => {
        //     if ( !this.provider?.displayResourceSchedule ) throw Error( 'ResourceScheduleComponent.provider.displayResourceSchedule not set' )

        //     let x = this.provider.displayResourceSchedule( res )        
        //     console.log(x)
        //     return x 
        // }

        // this.scheduleComponent.getInitialPageState = () => {
        //     return {
        //         filter: {},
        //         pageConfig: {
        //             pageSize: 20,
        //             pageNumber: 1,
        //             sortActive: 'dateTime',
        //             sortDirection: 'desc',
        //         }
        //     }
        // }
    } 

    // fetchRowListPage(): Observable<any> {
    //     if ( !this.provider?.fetchResourceSchedule ) throw Error( 'ResourceScheduleComponent.provider.fetchResourceSchedule not set' )

    //     return this.provider.fetchResourceSchedule( {
    //         pageNumber: this.pageNumber,
    //         pageRowCount: this.pageSize,
    //         sortColumn: this.sortActive,
    //         sortDirection: this.sortDirection,
    //     } )
    // }

    // parseRows( res: any ): ResourceSchedule {
    //     if ( !this.provider?.displayResourceSchedule ) throw Error( 'ResourceScheduleComponent.provider.displayResourceSchedule not set' )

    //     let x = this.provider.displayResourceSchedule( res )        
    //     console.log(x)
    //     return x 
    // }

    // parseTotalRowCount( res ): number {
    //     return res.length
    // }

    // get initialPageState(): RowListState<{}> {
    //     return {
    //         filter: {},
    //         pageConfig: {
    //             pageSize: 20,
    //             pageNumber: 1,
    //             sortActive: 'dateTime',
    //             sortDirection: 'desc',
    //         }
    //     }
    // }
}
