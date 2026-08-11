import { Component, ElementRef, EventEmitter, inject, Input, numberAttribute, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { NrclBase } from '../../directives/nrcl.base';
import { DATE_FORMATS } from '../../utils/date.util';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component( {
    selector: 'nrcl-date-navigator',
    templateUrl: './date-navigator.component.html',
    styleUrl: './date-navigator.component.scss',
    providers: [
        provideMomentDateAdapter( {
            parse: {
                dateInput: 'YYYY-MM-DD'
            },
            display: {
                dateInput: 'MMMM D, YYYY', // Change how date appears in the input
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            }
        } )
    ]
} )
export class DateNavigatorComponent extends NrclBase implements OnChanges {
    elementRef = inject( ElementRef )

    @Input() value = moment().format( DATE_FORMATS.datePickerInput )   
    @Input( { transform: numberAttribute } ) largeChange = 7
    @Input( { transform: numberAttribute } ) smallChange = 1
    
    @Output() valueChange = new EventEmitter<string>();

    @ViewChild( 'picker' ) picker: MatDatepicker<Moment>
    @ViewChild( 'input' ) input: ElementRef

    date?: Moment

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.value ) {
            this.date = moment( this.value )
        }
    }

    onDateNav( offset: number ) { //console.log( 'onDateNav', offset ) 
        if ( offset == 0 ) {
            this.date = moment()
        }
        else {
            this.date = this.date!.clone().add( offset, 'day' )
        }

        this.valueChange.emit( this.date.format( DATE_FORMATS.datePickerInput ) )
    }
    
    onDateChange( ev ) { //console.log( 'onDateChange', ev ) 
        this.date = ev

        this.valueChange.emit( this.date!.format( DATE_FORMATS.datePickerInput ) )
    }
    
    onInputFocus( ev ) { //console.log( 'onInputFocus', ev ) 
        this.picker.open()
        this.input.nativeElement.blur()
    }
}
