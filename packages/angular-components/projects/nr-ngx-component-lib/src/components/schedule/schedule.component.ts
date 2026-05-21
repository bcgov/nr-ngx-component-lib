import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, inject, Input, TemplateRef } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';

@Directive( {
    selector: '[nrclScheduleRowHeading]'
} )
export class ScheduleRowHeadingComponent {
    constructor(
        public template: TemplateRef<any>
    ){
        console.log('ScheduleRowHeadingComponent')

    }
}

// ================================================================================

@Directive( {
    selector: '[nrclScheduleItem]'
} )
export class ScheduleItemComponent {
    constructor(
        public template: TemplateRef<any>
    ){}
}

// ================================================================================

@Component( {
    selector: 'nrcl-schedule',
    templateUrl: './schedule.component.html',
    styleUrl: './schedule.component.scss',
} )
export class ScheduleComponent extends NrclBase implements AfterContentInit {
    // elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() startDate
    @Input() endDate
    @Input() rows    

    // @ContentChildren(ScheduleRowHeadingComponent) tabs!: QueryList<ScheduleRowHeadingComponent>;
    @ContentChild(ScheduleRowHeadingComponent) header!: ScheduleRowHeadingComponent

    // tooltipContent

    ngAfterContentInit(): void {
        console.log(this.header)
    }
}
