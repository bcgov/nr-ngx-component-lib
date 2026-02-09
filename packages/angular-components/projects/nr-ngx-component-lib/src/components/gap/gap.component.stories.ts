import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
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
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
                ConfigurationService
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="{displayMode, vertical, horizontal, divider}">
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
    },
    argTypes: {
        vertical: {
            control: { type: 'inline-radio' },
            options: [ 'missing', '""', '1', '2', '3' ],
            mapping: { 'missing': undefined, '""': '' }
        },
        horizontal: {
            control: { type: 'inline-radio' },
            options: [ 'missing', '""', '1', '2', '3' ],
            mapping: { 'missing': undefined, '""': '' }
        },
        divider: {
            control: { type: 'inline-radio' },
            options: [ 'missing', 'before', 'middle', 'after', 'none' ],
            mapping: { 'missing': undefined }
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
        vertical: '',        
    },
    render: ( args ) => {
        let tmpl = argsToTemplate(args,{exclude:['displayMode']})
        return {
            props: args,
            template: `
                <div>Before gap</div>
                <nrcl-gap ${ tmpl }/>
                <div>After gap</div>
            `
        }
    }
}

export const Horizontal: StoryObj<GapComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'desktop',
        horizontal: ''
    },
    render: ( args ) => {
        let tmpl = argsToTemplate(args,{exclude:['displayMode']})
        return {
            props: args,
            styles: [`
                div.container {
                    display: flex;
                    align-items: stretch;
                }
                span {
                    display: inline-flex;
                    height: 50px;
                    border: 1px solid gray;
                    align-items: center;
                }
            `],
            template: `
                <div class="container">
                    <span>Before gap</span>
                    <nrcl-gap ${ tmpl }/>
                    <span>After gap</span>
                </div>
            `
        }
    }
}
