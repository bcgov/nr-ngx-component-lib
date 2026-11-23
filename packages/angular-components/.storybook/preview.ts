import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import type { Preview } from "@storybook/angular";
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { DisplayModeWrapperComponent } from "projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component";
import { RegistrationWrapperComponent } from "projects/nr-ngx-component-lib/story-util/registration-wrapper.component";
import { RerenderDirective } from "projects/nr-ngx-component-lib/story-util/rerender.directive";

const preview: Preview = {
    parameters: {
        options: {
            // Sidebar categories in this order. Anything not listed keeps file order, so the stories
            // inside each component stay in the order they're defined.
            // (storySort must be a self-contained literal, storybook evaluates it statically.)
            storySort: {
                order: [
                    'Introduction', [ 'Getting Started', 'Components' ],
                    'Foundations',
                    'Actions',
                    'App Shell', [ 'Application', 'Application Header', 'Application Menu' ],
                    'Page Layout',
                    'Filtering', [ 'Filters Panel', 'Filter Container' ],
                    'Lists & Tables', [ 'Row List (Desktop)', 'Row List (Mobile)', 'Row List Pagination', 'Row List Sorting' ],
                    'Forms', [ 'Form Layout', 'Form Field' ],
                    'Data Display',
                    'Scheduling',
                    'Feedback & Overlays', [ 'Dialog', 'Dialog Confirm' ],
                ],
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        applicationConfig( {
            providers: [ 
                provideHttpClient() ,
                provideAnimations(),
            ],
        } ),
        moduleMetadata( {
            imports: [
            ],
            declarations: [
                RerenderDirective,
                DisplayModeWrapperComponent,
                RegistrationWrapperComponent,
            ]
        } ),
        // componentWrapperDecorator(
        //     ( story ) => {
        //         window[ 'IS_STORYBOOK' ] = true

        //         return story
        //     }
        // )
    ]
};

export default preview;
