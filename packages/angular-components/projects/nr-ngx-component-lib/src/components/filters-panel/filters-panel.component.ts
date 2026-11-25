import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { NrclBase } from "../../directives/nrcl.base";
import { ButtonComponent } from "../button/button.component";
import { FilterSearchComponent } from "../filter-search/filter-search.component";
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from "../device-view/device-view.component";

@Component( {
    selector: "nrcl-filters-panel",
    templateUrl: "./filters-panel.component.html",
    styleUrl: "./filters-panel.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.hide-filters]': '!showFilters',
        '[class.has-search]': '!!search'
    },
    imports: [
        ButtonComponent,
        DeviceViewComponent,
        DesktopViewDirective,
        MobileViewDirective
    ]
} )
export class FiltersPanelComponent extends NrclBase {
    @Input() showClear = true
    @Input() clearLabel = 'Clear'
    @Input() showFilters = true
    @Input() hasAdvancedFilters = false
    @Input() showAdvancedFilters = false
    @Input() moreFiltersLabels = ['See More','See Less']

    @Output() clearFilters = new EventEmitter()
    /**
     * @deprecated The panel no longer has a button to show or hide the filters, so this is only emitted
     * when `onShowClick` or `onHideClick` is called from code. Set `showFilters` directly instead.
     */
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
