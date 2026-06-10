import { AfterContentInit, AfterViewInit, booleanAttribute, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, inject, Input, numberAttribute, OnChanges, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { NrclBase } from '../../directives/nrcl.base';
import moment from 'moment';
import { RowListBase } from '../../directives/row-list.base';
import { Observable } from 'rxjs';
import { PaginationState } from '../../directives/pagination.base';
import { MatMenu, MatMenuPanel } from '@angular/material/menu';
// import { PaginationState } from '../../public-api';

@Directive( {
    selector: '[nrclScheduleRowHeading]'
} )
export class ScheduleRowHeadingDirective {
    constructor(
        public template: TemplateRef<any>
    ){
        // console.log('ScheduleRowHeadingDirective')

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
        // console.log('ScheduleItemDirective')
    }
}

// ================================================================================

export type ScheduleRowItem = {
    id: string,
    // date: string,
    name: string,
    // data?: any
    // template?: TemplateRef<any>
}

export type ScheduleRow = {
    id?: string,
    heading: any,
    items: Promise<ScheduleRowItem[]>
}

export type Schedule = ScheduleRow[]

type Day = {
    dayName: string,
    monthDay: number,
    date: string,
    isWeekend: boolean,
    isToday: boolean,
    isFirst: boolean
}

type Week = {
    start: string,
    end: string,
    span: number
}

// --------------------------------------------------------------------------------

export type FetchScheduleParameters = {
    pageNumber: number
    pageSize: number
    sortActive: string
    sortDirection: string
}

export type FetchScheduleRowParameters = {
    resourceId: string
}

export interface ScheduleProvider {
    fetchSchedule( x: FetchScheduleParameters ): Observable<any>
    parseSchedule( res: any ): Schedule
    getInitialPageState(): PaginationState<{}>
}

// --------------------------------------------------------------------------------

@Component( {
    selector: 'nrcl-schedule',
    templateUrl: './schedule.component.html',
    styleUrl: './schedule.component.scss',
    host: {
        '[style.--nrcl-schedule-day-count]': 'this.dayCount'
    }
} )
export class ScheduleComponent extends RowListBase<{},ScheduleRow> implements AfterContentInit, OnChanges {
    changeDetectorRef = inject( ChangeDetectorRef )

    @Input() provider?: ScheduleProvider
    @Input() startDate?: string
    @Input( { transform: numberAttribute } ) weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number
    // @Input() schedule?: Schedule
    @Input() menu?: MatMenuPanel

    @ContentChildren(ScheduleItemDirective) itemTemplates!: QueryList<ScheduleItemDirective>;
    @ContentChild(ScheduleRowHeadingDirective) headerTemplate!: ScheduleRowHeadingDirective

    // protected _rows: Schedule = []
    protected _days: Day[] = []
    protected _weeks: Week[] = []
    protected _templates: TemplateRef<any>[][] = []

    ngOnChanges( changes: SimpleChanges ): void {
        // this.makeRows()
        this.refreshRowList()
    }

    ngAfterViewInit(): void {
        console.log('ScheduleComponent.ngAfterViewInit')
        // this.makeRows()
        // this.refreshRowList()
        setTimeout(() => {
            super.ngAfterViewInit()
        });
    }

    ngAfterContentInit(): void {
        // console.log('ScheduleComponent.ngAfterContentInit')
        // this.makeRows()
        // this.refreshRowList()
    }

    fetchRowListPage(): Observable<any> {
        if ( !this.provider?.fetchSchedule ) throw Error( 'ScheduleComponent.provider.fetchSchedule not set' )

        return this.provider.fetchSchedule( {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sortActive: this.sortActive,
            sortDirection: this.sortDirection,
        } )
    }

    parseRows( res: any ): ScheduleRow[] {
        if ( !this.provider?.parseSchedule ) throw Error( 'ResourceScheduleComponent.provider.parseSchedule not set' )

        let rows = this.provider.parseSchedule( res )
        // console.log(x)
        // return x

        // let rows = this.displayResourceSchedule( res )

        return this.makeRows( rows )
    }

    // parseTotalRowCount( res: any ): number {
    //     return res.
    // }

    // displayResourceSchedule( res: any ): ScheduleRow[] {
    //     throw new Error( 'Method not implemented.' );
    // }

    getInitialPageState(): PaginationState<{}> {
        if ( !this.provider?.getInitialPageState ) throw Error( 'ResourceScheduleComponent.provider.getInitialPageState not set' )

        return this.provider.getInitialPageState()
    }

    onSamePageFilterChange( ev: {} ): void {
        this.filter = ev
    }

    makeRows( schedule: Schedule ): Schedule {
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
                dayName: d.format( 'ddd' ),
                monthDay: d.date(),
                date: d.format( 'Y-MM-DD' ),
                isFirst: d.date() == 1,
                isWeekend: d.day() == 0 || d.day() == 6,
                isToday: d.isSame( today, 'day' ),

            }
        } )

        this._templates = Array.from( { length: schedule.length } )

        return schedule.map( ( row, i ) => {
            this._templates[ i ] = Array.from( { length: this.dayCount! } )

            return {
                id: row.id ?? String( i ),
                heading: clone( row.heading ),
                items: row.items
                    .then( rowItems => {
                        return Array.from( { length: this.dayCount! } ).map( ( x, j ) => {
                            let rowItem = rowItems[ j ]
                            // let name: string
                            // let data
                            // let id

                            if ( rowItem == null ) 
                                return {
                                    id: String( j ),
                                    // date: this._days[ j ].date,
                                    name: 'empty'
                                }
                            
                            // else if ( typeof rowItem == 'string' ) {
                                // name = rowItem
                            // }
                            // else {
                            //     id = rowItem.id
                            //     name = rowItem.name
                            //     data = clone( rowItem.data || null )
                            // }

                            this._templates[ i ][ j ] = this.itemTemplates?.find( i => i.name == rowItem?.name  )?.template!

                            return rowItem
                                // id: String( j ),
                                // ...rowItem,
                                // date: this._days[ j ].date,
                                // name: name,
                                // template: this.itemTemplates?.find( i => i.name == name )?.template!
                            // }
                        } )
                    } )
            }
        } ) || []
    }
}

function clone<T>( obj: T ): T {
    return JSON.parse( JSON.stringify( obj ) )
}
