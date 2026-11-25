import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
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
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DATE_FORMATS, MatDateFormats } from "@angular/material/core";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { JsonPipe } from "@angular/common";

const DEFAULT_DISPLAY_FORMAT = 'MMMM D, YYYY'

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
        ButtonComponent,
    ],
    providers: [
        provideMomentDateAdapter(),
        // per-instance formats, so the input's display format can follow the displayFormat input
        {
            provide: MAT_DATE_FORMATS,
            useFactory: (): MatDateFormats => {
                const component = inject( FilterDateComponent )

                return {
                    parse: {
                        dateInput: 'YYYY-MM-DD'
                    },
                    display: {
                        get dateInput() { return component.displayFormat },
                        monthYearLabel: 'MMM YYYY',
                        dateA11yLabel: 'LL',
                        monthYearA11yLabel: 'MMMM YYYY',
                    }
                }
            }
        }
    ]
} )
export class FilterDateComponent extends NrclBase implements OnChanges {
    @Input() label = '[label]'
    // moment format used to show the selected date in the input
    @Input() displayFormat = DEFAULT_DISPLAY_FORMAT
    @Input() placeholder = 'Select...'
    @Input() hint?: string
    @Input() value: string|undefined = moment().format( DATE_FORMATS.datePickerInput )
    @Input() wide?: string
    @Input( { transform: booleanAttribute } ) clear = true
    @Input() min?: string
    @Input() minErrorMessage = 'Date is too soon'
    @Input() max?: string
    @Input() maxErrorMessage = 'Date is too late'

    @Output() valueChange = new EventEmitter<string|undefined>();

    @ViewChild( 'picker' ) picker?: MatDatepicker<Moment>
    @ViewChild( MatInput ) input?: MatInput
    @ViewChild( MatDatepickerInput ) datepickerInput?: MatDatepickerInput<Moment>

    ngOnChanges( changes: SimpleChanges ): void {
        // the input's text is only formatted when its value is set, so re-set it to apply the new format
        if ( changes[ 'displayFormat' ] && !changes[ 'displayFormat' ].firstChange && this.datepickerInput ) {
            this.datepickerInput.value = this.datepickerInput.value
        }
    }

    onDateChange( ev: Moment ) {
        if ( !ev ) {
            this.valueChange.emit( undefined )
            return
        }

        this.value = ev.format( DATE_FORMATS.datePickerInput )
        this.valueChange.emit( this.value )
    }

    onInputFocus() {
        this.picker?.open()
    }

    onCancelClick() {
        this.value = undefined
        this.valueChange.emit( this.value )
    }

    get isOpen() {
        return this.picker?.opened ?? false
    }

    get hasValue() {
        return !!this.value
    }
}
