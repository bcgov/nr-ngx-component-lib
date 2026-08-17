import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, numberAttribute, TemplateRef, ViewChild } from "@angular/core";
import { MatMenuPanel } from "@angular/material/menu";
import { NrclBase } from "../../directives/nrcl.base";
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
    'out-of-service' |

    'available-rostered' |
    'available-duty-day' |
    'available-standby-day' |
    'available-off-day' |
    'available-regular-day' |

    'assigned-rostered' |
    'assigned-duty-day' |
    'assigned-standby-day' |
    'assigned-off-day' |
    'assigned-regular-day' 

export type ResourceScheduleRowItem = ScheduleRowItem & {
    name: ResourceScheduleItemTypes,
    allocationType?: string,
    shiftType?: string,
    assignmentName?: string,
    functionName?: string,
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
export class ResourceScheduleComponent extends NrclBase {
    @Input() provider?: ScheduleProvider
    @Input() startDate?: string
    @Input() highlightDate?: string
    @Input() weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number
    @Input() menu?: MatMenuPanel
    @Input() hover = true
    @Input() pagination = true
    @Input() heading = true

    @ViewChild( ScheduleComponent ) scheduleComponent?: ScheduleComponent

    @ContentChild(ResourceScheduleRowHeadingDirective) headerTemplate!: ResourceScheduleRowHeadingDirective
}
