import { Component, ContentChild, ContentChildren, Directive, Input, numberAttribute, OnChanges, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import moment from 'moment';
import { Observable } from 'rxjs';
import { InitialState, PaginationState } from '../../directives/pagination.base';
import { RowListBase } from '../../directives/row-list.base';

@Directive( {
    selector: '[nrclScheduleRowHeading]'
} )
export class ScheduleRowHeadingDirective {
    constructor(
        public template: TemplateRef<any>
    ){}
}

// ================================================================================

@Directive( {
    selector: '[nrclScheduleItem]'
} )
export class ScheduleItemDirective {
    @Input( 'nrclScheduleItem' ) name?: string

    constructor(
        public template: TemplateRef<any>
    ){}
}

// ================================================================================

export type ScheduleRowItem = {
    id: string,
    name: string,
    icons?: () => string[],
    tooltip?: () => string,
    travel?: boolean,
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
    isFirst: boolean,
    isHighlight: boolean,
}

type Week = {
    start: string,
    end: string,
    span: number
}

// --------------------------------------------------------------------------------

export type FetchScheduleRowParameters = {
    resourceId: string
}

export interface ScheduleProvider {
    startloadSchedule( inner: () => Promise<any> ): Promise<any>
    fetchSchedule(): Observable<any>
    parseSchedule( res: any ): Schedule
    getInitialPageState(): InitialState<{}>
    completedLoadSchedule( inner: () => void ): any
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
export class ScheduleComponent extends RowListBase<{},ScheduleRow> implements OnChanges {
    @Input() provider?: ScheduleProvider
    @Input() startDate?: string
    @Input( { transform: numberAttribute } ) weekStart = 0
    @Input( { transform: numberAttribute } ) dayCount?: number
    @Input() menu?: MatMenuPanel
    @Input() hover = true
    @Input() highlightDate?: string

    @ContentChildren(ScheduleItemDirective) itemTemplates!: QueryList<ScheduleItemDirective>
    @ContentChild(ScheduleRowHeadingDirective) headerTemplate!: ScheduleRowHeadingDirective

    protected _days: Day[] = []
    protected _weeks: Week[] = []
    protected _templates: TemplateRef<any>[][] = []

    ngOnChanges( changes: SimpleChanges ): void {
        // this.refreshRowList()
    }

    ngAfterViewInit(): void {
        // console.log('ScheduleComponent.ngAfterViewInit')
        super.ngAfterViewInit()
    }

    loadRowList(): Promise<any> {
        if ( !this.provider?.startloadSchedule ) throw Error( 'ScheduleComponent.provider.startloadSchedule not set' )
     
        return this.provider.startloadSchedule( () => { return super.loadRowList() } )
    }

    fetchRowListPage(): Observable<any> {
        if ( !this.provider?.fetchSchedule ) throw Error( 'ScheduleComponent.provider.fetchSchedule not set' )

        return this.provider.fetchSchedule()
    }

    parseRows( res: any ): ScheduleRow[] {
        if ( !this.provider?.parseSchedule ) throw Error( 'ScheduleComponent.provider.parseSchedule not set' )

        let rows = this.provider.parseSchedule( res )
        return this.makeRows( rows )
    }

    getInitialPageState(): InitialState<{}> {
        if ( !this.provider?.getInitialPageState ) throw Error( 'ScheduleComponent.provider.getInitialPageState not set' )

        return this.provider.getInitialPageState()
    }

    completedRowListPage(): PaginationState<{}> {
        if ( !this.provider?.completedLoadSchedule ) throw Error( 'ScheduleComponent.provider.completedRowListPage not set' )

        return this.provider.completedLoadSchedule( super.completedRowListPage )
    }

    onSamePageFilterChange( ev: {} ): void {
        this.filter = ev
        this.refreshRowList()
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
                isHighlight: d.isSame( this.highlightDate, 'day' )
            }
        } )

        this._templates = Array.from( { length: schedule.length } )

        return schedule.map( ( row, i ) => {
            this._templates[ i ] = Array.from( { length: this.dayCount! } )

            return {
                id: row.id ?? String( i ),
                heading: row.heading,
                items: row.items
                    .then( rowItems => {
                        return Array.from( { length: this.dayCount! } ).map( ( x, j ) => {
                            let rowItem = rowItems[ j ]

                            if ( rowItem == null ) 
                                return {
                                    id: String( j ),
                                    name: 'empty'
                                }
                            
                            this._templates[ i ][ j ] = this.itemTemplates?.find( i => i.name == rowItem?.name  )?.template!

                            return rowItem
                        } )
                    } )
            }
        } ) || []
    }
}
