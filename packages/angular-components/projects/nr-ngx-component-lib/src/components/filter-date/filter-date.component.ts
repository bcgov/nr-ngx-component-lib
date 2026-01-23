import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import moment from "moment";
import { DATE_FORMATS } from "../../utils/date.util";
import { NrclBase } from "../../directives/nrcl.base";

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

    onDateChange( ev ) {
        if ( !ev ) {
            this.valueChange.emit( null )
            return
        }

        let date = ev.format( DATE_FORMATS.datePickerInput )
        this.valueChange.emit( date )
    }
}
