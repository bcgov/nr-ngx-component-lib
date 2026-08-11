import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, numberAttribute, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
export class DateNavigatorComponent extends NrclBase implements OnChanges {
    elementRef = inject( ElementRef )
    // changeDetectorRef = inject( ChangeDetectorRef )

    // @Input() label = ''
    // @Input() placeholder = 'Select...'
    // @Input() hint?: string
    // @Input() value = moment() //. format( DATE_FORMATS.datePickerInput )
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
            // console.log(this.value,this.date)
        }
    }

    onDateNav( offset: number ) { console.log( 'onDateNav', offset ) 
        if ( offset == 0 ) {
            this.date = moment() //.format( DATE_FORMATS.datePickerInput )
        }
        else {
            // let d = moment( this.value )
            this.date = this.date!.clone().add( offset, 'day' ) //.format( DATE_FORMATS.datePickerInput )
        }
// console.log(this.date.format( DATE_FORMATS.datePickerInput ))
        // this.changeDetectorRef.markForCheck()
        this.valueChange.emit( this.date.format( DATE_FORMATS.datePickerInput ) )
    }
    
    onDateChange( ev ) { console.log( 'onDateChange', ev ) 
        this.date = ev
        this.valueChange.emit( this.date!.format( DATE_FORMATS.datePickerInput ) )
    }
    
    onInputFocus( ev ) { console.log( 'onInputFocus', ev ) 
        this.picker.open()
        this.input.nativeElement.blur()
    }

    onDatepickerOpened( ev ) { console.log( 'onDatepickerOpened', ev ) }
}
