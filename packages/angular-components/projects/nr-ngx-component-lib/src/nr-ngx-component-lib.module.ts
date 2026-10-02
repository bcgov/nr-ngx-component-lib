import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { IndicatorSelectComponent } from './components/indicator-select/indicator-select.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ListAttachmentsComponent } from './components/list-attachments/list-attachments.component';
import { ListEventHistoryComponent } from './components/list-event-history/list-event-history.component';
import { ListSelectComponent } from './components/list-select/list-select.component';
import { LoadingStatusComponent } from './components/loading-status/loading-status.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ResourceScheduleComponent, ResourceScheduleRowHeadingDirective } from './components/resource-schedule/resource-schedule.component';
import { RowListDesktopComponent } from './components/row-list-desktop/row-list-desktop.component';
import { RowListMobileComponent } from './components/row-list-mobile/row-list-mobile.component';
import { RowListPaginationComponent } from './components/row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from './components/row-list-sorting/row-list-sorting.component';
import { ScheduleComponent, ScheduleItemDirective, ScheduleRowHeadingDirective } from './components/schedule/schedule.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabGroupComponent } from './components/tabs/tab-group/tab-group.component';
import { TabComponent, TabContentDirective, TabLabelDirective } from './components/tabs/tab/tab.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TooltipComponent, TooltipDirective } from './directives/tooltip/tooltip.directive';
import { ConfigurationService } from './services/configuration.service';
import { DialogService } from './services/dialog.service';
import { PageStateService } from './services/page-state.service';
import { SnackbarUtilService } from './services/snackbar-util.service';
import { DATE_FORMATS } from './utils/date.util';

@NgModule({
    imports: [
        BrowserAnimationsModule,
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
        MatTabsModule
    ],
    declarations: [
        FormFieldComponent,
        FormLayoutComponent,
        IndicatorComponent,
        IndicatorSelectComponent,
        ListAttachmentsComponent,
        ListEventHistoryComponent,
        ListSelectComponent,
        LoadingStatusComponent,
        PageContainerComponent,
        PageHeaderComponent,
        ResourceScheduleComponent,
        ResourceScheduleRowHeadingDirective,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListPaginationComponent,
        RowListSortingComponent,
        ScheduleComponent,
        ScheduleItemDirective,
        ScheduleRowHeadingDirective,
        SnackbarComponent,
        TabComponent,
        TabContentDirective,
        TabGroupComponent,
        TabLabelDirective,
        TagListComponent,
        TooltipComponent,
        TooltipDirective,
    ],
    exports: [
        FormFieldComponent,
        FormLayoutComponent,
        IndicatorComponent,
        IndicatorSelectComponent,
        ListAttachmentsComponent,
        ListEventHistoryComponent,
        ListSelectComponent,
        LoadingStatusComponent,
        PageContainerComponent,
        PageHeaderComponent,
        ResourceScheduleComponent,
        ResourceScheduleRowHeadingDirective,
        RowListDesktopComponent,
        RowListMobileComponent,
        RowListPaginationComponent,
        RowListSortingComponent,
        ScheduleComponent,
        ScheduleItemDirective,
        ScheduleRowHeadingDirective,
        SnackbarComponent,
        TabComponent,
        TabContentDirective,
        TabGroupComponent,
        TabLabelDirective,
        TagListComponent,
        TooltipComponent,
        TooltipDirective,
    ],
    providers: [
        SnackbarUtilService,
        ConfigurationService,
        PageStateService,
        DialogService,
    ]
})
export class NrNgxComponentLibModule {
}
