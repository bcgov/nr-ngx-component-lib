import {
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { CodeDescription } from "../../utils/code-table.util";
import { Sort, SortDirection } from "@angular/material/sort";
import { unwrapFilterValue, wrapFilterValue } from "../../utils/filter.util";

@Component({
    selector: "nrcl-row-list-sorting",
    templateUrl: "./row-list-sorting.component.html",
    styleUrl: "./row-list-sorting.component.scss",
})
export class RowListSortingComponent {
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
