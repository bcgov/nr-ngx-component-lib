import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    contentChild,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";
import { FilterSearchComponent } from "../filter-search/filter-search.component";

@Component( {
    selector: "nrcl-filters-panel",
    templateUrl: "./filters-panel.component.html",
    styleUrl: "./filters-panel.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.hide-filters]': '!showFilters',
        '[class.has-search]': '!!search'
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

    @ContentChild( FilterSearchComponent ) search: FilterSearchComponent
    
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
