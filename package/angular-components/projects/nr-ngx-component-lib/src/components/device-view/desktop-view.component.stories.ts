import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { DesktopViewComponent } from './device-view.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';

const meta: Meta<DesktopViewComponent> = {
    title: 'Desktop View',
    component: DesktopViewComponent,
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
A structural component that conditionally displays its content based on the application's display mode. 
Content wrapped in this component only appears when the app is in desktop mode.

## Purpose

This component works with the \`ConfigurationService\` to provide responsive behavior, allowing you to show or hide content based on whether the user is viewing the application on a desktop or mobile device.

## Features

- **Display Mode Aware**: Automatically shows/hides content based on current display mode
- **Service Integration**: Works with \`ConfigurationService\` to determine display mode
- **Content Projection**: Wraps any content using Angular's content projection

## Usage

\`\`\`typescript
import { DesktopViewComponent } from '@wf-design-system/desktop-view';
import { ConfigurationService } from '@wf-design-system/services';

@Component({
  template: \`
    <nrcl-desktop-view>
      <!-- This content only appears in desktop mode -->
      <div class="desktop-navigation">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/reports">Reports</a>
      </div>
    </nrcl-desktop-view>
    
    <!-- Content outside always appears -->
    <div class="main-content">
      Page content here
    </div>
  \`
})
export class MyComponent {
  constructor(private configService: ConfigurationService) {}
}
\`\`\`

## Common Use Cases

- Desktop-only navigation menus
- Extended toolbars or action bars for desktop users
- Desktop-specific layout elements
- Features that require larger screen real estate

## Companion Component

Use with \`MobileViewComponent\` (if available) to create complementary mobile/desktop experiences:

\`\`\`typescript
<nrcl-desktop-view>
  <div>Desktop layout</div>
</nrcl-desktop-view>

<nrcl-mobile-view>
  <div>Mobile layout</div>
</nrcl-mobile-view>
\`\`\`

## Interactive Demo

Toggle the display mode control below to see how content visibility changes between desktop and mobile modes.
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<DesktopViewComponent & { displayMode: DisplayMode }> = {
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
                <div>Before desktop-view</div>
                <nrcl-desktop-view>
                    <div>Inside desktop-view</div>
                </nrcl-desktop-view>
                <div>After desktop-view</div>
            `
        }
    }
}
