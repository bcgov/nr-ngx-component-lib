import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Directive, Input, numberAttribute, TemplateRef, ViewChild } from "@angular/core";
import { MatMenuPanel } from "@angular/material/menu";
import { ScheduleComponent, ScheduleProvider, ScheduleRow, ScheduleRowItem } from "../schedule/schedule.component";

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
    'empty' |
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
    name: ResourceScheduleItemTypes,
    allocationType?: string,
    shiftType?: string,
    assignmentName?: string,
}

export type ResourceScheduleRow = ScheduleRow & {
    items: ( Promise<ResourceScheduleRowItem[]> )
}

export type ResourceSchedule = ResourceScheduleRow[]

@Component({
    selector: "nrcl-resource-schedule",
    templateUrl: "./resource-schedule.component.html",
    styleUrl: "./resource-schedule.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceScheduleComponent {
    @Input() provider?: ScheduleProvider
    @Input() startDate?: string
    @Input() highlightDate?: string
    @Input() weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number
    @Input() menu?: MatMenuPanel

    @ViewChild( ScheduleComponent ) scheduleComponent?: ScheduleComponent

    @ContentChild(ResourceScheduleRowHeadingDirective) headerTemplate!: ResourceScheduleRowHeadingDirective
}
