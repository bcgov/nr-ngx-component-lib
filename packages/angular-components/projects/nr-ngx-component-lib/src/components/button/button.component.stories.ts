import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { ButtonComponent } from './button.component';
import { DisplayModeWrapperComponent, displayModeWrapperStory, displayModeWrapperStoryArgs } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

const meta: Meta<ButtonComponent> = {
    title: 'Button',
    component: ButtonComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
                MatIconModule,
                MatRippleModule
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
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
A versatile, accessible button component built on Angular Material with support for icons, multiple sizes, and adaptive display modes.

## Features
- **Icon support**: Display Material icons on left, right, or standalone
- **Compact mode**: Smaller button size optimized for toolbars and dense layouts
- **Primary/secondary styling**: Visual hierarchy for button importance
- **Display mode awareness**: Automatically adapts to desktop/mobile configurations
- **Disabled state**: Built-in disabled styling with proper accessibility
- **Tooltips**: Optional tooltip support for additional context
- **Ripple effects**: Material ripple feedback on interaction

## Usage

\`\`\`html
<!-- Basic button -->
<nrcl-button label="Click Me"></nrcl-button>

<!-- Primary button with icon -->
<nrcl-button 
  label="Add Resources" 
  icon="add"
  [primary]="true"
></nrcl-button>

<!-- Compact button -->
<nrcl-button 
  label="Save" 
  [compact]="true"
  icon="save"
></nrcl-button>

<!-- Icon-only button with tooltip -->
<nrcl-button 
  icon="add"
  tooltip="Add new item"
  [compact]="true"
></nrcl-button>

<!-- Button with icons on both sides -->
<nrcl-button 
  label="Download Report"
  icon="description"
  iconRight="get_app"
  [primary]="true"
></nrcl-button>
\`\`\`

## Icon Properties
- **icon**: Displays icon on the left side, or standalone if no label is provided
- **iconRight**: Positions icon on the right side of the label
- **iconCompact**: Icon displayed specifically when button is in compact mode

## Button Variants

### Size Variants
- **Default**: Standard button size for most use cases
- **Compact**: Reduced size for toolbars, data tables, and space-constrained interfaces

### Style Variants
- **Default (Secondary)**: Subtle styling for secondary or less important actions
- **Primary**: Emphasized styling for primary actions like form submissions

### State Variants
- **Enabled**: Interactive, responds to clicks
- **Disabled**: Non-interactive, visually de-emphasized

## Display Mode Behavior
The button automatically responds to the application's display mode (desktop/mobile) configuration through the config service, allowing different compact behaviors per mode.

## Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Disabled state properly communicated to screen readers
- Tooltips provide additional context                                
                `
            },
            source: {
                excludeDecorators: true
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<ButtonComponent> = {
    parameters: {
        docs: {
            description: {
                story: `
# Button Variations Gallery

A comprehensive showcase displaying all button variations and state combinations. This gallery is organized into four columns, each demonstrating different aspects of the button component.

## Column 1: Basic Variants
Demonstrates the fundamental button styles and states:
- **Default**: Standard button styling for secondary actions
- **Disabled**: Default button in disabled state
- **Primary**: Emphasized styling for primary/important actions
- **Primary Disabled**: Primary button in disabled state

## Column 2: Icon Positions
Shows different icon placement options:
- **Icon (Left)**: Default icon position on the left side
- **Icon Right + Disabled**: Icon positioned on right, button disabled
- **Icon + Primary**: Icon with primary button styling
- **Dual Icons + Primary + Disabled**: Icons on both sides, all states combined

**Note:** When using icons on both sides, consider if it enhances or clutters the UI. Dual icons work best when they represent a clear relationship (e.g., input icon + action icon).

## Column 3: Compact Icon-Only Buttons
Icon-only buttons without labels, ideal for toolbars and action menus:
- **Compact**: Small, icon-only button
- **Compact Disabled**: Icon-only in disabled state
- **Compact Primary**: Icon-only with primary emphasis
- **Compact Primary Disabled**: All states combined

**Best for:** Toolbars, data table row actions, floating action buttons, or any space-constrained UI where the icon meaning is universally understood.

**Important:** Always provide tooltips for icon-only buttons to ensure accessibility and clarity.

## Column 4: Compact with Labels
Compact buttons that include both icon and text:
- **Compact + Label**: Smaller button with text and icon
- **Compact + Label + Disabled**: Compact with label, disabled state
- **Compact + Label + Primary**: Compact with label, primary styling
- **Compact + Label + Primary + Disabled**: All states combined

**Best for:** Dense interfaces where you need text labels but want to conserve space, such as filter panels or sidebar actions.

## Usage Guidelines

**When to use Default vs Primary:**
- Use **Primary** sparingly—typically only one primary button per view
- **Default** buttons are for secondary actions or when multiple actions have equal importance
- In forms, the submit action should typically be Primary

**When to use Compact:**
- Data tables and grids
- Toolbars and action bars
- Sidebars and panels
- Any UI where vertical or horizontal space is limited

**When to use Icon-only:**
- Actions with universally recognized icons (add, delete, edit, etc.)
- When space is extremely limited
- In repeating patterns where labels would be redundant (e.g., every row in a table)
- **Always** include a tooltip for accessibility
                `
            }
        }
    },    
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                .outer-grid {
                    display:grid; 
                    grid-template-columns: minmax( 0, 1fr ) minmax( 0, 1fr );
                }
                .inner-grid {
                    padding: 20px;
                    display:grid; 
                    gap: 20px; 
                    grid-template-columns: 250px 250px;
                }
                .ignore {
                    position: relative;
                    :before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        opacity: 0.05;
                        background-color: black;
                    }
                }
                article {
                    display: flex;
                    flex-direction: column;

                    h6 {
                        font-size: 14px;
                        font-family: sans-serif;
                        padding: 0;
                        margin: 0;
                        font-weight: normal;
                    }
                }
            `],
            template: `
                <div class="outer-grid">
                    <div class="inner-grid">
                        <article>
                            <h6>(default)</h6>
                            <nrcl-button
                                label="Add Resources"                        
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>disabled</h6>
                            <nrcl-button disabled
                                label="Add Resources"                        
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>primary</h6>
                            <nrcl-button primary
                                label="Add Resources"                        
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>primary disabled</h6>
                            <nrcl-button primary disabled
                                label="Add Resources"                        
                            ></nrcl-button> 
                        </article>
                    </div>

                    <div class="inner-grid">
                        <article>
                            <h6>icon</h6>
                            <nrcl-button
                                label="Add Resources"                        
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>iconRight disabled</h6>
                            <nrcl-button disabled
                                label="Add Resources"                        
                                iconRight="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>icon primary</h6>
                            <nrcl-button primary
                                label="Add Resources"                        
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>icon iconRight primary disabled</h6>
                            <nrcl-button primary disabled
                                label="Add Resources"                        
                                icon="add"
                                iconRight="get_app"
                            ></nrcl-button> 
                        </article>
                    </div>

                    <div class="inner-grid">
                        <article>
                            <h6>(no label) compact</h6>
                            <nrcl-button compact
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>(no label) compact disabled</h6>
                            <nrcl-button disabled compact
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>(no label) compact primary</h6>
                            <nrcl-button primary compact
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>(no label) compact primary disabled</h6>
                            <nrcl-button primary disabled compact
                                icon="add"
                            ></nrcl-button> 
                        </article>
                    </div>

                    <div class="inner-grid">
                        <article>
                            <h6>compact</h6>
                            <nrcl-button compact
                                label="Add"                        
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>compact disabled</h6>
                            <nrcl-button disabled compact
                                label="Add"                        
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>compact primary</h6>
                            <nrcl-button primary compact
                                label="Add"                        
                                icon="add"
                            ></nrcl-button> 
                        </article>

                        <article>
                            <h6>compact primary disabled</h6>
                            <nrcl-button primary disabled compact
                                label="Add"                        
                                icon="add"
                            ></nrcl-button> 
                        </article>
                    </div>
                </div>
            `
        }
    }
}

export const AllOptions: StoryObj<ButtonComponent & DisplayModeWrapperComponent> = {
    parameters: {
        docs: {
            description: {
                story: `
# Interactive Button Playground

Use the controls below to experiment with different button configurations and see how properties interact in real-time.

## Control Guide

### Content Controls

**label**: The text displayed on the button. 
- Leave empty for icon-only buttons
- Keep concise (2-3 words maximum)
- Use action verbs (Add, Save, Delete, Export, etc.)

**tooltip**: Hover text providing additional context.
- **Required** for icon-only buttons (accessibility)
- Optional but helpful for buttons with labels
- Should explain what will happen when clicked

### Icon Controls

**icon**: Material icon displayed on the left side (or standalone without label).
- Choose icons that clearly represent the action
- Common choices: \`add\`, \`edit\`, \`delete\`, \`save\`, \`search\`

**iconRight**: Icon positioned on the right side.
- Useful for directional actions (next, forward, download)
- Common choices: \`arrow_forward\`, \`get_app\`, \`open_in_new\`

**iconCompact**: Icon shown specifically in compact mode.
- Allows different icons for different sizes
- Useful when the full-size icon doesn't work well when compact

### Layout Controls

**compact**: Controls button size.
- \`no\`: Full-size button (default)
- \`yes\`: Always use compact size
- \`desktop\`: Compact only on desktop display mode
- \`mobile\`: Compact only on mobile display mode

Compact mode reduces padding and size, making buttons suitable for dense UIs.

### Appearance Controls

**primary**: Toggle between default and primary styling.
- \`false\` (default): Secondary button styling
- \`true\`: Primary/emphasized button styling

**Best practice**: Use only one primary button per view for the most important action.

### State Controls

**disabled**: Disables the button.
- Prevents all interactions
- Applies disabled styling (reduced opacity, no hover effects)
- Use during async operations to prevent double-clicks

**displayMode**: Simulates desktop vs mobile display mode.
- Toggle to see how compact settings adapt
- Tests responsive behavior

## Common Patterns

### Form Submit Button
\`\`\`html
<nrcl-button 
  label="Submit"
  [primary]="true"
  [disabled]="!form.valid"
></nrcl-button>
\`\`\`

### Toolbar Action Button
\`\`\`html
<nrcl-button 
  icon="add"
  tooltip="Add new item"
  [compact]="true"
></nrcl-button>
\`\`\`

### Secondary Action with Icon
\`\`\`html
<nrcl-button 
  label="Export"
  iconRight="get_app"
></nrcl-button>
\`\`\`

### Data Table Row Action
\`\`\`html
<nrcl-button 
  icon="edit"
  tooltip="Edit this record"
  compact="desktop"
></nrcl-button>
\`\`\`

## Design Best Practices

1. **Button Hierarchy**: Use primary sparingly—only for the most important action on a page
2. **Icon Clarity**: Choose universally recognized icons; when in doubt, include a label
3. **Tooltips**: Always provide tooltips for icon-only buttons
4. **Loading States**: Disable buttons during async operations
5. **Compact Usage**: Use compact mode in toolbars, tables, and space-constrained layouts
6. **Label Length**: Keep labels short and action-oriented
7. **Consistent Placement**: Place primary actions in consistent locations (e.g., bottom-right of forms)
8. **Testing**: Test in both display modes to ensur                
                `
            }
        }
    },    
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        label: { type: 'string' },
        icon: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app' ],
            mapping: { 'none': undefined }
        },
        iconRight: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app' ],
            mapping: { 'none': undefined }
        },
        iconCompact: {
            control: { type: 'inline-radio' },
            options: [ 'none', 'add', 'get_app' ],
            mapping: { 'none': undefined }
        },
        tooltip: { type: 'string' },
        compact: {
            control: { type: 'inline-radio' },
            options: [ 'no', 'yes', 'desktop', 'mobile' ],
            mapping: {
                'no': undefined,
                'yes': '',
            }
        },
        primary: { type: 'boolean' },
        disabled: { type: 'boolean' },
        click: { action: 'click' }
    },
    args: {
        ...displayModeWrapperStory.args,
        label: 'Add Resources',
        tooltip: null,
        primary: false,
        disabled: false,
    },
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            template: `
                <nrcl-button ${ argsToTemplate(args,{exclude:displayModeWrapperStoryArgs}) }></nrcl-button> 
            `
        }
    }
}
