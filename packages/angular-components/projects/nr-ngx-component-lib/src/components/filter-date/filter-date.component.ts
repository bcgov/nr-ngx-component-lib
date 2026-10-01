import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import moment from "moment";
import { NrclBase } from "../../directives/nrcl.base";
import { DATE_FORMATS } from "../../utils/date.util";
import { ButtonComponent } from "../button/button.component";

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
        FormsModule,
        ButtonComponent
    ]
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
