import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";

@Component( {
    selector: "nrcl-filters-panel",
    templateUrl: "./filters-panel.component.html",
    styleUrl: "./filters-panel.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class FiltersPanelComponent {
    @Input() showClear = true
    @Input() showFilters = true

    @Output() clearFilters = new EventEmitter()
    @Output() showFiltersChange = new EventEmitter<boolean>()

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
}
