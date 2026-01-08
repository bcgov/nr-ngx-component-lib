import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
    title: 'Icon',
    component: IconComponent,
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
                `
            },
            source: {
                excludeDecorators: true
            }
        }
    },
}

export default meta;

export const Primary: StoryObj<IconComponent> = {
    parameters: {
        docs: {
            description: {
                story: `
                `
            }
        }
    },    
    argTypes: {
    },
    args: {
    },
    render: ( args ) => {
        return {
            props: args,
            template: `
                <nrcl-icon>clear-filters</nrcl-icon> 
            `
        }
    }
}
