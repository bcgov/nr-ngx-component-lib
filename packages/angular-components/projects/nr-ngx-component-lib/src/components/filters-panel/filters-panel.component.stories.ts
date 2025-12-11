import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlMomentDateTimeModule } from '@busacca/ng-pick-datetime';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fruitOptions } from 'projects/nr-ngx-component-lib/story-util';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DATE_FORMATS } from '../../utils/date.util';
import { DesktopViewComponent, MobileViewComponent } from '../device-view/device-view.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';
import { FilterSearchComponent } from '../filter-search/filter-search.component';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { FiltersPanelComponent } from './filters-panel.component';
import { useArgs } from 'storybook/internal/preview-api';

const meta: Meta<FiltersPanelComponent> = {
    title: 'Filters Panel',
    component: FiltersPanelComponent,
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
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent,
                FilterDateComponent,
                FilterSearchComponent,
                FilterSelectComponent,
                MobileViewComponent,
                DesktopViewComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                { provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS },
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="width + displayMode">
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
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
A container component that provides a consistent layout and behavior for filter controls in your application.

## Features
- **Flexible content projection**: Accepts any filter components as children
- **Clear filters functionality**: Optional "Clear All" button to reset all filters at once
- **Consistent layout**: Automatically arranges filter controls in a vertical stack
- **Action handling**: Emits events when filters are cleared

## Usage

\`\`\`html
<nrcl-filters-panel 
  [showClear]="true"
  (clearFilters)="onClearFilters()"
>
  <nrcl-filter-search></nrcl-filter-search>
  <nrcl-filter-select label="Category" [options]="categories"></nrcl-filter-select>
  <nrcl-filter-date label="Start Date"></nrcl-filter-date>
</nrcl-filters-panel>
\`\`\`

## Best Practices

1. **Group related filters**: Place filters that work together within the same panel
2. **Use clear labels**: Ensure each filter has a descriptive label
3. **Enable clear button**: Set \`[showClear]="true"\` when multiple filters are present
4. **Handle clear events**: Implement \`(clearFilters)\` to reset your data model

## Layout

The panel automatically:
- Stacks filter components vertically
- Provides consistent spacing between filters
- Positions the "Clear All" button at the bottom (when enabled)                
                `
            }
        }
    }      
}

export default meta;

export const Empty: StoryObj<FiltersPanelComponent & DisplayModeWrapperComponent> = {
    ...displayModeWrapperStory,
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filters-panel></nrcl-filters-panel> 
            `
        }
    }
}

export const Populated: StoryObj<FiltersPanelComponent & DisplayModeWrapperComponent> = {
    ...displayModeWrapperStory,
    args: {
        ...displayModeWrapperStory.args,
        showClear: true,
        showFilters: true,
    },
    render: ( args ) => {
        let templateArgs = argsToTemplate(args, { include: [ 'showClear', 'showFilters' ] } )

        return {
            props: {
                ...args,
                options: fruitOptions()
            },
            template: `
                <nrcl-filters-panel ${ templateArgs }>
                    <nrcl-filter-search></nrcl-filter-search>

                    <nrcl-filter-select
                        label="Fruit"
                        [options]="options"
                    ></nrcl-filter-select>

                    <nrcl-filter-date
                        label="Start"
                    ></nrcl-filter-date>
                </nrcl-filters-panel> 
            `
        }
    }
}

export const PopulatedMore: StoryObj<FiltersPanelComponent & DisplayModeWrapperComponent> = {
    ...displayModeWrapperStory,
    args: {
        ...displayModeWrapperStory.args,
        showClear: true,
        showFilters: true,
    },
    render: ( args ) => {
        let templateArgs = argsToTemplate(args, { include: [ 'showClear', 'showFilters' ] } )

        return {
            props: {
                ...args,
                options: fruitOptions()
            },
            template: `
                <nrcl-filters-panel ${ templateArgs }>
                    <nrcl-filter-search></nrcl-filter-search>

                    <nrcl-filter-select
                        label="Fruit"
                        [options]="options"
                    ></nrcl-filter-select>

                    <nrcl-filter-date
                        label="Start"
                    ></nrcl-filter-date>

                    <nrcl-filter-select
                        label="Fruit"
                        [options]="options"
                    ></nrcl-filter-select>

                    <nrcl-filter-select
                        label="Fruit"
                        [options]="options"
                    ></nrcl-filter-select>

                    <nrcl-filter-date
                        label="Start"
                    ></nrcl-filter-date>
                </nrcl-filters-panel> 
            `
        }
    }
}

type Filter = {
    search: string
    fruit1: string[]
    fruit2: string[]
    fruit3: string[]
    date: string
}

function emptyFilter() {
    return {
        search: null,
        fruit1: [],
        fruit2: [],
        fruit3: [],
        date: '2025-12-10'
    }
}

export const ClearFilters: StoryObj<DisplayModeWrapperComponent & { filter: Filter }>  = {
    ...displayModeWrapperStory,
    args: {
        ...displayModeWrapperStory.args,
        filter: emptyFilter()
    },
    render: ( args ) => {
        const [, setArgs] = useArgs();

        return {
            props: {
                ...args,
                options: fruitOptions(),
                onClearFilters: ( ev ) => {
                    setArgs( { filter: emptyFilter() } )
                },
                onValueChange: ( field, ev ) => {
                    setArgs( { filter: { ...args.filter, [field]: ev } } )
                },
            },
            template: `
                <nrcl-filters-panel (clearFilters)="onClearFilters( $event )">
                    <nrcl-filter-search
                        [value]="filter.search"
                        (valueChange)="onValueChange( 'search', $event )"
                    ></nrcl-filter-search>

                    <nrcl-filter-select
                        label="Fruit1"
                        [options]="options"
                        [value]="filter.fruit1"
                        (valueChange)="onValueChange( 'fruit1', $event )"
                    ></nrcl-filter-select>
                
                    <nrcl-filter-date
                        label="Start"
                        [value]="filter.date"
                        (valueChange)="onValueChange( 'date', $event )"
                    ></nrcl-filter-date>

                    <nrcl-filter-select
                        label="Fruit2"
                        [options]="options"
                        [value]="filter.fruit2"
                        (valueChange)="onValueChange( 'fruit2', $event )"
                    ></nrcl-filter-select>

                    <nrcl-filter-select
                        label="Fruit3"
                        [options]="options"
                        [value]="filter.fruit3"
                        (valueChange)="onValueChange( 'fruit3', $event )"
                    ></nrcl-filter-select>
                </nrcl-filters-panel> 
            `
        }
    }
}
