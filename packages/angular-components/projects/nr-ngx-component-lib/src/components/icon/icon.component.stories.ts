import { MatTooltipModule } from '@angular/material/tooltip';
import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RerenderDirective } from 'projects/nr-ngx-component-lib/story-util/rerender.directive';
import { IconComponent } from './icon.component';
import { MatIconModule } from '@angular/material/icon';

const meta: Meta<IconComponent> = {
    title: 'Icon',
    component: IconComponent,
    decorators: [
        // Apply metadata to all stories
        moduleMetadata( {
            // import necessary ngModules or standalone components
            imports: [
                MatTooltipModule,
                MatIconModule
            ],
            // declare components that are used in the template
            declarations: [
                RerenderDirective
            ],
            // List of providers that should be available to the root component and all its children.
            providers: [
            ],
        } ),
        // componentWrapperDecorator( 
        //     ( story ) => {
        //         return `
        //             <ng-container *rerender="width + tooltip">
        //                 <div class="component-container-inline">
        //                     ${ story }
        //                 </div>
        //             </ng-container>
        //         `
        //     }
        // ),        
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
                <h3>NRCL Icons</h3>
                
                <div class="item">
                    <label>clear-filter</label>
                    <nrcl-icon>clear-filters</nrcl-icon> 
                </div>

                <h3>Material Icons</h3>

                <section>
                    <div class="item">
                        <label>remove</label>
                        <nrcl-icon>remove</nrcl-icon> 
                    </div>

                    <div class="item">
                        <label>add</label>
                        <nrcl-icon>add</nrcl-icon> 
                    </div>

                    <div class="item">
                        <label>expand_less</label>
                        <nrcl-icon>expand_less</nrcl-icon> 
                    </div>

                    <div class="item">
                        <label>expand_more</label>
                        <nrcl-icon>expand_more</nrcl-icon> 
                    </div>
            </section>
            `
        }
    }
}
