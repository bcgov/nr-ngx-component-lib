import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import moment, { Moment } from "moment";
import { NrclBase } from "../../directives/nrcl.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { ButtonComponent } from "../button/button.component";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";

@Component( {
    selector: "nrcl-filter-date",
    templateUrl: "./filter-date.component.html",
    styleUrl: "./filter-date.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.--nrcl-filter-date-width]': 'this.wide ? "var( --nrcl-filter-width-" + this.wide + " )" : null'
    },
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        ButtonComponent
    ],
    providers: [
        provideMomentDateAdapter({
            parse: {
                dateInput: 'YYYY-MM-DD'
            },
            display: {
                dateInput: 'MMMM D, YYYY', // Change how date appears in the input
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            }
        })
    ]
} )
export class FilterDateComponent extends NrclBase implements OnChanges {
    @Input() label = '[label]]'
    @Input() placeholder = 'Select...'
    @Input() hint
    @Input() value = moment().format( DATE_FORMATS.datePickerInput )
    @Input() wide 
    @Input( { transform: booleanAttribute } ) clear = true

    @Output() valueChange = new EventEmitter<string>();

    @ViewChild( 'picker' ) picker: MatDatepicker<Moment>
    @ViewChild( MatInput ) input: MatInput

    ngOnChanges( changes: SimpleChanges ): void {
        console.log(changes)
    }

    onDateChange( ev ) {
        if ( !ev ) {
            this.valueChange.emit( null )
            return
        }

        this.value = ev.format( DATE_FORMATS.datePickerInput )
        this.valueChange.emit( this.value )
    }

    onInputFocus() {
        // console.log('onInputFocus')
        this.picker.open()
    }

    onDatepickerOpened() {
        // console.log('onDatepickerOpened')
        setTimeout(() => {
            this.input.focus()
        },100)
    }

    onCancelClick() {
        this.value = null
        this.valueChange.emit( this.value )
    }

    get isOpen() {
        return this.picker?.opened ?? false
    }

    get hasValue() {
        return !!this.value
    }
}
