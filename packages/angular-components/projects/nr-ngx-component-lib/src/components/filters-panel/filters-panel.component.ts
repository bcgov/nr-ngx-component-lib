import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";

@Component( {
    selector: "nrcl-filters-panel",
    templateUrl: "./filters-panel.component.html",
    styleUrl: "./filters-panel.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.hide-filters]': '!showFilters'
    }
} )
export class FiltersPanelComponent extends NrclBase {
    @Input() showClear = true
    @Input() showFilters = true
    @Input() hasAdvancedFilters = false
    @Input() showAdvancedFilters = false

    @Output() clearFilters = new EventEmitter()
    @Output() showFiltersChange = new EventEmitter<boolean>()
    @Output() showAdvancedFiltersChange = new EventEmitter<boolean>()

    onClearClick() {
        this.clearFilters.emit()
    }

    onHideClick() {
        this.showFilters = false
        this.showFiltersChange.emit( false )
    }

    onShowClick() {
        this.showFilters = true
        this.showFiltersChange.emit( true )
    }

    onHideAdvancedClick() {
        this.showAdvancedFilters = false
        this.showAdvancedFiltersChange.emit( false )
    }

    onShowAdvancedClick() {
        this.showAdvancedFilters = true
        this.showAdvancedFiltersChange.emit( true )
    }
}
