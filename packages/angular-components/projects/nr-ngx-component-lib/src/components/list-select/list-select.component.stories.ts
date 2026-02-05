import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlMomentDateTimeModule } from '@busacca/ng-pick-datetime';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import moment from 'moment';
import { NgxPaginationModule } from 'ngx-pagination';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { of } from 'rxjs';
import { ConfigurationService } from '../../services/configuration.service';
import { DATE_FORMATS } from '../../utils/date.util';
import { ButtonComponent } from '../button/button.component';
import { CellContentComponent } from '../cell-content/cell-content.component';
import { FilterContainerComponent } from '../filter-container/filter-container.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';
import { GapComponent } from '../gap/gap.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { RowListDesktopComponent } from '../row-list-desktop/row-list-desktop.component';
import { RowListMobileComponent } from '../row-list-mobile/row-list-mobile.component';
import { RowListPaginationComponent } from '../row-list-pagination/row-list-pagination.component';
import { RowListSortingComponent } from '../row-list-sorting/row-list-sorting.component';
import { DesktopViewDirective, DeviceViewComponent, MobileViewDirective } from '../device-view/device-view.component';
import { IconComponent } from '../icon/icon.component';
import { ListSelectComponent } from './list-select.component';
import { fruitOptions } from 'projects/nr-ngx-component-lib/story-util';
import { IndicatorSelectComponent } from '../indicator-select/indicator-select.component';

const meta: Meta<ListSelectComponent> = {
    title: 'List Select',
    component: ListSelectComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                FormsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatRadioModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatTooltipModule,
                ReactiveFormsModule,
                MatListModule,
                OwlDateTimeModule,
                OwlMomentDateTimeModule,
                MatProgressSpinner,
                NgxPaginationModule,
                MatTableModule,
                MatSortModule,
                MatCardModule,
            ],
            // declare components that are used in the template
            declarations: [
                CellContentComponent,
                DisplayModeWrapperComponent,
                FilterContainerComponent,
                FilterSelectComponent,
                FiltersPanelComponent,
                FilterSearchComponent,
                FilterDateComponent,
                GapComponent,
                PageHeaderComponent,
                RerenderDirective,
                RowListDesktopComponent,
                RowListMobileComponent,
                RowListPaginationComponent,
                RowListSortingComponent,
                ButtonComponent,
                DeviceViewComponent,
                DesktopViewDirective,
                MobileViewDirective,
                IconComponent,
                IndicatorSelectComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService,
                { provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS },
            ],
        } ),
        componentWrapperDecorator(
            ( story ) => {
                return `
                    <ng-container *rerender="width + displayMode + canDelete + canDownload">
                        <display-mode-wrapper
                            [displayMode]="displayMode"
                            [useWidth]="useWidth"
                            [width]="width"
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                    `
            }
        ),
    ],
    tags: [ 'autodocs' ],
    parameters: {
        docs: {
            description: {
                component: `
                `
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<ListSelectComponent & DisplayModeWrapperComponent> = {
    argTypes: {
        ...displayModeWrapperStory.argTypes,
    },
    args: {
        ...displayModeWrapperStory.args,
        descriptionLabel: 'Fruit',
        single: false
    },
    parameters: {
        docs: {
            description: {
                story: `
                `
            }
        }
    },
    render: ( args ) => {
        args.options = fruitOptions()
        args.value=['apple','grape']
        return {
            props: args,
            template: `
                <nrcl-list-select
                    [options]="options"
                    [descriptionLabel]="descriptionLabel"
                    [single]="single"
                    [value]="value"
                ></nrcl-list-select>
            `
        }
    }
}

