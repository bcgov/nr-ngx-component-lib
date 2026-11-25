import {
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { CodeDescription } from "../../utils/code-table.util";
import { Sort, SortDirection } from "@angular/material/sort";
import { unwrapFilterValue, wrapFilterValue } from "../../utils/filter.util";
import { NrclBase } from "../../directives/nrcl.base";
import { FilterSelectComponent } from "../filter-select/filter-select.component";
import { FilterContainerComponent } from "../filter-container/filter-container.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "nrcl-row-list-sorting",
    templateUrl: "./row-list-sorting.component.html",
    styleUrl: "./row-list-sorting.component.scss",
    imports: [
        FilterSelectComponent,
        FilterContainerComponent,
        MatRadioModule,
        FormsModule,        
    ]
})
export class RowListSortingComponent extends NrclBase {
    @Input() sortColumn: string
    @Input() sortColumnOptions: CodeDescription[] = []
    @Input() sortDirection: SortDirection = 'asc'

    @Output() sortChange = new EventEmitter<Sort>();

    wrapFilterValue = wrapFilterValue 
    unwrapFilterValue = unwrapFilterValue
    
    onSortColumnChange( ev ) {
        this.sortColumn = ev
        this.emitSortChange()
    }

    onSortDirectionChange() {
        this.emitSortChange()
    }

    emitSortChange() {
        this.sortChange.emit( { 
            active: this.sortColumn,
            direction: this.sortDirection
        } )
    }
}
