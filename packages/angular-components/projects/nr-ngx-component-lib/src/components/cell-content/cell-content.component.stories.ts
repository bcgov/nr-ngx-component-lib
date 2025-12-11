import { MatTooltipModule } from '@angular/material/tooltip';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CellContentComponent } from './cell-content.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';

const meta: Meta<CellContentComponent & { width: number }> = {
    title: 'Cell Content',
    component: CellContentComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        componentWrapperDecorator( 
            ( story ) => {
                return `
                    <ng-container *rerender="width + tooltip">
                        <div class="component-container-inline">
                            ${ story }
                        </div>
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
A component for displaying cell content with automatic text truncation and optional tooltip support. 
Ideal for use in tables or grids where content needs to fit within constrained widths.

## Features

- **Text Truncation**: Automatically truncates content that exceeds the container width with ellipsis
- **Tooltip Support**: Shows full content in a tooltip when text is truncated
- **Flexible Content Input**: Accepts content via property binding or content projection
- **Responsive**: Adjusts to container width constraints

## Usage

### With Content Property
\`\`\`typescript
<nrcl-cell-content 
    [content]="'Long text that will be truncated'"
    tooltip
</nrcl-cell-content>
\`\`\`

### With Content Projection
\`\`\`typescript
<nrcl-cell-content 
    tooltip="Custom tooltip text"
    [style.width.px]="150"
>
    This is the cell content
</nrcl-cell-content>
\`\`\`

## Tooltip Options

The \`tooltip\` input accepts multiple value types:
- \`true\` (or present) - Shows the cell content as tooltip 
- \`false\` (or missing) - Disables tooltip
- \`string\` - Shows custom tooltip text

## Interactive Demo

Adjust the width slider to see how the component handles text truncation at different sizes. 
Toggle tooltip options to test different tooltip behaviors.
                `
            },
            source: {
                excludeDecorators: true
            }
        }
    },
    argTypes: {
        width: {
            control: {
                type: 'range',
                min: 50,
                max: 500
            }
        },
        tooltip: {
            control: { type: 'inline-radio' },
            options: [ '(missing)', 'False', "(no value)", 'True', 'This is a tooltip' ],
            mapping: {
                '(missing)': undefined,
                'False': false,
                '(no value)': '',
                'True': true,
            }
        }
    },
    args: {
        width: 158,
        tooltip: null
    },
}

export default meta;

export const ContentProperty: StoryObj<CellContentComponent & { width: number }> = {
    parameters: {
        docs: {
            description: {
                story: `
Demonstrates using the \`[content]\` property binding to pass cell content. 
This approach is useful when binding to component data or when the content is dynamic.
                `
            }
        }
    },    
    argTypes: {
        content: { type: 'string' },
    },
    args: {
        content: 'Property Content'
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-cell-content ${ argsToTemplate(args,{exclude:['width']}) } 
                    [style.width.px]="width"                    
                ></nrcl-cell-content> 
            `
        }
    }
}

export const ContentInserted: StoryObj<CellContentComponent & { width: number, inserted: string }> = {
    parameters: {
        docs: {
            description: {
                story: `
Demonstrates using content projection (ng-content) to insert content into the component. 
This approach is useful for static content or when you need to include HTML elements within the cell.
                `
            }
        }
    },    
    argTypes: {
        inserted: { type: 'string' },
    },
    args: {
        inserted: 'Inserted Content'
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-cell-content ${ argsToTemplate(args,{exclude:['width','inserted']}) } 
                    [style.width.px]="width"
                >
                    {{ inserted }}
                </nrcl-cell-content> 
            `
        }
    }
}
