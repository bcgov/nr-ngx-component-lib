import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import type { Preview } from "@storybook/angular";
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { DisplayModeWrapperComponent } from "projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component";
import { RegistrationWrapperComponent } from "projects/nr-ngx-component-lib/story-util/registration-wrapper.component";
import { RerenderDirective } from "projects/nr-ngx-component-lib/story-util/rerender.directive";

const preview: Preview = {
    parameters: {
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
    ],
    tags: ['autodocs']
};

export default preview;
