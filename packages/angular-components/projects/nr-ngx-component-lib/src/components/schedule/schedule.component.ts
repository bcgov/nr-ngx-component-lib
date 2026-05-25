import { AfterContentInit, booleanAttribute, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, inject, Input, numberAttribute, OnChanges, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';
import moment from 'moment';

@Directive( {
    selector: '[nrclScheduleRowHeading]'
} )
export class ScheduleRowHeadingDirective {
    constructor(
        public template: TemplateRef<any>
    ){
        console.log('ScheduleRowHeadingDirective')

    }
}

// ================================================================================

@Directive( {
    selector: '[nrclScheduleItem]'
} )
export class ScheduleItemDirective {
    @Input( 'nrclScheduleItem' ) name?: string

    constructor(
        public template: TemplateRef<any>
    ){
        console.log('ScheduleItemDirective')
    }
}

// ================================================================================

export type ScheduleRowItem = {
    id?: string,
    // date: string,
    name: string,
    data?: any
    template?: TemplateRef<any>
}

export type ScheduleRow = {
    id?: string,
    heading: any,
    items: ( string | ScheduleRowItem )[]
}

export type Schedule = ScheduleRow[]

type Day = { 
    day: string, 
    date: number, 
    isWeekend: boolean, 
    isToday: boolean, 
    isFirst: boolean 
}

type Week = { 
    start: string, 
    end: string, 
    span: number 
}

@Component( {
    selector: 'nrcl-schedule',
    templateUrl: './schedule.component.html',
    styleUrl: './schedule.component.scss',
    host: {
        '[style.--nrcl-schedule-day-count]': 'this.dayCount'
    }
} )
export class ScheduleComponent extends NrclBase implements AfterContentInit, OnChanges {
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() startDate?: string
    @Input() weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number
    @Input() schedule?: Schedule

    @ContentChildren(ScheduleItemDirective) itemTemplates!: QueryList<ScheduleItemDirective>;
    @ContentChild(ScheduleRowHeadingDirective) headerTemplate!: ScheduleRowHeadingDirective

    protected _rows: Schedule = []
    protected _days: Day[] = []
    protected _weeks: Week[] = []

    ngOnChanges( changes: SimpleChanges ): void {
        this.makeRows()
    }

    ngAfterContentInit(): void {
        this.makeRows()
    }

    makeRows() {
        let start = moment( this.startDate )
        let today = moment()

        this._weeks = Array.from( { length: this.dayCount! } ).reduce<Week[]>( ( a, x, i ) => {
            let m = start.clone().add( i, 'day' )
            let date = m.format( 'MMM D' )
            let day = m.day()

            if ( a.length == 0 ) return a.concat( {
                start: date,
                end: date,
                span: 1
            } )

            let prev = a[ a.length - 1 ] 

            if ( day == this.weekStart ) return a.concat( {
                start: date,
                end: date,
                span: 1
            } )
            
            prev.end = date
            prev.span += 1
            return a
        }, [] )

        this._days = Array.from( { length: this.dayCount! } ).map( ( x, i ) => {
            let d = start.clone().add( i, 'day' )
            return {
                day: d.format( 'ddd' ),
                date: d.date(),
                isFirst: d.date() == 1,
                isWeekend: d.day() == 0 || d.day() == 6,
                isToday: d.isSame( today, 'day' ),
            }
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
                        // date: this._days[ i ].name,
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
