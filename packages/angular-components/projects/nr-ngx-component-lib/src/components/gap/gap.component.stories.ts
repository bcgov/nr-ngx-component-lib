import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { GapComponent } from './gap.component';

const meta: Meta<GapComponent> = {
    title: 'Gap',
    component: GapComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent,
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="displayMode">
                        <display-mode-wrapper 
                            [displayMode]="displayMode"
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
A utility component that provides consistent spacing between elements.
Automatically adjusts spacing based on display mode (desktop vs mobile) to maintain appropriate visual hierarchy across different screen sizes.

## Purpose

This component simplifies layout spacing by providing standardized gaps that adapt to the current display mode.
It eliminates the need for custom margin/padding classes while ensuring consistent spacing throughout your application.

## Features

- **Responsive Spacing**: Automatically adjusts gap size based on display mode
- **Vertical and Horizontal**: Supports both vertical and horizontal spacing
- **Zero Footprint**: Pure spacing element with no visual artifacts
- **Display Mode Integration**: Works with \`ConfigurationService\` for consistent responsive behavior

## Usage

\`\`\`typescript
import { GapComponent } from '@wf-design-system/gap';

@Component({
  template: \`
    <!-- Vertical spacing between sections -->
    <section>First Section</section>
    <nrcl-gap vertical></nrcl-gap>
    <section>Second Section</section>
    
    <!-- Horizontal spacing between inline elements -->
    <div style="display: flex;">
      <button>Button 1</button>
      <nrcl-gap horizontal></nrcl-gap>
      <button>Button 2</button>
    </div>
  \`
})
export class MyComponent {}
\`\`\`

## Attributes

- **vertical**: Adds vertical spacing (height)
- **horizontal** (default): Adds horizontal spacing (width)

## Common Use Cases

- Spacing between form sections
- Gaps between toolbar items
- Vertical spacing in card layouts
- Separation between content blocks
- Consistent spacing in flex/grid layouts

## Interactive Demo

Toggle the display mode to see how the gap spacing adjusts between desktop and mobile views.
                `
            }
        }
    }  
}

export default meta;

export const Vertical: StoryObj<GapComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'desktop',
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <div>Before gap</div>
                <nrcl-gap vertical/>
                <div>After gap</div>
            `
        }
    }
}
