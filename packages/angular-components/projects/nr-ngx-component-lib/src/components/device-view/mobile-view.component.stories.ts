import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ConfigurationService, DisplayMode } from '../../services/configuration.service';
import { MobileViewComponent } from './device-view.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';

const meta: Meta<MobileViewComponent> = {
    title: 'Mobile View',
    component: MobileViewComponent,
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
Content wrapped in this component only appears when the app is in mobile mode.

## Purpose

This component works with the \`ConfigurationService\` to provide responsive behavior, allowing you to show or hide content based on whether the user is viewing the application on a mobile or desktop device.

## Features

- **Display Mode Aware**: Automatically shows/hides content based on current display mode
- **Service Integration**: Works with \`ConfigurationService\` to determine display mode
- **Content Projection**: Wraps any content using Angular's content projection

## Usage

\`\`\`typescript
import { MobileViewComponent } from '@wf-design-system/mobile-view';
import { ConfigurationService } from '@wf-design-system/services';

@Component({
  template: \`
    <nrcl-mobile-view>
      <!-- This content only appears in mobile mode -->
      <div class="mobile-navigation">
        <button mat-icon-button>
          <mat-icon>menu</mat-icon>
        </button>
      </div>
    </nrcl-mobile-view>
    
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

- Mobile-optimized navigation (hamburger menus, bottom nav bars)
- Touch-friendly UI controls
- Simplified layouts for smaller screens
- Mobile-specific features (swipe gestures, pull-to-refresh)

## Companion Component

Use with \`DesktopViewComponent\` to create complementary mobile/desktop experiences:

\`\`\`typescript
<nrcl-desktop-view>
  <div class="sidebar">Desktop sidebar</div>
</nrcl-desktop-view>

<nrcl-mobile-view>
  <button class="mobile-menu-toggle">Menu</button>
</nrcl-mobile-view>

<div class="content">
  Shared content for both modes
</div>
\`\`\`

## Interactive Demo

Toggle the display mode control below to see how content visibility changes between mobile and desktop modes.
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<MobileViewComponent & { displayMode: DisplayMode }> = {
    argTypes: {
        displayMode: {
            control: 'inline-radio',
            options: ['desktop', 'mobile'],
            description: 'Display mode for the component'
        },
    },
    args: {
        displayMode: 'mobile',
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <div>Before mobile-view</div>
                <nrcl-mobile-view>
                    <div>Inside mobile-view</div>
                </nrcl-mobile-view>
                <div>After mobile-view</div>
            `
        }
    }
}
