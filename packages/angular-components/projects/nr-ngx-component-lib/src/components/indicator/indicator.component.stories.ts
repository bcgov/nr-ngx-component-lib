import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DisplayModeWrapperComponent } from 'projects/nr-ngx-component-lib/story-util/display-mode-wrapper.component';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { ConfigurationService } from '../../services/configuration.service';
import { IndicatorComponent } from './indicator.component';

const meta: Meta<IndicatorComponent> = {
    title: 'Indicator',
    component: IndicatorComponent,
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
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
                `
            }
        }
    }  
}

export default meta;

export const Primary: StoryObj<IndicatorComponent & { indicator: string }> = {
    argTypes: {
        indicator: {
            control: 'inline-radio',
            options: ['','Active','Future','Complete','Not defined', 'A really long value', 'Ok'],            
        }
    },
    render: ( args ) => {
        return {
            props: args,
            styles: [`
                .status-active {
                    --nrcl-indicator-text-color: red;
                    --nrcl-indicator-border-color: red;
                }
                .status-future {
                    --nrcl-indicator-text-color: green;
                    --nrcl-indicator-border-color: green;
                }
                .status-complete {
                    --nrcl-indicator-text-color: blue;
                    --nrcl-indicator-border-color: blue;
                }
            `],
            template: `                
                <div style="padding: 10px 0;">
                    Before <nrcl-indicator>{{ indicator }}</nrcl-indicator> After
                </div>

                <div style="display: flex; gap: 10px; align-items: center">                     
                    <div>Before</div>
                    <nrcl-indicator>{{ indicator }}</nrcl-indicator> 
                    <div>After</div>
                </div>
            `
        }
    }
}
