import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApplicationHeaderComponent } from '../src/components/application-header/application-header.component';
import { ApplicationMenuComponent } from '../src/components/application-menu/application-menu.component';
import { ButtonComponent } from '../src/components/button/button.component';
import { CellContentComponent } from '../src/components/cell-content/cell-content.component';
import { DateNavigatorComponent } from '../src/components/date-navigator/date-navigator.component';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from '../src/components/device-view/device-view.component';
import { DialogConfirmComponent } from '../src/components/dialog-confirm/dialog-confirm.component';
import { DialogComponent } from '../src/components/dialog/dialog.component';
import { ExpansionPanelComponent } from '../src/components/expansion-panel/expansion-panel.component';
import { ExpansionPanelFooterComponent } from '../src/components/expansion-panel/footer/expansion-panel-footer.component';
import { ExpansionPanelHeaderComponent } from '../src/components/expansion-panel/header/expansion-panel-header.component';
import { ExpansionPanelSectionComponent } from '../src/components/expansion-panel/section/expansion-panel-section.component';
import { FilterContainerComponent } from '../src/components/filter-container/filter-container.component';
import { FilterDateComponent } from '../src/components/filter-date/filter-date.component';
import { FilterSearchComponent } from '../src/components/filter-search/filter-search.component';
import { FilterSelectComponent } from '../src/components/filter-select/filter-select.component';
import { FiltersPanelComponent } from '../src/components/filters-panel/filters-panel.component';
import { FormFieldComponent } from '../src/components/form-field/form-field.component';
import { FormLayoutComponent } from '../src/components/form-layout/form-layout.component';
import { GapComponent } from '../src/components/gap/gap.component';
import { IconComponent } from '../src/components/icon/icon.component';
import { IndicatorSelectComponent } from '../src/components/indicator-select/indicator-select.component';
import { IndicatorComponent } from '../src/components/indicator/indicator.component';
import { ListAttachmentsComponent } from '../src/components/list-attachments/list-attachments.component';
import { ListEventHistoryComponent } from '../src/components/list-event-history/list-event-history.component';
import { ListSelectComponent } from '../src/components/list-select/list-select.component';
import { LoadingStatusComponent } from '../src/components/loading-status/loading-status.component';
import { PageContainerComponent } from '../src/components/page-container/page-container.component';
import { PageHeaderComponent } from '../src/components/page-header/page-header.component';
import { ResourceScheduleComponent, ResourceScheduleRowHeadingDirective } from '../src/components/resource-schedule/resource-schedule.component';
import { RowListDesktopComponent } from '../src/components/row-list-desktop/row-list-desktop.component';
import { RowListMobileComponent } from '../src/components/row-list-mobile/row-list-mobile.component';
import { RowListPaginationComponent } from '../src/components/row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from '../src/components/row-list-sorting/row-list-sorting.component';
import { ScheduleComponent, ScheduleItemDirective, ScheduleRowHeadingDirective } from '../src/components/schedule/schedule.component';
import { SnackbarComponent } from '../src/components/snackbar/snackbar.component';
import { TabGroupComponent } from '../src/components/tabs/tab-group/tab-group.component';
import { TabComponent, TabContentDirective, TabLabelDirective } from '../src/components/tabs/tab/tab.component';
import { TagListComponent } from '../src/components/tag-list/tag-list.component';
import { TooltipComponent, TooltipDirective } from '../src/directives/tooltip/tooltip.directive';
import { ApplicationComponent } from '../src/components/application/application.component';

// Mirrors NrNgxComponentLibModule (minus BrowserAnimationsModule, which storybook
// provides via provideAnimations() in .storybook/preview.ts). The library components
// are not standalone on this branch, so stories declare them rather than import them.

export const NRCL_STORY_IMPORTS = [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
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
    NgxPaginationModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
]

export const NRCL_STORY_DECLARATIONS = [
    ApplicationComponent,
    ApplicationHeaderComponent,
    ApplicationMenuComponent,
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
    TabComponent,
    TabLabelDirective,
    TabContentDirective,
    LoadingStatusComponent,
    ScheduleComponent,
    ScheduleItemDirective,
    ScheduleRowHeadingDirective,
    ResourceScheduleComponent,
    ResourceScheduleRowHeadingDirective,
    DateNavigatorComponent,
    TooltipDirective,
    TooltipComponent,
]
