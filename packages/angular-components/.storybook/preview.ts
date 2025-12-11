import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import type { Preview } from "@storybook/angular";
import { applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

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
