import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent, displayModeWrapperStory } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { ConfigurationService } from '../../services/configuration.service';
import { ButtonComponent } from '../button/button.component';
import { PageHeaderComponent } from './page-header.component';
import { PageContainerComponent } from '../page-container/page-container.component';

const meta: Meta<PageHeaderComponent> = {
    title: 'Page Header',
    component: PageHeaderComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatIconModule,
                MatProgressSpinnerModule,
                MatTooltipModule,
                MatRippleModule
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent,
                ButtonComponent,
                PageContainerComponent
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
A header component for page layouts that displays titles, optional subtitles, action buttons, and loading states.
Provides a consistent header structure across application pages with responsive behavior.

## Purpose

The page header establishes the top section of a page, clearly communicating the page's purpose through titles and providing quick access to primary actions.
It integrates with the page container and adapts its layout based on display mode (desktop vs mobile).

## Features

- **Primary and Secondary Titles**: Support for main heading (h1) and optional subheading (h2)
- **Loading State**: Shows a spinner overlay when content is being loaded
- **Action Button Slot**: Content projection for primary action buttons
- **Responsive Layout**: Adjusts spacing and layout based on display mode
- **Flexible Content**: Use content projection to include custom elements

## Usage

### Basic Header with Title
\`\`\`typescript
import { PageHeaderComponent } from '@wf-design-system/page-header';

@Component({
  template: \`
    <nrcl-page-header>
      <h1>Dashboard</h1>
    </nrcl-page-header>
  \`
})
export class MyComponent {}
\`\`\`

### Header with Title and Subtitle
\`\`\`typescript
<nrcl-page-header>
  <h1>User Management</h1>
  <h2>Manage users and permissions</h2>
</nrcl-page-header>
\`\`\`

### Header with Action Button
\`\`\`typescript
<nrcl-page-header>
  <h1>Products</h1>
  <nrcl-button primary (click)="createProduct()">
    Create Product
  </nrcl-button>
</nrcl-page-header>
\`\`\`

### Header with Loading State
\`\`\`typescript
<nrcl-page-header [isLoading]="isLoadingData">
  <h1>Reports</h1>
  <h2>Monthly performance metrics</h2>
  <nrcl-button (click)="generateReport()">
    Generate Report
  </nrcl-button>
</nrcl-page-header>
\`\`\`

## Inputs

- **isLoading** (boolean): When true, displays a loading spinner overlay

## Content Projection

The component accepts any content through ng-content:
- **h1**: Primary page title (required for proper semantics)
- **h2**: Optional secondary title/subtitle
- **buttons**: Action buttons or other interactive elements

## Common Use Cases

- List page headers with "Create" actions
- Detail page headers showing entity names
- Dashboard headers with refresh buttons
- Form page headers with save/cancel actions

## Interactive Demo

Toggle the display mode to see responsive behavior.
Enable loading state to see the spinner overlay.
Modify header text to test dynamic content.
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<PageHeaderComponent & DisplayModeWrapperComponent & { isLoading: boolean, header1: string, header2: string }> = {
    argTypes: displayModeWrapperStory.argTypes,
    parameters: {
        docs: {
            description: {
                story: `
Demonstrates a page container with a page header component.
The page header includes a title, optional subtitle, and action button.
Toggle the loading state to see the loading indicator behavior.
Adjust header text to see how dynamic content is displayed.                
                `
            }
        }
    },    
    args: {
        ...displayModeWrapperStory.args,
        header1: 'Prep Sheets',
        header2: 'Header 2',
        isLoading: false
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-page-container>
                    <nrcl-page-header [isLoading]="isLoading">
                        <h1>{{ header1 }}</h1>
                        @if ( header2 ) { <h2>{{ header2 }}</h2> }

                        <nrcl-button primary>
                            Create Prep Sheet
                        </nrcl-button>
                    </nrcl-page-header>
                </nrcl-page-container>
            `
        }
    }
}
