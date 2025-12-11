import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import moment from "moment";
import { DATE_FORMATS } from "../../utils/date.util";

@Component( {
    selector: "nrcl-filter-date",
    templateUrl: "./filter-date.component.html",
    styleUrl: "./filter-date.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class FilterDateComponent {
    @Input() label = '[label]]'
    @Input() placeholder = 'Select...'
    @Input() hint
    @Input() value = moment().format( DATE_FORMATS.datePickerInput )

    @Output() valueChange = new EventEmitter<string>();

    onDateChange( ev ) {
        if ( !ev ) {
            this.valueChange.emit( null )
            return
        }

        let date = ev.format( DATE_FORMATS.datePickerInput )
        this.valueChange.emit( date )
    }
}
