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
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule, MatDateRangePicker, MatEndDate, MatStartDate } from "@angular/material/datepicker";
import { MAT_DATE_FORMATS, MatDateFormats } from "@angular/material/core";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { Moment } from "moment";
import { NrclBase } from "../../directives/nrcl.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { ButtonComponent } from "../button/button.component";

const DEFAULT_DISPLAY_FORMAT = 'MMM D, YYYY'

@Component( {
    selector: "nrcl-filter-date-range",
    templateUrl: "./filter-date-range.component.html",
    styleUrl: "./filter-date-range.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.--nrcl-filter-date-range-width]': 'this.wide ? "var( --nrcl-filter-width-" + this.wide + " )" : null'
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
        // per-instance formats, so the inputs' display format can follow the displayFormat input
        {
            provide: MAT_DATE_FORMATS,
            useFactory: (): MatDateFormats => {
                const component = inject( FilterDateRangeComponent )

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
export class FilterDateRangeComponent extends NrclBase implements OnChanges {
    @Input() label = '[label]'
    // moment format used to show the selected dates in the inputs
    @Input() displayFormat = DEFAULT_DISPLAY_FORMAT
    @Input() startPlaceholder = 'Start'
    @Input() endPlaceholder = 'End'
    @Input() hint?: string
    // [ start, end ], both YYYY-MM-DD, like the other filters' string[] values. [] when there's no range
    @Input() value: string[] = []
    @Input() wide?: string
    @Input( { transform: booleanAttribute } ) clear = true
    @Input() min?: string
    @Input() minErrorMessage = 'Start date is too soon'
    @Input() max?: string
    @Input() maxErrorMessage = 'End date is too late'

    // emits [ start, end ] only when both ends are picked, or [] when the range is cleared
    @Output() valueChange = new EventEmitter<string[]>();

    @ViewChild( 'picker' ) picker?: MatDateRangePicker<Moment>
    @ViewChild( MatStartDate ) startInput?: MatStartDate<Moment>
    @ViewChild( MatEndDate ) endInput?: MatEndDate<Moment>

    // what the inputs show, which can be half a range while the user is picking
    start: string | undefined
    end: string | undefined

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes[ 'value' ] ) {
            this.resetToValue()
        }

        // the inputs' text is only formatted when their value is set, so re-set it to apply the new format
        if ( changes[ 'displayFormat' ] && !changes[ 'displayFormat' ].firstChange ) {
            if ( this.startInput ) this.startInput.value = this.startInput.value
            if ( this.endInput ) this.endInput.value = this.endInput.value
        }
    }

    onStartChange( ev: Moment | null ) {
        this.start = ev ? ev.format( DATE_FORMATS.datePickerInput ) : undefined
    }

    onEndChange( ev: Moment | null ) {
        this.end = ev ? ev.format( DATE_FORMATS.datePickerInput ) : undefined

        if ( this.start && this.end ) {
            this.value = [ this.start, this.end ]
            this.valueChange.emit( this.value )
        }
    }

    onPickerClosed() {
        // the user closed the calendar after picking only a start date: go back to the last complete range
        if ( !this.start || !this.end ) {
            this.resetToValue()
        }
    }

    onInputClick() {
        this.picker?.open()
    }

    onCancelClick() {
        this.value = []
        this.resetToValue()
        this.valueChange.emit( this.value )
    }

    get isOpen() {
        return this.picker?.opened ?? false
    }

    get hasValue() {
        return !!( this.start && this.end )
    }

    private resetToValue() {
        // only show a complete range
        const [ start, end ] = this.value ?? []

        this.start = start && end ? start : undefined
        this.end = start && end ? end : undefined
    }
}
