import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, inject, Input, numberAttribute, OnChanges, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';
import moment from 'moment';

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
    @Input( 'nrclScheduleItem' ) name?: string

    constructor(
        public template: TemplateRef<any>
    ){}
}

// ================================================================================

export type ScheduleRowItem = {
    id: string,
    date: string,
    name: string,
    data?: any
    template?: TemplateRef<any>
}

export type ScheduleRow = {
    id: string,
    heading: any,
    items: ( string | ScheduleRowItem )[]
}

export type Schedule = ScheduleRow[]

@Component( {
    selector: 'nrcl-schedule',
    templateUrl: './schedule.component.html',
    styleUrl: './schedule.component.scss',
    host: {
        '[style.--nrcl-schedule-day-count]': 'this.dayCount'
    }
} )
export class ScheduleComponent extends NrclBase implements AfterContentInit, OnChanges {
    // elementRef = inject( ElementRef )
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() startDate?: string
    @Input( { transform: numberAttribute } ) dayCount?: number
    @Input() schedule?: Schedule

    @ContentChildren(ScheduleItemComponent) itemTemplates!: QueryList<ScheduleItemComponent>;
    @ContentChild(ScheduleRowHeadingComponent) headerTemplate!: ScheduleRowHeadingComponent

    protected _rows: Schedule = []
    protected _days: string[] = []
    protected _weeks: string[] = []

    ngOnChanges( changes: SimpleChanges ): void {
        this.makeRows()
    }

    ngAfterContentInit(): void {
        this.makeRows()
    }

    makeRows() {
        let start = moment( this.startDate )
        let days = Array.from( { length: this.dayCount! } ).map( ( x, i ) => {
            return start.clone().add( i, 'day' ).format( 'ddd DD' )
        } )

        this._rows = this.schedule?.map( ( row, i ) => {
            return {
                id: row.id ?? String( i ),
                heading: clone( row.heading ),
                items: Array.from( { length: this.dayCount! } ).map( ( x, i ) => {
                    let rowItem = row.items[ i ]

                    let name: string
                    let data
                    let id
                    if ( rowItem == null ) {
                        name = 'empty'
                    }
                    else if ( typeof rowItem == 'string' ) {
                        name = rowItem
                    }
                    else {
                        id = rowItem.id
                        name = rowItem.name
                        data = clone( rowItem.data || null )
                    }

                    return {
                        id: id ?? String( i ),
                        date: days[ i ],
                        name: name,
                        data: data,
                        template: this.itemTemplates?.find( i => i.name == name )?.template!
                    }
                } )
            }
        } ) || []
    }
}

function clone<T>( obj: T ): T {
    return JSON.parse( JSON.stringify( obj ) ) 
}
