import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
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
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from './components/device-view/device-view.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ExpansionPanelFooterComponent } from './components/expansion-panel/footer/expansion-panel-footer.component';
import { ExpansionPanelHeaderComponent } from './components/expansion-panel/header/expansion-panel-header.component';
import { ExpansionPanelSectionComponent } from './components/expansion-panel/section/expansion-panel-section.component';
import { FilterContainerComponent } from './components/filter-container/filter-container.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';
import { FiltersPanelComponent } from './components/filters-panel/filters-panel.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { GapComponent } from './components/gap/gap.component';
import { IconComponent } from './components/icon/icon.component';
import { IndicatorSelectComponent } from './components/indicator-select/indicator-select.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ListAttachmentsComponent } from './components/list-attachments/list-attachments.component';
import { ListEventHistoryComponent } from './components/list-event-history/list-event-history.component';
import { ListSelectComponent } from './components/list-select/list-select.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RowListDesktopComponent } from './components/row-list-desktop/row-list-desktop.component';
import { RowListMobileComponent } from './components/row-list-mobile/row-list-mobile.component';
import { RowListPaginationComponent } from './components/row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from './components/row-list-sorting/row-list-sorting.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { ConfigurationService } from './services/configuration.service';
import { DialogService } from './services/dialog.service';
import { PageStateService } from './services/page-state.service';
import { SnackbarUtilService } from './services/snackbar-util.service';
import { DATE_FORMATS } from './utils/date.util';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { TabGroupComponent } from './components/tabs/tab-group/tab-group.component';
import { TabComponent } from './components/tabs/tab/tab.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
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
        MatDialogModule
    ],
    declarations: [
        ButtonComponent,
        CellContentComponent,
        ExpansionPanelComponent,
        ExpansionPanelHeaderComponent,
        ExpansionPanelFooterComponent,
        ExpansionPanelSectionComponent,
        FilterContainerComponent,
        FilterDateComponent,
        FilterSearchComponent,
        FilterSelectComponent,
        FiltersPanelComponent,
        FormFieldComponent,
        FormLayoutComponent,
        GapComponent,
        ListAttachmentsComponent,
        ListEventHistoryComponent,
        PageContainerComponent,
        PageHeaderComponent,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListPaginationComponent,
        RowListSortingComponent,
        SnackbarComponent,
        TagListComponent,
        DesktopViewDirective,
        MobileViewDirective,
        DeviceViewComponent,
        IconComponent,
        IndicatorComponent,
        DialogComponent,
        DialogConfirmComponent,
        IndicatorSelectComponent,
        ListSelectComponent,
        TabGroupComponent,
        TabComponent
    ],
    exports: [
        ButtonComponent,
        CellContentComponent,
        ExpansionPanelComponent,
        ExpansionPanelHeaderComponent,
        ExpansionPanelFooterComponent,
        ExpansionPanelSectionComponent,
        FilterContainerComponent,
        FilterDateComponent,
        FilterSearchComponent,
        FilterSelectComponent,
        FiltersPanelComponent,
        FormFieldComponent,
        FormLayoutComponent,
        GapComponent,
        ListAttachmentsComponent,
        ListEventHistoryComponent,
        PageContainerComponent,
        PageHeaderComponent,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListPaginationComponent,
        RowListSortingComponent,
        SnackbarComponent,
        TagListComponent,
        DesktopViewDirective,
        MobileViewDirective,
        DeviceViewComponent,
        IconComponent,
        IndicatorComponent,
        DialogComponent,
        DialogConfirmComponent,
        IndicatorSelectComponent,
        ListSelectComponent,
        TabGroupComponent,
        TabComponent
    ],
    providers: [
        SnackbarUtilService,
        ConfigurationService,
        PageStateService,
        DialogService,
        { provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS },
    ]
})
export class NrNgxComponentLibModule {
}
