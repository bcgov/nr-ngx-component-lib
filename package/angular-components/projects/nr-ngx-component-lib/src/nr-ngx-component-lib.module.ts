import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlMomentDateTimeModule } from "@busacca/ng-pick-datetime";
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonComponent } from './components/button/button.component';
import { CellContentComponent } from './components/cell-content/cell-content.component';
import { DesktopViewComponent, MobileViewComponent } from './components/device-view/device-view.component';
import { ExpansionPanelComponent, ExpansionPanelFooterComponent, ExpansionPanelHeaderComponent } from './components/expansion-panel/expansion-panel.component';
import { FilterContainerComponent } from './components/filter-container/filter-container.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';
import { GapComponent } from './components/gap/gap.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RowListDesktopComponent } from './components/row-list-desktop/row-list-desktop.component';
import { RowListMobileComponent } from './components/row-list-mobile/row-list-mobile.component';
import { RowListPaginationComponent } from './components/row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from './components/row-list-sorting/row-list-sorting.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ConfigurationService } from './services/configuration.service';
import { PageStateService } from './services/page-state.service';
import { SnackbarUtilService } from './services/snackbar-util.service';
import { DATE_FORMATS } from './utils/date.util';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { FormFieldComponent } from './components/form-field/form-field.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatRadioModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        NgxPaginationModule,
    ],
    declarations: [
        ButtonComponent,
        CellContentComponent,
        DesktopViewComponent,
        ExpansionPanelComponent,
        ExpansionPanelHeaderComponent,
        ExpansionPanelFooterComponent,
        FilterContainerComponent,
        FilterDateComponent,
        FilterSearchComponent,
        FilterSelectComponent,
        FiltersPanelComponent,
        FormFieldComponent,
        FormLayoutComponent,
        GapComponent,
        MobileViewComponent,
        PageContainerComponent,
        PageHeaderComponent,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListPaginationComponent,
        RowListSortingComponent,
        SnackbarComponent,
    ],
    exports: [
        ButtonComponent,
        CellContentComponent,
        DesktopViewComponent,
        ExpansionPanelComponent,
        ExpansionPanelHeaderComponent,
        ExpansionPanelFooterComponent,
        FilterContainerComponent,
        FilterDateComponent,
        FilterSearchComponent,
        FilterSelectComponent,
        FiltersPanelComponent,
        FormFieldComponent,
        FormLayoutComponent,
        GapComponent,
        MobileViewComponent,
        PageContainerComponent,
        PageHeaderComponent,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListPaginationComponent,
        RowListSortingComponent,
        SnackbarComponent,
    ],
    providers: [
        SnackbarUtilService,
        ConfigurationService,
        PageStateService,
        { provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS },
    ]
})
export class NrNgxComponentLibModule
 {}
