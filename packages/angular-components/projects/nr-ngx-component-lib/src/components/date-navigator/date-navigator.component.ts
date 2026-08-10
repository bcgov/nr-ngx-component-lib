import { Component, ElementRef, EventEmitter, inject, Input, numberAttribute, Output, ViewChild } from '@angular/core';
import moment, { Moment } from 'moment';
import { NrclBase } from '../../directives/nrcl.base';
import { DATE_FORMATS } from '../../utils/date.util';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';

@Component( {
    selector: 'nrcl-date-navigator',
    templateUrl: './date-navigator.component.html',
    styleUrl: './date-navigator.component.scss',
    // host: {
    //     '[class]': "'status-' + status",
    //     '[class.normal]': "!large",
    //     '[class.large]': "large"
    // }
} )
export class DateNavigatorComponent extends NrclBase {
    // @Input() label = ''
    // @Input() placeholder = 'Select...'
    // @Input() hint?: string
    @Input() value = moment() //. format( DATE_FORMATS.datePickerInput )
    @Input( { transform: numberAttribute } ) largeChange = 7
    @Input( { transform: numberAttribute } ) smallChange = 1
    
    @Output() change = new EventEmitter<Moment>() 

    @ViewChild( 'picker' ) picker: MatDatepicker<Moment>
    @ViewChild( 'input' ) input: ElementRef

    elementRef = inject( ElementRef )

    onDateNav( offset: number ) { console.log( 'onDateNav', offset ) 
        if ( offset == 0 ) {
            this.value = moment() //.format( DATE_FORMATS.datePickerInput )
        }
        else {
            let d = moment( this.value )
            this.value = d.add( offset, 'day' ) //.format( DATE_FORMATS.datePickerInput )
        }
    }
    
    onDateChange( ev ) { console.log( 'onDateChange', ev ) 
        this.change.emit( ev )
    }
    
    onInputFocus( ev ) { console.log( 'onInputFocus', ev ) 
        this.picker.open()
        this.input.nativeElement.blur()
    }

    onDatepickerOpened( ev ) { console.log( 'onDatepickerOpened', ev ) }
}
