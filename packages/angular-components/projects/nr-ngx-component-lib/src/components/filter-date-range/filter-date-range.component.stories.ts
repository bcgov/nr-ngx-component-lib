import { argsToTemplate, componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';
import { FilterDateRangeComponent } from './filter-date-range.component';

const meta: Meta<FilterDateRangeComponent> = {
    title: 'Inputs and Controls/Filters/Filter Date Range',
    component: FilterDateRangeComponent,
    decorators: [
        componentWrapperDecorator(
            ( story ) => {
                return `
                    <ng-container *rerender="displayMode">
                        <display-mode-wrapper
                            style="--registration-content-overflow: visible"
                        >
                            ${ story }
                        </display-mode-wrapper>
                    </ng-container>
                `
            }
        ),
    ],
}

export default meta;

export const Primary: StoryObj<FilterDateRangeComponent> = {
    argTypes: {
        valueChange: { action: 'valueChange' },
        wide: {
            control: { type: 'inline-radio' },
            options: [ 'none', '1', '2', '3', '4', '5', '6' ],
            mapping: { 'none': undefined }
        }
    },
    args: {
        label: 'Reported Between',
        value: [],
        displayFormat: 'MMM D, YYYY',
        hint: '',
        wide: null,
        clear: true,
        min: '',
        max: '',
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-date-range ${ argsToTemplate( args ) }
                ></nrcl-filter-date-range>
            `
        }
    }
}

export const WithValue: StoryObj<FilterDateRangeComponent> = {
    ...Primary,
    args: {
        ...Primary.args,
        value: [ '2026-11-01', '2026-11-25' ],
        min: '2026-01-01',
        max: '2026-12-31',
    },
}

export const CustomWidth: StoryObj<FilterDateRangeComponent & { width: number }> = {
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 150,
                max: 600
            }
        },
        valueChange: { action: 'valueChange' },
    },
    args: {
        width: 280,
        label: 'Reported Between',
        value: [],
        hint: '',
        clear: true
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-filter-date-range ${ argsToTemplate( args, { exclude: [ 'width' ] } ) }
                    [style.--nrcl-filter-date-range-width.px]="width"
                ></nrcl-filter-date-range>
            `
        }
    }
}
