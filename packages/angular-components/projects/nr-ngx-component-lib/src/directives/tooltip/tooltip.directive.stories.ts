import { MatTooltipModule } from '@angular/material/tooltip';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { TooltipDirective } from './tooltip.directive';

const meta: Meta<TooltipDirective & { width: number }> = {
    title: 'Tooltip',
    component: TooltipDirective,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
            ],
            // declare components that are used in the template
            declarations: [
                ButtonComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
    ],
    argTypes: {
    },
    args: {
    },
}

export default meta;

export const Primary: StoryObj<TooltipDirective & { width: number }> = {
    argTypes: {
    },
    args: {
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <div style="display: flex; gap: 20px; align-items: flex-start;">
                    <span style="border: 1px solid black"
                        [nrclTooltip]="tooltip" 
                        [nrclTooltipContext]="{ $implicit: { name: 'span' } }"
                        nrclTooltipClass="foo" 
                    >
                        Hover to see tooltip                    
                    </span> 

                    <nrcl-button primary label="Tooltip"
                        [nrclTooltip]="tooltip"
                        [nrclTooltipContext]="{ $implicit: { name: 'button' } }"
                    ></nrcl-button>

                    <nrcl-button secondary label="Tooltip string"
                        nrclTooltip="this is a tooltip"
                    ></nrcl-button>

                    <nrcl-button tertiary label="Tooltip multiline"
                        nrclTooltip="this is a tooltip\nwith a second line"
                    ></nrcl-button>
                </div>

                <ng-template #tooltip let-ctx>
                    <h1>The Tooltip</h1>
                    <p>The content</p>
                    <p>source: {{ ctx.name }}</p>
                    <h6>The footer</h6>
                    <nrcl-button anchor
                        label="click me"
                    ></nrcl-button>
                </ng-template>
            `
        }
    }
}
