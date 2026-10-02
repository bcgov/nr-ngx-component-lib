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
import { ListAttachmentsComponent } from './components/list-attachments/list-attachments.component';
import { ListEventHistoryComponent } from './components/list-event-history/list-event-history.component';
import { ListSelectComponent } from './components/list-select/list-select.component';
import { ResourceScheduleComponent, ResourceScheduleRowHeadingDirective } from './components/resource-schedule/resource-schedule.component';
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
        ListAttachmentsComponent,
        ListEventHistoryComponent,
        ListSelectComponent,
        ResourceScheduleComponent,
        ResourceScheduleRowHeadingDirective,
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
        ListAttachmentsComponent,
        ListEventHistoryComponent,
        ListSelectComponent,
        ResourceScheduleComponent,
        ResourceScheduleRowHeadingDirective,
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
