import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import type { Preview } from "@storybook/angular";
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { DisplayModeWrapperComponent } from "projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component";
import { RegistrationWrapperComponent } from "projects/nr-ngx-component-lib/story-util/registration-wrapper.component";
import { RerenderDirective } from "projects/nr-ngx-component-lib/story-util/rerender.directive";
import { NRCL_STORY_DECLARATIONS, NRCL_STORY_IMPORTS } from "projects/nr-ngx-component-lib/story-util/nrcl-story-metadata";

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
                ...NRCL_STORY_IMPORTS,
            ],
            declarations: [
                ...NRCL_STORY_DECLARATIONS,
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
