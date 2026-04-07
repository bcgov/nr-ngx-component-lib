import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from "@angular/core";
import moment, { Moment } from "moment";
import { DATE_FORMATS } from "../../utils/date.util";
import { NrclBase } from "../../directives/nrcl.base";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatInput } from "@angular/material/input";

@Component( {
    selector: "nrcl-filter-date",
    templateUrl: "./filter-date.component.html",
    styleUrl: "./filter-date.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.--nrcl-filter-date-width]': 'this.wide ? "var( --nrcl-filter-width-" + this.wide + " )" : null'
    }
} )
export class FilterDateComponent extends NrclBase {
    @Input() label = '[label]]'
    @Input() placeholder = 'Select...'
    @Input() hint
    @Input() value = moment().format( DATE_FORMATS.datePickerInput )
    @Input() wide 

    @Output() valueChange = new EventEmitter<string>();

    @ViewChild( 'picker' ) picker: MatDatepicker<Moment>
    @ViewChild( MatInput ) input: MatInput

    onDateChange( ev ) {
        console.log(ev)
        if ( !ev ) {
            this.valueChange.emit( null )
            return
        }

        let date = moment( ev ).format( DATE_FORMATS.datePickerInput )
        this.valueChange.emit( date )
    }

    onInputFocus() {
        console.log('onInputFocus')
        this.picker.open()
    }

    onDatepickerOpened() {
        console.log('onDatepickerOpened')
        setTimeout(() => {
            this.input.focus()
        },100)

    }
}
