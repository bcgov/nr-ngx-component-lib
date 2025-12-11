import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { ButtonComponent } from '../button/button.component';
import { ExpansionPanelComponent, ExpansionPanelFooterComponent, ExpansionPanelHeaderComponent } from './expansion-panel.component';

const meta: Meta<ExpansionPanelComponent> = {
    title: 'Expansion Panel',
    component: ExpansionPanelComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
                MatIconModule,
                MatRippleModule,
                MatExpansionModule,
                MatProgressSpinnerModule
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent,
                ButtonComponent,
                ExpansionPanelHeaderComponent,
                ExpansionPanelFooterComponent
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
A collapsible panel component built on Angular Material Expansion Panel, providing a structured way to organize and hide/show content sections with optional header actions and footer controls.

## Features
- **Expandable/collapsible content**: Click to toggle content visibility
- **Custom header**: Support for titles, subtitles, and action buttons
- **Optional footer**: Built-in cancel/save actions or custom footer content
- **Loading state**: Display progress spinner while content loads
- **Disabled state**: Prevent expansion when panel is disabled
- **Warning display**: Show warning messages in footer
- **Display mode awareness**: Adapts layout to desktop/mobile configurations
- **Controlled or uncontrolled**: Can be controlled via \`expanded\` prop or self-managed

## Component Structure

The expansion panel consists of three parts:

1. **\`<nrcl-expansion-panel>\`**: Main container component
2. **\`<nrcl-expansion-panel-header>\`**: Header section with title and actions
3. **\`<nrcl-expansion-panel-footer>\`**: Footer section with action buttons

## Basic Usage

\`\`\`html
<nrcl-expansion-panel>
  <nrcl-expansion-panel-header>
    <h2 panel>Section Title</h2>
    <nrcl-button primary>Add Item</nrcl-button>
  </nrcl-expansion-panel-header>
  
  <div>
    <!-- Your expandable content here -->
    <p>Content that can be shown or hidden</p>
  </div>
  
  <nrcl-expansion-panel-footer
    (cancelClick)="onCancel()"
    (saveClick)="onSave()"
  >
  </nrcl-expansion-panel-footer>
</nrcl-expansion-panel>
\`\`\`

## Advanced Usage

### With Subtitle
\`\`\`html
<nrcl-expansion-panel-header>
  <h2 panel>Main Title</h2>
  <h3 panel>Subtitle or description</h3>
  <nrcl-button>Action</nrcl-button>
</nrcl-expansion-panel-header>
\`\`\`

### With Custom Footer
\`\`\`html
<nrcl-expansion-panel-footer>
  <nrcl-button label="Delete"></nrcl-button>
  <nrcl-button primary label="Update"></nrcl-button>
</nrcl-expansion-panel-footer>
\`\`\`

### With Loading State
\`\`\`html
<nrcl-expansion-panel [isLoading]="true">
  <!-- Content shows spinner when loading -->
</nrcl-expansion-panel>
\`\`\`

### Controlled Expansion
\`\`\`html
<nrcl-expansion-panel 
  [expanded]="isExpanded"
  (expandedChange)="isExpanded = $event"
>
  <!-- Content -->
</nrcl-expansion-panel>
\`\`\`

### With Warning
\`\`\`html
<nrcl-expansion-panel-footer
  [showWarning]="true"
  warningMessage="Changes will be lost if you cancel"
  (cancelClick)="onCancel()"
  (saveClick)="onSave()"
>
</nrcl-expansion-panel-footer>
\`\`\`

## Header Content Projection

Elements with the \`panel\` attribute are projected into the panel header area:
- \`<h2 panel>\`: Main title
- \`<h3 panel>\`: Subtitle (optional)
- Buttons without \`panel\` attribute go into the action area

## Footer Behavior

The footer component supports two modes:

1. **Default mode**: Provides Cancel and Save buttons
2. **Custom mode**: Project your own buttons as children

## Use Cases

- **Form sections**: Organize long forms into collapsible sections
- **Settings panels**: Group related settings that can be expanded
- **Data sections**: Show/hide detailed information
- **Wizard steps**: Create expandable steps in a multi-step process
- **Accordion patterns**: Multiple panels where one expands at a time
                `
            },
            source: {
                excludeDecorators: true
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<ExpansionPanelComponent & DisplayModeWrapperComponent & { subtitle: boolean, customFooter: boolean } & ExpansionPanelFooterComponent> = {
    parameters: {
        docs: {
            description: {
                story: `
# Interactive Expansion Panel

Use the controls below to experiment with different expansion panel configurations.

## Control Guide

### Panel Controls

**expanded**: Controls whether the panel is expanded or collapsed.
- \`true\`: Panel is expanded, content visible
- \`false\`: Panel is collapsed, content hidden
- Toggle to see expand/collapse animation

**disabled**: Disables the panel, preventing expansion.
- When \`true\`, clicking the header has no effect
- Useful when panel content is not yet available or action is not allowed

**isLoading**: Shows a loading spinner in the panel content area.
- Displays Material spinner while content is loading
- Typically used during async data fetch
- Content is still visible but spinner overlays it

**subtitle**: Toggle to show/hide subtitle in header.
- Demonstrates optional subtitle below main title
- Useful for providing context or additional information

### Footer Controls (Default Mode)

**cancelEnabled**: Controls the cancel button state.
- \`null\` (undefined): Button is not showen
- \`true\`: Button is enabled
- \`false\`: Button is disabled

**saveEnabled**: Controls the save button state.
- \`null\` (undefined): Button is not showen
- \`true\`: Button is enabled
- \`false\`: Button is disabled
- Typically disabled until form is valid or changes are made

**showWarning**: Display a warning message in the footer.
- Shows warning icon and message
- Useful for alerting users about consequences of actions
- Custom message via \`warningMessage\` property

**customFooter**: Toggle between default and custom footer.
- \`false\`: Shows default Cancel/Save buttons
- \`true\`: Shows custom footer content (user-defined buttons)

### Display Mode

**displayMode**: Toggle between desktop and mobile layouts.
- Tests responsive behavior
- Panel may adjust header layout based on display mode

## Best Practices

1. **Use clear titles**: Make it obvious what content the panel contains
2. **Provide subtitles when helpful**: Add context without expanding
3. **Handle loading states**: Show spinner during async operations
4. **Disable appropriately**: Disable when content isn't ready or action isn't allowed
5. **Control save button**: Disable save until changes are valid
6. **Show warnings**: Alert users about data loss or important consequences
7. **Keep content focused**: Each panel should contain related content
9. **Test both modes**: Verify layout in desktop and mobile display modes
10. **Handle events**: Listen to \`expandedChange\` to load data on-demand
                `
            }
        }
    },
    argTypes: {
        ...displayModeWrapperStory.argTypes,
        // cancelClick: { action: 'cancelClick' },
        cancelEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'false', 'true' ],
            mapping: {
                'null': undefined,
                'true': true,
                'false': false,
            }
        },
        // saveClick: { action: 'saveClick' },
        saveEnabled: {
            control: { type: 'inline-radio' },
            options: [ 'null', 'false', 'true' ],
            mapping: {
                'null': undefined,
                'true': true,
                'false': false,
            }
        },
        expandedChange: { action: 'expandedChange' },
    },
    args: {
        ...displayModeWrapperStory.args,
        isLoading: false,
        disabled: false,
        expanded: false,
        subtitle: false,
        showWarning: false,
        customFooter: false
    },
    render: ( args ) => {
        const argsExpansionPanelComponent: (keyof ExpansionPanelComponent)[] = ['disabled','isLoading','expanded','expandedChange']
        const argsExpansionPanelFooterComponent: (keyof ExpansionPanelFooterComponent)[] = ['cancelClick','cancelEnabled','saveClick','saveEnabled','showWarning','warningMessage']

        return {
            props: {
                ...args,
                addClick: ( ev ) => { ev.stopPropagation(); console.log('addClick') } 
            },
            styles: [`
                ::ng-deep .component-container-block {
                    padding: 20px;
                }
            `],
            template: `
                <nrcl-expansion-panel ${ argsToTemplate( args, { include: argsExpansionPanelComponent } ) }>
                    <nrcl-expansion-panel-header>
                        <h2 panel>Assignments</h2>
                        @if ( subtitle ) { <h3 panel>Subtitle for Assignments</h3> }
                        
                        <nrcl-button primary
                            (click)="addClick( $event )"
                        >Add Assignment</nrcl-button>
                    </nrcl-expansion-panel-header>                   

                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

                    <nrcl-expansion-panel-footer ${ argsToTemplate( args, { include: argsExpansionPanelFooterComponent } ) }>
                        @if ( customFooter ) {
                            <nrcl-button
                                label="Forget it"
                            ></nrcl-button>

                            <nrcl-button primary
                                label="Do it!"
                            ></nrcl-button>
                        }
                    </nrcl-expansion-panel-footer>
                </nrcl-expansion-panel>
            `
        }
    }
}
